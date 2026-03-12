# Download Processed GeoTIFF Files

Due to GitHub file size limits, the processed data is hosted on Google Drive.

## Files Available

### Land Surface Temperature (LST)
1. **Lagos_LST_2014.tif** (77 MB)
   - [Download](https://drive.google.com/file/d/1SrCiNa91BMNycYMPv_vsEOhUZfwp2Yjk/view?usp=drivesdk)
   - January 2014 baseline temperature

2. **Lagos_LST_2024.tif** (77 MB)
   - [Download](https://drive.google.com/file/d/185Esx72Vxw9FXAzOERRoTCPaQyLzp6La/view?usp=drivesdk)
   - January 2024 current temperature

3. **Lagos_LST_Change.tif** (77 MB)
   - [Download](https://drive.google.com/file/d/1xbMP8odlyODFaRVVI1ZLPaqymr1tz1tu/view?usp=drivesdk)
   - Temperature change (2024 - 2014)

### Vegetation Index (NDVI)
4. **Lagos_NDVI_2014.tif** (77 MB)
   - [Download](https://drive.google.com/file/d/1TiRpB6buBcHyuWQbZX_17qJrzQRVZErh/view?usp=drivesdk)
   - January 2014 vegetation baseline

5. **Lagos_NDVI_2024.tif** (77 MB)
   - [Download](https://drive.google.com/file/d/1bZ9TvGuooPhypdinPXleVDIEmgpwIWe9/view?usp=drivesdk)
   - January 2024 vegetation current

6. **Lagos_NDVI_Change.tif** (77 MB)
   - [Download](https://drive.google.com/file/d/1Jlw3mHyucI8wgIpQKhxwi_lEoA-HQYzy/view?usp=drivesdk)
   - Vegetation change (2024 - 2014)

## Quick Download - All Files
**[Download All 6 Files (ZIP)](https://drive.google.com/drive/folders/1q4kC0ywQ9rYgYTakOMXlFGAZc5h1xPYa)**

## File Specifications
- **Format:** GeoTIFF
- **Coordinate System:** WGS 1984 (EPSG:4326)
- **Resolution:** 30 meters
- **Study Area:** Lagos State, Nigeria
- **Extent:** 2.8°E to 3.8°E, 6.2°N to 6.8°N
- **Total Size:** ~462 MB (all files)

## How to Use

### Option 1: ArcGIS Online
1. Download files
2. Log into ArcGIS Online
3. Content → Add Item → From Computer
4. Upload .tif files
5. Publish as imagery layers

### Option 2: QGIS (Free)
1. Download files
2. Open QGIS
3. Layer → Add Layer → Add Raster Layer
4. Select downloaded .tif files
5. Files display automatically

### Option 3: Python
```python
import rasterio

# Read LST 2014
with rasterio.open('Lagos_LST_2014.tif') as src:
    lst_2014 = src.read(1)
    print(f"Mean temperature: {lst_2014.mean():.2f}°C")
```

## Data Sources
Original data processed from:
- Landsat 8 (2014): USGS Earth Explorer
- Landsat 9 (2024): USGS Earth Explorer
- Processing: Google Earth Engine

## Need Help?
Issues with downloads or file usage? [Open an issue](../../issues)
