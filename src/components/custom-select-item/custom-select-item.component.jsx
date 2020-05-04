import React from 'react';

import './custom-select-item.styles.scss';

const CustomSelectItem = ({index, option, handler}) => (
  <span 
    className='select-link' 
    onClick={() => handler(index)}
  >
    {option.label}
  </span>
);

export default CustomSelectItem;
