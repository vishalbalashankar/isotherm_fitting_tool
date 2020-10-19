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
    this.handleChangeAdsName = this.handleChangeAdsName.bind(this);
    this.handleChangeDensity = this.handleChangeDensity.bind(this);
    this.handleChangePorosity = this.handleChangePorosity.bind(this);
    this.handleChangeAdsb1 = this.handleChangeAdsb1.bind(this);
    this.handleChangeAdsb2 = this.handleChangeAdsb2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  handleChangeAdsName(event) {
    this.setState({adsname: event.target.value})
  }

  handleChangeDensity(event) {
    this.setState({density: event.target.value})
  }

  handleChangePorosity(event) {
    this.setState({porosity: event.target.value})
  }

  handleChangeAdsb1(event) {
    this.setState({adsb1: event.target.value});
  }

  handleChangeAdsb2(event) {
    this.setState({adsb2: event.target.value});
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
          onChange = {this.handleChangeAdsName} />
          </label>
        </ul>
        <ul>
          <label>
            Density [kg/m3]:
            <input type="number" value= {this.state.density} 
            onChange = {this.handleChangeDensity} />
          </label> 
        </ul>
        <ul>
          <label>
            Porosity [-]:
            <input type="number" value= {this.state.porosity} 
            onChange = {this.handleChangePorosity} />
          </label> 
        </ul>
        <ul>
          <label>
            Adsorbate - 1:
            <select value={this.state.adsb1} onChange={this.handleChangeAdsb1}>
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
            <select value={this.state.adsb2} onChange={this.handleChangeAdsb2}>
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
