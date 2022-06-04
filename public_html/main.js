$(document).ready(function () {
    $("#logo").click(redirection);
    $("#csv").change(selectionFichierAnalyse);
    $("#csv").change('load', initCarte);
    $("#btnMarqueur").click(ajouterMarqueurChoc);
    $("#navigation").hide();
});

var vibrationx = [];
var vibrationy = [];
var vibrationz = [];
var longitude = [];
var latitude = [];
var latmans = 48.00611;
var lonmans = 0.199556;
var groupe = new L.featureGroup();
var maCarte = null;
var max;

//Sert à rediriger l'utilisateur vers le site de la SETRAM lorsqu'il clique sur le logo
function redirection() {
    window.location.replace("https://setram.fr");
}
//Sert à lire les données du fichier csv issus de la carte SD et les mettre dans des tableaux
function selectionFichierAnalyse(evt) {
    $("#navigation").show();
    var file = evt.target.files[0];

    Papa.parse(file, {
        delimiter: ",",
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            for (var i = 0; i < results.data.length; i++) {
                vibrationz.push(results.data[i].VibrationZ );
                vibrationy.push(results.data[i].VibrationY );
                vibrationx.push(results.data[i].VibrationX );
                longitude.push(results.data[i].Longitude);
                latitude.push(results.data[i].Latitude);
            };
            max = Math.max(vibrationz);
            afficherGraph();
        }
    });
}

//Sert à initialiser la carte de Leaflet
function initCarte() {
    $("#navigation").show();
    maCarte = L.map('carte').setView([latmans, lonmans], 15);
    L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 10,
        maxZoom: 18
    }).addTo(maCarte);
    console.log("Carte initialisée");
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
                    marker:{
                    name: 'Vibration Axe Z',
                    color: '#FF0000',
                    lineWidth: 0.8
                },
                data: vibrationz},{
                marker:{
                    name: 'Vibration Axe Y',
                    color: '#00FF00',
                    lineWidth: 0.8
                },
                data: vibrationy},{
                marker:{
                    name: 'Vibration Axe X',
                    color: '#0000FF',
                    lineWidth: 0.8
                },
                data: vibrationx}
                ]
        });
    });
}

//Sert à ajouter les marqueurs si un choc est détecté
function ajouterMarqueurChoc() {
    for (var i = 0; i < longitude.length; i++) {
        if (vibrationx[i] > max*0.95 && latitude[i] !== null) {
            marqueur = L.marker([latitude[i], longitude[i]]).addTo(maCarte);
            marqueur.bindPopup("Accélération Linéaire au moment du choc : " + vibrationx[i] +" <br/> Longitude : " + longitude[i] + "<br/> Latitude :" + latitude[i]);
            groupe.addLayer(marqueur);
            maCarte.fitBounds(groupe.getBounds());
        }
    }
}