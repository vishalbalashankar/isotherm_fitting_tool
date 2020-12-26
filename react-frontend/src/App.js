import React from 'react';
import './App.css';
import NameForm from './component/NameForm'
import IsoTitle from './component/IsoTitle'
import StartPage from './component/StartPage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
      <div class="item1">
            <IsoTitle />
      </div>
        <Switch>
          <Route path="/" exact component={StartPage} />
          <Route path="/isothermfit" exact component={NameForm} /> 
          <Route path="/plotisotherm" exact component={NameForm} />    
        </Switch>
      </div>
    </Router>
  );
}

export default App;
