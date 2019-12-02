let grid = []; //Connect 4 Array, stores colour of disc
let gameInPlay = false; //Stop play on win, restart required
let currentColor = 'red'; //First disc is red


//Restart Game
window.restart = () => {

    grid = [
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}],
    ];

    render();

    document.getElementById("winnerAlert").innerHTML = " "; //Blank out winner alert
    gameInPlay = true; //Start play
    //console.log("Grid Length", grid.length);
}

//Alert to announce game winner
winnerAlert = (color) =>{
    gameInPlay = false; //Stop play until restart
    document.getElementById("winnerAlert").style.color = color;
    document.getElementById("winnerAlert").innerHTML = `And the winner is ${color}`;
}

//Set up the Connect 4 Grid and update it after a player drops disc
const render = () => {
    const svg = document.getElementById('svg');//HTML of Grid
    let doc = ``;
    for (var i = 0; i < grid.length; i++) {
        row = grid[i];
        for (var j = 0; j < row.length; j++) {
            const square = grid[i][j];
            //console.log(i,j);
            const color = square && square.color || 'gray'; //Set initial background to gray
            doc = doc + `<circle onclick = "clickSquare(${j},${i})" cx='${j * 70 + 50}px' cy='${i * 70 + 50}px' r='30px' fill='${color}'></circle>`;
        }

    }
    svg.innerHTML = doc;
};


window.clickSquare = (x, y) => {
    //console.log("You clicked square", x, y);
    if (!gameInPlay) {
        return;
    }
    for (var i = grid.length - 1; i >= 0; i--) {
        //Place disc at lowest allowed position in row
        row = grid[i];
        var targetPlace = row[x];
        //console.log("Row = ", i,"Y = ", y, "Target Place = ", x);
        //console.log(y, targetPlace);
        if (!targetPlace.color) {
            row[x] = { color: currentColor };
            currentColor = currentColor === "red" ? "blue" : "red"; //Change disc colour
            render();
            checkWinner();
            return;
        }
    }

}

// Checks for a winner
checkWinner = () => {
    //console.log("Is there a winner");
    for (var i = 0; i < grid.length; i++) {
        row = grid[i];
        for (var j = 0; j < row.length; j++) {
            const square = grid[i][j];
            if (square && square.color) {
                if (i === 0 || i === 1 || i === 2) {
                    //Check Verticals
                    if (grid[i + 1][j].color === square.color &&
                        grid[i + 2][j].color === square.color &&
                        grid[i + 3][j].color === square.color) {
                        winnerAlert(square.color);
                        //console.log("Colour square ", square.color, " vertical wins!!");
                        return;
                    }
                }

                if (j === 0 || j === 1 || j === 2 || j === 3) {
                    //Check Horizontals
                    if (grid[i][j + 1].color === square.color &&
                        grid[i][j + 2].color === square.color &&
                        grid[i][j + 3].color === square.color) {
                        winnerAlert(square.color);
                        //console.log("Colour square ", square.color, " horizontal wins!!");
                        return;
                    }

                }
                if (i === 0 || i === 1 || i === 2) {
                    if (j === 0 || j === 1 || j === 2 || j === 3) {
                        //Check Diagonal
                        if (grid[i + 1][j + 1].color === square.color &&
                            grid[i + 2][j + 2].color === square.color &&
                            grid[i + 3][j + 3].color === square.color) {
                            winnerAlert(square.color);
                            //console.log("Colour square ", square.color, " diagonal wins!!");
                            return;
                        }
                    }
                    if (j === 3 || j === 4 || j === 5 || j === 6) {
                        //Check Opposite Diagonal
                        if (grid[i + 1][j - 1].color === square.color &&
                            grid[i + 2][j - 2].color === square.color &&
                            grid[i + 3][j - 3].color === square.color) {
                            winnerAlert(square.color);
                            //console.log("Colour square ", square.color, " other diagonal wins!!");
                            return;
                        }
                    }
                }
            }

        }
    }
}

restart();