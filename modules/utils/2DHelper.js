/* @return Retourne une liste des cellules adjacentes de la cellule qu'on donne en parametre
 * sur le plateau de jeu (grille 2d).
 */
export function getAdjacentCells(cell) {
    const xCoord = parseInt(cell.dataset.x);
    const yCoord = parseInt(cell.dataset.y);

    //console.log(cell);

    /*
    On declare une liste avec les 8 cellules adjacentes potentielles grace a un indexage relatif :
    [-1,-1]  [-1, 0]   [-1,+1]
    [0, -1]            [0, +1]
    [+1,-1]  [+1, 0]   [+1,+1]

    Les cellules qui bordurent le plateau auront des cellules voisines
    dont les coordonnees sont 'out-of-bounds' de la grille de jeu
    ce qui donne 'undefined' lorsqu'on fait la recherche jQuery
    */
    const neighbors = [
        $(`.cell[data-x="${xCoord - 1}"][data-y="${yCoord - 1}"]`).get(0), // $() donne une liste d'element meme s'il y en a 1 seul
        $(`.cell[data-x="${xCoord}"][data-y="${yCoord - 1}"]`).get(0),
        $(`.cell[data-x="${xCoord + 1}"][data-y="${yCoord - 1}"]`).get(0),

        $(`.cell[data-x="${xCoord - 1}"][data-y="${yCoord}"]`).get(0),
        $(`.cell[data-x="${xCoord + 1}"][data-y="${yCoord}"]`).get(0),

        $(`.cell[data-x="${xCoord - 1}"][data-y="${yCoord + 1}"]`).get(0),
        $(`.cell[data-x="${xCoord}"][data-y="${yCoord + 1}"]`).get(0),
        $(`.cell[data-x="${xCoord + 1}"][data-y="${yCoord + 1}"]`).get(0)
    ];

    // On peut les retirer de la liste
    neighbors.filter(item => item !== undefined); //FIXME: Cette methode ne fonctionne pas, je ne sais pas pourquoi.

    return neighbors;
}