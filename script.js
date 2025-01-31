import {ajouterBombes, genererGrille, mettreAJourCellules} from "./modules/logiqueDeJeu.js";
import {afficherGrille, revelerToutesLesCellules} from "./modules/affichage.js";

$(document).ready(function() {
    const DIMENSION_GRILLE = 500;

    const DIFFICULTE_DE_BASE = 5;

    const DIFFICULTE_FACILE = 5;
    const DIFFICULTE_MOYEN = 30;
    const DIFFICULTE_DIFFICILE = 140;

    let grille = initialiserDemineur(DIMENSION_GRILLE, DIFFICULTE_DE_BASE, 5);

    // Gestion du bouton facile
    $('#facile').click(function() {
        grille = initialiserDemineur(DIMENSION_GRILLE, DIFFICULTE_FACILE, 5);
    })

    // Gestion du bouton moyen
    $('#moyen').click(function() {
        grille = initialiserDemineur(DIMENSION_GRILLE, DIFFICULTE_MOYEN, 10);
    })

    // Gestion du bouton difficile
    $('#difficile').click(function() {
        grille = initialiserDemineur(DIMENSION_GRILLE, DIFFICULTE_DIFFICILE, 20);
    })

    console.log("Now listening for mouse click.")
})


function initialiserDemineur(DIMENSION_GRILLE, difficulte, nbLigne) {
    console.log("Emptying previous grid...");

    $("#grille-jeu").empty();


    console.log("Previous grid emptied.");
    console.log("Grid dimension set to " + DIMENSION_GRILLE);
    console.log("Difficulty set to " + difficulte)
    console.log("Generating initial grid...");


    const grille = genererGrille(nbLigne,nbLigne);


    console.log("Initial grid generated.");
    console.log(grille);
    console.log("Placing mines...");


    ajouterBombes(grille, difficulte);


    console.log("Generating HTML...");


    afficherGrille(grille, DIMENSION_GRILLE);


    console.log("HTML successfully generated.");

    // Gestion click gauche sur les cellules
    $('.cell').click(function() {
        //alert($(this).data('y') + ", " + $(this).data('x'));

        if($(this).hasClass('mine')) {
            revelerToutesLesCellules();

            setTimeout(function() {
                alert('Kaboum!');
            }, 1);

            $(this).prop('disabled', true);
        }
        else {
            mettreAJourCellules(this);
        }
    });

    // Gestion click droit pour placer drapeau
    $('.cell').contextmenu(function(event) {
        event.preventDefault();

        // On peut seulement placer des drapeaux sur des cases
        // que l'utilisateur n'a pas encore devoilees
        if ($(this).data('is-hidden')) {

            if ($(this).text() !== "🚩") {

                $(this).text("🚩")
            }
            else {
                $(this).text(" ");
            }
        }
    });

    return grille;
}
