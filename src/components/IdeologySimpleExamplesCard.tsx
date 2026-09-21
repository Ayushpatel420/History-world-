import React, { useState } from 'react';
import { Lightbulb, Check, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { PoliticalIdeology } from '../types';
import { getIdeologySimpleExamples, SimpleRealWorldExample } from '../data/ideologySimpleExamples';
import { playSound } from '../utils/audio';

interface IdeologySimpleExamplesCardProps {
  ideology: PoliticalIdeology;
  onOpenCaseStudy?: (caseStudyTitle: string) => void;
}

export default function IdeologySimpleExamplesCard({
  ideology,
  onOpenCaseStudy
}: IdeologySimpleExamplesCardProps) {
  const examples = getIdeologySimpleExamples(ideology);
  const [activeTab, setActiveTab] = useState<number>(0);

  const currentExample: SimpleRealWorldExample = examples[activeTab] || examples[0];

  return (
    <div className="bg-gradient-to-br from-[#1A160F] via-[#121212] to-[#0E0E0E] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl relative text-left overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2A2A] pb-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#D4AF37] text-black text-[10px] font-mono font-bold uppercase rounded-md tracking-wider flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-black" /> Plain English Guide
            </span>
            <span className="text-xs font-mono text-[#D4AF37]">
              Everyday Life Mechanics
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            How <span className="text-[#D4AF37]">{ideology.name}</span> Works in the Real World
          </h3>
          <p className="text-xs text-[#A09890] max-w-2xl font-sans">
            Complex political theories simplified into 3 everyday relatable scenarios: Healthcare, Jobs/Commerce, and Local Community.
          </p>
        </div>

        <div className="px-3 py-1.5 bg-[#14120D] border border-[#D4AF37]/40 rounded-xl text-xs font-mono text-[#D4AF37] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> 3 Everyday Scenarios
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {examples.map((ex, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(idx);
                playSound('click');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-102'
                  : 'bg-[#161616] text-[#C0B8B0] border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
              }`}
            >
              <span className="text-base">{ex.icon}</span>
              <span>Example #{idx + 1}: {ex.scenarioTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card Display */}
      <div className="bg-[#151515] border border-[#2E281E] rounded-2xl p-5 sm:p-6 space-y-5 relative z-10 shadow-lg animate-fade-in">
        
        {/* Question Prompt */}
        <div className="flex items-start gap-3 p-4 bg-[#1A1813] border-l-4 border-[#D4AF37] rounded-r-xl">
          <HelpCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
              The Real-World Question:
            </span>
            <p className="text-sm sm:text-base font-serif font-bold text-white leading-snug">
              "{currentExample.question}"
            </p>
          </div>
        </div>

        {/* Plain English Explanation */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider block flex items-center gap-1.5">
            <span>💡</span> In Simple Everyday Words:
          </span>
          <p className="text-xs sm:text-sm text-[#E0D8D0] leading-relaxed font-sans pl-1">
            {currentExample.plainEnglishExplanation}
          </p>
        </div>

        {/* Concrete Story / Example Box */}
        <div className="p-4 bg-[#111111] border border-[#2A2A2A] rounded-xl space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-[#88FF88] uppercase tracking-wider block flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-[#88FF88]" /> Concrete Everyday Example:
          </span>
          <p className="text-xs sm:text-sm text-[#C8C0B8] leading-relaxed font-sans">
            {currentExample.concreteExample}
          </p>
        </div>

        {/* Bottom Takeaway */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#222]">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase">Core Takeaway:</span>
            <span className="text-white font-medium italic">"{currentExample.keyTakeaway}"</span>
          </div>

          {ideology.realWorldExamples && ideology.realWorldExamples.length > 0 && onOpenCaseStudy && (
            <button
              onClick={() => onOpenCaseStudy(ideology.realWorldExamples[0].title)}
              className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
            >
              See Historical Case Study →
            </button>
          )}
        </div>

      </div>

      {/* Mini Grid of all 3 Scenarios for Quick Scanning */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 relative z-10">
        {examples.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveTab(idx);
              playSound('click');
            }}
            className={`p-3.5 rounded-xl text-left space-y-1 transition-all cursor-pointer border ${
              activeTab === idx
                ? 'bg-[#201B12] border-[#D4AF37] shadow'
                : 'bg-[#141414] border-[#252525] hover:border-[#D4AF37]/30'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{ex.icon}</span>
              <span className="text-xs font-bold text-white truncate">{ex.scenarioTitle}</span>
            </div>
            <p className="text-[11px] text-[#A09890] line-clamp-2 leading-snug">
              {ex.concreteExample}
            </p>
          </button>
        ))}
      </div>

    </div>
  );
}
