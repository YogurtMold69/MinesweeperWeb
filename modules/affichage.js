export function afficherGrille(tableauGrille, DIMENSION_GRILLE) {
    const grilleJeu = $('#grille-jeu');

    grilleJeu.css({
        display: 'flex',
        flexWrap: 'wrap',

        width: DIMENSION_GRILLE + "px",
        height: DIMENSION_GRILLE + "px",
    })

    // On traverse la grille qu'on a genere
    tableauGrille.forEach(function(ligne) {
        ligne.forEach(function(cellule) {

            // On cree un div equivalent pour chaque cellule
            const celluleHTML = $('<div>');

            // On lui donne une classe pour l'écouteur d'evenement
            celluleHTML.addClass("cell");

            // On verifie egalement si la cellule contient une mine,
            // si oui, on ajoute la classe 'mine'
            if(cellule.hasMine) {
                celluleHTML.addClass("mine");
            }


            // On transfere les attributs de la classe Cellule au div html
            celluleHTML.data('x', cellule.xCoord)
            celluleHTML.data('y', cellule.yCoord)
            celluleHTML.data('num-of-adjacent-mines', cellule.numOfAdjacentMines)
            celluleHTML.data('has-mine', cellule.hasMine)

            // On donne un attribut supplementaire pour savoir si la mine a ete releve par l'utilisateur
            // Necessaire pour l'ecouteur d'evenement
            celluleHTML.data('is-hidden', true);


            // On lui donne un style en css
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

            grilleJeu.append(celluleHTML);
        });
    });

    console.log(grilleJeu)
}

/*
    Cette methode est appelee lorsqu'on clique sur une cellule.
    Elle s'occupe de reveler la case choisie ainsi que toutes les cellules '0' adjacentes.

    @params cell : Reference vers la cellule cliquee.
 */
export function mettreAJourGrille(cell) {

    // On ne veut pas iterer sur les cellules déjà revelées ;
    // On travaille seulement les cellules encore cachées
    if($(cell).data('is-hidden') === true) {

        // On révèle la cellule
        $(cell).data('is-hidden', false);
        $(cell).text($(cell).data('num-of-adjacent-mines'));
        $(cell).css("background", "white")

        // Changer la couleur du texte selon le nombre de mines
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

        // Condition de base de la recursion
        if ($(cell).data('num-of-adjacent-mines') !== 0) {
            console.log("exited on base condition")
            return;
        }

        const adjacentCells = getAdjacentDivs($(cell).data('x'), $(cell).data('y'));

        for (const adjCell of adjacentCells) {

            // La fonction va recurser sur toutes ses cellules adjacentes
            // tant que son nombre de mines adjacentes est 0.
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