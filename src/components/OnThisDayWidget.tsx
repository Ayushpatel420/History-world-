import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  FileEdit, 
  Check, 
  Bookmark as BookmarkIcon, 
  ExternalLink,
  ArrowRight,
  MapPin,
  Swords,
  Landmark
} from 'lucide-react';
import { Bookmark } from '../types';
import { 
  getMilestonesForDate, 
  MONTH_NAMES, 
  getYearsElapsed, 
  CalendarMilestone 
} from '../data/onThisDayData';
import { playSound } from '../utils/audio';

interface OnThisDayWidgetProps {
  onOpenFullView: () => void;
  onAddNote?: (title: string, content: string, type: 'Event' | 'General', targetId?: string) => void;
  onToggleBookmark?: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  bookmarks?: Bookmark[];
}

export default function OnThisDayWidget({
  onOpenFullView,
  onAddNote,
  onToggleBookmark,
  bookmarks = []
}: OnThisDayWidgetProps) {
  const today = useMemo(() => new Date(), []);
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const monthName = MONTH_NAMES[currentMonth - 1];

  const todayMilestones = useMemo(() => {
    return getMilestonesForDate(currentMonth, currentDay);
  }, [currentMonth, currentDay]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  const currentMilestone: CalendarMilestone | undefined = todayMilestones[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
    setCurrentIndex((prev) => (prev + 1) % todayMilestones.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
    setCurrentIndex((prev) => (prev === 0 ? todayMilestones.length - 1 : prev - 1));
  };

  const handleToggleSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
    if (!currentMilestone || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const text = `${currentMilestone.title}. Occurred on ${currentMilestone.date}. ${currentMilestone.description}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSaveNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('correct');
    if (currentMilestone && onAddNote) {
      onAddNote(
        currentMilestone.title,
        `**Date:** ${currentMilestone.date}\n**Category:** ${currentMilestone.category || 'Historical Milestone'}\n\n${currentMilestone.description}\n\n**Historical Impact:**\n${currentMilestone.impact}`,
        'Event',
        currentMilestone.id
      );
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2500);
    }
  };

  if (!currentMilestone) return null;

  const isBookmarked = bookmarks.some((b) => b.targetId === currentMilestone.id);

  return (
    <div className="bg-gradient-to-r from-[#1E1911] via-[#14120E] to-[#0D0B08] border border-[#D4AF37]/50 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden text-left">
      {/* Background ambient gold gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-3">
        {/* Top Header: Badge, Date, Carousel Controls, View All */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2A2A2A] pb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#D4AF37] text-black text-xs font-bold rounded-lg shadow-sm">
              <Calendar className="w-3.5 h-3.5" />
              <span>#1 • ON THIS DAY</span>
            </span>
            <span className="text-xs font-serif font-bold text-[#E5C158]">
              {monthName} {currentDay}
            </span>
            <span className="text-[11px] text-[#888888] font-mono">
              ({currentIndex + 1} of {todayMilestones.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next Carousel */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                title="Previous Milestone Today"
                className="p-1.5 bg-[#151515] hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] border border-[#2A2A2A] rounded-lg transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                title="Next Milestone Today"
                className="p-1.5 bg-[#151515] hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] border border-[#2A2A2A] rounded-lg transition-all cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onOpenFullView();
              }}
              className="flex items-center gap-1 text-xs font-bold text-[#E5C158] hover:text-[#FFFFFF] bg-[#1A1813] border border-[#D4AF37]/40 hover:border-[#D4AF37] px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              <span>Explore Calendar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Milestone Content Box */}
        <div className="space-y-2 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 bg-[#1C1811] border border-[#D4AF37]/30 text-[#E5C158] text-[10px] font-bold rounded">
              {currentMilestone.era} Era
            </span>
            {currentMilestone.category && (
              <span className="px-2 py-0.5 bg-[#161616] border border-[#333333] text-[#A09890] text-[10px] rounded flex items-center gap-1">
                {currentMilestone.category.includes('War') ? <Swords className="w-2.5 h-2.5 text-red-400" /> : <Landmark className="w-2.5 h-2.5 text-[#D4AF37]" />}
                {currentMilestone.category}
              </span>
            )}
            <span className="text-[11px] font-mono text-[#D4AF37]">
              {currentMilestone.date}
            </span>
            <span className="text-[10px] text-[#777777] font-mono">
              • {getYearsElapsed(currentMilestone.year)}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-serif font-bold text-[#FFFFFF] hover:text-[#E5C158] transition-colors leading-snug">
            {currentMilestone.title}
          </h4>

          <p className="text-xs sm:text-sm text-[#B8B0A0] leading-relaxed line-clamp-2 sm:line-clamp-3 font-sans">
            {currentMilestone.description}
          </p>
        </div>

        {/* Action Controls for Quick Interaction */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#222222]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all border cursor-pointer ${
                speaking
                  ? 'bg-[#E5C158] text-black border-[#E5C158]'
                  : 'bg-[#151515] text-[#E5C158] border-[#2A2A2A] hover:bg-[#D4AF37] hover:text-black'
              }`}
            >
              {speaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              <span>{speaking ? 'Stop' : 'Listen'}</span>
            </button>

            <button
              onClick={handleSaveNote}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] hover:bg-[#D4AF37] hover:text-black rounded-md text-[11px] font-bold transition-all cursor-pointer"
            >
              {noteSaved ? <Check className="w-3 h-3 text-emerald-400" /> : <FileEdit className="w-3 h-3" />}
              <span>{noteSaved ? 'Saved' : 'Save Note'}</span>
            </button>

            {onToggleBookmark && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSound('click');
                  onToggleBookmark(
                    currentMilestone.id, 
                    'event', 
                    currentMilestone.title, 
                    `${currentMilestone.date} · ${currentMilestone.category || 'Milestone'}`
                  );
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all border cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'bg-[#151515] text-[#D4AF37] border-[#2A2A2A] hover:bg-[#D4AF37] hover:text-black'
                }`}
              >
                <BookmarkIcon className="w-3 h-3" />
                <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
              </button>
            )}
          </div>

          <button
            onClick={() => {
              playSound('click');
              onOpenFullView();
            }}
            className="text-[11px] font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All {todayMilestones.length} Today</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
