import React from 'react';

const ChatWindow = React.createClass({
  render: function () {
    console.log(this.state);
    return (
      <div>
        <h1>Chat Window</h1>
      </div>
    )
  }
});

export default ChatWindow;