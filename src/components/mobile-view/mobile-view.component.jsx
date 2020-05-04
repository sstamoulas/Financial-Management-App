import React, { useState }  from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CustomSelect from '../custom-select/custom-select.component';
import MobileViewEditable from '../mobile-view-editable/mobile-view-editable.component';
import MobileViewUneditable from '../mobile-view-uneditable/mobile-view-uneditable.component';

import { addItem, updateItem, removeItem, updateItemStart, removeItemStart } from '../../redux/expense/expense.actions';
import { formatDate, generateTotal, invertNegative, isNegative, thousandsSeparator } from '../../redux/expense/expense.utils';

import './mobile-view.styles.scss';

const MobileView = ({ options, tableOptions, credits, debits, 
  tabHandler, updateItem, updateItemStart, 
  removeItem, removeItemStart, addItem }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const update = (value, label) => {
    if(label === 'date') {
      value = formatDate(value)
    }

    updateItem(selectedIndex, value, label);
    updateItemStart(selectedIndex, value, label);
  }

  const addRow = () => {
    addItem();
    setSelectedIndex(options.length)
  }

  const removeRow = () => {
    removeItem(selectedIndex);
    removeItemStart(selectedIndex);
    setSelectedIndex(options.length - 1)
  }

  const setIndex = (index) => {
    setSelectedIndex(index)
  }

  if(!!options.length && options.length < (selectedIndex + 1)) {
    setSelectedIndex(0);
  }

  const selectOptions = options.map(({paid, label}, index) => {
    return {label: `${label.substring(0, 25)} - $${!isNaN(paid) ? thousandsSeparator(invertNegative(parseFloat(paid).toFixed(2))) : 0}`, index}
  });

  let creditTotal = generateTotal(credits, 'paid'), total = creditTotal;

  if(debits) {
    const debitTotal = generateTotal(debits, 'paid');

    total = debitTotal - creditTotal;
  }

  return !!options.length ?
    (
      <>
        <div className='d-flex justify-content-center'>
          <CustomSelect
            size='medium-size'
            identifier='labels'
            handler={setIndex}
            options={selectOptions}
            selectedItem={selectOptions[selectedIndex]}
          />
        </div>
        <div className={`mt-5 d-flex justify-content-center ${isNegative(total)}`} style={{fontSize: '25px'}}>Total: ${thousandsSeparator(invertNegative((total).toFixed(2)))}</div>
        {     
          !options[selectedIndex].hasOwnProperty('due') ?
            <>
              <CustomButton text='Add New Expense' handler={addRow} className="mt-5" />
            </>
          :
            null
        }
        {        
          options[selectedIndex].hasOwnTable ?
            <MobileViewUneditable tabHandler={tabHandler} {...options[selectedIndex]} />
          :
            <MobileViewEditable 
              index={selectedIndex}
              options={options} 
              updateHandler={update} 
              addHandler={addRow} 
              removeHandler={removeRow}
            />
        }
      </>
    )
  :
    (
      <>
        <div className="mt-5 d-flex justify-content-center" style={{fontSize: '25px'}}>Total: ${thousandsSeparator(parseFloat(total).toFixed(2))}</div>
        <CustomButton text='Add New Expense' handler={addRow} className="mt-5" />
      </>
    )
}

const mapStateToProps = (state) => ({
  options: state.root.data,
  credits: state.root.data.filter(data => data.isExpense),
  debits: state.root.data.filter(data => !data.isExpense),
});

const mapDispatchToProps = (dispatch) => ({
  addItem: () => dispatch(addItem()),
  removeItem: (index) => dispatch(removeItem(index)),
  removeItemStart: (index) => dispatch(removeItemStart(index)),
  updateItem: (index, value, label) => dispatch(updateItem(index, value, label)),
  updateItemStart:  (index, value, label) => dispatch(updateItemStart(index, value, label)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileView);
