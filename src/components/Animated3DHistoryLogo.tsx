import React, { useState, useRef, useEffect } from 'react';
import { playSound } from '../utils/audio';
import { Sparkles, Info, X } from 'lucide-react';

interface Animated3DHistoryLogoProps {
  className?: string;
  onClick?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
  symbol?: string;
}

export interface HistoricalArtifactEmblem {
  id: string;
  icon: string;
  name: string;
  origin: string;
  era: string;
  summary: string;
  isLegendaryArtifact?: boolean;
}

export const SEVEN_ANCIENT_ARTIFACTS: HistoricalArtifactEmblem[] = [
  {
    id: 'tutankhamun_mask',
    icon: '👑',
    name: "Tutankhamun's Golden Mask",
    origin: 'Valley of the Kings, Egypt',
    era: 'c. 1323 BCE (18th Dynasty)',
    summary: 'Forged from 11 kg of solid 24-karat gold with lapis lazuli and obsidian, preserving the boy-king divine visage.',
    isLegendaryArtifact: true
  },
  {
    id: 'rosetta_stone',
    icon: '🗿',
    name: 'The Rosetta Stone',
    origin: 'Memphis / Rashid, Egypt',
    era: '196 BCE (Ptolemaic Kingdom)',
    summary: 'Granodiorite stele inscribed in Hieroglyphic, Demotic, and Ancient Greek that unlocked the decipherment of Egyptian hieroglyphs.',
    isLegendaryArtifact: true
  },
  {
    id: 'antikythera_mechanism',
    icon: '⚙️',
    name: 'Antikythera Celestial Computer',
    origin: 'Aegean Sea Shipwreck, Greece',
    era: 'c. 150 – 100 BCE (Hellenistic Greece)',
    summary: 'The world’s oldest known analog computer, containing over 30 precision bronze gear trains tracking celestial planetary motions.',
    isLegendaryArtifact: true
  },
  {
    id: 'pyramid_pyramidion',
    icon: '🔺',
    name: 'Giza Golden Capstone Pyramidion',
    origin: 'Great Pyramid of Khufu, Egypt',
    era: 'c. 2560 BCE (Old Kingdom)',
    summary: 'The electrum-plated apex of the monumental Great Pyramid, reflecting sunlight across the desert as an emblem of Ra.',
    isLegendaryArtifact: true
  },
  {
    id: 'terracotta_dragon_seal',
    icon: '🐉',
    name: 'Terracotta Warrior & Imperial Jade Seal',
    origin: "Xi'an, Shaanxi, China",
    era: '210 BCE (Qin Dynasty)',
    summary: 'Part of the 8,000-man subterranean army guarding Emperor Qin Shi Huang, stamped with the imperial dragon jade seal.',
    isLegendaryArtifact: true
  },
  {
    id: 'aztec_sun_stone',
    icon: '☀️',
    name: 'Mesoamerican Aztec Sun Stone',
    origin: 'Tenochtitlan (Mexico City)',
    era: 'c. 1479 CE (Post-Classic Mesoamerica)',
    summary: 'A 24-ton carved basalt monolith portraying the solar deity Tonatiuh and the four primordial cosmic creation eras.',
    isLegendaryArtifact: true
  },
  {
    id: 'cyrus_cylinder',
    icon: '📜',
    name: 'Cyrus Cylinder & Law Stele',
    origin: 'Babylon (Modern Iraq)',
    era: '539 BCE (Achaemenid Persian Empire)',
    summary: 'Clay cylinder declaration of human tolerance, freedom of worship, and liberation of exiled populations by Cyrus the Great.',
    isLegendaryArtifact: true
  }
];

export const HISTORICAL_EMBLEMS: HistoricalArtifactEmblem[] = [
  ...SEVEN_ANCIENT_ARTIFACTS,
  {
    id: 'classical_antiquity',
    icon: '🏛️',
    name: 'Classical Antiquity Parthenon',
    origin: 'Athens & Rome',
    era: '500 BCE – 476 CE',
    summary: 'The birthplace of democratic philosophy, marble column architecture, and Greco-Roman jurisprudence.',
    isLegendaryArtifact: false
  },
  {
    id: 'maritime_astrolabe',
    icon: '🧭',
    name: 'Age of Maritime Navigation',
    origin: 'Global High Seas',
    era: '1400 – 1700 CE',
    summary: 'Magnetic lodestone compasses and oceanic caravels connecting the hemispheres.',
    isLegendaryArtifact: false
  },
  {
    id: 'chronos_hourglass',
    icon: '⏳',
    name: 'Chronos Sands of Universal Epochs',
    origin: 'Universal Chronology',
    era: 'Ancient to Modernity',
    summary: 'The endless continuum of human civilization sculpting philosophy, warfare, and cultural wonders.',
    isLegendaryArtifact: false
  }
];

export default function Animated3DHistoryLogo({ className = '', onClick }: Animated3DHistoryLogoProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [emblemIndex, setEmblemIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [spinBoost, setSpinBoost] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showArtifactInspector, setShowArtifactInspector] = useState(false);
  
  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking when not dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      setRotate({
        x: Math.max(-65, Math.min(65, dragStartRef.current.rotX - deltaY * 0.75)),
        y: Math.max(-65, Math.min(65, dragStartRef.current.rotY + deltaX * 0.75))
      });
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 1.4;
    const y = -(e.clientX - rect.left - rect.width / 2) / 1.4;
    setRotate({ x, y });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotate.x,
      rotY: rotate.y
    };
    playSound('antiqueTick');
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  // Touch handlers for mobile interactivity
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      dragStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        rotX: rotate.x,
        rotY: rotate.y
      };
      playSound('antiqueTick');
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartRef.current.x;
      const deltaY = touch.clientY - dragStartRef.current.y;
      setRotate({
        x: Math.max(-65, Math.min(65, dragStartRef.current.rotX - deltaY * 0.75)),
        y: Math.max(-65, Math.min(65, dragStartRef.current.rotY + deltaX * 0.75))
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Sparkle particles & Emblem switcher on click
  const handleCycleEmblem = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    // Cycle emblem
    setEmblemIndex(prev => (prev + 1) % HISTORICAL_EMBLEMS.length);
    setSpinBoost(prev => prev + 360);

    // Audio chime
    playSound('goldenChime');
    setTimeout(() => {
      playSound('magicSparkle');
    }, 80);

    // Spawn 14 golden sparks
    const newParticles: Particle[] = [];
    const colors = ['#FFF3B0', '#E5C158', '#D4AF37', '#FFD700', '#FFF', '#FFDF73'];
    const runes = ['✦', '★', '✧', '♦', '⚜', '✵', '❂'];

    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const speed = 2.8 + Math.random() * 3.8;
      newParticles.push({
        id: Date.now() + i + Math.random(),
        x: 0,
        y: 0,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        symbol: runes[Math.floor(Math.random() * runes.length)]
      });
    }

    setParticles(newParticles);
  };

  // Animation frame loop for floating particles
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.04
          }))
          .filter(p => p.life > 0)
      );
    }, 24);

    return () => clearInterval(interval);
  }, [particles]);

  const activeEmblem = HISTORICAL_EMBLEMS[emblemIndex];

  return (
    <div 
      ref={containerRef}
      className={`relative select-none flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => {
        setIsHovered(true);
        playSound('antiqueTick');
      }}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => {
        handleCycleEmblem(e);
        if (onClick) onClick();
      }}
      title="Interactive 3D History Logo: Click or drag to inspect 7 Ancient Artifacts & Astrolabe!"
      style={{ perspective: 1200 }}
    >
      {/* Floating Sparkles Canvas Elements */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute left-1/2 top-1/2 pointer-events-none font-bold text-xs"
          style={{
            transform: `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`,
            opacity: p.life,
            color: p.color,
            textShadow: `0 0 8px ${p.color}, 0 0 14px #D4AF37`,
            zIndex: 60
          }}
        >
          {p.symbol}
        </span>
      ))}

      {/* Main 3D Spherical & Beveled Antique Astrolabe Shield */}
      <div
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-1 flex items-center justify-center transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovered ? 'scale(1.12) translateZ(20px)' : 'scale(1) translateZ(0px)'}`,
          transformStyle: 'preserve-3d',
          background: 'radial-gradient(circle at 35% 25%, #3E2F13 0%, #1D1408 55%, #080603 100%)',
          boxShadow: '0 18px 38px rgba(0,0,0,0.95), inset 0 2px 5px rgba(255,245,180,0.6), inset 0 -3px 8px rgba(0,0,0,0.95), 0 0 26px rgba(212,175,55,0.5)'
        }}
      >
        {/* Layer 1: Multi-tiered Engraved Filigree Rim */}
        <div 
          className="absolute inset-1 rounded-xl border border-[#D4AF37]/80 pointer-events-none shadow-[inset_0_0_12px_rgba(212,175,55,0.4)]" 
          style={{ transform: 'translateZ(5px)' }}
        />
        
        <div 
          className="absolute inset-2 rounded-lg border border-[#E5C158]/50 pointer-events-none" 
          style={{ transform: 'translateZ(9px)' }}
        />

        {/* Layer 2: 3D Antique Armillary Globe, Astrolabe Rings & Gears SVG */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          style={{ transform: 'translateZ(14px)' }}
        >
          <defs>
            <radialGradient id="astrolabeGold" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#FFF9D2" />
              <stop offset="25%" stopColor="#E5C158" />
              <stop offset="70%" stopColor="#B8860B" />
              <stop offset="100%" stopColor="#3D2905" />
            </radialGradient>

            <linearGradient id="orbitGradA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8DC" stopOpacity="1" />
              <stop offset="50%" stopColor="#E5C158" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8B6508" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="orbitGradB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E5C158" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2A1E07" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Outer Sun Dial Gear Teeth / Chronometer Cog with Spin Boost on Click */}
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: `rotate(${spinBoost}deg)`,
              transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="url(#orbitGradA)"
              strokeWidth="1.5"
              strokeDasharray="2 3 5 3"
              className="animate-spin"
              style={{ transformOrigin: 'center', animationDuration: '20s' }}
            />
          </g>

          {/* 3D Celestial Meridian Ellipse */}
          <ellipse
            cx="50"
            cy="50"
            rx="41"
            ry="19"
            stroke="url(#orbitGradB)"
            strokeWidth="1.8"
            strokeDasharray="9 3"
            className="animate-spin"
            style={{ transformOrigin: 'center', animationDuration: '11s', animationDirection: 'reverse' }}
          />

          {/* 3D Equatorial Coordinate Astrolabe Orbit */}
          <ellipse
            cx="50"
            cy="50"
            rx="19"
            ry="41"
            stroke="#E5C158"
            strokeWidth="1.4"
            strokeOpacity="0.8"
            strokeDasharray="4 2 1 2"
            transform="rotate(45 50 50)"
          />

          {/* Cardinal Astrolabe Fleur-de-lis & Antique Roman Pointer Marks */}
          <path d="M 50 3 L 53 10 L 47 10 Z" fill="#FFF2A1" />
          <path d="M 50 97 L 53 90 L 47 90 Z" fill="#D4AF37" />
          <path d="M 3 50 L 10 47 L 10 53 Z" fill="#D4AF37" />
          <path d="M 97 50 L 90 47 L 90 53 Z" fill="#FFF2A1" />

          {/* Roman Numeral Compass Engravings */}
          <text x="50" y="17" textAnchor="middle" fill="#FFF2A1" fontSize="5.5" fontFamily="serif" fontWeight="900" opacity="0.9">XII</text>
          <text x="85" y="52" textAnchor="middle" fill="#E5C158" fontSize="5.5" fontFamily="serif" fontWeight="900" opacity="0.9">III</text>
          <text x="50" y="87" textAnchor="middle" fill="#D4AF37" fontSize="5.5" fontFamily="serif" fontWeight="900" opacity="0.9">VI</text>
          <text x="15" y="52" textAnchor="middle" fill="#E5C158" fontSize="5.5" fontFamily="serif" fontWeight="900" opacity="0.9">IX</text>
        </svg>

        {/* Layer 3: Realistic 3D Antique Sphere Core with Switchable Epoch Relic Emblem */}
        <div 
          className="relative z-10 flex items-center justify-center transition-all duration-300"
          style={{ transform: 'translateZ(24px)' }}
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#3D2D0F] via-[#A87B1A] to-[#FFF099] shadow-[0_6px_18px_rgba(0,0,0,0.9),inset_0_1.5px_3px_rgba(255,255,255,0.85),inset_0_-2.5px_5px_rgba(0,0,0,0.85)] border-2 border-[#FFE787]">
            {/* World Globe Continents Relief Shading */}
            <div className="absolute inset-0.5 rounded-full overflow-hidden opacity-90 mix-blend-overlay pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,#FFF,#D4AF37_60%,#3B2B0C)] opacity-95" />
            </div>

            {/* Central Animated Relic Emblem with 3D Pop */}
            <div 
              key={emblemIndex}
              className="relative flex items-center justify-center text-black font-serif font-black select-none animate-scale-up"
            >
              <span 
                className="text-lg sm:text-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] filter transform transition-transform hover:scale-130"
                style={{ textShadow: '0 1px 0 rgba(255,255,255,0.7)' }}
              >
                {activeEmblem.icon}
              </span>
            </div>

            {/* Diamond Sparkle Flare */}
            <div className="absolute -top-1 -right-1 w-3 h-3 flex items-center justify-center pointer-events-none">
              <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#FFF,0_0_16px_#E5C158] animate-ping" style={{ animationDuration: '2s' }} />
              <div className="w-1.5 h-1.5 bg-[#FFFCE0] rounded-full absolute shadow-[0_0_6px_#FFF]" />
            </div>
          </div>
        </div>

        {/* 4 Corner 3D Golden Studs */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-gradient-to-br from-[#FFF5B8] to-[#996515] rounded-full shadow-[0_0_5px_rgba(229,193,88,0.9)]" style={{ transform: 'translateZ(10px)' }} />
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gradient-to-br from-[#FFF5B8] to-[#996515] rounded-full shadow-[0_0_5px_rgba(229,193,88,0.9)]" style={{ transform: 'translateZ(10px)' }} />
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-gradient-to-br from-[#FFF5B8] to-[#996515] rounded-full shadow-[0_0_5px_rgba(229,193,88,0.9)]" style={{ transform: 'translateZ(10px)' }} />
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-gradient-to-br from-[#FFF5B8] to-[#996515] rounded-full shadow-[0_0_5px_rgba(229,193,88,0.9)]" style={{ transform: 'translateZ(10px)' }} />
      </div>

      {/* Playful Interactive Indicator Badge below logo on hover */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        <span className="px-2 py-0.5 bg-[#14110A]/95 text-[#E5C158] text-[9px] font-mono font-bold uppercase rounded-md border border-[#D4AF37]/50 shadow-lg flex items-center gap-1">
          <span>✨</span> {activeEmblem.icon} {activeEmblem.name.split(' ')[0]} ({emblemIndex + 1}/{HISTORICAL_EMBLEMS.length})
        </span>
      </div>

      {/* Quick Artifact Inspect Info Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowArtifactInspector(!showArtifactInspector);
          playSound('click');
        }}
        className="absolute -top-1 -right-2 p-1 bg-[#1A150A] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black rounded-full border border-[#D4AF37]/40 shadow-md transition-all z-30 cursor-pointer text-[9px] opacity-75 hover:opacity-100"
        title="Inspect 7 Ancient Artifacts"
      >
        <Sparkles className="w-2.5 h-2.5" />
      </button>

      {/* 7 Ancient Artifacts Mini 3D Inspector Popover */}
      {showArtifactInspector && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-16 left-0 sm:-left-12 w-72 sm:w-80 bg-[#0F0D09]/95 backdrop-blur-md border border-[#D4AF37]/50 rounded-2xl p-4 shadow-2xl z-50 text-left space-y-3 font-sans animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-[#2C2314] pb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-base">{activeEmblem.icon}</span>
              <span className="text-xs font-mono font-bold text-[#E5C158] uppercase">7 Ancient Artifacts</span>
            </div>
            <button
              onClick={() => setShowArtifactInspector(false)}
              className="p-1 text-[#A09890] hover:text-white rounded-md hover:bg-white/10"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-serif italic font-bold text-white">{activeEmblem.name}</h4>
            <p className="text-[10px] font-mono text-[#D4AF37]">{activeEmblem.origin} • {activeEmblem.era}</p>
            <p className="text-xs text-[#B8B0A2] leading-relaxed pt-1">{activeEmblem.summary}</p>
          </div>

          {/* Quick Artifact Selector Bar */}
          <div className="pt-2 border-t border-[#2C2314] flex items-center justify-between gap-1 overflow-x-auto py-1">
            {HISTORICAL_EMBLEMS.slice(0, 7).map((art, idx) => (
              <button
                key={art.id}
                onClick={() => {
                  setEmblemIndex(idx);
                  playSound('stoneClick');
                }}
                className={`p-1.5 rounded-lg text-base transition-all ${
                  emblemIndex === idx 
                    ? 'bg-[#E5C158] scale-110 shadow-md' 
                    : 'bg-[#1C160C] hover:bg-[#2A2214]'
                }`}
                title={art.name}
              >
                {art.icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
