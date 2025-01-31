/**
 * Affiche la grille du jeu dans le DOM en créant et stylisant chaque cellule.
 *
 * @param {Array<Array<Object>>} tableauGrille - La matrice générée par la logique de jeu
 * qui contient les informations nécessaires pour générer chaque cellule en HTML.
 * @param {number} DIMENSION_GRILLE - La taille (en px) de la grille affichée.
 */
export function afficherGrille(tableauGrille, DIMENSION_GRILLE) {
    const grilleJeu = $('#grille-jeu');

    grilleJeu.css({
        display: 'flex',
        flexWrap: 'wrap',

        width: DIMENSION_GRILLE + "px",
        height: DIMENSION_GRILLE + "px",
    })

    // On traverse la matrice pour généner le HTML
    tableauGrille.forEach(function(ligne) {
        ligne.forEach(function(cellule) {

            // Chaque cellule est représentée par un div
            const celluleHTML = $('<div>');

            // On lui donne une classe pour gérer les évènements
            celluleHTML.addClass("cell");

            // On vérifie si la cellule contient une mine
            // Pour les évènements qui ne concernent que celles-ci
            if(cellule.hasMine) {
                celluleHTML.addClass("mine");
            }


            // On stocke les données dans le div
            celluleHTML.data('x', cellule.xCoord)
            celluleHTML.data('y', cellule.yCoord)
            celluleHTML.data('num-of-adjacent-mines', cellule.numOfAdjacentMines)
            celluleHTML.data('has-mine', cellule.hasMine)

            // Pour savoir si l'utilisateur a révélé la cellule
            celluleHTML.data('is-hidden', true);


            // On stylise la cellule en CSS
            celluleHTML.css({
                    width: DIMENSION_GRILLE/tableauGrille.length + "px",
                    height: DIMENSION_GRILLE/tableauGrille.length + "px",

                    background: "lightgray",

                    boxShadow: "inset 0 0 0 1px black",

                    fontFamily: "monospace",
                    fontSize: "1vw",

                    alignContent: "center",
                    justifyContent: "center",
                    textAlign: "center"
                });

            console.log(celluleHTML)

            // Ajoute le div à son parent
            grilleJeu.append(celluleHTML);
        });
    });

    console.log(grilleJeu)
}

/**
 * On appelle cette fonction initialement lorsque l'utilisateur clique sur une cellule qui ne contient pas de mine
 * pour en révéler sa valeur.
 *
 * Si la cellule contient un 0, on rappelle récursivement cette fonction sur ses cellules adjacentes
 * jusqu'à que toutes les cellules sans danger possibles ont été révélées.
 *
 * @param cell - Une référence vers la cellule (div)
 */
export function mettreAJourGrille(cell) {

    // On veut itérer seulement sur les cellules pas encore révélées
    if($(cell).data('is-hidden') === true) {

        // On met à jour la cellule
        $(cell).data('is-hidden', false);

        // Change le fond en blanc
        $(cell).css("background", "white")

        // Affiche le chiffre sur l'écran
        $(cell).text($(cell).data('num-of-adjacent-mines'));

        // Selon le nombre de mines, on donne une couleur spécifique au chiffre
        switch ($(cell).data('num-of-adjacent-mines')) {
            case 0: {
                $(cell).css('color', "lightgray")
                break;
            }
            case 1: {
                $(cell).css('color', "blue")
                break;
            }
            case 2: {
                $(cell).css('color', "green")
                break;
            }
            case 3: {
                $(cell).css('color', "red")
                break;
            }
            case 4: {
                $(cell).css('color',  "purple")
                break;
            }
            case 5: {
                $(cell).css('color',  "maroon")
                break;
            }
            case 6: {
                $(cell).css('color',  "turquoise")
                break;
            }
            case 7: {
                $(cell).css('color',  "black")
                break;
            }
            case 8: {
                $(cell).css('color',  "darkgreen")
                break;
            }
        }

        // On sort de la récursion si la cellule ne contient pas '0'
        if ($(cell).data('num-of-adjacent-mines') !== 0) {
            console.log("exited on base condition")
            return;
        }

        const adjacentCells = getAdjacentDivs($(cell).data('x'), $(cell).data('y'));

        for (const adjCell of adjacentCells) {

            // Appel recursif sur chaque cellule adjacente, ainsi de suite...
            mettreAJourGrille(adjCell);
        }
    }
}


/*
@params x : Coordonnee x d'un div de la grille
@params y : Coordonnee y d'un div de la grille
@returns Un array contenant tous les divs adjacents
 */
function getAdjacentDivs(x, y) {

    // On filtre le resultat d'une selection jQuery pour obtenir seulement les huit
    // divs adjacents, qu'on transforme en Array. On filtre à nouveau pour enlever les undefined.
    // On retourne l'array resultant.

    // Note : Le critère de selection a été généré par Chat-GPT o4
    return $('.cell').filter(function () {
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


/*
Revele les mines et change la couleur du background en vert
 */
export function revelerMines() {

    // On fait une selection jQuery de 'cell', puis on filtre pour garder seulement ceux qui
    // ont l'attribut has-mine == true
    //
    // ON change la couleur du background
    const mines =  $('.cell').filter(function() {
        if($(this).data('has-mine') === true) {
            $(this).css('background', 'lightgreen')
            $(this).text("💣")
        }
    });

    console.log(mines);
}