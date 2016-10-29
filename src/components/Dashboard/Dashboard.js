import React from 'react';
import * as firebase from 'firebase';

import NavBar from '../NavBar';
import UserInfoPanel from './UserInfo/UserInfoPanel';
import EventsPanel from './EventsPanel';
import AvailabilityPanel from './AvailabilityPanel';
import TimeSlotPanel from './TimeSlotsPanel';
import ChatHistory from './ChatHistory';

const Dashboard = React.createClass({
  getInitialState: function() {

    return {
      currentUser: ''
    }

  },
  componentDidMount: function() {
    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      this.handleUser(firebaseUser);
    }.bind(this))

  },
  handleUser: function(user) {
    this.setState({currentUser: user.email});
  },
  render: function () {
    return (
      <div className="container-dash">
        <NavBar />
        <UserInfoPanel />
        <EventsPanel />
        <AvailabilityPanel />
        <TimeSlotPanel />
        <ChatHistory />
        <div>{this.state.currentUser}</div>
      </div>
    )
  }
});

export default Dashboard;
