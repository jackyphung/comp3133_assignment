import React, { Component } from 'react'
import { ContentBody, ContentArea, ContentBlock } from 'Layout';
import { Tab, Tabs } from '@material-ui/core'
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
    showModal: false,
    activeTab: 0
  }

  handleActiveTab = (event, value) => {
    this.setState({ activeTab: value })
  }

  getData = () => {
    axios.get()
  }

  render() {
    const { showModal, activeTab } = this.state;
    
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
            <p></p>
          </div>
          }
          { activeTab === 1 &&
            <div>
            <p>Test info for chat history</p>
          </div>
          }
          { activeTab === 2 &&
            <div>
            <p>Test info for rooms</p>
          </div>
          }
      </div>
    )
  }
}

export { Admin };