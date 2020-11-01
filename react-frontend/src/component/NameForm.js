import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap'

class NameForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            adsname: '',
            density: '',
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
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label> Adsorbent Name : </label>
                    <input
                        type='text'
                        value={this.state.adsname} 
                        onChange={(event) => this.handleChangeValue(event,'adsname')}
                    />
                </div>
                <div>
                    <label> Density [kg/m3] :</label>
                    <input
                        type='number'
                        value={this.state.density}
                        onChange={(event) => this.handleChangeValue(event,'density')}
                        min='100'
                        max='3000'
                        step='100' 
                    />
                </div>
                <div>
                    <label>Adsorbate 1 :</label>
                    <select value={this.state.adsb1} onChange={(event) =>  this.handleChangeValue(event,'adsb1')} >
                        <option value="co2">CO2</option>
                        <option value="n2">N2</option>
                        <option value="ch4">CH4</option>
                        <option value="H2">H2</option>
                        <option value="ar">Ar</option>
                    </select>
                </div>
                <div>
                    <label>Adsorbate 2 :</label>
                    <select value={this.state.adsb2} onChange={(event) => this.handleChangeValue(event,'adsb2')}>
                        <option value="co2">CO2</option>
                        <option value="n2">N2</option>
                        <option value="ch4">CH4</option>
                        <option value="H2">H2</option>
                        <option value="ar">Ar</option>
                    </select>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        )
    }
}

export default NameForm