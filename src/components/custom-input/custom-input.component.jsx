import React from 'react';

import './custom-input.styles.scss';

const CustomInput = ({ index, label, value, handler, id, className}) => (
  <input 
    type='text' 
    id={id}
    value={value || ''} 
    className={className}
    onChange={(e) => handler(e.target.value, label.toLowerCase(), index)} 
  />
);

export default CustomInput;
