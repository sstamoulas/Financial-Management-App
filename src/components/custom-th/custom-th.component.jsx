import React from 'react';

import './custom-th.styles.scss';

const CustomTH = ({ index, usesLink, handler, children }) => (
  usesLink ?
    <th scope='row'>
      <a href='/#' onClick={(e) => handler(e, index)}>[-]</a>
    </th>
  :
    <th scope='row'>{children}</th>
);

export default CustomTH;
