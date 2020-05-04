import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import WithTable from '../with-table/with-table.component';

import { removeItem, removeItemStart, updateItem, updateItemStart } from '../../redux/expense/expense.actions';

const EmptyComponent = () => <></>;

const mapStateToProps = (state) => ({
  tableOptions: state.root.tableOptions,
  headers: ['Remove', 'Name', 'Paid', 'Date'],
  credits: state.root.data,
  hasDueItems: false,
  usesLink: true,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (index) => dispatch(removeItem(index)),
  removeItemStart: (index) => dispatch(removeItemStart(index)),
  updateItem: (index, value, label) => dispatch(updateItem(index, value, label)),
  updateItemStart:  (index, value, label) => dispatch(updateItemStart(index, value, label)),
});

const CustomTableContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithTable
)(EmptyComponent);


export default CustomTableContainer;
