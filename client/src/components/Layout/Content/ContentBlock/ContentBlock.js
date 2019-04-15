/*
ArtXperience Component
ContentBlock
*/
import React, { Component } from 'react'
import css from './ContentBlock.css'

class ContentBlock extends Component {
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
    const { id, className, style, size } = this.props;

    return (
      <div id={id} className={`${className ? `${className} ` : ''}content-block${size ? ` w-${size}` : ` w-10`}`} style={style ? style : null}>
        {this.props.children}
      </div>
    );
  }

}

export { ContentBlock }