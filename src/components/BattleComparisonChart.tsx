import React, { useState } from 'react';
import { HistoricalBattle } from '../types';
import { 
  getBattleComparisonData, 
  getBattleAttritionData, 
  BattleMetricComparison 
} from '../utils/battleStats';
import { Users, AlertTriangle, Scale, ShieldAlert, Crosshair, ArrowRight } from 'lucide-react';

interface BattleComparisonChartProps {
  battle: HistoricalBattle;
  mode?: 'compact' | 'expanded';
  initialMetric?: 'casualties' | 'forces';
  showToggle?: boolean;
}

export default function BattleComparisonChart({
  battle,
  mode = 'compact',
  initialMetric = 'casualties',
  showToggle = true,
}: BattleComparisonChartProps) {
  // Check which metrics exist
  const hasCasualties = Boolean(battle.casualtiesA || battle.casualtiesB);
  const hasForces = Boolean(battle.forcesA || battle.forcesB);

  // Preferred metric fallback
  const defaultMetric: 'casualties' | 'forces' = 
    initialMetric === 'forces' && hasForces ? 'forces' : hasCasualties ? 'casualties' : hasForces ? 'forces' : 'casualties';

  const [activeMetric, setActiveMetric] = useState<'casualties' | 'forces'>(defaultMetric);

  const comparison: BattleMetricComparison = getBattleComparisonData(battle, activeMetric);
  const attrition = getBattleAttritionData(battle);

  // If no data exists at all
  if (!comparison.available && !hasCasualties && !hasForces) {
    return (
      <div className="bg-[#121212]/80 border border-[#222] rounded-xl px-3 py-2 text-[10px] text-[#8A827A] font-mono flex items-center gap-1.5">
        <Scale className="w-3 h-3 text-[#D4AF37]/50" />
        <span>Military forces & casualty metrics: Historical records fragmented</span>
      </div>
    );
  }

  const isCasualty = activeMetric === 'casualties';
  const combAShort = battle.combatantA.length > 20 ? battle.combatantA.split(/[,(]/)[0].trim() : battle.combatantA;
  const combBShort = battle.combatantB.length > 20 ? battle.combatantB.split(/[,(]/)[0].trim() : battle.combatantB;

  // Victor styling
  const isVictorA = battle.victor === 'A';
  const isVictorB = battle.victor === 'B';

  // Bar colors
  // Side A: Gold/Cyan, Side B: Crimson/Orange
  const colorA = isCasualty ? '#E5A93C' : '#38BDF8';
  const colorB = isCasualty ? '#F87171' : '#A78BFA';

  if (mode === 'compact') {
    return (
      <div 
        className="bg-[#12110F] border border-[#26221B] hover:border-[#3D3526] rounded-xl p-3 space-y-2.5 transition-all text-left"
        onClick={(e) => e.stopPropagation()} // Prevent triggering parent modal if user clicks inside comparison controls
      >
        {/* Metric Header & Toggle Pills */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase">
            {isCasualty ? (
              <AlertTriangle className="w-3 h-3 text-[#F87171]" />
            ) : (
              <Users className="w-3 h-3 text-[#38BDF8]" />
            )}
            <span className={isCasualty ? 'text-[#FCA5A5]' : 'text-[#7DD3FC]'}>
              {isCasualty ? 'Casualties Ratio' : 'Force Strength'}
            </span>
          </div>

          {/* Toggle pill between Casualties and Forces */}
          {showToggle && hasCasualties && hasForces && (
            <div className="inline-flex bg-[#0A0A0A] border border-[#2A2A2A] p-0.5 rounded-lg text-[9px] font-mono">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMetric('casualties');
                }}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-bold ${
                  activeMetric === 'casualties'
                    ? 'bg-[#E5A93C] text-black shadow-sm'
                    : 'text-[#A09890] hover:text-white'
                }`}
              >
                Losses
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMetric('forces');
                }}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-bold ${
                  activeMetric === 'forces'
                    ? 'bg-[#38BDF8] text-black shadow-sm'
                    : 'text-[#A09890] hover:text-white'
                }`}
              >
                Forces
              </button>
            </div>
          )}
        </div>

        {/* Comparative Numbers Row */}
        <div className="flex items-baseline justify-between text-xs font-mono">
          <div className="truncate max-w-[48%]">
            <span className="text-[11px] text-[#CCC] font-sans font-medium block truncate">
              {combAShort}
              {isVictorA && <span className="text-[#D4AF37] ml-1 font-bold text-[9px]">★</span>}
            </span>
            <span className="font-bold text-[12px] text-[#E5A93C]">
              {comparison.displayA}
            </span>
            {comparison.valA !== null && comparison.pctA !== undefined && (
              <span className="text-[10px] text-[#8E867C] ml-1 font-sans">
                ({comparison.pctA}%)
              </span>
            )}
          </div>

          <div className="truncate max-w-[48%] text-right">
            <span className="text-[11px] text-[#CCC] font-sans font-medium block truncate">
              {isVictorB && <span className="text-[#D4AF37] mr-1 font-bold text-[9px]">★</span>}
              {combBShort}
            </span>
            <span className="font-bold text-[12px] text-[#F87171]">
              {comparison.displayB}
            </span>
            {comparison.valB !== null && comparison.pctB !== undefined && (
              <span className="text-[10px] text-[#8E867C] ml-1 font-sans">
                ({comparison.pctB}%)
              </span>
            )}
          </div>
        </div>

        {/* Dual Stacked Progress Bar */}
        <div className="h-2.5 w-full bg-[#0A0A0A] border border-[#242018] rounded-full overflow-hidden flex p-0.5 gap-0.5">
          <div
            className="h-full rounded-l-full transition-all duration-500 relative group/barA"
            style={{
              width: `${comparison.pctA}%`,
              backgroundColor: colorA,
            }}
            title={`Side A: ${comparison.rawA}`}
          />
          <div
            className="h-full rounded-r-full transition-all duration-500 relative group/barB"
            style={{
              width: `${comparison.pctB}%`,
              backgroundColor: colorB,
            }}
            title={`Side B: ${comparison.rawB}`}
          />
        </div>

        {/* Disparity / Analysis Insight Footer */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#A09890] pt-0.5">
          <span className="truncate max-w-[85%] text-[#D4AF37]/90 font-medium">
            {comparison.ratioText}
          </span>
          <span className="text-[9px] text-[#7A7268] uppercase shrink-0">
            {activeMetric === 'casualties' ? 'Loss Differential' : 'Force Ratio'}
          </span>
        </div>
      </div>
    );
  }

  // Expanded View (For detail modal)
  return (
    <div className="bg-[#12110E] border border-[#2E281F] rounded-2xl p-5 sm:p-6 space-y-5 text-left shadow-lg">
      
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#241F17] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-[#1C1811] border border-[#D4AF37]/40 rounded-xl text-[#D4AF37]">
            <Scale className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-serif italic font-bold text-base text-[#D4AF37]">
              Tactical Balance of Power & Casualty Analysis
            </h4>
            <p className="text-[11px] text-[#A09890] font-sans">
              Comparative engagement ratio between opposing armed forces and estimated battlefield losses.
            </p>
          </div>
        </div>

        {/* Metric Selector Buttons */}
        {hasCasualties && hasForces && (
          <div className="flex items-center gap-1.5 bg-[#0A0A0A] border border-[#2A2A2A] p-1 rounded-xl text-xs font-mono self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveMetric('casualties')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMetric === 'casualties'
                  ? 'bg-[#E5A93C] text-black shadow-md'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Casualties
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric('forces')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMetric === 'forces'
                  ? 'bg-[#38BDF8] text-black shadow-md'
                  : 'text-[#A09890] hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Troop Strength
            </button>
          </div>
        )}
      </div>

      {/* Main Comparative Metric Visual */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="space-y-0.5">
            <span className="text-xs text-white font-bold block">{battle.combatantA}</span>
            <span className="text-lg font-bold font-mono text-[#E5A93C]">
              {comparison.displayA}
            </span>
            <span className="text-[11px] text-[#8E867C] ml-1.5 font-sans">
              ({comparison.pctA}% of total {activeMetric})
            </span>
          </div>

          <div className="space-y-0.5 text-right">
            <span className="text-xs text-white font-bold block">{battle.combatantB}</span>
            <span className="text-lg font-bold font-mono text-[#F87171]">
              {comparison.displayB}
            </span>
            <span className="text-[11px] text-[#8E867C] ml-1.5 font-sans">
              ({comparison.pctB}% of total {activeMetric})
            </span>
          </div>
        </div>

        {/* Large Multi-tone Comparison Bar */}
        <div className="h-4 w-full bg-[#0A0A0A] border border-[#242018] rounded-xl overflow-hidden flex p-0.5 gap-1 shadow-inner">
          <div
            className="h-full rounded-l-lg transition-all duration-700 flex items-center justify-center text-[10px] font-mono font-bold text-black"
            style={{
              width: `${comparison.pctA}%`,
              backgroundColor: colorA,
            }}
          >
            {comparison.pctA >= 15 ? `${comparison.pctA}%` : ''}
          </div>
          <div
            className="h-full rounded-r-lg transition-all duration-700 flex items-center justify-center text-[10px] font-mono font-bold text-black"
            style={{
              width: `${comparison.pctB}%`,
              backgroundColor: colorB,
            }}
          >
            {comparison.pctB >= 15 ? `${comparison.pctB}%` : ''}
          </div>
        </div>

        {/* Textual descriptions from historical documents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-[#171512] border border-[#252018] p-3 rounded-xl">
            <span className="text-[10px] font-mono text-[#8E867C] block uppercase">
              {battle.combatantA} Historical Record
            </span>
            <p className="text-xs text-[#E5A93C] font-mono mt-0.5 font-medium">
              {comparison.rawA || 'Record not cataloged'}
            </p>
          </div>
          <div className="bg-[#171512] border border-[#252018] p-3 rounded-xl">
            <span className="text-[10px] font-mono text-[#8E867C] block uppercase">
              {battle.combatantB} Historical Record
            </span>
            <p className="text-xs text-[#F87171] font-mono mt-0.5 font-medium">
              {comparison.rawB || 'Record not cataloged'}
            </p>
          </div>
        </div>
      </div>

      {/* Strategic Differential Card */}
      <div className="p-3.5 bg-gradient-to-r from-[#1A1610] to-[#14120E] border border-[#D4AF37]/35 rounded-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Crosshair className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <div className="text-xs font-mono">
            <span className="text-[#8E867C] block text-[10px] uppercase">Calculated Disparity Ratio</span>
            <strong className="text-white">{comparison.ratioText}</strong>
          </div>
        </div>

        {battle.victor !== 'Inconclusive' && (
          <div className="text-right text-[11px] font-mono">
            <span className="text-[#8E867C] block text-[10px] uppercase">Declared Victor</span>
            <span className="text-[#D4AF37] font-bold">
              Side {battle.victor}: {battle.victor === 'A' ? combAShort : combBShort}
            </span>
          </div>
        )}
      </div>

      {/* Attrition Percentage Rate if both Forces and Losses are known */}
      {attrition.hasAttritionData && (
        <div className="bg-[#14120E] border border-[#221D14] p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Estimated Force Attrition Rate</span>
          </div>
          <p className="text-[11px] text-[#A09890] font-sans">
            Proportion of initially mobilized forces wounded, captured, or killed in action during this engagement:
          </p>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-2.5 bg-[#0E0C0A] border border-[#221D14] rounded-lg">
              <span className="text-[10px] text-[#8E867C] font-mono block truncate">{combAShort}</span>
              <span className="text-sm font-bold font-mono text-[#E5A93C]">{attrition.displayRateA}</span>
            </div>
            <div className="p-2.5 bg-[#0E0C0A] border border-[#221D14] rounded-lg">
              <span className="text-[10px] text-[#8E867C] font-mono block truncate">{combBShort}</span>
              <span className="text-sm font-bold font-mono text-[#F87171]">{attrition.displayRateB}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
