import React from 'react';

import './custom-table-row.styles.scss';

const CustomTableRow = ({ index, label, paid, date, removeRowItem, updateRowItem}) => (
  <tr>
    <th scope="row">
      <a href="/#" onClick={() => removeRowItem(index)}>[-]</a>
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
      <input 
        type="date" 
        value={date || ''} 
        className="non-mobile-hide"
        onChange={(e) => updateRowItem(index, e.target.value, 'date')} 
      />
      <label className="mobile-hide">{date}</label>
    </td>
  </tr> 
);

export default CustomTableRow;
