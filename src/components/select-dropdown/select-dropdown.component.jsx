import React, { Component } from 'react';

import SelectDropdownItem from '../select-dropdown-item/select-dropdown-item.component';

import './select-dropdown.styles.scss';

class SelectDropdown extends Component {
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
          <div className="input-wrap preview-autocomplete d-flex justify-content-center">
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
                    <SelectDropdownItem key={option.value} option={option} handler={handler} />
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

export default SelectDropdown;
