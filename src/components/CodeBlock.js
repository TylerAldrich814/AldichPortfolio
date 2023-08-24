import React, { useEffect, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { useFileContents } from "../hooks/load_file.js";
import { useProjectStructure } from "../providers/projectStructureProvider.js";

const PortfolioCodeBlock = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const {
    absoluteFilePath,
  } = useProjectStructure();

  const [language, setLanguage] = useState("");

  useEffect(() => {
    if( absoluteFilePath !== null ){
      setLanguage(absoluteFilePath)

      // Here we'll asynchronously call a fileLoader hook to fetch our selected file.
      // and load the contents into a react state.

      setIsLoading(false);
    }
  }, [absoluteFilePath])

  // const {
  //   contents,
  //   loading,
  //   fileSelected,
  //   error
  // } = useFileContents(absoluteFilePath);
  //
  // useEffect(() => {
  //   if ( absoluteFilePath != "") {
  //     setLanguage(matchLanguage(absoluteFilePath));
  //   }
  //   console.log(absoluteFilePath)
  // }, [absoluteFilePath])

  if( absoluteFilePath === null ){
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
              language={"go"}
              text={tempCode}
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
  return ext
}
const tempCode = `
import (
	"log"
	"net/http"

	chronAuthentication "github.com/TylerAldrich814/Chronicles/services/authentication"
	"github.com/TylerAldrich814/Chronicles/services/httpResponses"
)
const BUCKET_NAME string = "chronicles_users"
const COLLECTION string = "users"

// '/signup' PUT HTTP Endpoint. Handles signing a user up using
// both Firebase Auth and stores User metadata with FireStore
func handleUserSignup(w http.ResponseWriter, r *http.Request){
  fb := chronAuthentication.FirebaseAuth{}
  fb.Init().GetClient()
  resp := httpResponses.Response{}

  if err := r.ParseForm(); err != nil {
    http.Error(w, "Failed to Parse Form Data", http.StatusBadRequest)
  }

  email    := r.FormValue("email")
  username := r.FormValue("userName")
  passw    := r.FormValue("password")

  if len(email) == 0 || len(username) == 0 || len(passw) == 0 {
    http.Error(w, "Email, UserName or Password were missing", http.StatusNotAcceptable)
    return
  }

  if err := createUserMetadata(email, username); err != nil {
    http.Error(w, "Failed to add user metadata to Google Cloud", http.StatusInternalServerError)
  }

  _, err := fb.CreateUser(email, passw)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }
  response, err := resp.AddStatus("Successful").AddStatusCode(200).Build()
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusCreated)
  if _, writeErr := w.Write(response); writeErr != nil {
    log.Printf(
      " --> ERROR: Failed to write JSON Response\n  -> Error: %v",
      err.Error(),
    )
  }
  log.Printf("Successfully Created User %v\n", email)
}

func createUserMetadata(email, userName string) error {
  fb := chronAuthentication.FirebaseAuth{}
  fb.Init().GetClient()

  fields := map[string]interface{}{
    "Email":       email,
    "OwnedRooms":  make(map[string]string),
    "JoinedRooms": make(map[string]string),
  }

  if err := fb.AddFirestoreDoc(COLLECTION, userName, fields); err != nil {
    log.Printf(" --> ERROR: Failed to Save user to Firestore\n  -> Error: %v\n", err.Error())
    return err
  }

  return nil
}

func CHECKOWNERSHIP(){
  // GET users/*UID/profile.json
  // GET rooms/name/metadata/ownership.json
  // if user.UID == room.owner.uid { return tru }
}
`

export default PortfolioCodeBlock;
