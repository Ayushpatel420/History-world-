import { UserNote, Bookmark, Quiz, QuizQuestion } from '../types';

export interface PersonalizedQuizConfig {
  title?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  format: 'mixed' | 'mcq' | 'tf';
  questionCount: number;
  sourceType: 'all' | 'notes_only' | 'bookmarks_only' | 'custom_selection';
  selectedNoteIds?: string[];
  selectedBookmarkIds?: string[];
}

// Sample study items if user has not yet populated their notes or bookmarks
export const SAMPLE_STUDY_NOTES: UserNote[] = [
  {
    id: 'sample_note_1',
    title: 'The Punic Wars & Hannibal’s Strategy',
    targetType: 'Battle',
    content: 'Hannibal Barca invaded the Italian peninsula by crossing the Alps with war elephants in 218 BCE. Despite crushing victories at Trebia, Lake Trasimene, and Cannae (216 BCE), Carthage ultimately lacked the siege equipment and naval supremacy to capture Rome itself, and was defeated at Zama in 202 BCE by Scipio Africanus.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'sample_note_2',
    title: 'Pericles and the Golden Age of Athens',
    targetType: 'Figure',
    content: 'Pericles fostered Athenian democracy in the 5th century BCE, financed the construction of the Parthenon on the Acropolis using Delian League funds, and delivered the famous Funeral Oration celebrating democratic equality and civic courage during the Peloponnesian War.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'sample_note_3',
    title: 'The Magna Carta of 1215',
    targetType: 'Source',
    content: 'King John of England was compelled by rebel barons to sign the Magna Carta at Runnymede in June 1215. Clause 39 established that no free man shall be seized or imprisoned except by lawful judgment of his equals or by the law of the land, laying the foundation for modern habeas corpus and due process.',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'sample_note_4',
    title: 'The Industrial Revolution & Steam Power',
    targetType: 'General',
    content: 'James Watt patented his separate condenser steam engine in 1769, drastically improving efficiency over Thomas Newcomen’s earlier atmospheric engine. This breakthrough mechanized textile manufacturing, accelerated coal mining, and powered the expansion of global railways.',
    createdAt: new Date().toISOString(),
  }
];

export const SAMPLE_BOOKMARKS: Bookmark[] = [
  {
    id: 'sample_bm_1',
    type: 'figure',
    targetId: 'alexander_the_great',
    title: 'Alexander the Great',
    subtitle: 'King of Macedonia and Conqueror of the Persian Empire (356–323 BCE)',
    bookmarkedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'sample_bm_2',
    type: 'source',
    targetId: 'code_of_hammurabi',
    title: 'The Code of Hammurabi',
    subtitle: 'Ancient Babylonian Legal Edict (c. 1750 BCE, Mesopotamia)',
    bookmarkedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'sample_bm_3',
    type: 'event',
    targetId: 'french_revolution_1789',
    title: 'Storming of the Bastille',
    subtitle: 'Symbolic outbreak of the French Revolution on July 14, 1789',
    bookmarkedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

// Historical distractor pools for dynamic options
const HISTORICAL_FIGURES_POOL = [
  'Julius Caesar', 'Alexander the Great', 'Pericles', 'Hannibal Barca', 'Augustus Caesar',
  'Charlemagne', 'Saladin', 'Genghis Khan', 'Napoleon Bonaparte', 'Otto von Bismarck',
  'George Washington', 'Abraham Lincoln', 'Winston Churchill', 'Mahatma Gandhi', 'Nelson Mandela',
  'Ashoka the Great', 'Cyrus the Great', 'Hammurabi', 'Scipio Africanus', 'Marcus Aurelius'
];

const HISTORICAL_PLACES_POOL = [
  'Runnymede, England', 'Athens, Greece', 'Rome, Italy', 'Carthage (modern Tunisia)',
  'Babylon, Mesopotamia', 'Alexandria, Egypt', 'Constantinople (Istanbul)', 'Versailles, France',
  'Philadelphia, Pennsylvania', 'Vienna, Austria', 'Delhi, India', 'Persepolis, Persia'
];

const HISTORICAL_DATES_POOL = [
  '1750 BCE', '490 BCE', '331 BCE', '216 BCE', '44 BCE',
  '1066 CE', '1215 CE', '1453 CE', '1776 CE', '1789 CE', '1815 CE', '1919 CE', '1945 CE'
];

function extractKeywords(text: string): string[] {
  const clean = text.replace(/[^a-zA-Z0-9\s]/g, ' ');
  const words = clean.split(/\s+/).filter(w => w.length > 4);
  const stopWords = new Set([
    'which', 'there', 'their', 'about', 'would', 'could', 'should', 'after', 'before',
    'during', 'these', 'those', 'where', 'because', 'between', 'through', 'under', 'while'
  ]);
  return words.filter(w => !stopWords.has(w.toLowerCase()));
}

function getRandomItems<T>(array: T[], count: number, exclude?: T): T[] {
  const filtered = exclude !== undefined ? array.filter(item => item !== exclude) : [...array];
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Generate personalized questions from a UserNote
 */
function generateQuestionFromNote(note: UserNote, index: number, difficulty: string, format: 'mcq' | 'tf'): QuizQuestion {
  const isTF = format === 'tf';

  // True/False question generation from note content
  if (isTF) {
    const shouldBeTrue = index % 2 === 0;
    const sentences = note.content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 25);
    const primarySentence = sentences[0] || note.content.slice(0, 140);

    if (shouldBeTrue) {
      return {
        id: `personalized_note_q_${note.id}_${index}`,
        question: `Based on your research note "${note.title}": True or False?\n\n"${primarySentence}."`,
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: `True! According to your personal note on "${note.title}": "${primarySentence}."`,
        format: 'tf'
      };
    } else {
      // Invert or alter a historical actor/date/outcome
      let falsifiedSentence = primarySentence;
      if (/was|were/i.test(falsifiedSentence)) {
        falsifiedSentence = falsifiedSentence.replace(/\bwas\b/i, 'was never').replace(/\bwere\b/i, 'were never');
      } else if (/defeated/i.test(falsifiedSentence)) {
        falsifiedSentence = falsifiedSentence.replace(/\bdefeated\b/i, 'was easily conquered by');
      } else if (/established|signed|patented/i.test(falsifiedSentence)) {
        falsifiedSentence = falsifiedSentence.replace(/\b(established|signed|patented)\b/i, 'failed to ratify or authorize');
      } else {
        falsifiedSentence = `In your analysis of ${note.title}, this event is documented as having completely failed with zero historical consequences.`;
      }

      return {
        id: `personalized_note_q_${note.id}_${index}`,
        question: `Based on your research note "${note.title}": True or False?\n\n"${falsifiedSentence}."`,
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: `False! Your note on "${note.title}" confirms: "${primarySentence}."`,
        format: 'tf'
      };
    }
  }

  // MCQ generation:
  // Extract sentences and key facts
  const sentences = note.content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 20);
  const coreSentence = sentences[index % sentences.length] || note.content;

  // Let's create an inquiry about the core premise of their note
  const questionPrompt = `In your personal research note titled "${note.title}", which of the following historical statements is explicitly highlighted?`;

  const correctAnswer = coreSentence.length > 130 ? coreSentence.slice(0, 127) + '...' : coreSentence;

  // Distractors
  const distractors = [
    `The complete collapse of governance occurred without any written treaties or technological adaptation.`,
    `Neighboring empires intervened to nullify all recorded civilian agreements and military movements.`,
    `The primary historical actors abandoned the territory entirely, leaving no archaeological or textual trace.`
  ];

  // Shuffle options
  const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
  const correctIndex = options.indexOf(correctAnswer);

  return {
    id: `personalized_note_q_${note.id}_${index}`,
    question: questionPrompt,
    options,
    correctIndex,
    explanation: `Personalized Study Insight: Derived directly from your saved note "${note.title}" (${note.targetType} category). "${coreSentence}"`,
    format: 'mcq'
  };
}

/**
 * Generate personalized questions from a Bookmark
 */
function generateQuestionFromBookmark(bm: Bookmark, index: number, difficulty: string, format: 'mcq' | 'tf'): QuizQuestion {
  const isTF = format === 'tf';

  if (isTF) {
    const isTrue = index % 2 === 0;
    if (isTrue) {
      return {
        id: `personalized_bm_q_${bm.id}_${index}`,
        question: `True or False: In your curated study bookmarks, "${bm.title}" is categorized under ${bm.type.toUpperCase()} records${bm.subtitle ? ` (${bm.subtitle})` : ''}.`,
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: `True! "${bm.title}" is saved in your personalized archive as a ${bm.type} record.`,
        format: 'tf'
      };
    } else {
      const wrongType = bm.type === 'figure' ? 'naval vessel' : 'modern corporation';
      return {
        id: `personalized_bm_q_${bm.id}_${index}`,
        question: `True or False: In your historical bookmarks, "${bm.title}" is cataloged exclusively as an unverified ${wrongType} myth with no primary documentation.`,
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: `False! "${bm.title}" is cataloged in your bookmarks as a verified historical ${bm.type}${bm.subtitle ? ` (${bm.subtitle})` : ''}.`,
        format: 'tf'
      };
    }
  }

  // MCQ based on bookmark
  const questionPrompt = `You bookmarked "${bm.title}" in your personal research collection. What is the core historical classification or role associated with this entry?`;
  const correctAnswer = bm.subtitle || `Key historical ${bm.type} documented in your study bookmarks`;
  
  const sampleDistractors = [
    `A 20th-century fictional dramatization with no historical antecedent`,
    `An undocumented regional governor who signed no charters`,
    `A ceremonial title with no surviving inscriptions or geopolitical presence`
  ];

  const options = [correctAnswer, ...sampleDistractors].sort(() => 0.5 - Math.random());
  const correctIndex = options.indexOf(correctAnswer);

  return {
    id: `personalized_bm_q_${bm.id}_${index}`,
    question: questionPrompt,
    options,
    correctIndex,
    explanation: `Personalized Study Insight: You bookmarked "${bm.title}" on ${new Date(bm.bookmarkedAt).toLocaleDateString()}. ${bm.subtitle || ''}`,
    format: 'mcq'
  };
}

/**
 * Main Generator Function
 */
export function generatePersonalizedQuiz(
  notes: UserNote[],
  bookmarks: Bookmark[],
  config: PersonalizedQuizConfig
): Quiz {
  // Determine pool of items
  let usableNotes: UserNote[] = [];
  let usableBookmarks: Bookmark[] = [];

  if (config.sourceType === 'notes_only') {
    usableNotes = config.selectedNoteIds && config.selectedNoteIds.length > 0
      ? notes.filter(n => config.selectedNoteIds?.includes(n.id))
      : notes;
  } else if (config.sourceType === 'bookmarks_only') {
    usableBookmarks = config.selectedBookmarkIds && config.selectedBookmarkIds.length > 0
      ? bookmarks.filter(b => config.selectedBookmarkIds?.includes(b.id))
      : bookmarks;
  } else if (config.sourceType === 'custom_selection') {
    usableNotes = notes.filter(n => config.selectedNoteIds?.includes(n.id));
    usableBookmarks = bookmarks.filter(b => config.selectedBookmarkIds?.includes(b.id));
  } else {
    // All
    usableNotes = notes;
    usableBookmarks = bookmarks;
  }

  // Fallback to sample notes/bookmarks if user has none
  if (usableNotes.length === 0 && usableBookmarks.length === 0) {
    usableNotes = SAMPLE_STUDY_NOTES;
    usableBookmarks = SAMPLE_BOOKMARKS;
  }

  const combinedItems: Array<{ type: 'note' | 'bookmark'; data: UserNote | Bookmark }> = [
    ...usableNotes.map(n => ({ type: 'note' as const, data: n })),
    ...usableBookmarks.map(b => ({ type: 'bookmark' as const, data: b }))
  ];

  // Shuffle items to get diverse questions
  const shuffledItems = [...combinedItems].sort(() => 0.5 - Math.random());
  const targetCount = Math.min(Math.max(config.questionCount, 3), 15);

  const questions: QuizQuestion[] = [];
  let itemIndex = 0;

  for (let i = 0; i < targetCount; i++) {
    const currentItem = shuffledItems[itemIndex % shuffledItems.length];
    itemIndex++;

    // Determine format for this question
    let questionFormat: 'mcq' | 'tf' = 'mcq';
    if (config.format === 'tf') {
      questionFormat = 'tf';
    } else if (config.format === 'mixed') {
      questionFormat = i % 2 === 1 ? 'tf' : 'mcq';
    } else {
      questionFormat = 'mcq';
    }

    if (currentItem.type === 'note') {
      questions.push(
        generateQuestionFromNote(currentItem.data as UserNote, i, config.difficulty, questionFormat)
      );
    } else {
      questions.push(
        generateQuestionFromBookmark(currentItem.data as Bookmark, i, config.difficulty, questionFormat)
      );
    }
  }

  const generatedTitle = config.title?.trim() || 
    (usableNotes.length > 0 && usableBookmarks.length > 0
      ? `Personalized Master Trivia (${usableNotes.length} Notes • ${usableBookmarks.length} Bookmarks)`
      : usableNotes.length > 0
        ? `Personal Notes Trivia Challenge (${usableNotes.length} Notes Examined)`
        : `Personal Bookmarks Quiz (${usableBookmarks.length} Bookmarks Included)`);

  return {
    id: `personalized_quiz_${Date.now()}`,
    title: `📜 ${generatedTitle}`,
    description: `A tailor-made historical trivia assessment dynamically compiled from your active research notes and saved bookmarks. Designed for spaced repetition and personalized study mastery.`,
    category: 'Personalized Quiz',
    difficulty: config.difficulty,
    questions
  };
}
