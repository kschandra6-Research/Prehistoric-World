/**
 * LITHOS - Prehistoric Stone Atlas
 * Interactive Stratigraphic Trench Excavation Simulator
 * Law of Superposition: Digging Through 3 Million Years of Sediment
 * Concept & Design by K.S.Chandra 2026
 */

class StratigraphicExcavator {
  constructor(containerId) {
    this.containerId = containerId;
    this.unlockedLayers = {
      layer1: true, // Topsoil starts unlocked
      layer2: false,
      layer3: false,
      layer4: false,
      layer5: false
    };
    this.selectedLayer = "layer1";
  }

  init() {
    this.render();
  }

  getStratumData() {
    return {
      layer1: {
        id: "layer1",
        name: "Stratum I: Holocene Organic Topsoil & Loam",
        depth: "0.0 – 0.8 meters",
        epoch: "Neolithic (ca. 10,000 – 2,000 BCE)",
        soilColor: "#292524",
        sedimentType: "Humic dark brown chernozem, phytoliths of domesticated cereals, charcoal flecks from agricultural slash-and-burn hearths.",
        finds: [
          { name: "Alpine Polished Jadeite Celt", id: "alpine_jadeite_axe", icon: "🪓" },
          { name: "Çatalhöyük Obsidian Mirror", id: "catalhoyuk_obsidian_mirror", icon: "🪞" },
          { name: "Skara Brae Petrosphere", id: "skara_brae_carved_ball", icon: "🔮" }
        ],
        description: "The agricultural horizon: permanent villages, pottery shards, domesticated sheep/goat bones, and polished stone axes used for forest clearance.",
        climate: "Temperate interglacial climatic optimum."
      },
      layer2: {
        id: "layer2",
        name: "Stratum II: Early Post-Glacial Peat & Silts",
        depth: "0.8 – 1.9 meters",
        epoch: "Mesolithic (ca. 11,500 – 6,000 BCE)",
        soilColor: "#3f2e21",
        sedimentType: "Waterlogged anaerobic birch/hazel peat, lacustrine marl with freshwater gastropods (Bithynia tentaculata).",
        finds: [
          { name: "Star Carr Antler Frontlet", id: "star_carr_headdress", icon: "🦌" },
          { name: "Natufian Bone Sickle", id: "natufian_sickle", icon: "🌾" },
          { name: "Ertebølle Core Axe", id: "ertebolle_core_axe", icon: "🪓" }
        ],
        description: "Post-glacial recolonization horizon: hunter-fisher-gatherer camps along lakes, composite arrows, dugout canoes, and canine burials.",
        climate: "Rapid warming, retreat of ice sheets, reforestation with hazel and oak."
      },
      layer3: {
        id: "layer3",
        name: "Stratum III: Periglacial Loess & Cryoturbated Clays",
        depth: "1.9 – 3.8 meters",
        epoch: "Upper Paleolithic (ca. 45,000 – 12,000 BP)",
        soilColor: "#57534e",
        sedimentType: "Windblown calcareous aeolian loess, ice-wedge cast pseudomorphs, cryoturbated gelifluction silt bands.",
        finds: [
          { name: "Volgu Solutrean Laurel Leaf", id: "solutrean_laurel_leaf", icon: "🍃" },
          { name: "Venus of Willendorf", id: "venus_of_willendorf", icon: "🗿" },
          { name: "Lion-Man of Stadel", id: "lion_man_hohlenstein", icon: "🦁" }
        ],
        description: "The Great Hunter horizon: mammoth-steppe fauna (Mammuthus primigenius, Coelodonta, Rangifer), prismatic blade toolkits, and portable mobiliary art.",
        climate: "Extreme glacial conditions (Last Glacial Maximum); permafrost landscape."
      },
      layer4: {
        id: "layer4",
        name: "Stratum IV: Brecciated Cave Earth & Roof Fall (Éboulis)",
        depth: "3.8 – 6.2 meters",
        epoch: "Middle Paleolithic (ca. 300,000 – 45,000 BP)",
        soilColor: "#44403c",
        sedimentType: "Angular limestone frost-shatter blocks (éboulis thermoclastiques) in red clay matrix, phosphatized bone beds.",
        finds: [
          { name: "Le Moustier Levallois Point", id: "le_moustier_point", icon: "🔺" },
          { name: "Combe-Grenal Quina Scraper", id: "mousterian_quina_scraper", icon: "🔪" },
          { name: "Blombos Engraved Ochre", id: "blombos_engraved_ochre", icon: "🧱" }
        ],
        description: "The Neanderthal & early Sapiens horizon: prepared Levallois cores, fire hearths, flexed burials, red ochre curation, and megafaunal butchery.",
        climate: "Cold glacial oscillations (MIS 4 / MIS 6) punctuated by temperate interglacials."
      },
      layer5: {
        id: "layer5",
        name: "Stratum V: Basal Fluvial Gravels & Calcrete Bedrock",
        depth: "6.2 – 10.5+ meters",
        epoch: "Lower Paleolithic (ca. 3.3 Ma – 300,000 BP)",
        soilColor: "#78350f",
        sedimentType: "High-energy braided river gravels, volcanic tephra tuff bands, silica-indurated ferricalcretes.",
        finds: [
          { name: "Olduvai Pebble Chopper", id: "olduvai_chopper", icon: "🪨" },
          { name: "Saint-Acheul Amygdaloid Biface", id: "saint_acheul_handaxe", icon: "🗡️" },
          { name: "Olorgesailie Mega-Biface", id: "olorgesailie_biface", icon: "🗿" }
        ],
        description: "The Primordial Hominin horizon: Oldowan choppers and Acheulean handaxes manufactured by Homo habilis and Homo erectus; early fire mastery.",
        climate: "Pliocene warm savannahs transitioning into early Pleistocene 41 ka glacial cycles."
      }
    };
  }

  excavateLayer(layerId) {
    this.unlockedLayers[layerId] = true;
    this.selectedLayer = layerId;
    
    // Play subtle digging audio if audio engine is active
    if (window.lithosAudio) {
      window.lithosAudio.playKnapSound(180, 0.15);
    }

    this.render();
  }

  selectLayer(layerId) {
    if (this.unlockedLayers[layerId]) {
      this.selectedLayer = layerId;
      this.render();
    }
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const strata = this.getStratumData();
    const active = strata[this.selectedLayer];
    const totalUnlocked = Object.values(this.unlockedLayers).filter(Boolean).length;

    container.innerHTML = `
      <div class="excavator-module-wrapper">
        <div class="excavator-header-panel">
          <div>
            <h3>⛏️ Stratigraphic Trench Simulator & Law of Superposition</h3>
            <p class="subtitle">Excavate sedimentary layers from the Holocene surface down to basal Lower Paleolithic bedrock</p>
          </div>
          <div class="excavation-progress-badge">
            Strata Uncovered: <strong>${totalUnlocked} / 5</strong>
          </div>
        </div>

        <div class="excavator-grid">
          <!-- Left Column: The Interactive Trench Section -->
          <div class="trench-cross-section-column">
            <div class="trench-depth-ruler">
              <span>0 m</span>
              <span>2 m</span>
              <span>4 m</span>
              <span>6 m</span>
              <span>8 m</span>
              <span>10 m</span>
            </div>

            <div class="trench-layers-stack">
              ${Object.keys(strata).map((key, idx) => {
                const layer = strata[key];
                const isUnlocked = this.unlockedLayers[key];
                const isSelected = this.selectedLayer === key;

                return `
                  <div 
                    class="stratum-block ${isSelected ? "selected-stratum" : ""} ${isUnlocked ? "unlocked-stratum" : "locked-stratum"}"
                    style="background-color: ${layer.soilColor};"
                    onclick="window.lithosApp.excavator.selectLayer('${key}')"
                  >
                    <div class="stratum-inner-content">
                      <div class="stratum-info-line">
                        <span class="stratum-tag">${layer.name.split(":")[0]}</span>
                        <span class="stratum-epoch">${layer.epoch}</span>
                      </div>
                      ${isUnlocked ? `
                        <div class="stratum-finds-summary">
                          ${layer.finds.map(f => `<span class="find-icon" title="${f.name}">${f.icon}</span>`).join(" ")}
                        </div>
                      ` : `
                        <button class="dig-stratum-btn" onclick="event.stopPropagation(); window.lithosApp.excavator.excavateLayer('${key}')">
                          ⛏️ Excavate Layer ${idx + 1}
                        </button>
                      `}
                    </div>
                  </div>
                `;
              }).join("")}
              <!-- Bedrock Foundation -->
              <div class="bedrock-stratum">
                <span>⛰️ Pre-Quaternary Igneous Bedrock (Basement Complex)</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Strata Discovery Analysis Dossier -->
          <div class="stratum-inspection-column">
            ${active ? `
              <div class="stratum-dossier-card">
                <div class="stratum-dossier-header" style="border-left: 5px solid ${active.soilColor};">
                  <span class="stratum-depth-pill">Depth: ${active.depth}</span>
                  <h4>${active.name}</h4>
                  <span class="stratum-epoch-tag">${active.epoch}</span>
                </div>

                <div class="dossier-field">
                  <h5>🌱 Soil Matrix & Sedimentology:</h5>
                  <p>${active.sedimentType}</p>
                </div>

                <div class="dossier-field">
                  <h5>❄️ Paleoclimatic Context:</h5>
                  <p>${active.climate}</p>
                </div>

                <div class="dossier-field">
                  <h5>🔍 Archaeological Interpretation:</h5>
                  <p>${active.description}</p>
                </div>

                <div class="dossier-field">
                  <h5>🪨 Recovered Archaeological Implements:</h5>
                  <div class="recovered-finds-grid">
                    ${active.finds.map(f => {
                      const fullArt = PREHISTORIC_ARTEFACTS_DATA.find(a => a.id === f.id);
                      return `
                        <div class="recovered-find-pill" onclick="window.lithosApp.openArtefactModal('${f.id}')">
                          <span class="find-icon-lg">${f.icon}</span>
                          <div>
                            <strong class="find-name">${f.name}</strong>
                            <small class="find-sub">${fullArt ? fullArt.material : ""}</small>
                          </div>
                          <span class="inspect-arrow">&rarr;</span>
                        </div>
                      `;
                    }).join("")}
                  </div>
                </div>
              </div>
            ` : ""}
          </div>
        </div>
      </div>
    `;
  }
}

window.StratigraphicExcavator = StratigraphicExcavator;
