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

    const isotherm = this.props.plotdata;

    return (
      
      <div className="item2style">
         
        {isotherm ? 
      
      
      <Plot
            data={[
              {
                x:  isotherm.map( isotherm => isotherm.P),
                y:  isotherm.map( isotherm => isotherm.q),
                type: 'scattergl',
                mode: 'markers',
                marker: {color: 'blue'},
                xtitle: "Pressure [bar]",
              },
            ]}
            layout = { 
              { 
                width: 425,
                height: 400,
                title: this.props.adsbname + ' Isotherm',
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
            />  : 
            <Plot
                  data={[
                    {
                      x:  [],
                      y:  [],
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
                      title: this.props.adsbname + ' Isotherm',
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
                  /> }  
            
        
      </div>
    );
  }
}

export default PlotIsotherms_2