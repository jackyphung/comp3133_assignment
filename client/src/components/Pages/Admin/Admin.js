import React, { Component } from 'react'
import { ContentBody, ContentArea, ContentBlock } from 'Layout';
import { Tab, Tabs, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
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
    addRoom: false,
    editRoom: false,
    showModal: false,
    activeTab: 0
  }

  handleActiveTab = (event, value) => {
    this.setState({ activeTab: value })
  }

  getData = () => {
    axios.get()
  }

  showAddRoom = () => {
    this.setState({ addRoom: !this.state.addRoom})
  }

  showEditRoom = () => {
    this.setState({ editRoom: !this.state.editRoom})
  }
  render() {
    const { showModal, activeTab, addRoom, editRoom } = this.state;
    
    return (
      <div>
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
                  <TableRow>
                    <TableCell>Apr 17 5:04PM</TableCell>
                    <TableCell>User Connected</TableCell>
                    <TableCell>JaePun</TableCell>
                    <TableCell>JaePun connected to main room</TableCell>
                  </TableRow>
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
                  <TableRow>
                    <TableCell>Main Room</TableCell>
                    <TableCell>Apr 17 5:15PM</TableCell>
                    <TableCell>JaePun</TableCell>
                    <TableCell>Wtf bro</TableCell>
                  </TableRow>
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
                    <TableCell>Created Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Main Room</TableCell>
                    <TableCell>Apr 17 5:15PM</TableCell>
                    <TableCell>Alive</TableCell>
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
                </TableBody>
              </Table>
            </div>
          }
      </div>
    )
  }
}

export { Admin };