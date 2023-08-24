import axios from "axios";
import React, { useEffect, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
// import { useFileContents } from "../hooks/load_file.js";
import { useProjectStructure } from "../providers/projectStructureProvider.js";

const PortfolioCodeBlock = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ code, setCode] = useState(null);
  const {
    absoluteFilePath,
    selectedFileContents,
  } = useProjectStructure();

  const [language, setLanguage] = useState("");

  // useEffect(() => {
  //   // When a File is selected, We'll trigger a Firebase fetch function via Axios
  //   if( absoluteFilePath !== null ){
  //     setLanguage(absoluteFilePath)
  //   }
  // }, [absoluteFilePath])

  useEffect(() => {
    if( selectedFileContents !== null) {
      setLanguage(matchLanguage(absoluteFilePath))
      setCode(selectedFileContents) ;
      setIsLoading(false);
    } else if( selectedFileContents === "ERROR" ){

    }
  }, [selectedFileContents])

  if( selectedFileContents === null ){
    console.log("Files not selected")
    return (
      <div className="block-container">
        <p>Use the Directory to the left to select a file to view.</p>
      </div>
    )
  }


  return (
    <div className="Block-container">
      {isLoading ? (
        <p> Loading...</p>
      ) : (
        <div className="block">
          <div className="block-title">
            <h4>{absoluteFilePath}</h4>
          </div>
          <div className="code-container">
            <CodeBlock
              language={language}
              text={code}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </div>
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
  if (parts.length > 1) {
    extension = "." + parts.pop();
  }

  var ext = supportedLanguages[extension];
  if (ext === null) {
    return "ERROR"
  }
  console.log(`EXTENTION == ${ext}`)
  return ext
}

export default PortfolioCodeBlock;
