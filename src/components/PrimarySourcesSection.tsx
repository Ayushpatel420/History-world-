import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Scroll, 
  Search, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Bookmark as BookmarkIcon, 
  FileEdit, 
  ChevronLeft,
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles, 
  Globe, 
  Calendar, 
  MapPin, 
  ShieldAlert, 
  BookOpen, 
  CheckCircle2, 
  Share2, 
  Award, 
  ExternalLink,
  Shuffle,
  Languages,
  Clock,
  ArrowDown
} from 'lucide-react';
import { ALL_PRIMARY_SOURCES_AND_SPEECHES, PrimarySourceDocument, KeyClause } from '../data/allPrimarySources';
import { UserNote, Bookmark } from '../types';

export interface ChronologicalInfo {
  percent: number; // 0 to 100 on global historical timeline
  eraTitle: string;
  eraShort: string;
  eraColor: string;
  eraBorderColor: string;
  eraBgColor: string;
  timelineLabel: string;
  approxAgeYears: number;
}

export function getChronologicalInfo(year: number, yearDisplay: string): ChronologicalInfo {
  // Global historical timeline range: 2500 BCE (-2500) to 2025 CE (2025)
  // Total continuum span = 4525 years
  const minYear = -2500;
  const maxYear = 2025;
  const clampedYear = Math.max(minYear, Math.min(maxYear, year));
  const rawPercent = ((clampedYear - minYear) / (maxYear - minYear)) * 100;
  const percent = Math.max(2, Math.min(98, Math.round(rawPercent * 10) / 10));

  const currentYear = 2026;
  const approxAgeYears = currentYear - year;

  let eraTitle = 'Ancient Antiquity (Bronze & Iron Age)';
  let eraShort = 'Antiquity';
  let eraColor = '#D97706'; // warm amber/bronze
  let eraBorderColor = 'border-amber-600/40';
  let eraBgColor = 'bg-amber-950/40 text-amber-300';

  if (year < -500) {
    eraTitle = 'Ancient Antiquity (~2500 – 500 BCE)';
    eraShort = 'Antiquity';
    eraColor = '#D97706'; // warm bronze
    eraBorderColor = 'border-amber-600/40';
    eraBgColor = 'bg-amber-950/40 text-amber-300';
  } else if (year >= -500 && year < 500) {
    eraTitle = 'Classical Greco-Roman & Axial Age (500 BCE – 500 CE)';
    eraShort = 'Classical';
    eraColor = '#EAB308'; // gold
    eraBorderColor = 'border-yellow-500/40';
    eraBgColor = 'bg-yellow-950/40 text-yellow-300';
  } else if (year >= 500 && year < 1500) {
    eraTitle = 'Medieval & Post-Classical (500 – 1500 CE)';
    eraShort = 'Medieval';
    eraColor = '#10B981'; // emerald
    eraBorderColor = 'border-emerald-500/40';
    eraBgColor = 'bg-emerald-950/40 text-emerald-300';
  } else if (year >= 1500 && year < 1800) {
    eraTitle = 'Early Modern & Enlightenment (1500 – 1800 CE)';
    eraShort = 'Early Modern';
    eraColor = '#06B6D4'; // cyan
    eraBorderColor = 'border-cyan-500/40';
    eraBgColor = 'bg-cyan-950/40 text-cyan-300';
  } else if (year >= 1800 && year < 1914) {
    eraTitle = '19th Century & Industrial Era (1800 – 1914 CE)';
    eraShort = '19th Century';
    eraColor = '#8B5CF6'; // violet
    eraBorderColor = 'border-purple-500/40';
    eraBgColor = 'bg-purple-950/40 text-purple-300';
  } else if (year >= 1914 && year < 1945) {
    eraTitle = 'World Wars Era (1914 – 1945 CE)';
    eraShort = 'World Wars';
    eraColor = '#EF4444'; // red
    eraBorderColor = 'border-red-500/40';
    eraBgColor = 'bg-red-950/40 text-red-300';
  } else {
    eraTitle = 'Post-War & Contemporary (1945 CE – Present)';
    eraShort = 'Contemporary';
    eraColor = '#3B82F6'; // blue
    eraBorderColor = 'border-blue-500/40';
    eraBgColor = 'bg-blue-950/40 text-blue-300';
  }

  const timelineLabel = approxAgeYears > 1000 
    ? `~${(approxAgeYears / 1000).toFixed(1)}k yrs ago`
    : `${approxAgeYears} yrs ago`;

  return {
    percent,
    eraTitle,
    eraShort,
    eraColor,
    eraBorderColor,
    eraBgColor,
    timelineLabel,
    approxAgeYears
  };
}

export interface ParsedTranslation {
  hasDualText: boolean;
  originalText: string;
  englishText: string;
  isNativeEnglish: boolean;
  sourceLanguageLabel: string;
}

export function parseSourceTranslation(rawText: string, originalLanguage: string): ParsedTranslation {
  const isEnglishNative = originalLanguage.toLowerCase().includes('english');
  
  // Translation delimiter regex matching patterns like:
  // (Historical Translation for Educational Study: ...)
  // (Historical Translation: ...)
  // (English Translation: ...)
  // [English Translation: ...]
  const translationRegex = /(?:\r?\n\s*)?(?:\(|\[)?(?:Historical Translation for Educational Study|Historical Translation|English Translation|Translation)\s*:\s*([\s\S]+?)(?:\)|\])?\s*$/i;
  
  const match = rawText.match(translationRegex);
  if (match) {
    const originalPart = rawText.slice(0, match.index).trim();
    let englishPart = match[1].trim();
    if (englishPart.endsWith(')') && !englishPart.includes('(')) {
      englishPart = englishPart.slice(0, -1).trim();
    }
    if (englishPart.endsWith(']') && !englishPart.includes('[')) {
      englishPart = englishPart.slice(0, -1).trim();
    }
    
    return {
      hasDualText: true,
      originalText: originalPart,
      englishText: englishPart,
      isNativeEnglish: false,
      sourceLanguageLabel: originalLanguage
    };
  }
  
  return {
    hasDualText: false,
    originalText: rawText,
    englishText: rawText,
    isNativeEnglish: isEnglishNative,
    sourceLanguageLabel: originalLanguage
  };
}

interface PrimarySourcesSectionProps {
  onAddNote: (title: string, content: string, type: UserNote['targetType'], targetId?: string) => void;
  onToggleBookmark: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  bookmarks: Bookmark[];
}

export default function PrimarySourcesSection({
  onAddNote,
  onToggleBookmark,
  bookmarks
}: PrimarySourcesSectionProps) {
  const [selectedSource, setSelectedSource] = useState<PrimarySourceDocument>(ALL_PRIMARY_SOURCES_AND_SPEECHES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [thematicFilter, setThematicFilter] = useState<'all' | 'ww1' | 'ww2' | 'edu_hitler' | 'bilingual' | 'liberation' | 'ancient_rulers' | 'china' | 'india' | 'greco_roman' | 'europe' | 'japan_asia' | 'russia' | 'egypt_near_east' | 'americas' | 'africa'>('all');
  const [activeTab, setActiveTab] = useState<'excerpt' | 'clauses' | 'context'>('excerpt');
  const [excerptSearchQuery, setExcerptSearchQuery] = useState<string>('');

  // Speeches 300-per-page pagination
  const SPEECHES_PER_PAGE = 300;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const catalogContainerRef = useRef<HTMLDivElement>(null);

  // Translation View Mode: English Translation | Original Language | Side-by-Side Parallel | Full Archive Record
  const [translationMode, setTranslationMode] = useState<'english' | 'original' | 'parallel' | 'full'>('english');
  const [copiedTranslation, setCopiedTranslation] = useState(false);

  // Reset pagination to page 1 whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedEra, selectedCategory, thematicFilter]);

  // Speech Narration States & AI Audio Engine
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [activePlayingSourceId, setActivePlayingSourceId] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [selectedAiVoice, setSelectedAiVoice] = useState<'Fenrir' | 'Zephyr' | 'Kore' | 'Puck' | 'Charon'>('Fenrir');
  const [isGeneratingAiSpeech, setIsGeneratingAiSpeech] = useState(false);
  const [audioPlaybackMode, setAudioPlaybackMode] = useState<'ai' | 'natural'>('ai');
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const aiAudioCache = useRef<Record<string, string>>({});
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastSourceScrollPos = useRef<number>(0);
  const lastSourceId = useRef<string | null>(null);

  const handleSelectSource = (source: PrimarySourceDocument) => {
    lastSourceScrollPos.current = window.scrollY;
    lastSourceId.current = source.id;
    if (isPlayingAudio || isAudioPaused) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
      setActivePlayingSourceId(null);
    }
    setSelectedSource(source);
    setExcerptSearchQuery('');

    // Smoothly scroll to the upper part (Reader)
    setTimeout(() => {
      const readerEl = document.getElementById('primary-sources-reader');
      if (readerEl) {
        readerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }, 40);
  };

  const handleReturnToCatalog = () => {
    const returnId = lastSourceId.current || selectedSource.id;
    const returnY = lastSourceScrollPos.current;

    setTimeout(() => {
      if (returnId) {
        const cardEl = document.getElementById(`source-card-${returnId}`);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          cardEl.classList.add('ring-2', 'ring-[#D4AF37]', 'transition-all', 'duration-500');
          setTimeout(() => {
            cardEl.classList.remove('ring-2', 'ring-[#D4AF37]');
          }, 1800);
          return;
        }
      }
      window.scrollTo({ top: returnY, behavior: 'smooth' });
    }, 40);
  };

  // Current parsed translation of the selected source
  const parsedTranslation = useMemo(
    () => parseSourceTranslation(selectedSource.fullExcerptText, selectedSource.originalLanguage),
    [selectedSource.fullExcerptText, selectedSource.originalLanguage]
  );

  // Filter sources
  const filteredSources = ALL_PRIMARY_SOURCES_AND_SPEECHES.filter((src) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      src.title.toLowerCase().includes(query) ||
      src.authorOrRuler.toLowerCase().includes(query) ||
      src.civilization.toLowerCase().includes(query) ||
      src.famousQuote.toLowerCase().includes(query) ||
      src.summary.toLowerCase().includes(query) ||
      src.id.toLowerCase().includes(query) ||
      src.originalLanguage.toLowerCase().includes(query) ||
      src.fullExcerptText.toLowerCase().includes(query);

    const matchesEra = selectedEra === 'All' || 
      src.era === selectedEra ||
      (selectedEra === '20th Century / Modern' && (src.era === '20th Century' || src.era === 'Modern' || src.era === 'Contemporary'));
      
    const matchesCategory = selectedCategory === 'All' || src.category === selectedCategory;

    // Thematic shortcuts
    let matchesTheme = true;
    if (thematicFilter === 'ww1') {
      matchesTheme = 
        src.id.startsWith('ww1_') || 
        src.civilization.toLowerCase().includes('world war i') ||
        src.title.toLowerCase().includes('world war i') ||
        (src.year >= 1914 && src.year <= 1918);
    } else if (thematicFilter === 'ww2') {
      matchesTheme = 
        src.id.startsWith('ww2_') || 
        src.civilization.toLowerCase().includes('world war ii') ||
        src.title.toLowerCase().includes('world war ii') ||
        (src.year >= 1939 && src.year <= 1945 && !src.id.startsWith('edu_hitler'));
    } else if (thematicFilter === 'edu_hitler') {
      matchesTheme = 
        src.id.startsWith('edu_hitler') || 
        src.authorOrRuler.toLowerCase().includes('hitler') ||
        src.authorOrRuler.toLowerCase().includes('goebbels');
    } else if (thematicFilter === 'bilingual') {
      matchesTheme = 
        src.id.startsWith('edu_hitler') || 
        src.fullExcerptText.includes('Translation') ||
        src.originalLanguage.toLowerCase().includes('german') ||
        src.originalLanguage.toLowerCase().includes('latin') ||
        src.originalLanguage.toLowerCase().includes('greek') ||
        src.originalLanguage.toLowerCase().includes('french') ||
        src.originalLanguage.toLowerCase().includes('chinese') ||
        src.originalLanguage.toLowerCase().includes('sanskrit');
    } else if (thematicFilter === 'liberation') {
      matchesTheme = 
        src.category === 'Human Rights & Declarations' || 
        src.title.toLowerCase().includes('liberty') ||
        src.title.toLowerCase().includes('freedom') ||
        src.title.toLowerCase().includes('rights');
    } else if (thematicFilter === 'ancient_rulers') {
      matchesTheme = 
        src.id.startsWith('china_') || 
        src.id.startsWith('india_') || 
        src.id.startsWith('greek_') || 
        src.id.startsWith('roman_') || 
        src.id.startsWith('europe_') || 
        src.id.startsWith('japan_') || 
        src.id.startsWith('korea_') || 
        src.id.startsWith('russian_') || 
        src.id.startsWith('egypt_') || 
        src.id.startsWith('persia_') || 
        src.id.startsWith('islamic_') || 
        src.id.startsWith('ottoman_') || 
        src.id.startsWith('americas_') || 
        src.id.startsWith('anc_') ||
        src.id.startsWith('ruler_') ||
        src.authorTitle.toLowerCase().includes('king') ||
        src.authorTitle.toLowerCase().includes('queen') ||
        src.authorTitle.toLowerCase().includes('emperor') ||
        src.authorTitle.toLowerCase().includes('empress') ||
        src.authorTitle.toLowerCase().includes('pharaoh') ||
        src.authorTitle.toLowerCase().includes('sultan') ||
        src.authorTitle.toLowerCase().includes('tsar') ||
        src.authorTitle.toLowerCase().includes('monarch') ||
        src.authorTitle.toLowerCase().includes('maharaja') ||
        src.authorTitle.toLowerCase().includes('shogun') ||
        src.authorTitle.toLowerCase().includes('khan') ||
        src.authorTitle.toLowerCase().includes('caliph') ||
        src.authorTitle.toLowerCase().includes('chhatrapati') ||
        src.authorTitle.toLowerCase().includes('tlatoani') ||
        src.authorTitle.toLowerCase().includes('inca') ||
        src.authorTitle.toLowerCase().includes('mansa') ||
        src.authorTitle.toLowerCase().includes('oba') ||
        src.authorTitle.toLowerCase().includes('chief');
    } else if (thematicFilter === 'china') {
      matchesTheme = 
        src.id.startsWith('china_') || 
        src.id.startsWith('ruler_china_') || 
        src.civilization.toLowerCase().includes('china') || 
        src.civilization.toLowerCase().includes('chinese') ||
        src.civilization.toLowerCase().includes('tang') ||
        src.civilization.toLowerCase().includes('han') ||
        src.civilization.toLowerCase().includes('song') ||
        src.civilization.toLowerCase().includes('ming') ||
        src.civilization.toLowerCase().includes('qing') ||
        src.civilization.toLowerCase().includes('zhou') ||
        src.civilization.toLowerCase().includes('qin');
    } else if (thematicFilter === 'india') {
      matchesTheme = 
        src.id.startsWith('india_') || 
        src.id.startsWith('ruler_india_') || 
        src.civilization.toLowerCase().includes('india') || 
        src.civilization.toLowerCase().includes('maurya') ||
        src.civilization.toLowerCase().includes('mughal') ||
        src.civilization.toLowerCase().includes('chola') ||
        src.civilization.toLowerCase().includes('gupta') ||
        src.civilization.toLowerCase().includes('maratha') ||
        src.civilization.toLowerCase().includes('sikh') ||
        src.civilization.toLowerCase().includes('vedic');
    } else if (thematicFilter === 'greco_roman') {
      matchesTheme = 
        src.id.startsWith('greek_') || 
        src.id.startsWith('roman_') || 
        src.id.startsWith('ruler_grk_') || 
        src.id.startsWith('ruler_rom_') || 
        src.civilization.toLowerCase().includes('rome') || 
        src.civilization.toLowerCase().includes('roman') || 
        src.civilization.toLowerCase().includes('greece') || 
        src.civilization.toLowerCase().includes('greek') || 
        src.civilization.toLowerCase().includes('athens') || 
        src.civilization.toLowerCase().includes('sparta') ||
        src.civilization.toLowerCase().includes('macedon') ||
        src.civilization.toLowerCase().includes('byzantine');
    } else if (thematicFilter === 'europe') {
      matchesTheme = 
        src.id.startsWith('europe_') || 
        src.id.startsWith('ruler_europe_') || 
        src.civilization.toLowerCase().includes('england') || 
        src.civilization.toLowerCase().includes('france') || 
        src.civilization.toLowerCase().includes('prussia') || 
        src.civilization.toLowerCase().includes('frankish') ||
        src.civilization.toLowerCase().includes('carolingian') ||
        src.civilization.toLowerCase().includes('holy roman') ||
        src.civilization.toLowerCase().includes('spain');
    } else if (thematicFilter === 'japan_asia') {
      matchesTheme = 
        src.id.startsWith('japan_') || 
        src.id.startsWith('korea_') || 
        src.id.startsWith('ruler_japan_') || 
        src.id.startsWith('ruler_korea_') || 
        src.id.startsWith('ruler_steppe_') || 
        src.civilization.toLowerCase().includes('japan') || 
        src.civilization.toLowerCase().includes('korea') || 
        src.civilization.toLowerCase().includes('shogun') ||
        src.civilization.toLowerCase().includes('yamato') ||
        src.civilization.toLowerCase().includes('goryeo') ||
        src.civilization.toLowerCase().includes('joseon') ||
        src.civilization.toLowerCase().includes('silla') ||
        src.civilization.toLowerCase().includes('mongol') ||
        src.civilization.toLowerCase().includes('steppe') ||
        src.civilization.toLowerCase().includes('turkic');
    } else if (thematicFilter === 'russia') {
      matchesTheme = 
        src.id.startsWith('russian_') || 
        (src.id.startsWith('ruler_europe_') && (src.civilization.toLowerCase().includes('russia') || src.authorOrRuler.toLowerCase().includes('peter') || src.authorOrRuler.toLowerCase().includes('catherine'))) ||
        src.civilization.toLowerCase().includes('russia') || 
        src.civilization.toLowerCase().includes('rus') ||
        src.civilization.toLowerCase().includes('slavic');
    } else if (thematicFilter === 'egypt_near_east') {
      matchesTheme = 
        src.id.startsWith('egypt_') || 
        src.id.startsWith('persia_') || 
        src.id.startsWith('islamic_') || 
        src.id.startsWith('ottoman_') || 
        src.id.startsWith('ruler_ne_') || 
        src.id.startsWith('ruler_islamic_') || 
        src.civilization.toLowerCase().includes('egypt') || 
        src.civilization.toLowerCase().includes('persia') || 
        src.civilization.toLowerCase().includes('babylon') || 
        src.civilization.toLowerCase().includes('mesopotamia') || 
        src.civilization.toLowerCase().includes('assyria') || 
        src.civilization.toLowerCase().includes('sumer') || 
        src.civilization.toLowerCase().includes('hittite') || 
        src.civilization.toLowerCase().includes('ottoman') ||
        src.civilization.toLowerCase().includes('caliph');
    } else if (thematicFilter === 'americas') {
      matchesTheme = 
        src.id.startsWith('americas_') || 
        src.id.startsWith('ruler_americas_') || 
        src.civilization.toLowerCase().includes('aztec') || 
        src.civilization.toLowerCase().includes('maya') || 
        src.civilization.toLowerCase().includes('inca') || 
        src.civilization.toLowerCase().includes('iroquois') || 
        src.civilization.toLowerCase().includes('shawnee') || 
        src.civilization.toLowerCase().includes('nez perce') || 
        src.civilization.toLowerCase().includes('powhatan') || 
        src.civilization.toLowerCase().includes('suquamish') ||
        src.civilization.toLowerCase().includes('americas');
    } else if (thematicFilter === 'africa') {
      matchesTheme = 
        src.id.startsWith('ruler_africa_') || 
        src.civilization.toLowerCase().includes('mali') || 
        src.civilization.toLowerCase().includes('songhai') || 
        src.civilization.toLowerCase().includes('aksum') || 
        src.civilization.toLowerCase().includes('ethiopia') || 
        src.civilization.toLowerCase().includes('benin') || 
        src.civilization.toLowerCase().includes('ashanti') || 
        src.civilization.toLowerCase().includes('zulu') || 
        src.civilization.toLowerCase().includes('africa');
    }

    return matchesSearch && matchesEra && matchesCategory && matchesTheme;
  });

  // Pick a random inspirational speech from the vault
  const handleRandomSpeech = () => {
    const randomIndex = Math.floor(Math.random() * ALL_PRIMARY_SOURCES_AND_SPEECHES.length);
    const chosen = ALL_PRIMARY_SOURCES_AND_SPEECHES[randomIndex];
    setSelectedSource(chosen);
    setActionNotice(`Discovered: "${chosen.title}" by ${chosen.authorOrRuler} (${chosen.yearDisplay})`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatAudioTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeekAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(e.target.value);
    setAudioProgress(percent);
    if (audioElementRef.current && audioDuration > 0) {
      audioElementRef.current.currentTime = (percent / 100) * audioDuration;
      setAudioCurrentTime(audioElementRef.current.currentTime);
    }
  };

  // Play audio using HTML5 Audio element from WAV data URL
  const playAudioUrl = (audioUrl: string, sourceId: string) => {
    if (!audioElementRef.current) {
      audioElementRef.current = new Audio();
    }
    const audio = audioElementRef.current;
    audio.pause();
    audio.src = audioUrl;
    audio.playbackRate = speechRate;

    audio.ontimeupdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setAudioCurrentTime(audio.currentTime);
        setAudioDuration(audio.duration);
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onended = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
      setActivePlayingSourceId(null);
      setAudioProgress(0);
      setAudioCurrentTime(0);
    };

    audio.onerror = (e) => {
      console.warn('Audio playback error, falling back to speech synthesis:', e);
      fallbackSpeechSynthesis(sourceId);
    };

    audio.play().then(() => {
      setIsPlayingAudio(true);
      setIsAudioPaused(false);
      setActivePlayingSourceId(sourceId);
    }).catch(err => {
      console.warn('Audio play failed, falling back:', err);
      fallbackSpeechSynthesis(sourceId);
    });
  };

  const fallbackSpeechSynthesis = (sourceId: string) => {
    const sourceObj = ALL_PRIMARY_SOURCES_AND_SPEECHES.find(s => s.id === sourceId) || selectedSource;
    const parsed = parseSourceTranslation(sourceObj.fullExcerptText, sourceObj.originalLanguage);
    const speechText = sourceObj.audioSpeechText || 
      `${sourceObj.title}, proclaimed in ${sourceObj.yearDisplay} by ${sourceObj.authorOrRuler}. Key excerpt: ${sourceObj.famousQuote}. Historical excerpt: ${parsed.englishText || sourceObj.fullExcerptText}`;

    if (!('speechSynthesis' in window)) {
      setActionNotice('Speech audio is currently unavailable.');
      setTimeout(() => setActionNotice(null), 3000);
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = speechRate;
    utterance.pitch = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Oliver') || v.name.includes('Google') || v.name.includes('Samantha'))
    );
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
      setActivePlayingSourceId(null);
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
      setActivePlayingSourceId(null);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsAudioPaused(false);
    setActivePlayingSourceId(sourceId);
  };

  // Audio speech synthesis & AI Voice controller: supports listening to any source or the active selected source
  const handleTogglePlaySource = async (sourceToPlay: PrimarySourceDocument = selectedSource) => {
    // 1. If currently playing or paused on this exact source, toggle pause/resume
    if (activePlayingSourceId === sourceToPlay.id) {
      if (isPlayingAudio) {
        if (audioElementRef.current && !audioElementRef.current.paused) {
          audioElementRef.current.pause();
        } else if ('speechSynthesis' in window) {
          window.speechSynthesis.pause();
        }
        setIsAudioPaused(true);
        setIsPlayingAudio(false);
        return;
      } else if (isAudioPaused) {
        if (audioElementRef.current && audioElementRef.current.src) {
          audioElementRef.current.play();
        } else if ('speechSynthesis' in window) {
          window.speechSynthesis.resume();
        }
        setIsAudioPaused(false);
        setIsPlayingAudio(true);
        return;
      }
    }

    // 2. Stop any existing audio
    handleStopAudio();

    // Synchronize selectedSource so the reader showcases the source being spoken
    if (selectedSource.id !== sourceToPlay.id) {
      setSelectedSource(sourceToPlay);
      setExcerptSearchQuery('');
    }
    setActivePlayingSourceId(sourceToPlay.id);

    // 3. Extract speech text: prefer audioSpeechText or clean translation text
    const parsed = parseSourceTranslation(sourceToPlay.fullExcerptText, sourceToPlay.originalLanguage);
    const speechText = sourceToPlay.audioSpeechText || 
      `${sourceToPlay.title}, delivered in ${sourceToPlay.yearDisplay} by ${sourceToPlay.authorOrRuler}. Key excerpt: ${sourceToPlay.famousQuote}. Historical address text: ${parsed.englishText || sourceToPlay.fullExcerptText}`;

    // 4. If AI voice mode is active, check cache or call endpoint
    if (audioPlaybackMode === 'ai') {
      const cacheKey = `${sourceToPlay.id}_${selectedAiVoice}`;
      if (aiAudioCache.current[cacheKey]) {
        playAudioUrl(aiAudioCache.current[cacheKey], sourceToPlay.id);
        return;
      }

      setIsGeneratingAiSpeech(true);
      try {
        const response = await fetch('/api/gemini/generate-speech', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: speechText,
            speechId: sourceToPlay.id,
            voice: selectedAiVoice,
            speaker: sourceToPlay.authorOrRuler,
            title: sourceToPlay.title,
          })
        });

        const data = await response.json();
        if (data.audioUrl) {
          aiAudioCache.current[cacheKey] = data.audioUrl;
          playAudioUrl(data.audioUrl, sourceToPlay.id);
        } else {
          fallbackSpeechSynthesis(sourceToPlay.id);
        }
      } catch (err) {
        console.warn('AI speech generation failed, using browser synthesis:', err);
        fallbackSpeechSynthesis(sourceToPlay.id);
      } finally {
        setIsGeneratingAiSpeech(false);
      }
    } else {
      fallbackSpeechSynthesis(sourceToPlay.id);
    }
  };

  const handlePlayAudio = () => {
    handleTogglePlaySource(selectedSource);
  };

  const handlePauseAudio = () => {
    if (audioElementRef.current && !audioElementRef.current.paused) {
      audioElementRef.current.pause();
    } else if ('speechSynthesis' in window && isPlayingAudio) {
      window.speechSynthesis.pause();
    }
    setIsAudioPaused(true);
    setIsPlayingAudio(false);
  };

  const handleStopAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsAudioPaused(false);
    setActivePlayingSourceId(null);
    setAudioProgress(0);
    setAudioCurrentTime(0);
  };

  // Add source to research notebook
  const handleSaveToNotes = () => {
    const title = `Primary Source: ${selectedSource.title} (${selectedSource.yearDisplay})`;
    const content = `AUTHOR / RULER: ${selectedSource.authorOrRuler} (${selectedSource.authorTitle})
CIVILIZATION: ${selectedSource.civilization} [${selectedSource.location}]
FAMOUS QUOTE: "${selectedSource.famousQuote}"

HISTORICAL SUMMARY:
${selectedSource.summary}

KEY IMPACT ON HUMAN CIVILIZATION:
${selectedSource.lastingImpact}

ORIGINAL FORMAT / PRESERVATION:
${selectedSource.mediumOrFormat} — Currently preserved at ${selectedSource.currentPreservationLocation}`;

    onAddNote(title, content, 'General', selectedSource.id);
    setActionNotice(`Added "${selectedSource.title}" to your research notebook!`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Bookmark toggle
  const isBookmarked = bookmarks.some(b => b.targetId === selectedSource.id);
  const handleToggleThisBookmark = () => {
    onToggleBookmark(
      selectedSource.id,
      'article',
      selectedSource.title,
      `${selectedSource.authorOrRuler} • ${selectedSource.yearDisplay}`
    );
    setActionNotice(isBookmarked ? 'Removed from saved bookmarks' : 'Bookmarked primary source!');
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Pagination calculation and navigation for 300 speeches per batch
  const totalPages = Math.max(1, Math.ceil(filteredSources.length / SPEECHES_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * SPEECHES_PER_PAGE;
  const endIndex = Math.min(startIndex + SPEECHES_PER_PAGE, filteredSources.length);
  const displayedSources = filteredSources.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (safeCurrentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      if (catalogContainerRef.current) {
        catalogContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevPage = () => {
    if (safeCurrentPage > 1) {
      setCurrentPage(prev => prev - 1);
      if (catalogContainerRef.current) {
        catalogContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleGoToPage = (pageNum: number) => {
    setCurrentPage(pageNum);
    if (catalogContainerRef.current) {
      catalogContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyCitation = () => {
    const citation = `${selectedSource.authorOrRuler}. (${selectedSource.yearDisplay}). "${selectedSource.title}". ${selectedSource.civilization}. Preserved at: ${selectedSource.currentPreservationLocation}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(selectedSource.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const renderHighlightedText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-[#D4AF37]/35 text-[#FFE58F] px-1 py-0.5 rounded font-semibold border-b border-[#D4AF37]">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const eras = ['All', 'Antiquity', 'Classical', 'Medieval', 'Early Modern', '19th Century', '20th Century / Modern'];
  const categories = ['All', 'Monumental Speeches', 'Charters & Constitutions', 'Legal Codes & Edicts', 'Human Rights & Declarations'];

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#17140E] via-[#1C1811] to-[#12100C] border border-[#3D3321] p-6 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-mono font-bold tracking-widest uppercase mb-1">
              <Scroll className="w-4 h-4" />
              <span>Imperial Treaties, Proclamations & Speeches Vault</span>
            </div>
            <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Monumental Primary Sources & Historic Speeches
            </h2>
            <p className="text-xs sm:text-sm text-[#A09890] mt-1.5 max-w-2xl leading-relaxed font-sans">
              Inspect the authentic words, founding treaties, and revolutionary speeches that shaped the architecture of human law and liberty. Read key clause breakdowns, listen via speech synthesis, and cite excerpts in your research dossier.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRandomSpeech}
              className="px-4 py-2.5 bg-[#1C1811] hover:bg-[#282217] border border-[#D4AF37]/60 hover:border-[#D4AF37] text-[#D4AF37] font-mono text-xs font-bold rounded-2xl flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0"
              title="Pick a random historic speech from the vault"
            >
              <Shuffle className="w-4 h-4 text-[#D4AF37]" />
              <span>Inspire Me</span>
            </button>

            <div className="bg-[#12100C] border border-[#2E271C] px-4 py-2.5 rounded-2xl text-center">
              <div className="text-[10px] font-mono text-[#8E867C] uppercase">Preserved Texts</div>
              <div className="text-lg font-bold font-mono text-[#D4AF37]">{ALL_PRIMARY_SOURCES_AND_SPEECHES.length} Speeches & Decrees</div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Toast */}
      {actionNotice && (
        <div className="bg-emerald-950/50 border border-emerald-800/70 p-3 rounded-xl flex items-center gap-2 text-emerald-300 text-xs font-mono shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="bg-[#0F0D0A] border border-[#262016] p-4 rounded-2xl space-y-3 shadow-md">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8E867C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ruler, title, quote, civilization..."
              className="w-full pl-9 pr-3 py-2 bg-[#17140F] text-white border border-[#2E271C] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold shrink-0 transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'bg-[#14110C] text-[#CCC2B8] border-[#262016] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Era selector tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-[#1C1812] scrollbar-none">
          <span className="text-[10px] font-mono text-[#8E867C] uppercase mr-1 shrink-0">Era:</span>
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono shrink-0 transition-all cursor-pointer ${
                selectedEra === era
                  ? 'bg-[#2E271C] text-[#D4AF37] font-bold border border-[#4D3F28]'
                  : 'text-[#8E867C] hover:text-white'
              }`}
            >
              {era}
            </button>
          ))}
        </div>

        {/* Featured Thematic Historical Collections */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#1C1812] scrollbar-none">
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold mr-1 shrink-0">Collections:</span>
          
          <button
            onClick={() => { setThematicFilter('all'); setSelectedCategory('All'); setSelectedEra('All'); setSearchQuery(''); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border ${
              thematicFilter === 'all'
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            All Vaults ({ALL_PRIMARY_SOURCES_AND_SPEECHES.length})
          </button>

          <button
            onClick={() => { setThematicFilter('ww1'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'ww1'
                ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🎖️ World War I (1914–1918)</span>
          </button>

          <button
            onClick={() => { setThematicFilter('ww2'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'ww2'
                ? 'bg-red-500/20 text-red-300 border-red-400'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>⚔️ World War II (1939–1945)</span>
          </button>

          <button
            onClick={() => { setThematicFilter('edu_hitler'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'edu_hitler'
                ? 'bg-purple-500/20 text-purple-300 border-purple-400'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🎓 Educational Hitler Vault (War, Aggression & Propaganda Speeches)</span>
          </button>

          <button
            onClick={() => { setThematicFilter('bilingual'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'bilingual'
                ? 'bg-blue-500/20 text-blue-300 border-blue-400'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>🌐 Bilingual & Translated Speeches</span>
          </button>

          <button
            onClick={() => { setThematicFilter('liberation'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'liberation'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🕊️ Human Rights & Freedom</span>
          </button>

          <button
            onClick={() => { setThematicFilter('ancient_rulers'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'ancient_rulers'
                ? 'bg-amber-500/20 text-[#D4AF37] border-[#D4AF37]'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>👑 Kings & Emperors Vault</span>
          </button>

          <button
            onClick={() => { setThematicFilter('china'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'china'
                ? 'bg-red-500/20 text-red-300 border-red-500'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🐉 China & East Asia</span>
          </button>

          <button
            onClick={() => { setThematicFilter('india'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'india'
                ? 'bg-orange-500/20 text-orange-300 border-orange-500'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🪷 India & South Asia</span>
          </button>

          <button
            onClick={() => { setThematicFilter('greco_roman'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'greco_roman'
                ? 'bg-sky-500/20 text-sky-300 border-sky-400'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🏛️ Greco-Roman</span>
          </button>

          <button
            onClick={() => { setThematicFilter('europe'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'europe'
                ? 'bg-blue-500/20 text-blue-300 border-blue-400'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🏰 European Monarchs</span>
          </button>

          <button
            onClick={() => { setThematicFilter('japan_asia'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'japan_asia'
                ? 'bg-rose-500/20 text-rose-300 border-rose-400'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🗾 Japan & Korea</span>
          </button>

          <button
            onClick={() => { setThematicFilter('russia'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'russia'
                ? 'bg-teal-500/20 text-teal-300 border-teal-400'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🦅 Russian Tsars</span>
          </button>

          <button
            onClick={() => { setThematicFilter('egypt_near_east'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'egypt_near_east'
                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🪲 Egypt & Near East</span>
          </button>

          <button
            onClick={() => { setThematicFilter('americas'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'americas'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🏹 Americas Indigenous</span>
          </button>

          <button
            onClick={() => { setThematicFilter('africa'); setSelectedCategory('All'); setSelectedEra('All'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border flex items-center gap-1.5 ${
              thematicFilter === 'africa'
                ? 'bg-amber-600/20 text-amber-300 border-amber-500'
                : 'bg-[#12100C] text-[#A09890] border-[#221D15] hover:text-white'
            }`}
          >
            <span>🦁 African Monarchs</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Document Showcase & Reader (7 cols) */}
        <div id="primary-sources-reader" className="lg:col-span-7 space-y-4">
          <div className="bg-[#0F0D0A] border border-[#2E271C] rounded-3xl overflow-hidden shadow-2xl">
            {/* Document Hero Header - Clean Archival Typographic Layout (No Background Image) */}
            <div className="p-6 bg-gradient-to-b from-[#18140E] via-[#120F0B] to-[#0F0D0A] border-b border-[#2E271C] relative">
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#1E1912] text-[#D4AF37] border border-[#D4AF37]/35 shadow-sm">
                    {selectedSource.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#D4AF37] font-semibold tracking-wide">
                    {selectedSource.civilization}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleTogglePlaySource(selectedSource)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                      isPlayingAudio && activePlayingSourceId === selectedSource.id
                        ? 'bg-amber-400 text-black border border-amber-300 animate-pulse'
                        : isAudioPaused && activePlayingSourceId === selectedSource.id
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30'
                        : isGeneratingAiSpeech && activePlayingSourceId === selectedSource.id
                        ? 'bg-[#D4AF37]/30 text-white border border-[#D4AF37]'
                        : 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-black'
                    }`}
                    title="Listen to historical decree or speech with AI-voiced audio narration"
                  >
                    {isGeneratingAiSpeech && activePlayingSourceId === selectedSource.id ? (
                      <>
                        <Sparkles className="w-3 h-3 animate-spin text-[#D4AF37]" />
                        <span>Synthesizing Voice...</span>
                      </>
                    ) : isPlayingAudio && activePlayingSourceId === selectedSource.id ? (
                      <>
                        <Pause className="w-3 h-3 fill-current" />
                        <span>Pause Narration</span>
                      </>
                    ) : isAudioPaused && activePlayingSourceId === selectedSource.id ? (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>Resume Narration</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3" />
                        <span>AI Voice Narration</span>
                      </>
                    )}
                  </button>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#14110C] text-white border border-[#2E271C]">
                    {selectedSource.yearDisplay} • {selectedSource.era}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                  {selectedSource.title}
                </h3>
                {selectedSource.originalTitle && selectedSource.originalTitle !== selectedSource.title && (
                  <div className="text-xs font-serif italic text-[#A89F91] mt-1">
                    Original title: {selectedSource.originalTitle}
                  </div>
                )}
                <div className="text-xs sm:text-sm text-[#CCC2B8] mt-2.5 font-sans flex flex-wrap items-center gap-2">
                  <span className="text-[#D4AF37] font-bold">{selectedSource.authorOrRuler}</span>
                  <span className="text-[#8E867C]">({selectedSource.authorTitle})</span>
                  <span className="text-[#52493C]">•</span>
                  <span className="text-[#A89F91] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#8E867C]" />
                    {selectedSource.location}
                  </span>
                </div>

                {/* Global Historical Timeline Chronological Position Indicator */}
                {(() => {
                  const selectedChrono = getChronologicalInfo(selectedSource.year, selectedSource.yearDisplay);
                  return (
                    <div className="mt-4 pt-3 border-t border-[#262016] space-y-2 bg-[#120F0B]/80 p-3 rounded-2xl border border-[#221D15]">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: selectedChrono.eraColor }} />
                          <span className="text-white font-bold">{selectedSource.yearDisplay}</span>
                          <span className="text-[#6E665A]">•</span>
                          <span className={`px-2 py-0.5 rounded-md border text-[11px] ${selectedChrono.eraBgColor} ${selectedChrono.eraBorderColor}`}>
                            {selectedChrono.eraTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#A89F91]">
                          <span className="text-[#D4AF37] font-semibold">{selectedChrono.percent}% timeline mark</span>
                          <span className="text-[#7A7266]">({selectedChrono.timelineLabel})</span>
                        </div>
                      </div>

                      {/* Timeline Bar */}
                      <div className="relative w-full h-2 bg-[#0A0907] rounded-full overflow-hidden border border-[#262016]">
                        {/* Milestone indicators */}
                        <div className="absolute top-0 bottom-0 w-[1px] bg-white/15 left-[44%]" title="500 BCE (Axial Age)" />
                        <div className="absolute top-0 bottom-0 w-[1px] bg-white/25 left-[55%]" title="1 CE (Pax Romana)" />
                        <div className="absolute top-0 bottom-0 w-[1px] bg-white/15 left-[88%]" title="1500 CE (Global Age)" />

                        <div
                          className="h-full rounded-full transition-all duration-500 shadow-sm"
                          style={{
                            width: `${selectedChrono.percent}%`,
                            backgroundColor: selectedChrono.eraColor
                          }}
                        />
                        <div
                          className="absolute top-0 bottom-0 w-1.5 bg-white rounded-full shadow-md -ml-0.5"
                          style={{
                            left: `${selectedChrono.percent}%`
                          }}
                        />
                      </div>

                      <div className="flex justify-between text-[8.5px] font-mono text-[#665D50] px-1">
                        <span>2500 BCE (Bronze Age)</span>
                        <span>500 BCE</span>
                        <span>1 CE (Pax Romana)</span>
                        <span>1500 CE (Renaissance)</span>
                        <span>Present</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* AI-Voiced Audio Narration Control Dashboard */}
            <div className="bg-[#14110C] border-y border-[#262016] px-5 py-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Play/Pause & Status */}
                <div className="flex items-center gap-3">
                  {isPlayingAudio ? (
                    <button
                      onClick={handlePauseAudio}
                      className="p-2.5 rounded-xl bg-amber-500 text-black hover:bg-amber-400 transition-all cursor-pointer shadow-md active:scale-95"
                      title="Pause Speech Narration"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                    </button>
                  ) : (
                    <button
                      onClick={handlePlayAudio}
                      disabled={isGeneratingAiSpeech}
                      className="p-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-black hover:brightness-110 transition-all cursor-pointer shadow-md disabled:opacity-50 active:scale-95"
                      title="Play AI-Voiced Audio Narration"
                    >
                      {isGeneratingAiSpeech ? (
                        <Sparkles className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                  )}

                  {(isPlayingAudio || isAudioPaused) && (
                    <button
                      onClick={handleStopAudio}
                      className="p-2.5 rounded-xl bg-[#262016] hover:bg-[#382E1F] text-[#CCC2B8] hover:text-white transition-colors cursor-pointer active:scale-95"
                      title="Stop Audio Narration"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                      <span>
                        {isGeneratingAiSpeech
                          ? 'Synthesizing AI Neural Voice (Gemini TTS)...'
                          : isPlayingAudio
                          ? 'AI Historical Speech Playing'
                          : isAudioPaused
                          ? 'Narration Paused'
                          : 'AI-Voiced Audio Narration'}
                      </span>

                      {/* Animated Audio Equalizer Waveform Bars */}
                      {isPlayingAudio && (
                        <div className="flex items-end gap-0.5 h-3.5 px-1.5 py-0.5 bg-black/40 rounded border border-[#D4AF37]/30">
                          <span className="w-0.5 bg-[#D4AF37] rounded-full animate-pulse h-2" />
                          <span className="w-0.5 bg-amber-400 rounded-full animate-pulse h-3.5" style={{ animationDelay: '150ms' }} />
                          <span className="w-0.5 bg-[#D4AF37] rounded-full animate-pulse h-2.5" style={{ animationDelay: '300ms' }} />
                          <span className="w-0.5 bg-amber-300 rounded-full animate-pulse h-3" style={{ animationDelay: '75ms' }} />
                          <span className="w-0.5 bg-[#D4AF37] rounded-full animate-pulse h-1.5" style={{ animationDelay: '220ms' }} />
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-[#8E867C] mt-0.5">
                      Orator: <span className="text-[#C5BCB0] font-bold">{selectedSource.authorOrRuler}</span> • Voice: <span className="text-[#D4AF37]">{selectedAiVoice}</span>
                    </div>
                  </div>
                </div>

                {/* Right Controls: Voice Picker & Speed */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {/* Orator Voice Selector */}
                  <div className="flex items-center gap-1.5 bg-[#0A0907] px-2 py-1 rounded-xl border border-[#221D15]">
                    <span className="text-[10px] font-mono text-[#888]">Voice:</span>
                    <select
                      value={selectedAiVoice}
                      onChange={(e) => {
                        const newVoice = e.target.value as any;
                        setSelectedAiVoice(newVoice);
                        if (isPlayingAudio) {
                          handleStopAudio();
                          setTimeout(() => handleTogglePlaySource(selectedSource), 100);
                        }
                      }}
                      className="bg-transparent text-[11px] font-mono font-bold text-[#D4AF37] outline-none cursor-pointer"
                    >
                      <option value="Fenrir" className="bg-[#14110C] text-white">Fenrir (Statesman)</option>
                      <option value="Zephyr" className="bg-[#14110C] text-white">Zephyr (Chronicler)</option>
                      <option value="Kore" className="bg-[#14110C] text-white">Kore (Matriarch)</option>
                      <option value="Puck" className="bg-[#14110C] text-white">Puck (Herald)</option>
                      <option value="Charon" className="bg-[#14110C] text-white">Charon (Sage)</option>
                    </select>
                  </div>

                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 bg-[#0A0907] px-2 py-1 rounded-xl border border-[#221D15] text-[10px] font-mono text-[#8E867C]">
                    <span className="text-[9px] uppercase mr-0.5">Speed:</span>
                    {[0.8, 1.0, 1.25, 1.5].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          setSpeechRate(rate);
                          if (audioElementRef.current) {
                            audioElementRef.current.playbackRate = rate;
                          }
                          if (isPlayingAudio && !audioElementRef.current) {
                            handleStopAudio();
                            setTimeout(() => handlePlayAudio(), 100);
                          }
                        }}
                        className={`px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                          speechRate === rate
                            ? 'bg-[#D4AF37] text-black font-bold shadow-sm'
                            : 'hover:text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Playback Scrub & Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#8E867C] w-9 text-right shrink-0">
                    {formatAudioTime(audioCurrentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={audioProgress}
                    onChange={handleSeekAudio}
                    className="w-full h-1.5 bg-[#221D15] accent-[#D4AF37] rounded-lg cursor-pointer transition-all"
                    title="Scrub playback position"
                  />
                  <span className="text-[10px] font-mono text-[#8E867C] w-9 shrink-0">
                    {formatAudioTime(audioDuration || (isPlayingAudio ? 90 : 0))}
                  </span>
                </div>
              </div>
            </div>

            {/* Document Famous Quote Callout */}
            <div className="p-5 border-b border-[#221D15] bg-[#110E0A]/60">
              <blockquote className="border-l-2 border-[#D4AF37] pl-3.5 py-1 text-sm sm:text-base font-serif italic text-[#F5EDE1] leading-relaxed">
                "{selectedSource.famousQuote}"
              </blockquote>
            </div>

            {/* Sub-tabs: Excerpt | Key Clauses | Context */}
            <div className="flex border-b border-[#221D15] bg-[#0A0907] px-5 pt-3 gap-3">
              <button
                onClick={() => setActiveTab('excerpt')}
                className={`pb-2.5 px-2 text-xs font-mono font-bold border-b-2 cursor-pointer transition-all ${
                  activeTab === 'excerpt'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-[#8E867C] hover:text-white'
                }`}
              >
                📜 Primary Excerpt Text
              </button>
              <button
                onClick={() => setActiveTab('clauses')}
                className={`pb-2.5 px-2 text-xs font-mono font-bold border-b-2 cursor-pointer transition-all ${
                  activeTab === 'clauses'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-[#8E867C] hover:text-white'
                }`}
              >
                ⚖️ Key Clauses & Analysis ({selectedSource.keyClauses.length})
              </button>
              <button
                onClick={() => setActiveTab('context')}
                className={`pb-2.5 px-2 text-xs font-mono font-bold border-b-2 cursor-pointer transition-all ${
                  activeTab === 'context'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-[#8E867C] hover:text-white'
                }`}
              >
                🏛️ Context & Preservation
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 text-left">
              {activeTab === 'excerpt' && (
                <div className="space-y-4">
                  {/* Translation Mode Selector & Actions Bar */}
                  <div className="bg-[#110E0A] border border-[#262016] p-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-inner">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
                      <span className="text-[10px] font-mono uppercase text-[#8E867C] px-1.5 flex items-center gap-1 shrink-0">
                        <Languages className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Translation:</span>
                      </span>

                      {/* English Translation View Tab */}
                      <button
                        onClick={() => setTranslationMode('english')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                          translationMode === 'english'
                            ? 'bg-[#D4AF37] text-black shadow-md'
                            : 'bg-[#18140E] text-[#CCC2B8] hover:text-white border border-[#2E271C]'
                        }`}
                        title="Read the clean, verified English translation"
                      >
                        <span>🇬🇧 English Translation</span>
                        {parsedTranslation.hasDualText && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-black/20 text-black font-sans font-bold rounded-md">
                            Verified
                          </span>
                        )}
                      </button>

                      {/* Original Language View Tab (if bilingual or foreign) */}
                      {parsedTranslation.hasDualText ? (
                        <>
                          <button
                            onClick={() => setTranslationMode('original')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                              translationMode === 'original'
                                ? 'bg-[#D4AF37] text-black shadow-md'
                                : 'bg-[#18140E] text-[#CCC2B8] hover:text-white border border-[#2E271C]'
                            }`}
                            title={`Read original primary source in ${selectedSource.originalLanguage}`}
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Original ({selectedSource.originalLanguage.split(' ')[0]})</span>
                          </button>

                          <button
                            onClick={() => setTranslationMode('parallel')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                              translationMode === 'parallel'
                                ? 'bg-[#D4AF37] text-black shadow-md'
                                : 'bg-[#18140E] text-[#CCC2B8] hover:text-white border border-[#2E271C]'
                            }`}
                            title="Side-by-side comparative bilingual study view"
                          >
                            <span>⚖️ Parallel Dual View</span>
                          </button>
                        </>
                      ) : (
                        <div className="text-[10px] font-mono text-[#8E867C] px-2 hidden sm:block">
                          {parsedTranslation.isNativeEnglish ? 'Delivered in English' : `Scholarly translation from ${selectedSource.originalLanguage}`}
                        </div>
                      )}

                      <button
                        onClick={() => setTranslationMode('full')}
                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono transition-all cursor-pointer shrink-0 ${
                          translationMode === 'full'
                            ? 'bg-[#2E271C] text-[#D4AF37] font-bold border border-[#D4AF37]'
                            : 'text-[#8E867C] hover:text-white'
                        }`}
                        title="View verbatim archival transcript"
                      >
                        <span>📜 Complete Record</span>
                      </button>
                    </div>

                    {/* Quick Copy Action */}
                    <button
                      onClick={() => {
                        const textToCopy = 
                          translationMode === 'original' 
                            ? parsedTranslation.originalText 
                            : parsedTranslation.englishText;
                        navigator.clipboard.writeText(textToCopy);
                        setCopiedTranslation(true);
                        setTimeout(() => setCopiedTranslation(false), 2500);
                      }}
                      className="px-2.5 py-1.5 bg-[#17140E] hover:bg-[#221D15] text-[#D4AF37] hover:text-[#E5C158] border border-[#2E271C] text-[11px] font-mono rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      title="Copy text to clipboard"
                    >
                      {copiedTranslation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedTranslation ? 'Copied to Clipboard' : translationMode === 'original' ? 'Copy Original' : 'Copy English Translation'}</span>
                    </button>
                  </div>

                  {/* Speech Excerpt Stats & Quick Finder Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0A0907] border border-[#221D15] p-3 rounded-xl text-xs font-mono">
                    <div className="flex items-center gap-3 text-[#A89F91]">
                      <span className="text-[#D4AF37] font-bold">
                        {(translationMode === 'english' ? parsedTranslation.englishText : translationMode === 'original' ? parsedTranslation.originalText : selectedSource.fullExcerptText).trim().split(/\s+/).length} words
                      </span>
                      <span>•</span>
                      <span>
                        ~{Math.max(1, Math.round((translationMode === 'english' ? parsedTranslation.englishText : selectedSource.fullExcerptText).trim().split(/\s+/).length / 180))} min read
                      </span>
                      <span>•</span>
                      <span className="text-[#8E867C] hidden sm:inline">
                        Viewing: <span className="text-white font-bold uppercase">{translationMode === 'english' ? 'English Translation' : translationMode === 'original' ? 'Original Source' : translationMode}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[#8E867C]" />
                        <input
                          type="text"
                          value={excerptSearchQuery}
                          onChange={(e) => setExcerptSearchQuery(e.target.value)}
                          placeholder="Highlight term in speech..."
                          className="pl-7 pr-2 py-1 bg-[#14110C] text-xs text-white border border-[#2E271C] rounded-lg focus:outline-none focus:border-[#D4AF37] w-48 font-sans"
                        />
                      </div>
                      {excerptSearchQuery && (
                        <button
                          onClick={() => setExcerptSearchQuery('')}
                          className="text-[10px] text-[#8E867C] hover:text-white cursor-pointer px-1.5 py-1 bg-[#1A1610] rounded border border-[#2E271C]"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Translation Origin & Academic Context Notice */}
                  <div className="bg-[#12100C] border border-[#262016] px-4 py-2.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      {translationMode === 'english' ? (
                        <span className="text-[#D4AF37]">
                          {parsedTranslation.hasDualText 
                            ? `🇬🇧 Complete English Translation (Historical educational translation from original ${selectedSource.originalLanguage})`
                            : parsedTranslation.isNativeEnglish 
                            ? '🇬🇧 Historic Primary Speech (Originally pronounced / published in English)'
                            : `🇬🇧 Scholarly English Translation (Rendered from original ${selectedSource.originalLanguage})`}
                        </span>
                      ) : translationMode === 'original' ? (
                        <span className="text-amber-300">
                          🌐 Original Primary Language Excerpt: <strong className="text-white">{selectedSource.originalLanguage}</strong>
                        </span>
                      ) : translationMode === 'parallel' ? (
                        <span className="text-blue-300">
                          ⚖️ Comparative Parallel View: <strong className="text-white">{selectedSource.originalLanguage}</strong> (Left) vs. <strong className="text-[#D4AF37]">English Translation</strong> (Right)
                        </span>
                      ) : (
                        <span className="text-[#CCC2B8]">
                          📜 Complete Archival Primary Record
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8E867C]">
                      Original: <span className="text-white font-bold">{selectedSource.originalLanguage}</span>
                    </span>
                  </div>

                  {/* Excerpt Body based on Translation Mode */}
                  {translationMode === 'parallel' && parsedTranslation.hasDualText ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left Column: Original Source */}
                      <div className="space-y-2 bg-[#080705] p-4 rounded-2xl border border-[#221D15]">
                        <div className="flex items-center justify-between pb-2 border-b border-[#1E1912] text-xs font-mono">
                          <span className="text-[#A89F91] font-bold flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-amber-400" />
                            <span>Original ({selectedSource.originalLanguage})</span>
                          </span>
                          <span className="text-[10px] text-[#8E867C]">Verbatim Oration</span>
                        </div>
                        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#D8D0C5] leading-relaxed whitespace-pre-line font-serif">
                          {renderHighlightedText(parsedTranslation.originalText, excerptSearchQuery)}
                        </div>
                      </div>

                      {/* Right Column: English Translation */}
                      <div className="space-y-2 bg-[#0C0A07] p-4 rounded-2xl border border-[#2E271C]">
                        <div className="flex items-center justify-between pb-2 border-b border-[#221D15] text-xs font-mono">
                          <span className="text-[#D4AF37] font-bold flex items-center gap-1.5">
                            <Languages className="w-3.5 h-3.5" />
                            <span>English Translation</span>
                          </span>
                          <span className="text-[10px] text-emerald-400">Educational Study</span>
                        </div>
                        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#F5EDE1] leading-relaxed whitespace-pre-line font-serif font-light">
                          {renderHighlightedText(parsedTranslation.englishText, excerptSearchQuery)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#E0D8D0] leading-relaxed whitespace-pre-line font-serif font-light bg-[#080705] p-5 rounded-2xl border border-[#221D15]">
                      {renderHighlightedText(
                        translationMode === 'english'
                          ? parsedTranslation.englishText
                          : translationMode === 'original'
                          ? parsedTranslation.originalText
                          : selectedSource.fullExcerptText,
                        excerptSearchQuery
                      )}
                    </div>
                  )}

                  <div className="bg-[#14110C] border border-[#262016] p-3.5 rounded-xl text-[11px] font-mono text-[#8E867C] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>Original Language: <span className="text-white font-bold">{selectedSource.originalLanguage}</span></div>
                    <div>Preserved At: <span className="text-[#D4AF37]">{selectedSource.currentPreservationLocation}</span></div>
                  </div>
                </div>
              )}

              {activeTab === 'clauses' && (
                <div className="space-y-4">
                  {selectedSource.keyClauses.map((clause, idx) => (
                    <div
                      key={idx}
                      className="bg-[#14110C] border border-[#2E271C] rounded-2xl p-4.5 space-y-3 shadow-md"
                    >
                      <div className="flex items-center justify-between border-b border-[#221D15] pb-2">
                        <span className="text-xs font-bold font-mono text-[#D4AF37] uppercase">
                          {clause.clauseNumberOrTitle}
                        </span>
                        <span className="text-[10px] font-mono text-[#8E867C]">Clause {idx + 1} of {selectedSource.keyClauses.length}</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#8E867C] uppercase block">
                          📜 Primary Source Excerpt ({selectedSource.originalLanguage}):
                        </span>
                        <blockquote className="text-xs font-serif italic text-[#F5EDE1] bg-[#0A0907] p-3 rounded-lg border border-[#1E1911]">
                          "{clause.originalExcerpt}"
                        </blockquote>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                        <div className="bg-[#0A0907] p-3 rounded-xl border border-[#1E1911]">
                          <span className="text-[10px] font-mono uppercase text-[#D4AF37] flex items-center gap-1 font-bold">
                            <Languages className="w-3 h-3" />
                            <span>🇬🇧 English Translation & Modern Interpretation:</span>
                          </span>
                          <p className="text-[#CCC2B8] mt-1 leading-relaxed font-sans">{clause.modernizedMeaning}</p>
                        </div>
                        <div className="bg-[#0A0907] p-3 rounded-xl border border-[#1E1911]">
                          <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">
                            ⚖️ Historical Consequence & Significance:
                          </span>
                          <p className="text-[#CCC2B8] mt-1 leading-relaxed font-sans">{clause.historicalSignificance}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'context' && (
                <div className="space-y-4">
                  <div className="bg-[#14110C] border border-[#2E271C] p-4.5 rounded-2xl space-y-2">
                    <h5 className="text-xs font-bold font-mono text-[#D4AF37] uppercase flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Historical Background & Origin
                    </h5>
                    <p className="text-xs text-[#CCC2B8] leading-relaxed font-sans">
                      {selectedSource.historicalContext}
                    </p>
                  </div>

                  <div className="bg-[#14110C] border border-[#2E271C] p-4.5 rounded-2xl space-y-2">
                    <h5 className="text-xs font-bold font-mono text-emerald-400 uppercase flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      Enduring Constitutional & Moral Impact
                    </h5>
                    <p className="text-xs text-[#CCC2B8] leading-relaxed font-sans">
                      {selectedSource.lastingImpact}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-[#0A0907] border border-[#221D15] p-3 rounded-xl">
                      <span className="text-[10px] text-[#8E867C] uppercase block">Physical Medium</span>
                      <span className="text-white font-medium mt-0.5 block">{selectedSource.mediumOrFormat}</span>
                    </div>
                    <div className="bg-[#0A0907] border border-[#221D15] p-3 rounded-xl">
                      <span className="text-[10px] text-[#8E867C] uppercase block">Preservation Archive</span>
                      <span className="text-[#D4AF37] font-medium mt-0.5 block">{selectedSource.currentPreservationLocation}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="mt-6 pt-5 border-t border-[#221D15] flex flex-wrap gap-2.5 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleSaveToNotes}
                    className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Add to Notebook</span>
                  </button>

                  <button
                    onClick={handleToggleThisBookmark}
                    className={`px-3.5 py-2 border text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                      isBookmarked
                        ? 'bg-[#2E271C] text-[#D4AF37] border-[#D4AF37]'
                        : 'bg-[#14110C] text-[#CCC2B8] border-[#2E271C] hover:text-white hover:border-[#D4AF37]'
                    }`}
                  >
                    <BookmarkIcon className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span>{isBookmarked ? 'Bookmarked' : 'Bookmark Source'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReturnToCatalog}
                    className="px-3.5 py-2 bg-[#1C1811] hover:bg-[#282217] text-[#D4AF37] hover:text-white border border-[#D4AF37]/40 text-xs font-mono rounded-xl flex items-center gap-1.5 transition-all cursor-pointer font-bold shadow-sm"
                    title="Return to where you selected this source in the catalog"
                  >
                    <ArrowDown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Back to Catalog</span>
                  </button>

                  <button
                    onClick={handleCopyCitation}
                    className="px-3 py-2 bg-[#14110C] hover:bg-[#1E1911] text-[#CCC2B8] hover:text-white border border-[#2E271C] text-xs font-mono rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Copy formal academic citation"
                  >
                    {copiedId === selectedSource.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === selectedSource.id ? 'Copied' : 'Cite'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Catalog of Sources (5 cols) with 300-Speeches Pagination */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                Historical Manuscripts & Addresses ({filteredSources.length})
              </h4>
              {filteredSources.length > SPEECHES_PER_PAGE && (
                <div className="text-[10px] font-mono text-[#A89F91] mt-0.5">
                  Displaying Speeches <span className="text-white font-bold">{startIndex + 1}–{endIndex}</span> of {filteredSources.length} (Batch {safeCurrentPage} of {totalPages})
                </div>
              )}
            </div>
            <span className="text-[10px] font-mono text-[#8E867C]">Select to inspect</span>
          </div>

          <div ref={catalogContainerRef} className="space-y-2.5 max-h-[780px] overflow-y-auto pr-1">
            {displayedSources.map((source) => {
              const isSelected = selectedSource.id === source.id;
              const isSourceBookmarked = bookmarks.some(b => b.targetId === source.id);
              const isThisPlaying = activePlayingSourceId === source.id && isPlayingAudio;
              const isThisPaused = activePlayingSourceId === source.id && isAudioPaused;
              const chrono = getChronologicalInfo(source.year, source.yearDisplay);

              return (
                <div
                  key={source.id}
                  id={`source-card-${source.id}`}
                  onClick={() => handleSelectSource(source)}
                  className={`p-4 rounded-2xl border transition-all text-left cursor-pointer relative ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#1E1911] to-[#14110C] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]/30'
                      : 'bg-[#0F0D0A] border-[#221D15] hover:border-[#382E1E] hover:bg-[#14110C]'
                  }`}
                >
                  {/* Card Header: Category, Era & Year */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#1C1811] text-[#D4AF37] border border-[#332A1B]">
                        {source.category}
                      </span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${chrono.eraBgColor} ${chrono.eraBorderColor}`}>
                        {chrono.eraShort}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white shrink-0">
                      {source.yearDisplay}
                    </span>
                  </div>

                  {/* Speech / Decree Title */}
                  <h5 className="font-serif italic font-bold text-sm text-white mt-2 leading-snug">
                    {source.title}
                  </h5>

                  {/* Language Provenance Tag */}
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#16120D] text-[#D4AF37] border border-[#2E271C] flex items-center gap-1">
                      <Languages className="w-2.5 h-2.5 text-[#D4AF37]" />
                      <span>
                        {source.originalLanguage.toLowerCase().includes('english')
                          ? '🇬🇧 English Original'
                          : source.fullExcerptText.includes('Translation')
                          ? `🌐 ${source.originalLanguage.split(' ')[0]} + 🇬🇧 English Translation`
                          : `🌐 ${source.originalLanguage.split(' ')[0]} → 🇬🇧 English Translation`}
                      </span>
                    </span>
                  </div>

                  {/* Historical Summary */}
                  <p className="text-[11px] text-[#A09890] mt-1 font-sans line-clamp-2 leading-relaxed">
                    {source.summary}
                  </p>

                  {/* Chronological Indicator in Global Historical Timeline */}
                  <div className="mt-2.5 pt-2 border-t border-[#1C1812] space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full shadow-sm" style={{ backgroundColor: chrono.eraColor }} />
                        <span className="text-[#CCC2B8] font-bold">{source.yearDisplay}</span>
                        <span className="text-[#5A5245]">•</span>
                        <span className="text-[#A09890]">{chrono.eraShort}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#8E867C]">
                        <span className="text-white font-semibold">{chrono.percent}% timeline mark</span>
                        <span className="text-[8px] text-[#6A6153]">({chrono.timelineLabel})</span>
                      </div>
                    </div>

                    {/* Visual Mini Timeline Progress Bar */}
                    <div className="relative w-full h-1.5 bg-[#0A0907] rounded-full overflow-hidden border border-[#262016]">
                      {/* Milestone ticks */}
                      <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 left-[44%]" title="500 BCE" />
                      <div className="absolute top-0 bottom-0 w-[1px] bg-white/15 left-[55%]" title="1 CE" />
                      <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 left-[88%]" title="1500 CE" />
                      
                      {/* Progress fill to speech position */}
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${chrono.percent}%`,
                          backgroundColor: chrono.eraColor
                        }}
                      />
                      {/* Pin marker */}
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-sm -ml-0.5"
                        style={{
                          left: `${chrono.percent}%`
                        }}
                      />
                    </div>

                    <div className="flex justify-between text-[7.5px] font-mono text-[#635B4E] px-0.5">
                      <span>2500 BCE</span>
                      <span>500 BCE</span>
                      <span>1 CE</span>
                      <span>1500 CE</span>
                      <span>Present</span>
                    </div>
                  </div>

                  {/* Actions Bar: 'Listen to Speech' Button & Author */}
                  <div className="mt-2.5 pt-2 border-t border-[#1C1812] flex items-center justify-between gap-2 text-[10px] font-mono">
                    {/* 'Listen to Speech' Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePlaySource(source);
                      }}
                      className={`px-2.5 py-1.5 rounded-xl text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                        isThisPlaying
                          ? 'bg-amber-400 text-black border border-amber-300 animate-pulse'
                          : isThisPaused
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30'
                          : isGeneratingAiSpeech && activePlayingSourceId === source.id
                          ? 'bg-[#D4AF37]/30 text-white border border-[#D4AF37]'
                          : 'bg-[#18140E] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#2E271C]'
                      }`}
                      title={isThisPlaying ? 'Pause speech narration' : isThisPaused ? 'Resume speech narration' : `Listen to ${source.title} aloud with AI Voice`}
                    >
                      {isGeneratingAiSpeech && activePlayingSourceId === source.id ? (
                        <>
                          <Sparkles className="w-3 h-3 animate-spin text-[#D4AF37]" />
                          <span>Synthesizing...</span>
                        </>
                      ) : isThisPlaying ? (
                        <>
                          <Pause className="w-3 h-3 fill-current" />
                          <span>Playing Audio...</span>
                        </>
                      ) : isThisPaused ? (
                        <>
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                          <span>Resume Speech</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span>Listen (AI Voice)</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[#8E867C] max-w-[130px] truncate">{source.authorOrRuler}</span>
                      {isSourceBookmarked && (
                        <span className="text-[#D4AF37] flex items-center gap-1">
                          <BookmarkIcon className="w-2.5 h-2.5 fill-current" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clean Single Bottom Pagination Bar */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-[#120F0B] border border-[#2E271C] px-3 py-2 rounded-xl text-xs font-mono shadow-sm mt-3">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={safeCurrentPage === 1}
                  className="px-3 py-1.5 rounded-lg bg-[#18140E] hover:bg-[#241E15] disabled:opacity-30 disabled:hover:bg-[#18140E] disabled:cursor-not-allowed text-[#CCC2B8] hover:text-white border border-[#2E271C] flex items-center gap-1 transition-all cursor-pointer text-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <div className="flex items-center gap-1 text-[11px] text-[#A89F91]">
                  <span>Page <strong className="text-white">{safeCurrentPage}</strong> of <strong className="text-white">{totalPages}</strong></span>
                  <span className="hidden sm:inline opacity-60 ml-1">({startIndex + 1}–{endIndex})</span>
                </div>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={safeCurrentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-30 disabled:bg-[#18140E] disabled:text-[#8E867C] disabled:cursor-not-allowed text-black font-bold flex items-center gap-1 transition-all cursor-pointer text-xs"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {filteredSources.length === 0 && (
              <div className="text-center py-10 bg-[#0F0D0A] border border-[#221D15] rounded-2xl text-xs font-mono text-[#8E867C] p-4">
                No primary sources match your filter criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
