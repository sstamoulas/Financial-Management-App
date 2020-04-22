import React from 'react';

import CustomTableTH from '../custom-table-th/custom-table-th.component';
import CustomTableTD from '../custom-table-td/custom-table-td.component';

import './static-table.styles.scss';

const StaticTable = () => (
  <div className='table-responsive text-center'>
    <table className='table table-striped table-hover table-sm mb-0'>
      <thead>
        <tr>
          <CustomTableTH label='Name' isHead={true} />
          <CustomTableTH label='Due' isHead={true} />
        </tr>
      </thead>
      <tbody>
        <tr>
          <CustomTableTH label='Car Maintenance' isHead={true} />
          <CustomTableTD value={60} isTotal={true} />
        </tr>
        <tr>
          <CustomTableTH label='Car Insurance' isHead={true} />
          <CustomTableTD value={72.08} isTotal={true} />
        </tr>
        <tr>
          <CustomTableTH label='Car Taxes' isHead={true} />
          <CustomTableTD value={104.85} isTotal={true} />
        </tr>
        <tr>
          <CustomTableTH label='Qurban Savings' isHead={true} />
          <CustomTableTD value={125} isTotal={true} />
        </tr>
        <tr>
          <CustomTableTH label='Yetim' isHead={true} />
          <CustomTableTD value={100} isTotal={true} />
        </tr>
        <tr>
          <CustomTableTH label='Monthly Savings' isHead={true} />
          <CustomTableTD value={1000} isTotal={true} />
        </tr>
        <tr className='total-row'>
          <CustomTableTH label='Total' isHead={true} />
          <CustomTableTD value={1461.93} isTotal={true} />
        </tr>
      </tbody>
    </table>
  </div>
);

export default StaticTable;
