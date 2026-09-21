import { useState, useEffect, useMemo } from 'react';
import { Compass, Globe, Info, Landmark, ArrowRight, Activity, Navigation, BookOpen, Crown, Shield, BookMarked, Users, ExternalLink, X, MapPin, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CountryDetail, HistoricalEvent, Bookmark } from '../types';
import { COUNTRIES, HISTORICAL_FIGURES, MONARCHS, ARTICLES } from '../data/historyData';
import { HEATMAP_CLUSTERS, HeatmapCluster } from '../data/heatmapData';

// Interactive Geographical Cities/Hubs for Distance & Transit Computations
const GEO_HUBS: Record<string, { name: string; x: number; y: number; city: string; desc: string }> = {
  rome: { name: 'Rome (Roman Empire)', city: 'Roma', x: 488, y: 180, desc: 'Central political capital of the Mediterranean basin, linked by an expansive system of paved military roads and maritime routes.' },
  alexandria: { x: 580, y: 275, name: 'Alexandria (Ptolemaic Egypt)', city: 'Alexandreia', desc: 'Preeminent center of Hellenistic scholarship and the grain supply nexus of the ancient Nile valley.' },
  changan: { x: 810, y: 195, name: 'Chang\'an (Han Dynasty China)', city: 'Chang\'an', desc: 'Eastern premier terminal of the trans-Eurasian Silk Road caravan highways, protected by natural mountain forks.' },
  pataliputra: { x: 720, y: 280, name: 'Pataliputra (Mauryan Empire)', city: 'Pataliputra', desc: 'Thriving capital along the sacred Ganges river plain, directing sub-oceanic spices and monsoon maritime highways.' },
  tenochtitlan: { x: 145, y: 215, name: 'Tenochtitlan (Aztec Empire)', city: 'Tenochtitlan', desc: 'Lakeside island metropolis in the Valley of Mexico, interconnected by grand causeways and aqueducts.' },
  cusco: { x: 200, y: 350, name: 'Cusco (Inca Empire)', city: 'Qusqu', desc: 'High-altitude mountain heart of the Tawantinsuyu, linked by the stone-paved royal Qhapaq Ñan trail.' },
  babylon: { x: 605, y: 254, name: 'Babylon (Mesopotamia)', city: 'Babili', desc: 'Sacred Euphrates river urban center, bridging the Persian Gulf maritime docks with the Levant trade networks.' },
  timbuktu: { x: 430, y: 320, name: 'Timbuktu (Mali Empire)', city: 'Timbuktu', desc: 'Essential golden hub of trans-Saharan camel caravans, trading river-salt and precious manuscripts.' }
};

// Major Geographical Barriers that shaped empires
const TERRAIN_BARRIERS = [
  {
    id: 'himalayas',
    name: 'The Himalayas (Mountain Barrier)',
    elevation: '8,848m peak',
    geodefc: 'Guarded India\'s northern frontier from physical invasions, creating a massive atmospheric climate barrier. It severely isolated East Tibetan passes, forcing trade to route through the rocky Khyber Pass.',
    militaryImpact: 'Limited immediate military campaigns between classical India and China, allowing their military doctrines and systems to evolve fully independently.'
  },
  {
    id: 'alps',
    name: 'The Alpine Range (Rome\'s Northern Wall)',
    elevation: '4,810m peak',
    geodefc: 'Serves as a natural protective fortress boundary for the Italian peninsula against northern European tribes.',
    militaryImpact: 'Breached in 218 BC by Carthaginian general Hannibal Barca, who crossed the snowy chasm with 37 war elephants in a legendary flanking maneuver.'
  },
  {
    id: 'nile_valley',
    name: 'The River Nile (Egypt\'s Shield)',
    elevation: '6,650km length',
    geodefc: 'Brings high fertility soil dynamics through summer floods, surrounded instantly by barren deserts that naturally guard the Nile basin from east/west attacks.',
    militaryImpact: 'Allowed Egypt to support deep population densities with a minimal defensive standing garrison, since ocean transit and deserts acted as natural walls.'
  },
  {
    id: 'gobi_desert',
    name: 'The Gobi Desert (The Steppe Divide)',
    elevation: '1.3M km² size',
    geodefc: 'A freezing, rain-shadow gravel desert that divided the agricultural fields of Han China from the horse-pastured plains of nomadic steppe-tribes.',
    militaryImpact: 'Prompted the Han and Ming dynasties to construct thousands of miles of Great Wall alignments along its fringe to block nomadic cavalry raids.'
  }
];

// Empire Land Area stats
const EMPIRE_SIZES = [
  { name: 'British Empire (Peak)', size: 35.5, year: '20th Century AD' },
  { name: 'Mongol Empire', size: 24.0, year: '13th Century AD' },
  { name: 'Russian Empire', size: 22.8, year: '19th Century AD' },
  { name: 'Han Dynasty', size: 6.5, year: '2nd Century AD' },
  { name: 'Achaemenid Persian', size: 5.5, year: '5th Century BC' },
  { name: 'Roman Empire (Peak)', size: 5.0, year: '2nd Century AD' },
  { name: 'Mauryan India', size: 5.0, year: '3rd Century BC' }
];

interface WorldMapProps {
  onSelectCountry: (countryId: string | undefined) => void;
  activeCountryId?: string;
  selectedTimelineEvent: HistoricalEvent | null;
  onClearSelectedTimelineEvent?: () => void;
  onNavigateTo?: (type: Bookmark['type'], targetId: string) => void;
}

// Helper to transform any timeline historical event to interactive coordinates & localized landmark label
export function getEventCoordinates(event: HistoricalEvent): { x: number; y: number; name: string } {
  const t = event.title.toLowerCase();
  const d = event.description.toLowerCase();
  const id = event.id;

  // Exact matches for base historical events
  if (id === 'giza_pyramids') return { x: 580, y: 320, name: 'Giza, Egypt' };
  if (id === 'battle_of_kadesh') return { x: 585, y: 260, name: 'Kadesh, Syria' };
  if (id === 'conquests_alexander') return { x: 535, y: 240, name: 'Hellespont, Greece' };
  if (id === 'fall_of_rome') return { x: 488, y: 180, name: 'Rome, Italy' };
  if (id === 'coronation_charlemagne') return { x: 488, y: 180, name: "St. Peter's, Rome" };
  if (id === 'magna_carta') return { x: 440, y: 110, name: 'Runnymede, England' };
  if (id === 'fall_of_constantinople') return { x: 550, y: 210, name: 'Constantinople' };
  if (id === 'columbus_voyage') return { x: 220, y: 245, name: 'San Salvador, Bahamas' };
  if (id === 'french_revolution') return { x: 450, y: 152, name: 'Paris, France' };
  if (id === 'world_war_ii') return { x: 485, y: 140, name: 'Berlin, Germany' };

  // Heuristic string search matches
  if (t.includes('rome') || d.includes('rome') || t.includes('roman') || d.includes('roman')) {
    return { x: 488, y: 180, name: 'Rome, Italy' };
  }
  if (t.includes('egypt') || d.includes('egypt') || t.includes('giza') || t.includes('pyramid')) {
    return { x: 580, y: 320, name: 'Alexandria, Egypt' };
  }
  if (t.includes('greece') || d.includes('greece') || t.includes('greek') || t.includes('mycenae')) {
    return { x: 535, y: 240, name: 'Athens, Greece' };
  }
  if (t.includes('india') || d.includes('india') || t.includes('chola') || t.includes('maurya') || t.includes('ganges')) {
    return { x: 720, y: 290, name: 'Pataliputra, India' };
  }
  if (t.includes('china') || d.includes('china') || t.includes('cai lun') || t.includes('tang') || t.includes('imperial qin')) {
    return { x: 810, y: 195, name: "Chang'an, China" };
  }
  if (t.includes('babylon') || d.includes('babylon') || t.includes('mesopotamia') || t.includes('cuneiform') || t.includes('baghdad') || t.includes('abbasid')) {
    return { x: 605, y: 254, name: 'Babylon, Mesopotamia' };
  }
  if (t.includes('constantinople') || d.includes('byzantine') || t.includes('hittite') || t.includes('anatolia')) {
    return { x: 550, y: 210, name: 'Constantinople' };
  }
  if (t.includes('mali') || t.includes('timbuktu') || d.includes('timbuktu') || d.includes('sahar')) {
    return { x: 430, y: 320, name: 'Timbuktu, Mali' };
  }
  if (t.includes('bastille') || t.includes('napoleon') || t.includes('french') || t.includes('paris')) {
    return { x: 450, y: 152, name: 'Paris, France' };
  }
  if (t.includes('barons') || t.includes('gutenberg') || t.includes('hastings') || d.includes('hastings') || d.includes('england') || t.includes('magna carta')) {
    return { x: 440, y: 110, name: 'Runnymede, England' };
  }
  if (t.includes('copernicus') || t.includes('newton') || t.includes('principia')) {
    return { x: 480, y: 142, name: 'Central Europe' };
  }
  if (t.includes('wright') || t.includes('apollo') || t.includes('lands human')) {
    return { x: 150, y: 160, name: 'North America' };
  }
  if (t.includes('tenochtitlan') || d.includes('aztec') || d.includes('mexic')) {
    return { x: 145, y: 215, name: 'Tenochtitlan' };
  }
  if (t.includes('cusco') || d.includes('inca') || d.includes('peru')) {
    return { x: 200, y: 350, name: 'Cusco, Peru' };
  }

  // Fallbacks based on era/hash
  let hash = 0;
  for (let i = 0; i < event.title.length; i++) {
    hash += event.title.charCodeAt(i);
  }
  const offsetID = hash % 5;

  if (event.era === 'Ancient') {
    const options = [
      { x: 580, y: 320, name: 'Nile Valley, Egypt' },
      { x: 535, y: 240, name: 'Aegean Coastline' },
      { x: 605, y: 254, name: 'Euphrates Chasm' },
      { x: 565, y: 225, name: 'Anatolia Plain' },
      { x: 720, y: 290, name: 'Khyber Pass Link' }
    ];
    return options[offsetID];
  }
  if (event.era === 'Classical') {
    const options = [
      { x: 490, y: 235, name: 'Roman Heartlands' },
      { x: 820, y: 220, name: 'Central Asia Horizons' },
      { x: 535, y: 240, name: 'Hellenistic Sphere' },
      { x: 720, y: 290, name: 'Ganges Plain' },
      { x: 605, y: 254, name: 'Near Eastern Centers' }
    ];
    return options[offsetID];
  }
  if (event.era === 'Medieval') {
    const options = [
      { x: 470, y: 190, name: 'Holy Roman Empire Borders' },
      { x: 615, y: 260, name: 'Abbasid Caliphate Hub' },
      { x: 750, y: 405, name: 'Chola Coastline' },
      { x: 550, y: 235, name: 'Constantinopel Borders' },
      { x: 810, y: 195, name: 'Tang Sovereign Hub' }
    ];
    return options[offsetID];
  }
  if (event.era === 'Early Modern') {
    const options = [
      { x: 450, y: 152, name: 'Western European Lands' },
      { x: 220, y: 330, name: 'Southeastern Trade Routes' },
      { x: 440, y: 110, name: 'Hanseatic Trade Shore' }
    ];
    return options[hash % options.length];
  }
  
  // Default modern
  const options = [
    { x: 485, y: 140, name: 'Central Europe' },
    { x: 150, y: 160, name: 'North American Ports' },
    { x: 915, y: 190, name: 'Eurasian Seashore' }
  ];
  return options[hash % options.length];
}

interface EmpireHotspot {
  id: string;
  name: string;
  era: string;
  coordinates: { x: number; y: number };
  color: string;
  description: string;
  associatedCountryId: string;
}

const CONTINENTS_COORDS = {
  northAmerica: [
    [50,80], [150,70], [220,110], [280,180], [230,220], [190,195], [140,240], [100,200], [70,140]
  ],
  southAmerica: [
    [180,250], [225,270], [285,320], [255,420], [210,480], [190,460], [175,340], [165,280]
  ],
  eurasia: [
    [330,80], [410,50], [520,60], [650,45], [850,55], [940,90], [920,160], [820,150], [840,220], [780,285], [750,330], [680,225], [610,230], [580,270], [520,290], [430,260], [370,170]
  ],
  africa: [
    [370,250], [485,250], [550,290], [575,340], [620,380], [550,470], [500,430], [460,350], [390,345]
  ],
  australia: [
    [800,350], [890,360], [910,410], [850,430], [790,380]
  ]
};

const OCEANS = [
  { name: 'ARCTIC OCEAN', x: 500, y: 35 },
  { name: 'NORTH ATLANTIC OCEAN', x: 380, y: 170 },
  { name: 'SOUTH ATLANTIC OCEAN', x: 410, y: 370 },
  { name: 'INDIAN OCEAN', x: 670, y: 370 },
  { name: 'NORTH PACIFIC OCEAN', x: 130, y: 150 },
  { name: 'PACIFIC OCEAN', x: 880, y: 290 },
  { name: 'SOUTHERN OCEAN', x: 500, y: 460 }
];

export const CONTINENT_LABELS = [
  { name: 'NORTH AMERICA', x: 154, y: 140 },
  { name: 'SOUTH AMERICA', x: 220, y: 350 },
  { name: 'EUROPE', x: 470, y: 115 },
  { name: 'ASIA', x: 740, y: 110 },
  { name: 'AFRICA', x: 480, y: 320 },
  { name: 'AUSTRALIA', x: 840, y: 385 }
];

export const getCountryCoordinates = (country: CountryDetail, index: number) => {
  const preset: Record<string, { x: number, y: number }> = {
    'India': { x: 720, y: 290 },
    'Egypt': { x: 580, y: 275 },
    'Italy': { x: 488, y: 180 },
    'China': { x: 810, y: 210 },
    'Mexico': { x: 145, y: 215 },
    'Greece': { x: 535, y: 240 },
    'Iraq': { x: 605, y: 254 },
    'Iran': { x: 630, y: 235 },
    'Turkey': { x: 565, y: 220 },
    'United States': { x: 150, y: 160 },
    'Canada': { x: 140, y: 100 },
    'Brazil': { x: 230, y: 330 },
    'Russia': { x: 640, y: 110 },
    'South Africa': { x: 530, y: 440 },
    'Australia': { x: 840, y: 400 },
    'Japan': { x: 915, y: 190 },
    'South Korea': { x: 875, y: 200 },
    'Germany': { x: 480, y: 142 },
    'United Kingdom': { x: 440, y: 110 },
    'France': { x: 450, y: 152 },
    'Spain': { x: 445, y: 185 },
    'Ukraine': { x: 535, y: 150 },
    'Saudi Arabia': { x: 615, y: 280 },
    'Nigeria': { x: 460, y: 335 },
    'Colombia': { x: 190, y: 280 },
    'Argentina': { x: 215, y: 440 }
  };

  const name = country.name.split(' (Reg')[0];
  if (preset[name]) {
    return preset[name];
  }

  const continent = country.continent || '';
  let cx = 500, cy = 250;
  if (continent.includes('Asia')) { cx = 710; cy = 230; }
  else if (continent.includes('Europe')) { cx = 490; cy = 150; }
  else if (continent.includes('North America')) { cx = 150; cy = 150; }
  else if (continent.includes('South America')) { cx = 220; cy = 350; }
  else if (continent.includes('Africa')) { cx = 500; cy = 340; }
  else if (continent.includes('Australia') || continent.includes('Oceania')) { cx = 840; cy = 400; }

  const r = 25 + (index % 5) * 15;
  const angle = (index * 137.5 * Math.PI) / 180;
  const x = cx + r * Math.cos(angle);
  const y = cy + r * Math.sin(angle);

  return {
    x: Math.min(960, Math.max(40, x)),
    y: Math.min(460, Math.max(40, y))
  };
};

const HISTORICAL_BORDERS: Record<'Ancient' | 'Medieval' | 'Modern', { name: string; color: string; strokeColor: string; coords: number[][] }[]> = {
  Ancient: [
    {
      name: 'Roman Republic & Provinces',
      color: 'rgba(244, 63, 94, 0.18)',
      strokeColor: '#F43F5E',
      coords: [
        [430, 160], [480, 150], [530, 170], [560, 200], [540, 240], [470, 250], [420, 220]
      ]
    },
    {
      name: 'Maurya Empire',
      color: 'rgba(16, 185, 129, 0.18)',
      strokeColor: '#34D399',
      coords: [
        [690, 270], [740, 260], [770, 310], [730, 370], [700, 330]
      ]
    },
    {
      name: 'Qin & Han Dynasties',
      color: 'rgba(239, 68, 68, 0.18)',
      strokeColor: '#F87171',
      coords: [
        [780, 180], [850, 170], [1000, 170], [890, 230], [830, 260], [790, 220]
      ]
    },
    {
      name: 'Pharaonic Egypt (New Kingdom)',
      color: 'rgba(217, 119, 6, 0.18)',
      strokeColor: '#FBBF24',
      coords: [
        [565, 260], [605, 255], [600, 310], [575, 315]
      ]
    }
  ],
  Medieval: [
    {
      name: 'Byzantine Empire',
      color: 'rgba(99, 102, 241, 0.18)',
      strokeColor: '#818CF8',
      coords: [
        [490, 170], [550, 180], [570, 215], [530, 240], [500, 210]
      ]
    },
    {
      name: 'Abbasid Caliphate',
      color: 'rgba(245, 158, 11, 0.18)',
      strokeColor: '#FBBF24',
      coords: [
        [560, 240], [610, 220], [670, 250], [640, 300], [580, 280]
      ]
    },
    {
      name: 'Mali Empire',
      color: 'rgba(212, 175, 55, 0.18)',
      strokeColor: '#D4AF37',
      coords: [
        [380, 290], [440, 295], [450, 350], [390, 340]
      ]
    },
    {
      name: 'Tang Dynasty',
      color: 'rgba(220, 38, 38, 0.18)',
      strokeColor: '#FCA5A5',
      coords: [
        [770, 160], [890, 150], [920, 210], [860, 260], [790, 230]
      ]
    },
    {
      name: 'Khmer Angkor Empire',
      color: 'rgba(249, 115, 22, 0.18)',
      strokeColor: '#FB923C',
      coords: [
        [780, 320], [830, 330], [840, 370], [790, 360]
      ]
    }
  ],
  Modern: [
    {
      name: 'French Empire (Napoleonic Peak)',
      color: 'rgba(124, 58, 237, 0.18)',
      strokeColor: '#A78BFA',
      coords: [
        [430, 140], [480, 130], [510, 160], [470, 190], [420, 170]
      ]
    },
    {
      name: 'United States Expansion bounds',
      color: 'rgba(14, 165, 233, 0.18)',
      strokeColor: '#38BDF8',
      coords: [
        [90, 110], [180, 100], [210, 150], [170, 190], [110, 180]
      ]
    },
    {
      name: 'British Empire Territories Highlighted',
      color: 'rgba(219, 39, 119, 0.18)',
      strokeColor: '#F472B6',
      coords: [
        [410, 100], [440, 95], [445, 120], [415, 125]
      ]
    }
  ]
};

export default function WorldMap({ 
  onSelectCountry, 
  activeCountryId, 
  selectedTimelineEvent, 
  onClearSelectedTimelineEvent,
  onNavigateTo
}: WorldMapProps) {
  const [selectedEra, setSelectedEra] = useState<'Ancient' | 'Medieval' | 'Modern'>('Ancient');
  const [hoveredEmpire, setHoveredEmpire] = useState<EmpireHotspot | null>(null);

  const [showBorders, setShowBorders] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<HeatmapCluster | null>(null);
  const [heatmapTierFilter, setHeatmapTierFilter] = useState<'all' | 'extreme' | 'high' | 'moderate' | 'low'>('all');

  const getClusterColor = (tier: HeatmapCluster['intensityTier']) => {
    switch (tier) {
      case 'extreme': return '#EF4444';
      case 'high': return '#F97316';
      case 'moderate': return '#EAB308';
      case 'low': return '#06B6D4';
      default: return '#EAB308';
    }
  };

  const filteredHeatmapClusters = useMemo(() => {
    if (heatmapTierFilter === 'all') return HEATMAP_CLUSTERS;
    return HEATMAP_CLUSTERS.filter(c => c.intensityTier === heatmapTierFilter);
  }, [heatmapTierFilter]);

  const [dossierTab, setDossierTab] = useState<'overview' | 'culture' | 'geography' | 'revolutions' | 'people' | 'articles'>('overview');

  const selectedCountry = useMemo(() => {
    if (!activeCountryId) return null;
    return COUNTRIES.find(c => c.id === activeCountryId) || null;
  }, [activeCountryId]);

  const [isTouring, setIsTouring] = useState(false);
  const [tourIndex, setTourIndex] = useState(-1);

  // Zoom and Pan states
  const [zoomScale, setZoomScale] = useState(1.0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // 3D Globe States & Automation
  const [viewMode, setViewMode] = useState<'flat' | '3d'>('flat');
  const [globeRotation, setGlobeRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  // Geographical Calculator & Sandbox state
  const [geoSource, setGeoSource] = useState('rome');
  const [geoDest, setGeoDest] = useState('pataliputra');
  const [selectedGeoInsight, setSelectedGeoInsight] = useState<string | null>('himalayas');

  useEffect(() => {
    if (viewMode !== '3d' || !isRotating) return;
    const interval = setInterval(() => {
      setGlobeRotation((prev) => (prev + 1.2) % 1000);
    }, 35);
    return () => clearInterval(interval);
  }, [viewMode, isRotating]);

  // Synchronize timeline selection focus to map coordinates and rotate/pan automatically
  useEffect(() => {
    if (!selectedTimelineEvent) return;

    // 1. Get the target coordinates
    const coord = getEventCoordinates(selectedTimelineEvent);

    // 2. Select appropriate map era
    const eraMap: Record<string, 'Ancient' | 'Medieval' | 'Modern'> = {
      'Ancient': 'Ancient',
      'Classical': 'Ancient',
      'Medieval': 'Medieval',
      'Early Modern': 'Modern',
      'Modern': 'Modern'
    };
    const targetEra = eraMap[selectedTimelineEvent.era] || 'Ancient';
    setSelectedEra(targetEra);

    // 3. Coordinate translation and scaling
    const timer = setTimeout(() => {
      if (viewMode === '3d') {
        // Stop dynamic rotation and center on longitude
        setIsRotating(false);
        setGlobeRotation((1000 - coord.x + 1000) % 1000);
      } else {
        // Flat map pan/zoom centering
        const scale = 1.5;
        setZoomScale(scale);
        const dx = (500 - coord.x) * scale;
        const dy = (250 - coord.y) * scale;
        const maxX = (scale - 1) * 450;
        const maxY = (scale - 1) * 225;
        setPanOffset({
          x: Math.max(-maxX, Math.min(maxX, dx)),
          y: Math.max(-maxY, Math.min(maxY, dy))
        });
      }
    }, 150); // slight timeout to allow era transition rendering if needed

    return () => clearTimeout(timer);
  }, [selectedTimelineEvent, viewMode]);

  const projectPoint = (x: number, y: number, rotation: number) => {
    const cx = 500;
    const cy = 250;
    const R = 180; // sphere radius
    
    // Convert flat coordinate x (0 -> 1000) into a continuous longitude (-PI -> PI)
    const longitude = (((x - 500 + rotation + 2000) % 1000) / 1000) * 2 * Math.PI - Math.PI;
    
    // Convert flat coordinate y (0 -> 500) into a continuous latitude (PI/2 -> -PI/2)
    const latitude = -(((y - 250) / 250) * (Math.PI / 2.2));
    
    // Classical Orthographic 3D Projection math
    const projX = cx + R * Math.cos(latitude) * Math.sin(longitude);
    const projY = cy + R * Math.sin(latitude);
    
    // Determines if point sits on the hemisphere facing the visual observer camera
    const isVisible = Math.cos(longitude) >= 0;
    
    return { x: projX, y: projY, visible: isVisible };
  };

  const is3D = viewMode === '3d';
  const selectedCoord = selectedTimelineEvent ? getEventCoordinates(selectedTimelineEvent) : null;
  const projectedSelected = selectedCoord
    ? (is3D
        ? projectPoint(selectedCoord.x, selectedCoord.y, globeRotation)
        : { x: selectedCoord.x, y: selectedCoord.y, visible: true })
    : null;

  const getProjectedPath = (coords: number[][], rotation: number) => {
    let pathStr = '';
    let first = true;
    coords.forEach(([x, y]) => {
      const proj = projectPoint(x, y, rotation);
      if (first) {
        pathStr += `M ${proj.x},${proj.y}`;
        first = false;
      } else {
        pathStr += ` L ${proj.x},${proj.y}`;
      }
    });
    pathStr += ' Z';
    return pathStr;
  };

  const EMPIRES: Record<'Ancient' | 'Medieval' | 'Modern', EmpireHotspot[]> = {
    Ancient: [
      {
        id: 'ancient_egypt',
        name: 'Pharaonic Egypt (Kemet)',
        era: 'Old, Middle & New Kingdoms (3100 BC - 30 BC)',
        coordinates: { x: 580, y: 320 },
        color: 'bg-amber-600 border-[#D4AF37]',
        description: 'Monumental builders of the Giza Pyramids, Luxor temples, and extensive water cycle engineering along the Nile Valley.',
        associatedCountryId: 'egypt'
      },
      {
        id: 'maurya_empire',
        name: 'Maurya Empire',
        era: 'Founded by Chandragupta Maurya (322 BC - 185 BC)',
        coordinates: { x: 740, y: 340 },
        color: 'bg-emerald-600 border-emerald-400',
        description: 'Encompassed almost the entire Indian Subcontinent. Famous for peace decree stone pillars under Emperor Ashoka.',
        associatedCountryId: 'india'
      },
      {
        id: 'classical_greece',
        name: 'Greek City-States (Hellenistic)',
        era: 'Classical Golden Era (5th Century BC)',
        coordinates: { x: 535, y: 240 },
        color: 'bg-sky-600 border-sky-400',
        description: 'Democratic Athens, militaristic Sparta, and the Macedonian conquests of Alexander the Great diffusing science globally.',
        associatedCountryId: 'greece'
      },
      {
        id: 'roman_republic',
        name: 'Roman Republic',
        era: 'Punic Wars & Senate Expansion Period (509 BC - 27 BC)',
        coordinates: { x: 490, y: 235 },
        color: 'bg-rose-900 border-[#D4AF37]',
        description: 'The military-senate-led expansion surrounding the Mediterranean "Mare Nostrum" and early codification of civil laws.',
        associatedCountryId: 'italy'
      },
      {
        id: 'qin_han',
        name: 'Qin & Han Dynasties',
        era: 'Imperial Unification (221 BC – 220 AD)',
        coordinates: { x: 820, y: 220 },
        color: 'bg-red-800 border-red-400',
        description: 'First unified China, establishing continuous bureaucracy, tax metrics, and initiating the legendary silk route.',
        associatedCountryId: 'china'
      },
      {
        id: 'sumerian_states',
        name: 'Sumerian City-States',
        era: 'Dawn of Civilization (c. 4500 BC – 1900 BC)',
        coordinates: { x: 590, y: 250 },
        color: 'bg-amber-700 border-amber-900',
        description: 'Founders of the world\'s oldest cuneiform writing, mathematical base-60 clock system, and epic of Gilgamesh.',
        associatedCountryId: 'iraq'
      },
      {
        id: 'babylonian_emp',
        name: 'Babylonian Empire',
        era: 'Reign of Code of Hammurabi (c. 1894 BC – 1595 BC)',
        coordinates: { x: 605, y: 254 },
        color: 'bg-yellow-700 border-[#D4AF37]',
        description: 'Famous for the code of law, high hanging gardens, and advanced astronomical mapping systems.',
        associatedCountryId: 'iraq'
      },
      {
        id: 'hittite_ana',
        name: 'Hittite Anatolia',
        era: 'Bronze Age Iron Pioneers (c. 1600 BC – 1178 BC)',
        coordinates: { x: 565, y: 225 },
        color: 'bg-cyan-700 border-cyan-400',
        description: 'Anatolian power that pioneered iron smelting, lightweight three-man chariots, and signed the Treaty of Kadesh.',
        associatedCountryId: 'turkey'
      },
      {
        id: 'minoan_cret',
        name: 'Minoan Palace Civilization',
        era: 'Aegean Maritime Thalassocracy (c. 3000 BC – 1100 BC)',
        coordinates: { x: 538, y: 255 },
        color: 'bg-teal-700 border-teal-400',
        description: 'Credited with the Labyrinthine Palace of Knossos, exquisite colorful frescoes, and deep sea trade with Egypt.',
        associatedCountryId: 'greece'
      },
      {
        id: 'ancient_carth',
        name: 'Phoenician Carthage',
        era: 'Mediterranean Maritime Republic (c. 814 BC – 146 BC)',
        coordinates: { x: 475, y: 260 },
        color: 'bg-blue-800 border-blue-400',
        description: 'A superb trading empire that controlled West Mediterranean sea lanes, famously mounting wars against Rome.',
        associatedCountryId: 'italy'
      },
      {
        id: 'persian_ach',
        name: 'Persian Achaemenid Empire',
        era: 'Cyrus the Great\'s Reign (550 BC – 330 BC)',
        coordinates: { x: 640, y: 245 },
        color: 'bg-pink-800 border-pink-400',
        description: 'Largest empire of antiquity, boasting the Cyrus cylinder of human rights and the Royal Postal Highway network.',
        associatedCountryId: 'iran'
      },
      {
        id: 'indus_har',
        name: 'Indus Valley Civilisation',
        era: 'Bronze Age Harappan Culture (c. 3300 BC – 1300 BC)',
        coordinates: { x: 715, y: 300 },
        color: 'bg-amber-900 border-amber-400',
        description: 'Famous for subterranean municipal closed sanitations, grid city layouts, and standardized measuring weights.',
        associatedCountryId: 'india'
      },
      {
        id: 'shang_core',
        name: 'Shang Dynasty Core',
        era: 'Bronze Age Oracle Script (c. 1600 BC – 1046 BC)',
        coordinates: { x: 835, y: 200 },
        color: 'bg-red-950 border-red-500',
        description: 'Pioneered early bronze casting, elaborate ancestral worship, and the precursor to modern Chinese characters.',
        associatedCountryId: 'china'
      },
      {
        id: 'aksum_anc',
        name: 'Kingdom of Aksum (Early)',
        era: 'Red Sea Trade Power (c. 100 AD – 940 AD)',
        coordinates: { x: 600, y: 370 },
        color: 'bg-amber-800 border-stone-200',
        description: 'Prosperous link between Rome/India, famed for massive monolithic stelae obelisks and early Christian state adoption.',
        associatedCountryId: 'ethiopia'
      },
      {
        id: 'phoenician_ty',
        name: 'Phoenician City-States',
        era: 'Alphabet & Sea Pioneers (c. 1500 BC – 539 BC)',
        coordinates: { x: 585, y: 265 },
        color: 'bg-indigo-800 border-indigo-400',
        description: 'Gave birth to the phonetic alphabet schema (basis for Greek/Latin script) and supreme purple dye trade.',
        associatedCountryId: 'syria'
      },
      {
        id: 'olmec_sl',
        name: 'Olmec Heartland',
        era: 'Mesoamerican Mother Culture (c. 1200 BC – 400 BC)',
        coordinates: { x: 180, y: 220 },
        color: 'bg-orange-700 border-orange-400',
        description: 'Carved colossal volcanic stone heads, invented early ballgames, and drafted the initial Mesoamerican calendar rules.',
        associatedCountryId: 'mexico'
      },
      {
        id: 'chavin_hu',
        name: 'Chavín Horizon',
        era: 'Early Andean Cultic Era (c. 900 BC – 200 BC)',
        coordinates: { x: 195, y: 320 },
        color: 'bg-lime-800 border-lime-400',
        description: 'Andean spiritual center that integrated feline iconography, complex stone carvings, and early gold-refinement.',
        associatedCountryId: 'peru'
      },
      {
        id: 'nubia_kush',
        name: 'Nubia Kush Kingdom',
        era: 'The Black Pharaohs (c. 1070 BC – 350 AD)',
        coordinates: { x: 582, y: 350 },
        color: 'bg-[#D4AF37] border-black',
        description: 'Powerful Nile neighbor that fully conquered Egypt (25th Dynasty), building more steep pyramids than Giza.',
        associatedCountryId: 'egypt'
      },
      {
        id: 'neo_asy',
        name: 'Neo-Assyrian Empire',
        era: 'Sargonid Iron Monarchy (911 BC – 609 BC)',
        coordinates: { x: 600, y: 240 },
        color: 'bg-purple-950 border-[#D4AF37]',
        description: 'A colossal military state with advanced siege engines, horse cavalry, and Ashurbanipal\'s library of Nineveh.',
        associatedCountryId: 'iraq'
      },
      {
        id: 'scythian_nom',
        name: 'Scythian Nomads',
        era: 'Eurasian Horse Warriors (c. 8th – 2nd Century BC)',
        coordinates: { x: 680, y: 140 },
        color: 'bg-amber-600 border-yellow-200',
        description: 'Nomadic steppe masters of horse archery, noted for gold zoomorphic jewelry found in royal bury tumuli (kurgans).',
        associatedCountryId: 'russia'
      },
      {
        id: 'thracian_tr',
        name: 'Thracian Kingdom',
        era: 'Balkan Gold Metallurgy (c. 1000 BC – 46 AD)',
        coordinates: { x: 545, y: 215 },
        color: 'bg-sky-800 border-sky-300',
        description: 'Ferocious independent warriors who crafted breathtaking gold hoards (Panagyurishte) and birthed rebel Spartacus.',
        associatedCountryId: 'greece'
      },
      {
        id: 'etruscan_le',
        name: 'Etruscan League',
        era: 'Pre-Roman Tuscan Culture (c. 900 BC – 27 BC)',
        coordinates: { x: 485, y: 220 },
        color: 'bg-rose-950 border-rose-300',
        description: 'Highly creative Italian society that profoundly influenced early Roman religion, arch architecture, and metallurgy.',
        associatedCountryId: 'italy'
      },
      {
        id: 'urartu_king',
        name: 'Kingdom of Urartu',
        era: 'Mount Ararat Iron Citadel (860 BC – 590 BC)',
        coordinates: { x: 595, y: 220 },
        color: 'bg-cyan-850 border-cyan-300',
        description: 'Elite mountain stone engineers matching Assyria, creating complex canal hydration networks.',
        associatedCountryId: 'turkey'
      },
      {
        id: 'zhou_feud',
        name: 'Zhou Dynasty Kingdom',
        era: 'Mandate of Heaven Inception (1046 BC – 256 BC)',
        coordinates: { x: 855, y: 190 },
        color: 'bg-red-900 border-yellow-400',
        description: 'Initiated the celestial Mandate of Heaven moral framework, sprouting philosophers Confucius and Laozi.',
        associatedCountryId: 'china'
      },
      {
        id: 'nok_cult',
        name: 'Nok Terracotta Culture',
        era: 'West African Iron Pioneers (c. 1500 BC – 500 AD)',
        coordinates: { x: 440, y: 360 },
        color: 'bg-amber-950 border-orange-300',
        description: 'Earliest known sub-Saharan iron metallurgists, famed for distinct slip-glazed terracotta human figurines.',
        associatedCountryId: 'mali'
      },
      {
        id: 'celtic_gal',
        name: 'Celtic Tribes',
        era: 'La Tène Iron Age Culture (c. 450 BC – 1st Century AD)',
        coordinates: { x: 410, y: 180 },
        color: 'bg-violet-900 border-violet-400',
        description: 'Advanced metallurgy guild of torque gold collars, highly structured defensive hillforts, and runic druid archives.',
        associatedCountryId: 'germany'
      }
    ],
    Medieval: [
      {
        id: 'byzantine_empire',
        name: 'Byzantine Empire',
        era: 'Eastern Roman Continuation (330 AD - 1453 AD)',
        coordinates: { x: 550, y: 235 },
        color: 'bg-indigo-900 border-indigo-400',
        description: 'Roman law continuation centered at Constantinople, bridging early Christian, European, and Silk Road cultures.',
        associatedCountryId: 'greece'
      },
      {
        id: 'chola_empire',
        name: 'Chola Maritime Dynasty',
        era: 'Southern Indian Hegemony (848 AD - 1279 AD)',
        coordinates: { x: 750, y: 405 },
        color: 'bg-amber-700 border-[#D4AF37]',
        description: 'Pioneered maritime fleets, colossal bronze sculpture, and navy-backed trade routes across Southeast Asia.',
        associatedCountryId: 'india'
      },
      {
        id: 'holy_roman_empire',
        name: 'Holy Roman Empire',
        era: 'Frankish Coronation of Charlemagne (800 AD - 1806 AD)',
        coordinates: { x: 470, y: 190 },
        color: 'bg-purple-900 border-purple-400',
        description: 'Fragmented elective monarchy of Central Europe under papal alliances, leading the gothic renaissance.',
        associatedCountryId: 'italy'
      },
      {
        id: 'abbasid_cal',
        name: 'Abbasid Islamic Caliphate',
        era: 'Islamic Golden Age of Baghdad (750 AD – 1258 AD)',
        coordinates: { x: 615, y: 260 },
        color: 'bg-[#151515] border-[#D4AF37]',
        description: 'Established Baghdad\'s House of Wisdom, compiling modern algebra, optics, medicine, and translating classic Greek philosophy.',
        associatedCountryId: 'iraq'
      },
      {
        id: 'tang_dyn',
        name: 'Tang Cosmopolitan Empire',
        era: 'Woodblock & Poem Peak (618 AD – 907 AD)',
        coordinates: { x: 840, y: 210 },
        color: 'bg-red-700 border-yellow-500',
        description: 'Widely celebrated for poetry (Li Bai), woodblock book printing, civil exam systems, and extensive silk trading.',
        associatedCountryId: 'china'
      },
      {
        id: 'maya_tikal',
        name: 'Mayan Tikal Epoch',
        era: 'Classic Era Lowlands (250 AD – 900 AD)',
        coordinates: { x: 170, y: 240 },
        color: 'bg-teal-800 border-emerald-400',
        description: 'Sovereign city-states with advanced hieroglyphic libraries, astronomical observatories, and math concept of true zero.',
        associatedCountryId: 'mexico'
      },
      {
        id: 'mali_west_af',
        name: 'Mali Trans-Saharan Empire',
        era: 'Gold Wealth of Timbuktu (c. 1230 AD – 1670 AD)',
        coordinates: { x: 415, y: 340 },
        color: 'bg-[#D4AF37] border-amber-950',
        description: 'Extravagantly wealthy Islamic gold/salt highway superpower. Home to Emperor Mansa Musa and Sankore University.',
        associatedCountryId: 'mali'
      },
      {
        id: 'shogunate_japan',
        name: 'Kamakura & Ashikaga Shogunate',
        era: 'Sengoku & Classic Samurai Era (1185 AD – 1573 AD)',
        coordinates: { x: 910, y: 180 },
        color: 'bg-slate-800 border-stone-200',
        description: 'Traditional feudal militarism led by the Shogun and Daimyo samurai lords, establishing Zen culture.',
        associatedCountryId: 'japan'
      },
      {
        id: 'angkor_khmer',
        name: 'Khmer Angkor Empire',
        era: 'Hydrological Reservoir Wizards (802 AD – 1431 AD)',
        coordinates: { x: 810, y: 350 },
        color: 'bg-orange-850 border-[#D4AF37]',
        description: 'Mastered wet-rice agro-engineering with massive artificial water reservoirs (Barays), building Angkor Wat.',
        associatedCountryId: 'cambodia'
      },
      {
        id: 'kiev_rus',
        name: 'Kievan Rus Federation',
        era: 'Varangian-Slavic Dynasties (882 AD – 1240 AD)',
        coordinates: { x: 560, y: 130 },
        color: 'bg-indigo-950 border-indigo-300',
        description: 'Centered in Kyiv, connecting the Baltic Sea to Byzantium, adopting Cyrillic literacy and Orthodox Christianity.',
        associatedCountryId: 'russia'
      },
      {
        id: 'srivijaya_thal',
        name: 'Srivijaya Thalassocracy',
        era: 'Melal-strait Maritime Hegemony (650 AD – 1377 AD)',
        coordinates: { x: 800, y: 420 },
        color: 'bg-yellow-900 border-yellow-400',
        description: 'Buddhist commercial empire controlling vital spice straits connecting imperial China with the Indian Ocean.',
        associatedCountryId: 'india'
      },
      {
        id: 'fatimid_cal',
        name: 'Fatimid Empire',
        era: 'Cairo Inception & Caliphate (909 AD – 1171 AD)',
        coordinates: { x: 570, y: 310 },
        color: 'bg-emerald-950 border-emerald-400',
        description: 'Founded Al-Azhar University in Cairo, fostering monumental scientific academies, astronomy, and optics studies.',
        associatedCountryId: 'egypt'
      },
      {
        id: 'zimbabwe_king',
        name: 'Great Zimbabwe Kingdom',
        era: 'Monolithic Granite Citadels (c. 1000 AD – 1450 AD)',
        coordinates: { x: 540, y: 450 },
        color: 'bg-stone-800 border-[#D4AF37]',
        description: 'Constructed giant dry-stone mortarless walled palace keeps, trading gold and ivory directly with Arabia/China.',
        associatedCountryId: 'ethiopia'
      },
      {
        id: 'ghurids_dyn',
        name: 'Ghurid Dynasty of Delhi',
        era: 'Afghan-Indo Sultanate core (1148 AD – 1215 AD)',
        coordinates: { x: 700, y: 290 },
        color: 'bg-emerald-900 border-[#D4AF37]',
        description: 'Laid foundation for Delhi Sultanate, constructing the majestic high sandstone Qutb Minar minaret tower.',
        associatedCountryId: 'india'
      },
      {
        id: 'mongol_khan',
        name: 'Mongol Empire',
        era: 'Pax Mongolica Unification (1206 AD – 1368 AD)',
        coordinates: { x: 810, y: 155 },
        color: 'bg-amber-955 border-[#D4AF37]',
        description: 'Undefeated cavalry archer horde of Genghis Khan that forged the largest contiguous land empire in history.',
        associatedCountryId: 'russia'
      },
      {
        id: 'songhai_emp',
        name: 'Songhai Empire',
        era: 'West African Sahel Successor (1464 AD – 1591 AD)',
        coordinates: { x: 400, y: 350 },
        color: 'bg-[#D4AF37] border-black',
        description: 'Consolidated Sahel trade lanes with formidable cavalry militaries under Sunni Ali and Askia Muhammad.',
        associatedCountryId: 'mali'
      },
      {
        id: 'seljuk_turk',
        name: 'Great Seljuk Empire',
        era: 'Steppe Oghuz Sultanate (1037 AD – 1194 AD)',
        coordinates: { x: 590, y: 230 },
        color: 'bg-blue-950 border-blue-400',
        description: 'Oghuz Turk empire that defeated Byzantine legions at Manzikert, migrating Turkish language to Anatolia.',
        associatedCountryId: 'turkey'
      },
      {
        id: 'anglo_wessex',
        name: 'Kingdom of Wessex',
        era: 'Unified Saxon England (871 AD – 1066 AD)',
        coordinates: { x: 415, y: 155 },
        color: 'bg-orange-900 border-amber-300',
        description: 'Alfred the Great\'s lineage that unified Anglo-Saxons against Viking attacks, drafting early English laws.',
        associatedCountryId: 'united_kingdom'
      },
      {
        id: 'capethian_fr',
        name: 'Capetian Kingdom of France',
        era: 'Sovereign Feudal Realm (987 AD – 1328 AD)',
        coordinates: { x: 440, y: 185 },
        color: 'bg-blue-950 border-[#D4AF37]',
        description: 'Established Paris central authority, building towering stone Notre-Dame cathedrals and organizing early universities.',
        associatedCountryId: 'france'
      },
      {
        id: 'norman_sic',
        name: 'Norman Kingdom of Sicily',
        era: 'Multi-Cultural Synthesis (1130 AD – 1194 AD)',
        coordinates: { x: 495, y: 250 },
        color: 'bg-amber-900 border-sky-400',
        description: 'A spectacular synthetic culture of Normans, Greek scribes, and Arabic architects creating gold mosaic cathedrals.',
        associatedCountryId: 'italy'
      },
      {
        id: 'pagan_burma',
        name: 'Pagan Burma Dynasty',
        era: 'Indochina Temple Wizards (1044 AD – 1287 AD)',
        coordinates: { x: 780, y: 330 },
        color: 'bg-yellow-800 border-stone-200',
        description: 'Constructed over 10,000 towering Buddhist temples in the plains of Bagan, unifying Myanmar region.',
        associatedCountryId: 'india'
      },
      {
        id: 'tiwanaku_alt',
        name: 'Tiwanaku State',
        era: 'Altiplano Monolithic Empire (c. 300 AD – 1000 AD)',
        coordinates: { x: 205, y: 360 },
        color: 'bg-purple-900 border-indigo-400',
        description: 'Constructed precision stone temple monoliths (Gate of the Sun) utilizing copper structural clamps.',
        associatedCountryId: 'peru'
      },
      {
        id: 'wari_emp',
        name: 'Wari Terraced Empire',
        era: 'Andean Mountain Superpower (c. 500 AD – 1000 AD)',
        coordinates: { x: 190, y: 340 },
        color: 'bg-green-950 border-lime-400',
        description: 'Pioneered vast terraced slopes and the massive paved Andean highway grid later integrated by the Incas.',
        associatedCountryId: 'peru'
      },
      {
        id: 'poland_piast',
        name: 'Piast Poland Kingdom',
        era: 'Boleslaw the Brave Dynasty (966 AD – 1370 AD)',
        coordinates: { x: 500, y: 160 },
        color: 'bg-red-800 border-white',
        description: 'Unified Polish tribes, adopting Latin literacy and establishing independent central statehood.',
        associatedCountryId: 'germany'
      },
      {
        id: 'hungary_arpad',
        name: 'Arpad Hungary Realm',
        era: 'Danube Steppe Migrations (1000 AD – 1301 AD)',
        coordinates: { x: 512, y: 180 },
        color: 'bg-green-800 border-red-500',
        description: 'Magyar nomadic horsemen who transitioned into a formidable sovereign European shield crown.',
        associatedCountryId: 'greece'
      },
      {
        id: 'aksum_late',
        name: 'Kingdom of Axum (Late)',
        era: 'Solomonic Dynasty Restoration (1270 AD onwards)',
        coordinates: { x: 605, y: 390 },
        color: 'bg-amber-800 border-yellow-400',
        description: 'Preserved ancient Ge\'ez liturgies, commissioning legendary under-earth rock churches in Lalibela.',
        associatedCountryId: 'ethiopia'
      }
    ],
    Modern: [
      {
        id: 'british_empire',
        name: 'British Imperial Power',
        era: 'Industrial & Colonial Peaks (17th - 20th Century)',
        coordinates: { x: 405, y: 145 },
        color: 'bg-orange-850 border-stone-200',
        description: 'A global maritime empire covering a quarter of the world\'s geographical landmass, driving steam industrialization.',
        associatedCountryId: 'united_kingdom'
      },
      {
        id: 'maratha_confederacy',
        name: 'Maratha Empire',
        era: 'Chhatrapati Shivaji Restoration (1674 AD - 1818 AD)',
        coordinates: { x: 735, y: 355 },
        color: 'bg-amber-600 border-[#D4AF37]',
        description: 'Formidable military confederacy that challenged Mughals, establishing regional naval fortresses.',
        associatedCountryId: 'india'
      },
      {
        id: 'mughal_empire_modern',
        name: 'Mughal Golden Empire',
        era: 'Akbar, Shah Jahan, & Taj Mahal (1526–1857 AD)',
        coordinates: { x: 742, y: 320 },
        color: 'bg-teal-950 border-[#D4AF37]',
        description: 'Architects of Taj Mahal, administering a vast cosmopolitan empire representing 25% of global GDP.',
        associatedCountryId: 'india'
      },
      {
        id: 'tokugawa_shog',
        name: 'Tokugawa Shogunate (Edo)',
        era: 'Sakoku Closed Peace Era (1603 AD – 1867 AD)',
        coordinates: { x: 920, y: 190 },
        color: 'bg-zinc-800 border-yellow-400',
        description: 'Enforced 250 years of isolationist peace, giving birth to woodblock prints (Hokusai), kabuki, and geisha guilds.',
        associatedCountryId: 'japan'
      },
      {
        id: 'ottoman_peak',
        name: 'Ottoman Empire',
        era: 'Suleiman the Magnificent Reign (1299 AD – 1922 AD)',
        coordinates: { x: 555, y: 220 },
        color: 'bg-red-900 border-orange-400',
        description: 'Conquered Constantinople, bridging East-West trade with massive artillery battalions and architectural masterpiece mosques.',
        associatedCountryId: 'turkey'
      },
      {
        id: 'safavid_pe',
        name: 'Safavid Persian Empire',
        era: 'Isfahan Art Renaissance (1501 AD – 1736 AD)',
        coordinates: { x: 645, y: 255 },
        color: 'bg-pink-900 border-stone-200',
        description: 'Established Shia statehood, commissioning the stunning turquoise tile structures of Isfahan.',
        associatedCountryId: 'iran'
      },
      {
        id: 'bourbon_fr',
        name: 'Bourbon Kingdom of France',
        era: 'Versailles Palace Absolute Rule (1589 AD – 1792 AD)',
        coordinates: { x: 445, y: 195 },
        color: 'bg-indigo-950 border-[#D4AF37]',
        description: 'Under Louis XIV (The Sun King), became the aesthetic, academic, and military core of continental Europe.',
        associatedCountryId: 'france'
      },
      {
        id: 'habsburg_emp',
        name: 'Habsburg Monarchy Austria',
        era: 'Central European Dynasty (1273 AD – 1918 AD)',
        coordinates: { x: 485, y: 180 },
        color: 'bg-violet-950 border-yellow-400',
        description: 'An immense dynastic marriage empire spanning Austria/Spain, fostering classical symphonic music (Mozart).',
        associatedCountryId: 'germany'
      },
      {
        id: 'russian_emp',
        name: 'Russian Empire',
        era: 'Peter the Great to Romanovs (1721 AD – 1917 AD)',
        coordinates: { x: 650, y: 95 },
        color: 'bg-slate-900 border-yellow-300',
        description: 'Reformed state with custom navy, expanding across Baltic waters to Alaska, establishing Saint Petersburg.',
        associatedCountryId: 'russia'
      },
      {
        id: 'qing_dyn',
        name: 'Qing Dynasty Empire',
        era: 'Manchu Kangxi & Qianlong reigns (1644 AD – 1912 AD)',
        coordinates: { x: 860, y: 195 },
        color: 'bg-red-850 border-yellow-500',
        description: 'Final Chinese dynasty, doubling borders and producing exquisite porcelain crafts and the Dream of Red Chamber novel.',
        associatedCountryId: 'china'
      },
      {
        id: 'bengal_naw',
        name: 'Nawabs of Bengal',
        era: 'Proto-Industrial Muslin Wealth (1717 AD – 1757 AD)',
        coordinates: { x: 765, y: 335 },
        color: 'bg-emerald-900 border-amber-300',
        description: 'Global textiles export epicenter, boasting incredibly fine muslin cotton looms before British East India Company campaigns.',
        associatedCountryId: 'india'
      },
      {
        id: 'joseon_her',
        name: 'Joseon Kingdom',
        era: 'Hangul Script invention (1392 AD – 1897 AD)',
        coordinates: { x: 890, y: 190 },
        color: 'bg-sky-950 border-sky-400',
        description: 'Devised the scientific Hangul alphabet system (King Sejong) and invincible armored "turtle ships" (Admiral Yi Sun-sin).',
        associatedCountryId: 'japan'
      },
      {
        id: 'spanish_glob',
        name: 'Spanish Global Empire',
        era: 'Galleon Trade & Siglo de Oro (1492 AD – 1898 AD)',
        coordinates: { x: 410, y: 230 },
        color: 'bg-rose-900 border-[#D4AF37]',
        description: 'Pioneered vast Pacific/Atlantic galleon silver networks, fueling world commerce and Spanish classic literature.',
        associatedCountryId: 'spain'
      },
      {
        id: 'portuguese_mar',
        name: 'Portuguese Seaborne Empire',
        era: 'Caravel Explorers Route (1415 AD – 1999 AD)',
        coordinates: { x: 395, y: 240 },
        color: 'bg-emerald-900 border-white',
        description: 'Built lightweight astrolabe-steer caravels, establishing spice colonies in Goa, Macau, and Brazil.',
        associatedCountryId: 'spain'
      },
      {
        id: 'swedish_balt',
        name: 'Swedish Baltic Empire',
        era: 'Gustavus Adolphus campaigns (1611 AD – 1721 AD)',
        coordinates: { x: 490, y: 110 },
        color: 'bg-blue-900 border-yellow-400',
        description: 'Pioneered rapid high-speed mobile musketry-combined field artillery during the thirty years war.',
        associatedCountryId: 'germany'
      },
      {
        id: 'dahomey_king',
        name: 'Kingdom of Dahomey',
        era: 'Amazon Warrior Guard (1600 AD – 1904 AD)',
        coordinates: { x: 435, y: 380 },
        color: 'bg-orange-950 border-[#D4AF37]',
        description: 'Formed elite highly loyal all-female vanguard regiments, establishing dynamic regional defensive leagues.',
        associatedCountryId: 'mali'
      },
      {
        id: 'nguyen_dyn',
        name: 'Nguyễn Dynasty',
        era: 'Hue Imperial Citadel (1802 AD – 1945 AD)',
        coordinates: { x: 825, y: 340 },
        color: 'bg-yellow-800 border-yellow-500',
        description: 'Constructed grand water canals and the majestic Hue palace citadel along central Vietnam plains.',
        associatedCountryId: 'cambodia'
      },
      {
        id: 'siam_king',
        name: 'Siam Kingdom (Chakri)',
        era: 'King Chulalongkorn Reforms (1782 AD onwards)',
        coordinates: { x: 805, y: 360 },
        color: 'bg-red-900 border-white',
        description: 'Only Southeast Asian nation to defend absolute sovereignty via smart neutral balance-diplomacies.',
        associatedCountryId: 'cambodia'
      },
      {
        id: 'zulu_shaka',
        name: 'Kingdom of the Zulu',
        era: 'Shaka Zulu Military Reforms (1816 AD – 1897 AD)',
        coordinates: { x: 535, y: 480 },
        color: 'bg-zinc-800 border-orange-500',
        description: 'Devised highly effective "buffalo horn" tight-flanking encirclements and heavy thrusting short assegai spears.',
        associatedCountryId: 'ethiopia'
      },
      {
        id: 'genoa_venice',
        name: 'Serene Maritime Republics',
        era: 'Venice-Genoa trade wars (c. 1000 AD – 1797 AD)',
        coordinates: { x: 480, y: 205 },
        color: 'bg-rose-950 border-[#D4AF37]',
        description: 'Oligarchic mercantile republics that introduced double-entry bookkeeping, state bond systems, and expansive naval arsenals.',
        associatedCountryId: 'italy'
      },
      {
        id: 'early_usa',
        name: 'Early United States',
        era: 'Industrial & Constitutional Era (1776 AD onwards)',
        coordinates: { x: 180, y: 170 },
        color: 'bg-blue-900 border-stone-200',
        description: 'First modern constitutional republican experiment of human history, pioneered by industrial inventors.',
        associatedCountryId: 'united_kingdom'
      },
      {
        id: 'aztec_peak',
        name: 'Aztec Empire (Tenochtitlan)',
        era: 'Lake Texcoco Chinampas (1428 AD - 1521 AD)',
        coordinates: { x: 155, y: 235 },
        color: 'bg-red-950 border-[#D4AF37]',
        description: 'Developed advanced lakeside floating agriculture (chinampas), highly detailed botano-medicine, and universal public education.',
        associatedCountryId: 'mexico'
      },
      {
        id: 'inca_road',
        name: 'Inca Empire (Tawantinsuyu)',
        era: 'Andean Mountain Chasm bridges (1438 AD - 1572 AD)',
        coordinates: { x: 200, y: 350 },
        color: 'bg-emerald-950 border-[#D4AF37]',
        description: 'Constructed an unparalleled 25,000-mile mountain paved highway network spanning across suspension bridges.',
        associatedCountryId: 'peru'
      },
      {
        id: 'french_rep',
        name: 'French First Republic',
        era: 'Napoleonic Codifications (1792 AD - 1804 AD)',
        coordinates: { x: 435, y: 205 },
        color: 'bg-indigo-900 border-red-500',
        description: 'Revoluted European royalism, championing civil equality, decimal metric system conversions, and the Napoleonic Code.',
        associatedCountryId: 'france'
      },
      {
        id: 'voc_indies',
        name: 'Dutch East India Company (VOC)',
        era: 'First Joint-Stock Corporation (1602 AD – 1799 AD)',
        coordinates: { x: 840, y: 440 },
        color: 'bg-blue-950 border-orange-500',
        description: 'First ever publicly listings trade megacorporation, holding sovereign military armies, issuing early share bonds.',
        associatedCountryId: 'japan'
      }
    ]
  };

  useEffect(() => {
    if (!isTouring) return;
    const interval = setInterval(() => {
      setTourIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % EMPIRES[selectedEra].length;
        const empire = EMPIRES[selectedEra][nextIndex];
        if (empire) {
          setHoveredEmpire(empire);
          onSelectCountry(empire.associatedCountryId);
        }
        return nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isTouring, selectedEra, onSelectCountry, EMPIRES]);

  const toggleTour = () => {
    if (isTouring) {
      setIsTouring(false);
      setHoveredEmpire(null);
    } else {
      setIsTouring(true);
      const firstEmpire = EMPIRES[selectedEra][0];
      if (firstEmpire) {
        setTourIndex(0);
        setHoveredEmpire(firstEmpire);
        onSelectCountry(firstEmpire.associatedCountryId);
      }
    }
  };


  return (
    <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 overflow-hidden">
      {/* Header and description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-serif italic text-[#D4AF37] tracking-tight flex items-center gap-2">
            <Globe className="text-[#D4AF37] w-5 h-5 animate-spin-slow" />
            Interactive Historical World Map
          </h3>
          <p className="text-xs text-[#A09890] font-sans mt-0.5">
            Geographical context of ancient empires and modern nations. Select an era to project historical frontiers.
          </p>
        </div>

        {/* Era selector (Auto-Tour removed) */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-[#0A0A0A] p-1 rounded-xl border border-[#2A2A2A]">
            {(['Ancient', 'Medieval', 'Modern'] as const).map((era) => (
              <button
                key={era}
                onClick={() => {
                  setSelectedEra(era);
                  setHoveredEmpire(null);
                }}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-lg transition-all ${
                  selectedEra === era
                    ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] shadow-lg'
                    : 'text-[#A09890] hover:text-[#E0D8D0] hover:bg-[#1A1A1A]'
                }`}
              >
                {era} Era
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-[#020202] rounded-xl border border-[#2A2A2A] p-2 overflow-hidden shadow-2xl">
        
        {/* Map Control Cluster overlay */}
        <div className="absolute top-4 left-4 z-40 bg-[#0F0F0F]/95 border border-[#2A2A2A] p-2 rounded-xl flex items-center gap-1.5 shadow-xl backdrop-blur-md">
          {/* Zoom In button */}
          <button
            onClick={() => {
              const nextScale = Math.min(zoomScale + 0.25, 3.5);
              setZoomScale(nextScale);
              if (nextScale === 1.0) setPanOffset({ x: 0, y: 0 });
            }}
            title="Zoom In"
            className="w-8 h-8 flex items-center justify-center bg-[#151515] border border-[#2A2A2A] hover:border-[#D4AF37] text-[#D4AF37] hover:text-white rounded-lg text-xs font-bold font-mono transition-all cursor-pointer"
          >
            ＋
          </button>
          
          {/* Zoom Indicator badge */}
          <span className="text-[10px] font-mono font-bold text-[#A09890] min-w-[45px] text-center">
            {zoomScale.toFixed(2)}x
          </span>

          {/* Zoom Out button */}
          <button
            onClick={() => {
              const nextScale = Math.max(zoomScale - 0.25, 1.0);
              setZoomScale(nextScale);
              if (nextScale === 1.0) {
                setPanOffset({ x: 0, y: 0 });
              } else {
                // Keep within bounds
                const maxX = (nextScale - 1) * 350;
                const maxY = (nextScale - 1) * 180;
                setPanOffset(prev => ({
                  x: Math.max(-maxX, Math.min(maxX, prev.x)),
                  y: Math.max(-maxY, Math.min(maxY, prev.y))
                }));
              }
            }}
            title="Zoom Out"
            className="w-8 h-8 flex items-center justify-center bg-[#151515] border border-[#2A2A2A] hover:border-[#D4AF37] text-[#D4AF37] hover:text-white rounded-lg text-xs font-bold font-mono transition-all cursor-pointer"
          >
            －
          </button>

          {/* Separation pipe */}
          <span className="w-px h-6 bg-[#222]"></span>

          {/* Reset position button */}
          <button
            onClick={() => {
              setZoomScale(1.0);
              setPanOffset({ x: 0, y: 0 });
            }}
            title="Reset Map Layout"
            className="px-2.5 h-8 flex items-center justify-center bg-[#151515] border border-[#2A2A2A] hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            Reset
          </button>

          {/* Toggle Borders Button */}
          <button
            onClick={() => setShowBorders(prev => !prev)}
            title="Toggle Historical Borders Display"
            className={`px-3.5 h-8 flex items-center justify-center border rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              showBorders 
                ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-400' 
                : 'bg-[#151515] border-[#2A2A2A] hover:border-[#D4AF37] text-[#A09890] hover:text-[#D4AF37]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 mr-1" />
            Borders: {showBorders ? 'ON' : 'OFF'}
          </button>

          {/* Toggle Intensity Heatmap Button */}
          <button
            onClick={() => setShowHeatmap(prev => !prev)}
            title="Toggle Geographic Event & Figure Intensity Heatmap"
            className={`px-3.5 h-8 flex items-center justify-center border rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              showHeatmap 
                ? 'bg-rose-950/50 border-rose-500/70 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]' 
                : 'bg-[#151515] border-[#2A2A2A] hover:border-rose-400 text-[#A09890] hover:text-rose-400'
            }`}
          >
            <Flame className="w-3.5 h-3.5 mr-1 text-rose-400" />
            Heatmap: {showHeatmap ? 'ON' : 'OFF'}
          </button>

          {/* Separation pipe */}
          <span className="w-px h-6 bg-[#222]"></span>

          {/* View Projection Toggle Button */}
          <button
            onClick={() => {
              const nextView = viewMode === 'flat' ? '3d' : 'flat';
              setViewMode(nextView);
              // reset zoom scale when switching projection to prevent coordinate offset glitching
              setZoomScale(1.0);
              setPanOffset({ x: 0, y: 0 });
            }}
            title="Toggle Flat vs 3D Globe Projection"
            className={`px-3.5 h-8 flex items-center justify-center border rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              viewMode === '3d' 
                ? 'bg-amber-950/40 border-[#D4AF37] text-[#D4AF37]' 
                : 'bg-[#151515] border-[#2A2A2A] hover:border-[#D4AF37] text-[#A09890] hover:text-[#D4AF37]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 mr-1" />
            {viewMode === '3d' ? '3D Globe' : 'Flat Map'}
          </button>

          {/* Auto Rotation Play/Pause for 3D */}
          {viewMode === '3d' && (
            <button
              onClick={() => setIsRotating(prev => !prev)}
              title={isRotating ? 'Pause Rotation' : 'Spin Globe'}
              className={`w-8 h-8 flex items-center justify-center border rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer transition-all ${
                isRotating 
                  ? 'bg-[#151515] border-[#2A2A2A] hover:border-emerald-400 text-emerald-400' 
                  : 'bg-emerald-950/25 border-emerald-500/55 text-emerald-400 hover:text-emerald-300'
              }`}
            >
              {isRotating ? '⏸' : '▶'}
            </button>
          )}

          {/* Compass layout arrow keys for touch screens */}
          {zoomScale > 1.0 && (
            <>
              <span className="w-px h-6 bg-[#222]"></span>
              <div className="grid grid-cols-3 grid-rows-2 w-14 gap-0.5">
                <div></div>
                <button
                  onClick={() => setPanOffset(p => ({ ...p, y: Math.min(p.y + 40, (zoomScale - 1) * 180) }))}
                  className="w-4.5 h-4 text-[#D4AF37] hover:bg-[#2A2A2A] rounded flex items-center justify-center text-[8px]"
                >
                  ▲
                </button>
                <div></div>
                <button
                  onClick={() => setPanOffset(p => ({ ...p, x: Math.min(p.x + 40, (zoomScale - 1) * 350) }))}
                  className="w-4.5 h-4 text-[#D4AF37] hover:bg-[#2A2A2A] rounded flex items-center justify-center text-[8px]"
                >
                  ◀
                </button>
                <button
                  onClick={() => setPanOffset(p => ({ ...p, y: Math.max(p.y - 40, -(zoomScale - 1) * 180) }))}
                  className="w-4.5 h-4 text-[#D4AF37] hover:bg-[#2A2A2A] rounded flex items-center justify-center text-[8px]"
                >
                  ▼
                </button>
                <button
                  onClick={() => setPanOffset(p => ({ ...p, x: Math.max(p.x - 40, -(zoomScale - 1) * 350) }))}
                  className="w-4.5 h-4 text-[#D4AF37] hover:bg-[#2A2A2A] rounded flex items-center justify-center text-[8px]"
                >
                  ▶
                </button>
              </div>
            </>
          )}
        </div>

        {/* Dynamic usage helper label */}
        {zoomScale > 1.0 && (
          <div className="absolute top-4 right-4 z-40 bg-[#0F0F0F]/90 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-[9px] font-mono text-[#A09890] flex items-center gap-1 shadow-lg backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Drag mouse over the map to PAN and explore regions</span>
          </div>
        )}

        {/* SVG Decorative World Outline */}
        <div 
          onMouseDown={(e) => {
            if (e.button !== 0 || zoomScale === 1.0) return;
            setIsDragging(true);
            setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
          }}
          onMouseMove={(e) => {
            if (!isDragging) return;
            const maxX = (zoomScale - 1) * 450;
            const maxY = (zoomScale - 1) * 225;
            setPanOffset({
              x: Math.max(-maxX, Math.min(maxX, e.clientX - dragStart.x)),
              y: Math.max(-maxY, Math.min(maxY, e.clientY - dragStart.y))
            });
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.1, 0.8, 0.3, 1)',
            cursor: zoomScale > 1.0 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
          className="relative min-w-[800px] aspect-[16/9] w-full"
        >
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full select-none"
          >
            {/* Background Parchment Grid & 3D Shaders */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A1A1A" strokeWidth="0.8" />
              </pattern>
              
              <clipPath id="globeClip">
                <circle cx="500" cy="250" r="180" />
              </clipPath>

              <radialGradient id="sphereOcean" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="65%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </radialGradient>

              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Intensity Heatmap Gradients */}
              <radialGradient id="heatCritical" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#F97316" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#EAB308" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="heatHigh" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#EAB308" stopOpacity="0.45" />
                <stop offset="75%" stopColor="#10B981" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="heatMedium" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EAB308" stopOpacity="0.75" />
                <stop offset="45%" stopColor="#10B981" stopOpacity="0.35" />
                <stop offset="80%" stopColor="#06B6D4" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="heatModerate" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.28" />
                <stop offset="85%" stopColor="#6366F1" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Flat projection group */}
            <motion.g
              key="flat-map-group"
              animate={{
                opacity: viewMode === 'flat' ? 1 : 0,
                scale: viewMode === 'flat' ? 1 : 0.88,
                filter: viewMode === 'flat' ? 'blur(0px)' : 'blur(4px)',
              }}
              initial={{
                opacity: viewMode === 'flat' ? 1 : 0,
                scale: viewMode === 'flat' ? 1 : 0.88,
                filter: viewMode === 'flat' ? 'blur(0px)' : 'blur(4px)'
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                pointerEvents: viewMode === 'flat' ? 'auto' : 'none',
                transformOrigin: '500px 250px'
              }}
            >
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Shaded/glowing territory radar halos for "improve civilization map" */}
              {hoveredEmpire && (
                <circle
                  cx={hoveredEmpire.coordinates.x}
                  cy={hoveredEmpire.coordinates.y}
                  r={65}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  strokeDasharray="4,6"
                  className="animate-spin-slow opacity-60"
                />
              )}
              {hoveredEmpire && (
                <circle
                  cx={hoveredEmpire.coordinates.x}
                  cy={hoveredEmpire.coordinates.y}
                  r={55}
                  fill="rgba(212, 175, 55, 0.12)"
                  stroke="#D4AF37"
                  strokeWidth="1.0"
                  className="animate-pulse"
                />
              )}
              
              {/* Active country radar halo */}
              {EMPIRES[selectedEra].map((empire) => {
                if (activeCountryId === empire.associatedCountryId) {
                  return (
                    <g key={`halo_${empire.id}`}>
                      <circle
                        cx={empire.coordinates.x}
                        cy={empire.coordinates.y}
                        r={75}
                        fill="rgba(212, 175, 55, 0.05)"
                        stroke="#D4AF37"
                        strokeWidth="1.0"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                      />
                      <circle
                        cx={empire.coordinates.x}
                        cy={empire.coordinates.y}
                        r={15}
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                        className="animate-ping"
                        style={{ animationDuration: '3s' }}
                      />
                    </g>
                  );
                }
                return null;
              })}

              {/* Continents Simplified Representation - Painted Beautiful Pastel region colors (matches uploaded photo of world map) */}
              {/* North America: soft vintage terracotta */}
              <path
                d="M 50,80 L 150,70 L 220,110 L 280,180 L 230,220 L 190,195 L 140,240 L 100,200 L 70,140 Z"
                fill="#8B625E"
                stroke="rgba(212,175,87,0.35)"
                strokeWidth="1.5"
                className="transition-colors hover:fill-[#9B726E]"
              />
              {/* South America: soft historical green */}
              <path
                d="M 180,250 L 225,270 L 285,320 L 255,420 L 210,480 L 190,460 L 175,340 L 165,280 Z"
                fill="#5A7A61"
                stroke="rgba(212,175,87,0.35)"
                strokeWidth="1.5"
                className="transition-colors hover:fill-[#6A8A71]"
              />
              {/* Eurasia / Europe: soft golden mustard parchment */}
              <path
                d="M 330,80 L 410,50 L 520,60 L 650,45 L 850,55 L 940,90 L 920,160 L 820,150 L 840,220 L 780,285 L 750,330 L 680,225 L 610,230 L 580,270 L 520,290 L 430,260 L 370,170 Z"
                fill="#998A53"
                stroke="rgba(212,175,87,0.35)"
                strokeWidth="1.5"
                className="transition-colors hover:fill-[#A99A63]"
              />
              {/* Africa: rich sienna brown */}
              <path
                d="M 370,250 L 485,250 L 550,290 L 575,340 L 620,380 L 550,470 L 500,430 L 460,350 L 390,345 Z"
                fill="#8C6B4E"
                stroke="rgba(212,175,87,0.35)"
                strokeWidth="1.5"
                className="transition-colors hover:fill-[#9C7B5D]"
              />
              {/* Australia: beautiful sage teal */}
              <path
                d="M 800,350 L 890,360 L 910,410 L 850,430 L 790,380 Z"
                fill="#527D7D"
                stroke="rgba(212,175,87,0.35)"
                strokeWidth="1.5"
                className="transition-colors hover:fill-[#628D8D]"
              />

              {/* Historical Border overlays on Flat Map */}
              {showBorders && HISTORICAL_BORDERS[selectedEra]?.map((hBorder, i) => (
                <g key={`hborder_flat_${selectedEra}_${i}`}>
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    d={`M ${hBorder.coords.map(c => `${c[0]},${c[1]}`).join(' L ')} Z`}
                    fill={hBorder.color}
                    stroke={hBorder.strokeColor}
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                    className="transition-all duration-350 hover:fill-opacity-50"
                  />
                  {/* Subtle label tags */}
                  <text
                    x={hBorder.coords[0][0] + 12}
                    y={hBorder.coords[0][1] + 14}
                    fill={hBorder.strokeColor}
                    className="font-mono text-[6.5px] font-bold uppercase tracking-wider opacity-85 pointer-events-none select-none"
                  >
                    ⚜ {hBorder.name}
                  </text>
                </g>
              ))}

              {/* Oceans & Geographical Titles inside Flat Map */}
              {OCEANS.map((ocean) => (
                <text
                  key={ocean.name}
                  x={ocean.x}
                  y={ocean.y}
                  fill="#3A5F7E"
                  className="font-serif italic font-bold text-[8.5px] uppercase tracking-widest text-center opacity-65 pointer-events-none select-none"
                  style={{ textAnchor: 'middle' }}
                >
                  {ocean.name}
                </text>
              ))}

              {/* Continent labels painted beautifully on flat map */}
              {CONTINENT_LABELS.map((continent) => (
                <text
                  key={`cont_${continent.name}`}
                  x={continent.x}
                  y={continent.y}
                  fill="#D4AF37"
                  className="font-serif italic font-bold text-[9px] tracking-widest text-center opacity-70 pointer-events-none select-none"
                  style={{ textAnchor: 'middle' }}
                >
                  {continent.name}
                </text>
              ))}

              {/* Dynamically scattered click-reactive Country labels on flat map */}
              {COUNTRIES.map((country, idx) => {
                const coords = getCountryCoordinates(country, idx);
                const isHovered = hoveredEmpire && (hoveredEmpire.associatedCountryId === country.id);
                const isActive = activeCountryId === country.id;
                
                return (
                  <text
                    key={`label_${country.id}_${idx}`}
                    x={coords.x}
                    y={coords.y}
                    fill={isActive ? '#D4AF37' : (isHovered ? '#FFFFFF' : 'rgba(224, 216, 208, 0.35)')}
                    className="text-[5px] font-sans font-medium tracking-wide transition-colors duration-200 pointer-events-auto cursor-pointer select-none hover:fill-white"
                    style={{ textAnchor: 'middle' }}
                    onClick={() => onSelectCountry(country.id)}
                  >
                    {country.flag} {country.name.split(' (')[0]}
                  </text>
                );
              })}
              
              {/* Equator & Meridians Lines */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#1F2937" strokeWidth="0.8" strokeDasharray="6,4" />
              <text x="20" y="243" fill="#D4AF37" className="font-mono text-[9px] font-semibold tracking-widest uppercase opacity-40">Equator</text>
              <text x="940" y="243" fill="#D4AF37" className="font-mono text-[9px] font-semibold tracking-widest uppercase opacity-40">0° Lat</text>

              {/* Water Lines surrounding Continents */}
              <path d="M 440,200 Q 420,180 435,160" fill="none" stroke="#222" strokeWidth="0.5" />
              <path d="M 720,310 Q 730,300 710,290" fill="none" stroke="#222" strokeWidth="0.5" />

              {/* INTENSITY HEATMAP LAYER (FLAT PROJECTION) */}
              {showHeatmap && (
                <g className="heatmap-layer transition-opacity duration-500 pointer-events-auto">
                  {filteredHeatmapClusters.map((cluster) => {
                    const gradId = 
                      cluster.intensityTier === 'extreme' ? 'url(#heatCritical)' :
                      cluster.intensityTier === 'high' ? 'url(#heatHigh)' :
                      cluster.intensityTier === 'moderate' ? 'url(#heatMedium)' : 'url(#heatModerate)';
                    const isSelected = selectedCluster?.id === cluster.id;
                    const rBase = Math.max(22, Math.min(55, cluster.totalIntensity * 0.72));
                    const clusterColor = getClusterColor(cluster.intensityTier);

                    return (
                      <g 
                        key={`heatmap_flat_${cluster.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCluster(cluster);
                        }}
                        className="cursor-pointer group"
                      >
                        {/* Outermost thermal diffuse aura */}
                        <circle
                          cx={cluster.coordinates.x}
                          cy={cluster.coordinates.y}
                          r={rBase * 1.5}
                          fill={gradId}
                          opacity={isSelected ? 0.95 : 0.70}
                          className="transition-all duration-300"
                        />
                        {/* Secondary radiant ring */}
                        <circle
                          cx={cluster.coordinates.x}
                          cy={cluster.coordinates.y}
                          r={rBase}
                          fill={gradId}
                          opacity={isSelected ? 0.92 : 0.78}
                        />
                        {/* Core epicenter */}
                        <circle
                          cx={cluster.coordinates.x}
                          cy={cluster.coordinates.y}
                          r={Math.max(5.5, rBase * 0.26)}
                          fill={clusterColor}
                          stroke="#FFFFFF"
                          strokeWidth={isSelected ? 2 : 1}
                          opacity={0.95}
                          className="animate-pulse"
                        />
                        {/* Cluster intensity text badge */}
                        <text
                          x={cluster.coordinates.x}
                          y={cluster.coordinates.y - rBase * 0.45 - 2}
                          fill="#FFFFFF"
                          textAnchor="middle"
                          className="font-mono text-[7px] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] pointer-events-none select-none tracking-tight"
                        >
                          {cluster.totalIntensity}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}
            </motion.g>

            {/* 3D Globe Projection Mode (highly visual, mathematically curved with 360-degree rotation) */}
            <motion.g
              key="globe-3d-group"
              animate={{
                opacity: viewMode === '3d' ? 1 : 0,
                scale: viewMode === '3d' ? 1 : 0.88,
                filter: viewMode === '3d' ? 'blur(0px)' : 'blur(4px)',
              }}
              initial={{
                opacity: viewMode === '3d' ? 1 : 0,
                scale: viewMode === '3d' ? 1 : 0.88,
                filter: viewMode === '3d' ? 'blur(0px)' : 'blur(4px)'
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                pointerEvents: viewMode === '3d' ? 'auto' : 'none',
                transformOrigin: '500px 250px'
              }}
            >
              {/* Space grid background backdrop */}
              <rect width="100%" height="100%" fill="#000000" opacity="0.4" />
              
              {/* Ocean Core Sphere */}
              <circle cx="500" cy="250" r="180" fill="url(#sphereOcean)" stroke="#222222" strokeWidth="1" />
              
              {/* Globe elements inside custom clipping mask path */}
              <g clipPath="url(#globeClip)">
                {/* Rotating Longitudes Ellipses (Space grids) */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angleOffset = i * (180 / 12);
                  const angle = ((globeRotation / 1000) * 360 + angleOffset) % 180;
                  const rx = 180 * Math.cos((angle * Math.PI) / 180);
                  if (Math.abs(rx) < 1) return null;
                  return (
                    <ellipse
                      key={`long3d_${i}`}
                      cx="500"
                      cy="250"
                      rx={Math.abs(rx)}
                      ry="180"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      strokeDasharray="4,6"
                      opacity="0.18"
                    />
                  );
                })}

                {/* Horizontal Latitudes Grid lines */}
                {[-135, -90, -45, 0, 45, 90, 135].map((yOffset) => {
                  const r_lat = Math.sqrt(180 * 180 - yOffset * yOffset);
                  return (
                    <line
                      key={`lat3d_${yOffset}`}
                      x1={500 - r_lat}
                      y1={250 + yOffset}
                      x2={500 + r_lat}
                      y2={250 + yOffset}
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      strokeDasharray="4,6"
                      opacity="0.18"
                    />
                  );
                })}

                {/* Projected 3D Continent Shapes (rendered in matching real pastel shades, rotates horizontally!) */}
                {/* North America */}
                <path
                  d={getProjectedPath(CONTINENTS_COORDS.northAmerica, globeRotation)}
                  fill="#8B625E"
                  stroke="rgba(212,175,87,0.35)"
                  strokeWidth="1.2"
                  opacity="0.95"
                />
                {/* South America */}
                <path
                  d={getProjectedPath(CONTINENTS_COORDS.southAmerica, globeRotation)}
                  fill="#5A7A61"
                  stroke="rgba(212,175,87,0.35)"
                  strokeWidth="1.2"
                  opacity="0.95"
                />
                {/* Eurasia */}
                <path
                  d={getProjectedPath(CONTINENTS_COORDS.eurasia, globeRotation)}
                  fill="#998A53"
                  stroke="rgba(212,175,87,0.35)"
                  strokeWidth="1.2"
                  opacity="0.95"
                />
                {/* Africa */}
                <path
                  d={getProjectedPath(CONTINENTS_COORDS.africa, globeRotation)}
                  fill="#8C6B4E"
                  stroke="rgba(212,175,87,0.35)"
                  strokeWidth="1.2"
                  opacity="0.95"
                />
                {/* Australia */}
                <path
                  d={getProjectedPath(CONTINENTS_COORDS.australia, globeRotation)}
                  fill="#527D7D"
                  stroke="rgba(212,175,87,0.35)"
                  strokeWidth="1.2"
                  opacity="0.95"
                />

                {/* 3D Historical Borders */}
                {showBorders && HISTORICAL_BORDERS[selectedEra]?.map((hBorder, i) => {
                  const projectedPath = getProjectedPath(hBorder.coords, globeRotation);
                  if (!projectedPath || projectedPath === 'M Z') return null;
                  return (
                    <path
                      key={`hborder_3d_${selectedEra}_${i}`}
                      d={projectedPath}
                      fill={hBorder.color}
                      stroke={hBorder.strokeColor}
                      strokeWidth="1.2"
                      strokeDasharray="3,2"
                      opacity="0.8"
                    />
                  );
                })}

                {/* Ocean Labels projected and rotating dynamically! */}
                {OCEANS.map((ocean) => {
                  const proj = projectPoint(ocean.x, ocean.y, globeRotation);
                  if (!proj.visible) return null;
                  const borderDist = Math.sqrt(Math.pow(proj.x - 500, 2) + Math.pow(proj.y - 250, 2));
                  const op = Math.max(0, 1 - (borderDist / 185));
                  return (
                    <text
                      key={`ocean3d_${ocean.name}`}
                      x={proj.x}
                      y={proj.y}
                      fill="#93c5fd"
                      style={{ textAnchor: 'middle' }}
                      className="font-serif italic font-bold text-[8px] uppercase tracking-widest pointer-events-none select-none"
                      opacity={op * 0.75}
                    >
                      {ocean.name}
                    </text>
                  );
                })}

                {/* Rotating 3D Continent titles */}
                {CONTINENT_LABELS.map((continent) => {
                  const proj = projectPoint(continent.x, continent.y, globeRotation);
                  if (!proj.visible) return null;
                  const borderDist = Math.sqrt(Math.pow(proj.x - 500, 2) + Math.pow(proj.y - 250, 2));
                  const op = Math.max(0, 1 - (borderDist / 185));
                  return (
                    <text
                      key={`cont3d_${continent.name}`}
                      x={proj.x}
                      y={proj.y}
                      fill="#D4AF37"
                      style={{ textAnchor: 'middle' }}
                      className="font-serif italic font-bold text-[8px] tracking-widest pointer-events-none select-none"
                      opacity={op * 0.9}
                    >
                      {continent.name}
                    </text>
                  );
                })}

                {/* Rotating 3D Country titles (Primary subset for clarity) */}
                {COUNTRIES.map((country, idx) => {
                  const coords = getCountryCoordinates(country, idx);
                  const presetNames = ['India', 'Egypt', 'Italy', 'China', 'Mexico', 'Greece', 'Iraq', 'Iran', 'Turkey', 'United States', 'Canada', 'Brazil', 'Russia', 'South Africa', 'Australia', 'Japan', 'Germany', 'United Kingdom', 'France', 'Spain'];
                  const name = country.name.split(' (')[0];
                  if (!presetNames.includes(name)) return null;

                  const proj = projectPoint(coords.x, coords.y, globeRotation);
                  if (!proj.visible) return null;
                  const borderDist = Math.sqrt(Math.pow(proj.x - 500, 2) + Math.pow(proj.y - 250, 2));
                  const op = Math.max(0, 1 - (borderDist / 185));
                  const isActive = activeCountryId === country.id;

                  return (
                    <text
                      key={`cnt3d_${country.id}_${idx}`}
                      x={proj.x}
                      y={proj.y}
                      fill={isActive ? '#D4AF37' : '#E0D8D0'}
                      style={{ textAnchor: 'middle' }}
                      className="font-sans text-[5.5px] font-medium tracking-wide pointer-events-auto cursor-pointer select-none hover:fill-white"
                      opacity={op * 0.8}
                      onClick={() => onSelectCountry(country.id)}
                    >
                      {country.flag} {name}
                    </text>
                  );
                })}

                {/* 3D INTENSITY HEATMAP LAYER */}
                {showHeatmap && filteredHeatmapClusters.map((cluster) => {
                  const proj = projectPoint(cluster.coordinates.x, cluster.coordinates.y, globeRotation);
                  if (!proj.visible) return null;
                  const borderDist = Math.sqrt(Math.pow(proj.x - 500, 2) + Math.pow(proj.y - 250, 2));
                  const op = Math.max(0, 1 - (borderDist / 185));
                  const rBase = Math.max(10, Math.min(30, cluster.totalIntensity * 0.45));
                  const isSelected = selectedCluster?.id === cluster.id;
                  const clusterColor = getClusterColor(cluster.intensityTier);

                  return (
                    <g
                      key={`heatmap_3d_${cluster.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCluster(cluster);
                      }}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={proj.x}
                        cy={proj.y}
                        r={rBase * 1.5}
                        fill={clusterColor}
                        opacity={op * 0.35}
                      />
                      <circle
                        cx={proj.x}
                        cy={proj.y}
                        r={rBase * 0.8}
                        fill={clusterColor}
                        opacity={op * 0.6}
                      />
                      <circle
                        cx={proj.x}
                        cy={proj.y}
                        r={Math.max(3.5, rBase * 0.32)}
                        fill="#FFFFFF"
                        stroke={clusterColor}
                        strokeWidth={isSelected ? 2 : 1}
                        opacity={op * 0.95}
                      />
                    </g>
                  );
                })}
              </g>

              {/* Golden Atmosphere Outer Rim Ring */}
              <circle
                cx="500"
                cy="250"
                r="180"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2.5"
                opacity="0.85"
              />

              {/* External Atmospheric Radial Aura Flare */}
              <circle
                cx="500"
                cy="250"
                r="183"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.0"
                opacity="0.45"
                filter="url(#glowEffect)"
              />

              {/* Core axis markings */}
              <line x1="500" y1="50" x2="500" y2="450" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3,8" opacity="0.25" />
              <text x="500" y="44" fill="#D4AF37" style={{ textAnchor: 'middle' }} className="font-mono text-[7px] tracking-widest uppercase opacity-45">North Pole Axis</text>
            </motion.g>

            {/* Dynamic Spotlight Historical Event Pinpoint Marker */}
            {projectedSelected && projectedSelected.visible && (
              <motion.g
                key="chronos-spotlight-pin"
                animate={{
                  x: projectedSelected.x,
                  y: projectedSelected.y
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="pointer-events-none select-none"
              >
                {/* 1. Large expanding neon status ripple */}
                <circle
                  cx={0}
                  cy={0}
                  r={32}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  className="animate-ping"
                  style={{ animationDuration: '2.5s' }}
                />
                {/* 2. Soft pulsing tracking aura */}
                <circle
                  cx={0}
                  cy={0}
                  r={18}
                  fill="rgba(212, 175, 55, 0.18)"
                  stroke="#D4AF37"
                  strokeWidth="1.2"
                  className="animate-pulse"
                />
                {/* 3. Drop focal line */}
                <motion.line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={40}
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  animate={{
                    opacity: is3D ? 0 : 0.8
                  }}
                  transition={{ duration: 0.5 }}
                />
                {/* 4. Core glowing hot node of destiny */}
                <circle
                  cx={0}
                  cy={0}
                  r={5}
                  fill="#FFFFFF"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                  filter="url(#glowEffect)"
                />
                
                {/* 5. Custom Label Flag Overlay attached to the pointer */}
                <motion.g 
                  animate={{
                    y: is3D ? -18 : 40
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {/* Backdrop label shield */}
                  <rect
                    x="-80"
                    y="0"
                    width="160"
                    height="32"
                    rx="6"
                    fill="#0A0A0A"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    opacity="0.9"
                  />
                  {/* Decorative corner tagger */}
                  <rect
                    x="-76"
                    y="4"
                    width="3"
                    height="24"
                    fill="#D4AF37"
                    rx="1"
                  />
                  {/* Miniature text values */}
                  <text
                    x="-64"
                    y="13"
                    fill="#D4AF37"
                    className="font-mono text-[7px] tracking-widest font-extrabold uppercase font-bold"
                  >
                    SPOTLIGHT FOCUS
                  </text>
                  <text
                    x="-64"
                    y="24"
                    fill="#FFFFFF"
                    className="font-sans text-[9px] font-bold"
                  >
                    {selectedTimelineEvent!.title.length > 25 
                      ? `${selectedTimelineEvent!.title.slice(0, 22)}...` 
                      : selectedTimelineEvent!.title}
                  </text>
                </motion.g>
              </motion.g>
            )}
          </svg>

          {/* Compass Rose Ornament */}
          <div className="absolute bottom-6 right-8 text-[#A09890] flex flex-col items-center pointer-events-none gap-1 bg-[#0A0A0A]/90 p-2.5 rounded-xl border border-[#2A2A2A]">
            <Compass className="w-8 h-8 stroke-[1] text-[#D4AF37] animate-spin-slow" />
            <span className="font-mono text-[8px] font-bold text-[#E0D8D0] tracking-wider uppercase">Vault Maps</span>
          </div>

          {/* INTENSITY HEATMAP HUD & LEGEND */}
          <AnimatePresence>
            {showHeatmap && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-4 left-4 z-20 bg-[#0C0C0C]/95 border border-rose-500/40 rounded-xl p-3 shadow-2xl backdrop-blur-md max-w-sm w-full text-left"
              >
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#222]">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-rose-950/80 text-rose-400 border border-rose-500/40">
                      <Flame className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-serif italic font-bold text-xs text-white tracking-wide">
                        Geographic Intensity Heatmap
                      </h4>
                      <p className="text-[9px] font-mono text-[#A09890]">
                        Visualizing 16 Historical Epicenters
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowHeatmap(false)}
                    className="text-[#7A7065] hover:text-white p-1 rounded transition-colors cursor-pointer"
                    title="Hide Heatmap Layer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Tier Filter Buttons */}
                <div className="flex items-center gap-1 mt-2.5 flex-wrap">
                  {(['all', 'extreme', 'high', 'moderate', 'low'] as const).map((tier) => {
                    const isCurrent = heatmapTierFilter === tier;
                    const tierBadgeColors: Record<string, string> = {
                      all: 'text-zinc-300 border-zinc-700 bg-zinc-900',
                      extreme: 'text-rose-400 border-rose-500/50 bg-rose-950/40',
                      high: 'text-amber-400 border-amber-500/50 bg-amber-950/40',
                      moderate: 'text-yellow-400 border-yellow-500/50 bg-yellow-950/40',
                      low: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40',
                    };

                    return (
                      <button
                        key={tier}
                        onClick={() => setHeatmapTierFilter(tier)}
                        className={`text-[8.5px] font-mono uppercase px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                          isCurrent
                            ? `${tierBadgeColors[tier]} font-bold ring-1 ring-white/20`
                            : 'text-[#7A7065] border-[#252525] bg-[#141414] hover:text-[#D4AF37]'
                        }`}
                      >
                        {tier}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 text-[9px] text-[#8E857C] font-sans flex items-center justify-between pt-1 border-t border-[#1C1C1C]">
                  <span>Click any thermal cluster to inspect</span>
                  <span className="font-mono text-[8px] text-rose-400">{filteredHeatmapClusters.length} Hotspots visible</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CLUSTER INSPECTOR DETAIL POPUP */}
          <AnimatePresence>
            {showHeatmap && selectedCluster && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                className="absolute bottom-6 left-6 z-30 bg-[#0A0A0A]/95 border border-[#D4AF37]/60 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm w-full text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-lg"
                      style={{ backgroundColor: getClusterColor(selectedCluster.intensityTier) }}
                    />
                    <div>
                      <h4 className="font-serif italic font-bold text-sm text-white leading-tight">
                        {selectedCluster.name}
                      </h4>
                      <p className="text-[10px] font-mono text-[#D4AF37]">
                        {selectedCluster.modernRegion}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCluster(null)}
                    className="text-[#7A7065] hover:text-white p-1 rounded transition-colors cursor-pointer"
                    title="Close cluster detail"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Metrics Stats Grid */}
                <div className="grid grid-cols-3 gap-2 my-3 p-2 bg-[#121212] rounded-lg border border-[#222]">
                  <div className="text-center">
                    <div className="font-mono text-base font-extrabold text-white">
                      {selectedCluster.totalIntensity}
                    </div>
                    <div className="text-[8px] font-mono uppercase text-[#7A7065]">
                      Total Density
                    </div>
                  </div>
                  <div className="text-center border-x border-[#222]">
                    <div className="font-mono text-base font-extrabold text-emerald-400">
                      {selectedCluster.eventCount}
                    </div>
                    <div className="text-[8px] font-mono uppercase text-[#7A7065]">
                      Events
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-base font-extrabold text-amber-400">
                      {selectedCluster.figureCount}
                    </div>
                    <div className="text-[8px] font-mono uppercase text-[#7A7065]">
                      Figures
                    </div>
                  </div>
                </div>

                {/* Key Historical Highlights */}
                <div>
                  <div className="text-[9px] font-mono uppercase text-[#7A7065] mb-1.5 flex items-center gap-1">
                    <Landmark className="w-3 h-3 text-[#D4AF37]" />
                    Notable Figures & Events
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedCluster.notableEvents.slice(0, 2).concat(selectedCluster.notableFigures.slice(0, 3)).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-sans bg-[#161616] text-[#E0D8D0] px-2 py-0.5 rounded border border-[#2A2A2A]"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Focus Button */}
                <button
                  onClick={() => {
                    if (viewMode === '3d') {
                      setIsRotating(false);
                      setGlobeRotation((1000 - selectedCluster.coordinates.x + 1000) % 1000);
                    } else {
                      const scale = 1.6;
                      setZoomScale(scale);
                      const dx = (500 - selectedCluster.coordinates.x) * scale;
                      const dy = (250 - selectedCluster.coordinates.y) * scale;
                      const maxX = (scale - 1) * 450;
                      const maxY = (scale - 1) * 225;
                      setPanOffset({
                        x: Math.max(-maxX, Math.min(maxX, dx)),
                        y: Math.max(-maxY, Math.min(maxY, dy))
                      });
                    }
                  }}
                  className="mt-3.5 w-full py-1.5 px-3 bg-[#181818] hover:bg-[#222] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] hover:text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  Focus & Center on Hotspot
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Hotspots dynamically loaded based on selected era */}
          {EMPIRES[selectedEra].map((empire) => {
            const isActive = activeCountryId === empire.associatedCountryId;
            const is3D = viewMode === '3d';
            const proj = is3D 
              ? projectPoint(empire.coordinates.x, empire.coordinates.y, globeRotation)
              : { x: empire.coordinates.x, y: empire.coordinates.y, visible: true };

            if (!proj.visible) return null; // Hide hotspots rotating behind globe horizon

            // Determine custom pulse scale, duration, and glow color dynamically based on the historical era selected
            let pulseDuration = 3.2;
            let pulseScale = 1.08;
            let glowColor = "rgba(212, 175, 55, 0.4)";
            if (selectedEra === 'Ancient') {
              pulseDuration = 4.2; // Slow, deep breathing
              pulseScale = 1.10;
              glowColor = "rgba(217, 119, 6, 0.45)"; // Warm Amber/Orange tone
            } else if (selectedEra === 'Medieval') {
              pulseDuration = 2.6; // Mystical, steady rhythm
              pulseScale = 1.12;
              glowColor = "rgba(99, 102, 241, 0.45)"; // Royal Indigo/Purple tone
            } else if (selectedEra === 'Modern') {
              pulseDuration = 1.5; // Fast, energetic pulsing
              pulseScale = 1.14;
              glowColor = "rgba(6, 182, 212, 0.50)"; // Electric Cyan/Modern Blue tone
            }

            return (
              <motion.button
                key={empire.id}
                onClick={() => onSelectCountry(empire.associatedCountryId)}
                onMouseEnter={() => setHoveredEmpire(empire)}
                onMouseLeave={() => setHoveredEmpire(null)}
                style={{
                  position: 'absolute',
                  left: `${proj.x / 10}%`,
                  top: `${proj.y / 5}%`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: proj.visible ? 'auto' : 'none'
                }}
                animate={{
                  scale: isActive ? [1.25, 1.34, 1.25] : [1.0, pulseScale, 1.0],
                  boxShadow: isActive 
                    ? [`0 0 6px ${glowColor}`, `0 0 18px ${glowColor}`, `0 0 6px ${glowColor}`]
                    : [`0 0 2px rgba(0,0,0,0.5)`, `0 0 12px ${glowColor}`, `0 0 2px rgba(0,0,0,0.5)`]
                }}
                transition={{
                  duration: pulseDuration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`group flex items-center justify-center p-3 rounded-full transition-all duration-350 ${
                  isActive 
                    ? 'ring-2 ring-offset-2 ring-offset-[#020202] ring-[#D4AF37] z-30' 
                    : 'hover:scale-115 hover:z-20'
                }`}
              >
                <span className="absolute inline-flex h-full w-full rounded-full animate-ping bg-[#D4AF37] opacity-10 group-hover:opacity-20"></span>
                <div className={`relative w-4.5 h-4.5 rounded-full border border-[#D4AF37] shadow-xl flex items-center justify-center transition-colors ${empire.color}`}>
                  <Landmark className="w-2 h-2 text-white" />
                </div>

                {/* Pulsing indicator of selected state */}
                {isActive && (
                  <div className="absolute -top-6 px-2 py-0.5 bg-[#D4AF37] text-black text-[8px] font-mono font-bold rounded shadow-xl whitespace-nowrap z-40">
                    Active Vault
                  </div>
                )}
              </motion.button>
            );
          })}

          {/* Spotlight Timeline Event HUD Overlay */}
          {selectedTimelineEvent && (
            <div className="absolute bottom-6 left-6 z-40 max-w-[280px] sm:max-w-xs md:max-w-sm bg-[#050505]/95 border border-[#D4AF37] p-4 rounded-xl shadow-2xl backdrop-blur-md text-left animate-fade-in space-y-3">
              <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2 gap-4">
                <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5 font-bold animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-ping"></span>
                  Spotlight Focused Event
                </span>
                {onClearSelectedTimelineEvent && (
                  <button
                    onClick={onClearSelectedTimelineEvent}
                    className="text-[9.5px] font-mono text-[#A09890] hover:text-red-400 border border-[#2A2A2A]/80 hover:border-red-500/40 px-1.5 py-0.5 rounded transition-all cursor-pointer bg-[#0F0F0F]"
                    title="Clear spotlight focus on this event"
                  >
                    Clear Focus
                  </button>
                )}
              </div>
              
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-[#D4AF37] bg-[#121212] px-2 py-0.5 border border-[#2A2A2A] rounded flex items-center gap-1 w-fit">
                  <Navigation className="w-2.5 h-2.5" />
                  {getEventCoordinates(selectedTimelineEvent).name} ({selectedTimelineEvent.date})
                </span>
                <h4 className="font-serif italic font-bold text-white text-xs sm:text-sm md:text-base pr-4 leading-tight">
                  {selectedTimelineEvent.title}
                </h4>
              </div>

              <p className="text-[11px] text-[#A09890] font-sans leading-normal line-clamp-3">
                {selectedTimelineEvent.description}
              </p>

              {selectedTimelineEvent.participants.length > 0 && (
                <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-[#1F1F1F]">
                  <span className="text-[8px] font-mono text-[#7A7065] mr-1">Key Actors:</span>
                  {selectedTimelineEvent.participants.slice(0, 3).map(p => (
                    <span key={p} className="text-[9px] bg-[#121212] text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#2A2A2A] font-medium whitespace-nowrap">
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hover / Select Civilization Dossier / Information Drawer overlay */}
        {selectedCountry ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 p-6 bg-[#0B0B0B]/95 rounded-2xl border border-[#D4AF37]/35 shadow-2xl text-left space-y-6"
          >
            {/* Dossier Header Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#121212] border border-[#D4AF37]/50 flex items-center justify-center text-2xl shadow-lg relative shrink-0">
                  <span className="relative z-10">{selectedCountry.flag || '🗺'}</span>
                  <div className="absolute -inset-0.5 bg-[#D4AF37]/15 rounded-xl blur animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-serif italic font-bold text-lg sm:text-xl text-white tracking-wide">
                      {selectedCountry.name}
                    </h3>
                    <span className="text-[8px] bg-amber-950/40 border border-[#D4AF37]/40 text-[#D4AF37] px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-widest">
                      Civilization Dossier
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A09890] mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono">
                    <span>🗣 <strong className="text-[#E0D8D0]">Language:</strong> {selectedCountry.language}</span>
                    <span className="text-[#262626]">|</span>
                    <span>🌍 <strong className="text-[#E0D8D0]">Region:</strong> {selectedCountry.continent || 'Global'}</span>
                    <span className="text-[#262626]">|</span>
                    <span>📜 <strong className="text-[#E0D8D0]">Epic:</strong> {selectedCountry.nationalEpics || 'Custom records'}</span>
                  </p>
                </div>
              </div>

              {/* Dossier Quick Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateTo?.('country', selectedCountry.id)}
                  title="Open this country's interactive vault"
                  className="px-3.5 py-1.5 bg-[#D4AF37] text-black hover:bg-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:shadow-xl"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  Jump to Vault
                </button>
                <button
                  onClick={() => {
                    onSelectCountry(undefined);
                  }}
                  className="p-1.5 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-red-500/40 text-[#A09890] hover:text-red-400 rounded-lg transition-all cursor-pointer"
                  title="Deselect and return to general map exploration"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Segmented Dossier Tab Selectors */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-[#1E1E1E] pb-1">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'culture', label: 'Culture & Feats', icon: Shield },
                { id: 'geography', label: 'Geography', icon: Compass },
                { id: 'revolutions', label: 'Impacts & Revolutions', icon: Activity },
                { id: 'people', label: 'Key Figures & Leaders', icon: Users },
                { id: 'articles', label: 'Linked Articles', icon: BookMarked },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const active = dossierTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDossierTab(tab.id as any)}
                    className={`px-3 py-2 flex items-center gap-1.5 border-b-2 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? 'border-[#D4AF37] text-[#D4AF37] bg-[#121212]/50'
                        : 'border-transparent text-[#A09890] hover:text-white'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Panel Content */}
            <div className="min-h-[140px] pt-1 text-left">
              <AnimatePresence mode="wait">
                {dossierTab === 'overview' && (
                  <motion.div
                    key="tab-overview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-3">
                        <h4 className="font-serif italic font-bold text-sm text-[#D4AF37]">Civilizational Genesis</h4>
                        <p className="text-xs text-[#A09890] leading-relaxed font-sans">{selectedCountry.summary}</p>
                        <p className="text-xs text-[#A09890] leading-relaxed font-sans">{selectedCountry.culture.split('.')[0]}.</p>
                      </div>
                      <div className="bg-[#0F0F0F] p-4 rounded-xl border border-[#1E1E1E] space-y-2.5">
                        <span className="text-[9px] font-mono tracking-wider font-bold text-[#D4AF37] uppercase">Sovereign Demographics</span>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-[#7A7065]">Population estimate:</span>
                            <span className="text-white font-mono">{selectedCountry.population || 'Dynamic'}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-[#7A7065]">Land Area:</span>
                            <span className="text-white font-mono">{selectedCountry.sizeSqKm || 'Dynamic'}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-[#7A7065]">Global Rank:</span>
                            <span className="text-emerald-400 font-mono font-semibold">{selectedCountry.worldPlaceRank || 'Dynamic'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {dossierTab === 'culture' && (
                  <motion.div
                    key="tab-culture"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="space-y-2">
                      <h4 className="font-serif italic font-bold text-sm text-[#D4AF37]">Cultural Overview</h4>
                      <p className="text-xs text-[#A09890] leading-relaxed font-sans">{selectedCountry.culture}</p>
                      {selectedCountry.majorReligions && (
                        <p className="text-[10px] text-[#7A7065] pt-1">
                          📿 <strong className="text-[#A09890]">Major Religion style:</strong> {selectedCountry.majorReligions}
                        </p>
                      )}
                    </div>
                    <div className="space-y-3 bg-[#0F0F0F] p-4 rounded-xl border border-[#1E1E1E]">
                      <h5 className="font-serif italic font-semibold text-xs text-[#D4AF37] flex items-center gap-1.5">
                        ✨ Major Feats & Achievements
                      </h5>
                      <ul className="space-y-1 text-xs text-[#A09890]">
                        {(selectedCountry.achievements && selectedCountry.achievements.length > 0) ? (
                          selectedCountry.achievements.map((ach, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#D4AF37] shrink-0">✦</span>
                              <span>{ach}</span>
                            </li>
                          ))
                        ) : (
                          <li className="italic text-[#7A7065]">Records parsed from classical archives.</li>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {dossierTab === 'geography' && (
                  <motion.div
                    key="tab-geography"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="space-y-2">
                      <h4 className="font-serif italic font-bold text-sm text-[#D4AF37]">Territorial Geography</h4>
                      <p className="text-xs text-[#A09890] leading-relaxed font-sans">{selectedCountry.geography}</p>
                    </div>
                    <div className="bg-[#0F0F0F] p-4 rounded-xl border border-[#1E1E1E] space-y-2">
                      <h5 className="font-serif italic font-semibold text-xs text-[#D4AF37]">🗺 Borders and Eras Control</h5>
                      <p className="text-[11px] text-[#A09890] leading-relaxed font-sans">
                        Dynamic borderlines shift based on selected era. In the <strong className="text-[#D4AF37]">{selectedEra} era</strong>, click on outer borders coordinates on the map to display ancient boundaries.
                      </p>
                    </div>
                  </motion.div>
                )}

                {dossierTab === 'revolutions' && (
                  <motion.div
                    key="tab-revolutions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="space-y-2">
                      <h4 className="font-serif italic font-bold text-sm text-amber-500">Milestones & Revolutions</h4>
                      <p className="text-xs text-[#A09890] leading-relaxed font-sans">{selectedCountry.revolution}</p>
                    </div>
                    <div className="space-y-2 bg-[#0F0F0F] p-4 rounded-xl border border-[#1E1E1E]">
                      <h5 className="font-serif italic font-semibold text-xs text-[#D4AF37]">🌐 Global Impact</h5>
                      <p className="text-xs text-[#A09890] leading-relaxed font-sans">
                        {selectedCountry.worldImpact}
                      </p>
                    </div>
                  </motion.div>
                )}

                {dossierTab === 'people' && (
                  <motion.div
                    key="tab-people"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Famous Figures */}
                      <div className="bg-[#0F0F0F] p-4 rounded-xl border border-[#1E1E1E] space-y-2">
                        <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-serif italic font-semibold">
                          <Crown className="w-3.5 h-3.5" />
                          Monarchs & Sovereigns
                        </div>
                        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                          {MONARCHS.filter(m => {
                            const q = selectedCountry.name.toLowerCase();
                            const qShort = q.split(' (')[0];
                            return m.name.toLowerCase().includes(qShort) || 
                                   m.biography.toLowerCase().includes(qShort) || 
                                   m.title.toLowerCase().includes(qShort) ||
                                   (qShort === 'italy' && m.region === 'Roman') ||
                                   (qShort === 'greece' && m.region === 'Greek') ||
                                   (qShort === 'egypt' && m.region === 'Egyptian') ||
                                   (qShort === 'india' && m.region === 'Indian');
                          }).slice(0, 4).map((monarch) => (
                            <button
                              key={monarch.id}
                              onClick={() => onNavigateTo?.('ruler', monarch.id)}
                              className="w-full text-left p-2 bg-[#151515] hover:bg-[#1A1A1A] border border-[#222] hover:border-[#D4AF37]/50 rounded text-xs flex justify-between items-center transition-colors cursor-pointer group"
                            >
                              <div>
                                <span className="font-serif text-white block group-hover:text-[#D4AF37] transition-all">{monarch.name}</span>
                                <span className="text-[10px] text-[#A09890]">{monarch.title} ({monarch.reign})</span>
                              </div>
                              <ArrowRight className="w-3 h-3 text-[#7A7065] group-hover:text-[#D4AF37] transition-all group-hover:translate-x-0.5" />
                            </button>
                          ))}
                          {MONARCHS.filter(m => {
                            const q = selectedCountry.name.toLowerCase();
                            const qShort = q.split(' (')[0];
                            return m.name.toLowerCase().includes(qShort) || 
                                   m.biography.toLowerCase().includes(qShort) || 
                                   m.title.toLowerCase().includes(qShort) ||
                                   (qShort === 'italy' && m.region === 'Roman') ||
                                   (qShort === 'greece' && m.region === 'Greek') ||
                                   (qShort === 'egypt' && m.region === 'Egyptian') ||
                                   (qShort === 'india' && m.region === 'Indian');
                          }).length === 0 && (
                            <span className="text-xs text-[#7A7065] italic block p-1">No direct matching sovereign rulers found.</span>
                          )}
                        </div>
                      </div>

                      {/* Other Figures */}
                      <div className="bg-[#0F0F0F] p-4 rounded-xl border border-[#1E1E1E] space-y-2">
                        <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-serif italic font-semibold">
                          <Users className="w-3.5 h-3.5" />
                          Philosophers & Eminent Figures
                        </div>
                        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                          {HISTORICAL_FIGURES.filter(f => {
                            const q = selectedCountry.name.toLowerCase();
                            const qShort = q.split(' (')[0];
                            return f.name.toLowerCase().includes(qShort) || 
                                   f.biography.toLowerCase().includes(qShort) || 
                                   f.role.toLowerCase().includes(qShort) ||
                                   (qShort === 'greece' && f.category === 'Philosopher');
                          }).slice(0, 4).map((fig) => (
                            <button
                              key={fig.id}
                              onClick={() => {
                                const type = fig.category === 'Philosopher' ? 'philosopher' : 'figure';
                                onNavigateTo?.(type, fig.id);
                              }}
                              className="w-full text-left p-2 bg-[#151515] hover:bg-[#1A1A1A] border border-[#222] hover:border-[#D4AF37]/50 rounded text-xs flex justify-between items-center transition-colors cursor-pointer group"
                            >
                              <div>
                                <span className="font-serif text-white block group-hover:text-[#D4AF37] transition-all">{fig.name}</span>
                                <span className="text-[10px] text-[#A09890]">{fig.role}</span>
                              </div>
                              <ArrowRight className="w-3 h-3 text-[#7A7065] group-hover:text-[#D4AF37] transition-all group-hover:translate-x-0.5" />
                            </button>
                          ))}
                          {HISTORICAL_FIGURES.filter(f => {
                            const q = selectedCountry.name.toLowerCase();
                            const qShort = q.split(' (')[0];
                            return f.name.toLowerCase().includes(qShort) || 
                                   f.biography.toLowerCase().includes(qShort) || 
                                   f.role.toLowerCase().includes(qShort) ||
                                   (qShort === 'greece' && f.category === 'Philosopher');
                          }).length === 0 && (
                            <span className="text-xs text-[#7A7065] italic block p-1">No custom scholars cataloged for this region.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {dossierTab === 'articles' && (
                  <motion.div
                    key="tab-articles"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ARTICLES.filter(a => {
                        const q = selectedCountry.name.toLowerCase();
                        const qShort = q.split(' (')[0];
                        return a.title.toLowerCase().includes(qShort) || 
                               a.content.toLowerCase().includes(qShort) || 
                               a.category.toLowerCase().includes(qShort) ||
                               a.tags.some(t => t.toLowerCase().includes(qShort));
                      }).slice(0, 3).map((article) => (
                        <div
                          key={article.id}
                          className="bg-[#0F0F0F] p-4 rounded-xl border border-[#1E1E1E] flex flex-col justify-between hover:border-[#D4AF37]/40 transition-all text-left"
                        >
                          <div>
                            <span className="text-[8px] bg-amber-950/40 text-[#D4AF37] border border-[#D4AF37]/20 px-2 py-0.5 rounded font-mono font-medium">
                              {article.category}
                            </span>
                            <h5 className="font-serif italic font-bold text-xs text-white mt-1.5 line-clamp-1.5 leading-snug">
                              {article.title}
                            </h5>
                            <p className="text-[10px] text-[#7A7065] mt-1 line-clamp-3 leading-snug">
                              {article.preview}
                            </p>
                          </div>
                          <button
                            onClick={() => onNavigateTo?.('article', article.id)}
                            className="mt-3 w-fit inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
                          >
                            Read Chronicle
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                      {ARTICLES.filter(a => {
                        const q = selectedCountry.name.toLowerCase();
                        const qShort = q.split(' (')[0];
                        return a.title.toLowerCase().includes(qShort) || 
                               a.content.toLowerCase().includes(qShort) || 
                               a.category.toLowerCase().includes(qShort) ||
                               a.tags.some(t => t.toLowerCase().includes(qShort));
                      }).length === 0 && (
                        <div className="col-span-3 p-6 text-center text-xs text-[#7A7065] bg-[#0F0F0F] rounded-xl border border-[#1E1E1E] italic">
                          No direct library scrolls. Visit the "Civilizations Vault" to write or compose essays dynamically!
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <div className="mt-4 p-4 bg-[#0F0F0F] rounded-xl border border-[#2A2A2A] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#151515] p-2.5 rounded-lg text-[#D4AF37] shrink-0 border border-[#2A2A2A]">
                <Info className="w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                {hoveredEmpire ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-serif italic font-semibold text-[#D4AF37] text-base">{hoveredEmpire.name}</h5>
                      <span className="text-[10px] bg-[#1A1A1A] border border-[#2A2A2A] text-[#E0D8D0] px-2 py-0.5 rounded font-mono">
                        {hoveredEmpire.era}
                      </span>
                    </div>
                    <p className="text-xs text-[#A09890] mt-1 max-w-2xl leading-relaxed">{hoveredEmpire.description}</p>
                    <p className="text-[10px] text-[#A09890] font-mono mt-1.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Click this hotspot to trigger the Country Vault
                    </p>
                  </div>
                ) : (
                  <div>
                    <h5 className="font-serif italic font-semibold text-[#E0D8D0] text-base">Explore Kingdoms and Empires</h5>
                    <p className="text-xs text-[#A09890] mt-0.5 leading-relaxed">
                      Click on any pulsing empire hotspot or sovereign map highlight to open a monumental civilization dossier with culture, revolutions, major impacts, geographic constraints, prominent figures, and linked library articles!
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#A09890] bg-[#151515] px-3 py-1.5 rounded-lg border border-[#2A2A2A] shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              Geo-Synced
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
