import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import TrackVisibility from "react-on-screen";
import Layout from "../components/Layout.js"
import Progress from "../components/Progress";
import Resume from "../components/Resume";
import Sectiontitle from "../components/Sectiontitle";
import Smalltitle from "../components/Smalltitle";
import Spinner from "../components/Spinner";
import { useFirebaseData } from "../providers/FirebaseDataProvider.js";
// import { useSkills, useExperience } from "../providers/DataProvider";

function Resumes() {
  const {
    skills,
    experience,
  } = useFirebaseData();
  const [workingExperience, setWorkingExperience] = useState({});

  useEffect(() => {
    setWorkingExperience(experience.workingExperience);
  }, [experience]);

  return (
    <Layout>
      <Helmet>
        <title>Resume - TylerAldrich</title>
        <meta
          name="description"
          content="TylerAldrich.dev Resume page"
        />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <div className="mi-skills-area mi-section mi-padding-top">
          <div className="container">
            <Sectiontitle title="My Skills" />
            <div className="mi-skills">
              <div className="row mt-30-reverse">
                {skills.map((skill) => (
                  <TrackVisibility
                    once
                    className="col-lg-6 mt-30"
                    key={skill.title}
                  >
                    <Progress title={skill.title} percentage={skill.value} />
                  </TrackVisibility>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mi-resume-area mi-section mi-padding-top mi-padding-bottom">
          <div className="container">
            <Sectiontitle title="Resume" />
            <Smalltitle title="Working Experience" icon="briefcase" />
            <div className="mi-resume-wrapper">
              {Array.isArray(workingExperience) && workingExperience.map((workingExp) => (
                <Resume key={workingExp.id} resumeData={workingExp} />
              ))}
            </div>
            <div className="mt-30"></div>
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}
export default Resumes;
