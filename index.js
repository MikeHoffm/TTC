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
  const player1 = playerFactory('playerOne', 'X');
  const player2 = playerFactory('playerTwo', 'O');
  let currentPlayer = player1;

  const playerOneScore = 0;
  const playerTwoScore = 0;

  const getScores = () => ({ playerOneScore, playerTwoScore });

  const gameMsg = document.querySelector('.game-msg');
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
    const btns = document.querySelectorAll('.grid-cell');
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }
  };

  const enableBtns = () => {
    const btns = document.querySelectorAll('.grid-cell');
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = false;
    }
  };

  // function to end game, remove click functionality from all cells
  // & display winner
  const endGame = () => {
    disableBtns();
    displayController.displayRestart();
  };

  const checkWin = () => {
    const gridCells = document.querySelectorAll('.grid-cell');

    if (gridCells[0].innerText != '' && gridCells[0].innerText === gridCells[1].innerText && gridCells[1].innerText === gridCells[2].innerText) {
      endGame();
      const winner = gridCells[0].innerText;
      return { winner };
    } if (gridCells[3].innerText != '' && gridCells[3].innerText === gridCells[4].innerText && gridCells[4].innerText === gridCells[5].innerText) {
      gameMsg.innerText = `${gridCells[3].innerText} wins`;
      endGame();
      const winner = gridCells[3].innerText;
      return { winner };
    } if (gridCells[6].innerText != '' && gridCells[6].innerText === gridCells[7].innerText && gridCells[7].innerText === gridCells[8].innerText) {
      endGame();
      const winner = gridCells[6].innerText;
      return { winner };
    } if (gridCells[0].innerText != '' && gridCells[0].innerText === gridCells[3].innerText && gridCells[3].innerText === gridCells[6].innerText) {
      endGame();
      const winner = gridCells[0].innerText;
      return { winner };
    } if (gridCells[1].innerText != '' && gridCells[1].innerText === gridCells[4].innerText && gridCells[4].innerText === gridCells[7].innerText) {
      endGame();
      const winner = gridCells[1].innerText;
      return { winner };
    } if (gridCells[2].innerText != '' && gridCells[2].innerText === gridCells[5].innerText && gridCells[5].innerText === gridCells[8].innerText) {
      endGame();
      const winner = gridCells[2].innerText;
      return { winner };
    } if (gridCells[0].innerText != '' && gridCells[0].innerText === gridCells[4].innerText && gridCells[4].innerText === gridCells[8].innerText) {
      endGame();
      const winner = gridCells[0].innerText;
      return { winner };
    } if (gridCells[2].innerText != '' && gridCells[2].innerText === gridCells[4].innerText && gridCells[4].innerText === gridCells[6].innerText) {
      endGame();
      const winner = gridCells[2].innerText;
      return { winner };
    }
  };

  const checkTie = () => {
    const gridCells = document.querySelectorAll('.grid-cell');
    const gridArray = Array.from(gridCells);
    const filled = (currentValue) => currentValue.innerText != '';

    if (gridArray.every(filled) === true) {
      console.log('It\'s a tie');

      gameMsg.innerText = 'It\'s a tie.';
      endGame();
    }
  };

  const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  return {
    getPlayer, switchPlayer, checkWin, winConditions, checkTie, enableBtns, getScores,
  };
})();

// Changes the DOM to reflect any changes
const displayController = (() => {
  const gridCells = document.querySelectorAll('.grid-cell');
  const grid = document.querySelector('.game-grid');
  const startBtn = document.querySelector('.start-btn');
  const startMenu = document.querySelector('.start-menu');

  const gameMenu = document.querySelector('.game-type-menu');
  const pvpBtn = document.querySelector('.pvp-game');

  const playerForm = document.querySelector('.player-form');
  playerForm.style.display = 'none';

  const formSubmit = document.querySelector('.submit');

  const gameMsg = document.querySelector('.game-msg');

  const restartBtn = document.querySelector('.restart');

  // when game opens, have grid hidden, when start button is pressed, display grid
  grid.style.display = 'none';

  startBtn.addEventListener('click', () => {
    startMenu.style.display = 'none';
    gameMenu.style.display = 'block';
  });

  pvpBtn.addEventListener('click', () => {
    gameMenu.style.display = 'none';
    playerForm.style.display = 'block';
  });

  const displayRestart = () => {
    restartBtn.style.display = 'block';
  };

  const getPlayerName = () => {
    const playerOne = document.querySelector('#player1').value;
    const playerTwo = document.querySelector('#player2').value;
    const pOne = playerFactory(playerOne, 'X');
    const pTwo = playerFactory(playerTwo, 'O');
    return { pOne, pTwo };
  };

  formSubmit.addEventListener('click', () => {
    event.preventDefault();
    playerForm.style.display = 'none';
    grid.style.display = 'grid';
    getPlayerName();
    displayPlayer();
  });

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
    displayPlayer();
    game.checkWin();
    game.checkTie();
    displayWinner();
    updateScore();
  }));

  const resetDOM = () => {
    gameMsg.innerText = '';
    gameBoard.resetBoard();
    game.enableBtns();
    displayGrid();
    displayPlayer();
  };

  restartBtn.addEventListener('click', () => {
    resetDOM();
    restartBtn.style.display = 'none';
  });

  const displayPlayer = () => {
    gameMsg.innerText = `${game.getPlayer().marker} make your move`;
  };

  // display a winning message for the player who wins
  const displayWinner = () => {
    // if checkWin returns X as winner, display getPlayerName.pOne.name, if O is winner display getPlayerName.pTwo.name
    const winner = '';
    if (game.checkWin().winner == 'X') {
      gameMsg.innerText = (`${getPlayerName().pOne.marker} wins`);
      winner = 'X';
      return { winner };
    } if (game.checkWin().winner == 'O') {
      gameMsg.innerText = (`${getPlayerName().pTwo.marker} wins`);
      winner = 'O';
      return { winner };
    }
  };

  // tie the index of each grid cell to the index of the gameboard array
  return {
    displayGrid, gameMsg, displayRestart, getPlayerName, displayWinner, displayPlayer,
  };
})();
