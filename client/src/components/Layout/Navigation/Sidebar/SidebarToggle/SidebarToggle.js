import React, { Component } from 'react';
import './SidebarToggle.css';

class SidebarToggle extends Component {
  constructor(props) {
    super(props);
  }

  state = { }

  componentDidMount() {

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = { };
    for (let key in nextProps) {
      if (prevState.hasOwnProperty(key)) {
        if (nextProps[key] !== prevState[key])
          state[key] = nextProps[key];
      }
    }

    return state;
  }

  render() {
    const { id, className, style, children } = this.props;

    return (
      <button id={id} className={className ? className : ``} style={style}>
        {children}
      </button>
    );
  }
}