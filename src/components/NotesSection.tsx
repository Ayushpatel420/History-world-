import { useState, useMemo, useRef } from 'react';
import {
  FileEdit, Search, Trash2, Copy, Check, Plus, Landmark, Flag,
  History, FileText, BookOpen, User, ExternalLink, Bookmark as BookmarkIcon,
  FileDown, Loader2, Download, Tag, X, Sparkles, SlidersHorizontal,
  Link2, ChevronDown, ChevronUp, RotateCcw
} from 'lucide-react';
import { UserNote, Bookmark } from '../types';
import { exportNotesToPDF, exportSingleNoteToPDF, exportBookmarksToPDF } from '../utils/pdfExport';
import {
  PRESET_HISTORICAL_FIGURES,
  PRESET_HISTORICAL_EVENTS,
  PRESET_COUNTRIES,
  PRESET_ARTICLES,
  HistoricalEntityOption
} from '../data/historicalEntities';

interface NotesSectionProps {
  notes: UserNote[];
  onAddNote: (
    title: string,
    content: string,
    type: UserNote['targetType'],
    targetId?: string,
    tags?: string[],
    targetTitle?: string
  ) => void;
  onUpdateNote: (
    id: string,
    title: string,
    content: string,
    type: UserNote['targetType'],
    tags?: string[],
    targetId?: string,
    targetTitle?: string
  ) => void;
  onDeleteNote: (id: string) => void;
  bookmarks: Bookmark[];
  onToggleBookmark: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  onNavigateToBookmark: (type: Bookmark['type'], targetId: string) => void;
  onImportBackup?: (importedNotes: UserNote[], importedBookmarks: Bookmark[], mode: 'merge' | 'replace') => void;
}

export default function NotesSection({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  bookmarks,
  onToggleBookmark,
  onNavigateToBookmark,
}: NotesSectionProps) {
  const [subTab, setSubTab] = useState<'notes' | 'bookmarks'>('notes');

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newType, setNewType] = useState<UserNote['targetType']>('Figure');
  const [selectedEntityId, setSelectedEntityId] = useState<string>('napoleon');
  const [customEntityTitle, setCustomEntityTitle] = useState<string>('');
  const [isCustomEntity, setIsCustomEntity] = useState<boolean>(false);
  const [formTags, setFormTags] = useState<string[]>(['military-tactics', 'strategy', 'napoleon']);
  const [tagInputText, setTagInputText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title' | 'mostTags'>('newest');

  // Feedback State
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [pdfNotification, setPdfNotification] = useState<string | null>(null);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});

  const formRef = useRef<HTMLDivElement>(null);

  // Active presets based on selected association type
  const currentPresets: HistoricalEntityOption[] = useMemo(() => {
    switch (newType) {
      case 'Figure': return PRESET_HISTORICAL_FIGURES;
      case 'Event': return PRESET_HISTORICAL_EVENTS;
      case 'Country': return PRESET_COUNTRIES;
      case 'Article': return PRESET_ARTICLES;
      default: return [];
    }
  }, [newType]);

  // Contextual tag recommendations
  const recommendedTags = useMemo(() => {
    switch (newType) {
      case 'Figure':
        return ['biography', 'military-leader', 'philosophy', 'legacy', 'reformer', 'ruler'];
      case 'Event':
        return ['turning-point', 'military-tactics', 'treaty', 'revolution', 'chronology', 'causes'];
      case 'Country':
        return ['ancient-civilization', 'geopolitics', 'economy', 'culture', 'empire', 'antiquity'];
      case 'Article':
        return ['historiography', 'primary-sources', 'scholarship', 'in-depth', 'critique', 'analysis'];
      case 'Monarch':
        return ['dynasty', 'royal-decree', 'coronation', 'succession', 'sovereign'];
      default:
        return ['exam-prep', 'key-insight', 'scholarly-memo', 'timeline', 'favorite'];
    }
  }, [newType]);

  // Handle Type switch in form
  const handleTypeChange = (type: UserNote['targetType']) => {
    setNewType(type);
    setIsCustomEntity(false);
    setCustomEntityTitle('');

    let defaultEntity: HistoricalEntityOption | undefined;
    if (type === 'Figure') defaultEntity = PRESET_HISTORICAL_FIGURES[0];
    else if (type === 'Event') defaultEntity = PRESET_HISTORICAL_EVENTS[0];
    else if (type === 'Country') defaultEntity = PRESET_COUNTRIES[0];
    else if (type === 'Article') defaultEntity = PRESET_ARTICLES[0];

    if (defaultEntity) {
      setSelectedEntityId(defaultEntity.id);
      if (!editingNoteId) {
        setNewTitle(`Analysis: ${defaultEntity.name}`);
        setFormTags([...defaultEntity.defaultTags]);
      }
    } else {
      setSelectedEntityId('');
      if (!editingNoteId) {
        setNewTitle('');
        setFormTags(['history', 'research']);
      }
    }
  };

  // Handle Preset Entity select in form
  const handleEntitySelect = (entityId: string) => {
    if (entityId === '__custom__') {
      setIsCustomEntity(true);
      setSelectedEntityId('');
      setCustomEntityTitle('');
      return;
    }

    setIsCustomEntity(false);
    setSelectedEntityId(entityId);
    const found = currentPresets.find((p) => p.id === entityId);
    if (found) {
      setCustomEntityTitle(found.name);
      if (!editingNoteId || !newTitle.trim()) {
        if (newType === 'Figure') setNewTitle(`Analysis: ${found.name}`);
        else if (newType === 'Event') setNewTitle(`Milestone Dossier: ${found.name}`);
        else if (newType === 'Country') setNewTitle(`Civilization Study: ${found.name}`);
        else if (newType === 'Article') setNewTitle(`Critical Review: ${found.name}`);
      }
      // Merge default tags
      const merged = Array.from(new Set([...formTags, ...found.defaultTags]));
      setFormTags(merged);
    }
  };

  // Add tag to form
  const handleAddTag = (rawTag: string) => {
    const cleaned = rawTag.trim().toLowerCase().replace(/^#/, '').replace(/\s+/g, '-');
    if (cleaned && !formTags.includes(cleaned)) {
      setFormTags([...formTags, cleaned]);
    }
    setTagInputText('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormTags(formTags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    let targetTitle: string | undefined;
    let targetId: string | undefined;

    if (newType !== 'General') {
      if (isCustomEntity && customEntityTitle.trim()) {
        targetTitle = customEntityTitle.trim();
        targetId = `custom_${targetTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
      } else if (selectedEntityId) {
        const found = currentPresets.find((p) => p.id === selectedEntityId);
        targetTitle = found ? found.name : customEntityTitle.trim();
        targetId = selectedEntityId;
      }
    }

    const finalTags = formTags.length > 0 ? formTags : [newType.toLowerCase()];

    if (editingNoteId) {
      onUpdateNote(editingNoteId, newTitle.trim(), newContent.trim(), newType, finalTags, targetId, targetTitle);
      setEditingNoteId(null);
    } else {
      onAddNote(newTitle.trim(), newContent.trim(), newType, targetId, finalTags, targetTitle);
    }

    // Reset Form
    setNewTitle('');
    setNewContent('');
    setFormTags(['history']);
    setTagInputText('');
    setIsCustomEntity(false);
    setCustomEntityTitle('');
    setSelectedEntityId('');
  };

  const startEdit = (note: UserNote) => {
    setEditingNoteId(note.id);
    setNewTitle(note.title);
    setNewContent(note.content);
    setNewType(note.targetType);
    setFormTags(note.tags && note.tags.length > 0 ? note.tags : [note.targetType.toLowerCase()]);

    if (note.targetId) {
      const isPreset = currentPresets.some((p) => p.id === note.targetId);
      if (isPreset) {
        setSelectedEntityId(note.targetId);
        setIsCustomEntity(false);
      } else {
        setIsCustomEntity(true);
        setSelectedEntityId('');
        setCustomEntityTitle(note.targetTitle || '');
      }
    } else if (note.targetTitle) {
      setIsCustomEntity(true);
      setCustomEntityTitle(note.targetTitle);
    } else {
      setIsCustomEntity(false);
      setSelectedEntityId('');
    }

    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
    setNewTitle('');
    setNewContent('');
    setNewType('Figure');
    setFormTags(['history']);
    setIsCustomEntity(false);
    setCustomEntityTitle('');
    setSelectedEntityId('');
  };

  const handleCopyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadSingleNotePDF = (note: UserNote) => {
    try {
      exportSingleNoteToPDF(note);
    } catch (err) {
      console.error('Failed to export note to PDF:', err);
    }
  };

  const handleDownloadMarkdown = (note: UserNote) => {
    const tagsStr = note.tags && note.tags.length > 0 ? note.tags.map((t) => '#' + t).join(' ') : 'None';
    const entityStr = note.targetTitle ? `\nAssociated Entity: ${note.targetTitle} (${note.targetType})` : `\nCategory: ${note.targetType}`;
    const fileContent = `# Chronos Vault Study Note: ${note.title}\n${entityStr}\nTags: ${tagsStr}\nCreated: ${note.createdAt}${note.updatedAt ? `\nUpdated: ${note.updatedAt}` : ''}\n\n---\n\n${note.content}\n\n---\nDrafted in History Archive & Interactive Vaults.`;

    const blob = new Blob([fileContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${note.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_note.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Collect all unique tags and counts across all notes
  const allTagsWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    notes.forEach((n) => {
      if (Array.isArray(n.tags)) {
        n.tags.forEach((t) => {
          const clean = t.trim().toLowerCase().replace(/^#/, '');
          if (clean) {
            counts[clean] = (counts[clean] || 0) + 1;
          }
        });
      }
    });
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  }, [notes]);

  // Filtering and Sorting
  const filteredNotes = useMemo(() => {
    return notes
      .filter((n) => {
        // Tag Filter
        if (activeTagFilter) {
          const hasTag = n.tags && n.tags.some((t) => t.toLowerCase().replace(/^#/, '') === activeTagFilter.toLowerCase());
          if (!hasTag) return false;
        }

        // Category Filter
        if (categoryFilter !== 'All') {
          if (n.targetType.toLowerCase() !== categoryFilter.toLowerCase()) {
            return false;
          }
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const qNoHash = q.replace(/^#/, '');
          const matchesTitle = n.title.toLowerCase().includes(q);
          const matchesContent = n.content.toLowerCase().includes(q);
          const matchesType = n.targetType.toLowerCase().includes(q);
          const matchesEntity = n.targetTitle ? n.targetTitle.toLowerCase().includes(q) : false;
          const matchesTags = n.tags ? n.tags.some((t) => t.toLowerCase().includes(qNoHash)) : false;

          if (!matchesTitle && !matchesContent && !matchesType && !matchesEntity && !matchesTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.id > a.id ? 1 : -1);
        if (sortBy === 'oldest') return (a.id > b.id ? 1 : -1);
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'mostTags') return (b.tags?.length || 0) - (a.tags?.length || 0);
        return 0;
      });
  }, [notes, activeTagFilter, categoryFilter, searchQuery, sortBy]);

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter(
      (b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.subtitle && b.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        b.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [bookmarks, searchQuery]);

  const handleExportPDF = () => {
    setIsExportingPDF(true);
    try {
      if (subTab === 'notes') {
        const targetNotes = filteredNotes.length > 0 ? filteredNotes : notes;
        if (targetNotes.length === 0) return;
        exportNotesToPDF(targetNotes, bookmarks, {
          includeBookmarks: true,
          title: searchQuery || activeTagFilter
            ? `Historical Research Notes (Filtered)`
            : 'Historical Research Notes & Scholarly Dossier'
        });
        setPdfNotification(`Exported ${targetNotes.length} notes as PDF!`);
      } else {
        const targetBookmarks = filteredBookmarks.length > 0 ? filteredBookmarks : bookmarks;
        if (targetBookmarks.length === 0) return;
        exportBookmarksToPDF(targetBookmarks);
        setPdfNotification(`Exported ${targetBookmarks.length} bookmarks as PDF!`);
      }
      setTimeout(() => setPdfNotification(null), 3500);
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setTimeout(() => setIsExportingPDF(false), 500);
    }
  };

  const getCategoryTheme = (type: UserNote['targetType']) => {
    switch (type) {
      case 'Figure':
        return {
          icon: <User className="w-3.5 h-3.5 text-emerald-400" />,
          label: 'Historical Figure',
          badgeClass: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50'
        };
      case 'Event':
        return {
          icon: <History className="w-3.5 h-3.5 text-amber-400" />,
          label: 'Historical Event',
          badgeClass: 'text-amber-400 bg-amber-950/40 border-amber-800/50'
        };
      case 'Country':
        return {
          icon: <Flag className="w-3.5 h-3.5 text-sky-400" />,
          label: 'Country / Civilization',
          badgeClass: 'text-sky-400 bg-sky-950/40 border-sky-800/50'
        };
      case 'Article':
        return {
          icon: <BookOpen className="w-3.5 h-3.5 text-purple-400" />,
          label: 'Historical Article',
          badgeClass: 'text-purple-400 bg-purple-950/40 border-purple-800/50'
        };
      case 'Monarch':
        return {
          icon: <Landmark className="w-3.5 h-3.5 text-[#D4AF37]" />,
          label: 'Monarch / Ruler',
          badgeClass: 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30'
        };
      default:
        return {
          icon: <FileText className="w-3.5 h-3.5 text-[#A09890]" />,
          label: 'General Essay',
          badgeClass: 'text-[#A09890] bg-[#1A1A1A] border-[#333]'
        };
    }
  };

  const getBookmarkIcon = (type: Bookmark['type']) => {
    switch (type) {
      case 'country': return <Flag className="w-4 h-4 text-sky-400" />;
      case 'ruler': return <Landmark className="w-4 h-4 text-yellow-500" />;
      case 'figure': return <User className="w-4 h-4 text-emerald-400" />;
      case 'event': return <History className="w-4 h-4 text-[#D4AF37]" />;
      case 'article': return <BookOpen className="w-4 h-4 text-rose-400" />;
      default: return <BookmarkIcon className="w-4 h-4 text-[#A09890]" />;
    }
  };

  const toggleNoteExpanded = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveTagFilter(null);
    setCategoryFilter('All');
  };

  const hasActiveFilters = Boolean(searchQuery.trim() || activeTagFilter || categoryFilter !== 'All');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
      {/* 1. LEFT COLUMN: Note Creation & Association Form (4 cols on lg) */}
      <div ref={formRef} className="lg:col-span-4">
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-5 space-y-4 text-left sticky top-24">
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
            <div className="flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="font-serif italic font-bold text-[#D4AF37] text-base tracking-tight">
                {editingNoteId ? 'Edit Personal Note' : 'Create Personal Note'}
              </h4>
            </div>
            {editingNoteId && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded font-bold">
                Editing
              </span>
            )}
          </div>

          <p className="text-xs text-[#A09890] leading-relaxed font-sans">
            Write structured study notes associated with specific historical figures, epoch events, countries, or articles, and tag them for quick retrieval.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-left">
            {/* 1. Association Target Type */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#A09890] uppercase tracking-wider font-mono font-bold flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Association Category</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { type: 'Figure' as const, label: '👤 Figure' },
                  { type: 'Event' as const, label: '⏳ Event' },
                  { type: 'Country' as const, label: '🗺️ Country' },
                  { type: 'Article' as const, label: '📖 Article' },
                  { type: 'Monarch' as const, label: '👑 Monarch' },
                  { type: 'General' as const, label: '📚 General' },
                ].map(({ type, label }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeChange(type)}
                    className={`py-2 px-2.5 text-xs font-semibold rounded-lg border text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                      newType === type
                        ? 'bg-[#1C1811] text-[#D4AF37] border-[#D4AF37]'
                        : 'bg-[#0A0A0A] text-[#A09890] border-[#222] hover:border-[#333] hover:text-[#E0D8D0]'
                    }`}
                  >
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Specific Associated Entity Picker (if not General) */}
            {newType !== 'General' && (
              <div className="space-y-1.5 bg-[#080808] p-3 rounded-xl border border-[#202020]">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono font-bold">
                    Associated {newType}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomEntity(!isCustomEntity);
                      if (!isCustomEntity) {
                        setSelectedEntityId('');
                      } else if (currentPresets.length > 0) {
                        handleEntitySelect(currentPresets[0].id);
                      }
                    }}
                    className="text-[9px] font-mono text-[#A09890] hover:text-[#D4AF37] underline cursor-pointer"
                  >
                    {isCustomEntity ? '← Pick from catalog' : '✍️ Type custom entity'}
                  </button>
                </div>

                {!isCustomEntity && currentPresets.length > 0 ? (
                  <select
                    value={selectedEntityId}
                    onChange={(e) => handleEntitySelect(e.target.value)}
                    className="w-full p-2 text-xs bg-[#0F0F0F] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    {currentPresets.map((ent) => (
                      <option key={ent.id} value={ent.id}>
                        {ent.name} {ent.era ? `(${ent.era})` : ''}
                      </option>
                    ))}
                    <option value="__custom__">+ Custom {newType} name...</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    required
                    value={customEntityTitle}
                    onChange={(e) => setCustomEntityTitle(e.target.value)}
                    placeholder={`e.g. ${newType === 'Figure' ? 'Socrates, Joan of Arc...' : newType === 'Event' ? 'Signing of Magna Carta...' : newType === 'Country' ? 'Ancient Greece, Persia...' : 'The Silk Road Treatise...'}`}
                    className="w-full p-2 text-xs bg-[#0F0F0F] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                )}
              </div>
            )}

            {/* 3. Note Title */}
            <div className="space-y-1">
              <label className="text-[10px] text-[#A09890] uppercase tracking-wider font-mono font-bold">Note Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Grand Tactics & Logistics of Cannae"
                className="w-full p-2.5 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
              />
            </div>

            {/* 4. Tags Manager */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-[#A09890] uppercase tracking-wider font-mono font-bold flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#D4AF37]" />
                  <span>Topic Tags</span>
                </label>
                <span className="text-[9px] font-mono text-[#A09890]">Type + Enter or comma</span>
              </div>

              {/* Tag Badges Container */}
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg min-h-[38px]">
                {formTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1A1812] border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono font-semibold"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-[#A09890] hover:text-rose-400 cursor-pointer ml-0.5"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInputText}
                  onChange={(e) => setTagInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      handleAddTag(tagInputText);
                    }
                  }}
                  placeholder={formTags.length === 0 ? "Add tag (e.g. tactics, bio)..." : "+ tag"}
                  className="bg-transparent text-xs text-[#E0D8D0] focus:outline-none font-mono min-w-[70px] flex-1 px-1 py-0.5"
                />
              </div>

              {/* Suggested Tag Chips */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-[#A09890] flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" /> Quick tag suggestions:
                </span>
                <div className="flex flex-wrap gap-1">
                  {recommendedTags
                    .filter((t) => !formTags.includes(t))
                    .slice(0, 5)
                    .map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleAddTag(t)}
                        className="text-[9px] font-mono text-[#A09890] hover:text-[#D4AF37] bg-[#121212] px-1.5 py-0.5 rounded border border-[#242424] hover:border-[#D4AF37]/40 transition-colors cursor-pointer"
                      >
                        +{t}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* 5. Note Content */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] text-[#A09890] uppercase tracking-wider font-mono font-bold">Research Content</label>
              <textarea
                required
                value={newContent}
                rows={6}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Document your scholarly analysis, primary source quotes, strategic critiques, or key historical takeaways here..."
                className="w-full p-2.5 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] font-sans leading-relaxed resize-none"
              ></textarea>
            </div>

            {/* Submit / Cancel Buttons */}
            {editingNoteId ? (
              <div className="flex gap-2.5 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-lg"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Update Note</span>
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 py-2.5 bg-[#1F1F1F] text-[#A09890] hover:text-white border border-[#2A2A2A] text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Cancel</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#D4AF37] text-black hover:bg-[#b89528] font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Note to Vault</span>
                </button>

                {notes.length > 0 && (
                  <button
                    type="button"
                    onClick={handleExportPDF}
                    disabled={isExportingPDF}
                    className="w-full py-2 bg-[#151515] hover:bg-[#1C1811] text-[#D4AF37] border border-[#2A2A2A] hover:border-[#D4AF37]/50 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    title="Export all saved notes as PDF for offline study"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download All Notes as PDF ({notes.length})</span>
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* 2. RIGHT COLUMN: Saved Notes Section (8 cols on lg) */}
      <div className="lg:col-span-8 space-y-4 text-left">
        {/* Toggle between Notes and Bookmarks */}
        <div className="flex bg-[#0F0F0F] border border-[#2A2A2A] p-1 rounded-xl">
          <button
            onClick={() => setSubTab('notes')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              subTab === 'notes'
                ? 'bg-[#1C1C1E] text-[#D4AF37] border border-[#2A2A22]'
                : 'text-[#A09890] hover:text-[#D4AF37]'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Saved Personal Notes ({notes.length})</span>
          </button>
          <button
            onClick={() => setSubTab('bookmarks')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              subTab === 'bookmarks'
                ? 'bg-[#1C1C1E] text-[#D4AF37] border border-[#2A2A22]'
                : 'text-[#A09890] hover:text-[#D4AF37]'
            }`}
          >
            <BookmarkIcon className="w-3.5 h-3.5" />
            <span>Saved Bookmarks ({bookmarks.length})</span>
          </button>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-4 space-y-3.5 text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#A09890]" />
              <input
                type="text"
                placeholder={subTab === 'notes' ? "Search notes by title, tag, figure, event, country..." : "Search bookmarks..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-[#A09890] hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown & PDF Export */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              {subTab === 'notes' && (
                <div className="flex items-center gap-1.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl px-2.5 py-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#A09890]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-[11px] font-mono text-[#D4AF37] focus:outline-none cursor-pointer"
                  >
                    <option value="newest" className="bg-[#121212]">Newest First</option>
                    <option value="oldest" className="bg-[#121212]">Oldest First</option>
                    <option value="title" className="bg-[#121212]">Title (A–Z)</option>
                    <option value="mostTags" className="bg-[#121212]">Most Tagged</option>
                  </select>
                </div>
              )}

              <button
                id="download-pdf-btn"
                onClick={handleExportPDF}
                disabled={isExportingPDF || (subTab === 'notes' ? (filteredNotes.length === 0 && notes.length === 0) : (filteredBookmarks.length === 0 && bookmarks.length === 0))}
                className="px-3 py-2 bg-[#D4AF37] hover:bg-[#c49f2e] disabled:opacity-40 disabled:hover:bg-[#D4AF37] disabled:cursor-not-allowed text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                title={subTab === 'notes' ? "Download current notes as PDF dossier" : "Download bookmarks index as PDF"}
              >
                {isExportingPDF ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>PDF...</span>
                  </>
                ) : (
                  <>
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Association Category Tabs (for Notes) */}
          {subTab === 'notes' && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#1C1C1C]">
              {[
                { key: 'All', label: 'All Notes', count: notes.length },
                { key: 'Figure', label: '👤 Figures', count: notes.filter((n) => n.targetType === 'Figure').length },
                { key: 'Event', label: '⏳ Events', count: notes.filter((n) => n.targetType === 'Event').length },
                { key: 'Country', label: '🗺️ Countries', count: notes.filter((n) => n.targetType === 'Country').length },
                { key: 'Article', label: '📖 Articles', count: notes.filter((n) => n.targetType === 'Article').length },
                { key: 'Monarch', label: '👑 Monarchs', count: notes.filter((n) => n.targetType === 'Monarch').length },
                { key: 'General', label: '📚 General', count: notes.filter((n) => n.targetType === 'General').length },
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                    categoryFilter === key
                      ? 'bg-[#1C1811] text-[#D4AF37] border-[#D4AF37] font-bold'
                      : 'bg-[#0A0A0A] text-[#A09890] border-[#222] hover:border-[#333]'
                  }`}
                >
                  <span>{label}</span>
                  <span className="text-[9px] opacity-70">({count})</span>
                </button>
              ))}
            </div>
          )}

          {/* Interactive Tag Filter Bar (Tag Cloud Pills) */}
          {subTab === 'notes' && allTagsWithCounts.length > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-[#1C1C1C]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A09890] flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#D4AF37]" />
                  <span>Filter by Tag ({allTagsWithCounts.length} active tags)</span>
                </span>
                {activeTagFilter && (
                  <button
                    onClick={() => setActiveTagFilter(null)}
                    className="text-[9px] font-mono text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Clear tag filter</span>
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto pr-1">
                <button
                  onClick={() => setActiveTagFilter(null)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                    !activeTagFilter
                      ? 'bg-[#D4AF37] text-black font-bold'
                      : 'bg-[#141414] text-[#A09890] hover:text-[#E0D8D0] border border-[#242424]'
                  }`}
                >
                  All Tags
                </button>
                {allTagsWithCounts.map(({ tag, count }) => {
                  const isActive = activeTagFilter === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveTagFilter(isActive ? null : tag)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all flex items-center gap-1 cursor-pointer ${
                        isActive
                          ? 'bg-[#D4AF37] text-black font-bold shadow-sm'
                          : 'bg-[#141414] text-[#A09890] hover:text-[#D4AF37] border border-[#242424] hover:border-[#D4AF37]/40'
                      }`}
                    >
                      <span>#{tag}</span>
                      <span className={`text-[9px] ${isActive ? 'text-black/80 font-bold' : 'text-[#666]'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Filter Indicators & Reset */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-1 border-t border-[#1C1C1C] text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-[#A09890] font-sans">
                  Showing <strong className="text-[#D4AF37]">{filteredNotes.length}</strong> of {notes.length} notes
                </span>
                {activeTagFilter && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1">
                    Tag: #{activeTagFilter}
                    <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setActiveTagFilter(null)} />
                  </span>
                )}
                {categoryFilter !== 'All' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/40 text-sky-400 border border-sky-800/40 flex items-center gap-1">
                    Category: {categoryFilter}
                    <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setCategoryFilter('All')} />
                  </span>
                )}
                {searchQuery && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1F1F1F] text-white border border-[#333] flex items-center gap-1">
                    Query: "{searchQuery}"
                    <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSearchQuery('')} />
                  </span>
                )}
              </div>
              <button
                onClick={clearAllFilters}
                className="text-[10px] font-mono text-[#A09890] hover:text-[#D4AF37] flex items-center gap-1 cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* PDF Export confirmation feedback */}
        {pdfNotification && (
          <div className="bg-[#1C1811] border border-[#D4AF37]/40 text-[#D4AF37] p-2.5 rounded-xl text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{pdfNotification}</span>
            </div>
            <span className="text-[10px] font-mono text-[#A09890] hidden sm:inline">Saved for offline research</span>
          </div>
        )}

        {/* Notes Grid */}
        {subTab === 'notes' ? (
          filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {filteredNotes.map((note) => {
                const theme = getCategoryTheme(note.targetType);
                const isExpanded = expandedNotes[note.id] || false;
                const isLongContent = note.content.length > 240;

                return (
                  <div
                    key={note.id}
                    className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all shadow-lg text-left group"
                  >
                    <div className="space-y-3 text-left">
                      {/* Card Header: Category & Date */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1.5 text-[9px] font-mono tracking-wider font-extrabold px-2 py-0.5 rounded border ${theme.badgeClass}`}>
                          {theme.icon}
                          {note.targetType}
                        </span>

                        <span className="text-[10px] text-[#A09890] font-mono">
                          {note.createdAt}
                        </span>
                      </div>

                      {/* Associated Entity Pill (if present) */}
                      {note.targetTitle && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#161616] border border-[#282828] text-[10px] font-mono text-[#E0D8D0]">
                          <Link2 className="w-3 h-3 text-[#D4AF37]" />
                          <span className="text-[#A09890]">Linked:</span>
                          <strong className="text-[#E0D8D0] font-semibold">{note.targetTitle}</strong>
                        </div>
                      )}

                      {/* Title */}
                      <h5 className="font-serif italic font-bold text-white tracking-normal text-base sm:text-lg leading-snug group-hover:text-[#D4AF37] transition-colors">
                        {note.title}
                      </h5>

                      {/* Tags Badges */}
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 pt-0.5">
                          {note.tags.map((t) => {
                            const isCurrentTagFilter = activeTagFilter === t;
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setActiveTagFilter(isCurrentTagFilter ? null : t)}
                                className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-all cursor-pointer ${
                                  isCurrentTagFilter
                                    ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                                    : 'bg-[#151515] text-[#D4AF37]/90 hover:text-[#D4AF37] border-[#2A2A2A] hover:border-[#D4AF37]/50'
                                }`}
                                title={`Filter notes by tag #${t}`}
                              >
                                #{t}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Content with Read More toggle */}
                      <div className="text-xs text-[#A09890] leading-relaxed font-sans whitespace-pre-wrap">
                        <p className={!isExpanded && isLongContent ? 'line-clamp-4' : ''}>
                          {note.content}
                        </p>
                        {isLongContent && (
                          <button
                            type="button"
                            onClick={() => toggleNoteExpanded(note.id)}
                            className="mt-1 text-[10px] font-mono text-[#D4AF37] hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            {isExpanded ? (
                              <>
                                <span>Show Less</span>
                                <ChevronUp className="w-3 h-3" />
                              </>
                            ) : (
                              <>
                                <span>Read Full Note</span>
                                <ChevronDown className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Foot Card Action Commands */}
                    <div className="mt-5 pt-3.5 border-t border-[#1C1C1C] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopyToClipboard(note.id, note.content)}
                          className="p-1.5 bg-[#151515] hover:bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#D4AF37] transition-all cursor-pointer"
                          title="Copy text to clipboard"
                        >
                          {copiedId === note.id ? <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleDownloadSingleNotePDF(note)}
                          className="px-2 py-1.5 bg-[#1C1811] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/50 rounded text-[#D4AF37] transition-all cursor-pointer flex items-center gap-1 font-bold"
                          title="Export single note as PDF"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-mono">PDF</span>
                        </button>
                        <button
                          onClick={() => handleDownloadMarkdown(note)}
                          className="p-1.5 bg-[#151515] hover:bg-[#1E1E1E] border border-[#2A2A2A] rounded text-[#A09890] hover:text-[#D4AF37] transition-all cursor-pointer"
                          title="Download as Markdown (.md)"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(note)}
                          className={`p-1.5 border rounded flex items-center gap-1 transition-all cursor-pointer ${
                            editingNoteId === note.id
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-bold'
                              : 'bg-[#151515] hover:bg-[#1E1E1E] border-[#2A2A2A] text-[#D4AF37]'
                          }`}
                          title="Edit Note"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Edit</span>
                        </button>
                        <button
                          onClick={() => onDeleteNote(note.id)}
                          className="p-1.5 hover:bg-[#240C0E] border border-transparent hover:border-rose-900/40 rounded text-rose-500 hover:text-rose-400 transition-colors flex items-center gap-1 font-bold cursor-pointer"
                          title="Delete Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#0F0F0F] border border-dashed border-[#2A2A2A] rounded-2xl p-12 text-center text-[#A09890] space-y-3">
              <p className="text-xs sm:text-sm font-sans leading-relaxed">
                {hasActiveFilters
                  ? "No notes matched your search query or tag filter."
                  : "No notes archived yet. Use the notebook on the left to write your first personal note!"}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="px-3.5 py-1.5 bg-[#D4AF37] text-black font-bold text-xs rounded-lg hover:bg-[#c49f2e] transition-colors cursor-pointer"
                >
                  Clear Search & Filters
                </button>
              )}
            </div>
          )
        ) : (
          /* Bookmarks Section */
          filteredBookmarks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {filteredBookmarks.map((bk) => (
                <div
                  key={bk.id}
                  className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all shadow-lg text-left"
                >
                  <div className="space-y-2.5 text-left">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[9px] font-mono tracking-wider font-extrabold text-[#D4AF37] bg-[#151515] border border-[#2A2A2A] px-2.5 py-0.5 rounded capitalize">
                        {getBookmarkIcon(bk.type)}
                        {bk.type}
                      </span>
                      <span className="text-[10px] text-[#A09890] font-mono">
                        Saved {bk.bookmarkedAt}
                      </span>
                    </div>

                    <h5 className="font-serif italic font-bold text-white tracking-normal text-base sm:text-lg">
                      {bk.title}
                    </h5>

                    {bk.subtitle && (
                      <p className="text-xs text-[#A09890] italic font-sans leading-relaxed">
                        {bk.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#1C1C1C] flex items-center justify-between text-xs">
                    <button
                      onClick={() => onNavigateToBookmark(bk.type, bk.targetId)}
                      className="px-3.5 py-1.5 bg-[#151515] hover:bg-[#D4AF37] border border-[#2A2A2A] hover:border-[#D4AF37] rounded-lg text-[#D4AF37] hover:text-black transition-all flex items-center gap-1.5 font-bold cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Learn More</span>
                    </button>

                    <button
                      onClick={() => onToggleBookmark(bk.targetId, bk.type, bk.title)}
                      className="p-1.5 hover:bg-[#240C0E] border border-transparent hover:border-rose-900/40 rounded text-rose-500 hover:text-rose-400 transition-colors flex items-center gap-1 font-bold cursor-pointer"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0F0F0F] border border-dashed border-[#2A2A2A] rounded-2xl p-12 text-center text-[#A09890]">
              <p className="text-xs sm:text-sm font-sans leading-relaxed">
                No bookmarked items found. Bookmark rulers, articles, figures, events, and countries as you study, then use this section to jump back to them in one click!
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
