import { HistoricalBattle } from '../types';

export interface ParsedMilitaryMetric {
  parsedValue: number | null;
  displayEstimate: string;
  originalText: string;
  isApproximate: boolean;
}

export interface BattleMetricComparison {
  available: boolean;
  metricType: 'casualties' | 'forces';
  label: string;
  valA: number | null;
  valB: number | null;
  displayA: string;
  displayB: string;
  rawA: string;
  rawB: string;
  pctA: number;
  pctB: number;
  ratioText: string;
  ratioBadgeType: 'a_higher' | 'b_higher' | 'parity' | 'unknown';
}

export interface BattleAttritionRate {
  hasAttritionData: boolean;
  attritionPctA: number | null;
  attritionPctB: number | null;
  displayRateA: string;
  displayRateB: string;
}

/**
 * Parses historical military strength and casualties text into calculated numbers
 * Handles ranges (e.g. "~5,000–8,000" -> 6,500), multi-unit sums (e.g. "192 Athenians, 11 Plataeans" -> 203),
 * millions/thousands, and qualitative phrases.
 */
export function parseMilitaryMetric(str?: string): ParsedMilitaryMetric {
  if (!str || !str.trim()) {
    return {
      parsedValue: null,
      displayEstimate: 'N/A',
      originalText: '',
      isApproximate: false,
    };
  }

  const cleanStr = str.trim();
  const lower = cleanStr.toLowerCase();

  // Check for million / M representation (e.g., "1.1 million", "2M")
  const millionMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:million|m\b)/i);
  if (millionMatch) {
    const val = Math.round(parseFloat(millionMatch[1]) * 1000000);
    return {
      parsedValue: val,
      displayEstimate: formatBattleNumber(val),
      originalText: cleanStr,
      isApproximate: cleanStr.includes('~') || cleanStr.includes('c.') || cleanStr.includes('est') || cleanStr.includes('+'),
    };
  }

  // Find numbers with optional thousand commas (e.g., 55,000 or 192)
  const numberMatches = cleanStr.match(/\d{1,3}(?:,\d{3})+|\d+/g);

  if (!numberMatches || numberMatches.length === 0) {
    // Qualitative descriptors fallback
    let estVal: number | null = null;
    if (lower.includes('light') || lower.includes('minimal') || lower.includes('low')) {
      estVal = 600;
    } else if (lower.includes('moderate')) {
      estVal = 3000;
    } else if (lower.includes('heavy') || lower.includes('severe') || lower.includes('catastrophic')) {
      estVal = 15000;
    }
    return {
      parsedValue: estVal,
      displayEstimate: estVal ? `~${formatBattleNumber(estVal)}` : cleanStr,
      originalText: cleanStr,
      isApproximate: true,
    };
  }

  // Convert matched text pieces into positive numbers
  const numbers = numberMatches
    .map((n) => parseInt(n.replace(/,/g, ''), 10))
    .filter((n) => !isNaN(n) && n > 0);

  if (numbers.length === 0) {
    return {
      parsedValue: null,
      displayEstimate: cleanStr,
      originalText: cleanStr,
      isApproximate: false,
    };
  }

  // Check if string represents a range between two numbers: e.g. "5,000–8,000" or "40,000-50,000"
  const isRange = /[-–—to]/i.test(cleanStr) && numbers.length === 2 && Math.abs(numbers[0] - numbers[1]) < Math.max(numbers[0], numbers[1]);

  let finalVal = 0;
  if (isRange) {
    finalVal = Math.round((numbers[0] + numbers[1]) / 2);
  } else if (cleanStr.includes('+') || cleanStr.includes('and') || (cleanStr.includes(',') && numbers.length > 1)) {
    // Check if it's multiple component figures: e.g., "192 Athenians, 11 Plataeans"
    finalVal = numbers.reduce((acc, curr) => acc + curr, 0);
  } else {
    finalVal = numbers[0];
  }

  return {
    parsedValue: finalVal,
    displayEstimate: formatBattleNumber(finalVal),
    originalText: cleanStr,
    isApproximate: cleanStr.includes('~') || isRange || cleanStr.includes('+') || cleanStr.includes('c.') || cleanStr.includes('est'),
  };
}

/**
 * Human-friendly compact number formatter
 */
export function formatBattleNumber(num: number): string {
  if (num >= 1000000) {
    const m = num / 1000000;
    return `${m.toFixed(m >= 10 || m % 1 === 0 ? 1 : 2)}M`;
  }
  if (num >= 10000) {
    const k = num / 1000;
    return `${k.toFixed(k >= 100 || k % 1 === 0 ? 0 : 1)}k`;
  }
  if (num >= 1000) {
    return num.toLocaleString();
  }
  return num.toString();
}

/**
 * Compute comparative metrics (Casualties or Troop Forces) for a historical battle
 */
export function getBattleComparisonData(
  battle: HistoricalBattle,
  metricType: 'casualties' | 'forces'
): BattleMetricComparison {
  const isCasualties = metricType === 'casualties';
  const rawA = isCasualties ? battle.casualtiesA || '' : battle.forcesA || '';
  const rawB = isCasualties ? battle.casualtiesB || '' : battle.forcesB || '';

  const parsedA = parseMilitaryMetric(rawA);
  const parsedB = parseMilitaryMetric(rawB);

  const valA = parsedA.parsedValue;
  const valB = parsedB.parsedValue;

  const hasData = (valA !== null && valA > 0) || (valB !== null && valB > 0) || Boolean(rawA && rawB);

  if (!hasData) {
    return {
      available: false,
      metricType,
      label: isCasualties ? 'Casualties Comparison' : 'Force Strength Comparison',
      valA: null,
      valB: null,
      displayA: 'N/A',
      displayB: 'N/A',
      rawA: rawA || 'Not recorded',
      rawB: rawB || 'Not recorded',
      pctA: 50,
      pctB: 50,
      ratioText: 'Insufficient historical data recorded',
      ratioBadgeType: 'unknown',
    };
  }

  // Calculate percentages
  let pctA = 50;
  let pctB = 50;
  let ratioText = 'Parity (~1:1 ratio)';
  let ratioBadgeType: 'a_higher' | 'b_higher' | 'parity' | 'unknown' = 'parity';

  if (valA !== null && valB !== null && valA + valB > 0) {
    const total = valA + valB;
    pctA = Math.round((valA / total) * 1000) / 10;
    pctB = Math.round((valB / total) * 1000) / 10;

    // Guard against 0% visual collapse
    if (pctA > 0 && pctA < 4) pctA = 4;
    if (pctB > 0 && pctB < 4) pctB = 4;

    const higherVal = Math.max(valA, valB);
    const lowerVal = Math.max(Math.min(valA, valB), 1);
    const ratio = (higherVal / lowerVal).toFixed(1);

    const combAShort = battle.combatantA.split(' ')[0];
    const combBShort = battle.combatantB.split(' ')[0];

    if (valA > valB * 1.08) {
      ratioBadgeType = 'a_higher';
      ratioText = isCasualties
        ? `${combAShort} losses ${ratio}× higher`
        : `${combAShort} held ${ratio}× troop advantage`;
    } else if (valB > valA * 1.08) {
      ratioBadgeType = 'b_higher';
      ratioText = isCasualties
        ? `${combBShort} losses ${ratio}× higher`
        : `${combBShort} held ${ratio}× troop advantage`;
    } else {
      ratioBadgeType = 'parity';
      ratioText = isCasualties ? 'Roughly balanced losses' : 'Roughly equal force parity';
    }
  }

  return {
    available: true,
    metricType,
    label: isCasualties ? 'Casualties Comparison' : 'Force Strength Comparison',
    valA,
    valB,
    displayA: parsedA.displayEstimate !== 'N/A' ? parsedA.displayEstimate : rawA,
    displayB: parsedB.displayEstimate !== 'N/A' ? parsedB.displayEstimate : rawB,
    rawA,
    rawB,
    pctA,
    pctB,
    ratioText,
    ratioBadgeType,
  };
}

/**
 * Calculates historical attrition percentage (% of initial force lost)
 */
export function getBattleAttritionData(battle: HistoricalBattle): BattleAttritionRate {
  if (!battle.forcesA || !battle.forcesB || !battle.casualtiesA || !battle.casualtiesB) {
    return {
      hasAttritionData: false,
      attritionPctA: null,
      attritionPctB: null,
      displayRateA: 'N/A',
      displayRateB: 'N/A',
    };
  }

  const forceA = parseMilitaryMetric(battle.forcesA).parsedValue;
  const forceB = parseMilitaryMetric(battle.forcesB).parsedValue;
  const lossA = parseMilitaryMetric(battle.casualtiesA).parsedValue;
  const lossB = parseMilitaryMetric(battle.casualtiesB).parsedValue;

  if (forceA && forceB && lossA !== null && lossB !== null && forceA > 0 && forceB > 0) {
    const rateA = Math.min(100, Math.round((lossA / forceA) * 1000) / 10);
    const rateB = Math.min(100, Math.round((lossB / forceB) * 1000) / 10);

    return {
      hasAttritionData: true,
      attritionPctA: rateA,
      attritionPctB: rateB,
      displayRateA: `${rateA}% of force`,
      displayRateB: `${rateB}% of force`,
    };
  }

  return {
    hasAttritionData: false,
    attritionPctA: null,
    attritionPctB: null,
    displayRateA: 'N/A',
    displayRateB: 'N/A',
  };
}
