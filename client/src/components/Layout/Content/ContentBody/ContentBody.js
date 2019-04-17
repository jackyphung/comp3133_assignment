/*
ArtXperience Component
ContentBody
*/
import React, { Component } from 'react'
import s from './ContentBody.css'

class ContentBody extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    nav: this.props.nav !== undefined ? this.props.nav : true,
  }

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
    const { style } = this.props;
    
    const { nav } = this.state;
    let bodyStyle = style ? style : {
      paddingTop: nav ? "0" : null
    };
    if (bodyStyle)
      bodyStyle.paddingTop = nav ? "0" : null

    return (
      <div className="content-body" style={bodyStyle ? bodyStyle : null}>
        {this.props.children}
      </div>
    );
  }
}

export { ContentBody }