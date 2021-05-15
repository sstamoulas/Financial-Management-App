import React, { useCallback } from 'react';
import { connect, batch } from 'react-redux';
import { debounce } from 'lodash';

import CustomTH from '../custom-th/custom-th.component';
import CustomTD from '../custom-td/custom-td.component';
import CustomTRTotal from '../custom-tr-total/custom-tr-total.component';

import { formatDate } from '../../redux/expense/expense.utils';

import './overview-table.styles.scss';

const OverviewTable = ({ credits, debits, tableOptions, selectedTable, removeItems, removeItemsStart, removeMetaTableStart, updateItems, updateItemsStart, tabHandler }) => {
  const debouncedSave = useCallback(
    debounce((index, value, label) => updateItemsStart(index, value, label), 1000),
    [],
  );

  const updateRowItem = (value, label, index) => {
    if(label === 'date') {
      value = formatDate(value)
    }

    batch(() => {
      updateItems(index, value, label);
      debouncedSave(index, value, label);
    })
  }

  const removeRowItem = (event, index) => {
    event.preventDefault();

    batch(() => {
      removeItems(index);
      removeItemsStart(index);
      removeMetaTableStart(index);
    })
  }

  return (
    <>
      {
        debits && debits.map((debit, index) => {
          let { due, paid, label, date, hasOwnTable } = debit;
          let optionLabel = tableOptions.find((option, index) => option.label === label);
          let dateValue = hasOwnTable ? optionLabel.value : date;
          let handler = hasOwnTable ? tabHandler : updateRowItem;

          return (
            <tr key={`debit-${debit.value}`}>
              <CustomTH index={debit.value} handler={removeRowItem} usesLink>[-]</CustomTH>
              <CustomTD label={label} className={'bold'} isBlank />
              <CustomTD index={debit.value} handler={updateRowItem} label='due' value={due} />
              <CustomTD index={debit.value} handler={updateRowItem} label='paid' value={paid} hasOwnTable={hasOwnTable} />
              <CustomTD index={debit.value} handler={handler} hasOwnTable={hasOwnTable} value={dateValue} isDate />
            </tr>
          )
        })
      }
      <CustomTRTotal isOverviewTable={selectedTable.value === 0} title='Total Savings' credits={credits} debits={debits} hasDueItems />
    </>
  )
}

const mapStateToProps = (state) => ({
  debits: state.root.data && state.root.data.filter(data => !data.isExpense),
});

export default connect(mapStateToProps)(OverviewTable);
