$(document).ready(function () {

});

$.get('data.csv', function (csv) {
    $('#container').highcharts({
        data: {
            csv: csv
        },
        title: {
            text: "Hauteur de l'axe z"
        },

        subtitle: {
            text: 'Data input from CSV'
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
                lineWidth: 1
            }, {
                type: 'areaspline',
                color: '#c4392d',
                negativeColor: '#5679c4',
                fillOpacity: 0.5
            }]
    });
});

