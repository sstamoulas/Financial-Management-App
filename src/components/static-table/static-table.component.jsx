import React from 'react';

import './static-table.styles.scss';

const StaticTable = () => (
  <div className="table-responsive text-center">
    <table className="table table-striped table-hover table-sm mb-0">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Due</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Car Maintenance</th>
          <td>${(60).toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">Car Insurance</th>
          <td>${(72.08).toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">Car Taxes</th>
          <td>${(104.85).toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">Qurban Savings</th>
          <td>${(125).toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">Yetim</th>
          <td>${(100).toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">Monthly Savings</th>
          <td>${(1000).toFixed(2)}</td>
        </tr>
        <tr className="total-row">
          <th scope="row">Total</th>
          <td>${(1461.93).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default StaticTable;
