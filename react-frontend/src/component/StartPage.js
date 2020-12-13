import React from 'react';
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function StartPage() {
  return (
    
    <div class="buttonContainer" >
        <Button className="btn-size" variant="primary" size="lg">Fit Isotherms</Button>{" "}
        <Button className="btn-size" variant="primary" size="lg">Enter Isotherm Values</Button> 
    </div>
  );
}

export default StartPage;
