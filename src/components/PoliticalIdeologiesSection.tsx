import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, Bookmark, Sparkles, Filter, 
  ExternalLink, Scale, Check, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  FileText, Share2, Compass, Layers, Info, ArrowLeftRight, X, 
  Crown, Users, BookOpen, ArrowLeft, Globe, History, Shield, 
  GraduationCap, Volume2, Copy, CheckCheck, Lightbulb, Landmark, 
  Book, ArrowRight, CornerDownLeft, AlertCircle
} from 'lucide-react';
import { PoliticalIdeology, IdeologyCategory, Bookmark as BookmarkType, UserNote } from '../types';
import { ALL_POLITICAL_IDEOLOGIES, IDEOLOGY_CATEGORIES } from '../data/ideologies';
import { RELATED_WIKI_ENTRIES, getRelatedWikiEntry, RelatedWikiEntry } from '../data/ideologyWikiEntries';
import { getIdeologyCaseStudy, IdeologyCaseStudy } from '../data/ideologyCaseStudies';
import IdeologySimpleExamplesCard from './IdeologySimpleExamplesCard';
import IdeologyWikiFullPageView from './IdeologyWikiFullPageView';
import IdeologyCaseStudyFullPageView from './IdeologyCaseStudyFullPageView';
import PaginationControls from './PaginationControls';
import { playSound } from '../utils/audio';

interface PoliticalIdeologiesSectionProps {
  onAddNote: (title: string, content: string, type: UserNote['targetType'], targetId?: string) => void;
  onToggleBookmark: (id: string, type: BookmarkType['type'], title: string, subtitle?: string) => void;
  bookmarks: BookmarkType[];
  focusIdeologyId?: string;
}

type SearchScope = 'all' | 'father' | 'thinkers' | 'economics' | 'tenets';

interface PredictiveSuggestion {
  id: string;
  label: string;
  type: 'father' | 'ideology' | 'economics' | 'tenet' | 'figure' | 'era' | 'case_study';
  category?: string;
  subtext?: string;
  targetQuery: string;
  scope: SearchScope;
  ideologyObj?: PoliticalIdeology;
  caseStudyTitle?: string;
  wikiKey?: string;
}

export default function PoliticalIdeologiesSection({
  onAddNote,
  onToggleBookmark,
  bookmarks,
  focusIdeologyId
}: PoliticalIdeologiesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<SearchScope>('all');
  const [selectedCategory, setSelectedCategory] = useState<IdeologyCategory | 'all'>('all');
  
  // Pagination State for Ideology Grid
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  
  // Selected for In-Place Deep-Dive Full-Page View
  const [selectedIdeology, setSelectedIdeology] = useState<PoliticalIdeology | null>(() => {
    if (focusIdeologyId) {
      return ALL_POLITICAL_IDEOLOGIES.find(i => i.id === focusIdeologyId) || null;
    }
    const savedId = typeof window !== 'undefined' ? sessionStorage.getItem('ideology_vault_active_id') : null;
    if (savedId) {
      return ALL_POLITICAL_IDEOLOGIES.find(i => i.id === savedId) || null;
    }
    return null;
  });

  // Wikipedia Encyclopedia Full-Page In-Place View State
  const [activeWikiEntry, setActiveWikiEntry] = useState<RelatedWikiEntry | null>(null);

  // Real-World Case Study Full-Page In-Place View State
  const [activeCaseStudy, setActiveCaseStudy] = useState<IdeologyCaseStudy | null>(null);

  // In-place Spotlight state
  const [spotlightIdeology, setSpotlightIdeology] = useState<PoliticalIdeology | null>(null);

  // In-place Comparison tool state
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareIdA, setCompareIdA] = useState<string>('classical-liberalism');
  const [compareIdB, setCompareIdB] = useState<string>('democratic-socialism');

  // Quick note modal state
  const [noteModalIdeology, setNoteModalIdeology] = useState<PoliticalIdeology | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // Expanded card IDs for accordion style viewing in grid
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});

  // Predictive search autocomplete states
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const comparatorRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const deepDiveTopRef = useRef<HTMLDivElement>(null);

  // Scroll & State Location Persistence Tracking
  const savedListScrollY = useRef<number>(0);
  const savedDeepDiveScrollY = useRef<number>(0);
  const lastActiveIdeologyId = useRef<string | null>(null);
  const previousViewType = useRef<'list' | 'deep_dive'>('list');

  // Sync if focusIdeologyId changes externally
  useEffect(() => {
    if (focusIdeologyId) {
      const found = ALL_POLITICAL_IDEOLOGIES.find(i => i.id === focusIdeologyId);
      if (found) {
        setSelectedIdeology(found);
        setActiveWikiEntry(null);
        setActiveCaseStudy(null);
        setTimeout(() => {
          deepDiveTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [focusIdeologyId]);

  // When an ideology is selected
  const handleSelectIdeology = (ideology: PoliticalIdeology) => {
    savedListScrollY.current = window.scrollY;
    lastActiveIdeologyId.current = ideology.id;
    previousViewType.current = 'list';
    sessionStorage.setItem('ideology_vault_active_id', ideology.id);
    setSelectedIdeology(ideology);
    setActiveWikiEntry(null);
    setActiveCaseStudy(null);
    playSound('click');
    setTimeout(() => {
      deepDiveTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleSelectIdeologyByName = (ideologyName: string) => {
    const cleanName = ideologyName.toLowerCase().trim();
    const found = ALL_POLITICAL_IDEOLOGIES.find(
      i => i.name.toLowerCase().includes(cleanName) || cleanName.includes(i.name.toLowerCase()) || i.id.toLowerCase() === cleanName
    );
    if (found) {
      handleSelectIdeology(found);
    }
  };

  const handleBackToList = () => {
    const targetId = lastActiveIdeologyId.current || selectedIdeology?.id;
    setSelectedIdeology(null);
    setActiveWikiEntry(null);
    setActiveCaseStudy(null);
    sessionStorage.removeItem('ideology_vault_active_id');
    playSound('click');
    
    // Restore user's exact scroll position and place
    setTimeout(() => {
      if (targetId) {
        const el = document.getElementById(`ideology-card-${targetId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-2', 'ring-[#D4AF37]');
          setTimeout(() => el.classList.remove('ring-2', 'ring-[#D4AF37]'), 2200);
          return;
        }
      }
      if (savedListScrollY.current > 0) {
        window.scrollTo({ top: savedListScrollY.current, behavior: 'smooth' });
      }
    }, 60);
  };

  // Open In-Place Full-Page Wikipedia Encyclopedia Entry
  const handleOpenWikiPage = (entryKeyOrName: string, context?: { name?: string; role?: string; ideology?: string }) => {
    if (selectedIdeology) {
      savedDeepDiveScrollY.current = window.scrollY;
      previousViewType.current = 'deep_dive';
    } else {
      savedListScrollY.current = window.scrollY;
      previousViewType.current = 'list';
    }
    const entry = getRelatedWikiEntry(entryKeyOrName, context);
    setActiveWikiEntry(entry);
    setActiveCaseStudy(null);
    playSound('click');
  };

  // Back from Wiki Entry
  const handleBackFromWiki = () => {
    setActiveWikiEntry(null);
    playSound('click');
    setTimeout(() => {
      if (previousViewType.current === 'deep_dive' && selectedIdeology) {
        window.scrollTo({ top: savedDeepDiveScrollY.current, behavior: 'smooth' });
      } else {
        if (lastActiveIdeologyId.current) {
          const el = document.getElementById(`ideology-card-${lastActiveIdeologyId.current}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
        }
        window.scrollTo({ top: savedListScrollY.current, behavior: 'smooth' });
      }
    }, 50);
  };

  // Open In-Place Full-Page Case Study Deep Dive
  const handleOpenCaseStudy = (caseTitleOrKey: string) => {
    if (selectedIdeology) {
      savedDeepDiveScrollY.current = window.scrollY;
      previousViewType.current = 'deep_dive';
    } else {
      savedListScrollY.current = window.scrollY;
      previousViewType.current = 'list';
    }
    const cs = getIdeologyCaseStudy(caseTitleOrKey, selectedIdeology ? { ideologyName: selectedIdeology.name, ideologyId: selectedIdeology.id } : undefined);
    setActiveCaseStudy(cs);
    setActiveWikiEntry(null);
    playSound('click');
  };

  // Back from Case Study
  const handleBackFromCaseStudy = () => {
    setActiveCaseStudy(null);
    playSound('click');
    setTimeout(() => {
      if (previousViewType.current === 'deep_dive' && selectedIdeology) {
        window.scrollTo({ top: savedDeepDiveScrollY.current, behavior: 'smooth' });
      } else {
        if (lastActiveIdeologyId.current) {
          const el = document.getElementById(`ideology-card-${lastActiveIdeologyId.current}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
        }
        window.scrollTo({ top: savedListScrollY.current, behavior: 'smooth' });
      }
    }, 50);
  };

  const toggleExpand = (id: string) => {
    playSound('click');
    setExpandedCardIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTriggerSpotlight = () => {
    playSound('click');
    const random = ALL_POLITICAL_IDEOLOGIES[Math.floor(Math.random() * ALL_POLITICAL_IDEOLOGIES.length)];
    setSpotlightIdeology(random);
    setTimeout(() => {
      spotlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleToggleCompare = () => {
    playSound('click');
    setIsCompareOpen(prev => !prev);
    if (!isCompareOpen) {
      setTimeout(() => {
        comparatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleSwapCompare = () => {
    playSound('click');
    setCompareIdA(compareIdB);
    setCompareIdB(compareIdA);
  };

  // Build a pre-compiled, instant suggestion database for predictive guessing
  const allSuggestionsDictionary = useMemo<PredictiveSuggestion[]>(() => {
    const list: PredictiveSuggestion[] = [];
    const seenLabels = new Set<string>();

    // 1. All Ideologies
    ALL_POLITICAL_IDEOLOGIES.forEach(item => {
      const label = item.name;
      if (!seenLabels.has(label.toLowerCase())) {
        seenLabels.add(label.toLowerCase());
        list.push({
          id: `ideo-${item.id}`,
          label: item.name,
          type: 'ideology',
          category: item.category,
          subtext: item.tagline,
          targetQuery: item.name,
          scope: 'all',
          ideologyObj: item
        });
      }

      // 2. Founding Fathers
      if (item.foundingFather && !seenLabels.has(item.foundingFather.toLowerCase())) {
        seenLabels.add(item.foundingFather.toLowerCase());
        list.push({
          id: `father-${item.id}`,
          label: item.foundingFather,
          type: 'father',
          category: item.name,
          subtext: item.foundingFatherTitle || `Father of ${item.name}`,
          targetQuery: item.foundingFather,
          scope: 'father',
          ideologyObj: item
        });
      }

      // 3. Key Figures
      item.keyFigures?.forEach(fig => {
        if (!seenLabels.has(fig.name.toLowerCase())) {
          seenLabels.add(fig.name.toLowerCase());
          list.push({
            id: `fig-${fig.name}`,
            label: fig.name,
            type: 'figure',
            category: item.name,
            subtext: `${fig.role} (${item.name})`,
            targetQuery: fig.name,
            scope: 'father',
            ideologyObj: item,
            wikiKey: fig.name
          });
        }
      });

      // 4. Key Thinkers
      item.keyThinkers.forEach(t => {
        if (!seenLabels.has(t.toLowerCase())) {
          seenLabels.add(t.toLowerCase());
          list.push({
            id: `thinker-${t}`,
            label: t,
            type: 'figure',
            category: item.name,
            subtext: `Philosopher in ${item.name}`,
            targetQuery: t,
            scope: 'thinkers',
            ideologyObj: item,
            wikiKey: t
          });
        }
      });

      // 5. Economic Models (extract concise phrases)
      const econModelClean = item.economicModel.split(/[,.;]/)[0].trim();
      if (econModelClean && econModelClean.length < 40 && !seenLabels.has(econModelClean.toLowerCase())) {
        seenLabels.add(econModelClean.toLowerCase());
        list.push({
          id: `econ-${item.id}`,
          label: econModelClean,
          type: 'economics',
          category: item.name,
          subtext: `Economic System of ${item.name}`,
          targetQuery: econModelClean,
          scope: 'economics',
          ideologyObj: item
        });
      }

      // 6. Core Tenets (first tenet as concept)
      if (item.coreTenets.length > 0) {
        const tenetShort = item.coreTenets[0].split(/[:.]/)[0].trim();
        if (tenetShort && tenetShort.length < 35 && !seenLabels.has(tenetShort.toLowerCase())) {
          seenLabels.add(tenetShort.toLowerCase());
          list.push({
            id: `tenet-${item.id}-0`,
            label: tenetShort,
            type: 'tenet',
            category: item.name,
            subtext: `Core Tenet in ${item.name}`,
            targetQuery: tenetShort,
            scope: 'tenets',
            ideologyObj: item
          });
        }
      }

      // 7. Real-world case studies
      item.realWorldExamples?.forEach(ex => {
        if (!seenLabels.has(ex.title.toLowerCase())) {
          seenLabels.add(ex.title.toLowerCase());
          list.push({
            id: `case-${ex.title}`,
            label: ex.title,
            type: 'case_study',
            category: item.name,
            subtext: `Real-World Case (${ex.periodOrLocation})`,
            targetQuery: ex.title,
            scope: 'all',
            ideologyObj: item,
            caseStudyTitle: ex.title
          });
        }
      });
    });

    return list;
  }, []);

  // Compute predictive autocompletions & inline ghost guess
  const { filteredSuggestions, ghostPrediction } = useMemo(() => {
    const rawQ = searchQuery.trim();
    if (!rawQ) {
      return {
        filteredSuggestions: allSuggestionsDictionary.slice(0, 8),
        ghostPrediction: ''
      };
    }

    const q = rawQ.toLowerCase();
    
    // Exact prefix matches take first priority for ghost prediction
    const prefixMatches = allSuggestionsDictionary.filter(s => 
      s.label.toLowerCase().startsWith(q)
    );

    // General substring matches for dropdown
    const substringMatches = allSuggestionsDictionary.filter(s => 
      !s.label.toLowerCase().startsWith(q) && (
        s.label.toLowerCase().includes(q) ||
        (s.subtext && s.subtext.toLowerCase().includes(q)) ||
        (s.category && s.category.toLowerCase().includes(q))
      )
    );

    const merged = [...prefixMatches, ...substringMatches].slice(0, 10);

    // Compute ghost completion: if top item starts with rawQ, return rest of the word
    let ghost = '';
    if (prefixMatches.length > 0) {
      const topMatch = prefixMatches[0].label;
      if (topMatch.toLowerCase().startsWith(q)) {
        ghost = rawQ + topMatch.slice(rawQ.length);
      }
    }

    return {
      filteredSuggestions: merged,
      ghostPrediction: ghost
    };
  }, [searchQuery, allSuggestionsDictionary]);

  // Handle accepting the ghost guess or a predictive suggestion
  const handleApplySuggestion = (s: PredictiveSuggestion) => {
    setSearchQuery(s.targetQuery);
    setSearchScope(s.scope);
    setIsSearchFocused(false);
    playSound('click');

    if (s.caseStudyTitle) {
      handleOpenCaseStudy(s.caseStudyTitle);
      return;
    }

    if (s.wikiKey) {
      handleOpenWikiPage(s.wikiKey, { name: s.label, ideology: s.category });
      return;
    }

    if (s.ideologyObj && s.type === 'ideology') {
      handleSelectIdeology(s.ideologyObj);
    }
  };

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' || (e.key === 'ArrowRight' && searchInputRef.current?.selectionStart === searchQuery.length)) {
      if (ghostPrediction && ghostPrediction.toLowerCase() !== searchQuery.toLowerCase()) {
        e.preventDefault();
        setSearchQuery(ghostPrediction);
        playSound('click');
        return;
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
      return;
    }

    if (e.key === 'Enter') {
      if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < filteredSuggestions.length) {
        e.preventDefault();
        handleApplySuggestion(filteredSuggestions[selectedSuggestionIndex]);
        return;
      }
      if (ghostPrediction) {
        setSearchQuery(ghostPrediction);
        setIsSearchFocused(false);
        playSound('click');
      }
    }

    if (e.key === 'Escape') {
      setIsSearchFocused(false);
    }
  };

  // Filter ideologies for the grid
  const filteredIdeologies = useMemo(() => {
    return ALL_POLITICAL_IDEOLOGIES.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      if (searchScope === 'father') {
        const fatherMatch = item.foundingFather?.toLowerCase().includes(q) || item.foundingFatherTitle?.toLowerCase().includes(q);
        const figuresMatch = item.keyFigures?.some(f => f.name.toLowerCase().includes(q) || f.role.toLowerCase().includes(q) || f.contribution.toLowerCase().includes(q));
        return fatherMatch || figuresMatch;
      }

      if (searchScope === 'thinkers') {
        return item.keyThinkers.some(t => t.toLowerCase().includes(q)) || item.keyFigures?.some(f => f.name.toLowerCase().includes(q));
      }

      if (searchScope === 'economics') {
        return item.economicModel.toLowerCase().includes(q);
      }

      if (searchScope === 'tenets') {
        return item.coreTenets.some(c => c.toLowerCase().includes(q));
      }

      // Default 'all'
      return (
        item.name.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        (item.foundingFather && item.foundingFather.toLowerCase().includes(q)) ||
        (item.foundingFatherTitle && item.foundingFatherTitle.toLowerCase().includes(q)) ||
        (item.keyFigures && item.keyFigures.some(f => f.name.toLowerCase().includes(q) || f.role.toLowerCase().includes(q))) ||
        item.keyThinkers.some(t => t.toLowerCase().includes(q)) ||
        item.coreTenets.some(c => c.toLowerCase().includes(q)) ||
        item.realWorldExamples.some(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)) ||
        item.economicModel.toLowerCase().includes(q) ||
        item.spectrumPlacement.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery, searchScope]);

  // Reset page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, searchScope]);

  const totalPages = Math.ceil(filteredIdeologies.length / itemsPerPage);

  const paginatedIdeologies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredIdeologies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredIdeologies, currentPage, itemsPerPage]);

  const handleNavigateIdeologyDive = (direction: 'prev' | 'next') => {
    if (!selectedIdeology) return;
    const currentIndex = ALL_POLITICAL_IDEOLOGIES.findIndex(i => i.id === selectedIdeology.id);
    if (currentIndex === -1) return;
    const targetIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= ALL_POLITICAL_IDEOLOGIES.length) return;
    const target = ALL_POLITICAL_IDEOLOGIES[targetIndex];
    setSelectedIdeology(target);
    playSound('stoneClick');
    setTimeout(() => {
      deepDiveTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const handleOpenNoteModal = (ideology: PoliticalIdeology) => {
    setNoteModalIdeology(ideology);
    setNoteTitle(`Ideology Study: ${ideology.name}`);
    setNoteContent(`Founding Father: ${ideology.foundingFather || 'Historical Thinkers'} (${ideology.foundingFatherTitle || ''})\nKey Concept: ${ideology.tagline}\nCore Tenets:\n- ${ideology.coreTenets.slice(0, 2).join('\n- ')}\n\nPersonal Reflection & Analysis:\n`);
    playSound('click');
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteModalIdeology || !noteTitle.trim()) return;
    onAddNote(noteTitle, noteContent, 'Ideology', noteModalIdeology.id);
    setNoteModalIdeology(null);
    playSound('correct');
  };

  const ideologyA = useMemo(() => ALL_POLITICAL_IDEOLOGIES.find(i => i.id === compareIdA) || ALL_POLITICAL_IDEOLOGIES[0], [compareIdA]);
  const ideologyB = useMemo(() => ALL_POLITICAL_IDEOLOGIES.find(i => i.id === compareIdB) || ALL_POLITICAL_IDEOLOGIES[1], [compareIdB]);

  const comparePresetPairs = [
    { title: 'Classical Liberalism vs. Democratic Socialism', idA: 'classical-liberalism', idB: 'democratic-socialism' },
    { title: 'Anarcho-Capitalism vs. Anarcho-Communism', idA: 'anarcho-capitalism', idB: 'anarcho-communism' },
    { title: 'Classical Conservatism vs. Social Democracy', idA: 'conservatism', idB: 'social-democracy' },
    { title: 'Georgism vs. Neoliberalism', idA: 'georgism', idB: 'neoliberalism' },
    { title: 'Civic Nationalism vs. Ethnic Nationalism', idA: 'civic-nationalism', idB: 'ethnic-nationalism' },
    { title: 'Technocracy vs. Liquid Democracy', idA: 'technocracy', idB: 'liquid-democracy' }
  ];

  // Helper to dynamically extract related encyclopedia time periods and historical events for the selected ideology
  const relatedEncyclopediaItems = useMemo(() => {
    if (!selectedIdeology) return { figures: [], eras: [], events: [] };

    // 1. Figures
    const figures: { name: string; role: string; key: string }[] = [];
    if (selectedIdeology.foundingFather) {
      figures.push({
        name: selectedIdeology.foundingFather,
        role: selectedIdeology.foundingFatherTitle || 'Founding Architect & Father',
        key: selectedIdeology.foundingFather
      });
    }
    selectedIdeology.keyFigures?.forEach(fig => {
      if (!figures.some(f => f.name.toLowerCase() === fig.name.toLowerCase())) {
        figures.push({ name: fig.name, role: fig.role, key: fig.name });
      }
    });
    selectedIdeology.keyThinkers.forEach(t => {
      if (!figures.some(f => f.name.toLowerCase() === t.toLowerCase())) {
        figures.push({ name: t, role: 'Philosophical Thinker', key: t });
      }
    });

    // 2. Eras
    const eras = [
      {
        title: selectedIdeology.historicalOrigins.split(/[,.;]/)[0] || 'Foundational Era',
        period: selectedIdeology.historicalOrigins,
        description: `The pivotal historic epoch during which ${selectedIdeology.name} coalesced into a structured system of political philosophy.`,
        key: selectedIdeology.historicalOrigins
      }
    ];

    // 3. Events & Case Studies
    const events = selectedIdeology.realWorldExamples.map((ex, idx) => ({
      title: ex.title,
      period: ex.periodOrLocation,
      description: ex.description,
      key: `event-${selectedIdeology.id}-${idx}`
    }));

    return { figures: figures.slice(0, 6), eras, events: events.slice(0, 4) };
  }, [selectedIdeology]);

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* ========================================================================= */}
      {/* 1. IN-PLACE FULL-PAGE WIKIPEDIA ENCYCLOPEDIA ENTRY VIEW                    */}
      {/* ========================================================================= */}
      {activeWikiEntry ? (
        <IdeologyWikiFullPageView 
          entry={activeWikiEntry}
          onBack={handleBackFromWiki}
          onSelectIdeologyByName={handleSelectIdeologyByName}
        />
      ) : activeCaseStudy ? (
        /* ========================================================================= */
        /* 2. IN-PLACE FULL-PAGE REAL-WORLD CASE STUDY DEEP DIVE VIEW                */
        /* ========================================================================= */
        <IdeologyCaseStudyFullPageView
          caseStudy={activeCaseStudy}
          onBack={handleBackFromCaseStudy}
          onOpenWikiEntry={(fig) => handleOpenWikiPage(fig, { name: fig, ideology: activeCaseStudy.ideologyName })}
          onSelectIdeologyByName={handleSelectIdeologyByName}
        />
      ) : selectedIdeology ? (
        /* ========================================================================= */
        /* 3. IN-PLACE FULL-PAGE IDEOLOGY DEEP-DIVE VIEW                             */
        /* ========================================================================= */
        <div ref={deepDiveTopRef} className="space-y-8 animate-fade-in text-left">
          
          {/* Top Navigation & Breadcrumbs */}
          <div className="bg-[#111111] border-2 border-[#D4AF37]/50 p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl sticky top-4 z-40">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToList}
                className="px-4 py-2 bg-[#1A1813] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/50 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to All Ideologies
              </button>
              
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#A09890]">
                <span>Ideology Vault</span>
                <span>/</span>
                <span className="text-[#D4AF37]">{selectedIdeology.category}</span>
                <span>/</span>
                <span className="text-white font-bold">{selectedIdeology.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(selectedIdeology.name.replace(/\s+/g, '_'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/50 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                title={`Open Wikipedia article on ${selectedIdeology.name}`}
              >
                <ExternalLink className="w-3.5 h-3.5" /> Wikipedia ↗
              </a>

              <button
                onClick={() => {
                  setCompareIdA(selectedIdeology.id);
                  setIsCompareOpen(true);
                  playSound('click');
                  setTimeout(() => comparatorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="px-3.5 py-2 bg-[#181818] hover:bg-[#252525] text-[#C0B8B0] hover:text-[#D4AF37] border border-[#2A2A2A] hover:border-[#D4AF37]/40 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="Compare with another ideology"
              >
                <Scale className="w-3.5 h-3.5" /> Compare Side-by-Side
              </button>

              <button
                onClick={() => {
                  onToggleBookmark(selectedIdeology.id, 'figure', selectedIdeology.name, selectedIdeology.category);
                }}
                className={`p-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  bookmarks.some(b => b.targetId === selectedIdeology.id && b.type === 'figure')
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'bg-[#181818] text-[#C0B8B0] border-[#2A2A2A] hover:text-white'
                }`}
                title="Bookmark this ideology"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bookmark</span>
              </button>

              <button
                onClick={() => handleOpenNoteModal(selectedIdeology)}
                className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <FileText className="w-3.5 h-3.5" /> Take Study Notes
              </button>

              {/* Dive Page Navigator: Prev / Next Ideology */}
              <div className="flex items-center gap-1 bg-[#181818] border border-[#D4AF37]/40 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => handleNavigateIdeologyDive('prev')}
                  className="px-2.5 py-1 text-xs font-mono font-bold text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                  title="Previous Political Ideology"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Prev Ideology</span>
                </button>
                <span className="text-[10px] font-mono text-[#A09890] px-2 font-bold border-x border-[#333]">
                  {ALL_POLITICAL_IDEOLOGIES.findIndex(i => i.id === selectedIdeology.id) + 1} / {ALL_POLITICAL_IDEOLOGIES.length}
                </span>
                <button
                  type="button"
                  onClick={() => handleNavigateIdeologyDive('next')}
                  className="px-2.5 py-1 text-xs font-mono font-bold text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                  title="Next Political Ideology"
                >
                  <span className="hidden sm:inline">Next Ideology</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleBackToList}
                className="p-2 bg-[#1C1C1C] hover:bg-rose-900/40 text-[#A09890] hover:text-rose-300 border border-[#333] hover:border-rose-500/50 rounded-xl transition-all cursor-pointer shadow"
                title="Close Deep Dive and return to exact place"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Full-Page Layout Grid: Content (8 Cols) + Related Encyclopedia Sidebar (4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT / MAIN COLUMN (8 Columns) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Primary Ideology Showcase Banner */}
              <div className="bg-gradient-to-br from-[#181510] via-[#121212] to-[#0D0D0D] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-bold uppercase rounded-lg tracking-wider">
                    {selectedIdeology.category}
                  </span>
                  <span className="px-3 py-1 bg-[#1E1E1E] border border-[#333] text-[#A09890] font-mono text-xs rounded-lg flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> {selectedIdeology.spectrumPlacement}
                  </span>
                </div>

                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="text-4xl sm:text-5xl p-4 bg-[#1E1810] border border-[#D4AF37]/50 rounded-2xl shadow-lg shrink-0">
                    {selectedIdeology.iconSymbol || '📜'}
                  </span>
                  <div className="space-y-1">
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                      {selectedIdeology.name}
                    </h1>
                    <p className="text-sm sm:text-base italic font-serif text-[#D4AF37]">
                      "{selectedIdeology.tagline}"
                    </p>
                  </div>
                </div>

                {/* Father of the Ideology Featured Banner */}
                {selectedIdeology.foundingFather && (
                  <div className="p-4 bg-[#1E1810] border-2 border-[#D4AF37] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">Father of the Ideology:</span>
                        <span className="text-sm font-bold text-white">{selectedIdeology.foundingFather}</span>
                      </div>
                      {selectedIdeology.foundingFatherTitle && (
                        <p className="text-xs font-mono text-[#A09890] pl-6">{selectedIdeology.foundingFatherTitle}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleOpenWikiPage(selectedIdeology.foundingFather!, {
                        name: selectedIdeology.foundingFather,
                        role: selectedIdeology.foundingFatherTitle || `Father of ${selectedIdeology.name}`,
                        ideology: selectedIdeology.name
                      })}
                      className="px-3.5 py-1.5 bg-[#121212] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow self-start sm:self-auto"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Open Wikipedia Profile →
                    </button>
                  </div>
                )}
              </div>

              {/* Comprehensive Definition */}
              <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 space-y-3 shadow-lg">
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#D4AF37] flex items-center gap-2">
                  <Book className="w-4 h-4 text-[#D4AF37]" /> Comprehensive Theoretical Definition & Principles
                </h3>
                <p className="text-sm text-[#D0C8C0] leading-relaxed font-sans">
                  {selectedIdeology.definition}
                </p>
              </div>

              {/* 💡 NEW: Dedicated How This Ideology Works in Everyday Real Life (3 Simple Examples) */}
              <IdeologySimpleExamplesCard 
                ideology={selectedIdeology} 
                onOpenCaseStudy={handleOpenCaseStudy}
              />

              {/* Key Historical Figures & Architects Matrix */}
              {selectedIdeology.keyFigures && selectedIdeology.keyFigures.length > 0 && (
                <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between border-b border-[#222] pb-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#D4AF37] flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#D4AF37]" /> Key Historical Figures, Leaders & Architects ({selectedIdeology.keyFigures.length})
                    </h3>
                    <span className="text-[11px] font-mono text-[#A09890]">Click any figure for full Wiki entry</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedIdeology.keyFigures.map((fig, idx) => (
                      <div key={idx} className="p-4 bg-[#161616] hover:bg-[#1A1A1A] border border-[#282828] hover:border-[#D4AF37]/40 rounded-xl space-y-2 transition-all">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white flex items-center gap-1.5">
                            👤 {fig.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#D4AF37] bg-[#1E1911] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                            {fig.role}
                          </span>
                        </div>
                        <p className="text-xs text-[#A09890] leading-relaxed">{fig.contribution}</p>
                        <button
                          onClick={() => handleOpenWikiPage(fig.name, {
                            name: fig.name,
                            role: fig.role,
                            ideology: selectedIdeology.name
                          })}
                          className="pt-1 text-[11px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3" /> View Wikipedia Entry →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Philosophical & Ethical Tenets */}
              <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 space-y-4 shadow-lg">
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#D4AF37] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#D4AF37]" /> Core Philosophical & Ethical Tenets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedIdeology.coreTenets.map((tenet, idx) => (
                    <div key={idx} className="p-3.5 bg-[#161616] border border-[#282828] rounded-xl flex items-start gap-2.5">
                      <span className="text-[#D4AF37] font-mono font-bold text-xs mt-0.5">#{idx + 1}</span>
                      <p className="text-xs text-[#E0D8D0] leading-relaxed">{tenet}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-World Governance Case Studies (Clickable to open In-Place Full-Page Case Study) */}
              <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-[#222] pb-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#D4AF37] flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#D4AF37]" /> Real-World Governance Case Studies ({selectedIdeology.realWorldExamples.length})
                  </h3>
                  <span className="text-[11px] font-mono text-[#D4AF37]">Click any case for deep dive</span>
                </div>

                <div className="space-y-3">
                  {selectedIdeology.realWorldExamples.map((ex, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOpenCaseStudy(ex.title)}
                      className="w-full text-left p-4.5 bg-[#151515] hover:bg-[#1C1811] border border-[#282828] hover:border-[#D4AF37] rounded-2xl space-y-2 transition-all cursor-pointer group shadow-md"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                          🏛️ {ex.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[#D4AF37] bg-[#1C1811] px-2.5 py-0.5 rounded-lg border border-[#D4AF37]/30">
                            {ex.periodOrLocation}
                          </span>
                          <span className="text-xs font-mono text-[#D4AF37] group-hover:translate-x-0.5 transition-transform">
                            Open Case →
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-[#A09890] leading-relaxed font-sans">{ex.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Economic Architecture & State Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#141414] border border-[#2A2A2A] rounded-2xl space-y-2 shadow-lg">
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1.5">
                    📈 Economic Architecture & Market Model:
                  </span>
                  <p className="text-xs text-[#C0B8B0] leading-relaxed font-sans">{selectedIdeology.economicModel}</p>
                </div>
                <div className="p-5 bg-[#141414] border border-[#2A2A2A] rounded-2xl space-y-2 shadow-lg">
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1.5">
                    🏛️ View of State Power & Authority:
                  </span>
                  <p className="text-xs text-[#C0B8B0] leading-relaxed font-sans">{selectedIdeology.viewOfState}</p>
                </div>
              </div>

              {/* Criticisms & Foundational Texts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#191313] border border-[#442222]/50 rounded-2xl space-y-2 shadow-lg">
                  <span className="text-[10px] font-mono font-bold text-[#FF8888] uppercase block">
                    Prominent Criticisms & Objections:
                  </span>
                  <ul className="list-disc pl-4 text-xs text-[#D0B8B8] space-y-1.5 font-sans">
                    {selectedIdeology.criticisms.map((crit, idx) => (
                      <li key={idx} className="leading-relaxed">{crit}</li>
                    ))}
                  </ul>
                </div>

                {selectedIdeology.keyTextsOrManifestos && (
                  <div className="p-5 bg-[#121812] border border-[#224422]/50 rounded-2xl space-y-2 shadow-lg">
                    <span className="text-[10px] font-mono font-bold text-[#88FF88] uppercase block">
                      Canonical Texts & Seminal Manifestos:
                    </span>
                    <div className="space-y-1.5">
                      {selectedIdeology.keyTextsOrManifestos.map((text, idx) => (
                        <div key={idx} className="p-2 bg-black/40 border border-[#284828] rounded-xl text-xs font-mono text-[#A8E0A8] flex items-center gap-2">
                          <span>📖</span>
                          <span className="font-semibold">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT SIDEBAR: "RELATED ENCYCLOPEDIA" SIDEBAR (4 Columns) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Related Encyclopedia Sidebar Container */}
              <div className="bg-[#111111] border-2 border-[#D4AF37]/50 rounded-3xl p-5 sm:p-6 space-y-6 shadow-2xl sticky top-24">
                
                <div className="border-b border-[#2A2A2A] pb-3 space-y-1">
                  <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" /> Related Encyclopedia
                  </span>
                  <h4 className="text-lg font-serif font-bold text-white">
                    Historical Archives & Entries
                  </h4>
                  <p className="text-[11px] text-[#A09890]">
                    Dynamically linked Wikipedia-style encyclopedia records for historical figures, philosophers, and eras associated with {selectedIdeology.name}.
                  </p>
                </div>

                {/* Section A: Associated Historical Figures & Philosophers */}
                <div className="space-y-3">
                  <span className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> Associated Historical Figures ({relatedEncyclopediaItems.figures.length})
                  </span>

                  <div className="space-y-2">
                    {relatedEncyclopediaItems.figures.map((fig, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOpenWikiPage(fig.key, {
                          name: fig.name,
                          role: fig.role,
                          ideology: selectedIdeology.name
                        })}
                        className="w-full text-left p-3 bg-[#171717] hover:bg-[#202020] border border-[#2A2A2A] hover:border-[#D4AF37]/50 rounded-xl transition-all cursor-pointer group shadow-sm flex items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate">
                              {fig.name}
                            </span>
                          </div>
                          <p className="text-[10px] font-mono text-[#A09890] truncate">{fig.role}</p>
                        </div>
                        <span className="px-2 py-1 bg-[#1F1B12] text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-mono font-bold rounded-lg group-hover:bg-[#D4AF37] group-hover:text-black transition-all shrink-0">
                          Wiki Entry
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section B: Associated Historical Eras & Civilizations */}
                <div className="space-y-3 pt-2 border-t border-[#222]">
                  <span className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-[#D4AF37]" /> Associated Eras & Civilizations ({relatedEncyclopediaItems.eras.length})
                  </span>

                  <div className="space-y-2">
                    {relatedEncyclopediaItems.eras.map((era, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOpenWikiPage(era.key, {
                          name: era.title,
                          role: `Historical Era (${era.period})`,
                          ideology: selectedIdeology.name
                        })}
                        className="w-full text-left p-3 bg-[#171717] hover:bg-[#202020] border border-[#2A2A2A] hover:border-[#D4AF37]/50 rounded-xl transition-all cursor-pointer group shadow-sm space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                            🏛️ {era.title}
                          </span>
                          <span className="text-[9px] font-mono text-[#A09890] shrink-0 bg-black/40 px-1.5 py-0.5 rounded">{era.period}</span>
                        </div>
                        <p className="text-[10px] text-[#A09890] leading-snug line-clamp-2">{era.description}</p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#D4AF37] group-hover:underline pt-0.5">
                          Open Era Wiki Profile →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section C: Associated Events & Cases */}
                {relatedEncyclopediaItems.events.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-[#222]">
                    <span className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-[#D4AF37]" /> Historical Case Studies & Events
                    </span>

                    <div className="space-y-2">
                      {relatedEncyclopediaItems.events.map((ev, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOpenCaseStudy(ev.title)}
                          className="w-full text-left p-3 bg-[#171717] hover:bg-[#202020] border border-[#2A2A2A] hover:border-[#D4AF37]/50 rounded-xl transition-all cursor-pointer group shadow-sm space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate">
                              📜 {ev.title}
                            </span>
                            <span className="text-[9px] font-mono text-[#D4AF37] shrink-0">{ev.period}</span>
                          </div>
                          <p className="text-[10px] text-[#A09890] leading-snug line-clamp-2">{ev.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Facts Box */}
                <div className="p-4 bg-[#14120D] border border-[#D4AF37]/30 rounded-2xl space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase block">Quick Metadata:</span>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-[#A09890]">
                      <span>Category:</span>
                      <span className="text-white font-mono text-right">{selectedIdeology.category}</span>
                    </div>
                    <div className="flex justify-between text-[#A09890]">
                      <span>Spectrum:</span>
                      <span className="text-white font-mono text-right">{selectedIdeology.spectrumPlacement}</span>
                    </div>
                    <div className="flex justify-between text-[#A09890]">
                      <span>Origins:</span>
                      <span className="text-white font-mono text-right">{selectedIdeology.historicalOrigins}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Dive Page Navigation Footer */}
            <div className="bg-[#121212] border border-[#2A2A2A] p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleBackToList}
                className="px-4 py-2.5 bg-[#181818] hover:bg-[#252525] text-[#A09890] hover:text-white border border-[#333] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to All Ideologies
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleNavigateIdeologyDive('prev')}
                  className="px-4 py-2.5 bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/50 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Ideology</span>
                </button>
                <span className="text-xs font-mono text-[#8E867C] px-3 font-bold">
                  {ALL_POLITICAL_IDEOLOGIES.findIndex(i => i.id === selectedIdeology.id) + 1} / {ALL_POLITICAL_IDEOLOGIES.length}
                </span>
                <button
                  type="button"
                  onClick={() => handleNavigateIdeologyDive('next')}
                  className="px-4 py-2.5 bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/50 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Next Ideology</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 4. STANDARD VAULT EXPLORER VIEW (Search + Grid + Spotlight + Compare)     */
        /* ========================================================================= */
        <>
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-[#121212] via-[#1A1813] to-[#0A0A0A] border border-[#2A2A2A] p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">
              ⚖️
            </div>
            
            <div className="max-w-3xl space-y-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono font-bold uppercase rounded-md tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3 h-3" /> Political Philosophy Archive
                </span>
                <span className="text-xs font-mono text-[#A09890]">
                  Comprehensive World Ideology Compendium
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif italic font-bold tracking-tight text-[#D4AF37]">
                World Political Ideologies & Governance Systems
              </h2>
              
              <p className="text-xs sm:text-sm text-[#A09890] leading-relaxed font-sans">
                Explore human political, economic, and philosophical thought across ancient, modern, and emerging eras. Every entry details its <strong>Founding Father</strong>, prominent historical architects and leaders, core tenets, <strong>real-world everyday examples</strong>, economic models, and linked <strong>Wikipedia encyclopedia archives</strong>.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={handleToggleCompare}
                  className={`px-4.5 py-2.5 font-bold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer border ${
                    isCompareOpen
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[#D4AF37]/20 scale-102'
                      : 'bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border-[#D4AF37]/50'
                  }`}
                >
                  <Scale className="w-4 h-4" /> {isCompareOpen ? 'Hide In-Place Comparison' : 'Compare 2 Ideologies Side-by-Side'}
                </button>
                <button
                  onClick={handleTriggerSpotlight}
                  className="px-4.5 py-2.5 bg-[#1C1811] hover:bg-[#2A2418] text-[#D4AF37] border border-[#D4AF37]/40 font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md hover:border-[#D4AF37]"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" /> Random Ideology Spotlight
                </button>
              </div>
            </div>
          </div>

          {/* In-Place Spotlight Showcase Card */}
          {spotlightIdeology && (
            <div ref={spotlightRef} className="bg-gradient-to-r from-[#1E1911] via-[#14120D] to-[#121212] border-2 border-[#D4AF37] p-6 sm:p-7 rounded-3xl relative overflow-hidden shadow-2xl animate-fade-in space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-3 bg-[#1C1811] border border-[#D4AF37] rounded-2xl shadow-md">
                    {spotlightIdeology.iconSymbol || '📜'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-[#D4AF37] text-black font-mono font-bold text-[10px] uppercase rounded-md tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Ideology Spotlight
                      </span>
                      <span className="text-xs font-mono text-[#D4AF37]/90">{spotlightIdeology.category}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                      {spotlightIdeology.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTriggerSpotlight}
                    className="px-3 py-1.5 bg-[#2A2418] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-mono text-xs font-bold rounded-xl transition-all cursor-pointer border border-[#D4AF37]/40 flex items-center gap-1"
                    title="Roll another random ideology"
                  >
                    <Sparkles className="w-3 h-3" /> Roll Next
                  </button>
                  <button
                    onClick={() => setSpotlightIdeology(null)}
                    className="p-2 bg-[#1C1811] hover:bg-[#2A2418] text-[#A09890] hover:text-white rounded-full transition-all cursor-pointer border border-[#333]"
                    title="Close spotlight"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Father of Spotlight Ideology */}
              {spotlightIdeology.foundingFather && (
                <div className="p-3 bg-[#1E1810] border border-[#D4AF37]/50 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase">Father / Founder:</span>
                    <span className="text-sm font-bold text-white">{spotlightIdeology.foundingFather}</span>
                    {spotlightIdeology.foundingFatherTitle && (
                      <span className="text-xs font-mono text-[#A09890] hidden md:inline">({spotlightIdeology.foundingFatherTitle})</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleOpenWikiPage(spotlightIdeology.foundingFather!, {
                      name: spotlightIdeology.foundingFather,
                      role: spotlightIdeology.foundingFatherTitle || `Father of ${spotlightIdeology.name}`,
                      ideology: spotlightIdeology.name
                    })}
                    className="px-2.5 py-1 bg-[#121212] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-[10px] font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <BookOpen className="w-3 h-3" /> Wiki Entry
                  </button>
                </div>
              )}

              <p className="text-sm italic font-serif text-[#D4AF37] border-l-2 border-[#D4AF37] pl-3 py-1">
                "{spotlightIdeology.tagline}"
              </p>

              <p className="text-xs text-[#C0B8B0] leading-relaxed font-sans">
                {spotlightIdeology.definition}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-[#141414] border border-[#2A2A2A] rounded-2xl space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5" /> Historical Origins:
                  </span>
                  <p className="text-xs text-[#E0D8D0]">{spotlightIdeology.historicalOrigins}</p>
                </div>

                <div className="p-3.5 bg-[#141414] border border-[#2A2A2A] rounded-2xl space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Core Tenets:
                  </span>
                  <ul className="space-y-1 text-[#C0B8B0] text-xs list-disc pl-4">
                    {spotlightIdeology.coreTenets.slice(0, 3).map((tenet, tIdx) => (
                      <li key={tIdx} className="leading-snug">{tenet}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#2A2A2A]">
                <span className="text-xs font-mono text-[#A09890] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> {spotlightIdeology.spectrumPlacement}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSelectIdeology(spotlightIdeology)}
                    className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    Open Full-Page Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenNoteModal(spotlightIdeology)}
                    className="px-3.5 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white text-xs font-bold rounded-xl transition-all cursor-pointer border border-[#333] flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#D4AF37]" /> Note
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* In-Place Side-by-Side Comparison Studio */}
          {isCompareOpen && (
            <div ref={comparatorRef} className="bg-[#101010] border-2 border-[#D4AF37]/70 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in relative text-left">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2A2A2A] pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-4 h-4" /> In-Place Comparative Studio
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Compare Two Political Ideologies Side-by-Side
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSwapCompare}
                    className="px-3.5 py-2 bg-[#1C1811] hover:bg-[#2A2418] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                    title="Swap Ideology A and B"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" /> Swap Sides
                  </button>
                  <button
                    onClick={() => setIsCompareOpen(false)}
                    className="p-2 bg-[#181818] hover:bg-[#252525] text-[#A09890] hover:text-white rounded-full transition-all cursor-pointer border border-[#333]"
                    title="Close comparator"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Preset Matchups */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#A09890] uppercase block">Quick Comparative Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {comparePresetPairs.map((pair, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCompareIdA(pair.idA);
                        setCompareIdB(pair.idB);
                        playSound('click');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-sans transition-all cursor-pointer border ${
                        compareIdA === pair.idA && compareIdB === pair.idB
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md'
                          : 'bg-[#161616] text-[#C0B8B0] border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
                      }`}
                    >
                      {pair.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dropdown Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#D4AF37] uppercase font-bold block">Ideology A:</label>
                  <select
                    value={compareIdA}
                    onChange={(e) => { setCompareIdA(e.target.value); playSound('click'); }}
                    className="w-full p-3 bg-[#181818] text-[#D4AF37] font-bold text-xs sm:text-sm border border-[#333] rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
                  >
                    {ALL_POLITICAL_IDEOLOGIES.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.iconSymbol || '📜'} {item.name} ({item.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#D4AF37] uppercase font-bold block">Ideology B:</label>
                  <select
                    value={compareIdB}
                    onChange={(e) => { setCompareIdB(e.target.value); playSound('click'); }}
                    className="w-full p-3 bg-[#181818] text-[#D4AF37] font-bold text-xs sm:text-sm border border-[#333] rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
                  >
                    {ALL_POLITICAL_IDEOLOGIES.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.iconSymbol || '📜'} {item.name} ({item.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comparison Side-by-Side Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#222]">
                {/* Column A */}
                <div className="p-5 bg-[#141414] border border-[#2A2A2A] hover:border-[#D4AF37]/50 rounded-2xl space-y-4 transition-all">
                  <div className="flex items-center gap-3 border-b border-[#2A2A2A] pb-3">
                    <span className="text-3xl p-2 bg-[#1C1811] border border-[#D4AF37]/40 rounded-xl">{ideologyA.iconSymbol || '📜'}</span>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-[#D4AF37]">{ideologyA.name}</h4>
                      <span className="text-[10px] font-mono text-[#A09890]">{ideologyA.category}</span>
                    </div>
                  </div>

                  {/* Father of Ideology */}
                  <div className="p-3 bg-[#1C1811] border border-[#D4AF37]/40 rounded-xl space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1">
                      <Crown className="w-3 h-3 text-[#D4AF37]" /> Father of the Ideology:
                    </span>
                    <p className="text-xs font-bold text-white">{ideologyA.foundingFather || 'Historical Thinkers'}</p>
                    {ideologyA.foundingFatherTitle && (
                      <p className="text-[10px] font-mono text-[#A09890]">{ideologyA.foundingFatherTitle}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#A09890] uppercase block">Tagline & Core Philosophy:</span>
                    <p className="text-xs italic text-[#D4AF37]">"{ideologyA.tagline}"</p>
                    <p className="text-xs text-[#C0B8B0] leading-relaxed">{ideologyA.definition}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#A09890] uppercase block">Economic Model:</span>
                    <p className="text-xs text-[#C0B8B0] leading-relaxed">{ideologyA.economicModel}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#A09890] uppercase block">View of the State:</span>
                    <p className="text-xs text-[#C0B8B0] leading-relaxed">{ideologyA.viewOfState}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#A09890] uppercase block">Core Philosophical Tenets:</span>
                    <ul className="list-disc pl-4 text-xs text-[#A09890] space-y-1">
                      {ideologyA.coreTenets.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1 pt-2">
                    <button
                      onClick={() => handleSelectIdeology(ideologyA)}
                      className="w-full py-2 bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Open Full-Page {ideologyA.name} Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Column B */}
                <div className="p-5 bg-[#141414] border border-[#2A2A2A] hover:border-[#D4AF37]/50 rounded-2xl space-y-4 transition-all">
                  <div className="flex items-center gap-3 border-b border-[#2A2A2A] pb-3">
                    <span className="text-3xl p-2 bg-[#1C1811] border border-[#D4AF37]/40 rounded-xl">{ideologyB.iconSymbol || '📜'}</span>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-[#D4AF37]">{ideologyB.name}</h4>
                      <span className="text-[10px] font-mono text-[#A09890]">{ideologyB.category}</span>
                    </div>
                  </div>

                  {/* Father of Ideology */}
                  <div className="p-3 bg-[#1C1811] border border-[#D4AF37]/40 rounded-xl space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1">
                      <Crown className="w-3 h-3 text-[#D4AF37]" /> Father of the Ideology:
                    </span>
                    <p className="text-xs font-bold text-white">{ideologyB.foundingFather || 'Historical Thinkers'}</p>
                    {ideologyB.foundingFatherTitle && (
                      <p className="text-[10px] font-mono text-[#A09890]">{ideologyB.foundingFatherTitle}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#A09890] uppercase block">Tagline & Core Philosophy:</span>
                    <p className="text-xs italic text-[#D4AF37]">"{ideologyB.tagline}"</p>
                    <p className="text-xs text-[#C0B8B0] leading-relaxed">{ideologyB.definition}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#A09890] uppercase block">Economic Model:</span>
                    <p className="text-xs text-[#C0B8B0] leading-relaxed">{ideologyB.economicModel}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#A09890] uppercase block">View of the State:</span>
                    <p className="text-xs text-[#C0B8B0] leading-relaxed">{ideologyB.viewOfState}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#A09890] uppercase block">Core Philosophical Tenets:</span>
                    <ul className="list-disc pl-4 text-xs text-[#A09890] space-y-1">
                      {ideologyB.coreTenets.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1 pt-2">
                    <button
                      onClick={() => handleSelectIdeology(ideologyB)}
                      className="w-full py-2 bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Open Full-Page {ideologyB.name} Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search & Category Filter Bar with Predictive Guessing */}
          <div className="bg-[#0F0F0F] border border-[#2A2A2A] p-5 sm:p-6 rounded-2xl space-y-4 shadow-xl relative z-30">
            {/* Search Header and Scope Selectors */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222] pb-3">
              <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1.5">
                <Search className="w-4 h-4 text-[#D4AF37]" /> Predictive Ideology & Thinker Search
              </span>
              <div className="flex flex-wrap items-center gap-1 text-[11px]">
                <span className="text-[#A09890] font-mono mr-1">Search in:</span>
                {[
                  { scope: 'all', label: 'All Fields' },
                  { scope: 'father', label: '👑 Father & Key Figures' },
                  { scope: 'thinkers', label: '👥 Philosophers' },
                  { scope: 'economics', label: '📈 Economic Model' },
                  { scope: 'tenets', label: '📜 Core Tenets' },
                ].map((tab) => (
                  <button
                    key={tab.scope}
                    onClick={() => { setSearchScope(tab.scope as SearchScope); playSound('click'); }}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium ${
                      searchScope === tab.scope
                        ? 'bg-[#D4AF37] text-black font-bold shadow'
                        : 'bg-[#181818] text-[#A09890] hover:text-white border border-[#2A2A2A]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Predictive Search Input with Ghost Guess Text */}
            <div className="relative">
              {/* Ghost text display overlay behind the real input */}
              {ghostPrediction && searchQuery && isSearchFocused && (
                <div 
                  className="absolute inset-0 pl-10.5 pr-12 py-3 text-xs sm:text-sm font-sans pointer-events-none text-[#A09890]/40 flex items-center overflow-hidden whitespace-pre"
                  aria-hidden="true"
                >
                  <span className="invisible">{searchQuery}</span>
                  <span>{ghostPrediction.slice(searchQuery.length)}</span>
                  <span className="ml-2 text-[10px] font-mono bg-[#2A2A2A] text-[#D4AF37] px-1.5 py-0.2 rounded border border-[#444] opacity-80">
                    Tab ⇥ or ➔
                  </span>
                </div>
              )}

              <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-[#D4AF37]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedSuggestionIndex(-1);
                }}
                onKeyDown={handleKeyDownSearch}
                placeholder="Type any philosopher, father, ideology, economic model (e.g. 'Locke', 'Marx', 'Laissez-Faire', 'Subsidiarity')..."
                className="w-full pl-10.5 pr-12 py-3 bg-[#141414] text-white text-xs sm:text-sm border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all font-sans relative z-10 bg-opacity-90"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); playSound('click'); }}
                  className="absolute right-3.5 top-3 p-1 text-[#A09890] hover:text-white bg-[#222] hover:bg-[#333] rounded-full cursor-pointer transition-all z-20"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Predictive Dropdown Menu (Fast & Guessable) */}
              {isSearchFocused && filteredSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#121212] border-2 border-[#D4AF37]/50 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in divide-y divide-[#222]">
                  <div className="px-3 py-1 text-[10px] font-mono text-[#D4AF37] uppercase flex items-center justify-between">
                    <span>⚡ Instant Predictive Suggestions:</span>
                    <span className="text-[#A09890]">Press Tab or Enter to select</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1 pt-1">
                    {filteredSuggestions.map((sug, idx) => {
                      const isSelected = selectedSuggestionIndex === idx;
                      return (
                        <button
                          key={sug.id}
                          onMouseDown={() => handleApplySuggestion(sug)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#D4AF37] text-black font-bold' 
                              : 'hover:bg-[#1C1811] text-[#E0D8D0] hover:text-[#D4AF37]'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base shrink-0">
                              {sug.type === 'father' ? '👑' :
                               sug.type === 'ideology' ? '⚖️' :
                               sug.type === 'economics' ? '📈' :
                               sug.type === 'case_study' ? '🏛️' :
                               sug.type === 'tenet' ? '📜' : '👤'}
                            </span>
                            <div className="truncate">
                              <span className="font-semibold block truncate">{sug.label}</span>
                              {sug.subtext && (
                                <span className={`text-[10px] block truncate ${isSelected ? 'text-black/70' : 'text-[#A09890]'}`}>
                                  {sug.subtext}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                              isSelected ? 'bg-black/20 text-black' : 'bg-[#1C1C1C] text-[#A09890]'
                            }`}>
                              {sug.type}
                            </span>
                            <CornerDownLeft className="w-3 h-3 opacity-60" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono text-[#A09890] uppercase tracking-wider mr-1">Popular searches:</span>
              {[
                { label: '👑 John Locke', query: 'John Locke', scope: 'father' as SearchScope },
                { label: '👑 Karl Marx', query: 'Karl Marx', scope: 'father' as SearchScope },
                { label: '👑 Adam Smith', query: 'Adam Smith', scope: 'father' as SearchScope },
                { label: '👑 Edmund Burke', query: 'Edmund Burke', scope: 'father' as SearchScope },
                { label: '👑 Proudhon', query: 'Proudhon', scope: 'father' as SearchScope },
                { label: '📈 Laissez-Faire', query: 'Laissez-Faire', scope: 'economics' as SearchScope },
                { label: '📜 Subsidiarity', query: 'Subsidiarity', scope: 'tenets' as SearchScope },
                { label: '📈 Land Value Tax', query: 'Land Value Tax', scope: 'economics' as SearchScope }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(item.query);
                    setSearchScope(item.scope);
                    playSound('click');
                  }}
                  className="px-2.5 py-1 bg-[#181818] hover:bg-[#252525] text-[#C0B8B0] hover:text-[#D4AF37] border border-[#262626] hover:border-[#D4AF37]/40 rounded-lg text-[11px] transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Category Filter Chips */}
            <div className="space-y-2 pt-2 border-t border-[#222]">
              <div className="flex items-center justify-between text-xs text-[#A09890] font-mono">
                <span className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#D4AF37]" /> Filter by Category:
                </span>
                <span>Showing {filteredIdeologies.length} matching ideologies</span>
              </div>

              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => { setSelectedCategory('all'); playSound('click'); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    selectedCategory === 'all'
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md font-bold'
                      : 'bg-[#151515] text-[#A09890] border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
                  }`}
                >
                  All Ideologies
                </button>
                {IDEOLOGY_CATEGORIES.map(cat => (
                  <button
                    key={cat.category}
                    onClick={() => { setSelectedCategory(cat.category); playSound('click'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border flex items-center gap-1.5 ${
                      selectedCategory === cat.category
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md font-bold'
                        : 'bg-[#151515] text-[#A09890] border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary & Top Pagination Controls */}
          <div className="flex items-center justify-between text-xs font-mono text-[#A09890] flex-wrap gap-2">
            <span>
              Showing <strong className="text-[#E5C158]">{filteredIdeologies.length}</strong> Political Ideologies (Page {currentPage} of {Math.max(1, totalPages)})
            </span>
          </div>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredIdeologies.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(num) => {
              setItemsPerPage(num);
              setCurrentPage(1);
            }}
            itemsPerPageOptions={[12, 24, 48, 96]}
            itemLabel="ideologies"
            compact={true}
          />

          {/* Grid of Ideology Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paginatedIdeologies.map(ideology => {
              const isBookmarked = bookmarks.some(b => b.targetId === ideology.id && b.type === 'figure');
              const isExpanded = !!expandedCardIds[ideology.id];

              return (
                <div
                  key={ideology.id}
                  id={`ideology-card-${ideology.id}`}
                  className="bg-[#111111] border border-[#262626] hover:border-[#D4AF37]/60 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-xl flex flex-col justify-between group text-left relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2.5 bg-[#1A1813] border border-[#D4AF37]/30 rounded-xl shadow-inner">
                          {ideology.iconSymbol || '📜'}
                        </span>
                        <div>
                          <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                            {ideology.name}
                          </h3>
                          <p className="text-[11px] font-mono text-[#D4AF37]/90 mt-0.5">
                            {ideology.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={`https://en.wikipedia.org/wiki/${encodeURIComponent(ideology.name.replace(/\s+/g, '_'))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-[#181818] text-[#A09890] border border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all cursor-pointer"
                          title={`Open Wikipedia article on ${ideology.name}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => onToggleBookmark(ideology.id, 'figure', ideology.name, ideology.category)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer ${
                            isBookmarked
                              ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                              : 'bg-[#181818] text-[#A09890] border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
                          }`}
                          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Ideology'}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenNoteModal(ideology)}
                          className="p-2 rounded-lg bg-[#181818] text-[#A09890] border border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all cursor-pointer"
                          title="Take Notes on this Ideology"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Father of the Ideology Ribbon */}
                    {ideology.foundingFather && (
                      <div className="p-2.5 bg-[#17140E] border border-[#D4AF37]/35 rounded-xl flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Crown className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase">Father / Founder:</span>
                          <span className="text-xs text-white font-semibold">{ideology.foundingFather}</span>
                        </div>
                        <button
                          onClick={() => handleOpenWikiPage(ideology.foundingFather!, {
                            name: ideology.foundingFather,
                            role: ideology.foundingFatherTitle || `Father of ${ideology.name}`,
                            ideology: ideology.name
                          })}
                          className="text-[10px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <BookOpen className="w-3 h-3" /> Wiki Entry
                        </button>
                      </div>
                    )}

                    {/* Tagline */}
                    <p className="text-xs font-serif italic text-[#D4AF37] border-l-2 border-[#D4AF37] pl-3 py-0.5">
                      "{ideology.tagline}"
                    </p>

                    {/* Definition */}
                    <p className="text-xs text-[#C0B8B0] leading-relaxed font-sans">
                      {ideology.definition}
                    </p>

                    {/* Spectrum & Historical Origin Badge Row */}
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span className="px-2.5 py-1 bg-[#1A1A1A] border border-[#333] rounded-lg text-[#E0D8D0] font-mono flex items-center gap-1">
                        <Compass className="w-3 h-3 text-[#D4AF37]" /> {ideology.spectrumPlacement}
                      </span>
                      <span className="px-2.5 py-1 bg-[#1A1813] border border-[#D4AF37]/25 rounded-lg text-[#D4AF37] font-mono flex items-center gap-1">
                        🏛️ {ideology.historicalOrigins}
                      </span>
                    </div>

                    {/* Key Figures and Historical Characters */}
                    {ideology.keyFigures && ideology.keyFigures.length > 0 ? (
                      <div className="space-y-1.5 text-xs">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A09890] flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#D4AF37]" /> Key Historical Characters & Roles:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {ideology.keyFigures.slice(0, isExpanded ? ideology.keyFigures.length : 2).map((fig, fIdx) => (
                            <div key={fIdx} className="p-2 bg-[#161616] border border-[#282828] rounded-lg space-y-0.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white">{fig.name}</span>
                                <span className="text-[9px] font-mono text-[#D4AF37] bg-[#1E1911] px-1 py-0.5 rounded border border-[#D4AF37]/25">{fig.role}</span>
                              </div>
                              <p className="text-[10px] text-[#A09890] leading-tight line-clamp-2">{fig.contribution}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1 text-xs">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A09890] block">
                          Key Philosophers & Thinkers:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {ideology.keyThinkers.map((thinker, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[#161616] border border-[#2A2A2A] rounded-md text-[#E0D8D0] text-[11px]">
                              {thinker}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Core Tenets */}
                    <div className="space-y-1 text-xs">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A09890] block">
                        Core Philosophical Tenets:
                      </span>
                      <ul className="space-y-1 text-[#B0A8A0] pl-3 list-disc">
                        {ideology.coreTenets.slice(0, isExpanded ? ideology.coreTenets.length : 2).map((tenet, idx) => (
                          <li key={idx} className="leading-snug">
                            {tenet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expandable Deep Details */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-[#222] space-y-4 text-xs animate-fade-in">
                        {/* All Key Figures if more than 2 */}
                        {ideology.keyFigures && ideology.keyFigures.length > 2 && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] block">
                              All Key Architects & Figures:
                            </span>
                            <div className="space-y-1.5">
                              {ideology.keyFigures.slice(2).map((fig, fIdx) => (
                                <div key={fIdx} className="p-2.5 bg-[#161616] border border-[#282828] rounded-xl space-y-0.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white">{fig.name}</span>
                                    <span className="text-[10px] font-mono text-[#D4AF37] bg-[#1E1911] px-1.5 py-0.5 rounded border border-[#D4AF37]/25">{fig.role}</span>
                                  </div>
                                  <p className="text-[11px] text-[#A09890] leading-relaxed">{fig.contribution}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Real World Examples */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] block">
                            Real-World Governance Cases:
                          </span>
                          <div className="space-y-2">
                            {ideology.realWorldExamples.map((ex, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleOpenCaseStudy(ex.title)}
                                className="w-full text-left p-3 bg-[#161616] hover:bg-[#202020] border border-[#2A2A2A] hover:border-[#D4AF37]/50 rounded-xl space-y-1 transition-all cursor-pointer group"
                              >
                                <div className="flex items-center justify-between text-[11px] font-semibold text-white">
                                  <span className="group-hover:text-[#D4AF37]">🏛️ {ex.title}</span>
                                  <span className="text-[#D4AF37] font-mono text-[10px]">{ex.periodOrLocation} →</span>
                                </div>
                                <p className="text-[#A09890] text-xs leading-relaxed">{ex.description}</p>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Economic Model & View of the State */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-[#141414] border border-[#2A2A2A] rounded-xl space-y-1">
                            <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase block">Economic Model:</span>
                            <p className="text-[#C0B8B0] text-[11px] leading-relaxed">{ideology.economicModel}</p>
                          </div>
                          <div className="p-2.5 bg-[#141414] border border-[#2A2A2A] rounded-xl space-y-1">
                            <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase block">View of the State:</span>
                            <p className="text-[#C0B8B0] text-[11px] leading-relaxed">{ideology.viewOfState}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 mt-4 border-t border-[#222] flex items-center justify-between">
                    <button
                      onClick={() => toggleExpand(ideology.id)}
                      className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                      ) : (
                        <>Quick Summary <ChevronDown className="w-3.5 h-3.5" /></>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setCompareIdA(ideology.id);
                          setIsCompareOpen(true);
                          playSound('click');
                          setTimeout(() => comparatorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                        }}
                        className="px-2.5 py-1 bg-[#161616] hover:bg-[#252525] text-[#A09890] hover:text-white border border-[#2A2A2A] text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1"
                        title="Compare in side-by-side tool"
                      >
                        <Scale className="w-3 h-3" /> Compare
                      </button>
                      <button
                        onClick={() => handleSelectIdeology(ideology)}
                        className="px-3 py-1 bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1"
                      >
                        Deep View <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination Controls */}
          {filteredIdeologies.length > 0 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredIdeologies.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(num) => {
                setItemsPerPage(num);
                setCurrentPage(1);
              }}
              itemsPerPageOptions={[12, 24, 48, 96]}
              itemLabel="ideologies"
            />
          )}

          {filteredIdeologies.length === 0 && (
            <div className="text-center py-16 bg-[#101010] border border-[#2A2A2A] rounded-2xl p-8 space-y-3">
              <p className="text-4xl">🔍</p>
              <h4 className="text-lg font-bold text-[#D4AF37]">No Ideologies Found</h4>
              <p className="text-xs text-[#A09890] max-w-md mx-auto font-sans">
                No political ideology matches "{searchQuery}" in category "{selectedCategory}". Try selecting "All Fields" in search scope, or search for terms like "Locke", "Marx", "Smith", "liberty", or "equality".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSearchScope('all'); }}
                className="px-4 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </>
      )}

      {/* Note Taking Modal */}
      {noteModalIdeology && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in text-left">
          <div className="bg-[#141414] border border-[#D4AF37]/50 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
              <h4 className="text-sm font-mono font-bold text-[#D4AF37] uppercase">Add Note to Study Notebook</h4>
              <button onClick={() => setNoteModalIdeology(null)} className="text-[#A09890] hover:text-white cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-[#A09890] block mb-1">Note Title:</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full p-2.5 bg-[#1B1B1B] text-white text-xs border border-[#333] rounded-xl focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#A09890] block mb-1">Note Content:</label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={6}
                  className="w-full p-2.5 bg-[#1B1B1B] text-white text-xs border border-[#333] rounded-xl focus:border-[#D4AF37] font-mono leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNoteModalIdeology(null)}
                  className="px-4 py-2 bg-[#202020] text-xs text-white rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#E5C158] transition-all cursor-pointer"
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
