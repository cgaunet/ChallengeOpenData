$(document).ready(function(){

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
		div.html("Région : " + d.properties.nom)  
                    .style("left", (d3.event.pageX + 30) + "px")     
                    .style("top", (d3.event.pageY - 30) + "px")
            })
            .on("mouseout", function(d) {
		div.transition()
                    .duration(000)
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

