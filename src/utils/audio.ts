let isSoundEnabled = true;

// Initialize Web Audio API on first user interaction
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const setSoundEnabled = (enabled: boolean) => {
  isSoundEnabled = enabled;
  localStorage.setItem('chronos_vault_sound_enabled', enabled ? 'true' : 'false');
};

export const getSoundEnabled = (): boolean => {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('chronos_vault_sound_enabled');
  return stored !== 'false'; // Default to true if not found
};

// Initialize early
if (typeof window !== 'undefined') {
  isSoundEnabled = getSoundEnabled();
}

// Play a quick synth sound using Web Audio API oscillator
export const playSound = (type: 'click' | 'correct' | 'incorrect' | 'antiqueTick' | 'goldenChime' | 'magicSparkle' | 'stoneClick') => {
  if (!isSoundEnabled) return;
  
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    if (type === 'click' || type === 'stoneClick') {
      // Soft navigation or stone artifact click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type === 'stoneClick' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(type === 'stoneClick' ? 320 : 600, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
      
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'antiqueTick') {
      // Crisp mechanical clockwork gear tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
      
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'goldenChime') {
      // Harmonic antique celestial bell chime
      [587.33, 880, 1174.66, 1760].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.03);
        
        gain.gain.setValueAtTime(0.04 / (i + 1), now + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + i * 0.03);
        osc.stop(now + 0.45);
      });
    } else if (type === 'magicSparkle') {
      // Shimmering celestial sweep
      [987.77, 1318.51, 1567.98, 1975.53, 2637.02].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        
        gain.gain.setValueAtTime(0.03, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + idx * 0.04 + 0.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.2);
      });
    } else if (type === 'correct') {
      // Ascending chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1046.50, now); // C6
      osc2.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.22);
      osc2.stop(now + 0.22);
    } else if (type === 'incorrect') {
      // Descending warning tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.18);
      
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (err) {
    console.warn("Failed to play dynamic synthesized sound:", err);
  }
};
