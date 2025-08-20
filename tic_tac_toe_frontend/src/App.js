import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import { calculateWinner, getComputerMove } from './utils/gameLogic';

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [vsComputer, setVsComputer] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const current = history[stepNumber];
  const winInfo = calculateWinner(current);
  const winner = winInfo?.winner;
  const winningLine = winInfo?.line;

  const handleClick = (i) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const current = historyCopy[historyCopy.length - 1];
    const squares = [...current];

    if (winner || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...historyCopy, squares]);
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);

    // Computer's turn
    if (vsComputer && !winner && xIsNext) {
      setTimeout(() => {
        const computerSquares = [...squares];
        const computerMove = getComputerMove(computerSquares);
        
        if (computerMove !== null) {
          computerSquares[computerMove] = 'O';
          setHistory([...historyCopy, squares, computerSquares]);
          setStepNumber(historyCopy.length + 1);
          setXIsNext(true);
        }
      }, 500);
    }
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
    if (winner) {
      setScores({
        ...scores,
        [winner]: scores[winner] + 1
      });
    }
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
  };

  const toggleGameMode = () => {
    setVsComputer(!vsComputer);
    resetGame();
    resetScores();
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (current.every(square => square !== null)) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="App">
      <div className="game">
        <div className="game-info">
          <h1>Tic Tac Toe</h1>
          <div className="scores">
            <div className="score">X: {scores.X}</div>
            <div className="score">O: {scores.O}</div>
          </div>
          <div className="status">{status}</div>
        </div>
        
        <Board 
          squares={current}
          onClick={handleClick}
          winningLine={winningLine}
        />

        <div className="controls">
          <button className="control-btn" onClick={resetGame}>
            New Game
          </button>
          <button className="control-btn" onClick={resetScores}>
            Reset Scores
          </button>
          <button className="control-btn mode-btn" onClick={toggleGameMode}>
            {vsComputer ? 'Play vs Friend' : 'Play vs Computer'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
