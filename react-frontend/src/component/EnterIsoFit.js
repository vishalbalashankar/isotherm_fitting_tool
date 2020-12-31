import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import './myStyles.css'
import axios from 'axios'
import PlotIsotherm from './PlotIsotherm'
import PlotIsotherm_1 from './PlotIsotherm_1'
import SslEqn from './SslEqn'
import SslEqnb from './SslEqnb'

const initialState = {
    adsb1: 'CO<sub>2</sub>',
    qsat1: "",
    qsat1_error: "",
    b01: "",
    b01_error: "",
    delu1: "",
    delu1_error: "",
    isodata_1: "",
    adsb2: 'N<sub>2</sub>',
    qsat2: "",
    qsat2_error: "",
    b02: "",
    b02_error: "",
    delu2: "",
    delu2_error: "",
    isodata_2: "",
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
            axios.get('http://0.0.0.0:7501/enter_parameters',{
                params: {
                    qsat: this.state.qsat1,
                    b0: this.state.b01,
                    delu: this.state.delu1
                }
            })
                .then(response => {
                    console.log(response)
                    this.setState({
                        isodata_1: response.data
                    });
                })
                .catch(errors => {
                    console.log(errors)
                })
                axios.get('http://0.0.0.0:7501/enter_parameters',{
                    params: {
                        qsat: this.state.qsat2,
                        b0: this.state.b02,
                        delu: this.state.delu2
                    }
                })
                    .then(response => {
                        console.log(response)
                        this.setState({
                            isodata_2: response.data
                        });
                    })
                    .catch(errors => {
                        console.log(errors)
                    })
            alert('Plotting isotherms using given SSL parameters...');


        }
    }
    render() {
        return (
            <Container fluid="xl" className="container_form">
                <Row>
                    <Col>
                        <div className="item1style">
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Row className="item_style">
                                        <Col sm="2" className="adsfont_style">
                                            <Form.Label> <b>Adsorbate 1:</b></Form.Label>
                                        </Col>
                                        <Col sm="3">
                                            <Form.Control
                                                as='select'
                                                value={this.state.adsb1}
                                                onChange={(event) => this.handleChangeValue(event, 'adsb1')}
                                            >
                                                <option value="Ar">Argon</option>
                                                <option value="CO<sub>2</sub>">Carbon dioxide</option>
                                                <option value="He">Helium</option>
                                                <option value="H<sub>2</sub>">Hydrogen</option>
                                                <option value="CH<sub>4</sub>">Methane</option>
                                                <option value="N<sub>2</sub>">Nitrogen</option>
                                                <option value="O<sub>2</sub>">Oxygen</option>
                                            </Form.Control>
                                        </Col>
                                        <Col>

                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="item_style">
                                        <Col sm="2">
                                        </Col>
                                        <Col sm="3">
                                            <b>SSL Fit Parameters</b>
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
                                                {this.state.qsat1_error}
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
                                                {this.state.b01_error}
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
                                                {this.state.delu1_error}
                                            </div>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="item_style">
                                        <Col sm="2" className="adsfont_style">
                                            <Form.Label><b>Adsorbate 2:</b></Form.Label>
                                        </Col>
                                        <Col sm="3">
                                            <Form.Control
                                                as='select'
                                                value={this.state.adsb2}
                                                onChange={(event) => this.handleChangeValue(event, 'adsb2')}
                                            >
                                                <option value="Ar">Argon</option>
                                                <option value="CO<sub>2</sub>">Carbon dioxide</option>
                                                <option value="He">Helium</option>
                                                <option value="H<sub>2</sub>">Hydrogen</option>
                                                <option value="CH<sub>4</sub>">Methane</option>
                                                <option value="N<sub>2</sub>">Nitrogen</option>
                                                <option value="O<sub>2</sub>">Oxygen</option>
                                            </Form.Control>
                                        </Col>
                                        <Col sm="3">
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="item_style">
                                        <Col sm="2">
                                        </Col>
                                        <Col sm="3">
                                            <b>SSL Fit Parameters</b>
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
                                                {this.state.qsat2_error}
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
                                                {this.state.b02_error}
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
                                                {this.state.delu2_error}
                                            </div>
                                        </Col>

                                    </Form.Row>
                                    <Form.Row >
                                        <Col sm="2">
                                        
                                        </Col>
                                        <Col sm="3">
                                           <Button type='submit' size="lg">Plot Isotherm</Button>
                                        </Col>
                                        <Col sm="2">
                                            <SslEqn />
                                        </Col>
                                        <Col sm="2">
                                            <SslEqnb />
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
                            <PlotIsotherm_1 adsbname={this.state.adsb1} isotherm_fit={this.state.isodata_1.isotherm_fit}  />
                        </div>
                    </Col>
                    <Col>
                        <div className="plotstyle">
                            <PlotIsotherm_1 adsbname={this.state.adsb2} isotherm_fit={this.state.isodata_2.isotherm_fit}  />
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