import React from 'react';
import * as firebase from 'firebase';

const GeneralChat = React.createClass({
  componentDidMount: function() {
    const generalRef = firebase.database().ref().child('general');
    generalRef.on('child_added', function(snap) {
      const user = snap.val().user;
      const comment = snap.val().comment;
      console.log(user);
      const list = document.createElement('li');
      list.innerHTML = user + ': ' + comment;
      const ul = document.getElementById('chat-display');
      ul.appendChild(list);
    })
  },
  submitChat: function(e) {
    e.preventDefault();
    const text = document.getElementById('comments').value;

    const currentUser = firebase.auth().currentUser.displayName;
    const generalRef = firebase.database().ref().child('general');
    generalRef.push({user: currentUser, comment: text});

  },
  render: function () {
    return (
      <div className="general-chat">
        <h1>General Chat </h1>
        <div className="chat-container">
          <ul id="chat-display">

          </ul>
        </div>
        <div className="chat-input">
          <form action="" role="form" onSubmit={this.submitChat}>
            <div className="form-group">
              <label>Please enter your comment here: </label>
              <input type="text" className="form-control" id="comments" name="comments"></input>
            </div>
            <button type="submit" id="submit-btn" name="submit-btn" className="btn btn-primary">Send Comments</button>
          </form>
        </div>
      </div>
    )
  }
});

export default GeneralChat;
