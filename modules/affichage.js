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

            // Changer la couleur du texte selon le nombre de mines
            switch (cellule.numOfAdjacentMines) {
                case "0": {
                    celluleHTML.css({
                        color: "lightgray"
                    })
                    break;
                }
                case "1": {
                    celluleHTML.css({
                        color: "blue"
                    })
                    break;
                }
                case "2": {
                    celluleHTML.css({
                        color: "green"
                    })
                    break;
                }
                case "3": {
                    celluleHTML.css({
                        color: "red"
                    })
                    break;
                }
                case "4": {
                    celluleHTML.css({
                        color: "purple"
                    })
                    break;
                }
                case "5": {
                    celluleHTML.css({
                        color: "maroon"
                    })
                    break;
                }
                case "6": {
                    celluleHTML.css({
                        color: "turquoise"
                    })
                    break;
                }
                case "7": {
                    celluleHTML.css({
                        color: "black"
                    })
                    break;
                }
                case "8": {
                    celluleHTML.css({
                        color: "darkgreen"
                    })
                    break;
                }
            }
            console.log(celluleHTML)

            grilleJeu.append(celluleHTML);
        });
    });

    console.log(grilleJeu)
}

export function revelerToutesLesCellules() {
    const cells = $('.cell');

    for (const cell of cells) {
        if(cell.classList.contains("mine")) {
            cell.textContent = "💣";
        }
    }
}