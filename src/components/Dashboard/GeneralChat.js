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
      temp.push({user: snap.val().user, comment: snap.val().comment});
      this.handleChat(temp);
    }.bind(this))
  },
  handleChat: function(temp) {
    this.setState({chat: temp})
  },
  submitChat: function(e) {
    e.preventDefault();
    var text = this.state.currentInput;

    const currentUser = firebase.auth().currentUser.displayName;
    const generalRef = firebase.database().ref().child('general');
    if(this.state.currentInput.length !== 0) {
      generalRef.push({user: currentUser, comment: text});
      this.setState({currentInput: ' '})
    }

  },
  handleChange: function(e) {
    this.setState({currentInput: e.target.value})
  },
  render: function () {
    const nodes = this.state.chat.map(function(chat, index) {
      return (
        <li key={index}>
          <p><strong>{chat.user}:</strong></p>
          <p>{chat.comment}</p>
        </li>
      )
    });
    return (
      <div className="general-chat">
        <h2>General Chat </h2>
        <div className="chat-container">
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
    )
  }
});

export default GeneralChat;