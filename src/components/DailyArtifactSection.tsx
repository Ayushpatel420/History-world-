import { useState, useMemo } from 'react';
import {
  Calendar, MapPin, Landmark, ArrowRight, BookMarked,
  Sparkles, ExternalLink, Compass, Shield, CheckCircle2, Copy, Check,
  BookOpen, Feather, Scale, ChevronLeft, ChevronRight, Search, Eye, Layers,
  Navigation, ArrowRightLeft
} from 'lucide-react';
import { DailyArtifact, Bookmark, UserNote } from '../types';
import { ALL_DAILY_ARTIFACTS, getDailyArtifactForDate } from '../data/dailyArtifacts';
import PaginationControls from './PaginationControls';
import VisualHistoryCarousel from './VisualHistoryCarousel';
import { ArtifactProvenanceMap } from './ArtifactProvenanceMap';
import { ArtifactCompareModal } from './ArtifactCompareModal';
import { playSound } from '../utils/audio';

interface DailyArtifactSectionProps {
  initialArtifactId?: string;
  onAddNote?: (title: string, content: string, type: UserNote['targetType'], targetId?: string) => void;
  onToggleBookmark?: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  bookmarks: Bookmark[];
  onNavigateToScholar?: (prompt: string) => void;
}

export default function DailyArtifactSection({
  initialArtifactId,
  onAddNote,
  onToggleBookmark,
  bookmarks,
  onNavigateToScholar
}: DailyArtifactSectionProps) {
  const today = new Date();
  const defaultTodayArtifact = getDailyArtifactForDate(today);

  // Active artifact selected for curatorial deep dive
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>(() => initialArtifactId || defaultTodayArtifact.id);

  // Gallery view filter & pagination states
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryEra, setGalleryEra] = useState('All');
  const [galleryPage, setGalleryPage] = useState(1);
  const [galleryItemsPerPage, setGalleryItemsPerPage] = useState(24);

  // Provenance Map & Vault Comparison States
  const [showProvenanceMap, setShowProvenanceMap] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Current artifact lookup
  const currentArtifactIndex = useMemo(() => {
    const idx = ALL_DAILY_ARTIFACTS.findIndex(a => a.id === selectedArtifactId);
    return idx >= 0 ? idx : 0;
  }, [selectedArtifactId]);

  const currentArtifact: DailyArtifact = ALL_DAILY_ARTIFACTS[currentArtifactIndex] || defaultTodayArtifact;

  const [activeDossierTab, setActiveDossierTab] = useState<'biography' | 'context' | 'significance' | 'museum' | 'craft' | 'facts' | 'provenance'>('biography');
  const [noteContent, setNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Navigation handlers for next/prev artifact dive
  const handlePrevArtifact = () => {
    const prevIdx = (currentArtifactIndex - 1 + ALL_DAILY_ARTIFACTS.length) % ALL_DAILY_ARTIFACTS.length;
    setSelectedArtifactId(ALL_DAILY_ARTIFACTS[prevIdx].id);
    playSound('click');
    // Scroll smoothly to dossier
    document.getElementById('main-dossier-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNextArtifact = () => {
    const nextIdx = (currentArtifactIndex + 1) % ALL_DAILY_ARTIFACTS.length;
    setSelectedArtifactId(ALL_DAILY_ARTIFACTS[nextIdx].id);
    playSound('click');
    // Scroll smoothly to dossier
    document.getElementById('main-dossier-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isBookmarked = bookmarks.some(
    (b) => b.type === 'artifact' && b.targetId === currentArtifact.id
  );

  // Filtered gallery items
  const filteredGalleryArtifacts = useMemo(() => {
    return ALL_DAILY_ARTIFACTS.filter(item => {
      const matchesSearch = !gallerySearch.trim() || 
        item.name.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        item.origin.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        item.currentLocation.museum.toLowerCase().includes(gallerySearch.toLowerCase());
      const matchesEra = galleryEra === 'All' || item.era.toLowerCase().includes(galleryEra.toLowerCase());
      return matchesSearch && matchesEra;
    });
  }, [gallerySearch, galleryEra]);

  const totalGalleryPages = Math.ceil(filteredGalleryArtifacts.length / galleryItemsPerPage) || 1;
  const paginatedGalleryArtifacts = useMemo(() => {
    const start = (galleryPage - 1) * galleryItemsPerPage;
    return filteredGalleryArtifacts.slice(start, start + galleryItemsPerPage);
  }, [filteredGalleryArtifacts, galleryPage, galleryItemsPerPage]);

  const uniqueEras = useMemo(() => {
    const set = new Set<string>();
    ALL_DAILY_ARTIFACTS.forEach(a => {
      if (a.era) set.add(a.era.split('(')[0].trim());
    });
    return ['All', ...Array.from(set)];
  }, []);

  const handleBookmarkToggle = () => {
    if (onToggleBookmark) {
      onToggleBookmark(
        currentArtifact.id,
        'artifact',
        currentArtifact.name,
        `${currentArtifact.category} • ${currentArtifact.era}`
      );
    }
    playSound('click');
  };

  const handleSaveNote = () => {
    if (!noteContent.trim()) return;
    if (onAddNote) {
      onAddNote(currentArtifact.name, noteContent.trim(), 'Artifact' as any, currentArtifact.id);
    }
    setNoteContent('');
    setIsAddingNote(false);
    playSound('click');
  };

  const handleCopyCitation = () => {
    const citation = `"${currentArtifact.name}" (${currentArtifact.periodYear}), ${currentArtifact.origin}. Currently housed at ${currentArtifact.currentLocation.museum}, ${currentArtifact.currentLocation.city}. Accessed via History World Archive.`;
    navigator.clipboard.writeText(citation);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    playSound('click');
  };

  const handleScholarDeepDive = () => {
    if (onNavigateToScholar) {
      const prompt = `Conduct a rigorous historical and archaeological inquiry into "${currentArtifact.name}" (${currentArtifact.periodYear}, ${currentArtifact.origin}). Analyze its material craftsmanship, historical controversies, and its transformative significance to world history and culture.`;
      onNavigateToScholar(prompt);
      playSound('click');
    }
  };

  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div id="daily-artifact-full-section" className="space-y-8 text-left">
      {/* Top Banner & Exclusivity Badge */}
      <div className="bg-gradient-to-br from-[#14110C] via-[#18140E] to-[#0A0907] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-[#D4AF37] text-black font-mono font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow">
              Curatorial Wonder Specimen
            </span>
            <span className="text-xs font-mono text-[#A09890] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {formattedDate}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5B8] via-[#D4AF37] to-[#AA7C11]">
            Wonders & Historical Artifacts
          </h2>

          <p className="text-xs sm:text-sm text-[#A09890] leading-relaxed font-sans">
            Every day, celebrated relics from world civilizations are unveiled with archaeological dossiers, metallurgical craftsmanship analysis, historical context, and museum gallery housing. Navigate page by page or dive directly through curatorial specimens.
          </p>
        </div>

        {/* Quick Relic Dive Selector */}
        <div className="relative z-10 bg-[#0A0A0A] border border-[#2A241A] rounded-2xl p-3.5 space-y-2 min-w-[240px]">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#A09890] uppercase font-bold">
            <span>Direct Relic Dive:</span>
            <span className="text-[#D4AF37]">{currentArtifactIndex + 1} / {ALL_DAILY_ARTIFACTS.length}</span>
          </div>
          <select
            value={currentArtifact.id}
            onChange={(e) => {
              setSelectedArtifactId(e.target.value);
              playSound('click');
            }}
            aria-label="Direct Relic Dive selection"
            className="w-full bg-[#14120D] text-white text-xs font-serif italic border border-[#3A3020] rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            {ALL_DAILY_ARTIFACTS.map((art, idx) => (
              <option key={art.id} value={art.id} className="bg-[#121212] text-white font-sans not-italic">
                #{idx + 1}: {art.name} ({art.periodYear})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dive Navigation Bar (Previous & Next Artifact System) */}
      <div className="bg-[#110E0A] border border-[#D4AF37]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <button
          onClick={handlePrevArtifact}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#181510] hover:bg-[#252016] border border-[#3A3020] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-xl transition-all cursor-pointer flex items-center gap-2 text-xs font-mono group"
        >
          <ChevronLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-0.5 transition-transform" />
          <div className="text-left">
            <span className="text-[9px] uppercase tracking-wider text-[#8A8072] block">Previous Relic</span>
            <span className="font-serif italic font-bold text-xs truncate max-w-[170px] block">
              {ALL_DAILY_ARTIFACTS[(currentArtifactIndex - 1 + ALL_DAILY_ARTIFACTS.length) % ALL_DAILY_ARTIFACTS.length].name}
            </span>
          </div>
        </button>

        <div className="text-center px-4 py-1.5 bg-[#080705] border border-[#242017] rounded-xl">
          <span className="text-[10px] font-mono text-[#8A8072] uppercase block tracking-widest">Active Specimen</span>
          <span className="text-xs font-serif font-bold text-[#D4AF37]">
            {currentArtifact.name}
          </span>
          <span className="text-[10px] font-mono text-[#A09890] block">
            ({currentArtifact.periodYear} • {currentArtifact.region})
          </span>
        </div>

        <button
          onClick={handleNextArtifact}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#181510] hover:bg-[#252016] border border-[#3A3020] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-xl transition-all cursor-pointer flex items-center justify-end gap-2 text-xs font-mono group"
        >
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-wider text-[#8A8072] block">Next Relic</span>
            <span className="font-serif italic font-bold text-xs truncate max-w-[170px] block">
              {ALL_DAILY_ARTIFACTS[(currentArtifactIndex + 1) % ALL_DAILY_ARTIFACTS.length].name}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Interactive Provenance Journey Mini-Map Overlay */}
      {showProvenanceMap && (
        <div id="provenance-map-overlay-container" className="scroll-mt-4">
          <ArtifactProvenanceMap
            artifact={currentArtifact}
            onClose={() => {
              setShowProvenanceMap(false);
              playSound('click');
            }}
            isOverlay={true}
          />
        </div>
      )}

      {/* Main Feature Display: Left Curatorial Specimen Plaque, Right Dossier Core */}
      <div id="main-dossier-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Authentic Curatorial Archaeological Plaque (Clean, No photos/images or 360) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-b from-[#16130F] via-[#12100C] to-[#0A0907] border border-[#D4AF37]/40 rounded-3xl p-6 shadow-2xl space-y-5">
            {/* Plaque Header & Curatorial Seal */}
            <div className="flex items-start justify-between border-b border-[#2A261D] pb-4">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-[#D4AF37] tracking-wider">
                  <Landmark className="w-3.5 h-3.5" /> Curatorial Specimen Dossier
                </div>
                <h3 className="font-serif italic font-black text-xl text-white mt-1">
                  {currentArtifact.name}
                </h3>
                <p className="text-xs text-[#A09890] mt-0.5 font-sans">
                  {currentArtifact.subtitle}
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#231E15] border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-bold shrink-0 text-center shadow">
                <span className="block text-[8px] uppercase tracking-wider text-[#8E867C]">Catalog</span>
                #{currentArtifact.currentLocation.accessionNumber}
              </div>
            </div>

            {/* Inscription & Provenance Summary Box */}
            <div className="bg-[#0D0B08] border border-[#262016] rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider flex items-center gap-1">
                <Feather className="w-3 h-3" /> Inscription & Core Provenance
              </span>
              <p className="text-xs text-[#CCC2B8] leading-relaxed font-sans italic border-l-2 border-[#D4AF37]/60 pl-2.5">
                {currentArtifact.biography.slice(0, 220)}...
              </p>
            </div>

            {/* Comprehensive Technical & Material Matrix */}
            <div className="space-y-3">
              <h5 className="font-mono text-xs uppercase font-bold text-[#D4AF37] tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Physical & Archaeological Matrix
              </h5>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C]">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Material Composition</span>
                  <span className="font-bold text-[#E0D8D0] block mt-0.5">{currentArtifact.material}</span>
                </div>
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C]">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Dimensions</span>
                  <span className="font-bold text-[#E0D8D0] block mt-0.5">{currentArtifact.dimensions}</span>
                </div>
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C]">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Physical Weight</span>
                  <span className="font-bold text-[#E0D8D0] block mt-0.5">{currentArtifact.weight || 'Catalog Metric'}</span>
                </div>
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C]">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Discovered / Date</span>
                  <span className="font-bold text-[#E0D8D0] block mt-0.5">{currentArtifact.dateDiscovered}</span>
                </div>
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C] col-span-2">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Excavated / Discovered By</span>
                  <span className="font-bold text-[#E0D8D0] block mt-0.5">{currentArtifact.discoveredBy || 'Imperial Antiquities Commission'}</span>
                </div>
                <div className="bg-[#15130F] p-3 rounded-xl border border-[#25221C] col-span-2">
                  <span className="text-[10px] font-mono text-[#8E867C] block uppercase">Discovery Date & Location</span>
                  <span className="text-[#CCC2B8] block text-[11px] mt-0.5 leading-relaxed">
                    Uncovered on {currentArtifact.dateDiscovered} ({currentArtifact.origin}).
                  </span>
                  <button
                    id="provenance-plaque-btn"
                    onClick={() => {
                      setShowProvenanceMap(prev => !prev);
                      playSound('click');
                    }}
                    className="mt-2.5 w-full py-2 px-3 rounded-lg bg-[#221A11] hover:bg-[#322515] border border-[#D97706]/40 text-amber-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    <span>{showProvenanceMap ? 'Hide Provenance Map' : 'Trace Journey to Present on Map'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Diagnostic Diagnostic Features Checklist */}
            <div className="space-y-2 pt-1 border-t border-[#2A261D]">
              <span className="text-[10px] font-mono text-[#8E867C] uppercase font-bold tracking-wider block">
                Diagnostic Curatorial Hallmarks:
              </span>
              <div className="space-y-1.5">
                {currentArtifact.keyFeatures.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#CCC2B8] bg-[#12100C] p-2 rounded-lg border border-[#201E19]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Museum Accession Footer Link */}
            {currentArtifact.currentLocation.websiteUrl && (
              <a
                href={currentArtifact.currentLocation.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#181510] hover:bg-[#201C14] border border-[#D4AF37]/35 text-[#D4AF37] hover:text-[#FFF5B8] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Official Catalog at {currentArtifact.currentLocation.museum}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Historical Dossier, Significance, Origin, & Current Housing */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Identification Block */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#221D12] border border-[#D4AF37]/50 text-[#D4AF37] rounded-xl text-xs font-bold font-mono">
                {currentArtifact.category}
              </span>
              <span className="px-3 py-1 bg-[#161616] border border-[#2A2A2A] text-[#E0D8D0] rounded-xl text-xs font-mono">
                {currentArtifact.era} ({currentArtifact.periodYear})
              </span>
              <span className="text-xs text-[#A09890] flex items-center gap-1 font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {currentArtifact.origin}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif italic font-black text-white tracking-tight">
              {currentArtifact.name}
            </h1>

            <p className="text-sm text-[#D4AF37] font-serif italic leading-relaxed">
              "{currentArtifact.subtitle}"
            </p>
          </div>

          {/* Action Row: Bookmark, Add Note, Provenance Toggle, Compare, Scholar Deep Dive, Citation */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              id="bookmark-current-artifact-btn"
              onClick={handleBookmarkToggle}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-sm ${
                isBookmarked
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#16130E] text-[#A09890] border-[#2A2A2A] hover:text-white hover:border-[#D4AF37]/40'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>{isBookmarked ? 'Bookmarked in Vault' : 'Bookmark Artifact'}</span>
            </button>

            {/* Provenance Toggle Button */}
            <button
              id="provenance-toggle-btn"
              onClick={() => {
                setShowProvenanceMap((prev) => !prev);
                playSound('click');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-sm ${
                showProvenanceMap
                  ? 'bg-[#D97706] text-black border-[#D97706] ring-2 ring-[#D97706]/40'
                  : 'bg-[#1D1710] hover:bg-[#281F13] text-amber-300 hover:text-white border-[#D97706]/40'
              }`}
              title="Reveal discovery site and current museum location on interactive mini-map overlay"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{showProvenanceMap ? 'Hide Provenance' : 'Provenance Toggle'}</span>
            </button>

            {/* Compare Button */}
            <button
              id="daily-artifact-compare-btn"
              onClick={() => {
                setIsCompareOpen(true);
                playSound('click');
              }}
              className="px-4 py-2 bg-[#1C1710] hover:bg-[#D4AF37] border border-[#D4AF37]/50 text-[#D4AF37] hover:text-black rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="Compare side-by-side with similar object from vaults"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare</span>
            </button>

            <button
              id="note-current-artifact-btn"
              onClick={() => setIsAddingNote(!isAddingNote)}
              className="px-4 py-2 bg-[#16130E] hover:bg-[#201B13] border border-[#2A2A2A] hover:border-[#D4AF37]/40 text-[#A09890] hover:text-[#D4AF37] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Feather className="w-3.5 h-3.5" />
              <span>+ Study Note</span>
            </button>

            {onNavigateToScholar && (
              <button
                id="scholar-deepdive-artifact-btn"
                onClick={handleScholarDeepDive}
                className="px-4 py-2 bg-[#201A10] hover:bg-[#D4AF37] border border-[#D4AF37]/40 text-[#D4AF37] hover:text-black rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Scholar Analysis</span>
              </button>
            )}

            <button
              id="cite-artifact-btn"
              onClick={handleCopyCitation}
              className="px-3 py-2 bg-[#141414] hover:bg-[#202020] border border-[#2A2A2A] text-[#A09890] hover:text-white rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1 ml-auto"
              title="Copy Academic Citation"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Cite'}</span>
            </button>
          </div>

          {/* Quick Note Input Drawer */}
          {isAddingNote && (
            <div className="bg-[#16130E] border border-[#D4AF37]/40 rounded-2xl p-4 space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs text-[#D4AF37] font-mono font-bold">
                <span>Save Note for: {currentArtifact.name}</span>
                <button
                  onClick={() => setIsAddingNote(false)}
                  className="text-[#8E867C] hover:text-white"
                >
                  Cancel
                </button>
              </div>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Record scholarly reflections, numismatic notes, or lecture insights..."
                className="w-full h-24 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                onClick={handleSaveNote}
                className="w-full py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:brightness-105 transition-all shadow"
              >
                Save to My History Notebook
              </button>
            </div>
          )}

          {/* Dossier Navigation Tab Bar */}
          <div className="bg-[#12110E] border border-[#2A2A2A] p-1 rounded-2xl flex flex-wrap gap-1 shadow-md">
            <button
              id="tab-bio"
              onClick={() => setActiveDossierTab('biography')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDossierTab === 'biography'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Biography & Recovery
            </button>
            <button
              id="tab-context"
              onClick={() => setActiveDossierTab('context')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDossierTab === 'context'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" /> Historical Context
            </button>
            <button
              id="tab-significance"
              onClick={() => setActiveDossierTab('significance')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDossierTab === 'significance'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" /> World Significance
            </button>
            <button
              id="tab-museum"
              onClick={() => setActiveDossierTab('museum')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDossierTab === 'museum'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" /> Where Housed
            </button>
            <button
              id="tab-craft"
              onClick={() => setActiveDossierTab('craft')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDossierTab === 'craft'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" /> Features & Craft
            </button>
            <button
              id="tab-facts"
              onClick={() => setActiveDossierTab('facts')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDossierTab === 'facts'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Fun Facts ({currentArtifact.funFacts.length})
            </button>
            <button
              id="tab-provenance"
              onClick={() => {
                setActiveDossierTab('provenance');
                playSound('click');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDossierTab === 'provenance'
                  ? 'bg-[#D97706] text-black shadow font-bold'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" /> Provenance Journey
            </button>
          </div>

          {/* Dossier Content Body */}
          <div className="bg-[#12100D] border border-[#2A2A2A] rounded-2xl p-6 shadow-xl space-y-4">
            {/* 1. Biography & Recovery Tab */}
            {activeDossierTab === 'biography' && (
              <div className="space-y-3">
                <h4 className="font-serif italic font-bold text-[#E5C158] text-lg flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#D4AF37]" /> Historical Biography & Discovery
                </h4>
                <p className="text-xs sm:text-sm text-[#CCC2B8] leading-relaxed font-sans whitespace-pre-line">
                  {currentArtifact.biography}
                </p>
              </div>
            )}

            {/* 2. Historical Context Tab */}
            {activeDossierTab === 'context' && (
              <div className="space-y-3">
                <h4 className="font-serif italic font-bold text-[#E5C158] text-lg flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#D4AF37]" /> Civilizational Epoch & Context
                </h4>
                <p className="text-xs sm:text-sm text-[#CCC2B8] leading-relaxed font-sans whitespace-pre-line">
                  {currentArtifact.historicalContext}
                </p>
                <div className="bg-[#181510] border border-[#2A2A2A] rounded-xl p-3.5 text-xs text-[#A09890]">
                  <strong className="text-[#D4AF37] block mb-1">Geopolitical Origin:</strong>
                  {currentArtifact.origin} ({currentArtifact.region})
                </div>
              </div>
            )}

            {/* 3. Significance Tab */}
            {activeDossierTab === 'significance' && (
              <div className="space-y-3">
                <h4 className="font-serif italic font-bold text-[#E5C158] text-lg flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#D4AF37]" /> Enduring Significance to World History & Culture
                </h4>
                <p className="text-xs sm:text-sm text-[#CCC2B8] leading-relaxed font-sans whitespace-pre-line">
                  {currentArtifact.significance}
                </p>
              </div>
            )}

            {/* 4. Current Museum Housing Tab */}
            {activeDossierTab === 'museum' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif italic font-bold text-[#E5C158] text-lg flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#D4AF37]" /> Current Housing & Museum Display
                  </h4>
                  {currentArtifact.currentLocation.websiteUrl && (
                    <a
                      href={currentArtifact.currentLocation.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      Official Collection Link <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="bg-[#181510] border border-[#D4AF37]/30 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] text-[#A09890] uppercase font-bold tracking-wider">
                        Institution:
                      </span>
                      <h5 className="font-serif font-bold text-base text-white">
                        {currentArtifact.currentLocation.museum}
                      </h5>
                      <p className="text-xs text-[#A09890]">
                        {currentArtifact.currentLocation.city}, {currentArtifact.currentLocation.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] text-[#A09890] uppercase font-bold tracking-wider">
                        Catalog / Accession:
                      </span>
                      <p className="font-mono text-xs font-bold text-[#D4AF37]">
                        {currentArtifact.currentLocation.accessionNumber}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#2A2A2A] pt-2 text-xs text-[#CCC2B8] space-y-1">
                    <p>
                      <strong className="text-[#D4AF37]">Gallery & Location:</strong>{' '}
                      {currentArtifact.currentLocation.galleryRoom}
                    </p>
                    <p className="text-[#A09890] leading-relaxed">
                      <strong className="text-[#D4AF37]">Visitor & Curatorial Guide:</strong>{' '}
                      {currentArtifact.currentLocation.visitingGuide}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Features & Craftsmanship Tab */}
            {activeDossierTab === 'craft' && (
              <div className="space-y-4">
                <h4 className="font-serif italic font-bold text-[#E5C158] text-lg flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#D4AF37]" /> Key Architectural Features & Metallurgical Craft
                </h4>

                <div className="bg-[#181510] border border-[#2A2A2A] rounded-xl p-3.5 text-xs text-[#CCC2B8]">
                  <strong className="text-[#D4AF37] block mb-1">Craftsmanship Technique:</strong>
                  {currentArtifact.craftsmanshipTechnique}
                </div>

                <div className="space-y-2">
                  <h6 className="text-[11px] font-mono uppercase font-bold text-[#A09890] tracking-wider">
                    Diagnostic Key Features:
                  </h6>
                  <ul className="space-y-2 text-xs text-[#CCC2B8]">
                    {currentArtifact.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#16130E] p-2.5 rounded-xl border border-[#222]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 6. Fun Facts Tab */}
            {activeDossierTab === 'facts' && (
              <div className="space-y-4">
                <h4 className="font-serif italic font-bold text-[#E5C158] text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Fascinating Curatorial Quirks & Little-Known Facts
                </h4>
                <div className="space-y-3">
                  {currentArtifact.funFacts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#181510] border border-[#D4AF37]/20 flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-[#CCC2B8] leading-relaxed font-sans">
                        {fact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Provenance & Journey Map Tab */}
            {activeDossierTab === 'provenance' && (
              <div className="space-y-4">
                <ArtifactProvenanceMap
                  artifact={currentArtifact}
                  isOverlay={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Full Wonder & Artifacts Paginated Catalog System */}
      <div className="pt-8 border-t border-[#2A241A] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" /> Complete Relic Gallery
            </span>
            <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-white">
              Wonders & Curatorial Artifacts Archive
            </h3>
            <p className="text-xs text-[#A09890]">
              Browse the global artifact catalog page-by-page. Select any artifact to dive directly into its curatorial dossier.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#888]" />
              <input
                type="text"
                value={gallerySearch}
                onChange={(e) => {
                  setGallerySearch(e.target.value);
                  setGalleryPage(1);
                }}
                placeholder="Search artifacts or museum..."
                className="pl-8.5 pr-3 py-1.5 bg-[#12100C] text-xs text-white border border-[#2E271D] rounded-xl focus:outline-none focus:border-[#D4AF37] w-48 sm:w-60 font-sans"
              />
            </div>

            <select
              value={galleryEra}
              onChange={(e) => {
                setGalleryEra(e.target.value);
                setGalleryPage(1);
              }}
              aria-label="Filter artifacts by historical era"
              className="bg-[#12100C] text-xs text-[#CCC2B8] border border-[#2E271D] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
            >
              {uniqueEras.map(era => (
                <option key={era} value={era}>{era === 'All' ? 'All Eras' : era}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Pagination Controls */}
        <PaginationControls
          currentPage={galleryPage}
          totalPages={totalGalleryPages}
          totalItems={filteredGalleryArtifacts.length}
          itemsPerPage={galleryItemsPerPage}
          onPageChange={(page) => {
            setGalleryPage(page);
            playSound('click');
          }}
          onItemsPerPageChange={(num) => {
            setGalleryItemsPerPage(num);
            setGalleryPage(1);
            playSound('click');
          }}
          itemsPerPageOptions={[12, 24, 48]}
          itemLabel="artifacts"
        />

        {/* Paginated Artifacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedGalleryArtifacts.map((art) => {
            const isSelected = art.id === currentArtifact.id;
            return (
              <div
                key={art.id}
                onClick={() => {
                  setSelectedArtifactId(art.id);
                  playSound('click');
                  document.getElementById('daily-artifact-full-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between text-left group relative ${
                  isSelected
                    ? 'bg-[#1C170E] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]/40'
                    : 'bg-[#110E0A] hover:bg-[#18140E] border-[#2E271D] hover:border-[#D4AF37]/50'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-bold">
                      {art.era.split('(')[0].trim()}
                    </span>
                    <span className="text-[10px] font-mono text-[#888]">
                      {art.periodYear}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif italic font-bold text-base text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {art.name}
                    </h4>
                    <p className="text-[11px] text-[#A09890] line-clamp-2 mt-1 font-sans">
                      {art.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#221D15] text-[11px] text-[#7A7065] space-y-1 font-mono">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{art.origin}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Landmark className="w-3 h-3 text-[#A09890] shrink-0" />
                      <span className="truncate">{art.currentLocation.museum}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#221D15] flex items-center justify-between text-xs">
                  <span className={`font-mono text-[10px] font-bold uppercase ${isSelected ? 'text-[#D4AF37]' : 'text-[#888] group-hover:text-[#D4AF37]'}`}>
                    {isSelected ? '★ Active Specimen' : 'Dive into Dossier ›'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#D4AF37]' : 'text-[#666] group-hover:text-[#D4AF37] group-hover:translate-x-1'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination Controls */}
        <PaginationControls
          currentPage={galleryPage}
          totalPages={totalGalleryPages}
          totalItems={filteredGalleryArtifacts.length}
          itemsPerPage={galleryItemsPerPage}
          onPageChange={(page) => {
            setGalleryPage(page);
            playSound('click');
            document.getElementById('daily-artifact-full-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          onItemsPerPageChange={(num) => {
            setGalleryItemsPerPage(num);
            setGalleryPage(1);
            playSound('click');
          }}
          itemsPerPageOptions={[12, 24, 48]}
          itemLabel="artifacts"
        />
      </div>

      {/* Visual History Carousel Section */}
      <VisualHistoryCarousel
        selectedArtifact={currentArtifact}
        onSelectArtifact={(artId) => {
          setSelectedArtifactId(artId);
          playSound('click');
          document.getElementById('daily-artifact-full-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onAddNote={onAddNote}
      />

      {/* Cross-Civilizational Compare Modal */}
      <ArtifactCompareModal
        artifact={currentArtifact}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelectArtifact={(artId) => {
          setSelectedArtifactId(artId);
          playSound('click');
          document.getElementById('daily-artifact-full-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
    </div>
  );
}
