function htmlClick(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "<a style=\"color:grey\"></br>Nombre d'individus interrogés : "+
        map[numeroRegion]["nombreIndividus"].total+
        "</br> Nombre total d'individus: "+ map["nombreTotalIndividus"]+"</a>";
    } else {
        return "";
    }
}



function htmlPourcentageObesite(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Pourcentage obésité: " +
        pourcentageObesite(numeroRegion) + "%<br> Par rapport à la moyenne: "+
        pourcentageParRapportMoyenne(calculerMoyenne(pourcentageObesite),numeroRegion, pourcentageObesite(numeroRegion))+"%";

    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}

function htmlMPois(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Aime le poisson : " +
        pourcentagePoisson(numeroRegion)+ "%<br> Par rapport à la moyenne: "+
        pourcentageParRapportMoyenne(calculerMoyenne(pourcentagePoisson),numeroRegion, pourcentagePoisson(numeroRegion))+"%";
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}


function htmlFastFood(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Fast food fréquent: " +
        pourcentageFastFood(numeroRegion)+ "%<br> Par rapport à la moyenne: "+
        pourcentageParRapportMoyenne(calculerMoyenne(pourcentageFastFood),numeroRegion, pourcentageFastFood(numeroRegion))+"%";
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}

function htmlViande(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Aime la viande : " +
        pourcentageViande(numeroRegion)+ "%<br> Par rapport à la moyenne: "+
        pourcentageParRapportMoyenne(calculerMoyenne(pourcentageViande),numeroRegion, pourcentageViande(numeroRegion))+"%";
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}

function htmlFruit(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Aime les fruits : " +
        pourcentageFruit(numeroRegion)+ "%<br> Par rapport à la moyenne: "+
        pourcentageParRapportMoyenne(calculerMoyenne(pourcentageFruit),numeroRegion, pourcentageFruit(numeroRegion))+"%";
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}

function htmlTele(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Temps moyen télévision /jr : " +
        pourcentageTele(numeroRegion)+ " mn<br> Par rapport à la moyenne: "+
        pourcentageParRapportMoyenne(calculerMoyenne(pourcentageTele),numeroRegion, pourcentageTele(numeroRegion))+"%";
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}

function htmlActivite(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Activite sportive /sem : " +
        pourcentageActivite(numeroRegion)+ " mn<br> Par rapport à la moyenne: "+
        pourcentageParRapportMoyenne(calculerMoyenne(pourcentageActivite),numeroRegion, pourcentageActivite(numeroRegion))+"%";
    } else {
        return "La région 'Corse' n'est pas prise en compte";
    }
}
