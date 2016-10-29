import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDi2YNN4-a0cvWM9oLvOmsQMFoZtQelVVs",
  authDomain: "amiable-90d76.firebaseapp.com",
  databaseURL: "https://amiable-90d76.firebaseio.com",
  storageBucket: "amiable-90d76.appspot.com",
  messagingSenderId: "201429292"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('app'));
