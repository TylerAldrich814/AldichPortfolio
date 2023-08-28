import React, { useEffect, useState } from 'react';
import Smalltitle from "../components/Smalltitle";
import { useProjectStructure } from '../providers/projectStructureProvider';


const PortfolioCard = ({ project, index }) => {
  const { setProjectId } = useProjectStructure();
  const [ showBack, setShowBack ] = useState(false);
  const [ showFront, setShowFront ] = useState(true);
  const [ firstLoad, setFirstLoad ] = useState(true);

  const HideFront = () => {
    setShowFront(false);
    setShowBack(true);
    if( firstLoad ) setFirstLoad(false)
  };

  const Front = () => (
    <div className='card-container'>
        <div
          key={index}
          className={`project-card-front`}
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
                alt="Show user some of the source code"
                onClick={() => setProjectId(project.projectName.toLowerCase())}
              >
                <div><span>View</span><br/><span>Code</span></div>
              </button >
              <button
                className="project-card-btn"
                alt="Project Source code on Github"
              >
                <a href={project.sourceCode} target="_blank" rel="noopener noreferre">
                <div><span>Source</span><br/><span>Code</span></div>
                </a>
              </button >
            </div>
          </div>
        </div>
      </div>
    )

  const Back = () => (
    <div className='card-container'>
        <div
          key={index}
          style={{
            zIndex: firstLoad ? "-1" : "",
          }}
        >
          <div className="project-card-title">
            <Smalltitle title={project.projectName}/>
          </div>
          <div className='project-card-bottom'>
            <div className="project-btn-container">
              <button
                className="project-card-btn"
                alt="Show user some of the source code"
              >
                Back
              </button >
            </div>
          </div>
        </div>
    </div>
  );

  return (
      <div className={`cards`}>
        <>{ Front() }</>
      </div>
  );
};

export default PortfolioCard;
