import React, { useEffect, useState } from 'react';
import { useProjectStructure } from '../providers/projectStructureProvider';

const TabbedFiles = () => {
  let {
    tabbedFiles,
    setTabbedFiles,
    absoluteFilePath,
    setAbsoluteFilePath,
  } = useProjectStructure();
  const [ currentTabIndex, setCurentTabIndex] = useState(null);

  // We want to remove from our 'tabbedFiles' but NOT from our 'cachedFiles'.
  // That way if a user wants to reopen the file from the Directory, they won't
  // have to redown the file
  const removeFileFromTabs = (file) => {
    console.log(`REMOVING ${file} FROM TABLINE`)
    const index = tabbedFiles.indexOf(file);
    console.log(`FILE INDEX = ${index}`)

    setTabbedFiles(prevTabbedFiles => {
      return prevTabbedFiles.filter(tabbedFile => tabbedFile !== file);
    });

    if( absoluteFilePath === file){
      console.log(`CLOSED TAB FOR ABSOLUTE FILEPATH`)
      if( tabbedFiles.length === 1 ){
        console.log(`NO MORE FILES IN TAB LINE, NULLING FILE CONTENTS`)
        setCurentTabIndex(null);
        setAbsoluteFilePath(null);
        return
      }else {
        console.log(`SWITCHING FILE CONTENTS`)
        if( index > 0 ){
          setCurentTabIndex(currentTabIndex-1);
          setAbsoluteFilePath(tabbedFiles[index-1]);// set file 1 to the left
          return
        }
        setCurentTabIndex(0);
        setAbsoluteFilePath(tabbedFiles[index]);// set first file
      }
    }
  };

  return (
    <div className='tabbedFiles-container'
      style={{
        transition: "all 0.3s linear",
        height: tabbedFiles.length == 0 ? "0px" : "50px",
        padding: tabbedFiles.length == 0 ? "0px" : "5px",
        opcaity: tabbedFiles.length == 0 ? "0%" : '100%',
        transform: tabbedFiles.length == 0 ? "translate(0px, -2px)" : "translate(0px, -50px)"
      }}
    >
      <div className="tabbedFiles">
      {absoluteFilePath !== null ? (
        tabbedFiles.map((file, index ) => (
          <div
            style={{
              color: file === absoluteFilePath ? "#E5D18BBB" : "white",
            }}
            className="tabbedFile" key={index}>
            <span className="tab-close" onClick={() => removeFileFromTabs(file)}>
              <span>x</span>
            </span>
            <span className="filename" onClick={() => setAbsoluteFilePath(file)}>{file}</span>
          </div>
        ))
      ) : (<></>)}
      </div>
    </div>
  )
};

export default TabbedFiles;
