$(document).ready(function () {
    $("#logo").click(redirection);
    $("#btnFileUpload").change(handleFileSelect);
});

var data;

function redirection() {
    window.location.replace("http://setram.fr");
}

function handleFileSelect(evt) {
    $("#texteselection").hide();
    var file = evt.target.files[0];

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            data = results;
            console.log(data);
            afficherGraph(data);
        }
    });
}

function afficherGraph(data){
    console.log(data);
    $.get(data, function (csv) {
        $('#container').highcharts({
            data: {
                csv: csv
            },
            title: {
                text: "Hauteur de l'axe z"
            },
            subtitle: {
                text: "Valeur de la vibration"
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                    lineWidth: 1,
                    type: 'line',
                    color: '#ff7f00',
                    fillOpacity: 0.5
                }]
        });
    });
}