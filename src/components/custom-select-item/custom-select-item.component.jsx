import React, { memo } from 'react';

import './custom-select-item.styles.scss';

const areEqual = (prevProps, nextProps) => {
  return prevProps.option === nextProps.option;
}

const CustomSelectItem = ({option, handler}) => (
  <span 
    className='select-link' 
    onClick={() => handler(option.value)}
  >
    {option.label}
  </span>
);

export default memo(CustomSelectItem, areEqual);
