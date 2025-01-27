import { getAdjacentCells} from "./utils/2DHelper.js";

//---------- Creation d'un plateau de jeu ---------//

/* Creer une table HTML pour stocker les cellules de jeu.
 * A la creation, on attribue a chaque cellule une abscisse (X), une ordonnee (Y) et le nombre de mines adjacentes.
 * @params columnLength : La hauteur de la grille.
 * @params rowLength : La Largeur de la grille.
 */
export function createBoard(rowLength, columnLength) {
    const board = document.querySelector("#board");

    for (let i = 0; i < rowLength; i++) {
        const ligne = document.createElement("tr");
        for (let j = 0; j < columnLength; j++) {

            // Attribution de la classe
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

/* Ajoute les mines au hasard sur le plateau
de jeu et on met a jour les cellules voisines.

@params difficulty : float de 0 a 1. Determine le pourcentage de mines presentes sur le plateau.
 */
export function initPartie(difficulty) {
    const cells = document.querySelectorAll(".cell");

    // Efface les mines precedentes
    for (let cell of cells) {
        cell.classList.remove("mine");
        cell.dataset.nbOfMines = "0";
        cell.style.backgroundColor = "lightgray";
    }

    // Pour determiner si une cellule est une mine,
    // On genere un nombre de 0 a 1 et on le compare a la difficulte predefinie.
    for (let cell of cells) {
        if (Math.random() <= difficulty) {
            cell.classList.add("mine");
        }
    }

    // Met a jour les cellules adjacentes aux mines
    const mines = document.querySelectorAll(".mine");
    for (const mine of mines) {
        const neighbors = getAdjacentCells(mine);

        // On incremente l'attribut nbOfMines de chaque cellule adjacente
        // qui n'est pas elle-meme une mine
        for (const neighbor of neighbors) {
            console.log(neighbor); //Debugging

            if(neighbor !== undefined) {
                let nbOfMines = parseInt(neighbor.dataset.nbOfMines);
                nbOfMines += 1;
                neighbor.dataset.nbOfMines = nbOfMines.toString();
            }
        }
    }
}

export function updateBoard(cell) {
    if (cell.dataset.nbOfMines !== "0") {
        return;
    }

    cell.html(cell.dataset.nbOfMines.toString());
    const adjacentCells = getAdjacentCells(cell);
    for (const adjCell of adjacentCells) {
        updateBoard(adjCell);
    }
}






//---------- debugging ----------//

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




