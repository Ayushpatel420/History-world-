export interface HistoricalEntityOption {
  id: string;
  name: string;
  category: 'Figure' | 'Event' | 'Country' | 'Article' | 'Monarch';
  era?: string;
  defaultTags: string[];
}

export const PRESET_HISTORICAL_FIGURES: HistoricalEntityOption[] = [
  { id: 'napoleon', name: 'Napoleon Bonaparte', category: 'Figure', era: 'Modern Era', defaultTags: ['military-tactics', 'france', 'napoleon', 'strategy'] },
  { id: 'julius_caesar', name: 'Julius Caesar', category: 'Figure', era: 'Classical Era', defaultTags: ['rome', 'republic', 'dictator', 'military-campaigns'] },
  { id: 'alexander_the_great', name: 'Alexander the Great', category: 'Figure', era: 'Classical Era', defaultTags: ['macedon', 'conquest', 'hellenism', 'tactics'] },
  { id: 'cleopatra_vii', name: 'Cleopatra VII', category: 'Figure', era: 'Classical Era', defaultTags: ['egypt', 'ptolemaic', 'diplomacy', 'antiquity'] },
  { id: 'ashoka_the_great', name: 'Ashoka the Great', category: 'Figure', era: 'Classical Era', defaultTags: ['maurya', 'buddhism', 'edicts', 'india', 'peace'] },
  { id: 'leonardo_da_vinci', name: 'Leonardo da Vinci', category: 'Figure', era: 'Renaissance', defaultTags: ['renaissance', 'polymath', 'art', 'invention'] },
  { id: 'joan_of_arc', name: 'Joan of Arc', category: 'Figure', era: 'Medieval Era', defaultTags: ['hundred-years-war', 'france', 'heroine', 'faith'] },
  { id: 'winston_churchill', name: 'Winston Churchill', category: 'Figure', era: 'Modern Era', defaultTags: ['wwii', 'britain', 'speeches', 'leadership'] },
  { id: 'abraham_lincoln', name: 'Abraham Lincoln', category: 'Figure', era: 'Modern Era', defaultTags: ['american-civil-war', 'emancipation', 'gettysburg', 'union'] },
  { id: 'socrates', name: 'Socrates', category: 'Figure', era: 'Classical Era', defaultTags: ['philosophy', 'athens', 'ethics', 'socratic-method'] },
  { id: 'marcus_aurelius', name: 'Marcus Aurelius', category: 'Figure', era: 'Classical Era', defaultTags: ['stoicism', 'meditations', 'rome', 'philosopher-king'] },
  { id: 'genghis_khan', name: 'Genghis Khan', category: 'Figure', era: 'Medieval Era', defaultTags: ['mongol-empire', 'steppe-warfare', 'conquest', 'yassa'] },
  { id: 'saladin', name: 'Saladin (Salah ad-Din)', category: 'Figure', era: 'Medieval Era', defaultTags: ['crusades', 'chivalry', 'ayyubid', 'jerusalem'] },
  { id: 'cyrus_the_great', name: 'Cyrus the Great', category: 'Figure', era: 'Ancient Era', defaultTags: ['persia', 'human-rights', 'achaemenid', 'tolerance'] },
  { id: 'queen_elizabeth_i', name: 'Queen Elizabeth I', category: 'Figure', era: 'Early Modern', defaultTags: ['tudor', 'england', 'golden-age', 'spanish-armada'] }
];

export const PRESET_HISTORICAL_EVENTS: HistoricalEntityOption[] = [
  { id: 'fall_of_constantinople', name: 'Fall of Constantinople (1453)', category: 'Event', era: 'Late Middle Ages', defaultTags: ['byzantine', 'ottoman', 'turning-point', 'renaissance'] },
  { id: 'french_revolution', name: 'The French Revolution (1789)', category: 'Event', era: 'Modern Era', defaultTags: ['enlightenment', 'bastille', 'liberty', 'revolution'] },
  { id: 'battle_of_hastings', name: 'Battle of Hastings (1066)', category: 'Event', era: 'Medieval Era', defaultTags: ['norman-conquest', 'england', 'bayeux-tapestry', 'feudalism'] },
  { id: 'magna_carta_signing', name: 'Signing of Magna Carta (1215)', category: 'Event', era: 'Medieval Era', defaultTags: ['magna-carta', 'constitutional-law', 'due-process', 'barons'] },
  { id: 'fall_of_western_rome', name: 'Fall of the Western Roman Empire (476 CE)', category: 'Event', era: 'Late Antiquity', defaultTags: ['rome', 'migration-period', 'decline', 'middle-ages'] },
  { id: 'apollo_11_moon_landing', name: 'Apollo 11 Moon Landing (1969)', category: 'Event', era: 'Space Age', defaultTags: ['space-race', 'cold-war', 'science', 'exploration'] },
  { id: 'peloponnesian_war', name: 'The Peloponnesian War (431–404 BCE)', category: 'Event', era: 'Classical Era', defaultTags: ['athens', 'sparta', 'thucydides', 'ancient-greece'] },
  { id: 'defeat_spanish_armada', name: 'Defeat of the Spanish Armada (1588)', category: 'Event', era: 'Early Modern', defaultTags: ['naval-warfare', 'elizabeth-i', 'philip-ii', 'england'] },
  { id: 'us_declaration_independence', name: 'US Declaration of Independence (1776)', category: 'Event', era: 'Modern Era', defaultTags: ['american-revolution', 'jefferson', 'democracy', 'liberty'] },
  { id: 'fall_of_berlin_wall', name: 'Fall of the Berlin Wall (1989)', category: 'Event', era: 'Modern Era', defaultTags: ['cold-war', 'german-reunification', 'iron-curtain', 'peace'] },
  { id: 'treaty_of_versailles', name: 'Treaty of Versailles (1919)', category: 'Event', era: '20th Century', defaultTags: ['wwi', 'diplomacy', 'league-of-nations', 'reparations'] },
  { id: 'protestant_reformation', name: 'The Protestant Reformation (1517)', category: 'Event', era: 'Early Modern', defaultTags: ['martin-luther', '95-theses', 'religion', 'printing-press'] }
];

export const PRESET_COUNTRIES: HistoricalEntityOption[] = [
  { id: 'egypt', name: 'Ancient Egypt', category: 'Country', era: 'Bronze & Iron Age', defaultTags: ['egypt', 'pharaohs', 'nile', 'pyramids', 'hieroglyphs'] },
  { id: 'rome', name: 'Roman Empire / Republic', category: 'Country', era: 'Classical Antiquity', defaultTags: ['rome', 'senate', 'legions', 'law', 'mediterranean'] },
  { id: 'greece', name: 'Ancient Greece (Hellas)', category: 'Country', era: 'Classical Antiquity', defaultTags: ['greece', 'democracy', 'philosophy', 'polis', 'mythology'] },
  { id: 'ottoman', name: 'Ottoman Empire', category: 'Country', era: '1299–1922 CE', defaultTags: ['ottoman', 'anatolia', 'caliphate', 'janissaries', 'trade-routes'] },
  { id: 'britain', name: 'British Empire / United Kingdom', category: 'Country', era: '16th–20th Century', defaultTags: ['britain', 'industrial-revolution', 'naval-power', 'commonwealth'] },
  { id: 'india_maurya', name: 'Maurya & Gupta Empires (India)', category: 'Country', era: 'Ancient & Classical', defaultTags: ['india', 'maurya', 'gupta', 'dharma', 'mathematics'] },
  { id: 'china_dynasties', name: 'Imperial China (Han, Tang, Ming)', category: 'Country', era: 'Dynastic Eras', defaultTags: ['china', 'silk-road', 'confucianism', 'dynasties', 'great-wall'] },
  { id: 'japan_feudal', name: 'Feudal Japan (Edo & Sengoku)', category: 'Country', era: '12th–19th Century', defaultTags: ['japan', 'samurai', 'shogunate', 'bushido', 'edo'] },
  { id: 'byzantine', name: 'Byzantine Empire (Eastern Rome)', category: 'Country', era: '330–1453 CE', defaultTags: ['byzantine', 'constantinople', 'justinian', 'orthodox', 'culture'] },
  { id: 'persia_achaemenid', name: 'Achaemenid Persian Empire', category: 'Country', era: '550–330 BCE', defaultTags: ['persia', 'persepolis', 'royal-road', 'cyrus', 'zoroastrianism'] },
  { id: 'france', name: 'France (Kingdom & Republic)', category: 'Country', era: 'Medieval to Modern', defaultTags: ['france', 'revolution', 'enlightenment', 'napoleon', 'culture'] },
  { id: 'usa', name: 'United States of America', category: 'Country', era: '1776–Present', defaultTags: ['usa', 'constitution', 'democracy', 'civil-war', 'industrialization'] }
];

export const PRESET_ARTICLES: HistoricalEntityOption[] = [
  { id: 'library_alexandria', name: 'The Library of Alexandria: Beacon of Knowledge', category: 'Article', era: 'Hellenistic Era', defaultTags: ['alexandria', 'scholarship', 'manuscripts', 'historiography'] },
  { id: 'silk_road_trade', name: 'The Silk Road: Arteries of Eurasian Exchange', category: 'Article', era: 'Ancient to Medieval', defaultTags: ['silk-road', 'trade', 'cultural-diffusion', 'commodities'] },
  { id: 'code_of_hammurabi', name: 'The Code of Hammurabi & Ancient Jurisprudence', category: 'Article', era: 'Babylonia', defaultTags: ['babylon', 'legal-code', 'eye-for-an-eye', 'mesopotamia'] },
  { id: 'renaissance_humanism', name: 'Renaissance Humanism & Scientific Awakening', category: 'Article', era: '14th–17th Century', defaultTags: ['renaissance', 'humanism', 'classicism', 'scientific-revolution'] },
  { id: 'the_black_death', name: 'The Black Death & Societal Transformation (1347–1351)', category: 'Article', era: 'Medieval Era', defaultTags: ['black-death', 'plague', 'demographics', 'feudal-collapse'] },
  { id: 'gutenberg_printing', name: 'Gutenberg’s Movable Type & the Information Explosion', category: 'Article', era: '15th Century', defaultTags: ['printing-press', 'literacy', 'reformation', 'communications'] },
  { id: 'rosetta_stone', name: 'Deciphering the Rosetta Stone & Egyptian Hieroglyphics', category: 'Article', era: '19th Century Scholarship', defaultTags: ['rosetta-stone', 'champollion', 'linguistics', 'hieroglyphics'] },
  { id: 'pax_romana_architecture', name: 'Pax Romana: The Architecture of Mediterranean Order', category: 'Article', era: 'Roman Empire', defaultTags: ['pax-romana', 'augustus', 'roads', 'governance'] }
];
