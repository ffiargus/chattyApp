import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }


  _addMessage = (message) => {

    this.setState(prevState => {
      const messages = prevState.messages
      const newMessage = {
        id: message.id,
        username: message.username,
        content: message.content
      }
      messages.push(newMessage)

      return {
        messages: messages
      }

    })
  }

  componentDidMount() {

    const PORT = 3001;
    this.socket = new WebSocket("ws://localhost:"+PORT)
    console.log("connected to server")


    this.socket.onopen = () => {

      this.socket.onmessage = (e) => {
          const message = JSON.parse(e.data);
          this._addMessage(message);

      }
    }

  }

  render() {


    return (
      <div>
      <MessageList message={this.state.messages}/>
      <ChatBar user={this.state.currentUser} addMessage={this._sendMessage}/>
      </div>
    );
  }

  _sendMessage = (message) => {
    const newMessage = {
        type: 'postMessage',
        username: message['chatbar-username'],
        content: message['chatbar-message']
      }

    this.socket.send(JSON.stringify(newMessage));
  }


}
export default App;
