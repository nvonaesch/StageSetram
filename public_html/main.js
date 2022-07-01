$(document).ready(function () {
    $("#logo").click(redirection);
    $("#csv").change(selectionFichierAnalyse);
    $("#csv").change('load', initCarte);
    $("#btnToutMarqueur").click(trouverPics);
    $("#btnToutMarqueur").click(ajouterMarqueurChoc);
    $("#boutonRecap").click(telechargerRecap);
    $("#navigation").hide();
    $("#btnModal").hide();
    $("#btnCentrer").hide();
    $("#btnModal").click(afficherInfoCompl);
    $("#btnCentrer").click(centrerVue);
});
var precedent, suivant, vibration = [], longitude = [], longitudetraitee = [], latitudetraitee = [], latitude = [], diff = [], latmans = 48.00611, lonmans = 0.199556,groupe = new L.featureGroup(),maCarte = null;
var max;
var min;
var cptMarq = 0;
var MarqueurRouge = new L.Icon({
    iconUrl: '//raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: '//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [28, 46],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    zIndex: 2000
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
function afficherInfoCompl() {
    $("#moyenne").text("Valeur moyenne des mesures: " + moyenne);
    $("#chochaut").text("Valeur maximum des mesures: " + max);
    $("#nbrchoc").text("Nombre de chocs détectés: " + cptMarq);
}
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
            for (var i = 1; i < results.data.length; i++) {
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
    L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 10,
        maxZoom: 20
    }).addTo(maCarte);
    console.log("Carte initialisée");
    setInterval(function() {   maCarte.invalidateSize(); }, 100);
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
    moyenne = parseInt(vibration.reduce((a, b) => a + b, 0) / vibration.length);
    vibration = vibration.filter((curr, idx, arr) => {
        if (idx > 0) {
            precedent = arr[idx - 1];
        }
        if (idx < (arr.length - 1)) {
            suivant = arr[idx + 1];
        }
        if (precedent) {
            if (precedent > curr) {
                return false;
            }
        }
        if (suivant) {
            if (suivant > curr) {
                return false;
            }
        }
        if (idx > 0) {
            precedent = arr[idx - 2];
        }
        if (idx < (arr.length - 2)) {
            suivant = arr[idx + 2];
        }
        if (precedent) {
            if (precedent > curr) {
                return false;
            }
        }
        if (suivant) {
            if (suivant > curr) {
                return false;
            }
        }
        if (idx > 0) {
            precedent = arr[idx - 3];
        }
        if (idx < (arr.length - 3)) {
            suivant = arr[idx + 3];
        }
        if (precedent) {
            if (precedent > curr) {
                return false;
            }
        }
        if (suivant) {
            if (suivant > curr) {
                return false;
            }
        }
        if (idx > 0) {
            precedent = arr[idx - 4];
        }
        if (idx < (arr.length - 4)) {
            suivant = arr[idx + 4];
        }
        if (precedent) {
            if (precedent > curr) {
                return false;
            }
        }
        if (suivant) {
            if (suivant > curr) {
                return false;
            }
        }
        if (idx > 0) {
            precedent = arr[idx - 5];
        }
        if (idx < (arr.length - 5)) {
            suivant = arr[idx + 5];
        }
        if (precedent) {
            if (precedent > curr) {
                return false;
            }
        }
        if (suivant) {
            if (suivant > curr) {
                return false;
            }
        }
        
        return true && longitudetraitee.push(longitude[idx]) && latitudetraitee.push(latitude[idx]);
    });
}
//Sert à ajouter les marqueurs si un choc est  détecté
function ajouterMarqueurChoc() {
    console.log(vibration);
    for (var i = 0; i < vibration.length; i++) {
        if (vibration[i] === max) {
            marqueurmax = L.marker([latitudetraitee[i], longitudetraitee[i]], {icon: MarqueurRouge}).addTo(maCarte).bindPopup("Accélération Linéaire au moment du choc : " + vibration[i] + " <br/> Longitude : " + longitude[i] + "<br/> Latitude :" + latitude[i]);
            groupe.addLayer(marqueurmax);
            cptMarq++;
        }
        if (vibration[i] > max * 0.90 && vibration[i] < max * 0.95) {
            marqueur = L.marker([latitudetraitee[i], longitudetraitee[i]]).bindPopup("Accélération Linéaire au moment du choc : " + vibration[i] + " <br/> Longitude : " + longitude[i] + "<br/> Latitude :" + latitude[i]).addTo(maCarte);
            groupe.addLayer(marqueur);
            cptMarq++;
            maCarte.fitBounds(groupe.getBounds());
        }
        if (vibration[i] >= max * 0.95 && vibration[i] <= max * 0.99) {
            marqueurmoy = L.marker([latitudetraitee[i], longitudetraitee[i]], {icon: MarqueurOrange}).addTo(maCarte).bindPopup("Accélération Linéaire au moment du choc : " + vibration[i] + " <br/> Longitude : " + longitude[i] + "<br/> Latitude :" + latitude[i]);
            groupe.addLayer(marqueurmoy);
            cptMarq++;
        }
    }
    maCarte.fitBounds(groupe.getBounds());
    console.log(cptMarq + " Marqueurs de chocs ajoutés");
    $("#btnModal").show();
    $("#btnCentrer").show();
    $("#btnToutMarqueur").hide();
}

function centrerVue() {
    maCarte.fitBounds(groupe.getBounds());
}

function telechargerRecap() {
    var blob = new Blob(["Valeur Moyenne: " + moyenne," Valeur Maximum: " + max," Valeur Minimum: " + min," Nombre de choc(s) enregistrés: " + cptMarq], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "Recapitulatif.txt");
}