import React from 'react';

import './custom-table-th.styles.scss';

const CustomTableTH = ({ index, label, handler, isOverview, isHead}) => (
  isOverview || isHead ?
    <th scope='row'>{label}</th>
  :
    <th scope='row'>
      <a href='/#' onClick={(e) => handler(e, index)}>[-]</a>
    </th>
);

export default CustomTableTH;
