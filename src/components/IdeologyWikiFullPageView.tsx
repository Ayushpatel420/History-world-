import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, X, Copy, CheckCheck, BookOpen, Share2, 
  ExternalLink, Sparkles, Lightbulb, Compass, Award, 
  Landmark, Shield, Users, History, Bookmark
} from 'lucide-react';
import { RelatedWikiEntry } from '../data/ideologyWikiEntries';
import { playSound } from '../utils/audio';

interface IdeologyWikiFullPageViewProps {
  entry: RelatedWikiEntry;
  onBack: () => void;
  onSelectIdeologyByName?: (ideologyName: string) => void;
}

export default function IdeologyWikiFullPageView({
  entry,
  onBack,
  onSelectIdeologyByName
}: IdeologyWikiFullPageViewProps) {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [entry.id]);

  const handleCopyCitation = () => {
    const citation = `"${entry.title}." Wikipedia Historical & Philosophical Archive, 2026. Retrieved for political philosophy research.`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    playSound('click');
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const handleCopyShare = () => {
    const text = `Read the Wikipedia Encyclopedia Profile for "${entry.title}" (${entry.eraOrPeriod}): ${entry.summary.slice(0, 140)}...`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    playSound('click');
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Sticky Top Header / Navigation Bar */}
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
            Back to Ideology
          </button>
          
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#A09890]">
            <span>Wikipedia Historical Archive</span>
            <span>/</span>
            <span className="text-[#D4AF37]">{entry.eraOrPeriod}</span>
            <span>/</span>
            <span className="text-white font-bold truncate max-w-xs">{entry.title}</span>
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
                <span>Cite Article</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyShare}
            className="px-3 py-1.5 bg-[#181818] hover:bg-[#252525] text-[#C0B8B0] hover:text-white border border-[#2A2A2A] rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
            title="Share article link"
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
            title="Close Wikipedia Entry"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Full-Page Grid: Article Body (8 Cols) + Wikipedia Infobox (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Wikipedia Article Body (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Article Header */}
          <div className="bg-gradient-to-br from-[#181510] via-[#121212] to-[#0A0A0A] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-8 space-y-3 shadow-2xl relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#D4AF37] text-black text-[10px] font-mono font-bold uppercase rounded-md tracking-wider">
                🏛️ Wikipedia Historical Entry
              </span>
              <span className="text-xs font-mono text-[#D4AF37]">
                {entry.eraOrPeriod}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              {entry.title}
            </h1>
            <p className="text-sm sm:text-base font-mono text-[#D4AF37]">
              {entry.subtitle}
            </p>
          </div>

          {/* Lead Summary Paragraph */}
          <div className="p-5 sm:p-6 bg-[#141414] border-l-4 border-[#D4AF37] rounded-r-2xl shadow-lg space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
              Article Abstract & Overview:
            </span>
            <p className="text-xs sm:text-sm text-[#E0D8D0] leading-relaxed font-sans">
              {entry.summary}
            </p>
          </div>

          {/* 💡 Dedicated How It Works In Plain Everyday English */}
          {entry.simpleEverydayWorking && (
            <div className="bg-gradient-to-r from-[#1E1910] via-[#14120D] to-[#121212] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                <Lightbulb className="w-4.5 h-4.5 text-[#D4AF37]" /> In Simple Words: How This Philosophy Works in Daily Life
              </div>

              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {entry.simpleEverydayWorking.headline}
                </h4>
                <div className="p-4 bg-black/40 border border-[#D4AF37]/30 rounded-2xl space-y-2">
                  <p className="text-xs sm:text-sm text-[#E0D8D0] leading-relaxed font-sans">
                    {entry.simpleEverydayWorking.analogy}
                  </p>
                  <div className="pt-2 border-t border-[#333] flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                    <span className="font-bold uppercase">💡 Key Everyday Takeaway:</span>
                    <span>{entry.simpleEverydayWorking.takeaway}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table of Contents Mini Box */}
          {entry.tableOfContents && entry.tableOfContents.length > 0 && (
            <div className="p-5 bg-[#141414] border border-[#2A2A2A] rounded-2xl space-y-2.5 shadow-md">
              <span className="text-xs font-mono font-bold uppercase text-[#D4AF37] tracking-wider block">
                Article Contents [hide]
              </span>
              <ol className="list-decimal pl-5 text-xs text-[#A09890] space-y-1 font-mono">
                {entry.tableOfContents.map((toc, idx) => (
                  <li key={idx} className="hover:text-white transition-colors cursor-pointer">{toc}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Main Article Sections */}
          <div className="space-y-6">
            {entry.sections.map((sec, idx) => (
              <div key={idx} className="p-6 bg-[#131313] border border-[#262626] rounded-2xl space-y-3 shadow-lg">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#D4AF37] border-b border-[#222] pb-2">
                  {idx + 1}. {sec.heading}
                </h3>
                <p className="text-xs sm:text-sm text-[#C8C0B8] leading-relaxed font-sans">
                  {sec.content}
                </p>
                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <ul className="list-disc pl-5 text-xs sm:text-sm text-[#D8D0C8] space-y-1.5 pt-1 font-sans">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">{bp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Famous Quote */}
          {entry.famousQuote && (
            <div className="p-5 sm:p-6 bg-[#18140D] border-2 border-[#D4AF37]/50 rounded-2xl space-y-2 shadow-lg">
              <p className="text-sm sm:text-base italic font-serif text-[#F0E0D0] leading-relaxed">
                "{entry.famousQuote.quote}"
              </p>
              {entry.famousQuote.source && (
                <p className="text-xs font-mono text-[#D4AF37] text-right font-bold">
                  — {entry.famousQuote.source}
                </p>
              )}
            </div>
          )}

          {/* Canonical Key Works */}
          {entry.keyWorks && entry.keyWorks.length > 0 && (
            <div className="p-5 bg-[#121212] border border-[#2A2A2A] rounded-2xl space-y-3 shadow-lg">
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#D4AF37]">
                Principal Monographs & Canonical Publications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {entry.keyWorks.map((work, idx) => (
                  <div key={idx} className="p-3 bg-[#161616] border border-[#282828] rounded-xl text-xs font-mono text-[#E0D8D0] flex items-center gap-2">
                    <span>📖</span>
                    <span className="font-semibold truncate">{work}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enduring Legacy */}
          <div className="p-5 sm:p-6 bg-[#141414] border border-[#2A2A2A] rounded-2xl space-y-2 shadow-lg">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#D4AF37]">
              Enduring Civilizational & Philosophical Legacy
            </h4>
            <p className="text-xs sm:text-sm text-[#A09890] leading-relaxed font-sans">
              {entry.legacy}
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Traditional Wikipedia Infobox (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl sticky top-24">
            
            {/* Infobox Header */}
            <div className="text-center pb-3 border-b border-[#2A2A2A] space-y-1">
              <div className="w-16 h-16 bg-[#1F1B12] border-2 border-[#D4AF37] rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-lg">
                🏛️
              </div>
              <h3 className="text-lg font-serif font-bold text-white">{entry.title}</h3>
              <p className="text-xs font-mono text-[#D4AF37]">{entry.eraOrPeriod}</p>
              {entry.birthDeathOrDates && (
                <p className="text-[11px] font-mono text-[#A09890]">{entry.birthDeathOrDates}</p>
              )}
            </div>

            {/* Infobox Key-Value Rows */}
            <div className="space-y-3">
              {entry.infobox.map((info, idx) => (
                <div key={idx} className="space-y-0.5 border-b border-[#222] pb-2 last:border-none">
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase block">{info.label}</span>
                  <p className="text-xs text-[#E0D8D0] font-sans leading-snug">{info.value}</p>
                </div>
              ))}
            </div>

            {/* Associated Ideologies */}
            {entry.associatedIdeologies && entry.associatedIdeologies.length > 0 && (
              <div className="pt-3 border-t border-[#2A2A2A] space-y-2">
                <span className="text-[10px] font-mono text-[#A09890] uppercase block">Associated Ideologies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {entry.associatedIdeologies.map((ideo, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (onSelectIdeologyByName) {
                          onSelectIdeologyByName(ideo);
                        }
                      }}
                      className="px-2.5 py-1 bg-[#1C1811] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-[11px] font-mono rounded-lg transition-all cursor-pointer font-bold"
                    >
                      {ideo} →
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
