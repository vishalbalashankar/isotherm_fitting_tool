import * as React from 'react'

import { MathComponent } from 'mathjax-react'

class SslEqn extends React.Component {
  render () {
    return (
      <MathComponent tex={String.raw`\int_0^1 x^2\ dx`} />
    )
  }
}

export default SslEqn