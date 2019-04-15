import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

class Link extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    
  }

  onClick = (e) => {
    if ((this.props.Url && location.pathname == this.props.Url) || 
        (location.pathname.includes(this.props.Url) && this.props.Url !== "/"))
      e.preventDefault();
  }

  render = () => {
    const { id, className, style, children, Url, PageName, onClick } = this.props;
    return (
      Url && Url.startsWith("/") ?
        <RouterLink id={id} className={className} style={style} to={Url} onClick={onClick ? onClick : this.onClick}>
          {
            children !== undefined ? 
              children 
            : PageName
          }
        </RouterLink>
      :
        <a id={id} className={className} style={style} href={Url} target={Url.startsWith("http") ? "_blank" : null} onClick={onClick ? onClick : this.onClick}>
          {
            children !== undefined ? 
              children 
            : PageName
          }
        </a>
    );
  }
}

export { Link };