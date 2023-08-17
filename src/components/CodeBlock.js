import React, { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

const CodeBlock = (source) => {
  const[ sourceCode, changeSourceCode ] = useState(source)
  return (
    <div className="Block">
      <CodeBlock
        language={"go"}
        text={sourceCode}
        showLineNumbers={true}
        theme={dracula}
        wrapLines={true}
        codeBlock
      />
    </div>
  )
}
export default CodeBlock;
