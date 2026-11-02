/**
 * LITHOS - Prehistoric Stone Atlas
 * Master Application Coordinator & State Controller
 * Concept & Design by K.S.Chandra 2026
 */

class LithosApp {
  constructor() {
    this.currentTab = "map";
    this.searchQuery = "";
    this.activeEpochFilter = "all";
    this.activeMaterialFilter = "all";
    this.activeCategoryFilter = "all";
    this.activeRegionFilter = "all";

    // Engines
    this.mapEngine = null;
    this.timelineEngine = null;
    this.chartsEngine = null;
    this.inspector = null;
    this.comparative = null;
    this.excavator = null;
  }

  init() {
    console.log("Initializing LITHOS: Prehistoric Stone Atlas (Concept & Design by K.S.Chandra 2026)...");

    // Initialize modules
    this.inspector = new ArtefactInspector("artefact-inspector-modal");
    this.mapEngine = new AtlasMapEngine("atlas-leaflet-map");
    this.timelineEngine = new TimelineEngine("timeline-canvas-container");
    this.chartsEngine = new ChartsEngine();
    this.comparative = new ComparativeLab("comparative-container");
    this.excavator = new StratigraphicExcavator("excavator-container");

    // Initialize UI components
    this.renderArtefactsGrid();
    this.renderSpeciesGrid();
    this.renderGlossary();
    this.renderCitations();

    // Boot map
    this.mapEngine.init();

    // Event listeners
    this.attachNavListeners();
    this.attachFilterListeners();
    this.attachSearchListener();
    this.attachKeyboardShortcuts();

    // Remove preloader / splash screen
    const preloader = document.getElementById("app-preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => preloader.style.display = "none", 500);
      }, 400);
    }
  }

  switchTab(tabKey) {
    if (this.currentTab === tabKey) return;
    this.currentTab = tabKey;

    if (window.lithosAudio) {
      window.lithosAudio.playKnapSound(600, 0.05);
    }

    // Update nav links
    const navLinks = document.querySelectorAll(".nav-tab-item");
    navLinks.forEach(link => {
      const isTarget = link.getAttribute("data-tab") === tabKey;
      link.classList.toggle("active-nav", isTarget);
    });

    // Update tab sections
    const sections = document.querySelectorAll(".atlas-view-panel");
    sections.forEach(sec => {
      const isTarget = sec.id === `view-${tabKey}`;
      sec.classList.toggle("active-view", isTarget);
    });

    // Sub-module activations on tab show
    if (tabKey === "map" && this.mapEngine && this.mapEngine.map) {
      setTimeout(() => this.mapEngine.map.invalidateSize(), 150);
    } else if (tabKey === "timeline" && this.timelineEngine) {
      this.timelineEngine.init();
    } else if (tabKey === "charts" && this.chartsEngine) {
      setTimeout(() => this.chartsEngine.init(), 100);
    } else if (tabKey === "comparative" && this.comparative) {
      this.comparative.init();
    } else if (tabKey === "excavator" && this.excavator) {
      this.excavator.init();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  attachNavListeners() {
    const navLinks = document.querySelectorAll(".nav-tab-item");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = link.getAttribute("data-tab");
        this.switchTab(tab);
      });
    });

    // Quick jump buttons on home/overview
    const heroButtons = document.querySelectorAll("[data-jump-tab]");
    heroButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-jump-tab");
        this.switchTab(target);
      });
    });
  }

  attachFilterListeners() {
    // Epoch filter buttons
    const epochBtns = document.querySelectorAll(".epoch-filter-btn");
    epochBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        epochBtns.forEach(b => b.classList.remove("active-filter"));
        btn.classList.add("active-filter");
        this.activeEpochFilter = btn.getAttribute("data-epoch");
        this.applyFilters();
      });
    });

    // Material filter dropdown
    const matSelect = document.getElementById("material-filter-select");
    if (matSelect) {
      matSelect.addEventListener("change", (e) => {
        this.activeMaterialFilter = e.target.value;
        this.applyFilters();
      });
    }

    // Continent jump buttons for map
    const contBtns = document.querySelectorAll(".continent-jump-btn");
    contBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        contBtns.forEach(b => b.classList.remove("active-cont"));
        btn.classList.add("active-cont");
        const cont = btn.getAttribute("data-continent");
        if (this.mapEngine) {
          this.mapEngine.flyToContinent(cont);
        }
      });
    });

    // Map Cave & Rock Art toggle button
    const mapCaveToggle = document.getElementById("map-cave-filter-toggle");
    if (mapCaveToggle) {
      mapCaveToggle.addEventListener("click", () => {
        if (this.mapEngine) {
          const isActive = this.mapEngine.toggleCaveFilter();
          mapCaveToggle.classList.toggle("active-cave-toggle", isActive);
        }
      });
    }

    // Category pills for artefacts catalog (All / Caves & Rock Art / Tools)
    const catBtns = document.querySelectorAll(".cat-filter-btn");
    catBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        catBtns.forEach(b => b.classList.remove("active-cat"));
        btn.classList.add("active-cat");
        this.activeCategoryFilter = btn.getAttribute("data-category");
        this.renderArtefactsGrid();
      });
    });

    // Region pills for artefacts catalog
    const regBtns = document.querySelectorAll(".region-filter-btn");
    regBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        regBtns.forEach(b => b.classList.remove("active-region"));
        btn.classList.add("active-region");
        this.activeRegionFilter = btn.getAttribute("data-region");
        this.renderArtefactsGrid();
      });
    });
  }

  attachSearchListener() {
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.applyFilters();
      });
    }
  }

  attachKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.inspector) this.inspector.close();
        this.closeSpeciesModal();
      }
    });
  }

  applyFilters() {
    // Filter map
    if (this.mapEngine) {
      this.mapEngine.filter({
        epoch: this.activeEpochFilter,
        material: this.activeMaterialFilter
      });
    }

    // Re-render artefacts grid
    this.renderArtefactsGrid();
  }

  getFilteredArtefacts() {
    return PREHISTORIC_ARTEFACTS_DATA.filter(art => {
      // Epoch filter
      if (this.activeEpochFilter !== "all" && art.epochKey !== this.activeEpochFilter) {
        return false;
      }
      // Material filter
      if (this.activeMaterialFilter !== "all" && !art.material.toLowerCase().includes(this.activeMaterialFilter.toLowerCase())) {
        return false;
      }
      // Category filter (All / Caves & Rock Art / Tools)
      if (this.activeCategoryFilter === "caves") {
        const typo = art.typologicalClassification.toLowerCase();
        const isArtType = typo.includes("art") ||
          typo.includes("petroglyph") ||
          typo.includes("parietal") ||
          typo.includes("engraving") ||
          typo.includes("figurine") ||
          typo.includes("shrine") ||
          typo.includes("sculpture");
        const isCaveSite = art.caveContext && art.caveContext.isCaveSite;
        if (!isCaveSite && !isArtType) return false;
      } else if (this.activeCategoryFilter === "tools") {
        const typo = art.typologicalClassification.toLowerCase();
        const isArtOnly = typo.includes("parietal") ||
          typo.includes("figurine") ||
          typo.includes("sculpture") ||
          typo.includes("shrine");
        if (isArtOnly) return false;
      }
      // Region filter
      if (this.activeRegionFilter === "asia_india") {
        const asianCountries = ["India", "Pakistan", "China", "Indonesia", "Sri Lanka"];
        if (!asianCountries.includes(art.country)) return false;
      } else if (this.activeRegionFilter === "africa") {
        const africanCountries = ["Kenya", "Tanzania", "South Africa"];
        if (!africanCountries.includes(art.country)) return false;
      } else if (this.activeRegionFilter === "europe") {
        const europeanCountries = ["France", "Austria", "United Kingdom", "Russia"];
        if (!europeanCountries.includes(art.country)) return false;
      } else if (this.activeRegionFilter === "neareast") {
        const neareastCountries = ["Israel", "Turkey"];
        if (!neareastCountries.includes(art.country)) return false;
      }
      // Search query
      if (this.searchQuery) {
        const query = this.searchQuery;
        const matchesName = art.name.toLowerCase().includes(query);
        const matchesSite = art.site.toLowerCase().includes(query);
        const matchesCountry = art.country.toLowerCase().includes(query);
        const matchesMaterial = art.material.toLowerCase().includes(query);
        const matchesEpoch = art.epoch.toLowerCase().includes(query);
        const matchesTypology = art.typologicalClassification.toLowerCase().includes(query);
        const matchesCave = art.caveContext && (
          art.caveContext.caveName.toLowerCase().includes(query) ||
          art.caveContext.rockArtContext.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesSite && !matchesCountry && !matchesMaterial && !matchesEpoch && !matchesTypology && !matchesCave) {
          return false;
        }
      }
      return true;
    });
  }

  renderArtefactsGrid() {
    const container = document.getElementById("artefacts-cards-container");
    if (!container) return;

    const items = this.getFilteredArtefacts();
    const countBadge = document.getElementById("filtered-results-count");
    if (countBadge) {
      countBadge.innerText = `${items.length} of ${PREHISTORIC_ARTEFACTS_DATA.length} Artefacts Catalogued`;
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state-notice">
          <p class="empty-title">🔍 No prehistoric implements matched the filter criteria.</p>
          <p class="empty-sub">Try selecting 'All Specimens & Art' or clear your search term.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(art => {
      const pal = art.svgPalette || { accent: "#d97706" };
      const species = PREHISTORIC_SPECIES_DATA.find(s => s.id === art.associatedSpeciesId);
      const m = art.morphometrics;
      const isCave = art.caveContext && art.caveContext.isCaveSite;
      const imgSrc = art.localPhotoUrl || art.highResPhotoUrl || (`assets/images/${art.id}.svg`);

      return `
        <div class="artefact-card-item" onclick="window.lithosApp.openArtefactModal('${art.id}')">
          <div class="card-visual-top">
            <img src="${imgSrc}" alt="${art.name}" class="card-photo-img" loading="lazy" onerror="this.src='assets/images/${art.id}.svg'; this.onerror=null;" />
            <div class="card-visual-badge-strip">
              <span class="card-epoch-pill" style="background-color: ${pal.accent}cc;">
                ${art.epoch}
              </span>
              <span class="card-mode-pill">${art.mode}</span>
              ${isCave ? `<span class="card-cave-badge-overlay" title="Cave Shelter Sanctuary">🏛️ Cave Shelter</span>` : ""}
            </div>
          </div>

          <div class="card-content-body">
            <span class="card-age-tag">⏳ ${art.approxAge}</span>
            <h3 class="card-name">${art.name}</h3>
            <p class="card-locality">📍 ${art.site}, ${art.country}</p>
            ${isCave ? `<p class="card-cave-name">🏛️ <em>${art.caveContext.caveName}</em></p>` : ""}
            <p class="card-material">🪨 <strong>${art.material}</strong></p>
            <p class="card-brief-use">${art.typologicalClassification}</p>

            <div class="card-specs-footer">
              <span class="card-spec-item" title="Length × Width × Thickness">📐 ${m.lengthMm}×${m.widthMm}×${m.thicknessMm} mm</span>
              <span class="card-spec-item" title="Cutting Edge Yield">⚡ ${m.edgeToWeightRatio}</span>
              ${species ? `<span class="card-species-tag" title="Associated Human Taxon">🧬 ${species.commonName}</span>` : ""}
            </div>
          </div>
          <div class="card-hover-banner">
            <span>Click to Inspect High-Res Photo, Measurements & Cave Context &rarr;</span>
          </div>
        </div>
      `;
    }).join("");
  }

  renderSpeciesGrid() {
    const container = document.getElementById("species-cards-container");
    if (!container) return;

    container.innerHTML = PREHISTORIC_SPECIES_DATA.map(sp => {
      const cranialTags = (sp.cranialLandmarks || []).map(t => `<span class="cranial-tag">⚡ ${t}</span>`).join("");
      const skullSrc = sp.skullImageUrl || `assets/images/species/skull_${sp.id}.jpg`;
      const lifeSrc = sp.lifeImageUrl || `assets/images/species/life_${sp.id}.jpg`;

      return `
        <div class="species-card-dossier" style="border-top: 4px solid ${sp.colorTheme};">
          <div class="species-card-head">
            <div class="species-title-group">
              <h3 class="species-sci-name">${sp.scientificName}</h3>
              <h4 class="species-com-name">${sp.commonName}</h4>
            </div>
            <div class="cranial-capacity-gauge" title="Cranial Capacity">
              <span class="gauge-val">${sp.cranialMean} cc</span>
              <span class="gauge-label">Brain Size</span>
            </div>
          </div>

          <!-- Dual Hominin Visual Hero (Diagnostic Fossil Skull & Living Reconstruction) -->
          <div class="species-visual-hero">
            <div class="species-thumb-box" title="Diagnostic Cranial / Skeletal Remains">
              <img src="${skullSrc}" alt="${sp.scientificName} Skull Remains" class="species-thumb-img" loading="lazy" onerror="this.src='assets/images/species/skull_${sp.id}.svg'; this.onerror=null;" />
              <span class="species-thumb-tag">💀 ${sp.holotypeSpecimen ? sp.holotypeSpecimen.split(';')[0].substring(0, 24) : 'Diagnostic Skull'}</span>
            </div>
            <div class="species-thumb-box" title="Paleoanthropological Living Specimen Reconstruction">
              <img src="${lifeSrc}" alt="${sp.scientificName} Living Specimen" class="species-thumb-img" loading="lazy" onerror="this.src='assets/images/species/life_${sp.id}.svg'; this.onerror=null;" />
              <span class="species-thumb-tag">👤 Living Specimen</span>
            </div>
          </div>

          <div class="species-info-body">
            <div class="cranial-tags-strip" title="Key Cranial & Anatomical Landmarks">
              ${cranialTags}
            </div>

            <p class="sp-field"><strong>⏳ Temporal Lifespan:</strong> ${sp.temporalRange}</p>
            <p class="sp-field"><strong>🌍 Geographic Range:</strong> ${sp.geographicRange}</p>
            <p class="sp-field"><strong>📏 Stature & Weight:</strong> ${sp.statureAndWeight}</p>
            <p class="sp-field"><strong>🪨 Tool Traditions:</strong> ${sp.toolTraditions.join("; ")}</p>
            
            <div class="sp-deep-text">
              <h5>Anatomical Specializations:</h5>
              <p>${sp.anatomicalFeatures}</p>
            </div>

            <div class="sp-deep-text">
              <h5>Cognitive & Cultural Milestones:</h5>
              <p>${sp.cognitiveAndCultural}</p>
            </div>

            <div class="sp-deep-text">
              <h5>Dietary Adaptations:</h5>
              <p>${sp.dietaryPattern}</p>
            </div>
          </div>

          <div class="species-footer-action">
            <span class="fossils-line">🏛️ Key Sites: ${sp.keyFossilSites}</span>
            <button class="sp-modal-btn" onclick="window.lithosApp.openSpeciesModal('${sp.id}')">
              Explore Taxon Dossier &rarr;
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  renderGlossary() {
    const container = document.getElementById("glossary-terms-container");
    const modesContainer = document.getElementById("modes-guide-container");
    const conchoidalContainer = document.getElementById("conchoidal-mechanics-container");

    if (modesContainer) {
      modesContainer.innerHTML = LITHIC_MODES_GUIDE.map(m => `
        <div class="mode-guide-card">
          <div class="mode-card-header">
            <span class="mode-badge-tag">${m.mode}</span>
            <h4>${m.name}</h4>
          </div>
          <p class="mode-temporal">⏳ ${m.temporalRange}</p>
          <p class="mode-desc">${m.characteristics}</p>
          <p class="mode-species">🧬 <strong>Hominin Toolmakers:</strong> ${m.keyHominins}</p>
          <p class="mode-innovations">💡 <strong>Key Innovations:</strong> ${m.keyInnovations}</p>
          <div class="mode-efficiency-pill">${m.efficiency}</div>
        </div>
      `).join("");
    }

    if (conchoidalContainer) {
      conchoidalContainer.innerHTML = CONCHOIDAL_FRACTURE_PARTS.map(part => `
        <div class="conchoidal-part-card">
          <h4>${part.term}</h4>
          <p class="part-def">${part.definition}</p>
          <p class="part-significance"><strong>Significance:</strong> ${part.significance}</p>
        </div>
      `).join("");
    }

    if (container) {
      container.innerHTML = PREHISTORIC_GLOSSARY.map(item => `
        <div class="glossary-item-card">
          <div class="glossary-term-header">
            <h4 class="g-term">${item.term}</h4>
            <span class="g-pronunciation">${item.pronunciation}</span>
          </div>
          <span class="g-etymology">Etymology: ${item.etymology}</span>
          <p class="g-definition">${item.definition}</p>
        </div>
      `).join("");
    }
  }

  renderCitations() {
    const container = document.getElementById("citations-content-container");
    if (!container) return;

    container.innerHTML = `
      <div class="citations-wrapper">
        <div class="dedication-banner">
          <h2>Concept & Design by K.S.Chandra 2026</h2>
          <p class="dedication-sub">Dedicated to the global heritage of prehistoric human craftsmanship, lithic technology, parietal rock art, and human evolutionary origins.</p>
        </div>

        <div class="citations-grid">
          <div class="citation-block">
            <h3>🏛️ Major Museum Collections & Archaeological Surveys Acknowledged</h3>
            <ul class="citation-list">
              <li><strong>Archaeological Survey of India (ASI):</strong> Central Antiquity Collection, New Delhi; site repositories at Bhimbetka Rock Shelters (UNESCO), Burzahom, Edakkal Cave, and Baghor I.</li>
              <li><strong>Sharma Centre for Heritage Education, Chennai:</strong> Research archives for Attirampakkam Acheulean (1.51 Ma) and Middle Paleolithic (385 ka) laminar traditions.</li>
              <li><strong>Indira Gandhi Rashtriya Manav Sangrahalaya (IGRMS), Bhopal:</strong> Prehistoric rock shelter documentation, Bhimbetka rock art replicas, and ethno-archaeology.</li>
              <li><strong>Geological Survey of India (GSI), Kolkata:</strong> Custodians of the Narmada Valley Hathnora archaic hominin calvarium.</li>
              <li><strong>The British Museum, London:</strong> Department of Britain, Europe and Prehistory (Boxgrove Handaxe, Olduvai Chopper, Star Carr Frontlet, Jericho Skull, Alpine Jadeite).</li>
              <li><strong>Musée d'Archéologie Nationale (MAN), Saint-Germain-en-Laye:</strong> Paleolithic Collections (Saint-Acheul Biface, Volgu Solutrean Laurel Leaf, Mas d'Azil Atlatl).</li>
              <li><strong>Institute of Vertebrate Paleontology and Paleoanthropology (IVPP), Beijing:</strong> Zhoukoudian Peking Man quartz industry and Baishiya Denisovan fossil archives.</li>
              <li><strong>Griffith University & Indonesian National Research and Innovation Agency (BRIN):</strong> South Sulawesi Karst Cave research (Leang Tedongnge 45.5 ka parietal art).</li>
              <li><strong>Max Planck Institute for Evolutionary Anthropology, Leipzig:</strong> Denisova Cave stratigraphy, archaic hominin proteomics, and paleogenomic sequencing archives.</li>
              <li><strong>Smithsonian Institution Human Origins Program, Washington D.C.:</strong> African Acheulean and Oldowan research archives; Hall of Human Origins.</li>
              <li><strong>National Museums of Kenya, Nairobi:</strong> West Turkana Lomekwi Archaeological Project and Olorgesailie Research Project.</li>
              <li><strong>Naturhistorisches Museum Wien (NHM), Vienna:</strong> Department of Prehistory (Venus of Willendorf).</li>
              <li><strong>Israel Museum & Israel Antiquities Authority (IAA), Jerusalem:</strong> Prehistoric Department (Kebara Cave, Ain Mallaha Natufian sickles).</li>
              <li><strong>Museum of Anatolian Civilizations, Ankara:</strong> Neolithic Collections (Çatalhöyük, Göbekli Tepe megalithic pillars).</li>
            </ul>
          </div>

          <div class="citation-block">
            <h3>📚 Foundational Archaeological Literature, Fieldwork & Typologies</h3>
            <ul class="citation-list">
              <li><strong>Pappu, S., Gunnell, Y., et al. (2011):</strong> "Early Pleistocene Presence of Acheulian Hominins in South India." <em>Science</em>, 331(6024), 1596–1599. (Attirampakkam 1.51 Ma).</li>
              <li><strong>Kumar, A., Pappu, S., et al. (2018):</strong> "Early Middle Palaeolithic culture in South Asia." <em>Nature</em>, 554, 97–101. (Attirampakkam 385 ka Levallois transition).</li>
              <li><strong>Kenoyer, J. M., Clark, J. D., Pal, J. N., & Sharma, G. R. (1983):</strong> "An Upper Palaeolithic shrine in India?" <em>Antiquity</em>, 57(220), 88–94. (Baghor I stone shrine).</li>
              <li><strong>Chen, F., Welker, F., Shen, C.-C., et al. (2019):</strong> "A late Middle Pleistocene Denisovan mandible from the Tibetan Plateau." <em>Nature</em>, 569, 409–412. (Baishiya Karst Cave).</li>
              <li><strong>Brumm, A., Oktaviana, A. A., et al. (2021):</strong> "Oldest cave art found in Sulawesi." <em>Science Advances</em>, 7(3), eabd4648. (Leang Tedongnge 45.5 ka warty pig).</li>
              <li><strong>Clark, J. Grahame (1969):</strong> <em>World Prehistory: A New Outline</em>. Cambridge University Press (The 5 Technological Modes framework).</li>
              <li><strong>Bordes, François (1961):</strong> <em>Typologie du Paléolithique ancien et moyen</em>. Publications de l'Institut de Préhistoire de Bordeaux.</li>
              <li><strong>Harmand, S., Lewis, J. E., et al. (2015):</strong> "3.3-million-year-old stone tools from Lomekwi 3, West Turkana, Kenya." <em>Nature</em>, 521, 310–315.</li>
              <li><strong>Hublin, J.-J., Ben-Ncer, A., et al. (2017):</strong> "New fossils from Jebel Irhoud, Morocco and the pan-African origin of Homo sapiens." <em>Nature</em>, 546, 289–292.</li>
              <li><strong>Schmidt, Klaus (2012):</strong> <em>A Stone Age Sanctuary in South-Eastern Anatolia: Göbekli Tepe</em>. ArchaeNova.</li>
              <li><strong>Jarrige, J.-F. (1984):</strong> "Chronology of the earlier periods of the Greater Indus as seen from Mehrgarh, Pakistan." <em>South Asian Archaeology</em>.</li>
            </ul>
          </div>
        </div>

        <div class="software-credits-block">
          <h3>💻 Cross-Platform Architectural & Software Tools</h3>
          <p>Built with modern web standards: HTML5, CSS3 Glassmorphism, ES6+ Modular JavaScript, Leaflet Open Geographic Mapping with Esri Topographic Relief, Chart.js Archaeometrics, and Web Audio API procedural acoustics. Engineered for zero-dependency standalone execution and universal web deployment.</p>
        </div>
      </div>
    `;
  }

  openArtefactModal(artefactId) {
    if (this.inspector) {
      if (window.lithosAudio) {
        window.lithosAudio.playKnapSound(1000, 0.08);
      }
      this.inspector.open(artefactId);
    }
  }

  sendToComparative(artefactId) {
    if (this.inspector) this.inspector.close();
    this.switchTab("comparative");
    if (this.comparative) {
      this.comparative.setArtefacts(artefactId, null);
    }
  }

  openSpeciesModal(speciesId) {
    const sp = PREHISTORIC_SPECIES_DATA.find(s => s.id === speciesId);
    if (!sp) return;

    const modal = document.getElementById("species-detail-modal");
    if (!modal) return;

    if (window.lithosAudio) {
      window.lithosAudio.playSubtleChime();
    }

    const skullSrc = sp.skullImageUrl || `assets/images/species/skull_${sp.id}.jpg`;
    const lifeSrc = sp.lifeImageUrl || `assets/images/species/life_${sp.id}.jpg`;
    const cranialTags = (sp.cranialLandmarks || []).map(t => `<span class="cranial-tag">⚡ ${t}</span>`).join("");

    modal.innerHTML = `
      <div class="modal-backdrop" onclick="window.lithosApp.closeSpeciesModal()"></div>
      <div class="species-modal-window">
        <button class="modal-close-icon" onclick="window.lithosApp.closeSpeciesModal()">&times;</button>
        
        <div class="sp-modal-head" style="border-left: 6px solid ${sp.colorTheme};">
          <span class="sp-epoch-tag">${sp.epoch}</span>
          <h2>${sp.scientificName}</h2>
          <h3>${sp.commonName}</h3>
        </div>

        <div class="sp-modal-body">
          <!-- Visual Exhibition Showcase: Skull Remains & Living Reconstruction -->
          <div class="sp-modal-visual-showcase">
            <div class="sp-exhibit-card">
              <div class="sp-exhibit-frame">
                <img 
                  src="${skullSrc}" 
                  alt="${sp.scientificName} Skull Remains" 
                  class="sp-exhibit-img"
                  onerror="this.src='assets/images/species/skull_${sp.id}.svg'; this.onerror=null;" 
                />
              </div>
              <div class="sp-exhibit-caption">
                <span><strong>💀 Cranial Holotype:</strong> ${sp.holotypeSpecimen || 'Diagnostic Skull / Fossil Remains'}</span>
                <span>${sp.cranialCapacity}</span>
              </div>
            </div>

            <div class="sp-exhibit-card">
              <div class="sp-exhibit-frame">
                <img 
                  src="${lifeSrc}" 
                  alt="${sp.scientificName} Living Specimen" 
                  class="sp-exhibit-img"
                  onerror="this.src='assets/images/species/life_${sp.id}.svg'; this.onerror=null;" 
                />
              </div>
              <div class="sp-exhibit-caption">
                <span><strong>👤 Living Appearance:</strong> Paleoanthropological Facial Reconstruction</span>
                <span>${sp.temporalRange}</span>
              </div>
            </div>
          </div>

          <div class="sp-stat-grid">
            <div class="sp-stat-box">
              <span class="s-val">${sp.temporalRange}</span>
              <span class="s-lab">Chronological Range</span>
            </div>
            <div class="sp-stat-box highlight-box">
              <span class="s-val">${sp.cranialCapacity}</span>
              <span class="s-lab">Cranial Capacity</span>
            </div>
            <div class="sp-stat-box">
              <span class="s-val">${sp.statureAndWeight}</span>
              <span class="s-lab">Stature & Physique</span>
            </div>
            <div class="sp-stat-box">
              <span class="s-val">${sp.associatedStoneAge}</span>
              <span class="s-lab">Technological Horizon</span>
            </div>
          </div>

          <div class="sp-section-box">
            <h4>🦴 Cranial & Skeletal Architecture (${sp.cranialMean} cc average)</h4>
            <div class="cranial-tags-strip" style="margin-bottom: 12px;">
              ${cranialTags}
            </div>
            <p><strong>Holotype & Specimen Reference:</strong> ${sp.holotypeSpecimen || 'Diagnostic cranial fossil series'}</p>
            <p>${sp.anatomicalFeatures}</p>
          </div>

          <div class="sp-section-box">
            <h4>🌍 Geographical Range & Key Fossil Localities</h4>
            <p><strong>Distribution:</strong> ${sp.geographicRange}</p>
            <p><strong>Holotype & Famous Specimens:</strong> ${sp.keyFossilSites}</p>
          </div>

          <div class="sp-section-box">
            <h4>🪨 Associated Lithic & Artefactual Traditions</h4>
            <ul class="sp-bullets">
              ${sp.toolTraditions.map(t => `<li>${t}</li>`).join("")}
            </ul>
          </div>

          <div class="sp-section-box">
            <h4>🧠 Cognition, Speech & Symbolic Culture</h4>
            <p>${sp.cognitiveAndCultural}</p>
          </div>

          <div class="sp-section-box">
            <h4>🥩 Subsistence, Diet & Trophic Level</h4>
            <p>${sp.dietaryPattern}</p>
          </div>

          <div class="sp-section-box">
            <h4>🌳 Phylogenetic Evolutionary Context</h4>
            <p>${sp.phylogeneticStatus}</p>
          </div>
        </div>

        <div class="sp-modal-footer">
          <span>Concept & Design by K.S.Chandra 2026 &bull; LITHOS Human Evolutionary Atlas</span>
          <button class="footer-close-btn" onclick="window.lithosApp.closeSpeciesModal()">Close Profile</button>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("modal-active");
    document.body.style.overflow = "hidden";
  }

  closeSpeciesModal() {
    const modal = document.getElementById("species-detail-modal");
    if (modal) {
      modal.classList.remove("modal-active");
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  }
}

window.LithosApp = LithosApp;
document.addEventListener("DOMContentLoaded", () => {
  window.lithosApp = new LithosApp();
  window.lithosApp.init();
});
