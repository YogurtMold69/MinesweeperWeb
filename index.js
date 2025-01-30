import {initPartie, createBoard, updateBoard, debugOnlyShowCells} from "./modules/demineur.js";

$(document).ready(function() {


    //---------- Creation des cellules de jeu ----------//
    createBoard(10, 10);
    initPartie(0.15);


    //---------- Gestion du bouton reset ----------//
    $('#reset').click(function() {
        initPartie(0.15);
    })


    //---------- Gestion cases----------//
    const cells = $('.cell');

    cells.each(function() {
        const cell = $(this);

        cell.click(function() {

            if(this.className.match(".mine")) {
                debugOnlyShowCells();
            } else {
                updateBoard(this);
            }
        });

        cell.contextmenu(function(event){
            event.preventDefault();

            // Fonction du click-droit pour placer un drapeau
            if(cell.html() !== "🚩") {
                cell.html("🚩");
            }
            else {
                cell.html(" ");
            }
        });
    });
});

