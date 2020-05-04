import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ text, handler, className }) => (
  <button 
    type='button' 
    className={`btn btn-primary btn-lg btn-block ${className}`}
    onClick={() => handler()}
  >
    {text}
  </button>
);

export default CustomButton;
