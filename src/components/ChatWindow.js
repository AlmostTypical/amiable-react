import React from 'react';
import * as firebase from 'firebase';

const ChatWindow = React.createClass({
  getInitialState: function() {
    return {
      chat: [],
      currentInput: ''
    }
  },
  componentDidMount: function() {
    const generalRef = firebase.database().ref().child('messages');
    var temp = [];
    generalRef.on('child_added', snap => {
      console.log(this.props.data.convoId)
      if(this.props.data.convoId === snap.val().convoId) {
        console.log("Hello");
        temp.push({user: snap.val().userId, text: snap.val().text})
      }

      this.handleChats(temp);
    }).bind(this)
  },
  handleChats: function(chats) {
    this.setState({chat: chats});
  },
  handleChange: function(e) {
    this.setState({currentInput: e.target.value})
  },
  submitChat: function(e) {
    e.preventDefault();
    var text = this.state.currentInput;

    const currentUser = firebase.auth().currentUser;
    const generalRef = firebase.database().ref().child('messages');
    if(this.state.currentInput.length !== 0) {
      generalRef.push({convoId: this.props.data.convoId, userId: currentUser.displayName, createdAt: new Date().getTime(), text: this.state.currentInput });
    }
  },
  render: function () {
    const nodes = this.state.chat.map(function(message, index) {
      return (
        <li key={index}>
          <p><strong>{message.user}:</strong></p>
          <p>{message.text}</p>
        </li>
      )
    })
    return (
      <div>
        <h1>Chat Window</h1>
          <div className="general-chat">
            <h2>This is your private chat with {this.props.data.user2} </h2>
            <div className="chat-container" id="chat-container">
              <ul id="chat-display">
                {nodes}
              </ul>
            </div>
            <div className="chat-input">
              <form role="form" onSubmit={this.submitChat}>
                <div className="form-group">
                  <label>Please enter your comment here: </label>
                  <input type="text" className="form-control" id="comments" name="comments" onChange={this.handleChange} autoComplete="off"></input>
                  <button type="submit" id="submit-btn" name="submit-btn" className="btn btn-primary">Send</button>
                </div>

              </form>
            </div>
          </div>
      </div>
    )
  }
});

export default ChatWindow;
