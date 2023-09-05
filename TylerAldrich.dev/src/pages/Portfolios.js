import React, { Suspense, useEffect, useState } from "react";
import PortfolioCodeBlock from "../components/CodeBlock.js";
import { Helmet } from "react-helmet";
import DirectoryViewer from "../components/Directory";
import Sectiontitle from "../components/Sectiontitle";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout.js";
import { SelectedFileProvider } from "../components/selectedFile";
import { SelectProjectProvider } from "../components/selectedFile";

import PortfolioCards from "../components/PortfolioCards.js";
import { useProjectStructure } from "../providers/projectStructureProvider.js";
import TabbedFiles from "../components/CodeBlockTabs.js";
import { CodeBlockProvider } from "../providers/CodeBlockInteractions.js";
import CodeBlockHeader from "../components/codeBlockHeader.js";

const FilesAndCodeBlock = () => {
  const {
    projectId,
    projectKey,
    setProjectKey,
    selectedFile,
  } = useProjectStructure();

  useEffect(() => {
    if( projectId ){
      setProjectKey(projectKey + 1);
    }
  }, [projectId])

  return (
    <div className="container">
      {projectId ? (
        <div className="main-block">
          <CodeBlockHeader />
          <div className="code-block">
            <DirectoryViewer />
            <PortfolioCodeBlock
              filepath={selectedFile}
            />
            <div className="codeblock-padding" />
          </div>
        {projectId ? (<TabbedFiles />): <></> }
        </div>
        ) : (
          <PortfolioCards/>
        )}
    </div>
  );
}
function Portfolios() {
  const {
    projectId,
  } = useProjectStructure();

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
            <Sectiontitle title={projectId !== null ? projectId : "Portfolio"} />
            <SelectProjectProvider >
              <CodeBlockProvider>
                <SelectedFileProvider>
                  <FilesAndCodeBlock />
                </SelectedFileProvider>
              </CodeBlockProvider>
            </SelectProjectProvider >
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

export default Portfolios;
