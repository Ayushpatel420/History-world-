import { useState, useMemo } from 'react';
import { 
  Landmark, 
  Swords, 
  Crown, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Calendar, 
  Shield, 
  Building2, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  Clock, 
  FileText, 
  Check, 
  X, 
  RotateCcw, 
  Filter, 
  ExternalLink, 
  BookmarkPlus, 
  Layers,
  HelpCircle,
  Trophy,
  ChevronRight,
  Info,
  Compass
} from 'lucide-react';
import { 
  HistoricalPeriod, 
  HistoricalRegion, 
  HistoricalTheme, 
  CuratedTopicPreset,
  UserNote
} from '../types';
import { 
  CURATED_PRESETS, 
  PERIOD_OPTIONS, 
  REGION_OPTIONS, 
  THEME_OPTIONS, 
  getCuratedContent 
} from '../data/curationData';
import { ALL_HISTORICAL_BATTLES } from '../data/battlesData';
import BattleComparisonChart from './BattleComparisonChart';
import { playSound } from '../utils/audio';

interface CuratedHubSectionProps {
  initialPresetId?: string;
  onNavigateToTab?: (tab: string, subTab?: string, entityId?: string) => void;
  onAddNote?: (title: string, content: string, type: UserNote['targetType'], targetId?: string) => void;
}

export default function CuratedHubSection({
  initialPresetId = 'ancient_rome',
  onNavigateToTab,
  onAddNote
}: CuratedHubSectionProps) {
  // State for selections
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriod>(() => {
    const preset = CURATED_PRESETS.find(p => p.id === initialPresetId);
    return preset ? preset.period : 'classical';
  });
  const [selectedRegion, setSelectedRegion] = useState<HistoricalRegion>(() => {
    const preset = CURATED_PRESETS.find(p => p.id === initialPresetId);
    return preset ? preset.region : 'mediterranean_rome';
  });
  const [selectedTheme, setSelectedTheme] = useState<HistoricalTheme>(() => {
    const preset = CURATED_PRESETS.find(p => p.id === initialPresetId);
    return preset ? preset.theme : 'ancient_rome';
  });
  const [activePresetId, setActivePresetId] = useState<string | null>(initialPresetId);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'content' | 'quizzes' | 'articles'>('overview');
  const [contentCategoryFilter, setContentCategoryFilter] = useState<'all' | 'figures' | 'events' | 'battles' | 'relics'>('all');

  // Interactive Quiz Taking State
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Selected Article for In-Depth Reader Modal
  const [readingArticleId, setReadingArticleId] = useState<string | null>(null);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  // Curated Content Bundle derived from current selections
  const curatedBundle = useMemo(() => {
    return getCuratedContent(selectedPeriod, selectedRegion, selectedTheme, searchQuery);
  }, [selectedPeriod, selectedRegion, selectedTheme, searchQuery]);

  // Handle Preset Click
  const handleSelectPreset = (preset: CuratedTopicPreset) => {
    setSelectedPeriod(preset.period);
    setSelectedRegion(preset.region);
    setSelectedTheme(preset.theme);
    setActivePresetId(preset.id);
    setSearchQuery('');
    // Reset quiz state
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
    playSound('click');
  };

  // Handle Custom Filter Changes
  const handlePeriodChange = (p: HistoricalPeriod) => {
    setSelectedPeriod(p);
    setActivePresetId(null);
    playSound('click');
  };

  const handleRegionChange = (r: HistoricalRegion) => {
    setSelectedRegion(r);
    setActivePresetId(null);
    playSound('click');
  };

  const handleThemeChange = (t: HistoricalTheme) => {
    setSelectedTheme(t);
    setActivePresetId(null);
    playSound('click');
  };

  const handleResetFilters = () => {
    setSelectedPeriod('all');
    setSelectedRegion('all');
    setSelectedTheme('all');
    setActivePresetId(null);
    setSearchQuery('');
    playSound('click');
  };

  // Handle Save Syllabus to Notes
  const handleSaveSyllabusToNotes = () => {
    if (!onAddNote) return;
    const noteTitle = `Curated Syllabus: ${curatedBundle.title}`;
    const noteContent = `HISTORICAL BRIEFING:
${curatedBundle.curatorialBriefing}

KEY PILLARS:
${curatedBundle.keyPillars.map(p => `• ${p}`).join('\n')}

CURATED FIGURES & MONARCHS:
${curatedBundle.figuresAndMonarchs.map(f => `• ${f.name} (${f.title}) - ${f.roleOrEra}`).join('\n')}

DECISIVE BATTLES:
${curatedBundle.battles.map(b => `• ${b.name} (${b.year < 0 ? Math.abs(b.year) + ' BC' : b.year + ' AD'}): ${b.outcome}`).join('\n')}

CURATED ARTICLES & PAPERS:
${curatedBundle.articles.map(a => `• "${a.title}" by ${a.authorsOrSource}`).join('\n')}`;

    onAddNote(noteTitle, noteContent, 'Paper');
    setSavedNotification('Curated syllabus saved to your personal notebook!');
    setTimeout(() => setSavedNotification(null), 3500);
    playSound('goldenChime');
  };

  // Quiz Interaction Handlers
  const activeQuiz = curatedBundle.quizzes[activeQuizIndex] || curatedBundle.quizzes[0];
  const activeQuestion = activeQuiz?.questions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(index);
    playSound('click');
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null || isAnswerSubmitted || !activeQuestion) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswerIndex === activeQuestion.correctIndex;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    if (currentQuestionIndex + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswerSubmitted(false);
      playSound('click');
    } else {
      setIsQuizCompleted(true);
      playSound('goldenChime');
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
    playSound('click');
  };

  // Reading Article
  const readingArticle = curatedBundle.articles.find(a => a.id === readingArticleId);

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Toast Notification */}
      {savedNotification && (
        <div className="fixed bottom-6 right-6 bg-[#161410] border border-[#D4AF37] text-white text-xs px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2.5">
          <BookmarkPlus className="w-4 h-4 text-[#D4AF37]" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#14120E] via-[#1A1712] to-[#0D0B08] border border-[#2E281E] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 border-b border-[#282319] pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Topic Curation Engine
              </span>
              <span className="text-xs text-[#8E867C]">• Multi-Dimensional Historical Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic font-bold text-white tracking-tight">
              Curate by Period, Region & Theme
            </h2>
            <p className="text-xs sm:text-sm text-[#A09890] leading-relaxed">
              Select any historical epoch, geographical theatre, or sovereign theme (e.g., <span className="text-[#D4AF37] font-semibold">Ancient Rome</span>, <span className="text-[#D4AF37] font-semibold">World War II</span>, or <span className="text-[#D4AF37] font-semibold">Greatest Monarchs</span>). The engine synthesizes verified figures, tactical engagements, museum relics, peer-reviewed articles, and mastery quizzes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleSaveSyllabusToNotes}
              className="px-4 py-2.5 bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md"
            >
              <BookmarkPlus className="w-4 h-4" /> Save Syllabus to Notebook
            </button>
            <button
              onClick={() => { setActiveSubTab('quizzes'); playSound('click'); }}
              className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Trophy className="w-4 h-4" /> Take Curated Quiz
            </button>
          </div>
        </div>

        {/* 1. Quick Presets Bar */}
        <div className="space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Curated Topic Presets:
            </span>
            <span className="text-[10px] text-[#8E867C] font-mono">Click to instantly explore</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {CURATED_PRESETS.map((preset) => {
              const isActive = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  id={`preset-btn-${preset.id}`}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border text-left flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg scale-102 font-black'
                      : 'bg-[#14120E] text-[#C5BDB5] border-[#2A251C] hover:border-[#D4AF37]/60 hover:text-white'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-black/20 text-black' : 'bg-[#1C1811] text-[#D4AF37]'}`}>
                    {preset.id === 'ancient_rome' && <Landmark className="w-3.5 h-3.5" />}
                    {preset.id === 'world_war_2' && <Swords className="w-3.5 h-3.5" />}
                    {preset.id === 'greatest_monarchs' && <Crown className="w-3.5 h-3.5" />}
                    {preset.id === 'ancient_egypt' && <Building2 className="w-3.5 h-3.5" />}
                    {preset.id === 'classical_greece' && <Compass className="w-3.5 h-3.5" />}
                    {preset.id === 'medieval_feudalism' && <Shield className="w-3.5 h-3.5" />}
                    {preset.id === 'enlightenment_science' && <Sparkles className="w-3.5 h-3.5" />}
                    {preset.id === 'cold_war_era' && <GraduationCap className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="leading-tight truncate max-w-[160px] sm:max-w-[190px]">{preset.label}</div>
                    <div className={`text-[9px] font-mono ${isActive ? 'text-black/80' : 'text-[#8E867C]'}`}>
                      {preset.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Multi-Dimensional Custom Selectors */}
        <div className="bg-[#0E0C09] border border-[#262117] rounded-2xl p-4 sm:p-5 space-y-4 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E1A13] pb-3">
            <span className="text-xs font-mono font-bold text-[#A09890] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#D4AF37]" /> Filter Dimensions (Period • Region • Theme):
            </span>
            <div className="flex items-center gap-2">
              {(selectedPeriod !== 'all' || selectedRegion !== 'all' || selectedTheme !== 'all' || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Filters
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Period Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-[#8E867C] font-bold block">
                1. Historical Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => handlePeriodChange(e.target.value as HistoricalPeriod)}
                className="w-full px-3 py-2.5 bg-[#16130E] text-white text-xs border border-[#2D271D] rounded-xl focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                {PERIOD_OPTIONS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#14120E] text-white">
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-[#8E867C] font-bold block">
                2. World Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value as HistoricalRegion)}
                className="w-full px-3 py-2.5 bg-[#16130E] text-white text-xs border border-[#2D271D] rounded-xl focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                {REGION_OPTIONS.map((r) => (
                  <option key={r.id} value={r.id} className="bg-[#14120E] text-white">
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-[#8E867C] font-bold block">
                3. Historical Theme
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => handleThemeChange(e.target.value as HistoricalTheme)}
                className="w-full px-3 py-2.5 bg-[#16130E] text-white text-xs border border-[#2D271D] rounded-xl focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                {THEME_OPTIONS.map((t) => (
                  <option key={t.id} value={t.id} className="bg-[#14120E] text-white">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-[#8E867C] font-bold block">
                4. Topic Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8E867C]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter Caesars, D-Day, Dynasties..."
                  className="w-full pl-9 pr-3 py-2 bg-[#16130E] text-white text-xs border border-[#2D271D] rounded-xl focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Curatorial Summary Card */}
      <div className="bg-[#12100C] border border-[#2A2419] rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#221D14] pb-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
              <span>{curatedBundle.epochLabel}</span>
              <span>•</span>
              <span>{curatedBundle.regionLabel}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-white mt-1">
              {curatedBundle.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-[#181510] border border-[#332A1C] rounded-lg text-xs font-mono text-[#CCC2B8]">
              <strong className="text-[#D4AF37]">{curatedBundle.figuresAndMonarchs.length}</strong> Figures
            </span>
            <span className="px-3 py-1 bg-[#181510] border border-[#332A1C] rounded-lg text-xs font-mono text-[#CCC2B8]">
              <strong className="text-[#D4AF37]">{curatedBundle.battles.length}</strong> Battles
            </span>
            <span className="px-3 py-1 bg-[#181510] border border-[#332A1C] rounded-lg text-xs font-mono text-[#CCC2B8]">
              <strong className="text-[#D4AF37]">{curatedBundle.quizzes.length}</strong> Quizzes
            </span>
            <span className="px-3 py-1 bg-[#181510] border border-[#332A1C] rounded-lg text-xs font-mono text-[#CCC2B8]">
              <strong className="text-[#D4AF37]">{curatedBundle.articles.length}</strong> Articles
            </span>
          </div>
        </div>

        {/* Curatorial Briefing Text */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold tracking-wider block">
              Curatorial Historical Overview:
            </span>
            <p className="text-xs sm:text-sm text-[#CCC2B8] leading-relaxed font-sans">
              {curatedBundle.curatorialBriefing}
            </p>
            <div className="bg-[#0E0C09] p-3 rounded-xl border border-[#221D14] text-xs text-[#A09890]">
              <strong className="text-white font-semibold block mb-0.5">Civilizational Significance:</strong>
              {curatedBundle.historicalSignificance}
            </div>
          </div>

          <div className="space-y-3 bg-[#0E0C09] p-4.5 rounded-2xl border border-[#221D14]">
            <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold tracking-wider block">
              Core Thematic Pillars:
            </span>
            <div className="space-y-2">
              {curatedBundle.keyPillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#E0D8D0]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="leading-snug">{pillar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs between Overview, Content, Quizzes, Articles */}
      <div className="flex items-center gap-2 border-b border-[#282319] pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => { setActiveSubTab('overview'); playSound('click'); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'overview'
              ? 'bg-[#D4AF37] text-black shadow'
              : 'text-[#A09890] hover:text-white hover:bg-[#16130E]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> All Curated (Bento Digest)
        </button>
        <button
          onClick={() => { setActiveSubTab('content'); playSound('click'); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'content'
              ? 'bg-[#D4AF37] text-black shadow'
              : 'text-[#A09890] hover:text-white hover:bg-[#16130E]'
          }`}
        >
          <Crown className="w-3.5 h-3.5" /> Curated Content ({curatedBundle.figuresAndMonarchs.length + curatedBundle.events.length + curatedBundle.battles.length})
        </button>
        <button
          onClick={() => { setActiveSubTab('quizzes'); playSound('click'); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'quizzes'
              ? 'bg-[#D4AF37] text-black shadow'
              : 'text-[#A09890] hover:text-white hover:bg-[#16130E]'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" /> Curated Quizzes ({curatedBundle.quizzes.length})
        </button>
        <button
          onClick={() => { setActiveSubTab('articles'); playSound('click'); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'articles'
              ? 'bg-[#D4AF37] text-black shadow'
              : 'text-[#A09890] hover:text-white hover:bg-[#16130E]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Articles & Papers ({curatedBundle.articles.length})
        </button>
      </div>

      {/* ========================================================
          SUB-TAB 1: BENTO OVERVIEW (ALL CURATED)
          ======================================================== */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Top Monarch / Figure Card */}
            {curatedBundle.figuresAndMonarchs[0] && (
              <div className="bg-[#14120E] border border-[#2A2419] rounded-2xl p-5 space-y-3.5 flex flex-col justify-between shadow">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#D4AF37]">
                    <span className="font-bold uppercase">Featured Sovereign / Leader</span>
                    <span className="text-[#8E867C]">{curatedBundle.figuresAndMonarchs[0].roleOrEra}</span>
                  </div>
                  <h4 className="font-serif italic font-bold text-white text-lg mt-1">
                    {curatedBundle.figuresAndMonarchs[0].name}
                  </h4>
                  <p className="text-xs text-[#D4AF37] font-sans">
                    {curatedBundle.figuresAndMonarchs[0].title}
                  </p>
                  <p className="text-xs text-[#A09890] mt-2 line-clamp-3 leading-relaxed">
                    {curatedBundle.figuresAndMonarchs[0].description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#221D14] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#8E867C]">{curatedBundle.figuresAndMonarchs[0].originRegion}</span>
                  <button
                    onClick={() => { setActiveSubTab('content'); setContentCategoryFilter('figures'); playSound('click'); }}
                    className="text-xs text-[#D4AF37] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    View All Figures →
                  </button>
                </div>
              </div>
            )}

            {/* Decisive Battle Card */}
            {curatedBundle.battles[0] && (() => {
              const matchedBattle = ALL_HISTORICAL_BATTLES.find(
                b => b.name.toLowerCase() === curatedBundle.battles[0].name.toLowerCase() ||
                     b.name.toLowerCase().includes(curatedBundle.battles[0].name.toLowerCase()) ||
                     curatedBundle.battles[0].name.toLowerCase().includes(b.name.toLowerCase())
              );

              return (
                <div className="bg-[#14120E] border border-[#2A2419] rounded-2xl p-5 space-y-3.5 flex flex-col justify-between shadow">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#D4AF37]">
                      <span className="font-bold uppercase flex items-center gap-1">
                        <Swords className="w-3 h-3" /> Tactical Engagement
                      </span>
                      <span className="text-[#8E867C]">
                        {curatedBundle.battles[0].year < 0 ? `${Math.abs(curatedBundle.battles[0].year)} BC` : `${curatedBundle.battles[0].year} AD`}
                      </span>
                    </div>
                    <h4 className="font-serif italic font-bold text-white text-lg mt-1">
                      {curatedBundle.battles[0].name}
                    </h4>
                    <p className="text-xs text-[#C5BDB5] line-clamp-2 mt-1 font-sans">
                      {curatedBundle.battles[0].commanders}
                    </p>

                    {/* Comparative Military Statistics Chart */}
                    {matchedBattle && (
                      <div className="mt-3">
                        <BattleComparisonChart battle={matchedBattle} mode="compact" />
                      </div>
                    )}

                    <div className="bg-[#0E0C09] p-2.5 rounded-xl border border-[#221D14] mt-2.5 text-[11px] text-[#A09890]">
                      <strong className="text-white block font-medium">Outcome:</strong>
                      {curatedBundle.battles[0].outcome}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[#221D14] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#8E867C]">{curatedBundle.battles[0].war}</span>
                    <button
                      onClick={() => {
                        if (onNavigateToTab && matchedBattle) {
                          onNavigateToTab('battles', undefined, matchedBattle.id);
                        } else {
                          setActiveSubTab('content');
                          setContentCategoryFilter('battles');
                        }
                        playSound('click');
                      }}
                      className="text-xs text-[#D4AF37] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      Examine Tactics →
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Quiz Challenge Card */}
            {activeQuiz && (
              <div className="bg-gradient-to-br from-[#1C1811] to-[#12100C] border border-[#D4AF37]/35 rounded-2xl p-5 space-y-3.5 flex flex-col justify-between shadow">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#D4AF37]">
                    <span className="font-bold uppercase flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> Curated Quiz
                    </span>
                    <span className="text-[#D4AF37]">{activeQuiz.difficulty} Difficulty</span>
                  </div>
                  <h4 className="font-serif italic font-bold text-white text-lg mt-1">
                    {activeQuiz.title}
                  </h4>
                  <p className="text-xs text-[#A09890] mt-1 line-clamp-2 font-sans">
                    {activeQuiz.description}
                  </p>
                  <div className="mt-3 text-xs text-[#E0D8D0] bg-[#0E0C09] p-3 rounded-xl border border-[#282216]">
                    <span className="font-mono text-[#D4AF37] block font-bold mb-1">
                      {activeQuiz.questions.length} Comprehensive Academic Questions
                    </span>
                    <span className="text-[11px] text-[#8E867C]">Includes verified archaeological & textual explanations.</span>
                  </div>
                </div>
                <button
                  onClick={() => { setActiveSubTab('quizzes'); playSound('click'); }}
                  className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                >
                  Launch Quiz Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Featured Curated Article Banner */}
          {curatedBundle.articles[0] && (
            <div className="bg-[#14120E] border border-[#2A2419] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#221D14] pb-3">
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="uppercase font-bold">Featured Curated Article / Paper</span>
                  <span>•</span>
                  <span className="text-[#8E867C]">{curatedBundle.articles[0].category}</span>
                </div>
                <span className="text-[11px] font-mono text-[#8E867C] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> ~{curatedBundle.articles[0].readTimeMinutes} min scholarly read
                </span>
              </div>

              <div>
                <h4 className="font-serif italic font-bold text-white text-xl">
                  {curatedBundle.articles[0].title}
                </h4>
                <p className="text-xs text-[#D4AF37] font-mono mt-0.5">
                  Authors / Historiography: {curatedBundle.articles[0].authorsOrSource}
                </p>
                <p className="text-xs sm:text-sm text-[#CCC2B8] mt-3 leading-relaxed font-sans">
                  {curatedBundle.articles[0].summary}
                </p>
              </div>

              <div className="bg-[#0E0C09] p-4 rounded-xl border border-[#221D14] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold block">
                  Key Scholarly Insights & Findings:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {curatedBundle.articles[0].keyInsights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#A09890]">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="leading-snug">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    if (onAddNote) {
                      onAddNote(
                        `Article Notes: ${curatedBundle.articles[0].title}`,
                        `SOURCE: ${curatedBundle.articles[0].authorsOrSource}\n\nSUMMARY:\n${curatedBundle.articles[0].summary}\n\nKEY FINDINGS:\n${curatedBundle.articles[0].keyInsights.map(k => `• ${k}`).join('\n')}`,
                        'Paper'
                      );
                      setSavedNotification(`Saved "${curatedBundle.articles[0].title}" to notebook!`);
                      setTimeout(() => setSavedNotification(null), 3500);
                      playSound('magicSparkle');
                    }
                  }}
                  className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" /> Save Article to Notebook
                </button>
                <button
                  onClick={() => { setActiveSubTab('articles'); playSound('click'); }}
                  className="px-4 py-2 bg-[#181510] hover:bg-[#221D14] border border-[#D4AF37]/40 text-[#D4AF37] rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Explore All Articles →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: CURATED CONTENT (FIGURES, EVENTS, BATTLES, RELICS)
          ======================================================== */}
      {activeSubTab === 'content' && (
        <div className="space-y-6">
          {/* Content Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: `All Content (${curatedBundle.figuresAndMonarchs.length + curatedBundle.events.length + curatedBundle.battles.length + curatedBundle.artifactsAndMonuments.length})` },
              { id: 'figures', label: `Figures & Monarchs (${curatedBundle.figuresAndMonarchs.length})` },
              { id: 'events', label: `Milestones (${curatedBundle.events.length})` },
              { id: 'battles', label: `Decisive Battles (${curatedBundle.battles.length})` },
              { id: 'relics', label: `Relics & Monuments (${curatedBundle.artifactsAndMonuments.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setContentCategoryFilter(tab.id as any); playSound('click'); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                  contentCategoryFilter === tab.id
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'bg-[#14120E] text-[#8E867C] border-[#252016] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 1. Figures & Monarchs */}
          {(contentCategoryFilter === 'all' || contentCategoryFilter === 'figures') && (
            <div className="space-y-4">
              <h4 className="text-base font-serif italic font-bold text-[#D4AF37] flex items-center gap-2">
                <Crown className="w-4 h-4" /> Sovereign Leaders & Key Figures
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curatedBundle.figuresAndMonarchs.map((fig) => (
                  <div key={fig.id} className="bg-[#12100C] border border-[#282216] rounded-2xl p-5 space-y-3 shadow">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#D4AF37]">
                      <span className="font-bold uppercase">{fig.roleOrEra}</span>
                      <span className="text-[#8E867C]">{fig.originRegion}</span>
                    </div>
                    <div>
                      <h5 className="font-serif italic font-bold text-white text-lg">{fig.name}</h5>
                      <span className="text-xs text-[#D4AF37] font-sans">{fig.title}</span>
                      <p className="text-xs text-[#A09890] mt-2 leading-relaxed font-sans">{fig.description}</p>
                    </div>

                    <div className="bg-[#0E0C09] p-3 rounded-xl border border-[#201B12] space-y-1.5">
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold block">
                        Historic Achievements:
                      </span>
                      {fig.achievements.map((ach, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-[#C5BDB5]">
                          <Check className="w-3 h-3 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span className="leading-snug">{ach}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#1E1911] flex items-center justify-between text-[11px]">
                      <button
                        onClick={() => {
                          if (onAddNote) {
                            onAddNote(
                              `Figure Profile: ${fig.name}`,
                              `${fig.title} (${fig.roleOrEra})\n\n${fig.description}\n\nACHIEVEMENTS:\n${fig.achievements.map(a => `• ${a}`).join('\n')}`,
                              fig.type === 'monarch' ? 'Monarch' : 'Figure'
                            );
                            setSavedNotification(`Saved ${fig.name} to notebook!`);
                            setTimeout(() => setSavedNotification(null), 3500);
                            playSound('magicSparkle');
                          }
                        }}
                        className="text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <BookmarkPlus className="w-3 h-3" /> Save to Notebook
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Decisive Battles */}
          {(contentCategoryFilter === 'all' || contentCategoryFilter === 'battles') && (
            <div className="space-y-4">
              <h4 className="text-base font-serif italic font-bold text-[#D4AF37] flex items-center gap-2">
                <Swords className="w-4 h-4" /> Decisive Battles & Tactical Engagements
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curatedBundle.battles.map((bat) => {
                  const matchedBattle = ALL_HISTORICAL_BATTLES.find(
                    b => b.name.toLowerCase() === bat.name.toLowerCase() ||
                         b.name.toLowerCase().includes(bat.name.toLowerCase()) ||
                         bat.name.toLowerCase().includes(b.name.toLowerCase())
                  );

                  return (
                    <div key={bat.id} className="bg-[#12100C] border border-[#282216] rounded-2xl p-5 space-y-3.5 shadow flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#D4AF37]">
                          <span className="font-bold">{bat.war}</span>
                          <span className="text-[#8E867C]">{bat.year < 0 ? `${Math.abs(bat.year)} BC` : `${bat.year} AD`}</span>
                        </div>
                        <div>
                          <h5 className="font-serif italic font-bold text-white text-lg">{bat.name}</h5>
                          <span className="text-xs text-[#8E867C] font-mono block mt-0.5">{bat.location}</span>
                        </div>

                        {/* Forces / Casualties Comparison Chart */}
                        {matchedBattle && (
                          <BattleComparisonChart battle={matchedBattle} mode="compact" />
                        )}

                        <div className="bg-[#0E0C09] p-3 rounded-xl border border-[#201B12] text-xs space-y-1.5">
                          <div className="text-[#D4AF37] font-semibold">{bat.commanders}</div>
                          <div className="text-white font-medium">{bat.outcome}</div>
                          <p className="text-[11px] text-[#A09890] leading-relaxed pt-1 border-t border-[#1C170F]">
                            {bat.tacticalSummary}
                          </p>
                        </div>
                      </div>

                      {matchedBattle && onNavigateToTab && (
                        <div className="pt-3 border-t border-[#1F1A12] flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              onNavigateToTab('battles', undefined, matchedBattle.id);
                              playSound('click');
                            }}
                            className="text-[11px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            Explore in 1,000+ Battles Archive →
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Historical Events */}
          {(contentCategoryFilter === 'all' || contentCategoryFilter === 'events') && (
            <div className="space-y-4">
              <h4 className="text-base font-serif italic font-bold text-[#D4AF37] flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Key Milestones & Turning Points
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {curatedBundle.events.map((evt) => (
                  <div key={evt.id} className="bg-[#12100C] border border-[#282216] rounded-2xl p-5 space-y-2.5 shadow">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#D4AF37]">
                      <span className="font-bold">{evt.year}</span>
                      <span className="text-[#8E867C]">{evt.category}</span>
                    </div>
                    <h5 className="font-serif italic font-bold text-white text-base">{evt.title}</h5>
                    <p className="text-xs text-[#CCC2B8] leading-relaxed font-sans">{evt.description}</p>
                    <div className="bg-[#0E0C09] p-2.5 rounded-lg border border-[#1E1911] text-[11px] text-[#A09890]">
                      <strong className="text-white font-medium block">Long-Term Impact:</strong>
                      {evt.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Relics & Monuments */}
          {(contentCategoryFilter === 'all' || contentCategoryFilter === 'relics') && (
            <div className="space-y-4">
              <h4 className="text-base font-serif italic font-bold text-[#D4AF37] flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Relics, Archaeological Specimens & Architecture
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {curatedBundle.artifactsAndMonuments.map((art) => (
                  <div key={art.id} className="bg-[#12100C] border border-[#282216] rounded-2xl p-5 space-y-2.5 shadow">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#D4AF37]">
                      <span className="font-bold">{art.category}</span>
                      <span className="text-[#8E867C]">{art.periodYear}</span>
                    </div>
                    <h5 className="font-serif italic font-bold text-white text-base">{art.name}</h5>
                    <p className="text-xs text-[#A09890] font-mono">{art.locationOrOrigin}</p>
                    <p className="text-xs text-[#CCC2B8] leading-relaxed font-sans">{art.summary}</p>
                    <div className="bg-[#0E0C09] p-2.5 rounded-lg border border-[#1E1911] text-[11px] text-[#A09890]">
                      <strong className="text-[#D4AF37] font-medium block">Key Detail:</strong>
                      {art.keyDetail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: CURATED QUIZZES (INTERACTIVE PLAYABLE ENGINE)
          ======================================================== */}
      {activeSubTab === 'quizzes' && (
        <div className="space-y-6">
          {/* Quiz Selector Selector if multiple quizzes exist */}
          {curatedBundle.quizzes.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {curatedBundle.quizzes.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setActiveQuizIndex(idx);
                    handleRestartQuiz();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeQuizIndex === idx
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow'
                      : 'bg-[#14120E] text-[#8E867C] border-[#252016] hover:text-white'
                  }`}
                >
                  Quiz {idx + 1}: {q.title}
                </button>
              ))}
            </div>
          )}

          {activeQuiz && (
            <div className="bg-[#12100C] border border-[#2A2419] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Quiz Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#221D14] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Academic Assessment</span>
                    <span>•</span>
                    <span className="text-[#8E867C]">{activeQuiz.category}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-white mt-1">
                    {activeQuiz.title}
                  </h3>
                  <p className="text-xs text-[#A09890] mt-0.5">{activeQuiz.description}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-1.5 bg-[#0E0C09] border border-[#252016] rounded-xl text-xs font-mono text-white">
                    Score: <strong className="text-[#D4AF37]">{quizScore}</strong> / {activeQuiz.questions.length}
                  </div>
                  <button
                    onClick={handleRestartQuiz}
                    className="p-2 rounded-xl bg-[#161410] border border-[#2A2419] text-[#A09890] hover:text-white transition-colors cursor-pointer"
                    title="Restart Quiz"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quiz Body or Completion Screen */}
              {!isQuizCompleted && activeQuestion ? (
                <div className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#8E867C]">
                      <span>Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}</span>
                      <span>{Math.round(((currentQuestionIndex) / activeQuiz.questions.length) * 100)}% Complete</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#181510] rounded-full overflow-hidden border border-[#221D14]">
                      <div
                        className="h-full bg-[#D4AF37] transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider">
                      Question Prompt:
                    </span>
                    <h4 className="text-base sm:text-lg text-white font-medium leading-relaxed font-sans">
                      {activeQuestion.question}
                    </h4>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-3">
                    {activeQuestion.options.map((opt, idx) => {
                      const isSelected = selectedAnswerIndex === idx;
                      const isCorrect = idx === activeQuestion.correctIndex;
                      
                      let btnStyle = 'bg-[#15130F] border-[#292318] text-[#DDD5CC] hover:border-[#D4AF37]/50';
                      if (isAnswerSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-300 line-through';
                        } else {
                          btnStyle = 'bg-[#15130F] border-[#221C14] text-[#777] opacity-60';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-[#D4AF37]/20 border-[#D4AF37] text-white font-bold ring-1 ring-[#D4AF37]';
                      }

                      return (
                        <button
                          key={idx}
                          id={`quiz-option-${idx}`}
                          onClick={() => handleSelectOption(idx)}
                          disabled={isAnswerSubmitted}
                          className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center font-mono text-xs text-[#D4AF37] shrink-0 font-bold">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </div>
                          {isAnswerSubmitted && isCorrect && (
                            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                          )}
                          {isAnswerSubmitted && isSelected && !isCorrect && (
                            <X className="w-5 h-5 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Answer Explanation & Next Control */}
                  {isAnswerSubmitted && (
                    <div className="bg-[#0E0C09] border border-[#282216] rounded-2xl p-4 sm:p-5 space-y-3 animate-fade-in">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        {selectedAnswerIndex === activeQuestion.correctIndex ? (
                          <span className="text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                          </span>
                        ) : (
                          <span className="text-rose-400 flex items-center gap-1.5">
                            <X className="w-4 h-4" /> Incorrect
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#CCC2B8] leading-relaxed font-sans">
                        <strong className="text-white font-medium">Historical Context: </strong>
                        {activeQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    {!isAnswerSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswerIndex === null}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedAnswerIndex !== null
                            ? 'bg-[#D4AF37] text-black hover:bg-[#E5C158] shadow-lg'
                            : 'bg-[#1C1811] text-[#666] border border-[#252016] cursor-not-allowed'
                        }`}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-black text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
                      >
                        {currentQuestionIndex + 1 < activeQuiz.questions.length ? 'Next Question →' : 'View Final Score 🏆'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Quiz Completed Screen */
                <div className="py-8 text-center space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37]">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif italic font-bold text-white">Assessment Completed!</h4>
                    <p className="text-xs text-[#A09890] mt-1">
                      You scored <strong className="text-[#D4AF37] font-bold text-sm">{quizScore}</strong> out of <strong className="text-white">{activeQuiz.questions.length}</strong> questions ({Math.round((quizScore / activeQuiz.questions.length) * 100)}%).
                    </p>
                  </div>

                  <div className="max-w-md mx-auto bg-[#0E0C09] p-4 rounded-xl border border-[#221D14] text-xs text-[#CCC2B8] leading-relaxed">
                    {quizScore === activeQuiz.questions.length ? (
                      <p className="text-emerald-300 font-medium">✨ Exceptional Mastery! You have demonstrated comprehensive command of this historical domain.</p>
                    ) : quizScore >= activeQuiz.questions.length / 2 ? (
                      <p className="text-[#D4AF37]">Well done! You possess strong historical foundations with room for deeper thematic exploration.</p>
                    ) : (
                      <p className="text-[#A09890]">Review the curated articles and figures above to sharpen your mastery before your next attempt.</p>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleRestartQuiz}
                      className="px-5 py-2.5 bg-[#181510] hover:bg-[#221D14] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                    </button>
                    <button
                      onClick={() => { setActiveSubTab('articles'); playSound('click'); }}
                      className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-black text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow"
                    >
                      Read Curated Articles <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 4: CURATED ARTICLES & SCHOLARLY LITERATURE
          ======================================================== */}
      {activeSubTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-serif italic font-bold text-[#D4AF37] flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Academic Research Papers & Historiographical Monographs
            </h4>
            <span className="text-[11px] font-mono text-[#8E867C]">
              {curatedBundle.articles.length} In-Depth Studies
            </span>
          </div>

          <div className="space-y-4">
            {curatedBundle.articles.map((art) => (
              <div
                key={art.id}
                className="bg-[#12100C] border border-[#282216] rounded-2xl p-6 shadow-xl space-y-4 transition-all hover:border-[#D4AF37]/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#201B12] pb-3">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37]">
                    <span className="uppercase font-bold">{art.category}</span>
                    <span>•</span>
                    <span className="text-[#8E867C]">{art.type === 'scholarly_paper' ? 'Peer-Reviewed Paper' : 'Encyclopedic Monograph'}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#8E867C] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> ~{art.readTimeMinutes} min read
                  </span>
                </div>

                <div>
                  <h5 className="font-serif italic font-bold text-white text-xl">{art.title}</h5>
                  <p className="text-xs text-[#D4AF37] font-mono mt-0.5">Author / Corpus: {art.authorsOrSource}</p>
                  <p className="text-xs sm:text-sm text-[#CCC2B8] mt-3 leading-relaxed font-sans">{art.summary}</p>
                </div>

                {/* Key Scholarly Insights */}
                <div className="bg-[#0E0C09] p-4 rounded-xl border border-[#201B12] space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold block">
                    Key Scholarly Insights & Theses:
                  </span>
                  <div className="space-y-1.5">
                    {art.keyInsights.map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#A09890]">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="leading-snug">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (onAddNote) {
                        onAddNote(
                          `Article: ${art.title}`,
                          `SOURCE: ${art.authorsOrSource}\n\nABSTRACT:\n${art.summary}\n\nKEY INSIGHTS:\n${art.keyInsights.map(k => `• ${k}`).join('\n')}`,
                          'Paper'
                        );
                        setSavedNotification(`Saved "${art.title}" to notebook!`);
                        setTimeout(() => setSavedNotification(null), 3500);
                        playSound('magicSparkle');
                      }
                    }}
                    className="text-xs text-[#D4AF37] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" /> Save Article to Notebook
                  </button>

                  {art.citationOrLink && (
                    <a
                      href={art.citationOrLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-[#181510] hover:bg-[#201B12] border border-[#D4AF37]/35 text-[#D4AF37] rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Read Original Citation</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
