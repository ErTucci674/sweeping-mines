/* Copyright(C) 2024 Alessandro Amatucci Girlanda

This file is part of Weeping Mines.

Weeping Mines is free software: you can redistribute it and / or modify it under the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

Weeping Mines is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Weeping Mines. If not, see < https: //www.gnu.org/licenses />. */

const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");

// Remove right click options when boardgame is clicked
const gameContainer = document.querySelector(".game-container");
gameContainer.addEventListener("contextmenu", event => { event.preventDefault(); })

const rows = 10;
const columns = 10;
const totalCells = rows * columns;
const totalBombs = 20;
const maxScore = totalCells - totalBombs;

const EMPTY = 0;
const BOMB = 1;

let cells = Array(rows).fill().map(() => Array(columns).fill(EMPTY));
let insertedBombs = 0;
let score = 0;
let scoreZeros = 0;

// Show number of zeros depending on 'totalCells'
let tmpValue = totalCells;
do {
    tmpValue = Math.floor(tmpValue / 10);
    scoreZeros++;
    scoreCounter.innerText += '0';
} while (tmpValue > 0);

function updateScore() {
    score++;
    scoreCounter.innerText = score.toString().padStart(scoreZeros, '0');
    if (score === maxScore) {
        endGame(true);
    }
}

// Generate Bombs
while (insertedBombs < totalBombs) {
    // Generate a random number between 0 and rows/columns
    const randomRow = Math.floor(Math.random() * rows);
    const randomColumn = Math.floor(Math.random() * columns);

    if (cells[randomColumn][randomRow] != BOMB) {
        cells[randomColumn][randomRow] = BOMB;
        insertedBombs++;
    }

}

// Generate Grid
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
        // Generate cell
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.addEventListener("mousedown", event => {
            // Reveal cell
            if (event.button == 0) {
                cell.classList.remove("cell-flagged");
                // Lose if bomb found
                if (cells[c][r] == BOMB) {
                    cell.classList.add("cell-bomb");
                    endGame(false);
                }
                // 'Activate empty cell'
                else if (!cell.classList.contains("cell-clicked")) {
                    cell.classList.add("cell-clicked");
                    updateScore();

                    // Find bombs around clicked cell
                    let bombCounter = 0;
                    for (let br = r - 1; br <= r + 1; br++) {
                        for (let bc = c - 1; bc <= c + 1; bc++) {
                            // Check the cell is in the grid nad if it contains a bomb
                            if (br >= 0 && br < rows && bc >= 0 && bc < columns && cells[bc][br] == BOMB) {
                                bombCounter++;
                            }
                        }
                    }
                    if (bombCounter != 0) {
                        cellText.innerHTML = bombCounter;
                    }

                }
            }
            // Flag cell
            else if (event.button == 2) {
                if (cell.classList.contains("cell-flagged")) {
                    cell.classList.remove("cell-flagged");
                }
                else if (!cell.classList.contains("cell-clicked")) {
                    cell.classList.add("cell-flagged");
                }
            }
        });

        // Generate text in the cell
        const cellText = document.createElement("div");
        cell.classList.add("cellText");
        cellText.innerHTML = "";

        cell.appendChild(cellText);
        grid.appendChild(cell);
    }
}

function revealAllBombs() {
    const allCells = document.querySelectorAll('.cell');
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (cells[c][r] == BOMB) {
                const cellNum = r * rows + c;
                allCells[cellNum].classList.remove('cell-flagged');
                allCells[cellNum].classList.add('cell-bomb');
            }
        }
    }
}

function endGame(isVictory) {
    if (isVictory) {
        endGameText.innerHTML = "YOU<br>WON";
        endGameScreen.classList.add("win");
    }

    revealAllBombs();
    endGameScreen.classList.remove("hidden");
}

playAgainButton.addEventListener("click", () => {
    window.location.reload();
});