import React from 'react';

const FullView = ( { adsbname, popt } ) => {
    return (
        <div>
            <h3>{adsbname} fit</h3>
            <ul>
                <li>qsat = {popt.qsat}</li>
                <li>delH = {popt.dUb}</li>
                <li>b0 = {popt.b0}</li>
            </ul>
        </div>
    )
}

const BlankView = ( { adsbname } ) => {
    return (
        <div>
            <h3>{adsbname} fit</h3>
            <ul>
                <li>qSat = </li>
                <li>delH = </li>
                <li>b = </li>
            </ul>
        </div>
    )
}

const DispParams = props => props.popt 
  ? <FullView {...props} />
  : <BlankView  {...props}  />

export default DispParams