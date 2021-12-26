import React, { useEffect, useRef } from 'react';
import { batch, connect } from 'react-redux';

import Main from './components/main/main.component';
import CustomeLoader from './components/custom-loader/custom-loader.component';

import { fetchItemsStart, fetchMetaStart } from './redux/expense/expense.actions';

import './App.styles.scss';

const App = ({ isFetching, fetchItemsStart, fetchMetaStart }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      batch(() => {
        fetchItemsStart();
        fetchMetaStart();
      })
      isMounted.current = true;
    }
  }, [isFetching, fetchItemsStart, fetchMetaStart]);

  return isMounted.current && !isFetching ?
    (
      <div className='App'>
        <Main />
      </div>
    )
  :
    <CustomeLoader />
}

const mapStateToProps = (state) => ({
  isFetching: state.root.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemsStart: () => dispatch(fetchItemsStart()),
  fetchMetaStart: () => dispatch(fetchMetaStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
