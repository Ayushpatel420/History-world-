import React, { useState } from 'react';
import { 
  Bookmark as BookmarkIcon, 
  MapPin, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trophy,
  Scale,
  Zap,
  Crosshair,
  Shield,
  Tag,
  Swords,
  Users,
  BookMarked,
  X,
  Check
} from 'lucide-react';
import { HistoricalBattle, Bookmark } from '../types';
import BattleComparisonChart from './BattleComparisonChart';

interface BattleCardProps {
  battle: HistoricalBattle;
  isBookmarked: boolean;
  onSelect?: (battle: HistoricalBattle) => void;
  onToggleBookmark: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  onAddNote?: (title: string, content: string, targetType?: string, targetId?: string) => void;
  isBlueprintOpen?: boolean;
  onToggleBlueprint?: () => void;
}

export default function BattleCard({
  battle,
  isBookmarked,
  onSelect,
  onToggleBookmark,
  onAddNote,
  isBlueprintOpen: controlledBlueprintOpen,
  onToggleBlueprint: controlledToggleBlueprint,
}: BattleCardProps) {
  // Local states
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [internalBlueprintOpen, setInternalBlueprintOpen] = useState(false);
  
  // Note taking inside tactical blueprint
  const [isNoteInputOpen, setIsNoteInputOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  // If controlled by parent, use controlled state, otherwise local state
  const isBlueprintOpen = controlledBlueprintOpen !== undefined 
    ? controlledBlueprintOpen 
    : internalBlueprintOpen;

  const handleToggleBlueprint = () => {
    if (controlledToggleBlueprint) {
      controlledToggleBlueprint();
    } else {
      setInternalBlueprintOpen(prev => !prev);
    }
  };

  const isVictorA = battle.victor === 'A';
  const isVictorB = battle.victor === 'B';
  const isInconclusive = battle.victor === 'Inconclusive';

  const combAShort = battle.combatantA.length > 28 ? battle.combatantA.split(/[,(]/)[0].trim() : battle.combatantA;
  const combBShort = battle.combatantB.length > 28 ? battle.combatantB.split(/[,(]/)[0].trim() : battle.combatantB;

  const handleSaveNote = () => {
    if (!noteContent.trim() || !onAddNote) return;
    onAddNote(
      `Tactical Analysis: ${battle.name} (${battle.dateStr})`,
      noteContent,
      'Battle',
      battle.id
    );
    setNoteContent('');
    setIsNoteInputOpen(false);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 3000);
  };

  return (
    <div
      id={`battle-card-${battle.id}`}
      className={`border rounded-2xl text-left transition-all duration-300 relative flex flex-col justify-between ${
        isBlueprintOpen 
          ? 'bg-[#110F0B] border-[#D4AF37] ring-2 ring-[#D4AF37]/40 shadow-2xl p-6 space-y-6 sm:col-span-2 lg:col-span-3' 
          : 'bg-[#0F0F0F] border-[#262626] hover:border-[#D4AF37]/60 hover:-translate-y-0.5 p-5 space-y-4 hover:shadow-xl'
      }`}
    >
      {/* ========================================================================= */}
      {/* IN-PLACE OPENED TACTICAL BLUEPRINT VIEW                                  */}
      {/* ========================================================================= */}
      {isBlueprintOpen ? (
        <div className="space-y-6 animate-fade-in text-left">
          
          {/* Blueprint Header Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A2317] pb-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37] text-black shadow-sm flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5" />
                TACTICAL BLUEPRINT (OPENED IN PLACE)
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#1C1811] text-[#D4AF37] border border-[#D4AF37]/40">
                {battle.era} • {battle.dateStr}
              </span>
              <span className="text-xs text-[#A09890] font-mono flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                {battle.location} ({battle.region})
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={battle.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/50 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                Wikipedia <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="button"
                onClick={handleToggleBlueprint}
                className="px-3 py-1.5 bg-[#1C1510] border border-[#D4AF37]/40 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1"
                title="Close Blueprint in place"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close Blueprint</span>
              </button>
            </div>
          </div>

          {/* Battle Title and War Info */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#D4AF37]">
              {battle.name}
            </h3>
            <p className="text-xs text-[#A09890] font-sans mt-1">
              Conflict: <span className="text-white font-medium">{battle.war}</span>
            </p>
          </div>

          {/* WIN / LOSS ASSESSMENT BANNER */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
            isInconclusive
              ? 'bg-[#17140C] border-amber-500/40 text-amber-300'
              : 'bg-[#0E1711] border-emerald-500/40 text-emerald-300'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isInconclusive
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              }`}>
                {isInconclusive ? <Scale className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A09890] block">
                  Tactical Assessment & Result
                </span>
                <p className="text-sm sm:text-base font-bold text-white">
                  {isVictorA
                    ? `Decisive Victory for ${battle.combatantA}`
                    : isVictorB
                    ? `Decisive Victory for ${battle.combatantB}`
                    : 'Inconclusive Strategic Engagement / Stalemate'}
                </p>
                <p className="text-xs text-[#A09890] mt-0.5">
                  {battle.outcome}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border shrink-0 ${
              isInconclusive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}>
              {isInconclusive ? 'DRAW / CONTESTED' : 'DECISIVE WIN'}
            </span>
          </div>

          {/* COMBATANTS & SOLDIER STRENGTH BREAKDOWN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Side A Combatant Card */}
            <div className={`p-4 bg-[#14120E] border rounded-2xl space-y-2.5 ${
              isVictorA ? 'border-emerald-500/40' : 'border-[#2A2317]'
            }`}>
              <div className="flex items-center justify-between border-b border-[#2A2317] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Side A Combatant</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isVictorA
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : isVictorB
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {isVictorA ? 'WINNER' : isVictorB ? 'DEFEATED' : 'DRAW'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#D4AF37]">Army Profile</span>
              </div>
              
              <h4 className="font-bold text-base text-[#D4AF37]">{battle.combatantA}</h4>
              <p className="text-xs text-[#A09890]">
                Commander / General: <span className="text-white font-medium">{battle.commanderA}</span>
              </p>

              {/* Explicit Number of Soldiers / Troops */}
              <div className="bg-[#0D0B08] p-2.5 rounded-xl border border-[#241E15] space-y-1">
                <div className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-400" />
                  Army Force Strength & Soldiers:
                </div>
                <p className="text-xs font-mono font-semibold text-sky-200">
                  {battle.forcesA ? battle.forcesA : 'Fragmentary force strength records'}
                </p>
              </div>

              {battle.casualtiesA && (
                <div className="text-[11px] font-mono text-red-400/90 pt-1">
                  <strong>Recorded Losses:</strong> {battle.casualtiesA}
                </div>
              )}
            </div>

            {/* Side B Combatant Card */}
            <div className={`p-4 bg-[#14120E] border rounded-2xl space-y-2.5 ${
              isVictorB ? 'border-emerald-500/40' : 'border-[#2A2317]'
            }`}>
              <div className="flex items-center justify-between border-b border-[#2A2317] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Side B Combatant</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isVictorB
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : isVictorA
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {isVictorB ? 'WINNER' : isVictorA ? 'DEFEATED' : 'DRAW'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#D4AF37]">Army Profile</span>
              </div>
              
              <h4 className="font-bold text-base text-[#D4AF37]">{battle.combatantB}</h4>
              <p className="text-xs text-[#A09890]">
                Commander / General: <span className="text-white font-medium">{battle.commanderB}</span>
              </p>

              {/* Explicit Number of Soldiers / Troops */}
              <div className="bg-[#0D0B08] p-2.5 rounded-xl border border-[#241E15] space-y-1">
                <div className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  Army Force Strength & Soldiers:
                </div>
                <p className="text-xs font-mono font-semibold text-purple-200">
                  {battle.forcesB ? battle.forcesB : 'Fragmentary force strength records'}
                </p>
              </div>

              {battle.casualtiesB && (
                <div className="text-[11px] font-mono text-red-400/90 pt-1">
                  <strong>Recorded Losses:</strong> {battle.casualtiesB}
                </div>
              )}
            </div>
          </div>

          {/* COMPARATIVE METRICS & CASUALTIES CHART (EXPANDED) */}
          <BattleComparisonChart
            battle={battle}
            mode="expanded"
            showToggle={true}
          />

          {/* BRIEF IMPACT SUMMARY CALLOUT */}
          <div className="p-4 bg-[#16130E] border border-[#D4AF37]/40 rounded-2xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#D4AF37]" /> Brief Impact Summary
              </span>
              <span className="text-[10px] font-mono text-[#8E867C]">Geopolitical & Strategic Legacy</span>
            </div>
            <p className="text-xs sm:text-sm text-[#E5DFD7] leading-relaxed font-sans">
              {battle.significance}
            </p>
          </div>

          {/* Tactical Summary & Doctrine */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <Crosshair className="w-4 h-4" /> Tactical Doctrine & Field Maneuver
            </h4>
            <p className="text-xs sm:text-sm text-[#E0D8D0] leading-relaxed bg-[#0D0B08] border border-[#2A2317] p-4 rounded-2xl font-sans">
              {battle.tacticalSummary}
            </p>
          </div>

          {/* Strategic Significance & World Legacy */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Strategic Significance & Consequences
            </h4>
            <p className="text-xs sm:text-sm text-[#A09890] leading-relaxed bg-[#0D0B08] border border-[#2A2317] p-4 rounded-2xl font-sans">
              {battle.significance}
            </p>
          </div>

          {/* Key Weaponry & Technologies */}
          {battle.keyWeapons && battle.keyWeapons.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A09890] flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5 text-[#D4AF37]" /> Key Armaments & Military Technologies:
              </h4>
              <div className="flex flex-wrap gap-2">
                {battle.keyWeapons.map((weapon, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-[#14120E] border border-[#2A2317] text-[#D4AF37] text-xs rounded-xl font-mono"
                  >
                    ⚔️ {weapon}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {battle.tags && battle.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <Tag className="w-3 h-3 text-[#7A7268]" />
              {battle.tags.map((tag, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#15130F] text-[#8E867C] border border-[#262016]">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* INTERACTIVE NOTE-TAKING & BOOKMARK TOOLS (IN PLACE) */}
          <div className="pt-4 border-t border-[#2A2317] space-y-3">
            {noteSaved && (
              <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-mono flex items-center gap-2">
                <Check className="w-4 h-4" /> Tactical Note saved successfully to Notebook!
              </div>
            )}

            {!isNoteInputOpen ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNoteInputOpen(true)}
                    className="px-4 py-2 bg-[#18140F] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <BookMarked className="w-4 h-4" /> Add Note on this Battle
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(battle.id, 'battle', battle.name, `${battle.era} Battle (${battle.dateStr})`)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isBookmarked
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                        : 'bg-[#18140F] text-white border-[#2A2317] hover:text-[#D4AF37]'
                    }`}
                  >
                    <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current' : 'text-[#D4AF37]'}`} />
                    {isBookmarked ? 'Bookmarked' : 'Bookmark Battle'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleToggleBlueprint}
                  className="px-4 py-2 bg-[#14120E] border border-[#D4AF37]/50 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
                >
                  <X className="w-3.5 h-3.5" /> Close Tactical Blueprint
                </button>
              </div>
            ) : (
              <div className="bg-[#14120E] border border-[#3A3020] p-4 rounded-2xl space-y-3 animate-fade-in">
                <label className="text-xs font-mono font-bold text-[#D4AF37] block">
                  Write Your Historical Observation on {battle.name}
                </label>
                <textarea
                  rows={3}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Record tactical analysis, troop ratios, commander decisions, or revision notes..."
                  className="w-full p-3 bg-[#0A0A0A] border border-[#2A2317] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37] font-sans"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNoteInputOpen(false)}
                    className="px-3 py-1.5 text-xs text-[#A09890] hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveNote}
                    className="px-4 py-1.5 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#E5C158] transition-all cursor-pointer"
                  >
                    Save Note to Notebook
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* STANDARD COMPACT BATTLE CARD VIEW                                         */
        /* ========================================================================= */
        <div className="space-y-3.5">
          
          {/* Top Bar: Era Badge & Bookmark Button */}
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#1C1811] text-[#D4AF37] border border-[#D4AF37]/35 truncate">
              {battle.era} • {battle.dateStr}
            </span>
            
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(battle.id, 'battle', battle.name, `${battle.era} Battle (${battle.dateStr})`);
              }}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                isBookmarked
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-sm'
                  : 'bg-[#151515] text-[#A09890] border-[#2A2A2A] hover:text-[#D4AF37]'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Battle'}
            >
              <BookmarkIcon className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Battle Title & War */}
          <div>
            <h3 
              onClick={handleToggleBlueprint}
              className="font-serif italic font-bold text-base text-white hover:text-[#D4AF37] transition-colors line-clamp-1 cursor-pointer"
              title="Click to open tactical blueprint in place"
            >
              {battle.name}
            </h3>
            <p className="text-[11px] text-[#A09890] font-sans line-clamp-1 mt-0.5">
              {battle.war}
            </p>
          </div>

          {/* Location & Region */}
          <div className="flex items-center gap-1 text-[10px] text-[#A09890]/80 font-mono">
            <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
            <span className="truncate">{battle.location} ({battle.region})</span>
          </div>

          {/* WIN / LOSS RESULT INDICATOR */}
          <div 
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono border ${
              isVictorA || isVictorB
                ? 'bg-[#0E1711] border-emerald-500/35 text-emerald-300'
                : 'bg-[#17140C] border-amber-500/35 text-amber-300'
            }`}
          >
            <div className="flex items-center gap-2 truncate pr-2">
              {isInconclusive ? (
                <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              ) : (
                <Trophy className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              )}
              <span className="truncate font-semibold text-[11px]">
                {isVictorA
                  ? `Victor: ${combAShort}`
                  : isVictorB
                  ? `Victor: ${combBShort}`
                  : 'Inconclusive / Contested'}
              </span>
            </div>

            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 font-mono border ${
                isInconclusive
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {isInconclusive ? 'DRAW' : 'DECISIVE WIN'}
            </span>
          </div>

          {/* Combatants VS Box with Side Win/Loss Badges AND NO. OF SOLDIERS */}
          <div className="bg-[#141414] border border-[#222222] p-3 rounded-xl text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] gap-2">
              
              {/* Side A Combatant */}
              <div className="flex items-center gap-1.5 truncate max-w-[46%]">
                <span 
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                    isVictorA 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : isVictorB 
                      ? 'bg-rose-500/20 text-rose-300/90 border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {isVictorA ? 'WIN' : isVictorB ? 'LOSS' : 'DRAW'}
                </span>
                <span className={`font-semibold truncate ${isVictorA ? 'text-[#D4AF37]' : 'text-white/90'}`}>
                  {battle.combatantA}
                </span>
              </div>

              <span className="text-[#D4AF37] font-mono text-[9px] font-bold shrink-0">VS</span>

              {/* Side B Combatant */}
              <div className="flex items-center gap-1.5 justify-end truncate max-w-[46%] text-right ml-auto">
                <span className={`font-semibold truncate ${isVictorB ? 'text-[#D4AF37]' : 'text-white/90'}`}>
                  {battle.combatantB}
                </span>
                <span 
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border shrink-0 ${
                    isVictorB 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : isVictorA 
                      ? 'bg-rose-500/20 text-rose-300/90 border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {isVictorB ? 'WIN' : isVictorA ? 'LOSS' : 'DRAW'}
                </span>
              </div>
            </div>

            {/* Commanders / Generals */}
            <div className="flex items-center justify-between text-[9px] text-[#A09890] font-mono gap-2 pt-0.5 border-t border-[#1F1F1F]">
              <span className="truncate max-w-[48%]">General: {battle.commanderA}</span>
              <span className="truncate max-w-[48%] text-right">General: {battle.commanderB}</span>
            </div>

            {/* Soldiers / Army Sizes Highlighted Directly in every army card */}
            {(battle.forcesA || battle.forcesB) && (
              <div className="flex items-center justify-between text-[9px] font-mono border-t border-[#1F1F1F] pt-1.5 gap-2">
                <div className="truncate max-w-[48%] text-sky-400 font-semibold flex items-center gap-1" title={`Army A: ${battle.forcesA}`}>
                  <Users className="w-2.5 h-2.5 text-sky-400 shrink-0" />
                  <span className="truncate">{battle.forcesA || 'Troops: Record unlisted'}</span>
                </div>
                <div className="truncate max-w-[48%] text-purple-300 font-semibold text-right flex items-center justify-end gap-1" title={`Army B: ${battle.forcesB}`}>
                  <span className="truncate">{battle.forcesB || 'Troops: Record unlisted'}</span>
                  <Users className="w-2.5 h-2.5 text-purple-400 shrink-0" />
                </div>
              </div>
            )}
          </div>

          {/* COMPARISON CHART: Forces & Casualties */}
          <BattleComparisonChart 
            battle={battle} 
            mode="compact" 
            showToggle={true}
          />

          {/* BRIEF IMPACT SUMMARY */}
          <div className="bg-[#14120E] border border-[#2A2317] rounded-xl p-3 space-y-1 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#D4AF37]" /> Brief Impact Summary
              </span>
              <span className="text-[9px] font-mono text-[#8E867C]">Historical Legacy</span>
            </div>
            <p className="text-xs text-[#D5CDC4] leading-relaxed font-sans line-clamp-2">
              {battle.significance}
            </p>
          </div>

          {/* EXPANDED DETAILED NARRATIVE PANEL */}
          {internalExpanded && (
            <div className="bg-[#14120E] border border-[#3A3020] rounded-xl p-4 space-y-3.5 text-left text-xs animate-fade-in shadow-inner">
              {/* Tactical Maneuvers Section */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-mono font-bold text-[11px] uppercase tracking-wider">
                  <Crosshair className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Tactical Maneuvers & Battlefield Strategy</span>
                </div>
                <p className="text-xs text-[#E3DDD5] leading-relaxed font-sans bg-[#0E0C09] p-3 rounded-lg border border-[#262016]">
                  {battle.tacticalSummary}
                </p>
              </div>

              {/* Strategic Consequences Section */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#E5A93C] font-mono font-bold text-[11px] uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Geopolitical Consequences & Outcome</span>
                </div>
                <div className="bg-[#0E0C09] p-3 rounded-lg border border-[#262016] space-y-1.5">
                  <div className="text-[11px] font-mono text-[#D4AF37]">
                    <strong>Outcome Record:</strong> {battle.outcome}
                  </div>
                  <p className="text-xs text-[#C5BDB5] leading-relaxed font-sans">
                    {battle.significance}
                  </p>
                </div>
              </div>

              {/* Key Weapons & Doctrines */}
              {battle.keyWeapons && battle.keyWeapons.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#A09890] uppercase tracking-wider">
                    <Swords className="w-3 h-3 text-[#D4AF37]" /> Key Weapons & Tactical Doctrine:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {battle.keyWeapons.map((weapon, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#1A1610] text-[#D4AF37] border border-[#D4AF37]/30"
                      >
                        {weapon}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {battle.tags && battle.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <Tag className="w-3 h-3 text-[#7A7268]" />
                  {battle.tags.map((tag, idx) => (
                    <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#161616] text-[#8E867C] border border-[#262626]">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Inside Expanded Panel to open the full blueprint right in place */}
              <div className="pt-2 border-t border-[#262016] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#A09890]">
                  War: {battle.war}
                </span>
                <button
                  type="button"
                  onClick={handleToggleBlueprint}
                  className="px-2.5 py-1 bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  Open Tactical Blueprint in Place →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM ACTION BAR (When not in Blueprint mode)                            */}
      {/* ========================================================================= */}
      {!isBlueprintOpen && (
        <div className="pt-3.5 border-t border-[#1F1F1F] mt-2 flex items-center justify-between gap-2">
          {/* EXPAND / COLLAPSE BUTTON */}
          <button
            type="button"
            onClick={() => setInternalExpanded(!internalExpanded)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 border ${
              internalExpanded
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-sm'
                : 'bg-[#181510] text-[#D4AF37] border-[#D4AF37]/40 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]'
            }`}
            title={internalExpanded ? 'Collapse detailed tactical narrative' : 'Expand detailed tactical maneuvers and consequences'}
          >
            <span>{internalExpanded ? 'Collapse' : 'Expand'}</span>
            {internalExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <div className="flex items-center gap-3">
            {/* TACTICAL BLUEPRINT BUTTON - OPENS IN PLACE */}
            <button
              type="button"
              onClick={handleToggleBlueprint}
              className="text-[10px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer font-bold bg-[#1C1811] px-2 py-0.5 rounded-md border border-[#D4AF37]/35 hover:bg-[#D4AF37] hover:text-black transition-all"
              title="Open full tactical blueprint right in its place"
            >
              Tactical Blueprint <ChevronRight className="w-3 h-3" />
            </button>
            
            <a
              href={battle.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-[#A09890] hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
            >
              Wiki <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
