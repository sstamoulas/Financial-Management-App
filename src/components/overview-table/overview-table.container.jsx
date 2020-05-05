import { connect } from 'react-redux';
import { compose } from 'redux';

import WithTable from '../with-table/with-table.component';
import OverviewTable from './overview-table.component';

import { updateItems, updateItemsStart } from '../../redux/expense/expense.actions';

const mapStateToProps = (state) => ({
  tableOptions: state.root.tableOptions,
  headers: ['Name', 'Due', 'Paid', 'Date'],
  credits: state.root.data.filter(data => data.isExpense),
  hasDueItems: true,
  usesLink: false,
});

const mapDispatchToProps = (dispatch) => ({
  updateItems: (index, value, label) => dispatch(updateItems(index, value, label)),
  updateItemsStart: (index, value, label) => dispatch(updateItemsStart(index, value, label)),
});

const OverviewTableContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithTable
)(OverviewTable);


export default OverviewTableContainer;
