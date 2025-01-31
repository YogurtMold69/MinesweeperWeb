/**
 * Représente une cellule individuelle du démineur
 */
class Cellule {

    // Coordonnée X de la cellule
    xCoord;

    // Coordonnées Y de la cellule
    yCoord;

    // Le nombre de cellules adjacentes qui contiennent une mine.
    numOfAdjacentMines;

    // Indique si la cellule contient une mine
    hasMine;

    constructor(xCoord, yCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.numOfAdjacentMines = 0;
        this.hasMine = false;
    }

    /**
     * Retourne les cellules voisines dans la matrice.
     *
     * @param grille - La matrice de cellules représentant la grille de jeu
     * @returns Une liste des cellules adjacentes (au plus 8).
     */
    getAdjacentCells(grille) {
        return [
            getCelluleAuxCoordonnees(grille, this.xCoord - 1, this.yCoord - 1),
            getCelluleAuxCoordonnees(grille, this.xCoord, this.yCoord - 1),
            getCelluleAuxCoordonnees(grille, this.xCoord + 1, this.yCoord - 1),

            getCelluleAuxCoordonnees(grille, this.xCoord - 1, this.yCoord),
            getCelluleAuxCoordonnees(grille, this.xCoord + 1, this.yCoord),

            getCelluleAuxCoordonnees(grille, this.xCoord - 1, this.yCoord + 1),
            getCelluleAuxCoordonnees(grille, this.xCoord, this.yCoord + 1),
            getCelluleAuxCoordonnees(grille, this.xCoord + 1, this.yCoord + 1)
        ].filter(element => element != null);// On filtre les cellules nulls avant de retourner la liste
    }
}

/**
 * Génère et retourne une matrice de Cellule selon une taille donnée.
 *
 * @param nbLignes - Nombre de lignes
 * @param nbColonnes - Nombre de colonnes
 * @returns Une matrice d'objet Cellule vide
 */
export function genererGrilleVide(nbLignes, nbColonnes) {
    const grille = [];

    for(let i = 0; i < nbLignes; i++) {
        grille[i] = [];

        for(let j = 0; j < nbColonnes; j++ ) {
            grille[i][j] = new Cellule(i,j);
        }
    }
    return grille;
}


/**
 * Retourne la cellule trouvée aux coordonnées données en paramètres, ou null
 * s'il n'existe pas de cellule à cet endroit dans la matrice.
 *
 * @param grille - La matrice ou on recherche la cellule
 * @param x - Coordonnée X
 * @param y - Coordonnée Y
 * @returns La cellule trouvée ou null
 */
function getCelluleAuxCoordonnees(grille, x, y) {
    if (x >= 0 && x < grille.length && y >= 0 && y < grille[x].length) {
        return grille[x][y];  // Return the object if coordinates are valid
    }
    return null;
}


/**
 * Cette fonction incrémente les attributs numOfAdjacentMines des cellules adjacentes à
 * une cellule donnée.
 *
 * @param cellWithMine - La cellule contenant une mine
 * @param grille - La matrice de cellules
 */
export function remplirGrille(cellWithMine, grille) {
    const adjacentCellsArray = cellWithMine.getAdjacentCells(grille);

    adjacentCellsArray.forEach(function(adjCell) {
        adjCell.numOfAdjacentMines += 1;
    });
}


/**
 * Cette fonction ajoute les mines dans la grille.
 * La difficulté représente directement le nombre de mines à placer (ex. difficulté = 5 -> 5 mines à placer).
 *
 * @param grilleVide - La matrice vide (sans mines)
 * @param difficulte - La difficulté choisie par l'utilisateur. Doit être un entier > 0.
 */
export function ajouterBombes(grilleVide, difficulte) {
    const hauteur = grilleVide[0].length;
    const largeur = grilleVide.length;

    let minesAPlacer = difficulte;

    // On loop tant qu'il reste des mines à placer
    while(minesAPlacer > 0) {

        // Choisi une cellule au hazard à l'interieur des dimensions de la grille (inclusivement)
        let cell = grilleVide[Math.floor(Math.random() * (hauteur))][Math.floor(Math.random() * (largeur))];

        // On s'assure de ne pas override une cellule qui contient déjà une mine.
        // Dans ce cas, on recommence la boucle sans décrémenter le compteur.
        if(cell.hasMine === false) {
            cell.hasMine = true;

            // On met à jour les cellules adjacentes
            remplirGrille(cell, grilleVide);

            console.log("Mine placed.")

            minesAPlacer -= 1;
        }
    }
}

/**
 * Cette fonction est appelée à chaque fois que l'utilisateur clique sur une cellule
 * pour comptabiliser le nombre total de cellules qui sont révélées.
 *
 * @returns Le nombre de cellules qui ont été révélées.
 */
export function compterCellulesVisibles() {
    return $('.cell').filter(function() {
            return $(this).data('is-hidden') === false;
        }).length;
}