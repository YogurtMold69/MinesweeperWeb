/*
Une Cellule possède 4 attributs ; sa position x (int), sa position y (int), le nombre de mines adjacentes (int),
si la cellule est révélée au joueur ou non (boolean) et si la cellule contient une mine (boolean).

Elle possède la méthode getAdjacentCells() pour obtenir les cases adjacentes à celle-ci.
 */
class Cellule {
    xCoord;
    yCoord;
    numOfAdjacentMines;
    hasMine;

    constructor(xCoord, yCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.numOfAdjacentMines = 0;
        this.hasMine = false;
    }

    // Retourne une liste qui contient les huit cellules adjacentes
    getAdjacentCells(grille) {
         // On filtre les cellules nulls avant de retourner la liste
        return [
            getCelluleAuxCoordonnees(grille, this.xCoord - 1, this.yCoord - 1),
            getCelluleAuxCoordonnees(grille, this.xCoord, this.yCoord - 1),
            getCelluleAuxCoordonnees(grille, this.xCoord + 1, this.yCoord - 1),

            getCelluleAuxCoordonnees(grille, this.xCoord - 1, this.yCoord),
            getCelluleAuxCoordonnees(grille, this.xCoord + 1, this.yCoord),

            getCelluleAuxCoordonnees(grille, this.xCoord - 1, this.yCoord + 1),
            getCelluleAuxCoordonnees(grille, this.xCoord, this.yCoord + 1),
            getCelluleAuxCoordonnees(grille, this.xCoord + 1, this.yCoord + 1)
        ].filter(element => element != null);
    }
}

/*
Génère un tableau à deux dimensions qui servira comme grille de jeu pour contenir les cellules.

@params nbLignes : Largeur du tableau
@params nbColonnes : Hauteur du tableau
 */
export function genererGrille(nbLignes, nbColonnes) {
    const grille = [];

    for(let i = 0; i < nbLignes; i++) {
        grille[i] = [];

        for(let j = 0; j < nbColonnes; j++ ) {
            grille[i][j] = new Cellule(i,j);
        }
    }

    return grille;
}




/*
@returns La cellule de la grille si elle existe ou null si les coordonnées sont out-of-bounds.
 */
function getCelluleAuxCoordonnees(grille, x, y) {
    if (x >= 0 && x < grille.length && y >= 0 && y < grille[x].length) {
        return grille[x][y];  // Return the object if coordinates are valid
    }
    return null;
}


/* Pour chaque mine, on traverse leurs cellules adjacentes
 et on incrémente de 1 leur attribut numOfAdjacentMine
 */
export function remplirGrille(cell, grille) {
    const adjacentCellsArray = cell.getAdjacentCells(grille);

    adjacentCellsArray.forEach(function(adjCell) {
        adjCell.numOfAdjacentMines += 1;
    });
}


/*
Place un nombre de mines predeterminé par la difficulté dans
la grille de jeu. Chaque "point" de difficulté
équivaut au nombre de mines à placer dans la grille.

@params grille : Tableau 2D de nombres
@params difficulte : Doit être un nombre entier >0.
 */
export function ajouterBombes(grille, difficulte) {
    const hauteur = grille[0].length;
    const largeur = grille.length;

    while(difficulte > 0) {

        //Choisi une cellule au hazard à l'interieur des dimensions de la grille (inclusivement)
        let cell = grille[Math.floor(Math.random() * (hauteur))][Math.floor(Math.random() * (largeur))];

        // Condition supplementaire pour ne pas override une min
        // Sinon, on boucle sans décrémenter le compteur
        if(cell.hasMine === false) {
            cell.hasMine = true;
            remplirGrille(cell, grille);
            console.log("Mine placed.")

            difficulte -= 1;
        }
    }
}



/*
    Cette methode est appelee lorsqu'on clique sur une cellule.
    Elle s'occupe de reveler la case choisie ainsi que toutes les cellules '0' adjacentes.

    @params cell : Reference vers la cellule cliquee.
 */
export function mettreAJourCellules(cell) {

    console.log('iterating updateBoard()...')

    // On ne veut pas iterer sur les cellules déjà revelées ;
    // On travaille seulement les cellules encore cachées
    if($(cell).data('is-hidden') === true) {

        // On "révèle" la cellule
        $(cell).data('is-hidden', false);

        // On revele la cellule
        $(cell).text($(cell).data('num-of-adjacent-mines'));

        // Condition de base de la recursion
        if ($(cell).data('num-of-adjacent-mines') !== 0) {
            console.log("exited on base condition")
            return;
        }

        console.log($(cell).data('x'), $(cell).data('y'))
        const adjacentCells = getAdjacentDivs($(cell).data('x'), $(cell).data('y'));

        console.log(adjacentCells)

        for (const adjCell of adjacentCells) {
            // La fonction va recurser sur toutes ses cellules adjacentes
            // tant que son nombre de mines adjacentes est 0.
            console.log('RECURSIOOONNNNNN ENGAGEDDD')

            mettreAJourCellules(adjCell);
        }
    }
}


/*
@params x : Coordonnee x d'un div de la grille
@params y : Coordonnee y d'un div de la grille
@returns Un array contenant tous les divs adjacents
 */
function getAdjacentDivs(x, y) {


    return $('.cell').filter(function () {

            // Selecteurs générés par Chat-GPT o4
        return  $(this).data('x') === x - 1 && $(this).data('y') === y - 1 ||
                $(this).data('x') === x && $(this).data('y') === y - 1 ||
                $(this).data('x') === x + 1 && $(this).data('y') === y - 1 ||

                $(this).data('x') === x - 1 && $(this).data('y') === y ||
                $(this).data('x') === x + 1 && $(this).data('y') === y ||

                $(this).data('x') === x - 1 && $(this).data('y') === y + 1 ||
                $(this).data('x') === x && $(this).data('y') === y + 1 ||
                $(this).data('x') === x + 1 && $(this).data('y') === y + 1;
    }).toArray().filter(element => element !== undefined);
}