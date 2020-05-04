import React from 'react';

import './custom-input.styles.scss';

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

export default CustomInput;
