import React  from 'react';
import { connect } from 'react-redux';

import MobileTableView from '../mobile-table-view/mobile-table-view.component';
import DatePicker from 'react-datepicker';

import { updateCollectionsStart, updateCollectionsLocalState } from '../../redux/expense/expense.actions';
import { 
  generateTotal, 
  thousandsSeparator, 
  formatDate 
} from '../../redux/expense/expense.utils';

import 'react-datepicker/dist/react-datepicker.css';
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

  const updateRowItem = (index, value, label) => {
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

  return (
    <div>
      <div className="table-responsive text-center">
        <table className="table table-striped table-hover table-sm mb-0 non-mobile-hide">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Due</th>
              <th scope="col">Paid</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense, index) => {
                return (
                  <tr key={`expenseRowHeader-${index}`}>
                    <th scope="row">{expense.label}</th>
                    <td>
                      {
                        expense.hasOwnTable ?
                          <span>${expense.due.toFixed(2)}</span>
                        :
                          <input 
                            type="number"
                            value={expense.due || ''} 
                            onChange={(e) => updateRowItem(index, e.target.value, 'due')}
                          />
                      }
                    </td>
                    <td>
                      {
                        expense.hasOwnTable ? 
                          <span>${expense.paid.toFixed(2)}</span>
                        :
                          <input 
                            type="number"
                            value={expense.paid || ''} 
                            onChange={(e) => updateRowItem(index, e.target.value, 'paid')}
                          />
                      }
                    </td>
                    <td>
                      {
                        expense.hasOwnTable ? 
                          <a 
                            href="/#" onClick={() => 
                              tabHandler(options.find(option => option.label === `${expense.label} Expense`))
                            }
                          >
                              See Column
                          </a>
                        :
                          <DatePicker
                            dateFormat="MM/dd/yyyy"
                            selected={Date.parse(expense.date)}
                            onChange={(date) => updateRowItem(index, date, 'date')}
                          />
                      }
                      {
                        <label>{Date.parse(expense.date)}</label>
                      }
                    </td>
                  </tr>
                )
              })
            }
            <tr className='total-row'>
              <th scope="row">Total Bills</th>
              <td>{thousandsSeparator(dueExpenseTotal)}</td>
              <td>{thousandsSeparator(paidExpenseTotal)}</td>
              <td><span>---</span></td>
            </tr>
            {
              deposits.map((deposit, index) => {
                return (
                  <tr key={`depositRowHeader-${index}`}>
                    <th scope="row">{deposit.label}</th>
                    <td>
                      {
                        deposit.hasOwnTable ?
                          <span>${deposit.due.toFixed(2)}</span>
                        :
                          <input 
                            type="number"
                            value={deposit.due || ''} 
                            onChange={(e) => updateRowItem(expenses.length + index, e.target.value, 'due')}
                          />
                      }
                    </td>
                    <td>
                      {
                        deposit.hasOwnTable ? 
                          <span>${deposit.paid.toFixed(2)}</span>
                        :
                          <input 
                            type="number"
                            value={deposit.paid || ''} 
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
              <td>${thousandsSeparator((dueDepositTotal - dueExpenseTotal).toFixed(2))}</td>
              <td>${thousandsSeparator((paidDepositTotal - paidExpenseTotal).toFixed(2))}</td>
              <td><span>---</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      {
        data.length > 0 ?
          <MobileTableView options={data} updateRowItem={updateRowItem} />
        :
          <label className="mobile-hide">Loading</label>
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
