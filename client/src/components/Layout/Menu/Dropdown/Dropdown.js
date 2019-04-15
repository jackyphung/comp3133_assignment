import React, { Component } from 'react';
import './Dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  createOptions(items) {
    // do something
  }

  render() {
    const { items } = this.props;
    return (
      <select>
        {this.createOptions(items)}
      </select>
    );
  }
}