import React, { useState, useEffect } from "react";
import { useProjectStructure } from "../providers/projectStructureProvider.js";
import FileIcon from "./fileIcon.js";

// Takes our Portfolio metadata file, and creates files paths based on the
// generated Map structure of directory names and files arrays
const DirectoryViewer = ({ children }) => {
  const [expanded, setExpanded] = useState(false)
  const [dirHover, setDirHover] = useState(false);
  const [hoverBackBtn, setHoverBackBtn] = useState(false);
  const {
    absoluteFilePath,
    projectStructure,
    projectId,
    setProjectId,
  } = useProjectStructure();

  useEffect(() => {
    const delayedExpansion = setTimeout(() => {
      setExpanded(true);
    }, 750);

    return () => {
      clearTimeout(delayedExpansion);
    };
  }, [])

  useEffect(() => {
    if( absoluteFilePath !== null && expanded ){
      setExpanded(false);
    }
  }, [absoluteFilePath])

  return (
    <div className="directory-viewer" >
      <div className="directory-viewer-btn-container">
        <div
          className="directory-viewer-btn"
          onMouseEnter={() => setDirHover(true)}
          onMouseLeave={() => setDirHover(false)}
          onClick={() => setProjectId(null)}
        >
        <h5>Back</h5>
        </div>
        <div
          className="directory-viewer-btn"
          onMouseEnter={() => setDirHover(true)}
          onMouseLeave={() => setDirHover(false)}
          onClick={() => setExpanded(!expanded)}
        >
        <h5>{ expanded ? "Close" : "Open" }</h5>
        </div>
      </div>
    <div
      className={dirHover ? "directory dirhover" : "directory"}
      style={{
        transition: "all 0.2s linear",
        width:
          dirHover && !expanded ? "15px" :
          !dirHover && expanded ? "300px" :
          dirHover && expanded ? "285px" : "0px",
        opacity:
          dirHover && !expanded ? "80%" :
          !dirHover && expanded ? "100%" :
          dirHover && expanded ? "80%" : "0%",


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
          <div
            key={index}
            className="directory-listing"
            style={{
            }}>
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
    <div className="fileName-container">
      <FileIcon fileName={path} />
      <div
        className="fileName"
        onClick={() => setAbsoluteFilePath(path)}
      >{name}</div>
    </div>
  )
}


export default DirectoryViewer;
