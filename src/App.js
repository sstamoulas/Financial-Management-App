import React, { Component } from 'react';

import CustomSelect from './components/custom-select/custom-select.component';
import CustomButton from './components/custom-button/custom-button.component';
import CustomTab from './components/custom-tab/custom-tab.component';
import OverviewTable from './components/overview-table/overview-table.component';
import CustomTable from './components/custom-table/custom-table.component';
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

    let data = [
      {
        year: 2020,
        month: "March",
        Overview: {
          'Rent': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Ameneties + Heat': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Electricity': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Water': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Gas': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Car Gas': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Car Maintenance': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Car Insurance': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Car Taxes': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Internet': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Serap Phone Bill': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Moms Phone Bill': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Stamatios Phone Bill': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Monthly Shopping': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Food Week 1': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Food Week 2': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Food Week 3': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Food Week 4': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Eating Out': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Yatim': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Ibrahim': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Baby': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Extra': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Hair Cut': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Qurban Savings': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Cleaning': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Monthly Withdrawal': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Unknown': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Total Bills': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Left Over Last Month': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Serap Payment': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Stamatios Payment': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Extra Payment': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Deposits': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Total Savings': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
        },
      },
      {
        year: 2020,
        month: "February",
        Overview: {
          'Rent': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Ameneties + Heat': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Electricity': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Water': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Gas': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Car Gas': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Car Maintenance': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Car Insurance': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Car Taxes': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Internet': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Serap Phone Bill': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Moms Phone Bill': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Stamatios Phone Bill': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Monthly Shopping': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Food Week 1': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Food Week 2': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Food Week 3': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Food Week 4': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Eating Out': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Yatim': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Ibrahim': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Baby': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Extra': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Hair Cut': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Qurban Savings': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Cleaning': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Monthly Withdrawal': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Unknown': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Total Bills': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Left Over Last Month': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Serap Payment': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Stamatios Payment': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Extra Payment': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Deposits': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
          'Total Savings': {
            'Last Month Paid': 0,
            'Expected': 0,
            'Paid': 0,
            'Date': '',
          },
        },
      },
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
      data: data,
      selectedData: data[0],
    };
  }

  handleMonthSelectChange = (option) => {
    let {data, selectedYear} = this.state;
    let currentData = data.find(
      item => item.year === selectedYear.label && item.month === option.label
    );

    this.setState({
      selectedMonth: option,
      selectedData: currentData,
    });
  }

  handleYearSelectChange = (option) => {
    let {data, selectedMonth} = this.state;
    let currentData = data.find(
      item => item.year === option.label && item.month === selectedMonth.label
    );

    this.setState({
      selectedYear: option,
      selectedData: currentData,
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

  updateExpectedAmount = (e, label) => {
    let {selectedData: { Overview }} = this.state;

    Overview[label]['Expected'] = e.target.value;

    this.setState({
      selectedData: {
        Overview
      }
    });
  }

  updatePaidAmount = (e, label) => {
    let {selectedData: { Overview }} = this.state;

    Overview[label]['Paid'] = e.target.value;

    this.setState({
      selectedData: {
        Overview
      }
    });
  }

  updateDate = (e, label) => {
    let {selectedData: { Overview }} = this.state;

    Overview[label]['Date'] = e.target.value;

    this.setState({
      selectedData: {
        Overview
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="text-center py-3">
            <header className="h1">Monthly Expense Report</header>
            <div className="mt-5 d-flex justify-content-center">
              <div className="text-left">
                <CustomSelect 
                  size="small-size"
                  identifier="months"
                  handler={this.handleMonthSelectChange}
                  options={this.state.monthOptions}
                  selectedItem={this.state.selectedMonth}
                />
              </div>
              <div className="text-left">
                <CustomSelect 
                  size="small-size"
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
          <div className="my-5 d-flex justify-content-center">
            <div className="text-left">
              <CustomSelect 
                size="medium-size"
                identifier="tabs"
                handler={this.handleTabSelectChange}
                options={this.state.tabOptions}
                selectedItem={this.state.selectedTab}
              />
            </div>
          </div>
          {
            this.state.selectedTab.value === 0 ?
              <OverviewTable 
                tableData={this.state.selectedData} 
                tableLayout={this.state.overviewTable[this.state.selectedTab.value]} 
                expectedHandler={this.updateExpectedAmount}
                paidHandler={this.updatePaidAmount}
                dateHandler={this.updateDate}
              />
            :
            this.state.selectedTab.value === 13 ?
              <StaticTable />
            :
              <CustomTable tableData={this.state.overviewTable[this.state.selectedTab.value]} />
          }
        </div>
      </div>
    );
  }
}

export default App;
