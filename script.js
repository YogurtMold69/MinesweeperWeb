import {ajouterBombes, compterCellulesVisibles, genererGrilleVide} from "./modules/logiqueDeJeu.js";
import {afficherGrille, mettreAJourGrille, revelerMines} from "./modules/affichage.js";

// Constantes globales
const DIMENSION_GRILLE = 500;

const DIFFICULTE_DE_BASE = 5;
const TAILLE_DE_BASE = 5;

const DIFFICULTE_FACILE = 5;
const TAILLE_FACILE = 5;

const DIFFICULTE_MOYEN = 30;
const TAILLE_MOYEN = 10;

const DIFFICULTE_DIFFICILE = 140;
const TAILLE_DIFFICILE = 20;


/**
 * Initialise le démineur lorsqu'on recharge la page web.
 */
$(document).ready(function() {

    // Generation d'une grille initale
    let grille = initialiserDemineur(DIMENSION_GRILLE, DIFFICULTE_DE_BASE, TAILLE_DE_BASE);

    // Gestion du bouton facile
    $('#facile').click(function() {
        grille = initialiserDemineur(DIMENSION_GRILLE, DIFFICULTE_FACILE, TAILLE_FACILE);
    })

    // Gestion du bouton moyen
    $('#moyen').click(function() {
        grille = initialiserDemineur(DIMENSION_GRILLE, DIFFICULTE_MOYEN, TAILLE_MOYEN);
    })

    // Gestion du bouton difficile
    $('#difficile').click(function() {
        grille = initialiserDemineur(DIMENSION_GRILLE, DIFFICULTE_DIFFICILE, TAILLE_DIFFICILE);
    })
})

/**
 * Initialise une partie de démineur.
 *
 * @param  DIMENSION_GRILLE - Taille de la grille HTML (px)
 * @param  difficulte - La difficulté choisie (équivaut au nombre de mines à placer)
 * @param  nbLigne - Nombre de lignes de la grille
 * @returns La grille du jeu.
 */
function initialiserDemineur(DIMENSION_GRILLE, difficulte, nbLigne) {
    console.clear();

    // Vide la grille précédente
    console.log("Emptying previous grid...");
    $("#grille-jeu").empty();
    console.log("Previous grid emptied.");


    console.log("Grid dimension set to " + DIMENSION_GRILLE);
    console.log("Difficulty set to " + difficulte)

    // Génère la nouvelle grille
    console.log("Generating initial grid...");
    const grille = genererGrilleVide(nbLigne,nbLigne);
    console.log(grille);
    console.log("Initial grid generated.");


    // Ajoute les mines
    console.log("Placing mines...");
    ajouterBombes(grille, difficulte);

    // Affiche la grille sur l'écran
    console.log("Generating HTML...");
    afficherGrille(grille, DIMENSION_GRILLE);
    console.log("HTML successfully generated.");

    // Ajout des écouteurs
    ajouterEcouteurGrille();
    ajouterEcouteurCellules();

    return grille;
}

/**
 * Ajoute l'écouteur de la grille. Envoie une alerte à l'utilisateur en fin de partie.
 */
function ajouterEcouteurGrille() {
    $('#grille-jeu').click(function () {
        alert("Partie terminée. Clicker sur une difficulté pour recommencer.");
    })
}

/**
 * Ajoute l'écouteur pour les cellules (divs) de la grille de jeu.
 */
function ajouterEcouteurCellules(nbLigne, nbDeMine) {

    // gestion du clique-gauche d'une cellule
    $('.cell').click(function (event) {

        // N'interfère pas avec l'écouteur de la grille de jeu
        event.stopPropagation();

        // Si l'utilisateur clique sur une mine, il perd la partie
        if ($(this).hasClass('mine')) {

            // Révèle la mine
            $(this).text("💣");
            $(this).css('background', "red");


            // Assure que la grille est modifiée avant d'envoyer l'alerte
            setTimeout(function () {
                alert('Kaboum! Vous avez perdu.');
            }, 1);

            // Désactive l'écouteur jusqu'à que l'utilisateur recommence une nouvelle partie
            $('.cell').off('click');
        }

        //Si l'utilisateur clique sur cellule sans mine
        else {
            mettreAJourGrille(this);

            // L'utilisateur gagne la partie s'il a révélé toutes les cellules
            // sauf celles qui contiennent des mines.
            if (compterCellulesVisibles() === (Math.pow(nbLigne, 2) - nbDeMine)) {

                revelerMines();

                // Assure que la grille est modifiée avant d'envoyer l'alerte
                setTimeout(function () {
                    alert("Vous avez gagné!");
                }, 1);

                // Désactive l'écouteur jusqu'à que l'utilisateur recommence une nouvelle partie
                $('.cell').off('click');
            }
        }
    });


    // Gestion click droit pour placer drapeau
    $('.cell').contextmenu(function (event) {

        // Désactive les fonctions clique-droit par défaut
        event.preventDefault();

        // N'interfère pas avec l'écouteur de la grille de jeu
        event.stopPropagation();

        // On peut seulement placer des drapeaux sur des cellules que l'utilisateur n'a pas encore révélées
        if ($(this).data('is-hidden')) {

            // Place drapeau
            if ($(this).text() !== "🚩") {

                $(this).text("🚩")
            }
            // Enlève drapeau
            else {
                $(this).text(" ");
            }
        }
    });
}