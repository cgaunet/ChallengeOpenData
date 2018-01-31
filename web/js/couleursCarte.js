function couleur(numeroRegion, nomRegion) {
    if(numeroRegion != 0){
        if (pourcentage(numeroRegion) < tabCritere[0]){
            return tabCouleur[0];
        } else if (pourcentage(numeroRegion) < tabCritere[1]){
            return tabCouleur[1];
        } else if (pourcentage(numeroRegion) < tabCritere[2]){
            return tabCouleur[2];
        } else if (pourcentage(numeroRegion) < tabCritere[3]){
            return tabCouleur[3];
        } else {
            return tabCouleur[4];
        }
    }
}
