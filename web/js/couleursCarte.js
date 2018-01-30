function couleurObesite(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentageObesite(numeroRegion) < 8){
            return tabCouleur[0];
        } else if (pourcentageObesite(numeroRegion) < 10){
            return tabCouleur[1];
        } else if (pourcentageObesite(numeroRegion) < 13){
            return tabCouleur[2];
        } else if (pourcentageObesite(numeroRegion) < 15){
            return tabCouleur[3];
        } else {
            return tabCouleur[4];
        }
    }
}


function couleurPoisson(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentagePoisson(numeroRegion) < 8.5){
            return tabCouleur[0];
        } else if (pourcentagePoisson(numeroRegion) < 12){
            return tabCouleur[1];
        } else if (pourcentagePoisson(numeroRegion) < 15){
            return tabCouleur[2];
        } else if (pourcentagePoisson(numeroRegion) < 17){
            return tabCouleur[3];
        } else {
            return tabCouleur[4];
        }
    }
}

function couleurFastFood(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentageFastFood(numeroRegion) < 14){
            return tabCouleur[0];
        } else if (pourcentageFastFood(numeroRegion) < 18){
            return tabCouleur[1];
        } else if (pourcentageFastFood(numeroRegion) < 22){
            return tabCouleur[2];
        } else if (pourcentageFastFood(numeroRegion) < 27){
            return tabCouleur[3];
        } else {
            return tabCouleur[4];
        }
    }
}

function couleurViande(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentageViande(numeroRegion) < 14){
            return tabCouleur[0];
        } else if (pourcentageViande(numeroRegion) < 18){
            return tabCouleur[1];
        } else if (pourcentageViande(numeroRegion) < 22){
            return tabCouleur[2];
        } else if (pourcentageViande(numeroRegion) < 27){
            return tabCouleur[3];
        } else {
            return tabCouleur[4];
        }
    }
}

function couleurFruit(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentageFruit(numeroRegion) < 15){
            return tabCouleur[0];
        } else if (pourcentageFruit(numeroRegion) < 18){
            return tabCouleur[1];
        } else if (pourcentageFruit(numeroRegion) < 20){
            return tabCouleur[2];
        } else if (pourcentageFruit(numeroRegion) < 25){
            return tabCouleur[3];
        } else {
            return tabCouleur[4];
        }
    }
}
