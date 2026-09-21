export interface ProvenanceMilestone {
  yearOrDate: string;
  stage: 'Creation & Inscription' | 'Historical Relocation' | 'Archaeological Discovery' | 'Military / Diplomatic Transit' | 'Museum Custody & Accession';
  location: string;
  summary: string;
  historicalActors?: string;
}

export interface ArtifactProvenanceInfo {
  artifactId: string;
  artifactName: string;
  discovery: {
    siteName: string;
    historicalRegion: string;
    coordinates: { lat: number; lng: number };
    dateDiscovered: string;
    excavatedBy: string;
    discoveryContext: string;
  };
  currentCustody: {
    institution: string;
    city: string;
    country: string;
    coordinates: { lat: number; lng: number };
    accessionNumber: string;
    galleryRoom: string;
    acquisitionYear: string;
    acquisitionMethod: string;
  };
  journeySummary: string;
  totalDistanceKm: number;
  totalDistanceMiles: number;
  timeline: ProvenanceMilestone[];
  custodyNotes: string;
  recommendedVaultComparisons: {
    vaultId: string;
    vaultName: string;
    civilization: string;
    era: string;
    year: string;
    comparisonRationale: string;
  }[];
}

export const ARTIFACT_PROVENANCE_DATA: Record<string, ArtifactProvenanceInfo> = {
  'rosetta-stone': {
    artifactId: 'rosetta-stone',
    artifactName: 'The Rosetta Stone',
    discovery: {
      siteName: 'Fort Julien, Rashid (Rosetta), Nile Delta',
      historicalRegion: 'Ptolemaic Egypt / Lower Egypt',
      coordinates: { lat: 31.401, lng: 30.419 },
      dateDiscovered: 'July 15, 1799 AD',
      excavatedBy: 'Lieutenant Pierre-François Bouchard (French Napoleonic expedition)',
      discoveryContext: 'Uncovered during French military fortification repairs of the 15th-century Mamluk fort, where it had been reused as ordinary stone rubble inside an exterior wall.'
    },
    currentCustody: {
      institution: 'The British Museum',
      city: 'London',
      country: 'United Kingdom',
      coordinates: { lat: 51.5194, lng: -0.1270 },
      accessionNumber: 'EA 24',
      galleryRoom: 'Room 4 (Egyptian Sculpture Gallery)',
      acquisitionYear: '1802 AD',
      acquisitionMethod: 'Surrendered under Article 16 of the Capitulation of Alexandria following French defeat.'
    },
    journeySummary: 'Carved in 196 BC in Memphis, transferred to Sais, reused in medieval fortifications at Rashid, discovered by Napoleon’s engineers in 1799, surrendered to Britain under treaty in 1801, and shipped aboard HMS Égyptienne to Portsmouth before entering the British Museum in 1802.',
    totalDistanceKm: 3480,
    totalDistanceMiles: 2162,
    timeline: [
      {
        yearOrDate: '196 BC',
        stage: 'Creation & Inscription',
        location: 'Memphis & Sais, Egypt',
        summary: 'Royal decree carved in three scripts by synod of Memphis priests to affirm the divine cult of 13-year-old King Ptolemy V Epiphanes.',
        historicalActors: 'Ptolemaic Egyptian Priesthood & Royal Scribes'
      },
      {
        yearOrDate: 'c. 1470 AD',
        stage: 'Historical Relocation',
        location: 'Rashid (Rosetta), Nile Delta',
        summary: 'Following temple dismantling in late antiquity, the granodiorite slab was reused as masonry foundation block in Mamluk Sultan Qaitbay’s Fort Julien.',
        historicalActors: 'Mamluk Fortress Builders'
      },
      {
        yearOrDate: 'July 15, 1799',
        stage: 'Archaeological Discovery',
        location: 'Fort Julien, Rashid',
        summary: 'French engineering officer Pierre-François Bouchard spots the dark inscribed slab while digging rampart defenses for Napoleon Bonaparte.',
        historicalActors: 'Pierre-François Bouchard & Institut d’Égypte'
      },
      {
        yearOrDate: 'August 1801',
        stage: 'Military / Diplomatic Transit',
        location: 'Alexandria, Egypt',
        summary: 'French forces capitulate to British troops under General John Hely-Hutchinson. Antiquities collected by French savants are transferred under the Treaty of Alexandria.',
        historicalActors: 'British and French Military Commands'
      },
      {
        yearOrDate: 'February 1802',
        stage: 'Military / Diplomatic Transit',
        location: 'Mediterranean Sea to Portsmouth, UK',
        summary: 'Transported across the Mediterranean and Atlantic aboard the captured French frigate HMS Égyptienne, arriving at Portsmouth harbor in February 1802.',
        historicalActors: 'Colonel Tomkyns Hilgrove Turner & Royal Navy'
      },
      {
        yearOrDate: 'December 1802',
        stage: 'Museum Custody & Accession',
        location: 'The British Museum, London',
        summary: 'Presented by King George III to the British Museum. In 1822, Jean-François Champollion uses its multilingual text to crack hieroglyphs.',
        historicalActors: 'King George III, Thomas Young, Jean-François Champollion'
      }
    ],
    custodyNotes: 'Permanent fixture of Room 4 at the British Museum. Periodic diplomatic petitions have been presented by the Egyptian Ministry of Tourism and Antiquities requesting its repatriation.',
    recommendedVaultComparisons: [
      {
        vaultId: 'cyrus-cylinder',
        vaultName: 'The Cyrus Cylinder',
        civilization: 'Achaemenid Persian Empire / Babylon',
        era: 'Ancient Near East',
        year: '539 BC',
        comparisonRationale: 'Both are monumental ancient royal proclamations incised into hard surfaces to establish imperial legitimacy over multilingual conquered peoples.'
      },
      {
        vaultId: 'code-of-hammurabi',
        vaultName: 'Stele of the Code of Hammurabi',
        civilization: 'Old Babylonian Empire',
        era: 'Bronze Age Mesopotamia',
        year: '1754 BC',
        comparisonRationale: 'Both monuments utilize permanent public epigraphy (cuneiform vs hieroglyphs) to broadcast authoritative state decrees and priestly sanction.'
      },
      {
        vaultId: 'narmer-palette',
        vaultName: 'The Narmer Palette',
        civilization: 'First Dynasty Egypt',
        era: 'Early Dynastic Period',
        year: '3100 BC',
        comparisonRationale: 'The earliest decipherable Egyptian hieroglyphic document compared with the Hellenistic trilingual decree that finally deciphered them.'
      }
    ]
  },

  'caesar-elephant-denarius': {
    artifactId: 'caesar-elephant-denarius',
    artifactName: 'Denarius of Julius Caesar (Elephant Coin)',
    discovery: {
      siteName: 'Rubicon Valley & Northern Italy',
      historicalRegion: 'Gallia Cisalpina & Central Italy',
      coordinates: { lat: 44.070, lng: 12.390 },
      dateDiscovered: '19th-Century Agricultural & Railway Hoard Recoveries',
      excavatedBy: 'Local Italian and French hoard finds; assembled in historic numismatic cabinets',
      discoveryContext: 'Recovered in buried ceramic hoards concealed by Roman legionaries and civilians during the chaotic civil wars of 49–31 BC.'
    },
    currentCustody: {
      institution: 'The British Museum (Coins and Medals) / Cabinet des Médailles',
      city: 'London / Paris',
      country: 'United Kingdom / France',
      coordinates: { lat: 51.5194, lng: -0.1270 },
      accessionNumber: 'RRC 443/1; BM CRR 1006',
      galleryRoom: 'Coins and Medals Department, Case 12',
      acquisitionYear: '1867 AD',
      acquisitionMethod: 'Purchased from the Duc de Blacas private numismatic collection.'
    },
    journeySummary: 'Struck in 49 BC by Caesar’s marching field mint using state silver bullion, circulated across Gaul, Italy, and Greece as legionary pay, stashed in hoards during Roman civil strife, recovered in 19th-century excavations, and acquired by the British Museum in 1867.',
    totalDistanceKm: 1220,
    totalDistanceMiles: 758,
    timeline: [
      {
        yearOrDate: '49 BC',
        stage: 'Creation & Inscription',
        location: 'Gallia Cisalpina / Rimini',
        summary: 'Hammer-struck in Caesar’s mobile legionary mint upon crossing the Rubicon to finance his march on Rome.',
        historicalActors: 'Julius Caesar & Legionary Moneyers'
      },
      {
        yearOrDate: '49–44 BC',
        stage: 'Historical Relocation',
        location: 'Roman Republic (Italy, Spain, Greece)',
        summary: 'Paid out to veteran legionaries of Legio XIII Gemina; circulated through trade, camp sutlers, and war bounties.',
        historicalActors: 'Caesar’s Veterans & Roman Merchants'
      },
      {
        yearOrDate: 'c. 42 BC',
        stage: 'Historical Relocation',
        location: 'Central Italy',
        summary: 'Concealed inside terracotta jars beneath estate floors during the proscriptions and civil wars following Caesar’s assassination.',
        historicalActors: 'Roman Citizens under the Second Triumvirate'
      },
      {
        yearOrDate: '1860s',
        stage: 'Archaeological Discovery',
        location: 'Emilia-Romagna & Tuscany, Italy',
        summary: 'Uncovered during agricultural ploughing and construction of early Italian railway lines.',
        historicalActors: 'Italian Archaeologists & Antiquaries'
      },
      {
        yearOrDate: '1867 AD',
        stage: 'Museum Custody & Accession',
        location: 'The British Museum, London',
        summary: 'Acquired as part of the prestigious Blacas collection of Roman Republican coinage for the Department of Coins and Medals.',
        historicalActors: 'Trustees of the British Museum & Duc de Blacas'
      }
    ],
    custodyNotes: 'Preserved under nitrogen-stable archival display cases in the Department of Coins and Medals; widely cited as the benchmark Republican silver denarius.',
    recommendedVaultComparisons: [
      {
        vaultId: 'alexander-stater',
        vaultName: 'Gold Stater of Alexander the Great',
        civilization: 'Macedonian Empire',
        era: 'Hellenistic Era',
        year: 'c. 330 BC',
        comparisonRationale: 'Both coins revolutionized military monetary propaganda—Alexander using Athena and Nike, Caesar stamping his own name and elephant.'
      },
      {
        vaultId: 'gothic-knight-plate-armor',
        vaultName: 'Gothic Full Plate Knight Armor',
        civilization: 'Holy Roman Empire',
        era: 'Late Middle Ages',
        year: '1480 AD',
        comparisonRationale: 'Financial equipment of a Roman soldier versus physical metallurgical engineering of a late-medieval imperial knight.'
      }
    ]
  },

  'gothic-knight-plate-armor': {
    artifactId: 'gothic-knight-plate-armor',
    artifactName: 'Gothic Full Plate Knight Armor of Sigismund',
    discovery: {
      siteName: 'Schloss Ambras & Innsbruck Ducal Armory',
      historicalRegion: 'Tyrol & Bavaria, Holy Roman Empire',
      coordinates: { lat: 47.2692, lng: 11.4041 },
      dateDiscovered: 'Habsburg Imperial Dynastic Inheritance',
      excavatedBy: 'Continuous archival custody through the House of Habsburg-Lorraine',
      discoveryContext: 'Preserved continuously in royal armory inventories since its forging in Augsburg and Innsbruck; never buried.'
    },
    currentCustody: {
      institution: 'Kunsthistorisches Museum (Hofjagd- und Rüstkammer)',
      city: 'Vienna',
      country: 'Austria',
      coordinates: { lat: 48.2038, lng: 16.3618 },
      accessionNumber: 'Inv. No. A 62',
      galleryRoom: 'Imperial Armory, Hall 1',
      acquisitionYear: '1806 AD (Relocated to Vienna) / 1891 (KHM Opening)',
      acquisitionMethod: 'Evacuated from Innsbruck to Vienna during the Napoleonic Wars to safeguard Habsburg treasures.'
    },
    journeySummary: 'Forged c. 1480 in Augsburg by master Lorenz Helmschmied for Archduke Sigismund of Tyrol, maintained in Schloss Ambras for three centuries, evacuated to Vienna in 1806 during Napoleonic threats, and exhibited permanently in the Kunsthistorisches Museum since 1891.',
    totalDistanceKm: 390,
    totalDistanceMiles: 242,
    timeline: [
      {
        yearOrDate: 'c. 1480 AD',
        stage: 'Creation & Inscription',
        location: 'Augsburg & Innsbruck',
        summary: 'Hammered from differential tempered crucible carbon steel by Lorenz Helmschmied, incorporating architectural Gothic fluting.',
        historicalActors: 'Lorenz Helmschmied & Archduke Sigismund of Tyrol'
      },
      {
        yearOrDate: '1580 AD',
        stage: 'Historical Relocation',
        location: 'Schloss Ambras, Innsbruck',
        summary: 'Cataloged into the Renaissance "Chamber of Art and Wonders" (Kunst- und Wunderkammer) by Archduke Ferdinand II of Tyrol.',
        historicalActors: 'Archduke Ferdinand II of Tyrol'
      },
      {
        yearOrDate: '1806 AD',
        stage: 'Military / Diplomatic Transit',
        location: 'Innsbruck to Vienna',
        summary: 'Evacuated over the Alps by horse-drawn wagons to Vienna to prevent seizure by Napoleon’s Bavarian allies following the Peace of Pressburg.',
        historicalActors: 'Austrian Imperial Guard & Habsburg Curators'
      },
      {
        yearOrDate: '1891 AD',
        stage: 'Museum Custody & Accession',
        location: 'Kunsthistorisches Museum, Vienna',
        summary: 'Mounted on an armored equestrian manikin in the newly opened imperial museum designed by Gottfried Semper and Carl von Hasenauer.',
        historicalActors: 'Emperor Franz Joseph I of Austria'
      }
    ],
    custodyNotes: 'Universally recognized as the finest surviving harness of German Gothic armor; meticulously maintained with microcrystalline preservation wax.',
    recommendedVaultComparisons: [
      {
        vaultId: 'sutton-hoo-helmet',
        vaultName: 'The Sutton Hoo Ceremonial Helmet',
        civilization: 'Anglo-Saxon Kingdom of East Anglia',
        era: 'Early Middle Ages',
        year: '625 AD',
        comparisonRationale: 'Traces the 850-year evolution of European warrior defense from early medieval iron-and-garnet helmets to articulated fluted steel suits.'
      },
      {
        vaultId: 'terracotta-kneeling-archer',
        vaultName: 'The Terracotta Army Kneeling Archer',
        civilization: 'Qin Dynasty China',
        era: 'Imperial China',
        year: '210 BC',
        comparisonRationale: 'European articulated plate defense compared with Qin Dynasty composite lamellar armor and mass-produced crossbow warfare.'
      }
    ]
  },

  'antikythera-mechanism': {
    artifactId: 'antikythera-mechanism',
    artifactName: 'The Antikythera Mechanism',
    discovery: {
      siteName: 'Antikythera Island Roman Shipwreck',
      historicalRegion: 'Aegean Sea, Greece',
      coordinates: { lat: 35.8647, lng: 23.3106 },
      dateDiscovered: 'May 17, 1902 AD (Recognized by Stais)',
      excavatedBy: 'Sponge diver Elias Stadiatis & Archaeologist Spyridon Stais',
      discoveryContext: 'Salvaged from a Roman luxury cargo wreck at 45 meters depth off the northern coast of Antikythera; initially mistaken for ordinary marine rocks.'
    },
    currentCustody: {
      institution: 'National Archaeological Museum',
      city: 'Athens',
      country: 'Greece',
      coordinates: { lat: 37.9890, lng: 23.7327 },
      accessionNumber: 'Inv. 15987',
      galleryRoom: 'Bronze Collection, Room 38',
      acquisitionYear: '1902 AD',
      acquisitionMethod: 'Salvaged by the Greek Royal Navy and sponge divers; accessioned into national antiquity collections.'
    },
    journeySummary: 'Engineered c. 150–100 BC in Rhodes or Syracuse, lost in a Roman shipwreck off Antikythera c. 65 BC, retrieved from 45m depth by sponge divers in 1900–1902, identified in Athens by Spyridon Stais, and revealed as an analog computer via CT scans in 2005.',
    totalDistanceKm: 240,
    totalDistanceMiles: 149,
    timeline: [
      {
        yearOrDate: 'c. 150–100 BC',
        stage: 'Creation & Inscription',
        location: 'Rhodes, Corinth, or Syracuse, Magna Graecia',
        summary: 'Constructed by Hellenistic scientists with 30+ precision bronze gear wheels to calculate lunar phases, eclipses, and Olympic cycles.',
        historicalActors: 'Hellenistic Astronomers & Bronzesmiths (School of Hipparchus/Archimedes)'
      },
      {
        yearOrDate: 'c. 65 BC',
        stage: 'Historical Relocation',
        location: 'Antikythera Strait, Aegean Sea',
        summary: 'A Roman cargo ship laden with Greek plundered art and statues sinks in a catastrophic storm off the coast of Antikythera.',
        historicalActors: 'Roman Merchant Sailors'
      },
      {
        yearOrDate: 'May 17, 1902',
        stage: 'Archaeological Discovery',
        location: 'National Archaeological Museum, Athens',
        summary: 'While inspecting corroded bronze lumps recovered by sponge divers, archaeologist Spyridon Stais spots gear teeth embedded in a rock.',
        historicalActors: 'Spyridon Stais & Elias Stadiatis'
      },
      {
        yearOrDate: '1974 & 2005',
        stage: 'Museum Custody & Accession',
        location: 'Athens, Greece',
        summary: 'Derek de Solla Price and later the international AMRP team use gamma-ray and 3D micro-CT scanning to map the complete gear train.',
        historicalActors: 'Derek de Solla Price, Mike Edmunds, Tony Freeth'
      }
    ],
    custodyNotes: 'Preserved inside argon gas chambers in Room 38 of the National Archaeological Museum in Athens, alongside working modern reconstructions.',
    recommendedVaultComparisons: [
      {
        vaultId: 'cyrus-cylinder',
        vaultName: 'The Cyrus Cylinder',
        civilization: 'Achaemenid Empire',
        era: 'Classical Antiquity',
        year: '539 BC',
        comparisonRationale: 'Ancient clay astronomical/royal records contrasted with the complex bronze gear trains of Hellenistic mechanical science.'
      }
    ]
  },

  'sutton-hoo-helmet': {
    artifactId: 'sutton-hoo-helmet',
    artifactName: 'The Sutton Hoo Ceremonial Helmet',
    discovery: {
      siteName: 'Sutton Hoo Ship Burial, Mound 1, Woodbridge',
      historicalRegion: 'Kingdom of East Anglia, Suffolk, England',
      coordinates: { lat: 52.0898, lng: 1.3387 },
      dateDiscovered: 'July 1939 AD',
      excavatedBy: 'Basil Brown on behalf of landowner Edith Pretty',
      discoveryContext: 'Unearthed inside the collapsed burial chamber of an intact 27-meter Anglo-Saxon longship buried beneath an earthen mound.'
    },
    currentCustody: {
      institution: 'The British Museum',
      city: 'London',
      country: 'United Kingdom',
      coordinates: { lat: 51.5194, lng: -0.1270 },
      accessionNumber: 'Registration 1939,1010.93',
      galleryRoom: 'Room 41 (Sutton Hoo and Europe AD 300–1100)',
      acquisitionYear: '1939 AD',
      acquisitionMethod: 'Gifted unconditionally to the nation by landowner Edith Pretty.'
    },
    journeySummary: 'Forged c. 625 AD for an Anglo-Saxon Bretwalda, buried in Mound 1 longship, crushed into 500+ rusted shards over 1,300 years, unearthed in July 1939, sheltered in Aldwych Tube station during the Blitz, and painstakingly reconstructed at the British Museum.',
    totalDistanceKm: 115,
    totalDistanceMiles: 71,
    timeline: [
      {
        yearOrDate: 'c. 625 AD',
        stage: 'Creation & Inscription',
        location: 'East Anglia / Scandinavia',
        summary: 'Crafted with wrought iron cap, tinned bronze stampings, and Bohemian garnet-inlaid dragon crest for a supreme warrior king.',
        historicalActors: 'Master Anglo-Saxon / Vendel Armorers & King Rædwald'
      },
      {
        yearOrDate: 'July 1939',
        stage: 'Archaeological Discovery',
        location: 'Mound 1, Sutton Hoo, Suffolk',
        summary: 'Excavator Basil Brown uncovers the ship silhouette and the shattered helmet fragments days before Britain enters World War II.',
        historicalActors: 'Basil Brown, Charles Phillips, Edith Pretty'
      },
      {
        yearOrDate: '1939–1945',
        stage: 'Military / Diplomatic Transit',
        location: 'Aldwych Underground Station, London',
        summary: 'Transferred by unmarked van to London and sheltered deep in the London Underground tunnels during the Luftwaffe Blitz bombings.',
        historicalActors: 'British Museum Emergency Custodians'
      },
      {
        yearOrDate: '1947 & 1971',
        stage: 'Museum Custody & Accession',
        location: 'The British Museum Research Laboratories',
        summary: 'Reconstructed by Herbert Maryon (1947) and completely re-assembled into its authentic shape by Nigel Williams (1971).',
        historicalActors: 'Nigel Williams & British Museum Conservators'
      }
    ],
    custodyNotes: 'The defining visual icon of Anglo-Saxon England, exhibited in Room 41 beside the shining replica forged by the Royal Armouries.',
    recommendedVaultComparisons: [
      {
        vaultId: 'tutankhamun-mask',
        vaultName: 'Gold Mask of Tutankhamun',
        civilization: 'New Kingdom Egypt',
        era: 'Bronze Age',
        year: '1323 BC',
        comparisonRationale: 'Anthropomorphic royal burial visages across two different millennia—solid Egyptian gold vs Anglo-Saxon iron and red garnets.'
      },
      {
        vaultId: 'gothic-knight-plate-armor',
        vaultName: 'Gothic Full Plate Knight Armor',
        civilization: 'Holy Roman Empire',
        era: 'Late Middle Ages',
        year: '1480 AD',
        comparisonRationale: 'Early medieval Germanic tribal warrior helmet compared with late-medieval articulated Gothic plate engineering.'
      }
    ]
  },

  'tutankhamun-gold-mask': {
    artifactId: 'tutankhamun-gold-mask',
    artifactName: 'The Gold Death Mask of Tutankhamun',
    discovery: {
      siteName: 'Tomb KV62, Valley of the Kings, Luxor',
      historicalRegion: 'Theban Necropolis, Upper Egypt',
      coordinates: { lat: 25.7402, lng: 32.6014 },
      dateDiscovered: 'October 28, 1925 AD (Innermost coffin opened)',
      excavatedBy: 'Howard Carter and Lord Carnarvon',
      discoveryContext: 'Found directly upon the head and shoulders of the royal mummy inside the innermost 110-kg solid gold coffin within the four nested shrines.'
    },
    currentCustody: {
      institution: 'Grand Egyptian Museum (GEM) / Egyptian Museum',
      city: 'Giza / Cairo',
      country: 'Egypt',
      coordinates: { lat: 29.9950, lng: 31.1190 },
      accessionNumber: 'JE 60672',
      galleryRoom: 'Tutankhamun Galleries, Central State Showcase',
      acquisitionYear: '1926 AD',
      acquisitionMethod: 'Maintained as inalienable state cultural property under Egyptian Antiquities Service laws.'
    },
    journeySummary: 'Forged in 1323 BC in Thebes, sealed inside tomb KV62 for 3,248 years undisturbed, discovered by Howard Carter in October 1925, transported by rail to Cairo in 1926, and moved to the Grand Egyptian Museum in Giza as the nation’s anchor relic.',
    totalDistanceKm: 510,
    totalDistanceMiles: 317,
    timeline: [
      {
        yearOrDate: '1323 BC',
        stage: 'Creation & Inscription',
        location: 'Thebes (Luxor), Egypt',
        summary: 'Hammered from two sheets of heavy 22.5K gold with quartz and lapis lazuli inlays; inscribed with Chapter 151B of the Book of the Dead.',
        historicalActors: 'Royal Theban Goldsmiths under Pharaoh Tutankhamun'
      },
      {
        yearOrDate: 'October 28, 1925',
        stage: 'Archaeological Discovery',
        location: 'Tomb KV62, Valley of the Kings',
        summary: 'Howard Carter lifts the solid gold lid of the third nested coffin, revealing the glistening mask resting directly over the pharaoh’s face.',
        historicalActors: 'Howard Carter, Alfred Lucas, Harry Burton'
      },
      {
        yearOrDate: 'December 1926',
        stage: 'Military / Diplomatic Transit',
        location: 'Luxor to Cairo, Egypt',
        summary: 'Transported down the Nile valley aboard a specialized guarded railway carriage to the Egyptian Museum in Tahrir Square, Cairo.',
        historicalActors: 'Pierre Lacau & Egyptian Antiquities Service'
      },
      {
        yearOrDate: 'Present Day',
        stage: 'Museum Custody & Accession',
        location: 'Grand Egyptian Museum (GEM), Giza',
        summary: 'Transferred under military escort to the state-of-the-art climate-controlled Tutankhamun wing of the Grand Egyptian Museum at the foot of the Giza Pyramids.',
        historicalActors: 'Ministry of Tourism and Antiquities of Egypt'
      }
    ],
    custodyNotes: 'Protected under specialized bomb-proof anti-reflective glass with constant relative humidity (45%) and 24-hour military surveillance.',
    recommendedVaultComparisons: [
      {
        vaultId: 'bust-of-nefertiti',
        vaultName: 'Bust of Queen Nefertiti',
        civilization: '18th Dynasty Egypt (Amarna Period)',
        era: 'New Kingdom Egypt',
        year: '1345 BC',
        comparisonRationale: 'The two most famous royal facial masterpieces of Egyptian antiquity, created within decades of one another in the same 18th Dynasty.'
      },
      {
        vaultId: 'sutton-hoo-helmet',
        vaultName: 'The Sutton Hoo Ceremonial Helmet',
        civilization: 'Kingdom of East Anglia',
        era: 'Early Medieval',
        year: '625 AD',
        comparisonRationale: 'Solid gold Egyptian pharaonic funerary visage compared with early medieval Anglo-Saxon warrior face-mask.'
      }
    ]
  },

  'cyrus-cylinder': {
    artifactId: 'cyrus-cylinder',
    artifactName: 'The Cyrus Cylinder',
    discovery: {
      siteName: 'Esagila Temple of Marduk, Babylon',
      historicalRegion: 'Mesopotamia (Modern-day Hillah, Babil Governorate, Iraq)',
      coordinates: { lat: 32.5355, lng: 44.4275 },
      dateDiscovered: 'March 1879 AD',
      excavatedBy: 'Hormuzd Rassam (Assyrian-British archaeologist for the British Museum)',
      discoveryContext: 'Uncovered in the foundation deposit trenches of the ruined Esagila temple sanctuary in ancient Babylon during British Museum excavations.'
    },
    currentCustody: {
      institution: 'The British Museum',
      city: 'London',
      country: 'United Kingdom',
      coordinates: { lat: 51.5194, lng: -0.1270 },
      accessionNumber: 'BM 90920',
      galleryRoom: 'Room 55 (Rahim Irvani Gallery for Ancient Iran)',
      acquisitionYear: '1880 AD',
      acquisitionMethod: 'Excavated under imperial Ottoman firman concession and shipped to London.'
    },
    journeySummary: 'Inscribed in 539 BC upon the Persian capture of Babylon, deposited in Esagila foundations, unearthed in 1879 by Hormuzd Rassam, shipped via Bombay to London in 1880, and exhibited globally including at the United Nations in New York.',
    totalDistanceKm: 4070,
    totalDistanceMiles: 2529,
    timeline: [
      {
        yearOrDate: '539 BC',
        stage: 'Creation & Inscription',
        location: 'Babylon, Mesopotamia',
        summary: 'Clay barrel inscribed in Neo-Babylonian cuneiform proclaiming Cyrus the Great’s peaceful conquest and freeing of exiled captive peoples.',
        historicalActors: 'Cyrus the Great & Babylonian Royal Scribes'
      },
      {
        yearOrDate: 'March 1879',
        stage: 'Archaeological Discovery',
        location: 'Ruins of Babylon, Ottoman Iraq',
        summary: 'Hormuzd Rassam unearths the cylinder while trenching the southern mounds of the Esagila temple.',
        historicalActors: 'Hormuzd Rassam & British Museum Expedition'
      },
      {
        yearOrDate: '1879–1880',
        stage: 'Military / Diplomatic Transit',
        location: 'Babylon to London via Bombay',
        summary: 'Shipped down the Tigris river to Basra, onto a British steamer to Bombay, and around to London.',
        historicalActors: 'British Diplomatic Couriers'
      },
      {
        yearOrDate: '1971 AD',
        stage: 'Museum Custody & Accession',
        location: 'United Nations Headquarters, New York',
        summary: 'Translated into all official UN languages and proclaimed the ancient world’s first charter of human rights and religious tolerance.',
        historicalActors: 'United Nations & Shah Mohammad Reza Pahlavi'
      }
    ],
    custodyNotes: 'Housed in Room 55 of the British Museum; a secondary missing fragment was located at Yale University in 1970 and reunited.',
    recommendedVaultComparisons: [
      {
        vaultId: 'rosetta-stone',
        vaultName: 'The Rosetta Stone',
        civilization: 'Ptolemaic Kingdom of Egypt',
        era: 'Hellenistic Era',
        year: '196 BC',
        comparisonRationale: 'Both are foundational state manifestos proclaiming royal legitimacy and religious reconciliation across conquered empires.'
      },
      {
        vaultId: 'code-of-hammurabi',
        vaultName: 'Stele of the Code of Hammurabi',
        civilization: 'Old Babylonian Empire',
        era: 'Bronze Age Mesopotamia',
        year: '1754 BC',
        comparisonRationale: 'Clay cylinder of Persian imperial tolerance compared with towering diorite pillar of Babylonian retributive jurisprudence.'
      }
    ]
  },

  'narmer-palette': {
    artifactId: 'narmer-palette',
    artifactName: 'The Narmer Palette',
    discovery: {
      siteName: 'Temple of Horus, Hierakonpolis (Nekhen)',
      historicalRegion: 'Upper Egypt (between Edfu and Luxor)',
      coordinates: { lat: 25.0970, lng: 32.7880 },
      dateDiscovered: '1897–1898 AD',
      excavatedBy: 'James E. Quibell and Frederick W. Green',
      discoveryContext: 'Found in the "Main Deposit" ceremonial cache of the archaic temple of Horus at Hierakonpolis beneath later New Kingdom temple floor levels.'
    },
    currentCustody: {
      institution: 'The Egyptian Museum (Tahrir)',
      city: 'Cairo',
      country: 'Egypt',
      coordinates: { lat: 30.0478, lng: 31.2336 },
      accessionNumber: 'CG 14716; JE 32169',
      galleryRoom: 'Ground Floor, Room 43',
      acquisitionYear: '1902 AD',
      acquisitionMethod: 'Allocated to the national museum in Cairo upon discovery; never legally exported.'
    },
    journeySummary: 'Carved c. 3100 BC to celebrate the historic unification of Upper and Lower Egypt, deposited in the temple at Hierakonpolis, discovered in 1898 by British archaeologists Quibell and Green, and preserved in Cairo’s Tahrir Museum as an unexported national treasure.',
    totalDistanceKm: 560,
    totalDistanceMiles: 348,
    timeline: [
      {
        yearOrDate: 'c. 3100 BC',
        stage: 'Creation & Inscription',
        location: 'Hierakonpolis (Nekhen), Upper Egypt',
        summary: 'Carved from single slab of dark green-grey siltstone recording King Narmer’s triumph and unification of Upper and Lower Egypt.',
        historicalActors: 'King Narmer (Menes) & Dynasty 0 Artists'
      },
      {
        yearOrDate: 'Winter 1897–1898',
        stage: 'Archaeological Discovery',
        location: 'Hierakonpolis, Upper Egypt',
        summary: 'Excavated from the sacred Main Deposit along with the Narmer Macehead and golden Horus falcon head.',
        historicalActors: 'James E. Quibell & Frederick W. Green'
      },
      {
        yearOrDate: '1902 AD',
        stage: 'Museum Custody & Accession',
        location: 'The Egyptian Museum in Tahrir Square, Cairo',
        summary: 'Installed in Room 43 of the newly constructed neoclassical museum building designed by Marcel Dourgnon.',
        historicalActors: 'Gaston Maspero & Egyptian Antiquities Service'
      }
    ],
    custodyNotes: 'Classified as an inviolable national treasure of Egypt. By law, it is barred from foreign touring exhibitions.',
    recommendedVaultComparisons: [
      {
        vaultId: 'rosetta-stone',
        vaultName: 'The Rosetta Stone',
        civilization: 'Ptolemaic Kingdom of Egypt',
        era: 'Hellenistic Era',
        year: '196 BC',
        comparisonRationale: 'The earliest hieroglyphic document of Egyptian civilization compared with the trilingual stone that allowed modern scholars to read it.'
      }
    ]
  },

  'dead-sea-scrolls-isaiah': {
    artifactId: 'dead-sea-scrolls-isaiah',
    artifactName: 'The Great Isaiah Scroll (1QIsaᵃ)',
    discovery: {
      siteName: 'Cave 1, Qumran Cliffs, Judean Desert',
      historicalRegion: 'Dead Sea Basin, West Bank',
      coordinates: { lat: 31.7410, lng: 35.4590 },
      dateDiscovered: 'November 1946 – February 1947 AD',
      excavatedBy: 'Bedouin shepherds of the Ta\'amireh tribe (including Muhammed edh-Dhib)',
      discoveryContext: 'Discovered sealed within cylindrical earthenware jars inside a natural limestone cliff cave overlooking the northwestern shore of the Dead Sea.'
    },
    currentCustody: {
      institution: 'The Israel Museum (The Shrine of the Book)',
      city: 'Jerusalem',
      country: 'Israel',
      coordinates: { lat: 31.7725, lng: 35.2045 },
      accessionNumber: '1QIsaᵃ',
      galleryRoom: 'Central Circular Display of the Shrine of the Book',
      acquisitionYear: '1954 AD',
      acquisitionMethod: 'Purchased for $250,000 via a confidential advertisement in The Wall Street Journal by archaeologist Yigael Yadin.'
    },
    journeySummary: 'Handwritten c. 125 BC by Essene scribes on 17 sheepskin sheets, sealed in jars during the Roman siege of 68 AD, found by Bedouin shepherds in 1947, purchased via a Wall Street Journal ad in 1954, and housed in Jerusalem’s Shrine of the Book.',
    totalDistanceKm: 26,
    totalDistanceMiles: 16,
    timeline: [
      {
        yearOrDate: 'c. 125 BC',
        stage: 'Creation & Inscription',
        location: 'Qumran, Judean Desert',
        summary: 'Transcribed in 54 columns of calligraphic Hebrew square script onto 24 feet of sheepskin leather.',
        historicalActors: 'Essene Scribes of Qumran'
      },
      {
        yearOrDate: '68 AD',
        stage: 'Historical Relocation',
        location: 'Cave 1, Qumran Cliffs',
        summary: 'Sealed into earthenware jars and concealed in cliff caves to preserve sacred scripture as Legio X Fretensis approached.',
        historicalActors: 'Essenes & Zealot Defenders'
      },
      {
        yearOrDate: 'Winter 1946–1947',
        stage: 'Archaeological Discovery',
        location: 'Qumran Cave 1',
        summary: 'Bedouin shepherd Muhammed edh-Dhib tosses a rock into a cave, hears breaking pottery, and enters to find the jars.',
        historicalActors: 'Muhammed edh-Dhib & Ta\'amireh Bedouins'
      },
      {
        yearOrDate: 'June 1954',
        stage: 'Military / Diplomatic Transit',
        location: 'New York City to Jerusalem',
        summary: 'Purchased anonymously in New York by General Yigael Yadin through the Samuel Gottesman Foundation and flown to Israel.',
        historicalActors: 'Yigael Yadin & Mar Athanasius Yeshue Samuel'
      },
      {
        yearOrDate: '1965 AD',
        stage: 'Museum Custody & Accession',
        location: 'The Shrine of the Book, Jerusalem',
        summary: 'Dedicated in the purpose-built sanctuary designed by Armand Bartos and Frederick Kiesler.',
        historicalActors: 'Armand Bartos & Israel Museum Board'
      }
    ],
    custodyNotes: 'Kept in deep underground climate-controlled vaults; the circular gallery displays a facsimile while the original parchment rests in conservation darkness.',
    recommendedVaultComparisons: [
      {
        vaultId: 'cyrus-cylinder',
        vaultName: 'The Cyrus Cylinder',
        civilization: 'Achaemenid Empire',
        era: 'Ancient Near East',
        year: '539 BC',
        comparisonRationale: 'Both are foundational textual anchors for the restoration of Judea and Biblical historiography in the Second Temple era.'
      }
    ]
  },

  'terracotta-kneeling-archer': {
    artifactId: 'terracotta-kneeling-archer',
    artifactName: 'The Terracotta Army Kneeling Archer',
    discovery: {
      siteName: 'Pit 2, Mausoleum of Qin Shi Huang, Lintong',
      historicalRegion: 'Xi\'an, Shaanxi Province, China',
      coordinates: { lat: 34.3841, lng: 109.2785 },
      dateDiscovered: 'March 1974 AD',
      excavatedBy: 'Local farmers drilling a water well (including Yang Zhifa)',
      discoveryContext: 'Struck during drought well-drilling 1.5 km east of the First Emperor’s burial mound; later revealed to be an 8,000-man subterranean army.'
    },
    currentCustody: {
      institution: 'Emperor Qinshihuang\'s Mausoleum Site Museum',
      city: 'Xi\'an, Shaanxi',
      country: 'China',
      coordinates: { lat: 34.3841, lng: 109.2785 },
      accessionNumber: '006742',
      galleryRoom: 'Pit 2 (Vanguard Archer and Cavalry Formation)',
      acquisitionYear: '1979 AD (Museum Inauguration)',
      acquisitionMethod: 'Preserved and conserved in-situ within the enclosed archaeological hangar built over Pit 2.'
    },
    journeySummary: 'Fired c. 210 BC to guard the First Emperor in the afterlife, buried under collapsed timber roofs during the Chu-Han Contention, discovered by farmers drilling a well in 1974, and preserved in-situ in the Qinshihuang Site Museum in Xi\'an.',
    totalDistanceKm: 0,
    totalDistanceMiles: 0,
    timeline: [
      {
        yearOrDate: '210–209 BC',
        stage: 'Creation & Inscription',
        location: 'Lintong, Shaanxi, China',
        summary: 'Modularly sculpted from local yellow silt clay, painted with lacquer and Han purple pigment, and kiln-fired at 1,000°C.',
        historicalActors: 'Imperial Qin Potters & Conscript Artisans'
      },
      {
        yearOrDate: '206 BC',
        stage: 'Historical Relocation',
        location: 'Pit 2, Lintong',
        summary: 'Timber rafter ceilings burn and collapse during the rebellions of Xiang Yu following the collapse of the Qin Dynasty.',
        historicalActors: 'Rebel Armies of Xiang Yu'
      },
      {
        yearOrDate: 'March 29, 1974',
        stage: 'Archaeological Discovery',
        location: 'Xiyang Village, Lintong',
        summary: 'Six peasant farmers digging a well strike terracotta fragments and bronze arrowheads, notifying local cultural heritage authorities.',
        historicalActors: 'Yang Zhifa, Zhao Kangmin, Shaanxi Archaeological Team'
      },
      {
        yearOrDate: 'October 1979',
        stage: 'Museum Custody & Accession',
        location: 'Emperor Qinshihuang Mausoleum Site Museum, Xi\'an',
        summary: 'A colossal protective hangar is erected over the pits; the Kneeling Archer is displayed in an individual hermetic showcase in Pit 2.',
        historicalActors: 'State Administration of Cultural Heritage of China'
      }
    ],
    custodyNotes: 'One of the very few terracotta warriors that was recovered almost completely intact due to his low kneeling posture protecting him from timber roof cave-ins.',
    recommendedVaultComparisons: [
      {
        vaultId: 'gothic-knight-plate-armor',
        vaultName: 'Gothic Full Plate Knight Armor',
        civilization: 'Holy Roman Empire',
        era: 'Late Middle Ages',
        year: '1480 AD',
        comparisonRationale: 'Qin mass-produced ceramic military lamellar armor and crossbow readiness vs European articulated knightly steel plate defense.'
      }
    ]
  },

  'bust-of-nefertiti': {
    artifactId: 'bust-of-nefertiti',
    artifactName: 'Bust of Queen Nefertiti',
    discovery: {
      siteName: 'Workshop of Sculptor Thutmose, Tell el-Amarna',
      historicalRegion: 'Akhetaten (Middle Egypt)',
      coordinates: { lat: 27.6469, lng: 30.9022 },
      dateDiscovered: 'December 6, 1912 AD',
      excavatedBy: 'Ludwig Borchardt (German Orient Company expedition)',
      discoveryContext: 'Uncovered face-down in rubble inside House P47.1, the sculptor Thutmose’s studio, left behind when the city was abandoned after Akhenaten’s death.'
    },
    currentCustody: {
      institution: 'Neues Museum (Museumsinsel)',
      city: 'Berlin',
      country: 'Germany',
      coordinates: { lat: 52.5201, lng: 13.3977 },
      accessionNumber: 'Ägyptisches Museum Berlin, Inv. 21834',
      galleryRoom: 'North Cupola Hall (Room 210)',
      acquisitionYear: '1913 AD (Gifted to Berlin collections 1920)',
      acquisitionMethod: 'Exported under the Franco-Egyptian division of finds (*partage*) agreement between Borchardt and Gustave Lefebvre.'
    },
    journeySummary: 'Sculpted c. 1345 BC in Amarna, abandoned in Thutmose’s workshop, unearthed in Dec 1912 by Ludwig Borchardt, shipped to Berlin, hidden in a salt mine during WWII, and exhibited beneath the North Cupola of Berlin’s Neues Museum.',
    totalDistanceKm: 3190,
    totalDistanceMiles: 1982,
    timeline: [
      {
        yearOrDate: 'c. 1345 BC',
        stage: 'Creation & Inscription',
        location: 'Akhetaten (Tell el-Amarna), Egypt',
        summary: 'Chiseled in limestone with fine stucco plaster modeling by Master Sculptor Thutmose as a royal portrait studio prototype.',
        historicalActors: 'Master Sculptor Thutmose & Queen Nefertiti'
      },
      {
        yearOrDate: 'c. 1332 BC',
        stage: 'Historical Relocation',
        location: 'Amarna, Egypt',
        summary: 'Akhetaten is abandoned following the restoration of the traditional pantheon by Tutankhamun; the studio is vacated.',
        historicalActors: 'Amarna Royal Court'
      },
      {
        yearOrDate: 'December 6, 1912',
        stage: 'Archaeological Discovery',
        location: 'Workshop P47.1, Tell el-Amarna',
        summary: 'German excavator Ludwig Borchardt discovers the painted bust lying face-down in sand and debris.',
        historicalActors: 'Ludwig Borchardt & Deutsche Orient-Gesellschaft'
      },
      {
        yearOrDate: 'January 1913',
        stage: 'Military / Diplomatic Transit',
        location: 'Amarna to Berlin via Cairo',
        summary: 'Allocated to German patron James Simon under the official division of finds agreement overseen by French inspector Gustave Lefebvre.',
        historicalActors: 'James Simon & Gustave Lefebvre'
      },
      {
        yearOrDate: '1945 AD',
        stage: 'Military / Diplomatic Transit',
        location: 'Merkers Salt Mine, Thuringia, Germany',
        summary: 'Evacuated from Berlin to the Merkers potassium salt mine to avoid Allied air raids; discovered by US Third Army troops under General Patton.',
        historicalActors: 'US Army Monuments Men & General George S. Patton'
      },
      {
        yearOrDate: 'October 2009',
        stage: 'Museum Custody & Accession',
        location: 'Neues Museum, Museumsinsel Berlin',
        summary: 'Returned to the reconstructed Neues Museum, standing standalone beneath the North Cupola dome.',
        historicalActors: 'Staatliche Museen zu Berlin & David Chipperfield'
      }
    ],
    custodyNotes: 'The subject of sustained repatriation negotiations by Egypt since 1924. Photography inside Room 210 is strictly forbidden to preserve its delicate mineral pigments.',
    recommendedVaultComparisons: [
      {
        vaultId: 'tutankhamun-mask',
        vaultName: 'Gold Mask of Tutankhamun',
        civilization: 'New Kingdom Egypt (18th Dynasty)',
        era: 'New Kingdom Egypt',
        year: '1323 BC',
        comparisonRationale: 'The supreme royal sculpture of Amarna naturalism contrasted with the divine gold bullion funerary mask of Tutankhamun.'
      }
    ]
  },

  'code-of-hammurabi': {
    artifactId: 'code-of-hammurabi',
    artifactName: 'The Stele of the Code of Hammurabi',
    discovery: {
      siteName: 'Acropolis of Susa (Shush), Khuzestan Province, Iran',
      historicalRegion: 'Ancient Elam / Southwestern Persia (Originally Babylon)',
      coordinates: { lat: 32.1895, lng: 48.2436 },
      dateDiscovered: 'December 1901 – January 1902 AD',
      excavatedBy: 'Father Jean-Vincent Scheil and Jacques de Morgan',
      discoveryContext: 'Uncovered broken in three massive fragments on the tell of Susa; had been carried off as war booty from Babylon by the Elamite army in 1158 BC.'
    },
    currentCustody: {
      institution: 'Musée du Louvre',
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8606, lng: 2.3376 },
      accessionNumber: 'Sb 8',
      galleryRoom: 'Richelieu Wing, Ground Floor, Room 227',
      acquisitionYear: '1902 AD',
      acquisitionMethod: 'Shipped to France under the French monopoly treaty for Persian archaeological excavations signed with the Qajar Shah.'
    },
    journeySummary: 'Carved c. 1754 BC in Babylon, plundered to Susa in 1158 BC by Elamite King Shutruk-Nakhunte, excavated in 1901–1902 by French archaeologists, transported via Persian Gulf to Paris on naval ship La Rance, and installed in the Louvre Museum.',
    totalDistanceKm: 4260,
    totalDistanceMiles: 2647,
    timeline: [
      {
        yearOrDate: 'c. 1754 BC',
        stage: 'Creation & Inscription',
        location: 'Babylon or Sippar, Mesopotamia',
        summary: 'King Hammurabi orders 282 legal judgments carved in 4,130 lines of Akkadian cuneiform into a 4-ton diorite monolith.',
        historicalActors: 'King Hammurabi & Babylonian Master Epigraphers'
      },
      {
        yearOrDate: '1158 BC',
        stage: 'Historical Relocation',
        location: 'Babylon to Susa, Elam',
        summary: 'King Shutruk-Nakhunte raids Babylonia, captures the stele as war booty, and transports it 500 km east to his acropolis at Susa.',
        historicalActors: 'King Shutruk-Nakhunte of Elam'
      },
      {
        yearOrDate: 'December 1901',
        stage: 'Archaeological Discovery',
        location: 'Tell of Susa, Khuzestan, Qajar Iran',
        summary: 'Jacques de Morgan and Father Jean-Vincent Scheil excavate the three interlocking broken diorite pieces from the ancient Elamite citadel.',
        historicalActors: 'Jacques de Morgan & Father Jean-Vincent Scheil'
      },
      {
        yearOrDate: 'April 1902',
        stage: 'Military / Diplomatic Transit',
        location: 'Susa to Paris aboard French warship La Rance',
        summary: 'Transported across Khuzestan to the Persian Gulf port of Mohammerah (Khorramshahr) and loaded onto the naval sloop La Rance for transit to Marseille and Paris.',
        historicalActors: 'French Naval Officers & Louvre Curators'
      },
      {
        yearOrDate: '1903 AD',
        stage: 'Museum Custody & Accession',
        location: 'Musée du Louvre, Paris',
        summary: 'Father Scheil publishes the complete cuneiform transcription and French translation within six months; installed permanently in the Richelieu Wing.',
        historicalActors: 'Father Jean-Vincent Scheil & Musée du Louvre'
      }
    ],
    custodyNotes: 'The monolithic 2.25-meter pillar stands in the center of Room 227 of the Louvre’s Near Eastern Antiquities Department.',
    recommendedVaultComparisons: [
      {
        vaultId: 'rosetta-stone',
        vaultName: 'The Rosetta Stone',
        civilization: 'Ptolemaic Kingdom of Egypt',
        era: 'Hellenistic Era',
        year: '196 BC',
        comparisonRationale: 'Monumental royal inscription on hard stone proclaiming codified rule and religious authority in ancient world empires.'
      },
      {
        vaultId: 'cyrus-cylinder',
        vaultName: 'The Cyrus Cylinder',
        civilization: 'Achaemenid Empire',
        era: 'Ancient Near East',
        year: '539 BC',
        comparisonRationale: 'Babylonian legal punitive retribution (*lex talionis*) contrasted with Persian imperial religious tolerance and civil repatriation.'
      }
    ]
  }
};

export function getArtifactProvenance(artifactId: string): ArtifactProvenanceInfo | undefined {
  return ARTIFACT_PROVENANCE_DATA[artifactId];
}
