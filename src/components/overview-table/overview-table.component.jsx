import React from 'react';
import { connect } from 'react-redux';

import CustomTH from '../custom-th/custom-th.component';
import CustomTD from '../custom-td/custom-td.component';
import CustomTRTotal from '../custom-tr-total/custom-tr-total.component';

import { formatDate } from '../../redux/expense/expense.utils';

import './overview-table.styles.scss';

const OverviewTable = ({ credits, debits, updateItems, updateItemsStart }) => {
  const updateRowItem = (value, label, index) => {
    if(label === 'date') {
      value = formatDate(value)
    }

    updateItems(index, value, label);
    updateItemsStart(index, value, label);
  }

  return (
    <>
      {
        debits.map((debit, index) => {
          return (
            <tr key={`debit-${credits.length + index}`}>
              <CustomTH isLabel>{debit.label}</CustomTH>
              <CustomTD index={credits.length + index} handler={updateRowItem} label='due' value={debit.due} />
              <CustomTD index={credits.length + index} handler={updateRowItem} label='paid' value={debit.paid} hasOwnTable={debit.hasOwnTable} />
              <CustomTD isBlank />
            </tr>
          )
        })
      }
      <CustomTRTotal title='Total Savings' credits={credits} debits={debits} hasDueItems />
    </>
  )
}

const mapStateToProps = (state) => ({
  debits: state.root.data.filter(data => !data.isExpense),
});

export default connect(mapStateToProps)(OverviewTable);
