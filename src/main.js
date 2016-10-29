import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './App';
import Dashboard from './components/Dashboard/Dashboard';
import NoMatch from './components/NoMatch';
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

ReactDOM.render((<Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="*" component={NoMatch} />
</Router>
), document.getElementById('app'));
