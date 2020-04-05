import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomSelect from './components/custom-select/custom-select.component';
import CustomButton from './components/custom-button/custom-button.component';
import OverviewTable from './components/overview-table/overview-table.component';
import CustomTable from './components/custom-table/custom-table.component';
import StaticTable from './components/static-table/static-table.component';

import { 
  updateMonth, 
  updateYear, 
  updateTable, 
  fetchCollectionsStart 
} from './redux/expense/expense.actions';

class App extends Component {
  componentDidMount() {
    const { fetchCollectionsStart, selectedTable, selectedMonth, selectedYear } = this.props;
    fetchCollectionsStart(selectedTable, selectedMonth, selectedYear);
  }

  handleMonthSelectChange = (option) => {
    let {updateMonth, fetchCollectionsStart, selectedTable, selectedYear} = this.props;
    updateMonth(option);
    fetchCollectionsStart(selectedTable, option, selectedYear);
  }

  handleYearSelectChange = (option) => {
    let {updateYear, fetchCollectionsStart, selectedTable, selectedMonth} = this.props;
    updateYear(option);
    fetchCollectionsStart(selectedTable, selectedMonth, option);
  }

  handleTableSelectChange = (option) => {
    let {updateTable, fetchCollectionsStart, selectedYear, selectedMonth} = this.props;
    updateTable(option);
    fetchCollectionsStart(option, selectedMonth, selectedYear);
  }

  render() {
    const { monthOptions, yearOptions, tableOptions, selectedMonth, selectedYear, selectedTable, } = this.props;
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
                  options={monthOptions}
                  selectedItem={selectedMonth}
                />
              </div>
              <div className="text-left">
                <CustomSelect 
                  size="small-size"
                  identifier="years"
                  handler={this.handleYearSelectChange}
                  options={yearOptions}
                  selectedItem={selectedYear}
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
                handler={this.handleTableSelectChange}
                options={tableOptions}
                selectedItem={selectedTable}
              />
            </div>
          </div>
          {
            selectedTable.value === 0 ?
              <OverviewTable 
                tabHandler={this.handleTableSelectChange}
                options={tableOptions}
                tableName={selectedTable}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
            :
            selectedTable.value === 13 ?
              <StaticTable />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tableOptions: state.expense.tableOptions,
  monthOptions: state.expense.monthOptions, 
  yearOptions: state.expense.yearOptions,
  selectedTable: state.expense.selectedTable,
  selectedMonth: state.expense.selectedMonth,
  selectedYear: state.expense.selectedYear,
});

const mapDispatchToProps = (dispatch) => ({
  updateTable: (option) => dispatch(updateTable(option)),
  updateMonth: (option) => dispatch(updateMonth(option)),
  updateYear: (option) => dispatch(updateYear(option)),
  fetchCollectionsStart: 
    (selectedTable, selectedMonth, selectedYear) => 
      dispatch(fetchCollectionsStart(selectedTable, selectedMonth, selectedYear)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
