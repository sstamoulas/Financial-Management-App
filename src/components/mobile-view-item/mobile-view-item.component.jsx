import React, { Suspense, lazy }  from 'react';

import CustomInput from '../custom-input/custom-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import ReactDatePicker from '../react-date-picker/react-date-picker.component';

const ReactDatePicker = lazy(() => import(/* webpackPreload: true */ '../react-date-picker/react-date-picker.component'));

const MobileViewItem = ({option, label, handler, addRow, isDate, usesButton}) => {
  return (
  option.hasOwnTable ?
    <label id={`${label}`}>{option[label.toLowerCase()]}</label>
  :
    <div className='row my-4 d-flex justify-content-center'>
      {
        usesButton ?
          <CustomButton text='Add New Expense' handler={() => addRow()} />
        : 
          null
      }
      <div className='col'>
        <label htmlFor={`${label}`}>{label}:&nbsp;</label>
          <div className='w-100'>
          {
            isDate ?
              <Suspense fallback={<input />}>
                <ReactDatePicker
                  id={`${label}`}
                  className='form-control'
                  date={option[label.toLowerCase()] || ''} 
                  handler={handler}
                />
              </Suspense>
            :
            <CustomInput 
              label={`${label}`}
              value={option[label.toLowerCase()] || ''} 
              id={`${label}`}
              className='form-control'
              handler={handler}
            />
          }
          </div>
      </div>
    </div> 
)};

export default MobileViewItem;
