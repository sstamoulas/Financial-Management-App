import React from 'react';
import { connect } from 'react-redux';

import { removeCollectionRowStart } from '../../redux/expense/expense.actions';

import './custom-table-row.styles.scss';

const CustomTableRow = ({ index, name, value, date, removeRow, updateRowItem}) => (
  <tr>
    <th scope="row"><a href="/#" onClick={() => removeRow(index)}>[-]</a></th>
    <td><input type="text" value={name || ''} onChange={(e) => updateRowItem(index, e.target.value, 'name')} /></td>
    <td><input type="number" value={value || 0} onChange={(e) => updateRowItem(index, e.target.value, 'value')} /></td>
    <td><input type="date" value={date || ''} onChange={(e) => updateRowItem(index, e.target.value, 'date')} /></td>
  </tr> 
);

const mapDispatchToProps = dispatch => ({
  removeRow: (index) => dispatch(removeCollectionRowStart(index)),
});

export default connect(null, mapDispatchToProps)(CustomTableRow);
