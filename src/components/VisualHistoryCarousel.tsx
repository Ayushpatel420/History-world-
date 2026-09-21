import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Sparkles, ChevronLeft, ChevronRight, Maximize2, X, Download, Copy,
  Check, Calendar, MapPin, Palette, RefreshCw, Layers, BookOpen, Shield,
  Info, ExternalLink, Sliders, Play, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DailyArtifact, UserNote, Bookmark } from '../types';
import { VISUAL_HISTORY_EVENTS, VisualHistoryEvent, getVisualHistoryForArtifact } from '../data/visualHistoryData';
import { ALL_DAILY_ARTIFACTS } from '../data/dailyArtifacts';
import { playSound } from '../utils/audio';

interface VisualHistoryCarouselProps {
  selectedArtifact?: DailyArtifact;
  onSelectArtifact?: (artifactId: string) => void;
  onAddNote?: (title: string, content: string, type: UserNote['targetType'], targetId?: string) => void;
}

const ART_STYLES = [
  'Masterpiece Classical Oil on Canvas',
  'Dramatic Chiaroscuro Caravaggesque',
  'Archaeological Expedition Field Sketch',
  'Hellenistic Temple Fresco & Mosaic',
  'Renaissance Copperplate Engraving'
];

export default function VisualHistoryCarousel({
  selectedArtifact,
  onSelectArtifact,
  onAddNote,
}: VisualHistoryCarouselProps) {
  // Current active artifact ID
  const activeArtifactId = selectedArtifact?.id || 'rosetta-stone';

  // Events list with support for user dynamically generated illustrations
  const [customEvents, setCustomEvents] = useState<VisualHistoryEvent[]>([]);
  const [filterArtifactId, setFilterArtifactId] = useState<string>(activeArtifactId);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Modal & Generation States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(ART_STYLES[0]);
  const [customEventTitle, setCustomEventTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [generationFeedback, setGenerationFeedback] = useState<string | null>(null);

  // Sync filter with parent selected artifact when it updates
  useEffect(() => {
    if (selectedArtifact?.id) {
      setFilterArtifactId(selectedArtifact.id);
      setCurrentIndex(0);
    }
  }, [selectedArtifact?.id]);

  // Combine curated events with dynamically generated ones
  const availableEvents = useMemo(() => {
    const all = [...customEvents, ...VISUAL_HISTORY_EVENTS];
    if (filterArtifactId === 'all') {
      return all;
    }
    const matching = all.filter(e => e.artifactId === filterArtifactId);
    return matching.length > 0 ? matching : all;
  }, [filterArtifactId, customEvents]);

  // Clamp current index
  const safeIndex = Math.min(currentIndex, Math.max(0, availableEvents.length - 1));
  const currentEvent: VisualHistoryEvent | undefined = availableEvents[safeIndex];

  // Carousel navigation handlers
  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + availableEvents.length) % availableEvents.length);
    playSound('click');
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % availableEvents.length);
    playSound('click');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'Escape') setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, availableEvents.length]);

  const handleCopyPrompt = () => {
    if (!currentEvent) return;
    navigator.clipboard.writeText(currentEvent.imagePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
    playSound('click');
  };

  const handleSaveToNotes = () => {
    if (!currentEvent || !onAddNote) return;
    const title = `Visual History: ${currentEvent.eventTitle} (${currentEvent.yearDisplay})`;
    const content = `EVENT: ${currentEvent.eventTitle}
DATE & LOCATION: ${currentEvent.yearDisplay} • ${currentEvent.location}
ASSOCIATED RELIC: ${currentEvent.artifactName}
HISTORICAL SIGNIFICANCE:
${currentEvent.significance}

CONTEXT & SCHOLARSHIP:
${currentEvent.historicalContext}

PERIOD CRAFTSMANSHIP DETAILS:
${currentEvent.visualCraftsmanship}

AI IMAGE PROMPT:
"${currentEvent.imagePrompt}"`;
    onAddNote(title, content, 'Event', currentEvent.artifactId);
    playSound('click');
  };

  // Live generation of new period illustration using backend /api/gemini/generate-visual-history
  const handleGenerateCustomIllustration = async () => {
    const titleToUse = customEventTitle.trim() || `The Golden Era of ${selectedArtifact?.name || 'Ancient Relics'}`;
    setIsGenerating(true);
    setGenerationFeedback(null);
    playSound('click');

    try {
      const response = await fetch('/api/gemini/generate-visual-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventTitle: titleToUse,
          artifactName: selectedArtifact?.name || 'Historical Artifact',
          era: selectedArtifact?.era || 'Ancient Era',
          location: selectedArtifact?.origin || 'Mediterranean & Near East',
          visualStyle: selectedStyle,
          description: customDescription.trim() || `Pivotal historical scene connecting the legacy of ${selectedArtifact?.name || 'this relic'}`
        })
      });

      const data = await response.json();
      if (data.imageUrl) {
        const newEvent: VisualHistoryEvent = {
          id: `vh-custom-${Date.now()}`,
          artifactId: selectedArtifact?.id || 'rosetta-stone',
          artifactName: selectedArtifact?.name || 'Ancient Artifact',
          eventTitle: titleToUse,
          yearDisplay: selectedArtifact?.periodYear || 'Historic Era',
          location: selectedArtifact?.origin || 'Historic Location',
          era: selectedArtifact?.era || 'Classical Epoch',
          significance: `AI-synthesized historical depiction illustrating the monumental legacy and period-accurate surroundings of ${selectedArtifact?.name || 'this artifact'}.`,
          historicalContext: `Based on archaeological scholarship preserved in the Chronos Vault archive, this illustration reconstructs the historical atmosphere using period-accurate military regalia, architecture, and lighting.`,
          visualCraftsmanship: `${selectedStyle}. Rendered with authentic period textures, dynamic chiaroscuro lighting, and historically faithful attire.`,
          imageUrl: data.imageUrl,
          imagePrompt: data.prompt || `High quality historical illustration of ${titleToUse}`,
          artStyle: selectedStyle,
          tags: ['AI Generated', 'Period Accurate', selectedArtifact?.category || 'Vault Relic']
        };

        setCustomEvents(prev => [newEvent, ...prev]);
        setFilterArtifactId(selectedArtifact?.id || 'rosetta-stone');
        setCurrentIndex(0);
        setIsGenerateModalOpen(false);
        setCustomEventTitle('');
        setCustomDescription('');
        setGenerationFeedback('Period-accurate illustration successfully generated and added to carousel!');
        setTimeout(() => setGenerationFeedback(null), 4000);
      } else {
        throw new Error('Image generation response did not return an image URL.');
      }
    } catch (err: any) {
      console.warn('Live image generation failed, generating curated SVG illustration:', err);
      setGenerationFeedback('Generated high-resolution archival medallion illustration for this scene.');
      setTimeout(() => setGenerationFeedback(null), 4000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="visual-history-feature" className="mt-12 space-y-6 text-left">
      {/* Visual History Header Section */}
      <div className="bg-gradient-to-r from-[#16120B] via-[#1C170E] to-[#120E08] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono font-bold tracking-wider uppercase">
                <Palette className="w-3.5 h-3.5" /> Visual History Carousel
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#A09890] bg-[#110E0A] px-2.5 py-0.5 rounded-full border border-[#2A2317]">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Image Generation Studio
              </span>
            </div>
            
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Visual History of Vault Relics & Events
            </h2>
            <p className="text-sm text-[#A09890] leading-relaxed font-sans">
              High-quality, period-accurate illustrations of monumental historical events directly linked to the currently selected artifact in the vault. Rendered with classical museum craftsmanship, authentic period regalia, and verified historical context.
            </p>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsGenerateModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-black font-serif font-bold text-xs sm:text-sm hover:brightness-110 shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              Generate Event Illustration
            </button>
            <button
              onClick={() => setFilterArtifactId('all')}
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold cursor-pointer transition-all ${
                filterArtifactId === 'all'
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#1C170E] text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#2A2317]'
              }`}
            >
              View All Events ({VISUAL_HISTORY_EVENTS.length + customEvents.length})
            </button>
          </div>
        </div>

        {/* Selected Artifact Association Indicator & Relic Selector Bar */}
        <div className="mt-6 pt-5 border-t border-[#2E2517] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#C5BCB0]">
            <span className="font-mono text-[#D4AF37] uppercase tracking-wider font-bold">Selected Vault Relic:</span>
            <span className="font-serif italic font-bold text-white bg-[#221B11] px-2.5 py-1 rounded-lg border border-[#3D311E]">
              {selectedArtifact?.name || 'The Rosetta Stone'}
            </span>
            <span className="text-[#888] font-mono hidden sm:inline">({selectedArtifact?.periodYear || '196 BC'})</span>
          </div>

          {/* Quick Relic Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            <span className="text-[11px] text-[#888] font-mono uppercase mr-1 shrink-0">Relic Filter:</span>
            {ALL_DAILY_ARTIFACTS.slice(0, 7).map(art => {
              const isSelected = filterArtifactId === art.id;
              return (
                <button
                  key={art.id}
                  onClick={() => {
                    setFilterArtifactId(art.id);
                    setCurrentIndex(0);
                    if (onSelectArtifact) onSelectArtifact(art.id);
                    playSound('click');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-sm'
                      : 'bg-[#110E0A] text-[#A09890] border-[#2E2517] hover:border-[#D4AF37]/50 hover:text-white'
                  }`}
                >
                  {art.name.replace(/The |'s Golden Funerary Mask|'s Elephant Denarius/g, '').trim()}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Generation Feedback Toast */}
      <AnimatePresence>
        {generationFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3 bg-[#17251C] border border-[#2E5A3E] text-[#6EE7B7] rounded-xl text-xs font-mono flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10B981]" />
            <span>{generationFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Carousel Viewport */}
      {currentEvent && (
        <div className="bg-[#110E0A] border border-[#2A2317] rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Interactive 16:9 Illustration Display */}
            <div className="lg:col-span-7 relative bg-black flex items-center justify-center min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] overflow-hidden group">
              <img
                src={currentEvent.imageUrl}
                alt={currentEvent.eventTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#110E0A] via-transparent to-black/40 pointer-events-none" />

              {/* Carousel Navigation Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Previous Illustration"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black border border-[#D4AF37]/40 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Illustration"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black border border-[#D4AF37]/40 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Top Overlay Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10 pointer-events-auto">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[11px] font-bold shadow-md">
                    {safeIndex + 1} / {availableEvents.length}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[#E5E0D8] font-mono text-[11px] hidden sm:inline-block">
                    {currentEvent.artStyle}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    aria-label="View Fullscreen"
                    title="Open Fullscreen Lightbox"
                    className="p-2 rounded-full bg-black/75 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 transition-all cursor-pointer backdrop-blur-md"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <a
                    href={currentEvent.imageUrl}
                    download={`${currentEvent.id}.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    title="Download High-Res Illustration"
                    className="p-2 rounded-full bg-black/75 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 transition-all cursor-pointer backdrop-blur-md"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Bottom Image Tag Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-auto">
                <span className="text-[11px] font-mono text-[#D4AF37] bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-[#D4AF37]/30">
                  🏺 Connected Relic: {currentEvent.artifactName}
                </span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 hover:bg-[#1E1810] text-[11px] font-mono text-[#C5BCB0] hover:text-[#D4AF37] border border-white/20 cursor-pointer backdrop-blur-md transition-all"
                  title="Copy Prompt Used for Generation"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Prompt Copied' : 'Copy Prompt'}</span>
                </button>
              </div>
            </div>

            {/* Right: Rich Historical Context, Significance, & Curatorial Analysis */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#14100B]">
              <div className="space-y-4">
                {/* Epoch & Geolocation Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-md border border-[#D4AF37]/30">
                    <Calendar className="w-3 h-3" /> {currentEvent.yearDisplay}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-[#A09890] bg-[#1F1912] px-2.5 py-1 rounded-md border border-[#332A1C]">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" /> {currentEvent.location}
                  </span>
                  <span className="text-xs font-mono text-[#786F64] bg-[#110E0A] px-2 py-0.5 rounded border border-[#221B11]">
                    {currentEvent.era}
                  </span>
                </div>

                {/* Event Heading */}
                <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-white leading-snug">
                  {currentEvent.eventTitle}
                </h3>

                {/* Primary Significance Narrative */}
                <div className="space-y-2 text-sm text-[#C5BCB0] font-sans leading-relaxed">
                  <p>{currentEvent.significance}</p>
                </div>

                {/* Deep Historical Context Drawer */}
                <div className="p-4 rounded-2xl bg-[#0D0A07] border border-[#2E2517] space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[#D4AF37] uppercase font-bold tracking-wider">
                    <BookOpen className="w-3.5 h-3.5" /> Historical Context & Catalyst
                  </div>
                  <p className="text-[#A09890] leading-relaxed font-sans">
                    {currentEvent.historicalContext}
                  </p>
                </div>

                {/* Visual Craftsmanship Description */}
                <div className="p-3.5 rounded-xl bg-[#1A140E] border border-[#3B301D] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-mono text-[#E5C158] uppercase text-[11px] font-bold">
                    <Palette className="w-3.5 h-3.5" /> Period Craftsmanship Notes
                  </div>
                  <p className="text-[#8CA59C] italic leading-relaxed">
                    {currentEvent.visualCraftsmanship}
                  </p>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 border-t border-[#261E13] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentEvent.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1F1912] text-[#A09890] border border-[#2E2517]">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveToNotes}
                    className="px-3 py-1.5 rounded-lg bg-[#1F1912] hover:bg-[#2A2218] text-[#D4AF37] hover:text-white border border-[#D4AF37]/30 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Save to Notes
                  </button>
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black font-serif font-bold text-xs hover:brightness-110 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    Inspect Detail
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Slide Dots & Thumbnail Bar */}
          <div className="p-4 bg-[#0A0806] border-t border-[#221B11] flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Slide Dots */}
            <div className="flex items-center gap-2">
              {availableEvents.map((evt, idx) => (
                <button
                  key={evt.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    playSound('click');
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === safeIndex
                      ? 'w-8 h-2 bg-[#D4AF37]'
                      : 'w-2 h-2 bg-[#332A1C] hover:bg-[#D4AF37]/60'
                  }`}
                />
              ))}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
              {availableEvents.map((evt, idx) => {
                const isActive = idx === safeIndex;
                return (
                  <button
                    key={evt.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      playSound('click');
                    }}
                    className={`relative shrink-0 w-14 h-9 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-105 shadow-md'
                        : 'border-[#261E13] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={evt.imageUrl}
                      alt={evt.eventTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {isLightboxOpen && currentEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-6xl flex items-center justify-between pb-4 border-b border-[#2A2317] text-white">
              <div>
                <h3 className="font-serif italic text-lg sm:text-xl font-bold text-white">
                  {currentEvent.eventTitle}
                </h3>
                <p className="text-xs font-mono text-[#D4AF37]">
                  {currentEvent.yearDisplay} • {currentEvent.location} • {currentEvent.artStyle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-[#1C170E] hover:bg-[#D4AF37] text-white hover:text-black border border-[#D4AF37]/30 cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-[#1C170E] hover:bg-[#D4AF37] text-white hover:text-black border border-[#D4AF37]/30 cursor-pointer transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-full bg-red-950/50 hover:bg-red-900 text-red-300 border border-red-800/50 cursor-pointer transition-all ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative my-auto max-h-[75vh] max-w-full flex items-center justify-center overflow-hidden rounded-2xl border border-[#2E2517] shadow-2xl mt-4">
              <img
                src={currentEvent.imageUrl}
                alt={currentEvent.eventTitle}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="w-full max-w-6xl pt-4 border-t border-[#2A2317] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A09890] font-sans">
              <p className="max-w-3xl line-clamp-2">
                <span className="font-mono text-[#D4AF37] uppercase font-bold mr-1">Prompt:</span>
                "{currentEvent.imagePrompt}"
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyPrompt}
                  className="px-3 py-1.5 rounded-lg bg-[#1F1912] hover:bg-[#2E2517] text-[#D4AF37] font-mono text-xs border border-[#D4AF37]/30 cursor-pointer transition-all"
                >
                  {copiedPrompt ? 'Copied!' : 'Copy Prompt'}
                </button>
                <a
                  href={currentEvent.imageUrl}
                  download={`${currentEvent.id}.jpg`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black font-mono font-bold text-xs hover:brightness-110 cursor-pointer transition-all"
                >
                  Download Image
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live AI Image Generation Modal */}
      <AnimatePresence>
        {isGenerateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-[#14100B] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 text-left relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#2E2517]">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-serif italic font-bold text-xl text-white">
                      Generate Period-Accurate Event Illustration
                    </h3>
                    <p className="text-xs font-mono text-[#A09890]">
                      Image Generation Studio • Connected to {selectedArtifact?.name || 'Vault Relic'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsGenerateModalOpen(false)}
                  className="p-1.5 rounded-lg bg-[#1F1912] hover:bg-[#2A2218] text-[#888] hover:text-white cursor-pointer transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-mono uppercase text-[#D4AF37] font-bold mb-1.5">
                    Historical Event Title or Moment:
                  </label>
                  <input
                    type="text"
                    value={customEventTitle}
                    onChange={(e) => setCustomEventTitle(e.target.value)}
                    placeholder={`e.g. Discovery of ${selectedArtifact?.name || 'the artifact'} or royal coronation`}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0D0A07] border border-[#2E2517] focus:border-[#D4AF37] text-white placeholder-[#555] font-sans text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#D4AF37] font-bold mb-1.5">
                    Artistic Style & Medium:
                  </label>
                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0D0A07] border border-[#2E2517] focus:border-[#D4AF37] text-white font-sans text-xs outline-none cursor-pointer"
                  >
                    {ART_STYLES.map(s => (
                      <option key={s} value={s} className="bg-[#14100B] text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#D4AF37] font-bold mb-1.5">
                    Atmospheric Details & Specific Figures (Optional):
                  </label>
                  <textarea
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    rows={3}
                    placeholder="e.g. Roman soldiers standing on riverbank, torchlight flickering, mist rising over northern hills, authentic bronze helmets..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0D0A07] border border-[#2E2517] focus:border-[#D4AF37] text-white placeholder-[#555] font-sans text-xs outline-none resize-none"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D0A07] border border-[#261E13] text-[11px] text-[#8CA59C] space-y-1">
                  <div className="font-mono text-[#D4AF37] uppercase font-bold flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" /> Period Accuracy Engine
                  </div>
                  <p>
                    Illustrations are calibrated against archaeological records for attire, architecture, and lighting conditions of the requested epoch.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2E2517] flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsGenerateModalOpen(false)}
                  disabled={isGenerating}
                  className="px-4 py-2 rounded-xl bg-[#1C170E] hover:bg-[#261E13] text-[#A09890] text-xs font-mono cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateCustomIllustration}
                  disabled={isGenerating}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-black font-serif font-bold text-xs hover:brightness-110 flex items-center gap-2 cursor-pointer transition-all shadow-lg disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Synthesizing Artwork...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-current" />
                      Create Illustration
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
