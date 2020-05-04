import React, { Suspense, lazy } from 'react';

import './react-date-picker.styles.scss';

const DatePicker = lazy(() => import(/* webpackPreload: true */ 'react-datepicker'));

require(/* webpackPreload: true */ 'react-datepicker/dist/react-datepicker.css')

const ReactDatePicker = ({ index, date, handler, className }) => (
  <Suspense fallback={<input />}>
    <label htmlFor={`date-${index}`} className='hide'>{date}</label>
    <DatePicker
      id={`date-${index}`}
      className={className}
      dateFormat='MM/dd/yyyy'
      selected={Date.parse(date)}
      onChange={(date) => handler(date, 'date', index)}
    />
  </Suspense>
);

export default ReactDatePicker;
