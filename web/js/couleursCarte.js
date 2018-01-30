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
