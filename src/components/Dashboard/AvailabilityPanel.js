import React from 'react';
import _ from 'underscore';
import * as firebase from 'firebase';

const AvailabilityPanel = React.createClass({
  getInitialState: function() {
    return {
      users: []
    }
  },
  componentWillMount: function() {
    const usersRef = firebase.database().ref().child('users');
    var temp = [];
    usersRef.on('value', function(snap) {
      temp = [];
        const users = snap.val();
        for(var key in users) {
          temp.push(users[key])
        }
        this.handleUser(temp);
    }.bind(this))
  },
  handleUser: function(users) {
    this.setState({users: users})
  },
  render: function () {
    var userNodes = [];
    userNodes = this.state.users.map(function(user, index) {

      if(user.isOnline) {
        return <li className="online" key={index}>{user.username}</li>
      } else {
        return <li className="offline" key={index}>{user.username}</li>
      }

    });
    return (
      <div className="availability-panel">
        <h2>List of Users</h2>
        <ul >
          {userNodes}
        </ul>
      </div>
    )
  }
});

export default AvailabilityPanel;
