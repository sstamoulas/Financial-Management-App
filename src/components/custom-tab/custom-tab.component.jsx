import React from 'react';

import CustomTabItem from '../custom-tab-item/custom-tab-item.component';

import './custom-tab.styles.scss';

const CustomTab = ({ activeTab, tabItems, handler }) => (
  <ul className="nav nav-tabs nav-fill">
    {
      tabItems.map((tabItem, index) => {
        let isActiveItem = activeTab.value === index;
        return (
          <CustomTabItem 
            key={`nav-${index}`} 
            isActive={isActiveItem} 
            tabItem={tabItem} 
            handler={handler}
          />
        )
      })
    }
  </ul>
);

export default CustomTab;
