import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Bookmark,
  BookMarked,
  FileText,
  ExternalLink,
  Calendar,
  MapPin,
  Shield,
  Crown,
  BookOpen,
  Clock,
  Globe,
  Swords,
  Scroll,
  Landmark,
  Sparkles,
  Quote,
  Award,
  User,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers,
  Scale,
  Building2
} from 'lucide-react';
import { Bookmark as BookmarkType, UserNote } from '../types';

export type SearchDetailType = 
  | 'monarch'
  | 'figure'
  | 'event'
  | 'country'
  | 'battle'
  | 'paper'
  | 'ideology'
  | 'artifact'
  | 'decree'
  | 'spotlight'
  | 'philosopher'
  | 'monument';

export interface SearchDetailItem {
  type: SearchDetailType;
  data: any;
}

export interface RecentSearchItemEntry {
  id: string;
  type: SearchDetailType;
  title: string;
  subtitle: string;
  timestamp: number;
  data: any;
}

interface SearchDetailModalProps {
  isOpen: boolean;
  item: SearchDetailItem | null;
  onClose: () => void;
  bookmarks: BookmarkType[];
  onToggleBookmark: (id: string, type: BookmarkType['type'], title: string, subtitle?: string) => void;
  onAddNote: (title: string, content: string, type: UserNote['targetType'], targetId?: string, tags?: string[], targetTitle?: string) => void;
  onNavigateToTab?: (tab: string, targetId?: string) => void;
  onAddToCompare?: (id: string, title: string) => void;
  isInCompare?: boolean;
  recentSearches?: RecentSearchItemEntry[];
  onSelectRecent?: (item: SearchDetailItem) => void;
  onClearRecent?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export default function SearchDetailModal({
  isOpen,
  item,
  onClose,
  bookmarks,
  onToggleBookmark,
  onAddNote,
  onNavigateToTab,
  onAddToCompare,
  isInCompare,
  recentSearches = [],
  onSelectRecent,
  onClearRecent,
  onPrev,
  onNext,
  currentIndex,
  totalCount
}: SearchDetailModalProps) {
  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item || !item.data) return null;

  const { type, data } = item;

  // Derive title, subtitle, id, and bookmark status
  let itemId = data.id || '';
  let itemTitle = data.name || data.title || '';
  let itemSubtitle = data.role || data.title || data.subtitle || data.reign || data.date || data.era || '';
  let bookmarkType: BookmarkType['type'] = 'figure';

  if (type === 'monarch') bookmarkType = 'ruler';
  else if (type === 'figure' || type === 'spotlight') bookmarkType = 'figure';
  else if (type === 'event') bookmarkType = 'event';
  else if (type === 'country') bookmarkType = 'country';
  else if (type === 'battle') bookmarkType = 'battle';
  else if (type === 'paper') bookmarkType = 'paper';
  else if (type === 'ideology') bookmarkType = 'ideology';
  else if (type === 'artifact') bookmarkType = 'artifact';
  else if (type === 'decree') bookmarkType = 'source';
  else if (type === 'philosopher') bookmarkType = 'philosopher';

  const isBookmarked = bookmarks.some(b => b.targetId === itemId && b.type === bookmarkType);

  const handleBookmarkClick = () => {
    onToggleBookmark(itemId, bookmarkType, itemTitle, itemSubtitle);
  };

  const handleQuickAddNote = () => {
    let noteContent = `### Historical Notes on ${itemTitle}\n\n`;
    if (data.biography) noteContent += `**Biography & Context**:\n${data.biography}\n\n`;
    if (data.description) noteContent += `**Description**:\n${data.description}\n\n`;
    if (data.impact) noteContent += `**Geopolitical Impact**:\n${data.impact}\n\n`;
    if (data.achievements && Array.isArray(data.achievements)) {
      noteContent += `**Key Achievements**:\n${data.achievements.map((a: string) => `- ${a}`).join('\n')}\n\n`;
    }
    if (data.contributions && Array.isArray(data.contributions)) {
      noteContent += `**Contributions**:\n${data.contributions.map((c: string) => `- ${c}`).join('\n')}\n\n`;
    }
    if (data.quote) noteContent += `> "${data.quote}"\n\n`;

    let targetType: UserNote['targetType'] = 'General';
    if (type === 'monarch') targetType = 'Monarch';
    else if (type === 'figure' || type === 'spotlight') targetType = 'Figure';
    else if (type === 'country') targetType = 'Country';
    else if (type === 'event') targetType = 'Event';
    else if (type === 'battle') targetType = 'Battle';
    else if (type === 'paper') targetType = 'Paper';
    else if (type === 'ideology') targetType = 'Ideology';
    else if (type === 'artifact') targetType = 'General';
    else if (type === 'decree') targetType = 'Source';

    onAddNote(
      `Research: ${itemTitle}`,
      noteContent,
      targetType,
      itemId,
      ['search-result', type, itemTitle.toLowerCase()],
      itemTitle
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-left z-10"
        >
          {/* Top Action & Navigation Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A] bg-[#141414]">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
                {type === 'monarch' && <Crown className="w-4 h-4" />}
                {type === 'figure' && <User className="w-4 h-4" />}
                {type === 'event' && <Clock className="w-4 h-4" />}
                {type === 'country' && <Globe className="w-4 h-4" />}
                {type === 'battle' && <Swords className="w-4 h-4" />}
                {type === 'paper' && <BookOpen className="w-4 h-4" />}
                {type === 'ideology' && <Scale className="w-4 h-4" />}
                {type === 'artifact' && <Landmark className="w-4 h-4" />}
                {type === 'decree' && <Scroll className="w-4 h-4" />}
                {type === 'spotlight' && <Sparkles className="w-4 h-4" />}
                {type === 'philosopher' && <Award className="w-4 h-4" />}
                {type === 'monument' && <Building2 className="w-4 h-4" />}
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] block">
                  Direct Archive Dossier • {type.toUpperCase()}
                </span>
                <h3 className="text-lg sm:text-xl font-serif italic font-bold text-white leading-tight">
                  {itemTitle}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBookmarkClick}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#181818] border-[#2A2A2A] text-[#A09890] hover:text-white'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Item'}
              >
                {isBookmarked ? <BookMarked className="w-4 h-4 text-[#D4AF37]" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <button
                onClick={handleQuickAddNote}
                className="p-2 bg-[#181818] hover:bg-[#252525] border border-[#2A2A2A] text-[#D4AF37] rounded-xl transition-all cursor-pointer"
                title="Save into Study Notes"
              >
                <FileText className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-2 bg-[#181818] hover:bg-rose-950/40 border border-[#2A2A2A] hover:border-rose-800 text-[#A09890] hover:text-rose-300 rounded-xl transition-all cursor-pointer"
                title="Close Direct View (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RECENT SEARCHES BAR AT TOP OF SEARCH MODAL (LAST 3-5 CLICKED ITEMS) */}
          {recentSearches.length > 0 && (
            <div className="px-6 py-2.5 bg-[#12100B] border-b border-[#2A2315] flex flex-wrap items-center justify-between gap-2 text-left">
              <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none max-w-full">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  <span>Recent:</span>
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {recentSearches.slice(0, 5).map((rec) => {
                    const isCurrent = rec.data?.id === data.id || rec.title === itemTitle;
                    return (
                      <button
                        key={rec.id}
                        type="button"
                        onClick={() => onSelectRecent?.({ type: rec.type, data: rec.data })}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer border ${
                          isCurrent
                            ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37] shadow-sm'
                            : 'bg-[#1A1813] text-[#CCC2B8] hover:text-[#D4AF37] hover:bg-[#242017] border-[#383020]'
                        }`}
                        title={`Switch to previously viewed: ${rec.title} (${rec.type})`}
                      >
                        <span className="text-[9px] uppercase opacity-75 font-semibold">
                          {rec.type.slice(0, 3)}:
                        </span>
                        <span className="font-serif italic font-medium truncate max-w-[130px]">
                          {rec.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {onClearRecent && (
                <button
                  type="button"
                  onClick={onClearRecent}
                  className="text-[9px] font-mono text-[#8C8275] hover:text-[#D4AF37] underline transition-colors cursor-pointer shrink-0 ml-auto"
                  title="Clear recent search history"
                >
                  Clear History
                </button>
              )}
            </div>
          )}

          {/* Sequential Deep Dive Navigation Bar */}
          {(onPrev || onNext) && (
            <div className="px-6 py-2 bg-[#0C0C0C] border-b border-[#222] flex items-center justify-between gap-3 text-left">
              <button
                type="button"
                onClick={onPrev}
                disabled={!onPrev}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="View previous record in archive"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <div className="flex items-center gap-2">
                {typeof currentIndex === 'number' && typeof totalCount === 'number' && (
                  <span className="text-[11px] font-mono text-[#A09890] bg-[#0A0A0A] border border-[#222] px-2.5 py-0.5 rounded">
                    Record <strong className="text-white">{currentIndex + 1}</strong> of <strong className="text-white">{totalCount}</strong>
                  </span>
                )}
                <span className="text-[10px] font-mono text-[#D4AF37] hidden sm:inline">⚡ Sequential Deep Dive</span>
              </div>

              <button
                type="button"
                onClick={onNext}
                disabled={!onNext}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="View next record in archive"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Modal Body Content (Scrollable) */}
          <div className="p-6 overflow-y-auto space-y-6 text-sm">
            
            {/* Quick Metadata Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {data.era && (
                <span className="px-2.5 py-1 bg-[#1A1A1A] border border-[#2A2A2A] text-[#D4AF37] rounded-lg">
                  📅 {data.era}
                </span>
              )}
              {(data.reign || data.date || data.years || data.birthDeath || data.year) && (
                <span className="px-2.5 py-1 bg-[#1A1A1A] border border-[#2A2A2A] text-[#E0D8D0] rounded-lg">
                  ⏳ {data.reign || data.date || data.years || data.birthDeath || data.year}
                </span>
              )}
              {(data.region || data.continent || data.location) && (
                <span className="px-2.5 py-1 bg-[#1A1A1A] border border-[#2A2A2A] text-[#A09890] rounded-lg">
                  📍 {data.region || data.continent || data.location}
                </span>
              )}
              {(data.role || data.category || data.school) && (
                <span className="px-2.5 py-1 bg-[#1A1A1A] border border-[#2A2A2A] text-emerald-400 rounded-lg">
                  🏷️ {data.role || data.category || data.school}
                </span>
              )}
            </div>

            {/* 1. MONARCH & FIGURE DETAILS */}
            {(type === 'monarch' || type === 'figure') && (
              <div className="space-y-4">
                {data.imageUrl && (
                  <div className="w-full max-h-56 overflow-hidden rounded-xl border border-[#2A2A2A] bg-black">
                    <img 
                      src={data.imageUrl} 
                      alt={itemTitle} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#7A7065] tracking-wider">
                    Biographical Overview
                  </h4>
                  <p className="text-sm text-[#D5CEC5] leading-relaxed font-sans">
                    {data.biography}
                  </p>
                </div>

                {(data.keyAchievements || data.contributions) && (
                  <div className="space-y-2 bg-[#121212] p-4 rounded-xl border border-[#222]">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      Key Historic Accomplishments
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#C4B9AD] font-sans">
                      {(data.keyAchievements || data.contributions).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#D4AF37] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.legacy && (
                  <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                      Civilizational Legacy
                    </h4>
                    <p className="text-xs text-[#C4B9AD] leading-relaxed font-sans">
                      {data.legacy}
                    </p>
                  </div>
                )}

                {data.quote && (
                  <div className="border-l-2 border-[#D4AF37] pl-4 py-2 bg-[#14120F] rounded-r-xl italic font-serif text-sm text-[#E0D8D0]">
                    "{data.quote}"
                  </div>
                )}
              </div>
            )}

            {/* 2. SPOTLIGHT FIGURE */}
            {type === 'spotlight' && (
              <div className="space-y-4">
                {data.portraitUrl && (
                  <div className="w-full max-h-60 overflow-hidden rounded-xl border border-[#2A2A2A] bg-black">
                    <img 
                      src={data.portraitUrl} 
                      alt={itemTitle} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {data.quote && (
                  <div className="border-l-2 border-[#D4AF37] pl-4 py-2 bg-[#14120F] rounded-r-xl italic font-serif text-sm text-[#E0D8D0]">
                    "{data.quote}"
                    {data.quoteContext && (
                      <span className="block text-[11px] font-mono text-[#A09890] mt-1 not-italic">
                        — {data.quoteContext}
                      </span>
                    )}
                  </div>
                )}

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#7A7065] tracking-wider">
                    Biography & Sovereign Arc
                  </h4>
                  <p className="text-sm text-[#D5CEC5] leading-relaxed font-sans">
                    {data.biography}
                  </p>
                </div>

                {data.keyAchievements && Array.isArray(data.keyAchievements) && (
                  <div className="space-y-2 bg-[#121212] p-4 rounded-xl border border-[#222]">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider">
                      Defining Milestones
                    </h4>
                    <div className="space-y-2">
                      {data.keyAchievements.map((ach: any, idx: number) => (
                        <div key={idx} className="text-xs">
                          <strong className="text-white block font-serif italic">{ach.title}</strong>
                          <p className="text-[#A09890]">{ach.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {data.legacySummary && (
                  <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                      Historical Legacy
                    </h4>
                    <p className="text-xs text-[#C4B9AD] leading-relaxed font-sans">
                      {data.legacySummary}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 3. EVENT DETAILS */}
            {type === 'event' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#7A7065] tracking-wider">
                    Historical Description
                  </h4>
                  <p className="text-sm text-[#D5CEC5] leading-relaxed font-sans">
                    {data.description}
                  </p>
                </div>

                {data.impact && (
                  <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Geopolitical Aftermath & Impact
                    </h4>
                    <p className="text-xs text-[#C4B9AD] leading-relaxed font-sans">
                      {data.impact}
                    </p>
                  </div>
                )}

                {data.participants && Array.isArray(data.participants) && (
                  <div className="space-y-2 bg-[#121212] p-4 rounded-xl border border-[#222]">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      Key Participants & Belligerents
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {data.participants.map((p: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-1 bg-[#1A1A1A] border border-[#2A2A2A] text-xs font-mono text-white rounded-lg">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. COUNTRY DETAILS */}
            {type === 'country' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#222]">
                  <span className="text-4xl">{data.flag || '🏛️'}</span>
                  <div>
                    <h4 className="font-serif italic font-bold text-lg text-white">{data.name}</h4>
                    <p className="text-xs text-[#A09890] font-mono">Language: {data.language} • Continent: {data.continent}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#7A7065] tracking-wider">
                    Civilizational Culture & Ideology
                  </h4>
                  <p className="text-sm text-[#D5CEC5] leading-relaxed font-sans">
                    {data.culture}
                  </p>
                </div>

                {data.revolution && (
                  <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                      Turning Points & Revolution
                    </h4>
                    <p className="text-xs text-[#C4B9AD] leading-relaxed font-sans">
                      {data.revolution}
                    </p>
                  </div>
                )}

                {data.achievements && Array.isArray(data.achievements) && (
                  <div className="space-y-2 bg-[#121212] p-4 rounded-xl border border-[#222]">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider">
                      Monumental Achievements
                    </h4>
                    <ul className="space-y-1 text-xs text-[#C4B9AD] font-sans">
                      {data.achievements.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#D4AF37] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 5. BATTLE DETAILS */}
            {type === 'battle' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#121212] p-3 rounded-xl border border-[#222] text-xs font-mono">
                  <div>
                    <span className="text-[#7A7065] text-[10px] uppercase block">Year</span>
                    <span className="text-white font-bold">{data.dateStr || data.year}</span>
                  </div>
                  <div>
                    <span className="text-[#7A7065] text-[10px] uppercase block">War</span>
                    <span className="text-[#D4AF37] truncate block">{data.war}</span>
                  </div>
                  <div>
                    <span className="text-[#7A7065] text-[10px] uppercase block">Victor</span>
                    <span className="text-emerald-400 font-bold block">{data.outcome || data.victor}</span>
                  </div>
                  <div>
                    <span className="text-[#7A7065] text-[10px] uppercase block">Region</span>
                    <span className="text-white truncate block">{data.region}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#141414] rounded-xl border border-[#222] space-y-1">
                    <span className="text-[10px] font-mono text-[#7A7065] uppercase block">Combatant A</span>
                    <strong className="text-white text-xs block">{data.combatantA}</strong>
                    <span className="text-[11px] text-[#A09890] block">Cmdr: {data.commanderA}</span>
                    {data.forcesA && <span className="text-[10px] text-[#D4AF37] font-mono block">Forces: {data.forcesA}</span>}
                  </div>
                  <div className="p-3 bg-[#141414] rounded-xl border border-[#222] space-y-1">
                    <span className="text-[10px] font-mono text-[#7A7065] uppercase block">Combatant B</span>
                    <strong className="text-white text-xs block">{data.combatantB}</strong>
                    <span className="text-[11px] text-[#A09890] block">Cmdr: {data.commanderB}</span>
                    {data.forcesB && <span className="text-[10px] text-[#D4AF37] font-mono block">Forces: {data.forcesB}</span>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#7A7065] tracking-wider">
                    Tactical Summary
                  </h4>
                  <p className="text-sm text-[#D5CEC5] leading-relaxed font-sans">
                    {data.tacticalSummary}
                  </p>
                </div>

                {data.significance && (
                  <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                      Strategic Significance
                    </h4>
                    <p className="text-xs text-[#C4B9AD] leading-relaxed font-sans">
                      {data.significance}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 6. RESEARCH PAPER */}
            {type === 'paper' && (
              <div className="space-y-4">
                <div className="space-y-1 pb-3 border-b border-[#222]">
                  <span className="text-xs text-[#D4AF37] font-mono block">
                    {data.journalOrPublisher} ({data.year}) • {data.category}
                  </span>
                  <p className="text-xs text-[#A09890]">
                    Authors: {Array.isArray(data.authors) ? data.authors.join(', ') : data.authors}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#7A7065] tracking-wider">
                    Scholarly Abstract
                  </h4>
                  <p className="text-sm text-[#D5CEC5] leading-relaxed font-sans">
                    {data.abstract}
                  </p>
                </div>

                {data.historicalThesis && (
                  <div className="p-3.5 bg-[#14120F] border border-[#D4AF37]/30 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider">
                      Core Historical Thesis
                    </h4>
                    <p className="text-xs text-[#E0D8D0] leading-relaxed font-sans">
                      {data.historicalThesis}
                    </p>
                  </div>
                )}

                {data.keyFindings && Array.isArray(data.keyFindings) && (
                  <div className="space-y-2 bg-[#121212] p-4 rounded-xl border border-[#222]">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider">
                      Key Historiographical Findings
                    </h4>
                    <ul className="space-y-1 text-xs text-[#C4B9AD] font-sans">
                      {data.keyFindings.map((kf: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#D4AF37] font-bold">•</span>
                          <span>{kf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 7. POLITICAL IDEOLOGY */}
            {type === 'ideology' && (
              <div className="space-y-4">
                <div className="space-y-1 pb-3 border-b border-[#222]">
                  <span className="text-xs text-emerald-400 font-mono block">
                    Spectrum: {data.spectrumPlacement} • Era: {data.historicalEra}
                  </span>
                  <p className="text-xs text-[#A09890]">
                    Key Thinkers: {Array.isArray(data.keyThinkers) ? data.keyThinkers.join(', ') : data.keyThinkers}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#7A7065] tracking-wider">
                    Core Ideological Philosophy
                  </h4>
                  <p className="text-sm text-[#D5CEC5] leading-relaxed font-sans">
                    {data.description}
                  </p>
                </div>

                {data.corePrinciples && Array.isArray(data.corePrinciples) && (
                  <div className="space-y-2 bg-[#121212] p-4 rounded-xl border border-[#222]">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider">
                      Foundational Principles
                    </h4>
                    <ul className="space-y-1 text-xs text-[#C4B9AD] font-sans">
                      {data.corePrinciples.map((cp: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#D4AF37] font-bold">•</span>
                          <span>{cp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.historicalImpact && (
                  <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                      Global Historical Impact
                    </h4>
                    <p className="text-xs text-[#C4B9AD] leading-relaxed font-sans">
                      {data.historicalImpact}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 8. DAILY ARTIFACT */}
            {type === 'artifact' && (
              <div className="space-y-4">
                {data.images && data.images[0] && (
                  <div className="w-full max-h-60 overflow-hidden rounded-xl border border-[#2A2A2A] bg-black">
                    <img 
                      src={data.images[0].url} 
                      alt={itemTitle} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono bg-[#121212] p-3 rounded-xl border border-[#222]">
                  <div>
                    <span className="text-[#7A7065] text-[10px] uppercase block">Material</span>
                    <span className="text-white truncate block">{data.material || 'Bronze / Stone'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A7065] text-[10px] uppercase block">Origin</span>
                    <span className="text-[#D4AF37] truncate block">{data.origin || data.region}</span>
                  </div>
                  <div>
                    <span className="text-[#7A7065] text-[10px] uppercase block">Period</span>
                    <span className="text-emerald-400 truncate block">{data.periodYear || data.era}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#7A7065] tracking-wider">
                    Historical Context & Biography
                  </h4>
                  <p className="text-sm text-[#D5CEC5] leading-relaxed font-sans">
                    {data.biography || data.historicalContext}
                  </p>
                </div>

                {data.significance && (
                  <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                      Archaeological Significance
                    </h4>
                    <p className="text-xs text-[#C4B9AD] leading-relaxed font-sans">
                      {data.significance}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 9. DECREES & PRIMARY SOURCES */}
            {type === 'decree' && (
              <div className="space-y-4">
                <div className="space-y-1 pb-3 border-b border-[#222]">
                  <span className="text-xs text-[#D4AF37] font-mono block">
                    Author / Sovereign: {data.authorOrRuler} • {data.civilization} ({data.year})
                  </span>
                  <p className="text-xs text-[#A09890]">
                    Location: {data.originalLocation}
                  </p>
                </div>

                {data.famousQuote && (
                  <div className="border-l-2 border-[#D4AF37] pl-4 py-2 bg-[#14120F] rounded-r-xl italic font-serif text-sm text-[#E0D8D0]">
                    "{data.famousQuote}"
                  </div>
                )}

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#7A7065] tracking-wider">
                    Historical Context
                  </h4>
                  <p className="text-sm text-[#D5CEC5] leading-relaxed font-sans">
                    {data.historicalContext}
                  </p>
                </div>

                {data.keyClausesOrThemes && Array.isArray(data.keyClausesOrThemes) && (
                  <div className="space-y-2 bg-[#121212] p-4 rounded-xl border border-[#222]">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider">
                      Key Clauses & Legal Decrees
                    </h4>
                    <ul className="space-y-1 text-xs text-[#C4B9AD] font-sans">
                      {data.keyClausesOrThemes.map((cl: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#D4AF37] font-bold">•</span>
                          <span>{cl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.globalSignificance && (
                  <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                      Civilizational Significance
                    </h4>
                    <p className="text-xs text-[#C4B9AD] leading-relaxed font-sans">
                      {data.globalSignificance}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 10. PHILOSOPHER */}
            {type === 'philosopher' && (
              <div className="space-y-4">
                <div className="space-y-1 pb-3 border-b border-[#222]">
                  <span className="text-xs text-emerald-400 font-mono block">
                    School: {data.school} • Era: {data.era} ({data.bornDiet})
                  </span>
                  <p className="text-xs text-[#A09890]">
                    Region: {data.region}
                  </p>
                </div>

                {data.quotes && data.quotes[0] && (
                  <div className="border-l-2 border-[#D4AF37] pl-4 py-2 bg-[#14120F] rounded-r-xl italic font-serif text-sm text-[#E0D8D0]">
                    "{data.quotes[0]}"
                  </div>
                )}

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#7A7065] tracking-wider">
                    Philosophical Biography
                  </h4>
                  <p className="text-sm text-[#D5CEC5] leading-relaxed font-sans">
                    {data.biography}
                  </p>
                </div>

                {data.ideas && Array.isArray(data.ideas) && (
                  <div className="space-y-2 bg-[#121212] p-4 rounded-xl border border-[#222]">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider">
                      Core Philosophical Inquiries & Doctrines
                    </h4>
                    <ul className="space-y-1 text-xs text-[#C4B9AD] font-sans">
                      {data.ideas.map((idea: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#D4AF37] font-bold">•</span>
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 11. WORLD MONUMENTS, WONDERS & ANTIQUITIES */}
            {type === 'monument' && (
              <div className="space-y-4">
                <div className="space-y-1 pb-3 border-b border-[#222]">
                  <span className="text-xs text-amber-400 font-mono block">
                    {data.architecturalStyle || 'Architectural Wonder'} • {data.periodYear || data.era || ''}
                  </span>
                  <p className="text-xs text-[#A09890]">
                    Location: {data.location} {data.region ? `(${data.region})` : ''}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#7A7065] tracking-wider">
                    Architectural & Historical Description
                  </h4>
                  <p className="text-sm text-[#D5CEC5] leading-relaxed font-sans whitespace-pre-line">
                    {data.description}
                  </p>
                </div>

                {data.structuralHighlights && Array.isArray(data.structuralHighlights) && (
                  <div className="space-y-2 bg-[#121212] p-4 rounded-xl border border-[#222]">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider">
                      Structural & Engineering Highlights
                    </h4>
                    <ul className="space-y-1 text-xs text-[#C4B9AD] font-sans">
                      {data.structuralHighlights.map((hl: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#D4AF37] font-bold">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.funFact && (
                  <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                      Curatorial Wonder & Fascinating Fact
                    </h4>
                    <p className="text-xs text-[#C4B9AD] leading-relaxed font-sans">
                      {data.funFact}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Bottom Footer Actions */}
          <div className="px-6 py-4 border-t border-[#2A2A2A] bg-[#141414] flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-[#7A7065] font-mono">
              Press <kbd className="px-1.5 py-0.5 bg-[#222] border border-[#333] rounded text-white text-[10px]">Esc</kbd> to exit
            </div>

            <div className="flex items-center gap-2">
              {/* Optional Navigation Button if the user wants to jump to the tab */}
              {onNavigateToTab && (
                <button
                  onClick={() => {
                    let targetTab = 'vaults';
                    if (type === 'monarch') targetTab = 'vaults';
                    else if (type === 'figure') targetTab = 'vaults';
                    else if (type === 'event') targetTab = 'timeline';
                    else if (type === 'country') targetTab = 'map';
                    else if (type === 'battle') targetTab = 'battles';
                    else if (type === 'paper') targetTab = 'papers';
                    else if (type === 'ideology') targetTab = 'ideologies';
                    else if (type === 'artifact') targetTab = 'artifacts';
                    else if (type === 'decree') targetTab = 'decrees';
                    else if (type === 'spotlight') targetTab = 'encyclopedia';
                    else if (type === 'philosopher') targetTab = 'philosophers';
                    else if (type === 'monument') targetTab = 'monuments';

                    onNavigateToTab(targetTab, itemId);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-[#1C1C1C] hover:bg-[#282828] border border-[#333] text-[#A09890] hover:text-white rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore in Vault</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}

              {onAddToCompare && (
                <button
                  onClick={() => onAddToCompare(itemId, itemTitle)}
                  disabled={isInCompare}
                  className={`px-3 py-1.5 border rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                    isInCompare 
                      ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300 cursor-default' 
                      : 'bg-[#181818] hover:bg-[#252525] border-[#D4AF37]/60 text-[#D4AF37] hover:border-[#D4AF37] cursor-pointer'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isInCompare ? 'In Comparison' : '+ Add to Comparison'}</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold font-mono text-xs rounded-xl transition-all cursor-pointer shadow"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
