/**
 * Lagos Urban Heat Island Analysis (2014-2024)
 * 
 * Author: Blessing Obasi-Uzoma
 * Date: February 2026
 * Platform: Google Earth Engine (JavaScript API)
 * 
 * This script analyzes urban heat island effects in Lagos, Nigeria by:
 * 1. Processing Landsat 8/9 thermal imagery
 * 2. Calculating Land Surface Temperature (LST)
 * 3. Computing Normalized Difference Vegetation Index (NDVI)
 * 4. Performing temporal change detection (2014 vs 2024)
 * 
 * Study Area: Lagos State, Nigeria
 * Coordinates: 2.8-3.8°E, 6.2-6.8°N
 * Time Period: January 2014 vs January 2024 (dry season)
 */

// ============================================
// 1. DEFINE STUDY AREA
// ============================================

var lagos = ee.Geometry.Rectangle([2.8, 6.2, 3.8, 6.8]);
Map.centerObject(lagos, 10);
Map.addLayer(lagos, {color: 'red'}, 'Study Area', false);

// ============================================
// 2. CLOUD MASKING FUNCTION
// ============================================

function maskL8sr(image) {
  // Bits 3 and 5: cloud and cloud shadow
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  
  // Apply masks
  return image.updateMask(qaMask)
              .updateMask(saturationMask);
}

// ============================================
// 3. LST CALCULATION FUNCTION
// ============================================

function calculateLST(image) {
  // Get thermal band (ST_B10)
  var thermal = image.select('ST_B10');
  
  // Apply scale and offset, convert to Celsius
  var lst = thermal.multiply(0.00341802)
                   .add(149.0)
                   .subtract(273.15);  // Kelvin to Celsius
  
  return lst.rename('LST');
}

// ============================================
// 4. NDVI CALCULATION FUNCTION
// ============================================

function calculateNDVI(image) {
  // Calculate NDVI from NIR and Red bands
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  return ndvi;
}

// ============================================
// 5. LOAD AND PROCESS 2014 DATA
// ============================================

var landsat8_2014 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(lagos)
  .filterDate('2014-01-01', '2014-01-31')
  .filter(ee.Filter.lt('CLOUD_COVER', 15))
  .map(maskL8sr);

// Calculate LST and NDVI for 2014
var lst_2014 = landsat8_2014.map(calculateLST).median().clip(lagos);
var ndvi_2014 = landsat8_2014.map(calculateNDVI).median().clip(lagos);

// ============================================
// 6. LOAD AND PROCESS 2024 DATA
// ============================================

var landsat9_2024 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
  .filterBounds(lagos)
  .filterDate('2024-01-01', '2024-01-31')
  .filter(ee.Filter.lt('CLOUD_COVER', 15))
  .map(maskL8sr);

// Calculate LST and NDVI for 2024
var lst_2024 = landsat9_2024.map(calculateLST).median().clip(lagos);
var ndvi_2024 = landsat9_2024.map(calculateNDVI).median().clip(lagos);

// ============================================
// 7. CALCULATE CHANGE (2024 - 2014)
// ============================================

var lst_change = lst_2024.subtract(lst_2014).rename('LST_Change');
var ndvi_change = ndvi_2024.subtract(ndvi_2014).rename('NDVI_Change');

// ============================================
// 8. VISUALIZATION
// ============================================

// LST visualization parameters
var lstVis = {
  min: 20,
  max: 45,
  palette: ['blue', 'cyan', 'yellow', 'orange', 'red']
};

// NDVI visualization parameters
var ndviVis = {
  min: -0.2,
  max: 0.8,
  palette: ['brown', 'yellow', 'lightgreen', 'green', 'darkgreen']
};

// Change visualization parameters
var changeVis = {
  min: -3,
  max: 5,
  palette: ['blue', 'white', 'red']
};

// Add layers to map
Map.addLayer(lst_2014, lstVis, 'LST 2014');
Map.addLayer(lst_2024, lstVis, 'LST 2024');
Map.addLayer(lst_change, changeVis, 'LST Change (2024-2014)');

Map.addLayer(ndvi_2014, ndviVis, 'NDVI 2014', false);
Map.addLayer(ndvi_2024, ndviVis, 'NDVI 2024', false);
Map.addLayer(ndvi_change, {min: -0.5, max: 0.5, palette: ['red', 'white', 'green']}, 'NDVI Change', false);

// ============================================
// 9. CALCULATE STATISTICS
// ============================================

// LST statistics
var lst_2014_stats = lst_2014.reduceRegion({
  reducer: ee.Reducer.mean().combine({
    reducer2: ee.Reducer.minMax(),
    sharedInputs: true
  }),
  geometry: lagos,
  scale: 30,
  maxPixels: 1e9
});

var lst_2024_stats = lst_2024.reduceRegion({
  reducer: ee.Reducer.mean().combine({
    reducer2: ee.Reducer.minMax(),
    sharedInputs: true
  }),
  geometry: lagos,
  scale: 30,
  maxPixels: 1e9
});

// Print statistics
print('2014 LST Statistics:', lst_2014_stats);
print('2024 LST Statistics:', lst_2024_stats);

// ============================================
// 10. EXPORT DATA (UNCOMMENT TO USE)
// ============================================

// Export LST 2014
/*
Export.image.toDrive({
  image: lst_2014,
  description: 'Lagos_LST_2014',
  folder: 'Lagos_UHI_ArcGIS',
  region: lagos,
  scale: 30,
  crs: 'EPSG:4326',
  fileFormat: 'GeoTIFF',
  maxPixels: 1e9
});
*/

// Export LST 2024
/*
Export.image.toDrive({
  image: lst_2024,
  description: 'Lagos_LST_2024',
  folder: 'Lagos_UHI_ArcGIS',
  region: lagos,
  scale: 30,
  crs: 'EPSG:4326',
  fileFormat: 'GeoTIFF',
  maxPixels: 1e9
});
*/

// Export LST Change
/*
Export.image.toDrive({
  image: lst_change,
  description: 'Lagos_LST_Change',
  folder: 'Lagos_UHI_ArcGIS',
  region: lagos,
  scale: 30,
  crs: 'EPSG:4326',
  fileFormat: 'GeoTIFF',
  maxPixels: 1e9
});
*/

// Similar exports for NDVI files...

print('Script execution complete. Check the Console for statistics.');
print('To export data, uncomment the Export sections and click Run.');
