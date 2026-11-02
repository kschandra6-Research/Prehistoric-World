#!/usr/bin/env python3
"""
LITHOS Prehistoric Stone Atlas - Clean SVG Asset Generator
Generates 100% valid XML SVG visual assets for:
- 37 Reference Artefacts, Caves & Art
- 9 Hominin Species Cranial Remains & Life Reconstructions
Concept & Design by K.S.Chandra 2026
"""

import os
import xml.sax.saxutils as saxutils

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(ROOT_DIR, "assets", "images")
SPEC_DIR = os.path.join(IMG_DIR, "species")

os.makedirs(SPEC_DIR, exist_ok=True)

def esc(s):
    """Safely escape text for XML attribute or text node."""
    if not isinstance(s, str):
        s = str(s)
    # Replace invalid XML entities first
    s = s.replace("&bull;", " • ").replace("•", " • ")
    # Standard XML escaping
    return saxutils.escape(s, entities={'"': "&quot;", "'": "&apos;"})

# -------------------------------------------------------------
# 1. HOMININ SPECIES DATA
# -------------------------------------------------------------

SPECIES_SPECS = [
    {
        "id": "australopithecus_afarensis",
        "name": "Australopithecus afarensis",
        "common": "Lomekwian & Pliocene Hominin ('Lucy')",
        "cranial_cc": "430 cc",
        "fossil": "A.L. 288-1 (Hadar) & DIK-1-1",
        "age": "3.9 – 2.9 Ma",
        "cranial_type": "archaic_crest",
        "skin_tone": "#8d5b4c",
        "hair_color": "#2c1810"
    },
    {
        "id": "homo_habilis",
        "name": "Homo habilis",
        "common": "Handy Man (Oldowan Toolmaker)",
        "cranial_cc": "610 cc",
        "fossil": "KNM-ER 1813 & OH 7 (Olduvai)",
        "age": "2.4 – 1.4 Ma",
        "cranial_type": "incipient_vault",
        "skin_tone": "#784734",
        "hair_color": "#1f140e"
    },
    {
        "id": "homo_erectus",
        "name": "Homo erectus / ergaster",
        "common": "Upright Man (Acheulean & Narmada Man)",
        "cranial_cc": "950 – 1150 cc",
        "fossil": "Hathnora (Narmada, India) & KNM-WT 15000",
        "age": "1.9 Ma – 110 ka",
        "cranial_type": "platycephalic_torus",
        "skin_tone": "#6a3b25",
        "hair_color": "#140d09"
    },
    {
        "id": "homo_antecessor",
        "name": "Homo antecessor",
        "common": "Pioneer Man (Atapuerca Gran Dolina)",
        "cranial_cc": "1075 cc",
        "fossil": "ATD6-69 (Gran Dolina TD6, Spain)",
        "age": "1.2 Ma – 800 ka",
        "cranial_type": "midfacial_modern",
        "skin_tone": "#84523c",
        "hair_color": "#241711"
    },
    {
        "id": "homo_heidelbergensis",
        "name": "Homo heidelbergensis",
        "common": "Rhodesian / Heidelberg Man (Levallois Initiators)",
        "cranial_cc": "1250 cc",
        "fossil": "Kabwe (Broken Hill 1) & Petralona",
        "age": "700 – 200 ka",
        "cranial_type": "massive_brow",
        "skin_tone": "#7d4a36",
        "hair_color": "#2a1e17"
    },
    {
        "id": "homo_neanderthalensis",
        "name": "Homo neanderthalensis",
        "common": "Neanderthal (Mousterian Masters)",
        "cranial_cc": "1520 cc",
        "fossil": "La Chapelle-aux-Saints 1 & Shanidar",
        "age": "400 – 40 ka",
        "cranial_type": "occipital_bun",
        "skin_tone": "#c89d7c",
        "hair_color": "#542c16"
    },
    {
        "id": "denisovans",
        "name": "Denisovans (Homo sp. Altai/Xiahe)",
        "common": "Denisovan (Tibetan & Siberian Karst Dwellers)",
        "cranial_cc": "1500 cc",
        "fossil": "Xiahe Mandible (Baishiya) & Denisova 4/8",
        "age": "300 – 30 ka",
        "cranial_type": "robust_archaic",
        "skin_tone": "#8c563d",
        "hair_color": "#19120e"
    },
    {
        "id": "early_homo_sapiens",
        "name": "Homo sapiens (Early AMH)",
        "common": "Early Anatomically Modern Human (Jebel Irhoud)",
        "cranial_cc": "1400 cc",
        "fossil": "Jebel Irhoud 1 & Skhul V",
        "age": "315 – 50 ka",
        "cranial_type": "globularizing_vault",
        "skin_tone": "#6d412b",
        "hair_color": "#110b07"
    },
    {
        "id": "modern_homo_sapiens",
        "name": "Homo sapiens sapiens (Cro-Magnon)",
        "common": "Upper Paleolithic & Modern Human",
        "cranial_cc": "1380 – 1500 cc",
        "fossil": "Cro-Magnon 1 & Sunghir",
        "age": "50 ka – Present",
        "cranial_type": "high_globular",
        "skin_tone": "#b88a6d",
        "hair_color": "#281b14"
    }
]

def generate_skull_svg(sp):
    c_type = sp["cranial_type"]
    vault_rx = "140"
    vault_ry = "110"
    brow_th = "14"
    chin_type = "sloping"

    if c_type == "archaic_crest":
        vault_rx = "105"
        vault_ry = "85"
        brow_th = "18"
    elif c_type == "incipient_vault":
        vault_rx = "118"
        vault_ry = "95"
        brow_th = "15"
    elif c_type == "platycephalic_torus":
        vault_rx = "138"
        vault_ry = "92"
        brow_th = "22"
    elif c_type == "occipital_bun":
        vault_rx = "158"
        vault_ry = "100"
        brow_th = "20"
    elif c_type == "high_globular":
        vault_rx = "135"
        vault_ry = "130"
        brow_th = "8"
        chin_type = "prominent"

    name_esc = esc(sp["name"])
    common_esc = esc(sp["common"])
    fossil_esc = esc(sp["fossil"])
    age_esc = esc(sp["age"])
    cc_esc = esc(sp["cranial_cc"])

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="60%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <radialGradient id="boneLight" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#f5e6d3"/>
      <stop offset="45%" stop-color="#d4ba96"/>
      <stop offset="85%" stop-color="#9a7b54"/>
      <stop offset="100%" stop-color="#5a4125"/>
    </radialGradient>
    <filter id="fossilShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="600" fill="url(#bgGrad)"/>
  
  <!-- Subtle Scientific Grid -->
  <g stroke="#1e293b" stroke-width="0.8" opacity="0.3">
    <line x1="100" y1="0" x2="100" y2="600"/>
    <line x1="200" y1="0" x2="200" y2="600"/>
    <line x1="300" y1="0" x2="300" y2="600"/>
    <line x1="400" y1="0" x2="400" y2="600"/>
    <line x1="500" y1="0" x2="500" y2="600"/>
    <line x1="600" y1="0" x2="600" y2="600"/>
    <line x1="700" y1="0" x2="700" y2="600"/>
    <line x1="0" y1="100" x2="800" y2="100"/>
    <line x1="0" y1="200" x2="800" y2="200"/>
    <line x1="0" y1="300" x2="800" y2="300"/>
    <line x1="0" y1="400" x2="800" y2="400"/>
    <line x1="0" y1="500" x2="800" y2="500"/>
  </g>

  <!-- Fossil Pedestal Vitrine -->
  <ellipse cx="400" cy="500" rx="220" ry="26" fill="#0b1120" stroke="#334155" stroke-width="1.5"/>
  <ellipse cx="400" cy="497" rx="205" ry="20" fill="#030712"/>

  <!-- Cranial Specimen Group -->
  <g transform="translate(400, 270)" filter="url(#fossilShadow)">
    <!-- Shadow cast -->
    <ellipse cx="10" cy="220" rx="140" ry="22" fill="#000000" opacity="0.7"/>

    <!-- Cranial Vault (Neurocranium) -->
    <ellipse cx="0" cy="-60" rx="{vault_rx}" ry="{vault_ry}" fill="url(#boneLight)" stroke="#5d411e" stroke-width="2.5"/>

    <!-- Occipital Bun / Torus protrusion -->
    <path d="M -115,-40 C -150,-50 -155,-10 -110,10 Z" fill="url(#boneLight)" stroke="#5d411e" stroke-width="2"/>

    <!-- Zygomatic Arch & Cheekbone -->
    <path d="M 40,-10 C 95,-10 115,20 100,50 C 70,55 50,30 35,20 Z" fill="url(#boneLight)" stroke="#5d411e" stroke-width="2"/>

    <!-- Eye Orbits (Periorbital Cavities) -->
    <rect x="-70" y="-15" width="45" height="42" rx="12" fill="#0f172a" stroke="#452f14" stroke-width="2.5"/>
    <rect x="25" y="-15" width="45" height="42" rx="12" fill="#0f172a" stroke="#452f14" stroke-width="2.5"/>

    <!-- Supraorbital Torus (Heavy Browridge) -->
    <path d="M -85,-20 Q -45,-38 -5,-22 Q 45,-38 85,-20" fill="none" stroke="#684a22" stroke-width="{brow_th}" stroke-linecap="round"/>

    <!-- Nasal Aperture (Pyriform Cavity) -->
    <path d="M 0,-8 L -14,35 L 0,42 L 14,35 Z" fill="#020617" stroke="#452f14" stroke-width="2"/>

    <!-- Maxilla (Upper Jaw & Palate) -->
    <path d="M -45,40 C -40,85 -20,95 0,95 C 20,95 40,85 45,40 Z" fill="url(#boneLight)" stroke="#5d411e" stroke-width="2"/>

    <!-- Upper Dentition (Teeth) -->
    <g fill="#f8fafc" stroke="#443015" stroke-width="1.2">
      <rect x="-38" y="85" width="7" height="13" rx="2"/>
      <rect x="-29" y="86" width="7" height="14" rx="2"/>
      <rect x="-20" y="87" width="8" height="15" rx="2"/>
      <rect x="-10" y="88" width="9" height="16" rx="2"/>
      <rect x="1" y="88" width="9" height="16" rx="2"/>
      <rect x="12" y="87" width="8" height="15" rx="2"/>
      <rect x="22" y="86" width="7" height="14" rx="2"/>
      <rect x="31" y="85" width="7" height="13" rx="2"/>
    </g>

    <!-- Mandible (Lower Jaw) -->
    <path d="M -75,55 C -70,110 -50,145 -30,155 C 0,162 0,162 30,155 C 50,145 70,110 75,55 L 55,58 C 45,120 25,135 0,135 C -25,135 -45,120 -55,58 Z" 
          fill="#d8ba88" stroke="#5d411e" stroke-width="2"/>
    
    <!-- Lower Dentition -->
    <g fill="#f8fafc" stroke="#443015" stroke-width="1.2">
      <rect x="-30" y="102" width="6" height="13" rx="2"/>
      <rect x="-22" y="103" width="7" height="14" rx="2"/>
      <rect x="-13" y="104" width="7" height="15" rx="2"/>
      <rect x="-4" y="104" width="8" height="15" rx="2"/>
      <rect x="6" y="104" width="7" height="15" rx="2"/>
      <rect x="15" y="103" width="7" height="14" rx="2"/>
      <rect x="24" y="102" width="6" height="13" rx="2"/>
    </g>

    <!-- Cranial Sutures -->
    <path d="M -90,-95 Q -60,-120 -10,-125 Q 40,-130 90,-90" fill="none" stroke="#684a22" stroke-width="1.2" stroke-dasharray="2,3" opacity="0.75"/>
    <path d="M 0,-165 Q 0,-120 0,-70" fill="none" stroke="#684a22" stroke-width="1.2" stroke-dasharray="3,2" opacity="0.75"/>
  </g>

  <!-- HUD Badges -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="320" height="65" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#334155" stroke-width="1.2"/>
    <text x="16" y="24" fill="#f59e0b" font-size="10" font-family="'Inter', sans-serif" font-weight="700" letter-spacing="1">PALEOANTHROPOLOGICAL CRANIAL SPECIMEN</text>
    <text x="16" y="44" fill="#ffffff" font-size="16" font-family="'Cinzel', serif" font-weight="700" font-style="italic">{name_esc}</text>
    <text x="16" y="58" fill="#94a3b8" font-size="10" font-family="'Inter', sans-serif">Fossil: {fossil_esc}</text>
  </g>

  <g transform="translate(560, 45)">
    <rect x="0" y="0" width="200" height="65" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" stroke-width="1.2"/>
    <text x="16" y="22" fill="#38bdf8" font-size="10" font-family="'Inter', sans-serif" font-weight="700" letter-spacing="1">ENDOCRANIAL VOLUME</text>
    <text x="16" y="48" fill="#ffffff" font-size="20" font-family="'Inter', sans-serif" font-weight="800">{cc_esc}</text>
    <text x="16" y="59" fill="#64748b" font-size="9" font-family="'Inter', sans-serif">AGE: {age_esc}</text>
  </g>

  <!-- Scale Bar -->
  <g transform="translate(620, 490)">
    <line x1="0" y1="10" x2="120" y2="10" stroke="#f59e0b" stroke-width="2.5"/>
    <line x1="0" y1="3" x2="0" y2="17" stroke="#f59e0b" stroke-width="2.5"/>
    <line x1="60" y1="6" x2="60" y2="14" stroke="#f59e0b" stroke-width="1.5"/>
    <line x1="120" y1="3" x2="120" y2="17" stroke="#f59e0b" stroke-width="2.5"/>
    <text x="60" y="30" fill="#cbd5e1" font-size="10" font-family="'Inter', monospace" text-anchor="middle" font-weight="600">SCALE: 10 cm</text>
  </g>

  <!-- Footer Watermark -->
  <text x="40" y="565" fill="#475569" font-size="10" font-family="'Inter', sans-serif">
    LITHOS Atlas &#8226; Anthropological Cranial Archive &#8226; Concept &amp; Design by K.S.Chandra 2026
  </text>
</svg>"""

def generate_life_svg(sp):
    name_esc = esc(sp["name"])
    common_esc = esc(sp["common"])
    age_esc = esc(sp["age"])
    skin_tone = sp["skin_tone"]
    hair_color = sp["hair_color"]

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgEnv" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="40%" stop-color="#312e81"/>
      <stop offset="70%" stop-color="#431407"/>
      <stop offset="100%" stop-color="#090d16"/>
    </linearGradient>
    <radialGradient id="sunGlow" cx="20%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="skinGrad" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#d49776"/>
      <stop offset="45%" stop-color="{skin_tone}"/>
      <stop offset="100%" stop-color="#3b1d14"/>
    </linearGradient>
    <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="{hair_color}"/>
      <stop offset="100%" stop-color="#0a0503"/>
    </linearGradient>
    <filter id="portraitShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  </defs>

  <!-- Pleistocene Environment Landscape Background -->
  <rect width="800" height="600" fill="url(#bgEnv)"/>
  <rect width="800" height="600" fill="url(#sunGlow)"/>

  <!-- Mountainous Ridge Backdrop -->
  <path d="M 0,420 L 120,340 L 260,390 L 400,320 L 580,380 L 720,330 L 800,370 L 800,600 L 0,600 Z" fill="#180c06" opacity="0.75"/>
  <path d="M 0,470 L 180,410 L 340,460 L 520,400 L 680,450 L 800,420 L 800,600 L 0,600 Z" fill="#0d0603"/>

  <!-- Living Reconstruction Figure -->
  <g transform="translate(400, 290)" filter="url(#portraitShadow)">
    <!-- Fur Cape & Torso -->
    <path d="M -180,260 C -150,160 -100,120 0,120 C 100,120 150,160 180,260 Z" fill="#2d1d14" stroke="#160d08" stroke-width="3"/>
    <path d="M -120,260 C -90,180 -50,150 0,150 C 50,150 90,180 120,260 Z" fill="#4a3022"/>

    <!-- Neck & Trapezius muscles -->
    <path d="M -50,90 L -55,140 L 55,140 L 50,90 Z" fill="url(#skinGrad)" stroke="#2b140d" stroke-width="2"/>

    <!-- Head & Facial Mass -->
    <ellipse cx="0" cy="10" rx="88" ry="110" fill="url(#skinGrad)" stroke="#381b11" stroke-width="2.5"/>

    <!-- Prehistoric Hair & Mane -->
    <path d="M -100,20 C -115,-80 -60,-130 0,-130 C 60,-130 115,-80 100,20 C 85,-40 60,-90 0,-90 C -60,-90 -85,-40 -100,20 Z" 
          fill="url(#hairGrad)"/>
    <path d="M -95,-30 Q -110,60 -85,110 Q -65,70 -75,20 Z" fill="url(#hairGrad)"/>
    <path d="M 95,-30 Q 110,60 85,110 Q 65,70 75,20 Z" fill="url(#hairGrad)"/>

    <!-- Forehead & Heavy Brow Ridge -->
    <path d="M -55,-25 Q 0,-40 55,-25" fill="none" stroke="#241009" stroke-width="12" stroke-linecap="round" opacity="0.9"/>

    <!-- Eyes -->
    <g fill="#ffffff">
      <!-- Left Eye -->
      <path d="M -48,-15 Q -30,-26 -12,-15 Q -30,-6 -48,-15 Z" fill="#f1f5f9" stroke="#1c0b05" stroke-width="1.5"/>
      <circle cx="-30" cy="-15" r="7" fill="#3b2013"/>
      <circle cx="-30" cy="-15" r="3.5" fill="#000000"/>
      <circle cx="-32" cy="-17" r="1.5" fill="#ffffff"/>

      <!-- Right Eye -->
      <path d="M 12,-15 Q 30,-26 48,-15 Q 30,-6 12,-15 Z" fill="#f1f5f9" stroke="#1c0b05" stroke-width="1.5"/>
      <circle cx="30" cy="-15" r="7" fill="#3b2013"/>
      <circle cx="30" cy="-15" r="3.5" fill="#000000"/>
      <circle cx="28" cy="-17" r="1.5" fill="#ffffff"/>
    </g>

    <!-- Broad Nasal Bridge & Flared Nostrils -->
    <path d="M -10,-18 L -15,22 Q 0,26 15,22 L 10,-18 Z" fill="url(#skinGrad)" stroke="#2d1309" stroke-width="1.5"/>
    <ellipse cx="-12" cy="22" rx="6" ry="4" fill="#180702"/>
    <ellipse cx="12" cy="22" rx="6" ry="4" fill="#180702"/>

    <!-- Subnasal Prognathism / Lips -->
    <path d="M -30,50 Q 0,44 30,50 Q 0,66 -30,50 Z" fill="#753825" stroke="#38180e" stroke-width="1.5"/>
    <line x1="-25" y1="52" x2="25" y2="52" stroke="#230a04" stroke-width="1.5"/>

    <!-- Stubble / Beard Fur -->
    <path d="M -60,40 C -65,85 -40,118 0,122 C 40,118 65,85 60,40 C 50,65 35,98 0,102 C -35,98 -50,65 -60,40 Z" 
          fill="url(#hairGrad)" opacity="0.8"/>
  </g>

  <!-- HUD Overlay -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="320" height="65" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#10b981" stroke-width="1.2"/>
    <text x="16" y="24" fill="#10b981" font-size="10" font-family="'Inter', sans-serif" font-weight="700" letter-spacing="1">PALEO-ARTISTIC LIVING RECONSTRUCTION</text>
    <text x="16" y="44" fill="#ffffff" font-size="16" font-family="'Cinzel', serif" font-weight="700" font-style="italic">{name_esc}</text>
    <text x="16" y="58" fill="#94a3b8" font-size="10" font-family="'Inter', sans-serif">{common_esc}</text>
  </g>

  <g transform="translate(540, 45)">
    <rect x="0" y="0" width="220" height="65" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#f59e0b" stroke-width="1.2"/>
    <text x="16" y="22" fill="#f59e0b" font-size="10" font-family="'Inter', sans-serif" font-weight="700" letter-spacing="1">TEMPORAL LIFESPAN</text>
    <text x="16" y="44" fill="#ffffff" font-size="14" font-family="'Inter', sans-serif" font-weight="700">{age_esc}</text>
    <text x="16" y="58" fill="#cbd5e1" font-size="10" font-family="'Inter', sans-serif">Pleistocene Biome</text>
  </g>

  <!-- Footer Watermark -->
  <text x="40" y="565" fill="#475569" font-size="10" font-family="'Inter', sans-serif">
    LITHOS Atlas &#8226; Anatomical Living Reconstruction &#8226; Concept &amp; Design by K.S.Chandra 2026
  </text>
</svg>"""

# -------------------------------------------------------------
# 2. ARTEFACT DATA
# -------------------------------------------------------------

ARTEFACT_ASSETS = [
    ("attirampakkam_cleaver", "Attirampakkam Madras Acheulean Cleaver", "1.51 Ma", "Tamil Nadu, India", "biface_cleaver", "#d97706"),
    ("isampur_quarry_handaxe", "Isampur Quarry Acheulean Handaxe", "1.27 Ma", "Karnataka, India", "biface_pointed", "#d97706"),
    ("bhimbetka_acheulean_cupules", "Bhimbetka Auditorium Cave Cupules", "700 ka", "Madhya Pradesh, India", "cave_cupules", "#d97706"),
    ("hathnora_narmada_biface", "Hathnora Narmada Man Acheulean Chopper", "250 ka", "Madhya Pradesh, India", "chopper", "#d97706"),
    ("lomekwi_core_flake", "Lomekwi 3 Pliocene Heavy Core & Flake", "3.3 Ma", "West Turkana, Kenya", "pebble_core", "#d97706"),
    ("olduvai_chopper", "Olduvai Basalt Pebble Chopper", "1.84 Ma", "Olduvai Gorge, Tanzania", "chopper", "#d97706"),
    ("saint_acheul_handaxe", "Saint-Acheul Classical Symmetrical Biface", "450 ka", "Somme Valley, France", "biface_pointed", "#d97706"),
    ("zhoukoudian_scraper", "Zhoukoudian Peking Man Quartz Scraper", "770 ka", "Zhoukoudian, China", "scraper", "#d97706"),
    ("trinil_engraved_shell", "Trinil Engraved Pseudodon Shell", "500 ka", "Trinil, Java, Indonesia", "engraved_shell", "#d97706"),
    ("attirampakkam_middle_paleo", "Attirampakkam Levallois Flake & Points", "385 ka", "Tamil Nadu, India", "levallois_flake", "#0284c7"),
    ("jwalapuram_toba_toolkit", "Jwalapuram Post-Toba Flake Toolkit", "74 ka", "Andhra Pradesh, India", "mousterian_point", "#0284c7"),
    ("baishiya_denisovan_mandible", "Baishiya Denisovan Karst Cave Flakes", "160 ka", "Xiahe, Tibetan Plateau", "denisovan_fossil", "#0284c7"),
    ("denisova_chlorite_bracelet", "Denisova Cave Polished Chlorite Bracelet", "50 ka", "Altai, Siberia", "chlorite_ring", "#0284c7"),
    ("blombos_engraved_ochre", "Blombos Cave Geometric Engraved Ochre", "75 ka", "Western Cape, South Africa", "engraved_ochre", "#0284c7"),
    ("le_moustier_point", "Le Moustier Convergent Levallois Point", "55 ka", "Dordogne, France", "levallois_point", "#0284c7"),
    ("baghor_shrine_stone", "Baghor I Upper Paleolithic Stone Shrine", "26 ka", "Son Valley, MP, India", "triangular_shrine", "#9333ea"),
    ("patne_ostrich_eggshell", "Patne Engraved Ostrich Eggshell", "25 ka", "Maharashtra, India", "engraved_eggshell", "#9333ea"),
    ("sulawesi_warty_pig_mural", "Sulawesi Leang Tedongnge Warty Pig Mural", "45.5 ka", "Maros-Pangkep, Indonesia", "cave_pig_art", "#9333ea"),
    ("chauvet_lion_panel", "Chauvet Cave Panel of the Lions", "36 ka", "Ardèche, France", "cave_lions_art", "#9333ea"),
    ("solutrean_laurel_leaf", "Volgu Solutrean Laurel Leaf Biface", "19.5 ka", "Saône-et-Loire, France", "laurel_leaf", "#9333ea"),
    ("venus_of_willendorf", "Venus of Willendorf Oolitic Figurine", "29.5 ka", "Wachau, Austria", "venus_figurine", "#9333ea"),
    ("bhimbetka_mesolithic_art", "Bhimbetka Mesolithic Cave Paintings", "10,000 BCE", "Madhya Pradesh, India", "bhimbetka_hunters", "#059669"),
    ("sarai_nahar_rai_microliths", "Ganga Valley Geometric Microliths", "8000 BCE", "Pratapgarh, UP, India", "microliths_array", "#059669"),
    ("fa_hien_cave_microliths", "Fa Hien Cave Microliths & Bone Points", "48 ka", "Western Province, Sri Lanka", "fa_hien_microliths", "#059669"),
    ("star_carr_headdress", "Star Carr Red Deer Antler Frontlet", "9000 BCE", "North Yorkshire, UK", "antler_frontlet", "#059669"),
    ("natufian_sickle", "Natufian Bone Sickle with Flint Blades", "11,500 BCE", "Mount Carmel, Israel", "natufian_sickle", "#059669"),
    ("mehrgarh_celt_drill", "Mehrgarh Aceramic Polished Stone Celt", "7000 BCE", "Kachi Plain, Pakistan", "polished_celt", "#e11d48"),
    ("lahuradewa_rice_pottery", "Lahuradewa Early Neolithic Ground Celt", "7000 BCE", "Sant Kabir Nagar, UP, India", "lahuradewa_celt", "#e11d48"),
    ("burzahom_celt_hunting_slab", "Burzahom Megalithic Hunting Stele", "3000 BCE", "Srinagar, Kashmir, India", "burzahom_stele", "#e11d48"),
    ("edakkal_caves_petroglyphs", "Edakkal Cave Neolithic Petroglyphs", "6000 BCE", "Wayanad, Kerala, India", "edakkal_petroglyphs", "#e11d48"),
    ("piklihal_deccan_celt", "Piklihal Deccan Ashmound Polished Celt", "2800 BCE", "Raichur, Karnataka, India", "polished_celt", "#e11d48"),
    ("daojali_hading_adze", "Daojali Hading Jadeite Shouldered Celt", "2700 BCE", "Dima Hasao, Assam, India", "shouldered_celt", "#e11d48"),
    ("gobekli_tepe_pillar", "Göbekli Tepe T-Shaped Megalithic Pillar", "9500 BCE", "Şanlıurfa, Turkey", "t_pillar", "#e11d48"),
    ("catalhoyuk_obsidian_mirror", "Çatalhöyük Polished Obsidian Mirror", "6200 BCE", "Konya Plain, Turkey", "obsidian_mirror", "#e11d48"),
    ("stonehenge_sarsen_maul", "Stonehenge Sarsen Quartzite Maul Hammer", "2500 BCE", "Wiltshire, United Kingdom", "sarsen_maul", "#e11d48"),
    ("skara_brae_carved_ball", "Skara Brae Carved Stone Petrosphere", "3100 BCE", "Orkney, Scotland", "carved_petrosphere", "#e11d48"),
    ("alpine_jadeite_axe", "Alpine Green Jadeite Ceremonial Axe", "4200 BCE", "Monte Viso, Alps / UK", "alpine_jadeite", "#e11d48")
]

def generate_artefact_svg(art_id, name, age, site, shape_type, accent):
    clipped_name = name[:28] + ("..." if len(name) > 28 else "")
    name_esc = esc(clipped_name)
    age_esc = esc(age)
    site_esc = esc(site)

    if "cleaver" in shape_type or "biface_cleaver" in shape_type:
        center_svg = """
        <g transform="translate(400, 275)">
          <ellipse cx="0" cy="150" rx="90" ry="18" fill="#030712" opacity="0.6"/>
          <path d="M -70,-130 L 70,-130 L 85,90 C 70,150 -70,150 -85,90 Z" 
                fill="url(#stoneGrad)" stroke="#523918" stroke-width="2.5"/>
          <path d="M -70,-130 L 70,-130 L 60,-115 L -60,-115 Z" fill="#f59e0b" opacity="0.8"/>
          <path d="M -70,-130 Q -10,0 -60,110" fill="none" stroke="#451a03" stroke-width="2"/>
          <path d="M 70,-130 Q 10,0 60,110" fill="none" stroke="#451a03" stroke-width="2"/>
        </g>
        """
    elif "cave" in shape_type or "mural" in shape_type or "petroglyph" in shape_type:
        center_svg = """
        <g transform="translate(400, 275)">
          <rect x="-240" y="-170" width="480" height="340" rx="14" fill="#382216" stroke="#5c3826" stroke-width="3"/>
          <path d="M -230,-60 L -120,-30 L -50,-80 L 80,-40 L 220,-70" fill="none" stroke="#1f110a" stroke-width="2.5"/>
          <path d="M -80,-30 L -20,60 L 40,140" fill="none" stroke="#1f110a" stroke-width="2"/>
          <g fill="#991b1b" stroke="#7f1d1d" stroke-width="2">
            <ellipse cx="-40" cy="0" rx="90" ry="55" fill="#b91c1c" opacity="0.85"/>
            <circle cx="-130" cy="-25" r="30" fill="#b91c1c"/>
            <path d="M -160,-20 L -180,-10 L -165,-30" stroke="#b91c1c" stroke-width="6" stroke-linecap="round"/>
            <line x1="-90" y1="45" x2="-105" y2="105" stroke="#b91c1c" stroke-width="8" stroke-linecap="round"/>
            <line x1="-50" y1="45" x2="-60" y2="100" stroke="#b91c1c" stroke-width="8" stroke-linecap="round"/>
            <line x1="20" y1="45" x2="30" y2="100" stroke="#b91c1c" stroke-width="8" stroke-linecap="round"/>
            <line x1="45" y1="35" x2="65" y2="95" stroke="#b91c1c" stroke-width="8" stroke-linecap="round"/>
            <path d="M 120,-70 L 125,-100 L 135,-70 L 145,-110 L 150,-70 L 160,-105 L 163,-68 L 175,-90 L 168,-50 Q 150,0 125,-40 Z" fill="#dc2626" opacity="0.6"/>
          </g>
        </g>
        """
    elif "venus" in shape_type or "shrine" in shape_type or "stele" in shape_type:
        center_svg = """
        <g transform="translate(400, 275)">
          <ellipse cx="0" cy="165" rx="70" ry="16" fill="#030712" opacity="0.6"/>
          <circle cx="0" cy="-115" r="38" fill="url(#stoneGrad)" stroke="#523918" stroke-width="2"/>
          <ellipse cx="0" cy="-35" rx="72" ry="50" fill="url(#stoneGrad)" stroke="#523918" stroke-width="2"/>
          <ellipse cx="0" cy="55" rx="82" ry="60" fill="url(#stoneGrad)" stroke="#523918" stroke-width="2"/>
          <ellipse cx="-28" cy="130" rx="20" ry="32" fill="url(#stoneGrad)" stroke="#523918" stroke-width="2"/>
          <ellipse cx="28" cy="130" rx="20" ry="32" fill="url(#stoneGrad)" stroke="#523918" stroke-width="2"/>
          <ellipse cx="0" cy="30" rx="60" ry="70" fill="#dc2626" opacity="0.2"/>
        </g>
        """
    elif "sickle" in shape_type or "frontlet" in shape_type or "bracelet" in shape_type:
        center_svg = """
        <g transform="translate(400, 275)">
          <ellipse cx="0" cy="160" rx="130" ry="20" fill="#030712" opacity="0.6"/>
          <path d="M -160,80 Q -100,-150 120,-110 Q 140,-80 120,-60 Q -60,-80 -120,95 Z" 
                fill="#fde68a" stroke="#78350f" stroke-width="3"/>
          <path d="M -50,-102 L -20,-106 L 15,-103 L 50,-93 L 85,-78" fill="none" stroke="#090d16" stroke-width="12" stroke-linecap="round"/>
          <polygon points="-45,-105 -25,-108 -23,-98 -43,-95" fill="#f59e0b" stroke="#78350f"/>
          <polygon points="-15,-108 10,-105 8,-95 -13,-98" fill="#fbbf24" stroke="#78350f"/>
          <polygon points="20,-105 45,-95 42,-85 17,-95" fill="#f59e0b" stroke="#78350f"/>
          <polygon points="55,-95 80,-80 77,-70 52,-85" fill="#fbbf24" stroke="#78350f"/>
        </g>
        """
    else:
        # Bifacial pointed handaxe / celt
        center_svg = """
        <g transform="translate(400, 275)">
          <ellipse cx="0" cy="155" rx="80" ry="18" fill="#030712" opacity="0.6"/>
          <path d="M 0,-170 L 80,100 C 60,155 -60,155 -80,100 Z" 
                fill="url(#stoneGrad)" stroke="#523918" stroke-width="2.5"/>
          <path d="M 0,-170 L 30,-70 L 60,20 L 75,90" fill="none" stroke="#f59e0b" stroke-width="3" opacity="0.7"/>
          <path d="M 0,-170 L -30,-70 L -60,20 L -75,90" fill="none" stroke="#f59e0b" stroke-width="3" opacity="0.7"/>
          <path d="M -40,110 Q 0,135 40,110" fill="none" stroke="#451a03" stroke-width="2"/>
        </g>
        """

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1120"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <radialGradient id="spotlight" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.16"/>
      <stop offset="60%" stop-color="#0f172a" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="stoneGrad" x1="15%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stop-color="#d9a86c"/>
      <stop offset="30%" stop-color="#b58249"/>
      <stop offset="70%" stop-color="#7c5328"/>
      <stop offset="100%" stop-color="#452a11"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bgGrad)"/>
  <rect width="800" height="600" fill="url(#spotlight)"/>

  <ellipse cx="400" cy="460" rx="200" ry="25" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <ellipse cx="400" cy="458" rx="190" ry="20" fill="#0f172a"/>

  {center_svg}

  <g transform="translate(40, 40)">
    <rect x="0" y="0" width="340" height="68" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="{accent}" stroke-width="1.2"/>
    <text x="16" y="24" fill="{accent}" font-size="10" font-family="'Inter', sans-serif" font-weight="700" letter-spacing="1">ARCHAEOLOGICAL REFERENCE SPECIMEN</text>
    <text x="16" y="44" fill="#ffffff" font-size="15" font-family="'Cinzel', serif" font-weight="700">{name_esc}</text>
    <text x="16" y="59" fill="#94a3b8" font-size="11" font-family="'Inter', sans-serif">Locality: {site_esc} &#8226; Age: {age_esc}</text>
  </g>

  <g transform="translate(630, 480)">
    <line x1="0" y1="10" x2="110" y2="10" stroke="#f59e0b" stroke-width="2.5"/>
    <line x1="0" y1="3" x2="0" y2="17" stroke="#f59e0b" stroke-width="2.5"/>
    <line x1="55" y1="6" x2="55" y2="14" stroke="#f59e0b" stroke-width="1.5"/>
    <line x1="110" y1="3" x2="110" y2="17" stroke="#f59e0b" stroke-width="2.5"/>
    <text x="55" y="30" fill="#cbd5e1" font-size="10" font-family="'Inter', monospace" text-anchor="middle" font-weight="600">SCALE: 10 cm</text>
  </g>

  <text x="40" y="565" fill="#475569" font-size="10" font-family="'Inter', sans-serif">
    LITHOS: Prehistoric Stone Atlas &#8226; Concept &amp; Design by K.S.Chandra 2026
  </text>
</svg>"""

print("[+] Generating 100% valid XML Artefact SVG Assets (37 files)...")
for art_id, name, age, site, shape_type, accent in ARTEFACT_ASSETS:
    art_path = os.path.join(IMG_DIR, f"{art_id}.svg")
    with open(art_path, "w", encoding="utf-8") as f:
        f.write(generate_artefact_svg(art_id, name, age, site, shape_type, accent))

print("[+] Generating 100% valid XML Hominin Species Assets (Skulls + Life)...")
for sp in SPECIES_SPECS:
    skull_path = os.path.join(SPEC_DIR, f"skull_{sp['id']}.svg")
    life_path = os.path.join(SPEC_DIR, f"life_{sp['id']}.svg")
    with open(skull_path, "w", encoding="utf-8") as f:
        f.write(generate_skull_svg(sp))
    with open(life_path, "w", encoding="utf-8") as f:
        f.write(generate_life_svg(sp))

# Also ensure alias copies exist
ALIASES = [
    ("denisovans", "denisova_hominin"),
    ("early_homo_sapiens", "homo_sapiens_early"),
    ("modern_homo_sapiens", "homo_sapiens_modern")
]
for src_id, dst_id in ALIASES:
    for prefix in ["skull_", "life_"]:
        s_file = os.path.join(SPEC_DIR, f"{prefix}{src_id}.svg")
        d_file = os.path.join(SPEC_DIR, f"{prefix}{dst_id}.svg")
        if os.path.exists(s_file):
            with open(s_file, "r", encoding="utf-8") as rf:
                content = rf.read()
            with open(d_file, "w", encoding="utf-8") as wf:
                wf.write(content)

print("[+] Assets generation completed successfully.")
