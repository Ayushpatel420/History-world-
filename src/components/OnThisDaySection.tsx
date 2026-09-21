import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Dices, 
  Bookmark as BookmarkIcon, 
  BookMarked, 
  FileEdit, 
  Volume2, 
  VolumeX, 
  Share2, 
  Check, 
  Landmark, 
  Swords, 
  Compass, 
  Globe, 
  ExternalLink,
  BookOpen,
  Tag,
  MapPin,
  Quote,
  Flame,
  Award
} from 'lucide-react';
import { Bookmark } from '../types';
import { 
  CalendarMilestone, 
  MONTH_NAMES, 
  DAYS_IN_MONTH, 
  getMilestonesForDate, 
  getYearsElapsed 
} from '../data/onThisDayData';
import { playSound } from '../utils/audio';

interface OnThisDaySectionProps {
  onAddNote?: (title: string, content: string, type: 'Event' | 'General', targetId?: string) => void;
  onToggleBookmark?: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  bookmarks?: Bookmark[];
  onNavigateTo?: (tab: 'map' | 'timeline' | 'vaults' | 'encyclopedia', targetId?: string) => void;
}

export default function OnThisDaySection({
  onAddNote,
  onToggleBookmark,
  bookmarks = [],
  onNavigateTo
}: OnThisDaySectionProps) {
  // Current real-world calendar date
  const today = useMemo(() => new Date(), []);
  const currentMonth = today.getMonth() + 1; // 1-indexed (1-12)
  const currentDay = today.getDate();

  // Selected date state
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedDay, setSelectedDay] = useState<number>(currentDay);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  
  // UI interaction states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [noteSuccessId, setNoteSuccessId] = useState<string | null>(null);

  // Stop speech when navigating or unmounting
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Fetch milestones for selected date
  const dayMilestones = useMemo(() => {
    return getMilestonesForDate(selectedMonth, selectedDay);
  }, [selectedMonth, selectedDay]);

  // Filtered milestones based on search, category, and era
  const filteredMilestones = useMemo(() => {
    return dayMilestones.filter((item) => {
      const matchesSearch = 
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.impact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.participants && item.participants.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory = 
        selectedCategory === 'all' || 
        (item.category && item.category.toLowerCase().includes(selectedCategory.toLowerCase()));

      const matchesEra = 
        selectedEra === 'all' || 
        item.era === selectedEra;

      return matchesSearch && matchesCategory && matchesEra;
    });
  }, [dayMilestones, searchQuery, selectedCategory, selectedEra]);

  // Featured Milestone of the selected date (highest significance rating or first item)
  const featuredMilestone = useMemo(() => {
    if (dayMilestones.length === 0) return null;
    return [...dayMilestones].sort((a, b) => (b.significanceRating || 3) - (a.significanceRating || 3))[0];
  }, [dayMilestones]);

  // Date navigation handlers
  const handlePrevDay = () => {
    playSound('click');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
    if (selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    } else {
      const prevMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
      const maxDaysInPrevMonth = DAYS_IN_MONTH[prevMonth - 1];
      setSelectedMonth(prevMonth);
      setSelectedDay(maxDaysInPrevMonth);
    }
  };

  const handleNextDay = () => {
    playSound('click');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
    const maxDays = DAYS_IN_MONTH[selectedMonth - 1];
    if (selectedDay < maxDays) {
      setSelectedDay(selectedDay + 1);
    } else {
      const nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
      setSelectedMonth(nextMonth);
      setSelectedDay(1);
    }
  };

  const handleResetToToday = () => {
    playSound('click');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
    setSelectedMonth(currentMonth);
    setSelectedDay(currentDay);
  };

  const handleRandomDay = () => {
    playSound('click');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const maxDays = DAYS_IN_MONTH[randomMonth - 1];
    const randomDay = Math.floor(Math.random() * maxDays) + 1;
    setSelectedMonth(randomMonth);
    setSelectedDay(randomDay);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setSelectedMonth(newMonth);
    const maxDays = DAYS_IN_MONTH[newMonth - 1];
    if (selectedDay > maxDays) {
      setSelectedDay(maxDays);
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(parseInt(e.target.value, 10));
  };

  // Text to Speech narration handler
  const handleToggleSpeech = (milestone: CalendarMilestone) => {
    playSound('click');
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingId === milestone.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = `${milestone.title}. Occurred in ${milestone.date}. ${milestone.description} Historical impact: ${milestone.impact}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      
      setSpeakingId(milestone.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Copy citation to clipboard
  const handleCopyCitation = (milestone: CalendarMilestone) => {
    playSound('click');
    const citation = `"${milestone.title}" (${milestone.date}). Historical Record — Chronos Vault Archives. ${milestone.description}`;
    navigator.clipboard.writeText(citation);
    setCopiedId(milestone.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Add milestone to Study Notebook
  const handleSaveNote = (milestone: CalendarMilestone) => {
    playSound('correct');
    if (onAddNote) {
      const noteContent = `**Date:** ${milestone.date} (${milestone.era} Era)\n**Category:** ${milestone.category || 'Historical Event'}\n**Location:** ${milestone.location || 'Global'}\n\n**Description:**\n${milestone.description}\n\n**Historical Impact:**\n${milestone.impact}\n\n**Key Figures:** ${milestone.participants ? milestone.participants.join(', ') : 'Historical leaders'}`;
      onAddNote(milestone.title, noteContent, 'Event', milestone.id);
      setNoteSuccessId(milestone.id);
      setTimeout(() => setNoteSuccessId(null), 3000);
    }
  };

  const isTodaySelected = selectedMonth === currentMonth && selectedDay === currentDay;
  const monthName = MONTH_NAMES[selectedMonth - 1];
  const daysArray = Array.from({ length: DAYS_IN_MONTH[selectedMonth - 1] }, (_, i) => i + 1);

  // Category list with counts
  const categories = [
    { id: 'all', label: 'All Milestones' },
    { id: 'war', label: 'War & Battles' },
    { id: 'political', label: 'Political Milestones' },
    { id: 'science', label: 'Science & Discovery' },
    { id: 'cultural', label: 'Cultural Shifts' },
    { id: 'monumental', label: 'Monuments & Arts' }
  ];

  const eras = ['all', 'Ancient', 'Classical', 'Medieval', 'Early Modern', 'Modern'];

  return (
    <section className="space-y-6 text-left animate-fade-in">
      {/* 1. Header & Interactive Calendar Bar */}
      <div className="bg-gradient-to-br from-[#1A160F] via-[#12100C] to-[#0A0907] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient background glow and grid */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#E5C158]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Main Title & Date Callout */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E5C158] uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>World History Calendar Chronometer</span>
              {isTodaySelected && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C158] text-[10px] font-bold">
                  LIVE TODAY
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FFFFFF] flex flex-wrap items-center gap-3">
              <span>On This Day:</span>
              <span className="text-[#D4AF37] italic font-serif underline decoration-[#D4AF37]/40 decoration-wavy decoration-1 underline-offset-8">
                {monthName} {selectedDay}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#A09890] max-w-2xl leading-relaxed">
              Explore pivotal treaties, crowning moments, revolutions, and scientific breakthroughs that took place on this exact calendar date across world history.
            </p>
          </div>

          {/* Quick Calendar Navigator Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#0A0907]/80 p-3 rounded-2xl border border-[#2A2A2A] shadow-inner">
            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5 justify-between">
              <button
                onClick={handlePrevDay}
                title="Previous Day in History"
                className="p-2.5 bg-[#151515] hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] border border-[#2A2A2A] rounded-xl transition-all shadow cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Month & Day Dropdown Selectors */}
              <div className="flex items-center gap-2 px-2">
                <select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="bg-[#181818] border border-[#3A3A3A] text-[#E5C158] text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-[#D4AF37]"
                >
                  {MONTH_NAMES.map((name, idx) => (
                    <option key={name} value={idx + 1} className="bg-[#121212] text-white">
                      {name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDay}
                  onChange={handleDayChange}
                  className="bg-[#181818] border border-[#3A3A3A] text-[#E5C158] text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-[#D4AF37]"
                >
                  {daysArray.map((day) => (
                    <option key={day} value={day} className="bg-[#121212] text-white">
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleNextDay}
                title="Next Day in History"
                className="p-2.5 bg-[#151515] hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] border border-[#2A2A2A] rounded-xl transition-all shadow cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 justify-end pt-2 sm:pt-0 sm:border-l sm:border-[#2A2A2A] sm:pl-3">
              {!isTodaySelected && (
                <button
                  onClick={handleResetToToday}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-[#D4AF37] text-black rounded-xl hover:bg-[#E5C158] transition-all shadow cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Today
                </button>
              )}
              
              <button
                onClick={handleRandomDay}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-[#1C1811] text-[#E5C158] border border-[#D4AF37]/40 rounded-xl hover:bg-[#D4AF37] hover:text-black transition-all shadow cursor-pointer active:scale-95"
                title="Jump to a Surprise Day in World History"
              >
                <Dices className="w-3.5 h-3.5" /> Random Day
              </button>
            </div>
          </div>
        </div>

        {/* Milestone Statistics Bar */}
        <div className="mt-6 pt-5 border-t border-[#2A2A2A]/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#121212]/70 border border-[#2A2A2A] rounded-xl p-3">
            <span className="text-[11px] text-[#888888] font-mono block">Milestones on Record</span>
            <span className="text-base sm:text-lg font-bold text-[#E5C158]">{dayMilestones.length} Events</span>
          </div>
          <div className="bg-[#121212]/70 border border-[#2A2A2A] rounded-xl p-3">
            <span className="text-[11px] text-[#888888] font-mono block">Historical Epochs</span>
            <span className="text-base sm:text-lg font-bold text-[#FFFFFF]">
              {Array.from(new Set(dayMilestones.map(m => m.era))).join(', ') || 'All Eras'}
            </span>
          </div>
          <div className="bg-[#121212]/70 border border-[#2A2A2A] rounded-xl p-3">
            <span className="text-[11px] text-[#888888] font-mono block">Oldest Milestone</span>
            <span className="text-base sm:text-lg font-bold text-[#D4AF37]">
              {dayMilestones[0] ? (dayMilestones[0].year < 0 ? `${Math.abs(dayMilestones[0].year)} BC` : `${dayMilestones[0].year} AD`) : 'N/A'}
            </span>
          </div>
          <div className="bg-[#121212]/70 border border-[#2A2A2A] rounded-xl p-3">
            <span className="text-[11px] text-[#888888] font-mono block">Latest Milestone</span>
            <span className="text-base sm:text-lg font-bold text-[#FFFFFF]">
              {dayMilestones[dayMilestones.length - 1] ? `${dayMilestones[dayMilestones.length - 1].year} AD` : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Featured Milestone of the Day Spotlight Hero */}
      {featuredMilestone && !searchQuery && selectedCategory === 'all' && (
        <div className="bg-gradient-to-r from-[#221C11] via-[#16130E] to-[#0D0B08] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start justify-between">
            <div className="space-y-4 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-extrabold rounded-full flex items-center gap-1.5 shadow-md">
                  <Award className="w-3.5 h-3.5" /> Featured Milestone Spotlight
                </span>
                <span className="px-3 py-1 bg-[#1A1A1A] border border-[#3A3A3A] text-[#E5C158] text-xs font-bold rounded-full">
                  {featuredMilestone.era} Era
                </span>
                <span className="px-3 py-1 bg-[#1A1A1A] border border-[#3A3A3A] text-[#A09890] text-xs font-mono rounded-full">
                  {getYearsElapsed(featuredMilestone.year)}
                </span>
                {featuredMilestone.location && (
                  <span className="px-3 py-1 bg-[#1A1A1A] border border-[#3A3A3A] text-[#D4AF37] text-xs font-medium rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {featuredMilestone.location}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#FFFFFF] group-hover:text-[#E5C158] transition-colors leading-tight">
                {featuredMilestone.title}
              </h3>

              <p className="text-sm sm:text-base text-[#D0C8B8] leading-relaxed font-sans">
                {featuredMilestone.description}
              </p>

              {/* Historical Impact Box */}
              <div className="p-4 bg-[#0A0907]/90 border border-[#D4AF37]/30 rounded-2xl space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C158] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Global Historical Significance
                </h4>
                <p className="text-xs sm:text-sm text-[#B5ADA0] leading-relaxed">
                  {featuredMilestone.impact}
                </p>
              </div>

              {/* Notable Participants */}
              {featuredMilestone.participants && featuredMilestone.participants.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs text-[#888888] font-bold mr-1">Key Figures:</span>
                  {featuredMilestone.participants.map((person) => (
                    <span
                      key={person}
                      className="px-2.5 py-1 bg-[#1A1813] border border-[#3A3425] text-[#E5C158] rounded-lg text-xs font-medium"
                    >
                      {person}
                    </span>
                  ))}
                </div>
              )}

              {/* Quote / Primary Source */}
              {featuredMilestone.quote && (
                <div className="p-3.5 bg-[#17140E] border-l-4 border-[#D4AF37] rounded-r-xl italic text-xs sm:text-sm text-[#E5C158] space-y-1">
                  <p className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>"{featuredMilestone.quote.text}"</span>
                  </p>
                  <p className="text-right text-[11px] text-[#A09890] not-italic font-sans">
                    — {featuredMilestone.quote.author}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Action Controls for Featured Item */}
            <div className="flex lg:flex-col gap-2 shrink-0 self-stretch lg:self-start">
              <button
                onClick={() => handleToggleSpeech(featuredMilestone)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  speakingId === featuredMilestone.id
                    ? 'bg-[#E5C158] text-black border-[#E5C158] animate-pulse'
                    : 'bg-[#151515] text-[#E5C158] border-[#3A3A3A] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]'
                }`}
              >
                {speakingId === featuredMilestone.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{speakingId === featuredMilestone.id ? 'Stop Narration' : 'Listen'}</span>
              </button>

              <button
                onClick={() => handleSaveNote(featuredMilestone)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#151515] text-[#E5C158] border border-[#3A3A3A] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {noteSuccessId === featuredMilestone.id ? <Check className="w-4 h-4 text-emerald-400" /> : <FileEdit className="w-4 h-4" />}
                <span>{noteSuccessId === featuredMilestone.id ? 'Saved in Notes' : 'Add Note'}</span>
              </button>

              {onToggleBookmark && (
                <button
                  onClick={() => {
                    playSound('click');
                    onToggleBookmark(
                      featuredMilestone.id, 
                      'event', 
                      featuredMilestone.title, 
                      `${featuredMilestone.date} · ${featuredMilestone.category || 'Historical Milestone'}`
                    );
                  }}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    bookmarks.some(b => b.targetId === featuredMilestone.id)
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-[#151515] text-[#E5C158] border-[#3A3A3A] hover:bg-[#D4AF37] hover:text-black'
                  }`}
                >
                  <BookmarkIcon className="w-4 h-4" />
                  <span>{bookmarks.some(b => b.targetId === featuredMilestone.id) ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              )}

              <button
                onClick={() => handleCopyCitation(featuredMilestone)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#151515] text-[#A09890] hover:text-[#FFFFFF] border border-[#3A3A3A] hover:border-[#555555] rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {copiedId === featuredMilestone.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedId === featuredMilestone.id ? 'Copied' : 'Cite'}</span>
              </button>

              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(featuredMilestone.title.replace(/\s+/g, '_'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#17130B] text-[#F3CF65] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
                title="Read full article on Wikipedia in a new tab"
              >
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>Wikipedia ↗</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 3. Search & Category Filters Bar */}
      <div className="bg-[#0F0F0F] border border-[#2A2A2A] p-4 rounded-2xl space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${dayMilestones.length} milestones for ${monthName} ${selectedDay}... (e.g. battle, treaty, revolution)`}
              className="w-full bg-[#181818] border border-[#333333] text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#D4AF37] placeholder-[#666666]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Era Filter Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#888888] font-bold">Era:</span>
            <select
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value)}
              className="bg-[#181818] border border-[#333333] text-[#E5C158] text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
            >
              {eras.map((era) => (
                <option key={era} value={era} className="bg-[#121212] text-white">
                  {era === 'all' ? 'All Eras' : `${era} Era`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#222222]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playSound('click');
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-sm'
                  : 'bg-[#151515] text-[#A09890] border-[#2A2A2A] hover:text-[#E5C158] hover:border-[#3A3A3A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Milestones List for the Selected Date */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#A09890] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>Chronological Record for {monthName} {selectedDay}</span>
            <span className="text-xs font-mono px-2 py-0.5 bg-[#181818] text-[#E5C158] rounded-full border border-[#2A2A2A]">
              {filteredMilestones.length} Found
            </span>
          </h4>
        </div>

        {filteredMilestones.length === 0 ? (
          <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-12 text-center space-y-3">
            <Calendar className="w-10 h-10 text-[#555555] mx-auto" />
            <h5 className="text-base font-bold text-white">No milestones match your search filters</h5>
            <p className="text-xs text-[#888888] max-w-md mx-auto">
              Try clearing your search query or selecting "All Milestones" to view everything recorded for this date.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedEra('all');
              }}
              className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-xl hover:bg-[#E5C158] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredMilestones.map((milestone) => {
              const isBookmarked = bookmarks.some(b => b.targetId === milestone.id);
              const isSpeaking = speakingId === milestone.id;
              const isSavedInNotes = noteSuccessId === milestone.id;

              return (
                <div
                  key={milestone.id}
                  className="bg-gradient-to-br from-[#161410] via-[#100E0B] to-[#0A0907] border border-[#2A2A2A] hover:border-[#D4AF37]/60 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-lg hover:shadow-2xl space-y-4 group"
                >
                  {/* Top Bar: Era, Category, Date, Years Ago */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#1C1811] border border-[#D4AF37]/40 text-[#E5C158] text-[11px] font-bold">
                        {milestone.era} Era
                      </span>

                      {milestone.category && (
                        <span className="px-2.5 py-0.5 rounded-md bg-[#1A1A1A] border border-[#333333] text-[#A09890] text-[11px] font-medium flex items-center gap-1">
                          {milestone.category.includes('War') ? <Swords className="w-3 h-3 text-red-400" /> : <Landmark className="w-3 h-3 text-[#D4AF37]" />}
                          {milestone.category}
                        </span>
                      )}

                      {milestone.location && (
                        <span className="px-2.5 py-0.5 rounded-md bg-[#1A1A1A] border border-[#333333] text-[#888888] text-[11px] flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#D4AF37]" /> {milestone.location}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#D4AF37] font-semibold">
                        {milestone.date}
                      </span>
                      <span className="text-[11px] text-[#666666] font-mono">
                        ({getYearsElapsed(milestone.year)})
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FFFFFF] group-hover:text-[#E5C158] transition-colors leading-snug">
                      {milestone.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#C0B8A8] leading-relaxed font-sans">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Impact Highlight */}
                  <div className="p-3.5 bg-[#0C0B08] border border-[#222222] rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-[#E5C158] uppercase tracking-wider block">
                      Historical Consequence & Legacy
                    </span>
                    <p className="text-xs text-[#A09890] leading-relaxed">
                      {milestone.impact}
                    </p>
                  </div>

                  {/* Participants Tags */}
                  {milestone.participants && milestone.participants.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-[#777777] font-bold">Involved Figures:</span>
                      {milestone.participants.map((person) => (
                        <span
                          key={person}
                          className="px-2 py-0.5 bg-[#161616] border border-[#2A2A2A] text-[#D0C8B8] text-[11px] rounded-md font-medium"
                        >
                          {person}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Curiosities / Fun Fact */}
                  {milestone.funFact && (
                    <div className="p-3 bg-[#17140D] border-l-2 border-[#E5C158] rounded-r-xl text-xs text-[#E5C158] space-y-0.5">
                      <span className="font-bold flex items-center gap-1 text-[11px] text-[#D4AF37]">
                        <Flame className="w-3.5 h-3.5 text-amber-500" /> Historical Trivia Note
                      </span>
                      <p className="text-[#C5BBAA] leading-relaxed">{milestone.funFact}</p>
                    </div>
                  )}

                  {/* Bottom Actions Bar */}
                  <div className="pt-3 border-t border-[#1F1F1F] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleSpeech(milestone)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                          isSpeaking
                            ? 'bg-[#E5C158] text-black border-[#E5C158]'
                            : 'bg-[#151515] text-[#D4AF37] border-[#2A2A2A] hover:bg-[#D4AF37] hover:text-black'
                        }`}
                        title="Listen to milestone narration"
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                      </button>

                      <button
                        onClick={() => handleSaveNote(milestone)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] hover:bg-[#D4AF37] hover:text-black rounded-lg text-xs font-semibold transition-all cursor-pointer"
                        title="Save to your personal Study Notebook"
                      >
                        {isSavedInNotes ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileEdit className="w-3.5 h-3.5" />}
                        <span>{isSavedInNotes ? 'Saved in Notes' : 'Study Note'}</span>
                      </button>

                      {onToggleBookmark && (
                        <button
                          onClick={() => {
                            playSound('click');
                            onToggleBookmark(
                              milestone.id, 
                              'event', 
                              milestone.title, 
                              `${milestone.date} · ${milestone.category || 'Milestone'}`
                            );
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                            isBookmarked
                              ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                              : 'bg-[#151515] text-[#D4AF37] border-[#2A2A2A] hover:bg-[#D4AF37] hover:text-black'
                          }`}
                          title="Bookmark for quick study retrieval"
                        >
                          <BookmarkIcon className="w-3.5 h-3.5" />
                          <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
                        </button>
                      )}

                      <a
                        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(milestone.title.replace(/\s+/g, '_'))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#17130B] text-[#F3CF65] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
                        title="Read full article on Wikipedia in a new tab"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Wikipedia ↗</span>
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyCitation(milestone)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] text-[#888888] hover:text-white border border-[#282828] hover:border-[#444444] rounded-lg text-xs font-medium transition-all cursor-pointer"
                        title="Copy formal citation to clipboard"
                      >
                        {copiedId === milestone.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                        <span>{copiedId === milestone.id ? 'Copied' : 'Cite'}</span>
                      </button>

                      {onNavigateTo && (
                        <button
                          onClick={() => {
                            playSound('click');
                            onNavigateTo('timeline', milestone.id);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#141414] text-[#D4AF37] hover:bg-[#1E1A11] border border-[#2A2A2A] rounded-lg text-xs font-semibold transition-all cursor-pointer"
                          title="View on full Chronological Timeline"
                        >
                          <span>Timeline</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
