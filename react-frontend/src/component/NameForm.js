import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import './myStyles.css'
import axios from 'axios'
import PlotIsotherm from './PlotIsotherm'

const initialState = {
    adsb1: 'co2',
    adsb2: 'n2',
    issubmit: false
}

class NameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adsb1: 'co2',
            adsb2: 'n2',
            adsnameError: "",
            densityError: "",
            isodata_1: "",
            isodata_2: "",
            issubmit: false
        };
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
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const fd_1 = new FormData();
            const fd_2 = new FormData();

            fd_1.append('files[]', this.state.file_adsb1, this.state.file_adsb1.name)
            fd_2.append('files[]', this.state.file_adsb2, this.state.file_adsb2.name)

            axios.post('http://0.0.0.0:7501/uploadfile', fd_1)
                .then(res => {
                    this.setState({
                        isodata_1: res.data
                    });
                    console.log(res);
                })
                .catch(errors => {
                    console.log(errors)
                })
            axios.post('http://0.0.0.0:7501/uploadfile', fd_2)
                .then(res_2 => {
                    this.setState({
                        isodata_2: res_2.data
                    });
                    console.log(this.state.isodata_2.popt)
                })
                .catch(errors => {
                    console.log(errors)
                })
            this.setState(initialState);
            this.refs.file_1.value = '';
            this.refs.file_2.value = '';
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
                                        <Col sm="2">
                                            <Form.Control placeholder="qSat [mol/kg]" size="sm" />
                                        </Col>
                                        <Col sm="2">
                                            <Form.Control placeholder="b0 [m3/mol]" size="sm" />
                                        </Col>
                                        <Col sm="2">
                                            <Form.Control placeholder="delU [kJ/mol]" size="sm" />
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col sm="2">
                                        </Col>
                                        <Col sm="3">
                                            <Form.File
                                                className="position-relative"
                                                required
                                                ref="file_1"
                                                name="file"
                                                accept=".xlsx,.csv"
                                                onChange={(event) => this.handleFile(event, 'file_adsb1')}
                                            />
                                        </Col>
                                    </Form.Row>
                                    <Form.Row  className="item_style">
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
                                        <Col sm="2">
                                            <Form.Control placeholder="qSat [mol/kg]" size="sm" />
                                        </Col>
                                        <Col sm="2">
                                            <Form.Control placeholder="b0 [m3/mol]" size="sm" />
                                        </Col>
                                        <Col sm="2">
                                            <Form.Control placeholder="delU [kJ/mol]" size="sm" />
                                        </Col>

                                    </Form.Row>
                                    <Form.Row>
                                        <Col sm="2">
                                        </Col>
                                        <Col sm="3">
                                            <Form.File
                                                className="position-relative"
                                                required
                                                name="file"
                                                ref="file_2"
                                                accept=".xlsx,.csv"
                                                onChange={(event) => this.handleFile(event, 'file_adsb2')}
                                            />
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="item_style">
                                        <Button type='submit'>Submit</Button>
                                    </Form.Row>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="plotstyle">
                            <PlotIsotherm adsbname={this.state.adsb1} isotherm={this.state.isodata_1.isotherm} isotherm_fit={this.state.isodata_1.isotherm_fit} />
                        </div>
                    </Col>
                    <Col>
                        <div className="plotstyle">
                            <PlotIsotherm adsbname={this.state.adsb2} isotherm={this.state.isodata_2.isotherm} isotherm_fit={this.state.isodata_2.isotherm_fit} />
                        </div>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default NameForm