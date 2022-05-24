$(document).ready(function (){
    $("#boutonConf").click(afficherGraph);
});

function afficherGraph()
{
    let fichiercsv = $('#btnFileUpload').val();
    alert(fichiercsv);
    $.get(fichiercsv, function (csv) {
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
