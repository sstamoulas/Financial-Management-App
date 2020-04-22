import React from 'react';

import ReactDatePicker from '../react-date-picker/react-date-picker.component';
import CustomInput from '../custom-input/custom-input.component';

import { 
  isNegative,
  invertNegative,
  thousandsSeparator
} from '../../redux/expense/expense.utils';

import './custom-table-td.styles.scss';

const CustomTableTD = ({ index, label, value, handler, isDate, hasOwnTable, isTotal, isBlank}) => (
  isBlank ?
    <td><span>---</span></td>
  :
    isDate && hasOwnTable ?
    <td><a href='/#' onClick={() => handler(value)}>See Column</a></td>
  :
    hasOwnTable || isTotal ?
    <td className={isNegative(value)}>${invertNegative(thousandsSeparator((value).toFixed(2)))}</td>
  :
    isDate ?
    <td>
      <ReactDatePicker
        id={index}
        index={index} 
        className='non-mobile-hide'
        date={value}
        handler={handler}
      />
      <label className='mobile-hide'>{value}</label>
    </td>
  :
    <td>
      <CustomInput 
        index={index}
        label={label}
        value={value || ''} 
        className='non-mobile-hide'
        handler={handler}
      />
      <label className='mobile-hide'>{value}</label>
    </td>
);

export default CustomTableTD;
