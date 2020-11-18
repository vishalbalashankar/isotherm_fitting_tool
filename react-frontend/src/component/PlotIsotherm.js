import React from 'react';
import Plot from 'react-plotly.js';

class PlotIsotherm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xdata: [],
      ydata: [],
    }
  }
  
  render() {

    const isotherm = this.props.plotdata.isotherm;
    const isotherm_fit = this.props.plotdata.isotherm_fit;
   
    return (
      <div>
        {isotherm ? 
            
            
            <Plot
                  data={[
                    {
                      x:  isotherm.map( isotherm => isotherm.P),
                      y:  isotherm.map( isotherm => isotherm.q),
                      type: 'scattergl',
                      mode: 'markers',
                      marker: {color: 'red'},
                      name: "Exp"
                    },
                    {
                      x:  isotherm_fit.map( isotherm_fit => isotherm_fit.Pfit),
                      y:  isotherm_fit.map( isotherm_fit => isotherm_fit.qfit),
                      type: 'scattergl',
                      mode: 'line',
                      marker: {color: 'blue'},
                      name: "Fit"
                    }
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

export default PlotIsotherm