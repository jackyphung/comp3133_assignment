/*
ArtXperience Component
NotFound
*/
import React, { Component } from 'react';
import { ContentArea, Link } from 'Layout';
import './NotFound.css';

class NotFound extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
    let page = "Page Not Found";
    if (document.title.includes(" | ")) {
      let title = document.title.split(" | ");
      title[title.length - 1] = page;
      document.title = title.join(" | ");
    } else {
      document.title = `${document.title} | ${page}`;
    }
	}

	render() {
		return (
			<ContentArea footer={false}>
        <div className="center-absolute">
          <h1>The page you are accessing is not found.</h1>
          <h2><Link Url="/">Return to the homepage</Link></h2>
        </div>
      </ContentArea>
		);
	}

}

export { NotFound }