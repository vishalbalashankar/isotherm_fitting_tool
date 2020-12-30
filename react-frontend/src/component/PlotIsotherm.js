import React from 'react';
import Plot from 'react-plotly.js';

const getData = ( {isotherm, isotherm_fit} ) => ([
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
    mode: 'markers',
    marker: {color: 'blue'},
    name: "Fit"
  }
]);
const getLayout = ( { adsbname } ) => (
  { 
/*    width: 400,
    height: 400, */
    autosize: true,
    title: `${adsbname} Isotherm`,
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

  });

const FullView = ( { isotherm, isotherm_fit, adsbname} ) => (
  <Plot
    data={ getData ( {isotherm, isotherm_fit} ) }
    layout = { getLayout( { adsbname }) }
    useResizeHandler = {true}
    style = {{width: "100%", height: "100%"}}
    />
);

const BlankView = ( { adsbname } ) => (
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
      layout = { getLayout( { adsbname }) }
      useResizeHandler = {true}
      style = {{width: "100%", height: "100%"}}
      />

);

const PlotIsotherm = props => props.isotherm 
  ? <FullView {...props} />
  : <BlankView  {...props}  />

export default PlotIsotherm