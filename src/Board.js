import React from 'react';
import Square from './Square';

function Board(props) {
    return (
        <div>
            {[0, 1, 2].map((i) => {
                return (
                    <div key={i} className="board-row">
                        {[0, 1, 2].map((j) => {
                            let index = j + i * 3;
                            return (
                                <Square key={index}
                                    value={props.squares[index].value}
                                    isWinner={props.squares[index].isWinner}
                                    onClick={() => props.onClick(index)}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default Board;