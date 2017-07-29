import React, { Component } from 'react';
import Board from './Board';
import './Game.css';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            history: [{
                rank: 0,
                squares: Array(9).fill({
                    'value': null,
                    'isWinner': false
                }),
                location: { x: 0, y: 0 }
            }],
            stepNumber: 0,
            xIsNext: true,
            historySorted: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        if (calculateWinner(squares) || squares[i].value) {
            return;
        }

        squares[i] = {'value': this.state.xIsNext ? 'X' : 'O', 'isWinner': squares[i].isWinner};
        this.setState({
            history: history.concat([{
                rank: history.length,
                squares: squares,
                location: { x: i % 3 + 1, y: Math.floor(i / 3) + 1 }
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    sort() {
        const history = this.state.history.slice();
        if (history.length > 1) {
            if (this.state.historySorted) { // sort descending
                history.sort((a, b) => b.rank - a.rank);
            } else { // sort ascending
                history.sort((a, b) => a.rank - b.rank);
            }
            this.setState({
                history: history,
                historySorted: !this.state.historySorted
            });
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = step.rank > 0 ? 'Move #' + step.rank + ' (' + step.location.x + ',' + step.location.y + ')' : 'Game start';
            return (
                <li key={move}>
                    <a href="#history" onClick={() => this.jumpTo(move)} className={move === this.state.stepNumber ? 'strong-state' : null}>{desc}</a>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <a href="#sort" onClick={() => this.sort()}>(sort)</a>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
            squares[a] = {'value': squares[a].value, 'isWinner': true};
            squares[b] = {'value': squares[a].value, 'isWinner': true};
            squares[c] = {'value': squares[a].value, 'isWinner': true};
            return squares[a].value;
        }
    }
    return null;
}

export default Game;