import React from 'react';

import './select-dropdown-item.styles.scss';

const SelectDropdownItem = ({handler, option}) => (
  <span className="select-link" onClick={() => handler(option)}>{option.label}</span>
);

export default SelectDropdownItem;
