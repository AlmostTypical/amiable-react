import React from 'react';
import * as firebase from 'firebase';

const SignIn = React.createClass({

  signInUser: function(e) {
    e.preventDefault();
    const txtEmail = document.getElementById('email');
    const txtPass = document.getElementById('password');
    const email = txtEmail.value;
    const pass = txtPass.value;

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.then(function(user) {
        console.log(user);
      })

      promise.catch(function(e) {
        console.log(e.message);
      })
  },
  signUpUser: function(e) {
    e.preventDefault();
    const txtEmail = document.getElementById('email');
    const txtPass = document.getElementById('password');
    const email = txtEmail.value;
    const pass = txtPass.value;

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.then(function(user) {
        console.log(user);
      })

      promise.catch(function(e) {
        console.log(e.message);
      })
  },
  render: function () {
    return (
      <div className="sign-in-container">
          <p>
            <input type="email" id="email" name="email" placeholder="Enter your email" autoComplete="off"></input>
          </p>
          <p>
            <input type="password" id="password" name="password" placeholder="Enter your password" autoComplete="off"></input>
          </p>
          <p>
            <button id="signIn" className="btn btn-signIn" onClick={this.signInUser}>Sign In</button>
          </p>
          <p>
            <button id="signUp" className="btn btn-signUp" onClick={this.signUpUser}>Sign Up</button>
          </p>
      </div>
    )
  }
});

export default SignIn;
