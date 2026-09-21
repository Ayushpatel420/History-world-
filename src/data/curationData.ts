import { 
  CuratedContentBundle, 
  CuratedTopicPreset, 
  HistoricalPeriod, 
  HistoricalRegion, 
  HistoricalTheme,
  Quiz 
} from '../types';
import { MONARCHS, HISTORICAL_FIGURES, HISTORICAL_EVENTS, QUIZZES } from './historyData';
import { ALL_HISTORICAL_BATTLES } from './battlesData';
import { ALL_DAILY_ARTIFACTS } from './dailyArtifacts';
import { ALL_WORLD_MONUMENTS } from './monuments';
import { ALL_RESEARCH_PAPERS } from './researchPapersData';
import { PHILOSOPHERS } from './philosophersData';

// ==========================================
// 1. POPULAR TOPIC PRESETS
// ==========================================
export const CURATED_PRESETS: CuratedTopicPreset[] = [
  {
    id: 'ancient_rome',
    label: 'Ancient Rome & The Caesars',
    badge: 'SPQR & Principate',
    description: 'From Republican Senate to Augustus’s Pax Romana, legionary discipline, monumental engineering, and civil wars.',
    iconName: 'Landmark',
    period: 'classical',
    region: 'mediterranean_rome',
    theme: 'ancient_rome',
    searchKeywords: ['rome', 'roman', 'caesar', 'augustus', 'senate', 'colosseum', 'legion', 'spqr', 'cicero', 'marcus aurelius', 'pax romana']
  },
  {
    id: 'world_war_2',
    label: 'World War II: Global Conflict',
    badge: '1939–1945 Total War',
    description: 'European and Pacific theatres, industrial mobilization, intelligence codebreaking, turning points, and post-war order.',
    iconName: 'Swords',
    period: 'ww2',
    region: 'global',
    theme: 'ww2',
    searchKeywords: ['wwii', 'world war ii', 'stalingrad', 'normandy', 'churchill', 'midway', 'blitzkrieg', 'd-day', 'enigma', 'pacific']
  },
  {
    id: 'greatest_monarchs',
    label: 'Greatest Monarchs of World History',
    badge: 'Crowns & Dynasties',
    description: 'Sovereign statecraft across millennia: Ramesses II, Cyrus the Great, Ashoka, Qin Shi Huang, Augustus, Charlemagne, and Elizabeth I.',
    iconName: 'Crown',
    period: 'all',
    region: 'global',
    theme: 'greatest_monarchs',
    searchKeywords: ['monarch', 'king', 'queen', 'emperor', 'pharaoh', 'dynasty', 'ashoka', 'charlemagne', 'louis xiv', 'cyrus', 'ramesses', 'elizabeth']
  },
  {
    id: 'ancient_egypt',
    label: 'Ancient Egypt & The Nile Valley',
    badge: 'Pharaohs & Sacred Stele',
    description: 'Divine kingship, monumental pyramids, hieroglyphic decipherment, religious cosmology, and trade with Punt and Levant.',
    iconName: 'Pyramid',
    period: 'ancient',
    region: 'middle_east_egypt',
    theme: 'relics_monuments',
    searchKeywords: ['egypt', 'pharaoh', 'nile', 'pyramid', 'rosetta', 'hieroglyph', 'ramesses', 'cleopatra', 'hatshepsut', 'thebes']
  },
  {
    id: 'classical_greece',
    label: 'Classical Greece & Hellenic Thought',
    badge: 'Polis & Philosophy',
    description: 'Athenian democracy, Spartan hoplite warfare, Socratic dialectic, Persian Wars, and Alexander’s world-spanning empire.',
    iconName: 'Compass',
    period: 'classical',
    region: 'mediterranean_rome',
    theme: 'philosophy_ideas',
    searchKeywords: ['greece', 'athens', 'sparta', 'alexander', 'socrates', 'plato', 'aristotle', 'parthenon', 'marathon', 'thermopylae']
  },
  {
    id: 'medieval_feudalism',
    label: 'Medieval Feudalism & Crusades',
    badge: 'Knights & Monasteries',
    description: 'Carolingian renaissance, Gothic cathedrals, monastic illuminated manuscripts, feudal chivalry, and the Magna Carta.',
    iconName: 'Shield',
    period: 'medieval',
    region: 'europe',
    theme: 'battles_tactics',
    searchKeywords: ['medieval', 'feudal', 'crusade', 'charlemagne', 'knight', 'hastings', 'magna carta', 'sutton hoo', 'notre-dame']
  },
  {
    id: 'enlightenment_science',
    label: 'Scientific Revolution & Enlightenment',
    badge: 'Reason & Empirical Method',
    description: 'Copernican astronomy, Newtonian physics, social contract theory, rationalist philosophy, and intellectual sparks of liberty.',
    iconName: 'Lightbulb',
    period: 'early_modern',
    region: 'europe',
    theme: 'science_enlightenment',
    searchKeywords: ['enlightenment', 'newton', 'locke', 'voltaire', 'rousseau', 'galileo', 'scientific', 'rationalism', 'revolution']
  },
  {
    id: 'cold_war_era',
    label: 'Cold War & The Nuclear Epoch',
    badge: '1946–1991 Superpowers',
    description: 'Bipolar geopolitical tensions, nuclear deterrence, ideological proxy conflicts, space race, and the fall of the Iron Curtain.',
    iconName: 'Scale',
    period: 'cold_war_modern',
    region: 'global',
    theme: 'ideology_revolutions',
    searchKeywords: ['cold war', 'soviet', 'berlin wall', 'nuclear', 'space race', 'containment', 'korea', 'cuban missile']
  }
];

// ==========================================
// 2. FILTER DIMENSION CHOICES
// ==========================================
export const PERIOD_OPTIONS: Array<{ id: HistoricalPeriod; label: string; span: string }> = [
  { id: 'all', label: 'All Historical Eras', span: '5,000 Years of Human History' },
  { id: 'ancient', label: 'Ancient & Bronze Age', span: 'c. 3000 BC – 500 BC' },
  { id: 'classical', label: 'Classical Antiquity', span: 'c. 500 BC – 500 AD' },
  { id: 'medieval', label: 'Medieval & Feudal Era', span: 'c. 500 AD – 1500 AD' },
  { id: 'early_modern', label: 'Early Modern & Renaissance', span: '1500 – 1800 AD' },
  { id: '19th_century', label: '19th Century & Industrial', span: '1800 – 1914 AD' },
  { id: 'ww1_interwar', label: 'World War I & Interwar', span: '1914 – 1938 AD' },
  { id: 'ww2', label: 'World War II', span: '1939 – 1945 AD' },
  { id: 'cold_war_modern', label: 'Cold War & Contemporary', span: '1946 – Present' }
];

export const REGION_OPTIONS: Array<{ id: HistoricalRegion; label: string }> = [
  { id: 'all', label: 'All Regions (Global)' },
  { id: 'mediterranean_rome', label: 'Mediterranean & Southern Europe (Rome & Greece)' },
  { id: 'middle_east_egypt', label: 'Middle East & North Africa (Egypt, Levant, Mesopotamia)' },
  { id: 'europe', label: 'Europe (Western, Northern & Eastern)' },
  { id: 'east_asia', label: 'East Asia (China, Japan, Korea, Mongolia)' },
  { id: 'south_asia', label: 'South Asia & Indian Subcontinent' },
  { id: 'americas', label: 'Americas (Mesoamerica & Modern)' },
  { id: 'africa', label: 'Sub-Saharan Africa & Nubia' },
  { id: 'global', label: 'Global & Maritime Oceans' }
];

export const THEME_OPTIONS: Array<{ id: HistoricalTheme; label: string; icon: string }> = [
  { id: 'all', label: 'All Thematic Disciplines', icon: 'Sparkles' },
  { id: 'ancient_rome', label: 'Ancient Rome & Classical Imperium', icon: 'Landmark' },
  { id: 'ww2', label: 'World War II & Total Warfare', icon: 'Swords' },
  { id: 'greatest_monarchs', label: 'Greatest Monarchs, Emperors & Queens', icon: 'Crown' },
  { id: 'battles_tactics', label: 'Decisive Military Battles & Strategy', icon: 'Shield' },
  { id: 'philosophy_ideas', label: 'Philosophy, Ethics & Intellectual Thought', icon: 'Compass' },
  { id: 'relics_monuments', label: 'Sacred Relics, Archaeological Specimens & Wonders', icon: 'Building2' },
  { id: 'ideology_revolutions', label: 'Political Ideologies, Statecraft & Revolutions', icon: 'Scale' },
  { id: 'science_enlightenment', label: 'Scientific Revolutions & Historiography', icon: 'GraduationCap' }
];

// ==========================================
// 3. BESPOKE PRE-CURATED BUNDLES FOR KEY THEMES
// ==========================================

export const ANCIENT_ROME_BUNDLE: CuratedContentBundle = {
  presetId: 'ancient_rome',
  title: 'Ancient Rome: Republic, Legions & The Augustan Imperium',
  epochLabel: 'Classical Antiquity (509 BC – 476 AD)',
  regionLabel: 'Mediterranean Basin & Italian Peninsula',
  themeLabel: 'Ancient Rome & Sovereign Imperium',
  curatorialBriefing: `Ancient Rome evolved from an agrarian settlement on the Tiber River into an unyielding Mediterranean superpower. Rome\'s brilliance lay in institutional hybridity: the republican constitution balanced consular executive command, senatorial aristocratic wisdom, and plebeian tribunician vetoes. When factional civil wars collapsed the Republic in the 1st century BC, Augustus established the Principate—a masterstroke of autocracy veiled in constitutional restoration—launching the two-century Pax Romana. Through standardized legionary discipline, monumental civil engineering (aqueducts, concrete arches, paved highways), and the universalizing codification of Roman Civil Law, Rome forged the institutional scaffolding of Western civilization.`,
  historicalSignificance: `Rome established the enduring foundations of modern constitutional law, republican governance, municipal hygiene, civil engineering, and Romance linguistic development throughout Europe and the Western world.`,
  keyPillars: [
    'Republican Constitutional Checks: Consuls, Senate, and Tribunes',
    'Military Discipline: Centurions, Cohorts, and Standardized Fortifications',
    'Pax Romana: 200 Years of Imperial Economic Stability & Trade',
    'Civil Law: Corpus Juris Civilis & Judicial Precedent'
  ],
  figuresAndMonarchs: [
    {
      id: 'augustus_caesar',
      name: 'Augustus Caesar (Octavian)',
      title: 'First Roman Emperor & Architect of the Principate',
      roleOrEra: '27 BC – 14 AD (Pax Romana Founder)',
      description: 'Defeated Mark Antony at Actium, consolidated power without claiming kingship, and famously transformed Rome from a city of brick into a city of marble.',
      achievements: [
        'Initiated the 200-year Pax Romana',
        'Created the Praetorian Guard and first civil police/fire brigades (Vigiles)',
        'Standardized imperial taxation and the Roman postal network (Cursus Publicus)'
      ],
      type: 'monarch',
      originRegion: 'Rome, Italy',
      reignOrDates: '27 BC – 14 AD'
    },
    {
      id: 'julius_caesar',
      name: 'Gaius Julius Caesar',
      title: 'Dictator of the Roman Republic & Conqueror of Gaul',
      roleOrEra: '100 – 44 BC (Late Roman Republic)',
      description: 'Subdued the Gallic tribes, crossed the Rubicon in 49 BC to trigger civil war, reformed the calendar, and centralized state authority before his assassination on the Ides of March.',
      achievements: [
        'Conquered Transalpine Gaul, bringing 300 tribes under Roman hegemony',
        'Introduced the 365.25-day Julian Calendar',
        'Granted Roman citizenship to provincial inhabitants across Cisalpine Gaul'
      ],
      type: 'monarch',
      originRegion: 'Rome, Italy',
      reignOrDates: '49 – 44 BC (Dictator)'
    },
    {
      id: 'marcus_aurelius',
      name: 'Marcus Aurelius Antoninus',
      title: 'Emperor-Philosopher of the Antonine Dynasty',
      roleOrEra: '161 – 180 AD (Five Good Emperors)',
      description: 'The last of the Five Good Emperors, Marcus Aurelius defended the Danubian frontier during the Marcomannic Wars while authoring the Stoic masterwork "Meditations".',
      achievements: [
        'Authored "Meditations", the enduring private journal of Stoic governance',
        'Reformed Roman guardianship laws to protect widows, orphans, and enslaved persons',
        'Commanded legions along the freezing Rhine-Danube frontier with unwavering duty'
      ],
      type: 'philosopher',
      originRegion: 'Rome, Italy',
      reignOrDates: '161 – 180 AD'
    },
    {
      id: 'cicero',
      name: 'Marcus Tullius Cicero',
      title: 'Statesman, Orator & Defender of the Roman Republic',
      roleOrEra: '106 – 43 BC (Late Republic)',
      description: 'Rome\'s greatest orator and constitutional legal scholar, Cicero exposed the Catilinarian conspiracy and championed natural law and republican liberties against military strongmen.',
      achievements: [
        'Composed seminal philosophical treatises: De Re Publica, De Legibus, and De Officiis',
        'Suppressed the Catiline treason conspiracy as Consul in 63 BC',
        'Pioneered humanitas: the intellectual curriculum of humane liberal education'
      ],
      type: 'figure',
      originRegion: 'Arpinum / Rome, Italy',
      reignOrDates: '106 – 43 BC'
    }
  ],
  events: [
    {
      id: 'ev_spqr_founding',
      year: '509 BC',
      title: 'Expulsion of Tarquin & Founding of the Roman Republic',
      description: 'The tyrannical king Tarquin the Proud was overthrown by Lucius Junius Brutus, establishing the constitutional Republic based on the rule of law and annual consular elections.',
      impact: 'Eliminated monarchy in Rome for nearly five centuries and birthed the Senatorial republican structure.',
      category: 'Constitutional Shift'
    },
    {
      id: 'ev_rubicon',
      year: '49 BC',
      title: 'Caesar Crosses the Rubicon: "Alea Iacta Est"',
      description: 'Julius Caesar defied the Senate by marching the 13th Legion across the boundary river Rubicon, triggering the civil war that dismantled republican institutions.',
      impact: 'Catalyzed the irreversible transition from oligarchic Republic to centralized autocratic Empire.',
      category: 'Civil Conflict'
    },
    {
      id: 'ev_actium',
      year: '31 BC',
      title: 'Naval Battle of Actium & Augustan Settlement',
      description: 'Octavian\'s admiral Marcus Agrippa defeated the combined fleets of Mark Antony and Cleopatra VII off western Greece, leaving Octavian the undisputed master of Rome.',
      impact: 'Annexed Ptolemaic Egypt as an imperial province and established the Roman Principate in 27 BC.',
      category: 'Imperial Consolidation'
    },
    {
      id: 'ev_pax_romana',
      year: '27 BC – 180 AD',
      title: 'The Golden Age of Pax Romana (Roman Peace)',
      description: 'Two centuries of unprecedented domestic stability, legal harmonization, and trade across Hispania, Gaul, Britannia, Egypt, and Syria.',
      impact: 'Fostered economic connectivity, urban development, and legal systematization across three continents.',
      category: 'Golden Age'
    }
  ],
  battles: [
    {
      id: 'b_cannae',
      name: 'Battle of Cannae',
      year: -216,
      war: 'Second Punic War',
      location: 'Cannae, Apulia, Southern Italy',
      commanders: 'Hannibal Barca vs Lucius Aemilius Paullus & Gaius Terentius Varro',
      outcome: 'Carthaginian tactical masterpiece; over 60,000 Roman legionaries encircled and annihilated',
      tacticalSummary: 'The gold standard of double envelopment: Hannibal deliberately bowed his weak center backward under Roman pressure, then clamped down with his elite Libyan infantry and Numidian heavy cavalry.'
    },
    {
      id: 'b_zama',
      name: 'Battle of Zama',
      year: -202,
      war: 'Second Punic War',
      location: 'Zama Regia, near modern Siliana, Tunisia',
      commanders: 'Scipio Africanus vs Hannibal Barca',
      outcome: 'Decisive Roman victory; Carthage surrendered its navy and overseas empire',
      tacticalSummary: 'Scipio neutralized Hannibal\'s 80 war elephants by arranging his maniples with open lanes, allowing the enraged beasts to run through harmlessly before his cavalry routed the Carthaginian wings.'
    },
    {
      id: 'b_alesia',
      name: 'Siege of Alesia',
      year: -52,
      war: 'Gallic Wars',
      location: 'Mont Auxois, Alise-Sainte-Reine, France',
      commanders: 'Julius Caesar vs Vercingetorix',
      outcome: 'Decisive Roman victory; total surrender of united Gallic coalition',
      tacticalSummary: 'Caesar constructed two concentric lines of defensive fortifications: an inner wall (circumvallation) to starve Vercingetorix inside, and an outer wall (contravallation) to repel 250,000 Gallic relief troops.'
    }
  ],
  artifactsAndMonuments: [
    {
      id: 'colosseum',
      name: 'The Colosseum (Flavian Amphitheatre)',
      category: 'Ancient Wonder / Monument',
      periodYear: '70–80 AD',
      locationOrOrigin: 'Piazza del Colosseo, Rome, Italy',
      summary: 'Constructed by Emperors Vespasian and Titus using revolutionary pozzolanic volcanic concrete, the 50,000-seat amphitheater hosted gladiatorial combats and naval mock-battles.',
      keyDetail: 'Incorporates sophisticated subterranean hypogeum staging elevators and eighty vaulted vomitoria entrances.',
      type: 'monument'
    },
    {
      id: 'denarius_caesar',
      name: 'Silver Denarius of Julius Caesar (44 BC)',
      category: 'Roman Coin',
      periodYear: 'February 44 BC',
      locationOrOrigin: 'Rome, Ancient Roman Republic',
      summary: 'The first coin in Roman history struck with the portrait of a living political figure—Dictator Perpetuo Julius Caesar—an act that outraged senatorial republicans.',
      keyDetail: 'Reverse shows Venus Victrix holding winged Victory and a sceptre, claiming divine descent from the goddess of love.',
      type: 'artifact'
    },
    {
      id: 'pantheon',
      name: 'The Pantheon of Hadrian',
      category: 'Imperial Architecture',
      periodYear: '126 AD',
      locationOrOrigin: 'Campus Martius, Rome, Italy',
      summary: 'Dedicated to all the gods of pagan Rome, its monumental unreinforced concrete dome remains the largest in the world nearly two millennia later.',
      keyDetail: 'Features a central open oculus (9 meters wide) that acts as the sole natural light beam, casting solar alignment across marble walls.',
      type: 'monument'
    }
  ],
  quizzes: [
    {
      id: 'curated_quiz_rome',
      title: '🏛️ SPQR & The Caesars: Roman Mastery Quiz',
      description: 'Demonstrate your knowledge of the Roman Republic, legionary warfare, the Augustan settlement, and legal codices.',
      category: 'Roman History',
      difficulty: 'Medium',
      questions: [
        {
          id: 'rq1',
          question: 'Who became the first official Emperor of Rome in 27 BC, marking the formal commencement of the Roman Empire?',
          options: ['Julius Caesar', 'Augustus (Octavian)', 'Nero', 'Marcus Aurelius'],
          correctIndex: 1,
          explanation: 'In 27 BC, Octavian accepted the honorary title "Augustus" from the Senate, establishing the Principate and becoming Rome\'s first emperor.',
          format: 'mcq'
        },
        {
          id: 'rq2',
          question: 'At which 216 BC battle did Hannibal Barca execute a legendary double envelopment, crushing over 60,000 Roman legionaries?',
          options: ['Battle of Zama', 'Battle of Cannae', 'Battle of Lake Trasimene', 'Battle of Trebia'],
          correctIndex: 1,
          explanation: 'Cannae in 216 BC remains the archetypal military encirclement, where Hannibal eliminated eight Roman legions.',
          format: 'mcq'
        },
        {
          id: 'rq3',
          question: 'What river did Julius Caesar cross with the 13th Legion in 49 BC, declaring "Alea iacta est" (The die is cast)?',
          options: ['Tiber River', 'Rhine River', 'Danube River', 'Rubicon River'],
          correctIndex: 3,
          explanation: 'Crossing the Rubicon violated Roman constitutional law forbidding a general from bringing armed legions into Italy.',
          format: 'mcq'
        },
        {
          id: 'rq4',
          question: 'True or False: The Colosseum was built using unreinforced pozzolanic volcanic ash concrete (opus caementicium).',
          options: ['True', 'False'],
          correctIndex: 0,
          explanation: 'True! Roman concrete made with pozzolana volcanic sand formed microscopic crystals that resisted seawater and weathering for millennia.',
          format: 'tf'
        },
        {
          id: 'rq5',
          question: 'Which Roman Emperor penned the personal Stoic journal published as "Meditations" while campaigning along the Danube?',
          options: ['Trajan', 'Hadrian', 'Marcus Aurelius', 'Antoninus Pius'],
          correctIndex: 2,
          explanation: 'Marcus Aurelius wrote "Meditations" in Koine Greek as a personal guide to Stoic virtue, self-control, and moral duty.',
          format: 'mcq'
        }
      ]
    }
  ],
  articles: [
    {
      id: 'art_rome_principate',
      title: 'The Augustan Principate: Constitutional Facade and Autocratic Power',
      authorsOrSource: 'Classical Studies & Historiography Monograph',
      category: 'Constitutional History',
      summary: 'An analytical examination of how Octavian converted the war-torn Roman Republic into an autocratic empire while claiming to restore ancestral senatorial traditions (Mos Maiorum).',
      keyInsights: [
        'Augustus avoided royal crowns or monarchic titles, instead holding tribunicia potestas (civil veto) and imperium proconsulare maius (supreme military command).',
        'The transition co-opted the equestrian mercantile class to administer taxation, stripping provincial governors of unregulated extortion.',
        'The military was converted into a permanent standing army paid directly by the imperial fiscus, binding legionary loyalty directly to the Emperor.'
      ],
      readTimeMinutes: 12,
      type: 'encyclopedia_article',
      citationOrLink: 'https://en.wikipedia.org/wiki/Principate'
    },
    {
      id: 'art_rome_braudel',
      title: 'The Mediterranean as an Oceanic Lake: Roman Sea Lanes and Grain Fleet Logistics',
      authorsOrSource: 'Fernand Braudel / Mediterranean Studies Archive',
      category: 'Economic History',
      summary: 'Explores how Roman domination converted the Mediterranean into "Mare Nostrum" (Our Sea), enabling the massive Egyptian annona grain fleet that fed one million Roman citizens.',
      keyInsights: [
        'Over 150,000 tons of grain were shipped annually from Alexandria to Ostia Antica using specialized merchant freighters.',
        'Roman suppression of Cilician piracy in 67 BC under Pompey catalyzed an unprecedented spike in Mediterranean trade connectivity.',
        'Standardized amphorae and maritime insurance laws created the pre-modern world\'s first unified customs and trading zone.'
      ],
      readTimeMinutes: 15,
      type: 'scholarly_paper',
      citationOrLink: 'Braudel, F. The Mediterranean in the Roman Epoch.'
    }
  ]
};

export const WW2_BUNDLE: CuratedContentBundle = {
  presetId: 'world_war_2',
  title: 'World War II: Global Total War, Industrial Logistics & Turning Points',
  epochLabel: '20th Century (1939 – 1945)',
  regionLabel: 'Global: Europe, Atlantic, Pacific, North Africa & Asia',
  themeLabel: 'World War II & Total Conflict',
  curatorialBriefing: `World War II (1939–1945) stands as the deadliest and most transformative military conflict in human history, involving over 100 million combatants across more than 30 nations. Originating from unresolved imperialist grievances of World War I and aggressive totalitarian expansionism, the conflict evolved through dramatic technological transformations: mechanized blitzkrieg, strategic radar-guided aerial bombardment, carrier-borne naval aviation, industrial codebreaking (Bletchley Park), and ultimately the release of atomic energy. The conflict culminated in the unconditional surrender of the Axis powers, the foundation of the United Nations, and the emergence of the United States and Soviet Union as atomic superpowers locked in the Cold War.`,
  historicalSignificance: `WWII redrew the global geopolitical map, catalyzed rapid decolonization in Asia and Africa, founded international human rights institutions (Geneva Conventions, Nuremberg Trials), and ushered in the nuclear age.`,
  keyPillars: [
    'Mechanized Combined-Arms: Blitzkrieg, Panzer corps, and close air support',
    'Industrial Attrition: Allied Liberty ships, Soviet tank factories, and war bonds',
    'Intelligence Breakthroughs: Ultra codebreaking and radar defensive networks',
    'Post-War Realignment: Bretton Woods, United Nations, and the Cold War'
  ],
  figuresAndMonarchs: [
    {
      id: 'winston_churchill',
      name: 'Sir Winston Churchill',
      title: 'Prime Minister of the United Kingdom (1940–1945)',
      roleOrEra: '1874 – 1965 (Wartime Coalition Leader)',
      description: 'Rallied the British Empire during its darkest hour in 1940, refusing compromise with Nazi Germany and orchestrating the Grand Alliance with Roosevelt and Stalin.',
      achievements: [
        'Broadcast historic speeches that unified British national morale during the Blitz',
        'Formed the Grand Alliance between the UK, USA, and USSR',
        'Awarded the Nobel Prize in Literature for historical and biographical writings'
      ],
      type: 'figure',
      originRegion: 'United Kingdom',
      reignOrDates: '1940–1945 & 1951–1955'
    },
    {
      id: 'georgy_zhukov',
      name: 'Marshal Georgy Zhukov',
      title: 'Marshal of the Soviet Union & Deputy Supreme Commander',
      roleOrEra: '1896 – 1974 (Red Army Commander)',
      description: 'The Soviet Union\'s preeminent military strategist, Zhukov orchestrated the defense of Moscow, the encirclement of the German Sixth Army at Stalingrad, and the final storming of Berlin.',
      achievements: [
        'Executed Operation Uranus, encircling 300,000 German soldiers at Stalingrad',
        'Masterminded Operation Bagration, obliterating German Army Group Centre',
        'Personally accepted the unconditional German Instrument of Surrender in Berlin'
      ],
      type: 'figure',
      originRegion: 'Soviet Union',
      reignOrDates: '1939–1945'
    },
    {
      id: 'dwight_eisenhower',
      name: 'General Dwight D. Eisenhower',
      title: 'Supreme Allied Commander Europe (SHAEF)',
      roleOrEra: '1890 – 1969 (Allied General & 34th US President)',
      description: 'Commanded Operation Overlord (the Normandy D-Day landings), holding together a fragile multinational coalition and directing the liberation of Western Europe.',
      achievements: [
        'Supervised Operation Overlord, the largest amphibious invasion in human history',
        'Coordinated complex air, naval, and ground logistics across US, British, and Canadian forces',
        'Served as first Supreme Allied Commander NATO and 34th US President'
      ],
      type: 'figure',
      originRegion: 'United States',
      reignOrDates: '1943–1945 (SHAEF)'
    },
    {
      id: 'alan_turing',
      name: 'Alan Turing',
      title: 'Cryptanalyst & Pioneer of Modern Computer Science',
      roleOrEra: '1912 – 1954 (Bletchley Park Hut 8)',
      description: 'Conceived the Bombe electromechanical device that cracked the German Enigma cipher at Bletchley Park, providing Allied commanders with vital Ultra intelligence.',
      achievements: [
        'Broke naval Enigma ciphers, shortening the Battle of the Atlantic by an estimated two years',
        'Designed the Universal Turing Machine, formulating the foundations of modern computation',
        'Pioneered early artificial intelligence concepts including the Turing Test'
      ],
      type: 'figure',
      originRegion: 'United Kingdom',
      reignOrDates: '1939–1945 (Bletchley)'
    }
  ],
  events: [
    {
      id: 'ev_outbreak_ww2',
      year: 'September 1, 1939',
      title: 'Invasion of Poland & Outbreak of War',
      description: 'Nazi Germany launched a blitzkrieg invasion of Poland, prompting Britain and France to declare war two days later.',
      impact: 'Signaled the collapse of European appeasement and initiated six years of global warfare.',
      category: 'Outbreak'
    },
    {
      id: 'ev_pearl_harbor',
      year: 'December 7, 1941',
      title: 'Attack on Pearl Harbor: "A Date Which Will Live in Infamy"',
      description: 'Imperial Japanese carrier aircraft launched a surprise strike on the US Pacific Fleet in Hawaii, bringing the United States into the war.',
      impact: 'United the industrial might of the US behind the Allied cause across both Atlantic and Pacific theaters.',
      category: 'Global Expansion'
    },
    {
      id: 'ev_dday',
      year: 'June 6, 1944',
      title: 'Operation Overlord: The Normandy Landings',
      description: '156,000 Allied troops landed across five Normandy beachheads backed by 7,000 vessels and 11,000 aircraft, breaching Hitler\'s Atlantic Wall.',
      impact: 'Opened the decisive Western Front, leading to the liberation of Paris and the fall of Berlin.',
      category: 'Allied Offensive'
    },
    {
      id: 'ev_vj_day',
      year: 'August–September 1945',
      title: 'Atomic Bombings of Hiroshima and Nagasaki & End of WWII',
      description: 'The deployment of atomic weapons followed by Soviet entry into the war forced Japan to sign the Instrument of Surrender aboard USS Missouri.',
      impact: 'Ended WWII and ushered humanity into the nuclear deterrence era.',
      category: 'Culmination'
    }
  ],
  battles: [
    {
      id: 'b_stalingrad',
      name: 'Battle of Stalingrad',
      year: 1942,
      war: 'Eastern Front (World War II)',
      location: 'Stalingrad (Volgograd), Volga River, USSR',
      commanders: 'Georgy Zhukov & Vasily Chuikov vs Friedrich Paulus',
      outcome: 'Decisive Soviet victory; entire German Sixth Army destroyed and captured',
      tacticalSummary: 'Brutal street-level urban combat (Rattenkrieg) in factories and rubble, followed by Soviet Operation Uranus—a massive pincer maneuver striking vulnerable Romanian and Italian flanks.'
    },
    {
      id: 'b_midway',
      name: 'Battle of Midway',
      year: 1942,
      war: 'Pacific War (World War II)',
      location: 'Midway Atoll, Central Pacific Ocean',
      commanders: 'Chester W. Nimitz & Raymond Spruance vs Isoroku Yamamoto & Chuichi Nagumo',
      outcome: 'Decisive American naval victory; four Japanese fleet aircraft carriers sunk',
      tacticalSummary: 'American codebreakers deciphered Japanese naval codes (JN-25), allowing US dive bombers (SBD Dauntless) to surprise and sink Akagi, Kaga, Soryu, and Hiryu in a single afternoon.'
    },
    {
      id: 'b_bulge',
      name: 'Battle of the Bulge (Ardennes Counteroffensive)',
      year: 1944,
      war: 'Western Front (World War II)',
      location: 'Ardennes Forest, Belgium, Luxembourg & France',
      commanders: 'Dwight D. Eisenhower & George S. Patton vs Gerd von Rundstedt & Walter Model',
      outcome: 'Allied victory; Germany\'s last offensive reserves exhausted',
      tacticalSummary: 'German panzers launched a surprise winter counterstrike through cloudy Ardennes skies to reach Antwerp; US forces held Bastogne until skies cleared for Allied fighter-bombers.'
    }
  ],
  artifactsAndMonuments: [
    {
      id: 'enigma_machine',
      name: 'Military Enigma Cryptographic Cipher Machine',
      category: 'Cryptographic Artifact / Specimen',
      periodYear: '1938–1945',
      locationOrOrigin: 'Berlin, Germany / Bletchley Park, UK',
      summary: 'Electromechanical rotor cipher machine with millions of daily permutations used by the German Wehrmacht and Kriegsmarine for encrypted command dispatches.',
      keyDetail: 'Incorporated three to four rotating stepped wheels and a plugboard (Steckerbrett) yielding 158 quadrillion possible wiring configurations.',
      type: 'artifact'
    },
    {
      id: 'normandy_cemetery',
      name: 'Normandy American Cemetery and Memorial',
      category: 'World War Memorial',
      periodYear: 'Dedicated 1956',
      locationOrOrigin: 'Colleville-sur-Mer, Normandy, France',
      summary: 'Perched upon the cliffs overlooking Omaha Beach, the 172-acre memorial contains 9,388 immaculate white Lasa marble crosses and Stars of David honoring fallen Allied liberators.',
      keyDetail: 'Orientation faces westward across the Atlantic towards the American homeland.',
      type: 'monument'
    }
  ],
  quizzes: [
    {
      id: 'curated_quiz_ww2',
      title: '⚔️ World War II: Global Conflict Mastery Quiz',
      description: 'Challenge your tactical, geopolitical, and historical comprehension of the Second World War.',
      category: 'World War II',
      difficulty: 'Hard',
      questions: [
        {
          id: 'wq1',
          question: 'Which decisive 1942 naval battle saw the US Navy sink four Imperial Japanese aircraft carriers, reversing the tide of the Pacific War?',
          options: ['Battle of the Coral Sea', 'Battle of Midway', 'Battle of Leyte Gulf', 'Battle of Guadalcanal'],
          correctIndex: 1,
          explanation: 'Midway in June 1942 eliminated the veteran core of Japanese naval aviation and shifted strategic initiative permanently to the Allies.',
          format: 'mcq'
        },
        {
          id: 'wq2',
          question: 'What was the code name for the Soviet pincer offensive that encircled the German Sixth Army at Stalingrad in November 1942?',
          options: ['Operation Barbarossa', 'Operation Uranus', 'Operation Bagration', 'Operation Citadel'],
          correctIndex: 1,
          explanation: 'Operation Uranus smashed through weaker Romanian flanks north and south of Stalingrad, trapping 300,000 Axis troops in the pocket.',
          format: 'mcq'
        },
        {
          id: 'wq3',
          question: 'Which British codebreaking headquarters was home to Alan Turing and the Bombe electromechanical machines that cracked Enigma?',
          options: ['Bletchley Park', 'Whitehall', 'Orford Ness', 'Porton Down'],
          correctIndex: 0,
          explanation: 'Bletchley Park (Station X) in Buckinghamshire housed thousands of mathematicians, linguists, and engineers who decrypted Ultra intelligence.',
          format: 'mcq'
        },
        {
          id: 'wq4',
          question: 'True or False: The Normandy D-Day landings occurred across six beachheads named Utah, Omaha, Gold, Juno, Sword, and Diamond.',
          options: ['True', 'False'],
          correctIndex: 1,
          explanation: 'False! There were only five official beachheads: Utah and Omaha (US), Gold and Sword (UK), and Juno (Canada). There was no "Diamond" beach.',
          format: 'tf'
        },
        {
          id: 'wq5',
          question: 'What multinational research undertaking developed the world\'s first operational atomic weapons under the direction of J. Robert Oppenheimer?',
          options: ['Project Manhattan', 'Project Apollo', 'Operation Paperclip', 'The Tube Alloys Project'],
          correctIndex: 0,
          explanation: 'The Manhattan Project, centered at Los Alamos, Oak Ridge, and Hanford, produced the Trinity test and the atomic weapons deployed in 1945.',
          format: 'mcq'
        }
      ]
    }
  ],
  articles: [
    {
      id: 'art_ww2_browning',
      title: 'Ordinary Men and the Industrialization of Total Warfare',
      authorsOrSource: 'Christopher Browning / Holocaust & Totalitarianism Archive',
      category: 'Historiographical Study',
      summary: 'A landmark sociological and historical analysis of Reserve Police Battalion 101, examining how ordinary citizens were conditioned into instruments of ideological annihilation through bureaucratic routine and peer pressure.',
      keyInsights: [
        'Demonstrates that wartime atrocities were not committed solely by ideological zealots, but by middle-aged working-class conscripts.',
        'Explores the destructive power of conformity, organizational peer solidarity, and obedience to state authority under wartime stress.',
        'Pioneered perpetrator historiography based on rigorous post-war judicial interrogations.'
      ],
      readTimeMinutes: 14,
      type: 'scholarly_paper',
      citationOrLink: 'Browning, C. R. Ordinary Men: Reserve Police Battalion 101. HarperCollins.'
    },
    {
      id: 'art_ww2_convoys',
      title: 'The Battle of the Atlantic: Logistics, Liberty Ships and Wolfpack Defeat',
      authorsOrSource: 'Naval Historical Society Review',
      category: 'Military Logistics',
      summary: 'Details how Allied convoy routing, Hedgehog depth charges, long-range B-24 Liberator maritime patrols, and Kaiser shipyard prefabrication defeated Admiral Dönitz\'s U-boat fleet.',
      keyInsights: [
        'Henry Kaiser\'s shipyard innovations reduced the construction time of a 10,000-ton Liberty cargo vessel from 244 days to just 42 days.',
        'The closure of the "Mid-Atlantic Air Gap" via escort aircraft carriers dealt a fatal blow to submarine surface recharging.',
        'Over 3,500 Allied merchant ships were sunk, but the convoy lifeline to Britain and the USSR was sustained.'
      ],
      readTimeMinutes: 11,
      type: 'encyclopedia_article',
      citationOrLink: 'https://en.wikipedia.org/wiki/Battle_of_the_Atlantic'
    }
  ]
};

export const GREATEST_MONARCHS_BUNDLE: CuratedContentBundle = {
  presetId: 'greatest_monarchs',
  title: 'Greatest Monarchs of History: Dynasties, Statecraft & Empire Builders',
  epochLabel: 'Cross-Era (1300 BC – 1900 AD)',
  regionLabel: 'Global: Egypt, Persia, India, China, Rome, Europe & Russia',
  themeLabel: 'Greatest Monarchs & Imperial Rulers',
  curatorialBriefing: `Throughout five millennia of recorded human history, hereditary monarchies constituted the predominant architecture of statecraft. The greatest monarchs were not merely conquerors, but visionary institution-builders who codified legal systems, fostered intellectual flowerings, patronized monumental architecture, and bound disparate regional populations under unified cultural and legal identities. From Ramesses II\'s diplomacy and Cyrus\'s toleration charter to Ashoka\'s Buddhist edicts of non-violence, Qin Shi Huang\'s standardization, Charlemagne\'s educational renewal, and Elizabeth I\'s maritime golden age, sovereign rulers fundamentally shaped civilization.`,
  historicalSignificance: `These rulers transformed tribal polities into enduring civilizational matrixes, creating legal codes, religious patronages, and infrastructural networks that outlived their dynasties by centuries.`,
  keyPillars: [
    'Legal & Moral Codices: From the Cyrus Cylinder to Ashoka\'s Rock Edicts',
    'Administrative Centralization: Standardized currencies, roads, and civil service',
    'Architectural Monumentality: Palaces, temples, and defensive boundaries',
    'Cultural & Philosophical Patronage: Sponsoring scholars, artists, and translators'
  ],
  figuresAndMonarchs: [
    {
      id: 'cyrus_the_great',
      name: 'Cyrus II (Cyrus the Great)',
      title: 'Founder of the Achaemenid Persian Empire',
      roleOrEra: '600 – 530 BC (First World Empire)',
      description: 'Created the largest empire the world had yet seen by respecting regional customs, liberating enslaved peoples, and establishing the pioneering Cyrus Cylinder charter of rights.',
      achievements: [
        'Issued the Cyrus Cylinder, hailed by historians as an early declaration of religious tolerance',
        'Liberated the Jewish exiles from Babylon and funded the rebuilding of the Second Temple in Jerusalem',
        'Built the Royal Road and established the satrapy system of decentralized provincial administration'
      ],
      type: 'monarch',
      originRegion: 'Persia (Modern Iran)',
      reignOrDates: '559 – 530 BC'
    },
    {
      id: 'ashoka_the_great',
      name: 'Ashoka the Great',
      title: 'Emperor of the Mauryan Empire of India',
      roleOrEra: '304 – 232 BC (Mauryan Dynasty)',
      description: 'Following the devastating Kalinga War, Ashoka experienced profound moral remorse, converted to Buddhism, and renounced aggressive war in favor of moral governance (Dhamma).',
      achievements: [
        'Erected the Edicts of Ashoka upon stone pillars and cliff faces preaching non-violence and animal welfare',
        'Dispatched Buddhist emissaries across Sri Lanka, Greece, Syria, and Central Asia',
        'His Lion Capital of Ashoka at Sarnath is the modern official National Emblem of India'
      ],
      type: 'monarch',
      originRegion: 'India / Magadha',
      reignOrDates: '268 – 232 BC'
    },
    {
      id: 'qin_shi_huang',
      name: 'Qin Shi Huang',
      title: 'First Emperor of a Unified China',
      roleOrEra: '259 – 210 BC (Qin Dynasty)',
      description: 'Ended centuries of Warring States chaos by conquering all six rival kingdoms, creating the title Huangdi (Emperor), and forging the institutional template of imperial China.',
      achievements: [
        'Standardized Chinese script, currency, axle widths, and weights & measures nationwide',
        'Connected regional fortifications to create the first Great Wall of China',
        'Constructed his colossal mausoleum guarded by the 8,000-man Terracotta Army'
      ],
      type: 'monarch',
      originRegion: 'China / Xianyang',
      reignOrDates: '247 – 210 BC'
    },
    {
      id: 'charlemagne',
      name: 'Charlemagne (Charles the Great)',
      title: 'King of the Franks & First Holy Roman Emperor',
      roleOrEra: '742 – 814 AD (Carolingian Empire)',
      description: 'United Western and Central Europe for the first time since the fall of Rome; crowned Emperor of the Romans by Pope Leo III on Christmas Day 800 AD.',
      achievements: [
        'Sparked the Carolingian Renaissance of classical literature, Latin scholarship, and art',
        'Standardized the clear Carolingian minuscule script (the direct ancestor of modern lowercase typography)',
        'Established schools in every bishopric and monastery across Western Europe'
      ],
      type: 'monarch',
      originRegion: 'Aachen / Frankish Realm',
      reignOrDates: '768 – 814 AD'
    },
    {
      id: 'elizabeth_i',
      name: 'Queen Elizabeth I',
      title: 'Queen of England and Ireland (The Virgin Queen)',
      roleOrEra: '1533 – 1603 (Tudor Golden Age)',
      description: 'Reigned for 44 triumphant years, establishing Protestant moderate stability, repelling the Spanish Armada in 1588, and nurturing the Elizabethan theatrical renaissance of Shakespeare.',
      achievements: [
        'Defeated King Philip II\'s formidable Spanish Armada in 1588',
        'Established the Elizabethan Religious Settlement, forging church moderation',
        'Presided over the golden age of English drama, poetry, and global oceanic exploration'
      ],
      type: 'monarch',
      originRegion: 'England',
      reignOrDates: '1558 – 1603'
    },
    {
      id: 'louis_xiv',
      name: 'Louis XIV (The Sun King)',
      title: 'King of France and Navarre',
      roleOrEra: '1638 – 1715 (Bourbon Dynasty)',
      description: 'The archetype of European royal absolutism ("L\'État, c\'est moi"), Louis XIV reigned for 72 years—the longest recorded of any sovereign monarch in history.',
      achievements: [
        'Constructed the opulent Palace of Versailles, domesticating the unruly French aristocracy',
        'Patronized the French Academy, Molière, and monumental classical baroque architecture',
        'Established France as the dominant geopolitical and cultural power of continental Europe'
      ],
      type: 'monarch',
      originRegion: 'France',
      reignOrDates: '1643 – 1715'
    }
  ],
  events: [
    {
      id: 'ev_kalinga',
      year: '261 BC',
      title: 'The Kalinga War & Ashoka\'s Renunciation of Warfare',
      description: 'Shocked by the slaughter of over 100,000 soldiers at Kalinga, Emperor Ashoka experienced profound spiritual transformation, embracing Buddhist ahimsa (non-injury).',
      impact: 'Spread Buddhist moral philosophy across Asia and established early state welfare policies.',
      category: 'Moral Governance'
    },
    {
      id: 'ev_charlemagne_coronation',
      year: 'Christmas Day, 800 AD',
      title: 'Coronation of Charlemagne as Holy Roman Emperor',
      description: 'Pope Leo III crowned Charlemagne at Old St. Peter\'s Basilica in Rome, establishing the concept of the Holy Roman Empire that lasted until 1806.',
      impact: 'Legitimized Western European Christian imperial power independent of the Byzantine Empire.',
      category: 'Dynastic Imperialism'
    },
    {
      id: 'ev_spanish_armada',
      year: '1588 AD',
      title: 'Defeat of the Spanish Armada by Elizabeth I\'s Fleet',
      description: 'Sir Francis Drake and Lord Howard routed the 130-ship invasion armada of Philip II of Spain off the English Channel.',
      impact: 'Secured English independence, protected the Protestant Reformation, and initiated English maritime ascendancy.',
      category: 'Naval Triumph'
    }
  ],
  battles: [
    {
      id: 'b_gaugamela',
      name: 'Battle of Gaugamela',
      year: -331,
      war: 'Alexander the Great\'s Persian Campaign',
      location: 'Near modern Erbil, Kurdistan Region, Northern Iraq',
      commanders: 'Alexander the Great vs King Darius III of Persia',
      outcome: 'Decisive Macedonian victory; fall of the Achaemenid Empire',
      tacticalSummary: 'Alexander drew the Persian left wing outward, spotted a tear in the Persian battle line, and led his Companion Cavalry in an angled wedge charge aimed directly at King Darius\'s royal chariot.'
    },
    {
      id: 'b_kadesh',
      name: 'Battle of Kadesh',
      year: -1274,
      war: 'Egyptian–Hittite Wars',
      location: 'Orontes River near Kadesh (Modern Syria)',
      commanders: 'Pharaoh Ramesses II vs King Muwatalli II of Hatti',
      outcome: 'Tactical draw leading to the world\'s earliest recorded international peace treaty',
      tacticalSummary: 'The largest chariot battle in human history (over 5,000 chariots). Ramesses was ambushed, but rally-charged with his personal guard until elite reinforcements secured the field.'
    },
    {
      id: 'b_austerlitz',
      name: 'Battle of Austerlitz (Battle of the Three Emperors)',
      year: 1805,
      war: 'War of the Third Coalition',
      location: 'Austerlitz (Slavkov u Brna), Moravia, Austrian Empire',
      commanders: 'Napoleon Bonaparte vs Emperor Alexander I (Russia) & Emperor Francis II (Austria)',
      outcome: 'Decisive French tactical masterpiece; collapse of the Third Coalition',
      tacticalSummary: 'Napoleon feigned weakness on his right wing to lure the Russian army off the Pratzen Heights, then launched Marshal Soult\'s corps up the center to bisect the Allied forces.'
    }
  ],
  artifactsAndMonuments: [
    {
      id: 'palace_versailles',
      name: 'The Palace of Versailles (Château de Versailles)',
      category: 'Royal Palace & Architecture',
      periodYear: '1661–1710 AD',
      locationOrOrigin: 'Versailles, Île-de-France, France',
      summary: 'The ultimate symbol of royal absolutism, transformed by Louis XIV from a simple hunting lodge into a colossal palace complex with the famous Hall of Mirrors and vast hydraulic gardens.',
      keyDetail: 'Contains 700 rooms and the 73-meter Hall of Mirrors lit by 17 massive mirrored archways reflecting garden sunsets.',
      type: 'monument'
    },
    {
      id: 'abu_simbel',
      name: 'The Rock Temples of Abu Simbel',
      category: 'Pharaonic Royal Monument',
      periodYear: '1264 BC',
      locationOrOrigin: 'Aswan Governorate, Upper Egypt',
      summary: 'Carved directly into the sandstone cliffs by Ramesses the Great to commemorate his victory at Kadesh and intimidate southern Nubian neighbors.',
      keyDetail: 'Guarded by four colossal 20-meter seated statues of Ramesses II wearing the double Pschent crown.',
      type: 'monument'
    },
    {
      id: 'cyrus_cylinder',
      name: 'The Cyrus Cylinder',
      category: 'Royal Decree & Epigraphic Specimen',
      periodYear: '539 BC',
      locationOrOrigin: 'Babylon, Mesopotamia (Persian Empire)',
      summary: 'A baked-clay barrel inscribed in Babylonian cuneiform detailing Cyrus the Great\'s peaceful capture of Babylon and decree restoring displaced deities and peoples.',
      keyDetail: 'Considered the world\'s oldest charter of human rights and religious toleration.',
      type: 'artifact'
    }
  ],
  quizzes: [
    {
      id: 'curated_quiz_monarchs',
      title: '👑 Sovereign Thrones: Greatest Monarchs Mastery Quiz',
      description: 'Test your understanding of royal statecraft, sovereign edicts, and dynastic legacies.',
      category: 'Monarchs & Dynasties',
      difficulty: 'Medium',
      questions: [
        {
          id: 'mq1',
          question: 'Which Persian Emperor issued the famous cylinder decree permitting exiled Jewish populations to return to Jerusalem and rebuild their temple?',
          options: ['Darius the Great', 'Xerxes I', 'Cyrus the Great', 'Artaxerxes I'],
          correctIndex: 2,
          explanation: 'Cyrus the Great conquered Babylon in 539 BC and earned biblical praise for liberating Jewish exiles and promoting religious toleration.',
          format: 'mcq'
        },
        {
          id: 'mq2',
          question: 'After the bloody conquest of which region in 261 BC did Emperor Ashoka renounce violence and dedicate his rule to Buddhist Dhamma?',
          options: ['Gandhara', 'Kalinga', 'Magadha', 'Deccan'],
          correctIndex: 1,
          explanation: 'The horrific loss of life at the Battle of Kalinga led Ashoka to adopt Buddhist principles of non-violence, public healthcare, and tolerance.',
          format: 'mcq'
        },
        {
          id: 'mq3',
          question: 'Which French monarch earned the epithet "The Sun King" and constructed the monumental Palace of Versailles?',
          options: ['Louis XIII', 'Louis XIV', 'Louis XVI', 'Francis I'],
          correctIndex: 1,
          explanation: 'Louis XIV ruled France for an astounding 72 years (1643–1715), centralizing absolute royal governance at Versailles.',
          format: 'mcq'
        },
        {
          id: 'mq4',
          question: 'True or False: Qin Shi Huang, the first Emperor of unified China, standardized Chinese characters, weights, and axle widths across his empire.',
          options: ['True', 'False'],
          correctIndex: 0,
          explanation: 'True! Qin Shi Huang\'s standardization created an enduring administrative unity that bound Chinese civilization together for over two millennia.',
          format: 'tf'
        },
        {
          id: 'mq5',
          question: 'Which English Queen famously addressed her troops at Tilbury and oversaw the defeat of the Spanish Armada in 1588?',
          options: ['Queen Victoria', 'Mary I', 'Queen Anne', 'Elizabeth I'],
          correctIndex: 3,
          explanation: 'Elizabeth I famously declared: "I know I have the body of a weak and feeble woman, but I have the heart and stomach of a king, and of a king of England too."',
          format: 'mcq'
        }
      ]
    }
  ],
  articles: [
    {
      id: 'art_monarchs_statecraft',
      title: 'From Divine Kingship to Bureaucratic Absolutism: The Evolution of Sovereign Power',
      authorsOrSource: 'Comparative Political Science & Royal Historiography',
      category: 'Political Philosophy',
      summary: 'A comparative study of how royal rulers justified their authority across cultures—from the Egyptian Pharaoh as living Horus and the Chinese Mandate of Heaven to European Divine Right of Kings.',
      keyInsights: [
        'Egyptian pharaohs exercised theocratic monopoly where maintaining cosmic balance (Ma\'at) was an existential duty.',
        'The Chinese Mandate of Heaven introduced the revolutionary idea that natural disasters and misrule revoked a dynasty\'s moral right to govern.',
        'Louis XIV transformed feudal aristocracy into court courtiers through Versailles etiquette, stripping nobles of regional private armies.'
      ],
      readTimeMinutes: 16,
      type: 'scholarly_paper',
      citationOrLink: 'https://en.wikipedia.org/wiki/Monarchy'
    },
    {
      id: 'art_ashoka_edicts',
      title: 'The Rock Edicts of Ashoka: Earliest State-Sponsored Human & Animal Welfare',
      authorsOrSource: 'Epigraphia Indica & Oxford Indology Series',
      category: 'Archaeology & Inscriptions',
      summary: 'Examines the monumental rock inscriptions carved across India, Pakistan, and Afghanistan, documenting Ashoka\'s state-mandated hospitals, roadside rest houses, and religious pluralism.',
      keyInsights: [
        'Ashoka established free botanical gardens for medicinal herbs for both humans and animals.',
        'Major Rock Edict XII explicitly forbids criticizing other religious sects, declaring that honoring others strengthens one\'s own faith.',
        'Written in vernacular Prakrit, Greek, and Aramaic scripts to ensure all subjects could read the emperor\'s directives.'
      ],
      readTimeMinutes: 10,
      type: 'encyclopedia_article',
      citationOrLink: 'https://en.wikipedia.org/wiki/Edicts_of_Ashoka'
    }
  ]
};

// ==========================================
// 4. DYNAMIC SYNTHESIS ENGINE
// ==========================================
export function getCuratedContent(
  period: HistoricalPeriod,
  region: HistoricalRegion,
  theme: HistoricalTheme,
  searchQuery: string = ''
): CuratedContentBundle {
  const query = searchQuery.toLowerCase().trim();

  // Check direct preset matches
  if ((theme === 'ancient_rome' || query.includes('rome') || query.includes('roman') || query.includes('caesar')) && period !== 'ww2') {
    return ANCIENT_ROME_BUNDLE;
  }
  if (theme === 'ww2' || period === 'ww2' || query.includes('ww2') || query.includes('world war 2') || query.includes('world war ii')) {
    return WW2_BUNDLE;
  }
  if (theme === 'greatest_monarchs' || query.includes('monarch') || query.includes('emperor') || query.includes('king')) {
    return GREATEST_MONARCHS_BUNDLE;
  }

  // Dynamic Filtering based on selected dimensions
  // 1. Figures and Monarchs
  let matchedMonarchs = MONARCHS.filter((m) => {
    const matchPeriod = period === 'all' || 
      (period === 'ancient' && m.reign.includes('BC')) ||
      (period === 'classical' && (m.region === 'Roman' || m.region === 'Greek')) ||
      (period === 'medieval' && (m.region === 'European' || m.region === 'Indian')) ||
      (period === 'early_modern' && (m.reign.includes('15') || m.reign.includes('16') || m.reign.includes('17'))) ||
      (period === '19th_century' && m.reign.includes('18'));
    
    const matchRegion = region === 'all' ||
      (region === 'mediterranean_rome' && (m.region === 'Roman' || m.region === 'Greek')) ||
      (region === 'middle_east_egypt' && m.region === 'Egyptian') ||
      (region === 'europe' && m.region === 'European') ||
      (region === 'south_asia' && m.region === 'Indian');

    const matchQuery = !query || m.name.toLowerCase().includes(query) || m.title.toLowerCase().includes(query);
    return matchPeriod && matchRegion && matchQuery;
  }).slice(0, 6).map(m => ({
    id: m.id,
    name: m.name,
    title: m.title,
    roleOrEra: m.reign,
    description: m.biography,
    achievements: m.keyAchievements,
    type: 'monarch' as const,
    originRegion: m.region,
    reignOrDates: m.reign
  }));

  // Also include matching historical figures
  let matchedFigures = HISTORICAL_FIGURES.filter(f => {
    const matchQuery = !query || f.name.toLowerCase().includes(query) || f.role.toLowerCase().includes(query);
    return matchQuery;
  }).slice(0, 4).map(f => ({
    id: f.id,
    name: f.name,
    title: f.role,
    roleOrEra: f.era,
    description: f.biography,
    achievements: f.contributions || [],
    type: 'figure' as const,
    originRegion: f.category || 'Historical Thinker',
    reignOrDates: f.birthDeath || f.era
  }));

  const allFigures = [...matchedMonarchs, ...matchedFigures].slice(0, 6);

  // 2. Events
  let matchedEvents = HISTORICAL_EVENTS.filter(e => {
    const matchQuery = !query || e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query);
    return matchQuery;
  }).slice(0, 4).map(e => ({
    id: e.id,
    year: e.year,
    title: e.title,
    description: e.description,
    impact: e.impact || 'Pivotal milestone in regional and global history.',
    category: e.category || 'Historical Turning Point'
  }));

  // 3. Battles
  const periodStr = period as string;
  let matchedBattles = ALL_HISTORICAL_BATTLES.filter(b => {
    const matchPeriod = periodStr === 'all' || 
      (periodStr === 'ancient' && b.era === 'Ancient') ||
      (periodStr === 'classical' && b.era === 'Classical') ||
      (periodStr === 'medieval' && b.era === 'Medieval') ||
      (periodStr === 'early_modern' && b.era === 'Early Modern') ||
      (periodStr === '19th_century' && b.era === '19th Century') ||
      (periodStr === 'ww1_interwar' && b.era === 'World War I') ||
      (periodStr === 'ww2' && b.era === 'World War II') ||
      (periodStr === 'cold_war_modern' && b.era === 'Cold War & Modern');

    const matchRegion = region === 'all' ||
      (region === 'mediterranean_rome' && (b.region === 'Europe' || b.location.toLowerCase().includes('rome') || b.location.toLowerCase().includes('greece'))) ||
      (region === 'middle_east_egypt' && (b.region === 'Middle East' || b.location.toLowerCase().includes('egypt'))) ||
      (region === 'europe' && b.region === 'Europe') ||
      (region === 'east_asia' && b.region === 'East Asia') ||
      (region === 'south_asia' && b.region === 'South Asia') ||
      (region === 'americas' && b.region === 'Americas') ||
      (region === 'africa' && b.region === 'Africa') ||
      (region === 'global' && b.region === 'Global / Naval');

    const matchQuery = !query || b.name.toLowerCase().includes(query) || b.war.toLowerCase().includes(query);
    return matchPeriod && matchRegion && matchQuery;
  }).slice(0, 4).map(b => ({
    id: b.id,
    name: b.name,
    year: b.year,
    war: b.war,
    location: b.location,
    commanders: `${b.commanderA} vs ${b.commanderB}`,
    outcome: b.outcome,
    tacticalSummary: b.tacticalSummary
  }));

  // 4. Artifacts & Monuments
  const matchedArtifacts = ALL_DAILY_ARTIFACTS.slice(0, 2).map(a => ({
    id: a.id,
    name: a.name,
    category: a.category,
    periodYear: a.periodYear,
    locationOrOrigin: `${a.origin} | ${a.currentLocation.museum}`,
    summary: a.biography.slice(0, 240) + '...',
    keyDetail: a.significance.slice(0, 180) + '...',
    type: 'artifact' as const
  }));

  const matchedMonuments = ALL_WORLD_MONUMENTS.slice(0, 2).map(m => ({
    id: m.id,
    name: m.name,
    category: m.category,
    periodYear: m.yearBuilt,
    locationOrOrigin: `${m.location}, ${m.country}`,
    summary: m.historyAndBackground.slice(0, 240) + '...',
    keyDetail: m.architecturalMarvels.slice(0, 180) + '...',
    type: 'monument' as const
  }));

  // 5. Quizzes
  const matchedQuizzes = QUIZZES.slice(0, 2);

  // 6. Articles
  const matchedPapers = ALL_RESEARCH_PAPERS.slice(0, 3).map(p => ({
    id: p.id,
    title: p.title,
    authorsOrSource: p.authors.join(', '),
    category: p.category,
    summary: p.abstract,
    keyInsights: p.keyFindings,
    readTimeMinutes: Math.max(5, Math.round(p.pageCount / 3)),
    type: 'scholarly_paper' as const,
    citationOrLink: p.openAccessUrl || p.wikipediaTopicUrl
  }));

  const periodLabel = PERIOD_OPTIONS.find(p => p.id === period)?.label || 'Selected Period';
  const regionLabel = REGION_OPTIONS.find(r => r.id === region)?.label || 'Selected Region';
  const themeLabel = THEME_OPTIONS.find(t => t.id === theme)?.label || 'Selected Theme';

  return {
    title: `Curated Chronicle: ${themeLabel !== 'All Thematic Disciplines' ? themeLabel : periodLabel}`,
    epochLabel: periodLabel,
    regionLabel: regionLabel,
    themeLabel: themeLabel,
    curatorialBriefing: `This tailored syllabus synthesizes verified historical documents, decisive military engagements, peer-reviewed academic literature, and interactive quiz evaluations. Exploring ${periodLabel.toLowerCase()} across ${regionLabel.toLowerCase()}, this curated collection focuses on the systemic interaction between political leadership, socio-economic developments, and material culture.`,
    historicalSignificance: `Offers a multi-dimensional perspective crossing archaeological artifacts, primary source chronicles, tactical engagements, and historiographical analysis.`,
    keyPillars: [
      'Institutional & Political Power Dynamics',
      'Material Culture & Archaeological Provenance',
      'Tactical Military Engagements & Turning Points',
      'Historiographical Methodology & Academic Inquiry'
    ],
    figuresAndMonarchs: allFigures,
    events: matchedEvents,
    battles: matchedBattles,
    artifactsAndMonuments: [...matchedArtifacts, ...matchedMonuments],
    quizzes: matchedQuizzes,
    articles: matchedPapers
  };
}
