import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import Particle from "../components/Particle";
import Socialicons from "../components/Socialicons";
import Spinner from "../components/Spinner";
import { useInformation } from "../providers/DataProvider";

function Home({ lightMode }) {
  // const [information, setInformation] = useState("");
  const information = useInformation();

  useEffect(() => {
    // axios.get("/api/information").then((response) => {
    //   setInformation(response.data);
    // });
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Home :: Tyler Aldrich</title>
        <meta
          name="description"
          content="Tyler Aldrich - Homepage"
        />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <div className="mi-home-area mi-padding-section">
          <Particle lightMode={lightMode} />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-12">
                <div className="mi-home-content">
                  <h1>
                    Hi, I am{" "}
                    <span className="color-theme">{information.name}</span>
                  </h1>
                  <p>{information.aboutShort}</p>
                  <Socialicons bordered />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

export default Home;
