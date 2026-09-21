export interface CivilizationDataPoint {
  year: number;
  yearLabel: string;
  era: 'Ancient' | 'Classical' | 'Medieval' | 'Early Modern' | 'Modern';
  population: number; // In Millions
  territory: number; // In Million km²
  worldSharePct?: number; // Estimated % of global population
  capitalUrbanPop?: number; // In Thousands
  milestone?: string;
  milestoneDesc?: string;
  rulerOrLeader?: string;
}

export interface CivilizationHistoricalProfile {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  region: string;
  color: string;
  gradientId: string;
  peakTerritory: number; // In Million km²
  peakTerritoryYear: string;
  peakTerritoryEra: string;
  peakPopulation: number; // In Millions
  peakPopulationYear: string;
  peakWorldShare: number; // %
  riseFactor: string;
  fallFactor: string;
  enduringLegacy: string;
  dataPoints: CivilizationDataPoint[];
}

export const CIVILIZATION_PROFILES: CivilizationHistoricalProfile[] = [
  {
    id: 'rome',
    name: 'Roman Empire / Classical Italy',
    shortName: 'Rome',
    flag: '🏛️',
    region: 'Mediterranean / Southern Europe',
    color: '#E11D48', // Rose / Imperial Red
    gradientId: 'colorRome',
    peakTerritory: 5.0,
    peakTerritoryYear: '117 AD',
    peakTerritoryEra: 'Trajan\'s Zenith',
    peakPopulation: 70,
    peakPopulationYear: '160 AD',
    peakWorldShare: 28.5,
    riseFactor: 'Discipline of legionary warfare, standard Roman civil law, and engineering networks of paved roads and volcanic concrete aqueducts.',
    fallFactor: 'Antonine & Cyprian plagues, political fragmentation, fiscal inflation, and devastating Germanic migration invasions culminating in 476 AD.',
    enduringLegacy: 'Roman civil law foundations, Latin alphabet, Senate governance models, and Christianization of the Western world.',
    dataPoints: [
      { year: -500, yearLabel: '500 BC', era: 'Ancient', population: 0.15, territory: 0.001, capitalUrbanPop: 35, milestone: 'Birth of the Roman Republic', milestoneDesc: 'Expulsion of the Tarquin monarchs and establishment of the Senate.', rulerOrLeader: 'Lucius Junius Brutus' },
      { year: -275, yearLabel: '275 BC', era: 'Classical', population: 4.0, territory: 0.13, capitalUrbanPop: 150, milestone: 'Hegemony over Italian Peninsula', milestoneDesc: 'Defeat of Pyrrhus and annexation of Magna Graecia.', rulerOrLeader: 'Consular Senate' },
      { year: -146, yearLabel: '146 BC', era: 'Classical', population: 14.0, territory: 0.8, capitalUrbanPop: 300, milestone: 'Destruction of Carthage & Greece', milestoneDesc: 'Rome becomes undisputed master of the Western and Eastern Mediterranean.', rulerOrLeader: 'Scipio Aemilianus' },
      { year: -44, yearLabel: '44 BC', era: 'Classical', population: 35.0, territory: 2.2, capitalUrbanPop: 650, milestone: 'Julius Caesar\'s Gallic Conquest', milestoneDesc: 'Annexation of Gaul and transition from Republic to Empire.', rulerOrLeader: 'Julius Caesar' },
      { year: 14, yearLabel: '14 AD', era: 'Classical', population: 54.0, territory: 3.8, worldSharePct: 24.5, capitalUrbanPop: 850, milestone: 'Pax Romana inaugurated by Augustus', milestoneDesc: 'Establishment of the Principate and monumental marble rebuilding.', rulerOrLeader: 'Augustus Caesar' },
      { year: 117, yearLabel: '117 AD', era: 'Classical', population: 68.0, territory: 5.0, worldSharePct: 29.0, capitalUrbanPop: 1000, milestone: 'Trajan Zenith: Maximum Territorial Extent', milestoneDesc: 'Conquest of Dacia and Mesopotamia stretches Rome from Scotland to the Persian Gulf.', rulerOrLeader: 'Emperor Trajan' },
      { year: 165, yearLabel: '165 AD', era: 'Classical', population: 70.0, territory: 4.8, worldSharePct: 28.5, capitalUrbanPop: 950, milestone: 'Antonine Plague Outbreak', milestoneDesc: 'Devastating pandemic wipes out up to 30% of military and urban population.', rulerOrLeader: 'Marcus Aurelius' },
      { year: 285, yearLabel: '285 AD', era: 'Classical', population: 52.0, territory: 4.2, worldSharePct: 22.0, capitalUrbanPop: 700, milestone: 'Diocletian\'s Tetrarchy Division', milestoneDesc: 'Empire split into Western and Eastern administrative halves to manage crises.', rulerOrLeader: 'Diocletian' },
      { year: 395, yearLabel: '395 AD', era: 'Classical', population: 45.0, territory: 3.9, worldSharePct: 18.0, capitalUrbanPop: 500, milestone: 'Permanent East-West Partition', milestoneDesc: 'Final split of the Empire between Honorius and Arcadius.', rulerOrLeader: 'Theodosius I' },
      { year: 476, yearLabel: '476 AD', era: 'Medieval', population: 28.0, territory: 2.1, worldSharePct: 11.5, capitalUrbanPop: 100, milestone: 'Fall of the Western Roman Empire', milestoneDesc: 'Odoacer deposes Romulus Augustulus; Eastern Byzantine Empire endures in Constantinople.', rulerOrLeader: 'Romulus Augustulus / Odoacer' },
      { year: 555, yearLabel: '555 AD', era: 'Medieval', population: 32.0, territory: 2.7, worldSharePct: 12.0, capitalUrbanPop: 350, milestone: 'Justinian\'s Byzantine Reconquest', milestoneDesc: 'General Belisarius retakes Italy and North Africa before the Justinian Plague struck.', rulerOrLeader: 'Justinian I' },
      { year: 1000, yearLabel: '1000 AD', era: 'Medieval', population: 18.0, territory: 1.1, worldSharePct: 6.5, capitalUrbanPop: 500, milestone: 'Byzantine Golden Age of Basil II', milestoneDesc: 'Eastern Roman Empire reaches medieval apex before the Crusades.', rulerOrLeader: 'Basil II Bulgaroktonos' },
      { year: 1453, yearLabel: '1453 AD', era: 'Medieval', population: 7.0, territory: 0.05, worldSharePct: 1.8, capitalUrbanPop: 50, milestone: 'Fall of Constantinople', milestoneDesc: 'Ottoman forces breach the Theodosian Walls, ending Roman imperial lineage.', rulerOrLeader: 'Constantine XI Palaiologos' },
      { year: 1861, yearLabel: '1861 AD', era: 'Modern', population: 26.0, territory: 0.3, worldSharePct: 2.0, capitalUrbanPop: 200, milestone: 'Unification of Italy (Risorgimento)', milestoneDesc: 'Garibaldi and Cavour unify the fractured Italian merchant city-states into a modern Kingdom.', rulerOrLeader: 'Victor Emmanuel II' },
      { year: 2024, yearLabel: '2024 AD', era: 'Modern', population: 59.0, territory: 0.301, worldSharePct: 0.73, capitalUrbanPop: 2870, milestone: 'Modern Italian Republic & EU Founder', milestoneDesc: 'Advanced G7 industrial economy, global leader in high design and cultural heritage.', rulerOrLeader: 'Sergio Mattarella' }
    ]
  },
  {
    id: 'china',
    name: 'Imperial China (Qin, Han, Tang, Ming, Qing)',
    shortName: 'China',
    flag: '🐉',
    region: 'East Asia',
    color: '#D4AF37', // Imperial Gold
    gradientId: 'colorChina',
    peakTerritory: 14.7,
    peakTerritoryYear: '1790 AD',
    peakTerritoryEra: 'Qing Qianlong Zenith',
    peakPopulation: 430,
    peakPopulationYear: '1850 AD',
    peakWorldShare: 35.0,
    riseFactor: 'Meritocratic Confucian civil exams, hydraulic agriculture along Yangtze and Yellow Rivers, standardized scripts and currencies.',
    fallFactor: 'Dynastic cycle transitions, northern nomadic incursions (Jurchens, Mongols), peasant rebellions, and 19th-century colonial Opium Wars.',
    enduringLegacy: 'The Four Great Inventions (Compass, Gunpowder, Papermaking, Printing), Silk Road trade networks, and East Asian civil administration.',
    dataPoints: [
      { year: -221, yearLabel: '221 BC', era: 'Classical', population: 20.0, territory: 2.3, capitalUrbanPop: 200, milestone: 'Qin Shi Huang Unifies China', milestoneDesc: 'Standardization of Chinese characters, wheel gauges, and construction of the Great Wall.', rulerOrLeader: 'Qin Shi Huang' },
      { year: 2, yearLabel: '2 AD', era: 'Classical', population: 59.5, territory: 6.0, worldSharePct: 26.0, capitalUrbanPop: 400, milestone: 'Han Dynasty Census Peak', milestoneDesc: 'First recorded imperial census confirms 59.5 million citizens and Silk Road zenith.', rulerOrLeader: 'Emperor Ping of Han' },
      { year: 220, yearLabel: '220 AD', era: 'Classical', population: 23.0, territory: 3.5, worldSharePct: 11.0, capitalUrbanPop: 150, milestone: 'Collapse into Three Kingdoms', milestoneDesc: 'Catastrophic civil wars (Wei, Shu, Wu) decimate agricultural yields and census counts.', rulerOrLeader: 'Cao Cao / Liu Bei' },
      { year: 600, yearLabel: '600 AD', era: 'Medieval', population: 46.0, territory: 4.8, worldSharePct: 20.0, capitalUrbanPop: 500, milestone: 'Sui Dynasty & Grand Canal Construction', milestoneDesc: 'Reunification of North and South China through the 1,700km Grand Canal waterway.', rulerOrLeader: 'Emperor Wen of Sui' },
      { year: 750, yearLabel: '750 AD', era: 'Medieval', population: 80.0, territory: 5.4, worldSharePct: 28.0, capitalUrbanPop: 1000, milestone: 'Tang Dynasty Cosmopolitan Golden Age', milestoneDesc: 'Chang\'an becomes world\'s largest metropolis with 1 million people; flourishing poetry and trade.', rulerOrLeader: 'Emperor Xuanzong of Tang' },
      { year: 760, yearLabel: '760 AD', era: 'Medieval', population: 50.0, territory: 3.8, worldSharePct: 18.0, capitalUrbanPop: 450, milestone: 'Devastating An Lushan Rebellion', milestoneDesc: 'Cataclysmic civil conflict reduces taxable households and weakens central imperial authority.', rulerOrLeader: 'Tang Suzong' },
      { year: 1100, yearLabel: '1100 AD', era: 'Medieval', population: 100.0, territory: 3.1, worldSharePct: 30.0, capitalUrbanPop: 1200, milestone: 'Song Dynasty Commercial & Tech Revolution', milestoneDesc: 'Invention of moveable type printing, magnetic navigation compass, and paper currency.', rulerOrLeader: 'Emperor Huizong' },
      { year: 1279, yearLabel: '1279 AD', era: 'Medieval', population: 75.0, territory: 13.7, worldSharePct: 21.0, capitalUrbanPop: 800, milestone: 'Mongol Yuan Dynasty of Kublai Khan', milestoneDesc: 'Integration of China into the vast Pax Mongolica land trade network.', rulerOrLeader: 'Kublai Khan' },
      { year: 1500, yearLabel: '1500 AD', era: 'Early Modern', population: 125.0, territory: 6.5, worldSharePct: 26.0, capitalUrbanPop: 700, milestone: 'Ming Dynasty Maritime & Cultural Zenith', milestoneDesc: 'Zheng He treasure fleets voyage to Africa; Forbidden City built in Beijing.', rulerOrLeader: 'Yongle Emperor' },
      { year: 1790, yearLabel: '1790 AD', era: 'Early Modern', population: 300.0, territory: 14.7, worldSharePct: 34.0, capitalUrbanPop: 900, milestone: 'High Qing Dynasty Maximum Territorial Reach', milestoneDesc: 'Emperor Qianlong\'s Ten Great Campaigns expand borders across Tibet, Xinjiang, and Mongolia.', rulerOrLeader: 'Qianlong Emperor' },
      { year: 1850, yearLabel: '1850 AD', era: 'Modern', population: 430.0, territory: 13.5, worldSharePct: 35.0, capitalUrbanPop: 1000, milestone: 'Taiping Rebellion & Opium Wars Stress', milestoneDesc: 'Deadliest civil conflict in human history wipes out 20-30 million people amidst foreign pressure.', rulerOrLeader: 'Xianfeng Emperor' },
      { year: 1911, yearLabel: '1911 AD', era: 'Modern', population: 410.0, territory: 11.1, worldSharePct: 23.0, capitalUrbanPop: 800, milestone: 'Xinhai Revolution & Fall of Imperial Era', milestoneDesc: 'Sun Yat-sen establishes the Republic of China, ending 2,132 years of imperial dynastic rule.', rulerOrLeader: 'Dr. Sun Yat-sen' },
      { year: 2024, yearLabel: '2024 AD', era: 'Modern', population: 1410.0, territory: 9.6, worldSharePct: 17.5, capitalUrbanPop: 21500, milestone: 'Modern Global Economic & High-Tech Power', milestoneDesc: 'Second largest global GDP, leader in renewable tech, high-speed rail, and space exploration.', rulerOrLeader: 'Xi Jinping' }
    ]
  },
  {
    id: 'india',
    name: 'Ancient & Dynastic India (Maurya, Gupta, Mughal)',
    shortName: 'India',
    flag: '🦚',
    region: 'South Asia',
    color: '#10B981', // Emerald / Saffron Green
    gradientId: 'colorIndia',
    peakTerritory: 5.0,
    peakTerritoryYear: '250 BC',
    peakTerritoryEra: 'Ashoka\'s Maurya Empire',
    peakPopulation: 160,
    peakPopulationYear: '1700 AD',
    peakWorldShare: 27.0,
    riseFactor: 'Agrarian wealth along the fertile Indo-Gangetic plains, maritime spice guilds across Indian Ocean, foundational math (Zero, Decimal).',
    fallFactor: 'Succession wars, fragmentation into regional sultanates/princely states, and mercantile colonization by the British East India Company.',
    enduringLegacy: 'Invention of zero (0) and decimal system, Ayurvedic medicine, Buddhism and Hinduism philosophy, global spice and textile dominance.',
    dataPoints: [
      { year: -2500, yearLabel: '2500 BC', era: 'Ancient', population: 5.0, territory: 1.2, capitalUrbanPop: 40, milestone: 'Indus Valley Civilization Apex', milestoneDesc: 'Mohenjo-daro and Harappa feature standardized brick grid cities and municipal drainage.', rulerOrLeader: 'Harappan Civic Guilds' },
      { year: -500, yearLabel: '500 BC', era: 'Ancient', population: 20.0, territory: 1.8, capitalUrbanPop: 120, milestone: 'Mahajanapadas & Buddhist Awakening', milestoneDesc: 'Gautama Buddha teaches the Middle Way; rise of the Magadha kingdom.', rulerOrLeader: 'Bimbisara / Buddha' },
      { year: -250, yearLabel: '250 BC', era: 'Classical', population: 50.0, territory: 5.0, worldSharePct: 33.0, capitalUrbanPop: 400, milestone: 'Ashoka the Great\'s Maurya Zenith', milestoneDesc: 'After the Kadesh-like Kalinga War, Ashoka embraces Buddhist non-violence and engraves edicts.', rulerOrLeader: 'Samrat Ashoka' },
      { year: 400, yearLabel: '400 AD', era: 'Classical', population: 45.0, territory: 3.5, worldSharePct: 22.0, capitalUrbanPop: 300, milestone: 'Gupta Empire Golden Age', milestoneDesc: 'Mathematician Aryabhata calculates Pi and earth rotation; Kalidasa writes Sanskrit masterworks.', rulerOrLeader: 'Chandragupta II (Vikramaditya)' },
      { year: 1025, yearLabel: '1025 AD', era: 'Medieval', population: 75.0, territory: 2.2, worldSharePct: 24.0, capitalUrbanPop: 250, milestone: 'Chola Maritime Imperial Expansion', milestoneDesc: 'Rajendra Chola sends deep naval expeditions to Sri Lanka and the Srivijaya Empire in Southeast Asia.', rulerOrLeader: 'Rajendra Chola I' },
      { year: 1335, yearLabel: '1335 AD', era: 'Medieval', population: 80.0, territory: 3.2, worldSharePct: 21.0, capitalUrbanPop: 350, milestone: 'Delhi Sultanate Maximum Extent', milestoneDesc: 'Tughlaq dynasty governs nearly the entirety of the subcontinent from Delhi.', rulerOrLeader: 'Muhammad bin Tughluq' },
      { year: 1600, yearLabel: '1600 AD', era: 'Early Modern', population: 135.0, territory: 3.5, worldSharePct: 24.0, capitalUrbanPop: 500, milestone: 'Akbar\'s Mughal Golden Era of Tolerance', milestoneDesc: 'Sulh-i-Kul policy of religious coexistence and agrarian revenue standardization.', rulerOrLeader: 'Akbar the Great' },
      { year: 1700, yearLabel: '1700 AD', era: 'Early Modern', population: 160.0, territory: 4.0, worldSharePct: 27.0, capitalUrbanPop: 600, milestone: 'Mughal Zenith under Aurangzeb', milestoneDesc: 'India generates ~25% of global GDP, dominant exporter of fine calico and silk textiles.', rulerOrLeader: 'Aurangzeb' },
      { year: 1857, yearLabel: '1857 AD', era: 'Modern', population: 175.0, territory: 4.2, worldSharePct: 14.0, capitalUrbanPop: 400, milestone: 'First War of Indian Independence & Direct Crown Rule', milestoneDesc: 'Sepoy Mutiny dissolves the East India Company, initiating the direct British Raj administration.', rulerOrLeader: 'Bahadur Shah Zafar / Queen Victoria' },
      { year: 1947, yearLabel: '1947 AD', era: 'Modern', population: 340.0, territory: 3.287, worldSharePct: 14.2, capitalUrbanPop: 1500, milestone: 'Indian Independence & World\'s Largest Democracy', milestoneDesc: 'Non-violent Satyagraha led by Mahatma Gandhi culminates in sovereign parliamentary democracy.', rulerOrLeader: 'Jawaharlal Nehru' },
      { year: 2024, yearLabel: '2024 AD', era: 'Modern', population: 1440.0, territory: 3.287, worldSharePct: 17.8, capitalUrbanPop: 33000, milestone: 'World\'s Most Populous Nation & Space Pioneer', milestoneDesc: 'Chandrayaan lunar south-pole landing, global digital payment (UPI) leadership, fastest growing major economy.', rulerOrLeader: 'Narendra Modi' }
    ]
  },
  {
    id: 'egypt',
    name: 'Ancient & Dynastic Egypt (Pharaonic, Ptolemaic, Islamic)',
    shortName: 'Egypt',
    flag: '𓂀',
    region: 'Northeast Africa / Nile Basin',
    color: '#F59E0B', // Amber / Sun Gold
    gradientId: 'colorEgypt',
    peakTerritory: 4.0,
    peakTerritoryYear: '975 AD',
    peakTerritoryEra: 'Fatimid Caliphate Zenith',
    peakPopulation: 110,
    peakPopulationYear: '2024 AD',
    peakWorldShare: 7.5,
    riseFactor: 'Annual predictable flooding of the Nile providing agricultural surplus, monumental stone architecture, and papyrus trade.',
    fallFactor: 'Bronze Age collapse stresses, Persian and Roman conquests, changing maritime routes bypassing the Red Sea.',
    enduringLegacy: 'Monumental Pyramids of Giza, papyrus paper manufacturing, 365-day solar calendar, and the Great Library of Alexandria.',
    dataPoints: [
      { year: -3100, yearLabel: '3100 BC', era: 'Ancient', population: 1.0, territory: 0.1, capitalUrbanPop: 20, milestone: 'Unification of Upper & Lower Egypt', milestoneDesc: 'King Narmer unifies the Two Lands, establishing the First Dynasty.', rulerOrLeader: 'Pharaoh Narmer' },
      { year: -2560, yearLabel: '2560 BC', era: 'Ancient', population: 1.8, territory: 0.4, capitalUrbanPop: 35, milestone: 'Great Pyramid of Giza Completed', milestoneDesc: 'Monuments built under Khufu stand as tallest human structures for 3,800 years.', rulerOrLeader: 'Pharaoh Khufu' },
      { year: -1274, yearLabel: '1274 BC', era: 'Ancient', population: 3.5, territory: 1.0, worldSharePct: 5.5, capitalUrbanPop: 80, milestone: 'Battle of Kadesh & World\'s First Peace Treaty', milestoneDesc: 'Ramesses II expands imperial borders into the Levant and constructs Abu Simbel.', rulerOrLeader: 'Ramesses II' },
      { year: -300, yearLabel: '300 BC', era: 'Classical', population: 4.5, territory: 1.1, worldSharePct: 3.0, capitalUrbanPop: 300, milestone: 'Ptolemaic Dynasty & Great Library of Alexandria', milestoneDesc: 'Alexandria becomes the intellectual capital of the ancient world; Pharos lighthouse built.', rulerOrLeader: 'Ptolemy I Soter' },
      { year: -30, yearLabel: '30 BC', era: 'Classical', population: 5.5, territory: 1.0, worldSharePct: 2.8, capitalUrbanPop: 400, milestone: 'Cleopatra VII & Roman Annexation', milestoneDesc: 'Octavian defeats Antony and Cleopatra; Egypt becomes Rome\'s personal imperial granary.', rulerOrLeader: 'Cleopatra VII' },
      { year: 642, yearLabel: '642 AD', era: 'Medieval', population: 4.0, territory: 1.0, worldSharePct: 1.9, capitalUrbanPop: 150, milestone: 'Islamic Liberation & Founding of Fustat (Cairo)', milestoneDesc: 'Amr ibn al-As brings Egypt into the early Caliphate; emergence of Islamic culture.', rulerOrLeader: 'Amr ibn al-As' },
      { year: 975, yearLabel: '975 AD', era: 'Medieval', population: 6.0, territory: 4.0, worldSharePct: 2.4, capitalUrbanPop: 350, milestone: 'Fatimid Caliphate Golden Age', milestoneDesc: 'Founding of modern Cairo and Al-Azhar University, ruling from North Africa to Syria and Hijaz.', rulerOrLeader: 'Caliph Al-Mu\'izz' },
      { year: 1260, yearLabel: '1260 AD', era: 'Medieval', population: 5.0, territory: 1.8, worldSharePct: 1.4, capitalUrbanPop: 400, milestone: 'Mamluks Halt the Mongol Advance at Ain Jalut', milestoneDesc: 'Sultan Baibars secures Egypt and Levant, preserving Islamic heartland from Mongol sack.', rulerOrLeader: 'Sultan Qutuz / Baibars' },
      { year: 1869, yearLabel: '1869 AD', era: 'Modern', population: 7.0, territory: 1.0, worldSharePct: 0.5, capitalUrbanPop: 300, milestone: 'Opening of the Suez Canal', milestoneDesc: 'Khedive Ismail opens the global maritime shipping bottleneck connecting the Mediterranean and Red Sea.', rulerOrLeader: 'Khedive Ismail' },
      { year: 1956, yearLabel: '1956 AD', era: 'Modern', population: 24.0, territory: 1.002, worldSharePct: 0.85, capitalUrbanPop: 3500, milestone: 'Suez Crisis & Republic Independence', milestoneDesc: 'Gamal Abdel Nasser nationalizes the Suez Canal, championing Pan-Arab sovereignty.', rulerOrLeader: 'Gamal Abdel Nasser' },
      { year: 2024, yearLabel: '2024 AD', era: 'Modern', population: 112.0, territory: 1.002, worldSharePct: 1.38, capitalUrbanPop: 22000, milestone: 'New Administrative Capital & Grand Museum', milestoneDesc: 'Egypt builds modern mega-projects, housing the world\'s largest single-civilization museum.', rulerOrLeader: 'Abdel Fattah el-Sisi' }
    ]
  },
  {
    id: 'greece',
    name: 'Classical Greece & Hellenistic Empire',
    shortName: 'Greece',
    flag: '🏛️',
    region: 'Balkans / Eastern Mediterranean',
    color: '#06B6D4', // Cyan / Aegean Blue
    gradientId: 'colorGreece',
    peakTerritory: 5.2,
    peakTerritoryYear: '323 BC',
    peakTerritoryEra: 'Alexander the Great\'s Empire',
    peakPopulation: 25,
    peakPopulationYear: '323 BC',
    peakWorldShare: 16.0,
    riseFactor: 'Competitive city-state democracy, Aegean seafaring trade, Athenian naval triremes, and Macedonian phalanx tactical discipline.',
    fallFactor: 'Peloponnesian War self-destruction, fragmentation among the Diadochi (Alexander\'s generals), and Roman military subjugation.',
    enduringLegacy: 'Invention of direct democracy, Western philosophy (Socrates, Plato, Aristotle), Euclidean geometry, and the Olympic Games.',
    dataPoints: [
      { year: -776, yearLabel: '776 BC', era: 'Ancient', population: 1.2, territory: 0.08, capitalUrbanPop: 15, milestone: 'First Olympic Games in Olympia', milestoneDesc: 'Establishment of the sacred pan-Hellenic athletic truce among independent poleis.', rulerOrLeader: 'King Iphitos of Elis' },
      { year: -490, yearLabel: '490 BC', era: 'Classical', population: 2.8, territory: 0.12, capitalUrbanPop: 50, milestone: 'Battle of Marathon & Greco-Persian Wars', milestoneDesc: 'Athenian hoplites defeat Darius I\'s invading forces, safeguarding nascent democratic ideals.', rulerOrLeader: 'Miltiades' },
      { year: -440, yearLabel: '440 BC', era: 'Classical', population: 3.2, territory: 0.18, capitalUrbanPop: 100, milestone: 'Periclean Golden Age & Parthenon Construction', milestoneDesc: 'Athens flourishes as intellectual beacon; Socrates debates in the Agora; Sophocles stages tragedies.', rulerOrLeader: 'Pericles' },
      { year: -404, yearLabel: '404 BC', era: 'Classical', population: 2.5, territory: 0.1, capitalUrbanPop: 60, milestone: 'Peloponnesian War Catastrophe', milestoneDesc: 'Sparta defeats Athens after 27 years of devastating civil war, depleting Greek city-state manpower.', rulerOrLeader: 'Lysander' },
      { year: -334, yearLabel: '334 BC', era: 'Classical', population: 6.0, territory: 1.5, capitalUrbanPop: 80, milestone: 'Alexander the Great Crosses the Hellespont', milestoneDesc: 'Macedonian phalanxes and companion cavalry launch the overthrow of the Persian Empire.', rulerOrLeader: 'Alexander the Great' },
      { year: -323, yearLabel: '323 BC', era: 'Classical', population: 25.0, territory: 5.2, worldSharePct: 16.0, capitalUrbanPop: 200, milestone: 'Alexander\'s Hellenistic Apex', milestoneDesc: 'Empire spans Greece, Egypt, Mesopotamia, Persia to Punjab before Alexander\'s sudden death at Babylon.', rulerOrLeader: 'Alexander the Great' },
      { year: -146, yearLabel: '146 BC', era: 'Classical', population: 3.0, territory: 0.13, worldSharePct: 1.8, capitalUrbanPop: 40, milestone: 'Battle of Corinth & Roman Annexation', milestoneDesc: 'Rome turns Greece into the province of Achaea; Horace notes: "Captive Greece took captive her rude conqueror."', rulerOrLeader: 'Lucius Mummius' },
      { year: 1821, yearLabel: '1821 AD', era: 'Modern', population: 2.2, territory: 0.05, worldSharePct: 0.2, capitalUrbanPop: 30, milestone: 'Greek War of Independence', milestoneDesc: 'Greeks rise against four centuries of Ottoman rule, establishing the modern Hellenic state in 1830.', rulerOrLeader: 'Theodoros Kolokotronis' },
      { year: 2024, yearLabel: '2024 AD', era: 'Modern', population: 10.4, territory: 0.132, worldSharePct: 0.13, capitalUrbanPop: 3150, milestone: 'Modern Hellenic Republic & Maritime Leader', milestoneDesc: 'World\'s largest merchant shipping fleet by vessel deadweight tonnage, premier cultural tourism destination.', rulerOrLeader: 'Kyriakos Mitsotakis' }
    ]
  },
  {
    id: 'france',
    name: 'France (Carolingian, Kingdom, Napoleonic Empire)',
    shortName: 'France',
    flag: '⚜️',
    region: 'Western Europe',
    color: '#3B82F6', // Royal French Blue
    gradientId: 'colorFrance',
    peakTerritory: 11.5,
    peakTerritoryYear: '1920 AD',
    peakTerritoryEra: 'French Colonial Empire',
    peakPopulation: 110,
    peakPopulationYear: '1920 AD',
    peakWorldShare: 5.8,
    riseFactor: 'Rich arable Western European soils, early royal administrative centralization, Enlightenment philosophy, and Napoleonic military mobilization.',
    fallFactor: 'Devastating European coalition wars (Napoleonic), catastrophic demographic losses in WWI (Battle of Verdun), post-WWII decolonization.',
    enduringLegacy: 'Declaration of the Rights of Man, Metric system standardization, Napoleonic Civil Code, Gothic architectural engineering.',
    dataPoints: [
      { year: 800, yearLabel: '800 AD', era: 'Medieval', population: 15.0, territory: 1.2, worldSharePct: 6.5, capitalUrbanPop: 25, milestone: 'Coronation of Charlemagne as Emperor', milestoneDesc: 'Pope Leo III crowns Charlemagne in Rome, uniting Western Europe under the Carolingian crown.', rulerOrLeader: 'Charlemagne' },
      { year: 1300, yearLabel: '1300 AD', era: 'Medieval', population: 17.0, territory: 0.45, worldSharePct: 4.8, capitalUrbanPop: 200, milestone: 'High Medieval Capetian Zenith', milestoneDesc: 'Paris becomes Europe\'s largest intellectual center with the University of Paris and Notre Dame.', rulerOrLeader: 'Philip IV the Fair' },
      { year: 1348, yearLabel: '1348 AD', era: 'Medieval', population: 11.5, territory: 0.45, worldSharePct: 3.1, capitalUrbanPop: 120, milestone: 'Black Death Pandemic Decimation', milestoneDesc: 'The bubonic plague wipes out roughly a third of the French population amidst the Hundred Years\' War.', rulerOrLeader: 'Philip VI' },
      { year: 1429, yearLabel: '1429 AD', era: 'Medieval', population: 13.0, territory: 0.5, worldSharePct: 3.3, capitalUrbanPop: 150, milestone: 'Joan of Arc Lifts Siege of Orléans', milestoneDesc: 'Seventeen-year-old peasant girl rallies French armies, reversing the tide of the Hundred Years\' War.', rulerOrLeader: 'Joan of Arc / Charles VII' },
      { year: 1700, yearLabel: '1700 AD', era: 'Early Modern', population: 21.5, territory: 0.55, worldSharePct: 3.5, capitalUrbanPop: 500, milestone: 'The Sun King\'s Reign & Palace of Versailles', milestoneDesc: 'Louis XIV centralizes absolutist power, establishing France as Europe\'s preeminent cultural and military giant.', rulerOrLeader: 'Louis XIV' },
      { year: 1789, yearLabel: '1789 AD', era: 'Early Modern', population: 28.0, territory: 0.55, worldSharePct: 2.8, capitalUrbanPop: 650, milestone: 'Outbreak of the French Revolution', milestoneDesc: 'Storming of the Bastille and proclamation of the Declaration of the Rights of Man and of the Citizen.', rulerOrLeader: 'National Assembly' },
      { year: 1812, yearLabel: '1812 AD', era: 'Modern', population: 44.0, territory: 2.5, worldSharePct: 4.4, capitalUrbanPop: 700, milestone: 'Napoleonic First French Empire Zenith', milestoneDesc: 'Napoleon dominates continental Europe with the Grande Armée prior to the catastrophic Russian campaign.', rulerOrLeader: 'Napoleon Bonaparte' },
      { year: 1920, yearLabel: '1920 AD', era: 'Modern', population: 100.0, territory: 11.5, worldSharePct: 5.3, capitalUrbanPop: 2900, milestone: 'French Global Colonial Empire Zenith', milestoneDesc: 'France administers extensive territories across North Africa, Indochina, West Africa, and the Levant.', rulerOrLeader: 'Alexandre Millerand' },
      { year: 2024, yearLabel: '2024 AD', era: 'Modern', population: 68.0, territory: 0.643, worldSharePct: 0.84, capitalUrbanPop: 11200, milestone: 'Modern French Republic & Nuclear Power', milestoneDesc: 'UN Security Council permanent member, leading space (Ariane) and high-speed rail (TGV) aerospace innovator.', rulerOrLeader: 'Emmanuel Macron' }
    ]
  },
  {
    id: 'mongol',
    name: 'The Mongol Empire (Pax Mongolica)',
    shortName: 'Mongols',
    flag: '🏹',
    region: 'Central Asia / Eurasia',
    color: '#8B5CF6', // Imperial Violet / Steppe
    gradientId: 'colorMongol',
    peakTerritory: 24.0,
    peakTerritoryYear: '1279 AD',
    peakTerritoryEra: 'Kublai Khan\'s Unified Khanates',
    peakPopulation: 110,
    peakPopulationYear: '1279 AD',
    peakWorldShare: 26.0,
    riseFactor: 'Mastery of nomadic composite bow horse archery, meritocratic military organization into decimal units (Tumens), and Yam postal courier system.',
    fallFactor: 'Succession crises, assimilation into local cultures (Ilkhanate, Golden Horde, Yuan), and vast distances impeding centralized control.',
    enduringLegacy: 'Largest contiguous land empire in human history, re-opened the Silk Road uniting European and Asian commerce, early religious freedom.',
    dataPoints: [
      { year: 1206, yearLabel: '1206 AD', era: 'Medieval', population: 2.0, territory: 4.0, capitalUrbanPop: 10, milestone: 'Genghis Khan Proclaimed Supreme Ruler', milestoneDesc: 'Kurultai unifies the warring nomadic tribes under the Great Yassa legal code.', rulerOrLeader: 'Genghis Khan' },
      { year: 1227, yearLabel: '1227 AD', era: 'Medieval', population: 35.0, territory: 13.5, worldSharePct: 9.5, capitalUrbanPop: 20, milestone: 'Death of Genghis Khan after Khwarazmian Conquest', milestoneDesc: 'Empire stretches from the Sea of Japan to the Caspian Sea.', rulerOrLeader: 'Genghis Khan' },
      { year: 1242, yearLabel: '1242 AD', era: 'Medieval', population: 60.0, territory: 18.0, worldSharePct: 15.0, capitalUrbanPop: 30, milestone: 'Batu Khan Invasions of Eastern Europe', milestoneDesc: 'Golden Horde pushes into Poland and Hungary before turning back upon Ogedei\'s death.', rulerOrLeader: 'Batu Khan' },
      { year: 1279, yearLabel: '1279 AD', era: 'Medieval', population: 110.0, territory: 24.0, worldSharePct: 26.0, capitalUrbanPop: 60, milestone: 'Peak Contiguous Territorial Zenith of All Time', milestoneDesc: 'Kublai Khan defeats Song Dynasty, governing 24 million km² from Poland to Korea.', rulerOrLeader: 'Kublai Khan' },
      { year: 1368, yearLabel: '1368 AD', era: 'Medieval', population: 30.0, territory: 6.0, worldSharePct: 8.0, capitalUrbanPop: 15, milestone: 'Ming Expulsion of Yuan from China', milestoneDesc: 'Rebellion leads to the retreat of the Northern Yuan back into the Mongolian steppes.', rulerOrLeader: 'Toghon Temür' },
      { year: 1500, yearLabel: '1500 AD', era: 'Early Modern', population: 3.0, territory: 2.0, worldSharePct: 0.6, capitalUrbanPop: 10, milestone: 'Steppe Khanate Fragmentation', milestoneDesc: 'Division into fragmented nomadic confederations before modern demarcation.', rulerOrLeader: 'Dayan Khan' }
    ]
  },
  {
    id: 'british',
    name: 'The British Empire ("The Sun Never Sets")',
    shortName: 'Britain',
    flag: '🇬🇧',
    region: 'Global Maritime Domain',
    color: '#EC4899', // Crimson Pink
    gradientId: 'colorBritain',
    peakTerritory: 35.5,
    peakTerritoryYear: '1922 AD',
    peakTerritoryEra: 'League of Nations Mandates',
    peakPopulation: 458,
    peakPopulationYear: '1922 AD',
    peakWorldShare: 24.0,
    riseFactor: 'Royal Navy naval dominance, Industrial Revolution steam and textile mechanization, global corporate joint-stock trading monopolies.',
    fallFactor: 'Economic bankruptcy following World War I and II, rise of anti-colonial independence movements (India, Africa), US superpower transition.',
    enduringLegacy: 'Spread of the English language as global lingua franca, common law legal systems, parliamentary democracy, and modern sports.',
    dataPoints: [
      { year: 1600, yearLabel: '1600 AD', era: 'Early Modern', population: 4.5, territory: 0.24, capitalUrbanPop: 200, milestone: 'East India Company Royal Charter Granted', milestoneDesc: 'Queen Elizabeth I grants monopoly on Asian trade, sparking maritime global mercantilism.', rulerOrLeader: 'Queen Elizabeth I' },
      { year: 1750, yearLabel: '1750 AD', era: 'Early Modern', population: 8.0, territory: 2.5, worldSharePct: 1.0, capitalUrbanPop: 675, milestone: 'Dawn of the Industrial Revolution', milestoneDesc: 'Steam engines, coal mining, and mechanized looms transform Britain into the "Workshop of the World."', rulerOrLeader: 'King George II' },
      { year: 1815, yearLabel: '1815 AD', era: 'Modern', population: 25.0, territory: 8.5, worldSharePct: 2.5, capitalUrbanPop: 1100, milestone: 'Defeat of Napoleon at Waterloo & Pax Britannica', milestoneDesc: 'Royal Navy achieves unchallenged supremacy across all world oceans.', rulerOrLeader: 'Duke of Wellington / George III' },
      { year: 1877, yearLabel: '1877 AD', era: 'Modern', population: 260.0, territory: 22.0, worldSharePct: 18.0, capitalUrbanPop: 3800, milestone: 'Queen Victoria Declared Empress of India', milestoneDesc: 'Peak Victorian imperial consolidation across Asia, Africa, and Australasia.', rulerOrLeader: 'Queen Victoria' },
      { year: 1922, yearLabel: '1922 AD', era: 'Modern', population: 458.0, territory: 35.5, worldSharePct: 24.0, capitalUrbanPop: 7300, milestone: 'Largest Territorial Empire in Human History', milestoneDesc: 'Britain governs over 35.5 million km² (nearly a quarter of Earth\'s total land area).', rulerOrLeader: 'King George V / David Lloyd George' },
      { year: 1947, yearLabel: '1947 AD', era: 'Modern', population: 85.0, territory: 12.0, worldSharePct: 3.5, capitalUrbanPop: 8200, milestone: 'Decolonization of India & Post-WWII Shift', milestoneDesc: 'Independence of the "Jewel in the Crown" marks the beginning of the end of formal British imperialism.', rulerOrLeader: 'Clement Attlee' },
      { year: 2024, yearLabel: '2024 AD', era: 'Modern', population: 68.0, territory: 0.243, worldSharePct: 0.84, capitalUrbanPop: 9600, milestone: 'Modern United Kingdom & Commonwealth Network', milestoneDesc: 'Global financial hub in London, founding member of NATO and UN Security Council permanent member.', rulerOrLeader: 'King Charles III / Keir Starmer' }
    ]
  }
];
