import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, X, Landmark, Globe, Check, Users, 
  Lightbulb, Shield, Scale, Copy, CheckCheck, Share2, 
  BookOpen, Sparkles, AlertTriangle
} from 'lucide-react';
import { IdeologyCaseStudy } from '../data/ideologyCaseStudies';
import { playSound } from '../utils/audio';

interface IdeologyCaseStudyFullPageViewProps {
  caseStudy: IdeologyCaseStudy;
  onBack: () => void;
  onOpenWikiEntry?: (figureName: string) => void;
  onSelectIdeologyByName?: (ideologyName: string) => void;
}

export default function IdeologyCaseStudyFullPageView({
  caseStudy,
  onBack,
  onOpenWikiEntry,
  onSelectIdeologyByName
}: IdeologyCaseStudyFullPageViewProps) {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [caseStudy.id]);

  const handleCopyCitation = () => {
    const citation = `"${caseStudy.title} (${caseStudy.periodOrLocation})." World Political Ideology Case Study Archive, 2026. Retrieved for political governance research.`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    playSound('click');
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const handleCopyShare = () => {
    const text = `Read the Case Study: "${caseStudy.title}" (${caseStudy.periodOrLocation}) — ${caseStudy.overview.slice(0, 140)}...`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    playSound('click');
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Sticky Navigation / Header Bar */}
      <div className="bg-[#111111] border-2 border-[#D4AF37]/50 p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-2xl sticky top-4 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onBack();
              playSound('click');
            }}
            className="px-4 py-2 bg-[#1A1813] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/50 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Ideology Vault
          </button>
          
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#A09890]">
            <span>Ideology Vault</span>
            <span>/</span>
            <span className="text-[#D4AF37]">{caseStudy.ideologyName}</span>
            <span>/</span>
            <span className="text-white font-bold truncate max-w-xs">{caseStudy.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCitation}
            className="px-3 py-1.5 bg-[#181818] hover:bg-[#252525] text-[#C0B8B0] hover:text-[#D4AF37] border border-[#2A2A2A] hover:border-[#D4AF37]/40 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
            title="Copy academic citation"
          >
            {copiedCitation ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-[#88FF88]" />
                <span className="text-[#88FF88] font-bold">Citation Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Cite Case</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyShare}
            className="px-3 py-1.5 bg-[#181818] hover:bg-[#252525] text-[#C0B8B0] hover:text-white border border-[#2A2A2A] rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
            title="Share case study"
          >
            {copiedShare ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-[#88FF88]" />
                <span className="text-[#88FF88]">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              onBack();
              playSound('click');
            }}
            className="p-2 bg-[#1C1811] hover:bg-[#2A2418] text-[#A09890] hover:text-white rounded-xl transition-all cursor-pointer border border-[#333]"
            title="Close Case Study"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Full-Page Case Study Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Case Study Body (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Showcase Banner */}
          <div className="bg-gradient-to-br from-[#1A1813] via-[#121212] to-[#0D0D0D] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-bold uppercase rounded-lg tracking-wider">
                REAL-WORLD GOVERNANCE CASE STUDY
              </span>
              <span className="px-3 py-1 bg-[#1E1E1E] border border-[#333] text-[#A09890] font-mono text-xs rounded-lg flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" /> {caseStudy.periodOrLocation}
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                {caseStudy.title}
              </h1>
              <p className="text-sm sm:text-base font-serif italic text-[#D4AF37]">
                Implementation of {caseStudy.ideologyName} in practice
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#D0C8C0] leading-relaxed font-sans pt-2">
              {caseStudy.overview}
            </p>
          </div>

          {/* Historical Context */}
          {caseStudy.historicalContext && (
            <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 space-y-2 shadow-lg">
              <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
                🏛️ Historical Background & Catalyst:
              </span>
              <p className="text-xs sm:text-sm text-[#C8C0B8] leading-relaxed font-sans">
                {caseStudy.historicalContext}
              </p>
            </div>
          )}

          {/* Simple Everyday Analogy / In Plain Words Box */}
          <div className="bg-gradient-to-r from-[#1D1910] via-[#14120D] to-[#121212] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-[#D4AF37]" /> In Simple Everyday Words: What Happened?
            </div>

            <div className="p-4 bg-black/40 border border-[#D4AF37]/30 rounded-2xl space-y-2">
              <p className="text-xs sm:text-sm text-[#E0D8D0] leading-relaxed font-sans">
                {caseStudy.simpleAnalogy}
              </p>
            </div>
          </div>

          {/* Key Policies & Institutional Mechanisms */}
          <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 space-y-4 shadow-lg">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#D4AF37] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#D4AF37]" /> Key Policies & Institutional Mechanisms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.keyPolicies.map((policy, pIdx) => (
                <div key={pIdx} className="p-3.5 bg-[#161616] border border-[#282828] rounded-xl space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37] font-mono font-bold text-xs">#{pIdx + 1}</span>
                    <span className="text-xs font-bold text-white">{policy.policyName}</span>
                  </div>
                  <p className="text-xs text-[#A09890] leading-relaxed">{policy.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Life of Citizens */}
          <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 space-y-3 shadow-lg">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#D4AF37] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#D4AF37]" /> Daily Life for Ordinary Citizens
            </h3>
            <p className="text-xs sm:text-sm text-[#C8C0B8] leading-relaxed font-sans">
              {caseStudy.howItWorkedInDailyLife}
            </p>
          </div>

          {/* Outcomes, Successes & Criticisms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Successes */}
            <div className="p-5 bg-[#121812] border border-[#224422]/60 rounded-2xl space-y-3 shadow-lg">
              <span className="text-xs font-mono font-bold text-[#88FF88] uppercase flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#88FF88]" /> Tangible Successes & Outcomes
              </span>
              <ul className="space-y-2 text-xs text-[#C8E8C8]">
                {caseStudy.outcomesAndResults.successes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#88FF88] mt-0.5">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges & Criticisms */}
            <div className="p-5 bg-[#191313] border border-[#442222]/60 rounded-2xl space-y-3 shadow-lg">
              <span className="text-xs font-mono font-bold text-[#FF8888] uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#FF8888]" /> Criticisms & Trade-Offs
              </span>
              <ul className="space-y-2 text-xs text-[#E8C8C8]">
                {caseStudy.outcomesAndResults.challengesOrCriticisms.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#FF8888] mt-0.5">✕</span>
                    <span className="leading-relaxed">{crit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legacy & Contemporary Relevance */}
          <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 space-y-3 shadow-lg">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#D4AF37] flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#D4AF37]" /> Legacy & Modern Policy Relevance
            </h3>
            <p className="text-xs sm:text-sm text-[#C8C0B8] leading-relaxed font-sans">
              {caseStudy.legacyAndRelevance}
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Case Metadata & Associated Figures (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl sticky top-24">
            
            <div className="text-center pb-3 border-b border-[#2A2A2A] space-y-1">
              <div className="w-16 h-16 bg-[#1F1B12] border-2 border-[#D4AF37] rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-lg">
                🏛️
              </div>
              <h3 className="text-lg font-serif font-bold text-white">{caseStudy.title}</h3>
              <p className="text-xs font-mono text-[#D4AF37]">{caseStudy.periodOrLocation}</p>
            </div>

            {/* Quick Metadata */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-start border-b border-[#222] pb-1.5">
                <span className="text-[#A09890] font-mono">Political Ideology:</span>
                <button
                  onClick={() => {
                    if (onSelectIdeologyByName) {
                      onSelectIdeologyByName(caseStudy.ideologyName);
                    }
                  }}
                  className="text-[#D4AF37] font-bold hover:underline text-right"
                >
                  {caseStudy.ideologyName} →
                </button>
              </div>

              <div className="flex justify-between items-start border-b border-[#222] pb-1.5">
                <span className="text-[#A09890] font-mono">Location & Era:</span>
                <span className="text-white font-mono text-right">{caseStudy.periodOrLocation}</span>
              </div>
            </div>

            {/* Key Historical Figures Involved */}
            {caseStudy.famousFiguresInvolved && caseStudy.famousFiguresInvolved.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-[#222]">
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase block">
                  Key Historical Figures & Leaders Involved:
                </span>
                <div className="space-y-1.5">
                  {caseStudy.famousFiguresInvolved.map((fig, fIdx) => (
                    <button
                      key={fIdx}
                      onClick={() => {
                        if (onOpenWikiEntry) {
                          onOpenWikiEntry(fig);
                        }
                      }}
                      className="w-full text-left p-2.5 bg-[#1A1A1A] hover:bg-[#252525] border border-[#282828] hover:border-[#D4AF37]/40 rounded-xl text-xs flex items-center justify-between gap-2 transition-all cursor-pointer group"
                    >
                      <span className="font-semibold text-white group-hover:text-[#D4AF37]">
                        👤 {fig}
                      </span>
                      <span className="text-[10px] font-mono text-[#D4AF37] bg-[#1E1911] px-2 py-0.5 rounded border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:text-black transition-all shrink-0">
                        Wiki Entry →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Return / Close Action */}
            <div className="pt-3 border-t border-[#222]">
              <button
                onClick={() => {
                  onBack();
                  playSound('click');
                }}
                className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Ideology
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
