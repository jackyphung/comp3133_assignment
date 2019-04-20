/*
Component
HomeFeed
*/
import React, { Component } from 'react';
import { ContentBody, ContentArea, ContentBlock } from 'Layout';
import { FooterContent, ChatHeader, ChatRoom, RoomsList } from 'Sections';
import './Chat.css';

import { socket } from 'services/socket-io';

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

		this.socket = socket;
	}

	state = {
		showModal: false,
		currentRoom: null,
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

	/* This is the function used for joining & changing rooms  */
	changeRoom = (e) => {
		const { currentRoom } = this.state;
		if (e.target.id !== currentRoom) {
			this.setState({ currentRoom: e.target.id }, () => {
				this.socket.emit('join_room', { room: this.state.currentRoom });
				this.props.toggleRoomList();
			});
		}
	}

	leaveRoom = () => {
		this.setState((prevState) => {
				const { username } = this.props;
				const { currentRoom } = prevState;
				console.log(`${username} has left #${currentRoom}`);
				socket.emit('leave_room', { room: currentRoom });
				return { currentRoom: null }
			}, () => {
		});
	}

	render() {
		const { username, showRoomList, toggleRoomList } = this.props;
		const { showModal, currentRoom } = this.state;

		return (
			<React.Fragment>
				<ContentArea footer={false} style={{ overflowY: "hidden" }}>
					<ChatHeader room={currentRoom} toggleRoomList={toggleRoomList} leaveRoom={this.leaveRoom} />
					<ChatRoom room={currentRoom} username={username}/>
				</ContentArea>
				<RoomsList fade
					show={showRoomList || showModal} 
					toggle={toggleRoomList || this.toggleModal} 
					changeRoom={this.changeRoom}
				/>
			</React.Fragment>
		);
	}

}

export { Chat };