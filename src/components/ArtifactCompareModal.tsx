import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale,
  X,
  ArrowRightLeft,
  Calendar,
  MapPin,
  Building2,
  Sparkles,
  Layers,
  ChevronDown,
  Globe2,
  Hourglass,
  CheckCircle2,
  Eye,
  BookOpen
} from 'lucide-react';
import { DailyArtifact, WorldMonumentOrArtifact } from '../types';
import { ALL_DAILY_ARTIFACTS } from '../data/dailyArtifacts';
import { ALL_WORLD_MONUMENTS } from '../data/monuments';
import { getArtifactProvenance } from '../data/artifactProvenanceData';

interface ArtifactCompareModalProps {
  artifact: DailyArtifact;
  isOpen: boolean;
  onClose: () => void;
  onSelectArtifact?: (id: string) => void;
}

interface VaultComparisonItem {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  era: string;
  periodYear: string;
  origin: string;
  currentLocation: string;
  material: string;
  dimensions: string;
  significance: string;
  imageUrl?: string;
  isDailyArtifact: boolean;
}

export const ArtifactCompareModal: React.FC<ArtifactCompareModalProps> = ({
  artifact,
  isOpen,
  onClose,
  onSelectArtifact
}) => {
  const provenance = useMemo(() => getArtifactProvenance(artifact.id), [artifact.id]);

  // Build a list of candidate comparison items from daily artifacts and monuments
  const candidateVaultItems: VaultComparisonItem[] = useMemo(() => {
    const list: VaultComparisonItem[] = [];

    // 1. Add other daily artifacts (different from current)
    ALL_DAILY_ARTIFACTS.forEach((item) => {
      if (item.id !== artifact.id) {
        list.push({
          id: item.id,
          name: item.name,
          subtitle: item.subtitle,
          category: item.category,
          era: item.era,
          periodYear: item.periodYear,
          origin: item.origin,
          currentLocation: `${item.currentLocation.museum}, ${item.currentLocation.city}`,
          material: item.material,
          dimensions: item.dimensions,
          significance: item.significance,
          imageUrl: item.images[0]?.url,
          isDailyArtifact: true
        });
      }
    });

    // 2. Add relevant world monuments and famous artifacts
    ALL_WORLD_MONUMENTS.forEach((mon) => {
      // Avoid duplicate IDs if already in list
      if (!list.some((existing) => existing.id === mon.id) && mon.id !== artifact.id) {
        list.push({
          id: mon.id,
          name: mon.name,
          subtitle: mon.nativeOrAlternateName || mon.architecturalStyle,
          category: mon.category,
          era: mon.era,
          periodYear: mon.yearBuilt,
          origin: `${mon.location}, ${mon.country}`,
          currentLocation: mon.location,
          material: mon.materialsUsed,
          dimensions: mon.dimensionsAndHeight,
          significance: mon.historyAndBackground.slice(0, 240) + '...',
          imageUrl: mon.imageUrl || mon.fallbackImageUrl,
          isDailyArtifact: false
        });
      }
    });

    return list;
  }, [artifact.id]);

  // Determine the default best comparison match
  const defaultSelectedId = useMemo(() => {
    // Check if provenance has recommended comparisons
    if (provenance?.recommendedVaultComparisons?.length) {
      const topRec = provenance.recommendedVaultComparisons[0].vaultId;
      const found = candidateVaultItems.find((c) => c.id === topRec);
      if (found) return found.id;
    }

    // Otherwise, pick an item with a different era or civilizational category
    const alternative = candidateVaultItems.find((c) => c.category !== artifact.category) || candidateVaultItems[0];
    return alternative ? alternative.id : '';
  }, [provenance, candidateVaultItems, artifact.category]);

  const [selectedVaultId, setSelectedVaultId] = useState<string>(defaultSelectedId);

  // Sync state if default changes
  React.useEffect(() => {
    if (defaultSelectedId) {
      setSelectedVaultId(defaultSelectedId);
    }
  }, [defaultSelectedId]);

  const selectedVaultItem = useMemo(() => {
    return candidateVaultItems.find((c) => c.id === selectedVaultId) || candidateVaultItems[0];
  }, [candidateVaultItems, selectedVaultId]);

  // Close on ESC
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Curatorial comparison synthesis generator
  const getComparisonSynthesis = () => {
    if (!selectedVaultItem) return null;

    const sameEra = artifact.era.toLowerCase().includes(selectedVaultItem.era.toLowerCase().slice(0, 4));
    
    return {
      parallels: `Both artifacts serve as enduring physical anchors of civilizational statecraft, sacred identity, and master craftsmanship. Whether created to immortalize a sovereign decree, defend a warrior, or bridge mortality, each represents the pinnacle of technical capability in its respective society.`,
      divergences: `While ${artifact.name} reflects ${artifact.era} material values and stylistic conventions (${artifact.material.slice(0, 50)}), ${selectedVaultItem.name} embodies the philosophical, religious, and political priorities of ${selectedVaultItem.era}.`,
      temporalContrast: sameEra 
        ? `Roughly contemporary or closely allied in antiquity, showcasing how differing world regions addressed leadership, defense, and sacred representation during the same epoch.`
        : `Created across distinct epochs of human history (${artifact.periodYear} vs ${selectedVaultItem.periodYear}), demonstrating the dramatic evolution of material culture and ideological expression over time.`
    };
  };

  const synthesis = getComparisonSynthesis();

  return (
    <AnimatePresence>
      <div
        id="artifact-compare-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="artifact-compare-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-[#14110E] border-2 border-[#D4AF37]/50 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2C2419] bg-[#1A1612]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Vault Comparative Analysis
                  </span>
                  <span className="text-xs text-stone-500">•</span>
                  <span className="text-xs text-stone-300 font-sans">
                    Cross-Civilizational Study
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#F4E8C1] leading-tight">
                  Comparing {artifact.name} with Ancient Vault Relics
                </h2>
              </div>
            </div>

            <button
              id="close-compare-modal-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-[#2A2217] transition-all cursor-pointer border border-[#3E301F]"
              title="Close Comparison (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Selector Bar to Pick Comparison Partner */}
          <div className="px-5 py-3 bg-[#17130F] border-b border-[#282015] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-300">
              <ArrowRightLeft className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-semibold text-stone-200">Select Counterpart from Vault:</span>
            </div>

            {/* Dropdown selector */}
            <div className="relative min-w-[280px] sm:min-w-[360px]">
              <select
                id="vault-counterpart-select"
                value={selectedVaultId}
                onChange={(e) => setSelectedVaultId(e.target.value)}
                className="w-full appearance-none bg-[#221C15] border border-[#3E3120] text-[#F4E8C1] text-xs rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-[#D4AF37] cursor-pointer shadow-inner"
              >
                {/* Recommended Group */}
                {provenance?.recommendedVaultComparisons && (
                  <optgroup label="🌟 Curated Scholarly Recommendations">
                    {provenance.recommendedVaultComparisons.map((rec) => {
                      const item = candidateVaultItems.find((c) => c.id === rec.vaultId);
                      return item ? (
                        <option key={item.id} value={item.id}>
                          {item.name} ({rec.civilization} • {rec.year})
                        </option>
                      ) : null;
                    })}
                  </optgroup>
                )}

                {/* Other Daily Artifacts Group */}
                <optgroup label="🏺 Daily Vault Artifacts">
                  {candidateVaultItems
                    .filter((c) => c.isDailyArtifact)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.era})
                      </option>
                    ))}
                </optgroup>

                {/* World Monuments & Artifacts */}
                <optgroup label="🏛️ Global Ancient Relics & Monuments">
                  {candidateVaultItems
                    .filter((c) => !c.isDailyArtifact)
                    .slice(0, 30)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.origin})
                      </option>
                    ))}
                </optgroup>
              </select>
              <ChevronDown className="w-4 h-4 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Side-by-Side Cards Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column: Current Daily Artifact */}
              <div className="bg-[#181410] border-2 border-[#D4AF37]/50 rounded-2xl p-5 shadow-xl relative flex flex-col justify-between">
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                  Current Daily Artifact
                </div>

                <div>
                  {/* Artifact Image Preview */}
                  <div className="w-full h-48 rounded-xl overflow-hidden bg-black/60 mb-4 border border-[#3A2E1E] relative flex items-center justify-center">
                    {artifact.images[0]?.url ? (
                      <img
                        src={artifact.images[0].url}
                        alt={artifact.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="text-4xl">🏺</div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 text-[11px] text-stone-300 font-serif truncate">
                      {artifact.images[0]?.caption || artifact.name}
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-1">
                    {artifact.name}
                  </h3>
                  <p className="text-xs text-stone-400 mb-3 line-clamp-2">
                    {artifact.subtitle}
                  </p>

                  {/* Metadata Specs Table */}
                  <div className="space-y-2 text-xs border-t border-[#2A2116] pt-3">
                    <div className="flex justify-between py-1 border-b border-[#221A12]">
                      <span className="text-stone-400 font-medium">Civilization / Era:</span>
                      <span className="text-[#F4E8C1] font-semibold text-right">{artifact.era}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#221A12]">
                      <span className="text-stone-400 font-medium">Period / Date:</span>
                      <span className="text-[#D4AF37] font-mono text-right">{artifact.periodYear}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#221A12]">
                      <span className="text-stone-400 font-medium">Classification:</span>
                      <span className="text-stone-300 text-right">{artifact.category}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#221A12]">
                      <span className="text-stone-400 font-medium">Material Medium:</span>
                      <span className="text-stone-300 text-right max-w-[200px] truncate">{artifact.material}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#221A12]">
                      <span className="text-stone-400 font-medium">Origin Site:</span>
                      <span className="text-amber-400 text-right max-w-[220px] truncate">{artifact.origin}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-stone-400 font-medium">Current Home:</span>
                      <span className="text-emerald-400 text-right max-w-[220px] truncate">
                        {artifact.currentLocation.museum}, {artifact.currentLocation.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2A2116]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                    Historical Significance
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                    {artifact.significance}
                  </p>
                </div>
              </div>

              {/* Right Column: Selected Vault Object */}
              {selectedVaultItem && (
                <div className="bg-[#181410] border-2 border-stone-600/60 rounded-2xl p-5 shadow-xl relative flex flex-col justify-between">
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-700/50 text-stone-200 border border-stone-500/40">
                    Vault Comparative Subject
                  </div>

                  <div>
                    {/* Vault Object Image Preview */}
                    <div className="w-full h-48 rounded-xl overflow-hidden bg-black/60 mb-4 border border-[#3A2E1E] relative flex items-center justify-center">
                      {selectedVaultItem.imageUrl ? (
                        <img
                          src={selectedVaultItem.imageUrl}
                          alt={selectedVaultItem.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="text-4xl">🏛️</div>
                      )}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 text-[11px] text-stone-300 font-serif truncate">
                        {selectedVaultItem.subtitle || selectedVaultItem.name}
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white mb-1">
                      {selectedVaultItem.name}
                    </h3>
                    <p className="text-xs text-stone-400 mb-3 line-clamp-2">
                      {selectedVaultItem.subtitle || selectedVaultItem.category}
                    </p>

                    {/* Metadata Specs Table */}
                    <div className="space-y-2 text-xs border-t border-[#2A2116] pt-3">
                      <div className="flex justify-between py-1 border-b border-[#221A12]">
                        <span className="text-stone-400 font-medium">Civilization / Era:</span>
                        <span className="text-[#F4E8C1] font-semibold text-right">{selectedVaultItem.era}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#221A12]">
                        <span className="text-stone-400 font-medium">Period / Date:</span>
                        <span className="text-[#D4AF37] font-mono text-right">{selectedVaultItem.periodYear}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#221A12]">
                        <span className="text-stone-400 font-medium">Classification:</span>
                        <span className="text-stone-300 text-right">{selectedVaultItem.category}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#221A12]">
                        <span className="text-stone-400 font-medium">Material Medium:</span>
                        <span className="text-stone-300 text-right max-w-[200px] truncate">{selectedVaultItem.material}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#221A12]">
                        <span className="text-stone-400 font-medium">Origin Site:</span>
                        <span className="text-amber-400 text-right max-w-[220px] truncate">{selectedVaultItem.origin}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-stone-400 font-medium">Current Home:</span>
                        <span className="text-emerald-400 text-right max-w-[220px] truncate">
                          {selectedVaultItem.currentLocation}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2A2116] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                        Historical Significance
                      </span>
                      <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                        {selectedVaultItem.significance}
                      </p>
                    </div>

                    {selectedVaultItem.isDailyArtifact && onSelectArtifact && (
                      <button
                        onClick={() => {
                          onSelectArtifact(selectedVaultItem.id);
                          onClose();
                        }}
                        className="mt-3 w-full py-2 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View as Today's Daily Artifact</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Curatorial Comparative Analysis Synthesis */}
            {synthesis && (
              <div className="bg-[#1C1711] border border-[#3E301F] rounded-xl p-5 shadow-lg space-y-4">
                <div className="flex items-center gap-2 border-b border-[#2C2216] pb-3">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="text-sm font-serif font-bold text-[#F4E8C1] tracking-wide">
                    Scholarly Synthesis: Cross-Civilizational Parallels & Contrast
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-[#14100C] border border-[#2B2014]">
                    <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      Cross-Civilizational Parallels
                    </div>
                    <p className="text-stone-300 leading-relaxed">
                      {synthesis.parallels}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#14100C] border border-[#2B2014]">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                      Key Divergences & Worldviews
                    </div>
                    <p className="text-stone-300 leading-relaxed">
                      {synthesis.divergences}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#14100C]/80 border border-[#291F13] flex items-start gap-2.5 text-xs text-stone-300">
                  <Hourglass className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-100">Chronological Distance:</strong>{' '}
                    {synthesis.temporalContrast}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-5 py-3 border-t border-[#2C2419] bg-[#16120E] flex items-center justify-between">
            <span className="text-[11px] text-stone-400 font-mono hidden sm:inline">
              Data synchronized dynamically from Historical Vaults and World Antiquity Registries
            </span>
            <button
              onClick={onClose}
              className="ml-auto px-5 py-2 rounded-xl text-xs font-bold bg-[#D4AF37] text-black hover:bg-[#F3E5AB] transition-all cursor-pointer shadow"
            >
              Done Comparing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
