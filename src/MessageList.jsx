import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (

      <main className="messages">
        {this.props.message.map((result) => {
          return <Message key={result.id} username={result.username} content={result.content} />
        })}

      </main>
    );
  }
}
export default MessageList;
