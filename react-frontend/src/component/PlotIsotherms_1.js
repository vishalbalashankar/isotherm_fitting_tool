import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

class PlotIsotherms_1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xdata: [0, 0.5, 1],
      ydata: [0, 0.5, 1],
      isotherms: '',
    }
  }
  
  componentDidMount() {
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
        {this.props.IsPlot ?
                        <Plot
                        data={[
                          {
                            x: this.state.xdata,
                            y: this.state.ydata,
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'red'},
                          },
                        ]}
                        layout={ {width: 450, height: 315, title: 'Isotherms'} }
                      />  : null
        }
      </div>
    );
  }
}

export default PlotIsotherms_1