import React  from 'react';

import CustomInput from '../custom-input/custom-input.component';
import CustomButton from '../custom-button/custom-button.component';
import ReactDatePicker from '../react-date-picker/react-date-picker.component';

import './mobile-view-item.styles.scss';

const MobileViewItem = ({ label, option, isDate, updateHandler, addHandler, removeHandler }) => (
  <div className='row my-4 d-flex justify-content-center'>
    <div className='col'>
      <label htmlFor={`${label.toLowerCase()}-0`}>{label}:&nbsp;</label>
        <div className={`w-100 ${isDate && !option.hasOwnProperty('due') ? 'd-flex' : ''}`}>
        {
          isDate ?
            <>
              <ReactDatePicker
                index={0}
                className='form-control'
                date={option[label.toLowerCase()] || ''} 
                handler={updateHandler}
              />
              {
                !option.hasOwnProperty('due') &&
                  <CustomButton text='Remove Expense' handler={removeHandler} className="ml-5" />
              }
            </>
          :
            <CustomInput 
              index={0}
              label={`${label.toLowerCase()}`}
              value={option[label.toLowerCase()] || ''} 
              className='form-control'
              handler={updateHandler}
            />
        }
        </div>
    </div>
  </div> 
);

export default MobileViewItem;
