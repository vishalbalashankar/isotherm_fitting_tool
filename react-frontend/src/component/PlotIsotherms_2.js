import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import './myStyles.css'

class PlotIsotherms_2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xdata: [],
      ydata: [],
    }
  }
  
  render() {
    return (
      
      <div className="item2style">
         
        <Plot
        data={[
          {
            x: this.state.xdata,
            y: this.state.ydata,
            type: 'scattergl',
            mode: 'markers',
            marker: {color: 'blue'},
            xtitle: "Pressure [bar]",
          },
        ]}
        layout = { 
          { 
            width: 400,
            height: 400,
            title: 'Isotherms',
            title: this.props.AdsbName + ' Isotherm',
            config: {
              responsive: true
            },
            xaxis: {
              zeroline: true,
              ticks: 'outside',
              title: 'Pressure [bar]',
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

export default PlotIsotherms_2