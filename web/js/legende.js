function texteLegende(d) {
    switch(d) {
        case "0":
        return "< " + tabCritere[0] + uniteLegende;
        break;
        case "1":
        return "< " + tabCritere[1] + uniteLegende;
        break;
        case "2":
        return "< " + tabCritere[2] + uniteLegende;
        break;
        case "3":
        return "< " + tabCritere[3] + uniteLegende;
        break;
        case "4":
        return "> " + tabCritere[3] + uniteLegende;
        break;
    }
}

function couleurLegende(d) {
    return tabCouleur[d];
}
