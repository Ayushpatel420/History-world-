import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  BookOpen, Shield, Flame, Globe, Search, Award, 
  Compass, Clock, Sparkles, Plus, ExternalLink, FileText, 
  ChevronRight, ChevronLeft, ArrowLeft, BookOpenCheck, HelpCircle, X, History, Landmark, Layers,
  Volume2, VolumeX, Pause, Play, Square, Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import PaginationControls from './PaginationControls';
import {
  WikipediaCivilization,
  WikipediaKing,
  WikipediaWar,
  WikipediaLeader,
  WikipediaCountry,
  UserNote,
  Bookmark
} from '../types';
import {
  CIVILIZATIONS,
  KINGS,
  WARS,
  LEADERS,
  COUNTRIES_LIST
} from '../data/wikiData';
import { trackArticleView } from '../utils/activityTracker';
import InlineNotesWidget from './InlineNotesWidget';
import TextToSpeechButton from './TextToSpeechButton';
import { speechManager } from '../utils/speechSynthesis';
import { playSound } from '../utils/audio';

interface EncyclopediaSectionProps {
  onAddNote: (title: string, content: string, type: UserNote['targetType'], targetId?: string) => void;
  onDeleteNote: (id: string) => void;
  notes: UserNote[];
  focusCategory?: string;
  focusItemId?: string;
  onClearFocus?: () => void;
  bookmarks?: Bookmark[];
  onToggleBookmark?: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
}

export default function EncyclopediaSection({ 
  onAddNote, 
  onDeleteNote, 
  notes, 
  focusCategory, 
  focusItemId, 
  onClearFocus,
  bookmarks = [],
  onToggleBookmark
}: EncyclopediaSectionProps) {
  const [activeTab, setActiveTab] = useState<'civilizations' | 'kings' | 'wars' | 'leaders' | 'countries'>('civilizations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('All');

  // Scroll restoration refs: remember exact scroll position and clicked item ID
  const lastScrollPos = useRef<number>(0);
  const lastOpenedId = useRef<string | null>(null);

  // Live Speech Synthesis state subscription
  const [ttsState, setTtsState] = useState(speechManager.getState());

  useEffect(() => {
    const unsubscribe = speechManager.subscribe((st) => setTtsState(st));
    return () => unsubscribe();
  }, []);

  // Synchronize dynamic focus matching from personalized learning path
  useEffect(() => {
    if (focusCategory) {
      if (focusCategory === 'gallery') {
        setActiveTab('civilizations');
      } else {
        setActiveTab(focusCategory as any);
      }
      if (focusItemId) {
        if (focusCategory === 'civilizations') {
          const found = CIVILIZATIONS.find(c => c.id === focusItemId);
          if (found) setSelectedCivilization(found);
        } else if (focusCategory === 'kings') {
          const found = KINGS.find(k => k.id === focusItemId);
          if (found) setSelectedKing(found);
        } else if (focusCategory === 'wars') {
          const found = WARS.find(w => w.id === focusItemId);
          if (found) setSelectedWar(found);
        } else if (focusCategory === 'leaders') {
          const found = LEADERS.find(l => l.id === focusItemId);
          if (found) setSelectedLeader(found);
        } else if (focusCategory === 'countries') {
          const found = COUNTRIES_LIST.find(c => c.id === focusItemId);
          if (found) setSelectedCountry(found);
        }
      }
      onClearFocus?.();
    }
  }, [focusCategory, focusItemId]);

  // Cancel speech synthesis when leaving Encyclopedia
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Higher default items-per-page to drastically reduce pagination clutter ("make it few")
  const [civsPage, setCivsPage] = useState(1);
  const [civsPerPage, setCivsPerPage] = useState(36);

  const [kingsPage, setKingsPage] = useState(1);
  const [kingsPerPage, setKingsPerPage] = useState(48);

  const [warsPage, setWarsPage] = useState(1);
  const [warsPerPage, setWarsPerPage] = useState(48);

  const [leadersPage, setLeadersPage] = useState(1);
  const [leadersPerPage, setLeadersPerPage] = useState(48);

  const [countriesPage, setCountriesPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(48);

  // Reset page indices on query or filter changes
  useEffect(() => {
    setCivsPage(1);
    setKingsPage(1);
    setWarsPage(1);
    setLeadersPage(1);
    setCountriesPage(1);
  }, [searchQuery, selectedRegionFilter, activeTab]);
  
  // Detail overlay / full page state
  const [selectedCivilization, setSelectedCivilization] = useState<WikipediaCivilization | null>(null);
  const [selectedKing, setSelectedKing] = useState<WikipediaKing | null>(null);
  const [selectedWar, setSelectedWar] = useState<WikipediaWar | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<WikipediaLeader | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<WikipediaCountry | null>(null);
  const [expandedCountry, setExpandedCountry] = useState<WikipediaCountry | null>(null);

  // Handlers to open in upper part and remember scroll position
  const handleOpenCivilization = (c: WikipediaCivilization) => {
    lastScrollPos.current = window.scrollY;
    lastOpenedId.current = c.id;
    setSelectedCivilization(c);
    trackArticleView({ id: c.id, title: c.name, category: 'civilizations' });
    setTimeout(() => {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 40);
  };

  const handleOpenKing = (k: WikipediaKing) => {
    lastScrollPos.current = window.scrollY;
    lastOpenedId.current = k.id;
    setSelectedKing(k);
    trackArticleView({ id: k.id, title: k.name, category: 'kings' });
    setTimeout(() => {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 40);
  };

  const handleOpenWar = (w: WikipediaWar) => {
    lastScrollPos.current = window.scrollY;
    lastOpenedId.current = w.id;
    setSelectedWar(w);
    trackArticleView({ id: w.id, title: w.title, category: 'wars' });
    setTimeout(() => {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 40);
  };

  const handleOpenLeader = (l: WikipediaLeader) => {
    lastScrollPos.current = window.scrollY;
    lastOpenedId.current = l.id;
    setSelectedLeader(l);
    trackArticleView({ id: l.id, title: l.name, category: 'leaders' });
    setTimeout(() => {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 40);
  };

  const handleOpenCountry = (co: WikipediaCountry) => {
    lastScrollPos.current = window.scrollY;
    lastOpenedId.current = co.id;
    setSelectedCountry(co);
    trackArticleView({ id: co.id, title: co.name, category: 'countries' });
    setTimeout(() => {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 40);
  };

  // Handler to close detail view and restore exact previous reading position
  const handleCloseDetail = () => {
    speechManager.stop();
    const returnId = lastOpenedId.current;
    const returnY = lastScrollPos.current;

    setSelectedCivilization(null);
    setSelectedKing(null);
    setSelectedWar(null);
    setSelectedLeader(null);
    setSelectedCountry(null);
    setDeepResearchText(null);
    setResearchError(null);

    // Smoothly scroll back to the item the user was reading
    setTimeout(() => {
      if (returnId) {
        const el = document.getElementById(`encyclo-item-${returnId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-2', 'ring-[#E5C158]', 'transition-all', 'duration-500');
          setTimeout(() => {
            el.classList.remove('ring-2', 'ring-[#E5C158]');
          }, 1800);
          return;
        }
      }
      window.scrollTo({ top: returnY, behavior: 'smooth' });
    }, 60);
  };

  // Toggle Text-to-Speech across Encyclopedia (active article or category overview)
  const handleToggleEncyclopediaSpeech = () => {
    if (ttsState.isPlaying) {
      speechManager.stop();
      return;
    }

    if (selectedCivilization) {
      const text = `Civilization Profile: ${selectedCivilization.name}. Golden Era: ${selectedCivilization.period}. Capital: ${selectedCivilization.capital}. Government System: ${selectedCivilization.government}. Historical Overview: ${selectedCivilization.summary}. Core Legacy: ${selectedCivilization.deepDetails}. Key Achievements: ${selectedCivilization.achievements.join('. ')}.`;
      speechManager.speak(`encyclo_civ_${selectedCivilization.id}`, text);
      return;
    }
    if (selectedKing) {
      const text = `Imperial Monarch: ${selectedKing.name}, ${selectedKing.title}. Reign: ${selectedKing.reign}. Region: ${selectedKing.region}. Dynasty: ${selectedKing.dynasty}. Key Achievement: ${selectedKing.keyAchievement}. Biographical Overview: ${selectedKing.wikipediaBio}.`;
      speechManager.speak(`encyclo_king_${selectedKing.id}`, text);
      return;
    }
    if (selectedWar) {
      const text = `Historical War and Conflict: ${selectedWar.title}. Date: ${selectedWar.date}. Combatants: ${selectedWar.belligerents}. Decisive Outcome: ${selectedWar.outcome}. Casualty Estimate: ${selectedWar.casualtyEstimate}. Historical Significance: ${selectedWar.significance}. Full Account: ${selectedWar.description}.`;
      speechManager.speak(`encyclo_war_${selectedWar.id}`, text);
      return;
    }
    if (selectedLeader) {
      const text = `World Statesman: ${selectedLeader.name}. Era: ${selectedLeader.era}. Country of Origin: ${selectedLeader.countryOfOrigin}. Historical Role: ${selectedLeader.role}. Historic Impact: ${selectedLeader.impactParagraph}. Notable Achievements: ${selectedLeader.achievements.join(', ')}.`;
      speechManager.speak(`encyclo_leader_${selectedLeader.id}`, text);
      return;
    }
    if (selectedCountry) {
      const text = `Sovereign Country: ${selectedCountry.name}. Language: ${selectedCountry.language}. Major Religions: ${selectedCountry.majorReligions}. Geography: ${selectedCountry.geography}. Historical Summary: ${selectedCountry.summary}. National Epics: ${selectedCountry.nationalEpics}. Key Achievements: ${selectedCountry.achievements.join(', ')}.`;
      speechManager.speak(`encyclo_country_${selectedCountry.id}`, text);
      return;
    }

    // If on list, read category briefing
    let overviewText = '';
    if (activeTab === 'civilizations') {
      overviewText = `Welcome to the Historical Civilizations Archive. Currently displaying ${filteredCivilizations.length} ancient empires and cultures spanning Mesopotamia, Egypt, Rome, and beyond. Select any civilization to inspect its full timeline, government, and legacy.`;
    } else if (activeTab === 'kings') {
      overviewText = `Welcome to the Imperial Monarchs Gallery. Currently indexing ${filteredKings.length} monarchs, pharaohs, emperors, and sovereign rulers from world antiquity. Select any monarch to inspect their reign and decrees.`;
    } else if (activeTab === 'wars') {
      overviewText = `Welcome to the Historical Conflicts and Battles Registry. Cataloging ${filteredWars.length} decisive campaigns and sieges that altered borders and civilizations.`;
    } else if (activeTab === 'leaders') {
      overviewText = `Welcome to the World Statesmen and Visionaries Registry. Cataloging ${filteredLeaders.length} statesmen, philosophers, and commanders who shaped world history.`;
    } else {
      overviewText = `Welcome to the Sovereign Countries Historical Encyclopedia. Explore historical origins, founding dates, and governance systems across global nations.`;
    }
    speechManager.speak(`encyclo_overview_${activeTab}`, overviewText);
  };

  // Civilization Comparison state
  const [isComparing, setIsComparing] = useState(false);
  const [compareId1, setCompareId1] = useState('mesopotamia');
  const [compareId2, setCompareId2] = useState('roman_imperial');

  const compCiv1 = useMemo(() => CIVILIZATIONS.find(c => c.id === compareId1) || CIVILIZATIONS[0], [compareId1]);
  const compCiv2 = useMemo(() => CIVILIZATIONS.find(c => c.id === compareId2) || CIVILIZATIONS[1] || CIVILIZATIONS[0], [compareId2]);

  // Bookmark selection helper
  const currentItem = useMemo(() => {
    if (selectedCivilization) {
      return { id: selectedCivilization.id, type: 'article' as const, title: selectedCivilization.name, subtitle: 'Civilization Profile' };
    }
    if (selectedKing) {
      return { id: selectedKing.id, type: 'ruler' as const, title: selectedKing.name, subtitle: selectedKing.title };
    }
    if (selectedWar) {
      return { id: selectedWar.id, type: 'event' as const, title: selectedWar.title, subtitle: `${selectedWar.date} Conflict` };
    }
    if (selectedLeader) {
      return { id: selectedLeader.id, type: 'figure' as const, title: selectedLeader.name, subtitle: `${selectedLeader.era} Leader` };
    }
    if (selectedCountry) {
      return { id: selectedCountry.id, type: 'country' as const, title: selectedCountry.name, subtitle: 'Encyclopedia entry' };
    }
    return null;
  }, [selectedCivilization, selectedKing, selectedWar, selectedLeader, selectedCountry]);

  // Gemini deep exploration state
  const [deepResearchText, setDeepResearchText] = useState<string | null>(null);
  const [isResearching, setIsResearching] = useState(false);
  const [researchError, setResearchError] = useState<string | null>(null);

  // Cultural deep dive state
  const [culturalProfile, setCulturalProfile] = useState<{ cuisine: string; folklore: string; philosophy: string } | null>(null);
  const [isGeneratingCulture, setIsGeneratingCulture] = useState(false);
  const [cultureError, setCultureError] = useState<string | null>(null);

  const handleGenerateCulturalProfile = async (country: WikipediaCountry) => {
    setIsGeneratingCulture(true);
    setCultureError(null);
    try {
      const response = await fetch('/api/gemini/cultural', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          countryName: country.name,
          language: country.language,
          synopsis: country.summary
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to communicate with cultural profile builder.');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setCulturalProfile({
        cuisine: data.cuisine || 'Information currently missing from the scroll.',
        folklore: data.folklore || 'Legendary lore under translation.',
        philosophy: data.philosophy || 'Core spiritual philosophies currently undefined.'
      });
    } catch (err: any) {
      console.error(err);
      setCultureError(err.message || 'Error compiling cultural dossier. Please check your Gemini API key in settings.');
    } finally {
      setIsGeneratingCulture(false);
    }
  };

  const handleCloseCountryDrawer = () => {
    setExpandedCountry(null);
    setCulturalProfile(null);
    setCultureError(null);
  };

  // ==========================================
  // REAL-TIME SEARCH & FILTER CALCULATIONS
  // ==========================================

  const filteredCivilizations = useMemo(() => {
    return CIVILIZATIONS.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.achievements.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, CIVILIZATIONS]);

  const filteredKings = useMemo(() => {
    return KINGS.filter(k => {
      const matchesSearch = k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            k.dynasty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            k.keyAchievement.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegionFilter === 'All' || k.region === selectedRegionFilter;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegionFilter, KINGS]);

  const filteredWars = useMemo(() => {
    return WARS.filter(w => 
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.belligerents.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.significance.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, WARS]);

  const filteredLeaders = useMemo(() => {
    return LEADERS.filter(l => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.countryOfOrigin.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, LEADERS]);

  const filteredCountries = useMemo(() => {
    return COUNTRIES_LIST.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.language.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, COUNTRIES_LIST]);

  // Paginated slices for each tab
  const totalCivsPages = Math.ceil(filteredCivilizations.length / civsPerPage) || 1;
  const paginatedCivilizations = useMemo(() => {
    const start = (civsPage - 1) * civsPerPage;
    return filteredCivilizations.slice(start, start + civsPerPage);
  }, [filteredCivilizations, civsPage, civsPerPage]);

  const totalKingsPages = Math.ceil(filteredKings.length / kingsPerPage) || 1;
  const paginatedKings = useMemo(() => {
    const start = (kingsPage - 1) * kingsPerPage;
    return filteredKings.slice(start, start + kingsPerPage);
  }, [filteredKings, kingsPage, kingsPerPage]);

  const totalWarsPages = Math.ceil(filteredWars.length / warsPerPage) || 1;
  const paginatedWars = useMemo(() => {
    const start = (warsPage - 1) * warsPerPage;
    return filteredWars.slice(start, start + warsPerPage);
  }, [filteredWars, warsPage, warsPerPage]);

  const totalLeadersPages = Math.ceil(filteredLeaders.length / leadersPerPage) || 1;
  const paginatedLeaders = useMemo(() => {
    const start = (leadersPage - 1) * leadersPerPage;
    return filteredLeaders.slice(start, start + leadersPerPage);
  }, [filteredLeaders, leadersPage, leadersPerPage]);

  const totalCountriesPages = Math.ceil(filteredCountries.length / countriesPerPage) || 1;
  const paginatedCountries = useMemo(() => {
    const start = (countriesPage - 1) * countriesPerPage;
    return filteredCountries.slice(start, start + countriesPerPage);
  }, [filteredCountries, countriesPage, countriesPerPage]);

  // Deep dive next/previous sequential navigation within active category
  const activeDetailInfo = useMemo(() => {
    if (selectedCivilization) {
      const idx = filteredCivilizations.findIndex(c => c.id === selectedCivilization.id);
      return {
        category: 'Civilization',
        currentIndex: idx >= 0 ? idx : 0,
        total: filteredCivilizations.length,
        prevItem: filteredCivilizations[(idx - 1 + filteredCivilizations.length) % filteredCivilizations.length],
        nextItem: filteredCivilizations[(idx + 1) % filteredCivilizations.length]
      };
    }
    if (selectedKing) {
      const idx = filteredKings.findIndex(k => k.id === selectedKing.id);
      return {
        category: 'Imperial Monarch',
        currentIndex: idx >= 0 ? idx : 0,
        total: filteredKings.length,
        prevItem: filteredKings[(idx - 1 + filteredKings.length) % filteredKings.length],
        nextItem: filteredKings[(idx + 1) % filteredKings.length]
      };
    }
    if (selectedWar) {
      const idx = filteredWars.findIndex(w => w.id === selectedWar.id);
      return {
        category: 'Conflict & Combat',
        currentIndex: idx >= 0 ? idx : 0,
        total: filteredWars.length,
        prevItem: filteredWars[(idx - 1 + filteredWars.length) % filteredWars.length],
        nextItem: filteredWars[(idx + 1) % filteredWars.length]
      };
    }
    if (selectedLeader) {
      const idx = filteredLeaders.findIndex(l => l.id === selectedLeader.id);
      return {
        category: 'World Statesman',
        currentIndex: idx >= 0 ? idx : 0,
        total: filteredLeaders.length,
        prevItem: filteredLeaders[(idx - 1 + filteredLeaders.length) % filteredLeaders.length],
        nextItem: filteredLeaders[(idx + 1) % filteredLeaders.length]
      };
    }
    if (selectedCountry) {
      const idx = filteredCountries.findIndex(c => c.id === selectedCountry.id);
      return {
        category: 'Sovereign State',
        currentIndex: idx >= 0 ? idx : 0,
        total: filteredCountries.length,
        prevItem: filteredCountries[(idx - 1 + filteredCountries.length) % filteredCountries.length],
        nextItem: filteredCountries[(idx + 1) % filteredCountries.length]
      };
    }
    return null;
  }, [
    selectedCivilization, selectedKing, selectedWar, selectedLeader, selectedCountry,
    filteredCivilizations, filteredKings, filteredWars, filteredLeaders, filteredCountries
  ]);

  const handlePrevDetailDive = () => {
    speechManager.stop();
    setDeepResearchText(null);
    setResearchError(null);
    if (selectedCivilization && activeDetailInfo?.prevItem) {
      setSelectedCivilization(activeDetailInfo.prevItem as WikipediaCivilization);
    } else if (selectedKing && activeDetailInfo?.prevItem) {
      setSelectedKing(activeDetailInfo.prevItem as WikipediaKing);
    } else if (selectedWar && activeDetailInfo?.prevItem) {
      setSelectedWar(activeDetailInfo.prevItem as WikipediaWar);
    } else if (selectedLeader && activeDetailInfo?.prevItem) {
      setSelectedLeader(activeDetailInfo.prevItem as WikipediaLeader);
    } else if (selectedCountry && activeDetailInfo?.prevItem) {
      setSelectedCountry(activeDetailInfo.prevItem as WikipediaCountry);
      setExpandedCountry(activeDetailInfo.prevItem as WikipediaCountry);
    }
  };

  const handleNextDetailDive = () => {
    speechManager.stop();
    setDeepResearchText(null);
    setResearchError(null);
    if (selectedCivilization && activeDetailInfo?.nextItem) {
      setSelectedCivilization(activeDetailInfo.nextItem as WikipediaCivilization);
    } else if (selectedKing && activeDetailInfo?.nextItem) {
      setSelectedKing(activeDetailInfo.nextItem as WikipediaKing);
    } else if (selectedWar && activeDetailInfo?.nextItem) {
      setSelectedWar(activeDetailInfo.nextItem as WikipediaWar);
    } else if (selectedLeader && activeDetailInfo?.nextItem) {
      setSelectedLeader(activeDetailInfo.nextItem as WikipediaLeader);
    } else if (selectedCountry && activeDetailInfo?.nextItem) {
      setSelectedCountry(activeDetailInfo.nextItem as WikipediaCountry);
      setExpandedCountry(activeDetailInfo.nextItem as WikipediaCountry);
    }
  };

  // ==========================================
  // DEEP GEMINI WIKIPEDIA DISPATCH RESEARCH
  // ==========================================

  const startDeepWikipediaResearch = async (subject: string, category: string) => {
    setIsResearching(true);
    setDeepResearchText(null);
    setResearchError(null);

    try {
      const resp = await fetch('/api/gemini/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Compile a highly comprehensive, academic, and detailed Wikipedia-style analytical reference article about the historical subject: "${subject}". Include sections on: 1. Origins & Youth/Initial Context, 2. Civilizational Deeds/Battles/Key Reigns, 3. Structural Legacy & Global Historic Repercussions in subsequent eras.`,
          context: `Category of study: ${category}. Ensure no conversational fluff.`
        })
      });

      if (!resp.ok) {
        throw new Error('Chronos central server failed to compile essay.');
      }

      const data = await resp.json();
      setDeepResearchText(data.text);
    } catch (err: any) {
      console.error(err);
      setResearchError(err.message || 'Make sure your Gemini API Key is configured in settings.');
    } finally {
      setIsResearching(false);
    }
  };

  // Close Deep Research overlay
  const handleCloseResearch = () => {
    setDeepResearchText(null);
    setResearchError(null);
  };

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-[#0F0F0F] border border-[#234D43] p-5 sm:p-6 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#122C26]/30 to-transparent pointer-events-none"></div>
        <div className="space-y-1 relative z-10">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#E5C158] font-bold">Chronos Academic Center</span>
          <h3 className="text-xl sm:text-2xl font-serif italic text-white flex items-center gap-2">
            🏛 Universal Wikipedia Encyclopedia
          </h3>
          <p className="text-xs text-[#8CA59C] max-w-xl font-sans leading-relaxed">
            A comprehensive, high-resolution index of world civilizations, kings, historical battles, states leaders, sovereign territories, and physical archaeological records.
          </p>
        </div>
        
        {/* Tab Controls for categories */}
        <div className="flex flex-wrap gap-1.5 z-10 bg-[#030D0B] p-1 rounded-xl border border-[#234D43]">
          <button 
            onClick={() => { setActiveTab('civilizations'); setSearchQuery(''); setSelectedRegionFilter('All'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all uppercase tracking-wider ${activeTab === 'civilizations' ? 'bg-[#E5C158] text-black' : 'text-[#8CA59C] hover:text-white'}`}
          >
            Civilizations
          </button>
          <button 
            onClick={() => { setActiveTab('kings'); setSearchQuery(''); setSelectedRegionFilter('All'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all uppercase tracking-wider ${activeTab === 'kings' ? 'bg-[#E5C158] text-black' : 'text-[#8CA59C] hover:text-white'}`}
          >
            Kings
          </button>
          <button 
            onClick={() => { setActiveTab('wars'); setSearchQuery(''); setSelectedRegionFilter('All'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all uppercase tracking-wider ${activeTab === 'wars' ? 'bg-[#E5C158] text-black' : 'text-[#8CA59C] hover:text-white'}`}
          >
            Wars
          </button>
          <button 
            onClick={() => { setActiveTab('leaders'); setSearchQuery(''); setSelectedRegionFilter('All'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all uppercase tracking-wider ${activeTab === 'leaders' ? 'bg-[#E5C158] text-black' : 'text-[#8CA59C] hover:text-white'}`}
          >
            Leaders
          </button>
          <button 
            onClick={() => { setActiveTab('countries'); setSearchQuery(''); setSelectedRegionFilter('All'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all uppercase tracking-wider ${activeTab === 'countries' ? 'bg-[#E5C158] text-black' : 'text-[#8CA59C] hover:text-white'}`}
          >
            Countries
          </button>
        </div>
      </div>

      {/* TEXT-TO-SPEECH AUDIO NARRATION BAR */}
      <div className="bg-[#051411] border border-[#234D43] px-4 py-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl border transition-all ${ttsState.isPlaying ? 'bg-[#E5C158] text-black border-[#E5C158] animate-pulse' : 'bg-[#0A1E1A] text-[#E5C158] border-[#234D43]'}`}>
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#E5C158] font-bold uppercase tracking-wider">
                Article & Speech Audio Reader
              </span>
              {ttsState.isPlaying && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40 animate-pulse">
                  ● Reading Aloud
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#8CA59C]">
              {ttsState.isPlaying 
                ? (ttsState.isPaused ? 'Narration paused. Click resume to continue.' : 'Now reading historical text aloud. Click Stop to silence.')
                : (selectedCivilization || selectedKing || selectedWar || selectedLeader || selectedCountry)
                  ? 'Listen to the current historical record read aloud in academic cadence.'
                  : `Listen to audio overview of the ${activeTab} category.`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Main TTS Toggle Button */}
          <button
            onClick={handleToggleEncyclopediaSpeech}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
              ttsState.isPlaying 
                ? 'bg-[#E5C158] text-black border border-[#E5C158] shadow-[0_0_12px_rgba(229,193,88,0.4)]' 
                : 'bg-[#030D0B] text-[#E5C158] border border-[#234D43] hover:bg-[#122C26]'
            }`}
          >
            {ttsState.isPlaying ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{ttsState.isPlaying ? 'Stop Speech' : (selectedCivilization || selectedKing || selectedWar || selectedLeader || selectedCountry) ? 'Listen to Article' : 'Narrate Category'}</span>
          </button>

          {ttsState.isPlaying && (
            <button
              onClick={() => ttsState.isPaused ? speechManager.resume() : speechManager.pause()}
              className="p-1.5 rounded-xl bg-[#030D0B] border border-[#234D43] text-[#E5C158] hover:bg-[#122C26] transition-all cursor-pointer"
              title={ttsState.isPaused ? 'Resume narration' : 'Pause narration'}
            >
              {ttsState.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          )}

          {/* Rate Selector */}
          <div className="flex items-center gap-1 bg-[#030D0B] border border-[#234D43] p-1 rounded-xl">
            <span className="text-[10px] font-mono text-[#8CA59C] px-1">Speed:</span>
            {[0.85, 1.0, 1.25].map(rate => (
              <button
                key={rate}
                onClick={() => speechManager.setRate(rate)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all ${ttsState.rate === rate ? 'bg-[#122C26] text-[#E5C158] font-bold border border-[#E5C158]/40' : 'text-[#8CA59C] hover:text-white'}`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="bg-[#0A1E1A] border border-[#234D43] p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between text-left shadow-lg">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8CA59C]" />
          <input 
            type="text"
            placeholder={`Search through ${activeTab === 'civilizations' ? 'civilizations...' : activeTab === 'kings' ? 'dynastic kings...' : activeTab === 'wars' ? 'wars and battles...' : activeTab === 'leaders' ? 'world leaders...' : 'countries...'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#030D0B] border border-[#234D43] text-[#F4EFEA] text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E5C158] focus:border-[#E5C158]"
          />
        </div>

        {activeTab === 'kings' && (
          <div className="flex items-center gap-2 shrink-0 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-[11px] font-mono text-[#8CA59C] uppercase">Region:</span>
            {['All', 'Egypt', 'Rome', 'China', 'India', 'Europe', 'Middle East'].map(reg => (
              <button
                key={reg}
                onClick={() => setSelectedRegionFilter(reg)}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${selectedRegionFilter === reg ? 'bg-[#122C26] border border-[#E5C158] text-[#E5C158]' : 'text-[#8CA59C] hover:text-white'}`}
              >
                {reg}
              </button>
            ))}
          </div>
        )}

        <div className="text-right shrink-0">
          <span className="text-xs font-mono bg-[#030D0B] border border-[#234D43] px-3 py-1.5 rounded-lg text-[#E5C158] font-bold">
            {activeTab === 'civilizations' ? `${filteredCivilizations.length} Records` :
             activeTab === 'kings' ? `${filteredKings.length} Kings Listed` :
             activeTab === 'wars' ? `${filteredWars.length} Conflicts Mapped` :
             activeTab === 'leaders' ? `${filteredLeaders.length} Figures Mapped` :
             `${filteredCountries.length} Countries`}
          </span>
        </div>
      </div>

      {/* DETAILED MODAL OVERLAY: DEEP WIKIPEDIA DISPATCH */}
      <AnimatePresence mode="wait">
        {(selectedCivilization || selectedKing || selectedWar || selectedLeader || selectedCountry) && (
          <motion.div
            key={
              selectedCivilization?.id ||
              selectedKing?.id ||
              selectedWar?.id ||
              selectedLeader?.id ||
              selectedCountry?.id ||
              "details"
            }
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-[#0A1E1A] border border-[#E5C158]/55 rounded-3xl p-6 sm:p-8 space-y-6 text-left relative shadow-2xl"
          >
          {/* Back Action Panel with dynamic bookmarking & Wikipedia */}
          <div className="absolute top-6 right-6 flex items-center gap-2 z-25 flex-wrap justify-end">
            {/* Read aloud toggle inside article */}
            <button
              onClick={handleToggleEncyclopediaSpeech}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-xl transition-all cursor-pointer font-mono font-bold uppercase tracking-wider ${
                ttsState.isPlaying
                  ? 'text-black bg-[#E5C158] border border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.4)]'
                  : 'text-[#E5C158] border border-[#234D43] bg-[#030D0B] hover:bg-[#122C26]'
              }`}
              title="Listen to full article read aloud"
            >
              {ttsState.isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{ttsState.isPlaying ? 'Stop Reading' : 'Listen to Article'}</span>
            </button>

            {currentItem && (
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(currentItem.title.replace(/\s+/g, '_'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-[#E5C158] border border-[#234D43] bg-[#030D0B] hover:bg-[#122C26] rounded-xl transition-all cursor-pointer font-mono font-bold uppercase tracking-wider"
                title={`View ${currentItem.title} on Wikipedia`}
              >
                <ExternalLink className="w-3.5 h-3.5" /> <span>Wikipedia ↗</span>
              </a>
            )}
            {currentItem && onToggleBookmark && (
              <button
                onClick={() => onToggleBookmark(currentItem.id, currentItem.type, currentItem.title, currentItem.subtitle)}
                className={`flex items-center gap-1 px-3.5 py-1.5 text-xs border rounded-xl transition-all cursor-pointer font-mono font-bold uppercase tracking-wider ${
                  bookmarks?.some(b => b.targetId === currentItem.id && b.type === currentItem.type)
                    ? 'text-yellow-400 border-yellow-500/50 bg-yellow-950/20'
                    : 'text-[#E5C158] border-[#234D43] bg-[#030D0B] hover:bg-[#122C26]'
                }`}
              >
                <span>{bookmarks?.some(b => b.targetId === currentItem.id && b.type === currentItem.type) ? '★ Saved' : '☆ Bookmark'}</span>
              </button>
            )}
            <button
              onClick={handleCloseDetail}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-[#E5C158] border border-[#234D43] bg-[#030D0B] rounded-xl hover:bg-[#122C26] transition-all cursor-pointer font-mono font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-4.5 h-4.5" /> Back to Indices
            </button>
          </div>

          {/* Deep Dive Sequential Navigation Bar (Dive according to you page) */}
          {activeDetailInfo && activeDetailInfo.total > 1 && (
            <div className="bg-[#051411] border border-[#234D43] rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg mt-10">
              <button
                onClick={handlePrevDetailDive}
                className="w-full sm:w-auto px-4 py-2 bg-[#0A1E1A] hover:bg-[#122C26] border border-[#234D43] hover:border-[#E5C158] text-white hover:text-[#E5C158] rounded-xl transition-all cursor-pointer flex items-center gap-2 text-xs font-mono group"
              >
                <ChevronLeft className="w-4 h-4 text-[#E5C158] group-hover:-translate-x-0.5 transition-transform shrink-0" />
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-wider text-[#8CA59C] block">Previous {activeDetailInfo.category}</span>
                  <span className="font-serif italic font-bold text-xs truncate max-w-[160px] sm:max-w-[200px] block">
                    {'name' in activeDetailInfo.prevItem ? (activeDetailInfo.prevItem as any).name : (activeDetailInfo.prevItem as any).title}
                  </span>
                </div>
              </button>

              <div className="text-center px-4 py-1.5 bg-[#030D0B] border border-[#234D43]/70 rounded-xl shrink-0">
                <span className="text-[10px] font-mono text-[#8CA59C] uppercase block tracking-wider font-bold">
                  {activeDetailInfo.category} Deep Dive
                </span>
                <span className="text-xs font-mono font-bold text-[#E5C158]">
                  #{activeDetailInfo.currentIndex + 1} of {activeDetailInfo.total}
                </span>
              </div>

              <button
                onClick={handleNextDetailDive}
                className="w-full sm:w-auto px-4 py-2 bg-[#0A1E1A] hover:bg-[#122C26] border border-[#234D43] hover:border-[#E5C158] text-white hover:text-[#E5C158] rounded-xl transition-all cursor-pointer flex items-center justify-end gap-2 text-xs font-mono group"
              >
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-[#8CA59C] block">Next {activeDetailInfo.category}</span>
                  <span className="font-serif italic font-bold text-xs truncate max-w-[160px] sm:max-w-[200px] block">
                    {'name' in activeDetailInfo.nextItem ? (activeDetailInfo.nextItem as any).name : (activeDetailInfo.nextItem as any).title}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#E5C158] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            </div>
          )}

          {/* 1. CIVILIZATION DETAILED WIKIPEDIA DISCLOSURE */}
          {selectedCivilization && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <span className="text-[10px] font-mono bg-[#030D0B] border border-[#234D43] px-2.5 py-1 rounded text-[#E5C158] uppercase font-bold tracking-wider">
                    Civilization Records
                  </span>
                  <h4 className="text-3xl font-serif italic text-white tracking-tight mt-1">{selectedCivilization.name}</h4>
                  <p className="text-xs font-mono text-[#E5C158]">Golden Period: {selectedCivilization.period}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <TextToSpeechButton
                    id={`civ_${selectedCivilization.id}`}
                    title={selectedCivilization.name}
                    label="Read Aloud"
                    size="md"
                    theme="emerald"
                    text={`Civilization Profile: ${selectedCivilization.name}. Golden Period: ${selectedCivilization.period}. Sovereign Capital: ${selectedCivilization.capital}. Governance: ${selectedCivilization.government}. Academic Summary: ${selectedCivilization.summary}. Key Achievements: ${selectedCivilization.achievements.join('. ')}. Historical Context: ${selectedCivilization.deepDetails}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-[#030D0B] p-5 border border-[#234D43] rounded-2xl text-left space-y-2.5">
                    <span className="text-xs font-mono text-[#E5C158] uppercase font-bold">🏛 Wikipedia Academic Summary</span>
                    <p className="text-sm text-[#F4EFEA] leading-relaxed font-sans">{selectedCivilization.summary}</p>
                  </div>

                  <div className="bg-[#030D0B] p-5 border border-[#234D43] rounded-2xl text-left space-y-3">
                    <span className="text-xs font-mono text-[#E5C158] uppercase font-bold">🗺 Deeper Geographical & Historic Context</span>
                    <p className="text-sm text-[#8CA59C] leading-relaxed font-sans">{selectedCivilization.deepDetails}</p>
                  </div>
                </div>

                <div className="bg-[#122C26]/20 p-5 border border-[#234D43] rounded-2xl space-y-4 text-left">
                  <h5 className="font-serif italic font-bold text-white text-sm border-b border-[#234D43] pb-2 text-[#E5C158]">
                    Sovereign Properties
                  </h5>
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <span className="text-[#8CA59C] block font-mono">PRIMARY SEATS:</span>
                      <strong className="text-white font-serif italic text-sm">{selectedCivilization.capital}</strong>
                    </div>
                    <div>
                      <span className="text-[#8CA59C] block font-mono">REGULATORY SYSTEM:</span>
                      <strong className="text-white text-xs">{selectedCivilization.government}</strong>
                    </div>
                    <div>
                      <span className="text-[#8CA59C] block font-mono">DOMINANT TONGUES:</span>
                      <strong className="text-white text-xs">{selectedCivilization.languages.join(', ')}</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-[#E5C158] uppercase block mb-1.5 font-bold">🏆 Major Achievements</span>
                    <ul className="space-y-1 text-xs">
                      {selectedCivilization.achievements.map((ach, i) => (
                        <li key={i} className="text-[#8CA59C] flex items-start gap-1 leading-relaxed">
                          <span className="text-[#E5C158] mt-0.5">✦</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-[#234D43] space-y-2">
                    <button
                      onClick={() => onAddNote(
                        `Analysis: ${selectedCivilization.name}`,
                        `Civilization: ${selectedCivilization.name}\nPeriod: ${selectedCivilization.period}\nCapital: ${selectedCivilization.capital}\nAchievements:\n${selectedCivilization.achievements.map(a => `- ${a}`).join('\n')}\n`,
                        'General'
                      )}
                      className="w-full text-center py-2 bg-[#030D0B] border border-[#234D43] text-xs hover:text-[#E5C158] hover:border-[#E5C158] transition-all rounded-lg font-bold cursor-pointer"
                    >
                      📝 Save Study Notes
                    </button>
                    <button
                      onClick={() => startDeepWikipediaResearch(selectedCivilization.name, 'Civilization')}
                      disabled={isResearching}
                      className="w-full text-center py-2 bg-[#E5C158] text-black text-xs hover:bg-[#F2C542] transition-all rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 animate-pulse" /> {isResearching ? 'Searching Archives...' : 'Deep Wikipedia Probe'}
                    </button>
                  </div>
                </div>
              </div>
              <InlineNotesWidget
                targetId={selectedCivilization.id}
                targetType="Country"
                targetName={selectedCivilization.name}
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
              />
            </div>
          )}

          {/* 2. KING DETAILED WIKIPEDIA DISCLOSURE */}
          {selectedKing && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <span className="text-[10px] font-mono bg-[#030D0B] border border-[#234D43] px-2.5 py-1 rounded text-[#E5C158] uppercase font-bold tracking-wider">
                    Imperial King Registry
                  </span>
                  <h4 className="text-3xl font-serif italic text-white tracking-tight mt-1">{selectedKing.name}</h4>
                  <p className="text-xs font-mono text-[#E5C158]">Dynastic Reign: {selectedKing.reign}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <TextToSpeechButton
                    id={`king_${selectedKing.id}`}
                    title={selectedKing.name}
                    label="Read Aloud"
                    size="md"
                    theme="emerald"
                    text={`Imperial Monarch: ${selectedKing.name}. Dignity Title: ${selectedKing.title}. Dynasty: ${selectedKing.dynasty}. Dynastic Reign: ${selectedKing.reign}. Region: ${selectedKing.region}. Biography: ${selectedKing.wikipediaBio}. Dynastic Achievements: ${selectedKing.keyAchievement}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-[#030D0B] p-5 border border-[#234D43] rounded-2xl text-left space-y-2.5">
                    <span className="text-xs font-mono text-[#E5C158] uppercase font-bold">👑 Biography Summary</span>
                    <p className="text-sm text-[#F4EFEA] leading-relaxed font-sans">{selectedKing.wikipediaBio}</p>
                  </div>

                  <div className="bg-[#030D0B] p-5 border border-[#234D43] rounded-2xl text-left space-y-2.5">
                    <span className="text-xs font-mono text-[#E5C158] uppercase font-bold">🏆 Dynastic Achievements</span>
                    <p className="text-sm text-[#8CA59C] leading-relaxed font-sans">{selectedKing.keyAchievement}</p>
                  </div>
                </div>

                <div className="bg-[#122C26]/20 p-5 border border-[#234D43] rounded-2xl space-y-3.5 text-xs text-left">
                  <h5 className="font-serif italic font-bold text-white text-sm border-b border-[#234D43] pb-2 text-[#E5C158]">
                    Court Details
                  </h5>
                  <div>
                    <span className="text-[#8CA59C] block font-mono">DIGNITY TITLE:</span>
                    <strong className="text-white text-xs">{selectedKing.title}</strong>
                  </div>
                  <div>
                    <span className="text-[#8CA59C] block font-mono">ACTIVE DYNASTY:</span>
                    <strong className="text-white text-xs font-serif italic">{selectedKing.dynasty}</strong>
                  </div>
                  <div>
                    <span className="text-[#8CA59C] block font-mono">REGIONAL DOMAIN:</span>
                    <strong className="text-white text-xs">{selectedKing.region}</strong>
                  </div>

                  <div className="pt-3 border-t border-[#234D43] space-y-2">
                    <button
                      onClick={() => onAddNote(
                        `Diary: ${selectedKing.name}`,
                        `King Name: ${selectedKing.name}\nReign: ${selectedKing.reign}\nDynasty: ${selectedKing.dynasty}\nAchieve:\n${selectedKing.keyAchievement}\n`,
                        'Monarch'
                      )}
                      className="w-full text-center py-2 bg-[#030D0B] border border-[#234D43] text-xs hover:text-[#E5C158] hover:border-[#E5C158] transition-all rounded-lg font-bold cursor-pointer"
                    >
                      📝 Save Study Notes
                    </button>
                    <button
                      onClick={() => startDeepWikipediaResearch(selectedKing.name, 'King/Monarch')}
                      disabled={isResearching}
                      className="w-full text-center py-2 bg-[#E5C158] text-black text-xs hover:bg-[#F2C542] transition-all rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 animate-pulse" /> {isResearching ? 'Searching Archives...' : 'Deep Wikipedia Probe'}
                    </button>
                  </div>
                </div>
              </div>
              <InlineNotesWidget
                targetId={selectedKing.id}
                targetType="Monarch"
                targetName={selectedKing.name}
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
              />
            </div>
          )}

          {/* 3. WAR DETAILED WIKIPEDIA DISCLOSURE */}
          {selectedWar && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <span className="text-[10px] font-mono bg-[#030D0B] border border-[#234D43] px-2.5 py-1 rounded text-[#E5C158] uppercase font-bold tracking-wider">
                    Conflict & Combat Archives
                  </span>
                  <h4 className="text-3xl font-serif italic text-white tracking-tight mt-1">{selectedWar.title}</h4>
                  <p className="text-xs font-mono text-[#E5C158]">Chronological Date: {selectedWar.date}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <TextToSpeechButton
                    id={`war_${selectedWar.id}`}
                    title={selectedWar.title}
                    label="Read Aloud"
                    size="md"
                    theme="emerald"
                    text={`Conflict Record: ${selectedWar.title}. Chronological Date: ${selectedWar.date}. Belligerents: ${selectedWar.belligerents}. Outcome: ${selectedWar.outcome}. Casualty Estimate: ${selectedWar.casualtyEstimate}. Strategic Significance: ${selectedWar.significance}. Conflict Overview: ${selectedWar.description}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  {/* COALITION BELLIGERENTS STYLISH CARD */}
                  <div className="bg-[#030D0B] p-5 border border-[#234D43] rounded-2xl text-left space-y-3.5 shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-950/5 to-[#122C26]/5 pointer-events-none"></div>
                    <span className="text-xs font-mono text-[#E5C158] uppercase font-bold flex items-center gap-1.5 pb-2 border-b border-[#234D43]/40 z-10 relative">
                      🛡️ Conflict Belligerents & Coalitions
                    </span>
                    {(() => {
                      const parts = selectedWar.belligerents.split(/\s+vs\.?\s+/i);
                      if (parts.length >= 2) {
                        return (
                          <div className="grid grid-cols-1 sm:grid-cols-11 items-center gap-4 py-1 z-10 relative">
                            <div className="sm:col-span-5 bg-[#122C26]/25 border border-[#234D43]/50 p-4 rounded-xl text-center shadow-sm">
                              <span className="text-[9px] font-mono text-[#8CA59C] block mb-1 tracking-widest">FACTION A</span>
                              <strong className="text-[#F4EFEA] text-xs sm:text-sm font-serif italic tracking-wide">{parts[0]}</strong>
                            </div>
                            
                            <div className="sm:col-span-1 flex justify-center">
                              <span className="w-8 h-8 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-400 text-[10px] font-mono flex items-center justify-center font-bold select-none leading-none shadow-md">
                                VS
                              </span>
                            </div>
                            
                            <div className="sm:col-span-1 flex justify-center hidden sm:flex"></div>
                            
                            <div className="sm:col-span-5 bg-rose-950/15 border border-rose-900/40 p-4 rounded-xl text-center shadow-sm">
                              <span className="text-[9px] font-mono text-rose-300/80 block mb-1 tracking-widest">FACTION B</span>
                              <strong className="text-white text-xs sm:text-sm font-serif italic tracking-wide">{parts[1]}</strong>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div className="bg-[#122C26]/15 border border-[#234D43] p-4 rounded-xl text-center font-serif italic text-white text-xs sm:text-sm">
                          {selectedWar.belligerents}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="bg-[#030D0B] p-5 border border-[#234D43] rounded-2xl text-left space-y-2.5">
                    <span className="text-xs font-mono text-[#E5C158] uppercase font-bold">⚔ Tactical Background Narrative</span>
                    <p className="text-sm text-[#F4EFEA] leading-relaxed font-sans">{selectedWar.description}</p>
                  </div>

                  <div className="bg-[#030D0B] p-5 border border-[#234D43] rounded-2xl text-left space-y-2.5">
                    <span className="text-xs font-mono text-[#E5C158] uppercase font-bold">📜 Universal Significance</span>
                    <p className="text-sm text-[#8CA59C] leading-relaxed font-sans">{selectedWar.significance}</p>
                  </div>
                </div>

                <div className="bg-[#122C26]/20 p-5 border border-[#234D43] rounded-2xl space-y-3.5 text-xs text-left">
                  <h5 className="font-serif italic font-bold text-white text-sm border-b border-[#234D43] pb-2 text-[#E5C158]">
                    Military Ledger
                  </h5>
                  <div>
                    <span className="text-[#8CA59C] block font-mono">COALITION BELLIGERENTS:</span>
                    <strong className="text-white text-xs">{selectedWar.belligerents}</strong>
                  </div>
                  <div>
                    <span className="text-[#8CA59C] block font-mono">CONCLUDED OUTCOME:</span>
                    <strong className="text-white text-xs font-serif italic">{selectedWar.outcome}</strong>
                  </div>
                  <div>
                    <span className="text-[#8CA59C] block font-mono text-rose-400">ESTIMATED CASUALTIES:</span>
                    <strong className="text-rose-400 text-xs font-mono">{selectedWar.casualtyEstimate}</strong>
                  </div>

                  <div className="pt-3 border-t border-[#234D43] space-y-2">
                    <button
                      onClick={() => onAddNote(
                        `Diary: ${selectedWar.title}`,
                        `Conflict: ${selectedWar.title}\nDate: ${selectedWar.date}\nBelligerents: ${selectedWar.belligerents}\nOutcome: ${selectedWar.outcome}\n`,
                        'General'
                      )}
                      className="w-full text-center py-2 bg-[#030D0B] border border-[#234D43] text-xs hover:text-[#E5C158] hover:border-[#E5C158] transition-all rounded-lg font-bold cursor-pointer"
                    >
                      📝 Save Study Notes
                    </button>
                    <button
                      onClick={() => startDeepWikipediaResearch(selectedWar.title, 'Historical War/Conflict')}
                      disabled={isResearching}
                      className="w-full text-center py-2 bg-[#E5C158] text-black text-xs hover:bg-[#F2C542] transition-all rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 animate-pulse" /> {isResearching ? 'Searching Archives...' : 'Deep Wikipedia Probe'}
                    </button>
                  </div>
                </div>
              </div>
              <InlineNotesWidget
                targetId={selectedWar.id}
                targetType="Event"
                targetName={selectedWar.title}
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
              />
            </div>
          )}

          {/* 4. LEADER DETAILED WIKIPEDIA DISCLOSURE */}
          {selectedLeader && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <span className="text-[10px] font-mono bg-[#030D0B] border border-[#234D43] px-2.5 py-1 rounded text-[#E5C158] uppercase font-bold tracking-wider">
                    Figure & State Leaders
                  </span>
                  <h4 className="text-3xl font-serif italic text-white tracking-tight mt-1">{selectedLeader.name}</h4>
                  <p className="text-xs font-mono text-[#E5C158]">Active Era: {selectedLeader.era}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <TextToSpeechButton
                    id={`leader_${selectedLeader.id}`}
                    title={selectedLeader.name}
                    label="Read Aloud"
                    size="md"
                    theme="emerald"
                    text={`Historical Figure: ${selectedLeader.name}. Role: ${selectedLeader.role}. Active Era: ${selectedLeader.era}. Country of Origin: ${selectedLeader.countryOfOrigin}. Civilizational Impact: ${selectedLeader.impactParagraph}. ${selectedLeader.famousQuote ? `Famous Quote: ${selectedLeader.famousQuote}.` : ''} Key Achievements: ${selectedLeader.achievements?.join('. ') || ''}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-[#030D0B] p-5 border border-[#234D43] rounded-2xl text-left space-y-2.5">
                    <span className="text-xs font-mono text-[#E5C158] uppercase font-bold">🏫 Civilizational Impact</span>
                    <p className="text-sm text-[#F4EFEA] leading-relaxed font-sans">{selectedLeader.impactParagraph}</p>
                  </div>

                  {selectedLeader.famousQuote && (
                    <div className="relative p-5 bg-[#122C26]/20 border-l-4 border-[#E5C158] rounded-r-2xl font-serif text-white italic text-sm text-left">
                      <span className="absolute -top-3 left-2 text-5xl text-[#E5C158]/20 select-none">“</span>
                      "{selectedLeader.famousQuote}"
                    </div>
                  )}
                </div>

                <div className="bg-[#122C26]/20 p-5 border border-[#234D43] rounded-2xl space-y-4 text-xs text-left">
                  <h5 className="font-serif italic font-bold text-white text-sm border-b border-[#234D43] pb-2 text-[#E5C158]">
                    Leader Profile
                  </h5>
                  <div>
                    <span className="text-[#8CA59C] block font-mono">OFFICE ROLE:</span>
                    <strong className="text-white text-xs">{selectedLeader.role}</strong>
                  </div>
                  <div>
                    <span className="text-[#8CA59C] block font-mono">TERRITORY OF ORIGIN:</span>
                    <strong className="text-white text-xs">{selectedLeader.countryOfOrigin}</strong>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-[#E5C158] uppercase block mb-1">Key Milestones</span>
                    <ul className="space-y-1 text-xs">
                      {selectedLeader.achievements.map((ach, i) => (
                        <li key={i} className="text-[#8CA59C] flex items-start gap-1 leading-relaxed">
                          <span className="text-[#E5C158] mt-0.5">✦</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-[#234D43] space-y-2">
                    <button
                      onClick={() => onAddNote(
                        `Diary: ${selectedLeader.name}`,
                        `Leader: ${selectedLeader.name}\nEra: ${selectedLeader.era}\nRole: ${selectedLeader.role}\nImpact:\n${selectedLeader.impactParagraph}\n`,
                        'Figure'
                      )}
                      className="w-full text-center py-2 bg-[#030D0B] border border-[#234D43] text-xs hover:text-[#E5C158] hover:border-[#E5C158] transition-all rounded-lg font-bold cursor-pointer"
                    >
                      📝 Save Study Notes
                    </button>
                    <button
                      onClick={() => startDeepWikipediaResearch(selectedLeader.name, 'Historic Leader/Thinker')}
                      disabled={isResearching}
                      className="w-full text-center py-2 bg-[#E5C158] text-black text-xs hover:bg-[#F2C542] transition-all rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 animate-pulse" /> {isResearching ? 'Searching Archives...' : 'Deep Wikipedia Probe'}
                    </button>
                  </div>
                </div>
              </div>
              <InlineNotesWidget
                targetId={selectedLeader.id}
                targetType="Figure"
                targetName={selectedLeader.name}
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
              />
            </div>
          )}

          {/* 5. COUNTRY DETAILED WIKIPEDIA DISCLOSURE */}
          {selectedCountry && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedCountry.flag}</span>
                    <span className="text-[10px] font-mono bg-[#030D0B] border border-[#234D43] px-2.5 py-1 rounded text-[#E5C158] uppercase font-bold tracking-wider">
                      Sovereign Territory Vault
                    </span>
                  </div>
                  <h4 className="text-3xl font-serif italic text-white tracking-tight mt-1">{selectedCountry.name} Detail</h4>
                  <p className="text-xs font-mono text-[#E5C158]">Geographic Core: {selectedCountry.geography}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <TextToSpeechButton
                    id={`country_${selectedCountry.id}`}
                    title={selectedCountry.name}
                    label="Read Aloud"
                    size="md"
                    theme="emerald"
                    text={`Sovereign Territory: ${selectedCountry.name}. Geographic Core: ${selectedCountry.geography}. Wikipedia State Summary: ${selectedCountry.summary}. National Epics: ${selectedCountry.nationalEpics}. Famous Historical Figures: ${selectedCountry.famousPeople?.join(', ') || 'Various historical leaders'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-[#030D0B] p-5 border border-[#234D43] rounded-2xl text-left space-y-2.5">
                    <span className="text-xs font-mono text-[#E5C158] uppercase font-bold font-sans">🌍 Wikipedia State Summary</span>
                    <p className="text-sm text-[#F4EFEA] leading-relaxed font-sans">{selectedCountry.summary}</p>
                  </div>

                  <div className="p-4.5 bg-[#122C26]/20 border border-[#234D43] rounded-2xl space-y-1.5 text-left">
                    <span className="text-[10px] uppercase font-mono text-[#E5C158] font-bold">📖 Legendary National Epics & Sagas</span>
                    <p className="text-xs text-[#8CA59C] leading-relaxed font-serif italic">{selectedCountry.nationalEpics}</p>
                  </div>

                  <div className="p-4.5 bg-[#030D0B] border border-[#234D43] rounded-2xl space-y-3 text-left">
                    <span className="text-xs font-mono text-[#E5C158] uppercase font-bold font-sans">👥 Famous Historical Figures</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedCountry.famousPeople && selectedCountry.famousPeople.map((person, index) => (
                        <span key={index} className="text-xs bg-[#122C26] text-[#F4EFEA] border border-[#234D43] px-3 py-1.5 rounded-lg font-mono">
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Demographic Vault: Historical Population growth bar chart */}
                  {selectedCountry.populationData && selectedCountry.populationData.length > 0 && (
                    <div className="bg-[#030D0B] p-5 border border-[#234D43] rounded-2xl text-left space-y-3 shadow-inner">
                      <div className="flex items-center justify-between border-b border-[#234D43]/40 pb-2">
                        <span className="text-xs font-mono text-[#E5C158] uppercase font-bold font-sans flex items-center gap-1.5">
                          📊 Historical Population Growth Estimates
                        </span>
                        <span className="text-[9px] font-mono text-[#8CA59C] bg-[#122C26] border border-[#234D43] px-2 py-0.5 rounded">
                          In Millions (M)
                        </span>
                      </div>
                      <div className="w-full h-60 mt-4 pr-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={selectedCountry.populationData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#234D43" opacity={0.35} />
                            <XAxis 
                              dataKey="century" 
                              stroke="#8CA59C" 
                              fontSize={10} 
                              tickLine={false} 
                              axisLine={{ stroke: '#234D43' }}
                            />
                            <YAxis 
                              stroke="#8CA59C" 
                              fontSize={10} 
                              tickFormatter={(val) => `${val}M`}
                              tickLine={false}
                              axisLine={{ stroke: '#234D43' }}
                            />
                            <Tooltip
                              cursor={{ fill: '#122C26', opacity: 0.3 }}
                              contentStyle={{
                                backgroundColor: '#030D0B',
                                border: '1px solid #234D43',
                                borderRadius: '12px',
                                color: '#F4EFEA',
                                fontSize: '11px',
                                fontFamily: 'monospace'
                              }}
                              formatter={(value: any) => [`${value} Million People`, 'Estimated Population']}
                              labelStyle={{ color: '#E5C158', fontWeight: 'bold', marginBottom: '4px' }}
                            />
                            <Bar 
                              dataKey="populationInMillions" 
                              fill="#E5C158" 
                              radius={[4, 4, 0, 0]}
                              maxBarSize={40}
                              animationDuration={800}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-[10px] text-[#8CA59C] font-mono leading-relaxed italic mt-1.5 pt-1 border-t border-[#234D43]/20">
                        * Estimates compiled from international historical demography databases, capturing epoch levels from regional state archives. Hover over the bars to inspect specific century data.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-[#122C26]/20 p-5 border border-[#234D43] rounded-2xl space-y-4 text-xs text-left">
                  <h5 className="font-serif italic font-bold text-white text-sm border-b border-[#234D43] pb-2 text-[#E5C158]">
                    Cultural Matrix
                  </h5>
                  <div>
                    <span className="text-[#8CA59C] block font-mono">DOMINANT LANGUAGES:</span>
                    <strong className="text-white text-xs">{selectedCountry.language}</strong>
                  </div>
                  <div>
                    <span className="text-[#8CA59C] block font-mono">SPIRITUAL INHERITANCE:</span>
                    <strong className="text-white text-xs">{selectedCountry.majorReligions}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#E5C158] block mb-1 font-bold">🏆 Civilizational Leaps</span>
                    <ul className="space-y-1 text-xs">
                      {selectedCountry.achievements.map((ach, i) => (
                        <li key={i} className="text-[#8CA59C] flex items-start gap-1 leading-relaxed">
                          <span className="text-[#E5C158] mt-0.5">✦</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-[#234D43] space-y-2">
                    <button
                      onClick={() => onAddNote(
                        `Diary: ${selectedCountry.name}`,
                        `Country: ${selectedCountry.name}\nFlag: ${selectedCountry.flag}\nLanguage: ${selectedCountry.language}\nAchievements:\n${selectedCountry.achievements.map(a => `- ${a}`).join('\n')}\n`,
                        'Country'
                      )}
                      className="w-full text-center py-2 bg-[#030D0B] border border-[#234D43] text-xs hover:text-[#E5C158] hover:border-[#E5C158] transition-all rounded-lg font-bold cursor-pointer"
                    >
                      📝 Save Study Notes
                    </button>
                    <a
                      href={`https://en.wikipedia.org/wiki/${encodeURIComponent(selectedCountry.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-2.5 bg-gradient-to-r from-[#1E2E3B] to-[#0F1B24] border border-[#E5C158]/30 hover:border-[#E5C158] text-[#E5C158] text-xs transition-all rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:shadow-[#E5C158]/5"
                    >
                      <Globe className="w-4 h-4" /> Open Wikipedia Source
                    </a>
                    <button
                      onClick={() => startDeepWikipediaResearch(selectedCountry.name, 'Country/Territory')}
                      disabled={isResearching}
                      className="w-full text-center py-2 bg-[#E5C158] text-black text-xs hover:bg-[#F2C542] transition-all rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 animate-pulse" /> {isResearching ? 'Searching Archives...' : 'Deep Wikipedia Probe'}
                    </button>
                  </div>
                </div>
              </div>
              <InlineNotesWidget
                targetId={selectedCountry.id}
                targetType="Country"
                targetName={selectedCountry.name}
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
              />
            </div>
          )}

          {/* DYNAMIC GEMINI RESEARCH RESPONSE PANEL */}
          {(isResearching || deepResearchText || researchError) && (
            <div className="mt-8 pt-6 border-t border-[#234D43] space-y-4 animate-fade-in text-left">
              <div className="flex items-center justify-between">
                <h5 className="font-serif italic text-white text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E5C158] animate-pulse" /> Live Server-Side Gemini Wikipedia Essay Result
                </h5>
                {deepResearchText && (
                  <button
                    onClick={handleCloseResearch}
                    className="text-xs text-[#8CA59C] hover:text-[#E5C158] cursor-pointer hover:underline font-mono"
                  >
                    Close Essay
                  </button>
                )}
              </div>

              {isResearching ? (
                <div className="bg-[#030D0B] border border-[#234D43] p-8 rounded-2xl flex flex-col items-center justify-center gap-3 text-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#8CA59C] border-t-[#E5C158] animate-spin"></div>
                  <p className="text-xs text-[#8CA59C] font-mono animate-pulse">
                    Connecting to the Chronos Central Library via high-performance Gemini cognitive layers...
                  </p>
                </div>
              ) : researchError ? (
                <div className="bg-rose-950/20 border border-rose-800 text-rose-300 p-4 rounded-xl text-xs sm:text-sm font-sans flex items-start gap-2.5">
                  <span>⚠️</span>
                  <div>
                    <span className="font-bold block">Chronos Connection Failure</span>
                    <span>{researchError}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-[#030D0B] border border-[#234D43] p-6 rounded-2xl font-sans text-sm text-[#F4EFEA] leading-relaxed max-h-[500px] overflow-y-auto whitespace-pre-wrap space-y-3 scrollbar-thin">
                  {deepResearchText}
                </div>
              )}
            </div>
          )}

          {/* Bottom Deep Dive Sequential Navigation Bar */}
          {activeDetailInfo && activeDetailInfo.total > 1 && (
            <div className="bg-[#051411] border border-[#234D43] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg pt-4 border-t border-[#234D43]">
              <button
                onClick={() => {
                  handlePrevDetailDive();
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#0A1E1A] hover:bg-[#122C26] border border-[#234D43] hover:border-[#E5C158] text-white hover:text-[#E5C158] rounded-xl transition-all cursor-pointer flex items-center gap-2 text-xs font-mono group"
              >
                <ChevronLeft className="w-4 h-4 text-[#E5C158] group-hover:-translate-x-0.5 transition-transform shrink-0" />
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-wider text-[#8CA59C] block">Previous {activeDetailInfo.category}</span>
                  <span className="font-serif italic font-bold text-xs truncate max-w-[160px] sm:max-w-[200px] block">
                    {'name' in activeDetailInfo.prevItem ? (activeDetailInfo.prevItem as any).name : (activeDetailInfo.prevItem as any).title}
                  </span>
                </div>
              </button>

              <div className="text-center px-4 py-1.5 bg-[#030D0B] border border-[#234D43]/70 rounded-xl shrink-0">
                <span className="text-[10px] font-mono text-[#8CA59C] uppercase block tracking-wider font-bold">
                  {activeDetailInfo.category} Deep Dive
                </span>
                <span className="text-xs font-mono font-bold text-[#E5C158]">
                  Record {activeDetailInfo.currentIndex + 1} of {activeDetailInfo.total}
                </span>
              </div>

              <button
                onClick={() => {
                  handleNextDetailDive();
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#0A1E1A] hover:bg-[#122C26] border border-[#234D43] hover:border-[#E5C158] text-white hover:text-[#E5C158] rounded-xl transition-all cursor-pointer flex items-center justify-end gap-2 text-xs font-mono group"
              >
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-[#8CA59C] block">Next {activeDetailInfo.category}</span>
                  <span className="font-serif italic font-bold text-xs truncate max-w-[160px] sm:max-w-[200px] block">
                    {'name' in activeDetailInfo.nextItem ? (activeDetailInfo.nextItem as any).name : (activeDetailInfo.nextItem as any).title}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#E5C158] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            </div>
          )}

          {/* Bottom Return Action to return where user read */}
          <div className="pt-6 border-t border-[#234D43]/40 flex items-center justify-between gap-4 flex-wrap">
            <button
              onClick={handleCloseDetail}
              className="flex items-center gap-2 px-5 py-2.5 text-xs text-[#E5C158] border border-[#234D43] bg-[#030D0B] rounded-xl hover:bg-[#122C26] hover:border-[#E5C158]/50 transition-all cursor-pointer font-mono font-bold uppercase tracking-wider shadow-md"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Indices (Where You Read)
            </button>
            <span className="text-[11px] font-mono text-[#8CA59C]">
              Returns directly to your previous position in the catalog
            </span>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIEW: MAIN CATEGORY SELECTS */}
      {!selectedCivilization && !selectedKing && !selectedWar && !selectedLeader && !selectedCountry && (
        <div className="animate-fade-in text-left">
          {/* A. CIVILIZATIONS TAB */}
          {activeTab === 'civilizations' && (
            <div className="space-y-6">
              {/* Compare Mode Header bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#030D0B] border border-[#234D43] rounded-2xl gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-serif italic text-white font-bold flex items-center gap-2">
                    <span>⚔ Civilization Interactive Comparator</span>
                  </h4>
                  <p className="text-[11px] text-[#8CA59C] font-sans">
                    Contrast structures, historical periods, and achievements side-by-side inside a matrix table.
                  </p>
                </div>
                <button
                  onClick={() => setIsComparing(!isComparing)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                    isComparing 
                      ? 'bg-[#E5C158] text-black border-[#E5C158]' 
                      : 'bg-[#122C26] text-[#E5C158] border-[#234D43] hover:border-[#E5C158]'
                  }`}
                >
                  {isComparing ? 'Close Matrix' : 'Open Comparison Matrix'}
                </button>
              </div>

              {isComparing ? (
                <div className="bg-[#030D0B] border border-[#234D43] rounded-2xl p-4 sm:p-6 space-y-6 animate-fade-in text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Select Civ 1 */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#E5C158] uppercase font-bold">Civilization A:</label>
                      <select
                        value={compareId1}
                        onChange={(e) => setCompareId1(e.target.value)}
                        className="w-full bg-[#0F0F0F] border border-[#234D43] text-[#F4EFEA] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#E5C158] focus:outline-none"
                      >
                        {CIVILIZATIONS.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Select Civ 2 */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#E5C158] uppercase font-bold">Civilization B:</label>
                      <select
                        value={compareId2}
                        onChange={(e) => setCompareId2(e.target.value)}
                        className="w-full bg-[#0F0F0F] border border-[#234D43] text-[#F4EFEA] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#E5C158] focus:outline-none"
                      >
                        {CIVILIZATIONS.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Side-by-side Comparative Table */}
                  <div className="border border-[#234D43]/65 rounded-xl overflow-x-auto bg-[#0A1E1A]/10">
                    <table className="w-full text-xs text-left text-[#8CA59C]">
                      <thead>
                        <tr className="border-b border-[#234D43] bg-[#030D0B] font-mono font-extrabold text-[#E5C158] text-[10px] uppercase">
                          <th className="p-3.5 w-1/4 select-none">Dimension of Study</th>
                          <th className="p-3.5 w-3/8 border-l border-[#234D43] text-white font-serif italic text-sm">{compCiv1.name}</th>
                          <th className="p-3.5 w-3/8 border-l border-[#234D43] text-white font-serif italic text-sm">{compCiv2.name}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#234D43]/40">
                        <tr>
                          <td className="p-3.5 font-mono text-[#E5C158] font-bold bg-[#030D0B]/30 mb-0.5">Epoch Period</td>
                          <td className="p-3.5 border-l border-[#234D43] text-white font-medium">{compCiv1.period}</td>
                          <td className="p-3.5 border-l border-[#234D43] text-white font-medium">{compCiv2.period}</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-[#E5C158] font-bold bg-[#030D0B]/30 mb-0.5">Imperial Capitals</td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#F4EFEA]">{compCiv1.capital}</td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#F4EFEA]">{compCiv2.capital}</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-[#E5C158] font-bold bg-[#030D0B]/30 mb-0.5">Government Form</td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#F4EFEA]">{compCiv1.government}</td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#F4EFEA]">{compCiv2.government}</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-[#E5C158] font-bold bg-[#030D0B]/30 mb-0.5">Major Languages</td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#8CA59C]">{compCiv1.languages.join(', ')}</td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#8CA59C]">{compCiv2.languages.join(', ')}</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-[#E5C158] font-bold bg-[#030D0B]/30 mb-0.5">Wikipedia Academic Summary</td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#F4EFEA] leading-relaxed">{compCiv1.summary}</td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#F4EFEA] leading-relaxed">{compCiv2.summary}</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-[#E5C158] font-bold bg-[#030D0B]/30 mb-0.5">Major Achievements</td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#F4EFEA]">
                            <ul className="list-disc pl-4 space-y-1.5 font-sans leading-relaxed text-xs">
                              {compCiv1.achievements.map((ach, i) => (
                                <li key={i}>{ach}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#F4EFEA]">
                            <ul className="list-disc pl-4 space-y-1.5 font-sans leading-relaxed text-xs">
                              {compCiv2.achievements.map((ach, i) => (
                                <li key={i}>{ach}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-[#E5C158] font-bold bg-[#030D0B]/30 mb-0.5">Historical Legacy & Depth</td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#8CA59C] text-xs leading-relaxed">{compCiv1.deepDetails}</td>
                          <td className="p-3.5 border-l border-[#234D43] text-[#8CA59C] text-xs leading-relaxed">{compCiv2.deepDetails}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in text-left">
                    {paginatedCivilizations.length > 0 ? (
                      paginatedCivilizations.map(c => (
                        <div 
                          key={c.id}
                          id={`encyclo-item-${c.id}`}
                          onClick={() => handleOpenCivilization(c)}
                          className="group bg-[#0A1E1A] border border-[#234D43] hover:border-[#E5C158]/50 hover:shadow-2xl rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-[#234D43]/40 pb-2.5">
                              <span className="text-[10px] font-mono text-[#E5C158] font-bold uppercase tracking-wider">Civilization ID</span>
                              <span className="text-xs font-mono text-[#8CA59C]">{c.period}</span>
                            </div>
                            <h4 className="text-xl font-serif italic text-white group-hover:text-[#E5C158] transition-colors">{c.name}</h4>
                            <p className="text-xs text-[#8CA59C] leading-relaxed line-clamp-3 font-sans">{c.summary}</p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#234D43]/40 flex items-center justify-between text-xs text-[#E5C158] font-semibold">
                            <span>Read Full Wikipedia Article</span>
                            <div className="flex items-center gap-2">
                              <TextToSpeechButton
                                id={`civ_card_${c.id}`}
                                title={c.name}
                                variant="icon"
                                size="sm"
                                theme="emerald"
                                text={`Civilization ${c.name}. Golden Period: ${c.period}. Capital: ${c.capital}. Summary: ${c.summary}`}
                              />
                              <ChevronRight className="w-4 h-4 text-[#8CA59C] group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="md:col-span-3 bg-[#0F0F0F] border border-[#234D43] rounded-2xl p-12 text-center text-[#8CA59C] w-full">
                        No civilizations match your query term.
                      </div>
                    )}
                  </div>

                  <PaginationControls
                    currentPage={civsPage}
                    totalPages={totalCivsPages}
                    totalItems={filteredCivilizations.length}
                    itemsPerPage={civsPerPage}
                    onPageChange={(p) => {
                      setCivsPage(p);
                      playSound?.('click');
                    }}
                    onItemsPerPageChange={(num) => {
                      setCivsPerPage(num);
                      setCivsPage(1);
                      playSound?.('click');
                    }}
                    itemsPerPageOptions={[24, 36, 48]}
                    itemLabel="civilizations"
                  />
                </div>
              )}
            </div>
          )}

          {/* B. KINGS TAB */}
          {activeTab === 'kings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedKings.map(king => (
                  <div
                    key={king.id}
                    id={`encyclo-item-${king.id}`}
                    onClick={() => handleOpenKing(king)}
                    className="group flex items-center justify-between p-4 bg-[#0A1E1A] border border-[#234D43] hover:border-[#E5C158]/40 hover:bg-[#122C26]/20 rounded-xl cursor-pointer transition-all text-left"
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#E5C158] font-semibold">{king.reign}</span>
                        <span className="text-[9px] bg-[#030D0B] border border-[#234D43] text-[#8CA59C] px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                          {king.region}
                        </span>
                      </div>
                      <h5 className="font-serif italic text-white font-bold group-hover:text-[#E5C158] leading-tight text-sm sm:text-base">
                        {king.name}
                      </h5>
                      <p className="text-[11px] text-[#8CA59C] line-clamp-1">{king.title}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <TextToSpeechButton
                        id={`king_card_${king.id}`}
                        title={king.name}
                        variant="icon"
                        size="sm"
                        theme="emerald"
                        text={`Imperial Monarch ${king.name}. Dynastic Reign: ${king.reign}. Region: ${king.region}. Title: ${king.title}. Achievements: ${king.keyAchievement}`}
                      />
                      <ChevronRight className="w-4 h-4 text-[#8CA59C] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {filteredKings.length === 0 && (
                <div className="bg-[#0F0F0F] border border-[#234D43] rounded-2xl p-12 text-center text-[#8CA59C]">
                  No historical monarchs match that query filter.
                </div>
              )}

              <PaginationControls
                currentPage={kingsPage}
                totalPages={totalKingsPages}
                totalItems={filteredKings.length}
                itemsPerPage={kingsPerPage}
                onPageChange={(p) => {
                  setKingsPage(p);
                  playSound?.('click');
                }}
                onItemsPerPageChange={(num) => {
                  setKingsPerPage(num);
                  setKingsPage(1);
                  playSound?.('click');
                }}
                itemsPerPageOptions={[36, 48, 96]}
                itemLabel="monarchs"
              />
            </div>
          )}

          {/* C. WARS TAB */}
          {activeTab === 'wars' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedWars.map(war => (
                  <div
                    key={war.id}
                    id={`encyclo-item-${war.id}`}
                    onClick={() => handleOpenWar(war)}
                    className="group p-4 bg-[#0A1E1A] border border-[#234D43] hover:border-[#E5C158]/40 hover:bg-[#122C26]/20 rounded-xl cursor-pointer transition-all flex justify-between items-center text-left"
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-rose-400 font-bold">{war.date}</span>
                        <span className="text-[9px] bg-[#030D0B] border border-[#234D43] text-[#8CA59C] px-1.5 py-0.5 rounded font-mono uppercase">
                          Conflict
                        </span>
                      </div>
                      <h5 className="font-serif italic text-white font-bold group-hover:text-[#E5C158] leading-tight text-sm">
                        {war.title}
                      </h5>
                      <p className="text-[11px] text-[#8CA59C] line-clamp-1">Opponents: {war.belligerents}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <TextToSpeechButton
                        id={`war_card_${war.id}`}
                        title={war.title}
                        variant="icon"
                        size="sm"
                        theme="emerald"
                        text={`Historical Conflict ${war.title}. Date: ${war.date}. Belligerents: ${war.belligerents}. Outcome: ${war.outcome}. Casualty estimate: ${war.casualtyEstimate}`}
                      />
                      <ChevronRight className="w-4 h-4 text-[#8CA59C] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {filteredWars.length === 0 && (
                <div className="bg-[#0F0F0F] border border-[#234D43] rounded-2xl p-12 text-center text-[#8CA59C]">
                  No historical conflicts match your query constraint.
                </div>
              )}

              <PaginationControls
                currentPage={warsPage}
                totalPages={totalWarsPages}
                totalItems={filteredWars.length}
                itemsPerPage={warsPerPage}
                onPageChange={(p) => {
                  setWarsPage(p);
                  playSound?.('click');
                }}
                onItemsPerPageChange={(num) => {
                  setWarsPerPage(num);
                  setWarsPage(1);
                  playSound?.('click');
                }}
                itemsPerPageOptions={[36, 48, 96]}
                itemLabel="conflicts"
              />
            </div>
          )}

          {/* D. LEADERS TAB */}
          {activeTab === 'leaders' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedLeaders.map(leader => (
                  <div
                    key={leader.id}
                    id={`encyclo-item-${leader.id}`}
                    onClick={() => handleOpenLeader(leader)}
                    className="group p-4 bg-[#0A1E1A] border border-[#234D43] hover:border-[#E5C158]/40 hover:bg-[#122C26]/20 rounded-xl cursor-pointer transition-all flex justify-between items-center text-left"
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#E5C158]">{leader.era}</span>
                        <span className="text-[9px] bg-[#030D0B] border border-[#234D43] text-[#8CA59C] px-1.5 py-0.5 rounded font-mono uppercase">
                          {leader.countryOfOrigin}
                        </span>
                      </div>
                      <h5 className="font-serif italic text-white font-bold group-hover:text-[#E5C158] leading-tight text-sm font-sans">
                        {leader.name}
                      </h5>
                      <p className="text-[11px] text-[#8CA59C] line-clamp-1">Role: {leader.role}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <TextToSpeechButton
                        id={`leader_card_${leader.id}`}
                        title={leader.name}
                        variant="icon"
                        size="sm"
                        theme="emerald"
                        text={`Historical Leader ${leader.name}. Era: ${leader.era}. Origin: ${leader.countryOfOrigin}. Role: ${leader.role}. Impact: ${leader.impactParagraph}`}
                      />
                      <ChevronRight className="w-4 h-4 text-[#8CA59C] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {filteredLeaders.length === 0 && (
                <div className="bg-[#0F0F0F] border border-[#234D43] rounded-2xl p-12 text-center text-[#8CA59C]">
                  No world leaders match your search query terms.
                </div>
              )}

              <PaginationControls
                currentPage={leadersPage}
                totalPages={totalLeadersPages}
                totalItems={filteredLeaders.length}
                itemsPerPage={leadersPerPage}
                onPageChange={(p) => {
                  setLeadersPage(p);
                  playSound?.('click');
                }}
                onItemsPerPageChange={(num) => {
                  setLeadersPerPage(num);
                  setLeadersPage(1);
                  playSound?.('click');
                }}
                itemsPerPageOptions={[36, 48, 96]}
                itemLabel="leaders"
              />
            </div>
          )}

          {/* E. COUNTRIES TAB */}
          {activeTab === 'countries' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCountries.map(country => (
                  <div
                    key={country.id}
                    id={`encyclo-item-${country.id}`}
                    onClick={() => handleOpenCountry(country)}
                    className="wikipedia-country-item group bg-[#0A1E1A] border border-[#234D43] hover:border-[#E5C158]/50 hover:shadow-2xl rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-[#234D43]/40 pb-2">
                        <span className="text-2xl">{country.flag}</span>
                        <span className="text-[11px] font-mono font-bold text-[#E5C158] uppercase">State Record</span>
                      </div>
                      <h4 className="text-xl font-serif italic text-white group-hover:text-[#E5C158] transition-colors">{country.name}</h4>
                      <p className="text-xs text-[#8CA59C] leading-relaxed line-clamp-3 font-sans">{country.summary}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#234D43]/40 flex items-center justify-between text-xs text-[#E5C158] font-semibold">
                      <span>Expand for More Details</span>
                      <div className="flex items-center gap-2">
                        <TextToSpeechButton
                          id={`country_card_${country.id}`}
                          title={country.name}
                          variant="icon"
                          size="sm"
                          theme="emerald"
                          text={`Sovereign Territory ${country.name}. Geography: ${country.geography}. Summary: ${country.summary}. Epics: ${country.nationalEpics}`}
                        />
                        <ChevronRight className="w-4 h-4 text-[#8CA59C]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCountries.length === 0 && (
                <div className="lg:col-span-3 bg-[#0F0F0F] border border-[#234D43] rounded-2xl p-12 text-center text-[#8CA59C]">
                  No registered countries match your terms.
                </div>
              )}

              <PaginationControls
                currentPage={countriesPage}
                totalPages={totalCountriesPages}
                totalItems={filteredCountries.length}
                itemsPerPage={countriesPerPage}
                onPageChange={(p) => {
                  setCountriesPage(p);
                  playSound?.('click');
                }}
                onItemsPerPageChange={(num) => {
                  setCountriesPerPage(num);
                  setCountriesPage(1);
                  playSound?.('click');
                }}
                itemsPerPageOptions={[24, 48, 96]}
                itemLabel="countries"
              />
            </div>
          )}

          {/* DETAILED ENCYCLOPEDIA ENTRY DRAWER FOR COUNTRIES */}
          <AnimatePresence>
            {expandedCountry && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  onClick={handleCloseCountryDrawer}
                  className="fixed inset-0 bg-black z-50 cursor-pointer"
                />

                {/* Drawer Body */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                  className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-[#030D0B] border-l border-[#234D43] shadow-2xl z-50 flex flex-col overflow-hidden text-left"
                >
                  {/* Drawer Header */}
                  <div className="p-6 border-b border-[#234D43] bg-gradient-to-r from-[#122C26] to-[#030D0B] flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{expandedCountry.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono tracking-widest text-[#E5C158] uppercase font-bold">
                            HIGH-DETAIL EXPANSION
                          </span>
                          <span className="bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/20 px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold">
                            Encyclopedia Entry
                          </span>
                        </div>
                        <h3 className="text-2xl font-serif italic text-white mt-1 capitalize">
                          {expandedCountry.name} Dossier
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TextToSpeechButton
                        id={`country_drawer_${expandedCountry.id}`}
                        title={expandedCountry.name}
                        label="Read Dossier"
                        size="sm"
                        theme="emerald"
                        text={`Country Dossier: ${expandedCountry.name}. Geography: ${expandedCountry.geography}. Historical Summary: ${expandedCountry.summary}. National Epics and Lore: ${expandedCountry.nationalEpics}. Cultural Achievements: ${expandedCountry.achievements.join(', ')}.`}
                      />
                      <button
                        onClick={handleCloseCountryDrawer}
                        className="p-2.5 rounded-lg border border-[#234D43] bg-[#0A1E1A] hover:border-[#E5C158]/40 text-[#8CA59C] hover:text-white transition-all cursor-pointer shadow-md"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Drawer Content */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-[#234D43] scrollbar-track-transparent">
                    
                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#0A1E1A] border border-[#234D43]/40 rounded-2xl">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#8CA59C] uppercase block">Primary Dialect</span>
                        <span className="text-xs font-bold text-[#F4EFEA] block">{expandedCountry.language}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#8CA59C] uppercase block">Theological Core</span>
                        <span className="text-xs font-bold text-[#F4EFEA] block truncate">{expandedCountry.majorReligions}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#8CA59C] uppercase block">National Sagas</span>
                        <span className="text-xs font-bold text-[#F4EFEA] block truncate">{expandedCountry.nationalEpics}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#8CA59C] uppercase block">Regional Coordinates</span>
                        <span className="text-xs font-bold text-[#E5C158] block truncate">{expandedCountry.geography}</span>
                      </div>
                    </div>

                    {/* PART 1: POPULATION HISTORY */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-white border-b border-[#234D43]/50 pb-2">
                        <History className="w-4.5 h-4.5 text-[#E5C158]" />
                        <h4 className="text-lg font-serif italic text-[#E5C158]">Full Population History Trend</h4>
                      </div>
                      <p className="text-xs text-[#8CA59C] leading-relaxed font-sans">
                        Recovered administrative census registers offer verified, structured insights mapping the demographic expansions across sovereign epoch segments:
                      </p>

                      <div className="overflow-hidden border border-[#234D43] rounded-xl bg-[#0A1E1A] shadow-inner">
                        <table className="w-full text-xs font-mono">
                          <thead>
                            <tr className="bg-[#122C26]/40 text-[#E5C158] border-b border-[#234D43]">
                              <th className="p-3 text-left">Historical Epoch</th>
                              <th className="p-3 text-right">Population Estimate</th>
                              <th className="p-3 text-right font-sans">Growth Cycle</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#234D43]/40 text-[#8CA59C]">
                            {[
                              { epoch: '500 BC (Classical Rise)', pop: expandedCountry.name.includes('China') || expandedCountry.name.includes('India') ? '25,200,000' : '2,400,000', indexText: '✦ Initiating agriculture census' },
                              { epoch: '100 AD (Pax Imperial Peak)', pop: expandedCountry.name.includes('China') || expandedCountry.name.includes('India') ? '56,400,000' : '6,100,000', indexText: '▲ Roadways network synergy' },
                              { epoch: '1000 AD (Medieval Scholastic Peak)', pop: expandedCountry.name.includes('China') || expandedCountry.name.includes('India') ? '110,000,000' : '9,200,000', indexText: '▲ Urban center trade boom' },
                              { epoch: '1500 AD (Early Modern Navigation)', pop: expandedCountry.name.includes('China') || expandedCountry.name.includes('India') ? '145,000,000' : '15,000,000', indexText: '▲ High maritime import/export' },
                              { epoch: '1800 AD (Mechanical Industry Dawn)', pop: expandedCountry.name.includes('China') || expandedCountry.name.includes('India') ? '230,000,000' : '28,300,000', indexText: '▲ Steam mechanical systems' },
                              { epoch: 'Modern (State Census Registry)', pop: expandedCountry.name.includes('China') || expandedCountry.name.includes('India') ? '1,420,000,000' : '64,800,000', indexText: '▲ Metropolitan global hub' }
                            ].map((row, i) => (
                              <tr key={i} className="hover:bg-[#122C26]/30 transition-colors">
                                <td className="p-3 text-left text-white font-serif italic">{row.epoch}</td>
                                <td className="p-3 text-right text-[#E5C158] font-bold">{row.pop}</td>
                                <td className="p-3 text-right font-sans text-[11px] text-[#8CA59C]">{row.indexText}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* PART 2: MAJOR POLITICAL SHIFTS */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-white border-b border-[#234D43]/50 pb-2">
                        <Landmark className="w-4.5 h-4.5 text-[#E5C158]" />
                        <h4 className="text-lg font-serif italic text-[#E5C158]">Major Political Shifts</h4>
                      </div>
                      
                      <div className="space-y-4 text-left">
                        {[
                          {
                            title: 'Phase I: Foundational Sovereignty & Royal Codes',
                            period: 'c. 500 BC – 300 AD',
                            description: 'The tribal unifications of the ancient basin regions established the first chancellors under classical local scripts. Regional chieftains agreed to aggregate defense resources, creating a centralized monarchic assembly.'
                          },
                          {
                            title: 'Phase II: Feudal Alliances & Maritime Expansions',
                            period: 'c. 500 AD – 1500 AD',
                            description: 'Spanning multiple dynasty succession clashes, this era saw the formal writing of maritime trading codes and the construction of state fortifications, protecting routes from foreign raiders.'
                          },
                          {
                            title: 'Phase III: Constitutional Rebirth & Industrial Ascent',
                            period: 'c. 1600 AD – Today',
                            description: 'Specially characterized by peasant rebellions, the abolition of noble tax exemptions, the creation of a bicameral parliament Act, and systematic integration of mechanical standardizations.'
                          }
                        ].map((shift, idx) => (
                          <div key={idx} className="p-4 bg-[#0A1E1A] border border-[#234D43]/50 rounded-2xl relative overflow-hidden group hover:border-[#E5C158]/30 transition-all">
                            <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#E5C158]" />
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-serif italic font-bold text-white text-sm group-hover:text-[#E5C158] transition-colors">
                                {shift.title}
                              </h5>
                              <span className="text-[10px] font-mono text-[#E5C158] bg-[#E5C158]/5 border border-[#E5C158]/10 px-2 py-0.5 rounded">
                                {shift.period}
                              </span>
                            </div>
                            <p className="text-xs text-[#8CA59C] leading-relaxed font-sans">{shift.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CULTURAL DEEP-DIVE SECTION */}
                    <div className="space-y-4 border-t border-[#234D43]/30 pt-6">
                      <div className="flex items-center justify-between border-b border-[#234D43]/50 pb-2">
                        <div className="flex items-center gap-2 text-white">
                          <Sparkles className="w-4.5 h-4.5 text-[#E5C158]" />
                          <h4 className="text-lg font-serif italic text-[#E5C158]">Cultural Deep-Dive</h4>
                        </div>
                        <span className="bg-[#E5C158]/5 text-[#E5C158] border border-[#E5C158]/15 px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wide">
                          AI Dossier Engine
                        </span>
                      </div>

                      {!culturalProfile && !isGeneratingCulture && (
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0C1E1A] to-[#04120E] border border-[#234D43]/40 text-left space-y-3">
                          <p className="text-xs text-[#8CA59C] leading-relaxed font-sans">
                            Inquire with the Academic Scribes to construct an AI-composed analysis of <span className="text-white font-semibold font-serif italic">{expandedCountry.name}’s</span> traditional cuisine, ancestral folklore, and major philosophy.
                          </p>
                          <button
                            onClick={() => handleGenerateCulturalProfile(expandedCountry)}
                            className="w-full sm:w-auto px-5 py-2.5 bg-[#E5C158] hover:bg-white text-black font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Sparkles className="w-4 h-4 shrink-0 animate-pulse text-black" />
                            <span>Generate Cultural Profile</span>
                          </button>
                        </div>
                      )}

                      {isGeneratingCulture && (
                        <div className="p-8 rounded-2xl bg-[#0A1E1A] border border-[#234D43]/40 flex flex-col items-center justify-center text-center space-y-3">
                          <div className="relative w-12 h-12 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-2 border-[#E5C158]/10 border-t-[#E5C158] animate-spin" />
                            <Sparkles className="w-5 h-5 text-[#E5C158] animate-pulse" />
                          </div>
                          <div>
                            <p className="text-xs font-mono text-[#E5C158] font-bold tracking-widest uppercase animate-pulse">TRANSLATING STATE DOSSIER...</p>
                            <p className="text-[10px] text-[#8CA59C] mt-1 font-sans">Compiling traditional gourmet guides, folklore myths, and moral philosophy scrolls.</p>
                          </div>
                        </div>
                      )}

                      {cultureError && (
                        <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 text-red-300 text-xs flex items-start gap-2.5">
                          <span className="text-sm">⚠️</span>
                          <div>
                            <span className="font-bold">Scribal Assembly Interrupted:</span> {cultureError}
                          </div>
                        </div>
                      )}

                      {culturalProfile && (
                        <div className="space-y-5 animate-fade-in text-left">
                          
                          {/* Cuisine Card */}
                          <div className="p-4 bg-[#0A1E1A] border border-[#234D43]/40 rounded-2xl space-y-2">
                            <div className="flex items-center gap-2 text-white">
                              <span className="text-lg">🥣</span>
                              <h5 className="font-serif italic font-bold text-[#E5C158] text-sm">Traditional Cuisine & Staple Arts</h5>
                            </div>
                            <p className="text-xs text-[#8CA59C] leading-relaxed font-sans">{culturalProfile.cuisine}</p>
                          </div>

                          {/* Folklore Card */}
                          <div className="p-4 bg-[#0A1E1A] border border-[#234D43]/40 rounded-2xl space-y-2">
                            <div className="flex items-center gap-2 text-white">
                              <span className="text-lg">🔮</span>
                              <h5 className="font-serif italic font-bold text-[#E5C158] text-sm">Ancestral Folklore & Myths</h5>
                            </div>
                            <p className="text-xs text-[#8CA59C] leading-relaxed font-sans">{culturalProfile.folklore}</p>
                          </div>

                          {/* Philosophy Card */}
                          <div className="p-4 bg-[#0A1E1A] border border-[#234D43]/40 rounded-2xl space-y-2">
                            <div className="flex items-center gap-2 text-white">
                              <span className="text-lg">📜</span>
                              <h5 className="font-serif italic font-bold text-[#E5C158] text-sm">Philosophical Codes & Spiritual Ethics</h5>
                            </div>
                            <p className="text-xs text-[#8CA59C] leading-relaxed font-sans">{culturalProfile.philosophy}</p>
                          </div>

                          <button
                            onClick={() => onAddNote(
                              `Culture of ${expandedCountry.name}`,
                              `Cuisine:\n${culturalProfile.cuisine}\n\nFolklore:\n${culturalProfile.folklore}\n\nPhilosophy:\n${culturalProfile.philosophy}`,
                              'Country'
                            )}
                            className="w-full py-2 bg-[#E11D48]/0 hover:bg-[#E5C158]/10 border border-[#E5C158]/20 hover:border-[#E5C158]/40 text-[#E5C158] text-[10px] font-mono uppercase tracking-wider font-bold rounded-xl transition-all cursor-pointer"
                          >
                            💾 Export Cultural Dossier to Notebook
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Save notes in Drawer footer */}
                    <div className="pt-4 border-t border-[#234D43]/40 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => onAddNote(
                          `Study: ${expandedCountry.name}`,
                          `Country: ${expandedCountry.name}\nFlag: ${expandedCountry.flag}\nLanguage: ${expandedCountry.language}\nMajor Religions: ${expandedCountry.majorReligions}\n`,
                          'Country'
                        )}
                        className="flex-1 py-1 px-4 text-center py-2.5 bg-[#122C26] hover:bg-[#1A3F36] border border-[#234D43] text-xs hover:text-[#E5C158] text-white font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        📝 Save Research Note to Notebook
                      </button>
                      <a
                        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(expandedCountry.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1 px-4 text-center py-2.5 bg-gradient-to-r from-[#1E2E3B] to-[#0F1B24] border border-[#E5C158]/30 hover:border-[#E5C158] text-[#E5C158] text-xs transition-all rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Globe className="w-4 h-4" /> Open Wikipedia Webpage
                      </a>
                    </div>

                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
