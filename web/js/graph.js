var personnes = [];
var criteres = {};
var counterDatasets = 0;
var backgroundColor = [window.chartColors.green, window.chartColors.bordeaux, window.chartColors.blue, window.chartColors.purple]
var mustMakeAverage = true;
var maxDatasets = 2;
var counterDatasetsOfWholeTime = 0;

/***
* Function to initialize the criteres array to its default values.
***/
function initCriteres(){
    criteres["aptotal_hebdo"] = {min: 0, max: 2000};
    criteres["tele"] = {min: 0, max: 500};
    criteres["bonalim"] = [0,1,2,3,4,9];
    criteres["mfruit"] = [0,1,2,3,4,9];
    criteres["fastfood"] = {min: 0, max: 30};
    criteres["mpois"] = [0,1,2,3,4,9];
    criteres["mvian"] = [0,1,2,3,4,9];
}

$(function() {
    initCriteres();
    loadData(myDataIsReady);
    $('.slider').slider({focus: true });
});

/***
* Load the data and put it in the personnes array. It can calls a callback function if needed.
***/
function loadData(callback){
    personnes = [];
    d3.csv("src/Table_indiv.csv", function(data) {
        data.forEach(function(d) {
            // We use the unary plus to convert from string to numeric value.
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
            if(!isNaN(d["v2_age"]) && !isNaN(d.bmi) && d.bmi.toString().indexOf('.') != -1){ //To check if the age is a double value.
                var personneTemp = new Personne(d["v2_age"], d.bmi, d.entrerep, d.mfruit, d.bonalim, d.tele, d.mvian, d.mpois, d.fastfood, d["aptotal_hebdo"], d.region);
                personnes.push(personneTemp);
            }
        });

        //Sort the personnes array with the age of each people.
        personnes.sort(function(a, b) {
            return a.age - b.age;
        })
        //Call a callback function when needed.
        callback();
    });
}


/***
* Keeps only the people that match the criterias, create a new dataset and pass it to the updateChart function.
* this version is meant for the line chart.
***/
function reduceDataForLineChart(){
    var personnesTemp = [];

    for (var key in personnes){
        var personneTemp = personnes[key];
        if (correspondsToCriterias(personneTemp)){
            personnesTemp.push(personneTemp);
        }
    }
    personnes = personnesTemp;
    //Make the average of the bmi for a given age for every people in the personnes array.
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
        label: 'Courbe suivant les critères n°' + (counterDatasetsOfWholeTime+1).toString(),
        backgroundColor: backgroundColor[counterDatasetsOfWholeTime%4],
        borderColor: backgroundColor[counterDatasetsOfWholeTime%4],
        data: ordonnees,
        fill: false
    };

    updateChart(newDataset);
}

/***
* Keeps only the people that match the criterias, create a new dataset and pass it to the updateChart function.
* this version is meant for the scatter chart.
***/
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
      label: 'Courbe suivant les critères n°' + (counterDatasetsOfWholeTime+1).toString(),
      backgroundColor: backgroundColor[counterDatasetsOfWholeTime%4],
      borderColor: backgroundColor[counterDatasetsOfWholeTime%4],
      data: convertDatasetPersonnesToScatterDataset(personnes),
      fill: false
  };

  updateChart(newDataset);
}

/***
* Add the dataset provided and update the chart.
***/
function updateChart(newDataset){
  window.myScatter.config.data.datasets.push(newDataset);
  counterDatasets++;
  counterDatasetsOfWholeTime++;
  removeDatasetIfNeeded();
  window.myScatter.update();
}

/***
*
***/
function removeDatasetIfNeeded(){
    if (counterDatasets >= maxDatasets + 1){
        window.myScatter.config.data.datasets.splice(1,1);
        counterDatasets--;
    }
}

/***
* Returns true if one corresponds to the criterias given by the array criteres, else it returns false
***/
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

        for (var key in criteres["mvian"]){
            if (criteres["mvian"][key] == personne.mvian){containsTemp = true;}
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

/***
*Some values aren't numeric so it needs this kind of mapping.
***/
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

var wto;
$(".slider").change(function(){
    updateTextValueForSliders();

    //Set a timeout so that when the slider is changed it doesn't make many new graphs
    clearTimeout(wto);
    wto = setTimeout(function() {
        if (mustMakeAverage){
          loadData(reduceDataForLineChart);
        }else{
          loadData(reduceDataForScatterChart);
        }
    }, 500);
});

/**
*Function to update the values displayed above the sliders in order to provide
* to the user the current value from the slider.
**/
function updateTextValueForSliders(){
    /////////////////////////aptotal_hebdo//////////////////////////////////
    var valuesApTotal = $("#slider-aptotalhebdo").attr("data-value").split(",");
    criteres["aptotal_hebdo"] = {min : valuesApTotal[0], max : valuesApTotal[1]}
    $("#textSliderApTotal").empty();
    $("#textSliderApTotal").append("<b>" + valuesApTotal[0] + ":" + valuesApTotal[1] + "</b>");
    /////////////////////////tele//////////////////////////////////
    var valuesTele = $("#slider-tele").attr("data-value").split(",");
    criteres["tele"] = {min : valuesTele[0], max : valuesTele[1]}
    $("#textSliderTele").empty();
    $("#textSliderTele").append("<b>" + valuesTele[0] + ":" + valuesTele[1] + "</b>");
    /////////////////////////fastfood//////////////////////////////////
    var valuesFastFood = $("#slider-fastfood").attr("data-value").split(",");
    criteres["fastfood"] = {min : valuesFastFood[0], max : valuesFastFood[1]}
    $("#textSliderFastfood").empty();
    $("#textSliderFastfood").append("<b>" + valuesFastFood[0] + ":" + valuesFastFood[1] + "</b>");
}


$(":checkbox").change(function(){
    criteres["bonalim"] = [];
    criteres["mfruit"] = [];
    criteres["mpois"] = [];
    criteres["mvian"] = [];

    $('#checkboxesBonAlim :checkbox').each(function () {
        if(this.checked){
            criteres["bonalim"].push(+$(this).val());
            if ($(this).val() == 3){
                addSomeNumbers("bonalim");
            }
        }
    });

    $('#checkboxesMFruits :checkbox').each(function () {
        if(this.checked){
            criteres["mfruit"].push(+$(this).val());
            if ($(this).val() == 3){
                addSomeNumbers("mfruit");
            }
        }
    });

    $('#checkboxesMPois :checkbox').each(function () {
        if(this.checked){
            criteres["mpois"].push(+$(this).val());
            if ($(this).val() == 3){
                addSomeNumbers("mpois");
            }
        }
    });

    $('#checkboxesMVian :checkbox').each(function () {
        if(this.checked){
            criteres["mvian"].push(+$(this).val());
            if ($(this).val() == 3){
                addSomeNumbers("mvian");
            }
        }
    });

    if (mustMakeAverage){
      loadData(reduceDataForLineChart);
    }else{
      loadData(reduceDataForScatterChart);
    }
});

/***
*Add some numbers when the choice is "I dont know" because "didn't answer" is almost the same.
**/
function addSomeNumbers(critere){
    criteres[critere].push(0);
    criteres[critere].push(4);
    criteres[critere].push(9);
}


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


/***
* Functions to update the number maxDatasets if the minus or the plus button is clicked.
***/

$("#removeDataset").click(function(){
    if (maxDatasets > 2){
        maxDatasets--;
        removeDatasetIfNeeded();
        window.myScatter.update();
        $("#nbMaxGraph").empty();
        $("#nbMaxGraph").append("<b>" + maxDatasets + "</b>");
    }
});

$("#addDataset").click(function(){
    maxDatasets++;
    $("#nbMaxGraph").empty();
    $("#nbMaxGraph").append("<b>" + maxDatasets + "</b>");
});
