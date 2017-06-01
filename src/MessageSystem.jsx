import React, {Component} from 'react';

class MessageSystem extends Component {
  render() {
    return (
      <div className="message system">
        {this.props.content}
      </div>

    );
  }
}
export default MessageSystem;