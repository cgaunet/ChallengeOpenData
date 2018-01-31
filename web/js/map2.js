var map = creerMap()


function ajoutData(data, categorie) {
    map["nombreTotalIndividus"] += 1

    map[data.region]["nombreIndividus"].total += 1
    map[data.region]["nombreIndividus"][categorie] += 1

    map[data.region]["age"].total += data["v2_age"]
    map[data.region]["age"][categorie] += data["v2_age"]

    map[data.region]["bmi"].total += data.bmi
    map[data.region]["bmi"][categorie] += data.bmi

    map[data.region]["entrerep"].total[data["entrerep"]].compteur += 1
    map[data.region]["entrerep"][categorie][data["entrerep"]].compteur += 1

    map[data.region]["mfruit"].total[data["mfruit"]].compteur += 1
    map[data.region]["mfruit"][categorie][data["mfruit"]].compteur += 1

    map[data.region]["bonalim"].total[data["bonalim"]].compteur += 1
    map[data.region]["bonalim"][categorie][data["bonalim"]].compteur += 1

    map[data.region]["tele"].total += data["tele"]
    map[data.region]["tele"][categorie] += data["tele"]

    map[data.region]["mvian"].total[data["mvian"]].compteur += 1
    map[data.region]["mvian"][categorie][data["mvian"]].compteur += 1

    map[data.region]["mpois"].total[data["mpois"]].compteur += 1
    map[data.region]["mpois"][categorie][data["mpois"]].compteur += 1

    map[data.region]["fastfood"].total[data["fastfood"]].compteur += 1
    map[data.region]["fastfood"][categorie][data["fastfood"]].compteur += 1

    map[data.region]["aptotal_hebdo"].total += data["aptotal_hebdo"]
    map[data.region]["aptotal_hebdo"][categorie] += data["aptotal_hebdo"]
}

function remplirTab() {
    d3.csv("src/Table_indiv.csv", function(data) {
        data.forEach(function(d) {

            d.bmi = +d.bmi
            d["v2_age"] = +d["v2_age"]
            d["entrerep"] = +d["entrerep"]
            d["mfruit"] = +d["mfruit"]
            d["bonalim"] = +d["bonalim"]
            d["tele"] = +d["tele"]
            d["mvian"] = +d["mvian"]
            d["mpois"] = +d["mpois"]
            d["fastfood"] = +d["fastfood"]
            d["aptotal_hebdo"] = +d["aptotal_hebdo"]

            if(!isNaN(d.bmi) && d.bmi.toString().indexOf('.') != -1){
                if (d.bmi < 18) {
                    ajoutData(d, "sousPoids")
                } else if (d.bmi < 25) {
                    ajoutData(d, "poidsNormal")
                } else if (d.bmi < 30) {
                    ajoutData(d, "surPoids")
                } else {
                    ajoutData(d, "obesite")
                }
            }
        })

        d3.json('data/regions.geojson', function(req, geojson) {
            regions.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr('class', 'region')
            .attr('regName', function(d) {
                return d.properties.nom;
            })
            .attr("d", path)


            .on("mouseover", function(d) {
                div.transition()
                .duration(200)
                .style("opacity", 0.75);

                div.html(htmlMouseOver(numeroRegion(d.properties.nom),d.properties.nom))
                .style("left", (d3.event.pageX + 30) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .style("color", "white")
            })
            .on("mouseout", function(d) {
                div.transition()
                .duration(0)
                .style("opacity", 0);
                div.html("")
                .style("left", "0px")
                .style("top", "0px");
            })

            .on("click", function(d) {
                div.transition()
                .duration(200)
                .style("opacity", 0.75);
                console.log("je passe dans le click")
                div.html(htmlMouseOver(numeroRegion(d.properties.nom),d.properties.nom)+htmlClick(numeroRegion(d.properties.nom),d.properties.nom))
                .style("left", (d3.event.pageX + 30) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .style("color", "white")
            })
            .style("fill", function(d) { return couleur(numeroRegion(d.properties.nom),d.properties.nom) })



        })


        var legend = d3.select('#svg').append("g")
        .attr("transform", "translate(" + Math.round((width / 2) + width * 0.3) + ", " + Math.round(height / 2) + ")")
        .attr("id", "legend");


        var unit = "g/jour";
        var legend_title = "Légende :";
        var mapName = "sport";

        switch (mapName) {
            case "sport":
            unit = "minutes/semaine";
            break;
            case "fastfood":
            unit = "%";
            break;
            case "alcohol":
            unit = "%";
            break;
            case "obesity":
            unit = "%";
            break;
            case "butter":
            legend_title = "Consomme plus de :";
            break;
            default:
            unit = "g/jour";
        }

        // Add colorbar
        legend.selectAll(".colorbar")
        .data(d3.range(tabCouleur.length))
        .enter().append("svg:rect")
        .attr("y", function (d) { return d * 20 + "px"; })
        .attr("height", "20px")
        .attr("width", "20px")
        .attr("x", "0px")
        .attr("class", "carreLegende")
        .attr("id", function(d) {return d})
        .style("fill", function (d) { return couleurLegende(d) });

        // Add legend to each color
        legend.selectAll(".colorbar")
        .data(d3.range(tabCouleur.length))
        .enter()
        .append("text")
        .attr("x", "30px")
        .attr("y", function (d) { return (d * 20 + 15) + "px"; })
        .attr("class", "texteLegende")
        .attr("id", function(d) {return d})
        .text(function (d) { var str = ""; str += d; return texteLegende(str) })

        // Add legend title
        legend.selectAll(".colorbar")
        .data(d3.range(1))
        .enter()
        .append("text")
        .attr("x", "0px")
        .attr("y", "-45px")
        .text(function(d) { return "Legende : " })
        .style("font-weight", "bold")


        legend.selectAll(".colorbar")
        .data(d3.range(1))
        .enter()
        .append("text")
        .attr("x", "0px")
        .attr("y", "-30px")
        .attr("height", "30px")
        .attr("id", "sousTitre1")
        .text(function(d) { return sousTitreLegende1()});

        legend.selectAll(".colorbar")
        .data(d3.range(1))
        .enter()
        .append("text")
        .attr("x", "0px")
        .attr("y", "-15px")
        .attr("height", "15px")
        .attr("id", "sousTitre2")
        .text(function(d) { return sousTitreLegende2()});

    })
}

    function numeroRegion(nomRegion){
        for (var i = 1; i < 22; i++) {
            if (map[i].region == nomRegion) {
                return i
            }
        }
        return 0
    }

    function pourcentageParRapportMoyenne(moy, numeroRegion, val){
        if(val - moy > 0){
            return "+"+(((val - moy) / val) * 100).toFixedDown(2);
        }else {
            return "-"+(((val - moy) / val) * 100).toFixedDown(2);
        }
    }

    function calculerMoyenne(func){
        var moy = 0;
        for (var i = 1; i < 22; i++) {
            moy += func(i);
        }
        moy = moy/21;
        return moy;
    }

    function pourcentageObesite(numeroRegion) {
        return ((map[numeroRegion]["nombreIndividus"].obesite / map[numeroRegion]["nombreIndividus"].total)*100).toFixedDown(2)
    }

    function pourcentagePoisson(numeroRegion) {
        return (((map[numeroRegion]["mpois"].total[1].compteur+map[numeroRegion]["mpois"].total[2].compteur)/ map[numeroRegion]["nombreIndividus"].total)*100).toFixedDown(2)
    }

    function pourcentageViande(numeroRegion) {
        return (((map[numeroRegion]["mvian"].total[1].compteur+map[numeroRegion]["mvian"].total[2].compteur)/ map[numeroRegion]["nombreIndividus"].total)*100).toFixedDown(2)
    }

    function pourcentageFruit(numeroRegion) {
        return (((map[numeroRegion]["mfruit"].total[1].compteur+map[numeroRegion]["mfruit"].total[2].compteur)/ map[numeroRegion]["nombreIndividus"].total)*100).toFixedDown(2)
    }

    function pourcentageFastFood(numeroRegion) {
        return (((map[numeroRegion]["fastfood"].total[1].compteur
        +map[numeroRegion]["fastfood"].total[2].compteur
        +map[numeroRegion]["fastfood"].total[3].compteur
        +map[numeroRegion]["fastfood"].total[4].compteur
        +map[numeroRegion]["fastfood"].total[5].compteur
    )/ map[numeroRegion]["nombreIndividus"].total)*100).toFixedDown(2)
}

function pourcentageTele(numeroRegion) {
    return (((map[numeroRegion]["tele"].total)/ map[numeroRegion]["nombreIndividus"].total)).toFixedDown(2)
}

function pourcentageActivite(numeroRegion) {
    return (((map[numeroRegion]["aptotal_hebdo"].total)/ map[numeroRegion]["nombreIndividus"].total)).toFixedDown(2)
}


Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
    m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};



var legendRectSize = 18;
var legendSpacing = 4;


var width = 1000, height = 1000;

var path = d3.geoPath();

var projection = d3.geoConicConformal()
.center([2.454071, 46.279229])
.scale(4500)
.translate([width / 2, height / 2]);

path.projection(projection);

var svg = d3.select('#map').append("svg")
.attr("id", "svg")
.attr("width", width)
.attr("height", height);

var regions = svg.append("g");

var div = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0);


$(document).ready(function(){

    remplirTab();


})
