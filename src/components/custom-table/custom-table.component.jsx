import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CustomTableRow from '../custom-table-row/custom-table-row.component';
import MobileTableView from '../mobile-table-view/mobile-table-view.component';

import { 
  addExpenseStart, 
  removeCollectionsLocalState,
  removeCollectionsStart,
  updateCollectionsLocalState,
  updateCollectionsStart, 
  updateOverviewCollectionsStart 
} from '../../redux/expense/expense.actions';
import { generateTotal, thousandsSeparator } from '../../redux/expense/expense.utils';

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
  const updateRowItem = (index, value, label) => {
    updateCollectionsLocalState(index, value, label);
    updateCollectionsStart({index, value, label, items: expenses});
    let tableName = selectedTable.label.substring(0, selectedTable.label.indexOf(' Expense'));
    updateOverviewCollectionsStart(expenses, tableName);
  }

  const removeRowItem = (index) => {
    removeCollectionsLocalState(index);
    removeCollectionsStart(index);
    let tableName = selectedTable.label.substring(0, selectedTable.label.indexOf(' Expense'));
    updateOverviewCollectionsStart(expenses, tableName);
  }

  const total = generateTotal(expenses, 'paid');

  return (
    <div>
      <div className="table-responsive text-center">
        <table className="table table-striped table-hover table-sm mb-0">
          <thead>
            <tr>
              <th scope="col">Remove</th>
              <th scope="col">Name</th>
              <th scope="col">Paid</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense, index) => 
                <CustomTableRow 
                  key={`expense-${index}`} 
                  index={index} 
                  updateRowItem={updateRowItem} 
                  removeRowItem={removeRowItem}
                  {...expense} 
                />
              )
            }
            <tr className="total-row">
              <th scope="row">Total</th>
              <td></td>
              <td>{thousandsSeparator(total.toFixed(2))}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <CustomButton text="Add New Expense" mobileHide="non-mobile-hide" handler={() => addExpense()} />
      </div>
      {
        expenses !== undefined ?
          !!expenses.length ?
            <MobileTableView options={expenses} updateRowItem={updateRowItem} addExpense={() => addExpense()} />
          :
            null
        :
          <label className="mobile-hide">Loading</label>
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
