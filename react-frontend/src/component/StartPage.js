import React from 'react';
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';

function StartPage() {
  return (
    <div>
        <div class="buttonContainer" >
            <Link to="/compute_isothermfit">
                <Button className="btn-size" variant="outline-primary" size="lg">Fit Isotherms</Button>{" "}
            </Link>
            <Link to="/enter_isothermfit">
                <Button className="btn-size" variant="outline-primary" size="lg">Enter Isotherm Values</Button> 
            </Link>
        </div>
    </div>
  );
}

export default StartPage;
