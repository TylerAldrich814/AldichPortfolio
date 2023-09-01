import axios from "axios";
import FsLightbox from "fslightbox-react";
import React, { Suspense, useEffect, useState } from "react";
import * as Icon from "react-feather";
import { Helmet } from "react-helmet";
import ProgressiveImage from "react-progressive-graceful-image";
import Sectiontitle from "../components/Sectiontitle";
import Spinner from "../components/Spinner";
import { getResumeURL } from "../data/db/fireStorage";
import Layout from "../components/Layout.js"
import { useFirebaseData } from "../providers/FirebaseDataProvider";

function About() {
  const [toggler, setToggler] = useState(false);
  const {
    information,
    images,
  } = useFirebaseData();

  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    getResumeURL()
      .then(url => setResumeUrl(url))
      .catch(e => console.error(e))
  }, []);
  // }, [imageUrls])

  const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleToggler = (_) => {
    setToggler(!toggler);
  };

  return (
    <Layout>
      <Helmet>
        <title>About - Tyler Aldrich</title>
        <meta
          name="description"
          content="TylerAldrich.dev About me"
        />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <div className="mi-about-area mi-section mi-padding-top">
          <div className="container">
            <Sectiontitle title="About Me" />
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="mi-about-image">
                  <ProgressiveImage
                    src={images.aboutImage}
                  >
                    {(src) => (
                      <img
                        src={src}
                        alt="aboutimage"
                        onClick={() => handleToggler(!toggler)}
                      />
                    )}
                  </ProgressiveImage>
                  <span className="mi-about-image-icon">
                    <Icon.ZoomIn />
                  </span>
                  <FsLightbox
                    toggler={toggler}
                    sources={[images.aboutImageLg]}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mi-about-content">
                  <h3>
                    I am <span className="color-theme">{information.name}</span>
                  </h3>
                  <p>
                  {information.aboutContent}
                  </p>
                  <ul>
                    {!information.name ? null : (
                      <li>
                        <b>Full Name</b> {information.name}
                      </li>
                    )}
                    {!information.age ? null : (
                      <li>
                        <b>Age</b> {information.age} Years
                      </li>
                    )}
                    {!information.phone ? null : (
                      <li>
                        <b>Phone</b> {information.phone}
                      </li>
                    )}
                    {!information.nationality ? null : (
                      <li>
                        <b>Nationality</b> {information.nationality}
                      </li>
                    )}
                    {!information.language ? null : (
                      <li>
                        <b>Languages</b> {information.language}
                      </li>
                    )}
                    {!information.email ? null : (
                      <li>
                        <b>Email</b> {information.email}
                      </li>
                    )}
                    {!information.address ? null : (
                      <li>
                        <b>Address</b> {information.address}
                      </li>
                    )}
                    {!information.freelanceStatus ? null : (
                      <li>
                        <b>Freelance</b> {information.freelanceStatus}
                      </li>
                    )}
                  </ul>
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="mi-button">
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

export default About;
