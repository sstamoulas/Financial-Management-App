import React, { memo } from 'react';

import ReactDatePicker from '../react-date-picker/react-date-picker.component';
import CustomInput from '../custom-input/custom-input.component';

import { 
  isNegative,
  invertNegative,
  thousandsSeparator
} from '../../redux/expense/expense.utils';

import './custom-td.styles.scss';

const areEqual = (prevProps, nextProps) => prevProps.value === nextProps.value;

const CustomTD = ({ index, label, value, handler, isDate, hasOwnTable, isTotal, isBlank }) => (
  isBlank ?
    <td><span>---</span></td>
  :
    isDate && hasOwnTable ?
    <td><a href='/#' onClick={() => handler(value)}>See Column</a></td>
  :
    hasOwnTable || isTotal ?
    <td className={isNegative(value)}>${thousandsSeparator(invertNegative((value).toFixed(2)))}</td>
  :
    isDate ?
    <td>
      <ReactDatePicker
        index={index} 
        date={value}
        handler={handler}
      />
    </td>
  :
    <td>
      <CustomInput 
        index={index}
        label={label}
        value={value || ''} 
        handler={handler}
      />
    </td>
);

export default memo(CustomTD, areEqual);
