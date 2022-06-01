var maCarte = null;
var marqueur;
var marqueurDyna;
var cercle;
var polygone;
var groupe = new L.featureGroup();

function initCarte() {
    maCarte = L.map('carte').setView([lat, lon], 11);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 9,
        maxZoom: 9
    }).addTo(maCarte);
    console.log("initCarte");

}
// ajouter un marqueur en lat,lon
function ajouterMarqueur()
{
    marqueur = L.marker([lat, lon]).addTo(maCarte);
    // il est possible d'afficher le texte du marqueur avec la ligne suivante
    //marqueur.bindPopup("<b>salut en gras</b><br/><i>en italic</i><br/>normal :)").openPopup();
    // par defaut le texte s'affichera si l'on clique sur le marqueur
    // et se cachera si l'on clique de nouveau dessus
    marqueur.bindPopup("<b>salut en gras</b><br/><i>en italic</i><br/>normal :)");
    groupe.addLayer(marqueur);
    //fitBounds ajustera la vue de la carte afin de permettre de voir l'ensemble de marqueurs
    maCarte.fitBounds(groupe.getBounds());
}
// ajouter un cercle rouge de rayon 500, avec un fond rouge clair et ine transparence à 50% en lat,lon
function ajouterCercle()
{
    cercle = L.circle([lat, lon], {
        color: 'red',
        fillcolor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(maCarte);
    groupe.addLayer(cercle);
    maCarte.fitBounds(groupe.getBounds());
    cercle.bindPopup("infos du cercle");
}

// pour avoir les coordonnées en latitude,longitude d'une adresse, 
// nous utiliserons le site https://adresse.data.gouv.fr/api
// la fonction recherche les coordonnées en latitude,longitude
// à partir d'une adresse et place un marqueur avec comme 
// legende l'adresse
function geolocalisation()
{
    var adresse = "place des jacobins, 72000, le mans";
    console.log(encodeURI(adresse));
    $.getJSON("https://api-adresse.data.gouv.fr/search/?q=" + adresse + "&limit=1")
            .done(function (resultat, status, xhr) {
                console.log(resultat.features[0].properties.city);
                var lonlat = resultat.features[0].geometry.coordinates;
                console.log(lonlat);
                marqueurDyna = L.marker([lonlat[1], lonlat[0]]).addTo(maCarte);
                marqueurDyna.bindPopup(resultat.features[0].properties.label);
                groupe.addLayer(marqueurDyna);
                maCarte.fitBounds(groupe.getBounds());

            })
            .fail(function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            });



}



$(document).ready(function () {
    // au click sur l'élément ayant pour id "showMark", faire appel à la fonction ajouterMarqueur
    $("#showMark").click(ajouterMarqueur);
    // au click sur l'élément ayant pour id "showCircle", faire appel à la fonction ajouterCercle
    $("#showCircle").click(ajouterCercle);
    // au click sur l'élément ayant pour id "geoCode", faire appel à la fonction geolocalisation
    $("#geoCode").click(geolocalisation);
});




