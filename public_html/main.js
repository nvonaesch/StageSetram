$(document).ready(function () {
    $.afficherDonnees(couleurs);
});

var couleurs = [
    "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"
];

$.afficherDonnees = function (couleurs) {
    var chart = new Highcharts.chart('container', {
        chart: {
            renderTo: 'pieChart',
            width: 598,
            height: 450,
            marginLeft: 25,
            marginRight: 25
        },
        data: {
            // enablePolling: true,
            csvURL: window.location.origin + 'testcsv.csv'
        },
         colors: couleurs,
      title: {
         text: "Axe z de l'accéléromètre",
         margin: 10
      },
      tooltip: {
         formatter: function() {
            return "Intensité du choc : " + this.y ;
            }
      },
      plotOptions: {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
               enabled: true,
               formatter: function() {
                  return "" + this.point.name.toLowerCase() + "";
               }
            }
         },
         series: {
            dataLabels: {
                enabled: true,
                color: 'black',
                fontSize: 3
            }
        }
      },
       series: [{
         type: 'pie',
         data: data 
      }]
   
    });
};