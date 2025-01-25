const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
const boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start a new game
function startGame() {
    boardState.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('player-X', 'player-O');
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick);
    });
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (boardState[index] !== '' || !gameActive) {
        return; // Ignore if cell is already filled or game is over
    }

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(`player-${currentPlayer}`);

    if (checkWinner()) {
        gameActive = false;
        statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    } else if (boardState.every(cell => cell !== '')) {
        gameActive = false;
        statusText.textContent = "It's a tie! 😞";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

resetButton.addEventListener('click', startGame);

// Initialize the game
startGame();
