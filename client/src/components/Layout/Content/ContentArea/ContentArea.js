/*
ArtXperience Component
ContentArea
*/
import React, { Component } from 'react'
import { NavFooter } from 'Layout';
import css from './ContentArea.css'

class ContentArea extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    footer: this.props.footer !== undefined ? this.props.footer : true,
  };

  componentDidMount() { }

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = {};
    for (let key in nextProps) {
      if (prevState.hasOwnProperty(key)) {
        if (nextProps[key] !== prevState[key])
          state[key] = nextProps[key];
      }
    }

    return state;
  }

  render() {
    const { children, className, FooterContent, style } = this.props;
    const { footer } = this.state;
    
    return (
    <div className={`content-area${className ? ` ${className}` : ``}`} style={style ? style : null}>
      {children}
      {footer &&
        <NavFooter>
          {FooterContent}
        </NavFooter>    
      }
    </div>
    );
  }
}

export { ContentArea }