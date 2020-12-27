import React from 'react';
import './App.css';
import ComputeIsoFit from './component/ComputeIsoFit'
import EnterIsoFit from './component/EnterIsoFit'
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
          <Route path="/compute_isothermfit" exact component={ComputeIsoFit} /> 
          <Route path="/enter_isothermfit" exact component={EnterIsoFit} />    
        </Switch>
      </div>
    </Router>
  );
}

export default App;
