import React from 'react';

import UserImage from './UserImage';
import UserInfo from './UserInfo.js';

const UserInfoPanel = React.createClass({
  render: function () {
    return (
      <div>
        <h2>User Profile</h2>
        <UserImage />
        <UserInfo />
      </div>
    )
  }
});

export default UserInfoPanel;
