
$.get('data.csv', function (csv) {
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
                color: '#ff0000',
                fillOpacity: 0.5
            }]
    });
});

