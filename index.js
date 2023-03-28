console.log('Hello there');

// Creates new users for each game
const playerFactory = (name, marker) => ({ name, marker });

// Stores any changes to the board array
const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const setCell = (index, value) => {
    // if  array is empty at given index, mark it
    // if valid move is made switch player
    if (board[index] == '') {
      board[index] = value;
      game.switchPlayer();
    } else {
      console.log('pick another spot');
    }
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
  };

  const checkWin = (marker) => {
    // Enter all win combinations, check after each turn to see if
    // a win has been made for currentPlayer

  };

  const getBoard = () => {
    // return a copy of the board
    const boardCopy = Array.from(board);
    return boardCopy;
  };
  return { getBoard, resetBoard, setCell };
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
  return {
    getPlayer, switchPlayer,
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
  }));

  // tie the index of each grid cell to the index of the gameboard array
  return { displayGrid };
})();
