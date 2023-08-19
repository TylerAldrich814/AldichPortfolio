import React, { useEffect, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import {useFileContents} from "../hooks/load_file.js";
import "../scss/components/_codeblock.scss";

const PortfolioCodeBlock = ({ filepath }) => {
  const { contents, loading, error } = useFileContents(filepath);
  const [ language, setLanguage ] = useState("");

  useEffect(() => {
    if( filepath !== undefined ){
      setLanguage(matchLanguage(filepath));
    }
    console.log(filepath)
    console.log(contents)
  }, [filepath])

  return (
    <div className="Block-container">
      { loading ? (
        <p> Loading...</p>
      ) : error !== ""  ? (
        <p>{error}</p>
      ) : (
        <div className="block">
          <div className="block-title">
            <h2>{filepath}</h2>
          </div>
          <CodeBlock
            language={language}
            text={contents}
            showLineNumbers={true}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      )}
    </div>
  )
}

function matchLanguage(filepath) {
   let supportedLanguages = {
     ".sh": 'bash',
     ".c": 'c',
     ".cpp": 'cpp',
     ".cs": 'csharp',
     ".dart": 'dart',
     ".go": 'go',
     ".html": 'html',
     ".java": 'java',
     ".js": 'javascript',
     ".jsx": 'jsx',
     "makefile": 'makefile',
     ".php": 'php',
     ".py": 'python',
     ".rs": 'rust',
     ".sql": 'sql',
     ".swift": 'swift',
     ".ts": 'typescript',
   };
  var parts = filepath.split(".");
  var extension = ""
  if( parts.length > 1 ){
    extension = "." + parts.pop();
  }

  var ext = supportedLanguages[extension];
  if( ext === null ){
    return "ERROR"
  }
  return ext
}

export default PortfolioCodeBlock;
