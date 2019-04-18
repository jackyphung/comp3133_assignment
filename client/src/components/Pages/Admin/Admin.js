import React, { Component } from 'react'
import { ContentBody, ContentArea, ContentBlock } from 'Layout';
import { Tab, Tabs, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TableFooter, Paper, IconButton } from '@material-ui/core'
import { FirstPageIcon, KeyboardArrowLeft, KeyboardArrowRight, LastPageIcon } from '@material-ui/icons'
import axios from 'axios'

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AdminView {...this.props} />
      </div>
    )
  }
}

class AdminView extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    events: [],
    history: [],
    rooms: [],
    addRoom: false,
    editRoom: false,
    showModal: false,
    activeTab: 0
  }

  getEvents = () => {
    axios.get(`${location.protocol}//${location.hostname}:${location.port}/api/events`)
      .then(res => this.setState({events: res.data}))
  }

  getHistory = () => {
    axios.get(`${location.protocol}//${location.hostname}:${location.port}/api/history`)
      .then(res => {
        let roomlog = []

        res.data.map(record => {
          record.chat_history.map(msg => {
            roomlog.push({
              room: record.room,
              time: msg.time,
              username: msg.username,
              message: msg.message
            })
          })
        })

        this.setState({history: roomlog})
      })
  }

  getRooms = () => {
    axios.get(`${location.protocol}//${location.hostname}:${location.port}/api/history`)
      .then(res => {   
        let roomlist = []

        res.data.map(row => {
        roomlist.push({
          name: row.room,
          status: row.status,
          messages: row.chat_history.length
        })

        this.setState({
          rooms: roomlist
        })
      })
    })
  }

  handleActiveTab = (event, value) => {
    this.setState({ activeTab: value })
  }

  componentDidMount() {
    this.getEvents()
    this.getHistory()
    this.getRooms()
  }

  showAddRoom = () => {
    this.setState({ addRoom: !this.state.addRoom})
  }

  render() {
    const { showModal, activeTab, addRoom, editRoom } = this.state;
    
    return (
      <ContentArea footer={false}> {/* the first couple of rows are still grey but can be fixed later */}
          <Tabs 
            variant="scrollable"
            scrollButton="on"
            value={activeTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleActiveTab}>
            <Tab label="Event History" />
            <Tab label="Chat History" />
            <Tab label="Rooms" />
          </Tabs>
          { activeTab === 0 &&
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date/Time Occured</TableCell>
                    <TableCell>Event</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { this.state.events.length &&    
                  this.state.events.map(row => 
                        <TableRow>
                          <TableCell>{row.date_occurred}</TableCell>
                          <TableCell>{row.event}</TableCell>
                          <TableCell>{row.user}</TableCell>
                          <TableCell>{row.message}</TableCell>
                        </TableRow>
                  )  /*maybe turn into a ternary to display an error if this.state.events doesnt exist*/ 
                } 
                </TableBody>
              </Table>
            </div>
          }
          { activeTab === 1 &&
            <div>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Room</TableCell>
                    <TableCell>Date/Time</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { this.state.history.length &&
                    this.state.history.map(row => 
                      <TableRow>
                        <TableCell>{row.room}</TableCell>
                        <TableCell>{row.time}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.message}</TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
          </div>
          }
          { activeTab === 2 &&
            <div>
              <button onClick={this.showAddRoom}>{ addRoom ? "Close" : "Add Room" }</button>
              { addRoom && 
                <div>
                  <input type="text" placeholder="Room Name"></input>
                  <button>Add</button>
                </div>
              }
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Room</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Messages</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.state.rooms.length &&
                    this.state.rooms.map(row => 
                      <TableRow>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.messages}</TableCell>
                        <TableCell>
                          <button onClick={this.showEditRoom}>{ editRoom ? "Close" : "Edit Room" }</button> 
                          { editRoom && 
                            <div>
                              <input type="text" placeholder="Room Name"></input>
                              <br/>
                              Status: <select>
                                      <option value="active">Active</option>
                                      <option value="inactive">Inactive</option>
                                      </select>
                              <br/>
                              <button>Edit</button>
                            </div> 
                          }
                        </TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </div>
          }
      </ContentArea>
    )
  }
}

export { Admin };