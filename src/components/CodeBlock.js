import React, { useEffect, useState } from "react";
import { CodeBlock, dracula, obsidian } from "react-code-blocks";
import { useCodeBlock } from "../providers/CodeBlockInteractions.js";
import { useProjectStructure } from "../providers/projectStructureProvider.js";

const PortfolioCodeBlock = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ code, setCode] = useState(null);
  const {
    absoluteFilePath,
    selectedFileContents,
  } = useProjectStructure();

  const [language, setLanguage] = useState("");

  const {
    setDirExpanded,
  } = useCodeBlock();

  useEffect(() => {
    if( selectedFileContents !== null) {
      setLanguage(matchLanguage(absoluteFilePath))
      setCode(selectedFileContents) ;
      setIsLoading(false);
    } else if( selectedFileContents === "ERROR" ){
      <div className="block-container">
        <p>An Unknown error occurred while trying to load my code.. If reloading doesn't fix the issue, and this keeps happening. Then please shoot me a message.</p>
      </div>
    }
  }, [selectedFileContents])

  if( selectedFileContents === null ){
    return (
      <div className="block-container">
      </div>
    )
  }

  return (
    <div>
      {isLoading ? (
        <p> Loading...</p>
      ) : (
        <div>
          <div className="block-title">
            <h4>{absoluteFilePath}</h4>
          </div>
          <div className="code-container"
            onClick={() => setDirExpanded(false)}
          >
            <CodeBlock
              language={language}
              text={code}
              showLineNumbers={true}
              theme={obsidian}
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
    ".yaml": "yaml",
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
  return ext
}

export default PortfolioCodeBlock;
