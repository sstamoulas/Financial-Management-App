import React from 'react';

import CustomTH from '../custom-th/custom-th.component';

import './custom-thead.styles.scss';

const CustomTHead = ({ headers }) => (
  <thead>
    <tr>
      {
        headers.map((header, index) => 
          <CustomTH key={`thead-${index}`} isLabel={true}>{header}</CustomTH>
        )
      }
    </tr>
  </thead>
);

export default CustomTHead;
