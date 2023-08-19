import axios from "axios";
import React, { useEffect, useState } from "react";
import LineIcon from "react-lineicons";
// import ProgressiveImage from "react-progressive-image";
// import ImageLoader from './image_loader.js';
import ProgressiveImage from "react-progressive-graceful-image";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [information, setInformation] = useState("");
  const [navigationToggler, setNavigationToggler] = useState(false);

  const handleNavigationToggler = () => {
    setNavigationToggler(!navigationToggler);
  };

  useEffect(() => {
    axios.get("/api/information").then((response) => {
      setInformation(response.data);
    });
  }, []);

  return (
    <nav className={navigationToggler ? "mi-header is-visible" : "mi-header"}>
      <button onClick={handleNavigationToggler} className="mi-header-toggler">
        {!navigationToggler ? (
          <LineIcon name="menu" />
        ) : (
          <LineIcon name="close" />
        )}
      </button>
      <div className="mi-header-inner">
        <div className="mi-header-image">
          <Link to="/">
            <ProgressiveImage
              src={information.brandImage}
              placeholde="/MyImages/headshot.jpg"
            >
            {(src) => <img src={src} alt="brandImage"/>}
            </ProgressiveImage>
          </Link>
        </div>

        <ul className="mi-header-menu">
          <li>
            <NavLink to="/" end>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/resume">
              <span>Resume</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolios">
              <span>Portfolios</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <span>Contact</span>
            </NavLink>
          </li>
        </ul>
      <p className="mi-header-copyright">
        <b>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://nuclearthemes.com"
          >
            Tyler Aldrich
          </a>
        </b>
      </p>
      </div>
    </nav>
  );
}
// Blogs Header Link
  // <li>
  //   <NavLink to="/blogs">
  //     <span>Blogs</span>
  //   </NavLink>
  // </li>

// <p className="mi-header-copyright">
//   &copy; {new Date().getFullYear()}{" "}
//   <b>
//     <a
//       rel="noopener noreferrer"
//       target="_blank"
//       href="https://nuclearthemes.com"
//     >
//       Tyler Aldrich
//     </a>
//   </b>
// </p>
export default Header;
