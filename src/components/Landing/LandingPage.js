import React from 'react';
import * as firebase from 'firebase';

import SignIn from '../SignIn.js';

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
        <p>Some PR text of somesort here</p>
        <SignIn />
      </div>
    )
  }
});

export default LandingPage;
