# 💣 Sweeping Mines
_Sweeping Mines_ is inspired by the classic computer game _Minesweeper_. The same mechanics have been implemented but with graphics designed by me. Moreover, the game can be played on either PCs or Phones!

## About the Project 📖
Just like the original game, the objective is to find all of the empty cells while avoiding the mines hidden on the board.

## Game Dynamics 🎲
Unlike the original game, the map is a 10x10 units/cells, hence a total of 100 cells.
20 of these cells contain bombs spread out in random positions all around the grid.
When a non-bomb cell is revealed, a number is revealed in the cell.
The number indicates the number of bombs 1 unit around the cell, from zero to 8.
If no bombs are present around the cell, no number is shown.
The clue can be used by the user to identify/guess the position of bombs in the grid.
The player has a flag at their disposal which can be placed on any empty cell as a bomb-marker.

**IMPORTANT**: the flag can be placed on any cell, bomb or empty.

Whenever one of these cells with a bomb is clicked, the game ends in a lost. Although, if all the empty cells are found, the game ends with a victory instead!

## Built with ⌨️
+ HTML/CSS
+ JavaScrit

## Start Playing 🎮
You can click the following link to open the GitHub web page: https://ertucci674.github.io/sweeping-mines/

Otherwise, download the repository or clone it, then:

Open the index.html file with any browser and start playing! Preferably, use one of the following ones:

+ Google Chrome
+ Mozilla Firefox
+ Microsoft Edge
+ Safari
+ Opera
+ Brave
+ Internet Explorer 11 and later versions

Other applications might work - Bugs should be expected.

## Program and Execute Project 🗔
No compiler is necessary as the game runs on Browsers. JavaScript knowledge is required to modify the program. Just clone the repository in your local machine and start programming:

```
git clone https://github.com/ErTucci674/sweeping-mines.git
```

## Files and Code 📄
The `index.html` file contains the entire structure of the page and game. The `style.css` file contains all of the aesthetics of the game.

### Main File ⚡
The `script.js` file is where the all of the dynamics and logic of the game takes place.

The file begins with the variables setup. During the game, the program will check if a bomb is present in the selected cell. To keep track of the cells' position and contained item a 2d array is used. Each item in the array contains a number equivalent to either `EMPTY` to set it as an empty cells or `BOMB` to "insert" a bomb in the cell. The array is initialized with empty cells at first:

```js
let cells = Array(rows).fill().map(() => Array(columns).fill(EMPTY));
```

A _while loop_ then "generates" a `totalBombs` number of bombs on random positions around the grid while making sure the selected cell is awlays empty. The `cells` array is then updated with a `BOMB` value on the randomly chosen position:

```js
while (insertedBombs < totalBombs) {
    // Generate a random number between 0 and rows/columns
    const randomRow = Math.floor(Math.random() * rows);
    const randomColumn = Math.floor(Math.random() * columns);

    if (cells[randomColumn][randomRow] != BOMB) {
        cells[randomColumn][randomRow] = BOMB;
        insertedBombs++;
    }
}
```

The score value is displayed on the top right corner of the game display. This keeps count of all of the empty cells the player found. The number starts with a series of zeros. The number of zeros represent the number of units needed to form the number of cells in the game (e.g., 100 cells --> 3 zeros OR 1000 cells --> 4 zeros). A _while loop_ calculates the number of zeros needed:

```js
let tmpValue = totalCells;
do {
    tmpValue = Math.floor(tmpValue / 10);
    scoreZeros++;
    scoreCounter.innerText += '0';
} while (tmpValue > 0);
```

The total number of cells is stored in a variable so the original value is not affected. In the _while loop_, the variable is divided by 10 so one unit is counted and a zero added to the Score string. Whenever the variable reaches a value of zero, the _while loop_ stops.

The `updateScore()` function uses the number of zeros counted in the _while loop_ to increment and display the new score by keeping the correct number of zeros.

```js
function updateScore() {
    score++;
    scoreCounter.innerText = score.toString().padStart(scoreZeros, '0');
    if (score === maxScore) {
        endGame(true);
    }
}
```

Next is the **grid generation**. A `grid` class is assigned to a `div` in the _HTML_ file and all the settings (size, colour, position, etc.) are managed by the _CSS_ file. However, the cells are missing and implementing them by hand would make the code chunky and hard to read. Therefore, a couple of _for loops_ do the job for us.

The loops cycle as many times as the values stored in `rows` and `columns`. In each cycle, a `div` element is created and added as a child to the `grid` element. Each cell inherits the `cell` class and a `cellText` element which shows the number of bombs around it.

```js
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
        // Generate cell
        const cell = document.createElement("div");
        cell.classList.add("cell");

        ...

        const cellText = document.createElement("div");
        cell.classList.add("cellText");
        cellText.innerHTML = "";

        cell.appendChild(cellText);
        grid.appendChild(cell);
    }
}
```

Each `cell` also includes two `EventListeners`: right and left mouse clicks. The right click adds or removes the `cell-flagged` class which draws a flag in the cell. The left click reveals the cell instead. A series of _if statements_ check if a bomb is in the selected cell by looking into the `cells` position selected on the grid and checking if a `BOMB` value is stored.

The `revealAllBombs()` function is used at the end of the game (whether the player wins or loses). All of the _cell_ elements are temporarily stored in the `allCells` array. The function goes through the `cells` array with a double _for loop_ and every time a bomb is encountered the `cell-bomb` class is added to the corresponding cell in the `allCells` array so the bomb can be shown.

```js
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
```

The `endGame()` function manages the final illustrations dependant on the game's final outcome. Whether the player wins or loses, the final screen colours and text are determined and shown on top of the board game.

```js
function endGame(isVictory) {
    if (isVictory) {
        endGameText.innerHTML = "YOU<br>WON";
        endGameScreen.classList.add("win");
    }

    revealAllBombs();
    endGameScreen.classList.remove("hidden");
}
```

When the game ends, a _Play Again_ button is shown. This includes an event listener that checks for a mouse click. When the button is clicked, the page is reloaded, hence the game restarted.

```js
playAgainButton.addEventListener("click", () => {
    window.location.reload();
});
```

### Phone Adaptation 📱
On the _CSS_ file, a `@media` is used to see if the screen of the device that accessed the browser is of a certain length. In case it is less than the pre-stablished maximum number, the tutorial text is swapped for a Flag Button.

```css
@media screen and (max-width: 767px) {
    .tutorial-pc {
        display: none;
    }

    .tutorial-phone-btn {
        display: block;
    }
}
```

PC users have the left and right 'click' of a mouse to reveal the cells and place a flag. Phone users have only the 'touch' option, instead. This counts as a mouse left click which is reveals cells. The flag button allows phone users to insert flags as well by changing the 'touch' mode of the game. When the button is clicked and the flag mode is ON, every 'touch'places/removes a flag. Whilst the flag mode is OFF, every 'touch' reveals the selected cell.

```js
tutorialPhoneBtn.addEventListener("click", () => {
    tutorialBtnActive = !tutorialBtnActive;
    if (tutorialBtnActive) {
        tutorialPhoneBtn.classList.add('tutorial-phone-btn-active');
    }
    else {
        tutorialPhoneBtn.classList.remove('tutorial-phone-btn-active');
    }
});
```

## Licence 🖋️
This project is licensed under the terms of the GNU General Public License, version 3.0.