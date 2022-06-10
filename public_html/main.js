$(document).ready(function () {
    $("#logo").click(redirection);
    $("#csv").change(selectionFichierAnalyse);
    $("#csv").change('load', initCarte);
    $("#btnToutMarqueur").click(trouverPics);
    $("#btnToutMarqueur").click(ajouterMarqueurChoc);
    $("#navigation").hide();
});

var vibration = [],longitude = [],latitude = [];
var latmans = 48.00611;
var lonmans = 0.199556;
var groupe = new L.featureGroup();
var maCarte = null;
var max;
var min;
var cptMarq = 0;
var MarqueurRouge = new L.Icon({
  iconUrl: '//raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: '//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [28, 46],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var MarqueurOrange = new L.Icon({
  iconUrl: '//raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: '//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [28, 46],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var somme = 0;
var moyenne;

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
                vibration.push(results.data[i].VibrationX);
                longitude.push(results.data[i].Longitude);
                latitude.push(results.data[i].Latitude);
            };
            max = Math.max.apply(null, vibration);
            min = Math.min.apply(null, vibration);
            console.log("Valeur du choc maximale: " + max);
            console.log("Valeur du choc minimale: " + min);
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
                    enableMouseTracking: false
                }
            },
            series: [{
                    color: '#000000',
                    lineWidth: 0.8,
                    data: vibration,
                    name: 'Vibration'}
            ]
        });
    });
}

//Nous sert ici à trouver les pics de notre tableau de valeurs
function trouverPics() {
    let precedent;
    let suivant;
    moyenne = parseInt(vibration.reduce((a, b) => a+b, 0) / vibration.length);
    for(var i=0; i<longitude.length; i++){
        if(vibration[i] < moyenne){
            let diff = moyenne-vibration[i];
            vibration[i] = moyenne+diff;
        } else {
            break;
        }
    }
    return vibration.filter((curr, idx, arr) => {
        if (idx > 0) {precedent = arr[idx - 1];}if (idx < (arr.length - 1)){suivant = arr[idx + 1];}if (precedent) {if (precedent > curr) {return false;}}if (suivant) {if (suivant > curr) {return false;}}if (idx > 0) {precedent = arr[idx - 2];}if (idx < (arr.length - 2)) {suivant = arr[idx + 2];}if (precedent) {if (precedent > curr) {return false;}}if (suivant) {if (suivant > curr) {return false;}}if (idx > 0) {precedent = arr[idx - 3];}if (idx < (arr.length - 3)) {suivant = arr[idx + 3];}if (precedent) {if (precedent > curr) {return false;}}if (suivant) {if (suivant > curr) {return false;}}if (idx > 0) {precedent = arr[idx - 4];}if (idx < (arr.length - 4)) {suivant = arr[idx + 4];}if (precedent) {if (precedent > curr) {return false;}}if (suivant) {if (suivant > curr) {return false;}}if (idx > 0) {precedent = arr[idx - 5];}if (idx < (arr.length - 5)) {suivant = arr[idx + 5];}if (precedent) {if (precedent > curr) {return false;}}if (suivant) {if (suivant > curr) {return false;}if (idx > 0) {precedent = arr[idx -6];}if (idx < (arr.length - 6)){suivant = arr[idx + 6];}if (precedent) {if (precedent > curr) {return false;}}if (suivant) {if (suivant > curr) {return false;}}if (idx > 0) {precedent = arr[idx - 7];}if (idx < (arr.length - 7)){suivant = arr[idx + 7];}if (precedent) {if (precedent > curr) {return false;}}if (suivant) {if (suivant > curr) {return false;}}if (idx > 0) {precedent = arr[idx - 8];}if (idx < (arr.length - 8)){suivant = arr[idx + 8];}if (precedent) {if (precedent > curr) {return false;}}if (suivant) {if (suivant > curr) {return false;}}if (idx > 0) {precedent = arr[idx - 9];}if (idx < (arr.length - 9)){suivant = arr[idx + 9];}if (precedent) {if (precedent > curr) {return false;}}if (suivant) {if (suivant > curr) {return false;}}if (idx > 0) {precedent = arr[idx - 10];}if (idx < (arr.length - 10)){suivant = arr[idx + 10];}if (precedent) {if (precedent > curr) {return false;}}if (suivant) {if (suivant > curr) {return false;}}}
    return true;
    });
}   

//Sert à ajouter les marqueurs si un choc est  détecté
function ajouterMarqueurChoc() {
    for (var i = 250; i < longitude.length; i++) {
        if (vibration[i] === max) {
            marqueurmax = L.marker([latitude[i], longitude[i]], {icon: MarqueurRouge}).addTo(maCarte).bindPopup("Accélération Linéaire au moment du choc : " + vibration[i] + " <br/> Longitude : " + longitude[i] + "<br/> Latitude :" + latitude[i]);
            groupe.addLayer(marqueurmax);
            cptMarq++;
            maCarte.fitBounds(groupe.getBounds());
        }
        if (vibration[i] > (moyenne + max) * 0.49 && vibration[i] <= (moyenne + max) * 0.60 && latitude[i] !== null) {
            marqueur = L.marker([latitude[i], longitude[i]]).bindPopup("Accélération Linéaire au moment du choc : " + vibration[i] + " <br/> Longitude : " + longitude[i] + "<br/> Latitude :" + latitude[i]).addTo(maCarte);
            groupe.addLayer(marqueur);
            cptMarq++;
            maCarte.fitBounds(groupe.getBounds());
        }
        if (vibration[i] > (moyenne + max) * 0.60 && vibration[i] < (moyenne + max) * 0.99 && latitude[i] !== null) {
            marqueurmoy = L.marker([latitude[i], longitude[i]], {icon: MarqueurOrange}).addTo(maCarte).bindPopup("Accélération Linéaire au moment du choc : " + vibration[i] + " <br/> Longitude : " + longitude[i] + "<br/> Latitude :" + latitude[i]);
            groupe.addLayer(marqueurmoy);
            cptMarq++;
            maCarte.fitBounds(groupe.getBounds());
        }
    }
    console.log(cptMarq + " Marqueurs de chocs ajoutés");

}
