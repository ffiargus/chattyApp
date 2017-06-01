import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageSystem from './MessageSystem.jsx';

class MessageList extends Component {
  render() {
    return (

      <main className="messages">
        {this.props.message.map((result) => {
          if (result.type === 'incomingMessage') {
            return <Message key={result.id} username={result.username} content={result.content} color={result.color}/>
          } else if (result.type === 'incomingNotification') {
            return <MessageSystem key={result.id} username={result.username} content={result.content} />
          }
        })}
      </main>

    );
  }
}
export default MessageList;
