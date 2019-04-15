/*
ArtXperience Component
FormGroup
*/
import React, { Component } from 'react';
import classNames from 'classnames';
import './FormGroup.css';

class FormGroup extends Component {
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

  modifyChildren = (child) => {
    const className = classNames(
      child.props.className,
      child.type === "label" ? "select-label" : null
    );

    const props = {
      className
    };

    return React.cloneElement(child, props);
  }

  render() {
    const { id, className, children, style } = this.props;
    let hasSelect = false;
    for (let child of children) {
      if (child.type === "select")
        hasSelect = true;
    }
    return (
      <div id={id} className={`form-group${className ? ` ${className}` : ``}`} style={style ? style : null}>
        {hasSelect ? React.Children.map(children, child => this.modifyChildren(child)) : children}
      </div>
    );
  }
}

export { FormGroup };