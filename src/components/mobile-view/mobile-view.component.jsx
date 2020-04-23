import React, { useState }  from 'react';

import CustomButton from '../custom-button/custom-button.component';
import CustomSelect from '../custom-select/custom-select.component';
import MobileViewItem from '../mobile-view-item/mobile-view-item.component';

const MobileView = ({options, updateRowItem, addExpense}) => {
  const [selectedIndex, setSelectedIndex] = useState(options.length - 1);
  const updateItem = (value, label) => {
    updateRowItem(value, label, selectedIndex);
    setSelectedIndex(selectedIndex)
  }

  const addRow = () => {
    addExpense();
    setSelectedIndex(options.length)
  }

  const setIndex = (selectedItem) => {
    let index = options.findIndex(option => 
      option.label === selectedItem.label && 
      option.paid === selectedItem.paid && 
      option.date === selectedItem.date
    );
    setSelectedIndex(index)
  }

  if(selectedIndex >= options.length) {
    setSelectedIndex(options.length - 1);
  }

  return !!options.length && selectedIndex < options.length && selectedIndex >= 0 ?
    (
      <div className='mobile-hide'>
        <div className='d-flex justify-content-center'>
          <CustomSelect
            size='medium-size'
            identifier='labels'
            handler={(option) => setIndex(option)}
            options={options}
            selectedItem={options[selectedIndex]}
          />
        </div>
        {
          !options[selectedIndex].hasOwnProperty('due') ? 
            <MobileViewItem 
              option={options[selectedIndex]} 
              label='Label'
              handler={updateItem} 
              addRow={addRow} 
              usesButton={true} 
            />
          :
            <MobileViewItem 
              option={options[selectedIndex]} 
              label='Due' 
              handler={updateItem} 
            />
        }
        <MobileViewItem 
          option={options[selectedIndex]} 
          label='Paid' 
          handler={updateItem} 
        />
        <MobileViewItem 
          option={options[selectedIndex]} 
          label='Date' 
          handler={updateItem} 
          isDate={true} 
        />
      </div>
    )
  :
    <CustomButton 
      mobileHide='mobile-hide' 
      text='Add New Expense' 
      handler={() => addRow()} 
    />
}

export default MobileView;
