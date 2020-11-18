import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

class PlotIsotherms_1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xdata: [],
      ydata: [],
      isotherms: '',
    }
    this.applyData = this.applyData.bind(this);
  }
  componentDidMount() {
  //  this.applyData();
  }
  applyData = () => {
    axios.get('http://0.0.0.0:7501/isotherms/?adsbnum=1')
    .then(response => {
      const isotherm = response.data.isotherm;
      this.setState({
        xdata: isotherm.map( isotherm => isotherm.P),
        ydata: isotherm.map( isotherm => isotherm.q)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
   
    
    return (
      <div>
  
  <Plot
        data={[
          {
            x: this.state.xdata,
            y: this.state.ydata,
            type: 'scattergl',
            mode: 'markers',
            marker: {color: 'red'},
            xtitle: "Pressure [bar]",
          },
        ]}
        layout = { 
          { 
            width: 425,
            height: 400,
            title: this.props.AdsbName + ' Isotherm',
            config: {
              responsive: true
            },
            xaxis: {
              zeroline: true,
              ticks: 'outside',
              title: 'Pressure [bar]',
              range: [0,],
              titlefont: {
                size: 16,
              },
              mirror: 'axes',
              tickfont: {
                size: 14,
                color: 'black'
              },
            },
            yaxis: {
              ticks: 'outside',
              mirror: 'allticks',
              title: 'Equilibrium Loading [mol/kg]',
              range: [0,],
              titlefont: {
                size: 16,
              },
              mirror: 'axes',
              tickfont: {
                size: 14,
                color: 'black'
              },
            },

          } 
        }
        />    
        
      </div>
    );
  }
}

export default PlotIsotherms_1