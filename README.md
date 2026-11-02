# LITHOS: Atlas of Prehistoric Stone Tools, Implements, Artefacts & Art
### Across the Lower Paleolithic, Middle Paleolithic, Upper Paleolithic, Mesolithic & Neolithic
**Concept & Design by K.S.Chandra 2026**

---

## 🏛️ Executive Summary & Overview

**LITHOS** is an interactive, eye-catching, cross-platform Prehistoric Archaeological Atlas. It brings together over 3.3 million years of human material culture, tracing the cognitive, anatomical, and technological evolution of human species through their stone tools, composite implements, mobiliary figurines, rock shelters, and prehistoric cave art.

With comprehensive global coverage and deep, up-to-date documentation on **Asia and the Indian Subcontinent**, LITHOS traces:
- **Lower Paleolithic**: The earliest Pliocene pebble tools of **Lomekwi** and **Olduvai Gorge**, the ultra-early Acheulean bifaces of **Attirampakkam** (1.51 Ma, South India) and the limestone quarry at **Isampur** (1.27 Ma), the petroglyph cupules of **Bhimbetka Auditorium Cave** (India), the quartz toolkits and hearths of **Zhoukoudian Peking Man** (China), and the D-D engraved pseudodon shell from **Trinil** (*Homo erectus*, Java).
- **Middle Paleolithic**: The groundbreaking Middle Paleolithic laminar/Levallois innovation at **Attirampakkam** (385 ka), the post-Toba supervolcano survival toolkits at **Jwalapuram Rockshelter** (74 ka, India), the high-altitude Denisovan mandible and blades at **Baishiya Karst Cave** (Tibet), the green chlorite polished bracelet and bone needles of **Denisova Cave** (Altai, Siberia), the classic convergent points of **Le Moustier** (France), and the engraved geometric ochre of **Blombos Cave** (South Africa).
- **Upper Paleolithic**: The world's oldest figurative cave painting at **Sulawesi Karst Cave (Leang Tedongnge)** (45.5 ka, Indonesia), the dynamic charcoal murals of **Chauvet Cave** (France), the **Baghor I stone shrine & triangular mother-goddess stone** (India, ~26 ka), the criss-cross engraved ostrich eggshells of **Patne** (India), the rainforest microlithic arrowheads of **Fa Hien Cave** (Sri Lanka), the pressure-flaked foliate blades of **Volgu** (France), and the oolitic limestone **Venus of Willendorf** (Austria).
- **Mesolithic**: The vibrant hunt murals and geometric chalcedony microliths of **Bhimbetka Rock Shelters** (UNESCO, India), the microlithic blade composite industries of the Ganga Valley (**Sarai Nahar Rai / Damdama**), the red deer antler frontlets of **Star Carr** (UK), and the bone sickles with inset microblade teeth from **Kebara Cave / el-Wad** (Natufian Levant).
- **Neolithic**: The monumental T-shaped limestone anthropomorphic pillars of **Göbekli Tepe** (Turkey), the aceramic farming, polished chert axes, and dentistry of **Mehrgarh** (7000 BCE, Indus Basin), the early domesticated rice with cord-impressed pottery of **Lahuradewa** (7000 BCE, Ganga Plains), the megalithic subterranean pit-dwellings and engraved hunting stele of **Burzahom** (Kashmir), the anthropomorphic rock-engraving petroglyphs of **Edakkal Cave** (Wayanad, Kerala), the South Indian pastoralist ashmounds of **Piklihal**, the ground jadeite shouldered celts of **Daojali Hading** (Assam), and the translucent alpine jadeite ceremonial axes traded across Neolithic Europe.

---

## 🌟 Key Features & Interactive Architecture

### 1. 🗺️ Interactive Prehistoric World Atlas
- Dual-engine world map powered by Leaflet with automated high-fidelity offline vector SVG fallback.
- **100% Free & Open Basemaps (No API Keys Required)**:
  - **Esri World Topographic Relief** (Primary default)
  - **Esri High-Resolution Satellite Imagery**
  - **Esri Physical Earth Terrain**
  - **OpenStreetMap Standard**
- Quick Continent & Regional jumps:
  - 🇮🇳 **India & South Asia** (Attirampakkam, Bhimbetka, Jwalapuram, Burzahom, Edakkal, Mehrgarh, Baghor)
  - 🌏 **Asia & Siberia** (Zhoukoudian, Baishiya Cave, Denisova Cave, Trinil, Sulawesi)
  - 🌍 **Africa** (Lomekwi, Olduvai, Olorgesailie, Blombos)
  - 🌍 **Europe** (Saint-Acheul, Boxgrove, Le Moustier, Chauvet, Willendorf, Star Carr)
  - 🏜️ **Near East & Levant** (Göbekli Tepe, Kebara Cave, Çatalhöyük, Jericho)
- Dedicated **"🏛️ Caves & Rock Art Only"** toggle to highlight prehistoric cave sanctuaries, karst grottos, and rock shelters worldwide.

### 2. 🔍 Authentic Museum Photograph Showcase & Physical Measurements Dashboard
- **100% Authentic Original Artefact Photographs**: All 37 catalogued prehistoric artefacts now feature authentic original museum and excavation photographs (`assets/images/*.jpg`), with interactive zoom toggle (`🔎 Zoom In` / `🔍 Zoom Out`) for close inspection of microscopic wear and knapping surfaces.
- **Prehistoric Cave, Sanctuary & Parietal Art Context Card**: Displays speleological setting, stratigraphic deposit layer, and rock art context for all cave and rockshelter sites.
- **Comprehensive Morphometrics Dashboard**:
  - Exact metric dimensions: Max Length (mm), Max Width (mm), Max Thickness (mm), and Total Mass (g / kg).
  - Advanced archaeometric indices:
    - **Cutting Edge Perimeter (cm)**
    - **Edge-to-Weight Yield Ratio (cm/kg)**
    - **Elongation Index ($L/W$)**
    - **Refinement / Flatness Index ($Th/W$)**
    - **Cross-Section Profile** (Bifacial Lenticular, Plano-Convex, Rhomboidal, Trilateral)
    - **Metric Visual Ruler** (calibrated 1:1 cm scale)

### 3. 🖥️ Screen-Fit Guarantee Across All Devices
- All modal windows (`.inspector-modal-window`, `.species-modal-window`) and Leaflet popups are constrained with strict viewport height limits (`max-height: 92vh` on desktop, `94vh` on mobile/tablet).
- **Pinned Headers & Footers**: Headers and action bars stay anchored at all times; inner scroll areas (`min-height: 0; flex: 1 1 auto; overflow-y: auto`) scroll smoothly without ever pushing modals outside the screen boundary.
- **Map Popups**: Automated Leaflet auto-pan (`autoPan: true; autoPanPadding: [25, 25]`) ensures popups never clip off the screen edge.

### 4. ⏳ Chronological Deep-Time Scale & Paleoclimate Milestones
- Interactive non-linear scrubber spanning from **3.5 Million Years Ago** to **2,000 BCE**.
- **Paleoclimate Cyclicity**: Tracks Milankovitch 41-ka and 100-ka glacial cycles (Günz, Mindel, Riss, Würm / Weichselian), Marine Isotope Stages (MIS 1 to MIS 12), Last Glacial Maximum (LGM), and Holocene thermal optimum.
- **Hominin Longevity Gantt Chart**: Dynamic visualizer mapping coexisting hominin species across prehistory.

### 5. 🧬 Human Taxa & Evolutionary Profiles (with Dual Visual Showcase)
Comprehensive anthropological dossiers with **dual visual representation**: diagnostic fossil skull remains (`skull_<id>.svg`) alongside paleoanthropological living facial reconstructions (`life_<id>.svg`), cranial capacity metrics, and diagnostic cranial architectural landmarks:
1. *Australopithecus afarensis / Kenyanthropus platyops* (3.9–2.9 Ma, Cranial: ~430 cc)
2. *Homo habilis* (2.4–1.4 Ma, Cranial: ~610 cc, Holotype: OH 7 / KNM-ER 1813)
3. *Homo erectus / ergaster / Soloensis* (1.9 Ma–108 ka, Cranial: ~950–1150 cc, including Narmada & Zhoukoudian)
4. *Homo antecessor* (1.2 Ma–800 ka, Cranial: ~1075 cc, Gran Dolina ATD6-69)
5. *Homo heidelbergensis / rhodesiensis* (700–200 ka, Cranial: ~1250 cc, Mauer 1 / Kabwe)
6. *Homo neanderthalensis* (400–40 ka, Cranial: ~1520 cc, Feldhofer / La Chapelle-aux-Saints)
7. *Denisovans (Homo sp. Altai / Xiahe)* (300–30 ka, Cranial: ~1500 cc, Baishiya Karst Mandible & Denisova Cave)
8. *Homo sapiens (Early AMH)* (315–50 ka, Cranial: ~1400 cc, Jebel Irhoud & Skhul V)
9. *Homo sapiens sapiens (Modern)* (50 ka–Present, Cranial: ~1380 cc, Cro-Magnon 1)

### 6. 💎 Catchy Master Branding & Eye-Catching Visual Identity
- **Master LITHOS Emblem**: Handcrafted vector emblem featuring a golden flaked Acheulean biface silhouette, dual conchoidal flaking facets, dynamic aura glow, glowing central ignition point, and orbital stippled rings.
- **Cinzel Chiselled Typography & Jewel Badge**: Classical monumental title with glowing amber gradient and emerald-accented 'ATLAS' jewel pill.
- **Synchronized Preloader**: Smooth animated pulsing core and rotating orbital ring revealing the atlas upon initialization.
- **100% Offline Visual Assets**: Comprehensive library of 37 detailed artifact SVGs and 18 high-fidelity skull & living species SVGs guaranteeing zero broken images or missing network requests.

### 6. 📊 Archaeometric Analytical Charts & Graphs (Chart.js)
1. **Cutting Edge Yield per Kilogram of Stone**: Clark's exponential metric from Mode 1 (~15 cm/kg) to Mode 5 (~2,200 cm/kg).
2. **Cranial Capacity vs. Technological Mode**: Correlation bubble chart mapping brain size expansion against tool complexity.
3. **Lithic Raw Material Selection Distribution**: Global proportions of Flint/Chert, Obsidian, Basalt, Quartzite, Bone/Ivory, and Greenstones.
4. **Morphometric Radar**: Length, Width, Thickness, Weight, and Edge comparison across African, European, and Asian specimens (including the Attirampakkam Acheulean cleaver).
5. **Site Density by Continent & Epoch**: Out-of-Africa dispersal and Asian/Eurasian expansion calculated directly from the live database.

### 7. ⚖️ Side-by-Side Comparative Lithic Analysis Lab
- Select any two implements, art objects, or cave assemblages side-by-side.
- Direct comparison table across 12 scientific axes: Antiquity, Mode, Petrology, Chemistry, Color, *Chaîne Opératoire*, Function & Traceology, Morphometrics, Edge Yield, Associated Hominin, Cave & Rock Art Context, and Museum Repository.
- Curated presets:
  - **Indian vs. French Acheulean** (*Attirampakkam Cleaver* vs. *Saint-Acheul Handaxe*)
  - **Bhimbetka vs. Chauvet Cave Art** (*Indian Mesolithic* vs. *Aurignacian Parietal Art*)
  - **Baghor I Shrine vs. Venus of Willendorf** (*Indian Symbolic Shrine* vs. *European Mobiliary Art*)
  - **Burzahom vs. Alpine Jadeite Celt** (*Kashmiri Megalithic* vs. *European Ceremonial Jadeite*)

### 8. ⛏️ Stratigraphic Trench Simulator & Law of Superposition
- Interactive excavation of an archaeological trench from Stratum I (Holocene topsoil) down to Stratum V (basal Pleistocene gravels).
- Unearth iconic implements layer-by-layer and discover depositional contexts.

### 9. 📚 Lithic Technology Guide & Comprehensive Glossary
- Grahame Clark's 5 Modes (1969) explained in detail.
- Physics of Conchoidal Fracture Mechanics (Hertzian cone, striking platform, bulb of percussion, eraillure scar, hackle marks, ripple waves).
- Comprehensive 20+ term prehistoric lithic and archaeological glossary.

---

## 🚀 Quick Launch Instructions

### Method A: One-Click Windows Direct Launcher (Recommended)
Simply double-click:
```bat
launch.bat
```
This automatically detects Python or your default web browser and starts LITHOS at `http://localhost:8080`.

### Method B: Cross-Platform Python Launcher (Windows, macOS, Linux)
Run the Python launcher in your terminal:
```bash
python launcher.py
```
Or on Linux/macOS:
```bash
python3 launcher.py
```

### Method C: Unix/macOS Shell Script
```bash
chmod +x launch.sh
./launch.sh
```

### Method D: Zero-Dependency Standalone Mode
Double-click `index.html` in any web browser (Chrome, Edge, Firefox, Safari). All styles, data, vector maps, and procedural sound engines work out of the box with zero external dependencies.

---

## 🏛️ Academic Citations & Survey Acknowledgments

- **Archaeological Survey of India (ASI):** Central Antiquity Collection, New Delhi; site repositories at Bhimbetka Rock Shelters (UNESCO), Burzahom, Edakkal Cave, and Baghor I.
- **Sharma Centre for Heritage Education, Chennai:** Research archives for Attirampakkam Acheulean (1.51 Ma) and Middle Paleolithic (385 ka) laminar traditions.
- **Indira Gandhi Rashtriya Manav Sangrahalaya (IGRMS), Bhopal:** Prehistoric rock shelter documentation, Bhimbetka rock art replicas, and ethno-archaeology.
- **Geological Survey of India (GSI), Kolkata:** Custodians of the Narmada Valley Hathnora archaic hominin calvarium.
- **The British Museum, London:** Department of Britain, Europe and Prehistory.
- **Musée d'Archéologie Nationale (MAN), Saint-Germain-en-Laye:** Paleolithic Collections.
- **Institute of Vertebrate Paleontology and Paleoanthropology (IVPP), Beijing:** Zhoukoudian Peking Man quartz industry and Baishiya Denisovan fossil archives.
- **Griffith University & Indonesian National Research and Innovation Agency (BRIN):** South Sulawesi Karst Cave research (Leang Tedongnge 45.5 ka parietal art).
- **Max Planck Institute for Evolutionary Anthropology, Leipzig:** Denisova Cave stratigraphy and paleogenomic sequencing archives.
- **Smithsonian Institution Human Origins Program, Washington D.C.:** African Acheulean and Oldowan research archives.
- **National Museums of Kenya, Nairobi:** West Turkana Lomekwi Archaeological Project and Olorgesailie Research Project.
- **Naturhistorisches Museum Wien (NHM), Vienna:** Department of Prehistory (Venus of Willendorf).
- **Israel Museum & Israel Antiquities Authority (IAA), Jerusalem:** Prehistoric Department (Kebara Cave, Ain Mallaha).
- **Museum of Anatolian Civilizations, Ankara:** Neolithic Collections (Çatalhöyük, Göbekli Tepe).

---

**Concept & Design by K.S.Chandra 2026**
*All Rights Reserved. Distributed under Creative Commons Attribution 4.0 International (CC BY 4.0).*
