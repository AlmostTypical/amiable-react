import React from 'react';

import { Link }from 'react-router';

import SignIn from '../SignIn.js';

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
        <p>Some PR text of somesort here</p>
        <SignIn />
      </div>
    )
  }
});

export default LandingPage;
