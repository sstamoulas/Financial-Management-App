import React from 'react';

import MobileViewItem from '../mobile-view-item/mobile-view-item.component';

import './mobile-view-editable.styles.scss';

const MobileViewSection = ({ index, options, updateHandler, addHandler, removeHandler }) => {
  let option = options[index];
  
  return (
    <>
      {
        option.hasOwnProperty('due') ? 
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
            usesButton={true} 
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
        isDate={true} 
      />
    </>
  )
};

export default MobileViewSection;
