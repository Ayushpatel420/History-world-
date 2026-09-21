import { useState, useMemo, useEffect } from 'react';
import { 
  Award, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  ChevronRight, 
  HelpCircle, 
  Cpu, 
  AlertCircle, 
  Search, 
  Star, 
  Layers, 
  Trophy, 
  BookOpen, 
  Clock, 
  Calendar, 
  Check, 
  X, 
  Shield, 
  Landmark, 
  Compass,
  ArrowLeft,
  PenTool,
  Globe
} from 'lucide-react';
import { Quiz, UserNote, Bookmark } from '../types';
import { QUIZZES } from '../data/historyData';
import { COMPREHENSIVE_QUIZZES } from '../data/comprehensiveQuizzes';
import { trackQuizCompletion } from '../utils/activityTracker';
import { playSound } from '../utils/audio';
import CreateYourOwnQuizView from './CreateYourOwnQuizView';

// Timed Weekly Challenges with premium structures
const WEEKLY_CHALLENGES: Quiz[] = [
  {
    id: "weekly_alexander",
    title: "⚔️ Eastern March: Alexander the Great's Conquests",
    description: "March with the Macedonians past the Indus. Test your tactical knowledge on the Siege of Tyre, Battle of Gaugamela, and his legendary military path.",
    category: "Weekly Challenge",
    difficulty: "Hard",
    questions: [
      {
        id: "w_alex_q1",
        question: "Alexander the Great defeated Darius III of Persia at which battle in 331 BC, opening the gates to Babylon?",
        options: [
          "Battle of Gaugamela",
          "Battle of Granicus",
          "Battle of Issus",
          "Battle of Hydaspes"
        ],
        correctIndex: 0,
        explanation: "The Battle of Gaugamela in 331 BC was the decisive victory that led to the collapse of the Persian Achaemenid Empire.",
        format: "mcq"
      },
      {
        id: "w_alex_q2",
        question: "True or False: Alexander returned from India because his troops staged a peaceful mutiny at the Hyphasis River, refusing to go further east.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Plagued by heavy monsoon rains and exhausted by years of combat, his legions mutinied at Hyphasis (modern Beas River) and forced him to turn southwest.",
        format: "tf"
      },
      {
        id: "w_alex_q3",
        question: "Identify the legendary warhorse of Alexander, which he tamed as a boy when no one else could:",
        options: [
          "Bucephalus",
          "Copenhagen",
          "Marengo",
          "Incitatus"
        ],
        correctIndex: 0,
        explanation: "Bucephalus was Alexander's companion horse. Alexander realized the horse was simply afraid of its own shadow, so he turned its face towards the sun.",
        format: "mcq"
      },
      {
        id: "w_alex_q4",
        question: "Identify the tactical military formation developed by Philip II of Macedon, using massive 18-foot pikes called sarissas, shown in this majestic schematic diagram:",
        options: [
          "The Macedonian Phalanx",
          "The Roman Testudo",
          "The Spartan Shieldwall",
          "The Carthaginian Crescent"
        ],
        correctIndex: 0,
        explanation: "The Macedonian Phalanx equipped infantry with the 18-foot sarissa, holding enemies at a distance while companion cavalry flanked them.",
        format: "image_id",
        imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "w_alex_q5",
        question: "Alexander founded over 20 cities bearing his name, the most famous of which became a beacon of absolute academic light in ancient Egypt.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Alexandria in Egypt, founded in 331 BC, housed the legendary Library of Alexandria and became the center of the Hellenistic intellectual universe.",
        format: "tf"
      }
    ]
  },
  {
    id: "weekly_renaissance",
    title: "🎨 Minds of the Renaissance: Art & Geometry",
    description: "Venture into the workshops of Florence and Milan. Test your history on Leonardo da Vinci, Michelangelo, and Brunelleschi's architectural orbits.",
    category: "Weekly Challenge",
    difficulty: "Medium",
    questions: [
      {
        id: "w_ren_q1",
        question: "Which iconic painter, inventor, and anatomist designed this visionary wooden aerial screw, an early ancestor to the modern helicopter?",
        options: [
          "Leonardo da Vinci",
          "Michelangelo Buonarroti",
          "Raphael Sanzio",
          "Donatello"
        ],
        correctIndex: 0,
        explanation: "Leonardo da Vinci sketched the 'aerial screw' in the late 15th century, hypothesizing that a helical structure could compress air to achieve flight.",
        format: "image_id",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "w_ren_q2",
        question: "True or False: Michelangelo painted the masterpiece ceiling of the Sistine Chapel while lying completely flat on his back.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! Michelangelo actually painted in a standing position, leaning backwards on scaffolding he designed himself, which caused severe neck and back strain.",
        format: "tf"
      },
      {
        id: "w_ren_q3",
        question: "Who engineered the magnificent double-walled masonry dome of the Florence Cathedral (Santa Maria del Fiore), a miracle of Renaissance geometry?",
        options: [
          "Filippo Brunelleschi",
          "Leon Battista Alberti",
          "Donato Bramante",
          "Andrea Palladio"
        ],
        correctIndex: 0,
        explanation: "Brunelleschi constructed the dome without temporary wooden scaffolding, pioneering hoisting machines and herringbone brick-laying patterns.",
        format: "mcq"
      },
      {
        id: "w_ren_q4",
        question: "The powerful Florentine family that acted as the primary financial bankers and patrons of the Renaissance arts was the Medicis.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! The House of Medici funded legendary minds like Cosimo, Lorenzo the Magnificent, Galileo, and Michelangelo, fueling the Renaissance.",
        format: "tf"
      },
      {
        id: "w_ren_q5",
        question: "Which German goldsmith introduced movable type printing to Europe around 1440, creating a massive explosion of scientific and literary access?",
        options: [
          "Johannes Gutenberg",
          "Albrecht Dürer",
          "Martin Luther",
          "Johannes Kepler"
        ],
        correctIndex: 0,
        explanation: "Johannes Gutenberg's printing press catalyzed the Scientific Revolution and the Renaissance by making books affordable for the public.",
        format: "mcq"
      }
    ]
  }
];

// Rich themed arenas categorized by historical interest
const THEMED_QUIZZES: Quiz[] = [
  {
    id: "theme_classical_antiquity",
    title: "🏛️ Golden Aegis: Classical Civilizations",
    description: "Deep dive into Spartan warfare tactics, Athenian legislative councils, Persian Satraps, and Roman Senate constitutions.",
    category: "Themed Quiz: Antiquity",
    difficulty: "Medium",
    questions: [
      {
        id: "th_ant_q1",
        question: "What Athenian statesman directed the rebuilding of the Acropolis and led Athens during its gold-standard golden age?",
        options: [
          "Pericles",
          "Solon",
          "Themistocles",
          "Cleisthenes"
        ],
        correctIndex: 0,
        explanation: "Pericles championed democracy, funded the majestic Parthenon, and consolidated the Delian League during Athens' high classical age.",
        format: "mcq"
      },
      {
        id: "th_ant_q2",
        question: "The Roman Republic was founded in 509 BC after overthrowing its final Etruscan king, Tarquin the Proud.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! The expulsion of Lucius Tarquinius Superbus marked the inception of the consular Roman Senate Republic.",
        format: "tf"
      },
      {
        id: "th_ant_q3",
        question: "Identify the ancient theatre structure shown below, celebrated for its perfect, unamplified mathematical acoustics:",
        options: [
          "The Epidaurus Theatre",
          "The Rome Colosseum",
          "The Circus Maximus",
          "The Alexandria Odeon"
        ],
        correctIndex: 0,
        explanation: "Epidaurus in Greece possesses incredible acoustics. A whisper on the stage can be heard clearly in the highest rows of seats.",
        format: "image_id",
        imageUrl: "https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "th_ant_q4",
        question: "Which legendary strategist led Carthage across the Swiss Alps with military elephants to inflict massive defeats on Rome?",
        options: [
          "Hannibal Barca",
          "Hamilcar Barca",
          "Scipio Africanus",
          "Hasdrubal"
        ],
        correctIndex: 0,
        explanation: "Hannibal crossed the Alps in 218 BC during the Second Punic War, nearly taking Rome after the crushing Battle of Cannae.",
        format: "mcq"
      }
    ]
  },
  {
    id: "theme_medieval_reigns",
    title: "🛡️ Iron Kings: Medieval Dynasties & Feuds",
    description: "Cross swords with Viking raiders, Holy Roman Emperors, Moorish caliphs, and Crusader castle builders.",
    category: "Themed Quiz: Medieval",
    difficulty: "Hard",
    questions: [
      {
        id: "th_med_q1",
        question: "Who was crowned the first Holy Roman Emperor by Pope Leo III on Christmas Day, 800 AD?",
        options: [
          "Charlemagne",
          "Otto I",
          "Frederick Barbarossa",
          "Louis the Pious"
        ],
        correctIndex: 0,
        explanation: "Charlemagne, King of the Franks, was crowned Emperor of the Romans in Rome, solidifying the Carolingian Renaissance.",
        format: "mcq"
      },
      {
        id: "th_med_q2",
        question: "The historic Magna Carta was signed by King John in 1215 at Runnymede to limit royal overreach and establish legal trials.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! King John was forced by rebel barons to agree to the charter, which laid the first stones of constitutional law.",
        format: "tf"
      },
      {
        id: "th_med_q3",
        question: "Which brilliant Kurdish founder of the Ayyubid Dynasty captured Jerusalem from the Crusaders in 1187 and was praised for his military chivalry?",
        options: [
          "Saladin (Salah al-Din)",
          "Baibars",
          "Al-Kamil",
          "Harun al-Rashid"
        ],
        correctIndex: 0,
        explanation: "Saladin defeated Crusader armies at Hattin and retook Jerusalem, praised for his generous treatment of Christian citizens.",
        format: "mcq"
      },
      {
        id: "th_med_q4",
        question: "Identify the imposing fortress centerpiece shown below, constructed in Syria to guard valleys near Homs:",
        options: [
          "Krak des Chevaliers",
          "The Tower of London",
          "Castel del Monte",
          "Alhambra Palace"
        ],
        correctIndex: 0,
        explanation: "Krak des Chevaliers is one of the absolute masterpieces of medieval defensive architecture, serving as a Crusader stronghold.",
        format: "image_id",
        imageUrl: "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?auto=format&fit=crop&w=700&q=80"
      }
    ]
  },
  {
    id: "theme_revolutions_modern",
    title: "🗽 Powder Keg: Age of Revolutions",
    description: "Venture through the intellectual enlightenment, the Bastille riots, and declarations of sovereign independence.",
    category: "Themed Quiz: Revolutions",
    difficulty: "Medium",
    questions: [
      {
        id: "th_rev_q1",
        question: "What French monarch was executed by guillotine during the high tide of the French Revolution in 1793?",
        options: [
          "Louis XVI",
          "Louis XIV",
          "Louis XV",
          "Napoleon Bonaparte"
        ],
        correctIndex: 0,
        explanation: "Louis XVI was convicted of high treason and executed by guillotine on January 21, 1793, at the Place de la Révolution.",
        format: "mcq"
      },
      {
        id: "th_rev_q2",
        question: "True or False: The United States Declaration of Independence was universally drafted and signed on July 4, 1776.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! The Congress approved the wording on July 4, but the actual physical document was primarily signed on August 2, 1776.",
        format: "tf"
      },
      {
        id: "th_rev_q3",
        question: "Identify the prominent military mastermind who seized control of France via the Coup of 18 Brumaire:",
        options: [
          "Napoleon Bonaparte",
          "Maximilien Robespierre",
          "Marquis de Lafayette",
          "Georges Danton"
        ],
        correctIndex: 0,
        explanation: "Napoleon Bonaparte overthrew the French Directory in 1799, establishing the French Consulate and eventually crowning himself Emperor.",
        format: "mcq"
      }
    ]
  }
];

const PREMIUM_CORE_QUIZZES: Quiz[] = [
  {
    id: "core_quiz_kings_queens",
    title: "👑 Crowns & Dynasties: Mighty Kings and Queens",
    description: "Test your historical knowledge on monarchs, empresses, and leaders who sat upon the ultimate seats of power in ancient and modern times.",
    category: "Kings & Queens",
    difficulty: "Medium",
    questions: [
      {
        id: "kq_q1",
        question: "Queen Elizabeth I of England was the final monarch of the Tudor Dynasty.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Having died without direct heirs in 1603, Queen Elizabeth I's death marked the end of the Tudor line, leading to the ascension of James I and the Stuart dynasty.",
        format: "tf"
      },
      {
        id: "kq_q2",
        question: "Which of these pharaohs was known as the 'Napoleon of Egypt' for expanding Egypt's empire to its maximum historical extent?",
        options: [
          "Thutmose III",
          "Akhenaten",
          "Tutankhamun",
          "Pepy II"
        ],
        correctIndex: 0,
        explanation: "Thutmose III reigned as pharaoh during the 18th dynasty and conducted 17 military campaigns, earning fame for his unparalleled strategic legacy.",
        format: "mcq"
      },
      {
        id: "kq_q3",
        question: "Identify the absolute monarch associated with this masterpiece of royal architecture, designed to project absolute solar authority:",
        options: [
          "Louis XIV of France",
          "Peter the Great of Russia",
          "Suleiman the Magnificent",
          "Philip II of Spain"
        ],
        correctIndex: 0,
        explanation: "Louis XIV, the 'Sun King', built the sprawling Palace of Versailles in France to project absolute divine monarchical dominance.",
        format: "image_id",
        imageUrl: "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=700&q=80"
      }
    ]
  },
  {
    id: "core_quiz_historical_figures",
    title: "🧘 Architects of Epochs: Famous Historical Figures",
    description: "Venture deep into the lives, minds, and philosophies of history's most notable thinkers, revolutionaries, generals, and saints.",
    category: "Historical Figures",
    difficulty: "Hard",
    questions: [
      {
        id: "hf_q1",
        question: "Philosopher Socrates wrote down many voluminous volumes, preserving his Athenian Socratic dialogues so that they survive word-for-word.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! Socrates wrote down nothing; his entire life, dialogues, and philosophical lessons were documented by his brilliant disciples, Plato and Xenophon.",
        format: "tf"
      },
      {
        id: "hf_q2",
        question: "Identify the classical philosopher depicted in this legendary painting of the School of Athens, pointing to the sky to emphasize the world of ideas:",
        options: [
          "Plato",
          "Aristotle",
          "Diogenes",
          "Epicurus"
        ],
        correctIndex: 0,
        explanation: "Plato is depicted pointing upwards towards the heavens representing his Theory of Forms, whereas Aristotle gestured downwards to the earthly world of physical observation.",
        format: "image_id",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "hf_q3",
        question: "Which of these women was an astronomer, mathematician, and philosopher who led the Neoplatonic school in Alexandria?",
        options: [
          "Hypatia",
          "Cleopatra",
          "Aspasia",
          "Enheduanna"
        ],
        correctIndex: 0,
        explanation: "Hypatia of Alexandria was a highly esteemed intellectual and counselor before her highly tragic execution by sectarian state mobs in 415 AD.",
        format: "mcq"
      }
    ]
  },
  {
    id: "core_quiz_countries_geopolitics",
    title: "🗺️ Global Realms: Geopolitics & Nations",
    description: "Rise and fall of world-dominant empires, nations, and trade channels that shaped our modern geopolitical map.",
    category: "Countries & Empires",
    difficulty: "Easy",
    questions: [
      {
        id: "cg_q1",
        question: "Which supreme trading empire controlled Carthage and pioneered the first extensive alphabet across the Mediterranean shores?",
        options: [
          "The Phoenician Empire",
          "The Hittite Empire",
          "The Minoan Civilization",
          "The Akkadian Empire"
        ],
        correctIndex: 0,
        explanation: "The Phoenicians were maritime traders who founded Carthage and dispersed phonetic scripts, which evolved into Greek and Latin scripts.",
        format: "mcq"
      },
      {
        id: "cg_q2",
        question: "Identify the ancient defense barrier of this historical country from its breathtaking view from above:",
        options: [
          "The Great Wall of China",
          "Hadrian's Wall",
          "The Berlin Wall",
          "The Persian Royal Road"
        ],
        correctIndex: 0,
        explanation: "The Great Wall of China was constructed to shield dynastic borders from nomadic incursions across consecutive dynasties.",
        format: "image_id",
        imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "cg_q3",
        question: "The Ottoman Empire captured the city of Constantinople in the historic year of 1453.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Mehmed II captured Constantinople in 1453, ending the Byzantine Empire and heralding the early modern age of Ottoman expansion.",
        format: "tf"
      }
    ]
  }
];

export interface QuizSectionProps {
  notes?: UserNote[];
  bookmarks?: Bookmark[];
  onNavigateToTab?: (tab: any) => void;
}

export default function QuizSection({
  notes = [],
  bookmarks = [],
  onNavigateToTab
}: QuizSectionProps = {}) {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Subtabs Navigation in the Quiz Center
  const [activeTab, setActiveTab] = useState<'campaigns' | 'daily' | 'weekly' | 'themed' | 'custom' | 'create_own'>('daily');

  // Daily Challenge State
  const [dailyDifficulty, setDailyDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [dailyCompleted, setDailyCompleted] = useState<Record<string, { score: number; completedAt: string }>>(() => {
    try {
      const saved = localStorage.getItem('history_coliseum_daily_cleared_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isGeneratingDaily, setIsGeneratingDaily] = useState<boolean>(false);
  const [dailyGenerationError, setDailyGenerationError] = useState<string | null>(null);

  // Pool of pre-defined Daily Challenges (providing full offline reliability)
  const DAILY_QUIZZES_POOL = useMemo<Record<'Easy' | 'Medium' | 'Hard', Quiz[]>>(() => ({
    Easy: [
      {
        id: "daily_easy_1",
        title: "🏛️ Cradle of Civilizations (Daily Challenge)",
        description: "Explore the legendary rivers, ancient scripts, and foundational codes of early humanity.",
        category: "Daily Challenge",
        difficulty: "Easy",
        questions: [
          {
            id: "de_1_q1",
            question: "Which river was critical to the development of the ancient Egyptian civilization?",
            options: ["Euphrates", "Tigris", "Nile", "Indus"],
            correctIndex: 2,
            explanation: "The Nile River flooded predictably each year, leaving rich soil (kemet) that allowed agriculture and civilization to flourish.",
            format: "mcq"
          },
          {
            id: "de_1_q2",
            question: "What is the earliest known writing system, developed by the Sumerians of Mesopotamia?",
            options: ["Hieroglyphs", "Cuneiform", "Sanskrit", "Phoenician alphabet"],
            correctIndex: 1,
            explanation: "Cuneiform, written with wedge-shaped marks on clay tablets, emerged in Sumer in the late 4th millennium BCE.",
            format: "mcq"
          },
          {
            id: "de_1_q3",
            question: "The Code of Hammurabi, one of the oldest deciphered writings of significant length in the world, was written by a king of which empire?",
            options: ["Assyrian", "Babylonian", "Persian", "Roman"],
            correctIndex: 1,
            explanation: "Hammurabi was the sixth king of the First Babylonian Dynasty, famous for drafting this law code around 1750 BCE.",
            format: "mcq"
          }
        ]
      },
      {
        id: "daily_easy_2",
        title: "🛡️ Rulers & Empires (Daily Challenge)",
        description: "Test your knowledge on the famous leaders who forged the first grand empires of antiquity.",
        category: "Daily Challenge",
        difficulty: "Easy",
        questions: [
          {
            id: "de_2_q1",
            question: "Who was the first official Emperor of the Roman Empire, ruling from 27 BCE until his death in 14 CE?",
            options: ["Julius Caesar", "Augustus", "Nero", "Marcus Aurelius"],
            correctIndex: 1,
            explanation: "Born Octavian, Augustus became the first official Roman Emperor, ending the Roman Republic and initiating the Pax Romana.",
            format: "mcq"
          },
          {
            id: "de_2_q2",
            question: "Which famous Macedonian king created one of the largest empires in the ancient world by the age of thirty?",
            options: ["Philip II", "Alexander the Great", "Pericles", "Cyrus the Great"],
            correctIndex: 1,
            explanation: "Alexander III of Macedon conquered Persia, Egypt, and reached India, spreading Hellenistic culture across three continents.",
            format: "mcq"
          },
          {
            id: "de_2_q3",
            question: "Who was the legendary female Pharaoh who reigned over Egypt for over two decades and wore a ceremonial false beard?",
            options: ["Nefertiti", "Hatshepsut", "Cleopatra VII", "Sobekneferu"],
            correctIndex: 1,
            explanation: "Hatshepsut was one of Egypt's most successful pharaohs, famous for her extensive trade networks and magnificent temple at Deir el-Bahari.",
            format: "mcq"
          }
        ]
      },
      {
        id: "daily_easy_3",
        title: "🧭 Winds of Change (Daily Challenge)",
        description: "Discover the critical inventions and maritime explorers that reshaped the globe.",
        category: "Daily Challenge",
        difficulty: "Easy",
        questions: [
          {
            id: "de_3_q1",
            question: "The Gutenberg press, which revolutionized book printing in Europe, was invented in which century?",
            options: ["12th Century", "15th Century", "17th Century", "19th Century"],
            correctIndex: 1,
            explanation: "Johannes Gutenberg introduced movable type printing to Europe around 1440, launching the Printing Revolution.",
            format: "mcq"
          },
          {
            id: "de_3_q2",
            question: "Which Italian explorer's 1492 voyage across the Atlantic Ocean opened the way for widespread European exploration of the Americas?",
            options: ["Marco Polo", "Christopher Columbus", "Amerigo Vespucci", "Ferdinand Magellan"],
            correctIndex: 1,
            explanation: "Columbus's expedition on behalf of Spain landed in the Bahamas in 1492, initiating the Columbian Exchange.",
            format: "mcq"
          },
          {
            id: "de_3_q3",
            question: "What major international peace treaty was signed in 1919, officially ending World War I?",
            options: ["Treaty of Westphalia", "Treaty of Versailles", "Treaty of Ghent", "Treaty of Utrecht"],
            correctIndex: 1,
            explanation: "The Treaty of Versailles was signed on June 28, 1919, in the Hall of Mirrors at the Palace of Versailles.",
            format: "mcq"
          }
        ]
      }
    ],
    Medium: [
      {
        id: "daily_medium_1",
        title: "⚔️ Classical Hegemons (Daily Challenge)",
        description: "Test your knowledge of the Greco-Persian wars, Qin statecraft, and Carthage's rise.",
        category: "Daily Challenge",
        difficulty: "Medium",
        questions: [
          {
            id: "dm_1_q1",
            question: "Which battle in 490 BCE saw the heavily outnumbered Athenian hoplites defeat the first Persian invasion of Greece?",
            options: ["Battle of Thermopylae", "Battle of Marathon", "Battle of Salamis", "Battle of Plataea"],
            correctIndex: 1,
            explanation: "The Athenian victory at Marathon ended the first Persian invasion under Darius I and inspired the famous legendary run of Pheidippides.",
            format: "mcq"
          },
          {
            id: "dm_1_q2",
            question: "Which Chinese dynasty built the initial connected fortifications of the Great Wall of China and standardized weights?",
            options: ["Han Dynasty", "Qin Dynasty", "Tang Dynasty", "Song Dynasty"],
            correctIndex: 1,
            explanation: "Qin Shi Huang, the first emperor of a unified China, oversaw the unification of early defensive walls into the Great Wall of China around 221 BCE.",
            format: "mcq"
          },
          {
            id: "dm_1_q3",
            question: "The Punic Wars were a series of three devastating conflicts fought between Rome and which rival Mediterranean power?",
            options: ["Carthage", "Sparta", "Macedonia", "Seleucid Empire"],
            correctIndex: 0,
            explanation: "Fought between 264 BCE and 146 BCE, the Punic Wars ended with the complete destruction of Carthage and Roman dominance of the Western Mediterranean.",
            format: "mcq"
          }
        ]
      },
      {
        id: "daily_medium_2",
        title: "🕌 Medieval Golden Ages (Daily Challenge)",
        description: "Journey through the scientific breakthroughs of the Caliphates and Viking exploration routes.",
        category: "Daily Challenge",
        difficulty: "Medium",
        questions: [
          {
            id: "dm_2_q1",
            question: "Which Islamic Caliphate oversaw the 'Islamic Golden Age,' establishing the House of Wisdom in Baghdad?",
            options: ["Umayyad Caliphate", "Abbasid Caliphate", "Fatimid Caliphate", "Ottoman Caliphate"],
            correctIndex: 1,
            explanation: "The Abbasids overthrew the Umayyads in 750 CE, shifting the capital to Baghdad, which became a global center of science and philosophy.",
            format: "mcq"
          },
          {
            id: "dm_2_q2",
            question: "Which Norse explorer is widely believed to have reached North America roughly 500 years before Christopher Columbus?",
            options: ["Erik the Red", "Leif Erikson", "Ragnar Lothbrok", "Harald Hardrada"],
            correctIndex: 1,
            explanation: "Leif Erikson established a Norse settlement at L'Anse aux Meadows in modern Newfoundland, Canada, around 1000 CE.",
            format: "mcq"
          },
          {
            id: "dm_2_q3",
            question: "What magnificent Byzantine cathedral, famous for its massive dome, was built in Constantinople under Emperor Justinian I?",
            options: ["Hagia Sophia", "St. Peter's Basilica", "Notre-Dame", "St. Basil's Cathedral"],
            correctIndex: 0,
            explanation: "Constructed in 537 CE, the Hagia Sophia was the world's largest cathedral for nearly a thousand years and a masterpiece of Byzantine engineering.",
            format: "mcq"
          }
        ]
      },
      {
        id: "daily_medium_3",
        title: "⚙️ Tactical Revolutions (Daily Challenge)",
        description: "Examine the fall of old capitals, new religious reformations, and Scientific Inquisition struggles.",
        category: "Daily Challenge",
        difficulty: "Medium",
        questions: [
          {
            id: "dm_3_q1",
            question: "The fall of which historic capital city in 1453 is often used by historians to mark the end of the Middle Ages?",
            options: ["Rome", "Constantinople", "Alexandria", "Jerusalem"],
            correctIndex: 1,
            explanation: "The conquest of Constantinople by Ottoman Sultan Mehmed II in 1453 collapsed the Byzantine Empire and spurred the European Renaissance.",
            format: "mcq"
          },
          {
            id: "dm_3_q2",
            question: "Who sparked the Protestant Reformation in 1517 by nailing his Ninety-Five Theses to the Wittenberg Castle church door?",
            options: ["John Calvin", "Martin Luther", "Henry VIII", "Erasmus"],
            correctIndex: 1,
            explanation: "Martin Luther's theses questioned the sale of indulgences, dividing Western Christianity and reshaping European politics.",
            format: "mcq"
          },
          {
            id: "dm_3_q3",
            question: "Which scientific pioneer was placed under house arrest by the Roman Inquisition in 1633 for defending heliocentrism?",
            options: ["Nicolaus Copernicus", "Johannes Kepler", "Galileo Galilei", "Isaac Newton"],
            correctIndex: 2,
            explanation: "Galileo was tried for heresy by the Inquisition for advocating that the Earth revolves around the Sun, a model pioneered by Copernicus.",
            format: "mcq"
          }
        ]
      }
    ],
    Hard: [
      {
        id: "daily_hard_1",
        title: "🦁 Ancient Spheres & Scholars (Daily Challenge)",
        description: "Master the rise of rebel warrior queens, the greatest bronze chariot clashes, and deep philosophies.",
        category: "Daily Challenge",
        difficulty: "Hard",
        questions: [
          {
            id: "dh_1_q1",
            question: "Who was the famous Queen of Palmyra who defied the Roman Empire and conquered Egypt in 270 CE?",
            options: ["Cleopatra VII", "Boudica", "Zenobia", "Shammuramat"],
            correctIndex: 2,
            explanation: "Queen Septimia Zenobia of Palmyra expanded her kingdom into an empire, seizing Rome's eastern provinces before Aurelian re-annexed them.",
            format: "mcq"
          },
          {
            id: "dh_1_q2",
            question: "The Battle of Kadesh in 1274 BCE, famous for being the largest chariot battle ever recorded, was fought between which two empires?",
            options: ["Egypt and Assyria", "Egypt and the Hittite Empire", "Babylon and Assyria", "Persia and Greece"],
            correctIndex: 1,
            explanation: "Fought between Ramses II of Egypt and Muwatalli II of the Hittites, it led to the world's oldest surviving written international peace treaty.",
            format: "mcq"
          },
          {
            id: "dh_1_q3",
            question: "Which ancient Greek philosopher was a student of Socrates, founded the Academy, and wrote the dialogue 'The Republic'?",
            options: ["Aristotle", "Plato", "Epicurus", "Zeno of Citium"],
            correctIndex: 1,
            explanation: "Plato recorded Socrates' philosophical debates and established the Academy in Athens, the Western world's first institution of higher learning.",
            format: "mcq"
          }
        ]
      },
      {
        id: "daily_hard_2",
        title: "📜 Diplomats & Dynasties (Daily Challenge)",
        description: "An elite exploration of sovereign statecraft, legal corpus compositions, and tolerant emperors.",
        category: "Daily Challenge",
        difficulty: "Hard",
        questions: [
          {
            id: "dh_2_q1",
            question: "The Peace of Westphalia in 1648, which established the concept of state sovereignty, ended which major European conflict?",
            options: ["Hundred Years' War", "Thirty Years' War", "War of the Spanish Succession", "Seven Years' War"],
            correctIndex: 1,
            explanation: "The treaties of Westphalia ended the Thirty Years' War (1618–1648), establishing the modern international system of sovereign nation-states.",
            format: "mcq"
          },
          {
            id: "dh_2_q2",
            question: "Which Byzantine emperor compiled the 'Corpus Juris Civilis', a monumental codification of Roman law?",
            options: ["Constantine the Great", "Justinian I", "Heraclius", "Basil II"],
            correctIndex: 1,
            explanation: "Justinian's legal code, completed in 534 CE, reorganized centuries of Roman law into a cohesive, enduring system of jurisprudence.",
            format: "mcq"
          },
          {
            id: "dh_2_q3",
            question: "Which Mughal Emperor was famous for his policy of religious tolerance, establishing the syncretic 'Din-i Ilahi'?",
            options: ["Babur", "Akbar the Great", "Shah Jahan", "Aurangzeb"],
            correctIndex: 1,
            explanation: "Akbar reigned from 1556 to 1605, creating a syncretic religion that blended elements of Islam, Hinduism, Zoroastrianism, and Christianity.",
            format: "mcq"
          }
        ]
      },
      {
        id: "daily_hard_3",
        title: "🌍 Global Cataclysms (Daily Challenge)",
        description: "Challenge your memory on post-Ottoman partitioning agreements, Japanese restoration dates, and Napoleon's maps.",
        category: "Daily Challenge",
        difficulty: "Hard",
        questions: [
          {
            id: "dh_3_q1",
            question: "What was the name of the secret military agreement signed in 1916 that divided the Arab provinces of the Ottoman Empire into British and French spheres?",
            options: ["Balfour Declaration", "Sykes-Picot Agreement", "Treaty of Sèvres", "Locarno Treaties"],
            correctIndex: 1,
            explanation: "The Sykes-Picot Agreement partitioned the Middle East, drawing modern boundaries that continue to influence regional geopolitics.",
            format: "mcq"
          },
          {
            id: "dh_3_q2",
            question: "The Meiji Restoration, which accelerated Japan's rapid modernization and industrialization, began in which year?",
            options: ["1853", "1868", "1895", "1912"],
            correctIndex: 1,
            explanation: "In 1868, Emperor Meiji was restored to nominal supreme power, ending the Tokugawa Shogunate and opening Japan to Western technology.",
            format: "mcq"
          },
          {
            id: "dh_3_q3",
            question: "Which historic international assembly met in 1814-1815 to redraw the political map of Europe after the defeat of Napoleon?",
            options: ["Congress of Vienna", "Treaty of Utrecht", "Congress of Berlin", "Treaty of Paris"],
            correctIndex: 0,
            explanation: "Chaired by Klemens von Metternich, the Congress of Vienna established a balance of power in Europe that prevented general wars for nearly a century.",
            format: "mcq"
          }
        ]
      }
    ]
  }), []);

  // Helpers to get current date info and stable daily challenge
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTodayQuiz = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    const pool = DAILY_QUIZZES_POOL[difficulty];
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % pool.length;
    return pool[index];
  };

  const handleGenerateAIDailyChallenge = async () => {
    setIsGeneratingDaily(true);
    setDailyGenerationError(null);
    playSound('click');

    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const HISTORIC_TODAY_TOPICS = [
      "The Roman Colosseum Gladiatorial Contests",
      "The Library of Alexandria Scribes and Scholars",
      "The Siege of Constantinople 1453 Siege Engines",
      "The Space Race: Apollo 11 moon landing",
      "The Code of Hammurabi Babylonian justice",
      "The Construction of the Great Wall of China",
      "The Journeys of Marco Polo along the Silk Road",
      "The Discovery of Tutankhamun's Tomb in Egypt",
      "The Viking Voyages to Vinland and Leif Erikson",
      "The Renaissance masters: Leonardo da Vinci",
      "The signing of the Magna Carta in 1215",
      "The Battle of Thermopylae Spartan stand",
      "The Meiji Restoration and Samurai transitions",
      "The Golden Age of Baghdad House of Wisdom",
      "The French Revolution storming of the Bastille",
      "The building of the Taj Mahal Mughal wealth",
      "The Mayan Civilization astronomy and calendars"
    ];
    
    const topicIdx = dayOfYear % HISTORIC_TODAY_TOPICS.length;
    const topic = HISTORIC_TODAY_TOPICS[topicIdx];

    try {
      const response = await fetch('/api/gemini/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty: dailyDifficulty }),
      });

      if (!response.ok) {
        throw new Error('Historical quiz generator failed to communicate with server.');
      }

      const generatedData = await response.json();
      
      const newCustomDailyQuiz: Quiz = {
        id: `daily_custom_${Date.now()}`,
        title: `📅 ${generatedData.title || `Daily AI ${dailyDifficulty} Challenge`}`,
        description: generatedData.description || `Special Daily AI Challenge on ${topic}`,
        category: "Daily Challenge",
        difficulty: dailyDifficulty,
        questions: (generatedData.questions || []).map((q: any, i: number) => ({
          id: `dcq_${i}`,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation
        }))
      };

      if (!newCustomDailyQuiz.questions || newCustomDailyQuiz.questions.length === 0) {
        throw new Error('AI produced invalid quiz data structure.');
      }

      startQuiz(newCustomDailyQuiz);
    } catch (err: any) {
      console.error(err);
      setDailyGenerationError(err.message || 'Error occurred. Please verify your Gemini API key in settings.');
    } finally {
      setIsGeneratingDaily(false);
    }
  };

  // Personal High Scores Tracker State
  const [highScores, setHighScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('history_coliseum_high_scores_v3');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Timed Weekly Challenge variables
  const [weeklyCompleted, setWeeklyCompleted] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('history_coliseum_weekly_cleared');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Simulated High Score posting states
  const [submitHighScoreStatus, setSubmitHighScoreStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Custom smart quiz generation
  const [customTopic, setCustomTopic] = useState<string>('');
  const [customDifficulty, setCustomDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [quizzesList, setQuizzesList] = useState<Quiz[]>(() => {
    return [...COMPREHENSIVE_QUIZZES, ...PREMIUM_CORE_QUIZZES, ...QUIZZES];
  });

  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem('history_coliseum_username') || 'HistoryChallenger';
  });
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);

  // RPG Leveling & EXP Persistent Engine
  const [userExp, setUserExp] = useState<number>(() => {
    const saved = localStorage.getItem('history_coliseum_exp_v2');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lastEarnedExp, setLastEarnedExp] = useState<number>(0);
  const [showLevelUpAlert, setShowLevelUpAlert] = useState<boolean>(false);

  // Comprehensive Topic & Question Format Navigator Filters
  const [topicFilter, setTopicFilter] = useState<'all' | 'ancient' | 'modern' | 'regions' | 'figures' | 'events'>('all');
  const [formatFilter, setFormatFilter] = useState<'all' | 'mcq' | 'tf'>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [userAnswersHistory, setUserAnswersHistory] = useState<Array<{ question: any; selectedIdx: number; isCorrect: boolean }>>([]);
  const [showAnswerReview, setShowAnswerReview] = useState<boolean>(false);

  // Filter & Pagination States for campaigns
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Active Leaderboard Tab
  const [leaderboardTab, setLeaderboardTab] = useState<'standing' | 'rival_ticker'>('standing');

  const levelData = useMemo(() => {
    const expNeededPerLevel = 500;
    const currentLvl = Math.floor(userExp / expNeededPerLevel) + 1;
    const currentLvlExp = userExp % expNeededPerLevel;
    const percent = (currentLvlExp / expNeededPerLevel) * 100;
    return { level: currentLvl, currentLvlExp, neededExp: expNeededPerLevel, percent };
  }, [userExp]);

  const levelRank = useMemo(() => {
    const lvl = levelData.level;
    if (lvl >= 30) return { title: 'High Priest of Alexandria 🏛', color: 'text-[#D4AF37]', border: 'border-[#D4AF37]' };
    if (lvl >= 18) return { title: 'Grand Imperial Centurion 🛡', color: 'text-amber-400', border: 'border-amber-400/50' };
    if (lvl >= 10) return { title: 'Palace Archon 📜', color: 'text-[#E5C158]', border: 'border-[#E5C158]/40' };
    if (lvl >= 4) return { title: 'Royal Archivist Disciple ✍️', color: 'text-[#A09890]', border: 'border-[#2A2A2A]' };
    return { title: 'Beginner History Neophyte 📜', color: 'text-[#A09890]', border: 'border-[#1A1A1A]' };
  }, [levelData]);

  const leaderboardUsers = useMemo(() => {
    // Dynamically insert user inside real standings list sorted by true EXP
    const baseList = [
      { name: 'Hypatia of Alexandria 🪐', exp: 4250, rank: 'High Priest of Alexandria 🏛' },
      { name: 'Edward Gibbon 📜', exp: 3100, rank: 'Grand Imperial Centurion 🛡' },
      { name: 'Herodotus of Halicarnassus 🏛️', exp: 2400, rank: 'Grand Imperial Centurion 🛡' },
      { name: 'Ibn Khaldun 🏺', exp: 1800, rank: 'Palace Archon 📜' },
      { name: 'Sima Qian 🐉', exp: 1250, rank: 'Palace Archon 📜' },
      { name: `${username} (You) ⭐`, exp: userExp, rank: levelRank.title, isUser: true },
      { name: 'Hypatia Disciple 📐', exp: 450, rank: 'Beginner History Neophyte 📜' },
      { name: 'Scribe Apprentice ✍️', exp: 150, rank: 'Beginner History Neophyte 📜' }
    ];
    return baseList.sort((a, b) => b.exp - a.exp);
  }, [username, userExp, levelRank]);

  // Rolling ticker of simulated actual rival submissions
  const [rivalActivity, setRivalActivity] = useState<Array<{ name: string; feat: string; score: string; ago: string }>>([
    { name: "Sima Qian 🐉", feat: "completed Weekly Challenge 'Alexander Conquests'", score: "5/5 (Perfect)", ago: "3m ago" },
    { name: "Herodotus of Halicarnassus 🏛️", feat: "answered sovereign structures question", score: "Correct (+100 XP)", ago: "8m ago" },
    { name: "Ibn Khaldun 🏺", feat: "cleared Moorish Dynasties themed arena", score: "3/4 (Bronze)", ago: "18m ago" },
    { name: "Edward Gibbon 📜", feat: "completed Renaissance masterpieces", score: "4/5 (Silver)", ago: "35m ago" }
  ]);

  // Append new randomized actions to the ribal board simulation to bring compare experience to life!
  useEffect(() => {
    const handleInterval = setInterval(() => {
      const historicalGuildUsers = [
        "Plato 🏺", "Socrates 🧘", "Julius Caesar 🗡", "Cleopatra VII 👑", 
        "Alexander the Great ⚔️", "Eratosthenes 📐", "Homer 📜", "Zenobia 🛡️"
      ];
      const feats = [
        "conquered 'Crowns & Dynasties'",
        "completed 'Classical Civilizations'",
        "unlocked a brand-new Scribe level",
        "submitted score to Alexandria Archives",
        "failed to answer Socrates' paradox question",
        "earned the 'High Emperor' achievement"
      ];
      const scores = ["4/4 (Perfect!)", "3/4 (Silver)", "Correct (+100 XP)", "Perfect score", "Level upgraded!", "Locked (+0 XP)"];
      
      const randomUser = historicalGuildUsers[Math.floor(Math.random() * historicalGuildUsers.length)];
      const randomFeat = feats[Math.floor(Math.random() * feats.length)];
      const randomScore = scores[Math.floor(Math.random() * scores.length)];

      setRivalActivity(prev => [
        { name: randomUser, feat: randomFeat, score: randomScore, ago: "Just now" },
        ...prev.slice(0, 5)
      ]);
    }, 45000); // every 45 secs

    return () => clearInterval(handleInterval);
  }, []);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setHasSubmitted(false);
    setScore(0);
    setIsCompleted(false);
    setLastEarnedExp(0);
    setSubmitHighScoreStatus('idle');
    setUserAnswersHistory([]);
    setShowAnswerReview(false);
    playSound('click');
  };

  const handleOptionSelect = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOptionIdx(idx);
    playSound('click');
  };

  const handleAnswerSubmit = () => {
    if (selectedOptionIdx === null || hasSubmitted) return;
    
    setHasSubmitted(true);
    const currentQ = activeQuiz!.questions[currentQuestionIdx];
    const correct = currentQ.correctIndex;
    const isCorrect = selectedOptionIdx === correct;

    setUserAnswersHistory(prev => [
      ...prev,
      {
        question: currentQ,
        selectedIdx: selectedOptionIdx,
        isCorrect
      }
    ]);
    
    if (isCorrect) {
      playSound('correct');
      setScore(prevScore => prevScore + 1);
      
      // Award 100 EXP immediately for correct trivia!
      const oldLvl = Math.floor(userExp / 500) + 1;
      const rewardAmt = 100;
      const nextExp = userExp + rewardAmt;
      
      setUserExp(nextExp);
      localStorage.setItem('history_coliseum_exp_v2', nextExp.toString());
      setLastEarnedExp(prev => prev + rewardAmt);

      if (Math.floor(nextExp / 500) + 1 > oldLvl) {
        setShowLevelUpAlert(true);
      }
    } else {
      playSound('incorrect');
    }
  };

  const handleNextQuestion = () => {
    playSound('click');
    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx < activeQuiz!.questions.length) {
      setCurrentQuestionIdx(nextIdx);
      setSelectedOptionIdx(null);
      setHasSubmitted(false);
    } else {
      setIsCompleted(true);
      
      // Log globally through base tracking metrics
      trackQuizCompletion({
        quizId: activeQuiz!.id,
        title: activeQuiz!.title,
        category: activeQuiz!.category,
        score: score,
        totalQuestions: activeQuiz!.questions.length,
        difficulty: activeQuiz!.difficulty
      });

      // Calculate new High Score
      const previousBest = highScores[activeQuiz!.id] || 0;
      const hasPerfectScore = score === activeQuiz!.questions.length;
      
      if (score > previousBest) {
        const updatedScores = { ...highScores, [activeQuiz!.id]: score };
        setHighScores(updatedScores);
        localStorage.setItem('history_coliseum_high_scores_v3', JSON.stringify(updatedScores));
      }

      // Mark timings if Weekly timed challenge
      const isWeekly = WEEKLY_CHALLENGES.some(wq => wq.id === activeQuiz!.id);
      if (isWeekly && score >= 3) {
        const updatedWeekly = { ...weeklyCompleted, [activeQuiz!.id]: true };
        setWeeklyCompleted(updatedWeekly);
        localStorage.setItem('history_coliseum_weekly_cleared', JSON.stringify(updatedWeekly));
      }

      // Track if it's a Daily Challenge
      const isDaily = activeQuiz!.category === 'Daily Challenge' || activeQuiz!.id.startsWith('daily_');
      if (isDaily) {
        const dateKey = getTodayDateString() + '_' + activeQuiz!.difficulty;
        const updatedDaily = {
          ...dailyCompleted,
          [dateKey]: {
            score: score,
            completedAt: new Date().toLocaleDateString()
          }
        };
        setDailyCompleted(updatedDaily);
        localStorage.setItem('history_coliseum_daily_cleared_v2', JSON.stringify(updatedDaily));
      }
      
      // Apply finish campaign bonus EXP based on correctness (up to 200 XP)!
      const pctCorrection = score / activeQuiz!.questions.length;
      let campaignBonusExp = Math.round(pctCorrection * 200);

      // Perfect Score Bonus if 100% correct!
      if (hasPerfectScore) {
        campaignBonusExp += 100;
      }

      // Daily Challenge extra Completion Bonus!
      if (isDaily) {
        campaignBonusExp += 50;
      }
      
      if (campaignBonusExp > 0) {
        const oldLvl = Math.floor(userExp / 500) + 1;
        const nextExp = userExp + campaignBonusExp;
        
        setUserExp(nextExp);
        localStorage.setItem('history_coliseum_exp_v2', nextExp.toString());
        setLastEarnedExp(prev => prev + campaignBonusExp);

        if (Math.floor(nextExp / 500) + 1 > oldLvl) {
          setShowLevelUpAlert(true);
        }
      }
    }
  };

  // Submit high score to Simulated Alexandria Ledger
  const handlePostScoreToLedger = () => {
    setSubmitHighScoreStatus('loading');
    setTimeout(() => {
      setSubmitHighScoreStatus('success');

      // Interject our score into rival log ticker feed
      const completionText = `posted score of ${score}/${activeQuiz?.questions.length}`;
      setRivalActivity(prev => [
        { name: `${username} (You) ⭐`, feat: completionText, score: "Verified", ago: "Just now" },
        ...prev
      ]);
    }, 1200);
  };

  // Generate dynamic custom trivia questions from Express / Gemini backend
  const handleGenerateCustomQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await fetch('/api/gemini/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: customTopic, difficulty: customDifficulty }),
      });

      if (!response.ok) {
        throw new Error('Historical quiz generator failed to communicate with server.');
      }

      const generatedData = await response.json();
      
      const newCustomQuiz: Quiz = {
        id: `custom_${Date.now()}`,
        title: generatedData.title || `The ${customTopic} Challenge`,
        description: generatedData.description || `Dynamic test on ${customTopic}`,
        category: generatedData.category || 'Custom AI Trivia',
        difficulty: customDifficulty,
        questions: (generatedData.questions || []).map((q: any, i: number) => ({
          id: `cq_${i}`,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation
        }))
      };

      if (!newCustomQuiz.questions || newCustomQuiz.questions.length === 0) {
        throw new Error('AI produced invalid quiz data structure.');
      }

      setQuizzesList([newCustomQuiz, ...quizzesList]);
      setCustomTopic('');
      startQuiz(newCustomQuiz);
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || 'Error occurred. Please verify your Gemini API key in settings.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getRank = (finalScore: number, total: number) => {
    const percent = (finalScore / total) * 100;
    if (percent === 100) return { title: 'Golden Scribe of Alexandria 🏛', desc: 'Unparalleled historical memory! You have mastered this branch perfectly.' };
    if (percent >= 66) return { title: 'Centurion of Rome 🛡', desc: 'Fantastic performance! Your strategic and military knowledge is elite.' };
    return { title: 'History Noble Disciple 📜', desc: 'Good effort. Re-explore the primary historical vaults to discover the exact facts.' };
  };

  // Filter & Search Campaigns by Topic, Format, Difficulty & Keywords
  const filteredCampaigns = useMemo(() => {
    return quizzesList.filter(quiz => {
      const qTitle = quiz.title.toLowerCase();
      const qCat = quiz.category.toLowerCase();
      const qDesc = quiz.description.toLowerCase();
      const qSub = (quiz.subTopic || '').toLowerCase();
      const s = searchTerm.toLowerCase().trim();

      const matchesSearch = !s || qTitle.includes(s) || qCat.includes(s) || qDesc.includes(s) || qSub.includes(s);
      const matchesDifficulty = difficultyFilter === 'All' || quiz.difficulty === difficultyFilter;

      // Match Topic Filter
      let matchesTopic = true;
      if (topicFilter !== 'all') {
        if (quiz.topic) {
          matchesTopic = quiz.topic === topicFilter;
        } else {
          if (topicFilter === 'ancient') {
            matchesTopic = qCat.includes('ancient') || qCat.includes('antiquity') || qTitle.includes('ancient') || qTitle.includes('rome') || qTitle.includes('greece') || qTitle.includes('egypt') || qTitle.includes('cradle');
          } else if (topicFilter === 'modern') {
            matchesTopic = qCat.includes('modern') || qCat.includes('revolution') || qCat.includes('world war') || qCat.includes('cold war');
          } else if (topicFilter === 'regions') {
            matchesTopic = qCat.includes('region') || qCat.includes('asia') || qCat.includes('africa') || qCat.includes('americas') || qCat.includes('europe');
          } else if (topicFilter === 'figures') {
            matchesTopic = qCat.includes('figure') || qCat.includes('leader') || qCat.includes('conqueror') || qCat.includes('ruler') || qCat.includes('queen');
          } else if (topicFilter === 'events') {
            matchesTopic = qCat.includes('event') || qCat.includes('battle') || qCat.includes('treaty');
          }
        }
      }

      // Match Question Format Filter (Multiple Choice vs True/False)
      let matchesFormat = true;
      if (formatFilter !== 'all') {
        if (quiz.formatType) {
          matchesFormat = quiz.formatType === formatFilter || quiz.formatType === 'mixed';
        } else {
          const hasTf = quiz.questions.some(q => q.format === 'tf');
          const hasMcq = quiz.questions.some(q => q.format === 'mcq' || !q.format);
          if (formatFilter === 'tf') matchesFormat = hasTf;
          if (formatFilter === 'mcq') matchesFormat = hasMcq;
        }
      }

      // Match Region Sub-Filter if applicable
      let matchesRegion = true;
      if (topicFilter === 'regions' && regionFilter !== 'all') {
        matchesRegion = quiz.region === regionFilter || qSub.includes(regionFilter.toLowerCase()) || qCat.includes(regionFilter.toLowerCase());
      }

      return matchesSearch && matchesDifficulty && matchesTopic && matchesFormat && matchesRegion;
    });
  }, [quizzesList, searchTerm, difficultyFilter, topicFilter, formatFilter, regionFilter]);

  const totalCampaignPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  
  const paginatedCampaigns = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCampaigns, currentPage]);

  const handleDifficultyClick = (diff: string) => {
    setDifficultyFilter(diff);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalCampaignPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-6 text-left relative">
      
      {/* LEVEL UP CELEBRATARY MODAL/BANNER */}
      {showLevelUpAlert && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in animate-duration-300">
          <div className="bg-[#091512] border-2 border-[#D4AF37] max-w-sm rounded-3xl p-8 text-center space-y-5 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent pointer-events-none" />
            <div className="relative w-16 h-16 bg-[#1A1813] text-[#D4AF37] border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif italic font-extrabold text-white text-2xl tracking-tight">Level Unlocked!</h3>
              <p className="text-xs text-[#A09890] font-mono uppercase tracking-wider">Ascended to Rank</p>
              <p className="text-lg font-serif italic text-[#D4AF37] font-bold">{levelRank.title}</p>
              <p className="text-[36px] font-serif font-black text-white mt-1">LVL {levelData.level}</p>
            </div>
            <p className="text-xs text-[#8CA59C] font-sans leading-relaxed">
              Your historical wisdom grows deeper with every document read. Continue resolving quizzes to reach oracle status.
            </p>
            <button
              onClick={() => setShowLevelUpAlert(false)}
              className="w-full py-2.5 bg-[#D4AF37] hover:bg-white text-black font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Receive Royal Seal
            </button>
          </div>
        </div>
      )}

      {/* GAMIFICATION XP STATS BANNER */}
      <div className="bg-gradient-to-r from-[#0C151C] to-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#1A1813] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-inner">
            <Star className="w-6 h-6 fill-current animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#A09890] uppercase tracking-wider block font-bold">Coliseum Level</span>
            <div className="flex items-baseline gap-1.5 mt-0.5 font-sans">
              <span className="text-2xl font-serif italic font-bold text-white">Lvl {levelData.level}</span>
              <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 border rounded ${levelRank.color} ${levelRank.border}`}>
                {levelRank.title}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <div className="flex justify-between items-baseline text-xs font-mono">
            <span className="text-[#A09890] font-bold uppercase text-[9px] tracking-wider">EXP Progress ({levelData.currentLvlExp} / {levelData.neededExp} XP)</span>
            <span className="text-[#D4AF37] font-bold">Total XP: {userExp}</span>
          </div>
          <div className="relative w-full h-3 bg-[#151515] rounded-full border border-[#2A2A2A] overflow-hidden p-0.5">
            <div 
              style={{ width: `${levelData.percent}%` }}
              className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-500 rounded-full transition-all duration-500"
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#8CA59C] font-sans">
            <span>Unlock Level {levelData.level + 1}</span>
            <span>Earn +100 EXP per correct answer + completion bonuses</span>
          </div>
        </div>
      </div>

      {/* THREE SECTION INDICES TABS NAVIGATION */}
      <div className="flex flex-wrap gap-2 border-b border-[#2A2A2A] pb-0.5">
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'daily'
              ? 'border-[#D4AF37] text-white'
              : 'border-transparent text-[#A09890] hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" /> 📅 Daily Challenge
          <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-400/30 px-1.5 py-0.5 rounded font-bold animate-pulse">NEW</span>
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'campaigns'
              ? 'border-[#D4AF37] text-white'
              : 'border-transparent text-[#A09890] hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" /> 🗳️ Campaigns
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'weekly'
              ? 'border-[#D4AF37] text-white'
              : 'border-transparent text-[#A09890] hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" /> Timed Challenges
          <span className="text-[8px] bg-amber-900/40 text-[#D4AF37] border border-[#D4AF37]/30 px-1.5 py-0.5 rounded ml-1 font-bold">HOT</span>
        </button>
        <button
          onClick={() => setActiveTab('themed')}
          className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'themed'
              ? 'border-[#D4AF37] text-white'
              : 'border-transparent text-[#A09890] hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" /> 🏷️ Themed Arenas
        </button>
        <button
          id="quiz-tab-create-own"
          onClick={() => setActiveTab('create_own')}
          className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'create_own'
              ? 'border-[#D4AF37] text-white'
              : 'border-transparent text-[#A09890] hover:text-white'
          }`}
        >
          <PenTool className="w-4 h-4 text-[#D4AF37]" /> ✍️ Create Your Own Quiz
          <span className="text-[8px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-1.5 py-0.5 rounded ml-1 font-bold animate-pulse">PERSONALIZED</span>
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'custom'
              ? 'border-[#D4AF37] text-white'
              : 'border-transparent text-[#A09890] hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" /> AI Compiler
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left / Middle: Active Quiz Arena or index lists */}
        <div className="lg:col-span-2 space-y-6">
          {activeQuiz ? (
            <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 shadow-xl min-h-[420px] flex flex-col justify-between text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-gray-400 pointer-events-none scale-150 transform rotate-12">
                <BookOpen className="w-32 h-32" />
              </div>
              
              {/* Header */}
              <div className="relative z-10 w-full">
                <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3 mb-4 flex-wrap gap-2 text-left">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-[#D4AF37] bg-[#1A1A1A] border border-[#2A2A2A] px-2 py-0.5 rounded mr-2">
                      {activeQuiz.category}
                    </span>
                    {(activeQuiz.category === 'Personalized Quiz' || activeQuiz.id.startsWith('personalized_')) && (
                      <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded mr-2">
                        🎯 Personalized Recall
                      </span>
                    )}
                    <span className="text-xs font-semibold text-[#8CA59C] font-mono">
                      Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
                    </span>
                  </div>
                  <button
                    onClick={() => { playSound('click'); setActiveQuiz(null); }}
                    className="text-xs font-bold text-[#A09890] hover:text-[#D4AF37] underline cursor-pointer"
                  >
                    Abort Quiz
                  </button>
                </div>

                {!isCompleted ? (
                  // Question Playing State
                  <div className="space-y-5 animate-fade-in text-left">
                    {activeQuiz.questions[currentQuestionIdx].imageUrl && (
                      <div className="w-full h-48 rounded-xl overflow-hidden border border-[#2A2A2A] relative select-none">
                        <img 
                          src={activeQuiz.questions[currentQuestionIdx].imageUrl} 
                          alt="Historical Clue Reference" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 w-full h-full" />
                      </div>
                    )}

                    {/* Question Format & Topic Bar */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded border ${
                        (activeQuiz.questions[currentQuestionIdx].format === 'tf' || 
                         (activeQuiz.questions[currentQuestionIdx].options.length === 2 && 
                          activeQuiz.questions[currentQuestionIdx].options[0].toLowerCase() === 'true'))
                          ? 'bg-amber-950/40 text-amber-400 border-amber-500/30'
                          : 'bg-[#151515] text-[#D4AF37] border-[#2A2A2A]'
                      }`}>
                        {(activeQuiz.questions[currentQuestionIdx].format === 'tf' || 
                          (activeQuiz.questions[currentQuestionIdx].options.length === 2 && 
                           activeQuiz.questions[currentQuestionIdx].options[0].toLowerCase() === 'true'))
                          ? '⚖️ Format: True / False'
                          : '🎯 Format: Multiple Choice'}
                      </span>
                      {activeQuiz.subTopic && (
                        <span className="text-[10px] font-mono text-[#8CA59C] bg-[#121212] px-2 py-0.5 rounded border border-[#222]">
                          {activeQuiz.subTopic}
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif italic font-semibold text-white text-lg sm:text-lg leading-snug">
                      {activeQuiz.questions[currentQuestionIdx].question}
                    </h4>

                    {/* Options list: Dedicated True/False tactile cards vs Multiple Choice */}
                    {(activeQuiz.questions[currentQuestionIdx].format === 'tf' || 
                      (activeQuiz.questions[currentQuestionIdx].options.length === 2 && 
                       activeQuiz.questions[currentQuestionIdx].options[0].toLowerCase() === 'true')) ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {activeQuiz.questions[currentQuestionIdx].options.map((option, idx) => {
                          const isSelected = selectedOptionIdx === idx;
                          const isCorrect = activeQuiz.questions[currentQuestionIdx].correctIndex === idx;
                          const isTrueOption = option.toLowerCase() === 'true';

                          let optionStyle = 'border-[#2A2A2A] bg-[#0A0A0A] text-[#E0D8D0] hover:border-[#D4AF37]/50 hover:bg-[#151515]';
                          if (isSelected) {
                            optionStyle = isTrueOption
                              ? 'border-emerald-500 bg-[#0c2417] text-white font-bold ring-2 ring-emerald-500/30'
                              : 'border-rose-500 bg-[#240c0e] text-white font-bold ring-2 ring-rose-500/30';
                          }
                          if (hasSubmitted) {
                            if (isCorrect) {
                              optionStyle = 'border-emerald-500 bg-[#0C2417] text-emerald-300 ring-2 ring-emerald-500/40 font-bold';
                            } else if (isSelected) {
                              optionStyle = 'border-rose-500 bg-[#240C0E] text-rose-300 ring-2 ring-rose-500/40 font-bold';
                            } else {
                              optionStyle = 'opacity-35 border-[#2A2A2A] bg-[#0F0F0F]';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              disabled={hasSubmitted}
                              onClick={() => handleOptionSelect(idx)}
                              className={`w-full p-5 text-center rounded-xl border transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${optionStyle}`}
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                                isTrueOption ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' : 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                              }`}>
                                {isTrueOption ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                              </div>
                              <span className="text-base font-serif italic font-bold tracking-wide">{option}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2.5">
                        {activeQuiz.questions[currentQuestionIdx].options.map((option, idx) => {
                          const isSelected = selectedOptionIdx === idx;
                          const isCorrect = activeQuiz.questions[currentQuestionIdx].correctIndex === idx;
                          
                          let optionStyle = 'border-[#2A2A2A] bg-[#0A0A0A] text-[#E0D8D0] hover:border-[#D4AF37]/50 hover:bg-[#151515]';
                          if (isSelected) optionStyle = 'border-[#D4AF37] bg-[#1A1813] text-white font-medium ring-1 ring-[#D4AF37]/25';
                          if (hasSubmitted) {
                            if (isCorrect) {
                              optionStyle = 'border-emerald-500 bg-[#0C2417] text-emerald-400 ring-1 ring-emerald-500/20';
                            } else if (isSelected) {
                              optionStyle = 'border-rose-500 bg-[#240C0E] text-rose-400 ring-1 ring-rose-500/20';
                            } else {
                              optionStyle = 'opacity-40 border-[#2A2A2A] bg-[#0F0F0F]';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              disabled={hasSubmitted}
                              onClick={() => handleOptionSelect(idx)}
                              className={`w-full p-4 text-xs text-left rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                            >
                              <span className="font-mono font-bold text-[#D4AF37] select-none">{String.fromCharCode(65 + idx)}.</span>
                              <span>{option}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Feedback Explanation details */}
                    {hasSubmitted && (
                      <div className="p-4 bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] mt-4 text-left">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className={`w-5 h-5 shrink-0 ${
                            selectedOptionIdx === activeQuiz.questions[currentQuestionIdx].correctIndex 
                              ? 'text-emerald-400' 
                              : 'text-rose-400'
                          }`} />
                          <div>
                            <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono flex items-center gap-1.5">
                              {selectedOptionIdx === activeQuiz.questions[currentQuestionIdx].correctIndex ? 'Correct Answer!' : 'Incorrect Answer'}
                              {selectedOptionIdx === activeQuiz.questions[currentQuestionIdx].correctIndex && (
                                <span className="text-[9px] lowercase bg-[#0E2419] text-emerald-400 px-1.5 py-0.5 border border-emerald-500/30 rounded font-bold font-mono">
                                  +100 EXP
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-[#A09890] mt-1.5 leading-relaxed font-sans">
                              {activeQuiz.questions[currentQuestionIdx].explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Completed Scoreboard State
                  <div className="text-center py-6 space-y-5 relative z-10">
                    <div className="w-16 h-16 bg-[#1A1A1A] text-[#D4AF37] border border-[#2A2A2A] rounded-full flex items-center justify-center mx-auto shadow-xl">
                      <Award className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif italic font-bold text-white text-xl tracking-tight">Campaign Conquered!</h4>
                      <p className="text-sm text-[#A09890] font-sans">Your scholastic ledger has been updated</p>
                    </div>

                    <div className="bg-[#0A0A0A] border border-[#2A2A2A] max-w-sm mx-auto p-5 rounded-2xl space-y-4">
                      <div>
                        <p className="text-[10px] font-mono text-[#A09890] uppercase tracking-widest font-bold">Accuracy Score</p>
                        <p className="text-4xl font-serif font-extrabold text-[#D4AF37] mt-1">
                          {score} <span className="text-lg text-[#A09890]">/ {activeQuiz.questions.length}</span>
                        </p>
                      </div>

                      {lastEarnedExp > 0 && (
                        <div className="py-1.5 px-3 bg-[#0B1512] rounded-xl border border-emerald-500/15 text-emerald-400 font-mono text-[10px] inline-block font-bold">
                          🎉 +{lastEarnedExp} EXP Added!
                        </div>
                      )}
                      
                      {/* Rank feedback details */}
                      <div className="pt-3 border-t border-[#2A2A2A] text-left">
                        <p className="text-xs font-serif italic font-extrabold text-[#D4AF37]">
                          {getRank(score, activeQuiz.questions.length).title}
                        </p>
                        <p className="text-[11px] text-[#A09890] mt-0.5 leading-relaxed">
                          {getRank(score, activeQuiz.questions.length).desc}
                        </p>
                      </div>

                      {/* POST TO LEADERBOARD INTEGRATION MODULE */}
                      <div className="pt-3 border-t border-[#2A2A2A]">
                        {submitHighScoreStatus === 'idle' ? (
                          <button
                            onClick={handlePostScoreToLedger}
                            className="w-full py-2 bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                          >
                            ⭐ Submit Score & Verify Standings
                          </button>
                        ) : submitHighScoreStatus === 'loading' ? (
                          <div className="text-xs font-mono text-[#A09890] italic flex items-center justify-center gap-2 py-1.5">
                            <Cpu className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                            Synchronizing Alexandria Ledger...
                          </div>
                        ) : (
                          <div className="text-xs font-mono text-emerald-400 font-bold bg-[#0e2419] border border-emerald-500/20 py-2 rounded-xl text-center">
                            ✓ Verified and Synced with Season 1 Standings!
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                      <button
                        onClick={() => setShowAnswerReview(!showAnswerReview)}
                        className="px-4 py-2 text-xs font-bold border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        {showAnswerReview ? 'Hide Question Breakdown' : `Review Questions & Answers (${activeQuiz.questions.length})`}
                      </button>
                      <button
                        onClick={() => startQuiz(activeQuiz)}
                        className="px-4 py-2 text-xs font-bold border border-[#2A2A2A] rounded-xl hover:bg-[#1E1E1E] text-[#E0D8D0] bg-[#151515] cursor-pointer"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={() => { playSound('click'); setActiveQuiz(null); }} 
                        className="px-4 py-2 text-xs font-bold bg-[#D4AF37] text-black hover:bg-black hover:text-[#D4AF37] border border-[#D4AF37] rounded-xl shadow-lg transition-all cursor-pointer"
                      >
                        Browse Other Campaigns
                      </button>
                    </div>

                    {/* Expandable Answers & Explanations Review Panel */}
                    {showAnswerReview && (
                      <div className="mt-6 pt-6 border-t border-[#2A2A2A] space-y-4 text-left animate-fade-in max-h-[500px] overflow-y-auto pr-1">
                        <div className="flex items-center justify-between pb-2 border-b border-[#222]">
                          <span className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            Comprehensive Question Breakdown & Historical Fact Vault
                          </span>
                          <span className="text-[10px] font-mono text-[#A09890]">
                            {userAnswersHistory.filter(h => h.isCorrect).length} of {activeQuiz.questions.length} Correct
                          </span>
                        </div>

                        {userAnswersHistory.map((item, qIdx) => (
                          <div
                            key={qIdx}
                            className={`p-4 rounded-xl border space-y-2.5 transition-all ${
                              item.isCorrect
                                ? 'bg-[#0A1610] border-emerald-500/30'
                                : 'bg-[#180A0C] border-rose-500/30'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="text-xs font-serif font-bold text-white leading-relaxed">
                                #{qIdx + 1}. {item.question.question}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold shrink-0 ${
                                item.isCorrect
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                              }`}>
                                {item.isCorrect ? '✓ Correct' : '✕ Incorrect'}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                              <div className="p-2 rounded bg-black/40 border border-[#222]">
                                <span className="text-[9px] text-[#A09890] block uppercase">Your Selection</span>
                                <span className={item.isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                  {item.selectedIdx !== null ? item.question.options[item.selectedIdx] : 'None'}
                                </span>
                              </div>
                              {!item.isCorrect && (
                                <div className="p-2 rounded bg-black/40 border border-emerald-500/30">
                                  <span className="text-[9px] text-emerald-400/80 block uppercase">Correct Answer</span>
                                  <span className="text-emerald-300 font-bold">
                                    {item.question.options[item.question.correctIndex]}
                                  </span>
                                </div>
                              )}
                            </div>

                            {item.question.explanation && (
                              <div className="pt-2 border-t border-white/5 text-[11px] text-[#C4B9AD] font-sans leading-relaxed">
                                <span className="text-[#D4AF37] font-mono font-bold text-[10px] block mb-0.5">Historical Context:</span>
                                {item.question.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action bar Footer */}
              {!isCompleted && (
                <div className="border-t border-[#2A2A2A] pt-4 flex justify-end gap-2.5 mt-6 relative z-10">
                  {!hasSubmitted ? (
                    <button
                      disabled={selectedOptionIdx === null}
                      onClick={handleAnswerSubmit}
                      className="px-6 py-2.5 bg-[#D4AF37] text-black border border-[#D4AF37] hover:bg-black hover:text-[#D4AF37] disabled:bg-[#1E1E1E] disabled:text-[#A09890] disabled:border-[#2A2A2A] rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 bg-[#D4AF37] text-black border border-[#D4AF37] hover:bg-black hover:text-[#D4AF37] rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1 cursor-pointer"
                    >
                      {currentQuestionIdx + 1 === activeQuiz.questions.length ? 'Finish Campaign' : 'Next Question'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            
            /* INDEX SELECTIONS DISPLAY SCREEN */
            <div className="space-y-6 text-left">
              
              {/* TAB 0: DAILY HISTORICAL CHALLENGES */}
              {activeTab === 'daily' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#121a1f] to-[#0A0A0A] border border-[#D4AF37]/35 p-6 rounded-2xl relative overflow-hidden animate-fade-in">
                    <div className="absolute top-0 right-0 p-6 opacity-5 text-[#D4AF37] pointer-events-none">
                      <Calendar className="w-24 h-24" />
                    </div>
                    <div className="space-y-2 relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#D4AF37] bg-amber-950/20 border border-[#D4AF37]/35 inline-block px-2.5 py-0.5 rounded">
                          ⌛ Daily Historical Coliseum Arena
                        </p>
                        <button
                          onClick={() => setActiveTab('create_own')}
                          className="text-[11px] font-mono font-bold text-[#D4AF37] hover:text-white bg-[#1C1811] hover:bg-[#282217] border border-[#D4AF37]/40 px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <PenTool className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Generate Quiz from Your Notes ({notes.length + bookmarks.length})</span>
                        </button>
                      </div>
                      <h4 className="font-serif italic font-extrabold text-white text-xl">The Chronicles of Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                      <p className="text-xs text-[#A09890] leading-relaxed max-w-2xl font-sans">
                        Accept the ultimate scholarly challenge! Test your understanding of history in our daily focus arena, or tap above to forge a custom trivia quiz directly from your bookmarked primary sources and study notes.
                      </p>
                    </div>
                  </div>

                  {/* DIFFICULTY RANK CARD SELECTOR */}
                  <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#A09890]">Select Your Battle Rank</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(['Easy', 'Medium', 'Hard'] as const).map((diff) => {
                        const dateKey = getTodayDateString() + '_' + diff;
                        const record = dailyCompleted[dateKey];
                        const isSelected = dailyDifficulty === diff;
                        const rankLabel = diff === 'Easy' ? 'Bronze Age Novice' : diff === 'Medium' ? 'Centurion Commander' : 'Grand Emperor';
                        return (
                          <button
                            key={diff}
                            onClick={() => { playSound('click'); setDailyDifficulty(diff); }}
                            className={`p-4 rounded-xl border transition-all text-left space-y-2 relative overflow-hidden flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#15120c] border-[#D4AF37] shadow-lg shadow-amber-500/5'
                                : 'bg-[#0F0F0F] border-[#2A2A2A] hover:border-[#A09890]/30'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${
                                  diff === 'Easy' 
                                    ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20' 
                                    : diff === 'Medium' 
                                      ? 'bg-blue-950/20 text-blue-400 border-blue-500/20' 
                                      : 'bg-rose-950/20 text-rose-400 border-rose-500/20'
                                }`}>
                                  {diff}
                                </span>
                                {record && (
                                  <span className="text-[9px] font-mono text-emerald-400 font-bold bg-[#0e2419] border border-emerald-500/20 px-1.5 py-0.5 rounded">
                                    ✓ Cleared
                                  </span>
                                )}
                              </div>
                              <h6 className="font-serif italic font-bold text-white text-sm mt-1">{rankLabel}</h6>
                            </div>
                            <div className="pt-2 text-[10px] font-mono text-[#A09890] border-t border-[#222] mt-2">
                              {record ? `Score: ${record.score} / 3` : 'Unplayed today'}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ACTIVE PREVIEW OF TODAY'S SELECTION */}
                  <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6 relative overflow-hidden">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-mono uppercase bg-[#181109] text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded">
                          ★ Today's Focus: {dailyDifficulty} Rank Challenge
                        </span>
                        <h4 className="font-serif italic font-extrabold text-white text-xl mt-3">
                          {getTodayQuiz(dailyDifficulty).title}
                        </h4>
                        <p className="text-xs text-[#A09890] mt-1.5 leading-relaxed font-sans">
                          {getTodayQuiz(dailyDifficulty).description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4 items-center justify-between border-t border-[#222] mt-4">
                        <div className="space-y-1">
                          <p className="text-[10px] font-mono text-[#8CA59C] flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" /> Includes 3 detailed multiple-choice trivia rounds.
                          </p>
                          <p className="text-[10px] font-mono text-[#8CA59C] flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-[#D4AF37]" /> Completion grants EXP rewards plus historical context logs.
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              playSound('click');
                              const quiz = getTodayQuiz(dailyDifficulty);
                              startQuiz(quiz);
                            }}
                            className="bg-[#D4AF37] text-black hover:bg-black hover:text-[#D4AF37] border border-[#D4AF37] py-2 px-5 rounded-xl text-xs font-serif italic font-bold hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            ⚔️ Enter Daily Arena
                          </button>

                          <button
                            disabled={isGeneratingDaily}
                            onClick={handleGenerateAIDailyChallenge}
                            className="bg-[#151515] text-[#D4AF37] hover:bg-[#D4AF37]/10 border border-[#D4AF37]/35 py-2 px-4 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40"
                          >
                            {isGeneratingDaily ? (
                              <>
                                <Cpu className="w-3.5 h-3.5 animate-spin" />
                                Compiling...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5" />
                                Generate Custom with AI
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {dailyGenerationError && (
                        <div className="mt-2 text-xs font-mono text-rose-400 bg-rose-950/20 border border-rose-500/20 p-3 rounded-lg flex items-center gap-2 animate-pulse">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {dailyGenerationError}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* DAILY PROGRESS WIDGET */}
                  <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#A09890]">Your Active Daily Seals</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(['Easy', 'Medium', 'Hard'] as const).map((diff) => {
                        const dateKey = getTodayDateString() + '_' + diff;
                        const record = dailyCompleted[dateKey];
                        return (
                          <div key={diff} className="bg-[#0F0F0F] border border-[#222] p-3 rounded-lg flex items-center justify-between text-xs font-mono">
                            <span className="text-[#A09890]">{diff} Rank:</span>
                            {record ? (
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                {record.score}/3 Score
                              </span>
                            ) : (
                              <span className="text-gray-500 italic">Unsolved</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 1: STANDARD CAMPAIGNS */}
              {activeTab === 'campaigns' && (
                <div className="space-y-4">
                  {/* Topic Categories Bar */}
                  <div className="bg-[#0F0F0F] p-3 border border-[#2A2A2A] rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> Historical Topic Curriculum
                      </span>
                      <span className="text-[10px] font-mono text-[#8CA59C]">
                        {filteredCampaigns.length} Available Campaigns
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'all', label: 'All Topics', icon: '🏛️' },
                        { id: 'ancient', label: 'Ancient History', icon: '🏺' },
                        { id: 'modern', label: 'Modern History', icon: '⚡' },
                        { id: 'regions', label: 'Specific Regions', icon: '🗺️' },
                        { id: 'figures', label: 'Historical Figures', icon: '👑' },
                        { id: 'events', label: 'Historical Events', icon: '🛡️' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTopicFilter(t.id as any);
                            setCurrentPage(1);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            topicFilter === t.id
                              ? 'bg-[#D4AF37] text-black shadow'
                              : 'bg-[#151515] text-[#A09890] border border-[#2A2A2A] hover:text-white hover:border-[#444]'
                          }`}
                        >
                          <span>{t.icon}</span>
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Regional Sub-filters when "regions" topic is selected */}
                    {topicFilter === 'regions' && (
                      <div className="pt-2 border-t border-[#222] flex flex-wrap gap-1.5 items-center">
                        <span className="text-[9px] font-mono text-[#7A7065] uppercase mr-1">Region:</span>
                        {[
                          'all',
                          'Asia & Pacific',
                          'Europe & Mediterranean',
                          'Middle East & North Africa',
                          'Sub-Saharan Africa',
                          'The Americas'
                        ].map((r) => (
                          <button
                            key={r}
                            onClick={() => {
                              setRegionFilter(r);
                              setCurrentPage(1);
                            }}
                            className={`px-2.5 py-1 text-[10px] font-mono rounded border transition-all cursor-pointer ${
                              regionFilter === r
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                                : 'bg-[#121212] text-[#888] border-[#222] hover:text-white'
                            }`}
                          >
                            {r === 'all' ? 'All Regions' : r}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Filter and Search Navigation Header */}
                  <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-[#0F0F0F] p-4 border border-[#2A2A2A] rounded-xl">
                    <div className="relative w-full md:max-w-xs">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#A09890]" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                        placeholder="Search quizzes, leaders, events..."
                        className="w-full pl-9 pr-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Format Filter & Difficulty Filter */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      {/* Format Filter */}
                      <div className="flex items-center gap-1 border border-[#2A2A2A] bg-[#0A0A0A] p-0.5 rounded-lg">
                        {[
                          { id: 'all', label: 'All Formats' },
                          { id: 'mcq', label: '🎯 MCQ' },
                          { id: 'tf', label: '⚖️ True/False' }
                        ].map((f) => (
                          <button
                            key={f.id}
                            onClick={() => {
                              setFormatFilter(f.id as any);
                              setCurrentPage(1);
                            }}
                            className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-md transition-all cursor-pointer ${
                              formatFilter === f.id
                                ? 'bg-[#D4AF37] text-black'
                                : 'text-[#A09890] hover:text-white'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>

                      {/* Difficulty */}
                      <div className="flex items-center gap-1 border border-[#2A2A2A] bg-[#0A0A0A] p-0.5 rounded-lg">
                        {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                          <button
                            key={diff}
                            onClick={() => handleDifficultyClick(diff)}
                            className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-md transition-all cursor-pointer ${
                              difficultyFilter === diff 
                                ? 'bg-[#D4AF37] text-black' 
                                : 'text-[#A09890] hover:text-white'
                            }`}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Grid Content */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {paginatedCampaigns.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#D4AF37]/50 transition-all text-left flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between flex-wrap gap-1.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-[#D4AF37] bg-[#121212] px-2 py-0.5 rounded border border-[#2A2A2A]">
                                {quiz.category}
                              </span>
                              {quiz.formatType && (
                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                                  quiz.formatType === 'tf'
                                    ? 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                                    : 'bg-[#151515] text-[#8CA59C] border-[#222]'
                                }`}>
                                  {quiz.formatType === 'tf' ? '⚖️ True/False' : '🎯 MCQ'}
                                </span>
                              )}
                            </div>
                            <span className={`text-[9px] font-mono font-bold border px-1.5 py-0.5 rounded uppercase ${
                              quiz.difficulty === 'Easy' ? 'border-emerald-500/25 bg-[#0C2417]/30 text-emerald-400' :
                              quiz.difficulty === 'Medium' ? 'border-amber-500/25 bg-[#24170C]/30 text-amber-400' :
                              'border-rose-500/25 bg-[#240C0E]/30 text-rose-400'
                            }`}>
                              {quiz.difficulty}
                            </span>
                          </div>

                          <h5 className="font-serif italic font-bold text-white tracking-normal text-md leading-snug">
                            {quiz.title}
                          </h5>

                          {quiz.subTopic && (
                            <p className="text-[10px] font-mono text-[#7A7065] flex items-center gap-1">
                              <span>•</span> {quiz.subTopic}
                            </p>
                          )}

                          <p className="text-xs text-[#A09890] line-clamp-2 leading-relaxed font-sans mt-1">
                            {quiz.description}
                          </p>
                        </div>

                        {/* Visual High Scores Indicator on Cards */}
                        <div className="mt-4 pt-3 border-t border-[#222] flex items-center justify-between text-[11px] font-mono">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#7A7065]">
                              {quiz.questions.length} Questions
                            </span>
                            {highScores[quiz.id] !== undefined ? (
                              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                                🏆 Best: {highScores[quiz.id]}/{quiz.questions.length}
                              </span>
                            ) : (
                              <span className="text-[#666]">
                                • Unplayed
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => startQuiz(quiz)}
                            className="py-1 px-3 bg-[#1A1A1A] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] text-xs font-bold rounded flex items-center gap-1 transition-colors border border-[#2A2A2A] cursor-pointer"
                          >
                            <Play className="w-2.5 h-2.5 fill-current stroke-none" /> Play
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredCampaigns.length === 0 && (
                    <div className="bg-[#0F0F0F] border border-dashed border-[#2A2A2A] rounded-2xl py-12 text-center text-[#A09890]">
                      No matching historical campaigns located. Add new parameters to the AI generator to build one!
                    </div>
                  )}

                  {/* Pagination Footer */}
                  {totalCampaignPages > 1 && (
                    <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2A] text-xs font-mono">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-3 py-1.5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-[#A09890] hover:text-white hover:border-[#D4AF37]/50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        ◀ Prev Page
                      </button>

                      <span className="text-[#8CA59C]">
                        Dossier Page <span className="text-white font-bold">{currentPage}</span> of {totalCampaignPages} ({filteredCampaigns.length} total)
                      </span>

                      <button
                        disabled={currentPage === totalCampaignPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-3 py-1.5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-[#A09890] hover:text-white hover:border-[#D4AF37]/50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        Next Page ▶
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: WEEKLY LIVE CHALLENGES */}
              {activeTab === 'weekly' && (
                <div className="space-y-4">
                  <div className="bg-[#121212] border border-[#D4AF37]/25 p-5 rounded-2xl flex items-center gap-4 flex-wrap sm:flex-nowrap justify-between">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#D4AF37] bg-amber-950/20 border border-[#D4AF37]/35 inline-block px-2.5 py-0.5 rounded">
                        ⌛ Daily & Weekly Live Arenas
                      </p>
                      <h4 className="font-serif italic font-bold text-white text-md">High-Reward Scribe Achievements</h4>
                      <p className="text-xs text-[#A09890] leading-relaxed max-w-xl">
                        Weekly Challenges reset each Sunday. Complete them with over 60% accuracy to earn <strong className="text-white font-sans">+300 bonus EXP</strong> and log your standing in the season ledger!
                      </p>
                    </div>
                    
                    <div className="bg-[#050505] border border-[#2A2A2A] p-3 rounded-xl shrink-0 text-center font-mono">
                      <p className="text-[9px] text-[#A09890] uppercase tracking-wider">Reset Countdown</p>
                      <p className="text-sm font-bold text-[#D4AF37] mt-1 pulse">4d 13h 24m</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {WEEKLY_CHALLENGES.map((challenge) => (
                      <div
                        key={challenge.id}
                        className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all text-left"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-5 text-[#D4AF37]">
                          <Trophy className="w-16 h-16" />
                        </div>
                        
                        <div className="space-y-3 relative z-10">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono uppercase bg-[#181109] text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                              +300 XP completion bonus
                            </span>
                            {weeklyCompleted[challenge.id] && (
                              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/20 px-1.5 py-0.5 border border-emerald-500/20 rounded font-bold">
                                ✓ Claimed
                              </span>
                            )}
                          </div>
                          
                          <h5 className="font-serif italic font-extrabold text-white text-lg">
                            {challenge.title}
                          </h5>
                          
                          <p className="text-xs text-[#A09890] leading-relaxed">
                            {challenge.description}
                          </p>

                          {/* Image-based indicator */}
                          <div className="pt-1 flex items-center gap-1.5 text-[10px] text-[#8CA59C] font-mono">
                            <Layers className="w-3.5 h-3.5 text-[#D4AF37]" /> Includes MCQ, True/False & Image Clues
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-[#222] flex items-center justify-between text-[11px] font-mono relative z-10">
                          {highScores[challenge.id] !== undefined ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                              ★ High Score: {highScores[challenge.id]} / {challenge.questions.length}
                            </span>
                          ) : (
                            <span className="text-[#A09890]">
                              ☆ Timed Standby
                            </span>
                          )}

                          <button
                            onClick={() => startQuiz(challenge)}
                            className="bg-[#D4AF37] text-black hover:bg-black hover:text-[#D4AF37] border border-[#D4AF37] py-1.5 px-4 rounded-xl text-xs font-serif italic font-bold hover:shadow-lg transition-all cursor-pointer"
                          >
                            Enter Arena
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: THEMED QUIZZES */}
              {activeTab === 'themed' && (
                <div className="space-y-4">
                  <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-5 text-left">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-[#D4AF37]" />
                      <h4 className="font-serif italic font-bold text-white text-md">Themed Arenas: Categorized Battles & Eras</h4>
                    </div>
                    <p className="text-xs text-[#A09890] leading-relaxed mt-1">
                      Choose from specialized themes detailing antiquity, medieval kingdoms, and the powder-keg of modern revolutions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {THEMED_QUIZZES.map((themeQuiz) => (
                      <div
                        key={themeQuiz.id}
                        className="bg-[#0F0F0F] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between text-left"
                      >
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono uppercase bg-[#141414] text-[#8CA59C] border border-[#222] px-2 py-0.5 rounded">
                            {themeQuiz.category}
                          </span>
                          <h5 className="font-serif italic font-bold text-white text-base">
                            {themeQuiz.title}
                          </h5>
                          <p className="text-xs text-[#A09890] leading-relaxed">
                            {themeQuiz.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#222] flex items-center justify-between text-[11px] font-mono">
                          {highScores[themeQuiz.id] !== undefined ? (
                            <span className="text-[#D4AF37] font-bold">
                              Best: {highScores[themeQuiz.id]} / {themeQuiz.questions.length}
                            </span>
                          ) : (
                            <span className="text-[#777]">
                              Inactive
                            </span>
                          )}

                          <button
                            onClick={() => startQuiz(themeQuiz)}
                            className="bg-[#2A2A2A] text-white hover:bg-[#D4AF37] hover:text-black border border-[#2A2A2A] hover:border-[#D4AF37] px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer"
                          >
                            Play Arena
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: AI COMPILER SCREEN */}
              {activeTab === 'custom' && (
                <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                    <h4 className="font-serif italic font-bold text-white text-md tracking-tight">AI Custom Quiz Compiler Form</h4>
                  </div>
                  <p className="text-xs text-[#A09890] leading-relaxed">
                    Input any customized topic from classical antiquity or tactical revolutions and our historical neural compiler will draft an original, structured quiz matching your exact settings!
                  </p>

                  {generationError && (
                    <div className="p-3 bg-[#240C0E] border border-rose-900/45 rounded-xl text-rose-350 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                      <span>{generationError}</span>
                    </div>
                  )}

                  <form onSubmit={handleGenerateCustomQuiz} className="space-y-4 max-w-md text-left">
                    <div className="space-y-1">
                      <label className="text-[10px] text-[#A09890] uppercase tracking-widest font-mono font-bold">Inquiry Topic Specification</label>
                      <input
                        type="text"
                        required
                        disabled={isGenerating}
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        placeholder="e.g. Spartan Thermopylae Defenses, Byzantine navy"
                        className="w-full p-3 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-[#A09890] uppercase tracking-widest font-mono font-bold">Campaign Difficulty</label>
                      <select
                        disabled={isGenerating}
                        value={customDifficulty}
                        onChange={(e) => setCustomDifficulty(e.target.value as any)}
                        className="w-full p-3 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full py-3 bg-[#D4AF37] text-black disabled:bg-[#1E1E1E] disabled:text-[#A09890] text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-lg border border-[#D4AF37] hover:bg-black hover:text-[#D4AF37] cursor-pointer"
                    >
                      {isGenerating ? (
                        <>
                          <Cpu className="w-3.5 h-3.5 animate-spin text-black" />
                          <span>Forging Standardized Scribe Questions...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Assemble & Play Custom Quiz</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 5: CREATE YOUR OWN QUIZ (PERSONALIZED LORE SYNTHESIS) */}
              {activeTab === 'create_own' && (
                <CreateYourOwnQuizView
                  notes={notes}
                  bookmarks={bookmarks}
                  onStartQuiz={startQuiz}
                  onNavigateToTab={onNavigateToTab}
                />
              )}

            </div>
          )}
        </div>

        {/* Right Tab: Gamified Leaderboard with real rankings & active virtual rivals */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* THE GLOBAL LEADERBOARD */}
          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-5 space-y-4 text-left shadow-lg">
            
            {/* Header with Subtabs for rankings vs. simulated ticker logs */}
            <div className="flex flex-col gap-2 border-b border-[#2A2A2A] pb-2.5">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="font-serif italic font-bold text-sm">Leaderboard & Rival ledger</h4>
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-amber-950/35 text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                  Season 1
                </span>
              </div>
              
              {/* Tabs for leaderboard */}
              <div className="flex bg-[#0A0A0A] p-0.5 rounded border border-[#1E1E1E] text-[10px] font-mono font-bold">
                <button
                  onClick={() => setLeaderboardTab('standing')}
                  className={`w-1/2 py-1 rounded transition-all cursor-pointer ${
                    leaderboardTab === 'standing' 
                      ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A]' 
                      : 'text-[#A09890] hover:text-white'
                  }`}
                >
                  👑 Standings View
                </button>
                <button
                  onClick={() => setLeaderboardTab('rival_ticker')}
                  className={`w-1/2 py-1 rounded transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    leaderboardTab === 'rival_ticker' 
                      ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A]' 
                      : 'text-[#A09890] hover:text-white'
                  }`}
                >
                  📻 Scribe Logs <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5"></span>
                </button>
              </div>
            </div>

            {/* Username Editing Row */}
            <div className="flex items-center justify-between gap-2 text-xs bg-[#090909] p-2 rounded-lg border border-[#1E1E1E]">
              {isEditingUsername ? (
                <div className="flex gap-1.5 w-full">
                  <input
                    type="text"
                    maxLength={18}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-[#050505] border border-[#2A2A2A] text-xs text-white p-1 rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] w-full"
                  />
                  <button
                    onClick={() => {
                      localStorage.setItem('history_coliseum_username', username);
                      setIsEditingUsername(false);
                    }}
                    className="px-2 py-1 bg-[#D4AF37] text-black text-[10px] font-bold rounded cursor-pointer self-center"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-[#A09890] font-mono text-[11px]">Contestant Name: <strong className="text-[#E0D8D0] font-sans font-bold">{username}</strong></span>
                  <button
                    onClick={() => setIsEditingUsername(true)}
                    className="text-[#D4AF37] hover:underline hover:text-white text-[10px] font-bold font-mono cursor-pointer"
                  >
                    ✏️ Edit
                  </button>
                </>
              )}
            </div>

            {/* LEADERBOARD VIEW 1: STANDINGS */}
            {leaderboardTab === 'standing' ? (
              <div className="space-y-1.5">
                {leaderboardUsers.map((lbUser, idx) => {
                  const isUser = lbUser.isUser;
                  return (
                    <div
                      key={lbUser.name}
                      className={`flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                        isUser
                          ? 'bg-amber-950/20 border border-[#D4AF37]/45 text-white font-bold ring-1 ring-[#D4AF37]/10'
                          : 'bg-[#0B0B0B] border border-[#1E1E1E] text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-left">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 ${
                          idx === 0 ? 'bg-amber-500 text-black font-extrabold' :
                          idx === 1 ? 'bg-slate-400 text-black font-extrabold' :
                          idx === 2 ? 'bg-amber-800 text-white font-extrabold' :
                          'bg-neutral-800 text-gray-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <div className="text-left">
                          <span className="block text-[11px] font-medium leading-normal text-left">{lbUser.name}</span>
                          <span className="block text-[9px] text-[#8CA59C] shrink-0 font-mono leading-none text-left">{lbUser.rank}</span>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-[#D4AF37] tracking-tight shrink-0 font-bold">
                        {lbUser.exp} EXP
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              // LEADERBOARD VIEW 2: SCROLLING SCRIBE LOG TICKER FEED (Immersive rival simulation tracker)
              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 animate-fade-in text-left">
                {rivalActivity.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-2 border border-[#1E1E1E] bg-[#070707] rounded-lg text-[11px] leading-relaxed text-[#A09890] space-y-0.5"
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] text-gray-500">
                      <span className="font-bold text-[#E5C158]">{act.name}</span>
                      <span>{act.ago}</span>
                    </div>
                    <p className="text-white text-left">
                      {act.feat}
                    </p>
                    <div className="text-[10px] font-mono text-emerald-400 font-bold">
                      Result: {act.score}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-[9px] text-[#7A7065] text-center italic leading-relaxed font-sans mt-0.5">
              * Earn up to +200 EXP on every completed campaign. Gain +100 bonus EXP for a perfect score.
            </p>
          </div>

          {/* DYNAMIC CAMPAIGN RANKS & ACHIEVEMENTS */}
          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-5 space-y-4 text-left">
            <div className="flex items-center gap-2 text-white">
              <Layers className="w-4.5 h-4.5 text-[#D4AF37]" />
              <h4 className="font-serif italic font-bold text-sm">Campaign Ranks & Records</h4>
            </div>
            
            <div className="space-y-3 text-xs font-sans">
              <div className="flex items-center gap-2.5 justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐️</span>
                  <div>
                    <p className="text-white font-medium">Bronze Age Novice</p>
                    <p className="text-[10px] text-[#8CA59C]">Own Level 1+</p>
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-bold ${levelData.level >= 1 ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {levelData.level >= 1 ? '✓ Unlocked' : 'Locked'}
                </span>
              </div>

              <div className="flex items-center gap-2.5 justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <div>
                    <p className="text-white font-medium">Centurion Archon</p>
                    <p className="text-[10px] text-[#8CA59C]">Reach Level 10+</p>
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-bold ${levelData.level >= 10 ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {levelData.level >= 10 ? '✓ Unlocked' : 'Locked'}
                </span>
              </div>

              <div className="flex items-center gap-2.5 justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👑</span>
                  <div>
                    <p className="text-white font-medium">High Emperor Scribe</p>
                    <p className="text-[10px] text-[#8CA59C]">Reach Level 18+</p>
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-bold ${levelData.level >= 18 ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {levelData.level >= 18 ? '✓ Unlocked' : 'Locked'}
                </span>
              </div>
              
              <div className="flex items-center gap-2.5 justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏛</span>
                  <div>
                    <p className="text-white font-medium">Library Master Oracle</p>
                    <p className="text-[10px] text-[#8CA59C]">Reach Level 30+</p>
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-bold ${levelData.level >= 30 ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {levelData.level >= 30 ? '✓ Unlocked' : 'Locked'}
                </span>
              </div>
            </div>
            
            <div className="border-t border-[#222] pt-3 flex justify-between items-center text-[10px] text-[#A09890] font-mono">
              <span>Total Quizzes</span>
              <span className="text-white font-bold">{quizzesList.length + WEEKLY_CHALLENGES.length + THEMED_QUIZZES.length} Active Tracks</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
