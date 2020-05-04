import { connect } from 'react-redux';
import { compose } from 'redux';

import WithTable from '../with-table/with-table.component';
import OverviewTable from './overview-table.component';

import { updateItem, updateItemStart } from '../../redux/expense/expense.actions';

const mapStateToProps = (state) => ({
  tableOptions: state.root.tableOptions,
  headers: ['Name', 'Due', 'Paid', 'Date'],
  credits: state.root.data.filter(data => data.isExpense),
  hasDueItems: true,
  usesLink: false,
});

const mapDispatchToProps = (dispatch) => ({
  updateItem: (index, value, label) => dispatch(updateItem(index, value, label)),
  updateItemStart: (index, value, label) => dispatch(updateItemStart(index, value, label)),
});

const OverviewTableContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithTable
)(OverviewTable);


export default OverviewTableContainer;
