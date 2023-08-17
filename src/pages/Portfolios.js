import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import DirectoryViewer from "../components/Directory";
import Layout from "../components/Layout";
// import Pagination from "../components/Pagination";
import PortfoliosView from "../components/PortfoliosView";
import Sectiontitle from "../components/Sectiontitle";
import Spinner from "../components/Spinner";

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
  const [selectedFile, onSelectedFile]              = useState("")
  const [selectedProject, setSelectedProject]       = useState(null)
  const [projectDirectory, setProjectDirectory]     = useState([])
  const [currentProjectName, setCurrentProjectName] = useState("")
  const [filePaths, setFilePaths]                   = useState([])

  useEffect(() => {
    axios.get("/api/portfolio").then((resp) => {
      setProjects(resp.data)
      const firstProject = resp.data[0]
      setSelectedProject(projects[0])
      setProjectDirectory(firstProject.directory)
      setCurrentProjectName(firstProject.projectName)
      setFilePaths(generateFilePaths(firstProject.directory))
    })
  }, []);

  const handleProjectSelection = (project) => {
    setSelectedProject(project)
    const paths = generateFilePaths(project.directory)
    setCurrentProjectName(project.projectName)
    setProjectDirectory(project.directory)
    setFilePaths(paths)
    setProjectKey(projectKey + 1);
  };

  return (
    <div
    className="container"
    style={{
      // width: "80%",
        border: "1px solid red",
        height: "75vh",
        position: "absolute",
    }}>
    <div className="project-selector">
    {projects.map((project, index) => (
      <div key={index} onClick={() => handleProjectSelection(project)}>
      <h3
      className="projectName"
      style={{
        color: project.projectName == currentProjectName ?
          "red" : "white",
          border: project.projectName == currentProjectName ?
          "1px solid red" : "1px solid white",
          display: "inline-block",
          margin: "10px",
          padding: "10px",
      }}
      >{project.projectName}</h3>
      </div>
    ))}
    </div>
    <div className="file-selector">
    <DirectoryViewer
      projectName={currentProjectName}
      data={projectDirectory}
      key={projectKey}
    />
    </div>
    </div>
  )
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
            <FilesAndCodeBlock />
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

// function Port(){
//   return (
//     {<PortfoliosView portfolios={currentPortfolios} />}
//     {!(portfolios.length > portfoliosPerPage) ? null : (
//         <Pagination
//           className="mt-50"
//           itemsPerPage={portfoliosPerPage}
//           totalItems={portfolios.length}
//           paginate={paginate}
//           currentPage={currentPage}
//         />
//       )}
//   )
// }
export default Portfolios;
