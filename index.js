console.log('Hello there');

// Creates new users for each game
const playerFactory = (name, marker) => ({ name, marker });

// Stores any changes to the board array
const gameBoard = (() => {
  const board = ['X', '', '', '', '', '', '', '', ''];

  return { board };
})();

// Communicates with the gameboard to make any changes / add play functionality
const game = (() => {
  const player1 = playerFactory('User1', 'X');
  const player2 = playerFactory('User2', 'O');

  return { player1, player2 };
})();

// Changes the DOM to reflect any changes
const displayController = (() => {
  const gridCells = document.querySelectorAll('.grid-cell');

  // Set the board to display what the array currently has
  const displayGrid = () => {
    for (let i = 0; i < gameBoard.board.length; i++) {
      gridCells[i].innerText = gameBoard.board[i];
    }
  };

  // Set the board to display what the array currently has
  // Add click event to each button, when pressed change the cells
  gridCells.forEach((cell) => cell.addEventListener('click', () => {
    console.log(cell.dataset.index);
    const cellIndex = cell.dataset.index;

    //  When clicked, update the gameBoard.board, marking it with current player marker
    if (gameBoard.board[cellIndex] == false) {
      gameBoard.board[cellIndex] = currentPlayer.marker;
    } else {
      console.log('Pick another spot');
    }

    // Then set the cells innerText to be whatever is inside the array at that index
    cell.innerText = gameBoard.board[cellIndex];
  }));

  // tie the index of each grid cell to the index of the gameboard array
  return { gridCells, displayGrid };
})();

const currentPlayer = game.player1;
console.log(currentPlayer);
const gridCells = document.querySelectorAll('.grid-cell');

// Create function that goes before the one above,
// when a gridCell is clicked, update the corresponding array index with a marker if empty

// if displayController returns a cellIndex, check board to see if its empty
// at that corresponding index
