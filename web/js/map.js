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

    updateData(map)

    function updateData(dataMap) {
	d3.csv("src/Table_indiv.csv", function(data) {
	    data.forEach(function(d) {
		d.bmi = +d.bmi;
		if(!isNaN(d.bmi) && d.bmi.toString().indexOf('.') != -1){
		    dataMap[d.region].bmi += d.bmi
		    dataMap[d.region].number += 1
		    var personneTemp = new Personne(d["v2_age"], d.bmi);
                    dataMap[d.region].personnes.push(personneTemp);
		}
	    })
	    updateRegionAverage();
	})
    }
    
    function updateRegionAverage() {
	for (var i = 1; i < 22; i++) {
	    if (map[i].number > 0) {
		map[i].average = map[i].bmi / map[i].number
	    } else {
		map[i].average = 0
	    }
	}
    }
	       

    function getRegionNumber(regionName){
	for (var i = 1; i < 22; i++) {
	    if (map[i].name == regionName) {
		 return i
	    } 
	}
	return 0
    }

    var width = 550, height = 550;

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
                    .style("opacity", .9);      
		div.html("Région : " + d.properties.nom + "<br>"+
			 "Moyenne du bmi : " + map[getRegionNumber(d.properties.nom)].average) 
                    .style("left", (d3.event.pageX + 30) + "px")     
                    .style("top", (d3.event.pageY - 30) + "px")
            })
            .on("mouseout", function(d) {
		div.transition()
                    .duration(0)
                    .style("opacity", 0);
		div.html("")
                    .style("left", "0px")
                    .style("top", "0px");
            });
    });
    
    var div = d3.select("body").append("div")   
	.attr("class", "tooltip")               
	.style("opacity", 0);

})

