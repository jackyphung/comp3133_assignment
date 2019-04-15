/*
ArtXperience Component
NavLink
*/
import React, { Component } from 'react';
import { Link } from 'Layout';
import css from './NavLink.css';

class NavLink extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {  }

  onClick = (e) => {
    if ((this.props.Url && location.pathname == this.props.Url) || 
        (location.pathname.includes(this.props.Url) && this.props.Url !== "/"))
      e.preventDefault();
  }

  render() {
    const { id, className, style, children, onClick, Logo, Url, PageName } = this.props;
    return (
      Url && Url.startsWith("/") ?
        <Link id={id} className={`nav-link${className ? ` ${className}` : ``}`} style={style} 
          Url={Url} onClick={onClick ? onClick : this.onClick}>
          <div className={`container${Logo ? " icon" : ""}`}>
            {
              Logo ? 
                <div className="icon"><img src={Logo}/></div>
              : null
            }
            <div className="page-name">{PageName}{children ? children : null}</div>
          </div>
        </Link>
      :
        <a id={id} className={`nav-link${className ? ` ${className}` : ``}`} 
          style={style} href={Url} target="_blank" 
          onClick={onClick ? onClick : this.onClick}>
          <div className={`container ${Logo ? "icon" : ""}`}>
            {
              Logo ? 
                <div className="icon"><img src={Logo}/></div>
              : null
            }
            <div className="page-name">{PageName}{children ? children : null}</div>
          </div>
        </a>
    );
  }
}

export { NavLink };