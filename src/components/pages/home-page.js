import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './home-page.css';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h2>You want to:</h2>
        <div className="inline">
          <Link className="nav-links" to="/client">ASK</Link>
          <h2> OR </h2>
          <Link className="nav-links" to="/user">ANSWER</Link>
        </div>
        <h2>the question?</h2>
      </div>
    );
  }
}

export default HomePage;