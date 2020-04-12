import React, { Component } from 'react';

import CustomSelectItem from '../custom-select-item/custom-select-item.component';

import './custom-select.styles.scss';

class CustomSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }
  
  componentDidMount() {
    document.addEventListener('click', this.checkForOutsideClick)
  }
  
  componentWillUnmount() {
    document.removeEventListener('click', this.checkForOutsideClick)
  }

  checkForOutsideClick = (e) => {
    if(e.target.className.includes(`${this.props.identifier}`)) {
      this.toggleDropdown(!this.state.isOpen);
    }
    else {
      this.toggleDropdown(false);
    }
  }

  toggleDropdown = (isOpen) => {
    this.setState({
      isOpen,
    });
  }
  
  render() {
    let { size, identifier, options, handler, selectedItem } = this.props;
    let { isOpen } = this.state;

    return (
      <div className="container">
        <div className={`cool-select ${isOpen ? 'open' : ''}`}>
          <div className={`input-wrap ${size} d-flex justify-content-center`}>
            <input 
              type="text"
              id={`${identifier}`}
              className={`input-control ${identifier} ${size}`} 
              onChange={() => console.log('changed')}
              value={selectedItem.label}
            />
            <label htmlFor={`${identifier}`}></label>
          </div>
          <div className={`dropdown-wrap ${size}`}>
            <div className="close"></div>
            <div className={`dropdown-body ${size}`}>
              <nav className="select-nav">
                {
                  options.map((option) => (
                    <CustomSelectItem 
                      key={option.value} 
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
    );
  }
}

export default CustomSelect;
