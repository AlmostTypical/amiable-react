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
    this.setState({conversationID: this.props.conversationID, user: this.props.user})
    const messagesRef = firebase.database().ref().child('messages');
    var temp = [];
    messagesRef.on('child_added', snap => {
      if(snap.val().conversationID === this.props.conversationID) {
        console.log(snap.val());
        temp.push({user: snap.val().user, text: snap.val().text, id: snap.key});
        this.handleChat(temp);
      }
    }).bind(this)

    messagesRef.on('child_removed', snap => {
      const liToRemove = document.getElementById(snap.key);
      liToRemove.remove();
    })
  },
  handleChat: function(temp) {
    this.setState({chat: temp}, function() {
      var chatDiv = document.getElementById('chat-container');
      chatDiv.scrollTop = chatDiv.scrollHeight;
    })
  },
  submitChat: function(e) {
    e.preventDefault();
    var chatDiv = document.getElementById('chat-container');
    const currentUser = this.props.userOne;
    const generalRef = firebase.database().ref().child('messages');
    if(this.state.currentInput.length !== 0) {
      // generalRef.push({user: currentUser, comment: this.state.currentInput});
      generalRef.push({conversationID: this.props.conversationID, createdAt: new Date().getTime(), text: this.state.currentInput, user: this.state.user})
      this.setState({currentInput: ''})
    }
    chatDiv.scrollTop = chatDiv.scrollHeight;
  },
  handleInputChange: function(e) {
    this.setState({currentInput: e.target.value});
  },
  closePrivateChat: function(privateChat) {
    privateChat = !privateChat;
    this.props.closePrivateChat(privateChat);
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
          <div className="private-chat">
            <h2>This is your private chat with {this.props.userTwo}<span className="close-private-chat" onClick={this.closePrivateChat}>Close Private Chat</span></h2>
            <div className="chat-container" id="chat-container">
              <ul id="chat-display">
                {nodes}
              </ul>
            </div>
            <div className="chat-input">
              <form role="form" onSubmit={this.submitChat}>
                <div className="form-group">
                  <label>Please enter your comment here: </label>
                  <input type="text" value={this.state.currentInput} className="form-control" id="comments" name="comments" onChange={this.handleInputChange} autoComplete="off"></input>
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
