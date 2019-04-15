import React, { Components } from 'react';
import './Sidebar.css';

class Sidebar extends Components {
  constructor() {
    super();
  }

  state = { }

  compondentDidMount() { }

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
      <div id={id} className={`sidebar ${className ? ` ${className}` : ``}`} style={style}>
        {children}
      </div>
    );
  }
}

export { Sidebar };