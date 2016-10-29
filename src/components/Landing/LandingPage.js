import React from 'react';
import * as firebase from 'firebase';

import Authentication from '../Authentication.js';

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
        <Authentication />
      </div>
    )
  }
});

export default LandingPage;
