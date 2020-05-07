import React, { memo } from 'react';

import './custom-button.styles.scss';

const areEqual = (prevProps, nextProps) => {
  return prevProps.text === nextProps.text;
}

const CustomButton = ({ text, handler, className }) => (
  <button 
    type='button' 
    className={`btn btn-primary btn-lg btn-block ${className}`}
    onClick={() => handler()}
  >
    {text}
  </button>
);

export default memo(CustomButton, areEqual);
