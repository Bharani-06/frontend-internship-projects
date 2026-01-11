// Game Variables
const rows = 6;
const cols = 7;
let currentPlayer = 'red'; // Player 1 (red) starts
let gameActive = true;
const board = [];

// DOM Elements
const boardElement = document.getElementById('board');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

// Initialize Board
function initializeBoard() {
  boardElement.innerHTML = '';
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = null;
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
    }
  }
}

// Handle Cell Click
function handleCellClick(e) {
  if (!gameActive) return;

  const col = parseInt(e.target.dataset.col);
  const row = getAvailableRow(col);

  if (row === -1) return; // Column is full

  board[row][col] = currentPlayer;
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  cell.classList.add(currentPlayer);

  if (checkWin(row, col)) {
    gameStatus.textContent = `Player ${currentPlayer === 'red' ? '1' : '2'} (${currentPlayer}) Wins!`;
    gameActive = false;
    return;
  }

  if (isBoardFull()) {
    gameStatus.textContent = 'It\'s a draw!';
    gameActive = false;
    return;
  }

  // Switch Player
  currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
  gameStatus.textContent = `Player ${currentPlayer === 'red' ? '1' : '2'}'s Turn (${currentPlayer})`;
}

// Get the Lowest Available Row
function getAvailableRow(col) {
  for (let r = rows - 1; r >= 0; r--) {
    if (!board[r][col]) return r;
  }
  return -1;
}

// Check for a Win
function checkWin(row, col) {
  return checkDirection(row, col, 1, 0) || // Horizontal
         checkDirection(row, col, 0, 1) || // Vertical
         checkDirection(row, col, 1, 1) || // Diagonal \
         checkDirection(row, col, 1, -1);  // Diagonal /
}

// Check a Specific Direction
function checkDirection(row, col, rowDir, colDir) {
  let count = 1;

  count += countDiscs(row, col, rowDir, colDir);
  count += countDiscs(row, col, -rowDir, -colDir);

  return count >= 4;
}

// Count Discs in a Direction
function countDiscs(row, col, rowDir, colDir) {
  let count = 0;
  let r = row + rowDir;
  let c = col + colDir;

  while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
    count++;
    r += rowDir;
    c += colDir;
  }

  return count;
}

// Check if the Board is Full
function isBoardFull() {
  return board.every(row => row.every(cell => cell));
}

// Reset Game
resetButton.addEventListener('click', () => {
  currentPlayer = 'red';
  gameActive = true;
  gameStatus.textContent = "Player 1's Turn (Red)";
  initializeBoard();
});

// Start Game
initializeBoard();
