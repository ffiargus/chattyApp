import React, {Component} from 'react';



const defaultState = {
  'chatbar-message': ''
}

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'chatbar-message': '',
      'chatbar-username': 'Anonymous'
    };
  }

  render() {

    return (

      <footer className="chatbar">
      <input type="text" id="chatUser" className="chatbar-username" value={this.state.username} placeholder="Enter name (optional)" onKeyPress={this._onEnterName} />
      <input type="text" id="chatMessage" value={this.state.content} className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this._messageChanged} onKeyPress={this._onEnter}/>
      </footer>
    );
  }

  _onEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.addMessage(this.state, this.props.color)
      chatMessage.value = "";
      this.setState(defaultState)
    }
  }

  _onEnterName = (e) => {
    if (e.key === 'Enter') {
      this.state['chatbar-username'] = e.target.value
      this.props.changeName(this.state)
    }
  }

  _messageChanged = (e) => {
    this.setState({
      'chatbar-message': e.target.value
    })
  }

}
export default ChatBar;
