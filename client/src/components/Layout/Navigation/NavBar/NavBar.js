/*
ArtXperience Component
NavBar
*/
import React, { Component } from 'react';
import { NavSection } from 'Layout';
import './NavBar.css';

class NavBar extends Component {
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
      <div id={id} className={`navbar-body ${classes}`} style={style}>
        <div className="navbar-inner">
          {children}
        </div>
      </div>
    );
  }
}

// NavBar.propTypes = {
//   children: function (props, propName, componentName) {
//     const prop = props[propName];

//     let error = null;
//     React.Children.forEach(prop, function (child) {
//       if (child.type !== NavSection) {
//         error = new Error('`' + componentName + '` children should be of type `NavSection`.');
//       }
//     })
//     return error;
//   }
// }

export { NavBar };