import React from 'react';

import CustomTH from '../custom-th/custom-th.component';
import CustomTD from '../custom-td/custom-td.component';
import CustomTHead from '../custom-thead/custom-thead.component';
import CustomTRTotal from '../custom-tr-total/custom-tr-total.component';

import { formatDate } from '../../redux/expense/expense.utils';

import './with-table.styles.scss';

const WithTable = (WrappedComponent) => (props) => {
  const { tableOptions, headers, credits, hasDueItems, usesLink, children } = props;
  const { updateItem, removeItem, updateItemStart, removeItemStart, tabHandler } = props;

  const updateRowItem = (value, label, index) => {
    if(label === 'date') {
      value = formatDate(value)
    }

    updateItem(index, value, label);
    updateItemStart(index, value, label);
  } 

  const removeRowItem = (event, index) => {
    event.preventDefault();
    removeItem(index);
    removeItemStart(index);
  }

  return (
    <div className='table-responsive text-center'>
      <table className='table table-striped table-hover table-sm mb-0'>
        <CustomTHead headers={headers} />
        <tbody>
          {
            credits.map((credit, index) => {
              let {paid, due, label, date, hasOwnTable} = credit;
              let customLabel = credit.hasOwnProperty('due') ? 'due' : 'label';
              let customValue = credit.hasOwnProperty('due') ? due : label;
              let optionLabel = tableOptions.find((option, index) => option.label === `${label} Expense`);
              let dateValue = hasOwnTable ? optionLabel.value : date;
              let handler = hasOwnTable ? tabHandler : updateRowItem;

              return (
                <tr key={`credit-${index}`}>
                  <CustomTH index={index} handler={removeRowItem} usesLink={usesLink}>{usesLink ? '[-]' : label}</CustomTH>
                  <CustomTD index={index} handler={updateRowItem} value={customValue} hasOwnTable={false} isDate={false} label={customLabel} />
                  <CustomTD index={index} handler={updateRowItem} value={paid} hasOwnTable={hasOwnTable} isDate={false} label='paid' />
                  <CustomTD index={index} handler={handler} value={dateValue} hasOwnTable={hasOwnTable} isDate={true} />
                </tr>
              )
            })
          }
          <CustomTRTotal title='Total Credits' credits={credits} hasDueItems={hasDueItems} />
          <WrappedComponent {...props}>
            {children}
          </WrappedComponent>
        </tbody>
      </table>
    </div>
  )
}

export default WithTable;
