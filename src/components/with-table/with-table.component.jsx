import React from 'react';
import { batch } from 'react-redux';

import CustomTH from '../custom-th/custom-th.component';
import CustomTD from '../custom-td/custom-td.component';
import CustomTHead from '../custom-thead/custom-thead.component';
import CustomTRTotal from '../custom-tr-total/custom-tr-total.component';

import { formatDate } from '../../redux/expense/expense.utils';

import './with-table.styles.scss';

const WithTable = (WrappedComponent) => (props) => {
  const { tableOptions, selectedTable, headers, credits, hasDueItems, usesLink, children } = props;
  const { updateItems, removeItems, updateItemsStart, removeItemsStart, removeMetaTableStart, tabHandler } = props;

  const updateRowItem = (value, label, index) => {
    if(label === 'date') {
      value = formatDate(value)
    }

    batch(() => {
      updateItems(index, value, label);
      updateItemsStart(index, value, label);
    })
  } 

  const removeRowItem = (event, index) => {
    event.preventDefault();

    batch(() => {
      removeItems(index);
      removeItemsStart(index);

      if(removeMetaTableStart) {
        removeMetaTableStart(index);
      }
    })
  }

  return (
    <div className='mt-5 table-responsive text-center'>
      <table className='table table-striped table-hover table-sm mb-0'>
        <CustomTHead headers={headers} />
        <tbody>
          {
            credits && credits.map((credit, index) => {
              let {paid, due, label, date, hasOwnTable} = credit;
              let customLabel = selectedTable.value === 0 ? 'due' : 'label';
              let customValue = selectedTable.value === 0 ? due : label;
              let optionLabel = tableOptions.find((option, index) => option.label === label);
              let dateValue = hasOwnTable ? optionLabel.value : date;
              let handler = hasOwnTable ? tabHandler : updateRowItem;

              return (
                <tr key={`credit-${credit.value}`}>
                  <CustomTH index={credit.value} handler={removeRowItem} usesLink={usesLink}>[-]</CustomTH>
                  {
                    selectedTable.value === 0 && (
                      <CustomTD label={label} className={'bold'} isBlank />
                    )
                  }
                  <CustomTD index={credit.value} handler={updateRowItem} value={customValue} label={customLabel} />
                  <CustomTD index={credit.value} handler={updateRowItem} value={paid} hasOwnTable={hasOwnTable} label='paid' />
                  <CustomTD index={credit.value} handler={handler} value={dateValue} hasOwnTable={hasOwnTable} isDate />
                </tr>
              )
            })
          }
          <CustomTRTotal isOverviewTable={selectedTable.value === 0} title={`Total ${selectedTable.value === 0 ? 'Expenses' : ''}`} credits={credits} hasDueItems={hasDueItems} />
          <WrappedComponent {...props}>
            {children}
          </WrappedComponent>
        </tbody>
      </table>
    </div>
  )
}

export default WithTable;
