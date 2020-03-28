import React, { Component } from 'react';
import SelectDropdown from './components/select-dropdown/select-dropdown.component';

class App extends Component {
  constructor() {
    super();

    let months = [
      { value: 0, label: 'January'},
      { value: 1, label: 'February'},
      { value: 2, label: 'March'},
      { value: 3, label: 'April'},
      { value: 4, label: 'May'},
      { value: 5, label: 'June'},
      { value: 6, label: 'July'},
      { value: 7, label: 'August'},
      { value: 8, label: 'September'},
      { value: 9, label: 'October'},
      { value: 10, label: 'November'},
      { value: 11, label: 'December'},
    ];

    let years = [
      { value: 2020, label: 2020 },
      { value: 2019, label: 2019 },
      { value: 2018, label: 2018 },
      { value: 2017, label: 2017 },
    ];

    this.state = {
      monthOptions: months,
      selectedMonth: months[0],
      yearOptions: years,
      selectedYear: years[0],
    };
  }

  handleMonthSelectChange = (option) => {
    this.setState({
      selectedMonth: option,
    });
  }

  handleYearSelectChange = (option) => {
    this.setState({
      selectedYear: option,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="text-center py-3">
            <header>Monthly Expense Report</header>
            <div className="row d-flex justify-content-center">
              <div className="col-6 text-left">
                <SelectDropdown 
                  identifier="months"
                  handler={this.handleMonthSelectChange}
                  options={this.state.monthOptions}
                  selectedItem={this.state.selectedMonth}
                />
              </div>
              <div className="col-6 text-left">
                <SelectDropdown 
                  identifier="years"
                  handler={this.handleYearSelectChange}
                  options={this.state.yearOptions}
                  selectedItem={this.state.selectedYear}
                />
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Start A New Month</button>
          <ul className="nav nav-tabs nav-fill">
            <li className="nav-item">
              <a className="nav-link active" href="/#">Overview</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">Expense List</a>
            </li>
          </ul>
          <div className="table-responsive float-left w-100 text-center">
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
                <tr>
                  <th scope="row">Rent</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="date" /></td>
                </tr>
                <tr>
                  <th scope="row">Ameneties + Heat</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Electricity</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Water</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Gas</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Car Gas</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td>See Column</td>
                </tr>
                <tr>
                  <th scope="row">Car Maintenance</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td colSpan="2">See Column</td>
                </tr>
                <tr>
                  <th scope="row">Car Insurance</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Car Taxes</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Internet</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Serap Phone Bill</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Moms Phone Bill</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Stamatios Phone Bill</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Monthly Shopping</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td>See Column</td>
                </tr>
                <tr>
                  <th scope="row">Food Week 1</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td>See Column</td>
                </tr>
                <tr>
                  <th scope="row">Food Week 2</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td>See Column</td>
                </tr>
                <tr>
                  <th scope="row">Food Week 3</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td>See Column</td>
                </tr>
                <tr>
                  <th scope="row">Food Week 4</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td>See Column</td>
                </tr>
                <tr>
                  <th scope="row">Eating Out</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td>See Column</td>
                </tr>
                <tr>
                  <th scope="row">Yatim</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Ibrahim</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td>See Column</td>
                </tr>
                <tr>
                  <th scope="row">Baby</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td>See Column</td>
                </tr>
                <tr>
                  <th scope="row">Extra</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td>See Column</td>
                </tr>
                <tr>
                  <th scope="row">Hair Cut</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Qurban Savings</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Cleaning</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Monthly Withdrawal</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Unknown</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td>See Column</td>
                </tr>
                <tr>
                  <th scope="row">Total Bills</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Left Over Last Month</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td>$</td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Serap Payment</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Stamatios Payment</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Extra Payment</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row">Deposits</th>
                  <td>Mark</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row">Total Savings</th>
                  <td>$</td>
                  <td>$</td>
                  <td>$</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <select className="w-100">
              <option>Extra Expense</option>
              <option>Ibrahim Expense</option>
              <option>Baby Expense</option>
              <option>Monthly Shopping Expense</option>
              <option>Food Week 1 Expense</option>
              <option>Food Week 2 Expense</option>
              <option>Food Week 3 Expense</option>
              <option>Food Week 4 Expense</option>
              <option>Eating Out Expense</option>
              <option>Car Gas Expense</option>
              <option>Car Maintenance Expense</option>
              <option>Unknown Expense</option>
              <option>Monthly Withdrawal Calculation</option>
            </select>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Extra Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Ibrahim Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Baby Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Monthly Shopping Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Food Week 1 Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Food Week 2 Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Food Week 3 Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Food Week 4 Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Eating Out Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Car Gas Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Car Maintenance Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Unknown Expense</div>
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
                <tr>
                  <th scope="row"><a href="/#">[-]</a></th>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
                <tr className="total-row">
                  <th scope="row" colSpan="2">Total</th>
                  <td colSpan="2">$</td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg btn-block mb-5">Add New Expense</button>
          </div>
          <div className="table-responsive float-right w-100 pl-5 text-center">
            <div className="text-center">Monthly Withdrawal Calculation</div>
            <table className="table table-striped table-hover table-sm mb-0">
              <thead>
                <tr>
                  <th scope="col">Expense</th>
                  <th scope="col">Due</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Car Maintenance</th>
                  <td>60</td>
                </tr>
                <tr>
                  <th scope="row">Car Insurance</th>
                  <td>72.08</td>
                </tr>
                <tr>
                  <th scope="row">Car Taxes</th>
                  <td>104.85</td>
                </tr>
                <tr>
                  <th scope="row">Qurban Savings</th>
                  <td>125</td>
                </tr>
                <tr>
                  <th scope="row">Yetim</th>
                  <td>100</td>
                </tr>
                <tr>
                  <th scope="row">Monthly Savings</th>
                  <td>1000</td>
                </tr>
                <tr className="total-row">
                  <th scope="row">Total</th>
                  <td>1461.93</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
