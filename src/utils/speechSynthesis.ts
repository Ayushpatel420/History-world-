// Native Browser Speech Synthesis Engine for Historical Narrations

export interface SpeechState {
  isSpeaking: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  activeId: string | null;
  progress: number; // 0 to 1
  rate: number;
}

type SpeechCallback = (state: SpeechState) => void;

class SpeechSynthesisManager {
  private currentId: string | null = null;
  private isPaused: boolean = false;
  private utteranceChunks: string[] = [];
  private currentChunkIndex: number = 0;
  private listeners: Set<SpeechCallback> = new Set();
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private rate: number = 1.0;
  private pitch: number = 0.96; // Dignified orator pitch

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Load voices once ready
      window.speechSynthesis.onvoiceschanged = () => {
        this.selectPreferredVoice();
      };
      this.selectPreferredVoice();
    }
  }

  private selectPreferredVoice() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Prefer high-clarity natural English orator voices
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    const priorityKeywords = ['natural', 'daniel', 'oliver', 'george', 'serena', 'samantha', 'google uk english male', 'google us english'];
    
    for (const kw of priorityKeywords) {
      const found = englishVoices.find(v => v.name.toLowerCase().includes(kw));
      if (found) {
        this.preferredVoice = found;
        return;
      }
    }
    
    // Fallback to first English voice or first available voice
    this.preferredVoice = englishVoices[0] || voices[0] || null;
  }

  public subscribe(callback: SpeechCallback): () => void {
    this.listeners.add(callback);
    callback(this.getState());
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach(cb => cb(state));
  }

  public getState(): SpeechState {
    const isSpeaking = typeof window !== 'undefined' && 'speechSynthesis' in window 
      ? window.speechSynthesis.speaking 
      : false;
    return {
      isSpeaking,
      isPlaying: isSpeaking,
      isPaused: this.isPaused,
      activeId: this.currentId,
      progress: this.utteranceChunks.length > 0 
        ? Math.min(1, this.currentChunkIndex / this.utteranceChunks.length) 
        : 0,
      rate: this.rate
    };
  }

  // Split long historical text into sentence-sized chunks (< 180 chars) to prevent Chrome timeouts
  private splitIntoChunks(rawText: string): string[] {
    const cleaned = rawText
      .replace(/[*#_`~[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleaned) return [];

    // Split on sentence boundaries (. ! ?) while keeping the delimiter
    const sentenceRegex = /[^.!?]+[.!?]+|[^.!?]+$/g;
    const rawSentences = cleaned.match(sentenceRegex) || [cleaned];
    
    const chunks: string[] = [];
    let currentBuffer = '';

    for (const sentence of rawSentences) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;

      if ((currentBuffer + ' ' + trimmed).length <= 200) {
        currentBuffer = currentBuffer ? `${currentBuffer} ${trimmed}` : trimmed;
      } else {
        if (currentBuffer) chunks.push(currentBuffer);
        // If single sentence is itself longer than 200 characters, break by comma or semicolons
        if (trimmed.length > 200) {
          const subClauses = trimmed.split(/([,;:]+)/);
          let subBuf = '';
          for (const clause of subClauses) {
            if ((subBuf + clause).length <= 200) {
              subBuf += clause;
            } else {
              if (subBuf.trim()) chunks.push(subBuf.trim());
              subBuf = clause;
            }
          }
          if (subBuf.trim()) chunks.push(subBuf.trim());
          currentBuffer = '';
        } else {
          currentBuffer = trimmed;
        }
      }
    }

    if (currentBuffer.trim()) {
      chunks.push(currentBuffer.trim());
    }

    return chunks.length > 0 ? chunks : [cleaned];
  }

  public speak(id: string, text: string, options?: { rate?: number; pitch?: number }) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis is not supported in this browser.');
      return;
    }

    // Stop current speech
    this.stop();

    if (options?.rate) this.rate = options.rate;
    if (options?.pitch) this.pitch = options.pitch;

    this.currentId = id;
    this.isPaused = false;
    this.utteranceChunks = this.splitIntoChunks(text);
    this.currentChunkIndex = 0;

    if (this.utteranceChunks.length === 0) {
      this.currentId = null;
      this.notify();
      return;
    }

    this.speakNextChunk();
  }

  private speakNextChunk() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (this.currentChunkIndex >= this.utteranceChunks.length) {
      this.currentId = null;
      this.isPaused = false;
      this.notify();
      return;
    }

    const chunkText = this.utteranceChunks[this.currentChunkIndex];
    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }

    utterance.onstart = () => {
      this.isPaused = false;
      this.notify();
    };

    utterance.onend = () => {
      if (this.currentId !== null && !this.isPaused) {
        this.currentChunkIndex++;
        this.speakNextChunk();
      }
    };

    utterance.onerror = (e) => {
      // Ignore normal canceled events when stopped
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis utterance error:', e.error);
      }
      this.currentId = null;
      this.isPaused = false;
      this.notify();
    };

    window.speechSynthesis.speak(utterance);
    this.notify();
  }

  public pause() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (window.speechSynthesis.speaking && !this.isPaused) {
      window.speechSynthesis.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    this.currentId = null;
    this.isPaused = false;
    this.utteranceChunks = [];
    this.currentChunkIndex = 0;
    this.notify();
  }

  public setRate(newRate: number) {
    this.rate = Math.max(0.5, Math.min(2.0, newRate));
    this.notify();
  }

  public getRate(): number {
    return this.rate;
  }

  public toggle(id: string, text: string, options?: { rate?: number; pitch?: number }) {
    if (this.currentId === id) {
      if (this.isPaused) {
        this.resume();
      } else {
        this.pause();
      }
    } else {
      this.speak(id, text, options);
    }
  }
}

export const speechManager = new SpeechSynthesisManager();
