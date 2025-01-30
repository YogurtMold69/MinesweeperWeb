import {initPartie, createBoard, updateBoard} from "./modules/demineur.js";
import {revealAllCells} from "./modules/utils/debugger.js";

$(document).ready(function() {

    //---------- Creation des cellules de jeu ----------//
    createBoard(10, 10);
    initPartie(0.15);



    //---------- Ecouteurs d'evenements ----------//

    // Gestion du bouton reset
    $('#reset').click(function() {
        initPartie(0.15);
    })

    const cells = $('.cell');
    cells.each(function() {
        const cell = $(this);


        // Gestion click gauche (Reveler cellule)
        cell.click(function() {

            // On peut seulement devoile la cellule si
            // n'a pas de drapeau dessus
            if(cell.html() !== "🚩") {

                // Detection de la mine :
                if (this.className.match(".mine")) {
                    //FIXME: Condition d'arret pas implementee
                    revealAllCells();
                    alert("Kaboom!")

                } else {
                    updateBoard(this);
                }
            }
        });


        // Gestion click droit (Placer drapeau)
        cell.contextmenu(function(event) {
            event.preventDefault();

            // On peut seulement placer des drapeaux sur des cases
            // que l'utilisateur n'a pas encore devoile
            if (this.dataset.isHidden.match("true")) {
                // Fonction du click-droit pour placer un drapeau
                if (cell.html() !== "🚩") {
                    cell.html("🚩")
                } else {
                    cell.html(" ");
                }
            }
        });
    });
});

