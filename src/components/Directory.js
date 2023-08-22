import React, { useState } from "react";
import "../scss/components/_directory.scss"
import { useProjectStructure } from "../providers/projectStructureProvider.js";

// Takes our Portfolio metadata file, and creates files paths based on the
// generated Map structure of directory names and files arrays
const DirectoryViewer = ({ children }) => {
  const [expanded, setExpanded] = useState(false)
  const {
    projectStructure,
    projectId,
  } = useProjectStructure();

  console.log(JSON.stringify(projectStructure, null, 2))
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
      <Directory name={projectId} content={projectStructure} />
    </div>
    {children}
    </div>
  )
};

const Directory = ({ name, content, currentPath = '' }) => {
  const [dirMargin, _setDirMargin] = useState(15);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const renderContent = (content, currentPath) => {
    return Object.keys(content).map((key, index) => {
      // const newPath = currentPath
      //   ? `${currentPath}/${key}`
      //   : key === "files" ? "" : key;
      let newPath = currentPath;
      if( key !== 'files') {
        newPath = currentPath ? `${currentPath}/${key}` : key;
      }

      if (key === "files") {
        return content[key].map((file, fileIndex) => (
          <File
            key={fileIndex}
            name={file}
            path={`${newPath}/${file}`}
          />
        ));
      } else {
        return (
          <div key={index} className="directory-listing" style={{ marginLeft: `${dirMargin}px` }}>
            <Directory name={key} content={content[key]} currentPath={newPath} />
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
      {isOpen && renderContent(content, currentPath)}
    </div>
  )
};
const File = ({ name, path }) => {
  const { setAbsoluteFilePath } = useProjectStructure();

  return (
    <div
      className="fileName"
      onClick={() => setAbsoluteFilePath(path)}
    >{name}</div>
  )
}


export default DirectoryViewer;
