import { connect } from 'react-redux';
import { compose } from 'redux';

import WithTable from '../with-table/with-table.component';
import OverviewTable from './overview-table.component';

import { removeItems, removeItemsStart, removeMetaTableStart, updateItems, updateItemsStart } from '../../redux/expense/expense.actions';

const mapStateToProps = (state) => ({
  tableOptions: state.root.tableOptions,
  selectedTable: state.root.selectedTable,
  headers: ['Remove', 'Name', 'Due', 'Paid', 'Date'],
  credits: state.root.data && state.root.data.filter(data => data.isExpense),
  hasDueItems: true,
  usesLink: true,
});

const mapDispatchToProps = (dispatch) => ({
  removeItems: (index) => dispatch(removeItems(index)),
  removeItemsStart: (index) => dispatch(removeItemsStart(index)),
  removeMetaTableStart: (index) => dispatch(removeMetaTableStart(index)),
  updateItems: (index, value, label) => dispatch(updateItems(index, value, label)),
  updateItemsStart: (index, value, label) => dispatch(updateItemsStart(index, value, label)),
});

const OverviewTableContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithTable
)(OverviewTable);


export default OverviewTableContainer;
