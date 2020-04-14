import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ text, handler }) => (
  <button 
    type="button" 
    className="btn btn-primary btn-lg btn-block"
    onClick={() => handler()}
  >
    {text}
  </button>
);

export default CustomButton;
