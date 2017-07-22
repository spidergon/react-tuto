import React from 'react';
import logo from './logo.svg';
import Game from './Game';
import './App.css';

function App() {
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

export default App;