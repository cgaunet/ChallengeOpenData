var personnes = [];
var criteres = {};
var counterDatasets = 0;
var backgroundColor = [window.chartColors.green, window.chartColors.yellow, window.chartColors.blue, window.chartColors.orange]
var mustMakeAverage = true;

function initCriteres(){
    criteres["aptotal_hebdo"] = {min: 0, max: 2000};
    criteres["tele"] = {min: 0, max: 500};
    criteres["bonalim"] = [0,1,2,3,4,9];
    criteres["mfruit"] = [0,1,2,3,4,9];
    criteres["fastfood"] = {min: 0, max: 30};
    criteres["mpois"] = [0,1,2,3,4,9];
}

$(function() {
    initCriteres();
    loadData(myDataIsReady);
    $('.slider').slider();
});

function loadData(callback){
    personnes = [];
    d3.csv("src/Table_indiv.csv", function(data) {
        data.forEach(function(d) {
            d.bmi = +d.bmi;
            d["v2_age"] = +d["v2_age"];
            d.tele = +d.tele;
            d["aptotal_hebdo"] = +d["aptotal_hebdo"];
            d.fastfood = +d.fastfood;
            d.mfruit = +d.mfruit;
            d.mvian = +d.mvian;
            d.mpois = +d.mpois;
            d.region = +d.region;
            d.entrerep = +d.entrerep;
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

function reduceDataForLineChart(){
    var personnesTemp = [];
    for (var key in personnes){
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
        if (personnes[key].x - agePrec > 1){
            for (var i = 0; i < personnes[key].x - agePrec - 1; i++){
                ordonnees.push(NaN);
            }
        }
        agePrec = personnes[key].x;
        ordonnees.push(personnes[key].y);
    }

    var newDataset = {
        label: 'Courbe suivant les critères',// + (counterDatasets+1).toString(),
        backgroundColor: backgroundColor[counterDatasets%4],
        borderColor: backgroundColor[counterDatasets%4],
        data: ordonnees,
        fill: false
    };

    updateChart(newDataset);
}

function reduceDataForScatterChart(){
  var personnesTemp = [];
  for (var key in personnes){
      var personneTemp = personnes[key];
      if (correspondsToCriterias(personneTemp)){
          personnesTemp.push(personneTemp);
      }
  }
  personnes = personnesTemp;

  var newDataset = {
      label: 'Courbe suivant les critères',// + (counterDatasets+1).toString(),
      backgroundColor: backgroundColor[counterDatasets%4],
      borderColor: backgroundColor[counterDatasets%4],
      data: convertDatasetPersonnesToScatterDataset(personnes),
      fill: false
  };

  updateChart(newDataset);
}

function updateChart(newDataset){
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

        containsTemp = false;
        for (var key in criteres["mfruit"]){
            if (criteres["mfruit"][key] == personne.mfruit){containsTemp = true;}
        }
        if (!containsTemp){return false;}

        for (var key in criteres["mpois"]){
            if (criteres["mpois"][key] == personne.mpois){containsTemp = true;}
        }
        if (!containsTemp){return false;}

        if (!isNaN(personne.aptotal_hebdo) && personne.aptotal_hebdo >= criteres["aptotal_hebdo"].min && personne.aptotal_hebdo <= criteres["aptotal_hebdo"].max){
            if (!isNaN(personne.fastfood)){
                var nbJPerMonths = getValueFromAnswer("fastfood", personne.fastfood);
                if (nbJPerMonths >= criteres["fastfood"].min && nbJPerMonths <= criteres["fastfood"].max){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    return false;
}

function getValueFromAnswer(criteria, value){
    switch (criteria) {
        case "fastfood":
        switch (value) {
            case 1:
            return 30;
            break;
            case 2:
            return 20;
            break;
            case 3:
            return 14;
            break;
            case 4:
            return 4;
            break;
            case 5:
            return 1;
            break;
            case 6:
            return 0;
            break;
            default:
            return 5;
            break;
        }
        break;
        default:
        break;
    }
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
    var valuesFastFood = $("#slider-fastfood").attr("data-value").split(",");
    criteres["fastfood"] = {min : valuesFastFood[0], max : valuesFastFood[1]}
    if (mustMakeAverage){
      loadData(reduceDataForLineChart);
    }else{
      loadData(reduceDataForScatterChart);
    }

});

$(":checkbox").change(function(){
    criteres["bonalim"] = [];
    $('#checkboxesBonAlim :checkbox').each(function () {
        if(this.checked){
            criteres["bonalim"].push(+$(this).val());
        }
    });
    criteres["bonalim"].push(0);
    criteres["bonalim"].push(4);
    criteres["bonalim"].push(9);

    criteres["mfruit"] = [];
    $('#checkboxesMFruits :checkbox').each(function () {
        if(this.checked){
            criteres["mfruit"].push(+$(this).val());
        }
    });
    criteres["mfruit"].push(0);
    criteres["mfruit"].push(4);
    criteres["mfruit"].push(9);

    criteres["mpois"] = [];
    $('#checkboxesMPois :checkbox').each(function () {
        if(this.checked){
            criteres["mpois"].push(+$(this).val());
        }
    });
    criteres["mpois"].push(0);
    criteres["mpois"].push(4);
    criteres["mpois"].push(9);
    if (mustMakeAverage){
      loadData(reduceDataForLineChart);
    }else{
      loadData(reduceDataForScatterChart);
    }
});

$("#radiosChoiceDisplay :radio").change(function(){
    if($('#radiosChoiceDisplay :radio:checked').val() == "line"){
      mustMakeAverage = true;
      window.myScatter.destroy();
      loadData(myDataIsReady);
    }else{
      mustMakeAverage = false;
      window.myScatter.destroy();
      loadData(createNewScatterChart);
      // reduceDataForScatterChart
    }
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
        ordonnees.push(personnes[key].y.toFixedDown(2));
    }

    createNewLineChart(abscisses, ordonnees);
}

function createNewLineChart(labels, dataset){
  var config = {
      type: 'line',
      data: {
          labels : labels,
          datasets: [{
              label: "Courbe de référence",
              data: dataset,
              //borderDash: [5, 5],
              borderColor: window.chartColors.red,
              backgroundColor: 'rgba(0, 0, 0, 0)',
              fill: false,
              cubicInterpolationMode: 'monotone'
          }]
      },
      options: {
          responsive: true,
          title:{
              display:false,
              text:"Courbe de l'IMC en fonction de l'âge"
          },

          tooltips: {
              mode: 'index',
          }
      }
  };

  var ctx = document.getElementById("chart").getContext("2d");
  window.myScatter = new Chart(ctx,config);
  counterDatasets = 1;
  window.myScatter.update();

}
function convertDatasetPersonnesToScatterDataset(datasetPersonnes){
  var scatterDataset = [];
    for (var key in datasetPersonnes){
      scatterDataset.push({x: datasetPersonnes[key].age, y: datasetPersonnes[key].bmi.toFixedDown(2)});
    }
  return scatterDataset;
}

/**
* Used only when you change the mode of display. Hence, the data are already loaded in personnes.
*
*
**/
function createNewScatterChart(){
  var config = {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Toutes les valeurs',
            data: convertDatasetPersonnesToScatterDataset(personnes),
            borderColor: window.chartColors.red,
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
  }

  var ctx = document.getElementById("chart").getContext("2d");
  window.myScatter = new Chart(ctx,config);
  counterDatasets = 1;
  window.myScatter.update();
}
