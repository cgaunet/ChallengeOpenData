var map = creerMap()

var tabCouleur = ["#adccff","#77aaff","#478cff","#0562ff", "#001e82"];

function numeroRegion(nomRegion){
    for (var i = 1; i < 22; i++) {
        if (map[i].region == nomRegion) {
            return i
        }
    }
    return 0
}

function pourcentageParRapportMoyenne(moy, numeroRegion){
    val = pourcentageObesite(numeroRegion)
    if(val - moy > 0){
        return "+"+(((val - moy) / val) * 100).toFixedDown(2);
    }else {
        return "-"+(((val - moy) / val) * 100).toFixedDown(2);
    }
}

function calculerMoyenneObeses(){
    var moy = 0;
    for (var i = 1; i < 22; i++) {
        moy += pourcentageObesite(i);
    }
    moy = moy/21;
    return moy;
}

function pourcentageObesite(numeroRegion) {
    return ((map[numeroRegion]["nombreIndividus"].obesite / map[numeroRegion]["nombreIndividus"].total)*100).toFixedDown(2)
}

Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
    m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

$(document).ready(function(){

    remplirTab();


    function ajoutData(data, categorie) {
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
                .attr("d", path)


                .on("mouseover", function(d) {
                    div.transition()
                    .duration(200)
                    .style("opacity", 0.75);

                    div.html(textMouseOver(numeroRegion(d.properties.nom),d.properties.nom))
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
                .style("fill", function(d) { return couleurRegion(numeroRegion(d.properties.nom),d.properties.nom) })
            });

        })
        //ajout de la légende :

    }


    //fonction retournant le text à afficher lors du passage sur une région
    function textMouseOver(numeroRegion, nomRegion) {
        return htmlPourcentageObesite(numeroRegion, nomRegion)
    }

    //fonction déterminant la couleur des régions
    function couleurRegion(numeroRegion, nomRegion) {
        return couleurObesite(numeroRegion, nomRegion)
    }




    var legendRectSize = 18;
    var legendSpacing = 4;


    var width = 750, height = 750;

    var path = d3.geoPath();

    var projection = d3.geoConicConformal()
    .center([2.454071, 46.279229])
    .scale(3100)
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



})
