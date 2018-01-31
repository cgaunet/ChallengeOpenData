function openTab(evt, tapType) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tapType).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();


var personnes = [];

function Personne(age, bmi) {
    this.x = age;
    this.y = bmi;
}


window.onload = function(){

}
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("titreCarte").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}


/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}



function openNavCategorie(id) {
    document.getElementById(id).style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNavCategorie(id) {
    document.getElementById(id).style.width = "0";
    document.body.style.backgroundColor = "white";
}

function closeAll() {
    closeNav();
    sidenavs = document.getElementsByClassName("sidenavcategorie");
    for (var i=0, len=sidenavs.length;i < len; i++){
        closeNavCategorie(sidenavs[i].id);
    }
}
// Get the modal
//var modal = document.getElementById('#myModal');

// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];
//  window.onclick = function(event) {
//      if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

var titredeCarte = "Carte du pourcentage d'individu en fonction de la corpulence";
var tabCouleurBleu = ["#adccff","#77aaff","#478cff","#0562ff", "#001e82"];
var tabCouleurRouge = [" #ffb3b3"," #ff4d4d","#e60000"," #990000", " #4d0000"];
var tabCouleurVert = [" #99ff99"," #1aff1a","#00cc00","  #008000", " #003300"];
var tabCouleurJaune = ["  #ffff80","  #ffff00","#b3b300","  #808000", " #333300"];

var criteresBmi = {
    total: "toute la population",
    sousPoids: "pop avec IMC < 18",
    poidsNormal: "pop avec 18 < IMC < 25",
    surPoids: "pop avec 25 < IMC < 30",
    obesite: "pop avec 30 < IMC"
}

var tabCritereBmi = {
    sousPoids: [12,16,19,22],
    poidsNormal: [40,45,50,55],
    surPoids: [12,16,19,22],
    obesite: [8,10,13,15]
}
;
var tabCritereFastFood = {
    total: [14,18,22,27],
    sousPoids: [14,18,22,27],
    poidsNormal: [14,18,22,27],
    surPoids: [14,18,22,27],
    obesite: [14,18,22,27]
};
var tabCritereViande = {
    total: [14,18,22,27],
    sousPoids: [14,18,22,27],
    poidsNormal: [14,18,22,27],
    surPoids: [14,18,22,27],
    obesite: [14,18,22,27]
};
var tabCriterePoisson = {
    total: [8.5,12,15,17],
    sousPoids: [8.5,12,15,17],
    poidsNormal: [8.5,12,15,17],
    surPoids: [8.5,12,15,17],
    obesite: [8.5,12,15,17],
};
var tabCritereFruit = {
    total: [15,18,20,25],
    sousPoids: [15,18,20,25],
    poidsNormal: [15,18,20,25],
    surPoids: [15,18,20,25],
    obesite: [15,18,20,25]
};
var tabCritereTele = {
    total: [130,140,152,165],
    sousPoids: [130,140,152,165],
    poidsNormal: [130,140,152,165],
    surPoids: [130,140,152,165],
    obesite: [130,140,152,165]
};
var tabCritereActivite = {
    total: [500,585,660,730],
    sousPoids: [500,585,660,730],
    poidsNormal: [500,585,660,730],
    surPoids: [500,585,660,730],
    obesite: [500,585,660,730]
};

function htmlClick(numeroRegion, nomRegion) {return htmlClickCategorie(numeroRegion, nomRegion, "total");}
function pourcentage(numeroRegion) {return pourcentageBmi(numeroRegion, "obesite")}
function htmlMouseOver(numeroRegion, nomRegion) { return htmlPourcentageBmi(numeroRegion, nomRegion, "obesite");}
function sousTitreLegende1() {return "% de " + criteresBmi["obesite"];}
function sousTitreLegende2() {return "";}
function sousTitreLegende3() {return "";}
var tabCouleur = tabCouleurBleu;
var tabCritere = tabCritereBmi["obesite"];
var uniteLegende = "%";


function choixBmi(categorie){
    titredeCarte = "Carte de la corpulence";
    tabCouleur = tabCouleurBleu;
    tabCritere = tabCritereBmi[categorie];
    pourcentage = function(numeroRegion) {return pourcentageBmi(numeroRegion,categorie);}
    htmlMouseOver = function(numeroRegion, nomRegion) {return htmlPourcentageBmi(numeroRegion, nomRegion, categorie);}
    htmlClick = function(numeroRegion, nomRegion) {return htmlClickCategorie(numeroRegion, nomRegion, categorie);}
    uniteLegende = "%";
    sousTitreLegende1 = function() {return "% de " + criteresBmi[categorie];}
    sousTitreLegende2 = function() {return "";}
    sousTitreLegende3 = function() {return "";}
    updateCouleurCarte();
    updateTitreCarte();
    updateLegende();
}
function choixFastFood(categorie){
    titredeCarte = "Carte des fastfoods";
    tabCouleur = tabCouleurJaune;
    tabCritere = tabCritereFastFood[categorie];
    htmlMouseOver = function(numeroRegion, nomRegion) {return htmlFastFood(numeroRegion, nomRegion, categorie);}
    pourcentage = function(numeroRegion) {return pourcentageFastFood(numeroRegion, categorie);}
    htmlClick = function(numeroRegion, nomRegion) {return htmlClickCategorie(numeroRegion, nomRegion, categorie);}
    uniteLegende = "%";
    sousTitreLegende1 = function() {return "% de personne allant au";}
    sousTitreLegende2 = function() {return "fastfood régulièrement ";}
    if (categorie == "total") {
        sousTitreLegende3 = function() {return "pour toute la population"}
    } else {
        sousTitreLegende3 = function() {return "chez la " + criteresBmi[categorie];}
    }
    updateCouleurCarte();
    updateTitreCarte();
    updateLegende();
}

function choixViande(categorie){
    titredeCarte = "Carte de la viande";
    tabCouleur = tabCouleurRouge;
    tabCritere = tabCritereViande[categorie];
    htmlMouseOver = function (numeroRegion, nomRegion) {return htmlViande(numeroRegion, nomRegion, categorie);}
    pourcentage= function (numeroRegion) {return pourcentageViande(numeroRegion, categorie);}
    htmlClick = function(numeroRegion, nomRegion) {return htmlClickCategorie(numeroRegion, nomRegion, categorie);}
    uniteLegende = "%"
    sousTitreLegende1 = function() {return "% de personne aimant";}
    sousTitreLegende2 = function() {return "la viande ";}
    if (categorie == "total") {
        sousTitreLegende3 = function() {return "pour toute la population"}
    } else {
        sousTitreLegende3 = function() {return "chez la " + criteresBmi[categorie];}
    }
    updateCouleurCarte();
    updateTitreCarte();
    updateLegende();

}

function choixPoisson(categorie){
    titredeCarte = "Carte du poisson";
    tabCouleur = tabCouleurVert;
    tabCritere = tabCriterePoisson[categorie];
    htmlMouseOver = function(numeroRegion, nomRegion) {return htmlMPois(numeroRegion, nomRegion, categorie);}
    pourcentage = function(numeroRegion) {return pourcentagePoisson(numeroRegion, categorie);}
    htmlClick = function(numeroRegion, nomRegion) {return htmlClickCategorie(numeroRegion, nomRegion, categorie);}
    uniteLegende = "%";
    sousTitreLegende1 = function() {return "% de personne aimant";}
    sousTitreLegende2 = function() {return "le poisson ";}
    if (categorie == "total") {
        sousTitreLegende3 = function() {return "pour toute la population"}
    } else {
        sousTitreLegende3 = function() {return "chez la " + criteresBmi[categorie];}
    }
    updateCouleurCarte();
    updateTitreCarte();
    updateLegende();
}

function choixFruit(categorie){
    titredeCarte = "Carte des fruits";
    tabCouleur = tabCouleurVert;
    tabCritere = tabCritereFruit[categorie];
    htmlMouseOver = function (numeroRegion, nomRegion) {return htmlFruit(numeroRegion, nomRegion, categorie);}
    pourcentage = function (numeroRegion) {return pourcentageFruit(numeroRegion, categorie);}
    htmlClick = function(numeroRegion, nomRegion) {return htmlClickCategorie(numeroRegion, nomRegion, categorie);}
    uniteLegende = "%";
    sousTitreLegende1 = function() {return "% de personne aimant";}
    sousTitreLegende2 = function() {return "les fruits ";}
    if (categorie == "total") {
        sousTitreLegende3 = function() {return "pour toute la population"}
    } else {
        sousTitreLegende3 = function() {return "chez la " + criteresBmi[categorie];}
    }
    updateCouleurCarte();
    updateTitreCarte();
    updateLegende();
}

function choixTele(categorie){
    titredeCarte = "Carte de la télévision";
    tabCouleur = tabCouleurRouge;
    tabCritere = tabCritereTele[categorie];
    htmlMouseOver = function (numeroRegion, nomRegion) {return htmlTele(numeroRegion, nomRegion, categorie);}
    pourcentage = function (numeroRegion) {return pourcentageTele(numeroRegion, categorie);}
    htmlClick = function(numeroRegion, nomRegion) {return htmlClickCategorie(numeroRegion, nomRegion, categorie);}
    uniteLegende = " minutes";
    sousTitreLegende1 = function() {return "moyenne du temps passé";}
    sousTitreLegende2 = function() {return "devant la télévision ";}
    if (categorie == "total") {
        sousTitreLegende3 = function() {return "pour toute la population"}
    } else {
        sousTitreLegende3 = function() {return "chez la " + criteresBmi[categorie];}
    }
    updateCouleurCarte();
    updateTitreCarte();
    updateLegende();
}

function choixActivite(categorie){
    titredeCarte = "Carte du sport";
    tabCouleur = tabCouleurBleu;
    tabCritere = tabCritereActivite[categorie];
    htmlMouseOver = function (numeroRegion, nomRegion) {return htmlActivite(numeroRegion, nomRegion, categorie);}
    pourcentage = function (numeroRegion, nomRegion) {return pourcentageActivite(numeroRegion, categorie);}
    htmlClick = function(numeroRegion, nomRegion) {return htmlClickCategorie(numeroRegion, nomRegion, categorie);}
    uniteLegende = " minutes";
    sousTitreLegende1 = function() {return "moyenne du temps de sport";}
    sousTitreLegende2 = function() {return "hebdomadaire ";}
    if (categorie == "total") {
        sousTitreLegende3 = function() {return "pour toute la population"}
    } else {
        sousTitreLegende3 = function() {return "chez la " + criteresBmi[categorie];}
    }
    updateCouleurCarte();
    updateTitreCarte();
    updateLegende();
}

function updateTitreCarte(){
    document.getElementById("titreCarte").innerHTML = titredeCarte;
}


function updateCouleurCarte(){
    var divs = document.getElementsByTagName("path");
    for (var i=0, len=divs.length;i < len; i++){
        if(divs[i].className.baseVal=="region"){
            divs[i].style.fill = couleur(numeroRegion(divs[i].getAttribute("regName")),divs[i].getAttribute("regName"));
        }
    }
}

function updateLegende(){
    var sousTitre1 = document.getElementById("sousTitre1");
    sousTitre1.innerHTML = sousTitreLegende1();
    var sousTitre2 = document.getElementById("sousTitre2");
    sousTitre2.innerHTML = sousTitreLegende2();
    var sousTitre3 = document.getElementById("sousTitre3");
    sousTitre3.innerHTML = sousTitreLegende3();

    var carres = document.getElementsByTagName("rect");
    for (var i=0, len=carres.length; i<len; i++){
        if(carres[i].className.baseVal=="carreLegende") {
            carres[i].style.fill = couleurLegende(carres[i].id);
        }
    }

    var textes = document.getElementsByTagName("text")
    for (var i=0, len=textes.length; i<len; i++){
        if(textes[i].className.baseVal=="texteLegende") {
            textes[i].innerHTML = texteLegende(textes[i].id);
        }
    }
}



$(document).ready(function() {
    $('ul li').on('click', function() {
        $('li').removeClass('active');
        $(this).addClass('active');
    });
    personnes = [];
    d3.csv("src/Table_indiv.csv", function(data) {
        data.forEach(function(d) {
            d.bmi = +d.bmi;
            d["v2_age"] = +d["v2_age"];
            if(!isNaN(d.bmi) && d.bmi.toString().indexOf('.') != -1 && !isNaN(d.bmi) && d.bmi.toString().indexOf('.') != -1){
                var personneTemp = new Personne(d["v2_age"], d.bmi);
                personnes.push(personneTemp);
            }
        });
        personnes.sort(function(a, b) {
            return a.x - b.x;
        })
        makeAverage(personnes);
        myDataIsReady();
    });
});

function makeAverage(tabToMakeAverage){
    var currentAge = tabToMakeAverage[0].x;
    personnes = [];
    var counter = 1;
    var sum = tabToMakeAverage[0].y;
    for (var key in tabToMakeAverage){
        var ageCour = tabToMakeAverage[key].x;
        var imcCour = tabToMakeAverage[key].y;
        if (ageCour != currentAge){
            personnes.push({x: currentAge, y: sum / counter});
            currentAge = ageCour;
            sum = imcCour;
            counter = 1;
        }else{
            sum += imcCour;
            counter++;
        }
    }
}

var color = Chart.helpers.color;
var config = {

    type: 'line',
    data: {
        datasets: [{

            label: "Data Gouv INCA2",
            borderColor: window.chartColors.red,
            backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
            data: personnes
        }]
    },
    options: {
        //responsive: true,
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Age'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'IMC'
                }
            }]
        }
    }
};


function myDataIsReady() {
    var ctx = document.getElementById("lineChart").getContext("2d");
    window.myScatter = Chart.Scatter(ctx,{

        type: 'line',
        data: {
            datasets: [{
                label: "Data Gouv INCA2",
                borderColor: window.chartColors.black,
                backgroundColor: color(window.chartColors.black).alpha(0.9).rgbString(),
                data: personnes
            }]
        },
        options: {
            /*responsive: true,
            title:{
            display:true,
            text:'IMC en fonction de l\'âge',
            fontSize: '29'
            font*/
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Age'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'IMC'
                }
            }]
        }

    });
};
