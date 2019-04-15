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

  state = {}

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
    return (
      <div className="content-body" style={style ? style : null}>
        {this.props.children}
      </div>
    );
  }
}

export { ContentBody }