import { useState } from 'react';
import { Send, Sparkles, Cpu, AlertTriangle, ChevronRight, RefreshCw, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { playSound } from '../utils/audio';

interface AIPortalProps {
  onAddNote: (title: string, content: string, type: 'General') => void;
}

interface ChatMessage {
  role: 'user' | 'scholar';
  text: string;
}

export default function AIPortal({ onAddNote }: AIPortalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'scholar',
      text: "Greetings, seeker of historical truth. I am your personal AI Scholar. You may ask me any deep question or historical mystery from ancient times to the modern era. \n\nSelect one of the classic debates below, or query any detailed event, king, country, or cultural revolution of your choice!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEasyMode, setIsEasyMode] = useState(false);

  const SUGGESTED_QUERIES = [
    { label: "🍂 Did the Bronze Age Collapse occur?", prompt: "Could you detail the theories and events surrounding the Late Bronze Age Collapse in the Aegean and Near East?" },
    { label: "⚔ Shivaji's Guerrilla Warfare", prompt: "Explain the strategic guerrilla tactics (Ganimi Kava) and fortification network designed by Chhatrapati Shivaji Maharaj." },
    { label: "🏛 Trajan's Roman Expansion", prompt: "Explain how Emperor Trajan achieved Roman Empire's peak territorial size through the Dacian campaigns and his architectural legacy." },
    { label: "⏳ Cause of Fall of Rome?", prompt: "Conduct an analysis on the primary political, military, and economic factors leading to the fall of the Western Roman Empire in 476 AD." }
  ];

  const QUICK_TEMPLATES = [
    { label: "🧠 Stoic vs Epicurean", prompt: "What are the core differences between Stoic and Epicurean ethics?" },
    { label: "🎭 Plato's Cave", prompt: "Please explain Plato's Allegory of the Cave in plain English." },
    { label: "📜 Who was Socrates?", prompt: "Can you give a brief biography and trial overview of Socrates?" },
    { label: "🔬 Ancient Science", prompt: "How did the ancient Greeks and Indians calculate planetary movements?" }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    // Save immediate message value
    const finalQuery = textToSend;
    
    setMessages((prev) => [...prev, { role: 'user', text: finalQuery }]);
    setInputText('');
    setIsLoading(true);
    setErrorMessage(null);

    // Formulate final enriched prompt based on easy mode choice
    let promptWithMode = finalQuery;
    if (isEasyMode) {
      promptWithMode += " (Please make your explanation extremely easy to understand. Use friendly real-world analogies, short direct bullet points, and avoid complicated scholarly academic jargon. Speak in everyday language.)";
    }

    try {
      const response = await fetch('/api/gemini/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: promptWithMode,
          context: isEasyMode 
            ? 'User is a young traveler checking basic history. Respond strictly in clear, easy explanations with illustrations.' 
            : 'User is querying deep scholastic details for biography, military history, and philosophical arguments.'
        })
      });

      if (!response.ok) {
        throw new Error('API server failed. Please verify that your Gemini API Key is configured in settings.');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'scholar', text: data.text }]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Make sure you have added your Gemini API key inside the Secrets panel.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    playSound('click');
    setMessages([
      {
        role: 'scholar',
        text: "Greetings, seeker of historical truth. I am your personal AI Scholar. You may ask me any deep question or historical mystery from ancient times to the modern era. \n\nSelect one of the classic debates below, or query any detailed event, king, country, or cultural revolution of your choice!"
      }
    ]);
    setErrorMessage(null);
  };

  return (
    <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6 text-left min-h-[500px]">
      
      {/* Sidebar Suggestions */}
      <div className="md:w-1/3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#2A2A2A] pb-4 md:pb-0 md:pr-6 space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-left">
            <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
            <h4 className="font-serif italic font-bold text-white text-sm tracking-tight">AI Historian Consultant</h4>
          </div>
          
          <p className="text-xs text-[#A09890] leading-relaxed font-sans">
            Talk directly to a server-side AI academic. Enter custom inquiries or solve complex historical debates immediately:
          </p>

          {/* Toggle level of complexity */}
          <div className="bg-[#121212] border border-[#2A2A2A] p-2.5 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono tracking-wider text-[#A09890] uppercase font-bold">Select Tone Complexity</span>
              <span className="text-[9px] font-mono text-[#D4AF37] font-semibold">{isEasyMode ? '⚡ Simple mode' : '📜 Academic mode'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { playSound('click'); setIsEasyMode(true); }}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center gap-1 cursor-pointer border transition-all ${
                  isEasyMode 
                    ? 'bg-[#1C1811] text-[#D4AF37] border-[#D4AF37]' 
                    : 'bg-transparent text-white/50 border-[#2A2A2A] hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>Easy / Simple</span>
              </button>
              <button
                type="button"
                onClick={() => { playSound('click'); setIsEasyMode(false); }}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center gap-1 cursor-pointer border transition-all ${
                  !isEasyMode 
                    ? 'bg-[#1C1811] text-[#D4AF37] border-[#D4AF37]' 
                    : 'bg-transparent text-white/50 border-[#2A2A2A] hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>Rich Scholar</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            <span className="text-[10px] font-mono text-[#A09890] uppercase tracking-wider font-bold block">Featured Debates (Immediate Ask)</span>
            <div className="space-y-2">
              {SUGGESTED_QUERIES.map((query, index) => (
                <button
                  key={index}
                  disabled={isLoading}
                  onClick={() => { playSound('click'); handleSendMessage(query.prompt); }}
                  className="w-full text-left p-2.5 text-xs bg-[#0A0A0A] hover:bg-[#151515] border border-[#2A2A2A] rounded-xl hover:border-[#D4AF37]/50 font-medium transition-all text-[#E0D8D0] hover:text-white flex items-start gap-1 justify-between group cursor-pointer"
                >
                  <span>{query.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-[#1C1C1C] space-y-3">
          <button
            onClick={handleClearHistory}
            className="w-full py-2 bg-transparent hover:bg-red-950/20 text-red-400 hover:text-red-300 border border-red-900/40 hover:border-red-500/40 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Chat Logs</span>
          </button>
          <div className="p-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[10px] text-[#A09890] leading-relaxed font-mono">
            💡 Tap "Save Scholar Lecture" below AI answers to automatically record the summary in your local Notebook section instantly.
          </div>
        </div>
      </div>

      {/* Primary chat scroll and input */}
      <div className="md:w-2/3 flex flex-col justify-between h-full min-h-[440px]">
        
        {/* Messages track */}
        <div className="flex-1 overflow-y-auto max-h-[380px] space-y-4 pr-1 scrollbar-thin">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1.5 p-4 rounded-2xl border max-w-[92%] transition-all ${
                msg.role === 'user'
                  ? 'bg-[#1A1813] border-[#2A2A2A] text-white ml-auto text-right items-end'
                  : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#E0D8D0]'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-wider font-extrabold uppercase text-[#D4AF37] select-none">
                {msg.role === 'user' ? '⚔ Traveler Enquiry' : '📜 Scholar Answer'}
              </div>

              {msg.role === 'scholar' ? (
                <div className="markdown-body text-xs sm:text-sm text-[#A09890] leading-relaxed font-sans max-w-none space-y-2 text-left">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-[#E0D8D0] font-medium font-mono text-right">{msg.text}</p>
              )}

              {/* Scholar Utilities */}
              {msg.role === 'scholar' && index > 0 && (
                <div className="mt-3.5 pt-2.5 border-t border-[#2A2A2A] flex justify-between items-center w-full">
                  <span className="text-[9.5px] font-mono text-[#A09890]">
                    {isEasyMode ? '⚡ Simplified Output' : '🏆 Deep Academic Codex'}
                  </span>
                  <button
                    onClick={() => {
                      playSound('click');
                      onAddNote(`AI Scholar Lecture`, `Saved Scholar response regarding query:\n\n${msg.text}\n`, 'General');
                    }}
                    className="text-[11px] font-bold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center gap-1 bg-[#151515] px-2.5 py-1 rounded-md border border-[#2A2A2A] transition-colors shadow-md cursor-pointer font-sans"
                  >
                    🔖 Save Scholar Lecture
                  </button>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-4 max-w-[70%] animate-pulse flex items-center gap-2 text-[#A09890]">
              <Cpu className="w-4 h-4 animate-spin text-[#D4AF37]" />
              <span className="text-xs font-mono"> Scholar is examining historical archives ({isEasyMode ? 'making it simple' : 'academic mode'})...</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-[#240C0E] border border-rose-900/40 text-rose-450 text-xs rounded-xl flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <div className="text-left">
                <p className="font-bold text-rose-400">Scholar Dispute:</p>
                <p className="mt-0.5 text-[#A09890]">{errorMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Preset Chips & Send Area */}
        <div className="mt-4 pt-3 border-t border-[#2A2A2A] space-y-3">
          
          {/* Quick templates chips to insert prompt */}
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-[#A09890] uppercase tracking-wider font-bold block">Quick Inquiry Templates (Insert &amp; Customize)</span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_TEMPLATES.map((tpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setInputText(tpl.prompt);
                  }}
                  className="px-2.5 py-1 text-[10px] bg-[#121212] hover:bg-[#D4AF37]/10 text-[#A09890] hover:text-[#D4AF37] border border-[#2A2A26] hover:border-[#D4AF37]/50 rounded-lg transition-all font-mono cursor-pointer"
                  title="Click to load text template into form above"
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submission form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
            className="flex gap-2"
          >
            <input
              type="text"
              disabled={isLoading}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isEasyMode ? "Ask any simple history question..." : "Query details on any global event, king, country, or date..."}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 bg-[#D4AF37] text-black border border-[#D4AF37] hover:bg-black hover:text-[#D4AF37] disabled:bg-[#1E1E1E] disabled:text-[#A09890] disabled:border-[#2A2A2A] rounded-xl transition-all shadow-lg shrink-0 cursor-pointer"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
