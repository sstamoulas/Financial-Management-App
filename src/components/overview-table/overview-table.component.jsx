import React, { Component } from 'react';

import './overview-table.styles.scss';

class OverviewTable extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let { tableData, tableName, tableLayout: { headers: { colHeaders, rowHeaders }}, expectedHandler, paidHandler, dateHandler} = this.props;
    
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
              //'Last Month Paid', 'Expected Due', 'Paid', 'Date']
              rowHeaders.map((rowHeader, index) => (
                <tr key={`${tableName}-rowHeader-${index}`} className={rowHeader.isSummation && !rowHeader.hasOwnTable ? 'total-row' : ''}>
                  <th scope="row">{rowHeader.label}</th>
                  <td>
                    <span>${tableData['Overview'][rowHeader.label]['Last Month Paid']}</span>
                  </td>
                  <td>
                    {
                      rowHeader.isSummation ?
                        <span>${tableData['Overview'][rowHeader.label]['Expected Due']}</span>
                      :
                        <input type="number" value={tableData['Overview'][rowHeader.label]['Expected']} onChange={(e) => expectedHandler(e, rowHeader.label)} />
                    }
                  </td>
                  <td>
                    {
                      rowHeader.hasOwnTable ? 
                        <span>${tableData['Overview'][rowHeader.label]['Paid']}</span>
                      :
                      rowHeader.isSummation ?
                        <span>${tableData['Overview'][rowHeader.label]['Paid']}</span>
                      :
                        <input type="number" value={tableData['Overview'][rowHeader.label]['Paid']} onChange={(e) => paidHandler(e, rowHeader.label)} />
                    }
                  </td>
                  <td>
                    {
                      rowHeader.hasOwnTable ? 
                        <span>See Column</span>
                      :
                      rowHeader.isSummation ?
                        <span>${tableData['Overview'][rowHeader.label]['Date']}</span>
                      :
                        <input type="date" value={tableData['Overview'][rowHeader.label]['Date']} onChange={(e) => dateHandler(e, rowHeader.label)} />
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
