$(document).ready(function(){

  var map = {
  	1: {name: "\u00cele-de-France", bmi: 0, number: 0, average: 0, personnes: []},
  	2: {name: "Champagne-Ardenne", bmi: 0, number: 0, average: 0, personnes: []},
  	3: {name: "Picardie", bmi: 0, number: 0, average: 0, personnes: []},
  	4: {name: "Haute-Normandie", bmi: 0, number: 0, average: 0, personnes: []},
  	5: {name: "Centre", bmi: 0, number: 0, average: 0, personnes: []},
  	6: {name: "Basse-Normandie", bmi: 0, number: 0, average: 0, personnes: []},
  	7: {name: "Bourgogne", bmi: 0, number: 0, average: 0, personnes: []},
  	8: {name: "Nord-Pas-de-Calais", bmi: 0, number: 0, average: 0, personnes: []},
  	9: {name: "Lorraine", bmi: 0, number: 0, average: 0, personnes: []},
  	10: {name: "Alsace", bmi: 0, number: 0, average: 0, personnes: []},
  	11: {name: "Franche-Comt\u00e9", bmi: 0, number: 0, average: 0, personnes: []},
  	12: {name: "Pays de la Loire", bmi: 0, number: 0, average: 0, personnes: []},
  	13: {name: "Bretagne", bmi: 0, number: 0, average: 0, personnes : []},
  	14: {name: "Poitou-Charentes", bmi: 0, number: 0, average: 0, personnes: []},
  	15: {name: "Aquitaine", bmi: 0, number: 0, average: 0, personnes: []},
  	16: {name: "Midi-Pyr\u00e9n\u00e9es", bmi: 0, number: 0, average: 0, personnes: []},
  	17: {name: "Limousin", bmi: 0, number: 0, average: 0, personnes: []},
  	18: {name: "Rh\u00f4ne-Alpes", bmi: 0, number: 0, average: 0, personnes: []},
  	19: {name: "Auvergne", bmi: 0, number: 0, average: 0, personnes: []},
  	20: {name: "Languedoc-Roussillon", bmi: 0, number: 0, average: 0, personnes: []},
  	21: {name: "Provence-Alpes-C\u00f4te d'Azur", bmi: 0, number: 0, average: 0, personnes: []}
  }

  var mapObese = {
    1: {name: "\u00cele-de-France", numberObese: 0, numberTot: 0, percentage: 0},
    2: {name: "Champagne-Ardenne",  numberObese: 0, numberTot: 0, percentage: 0},
    3: {name: "Picardie", numberObese: 0, numberTot: 0, percentage: 0},
    4: {name: "Haute-Normandie", numberObese: 0, numberTot: 0, percentage: 0},
    5: {name: "Centre", numberObese: 0, numberTot: 0, percentage: 0},
    6: {name: "Basse-Normandie",numberObese: 0, numberTot: 0, percentage: 0},
    7: {name: "Bourgogne",  numberObese: 0, numberTot: 0, percentage: 0},
    8: {name: "Nord-Pas-de-Calais", numberObese: 0, numberTot: 0, percentage: 0},
    9: {name: "Lorraine", numberObese: 0, numberTot: 0, percentage: 0},
    10: {name: "Alsace", numberObese: 0, numberTot: 0, percentage: 0},
    11: {name: "Franche-Comt\u00e9",numberObese: 0, numberTot: 0, percentage: 0},
    12: {name: "Pays de la Loire",numberObese: 0, numberTot: 0, percentage: 0},
    13: {name: "Bretagne", numberObese: 0, numberTot: 0, percentage: 0},
    14: {name: "Poitou-Charentes",numberObese: 0, numberTot: 0, percentage: 0},
    15: {name: "Aquitaine",numberObese: 0, numberTot: 0, percentage: 0},
    16: {name: "Midi-Pyr\u00e9n\u00e9es",numberObese: 0, numberTot: 0, percentage: 0},
    17: {name: "Limousin", numberObese: 0, numberTot: 0, percentage: 0},
    18: {name: "Rh\u00f4ne-Alpes",numberObese: 0, numberTot: 0, percentage: 0},
    19: {name: "Auvergne", numberObese: 0, numberTot: 0, percentage: 0},
    20: {name: "Languedoc-Roussillon",numberObese: 0, numberTot: 0, percentage: 0},
    21: {name: "Provence-Alpes-C\u00f4te d'Azur",numberObese: 0, numberTot: 0, percentage: 0},
  }

  updateData();

  var tabCouleur = ["#adccff","#77aaff","#478cff","#0562ff", "#001e82"];

  function updateData() {
  	d3.csv("src/Table_indiv.csv", function(data) {
  	    data.forEach(function(d) {
  	      d.bmi = +d.bmi;
  	      if(!isNaN(d.bmi) && d.bmi.toString().indexOf('.') != -1){
  	        map[d.region].bmi += d.bmi;
            map[d.region].number += 1;
            var personneTemp = new Personne(d["v2_age"], d.bmi);
            map[d.region].personnes.push(personneTemp);
            //que les obeses!
            if (d.bmi > 30){
                mapObese[d.region].numberObese += 1;
            }
          }
        })
  	    updateRegionAverage();
        pourcentageObesite();
        d3.json('data/regions.geojson', function(req, geojson) {
      	   regions.selectAll("path")
                  .data(geojson.features)
                  .enter()
                  .append("path")
                  .attr('class', 'region')
                  .attr("d", path)


                  .on("mouseover", function(d) {
                       div.transition()
                              .duration(200)
                              .style("opacity", 0.75);

                       div.html("Région : " + d.properties.nom + "<br>"+
                  			        "Pourcentage obésité: " + ((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2))
                              .style("left", (d3.event.pageX + 30) + "px")
                              .style("top", (d3.event.pageY - 30) + "px")
                              .style("color", "white")
                       console.log("je suis sur une region");
                  })
                  .on("mouseout", function(d) {
                  		div.transition()
                              .duration(0)
                              .style("opacity", 0);
                  		div.html("")
                              .style("left", "0px")
                              .style("top", "0px");
                  })
                  .style("fill", function(d) {
                    if(getRegionNumber(d.properties.nom) != 0){
                      console.log(mapObese[getRegionNumber(d.properties.nom)]);
                      if (((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) < 8){
                        return tabCouleur[0];
                      }
                      if (((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) >= 8 &&
                          ((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) < 10){
                        return tabCouleur[1];
                      }
                      if (((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) >= 10 &&
                          ((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) < 13){
                        return tabCouleur[2];
                      }
                      if (((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) >= 13 &&
                          ((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) < 15){
                        return tabCouleur[3];
                      }
                      if (((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) > 15){
                        return tabCouleur[4];
                      }
                    }
                  });
          });

  	})
    //ajout de la légende :
    
  }

  function updateRegionAverage() {
	  for (var i = 1; i < 22; i++) {
	    if (map[i].number > 0) {
		      map[i].average = map[i].bmi / map[i].number
	    } else {
		      map[i].average = 0;
	    }
    }
  }

  function pourcentageObesite() {

    for (var i = 1; i < 22; i++) {
      mapObese[i].percentage = mapObese[i].numberObese / map[i].number;

    }
  }


  function getRegionNumber(regionName){
    for (var i = 1; i < 22; i++) {
      if (map[i].name == regionName) {
	       return i;
      }
    }
  }


  var width = 750, height = 750;

  var path = d3.geoPath();

  var projection = d3.geoConicConformal()
	.center([2.454071, 46.279229])
	.scale(2600)
	.translate([width / 2, height / 2]);

  path.projection(projection);

  var svg = d3.select('#map').append("svg")
	.attr("id", "svg")
	.attr("width", width)
	.attr("height", height);

  var regions = svg.append("g");


  //<8        #5B0000
  // 8 < 10   #AF0000
  // 10 < 13  #D80000
  // 13 < 15     #FE345D
  // >15
  Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
  };

  // d3.json('data/regions.geojson', function(req, geojson) {
	//    regions.selectAll("path")
  //           .data(geojson.features)
  //           .enter()
  //           .append("path")
  //           .attr('class', 'region')
  //           .attr("d", path)
  //           .style("fill", function(d) {
  //             if(getRegionNumber(d.properties.nom) != 0){
  //               console.log(mapObese[getRegionNumber(d.properties.nom)]);
  //               if (((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) < 8){
  //                 return '#5B0000';
  //               }
  //               if (((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) >= 8 &&
  //                   ((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) < 10){
  //                 return '#AF0000';
  //               }
  //               if (((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) >= 10 &&
  //                   ((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) < 13){
  //                 return '#D80000';
  //               }
  //               if (((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) >= 13 &&
  //                   ((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) < 15){
  //                 return '#FE345D';
  //               }
  //               if (((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2) > 15){
  //                 return '#ff6bb0';
  //               }
  //             }
  //           })
  //
  //           .on("mouseover", function(d) {
  //                div.transition()
  //                       .duration(200)
  //                       .style("opacity", .9);
  //                div.html("Région : " + d.properties.nom + "<br>"+
  //           			        "Pourcentage obésité: " + ((mapObese[getRegionNumber(d.properties.nom)].percentage)*100).toFixedDown(2))
  //                       .style("left", (d3.event.pageX + 30) + "px")
  //                       .style("top", (d3.event.pageY - 30) + "px")
  //
  //           })
  //           .on("mouseout", function(d) {
  //           		div.transition()
  //                       .duration(0)
  //                       .style("opacity", 0);
  //           		div.html("")
  //                       .style("left", "0px")
  //                       .style("top", "0px");
  //           });
  //
  //   });

    var div = d3.select("body").append("div")
	   .attr("class", "tooltip")
	    .style("opacity", 0);

})
