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
    rowsPerPage: 25,
    rowsPerPageOptions: [10, 25, 50, 100],
    search: '',
    addRoom: false,
    showModal: false,
    activeTab: 0,
    newName: '',
    newStatus: 'active',
    roomEditIndex: null,
    updatedName: '',
    upsatedStatus: ''
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

  handleActiveTab = (event, value) => {
    this.setState({ activeTab: value, rowsPerPage: 25 });
  }

  getTabName = (tab = null) => {
    const { activeTab } = this.state;
    let tabNames = [
      "Event History",
      "Chat History",
      "Rooms"
    ]

    return tabNames[tab !== null ? tab : activeTab];
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

  showAddRoom = () => {
    this.setState({ addRoom: !this.state.addRoom })
  }

  showEditRoom = (e) => {
    let index, roomEditIndex;
    index = e.target.id ? e.target.id : this.state.roomEditIndex;
    roomEditIndex = this.state.roomEditIndex;
    const { rooms } = this.state;
    let updatedRooms = rooms;
    if (roomEditIndex && index !== roomEditIndex) {
      updatedRooms[roomEditIndex].edit = !updatedRooms[roomEditIndex].edit;
    }
    updatedRooms[index].edit = !updatedRooms[index].edit
    this.setState({ 
      rooms: updatedRooms, 
      updatedName: updatedRooms[index].name,
      updatedStatus: updatedRooms[index].status, 
      roomEditIndex: index == roomEditIndex ? null : index 
    });
  }

  handleNewName = (e) => {
    this.setState({ newName: e.target.value });
  }

  changePage = (e, page) => {
    const { activeTab } = this.state;
    let tabPage = this.state.tabPage;
    tabPage[activeTab] = page;
    this.setState({ tabPage: tabPage });
  }
  
  handleNewStatus = (e) => {
    this.setState({ newStatus: e.target.value })
  }

  handleUpdatedName = (e) => {
    this.setState({ updatedName: e.target.value });
  }

  handleUpdatedStatus = (e) => {
    this.setState({ updatedStatus: e.target.value })
  }

  deleteRoom = (e) => {
    let room = this.state.rooms[e.target.id].name
    axios.post(`${location.protocol}//${location.hostname}:${location.port}/api/history/delete`, { room })
    .then(res => { 
      console.log(res);
      this.getRooms();
    })
    .catch(err => {
      console.log(err);
    });
  }

  submitEditRoom = (e) => {

    let index = this.state.roomEditIndex;
    let currentRoom = this.state.rooms[index]

    let oldName = currentRoom.name
    let newName = this.state.updatedName.trim() ? this.state.updatedName : oldName
    let status = this.state.updatedStatus

    if (newName != oldName || status != currentRoom.status) {
      let room = {
        oldRoom: oldName, 
        room: newName, 
        status
      }
  
      axios.post(`${location.protocol}//${location.hostname}:${location.port}/api/history/update`, room)
        .then(res => { 
          console.log(res);
          this.getRooms();
        })
        .catch(err => {
          console.log(err);
        });
  
        this.setState({ updatedName: '',  updatedStatus: '' })
    }
  }

  submitAddRoom = () => {
    if (this.state.newName.trim()) {

      let room = {
        room: this.state.newName,
        status: this.state.newStatus
      }
  
      axios.post(`${location.protocol}//${location.hostname}:${location.port}/api/history/create`, room)
        .then(res => {
          console.log(res);
          this.getRooms();
        })
        .catch(err => {
          console.log(err);
        });
      this.setState({ newName: '' , newStatus: 'active', addRoom: false })
    }
  }

  changeRowsPerPage = (e) => {
    this.setState({ rowsPerPage: e.target.value });
  }

  handleSearchInput = (e) => {
    this.setState({ search: e.target.value });
  }

  getSearchResults = (arr) => {
    const { search } = this.state;
    if (search.length > 0)
      arr = arr.filter((item) => {
        const regex = new RegExp(search.trim(), 'i');
        if (search.trim() == "")
          return true;
        for (let key in item) {
          if (regex.test(item[key] instanceof Date ? item[key].toISOString() : item[key]))
            return true;
        }
        return false;
      });

    return arr;
  }

  render() {
    const { showModal, events, history, rooms, activeTab, search, addRoom, tabPage, rowsPerPage, rowsPerPageOptions } = this.state;

    return (
      <ContentArea id="admin-panel" footer={false}>
          <ContentBlock className="search-bar d-flex padding-15">
            <input className="w-grow"
              type="text" placeholder={`Search ${this.getTabName()}`} 
              value={search} onChange={this.handleSearchInput}
            />
          </ContentBlock>
          <ContentBlock className="tabs">
            <Tabs 
              variant="scrollable"
              scrollButton="on"
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleActiveTab}>
              <Tab label={this.getTabName(0)} />
              <Tab label={this.getTabName(1)} />
              <Tab label={this.getTabName(2)} />
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
                { events.length > 0 && 
                  this.getSearchResults(events)
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
                    count={this.getSearchResults(events).length}
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
                  { history.length > 0 &&
                    this.getSearchResults(history)
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
                    count={this.getSearchResults(history).length}
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
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Room</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell colSpan={2}>Messages</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { rooms.length > 0 &&
                    this.getSearchResults(rooms)
                      .slice(tabPage[activeTab] * rowsPerPage, (tabPage[activeTab] * rowsPerPage) + rowsPerPage)
                      .map((row, index) => (
                        row.edit ? 
                        <TableRow key={index}>
                          <TableCell>
                            <input id='editRoomName' type="text" placeholder="Room Name" 
                              value={this.state.updatedName} onChange={this.handleUpdatedName} />
                          </TableCell>
                          <TableCell>
                            <select value={this.state.updatedStatus} onChange={this.handleUpdatedStatus}>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </TableCell>
                          <TableCell>{row.messages}</TableCell>
                          <TableCell>
                            <button onClick={this.submitEditRoom}>Save</button>
                            <button onClick={this.showEditRoom}>Cancel</button> 
                          </TableCell>
                        </TableRow>
                      :
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.messages}</TableCell>
                        <TableCell>
                          <button id={index} onClick={this.showEditRoom}>Edit</button> 
                          <button id={index} onClick={this.deleteRoom}>Delete</button> 
                        </TableCell>
                      </TableRow>
                      ))
                  }
                  { this.state.addRoom &&
                      <TableRow>
                      <TableCell><input type="text" placeholder="Room Name" value={this.state.newName} onChange={this.handleNewName} /></TableCell>
                      <TableCell colSpan={2}>
                        <select value={this.state.newStatus} onChange={this.handleNewStatus}>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </TableCell>
                      <TableCell><button onClick={this.submitAddRoom}>Create</button></TableCell> 
                      </TableRow>
                  }
                </TableBody>
                <TableRow>
                  <TableCell colSpan={4}>
                    <button onClick={this.showAddRoom} style={{ borderRadius: "3px" }}>{ addRoom ? "Close" : "Add Room" }</button>
                  </TableCell>
                </TableRow>
                <TableFooter>
                  <TablePagination 
                    component={TableCell}
                    page={tabPage[activeTab]}
                    count={this.getSearchResults(rooms).length}
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