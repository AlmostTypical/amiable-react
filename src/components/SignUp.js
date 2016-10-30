import React from 'react';
import { browserHistory } from 'react-router';
import * as firebase from 'firebase';

const SignUp = React.createClass({
  signUpUser: function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const location = document.getElementById('location').value;
    const about = document.getElementById('about').value;
    const chatter = document.getElementById('chatter').checked;

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.then(function(user) {
        user.updateProfile({
          displayName: username
        });
        var usersRef = firebase.database().ref().child('users');
        usersRef.child(user.uid).set({
          email: email,
          rating: 0,
          isOnline: true,
          isChatter: chatter,
          name: name,
          username: username,
          location: location,
          about: about
        })
      })
      promise.catch(function(err) {
        console.log(err.message);
      })



  browserHistory.push('/dashboard');

  },
  render: function () {
    return (
      <div className="sign-up-container">
        <h1>Amiable</h1>
          <p>
            <input type="email" id="email" name="email" placeholder="Enter your email" autoComplete="off"></input>
          </p>
          <p>
            <input type="password" id="password" name="password" placeholder="Enter your password" autoComplete="off"></input>
          </p>
          <p>
            <input type="text" id="name" name="name" placeholder="Enter your name" autoComplete="off"></input>
          </p>
          <p>
            <input type="text" id="username" name="username" placeholder="Enter your username" autoComplete="off"></input>
          </p>
          <p>
            <input type="text" id="location" name="location" placeholder="Enter your location" autoComplete="off"></input>
          </p>
          <p>
              <label><input type="checkbox" id="chatter" name="chatter" value="chatter_checkbox"></input>Are you a chatter ?</label>
          </p>
          <p>
            <textarea id="about" name="about" placeholder="Tell us a bit about you"></textarea>
          </p>
          <p>
            <button id="signUp" className="btn btn-signUp" onClick={this.signUpUser}>Sign Up</button>
          </p>
      </div>
    )
  }
});

export default SignUp;
