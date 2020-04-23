import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomSelect from './components/custom-select/custom-select.component';
import OverviewTable from './components/overview-table/overview-table.component';
import CustomTable from './components/custom-table/custom-table.component';
import StaticTable from './components/static-table/static-table.component';

import { 
  updateMonthStart, 
  updateYearStart, 
  updateTableStart, 
  fetchMetaStart
} from './redux/expense/expense.actions';

class App extends Component {
  componentDidMount() {
    const { fetchMetaStart } = this.props;
    fetchMetaStart();
  }

  handleMonthSelectChange = (option) => {
    let {updateMonthStart} = this.props;
    updateMonthStart(option);
  }

  handleYearSelectChange = (option) => {
    let {updateYearStart} = this.props;
    updateYearStart(option);
  }

  handleTableSelectChange = (option) => {
    let {updateTableStart} = this.props;
    updateTableStart(option);
  }

  render() {
    const { 
      monthOptions, 
      yearOptions, 
      tableOptions, 
      selectedMonth, 
      selectedYear, 
      selectedTable, 
    } = this.props;
    
    return (
      <div className="App">
        <div className="container">
          <div className="text-center py-3">
            <h1 className="h1">Monthly Expense Report</h1>
            <div className="mt-5 d-flex justify-content-center">
              <CustomSelect 
                size="small-size"
                identifier="months"
                handler={this.handleMonthSelectChange}
                options={monthOptions}
                selectedItem={selectedMonth}
              />
              <CustomSelect 
                size="small-size"
                identifier="years"
                handler={this.handleYearSelectChange}
                options={yearOptions}
                selectedItem={selectedYear}
              />
            </div>
          </div>
          <div className="my-5 d-flex justify-content-center">
            <CustomSelect 
              size="medium-size"
              identifier="tabs"
              handler={this.handleTableSelectChange}
              options={tableOptions}
              selectedItem={selectedTable}
            />
          </div>
          {
            selectedTable && selectedTable.value === 0 ?
              <OverviewTable 
                tabHandler={this.handleTableSelectChange}
                options={tableOptions}
                tableName={selectedTable}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
            :
            selectedTable && selectedTable.value === 13 ?
              <StaticTable />
            : 
              <CustomTable />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tableOptions: state.root.tableOptions,
  monthOptions: state.root.monthOptions, 
  yearOptions: state.root.yearOptions,
  selectedTable: state.root.selectedTable,
  selectedMonth: state.root.selectedMonth,
  selectedYear: state.root.selectedYear,
});

const mapDispatchToProps = (dispatch) => ({
  updateTableStart: (option) => dispatch(updateTableStart(option)),
  updateMonthStart: (option) => dispatch(updateMonthStart(option)),
  updateYearStart: (option) => dispatch(updateYearStart(option)),
  fetchMetaStart: () => dispatch(fetchMetaStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
