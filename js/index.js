(() => {
const overlay = document.querySelector('[data-overlay]');
const message = document.querySelector('[data-message]');
const restartButton = document.querySelector('[data-restart]');
const player = document.querySelector('[data-player]');
const you = document.querySelector('[data-you]');
const enemy = document.querySelector('[data-enemy]');
const draw = document.querySelector('[data-draw]');
const board = document.querySelector('[data-board]');
const cell = document.querySelectorAll('[data-cell]');

let playerTurn = 'X';
let countX = 0;
let countY = 0;
let countDraw = 0;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

let gameState = ["", "", "", "", "", "", "", "", ""];

const cellEvent = (event) => {
    const key = event.target;
    if (!key.closest('.cell')) return;

    if (key.textContent === "") {
        key.innerHTML = playerTurn
        gameState[key.dataset.cell] = playerTurn;
        turnOrder(playerTurn);
        player.innerHTML = playerTurn;
        playerTurn === 'X' ? key.classList.add('turn-x') : key.classList.add('turn-y');
    }

}

board.addEventListener('click', cellEvent);

player.innerHTML = playerTurn;

const turnOrder = (turn) => {
    checkWinner(winningCombination);
    return playerTurn = turn === 'X' ? "O" : "X";
}

function checkWinner(combo) {
    let hasWon = false;
    for (let i = 0; i < combo.length; i++) {
        const condition = combo[i];
        const a = gameState[condition[0]];
        const b = gameState[condition[1]];
        const c = gameState[condition[2]];

        if (a === "" && b === "" && c === "") {
            continue;
        } else if (a === b && b === c) {
            hasWon = true;
            wonMessage(hasWon);
            break;
        }
    }
    // Draw
    if (!gameState.includes("")) {
        wonMessage(hasWon);
    }
}

const wonMessage = (won) => {
    if (won) {
        message.innerHTML = 'PLAYER ' + playerTurn + ' WON!'
        overlay.style.display = "block";
        if (playerTurn === 'X') {
            countX++;
           return you.innerHTML = countX;
        } else {
            countY++;
           return enemy.innerHTML = countY;
        }
    } else {
        message.innerHTML = 'DRAW'
        overlay.style.display = "block";
        countDraw += 1
        draw.innerHTML = countDraw;
    }
}

const restartGame = () => {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cell.forEach(data => { data.innerHTML = ""; data.classList.remove('turn-x'); data.classList.remove('turn-y'); });
    overlay.style.display = "none";
}

restartButton.addEventListener("click", restartGame);
})();