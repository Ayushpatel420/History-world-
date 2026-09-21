import { useState, useMemo } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Bookmark as BookmarkIcon, 
  CheckCircle2, 
  Clock, 
  Play, 
  Sliders, 
  FileText, 
  Layers, 
  Trash2, 
  ExternalLink,
  PlusCircle,
  HelpCircle,
  Trophy,
  RefreshCw,
  Info
} from 'lucide-react';
import { UserNote, Bookmark, Quiz } from '../types';
import { 
  generatePersonalizedQuiz, 
  PersonalizedQuizConfig, 
  SAMPLE_STUDY_NOTES, 
  SAMPLE_BOOKMARKS 
} from '../utils/personalizedQuizGenerator';

interface CreateYourOwnQuizViewProps {
  notes?: UserNote[];
  bookmarks?: Bookmark[];
  onStartQuiz: (quiz: Quiz) => void;
  onNavigateToTab?: (tab: any) => void;
}

export default function CreateYourOwnQuizView({
  notes = [],
  bookmarks = [],
  onStartQuiz,
  onNavigateToTab
}: CreateYourOwnQuizViewProps) {
  // Local state for sample items if the user adds them
  const [injectedSampleNotes, setInjectedSampleNotes] = useState<UserNote[]>([]);
  const [injectedSampleBookmarks, setInjectedSampleBookmarks] = useState<Bookmark[]>([]);

  // Combined notes and bookmarks
  const allNotes = useMemo(() => [...notes, ...injectedSampleNotes], [notes, injectedSampleNotes]);
  const allBookmarks = useMemo(() => [...bookmarks, ...injectedSampleBookmarks], [bookmarks, injectedSampleBookmarks]);

  // Configuration Form State
  const [sourceType, setSourceType] = useState<'all' | 'notes_only' | 'bookmarks_only' | 'custom_selection'>('all');
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
  const [selectedBookmarkIds, setSelectedBookmarkIds] = useState<string[]>([]);
  const [quizTitle, setQuizTitle] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [format, setFormat] = useState<'mixed' | 'mcq' | 'tf'>('mixed');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationFeedback, setGenerationFeedback] = useState<string | null>(null);

  // Saved Personalized Quizzes in localStorage
  const [savedPersonalizedQuizzes, setSavedPersonalizedQuizzes] = useState<Quiz[]>(() => {
    try {
      const saved = localStorage.getItem('history_coliseum_my_generated_quizzes_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Handle Load Sample Lore
  const handleLoadSamples = () => {
    setInjectedSampleNotes(SAMPLE_STUDY_NOTES);
    setInjectedSampleBookmarks(SAMPLE_BOOKMARKS);
    setGenerationFeedback('Loaded 4 rich study notes and 3 historical bookmarks for testing!');
    setTimeout(() => setGenerationFeedback(null), 3500);
  };

  // Toggle selection for specific items
  const toggleNoteSelection = (id: string) => {
    setSelectedNoteIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleBookmarkSelection = (id: string) => {
    setSelectedBookmarkIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedNoteIds(allNotes.map(n => n.id));
    setSelectedBookmarkIds(allBookmarks.map(b => b.id));
  };

  const handleClearSelection = () => {
    setSelectedNoteIds([]);
    setSelectedBookmarkIds([]);
  };

  // Generate Quiz
  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationFeedback(null);

    setTimeout(() => {
      try {
        const config: PersonalizedQuizConfig = {
          title: quizTitle.trim() || undefined,
          difficulty,
          format,
          questionCount,
          sourceType,
          selectedNoteIds: sourceType === 'custom_selection' ? selectedNoteIds : undefined,
          selectedBookmarkIds: sourceType === 'custom_selection' ? selectedBookmarkIds : undefined,
        };

        const generatedQuiz = generatePersonalizedQuiz(allNotes, allBookmarks, config);

        // Save to local collection of personalized quizzes
        const updated = [generatedQuiz, ...savedPersonalizedQuizzes.filter(q => q.id !== generatedQuiz.id)].slice(0, 15);
        setSavedPersonalizedQuizzes(updated);
        try {
          localStorage.setItem('history_coliseum_my_generated_quizzes_v1', JSON.stringify(updated));
        } catch (e) {
          console.warn('Could not save to localStorage', e);
        }

        setIsGenerating(false);
        onStartQuiz(generatedQuiz);
      } catch (err: any) {
        setIsGenerating(false);
        setGenerationFeedback(err.message || 'Failed to synthesize quiz.');
      }
    }, 450);
  };

  // Delete saved custom quiz
  const handleDeleteCustomQuiz = (quizId: string) => {
    const updated = savedPersonalizedQuizzes.filter(q => q.id !== quizId);
    setSavedPersonalizedQuizzes(updated);
    try {
      localStorage.setItem('history_coliseum_my_generated_quizzes_v1', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const effectiveAvailableCount = allNotes.length + allBookmarks.length;

  return (
    <div className="space-y-6 text-left" id="create-your-own-quiz-section">
      {/* Header Banner */}
      <div className="bg-[#0D0D0D] border border-[#262626] rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-xs font-mono font-bold text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>PERSONALIZED LEARNING ENGINE</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Create Your Own Quiz
          </h3>

          <p className="text-sm text-[#A09890] leading-relaxed max-w-3xl">
            Transform your personal research into an active recall trivia challenge. Our engine synthesizes tailored questions directly from your saved study notes, bookmarked emperors, battles, decrees, and speeches to reinforce what you have learned.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-3">
              <div className="text-[10px] font-mono text-[#8C827A] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                Saved Notes
              </div>
              <div className="text-lg font-bold text-white mt-1">
                {allNotes.length}
              </div>
            </div>

            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-3">
              <div className="text-[10px] font-mono text-[#8C827A] uppercase tracking-wider flex items-center gap-1.5">
                <BookmarkIcon className="w-3.5 h-3.5 text-amber-500" />
                Bookmarks
              </div>
              <div className="text-lg font-bold text-white mt-1">
                {allBookmarks.length}
              </div>
            </div>

            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-3">
              <div className="text-[10px] font-mono text-[#8C827A] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Total Lore Pool
              </div>
              <div className="text-lg font-bold text-emerald-400 mt-1">
                {effectiveAvailableCount}
              </div>
            </div>

            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-3">
              <div className="text-[10px] font-mono text-[#8C827A] uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-blue-400" />
                Generated Quizzes
              </div>
              <div className="text-lg font-bold text-blue-400 mt-1">
                {savedPersonalizedQuizzes.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notice if user has no notes or bookmarks */}
      {effectiveAvailableCount === 0 && (
        <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-200">No Research Notes or Bookmarks Yet</h4>
              <p className="text-xs text-[#A09890] mt-0.5">
                You can load historical research templates with one click, or jump into the Notes vault to jot down your own reflections!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleLoadSamples}
              className="px-3 py-1.5 bg-[#D4AF37] text-black font-bold text-xs rounded-lg hover:bg-[#c49f2e] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Load Sample Lore
            </button>
            {onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('notes')}
                className="px-3 py-1.5 bg-[#1C1C1C] border border-[#333] text-[#D0C8C0] hover:text-white text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Open Notes
              </button>
            )}
          </div>
        </div>
      )}

      {generationFeedback && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{generationFeedback}</span>
        </div>
      )}

      {/* Main Generator Form */}
      <div className="bg-[#0F0F0F] border border-[#262626] rounded-2xl p-6 space-y-6">
        <div className="border-b border-[#222] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-serif font-bold text-white text-base">Quiz Generation Parameters</h4>
          </div>
          <span className="text-[11px] font-mono text-[#8C827A]">Instant Local Recall Synthesis</span>
        </div>

        {/* Source Filter Selection */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#A09890]">
            1. Knowledge Source Material
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setSourceType('all')}
              className={`p-3 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer flex flex-col gap-1 ${
                sourceType === 'all'
                  ? 'bg-[#1C1708] border-[#D4AF37] text-white'
                  : 'bg-[#121212] border-[#2A2A2A] text-[#A09890] hover:border-[#3A3A3A] hover:text-[#D0C8C0]'
              }`}
            >
              <span className="font-bold flex items-center justify-between">
                All Saved Lore
                {sourceType === 'all' && <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </span>
              <span className="text-[10px] text-[#787068]">
                {effectiveAvailableCount} items combined
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSourceType('notes_only')}
              className={`p-3 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer flex flex-col gap-1 ${
                sourceType === 'notes_only'
                  ? 'bg-[#1C1708] border-[#D4AF37] text-white'
                  : 'bg-[#121212] border-[#2A2A2A] text-[#A09890] hover:border-[#3A3A3A] hover:text-[#D0C8C0]'
              }`}
            >
              <span className="font-bold flex items-center justify-between">
                Notes Only
                {sourceType === 'notes_only' && <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </span>
              <span className="text-[10px] text-[#787068]">
                {allNotes.length} research notes
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSourceType('bookmarks_only')}
              className={`p-3 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer flex flex-col gap-1 ${
                sourceType === 'bookmarks_only'
                  ? 'bg-[#1C1708] border-[#D4AF37] text-white'
                  : 'bg-[#121212] border-[#2A2A2A] text-[#A09890] hover:border-[#3A3A3A] hover:text-[#D0C8C0]'
              }`}
            >
              <span className="font-bold flex items-center justify-between">
                Bookmarks Only
                {sourceType === 'bookmarks_only' && <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </span>
              <span className="text-[10px] text-[#787068]">
                {allBookmarks.length} bookmarked records
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSourceType('custom_selection');
                if (selectedNoteIds.length === 0 && selectedBookmarkIds.length === 0) {
                  handleSelectAll();
                }
              }}
              className={`p-3 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer flex flex-col gap-1 ${
                sourceType === 'custom_selection'
                  ? 'bg-[#1C1708] border-[#D4AF37] text-white'
                  : 'bg-[#121212] border-[#2A2A2A] text-[#A09890] hover:border-[#3A3A3A] hover:text-[#D0C8C0]'
              }`}
            >
              <span className="font-bold flex items-center justify-between">
                Specific Picker
                {sourceType === 'custom_selection' && <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </span>
              <span className="text-[10px] text-[#787068]">
                Choose exact items
              </span>
            </button>
          </div>
        </div>

        {/* Specific item picker if custom_selection is selected */}
        {sourceType === 'custom_selection' && (
          <div className="bg-[#121212] border border-[#2A2A2A] rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Select Study Items ({selectedNoteIds.length + selectedBookmarkIds.length} Selected)
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-[10px] text-[#D4AF37] hover:underline cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-[10px] text-[#555]">•</span>
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="text-[10px] text-[#888] hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Notes checklist */}
            {allNotes.length > 0 && (
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-[#8C827A] uppercase">Research Notes:</div>
                <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                  {allNotes.map(n => {
                    const isChecked = selectedNoteIds.includes(n.id);
                    return (
                      <label
                        key={n.id}
                        className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#1E1A0C] border-[#D4AF37]/50 text-white'
                            : 'bg-[#161616] border-[#242424] text-[#8C827A] hover:text-[#C0B8B0]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleNoteSelection(n.id)}
                          className="mt-0.5 accent-[#D4AF37]"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold truncate text-[#E0D8D0]">{n.title}</div>
                          <div className="text-[10px] text-[#777] line-clamp-1 mt-0.5">{n.content}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bookmarks checklist */}
            {allBookmarks.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#222]">
                <div className="text-[10px] font-mono text-[#8C827A] uppercase">Bookmarked Lore:</div>
                <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                  {allBookmarks.map(b => {
                    const isChecked = selectedBookmarkIds.includes(b.id);
                    return (
                      <label
                        key={b.id}
                        className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#1E1A0C] border-[#D4AF37]/50 text-white'
                            : 'bg-[#161616] border-[#242424] text-[#8C827A] hover:text-[#C0B8B0]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleBookmarkSelection(b.id)}
                          className="mt-0.5 accent-[#D4AF37]"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold truncate text-[#E0D8D0]">{b.title}</div>
                          <div className="text-[10px] text-[#777] truncate mt-0.5">{b.subtitle || b.type}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Configuration Row: Title, Question Count, Format, Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A09890]">
              Custom Quiz Title (Optional)
            </label>
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="e.g. My Mediterranean Conquests Master Assessment"
              className="w-full p-2.5 bg-[#121212] border border-[#2A2A2A] rounded-lg text-xs text-[#E0D8D0] placeholder-[#555] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A09890]">
              Number of Questions
            </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full p-2.5 bg-[#121212] border border-[#2A2A2A] rounded-lg text-xs text-[#E0D8D0] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value={3}>3 Questions (Quick Sprint)</option>
              <option value={5}>5 Questions (Standard Review)</option>
              <option value={8}>8 Questions (Deep Recall)</option>
              <option value={10}>10 Questions (Mastery Trial)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A09890]">
              Difficulty Tier
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full p-2.5 bg-[#121212] border border-[#2A2A2A] rounded-lg text-xs text-[#E0D8D0] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Easy">Easy (Foundation Facts)</option>
              <option value="Medium">Medium (Balanced Analysis)</option>
              <option value="Hard">Hard (Strict Inquiries)</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A09890]">
              Question Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormat('mixed')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                  format === 'mixed'
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#121212] border-[#262626] text-[#888]'
                }`}
              >
                Mixed (MCQ + T/F)
              </button>
              <button
                type="button"
                onClick={() => setFormat('mcq')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                  format === 'mcq'
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#121212] border-[#262626] text-[#888]'
                }`}
              >
                Multiple Choice
              </button>
              <button
                type="button"
                onClick={() => setFormat('tf')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                  format === 'tf'
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#121212] border-[#262626] text-[#888]'
                }`}
              >
                True / False
              </button>
            </div>
          </div>
        </div>

        {/* Generate Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-serif font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Synthesizing Personalized Questions from Your Lore...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate & Launch Personalized Quiz</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Previously Generated Personalized Quizzes Section */}
      {savedPersonalizedQuizzes.length > 0 && (
        <div className="bg-[#0F0F0F] border border-[#262626] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#222] pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#D4AF37]" />
              <h4 className="font-serif font-bold text-white text-base">Your Previously Generated Quizzes</h4>
            </div>
            <span className="text-[11px] font-mono text-[#8C827A]">
              {savedPersonalizedQuizzes.length} Saved in Local Archive
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {savedPersonalizedQuizzes.map(savedQ => (
              <div
                key={savedQ.id}
                className="bg-[#141414] border border-[#242424] hover:border-[#383838] rounded-xl p-4 transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 uppercase">
                      {savedQ.difficulty} • {savedQ.questions.length} Questions
                    </span>
                    <button
                      onClick={() => handleDeleteCustomQuiz(savedQ.id)}
                      title="Delete quiz"
                      className="text-[#666] hover:text-rose-400 p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h5 className="font-serif font-bold text-white text-sm mt-2 line-clamp-2">
                    {savedQ.title}
                  </h5>

                  <p className="text-xs text-[#8C827A] mt-1 line-clamp-2 leading-relaxed">
                    {savedQ.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1F1F1F] flex items-center justify-between">
                  <span className="text-[10px] text-[#666] font-mono">
                    Personalized Recall
                  </span>
                  <button
                    onClick={() => onStartQuiz(savedQ)}
                    className="px-3 py-1.5 bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Take Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
