$(document).ready(function () {
    $("#logo").click(redirection);
    $("#csv").change(selectionFichierAnalyse);
    $("#csv").change('load', initCarte);
    $("#btnMarqueur").click(ajouterMarqueurChoc);
    $("#navigation").hide();
});

var vibrationx = [];
var longitude = [];
var latitude = [];
var latmans = 48.00611;
var lonmans = 0.199556;
var groupe = new L.featureGroup();
var maCarte = null;
var max;
var cptMarq = 0;
var MarqueurRouge = new L.Icon({
  iconUrl: '//raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: '//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//Sert à rediriger l'utilisateur vers le site de la SETRAM lorsqu'il clique sur le logo
function redirection() {
    window.location.replace("//setram.fr");
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
                vibrationx.push(results.data[i].VibrationX);
                longitude.push(results.data[i].Longitude);
                latitude.push(results.data[i].Latitude);
            }
            ;
            max = Math.max.apply(null, vibrationx);
            console.log(max);
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
                }
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
                    color: '#000000',
                    lineWidth: 0.8,
                    data: vibrationx,
                    name: 'Vibration'}
            ]
        });
    });
}

//Sert à ajouter les marqueurs si un choc est détecté
function ajouterMarqueurChoc() {
    for (var i = 0; i < longitude.length; i++) {
        if ( vibrationx[i] > 12000 || vibrationx[i] < 100 && latitude[i] !== null) { //vibrationx[i] > 7900 || vibrationx[i] < 100
            if(vibrationx[i] === max){
                marqueurmax = L.marker([latitude[i],longitude[i]], {icon: MarqueurRouge}).addTo(maCarte);
                marqueurmax.bindPopup("Accélération Linéaire au moment du choc : " + vibrationx[i] + " <br/> Longitude : " + longitude[i] + "<br/> Latitude :" + latitude[i]);
                groupe.addLayer(marqueurmax);
                maCarte.fitBounds(groupe.getBounds());
            }else{
                marqueur = L.marker([latitude[i], longitude[i]]).addTo(maCarte);
                marqueur.bindPopup("Accélération Linéaire au moment du choc : " + vibrationx[i] + " <br/> Longitude : " + longitude[i] + "<br/> Latitude :" + latitude[i]);
                groupe.addLayer(marqueur);
                maCarte.fitBounds(groupe.getBounds());
            }
            cptMarq++;
        }
    }
    console.log(cptMarq);
}