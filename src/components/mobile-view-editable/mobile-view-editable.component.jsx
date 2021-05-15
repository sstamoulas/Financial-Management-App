import React from 'react';

import MobileViewItem from '../mobile-view-item/mobile-view-item.component';

import './mobile-view-editable.styles.scss';

const MobileViewSection = ({ option, updateHandler, addHandler, removeHandler }) => (
  <>
    {
      option && option.hasOwnProperty('due') ? 
        <MobileViewItem 
          option={option} 
          label='Due' 
          updateHandler={updateHandler} 
        />
      :
        <MobileViewItem 
          option={option} 
          label='Label'
          updateHandler={updateHandler} 
          addHandler={addHandler} 
          usesButton 
        />
    }
    <MobileViewItem 
      option={option} 
      label='Paid' 
      updateHandler={updateHandler} 
    />
    <MobileViewItem 
      option={option} 
      label='Date' 
      updateHandler={updateHandler} 
      removeHandler={removeHandler}
      isDate 
    />
  </>
);

export default MobileViewSection;
