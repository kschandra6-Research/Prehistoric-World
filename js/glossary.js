/**
 * LITHOS - Prehistoric Stone Atlas
 * Lithic Technology Guide, Chaîne Opératoire, Fracture Mechanics & Glossary
 * Concept & Design by K.S.Chandra 2026
 */

const LITHIC_MODES_GUIDE = [
  {
    mode: "Mode 1",
    name: "Oldowan Industry (Pebble & Flake Tools)",
    temporalRange: "ca. 2.6 – 1.7 Million Years Ago (with Lomekwian predecessor at 3.3 Ma)",
    characteristics: "Simplest stone tool technology. Characterized by simple choppers, polyhedrons, discoids, spheroids, and sharp unretouched debitage flakes produced by direct hard-hammer percussion. No preconceived bilateral symmetry.",
    keyHominins: "Australopithecus afarensis / Kenyanthropus (Lomekwian), Homo habilis, Homo rudolfensis, early Homo erectus.",
    keyInnovations: "First intentional fracturing of stone; access to nutrient-dense bone marrow and slicing mammal flesh.",
    efficiency: "Cutting edge per kg of stone: ~10–20 cm/kg"
  },
  {
    mode: "Mode 2",
    name: "Acheulean Biface Industry",
    temporalRange: "ca. 1.75 Million – 250,000 BP",
    characteristics: "Distinctive bifacially flaked tools with bilateral and bifacial symmetry. Typified by tear-drop handaxes (amygdaloids, ovates, cordiforms), cleavers, and picks. Introduced soft-hammer (antler/wood) percussion and deliberate mental templating.",
    keyHominins: "Homo erectus / Homo ergaster, Homo antecessor, Homo heidelbergensis.",
    keyInnovations: "Three-dimensional mental template; soft-hammer thinning; standardized multi-functional toolkit; controlled fire association.",
    efficiency: "Cutting edge per kg of stone: ~40–80 cm/kg"
  },
  {
    mode: "Mode 3",
    name: "Prepared Core / Levallois & Mousterian Industry",
    temporalRange: "ca. 300,000 – 40,000 BP",
    characteristics: "Predetermined flake shape obtained by carefully sculpting a core before detaching the final tool blank (Levallois technique). Yields symmetrical triangular points, oval flakes, and refined side-scrapers (racloirs).",
    keyHominins: "Homo neanderthalensis, Early Anatomically Modern Homo sapiens (Jebel Irhoud, Skhul), Denisovans.",
    keyInnovations: "Multi-step core preparation; composite tools hafted to wooden shafts using birch bark tar and bitumen; personal ornamentation and deliberate burials.",
    efficiency: "Cutting edge per kg of stone: ~100–250 cm/kg"
  },
  {
    mode: "Mode 4",
    name: "Upper Paleolithic Blade & Bone Industry",
    temporalRange: "ca. 50,000 – 12,000 BP",
    characteristics: "Prismatic blade cores producing long, narrow, parallel-sided blades (length > 2x width). Advanced burins, end-scrapers, laurel-leaf pressure-flaked points, eyed needles, spear-throwers (atlatls), and harpoons.",
    keyHominins: "Homo sapiens (Cro-Magnon and successors).",
    keyInnovations: "Indirect punch technique; delicate pressure flaking; prolific parietal and mobiliary art (cave paintings, Venus figurines, musical flutes); tailored garments; long-distance raw material trade.",
    efficiency: "Cutting edge per kg of stone: ~300–1,200 cm/kg"
  },
  {
    mode: "Mode 5",
    name: "Mesolithic Microlithic & Composite Industry",
    temporalRange: "ca. 12,000 – 6,000 BP (Epipaleolithic / Mesolithic)",
    characteristics: "Tiny, geometric flint elements (trapezes, lunates, triangles, bladelets, microburins) under 3 cm in length. Mounted into slotted bone, antler, or wooden shafts to create composite sickles, multi-barbed arrows, and harpoons.",
    keyHominins: "Homo sapiens (Western Hunter-Gatherers, Natufians, etc.).",
    keyInnovations: "Microburin technique; bow and arrow mastery; wild grain harvesting sickles with diagnostic sickle gloss; dugout canoes; dog domestication.",
    efficiency: "Cutting edge per kg of stone: ~1,500–2,500 cm/kg"
  },
  {
    mode: "Neolithic",
    name: "Ground & Polished Stone, Pottery & Megalithic Masonry",
    temporalRange: "ca. 10,000 – 2,000 BCE",
    characteristics: "Ground and polished stone axes (celts, adzes) of hard igneous/metamorphic rocks (jadeite, diorite, basalt). Saddle querns and pestles for grain milling. Obsidian lapidary craftsmanship, ceramic pottery, and megalithic architecture.",
    keyHominins: "Homo sapiens (Early agricultural societies).",
    keyInnovations: "Plant and animal domestication; permanent stone architecture (Göbekli Tepe, Çatalhöyük, Jericho, Stonehenge); long-distance jade/obsidian trade networks; pyrotechnic lime plaster and pottery.",
    efficiency: "Durable, re-sharpenable heavy-duty polished chopping bit resistant to shock."
  }
];

const CONCHOIDAL_FRACTURE_PARTS = [
  {
    term: "Point of Impact / Striking Platform",
    definition: "The exact contact spot where the hammerstone or antler billet strikes the core or flake. The striking platform is the remnant surface upon which the blow was directed.",
    significance: "Prepared and faceted striking platforms (e.g. chapeau de gendarme in Levallois flakes) demonstrate deliberate pre-planning of impact angles."
  },
  {
    term: "Hertzian Cone (Cone of Percussion)",
    definition: "The cone of compressive stress propagating through the stone upon impact. In brittle isotropic materials, this wave expands outward at an angle of roughly 110–130°.",
    significance: "Determines the initiation and curvature of the fracture path."
  },
  {
    term: "Bulb of Percussion (Bulb of Force)",
    definition: "A pronounced convex swelling or hemispherical mound on the ventral (interior) surface of the flake directly below the striking platform.",
    significance: "Direct diagnostic proof of intentional human percussion versus natural thermal or frost fracturing."
  },
  {
    term: "Eraillure Flake Scar",
    definition: "A small, circular or oval secondary spall that detaches automatically from the bulb of percussion due to rebounding elastic shear waves during impact.",
    significance: "Confirms high-energy human knapping strikes."
  },
  {
    term: "Concentric Ripple Marks (Wallner Waves)",
    definition: "Curving wave-like undulating concentric rings radiating downward across the ventral face away from the point of impact.",
    significance: "Indicates the exact direction of force propagation and fracture velocity across the rock."
  },
  {
    term: "Fissures / Hackle Marks",
    definition: "Fine, needle-like microscopic radial striations that run perpendicular to the concentric ripples and point straight back to the striking point.",
    significance: "Used by lithic traceologists to pinpoint the exact origin point of fractured stone fragments."
  },
  {
    term: "Dorsal vs. Ventral Face",
    definition: "The dorsal face (outer side) exhibits previous flake scars or weathered rock cortex. The ventral face (inner side) is the newly exposed smooth fracture surface bearing the bulb of percussion.",
    significance: "Fundamental orientation in all lithic drawing conventions and technological descriptions."
  }
];

const PREHISTORIC_GLOSSARY = [
  {
    term: "Acheulean",
    pronunciation: "/əˈʃuːliən/",
    etymology: "Named after Saint-Acheul, a suburb of Amiens, France",
    definition: "The longest-lasting stone tool cultural tradition in human history (ca. 1.76 Ma to 200 ka), characterized by bifacial handaxes, cleavers, and soft-hammer thinning."
  },
  {
    term: "Atlatl",
    pronunciation: "/ˈɑːtlɑːtəl/",
    etymology: "Nahuatl (Aztec) ahtlatl (spear-thrower)",
    definition: "A handheld lever with a distal cup or spur that engages the butt of a light projectile dart, magnifying throwing torque and velocity to reach over 150 km/h."
  },
  {
    term: "Biface",
    pronunciation: "/ˈbaɪfeɪs/",
    etymology: "Latin bi- (two) + facies (face)",
    definition: "Any stone tool that has been flaked on both opposing surfaces (dorsal and ventral) to establish a continuous, symmetrical lateral cutting margin."
  },
  {
    term: "Burin",
    pronunciation: "/ˈbjʊərɪn/",
    etymology: "French burin, from Italian borino (engraving chisel)",
    definition: "A specialized stone tool with a robust, chisel-like transverse edge produced by the removal of a longitudinal burin spall, used for slotting bone, wood, and antler."
  },
  {
    term: "Celt",
    pronunciation: "/sɛlt/",
    etymology: "Late Latin celtis (chisel/axe)",
    definition: "A prehistoric stone or metal implement shaped like an axe or adze, usually ground and polished along the working bit and set into a wooden haft."
  },
  {
    term: "Chaîne Opératoire",
    pronunciation: "/ʃɛn ɔpeʁatwaʁ/",
    etymology: "French 'operational sequence' (André Leroi-Gourhan 1964)",
    definition: "The complete sociological and technical sequence of gestures in the life history of an artefact: raw material procurement, decortication, core reduction, retouch, resharpening, and discard."
  },
  {
    term: "Conchoidal Fracture",
    pronunciation: "/kɒŋˈkɔɪdəl/",
    etymology: "Greek konchē (mussel/seashell) + -oid",
    definition: "A smooth, curved fracture pattern resembling the interior of a bivalve seashell, characteristic of fine-grained, isotropic, non-crystalline minerals such as flint, obsidian, and quartz."
  },
  {
    term: "Cortex",
    pronunciation: "/ˈkɔːrtɛks/",
    etymology: "Latin cortex (bark / outer shell)",
    definition: "The weathered, chalky, or chemically altered outer skin on raw stone nodules prior to human knapping."
  },
  {
    term: "Debitage",
    pronunciation: "/debiˈtɑːʒ/",
    etymology: "French débitage (cutting up / dividing)",
    definition: "The residual waste flakes, shatter, and debris produced during the intentional reduction of a stone core."
  },
  {
    term: "Denticulate",
    pronunciation: "/dɛnˈtɪkjʊlɪt/",
    etymology: "Latin denticulatus (having small teeth)",
    definition: "A flake tool featuring adjacent, saw-like notches along its margin, used for shredding fibrous wood and sinew."
  },
  {
    term: "Levallois Technique",
    pronunciation: "/ləvælˈwɑː/",
    etymology: "Named after the Parisian suburb of Levallois-Perret (1860s)",
    definition: "A sophisticated Middle Paleolithic prepared-core reduction method where the knapper shapes the core in advance so that a single blow detaches a predetermined, finished tool blank."
  },
  {
    term: "Microlith",
    pronunciation: "/ˈmaɪkrəlɪθ/",
    etymology: "Greek mikros (small) + lithos (stone)",
    definition: "A small, standardized geometric flint bladelet (trapeze, triangle, lunate) typically 1 to 3 cm long, designed to be mounted in composite rows into wooden or antler hafts."
  },
  {
    term: "Mousterian",
    pronunciation: "/muːˈstɪəriən/",
    etymology: "Named after the rockshelter of Le Moustier in Dordogne, France",
    definition: "The primary techno-complex of the Middle Paleolithic in Eurasia, associated predominantly with Homo neanderthalensis and characterized by Mode 3 prepared core reduction."
  },
  {
    term: "Obsidian",
    pronunciation: "/ɒbˈsɪdiən/",
    etymology: "Latin obsidianus lapis (stone of Obsidius)",
    definition: "A naturally occurring volcanic glass formed when felsic lava cools rapidly with minimal crystal growth; knaps with razor-sharp edges down to a single molecular layer (30 angstroms)."
  },
  {
    term: "Oldowan",
    pronunciation: "/ˈoʊldəwɑːn/",
    etymology: "Named after Olduvai Gorge, Tanzania (Louis Leakey)",
    definition: "The earliest widely recognized stone tool industry (Mode 1, ca. 2.6–1.7 Ma), featuring simple pebble choppers, polyhedrons, and unretouched flakes."
  },
  {
    term: "Ochre",
    pronunciation: "/ˈoʊkər/",
    etymology: "Greek ōkhra (pale yellow)",
    definition: "A natural earthy pigment containing ferric oxide (hematite for red, goethite for yellow), extensively utilized in prehistoric cave art, burial rituals, body paint, and hide preservation."
  },
  {
    term: "Pressure Flaking",
    pronunciation: "/ˈprɛʃər ˈfleɪkɪŋ/",
    etymology: "Technological description of lithic detachment",
    definition: "A delicate flintknapping technique where flakes are detached not by percussion blows, but by pressing an antler or copper pointed tool directly against the margin with controlled muscular force."
  },
  {
    term: "Quina Retouch",
    pronunciation: "/kiːnə/",
    etymology: "Named after La Quina site in Charente, France",
    definition: "Steep, stepped, scalar retouch (retouche écailleuse) characteristic of late Neanderthal side-scrapers, created through repeated resharpening using bone compressers."
  },
  {
    term: "Racloir",
    pronunciation: "/ʁaˈklwaʁ/",
    etymology: "French racler (to scrape)",
    definition: "A side scraper with a continuous, carefully retouched cutting or scraping margin on a longitudinal flake edge, used primarily for hide cleaning and woodworking."
  },
  {
    term: "Sickle Gloss",
    pronunciation: "/ˈsɪkəl ɡlɒs/",
    etymology: "Diagnostic microscopic wear trace",
    definition: "A bright, mirror-like silica polish formed along the edge of stone sickles caused by friction with biogenic silica phytoliths present inside cereal stems."
  },
  {
    term: "Solutrean",
    pronunciation: "/səˈluːtriən/",
    etymology: "Named after the crag of Roche de Solutré, France",
    definition: "An Upper Paleolithic culture (ca. 22–17 ka) renowned for its masterfully thin, heat-treated, bifacially pressure-flaked 'laurel-leaf' and 'willow-leaf' points."
  },
  {
    term: "Tranchet Blow",
    pronunciation: "/trɑ̃ˈʃeɪ/",
    etymology: "French tranchet (shoemaker's cutting knife)",
    definition: "A specialized knapping strike delivered parallel to the cutting bit of a handaxe or core axe, detaching a transverse flake to create a straight, razor-sharp chisel edge."
  }
];
