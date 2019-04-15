/*
Component
HomeFeed
*/
import React, { Component } from 'react';
import { ContentArea, ContentBlock } from 'Layout';
import { FooterContent } from 'Sections';
import './Home.css';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<HomeView {...this.props} />
		)
	}
}

class HomeView extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		auth: this.props.auth ? this.props.auth : null
	}

	componentDidMount() {
    let page = "Chat";
    if (document.title.includes(" | ")) {
      let title = document.title.split(" | ");
      title[title.length - 1] = page;
      document.title = title.join(" | ");
    } else {
      document.title = `${document.title} | ${page}`;
    }
	}

	render() {
		const { location } = this.props;

		return (
			<ContentArea footer={false}>

			</ContentArea>
		);
	}

}

export { Home };