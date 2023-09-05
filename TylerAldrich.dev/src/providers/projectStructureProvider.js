import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getProjectFileContents, getProjectStructure } from '../data/db/firestore';


const ProjectContext = React.createContext(null);
export const useProjectStructure = () => React.useContext(ProjectContext)
//            ProjectStructureProvider => The Main Context
//            Block which keeps track of Multiple items.
//  -> projectStructure = A JSON object, which I generate Outside of this application
//                        via a Python script, which walks the path, and creates a json
//                        file where the Map keys are either Directories or if the key
//                        is "files", then it'll contain a List of Files that I'm sharing
//                        on my Portfolio.
// -> projectsData = This is a Map, pulled from a Database that contains the metadata for
//                   all of my shared projects.
// -> projectId = The Name of the current project that has been selected by the user.
// -> projectKey = Only used for React and keeping track of all "Project" components
// -> absoluteFilePath = When our DirectoryVierwer prints out the Directory of a project
//                       from using 'projectStructure', it also keeps track of any printed
//                       files abosolute File path. When a User selects that file, then the
//                       path is stored within 'absoluteFilePath'
// -> firstLoad = Self explanatory.
// -> selectedFileContents = The file contents of a selected file to be displayed
// -> cachedFiles = For locally storing files that have already been loaded from DB
// -> tabbedFiles = piggybacks off of cachedFiles. For displaying Past files that were
//                  previously opened at the bottom of our CodeBlock component.
export const ProjectStructureProvider = ({ children }) => {
  const [projectStructure, setProjectStructure] = useState({}); // Directories.json
  const [projectsData, setProjectsData]         = useState({});
  const [projectId, setProjectId]               = useState(null);
  const [projectKey, setProjectKey]             = useState(0);
  const [absoluteFilePath, setAbsoluteFilePath] = useState(null);
  const [firstLoad, setFirstLoad]               = useState(true);
  const [selectedFileContents, setSelectedFileContents] = useState(null);

  const [cachedFiles, setCachedFiles] = useState({});
  const [tabbedFiles, setTabbedFiles] = useState([]);

  useEffect(() => {
    axios.get("/api/projectsData")
      .then((response) => setProjectsData(response.data))
      .catch(e => console.error(`Error Occurred: ${e}`))

    if( firstLoad ){
      setFirstLoad(false);
    }
  }, [])

  useEffect(() => {
    if (projectId !== null) {
      getProjectStructure(projectId).then(data => {
        console.log(`DATA: ${data}`);
        setProjectStructure(data);
      }).catch(e => console.error(e));
    }
    if( !firstLoad && projectId === null ){
      setProjectStructure({});
      setAbsoluteFilePath(null);
      setSelectedFileContents(null);
      setTabbedFiles([])
    }
  }, [projectId])

  // absoluteFilePath => When a User clicks on a File in the DirectoryVierwer,
  // this value is updated, and this useEffect is triggered.
  useEffect(() => {
    if( absoluteFilePath !== null ){
      console.log(`ABPATH: ${absoluteFilePath}`)
      handleFileContents();
    }else if( !firstLoad && absoluteFilePath === null ){
      setSelectedFileContents(null);
    }
  }, [absoluteFilePath])

  const handleFileContents = () => {
    let keyFound = false;
    Object.keys(cachedFiles).forEach(key => {
      if( key === absoluteFilePath ){
        console.log(`KEY: ${key}`)
        setSelectedFileContents(cachedFiles[key])
        keyFound = true;

        // Check if files in tabbedFiles. if not, add it.
        if( tabbedFiles.indexOf(key) === -1 ){
          setTabbedFiles(prevTabbedFiles => [...prevTabbedFiles, key]);
        }
        return
      }
    })
    if( keyFound ) return

    getProjectFileContents(projectId, absoluteFilePath)
      .then((data) => {
        setSelectedFileContents(data);
        return data;
      })
      .then((data) => {
        setCachedFiles(prevState => ({ ...prevState, [absoluteFilePath]: data }));
        setTabbedFiles(prevTabbedFiles => [...prevTabbedFiles, absoluteFilePath]);
      })
      .catch(error => {
        console.log('Error:', error);
        setSelectedFileContents("ERROR");
      });
  }

  return (
    <ProjectContext.Provider value={{
      projectStructure,
      projectId,
      projectKey,
      projectsData,
      absoluteFilePath,
      setProjectId,
      setProjectKey,
      setAbsoluteFilePath,
      selectedFileContents,
      tabbedFiles, setTabbedFiles,
    }}>
      {children}
    </ProjectContext.Provider>
  )
};

