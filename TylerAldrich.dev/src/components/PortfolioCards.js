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
