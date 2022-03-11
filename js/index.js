const board = document.querySelector('[data-board]');
const message = document.querySelector('[data-message]');
const player = document.querySelector('[data-player]');
const restartButton = document.querySelector('[data-restart]');
const cell = document.querySelectorAll('[data-cell]');
const you = document.querySelector('[data-you]');
const enemy = document.querySelector('[data-enemy]');
const draw = document.querySelector('[data-draw]');

let playerTurn = 'X';
let countX = 1;
let countY = 1;
let countDraw = 1;

const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

let gameState = ["", "", "", "", "", "", "", "", ""];

const gameActive = (event) => {
    const key = event.target;
    if (!key.closest('.cell')) return;

    if (key.textContent === "") {

        key.innerHTML = playerTurn
        gameState[key.dataset.cell] = playerTurn;
        turnOrder(playerTurn);
        player.innerHTML = playerTurn;
    }

}

board.addEventListener('click', gameActive);

player.innerHTML = playerTurn;

const turnOrder = (turn) => {
    checkWinner(winningComb);
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
            wonMessage(playerTurn, hasWon);
            break;
        }
    }

    if (!gameState.includes("")) {
        wonMessage(hasWon);
    }
}

const wonMessage = (won) => {
    if (won) {
        message.innerHTML = 'PLAYER ' + playerTurn + ' WON!'
        document.getElementById("overlay").style.display = "block";
        if (playerTurn === 'X') {
            you.innerHTML = countX++;
        } else {
            enemy.innerHTML = countY++;
        }
    } else {
        message.innerHTML = 'DRAW'
        document.getElementById("overlay").style.display = "block";
        draw.innerHTML = countDraw++;
    }
}


const restartGame = () => {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cell.forEach(data => data.innerHTML = "");
    document.getElementById("overlay").style.display = "none";
}

restartButton.addEventListener("click", restartGame);
