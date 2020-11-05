var countDrag = 0;
var countCommercePicture,
    countMaisonPicture,
    countAppartementPicture,
    countEolienePicture,
    countHydrauliquePicture,
    countSolairePicture,
    countEcolePicture,
    countIndustriePicture,
    countLacPicture,
    countParcPicture = 1;

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
    countDrag = countDrag + 1;
    if (ev.target === document.getElementById("trash")) {
        var img = document.getElementById(data);
        img.parentNode.removeChild(img);

    }
    updateScore();
}

function updateScore() {
    document.getElementById("score").innerText = this.countDrag;
}

// Merci de ne pas juger le code à partir d'ici, j'avais la flemme de faire un beau code

function border(id) {
    // const div =document.getElementById(id)
    // if (div.childElementCount > 0) {
    //     div.style.border = "none";
    // }
    // else {
    //     div.style.border = "1px dashed white;";
    // }
}

function addPicture() {
    if (document.getElementById("commerce").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `maisonPicture${countCommercePicture}`;
        img.src = "../images/magasin.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
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
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("maison");
        div.appendChild(img);
        countMaisonPicture++;
    }
    else if (document.getElementById("appartement").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `maisonAppartement${countAppartementPicture}`;
        img.src = "../images/immeuble.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("appartement");
        div.appendChild(img);
        countAppartementPicture++;
    }
    else if (document.getElementById("eoliene").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `maisonEoliene${countEolienePicture}`;
        img.src = "../images/eolien.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("eoliene");
        div.appendChild(img);
        countEolienePicture++;
    }
    else if (document.getElementById("hydraulique").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `maisonHydraulique${countHydrauliquePicture}`;
        img.src = "../images/barragehydraulique.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("hydraulique");
        div.appendChild(img);
        countHydrauliquePicture++;
    }
    else if (document.getElementById("solaire").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `maisonSolaire${countSolairePicture}`;
        img.src = "../images/solaire.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("solaire");
        div.appendChild(img);
        countSolairePicture++;
    }
    else if (document.getElementById("ecole").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `maisonEcole${countEcolePicture}`;
        img.src = "../images/ecole.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("ecole");
        div.appendChild(img);
        countEcolePicture++;
    }
    else if (document.getElementById("industrie").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `maisonIndustrie${countIndustriePicture}`;
        img.src = "../images/usine.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("industrie");
        div.appendChild(img);
        countIndustriePicture++;
    }
    else if (document.getElementById("lac").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `maisonLac${countLacPicture}`;
        img.src = "../images/usine.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("lac");
        div.appendChild(img);
        countLacPicture++;
    }
    else if (document.getElementById("parc").childElementCount < 1) {
        const img = document.createElement("img");
        img.id = `maisonParc${countParcPicture}`;
        img.src = "../images/parc.png";
        img.draggable = "true";
        img.width="150";
        img.height="150";
        this.addEventListener('dragstart', function() {drag(event)}, false);

        const div = document.getElementById("parc");
        div.appendChild(img);
        countParPicture++;
    }
}