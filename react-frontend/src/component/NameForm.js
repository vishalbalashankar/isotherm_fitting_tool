import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Button} from 'react-bootstrap'

class NameForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            adsname: 'Zeolite-13X',
            density: '1130',
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
                    <Form.Label>Adsorbent Name: </Form.Label>
                    <Form.Control
                        type='text'
                        value={this.state.adsname}
                        onChange={ (event) => this.handleChangeValue(event,'adsname')} 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Density [kg/m3]: </Form.Label>
                    <Form.Control
                        type='number'
                        value={this.state.density}
                        onChange={ (event) => this.handleChangeValue(event,'density')} 
                        min='100'
                        max='3000'
                        step='100'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Adsorbate 1: </Form.Label>
                    <Form.Control
                        as='select'
                        value={this.state.adsb1}
                        onChange={ (event) => this.handleChangeValue(event,'adsb1')}
                    >
                        <option value="co2">CO2</option>
                        <option value="n2">N2</option>
                        <option value="ch4">CH4</option>
                        <option value="H2">H2</option>
                        <option value="ar">Ar</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Adsorbate 2: </Form.Label>
                    <Form.Control
                        as='select'
                        value={this.state.adsb2}
                        onChange={ (event) => this.handleChangeValue(event,'adsb2')}
                    >
                        <option value="co2">CO2</option>
                        <option value="n2">N2</option>
                        <option value="ch4">CH4</option>
                        <option value="H2">H2</option>
                        <option value="ar">Ar</option>
                    </Form.Control>
                </Form.Group>

                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

export default NameForm