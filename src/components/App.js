import React, { Component } from 'react';

import AppRoute from './app.route';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fortunica</h1>
        </header>
        <main>
          <AppRoute/>
        </main>
      </div>
    );
  }
}

export default App;
