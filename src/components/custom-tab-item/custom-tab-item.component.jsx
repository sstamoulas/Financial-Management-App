import React from 'react';

import './custom-tab-item.styles.scss';

const CustomTabItem = ({ isActive, tabItem, handler }) => (
  <li className="nav-item">
    <a 
      className={`nav-link ${isActive ? 'active' : ''}`} 
      href="/#"
      onClick={() => handler(tabItem)}
    >
      {tabItem.label}
    </a>
  </li>
);

export default CustomTabItem;
