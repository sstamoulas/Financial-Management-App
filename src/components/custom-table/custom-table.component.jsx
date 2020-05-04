import React from 'react';
import { connect } from 'react-redux';

import CustomTableContainer from './custom-table.container';
import CustomButton from '../custom-button/custom-button.component';

import { addItem } from '../../redux/expense/expense.actions';

import './custom-table.styles.scss';

const CustomTable = ({ addItem }) => (
  <>
    <CustomTableContainer />
    <CustomButton text='Add New Expense' handler={() => addItem()} />
  </>
);

const mapDispatchToProps = (dispatch) => ({
  addItem: () => dispatch(addItem()),
});

export default connect(null, mapDispatchToProps)(CustomTable);
