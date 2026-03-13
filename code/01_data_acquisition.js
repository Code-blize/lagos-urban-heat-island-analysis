/**
 * Lagos Urban Heat Island Analysis (2014-2024)
 * Author: Blessing Obasi-Uzoma
 * Date: February 2026
 * 
 * This script calculates Land Surface Temperature (LST) and NDVI
 * for Lagos, Nigeria using Landsat 8/9 imagery.
 */

// ============================================
// 1. STUDY AREA DEFINITION
// ============================================

var lagos = ee.Geometry.Rectangle([2.8, 6.2, 3.8, 6.8]);
Map.centerObject(lagos, 10);
Map.addLayer(lagos, {color: 'red'}, 'Study Area');

// ============================================
// 2. CLOUD MASKING FUNCTION
// ============================================

function maskL8sr(image) {
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  return image.updateMask(qaMask).updateMask(saturationMask);
}

// [Rest of your Google Earth Engine code...]
// Include all the processing steps with comments
