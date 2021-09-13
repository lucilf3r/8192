import React, { useEffect, useState } from "react";
export const getEmptyBoard = () => [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  ];

  
  export const copyBoard = (board) => {
    let newBoard= [];
    for (let i = 0; i < board.length; i++) {
      newBoard[i] = board[i].slice();
    }
    return newBoard;
  }

  const hasValue = (board, value) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === value) {
          return true;
        }
      }
    }
    return false;
  };
  
  export const isFull = (board) => {
    return !hasValue(board, 0);
  };
  
  const getRandomPosition = () => {
    const rowPosition = Math.floor(Math.random() * 8);
    const colPosition = Math.floor(Math.random() * 8);
    return [rowPosition, colPosition];
  };
  
  export const generateRandom = (board) => {
    if (isFull(board)) {
      return board;
    }
  
    let [row, col] = getRandomPosition();
    while (board[row][col] !== 0) {
      [row, col] = getRandomPosition();
    }
    const r= Math.random();
    board[row][col] = r > 0.1? 2:4;
    return board;
  };
  
  const slide = (board) => {
    const newBoard = getEmptyBoard();
    for (let i = 0; i < board.length; i++) {
      newBoard[i]= board[i].filter(val=>val);
      let missing = board.length - newBoard[i].length;
      let zeros= Array(missing).fill(0);
      newBoard[i]= zeros.concat(newBoard[i]);
    }
    return newBoard;
  }
  
  const merge = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = board.length; j >= 1; j--) {
        if (board[i][j] === board[i][j - 1]) {
          board[i][j] = board[i][j] * 2;
          board[i][j - 1] = 0;
        }
      }
    }
    return board;
  };
  
  const flip = (board) => {
    const flipBoard = getEmptyBoard();
    const newBoard = copyBoard(board);
    for (let i = 0; i < board.length; i++) {
        flipBoard[i] = newBoard[i].reverse();
    }
    return flipBoard;
  };
  
  const transpose = (a) => {
    return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
    }
  
  const rotateLeft = (board) => {
    const newBoard = copyBoard(board);
    const flipBoard = flip(newBoard);
    const transposeBoard = transpose(flipBoard);
    return transposeBoard;
  };
  
  const rotateRight = (board) => {
    const newBoard = copyBoard(board);
    const transposeBoard = transpose(newBoard);
    const flipBoard = flip(transposeBoard);
    return flipBoard;
  };
  
  export const moveRight = (board) => {
    const newBoard1 = slide(board);
    const newBoard2 = merge(newBoard1);
    return slide(newBoard2);
  };

  export const moveLeft = (board) => {
    const flippedBoard = flip(board);
    const newBoard = moveRight(flippedBoard);
    return flip(newBoard);
  };


  export const moveDown = (board) => {
    const rotateBoard = rotateLeft(board);
    const newBoard = moveRight(rotateBoard);
    return rotateRight(newBoard);
  };
  
  export const moveUp = (board) => {
    const rotateBoard = rotateRight(board);
    const newBoard = moveRight(rotateBoard);
    return rotateLeft(newBoard);
  };
  
  export const checkWin = (board) => {
    return hasValue(board, 8192);
  };
  
  export const hasDiff = (a, b) => {
    if(JSON.stringify(a)===JSON.stringify(b))
      return false;
    else return true;
  };
  
  export const isOver = (board) => {
    if (hasDiff(board, moveLeft(board))) {
      return false;
    }
    if (hasDiff(board, moveRight(board))) {
      return false;
    }
    if (hasDiff(board, moveUp(board))) {
      return false;
    }
    if (hasDiff(board, moveDown(board))) {
      return false;
    }
    return true;
  };
  