// Create the two map tile layers (For stree and topo view)
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
// Putting the two map title into list to create toggle switch
var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
};

// create map
finalMap = L.map("map", {
    center: [0,0], // the central position when first loaded into the map
    zoom : 3,
    layer: [street]
});
// add layer with only baseMaps
var controlLayers = L.control.layers(baseMaps).addTo(finalMap);

// identify USGS url
const USGSurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// assess the earthquake json data through USGS
d3.json(USGSurl).then(function(data) {
    var circlePointLayer = L.geoJson(data, {
        // adding circle point into map
        // Because we are putting circle/marker on the map -> need to use pointToLayer: function(feature, location){return{}}
        // If lines and polygons, need to use style: function(feature){return{}}
        pointToLayer: function(feature,location) { 
          return L.circle(location, {
            stroke: false, // drop the circle stroke
            fillColor: colorpalette(feature.geometry.coordinates[2]), // depth of earthquakes determine by colors
            fillOpacity: 0.5, 
            radius: markerSize(feature.properties.mag) // magnitudes determine by size 
          });
        },

        // adding popup msg
        onEachFeature: function(feature, layer) {
            // zoom into the target circle when clicking
            layer.on({
                click: function (event){
                    finalMap.fitBounds(event.target.getBounds());
                }
            });
            //  Popup msg (includes time and location occurred)
            // new Date(timestamp) -> change timestamp to date; can also use getDate(dateFormat) and getHour() , getMinutes(), toDateString() 
            layer.bindPopup("<b>Date occurred:</b> " + new Date(feature.properties.time).toDateString() + 
                            "</br><b>Location occurred:</b> " + feature.properties.place);
        }
    }).addTo(finalMap);
    // add circlePointLayer into control layer
    controlLayers.addOverlay(circlePointLayer, "Earthquakes");
});


// assess the plates json data and store into variables
d3.json("./static/tectonic_plate.geojson").then(function (plateData){
    var plateLayer = L.geoJson(plateData, {
        style: function(feature){
            switch (feature.properties.LAYER) { // getting the plate itmes
                case "plate" : return {
                    fill: false,
                    weight: 2,
                    color : "#279a48",
                    smoothFactor : 3
                };
            }
        }
    }).addTo(finalMap);
    // add plateLayer into control layer
    controlLayers.addOverlay(plateLayer, "Tectonic Plate");
}); 

// putting legend in
legend();



// circle size function to enlarge the size inscale (mag^2) * 30000
function markerSize(num) {
    return Math.pow(num, 2) * 10000;
  }

// create a colorpalette
function colorpalette(num){
    // setting up color palette
    let colour = [];
    let colors = ["#0993da","#3a8bdb","#5783d8","#7079d3","#866eca","#9962be","#a955af","#b5479d","#bf3989","#c42b74","#c61e5d"];
    // setting up which colour in which range
    if (num >= 100) {colour = colors[0]}
    else if (num >= 90){colour = colors[1]}
    else if (num >= 80){colour = colors[2]}
    else if (num >= 70){colour = colors[3]}
    else if (num >= 60){colour = colors[4]}
    else if (num >= 50){colour = colors[5]}
    else if (num >= 40){colour = colors[6]}
    else if (num >= 30){colour = colors[7]}
    else if (num >= 20){colour = colors[8]}
    else if (num >= 10){colour = colors[9]}
    else{colour = colors[10]};
    return colour
};


  
function legend() {
    // creating legend
    var legend = L.control({ position: "bottomleft" });
    legend.onAdd = function(map) {
        let div = L.DomUtil.create("div", "legend");
        let limits = ["more than 100", "90 - 100", "80 - 90", "70 - 80", "60 - 70", "50 - 60", 
        "40 - 50", "30 - 40", "20 - 30", "10 - 20", "less than 10"];
        let colors = ["#0993da","#3a8bdb","#5783d8","#7079d3","#866eca","#9962be","#a955af","#b5479d","#bf3989","#c42b74","#c61e5d"];

        // Add the minimum and maximum.
        let legendInfo = "<h4>Depth of Earthquake</h4>";

        div.innerHTML += legendInfo;
        for (i = 0; i < limits.length; i++){
            div.innerHTML += "<i style=\"background-color: " + colors[i] + "\"></i><span>" + limits[i] + "</span></br>"
        };

        // div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // adding legend layer on to the map
    legend.addTo(finalMap);   
    
};




