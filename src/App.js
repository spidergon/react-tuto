import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h2>Tic Tac Toe</h2>
                </div>
                <Game />
            </div>
        );
    }
}

export default App;