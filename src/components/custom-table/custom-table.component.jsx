import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CustomTableTH from '../custom-table-th/custom-table-th.component';
import CustomTableTD from '../custom-table-td/custom-table-td.component';
import MobileView from '../mobile-view/mobile-view.component';

import { 
  addExpenseStart, 
  removeCollectionsLocalState,
  removeCollectionsStart,
  updateCollectionsLocalState,
  updateCollectionsStart, 
  updateOverviewCollectionsStart 
} from '../../redux/expense/expense.actions';
import { 
  generateTotal, 
  formatDate 
} from '../../redux/expense/expense.utils';

import './custom-table.styles.scss';

const CustomTable = ({ 
  expenses, 
  addExpense, 
  selectedTable, 
  removeCollectionsLocalState,
  removeCollectionsStart,
  updateCollectionsLocalState, 
  updateCollectionsStart, 
  updateOverviewCollectionsStart 
}) => {
  const updateRowItem = (value, label, index) => {
    if(label === 'date') {
      value = formatDate(value)
    }
    updateCollectionsLocalState(index, value, label);
    updateCollectionsStart({index, value, label, items: expenses});
  }

  const removeRowItem = (event, index) => {
    event.preventDefault();
    removeCollectionsLocalState(index);
    removeCollectionsStart(index);
  }

  const total = generateTotal(expenses, 'paid');

  return (
    <div>
      <div className='table-responsive text-center'>
        <table className='table table-striped table-hover table-sm mb-0'>
          <thead>
            <tr>
              <CustomTableTH label='Remove' isHead={true} />
              <CustomTableTH label='Name' isHead={true} />
              <CustomTableTH label='Paid' isHead={true} />
              <CustomTableTH label='Date' isHead={true} />
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense, index) => 
                <tr key={`expense-${index}`}>
                  <CustomTableTH index={index} handler={removeRowItem} />
                  <CustomTableTD index={index} label='label' value={expense.label} handler={updateRowItem} />
                  <CustomTableTD index={index} label='paid' value={expense.paid} handler={updateRowItem} />
                  <CustomTableTD index={index} label='date' value={expense.date} handler={updateRowItem} isDate={true} />
                </tr>
              )
            }
            <tr className='total-row'>
              <CustomTableTH label='Total' isOverview={true} />
              <CustomTableTD isBlank={true} />
              <CustomTableTD value={total} isTotal={true} />
              <CustomTableTD isBlank={true} />
            </tr>
          </tbody>
        </table>
        <CustomButton text='Add New Expense' mobileHide='non-mobile-hide' handler={() => addExpense()} />
      </div>
      {
        expenses !== undefined ?
          <MobileView 
            options={expenses} 
            updateRowItem={updateRowItem} 
            addExpense={() => addExpense()} 
          />
        :
          <label className='mobile-hide'>Loading</label>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  expenses: state.root.data,
  selectedTable: state.root.selectedTable,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: () => dispatch(addExpenseStart()),
  removeCollectionsLocalState: 
    (index) => dispatch(removeCollectionsLocalState(index)),
  removeCollectionsStart: 
    (index) => dispatch(removeCollectionsStart(index)),
  updateCollectionsLocalState:
    (index, value, label) => dispatch(updateCollectionsLocalState(index, value, label)),
  updateCollectionsStart: 
    (index, value, label, items) => dispatch(updateCollectionsStart(index, value, label, items)),
  updateOverviewCollectionsStart: 
    (expenses, column) => dispatch(updateOverviewCollectionsStart(expenses, column)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable);
