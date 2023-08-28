import React, { useEffect } from 'react';
import { useCodeBlock } from '../providers/CodeBlockInteractions';
import { useProjectStructure } from '../providers/projectStructureProvider';

const CodeBlockHeader = () => {
  const {
    setDirHover,
    dirExpanded,
    setDirExpanded,
  } = useCodeBlock();
  const {
    absoluteFilePath,
    projectId,
    setProjectId,
  } = useProjectStructure();

  useEffect(() => {
    console.log(`projectId == ${projectId}`)
  }, [projectId])

  return (
    <React.Fragment key="Code block header">
    {projectId !== null ?(
      <div className='codeBlockHeader'>
        <div className="directory-viewer-btn-container">
          <div
            className="directory-viewer-btn"
            onClick={() => { setProjectId(null) }}
          >
          <h5>Back</h5>
          </div>
          <div
            className="directory-viewer-btn"
            onMouseEnter={() => setDirHover(true)}
            onMouseLeave={() => setDirHover(false)}
            onClick={() => setDirExpanded(!dirExpanded)}
          >
          <h5>{ dirExpanded ? "Close" : "Open" }</h5>
          </div>
        </div>
        <div className="block-title">
          <h4>{absoluteFilePath}</h4>
        </div>
      </div>
    ) : <></> }
    </React.Fragment>
  )
};

export default CodeBlockHeader;
