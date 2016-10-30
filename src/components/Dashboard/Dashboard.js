import React from 'react';
import * as firebase from 'firebase';

import NavBar from '../NavBar';
import UserInfoPanel from './UserInfo/UserInfoPanel';
import EventsPanel from './EventsPanel';
import AvailabilityPanel from './AvailabilityPanel';
import TimeSlotPanel from './TimeSlotsPanel';
import ChatHistory from './ChatHistory';
import GeneralChat from './GeneralChat';

const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      currentUser: ''
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
    this.setState({currentUser: user.email});
  },
  render: function () {
    return (
      <div className="dashboard-container">
        <NavBar user={this.state.currentUser}/>
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
              <AvailabilityPanel />
            </div>
          </div>

        </div>

      </div>
    )
  }
});

export default Dashboard;
