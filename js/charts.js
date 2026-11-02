/**
 * LITHOS - Prehistoric Stone Atlas
 * Archaeometric Analytical Charts & Graphs Suite (Powered by Chart.js)
 * Concept & Design by K.S.Chandra 2026
 */

class ChartsEngine {
  constructor() {
    this.chartInstances = {};
    // Configure global Chart.js dark museum defaults if Chart is available
    if (typeof Chart !== "undefined") {
      Chart.defaults.color = "#94a3b8";
      Chart.defaults.font.family = "'Inter', 'Segoe UI', system-ui, sans-serif";
      Chart.defaults.plugins.tooltip.backgroundColor = "#0f172a";
      Chart.defaults.plugins.tooltip.titleColor = "#f8fafc";
      Chart.defaults.plugins.tooltip.bodyColor = "#cbd5e1";
      Chart.defaults.plugins.tooltip.borderColor = "#334155";
      Chart.defaults.plugins.tooltip.borderWidth = 1;
      Chart.defaults.plugins.tooltip.padding = 10;
    }
  }

  init() {
    this.renderCuttingEdgeChart();
    this.renderCranialVsToolChart();
    this.renderMaterialDistributionChart();
    this.renderMorphometricsRadarChart();
    this.renderSitesByContinentChart();
  }

  renderCuttingEdgeChart() {
    const ctx = document.getElementById("chart-cutting-edge");
    if (!ctx || typeof Chart === "undefined") return;

    if (this.chartInstances.cuttingEdge) {
      this.chartInstances.cuttingEdge.destroy();
    }

    this.chartInstances.cuttingEdge = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Mode 1: Oldowan", 
          "Mode 2: Acheulean", 
          "Mode 3: Levallois / Mousterian", 
          "Mode 4: Upper Paleo Blades", 
          "Mode 5: Mesolithic Microliths"
        ],
        datasets: [{
          label: "Cutting Edge per 1 kg of Raw Stone (cm/kg)",
          data: [15, 60, 200, 800, 2200],
          backgroundColor: [
            "rgba(217, 119, 6, 0.75)",
            "rgba(234, 88, 12, 0.75)",
            "rgba(2, 132, 199, 0.75)",
            "rgba(147, 51, 234, 0.75)",
            "rgba(5, 150, 105, 0.75)"
          ],
          borderColor: [
            "#d97706",
            "#ea580c",
            "#0284c7",
            "#9333ea",
            "#059669"
          ],
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              afterLabel: function(context) {
                const notes = [
                  "Simple core flaking (Olduvai, Koobi Fora)",
                  "Bifacial handaxes with soft-hammer thinning (Saint-Acheul)",
                  "Predetermined prepared cores (Le Moustier, Jebel Irhoud)",
                  "Prismatic blade cores & punch flaking (Lascaux, Solutré)",
                  "Composite geometric tools set in resin (Star Carr, Natufian)"
                ];
                return `Technique: ${notes[context.dataIndex]}`;
              }
            }
          }
        },
        scales: {
          y: {
            type: "logarithmic",
            grid: { color: "rgba(255, 255, 255, 0.06)" },
            title: {
              display: true,
              text: "Cutting Edge (cm/kg) — Log Scale",
              color: "#cbd5e1"
            }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  renderCranialVsToolChart() {
    const ctx = document.getElementById("chart-cranial-vs-mode");
    if (!ctx || typeof Chart === "undefined") return;

    if (this.chartInstances.cranial) {
      this.chartInstances.cranial.destroy();
    }

    const speciesPoints = [
      { name: "A. afarensis", x: 430, y: 0.8, r: 8, color: "#b45309" },
      { name: "H. habilis", x: 610, y: 1.0, r: 10, color: "#d97706" },
      { name: "H. erectus", x: 950, y: 2.0, r: 18, color: "#ea580c" },
      { name: "H. antecessor", x: 1075, y: 1.5, r: 9, color: "#c2410c" },
      { name: "H. heidelbergensis", x: 1250, y: 2.5, r: 12, color: "#f97316" },
      { name: "H. neanderthalensis", x: 1520, y: 3.2, r: 14, color: "#0284c7" },
      { name: "Denisovans", x: 1500, y: 3.5, r: 11, color: "#0ea5e9" },
      { name: "Early H. sapiens", x: 1400, y: 3.1, r: 12, color: "#8b5cf6" },
      { name: "Modern H. sapiens", x: 1380, y: 5.0, r: 16, color: "#10b981" }
    ];

    this.chartInstances.cranial = new Chart(ctx, {
      type: "bubble",
      data: {
        datasets: [{
          label: "Hominin Taxa",
          data: speciesPoints.map(p => ({ x: p.x, y: p.y, r: p.r, speciesName: p.name })),
          backgroundColor: speciesPoints.map(p => p.color + "99"),
          borderColor: speciesPoints.map(p => p.color),
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                const raw = context.raw;
                return `${raw.speciesName}: Cranial ${raw.x} cc | Tool Complexity Mode ${raw.y}`;
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: "Mean Cranial Capacity (cm³)", color: "#cbd5e1" },
            min: 350,
            max: 1700,
            grid: { color: "rgba(255, 255, 255, 0.06)" }
          },
          y: {
            title: { display: true, text: "Lithic Technological Mode (Clark Mode 1 to 5)", color: "#cbd5e1" },
            min: 0.5,
            max: 5.5,
            ticks: {
              stepSize: 1,
              callback: function(value) {
                const map = { 1: "Mode 1 (Oldowan)", 2: "Mode 2 (Acheulean)", 3: "Mode 3 (Levallois)", 4: "Mode 4 (Blade)", 5: "Mode 5 (Microlith/Polished)" };
                return map[value] || value;
              }
            },
            grid: { color: "rgba(255, 255, 255, 0.06)" }
          }
        }
      }
    });
  }

  renderMaterialDistributionChart() {
    const ctx = document.getElementById("chart-material-dist");
    if (!ctx || typeof Chart === "undefined") return;

    if (this.chartInstances.materials) {
      this.chartInstances.materials.destroy();
    }

    this.chartInstances.materials = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Flint & Chert (Microcrystalline SiO₂)",
          "Volcanic Basalt & Phonolite",
          "Volcanic Obsidian Glass",
          "Metamorphic Quartzite & Sandstone",
          "Bone, Antler & Ivory",
          "Jadeite, Chlorite & Greenstones",
          "Ochre & Mineral Pigments",
          "Oolitic & Karst Limestone"
        ],
        datasets: [{
          data: [42, 16, 11, 13, 8, 5, 3, 2],
          backgroundColor: [
            "#f59e0b",
            "#475569",
            "#a855f7",
            "#ea580c",
            "#fde047",
            "#10b981",
            "#ef4444",
            "#94a3b8"
          ],
          borderColor: "#0f172a",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: { boxWidth: 14, color: "#cbd5e1", font: { size: 11 } }
          }
        },
        cutout: "60%"
      }
    });
  }

  renderMorphometricsRadarChart() {
    const ctx = document.getElementById("chart-morphometrics");
    if (!ctx || typeof Chart === "undefined") return;

    if (this.chartInstances.radar) {
      this.chartInstances.radar.destroy();
    }

    this.chartInstances.radar = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Length (mm)",
          "Width (mm)",
          "Thickness (mm)",
          "Weight (10g)",
          "Cutting Edge (cm)"
        ],
        datasets: [
          {
            label: "Attirampakkam Madras Cleaver (Mode 2)",
            data: [165, 118, 48, 112, 38],
            borderColor: "#d97706",
            backgroundColor: "rgba(217, 119, 6, 0.2)",
            borderWidth: 2
          },
          {
            label: "Olorgesailie Giant Biface (Mode 2)",
            data: [245, 135, 62, 185, 48],
            borderColor: "#ea580c",
            backgroundColor: "rgba(234, 88, 12, 0.2)",
            borderWidth: 2
          },
          {
            label: "Volgu Solutrean Laurel Leaf (Mode 4)",
            data: [348, 85, 7, 21.5, 72],
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            borderWidth: 2
          },
          {
            label: "Le Moustier Levallois Point (Mode 3)",
            data: [78, 42, 9, 3.4, 16.5],
            borderColor: "#0284c7",
            backgroundColor: "rgba(2, 132, 199, 0.2)",
            borderWidth: 2
          },
          {
            label: "Natufian Bone Sickle (Mode 5)",
            data: [310, 48, 19, 17.5, 22],
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            grid: { color: "rgba(255, 255, 255, 0.08)" },
            angleLines: { color: "rgba(255, 255, 255, 0.08)" },
            pointLabels: { color: "#cbd5e1", font: { size: 11 } }
          }
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: { boxWidth: 12, color: "#cbd5e1", font: { size: 10 } }
          }
        }
      }
    });
  }

  renderSitesByContinentChart() {
    const ctx = document.getElementById("chart-continent-density");
    if (!ctx || typeof Chart === "undefined") return;

    if (this.chartInstances.continent) {
      this.chartInstances.continent.destroy();
    }

    const epochs = ["lower_paleolithic", "middle_paleolithic", "upper_paleolithic", "mesolithic", "neolithic"];
    const epochLabels = ["Lower Paleolithic", "Middle Paleolithic", "Upper Paleolithic", "Mesolithic", "Neolithic"];

    const counts = {
      asia: [0, 0, 0, 0, 0],
      africa: [0, 0, 0, 0, 0],
      europe: [0, 0, 0, 0, 0],
      neareast: [0, 0, 0, 0, 0]
    };

    if (typeof PREHISTORIC_ARTEFACTS_DATA !== "undefined") {
      PREHISTORIC_ARTEFACTS_DATA.forEach(art => {
        const idx = epochs.indexOf(art.epochKey);
        if (idx === -1) return;

        const c = art.country;
        if (["India", "Pakistan", "China", "Indonesia", "Sri Lanka"].includes(c)) {
          counts.asia[idx]++;
        } else if (["Kenya", "Tanzania", "South Africa"].includes(c)) {
          counts.africa[idx]++;
        } else if (["France", "Austria", "United Kingdom", "Russia"].includes(c)) {
          counts.europe[idx]++;
        } else if (["Israel", "Turkey"].includes(c)) {
          counts.neareast[idx]++;
        }
      });
    }

    this.chartInstances.continent = new Chart(ctx, {
      type: "bar",
      data: {
        labels: epochLabels,
        datasets: [
          {
            label: "Asia & Indian Subcontinent",
            data: counts.asia,
            backgroundColor: "#f59e0b"
          },
          {
            label: "Africa (Cradle of Humankind)",
            data: counts.africa,
            backgroundColor: "#ea580c"
          },
          {
            label: "Europe & Northern Eurasia",
            data: counts.europe,
            backgroundColor: "#0284c7"
          },
          {
            label: "Near East & Levant",
            data: counts.neareast,
            backgroundColor: "#10b981"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { boxWidth: 12, color: "#cbd5e1" }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false }
          },
          y: {
            stacked: true,
            grid: { color: "rgba(255, 255, 255, 0.06)" },
            title: { display: true, text: "Curated Reference Sites & Artefacts", color: "#cbd5e1" }
          }
        }
      }
    });
  }
}

window.ChartsEngine = ChartsEngine;
