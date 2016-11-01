import React from 'react';
import * as firebase from 'firebase';

const Notifications = React.createClass({
  getInitialState: function() {
    return {
      invitations: []
    }
  },
  componentDidMount: function() {
    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      const dbRef = firebase.database().ref().child('notifications');
      var temp = [];
      dbRef.on('value', snap => {
        temp = [];
        const notifications = snap.val();
        for(var key in notifications) {
          if(notifications[key].inviteeId === firebaseUser.displayName) {
            temp.push({user: notifications[key].inviterId})
            this.setState({invitations: temp})
          } else {
            console.log('I\'m done, goodbye, farewell!');
          }
        }
      })
      this.handleInvitations(temp);
    }.bind(this))

  },
  handleInvitations: function(invitations) {
    this.setState({invitations: invitations})
  },
  removeNotification: function(e) {
    e.preventDefault();
    var notificationRef = firebase.database().ref().child("notifications");
    var selectedInvitation = e.target.parentElement.parentElement;
    notificationRef.on('child_removed', snap => {
      console.log(snap.val());
    })
  },
  render: function () {
    var nodes = this.state.invitations.map(function(invite, i) {
      return (<li key={i} id={i}>
        <p>You have a chat invitation from <strong> - {invite.user} - </strong></p>
        <p>You can either <a href="#">Accept</a> or <a href="" onClick={this.removeNotification}>Decline</a></p>
        </li>)
    }.bind(this))
    return (
      <div>
        <h2>Notifications</h2>
        <p>You currently have no notifications</p>
        {nodes}
      </div>
    )
  }
});

export default Notifications;
