import React from 'react';
import SignIn from '../SignIn.js';
import SignUp from '../SignUp.js';
import * as firebase from 'firebase';

const LandingPage = React.createClass({

  getUsers: function() {
    const dbRef = firebase.database().ref().child('users');
    dbRef.on('value', function(snap) {
      console.log(snap.val());
    })
  },
  render: function () {
    return (
      <div className="landing-page">
        <h1>Amiable</h1>
        <SignIn />
      </div>
    )
  }
});

export default LandingPage;
