import logo from './logo.svg';
import './App.css';
import WebcamCapture from './components/WebcamCapture';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <h1>Human Detection App</h1>
        <WebcamCapture />
      </header>
    </div>
  );
}

export default App;
