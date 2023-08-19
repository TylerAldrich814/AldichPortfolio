import React, { useState } from "react";
import { useSelectedFile } from "./selectedFile.js";
import "../scss/components/_directory.scss"

// Takes our Portfolio metadata file, and creates files paths based on the
// generated Map structure of directory names and files arrays
const DirectoryViewer = ({ children, projectName, data }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpanstion = () => setExpanded(!expanded);

  return (
    <div className="directory-viewer" >
      <button
        onClick={handleExpanstion}
      >
      { expanded ? "◀" : "▶" }
      </button>
    <div
      className="directory"
      style={{
        width: expanded ? "300px" : "0px",
        position: "absolute",
      }}
    >
      <Directory name={projectName} content={data} />
    </div>
    {children}
    </div>
  )
};

const Directory = ({ name, content }) => {
  const [dirMargin, _setDirMargin] = useState(15);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const renderContent = (content) => {
    return Object.keys(content).map((key, index) => {
      if (key === "files") {
        return content[key].map((file, fileIndex) => (
          <File
            key={fileIndex}
            name={file}
          />
        ));
      } else {
        return (
          <div key={index} className="directory-listing" style={{ marginLeft: `${dirMargin}px` }}>
            <Directory name={key} content={content[key]} />
          </div>
        );
      }
    });
  };

  return (
    <div className="directory-listing">
      <div >
         <span className="directory-btn" onClick={toggleOpen}>
          {isOpen ? '[-]' : '[+]'}
         </span> <span className="directory-name">
          {name}
         </span>
      </div>
      {isOpen && renderContent(content)}
    </div>
  )
};
const File = ({ name }) => {
  const { setSelectedFile } = useSelectedFile();

  return (
    <div
      className="fileName"
      onClick={() => setSelectedFile(name)}
    >{name}</div>
  )
}


export default DirectoryViewer;
