/*
ArtXperience Component
NavFooter
*/
import React, { Component } from 'react';
import { NavSection, NavLink } from 'Layout';
import './NavFooter.css';

class NavFooter extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    theme: this.props.theme ? this.props.theme : "light",
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

  componentDidMount() { }

  render() {
    const { id, className, style, children } = this.props;
    const { theme } = this.state;
    
    let classes = `${theme}${className ? ` ${className}` : ``}`; 
    return (
      <div id={id} className={`navfooter-body ${classes}`} style={style}>
        <hr className="separator"></hr>
        <div className="navfooter-inner">
          {children}
        </div>
        <hr className="separator"></hr>
      </div>
    );
  }
}

export { NavFooter };