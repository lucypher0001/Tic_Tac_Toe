const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            if (gameBoard[a] === 'X') {
                playerXScore++;
            } else {
                playerOScore++;
            }
            updateScoreboard();
            return gameBoard[a];
        }
    }
    return null;
}

function checkTie() {
    return !gameBoard.includes('');
}

function handleClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameBoard[cellIndex] || checkWinner()) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer);

    const winner = checkWinner();
    if (winner) {
        status.innerText = `Player ${winner} wins!`;
    } else if (checkTie()) {
        status.innerText = "It's a tie!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.innerText = `Player ${currentPlayer}'s turn`;
    }
}

// Add a scoreboard
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');

let playerXScore = 0;
let playerOScore = 0;

function updateScoreboard() {
    playerXScoreDisplay.innerText = playerXScore;
    playerOScoreDisplay.innerText = playerOScore;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    status.innerText = "Player X's turn";
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });
    updateScoreboard(); // Update the scoreboard after each reset
}

resetButton.addEventListener('click', resetGame);

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
}

resetGame();