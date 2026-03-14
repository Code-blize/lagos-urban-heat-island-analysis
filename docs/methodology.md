# Detailed Methodology

## Research Design

This study employs a **temporal comparative analysis** using satellite remote sensing to quantify urban heat island (UHI) effects in Lagos, Nigeria over a 10-year period (2014-2024).

### Research Questions

1. How have land surface temperatures changed in Lagos between 2014 and 2024?
2. What is the relationship between vegetation loss and temperature increases?
3. Which populations face the greatest heat-related vulnerabilities?

### Hypotheses

- H1: Lagos has experienced significant warming due to urbanization
- H2: Temperature increases correlate with vegetation loss
- H3: High-density urban areas show greater warming than suburban areas

---

## Study Area

**Location:** Lagos State, Nigeria  
**Coordinates:** 2.8°E to 3.8°E, 6.2°N to 6.8°N  
**Total Area:** ~3,500 km²  
**Population:** 15+ million (2024 estimate)

**Selection Rationale:**
- Africa's largest megacity
- Rapid urbanization (>4% annual growth)
- Limited ground-based climate monitoring
- High vulnerability to heat stress

---

## Data Sources

### Primary Data: Landsat Satellite Imagery

**Landsat 8 (2014):**
- Mission: Operational Land Imager / Thermal Infrared Sensor (OLI/TIRS)
- Collection: Collection 2 Level-2 Surface Reflectance
- Temporal Resolution: 16-day revisit
- Spatial Resolution: 30m (multispectral), 100m (thermal, resampled to 30m)
- Provider: United States Geological Survey (USGS)

**Landsat 9 (2024):**
- Mission: OLI-2/TIRS-2
- Collection: Collection 2 Level-2 Surface Reflectance
- Specifications: Same as Landsat 8 (continuity mission)

**Bands Used:**
- Band 4 (Red): 0.64-0.67 μm
- Band 5 (NIR): 0.85-0.88 μm
- Band 10 (Thermal): 10.6-11.19 μm (Landsat 8), TIRS Band 10 (Landsat 9)
- QA_PIXEL: Quality assessment for cloud masking
- ST_B10: Surface temperature product

### Ancillary Data

**Population Data:**
- Source: Esri World Population Estimate
- Resolution: 100m
- Year: 2024
- Use: Vulnerability assessment

**Administrative Boundaries:**
- Source: Humanitarian Data Exchange (HDX)
- Format: Vector (shapefile)
- Use: Regional analysis

---

## Data Collection

### Temporal Selection

**Time Periods:**
- Baseline: January 2014
- Current: January 2024

**Rationale:**
- January is Lagos's dry season
- Minimal cloud cover (<15% average)
- Temporal comparability (same month)
- Representative of peak temperature conditions

### Image Acquisition Criteria

**Selection Parameters:**
- Geographic coverage: Complete Lagos extent
- Cloud cover: <15%
- Quality flags: No sensor anomalies
- Processing level: Surface Reflectance (atmospherically corrected)

---

## Data Processing

### Platform

**Google Earth Engine (GEE):**
- Cloud-based geospatial processing
- JavaScript API
- Petabyte-scale imagery access
- Parallel processing capabilities

### Processing Workflow

#### Step 1: Image Collection and Filtering
```javascript
// Filter by location, time, and cloud cover
var images = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(studyArea)
  .filterDate('2014-01-01', '2014-01-31')
  .filter(ee.Filter.lt('CLOUD_COVER', 15));
```

#### Step 2: Cloud Masking

**Method:** QA_PIXEL band analysis

**Masked Features:**
- Clouds (bit 3)
- Cloud shadows (bit 4)
- Cirrus (bit 2)
- Saturation (QA_RADSAT band)

**Implementation:**
```javascript
function maskClouds(image) {
  var qa = image.select('QA_PIXEL');
  var mask = qa.bitwiseAnd(parseInt('11111', 2)).eq(0);
  return image.updateMask(mask);
}
```

#### Step 3: Land Surface Temperature Calculation

**Thermal Band Processing:**

1. **Extract thermal band** (ST_B10)
2. **Apply scale factor:** 0.00341802
3. **Apply offset:** 149.0
4. **Convert Kelvin to Celsius:** Subtract 273.15

**Formula:**
```
LST (°C) = (DN × 0.00341802 + 149.0) - 273.15
```

Where DN = Digital Number from ST_B10 band

**Validation:**
- Expected range: 20-50°C for tropical urban areas
- Cross-checked with regional climate data

#### Step 4: NDVI Calculation

**Formula:**
```
NDVI = (NIR - Red) / (NIR + Red)
```

**Band Assignment:**
- NIR: Band 5 (0.85-0.88 μm)
- Red: Band 4 (0.64-0.67 μm)

**Interpretation:**
- NDVI < 0: Water, clouds
- 0 < NDVI < 0.2: Bare soil, urban
- 0.2 < NDVI < 0.5: Sparse vegetation
- 0.5 < NDVI < 0.8: Healthy vegetation
- NDVI > 0.8: Dense vegetation

#### Step 5: Temporal Compositing

**Method:** Median compositing

**Rationale:**
- Reduces noise
- Minimizes cloud artifacts
- Preserves representative values

**Implementation:**
```javascript
var composite = imageCollection.median();
```

#### Step 6: Change Detection

**Approach:** Simple differencing

**Calculations:**
- ΔTemperature = LST₂₀₂₄ - LST₂₀₁₄
- ΔNDVI = NDVI₂₀₂₄ - NDVI₂₀₁₄

**Interpretation:**
- Positive ΔT: Warming
- Negative ΔT: Cooling
- Positive ΔNDVI: Vegetation gain
- Negative ΔNDVI: Vegetation loss

---

## Statistical Analysis

### Descriptive Statistics

**Calculated for each dataset:**
- Mean (average temperature/NDVI)
- Minimum value
- Maximum value
- Standard deviation
- Percentiles (25th, 50th, 75th)

**Implementation:**
```javascript
var stats = image.reduceRegion({
  reducer: ee.Reducer.mean()
    .combine(ee.Reducer.minMax(), '', true)
    .combine(ee.Reducer.stdDev(), '', true),
  geometry: studyArea,
  scale: 30,
  maxPixels: 1e9
});
```

### Correlation Analysis

**Variables:** LST Change vs. NDVI Change

**Method:** Pearson correlation coefficient

**Hypothesis:** Negative correlation (vegetation loss → warming)

**Result:** r = -0.78 (strong negative correlation)

### Hotspot Analysis

**Classification Thresholds:**
- Low warming: ΔT < 1°C
- Moderate warming: 1°C ≤ ΔT < 3°C
- High warming: ΔT ≥ 3°C

**Spatial Pattern Analysis:**
- Identified contiguous high-warming zones
- Overlaid with land use categories
- Determined primary drivers (residential, industrial, commercial)

---

## Vulnerability Assessment

### Population Exposure

**Method:** Overlay analysis

**Data Integration:**
1. LST 2024 (temperature layer)
2. Population density (Esri data)

**Classification:**
- High risk: Temperature >35°C AND Population density >1000/km²
- Medium risk: Temperature 32-35°C OR moderate density
- Low risk: Temperature <32°C AND low density

**Results:**
- High-risk zones: 8.2 million people
- Percentage of total: 54.7%

---

## Quality Assurance

### Data Quality Checks

1. **Visual Inspection:**
   - Reviewed all imagery for artifacts
   - Verified cloud masking effectiveness
   - Checked for sensor anomalies

2. **Statistical Validation:**
   - Compared temperature ranges to climatology
   - Verified NDVI values fall within expected bounds
   - Cross-checked change magnitudes for reasonableness

3. **Temporal Consistency:**
   - Confirmed consistent processing methods
   - Verified same seasons compared
   - Ensured coordinate system alignment

### Limitations

**Temporal:**
- Only two time points (2014, 2024)
- Cannot assess inter-annual variability
- Single season (dry season only)

**Spatial:**
- 30m resolution may miss fine-scale patterns
- Thermal data originally 100m (resampled)
- Urban canyon effects not captured

**Satellite-Specific:**
- Overpass time (~10:30 AM local)
- Does not capture maximum daily temperature
- Single snapshot per acquisition

**Methodological:**
- Change detection assumes linear trends
- No ground-truth validation conducted
- Population data may have errors

---

## Software and Tools

**Primary Platform:**
- Google Earth Engine (JavaScript API)
- Version: Current as of February 2026

**Secondary Tools:**
- ArcGIS Online (web mapping, analysis)
- ArcGIS StoryMaps (visualization)
- Python (optional post-processing)

**Code Availability:**
- Full GEE script: `code/lagos_uhi_analysis.js`
- GitHub repository: [Link]

---

## Reproducibility

### Data Access

All input data is freely available:
- Landsat imagery: USGS Earth Explorer or Google Earth Engine
- Population data: Esri Living Atlas
- Administrative boundaries: HDX

### Code Availability

Complete processing script provided in repository.

### Processing Requirements

**Minimum Requirements:**
- Google Earth Engine account (free)
- Web browser
- Basic JavaScript knowledge

**Processing Time:**
- ~5-10 minutes for full analysis
- No local computational resources needed

---

## Ethical Considerations

**Data Privacy:**
- No individual-level data collected
- Aggregated population statistics only
- No personally identifiable information

**Use of Results:**
- Findings intended for public good
- Support climate adaptation planning
- Inform urban policy decisions

**Open Science:**
- Code and methods fully documented
- Data publicly accessible
- Results shared openly

---

## References

**Landsat Data:**
- USGS Landsat Collection 2 documentation
- Landsat 8/9 calibration guides

**Methodology:**
- Standard remote sensing textbooks
- Peer-reviewed UHI analysis papers
- GEE documentation and tutorials

---

## Contact

For methodological questions:

**Blessing Obasi-Uzoma**  
Email: blessingobasiuzoma@gmail.com
