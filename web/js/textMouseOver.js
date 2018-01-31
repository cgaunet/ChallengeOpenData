function htmlClickCategorie(numeroRegion, nomRegion, categorie) {
    if (numeroRegion != 0) {
        return "<a style=\"color:grey\"></br>Nombre d'individus interrogés : "+
        map[numeroRegion]["nombreIndividus"][categorie]+
        "</br> Nombre total d'individus: "+ map["nombreTotalIndividus"]+"</a>";
    } else {
        return "";
    }
}



function htmlPourcentageBmi(numeroRegion, nomRegion, categorie) {
    var catStr = "de personnes "
    switch (categorie) {
        case "sousPoids":
        catStr += "en sous poids"
        break;
        case "poidsNormal":
        catStr += "ayant un poids normal"
        break;
        case "surPoids":
        catStr += "en surpoids"
        break;
        case "obesite":
        catStr += "obèses"
        break;
        default:

    }

    if (numeroRegion != 0) {
        if(pourcentageBmi(numeroRegion, categorie) > 0) {
            return "Région : " + nomRegion + "<br>" + "Pourcentage "+catStr+" : " +
            pourcentageBmi(numeroRegion, categorie) + "%<br> Par rapport à la moyenne: "+
            pourcentageParRapportMoyenne(calculerMoyenne(pourcentageBmi, categorie),numeroRegion, pourcentageBmi(numeroRegion, categorie))+"%";
        } else {
            return "Region : " + nomRegion + "<br>" + "Personne ne correspondant à cette catégorie n'a répondu à ce critère"
        }
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}

function htmlMPois(numeroRegion, nomRegion, categorie) {
    if (numeroRegion != 0) {
        if(pourcentagePoisson(numeroRegion, categorie) > 0) {
            return "Région : " + nomRegion + "<br>" + "Aime le poisson : " +
            pourcentagePoisson(numeroRegion, categorie)+ "%<br> Par rapport à la moyenne: "+
            pourcentageParRapportMoyenne(calculerMoyenne(pourcentagePoisson, categorie),numeroRegion, pourcentagePoisson(numeroRegion, categorie))+"%";
        } else {
            return "Region : " + nomRegion + "<br>" + "Personne ne correspondant à cette catégorie n'a répondu à ce critère"
        }
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}


function htmlFastFood(numeroRegion, nomRegion, categorie) {
    if (numeroRegion != 0) {
        if(pourcentageFastFood(numeroRegion, categorie) > 0) {
            return "Région : " + nomRegion + "<br>" + "Fast food fréquent: " +
            pourcentageFastFood(numeroRegion, categorie)+ "%<br> Par rapport à la moyenne: "+
            pourcentageParRapportMoyenne(calculerMoyenne(pourcentageFastFood, categorie),numeroRegion, pourcentageFastFood(numeroRegion, categorie))+"%";
        } else {
            return "Region : " + nomRegion + "<br>" + "Personne ne correspondant à cette catégorie n'a répondu à ce critère"
        }
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}

function htmlViande(numeroRegion, nomRegion, categorie) {
    if (numeroRegion != 0) {
        if(pourcentageViande(numeroRegion, categorie) > 0) {
            return "Région : " + nomRegion + "<br>" + "Aime la viande : " +
            pourcentageViande(numeroRegion, categorie)+ "%<br> Par rapport à la moyenne: "+
            pourcentageParRapportMoyenne(calculerMoyenne(pourcentageViande, categorie),numeroRegion, pourcentageViande(numeroRegion, categorie))+"%";
        } else {
            return "Region : " + nomRegion + "<br>" + "Personne ne correspondant à cette catégorie n'a répondu à ce critère"
        }
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}

function htmlFruit(numeroRegion, nomRegion, categorie) {
    if (numeroRegion != 0) {
        if(pourcentageFruit(numeroRegion, categorie) > 0) {
            return "Région : " + nomRegion + "<br>" + "Aime les fruits : " +
            pourcentageFruit(numeroRegion, categorie)+ "%<br> Par rapport à la moyenne: "+
            pourcentageParRapportMoyenne(calculerMoyenne(pourcentageFruit, categorie),numeroRegion, pourcentageFruit(numeroRegion, categorie))+"%";
        } else {
            return "Region : " + nomRegion + "<br>" + "Personne ne correspondant à cette catégorie n'a répondu à ce critère"
        }
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}

function htmlTele(numeroRegion, nomRegion, categorie) {
    if (numeroRegion != 0) {
        if(pourcentageTele(numeroRegion, categorie) > 0) {
            return "Région : " + nomRegion + "<br>" + "Temps moyen télévision /jr : " +
            pourcentageTele(numeroRegion, categorie)+ " mn<br> Par rapport à la moyenne: "+
            pourcentageParRapportMoyenne(calculerMoyenne(pourcentageTele, categorie),numeroRegion, pourcentageTele(numeroRegion, categorie))+"%";
        } else {
            return "Region : " + nomRegion + "<br>" + "Personne ne correspondant à cette catégorie n'a répondu à ce critère"
        }
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}

function htmlActivite(numeroRegion, nomRegion, categorie) {
    if (numeroRegion != 0) {
        if(pourcentageActivite(numeroRegion, categorie) > 0) {
            return "Région : " + nomRegion + "<br>" + "Activite sportive /sem : " +
            pourcentageActivite(numeroRegion, categorie)+  " mn<br> Par rapport à la moyenne: "+
            pourcentageParRapportMoyenne(calculerMoyenne(pourcentageActivite, categorie),numeroRegion, pourcentageActivite(numeroRegion, categorie))+"%";
        } else {
            return "Region : " + nomRegion + "<br>" + "Personne ne correspondant à cette catégorie n'a répondu à ce critère"
        }
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}
