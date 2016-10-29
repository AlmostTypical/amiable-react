import React from 'react';

import UserImage from './UserImage';
import UserInfo from './UserInfo.js';

const UserInfoPanel = React.createClass({
  render: function () {
    return (
      <div>
        <UserImage />
        <UserInfo />
      </div>
    )
  }
});

export default UserInfoPanel;