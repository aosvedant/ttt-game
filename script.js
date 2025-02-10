const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusMessage = document.getElementById("statusMessage");
const restartButton = document.getElementById("restartButton");
const startGameButton = document.getElementById("startGame");
const winnerPopup = document.getElementById("winnerPopup");
const winnerNameDisplay = document.getElementById("winnerName");
const newGameButton = document.getElementById("newGameButton");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let playerXName = '';
let playerOName = '';

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

// Function to start the game after getting player names
function startGame() {
    playerXName = document.getElementById("playerX").value || "Player X";
    playerOName = document.getElementById("playerO").value || "Player O";
    
    // Show board and restart button
    board.style.display = 'grid';
    restartButton.style.display = 'block';
    startGameButton.style.display = 'none';
    
    statusMessage.textContent = `${playerXName}'s turn`;
    
    // Reset the game state
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('playerX', 'playerO');
        cell.addEventListener("click", handleClick); // Set up event listener
    });
}

// Function to handle a player's move
function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== "" || !gameActive) return;

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(`player${currentPlayer}`);

    checkResult();
    if (gameActive) switchPlayer();
}

// Function to switch between players
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const currentPlayerName = currentPlayer === "X" ? playerXName : playerOName;
    statusMessage.textContent = `${currentPlayerName}'s turn`;
}

// Function to check if there's a winner or draw
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === "" || boardState[b] === "" || boardState[c] === "") {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        const winnerName = currentPlayer === "X" ? playerXName : playerOName;
        displayWinner(winnerName);
        return;
    }

    // Check for a draw
    if (!boardState.includes("")) {
        statusMessage.textContent = "It's a draw!";
        gameActive = false;
    }
}

// Function to display the winner
function displayWinner(winnerName) {
    winnerNameDisplay.textContent = `${winnerName} wins!`;
    winnerPopup.style.display = "flex"; // Show the winner popup
}

// Event listeners for buttons
startGameButton.addEventListener("click", startGame);
newGameButton.addEventListener("click", () => {
    winnerPopup.style.display = "none"; // Hide the popup
    startGame(); // Restart the game
});

restartButton.addEventListener("click", () => {
    winnerPopup.style.display = "none"; // Hide the popup if it's open
    startGame(); // Restart the game
});

// Add event listeners to cells
cells.forEach(cell => {
    cell.addEventListener("click", handleClick); // Set up event listener
});