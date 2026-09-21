import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Star, 
  BookOpen, 
  Plus, 
  Compass, 
  X, 
  Building2, 
  Layers, 
  ShieldCheck, 
  Info,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ScrollText,
  Eye,
  ExternalLink
} from 'lucide-react';
import { WorldMonumentOrArtifact, Bookmark } from '../types';
import { ALL_WORLD_MONUMENTS, MONUMENT_CATEGORIES, MONUMENT_REGIONS } from '../data/monuments';
import { playSound } from '../utils/audio';
import PaginationControls from './PaginationControls';

interface WorldMonumentsSectionProps {
  onAddNote?: (title: string, content: string, type: any, targetId?: string) => void;
  bookmarks?: Bookmark[];
  onToggleBookmark?: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
}

export default function WorldMonumentsSection({
  onAddNote,
  bookmarks = [],
  onToggleBookmark
}: WorldMonumentsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deepDiveMode, setDeepDiveMode] = useState<boolean>(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(36);

  // Element references for each card so we can preserve and restore scroll position precisely
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedRegion]);

  // Helper to determine if an entry is an ancient artifact or historical relic (Zero images rendered)
  const isArtifact = (item: WorldMonumentOrArtifact): boolean => {
    const cat = (item.category || '').toLowerCase();
    return (
      cat.includes('artifact') || 
      cat.includes('relic') ||
      item.tags.some(t => t.toLowerCase().includes('artifact') || t.toLowerCase().includes('relic'))
    );
  };

  // Helper for antique emblem icon for artifacts
  const getArtifactEmblem = (item: WorldMonumentOrArtifact): string => {
    const name = item.name.toLowerCase();
    if (name.includes('mask') || name.includes('crown') || name.includes('gold')) return '👑';
    if (name.includes('stone') || name.includes('stele') || name.includes('tablet') || name.includes('obelisk')) return '🗿';
    if (name.includes('scroll') || name.includes('cylinder') || name.includes('papyrus') || name.includes('codex') || name.includes('charter') || name.includes('treaty')) return '📜';
    if (name.includes('sword') || name.includes('dagger') || name.includes('shield') || name.includes('helm') || name.includes('armor') || name.includes('lance')) return '⚔️';
    if (name.includes('coin') || name.includes('hoard') || name.includes('silver') || name.includes('electrum') || name.includes('drachma')) return '🪙';
    if (name.includes('mechanism') || name.includes('astrolabe') || name.includes('clock') || name.includes('compass') || name.includes('computer')) return '⚙️';
    if (name.includes('dragon') || name.includes('seal') || name.includes('warrior')) return '🐉';
    if (name.includes('sun') || name.includes('calendar') || name.includes('disk')) return '☀️';
    if (name.includes('vase') || name.includes('urn') || name.includes('pot') || name.includes('amphora')) return '🏺';
    return '🏺';
  };

  // Helper for architectural emblem icon for buildings / monuments
  const getBuildingEmblem = (item: WorldMonumentOrArtifact): string => {
    const cat = (item.category || '').toLowerCase();
    const name = (item.name || '').toLowerCase();
    if (cat.includes('temple') || name.includes('temple') || name.includes('pagoda') || name.includes('shrine') || name.includes('pantheon')) return '⛩️';
    if (cat.includes('mosque') || name.includes('mosque') || name.includes('masjid')) return '🕌';
    if (cat.includes('cathedral') || cat.includes('basilica') || name.includes('church') || name.includes('cathedral') || name.includes('abbey') || name.includes('duomo')) return '⛪';
    if (cat.includes('palace') || cat.includes('fortress') || name.includes('castle') || name.includes('palace') || name.includes('citadel') || name.includes('kremlin') || name.includes('alcazar')) return '🏰';
    if (cat.includes('pyramid') || name.includes('pyramid') || name.includes('ziggurat')) return '🏛️';
    if (cat.includes('tower') || name.includes('tower') || name.includes('minaret') || name.includes('needle') || name.includes('colosseum') || name.includes('amphitheatre')) return '🗼';
    if (cat.includes('megalith') || name.includes('stone') || name.includes('henge') || name.includes('moai')) return '🗿';
    if (cat.includes('tomb') || cat.includes('mausoleum') || name.includes('mausoleum') || name.includes('tomb')) return '🏛️';
    if (cat.includes('bridge') || name.includes('bridge') || name.includes('aqueduct')) return '🌉';
    return '🏛️';
  };

  // Safe Wikipedia URL helper
  const getWikiLink = (item: WorldMonumentOrArtifact): string => {
    if (item.wikipediaUrl) return item.wikipediaUrl;
    const cleanName = encodeURIComponent(item.name.replace(/\s+/g, '_'));
    return `https://en.wikipedia.org/wiki/${cleanName}`;
  };

  // Filter monuments by search, category, and region
  const filteredMonuments = useMemo(() => {
    return ALL_WORLD_MONUMENTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }
      // Region filter
      if (selectedRegion !== 'All Regions' && item.region !== selectedRegion) {
        return false;
      }
      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        (item.nativeOrAlternateName && item.nativeOrAlternateName.toLowerCase().includes(q)) ||
        item.country.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.architectOrCreator.toLowerCase().includes(q) ||
        item.architecturalStyle.toLowerCase().includes(q) ||
        item.materialsUsed.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory, selectedRegion]);

  // Calculate total pages and paginated monuments
  const totalPages = Math.ceil(filteredMonuments.length / itemsPerPage);

  const paginatedMonuments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMonuments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMonuments, currentPage, itemsPerPage]);

  // Open Deep Dive in its own place
  const handleOpenDeepDive = (id: string) => {
    setExpandedId(id);
    playSound('stoneClick');

    // Smoothly scroll to this item right in its place
    setTimeout(() => {
      const el = cardRefs.current[id];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Navigate to adjacent items in Deep Dive mode
  const handleNavigateDeepDive = (direction: 'prev' | 'next') => {
    if (!expandedId) return;
    const idx = filteredMonuments.findIndex(m => m.id === expandedId);
    if (idx === -1) return;
    const targetIdx = direction === 'prev' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= filteredMonuments.length) return;
    const targetItem = filteredMonuments[targetIdx];
    const targetPage = Math.floor(targetIdx / itemsPerPage) + 1;
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
    }
    handleOpenDeepDive(targetItem.id);
  };

  // Close Deep Dive and return the user precisely to where they closed it
  const handleCloseDeepDive = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedId(null);
    playSound('click');

    // Make sure when user closes it, the user reaches where he closed
    setTimeout(() => {
      const el = cardRefs.current[id];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some(b => b.targetId === id);
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-br from-[#0F0F0F] via-[#16130C] to-[#0A0A0A] border border-[#382E1E] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#996515]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1F190D] border border-[#D4AF37]/50 rounded-full text-[11px] font-mono font-bold text-[#E5C158] uppercase tracking-widest shadow-inner">
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Global Heritage Repository
            </span>
            <span className="text-[11px] font-mono text-[#A09890]">
              {ALL_WORLD_MONUMENTS.length} Curated Masterpieces
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif italic font-bold tracking-tight text-[#E5C158]">
            World Most Famous Buildings, Marvels & Antiquities
          </h2>
          <p className="text-xs sm:text-sm text-[#BDB5A9] leading-relaxed font-sans max-w-4xl">
            Explore {ALL_WORLD_MONUMENTS.length}+ globally renowned architectural wonders, sacred temples, imperial palaces, and ancient historical relics. All artifacts feature dedicated museum relic records, verified Wikipedia scholarship links, structural metrics, authentic history, and in-place deep-dive dossiers.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-5 shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#A09890]" />
            <input
              type="text"
              placeholder="Search monuments, artifacts, architects, materials, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#151515] text-[#E0D8D0] border border-[#2E2E2E] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-[#A09890] hover:text-[#D4AF37] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Select */}
          <div className="md:col-span-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full py-2.5 px-3 text-xs sm:text-sm bg-[#151515] text-[#E5C158] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-[#D4AF37] font-mono cursor-pointer"
            >
              {MONUMENT_REGIONS.map(reg => (
                <option key={reg} value={reg} className="bg-[#151515] text-[#E0D8D0]">
                  🌍 {reg}
                </option>
              ))}
            </select>
          </div>

          {/* Category Select */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2.5 px-3 text-xs sm:text-sm bg-[#151515] text-[#E5C158] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-[#D4AF37] font-mono cursor-pointer"
            >
              {MONUMENT_CATEGORIES.map(cat => (
                <option key={cat} value={cat} className="bg-[#151515] text-[#E0D8D0]">
                  🏛️ {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Active Category Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#1C1C1C]">
          <span className="text-[11px] font-mono text-[#8A8070] mr-2 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> POPULAR CLUSTERS:
          </span>
          {MONUMENT_CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                playSound('click');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#E5C158] text-black font-bold border-[#E5C158] shadow-md'
                  : 'bg-[#141414] text-[#A09890] border-[#262626] hover:text-[#E5C158] hover:border-[#D4AF37]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Current Filter State */}
      <div className="flex items-center justify-between text-xs font-mono text-[#A09890] flex-wrap gap-2">
        <span>
          Showing <strong className="text-[#E5C158]">{filteredMonuments.length}</strong> of {ALL_WORLD_MONUMENTS.length} Historical Marvels (Page {currentPage} of {Math.max(1, totalPages)})
        </span>
        {(selectedCategory !== 'All Categories' || selectedRegion !== 'All Regions' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All Categories');
              setSelectedRegion('All Regions');
              setSearchQuery('');
            }}
            className="text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Reset Filters
          </button>
        )}
      </div>

      {/* Top Pagination Bar */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredMonuments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(num) => {
          setItemsPerPage(num);
          setCurrentPage(1);
        }}
        itemsPerPageOptions={[24, 36, 72, 120]}
        itemLabel="wonders & antiquities"
        compact={true}
      />

      {/* 330+ Monuments Responsive Grid with In-Place Deep Dive Expansion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {paginatedMonuments.map((item) => {
          const isItemArtifact = isArtifact(item);
          const bookmarked = isBookmarked(item.id);
          const isExpanded = expandedId === item.id;
          const wikiUrl = getWikiLink(item);

          // When expanded in place, span the entire width of the grid row right at that spot
          return (
            <div
              key={item.id}
              ref={(el) => { cardRefs.current[item.id] = el; }}
              className={`transition-all duration-300 ${
                isExpanded 
                  ? 'col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4' 
                  : 'col-span-1'
              }`}
            >
              {isExpanded ? (
                /* ========================================================================= */
                /* IN-PLACE EXPANDED DEEP DIVE DOSSIER (Opens directly in its own place!) */
                /* ========================================================================= */
                <div className="bg-[#0F0D09] border-2 border-[#D4AF37] rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden animate-fade-in">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Header Bar with Next / Prev Dive Navigation and Close Button */}
                  <div className="flex items-center justify-between border-b border-[#2C2314] pb-4 flex-wrap gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-[#231A0C] border border-[#D4AF37]/60 rounded-full text-xs font-mono font-bold text-[#F4D068] flex items-center gap-1.5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} /> Deep Dive Dossier
                      </span>
                      <span className="px-3 py-1 bg-black/60 border border-white/10 rounded-full text-xs font-mono text-[#D8D0C5]">
                        {item.category}
                      </span>
                      <span className="px-3 py-1 bg-black/60 border border-white/10 rounded-full text-xs font-mono text-[#A09890]">
                        {item.region}
                      </span>
                      {item.unescoStatus && (
                        <span className="px-3 py-1 bg-amber-950/70 border border-amber-500/40 rounded-full text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> {item.unescoStatus}
                        </span>
                      )}
                    </div>

                    {/* Dive Page Navigation Controls (Next Page / Item System) */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1 bg-[#15120B] border border-[#D4AF37]/40 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => handleNavigateDeepDive('prev')}
                          className="px-2.5 py-1 text-xs font-mono font-bold text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                          title="Previous Wonder / Artifact"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Prev Wonder</span>
                        </button>
                        <span className="text-[10px] font-mono text-[#8E867C] px-2 font-bold border-x border-[#2A2315]">
                          {filteredMonuments.findIndex(m => m.id === item.id) + 1} / {filteredMonuments.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleNavigateDeepDive('next')}
                          className="px-2.5 py-1 text-xs font-mono font-bold text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                          title="Next Wonder / Artifact"
                        >
                          <span className="hidden sm:inline">Next Wonder</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <a
                        href={wikiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-[#1C160B] hover:bg-[#2C2210] text-[#E5C158] border border-[#D4AF37]/50 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                        title="Open official Wikipedia page in a new tab"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Wikipedia ↗</span>
                      </a>
                      <button
                        onClick={(e) => handleCloseDeepDive(item.id, e)}
                        className="px-4 py-2 bg-[#1C160B] hover:bg-[#D4AF37] text-[#E5C158] hover:text-black border border-[#D4AF37]/50 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                        title="Close Deep Dive and stay right at this card"
                      >
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span>Close Deep Dive</span>
                      </button>
                    </div>
                  </div>

                  {/* Visual Header: NO images! Archival Seal Plaque for artifacts; Blueprint Ledger for buildings */}
                  {isItemArtifact ? (
                    <div className="p-6 sm:p-8 bg-gradient-to-r from-[#1C160B] via-[#261D0F] to-[#120E07] border border-[#3E2F16] rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-inner">
                      {/* Antique Relic Seal Emblem */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#382810] via-[#523B17] to-[#171107] border-2 border-[#E5C158] flex items-center justify-center text-4xl sm:text-5xl shadow-2xl shrink-0">
                        {getArtifactEmblem(item)}
                      </div>

                      <div className="space-y-1.5 text-center md:text-left flex-1">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                          <span className="px-2.5 py-0.5 bg-[#2A1D0B] border border-[#D4AF37]/70 text-[#F4D068] text-[10px] font-mono font-bold rounded-md">
                            🏺 ANCIENT HISTORICAL RELIC
                          </span>
                          <span className="text-xs font-mono text-[#C0B8AD]">
                            Excavation / Origin: {item.location}, {item.country}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-white tracking-tight">
                          {item.name}
                        </h2>
                        {item.nativeOrAlternateName && (
                          <p className="text-xs sm:text-sm font-mono text-[#D4AF37] italic">
                            {item.nativeOrAlternateName}
                          </p>
                        )}
                        <p className="text-xs text-[#C8C0B2] font-sans pt-1 leading-relaxed">
                          Archival Artifact Record • Materials: <strong className="text-[#E5C158]">{item.materialsUsed}</strong> • Epoch: <strong className="text-[#E5C158]">{item.era}</strong>
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Architectural Blueprint / Elevation Ledger Header (Zero Images!) */
                    <div className="p-6 sm:p-8 bg-gradient-to-r from-[#14120D] via-[#1F190E] to-[#0E0C08] border border-[#3E2F16] rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-inner">
                      {/* Blueprint Grid Overlay */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                      {/* Architectural Style Emblem */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#2D210F] via-[#483416] to-[#140E06] border-2 border-[#D4AF37] flex items-center justify-center text-4xl sm:text-5xl shadow-2xl shrink-0">
                        {getBuildingEmblem(item)}
                      </div>

                      <div className="space-y-1.5 text-center md:text-left flex-1 relative z-10">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                          <span className="px-2.5 py-0.5 bg-[#2A1D0B] border border-[#D4AF37]/70 text-[#F4D068] text-[10px] font-mono font-bold rounded-md">
                            🏛️ ARCHITECTURAL WONDER & MASTERPIECE
                          </span>
                          <span className="text-xs font-mono text-[#C0B8AD]">
                            Location: {item.location}, {item.country}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-white tracking-tight">
                          {item.name}
                        </h2>
                        {item.nativeOrAlternateName && (
                          <p className="text-xs sm:text-sm font-mono text-[#D4AF37] italic">
                            {item.nativeOrAlternateName}
                          </p>
                        )}
                        <p className="text-xs text-[#C8C0B2] font-sans pt-1 leading-relaxed">
                          Architectural Elevation Record • Style: <strong className="text-[#E5C158]">{item.architecturalStyle}</strong> • Constructed: <strong className="text-[#E5C158]">{item.yearBuilt}</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Deep Dive Metadata Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#14110A] border border-[#2B2113] rounded-2xl text-xs font-mono">
                    <div className="space-y-1">
                      <span className="text-[#8C8275] uppercase text-[10px] block">Location</span>
                      <p className="text-[#E0D8D0] font-bold font-sans line-clamp-1">{item.location}</p>
                      <p className="text-[#D4AF37]">{item.country}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#8C8275] uppercase text-[10px] block">Year / Epoch</span>
                      <p className="text-[#E0D8D0] font-bold font-sans">{item.yearBuilt}</p>
                      <p className="text-[#A09890] truncate">{item.era}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#8C8275] uppercase text-[10px] block">{isItemArtifact ? 'Artisan / Civilization' : 'Architect / Builder'}</span>
                      <p className="text-[#E0D8D0] font-bold font-sans line-clamp-2">{item.architectOrCreator}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#8C8275] uppercase text-[10px] block">{isItemArtifact ? 'Relic Classification' : 'Architectural Style'}</span>
                      <p className="text-[#E0D8D0] font-bold font-sans line-clamp-2">{item.architecturalStyle}</p>
                    </div>
                  </div>

                  {/* Dimension & Materials */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#12100A] border border-[#2B2113] rounded-xl space-y-1.5">
                      <h4 className="text-xs font-mono font-bold text-[#E5C158] uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" /> Dimensions & Scale
                      </h4>
                      <p className="text-xs sm:text-sm text-[#B0A89C] leading-relaxed font-sans">
                        {item.dimensionsAndHeight}
                      </p>
                    </div>

                    <div className="p-4 bg-[#12100A] border border-[#2B2113] rounded-xl space-y-1.5">
                      <h4 className="text-xs font-mono font-bold text-[#E5C158] uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-4 h-4" /> Materials Used
                      </h4>
                      <p className="text-xs sm:text-sm text-[#B0A89C] leading-relaxed font-sans">
                        {item.materialsUsed}
                      </p>
                    </div>
                  </div>

                  {/* Complete History and Background */}
                  <div className="space-y-2 p-5 bg-[#12100A] border border-[#261E11] rounded-2xl">
                    <h4 className="text-sm font-mono font-bold text-[#E5C158] uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Complete History & Cultural Context
                    </h4>
                    <p className="text-xs sm:text-sm text-[#C8C0B5] leading-relaxed font-sans font-light">
                      {item.historyAndBackground}
                    </p>
                  </div>

                  {/* Architectural / Artifact Feats */}
                  <div className="space-y-2 p-5 bg-[#12100A] border border-[#261E11] rounded-2xl">
                    <h4 className="text-sm font-mono font-bold text-[#E5C158] uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" /> {isItemArtifact ? 'Craftsmanship & Engineering Feats' : 'Architectural Marvels & Engineering Feats'}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#C8C0B5] leading-relaxed font-sans font-light">
                      {item.architecturalMarvels}
                    </p>
                  </div>

                  {/* Modern Status & Significance */}
                  <div className="space-y-2 p-5 bg-[#12100A] border border-[#261E11] rounded-2xl">
                    <h4 className="text-sm font-mono font-bold text-[#E5C158] uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Modern Status & Global Heritage
                    </h4>
                    <p className="text-xs sm:text-sm text-[#C8C0B5] leading-relaxed font-sans font-light">
                      {item.modernStatusAndSignificance}
                    </p>
                  </div>

                  {/* Key Historical Facts */}
                  <div className="p-5 bg-[#14110A] border border-[#3A2D16] rounded-2xl space-y-3">
                    <h4 className="text-xs font-mono font-bold text-[#E5C158] uppercase tracking-wider flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#D4AF37]" /> Key Historical Facts & Disclosures
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#B8AF9F] font-sans">
                      {item.keyFacts.map((fact, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-[#E5C158] shrink-0 mt-0.5">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Wikipedia Historical Codex & Scholarly Archive Banner */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-[#171107] via-[#1F1608] to-[#120D06] border border-[#D4AF37]/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#2A1E0B] border border-[#D4AF37]/60 flex items-center justify-center text-xl text-[#F3CF65] shrink-0 font-serif font-bold shadow-md">
                        W
                      </div>
                      <div>
                        <h5 className="text-xs font-mono font-bold text-[#F4D068] uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" /> Wikipedia Historical Reference Codex
                        </h5>
                        <p className="text-xs text-[#B5ADA0] font-sans mt-0.5">
                          Access the complete encyclopedia entry, bibliography, archaeological surveys, and citations for <strong className="text-[#E0D8D0]">{item.name}</strong>.
                        </p>
                      </div>
                    </div>
                    <a
                      href={wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#F3CF65] text-black font-mono text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shrink-0 self-stretch sm:self-auto justify-center"
                      title="Open official Wikipedia page in a new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Wikipedia Page ↗</span>
                    </a>
                  </div>

                  {/* Action Footer: Note, Bookmark, Tags & Close */}
                  <div className="pt-4 border-t border-[#261F12] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-[#1A160E] border border-[#2C2314] rounded-md text-[10px] font-mono text-[#A09890]">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                      <a
                        href={wikiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#1B160C] hover:bg-[#D4AF37] text-[#E5C158] hover:text-black border border-[#D4AF37]/60 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                        title="Read full scholarly article on Wikipedia"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Wikipedia Reference ↗</span>
                      </a>

                      {onAddNote && (
                        <button
                          onClick={() => {
                            onAddNote(
                              `Notes on ${item.name}`,
                              `${item.historyAndBackground} Built / Crafted in ${item.yearBuilt} in ${item.location}, ${item.country}.`,
                              'article',
                              item.id
                            );
                            playSound('click');
                          }}
                          className="px-4 py-2 bg-[#1C1811] hover:bg-[#D4AF37] border border-[#D4AF37]/50 text-[#E5C158] hover:text-black rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5" /> Save Note
                        </button>
                      )}

                      {onToggleBookmark && (
                        <button
                          onClick={() => {
                            onToggleBookmark(
                              item.id,
                              'article',
                              item.name,
                              `${item.country} • ${item.yearBuilt}`
                            );
                            playSound('click');
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                            bookmarked
                              ? 'bg-[#E5C158] text-black border-[#E5C158]'
                              : 'bg-[#15120B] text-[#E5C158] border-[#382E1E] hover:border-[#D4AF37]'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${bookmarked ? 'fill-black stroke-black' : ''}`} />
                          <span>{bookmarked ? 'Bookmarked ✓' : 'Bookmark'}</span>
                        </button>
                      )}

                      {/* Explicit In-Place Return Button */}
                      <button
                        onClick={(e) => handleCloseDeepDive(item.id, e)}
                        className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-black rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
                      >
                        <ChevronUp className="w-4 h-4" />
                        <span>Fold Deep Dive</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ========================================================================= */
                /* REGULAR CARD VIEW (In the grid; click to open Deep Dive in its own place) */
                /* ========================================================================= */
                <div
                  onClick={() => handleOpenDeepDive(item.id)}
                  className={`group bg-[#0F0F0F] border hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1 ${
                    deepDiveMode ? 'border-[#3D3018] bg-[#12100A]' : 'border-[#242424]'
                  }`}
                >
                  {/* Visual Preview Header: NO IMAGE FOR ARTIFACTS! (Museum Relic Ledger) */}
                  {isItemArtifact ? (
                    <div className="relative h-48 w-full bg-gradient-to-br from-[#1C160B] via-[#120F08] to-[#0A0805] p-4 flex flex-col justify-between overflow-hidden border-b border-[#2C2110]">
                      {/* Antique Watermark Grid */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                      {/* Top Badges */}
                      <div className="flex items-center justify-between relative z-10">
                        <span className="px-2.5 py-0.5 bg-[#2A1D0B] border border-[#D4AF37]/50 rounded-md text-[10px] font-mono text-[#F4D068] font-bold shadow-sm flex items-center gap-1">
                          <span>🏺</span> Relic Artifact
                        </span>
                        <span className="px-2 py-0.5 bg-black/75 border border-white/10 rounded-md text-[10px] font-mono text-[#A09890]">
                          {item.region}
                        </span>
                      </div>

                      {/* Center Relic Emblem & Material Seal */}
                      <div className="my-auto text-center relative z-10 py-1">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2A1E0B] via-[#4A3816] to-[#E5C158]/30 border border-[#D4AF37]/60 shadow-lg mb-1.5 text-2xl group-hover:scale-110 transition-transform">
                          {getArtifactEmblem(item)}
                        </div>
                        <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest truncate px-2">
                          {item.materialsUsed.split(',')[0]}
                        </p>
                      </div>

                      {/* Year Built & Era Stamp */}
                      <div className="flex items-center justify-between relative z-10 text-[10px] font-mono text-[#E5C158] pt-1 border-t border-[#2A2012]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#D4AF37]" /> {item.yearBuilt}
                        </span>
                        <span className="text-[#8C8275] text-[9px] uppercase tracking-wider">
                          Ancient Relic
                        </span>
                      </div>

                      {/* Top Action Buttons (Wikipedia & Bookmark) */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-20">
                        <a
                          href={wikiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1.5 rounded-xl bg-black/80 hover:bg-[#D4AF37] text-[#F3CF65] hover:text-black border border-[#D4AF37]/50 backdrop-blur-md text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer shadow-md"
                          title="Open official Wikipedia page in a new tab"
                        >
                          <BookOpen className="w-3 h-3 text-[#D4AF37]" />
                          <span>Wikipedia ↗</span>
                        </a>

                        {onToggleBookmark && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(item.id, 'article', item.name, `${item.country} • ${item.yearBuilt}`);
                              playSound('click');
                            }}
                            className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                              bookmarked 
                                ? 'bg-[#E5C158] text-black shadow-md' 
                                : 'bg-black/60 text-[#C0B8AD] hover:text-[#E5C158] hover:bg-black/80'
                            }`}
                            title={bookmarked ? 'Remove Bookmark' : 'Bookmark Artifact'}
                          >
                            <Star className={`w-3.5 h-3.5 ${bookmarked ? 'fill-black stroke-black' : ''}`} />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Architectural Blueprint / Elevation Ledger Header (Zero Images!) */
                    <div className="relative h-48 w-full bg-gradient-to-br from-[#18140E] via-[#100D09] to-[#0A0805] p-4 flex flex-col justify-between overflow-hidden border-b border-[#2C2110]">
                      {/* Geometric grid blueprint background */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                      {/* Header row with tags */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 bg-black/80 border border-[#D4AF37]/50 rounded-md text-[10px] font-mono text-[#E5C158] font-bold shadow-sm">
                            {item.region}
                          </span>
                          <span className="px-2 py-0.5 bg-[#20190D]/90 border border-[#D4AF37]/30 rounded-md text-[9px] font-mono text-[#D0C8BF] font-semibold">
                            {item.category.split(' ')[0]}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#998F82]">
                          Archival Wonder
                        </span>
                      </div>

                      {/* Center Architectural Emblem */}
                      <div className="relative z-10 flex items-center gap-3 my-auto">
                        <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#2D210F] via-[#3E2D14] to-[#120D06] border border-[#D4AF37]/60 flex items-center justify-center text-2xl shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                          {getBuildingEmblem(item)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block font-bold truncate">
                            {item.architecturalStyle.split(';')[0]}
                          </span>
                          <p className="text-xs font-sans text-[#E0D8CE] font-semibold truncate">
                            {item.architectOrCreator}
                          </p>
                          <p className="text-[10px] font-mono text-[#A09890] truncate">
                            {item.materialsUsed}
                          </p>
                        </div>
                      </div>

                      {/* Footer row with Year Built & Action Buttons */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="px-2.5 py-1 bg-[#100D07]/90 border border-[#3D3018] rounded-md text-[10px] font-mono font-bold text-[#F4D068] flex items-center gap-1 shadow-md">
                          <Calendar className="w-3 h-3 text-[#D4AF37]" /> {item.yearBuilt}
                        </span>

                        <div className="flex items-center gap-1.5 z-20">
                          <a
                            href={wikiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-1.5 rounded-xl bg-black/80 hover:bg-[#D4AF37] text-[#F3CF65] hover:text-black border border-[#D4AF37]/50 backdrop-blur-md text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer shadow-md"
                            title="Open official Wikipedia page in a new tab"
                          >
                            <BookOpen className="w-3 h-3 text-[#D4AF37]" />
                            <span>Wikipedia ↗</span>
                          </a>

                          {onToggleBookmark && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleBookmark(item.id, 'article', item.name, `${item.country} • ${item.yearBuilt}`);
                                playSound('click');
                              }}
                              className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                                bookmarked 
                                  ? 'bg-[#E5C158] text-black shadow-md' 
                                  : 'bg-black/60 text-[#C0B8AD] hover:text-[#E5C158] hover:bg-black/80'
                              }`}
                              title={bookmarked ? 'Remove Bookmark' : 'Bookmark Monument'}
                            >
                              <Star className={`w-3.5 h-3.5 ${bookmarked ? 'fill-black stroke-black' : ''}`} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#998F82]">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{item.location}, {item.country}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-serif italic font-bold text-[#E5C158] group-hover:text-[#FFF] transition-colors line-clamp-1">
                        {item.name}
                      </h3>

                      {item.nativeOrAlternateName && (
                        <p className="text-[11px] font-mono text-[#80776C] italic line-clamp-1">
                          {item.nativeOrAlternateName}
                        </p>
                      )}

                      <p className="text-xs text-[#A89E90] line-clamp-2 leading-relaxed font-sans pt-1">
                        {item.historyAndBackground}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1F1F1F] flex items-center justify-between text-[11px] font-mono gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[#A09890] truncate max-w-[120px]">
                          {isItemArtifact ? '🏺 Ancient Relic' : `🏛️ ${item.architecturalStyle.split(';')[0]}`}
                        </span>
                        <a
                          href={wikiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 bg-[#231A0C] hover:bg-[#D4AF37] text-[#F4D068] hover:text-black border border-[#D4AF37]/60 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 shadow-sm"
                          title="Open official Wikipedia page in a new tab"
                        >
                          <BookOpen className="w-3 h-3 text-[#D4AF37]" />
                          <span>Wikipedia ↗</span>
                        </a>
                      </div>
                      <span className="text-[#D4AF37] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold shrink-0">
                        Deep Dive <ChevronDown className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredMonuments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(num) => {
          setItemsPerPage(num);
          setCurrentPage(1);
        }}
        itemsPerPageOptions={[24, 36, 72, 120]}
        itemLabel="wonders & antiquities"
      />
    </div>
  );
}
