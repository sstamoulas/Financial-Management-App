import React, { Suspense, lazy } from 'react';

// import ReactDatePicker from '../react-date-picker/react-date-picker.component';
import CustomInput from '../custom-input/custom-input.component';

import { 
  isNegative,
  invertNegative,
  thousandsSeparator
} from '../../redux/expense/expense.utils';

import './custom-table-td.styles.scss';

const ReactDatePicker = lazy(() => import(/* webpackPreload: true */ '../react-date-picker/react-date-picker.component'));

const CustomTableTD = ({ index, label, value, handler, isDate, hasOwnTable, isTotal, isBlank}) => (
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
      <Suspense fallback={<input />}>
        <ReactDatePicker
          id={`date-${index}`}
          index={index} 
          className='non-mobile-hide'
          date={value}
          handler={handler}
        />
      </Suspense>
      <label htmlFor={`date-${index}`} className='mobile-hide'>{value}</label>
    </td>
  :
    <td>
      <CustomInput 
        id={`${label}-${index}`}
        index={index}
        label={label}
        value={value || ''} 
        className='non-mobile-hide'
        handler={handler}
      />
      <label htmlFor={`${label}-${index}`} className='mobile-hide'>{value}</label>
    </td>
);

export default CustomTableTD;
