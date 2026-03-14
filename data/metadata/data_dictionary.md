# Data Dictionary

## Raster Datasets

### Land Surface Temperature (LST) Files

#### Lagos_LST_2014.tif

| Attribute | Value |
|-----------|-------|
| Variable | Land Surface Temperature |
| Time Period | January 2014 |
| Units | Degrees Celsius (°C) |
| Data Type | Float32 |
| NoData Value | -9999 |
| Min Value | 25.58°C |
| Max Value | 45.77°C |
| Mean Value | 30.89°C |
| Std Dev | 3.21°C |

**Calculation Method:**
- Landsat 8 Band 10 (Thermal Infrared)
- Scale factor: 0.00341802
- Offset: 149.0
- Converted from Kelvin to Celsius

---

#### Lagos_LST_2024.tif

| Attribute | Value |
|-----------|-------|
| Variable | Land Surface Temperature |
| Time Period | January 2024 |
| Units | Degrees Celsius (°C) |
| Data Type | Float32 |
| NoData Value | -9999 |
| Min Value | 27.80°C |
| Max Value | 50.47°C |
| Mean Value | 32.73°C |
| Std Dev | 4.12°C |

---

#### Lagos_LST_Change.tif

| Attribute | Value |
|-----------|-------|
| Variable | Temperature Change |
| Calculation | LST_2024 minus LST_2014 |
| Units | Degrees Celsius (°C) |
| Data Type | Float32 |
| Interpretation | Positive = warming, Negative = cooling |
| Mean Change | +1.84°C |
| Max Warming | +4.70°C |

---

### Vegetation Index (NDVI) Files

#### Lagos_NDVI_2014.tif

| Attribute | Value |
|-----------|-------|
| Variable | Normalized Difference Vegetation Index |
| Time Period | January 2014 |
| Units | Dimensionless (-1 to +1) |
| Data Type | Float32 |
| NoData Value | -9999 |
| Mean Value | 0.42 |

**Calculation:** (NIR - Red) / (NIR + Red)

**Interpretation:**
- < 0: Water, clouds
- 0 - 0.2: Bare soil, urban areas
- 0.2 - 0.5: Sparse vegetation
- 0.5 - 0.8: Healthy vegetation
- > 0.8: Very dense vegetation

---

#### Lagos_NDVI_2024.tif

| Attribute | Value |
|-----------|-------|
| Variable | Normalized Difference Vegetation Index |
| Time Period | January 2024 |
| Units | Dimensionless (-1 to +1) |
| Data Type | Float32 |
| Mean Value | 0.31 |

---

#### Lagos_NDVI_Change.tif

| Attribute | Value |
|-----------|-------|
| Variable | NDVI Change |
| Calculation | NDVI_2024 minus NDVI_2014 |
| Units | Dimensionless |
| Interpretation | Negative = vegetation loss |
| Mean Change | -0.11 |

---

## Spatial Reference

**All files:**
- **Coordinate System:** WGS 1984 (Geographic)
- **EPSG Code:** 4326
- **Units:** Decimal degrees
- **Datum:** WGS 1984

---

## Quality Flags

**Cloud Masking:**
- QA_PIXEL band used
- Clouds, cloud shadows, and cirrus removed
- Only clear observations retained

**Data Gaps:**
- NoData value: -9999
- Represents masked pixels (clouds, shadows, or outside study area)

---

## Processing History

1. **Image Collection**
   - Platform: Google Earth Engine
   - Collection: Landsat Collection 2 Level-2

2. **Preprocessing**
   - Cloud masking via QA_PIXEL
   - Temporal filtering (January only)
   - Spatial filtering (Lagos bounds)

3. **LST Calculation**
   - Thermal band extraction
   - Scale/offset application
   - Kelvin to Celsius conversion

4. **NDVI Calculation**
   - NIR and Red band extraction
   - Formula application
   - Range normalization

5. **Change Detection**
   - Temporal differencing (2024 - 2014)
   - Statistical validation

6. **Export**
   - Format: GeoTIFF
   - Compression: LZW
   - Resolution: 30m preserved

---

## Uncertainty and Limitations

**Landsat Data:**
- Overpass time: ~10:30 AM local time
- Does not capture maximum daily temperature
- Single snapshot per year

**Cloud Masking:**
- Conservative approach may remove valid pixels
- Some residual cloud contamination possible

**Temporal Coverage:**
- Two time points only (2014, 2024)
- Cannot assess inter-annual variability

**Spatial Resolution:**
- 30m resolution may miss fine-scale urban patterns
- Thermal data originally 100m, resampled to 30m

---

## Recommended Use Cases

**Appropriate:**
- Urban heat island assessment
- Vegetation change analysis
- Climate adaptation planning
- Environmental monitoring
- GIS education and training

**Not Recommended:**
- Precise temperature measurement (use ground stations)
- Daily or sub-daily analysis (use geostationary satellites)
- Fine-scale building-level analysis (use thermal drones/sensors)

---

## Contact

For questions about data specifications:

**Blessing Obasi-Uzoma**  
Email: blessingobasiuzoma@gmail.com
