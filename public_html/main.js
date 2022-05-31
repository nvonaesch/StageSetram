$(document).ready(function () {
    $("#logo").click(redirection);
    $("#csv").change(selectionFichierAnalyse);
    $("#initCarte").click('load', initCarte);
});

var vibration = [];

var longitude = [];
var latitude = [];
var latmans = 48.00611;
var lonmans = 0.199556;
var groupe = new L.featureGroup();

function initCarte() {
    maCarte = L.map('carte').setView([latmans, lonmans], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 19
    }).addTo(maCarte);
    console.log("Carte initialisée");
}


function redirection() {
    window.location.replace("https://setram.fr");
}

function selectionFichierAnalyse(evt) {
    $("#texteselection").hide();
    $("#csv").hide();
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
                //console.log(vibration[i]);
            };
            //console.log('Vibration:' + vibration.toString());
            afficherGraph();
        }
    });
}

function afficherGraph() {
    //console.log(vibration);
    $(function () {
        $('#container').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'Vibration sur le Pantographe'
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
