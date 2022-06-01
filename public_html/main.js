$(document).ready(function () {
    $("#logo").click(redirection);
    $("#csv").change(selectionFichierAnalyse);
    $("#csv").change('load', initCarte);
    $("#btnMarqueur").click(ajouterMarqueurChoc);
});

var vibration = [];
var longitude = [];
var latitude = [];
var latmans = 48.00611;
var lonmans = 0.199556;
var groupe = new L.featureGroup();
var maCarte = null;
    
//Sert à initialiser la carte de Leaflet
function initCarte() {
    $("#container").hide();
    maCarte = L.map('carte').setView([latmans, lonmans], 15);
    L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 10,
        maxZoom: 18
    }).addTo(maCarte);
    console.log("Carte initialisée");
}
//Sert à ajouter les marqueurs si un choc est détecté
function ajouterMarqueurChoc() {
    for (var i = 0; i < longitude.length; i++) {
        if (vibration[i] > 0 && latitude[i] !== null) {
            marqueur = L.marker([latitude[i], longitude[i]]).addTo(maCarte);
            marqueur.bindPopup("Accélération Linéaire au moment du choc : " + vibration[i] +" <br/> Longitude : " + longitude[i] + "<br/> Latitude :" + latitude[i]);
            groupe.addLayer(marqueur);
            maCarte.fitBounds(groupe.getBounds());
        }
    }
}
//Sert à rediriger l'utilisateur vers le site de la SETRAM lorsqu'il clique sur le logo
function redirection() {
    window.location.replace("https://setram.fr");
}
//Sert à lire les données du fichier csv issus de la carte SD et les mettre dans des tableaux
function selectionFichierAnalyse(evt) {
    
    var file = evt.target.files[0];

    Papa.parse(file, {
        delimiter: ",",
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            for (var i = 0; i < results.data.length; i++) {
                vibration.push(results.data[i].Vibration + 2004); //2004 étant la valeur par défaut de l'accélération linéique
                longitude.push(results.data[i].Longitude);
                latitude.push(results.data[i].Latitude);
            };
            afficherGraph();
        }
    });
}
//Sert à afficher le graphique en ligne
function afficherGraph() {
    $(function () {
        $('#courbe').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'Vibrations sur le Pantographe'
            },
            yAxis: {
                title: {
                    text: "Valeur de l'accélération linéaire"
                },
                plotBands: [{
                        color: '#f7eabe',
                        width: 1,
                        from: 500,
                        to: -1100
                    }]
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                    name: 'Vibration',
                    data: vibration,
                    color: '#a81c84',
                    lineWidth: 0.8
                }]
        });
    });
}
