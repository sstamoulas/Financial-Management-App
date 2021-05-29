import React, { Suspense, lazy, useCallback, useState } from 'react';
import { connect, batch } from 'react-redux';

import MobileView from '../mobile-view/mobile-view.component';
import CustomSelect from '../custom-select/custom-select.component';
import OverviewTableContainer from '../overview-table/overview-table.container';

import { 
  addMetaTableStart, 
  updateMonthStart, 
  updateYearStart, 
  updateTableStart 
} from '../../redux/expense/expense.actions';

import useWindowDimensions from '../../hooks/useWindowDimensions.js';

import './main.styles.scss';

const CustomTable = lazy(() => import(/* webpackPreload: true */ '../custom-table/custom-table.component'));

const INITIAL_STATE = {
  label: '',
  value: '',
  hasOwnTable: false,
  isExpense: false,
}

const Main = ({ monthOptions, yearOptions, tableOptions, 
  selectedMonth, selectedYear, selectedTable,
  updateMonthStart, updateYearStart, updateTableStart, addMetaTableStart }) => {
  const [table, setTable] = useState({ ...INITIAL_STATE })

  const handleAddMetaTableText = (event) => {
    const {value} = event.target;

    setTable(prevState => ({ ...prevState, 'label': value, 'value': tableOptions[tableOptions.length - 1].value + 1 }));
  }

  const handleAddMetaTableCheckbox = (event) => {
    const {name, checked} = event.target;

    setTable(prevState => ({ ...prevState, [name]: checked }));
  }

  const onSubmit = (event) => {
    batch(() => {
      addMetaTableStart(table);
      setTable({ ...INITIAL_STATE });
    });

    event.preventDefault();
  }

  const handleMonthSelectChange = useCallback((selectedValue) => {
    updateMonthStart(selectedValue);
  }, [updateMonthStart])

  const handleYearSelectChange = useCallback((selectedValue) => {
    updateYearStart(selectedValue);
  }, [updateYearStart])

  const handleTableSelectChange = useCallback((selectedValue) => {
    updateTableStart(selectedValue);
  }, [updateTableStart])

  const findTable = (value) => {
    const option = tableOptions.find(option => option.value === value);

    console.log('tableOptions and value:', tableOptions, value)

    return option.value;
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
          options={tableOptions.filter((table) => table.hasOwnTable)}
          selectedItem={selectedTable}
        />
      </div>
      {
        selectedTable && selectedTable.value === 0 && (
          <div className='text-center new-table-container'>
            <div>Add A Table</div>
            <div className='d-flex justify-content-center'>
              <input type='text' id='tableName' className='input-control medium-size' placeholder='Table Name' value={table.label} onChange={handleAddMetaTableText} />
            </div>
            <div className='d-flex justify-content-space-evenly checkbox-top-margin checkbox-width'>
              <label htmlFor='hasOwnTable'>Is Multiple Payments:&nbsp;</label>
              <input type='checkbox' className='checkbox-margin checkbox-top-margin' id='hasOwnTable' name='hasOwnTable' checked={table.hasOwnTable} onChange={handleAddMetaTableCheckbox} />
              <label htmlFor='isExpense'>Is Expense:&nbsp;</label>
              <input type='checkbox' className='checkbox-margin checkbox-top-margin' id='isExpense' name='isExpense' checked={table.isExpense} onChange={handleAddMetaTableCheckbox} />
            </div>
            <div className='d-flex justify-content-center'>
              <input type='button' value='Submit' onClick={onSubmit} />
            </div>
          </div>
        )
      }
      {
        width <= 576 ?
          <MobileView tabHandler={(value) => handleTableSelectChange(findTable(value))} />
        :
          selectedTable && selectedTable.value === 0 ?
            <OverviewTableContainer tabHandler={(value) => handleTableSelectChange(findTable(value))} />
          :
            <Suspense fallback={<div>Loading...</div>}>
              <CustomTable />
            </Suspense>
      }
    </div>
  )
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
  addMetaTableStart: (tableInfo) => dispatch(addMetaTableStart(tableInfo)),
  updateTableStart: (option) => dispatch(updateTableStart(option)),
  updateMonthStart: (option) => dispatch(updateMonthStart(option)),
  updateYearStart: (option) => dispatch(updateYearStart(option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
