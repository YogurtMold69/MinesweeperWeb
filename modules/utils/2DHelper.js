/* @return Retourne une liste des cellules adjacentes de la cellule qu'on donne en parametre
 * sur le plateau de jeu (grille 2d).
 */
export function getAdjacentCells(cell) {

    // On recupere les coordonnees de la mine les cellules voisines
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);

    console.log(cell);

    // On cree un arraylist et on insere immediatement les cellules voisines
    // grace a l'indexage relatif :
    // [-1,-1]  [-1, 0]   [-1,+1]
    // [0, -1]  [ x, y]   [0, +1]
    // [+1,-1]  [+1, 0]   [+1,+1]
    const neighbors = [
        $(`.cell[data-x="${x - 1}"][data-y="${y - 1}"]`).get(0),
        $(`.cell[data-x="${x}"][data-y="${y - 1}"]`).get(0),
        $(`.cell[data-x="${x + 1}"][data-y="${y - 1}"]`).get(0),

        $(`.cell[data-x="${x - 1}"][data-y="${y}"]`).get(0),
        $(`.cell[data-x="${x + 1}"][data-y="${y}"]`).get(0),

        $(`.cell[data-x="${x - 1}"][data-y="${y + 1}"]`).get(0),
        $(`.cell[data-x="${x}"][data-y="${y + 1}"]`).get(0),
        $(`.cell[data-x="${x + 1}"][data-y="${y + 1}"]`).get(0)
    ];

    neighbors.filter(item => item !== undefined);

    return neighbors;
}