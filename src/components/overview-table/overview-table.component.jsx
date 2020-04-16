import React from 'react';
import { connect } from 'react-redux';

import { updateCollectionsStart } from '../../redux/expense/expense.actions';

import './overview-table.styles.scss';

const OverviewTable = ({
    data, 
    options,
    selectedTable,
    selectedMonth,
    selectedYear, 
    tabHandler, 
    updateCollectionsStart}) => {

  let expenses = data.filter(data => data.isExpense);
  let deposits = data.filter(data => !data.isExpense);

  let lastMonthExpenseTotal = !!expenses.length ? expenses.reduce(
                    (accumulator, expense) => accumulator + parseFloat(expense['Last Month Paid']), 0) : 0;
  let expectedExpenseTotal = !!expenses.length ? expenses.reduce(
                    (accumulator, expense) => accumulator + parseFloat(expense['Expected']), 0) : 0;
  let paidExpenseTotal = !!expenses.length ? expenses.reduce(
                    (accumulator, expense) => accumulator + parseFloat(expense['Paid']), 0) : 0;

  let lastMonthDepositTotal = !!deposits.length ? deposits.reduce(
                    (accumulator, deposit) => accumulator + parseFloat(deposit['Last Month Paid']), 0) : 0;
  let expectedDepositTotal = !!deposits.length ? deposits.reduce(
                    (accumulator, deposit) => accumulator + parseFloat(deposit['Expected']), 0) : 0;
  let paidDepositTotal = !!deposits.length ? deposits.reduce(
                    (accumulator, deposit) => accumulator + parseFloat(deposit['Paid']), 0) : 0;

  const updateItem = (index, value, label, isExpense) => {
    updateCollectionsStart(
      {index, value, label, items: isExpense? expenses : deposits, hasOwnTable: false}, isExpense)
  }

  return (
    <div className="table-responsive text-center">
      <table className="table table-striped table-hover table-sm mb-0">
        <thead>
          <tr>
            <th scope="col">Expense</th>
            <th scope="col" className="mobileColHide">Last Month Paid</th>
            <th scope="col" className="mobileColHide">Expected Due</th>
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
                  <td className="mobileColHide">
                    <span>${expense['Last Month Paid']}</span>
                  </td>
                  <td className="mobileColHide">
                    {
                      expense.hasOwnTable ?
                        <span>${expense['Expected']}</span>
                      :
                        <input 
                          type="number"
                          value={expense['Expected']} 
                          onChange={(e) => updateItem(index, e.target.value, 'Expected', true)}
                        />
                    }
                  </td>
                  <td>
                    {
                      expense.hasOwnTable ? 
                        <span>${expense['Paid']}</span>
                      :
                        <input 
                          type="number"
                          value={expense['Paid']} 
                          onChange={(e) => updateItem(index, e.target.value, 'Paid', true)}
                        />
                    }
                  </td>
                  <td>
                    {
                      expense.hasOwnTable ? 
                        <a 
                          href="/#" onClick={() => 
                            tabHandler(options.find(option => option.label === `${expense.expenseType} Expense`))}>See Column</a>
                      :
                        <input 
                          type="date" 
                          value={expense['Date']} 
                          onChange={(e) => updateItem(index, e.target.value, 'Date', true)}
                        />
                    }
                  </td>
                </tr>
              )
            })
          }
          <tr className='total-row'>
            <th scope="row">Total Bills</th>
            <td className="mobileColHide">{lastMonthExpenseTotal}</td>
            <td className="mobileColHide">{expectedExpenseTotal}</td>
            <td>{paidExpenseTotal}</td>
            <td><span>---</span></td>
          </tr>
          <tr className='total-row'>
            <th scope="row">Left Over Last Month</th>
            <td className="mobileColHide">{lastMonthExpenseTotal}</td>
            <td className="mobileColHide">{expectedExpenseTotal}</td>
            <td>{paidExpenseTotal}</td>
            <td><span>---</span></td>
          </tr>
          {
            deposits.map((deposit, index) => {
              return (
                <tr key={`depositRowHeader-${index}`}>
                  <th scope="row">{deposit.expenseType}</th>
                  <td className="mobileColHide">
                    <span>${deposit['Last Month Paid']}</span>
                  </td>
                  <td className="mobileColHide">
                    {
                      deposit.hasOwnTable ?
                        <span>${deposit['Expected']}</span>
                      :
                        <input 
                          type="string"
                          value={deposit['Expected']} 
                          onChange={(e) => updateItem(index, e.target.value, 'Expected', false)}
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
                          onChange={(e) => updateItem(index, e.target.value, 'Paid', false)}
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
            <td className="mobileColHide">${lastMonthDepositTotal - lastMonthExpenseTotal}</td>
            <td className="mobileColHide">${expectedDepositTotal - expectedExpenseTotal}</td>
            <td>${paidDepositTotal - paidExpenseTotal}</td>
            <td><span>---</span></td>
          </tr>
        </tbody>
      </table>
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
  updateCollectionsStart: 
    (rowData, isExpense, additionalData) => 
      dispatch(updateCollectionsStart(rowData, isExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTable);
