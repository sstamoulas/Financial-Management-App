import React, { useState }  from 'react';

import CustomButton from '../custom-button/custom-button.component';
import CustomSelect from '../custom-select/custom-select.component';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const MobileTableView = ({options, updateRowItem, addExpense}) => {
  const [selectedIndex, setSelectedIndex] = useState(options.length - 1);
  const updateItem = (value, label) => {
    updateRowItem(selectedIndex, value, label);
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
      <div className="mobile-hide">
        <div className="d-flex justify-content-center">
          <CustomSelect
            size="medium-size"
            identifier="labels"
            handler={(option) => setIndex(option)}
            options={options}
            selectedItem={options[selectedIndex]}
          />
        </div>
        {
          !options[selectedIndex].hasOwnProperty("due") ? 
            <div className="row mt-5 d-flex justify-content-center">
              <CustomButton text="Add New Expense" handler={() => addRow()} />
              <div className="col mt-5">
                <label htmlFor="label">{options[selectedIndex].label}:&nbsp;</label>
                {
                  options[selectedIndex].hasOwnTable ?
                    <label id="label">{options[selectedIndex].label}</label>
                  :
                    <input 
                      type="text" 
                      className="form-control" 
                      id="label" 
                      value={options[selectedIndex].label || ''} 
                      onChange={(e) => updateItem(e.target.value, 'label')} 
                    />
                }
              </div>
            </div>
          :
            null
        }
        {
          options[selectedIndex].hasOwnProperty("due") ? 
            <div className="row mt-4 d-flex justify-content-center">
              <div className="col">
                <label htmlFor="due">Due:&nbsp;</label>
                {
                  options[selectedIndex].hasOwnTable ?
                    <label id="due">{options[selectedIndex].due}</label>
                  :
                    <input 
                      type="number" 
                      className="form-control" 
                      id="due" 
                      value={options[selectedIndex].due || ''} 
                      onChange={(e) => updateItem(e.target.value, 'due')} 
                    />
                }
              </div>
            </div>
          :
            null
        }
        <div className="row mt-4 d-flex justify-content-center">
          <div className="col">
            <label htmlFor="paid">Paid:&nbsp;</label>
            {
              options[selectedIndex].hasOwnTable ?
                <label id="paid">{options[selectedIndex].paid}</label>
              :
                <input 
                  type="number" 
                  className="form-control" 
                  id="paid" 
                  value={options[selectedIndex].paid || ''} 
                  onChange={(e) => updateItem(e.target.value, 'paid')} 
                />
            }
          </div>
        </div>
        <div className="row my-4 d-flex justify-content-center">
          <div className="col">
            <label htmlFor="date">Date:&nbsp;</label>
            {
              options[selectedIndex].hasOwnTable ?
                <label id="date">{options[selectedIndex].date}</label>
              :
                <div className="w-100">
                  <DatePicker
                    id="date" 
                    className="form-control" 
                    dateFormat="MM/dd/yyyy"
                    selected={Date.parse(options[selectedIndex].date)}
                    onChange={(date) => updateItem(date, 'date')}
                  />
                </div>
            }
          </div>
        </div>
      </div>
    )
  :
    <CustomButton 
      mobileHide="mobile-hide" 
      text="Add New Expense" 
      handler={() => addRow()} 
    />
}

export default MobileTableView;
