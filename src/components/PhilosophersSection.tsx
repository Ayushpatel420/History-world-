import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  BookOpen, 
  Quote, 
  Compass, 
  MapPin, 
  Calendar, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  HelpCircle,
  Award,
  Layers,
  CheckCircle,
  FileText,
  Skull,
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Philosopher, Bookmark as BookmarkType } from '../types';
import { PHILOSOPHERS } from '../data/philosophersData';
import { playSound } from '../utils/audio';

interface PhilosophersSectionProps {
  bookmarks: BookmarkType[];
  onToggleBookmark: (id: string, type: BookmarkType['type'], title: string, subtitle?: string) => void;
  onAddNote: (title: string, content: string, type: 'Figure' | 'General', targetId?: string) => void;
  selectedPhilosopherId: string;
  onSelectPhilosopher: (id: string) => void;
}

export default function PhilosophersSection({ 
  bookmarks, 
  onToggleBookmark,
  onAddNote,
  selectedPhilosopherId,
  onSelectPhilosopher
}: PhilosophersSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEra, setSelectedEra] = useState('All');
  const [selectedSchool, setSelectedSchool] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedLetter, setSelectedLetter] = useState('All');
  
  // Note writing state
  const [noteContent, setNoteContent] = useState('');
  const [showNoteConfirmation, setShowNoteConfirmation] = useState(false);

  // Unified reactive state with localized cache
  const [philosophers, setPhilosophers] = useState<Philosopher[]>(() => {
    try {
      const cached = localStorage.getItem('history_world_philosophers_v2');
      if (cached) {
        const parsed = JSON.parse(cached) as Philosopher[];
        const mergedMap = new Map<string, Philosopher>();
        PHILOSOPHERS.forEach(p => mergedMap.set(p.id, p));
        parsed.forEach(p => {
          if (p.isSynced && mergedMap.has(p.id)) {
            mergedMap.set(p.id, { ...mergedMap.get(p.id)!, ...p });
          }
        });
        return Array.from(mergedMap.values());
      }
    } catch (e) {
      console.warn("Could not load philosopher cache", e);
    }
    return PHILOSOPHERS;
  });

  // Dynamic loading state machine
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStepText, setLoadingStepText] = useState('');
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  // Interactive UI helpers
  const [copiedQuoteIdx, setCopiedQuoteIdx] = useState<number | null>(null);
  const [quoteSearchTerm, setQuoteSearchTerm] = useState('');
  const [quotesLimit, setQuotesLimit] = useState(12);

  // Synchronize custom detailed archives
  const loadPhilosopherDetails = async (p: Philosopher) => {
    setLoadingDetails(true);
    setErrorDetails(null);
    setLoadingProgress(0);
    setLoadingStepText('Connecting to Alexandria Archives...');

    const timer1 = setTimeout(() => { setLoadingProgress(15); setLoadingStepText('Translating ancient textual fragments...'); }, 500);
    const timer2 = setTimeout(() => { setLoadingProgress(35); setLoadingStepText('Mapping core biography and life trajectory...'); }, 1100);
    const timer3 = setTimeout(() => { setLoadingProgress(55); setLoadingStepText('Cataloging 8 principal philosophical monographs...'); }, 1900);
    const timer4 = setTimeout(() => { setLoadingProgress(75); setLoadingStepText('Synthesizing exactly 88 authentic quotes...'); }, 2800);
    const timer5 = setTimeout(() => { setLoadingProgress(95); setLoadingStepText('Unlocking historical chronicle tombstone registries...'); }, 3800);

    try {
      const res = await fetch('/api/gemini/philosopher-detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: p.name,
          school: p.school,
          era: p.era,
          region: p.region,
          bornDiet: p.bornDiet
        })
      });

      if (!res.ok) {
        throw new Error('Our Alexandria live server is currently busy. Try skipping or sync again to load archives.');
      }

      const detail = await res.json();
      
      setPhilosophers(current => {
        const updated = current.map(item => {
          if (item.id === p.id) {
            return {
              ...item,
              biography: detail.biography,
              deathAndReason: detail.deathAndReason,
              famousBooks: detail.famousBooks,
              detailedIdeas: detail.ideas,
              quotes: detail.quotes,
              isSynced: true
            };
          }
          return item;
        });

        try {
          localStorage.setItem('history_world_philosophers_v2', JSON.stringify(updated.filter(item => item.isSynced)));
        } catch (err) {
          console.warn("Storage save failed", err);
        }

        return updated;
      });

      setLoadingProgress(100);
      setLoadingStepText('Archives Synchronized!');
    } catch (err: any) {
      console.error("Fetch detailed error:", err);
      setErrorDetails(err.message || 'Failed to sync historic details.');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      setLoadingDetails(false);
    }
  };

  // Intercept selection to trigger details syncing if needed
  const handleSelectPhilosopherLocal = (id: string) => {
    onSelectPhilosopher(id);
    setQuoteSearchTerm('');
    setQuotesLimit(12);
    setErrorDetails(null);
    const target = philosophers.find(p => p.id === id);
    if (target && !target.isSynced) {
      loadPhilosopherDetails(target);
    }
  };

  // Extract unique filter counts dynamically
  const filters = useMemo(() => {
    // Collect all eras safely
    const erasSet = new Set(philosophers.map(p => p.era));
    const eras = ['All', ...Array.from(erasSet)];
    
    // Collect all schools safely
    const schoolsSet = new Set(philosophers.map(p => p.school));
    const schools = ['All', ...Array.from(schoolsSet)].sort();
    
    // Collect all regions safely
    const regionsSet = new Set(philosophers.map(p => p.region));
    const regions = ['All', ...Array.from(regionsSet)].sort();
    
    return { eras, schools, regions };
  }, [philosophers]);

  // Reset letter filter when other filters change
  useEffect(() => {
    setSelectedLetter('All');
  }, [searchTerm, selectedEra, selectedSchool, selectedRegion]);

  // Filtering Engine
  const filteredPhilosophersBeforeLetter = useMemo(() => {
    return philosophers.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.biography.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.ideas.some(idea => idea.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            p.famousBooks.some(book => book.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesEra = selectedEra === 'All' || p.era === selectedEra;
      const matchesSchool = selectedSchool === 'All' || p.school === selectedSchool;
      const matchesRegion = selectedRegion === 'All' || p.region === selectedRegion;
      return matchesSearch && matchesEra && matchesSchool && matchesRegion;
    });
  }, [philosophers, searchTerm, selectedEra, selectedSchool, selectedRegion]);

  const filteredPhilosophers = useMemo(() => {
    if (selectedLetter === 'All') return filteredPhilosophersBeforeLetter;
    return filteredPhilosophersBeforeLetter.filter(p => 
      p.name.trim().toUpperCase().startsWith(selectedLetter)
    );
  }, [filteredPhilosophersBeforeLetter, selectedLetter]);

  // Pagination: 250 philosophers per page with Next Page controls
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 250;
  const listScrollRef = useRef<HTMLDivElement | null>(null);

  // Reset page whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedEra, selectedSchool, selectedRegion, selectedLetter]);

  const totalPages = Math.max(1, Math.ceil(filteredPhilosophers.length / PAGE_SIZE));

  const displayedPhilosophers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredPhilosophers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredPhilosophers, currentPage]);

  const handlePageChange = (newPage: number) => {
    const clamped = Math.max(1, Math.min(newPage, totalPages));
    setCurrentPage(clamped);
    playSound('click');
    if (listScrollRef.current) {
      listScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activePhilosopher = useMemo(() => {
    return philosophers.find(p => p.id === selectedPhilosopherId) || philosophers[0];
  }, [philosophers, selectedPhilosopherId]);

  // Handle Note Submission
  const handleSaveNote = () => {
    if (!noteContent.trim() || !activePhilosopher) return;
    onAddNote(
      `Wisdom Note: ${activePhilosopher.name}`,
      noteContent,
      'Figure',
      activePhilosopher.id
    );
    setNoteContent('');
    setShowNoteConfirmation(true);
    setTimeout(() => setShowNoteConfirmation(false), 3000);
  };

  // Quick Stats
  const erasCount = useMemo(() => new Set(philosophers.map(p => p.era)).size, [philosophers]);
  const schoolsCount = useMemo(() => new Set(philosophers.map(p => p.school)).size, [philosophers]);
  const regionsCount = useMemo(() => new Set(philosophers.map(p => p.region)).size, [philosophers]);

  const isBookmarked = useMemo(() => {
    if (!activePhilosopher) return false;
    return bookmarks.some(b => b.targetId === activePhilosopher.id && b.type === 'philosopher');
  }, [bookmarks, activePhilosopher]);

  // Auto trigger load on component mount or selected philosopher update if not synced
  useEffect(() => {
    if (activePhilosopher && !activePhilosopher.isSynced && !loadingDetails && !errorDetails) {
      loadPhilosopherDetails(activePhilosopher);
    }
  }, [selectedPhilosopherId]);

  return (
    <div className="space-y-6">
      
      {/* Dynamic Header Section */}
      <div className="bg-gradient-to-br from-[#0F1512] via-[#0A0D0B] to-[#050505] border border-[#2A2A2A] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl text-left">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-[#D4AF37] pointer-events-none transform rotate-12 scale-150">
          <BookOpen className="w-48 h-48" />
        </div>
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#A09890] uppercase">The Athenian Grove</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-[#D4AF37]">Philosopher Grove</h2>
          <p className="text-xs sm:text-sm text-[#A09890] max-w-3xl leading-relaxed">
            Traverse over 600 unique philosophers mapping the entire arc of human thought in History world. Filter by school, region, or era. Selecting a philosopher synchronizes canonical Wikipedia archives: 8 core doctrines, 8 literary works, their detailed death and demise reason, and exactly 88 authentic quotes!
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#222] text-left">
            <div className="bg-[#121212] border border-[#222] rounded-xl p-3">
              <span className="text-[#D4AF37] select-none text-xl font-serif font-bold">{philosophers.length}+</span>
              <span className="text-[10px] text-[#A09890] font-mono block uppercase">Wisdom Sages</span>
            </div>
            <div className="bg-[#121212] border border-[#222] rounded-xl p-3">
              <span className="text-[#D4AF37] select-none text-xl font-serif font-bold">{erasCount}</span>
              <span className="text-[10px] text-[#A09890] font-mono block uppercase">Epoch Eras</span>
            </div>
            <div className="bg-[#121212] border border-[#222] rounded-xl p-3">
              <span className="text-[#D4AF37] select-none text-xl font-serif font-bold">{schoolsCount}</span>
              <span className="text-[10px] text-[#A09890] font-mono block uppercase">Schools of Thought</span>
            </div>
            <div className="bg-[#121212] border border-[#222] rounded-xl p-3">
              <span className="text-[#D4AF37] select-none text-xl font-serif font-bold">{regionsCount}</span>
              <span className="text-[10px] text-[#A09890] font-mono block uppercase">Regions Mapped</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: FILTERS & SCROLLABLE DIRECTORY */}
        <div className="space-y-4 lg:col-span-1 text-left">
          
          {/* SEARCH & FILTER CONTROLS */}
          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-4 space-y-3.5 shadow-lg">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-[#A09890]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, quote, book, or idea..."
                className="w-full pl-9 pr-4 py-2 bg-[#121212] text-white text-xs border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all font-sans"
              />
            </div>

            {/* Select Dropdowns */}
            <div className="space-y-2">
              <div>
                <label className="text-[10px] font-mono text-[#A09890] uppercase tracking-wider font-bold">Era / Epoch</label>
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="w-full mt-1 p-2 bg-[#121212] text-white text-xs border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                >
                  {filters.eras.map(era => (
                    <option key={era} value={era}>{era}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#A09890] uppercase tracking-wider font-bold">School of Thought</label>
                <select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="w-full mt-1 p-2 bg-[#121212] text-white text-xs border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                >
                  {filters.schools.map(school => (
                    <option key={school} value={school}>{school}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#A09890] uppercase tracking-wider font-bold">Region of Origin</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full mt-1 p-2 bg-[#121212] text-white text-xs border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                >
                  {filters.regions.map(reg => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reset helper */}
            {(searchTerm || selectedEra !== 'All' || selectedSchool !== 'All' || selectedRegion !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedEra('All');
                  setSelectedSchool('All');
                  setSelectedRegion('All');
                }}
                className="w-full text-center text-xs font-mono font-bold text-[#D4AF37] hover:underline cursor-pointer"
              >
                Clear All Active Filters
              </button>
            )}
          </div>

          {/* SCROLLABLE PHILOSOPHERS DIRECTORY */}
          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-4 shadow-lg flex flex-col h-[520px]">
            <div className="flex justify-between items-baseline mb-3 pb-2 border-b border-[#222] font-mono">
              <span className="text-[10px] text-[#A09890] uppercase font-bold tracking-wider">
                Directory {selectedLetter !== 'All' ? `[${selectedLetter}]` : ''}
              </span>
              <span className="text-xs text-[#D4AF37] font-bold">{filteredPhilosophers.length} Matches</span>
            </div>

            <div className="flex flex-1 gap-2.5 min-h-0 overflow-hidden">
              {/* VERTICAL ALPHABET JUMP COLUMN */}
              <div className="flex flex-col gap-0.5 pr-2 border-r border-[#222]/80 overflow-y-auto scrollbar-none shrink-0 justify-start py-0.5 text-[9px] font-mono w-7 max-h-full">
                {['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')].map(char => {
                  const isLetterActive = selectedLetter === char;
                  // Has matches under active non-letter filters?
                  const hasMatches = char === 'All' || filteredPhilosophersBeforeLetter.some(p => 
                    p.name.trim().toUpperCase().startsWith(char)
                  );
                  return (
                    <button
                      key={char}
                      disabled={!hasMatches && char !== 'All'}
                      onClick={() => {
                        setSelectedLetter(char);
                        playSound('click');
                        if (char !== 'All') {
                          const found = filteredPhilosophersBeforeLetter.find(p => p.name.trim().toUpperCase().startsWith(char));
                          if (found) {
                            handleSelectPhilosopherLocal(found.id);
                          }
                        }
                      }}
                      className={`w-full h-[17px] flex items-center justify-center rounded transition-all text-center select-none text-[8.5px] font-semibold ${
                        isLetterActive 
                          ? 'bg-[#D4AF37] text-black font-black shadow-sm scale-105' 
                          : hasMatches 
                            ? 'text-[#A09890] hover:text-white hover:bg-[#1A1A1A] cursor-pointer font-bold' 
                            : 'text-[#A09890]/25 cursor-not-allowed opacity-30 font-light'
                      }`}
                      title={char === 'All' ? 'Show all' : `Filter/Jump to '${char}' philosophers`}
                    >
                      {char}
                    </button>
                  );
                })}
              </div>

              {/* DIRECTORY SCROLL TRACK */}
              <div ref={listScrollRef} className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin pr-1">
                {displayedPhilosophers.length > 0 ? (
                  <>
                    {displayedPhilosophers.map(p => {
                      const isActive = p.id === selectedPhilosopherId;
                      return (
                        <div
                          key={p.id}
                          id={`philo_item_${p.id}`}
                          onClick={() => handleSelectPhilosopherLocal(p.id)}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer group ${
                            isActive
                              ? 'bg-[#1A1813] border-[#D4AF37] text-white shadow-md'
                              : 'bg-[#121212] border-[#2A2A2A] hover:bg-[#181818] text-[#A09890] hover:text-white'
                          }`}
                        >
                          <div className="truncate max-w-[130px] sm:max-w-[170px]">
                            <p className="text-xs font-serif italic font-bold text-white group-hover:text-[#D4AF37] transition-colors">{p.name}</p>
                            <p className="text-[10px] font-mono opacity-80 mt-0.5 truncate">{p.school}</p>
                          </div>
                          <div className="text-right text-[9px] font-mono shrink-0 flex items-center gap-1.5">
                            <div className="text-right">
                              <p className="text-[#D4AF37]">{p.bornDiet}</p>
                              <p className="opacity-60">{p.region}</p>
                            </div>
                            <a
                              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(p.name.replace(/\s+/g, '_'))}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 text-[#A09890] hover:text-[#D4AF37] hover:bg-[#252525] rounded transition-all cursor-pointer"
                              title={`Open ${p.name} Wikipedia page`}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            {p.isSynced && (
                              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" title="Synced Archives Ready"></span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="text-center py-10 space-y-2">
                    <HelpCircle className="w-8 h-8 text-[#A09890]/40 mx-auto" />
                    <p className="text-xs font-mono text-[#A09890]">No philosophers found containing that letter match.</p>
                  </div>
                )}
              </div>
            </div>

            {/* PAGINATION CONTROLS: 250 PER PAGE WITH PREV / NEXT PAGE OPTIONS */}
            {totalPages > 1 && (
              <div className="pt-2.5 border-t border-[#222] mt-2 flex flex-col gap-1.5 shrink-0 select-none">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#A09890]">
                  <span>Showing {((currentPage - 1) * PAGE_SIZE) + 1}–{Math.min(currentPage * PAGE_SIZE, filteredPhilosophers.length)} of {filteredPhilosophers.length}</span>
                  <span className="text-[#D4AF37] font-bold">Page {currentPage} of {totalPages}</span>
                </div>
                <div className="flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-2.5 py-1.5 bg-[#141414] hover:bg-[#222] disabled:opacity-30 disabled:pointer-events-none text-[#D4AF37] border border-[#2A2A2A] rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer"
                    title="Previous 250 philosophers"
                  >
                    <ChevronLeft className="w-3 h-3" /> Prev
                  </button>

                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono text-[#A09890]">Page</span>
                    <select
                      value={currentPage}
                      onChange={(e) => handlePageChange(Number(e.target.value))}
                      className="bg-[#141414] border border-[#2A2A2A] text-[#D4AF37] text-[10px] font-mono font-bold rounded px-1.5 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    >
                      {Array.from({ length: totalPages }, (_, idx) => (
                        <option key={idx + 1} value={idx + 1}>
                          {idx + 1} ({idx * PAGE_SIZE + 1}–{Math.min((idx + 1) * PAGE_SIZE, filteredPhilosophers.length)})
                        </option>
                      ))}
                    </select>
                    <span className="text-[10px] font-mono text-[#A09890]">of {totalPages}</span>
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-2.5 py-1.5 bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black disabled:opacity-30 disabled:pointer-events-none border border-[#D4AF37]/50 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                    title="Next 250 philosophers"
                  >
                    Next Page <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MIDDLE & RIGHT COLUMNS: RICH PROFILE DETAILS OR INTERACTIVE LOADER */}
        <div className="lg:col-span-2 space-y-6 text-left">
          {loadingDetails ? (
            <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-12 text-center min-h-[480px] flex flex-col items-center justify-center space-y-6 animate-fade-in shadow-2xl">
              <div className="relative flex items-center justify-center">
                <Loader2 className="w-14 h-14 text-[#D4AF37] animate-spin" />
                <Compass className="absolute w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h4 className="text-sm font-serif italic text-white flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                  Retrieving Deep Scholastic Ledger
                </h4>
                <p className="text-[11px] font-mono text-[#D4AF37] tracking-wider uppercase font-bold">{loadingStepText}</p>
                
                {/* Progress bar */}
                <div className="w-64 bg-[#151515] border border-[#222] h-2 rounded-full overflow-hidden mt-3 relative mx-auto">
                  <div 
                    className="bg-gradient-to-r from-[#D4AF37] to-white h-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <div className="text-[9px] font-mono text-[#A09890] mt-1">{loadingProgress}% Synced</div>
              </div>
              <p className="text-[10px] text-gray-500 max-w-xs leading-relaxed font-sans mt-2">
                Querying History world archives via server-side Gemini AI for comprehensive biography, 8 literary books, exactly 8 doctrines, and 88 high-fidelity quotes.
              </p>
              
              <button 
                onClick={() => {
                  setPhilosophers(current => 
                    current.map(item => item.id === activePhilosopher.id ? { ...item, isSynced: true } : item)
                  );
                  setLoadingDetails(false);
                }}
                className="px-3.5 py-1.5 bg-[#1C1811] hover:bg-[#333] border border-[#2A2A2A] text-[#D4AF37] hover:text-white text-[10px] font-mono rounded-xl transition-all cursor-pointer"
              >
                Skip &amp; Inspect Basic Metadata
              </button>
            </div>
          ) : errorDetails ? (
            <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-12 text-center min-h-[480px] flex flex-col items-center justify-center space-y-5 shadow-xl">
              <AlertCircle className="w-12 h-12 text-[#FF4444] mx-auto animate-bounce" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-serif">Arcanum Sync Encountered Issues</h4>
                <p className="text-xs text-[#A09890] leading-relaxed max-w-md mx-auto">{errorDetails}</p>
              </div>
              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => loadPhilosopherDetails(activePhilosopher)}
                  className="px-4 py-2 bg-[#D4AF37] text-black font-semibold text-xs rounded-xl transition-all hover:bg-white cursor-pointer"
                >
                  Retry Syncing Codex
                </button>
                <button
                  onClick={() => {
                    setPhilosophers(current => 
                      current.map(item => item.id === activePhilosopher.id ? { ...item, isSynced: true } : item)
                    );
                    setErrorDetails(null);
                  }}
                  className="px-4 py-2 bg-[#1C1811] text-white font-mono text-xs rounded-xl border border-[#2A2A2A] transition-all hover:bg-[#252525] cursor-pointer"
                >
                  Inspect Basic Offline Page
                </button>
              </div>
            </div>
          ) : activePhilosopher ? (
            <div className="space-y-6">
              
              {/* CORE DETAILS CARD */}
              <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 relative overflow-hidden shadow-xl space-y-5 text-left">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-gray-400 pointer-events-none transform scale-125">
                  <Compass className="w-32 h-32" />
                </div>

                {/* Banner Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#1E1911] text-[#D4AF37] border border-[#D4AF37]/35 px-2 py-0.5 rounded">
                        {activePhilosopher.school}
                      </span>
                      <span className="text-xs font-semibold text-[#8CA59C] font-mono">
                        {activePhilosopher.era} Era
                      </span>
                      {activePhilosopher.isSynced ? (
                        <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-[#D4AF37] bg-yellow-950/40 border border-yellow-500/20 px-2 py-0.5 rounded">
                          ✨ Synced Archive
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-gray-500 bg-[#121212] border border-[#222] px-2 py-0.5 rounded">
                          📜 Basic Record
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif italic font-black text-white text-2xl sm:text-3xl tracking-tight mt-1">
                      {activePhilosopher.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#A09890] pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {activePhilosopher.bornDiet}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {activePhilosopher.region}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 shrink-0">
                    <a
                      href={`https://en.wikipedia.org/wiki/${encodeURIComponent(activePhilosopher.name.replace(/\s+/g, '_'))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 sm:py-2 text-xs font-mono font-bold bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/50 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      title={`Open official Wikipedia article for ${activePhilosopher.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Wikipedia ↗
                    </a>

                    <button
                      onClick={() => onToggleBookmark(
                        activePhilosopher.id,
                        'philosopher',
                        activePhilosopher.name,
                        activePhilosopher.school
                      )}
                      className={`px-3 py-1.5 sm:py-2 text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isBookmarked
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                          : 'bg-[#151515] text-[#A09890] border-[#2A2A2A] hover:bg-[#1A1813] hover:text-[#D4AF37]'
                      }`}
                    >
                      {isBookmarked ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" /> Saved
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" /> Save
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => loadPhilosopherDetails(activePhilosopher)}
                      className="px-3 py-1.5 sm:py-2 text-xs font-mono font-bold bg-[#1C1811] hover:bg-[#2A2A2A] border border-[#2A2A2A] text-[#D4AF37] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Sync detailed Wikipedia-style documents"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]" /> Sync AI
                    </button>
                  </div>
                </div>

                {/* Biography Section */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-extrabold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> Biography &amp; Scholarly Summary
                  </h4>
                  <p className="text-xs sm:text-sm text-[#E0D8D0] leading-relaxed font-sans font-light">
                    {activePhilosopher.biography}
                  </p>
                </div>

                {/* Death Detail & Legacy Reason (NEW REQUIREMENT) */}
                {activePhilosopher.deathAndReason && (
                  <div className="bg-[#1C1414] border border-[#ff6666]/10 rounded-xl p-4 space-y-2 relative overflow-hidden text-left">
                    <div className="absolute right-0 top-0 p-4 opacity-5 text-[#FF6666]/50 pointer-events-none transform translate-x-3 -translate-y-3">
                      <Skull className="w-20 h-20" />
                    </div>
                    <h5 className="text-[10px] font-mono text-[#FF8888] uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                      <Skull className="w-3.5 h-3.5 text-[#FF6666]" /> Historical Demise &amp; End of Life Reason
                    </h5>
                    <p className="text-xs text-[#E0C0C0] leading-relaxed font-sans font-light">
                      {activePhilosopher.deathAndReason}
                    </p>
                  </div>
                )}

                {/* Key Ideas Bento Grid (NEW REQUIREMENT - SHOWS 8 DOCTRINES IN SPECIFIC BOXES) */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Key Philosophical Doctrines &amp; Thoughts
                  </h4>
                  {activePhilosopher.detailedIdeas && activePhilosopher.detailedIdeas.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      {activePhilosopher.detailedIdeas.slice(0, 8).map((idea, i) => (
                        <div key={i} className="bg-[#121212] border border-[#222] rounded-xl p-4.5 hover:border-[#D4AF37]/30 transition-all duration-300 group flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-1.5 leading-tight">
                              <p className="text-xs font-serif font-black text-[#D4AF37] flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform shrink-0"></span>
                                {idea.title}
                              </p>
                              <a
                                href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(idea.title + ' ' + activePhilosopher.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 text-[#A09890] hover:text-[#D4AF37] hover:bg-[#1A1813] rounded transition-all cursor-pointer shrink-0"
                                title={`Search '${idea.title}' on Wikipedia`}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                            <p className="text-[11px] text-[#A09890] mt-1.5 leading-relaxed font-sans font-light">
                              {idea.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {activePhilosopher.ideas.map((idea, i) => (
                        <a 
                          key={i} 
                          href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(idea + ' ' + activePhilosopher.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono text-white hover:text-[#D4AF37] bg-[#151515] border border-[#222] hover:border-[#D4AF37]/40 px-3 py-1.5 rounded-xl shadow-inner font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          title={`Search ${idea} on Wikipedia`}
                        >
                          🧠 {idea} <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Famous works */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-extrabold flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Canonical Monographs &amp; Manuscripts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                    {activePhilosopher.famousBooks.map((book, i) => (
                      <div 
                        key={i} 
                        className="bg-[#121212] border border-[#2A2A2A] rounded-xl p-3 flex items-center justify-between gap-2 group hover:border-[#D4AF37]/40 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="p-1.5 bg-[#1C1811] text-[#D4AF37] border border-[#D4AF37]/20 rounded-lg shrink-0">
                            <BookOpen className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-serif italic text-white font-semibold truncate group-hover:text-[#D4AF37] transition-colors" title={book}>
                            {book}
                          </span>
                        </div>
                        <a
                          href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(book + ' ' + activePhilosopher.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-[#A09890] hover:text-[#D4AF37] hover:bg-[#1A1813] rounded transition-all cursor-pointer shrink-0"
                          title={`Search '${book}' on Wikipedia`}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TIMELINES QUOTES METRICS VIEW (NEW REQUIREMENT - SHOWS 88 QUOTES WITH FILTER AND COPY ACTIONS) */}
              <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 relative overflow-hidden shadow-xl space-y-4 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-extrabold flex items-center gap-1">
                      <Quote className="w-4 h-4" /> Echoes of Antiquity: Aphorisms &amp; Oral Teachings ({activePhilosopher.isSynced ? '88' : activePhilosopher.quotes.length})
                    </h4>
                    <p className="text-[10px] text-[#A09890] font-sans">
                      Explore the philosopher&apos;s direct statements. Fully searched and scrollable.
                    </p>
                  </div>

                  {activePhilosopher.isSynced && (
                    <div className="relative shrink-0 max-w-[200px] w-full">
                      <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#A09890]" />
                      <input
                        type="text"
                        value={quoteSearchTerm}
                        onChange={(e) => { setQuoteSearchTerm(e.target.value); setQuotesLimit(15); }}
                        placeholder="Search 88 quotes..."
                        className="pl-8 pr-3 py-1.5 w-full bg-[#121212] border border-[#222] text-white text-[11px] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                      />
                    </div>
                  )}
                </div>
                
                {(() => {
                  const filtered = activePhilosopher.quotes.filter(q => 
                    q.toLowerCase().includes(quoteSearchTerm.toLowerCase())
                  );

                  return (
                    <div className="space-y-3 font-serif">
                      {filtered.length > 0 ? (
                        filtered.slice(0, quotesLimit).map((quote, idx) => {
                          const isCopied = copiedQuoteIdx === idx;
                          return (
                            <div 
                              key={idx} 
                              className="p-4 bg-gradient-to-r from-[#121212] to-[#0A0A0A] border border-[#1FA589]/10 border-l-[#D4AF37] border-l-2 rounded-xl italic text-xs sm:text-sm text-white font-medium leading-relaxed relative group"
                            >
                              <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(quote);
                                    setCopiedQuoteIdx(idx);
                                    setTimeout(() => setCopiedQuoteIdx(null), 2000);
                                  }}
                                  className="p-1 px-1.5 bg-[#1C1811] border border-[#D4AF37]/35 text-[#D4AF37] font-mono text-[8px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] flex items-center gap-1 shadow-md"
                                >
                                  {isCopied ? (
                                    <>
                                      <Check className="w-2.5 h-2.5" /> Copied
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-2.5 h-2.5" /> Copy
                                    </>
                                  )}
                                </button>
                              </div>
                              <Quote className="absolute right-4 bottom-4 w-10 h-10 opacity-[0.02] pointer-events-none text-gray-400" />
                              &ldquo;{quote}&rdquo;
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-8 text-center text-xs font-mono text-[#A09890] bg-[#121212] border border-dashed border-[#222] rounded-xl">
                          No matching quote scrolls found.
                        </div>
                      )}

                      {/* Pagination load more quotes button */}
                      {filtered.length > quotesLimit && (
                        <div className="text-center pt-2">
                          <button
                            onClick={() => setQuotesLimit(limit => limit + 18)}
                            className="px-4 py-2 bg-[#121212] border border-[#222] text-[#D4AF37] hover:text-white hover:border-[#D4AF37]/60 text-xs font-mono font-bold rounded-xl cursor-pointer transition-all uppercase tracking-wider"
                          >
                            Explore More Wisdom Aphorisms (+{filtered.length - quotesLimit} remaining)
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* STUDY NOTE COMPOSER */}
              <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 shadow-xl space-y-4 text-left">
                <div className="space-y-1">
                  <h4 className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                    📝 Synthesis Notebook
                  </h4>
                  <p className="text-[11px] text-[#A09890] font-sans">
                    Compose personal insights on {activePhilosopher.name}&apos;s system to secure directly to your Chronos Ledger.
                  </p>
                </div>

                <div className="space-y-3">
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder={`Compose research notes on ${activePhilosopher.name}'s school alignment, critical controversies, or cosmic implications...`}
                    rows={3}
                    className="w-full p-3 bg-[#121212] border border-[#2A2A2A] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all font-sans"
                  />

                  <div className="flex justify-between items-center">
                    {showNoteConfirmation ? (
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 animate-fade-in font-bold">
                        <CheckCircle className="w-3.5 h-3.5" /> Note Saved! Synthesized to Notebook tab.
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#A09890] font-mono">
                        Saved locally in your permanent browser state
                      </span>
                    )}

                    <button
                      disabled={!noteContent.trim()}
                      onClick={handleSaveNote}
                      className="px-4 py-2 bg-[#D4AF37] hover:bg-white text-black font-semibold text-xs rounded-xl shadow transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-sans font-bold uppercase tracking-wider"
                    >
                      Log Scholastic Note
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center space-y-3">
              <Compass className="w-12 h-12 text-[#D4AF37]/40 animate-spin" />
              <p className="text-sm font-serif italic text-[#A09890]">Selecting another sage from the grove directory...</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
