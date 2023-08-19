import{ useEffect, useState } from 'react';

// The error is somethign to do with a dependency.. You don't have any values
// called 'isMSE'.. Ignore it for now. Still need to figure you why you can't
// fetch your code.
const getFileContents = async (filepath) => {
  // const res = await fetch(`${process.env.PUBLIC_URL}/${filepath}`);

  let content = ""

  var fileReq = new Request(filepath);
  fetch(fileReq).then((res) => res.text()).then((text) => {
    content = text
  })
  return content
};

export function useFileContents({ filePath }) {
  const [text, setText]       = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    getFileContents(filePath)
      .then(content => {
        setText(content);
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })

    console.log(filePath)
    console.log(text)
    // getFileContents(filePath).then(setText).catch(console.error);
  }, [filePath])

 return { text, loading, error };
}
