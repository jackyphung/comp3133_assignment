/*
ArtXperience Component
ModalHeader
*/
import React, { Component } from 'react';
import './ModalHeader.css';

class ModalHeader extends Component {
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
    const { id, className, children, style } = this.props;
    return (
      <div id={id} className={`modal-header${className ? ` ${className}` : ``}`} style={style ? style : null}>
        {children}
      </div>
    );
  }
}

export { ModalHeader };