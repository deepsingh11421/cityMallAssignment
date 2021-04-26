import React from 'react';
import './Button.css';

const Button = props => {
    return(
        <button className="btnClass" {...props}>{props.children}</button>
    )
}

export default Button;