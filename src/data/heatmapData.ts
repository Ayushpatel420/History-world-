// Historical Concentration Heatmap Clusters & Geospatial Intensity Data

export interface HeatmapCluster {
  id: string;
  name: string;
  modernRegion: string;
  coordinates: { x: number; y: number };
  radius: number; // visual thermal bloom radius in SVG units
  figureCount: number;
  eventCount: number;
  totalIntensity: number; // 0 to 100 normalized score
  intensityTier: 'extreme' | 'high' | 'moderate' | 'low';
  notableFigures: string[];
  notableEvents: string[];
  civilizations: string[];
  historicalEraFocus: string;
  densityAnalysis: string;
}

export const HEATMAP_CLUSTERS: HeatmapCluster[] = [
  {
    id: 'mediterranean_rome',
    name: 'Rome & Mediterranean Heartland',
    modernRegion: 'Italy & Central Mediterranean',
    coordinates: { x: 488, y: 180 },
    radius: 46,
    figureCount: 1420,
    eventCount: 380,
    totalIntensity: 98,
    intensityTier: 'extreme',
    notableFigures: ['Julius Caesar', 'Augustus', 'Marcus Aurelius', 'Scipio Africanus', 'Cicero', 'Trajan'],
    notableEvents: ['Punic Wars', 'Gallic Campaigns', 'Pax Romana', 'Fall of the Western Roman Empire', 'Coronation of Charlemagne'],
    civilizations: ['Roman Republic', 'Roman Empire', 'Papal States', 'Italian City-States'],
    historicalEraFocus: 'Classical Antiquity to Renaissance',
    densityAnalysis: 'The preeminent political and military crucible of Western civilization, commanding the Mediterranean basin through extensive paved highways and legionary outposts.'
  },
  {
    id: 'greece_aegean',
    name: 'Greece, Aegean & Anatolia',
    modernRegion: 'Balkans, Greece & Western Turkey',
    coordinates: { x: 535, y: 235 },
    radius: 42,
    figureCount: 980,
    eventCount: 290,
    totalIntensity: 92,
    intensityTier: 'extreme',
    notableFigures: ['Alexander the Great', 'Socrates', 'Pericles', 'Plato', 'Aristotle', 'Justinian I'],
    notableEvents: ['Greco-Persian Wars', 'Peloponnesian War', 'Campaigns of Alexander', 'Fall of Constantinople (1453)'],
    civilizations: ['Classical Greece', 'Hellenistic Kingdoms', 'Byzantine Empire', 'Ottoman Empire'],
    historicalEraFocus: 'Bronze Age to Late Medieval',
    densityAnalysis: 'Birthplace of democratic governance, Western philosophy, and monumental maritime trade connecting the Black Sea and the Mediterranean.'
  },
  {
    id: 'nile_valley',
    name: 'Nile River Valley & Delta',
    modernRegion: 'Egypt & Lower Nile Basin',
    coordinates: { x: 580, y: 275 },
    radius: 40,
    figureCount: 860,
    eventCount: 210,
    totalIntensity: 88,
    intensityTier: 'extreme',
    notableFigures: ['Ramses II', 'Cleopatra VII', 'Hatshepsut', 'Akhenaten', 'Hypatia of Alexandria', 'Saladin'],
    notableEvents: ['Battle of Kadesh', 'Pyramids of Giza Construction', 'Ptolemaic Golden Age', 'Alexandrian Library Expansion'],
    civilizations: ['Ancient Egypt (Old/Middle/New Kingdom)', 'Ptolemaic Kingdom', 'Fatimid Caliphate'],
    historicalEraFocus: 'Ancient Antiquity (3100 BCE – 300 CE)',
    densityAnalysis: 'Continuous agricultural civilization sustained by the annual Nile floods, producing monumental architecture, hieroglyphic literature, and early state bureaucracy.'
  },
  {
    id: 'yellow_yangtze_china',
    name: 'Yellow & Yangtze River Plains',
    modernRegion: 'Central & Eastern China (Chang\'an / Luoyang)',
    coordinates: { x: 810, y: 205 },
    radius: 45,
    figureCount: 1350,
    eventCount: 340,
    totalIntensity: 96,
    intensityTier: 'extreme',
    notableFigures: ['Qin Shi Huang', 'Confucius', 'Emperor Wu of Han', 'Tang Taizong', 'Wu Zetian', 'Zhu Di (Yongle)'],
    notableEvents: ['Warring States Era', 'Qin Dynastic Unification', 'Silk Road Opening', 'An Lushan Rebellion', 'Yongle Encyclopedia Compilation'],
    civilizations: ['Zhou Dynasty', 'Qin Dynasty', 'Han Dynasty', 'Tang Dynasty', 'Song & Ming Dynasties'],
    historicalEraFocus: 'Bronze Age to Early Modern',
    densityAnalysis: 'Dense urban centers featuring imperial civil examinations, advanced metallurgy, papermaking, woodblock printing, and grand hydraulic canal engineering.'
  },
  {
    id: 'gangetic_plain_india',
    name: 'Indus & Ganges Basins',
    modernRegion: 'Northern India & Indo-Gangetic Plain',
    coordinates: { x: 720, y: 285 },
    radius: 44,
    figureCount: 1120,
    eventCount: 260,
    totalIntensity: 90,
    intensityTier: 'extreme',
    notableFigures: ['Ashoka the Great', 'Chandragupta Maurya', 'Harsha', 'Akbar the Great', 'Aryabhata', 'Gautama Buddha'],
    notableEvents: ['Kalinga War & Dhamma Edicts', 'Gupta Mathematical Renaissance', 'Battle of Panipat', 'Establishment of Nalanda University'],
    civilizations: ['Indus Valley', 'Mauryan Empire', 'Gupta Empire', 'Delhi Sultanate', 'Mughal Empire'],
    historicalEraFocus: 'Vedic Period to Classical/Mughal Eras',
    densityAnalysis: 'Center of profound philosophical traditions, zero-concept arithmetic, iron metallurgical breakthroughs, and global spice trade routes.'
  },
  {
    id: 'mesopotamia_cradle',
    name: 'Fertile Crescent & Tigris-Euphrates',
    modernRegion: 'Iraq, Syria & Persian Gulf',
    coordinates: { x: 605, y: 254 },
    radius: 38,
    figureCount: 780,
    eventCount: 195,
    totalIntensity: 85,
    intensityTier: 'high',
    notableFigures: ['Hammurabi', 'Sargon of Akkad', 'Nebuchadnezzar II', 'Harun al-Rashid', 'Al-Khwarizmi'],
    notableEvents: ['Codification of Hammurabi\'s Law', 'Fall of Babylon', 'Siege of Baghdad', 'Islamic Golden Age House of Wisdom'],
    civilizations: ['Sumer', 'Akkad', 'Babylonia', 'Assyria', 'Abbasid Caliphate'],
    historicalEraFocus: 'Urban Dawn (4000 BCE) to Abbasid Zenith',
    densityAnalysis: 'The primary cradle of urban civilization, cuneiform writing, wheel invention, legal codices, and medieval algebra.'
  },
  {
    id: 'western_europe_rhine',
    name: 'Western Europe & Seine-Rhine Basin',
    modernRegion: 'France, Low Countries & Western Germany',
    coordinates: { x: 450, y: 152 },
    radius: 40,
    figureCount: 920,
    eventCount: 280,
    totalIntensity: 89,
    intensityTier: 'high',
    notableFigures: ['Charlemagne', 'Joan of Arc', 'Louis XIV', 'Napoleon Bonaparte', 'Voltaire', 'Rousseau'],
    notableEvents: ['Hundred Years\' War', 'Treaty of Verdun', 'French Revolution', 'Napoleonic Campaigns', 'Storming of the Bastille'],
    civilizations: ['Frankish Kingdom', 'Kingdom of France', 'Burgundy', 'French Republic & Empire'],
    historicalEraFocus: 'Early Medieval to Modern',
    densityAnalysis: 'Key European theater for feudal centralization, cathedral Gothic architecture, the Enlightenment philosophy, and national revolutions.'
  },
  {
    id: 'british_isles',
    name: 'British Isles & Thames Valley',
    modernRegion: 'England, Scotland & Ireland',
    coordinates: { x: 440, y: 110 },
    radius: 32,
    figureCount: 680,
    eventCount: 175,
    totalIntensity: 78,
    intensityTier: 'high',
    notableFigures: ['Alfred the Great', 'William the Conqueror', 'Elizabeth I', 'Isaac Newton', 'Winston Churchill'],
    notableEvents: ['Battle of Hastings (1066)', 'Signing of Magna Carta (1215)', 'Defeat of the Spanish Armada', 'Industrial Revolution Launch'],
    civilizations: ['Anglo-Saxon Kingdoms', 'Kingdom of England', 'British Empire'],
    historicalEraFocus: 'Medieval to Industrial Era',
    densityAnalysis: 'Origins of parliamentary constitutionalism, common law traditions, global oceanic dominance, and steam-powered industrialization.'
  },
  {
    id: 'central_europe_hre',
    name: 'Central Europe & Danube Basin',
    modernRegion: 'Germany, Austria, Czechia & Poland',
    coordinates: { x: 485, y: 135 },
    radius: 36,
    figureCount: 640,
    eventCount: 190,
    totalIntensity: 76,
    intensityTier: 'high',
    notableFigures: ['Frederick the Great', 'Johannes Gutenberg', 'Martin Luther', 'Otto von Bismarck', 'Maria Theresa'],
    notableEvents: ['Thirty Years\' War (1618–1648)', 'Invention of Movable Type Printing', 'Protestant Reformation', 'Congress of Vienna'],
    civilizations: ['Holy Roman Empire', 'Prussia', 'Habsburg Monarchy'],
    historicalEraFocus: 'Late Medieval to 20th Century',
    densityAnalysis: 'The crossroads of European religious wars, printing technology dissemination, classical symphonic music, and realpolitik statecraft.'
  },
  {
    id: 'persian_plateau',
    name: 'Iranian Plateau & Zagros',
    modernRegion: 'Iran (Persepolis, Isfahan, Ecbatana)',
    coordinates: { x: 635, y: 235 },
    radius: 36,
    figureCount: 540,
    eventCount: 145,
    totalIntensity: 72,
    intensityTier: 'high',
    notableFigures: ['Cyrus the Great', 'Darius I', 'Shah Abbas I', 'Shapur I', 'Ferdowsi'],
    notableEvents: ['Cyrus Cylinder Proclamation', 'Construction of Persepolis', 'Battle of Gaugamela', 'Safavid Cultural Golden Age'],
    civilizations: ['Achaemenid Empire', 'Parthian Empire', 'Sasanian Empire', 'Safavid Empire'],
    historicalEraFocus: 'Iron Age (550 BCE) to Early Modern',
    densityAnalysis: 'Pioneers of universal human rights declarations (Cyrus Cylinder), satrapy administrative autonomy, and royal postal courier networks.'
  },
  {
    id: 'mesoamerica_central',
    name: 'Mesoamerican Highlands & Lowlands',
    modernRegion: 'Valley of Mexico & Yucatan Peninsula',
    coordinates: { x: 145, y: 215 },
    radius: 34,
    figureCount: 380,
    eventCount: 110,
    totalIntensity: 68,
    intensityTier: 'moderate',
    notableFigures: ['Moctezuma II', 'K\'inich Janaab Pakal', 'Nezahualcoyotl', 'Cuauhtémoc'],
    notableEvents: ['Zenith of Teotihuacan', 'Classic Maya Astronomical Discoveries', 'Foundation of Tenochtitlan (1325)', 'Siege of Tenochtitlan (1521)'],
    civilizations: ['Olmec', 'Classic Maya', 'Toltec', 'Aztec Empire (Triple Alliance)'],
    historicalEraFocus: 'Pre-Columbian (1500 BCE – 1521 CE)',
    densityAnalysis: 'Sophisticated indigenous calendrical astronomy, zero-concept notation, chinampa floating agriculture, and monumental step-pyramid temple architecture.'
  },
  {
    id: 'andean_highlands',
    name: 'Andean Mountain Corridor',
    modernRegion: 'Peru, Bolivia & Ecuador (Cusco)',
    coordinates: { x: 200, y: 350 },
    radius: 32,
    figureCount: 290,
    eventCount: 85,
    totalIntensity: 62,
    intensityTier: 'moderate',
    notableFigures: ['Pachacuti', 'Huayna Capac', 'Atahualpa', 'Túpac Amaru'],
    notableEvents: ['Tawantinsuyu Imperial Expansion', 'Construction of Machu Picchu', 'Inca Civil War', 'Battle of Cajamarca (1532)'],
    civilizations: ['Chavín', 'Moche', 'Tiwanaku', 'Inca Empire (Tawantinsuyu)'],
    historicalEraFocus: 'Pre-Columbian (1200 BCE – 1533 CE)',
    densityAnalysis: 'Terraced high-altitude agriculture, stone masonry earthquake-resilience, quipu cord recording systems, and the 25,000-mile Qhapaq Ñan royal road network.'
  },
  {
    id: 'central_asia_silkroad',
    name: 'Central Asian Steppe & Silk Road Hubs',
    modernRegion: 'Uzbekistan, Kazakhstan & Mongolia (Samarkand)',
    coordinates: { x: 700, y: 175 },
    radius: 40,
    figureCount: 460,
    eventCount: 160,
    totalIntensity: 74,
    intensityTier: 'high',
    notableFigures: ['Genghis Khan', 'Timur (Tamerlane)', 'Ulugh Beg', 'Babar', 'Modu Chanyu'],
    notableEvents: ['Mongol Empire Continental Conquests', 'Pax Mongolica Eurasian Trade Integration', 'Observatory of Samarkand Researches'],
    civilizations: ['Xiongnu Confederation', 'Turkic Khaganates', 'Mongol Empire', 'Timurid Empire'],
    historicalEraFocus: 'Nomadic Antiquity to Timurid Renaissance',
    densityAnalysis: 'Vast horse cavalry networks connecting China, Persia, and Europe; catalyst of continent-wide postal, diplomatic, and trade transmission.'
  },
  {
    id: 'west_africa_sahel',
    name: 'West African Sahel & Niger River Bend',
    modernRegion: 'Mali, Mauritania, Senegal & Niger',
    coordinates: { x: 430, y: 320 },
    radius: 34,
    figureCount: 310,
    eventCount: 95,
    totalIntensity: 65,
    intensityTier: 'moderate',
    notableFigures: ['Mansa Musa', 'Sundiata Keita', 'Askia the Great', 'Sonni Ali Ber'],
    notableEvents: ['Mansa Musa\'s Golden Pilgrimage (1324)', 'Epic of Sundiata & Kurukan Fuga Charter', 'Expansion of Sankore University in Timbuktu'],
    civilizations: ['Ghana Empire', 'Mali Empire', 'Songhai Empire'],
    historicalEraFocus: 'Medieval African Golden Ages (800 – 1600 CE)',
    densityAnalysis: 'Epic trans-Saharan commerce in gold, salt, and Arabic scholarship; housing world-renowned Islamic manuscript libraries and earth-built mosques.'
  },
  {
    id: 'japan_archipelago',
    name: 'Japanese Archipelago',
    modernRegion: 'Honshu & Inland Sea (Kyoto, Nara, Edo)',
    coordinates: { x: 895, y: 205 },
    radius: 28,
    figureCount: 410,
    eventCount: 120,
    totalIntensity: 70,
    intensityTier: 'moderate',
    notableFigures: ['Oda Nobunaga', 'Toyotomi Hideyoshi', 'Tokugawa Ieyasu', 'Prince Shotoku', 'Murasaki Shikibu'],
    notableEvents: ['Battle of Sekigahara (1600)', 'Heian Court Golden Age', 'Genpei War', 'Meiji Restoration'],
    civilizations: ['Asuka/Nara Period', 'Heian Era', 'Kamakura & Ashikaga Shogunates', 'Tokugawa Shogunate'],
    historicalEraFocus: 'Classical Heian to Edo Period',
    densityAnalysis: 'Unique synthesis of Shinto-Buddhist aesthetics, feudal samurai warrior codes (Bushido), Tale of Genji literature, and durable urban isolation.'
  },
  {
    id: 'north_america_east',
    name: 'Eastern North America & Atlantic Coast',
    modernRegion: 'United States & Eastern Canada',
    coordinates: { x: 155, y: 160 },
    radius: 36,
    figureCount: 520,
    eventCount: 180,
    totalIntensity: 75,
    intensityTier: 'high',
    notableFigures: ['George Washington', 'Thomas Jefferson', 'Benjamin Franklin', 'Abraham Lincoln', 'Tecumseh'],
    notableEvents: ['American Revolutionary War', 'Signing of the Declaration of Independence (1776)', 'American Civil War', 'Constitutional Convention'],
    civilizations: ['Haudenosaunee (Iroquois Confederacy)', 'Thirteen Colonies', 'United States'],
    historicalEraFocus: 'Early Modern to 20th Century',
    densityAnalysis: 'Creation of modern republican constitutionalism, separation of powers, and rapid continental industrial-technological ascent.'
  }
];

// Helper to compute summary counts
export const HEATMAP_SUMMARY = {
  totalMonitoredFigures: HEATMAP_CLUSTERS.reduce((acc, c) => acc + c.figureCount, 0),
  totalMonitoredEvents: HEATMAP_CLUSTERS.reduce((acc, c) => acc + c.eventCount, 0),
  extremeTierCount: HEATMAP_CLUSTERS.filter(c => c.intensityTier === 'extreme').length,
  highTierCount: HEATMAP_CLUSTERS.filter(c => c.intensityTier === 'high').length,
  moderateTierCount: HEATMAP_CLUSTERS.filter(c => c.intensityTier === 'moderate').length,
};
