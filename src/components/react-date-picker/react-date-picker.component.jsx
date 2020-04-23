import React from 'react';

import DatePicker from 'react-datepicker';

import './react-date-picker.styles.scss';

require(/* webpackPreload: true */ 'react-datepicker/dist/react-datepicker.css')

const ReactDatePicker = ({ index, date, handler, id, className}) => (
  <DatePicker
    id={id}
    className={className}
    dateFormat='MM/dd/yyyy'
    selected={Date.parse(date)}
    onChange={(date) => handler(date, 'date', index)}
  />
);

export default ReactDatePicker;
