import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  ArrowRight, 
  Shuffle, 
  Bookmark as BookmarkIcon, 
  FileEdit, 
  Volume2, 
  VolumeX, 
  Check, 
  Compass, 
  ExternalLink 
} from 'lucide-react';
import { HistoricalFact, Bookmark, UserNote } from '../types';
import { HISTORICAL_FACTS, getDailyFactForDate } from '../data/factsData';
import { playSound } from '../utils/audio';

interface DidYouKnowWidgetProps {
  onOpenFullView: (factId?: string) => void;
  onAddNote?: (title: string, content: string, type: UserNote['targetType'], targetId?: string) => void;
  onToggleBookmark?: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  bookmarks: Bookmark[];
}

export default function DidYouKnowWidget({
  onOpenFullView,
  onAddNote,
  onToggleBookmark,
  bookmarks = []
}: DidYouKnowWidgetProps) {
  const today = new Date();
  const defaultDailyFact = getDailyFactForDate(today);

  const [currentFact, setCurrentFact] = useState<HistoricalFact>(defaultDailyFact);
  const [speaking, setSpeaking] = useState(false);
  const [isNoteInputOpen, setIsNoteInputOpen] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  const isBookmarked = bookmarks.some(b => b.targetId === currentFact.id && b.type === 'fact');

  const handleBookmarkToggle = () => {
    if (onToggleBookmark) {
      onToggleBookmark(
        currentFact.id,
        'fact',
        currentFact.headline,
        `${currentFact.era} • ${currentFact.category}`
      );
    }
    playSound('click');
  };

  const handleRandomFact = () => {
    playSound('click');
    const filtered = HISTORICAL_FACTS.filter(f => f.id !== currentFact.id);
    const random = filtered[Math.floor(Math.random() * filtered.length)] || defaultDailyFact;
    setCurrentFact(random);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const narration = `Did you know? ${currentFact.headline}. ${currentFact.fact}`;
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
    playSound('click');
  };

  const handleSaveNote = () => {
    if (!userNote.trim()) return;
    if (onAddNote) {
      onAddNote(
        `Historical Fact: ${currentFact.title}`,
        userNote.trim(),
        'General',
        currentFact.id
      );
    }
    setUserNote('');
    setIsNoteInputOpen(false);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
    playSound('click');
  };

  return (
    <div
      id="did-you-know-dashboard-widget"
      className="bg-gradient-to-br from-[#12110D] via-[#161510] to-[#0D0C08] border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative Atmosphere Glow */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -right-8 w-60 h-60 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A241A] pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] shadow-inner">
            <Lightbulb className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase bg-[#1E1B13] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full">
                #2 • Did You Know?
              </span>
              <span className="text-[10px] font-mono text-[#A09890] uppercase">
                {currentFact.era} • {currentFact.cultureRegion}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif italic font-bold text-white tracking-normal mt-0.5">
              Historical Curiosity & Insights
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              speaking
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-[#181612] text-[#D4AF37] border-[#2A241A] hover:border-[#D4AF37]/50'
            }`}
            title={speaking ? 'Stop Voice Narration' : 'Narrate Fact'}
          >
            {speaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{speaking ? 'Mute' : 'Listen'}</span>
          </button>

          <button
            onClick={handleRandomFact}
            className="p-2 rounded-xl bg-[#181612] text-[#A09890] hover:text-[#D4AF37] border border-[#2A241A] hover:border-[#D4AF37]/50 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
            title="Discover Another Random Fact"
          >
            <Shuffle className="w-4 h-4 text-[#D4AF37]" />
            <span className="hidden sm:inline">Shuffle</span>
          </button>

          <button
            onClick={handleBookmarkToggle}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-[#181612] text-[#A09890] hover:text-[#D4AF37] border-[#2A241A] hover:border-[#D4AF37]/50'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark Fact'}
          >
            <BookmarkIcon className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Main Fact Card Body */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-8 space-y-3 text-left">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#1E1B13] px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
              {currentFact.yearOrPeriod}
            </span>
            <span className="text-xs font-mono text-[#A09890]">
              Category: {currentFact.category}
            </span>
          </div>

          <h4 className="text-lg sm:text-2xl font-serif italic font-bold text-[#E0D8D0] leading-snug group-hover:text-white transition-colors">
            "{currentFact.headline}"
          </h4>

          <p className="text-xs sm:text-sm text-[#B5ABA0] leading-relaxed font-sans line-clamp-3">
            {currentFact.fact}
          </p>

          {currentFact.quote && (
            <div className="p-3 rounded-xl bg-[#14120D] border-l-2 border-[#D4AF37] text-xs italic text-[#D4AF37] font-serif">
              "{currentFact.quote.text}" — <span className="text-[#A09890] not-italic">{currentFact.quote.author}</span>
            </div>
          )}
        </div>

        {/* Side Actions & Thumbnail */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-3 bg-[#14120E] border border-[#262014] p-4 rounded-2xl">
          {currentFact.imageUrl ? (
            <div className="h-28 w-full rounded-xl overflow-hidden border border-[#2A241A] relative group">
              <img
                src={currentFact.imageUrl}
                alt={currentFact.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-[#D4AF37] font-bold">
                {currentFact.notableFigure || currentFact.title}
              </span>
            </div>
          ) : (
            <div className="h-24 w-full rounded-xl bg-[#1C1811] border border-[#2A241A] flex items-center justify-center text-[#D4AF37]/60">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onOpenFullView(currentFact.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <span>Explore Facts Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsNoteInputOpen(!isNoteInputOpen)}
              className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer shrink-0 ${
                isNoteInputOpen
                  ? 'bg-[#1E1B13] text-[#D4AF37] border-[#D4AF37]'
                  : 'bg-[#181612] text-[#A09890] hover:text-[#D4AF37] border-[#2A241A]'
              }`}
              title="Add Note to Study Notebook"
            >
              <FileEdit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Note Input Expansion Form */}
      {isNoteInputOpen && (
        <div className="mt-4 pt-4 border-t border-[#2A241A] space-y-2 text-left relative z-10">
          <label className="text-xs font-mono text-[#D4AF37] flex items-center gap-1.5">
            <FileEdit className="w-3.5 h-3.5" /> Record Study Note for this Fact:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveNote()}
              placeholder="e.g., Cross-reference with trade routes in Mediterranean..."
              className="flex-1 bg-[#100E0B] border border-[#2A241A] focus:border-[#D4AF37] rounded-xl px-3 py-2 text-xs text-white placeholder-[#666] outline-none"
            />
            <button
              onClick={handleSaveNote}
              className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-xl hover:bg-[#E5C158] transition-colors cursor-pointer"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {noteSaved && (
        <div className="mt-3 text-xs text-[#D4AF37] flex items-center gap-1.5">
          <Check className="w-4 h-4" /> Note safely logged into your personal study notebook!
        </div>
      )}
    </div>
  );
}
