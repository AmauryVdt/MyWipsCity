var countDrag = 0;
var score = 0;
var countCommercePicture = 1,
    countMaisonPicture = 1,
    countEolienePicture = 1,
    countHydrauliquePicture = 1,
    countSolairePicture = 1,
    countEcolePicture = 1,
    countIndustriePicture = 1,
    countLacPicture = 1,
    countParcPicture = 1;
var blocks, ids = [];

window.onload = popover();

function popover() {
    $(document).ready(function(){
        $('[data-toggle="popover"]').popover({
            placement : 'top',
            trigger : 'hover'
        });
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    addPicture();
    if (ev.target === document.getElementById("trash")) {
        var img = document.getElementById(data);
        img.parentNode.removeChild(img);
    }
    $(document.getElementById(data)).popover('disable')
    popover()
    updateScore();
}

function updateScore() {
    /// Check chaque element de la map
    ids = [];
    document.getElementById("tile-container").childNodes.forEach(
        element => {
            if (element.tagName === 'DIV') {
                if (element.firstChild) {
                    ids.push(element.firstChild.id)
                } else {
                    ids.push("");
                }
            }
        }
    )

    /// Structuration de la map avec ses blocks
    blocks = [
        [ids[0],ids[1], ids[2]],
        [ids[3],ids[4], ids[5]],
        [ids[6],ids[7], ids[8]]
    ]

    let nbrCommerce = 0;
    let nbrMaison = 0;
    let nbrEolienne = 0;
    let nbrHydraulique = 0;
    let nbrSolaire = 0;
    let nbrEcole = 0;
    let nbrIndustrie = 0;
    let nbrLac = 0;
    let nbrParc = 0;
    let comboLacHydraulique = false;

    /// Compte le nombre d'éléments de chaque entité
    for (let y=0; y<blocks.length; y++) {
        for (let x=0; x<blocks[y].length; x++) {
            if (blocks[y][x].includes("commercePicture")) {
                nbrCommerce++;
            }
            else if (blocks[y][x].includes("maisonPicture")) {
                nbrMaison++;
            }
            else if (blocks[y][x].includes("eolienePicture")) {
                nbrEolienne++;
            }
            else if (blocks[y][x].includes("hydrauliquePicture")) {
                nbrHydraulique++;
                /// Check s'il n'y a pas de lac à côté du barrage hydraulique
                let stringLac = ""
                /// Si le barrage est sur un bord, on ne check pas en dehors de la map
                if (0<x) { stringLac += blocks[y][x-1]}
                if (x<2) { stringLac += blocks[y][x+1]}
                if (0<y) { stringLac += blocks[y-1][x]}
                if (y<2) { stringLac += blocks[y+1][x]}
                if (stringLac.includes("lacPicture")) {
                    comboLacHydraulique = true;
                }
            }
            else if (blocks[y][x].includes("solairePicture")) {
                nbrSolaire++;
            }
            else if (blocks[y][x].includes("ecolePicture")) {
                nbrEcole++;
            }
            else if (blocks[y][x].includes("industriePicture")) {
                nbrIndustrie++;
            }
            else if (blocks[y][x].includes("lacPicture")) {
                nbrLac++;
            }
            else if (blocks[y][x].includes("parcPicture")) {
                nbrParc++;
            }
        }
    }

    /// Set le score
    score = 0;

    /// Si il y a au moins un commerce
    if (nbrCommerce > 0) {

        /// On ajoute un score minimum
        score += 2

        /// Si il y a plus de 3 commerces, on remet le nombre de commerce à 3
        if (nbrCommerce > 3) {
            nbrCommerce = 3;
        }

        /// Pour chaque commerce sauf le premier
        for (let i=1; i<nbrCommerce; i++) {

            /// On ajoute 1 au score
            score ++;
        }
    }

    if (nbrMaison > 0) {
        score += 2
        if (nbrMaison > 3) {
            nbrMaison = 3;
        }
        for (let i=1; i<nbrMaison; i++) {
            score ++;
        }
    }

    if (nbrEolienne > 0) {
        score += 4
        if (nbrEolienne > 3) {
            nbrEolienne = 3;
        }
        for (let i=1; i<nbrEolienne; i++) {
            score += 2;
        }
    }

    if (nbrHydraulique > 0) {
        score += 4
        if (nbrHydraulique > 3) {
            nbrHydraulique = 3;
        }
        for (let i=1; i<nbrHydraulique; i++) {
            score += 2;
        }
    }

    if (nbrSolaire > 0) {
        score += 4
        if (nbrSolaire > 3) {
            nbrSolaire = 3;
        }
        for (let i=1; i<nbrSolaire; i++) {
            score += 2;
        }
    }

    if (nbrIndustrie > 0) {
        score ++
        if (nbrIndustrie > 3) {
            nbrIndustrie = 3;
        }
        for (let i=1; i<nbrIndustrie; i++) {
            score -= 1;
        }
    }

    if (nbrEcole > 0) {
        score += 5;
    }

    if (nbrLac > 0) {
        score += 3
        if (nbrLac > 3) {
            nbrLac = 3;
        }
        for (let i=1; i<nbrLac; i++) {
            score ++;
        }
    }

    if (nbrParc > 0) {
        score += 3
        if (nbrParc > 3) {
            nbrParc = 3;
        }
        for (let i=1; i<nbrParc; i++) {
            score ++;
        }
    }

    /// Si un parc est à côté d'un barrage hydraulique, bonus +5 point
    if (comboLacHydraulique === true) {
        score += 5;
    }

    document.getElementById("score").innerText = this.score;
    document.getElementById("userScore").placeholder = this.score;
}

// Commerce = 1points
// Maison = 2 points et 1 point ensuite et plafond
// Parc éolien = 2 points
// Hydraulique = 2 points
// Solaire =
// Ecole = 5 points plafond
// Industrie = - 1 point et -2
// Lac = 1 point
// Parc = 1 point
// Lac + Hydraulique = 2 points

function setScore(name, score) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:8080', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        user: name,
        score: score
    }));
}

// Merci de ne pas juger le code à partir d'ici, j'avais la flemme de faire un beau code

function addPicture() {
    if (document.getElementById("commerce").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `commercePicture${countCommercePicture}`;
        img.src = "../images/magasin.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        img.title="Commerce";
        img.setAttribute("data-toggle", "popover")
        img.setAttribute("data-content", "Les commerces permettent un bon rendement économique")
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("commerce");
        div.appendChild(img);
        countCommercePicture++;
    }
    else if (document.getElementById("maison").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `maisonPicture${countMaisonPicture}`;
        img.src = "../images/maison.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        img.title="Maison";
        img.setAttribute("data-toggle", "popover")
        img.setAttribute("data-content", "Les maisons augmentent la population et donc l'economie")
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("maison");
        div.appendChild(img);
        countMaisonPicture++;
    }
    else if (document.getElementById("eoliene").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `eolienePicture${countEolienePicture}`;
        img.src = "../images/eolien.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        img.title="Eolienne";
        img.setAttribute("data-toggle", "popover")
        img.setAttribute("data-content", "Les éoliennes utilisent l'énergie du vent pour fournir de l'électricité")
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("eoliene");
        div.appendChild(img);
        countEolienePicture++;
    }
    else if (document.getElementById("hydraulique").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `hydrauliquePicture${countHydrauliquePicture}`;
        img.src = "../images/barragehydraulique.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        img.title="Barrage hydraulique";
        img.setAttribute("data-toggle", "popover")
        img.setAttribute("data-content", "Le barrage hydraulique utilise l'énergie de l'eau pour fournir de l'électricité")
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("hydraulique");
        div.appendChild(img);
        countHydrauliquePicture++;
    }
    else if (document.getElementById("solaire").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `solairePicture${countSolairePicture}`;
        img.src = "../images/solaire.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        img.title="Panneaux solaires";
        img.setAttribute("data-toggle", "popover")
        img.setAttribute("data-content", "Les panneaux solaires utilisent l'énergie du soliel pour fournir de l'électricité")
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("solaire");
        div.appendChild(img);
        countSolairePicture++;
    }
    else if (document.getElementById("ecole").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `ecolePicture${countEcolePicture}`;
        img.src = "../images/ecole.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        img.title="Ecole";
        img.setAttribute("data-toggle", "popover")
        img.setAttribute("data-content", "L'école est indispensable pour l'éducation de la population")
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("ecole");
        div.appendChild(img);
        countEcolePicture++;
    }
    else if (document.getElementById("industrie").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `industriePicture${countIndustriePicture}`;
        img.src = "../images/usine.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        img.title="Industries";
        img.setAttribute("data-toggle", "popover")
        img.setAttribute("data-content", "Les industires augmentent l'économie mais à un impact négatif sur l'écologie ")
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("industrie");
        div.appendChild(img);
        countIndustriePicture++;
    }
    else if (document.getElementById("lac").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `lacPicture${countLacPicture}`;
        img.src = "../images/Groupe%207365.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        img.title="Lac";
        img.setAttribute("data-toggle", "popover")
        img.setAttribute("data-content", "Le lac est important pour la biodiversité")
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("lac");
        div.appendChild(img);
        countLacPicture++;
    }
    else if (document.getElementById("parc").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `parcPicture${countParcPicture}`;
        img.src = "../images/parc.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        img.title="Parc";
        img.setAttribute("data-toggle", "popover")
        img.setAttribute("data-content", "Le parc augmente la satisfaction des habitants et est important pour la biodiversité")
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("parc");
        div.appendChild(img);
        countParcPicture++;
    }
}