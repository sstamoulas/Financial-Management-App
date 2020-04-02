import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  firestore,
  updateFiscalMonthlyDocument, 
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';
import { fetchCollectionsStart } from '../../redux/expense/expense.actions';

import './overview-table.styles.scss';

class OverviewTable extends Component {
  updateExpenseAmount = (e, label, type) => {
    let {overviewExpenses} = this.props;

    if(!isNaN(e.target.value)) {
      let expenseIndex = overviewExpenses.map(expense => expense.expenseType).indexOf(label);

      if(e.target.value === "") {
        overviewExpenses[expenseIndex][type] = 0;
      }
      else {
        overviewExpenses[expenseIndex][type] = e.target.value;
      }
    }

    this.setState({
      overviewExpenses: {
        expenses: overviewExpenses
      }
    }, () => updateFiscalMonthlyDocument(`March-${2020}`, this.props.tableName.label, this.state.overviewExpenses, this.state.overviewDeposits));
  }

  updateDepositAmount = (e, label, type) => {
    let {overviewDeposits} = this.props;

    if(!isNaN(e.target.value)) {
      let depositIndex = overviewDeposits.map(deposit => deposit.expenseType).indexOf(label);

      if(e.target.value === "") {
        overviewDeposits[depositIndex][type] = 0;
      }
      else {
        overviewDeposits[depositIndex][type] = e.target.value;
      }
    }

    this.setState({
      overviewDeposits: {
        deposits: overviewDeposits
      }
    }, () => updateFiscalMonthlyDocument(`March-${2020}`, this.props.tableName.label, this.state.overviewExpenses, this.state.overviewDeposits));
  }
  
  render() {
    let {overviewExpenses, overviewDeposits, options, tabHandler} = this.props;

    let lastMonthExpenseTotal = overviewExpenses.reduce(
                      (accumulator, expense) => accumulator + parseFloat(expense['Last Month Paid']), 0);
    let expectedExpenseTotal = overviewExpenses.reduce(
                      (accumulator, expense) => accumulator + parseFloat(expense['Expected']), 0);
    let paidExpenseTotal = overviewExpenses.reduce(
                      (accumulator, expense) => accumulator + parseFloat(expense['Paid']), 0);

    let lastMonthDepositTotal = overviewDeposits.reduce(
                      (accumulator, deposit) => accumulator + parseFloat(deposit['Last Month Paid']), 0);
    let expectedDepositTotal = overviewDeposits.reduce(
                      (accumulator, deposit) => accumulator + parseFloat(deposit['Expected']), 0);
    let paidDepositTotal = overviewDeposits.reduce(
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
              overviewExpenses.map((expense, index) => {
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
                            onChange={(e) => this.updateExpenseAmount(e, expense.expenseType, 'Expected')} 
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
                            onChange={(e) => this.updateExpenseAmount(e, expense.expenseType, 'Paid')} 
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
                            onChange={(e) => this.updateExpenseAmount(e, expense.expenseType, 'Date')} 
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
              overviewDeposits.map((deposit, index) => {
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
                            onChange={(e) => this.updateDepositAmount(e, deposit.expenseType, 'Expected')} 
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
                            onChange={(e) => this.updateDepositAmount(e, deposit.expenseType, 'Paid')} 
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
  overviewExpenses: state.expense.overviewExpenses,
  overviewDeposits: state.expense.overviewDeposits,
  // tableOptions: state.expense.tableOptions,
  // monthOptions: state.expense.monthOptions, 
  // yearOptions: state.expense.yearOptions,
  // selectedTable: state.expense.selectedTable,
  // selectedMonth: state.expense.selectedMonth,
  // selectedYear: state.expense.selectedYear,
});

const mapDispatchToProps = (dispatch) => ({
  // updateTable: (option) => dispatch(updateTable(option)),
  // updateMonth: (option) => dispatch(updateMonth(option)),
  // updateYear: (option) => dispatch(updateYear(option)),
  // fetchCollectionsStart: 
  //   (selectedTable, selectedMonth, selectedYear) => 
  //     dispatch(fetchCollectionsStart(selectedTable, selectedMonth, selectedYear)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTable);
