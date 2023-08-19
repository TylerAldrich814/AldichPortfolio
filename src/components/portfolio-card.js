import React, { Suspense, useEffect, useState } from "react";
import Smalltitle from "../components/Smalltitle";
import Sectiontitle from "../components/Sectiontitle";
import { useSelectedProject } from "./selectedFile";

const PortfolioCard = ({ projects }) => {
  const { setSelectedProject } = useSelectedProject();

  return (
  <div className="project-card-container">
    {projects.map((project, index) => (
        <div
          key={index}
          className="project-card"
        >
          <div className="project-card-title">
            <Smalltitle title={project.projectName}/>
          </div>
          <div className="project-card-body">
            <div className="project-card-desc">
              <p>{project.description}</p>
            </div>

            <div className="icons">
              <img src={project.techIcons}/>
            </div>
            <div className="project-btn-container">
              <button
                className="project-card-btn"
                onClick={() => setSelectedProject(project)}
               >
                View Code
              </button>
              <a
                className="project-card-link"
                href={project.sourcecode}
                target="_blank"
                rel="noopener noreferre"
              >
                Source Code
              </a>
            </div>
          </div>
        </div>
    ))}
  </div>
  )
};

export default PortfolioCard;
