import React from 'react';
import './App.css';
import NameForm from './component/NameForm'
import IsoTitle from './component/IsoTitle'
import FittingTitle from './component/FittingTitle'

function App() {
  return (
    <div className="container_1">
      <div class="item1">
        <IsoTitle />
      </div>
      <div class="item2">
        <FittingTitle />
      </div>
      <div class="item3">
      </div>
      <div>
        <NameForm />
      </div>
     
    </div>
  );
}

export default App;
