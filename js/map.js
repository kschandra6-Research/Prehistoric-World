/**
 * LITHOS - Prehistoric Stone Atlas
 * Interactive World Map Module (Leaflet + High-Fidelity SVG Fallback)
 * Concept & Design by K.S.Chandra 2026
 */

class AtlasMapEngine {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.map = null;
    this.markersGroup = null;
    this.allMarkers = [];
    this.activeFilters = {
      epoch: "all",
      species: "all",
      material: "all"
    };
    this.options = Object.assign({
      center: [28.0, 15.0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 14
    }, options);
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    if (typeof L !== "undefined") {
      this.initLeafletMap();
    } else {
      console.warn("Leaflet not detected; initializing Vector SVG fallback map.");
      this.initSvgFallbackMap();
    }
  }

  initLeafletMap() {
    try {
      this.map = L.map(this.containerId, {
        center: this.options.center,
        zoom: this.options.zoom,
        minZoom: this.options.minZoom,
        maxZoom: this.options.maxZoom,
        zoomControl: true,
        attributionControl: false
      });

      // 1. Topographic & Archaeological Relief (Primary default - 100% free, NO API key required)
      const topoTiles = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 18,
        attribution: "Esri Topography"
      });

      // 2. High-Resolution Satellite Topography (Free, NO API key required)
      const esriSatellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 18,
        attribution: "Esri Satellite"
      });

      // 3. Prehistoric Physical Relief & Terrain (Free, NO API key required)
      const physicalTiles = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 8,
        attribution: "Esri Physical Earth"
      });

      // 4. OpenStreetMap Standard (Open source, free, NO API key required)
      const osmTiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "OpenStreetMap"
      });

      // Set default base layer
      topoTiles.addTo(this.map);

      // Layer switcher control for user convenience
      const baseMaps = {
        "Topographic Relief (Default)": topoTiles,
        "Satellite Imagery": esriSatellite,
        "Physical Terrain": physicalTiles,
        "OpenStreetMap": osmTiles
      };
      L.control.layers(baseMaps, null, { position: "topright" }).addTo(this.map);

      this.markersGroup = L.layerGroup().addTo(this.map);
      this.renderMarkers();
    } catch (err) {
      console.error("Leaflet initialization error, falling back to SVG vector map:", err);
      this.initSvgFallbackMap();
    }
  }

  getEpochColor(epochKey) {
    switch (epochKey) {
      case "lower_paleolithic": return "#d97706"; // Amber
      case "middle_paleolithic": return "#0284c7"; // Azure blue
      case "upper_paleolithic": return "#9333ea"; // Purple
      case "mesolithic": return "#059669"; // Emerald green
      case "neolithic": return "#e11d48"; // Rose / Ruby
      default: return "#eab308";
    }
  }

  createCustomMarkerIcon(item) {
    const color = this.getEpochColor(item.epochKey);
    const isCave = item.caveContext && item.caveContext.isCaveSite;
    const html = `
      <div class="atlas-marker-pin ${isCave ? 'cave-pin' : ''}" style="--marker-color: ${color};" title="${item.name} (${item.site})">
        <div class="marker-dot"></div>
        <div class="marker-pulse"></div>
      </div>
    `;

    return L.divIcon({
      className: "custom-leaflet-marker",
      html: html,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [0, -14]
    });
  }

  renderMarkers() {
    if (!this.map || !this.markersGroup) return;

    this.markersGroup.clearLayers();
    this.allMarkers = [];

    PREHISTORIC_ARTEFACTS_DATA.forEach(item => {
      // Check filters
      if (this.activeFilters.epoch !== "all" && item.epochKey !== this.activeFilters.epoch) {
        return;
      }
      if (this.activeFilters.species !== "all" && item.associatedSpeciesId !== this.activeFilters.species) {
        return;
      }
      if (this.activeFilters.material !== "all" && !item.material.toLowerCase().includes(this.activeFilters.material.toLowerCase())) {
        return;
      }
      // Cave & Rock Art exclusive filter
      if (this.activeFilters.caveOnly) {
        const typo = item.typologicalClassification.toLowerCase();
        const isArtType = typo.includes("art") ||
          typo.includes("petroglyph") ||
          typo.includes("parietal") ||
          typo.includes("engraving") ||
          typo.includes("figurine") ||
          typo.includes("shrine") ||
          typo.includes("sculpture");
        const isCaveSite = item.caveContext && item.caveContext.isCaveSite;
        if (!isCaveSite && !isArtType) return;
      }

      const icon = this.createCustomMarkerIcon(item);
      const marker = L.marker(item.coordinates, { icon: icon });

      const caveBadge = item.caveContext && item.caveContext.isCaveSite 
        ? `<span class="popup-cave-tag">🏛️ ${item.caveContext.caveName}</span>` 
        : '';

      const popupHtml = `
        <div class="atlas-popup-card">
          <div class="popup-header" style="border-left: 4px solid ${this.getEpochColor(item.epochKey)};">
            <span class="popup-epoch">${item.epoch} • ${item.mode}</span>
            ${caveBadge}
            <h4 class="popup-title">${item.name}</h4>
          </div>
          <div class="popup-body">
            <p class="popup-detail"><strong>Site:</strong> ${item.site}, ${item.country}</p>
            <p class="popup-detail"><strong>Age:</strong> ${item.approxAge}</p>
            <p class="popup-detail"><strong>Material:</strong> ${item.material}</p>
            <p class="popup-detail"><strong>Typology:</strong> ${item.typologicalClassification}</p>
          </div>
          <div class="popup-footer">
            <button class="popup-inspect-btn" onclick="window.lithosApp.openArtefactModal('${item.id}')">
              🔍 Inspect Artefact, Photo & Measurements
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { 
        maxWidth: 320, 
        autoPan: true, 
        autoPanPadding: [25, 25], 
        className: "lithos-leaflet-popup" 
      });
      this.markersGroup.addLayer(marker);
      this.allMarkers.push({ id: item.id, marker: marker, data: item });
    });
  }

  filter(filters) {
    this.activeFilters = Object.assign(this.activeFilters, filters);
    if (this.map && this.markersGroup) {
      this.renderMarkers();
    } else {
      this.initSvgFallbackMap();
    }
  }

  toggleCaveFilter() {
    this.activeFilters.caveOnly = !this.activeFilters.caveOnly;
    this.renderMarkers();
    return this.activeFilters.caveOnly;
  }

  flyToCoordinates(coords, zoom = 7) {
    if (this.map) {
      this.map.flyTo(coords, zoom, {
        duration: 1.8,
        easeLinearity: 0.25
      });
    }
  }

  flyToContinent(continentKey) {
    const continentLocations = {
      global: { coords: [25.0, 15.0], zoom: 3 },
      india: { coords: [21.5, 78.5], zoom: 5 },
      southasia: { coords: [21.5, 78.5], zoom: 5 },
      asia: { coords: [34.0, 95.0], zoom: 4 },
      africa: { coords: [2.0, 25.0], zoom: 4 },
      europe: { coords: [49.0, 10.0], zoom: 5 },
      neareast: { coords: [32.5, 38.0], zoom: 6 }
    };

    const target = continentLocations[continentKey] || continentLocations.global;
    this.flyToCoordinates(target.coords, target.zoom);
  }

  initSvgFallbackMap() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    // Filter items
    const filteredItems = PREHISTORIC_ARTEFACTS_DATA.filter(item => {
      if (this.activeFilters.epoch !== "all" && item.epochKey !== this.activeFilters.epoch) return false;
      if (this.activeFilters.species !== "all" && item.associatedSpeciesId !== this.activeFilters.species) return false;
      if (this.activeFilters.material !== "all" && !item.material.toLowerCase().includes(this.activeFilters.material.toLowerCase())) return false;
      return true;
    });

    // Render interactive Equirectangular Vector Canvas
    container.innerHTML = `
      <div class="vector-world-map-wrap">
        <div class="vector-map-header">
          <span>Interactive Vector Archaeological Atlas (Offline Enhanced)</span>
          <span class="site-count-badge">${filteredItems.length} Sites Mapped</span>
        </div>
        <svg viewBox="0 0 1000 500" class="vector-world-svg" id="vector-svg-map">
          <defs>
            <linearGradient id="mapOcean" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#090d16"/>
              <stop offset="100%" stop-color="#0e1726"/>
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect width="1000" height="500" fill="url(#mapOcean)" />
          
          <!-- Latitude & Longitude Gridlines -->
          <g stroke="rgba(255,255,255,0.05)" stroke-width="0.5" stroke-dasharray="2,2">
            <line x1="0" y1="250" x2="1000" y2="250" />
            <line x1="0" y1="125" x2="1000" y2="125" />
            <line x1="0" y1="375" x2="1000" y2="375" />
            <line x1="500" y1="0" x2="500" y2="500" />
            <line x1="250" y1="0" x2="250" y2="500" />
            <line x1="750" y1="0" x2="750" y2="500" />
          </g>

          <!-- Vector Continents Simplified Outlines -->
          <g fill="#1f293d" stroke="#334155" stroke-width="1" class="vector-continents">
            <!-- Europe & Asia -->
            <path d="M480,110 Q520,80 620,85 T800,100 T880,180 T820,250 T750,220 T680,270 T590,260 T510,240 T460,200 T440,140 Z" />
            <!-- Africa -->
            <path d="M470,220 Q540,230 560,280 T530,380 T470,420 T440,360 T430,280 T450,230 Z" />
            <!-- North America -->
            <path d="M120,90 Q220,70 300,110 T320,180 T240,240 T160,210 T100,150 Z" />
            <!-- South America -->
            <path d="M250,260 Q320,280 340,340 T310,430 T250,450 T220,380 T240,300 Z" />
            <!-- Australia -->
            <path d="M780,320 Q840,310 880,340 T870,410 T810,420 T760,370 Z" />
          </g>

          <!-- Site Markers in SVG -->
          <g class="vector-markers-group">
            ${filteredItems.map(item => {
              // Convert lat/long to SVG coordinates: Equirectangular projection
              // x: (-180 to 180) -> (0 to 1000)
              // y: (90 to -90) -> (0 to 500)
              const [lat, lng] = item.coordinates;
              const x = ((lng + 180) / 360) * 1000;
              const y = ((90 - lat) / 180) * 500;
              const color = this.getEpochColor(item.epochKey);

              return `
                <g class="svg-marker-node" transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})" onclick="window.lithosApp.openArtefactModal('${item.id}')" style="cursor: pointer;">
                  <circle r="9" fill="${color}" opacity="0.3" class="svg-pulse" />
                  <circle r="5" fill="${color}" stroke="#ffffff" stroke-width="1.5" />
                  <title>${item.name} (${item.epoch} - ${item.site}, ${item.country})</title>
                </g>
              `;
            }).join("")}
          </g>
        </svg>
      </div>
    `;
  }
}

window.AtlasMapEngine = AtlasMapEngine;
