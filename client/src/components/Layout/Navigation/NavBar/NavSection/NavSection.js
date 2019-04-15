/*
ArtXperience Component
NavSection
*/
import React, { Component } from 'react';
import { NavLink } from 'Layout';
import css from './NavSection.css';

class NavSection extends Component {

	constructor(props) {
    super(props);
	}

	componentDidMount() { }

	render() {
    const { id, className, style, children, align } = this.props;
		return (
			<div className={`navbar-section ${align ? ` ${align}` : ``}${className ? ` ${className}` : ``}`}>
				{children}
			</div>
		);
  }
  
  static defaultProps = {
    align: "",
  }
}

// NavSection.propTypes = {
//   children: function (props, propName, componentName) {
//     const prop = props[propName];

//     let error = null;
//     React.Children.forEach(prop, function (child) {
//       if (child.type !== NavLink) {
//         error = new Error('`' + componentName + '` children should be of type `NavLink`.');
//       }
//     })
//     return error;
//   }
// };

export { NavSection };
