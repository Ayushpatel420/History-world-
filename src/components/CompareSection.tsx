import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  Trash2, 
  ArrowLeftRight, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Globe, 
  Shield, 
  Landmark, 
  MapPin, 
  Search, 
  ChevronRight, 
  Activity, 
  Zap, 
  Layers, 
  AlertCircle, 
  Quote,
  Check,
  X,
  Calendar,
  Plus,
  FileText,
  Award,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Monarch, HistoricalFigure, HistoricalEvent, CountryDetail, UserNote, Bookmark } from '../types';
import { COUNTRIES, HISTORICAL_FIGURES, MONARCHS, HISTORICAL_EVENTS } from '../data/historyData';
import { PHILOSOPHERS } from '../data/philosophersData';
import SearchDetailModal, { SearchDetailItem } from './SearchDetailModal';
import PaginationControls from './PaginationControls';

// Normalized Figure interface for side-by-side comparisons
interface NormalizedFigure {
  id: string;
  name: string;
  type: 'Ruler' | 'Philosopher' | 'Eminent Figure';
  role: string;
  era: string;
  biography: string;
  contributions: string[];
  region: string;
  years: string;
  quote?: string;
  achievements: string[];
  legacy?: string;
  startYear?: number;
  endYear?: number;
}

// Preset Juxtaposition Sets
const PRESET_COMPARISONS = {
  figures: [
    {
      name: "Philosophers of Ethics",
      ids: ["socrates", "confucius"],
      description: "Socrates (West) vs. Confucius (East) — contrasting dialogical inquiry and filial societal harmony."
    },
    {
      name: "Ancient Conquerors & Statecraft",
      ids: ["ruler_alexander", "ruler_caesar"],
      description: "Alexander the Great vs. Julius Caesar — conquest strategies, imperial consolidation, and military structures."
    },
    {
      name: "Renaissance & Scientific Pioneers",
      ids: ["leonardo_da_vinci", "isaac_newton"],
      description: "Leonardo da Vinci vs. Sir Isaac Newton — Renaissance polymathic observation vs. mathematical rationalism."
    },
    {
      name: "Philosophical Foundations",
      ids: ["plato", "aristotle"],
      description: "Plato vs. Aristotle — The World of Ideal Forms vs. Empirical Observation and Categorization."
    }
  ],
  countries: [
    {
      name: "Classical Mediterranean & Nile",
      ids: ["rome", "egypt"],
      description: "Imperial Rome vs. Ancient Egypt — Republican/Imperial law and legions vs. pharaonic divine monumentalism."
    },
    {
      name: "Classical East & West",
      ids: ["rome", "greece", "india"],
      description: "Rome vs. Classical Greece vs. Ancient India — jurisprudence and legions vs. civic democracy vs. dharmic philosophy."
    },
    {
      name: "Civilizational Hubs",
      ids: ["greece", "egypt"],
      description: "Classical Greece vs. Dynastic Egypt — intellectual inquiry and city-states vs. millennia of riverine monarchy."
    }
  ],
  events: [
    {
      name: "Democratic Revolutions",
      ids: ["ev_american_rev", "ev_french_rev"],
      description: "American Revolution (1775) vs. French Revolution (1789) — sovereign independence vs. radical internal social upheaval."
    },
    {
      name: "World-Defining Warfare",
      ids: ["ev_fall_rome", "ev_ww1"],
      description: "Fall of Rome (476) vs. World War I (1914) — collapse of classical borders vs. industrial total warfare."
    },
    {
      name: "Antiquity to Modernity",
      ids: ["ev_alexander_conquest", "ev_french_rev"],
      description: "Alexander's Campaigns vs. French Revolution — charismatic ancient conquest vs. modern democratic awakening."
    }
  ]
};

interface CompareSectionProps {
  onAddNote?: (
    title: string,
    content: string,
    type: UserNote['targetType'],
    targetId?: string,
    tags?: string[],
    targetTitle?: string
  ) => void;
  bookmarks?: Bookmark[];
  onToggleBookmark?: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
}

export default function CompareSection({ onAddNote, bookmarks = [], onToggleBookmark }: CompareSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'figures' | 'countries' | 'events'>('figures');
  const [activeView, setActiveView] = useState<'attributes' | 'timelines' | 'impacts'>('attributes');
  
  // Dynamic slots states: user can select 2, 3, or 4 items to compare
  const [selectedIds, setSelectedIds] = useState<string[]>(['ruler_caesar', 'ruler_alexander']);
  // Quick custom filters/searches inside comparative selection
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingEntity, setIsAddingEntity] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Direct Detail View Modal State
  const [focusedDetailItem, setFocusedDetailItem] = useState<SearchDetailItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Directly inspect entity details on the spot without navigating away
  const handleOpenItemDetail = (item: any) => {
    let detailItem: SearchDetailItem | null = null;
    if (activeCategory === 'figures') {
      const monarch = MONARCHS.find(m => m.id === item.id);
      if (monarch) {
        detailItem = { type: 'monarch', data: monarch };
      } else {
        const figure = HISTORICAL_FIGURES.find(f => f.id === item.id);
        if (figure) {
          detailItem = { type: 'figure', data: figure };
        } else {
          const phil = PHILOSOPHERS.find(p => p.id === item.id);
          if (phil) {
            detailItem = { type: 'philosopher', data: phil };
          } else {
            detailItem = { type: 'figure', data: item };
          }
        }
      }
    } else if (activeCategory === 'countries') {
      const country = COUNTRIES.find(c => c.id === item.id) || item;
      detailItem = { type: 'country', data: country };
    } else {
      const ev = HISTORICAL_EVENTS.find(e => e.id === item.id) || item;
      detailItem = { type: 'event', data: ev };
    }

    if (detailItem) {
      setFocusedDetailItem(detailItem);
      setIsDetailModalOpen(true);
    }
  };

  // 1. Prepare Figures dataset merged and normalized
  const ALL_FIGURES = useMemo<NormalizedFigure[]>(() => {
    const list: NormalizedFigure[] = [];

    // Helper to parse approximate start/end years for timeline comparison
    const parseApproxYears = (yearStr: string): { start?: number; end?: number } => {
      const nums = yearStr.match(/-?\d+/g);
      if (!nums || nums.length === 0) return {};
      const isBC = yearStr.toUpperCase().includes('BC') || yearStr.toUpperCase().includes('BCE');
      let start = parseInt(nums[0], 10);
      let end = nums[1] ? parseInt(nums[1], 10) : start;
      if (isBC) {
        start = -Math.abs(start);
        end = -Math.abs(end);
        if (start > end) {
          const tmp = start;
          start = end;
          end = tmp;
        }
      }
      return { start, end };
    };

    // Add Monarchs
    MONARCHS.forEach(m => {
      const parsed = parseApproxYears(m.reign);
      list.push({
        id: m.id,
        name: m.name,
        type: 'Ruler',
        role: m.title,
        era: 'Classical / Imperial',
        biography: m.biography,
        contributions: m.keyAchievements,
        region: m.region,
        years: m.reign,
        achievements: m.keyAchievements,
        legacy: m.legacy,
        startYear: parsed.start,
        endYear: parsed.end
      });
    });

    // Add Historical Figures
    HISTORICAL_FIGURES.forEach(f => {
      const parsed = parseApproxYears(f.birthDeath);
      list.push({
        id: f.id,
        name: f.name,
        type: 'Eminent Figure',
        role: f.role,
        era: f.era,
        biography: f.biography,
        contributions: f.contributions,
        region: f.category,
        years: f.birthDeath,
        quote: f.quote,
        achievements: f.contributions,
        legacy: `${f.role} legacy of cultural, scientific, and societal transformation.`,
        startYear: parsed.start,
        endYear: parsed.end
      });
    });

    // Add Philosophers
    PHILOSOPHERS.forEach(p => {
      const parsed = parseApproxYears(p.bornDiet);
      list.push({
        id: p.id,
        name: p.name,
        type: 'Philosopher',
        role: `${p.school} Philosopher`,
        era: p.era,
        biography: p.biography,
        contributions: p.ideas,
        region: p.region,
        years: p.bornDiet,
        quote: p.quotes?.[0],
        achievements: p.famousBooks,
        legacy: `${p.name} fundamentally reshaped human thought, authoring paradigms including ${p.ideas.slice(0, 2).join(', ')}.`,
        startYear: parsed.start,
        endYear: parsed.end
      });
    });

    return list;
  }, []);

  // Filter lists based on the active category and search filter
  const availableItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (activeCategory === 'figures') {
      return ALL_FIGURES.filter(item => 
        !q ||
        item.name.toLowerCase().includes(q) || 
        item.role.toLowerCase().includes(q) || 
        item.era.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q)
      );
    } else if (activeCategory === 'countries') {
      return COUNTRIES.filter(item => 
        !q ||
        item.name.toLowerCase().includes(q) || 
        item.culture.toLowerCase().includes(q) || 
        (item.continent && item.continent.toLowerCase().includes(q))
      );
    } else {
      return HISTORICAL_EVENTS.filter(item => 
        !q ||
        item.title.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q) || 
        item.era.toLowerCase().includes(q) || 
        item.date.toLowerCase().includes(q)
      );
    }
  }, [activeCategory, searchQuery, ALL_FIGURES]);

  // Pagination for the Add Entity / Available Items Section Area
  const [addSectionPage, setAddSectionPage] = useState(1);
  const [addSectionPerPage, setAddSectionPerPage] = useState(24);

  const paginatedAvailableItems = useMemo(() => {
    const startIndex = (addSectionPage - 1) * addSectionPerPage;
    return availableItems.slice(startIndex, startIndex + addSectionPerPage);
  }, [availableItems, addSectionPage, addSectionPerPage]);

  const currentDetailIndex = useMemo(() => {
    if (!focusedDetailItem) return -1;
    const id = focusedDetailItem.data?.id;
    return availableItems.findIndex((it: any) => it.id === id);
  }, [focusedDetailItem, availableItems]);

  const handlePrevDetailDive = () => {
    if (currentDetailIndex <= 0) return;
    const prevItem = availableItems[currentDetailIndex - 1];
    handleOpenItemDetail(prevItem);
    const targetPage = Math.floor((currentDetailIndex - 1) / addSectionPerPage) + 1;
    if (targetPage !== addSectionPage) {
      setAddSectionPage(targetPage);
    }
  };

  const handleNextDetailDive = () => {
    if (currentDetailIndex < 0 || currentDetailIndex >= availableItems.length - 1) return;
    const nextItem = availableItems[currentDetailIndex + 1];
    handleOpenItemDetail(nextItem);
    const targetPage = Math.floor((currentDetailIndex + 1) / addSectionPerPage) + 1;
    if (targetPage !== addSectionPage) {
      setAddSectionPage(targetPage);
    }
  };

  // Handle changing category
  const handleCategoryChange = (category: 'figures' | 'countries' | 'events') => {
    setActiveCategory(category);
    setSearchQuery('');
    setAddSectionPage(1);
    setIsAddingEntity(false);
    
    if (category === 'figures') {
      setSelectedIds(['ruler_caesar', 'ruler_alexander']);
    } else if (category === 'countries') {
      setSelectedIds(['rome', 'egypt']);
    } else {
      const defaultEvents = HISTORICAL_EVENTS.slice(0, 2).map(e => e.id);
      setSelectedIds(defaultEvents);
    }
  };

  const addItemToCompare = (id: string) => {
    if (selectedIds.includes(id)) return;
    if (selectedIds.length >= 4) {
      // Limit to 4 side-by-side to preserve readability
      setSelectedIds(prev => [...prev.slice(1), id]);
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
    setSearchQuery('');
    setIsAddingEntity(false);
  };

  const removeItemFromCompare = (id: string) => {
    if (selectedIds.length <= 1) return; // Keep at least 1
    setSelectedIds(prev => prev.filter(x => x !== id));
  };

  const applyPreset = (ids: string[]) => {
    setSelectedIds(ids);
  };

  // Fetch fully resolved compare slots
  const activeFigures = useMemo(() => {
    return selectedIds.map(id => ALL_FIGURES.find(f => f.id === id)).filter(Boolean) as NormalizedFigure[];
  }, [selectedIds, ALL_FIGURES]);

  const activeCountries = useMemo(() => {
    return selectedIds.map(id => COUNTRIES.find(c => c.id === id)).filter(Boolean) as CountryDetail[];
  }, [selectedIds]);

  const activeEvents = useMemo(() => {
    return selectedIds.map(id => HISTORICAL_EVENTS.find(e => e.id === id)).filter(Boolean) as HistoricalEvent[];
  }, [selectedIds]);

  // Current entity labels for badges and titles
  const currentEntityNames = useMemo(() => {
    if (activeCategory === 'figures') return activeFigures.map(f => f.name);
    if (activeCategory === 'countries') return activeCountries.map(c => c.name);
    return activeEvents.map(e => e.title);
  }, [activeCategory, activeFigures, activeCountries, activeEvents]);

  // Computed automated difference matrices / scorecards
  const compareAnalysis = useMemo(() => {
    if (activeCategory === 'figures' && activeFigures.length >= 2) {
      const f1 = activeFigures[0];
      const f2 = activeFigures[1];
      const sameEra = f1.era === f2.era || f1.years.includes(f2.years.split('-')[0]) || f2.years.includes(f1.years.split('-')[0]);
      return {
        commonTheme: sameEra ? "Contemporaneous Thinkers & Leaders" : "Cross-Epoch Historical Archetypes",
        insight: `${f1.name} (${f1.role}) prioritized ${f1.contributions[0] || 'structural reform'}, contrasting with ${f2.name} (${f2.role}), whose historic mark centered upon ${f2.contributions[0] || 'strategic vision'}.`,
        keyDistinction: `While ${f1.name} operated primarily within the ${f1.region} sphere, ${f2.name} navigated ${f2.region} geopolitics.`,
        legacyComparison: `${f1.name}: ${f1.legacy || f1.biography.slice(0, 100)}... vs. ${f2.name}: ${f2.legacy || f2.biography.slice(0, 100)}...`
      };
    }
    if (activeCategory === 'countries' && activeCountries.length >= 2) {
      const c1 = activeCountries[0];
      const c2 = activeCountries[1];
      return {
        commonTheme: c1.continent === c2.continent ? `Regional Powers within ${c1.continent}` : `Cross-Continental Civilizational Spheres`,
        insight: `${c1.name}'s zenith established milestones such as "${c1.achievements[0]}", juxtaposed with ${c2.name}'s monumental breakthroughs: "${c2.achievements[0]}".`,
        keyDistinction: `${c1.name} featured a culture centered on ${c1.culture.slice(0, 60)}..., whereas ${c2.name} relied on ${c2.culture.slice(0, 60)}...`,
        legacyComparison: `${c1.name} shaped global history through ${c1.worldImpact || c1.revolution} while ${c2.name} contributed ${c2.worldImpact || c2.revolution}.`
      };
    }
    if (activeCategory === 'events' && activeEvents.length >= 2) {
      const e1 = activeEvents[0];
      const e2 = activeEvents[1];
      const yearDiff = Math.abs(e1.year - e2.year);
      return {
        commonTheme: yearDiff < 50 ? "Near-Contemporary Crises" : `Separated by ~${yearDiff} Years across History`,
        insight: `While "${e1.title}" (${e1.date}) was driven by ${e1.participants.slice(0, 2).join(', ')}, "${e2.title}" (${e2.date}) mobilized coalitions to transform ${e2.category || 'global balances'}.`,
        keyDistinction: `"${e1.title}" addressed ${e1.description.slice(0, 70)}..., whereas "${e2.title}" challenged ${e2.description.slice(0, 70)}...`,
        legacyComparison: `Immediate aftermath of "${e1.title}": ${e1.impact} vs. "${e2.title}": ${e2.impact}`
      };
    }
    return null;
  }, [activeCategory, activeFigures, activeCountries, activeEvents]);

  // Handle Save Comparison to Notebook
  const handleSaveToNotebook = () => {
    if (!onAddNote || currentEntityNames.length < 2) return;

    const title = `Comparison: ${currentEntityNames.join(' vs. ')}`;
    let content = `## Historical Comparative Dossier: ${currentEntityNames.join(' vs. ')}\n\n`;
    content += `**Category**: ${activeCategory === 'figures' ? 'Historical Figures & Thinkers' : activeCategory === 'countries' ? 'Civilizations & Empires' : 'Historical Events'}\n`;
    content += `**Comparative Perspective**: Key Attributes, Timelines, and Civilizational Impacts\n\n`;

    if (compareAnalysis) {
      content += `### Analytical Arc (${compareAnalysis.commonTheme})\n`;
      content += `${compareAnalysis.insight}\n\n`;
      content += `**Key Distinction**: ${compareAnalysis.keyDistinction}\n\n`;
      content += `**Legacy Footprint**: ${compareAnalysis.legacyComparison}\n\n`;
    }

    content += `### Side-by-Side Breakdown\n`;
    if (activeCategory === 'figures') {
      activeFigures.forEach(fig => {
        content += `#### ${fig.name} (${fig.role})\n`;
        content += `- **Reign / Lifespan**: ${fig.years}\n`;
        content += `- **Region**: ${fig.region}\n`;
        content += `- **Core Contributions**: ${fig.contributions.join(', ')}\n`;
        if (fig.quote) content += `- **Quote**: "${fig.quote}"\n`;
        content += `- **Biography**: ${fig.biography}\n\n`;
      });
    } else if (activeCategory === 'countries') {
      activeCountries.forEach(cnt => {
        content += `#### ${cnt.name} (${cnt.continent || 'Civilization'})\n`;
        content += `- **Language**: ${cnt.language}\n`;
        content += `- **Culture & Ideology**: ${cnt.culture}\n`;
        content += `- **Civilizational Achievements**: ${cnt.achievements.join(', ')}\n`;
        content += `- **Historical Turning Points**: ${cnt.revolution}\n`;
        content += `- **World Impact**: ${cnt.worldImpact}\n\n`;
      });
    } else {
      activeEvents.forEach(ev => {
        content += `#### ${ev.title} (${ev.date})\n`;
        content += `- **Era**: ${ev.era} (${ev.year})\n`;
        content += `- **Category**: ${ev.category || 'Historical Event'}\n`;
        content += `- **Key Participants**: ${ev.participants.join(', ')}\n`;
        content += `- **Summary**: ${ev.description}\n`;
        content += `- **Geopolitical Aftermath**: ${ev.impact}\n\n`;
      });
    }

    onAddNote(
      title,
      content,
      activeCategory === 'figures' ? 'Figure' : activeCategory === 'countries' ? 'Country' : 'Event',
      selectedIds.join('-'),
      ['comparison', activeCategory, ...currentEntityNames],
      currentEntityNames.join(' vs. ')
    );

    setSaveSuccessMessage(`Dossier "${title}" saved to your Notebook!`);
    setTimeout(() => setSaveSuccessMessage(null), 4000);
  };

  return (
    <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 overflow-hidden space-y-7 text-left">
      
      {/* 1. Header with description & Category Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#2A2A2A]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#D4AF37]/15 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif italic text-[#D4AF37] tracking-tight">
                Empirical Compare & Contrast Suite
              </h3>
              <p className="text-xs text-[#A09890]">
                Examine historical figures, civilizational empires, and turning-point events side-by-side across key attributes, timelines, and lasting impacts.
              </p>
            </div>
          </div>
        </div>

        {/* Global category selection pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-[#151515] p-1 rounded-xl border border-[#2A2A2A] flex shrink-0">
            <button
              onClick={() => handleCategoryChange('figures')}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'figures'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <span>👑</span> Sovereigns & Scholars
            </button>
            <button
              onClick={() => handleCategoryChange('countries')}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'countries'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <span>🏛️</span> Civilizations
            </button>
            <button
              onClick={() => handleCategoryChange('events')}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'events'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <span>🛡️</span> Epoch Events
            </button>
          </div>

          {onAddNote && (
            <button
              onClick={handleSaveToNotebook}
              className="px-3 py-2 bg-[#1A1A1A] hover:bg-[#252525] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Save this side-by-side comparison into your notebook"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Save to Notes</span>
            </button>
          )}
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccessMessage && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs font-mono text-emerald-300 flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* 2. Selection Bar, Presets, and Active Entities Manager */}
      <div className="bg-[#0A0A0A] p-4 rounded-xl border border-[#222] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono text-[#7A7065] uppercase font-bold tracking-wider">
              Comparing ({selectedIds.length}/4 Slots):
            </span>

            {/* Active entity chips */}
            {activeCategory === 'figures' && activeFigures.map(fig => (
              <div key={fig.id} className="inline-flex items-center gap-2 px-3 py-1 bg-[#151515] border border-[#D4AF37]/30 rounded-lg text-xs font-mono text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <button 
                  onClick={() => handleOpenItemDetail(fig)}
                  className="font-serif italic font-bold hover:text-[#D4AF37] hover:underline cursor-pointer text-left"
                  title="Click for Direct View"
                >
                  {fig.name}
                </button>
                {selectedIds.length > 1 && (
                  <button 
                    onClick={() => removeItemFromCompare(fig.id)}
                    className="text-[#7A7065] hover:text-rose-400 cursor-pointer text-sm leading-none"
                    title="Remove entity"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {activeCategory === 'countries' && activeCountries.map(cnt => (
              <div key={cnt.id} className="inline-flex items-center gap-2 px-3 py-1 bg-[#151515] border border-[#D4AF37]/30 rounded-lg text-xs font-mono text-white">
                <span>{cnt.flag || '🗺️'}</span>
                <button 
                  onClick={() => handleOpenItemDetail(cnt)}
                  className="font-serif italic font-bold hover:text-[#D4AF37] hover:underline cursor-pointer text-left"
                  title="Click for Direct View"
                >
                  {cnt.name}
                </button>
                {selectedIds.length > 1 && (
                  <button 
                    onClick={() => removeItemFromCompare(cnt.id)}
                    className="text-[#7A7065] hover:text-rose-400 cursor-pointer text-sm leading-none"
                    title="Remove empire"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {activeCategory === 'events' && activeEvents.map(ev => (
              <div key={ev.id} className="inline-flex items-center gap-2 px-3 py-1 bg-[#151515] border border-[#D4AF37]/30 rounded-lg text-xs font-mono text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <button 
                  onClick={() => handleOpenItemDetail(ev)}
                  className="font-serif italic font-bold hover:text-[#D4AF37] hover:underline cursor-pointer text-left"
                  title="Click for Direct View"
                >
                  {ev.title}
                </button>
                {selectedIds.length > 1 && (
                  <button 
                    onClick={() => removeItemFromCompare(ev.id)}
                    className="text-[#7A7065] hover:text-rose-400 cursor-pointer text-sm leading-none"
                    title="Remove event"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {selectedIds.length < 4 && (
              <button
                onClick={() => setIsAddingEntity(!isAddingEntity)}
                className="px-2.5 py-1 bg-[#121212] hover:bg-[#1C1C1C] border border-dashed border-[#444] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Node</span>
              </button>
            )}
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-[9px] font-mono text-[#7A7065] uppercase shrink-0">Presets:</span>
            {PRESET_COMPARISONS[activeCategory]?.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset.ids)}
                className="px-2.5 py-1 bg-[#121212] hover:bg-[#1A1A1A] border border-[#222] hover:border-[#D4AF37]/40 rounded-lg text-[10px] font-mono text-[#A09890] hover:text-white transition-all whitespace-nowrap cursor-pointer"
                title={preset.description}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Expandable Entity Selector / Search Drawer */}
        {isAddingEntity && (
          <div className="p-4 bg-[#121212] rounded-xl border border-[#2A2A2A] space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-[#D4AF37] flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                Search & Select Entity to Compare (Click opens Direct View)
              </span>
              <button
                onClick={() => setIsAddingEntity(false)}
                className="text-xs text-[#7A7065] hover:text-white cursor-pointer font-mono"
              >
                Close ✕
              </button>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setAddSectionPage(1);
              }}
              placeholder={`Type name, era, or region to filter ${activeCategory}...`}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37] font-mono"
              autoFocus
            />

            {/* Top Pagination for Available Items */}
            {availableItems.length > addSectionPerPage && (
              <div className="pb-1">
                <PaginationControls
                  currentPage={addSectionPage}
                  totalItems={availableItems.length}
                  itemsPerPage={addSectionPerPage}
                  onPageChange={setAddSectionPage}
                  onItemsPerPageChange={(newSize) => {
                    setAddSectionPerPage(newSize);
                    setAddSectionPage(1);
                  }}
                  itemsPerPageOptions={[12, 24, 48, 96]}
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {paginatedAvailableItems.map((item: any) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-[#151515] border-[#D4AF37]/40'
                        : 'bg-[#0A0A0A] hover:bg-[#181818] border-[#222] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div 
                      onClick={() => handleOpenItemDetail(item)}
                      className="cursor-pointer group"
                      title="Click for Direct View without navigating away"
                    >
                      <div className="font-serif font-bold text-xs text-white group-hover:text-[#D4AF37] truncate transition-colors flex items-center justify-between">
                        <span>{item.name || item.title}</span>
                        <span className="text-[9px] font-mono text-[#777] group-hover:text-[#D4AF37]">↗</span>
                      </div>
                      <div className="text-[10px] text-[#A09890] font-mono truncate mt-0.5">
                        {item.role || item.continent || item.era || item.culture}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1 mt-2 pt-2 border-t border-[#1C1C1C]">
                      <button
                        onClick={() => handleOpenItemDetail(item)}
                        className="text-[10px] font-mono text-[#D4AF37] hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        Direct View
                      </button>
                      <button
                        onClick={() => {
                          if (isSelected) {
                            removeItemFromCompare(item.id);
                          } else {
                            addItemToCompare(item.id);
                          }
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-700/50 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-700/50'
                            : 'bg-[#181818] hover:bg-[#D4AF37] hover:text-black text-[#E0D8D0] border border-[#333]'
                        }`}
                        title={isSelected ? 'Remove from comparison' : 'Add to comparison'}
                      >
                        {isSelected ? '✓ In Compare' : '+ Compare'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Pagination for Available Items */}
            {availableItems.length > addSectionPerPage && (
              <div className="pt-1">
                <PaginationControls
                  currentPage={addSectionPage}
                  totalItems={availableItems.length}
                  itemsPerPage={addSectionPerPage}
                  onPageChange={setAddSectionPage}
                  onItemsPerPageChange={(newSize) => {
                    setAddSectionPerPage(newSize);
                    setAddSectionPage(1);
                  }}
                  itemsPerPageOptions={[12, 24, 48, 96]}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Synthesis Highlight Box */}
      {compareAnalysis && (
        <div className="p-4 bg-[#14120F]/80 rounded-xl border border-[#D4AF37]/30 flex items-start gap-3">
          <div className="bg-[#D4AF37]/15 p-2 rounded-lg text-[#D4AF37] shrink-0 border border-[#D4AF37]/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-left">
            <h5 className="font-serif italic font-bold text-[#D4AF37] text-xs flex items-center gap-2">
              <span>Axiomatic Synthesis</span>
              <span className="text-[10px] font-mono text-[#7A7065] font-normal">• {compareAnalysis.commonTheme}</span>
            </h5>
            <p className="text-xs text-[#C4B9AD] leading-relaxed font-sans">
              {compareAnalysis.insight}
            </p>
            <p className="text-[11px] text-[#8CA59C] font-mono mt-1">
              {compareAnalysis.keyDistinction}
            </p>
          </div>
        </div>
      )}

      {/* 4. Three Perspective Tabs: Key Attributes, Timelines, Impacts */}
      <div className="border-b border-[#2A2A2A] flex items-center gap-2">
        {[
          { id: 'attributes', label: 'Key Attributes & Matrix', icon: BookOpen },
          { id: 'timelines', label: 'Chronological Timelines', icon: Clock },
          { id: 'impacts', label: 'Impacts & Civilizational Legacy', icon: Activity }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`pb-3 px-3 text-xs font-mono font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-[#7A7065] hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* VIEW 1: KEY ATTRIBUTES (Side-by-Side Cards & Comparative Table Matrix) */}
      {activeView === 'attributes' && (
        <div className="space-y-8">
          {/* Side-by-Side Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-2 ${selectedIds.length >= 3 ? 'lg:grid-cols-' + selectedIds.length : 'lg:grid-cols-2'} gap-6`}>
            <AnimatePresence mode="popLayout">
              {/* A. If Figures Category */}
              {activeCategory === 'figures' && activeFigures.map((fig, idx) => (
                <motion.div
                  layout
                  key={fig.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#0B0B0B] border border-[#2A2A2A] hover:border-[#D4AF37]/40 p-5 rounded-2xl flex flex-col justify-between space-y-5 shadow-xl transition-all text-left"
                >
                  <div className="space-y-3 pb-4 border-b border-[#222]">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] bg-[#121212] border border-[#2A2A2A] text-[#D4AF37] px-2 py-0.5 rounded font-mono uppercase tracking-wider font-bold">
                        {fig.type}
                      </span>
                      <span className="text-[9px] text-[#7A7065] font-mono">
                        Slot #{idx + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-serif italic font-bold text-lg text-white block tracking-wide">
                        {fig.name}
                      </h4>
                      <p className="text-[11px] font-mono text-[#D4AF37] mt-0.5 font-semibold">
                        {fig.role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    {/* Reign / Span */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono text-[#7A7065] tracking-widest uppercase block">Reign / Lifespan</span>
                      <p className="text-white font-mono flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {fig.years}
                      </p>
                    </div>

                    {/* Region */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono text-[#7A7065] tracking-widest uppercase block">Geographic Realm</span>
                      <p className="text-[#E0D8D0] font-serif italic flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {fig.region}
                      </p>
                    </div>

                    {/* Biography */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono text-[#7A7065] tracking-widest uppercase block">Biographical Context</span>
                      <p className="text-[#A09890] leading-relaxed line-clamp-3 font-sans">
                        {fig.biography}
                      </p>
                    </div>

                    {/* Contributions */}
                    <div className="space-y-2 bg-[#0F0F0F] p-3 rounded-xl border border-[#1C1C1C]">
                      <span className="text-[8px] font-mono text-[#7A7065] tracking-widest uppercase block flex items-center gap-1">
                        <Shield className="w-3 h-3 text-[#D4AF37]" /> Landmark Contributions & Deeds
                      </span>
                      <ul className="space-y-1 text-xs text-[#A09890] font-sans">
                        {fig.contributions.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#D4AF37] shrink-0 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quote */}
                    {fig.quote && (
                      <div className="border-l bg-[#121212] border-[#D4AF37] pl-3 py-1.5 italic font-serif text-[11px] text-[#C4B9AD] relative">
                        <Quote className="w-3 h-3 text-[#D4AF37]/30 absolute -top-1 -left-1 opacity-20" />
                        "{fig.quote}"
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-[10px] font-mono text-[#7A7065]">
                    <span>Category</span>
                    <span className="text-emerald-400 font-bold uppercase">{fig.era}</span>
                  </div>
                </motion.div>
              ))}

              {/* B. If Countries Category */}
              {activeCategory === 'countries' && activeCountries.map((cnt, idx) => (
                <motion.div
                  layout
                  key={cnt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#0B0B0B] border border-[#2A2A2A] hover:border-[#D4AF37]/40 p-5 rounded-2xl flex flex-col justify-between space-y-5 shadow-xl transition-all text-left"
                >
                  <div className="space-y-3 pb-4 border-b border-[#222]">
                    <div className="flex justify-between items-start">
                      <span className="text-2xl shrink-0">
                        {cnt.flag || '🏛️'}
                      </span>
                      <span className="text-[9px] text-[#7A7065] font-mono">
                        Civilization #{idx + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-serif italic font-bold text-lg text-white block tracking-wide">
                        {cnt.name}
                      </h4>
                      <p className="text-[11px] font-mono text-[#D4AF37] mt-0.5 font-semibold">
                        Language: {cnt.language}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div className="grid grid-cols-2 gap-3 pb-2 border-b border-[#1C1C1C]">
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-mono text-[#7A7065] uppercase block">Continent</span>
                        <span className="text-white font-mono">{cnt.continent || 'Eurasian'}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-mono text-[#7A7065] uppercase block">Global Rank</span>
                        <span className="text-emerald-400 font-bold font-mono">Rank {cnt.worldPlaceRank || '#1'}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[8px] font-mono text-[#7A7065] tracking-widest uppercase block">Culture & Governance</span>
                      <p className="text-[#A09890] leading-relaxed font-sans line-clamp-3">
                        {cnt.culture}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[8px] font-mono text-[#7A7065] tracking-widest uppercase block">Geographic Realm</span>
                      <p className="text-[#A09890] leading-relaxed font-sans line-clamp-2">
                        {cnt.geography}
                      </p>
                    </div>

                    <div className="space-y-2 bg-[#0F0F0F] p-3 rounded-xl border border-[#1C1C1C]">
                      <span className="text-[8px] font-mono text-[#7A7065] tracking-widest uppercase block flex items-center gap-1">
                        <Landmark className="w-3 h-3 text-[#D4AF37]" /> Civilizational Triumphs
                      </span>
                      <ul className="space-y-1 text-xs text-[#A09890] font-sans">
                        {cnt.achievements.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#D4AF37] shrink-0 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-[10px] font-mono text-[#7A7065]">
                    <span>Global Sphere</span>
                    <span className="text-amber-400 font-bold uppercase">{cnt.worldImpactScale || 'Dominant Hegemony'}</span>
                  </div>
                </motion.div>
              ))}

              {/* C. If Events Category */}
              {activeCategory === 'events' && activeEvents.map((ev, idx) => (
                <motion.div
                  layout
                  key={ev.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#0B0B0B] border border-[#2A2A2A] hover:border-[#D4AF37]/40 p-5 rounded-2xl flex flex-col justify-between space-y-5 shadow-xl transition-all text-left"
                >
                  <div className="space-y-3 pb-4 border-b border-[#222]">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] bg-red-950/40 border border-red-900/60 text-red-400 px-2 py-0.5 rounded font-mono uppercase tracking-wider font-bold">
                        {ev.category || 'Historical Event'}
                      </span>
                      <span className="text-[9px] text-[#7A7065] font-mono">
                        Event #{idx + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-serif italic font-bold text-base text-white block tracking-wide">
                        {ev.title}
                      </h4>
                      <p className="text-[11px] font-mono text-[#D4AF37] mt-0.5 font-semibold">
                        Date: {ev.date}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div className="space-y-1 pb-1 border-b border-[#1C1C1C]">
                      <span className="text-[8px] font-mono text-[#7A7065] tracking-widest uppercase block">Chronological Anchor</span>
                      <p className="text-white font-mono flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {ev.year} ({ev.era})
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[8px] font-mono text-[#7A7065] tracking-widest uppercase block">Historical Description</span>
                      <p className="text-[#A09890] leading-relaxed line-clamp-3 font-sans">
                        {ev.description}
                      </p>
                    </div>

                    <div className="space-y-2 bg-[#0F0F0F] p-3 rounded-xl border border-[#1C1C1C]">
                      <span className="text-[8px] font-mono text-[#7A7065] tracking-widest uppercase block flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-[#D4AF37]" /> Key Belligerents & Protagonists
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {ev.participants.map((person, i) => (
                          <span key={i} className="text-[9px] bg-[#121212] border border-[#222] text-[#E0D8D0] px-2 py-0.5 rounded font-mono">
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-[10px] font-mono text-[#7A7065]">
                    <span>Geopolitical Class</span>
                    <span className="text-rose-400 font-bold uppercase">{ev.era} Epoch</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Structured Comparative Matrix Table */}
          <div className="space-y-3 pt-4 border-t border-[#222]">
            <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Synchronized Comparative Attribute Matrix
            </h4>

            <div className="overflow-x-auto rounded-xl border border-[#2A2A2A] bg-[#0A0A0A]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#2A2A2A] bg-[#121212]">
                    <th className="p-3 font-mono font-bold uppercase text-[#7A7065] text-[10px] w-1/4">Comparative Axis</th>
                    {currentEntityNames.map((name, i) => (
                      <th key={i} className="p-3 font-serif italic font-bold text-[#D4AF37] border-l border-[#222]">
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C1C1C] text-[#C4B9AD] font-sans">
                  {activeCategory === 'figures' && (
                    <>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Temporal Span / Era</td>
                        {activeFigures.map(f => (
                          <td key={f.id} className="p-3 font-mono text-white border-l border-[#1C1C1C]">{f.years} ({f.era})</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Sovereignty / Region</td>
                        {activeFigures.map(f => (
                          <td key={f.id} className="p-3 border-l border-[#1C1C1C]">{f.region}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Primary Role / Status</td>
                        {activeFigures.map(f => (
                          <td key={f.id} className="p-3 border-l border-[#1C1C1C] text-emerald-400 font-mono font-semibold">{f.role}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Core Paradigm / Ideology</td>
                        {activeFigures.map(f => (
                          <td key={f.id} className="p-3 border-l border-[#1C1C1C] text-xs leading-relaxed">{f.contributions[0] || f.achievements[0]}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Landmark Feat / Work</td>
                        {activeFigures.map(f => (
                          <td key={f.id} className="p-3 border-l border-[#1C1C1C] text-xs">{f.achievements.slice(0, 2).join(', ')}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Philosophical Decree / Quote</td>
                        {activeFigures.map(f => (
                          <td key={f.id} className="p-3 border-l border-[#1C1C1C] italic font-serif text-[11px] text-[#A09890]">
                            {f.quote ? `"${f.quote}"` : 'Empirical legacy through deeds and institutional reform.'}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {activeCategory === 'countries' && (
                    <>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Geographical Core</td>
                        {activeCountries.map(c => (
                          <td key={c.id} className="p-3 border-l border-[#1C1C1C] text-white font-mono">{c.continent} ({c.geography.slice(0, 45)}...)</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Official Language</td>
                        {activeCountries.map(c => (
                          <td key={c.id} className="p-3 border-l border-[#1C1C1C] font-mono">{c.language}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Governance & Culture</td>
                        {activeCountries.map(c => (
                          <td key={c.id} className="p-3 border-l border-[#1C1C1C] leading-relaxed">{c.culture.slice(0, 90)}...</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Civilizational Inventions</td>
                        {activeCountries.map(c => (
                          <td key={c.id} className="p-3 border-l border-[#1C1C1C] text-emerald-300">{c.achievements.slice(0, 2).join(', ')}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Revolutionary Transition</td>
                        {activeCountries.map(c => (
                          <td key={c.id} className="p-3 border-l border-[#1C1C1C] text-xs">{c.revolution}</td>
                        ))}
                      </tr>
                    </>
                  )}

                  {activeCategory === 'events' && (
                    <>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Exact Date & Era</td>
                        {activeEvents.map(e => (
                          <td key={e.id} className="p-3 border-l border-[#1C1C1C] font-mono text-white">{e.date} ({e.era})</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Event Classification</td>
                        {activeEvents.map(e => (
                          <td key={e.id} className="p-3 border-l border-[#1C1C1C] text-red-400 font-mono">{e.category || 'Epoch Conflict'}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Key Belligerents</td>
                        {activeEvents.map(e => (
                          <td key={e.id} className="p-3 border-l border-[#1C1C1C]">{e.participants.join(', ')}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[10px] text-[#7A7065] uppercase">Core Cause & Description</td>
                        {activeEvents.map(e => (
                          <td key={e.id} className="p-3 border-l border-[#1C1C1C] leading-relaxed">{e.description}</td>
                        ))}
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CHRONOLOGICAL TIMELINES */}
      {activeView === 'timelines' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-4 bg-[#0A0A0A] rounded-xl border border-[#222] space-y-4 text-left">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#222]">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Chronological Continuum Alignment
                </h4>
                <p className="text-[11px] text-[#A09890] mt-0.5 font-sans">
                  Visual comparison of when each entity existed on the grand timeline of human history.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                Sequenced Oldest to Newest
              </span>
            </div>

            {/* Visual Timeline Bars */}
            <div className="space-y-6 pt-2">
              {activeCategory === 'figures' && activeFigures.map((fig, idx) => (
                <div key={fig.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif italic font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      {fig.name}
                    </span>
                    <span className="font-mono text-[#D4AF37] font-semibold">{fig.years}</span>
                  </div>
                  {/* Timeline Bar Graphic */}
                  <div className="w-full bg-[#151515] h-3 rounded-full border border-[#2A2A2A] overflow-hidden relative">
                    <div 
                      className="bg-gradient-to-r from-amber-600 to-[#D4AF37] h-full rounded-full"
                      style={{ 
                        width: `${Math.max(25, 100 - (idx * 20))}%`,
                        marginLeft: `${idx * 15}%` 
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#7A7065]">
                    <span>Origins & Formative Epoch</span>
                    <span>Zenith & Sovereign Reign</span>
                    <span>Decline & Succession</span>
                  </div>
                </div>
              ))}

              {activeCategory === 'countries' && activeCountries.map((cnt, idx) => (
                <div key={cnt.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif italic font-bold text-white flex items-center gap-2">
                      <span className="text-base">{cnt.flag || '🏛️'}</span>
                      {cnt.name}
                    </span>
                    <span className="font-mono text-[#D4AF37] font-semibold">{cnt.continent}</span>
                  </div>
                  <div className="w-full bg-[#151515] h-3 rounded-full border border-[#2A2A2A] overflow-hidden relative">
                    <div 
                      className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full"
                      style={{ 
                        width: `${Math.max(30, 90 - (idx * 20))}%`,
                        marginLeft: `${idx * 10}%` 
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#7A7065]">
                    <span>Archaic / Tribal Foundations</span>
                    <span>Imperial Hegemony Zenith</span>
                    <span>Fragmentation / Modern Statehood</span>
                  </div>
                </div>
              ))}

              {activeCategory === 'events' && activeEvents.map((ev, idx) => (
                <div key={ev.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif italic font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      {ev.title}
                    </span>
                    <span className="font-mono text-rose-400 font-semibold">{ev.date} ({ev.year})</span>
                  </div>
                  <div className="w-full bg-[#151515] h-3 rounded-full border border-[#2A2A2A] overflow-hidden relative">
                    <div 
                      className="bg-gradient-to-r from-rose-600 to-rose-400 h-full rounded-full"
                      style={{ 
                        width: '12%',
                        marginLeft: `${Math.min(85, Math.max(5, ((ev.year + 1000) / 3000) * 100))}%` 
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#7A7065]">
                    <span>Casus Belli / Spark</span>
                    <span>Climax & Mobilization</span>
                    <span>Treaty / Resolution</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sequential Milestone Progression */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Side-by-Side Milestone Progression Arc
            </h4>

            <div className={`grid grid-cols-1 md:grid-cols-2 ${selectedIds.length >= 3 ? 'lg:grid-cols-' + selectedIds.length : 'lg:grid-cols-2'} gap-4`}>
              {activeCategory === 'figures' && activeFigures.map(fig => (
                <div key={fig.id} className="p-4 bg-[#0A0A0A] rounded-xl border border-[#222] space-y-3">
                  <div className="font-serif italic font-bold text-white text-sm border-b border-[#222] pb-2 text-[#D4AF37]">
                    {fig.name}
                  </div>
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#7A7065] text-[10px] w-12 shrink-0">Phase 1:</span>
                      <div>
                        <strong className="text-white block text-xs">Rise to Prominence</strong>
                        <p className="text-[#A09890] text-[11px]">Formative years and ascension in {fig.region}.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#7A7065] text-[10px] w-12 shrink-0">Phase 2:</span>
                      <div>
                        <strong className="text-emerald-400 block text-xs">Historical Zenith</strong>
                        <p className="text-[#A09890] text-[11px]">{fig.contributions[0] || fig.achievements[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#7A7065] text-[10px] w-12 shrink-0">Phase 3:</span>
                      <div>
                        <strong className="text-amber-400 block text-xs">Enduring Paradigm</strong>
                        <p className="text-[#A09890] text-[11px]">{fig.legacy}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {activeCategory === 'countries' && activeCountries.map(cnt => (
                <div key={cnt.id} className="p-4 bg-[#0A0A0A] rounded-xl border border-[#222] space-y-3">
                  <div className="font-serif italic font-bold text-white text-sm border-b border-[#222] pb-2 text-[#D4AF37]">
                    {cnt.name}
                  </div>
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#7A7065] text-[10px] w-12 shrink-0">Phase 1:</span>
                      <div>
                        <strong className="text-white block text-xs">Foundational State</strong>
                        <p className="text-[#A09890] text-[11px]">{cnt.geography}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#7A7065] text-[10px] w-12 shrink-0">Phase 2:</span>
                      <div>
                        <strong className="text-emerald-400 block text-xs">Apex Civilization</strong>
                        <p className="text-[#A09890] text-[11px]">{cnt.achievements[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#7A7065] text-[10px] w-12 shrink-0">Phase 3:</span>
                      <div>
                        <strong className="text-amber-400 block text-xs">Crucible & Revolution</strong>
                        <p className="text-[#A09890] text-[11px]">{cnt.revolution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {activeCategory === 'events' && activeEvents.map(ev => (
                <div key={ev.id} className="p-4 bg-[#0A0A0A] rounded-xl border border-[#222] space-y-3">
                  <div className="font-serif italic font-bold text-white text-sm border-b border-[#222] pb-2 text-rose-400">
                    {ev.title}
                  </div>
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#7A7065] text-[10px] w-12 shrink-0">Pre-Event:</span>
                      <div>
                        <strong className="text-white block text-xs">Underlying Causes</strong>
                        <p className="text-[#A09890] text-[11px]">{ev.description.slice(0, 100)}...</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#7A7065] text-[10px] w-12 shrink-0">Climax:</span>
                      <div>
                        <strong className="text-rose-400 block text-xs">Turning Point ({ev.date})</strong>
                        <p className="text-[#A09890] text-[11px]">Primary actors: {ev.participants.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[#7A7065] text-[10px] w-12 shrink-0">Legacy:</span>
                      <div>
                        <strong className="text-amber-400 block text-xs">Geopolitical Shockwave</strong>
                        <p className="text-[#A09890] text-[11px]">{ev.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: IMPACTS & CIVILIZATIONAL LEGACY */}
      {activeView === 'impacts' && (
        <div className="space-y-6 animate-fade-in text-left">
          {/* Side-by-Side Impact Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-2 ${selectedIds.length >= 3 ? 'lg:grid-cols-' + selectedIds.length : 'lg:grid-cols-2'} gap-6`}>
            {activeCategory === 'figures' && activeFigures.map(fig => (
              <div key={fig.id} className="bg-[#0B0B0B] border border-[#2A2A2A] rounded-2xl p-5 space-y-4">
                <div className="border-b border-[#222] pb-3">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">{fig.role}</span>
                  <h4 className="font-serif italic font-bold text-lg text-white">{fig.name}</h4>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Immediate Impact */}
                  <div className="p-3 bg-[#0F0F0F] rounded-xl border border-[#1E1E1E] space-y-1">
                    <span className="text-[9px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" /> Immediate Epoch Impact
                    </span>
                    <p className="text-[#C4B9AD] leading-relaxed font-sans">
                      {fig.contributions.slice(0, 2).join('. ')}. Directly transformed administrative, philosophical, or military doctrine across {fig.region}.
                    </p>
                  </div>

                  {/* Long-Term Civilizational Legacy */}
                  <div className="p-3 bg-amber-950/15 rounded-xl border border-amber-900/40 space-y-1">
                    <span className="text-[9px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1">
                      <Landmark className="w-3.5 h-3.5" /> Long-Term Civilizational Footprint
                    </span>
                    <p className="text-[#C4B9AD] leading-relaxed font-sans">
                      {fig.legacy}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {activeCategory === 'countries' && activeCountries.map(cnt => (
              <div key={cnt.id} className="bg-[#0B0B0B] border border-[#2A2A2A] rounded-2xl p-5 space-y-4">
                <div className="border-b border-[#222] pb-3">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">{cnt.continent}</span>
                  <h4 className="font-serif italic font-bold text-lg text-white">{cnt.name}</h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#0F0F0F] rounded-xl border border-[#1E1E1E] space-y-1">
                    <span className="text-[9px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" /> Regional Hegemony & Conquest
                    </span>
                    <p className="text-[#C4B9AD] leading-relaxed font-sans">
                      {cnt.worldImpact || cnt.revolution}
                    </p>
                  </div>

                  <div className="p-3 bg-amber-950/15 rounded-xl border border-amber-900/40 space-y-1">
                    <span className="text-[9px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1">
                      <Landmark className="w-3.5 h-3.5" /> Institutional & Cultural Heritage
                    </span>
                    <p className="text-[#C4B9AD] leading-relaxed font-sans">
                      Pioneered enduring breakthroughs: {cnt.achievements.join(', ')}.
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {activeCategory === 'events' && activeEvents.map(ev => (
              <div key={ev.id} className="bg-[#0B0B0B] border border-[#2A2A2A] rounded-2xl p-5 space-y-4">
                <div className="border-b border-[#222] pb-3">
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">{ev.era} Epoch</span>
                  <h4 className="font-serif italic font-bold text-base text-white">{ev.title}</h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#0F0F0F] rounded-xl border border-[#1E1E1E] space-y-1">
                    <span className="text-[9px] font-mono uppercase text-rose-400 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Immediate Destabilization / Shift
                    </span>
                    <p className="text-[#C4B9AD] leading-relaxed font-sans">
                      Direct confrontation involving {ev.participants.join(', ')}, precipitating immediate realignment across regional borders.
                    </p>
                  </div>

                  <div className="p-3 bg-amber-950/15 rounded-xl border border-amber-900/40 space-y-1">
                    <span className="text-[9px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1">
                      <Landmark className="w-3.5 h-3.5" /> Long-Term Geopolitical Order
                    </span>
                    <p className="text-[#C4B9AD] leading-relaxed font-sans">
                      {ev.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analytical Takeaways Dossier */}
          {compareAnalysis && (
            <div className="p-5 bg-[#0A0A0A] rounded-2xl border border-[#222] space-y-3">
              <h5 className="font-serif italic font-bold text-white text-sm text-[#D4AF37] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                Historiographical Conclusion
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-[#121212] border border-[#222] space-y-1">
                  <span className="text-[10px] font-mono text-[#7A7065] uppercase font-bold">Shared Structural Arc</span>
                  <p className="text-[#A09890] leading-relaxed font-sans">
                    Both subjects demonstrate how historical momentum accelerates through concentrated institutions, charismatic leadership, or crisis-driven revolution.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#121212] border border-[#222] space-y-1">
                  <span className="text-[10px] font-mono text-[#7A7065] uppercase font-bold">Divergent Trajectories</span>
                  <p className="text-[#A09890] leading-relaxed font-sans">
                    {compareAnalysis.keyDistinction}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Direct Inspection Detail Modal */}
      <SearchDetailModal
        isOpen={isDetailModalOpen}
        item={focusedDetailItem}
        onClose={() => {
          setIsDetailModalOpen(false);
          setFocusedDetailItem(null);
        }}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark || (() => {})}
        onAddNote={onAddNote || (() => {})}
        onAddToCompare={(id) => {
          addItemToCompare(id);
          setSaveSuccessMessage(`Added to comparison slots!`);
          setTimeout(() => setSaveSuccessMessage(null), 3000);
        }}
        isInCompare={focusedDetailItem?.data?.id ? selectedIds.includes(focusedDetailItem.data.id) : false}
        onPrev={currentDetailIndex > 0 ? handlePrevDetailDive : undefined}
        onNext={currentDetailIndex >= 0 && currentDetailIndex < availableItems.length - 1 ? handleNextDetailDive : undefined}
        currentIndex={currentDetailIndex >= 0 ? currentDetailIndex : undefined}
        totalCount={availableItems.length}
      />
    </div>
  );
}
