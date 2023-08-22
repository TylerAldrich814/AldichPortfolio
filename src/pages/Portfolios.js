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
import { useProjectStructure } from "../providers/projectStructureProvider.js";

// const generateFilePaths = (dir, currentPath = "") => {
//   const paths = []
//
//   Object.keys(dir).forEach(key => {
//     const value = dir[key];
//     console.log(`Generating File Paths`)
//
//     if( key === "files" ){
//       value.forEach(file => {
//         paths.push(`${currentPath}/${file}`)
//       })
//     } else {
//       const newCurrentPath = currentPath ? `${currentPath}/${key}` : key;
//       paths.push(...generateFilePaths(value, newCurrentPath));
//     }
//   });
//   return paths
// }
// const generateFilePaths = dir => {
//   const paths = [];
//   const stack = [{ dir, currentPath: ''}]
//
//   while( stack.length > 0 ){
//     const { dir, currentPath } = stack.pop();
//
//     Object.keys(dir).forEach(key => {
//       const value = dir[key];
//
//       if( key === "files" ){
//         value.forEach(file => {
//           paths.push(`${currentPath}/${file}`)
//         })
//       } else {
//         const newCurrentPath = currentPath ? `${currentPath}/${key}` : key;
//         stack.push({ dir: value, currentPath: newCurrentPath })
//       }
//     });
//   }
//   return paths;
// };

const FilesAndCodeBlock = () => {
  // const [projects, setProjects]                     = useState([]);
  // const [filePaths, setFilePaths]                   = useState([])
  // const [currentFilePath, setCurrentFilePath]       = useState("");

  const {
    projectStructure,
    projectId,
    setProjectId,
    projectKey,
    setProjectKey,
    selectedFile,
  } = useProjectStructure();


  useEffect(() => {
    // console.log("SelectedProject")
    if( projectId ){
      setProjectKey(projectKey + 1);

    console.log(`Data: ${JSON.stringify(projectStructure, null, 2)}`)
    }
  }, [projectId])

  const handleBackClick = () => {
    setProjectId(null);
  }

  return (
    <div className="container">
      {projectId ? (
        <div
          className="project-card-expanded"
          style={{ width: "75vw", position: "relative" }}
        >
          <div className="project-button-container" onClick={handleBackClick}>
            <div className="project-button">
              <span className="project-button-before">{projectId}</span>
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
            <DirectoryViewer>
              <PortfolioCodeBlock
                filepath={selectedFile}
              />
            </DirectoryViewer>
          </div>
        </div>
      ) : (
          <PortfolioCard/>
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
