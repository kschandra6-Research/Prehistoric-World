/**
 * LITHOS - Prehistoric Stone Atlas
 * Chronological Deep-Time Scale, Glacial Cycles & Hominin Coexistence Engine
 * Concept & Design by K.S.Chandra 2026
 */

class TimelineEngine {
  constructor(containerId) {
    this.containerId = containerId;
    this.currentAgeBP = 300000; // Default center ~300 ka (Levallois revolution)
    this.isPlaying = false;
    this.playbackInterval = null;
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  getEpochColor(epochKey) {
    switch (epochKey) {
      case "lower_paleolithic": return "#d97706";
      case "middle_paleolithic": return "#0284c7";
      case "upper_paleolithic": return "#9333ea";
      case "mesolithic": return "#059669";
      case "neolithic": return "#e11d48";
      default: return "#f59e0b";
    }
  }

  getClimaticEpoch(ageBP) {
    if (ageBP >= 2580000) {
      return {
        epoch: "Late Pliocene Warm Period",
        glaciation: "Pre-Quaternary Glaciation",
        climate: "Warmer, wetter global climate; expansion of African savannahs.",
        color: "#ca8a04"
      };
    } else if (ageBP >= 900000) {
      return {
        epoch: "Early Pleistocene (Calabrian)",
        glaciation: "41,000-year Milankovitch glacial cyclicity (Biber / Günz)",
        climate: "Progressive cooling, megafaunal diversification.",
        color: "#b45309"
      };
    } else if (ageBP >= 400000) {
      return {
        epoch: "Middle Pleistocene (Chibanian)",
        glaciation: "100,000-year High-Amplitude Glacial Cycles (Mindel / MIS 12–11)",
        climate: "Extreme glacial-interglacial oscillations, massive ice sheets across northern Europe.",
        color: "#d97706"
      };
    } else if (ageBP >= 130000) {
      return {
        epoch: "Late Middle Pleistocene (MIS 6 - Riss Glaciation)",
        glaciation: "Riss / Saalian Glacial Maximum",
        climate: "Arid, bitterly cold tundra-steppe across Eurasia; megafauna thriving.",
        color: "#0284c7"
      };
    } else if (ageBP >= 115000) {
      return {
        epoch: "Eemian Interglacial (MIS 5e)",
        glaciation: "Last Interglacial Warm Optimum",
        climate: "Global temperatures ~1-2°C warmer than today, hippopotamuses in the River Thames.",
        color: "#10b981"
      };
    } else if (ageBP >= 20000) {
      return {
        epoch: "Late Pleistocene (Würm / Weichselian Glacial)",
        glaciation: "Last Glacial Period (MIS 4 - MIS 2)",
        climate: "Harsh glacial climate; mammoth steppe biome from Britain to Siberia.",
        color: "#6366f1"
      };
    } else if (ageBP >= 11700) {
      return {
        epoch: "Last Glacial Maximum (LGM) to Younger Dryas",
        glaciation: "Terminal Pleistocene deglaciation & Younger Dryas cold snap",
        climate: "Sea levels 120 meters lower than today; land bridges exposed (Beringia, Sundaland, Doggerland).",
        color: "#8b5cf6"
      };
    } else {
      return {
        epoch: "Holocene Epoch (Interglacial)",
        glaciation: "Post-Glacial Thermal Maximum",
        climate: "Temperate stabilization, reforestation, retreat of glaciers, human agricultural boom.",
        color: "#059669"
      };
    }
  }

  getActiveSpeciesAtAge(ageBP) {
    const ageMa = ageBP / 1000000;
    return PREHISTORIC_SPECIES_DATA.filter(sp => {
      return ageMa <= sp.temporalStartMa && ageMa >= sp.temporalEndMa;
    });
  }

  getArtefactsNearAge(ageBP, toleranceRatio = 0.5) {
    return PREHISTORIC_ARTEFACTS_DATA.filter(art => {
      const diff = Math.abs(art.ageBP - ageBP);
      const tolerance = Math.max(ageBP * toleranceRatio, 15000);
      return diff <= tolerance;
    });
  }

  formatAgeDisplay(ageBP) {
    if (ageBP >= 1000000) {
      return `${(ageBP / 1000000).toFixed(2)} Million Years Ago`;
    } else if (ageBP >= 10000) {
      return `${(ageBP / 1000).toLocaleString()} Years BP`;
    } else {
      const bce = Math.max(ageBP - 2000, 0);
      return `${ageBP.toLocaleString()} BP (~${bce.toLocaleString()} BCE)`;
    }
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const climate = this.getClimaticEpoch(this.currentAgeBP);
    const activeSpecies = this.getActiveSpeciesAtAge(this.currentAgeBP);
    const nearbyArtefacts = this.getArtefactsNearAge(this.currentAgeBP);

    container.innerHTML = `
      <div class="timeline-module-wrapper">
        <!-- Control Header -->
        <div class="timeline-header-panel">
          <div class="timeline-badge-group">
            <span class="timeline-age-badge" id="scrubber-age-display">
              ⏳ ${this.formatAgeDisplay(this.currentAgeBP)}
            </span>
            <span class="timeline-climate-badge" style="background-color: ${climate.color}22; border-color: ${climate.color}; color: ${climate.color};">
              ❄️ ${climate.epoch}
            </span>
          </div>
          <div class="timeline-playback-actions">
            <button class="playback-btn" id="timeline-play-btn" title="Auto-advance through deep time">
              ▶ Auto Tour
            </button>
            <button class="jump-era-btn" data-age="3300000">3.3 Ma (Lomekwi)</button>
            <button class="jump-era-btn" data-age="1800000">1.8 Ma (Oldowan)</button>
            <button class="jump-era-btn" data-age="450000">450 ka (Acheulean)</button>
            <button class="jump-era-btn" data-age="60000">60 ka (Mousterian)</button>
            <button class="jump-era-btn" data-age="30000">30 ka (Upper Paleo)</button>
            <button class="jump-era-btn" data-age="10000">10 ka (Mesolithic)</button>
            <button class="jump-era-btn" data-age="5000">5 ka (Neolithic)</button>
          </div>
        </div>

        <!-- Non-linear Scrub Slider -->
        <div class="timeline-slider-zone">
          <input 
            type="range" 
            id="deep-time-slider" 
            min="0" 
            max="1000" 
            value="${this.ageToSliderVal(this.currentAgeBP)}" 
            class="deep-time-range-input"
          />
          <div class="slider-era-markers">
            <span style="left: 0%;">3.5 Ma<br><small>Lower Paleo</small></span>
            <span style="left: 28%;">1.5 Ma<br><small>Acheulean</small></span>
            <span style="left: 55%;">300 ka<br><small>Levallois</small></span>
            <span style="left: 75%;">50 ka<br><small>Upper Paleo</small></span>
            <span style="left: 88%;">12 ka<br><small>Mesolithic</small></span>
            <span style="left: 98%;">2 ka BCE<br><small>Neolithic</small></span>
          </div>
        </div>

        <!-- Hominin Lifespans Gantt Section -->
        <div class="hominin-lifespans-section">
          <h4 class="section-micro-title">Hominin Species Longevity Across Prehistory</h4>
          <div class="gantt-container">
            ${PREHISTORIC_SPECIES_DATA.map(sp => {
              const startVal = this.ageToSliderVal(sp.temporalStartMa * 1000000);
              const endVal = this.ageToSliderVal(sp.temporalEndMa * 1000000);
              const leftPct = Math.min(startVal, endVal) / 10;
              const widthPct = Math.max(Math.abs(endVal - startVal) / 10, 1.5);
              const isActive = activeSpecies.some(s => s.id === sp.id);

              return `
                <div class="gantt-row ${isActive ? "active-species-row" : ""}">
                  <span class="gantt-species-name" onclick="window.lithosApp.openSpeciesModal('${sp.id}')">
                    ${sp.scientificName.split(" ")[0]} <em>${sp.scientificName.split(" ")[1] || ""}</em>
                  </span>
                  <div class="gantt-bar-track">
                    <div 
                      class="gantt-bar ${isActive ? "gantt-bar-lit" : ""}" 
                      style="left: ${leftPct}%; width: ${widthPct}%; background-color: ${sp.colorTheme};"
                      title="${sp.scientificName} (${sp.temporalRange})"
                      onclick="window.lithosApp.openSpeciesModal('${sp.id}')"
                    >
                      <span class="gantt-bar-label">${sp.commonName}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
            <!-- Current Time Scrubber Needle -->
            <div class="gantt-time-needle" style="left: ${this.ageToSliderVal(this.currentAgeBP) / 10}%;"></div>
          </div>
        </div>

        <!-- Active Horizon Intelligence Dashboard -->
        <div class="timeline-horizon-dashboard">
          <div class="horizon-card climate-card">
            <h5>🌍 Paleoclimate & Glaciation</h5>
            <p class="horizon-climate-name">${climate.glaciation}</p>
            <p class="horizon-climate-desc">${climate.climate}</p>
          </div>

          <div class="horizon-card species-card">
            <h5>🧬 Active Coexisting Hominins (${activeSpecies.length})</h5>
            <div class="active-species-chips">
              ${activeSpecies.length > 0 ? activeSpecies.map(sp => `
                <button class="species-chip" style="border-color: ${sp.colorTheme};" onclick="window.lithosApp.openSpeciesModal('${sp.id}')">
                  ${sp.scientificName} (${sp.cranialMean} cc)
                </button>
              `).join("") : `<span class="dimmed">No hominins in this specific boundary</span>`}
            </div>
          </div>

          <div class="horizon-card artefacts-card">
            <h5>🪨 Concurrent Artefacts & Implements (${nearbyArtefacts.length})</h5>
            <div class="active-artefact-list">
              ${nearbyArtefacts.map(art => `
                <div class="artefact-mini-pill" onclick="window.lithosApp.openArtefactModal('${art.id}')">
                  <span class="mini-epoch" style="background-color: ${this.getEpochColor(art.epochKey)};"></span>
                  <span class="mini-name">${art.name}</span>
                  <span class="mini-site">${art.site}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Logarithmic-like power scaling: maps 0-1000 slider to 3,500,000 BP down to 4,000 BP
  sliderValToAge(val) {
    // 0 = 3,500,000 BP
    // 1000 = 4,000 BP
    const normalized = (1000 - val) / 1000; // 1 at start, 0 at end
    const age = Math.round(3500000 * Math.pow(normalized, 2.8) + 4000);
    return Math.max(Math.min(age, 3500000), 4000);
  }

  ageToSliderVal(age) {
    const clampedAge = Math.max(Math.min(age, 3500000), 4000);
    const normalized = Math.pow((clampedAge - 4000) / 3500000, 1 / 2.8);
    const val = Math.round(1000 - normalized * 1000);
    return Math.max(Math.min(val, 1000), 0);
  }

  setAge(ageBP) {
    this.currentAgeBP = ageBP;
    this.render();
    this.attachEventListeners();
  }

  togglePlay() {
    if (this.isPlaying) {
      clearInterval(this.playbackInterval);
      this.isPlaying = false;
      const btn = document.getElementById("timeline-play-btn");
      if (btn) btn.innerText = "▶ Auto Tour";
    } else {
      this.isPlaying = true;
      const btn = document.getElementById("timeline-play-btn");
      if (btn) btn.innerText = "⏸ Pause";

      this.playbackInterval = setInterval(() => {
        let currentSliderVal = this.ageToSliderVal(this.currentAgeBP);
        currentSliderVal += 12;
        if (currentSliderVal > 1000) currentSliderVal = 0;
        this.setAge(this.sliderValToAge(currentSliderVal));
      }, 350);
    }
  }

  attachEventListeners() {
    const slider = document.getElementById("deep-time-slider");
    if (slider) {
      slider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value, 10);
        this.currentAgeBP = this.sliderValToAge(val);
        // Fast update display
        const ageDisplay = document.getElementById("scrubber-age-display");
        if (ageDisplay) ageDisplay.innerText = `⏳ ${this.formatAgeDisplay(this.currentAgeBP)}`;
      });

      slider.addEventListener("change", (e) => {
        const val = parseInt(e.target.value, 10);
        this.setAge(this.sliderValToAge(val));
      });
    }

    const playBtn = document.getElementById("timeline-play-btn");
    if (playBtn) {
      playBtn.addEventListener("click", () => this.togglePlay());
    }

    const jumpButtons = document.querySelectorAll(".jump-era-btn");
    jumpButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const age = parseInt(btn.getAttribute("data-age"), 10);
        if (this.isPlaying) this.togglePlay();
        this.setAge(age);
      });
    });
  }
}

window.TimelineEngine = TimelineEngine;
