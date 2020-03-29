import React, { Component } from 'react';

import CustomSelectItem from '../custom-select-item/custom-select-item.component';

import './custom-select.styles.scss';

class CustomSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedItem: props.selectedItem,
    };
  }
  
  componentDidMount() {
    document.addEventListener('click', this.checkForOutsideClick)
  }
  
  componentWillUnmount() {
    document.removeEventListener(this.checkForOutsideClick)
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
    let { identifier, options, handler, selectedItem } = this.props;
    let { isOpen } = this.state;

    return (
      <div className="container">
        <div className={`cool-select ${isOpen ? 'open' : ''}`}>
          <div className="input-wrap d-flex justify-content-center">
            <input 
              className={`input-control ${identifier}`} 
              placeholder={selectedItem.label} 
            />
          </div>
          <div className="dropdown-wrap">
            <div className="close"></div>
            <div className="dropdown-body">
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
