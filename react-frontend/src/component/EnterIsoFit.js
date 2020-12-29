import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import './myStyles.css'
import axios from 'axios'
import PlotIsotherm from './PlotIsotherm'
import SslEqn from './SslEqn'
import SslEqnb from './SslEqnb'

const initialState = {
    adsb1: 'co2',
    qsat1: "",
    qsat1_error: "",
    b01: "",
    b01_error: "",
    delu1: "",
    delu1_error: "",
    adsb2: 'n2',
    qsat2: "",
    qsat2_error: "",
    b02: "",
    b02_error: "",
    delu2: "",
    delu2_error: "",
    issubmit: false
}

class EnterIsoFit extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeValue(event, key) {
        this.setState({ [key]: event.target.value })
    }

    handleFile(event, key) {
        this.setState({
            [key]: event.target.files[0]
        })
        console.log(event.target.files[0]);
    }

    validate = () => {
        let qsat1_error = "";
        let b01_error = "";
        let delu1_error = "";
        let qsat2_error = "";
        let b02_error = "";
        let delu2_error = "";

        if (this.state.qsat1 > 15) {
            qsat1_error = "Value should be between 0 and 15"
        }
        if (this.state.qsat1 < 0) {
            qsat1_error = "Value should be between 0 and 15"
        }
        if (this.state.b01 > 1) {
            b01_error = "Value should be between 0 and 1"
        }
        if (this.state.b01 < 0) {
            b01_error = "Value should be between 0 and 1"
        }
        if (this.state.delu1 > -1) {
            delu1_error = "Value should be between -1 and -50"
        }
        if (this.state.delu1 < -50) {
            delu1_error = "Value should be between -1 and -50"
        }

        if (this.state.qsat2 > 15) {
            qsat2_error = "Value should be between 0 and 15"
        }
        if (this.state.qsat2 < 0) {
            qsat2_error = "Value should be between 0 and 15"
        }
        if (this.state.b02 > 1) {
            b02_error = "Value should be between 0 and 1"
        }
        if (this.state.b02 < 0) {
            b02_error = "Value should be between 0 and 1"
        }

        if (this.state.delu2 > -1) {
            delu2_error = "Value should be between -1 and -50"
        }
        if (this.state.delu2 < -50) {
            delu2_error = "Value should be between -1 and -50"
        }

        if (qsat1_error || b01_error || delu1_error || qsat2_error || b02_error || delu2_error) {
            this.setState({ qsat1_error, b01_error, delu1_error, qsat2_error, b02_error, delu2_error });
            return false;
        }

        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            this.setState(initialState);
            alert('A name was submitted: ' + this.state.adsname);
            this.setState({
                issubmit: true
            })
        }
    }
    render() {
        return (
            <Container fluid="xl">
                <Row>
                    <Col>
                        <div className="item1style">
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Row className="item_style">
                                        <Col sm="2">
                                            <Form.Label>Adsorbate 1: </Form.Label>
                                        </Col>
                                        <Col sm="3">
                                            <Form.Control
                                                as='select'
                                                value={this.state.adsb1}
                                                onChange={(event) => this.handleChangeValue(event, 'adsb1')}
                                            >
                                                <option value="co2">Carbon dioxide</option>
                                                <option value="n2">Nitrogen</option>
                                                <option value="ch4">Methane</option>
                                                <option value="H2">Hydrogen</option>
                                                <option value="ar">Argon</option>
                                            </Form.Control>
                                        </Col>
                                        <Col>

                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col sm="2">
                                        </Col>
                                        <Col sm="3">
                                            Fit Parameters
                                        </Col>
                                        <Col sm="2">
                                            <Form.Control
                                                placeholder="qsb [mol/kg]"
                                                size="sm"
                                                value={this.state.qsat1}
                                                type="number"
                                                onChange={(event) => this.handleChangeValue(event, 'qsat1')}

                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.qsat1_init_error}
                                            </div>
                                        </Col>
                                        <Col sm="2">
                                            <Form.Control
                                                placeholder="b0 [m3/mol]"
                                                size="sm" value={this.state.b01}
                                                type="number"
                                                onChange={(event) => this.handleChangeValue(event, 'b01')}
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.b01_init_error}
                                            </div>
                                        </Col>
                                        <Col sm="2">
                                            <Form.Control
                                                placeholder="delU [kJ/mol]"
                                                size="sm"
                                                value={this.state.delu1}
                                                type="number"
                                                onChange={(event) => this.handleChangeValue(event, 'delu1')}
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.delu1_init_error}
                                            </div>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="item_style">
                                        <Col sm="2">
                                            <Form.Label>Adsorbate 2: </Form.Label>
                                        </Col>
                                        <Col sm="3">
                                            <Form.Control
                                                as='select'
                                                value={this.state.adsb2}
                                                onChange={(event) => this.handleChangeValue(event, 'adsb2')}
                                            >
                                                <option value="co2">Carbon dioxide</option>
                                                <option value="n2">Nitrogen</option>
                                                <option value="ch4">Methane</option>
                                                <option value="H2">Hydrogen</option>
                                                <option value="ar">Argon</option>
                                            </Form.Control>
                                        </Col>
                                        <Col sm="3">
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col sm="2">
                                        </Col>
                                        <Col sm="3">
                                            Fit Parameters
                                        </Col>

                                        <Col sm="2">
                                            <Form.Control
                                                placeholder="qsb [mol/kg]"
                                                size="sm"
                                                value={this.state.qsat2}
                                                type="number"
                                                onChange={(event) => this.handleChangeValue(event, 'qsat2')}

                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.qsat2_init_error}
                                            </div>
                                        </Col>
                                        <Col sm="2">
                                            <Form.Control
                                                placeholder="b0 [m3/mol]"
                                                size="sm"
                                                value={this.state.b02}
                                                type="number"
                                                onChange={(event) => this.handleChangeValue(event, 'b02')}
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.b02_init_error}
                                            </div>
                                        </Col>
                                        <Col sm="2">
                                            <Form.Control
                                                placeholder="delU [kJ/mol]"
                                                size="sm"
                                                value={this.state.delu2}
                                                type="number"
                                                onChange={(event) => this.handleChangeValue(event, 'delu2')}
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.delu2_init_error}
                                            </div>
                                        </Col>

                                    </Form.Row>
                                    <Form.Row>
                                        <Col sm="3">
                                            <Button type='submit'>Submit</Button>
                                        </Col>
                                        <Col sm="3">
                                        </Col>
                                        <Col sm="2">
                                            <SslEqn />
                                        </Col>
                                        <Col sm="2">
                                            <SslEqnb />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                    </Form.Row>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="plotstyle">
                            <PlotIsotherm adsbname={this.state.adsb1} />
                        </div>
                    </Col>
                    <Col>
                        <div className="plotstyle">
                            <PlotIsotherm adsbname={this.state.adsb2} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                </Row>

            </Container>
        )
    }
}

export default EnterIsoFit