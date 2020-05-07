import React, { memo } from 'react';

import './custom-th.styles.scss';

const areEqual = (prevProps, nextProps) => {
  return prevProps.children === nextProps.children;
}

const CustomTH = ({ index, usesLink, handler, children }) => (
  usesLink ?
    <th scope='row'>
      <a href='/#' onClick={(e) => handler(e, index)}>{children}</a>
    </th>
  :
    <th scope='row'>{children}</th>
);

export default memo(CustomTH, areEqual);
