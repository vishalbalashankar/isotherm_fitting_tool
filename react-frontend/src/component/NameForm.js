import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Row, Col, Button, Card} from 'react-bootstrap'
import './myStyles.css'
import axios from 'axios'
import PlotIsotherm from './PlotIsotherm'
import DispParams from './DispParams'
import Picture1 from './Picture1.png';

const initialState = {
    adsname: '',
    density: '',
    adsb1: 'co2',
    adsb2: 'n2',
    adsnameError: "",
    densityError: "",
    issubmit: false
}

class NameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adsname: '',
            density: '',
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
            const fd_1 = new FormData();
            const fd_2 = new FormData();

            fd_1.append('files[]',this.state.file_adsb1,this.state.file_adsb1.name)
            fd_2.append('files[]',this.state.file_adsb2,this.state.file_adsb2.name)

            axios.post('http://0.0.0.0:7501/uploadfile',fd_1)
                .then(res => {
                    this.setState({
                        isodata_1: res.data
                    });
                    console.log(res);
                })
                .catch(errors =>{
                    console.log(errors)
                })
            axios.post('http://0.0.0.0:7501/uploadfile',fd_2)
                .then(res_2 => {
                    this.setState({
                        isodata_2: res_2.data
                    });
                    console.log(this.state.isodata_2.popt)
                })
                .catch(errors =>{
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
        return(
        <div className="container_form">
            <div className="item1style">
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
            <PlotIsotherm adsbname={this.state.adsb1} isotherm={this.state.isodata_1.isotherm} isotherm_fit={this.state.isodata_1.isotherm_fit}/>
            </div>
            <div className="item3style">
            <PlotIsotherm adsbname={this.state.adsb2} isotherm={this.state.isodata_2.isotherm} isotherm_fit={this.state.isodata_2.isotherm_fit}/>
            </div>
            <div className="item4">
            </div>
            <div className="item5">
            <DispParams adsbname={this.state.adsb1} popt={this.state.isodata_1.popt}/>
            </div>
            <div className="item6">
            <DispParams adsbname={this.state.adsb2} popt={this.state.isodata_2.popt}/>
            </div>
        </div>

        )
    }
}

export default NameForm