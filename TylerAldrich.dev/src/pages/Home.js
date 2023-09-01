import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import Socialicons from "../components/Socialicons";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout.js"
import { useFirebaseData } from "../providers/FirebaseDataProvider";

function Home({ lightMode }) {
  // const information = useInformation();
  const { isLoading, information } = useFirebaseData();

  if (isLoading) {
    return <div style = {{

    }
    }
      >Loading...</div>
  }

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
