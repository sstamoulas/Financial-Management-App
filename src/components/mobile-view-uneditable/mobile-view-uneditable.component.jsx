import React  from 'react';

import MobileViewItem from '../mobile-view-item/mobile-view-item.component';

import './mobile-view-uneditable.styles.scss';

const MobileViewUneditable = ({ option, tabHandler, updateHandler }) => console.log(option) || (
  <>
    <div className="mt-5">
      <MobileViewItem 
        option={option} 
        label='Due' 
        updateHandler={updateHandler} 
      />
      <div className="w-100">
        <label>Paid:&nbsp;</label>
        <label>{option.paid}</label>
      </div>
      <div className="w-100">
        <label>Date:&nbsp;</label>
        <a href='/#' 
          onClick={() => tabHandler(option.value)}
        >
          See Columns
        </a>
      </div>
    </div>
  </>
);

export default MobileViewUneditable;
