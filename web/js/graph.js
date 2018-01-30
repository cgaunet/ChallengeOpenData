var personnes = [];
var criteres = {};
var counterDatasets = 0;
var backgroundColor = [window.chartColors.green, window.chartColors.yellow, window.chartColors.blue, window.chartColors.orange]

function initCriteres(){
    criteres["aptotal_hebdo"] = {min: 0, max: 2000};
    criteres["tele"] = {min: 0, max: 500};
    criteres["bonalim"] = [0,1,2,3,4,9];
}

$(function() {
    initCriteres();
    loadData(myDataIsReady, false);
    //myDataIsReady();
    $('.slider').slider();
});

function loadData(callback, toBeUpdated){
    personnes = [];
    d3.csv("src/Table_indiv.csv", function(data) {
        data.forEach(function(d) {
            d.bmi = +d.bmi;
            d["v2_age"] = +d["v2_age"];
            d.tele = +d.tele;
            d["aptotal_hebdo"] = +d["aptotal_hebdo"];
            if(!isNaN(d["v2_age"]) && !isNaN(d.bmi) && d.bmi.toString().indexOf('.') != -1){ //
                var personneTemp = new Personne(d["v2_age"], d.bmi, d.entrerep, d.mfruit, d.bonalim, d.tele, d.mvian, d.mpois, d.fastfood, d["aptotal_hebdo"], d.region);
                personnes.push(personneTemp);
            }
        });
        personnes.sort(function(a, b) {
            return a.age - b.age;
        })
        callback();
    });
}

function reduceData(){
    var personnesTemp = [];
    //console.log(criteres["age"].min);
    for (var key in personnes){
        //console.log(personnes);
        var personneTemp = personnes[key];
        if (correspondsToCriterias(personneTemp)){
            personnesTemp.push(personneTemp);
        }
    }
    personnes = personnesTemp;
    makeAverage(personnes);
    var abscisses = [];
    var ordonnees = [];
    var agePrec = 3;
    for (var key in personnes){
        //abscisses.push((personnes[key].x).toString());
        if (personnes[key].x - agePrec > 1){
            ordonnees.push(NaN);
        }
        agePrec = personnes[key].x;
        ordonnees.push(personnes[key].y);
    }

    var newDataset = {
        label: 'Dataset ' + (counterDatasets+1).toString(),
        backgroundColor: backgroundColor[counterDatasets%4],
        borderColor: backgroundColor[counterDatasets%4],
        data: ordonnees,
        fill: false
    };

    window.myScatter.config.data.datasets.push(newDataset);
    counterDatasets++;
    if (counterDatasets >= 3){
        window.myScatter.config.data.datasets.splice(1,1);
    }
    window.myScatter.update();
}

function correspondsToCriterias(personne){
    var containsTemp = false;
    if (!isNaN(personne.tele) && personne.tele >= criteres["tele"].min && personne.tele <= criteres["tele"].max){
        for (var key in criteres["bonalim"]){
            if (criteres["bonalim"][key] == personne.bonalim){containsTemp = true;}
        }
        if (!containsTemp){return false;}
        if (!isNaN(personne.aptotal_hebdo) && personne.aptotal_hebdo >= criteres["aptotal_hebdo"].min && personne.aptotal_hebdo <= criteres["aptotal_hebdo"].max){
            return true;
        }else{
            return false;
        }
    }
    return false;
}



function Personne(age, bmi, entrerep, mfruit, bonalim, tele, mvian, mpois, fastfood, aptotal_hebdo, region) {
    this.age = age;
    this.bmi = bmi;
    this.entrerep = entrerep;
    this.mfruit = mfruit;
    this.bonalim = bonalim;
    this.tele = tele;
    this.mvian = mvian;
    this.mpois = mpois;
    this.fastfood = fastfood;
    this.aptotal_hebdo = aptotal_hebdo;
    this.region = region;
}

$(".slider").change(function(){
    var valuesApTotal = $("#slider-aptotalhebdo").attr("data-value").split(",");
    criteres["aptotal_hebdo"] = {min : valuesApTotal[0], max : valuesApTotal[1]}
    var valuesTele = $("#slider-tele").attr("data-value").split(",");
    criteres["tele"] = {min : valuesTele[0], max : valuesTele[1]}
    loadData(reduceData, true);
});

$(":checkbox").change(function(){ //#checkboxesBonAlim
    criteres["bonalim"] = [];
    $('#checkboxesBonAlim :checkbox').each(function () { //#checkboxesBonAlim
        if(this.checked){
            criteres["bonalim"].push(+$(this).val());
        }
    });
    criteres["bonalim"].push(0);
    criteres["bonalim"].push(4);
    criteres["bonalim"].push(9);
});


function makeAverage(tabToMakeAverage){
    var currentAge = tabToMakeAverage[0].age;
    personnes = []
    var counter = 1;
    var sum = tabToMakeAverage[0].bmi;
    for (var key in tabToMakeAverage){
        var ageCour = tabToMakeAverage[key].age;
        var imcCour = tabToMakeAverage[key].bmi;
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

function myDataIsReady() {
    makeAverage(personnes);
    var color = Chart.helpers.color;
    var abscisses = [];
    var ordonnees = [];
    for (var key in personnes){
        abscisses.push((personnes[key].x).toString());
        ordonnees.push(personnes[key].y);
    }

    var config = {
        type: 'line',
        data: {
            labels : abscisses,
            datasets: [{
                label: "Courbe de référence",
                data: ordonnees,
                borderColor: window.chartColors.red,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                fill: false,
                cubicInterpolationMode: 'monotone'
            }]
        },
        options: {
            responsive: true,
            title:{
                display:true,
                text:"Courbe de l'IMC en fonction de l'âge"
            },
            tooltips: {
                mode: 'index'
            }
        }
    };

    var ctx = document.getElementById("lineChart").getContext("2d");
    window.myScatter = new Chart(ctx,config);
    counterDatasets++;
    window.myScatter.update();
}
