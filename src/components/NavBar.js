import React from 'react';

const NavBar = React.createClass({
  render: function () {
    return (
      <div className="navbar">
        <a className="logo">Amiable</a>
        <a className="navtext">Logout</a>
      </div>
    )
  }
});

export default NavBar;