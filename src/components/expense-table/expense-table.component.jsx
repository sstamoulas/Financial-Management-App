import React, { Component } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './expense-table.styles.scss';

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
    };
  }

  addNewExpense = () => {
    this.setState({
      expenses: [...this.state.expenses, {name: '', amount: 0, date: ''}]
    });
  }

  updateExpenseName = (index, e) => {
    this.setState({
      expenses: this.state.expenses.map((expense, expenseIndex) => {
        if(index === expenseIndex) {
          expense.name = e.target.value;
        }

        return expense;
      }),
    });
  }

  updateExpenseAmount = (index, e) => {
    this.setState({
      expenses: this.state.expenses.map((expense, expenseIndex) => {
        if(index === expenseIndex) {
          expense.amount = e.target.value;
        }

        return expense;
      }),
    });
  }

  updateExpenseDate = (index, e) => {
    this.setState({
      expenses: this.state.expenses.map((expense, expenseIndex) => {
        if(index === expenseIndex) {
          expense.date = e.target.value;
        }

        return expense;
      }),
    });
  }

  removeRow = (index) => {
    this.setState({
      expenses: this.state.expenses.filter((expense, expenseIndex) => {
        return index !== expenseIndex;
      }),
    });
  }
  
  render() {
    let {expenses} = this.state;
    let total = expenses.reduce((accumulator, currentExpense) => accumulator + parseFloat(currentExpense.amount), 0);

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
              expenses.map((expense, index) => (
                <tr key={`expense-${index}`}>
                  <th scope="row"><a href="/#" onClick={() => this.removeRow(index)}>[-]</a></th>
                  <td><input type="text" value={expense.name} onChange={(e) => this.updateExpenseName(index, e)} /></td>
                  <td><input type="number" value={expense.amount} onChange={(e) => this.updateExpenseAmount(index, e)} /></td>
                  <td><input type="date" value={expense.date} onChange={(e) => this.updateExpenseDate(index, e)} /></td>
                </tr>
              ))
            }
            <tr className="total-row">
              <th scope="row">Total</th>
              <td></td>
              <td>{total.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <CustomButton text="Add New Expense" handler={this.addNewExpense} />
      </div>
    );
  }
}

export default ExpenseTable;
