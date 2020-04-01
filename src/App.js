import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomSelect from './components/custom-select/custom-select.component';
import CustomButton from './components/custom-button/custom-button.component';
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

    this.state = {
      tabOptions: tabs,
      selectedTab: tabs[0],
      monthOptions: months,
      selectedMonth: months[(new Date()).getMonth()],
      yearOptions: years,
      selectedYear: years[0],
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
                tabHandler={this.handleTabSelectChange}
                options={this.state.tabOptions}
                tableName={this.state.selectedTab}
              />
            :
            this.state.selectedTab.value === 13 ?
              <StaticTable />
            :
              <CustomTable />
          }
        </div>
      </div>
    );
  }
}

export default App;
