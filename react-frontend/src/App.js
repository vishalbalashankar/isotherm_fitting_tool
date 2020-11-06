import React from 'react';
import './App.css';
import NameForm from './component/NameForm'
import IsoTitle from './component/IsoTitle'
import PlotIsotherms from './component/PlotIsotherms'
import Postlist from './component/Postlist'

function App() {
  return (
    <div className="container">
      <Postlist />
    </div>
  );
}

export default App;
