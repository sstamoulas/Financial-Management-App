import React, { useState, useEffect } from 'react';

import CustomSelectItem from '../custom-select-item/custom-select-item.component';

import './custom-select.styles.scss';

const CustomSelect = ({size, identifier, options, handler, selectedItem}) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    function checkForOutsideClick(e) {
      if(e.target.className.includes(`${identifier}`)) {
        setOpen(!isOpen);
      }
      else {
        setOpen(false);
      }
    }

    document.addEventListener('click', checkForOutsideClick)
    return () => document.removeEventListener('click', checkForOutsideClick);
  }, [isOpen, identifier]);

  return (
    <div className='text-left'>
      <div className='container'>
        <div className={`cool-select ${isOpen ? 'open' : ''}`}>
          <div className={`input-wrap ${size} d-flex justify-content-center`}>
            <input
              type='text'
              id={`${identifier}`}
              className={`input-control ${identifier} ${size}`}
              onChange={() => console.log('changed')}
              value={selectedItem.label}
            />
            <label className='visuallyhidden' htmlFor={`${identifier}`}>Choose {identifier}</label>
          </div>
          <div className={`dropdown-wrap ${size}`}>
            <div className={`dropdown-body ${size}`}>
              <nav className='select-nav'>
                {
                  options.map((option, index) => (
                    <CustomSelectItem
                      key={`${identifier}-${index}`}
                      option={option}
                      handler={handler}
                    />
                  ))
                }
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomSelect;
