import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Cell
} from 'recharts';
import { 
  TrendingUp, Globe, Users, Maximize2, Sparkles, Filter, 
  Layers, Shield, AlertCircle, ArrowUpRight, ArrowDownRight, Award, Compass, BarChart2,
  Calendar, Info
} from 'lucide-react';
import { CIVILIZATION_PROFILES, CivilizationHistoricalProfile, CivilizationDataPoint } from '../data/civilizationDemographicsData';
import { playSound } from '../utils/audio';

interface CivilizationRechartsVisualizerProps {
  initialSelectedIds?: string[];
  focusCivilizationId?: string;
  isEmbedded?: boolean; // When rendered inside a Country Detail View
}

type MetricType = 'population' | 'territory' | 'worldSharePct';
type ChartStyleType = 'area' | 'line' | 'bar';
type EraFilter = 'all' | 'ancient_classical' | 'medieval' | 'modern';

export default function CivilizationRechartsVisualizer({
  initialSelectedIds = ['rome', 'china', 'india', 'egypt'],
  focusCivilizationId,
  isEmbedded = false
}: CivilizationRechartsVisualizerProps) {
  // Selected civilizations for multi-comparison
  const [selectedCivilizations, setSelectedCivilizations] = useState<string[]>(() => {
    if (focusCivilizationId) {
      return [focusCivilizationId];
    }
    return initialSelectedIds.length > 0 ? initialSelectedIds : ['rome', 'china', 'india', 'egypt'];
  });

  const [activeMetric, setActiveMetric] = useState<MetricType>('population');
  const [chartStyle, setChartStyle] = useState<ChartStyleType>('area');
  const [eraFilter, setEraFilter] = useState<EraFilter>('all');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<any | null>(null);
  const [activeCivForDeepInsight, setActiveCivForDeepInsight] = useState<string>(
    focusCivilizationId || 'rome'
  );

  // Toggle single civilization selection
  const handleToggleCivilization = (civId: string) => {
    playSound('click');
    if (selectedCivilizations.includes(civId)) {
      if (selectedCivilizations.length === 1) return; // Keep at least one
      setSelectedCivilizations(prev => prev.filter(id => id !== civId));
    } else {
      setSelectedCivilizations(prev => [...prev, civId]);
      setActiveCivForDeepInsight(civId);
    }
  };

  const handleSelectPreset = (preset: 'all' | 'ancient' | 'monarchs' | 'eurasia' | 'east_west') => {
    playSound('click');
    if (preset === 'all') {
      setSelectedCivilizations(CIVILIZATION_PROFILES.map(c => c.id));
    } else if (preset === 'ancient') {
      setSelectedCivilizations(['rome', 'egypt', 'greece', 'china', 'india']);
    } else if (preset === 'eurasia') {
      setSelectedCivilizations(['china', 'mongol', 'rome', 'india']);
    } else if (preset === 'east_west') {
      setSelectedCivilizations(['rome', 'france', 'china', 'india']);
    }
  };

  // Filter and unify years for the time-series chart
  const unifiedChartData = useMemo(() => {
    // 1. Gather all unique years from selected civilizations
    const activeProfiles = CIVILIZATION_PROFILES.filter(p => selectedCivilizations.includes(p.id));
    const allYearsSet = new Set<number>();

    activeProfiles.forEach(prof => {
      prof.dataPoints.forEach(dp => {
        // Era filtering
        if (eraFilter === 'ancient_classical' && dp.year > 500) return;
        if (eraFilter === 'medieval' && (dp.year < 450 || dp.year > 1500)) return;
        if (eraFilter === 'modern' && dp.year < 1500) return;

        allYearsSet.add(dp.year);
      });
    });

    const sortedYears = Array.from(allYearsSet).sort((a, b) => a - b);

    // 2. Build time slices with interpolated or nearest values
    return sortedYears.map(year => {
      const yearLabel = year < 0 ? `${Math.abs(year)} BC` : `${year} AD`;
      const dataRow: Record<string, any> = {
        year,
        yearLabel
      };

      activeProfiles.forEach(prof => {
        // Find exact or closest point
        const exact = prof.dataPoints.find(dp => dp.year === year);
        if (exact) {
          dataRow[prof.id] = exact[activeMetric] ?? null;
          dataRow[`${prof.id}_milestone`] = exact.milestone;
          dataRow[`${prof.id}_desc`] = exact.milestoneDesc;
          dataRow[`${prof.id}_leader`] = exact.rulerOrLeader;
        } else {
          // Find surrounding points to provide smooth continuity
          const sorted = [...prof.dataPoints].sort((a, b) => a.year - b.year);
          const prev = sorted.filter(dp => dp.year <= year).pop();
          const next = sorted.find(dp => dp.year >= year);

          if (prev && next && prev.year !== next.year) {
            // Linear interpolation
            const ratio = (year - prev.year) / (next.year - prev.year);
            const valPrev = prev[activeMetric] || 0;
            const valNext = next[activeMetric] || 0;
            const interpolated = valPrev + ratio * (valNext - valPrev);
            dataRow[prof.id] = Number(interpolated.toFixed(2));
          } else if (prev) {
            dataRow[prof.id] = prev[activeMetric] ?? null;
          } else if (next) {
            dataRow[prof.id] = next[activeMetric] ?? null;
          }
        }
      });

      return dataRow;
    });
  }, [selectedCivilizations, activeMetric, eraFilter]);

  // Bar chart data for peak comparative metrics
  const barPeakData = useMemo(() => {
    const activeProfiles = CIVILIZATION_PROFILES.filter(p => selectedCivilizations.includes(p.id));
    return activeProfiles.map(prof => ({
      name: prof.shortName,
      fullName: prof.name,
      id: prof.id,
      flag: prof.flag,
      color: prof.color,
      peakPopulation: prof.peakPopulation,
      peakTerritory: prof.peakTerritory,
      peakWorldShare: prof.peakWorldShare,
      peakYear: activeMetric === 'territory' ? prof.peakTerritoryYear : prof.peakPopulationYear,
      value: activeMetric === 'population' 
        ? prof.peakPopulation 
        : activeMetric === 'territory' 
        ? prof.peakTerritory 
        : prof.peakWorldShare
    })).sort((a, b) => b.value - a.value);
  }, [selectedCivilizations, activeMetric]);

  const activeProfileInsight = useMemo(() => {
    return CIVILIZATION_PROFILES.find(p => p.id === activeCivForDeepInsight) || CIVILIZATION_PROFILES[0];
  }, [activeCivForDeepInsight]);

  // Metric unit labels
  const getMetricConfig = () => {
    switch (activeMetric) {
      case 'population':
        return {
          title: 'Civilizational Population Over Time',
          unit: 'Million People',
          shortUnit: 'M',
          axisLabel: 'Population (Millions)',
          desc: 'Estimated imperial population living within sovereign territory and subject domains.'
        };
      case 'territory':
        return {
          title: 'Imperial Land Territory Over Time',
          unit: 'Million km²',
          shortUnit: 'M km²',
          axisLabel: 'Land Area (Million km²)',
          desc: 'Peak sovereign geographical landmass governed during respective imperial dynasties.'
        };
      case 'worldSharePct':
        return {
          title: 'Share of Global Human Population',
          unit: '% of World Pop',
          shortUnit: '%',
          axisLabel: 'Global Population Share (%)',
          desc: 'The proportion of all living humans on Earth governed by the respective empire.'
        };
    }
  };

  const metricConfig = getMetricConfig();

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const row = payload[0]?.payload;
    const yearLabel = row?.yearLabel || label;

    return (
      <div className="bg-[#0A0A0A] border-2 border-[#D4AF37]/60 p-4 rounded-xl shadow-2xl max-w-sm text-left font-sans animate-fade-in backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 border-b border-[#222] pb-2 mb-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-serif italic font-bold text-sm text-white">{yearLabel}</span>
          </div>
          <span className="text-[9px] font-mono uppercase bg-[#1A1A1A] text-[#D4AF37] px-2 py-0.5 rounded border border-[#333]">
            {row?.year < 0 ? 'Antiquity BC' : row?.year < 500 ? 'Classical Era' : row?.year < 1500 ? 'Medieval Era' : 'Modern Era'}
          </span>
        </div>

        <div className="space-y-2.5">
          {payload.map((entry: any, i: number) => {
            const civProfile = CIVILIZATION_PROFILES.find(c => c.id === entry.dataKey);
            if (!civProfile) return null;

            const milestone = row[`${entry.dataKey}_milestone`];
            const milestoneDesc = row[`${entry.dataKey}_desc`];
            const leader = row[`${entry.dataKey}_leader`];

            return (
              <div key={i} className="bg-[#111] p-2 rounded-lg border border-[#1F1F1F] space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{civProfile.flag}</span>
                    <span className="text-xs font-bold text-white font-sans">{civProfile.shortName}</span>
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color: civProfile.color }}>
                    {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value} {metricConfig.shortUnit}
                  </span>
                </div>

                {milestone && (
                  <div className="pt-1 border-t border-[#1C1C1C] text-[10.5px]">
                    <div className="text-[#D4AF37] font-semibold flex items-center gap-1">
                      <span>★</span> {milestone}
                    </div>
                    {leader && (
                      <div className="text-[9.5px] text-[#A09890] font-mono">
                        Crown: <span className="text-[#E0D8D0]">{leader}</span>
                      </div>
                    )}
                    {milestoneDesc && (
                      <div className="text-[9.5px] text-[#807870] leading-snug mt-0.5 font-sans">
                        {milestoneDesc}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-6 text-left ${isEmbedded ? '' : 'bg-[#0B0B0B] border border-[#2A2A2A] p-6 sm:p-7 rounded-2xl shadow-xl'}`}>
      
      {/* Header & Metric Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#222] pb-5 text-left">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            <h4 className="font-serif italic font-bold text-white text-lg sm:text-xl flex items-center gap-2">
              Rise & Fall of Civilizations: Demographics & Territory Over Time
            </h4>
          </div>
          <p className="text-xs text-[#A09890] max-w-3xl leading-relaxed mt-1 font-sans">
            Interactive analytical charts powered by Recharts comparing imperial population, sovereign land territory size, and global demographic shares across 5,000 years of recorded history.
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex flex-wrap items-center bg-[#070707] p-1 rounded-xl border border-[#222] self-start lg:self-auto gap-1">
          <button
            onClick={() => { setActiveMetric('population'); playSound('click'); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMetric === 'population'
                ? 'bg-[#D4AF37] text-black shadow-md font-extrabold'
                : 'text-[#A09890] hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Population (M)
          </button>
          <button
            onClick={() => { setActiveMetric('territory'); playSound('click'); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMetric === 'territory'
                ? 'bg-[#D4AF37] text-black shadow-md font-extrabold'
                : 'text-[#A09890] hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Territory (M km²)
          </button>
          <button
            onClick={() => { setActiveMetric('worldSharePct'); playSound('click'); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMetric === 'worldSharePct'
                ? 'bg-[#D4AF37] text-black shadow-md font-extrabold'
                : 'text-[#A09890] hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            World Share (%)
          </button>
        </div>
      </div>

      {/* Control Toolbar: Civilization Selector Pills & Presets */}
      <div className="space-y-3 bg-[#080808] p-4 rounded-xl border border-[#1E1E1E]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#A09890] font-mono uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Select Civilizations to Graph:</span>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
            <span className="text-[#666]">Presets:</span>
            <button
              onClick={() => handleSelectPreset('all')}
              className="px-2 py-0.5 bg-[#141414] hover:bg-[#222] text-[#A09890] hover:text-white rounded border border-[#2A2A2A] cursor-pointer"
            >
              All Civilizations
            </button>
            <button
              onClick={() => handleSelectPreset('ancient')}
              className="px-2 py-0.5 bg-[#141414] hover:bg-[#222] text-[#A09890] hover:text-white rounded border border-[#2A2A2A] cursor-pointer"
            >
              Antiquity Giants
            </button>
            <button
              onClick={() => handleSelectPreset('eurasia')}
              className="px-2 py-0.5 bg-[#141414] hover:bg-[#222] text-[#A09890] hover:text-white rounded border border-[#2A2A2A] cursor-pointer"
            >
              Steppe & Silk Road
            </button>
            <button
              onClick={() => handleSelectPreset('east_west')}
              className="px-2 py-0.5 bg-[#141414] hover:bg-[#222] text-[#A09890] hover:text-white rounded border border-[#2A2A2A] cursor-pointer"
            >
              East vs. West
            </button>
          </div>
        </div>

        {/* Civilizations Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {CIVILIZATION_PROFILES.map(civ => {
            const isSelected = selectedCivilizations.includes(civ.id);
            return (
              <button
                key={civ.id}
                onClick={() => handleToggleCivilization(civ.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#181818] text-white shadow-lg ring-1'
                    : 'bg-[#0E0E0E] text-[#706860] border-[#1C1C1C] hover:border-[#333] hover:text-[#A09890]'
                }`}
                style={{
                  borderColor: isSelected ? civ.color : '#1C1C1C',
                  boxShadow: isSelected ? `0 0 10px ${civ.color}25` : undefined
                }}
              >
                <span className="text-base">{civ.flag}</span>
                <span>{civ.shortName}</span>
                <span 
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0" 
                  style={{ backgroundColor: isSelected ? civ.color : '#444' }} 
                />
              </button>
            );
          })}
        </div>

        {/* Era Filter & Chart Style Sub-Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-[#181818]">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10.5px] text-[#A09890] font-mono mr-1">Time Horizon:</span>
            <button
              onClick={() => setEraFilter('all')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer ${
                eraFilter === 'all' ? 'bg-[#D4AF37] text-black font-bold' : 'bg-[#141414] text-[#A09890] hover:text-white'
              }`}
            >
              3000 BC – Present
            </button>
            <button
              onClick={() => setEraFilter('ancient_classical')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer ${
                eraFilter === 'ancient_classical' ? 'bg-[#D4AF37] text-black font-bold' : 'bg-[#141414] text-[#A09890] hover:text-white'
              }`}
            >
              Ancient & Classical (–500 AD)
            </button>
            <button
              onClick={() => setEraFilter('medieval')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer ${
                eraFilter === 'medieval' ? 'bg-[#D4AF37] text-black font-bold' : 'bg-[#141414] text-[#A09890] hover:text-white'
              }`}
            >
              Medieval (500–1500 AD)
            </button>
            <button
              onClick={() => setEraFilter('modern')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer ${
                eraFilter === 'modern' ? 'bg-[#D4AF37] text-black font-bold' : 'bg-[#141414] text-[#A09890] hover:text-white'
              }`}
            >
              Modern Era (1500+ AD)
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#121212] p-1 rounded-lg border border-[#222]">
            <button
              onClick={() => setChartStyle('area')}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded cursor-pointer flex items-center gap-1 ${
                chartStyle === 'area' ? 'bg-[#252525] text-[#D4AF37] border border-[#3A3A3A]' : 'text-[#888] hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" /> Area Stream
            </button>
            <button
              onClick={() => setChartStyle('line')}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded cursor-pointer flex items-center gap-1 ${
                chartStyle === 'line' ? 'bg-[#252525] text-[#D4AF37] border border-[#3A3A3A]' : 'text-[#888] hover:text-white'
              }`}
            >
              <TrendingUp className="w-3 h-3" /> Trajectories
            </button>
            <button
              onClick={() => setChartStyle('bar')}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded cursor-pointer flex items-center gap-1 ${
                chartStyle === 'bar' ? 'bg-[#252525] text-[#D4AF37] border border-[#3A3A3A]' : 'text-[#888] hover:text-white'
              }`}
            >
              <BarChart2 className="w-3 h-3" /> Peak Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Recharts Graph Visualizer */}
      <div className="bg-[#050505] border border-[#1F1F1F] rounded-2xl p-4 sm:p-6 relative text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h5 className="font-serif italic font-bold text-white text-base flex items-center gap-2">
              {metricConfig.title}
            </h5>
            <span className="text-[11px] text-[#A09890] font-mono">{metricConfig.desc}</span>
          </div>
          <span className="text-[10px] font-mono bg-[#141414] text-[#D4AF37] px-2.5 py-1 rounded border border-[#222] self-start sm:self-auto">
            Units: {metricConfig.unit}
          </span>
        </div>

        {/* Graph Container */}
        <div className="w-full h-[360px] sm:h-[420px]">
          {chartStyle === 'bar' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barPeakData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 40, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" />
                <XAxis 
                  type="number" 
                  stroke="#777" 
                  tick={{ fill: '#A09890', fontSize: 11, fontFamily: 'monospace' }}
                  unit={` ${metricConfig.shortUnit}`}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#777" 
                  tick={{ fill: '#E0D8D0', fontSize: 12, fontFamily: 'serif', fontWeight: 'bold' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  radius={[0, 8, 8, 0]}
                  onClick={(entry) => setActiveCivForDeepInsight(entry.id)}
                  cursor="pointer"
                >
                  {barPeakData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : chartStyle === 'area' ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={unifiedChartData}
                margin={{ top: 15, right: 25, left: 0, bottom: 20 }}
              >
                <defs>
                  {CIVILIZATION_PROFILES.map(civ => (
                    <linearGradient key={civ.gradientId} id={civ.gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={civ.color} stopOpacity={0.45} />
                      <stop offset="95%" stopColor={civ.color} stopOpacity={0.02} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#181818" />
                <XAxis 
                  dataKey="yearLabel" 
                  stroke="#666" 
                  tick={{ fill: '#A09890', fontSize: 10.5, fontFamily: 'monospace' }}
                  tickMargin={10}
                />
                <YAxis 
                  stroke="#666" 
                  tick={{ fill: '#A09890', fontSize: 11, fontFamily: 'monospace' }}
                  tickMargin={8}
                  unit={` ${metricConfig.shortUnit}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  formatter={(value) => {
                    const prof = CIVILIZATION_PROFILES.find(p => p.id === value);
                    return <span className="text-xs font-semibold text-[#E0D8D0]">{prof?.flag} {prof?.shortName || value}</span>;
                  }}
                />
                {selectedCivilizations.map(civId => {
                  const civ = CIVILIZATION_PROFILES.find(c => c.id === civId);
                  if (!civ) return null;
                  return (
                    <Area
                      key={civ.id}
                      type="monotone"
                      dataKey={civ.id}
                      name={civ.id}
                      stroke={civ.color}
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill={`url(#${civ.gradientId})`}
                      dot={{ r: 2.5, fill: civ.color, strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: '#fff', stroke: civ.color, strokeWidth: 2 }}
                    />
                  );
                })}
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={unifiedChartData}
                margin={{ top: 15, right: 25, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#181818" />
                <XAxis 
                  dataKey="yearLabel" 
                  stroke="#666" 
                  tick={{ fill: '#A09890', fontSize: 10.5, fontFamily: 'monospace' }}
                  tickMargin={10}
                />
                <YAxis 
                  stroke="#666" 
                  tick={{ fill: '#A09890', fontSize: 11, fontFamily: 'monospace' }}
                  tickMargin={8}
                  unit={` ${metricConfig.shortUnit}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  formatter={(value) => {
                    const prof = CIVILIZATION_PROFILES.find(p => p.id === value);
                    return <span className="text-xs font-semibold text-[#E0D8D0]">{prof?.flag} {prof?.shortName || value}</span>;
                  }}
                />
                {selectedCivilizations.map(civId => {
                  const civ = CIVILIZATION_PROFILES.find(c => c.id === civId);
                  if (!civ) return null;
                  return (
                    <Line
                      key={civ.id}
                      type="monotone"
                      dataKey={civ.id}
                      name={civ.id}
                      stroke={civ.color}
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: civ.color }}
                      activeDot={{ r: 7, fill: '#fff', stroke: civ.color, strokeWidth: 2 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Deep-Dive Civilizational Analysis Card */}
      <div className="bg-[#0E0E0E] border border-[#222] p-5 sm:p-6 rounded-2xl space-y-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C1C1C] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A]">{activeProfileInsight.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-serif italic font-bold text-white text-base sm:text-lg">
                  {activeProfileInsight.name}
                </h5>
                <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                  {activeProfileInsight.region}
                </span>
              </div>
              <p className="text-xs text-[#A09890] mt-0.5 font-sans">
                Peak Zenith Analysis: Dynamics of Ascendancy, Structural Governance, and Collapse Catalysts
              </p>
            </div>
          </div>

          {/* Civilizations Quick Switcher */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-[#777] font-mono">Inspect:</span>
            {CIVILIZATION_PROFILES.map(civ => (
              <button
                key={civ.id}
                onClick={() => { setActiveCivForDeepInsight(civ.id); playSound('click'); }}
                className={`px-2.5 py-1 text-xs rounded font-serif italic cursor-pointer transition-all ${
                  activeCivForDeepInsight === civ.id
                    ? 'bg-[#D4AF37] text-black font-bold shadow'
                    : 'bg-[#181818] text-[#A09890] hover:text-white border border-[#262626]'
                }`}
              >
                {civ.flag} {civ.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#050505] p-4 rounded-xl border border-[#1A1A1A] space-y-1 text-left">
            <div className="flex items-center justify-between text-xs text-[#A09890] font-mono">
              <span>👑 Territorial Peak</span>
              <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
            <div className="text-2xl font-serif italic font-bold text-[#D4AF37]">
              {activeProfileInsight.peakTerritory} <span className="text-sm font-mono text-white">M km²</span>
            </div>
            <div className="text-[11px] text-[#A09890] font-mono">
              Era: <span className="text-white font-semibold">{activeProfileInsight.peakTerritoryYear}</span> ({activeProfileInsight.peakTerritoryEra})
            </div>
          </div>

          <div className="bg-[#050505] p-4 rounded-xl border border-[#1A1A1A] space-y-1 text-left">
            <div className="flex items-center justify-between text-xs text-[#A09890] font-mono">
              <span>👥 Demographic Peak</span>
              <Users className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-serif italic font-bold text-emerald-400">
              {activeProfileInsight.peakPopulation} <span className="text-sm font-mono text-white">Million</span>
            </div>
            <div className="text-[11px] text-[#A09890] font-mono">
              Peak Century: <span className="text-white font-semibold">{activeProfileInsight.peakPopulationYear}</span>
            </div>
          </div>

          <div className="bg-[#050505] p-4 rounded-xl border border-[#1A1A1A] space-y-1 text-left">
            <div className="flex items-center justify-between text-xs text-[#A09890] font-mono">
              <span>🌐 Max Share of World Pop</span>
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-serif italic font-bold text-cyan-400">
              ~{activeProfileInsight.peakWorldShare}%
            </div>
            <div className="text-[11px] text-[#A09890] font-mono">
              Global Human Proportion under Imperial Sovereign Reign
            </div>
          </div>
        </div>

        {/* Historical Qualitative Breakdown: Rise vs Fall Factors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#050505] p-4 rounded-xl border border-[#1C1C1C] space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              <span>Primary Rise & Hegemony Catalyst</span>
            </div>
            <p className="text-xs text-[#A09890] leading-relaxed font-sans">
              {activeProfileInsight.riseFactor}
            </p>
          </div>

          <div className="bg-[#050505] p-4 rounded-xl border border-[#1C1C1C] space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
              <ArrowDownRight className="w-4 h-4 text-rose-400" />
              <span>Primary Decline & Collapse Vector</span>
            </div>
            <p className="text-xs text-[#A09890] leading-relaxed font-sans">
              {activeProfileInsight.fallFactor}
            </p>
          </div>

          <div className="bg-[#050505] p-4 rounded-xl border border-[#1C1C1C] space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Enduring World Heritage Legacy</span>
            </div>
            <p className="text-xs text-[#A09890] leading-relaxed font-sans">
              {activeProfileInsight.enduringLegacy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
