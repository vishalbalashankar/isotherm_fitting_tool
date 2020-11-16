import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

class PlotIsotherms_1 extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.IsoData) {
      const isotherm = this.props.Isodata;
      this.state = {
        xdata: isotherm.map( isotherm => isotherm.P),
        ydata: isotherm.map( isotherm => isotherm.q)
      }
    } 
    else {
      this.state = {
        xdata: [],
        ydata: [],
      }
  }
  }
  

  render() {

  //  if (this.props.Isodata) {
  //    const isotherm = this.props.Isodata;
  //    this.setState({
  //      xdata: isotherm.map( isotherm => isotherm.P),
  //      ydata: isotherm.map( isotherm => isotherm.q)
  //    })
  console.log(this.props.IsoData)

     
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