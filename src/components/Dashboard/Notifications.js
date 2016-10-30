import React from 'react';
import * as firebase from 'firebase';

const Notifications = React.createClass({
  componentDidMount: function() {
    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      const dbRef = firebase.database().ref().child('notifications');
      dbRef.on('value', snap => {
        const notifications = snap.val();
        for(var key in notifications) {
          if(notifications[key].inviteeId === firebaseUser.displayName) {
            console.log('WOGSDGHDAGADS')
          } else {
            console.log('I\'m done, goodbye, farewell!');
          }
        }
      })
    })

  },
  render: function () {
    return (
      <div>
        <h2>Notifications</h2>
        <p>You currently have no notifications</p>
      </div>
    )
  }
});

export default Notifications;
