import React from 'react';
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
  selectUser: function(e) {
    const selectedUser = e.target.id;
    const user = this.state.users.filter(user => {
      return user.uid === selectedUser;
    })
    this.props.selectUser(user[0]);
  },
  render: function () {
    var userNodes = [];
    var that = this;
    userNodes = this.state.users.map(function(user, index) {
      if(user.isOnline) {
        return <li className="online user" key={index} onClick={this.selectUser} id={user.uid}>{user.username}</li>
      } else {
        return <li className="offline" key={index} id={user.uid}>{user.username}</li>
      }
    }.bind(this));
    return (
      <div className="availability-panel">
        <h2>List of Users</h2>
        <ul className="users-list">
          {userNodes}
        </ul>
      </div>
    )
  }
});

export default AvailabilityPanel;
