import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Row, Col, Button} from 'react-bootstrap'
import './myStyles.css'
class NameForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            adsname: 'Zeolite-13X',
            density: '1100',
            adsb1: 'co2',
            adsb2: 'n2'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeValue(event,key) {
        this.setState({[key]: event.target.value})
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.adsname);
        event.preventDefault();
    }
    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Row>
                    <Col>
                    <Form.Label>Adsorbent Name: </Form.Label>
                    </Col>
                    <Col>
                    <Form.Control
                        type='text'
                        value={this.state.adsname}
                        onChange={ (event) => this.handleChangeValue(event,'adsname')} 
                    />
                    </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                    <Col>
                    <Form.Label>Density [kg/m3]: </Form.Label>
                    </Col>
                    <Col>
                    <Form.Control
                        type='number'
                        value={this.state.density}
                        onChange={ (event) => this.handleChangeValue(event,'density')} 
                        min='100'
                        max='3000'
                    />
                    </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                <Row>
                <Col>
                    <Form.Label>Adsorbate 1: </Form.Label>
                </Col>
                <Col>
                    <Form.Control
                        as='select'
                        value={this.state.adsb1}
                        onChange={ (event) => this.handleChangeValue(event,'adsb1')}
                    >
                        <option value="co2">Carbon dioxide</option>
                        <option value="n2">Nitrogen</option>
                        <option value="ch4">Methane</option>
                        <option value="H2">Hydrogen</option>
                        <option value="ar">Argon</option>
                    </Form.Control>
                </Col>
                </Row>
                <Row>
                <Col xs={6}>
                </Col>
                <Col xs={6}>
                    <Form.File
                        className="position-relative"
                        required
                        name="file"
                    />
                </Col>
                </Row>
                </Form.Group>
                <Form.Group>
                <Row>
                <Col>
                <Form.Label>Adsorbate 2: </Form.Label>
                </Col>
                <Col>
                    <Form.Control
                        as='select'
                        value={this.state.adsb2}
                        onChange={ (event) => this.handleChangeValue(event,'adsb2')}
                    >
                        <option value="co2">Carbon dioxide</option>
                        <option value="n2">Nitrogen</option>
                        <option value="ch4">Methane</option>
                        <option value="H2">Hydrogen</option>
                        <option value="ar">Argon</option>
                    </Form.Control>
                </Col>
                </Row>
                <Row>
                <Col xs={6}>
                </Col>
                <Col xs={6}>
                    <Form.File
                        className="position-relative"
                        required
                        name="file"
                    />
                </Col>
                </Row>
                </Form.Group>
                <Form.Group>
                <Button type='submit'>Submit</Button>
                </Form.Group>
            </Form>
        )
    }
}

export default NameForm