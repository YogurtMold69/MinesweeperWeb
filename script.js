import {ajouterBombes, compterCellulesVisibles, genererGrilleVide} from "./modules/logiqueDeJeu.js";
import {afficherGrille, mettreAJourGrille, revelerMines} from "./modules/affichage.js";


// Constantes
const DIMENSION_GRILLE = 500;

const DIFFICULTE_DE_BASE = 5;
const DIFFICULTE_FACILE = 5;
const DIFFICULTE_MOYEN = 30;
const DIFFICULTE_DIFFICILE = 140;

$(document).ready(function() {

    // Generation d'une grille initale
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
})


function initialiserDemineur(DIMENSION_GRILLE, difficulte, nbLigne) {
    console.log("Emptying previous grid...");

    $("#grille-jeu").empty();


    console.log("Previous grid emptied.");
    console.log("Grid dimension set to " + DIMENSION_GRILLE);
    console.log("Difficulty set to " + difficulte)
    console.log("Generating initial grid...");


    const grille = genererGrilleVide(nbLigne,nbLigne);


    console.log("Initial grid generated.");
    console.log(grille);
    console.log("Placing mines...");


    ajouterBombes(grille, difficulte);


    console.log("Generating HTML...");


    afficherGrille(grille, DIMENSION_GRILLE);


    console.log("HTML successfully generated.");

    $('#grille-jeu').click(function () {
        alert("Partie terminée. Clicker sur une difficulté pour recommencer.")
    })


    // Gestion click gauche sur les cellules
    $('.cell').click(function(event) {
        event.stopPropagation();

        if($(this).hasClass('mine')) {
            $(this).text("💣");
            $(this).css('background', "red");


            // Assure que la grille est modifiée avant d'envoyer l'alerte
            setTimeout(function() {
                alert('Kaboum!');
            }, 1);

            // Desactive l'ecouteur
            $('.cell').off('click');
        }
        else {
            mettreAJourGrille(this);


            if(compterCellulesVisibles() === (Math.pow(nbLigne, 2) - difficulte)) {
                // Toutes les cellules possibles (nbTotal - nbDeMines)
                // ont été révélés ; l'utilisateur a gagné

                revelerMines();


                // Assure que la grille est modifiée avant d'envoyer l'alerte
                setTimeout(function() {
                    alert("Vous avez gagné!");
                }, 1);

                // Desactive l'ecouteur
                $('.cell').off('click');
            }
        }
    });

    // Gestion click droit pour placer drapeau
    $('.cell').contextmenu(function(event) {
        event.preventDefault();
        event.stopPropagation();

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
