function htmlPourcentageObesite(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Pourcentage obésité: " +
        pourcentageObesite(numeroRegion)
    } else {
        return "La région 'Corse' n'est pas prise en compte"
    }
}

function htmlMPois(numeroRegion, nomRegion) {
    if (numeroRegion != 0) {
        return "Région : " + nomRegion + "<br>" + "Pourcentage dee la polulation : " +
        pourcentageObesite(numeroRegion)
    } else {
        return "La région 'Corse' n'est pas prise en compte"
    }
}
