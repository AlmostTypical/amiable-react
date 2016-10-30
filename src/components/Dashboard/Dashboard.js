import React from 'react';
import * as firebase from 'firebase';
// import { browserHistory } from 'react-router';

import NavBar from '../NavBar';
import UserInfoPanel from './UserInfo/UserInfoPanel';
import EventsPanel from './EventsPanel';
import AvailabilityPanel from './AvailabilityPanel';
// import TimeSlotPanel from './TimeSlotsPanel';
// import ChatHistory from './ChatHistory';
import GeneralChat from './GeneralChat';
import ChatWindow from '../ChatWindow';

const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      currentUsername: '',
      chatActive: false
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
      currentUserEmail: user.email,
      currentUser: user.displayName
    });
  },
  selectUser: function (data) {
    var conversationsRef = firebase.database().ref().child('conversations');
    conversationsRef.push({
      user1: this.state.currentUser,
      user2: data.selectedUser,
      createdAt: new Date().getTime()
    });
    var convoData = {
      user1: this.state.currentUser,
      user2: data.selectedUser
    };
    this.setState({
      chatActive: true,
      convoData: convoData
    });
    console.log(data.selectedUser);
    return <ChatWindow
      user1={this.state.currentUsername}
      user2={data.selectedUser}
    />
  },
  render: function () {
      if (this.state.chatActive) {
        return (
          <div className="dashboard-container">
            <NavBar user={this.state.currentUserEmail}/>
            <div className="container">
              <ChatWindow data={this.state.convoData} />
            </div>
          </div>
        )
      } else {
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
  }
});

export default Dashboard;
