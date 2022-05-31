$(document).ready(function () {
    $("#logo").click(redirection);
    $("#csv").change(handleFileSelect);
});

var vibration = [];


function redirection() {
    window.location.replace("http://setram.fr");
}

function handleFileSelect(evt) {
    $("#texteselection").hide();
    $("#csv").hide();
    var file = evt.target.files[0];

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            for(var i = 0; i < results.data.length ; i++){
                vibration.push(results.data[i].Vibration+2004); //2004 étant la valeur par défaut de l'accélération
                //console.log(vibration[i]);
            };
            console.log('Vibration:' + vibration.toString());
            
            afficherGraph();
        }
    });
}

function afficherGraph(){
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
                    name: 'Vibration',
                    data: vibration,
                    color: '#a81c84',
                    lineWidth: 0.8
                }]
            });
        });

}
