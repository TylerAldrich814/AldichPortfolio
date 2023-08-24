import React, { useEffect, useState } from 'react';

// const ProjectFileContext = React.createContext(null);
// export const useProjectFile = () => React.useContext(ProjectFileContext);
//
// export const ProjectFileProvider = ({ children }) => {
//   const [filePath, setFilePath] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [fileSelected, setFileSelected] = useState(false);
//
//   return (
//     <ProjectFileContext value={{
//       filePath,
//       isLoading,
//       fileSelected,
//       setFilePath,
//       setFileSelected,
//       setIsLoading,
//     }}>
//       { children }
//     </ProjectFileContext>
//   )
// };
//
// const getFileContents = async (filePath) => {
//   console.log(` -> Getting File contents @ ${filePath}`)
//   let content = ""
//
//   var fileReq = new Request(filePath);
//   fetch(fileReq).then((res) => res.text()).then((text) => {
//     content = text
//   })
//   return content
// };
//
// export function useFileContents({ filePath }) {
//   const [text, setText]       = useState("");
//   const [fileSelected, setFileSelected] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState(null);
//
//   useEffect(() => {
//     if(!fileSelected){
//       setFileSelected(true);
//     }
//     setLoading(true);
//     getFileContents(filePath)
//       .then(content => {
//         setText(content);
//         setLoading(false)
//       })
//       .catch((err) => {
//         setError(err.message)
//         setLoading(false)
//       })
//
//     console.log(filePath)
//     console.log(text)
//     // getFileContents(filePath).then(setText).catch(console.error);
//   }, [filePath])
//
//  return { text, fileSelected, loading, error };
// }
