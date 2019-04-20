import React, { Component } from 'react'
import './Admin.css';
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
      <AdminView {...this.props} />
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
    tabPage: [0, 0, 0],
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 25, 50, 100],
    addRoom: false,
    showModal: false,
    activeTab: 0,
    newName: ''
  }

  componentDidMount() {
    this.getEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeTab !== prevState.activeTab) {
      const { activeTab } = this.state;
      if (activeTab === 0)
        this.getEvents();
      if (activeTab === 1)
        this.getHistory();
      if (activeTab === 2)
        this.getRooms();
    }
  }

  getEvents = () => {
    axios.get(`${location.protocol}//${location.hostname}:${location.port}/api/events`)
      .then(res => {
        let events = res.data;
        events = events.map(x =>  {
          x.date_occurred = new Date(x.date_occurred)
          return x;
        })
        this.setState({ events: events.sort((a, b) => b.date_occurred - a.date_occurred) });
      });
  }

  getHistory = () => {
    axios.get(`${location.protocol}//${location.hostname}:${location.port}/api/history`)
      .then(res => {
        let roomlog = []

        res.data.map(record => {
          record.chat_history.map(msg => {
            roomlog.push({
              room: record.room,
              time: new Date(msg.time),
              username: msg.username,
              message: msg.message
            })
          })
        });

        this.setState({ history: roomlog.sort((a, b) => b.time - a.time) })
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
            messages: row.chat_history.length,
            edit: false
          });

          this.setState({ rooms: roomlist });
        });
      });
  }

  handleActiveTab = (event, value) => {
    this.setState({ activeTab: value, rowsPerPage: 50 });
  }

  showAddRoom = () => {
    this.setState({ addRoom: !this.state.addRoom })
  }

  showEditRoom = (e) => {
    let index = e.target.id;
    console.log("attempted to make edit available...");
    const { rooms } = this.state;
    let updatedRooms = rooms;
    updatedRooms[index].edit = !updatedRooms[index].edit
    this.setState({ rooms: updatedRooms });
  }

  handleNameChange = (e) => {
    this.setState({ newName: e.target.value });
  }

  changePage = (e, page) => {
    const { activeTab } = this.state;
    let tabPage = this.state.tabPage;
    tabPage[activeTab] = page;
    this.setState({ tabPage: tabPage });
  }


  changeRowsPerPage = (e) => {
    this.setState({ rowsPerPage: e.target.value });
  }

  render() {
    const { showModal, activeTab, addRoom, tabPage, rowsPerPage, rowsPerPageOptions } = this.state;

    console.log(tabPage);
    console.log(activeTab);

    return (
      <ContentArea id="admin-panel" footer={false}>
          <ContentBlock>
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
          </ContentBlock>
          { activeTab === 0 && 
            <ContentBlock>
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
                { this.state.events.length > 0 && 
                  this.state.events
                    .slice(tabPage[activeTab] * rowsPerPage, (tabPage[activeTab] * rowsPerPage) + rowsPerPage)
                    .map(row => 
                      <TableRow>
                        <TableCell>{row.date_occurred.toISOString()}</TableCell>
                        <TableCell>{row.event}</TableCell>
                        <TableCell>{row.user}</TableCell>
                        <TableCell>{row.message}</TableCell>
                      </TableRow>
                    )
                } 
                </TableBody>
                <TableFooter>
                  <TablePagination 
                    component={TableCell}
                    count={this.state.events.length}
                    page={tabPage[activeTab]}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={rowsPerPageOptions}
                    onChangePage={this.changePage}
                    onChangeRowsPerPage={this.changeRowsPerPage}
                  />
                </TableFooter>
              </Table>
            </ContentBlock>
          }
          { activeTab === 1 && 
            <ContentBlock>
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
                  { this.state.history.length > 0 &&
                    this.state.history
                      .slice(tabPage[activeTab] * rowsPerPage, (tabPage[activeTab] * rowsPerPage) + rowsPerPage)
                      .map(row => 
                        <TableRow>
                          <TableCell>{row.room}</TableCell>
                          <TableCell>{row.time.toISOString()}</TableCell>
                          <TableCell>{row.username}</TableCell>
                          <TableCell>{row.message}</TableCell>
                        </TableRow>
                      )
                  }
                </TableBody>
                <TableFooter>
                  <TablePagination 
                    component={TableCell}
                    page={tabPage[activeTab]}
                    count={this.state.history.length}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={rowsPerPageOptions}
                    onChangePage={this.changePage}
                    onChangeRowsPerPage={this.changeRowsPerPage}
                  />
                </TableFooter>
              </Table>
          </ContentBlock>
          }
          { activeTab === 2 &&
            <ContentBlock>
              <button onClick={this.showAddRoom}>{ addRoom ? "Close" : "Add Room" }</button>
              { addRoom && 
                <ContentBlock>
                  <input type="text" placeholder="Room Name"></input>
                  <button>Add</button>
                </ContentBlock>
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
                    this.state.rooms.length > 0 &&
                    this.state.rooms
                      .slice(tabPage[activeTab] * rowsPerPage, (tabPage[activeTab] * rowsPerPage) + rowsPerPage)
                      .map((row, index) => (
                        <TableRow>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>{row.messages}</TableCell>
                          <TableCell>
                            <button id={index} onClick={this.showEditRoom}>{ row.edit ? "Close" : "Edit Room" }</button> 
                            { row.edit && 
                              <React.Fragment>
                                <input type="text" placeholder="Room Name" value={this.state.newName} onChange={this.handleNameChange} id='roomName'></input>
                                <br/>
                                Status: <select value={row.status} id='roomStatus'>
                                          <option value="active">Active</option>
                                          <option value="inactive">Inactive</option>
                                        </select>
                                <br/>
                                <button >Edit</button>
                              </React.Fragment> 
                            }
                          </TableCell>
                        </TableRow>
                      ))
                  }
                </TableBody>
                <TableFooter>
                  <TablePagination 
                    component={TableCell}
                    page={tabPage[activeTab]}
                    count={this.state.rooms.length}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={rowsPerPageOptions}
                    onChangePage={this.changePage}
                    onChangeRowsPerPage={this.changeRowsPerPage}
                  />
                </TableFooter>
              </Table>
            </ContentBlock>
          }
      </ContentArea>
    )
  }
}

export { Admin };