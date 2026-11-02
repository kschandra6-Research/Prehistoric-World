/**
 * LITHOS - Prehistoric Stone Atlas
 * High-Resolution Photographic & Morphometric Artefact Inspector
 * Deep Prehistoric Caves, Rock Art Context & Exact Measurements Dashboard
 * Concept & Design by K.S.Chandra 2026
 */

class ArtefactInspector {
  constructor(modalContainerId) {
    this.container = document.getElementById(modalContainerId);
    this.currentArtefact = null;
    this.isZoomed = false;
  }

  open(artefactId) {
    const art = PREHISTORIC_ARTEFACTS_DATA.find(a => a.id === artefactId);
    if (!art) return;

    this.currentArtefact = art;
    this.isZoomed = false;
    this.render();
    if (this.container) {
      this.container.classList.remove("hidden");
      this.container.classList.add("modal-active");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
  }

  close() {
    if (this.container) {
      this.container.classList.remove("modal-active");
      this.container.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  }

  togglePhotoZoom() {
    this.isZoomed = !this.isZoomed;
    const img = document.getElementById("inspector-main-photo");
    const zoomBtn = document.getElementById("photo-zoom-toggle-btn");
    if (img) {
      img.classList.toggle("zoomed-view", this.isZoomed);
    }
    if (zoomBtn) {
      zoomBtn.innerText = this.isZoomed ? "🔍 Zoom Out" : "🔎 Zoom In";
    }
  }

  render() {
    if (!this.container || !this.currentArtefact) return;

    const art = this.currentArtefact;
    const species = PREHISTORIC_SPECIES_DATA.find(s => s.id === art.associatedSpeciesId);
    const m = art.morphometrics;
    const cave = art.caveContext || {
      isCaveSite: false,
      caveName: "Open-Air Horizon",
      rockArtContext: "Surface and terrace context.",
      stratumLayer: "Stratified alluvial deposit"
    };

    this.container.innerHTML = `
      <div class="modal-backdrop" onclick="window.lithosApp.inspector.close()"></div>
      <div class="inspector-modal-window">
        
        <!-- Pinned Modal Header -->
        <div class="inspector-header">
          <div class="header-titles">
            <div class="epoch-tag-row">
              <span class="inspector-epoch-badge" style="background-color: ${this.getEpochColor(art.epochKey)}22; border-color: ${this.getEpochColor(art.epochKey)}; color: ${this.getEpochColor(art.epochKey)};">
                ${art.epoch}
              </span>
              <span class="inspector-mode-badge">${art.mode}</span>
              <span class="inspector-age-badge">⏳ ${art.approxAge}</span>
              ${cave.isCaveSite ? `<span class="inspector-cave-badge">🏛️ Cave Sanctuary / Rockshelter</span>` : `<span class="inspector-terrace-badge">🌍 Fluvial / Open Terrace</span>`}
            </div>
            <h2 class="inspector-artefact-title">${art.name}</h2>
            <p class="inspector-location-line">📍 <strong>Locality:</strong> ${art.site}, ${art.region}, ${art.country} &bull; Coordinates: [${art.coordinates.join(", ")}]</p>
          </div>
          <button class="modal-close-icon" onclick="window.lithosApp.inspector.close()" title="Close Inspector">&times;</button>
        </div>

        <!-- Scrollable Modal Body: 2 Columns (Photograph & Measurements + Deep Scientific Dossier) -->
        <div class="inspector-body-grid">
          
          <!-- Left Column: Authentic Museum Photograph & Physical Measurements Dashboard -->
          <div class="visualizer-pane">
            
            <!-- High-Resolution Photograph Display -->
            <div class="photo-showcase-card">
              <div class="photo-frame-wrapper">
                <img 
                  id="inspector-main-photo" 
                  src="${art.localPhotoUrl || art.highResPhotoUrl || ('assets/images/' + art.id + '.svg')}" 
                  alt="${art.name}" 
                  class="museum-primary-photo" 
                  onerror="this.src='assets/images/${art.id}.svg'; this.onerror=null;"
                />
                <button id="photo-zoom-toggle-btn" class="photo-zoom-pill" onclick="window.lithosApp.inspector.togglePhotoZoom()">
                  🔎 Zoom In
                </button>
              </div>
              <div class="photo-meta-strip">
                <span class="photo-curation-text">🏛️ <strong>Curated:</strong> ${art.currentLocation}</span>
              </div>
            </div>

            <!-- Prehistoric Cave, Sanctuary & Rock Art Context Box -->
            <div class="cave-context-card ${cave.isCaveSite ? 'cave-highlight' : ''}">
              <div class="cave-header-line">
                <span class="cave-icon">${cave.isCaveSite ? '🏛️' : '🏞️'}</span>
                <h4>${cave.caveName}</h4>
              </div>
              <p class="cave-stratum-line"><strong>Stratigraphic Horizon:</strong> ${cave.stratumLayer}</p>
              <p class="cave-art-summary"><strong>Parietal Art & Context:</strong> ${cave.rockArtContext}</p>
            </div>

            <!-- Comprehensive Morphometrics & Dimensional Measurements Dashboard -->
            <div class="measurements-dashboard-card">
              <div class="measurements-card-head">
                <h4>📐 Exact Dimensional Measurements & Physical Properties</h4>
                <span class="scale-indicator">Metric Scale: 1:1 Accurate</span>
              </div>

              <!-- Primary Measurements Metric Grid -->
              <div class="primary-metrics-grid">
                <div class="metric-cell">
                  <span class="cell-val">${m.lengthMm} <small>mm</small></span>
                  <span class="cell-label">Max Length</span>
                </div>
                <div class="metric-cell">
                  <span class="cell-val">${m.widthMm} <small>mm</small></span>
                  <span class="cell-label">Max Width</span>
                </div>
                <div class="metric-cell">
                  <span class="cell-val">${m.thicknessMm} <small>mm</small></span>
                  <span class="cell-label">Max Thickness</span>
                </div>
                <div class="metric-cell">
                  <span class="cell-val">${m.weightG > 0 ? (m.weightG >= 1000 ? (m.weightG/1000).toFixed(2) + ' kg' : m.weightG + ' g') : 'N/A'}</span>
                  <span class="cell-label">Total Mass</span>
                </div>
              </div>

              <!-- Secondary Morphometric Ratios & Indices -->
              <div class="secondary-indices-list">
                <div class="index-row">
                  <span class="idx-name">⚡ Cutting Edge Perimeter:</span>
                  <strong class="idx-val">${m.cuttingEdgeCm > 0 ? m.cuttingEdgeCm + ' cm' : 'Non-cutting implement'}</strong>
                </div>
                <div class="index-row">
                  <span class="idx-name">⚙️ Edge-to-Weight Yield:</span>
                  <strong class="idx-val text-emerald">${m.edgeToWeightRatio}</strong>
                </div>
                <div class="index-row">
                  <span class="idx-name">📏 Elongation Index (L/W):</span>
                  <strong class="idx-val">${m.elongationRatio || (m.lengthMm / m.widthMm).toFixed(2)}</strong>
                </div>
                <div class="index-row">
                  <span class="idx-name">📐 Refinement / Flatness Index (Th/W):</span>
                  <strong class="idx-val">${m.refinementRatio || (m.thicknessMm / m.widthMm).toFixed(2)}</strong>
                </div>
                <div class="index-row">
                  <span class="idx-name">💎 Cross-Section Profile:</span>
                  <strong class="idx-val">${m.crossSectionShape || 'Bifacial Lenticular'}</strong>
                </div>
              </div>

              <!-- Metric Reference Bar -->
              <div class="metric-visual-ruler">
                <div class="ruler-ticks">
                  <span>| 0cm</span>
                  <span>| 2cm</span>
                  <span>| 4cm</span>
                  <span>| 6cm</span>
                  <span>| 8cm</span>
                  <span>| 10cm</span>
                </div>
                <div class="ruler-bar"></div>
              </div>
            </div>
          </div>

          <!-- Right Column: Elaborate Scientific Dossier Tabs -->
          <div class="dossier-pane">
            <div class="dossier-tab-bar">
              <button class="d-tab active" onclick="window.lithosApp.inspector.switchDossierTab(this, 'tab-petrology')">🪨 Petrology & Color</button>
              <button class="d-tab" onclick="window.lithosApp.inspector.switchDossierTab(this, 'tab-knapping')">🔨 Knapping & Technique</button>
              <button class="d-tab" onclick="window.lithosApp.inspector.switchDossierTab(this, 'tab-microwear')">🔬 Usage & Traceology</button>
              <button class="d-tab" onclick="window.lithosApp.inspector.switchDossierTab(this, 'tab-cave')">🏛️ Cave & Art Context</button>
              <button class="d-tab" onclick="window.lithosApp.inspector.switchDossierTab(this, 'tab-hominin')">🧬 Human Taxon</button>
              <button class="d-tab" onclick="window.lithosApp.inspector.switchDossierTab(this, 'tab-discovery')">📜 Curation & Dating</button>
            </div>

            <!-- Tab 1: Petrology & Color -->
            <div class="dossier-tab-content" id="tab-petrology">
              <div class="dossier-entry">
                <h4>Color, Hue & Surface Weathering Patina</h4>
                <p>${art.colorDescription}</p>
              </div>
              <div class="dossier-entry">
                <h4>Petrological Raw Material</h4>
                <p class="highlight-lead"><strong>${art.material}</strong></p>
              </div>
              <div class="dossier-entry">
                <h4>Mineralogical & Chemical Constituents</h4>
                <p>${art.constituentComposition}</p>
              </div>
              <div class="dossier-entry">
                <h4>Typological Classification</h4>
                <p class="highlight-quote">${art.typologicalClassification}</p>
              </div>
            </div>

            <!-- Tab 2: Knapping & Technique -->
            <div class="dossier-tab-content hidden" id="tab-knapping">
              <div class="dossier-entry">
                <h4>Operational Sequence (Chaîne Opératoire)</h4>
                <p>${art.knappingTechnique}</p>
              </div>
              <div class="dossier-entry">
                <h4>Technological Mode & Fracture Mechanics</h4>
                <p><strong>${art.mode}</strong></p>
                <p class="dimmed">Fracture physics: Initiated via Hertzian cone propagation at the point of impact; controlled bifacial/unifacial thinning; invasive pressure retouch on margins; microburin technique where applicable.</p>
              </div>
              <div class="dossier-entry">
                <h4>Cutting Edge Efficiency Yield</h4>
                <p><strong>${m.edgeToWeightRatio}</strong> of sharp cutting perimeter produced per kilogram of parent stone core.</p>
              </div>
            </div>

            <!-- Tab 3: Usage & Traceology -->
            <div class="dossier-tab-content hidden" id="tab-microwear">
              <div class="dossier-entry">
                <h4>Traceology & Functional Microwear Analysis</h4>
                <p>${art.usageAndMicrowear}</p>
              </div>
              <div class="dossier-entry">
                <h4>Diagnostic Micro-Wear Traces</h4>
                <ul class="microwear-checklist">
                  <li><strong>Functional Edge Polish:</strong> Diagnostic microscopic polishes indicating contact with bone, fresh meat, tanned hide, dry wood, or silica phytoliths from wild/domesticated cereals.</li>
                  <li><strong>Impact Fractures:</strong> Step-terminations, pseudo-burin spalls, and microscopic scarring confirming percussive use or projectile weapon propulsion.</li>
                  <li><strong>Residue Evidence:</strong> Organic residues confirmed by spectroscopy: birch-bark tar pitch, Dead Sea bitumen mastic, red ochre binders, or blood lipid fractions.</li>
                </ul>
              </div>
            </div>

            <!-- Tab 4: Prehistoric Cave & Art Context -->
            <div class="dossier-tab-content hidden" id="tab-cave">
              <div class="dossier-entry">
                <h4>Prehistoric Cave, Rockshelter & Geological Sanctuary</h4>
                <p class="highlight-lead"><strong>${cave.caveName}</strong></p>
                <p><strong>Stratigraphic Layer:</strong> ${cave.stratumLayer}</p>
              </div>
              <div class="dossier-entry">
                <h4>Parietal Art, Petroglyphs & Mobiliary Symbolism</h4>
                <p>${cave.rockArtContext}</p>
              </div>
              <div class="dossier-entry">
                <h4>Environmental & Speleological Setting</h4>
                <p>The cave or terrace environment provided crucial micro-climatic shelter during extreme glacial oscillations, protecting hearths, pigment processing workstations, bone tool manufacturing debris, and ritual burials from environmental weathering.</p>
              </div>
            </div>

            <!-- Tab 5: Human Taxon -->
            <div class="dossier-tab-content hidden" id="tab-hominin">
              ${species ? `
                <div class="dossier-entry species-spotlight-card">
                  <div class="species-header-row">
                    <div>
                      <h3 class="sp-sci-name">${species.scientificName}</h3>
                      <h4 class="sp-com-name">${species.commonName}</h4>
                    </div>
                    <span class="sp-cranial-pill">${species.cranialCapacity}</span>
                  </div>

                  <!-- Dual Hominin Visual Hero (Diagnostic Fossil Skull & Living Reconstruction) -->
                  <div class="species-visual-hero" style="margin-top: 12px; margin-bottom: 14px;">
                    <div class="species-thumb-box" style="height: 140px;">
                      <img src="${species.skullImageUrl || ('assets/images/species/skull_' + species.id + '.jpg')}" alt="${species.scientificName} Skull" class="species-thumb-img" onerror="this.src='assets/images/species/skull_${species.id}.svg'; this.onerror=null;" />
                      <span class="species-thumb-tag">💀 Diagnostic Cranium</span>
                    </div>
                    <div class="species-thumb-box" style="height: 140px;">
                      <img src="${species.lifeImageUrl || ('assets/images/species/life_' + species.id + '.jpg')}" alt="${species.scientificName} Living Specimen" class="species-thumb-img" onerror="this.src='assets/images/species/life_${species.id}.svg'; this.onerror=null;" />
                      <span class="species-thumb-tag">👤 Living Specimen</span>
                    </div>
                  </div>

                  <p class="sp-desc"><strong>Temporal Lifespan:</strong> ${species.temporalRange}</p>
                  <p class="sp-desc"><strong>Geographical Distribution:</strong> ${species.geographicRange}</p>
                  <p class="sp-desc"><strong>Anatomical Adaptations:</strong> ${species.anatomicalFeatures}</p>
                  <p class="sp-desc"><strong>Cognition & Culture:</strong> ${species.cognitiveAndCultural}</p>
                  <button class="sp-full-profile-btn" onclick="window.lithosApp.openSpeciesModal('${species.id}')">
                    🧬 View Full Hominin Evolutionary Profile
                  </button>
                </div>
              ` : `<p>Associated hominin species currently under taxonomic classification.</p>`}
            </div>

            <!-- Tab 6: Discovery & Curation -->
            <div class="dossier-tab-content hidden" id="tab-discovery">
              <div class="dossier-entry">
                <h4>Archaeological Excavation History</h4>
                <p>${art.discoveryDetails}</p>
              </div>
              <div class="dossier-entry">
                <h4>Geochronological Dating Methodology</h4>
                <p><strong>${art.datingMethod}</strong></p>
              </div>
              <div class="dossier-entry">
                <h4>Current Repository & Accession Record</h4>
                <p>${art.currentLocation}</p>
              </div>
              <div class="dossier-entry">
                <h4>Comparative Analysis</h4>
                <button class="compare-action-btn" onclick="window.lithosApp.sendToComparative('${art.id}')">
                  ⚖️ Send to Side-by-Side Comparative Lab
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pinned Modal Footer -->
        <div class="inspector-footer">
          <span>Concept & Design by K.S.Chandra 2026 &bull; LITHOS Prehistoric Stone Atlas</span>
          <button class="footer-close-btn" onclick="window.lithosApp.inspector.close()">Close Dossier</button>
        </div>
      </div>
    `;
  }

  getEpochColor(epochKey) {
    switch (epochKey) {
      case "lower_paleolithic": return "#d97706";
      case "middle_paleolithic": return "#0284c7";
      case "upper_paleolithic": return "#9333ea";
      case "mesolithic": return "#059669";
      case "neolithic": return "#e11d48";
      default: return "#eab308";
    }
  }

  switchDossierTab(buttonElem, targetTabId) {
    const tabs = this.container.querySelectorAll(".d-tab");
    tabs.forEach(t => t.classList.remove("active"));
    buttonElem.classList.add("active");

    const contents = this.container.querySelectorAll(".dossier-tab-content");
    contents.forEach(c => {
      c.classList.add("hidden");
      if (c.id === targetTabId) {
        c.classList.remove("hidden");
      }
    });
  }
}

window.ArtefactInspector = ArtefactInspector;
