import{ useEffect, useState } from "react";

import {
  getEmptyBoard,
  generateRandom,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isOver,
  checkWin,
  hasDiff
} from "./GameBoard";

const Cell = ({ number }) => {
  return (
    <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
  );
};

  let history=[];
const GameController = () => {
  const [board, updateBoard] = useState(generateRandom(generateRandom(getEmptyBoard())));
  const [replayStatus, setReplayStatus] = useState(false);
  const checkEndGame = () => {
    if (checkWin(board)) {
      console.log("You win!");
    } else if (isOver(board)) {
      console.log("Game over!");
    }
  };

  const left = () => {
    if (hasDiff(board, moveLeft(board))) {
      updateBoard(generateRandom(moveLeft(board)));
      history.push(board);
    }else{
      updateBoard(moveLeft(board));
    }
    checkEndGame();
  };

  const right = () => {
    if (hasDiff(board, moveRight(board))) {
      updateBoard(generateRandom(moveRight(board)));
      history.push(board);
    }else{
      updateBoard(moveRight(board));
    }
    checkEndGame();
  };

  const up = () => {
    if (hasDiff(board, moveUp(board))) {
      updateBoard(generateRandom(moveUp(board)));
      history.push(board);
    }else{
      updateBoard(moveUp(board));
    }
    checkEndGame();
  };

  const down = () => {
    if (hasDiff(board, moveDown(board))) {
      updateBoard(generateRandom(moveDown(board)));
      history.push(board);
    }else{
      updateBoard(moveDown(board));
    }
    checkEndGame();
  };

  const onKeyDown = (e) => {
    if (!replayStatus) {
      switch (e.key) {
        case "ArrowLeft":
          left();
          break;
        case "ArrowRight":
          right();
          break;
        case "ArrowUp":
          up();
          break;
        case "ArrowDown":
          down();
          break;

        default:
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });
  
  const restart=()=>{
    if (!replayStatus) {
    updateBoard(generateRandom(generateRandom(getEmptyBoard())));
    history=[];
    }
  }

  const undo=()=>{
    if (!replayStatus) {
      if (history.length>0) {
      updateBoard(history[history.length-1]);
      history.pop();
      }
    }
  }

  const replay = () => {
    if (!replayStatus) {
      setReplayStatus(true);
      history.push(board);
      for (let i = 0; i < history.length; i++) {
        setTimeout(() => {
          console.log('replay in progress', i);
          updateBoard(history[i]);
          if (i==history.length-1) {
            setReplayStatus(false);
          }
        }, i * 700);
      }
    }
  };

  return (
    <div className="page">
      <div className="game-board">
        {board.map((row, i) => {
          return (
            <div key={`row-${i}`} className="row">
              {row.map((cell, j) => (
                <Cell key={`cell-${i}-${j}`} number={cell} />
              ))}
            </div>
          );
        })}
      </div>
      <button className="button" onClick={()=> undo()}>undo</button>
      <button className="button" onClick={()=> restart()}>restart</button>
      <button className="button" onClick={()=> replay()}>replay</button>
    </div>
  );
};

export default GameController;
