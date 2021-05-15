import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import WithTable from '../with-table/with-table.component';

import { removeItems, removeItemsStart, updateItems, updateItemsStart } from '../../redux/expense/expense.actions';

const EmptyComponent = () => <></>;

const mapStateToProps = (state) => ({
  tableOptions: state.root.tableOptions,
  selectedTable: state.root.selectedTable,
  headers: ['Remove', 'Name', 'Paid', 'Date'],
  credits: state.root.data,
  hasDueItems: false,
  usesLink: true,
});

const mapDispatchToProps = (dispatch) => ({
  removeItems: (index) => dispatch(removeItems(index)),
  removeItemsStart: (index) => dispatch(removeItemsStart(index)),
  updateItems: (index, value, label) => dispatch(updateItems(index, value, label)),
  updateItemsStart:  (index, value, label) => dispatch(updateItemsStart(index, value, label)),
});

const CustomTableContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithTable
)(EmptyComponent);


export default CustomTableContainer;
