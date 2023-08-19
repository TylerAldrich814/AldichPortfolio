import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import PortfolioCodeBlock from "../components/CodeBlock.js";
// import Smalltitle from "../components/Smalltitle";
import { Helmet } from "react-helmet";
import DirectoryViewer from "../components/Directory";
import Layout from "../components/Layout";
import Sectiontitle from "../components/Sectiontitle";
import Spinner from "../components/Spinner";
import { SelectedFileProvider , useSelectedFile } from "../components/selectedFile";
import { SelectProjectProvider , useSelectedProject } from "../components/selectedFile";

import "../scss/components/_project_card.scss"
import PortfolioCard from "../components/portfolio-card";

const generateFilePaths = (dir, currentPath = "") => {
  const paths = []

  Object.keys(dir).forEach(key => {
    const value = dir[key];

    if( key === "files" ){
      value.forEach(file => {
        paths.push(`${currentPath}/${file}`)
      })
    } else {
      const newCurrentPath = currentPath ? `${currentPath}/${key}` : key;
      paths.push(...generateFilePaths(value, newCurrentPath));
    }
  });
  return paths
}

const FilesAndCodeBlock = () => {
  const [projects, setProjects]                     = useState([]);
  const [projectKey, setProjectKey]                 = useState(0);
  const [projectDirectory, setProjectDirectory]     = useState([])
  const [currentProjectName, setCurrentProjectName] = useState("")
  const [filePaths, setFilePaths]                   = useState([])
  const [currentFilePath, setCurrentFilePath]       = useState("");

  const { selectedFile } = useSelectedFile();
  const { selectedProject, setSelectedProject } = useSelectedProject();

  useEffect(() => {
    axios.get("/api/portfolio").then((resp) => {
      setProjects(resp.data)
      const firstProject = resp.data[0]
      setSelectedProject(firstProject)
      setProjectDirectory(firstProject.directory)
      setCurrentProjectName(firstProject.projectName)
      setFilePaths(generateFilePaths(firstProject.directory))
    })
  }, []);

  useEffect(() => {
    // setCurrentFilePath(filePaths.find((path) => {
    //   let root = "../../public/projects/"
    //   let fullpath =  root + path.endsWith(selectedFile)
    //
    //   console.log(`PATH === ${full}`)
    //   return fullpath
    // }));
    setCurrentFilePath("../../public/projects/services/roomManagement/createRoom.go")
  }, [selectedFile])


  useEffect(() => {
    if( selectedProject ){
      const paths = generateFilePaths(selectedProject.directory)
      setCurrentProjectName(selectedProject.projectName)
      setProjectDirectory(selectedProject.directory)
      setFilePaths(paths)
      setProjectKey(projectKey + 1);
    }
  }, [selectedProject])

  const handleBackClick = () => {
    setSelectedProject(null);
  }

  return (
    <div className="container">
      {selectedProject ? (
        <div
          className="project-card-expanded"
          style={{ width: "75vw", position: "relative" }}
        >
          <div className="project-button-container" onClick={handleBackClick}>
            <div className="project-button">
              <span className="project-button-before">{selectedProject.projectName}</span>
              <span className="project-button-after">Go Back</span>
            </div>
          </div>
          <div className="code-block container"
            style={{
              display: 'flex',
              width: "100vw",
              height: "1000px",
              border: "1px solid white"
            }}
          >
            <DirectoryViewer
              projectName={currentProjectName}
              data={projectDirectory}
              key={projectKey}
            >
            <PortfolioCodeBlock
              filepath={currentFilePath}
            />
            </DirectoryViewer>
          </div>
        </div>
      ) : (
          <PortfolioCard
            projects={projects}
          />
      )}
    </div>
  );
}
function Portfolios() {
  return (
    <Layout>
      <Helmet>
        <title>Portfolios - Chester React Personal Portfolio Template</title>
        <meta
          name="description"
          content="Chester React Personal Portfolio Template Portfolios Page"
        />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <div className="mi-about mi-section mi-padding-top mi-padding-bottom">
          <div className="container">
            <Sectiontitle title="Portfolio" />
            <SelectProjectProvider >
              <SelectedFileProvider>
                <FilesAndCodeBlock />
              </SelectedFileProvider>
            </SelectProjectProvider >
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

export default Portfolios;
