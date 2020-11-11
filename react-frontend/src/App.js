import React from 'react';
import './App.css';
import NameForm from './component/NameForm'
import IsoTitle from './component/IsoTitle'

function App() {
  return (
    <div className="container">
      <div class="item1">
        <IsoTitle />
      </div>
      <div class="item2">
      </div>
      <div class="item3">
        <NameForm />
      </div>
      <div class="item4"></div>
     
    </div>
  );
}

export default App;
