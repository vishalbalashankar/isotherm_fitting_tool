import React from 'react';
import Plot from 'react-plotly.js';

class PlotIsotherms extends React.Component {
  render() {
    return (
      <div>
        {this.props.IsPlot ?
                        <Plot
                        data={[
                          {
                            x: [1, 2, 3],
                            y: [2, 6, 3],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                          },
                          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                        ]}
                        layout={ {width: 500, height: 400, title: 'Isotherms'} }
                      />  : null
        }
      </div>
    );
  }
}

export default PlotIsotherms