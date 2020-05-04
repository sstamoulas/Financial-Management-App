import React from 'react';

import CustomTH from '../custom-th/custom-th.component';
import CustomTD from '../custom-td/custom-td.component';

import './static-table.styles.scss';

const StaticTable = () => (
  <div className='table-responsive text-center'>
    <table className='table table-striped table-hover table-sm mb-0'>
      <thead>
        <tr>
          <CustomTH usesLink={false}>Name</CustomTH>
          <CustomTH usesLink={false}>Due</CustomTH>
        </tr>
      </thead>
      <tbody>
        <tr>
          <CustomTH usesLink={false}>Car Maintenance</CustomTH>
          <CustomTD value={60} isTotal={true} />
        </tr>
        <tr>
          <CustomTH usesLink={false}>Car Insurance</CustomTH>
          <CustomTD value={72.08} isTotal={true} />
        </tr>
        <tr>
          <CustomTH usesLink={false}>Car Taxes</CustomTH>
          <CustomTD value={104.85} isTotal={true} />
        </tr>
        <tr>
          <CustomTH usesLink={false}>Qurban Savings</CustomTH>
          <CustomTD value={125} isTotal={true} />
        </tr>
        <tr>
          <CustomTH usesLink={false}>Yetim</CustomTH>
          <CustomTD value={100} isTotal={true} />
        </tr>
        <tr>
          <CustomTH usesLink={false}>Monthly Savings</CustomTH>
          <CustomTD value={1000} isTotal={true} />
        </tr>
        <tr className='total-row'>
          <CustomTH usesLink={false}>Total</CustomTH>
          <CustomTD value={1461.93} isTotal={true} />
        </tr>
      </tbody>
    </table>
  </div>
);

export default StaticTable;
