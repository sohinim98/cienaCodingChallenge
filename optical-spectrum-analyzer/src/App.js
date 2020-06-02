import React from 'react';


import './App.scss'
import Command from './components/Command/Command'

export const App = () => {

  return (
    <>
      <h1 className="app--header">Cloud Optical Spectrum Analyzer</h1>
      <Command />
    </>
  );
}

export default App;
