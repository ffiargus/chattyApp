import React, {Component} from 'react';

const defaultState = {
  'chatbar-message': ''
}

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  render() {

    return (

      <footer className="chatbar">
      <input type="text" id="chatUser" className="chatbar-username" value={this.state.username} onChange={this._usernameChanged} placeholder="Enter your name"/>
      <input type="text" id="chatMessage" value={this.state.content} className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this._messageChanged} onKeyPress={this._onEnter}/>
      </footer>
    );
  }

  _onEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.addMessage(this.state)
      chatMessage.value = "";
      this.setState(defaultState)
    }
  }

  _messageChanged = (e) => {
    this.setState({
      'chatbar-message': e.target.value
    })
  }

  _usernameChanged = (e) => {
    this.setState({
      'chatbar-username': e.target.value
    })
  }

}
export default ChatBar;
