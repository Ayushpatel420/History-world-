export interface ViewedItem {
  id: string;
  title: string;
  category: string;
  region?: string;
  timestamp: number;
}

export interface QuizRecord {
  quizId: string;
  title: string;
  category: string;
  score: number;
  totalQuestions: number;
  difficulty: string;
  timestamp: number;
}

export interface RecommendationStep {
  type: 'article' | 'quiz' | 'vault';
  id: string; // The target ID in the respective tab
  targetTab: 'encyclopedia' | 'quizzes' | 'vaults';
  subTab?: string; // e.g. 'wars', 'kings', 'civilizations'
  label: string;
  description: string;
}

export interface LearningPath {
  id: string;
  title: string;
  subject: string;
  type: 'Advanced Mastery' | 'Introductory Boost' | 'Explorer Path';
  whySuggested: string;
  metricsText: string;
  steps: RecommendationStep[];
  themeColor: string; // Tailored color theme (e.g. yellow, blue, red)
}

// -----------------------------------------------------------------
// Core Tracking Functions
// -----------------------------------------------------------------

export function trackArticleView(item: { id: string; title: string; category: string; region?: string }) {
  try {
    const key = 'chronos_viewed_history_v2';
    const stored = localStorage.getItem(key);
    let history: ViewedItem[] = stored ? JSON.parse(stored) : [];

    // Remove existing to place newest on top
    history = history.filter(h => h.id !== item.id);

    const newItem: ViewedItem = {
      ...item,
      timestamp: Date.now()
    };

    history.unshift(newItem);
    // Keep last 50
    if (history.length > 50) {
      history = history.slice(0, 50);
    }
    localStorage.setItem(key, JSON.stringify(history));

    // Also dispatch a custom event to notify components in real-time
    window.dispatchEvent(new Event('chronos_activity_updated'));
  } catch (error) {
    console.error('Failed to log article view:', error);
  }
}

export function trackQuizCompletion(record: { quizId: string; title: string; category: string; score: number; totalQuestions: number; difficulty: string }) {
  try {
    const key = 'chronos_quizzes_history_v2';
    const stored = localStorage.getItem(key);
    let history: QuizRecord[] = stored ? JSON.parse(stored) : [];

    const newRecord: QuizRecord = {
      ...record,
      timestamp: Date.now()
    };

    history.unshift(newRecord);
    if (history.length > 50) {
      history = history.slice(0, 50);
    }
    localStorage.setItem(key, JSON.stringify(history));

    window.dispatchEvent(new Event('chronos_activity_updated'));
  } catch (error) {
    console.error('Failed to log quiz completion:', error);
  }
}

export function getActivityHistory(): { viewed: ViewedItem[]; quizzes: QuizRecord[] } {
  try {
    const viewedStored = localStorage.getItem('chronos_viewed_history_v2');
    const quizzesStored = localStorage.getItem('chronos_quizzes_history_v2');
    return {
      viewed: viewedStored ? JSON.parse(viewedStored) : [],
      quizzes: quizzesStored ? JSON.parse(quizzesStored) : []
    };
  } catch (e) {
    console.error('Failed to load activity history:', e);
    return { viewed: [], quizzes: [] };
  }
}

// -----------------------------------------------------------------
// Static/Local Recommendation Algorithmic Engine
// -----------------------------------------------------------------

export function computeLocalRecommendations(viewed: ViewedItem[], quizzes: QuizRecord[]): LearningPath[] {
  const paths: LearningPath[] = [];

  // Step 1: Calculate subject stats
  let totalRomanGreekViews = 0;
  let totalRomanGreekQuizAttempts = 0;
  let correctRomanGreekAnswers = 0;
  let totalRomanGreekQuizQuestions = 0;

  let totalEgyptViews = 0;
  let totalEgyptQuizAttempts = 0;
  let correctEgyptAnswers = 0;
  let totalEgyptQuizQuestions = 0;

  let totalIndiaViews = 0;
  let totalIndiaQuizAttempts = 0;
  let correctIndiaAnswers = 0;
  let totalIndiaQuizQuestions = 0;

  // Scan viewed items
  viewed.forEach(v => {
    const text = (v.title + ' ' + v.category + ' ' + (v.region || '')).toLowerCase();
    if (text.includes('roman') || text.includes('greek') || text.includes('macedon') || text.includes('byzantine')) {
      totalRomanGreekViews++;
    } else if (text.includes('egypt') || text.includes('nile') || text.includes('alexandria')) {
      totalEgyptViews++;
    } else if (text.includes('india') || text.includes('mauryan') || text.includes('maratha') || text.includes('mughal') || text.includes('shivaji') || text.includes('ashoka')) {
      totalIndiaViews++;
    }
  });

  // Scan finished quizzes
  quizzes.forEach(q => {
    const qText = (q.title + ' ' + q.category).toLowerCase();
    const accuracy = q.score / (q.totalQuestions || 1);

    if (qText.includes('ancient') || qText.includes('empire') || qText.includes('rome') || qText.includes('greek')) {
      totalRomanGreekQuizAttempts++;
      correctRomanGreekAnswers += q.score;
      totalRomanGreekQuizQuestions += q.totalQuestions;
    }
    if (qText.includes('egypt') || qText.includes('pharaoh') || qText.includes('nile')) {
      totalEgyptQuizAttempts++;
      correctEgyptAnswers += q.score;
      totalEgyptQuizQuestions += q.totalQuestions;
    }
    if (qText.includes('india') || qText.includes('monarch') || qText.includes('subcontinent')) {
      totalIndiaQuizAttempts++;
      correctIndiaAnswers += q.score;
      totalIndiaQuizQuestions += q.totalQuestions;
    }
  });

  // Determine Roman/Greek Mastery status
  const romanGreekQuizScoreRatio = totalRomanGreekQuizQuestions > 0 ? (correctRomanGreekAnswers / totalRomanGreekQuizQuestions) : null;
  const isRomanGreekProficient = (romanGreekQuizScoreRatio !== null && romanGreekQuizScoreRatio >= 0.7) || (totalRomanGreekViews >= 3 && romanGreekQuizScoreRatio === null);
  const isRomanGreekStruggling = romanGreekQuizScoreRatio !== null && romanGreekQuizScoreRatio < 0.6;

  // Determine Egyptian Mastery status
  const egyptQuizScoreRatio = totalEgyptQuizQuestions > 0 ? (correctEgyptAnswers / totalEgyptQuizQuestions) : null;
  const isEgyptProficient = (egyptQuizScoreRatio !== null && egyptQuizScoreRatio >= 0.7) || (totalEgyptViews >= 3 && egyptQuizScoreRatio === null);
  const isEgyptStruggling = (egyptQuizScoreRatio !== null && egyptQuizScoreRatio < 0.6) || (totalEgyptViews > 0 && egyptQuizScoreRatio === null);

  // Determine Indian Mastery status
  const indiaQuizScoreRatio = totalIndiaQuizQuestions > 0 ? (correctIndiaAnswers / totalIndiaQuizQuestions) : null;
  const isIndiaProficient = (indiaQuizScoreRatio !== null && indiaQuizScoreRatio >= 0.7) || (totalIndiaViews >= 3 && indiaQuizScoreRatio === null);
  const isIndiaStruggling = (indiaQuizScoreRatio !== null && indiaQuizScoreRatio < 0.6);

  // ---------------------------------------------------------------
  // Generate Path 1: Roman Imperial Struggles (Advanced vs Intro)
  // ---------------------------------------------------------------
  if (isRomanGreekProficient) {
    paths.push({
      id: 'local_roman_mastery',
      title: 'Hellenic Conquests & Roman Ascendancy',
      subject: 'Classical Roman & Greek Antiquity',
      type: 'Advanced Mastery',
      whySuggested: 'Based on your elite quiz accuracy and intense interest in classical Mediterranean civilization, we suggest you skip general outlines and study dynamic military controversies.',
      metricsText: `Viewed ${totalRomanGreekViews} articles | Quiz Accuracy: ${romanGreekQuizScoreRatio ? Math.round(romanGreekQuizScoreRatio * 100) : 100}%`,
      themeColor: 'from-[#D4AF37]/20 to-amber-950/40 border-[#D4AF37]/50 text-[#E5C158]',
      steps: [
        {
          type: 'article',
          id: 'punic_wars',
          targetTab: 'encyclopedia',
          subTab: 'wars',
          label: 'The Punic Wars (Rome vs. Carthage)',
          description: 'A study on Rome\'s brutal territorial clash with Hannibal Barca determining modern Mediterranean history.'
        },
        {
          type: 'article',
          id: 'carthaginian_civilization',
          targetTab: 'encyclopedia',
          subTab: 'civilizations',
          label: 'Carthaginian Maritime Civilization',
          description: 'Investigate the circular Cothon harbor and mercantile networks that nearly strangled the young Roman Republic.'
        },
        {
          type: 'quiz',
          id: 'ancient_empires_quiz',
          targetTab: 'quizzes',
          label: 'Play Clash of Ancient Empires',
          description: 'Secure your centurion credentials with the comprehensive classical test campaign.'
        }
      ]
    });
  } else if (isRomanGreekStruggling || totalRomanGreekViews > 0) {
    paths.push({
      id: 'local_roman_intro',
      title: 'Foundations of the Classical Republic',
      subject: 'Introduction to Roman History',
      type: 'Introductory Boost',
      whySuggested: 'We noticed a few gaps in your understanding of classical governance. This path reinforces the foundational transitions of Roman statehood.',
      metricsText: `Quiz Score: ${romanGreekQuizScoreRatio ? Math.round(romanGreekQuizScoreRatio * 100) : 0}% accuracy`,
      themeColor: 'from-blue-500/10 to-indigo-950/40 border-blue-500/40 text-blue-450',
      steps: [
        {
          type: 'article',
          id: 'roman_imperial',
          targetTab: 'encyclopedia',
          subTab: 'civilizations',
          label: 'Roman Imperial Civilization',
          description: 'Master the core timeline of Octavian\'s transition from the Republic into standard Autocracy.'
        },
        {
          type: 'article',
          id: 'marcus_aurelius',
          targetTab: 'encyclopedia',
          subTab: 'kings',
          label: 'Marcus Aurelius biography',
          description: 'Analyze legal reforms and Stoic philosophy compiled by the Philosopher King on the Danubian borders.'
        },
        {
          type: 'vault',
          id: 'roman',
          targetTab: 'vaults',
          label: 'Explore Rome\'s Civilisations Vault',
          description: 'Interact with geographical highlights and regional currency histories of the Tiber.'
        }
      ]
    });
  }

  // ---------------------------------------------------------------
  // Generate Path 2: Ancient Egypt Dynasties
  // ---------------------------------------------------------------
  if (isEgyptStruggling || totalEgyptViews > 0 || (quizzes.length > 0 && totalEgyptQuizAttempts === 0)) {
    paths.push({
      id: 'local_egypt_intro',
      title: 'Monuments and Monarchs: Nile Sovereignty',
      subject: 'Ancient Egyptian Dynasties',
      type: 'Introductory Boost',
      whySuggested: 'Egyptian dynastic records require a grasp of distinct periods. We recommend introductory profiles on pharaonic builder campaigns before tackling empire quizzes.',
      metricsText: `Articles Viewed: ${totalEgyptViews} | Quiz Attempts: ${totalEgyptQuizAttempts}`,
      themeColor: 'from-cyan-500/10 to-teal-950/40 border-cyan-500/40 text-cyan-400',
      steps: [
        {
          type: 'article',
          id: 'nile_valley',
          targetTab: 'encyclopedia',
          subTab: 'civilizations',
          label: 'Nile Valley Ancient Egypt',
          description: 'Examine hierarchical funerary cosmologies and solar flood metrics that generated monumental wealth.'
        },
        {
          type: 'article',
          id: 'hatshepsut',
          targetTab: 'encyclopedia',
          subTab: 'kings',
          label: 'Hatshepsut (Female Pharaoh)',
          description: 'Study how the female leader legitimized her power and conducted commercial delegations to the Land of Punt.'
        },
        {
          type: 'article',
          id: 'ramesses_ii',
          targetTab: 'encyclopedia',
          subTab: 'kings',
          label: 'Pharaoh Ramesses II',
          description: 'Learn about the builder of Abu Simbel and the world\'s oldest recorded international peace treaty.'
        },
        {
          type: 'quiz',
          id: 'ancient_empires_quiz',
          targetTab: 'quizzes',
          label: 'Attempt the Ancient Empires Quiz',
          description: 'Re-test your knowledge of Hatshepsut and Nile rulers to unlock higher XP rewards.'
        }
      ]
    });
  } else if (isEgyptProficient) {
    paths.push({
      id: 'local_egypt_mastery',
      title: 'Ptolemaic Twilight & Greco-Roman Alexandria',
      subject: 'Late Pharaonic Egypt',
      type: 'Advanced Mastery',
      whySuggested: 'You have perfectly mastered the Early Kingdoms of Egypt! Next, study the sophisticated cultural synthesis and tragic collapse of Hellenistic Alexandria.',
      metricsText: 'Mastery verified | 100% Foundation score',
      themeColor: 'from-[#D4AF37]/20 to-cyan-950/30 border-[#D4AF37]/40 text-[#E5C158]',
      steps: [
        {
          type: 'article',
          id: 'cleopatra_vii',
          targetTab: 'encyclopedia',
          subTab: 'kings',
          label: 'Biography of Cleopatra VII Philopator',
          description: 'Investigate the last Queen\'s clever diplomatic maneuvers with Julius Caesar and Mark Antony.'
        },
        {
          type: 'article',
          id: 'byzantine_con',
          targetTab: 'encyclopedia',
          subTab: 'civilizations',
          label: 'Byzantine Eastern Roman Empire',
          description: 'Explore the continuation of Greek-speaking Roman rule across administrative capitals.'
        }
      ]
    });
  }

  // ---------------------------------------------------------------
  // Generate Path 3: Indian Rulers & Philosophies
  // ---------------------------------------------------------------
  if (isIndiaStruggling || totalIndiaViews > 0 || quizzes.some(q => q.title.toLowerCase().includes('india'))) {
    const isProf = isIndiaProficient;
    paths.push({
      id: 'local_india_path',
      title: isProf ? 'Preeminent Sovereigns of the Maratha & Mughal Core' : 'Spiritual & Imperial Realms of India',
      subject: 'Indian Subcontinent Dynasties',
      type: isProf ? 'Advanced Mastery' : 'Introductory Boost',
      whySuggested: isProf 
        ? 'Because you have correctly outlined Mauryan and Mughal governance, we recommend investigating tactical guerrilla defensive operations and sea forts.'
        : 'Explore the core spiritual shifts (Buddhism conversion) and integration reforms that defined ancient and classical Indian world empires.',
      metricsText: `Interact Score: ${indiaQuizScoreRatio ? Math.round(indiaQuizScoreRatio * 100) : 0}% accuracy`,
      themeColor: isProf ? 'from-amber-500/10 to-orange-950/40 border-orange-500/45 text-orange-400' : 'from-purple-500/10 to-purple-950/40 border-purple-500/40 text-purple-400',
      steps: isProf ? [
        {
          type: 'article',
          id: 'akbar_great',
          targetTab: 'encyclopedia',
          subTab: 'kings',
          label: 'Akbar the Great (Mughal Era)',
          description: 'Learn how Akbar established interfaith councils and achieved 25% of Global GDP.'
        },
        {
          type: 'article',
          id: 'shivaji_maharaj',
          targetTab: 'encyclopedia',
          subTab: 'kings',
          label: 'Shivaji Maharaj (Maratha Empire)',
          description: 'Analyze the Asthapradhan prime eight-minister cabinet and naval maritime fortress installations.'
        }
      ] : [
        {
          type: 'article',
          id: 'ashoka_great',
          targetTab: 'encyclopedia',
          subTab: 'kings',
          label: 'Emperor Ashoka the Great',
          description: 'Understand the pivotal convert to Buddhism following the bloody conquest of Kalinga.'
        },
        {
          type: 'quiz',
          id: 'indian_monarchs_quiz',
          targetTab: 'quizzes',
          label: 'Attempt Dynasties of India Quiz',
          description: 'Learn and memorize the key achievements of Shivaji Maharaj and Akbar.'
        }
      ]
    });
  }

  // If no activity yet, seed healthy default Explorer paths
  if (paths.length === 0) {
    paths.push({
      id: 'default_egypt',
      title: 'Sovereigns of the Nile Valley',
      subject: 'Dynastic Egyptian Foundations',
      type: 'Explorer Path',
      whySuggested: 'Initiate your Chronos voyage by exploring the highly preserved builder campaigns of Hatshepsut and Giza.',
      metricsText: 'No exploration data yet (Beginner Dossier)',
      themeColor: 'from-[#D4AF37]/10 to-amber-950/40 border-amber-500/30 text-[#E5C158]',
      steps: [
        {
          type: 'article',
          id: 'nile_valley',
          targetTab: 'encyclopedia',
          subTab: 'civilizations',
          label: 'Nile Valley Ancient Egypt',
          description: 'Review the 3000-year history of Pharaonic cosmology and structural geometry.'
        },
        {
          type: 'quiz',
          id: 'ancient_empires_quiz',
          targetTab: 'quizzes',
          label: 'Attempt Coliseum Quiz',
          description: 'Resolve entry-level MCQ queries to unlock your first 500 Coliseum EXP.'
        }
      ]
    });

    paths.push({
      id: 'default_rome',
      title: 'Evolving Power: Roman Republic to Empire',
      subject: 'Roman Imperial Beginnings',
      type: 'Explorer Path',
      whySuggested: 'Unpack the structural legal frameworks and volcanic concrete inventions that founded Mediterranean trade.',
      metricsText: 'Syllabus Pre-loaded',
      themeColor: 'from-blue-500/5 to-[#1F2C3D] border-blue-500/30 text-blue-450',
      steps: [
        {
          type: 'article',
          id: 'roman_imperial',
          targetTab: 'encyclopedia',
          subTab: 'civilizations',
          label: 'Roman Imperial Civilization',
          description: 'Study the Roman administrative Pax Romana and the eventual survival of Byzantium.'
        },
        {
          type: 'quiz',
          id: 'ancient_empires_quiz',
          targetTab: 'quizzes',
          label: 'Attempt Coliseum Quiz',
          description: 'Try the Roman Republic, Caesar, and Augustus questions.'
        }
      ]
    });
  }

  return paths;
}
