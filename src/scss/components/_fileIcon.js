import React from "react";
import {
  FaRust,
  FaCss3Alt,
} from "react-icons/fa"
import {
  DiJavascript1,
  DiHtml5,
} from "react-icons/di"
import {
  BiSolidFile,
  BiLogoGoLang,
} from "react-icons/bi"
import {
  SiYaml,
  SiCsswizardry,
} from "react-icons/si"
import {
  VscJson,
} from "react-icons/vsc"
import {
  TbBrandCpp,
} from "react-icons/tb"

const FileIcon = ({ fileName }) => {

  const getFileIcon = () => {
    var parts = fileName.split(".")
    var ext = ""
    if( parts.length > 1){
      ext = "." + parts.pop()
    }
    switch( ext  ){
      case ".go":
        return <BiLogoGoLang />
      case ".js": case ".jsx":
        return <DiJavascript1 />
      case ".rs":
        return <FaRust />
      case ".css": case ".scss":
        return <SiCsswizardry />
      case ".html":
        return <DiHtml5 />
      case ".yaml":
        return <SiYaml />
      case ".json":
        return <VscJson />
      case ".cpp":
        return <TbBrandCpp />

      default:
        return <BiSolidFile />
    }
  };

  return <div style={{ marginBottom: '3px' }}>{getFileIcon()}</div>
}

export default FileIcon;
