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

import PortfolioCard from "../components/portfolio-card";
import { useProjectStructure } from "../providers/projectStructureProvider.js";
// import { ProjectFileProvider } from "../hooks/load_file.js";
import "../scss/components/_project_card.scss"
import "../scss/components/_directory.scss"
import "../scss/components/_codeblock.scss";

const FilesAndCodeBlock = () => {
  const {
    projectId,
    setProjectId,
    projectKey,
    setProjectKey,
    selectedFile,
  } = useProjectStructure();


  useEffect(() => {
    if( projectId ){
      setProjectKey(projectKey + 1);
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
        >
          <div className="project-button-container" onClick={handleBackClick}>
            <div className="project-button">
              <span className="project-button-before">{projectId}</span>
              <span className="project-button-after">Go Back</span>
            </div>
          </div>
          <div className="code-block container">
            <DirectoryViewer>
            </DirectoryViewer>
            <PortfolioCodeBlock

              filepath={selectedFile}
            />
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
        <title>Portfolio :: Tyler Aldrich</title>
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
