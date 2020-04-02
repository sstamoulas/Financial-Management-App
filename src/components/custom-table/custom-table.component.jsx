import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CustomTableRow from '../custom-table-row/custom-table-row.component';

import { addExpenseStart } from '../../redux/expense/expense.actions';

import './custom-table.styles.scss';

const CustomTable = ({ expenses, addExpense}) => {
  const total = expenses.reduce((accumulator, currentExpense) => accumulator + parseFloat(currentExpense.value), 0);
  
  return (
    <div className="table-responsive w-100 pl-5 text-center">
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
              <CustomTableRow key={`expense-${index}`} index={index} {...expense} />
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
  expenses: state.expense.overviewExpenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: () => dispatch(addExpenseStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable);
