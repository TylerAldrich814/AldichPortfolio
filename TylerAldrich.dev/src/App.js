import React, { useState } from "react";
import * as Icon from "react-feather";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import About from "./pages/About";
// import BlogDetails from "./pages/BlogDetails";
// import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Portfolios from "./pages/Portfolios";
import Resumes from "./pages/Resumes";

function App ({ show }) {
  const [lightMode, setLightMode] = useState(false); // Made it true if you want to load your site light mode primary

  lightMode
    ? document.body.classList.add("light")
    : document.body.classList.remove("light");

  const handleMode = () => {
    if (!lightMode) {
      setLightMode(true);
      document.body.classList.add("light");
    } else {
      setLightMode(false);
      document.body.classList.remove("light");
    }
  };

  if (!show) {
    return <></>
  }

  return (
    <div style={{
      transition: `opacity 2s ease-out`,
      opacity: show ? 1 : 0,
    }}>
    <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home lightMode={lightMode} />} />
          <Route path="about" element={<About />} />
          <Route path="resume" element={<Resumes />} />
          <Route path="portfolios" element={<Portfolios />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
  // <Route path="blogs" element={<Blogs />} />
    // <Route path="blogs/:id/:title" element={<BlogDetails />} />
}

export default App;
