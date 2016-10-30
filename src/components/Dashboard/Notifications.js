import React from 'react';
import * as firebase from 'firebase';

const Notifications = React.createClass({
  componentDidMount: function() {
    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      const notifRef = firebase.database().ref().child('notifications');
      notifRef.on('value', function(snap) {
        if(firebaseUser.displayName === snap.val().username) {
          console.log("WOOOOOOGHDOHGDSHGSD")
        } else {
          console.log("I don't know anymore")
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
