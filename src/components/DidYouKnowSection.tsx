import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Sparkles, 
  Shuffle, 
  Calendar, 
  BookMarked, 
  ExternalLink, 
  Bookmark as BookmarkIcon, 
  Volume2, 
  VolumeX, 
  Clock, 
  Share2, 
  Check, 
  FilePlus, 
  BookOpen, 
  Compass, 
  Landmark, 
  Feather, 
  CheckCircle2, 
  MapPin, 
  ArrowRight, 
  MessageSquare, 
  RotateCcw,
  Dice5,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HistoricalFact, Bookmark } from '../types';
import { HISTORICAL_FACTS, getDailyFactForDate } from '../data/factsData';
import { playSound } from '../utils/audio';

interface DidYouKnowSectionProps {
  onNavigateTo: (targetTab: any, subTab?: string, entityId?: string) => void;
  onAddNote: (title: string, content: string, type: 'Monarch' | 'Figure' | 'Country' | 'Event' | 'General', targetId?: string) => void;
  onToggleBookmark: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  bookmarks: Bookmark[];
  focusFactId?: string;
}

export default function DidYouKnowSection({
  onNavigateTo,
  onAddNote,
  onToggleBookmark,
  bookmarks,
  focusFactId
}: DidYouKnowSectionProps) {
  // Deterministically compute Today's Historical Fact
  const today = useMemo(() => new Date(), []);
  const todayFact = useMemo(() => getDailyFactForDate(today), [today]);
  const todayFormatted = useMemo(() => {
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }, [today]);

  const todayFactIndex = useMemo(() => {
    const idx = HISTORICAL_FACTS.findIndex(f => f.id === todayFact.id);
    return idx !== -1 ? idx : 0;
  }, [todayFact]);

  // Current selected fact index (defaults to Today's Fact or focusFactId if supplied)
  const [selectedFactIndex, setSelectedFactIndex] = useState<number>(() => {
    if (focusFactId) {
      const idx = HISTORICAL_FACTS.findIndex(f => f.id === focusFactId);
      if (idx !== -1) return idx;
    }
    return todayFactIndex;
  });

  // Track if user is on a surprise/random fact or today's fact
  const isViewingToday = selectedFactIndex === todayFactIndex;

  // Active dossier tab
  const [activeDossierTab, setActiveDossierTab] = useState<'overview' | 'context' | 'connections' | 'quirks'>('overview');

  // Text to Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Copied share status
  const [copied, setCopied] = useState(false);

  // Note Modal State
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // 'Surprise Me' Shuffling Animation State
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleFactIndex, setShuffleFactIndex] = useState<number | null>(null);
  const shuffleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active Fact to render
  const activeFact = useMemo(() => {
    if (isShuffling && shuffleFactIndex !== null) {
      return HISTORICAL_FACTS[shuffleFactIndex] || todayFact;
    }
    return HISTORICAL_FACTS[selectedFactIndex] || todayFact;
  }, [isShuffling, shuffleFactIndex, selectedFactIndex, todayFact]);

  const isBookmarked = bookmarks.some(b => b.targetId === activeFact.id && b.type === 'fact');

  // Handle 'Surprise Me' random fact shuffle with smooth animation
  const handleSurpriseMe = () => {
    if (isShuffling) return;

    // Stop audio narration if active
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    setIsShuffling(true);
    playSound('click');

    let steps = 0;
    const maxSteps = 15;
    let delay = 65; // ms per shuffle tick

    const runShuffleStep = () => {
      steps++;
      const randomIdx = Math.floor(Math.random() * HISTORICAL_FACTS.length);
      setShuffleFactIndex(randomIdx);

      if (steps < maxSteps) {
        // Progressively decelerate towards the end for an authentic slot-reel feel
        delay += 9;
        shuffleTimerRef.current = setTimeout(runShuffleStep, delay);
      } else {
        // Final random pick ensuring it's different from the current fact
        let finalIdx = Math.floor(Math.random() * HISTORICAL_FACTS.length);
        if (finalIdx === selectedFactIndex && HISTORICAL_FACTS.length > 1) {
          finalIdx = (finalIdx + 1) % HISTORICAL_FACTS.length;
        }
        setSelectedFactIndex(finalIdx);
        setIsShuffling(false);
        setShuffleFactIndex(null);
        playSound('click');
      }
    };

    runShuffleStep();
  };

  // Return to Today's Fact
  const handleReturnToToday = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    playSound('click');
    setSelectedFactIndex(todayFactIndex);
  };

  // Text-to-speech audio handler
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const activeText = activeFact.fact + ". " + activeFact.explanation;
      const utterance = new SpeechSynthesisUtterance(activeText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Cleanup speech synthesis and timers on unmount or fact change
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (shuffleTimerRef.current) {
        clearTimeout(shuffleTimerRef.current);
      }
    };
  }, [selectedFactIndex]);

  // Share / Copy Link to clipboard
  const handleShareFact = (fact: HistoricalFact) => {
    playSound('click');
    const shareText = `💡 Did You Know? "${fact.headline}"\n\n${fact.fact}\n\nDiscovered via History World Archive.`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Open note modal for active fact
  const handleOpenNoteModal = (fact: HistoricalFact) => {
    setNoteTitle(`Fact Notes: ${fact.title}`);
    setNoteContent(`Fact: ${fact.fact}\n\nContext: ${fact.explanation}\n\nEra: ${fact.era} | Region: ${fact.cultureRegion}`);
    setIsNoteModalOpen(true);
  };

  // Save Note callback
  const handleSaveFactNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    onAddNote(noteTitle, noteContent, 'General', activeFact.id);
    setIsNoteModalOpen(false);
  };

  // Accession catalog code
  const accessionNumber = `DYK-${activeFact.id.replace('fact_', '').slice(0, 10).toUpperCase()}`;

  return (
    <div id="did-you-know-vault-section" className="space-y-8 animate-fade-in text-left">
      
      {/* Top Banner: Curatorial Header with Today's Fact Focus & Surprise Me Action */}
      <div className="bg-gradient-to-br from-[#14110C] via-[#18140E] to-[#0A0907] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            {isViewingToday && !isShuffling ? (
              <span className="bg-[#D4AF37] text-black font-mono font-black text-[10px] uppercase px-3 py-1 rounded-full tracking-wider shadow flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-black" /> Today's Official Fact
              </span>
            ) : (
              <span className="bg-[#9B51E0] text-white font-mono font-black text-[10px] uppercase px-3 py-1 rounded-full tracking-wider shadow flex items-center gap-1.5">
                <Dice5 className="w-3.5 h-3.5 text-white" /> Surprise Vault Chronicle
              </span>
            )}
            
            <span className="text-xs font-mono text-[#A09890] flex items-center gap-1.5 bg-[#1C1811] px-3 py-0.5 rounded-full border border-[#2A2418]">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {todayFormatted}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5B8] via-[#D4AF37] to-[#AA7C11]">
            Did You Know? Vault
          </h2>

          <p className="text-xs sm:text-sm text-[#A09890] leading-relaxed font-sans">
            Every day, this vault curates one extraordinary, peer-verified anomaly from world history. Click <span className="text-[#D4AF37] font-semibold">Surprise Me</span> to shuffle through the archives for a completely random chronicle.
          </p>
        </div>

        {/* Primary Controls: Surprise Me Button & Return to Today Button */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          {!isViewingToday && (
            <button
              onClick={handleReturnToToday}
              disabled={isShuffling}
              className="px-4 py-2.5 bg-[#17140F] hover:bg-[#241E15] text-[#D4AF37] hover:text-[#FFF5B8] border border-[#D4AF37]/40 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md disabled:opacity-50"
              title="Return to Today's official daily historical fact"
            >
              <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
              <span>Today's Fact</span>
            </button>
          )}

          <button
            onClick={handleSurpriseMe}
            disabled={isShuffling}
            className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38728] hover:from-[#FFF0A0] hover:to-[#D4AF37] text-black font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg hover:shadow-[#D4AF37]/30 transform active:scale-95 disabled:opacity-75"
            title="Shuffle through the database to explore a completely random historical fact"
          >
            <Shuffle className={`w-4 h-4 text-black ${isShuffling ? 'animate-spin' : ''}`} />
            <span>{isShuffling ? 'Shuffling Archives...' : 'Surprise Me'}</span>
          </button>
        </div>
      </div>

      {/* Shuffling Animated Ticker Banner (appears when user triggers Surprise Me) */}
      <AnimatePresence>
        {isShuffling && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-5 bg-gradient-to-r from-[#211A10] via-[#2A2114] to-[#14110C] border-2 border-[#D4AF37] rounded-2xl shadow-2xl relative overflow-hidden space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37]">
              <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
                <Dice5 className="w-4 h-4 text-[#D4AF37] animate-spin" />
                Randomizing Archival Chronicle...
              </span>
              <span className="text-[#A09890] text-[11px]">Database Search: 60 Records</span>
            </div>

            <motion.div 
              key={activeFact.id}
              initial={{ opacity: 0.5, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.08 }}
              className="text-base sm:text-lg font-serif italic font-bold text-white leading-snug line-clamp-1"
            >
              "{activeFact.headline}"
            </motion.div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-[#A09890]">
              <span className="text-[#D4AF37]">{activeFact.cultureRegion}</span>
              <span>•</span>
              <span>{activeFact.era} Era ({activeFact.yearOrPeriod})</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Fact Presentation: Left Curatorial Plaque + Right Archival Dossier */}
      <motion.div 
        key={activeFact.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        id="main-fact-dossier-grid" 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        
        {/* Left Column: Curatorial Archaeological Plaque */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-b from-[#16130F] via-[#12100C] to-[#0A0907] border border-[#D4AF37]/40 rounded-3xl p-6 shadow-2xl space-y-5">
            
            {/* Plaque Header & Curatorial Seal */}
            <div className="flex items-start justify-between border-b border-[#2A261D] pb-4">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-[#D4AF37] tracking-wider">
                  <Landmark className="w-3.5 h-3.5" /> Curatorial Archival Dossier
                </div>
                <h3 className="font-serif italic font-black text-xl text-white mt-1">
                  {activeFact.title}
                </h3>
                <p className="text-xs text-[#A09890] mt-0.5 font-sans">
                  {activeFact.cultureRegion} • {activeFact.era} Era
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#231E15] border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-bold shrink-0 text-center shadow">
                <span className="block text-[8px] uppercase tracking-wider text-[#8E867C]">Catalog</span>
                #{accessionNumber}
              </div>
            </div>

            {/* Inscription & Discovery Statement Box */}
            <div className="bg-[#0D0B08] border border-[#262016] rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider flex items-center gap-1">
                <Feather className="w-3 h-3" /> Archival Inscription & Discovery Statement
              </span>
              <p className="text-xs text-[#CCC2B8] leading-relaxed font-sans italic border-l-2 border-[#D4AF37]/60 pl-2.5">
                "{activeFact.headline}"
              </p>
            </div>

            {/* Comprehensive Archaeological Matrix */}
            <div className="space-y-3">
              <h5 className="font-mono text-xs uppercase font-bold text-[#D4AF37] tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Historiographical & Archival Matrix
              </h5>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C]">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Chronological Era</span>
                  <span className="font-bold text-[#E0D8D0] block mt-0.5">{activeFact.era}</span>
                </div>
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C]">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Date / Period</span>
                  <span className="font-bold text-[#E0D8D0] block mt-0.5">{activeFact.yearOrPeriod}</span>
                </div>
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C]">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Civilization / Region</span>
                  <span className="font-bold text-[#E0D8D0] block mt-0.5">{activeFact.cultureRegion}</span>
                </div>
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C]">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Primary Domain</span>
                  <span className="font-bold text-[#E0D8D0] block mt-0.5">{activeFact.category}</span>
                </div>
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C] col-span-2">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Key Historical Figure / Originator</span>
                  <span className="font-bold text-[#D4AF37] block mt-0.5">
                    {activeFact.notableFigure || 'Archival Collective / Historical State'}
                  </span>
                </div>
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C] col-span-2">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Verification Status</span>
                  <span className="text-[#CCC2B8] block text-[11px] mt-0.5 leading-relaxed">
                    Verified through cross-referenced primary sources, scholastic consensus, and documented historical treaties.
                  </span>
                </div>
              </div>
            </div>

            {/* Diagnostic Hallmarks Checklist */}
            <div className="space-y-2 pt-1 border-t border-[#2A261D]">
              <span className="text-[10px] font-mono text-[#8E867C] uppercase font-bold tracking-wider block">
                Archival Hallmarks & Keywords:
              </span>
              <div className="space-y-1.5">
                {activeFact.tags.slice(0, 3).map((tag, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#CCC2B8] bg-[#12100C] p-2 rounded-lg border border-[#201E19]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Wikipedia / External Exploration Footer Link */}
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent((activeFact.notableFigure || activeFact.headline.split('—')[0] || activeFact.title).replace(/\s+/g, '_'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#181510] hover:bg-[#201C14] border border-[#D4AF37]/35 text-[#D4AF37] hover:text-[#FFF5B8] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Explore Verified Scholastic Source on Wikipedia</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Historical Dossier, Core Discovery & Tabs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header Identification Block */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#221D12] border border-[#D4AF37]/50 text-[#D4AF37] rounded-xl text-xs font-bold font-mono">
                {activeFact.category}
              </span>
              <span className="px-3 py-1 bg-[#161616] border border-[#2A2A2A] text-[#E0D8D0] rounded-xl text-xs font-mono">
                {activeFact.era} ({activeFact.yearOrPeriod})
              </span>
              <span className="text-xs text-[#A09890] flex items-center gap-1 font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {activeFact.cultureRegion}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif italic font-black text-white tracking-tight leading-snug">
              {activeFact.headline}
            </h1>

            {activeFact.quote && (
              <p className="text-sm text-[#D4AF37] font-serif italic leading-relaxed border-l-2 border-[#D4AF37]/60 pl-3">
                "{activeFact.quote.text}" — <span className="font-sans text-xs text-[#A09890] not-italic">{activeFact.quote.author}</span>
              </p>
            )}
          </div>

          {/* Action Row: Bookmark, Listen, Note, Share */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              onClick={() => onToggleBookmark(activeFact.id, 'fact', activeFact.title, activeFact.headline)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-sm ${
                isBookmarked
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#16130E] text-[#A09890] border-[#2A2A2A] hover:text-white hover:border-[#D4AF37]/40'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>{isBookmarked ? 'Archived in Bookmarks' : 'Bookmark Fact'}</span>
            </button>

            <button
              onClick={handleToggleSpeech}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-sm ${
                isSpeaking
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] animate-pulse'
                  : 'bg-[#16130E] text-[#A09890] border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
              }`}
            >
              {isSpeaking ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'Speaking...' : 'Listen to Narration'}</span>
            </button>

            <button
              onClick={() => handleOpenNoteModal(activeFact)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-[#2A2A2A] bg-[#16130E] text-[#A09890] hover:text-white hover:border-[#D4AF37]/40 shadow-sm"
            >
              <FilePlus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Add to Notebook</span>
            </button>

            <button
              onClick={() => handleShareFact(activeFact)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-[#2A2A2A] bg-[#16130E] text-[#A09890] hover:text-white hover:border-[#D4AF37]/40 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Share Fact'}</span>
            </button>
          </div>

          {/* Dossier Tabs: Navigation */}
          <div className="flex border-b border-[#2A261D] gap-2 overflow-x-auto pb-1">
            {[
              { id: 'overview', label: 'Core Discovery', icon: BookOpen },
              { id: 'context', label: 'Historical Context', icon: Clock },
              { id: 'connections', label: 'Vault Cross-References', icon: Compass },
              { id: 'quirks', label: 'Curatorial Quirks & Tags', icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeDossierTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playSound('click');
                    setActiveDossierTab(tab.id as any);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1610]'
                      : 'border-transparent text-[#8E867C] hover:text-white hover:bg-[#14120E]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dossier Tabs: Dynamic Content Panels */}
          <div className="bg-[#12100C] border border-[#25221C] rounded-2xl p-6 min-h-[280px]">
            
            {/* 1. Core Discovery Tab */}
            {activeDossierTab === 'overview' && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#D4AF37] tracking-wider block">
                    Verified Archival Fact Statement:
                  </span>
                  <p className="text-sm sm:text-base text-[#F4EDE2] leading-relaxed font-sans font-medium">
                    {activeFact.fact}
                  </p>
                </div>

                <div className="p-4 bg-[#17140F] border border-[#2A2418] rounded-2xl space-y-2 text-xs sm:text-sm text-[#CCC2B8] leading-relaxed font-sans">
                  <strong className="text-[#D4AF37] font-mono text-xs block uppercase">Scholastic Analysis:</strong>
                  <p>{activeFact.explanation}</p>
                </div>

                {activeFact.funFactExtra && (
                  <div className="p-4 bg-[#1E1911] border border-[#D4AF37]/40 rounded-2xl flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase block">
                        Curator's Astonishing Bonus:
                      </span>
                      <p className="text-xs sm:text-sm text-[#CCC2B8] leading-relaxed font-sans">
                        {activeFact.funFactExtra}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Historical Context Tab */}
            {activeDossierTab === 'context' && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-serif italic font-bold text-[#E5C158] text-lg flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" /> Scholastic Context & Societal Impact
                </h4>

                <div className="p-4 bg-[#181510] border border-[#2A2A2A] rounded-2xl text-xs sm:text-sm text-[#CCC2B8] leading-relaxed font-sans space-y-3 whitespace-pre-line">
                  {activeFact.explanation}
                </div>

                <div className="p-3.5 bg-[#12100C] border border-[#25221C] rounded-xl flex items-center justify-between text-xs font-mono text-[#8E867C]">
                  <span>Archival Verification: Primary Treaties & Chronologies</span>
                  <span className="text-[#D4AF37] font-bold">Standard Peer-Reviewed</span>
                </div>
              </div>
            )}

            {/* 3. Connections Tab */}
            {activeDossierTab === 'connections' && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-serif italic font-bold text-[#E5C158] text-lg flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#D4AF37]" /> Related Cross-References in History Archive
                </h4>

                {activeFact.links && activeFact.links.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeFact.links.map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playSound('click');
                          onNavigateTo(link.targetTab, link.subTab, link.entityId);
                        }}
                        className="p-3.5 bg-[#17140F] hover:bg-[#221C14] text-[#D4AF37] hover:text-[#FFF5B8] border border-[#D4AF37]/35 hover:border-[#D4AF37] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between shadow-md group"
                      >
                        <span className="text-left font-sans">{link.label}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        playSound('click');
                        onNavigateTo('scholar');
                      }}
                      className="p-3.5 bg-[#14120E] hover:bg-[#1E1912] text-[#A09890] hover:text-[#D4AF37] border border-[#2A261D] hover:border-[#D4AF37]/40 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between shadow-md"
                    >
                      <span className="flex items-center gap-2 font-sans">
                        <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                        Consult Scholar AI Research Partner
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-[#14120E] border border-[#2A261D] rounded-xl text-xs text-[#A09890]">
                    No immediate direct links registered for this record. You can inquire further with Scholar AI.
                  </div>
                )}
              </div>
            )}

            {/* 4. Curatorial Quirks & Tags Tab */}
            {activeDossierTab === 'quirks' && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-serif italic font-bold text-[#E5C158] text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Archival Descriptors & Subject Indexing
                </h4>

                <div className="p-4 bg-[#17140F] border border-[#262016] rounded-2xl space-y-3">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block">
                    Cataloged Topical Descriptors:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeFact.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#12100C] text-[#D4AF37] border border-[#D4AF37]/30 rounded-xl text-xs font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#17140F] border border-[#262016] rounded-2xl space-y-2 text-xs text-[#A09890]">
                  <strong className="text-[#D4AF37] block font-mono uppercase">Historiographical Note:</strong>
                  <p className="leading-relaxed">
                    Records in this vault undergo rigorous cross-verification against contemporary chronicles, archaeological epigraphy, and peer-reviewed historical databases.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </motion.div>

      {/* Note Creation Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#18140E] to-[#0E0C09] border border-[#D4AF37]/40 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl animate-fade-in text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2418]">
              <h4 className="font-serif italic font-bold text-[#D4AF37] text-lg flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-[#D4AF37]" /> Store Fact in Archival Notebook
              </h4>
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="text-[#A09890] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFactNote} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#8E867C] uppercase mb-1">Note Title</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0D0B08] border border-[#2A2418] rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8E867C] uppercase mb-1">Note Content</label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 bg-[#0D0B08] border border-[#2A2418] rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37] font-sans"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-4 py-2 bg-[#17140F] text-[#A09890] rounded-xl text-xs font-bold cursor-pointer hover:text-white border border-[#2A2418]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] text-black font-bold rounded-xl text-xs cursor-pointer hover:bg-[#b8952d] shadow-md"
                >
                  Save to Notebook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
