import React, { Component } from 'react';

import './overview-table.styles.scss';

class OverviewTable extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let { tableName, tableData: { headers: { colHeaders, rowHeaders }}} = this.props;
    return (
      <div className="table-responsive w-100 text-center">
        <table className="table table-striped table-hover table-sm mb-0">
          <thead>
            <tr>
              {
                colHeaders.map((colHeader, index) => (
                  <th key={`${tableName}-colHeader-${index}`} scope="col">{colHeader}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              rowHeaders.map((rowHeader, index) => (
                <tr key={`${tableName}-rowHeader-${index}`}>
                  <th scope="row">{rowHeader.label}</th>
                  <td>
                    <span>$</span>
                  </td>
                  {
                    rowHeader.isSummation ?
                      <td>$</td>
                    :
                      <td><input type="number" /></td>
                  }
                  <td>
                    {
                      rowHeader.hasOwnTable ? 
                        <span>$</span>
                      :
                      rowHeader.isSummation ?
                        <span>$</span>
                      :
                        <input type="number" />
                    }
                  </td>
                  <td>
                    {
                      rowHeader.hasOwnTable ? 
                        <span>See Column</span>
                      :
                      rowHeader.isSummation ?
                        <span>$</span>
                      :
                        <input type="date" />
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default OverviewTable;
