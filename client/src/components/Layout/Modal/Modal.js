/*
ArtXperience Component
Modal
*/
import React, { Component } from 'react';
import { ModalContent } from 'Layout';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  state = { 
    show: this.props.show ? this.props.show : false,
    toggle: this.props.toggle ? this.props.toggle : null
  }

  componentDidMount() { }

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = { };
    if (prevState) {
      for (let key in nextProps) {
        if (prevState.hasOwnProperty(key)) {
          if (nextProps[key] !== prevState[key])
            state[key] = nextProps[key];
        }
      }
    }
    
    return state;
  }

  render() {
    const { id, className, children, style } = this.props;
    const { show, toggle } = this.state;
    
    return (
      <React.Fragment>
        {show &&
          <div id={id} onClick={toggle}
            className={`modal show${className ? ` ${className}` : ``}`} 
            style={style ? style : null}>
            <ModalContent onClick={(e) => { e.stopPropagation(); }}>
              {children}
            </ModalContent>
          </div>
        }
      </React.Fragment>
    );
  }
}

export { Modal };