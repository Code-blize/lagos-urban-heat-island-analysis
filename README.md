# Urban Heat Island Analysis: Lagos, Nigeria (2014-2024)

Satellite-based geospatial analysis quantifying urban heat island intensification in Africa's fastest-growing megacity.

**[→ View Interactive Story Map](https://arcg.is/0OfaGP0)**

---

## Overview

This project analyzes land surface temperature changes in Lagos, Nigeria over a decade (2014-2024) using Landsat satellite imagery and Google Earth Engine.

### Key Findings

| Metric | 2014 | 2024 | Change |
|--------|------|------|--------|
| Mean Temperature | 30.89°C | 32.73°C | **+1.84°C** |
| Max Temperature | 45.77°C | 50.47°C | **+4.70°C** |
| Min Temperature | 25.58°C | 27.80°C | +2.22°C |

**Additional findings:**
-  48.6% reduction in healthy vegetation coverage
-  Urban hotspots reaching 50°C+
-  8.2 million residents exposed to extreme heat (>35°C)
-  Strong correlation (r = -0.78) between vegetation loss and warming

---

## Study Area

**Location:** Lagos State, Nigeria  
**Coordinates:** 2.8°E to 3.8°E, 6.2°N to 6.8°N  
**Area:** ~3,500 km²  
**Population:** 15+ million (2024)

---

## Data Sources

| Dataset | Source | Resolution | Period |
|---------|--------|------------|--------|
| Landsat 8 Surface Reflectance | USGS Earth Explorer | 30m | January 2014 |
| Landsat 9 Surface Reflectance | USGS Earth Explorer | 30m | January 2024 |
| World Population Estimate | Esri Living Atlas | 100m | 2024 |

---

## Methodology

### 1. Data Acquisition
- Accessed Landsat Collection 2 Level-2 imagery via Google Earth Engine
- Applied cloud masking using QA_PIXEL band
- Selected dry season (January) to minimize cloud interference

### 2. Temperature Analysis
- Processed thermal infrared band (ST_B10)
- Converted digital numbers to Land Surface Temperature (°C)
- Generated temperature maps for 2014 and 2024
- Calculated temporal change (2024 - 2014)

### 3. Vegetation Analysis
- Calculated NDVI: (NIR - Red) / (NIR + Red)
- Identified healthy vegetation (NDVI > 0.5)
- Assessed vegetation loss over 10-year period

### 4. Vulnerability Assessment
- Overlaid temperature data with population density
- Identified high-risk zones (high temp + high population)
- Quantified population exposure to extreme heat

**Detailed methodology:** See [docs/methodology.md](docs/methodology.md)

---

## Results

### Temperature Hotspots

**Areas with highest warming (2014-2024):**

1. **Lekki Peninsula:** +3.5 to 5.0°C
   - Primary driver: Rapid residential/commercial development
   
2. **Ikorodu Corridor:** +3.0 to 4.5°C
   - Primary driver: Industrial expansion
   
3. **Mainland Commercial Districts:** +2.5 to 4.0°C
   - Primary driver: Increased building density

### Vegetation Loss

- **2014:** 35% of study area had healthy vegetation
- **2024:** 18% of study area has healthy vegetation
- **Net loss:** 48.6% reduction

Areas with greatest vegetation loss showed highest temperature increases.

### Population Impact

- **8.2 million people** (54.7% of Lagos) live in zones exceeding 35°C
- Vulnerable communities lack cooling infrastructure
- Strong correlation between development patterns and heat exposure

**Full results:** See [docs/results.md](docs/results.md)

---

## Technologies

- **Google Earth Engine** - Cloud-based satellite data processing
- **Landsat 8/9** - Thermal infrared and multispectral imagery
- **ArcGIS Online** - Spatial analysis and web mapping
- **ArcGIS StoryMaps** - Interactive visualization

---

## Repository Contents
```
├── data/
│   ├── processed/          # Download links for GeoTIFF files
│   └── metadata/           # Data specifications
├── code/
│   └── lagos_uhi_analysis.js    # Google Earth Engine script
├── outputs/
│   ├── figures/            # Map visualizations
│   └── statistics/         # Summary statistics
├── docs/
│   ├── methodology.md      # Detailed methods
│   └── results.md          # Complete findings
└── README.md               # This file
```

---

## Access the Data

Processed GeoTIFF files (77 MB each) are too large for GitHub.

**Download data:** See [data/processed/README.md](data/processed/README.md)

Files available:
- Land Surface Temperature (2014, 2024, Change)
- NDVI Vegetation Index (2014, 2024, Change)

---

## How to Use

### View the Analysis
**Interactive Story Map:** https://arcg.is/0OfaGP0

### Reproduce the Analysis

**Prerequisites:**
- Google Earth Engine account: [Sign up](https://earthengine.google.com/)
- Basic knowledge of JavaScript and remote sensing

**Steps:**
1. Clone this repository
2. Open `code/lagos_uhi_analysis.js`
3. Copy script to [Google Earth Engine Code Editor](https://code.earthengine.google.com/)
4. Modify study area bounds if needed
5. Run script and export results

### Use the Data

**For GIS analysis:**
1. Download GeoTIFF files from links in `data/processed/`
2. Load into ArcGIS Pro, ArcGIS Online, or QGIS
3. Apply symbology as described in documentation

**For programming:**
```python
import rasterio

# Example: Read temperature data
with rasterio.open('Lagos_LST_2024.tif') as src:
    temperature = src.read(1)
    print(f"Mean: {temperature.mean():.2f}°C")
```

---

## Key Insights

### Climate Impact
- Lagos warming faster than global average
- Urban areas show amplified temperature increases
- Heat stress poses serious public health risks

### Urban Development
- Direct correlation between development and warming
- Vegetation loss eliminates natural cooling
- Green infrastructure critical for climate adaptation

### Social Vulnerability
- Majority of Lagos residents exposed to extreme heat
- Vulnerable communities lack cooling resources
- Climate adaptation must prioritize equity

---

## Policy Recommendations

**Immediate Actions:**
- Mandate 30% minimum green space in new developments
- Launch city-wide tree planting program
- Establish heat wave early warning system
- Create public cooling centers

**Long-term Strategies:**
- Implement cool pavement and reflective materials
- Protect remaining vegetated areas
- Update building codes for passive cooling
- Continuous satellite-based monitoring

**Full recommendations:** [docs/recommendations.md](docs/recommendations.md)

---

## Project Status

**Completed:** February 2026  
**Submitted to:** Esri Young Scholar Awards 2026 (Sambus Geospatial Nigeria)

---

## Author

**Blessing Obasi-Uzoma**

- 📧 Email: blessingobasiuzoma@gmail.com
- 💼 LinkedIn: [linkedin.com/in/blessingobasiuzoma](https://linkedin.com/in/blessingobasiuzoma)
- 🐙 GitHub: [@Code-blize](https://github.com/Code-blize)
- 🗺️ Portfolio: [Story Map](https://arcg.is/0OfaGP0)

---

## Acknowledgments

- **Philippa Burgess** - Mentorship (GeoCyber Systems LLC)
- **Women+ in Geospatial** - Community support
- **Sambus Geospatial Nigeria** - Competition platform
- **USGS** - Free Landsat imagery
- **Esri** - ArcGIS platform and training

---

## License

MIT License - See [LICENSE](LICENSE) file

---

## Citation

If you use this work, please cite:
```
Obasi-Uzoma, B. (2026). Urban Heat Island Analysis: Lagos, Nigeria (2014-2024). 
GitHub. https://github.com/Code-blize/lagos-urban-heat-island-analysis
```

---

## Contributing

This is a completed academic project. For questions or collaboration opportunities, please contact me directly.

---

**Last updated:** March 2026
```

---

### **FILE 2: LICENSE**

**Location:** Root folder  
**Filename:** `LICENSE`
```
MIT License

Copyright (c) 2026 Blessing Obasi-Uzoma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

### **FILE 3: .gitignore**

**Location:** Root folder  
**Filename:** `.gitignore`
```
# Large data files
*.tif
*.zip
*.tar.gz
*.7z

# System files
.DS_Store
Thumbs.db
*.swp
*~

# IDE
.vscode/
.idea/
*.code-workspace
.project
.settings/

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
.ipynb_checkpoints/

# R
.Rhistory
.RData
.Rproj.user

# Secrets
.env
credentials.json
*.pem
*.key

# Temporary files
*.tmp
*.log
temp/
tmp/

# OS generated
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Desktop.ini
