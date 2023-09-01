import React from "react";

function Sectiontitle(props) {
  return (
    <div className="mi-sectiontitle">
      <h2
        className={ props.title.length > 10 ? "long-title" : ""}
      >{props.title}</h2>
      <span>{props.title}</span>
    </div>
  );
}

export default Sectiontitle;
