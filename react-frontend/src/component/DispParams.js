import React from 'react';

const FullView = ( { adsbname, qsat, b0, dUb } ) => {
    return (
        <div>
            <h3>{adsbname} fit</h3>
            <ul>
                <li>qSat = {qsat}</li>
                <li>delH = {dUb}</li>
                <li>b = {b0}</li>
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

const DispParams = props => props.b0 
  ? <FullView {...props} />
  : <BlankView  {...props}  />

export default DispParams