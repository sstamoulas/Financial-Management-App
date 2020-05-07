import React, { memo } from 'react';

import './custom-input.styles.scss';

const areEqual = (prevProps, nextProps) => {
  return prevProps.value === nextProps.value &&
  prevProps.label === nextProps.label;
}

const CustomInput = ({ index, label, value, handler, className }) => (
  <>
    <label htmlFor={`${label}-${index}`} className='hide'>{value}</label>
    <input 
      type='text' 
      id={`${label}-${index}`}
      value={value || ''} 
      className={className}
      onChange={(e) => handler(e.target.value, label.toLowerCase(), index)} 
    />
  </>
);

export default memo(CustomInput, areEqual);
