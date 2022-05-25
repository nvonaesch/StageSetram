$(document).ready(function () {
    $("#boutonConf").click(traitement);
    $("#logo").click(redirection)
});

function traitement()
{

    if (!$('#btnFileUpload')[0].files.length)
    {
        alert("Choisissez un seul fichier csv.");
    }

    $('#btnFileUpload').parse({
        config: {
            delimiter: "", // auto-detect
            newline: "", // auto-detect
            quoteChar: '"',
            delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
        },
        before: function (file, inputElem)
        {
            console.log("Analyse du fichier...", file);
        },
        error: function (err, file)
        {
            console.log("ERROR:", err, file);
        },
        complete: function ()
        {
            var fichiercsv = this.fileData;
            alert("Analyse complétée");
        }
    });
    
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
function redirection() {
    window.location.replace("http://setram.fr");
}