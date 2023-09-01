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
  const [alreadyOpen, setAlreadyOpen] = useState(false);

  useEffect(() => {
    if( tabbedFiles.length !== 0 && !alreadyOpen ){
      const delayedExpansion = setTimeout(() => {
        setAlreadyOpen(true);
      }, 1500);

      return () => {
        clearTimeout(delayedExpansion);
      };
    }
  }, [tabbedFiles])

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
        setAlreadyOpen(false);
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
  const toggleTabBar = () => tabbedFiles.length == 0;

  return (
    <div className='tabbedFiles-position'>
      <div className='tabbedFiles-container'
        style={{
          transition: "all 0.9s ease",
          height:    toggleTabBar() ? "0px" : alreadyOpen ? "28px" : "50px",
          padding:   toggleTabBar() ? "0px" : "5px",
          opacity:   toggleTabBar() ? '0%' : '100%',
          transform: toggleTabBar() ? "translateY(-1px)" : alreadyOpen ? "translateY(-28px)" : "translateY(-49px)"
        }}
        onMouseEnter={() => {
          if(tabbedFiles.length !== 0) setAlreadyOpen(false)
        }}
        onMouseLeave={() => {
          if(tabbedFiles.length !== 0) setAlreadyOpen(true)
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
    </div>
  )
};

export default TabbedFiles;
