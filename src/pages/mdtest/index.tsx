import React, { useState, useEffect } from 'react';
import Codemirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data'
import { EditorView } from '@codemirror/view'
import MDtoHTML from 'lib/MDtoHTML';
import StyleMD from "../../styles/Markdown.module.scss"

const App = () => {
  const [markdownText, setMarkdownText] = useState('');
  const [htmlText, setHtmlText] = useState('');
  useEffect(() => {
    MDtoHTML(markdownText).then(s => setHtmlText(s));
  }, [markdownText]);

  const [contentHeight, setContentHeight] = useState('100vh');

  useEffect(() => {
    MDtoHTML(markdownText).then(s => setHtmlText(s));

    const headerElement = document.getElementById('page-header');
    const footerElement = document.getElementById('page-footer');
    
    if(headerElement instanceof HTMLElement && footerElement instanceof HTMLElement ){
      const calcContentHeight = window.innerHeight - headerElement.offsetHeight - footerElement.offsetHeight;
      setContentHeight(`${calcContentHeight}px`);
    }
  }, [markdownText]);

  return (
    <div style={{ display: 'flex', height: contentHeight }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Codemirror 
          autoFocus={true}
          extensions={[
            markdown({base:markdownLanguage, codeLanguages: languages}),
            EditorView.lineWrapping
          ]} 
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
