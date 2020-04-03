import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateDepositStart, updateExpenseStart } from '../../redux/expense/expense.actions';

import './overview-table.styles.scss';

class OverviewTable extends Component {
  render() {
    console.log(this.props)
    let {expenses, deposits, options, tabHandler, updateExpense, updateDeposit} = this.props;

    let lastMonthExpenseTotal = expenses.reduce(
                      (accumulator, expense) => accumulator + parseFloat(expense['Last Month Paid']), 0);
    let expectedExpenseTotal = expenses.reduce(
                      (accumulator, expense) => accumulator + parseFloat(expense['Expected']), 0);
    let paidExpenseTotal = expenses.reduce(
                      (accumulator, expense) => accumulator + parseFloat(expense['Paid']), 0);

    let lastMonthDepositTotal = deposits.reduce(
                      (accumulator, deposit) => accumulator + parseFloat(deposit['Last Month Paid']), 0);
    let expectedDepositTotal = deposits.reduce(
                      (accumulator, deposit) => accumulator + parseFloat(deposit['Expected']), 0);
    let paidDepositTotal = deposits.reduce(
                      (accumulator, deposit) => accumulator + parseFloat(deposit['Paid']), 0);

    return (
      <div className="table-responsive w-100 text-center">
        <table className="table table-striped table-hover table-sm mb-0">
          <thead>
            <tr>
              <th scope="col">Expense</th>
              <th scope="col">Last Month Paid</th>
              <th scope="col">Expected Due</th>
              <th scope="col">Paid</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense, index) => {
                return (
                  <tr key={`expenseRowHeader-${index}`}>
                    <th scope="row">{expense.expenseType}</th>
                    <td>
                      <span>${expense['Last Month Paid']}</span>
                    </td>
                    <td>
                      {
                        expense.hasOwnTable ?
                          <span>${expense['Expected']}</span>
                        :
                          <input 
                            type="string"
                            value={expense['Expected']} 
                            onChange={(e) => updateExpense(e, expense.expenseType, 'Expected')} 
                          />
                      }
                    </td>
                    <td>
                      {
                        expense.hasOwnTable ? 
                          <span>${expense['Paid']}</span>
                        :
                          <input 
                            type="string"
                            value={expense['Paid']} 
                            onChange={(e) => updateExpense(e, expense.expenseType, 'Paid')} 
                          />
                      }
                    </td>
                    <td>
                      {
                        expense.hasOwnTable ? 
                          <a 
                            href="/#" onClick={() => tabHandler(options.find(option => option.label === `${expense.expenseType} Expense`))}>See Column</a>
                        :
                          <input 
                            type="date" 
                            value={expense['Date']} 
                            onChange={(e) => updateExpense(e, expense.expenseType, 'Date')} 
                          />
                      }
                    </td>
                  </tr>
                )
              })
            }
            <tr className='total-row'>
              <th scope="row">Total Bills</th>
              <td>{lastMonthExpenseTotal}</td>
              <td>{expectedExpenseTotal}</td>
              <td>{paidExpenseTotal}</td>
              <td><span>---</span></td>
            </tr>
            <tr className='total-row'>
              <th scope="row">Left Over Last Month</th>
              <td>{lastMonthExpenseTotal}</td>
              <td>{expectedExpenseTotal}</td>
              <td>{paidExpenseTotal}</td>
              <td><span>---</span></td>
            </tr>
            {
              deposits.map((deposit, index) => {
                return (
                  <tr key={`depositRowHeader-${index}`}>
                    <th scope="row">{deposit.expenseType}</th>
                    <td>
                      <span>${deposit['Last Month Paid']}</span>
                    </td>
                    <td>
                      {
                        deposit.hasOwnTable ?
                          <span>${deposit['Expected']}</span>
                        :
                          <input 
                            type="string"
                            value={deposit['Expected']} 
                            onChange={(e) => updateDeposit(e, deposit.expenseType, 'Expected')} 
                          />
                      }
                    </td>
                    <td>
                      {
                        deposit.hasOwnTable ? 
                          <span>${deposit['Paid']}</span>
                        :
                          <input 
                            type="string"
                            value={deposit['Paid']} 
                            onChange={(e) => updateDeposit(e, deposit.expenseType, 'Paid')} 
                          />
                      }
                    </td>
                    <td><span>---</span></td>
                  </tr>
                )
              })
            }
            <tr className='total-row'>
              <th scope="row">Total Savings</th>
              <td>${lastMonthDepositTotal - lastMonthExpenseTotal}</td>
              <td>${expectedDepositTotal - expectedExpenseTotal}</td>
              <td>${paidDepositTotal - paidExpenseTotal}</td>
              <td><span>---</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  expenses: state.expense.expenses,
  deposits: state.expense.deposits,
  // tableOptions: state.expense.tableOptions,
  // monthOptions: state.expense.monthOptions, 
  // yearOptions: state.expense.yearOptions,
  // selectedTable: state.expense.selectedTable,
  // selectedMonth: state.expense.selectedMonth,
  // selectedYear: state.expense.selectedYear,
});

const mapDispatchToProps = (dispatch) => ({
  updateDeposit: (e, type, label) => dispatch(updateDepositStart(e, type, label)),
  updateExpense: (e, type, label) => dispatch(updateExpenseStart(e, type, label)),
  // updateTable: (option) => dispatch(updateTable(option)),
  // updateMonth: (option) => dispatch(updateMonth(option)),
  // updateYear: (option) => dispatch(updateYear(option)),
  // fetchCollectionsStart: 
  //   (selectedTable, selectedMonth, selectedYear) => 
  //     dispatch(fetchCollectionsStart(selectedTable, selectedMonth, selectedYear)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTable);
