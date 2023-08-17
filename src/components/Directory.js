import React, { useEffect, useState } from "react";

// Takes our Portfolio metadata file, and creates files paths based on the
// generated Map structure of directory names and files arrays

const Directory = ({ name, content }) => {
  const [dirMargin, setDirMargin] = useState(15);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const renderContent = (content) => {
    return Object.keys(content).map((key, index) => {
      if (key === "files") {
        return content[key].map((file, fileIndex) => (
          <File key={fileIndex} name={file} />
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
    <div className="directory">
      <div onClick={toggleOpen}>
        {isOpen ? '[-]' : '[+]'} {name}
      </div>
      {isOpen && renderContent(content)}
    </div>
  )
};
const File = ({ name }) => <div className="fileName">{name}</div>

const DirectoryViewer = ({ projectName, data }) => {
  return (
    <div className="directory-viewer">
      <Directory name={projectName} content={data} />
    </div>
  )
};

export default DirectoryViewer;
