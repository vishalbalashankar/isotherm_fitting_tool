import React from 'react';
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import IsoTitle from './IsoTitle'
import {Link} from 'react-router-dom';

function StartPage() {
  return (
    <div>
        <div class="item1">
            <IsoTitle />
        </div>
        <div class="buttonContainer" >
            <Link to="/isothermfit">
                <Button className="btn-size" variant="primary" size="lg">Fit Isotherms</Button>{" "}
            </Link>
                <Button className="btn-size" variant="primary" size="lg">Enter Isotherm Values</Button> 
        </div>
    </div>
  );
}

export default StartPage;
