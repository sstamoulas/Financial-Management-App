import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: props.isVisible,
    };
  }
  
  componentDidMount() {
    document.addEventListener('click', this.checkForOutsideClick)
  }
  
  componentWillUnmount() {
    document.removeEventListener('click', this.checkForOutsideClick)
  }

  checkForOutsideClick = (e) => {
    console.log(e.target.className);
    console.log(e.target.className == 'modal fade show')
    if(e.target.className === 'modal fade show') {
      this.toggleModal(false);
    }
    else {
      // this.toggleModal(!this.state.isVisible);
    }
  }

  toggleModal = (isVisible) => {
    this.setState({
      isVisible,
    }, console.log(this.state.isVisible));
  }

  render() {
    return (
      <div className="modal fade show" style={{ display: this.state.isVisible ? 'block' : 'none' }} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New message</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                  <input type="text" className="form-control" id="recipient-name" />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">Message:</label>
                  <textarea className="form-control" id="message-text"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Send message</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Modal;
