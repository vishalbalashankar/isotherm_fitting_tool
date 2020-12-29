import * as React from 'react'

import { MathComponent } from 'mathjax-react'

class SslEqnb extends React.Component {
  render () {
    return (
    <div>
      <MathComponent tex={String.raw`b_{i}=b_{0, i} e^{-\Delta U_{b, i} / R_{\mathrm{g}} T}`} />
    </div>
    )
  }
}

export default SslEqnb