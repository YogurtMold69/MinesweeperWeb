//---------- debugging ----------//

export function revealAllCells() {
    const cells = $('.cell');

    for (const cell of cells) {
        if(cell.classList.contains("mine")) {
            cell.textContent = "💣";
        } else {
            cell.textContent = cell.dataset.nbOfMines;
        }
    }
}
