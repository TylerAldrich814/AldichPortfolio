import React, { useState, useEffect } from "react";
import { useProjectStructure } from "../providers/projectStructureProvider";
import { Loader } from "react-feather";
import PortfolioCard from "./PortfolioCard";

const PortfolioCards = () => {
  const { projectsData } = useProjectStructure();
  const [portfolioCards, setPortfolioCards] = useState({});

  useEffect(() => {
    if( projectsData !== undefined ){
      let tempPortfolioCards = {};

      Object.values(projectsData).forEach((project, index) => {
        let card = <PortfolioCard project={project} index={index} />
        tempPortfolioCards[parseInt(project.id, 10)] = card;
      })

      const sortedPortfolioCards = Object.entries(tempPortfolioCards)
        .sort(([a], [b]) => parseInt(a, 10) - parseInt(b, 10))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      setPortfolioCards(sortedPortfolioCards);
    }
  }, [projectsData]);

  return (
   <React.Fragment>
    <div className="project-card-container">
      {projectsData !== undefined ? Object.values(portfolioCards).map((project, index) => (
        <React.Fragment key={index}>
          { project }
        </React.Fragment>
      )) : <Loader />}
    </div>
  </React.Fragment>)
};

export default PortfolioCards;

  // Loading and sorting Projects by ID.
  // useEffect(() => {
  //   if( projectsData !== undefined ){
  //     let tempPortfolioCards = {};
  //
  //     Object.values(projectsData).forEach((project, index) => {
  //       let card = (
  //         <div className="card-container">
  //           <div className={`project-card ${showInfo ? 'card-flipped': ''}`}>
  //             <div
  //               key={index}
  //               className="project-card-front"
  //             >
  //               <div className="project-card-title">
  //                 <Smalltitle title={project.projectName}/>
  //               </div>
  //               <div className="project-card-body">
  //                 <div className="project-card-desc">
  //                   <p>{project.Description}</p>
  //                 </div>
  //               </div>
  //               <div className='project-card-bottom'>
  //                 <div className="icons">
  //                   <img src={project.techIcons}/>
  //                 </div>
  //                 <div className="project-btn-container">
  //                   <button
  //                     className="project-card-btn"
  //                     alt="Show user some of the source code"
  //                     onClick={() => setProjectId(project.projectName.toLowerCase())}
  //                   >
  //                     View Code
  //                   </button >
  //                   <button
  //                     className="project-card-btn"
  //                     alt="Show user some of the source code"
  //                     onClick={() => setShowInfo(true)}
  //                   >
  //                     More Info
  //                   </button >
  //                   <button
  //                     className="project-card-btn"
  //                     alt="Project Source code on Github"
  //                   >
  //                     <a href={project.sourceCode} target="_blank" rel="noopener noreferre">
  //                       Source Code
  //                     </a>
  //                   </button >
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="project-card-back">
  //                 BACK OF CARD
  //               <div className="project-card-body">
  //                 <div className="project-card-desc">
  //                   <p>{project.Description}</p>
  //                 </div>
  //               </div>
  //               <div className='project-card-bottom'>
  //                 <div className="project-btn-container">
  //                   <button
  //                     className="project-card-btn"
  //                     alt="Show user some of the source code"
  //                     onClick={() => setShowInfo(false)}
  //                   >
  //                     Back
  //                   </button >
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //       tempPortfolioCards[parseInt(project.id, 10)] = card;
  //     })
  //               // <button
  //               //   className="project-card-btn"
  //               //   onClick={() => setProjectId(project.projectName.toLowerCase())}
  //               //  >
  //               //   View Code
  //               // </button>
  //               // <a
  //               //   className="project-card-link"
  //               //   href={project.sourceCode}
  //               //   target="_blank"
  //               //   rel="noopener noreferre"
  //               // >
  //               //   <span>Source Code</span>
  //               // </a>
  //
  //     const sortedPortfolioCards = Object.entries(tempPortfolioCards)
  //       .sort(([a], [b]) => parseInt(a, 10) - parseInt(b, 10))
  //       .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  //
  //     setPortfolioCards(sortedPortfolioCards);
  //   }
  // }, [projectsData]);
