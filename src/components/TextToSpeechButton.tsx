import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, Square, RotateCcw } from 'lucide-react';
import { speechManager, SpeechState } from '../utils/speechSynthesis';

export interface TextToSpeechButtonProps {
  id: string;
  text: string;
  title?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'pill' | 'compact' | 'icon' | 'banner';
  className?: string;
  theme?: 'gold' | 'emerald' | 'amber';
}

export default function TextToSpeechButton({
  id,
  text,
  title,
  label = 'Read Aloud',
  size = 'md',
  variant = 'pill',
  className = '',
  theme = 'gold'
}: TextToSpeechButtonProps) {
  const [speechState, setSpeechState] = useState<SpeechState>(speechManager.getState());

  useEffect(() => {
    const unsubscribe = speechManager.subscribe((state) => {
      setSpeechState(state);
    });
    return () => unsubscribe();
  }, []);

  const isCurrentActive = speechState.activeId === id;
  const isPlaying = isCurrentActive && speechState.isSpeaking && !speechState.isPaused;
  const isPaused = isCurrentActive && speechState.isPaused;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!text) return;
    speechManager.toggle(id, text);
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechManager.stop();
  };

  // Color schemes based on theme prop
  const themeClasses = {
    gold: {
      active: 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)]',
      paused: 'bg-amber-950/60 text-amber-300 border-amber-500/60 shadow-md',
      idle: 'bg-[#15120C] hover:bg-[#262016] text-[#D4AF37] border-[#3D3322] hover:border-[#D4AF37]/70',
      wave: 'bg-black'
    },
    emerald: {
      active: 'bg-[#E5C158] text-black border-[#E5C158] shadow-[0_0_12px_rgba(229,193,88,0.4)]',
      paused: 'bg-[#030D0B] text-[#E5C158] border-[#234D43] shadow-md',
      idle: 'bg-[#030D0B] hover:bg-[#122C26] text-[#E5C158] border-[#234D43] hover:border-[#E5C158]/70',
      wave: 'bg-black'
    },
    amber: {
      active: 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
      paused: 'bg-amber-950/50 text-amber-300 border-amber-600/50',
      idle: 'bg-[#18140E] hover:bg-[#282016] text-amber-300 border-amber-800/40 hover:border-amber-500/60',
      wave: 'bg-black'
    }
  }[theme];

  // 1. Icon-only variant
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <button
          onClick={handleToggle}
          title={isPlaying ? 'Pause Speech' : isPaused ? 'Resume Speech' : `Read "${title || label}" aloud`}
          className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
            isPlaying ? themeClasses.active : isPaused ? themeClasses.paused : themeClasses.idle
          }`}
          aria-label={isPlaying ? 'Pause reading aloud' : 'Read aloud with speech synthesis'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current animate-pulse" />
          ) : isPaused ? (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
        {isCurrentActive && (
          <button
            onClick={handleStop}
            title="Stop Speech"
            className="p-2 rounded-xl bg-black/50 hover:bg-black/80 border border-neutral-700 text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
        )}
      </div>
    );
  }

  // 2. Banner variant (for large article header or detailed overview)
  if (variant === 'banner') {
    return (
      <div className={`flex flex-wrap items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl border ${
        isPlaying 
          ? 'bg-amber-950/30 border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
          : isPaused
          ? 'bg-amber-950/20 border-amber-700/30'
          : 'bg-[#0E0C09] border-[#262016]'
      } ${className}`}>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleToggle}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer font-bold flex items-center justify-center ${
              isPlaying ? themeClasses.active : isPaused ? themeClasses.paused : themeClasses.idle
            }`}
            title={isPlaying ? 'Pause Narration' : isPaused ? 'Resume Narration' : 'Listen to this article'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : isPaused ? (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <div className="text-left">
            <div className="text-xs font-mono font-bold flex items-center gap-1.5 text-white">
              <span>{isPlaying ? 'Narrating Article Aloud...' : isPaused ? 'Narration Paused' : label}</span>
              {isPlaying && (
                <span className="flex items-end gap-0.5 h-3 ml-1">
                  <span className="w-0.5 h-full bg-[#D4AF37] animate-[bounce_0.8s_infinite]" />
                  <span className="w-0.5 h-2/3 bg-[#D4AF37] animate-[bounce_1.1s_infinite]" />
                  <span className="w-0.5 h-full bg-[#D4AF37] animate-[bounce_0.6s_infinite]" />
                </span>
              )}
            </div>
            <div className="text-[10px] font-mono text-[#8E867C]">
              {title ? `Historical text: ${title}` : 'Browser native speech synthesis audio'}
            </div>
          </div>
        </div>

        {isCurrentActive && (
          <button
            onClick={handleStop}
            className="px-2.5 py-1.5 rounded-lg bg-[#18140E] hover:bg-[#282016] border border-[#3A3022] text-[#CCC2B8] hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Stop Speech"
          >
            <Square className="w-3 h-3 fill-current text-rose-400" />
            <span>Stop</span>
          </button>
        )}
      </div>
    );
  }

  // 3. Compact & Pill variants (Standard)
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-[11px] gap-1.5 rounded-lg',
    md: 'px-3 py-1.5 text-xs gap-2 rounded-xl',
    lg: 'px-4 py-2 text-sm gap-2.5 rounded-xl'
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  }[size];

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        onClick={handleToggle}
        className={`font-mono font-bold tracking-wide border transition-all cursor-pointer flex items-center shrink-0 shadow-sm ${sizeClasses} ${
          isPlaying ? themeClasses.active : isPaused ? themeClasses.paused : themeClasses.idle
        }`}
        title={isPlaying ? 'Click to Pause' : isPaused ? 'Click to Resume' : `Read ${title || label} aloud`}
        aria-label={isPlaying ? 'Pause reading aloud' : 'Read aloud with speech synthesis'}
      >
        {isPlaying ? (
          <>
            <Pause className={`${iconSizes} fill-current`} />
            <span>Reading Aloud</span>
            <span className="flex items-end gap-0.5 h-2.5 ml-0.5">
              <span className={`w-0.5 h-full ${themeClasses.wave} animate-[bounce_0.8s_infinite]`} />
              <span className={`w-0.5 h-2/3 ${themeClasses.wave} animate-[bounce_1.1s_infinite]`} />
              <span className={`w-0.5 h-full ${themeClasses.wave} animate-[bounce_0.6s_infinite]`} />
            </span>
          </>
        ) : isPaused ? (
          <>
            <Play className={`${iconSizes} fill-current ml-0.5`} />
            <span>Resume</span>
          </>
        ) : (
          <>
            <Volume2 className={iconSizes} />
            <span>{label}</span>
          </>
        )}
      </button>

      {isCurrentActive && (
        <button
          onClick={handleStop}
          title="Stop narration"
          className="p-1.5 rounded-lg bg-[#18140E] hover:bg-[#282016] border border-[#3A3022] text-[#CCC2B8] hover:text-white transition-colors cursor-pointer"
        >
          <Square className="w-3 h-3 fill-current text-rose-400" />
        </button>
      )}
    </div>
  );
}
