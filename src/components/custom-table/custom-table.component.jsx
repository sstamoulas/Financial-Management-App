import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CustomTableRow from '../custom-table-row/custom-table-row.component';

import { 
  addExpenseStart, 
  updateCollectionsStart, 
  updateOverviewCollectionsStart 
} from '../../redux/expense/expense.actions';

import './custom-table.styles.scss';

const CustomTable = ({ expenses, addExpense, selectedTable, updateCollectionsStart, updateOverviewCollectionsStart }) => {
  const total = !!expenses.length ? expenses.reduce((accumulator, currentExpense) => accumulator + parseFloat(currentExpense.value), 0) : 0;

  const updateRowItem = (index, value, label) => {
    updateCollectionsStart({index, value, label, items: expenses, hasOwnTable: true}, true);
    updateOverviewCollectionsStart(expenses, selectedTable.label.substring(0, selectedTable.label.indexOf(' Expense')));
  }

  return (
    <div className="table-responsive text-center">
      <table className="table table-striped table-hover table-sm mb-0">
        <thead>
          <tr>
            <th scope="col">Remove Row</th>
            <th scope="col">Expense</th>
            <th scope="col">Paid</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense, index) => 
              <CustomTableRow key={`expense-${index}`} index={index} updateRowItem={updateRowItem} {...expense} />
            )
          }
          <tr className="total-row">
            <th scope="row">Total</th>
            <td></td>
            <td>{total.toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <CustomButton text="Add New Expense" handler={() => addExpense()} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  expenses: state.root.data,
  selectedTable: state.root.selectedTable,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: () => dispatch(addExpenseStart()),
  updateCollectionsStart: (rowData, isExpense) => dispatch(updateCollectionsStart(rowData, isExpense)),
  updateOverviewCollectionsStart: (expenses, column) => dispatch(updateOverviewCollectionsStart(expenses, column)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable);
