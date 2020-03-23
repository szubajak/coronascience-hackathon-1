This file describes how to generate the citiesWithPolygons.json file which contains the Swiss cities (and places) and corresponding
polygons (boundaries). That json file is used for a quite accurate offline localization based on GPS coordinates
(see "model/UserLocations.ts").

Procedure:

1. Get the official geo files "Shape LV03 / MN03" from https://www.cadastre.ch/de/services/service/plz.html or this
direct link: http://data.geo.admin.ch/ch.swisstopo-vd.ortschaftenverzeichnis_plz/PLZO_SHP_LV03.zip
(those files are being updated on a monthly basis).

2. Get QGIS for free at https://www.qgis.org/ (version 3.2 was used) and create a new project.

3. Open the following downloaded files in your QGIS project (in menu: Layer --> Add Layer --> Add Vector Layer):
- PLZO_PLZ.shp (contains boundaries and other data, but no names)
- PLZO_OSNAME.dbf (contains names of cities/places)

4. Join the two layers by following those steps:
- double click on layer "PLZO_PLZ"
- Select navigation item "Joins" and press the plus button to add a join
- Use the following settings:
    Join layer: PLZO_OSNAME
    Join field: OS_UUID
    Target field: OS_UUID
    (use defaults for all other settings)
In case you have difficulties with any of these steps, please refer to this tutorial:
http://tilemill-project.github.io/tilemill/docs/guides/joining-data/

5. Joined layers are virtual and cannot be filtered (which you need to do). Therefore export the layer to a
new ESRI shape file by right-clicking on the layer "PLZO_PLZ" and selecting "Export" --> "Save Features As...". Don't change
any of the default settings (the format "ESRI Shapefile" should be preselected) and name the new layer "citiesWithPolygons_SHAPE".

Note: At this point, the city name field in the joined table should be called "PLZO_OSN_1" and the zipcode field
should be called "PLZ" (those names are used in the code). If this is not the case, you need to rename it manually when
exporting or joining or you need to adapt the code and this documentation(!) accordingly.

6. Export data to a geojson file (not shape!) by right-clicking on the layer "citiesWithPolygons_SHAPE" and selecting
"Export" --> "Save Features As...". Apply the following settings:
- Format: GeoJSON
- File Name: choose your desired location and name the file "citiesWithPolygons".
- CRS: "Default CRS: EPSG:4326 - WGS 84"
- Select only those fields for export (to reduce file size):
   PLZ
   PLZ_OSN_1 (Name of the city/place)
- (use default for all other options)

7. Reduce the file size significantly more by simplifying the polygons using http://mapshaper.org/
- Load your "citiesWithPolygons.geojson" file
- press "import" (use default settings)
- ignore any line intersection warnings
- press "simplify"
- use default settings and press "apply"
- set the settings slider to 5.0%
- press export and chose the GeoJSON format
- marvel at the reduced size of the new file (approx. 6mb)

8. Rename the new file to "citiesWithPolygons.json", without the "geo" in front of json (the export might do this automatically).

9. In the repository, replace the old file with the new one and rebuild and test the app.

