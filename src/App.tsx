import { useState, useEffect } from 'react';
import { Globe, Map, History, Shield, FileEdit, GraduationCap, Search, Sparkles, BookMarked, BookOpen, User, Volume2, VolumeX, Scale, Lightbulb, Calendar, Swords, Compass, Building2, RotateCw, Crown, Scroll, Clock, X } from 'lucide-react';
import WorldMap from './components/WorldMap';
import TimelineSection from './components/TimelineSection';
import VaultSection from './components/VaultSection';
import QuizSection from './components/QuizSection';
import NotesSection from './components/NotesSection';
import AIPortal from './components/AIPortal';
import EncyclopediaSection from './components/EncyclopediaSection';
import VaultDoorReveal from './components/VaultDoorReveal';
import PhilosophersSection from './components/PhilosophersSection';
import CompareSection from './components/CompareSection';
import DidYouKnowSection from './components/DidYouKnowSection';
import OnThisDaySection from './components/OnThisDaySection';
import OnThisDayWidget from './components/OnThisDayWidget';
import DidYouKnowWidget from './components/DidYouKnowWidget';
import BattlesSection from './components/BattlesSection';
import ResearchPapersSection from './components/ResearchPapersSection';
import PoliticalIdeologiesSection from './components/PoliticalIdeologiesSection';
import WorldMonumentsSection from './components/WorldMonumentsSection';
import DailyArtifactSection from './components/DailyArtifactSection';
import DailyArtifactWidget from './components/DailyArtifactWidget';
import Animated3DHistoryLogo from './components/Animated3DHistoryLogo';
import PersonalProfileModal from './components/PersonalProfileModal';
import PrimarySourcesSection from './components/PrimarySourcesSection';
import SearchDetailModal, { SearchDetailItem } from './components/SearchDetailModal';
import { UserNote, HistoricalEvent, Bookmark } from './types';
import { MONARCHS, HISTORICAL_FIGURES, HISTORICAL_EVENTS, COUNTRIES } from './data/historyData';
import { PHILOSOPHERS } from './data/philosophersData';
import { ALL_HISTORICAL_BATTLES } from './data/battlesData';
import { ALL_RESEARCH_PAPERS } from './data/researchPapersData';
import { ALL_POLITICAL_IDEOLOGIES } from './data/ideologies';
import { ALL_WORLD_MONUMENTS } from './data/monuments';
import { ALL_DAILY_ARTIFACTS } from './data/dailyArtifacts';
import { SPOTLIGHT_FIGURES } from './data/spotlightFiguresData';
import { ALL_PRIMARY_SOURCES_AND_SPEECHES as PRIMARY_SOURCES } from './data/allPrimarySources';
import { mergeVaultBackupData } from './utils/backupManager';
import { getSoundEnabled, setSoundEnabled, playSound } from './utils/audio';

export default function App() {
  // Navigation with persistence
  const [activeTab, setActiveTab] = useState<'map' | 'artifacts' | 'timeline' | 'vaults' | 'quizzes' | 'notes' | 'scholar' | 'encyclopedia' | 'philosophers' | 'compare' | 'facts' | 'on-this-day' | 'battles' | 'papers' | 'ideologies' | 'monuments' | 'decrees'>(() => {
    try {
      const savedTab = localStorage.getItem('chronos_active_tab');
      const validTabs = ['map', 'artifacts', 'timeline', 'vaults', 'quizzes', 'notes', 'scholar', 'encyclopedia', 'philosophers', 'compare', 'facts', 'on-this-day', 'battles', 'papers', 'ideologies', 'monuments', 'decrees'];
      if (savedTab && validTabs.includes(savedTab)) {
        return savedTab as any;
      }
    } catch (e) {
      console.error("Error reading saved tab:", e);
    }
    return 'map';
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedPhilosopherId, setSelectedPhilosopherId] = useState<string>('socrates');
  const [focusFactId, setFocusFactId] = useState<string | undefined>(undefined);
  const [focusBattleId, setFocusBattleId] = useState<string | undefined>(undefined);
  const [focusPaperId, setFocusPaperId] = useState<string | undefined>(undefined);
  const [focusIdeologyId, setFocusIdeologyId] = useState<string | undefined>(undefined);
  const [focusArtifactId, setFocusArtifactId] = useState<string | undefined>(undefined);
  const [spotlightFigureId, setSpotlightFigureId] = useState<string | undefined>(undefined);
  const [vaultFocusFigureId, setVaultFocusFigureId] = useState<string | undefined>(undefined);
  const [vaultInitialTab, setVaultInitialTab] = useState<'monarchs' | 'figures' | 'leaders' | 'countries' | 'articles' | 'vault600' | undefined>(undefined);
  
  // Sound Settings State
  const [soundEnabled, setSoundEnabledState] = useState(() => getSoundEnabled());

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    setSoundEnabledState(nextVal);
    if (nextVal) {
      playSound('click');
    }
  };

  const changeTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    try {
      localStorage.setItem('chronos_active_tab', tab);
    } catch (e) {
      console.error("Error saving active tab:", e);
    }
    playSound('click');
  };

  // Local notes state
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notesNotification, setNotesNotification] = useState<string | null>(null);

  // Syncing map clicks to country-vault selection
  const [selectedCountryFromMap, setSelectedCountryFromMap] = useState<string | undefined>(undefined);

  // Spotlight focused historical event state
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<HistoricalEvent | null>(null);

  // Deep-linking from encyclopedia navigation
  const [encyclopediaFocusCategory, setEncyclopediaFocusCategory] = useState<string | undefined>(undefined);
  const [encyclopediaFocusItemId, setEncyclopediaFocusItemId] = useState<string | undefined>(undefined);

  // Global search parameters
  const [globalSearch, setGlobalSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [directSearchItem, setDirectSearchItem] = useState<SearchDetailItem | null>(null);
  const [isDirectSearchOpen, setIsDirectSearchOpen] = useState(false);

  // Recent searches state (stores last 3-5 clicked items with metadata)
  const [recentSearches, setRecentSearches] = useState<{
    id: string;
    type: SearchDetailItem['type'];
    title: string;
    subtitle: string;
    timestamp: number;
    data: any;
  }[]>(() => {
    try {
      const saved = localStorage.getItem('chronos_recent_searches_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse recent searches:', e);
    }
    return [];
  });

  const recordRecentSearch = (type: SearchDetailItem['type'], data: any) => {
    const id = String(data.id || data.name || data.title || Date.now());
    const title = data.name || data.title || 'Historical Item';
    const subtitle = data.role || data.category || data.era || data.period || data.continent || data.location || data.origin || data.authorOrRuler || data.architecturalStyle || '';
    
    setRecentSearches(prev => {
      const filtered = prev.filter(r => r.id !== id);
      const updated = [{ id, type, title, subtitle, timestamp: Date.now(), data }, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('chronos_recent_searches_v1', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save recent search:', e);
      }
      return updated;
    });
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('chronos_recent_searches_v1');
  };

  const handleRemoveRecentSearch = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(prev => {
      const updated = prev.filter(r => r.id !== id);
      localStorage.setItem('chronos_recent_searches_v1', JSON.stringify(updated));
      return updated;
    });
  };

  // Directly inspect search item on the spot without navigating away
  const handleOpenDirectSearchResult = (type: SearchDetailItem['type'], data: any) => {
    recordRecentSearch(type, data);
    setDirectSearchItem({ type, data });
    setIsDirectSearchOpen(true);
    setShowSearchResults(false);
    playSound('click');
  };

  // Load notes & bookmarks on hydration
  useEffect(() => {
    try {
      const stored = localStorage.getItem('chronos_vault_notes');
      if (stored) {
        const parsed = JSON.parse(stored);
        const normalized = Array.isArray(parsed)
          ? parsed.map((n: any) => ({
              ...n,
              tags: Array.isArray(n.tags) && n.tags.length > 0
                ? n.tags
                : (n.targetType && n.targetType !== 'General' ? [n.targetType.toLowerCase()] : ['history', 'research'])
            }))
          : [];
        setNotes(normalized);
      } else {
        // Seed default informative notes associated with figure, event, country, and article
        const defaultNotes: UserNote[] = [
          {
            id: 'n_default_figure',
            title: 'Tactics & Grand Strategy: Napoleon Bonaparte',
            targetType: 'Figure',
            targetId: 'napoleon',
            targetTitle: 'Napoleon Bonaparte',
            tags: ['napoleon', 'military-tactics', 'strategy', 'modern-era'],
            content: 'Napoleon revolutionized operations using the corps d\'armée doctrine, allowing independently maneuverable mixed-arms forces to march dispersed and strike concentrated at decisive crossroads.',
            createdAt: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
          },
          {
            id: 'n_default_event',
            title: 'Epoch Milestone: Fall of Constantinople (1453)',
            targetType: 'Event',
            targetId: 'fall-of-constantinople',
            targetTitle: 'Fall of Constantinople (1453)',
            tags: ['constantinople', 'byzantine', 'ottoman', 'turning-point', 'renaissance'],
            content: 'Mehmed II deployed massive super-bombards engineered by Orban to breach the Theodosian Walls. The migration of Greek scholars west accelerated the European Renaissance, while Ottoman control of Mediterranean trade spurred the Age of Discovery.',
            createdAt: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
          },
          {
            id: 'n_default_country',
            title: 'Study Guide: Ptolemaic Dynasties & Egypt',
            targetType: 'Country',
            targetId: 'egypt',
            targetTitle: 'Ancient Egypt',
            tags: ['egypt', 'ptolemaic', 'antiquity', 'cleopatra', 'civilization'],
            content: 'Cleopatra VII was the sole Ptolemaic ruler who mastered native Demotic Egyptian, enabling her to forge direct alliances with native temple priesthoods and mobilize grassroots civil support.',
            createdAt: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
          },
          {
            id: 'n_default_article',
            title: 'Historiographical Analysis: The Great Library of Alexandria',
            targetType: 'Article',
            targetId: 'library_alexandria',
            targetTitle: 'The Library of Alexandria: Beacon of Knowledge',
            tags: ['alexandria', 'scholarship', 'manuscripts', 'historiography', 'antiquity'],
            content: 'Primary sources show the library suffered through several distinct fires and budget purges over centuries rather than a single destruction event: Caesar\'s civil war fire (48 BCE), the Aurelian campaign (270s CE), and the Serapeum closure in 391 CE.',
            createdAt: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
          }
        ];
        localStorage.setItem('chronos_vault_notes', JSON.stringify(defaultNotes));
        setNotes(defaultNotes);
      }

      const storedBk = localStorage.getItem('chronos_vault_bookmarks');
      if (storedBk) {
        setBookmarks(JSON.parse(storedBk));
      } else {
        // Seed default bookmarks
        const defaultBk: Bookmark[] = [
          {
            id: 'bookmark_country_egypt',
            type: 'country',
            targetId: 'egypt',
            title: 'Egypt',
            subtitle: 'Kemet, land of Pharaohs',
            bookmarkedAt: new Date().toLocaleDateString()
          },
          {
            id: 'bookmark_ruler_cleopatra_ar',
            type: 'ruler',
            targetId: 'cleopatra_ar',
            title: 'Cleopatra VII',
            subtitle: 'Queen of the Ptolemaic Kingdom',
            bookmarkedAt: new Date().toLocaleDateString()
          }
        ];
        localStorage.setItem('chronos_vault_bookmarks', JSON.stringify(defaultBk));
        setBookmarks(defaultBk);
      }
    } catch (e) {
      console.error("Failed to load local storage notes or bookmarks:", e);
    }
  }, []);

  // Save / Sync Notes to localStorage helper
  const handleAddNote = (
    title: string,
    content: string,
    type: UserNote['targetType'],
    targetId?: string,
    tags?: string[],
    targetTitle?: string
  ) => {
    const derivedTags = tags && tags.length > 0
      ? tags.map(t => t.trim().toLowerCase().replace(/^#/, ''))
      : (type !== 'General' ? [type.toLowerCase()] : ['history']);

    const freshNote: UserNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      title,
      targetType: type,
      targetId,
      targetTitle,
      tags: derivedTags,
      content,
      createdAt: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    };

    const updated = [freshNote, ...notes];
    setNotes(updated);
    localStorage.setItem('chronos_vault_notes', JSON.stringify(updated));

    // Display temporary success toast
    setNotesNotification(`📝 Note "${title}" saved to your notebook!`);
    setTimeout(() => setNotesNotification(null), 3500);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem('chronos_vault_notes', JSON.stringify(updated));
  };

  const handleUpdateNote = (
    id: string,
    title: string,
    content: string,
    type: UserNote['targetType'],
    tags?: string[],
    targetId?: string,
    targetTitle?: string
  ) => {
    const updated = notes.map((n) => {
      if (n.id === id) {
        return {
          ...n,
          title,
          content,
          targetType: type,
          tags: tags !== undefined ? tags.map(t => t.trim().toLowerCase().replace(/^#/, '')) : n.tags,
          targetId: targetId !== undefined ? targetId : n.targetId,
          targetTitle: targetTitle !== undefined ? targetTitle : n.targetTitle,
          updatedAt: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
        };
      }
      return n;
    });
    setNotes(updated);
    localStorage.setItem('chronos_vault_notes', JSON.stringify(updated));
    setNotesNotification(`📝 Note "${title}" updated successfully!`);
    setTimeout(() => setNotesNotification(null), 3500);
  };

  // Bookmark Toggle logic
  const handleToggleBookmark = (id: string, type: Bookmark['type'], title: string, subtitle?: string) => {
    const isAlreadyBookmarked = bookmarks.some((b) => b.targetId === id && b.type === type);
    let updated: Bookmark[];

    if (isAlreadyBookmarked) {
      updated = bookmarks.filter((b) => !(b.targetId === id && b.type === type));
      setNotesNotification(`🗑 Bookmark removed: "${title}"`);
    } else {
      const newBk: Bookmark = {
        id: `bookmark_${type}_${id}`,
        type,
        targetId: id,
        title,
        subtitle: subtitle || type.charAt(0).toUpperCase() + type.slice(1),
        bookmarkedAt: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
      };
      updated = [newBk, ...bookmarks];
      setNotesNotification(`🔖 Bookmarked: "${title}" added to your Saved Items!`);
    }

    setBookmarks(updated);
    localStorage.setItem('chronos_vault_bookmarks', JSON.stringify(updated));
    setTimeout(() => setNotesNotification(null), 3500);
  };

  // Jump to content from Bookmark Click
  const handleNavigateToBookmark = (type: Bookmark['type'], targetId: string) => {
    if (type === 'country') {
      setSelectedCountryFromMap(targetId);
      changeTab('vaults');
    } else if (type === 'ruler') {
      setVaultFocusFigureId(targetId);
      setVaultInitialTab('monarchs');
      changeTab('vaults');
    } else if (type === 'figure') {
      setVaultFocusFigureId(targetId);
      setVaultInitialTab('figures');
      changeTab('vaults');
    } else if (type === 'event') {
      const e = HISTORICAL_EVENTS.find((evt) => evt.id === targetId);
      if (e) {
        setSelectedTimelineEvent(e);
        changeTab('map');
      } else {
        changeTab('timeline');
      }
    } else if (type === 'article') {
      // Find where we can focus or search for article: vaults contains chroniclers & articles tab
      changeTab('vaults');
    } else if (type === 'philosopher') {
      setSelectedPhilosopherId(targetId);
      changeTab('philosophers');
    } else if (type === 'fact') {
      setFocusFactId(targetId);
      changeTab('facts');
    } else if (type === 'battle') {
      setFocusBattleId(targetId);
      changeTab('battles');
    } else if (type === 'paper') {
      setFocusPaperId(targetId);
      changeTab('papers');
    } else if (type === 'artifact') {
      setFocusArtifactId(targetId);
      changeTab('artifacts');
    } else if (type === 'source' || PRIMARY_SOURCES.some(s => s.id === targetId)) {
      changeTab('decrees');
    } else {
      // Check if it matches an ideology
      const isIdeology = ALL_POLITICAL_IDEOLOGIES.some(i => i.id === targetId);
      if (isIdeology) {
        setFocusIdeologyId(targetId);
        changeTab('ideologies');
      }
    }
  };

  const handleImportBackup = (
    importedNotes: UserNote[],
    importedBookmarks: Bookmark[],
    mode: 'merge' | 'replace'
  ) => {
    if (mode === 'replace') {
      setNotes(importedNotes);
      setBookmarks(importedBookmarks);
      try {
        localStorage.setItem('chronos_vault_notes', JSON.stringify(importedNotes));
        localStorage.setItem('chronos_vault_bookmarks', JSON.stringify(importedBookmarks));
      } catch (err) {
        console.error('Failed to write backup to localStorage:', err);
      }
      setNotesNotification(`📥 Restored backup: ${importedNotes.length} notes & ${importedBookmarks.length} bookmarks!`);
    } else {
      const result = mergeVaultBackupData(notes, bookmarks, importedNotes, importedBookmarks);
      setNotes(result.mergedNotes);
      setBookmarks(result.mergedBookmarks);
      try {
        localStorage.setItem('chronos_vault_notes', JSON.stringify(result.mergedNotes));
        localStorage.setItem('chronos_vault_bookmarks', JSON.stringify(result.mergedBookmarks));
      } catch (err) {
        console.error('Failed to write merged backup to localStorage:', err);
      }
      setNotesNotification(`📥 Merged backup: +${result.newNotesAdded} notes, +${result.newBookmarksAdded} bookmarks!`);
    }
    setTimeout(() => setNotesNotification(null), 4000);
  };

  const handleNavigateFromSpotlightToVault = (figureId: string, vaultTab: 'figures' | 'monarchs' | 'leaders') => {
    setVaultFocusFigureId(figureId);
    setVaultInitialTab(vaultTab);
    changeTab('vaults');
  };

  const handleOpenSpotlight = (figureId?: string) => {
    if (figureId) {
      setEncyclopediaFocusCategory('leaders');
      setEncyclopediaFocusItemId(figureId);
    }
    changeTab('encyclopedia');
  };

  const handleNavigateFromFact = (tab: any, subTab?: string, entityId?: string) => {
    changeTab(tab);
    if (tab === 'encyclopedia' && subTab) {
      setEncyclopediaFocusCategory(subTab);
      setEncyclopediaFocusItemId(entityId);
    } else if (tab === 'vaults' && entityId) {
      setSelectedCountryFromMap(entityId);
    } else if (tab === 'philosophers' && entityId) {
      setSelectedPhilosopherId(entityId);
    }
  };

  // Map country selection callback
  const handleMapCountrySelect = (countryId: string) => {
    setSelectedCountryFromMap(countryId);
    // Stay on map tab to show beautiful integrated details panel!
  };

  // Global search calculations across monarchs, figures, events, countries, battles, papers, ideologies, artifacts, decrees, spotlight figures, philosophers, and monuments
  const searchResults = {
    spotlightFigures: SPOTLIGHT_FIGURES.filter((s) => s.name.toLowerCase().includes(globalSearch.toLowerCase()) || s.title.toLowerCase().includes(globalSearch.toLowerCase()) || s.legacySummary.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3),
    monarchs: MONARCHS.filter((m) => m.name.toLowerCase().includes(globalSearch.toLowerCase()) || m.title.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3),
    figures: HISTORICAL_FIGURES.filter((f) => f.name.toLowerCase().includes(globalSearch.toLowerCase()) || f.role.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3),
    events: HISTORICAL_EVENTS.filter((e) => e.title.toLowerCase().includes(globalSearch.toLowerCase()) || e.description.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3),
    countries: COUNTRIES.filter((c) => c.name.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3),
    battles: ALL_HISTORICAL_BATTLES.filter((b) => b.name.toLowerCase().includes(globalSearch.toLowerCase()) || b.war.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3),
    papers: ALL_RESEARCH_PAPERS.filter((p) => p.title.toLowerCase().includes(globalSearch.toLowerCase()) || p.authors.some(a => a.toLowerCase().includes(globalSearch.toLowerCase()))).slice(0, 3),
    ideologies: ALL_POLITICAL_IDEOLOGIES.filter((i) => i.name.toLowerCase().includes(globalSearch.toLowerCase()) || i.keyThinkers.some(t => t.toLowerCase().includes(globalSearch.toLowerCase()))).slice(0, 3),
    artifacts: ALL_DAILY_ARTIFACTS.filter((a) => a.name.toLowerCase().includes(globalSearch.toLowerCase()) || a.category.toLowerCase().includes(globalSearch.toLowerCase()) || a.origin.toLowerCase().includes(globalSearch.toLowerCase()) || a.material.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3),
    decrees: PRIMARY_SOURCES.filter((d) => d.title.toLowerCase().includes(globalSearch.toLowerCase()) || d.authorOrRuler.toLowerCase().includes(globalSearch.toLowerCase()) || d.civilization.toLowerCase().includes(globalSearch.toLowerCase()) || d.famousQuote.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3),
    philosophers: PHILOSOPHERS.filter((p) => p.name.toLowerCase().includes(globalSearch.toLowerCase()) || p.school.toLowerCase().includes(globalSearch.toLowerCase()) || p.ideas.some(i => i.toLowerCase().includes(globalSearch.toLowerCase()))).slice(0, 3),
    monuments: ALL_WORLD_MONUMENTS.filter((m) => m.name.toLowerCase().includes(globalSearch.toLowerCase()) || m.location.toLowerCase().includes(globalSearch.toLowerCase()) || m.architecturalStyle.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3)
  };

  const hasAnyResults = globalSearch.trim().length > 1 && (
    searchResults.spotlightFigures.length > 0 ||
    searchResults.monarchs.length > 0 ||
    searchResults.figures.length > 0 ||
    searchResults.events.length > 0 ||
    searchResults.countries.length > 0 ||
    searchResults.battles.length > 0 ||
    searchResults.papers.length > 0 ||
    searchResults.ideologies.length > 0 ||
    searchResults.artifacts.length > 0 ||
    searchResults.decrees.length > 0 ||
    searchResults.philosophers.length > 0 ||
    searchResults.monuments.length > 0
  );

  // Navigate to corresponding tab if user explicitly chooses "Explore in Vault" inside the search modal
  const handleNavigateFromSearchModal = (tab: string, targetId?: string) => {
    if (tab === 'vaults') {
      if (directSearchItem?.type === 'monarch') {
        setVaultFocusFigureId(targetId);
        setVaultInitialTab('monarchs');
      } else if (directSearchItem?.type === 'figure') {
        setVaultFocusFigureId(targetId);
        setVaultInitialTab('figures');
      }
      changeTab('vaults');
    } else if (tab === 'timeline') {
      const e = HISTORICAL_EVENTS.find((evt) => evt.id === targetId);
      if (e) {
        setSelectedTimelineEvent(e);
      }
      changeTab('timeline');
    } else if (tab === 'map') {
      if (targetId) {
        setSelectedCountryFromMap(targetId);
      }
      changeTab('map');
    } else if (tab === 'battles') {
      if (targetId) setFocusBattleId(targetId);
      changeTab('battles');
    } else if (tab === 'papers') {
      if (targetId) setFocusPaperId(targetId);
      changeTab('papers');
    } else if (tab === 'ideologies') {
      if (targetId) setFocusIdeologyId(targetId);
      changeTab('ideologies');
    } else if (tab === 'artifacts') {
      if (targetId) setFocusArtifactId(targetId);
      changeTab('artifacts');
    } else if (tab === 'decrees') {
      changeTab('decrees');
    } else if (tab === 'encyclopedia') {
      setEncyclopediaFocusCategory('leaders');
      if (targetId) setEncyclopediaFocusItemId(targetId);
      changeTab('encyclopedia');
    } else if (tab === 'philosophers') {
      if (targetId) setSelectedPhilosopherId(targetId);
      changeTab('philosophers');
    } else if (tab === 'monuments') {
      changeTab('monuments');
    }
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#E0D8D0] font-sans selection:bg-[#D4AF37]/35 selection:text-white">
      {/* Upper Navigation Rail / Header Banner */}
      <header className="border-b border-[#2A2A2A] bg-[#0A0A0A]/90 backdrop-blur sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Brand Card */}
          <div className="flex items-center gap-3.5">
            <Animated3DHistoryLogo />
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-serif italic font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5B8] via-[#D4AF37] to-[#AA7C11] flex items-center gap-1.5 leading-tight drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                History World
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-[9px] font-mono tracking-wider font-extrabold text-[#A09890] uppercase">
                  Created & Designed by <span className="text-[#E5C158] font-bold">Ayush patel</span>
                </p>
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="px-2 py-0.5 bg-[#1C1811] hover:bg-[#D4AF37] border border-[#D4AF37]/45 text-[#D4AF37] hover:text-black text-[8px] font-mono font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer flex items-center gap-1 shadow-md"
                  title="View Curator Profile"
                >
                  <User className="w-2.5 h-2.5" /> Profile
                </button>
              </div>
            </div>
          </div>

          {/* Global search entry with absolute list overlay & Sound Settings Toggle */}
          <div className="flex items-center gap-2 w-full md:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-[#A09890]" />
              <input
                type="text"
                value={globalSearch}
                onFocus={() => setShowSearchResults(true)}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setShowSearchResults(true);
                }}
                placeholder="Search monarchs, leaders, timelines, countries..."
                className="w-full pl-9.5 pr-8 py-2 bg-[#121212] text-white text-xs sm:text-sm border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all font-sans"
              />
              {globalSearch && (
                <button
                  onClick={() => setGlobalSearch('')}
                  className="absolute right-2.5 top-2.5 text-[#777] hover:text-white p-0.5 rounded cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Direct Search Overlay popup */}
              {showSearchResults && (
                <div className="absolute top-11 left-0 right-0 max-h-[420px] overflow-y-auto bg-[#0F0F0F] border border-[#2A2A2A] shadow-2xl rounded-2xl p-4 z-50 text-left space-y-3.5 animate-fade-in scrollbar-thin">
                  <div className="flex items-center justify-between pb-2 border-b border-[#2A2A2A]">
                    <div className="flex items-center gap-1.5">
                      <Search className="w-3 h-3 text-[#D4AF37]" />
                      <h5 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider font-mono">
                        Global Archive Search
                      </h5>
                    </div>
                    <button
                      onClick={() => { setShowSearchResults(false); }}
                      className="text-[10px] text-[#A09890] hover:text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Close</span>
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* 1. RECENT SEARCHES SECTION (LAST 3-5 CLICKED ITEMS) */}
                  {recentSearches.length > 0 && (
                    <div className="bg-[#14120C] border border-[#D4AF37]/35 rounded-xl p-3 space-y-2">
                      <div className="flex items-center justify-between pb-1 border-b border-[#D4AF37]/20">
                        <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#D4AF37]" />
                          <span>Recent Searches ({recentSearches.length})</span>
                        </h6>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleClearRecentSearches(); }}
                          className="text-[9px] font-mono text-[#A09890] hover:text-[#D4AF37] cursor-pointer hover:underline transition-colors"
                        >
                          Clear History
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {recentSearches.map((rec) => (
                          <div
                            key={rec.id}
                            onClick={() => handleOpenDirectSearchResult(rec.type, rec.data)}
                            className="group px-2.5 py-1.5 rounded-lg bg-[#0A0A0A] hover:bg-[#1E1A12] border border-[#262626] hover:border-[#D4AF37]/60 flex items-center justify-between cursor-pointer transition-all text-left"
                            title={`Click to open ${rec.title} in Direct View`}
                          >
                            <div className="flex items-center gap-2 truncate pr-2">
                              <span className="text-[8px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                                {rec.type}
                              </span>
                              <span className="text-xs font-serif font-bold text-white group-hover:text-[#D4AF37] truncate">
                                {rec.title}
                              </span>
                              {rec.subtitle && (
                                <span className="text-[10px] text-[#888] font-sans truncate hidden sm:inline">
                                  ({rec.subtitle})
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[9px] font-mono text-[#D4AF37]/90 group-hover:underline">
                                Direct View ›
                              </span>
                              <button
                                type="button"
                                onClick={(e) => handleRemoveRecentSearch(rec.id, e)}
                                className="p-1 text-[#666] hover:text-[#FF6B6B] hover:bg-[#222] rounded transition-colors"
                                title="Remove from history"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hasAnyResults ? (
                    <div className="space-y-4">
                      {/* Spotlight Figures Block */}
                      {searchResults.spotlightFigures.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            ✨ Historical Figure Spotlight
                          </h6>
                          <div className="space-y-1">
                            {searchResults.spotlightFigures.map((s) => (
                              <button
                                key={s.id}
                                onClick={() => handleOpenDirectSearchResult('spotlight', s)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="font-medium">{s.name} <span className="text-[#888] font-normal">({s.category})</span></span>
                                <span className="text-[#D4AF37]/90 font-mono text-[10px] group-hover:underline flex items-center gap-1">
                                  {s.period} <span>• Open</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Monarchs Block */}
                      {searchResults.monarchs.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            👑 Monarchs
                          </h6>
                          <div className="space-y-1">
                            {searchResults.monarchs.map((m) => (
                              <button
                                key={m.id}
                                onClick={() => handleOpenDirectSearchResult('monarch', m)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="font-medium">{m.name} <span className="text-[#888] font-normal">({m.region})</span></span>
                                <span className="text-[#D4AF37]/90 font-mono text-[10px] group-hover:underline flex items-center gap-1">
                                  {m.reign} <span>• Open</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Figures Block */}
                      {searchResults.figures.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            📚 Figures & Scholars
                          </h6>
                          <div className="space-y-1">
                            {searchResults.figures.map((f) => (
                              <button
                                key={f.id}
                                onClick={() => handleOpenDirectSearchResult('figure', f)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="font-medium">{f.name}</span>
                                <span className="text-[#D4AF37]/90 font-mono text-[10px] group-hover:underline flex items-center gap-1">
                                  {f.category} <span>• Open</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Events Block */}
                      {searchResults.events.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            ⏳ Historical Epoch Events
                          </h6>
                          <div className="space-y-1">
                            {searchResults.events.map((e) => (
                              <button
                                key={e.id}
                                onClick={() => handleOpenDirectSearchResult('event', e)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="font-medium truncate max-w-[260px]">{e.title}</span>
                                <span className="text-[#D4AF37]/90 text-[10px] font-mono group-hover:underline flex items-center gap-1">
                                  {e.date} <span>• Open</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Countries Block */}
                      {searchResults.countries.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            🗺 Countries & Civilizations
                          </h6>
                          <div className="space-y-1">
                            {searchResults.countries.map((c) => (
                              <button
                                key={c.id}
                                onClick={() => handleOpenDirectSearchResult('country', c)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="font-medium flex items-center gap-1.5">
                                  <span>{c.flag}</span> <span>{c.name}</span>
                                </span>
                                <span className="text-[10px] text-[#D4AF37]/90 font-mono group-hover:underline">
                                  Open Dossier
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Battles Block */}
                      {searchResults.battles.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            ⚔️ Famous Battles
                          </h6>
                          <div className="space-y-1">
                            {searchResults.battles.map((b) => (
                              <button
                                key={b.id}
                                onClick={() => handleOpenDirectSearchResult('battle', b)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="font-medium truncate max-w-[240px]">{b.name} <span className="text-[#888] font-normal">({b.dateStr})</span></span>
                                <span className="text-[#D4AF37]/90 font-mono text-[10px] group-hover:underline flex items-center gap-1">
                                  {b.era} <span>• Open</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Research Papers Block */}
                      {searchResults.papers.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            📜 Research Papers
                          </h6>
                          <div className="space-y-1">
                            {searchResults.papers.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => handleOpenDirectSearchResult('paper', p)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="truncate max-w-[240px] font-medium">{p.title}</span>
                                <span className="text-[#D4AF37]/90 font-mono text-[10px] group-hover:underline flex items-center gap-1">
                                  {p.year} <span>• Open</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Ideologies Block */}
                      {searchResults.ideologies.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            ⚖️ Political Ideologies
                          </h6>
                          <div className="space-y-1">
                            {searchResults.ideologies.map((i) => (
                              <button
                                key={i.id}
                                onClick={() => handleOpenDirectSearchResult('ideology', i)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="truncate max-w-[240px] font-medium">{i.name} <span className="text-[#888] font-normal">({i.category})</span></span>
                                <span className="text-[#D4AF37]/90 font-mono text-[10px] group-hover:underline flex items-center gap-1">
                                  {i.spectrumPlacement} <span>• Open</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Artifacts Block */}
                      {searchResults.artifacts.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            🏺 Daily Historical Artifacts
                          </h6>
                          <div className="space-y-1">
                            {searchResults.artifacts.map((a) => (
                              <button
                                key={a.id}
                                onClick={() => handleOpenDirectSearchResult('artifact', a)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="font-medium truncate max-w-[240px]">{a.name} <span className="text-[#888] font-normal">({a.category})</span></span>
                                <span className="text-[#D4AF37]/90 font-mono text-[10px] group-hover:underline flex items-center gap-1">
                                  Open 360°
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Decrees & Primary Sources Block */}
                      {searchResults.decrees.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            📜 Historical Decrees & Primary Sources
                          </h6>
                          <div className="space-y-1">
                            {searchResults.decrees.map((d) => (
                              <button
                                key={d.id}
                                onClick={() => handleOpenDirectSearchResult('decree', d)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="font-medium truncate max-w-[240px]">{d.title} <span className="text-[#888] font-normal">({d.authorOrRuler})</span></span>
                                <span className="text-[#D4AF37]/90 font-mono text-[10px] group-hover:underline flex items-center gap-1">
                                  {d.year} <span>• Open</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Philosophers Block */}
                      {searchResults.philosophers.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            🏛️ Classical Philosophers & Thinkers
                          </h6>
                          <div className="space-y-1">
                            {searchResults.philosophers.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => handleOpenDirectSearchResult('philosopher', p)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="font-medium truncate max-w-[240px]">{p.name} <span className="text-[#888] font-normal">({p.school})</span></span>
                                <span className="text-[#D4AF37]/90 font-mono text-[10px] group-hover:underline flex items-center gap-1">
                                  {p.era} <span>• Open</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Monuments & Wonders Block */}
                      {searchResults.monuments.length > 0 && (
                        <div>
                          <h6 className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            🏛️ World Wonders & Antiquities
                          </h6>
                          <div className="space-y-1">
                            {searchResults.monuments.map((m) => (
                              <button
                                key={m.id}
                                onClick={() => handleOpenDirectSearchResult('monument', m)}
                                className="w-full text-left py-1.5 px-2 rounded-lg bg-[#141414]/50 hover:bg-[#202020] text-xs text-[#C5BCB2] hover:text-white flex items-center justify-between cursor-pointer transition-colors group border border-transparent hover:border-[#333]"
                              >
                                <span className="font-medium truncate max-w-[240px]">{m.name} <span className="text-[#888] font-normal">({m.location})</span></span>
                                <span className="text-[#D4AF37]/90 font-mono text-[10px] group-hover:underline flex items-center gap-1">
                                  {m.architecturalStyle || 'Wonder'} <span>• Open</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : globalSearch.trim().length > 1 ? (
                    <p className="text-xs text-[#A09890] text-center py-2">No matching historical records found for "{globalSearch}".</p>
                  ) : recentSearches.length === 0 ? (
                    <p className="text-xs text-[#A09890] text-center py-2">Type above to search across 3,000+ historical figures, events, battles, papers, monuments, and ideologies...</p>
                  ) : null}
                </div>
              )}
            </div>

            {/* Global Sound Settings Toggle Switch */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all cursor-pointer shadow-md flex items-center justify-center shrink-0 w-10 h-10 ${
                soundEnabled 
                  ? 'bg-[#1C1811] text-[#D4AF37] border-[#D4AF37]/35 hover:bg-[#D4AF37]/15' 
                  : 'bg-[#121212] text-[#A09890] border-[#2A2A2A] hover:bg-[#1A1A1A]'
              }`}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4.5 h-4.5 animate-pulse text-[#D4AF37]" />
              ) : (
                <VolumeX className="w-4.5 h-4.5 text-[#A09890]" />
              )}
            </button>
          </div>

          {/* Quick Stat Indicators (Desktop only) */}
          <div className="hidden lg:flex items-center gap-5 border-l border-[#2A2A2A] pl-5 text-[11px] font-mono text-[#A09890] text-left">
            <div>
              <span className="text-[#D4AF37] font-bold block">Leaders</span>
              <span>Monarchic Regimes</span>
            </div>
            <div>
              <span className="text-[#D4AF37] font-bold block">Epochs</span>
              <span>Fully Mapped events</span>
            </div>
            <div>
              <span className="text-[#D4AF37] font-bold block">Civilizations</span>
              <span>Interactive Areas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Note Addition Alert / Sync Toast Notification */}
      {notesNotification && (
        <div className="fixed bottom-6 right-6 bg-[#0F0F0F] text-[#E0D8D0] text-xs py-3.5 px-5 rounded-xl shadow-2xl z-50 border border-[#D4AF37]/50 animate-slide-up flex items-center gap-2 max-w-sm backdrop-blur-md">
          <BookMarked className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span className="text-left font-sans">{notesNotification}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Custom Bento Dashboard Title */}
        <div className="bg-gradient-to-br from-[#0F0F0F] via-[#151515] to-[#0A0A0A] border border-[#2A2A2A] text-[#E0D8D0] p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-[#D4AF37]/5 to-transparent pointer-events-none"></div>
          
          <div className="space-y-2 relative z-10 text-left">
            <div className="flex items-center gap-1.5">
              <span className="bg-[#D4AF37] w-2 h-2 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#A09890] uppercase">Chronicle Library</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-[#D4AF37]">Ancient & Modern World History Archive</h2>
            <p className="text-xs sm:text-sm text-[#A09890] max-w-2xl leading-relaxed font-sans">
              Navigate kingdoms, dynasties, and scientific leaps. Hover on the map grids to reveal expansion details, play interactive academic quizzes, or ask our resident AI Scholar to compose bespoke journals.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 relative z-10 sm:self-center">
            <button
              onClick={() => changeTab('on-this-day')}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer border ${
                activeTab === 'on-this-day' 
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] scale-102' 
                  : 'bg-[#1C1811] text-[#D4AF37] border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" /> On This Day
            </button>
            <button
              onClick={() => changeTab('facts')}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer border ${
                activeTab === 'facts' 
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] scale-102' 
                  : 'bg-[#1C1811] text-[#D4AF37] border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]'
              }`}
            >
              <Lightbulb className="w-4 h-4 animate-pulse text-[#D4AF37]" /> Did You Know?
            </button>
            <button
              onClick={() => changeTab('map')}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer border ${
                activeTab === 'map' 
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] scale-102' 
                  : 'bg-[#151515] text-[#D4AF37] border-[#2A2A2A] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]'
              }`}
            >
              <Map className="w-4 h-4" /> Civilizations Map
            </button>
            <button
              onClick={() => changeTab('scholar')}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer border ${
                activeTab === 'scholar' 
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] scale-102' 
                  : 'bg-[#151515] text-[#D4AF37] border-[#2A2A2A] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]'
              }`}
            >
              <Sparkles className="w-4 h-4 animate-pulse" /> Scholar AI
            </button>
            <button
              onClick={() => changeTab('decrees')}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer border ${
                activeTab === 'decrees' 
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] scale-102' 
                  : 'bg-[#1C1811] text-[#D4AF37] border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]'
              }`}
            >
              <Scroll className="w-4 h-4 text-[#D4AF37]" /> Decrees & Speeches
            </button>
          </div>
        </div>

        {/* Secondary Navigation System Tabs */}
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] p-1.5 rounded-2xl flex flex-wrap gap-1 shadow-lg">
          {/* 1. On This Day */}
          <button
            id="nav-on-this-day-btn"
            onClick={() => changeTab('on-this-day')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'on-this-day' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md scale-102' 
                : 'text-[#D4AF37] border-[#D4AF37]/50 bg-[#1C1811] hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#D4AF37]" /> 📅 On This Day
          </button>

          {/* 2. Did You Know? */}
          <button
            id="nav-did-you-know-btn"
            onClick={() => changeTab('facts')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'facts' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md scale-102' 
                : 'text-[#D4AF37] border-[#D4AF37]/50 bg-[#1C1811] hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37]'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-[#D4AF37]" /> 💡 Did You Know?
          </button>

          {/* 3. Daily Artifact */}
          <button
            id="nav-daily-artifact-btn"
            onClick={() => changeTab('artifacts')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'artifacts' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md scale-102' 
                : 'text-[#D4AF37] border-[#D4AF37]/50 bg-[#1C1811] hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37]'
            }`}
          >
            <RotateCw className="w-4 h-4 text-[#D4AF37]" /> 🏺 Daily Artifact
          </button>
          <button
            onClick={() => changeTab('monuments')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'monuments' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md scale-102' 
                : 'text-[#D4AF37] border-[#D4AF37]/50 bg-[#1C1811] hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37]'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#D4AF37]" /> 🏛️ Wonders & Artifacts
          </button>
          <button
            onClick={() => changeTab('ideologies')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'ideologies' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md scale-102' 
                : 'text-[#D4AF37] border-[#D4AF37]/40 bg-[#1C1811]/90 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" /> ⚖️ Political Ideologies
          </button>
          <button
            onClick={() => changeTab('battles')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'battles' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md scale-102' 
                : 'text-[#D4AF37] border-[#D4AF37]/40 bg-[#1C1811]/90 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37]'
            }`}
          >
            <Swords className="w-4 h-4 text-[#D4AF37]" /> ⚔️ Famous Battles
          </button>
          <button
            onClick={() => changeTab('papers')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'papers' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md scale-102' 
                : 'text-[#D4AF37] border-[#D4AF37]/40 bg-[#1C1811]/90 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#D4AF37]" /> 📜 Research Papers
          </button>
          <button
            onClick={() => changeTab('map')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'map' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md' 
                : 'text-[#A09890] border-transparent hover:text-[#D4AF37] hover:bg-[#151515]/80 hover:border-[#2A2A2A]'
            }`}
          >
            <Globe className="w-4 h-4" /> Mapped Empires
          </button>
          <button
            onClick={() => changeTab('encyclopedia')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'encyclopedia' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md' 
                : 'text-[#A09890] border-transparent hover:text-[#D4AF37] hover:bg-[#151515]/80 hover:border-[#2A2A2A]'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Wikipedia Encyclopedia
          </button>
          <button
            onClick={() => changeTab('philosophers')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'philosophers' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md' 
                : 'text-[#A09890] border-transparent hover:text-[#D4AF37] hover:bg-[#151515]/80 hover:border-[#2A2A2A]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#D4AF37]" /> Philosopher Grove ({PHILOSOPHERS.length})
          </button>
          <button
            onClick={() => changeTab('timeline')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'timeline' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md' 
                : 'text-[#A09890] border-transparent hover:text-[#D4AF37] hover:bg-[#151515]/80 hover:border-[#2A2A2A]'
            }`}
          >
            <History className="w-4 h-4" /> Timeline View
          </button>
          <button
            onClick={() => changeTab('vaults')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'vaults' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md' 
                : 'text-[#A09890] border-transparent hover:text-[#D4AF37] hover:bg-[#151515]/80 hover:border-[#2A2A2A]'
            }`}
          >
            <Shield className="w-4 h-4" /> History Vaults
          </button>
          <button
            onClick={() => changeTab('quizzes')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'quizzes' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md' 
                : 'text-[#A09890] border-transparent hover:text-[#D4AF37] hover:bg-[#151515]/80 hover:border-[#2A2A2A]'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Coliseum Quizzes
          </button>
          <button
            onClick={() => changeTab('scholar')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'scholar' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md' 
                : 'text-[#A09890] border-transparent hover:text-[#D4AF37] hover:bg-[#151515]/80 hover:border-[#2A2A2A]'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Scholar AI Chat
          </button>
          <button
            onClick={() => changeTab('compare')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'compare' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md' 
                : 'text-[#A09890] border-transparent hover:text-[#D4AF37] hover:bg-[#151515]/80 hover:border-[#2A2A2A]'
            }`}
          >
            <Scale className="w-4 h-4" /> Compare & Contrast
          </button>
          <button
            onClick={() => changeTab('notes')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'notes' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md' 
                : 'text-[#A09890] border-transparent hover:text-[#D4AF37] hover:bg-[#151515]/80 hover:border-[#2A2A2A]'
            }`}
          >
            <BookMarked className="w-4 h-4" /> Notebook & Bookmarks ({notes.length + bookmarks.length})
          </button>
          <button
            id="nav-decrees-btn"
            onClick={() => changeTab('decrees')}
            className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              activeTab === 'decrees' 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md' 
                : 'text-[#D4AF37] border-[#D4AF37]/40 bg-[#1C1811]/60 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37]'
            }`}
          >
            <Scroll className="w-4 h-4" /> 📜 Decrees & Speeches
          </button>
        </div>

        {/* Tab Modules Routing Views */}
        <VaultDoorReveal key={activeTab} sectionName={activeTab}>
          {/* 1. Interactive World Map / Main Dashboard */}
          {activeTab === 'map' && (
            <div className="space-y-6">
              {/* 1. Prominent On This Day Dashboard Widget */}
              <OnThisDayWidget
                onOpenFullView={() => changeTab('on-this-day')}
                onAddNote={handleAddNote}
                onToggleBookmark={handleToggleBookmark}
                bookmarks={bookmarks}
              />

              {/* 2. Prominent Did You Know? Historical Facts Widget */}
              <DidYouKnowWidget
                onOpenFullView={(factId) => {
                  if (factId) setFocusFactId(factId);
                  changeTab('facts');
                }}
                onAddNote={handleAddNote}
                onToggleBookmark={handleToggleBookmark}
                bookmarks={bookmarks}
              />

              {/* 3. Prominent Daily Historical Artifact Feature Widget */}
              <DailyArtifactWidget
                onOpenFullView={(artId) => {
                  if (artId) setFocusArtifactId(artId);
                  changeTab('artifacts');
                }}
                onAddNote={handleAddNote}
                onToggleBookmark={handleToggleBookmark}
                bookmarks={bookmarks}
              />

              <WorldMap
                onSelectCountry={handleMapCountrySelect}
                activeCountryId={selectedCountryFromMap}
                selectedTimelineEvent={selectedTimelineEvent}
                onClearSelectedTimelineEvent={() => setSelectedTimelineEvent(null)}
                onNavigateTo={handleNavigateToBookmark}
              />

              {/* Quick Helper info banner */}
              <div className="p-4 bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl text-left flex items-start gap-3 shadow-lg">
                <div className="bg-[#151515] border border-[#2A2A2A] p-2.5 rounded-lg text-[#D4AF37] shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-serif italic font-bold text-[#D4AF37] text-sm">Empirical World Mappings</h5>
                  <p className="text-xs text-[#A09890] leading-relaxed max-w-4xl font-sans">
                    The true world map represents the geographical center of gravity for prominent civilizations. Toggling eras projects specific hotspots. Selecting a hotspot initiates a targeted query into the Country and Monarch Vaults automatically, allowing flawless detailed context.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Daily Historical Artifact 360 Studio Section */}
          {activeTab === 'artifacts' && (
            <DailyArtifactSection
              initialArtifactId={focusArtifactId}
              onAddNote={handleAddNote}
              onToggleBookmark={handleToggleBookmark}
              bookmarks={bookmarks}
              onNavigateToScholar={(prompt) => {
                changeTab('scholar');
              }}
            />
          )}

          {/* 2. On This Day Historical Calendar Chronometer */}
          {activeTab === 'on-this-day' && (
            <OnThisDaySection
              onAddNote={handleAddNote}
              onToggleBookmark={handleToggleBookmark}
              bookmarks={bookmarks}
              onNavigateTo={(tab, targetId) => {
                if (tab === 'timeline') {
                  changeTab('timeline');
                } else if (tab === 'map') {
                  changeTab('map');
                } else if (tab === 'vaults') {
                  changeTab('vaults');
                } else if (tab === 'encyclopedia') {
                  changeTab('encyclopedia');
                }
              }}
            />
          )}

          {/* 3. Chronological Milestones Timeline */}
          {activeTab === 'timeline' && (
            <TimelineSection 
              onAddNote={handleAddNote} 
              onDeleteNote={handleDeleteNote}
              notes={notes}
              selectedEventId={selectedTimelineEvent?.id}
              onSelectEventOnMap={(event) => {
                setSelectedTimelineEvent(event);
                setActiveTab('map');
              }}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {/* 4. Global Civilizational & Monarchic Vaults */}
          {activeTab === 'vaults' && (
            <VaultSection
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              notes={notes}
              activeCountryId={selectedCountryFromMap}
              onCountryProcessed={() => setSelectedCountryFromMap(undefined)}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              focusFigureId={vaultFocusFigureId}
              initialVaultTab={vaultInitialTab}
              onFigureProcessed={() => {
                setVaultFocusFigureId(undefined);
                setVaultInitialTab(undefined);
              }}
              onOpenSpotlight={handleOpenSpotlight}
            />
          )}

          {/* 5. Trivia Quiz Games */}
          {activeTab === 'quizzes' && (
            <QuizSection 
              notes={notes}
              bookmarks={bookmarks}
              onNavigateToTab={changeTab}
            />
          )}

          {/* 6. Scholar Chat portal */}
          {activeTab === 'scholar' && (
            <AIPortal onAddNote={handleAddNote} />
          )}

          {/* 8. Study Notebook */}
          {activeTab === 'notes' && (
            <NotesSection
              notes={notes}
              onAddNote={handleAddNote}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              onNavigateToBookmark={handleNavigateToBookmark}
              onImportBackup={handleImportBackup}
            />
          )}

          {/* 9. Universal Wikipedia Encyclopedia */}
          {activeTab === 'encyclopedia' && (
            <EncyclopediaSection
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              notes={notes}
              focusCategory={encyclopediaFocusCategory}
              focusItemId={encyclopediaFocusItemId}
              onClearFocus={() => {
                setEncyclopediaFocusCategory(undefined);
                setEncyclopediaFocusItemId(undefined);
              }}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {/* 11. Philosopher Grove */}
          {activeTab === 'philosophers' && (
            <PhilosophersSection
              bookmarks={bookmarks}
              selectedPhilosopherId={selectedPhilosopherId}
              onSelectPhilosopher={setSelectedPhilosopherId}
              onToggleBookmark={handleToggleBookmark}
              onAddNote={handleAddNote}
            />
          )}

          {/* 12. Empirical Compare & Contrast Suite */}
          {activeTab === 'compare' && (
            <CompareSection 
              onAddNote={handleAddNote} 
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {/* 13. Did You Know? Historical Facts Vault */}
          {activeTab === 'facts' && (
            <DidYouKnowSection
              onNavigateTo={handleNavigateFromFact}
              onAddNote={handleAddNote}
              onToggleBookmark={handleToggleBookmark}
              bookmarks={bookmarks}
              focusFactId={focusFactId}
            />
          )}

          {/* 14. 1,000+ Famous Battles Around the World */}
          {activeTab === 'battles' && (
            <BattlesSection
              onAddNote={handleAddNote}
              onToggleBookmark={handleToggleBookmark}
              bookmarks={bookmarks}
              focusBattleId={focusBattleId}
            />
          )}

          {/* 15. 500+ Scholarly Research Papers Library */}
          {activeTab === 'papers' && (
            <ResearchPapersSection
              onAddNote={handleAddNote}
              onToggleBookmark={handleToggleBookmark}
              bookmarks={bookmarks}
              focusPaperId={focusPaperId}
            />
          )}

          {/* 16. World Political Ideologies & Governance Systems */}
          {activeTab === 'ideologies' && (
            <PoliticalIdeologiesSection
              onAddNote={handleAddNote}
              onToggleBookmark={handleToggleBookmark}
              bookmarks={bookmarks}
              focusIdeologyId={focusIdeologyId}
            />
          )}

          {/* 17. World Most Famous Buildings, Marvels & Antiquities (230+) */}
          {activeTab === 'monuments' && (
            <WorldMonumentsSection
              onAddNote={handleAddNote}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {/* 18. Decrees, Historic Speeches & Primary Sources Archive */}
          {activeTab === 'decrees' && (
            <PrimarySourcesSection
              onAddNote={handleAddNote}
              onToggleBookmark={handleToggleBookmark}
              bookmarks={bookmarks}
            />
          )}
        </VaultDoorReveal>

      </main>

      {/* Humble Footer area */}
      <footer className="bg-[#070707] text-[#A09890] text-xs py-8 mt-12 border-t border-[#1F1F1F] font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-[#A09890]">
            Created by <span className="text-[#D4AF37] font-bold">Ayush patel</span>
          </p>
        </div>
      </footer>

      {/* Curator Personal Profile Modal */}
      <PersonalProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        notes={notes}
        bookmarks={bookmarks}
        onDeleteNote={handleDeleteNote}
        onToggleBookmark={handleToggleBookmark}
        onNavigateToBookmark={handleNavigateToBookmark}
        onImportBackup={handleImportBackup}
      />

      {/* Direct Global Search Inspector Modal */}
      <SearchDetailModal
        isOpen={isDirectSearchOpen}
        onClose={() => {
          setIsDirectSearchOpen(false);
          setDirectSearchItem(null);
        }}
        item={directSearchItem}
        bookmarks={bookmarks}
        onToggleBookmark={handleToggleBookmark}
        onAddNote={handleAddNote}
        onNavigateToTab={handleNavigateFromSearchModal}
        recentSearches={recentSearches}
        onSelectRecent={(item) => handleOpenDirectSearchResult(item.type, item.data)}
        onClearRecent={handleClearRecentSearches}
      />
    </div>
  );
}
