import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
    return (
        <button
            className="square rounded-sm border-info m-1 text-white bg-info"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

const initialState = {
    squares: Array(9).fill(null),
    xIsNext: true
};

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    handleReset = () => {
        console.log("reset button called");
        this.setState({ ...initialState });
    };

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Turn of player: " + (this.state.xIsNext ? "X" : "O");
        }
        // const status = "Next player: " + (this.state.xIsNext ? "X" : "O");

        return (
            <div>
                <div className="status d-flex justify-content-center ">
                    {status}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="row d-flex justify-content-center">
                    <button
                        type="submit"
                        className=" btn btn-lg btn-danger m-5"
                        onClick={() => this.handleReset()}
                    >
                        Reset
                    </button>
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game  mt-5 p-5">
                <h1 className=" game-title d-flex justify-content-center text-info  mb-2">
                    Tic Tac Toe
                </h1>
                <small className="small-text d-flex justify-content-center text-info mb-3">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.wikihow.com/Play-Tic-Tac-Toe"
                    >
                        How to play?
                    </a>
                </small>
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-center game-board ">
                            <Board />
                        </div>
                    </div>
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
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
