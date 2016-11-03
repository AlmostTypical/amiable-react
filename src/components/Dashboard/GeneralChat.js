import React from 'react';
import * as firebase from 'firebase';

const GeneralChat = React.createClass({
  getInitialState: function() {
    return {
      chat: [],
      currentInput: ''
    }
  },
  componentDidMount: function() {
    const generalRef = firebase.database().ref().child('general');
    var temp = [];
    const user = generalRef.on('child_added', function(snap) {
      temp.push({user: snap.val().user.name, comment: snap.val().text, id: snap.key});
      this.handleChat(temp);
    }.bind(this))

    generalRef.on('child_removed', snap => {
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
    const currentUser = firebase.auth().currentUser;
    const generalRef = firebase.database().ref().child('general');
    if(this.state.currentInput.length !== 0) {
      // generalRef.push({user: currentUser, comment: this.state.currentInput});
      generalRef.push({_id: new Date().getTime(), text: this.state.currentInput, createdAt: new Date().getTime(), user: {
        _id: currentUser.uid, name: currentUser.displayName, avatar: 'http://mdepinet.org/wp-content/uploads/person-placeholder.jpg'
      }})
      this.setState({currentInput: ''})
    }
    chatDiv.scrollTop = chatDiv.scrollHeight;
  },
  handleInputChange: function(e) {
    this.setState({currentInput: e.target.value});
  },
  deleteComment: function(e) {
    const dbRef = firebase.database().ref().child('general');
    const liToRemove = e.target.parentElement.parentElement.id;
    console.log(liToRemove);
    dbRef.child(liToRemove).remove();
  },
  render: function () {
    const nodes = this.state.chat.map(function(chat, index) {
      return (
        <li id={chat.id} key={index} >
          <p><strong>{chat.user}:</strong> <a id="toRemove" className="delete-comment" onClick={this.deleteComment}> - Delete message</a></p>
          <p>{chat.comment}</p>
        </li>
      )
    }.bind(this));
    return (
      <div className="general-chat">
        <h2>General Chat </h2>
        <div className="chat-container" id="chat-container">
          <ul id="chat-display">
            {nodes}
          </ul>
        </div>
        <div className="chat-input">
          <form role="form" onSubmit={this.submitChat}>
            <div className="form-group">
              <label>Please enter your comment here: </label>
              <input type="text" value={this.state.currentInput} className="form-control" id="comments" name="comments" onChange={this.handleInputChange} autoComplete="off" placeholder="Enter your message"></input>
              <button type="submit" id="submit-btn" name="submit-btn" className="btn btn-primary">Send</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

export default GeneralChat;
