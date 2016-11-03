import React from 'react';
import * as firebase from 'firebase';
// import { browserHistory } from 'react-router';

import NavBar from '../NavBar';
import UserInfoPanel from './UserInfo/UserInfoPanel';
import EventsPanel from './EventsPanel';
import Notifications from './Notifications';
import AvailabilityPanel from './AvailabilityPanel';
// import TimeSlotPanel from './TimeSlotsPanel';
// import ChatHistory from './ChatHistory';
import GeneralChat from './GeneralChat';
import ChatWindow from '../ChatWindow';


const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      currentUser: '',
      privateChat: false
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
    console.log(this.state.privateChat);
  },
  handleUser: function(user) {
    this.setState({
      currentUserEmail: user.email,
      currentUser: user.displayName,
      currentUserUID: user.uid
    });
  },
  selectUser: function(user) {
    const dbRef = firebase.database().ref();
    dbRef.child("conversations").push({userOneID: this.state.currentUserUID, userTwoID: user.uid, createdAt: new Date().getTime()})
      .then(snap => {
        this.setState({conversationID: snap.key, userTwo: user.uid})
        console.log(snap.key);
        dbRef.child("notifications").push({inviterID: this.state.currentUserUID, inviteeID: user.uid, createdAt: new Date().getTime(), accepted: false, conversationID: snap.key})
      })
    this.setState({privateChat: true})
    console.log(this.state.privateChat);
  },
  closePrivateChat: function(privateChat, conversationID) {
    this.setState({privateChat: privateChat, conversationID: conversationID});
  },
  acceptNotification: function(privateChat, conversationID) {
    this.setState({privateChat: privateChat, conversationID: conversationID});
  },
  render: function () {
    if(this.state.privateChat === true) {
      return (
        <div className="dashboard-container container-fluid">
          <NavBar user={this.state.currentUser}/>
            <div className="row">
              <div className="col-md-2 main-sidebar">
                <AvailabilityPanel currentUserUID={this.state.currentUserUID} selectUser={this.selectUser} currentUserName={this.state.currentUser}/>
                <Notifications />
            </div>
              <div className="col-md-10 messages-display">
                <ChatWindow closePrivateChat={this.closePrivateChat} conversationID={this.state.conversationID} user={this.state.currentUserUID} userTwo={this.state.userTwo}/>
              </div>
            </div>
        </div>
      )
    } else {
        return (
          <div className="dashboard-container container-fluid">
            <NavBar user={this.state.currentUser}/>
              <div className="row">
                <div className="col-md-2 main-sidebar">
                  <AvailabilityPanel currentUserUID={this.state.currentUserUID} selectUser={this.selectUser} currentUserName={this.state.currentUser}/>
                  <Notifications acceptNotification={this.acceptNotification}/>
              </div>
                <div className="col-md-10 messages-display">
                  <GeneralChat />
                </div>
              </div>
          </div>
        )
      }
  }
});

export default Dashboard;
