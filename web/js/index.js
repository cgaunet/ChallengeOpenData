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
  // Get the modal
  //var modal = document.getElementById('#myModal');

  // Get the <span> element that closes the modal
  //var span = document.getElementsByClassName("close")[0];
  //  window.onclick = function(event) {
  //      if (event.target == modal) {
  //         modal.style.display = "none";
  //     }
  // }

  var titredeCarte = "l'obésité";

  function htmlFuncMouseOver(numeroRegion, nomRegion) { return htmlPourcentageObesite(numeroRegion, nomRegion)}
  function couleurCarte (numeroRegion, nomRegion) {return couleurObesite(numeroRegion, nomRegion)}

  function choixObesite(){
    titredeCarte = "l'obésité"
    updateTitreCarte();
    htmlFuncMouseOver = function (numeroRegion, nomRegion) {return htmlPourcentageObesite(numeroRegion, nomRegion)}
    couleurCarte = function (numeroRegion, nomRegion) {return couleurObesite(numeroRegion, nomRegion)}
    updateCouleurCarte();

  }
  function choixFastFood(){
    titredeCarte = "la consommation de Fast food"
    updateTitreCarte();
    htmlFuncMouseOver = function (numeroRegion, nomRegion) {return htmlFastFood(numeroRegion, nomRegion)}
    couleurCarte = function (numeroRegion, nomRegion) {return couleurFastFood(numeroRegion, nomRegion)}
    updateCouleurCarte();
  }

  function choixViande(){
    titredeCarte = "la consommation de viande"
    updateTitreCarte();
    htmlFuncMouseOver = function (numeroRegion, nomRegion) {return htmlViande(numeroRegion, nomRegion)}
    couleurCarte = function (numeroRegion, nomRegion) {return couleurViande(numeroRegion, nomRegion)}
    updateCouleurCarte();

  }
  function choixPoisson(){
    titredeCarte = "la consommation de poisson"
    updateTitreCarte();
    htmlFuncMouseOver = function (numeroRegion, nomRegion) {return htmlMPois(numeroRegion, nomRegion)}
    couleurCarte = function (numeroRegion, nomRegion) {return couleurPoisson(numeroRegion, nomRegion)}
    updateCouleurCarte();
  }
  function choixFruit(){
    titredeCarte = "la consommation de fruits"
    updateTitreCarte();
    htmlFuncMouseOver = function (numeroRegion, nomRegion) {return htmlFruit(numeroRegion, nomRegion)}
    couleurCarte = function (numeroRegion, nomRegion) {return couleurFruit(numeroRegion, nomRegion)}
    updateCouleurCarte();
  }



  function updateTitreCarte(){
    var text = "";
    text += "<b>Carte de ";
    text += titredeCarte;
    text += "</b>";
    document.getElementById("titreCarte").innerHTML = text;

  }



  $(document).ready(function() {
    //$('#myModal').modal('show');

    // $("#sidebar").mCustomScrollbar({
    //  theme: "minimal"
    // });
    //
    // $('#sidebarCollapse').on('click', function () {
    //     $('#sidebar').toggleClass('active');
    //     $('.collapse.in').toggleClass('in');
    //     // and also adjust aria-expanded attributes we use for the open/closed arrows
    //     // in our CSS
    //     $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    // });


    console.log(document.getElementById("titreCarte").innerHTML);

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

  /*
  $("#display").click(function () {
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

        }
      });
  });
  */

  function makeAverage(tabToMakeAverage){
      var currentAge = tabToMakeAverage[0].x;
      personnes = []
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
      //window.myLine = new Chart(ctx, config);

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
                 font
             },*/
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
      }
    );
  };
