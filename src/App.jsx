import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import MessageSystem from './MessageSystem.jsx';
import Navbar from './Navbar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      count: 0,
    }
  }

  _addMessage = (message) => {
    let newStr = message.content.replace(/\S+\.(png|jpg|gif)/i, `<img src="${message.content.match(/\S+\.(jpg|png|gif)/gi)}" />`);

    this.setState(prevState => {
      const messages = prevState.messages
      const newMessage = {
        type: message.type,
        id: message.id,
        username: message.username,
        content: newStr,
        color: message.color
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


    this.socket.onopen = () => {
      console.log("connected to server")

      const color = Math.floor(Math.random() * 4)
      let userColor;
      switch (color) {
        case 1:
          this.state.userColor = 'red';
          break;
        case 2:
          this.state.userColor = 'blue';
          break;
        case 3:
          this.state.userColor = 'green';
          break;
        case 0:
          this.state.userColor = 'purple';
          break;
      }
    }


    this.socket.onmessage = (e) => {
        const message = JSON.parse(e.data);

        switch(message.type) {
          case "incomingMessage":
            // handle incoming message
          case "incomingNotification":
            this._addMessage(message);
            // handle incoming notification
            break;
          case "count":
            this.setState({count: message.content})
            break;
          default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + data.type);
        }

    }

  }

  render() {


    return (
      <div>
        <Navbar count={this.state.count} />
        <MessageList message={this.state.messages} color={this.userColor}/>
        <ChatBar user={this.state.currentUser} addMessage={this._sendMessage} changeName={this._sendNotification} color={this.state.userColor}/>
      </div>
    );
  }

  _sendMessage = (message, color) => {
    const newMessage = {
        type: 'postMessage',
        username: message['chatbar-username'],
        content: message['chatbar-message'],
        color: color
      }
      console.log(newMessage)

    this.socket.send(JSON.stringify(newMessage));
  }

  _sendNotification = (message) => {
    const newMessage = {
        type: 'postNotification',
        username: message['chatbar-username'],
        oldname: this.state.currentUser.name
    }


    this.state.currentUser.name = newMessage.username;
    console.log(newMessage);
    this.socket.send(JSON.stringify(newMessage));
  }


}
export default App;
