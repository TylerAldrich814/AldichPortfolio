import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import "./data";
import * as serviceWorker from "./serviceWorker";
// import { ImageProvider } from "./providers/ImageProvider";
import { ProjectStructureProvider } from "./providers/projectStructureProvider";
import Particle from "./components/Particle";
import { FireBaseDataProvider } from "./providers/FirebaseDataProvider";
import TALoading from "./components/TALoading";

const container = document.getElementById("root");
const root = createRoot(container);

function TA(){
  const [show, setShow] = useState(false);
  const isFirstLoad = localStorage.getItem("isFirstLoad");

  useEffect(() => {
    let time = 5;
    if (!isFirstLoad) time = 2.5;

    const delayedLoad = setTimeout(() => {
      setShow(true);
    }, time*1000)

    return () => {
      clearTimeout(delayedLoad);
    };
  }, [] )


  return (
    <>
    { show ? (
      <App show={true} time={2}/>
    ) : (
      <TALoading show={false} time={2}/>
    )}
    </>
  );
}

root.render(
  <FireBaseDataProvider>
    <ProjectStructureProvider>
      <Particle  />
      <TA />
    </ProjectStructureProvider>
  </FireBaseDataProvider>
);
// <App />

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
