import React from 'react';
import './App.css';
import NameForm from './component/NameForm'
import IsoTitle from './component/IsoTitle'
import PlotIsotherms from './component/PlotIsotherms'

function App() {
  return (
    <div className="container">
      <IsoTitle />
      <NameForm />
      <PlotIsotherms />
    </div>
  );
}

export default App;
