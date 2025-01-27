import {initPartie, createBoard, updateBoard, debugOnlyShowCells} from "./modules/demineur.js";

$(document).ready(function() {


    //---------- Creation des cellules de jeu ----------//
    createBoard();
    initPartie();

    debugOnlyShowCells();


    //---------- Gestion du bouton reset ----------//
    $('#reset').click(function() {
        initPartie();
    })


    //---------- Gestion cases----------//
    const cells = $('.cell');

    cells.each(function() {
        const cell = $(this);

        cell.click(function() {
            updateBoard(cell);
        });

        cell.contextmenu(function(event){
            event.preventDefault();

            // Fonction du click-droit pour placer un drapeau
            if(cell.html() !== "🚩") {
                cell.html("🚩");
            }
            else {
                cell.html("");
            }
        });
    });
});

