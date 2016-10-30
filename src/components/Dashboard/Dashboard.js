import React from 'react';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

import NavBar from '../NavBar';
import UserInfoPanel from './UserInfo/UserInfoPanel';
import EventsPanel from './EventsPanel';
import AvailabilityPanel from './AvailabilityPanel';
import TimeSlotPanel from './TimeSlotsPanel';
import ChatHistory from './ChatHistory';
import GeneralChat from './GeneralChat';
import ChatWindow from '../ChatWindow';

const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      currentUsername: ''
    }
  },
  componentDidMount: function() {
    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      this.handleUser(firebaseUser);
      const userRef = firebase.database().ref().child('users');
      userRef.child(firebaseUser.uid).update({
        'isOnline': true
      })
    }.bind(this))

  },
  handleUser: function(user) {
    this.setState({
      currentUserEmail: user.email
    });
  },
  selectUser: function (data) {
    var conversationsRef = firebase.database().ref().child('conversations');
    conversationsRef.push({
      user1: this.state.currentUserEmail,
      user2: data.selectedUser,
      createdAt: new Date().getTime()
    });
    console.log(data.selectedUser);
    return <ChatWindow
      user1={this.state.currentUsername}
      user2={data.selectedUser}
    />
  },
  render: function () {
    return (
      <div className="dashboard-container">
        <NavBar user={this.state.currentUserEmail}/>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <UserInfoPanel />
              <EventsPanel />
            </div>
            <div className="col-md-4">
              <TimeSlotPanel />
              <ChatHistory />
              <GeneralChat />
            </div>
            <div className="col-md-4">
              <AvailabilityPanel selectUser={this.selectUser}/>
            </div>
          </div>

        </div>

      </div>
    )
  }
});

export default Dashboard;
