import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';

import MobileView from '../mobile-view/mobile-view.component';
import CustomSelect from '../custom-select/custom-select.component';
import OverviewTableContainer from '../overview-table/overview-table.container';

import { updateMonthStart, updateYearStart, updateTableStart } from '../../redux/expense/expense.actions';

import useWindowDimensions from '../../hooks/useWindowDimensions.js';

import './main.styles.scss';

const CustomTable = lazy(() => import(/* webpackPreload: true */ '../custom-table/custom-table.component'));
const StaticTable = lazy(() => import(/* webpackPreload: true */ '../static-table/static-table.component'));

const Main = ({ monthOptions, yearOptions, tableOptions, 
  selectedMonth, selectedYear, selectedTable,
  updateMonthStart, updateYearStart, updateTableStart }) => {

  const handleMonthSelectChange = (selectedIndex) => {
    updateMonthStart(selectedIndex);
  }

  const handleYearSelectChange = (selectedIndex) => {
    updateYearStart(selectedIndex);
  }

  const handleTableSelectChange = (selectedIndex) => {
    updateTableStart(selectedIndex);
  }

  const { width } = useWindowDimensions();
  
  return (
    <div className='container'>
      <div className='text-center py-3'>
        <h1>Monthly Expense Report</h1>
        <div className='mt-5 d-flex justify-content-center'>
          <CustomSelect 
            size='small-size'
            identifier='months'
            handler={handleMonthSelectChange}
            options={monthOptions}
            selectedItem={selectedMonth}
          />
          <CustomSelect 
            size='small-size'
            identifier='years'
            handler={handleYearSelectChange}
            options={yearOptions}
            selectedItem={selectedYear}
          />
        </div>
      </div>
      <div className='my-5 d-flex justify-content-center'>
        <CustomSelect 
          size='medium-size'
          identifier='tabs'
          handler={handleTableSelectChange}
          options={tableOptions}
          selectedItem={selectedTable}
        />
      </div>
      {
        width <= 576 ?
          selectedTable && selectedTable.value === 13 ?
            <Suspense fallback={<div>Loading...</div>}>
              <StaticTable />
            </Suspense>
          :
            <MobileView tabHandler={handleTableSelectChange} />
        :
        selectedTable && selectedTable.value === 0 ?
          <OverviewTableContainer tabHandler={handleTableSelectChange} />
        :
        selectedTable && selectedTable.value === 13 ?
          <Suspense fallback={<div>Loading...</div>}>
            <StaticTable />
          </Suspense>
        : 
          <Suspense fallback={<div>Loading...</div>}>
            <CustomTable />
          </Suspense>
      }
    </div>
  );
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
