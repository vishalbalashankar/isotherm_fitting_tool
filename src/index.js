import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class NameForm extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      adsname: 'zeolite',
      density: 1300,
      porosity: 0.34,
    };
    this.handleChangeAdsName = this.handleChangeAdsName.bind(this);
    this.handleChangeDensity = this.handleChangeDensity.bind(this);
    this.handleChangePorosity = this.handleChangePorosity.bind(this);
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

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.adsname);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          <label>
          Adsorbent Name:
          <input type="text" value= {this.state.adsname} 
          onChange = {this.handleChangeAdsName} />
          </label>
        </ul>
        <ul>
          <label>
            Density:
            <input type="number" value= {this.state.density} 
            onChange = {this.handleChangeDensity} />
          </label> 
        </ul>
        <ul>
          <label>
            Porosity:
            <input type="number" value= {this.state.porosity} 
            onChange = {this.handleChangePorosity} />
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
