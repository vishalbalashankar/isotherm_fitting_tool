import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Row, Col, Button, Card} from 'react-bootstrap'
import './myStyles.css'
import axios from 'axios'
import PlotIsotherms_1 from './PlotIsotherms_1'
import PlotIsotherms_2 from './PlotIsotherms_2'
import Picture1 from './Picture1.png';

const initialState = {
    adsname: '',
    density: '',
    adsb1: 'co2',
    adsb2: 'n2',
    adsnameError: "",
    densityError: "",
    IsSubmit: false
}

class NameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeValue(event,key) {
        this.setState({[key]: event.target.value})
    }

    handleFile(event,key) {
        this.setState({
            [key]: event.target.files[0]
        })
        console.log(event.target.files[0]);
    }

    validate = () => {
        let adsnameError = "";
        let densityError = "";

        if (!this.state.adsname) {
            adsnameError = "adsorbent name cannot be empty"
        }
        if (!this.state.density) {
            densityError = "adsorbent density cannot be empty"
        }

        if (adsnameError || densityError) {
            this.setState({ adsnameError, densityError });
            return false;
        }

        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const fd = new FormData();
            fd.append('files[]',this.state.file_adsb1,this.state.file_adsb1.name)
            fd.append('files[]',this.state.file_adsb2,this.state.file_adsb2.name)

            axios.post('http://0.0.0.0:7501/upload-file',fd)
                .then(res => {
                    console.log(res);
                })
                .catch(errors =>{
                    console.log(errors)
                })
            this.setState(initialState);
            this.refs.file_1.value = '';
            this.refs.file_2.value = '';
            alert('A name was submitted: ' + this.state.adsname); 
            this.setState({
                IsSubmit: true
            })
        }
    }
    render() {
        return(
        <div className="container_form">
            <div className="item1style">
            <Card className="cardstyles" >
                <div class="text-center">
                <Card.Img src={Picture1}  className="cardimagestyles"/>
                </div>
                <Card.Body>
                    <Card.Title>
                        Welcome!!
                    </Card.Title>
                    <Card.Text style={{fontSize: 15}}>
                        The adsorbent screening process consists of 3 broad steps: 
                        <ul>
                        <li>Fit your isotherms to a competitive Langmuir model. </li>  
                        <li>Select the screening model of your choice. </li>
                        <li>Obtain the optimized results in a VSA process.</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group >
                    <Row>
                    <Col className='col-5'>
                    <Form.Label>Adsorbent Name: </Form.Label>
                    </Col>
                    <Col className='col-6'>
                    <Form.Control
                        type='text'
                        value={this.state.adsname}
                        onChange={ (event) => this.handleChangeValue(event,'adsname')} 
                    />
                    <div style={ {fontSize:12, color: "red"}}>
                        {this.state.adsnameError}
                    </div>
                    </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                    <Col className='col-5'>
                    <Form.Label>Density [kg/m3]: </Form.Label>
                    </Col>
                    <Col className='col-6'>
                    <Form.Control
                        type='number'
                        value={this.state.density}
                        onChange={ (event) => this.handleChangeValue(event,'density')} 
                        min='100'
                        max='3000'
                    />
                    <div style={ {fontSize:12, color: "red"}}>
                        {this.state.densityError}
                    </div>
                    </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                <Row>
                <Col className='col-5'>
                    <Form.Label>Adsorbate 1: </Form.Label>
                </Col>
                <Col className='col-6'>
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
                <Col className='col-5'>
                </Col>
                <Col className='col-4'>
                    <Form.File
                        className="position-relative"
                        required
                        ref="file_1"
                        name="file"
                        accept=".xlsx,.csv"
                        onChange={ (event) => this.handleFile(event,'file_adsb1')}
                    />
                </Col>
                </Row>
                </Form.Group>
                <Form.Group>
                <Row>
                <Col className='col-5'>
                <Form.Label>Adsorbate 2: </Form.Label>
                </Col>
                <Col className='col-6'>
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
                <Col className='col-5'>
                </Col>
                <Col className='col-4'>
                    <Form.File
                        className="position-relative"
                        required
                        name="file"
                        ref="file_2"
                        accept=".xlsx,.csv"
                        onChange={ (event) => this.handleFile(event,'file_adsb2')}
                    />
                </Col>
                </Row>
                </Form.Group>
                <Form.Group>
                <Button className='btn btn-lg form-contorl col-sm-4' type='submit'>Submit</Button>
                </Form.Group>
            </Form>
            </div>
            <div className="item2style">
            <PlotIsotherms_1 IsPlot={this.state.IsSubmit} AdsbName={this.state.adsb1}/>
            </div>
            <div className="item3style">
            <PlotIsotherms_2 IsPlot={this.state.IsSubmit} AdsbName={this.state.adsb2}/>
            </div>
            <div className="item4">
            </div>
            <div className="item5">
            </div>
            <div className="item6">
            </div>
        </div>

        )
    }
}

export default NameForm