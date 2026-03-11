# Urban Heat Island Analysis: Lagos, Nigeria (2014-2024)

[![Story Map](https://img.shields.io/badge/Story%20Map-View%20Interactive-blue)](https://arcg.is/0OfaGP0)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

##  Project Overview

A geospatial analysis quantifying urban heat island (UHI) intensification in Lagos, Nigeria over a 10-year period (2014-2024) using satellite remote sensing and GIS.

**Key Findings:**
- Average temperature increase: **1.84°C** (2014-2024)
- Peak urban temperatures: **50.47°C** (2024)
- Vegetation loss: **48.6%** reduction in healthy green space
- Population at risk: **8.2 million** residents exposed to extreme heat (>35°C)

 **[View Interactive Story Map](https://arcg.is/0OfaGP0)**

![Temperature Change Map](outputs/figures/temperature_change_map.png)

---

## 📖 Table of Contents

- [Motivation](#motivation)
- [Data Sources](#data-sources)
- [Methodology](#methodology)
- [Results](#results)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [How to Use](#how-to-use)
- [Future Work](#future-work)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

---

##  Motivation

Lagos is Africa's fastest-growing megacity with over 15 million residents. Rapid urbanization has transformed the city's thermal landscape, creating dangerous heat conditions for vulnerable populations. This project provides empirical evidence for climate adaptation planning and urban policy reform.

**Research Questions:**
1. How have land surface temperatures changed in Lagos between 2014 and 2024?
2. What is the relationship between urban development and temperature increases?
3. Which populations face the greatest heat-related vulnerabilities?

---

##  Data Sources

| Dataset | Source | Resolution | Time Period |
|---------|--------|------------|-------------|
| Landsat 8 (C2L2) | USGS Earth Explorer | 30m (thermal: 100m) | Jan 2014 |
| Landsat 9 (C2L2) | USGS Earth Explorer | 30m (thermal: 100m) | Jan 2024 |
| World Population | Esri Living Atlas | 100m | 2024 |
| Admin Boundaries | HDX | Vector | 2024 |

**Study Area:** Lagos State, Nigeria  
**Geographic Extent:** 2.8°E to 3.8°E, 6.2°N to 6.8°N  
**Area:** ~3,500 km²

---

##  Methodology

### 1. Data Acquisition
- Accessed Landsat Collection 2 Level-2 Surface Reflectance via Google Earth Engine
- Applied cloud masking using QA_PIXEL band
- Filtered for dry season (January) to minimize cloud cover

### 2. Land Surface Temperature (LST) Calculation
```javascript
// Thermal band processing
var LST = thermal.select('ST_B10')
  .multiply(0.00341802).add(149.0)  // Scale and offset
  .subtract(273.15);  // Convert Kelvin to Celsius
```

### 3. Vegetation Analysis
- Calculated NDVI: (NIR - Red) / (NIR + Red)
- Classified vegetation health (NDVI > 0.5 = healthy)

### 4. Change Detection
- Computed temporal differences (2024 - 2014)
- Identified hotspot zones (ΔT > 3°C)

### 5. Vulnerability Assessment
- Overlaid temperature with population density
- Identified high-risk zones (high temp + high density)

**Full methodology:** [docs/methodology.md](docs/methodology.md)

---

##  Results

### Temperature Trends

| Metric | 2014 | 2024 | Change |
|--------|------|------|--------|
| Mean Temp (°C) | 30.89 | 32.73 | **+1.84** |
| Max Temp (°C) | 45.77 | 50.47 | **+4.70** |
| Min Temp (°C) | 25.58 | 27.80 | +2.22 |

### Vegetation Loss
- 2014 healthy vegetation coverage: **35%** of study area
- 2024 healthy vegetation coverage: **18%** of study area  
- **Loss: 48.6%**

### Hotspot Zones
1. **Lekki Peninsula:** +3.5-5.0°C (residential development)
2. **Ikorodu Corridor:** +3.0-4.5°C (industrial expansion)
3. **Mainland Districts:** +2.5-4.0°C (building density)

**Detailed results:** [docs/results.md](docs/results.md)

---

##  Technologies Used

- **Google Earth Engine** - Satellite data processing (JavaScript API)
- **ArcGIS Online** - Spatial analysis & web mapping
- **ArcGIS StoryMaps** - Interactive presentation
- **Landsat 8/9** - Thermal infrared & multispectral imagery
- **Python** (optional) - Data analysis & visualization

---

##  Project Structure
```
├── data/              # GeoTIFF files, metadata
├── code/              # Google Earth Engine scripts
├── outputs/           # Maps, statistics, figures
├── docs/              # Documentation
└── README.md          # This file
```

---

##  How to Use

### View the Project
**Interactive Story Map:** [https://arcg.is/0OfaGP0](https://arcg.is/0OfaGP0)

### Reproduce the Analysis

**1. Clone the repository:**
```bash
git clone https://github.com/Code-blize/Lagos-Urban-Heat-Island-Analysis.git
cd Lagos-Urban-Heat-Island-Analysis
```

**2. Access Google Earth Engine:**
- Sign up: [https://earthengine.google.com/](https://earthengine.google.com/)
- Open Code Editor: [https://code.earthengine.google.com/](https://code.earthengine.google.com/)

**3. Run the scripts:**
- Copy code from `code/01_data_acquisition.js`
- Paste into GEE Code Editor
- Modify study area bounds if needed
- Run and export results

**4. Download processed data:**
- GeoTIFF files available in `data/processed/`
- Load into ArcGIS Online or QGIS

---

##  Future Work

- [ ] Seasonal analysis (wet vs dry season comparison)
- [ ] Integration with socioeconomic vulnerability indices
- [ ] Predictive modeling (future temperature scenarios)
- [ ] Expansion to other West African cities
- [ ] Real-time monitoring dashboard
- [ ] Ground-truthing with field temperature sensors

---

##  Acknowledgments

- **Philippa Burgess** - Mentorship and guidance (GeoCyber Systems LLC)
- **Women+ in Geospatial** - Community support and opportunities
- **Sambus Geospatial Nigeria** - Esri Young Scholar Awards platform
- **USGS** - Free Landsat imagery
- **Esri** - ArcGIS Online and training resources

**Submitted to:** Esri Young Scholar Awards 2026

---

##  Contact

**Blessing Obasi-Uzoma**  
 Email: blessingobasiuzoma@gmail.com  
 LinkedIn: [linkedin.com/in/blessingobasiuzoma](https://linkedin.com/in/blessingobasiuzoma)  
 Portfolio: [Story Map](https://arcg.is/0OfaGP0)

---

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

##  Citation

If you use this work, please cite:
```
Obasi-Uzoma, B. (2026). Urban Heat Island Analysis: Lagos, Nigeria (2014-2024). 
GitHub repository. https://github.com/Code-blize/Lagos-UHI-Analysis
```

---

**Built with 🌍 for climate-adaptive urban planning**
```

---

2. .gitignore

Create this file to exclude large/unnecessary files:
```
# Large data files
*.tif
*.zip
*.tar.gz
data/raw/*.tif

# System files
.DS_Store
Thumbs.db
*.swp

# IDE
.vscode/
.idea/
*.code-workspace

# Python
__pycache__/
*.pyc
*.pyo
.ipynb_checkpoints/

# Secrets
.env
credentials.json

# Temporary files
*.tmp
*.log
temp/
```

 3. LICENSE

Use MIT License (most common for open-source):
```
MIT License

Copyright (c) 2026 Blessing Obasi-Uzoma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[Standard MIT License text...]
