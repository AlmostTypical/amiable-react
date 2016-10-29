import React from 'react';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

const NavBar = React.createClass({
  logoutUser: function() {
    firebase.auth().signOut();
    const user = firebase.auth().currentUser;
    const userRef = firebase.database().ref().child('users');
    userRef.child(user.uid).update({
      'isOnline': false
    })
    browserHistory.push('/');
  },
  render: function () {
    return (
      <div className="navbar navbar-default">
        <div className="navbar-logo">
          <h1 className="logo">Amiable</h1>
        </div>
        <div className="navbar-userInfo">
          <p>{this.props.user}</p>
          <button className="btn btn-logout" onClick={this.logoutUser}>Logout</button>
        </div>
      </div>
    )
  }
});

export default NavBar;
