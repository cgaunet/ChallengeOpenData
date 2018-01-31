//------------------------------------------------------------------------------
//Compteurs pour les réponses numériques
function compteursNumeriques() {
    var compteurs = {
        total: 0,
        sousPoids: 0,
        poidsNormal: 0,
        surPoids: 0,
        obesite: 0
    };
    return compteurs;
}

//------------------------------------------------------------------------------
//réponses possibles aux valeurs de type entrerep
function reponsesEntrerep() {
    var reponses = {
        0: {
            compteur: 0,
            reponse: "plusieures reponses"
        },
        1: {
            compteur: 0,
            reponse: "4 fois/jour ou + "
        },
        2: {
            compteur: 0,
            reponse: "2 à 3 fois/jour"
        },
        3: {
            compteur: 0,
            reponse: "1 fois/jour "
        },
        4: {
            compteur: 0,
            reponse: "<1 fois/jour, ms au moins 1 fois/semaine"
        },
        5: {
            compteur: 0,
            reponse: "<1 fois/semaine "
        },
        6: {
            compteur: 0,
            reponse: "jamais"
        },
        7: {
            compteur: 0,
            reponse: "ne sait pas"
        },
        9: {
            compteur: 0,
            reponse: "pas de réponses"
        }
    };
    return reponses;
}

function compteursEntrerep() {
    var compteurs = {
        total: reponsesEntrerep(),
        sousPoids: reponsesEntrerep(),
        poidsNormal: reponsesEntrerep(),
        surPoids: reponsesEntrerep(),
        obesite: reponsesEntrerep(),
    };
    return compteurs;
}

//------------------------------------------------------------------------------
//réponses possibles aux valeurs de type aime
function reponsesAime() {
    var reponses = {
        0 : {
            compteur: 0,
            reponse: "plusieures réponses"
        },
        1: {
            compteur: 0,
            reponse: "beaucoup"
        },
        2: {
            compteur: 0,
            reponse: "assez"
        },
        3: {
            compteur: 0,
            reponse: "un peu"
        },
        4: {
            compteur: 0,
            reponse: "pas du tout"
        },
        5: {
            compteur: 0,
            reponse: "ne sait pas"
        },
        9: {
            compteur: 0,
            reponse: "pas de réponses"
        }
    };
    return reponses;
}

function compteursAime() {
    var compteurs = {
        total: reponsesAime(),
        sousPoids: reponsesAime(),
        poidsNormal: reponsesAime(),
        surPoids: reponsesAime(),
        obesite: reponsesAime(),
    };
    return compteurs;
}

//------------------------------------------------------------------------------
//réponses possibles aux valeurs de type onsp
function reponsesOnsp() {
    var reponses = {
        0: {
            compteur: 0,
            reponse: "plusieures réponses"
        },
        1: {
            compteur: 0,
            reponse: "oui"
        },
        2: {
            compteur: 0,
            reponse: "non"
        },
        3: {
            compteur: 0,
            reponse: "ne sait pas"
        },
        4: {
            compteur: 0,
            reponse: "refus"
        },
        9: {
            compteur: 0,
            reponse: "pas de réponses"
        }
    };
    return reponses;
}

function compteursOnsp() {
    var compteurs = {
        total: reponsesOnsp(),
        sousPoids: reponsesOnsp(),
        poidsNormal: reponsesOnsp(),
        surPoids: reponsesOnsp(),
        obesite: reponsesOnsp(),
    };
    return compteurs;
}

//------------------------------------------------------------------------------
//réponses possibles aux valeurs de type fastfood
function reponsesFastFood() {
    var reponses = {
        0: {
            compteur: 0,
            reponse: "plusieures réponses"
        },
        1: {
            compteur: 0,
            reponse: "tous les jours ou presque"
        },
        2: {
            compteur: 0,
            reponse: "4 à 5 jours/semaine"
        },
        3: {
            compteur: 0,
            reponse: "2 à 3 jours/semaine"
        },
        4: {
            compteur: 0,
            reponse: "1 jour/semaine"
        },
        5: {
            compteur: 0,
            reponse: "1 à 3 jours/mois"
        },
        6: {
            compteur: 0,
            reponse: "<1 jour/mois "
        },
        7: {
            compteur: 0,
            reponse: "jamais "
        },
        8: {
            compteur: 0,
            reponse: "ne sait pas"
        },
        9: {
            compteur: 0,
            reponse: "pas de réponses"
        }
    };

    return reponses;
}

function compteursFastFood() {
    var compteurs = {
        total: reponsesFastFood(),
        sousPoids: reponsesFastFood(),
        poidsNormal: reponsesFastFood(),
        surPoids: reponsesFastFood(),
        obesite: reponsesFastFood(),
    };
    return compteurs;
}

//------------------------------------------------------------------------------
//créé l'objet région
function ajoutRegion(nom) {
    var values = {};
    values["region"] = nom;
    values["nombreIndividus"] = compteursNumeriques();
    values["age"] = compteursNumeriques();
    values["bmi"] = compteursNumeriques();
    values["entrerep"] = compteursEntrerep();
    values["mfruit"] = compteursAime();
    values["bonalim"] = compteursOnsp();
    values["tele"] = compteursNumeriques();
    values["mvian"] = compteursAime();
    values["mpois"] = compteursAime();
    values["fastfood"] = compteursFastFood();
    values["aptotal_hebdo"] = compteursNumeriques();
    return values;
}

function creerMap() {
    var outputMap = {};
    outputMap["nombreTotalIndividus"] = 0;
    outputMap[1] = ajoutRegion("\u00cele-de-France");
    outputMap[2] = ajoutRegion("Champagne-Ardenne");
    outputMap[3] = ajoutRegion("Picardie");
    outputMap[4] = ajoutRegion("Haute-Normandie");
    outputMap[5] = ajoutRegion("Centre");
    outputMap[6] = ajoutRegion("Basse-Normandie");
    outputMap[7] = ajoutRegion("Bourgogne");
    outputMap[8] = ajoutRegion("Nord-Pas-de-Calais");
    outputMap[9] = ajoutRegion("Lorraine");
    outputMap[10] = ajoutRegion("Alsace");
    outputMap[11] = ajoutRegion("Franche-Comt\u00e9");
    outputMap[12] = ajoutRegion("Pays de la Loire");
    outputMap[13] = ajoutRegion("Bretagne");
    outputMap[14] = ajoutRegion("Poitou-Charentes");
    outputMap[15] = ajoutRegion("Aquitaine");
    outputMap[16] = ajoutRegion("Midi-Pyr\u00e9n\u00e9es");
    outputMap[17] = ajoutRegion("Limousin");
    outputMap[18] = ajoutRegion("Rh\u00f4ne-Alpes");
    outputMap[19] = ajoutRegion("Auvergne");
    outputMap[20] = ajoutRegion("Languedoc-Roussillon");
    outputMap[21] = ajoutRegion("Provence-Alpes-C\u00f4te d'Azur");
    return outputMap;
}
