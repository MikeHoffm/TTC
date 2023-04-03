// Creates new users for each game
const playerFactory = (name, marker) => ({ name, marker });

// Stores any changes to the board array
const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const setCell = (index, value) => {
    // if  array is empty at given index, mark it
    // check if a winning condition is met
    // if valid move is made switch player
    if (board[index] == '') {
      board[index] = value;
      displayController.gameMsg.innerText = '';
      game.switchPlayer();
    } else {
      console.log('pick another spot');
      displayController.gameMsg.innerText = 'Pick another spot';
    }
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
  };

  const getBoard = () => {
    // return a copy of the board
    const boardCopy = Array.from(board);
    return boardCopy;
  };

  return {
    getBoard, resetBoard, setCell,
  };
})();

// Communicates between the gameboard & DOM to make any changes / add play functionality
const game = (() => {
  const player1 = playerFactory('User1', 'X');
  const player2 = playerFactory('User2', 'O');
  let currentPlayer = player1;

  // Get the currentPlayer value
  const getPlayer = () => currentPlayer;

  // When called swap player
  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      return currentPlayer;
    } if (currentPlayer === player2) {
      currentPlayer = player1;
      return currentPlayer;
    }
  };

  const disableBtns = () => {
    const btns = document.getElementsByTagName('button');
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
      btns[i].style.backgroundColor = 'gray';
    }
  };

  // function to end game, remove click functionality from all cells
  // & display winner
  const endGame = () => {
    // if game.checkWin == true, then remove click functionality from board,
    // display winner
    // display restart button
    displayController.gameMsg.innerText = 'Game Over';
    console.log('Game over');
    disableBtns();
  };

  const checkWin = () => {
    const gridCells = document.querySelectorAll('.grid-cell');

    if (gridCells[0].innerText != '' && gridCells[0].innerText === gridCells[1].innerText && gridCells[1].innerText === gridCells[2].innerText) {
      endGame();
    } else if (gridCells[3].innerText != '' && gridCells[3].innerText === gridCells[4].innerText && gridCells[4].innerText === gridCells[5].innerText) {
      endGame();
    } else if (gridCells[6].innerText != '' && gridCells[6].innerText === gridCells[7].innerText && gridCells[7].innerText === gridCells[8].innerText) {
      endGame();
    } else if (gridCells[0].innerText != '' && gridCells[0].innerText === gridCells[3].innerText && gridCells[3].innerText === gridCells[6].innerText) {
      endGame();
    } else if (gridCells[1].innerText != '' && gridCells[1].innerText === gridCells[4].innerText && gridCells[4].innerText === gridCells[7].innerText) {
      endGame();
    } else if (gridCells[2].innerText != '' && gridCells[2].innerText === gridCells[5].innerText && gridCells[5].innerText === gridCells[8].innerText) {
      endGame();
    } else if (gridCells[0].innerText != '' && gridCells[0].innerText === gridCells[4].innerText && gridCells[4].innerText === gridCells[8].innerText) {
      endGame();
    } else if (gridCells[2].innerText != '' && gridCells[2].innerText === gridCells[4].innerText && gridCells[4].innerText === gridCells[6].innerText) {
      endGame();
    }
  };

  const checkTie = () => {
    // if every gridCell is filled then it is a tie
  };

  const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  return {
    getPlayer, switchPlayer, checkWin, winConditions, checkTie,
  };
})();

// Changes the DOM to reflect any changes
const displayController = (() => {
  const gridCells = document.querySelectorAll('.grid-cell');

  // Set the board to display what the array currently has
  const displayGrid = () => {
    for (let i = 0; i < gameBoard.getBoard().length; i++) {
      gridCells[i].innerText = gameBoard.getBoard()[i];
    }
  };

  // When gridCell is clicked, call setCell given its index, and currentplayer marker
  // find a way to switch player at this point
  gridCells.forEach((cell) => cell.addEventListener('click', () => {
    console.log('Clicked');
    console.log(cell.dataset.index);

    gameBoard.setCell(cell.dataset.index, game.getPlayer().marker);
    displayGrid();
    game.checkWin();
  }));

  const gameMsg = document.querySelector('.game-msg');

  const resetDOM = () => {
    gameBoard.resetBoard();
    displayGrid();
  };

  const restartBtn = document.querySelector('.restart');
  restartBtn.addEventListener('click', resetDOM);

  // tie the index of each grid cell to the index of the gameboard array
  return { displayGrid, gameMsg };
})();
