# Module 15 Challenge: Interactive Map visualisation using Javascript

#### Please visualise the data in this [website](https://wingylui.github.io/leaflet-challenge/).
---

<b>Programming language:</b> javascript, HTML <br />
<b>Package used:</b> D3.js, leaflet <br />
<b>Main script:</b> [logic.js](https://github.com/wingylui/leaflet-challenge/blob/main/static/js/logic.js), [index.html](https://github.com/wingylui/leaflet-challenge/blob/main/index.html)<br />
<b>Dataset:</b> [Geojson from USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), [tectonic plate boundaries](https://github.com/fraxen/tectonicplates)

---

This challenge is to create an interactive map to visualise earthquakes occurred in the past week. The data is directly obtained from United State Geological Survey as GeoJson format and tectonic plates boundaries information is collected from [fraxen](https://github.com/fraxen/tectonicplates). The map is created using leaflet and mulitple layers were added on to the map to create the tectonic plates boudaries and location of earthquakes. The size of circle point reflected the magnitude of earthquakes and the colour of circle point respresented the depth of earthquakes. Moreover, the map will zoom into the target location and provide more information about the earthquake if the user clicked on one of the circles. On/off toggles for tectonic plates boundaries and earthquakes were included to provide an option to visualise the data differently.

---
<b>Score for this assessment:</b> has not been graded yet<br />
<b>References:</b><br />
Dataset created by the [United States Geological Survey](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).