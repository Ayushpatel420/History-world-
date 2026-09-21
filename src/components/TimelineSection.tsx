import { useState, useEffect, useMemo, useRef } from 'react';
import { Calendar, Search, SlidersHorizontal, Users, Clock, History, Compass, Play, Pause, Share2, Check, Crown, Sparkles, MapPin, Plus, Star, ArrowUp, BookmarkCheck, RotateCcw, BookOpen, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { HistoricalEvent, UserNote, Bookmark } from '../types';
import { HISTORICAL_EVENTS, MONARCHS, HISTORICAL_FIGURES } from '../data/historyData';
import { motion, AnimatePresence } from 'motion/react';
import InlineNotesWidget from './InlineNotesWidget';
import PaginationControls from './PaginationControls';

interface DynastyNode {
  id: string;
  name: string;
  title: string;
  years: string;
  yearNum: number;
  description: string;
  relicImage?: string;
  achievements: string[];
  legacy: string;
  region: 'Egypt' | 'Rome' | 'India' | 'Europe' | 'China' | 'Greece' | 'Islamic' | 'Global';
}

interface DynastyPeriod {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  bgGradient: string;
  nodes: DynastyNode[];
}

const DYNASTY_PERIODS: DynastyPeriod[] = [
  {
    id: 'dynasty_egypt',
    title: 'The New Kingdom of Egypt',
    subtitle: 'Golden Age of Imperial Architecture (c. 1550 BC – 1077 BC)',
    summary: 'An era of unrivaled imperial expansion, immense wealth, and spectacular architectural campaigns under master pharaohs.',
    bgGradient: 'from-amber-950/25 via-yellow-950/15 to-[#0A0A0A] border-amber-500/25',
    nodes: [
      {
        id: 'dyn_hatshepsut',
        name: 'Queen Hatshepsut',
        title: 'Female Sovereign Pharaoh',
        years: '1479 – 1458 BC',
        yearNum: -1479,
        description: 'Authorized the historic maritime trading mission to the legendary Land of Punt and built the multi-tiered Djeser-Djeseru temple.',
        relicImage: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Sent trade delegations returning with live incense trees',
          'Commissioned the tallest twin red-granite obelisks at Karnak',
          'Pioneered visual propaganda legitimizing female monarchs'
        ],
        legacy: 'Synthesized unprecedented trading network wealth.',
        region: 'Egypt'
      },
      {
        id: 'dyn_thutmose_iii',
        name: 'Thutmose III',
        title: 'The Napoleon of Ancient Egypt',
        years: '1479 – 1425 BC',
        yearNum: -1450,
        description: 'Sovereign general who led seventeen victorious military campaigns, expanding Egypt to its absolute greatest geographic limits.',
        relicImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Won the historic Battle of Megiddo utilizing swift chariots',
          'Conquered over 350 cities in Canaan and Levant territories',
          'Established a massive annual vassal tribute flow into Egypt'
        ],
        legacy: 'Solidified Egypt as an undisputed global military superpower.',
        region: 'Egypt'
      },
      {
        id: 'dyn_ramesses_ii',
        name: 'Ramesses II',
        title: 'Ramesses the Great',
        years: '1279 – 1213 BC',
        yearNum: -1279,
        description: 'Vast monument constructor who defended Egypt’s borders against the Hittite Empire and signed the earliest written international peace treaty.',
        relicImage: 'https://images.unsplash.com/photo-1600577916048-804c9191e36c?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Carved the colossal Abu Simbel temples directly into mountains',
          'Led the largest chariot skirmish in history at Battle of Kadesh',
          'Ruled Egypt for an extraordinary active span of 66 years'
        ],
        legacy: 'The definitive archetypal pharaoh of global pop culture.',
        region: 'Egypt'
      },
      {
        id: 'dyn_tutankhamun',
        name: 'Tutankhamun',
        title: 'The Boy King',
        years: '1332 – 1323 BC',
        yearNum: -1332,
        description: 'Returned Egypt’s divine spiritual center back to the traditional Amun priesthood after Akhenaten’s radical monotheistic sun heresy.',
        relicImage: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Restored multi-deity temples, returning religious stability',
          'Began reconstruction of massive Memphis state palaces',
          'Buried in a solid gold mask inside a completely intact tomb'
        ],
        legacy: 'Sparked worldwide archeological and museum fascination.',
        region: 'Egypt'
      }
    ]
  },
  {
    id: 'dynasty_rome',
    title: 'The Roman Caesar Emperors',
    subtitle: 'Golden Age of Pax Romana (27 BC – 180 AD)',
    summary: 'The consolidation of supreme power under emperors, resulting in unparalleled infrastructure, concrete road grids, and legal stabilization.',
    bgGradient: 'from-amber-955/15 via-[#0A0A0A] to-[#0D0505] border-amber-600/30',
    nodes: [
      {
        id: 'dyn_augustus',
        name: 'Augustus Caesar',
        title: 'First Roman Emperor & Princeps',
        years: '27 BC – 14 AD',
        yearNum: -27,
        description: 'Ended civil strife following Julius Caesar\'s murder, transforming the fragile Republic into a robust, centralized Imperial system.',
        relicImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Inaugurated the Pax Romana (two centuries of stability)',
          'Expanded borders into Egypt, Spain, and Central Europe',
          'Left: "I found Rome built of clay; I left it built of marble"'
        ],
        legacy: 'Laid the core legal foundations of Western civilizations.',
        region: 'Rome'
      },
      {
        id: 'dyn_trajan',
        name: 'Trajan Caesar',
        title: 'Optimus Princeps (The Best Ruler)',
        years: '98 AD – 117 AD',
        yearNum: 98,
        description: 'Brilliant soldier-emperor who guided Rome\'s physical boundaries to their absolute spatial maximum.',
        relicImage: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Conquered the rich mines of Dacia (Romania) and Parthian Iraq',
          'Commissioned Trajan\'s Column and the sprawling Forum market',
          'Created initial state welfare funds for disadvantaged children'
        ],
        legacy: 'The standard yardstick for Roman administrative greatness.',
        region: 'Rome'
      },
      {
        id: 'dyn_hadrian',
        name: 'Hadrian Caesar',
        title: 'The Traveling Architect Sovereign',
        years: '117 AD – 138 AD',
        yearNum: 117,
        description: 'Consolidated trajanic conquests by constructing heavy border markers, spending his reign traversing provinces in personal armor.',
        relicImage: 'https://images.unsplash.com/photo-1608155686393-2fcfd662657c?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Engineered Hadrian\'s Wall in northern Britain',
          'Constructed the breathtaking 142ft unsupported Pantheon concrete dome',
          'Patronized Hellenic philosophy, fine-arts, and democratic institutions'
        ],
        legacy: 'Championed imperial integration over brute expansion.',
        region: 'Rome'
      },
      {
        id: 'dyn_marcus_aurelius',
        name: 'Marcus Aurelius',
        title: 'The Stoic Philosopher King',
        years: '161 AD – 180 AD',
        yearNum: 161,
        description: 'Defended the empire against deadly Germanic plagues and invasions while drafting his private notebook, "Meditations".',
        relicImage: 'https://images.unsplash.com/photo-1549880180-4c809c0250a2?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Presided over Rome with ultimate legal restraint and justice',
          'Wrote "Meditations", the definitive classic Stoic blueprint',
          'Fended off massive Marcomannic tribal invasions on Danube'
        ],
        legacy: 'The historic embodiment of philosopher kingship.',
        region: 'Rome'
      }
    ]
  },
  {
    id: 'dynasty_india',
    title: 'Sovereigns of the Indian Subcontinent',
    subtitle: 'From Maurya to Maratha Empires (322 BC – 1707 AD)',
    summary: 'A journey through dynasties that combined deep philosophical tolerant codes, massive rock masonry, and independent high-altitude defense warfare.',
    bgGradient: 'from-purple-955/20 via-[#0A0A0A] to-amber-955/15 border-purple-500/25',
    nodes: [
      {
        id: 'dyn_ashoka',
        name: 'Ashoka the Great',
        title: 'Third Mauryan Emperor',
        years: '268 – 232 BC',
        yearNum: -268,
        description: 'Reformed Mauryan statecraft by converting to Buddhism and preaching moral duty (Dhamma) across the subcontinent after bloody defeats in Kalinga.',
        relicImage: 'https://images.unsplash.com/photo-1599849530907-7389a0ba8a7c?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Carved Dhamma moral codes on public sandstone Pillars of Ashoka',
          'Dispatched Buddhist emissaries to Greece, Egypt, and Sri Lanka',
          'Constructed thousands of stupas and standard free hospitals'
        ],
        legacy: 'Synthesized non-violence into state diplomacy limits.',
        region: 'India'
      },
      {
        id: 'dyn_akbar',
        name: 'Akbar the Great',
        title: 'Mughal Synthesis Emperor',
        years: '1556 – 1605 AD',
        yearNum: 1556,
        description: 'Pioneered an era of profound religious toleration, constructing pluralistic inter-faith debate halls (Ibadat Khana) and marrying local Rajput princesses.',
        relicImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Abolished the Jizya tax levied discriminatory against non-Muslims',
          'Founded the syncretic moral code "Din-i Ilahi" (Divine Faith)',
          'Constructed the magnificent Fatehpur Sikri palace city'
        ],
        legacy: 'Laid the secular baseline for multi-religious Indian unity.',
        region: 'India'
      },
      {
        id: 'dyn_shivaji',
        name: 'Chhatrapati Shivaji Maharaj',
        title: 'Maratha Empire Founder',
        years: '1674 – 1680 AD',
        yearNum: 1674,
        description: 'Master military tactician who carved an independent Maratha state from the Adilshahi and Mughal empires using highly adapted hill guerrilla tactics.',
        relicImage: 'https://images.unsplash.com/photo-1626014303757-bb036495207c?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Pioneered "Ganimi Kava" (adaptive swift guerrilla ambush tactics)',
          'Constructed and fortified 300+ strategically unbreachable sea/hill forts',
          'Formulated the "Ashtapradhan" (eight-minister robust cabinet council)'
        ],
        legacy: 'Shattered local hegemony, founding the Maratha confederation.',
        region: 'India'
      }
    ]
  },
  {
    id: 'dynasty_china',
    title: 'Imperial Dynasties of China',
    subtitle: 'From Qin Standardization to Ming Maritime Splendor (221 BC – 1644 AD)',
    summary: 'The great dynasties that unified China, built the Great Wall, instituted meritocratic civil exams, and commanded the global Silk Road trade.',
    bgGradient: 'from-red-950/25 via-amber-950/15 to-[#0A0A0A] border-red-500/25',
    nodes: [
      {
        id: 'dyn_qin_shihuang',
        name: 'Qin Shi Huang',
        title: 'First Emperor of Unified China',
        years: '221 – 210 BC',
        yearNum: -221,
        description: 'Unified the Warring States into the first centralized Chinese Empire, standardizing writing, currency, weights, and road cart axle widths.',
        relicImage: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Connected regional ramparts into the first Great Wall of China',
          'Standardized the universal Small Seal Chinese script',
          'Buried alongside the legendary 8,000-man Terracotta Army'
        ],
        legacy: 'Created the imperial administrative model that endured for 2,000 years.',
        region: 'China'
      },
      {
        id: 'dyn_han_wudi',
        name: 'Emperor Wu of Han',
        title: 'Architect of the Silk Road',
        years: '141 – 87 BC',
        yearNum: -141,
        description: 'Transformed the Han Dynasty into a global power, dispatched Zhang Qian to explore Central Asia, and opened the historic Silk Road network.',
        relicImage: 'https://images.unsplash.com/photo-1549880180-4c809c0250a2?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Opened the historic trans-continental Silk Road trading routes',
          'Established Confucianism as official state statecraft philosophy',
          'Instituted imperial examinations for government civil servants'
        ],
        legacy: 'Defined China’s principal ethnic identity (Han Chinese).',
        region: 'China'
      },
      {
        id: 'dyn_tang_taizong',
        name: 'Emperor Taizong of Tang',
        title: 'Golden Age Cosmopolitan Monarch',
        years: '626 – 649 AD',
        yearNum: 626,
        description: 'Co-founded the Tang Golden Age, turning Chang\'an into the largest and most multi-ethnic metropolis on Earth, welcoming envoys from Persia and Rome.',
        relicImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Instituted the legal Code of Tang, model for East Asian jurisprudence',
          'Welcomed Buddhist monk Xuanzang and sponsored translation academies',
          'Established religious tolerance for Nestorian Christians and Zoroastrians'
        ],
        legacy: 'Celebrated as the quintessential model of benevolent Chinese governance.',
        region: 'China'
      },
      {
        id: 'dyn_yongle_ming',
        name: 'Yongle Emperor (Ming)',
        title: 'Constructor of the Forbidden City',
        years: '1402 – 1424 AD',
        yearNum: 1402,
        description: 'Moved the imperial capital to Beijing, constructed the Forbidden City, restored the Grand Canal, and commissioned Admiral Zheng He’s massive treasure fleets.',
        relicImage: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Constructed the monumental Forbidden City palace complex in Beijing',
          'Dispatched Admiral Zheng He on 7 colossal Indian Ocean voyages',
          'Commissioned the 11,000-volume Yongle Encyclopedia'
        ],
        legacy: 'Peak of Chinese naval reach and imperial architectural mastery.',
        region: 'China'
      }
    ]
  },
  {
    id: 'dynasty_greece',
    title: 'Classical Greece & Hellenistic Age',
    subtitle: 'From Athenian Democracy to Alexandrian Empire (461 BC – 30 BC)',
    summary: 'The explosion of democratic politics, rigorous rational philosophy, theatre, and Hellenistic cultural synthesis across Eurasia.',
    bgGradient: 'from-sky-950/25 via-blue-950/15 to-[#0A0A0A] border-sky-500/25',
    nodes: [
      {
        id: 'dyn_pericles',
        name: 'Pericles of Athens',
        title: 'Statesman of the Golden Age',
        years: '461 – 429 BC',
        yearNum: -461,
        description: 'Championed radical direct democracy in Athens, promoted arts and philosophy, and commissioned the iconic Parthenon atop the Acropolis.',
        relicImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Commissioned the Parthenon and Propylaea on the Athenian Acropolis',
          'Paid daily wages to democratic jurors, enabling working-class voting',
          'Fostered the flourishing of Socrates, Sophocles, and Herodotus'
        ],
        legacy: 'The golden baseline for civic democracy and Western philosophical thought.',
        region: 'Greece'
      },
      {
        id: 'dyn_alexander_great',
        name: 'Alexander the Great',
        title: 'Hegemon of Macedonia & King of Asia',
        years: '336 – 323 BC',
        yearNum: -336,
        description: 'Undefeated military genius who dismantled the Achaemenid Persian Empire and marched his army to the Punjab River, spreading Greek thought to Asia.',
        relicImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Conquered the Persian Empire in 12 continuous years of victory',
          'Founded Alexandria in Egypt, future intellectual capital of antiquity',
          'Diffused Hellenistic art, science, and philosophy from the Nile to Indus'
        ],
        legacy: 'The universal historical archetype of conquering martial brilliance.',
        region: 'Greece'
      },
      {
        id: 'dyn_ptolemy_soter',
        name: 'Ptolemy I Soter',
        title: 'Founder of the Ptolemaic Dynasty & Great Library',
        years: '305 – 282 BC',
        yearNum: -305,
        description: 'General of Alexander who secured Egypt, crowned himself Pharaoh, and established the Great Library and Musaeum of Alexandria.',
        relicImage: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Built the Great Library of Alexandria, gathering the world’s scrolls',
          'Constructed the Pharos Lighthouse of Alexandria (Wonder of the World)',
          'Authored an eyewitness historical chronicle of Alexander\'s campaigns'
        ],
        legacy: 'Preserved ancient scientific knowledge and geometry for millennia.',
        region: 'Greece'
      }
    ]
  },
  {
    id: 'dynasty_renaissance',
    title: 'Renaissance & Age of Enlightenment',
    subtitle: 'From Medici Humanism to the Age of Revolution (1469 – 1815 AD)',
    summary: 'The intellectual, scientific, and geopolitical revolution that dismantled feudalism, rediscovered antiquity, and shaped modern constitutional states.',
    bgGradient: 'from-amber-950/20 via-emerald-950/15 to-[#0A0A0A] border-amber-500/25',
    nodes: [
      {
        id: 'dyn_lorenzo_medici',
        name: 'Lorenzo the Magnificent',
        title: 'Florentine Statesman & Renaissance Patron',
        years: '1469 – 1492 AD',
        yearNum: 1469,
        description: 'De facto ruler of the Florentine Republic who championed Neoplatonism and patronized Leonardo da Vinci, Michelangelo, and Botticelli.',
        relicImage: 'https://images.unsplash.com/photo-1549880180-4c809c0250a2?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Patronized Leonardo da Vinci, Botticelli, and young Michelangelo',
          'Maintained delicate balance of power among Italian city-states',
          'Founded the Platonic Academy and built massive humanist libraries'
        ],
        legacy: 'The primary cultural catalyst of the Italian High Renaissance.',
        region: 'Europe'
      },
      {
        id: 'dyn_elizabeth_i',
        name: 'Queen Elizabeth I',
        title: 'The Virgin Queen of England',
        years: '1558 – 1603 AD',
        yearNum: 1558,
        description: 'Consolidated Protestant England, defeated the Spanish Armada in 1588, and presided over the Elizabethan Golden Age of Shakespeare.',
        relicImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Decisively repelled the massive Spanish Armada naval invasion (1588)',
          'Fostered the flourishing of William Shakespeare and Christopher Marlowe',
          'Established the moderate Elizabethan Religious Settlement'
        ],
        legacy: 'Transformed England into a global maritime trade titan.',
        region: 'Europe'
      },
      {
        id: 'dyn_louis_xiv',
        name: 'Louis XIV (Sun King)',
        title: 'The Grand Monarch of France',
        years: '1643 – 1715 AD',
        yearNum: 1643,
        description: 'Absolute monarch who reigned for 72 years, transformed France into the cultural capital of Europe, and constructed the Palace of Versailles.',
        relicImage: 'https://images.unsplash.com/photo-1600577916048-804c9191e36c?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Built the monumental Palace and Hall of Mirrors at Versailles',
          'Patronized Molière, Racine, and founded the Royal Academy of Sciences',
          'Standardized modern European diplomacy, etiquette, and military drill'
        ],
        legacy: 'The definitive archetypal absolute monarch in world history.',
        region: 'Europe'
      },
      {
        id: 'dyn_napoleon',
        name: 'Napoleon Bonaparte',
        title: 'Emperor of the French',
        years: '1799 – 1815 AD',
        yearNum: 1799,
        description: 'Revolutionary general who dominated continental Europe, reformed civil administration, and formulated the Napoleonic Code.',
        relicImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=400',
        achievements: [
          'Authored the Napoleonic Code, foundation of civil law across 40+ nations',
          'Abolished feudalism and serfdom across conquered European territories',
          'Masterminded the tactical masterpiece victory at Battle of Austerlitz'
        ],
        legacy: 'Modernized continental European legal, educational, and road systems.',
        region: 'Europe'
      }
    ]
  }
];

// Custom region-classification helper based on titles, descriptions, and figures
const getRegionOfEvent = (event: HistoricalEvent): 'Europe' | 'India' | 'Greece' | 'Rome' | 'Egypt' | 'China' | 'Global' => {
  const text = (event.title + ' ' + event.description + ' ' + (event.participants || []).join(' ')).toLowerCase();
  
  if (text.includes('china') || text.includes('chinese') || text.includes('qin') || text.includes('han ') || text.includes('tang ') || text.includes('ming ') || text.includes('song ') || text.includes('beijing') || text.includes('silk road') || text.includes('great wall') || text.includes('terracotta')) {
    return 'China';
  }
  if (text.includes('pharaoh') || text.includes('giza') || text.includes('egypt') || text.includes('cleopatra') || text.includes('kadesh') || text.includes('nile') || text.includes('hatshepsut') || text.includes('tutankhamun') || text.includes('ramesses')) {
    return 'Egypt';
  }
  if (text.includes('rome') || text.includes('roman') || text.includes('caesar') || text.includes('augustus') || text.includes('vulcan') || text.includes('pompeii') || text.includes('colosseum') || text.includes('aqueduct') || text.includes('hadrian') || text.includes('trajan')) {
    return 'Rome';
  }
  if (text.includes('greek') || text.includes('greece') || text.includes('athens') || text.includes('athenian') || text.includes('sparta') || text.includes('leonidas') || text.includes('alexander') || text.includes('hellenistic') || text.includes('socrates') || text.includes('plato') || text.includes('aristotle') || text.includes('parthenon') || text.includes('pericles') || text.includes('ptolemy')) {
    return 'Greece';
  }
  if (text.includes('india') || text.includes('indian') || text.includes('ashoka') || text.includes('maurya') || text.includes('mughal') || text.includes('gupta') || text.includes('shivaji') || text.includes('maratha') || text.includes('akbar')) {
    return 'India';
  }
  if (text.includes('europe') || text.includes('european') || text.includes('charlemagne') || text.includes('black death') || text.includes('magna carta') || text.includes('french revolution') || text.includes('printing press') || text.includes('waterloo') || text.includes('napoleon') || text.includes('renaissance') || text.includes('steam engine') || text.includes('marconi') || text.includes('elizabeth') || text.includes('medici') || text.includes('versailles')) {
    return 'Europe';
  }
  return 'Global';
};

interface TimelineSectionProps {
  onAddNote?: (title: string, content: string, type: UserNote['targetType'], targetId?: string) => void;
  onDeleteNote?: (id: string) => void;
  notes?: UserNote[];
  selectedEventId?: string | null;
  onSelectEventOnMap?: (event: HistoricalEvent) => void;
  bookmarks?: Bookmark[];
  onToggleBookmark?: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
}

const TIMELINE_STORAGE_KEY = 'chronos_timeline_reader_state_v3';

interface SavedTimelineState {
  selectedEra: string;
  selectedRegion: string;
  searchQuery: string;
  sliderYear: number;
  hideFuture: boolean;
  activeDynastyId: string;
  activeNodeId: string;
  expandedEventId: string | null;
  scrollY: number;
  lastUpdated: number;
}

const getSavedTimelineState = (): SavedTimelineState | null => {
  try {
    const raw = localStorage.getItem(TIMELINE_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse saved timeline state:', e);
  }
  return null;
};

export default function TimelineSection({ 
  onAddNote, 
  onDeleteNote, 
  notes = [],
  selectedEventId = null,
  onSelectEventOnMap,
  bookmarks = [],
  onToggleBookmark
}: TimelineSectionProps) {
  // Load saved reading progress if available
  const initialSaved = useRef(getSavedTimelineState()).current;

  const [selectedEra, setSelectedEra] = useState<string>(() => initialSaved?.selectedEra || 'All');
  const [selectedRegion, setSelectedRegion] = useState<string>(() => initialSaved?.selectedRegion || 'All');
  const [searchQuery, setSearchQuery] = useState<string>(() => initialSaved?.searchQuery || '');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(() => initialSaved?.expandedEventId || null);

  // Time Travel states
  const [sliderYear, setSliderYear] = useState<number>(() => initialSaved?.sliderYear ?? 2030);
  const [hideFuture, setHideFuture] = useState<boolean>(() => initialSaved?.hideFuture ?? false);

  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);

  // Dynasty Timeline States
  const [activeDynastyId, setActiveDynastyId] = useState<string>(() => initialSaved?.activeDynastyId || 'dynasty_egypt');
  const [activeNodeId, setActiveNodeId] = useState<string>(() => initialSaved?.activeNodeId || 'dyn_hatshepsut');

  // Interactive scroll helpers
  const isUserSliderActionRef = useRef<boolean>(false);
  const isInitialMountRef = useRef<boolean>(true);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [resumedBanner, setResumedBanner] = useState<{ show: boolean; pos: number } | null>(null);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  // Generate unified stream combining events and leader reigns
  const unifiedTimelineItems = useMemo(() => {
    // 1. Convert base events
    const eventItems = HISTORICAL_EVENTS.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      year: event.year,
      era: event.era,
      description: event.description,
      impact: event.impact,
      participants: event.participants,
      category: event.category || 'Political Milestone',
      region: getRegionOfEvent(event),
      isReign: false,
      originalEvent: event
    }));

    // 2. Convert leader reigns
    const reignItems = MONARCHS.map(monarch => {
      // Parse start year
      let startYear = 0;
      const reignStr = monarch.reign;
      const matchBC = reignStr.match(/(\d+)\s*–\s*(\d+)\s*BC/i) || reignStr.match(/(\d+)\s*BC/i);
      const matchAD = reignStr.match(/(\d+)\s*–\s*(\d+)\s*AD/i) || reignStr.match(/(\d+)\s*AD/i) || reignStr.match(/(\d+)\s*–\s*(\d+)/);
      
      if (matchBC) {
        startYear = -parseInt(matchBC[1], 10);
      } else if (matchAD) {
        startYear = parseInt(matchAD[1], 10);
      } else {
        const numericals = reignStr.match(/(-?\d+)/);
        startYear = numericals ? parseInt(numericals[1], 10) : 0;
      }

      // Determine era
      let era: 'Ancient' | 'Classical' | 'Medieval' | 'Early Modern' | 'Modern' = 'Classical';
      if (startYear < -500) era = 'Ancient';
      else if (startYear < 476) era = 'Classical';
      else if (startYear < 1453) era = 'Medieval';
      else if (startYear < 1789) era = 'Early Modern';
      else era = 'Modern';

      let mappedRegion: 'Europe' | 'India' | 'Greece' | 'Rome' | 'Egypt' | 'Global' = 'Global';
      if (monarch.region === 'Egyptian') mappedRegion = 'Egypt';
      else if (monarch.region === 'Greek') mappedRegion = 'Greece';
      else if (monarch.region === 'Roman') mappedRegion = 'Rome';
      else if (monarch.region === 'Indian') mappedRegion = 'India';
      else if (monarch.region === 'European') mappedRegion = 'Europe';

      return {
        id: `reign_${monarch.id}`,
        title: `Reign of ${monarch.name}`,
        date: `Reign: ${monarch.reign}`,
        year: startYear,
        era,
        description: monarch.biography,
        impact: `Legacy: ${monarch.legacy}. Key achievements included: ${monarch.keyAchievements.join(', ')}`,
        participants: [monarch.name],
        category: 'Political Milestone' as const,
        region: mappedRegion,
        isReign: true,
        monarchRef: monarch,
        originalEvent: undefined
      };
    });

    return [...eventItems, ...reignItems].sort((a, b) => a.year - b.year);
  }, []);

  // Compute related figure & event links for the popups
  const getRelatedLinks = (item: any) => {
    const figures = HISTORICAL_FIGURES.filter(fig => {
      const nameMatch = item.title.toLowerCase().includes(fig.name.toLowerCase()) || 
                        item.description.toLowerCase().includes(fig.name.toLowerCase());
      return nameMatch && fig.name !== item.title;
    }).slice(0, 3);

    const relatedEvents = unifiedTimelineItems.filter(evt => {
      return evt.id !== item.id && (evt.region === item.region || evt.era === item.era);
    }).slice(0, 3);

    return { figures, relatedEvents };
  };

  const handleShare = (eventId: string, eventYear: number) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?event=${eventId}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopiedEventId(eventId);
        setTimeout(() => setCopiedEventId(null), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy timeline event deep link:', err);
      });
  };

  // Mount effect: handle deep linking or restore scroll position or open explicitly at top
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('event');

    if (eventId) {
      const matched = unifiedTimelineItems.find(e => e.id === eventId);
      if (matched) {
        setExpandedEventId(eventId);
        setSliderYear(matched.year);
        setSelectedEra('All');
        setSelectedRegion('All');
        setTimeout(() => {
          const el = document.getElementById(`timeline-event-${eventId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 400);
      }
    } else if (initialSaved && typeof initialSaved.scrollY === 'number' && initialSaved.scrollY > 150) {
      // Return user right to where they left off
      const timer = setTimeout(() => {
        window.scrollTo({ top: initialSaved.scrollY, behavior: 'smooth' });
        setResumedBanner({ show: true, pos: initialSaved.scrollY });
        setTimeout(() => setResumedBanner(null), 6000);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Default: ensure page strictly opens at the top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    const timer = setTimeout(() => {
      isInitialMountRef.current = false;
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Save state and scroll position continuously to localStorage
  useEffect(() => {
    const saveState = (scrollYVal?: number) => {
      const stateToSave: SavedTimelineState = {
        selectedEra,
        selectedRegion,
        searchQuery,
        sliderYear,
        hideFuture,
        activeDynastyId,
        activeNodeId,
        expandedEventId,
        scrollY: typeof scrollYVal === 'number' ? scrollYVal : window.scrollY,
        lastUpdated: Date.now()
      };
      try {
        localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(stateToSave));
      } catch (e) {
        console.error('Error saving timeline reading state:', e);
      }
    };

    let scrollTimeout: any = null;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBackToTop(currentScrollY > 300);
      
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        saveState(currentScrollY);
      }, 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Save on state change
    saveState(window.scrollY);

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
      saveState(window.scrollY);
    };
  }, [selectedEra, selectedRegion, searchQuery, sliderYear, hideFuture, activeDynastyId, activeNodeId, expandedEventId]);

  // Synchronize filter state changes
  const eras = ['All', 'Ancient', 'Classical', 'Medieval', 'Early Modern', 'Modern'];
  const regions = ['All', 'Europe', 'India', 'Greece', 'Rome', 'Egypt'];

  const filteredEvents = unifiedTimelineItems.filter((event) => {
    const matchesEra = selectedEra === 'All' || event.era === selectedEra;
    const matchesRegion = selectedRegion === 'All' || event.region === selectedRegion;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.date.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEra && matchesRegion && matchesSearch;
  });

  // Derive min and max years of current query
  const filteredYears = filteredEvents.map((e) => e.year);
  const minYear = filteredYears.length ? Math.min(...filteredYears) : -2560;
  const maxYear = filteredYears.length ? Math.max(...filteredYears) : 2026;

  // Smoothened scroll effect on Temporal Dial change ONLY when user actively drags or clicks slider
  useEffect(() => {
    if (!isUserSliderActionRef.current || isInitialMountRef.current) return;

    const activeEpochs = filteredEvents.filter((e) => e.year <= sliderYear);
    if (activeEpochs.length > 0) {
      const closestEvent = activeEpochs[activeEpochs.length - 1];
      const element = document.getElementById(`timeline-event-${closestEvent.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [sliderYear, filteredEvents]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDynasty = (dynastyId: string) => {
    const dynasty = DYNASTY_PERIODS.find(p => p.id === dynastyId);
    if (dynasty) {
      setActiveDynastyId(dynastyId);
      setActiveNodeId(dynasty.nodes[0].id);
      // Bring up to top of dynasty tracker so user reads from the top
      const el = document.getElementById('dynasty-tracker-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSelectNode = (nodeId: string) => {
    setActiveNodeId(nodeId);
    // Smoothly keep the active card in view
    const el = document.getElementById('dynasty-active-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleSaveReadingSpot = () => {
    setSavedNotification("📌 Reading progress & timeline position saved!");
    setTimeout(() => setSavedNotification(null), 3000);
  };

  const formatYear = (year: number) => {
    if (year < 0) {
      return `c. ${Math.abs(year)} BC`;
    }
    return `c. ${year} AD`;
  };

  const sliderPercent = maxYear > minYear
    ? Math.round(((sliderYear - minYear) / (maxYear - minYear)) * 100)
    : 100;

  // Filter events: in hide mode, we physically slice out events in the future
  const visibleEvents = hideFuture
    ? filteredEvents.filter((event) => event.year <= sliderYear)
    : filteredEvents;

  // Timeline Pagination State
  const [timelinePage, setTimelinePage] = useState<number>(1);
  const [timelineItemsPerPage, setTimelineItemsPerPage] = useState<number>(30);

  // Reset page when filters or sliders change
  useEffect(() => {
    setTimelinePage(1);
  }, [selectedEra, selectedRegion, searchQuery, hideFuture, sliderYear]);

  // Paginated visible events
  const paginatedVisibleEvents = useMemo(() => {
    const start = (timelinePage - 1) * timelineItemsPerPage;
    return visibleEvents.slice(start, start + timelineItemsPerPage);
  }, [visibleEvents, timelinePage, timelineItemsPerPage]);

  // Event sequential dive navigation
  const currentExpandedIndex = useMemo(() => {
    if (!expandedEventId) return -1;
    return visibleEvents.findIndex(e => e.id === expandedEventId);
  }, [expandedEventId, visibleEvents]);

  const handlePrevEventDive = () => {
    if (currentExpandedIndex > 0) {
      const prev = visibleEvents[currentExpandedIndex - 1];
      setExpandedEventId(prev.id);
      const targetPage = Math.floor((currentExpandedIndex - 1) / timelineItemsPerPage) + 1;
      if (targetPage !== timelinePage) setTimelinePage(targetPage);
      setTimeout(() => {
        document.getElementById(`timeline-event-${prev.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleNextEventDive = () => {
    if (currentExpandedIndex < visibleEvents.length - 1 && currentExpandedIndex >= 0) {
      const next = visibleEvents[currentExpandedIndex + 1];
      setExpandedEventId(next.id);
      const targetPage = Math.floor((currentExpandedIndex + 1) / timelineItemsPerPage) + 1;
      if (targetPage !== timelinePage) setTimelinePage(targetPage);
      setTimeout(() => {
        document.getElementById(`timeline-event-${next.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div className="space-y-6 relative" id="timeline-top-anchor">
      {/* Intro and controls */}
      <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl shadow-sm p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-xl font-serif italic text-[#D4AF37] tracking-tight flex items-center gap-2">
              <History className="text-[#D4AF37] w-5 h-5 animate-pulse" />
              Chronological Timeline & Major Milestones
            </h3>
            <p className="text-xs text-[#A09890] mt-1 font-sans">
              Journey through the turning points and revolutionary events that sculpted human history.
            </p>
          </div>

          {/* Quick Epochs Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#0A0A0A] px-3.5 py-1.5 rounded-lg border border-[#2A2A2A]">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-mono font-semibold text-[#D4AF37]">
                {filteredEvents.length} Key Epochs
              </span>
            </div>
          </div>
        </div>

        {savedNotification && (
          <div className="p-3 bg-[#122C26]/40 border border-[#234D43] text-[#8CA59C] rounded-xl flex items-center gap-2 text-xs font-mono animate-fade-in">
            <Check className="w-4 h-4 text-[#E5C158]" />
            <span>{savedNotification}</span>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-[#1F1F1F]">
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#A09890]" />
            <input
              type="text"
              placeholder="Search events, dates, or figures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all font-sans"
            />
          </div>

          <div className="md:col-span-8 flex flex-wrap gap-2 items-center justify-start md:justify-end">
            <span className="text-xs text-[#A09890] flex items-center gap-1 font-medium mr-2">
              <SlidersHorizontal className="w-3 h-3 text-[#D4AF37]" /> Filter Era:
            </span>
            {eras.map((era) => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-3 py-1.5 text-xs rounded-lg font-mono transition-colors border cursor-pointer ${
                  selectedEra === era
                    ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                    : 'bg-[#151515] text-[#A09890] border-[#2A2A2A] hover:bg-[#1E1E1E] hover:text-[#E0D8D0]'
                }`}
              >
                {era}
              </button>
            ))}
          </div>
        </div>

        {/* Civilization & Region Filter Row */}
        <div className="pt-3 border-t border-[#1F1F1F] flex flex-wrap items-center gap-3">
          <span className="text-xs text-[#A09890] flex items-center gap-1 font-medium mr-2 font-mono">
            <span>🗺️</span> CIVILIZATION FOCUS:
          </span>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => {
              const regionLabels: Record<string, string> = {
                All: '🌐 All Realms',
                Europe: '🏰 Western Europe',
                India: '🇮🇳 Ancient India',
                Greece: '🇬🇷 Classical Greece',
                Rome: '🛡️ Roman Empire',
                Egypt: '🐈 Dynastic Egypt'
              };
              return (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-mono transition-colors border cursor-pointer flex items-center gap-1.5 ${
                    selectedRegion === region
                      ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                      : 'bg-[#151515] text-[#A09890] border-[#2A2A2A] hover:bg-[#1E1E1E] hover:text-[#E0D8D0]'
                  }`}
                >
                  {regionLabels[region] || region}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Legend Row */}
        <div className="pt-3 border-t border-[#1F1F1F] flex flex-wrap items-center gap-4 text-xs">
          <span className="text-[#A09890] font-mono text-[10px] uppercase font-bold tracking-wider">Legend:</span>
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-rose-400 font-mono text-[11px] bg-rose-950/20 border border-rose-500/20 px-2.5 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> ⚔ War / Conflict
            </span>
            <span className="flex items-center gap-1.5 text-sky-400 font-mono text-[11px] bg-sky-950/20 border border-sky-500/20 px-2.5 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span> 🧪 Scientific Discovery
            </span>
            <span className="flex items-center gap-1.5 text-[#D4AF37] font-mono text-[11px] bg-amber-950/20 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> 🏛 Political Milestone
            </span>
            <span className="flex items-center gap-1.5 text-indigo-400 font-mono text-[11px] bg-indigo-950/20 border border-indigo-400/20 px-2.5 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 🎨 Cultural Shift / Epoch
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] bg-emerald-950/20 border border-emerald-400/20 px-2.5 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 📐 Monumental Creation
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Animated Time Slider Panel */}
      {filteredEvents.length > 0 && (
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 shadow-lg text-left relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#D4AF37]/2 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 relative z-10">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#A09890] uppercase flex items-center gap-1.5 font-bold animate-pulse">
                <Compass className="w-3.5 h-3.5 text-[#D4AF37] animate-spin-slow" />
                Temporal Navigation Dial
              </span>
              <h4 className="text-lg font-serif italic text-white flex flex-wrap items-baseline gap-2">
                Focused Epoch:{" "}
                <span className="text-[#D4AF37] font-sans font-extrabold tracking-wide text-2xl drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]">
                  {formatYear(sliderYear)}
                </span>
              </h4>
            </div>

            {/* Display Controls & Era Presets */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex bg-[#0A0A0A] p-0.5 rounded-lg border border-[#2A2A2A] gap-1">
                <button
                  onClick={() => {
                    isUserSliderActionRef.current = true;
                    setSliderYear(-1500);
                    setTimeout(() => { isUserSliderActionRef.current = false; }, 600);
                  }}
                  className="px-2 py-1 text-[9px] font-mono font-bold text-[#A09890] hover:text-[#D4AF37] bg-[#121212] border border-[#1E1E1E] rounded cursor-pointer"
                  title="Jump to 1500 BC (Bronze Age)"
                >
                  -1500 BC
                </button>
                <button
                  onClick={() => {
                    isUserSliderActionRef.current = true;
                    setSliderYear(-500);
                    setTimeout(() => { isUserSliderActionRef.current = false; }, 600);
                  }}
                  className="px-2 py-1 text-[9px] font-mono font-bold text-[#A09890] hover:text-[#D4AF37] bg-[#121212] border border-[#1E1E1E] rounded cursor-pointer"
                  title="Jump to 500 BC (Classical)"
                >
                  -500 BC
                </button>
                <button
                  onClick={() => {
                    isUserSliderActionRef.current = true;
                    setSliderYear(800);
                    setTimeout(() => { isUserSliderActionRef.current = false; }, 600);
                  }}
                  className="px-2 py-1 text-[9px] font-mono font-bold text-[#A09890] hover:text-[#D4AF37] bg-[#121212] border border-[#1E1E1E] rounded cursor-pointer"
                  title="Jump to 800 AD (Medieval)"
                >
                  800 AD
                </button>
                <button
                  onClick={() => {
                    isUserSliderActionRef.current = true;
                    setSliderYear(1789);
                    setTimeout(() => { isUserSliderActionRef.current = false; }, 600);
                  }}
                  className="px-2 py-1 text-[9px] font-mono font-bold text-[#A09890] hover:text-[#D4AF37] bg-[#121212] border border-[#1E1E1E] rounded cursor-pointer"
                  title="Jump to 1789 AD (Revolution)"
                >
                  1789 AD
                </button>
                <button
                  onClick={() => {
                    isUserSliderActionRef.current = true;
                    setSliderYear(2026);
                    setTimeout(() => { isUserSliderActionRef.current = false; }, 600);
                  }}
                  className="px-2 py-1 text-[9px] font-mono font-bold text-[#A09890] hover:text-[#D4AF37] bg-[#121212] border border-[#1E1E1E] rounded cursor-pointer"
                  title="Jump to 2026 AD (Modern)"
                >
                  2026 AD
                </button>
              </div>

              {/* Slider Focus Mode Selector */}
              <div className="flex bg-[#0A0A0A] p-0.5 rounded-lg border border-[#2A2A2A]">
                <button
                  onClick={() => setHideFuture(false)}
                  id="mode-illuminate-btn"
                  className={`px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-md font-mono transition-all cursor-pointer ${
                    !hideFuture
                      ? 'bg-[#D4AF37] text-black font-bold'
                      : 'text-[#A09890] hover:text-[#E0D8D0]'
                  }`}
                  title="Show all events but dim and blur future ones"
                >
                  Illuminated Focus
                </button>
                <button
                  onClick={() => setHideFuture(true)}
                  id="mode-chronological-btn"
                  className={`px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-md font-mono transition-all cursor-pointer ${
                    hideFuture
                      ? 'bg-[#D4AF37] text-black font-bold'
                      : 'text-[#A09890] hover:text-[#E0D8D0]'
                  }`}
                  title="Completely hide events ahead of the selected year"
                >
                  Chronological Travel
                </button>
              </div>
            </div>
          </div>

          {/* Slider input element */}
          <div className="space-y-2 relative z-10">
            <div className="relative pt-1">
              <input
                type="range"
                min={minYear}
                max={maxYear}
                value={sliderYear}
                onMouseDown={() => { isUserSliderActionRef.current = true; }}
                onTouchStart={() => { isUserSliderActionRef.current = true; }}
                onMouseUp={() => { setTimeout(() => { isUserSliderActionRef.current = false; }, 500); }}
                onTouchEnd={() => { setTimeout(() => { isUserSliderActionRef.current = false; }, 500); }}
                onChange={(e) => {
                  isUserSliderActionRef.current = true;
                  setSliderYear(Number(e.target.value));
                }}
                className="w-full h-1.5 bg-[#1F1F1F] rounded-lg appearance-none cursor-ew-resize accent-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
              {/* slider track marker descriptions */}
              <div className="flex justify-between text-[10px] font-mono text-[#7A7065] mt-1.5">
                <span className="bg-[#121212] px-2 py-0.5 rounded border border-[#2A2A2A]">{formatYear(minYear)}</span>
                <span className="text-[#D4AF37] font-semibold animate-pulse">
                  {sliderPercent}% Era Unfolded
                </span>
                <span className="bg-[#121212] px-2 py-0.5 rounded border border-[#2A2A2A]">{formatYear(maxYear)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Timeline Interactive Track */}
      {visibleEvents.length > 0 ? (
        <div className="space-y-6">
          {/* Top Pagination Controls */}
          <PaginationControls
            currentPage={timelinePage}
            totalItems={visibleEvents.length}
            itemsPerPage={timelineItemsPerPage}
            onPageChange={(page) => {
              setTimelinePage(page);
              document.getElementById('timeline-track-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            onItemsPerPageChange={(count) => {
              setTimelineItemsPerPage(count);
              setTimelinePage(1);
            }}
            itemsPerPageOptions={[15, 30, 60, 120]}
            itemLabel="historical milestones"
          />

          <div id="timeline-track-anchor" className="relative pl-6 md:pl-32 py-4">
            {/* Timeline Center Line */}
            <div className="absolute left-6 md:left-[112px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2A2A2A] via-[#D4AF37]/45 to-[#2A2A2A] pointer-events-none"></div>

            {/* Loop Events */}
            <div className="space-y-8">
              <AnimatePresence initial={false}>
                {paginatedVisibleEvents.map((event) => {
                const isExpanded = expandedEventId === event.id;
                const isActive = event.year <= sliderYear;
                
                const eraColors: Record<string, string> = {
                  Ancient: 'bg-[#1C160F] text-amber-500 border-amber-500/25',
                  Classical: 'bg-[#0F1424] text-sky-400 border-sky-400/25',
                  Medieval: 'bg-[#1A0F24] text-purple-400 border-purple-400/25',
                  'Early Modern': 'bg-[#240F11] text-rose-400 border-rose-400/25',
                  Modern: 'bg-[#0F2414] text-emerald-400 border-emerald-400/25'
                };

                return (
                  <motion.div
                    key={event.id}
                    id={`timeline-event-${event.id}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group text-left scroll-mt-24"
                    layout
                  >
                    {/* Left Side Year Label (Desktop only) */}
                    <div className="hidden md:block absolute -left-[144px] top-1.5 w-24 text-right">
                      <motion.span 
                        animate={{
                          opacity: isActive ? 1 : 0.4,
                          borderColor: isActive ? '#D4AF37' : '#2A2A2A',
                          color: isActive ? '#D4AF37' : '#A09890'
                        }}
                        transition={{ duration: 0.4 }}
                        className="font-mono text-xs font-bold tracking-tight bg-[#0F0F0F] px-2 py-1 rounded-lg border shadow-md"
                      >
                        {event.date.replace(' AD', '').replace(' BC', ' BC').replace('Reign: ', '')}
                      </motion.span>
                    </div>

                    {/* Bullet Node */}
                    <div className={`absolute -left-6 md:-left-[14px] top-3 w-4.5 h-4.5 rounded-full border bg-[#050505] flex items-center justify-center transition-all ${
                      isActive 
                        ? event.isReign ? 'border-amber-400 ring-4 ring-amber-500/15' :
                          event.category === 'War' ? 'border-rose-400 ring-4 ring-rose-500/15' :
                          event.category === 'Science & Innovation' ? 'border-sky-400 ring-4 ring-sky-500/15' :
                          event.category === 'Political Milestone' ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/15' :
                          event.category === 'Cultural Shift' ? 'border-indigo-400 ring-4 ring-indigo-500/15' :
                          event.category === 'Monumental Creation' ? 'border-emerald-400 ring-4 ring-emerald-500/15' :
                          'border-[#D4AF37] ring-4 ring-[#D4AF37]/15'
                        : 'border-[#2A2A2A]'
                    }`}>
                      <motion.div 
                        animate={{
                          backgroundColor: isActive 
                            ? event.isReign ? '#f59e0b' :
                              event.category === 'War' ? '#f43f5e' :
                              event.category === 'Science & Innovation' ? '#38bdf8' :
                              event.category === 'Political Milestone' ? '#D4AF37' :
                              event.category === 'Cultural Shift' ? '#818cf8' :
                              event.category === 'Monumental Creation' ? '#34d399' :
                              '#D4AF37'
                            : '#2A2A2A',
                          scale: isActive ? 1 : 0.7
                        }}
                        transition={{ duration: 0.4 }}
                        className="w-1.5 h-1.5 rounded-full"
                      />
                    </div>

                    {/* Card content wrapper handling dim/fade future states */}
                    <motion.div
                      id={`timeline-event-${event.id}`}
                      animate={{
                        opacity: isActive ? 1 : 0.15,
                        scale: isActive ? 1 : 0.96,
                        y: isActive ? 0 : 4,
                        filter: isActive ? 'none' : 'grayscale(100%) blur(1px)'
                      }}
                      transition={{ duration: 0.4 }}
                      className="timeline-event-card bg-[#0F0F0F] border border-[#2A2A2A] hover:border-[#D4AF37]/50 rounded-xl p-3 sm:p-5 shadow-sm transition-all focus-within:ring-1 focus-within:ring-[#D4AF37]/25 text-left relative"
                    >
                      {!isActive && (
                        <div className="absolute inset-0 bg-[#000000]/3 rounded-xl pointer-events-none z-10 flex items-center justify-center">
                          <span className="bg-black/80 px-2.5 py-1 rounded text-[9px] font-mono text-[#D4AF37]/60 border border-[#2A2A2A]/40 uppercase tracking-widest font-bold shadow-lg">
                            Yet to unfold
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[#2A2A2A]">
                        <div className="space-y-1 text-left">
                          <div className="flex items-center flex-wrap gap-2">
                            <span className={`text-[9px] sm:text-[10px] font-mono tracking-wider uppercase font-semibold px-2 py-0.5 rounded border ${eraColors[event.era] || 'bg-[#151515] border-[#2A2A2A]'}`}>
                              {event.era} Era
                            </span>
                            {event.isReign ? (
                              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded border border-amber-500/25 bg-amber-950/40 text-amber-400">
                                👑 Leader Reign
                              </span>
                            ) : (
                              event.category && (
                                <span className={`text-[9px] sm:text-[10px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded border ${
                                  event.category === 'War' ? 'bg-rose-950/40 text-rose-400 border-rose-500/25' :
                                  event.category === 'Science & Innovation' ? 'bg-sky-950/40 text-sky-400 border-sky-500/25' :
                                  event.category === 'Political Milestone' ? 'bg-amber-950/40 text-[#D4AF37] border-[#D4AF37]/25' :
                                  event.category === 'Cultural Shift' ? 'bg-indigo-950/40 text-indigo-400 border-indigo-400/25' :
                                  event.category === 'Monumental Creation' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-400/25' :
                                  'bg-[#151515] text-[#A09890] border-[#2A2A2A]'
                                }`}>
                                  {event.category}
                                </span>
                              )
                            )}
                            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded border border-purple-500/25 bg-purple-950/45 text-purple-400">
                              {event.region}
                            </span>
                            <span className="md:hidden text-xs font-mono font-medium text-[#A09890]">
                              • {event.date}
                            </span>
                          </div>
                          <h4 className="font-serif italic font-bold text-[#E0D8D0] tracking-normal text-base sm:text-lg md:text-xl text-left">
                            {event.title}
                          </h4>
                        </div>
                        <div className="text-xs text-[#D4AF37] font-mono flex items-center gap-1.5 shrink-0 justify-start sm:justify-end">
                          <Calendar className="w-3.5 h-3.5 text-[#D4AF37] opacity-60" />
                          {event.date}
                        </div>
                      </div>

                      <div className="mt-3 text-left">
                        <p className="text-xs sm:text-sm text-[#A09890] leading-relaxed font-sans font-light">
                          {event.description}
                        </p>
                      </div>

                      {/* Expandable key details / participants */}
                      <div className="mt-4 pt-4 border-t border-[#2A2A2A] flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-[#A09890] font-mono flex items-center gap-1">
                            <Users className="w-3 h-3 text-[#D4AF37]" /> Key Players:
                          </span>
                          {event.participants.map((player) => (
                            <span key={player} className="text-xs bg-[#151515] text-[#E0D8D0] border border-[#2A2A2A] px-2 py-0.5 rounded font-medium">
                              {player}
                            </span>
                          ))}
                        </div>

                         <div className="flex flex-wrap items-center gap-2">
                           <button
                             onClick={() => handleShare(event.id, event.year)}
                             disabled={!isActive}
                             className={`px-2.5 py-1 text-xs rounded-lg border transition-all flex items-center gap-1.5 font-sans ${
                               !isActive
                                 ? 'opacity-30 cursor-not-allowed border-[#1E1E1E]'
                                 : 'bg-[#121212] hover:bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#D4AF37]/45 text-[#A09890] hover:text-[#D4AF37] cursor-pointer'
                             }`}
                             title="Copy direct shareable link of this event to clipboard"
                           >
                             {copiedEventId === event.id ? (
                               <>
                                 <Check className="w-3 h-3 text-emerald-400" />
                                 <span className="text-[10px] text-emerald-400 font-mono">Copied!</span>
                               </>
                             ) : (
                               <>
                                 <Share2 className="w-3 h-3" />
                                 <span className="text-[10px] font-mono text-xs">Share</span>
                               </>
                             )}
                           </button>

                           {isActive && !event.isReign && event.originalEvent && onSelectEventOnMap && (
                             <button
                               onClick={() => onSelectEventOnMap(event.originalEvent)}
                               className={`px-2.5 py-1 text-xs rounded-lg border transition-all flex items-center gap-1.5 font-sans cursor-pointer ${
                                 selectedEventId === event.id
                                   ? 'bg-[#D4AF37] text-black border-[#D4AF37] hover:bg-[#EAC048] font-bold shadow-[0_0_12px_rgba(212,175,55,0.35)] animate-pulse'
                                   : 'bg-[#121212]/30 border-[#2A2A2A] hover:border-[#D4AF37]/50 text-[#A09890] hover:text-[#D4AF37]'
                               }`}
                               title="Locate and focus this event on the world map"
                             >
                               <span>📍</span>
                               <span className="text-[10px] font-mono leading-none">Map View</span>
                             </button>
                           )}

                           {onToggleBookmark && isActive && (
                             <button
                               onClick={() => onToggleBookmark(event.id, 'event', event.title, event.date)}
                               className={`px-3 py-1 text-xs font-semibold border rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                                 bookmarks.some((b) => b.targetId === event.id && b.type === 'event')
                                   ? 'text-yellow-400 border-yellow-500/50 bg-yellow-950/20 shadow-md'
                                   : 'bg-[#121212]/30 border-[#2A2A2A] hover:border-[#D4AF37]/50 text-[#A09890] hover:text-[#D4AF37]'
                               }`}
                               title="Pin this key epoch event to your Notebook bookmarks"
                             >
                               <span>{bookmarks.some((b) => b.targetId === event.id && b.type === 'event') ? '★ Saved' : '☆ Bookmark'}</span>
                             </button>
                           )}

                           {onAddNote && isActive && (
                             <button
                               onClick={() => onAddNote(`${event.title} Note`, `Study Notes based on "${event.title}" (${event.date}): \n\n`, 'Event')}
                               className="bg-[#1A1A1A] text-xs text-[#E0D8D0] hover:text-[#D4AF37] hover:bg-[#1E1E1E] border border-[#2A2A2A] px-3 py-1 rounded-lg transition-colors cursor-pointer"
                             >
                               📝 Study Note
                             </button>
                           )}

                           <a
                             href={`https://en.wikipedia.org/wiki/${encodeURIComponent(event.title.replace(/\s+/g, '_'))}`}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="px-2.5 py-1 text-xs rounded-lg border border-[#D4AF37]/50 bg-[#16120B] hover:bg-[#D4AF37] text-[#F3CF65] hover:text-black transition-all flex items-center gap-1.5 font-mono font-bold cursor-pointer shadow-sm"
                             title="Read full article on Wikipedia in a new tab"
                           >
                             <BookOpen className="w-3 h-3 text-[#D4AF37]" />
                             <span className="text-[10px]">Wikipedia ↗</span>
                           </a>

                           <button
                             onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                             disabled={!isActive}
                             className={`text-xs font-semibold ${isActive ? 'text-[#D4AF37] hover:underline cursor-pointer' : 'text-[#605850] cursor-not-allowed'}`}
                           >
                             {isExpanded ? 'Show Less' : 'View Impact & Legacy →'}
                           </button>
                         </div>
                      </div>

                      {isExpanded && isActive && (
                        <div className="mt-4 p-4 bg-[#080808] rounded-lg border border-[#2A2A2A] text-left animate-fade-in space-y-4">
                          <div>
                            <h5 className="font-semibold text-xs text-[#D4AF37] uppercase tracking-wider font-mono">Legacy & Civilizational Impact</h5>
                            <p className="text-xs text-[#A09890] leading-relaxed mt-2 border-l-2 border-[#D4AF37] pl-3">
                              {event.impact}
                            </p>
                          </div>

                          {/* Wikipedia Scholarly Archive Banner */}
                          <div className="flex items-center justify-between p-3.5 bg-[#120F0A] border border-[#3D2F16] rounded-xl flex-wrap gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#271E0C] text-[#F3CF65] border border-[#D4AF37]/50 flex items-center justify-center text-sm font-serif font-bold shrink-0">
                                W
                              </div>
                              <div>
                                <span className="text-xs font-mono font-bold text-[#E5C158] block">Wikipedia Reference Codex</span>
                                <span className="text-[11px] text-[#A09890] font-sans">Full scholarly bibliography & peer-reviewed historical documentation</span>
                              </div>
                            </div>
                            <a
                              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(event.title.replace(/\s+/g, '_'))}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#F3CF65] text-black font-mono text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow"
                              title="Open Wikipedia entry in a new tab"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Open Wikipedia Article ↗</span>
                            </a>
                          </div>

                          <InlineNotesWidget
                            targetId={event.id}
                            targetType="Event"
                            targetName={event.title}
                            notes={notes}
                            onAddNote={onAddNote || (() => {})}
                            onDeleteNote={onDeleteNote || (() => {})}
                          />

                          {/* Deep Dive Navigation Bar inside Expanded Event */}
                          {currentExpandedIndex >= 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl pt-3">
                              <button
                                onClick={handlePrevEventDive}
                                disabled={currentExpandedIndex === 0}
                                className="w-full sm:w-auto px-3.5 py-2 bg-[#141414] hover:bg-[#1E1E1E] disabled:opacity-30 disabled:cursor-not-allowed border border-[#2A2A2A] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-lg transition-all text-xs font-mono flex items-center gap-2 cursor-pointer group"
                              >
                                <ChevronLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-0.5 transition-transform shrink-0" />
                                <div className="text-left truncate max-w-[170px]">
                                  <span className="text-[9px] uppercase text-[#7A7065] block tracking-wider font-semibold">Previous Epoch</span>
                                  <span className="font-serif italic font-bold text-xs truncate block text-[#F4EFEA]">
                                    {currentExpandedIndex > 0 ? visibleEvents[currentExpandedIndex - 1].title : 'First Epoch'}
                                  </span>
                                </div>
                              </button>

                              <div className="text-center px-3 py-1.5 bg-[#050505] border border-[#2A2A2A] rounded-lg shrink-0">
                                <span className="text-[9px] font-mono text-[#8CA59C] uppercase block tracking-wider font-bold">Timeline Deep Dive</span>
                                <span className="text-xs font-mono font-bold text-[#D4AF37]">
                                  Epoch {currentExpandedIndex + 1} of {visibleEvents.length}
                                </span>
                              </div>

                              <button
                                onClick={handleNextEventDive}
                                disabled={currentExpandedIndex === visibleEvents.length - 1}
                                className="w-full sm:w-auto px-3.5 py-2 bg-[#141414] hover:bg-[#1E1E1E] disabled:opacity-30 disabled:cursor-not-allowed border border-[#2A2A2A] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-lg transition-all text-xs font-mono flex items-center justify-end gap-2 cursor-pointer group"
                              >
                                <div className="text-right truncate max-w-[170px]">
                                  <span className="text-[9px] uppercase text-[#7A7065] block tracking-wider font-semibold">Next Epoch</span>
                                  <span className="font-serif italic font-bold text-xs truncate block text-[#F4EFEA]">
                                    {currentExpandedIndex < visibleEvents.length - 1 ? visibleEvents[currentExpandedIndex + 1].title : 'Last Epoch'}
                                  </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform shrink-0" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Pagination Controls */}
        <PaginationControls
          currentPage={timelinePage}
          totalItems={visibleEvents.length}
          itemsPerPage={timelineItemsPerPage}
          onPageChange={(page) => {
            setTimelinePage(page);
            document.getElementById('timeline-track-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          onItemsPerPageChange={(count) => {
            setTimelineItemsPerPage(count);
            setTimelinePage(1);
          }}
          itemsPerPageOptions={[15, 30, 60, 120]}
          itemLabel="historical milestones"
        />
        </div>
      ) : (
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-12 text-center shadow-lg">
          <p className="text-[#A09890]">No major historical epochs match your current filter or query within this timeline focus.</p>
          <button
            onClick={() => { setSelectedEra('All'); setSelectedRegion('All'); setSearchQuery(''); setSliderYear(2026); }}
            className="mt-3 text-xs text-[#D4AF37] font-bold underline cursor-pointer"
          >
            Clear all filters & restore slider
          </button>
        </div>
      )}

      {/* Floating Reading Controls & Notification */}
      <AnimatePresence>
        {resumedBanner?.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-[#0E151C] border border-[#234D43] text-emerald-300 px-4 py-2 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-mono backdrop-blur-md"
          >
            <BookmarkCheck className="w-4 h-4 text-[#E5C158]" />
            <span>Resumed timeline at your saved reading checkpoint</span>
            <button
              onClick={() => setResumedBanner(null)}
              className="text-xs text-gray-400 hover:text-white ml-2 cursor-pointer font-sans"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 bg-[#122C26] hover:bg-[#1B3C35] text-[#E5C158] border border-[#234D43] p-3 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 group"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
