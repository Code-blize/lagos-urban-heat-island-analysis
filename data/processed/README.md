# Processed GeoTIFF Files

The processed data files are too large for direct GitHub hosting (77 MB each, 462 MB total).

## Download Links

### Option 1: Download All Files (Recommended)

**[→ Download Complete Dataset (ZIP)](https://drive.google.com/drive/folders/1q4kC0ywQ9rYgYTakOMXlFGAZc5h1xPYa)**

All 6 GeoTIFF files in one compressed folder.

---

### Option 2: Download Individual Files

#### Land Surface Temperature (LST)

**1. Lagos_LST_2014.tif** (77 MB)
- **Download:** [Google Drive](https://drive.google.com/file/d/1SrCiNa9l8MVycYmPv_vsEOhUZfwp2Yjk/view?usp=drivesdk)
- **Description:** Land Surface Temperature for January 2014 (baseline)
- **Values:** Temperature in °C
- **Range:** 25.58°C to 45.77°C
- **Mean:** 30.89°C

**2. Lagos_LST_2024.tif** (77 MB)
- **Download:** [Google Drive](https://drive.google.com/file/d/185Esx72Vxw9FXAzOERRoTCPaQyLzp6La/view?usp=drivesdk)
- **Description:** Land Surface Temperature for January 2024 (current)
- **Values:** Temperature in °C
- **Range:** 27.80°C to 50.47°C
- **Mean:** 32.73°C

**3. Lagos_LST_Change.tif** (77 MB)
- **Download:** [Google Drive](https://drive.google.com/file/d/1xbMP8odlyODFaRVVI1ZLPaqymr1tz1tu/view?usp=drivesdk)
- **Description:** Temperature change (2024 minus 2014)
- **Values:** Temperature difference in °C
- **Range:** -3°C to +5°C (negative = cooling, positive = warming)

---

#### Vegetation Index (NDVI)

**4. Lagos_NDVI_2014.tif** (77 MB)
- **Download:** [Google Drive](https://drive.google.com/file/d/1TiRpB6buBcHyuWQbZX_17qJrzQRVZErh/view?usp=drivesdk)
- **Description:** Normalized Difference Vegetation Index for January 2014
- **Values:** NDVI (dimensionless)
- **Range:** -0.2 to 0.8
- **Interpretation:** >0.5 = healthy vegetation

**5. Lagos_NDVI_2024.tif** (77 MB)
- **Download:** [Google Drive](https://drive.google.com/file/d/1bZ9TvGuooPhypdinPXleVDIEmgpwIWe9/view?usp=drivesdk)
- **Description:** Normalized Difference Vegetation Index for January 2024
- **Values:** NDVI (dimensionless)
- **Range:** -0.2 to 0.8

**6. Lagos_NDVI_Change.tif** (77 MB)
- **Download:** [Google Drive](https://drive.google.com/file/d/1Jlw3mHyucI8wgIpQKhxwi_lEoA-HQYzy/view?usp=drivesdk)
- **Description:** NDVI change (2024 minus 2014)
- **Values:** NDVI difference
- **Interpretation:** Negative = vegetation loss

---

## File Specifications

**Format:** GeoTIFF (.tif)  
**Coordinate System:** WGS 1984 (EPSG:4326)  
**Spatial Resolution:** 30 meters  
**Study Area Extent:**
- West: 2.8°E
- East: 3.8°E
- South: 6.2°N
- North: 6.8°N

**Data Type:** Float32  
**NoData Value:** -9999  
**Compression:** LZW

---

## How to Use the Data

### In ArcGIS Online

1. Download desired .tif file(s)
2. Log into ArcGIS Online
3. Go to **Content** → **Add Item** → **From Computer**
4. Select the .tif file
5. Click **Publish** to create imagery layer
6. Add to map and apply symbology

### In ArcGIS Pro

1. Download .tif file(s)
2. Open ArcGIS Pro project
3. Right-click **Maps** → **Add Data**
4. Navigate to downloaded file
5. Apply symbology:
   - LST files: Blue (cold) to Red (hot) color ramp
   - NDVI files: Brown (bare) to Green (vegetation) color ramp

### In QGIS (Free Alternative)

1. Download .tif file(s)
2. Open QGIS
3. **Layer** → **Add Layer** → **Add Raster Layer**
4. Select downloaded file
5. Apply styling in **Layer Properties** → **Symbology**

### In Python
```python
import rasterio
import numpy as np
import matplotlib.pyplot as plt

# Read LST 2024
with rasterio.open('Lagos_LST_2024.tif') as src:
    lst = src.read(1)
    
    # Calculate statistics
    print(f"Mean temperature: {np.nanmean(lst):.2f}°C")
    print(f"Max temperature: {np.nanmax(lst):.2f}°C")
    print(f"Min temperature: {np.nanmin(lst):.2f}°C")
    
    # Visualize
    plt.imshow(lst, cmap='RdYlBu_r')
    plt.colorbar(label='Temperature (°C)')
    plt.title('Lagos Land Surface Temperature 2024')
    plt.show()
```

### In R
```r
library(raster)
library(terra)

# Read LST 2024
lst <- rast("Lagos_LST_2024.tif")

# Calculate statistics
mean(lst, na.rm=TRUE)
max(lst, na.rm=TRUE)
min(lst, na.rm=TRUE)

# Visualize
plot(lst, main="Lagos LST 2024", col=heat.colors(100))
```

---

## Data Quality Notes

**Cloud Masking:**
- All scenes filtered for <15% cloud cover
- QA_PIXEL band used for cloud/shadow masking
- Only clear observations included

**Temporal Selection:**
- January chosen as dry season month
- Minimizes cloud interference
- Ensures temporal comparability

**Processing:**
- Landsat Collection 2 Level-2 Surface Reflectance
- Atmospheric correction applied by USGS
- Scale factors and offsets applied during LST calculation

---

## Reproducing the Data

Instead of downloading, you can regenerate these files:

1. Access [Google Earth Engine](https://earthengine.google.com/)
2. Use the script in `code/lagos_uhi_analysis.js`
3. Run for your desired time periods
4. Export as GeoTIFF

---

## Questions?

For issues with data download or usage:
- **Email:** blessingobasiuzoma@gmail.com
- **Open an issue:** [GitHub Issues](../../issues)

---

## Data Citation
```
Obasi-Uzoma, B. (2026). Lagos Urban Heat Island Analysis Dataset (2014-2024). 
Derived from Landsat 8/9 imagery via Google Earth Engine.
```

**Original data sources:**
- USGS Landsat 8 Collection 2 Level-2
- USGS Landsat 9 Collection 2 Level-2
