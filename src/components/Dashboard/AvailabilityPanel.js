import React from 'react';
import * as firebase from 'firebase';


const AvailabilityPanel = React.createClass({
  getInitialState: function() {
    return {
      users: [],
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
    var data = {};
    data.selectedUser = e.target.id;
    data.selectedUserData = this.state.users.filter(function (user) {
      return user.username === data.selectedUser;
    });
    this.props.selectUser(data);
  },
  render: function () {
    var userNodes = [];
    var that = this;
    userNodes = this.state.users.map(function(user, index) {
      if(user.isOnline) {
        return <li className="online" onClick={that.selectUser} key={index} id={user.username}>{user.username}</li>
      } else {
        return <li className="offline" onClick={that.selectUser} key={index} id={user.username}>{user.username}</li>
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
