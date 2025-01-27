//---------- Creation d'un plateau de jeu ---------//

export function createBoard() {
    const board = document.querySelector("#board");

    // Le jeu sera de 32x16
    for (let i = 0; i < 16; i++) {

        // Tout sera stocker dans un table HTML
        const ligne = document.createElement("tr");

        for (let j = 0; j < 32; j++) {

            // Creation de la cellule
            const td = document.createElement("td");
            td.className = "cell";

            // On donne a chaque cellule des attributs pour leurs
            // coordonnees X et Y
            // et le nombre de mines ajacentes
            td.dataset.y = i.toString();
            td.dataset.x = j.toString();
            td.dataset.nbOfMines = "0";

            ligne.appendChild(td);
        }
        board.appendChild(ligne);
    }
}






//---------- Initialiser la partie ----------//

export function initPartie() {
    const cells = document.querySelectorAll(".cell");
    const board = document.querySelector("#board");

// Enleve les mines precedentes
    for (let cell of cells) {
        cell.classList.remove("mine");
        cell.dataset.nbOfMines = "0";
        cell.style.backgroundColor = "lightgray";
    }

// Place les nouvelles mines
// Chaque case a 15% de chance d'etre une mine
    for (let cell of cells) {
        if (Math.random() <= 0.15) {
            cell.classList.add("mine");
        }
    }

// Met a jour les cases a cote des mines
    const mines = document.querySelectorAll(".mine");
    console.log(mines.length);
    for (let i = 0; i < mines.length; i++) {
        const mine = mines[i];

        // On recupere les coordonnees de la mine pour indexer relativement
        // les cellules voisines (x-1, x+1, y-1, y+1, etc...)
        // On fait +1 pour prendre compte de l'indexage a partir de 0
        const x = parseInt(mine.dataset.x) + 1;
        const y = parseInt(mine.dataset.y) + 1;

        const neighbors = [
            board.querySelector(`tr:nth-child(${y - 1}) td:nth-child(${x - 1})`),
            board.querySelector(`tr:nth-child(${y - 1}) td:nth-child(${x})`),
            board.querySelector(`tr:nth-child(${y - 1}) td:nth-child(${x + 1})`),

            board.querySelector(`tr:nth-child(${y}) td:nth-child(${x - 1})`),
            board.querySelector(`tr:nth-child(${y}) td:nth-child(${x + 1})`),

            board.querySelector(`tr:nth-child(${y + 1}) td:nth-child(${x - 1})`),
            board.querySelector(`tr:nth-child(${y + 1}) td:nth-child(${x})`),
            board.querySelector(`tr:nth-child(${y + 1}) td:nth-child(${x + 1})`)
        ]

        // On met a jour le nombre de mine pour chaque cases voisines
        // qui existe et qui n'est pas elle-meme une mine
        for (let neighbor of neighbors) {
            console.log(neighbor); //Debugging

            if(neighbor != null && !neighbor.classList.contains("mine")) {
                let nbOfMines = parseInt(neighbor.dataset.nbOfMines);
                nbOfMines += 1;
                neighbor.dataset.nbOfMines = nbOfMines.toString();
            }
        }
    }
}

export function updateBoard(cell) {

}

export function debugOnlyShowCells() {
    const cells = $('.cell');

    for (const cell of cells) {
        if(cell.classList.contains("mine")) {
            cell.textContent = "💣";
        } else {
            cell.textContent = cell.dataset.nbOfMines;
        }
    }
}




