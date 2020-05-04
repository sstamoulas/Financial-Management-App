import React  from 'react';
import { connect } from 'react-redux';

import './mobile-view-uneditable.styles.scss';

const MobileViewUneditable = ({ label, due, paid, tableOptions, tabHandler }) => (
  <>
    <div className="mt-5">
      <div className="w-100">
        <label>Due:&nbsp;</label>
        <label>{due}</label>
      </div>
      <div className="w-100">
        <label>Paid:&nbsp;</label>
        <label>{paid}</label>
      </div>
      <div className="w-100">
        <label>Date:&nbsp;</label>
        <a href='/#' 
          onClick={() => 
            tabHandler((tableOptions.find(option => option.label === `${label} Expense`)).value)
          }
        >
          See Columns
        </a>
      </div>
    </div>
  </>
);

const mapStateToProps = (state) => ({
  tableOptions: state.root.tableOptions,
});

export default connect(mapStateToProps)(MobileViewUneditable);
