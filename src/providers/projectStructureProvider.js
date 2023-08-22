import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { getImageUrl } from '../data/db/fireStorage';
import { getProjectStructure } from '../data/db/firestore';

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
export const ProjectStructureProvider = ({ children }) => {
  const [projectStructure, setProjectStructure] = useState({}); // Directories.json
  const [projectsData, setProjectsData]         = useState({});
  const [projectId, setProjectId]               = useState("");
  const [projectKey, setProjectKey]             = useState(0);
  const [absoluteFilePath, setAbsoluteFilePath] = useState("");

  useEffect(() => {
    axios.get("/api/projectsData")
      .then((response) => setProjectsData(response.data))
      .catch(e => console.error(`Error Occurred: ${e}`))

    console.log(projectsData)
  }, [])

  useEffect(() => {

    if (projectId.length != 0) {
      getProjectStructure(projectId).then(data => {
        setProjectStructure(data);
      }).catch(e => console.error(e));

    }
  }, [projectId])

  // absoluteFilePath => When a User clicks on a File in the DirectoryVierwer,
  // this value is updated, and this useEffect is triggered.
  useEffect(() => {

  }, [absoluteFilePath])

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
    }}>
      {children}
    </ProjectContext.Provider>
  )
};

