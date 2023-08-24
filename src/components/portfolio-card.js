import React from "react";
import Smalltitle from "../components/Smalltitle";
import { useProjectStructure } from "../providers/projectStructureProvider";
import { Loader } from "react-feather";

const PortfolioCard = () => {
  const { projectsData, setProjectId } = useProjectStructure();

  return (
  <div className="project-card-container">
    {projectsData != undefined ? Object.values(projectsData).map((project, index) => (
        <div
          key={index}
          className="project-card"
        >
          <div className="project-card-title">
            <Smalltitle title={project.projectName}/>
          </div>
          <div className="project-card-body">
            <div className="project-card-desc">
              <p>{project.Description}</p>
            </div>
          </div>
          <div className='project-card-bottom'>
            <div className="icons">
              <img src={project.techIcons}/>
            </div>
            <div className="project-btn-container">
              <button
                className="project-card-btn"
                onClick={() => setProjectId(project.projectName.toLowerCase())}
               >
                View Code
              </button>
              <a
                className="project-card-link"
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferre"
              >
                Source Code
              </a>
            </div>
          </div>
        </div>
    )) : <Loader />}
  </div>
  )
};

export default PortfolioCard;
