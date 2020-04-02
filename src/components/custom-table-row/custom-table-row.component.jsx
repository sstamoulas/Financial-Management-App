import React from 'react';
import { connect } from 'react-redux';

import { removeExpenseStart, updateExpenseStart } from '../../redux/expense/expense.actions';

import './custom-table-row.styles.scss';

const CustomTableRow = ({ index, name, value, date, removeExpense, updateExpense}) => (
  <tr>
    <th scope="row"><a href="/#" onClick={() => removeExpense(index)}>[-]</a></th>
    <td><input type="text" value={name} onChange={(e) => updateExpense(index, e, 'name')} /></td>
    <td><input type="number" value={value} onChange={(e) => updateExpense(index, e, 'value')} /></td>
    <td><input type="date" value={date} onChange={(e) => updateExpense(index, e, 'date')} /></td>
  </tr>
);

const mapDispatchToProps = dispatch => ({
  removeExpense: (index) => dispatch(removeExpenseStart(index)),
  updateExpense: (index, e, type) => dispatch(updateExpenseStart(index, e, type)),
});

export default connect(null, mapDispatchToProps)(CustomTableRow);
