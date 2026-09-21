import { useState } from 'react';
import { Calendar, MapPin, Landmark, ArrowRight, BookMarked, X, Compass, Shield, Award, Feather, Sparkles } from 'lucide-react';
import { DailyArtifact, Bookmark, UserNote } from '../types';
import { getDailyArtifactForDate } from '../data/dailyArtifacts';
import { playSound } from '../utils/audio';

interface DailyArtifactWidgetProps {
  onOpenFullView: (artifactId?: string) => void;
  onAddNote?: (title: string, content: string, type: UserNote['targetType'], targetId?: string) => void;
  onToggleBookmark?: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  bookmarks: Bookmark[];
}

export default function DailyArtifactWidget({
  onOpenFullView,
  onAddNote,
  onToggleBookmark,
  bookmarks
}: DailyArtifactWidgetProps) {
  // Exclusively locked to today's date and artifact
  const today = new Date();
  const [isNoteInputOpen, setIsNoteInputOpen] = useState(false);
  const [userNote, setUserNote] = useState('');

  // Deterministically fetch today's unique daily artifact
  const artifact: DailyArtifact = getDailyArtifactForDate(today);
  const isBookmarked = bookmarks.some((b) => b.type === 'artifact' && b.targetId === artifact.id);

  const handleBookmarkToggle = () => {
    if (onToggleBookmark) {
      onToggleBookmark(artifact.id, 'artifact', artifact.name, `${artifact.category} • ${artifact.era}`);
    }
    playSound('click');
  };

  const handleSaveNote = () => {
    if (!userNote.trim()) return;
    if (onAddNote) {
      onAddNote(artifact.name, userNote.trim(), 'Artifact' as any, artifact.id);
    }
    setUserNote('');
    setIsNoteInputOpen(false);
    playSound('click');
  };

  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      id="daily-artifact-dashboard-widget"
      className="bg-gradient-to-br from-[#12100E] via-[#161412] to-[#0D0C0A] border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative Gold Radial Light Atmosphere */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Widget Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#2A2A2A]/80 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#201C14] border border-[#D4AF37]/45 flex items-center justify-center text-[#D4AF37] shadow-md shrink-0">
            <Landmark className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="bg-[#D4AF37] text-black font-mono font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full tracking-wider shadow">
                Today's Exclusive Relic
              </span>
              <span className="text-[11px] font-mono text-[#A09890] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D4AF37]" /> {formattedDate}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif italic font-bold text-[#E5C158] tracking-tight">
              Daily Historical Artifact
            </h3>
          </div>
        </div>

        {/* Date Badge: Strictly Today */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-[#1A1814] border border-[#D4AF37]/30 px-3.5 py-1.5 rounded-2xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#E5C158] uppercase tracking-wider">
            Today Only
          </span>
        </div>
      </div>

      {/* Main Content Layout: Relic Emblem Dossier Card + Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 relative z-10 items-stretch text-left">
        {/* Left Column: Curatorial Relic Specimen Plaque (No photos/360) */}
        <div className="lg:col-span-5 bg-[#17140F] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-inner flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#231E15] text-[#D4AF37] border border-[#D4AF37]/40 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider">
                {artifact.category}
              </span>
              <span className="text-[10px] font-mono text-[#A09890]">
                Accession #{artifact.currentLocation.accessionNumber}
              </span>
            </div>

            <div className="border-l-2 border-[#D4AF37] pl-3 py-1">
              <span className="text-[10px] font-mono text-[#8E867C] uppercase block tracking-wider">
                Historical Chronology
              </span>
              <p className="text-sm font-bold text-[#E5C158] font-sans">
                {artifact.era} ({artifact.periodYear})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#12100C] p-2.5 rounded-xl border border-[#222]">
                <span className="text-[10px] font-mono text-[#8E867C] uppercase block">Material</span>
                <span className="font-bold text-white truncate block">{artifact.material}</span>
              </div>
              <div className="bg-[#12100C] p-2.5 rounded-xl border border-[#222]">
                <span className="text-[10px] font-mono text-[#8E867C] uppercase block">Dimensions</span>
                <span className="font-bold text-white truncate block">{artifact.dimensions}</span>
              </div>
            </div>

            <div className="bg-[#12100C] p-2.5 rounded-xl border border-[#222] text-xs">
              <span className="text-[10px] font-mono text-[#8E867C] uppercase block">Discovery / Provenance</span>
              <span className="text-[#C5BDB5] text-[11px] line-clamp-2">
                Uncovered {artifact.dateDiscovered} ({artifact.origin}). {artifact.discoveredBy ? `Excavated by ${artifact.discoveredBy}.` : ''}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#222] flex items-center justify-between text-[11px] text-[#8E867C]">
            <span className="flex items-center gap-1 text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" /> Archaeological Specimen
            </span>
            <span className="font-mono text-[10px]">{artifact.origin}</span>
          </div>
        </div>

        {/* Right Column: Detailed Biography & Context Excerpt */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#221D12] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-lg">
                {artifact.era}
              </span>
              <span className="text-xs text-[#A09890] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#D4AF37]" /> {artifact.origin}
              </span>
            </div>

            <h4 className="text-xl sm:text-2xl font-serif italic font-bold text-white tracking-tight">
              {artifact.name}
            </h4>
            <p className="text-xs sm:text-sm text-[#D4AF37]/90 font-sans italic">
              "{artifact.subtitle}"
            </p>

            <p className="text-xs sm:text-sm text-[#A09890] leading-relaxed font-sans line-clamp-3 pt-1">
              {artifact.biography}
            </p>
          </div>

          {/* Current Museum Location Badge */}
          <div className="bg-[#181510] border border-[#2A2A2A] rounded-2xl p-3.5 flex items-start gap-3 shadow-sm">
            <div className="p-2 rounded-xl bg-[#221D12] border border-[#D4AF37]/30 text-[#D4AF37] shrink-0 mt-0.5">
              <Landmark className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 text-xs">
              <span className="font-mono text-[10px] text-[#A09890] uppercase font-bold tracking-wider block">
                Current Location & Housing:
              </span>
              <p className="text-[#E0D8D0] font-bold font-sans">
                {artifact.currentLocation.museum} — {artifact.currentLocation.city}, {artifact.currentLocation.country}
              </p>
              <p className="text-[11px] text-[#A09890]">
                {artifact.currentLocation.galleryRoom} (Catalog #{artifact.currentLocation.accessionNumber})
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                id="bookmark-artifact-widget-btn"
                onClick={handleBookmarkToggle}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                  isBookmarked
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'bg-[#181510] text-[#A09890] border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
                }`}
                title={isBookmarked ? 'Bookmarked' : 'Save to Bookmarks'}
              >
                <BookMarked className="w-4 h-4" />
                <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
              </button>

              <button
                id="note-artifact-widget-btn"
                onClick={() => setIsNoteInputOpen(!isNoteInputOpen)}
                className="px-3 py-2.5 bg-[#181510] hover:bg-[#221D12] border border-[#2A2A2A] hover:border-[#D4AF37]/40 text-[#A09890] hover:text-[#D4AF37] rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                + Study Note
              </button>
            </div>

            <button
              id="open-full-artifact-dossier-btn"
              onClick={() => { onOpenFullView(artifact.id); playSound('click'); }}
              className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#AA7C11] text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:brightness-110 flex items-center gap-2 cursor-pointer font-sans"
            >
              <span>Explore Archaeological Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Inline Quick Note Input Drawer */}
          {isNoteInputOpen && (
            <div className="pt-2 animate-fade-in">
              <div className="bg-[#16130E] border border-[#D4AF37]/35 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#D4AF37] font-mono">
                  <span>Add note for {artifact.name}:</span>
                  <button
                    onClick={() => setIsNoteInputOpen(false)}
                    className="text-[#8E867C] hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="Record your archaeological observations or lecture notes..."
                  className="w-full h-18 bg-[#0D0C0A] border border-[#2A2A2A] rounded-lg p-2.5 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  onClick={handleSaveNote}
                  className="w-full py-1.5 bg-[#D4AF37] text-black font-bold rounded-lg text-xs hover:brightness-105"
                >
                  Save Note to Vault
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
