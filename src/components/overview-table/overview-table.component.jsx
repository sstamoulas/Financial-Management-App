import React, { Component } from 'react';

import { 
  firestore,
  createFiscalMonthlyDocument, 
  updateFiscalMonthlyDocument, 
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

import './overview-table.styles.scss';

class OverviewTable extends Component {
  constructor(props) {
    super(props);

    let expenseData = {
      expenses: [
        {
          'expenseType': 'Rent',
          'Last Month Paid': 0,
          'Expected': 1,
          'Paid': 1,
          'Date': '2020-04-20',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Ameneties + Heat',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Electricity',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Water',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Gas',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Car Gas',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
        {
          'expenseType': 'Car Maintenance',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
        {
          'expenseType': 'Car Insurance',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Car Taxes',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Internet',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Serap Phone Bill',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Moms Phone Bill',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Stamatios Phone Bill',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Monthly Shopping',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
        {
          'expenseType': 'Food Week 1',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
        {
          'expenseType': 'Food Week 2',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
        {
          'expenseType': 'Food Week 3',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
        {
          'expenseType': 'Food Week 4',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
        {
          'expenseType': 'Eating Out',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
        {
          'expenseType': 'Yatim',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Ibrahim',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
        {
          'expenseType': 'Baby',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
        {
          'expenseType': 'Extra',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
        {
          'expenseType': 'Hair Cut',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Qurban Savings',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Cleaning',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Monthly Withdrawal',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Unknown',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': true,
        },
      ],
    };

    let depositData = {
      deposits: [
        {
          'expenseType': 'Serap Payment',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Stamatios Payment',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Extra Payment',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
        {
          'expenseType': 'Deposits',
          'Last Month Paid': 0,
          'Expected': 0,
          'Paid': 0,
          'Date': '',
          'hasOwnTable': false,
        },
      ]
    };

      this.state = {
        selectedExpenses: expenseData,
        selectedDeposits: depositData,
      };

    // const collectionRef = firestore.collection(`March-${2020}`);

    // collectionRef
    // .get()
    // .then(snapshot => {
    //   const { expenses, deposits } = convertCollectionsSnapshotToMap(snapshot);
    //   console.log(expenses, deposits);

    //   this.state = {
    //     selectedExpenses: expenses,
    //     selectedDeposits: deposits,
    //   };
    // });

    //createFiscalMonthlyDocument(`March-${2020}`, this.props.tableName.label, expenseData, depositData);
  }

  updateExpenseAmount = (e, label, type) => {
    let {selectedExpenses: { expenses }} = this.state;

    if(!isNaN(e.target.value)) {
      let expenseIndex = expenses.map(expense => expense.expenseType).indexOf(label);

      if(e.target.value === "") {
        expenses[expenseIndex][type] = 0;
      }
      else {
        expenses[expenseIndex][type] = e.target.value;
      }
    }

    this.setState({
      selectedExpenses: {
        expenses
      }
    }, () => updateFiscalMonthlyDocument(`March-${2020}`, this.props.tableName.label, this.state.selectedExpenses, this.state.selectedDeposits));
  }

  updateDepositAmount = (e, label, type) => {
    let {selectedDeposits: { deposits }} = this.state;

    if(!isNaN(e.target.value)) {
      let depositIndex = deposits.map(deposit => deposit.expenseType).indexOf(label);

      if(e.target.value === "") {
        deposits[depositIndex][type] = 0;
      }
      else {
        deposits[depositIndex][type] = e.target.value;
      }
    }

    this.setState({
      selectedDeposits: {
        deposits
      }
    }, () => updateFiscalMonthlyDocument(`March-${2020}`, this.props.tableName.label, this.state.selectedExpenses, this.state.selectedDeposits));
  }
  
  render() {
    let {selectedExpenses: { expenses }, selectedDeposits: { deposits }} = this.state;
    let {options, tabHandler} = this.props;

    let lastMonthExpenseTotal = expenses.reduce(
                      (accumulator, expense) => accumulator + parseFloat(expense['Last Month Paid']), 0);
    let expectedExpenseTotal = expenses.reduce(
                      (accumulator, expense) => accumulator + parseFloat(expense['Expected']), 0);
    let paidExpenseTotal = expenses.reduce(
                      (accumulator, expense) => accumulator + parseFloat(expense['Paid']), 0);

    let lastMonthDepositTotal = deposits.reduce(
                      (accumulator, deposist) => accumulator + parseFloat(deposist['Last Month Paid']), 0);
    let expectedDepositTotal = deposits.reduce(
                      (accumulator, deposist) => accumulator + parseFloat(deposist['Expected']), 0);
    let paidDepositTotal = deposits.reduce(
                      (accumulator, deposist) => accumulator + parseFloat(deposist['Paid']), 0);

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
              //'Last Month Paid', 'Expected Due', 'Paid', 'Date']
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

export default OverviewTable;
