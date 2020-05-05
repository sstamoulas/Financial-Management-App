import React from 'react';

import CustomTH from '../custom-th/custom-th.component';
import CustomTD from '../custom-td/custom-td.component';

import './static-table.styles.scss';

const StaticTable = () => (
  <div className='table-responsive text-center'>
    <table className='table table-striped table-hover table-sm mb-0'>
      <thead>
        <tr>
          <CustomTH>Name</CustomTH>
          <CustomTH>Due</CustomTH>
        </tr>
      </thead>
      <tbody>
        <tr>
          <CustomTH>Car Maintenance</CustomTH>
          <CustomTD value={60} isTotal />
        </tr>
        <tr>
          <CustomTH>Car Insurance</CustomTH>
          <CustomTD value={72.08} isTotal />
        </tr>
        <tr>
          <CustomTH>Car Taxes</CustomTH>
          <CustomTD value={104.85} isTotal />
        </tr>
        <tr>
          <CustomTH>Qurban Savings</CustomTH>
          <CustomTD value={125} isTotal />
        </tr>
        <tr>
          <CustomTH>Yetim</CustomTH>
          <CustomTD value={100} isTotal />
        </tr>
        <tr>
          <CustomTH>Monthly Savings</CustomTH>
          <CustomTD value={1000} isTotal />
        </tr>
        <tr className='total-row'>
          <CustomTH>Total</CustomTH>
          <CustomTD value={1461.93} isTotal />
        </tr>
      </tbody>
    </table>
  </div>
);

export default StaticTable;
