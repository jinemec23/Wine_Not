// Creating map object
var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 8
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);



// Load in GeoJson data
var geoData = "https://opendata.arcgis.com/datasets/484f797a1abb4b6296bedf823895e609_15.geojson";

var geojson;

// Grab data with d3
d3.json(geoData).then(loadedData => {
  console.log(loadedData)

  // Create a new choropleth layer
  // Define what  property in the features to use
  // Set color scale
  // Number of breaks in step range
  // q for quartile, e for equidistant, k for k-means
  // Binding a pop-up to each layer
  
  geojson = L.choropleth(loadedData, {
    valueProperty: 'Region', // which property in the features to use
    scale: ['white', 'purple'],
    steps: 10,
    mode: 'q',
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`Winery: ${feature.properties.Name}<br>Region:<br>$${feature.properties.Region}`)
    }
  }).addTo(myMap)


  // Set up the legend
  var legend = L.control({ position: "bottomright"});

  // legend.onAdd = function() {
  //   var div = L.DomUtil.create("div", "info legend");
  //   var limits = geojson.options.limits;
  //   var colors = geojson.options.colors;
  //   var labels = [];
  // }

})

console.log(myMap); // should output the object that represents instance of Leaflet
if (myMap !== undefined && myMap !== null) {
  myMap.remove(); // should remove the map from UI and clean the inner children of DOM element
  console.log(myMap); // nothing should actually happen to the value of mymap
}