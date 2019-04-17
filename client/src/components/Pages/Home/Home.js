/*
Component
HomeFeed
*/
import React, { Component } from 'react';
import { ContentBody, ContentArea, ContentBlock } from 'Layout';
import { FooterContent, RoomsList } from 'Sections';
import { socket } from 'services/socket-io'
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
		showModal: false
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

	toggleModal = (e) => {
		const { showModal } = this.state;
		this.setState({ showModal: !showModal }, () => {
			console.log('Rooms List Toggle');
		});
	}

	render() {
		const { location } = this.props;
		const { showModal } = this.state;

		return (
			<React.Fragment>
				<ContentArea footer={false}>
					<ContentBlock>
						<h1>Super Chat</h1>
						<section className="options">
							<div className="left">
								<div id="change_username">
									<input id="username" type="text" placeholder="Username"/>
									<button id="send_username" type="button">Set Username</button>
								</div>
							</div>
							<div className="right">
								<button id="change_room" className="button-option" type="button" onClick={this.toggleModal}>Room List</button>
								<button id="leave_room" className="button-option" type="button">Leave Room</button>
							</div>
						</section>
					</ContentBlock>
					<ContentBlock id="chatroom">
						<section id="typing-feedback"></section>
						<section id="connect-feedback"></section>
					</ContentBlock>
					<ContentBlock className="chat_input">
						<input id="message" className="vertical-align" type="text"/>
						<button id="send_message" className="vertical-align" type="button">Send</button>
					</ContentBlock>
				</ContentArea>
				<RoomsList show={showModal} toggle={this.toggleModal} fade/>
			</React.Fragment>
		);
	}

}

export { Home };