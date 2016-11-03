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
      const notif = dbRef.on('child_added', snap => {
        if(firebaseUser.uid === snap.val().inviteeID) {
          temp.push({user: snap.val().inviterID, conversationID: snap.val().conversationID, id: snap.key});
          this.handleInvitations(temp);
        }
      })
      // dbRef.on('value', snap => {
      //   temp = [];
      //   const notifications = snap.val();
      //   console.log(notifications);
      //   console.log(firebaseUser);
      //   for(var key in notifications) {
      //     if(notifications[key].inviteeID === firebaseUser.uid) {
      //       temp.push({user: notifications[key].inviterID, conversationID: notifications[key].conversationID, id: snap.key})
      //       this.handleInvitations(temp);
      //     } else {
      //       console.log("Denied");
      //     }
      //   }
      // })

      dbRef.on('child_removed', snap => {
        const liToRemove = document.getElementById(snap.key);
        liToRemove.remove();
      })
    }.bind(this))

  },
  acceptNotification: function(e, privateChat) {
    const conversationID = e.target.id;
    privateChat = !privateChat;
    this.props.acceptNotification(privateChat, conversationID);
    this.removeNotification(e);
  },
  handleInvitations: function(invitations) {
    this.setState({invitations: invitations})
  },
  removeNotification: function(e) {
    e.preventDefault();
    var notificationRef = firebase.database().ref().child("notifications");
    var selectedInvitation = e.target.parentElement.parentElement.id;
    notificationRef.child(selectedInvitation).remove();
  },
  render: function () {
    var nodes = this.state.invitations.map(function(invite, i) {
      return (<li key={i} id={invite.id}>
        <p>You have a chat invitation from <strong> - {invite.user} - </strong></p>
        <p>You can either <a href="#" id={invite.conversationID} onClick={this.acceptNotification}>Accept</a> or <a href="" onClick={this.removeNotification}>Decline</a></p>
        </li>)
    }.bind(this))
    return (
      <div className="notifications">
        <h2>Notifications</h2>
        <p>You currently have no notifications</p>
        {nodes}
      </div>
    )
  }
});

export default Notifications;
