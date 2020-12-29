import * as React from 'react'

import { MathComponent } from 'mathjax-react'

class SslEqn extends React.Component {
  render () {
    return (
    <div>
      <MathComponent tex={String.raw`q_{i}^{*}= \frac{q_{\rm{sb}, i} b_i C_i}{1+b_i  C_i}`} /> 
    </div>
    )
  }
}

export default SslEqn