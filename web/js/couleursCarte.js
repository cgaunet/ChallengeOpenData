var tabCouleurBleu = ["#adccff","#77aaff","#478cff","#0562ff", "#001e82"];
var tabCouleurRouge = [" #ffb3b3"," #ff4d4d","#e60000"," #990000", " #4d0000"];
var tabCouleurVert = [" #99ff99"," #1aff1a","#00cc00","  #008000", " #003300"];
var tabCouleurJaune = ["  #ffff80","  #ffff00","#b3b300","  #808000", " #333300"];

function couleurObesite(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentageObesite(numeroRegion) < 8){
            return tabCouleurBleu[0];
        } else if (pourcentageObesite(numeroRegion) < 10){
            return tabCouleurBleu[1];
        } else if (pourcentageObesite(numeroRegion) < 13){
            return tabCouleurBleu[2];
        } else if (pourcentageObesite(numeroRegion) < 15){
            return tabCouleurBleu[3];
        } else {
            return tabCouleurBleu[4];
        }
    }
}


function couleurPoisson(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentagePoisson(numeroRegion) < 8.5){
            return tabCouleurVert[0];
        } else if (pourcentagePoisson(numeroRegion) < 12){
            return tabCouleurVert[1];
        } else if (pourcentagePoisson(numeroRegion) < 15){
            return tabCouleurVert[2];
        } else if (pourcentagePoisson(numeroRegion) < 17){
            return tabCouleurVert[3];
        } else {
            return tabCouleurVert[4];
        }
    }
}

function couleurFastFood(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentageFastFood(numeroRegion) < 14){
            return tabCouleurJaune[0];
        } else if (pourcentageFastFood(numeroRegion) < 18){
            return tabCouleurJaune[1];
        } else if (pourcentageFastFood(numeroRegion) < 22){
            return tabCouleurJaune[2];
        } else if (pourcentageFastFood(numeroRegion) < 27){
            return tabCouleurJaune[3];
        } else {
            return tabCouleurJaune[4];
        }
    }
}

function couleurViande(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentageViande(numeroRegion) < 14){
            return tabCouleurRouge[0];
        } else if (pourcentageViande(numeroRegion) < 18){
            return tabCouleurRouge[1];
        } else if (pourcentageViande(numeroRegion) < 22){
            return tabCouleurRouge[2];
        } else if (pourcentageViande(numeroRegion) < 27){
            return tabCouleurRouge[3];
        } else {
            return tabCouleurRouge[4];
        }
    }
}

function couleurFruit(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentageFruit(numeroRegion) < 15){
            return tabCouleurVert[0];
        } else if (pourcentageFruit(numeroRegion) < 18){
            return tabCouleurVert[1];
        } else if (pourcentageFruit(numeroRegion) < 20){
            return tabCouleurVert[2];
        } else if (pourcentageFruit(numeroRegion) < 25){
            return tabCouleurVert[3];
        } else {
            return tabCouleurVert[4];
        }
    }
}

function couleurTele(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentageTele(numeroRegion) < 130){
            return tabCouleurRouge[0];
        } else if (pourcentageTele(numeroRegion) < 140){
            return tabCouleurRouge[1];
        } else if (pourcentageTele(numeroRegion) < 152){
            return tabCouleurRouge[2];
        } else if (pourcentageTele(numeroRegion) < 165){
            return tabCouleurRouge[3];
        } else {
            return tabCouleurRouge[4];
        }
    }
}
function couleurActivite(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentageActivite(numeroRegion) < 500){
            return tabCouleurBleu[0];
        } else if (pourcentageActivite(numeroRegion) < 585){
            return tabCouleurBleu[1];
        } else if (pourcentageActivite(numeroRegion) < 660){
            return tabCouleurBleu[2];
        } else if (pourcentageActivite(numeroRegion) < 730){
            return tabCouleurBleu[3];
        } else {
            return tabCouleurBleu[4];
        }
    }
}
