import React  from 'react';
import { connect } from 'react-redux';

import MobileView from '../mobile-view/mobile-view.component';
import CustomTableTH from '../custom-table-th/custom-table-th.component';
import CustomTableTD from '../custom-table-td/custom-table-td.component';

import { updateCollectionsStart, updateCollectionsLocalState } from '../../redux/expense/expense.actions';
import { 
  generateTotal, 
  formatDate 
} from '../../redux/expense/expense.utils';

import './overview-table.styles.scss';

const OverviewTable = ({
    data, 
    options,
    selectedTable,
    selectedMonth,
    selectedYear, 
    tabHandler, 
    updateCollectionsStart,
    updateCollectionsLocalState
  }) => {

  const updateRowItem = (value, label, index) => {
    if(label === 'date') {
      value = formatDate(value)
    }

    updateCollectionsLocalState({index, value, label});
    updateCollectionsStart({index, value, label, items: data});
  }

  let expenses = data.filter(data => data.isExpense);
  let deposits = data.filter(data => !data.isExpense);

  let dueExpenseTotal = generateTotal(expenses, 'due');
  let paidExpenseTotal = generateTotal(expenses, 'paid');

  let dueDepositTotal = generateTotal(deposits, 'due');
  let paidDepositTotal = generateTotal(deposits, 'paid');

  let dueTotal = dueDepositTotal - dueExpenseTotal;
  let paidTotal = paidDepositTotal - paidExpenseTotal;

  return (
    <div>
      <div className='table-responsive text-center'>
        <table className='table table-striped table-hover table-sm mb-0 non-mobile-hide'>
          <thead>
            <tr>
              <CustomTableTH label='Name' isHead={true} />
              <CustomTableTH label='Due' isHead={true} />
              <CustomTableTH label='Paid' isHead={true} />
              <CustomTableTH label='Date' isHead={true} />
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense, index) => {
                let optionLabel = options.find(option => option.label === `${expense.label} Expense`);
                let dateValue = expense.hasOwnTable ? optionLabel : expense.date;
                let handler = expense.hasOwnTable ? tabHandler : updateRowItem;

                return (
                  <tr key={`expenseRowHeader-${index}`}>
                    <CustomTableTH index={index} label={expense.label} isOverview={true} />
                    <CustomTableTD index={index} label='due' value={expense.due} handler={updateRowItem} hasOwnTable={expense.hasOwnTable} />
                    <CustomTableTD index={index} label='paid' value={expense.paid} handler={updateRowItem} hasOwnTable={expense.hasOwnTable} />
                    <CustomTableTD index={index} label='date' value={dateValue} handler={handler} isDate={true}  hasOwnTable={expense.hasOwnTable} />
                  </tr>
                )
              })
            }
            <tr className='total-row'>
              <CustomTableTH label='Total Bills' isOverview={true} />
              <CustomTableTD value={dueExpenseTotal} isTotal={true} />
              <CustomTableTD value={paidExpenseTotal} isTotal={true} />
              <CustomTableTD isBlank={true} />
            </tr>
            {
              deposits.map((deposit, index) => {
                return (
                  <tr key={`depositRowHeader-${index}`}>
                    <CustomTableTH index={expenses.length + index} label={deposit.label} isOverview={true} />
                    <CustomTableTD index={expenses.length + index} label='due' value={deposit.due} handler={updateRowItem} hasOwnTable={deposit.hasOwnTable} />
                    <CustomTableTD index={expenses.length + index} label='paid' value={deposit.paid} handler={updateRowItem} hasOwnTable={deposit.hasOwnTable} />
                    <CustomTableTD isBlank={true} />
                  </tr>
                )
              })
            }
            <tr className='total-row'>
              <CustomTableTH label='Total Savings' isOverview={true} />
              <CustomTableTD value={dueTotal} isTotal={true} />
              <CustomTableTD value={paidTotal} isTotal={true} />
              <CustomTableTD isBlank={true} />
            </tr>
          </tbody>
        </table>
      </div>
      {
        data.length > 0 ?
          <MobileView options={data} updateRowItem={updateRowItem} />
        :
          <label className='mobile-hide'>Loading</label>
      }
    </div>
  );
}


const mapStateToProps = (state) => ({
  data: state.root.data,
  selectedTable: state.root.selectedTable,
  selectedMonth: state.root.selectedMonth,
  selectedYear: state.root.selectedYear,
});

const mapDispatchToProps = (dispatch) => ({
  updateCollectionsLocalState:
    (index, value, label) => dispatch(updateCollectionsLocalState(index, value, label)),
  updateCollectionsStart: 
    (index, value, label, items) => dispatch(updateCollectionsStart(index, value, label, items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTable);
