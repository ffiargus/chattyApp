
import React, {Component} from 'react';

class Navbar extends Component {
  render() {

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="navbar-counter">{this.props.count} user(s) online</p>
      </nav>

    );
  }
}
export default Navbar;

