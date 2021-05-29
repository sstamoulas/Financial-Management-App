import React, { useState }  from 'react';
import { connect, batch } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CustomSelect from '../custom-select/custom-select.component';
import MobileViewEditable from '../mobile-view-editable/mobile-view-editable.component';
import MobileViewUneditable from '../mobile-view-uneditable/mobile-view-uneditable.component';

import { addItem, updateItems, removeItems, updateItemsStart, removeItemsStart } from '../../redux/expense/expense.actions';
import { formatDate, generateTotal, invertNegative, isNegative, thousandsSeparator } from '../../redux/expense/expense.utils';

import './mobile-view.styles.scss';

const MobileView = ({ options, credits, debits, 
  tabHandler, updateItems, updateItemsStart, 
  removeItems, removeItemsStart, addItem }) => {
  const [selectedIndex, setSelectedIndex] = useState(options.length ? options[0].value : 0);

  const update = (value, label) => {
    if(label === 'date') {
      value = formatDate(value)
    }

    batch(() => {
      updateItems(selectedIndex, value, label);
      updateItemsStart(selectedIndex, value, label);
    });
  }

  const addRow = () => {
    console.log(options)
    batch(() => {
      addItem();
      setSelectedIndex(options.length ? options[options.length - 1].value : 0);
    });
  }

  const removeRow = () => {
    batch(() => {
      removeItems(selectedIndex);
      removeItemsStart(selectedIndex);
      setSelectedIndex(options.length ? (options[options.length - 1].value) : 0);
    });
  }

  const setIndex = (index) => {
    setSelectedIndex(index)
  }

  if(options && !!options.length && options.length < (selectedIndex + 1)) {
    setSelectedIndex(0);
  }

  const selectOptions = options && options.map(({paid, label, value}) => {
    return {label: `${label.substring(0, 25)} - $${!isNaN(paid) ? thousandsSeparator(invertNegative(parseFloat(paid))) : 0}`, value}
  });

  let creditPaidTotal = generateTotal(credits, 'paid'), totalPaid = creditPaidTotal;
  let creditDueTotal = generateTotal(credits, 'due'), totalDue = creditDueTotal;

  if(debits) {
    const debitPaidTotal = generateTotal(debits, 'paid');
    const debitDueTotal = generateTotal(debits, 'due');

    totalPaid = debitPaidTotal - creditPaidTotal;
    totalDue = debitDueTotal - creditDueTotal;
  }

  //console.log(selectedIndex, options, credits)

  return options && !!options.length ?
    (
      <>
        <div className='mt-5 d-flex justify-content-center'>
          <CustomSelect
            size='medium-size'
            identifier='labels'
            handler={setIndex}
            options={selectOptions}
            selectedItem={selectOptions.find((option) => option.value === selectedIndex)}
          />
        </div>
        <div className={'mt-5 d-flex justify-content-center'} style={{fontSize: '25px'}}>Budget: ${thousandsSeparator(invertNegative(parseFloat(totalDue)))}</div>
        <div className={`d-flex justify-content-center ${isNegative(totalPaid)}`} style={{fontSize: '25px'}}>Total: ${thousandsSeparator(invertNegative(parseFloat(totalPaid)))}</div>
        <CustomButton text='Add New Expense' handler={addRow} className="mt-5" />
        {        
          options.find((option) => option.value === selectedIndex).hasOwnTable ?
            <MobileViewUneditable 
              tabHandler={tabHandler} 
              updateHandler={update} 
              option={options.find((option) => option.value === selectedIndex)} 
            />
          :
            <MobileViewEditable 
              option={options.find((option) => option.value === selectedIndex)} 
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
        <div className={'mt-5 d-flex justify-content-center'} style={{fontSize: '25px'}}>Budget: ${thousandsSeparator(invertNegative(parseFloat(totalDue)))}</div>
        <div className="d-flex justify-content-center" style={{fontSize: '25px'}}>Total: ${thousandsSeparator(parseFloat(totalPaid))}</div>
        <CustomButton text='Add New Expense' handler={addRow} className="mt-5" />
      </>
    )
}

const mapStateToProps = (state) => ({
  options: state.root.data,
  credits: state.root.data && state.root.data.filter(data => data.isExpense),
  debits: state.root.data && state.root.data.filter(data => !data.isExpense),
});

const mapDispatchToProps = (dispatch) => ({
  addItem: () => dispatch(addItem()),
  removeItems: (index) => dispatch(removeItems(index)),
  removeItemsStart: (index) => dispatch(removeItemsStart(index)),
  updateItems: (index, value, label) => dispatch(updateItems(index, value, label)),
  updateItemsStart:  (index, value, label) => dispatch(updateItemsStart(index, value, label)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileView);
