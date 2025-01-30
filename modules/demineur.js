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

            // Chaque cellule a les attributs suivants :
            // classe "cell" pour iterer avec querySelector()
            // coordonnee x,
            // coordonnee y,
            // nombre de mines adjacentes a la case,
            // un boolean pour savoir si la case est revelee ou cachee

            const td = document.createElement("td");

            td.className = "cell";
            td.dataset.y = i.toString();
            td.dataset.x = j.toString();
            td.dataset.nbOfMines = "0";
            td.dataset.isHidden = "true";

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
        cell.textContent = "";
        cell.dataset.nbOfMines = "0";
        cell.style.backgroundColor = "lightgray";
    }


    // On genere un float de 0 a 1 et on le compare a la difficulte predefinie,
    // Pour determiner si une cellule est une mine ou non
    for (let cell of cells) {
        if (Math.random() <= difficulty) {

            //on donne une classe supplementaire aux cellules "mines"
            // pour iterer avec querySelector()
            cell.classList.add("mine");
        }
    }

    // Une fois que les mines sont placees; on
    // met a jour les cellules adjacentes
    const mines = document.querySelectorAll(".mine");
    for (const mine of mines) {
        const neighbors = getAdjacentCells(mine);

        // On incremente de 1
        // l'attribut nbOfMines de chaque cellule adjacente
        for (const neighbor of neighbors) {
            if(neighbor !== undefined) {
                let nbOfMines = parseInt(neighbor.dataset.nbOfMines);
                nbOfMines += 1;
                neighbor.dataset.nbOfMines = nbOfMines.toString();
            }
        }
    }
}

export function updateBoard(cell) {
    if(cell.dataset.isHidden === "true") {
        cell.dataset.isHidden = "false";
        cell.textContent = cell.dataset.nbOfMines;

        console.log("blejhh")
        if (cell.dataset.nbOfMines !== "0") {
            console.log("heelo!")
            return;
        }

        const adjacentCells = getAdjacentCells(cell);

        for (const adjCell of adjacentCells) {

            if(adjCell !== undefined){
                updateBoard(adjCell);
            }
        }
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




