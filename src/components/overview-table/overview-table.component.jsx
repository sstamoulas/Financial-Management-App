import React from 'react';
import { connect } from 'react-redux';

import { updateCollectionsStart, updateLocalState } from '../../redux/expense/expense.actions';
import { generateTotal } from '../../redux/expense/expense.utils';

import './overview-table.styles.scss';

const OverviewTable = ({
    data, 
    options,
    selectedTable,
    selectedMonth,
    selectedYear, 
    tabHandler, 
    updateCollectionsStart,
    updateLocalState}) => {

  const updateRowItem = (index, value, label) => {
    updateLocalState({index, value, label});
    updateCollectionsStart({index, value, label, items: data});
  }

  let expenses = data.filter(data => data.isExpense);
  let deposits = data.filter(data => !data.isExpense);

  let lastMonthExpenseTotal = generateTotal(expenses, 'lastMonthPaid');
  let dueExpenseTotal = generateTotal(expenses, 'due');
  let paidExpenseTotal = generateTotal(expenses, 'paid');

  let lastMonthDepositTotal = generateTotal(deposits, 'lastMonthPaid');
  let dueDepositTotal = generateTotal(deposits, 'due');
  let paidDepositTotal = generateTotal(deposits, 'paid');

  return (
    <div className="table-responsive text-center">
      <table className="table table-striped table-hover table-sm mb-0">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col" className="mobileColHide">Last Month Paid</th>
            <th scope="col" className="mobileColHide">Due</th>
            <th scope="col">Paid</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense, index) => {
              return (
                <tr key={`expenseRowHeader-${index}`}>
                  <th scope="row">{expense.name}</th>
                  <td className="mobileColHide">
                    <span>${expense['lastMonthPaid']}</span>
                  </td>
                  <td className="mobileColHide">
                    {
                      expense.hasOwnTable ?
                        <span>${expense['due']}</span>
                      :
                        <input 
                          type="number"
                          value={expense['due'] || ''} 
                          onChange={(e) => updateRowItem(index, e.target.value, 'due')}
                        />
                    }
                  </td>
                  <td>
                    {
                      expense.hasOwnTable ? 
                        <span>${expense['paid']}</span>
                      :
                        <input 
                          type="number"
                          value={expense['paid'] || ''} 
                          onChange={(e) => updateRowItem(index, e.target.value, 'paid')}
                        />
                    }
                  </td>
                  <td>
                    {
                      expense.hasOwnTable ? 
                        <a 
                          href="/#" onClick={() => 
                            tabHandler(options.find(option => option.label === `${expense.name} Expense`))
                          }
                        >
                            See Column
                        </a>
                      :
                        <input 
                          type="date" 
                          value={expense['date'] || ''} 
                          onChange={(e) => updateRowItem(index, e.target.value, 'date')}
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
            <td className="mobileColHide">{dueExpenseTotal}</td>
            <td>{paidExpenseTotal}</td>
            <td><span>---</span></td>
          </tr>
          {
            deposits.map((deposit, index) => {
              return (
                <tr key={`depositRowHeader-${index}`}>
                  <th scope="row">{deposit.name}</th>
                  <td className="mobileColHide">
                    <span>${deposit['lastMonthPaid']}</span>
                  </td>
                  <td className="mobileColHide">
                    {
                      deposit.hasOwnTable ?
                        <span>${deposit['due']}</span>
                      :
                        <input 
                          type="number"
                          value={deposit['due'] || ''} 
                          onChange={(e) => updateRowItem(expenses.length + index, e.target.value, 'due')}
                        />
                    }
                  </td>
                  <td>
                    {
                      deposit.hasOwnTable ? 
                        <span>${deposit['paid']}</span>
                      :
                        <input 
                          type="number"
                          value={deposit['paid'] || ''} 
                          onChange={(e) => updateRowItem(expenses.length + index, e.target.value, 'paid')}
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
            <td className="mobileColHide">${dueDepositTotal - dueExpenseTotal}</td>
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
  updateLocalState:
    (index, value, label) => dispatch(updateLocalState(index, value, label)),
  updateCollectionsStart: 
    (index, value, label, items) => dispatch(updateCollectionsStart(index, value, label, items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTable);
