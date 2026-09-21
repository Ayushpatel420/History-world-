import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, 
  Sparkles, 
  BookOpen, 
  Award, 
  Clock, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  ExternalLink, 
  Bookmark as BookmarkIcon, 
  ScrollText, 
  CheckCircle2, 
  Quote, 
  Compass, 
  UserCheck, 
  Flame,
  ArrowRight,
  Info
} from 'lucide-react';
import { Bookmark, SpotlightFigure } from '../types';
import { 
  SPOTLIGHT_FIGURES, 
  getDailySpotlightFigure, 
  getWeeklySpotlightFigure, 
  getNextDailyCountdown, 
  getNextWeeklyCountdown,
  getDayOfYear,
  getWeekOfYear
} from '../data/spotlightFiguresData';

interface HistoricalFigureSpotlightSectionProps {
  onNavigateToVault: (figureId: string, vaultTab: 'figures' | 'monarchs' | 'leaders') => void;
  bookmarks?: Bookmark[];
  onToggleBookmark?: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  initialFigureId?: string;
}

export default function HistoricalFigureSpotlightSection({
  onNavigateToVault,
  bookmarks = [],
  onToggleBookmark,
  initialFigureId
}: HistoricalFigureSpotlightSectionProps) {
  // Cadence: 'daily' | 'weekly' | 'custom'
  const [cadence, setCadence] = useState<'daily' | 'weekly' | 'custom'>('daily');
  const [selectedFigureId, setSelectedFigureId] = useState<string>(() => {
    if (initialFigureId) return initialFigureId;
    return getDailySpotlightFigure().id;
  });

  // Date offset for browsing previous / next daily/weekly spotlights
  const [dateOffset, setDateOffset] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<'bio' | 'achievements' | 'anecdotes' | 'facts'>('bio');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [countdown, setCountdown] = useState(getNextDailyCountdown());

  // Update countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (cadence === 'daily') {
        setCountdown(getNextDailyCountdown());
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [cadence]);

  // Sync when initialFigureId prop changes
  useEffect(() => {
    if (initialFigureId) {
      setSelectedFigureId(initialFigureId);
      setCadence('custom');
    }
  }, [initialFigureId]);

  // Compute the current spotlight figure based on mode and offset
  const currentFigure: SpotlightFigure = React.useMemo(() => {
    if (cadence === 'custom') {
      const found = SPOTLIGHT_FIGURES.find(f => f.id === selectedFigureId);
      return found || SPOTLIGHT_FIGURES[0];
    }
    const targetDate = new Date();
    if (cadence === 'daily') {
      targetDate.setDate(targetDate.getDate() + dateOffset);
      return getDailySpotlightFigure(targetDate);
    } else {
      // Weekly
      targetDate.setDate(targetDate.getDate() + (dateOffset * 7));
      return getWeeklySpotlightFigure(targetDate);
    }
  }, [cadence, selectedFigureId, dateOffset]);

  // Keep selectedFigureId in sync when cadence/offset changes
  useEffect(() => {
    if (cadence !== 'custom') {
      setSelectedFigureId(currentFigure.id);
    }
  }, [currentFigure.id, cadence]);

  const handleRandomFigure = () => {
    const remaining = SPOTLIGHT_FIGURES.filter(f => f.id !== currentFigure.id);
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const chosen = remaining[randomIndex] || SPOTLIGHT_FIGURES[0];
    setCadence('custom');
    setSelectedFigureId(chosen.id);
  };

  const handleSelectFromArchive = (figId: string) => {
    setCadence('custom');
    setSelectedFigureId(figId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isBookmarked = bookmarks.some(
    b => b.targetId === currentFigure.id && (b.type === 'figure' || b.type === 'ruler')
  );

  const filteredArchive = SPOTLIGHT_FIGURES.filter(fig => {
    if (categoryFilter === 'All') return true;
    if (categoryFilter === 'Monarchs') return fig.category === 'King' || fig.category === 'Queen';
    if (categoryFilter === 'Leaders') return fig.category === 'Leader';
    if (categoryFilter === 'Thinkers') return fig.category === 'Philosopher' || fig.category === 'Scientist' || fig.category === 'Polymath';
    if (categoryFilter === 'Warriors') return fig.category === 'Warrior';
    return true;
  });

  const getCategoryColor = (cat: SpotlightFigure['category']) => {
    switch (cat) {
      case 'King':
      case 'Queen':
        return 'text-amber-300 border-amber-500/40 bg-amber-950/20';
      case 'Leader':
        return 'text-blue-300 border-blue-500/40 bg-blue-950/20';
      case 'Philosopher':
        return 'text-emerald-300 border-emerald-500/40 bg-emerald-950/20';
      case 'Scientist':
      case 'Polymath':
        return 'text-purple-300 border-purple-500/40 bg-purple-950/20';
      case 'Warrior':
        return 'text-rose-300 border-rose-500/40 bg-rose-950/20';
      default:
        return 'text-[#D4AF37] border-[#D4AF37]/40 bg-[#D4AF37]/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8 pb-16 text-left"
    >
      {/* Top Banner Header with Cadence Switcher */}
      <div className="bg-gradient-to-b from-[#161616] to-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1C12] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prominent Historical Figure Spotlight</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Spotlight Chronicle
            </h1>
            <p className="text-xs sm:text-sm text-[#A09890] max-w-2xl leading-relaxed">
              Showcasing the world’s most influential kings, queens, global leaders, and visionary thinkers each day and week—with comprehensive biographies, landmark achievements, and unforgettable historical anecdotes.
            </p>
          </div>

          {/* Cadence Selector Tabs & Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex bg-[#0A0A0A] p-1.5 rounded-xl border border-[#2A2A2A]">
              <button
                onClick={() => { setCadence('daily'); setDateOffset(0); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  cadence === 'daily'
                    ? 'bg-[#1F1C12] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                    : 'text-[#A09890] hover:text-white'
                }`}
                title="View today's highlighted historical figure"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Daily Figure</span>
              </button>

              <button
                onClick={() => { setCadence('weekly'); setDateOffset(0); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  cadence === 'weekly'
                    ? 'bg-[#1F1C12] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                    : 'text-[#A09890] hover:text-white'
                }`}
                title="View this week's featured historical figure"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Weekly Spotlight</span>
              </button>
            </div>

            <button
              onClick={handleRandomFigure}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#E0D8D0] bg-[#141414] hover:bg-[#1C1C1C] border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-all cursor-pointer shrink-0"
              title="Pick a random historical figure from the chronicle"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Surprise Figure</span>
            </button>
          </div>
        </div>

        {/* Date Navigation Strip & Countdown */}
        <div className="mt-6 pt-5 border-t border-[#202020] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (cadence === 'custom') setCadence('daily');
                setDateOffset(prev => prev - 1);
              }}
              className="p-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] text-[#A09890] hover:text-white border border-[#2A2A2A] transition-colors cursor-pointer"
              title={cadence === 'weekly' ? 'Previous Week' : 'Previous Day'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-mono text-[#D4AF37] font-semibold px-2">
              {cadence === 'daily' && (
                dateOffset === 0 ? "Today's Spotlight" : dateOffset === -1 ? "Yesterday's Spotlight" : dateOffset === 1 ? "Tomorrow's Spotlight" : `${Math.abs(dateOffset)} Days ${dateOffset < 0 ? 'Ago' : 'Ahead'}`
              )}
              {cadence === 'weekly' && (
                dateOffset === 0 ? "This Week's Spotlight" : dateOffset === -1 ? "Last Week's Spotlight" : dateOffset === 1 ? "Next Week's Spotlight" : `${Math.abs(dateOffset)} Weeks ${dateOffset < 0 ? 'Ago' : 'Ahead'}`
              )}
              {cadence === 'custom' && (
                "Curated Selection"
              )}
            </span>

            <button
              onClick={() => {
                if (cadence === 'custom') setCadence('daily');
                setDateOffset(prev => prev + 1);
              }}
              className="p-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] text-[#A09890] hover:text-white border border-[#2A2A2A] transition-colors cursor-pointer"
              title={cadence === 'weekly' ? 'Next Week' : 'Next Day'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {dateOffset !== 0 && (
              <button
                onClick={() => setDateOffset(0)}
                className="text-[11px] text-[#A09890] hover:text-[#D4AF37] underline ml-2 cursor-pointer"
              >
                Reset to Present
              </button>
            )}
          </div>

          {cadence === 'daily' && dateOffset === 0 && (
            <div className="flex items-center gap-2 text-[#A09890] font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Next Daily Spotlight in:</span>
              <span className="text-white font-bold bg-[#141414] px-2 py-0.5 rounded border border-[#252525]">
                {String(countdown.hours).padStart(2, '0')}h {String(countdown.minutes).padStart(2, '0')}m {String(countdown.seconds).padStart(2, '0')}s
              </span>
            </div>
          )}

          {cadence === 'weekly' && dateOffset === 0 && (
            <div className="flex items-center gap-2 text-[#A09890] font-mono text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Week {getWeekOfYear()} of {new Date().getFullYear()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Spotlight Featured Card */}
      <div className="bg-[#0F0F0F] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl">
        {/* Top Hero Section: Portrait, Titles, Quote, Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 bg-gradient-to-b from-[#141414] to-[#0F0F0F] border-b border-[#242424]">
          {/* Portrait Column */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
            <div className="relative w-full aspect-[4/5] max-w-sm rounded-xl overflow-hidden border-2 border-[#2A2A2A] shadow-2xl group">
              <img
                src={currentFigure.portraitUrl}
                alt={currentFigure.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              
              {/* Category Pill on image */}
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider border backdrop-blur-md ${getCategoryColor(currentFigure.category)}`}>
                  {currentFigure.category}
                </span>
              </div>

              {/* Region / Civilization */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-[11px] text-amber-200/90 font-mono tracking-wide">{currentFigure.region}</p>
                <p className="text-xs text-white/80 font-serif italic">{currentFigure.era}</p>
              </div>
            </div>
          </div>

          {/* Core Info & Actions Column */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-left">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] bg-[#1E1C15] border border-[#D4AF37]/30 text-[#D4AF37] px-2.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase">
                    {currentFigure.period}
                  </span>
                  <span className="text-xs text-[#807870] font-sans">
                    • Featured Figure #{SPOTLIGHT_FIGURES.findIndex(f => f.id === currentFigure.id) + 1} of {SPOTLIGHT_FIGURES.length}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                  {currentFigure.name}
                </h2>
                <p className="text-sm sm:text-base text-[#D4AF37] font-serif italic">
                  {currentFigure.title}
                </p>
              </div>

              {/* Signature Quote Banner */}
              {currentFigure.quote && (
                <div className="relative p-4 sm:p-5 rounded-xl bg-[#151515] border-l-4 border-[#D4AF37] border-y border-r border-[#262626] shadow-md space-y-1 text-left">
                  <Quote className="w-5 h-5 text-[#D4AF37]/40 mb-1" />
                  <p className="text-sm sm:text-base font-serif italic text-white leading-relaxed">
                    "{currentFigure.quote}"
                  </p>
                  {currentFigure.quoteContext && (
                    <p className="text-[11px] text-[#A09890] font-mono mt-1">
                      — {currentFigure.quoteContext}
                    </p>
                  )}
                </div>
              )}

              {/* Legacy Summary Hook */}
              <p className="text-xs sm:text-sm text-[#C8C0B8] leading-relaxed">
                {currentFigure.legacySummary}
              </p>
            </div>

            {/* ACTION BAR: Link to Full Profile in Figures Vault! */}
            <div className="pt-4 border-t border-[#222222] flex flex-wrap items-center gap-3">
              {/* Primary user-requested link to Figures Vault */}
              <button
                onClick={() => onNavigateToVault(currentFigure.vaultTarget.id, currentFigure.vaultTarget.tab)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89428] hover:from-[#E5C158] hover:to-[#C9A233] text-black font-semibold text-xs sm:text-sm shadow-lg shadow-[#D4AF37]/15 transition-all transform hover:-translate-y-0.5 cursor-pointer font-sans"
                title={`Open ${currentFigure.name}'s complete profile, artifacts, and private notes inside the ${currentFigure.vaultTarget.tab === 'figures' ? 'Figure Archive' : currentFigure.vaultTarget.tab === 'monarchs' ? 'Kings & Queens Vault' : 'Global Leaders Vault'}`}
              >
                <ScrollText className="w-4 h-4" />
                <span>View Full Profile within Figures Vault</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              {/* Bookmark Toggle */}
              <button
                onClick={() => onToggleBookmark?.(
                  currentFigure.id,
                  currentFigure.category === 'King' || currentFigure.category === 'Queen' ? 'ruler' : 'figure',
                  currentFigure.name,
                  currentFigure.title
                )}
                className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-amber-950/30 text-amber-300 border-amber-500/50'
                    : 'bg-[#141414] text-[#C0B8B0] hover:text-white border-[#2A2A2A] hover:border-[#D4AF37]/40'
                }`}
                title={isBookmarked ? "Remove from bookmarks" : "Save this figure"}
              >
                <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current text-amber-400' : ''}`} />
                <span>{isBookmarked ? 'Saved to Vault' : 'Bookmark Figure'}</span>
              </button>

              {/* Wikipedia External Link */}
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(currentFigure.name.replace(/\s+/g, '_'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold text-[#A09890] hover:text-white bg-[#141414] hover:bg-[#1A1A1A] border border-[#2A2A2A] transition-all cursor-pointer"
                title={`Read full encyclopedic article on Wikipedia`}
              >
                <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                <span>Wikipedia ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Structured Tabs Bar for Detail Investigation */}
        <div className="border-b border-[#242424] bg-[#0A0A0A] px-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('bio')}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'bio'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#141414]/50'
                : 'border-transparent text-[#A09890] hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Biography & Life</span>
          </button>

          <button
            onClick={() => setActiveSubTab('achievements')}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'achievements'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#141414]/50'
                : 'border-transparent text-[#A09890] hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Key Achievements ({currentFigure.keyAchievements.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('anecdotes')}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'anecdotes'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#141414]/50'
                : 'border-transparent text-[#A09890] hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Interesting Anecdotes ({currentFigure.anecdotes.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('facts')}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'facts'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#141414]/50'
                : 'border-transparent text-[#A09890] hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Fast Facts & Records</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 sm:p-8">
          {/* 1. BIOGRAPHY TAB */}
          {activeSubTab === 'bio' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-4xl"
            >
              <div className="prose prose-invert max-w-none text-left">
                {currentFigure.biography.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-[#D0C8C0] leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Quick Vault Callout Inside Bio */}
              <div className="mt-8 p-4 rounded-xl bg-[#141414] border border-[#2A2A2A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                    <ScrollText className="w-3.5 h-3.5" /> Synchronized Vault Entry
                  </h4>
                  <p className="text-xs text-[#A09890]">
                    Explore {currentFigure.name} inside the Figures Vault to take custom research notes, view related events, and explore neighboring sovereigns.
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToVault(currentFigure.vaultTarget.id, currentFigure.vaultTarget.tab)}
                  className="px-4 py-2 rounded-lg bg-[#1F1C12] hover:bg-[#2A2518] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
                >
                  Open Vault Record ➔
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. KEY ACHIEVEMENTS TAB */}
          {activeSubTab === 'achievements' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {currentFigure.keyAchievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#D4AF37]/40 transition-all space-y-2 text-left"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <h4 className="text-sm font-serif font-bold text-white tracking-tight">
                      {ach.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#A8A098] leading-relaxed pl-6.5 font-sans">
                    {ach.description}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {/* 3. INTERESTING ANECDOTES TAB */}
          {activeSubTab === 'anecdotes' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                {currentFigure.anecdotes.map((anec, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-[#141414] border border-[#282828] hover:border-amber-500/40 transition-all space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-2 text-[#D4AF37]">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                        Historical Anecdote #{idx + 1}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                      {anec.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#D0C8C0] leading-relaxed">
                      {anec.story}
                    </p>

                    {anec.significance && (
                      <div className="mt-2 pt-3 border-t border-[#222222] flex items-start gap-2">
                        <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold shrink-0 mt-0.5">
                          Significance:
                        </span>
                        <p className="text-xs text-[#A09890] italic">
                          {anec.significance}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 4. FAST FACTS & RECORDS TAB */}
          {activeSubTab === 'facts' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentFigure.fastFacts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#141414] border border-[#262626] space-y-1 text-left"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A09890] font-semibold">
                      {fact.label}
                    </span>
                    <p className="text-sm font-semibold text-white font-sans">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Direct Jump to Profile Action */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => onNavigateToVault(currentFigure.vaultTarget.id, currentFigure.vaultTarget.tab)}
                  className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Explore in Figure Archive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Spotlight Archive & Carousel: Browse All Figures */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#242424] pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
              <span>Spotlight Chronicle Archive</span>
            </h3>
            <p className="text-xs text-[#A09890]">
              Browse other featured sovereigns, leaders, and thinkers from across world history.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1 bg-[#0A0A0A] p-1 rounded-xl border border-[#262626]">
            {['All', 'Monarchs', 'Leaders', 'Thinkers', 'Warriors'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#1C1A14] text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'text-[#A09890] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Archive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredArchive.map(figure => {
            const isSelected = figure.id === currentFigure.id;
            return (
              <div
                key={figure.id}
                onClick={() => handleSelectFromArchive(figure.id)}
                className={`group p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 text-left ${
                  isSelected
                    ? 'bg-[#181610] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                    : 'bg-[#0E0E0E] border-[#222222] hover:border-[#3A3A3A] hover:bg-[#141414]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={figure.portraitUrl}
                    alt={figure.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover object-top rounded-lg border border-[#2A2A2A] shrink-0"
                  />
                  <div className="space-y-0.5 overflow-hidden">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider border ${getCategoryColor(figure.category)}`}>
                      {figure.category}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-white truncate group-hover:text-[#D4AF37] transition-colors mt-1">
                      {figure.name}
                    </h4>
                    <p className="text-[11px] text-[#A09890] truncate font-serif italic">
                      {figure.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1C1C1C] text-[11px] text-[#807870]">
                  <span>{figure.region.split('/')[0]}</span>
                  <span className="text-[#D4AF37] font-semibold group-hover:underline">
                    {isSelected ? 'Currently Viewing' : 'View Spotlight ➔'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
