import React, { Component } from 'react';

import CustomSelect from './components/custom-select/custom-select.component';
import CustomButton from './components/custom-button/custom-button.component';
import CustomTab from './components/custom-tab/custom-tab.component';
import OverviewTable from './components/overview-table/overview-table.component';
import ExpenseTable from './components/expense-table/expense-table.component';
import StaticTable from './components/static-table/static-table.component';

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

    let tabs = [
      { value: 0, label: 'Overview'},
      { value: 1, label: 'Extra Expense'},
      { value: 2, label: 'Ibrahim Expense'},
      { value: 3, label: 'Baby Expense'},
      { value: 4, label: 'Monthly Shopping Expense'},
      { value: 5, label: 'Food Week 1 Expense'},
      { value: 6, label: 'Food Week 2 Expense'},
      { value: 7, label: 'Food Week 3 Expense'},
      { value: 8, label: 'Food Week 4 Expense'},
      { value: 9, label: 'Eating Out Expense'},
      { value: 10, label: 'Car Gas Expense'},
      { value: 11, label: 'Car Maintenance Expense'},
      { value: 12, label: 'Unknown Expense'},
      { value: 13, label: 'Monthly Withdrawal Calculation'},
    ];

    let overviewTable = [
      { 
        tableName: 'Overview',
        headers: { 
          colHeaders: ['Expense', 'Last Month Paid', 'Expected Due', 'Paid', 'Date'],
          rowHeaders: [
            { isSummation: false, hasOwnTable: false, label: 'Rent'},
            { isSummation: false, hasOwnTable: false, label: 'Ameneties + Heat'},
            { isSummation: false, hasOwnTable: false, label: 'Electricity'},
            { isSummation: false, hasOwnTable: false, label: 'Water'},
            { isSummation: false, hasOwnTable: false, label: 'Gas'},
            { isSummation: true, hasOwnTable: true, label: 'Car Gas'},
            { isSummation: true, hasOwnTable: true, label: 'Car Maintenance'},
            { isSummation: false, hasOwnTable: false, label: 'Car Insurance'},
            { isSummation: false, hasOwnTable: false, label: 'Car Taxes'},
            { isSummation: false, hasOwnTable: false, label: 'Internet'},
            { isSummation: false, hasOwnTable: false, label: 'Serap Phone Bill'},
            { isSummation: false, hasOwnTable: false, label: 'Moms Phone Bill'},
            { isSummation: false, hasOwnTable: false, label: 'Stamatios Phone Bill'},
            { isSummation: true, hasOwnTable: true, label: 'Monthly Shopping'},
            { isSummation: true, hasOwnTable: true, label: 'Food Week 1'},
            { isSummation: true, hasOwnTable: true, label: 'Food Week 2'},
            { isSummation: true, hasOwnTable: true, label: 'Food Week 3'},
            { isSummation: true, hasOwnTable: true, label: 'Food Week 4'},
            { isSummation: true, hasOwnTable: true, label: 'Eating Out'},
            { isSummation: false, hasOwnTable: false, label: 'Yatim'},
            { isSummation: true, hasOwnTable: true, label: 'Ibrahim'},
            { isSummation: true, hasOwnTable: true, label: 'Baby'},
            { isSummation: true, hasOwnTable: true, label: 'Extra'},
            { isSummation: false, hasOwnTable: false, label: 'Hair Cut'},
            { isSummation: false, hasOwnTable: false, label: 'Qurban Savings'},
            { isSummation: false, hasOwnTable: false, label: 'Cleaning'},
            { isSummation: false, hasOwnTable: false, label: 'Monthly Withdrawal'},
            { isSummation: true, hasOwnTable: true, label: 'Unknown'},
            { isSummation: true, hasOwnTable: false, label: 'Total Bills'},
            { isSummation: true, hasOwnTable: false, label: 'Left Over Last Month'},
            { isSummation: false, hasOwnTable: false, label: 'Serap Payment'},
            { isSummation: false, hasOwnTable: false, label: 'Stamatios Payment'},
            { isSummation: false, hasOwnTable: false, label: 'Extra Payment'},
            { isSummation: false, hasOwnTable: false, label: 'Deposits'},
            { isSummation: true, hasOwnTable: false, label: 'Total Savings'},
          ],
        },
      },
    ];

    this.state = {
      tabOptions: tabs,
      selectedTab: tabs[0],
      monthOptions: months,
      selectedMonth: months[(new Date()).getMonth()],
      yearOptions: years,
      selectedYear: years[0],
      activeTab: tabs[0],
      tabs: tabs,
      overviewTable: overviewTable,
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

  handleTabSelectChange = (option) => {
    this.setState({
      selectedTab: option,
    });
  }

  handleTabChange = (selectedTab) => {
    this.setState({
      activeTab: selectedTab,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="text-center py-3">
            <header className="h1">Monthly Expense Report</header>
            <div className="row mt-5 d-flex justify-content-center">
              <div className="col-6 col-md-4 col-lg-4 col-xl-3 text-left">
                <CustomSelect 
                  identifier="months"
                  handler={this.handleMonthSelectChange}
                  options={this.state.monthOptions}
                  selectedItem={this.state.selectedMonth}
                />
              </div>
              <div className="col-6 col-md-4 col-lg-4 col-xl-3 text-left">
                <CustomSelect 
                  identifier="years"
                  handler={this.handleYearSelectChange}
                  options={this.state.yearOptions}
                  selectedItem={this.state.selectedYear}
                />
              </div>
            </div>
          </div>
          <CustomButton text="Start A New Month" />
          {/*
          <CustomTab 
            activeTab={this.state.activeTab} 
            tabItems={this.state.tabs} 
            handler={this.handleTabChange} 
          />
          */}
          <div className="row my-5 d-flex justify-content-center">
            <div className="col-6 col-md-7 col-lg-4 col-xl-3 text-left">
              <CustomSelect 
                identifier="tabs"
                handler={this.handleTabSelectChange}
                options={this.state.tabOptions}
                selectedItem={this.state.selectedTab}
              />
            </div>
          </div>
          {
            this.state.selectedTab.value === 0 ?
              <OverviewTable tableData={this.state.overviewTable[this.state.selectedTab.value]} />
            :
            this.state.selectedTab.value === 13 ?
              <StaticTable />
            :
              <ExpenseTable tableData={this.state.overviewTable[this.state.selectedTab.value]} />
          }
        </div>
      </div>
    );
  }
}

export default App;
