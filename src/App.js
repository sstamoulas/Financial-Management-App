import React, { Component } from 'react';
import { connect } from 'react-redux';

import Main from './components/main/main.component';

import { fetchMetaStart } from './redux/expense/expense.actions';

import './App.styles.scss';

class App extends Component {
  componentDidMount() {
    const { fetchMetaStart } = this.props;
    fetchMetaStart();
  }

  render() {
    return (
      <div className='App'>
        <Main />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchMetaStart: () => dispatch(fetchMetaStart()),
});

export default connect(null, mapDispatchToProps)(App);
