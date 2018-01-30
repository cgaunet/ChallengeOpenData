function htmlPourcentageObesite(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Pourcentage obésité: " +

        pourcentageObesite(numeroRegion) + "%<br> Par rapport à la moyenne: "+
        pourcentageParRapportMoyenne(calculerMoyenne(pourcentageObesite),numeroRegion, pourcentageObesite(numeroRegion))+"%"

    } else {
        return "La région 'Corse' n'est pas prise en compte"
    }
}

function htmlMPois(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Pourcentage consommation poisson : " +
        pourcentagePoisson(numeroRegion)+ "%<br> Par rapport à la moyenne: "+
        //var moy =  calculerMoyenne(pourcentagePoisson);
        pourcentageParRapportMoyenne(calculerMoyenne(pourcentagePoisson),numeroRegion, pourcentagePoisson(numeroRegion))+"%"
    } else {
        return "La région 'Corse' n'est pas prise en compte"
    }
}


function htmlFastFood(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Fast food : " +
        pourcentageFastFood(numeroRegion)+ "%<br> Par rapport à la moyenne: "+
        pourcentageParRapportMoyenne(calculerMoyenne(pourcentageFastFood),numeroRegion, pourcentageFastFood(numeroRegion))+"%"
    } else {
        return "La région 'Corse' n'est pas prise en compte"
    }
}
