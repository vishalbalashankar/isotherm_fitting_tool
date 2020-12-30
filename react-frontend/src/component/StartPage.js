import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import './myStyles.css'
import Typist from "react-typist";

function StartPage() {

  const [count, setCount] = useState(1);

  useEffect(() => {
    // document.title = `You clicked ${count} times`;
    setCount(1);
  }, [count]);

  return (
    <Container fluid="xl" className="buttonContainer" >
      <Row >
        <div className="start-text">
          {count ? (
            <Typist avgTypingDelay={50} onTypingDone={() => setCount(0)}>
              <span> <b>Welcome!!</b> Choose one of the options below to get started</span>
              <Typist.Backspace count={40} delay={800} />
              <span> Option - 1 to compute SSL parameters first and start the screening process..</span>
              <Typist.Backspace count={67} delay={1600} />
              <span> 2 to enter SSL parameters directly and start the screening process..</span>
            </Typist>
          ) : (
              ""
            )}
        </div>
      </Row>
      <Row>
        <Col>
          <Link to="/compute_isothermfit">
            <Button className="btn-size" variant="outline-primary mr-1" size="lg">Compute SSL Parameters</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/enter_isothermfit">
            <Button className="btn-size" variant="outline-primary mr-1" size="lg">Enter SSL Parameters</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default StartPage;
