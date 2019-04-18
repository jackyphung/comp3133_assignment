import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'Layout';
import classnames from 'classnames';
import './RoomsList.css';

class RoomsList extends Component {
  constructor(props) {
    super(props);
  }

  state = {  

  }

  render() { 
    const { id, className, contentClassName, children, style, show, toggle, fade } = this.props;
    let classNames = classnames(
      className, fade ? "fade-in" : ``
    );

    return (  
      <Modal id={"rooms"} show={show} toggle={toggle}
        className={classNames} contentClassName={contentClassName}>
        <ModalHeader>
          <h2>Super Chat Room List</h2>
          <h4>Please select a room:</h4>
        </ModalHeader>
        <ModalBody className="d-flex">
          Usually there would be rooms here... but for now there isn't.
        </ModalBody>
      </Modal>
    );
  }
}
 
export { RoomsList };