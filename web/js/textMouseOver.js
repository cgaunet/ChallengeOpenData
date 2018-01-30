function htmlPourcentageObesite(numeroRegion, nomRegion) {

    var moyPourcObeses = calculerMoyenneObeses();
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Pourcentage obésité: " +
        pourcentageObesite(numeroRegion) + "<br> Par rapport à la moyenne: "+
        pourcentageParRapportMoyenne(moyPourcObeses,pourcentageObesite(numeroRegion))+"%"
    } else {
        return "La région 'Corse' n'est pas prise en compte"
    }
}
/*
function htmlMPois(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Pourcentage dee la polulation : " +
        pourcentageObesite(numeroRegion)
    } else {
        return "La région 'Corse' n'est pas prise en compte"
    }
}
*/
