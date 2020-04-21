import React from 'react';

import DatePicker from 'react-datepicker';

import { formatDate } from '../../redux/expense/expense.utils';

import 'react-datepicker/dist/react-datepicker.css';
import './custom-table-row.styles.scss';

const CustomTableRow = ({ index, label, paid, date, removeRowItem, updateRowItem}) => {
  return (
  <tr>
    <th scope="row">
      <a href="/#" onClick={(e) => removeRowItem(e, index)}>[-]</a>
    </th>
    <td>
      <input 
        type="text" 
        value={label || ''} 
        className="non-mobile-hide"
        onChange={(e) => updateRowItem(index, e.target.value, 'label')} 
      />
      <label className="mobile-hide">{label}</label>
    </td>
    <td>
      <input 
        type="number" 
        value={paid || ''} 
        className="non-mobile-hide"
        onChange={(e) => updateRowItem(index, e.target.value, 'paid')} 
      />
      <label className="mobile-hide">{paid}</label>
    </td>
    <td>
      <DatePicker
        className="non-mobile-hide"
        dateFormat="MM/dd/yyyy"
        selected={Date.parse(date)}
        onChange={(date) => updateRowItem(index, date, 'date')}
      />
      <label className="mobile-hide">{formatDate(date)}</label>
    </td>
  </tr> 
)};

export default CustomTableRow;
