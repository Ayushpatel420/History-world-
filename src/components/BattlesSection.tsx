import React, { useState, useMemo, useEffect } from 'react';
import { 
  Swords, Search, Filter, Globe, ExternalLink, BookMarked, Bookmark as BookmarkIcon, 
  MapPin, Shield, Users, Crosshair, ChevronRight, BarChart2, Eye, Compass, 
  Sparkles, FileText, AlertCircle, Award, Trophy, Scale, Zap, ChevronDown, ChevronUp
} from 'lucide-react';
import { HistoricalBattle, Bookmark } from '../types';
import { ALL_HISTORICAL_BATTLES } from '../data/battlesData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import BattleCard from './BattleCard';
import BattleComparisonChart from './BattleComparisonChart';
import { parseMilitaryMetric } from '../utils/battleStats';

interface BattlesSectionProps {
  onAddNote: (title: string, content: string, type: 'Battle' | 'General', targetId?: string) => void;
  onToggleBookmark: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  bookmarks: Bookmark[];
  focusBattleId?: string;
}

export default function BattlesSection({
  onAddNote,
  onToggleBookmark,
  bookmarks,
  focusBattleId
}: BattlesSectionProps) {
  // Filters & State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedVictor, setSelectedVictor] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'analytics'>('grid');
  
  // Active in-place Tactical Blueprint state
  const [activeBattleId, setActiveBattleId] = useState<string | null>(focusBattleId || null);

  // Pagination for high performance over 1,000+ items
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const eras = [
    'All', 'Ancient', 'Classical', 'Medieval', 'Early Modern', 
    '19th Century', 'World War I', 'World War II', 'Cold War & Modern'
  ];

  const regions = [
    'All', 'Middle East', 'Europe', 'East Asia', 'South Asia', 
    'Americas', 'Africa', 'Global / Naval', 'Central Asia'
  ];

  // Filtered battles calculation
  const filteredBattles = useMemo(() => {
    return ALL_HISTORICAL_BATTLES.filter((battle) => {
      const matchesSearch = 
        battle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        battle.war.toLowerCase().includes(searchQuery.toLowerCase()) ||
        battle.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        battle.commanderA.toLowerCase().includes(searchQuery.toLowerCase()) ||
        battle.commanderB.toLowerCase().includes(searchQuery.toLowerCase()) ||
        battle.combatantA.toLowerCase().includes(searchQuery.toLowerCase()) ||
        battle.combatantB.toLowerCase().includes(searchQuery.toLowerCase()) ||
        battle.dateStr.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEra = selectedEra === 'All' || battle.era === selectedEra;
      const matchesRegion = selectedRegion === 'All' || battle.region === selectedRegion;
      const matchesVictor = 
        selectedVictor === 'All' || 
        (selectedVictor === 'Decisive' && battle.victor !== 'Inconclusive') ||
        (selectedVictor === 'Inconclusive' && battle.victor === 'Inconclusive');

      return matchesSearch && matchesEra && matchesRegion && matchesVictor;
    });
  }, [searchQuery, selectedEra, selectedRegion, selectedVictor]);

  // Keep active battle synchronized when deep-linking via focusBattleId
  useEffect(() => {
    if (focusBattleId) {
      setActiveBattleId(focusBattleId);
      const index = filteredBattles.findIndex(b => b.id === focusBattleId);
      if (index !== -1) {
        setCurrentPage(Math.floor(index / itemsPerPage) + 1);
      }
      setTimeout(() => {
        const el = document.getElementById(`battle-card-${focusBattleId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }, [focusBattleId, filteredBattles]);

  // Paginated slice
  const paginatedBattles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBattles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBattles, currentPage]);

  const totalPages = Math.ceil(filteredBattles.length / itemsPerPage);

  // Era Distribution Analytics Data
  const eraDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    eras.filter(e => e !== 'All').forEach(e => counts[e] = 0);
    ALL_HISTORICAL_BATTLES.forEach(b => {
      if (counts[b.era] !== undefined) counts[b.era]++;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  return (
    <div className="space-y-8 animate-fade-in text-[#E0D8D0]">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#141414] via-[#1A1610] to-[#121212] border border-[#D4AF37]/30 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-xl text-[#D4AF37]">
                <Swords className="w-6 h-6" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                Global Military Archives
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#D4AF37]">
              Famous Battles Around the World
            </h2>
            <p className="text-xs sm:text-sm text-[#A09890] max-w-3xl leading-relaxed font-sans">
              Explore pivotal military engagements across Ancient, Classical, Medieval, Early Modern, 19th Century, and World War eras. Includes full tactical commanders, casualty estimates, combat doctrine, and verified Wikipedia scholarly pages.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#2A2A2A] p-1.5 rounded-2xl shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'grid' 
                  ? 'bg-[#D4AF37] text-black shadow-md' 
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" /> Grid View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'table' 
                  ? 'bg-[#D4AF37] text-black shadow-md' 
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Compact Index
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'analytics' 
                  ? 'bg-[#D4AF37] text-black shadow-md' 
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" /> Battle Statistics
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Multi-Filters */}
      <div className="bg-[#0F0F0F] border border-[#2A2A2A] p-4 sm:p-5 rounded-2xl space-y-4 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#A09890]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by battle name (Cannae, Waterloo, Stalingrad), commander, war..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#141414] text-white text-xs sm:text-sm border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[10px] text-[#A09890] hover:text-[#D4AF37] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Select */}
          <div className="md:col-span-3">
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 bg-[#141414] text-[#E0D8D0] text-xs sm:text-sm border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer font-sans"
            >
              <option value="All">🌍 All Continents & Regions</option>
              {regions.filter(r => r !== 'All').map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Victor Select */}
          <div className="md:col-span-3">
            <select
              value={selectedVictor}
              onChange={(e) => {
                setSelectedVictor(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 bg-[#141414] text-[#E0D8D0] text-xs sm:text-sm border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer font-sans"
            >
              <option value="All">⚔️ All Outcomes & Results</option>
              <option value="Decisive">🏆 Decisive Strategic Victories</option>
              <option value="Inconclusive">⚖️ Inconclusive / Stalemates</option>
            </select>
          </div>
        </div>

        {/* Era Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs">
          <span className="text-[#A09890] text-[11px] font-mono uppercase font-bold shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#D4AF37]" /> Eras:
          </span>
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => {
                setSelectedEra(era);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedEra === era
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-sm font-bold'
                  : 'bg-[#141414] text-[#A09890] border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
              }`}
            >
              {era}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-[#A09890] font-mono px-1">
        <span>
          Showing <span className="text-[#D4AF37] font-bold">{filteredBattles.length}</span> recorded battles
        </span>
        {totalPages > 1 && (
          <span>
            Page <span className="text-[#D4AF37] font-bold">{currentPage}</span> of {totalPages}
          </span>
        )}
      </div>

      {/* 1. Analytics Mode */}
      {viewMode === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0F0F0F] border border-[#2A2A2A] p-6 rounded-3xl shadow-xl">
          <div className="lg:col-span-7 space-y-4 text-left">
            <h3 className="font-serif italic font-bold text-lg text-[#D4AF37]">
              Historical Battles Distribution Across World Epochs
            </h3>
            <p className="text-xs text-[#A09890] leading-relaxed font-sans">
              Comparative distribution of the 1,000 documented battle records categorized by military era, showing the intensification of global conflict dynamics.
            </p>
            <div className="h-64 sm:h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eraDistribution}>
                  <XAxis dataKey="name" stroke="#A09890" fontSize={10} tickLine={false} interval={0} angle={-25} textAnchor="end" height={60} />
                  <YAxis stroke="#A09890" fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141414', borderColor: '#D4AF37', borderRadius: '12px', fontSize: '11px' }} 
                    itemStyle={{ color: '#D4AF37' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {eraDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#D4AF37' : '#9E8120'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 border-t lg:border-t-0 lg:border-l border-[#2A2A2A] pt-4 lg:pt-0 lg:pl-6 text-left">
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider font-mono">
              Key Strategic Milestones
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-[#141414] border border-[#2A2A2A] rounded-xl">
                <span className="text-xs font-bold text-white block">Earliest Recorded Chariot Clash</span>
                <p className="text-[11px] text-[#A09890] mt-0.5">Battle of Kadesh (1274 BC) between Ramesses II and Muwatalli II with 5,000+ war chariots.</p>
              </div>
              <div className="p-3 bg-[#141414] border border-[#2A2A2A] rounded-xl">
                <span className="text-xs font-bold text-white block">Tactical Envelopment Masterpiece</span>
                <p className="text-[11px] text-[#A09890] mt-0.5">Battle of Cannae (216 BC) where Hannibal Barca annihilated 70,000 Roman legionaries with a double pincer.</p>
              </div>
              <div className="p-3 bg-[#141414] border border-[#2A2A2A] rounded-xl">
                <span className="text-xs font-bold text-white block">Largest Armored Tank Collision</span>
                <p className="text-[11px] text-[#A09890] mt-0.5">Battle of Kursk (1943) involving over 6,000 tanks and 2 million combatants on the Eastern Front.</p>
              </div>
              <div className="p-3 bg-[#141414] border border-[#2A2A2A] rounded-xl">
                <span className="text-xs font-bold text-white block">Largest Naval Engagement in History</span>
                <p className="text-[11px] text-[#A09890] mt-0.5">Battle of Leyte Gulf (1944) across 100,000+ square miles of Philippine seas.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedBattles.map((battle) => {
            const isBookmarked = bookmarks.some(b => b.targetId === battle.id && b.type === 'battle');
            const isBlueprintOpen = activeBattleId === battle.id;

            return (
              <BattleCard
                key={battle.id}
                battle={battle}
                isBookmarked={isBookmarked}
                isBlueprintOpen={isBlueprintOpen}
                onToggleBlueprint={() => {
                  setActiveBattleId(prev => prev === battle.id ? null : battle.id);
                }}
                onSelect={(b) => {
                  setActiveBattleId(prev => prev === b.id ? null : b.id);
                }}
                onToggleBookmark={onToggleBookmark}
                onAddNote={onAddNote}
              />
            );
          })}
        </div>
      )}

      {/* 3. Compact Index Table View */}
      {viewMode === 'table' && (
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#141414] border-b border-[#2A2A2A] font-mono text-[10px] text-[#D4AF37] uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Battle Name</th>
                  <th className="p-3.5">Era & Date</th>
                  <th className="p-3.5">War / Conflict</th>
                  <th className="p-3.5">Commanders & Combatants</th>
                  <th className="p-3.5">Army Strengths (Troops)</th>
                  <th className="p-3.5">Result Indicator</th>
                  <th className="p-3.5">Casualties Comparison</th>
                  <th className="p-3.5">Brief Impact Summary</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1F1F]">
                {paginatedBattles.map((battle) => {
                  const lossA = parseMilitaryMetric(battle.casualtiesA);
                  const lossB = parseMilitaryMetric(battle.casualtiesB);
                  const valA = lossA.parsedValue || 1;
                  const valB = lossB.parsedValue || 1;
                  const total = valA + valB;
                  const pctA = Math.round((valA / total) * 100);

                  const isVictorA = battle.victor === 'A';
                  const isVictorB = battle.victor === 'B';
                  const isInconclusive = battle.victor === 'Inconclusive';
                  const isBlueprintOpen = activeBattleId === battle.id;
                  const isBookmarked = bookmarks.some(b => b.targetId === battle.id && b.type === 'battle');

                  return (
                    <React.Fragment key={battle.id}>
                      <tr 
                        onClick={() => setActiveBattleId(prev => prev === battle.id ? null : battle.id)}
                        className={`transition-colors cursor-pointer ${
                          isBlueprintOpen 
                            ? 'bg-[#1C170E] border-l-4 border-l-[#D4AF37]' 
                            : 'hover:bg-[#151515]'
                        }`}
                      >
                        <td className="p-3.5 font-bold text-white group">
                          <span className="hover:text-[#D4AF37] transition-colors">{battle.name}</span>
                          <div className="text-[10px] text-[#777] font-mono">{battle.location}</div>
                        </td>
                        <td className="p-3.5 text-[#A09890] font-mono whitespace-nowrap">
                          <div className="text-white/90">{battle.dateStr}</div>
                          <div className="text-[10px] text-[#D4AF37]">{battle.era}</div>
                        </td>
                        <td className="p-3.5 text-[#A09890] max-w-[140px] truncate">
                          {battle.war}
                        </td>
                        <td className="p-3.5 text-white/80 max-w-[180px]">
                          <div className="truncate text-white font-medium">
                            {battle.combatantA} vs {battle.combatantB}
                          </div>
                          <div className="truncate text-[10px] text-[#888] font-mono">
                            {battle.commanderA} vs {battle.commanderB}
                          </div>
                        </td>

                        {/* ARMY FORCES & SOLDIERS */}
                        <td className="p-3.5 whitespace-nowrap text-xs font-mono">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-sky-400 font-medium" title={`Army A: ${battle.forcesA}`}>
                              <Users className="w-3 h-3 shrink-0" />
                              <span className="truncate max-w-[130px]">{battle.forcesA || 'Record unlisted'}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-purple-300 font-medium" title={`Army B: ${battle.forcesB}`}>
                              <Users className="w-3 h-3 shrink-0" />
                              <span className="truncate max-w-[130px]">{battle.forcesB || 'Record unlisted'}</span>
                            </div>
                          </div>
                        </td>

                        {/* WIN / LOSS RESULT INDICATOR */}
                        <td className="p-3.5 whitespace-nowrap">
                          <div className="space-y-1">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border ${
                              isInconclusive 
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            }`}>
                              {isInconclusive ? (
                                <Scale className="w-3 h-3 text-amber-400" />
                              ) : (
                                <Trophy className="w-3 h-3 text-emerald-400" />
                              )}
                              {isVictorA 
                                ? `WIN: ${battle.combatantA.split(/[,(]/)[0].trim()}` 
                                : isVictorB 
                                ? `WIN: ${battle.combatantB.split(/[,(]/)[0].trim()}` 
                                : 'DRAW / CONTESTED'}
                            </span>
                            <div className="text-[10px] text-[#A09890] max-w-[150px] truncate">
                              {battle.outcome}
                            </div>
                          </div>
                        </td>

                        {/* CASUALTIES COMPARISON */}
                        <td className="p-3.5 whitespace-nowrap">
                          {battle.casualtiesA && battle.casualtiesB ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                                <span className="text-[#E5A93C] font-semibold">{lossA.displayEstimate}</span>
                                <span className="text-[#666]">vs</span>
                                <span className="text-[#F87171] font-semibold">{lossB.displayEstimate}</span>
                              </div>
                              <div className="w-20 h-1.5 bg-[#222] rounded-full overflow-hidden flex">
                                <div style={{ width: `${Math.max(8, Math.min(92, pctA))}%` }} className="h-full bg-[#E5A93C]" />
                                <div style={{ width: `${Math.max(8, Math.min(92, 100 - pctA))}%` }} className="h-full bg-[#F87171]" />
                              </div>
                            </div>
                          ) : (
                            <span className="text-[#666] text-[10px] font-mono">Fragmented record</span>
                          )}
                        </td>

                        {/* BRIEF IMPACT SUMMARY */}
                        <td className="p-3.5 max-w-xs">
                          <p className="text-xs text-[#C5BDB5] line-clamp-2 leading-relaxed font-sans">
                            {battle.significance}
                          </p>
                        </td>

                        {/* ACTIONS: TACTICAL BLUEPRINT BUTTON & WIKI */}
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveBattleId(prev => prev === battle.id ? null : battle.id);
                              }}
                              className={`px-2.5 py-1 border rounded-lg text-[10px] font-mono font-bold transition-all inline-flex items-center gap-1 cursor-pointer ${
                                isBlueprintOpen
                                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                                  : 'bg-[#1C1811] text-[#D4AF37] border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-black'
                              }`}
                              title="Open Tactical Blueprint in place"
                            >
                              <Crosshair className="w-3 h-3" />
                              <span>{isBlueprintOpen ? 'Close Blueprint' : 'Blueprint'}</span>
                            </button>
                            <a
                              href={battle.wikipediaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-2 py-1 bg-[#141414] hover:bg-[#222] text-[#A09890] hover:text-[#D4AF37] border border-[#2A2A2A] rounded-lg text-[10px] font-mono transition-all inline-flex items-center gap-1"
                            >
                              Wiki <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </td>
                      </tr>

                      {/* IN-PLACE TACTICAL BLUEPRINT ROW FOR TABLE VIEW */}
                      {isBlueprintOpen && (
                        <tr key={`blueprint-panel-${battle.id}`} className="bg-[#0E0C09]">
                          <td colSpan={9} className="p-5 border-y-2 border-[#D4AF37]/60 bg-[#110E0A] shadow-inner">
                            <BattleCard
                              battle={battle}
                              isBookmarked={isBookmarked}
                              isBlueprintOpen={true}
                              onToggleBlueprint={() => setActiveBattleId(null)}
                              onToggleBookmark={onToggleBookmark}
                              onAddNote={onAddNote}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#121212] border border-[#2A2A2A] rounded-xl text-xs text-[#A09890] hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1 font-mono text-xs text-[#A09890]">
            <span className="px-3 py-1 bg-[#1C1811] border border-[#D4AF37]/50 text-[#D4AF37] rounded-lg font-bold">
              {currentPage}
            </span>
            <span className="px-1">/</span>
            <span>{totalPages}</span>
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#121212] border border-[#2A2A2A] rounded-xl text-xs text-[#A09890] hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}
