import React from "react";
import { createRoot } from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import "./data";
import * as serviceWorker from "./serviceWorker";
// import { ImageProvider } from "./providers/ImageProvider";
import { DataProvider } from "./providers/DataProvider";
import { ProjectStructureProvider } from "./providers/projectStructureProvider";

const container = document.getElementById("root");
const root = createRoot(container);

// initializeApp(firebaseConfig);

root.render(
  <DataProvider>
    <ProjectStructureProvider>
      <App />
    </ProjectStructureProvider>
  </DataProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
