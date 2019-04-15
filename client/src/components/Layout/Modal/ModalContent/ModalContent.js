/*
ArtXperience Component
ModalContent
*/
import React, { Component } from 'react';
import './ModalContent.css';

class ModalContent extends Component {
  constructor(props) {
    super(props);
  }

  state = { }

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
    const { id, className, children, style, onClick } = this.props;
    return (
      <div id={id} className={`modal-content${className ? ` ${className}` : ``}`} style={style ? style : null} onClick={onClick}>
        {children}
      </div>
    );
  }
}

export { ModalContent };