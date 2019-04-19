/*
Component
HomeFeed
*/
import React, { Component } from 'react';
import { ContentBody, ContentArea, ContentBlock } from 'Layout';
import { FooterContent, ChatRoom, RoomsList } from 'Sections';
import { socket } from 'services/socket-io'
import './Chat.css';

class Chat extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ChatView {...this.props} />
		)
	}
}

class ChatView extends Component {
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
		const { username, showRoomList, toggleRoomList } = this.props;
		const { showModal } = this.state;

		return (
			<React.Fragment>
				<ContentArea footer={false}>
					<ContentBlock className="chat-header">
						<h1>Super Chat</h1>
						<section className="options">
							<div className="right">
								<button className="leave-room" type="button">Leave Room</button>
							</div>
						</section>
					</ContentBlock>
					<ChatRoom username={username}/>
				</ContentArea>
				<RoomsList show={showRoomList || showModal} toggle={toggleRoomList || this.toggleModal} fade/>
			</React.Fragment>
		);
	}

}

export { Chat };