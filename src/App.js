import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Main from './components/main/main.component';
import CustomeLoader from './components/custom-loader/custom-loader.component';

import { fetchMetaStart } from './redux/expense/expense.actions';

import './App.styles.scss';

const App = ({ isFetching, fetchMetaStart }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      fetchMetaStart();
      isMounted.current = true;
    }
  }, [isFetching, fetchMetaStart]);

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
  fetchMetaStart: () => dispatch(fetchMetaStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
