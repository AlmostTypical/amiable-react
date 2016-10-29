import React from 'react';

import NavBar from '../NavBar';
import UserInfoPanel from './UserInfo/UserInfoPanel';
import EventsPanel from './EventsPanel';
import AvailabilityPanel from './AvailabilityPanel';
import TimeSlotPanel from './TimeSlotsPanel';
import ChatHistory from './ChatHistory';

const Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <NavBar />
        <UserInfoPanel />
        <EventsPanel />
        <AvailabilityPanel />
        <TimeSlotPanel />
        <ChatHistory />
      </div>
    )
  }
});

export default Dashboard;