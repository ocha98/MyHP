import React, { useState, useEffect } from 'react';
import Codemirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data'
import MDtoHTML from 'lib/MDtoHTML';
import StyleMD from "../../styles/Markdown.module.scss"

const App = () => {
  const [markdownText, setMarkdownText] = useState('');
  const [htmlText, setHtmlText] = useState('');
  useEffect(() => {
    MDtoHTML(markdownText).then(s => setHtmlText(s));
  }, [markdownText]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Codemirror 
          autoFocus={true}
          extensions={[markdown({base:markdownLanguage, codeLanguages: languages})]} 
          onChange={(value, viewUpdate) => {setMarkdownText(value)}}
        />
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '1em', borderLeft: "1px solid gray" }}>
        <div className={StyleMD.MD_container} dangerouslySetInnerHTML={{ __html: htmlText }}/>
      </div>
    </div>
  );
};

export default App;
