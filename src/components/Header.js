import React, { useEffect, useState } from "react";
import LineIcon from "react-lineicons";
import ProgressiveImage from "react-progressive-graceful-image";
import { Link, NavLink } from "react-router-dom";
import { useImages, useInformation, useSocial } from "../providers/DataProvider.js";

function Header() {
  const social = useSocial();
  const images = useImages();
  const [navigationToggler, setNavigationToggler] = useState(false);

  const handleNavigationToggler = () => {
    setNavigationToggler(!navigationToggler);
  };

  useEffect(() => {
    // setSocialLinks(information.socialLinks);
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
              src={images.brandImage}
              placeholde="/MyImages/headshot.jpg"
            >
              {(src) => <img src={src} alt="brandImage" />}
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
        <div className="mi-header-copyright">
          <b>
            <div
              className="header-icons"
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={"https://github.com/TylerAldrich814/portfolio"}
              style={{
                fontSize: '1.5rem',
                marginLeft: '1.5rem',
                marginRight: '0.5rem',
              }}
            >
              <LineIcon name="github" />
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={social.linkedin}
              style={{
                marginTop: '4px',
              }}
            >Tyler Aldrich</a>
            </div>
          </b>
        </div>
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
