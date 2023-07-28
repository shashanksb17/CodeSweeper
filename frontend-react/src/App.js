import React, { useState } from 'react';
import './App.css';
import MonacoEditor from 'react-monaco-editor';
import LogoHeading from './logoheading';

function App() {
  const [code, setCode] = useState('// Write the code here\n');
  const [output, setOutput] = useState('Please enter anyone of the button and wait for the output 🚀');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const convertCode = () => {
    setOutput('Please wait for a moment while your output is being generated. 🔄');
    // Make a request to the backend API for code conversion
    fetch('https://code-generator-bouw.onrender.com/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: code, language: selectedLanguage })
    })
      .then(response => response.json())
      .then(data => {
        setOutput(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
        setOutput('Error occurred while processing the request. Please try again later. ❌');
      });
  };

  const debugCode = () => {
    setOutput('Please wait for a moment while your output is being generated. 🔄');
    // Make a request to the backend API for code debugging
    fetch('https://code-generator-bouw.onrender.com/debug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: code })
    })
      .then(response => response.json())
      .then(data => {
        setOutput(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
        setOutput('Error occurred while processing the request. Please try again later. ❌');
      });
  };

  const performQualityCheck = () => {
    setOutput('Please wait for a moment while your output is being generated. 🔄');
    //Make a request to the backend API for code quality check
    fetch('https://code-generator-bouw.onrender.com/qualitycheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: code })
    })
      .then(response => response.json())
      .then(data => {
        setOutput(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
        setOutput('Error occurred while processing the request. Please try again later. ❌');
      });
  };

  return (
    <div>
     <div>
      <LogoHeading />
      {/* Other content of your application */}
    </div>
      
    <div className="actions">
      <select id="languageSelect" value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="python">Select your Language  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>
        <option value="c">C++</option>
      </select>
      
        <button onClick={convertCode}>Convert</button>
        <button onClick={debugCode}>Debug</button>
        <button onClick={performQualityCheck}>Check Quality</button>
      
    </div>
    
    <div className="container">
      
      <div className="left-section">
        <h1>Input</h1>
        <div className="editor-container">
          <MonacoEditor
            width="100%"
            height="400"
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={setCode}
            options={{
              minimap: {
                enabled: true,
              },
            }}
          />
        </div>
      </div>
      <div className="right-section">
        <div className="output-container">
          <h2>Output</h2>
          <pre id="output">{output}</pre>
        </div>
      </div>
    </div>

   
    </div>
  );

}

export default App;
