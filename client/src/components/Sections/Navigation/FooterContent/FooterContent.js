import React, { Component } from 'react';
import { NavSection, NavLink } from 'Layout';

class FooterContent extends Component{
  state = { }

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
    return (
      <React.Fragment>
        <NavSection align="center">
          <NavLink Url="/" PageName="Home"/>
        </NavSection>
        <NavSection align="center">
          <span>&copy; JPhungJSyLucero - 2018-2019</span>
        </NavSection>
      </React.Fragment>
    );
  }
}

export { FooterContent };