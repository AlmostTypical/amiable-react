import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router'

import LandingPage from './components/Landing/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import NoMatch from './components/NoMatch';

const App = React.createClass({
  render: function () {
    return (
      <BrowserRouter>
        <div>
        <Match exactly pattern="/" component={LandingPage} />
        <Match pattern="/signin" component={SignIn} />
        <Match pattern="/signup" component={SignUp} />
          <Match pattern="/dashboard" component={Dashboard} />
        <Miss component={NoMatch}/>
          </div>
      </BrowserRouter>
    )
  }
});

export default App;