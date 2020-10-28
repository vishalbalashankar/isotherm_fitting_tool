import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class NameForm extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      adsname: 'Zeolite-13X',
      density: 1130,
      porosity: 0.34,
      adsb1: 'CO2',
      adsb2: 'N2',
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  handleChangeValue(event,key) {
    this.setState({[key]: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.adsname);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Adsorbent Screening Tool</h1>
        <ul>
          <label>
          Adsorbent Name:
          <input type="text" value= {this.state.adsname} 
          onChange = {(event) => this.handleChangeValue(event,'adsname')} />
          </label>
        </ul>
        <ul>
          <label>
            Density [kg/m3]:
            <input type="number" value= {this.state.density} min='100' max='3000' step='100'
            onChange = {(event) => this.handleChangeValue(event,'density')} />
          </label> 
        </ul>
        <ul>
          <label>
            Porosity [-]:
            <input type="number" value= {this.state.porosity} min='0.1' max='0.9' step='0.01'
            onChange = {(event) => this.handleChangeValue(event,'porosity')} />
          </label> 
        </ul>
        <ul>
          <label>
            Adsorbate - 1:
            <select value={this.state.adsb1} onChange={(event) => this.handleChangeValue(event,'adsb1')}>
              <option value="co2">CO2</option>
              <option value="n2">N2</option>
              <option value="ch4">CH4</option>
              <option value="h2">H2</option>
            </select>
          </label>
        </ul>
        <ul>
          <label>
            Adsorbate - 2:
            <select value={this.state.adsb2} onChange={(event) => this.handleChangeValue(event,'adsb2')}>
              <option value="co2">CO2</option>
              <option value="n2">N2</option>
              <option value="ch4">CH4</option>
              <option value="h2">H2</option>
            </select>
          </label>
        </ul>
        <ul>
          <input type ="submit" value="Submit" />
        </ul>
      </form>
    )
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);

// If you want your app to work offlinade and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
