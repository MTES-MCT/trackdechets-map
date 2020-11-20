mapboxgl.accessToken =
  "pk.eyJ1IjoiYmVub2l0Z3VpZ2FsIiwiYSI6ImNqdThob2Y5MDA5Zmg0NG4wMHg4Ynl0MHgifQ.CpODeh1akjBOEIXye5JXcQ";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10", // stylesheet location
  center: [2.3752, 48.845], // starting position [lng, lat]
  zoom: 5 // starting zoom
});
var colors = {
  Producteur: "#3498db",
  "Collecteur-regroupeur": "#e67e22",
  "Installation de traitement": "#e74c3c",
  Transporteur: "#34495e",
  Négociant: "#9b59b6",
  "Éco-organisme": "#27ae60"
};
$.getJSON("geocoding/data/companies.geocoded.json", function (data) {
  data.forEach(function (record) {
    if (record.latitude && record.longitude) {
      var label =
        "<p>" +
        record.name +
        " (" +
        record.siret +
        ")" +
        "</p><p>" +
        record.category +
        "</p>";
      var popup = new mapboxgl.Popup().setHTML(label);
      new mapboxgl.Marker({ color: colors[record.category] ?? "#3FB1CE" })
        .setLngLat({ lng: record.longitude, lat: record.latitude })
        .setPopup(popup)
        .addTo(map);
    }
  });
});
