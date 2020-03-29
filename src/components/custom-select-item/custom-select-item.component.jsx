import React from 'react';

import './custom-select-item.styles.scss';

const CustomSelectItem = ({handler, option}) => (
  <span 
    className="select-link" 
    onClick={() => handler(option)}
  >
    {option.label}
  </span>
);

export default CustomSelectItem;
