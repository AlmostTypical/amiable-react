import React from 'react';
import { Link }from 'react-router';

const LandingPage = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Amiable</h1>
        <p>Some PR text of somesort here</p>
        <Link to="/signup"><button>Sign Up</button></Link>
      </div>
    )
  }
});

export default LandingPage;