/**
 * LITHOS - Prehistoric Stone Atlas
 * Side-by-Side Comparative Analysis Lab (Artefacts & Hominins)
 * Concept & Design by K.S.Chandra 2026
 */

class ComparativeLab {
  constructor(containerId) {
    this.containerId = containerId;
    this.artefactAId = "saint_acheul_handaxe";
    this.artefactBId = "solutrean_laurel_leaf";
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

  setArtefacts(idA, idB) {
    if (idA) this.artefactAId = idA;
    if (idB) this.artefactBId = idB;
    this.render();
    this.attachEventListeners();
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const artA = PREHISTORIC_ARTEFACTS_DATA.find(a => a.id === this.artefactAId) || PREHISTORIC_ARTEFACTS_DATA[0];
    const artB = PREHISTORIC_ARTEFACTS_DATA.find(a => a.id === this.artefactBId) || PREHISTORIC_ARTEFACTS_DATA[1];

    const spA = PREHISTORIC_SPECIES_DATA.find(s => s.id === artA.associatedSpeciesId);
    const spB = PREHISTORIC_SPECIES_DATA.find(s => s.id === artB.associatedSpeciesId);

    const mA = artA.morphometrics;
    const mB = artB.morphometrics;

    container.innerHTML = `
      <div class="comparative-module-wrapper">
        <div class="comparative-header-panel">
          <div>
            <h3>⚖️ Side-by-Side Comparative Lithic Analysis Lab</h3>
            <p class="subtitle">Direct evolutionary, morphometric, and technological comparison across prehistoric epochs</p>
          </div>
          <div class="quick-preset-selectors">
            <span class="preset-label">Quick Comparisons:</span>
            <button class="preset-btn" onclick="window.lithosApp.comparative.setArtefacts('attirampakkam_cleaver', 'saint_acheul_handaxe')">Indian vs French Acheulean</button>
            <button class="preset-btn" onclick="window.lithosApp.comparative.setArtefacts('bhimbetka_mesolithic_art', 'chauvet_cave_lions')">Bhimbetka vs Chauvet Cave Art</button>
            <button class="preset-btn" onclick="window.lithosApp.comparative.setArtefacts('baghor_stone_shrine', 'venus_willendorf')">Baghor Shrine vs Willendorf</button>
            <button class="preset-btn" onclick="window.lithosApp.comparative.setArtefacts('burzahom_polished_celt', 'alpine_jadeite_axe')">Burzahom vs Alpine Jadeite</button>
            <button class="preset-btn" onclick="window.lithosApp.comparative.setArtefacts('olduvai_chopper', 'saint_acheul_handaxe')">Oldowan vs Acheulean</button>
            <button class="preset-btn" onclick="window.lithosApp.comparative.setArtefacts('solutrean_laurel_leaf', 'natufian_sickle')">Solutrean vs Natufian</button>
          </div>
        </div>

        <!-- Dropdown Pickers Grid -->
        <div class="compare-selectors-grid">
          <div class="selector-column column-a">
            <label for="select-artefact-a">Specimen A:</label>
            <select id="select-artefact-a" class="artefact-select-dropdown">
              ${PREHISTORIC_ARTEFACTS_DATA.map(a => `
                <option value="${a.id}" ${a.id === artA.id ? "selected" : ""}>
                  ${a.name} (${a.epoch})
                </option>
              `).join("")}
            </select>
          </div>

          <div class="vs-divider-badge">VS</div>

          <div class="selector-column column-b">
            <label for="select-artefact-b">Specimen B:</label>
            <select id="select-artefact-b" class="artefact-select-dropdown">
              ${PREHISTORIC_ARTEFACTS_DATA.map(a => `
                <option value="${a.id}" ${a.id === artB.id ? "selected" : ""}>
                  ${a.name} (${a.epoch})
                </option>
              `).join("")}
            </select>
          </div>
        </div>

        <!-- Comparative Specimen Cards -->
        <div class="specimens-showcase-row">
          <div class="specimen-card card-a" style="border-top: 4px solid ${this.getEpochColor(artA.epochKey)};">
            <span class="card-epoch-pill">${artA.epoch}</span>
            <h4 class="card-title">${artA.name}</h4>
            <p class="card-site">📍 ${artA.site}, ${artA.country}</p>
            <div class="mini-visual-box">
              <img src="${artA.localPhotoUrl || artA.highResPhotoUrl || ('assets/images/' + artA.id + '.svg')}" alt="${artA.name}" class="compare-mini-img" onerror="this.src='assets/images/${artA.id}.svg'; this.onerror=null;" />
            </div>
          </div>

          <div class="specimen-card card-b" style="border-top: 4px solid ${this.getEpochColor(artB.epochKey)};">
            <span class="card-epoch-pill">${artB.epoch}</span>
            <h4 class="card-title">${artB.name}</h4>
            <p class="card-site">📍 ${artB.site}, ${artB.country}</p>
            <div class="mini-visual-box">
              <img src="${artB.localPhotoUrl || artB.highResPhotoUrl || ('assets/images/' + artB.id + '.svg')}" alt="${artB.name}" class="compare-mini-img" onerror="this.src='assets/images/${artB.id}.svg'; this.onerror=null;" />
            </div>
          </div>
        </div>

        <!-- Detailed Matrix Table -->
        <div class="comparison-matrix-table-wrap">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="col-feature">Archaeological Dimension</th>
                <th class="col-specimen">${artA.name}</th>
                <th class="col-specimen">${artB.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="dim-label">⏳ Chronological Antiquity</td>
                <td><strong>${artA.approxAge}</strong></td>
                <td><strong>${artB.approxAge}</strong></td>
              </tr>
              <tr>
                <td class="dim-label">🔨 Lithic Technological Mode</td>
                <td><span class="mode-pill">${artA.mode}</span></td>
                <td><span class="mode-pill">${artB.mode}</span></td>
              </tr>
              <tr>
                <td class="dim-label">🪨 Petrology & Raw Material</td>
                <td>${artA.material}</td>
                <td>${artB.material}</td>
              </tr>
              <tr>
                <td class="dim-label">🔬 Chemical / Mineral Makeup</td>
                <td>${artA.constituentComposition}</td>
                <td>${artB.constituentComposition}</td>
              </tr>
              <tr>
                <td class="dim-label">🎨 Color & Surface Hue</td>
                <td>${artA.colorDescription}</td>
                <td>${artB.colorDescription}</td>
              </tr>
              <tr>
                <td class="dim-label">⚙️ Reduction Technique (Chaîne Opératoire)</td>
                <td>${artA.knappingTechnique}</td>
                <td>${artB.knappingTechnique}</td>
              </tr>
              <tr>
                <td class="dim-label">🥩 Primary Function & Traceology</td>
                <td>${artA.usageAndMicrowear}</td>
                <td>${artB.usageAndMicrowear}</td>
              </tr>
              <tr>
                <td class="dim-label">📐 Morphometrics (L × W × Th)</td>
                <td>${mA.lengthMm} × ${mA.widthMm} × ${mA.thicknessMm} mm (${mA.weightG} g)</td>
                <td>${mB.lengthMm} × ${mB.widthMm} × ${mB.thicknessMm} mm (${mB.weightG} g)</td>
              </tr>
              <tr>
                <td class="dim-label">⚡ Cutting Edge Yield Ratio</td>
                <td><strong class="yield-badge">${mA.edgeToWeightRatio}</strong></td>
                <td><strong class="yield-badge">${mB.edgeToWeightRatio}</strong></td>
              </tr>
              <tr>
                <td class="dim-label">🧬 Associated Human Taxon</td>
                <td>
                  ${spA ? `<strong>${spA.scientificName}</strong> (${spA.commonName})<br><small>Cranial: ${spA.cranialCapacity}</small>` : "N/A"}
                </td>
                <td>
                  ${spB ? `<strong>${spB.scientificName}</strong> (${spB.commonName})<br><small>Cranial: ${spB.cranialCapacity}</small>` : "N/A"}
                </td>
              </tr>
              <tr>
                <td class="dim-label">🏛️ Prehistoric Cave & Art Context</td>
                <td>
                  <strong>${artA.caveContext ? (artA.caveContext.isCaveSite ? '🏛️ Cave / Shelter: ' + artA.caveContext.caveName : '🏞️ Open-Air: ' + artA.caveContext.caveName) : 'N/A'}</strong><br>
                  <small style="color: #cbd5e1; font-size: 0.78rem;">${artA.caveContext ? artA.caveContext.rockArtContext : ''}</small>
                </td>
                <td>
                  <strong>${artB.caveContext ? (artB.caveContext.isCaveSite ? '🏛️ Cave / Shelter: ' + artB.caveContext.caveName : '🏞️ Open-Air: ' + artB.caveContext.caveName) : 'N/A'}</strong><br>
                  <small style="color: #cbd5e1; font-size: 0.78rem;">${artB.caveContext ? artB.caveContext.rockArtContext : ''}</small>
                </td>
              </tr>
              <tr>
                <td class="dim-label">🏛️ Current Museum Repository</td>
                <td>${artA.currentLocation}</td>
                <td>${artB.currentLocation}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const selA = document.getElementById("select-artefact-a");
    const selB = document.getElementById("select-artefact-b");

    if (selA) {
      selA.addEventListener("change", (e) => {
        this.artefactAId = e.target.value;
        this.render();
        this.attachEventListeners();
      });
    }

    if (selB) {
      selB.addEventListener("change", (e) => {
        this.artefactBId = e.target.value;
        this.render();
        this.attachEventListeners();
      });
    }
  }
}

window.ComparativeLab = ComparativeLab;
