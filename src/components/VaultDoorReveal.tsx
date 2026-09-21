import { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface VaultDoorProps {
  children: React.ReactNode;
  sectionName: string;
}

export default function VaultDoorReveal({ children, sectionName }: VaultDoorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Formatted user-friendly names
  const getSectionTitle = (name: string) => {
    switch (name.toLowerCase()) {
      case 'map':
        return 'EMPIRICAL WORLD MAP';
      case 'timeline':
        return 'TEMPORAL CHRONOLOGY';
      case 'vaults':
        return 'SOVEREIGN VAULT REGISTRY';
      case 'quizzes':
        return 'COLISEUM TRIVIA CHALLENGE';
      case 'gallery':
        return 'SACRED RELIC ARCHIVE';
      case 'scholar':
        return 'GENERATIVE SCHOLAR INTELLIGENCE';
      case 'notes':
        return 'PERSONAL REFLECTION JOURNAL';
      case 'encyclopedia':
        return 'UNIVERSAL HISTORICAL ARCHIVE';
      default:
        return name.toUpperCase() + ' ARCHIVE';
    }
  };

  // Pre-configured offsets for physical steam release puffs
  const steamPuffs = [
    { id: 1, x: -90, y: -60, scale: 2.8, delay: 0.15 },
    { id: 2, x: 90, y: -90, scale: 2.4, delay: 0.2 },
    { id: 3, x: -110, y: 50, scale: 3.2, delay: 0.25 },
    { id: 4, x: 120, y: 70, scale: 2.6, delay: 0.18 },
    { id: 5, x: -70, y: -130, scale: 3.0, delay: 0.3 },
    { id: 6, x: 80, y: 110, scale: 2.0, delay: 0.12 },
  ];

  return (
    <motion.div
      // Physical shudder/shake when heavy locks retract & doors break open (around 0.45s)
      animate={{
        x: [0, 0, -3, 3, -2, 2, -1, 1, 0],
        y: [0, 0, 2, -2, 1, -1, 1, -1, 0]
      }}
      transition={{
        duration: 0.5,
        delay: 0.45,
        ease: 'easeInOut'
      }}
      className="relative w-full min-h-[500px] overflow-hidden rounded-2xl"
      style={{ perspective: '1500px' }}
    >
      {/* Target Content underneath */}
      <div className={!isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-300'}>
        {children}
      </div>

      {/* The Opening Vault Door Overlay */}
      {!isOpen && (
        <div className="absolute inset-0 z-50 flex overflow-hidden rounded-2xl pointer-events-none">
          {/* Blocks all cursor hover conflicts during high-speed transitions */}
          <div className="absolute inset-0 bg-transparent pointer-events-auto z-45" />

          {/* LEFT HEAVY GATE */}
          <motion.div
            initial={{ x: 0, rotateY: 0, z: 0 }}
            animate={{
              x: ['0%', '-3%', '-100%'],
              rotateY: [0, -5, -92],
              z: [0, -30, -180]
            }}
            transition={{
              duration: 1.25,
              times: [0, 0.15, 1],
              ease: [0.76, 0, 0.24, 1],
              delay: 0.45
            }}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#0A0A0A] border-r border-[#2A2A2A] z-40 flex flex-col justify-center items-end pr-8 overflow-hidden"
            style={{
              transformOrigin: 'left center',
              backgroundImage: 'radial-gradient(circle at right, #1F1F21 0%, #080808 100%)',
              boxShadow: 'inset -25px 0 50px rgba(0,0,0,0.95)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Rivets & Structural Engravings */}
            <div className="absolute top-8 right-6 w-2 h-2 rounded-full bg-[#1A1A1D] border border-[#D4AF37]/30 shadow-inner" />
            <div className="absolute bottom-8 right-6 w-2 h-2 rounded-full bg-[#1A1A1D] border border-[#D4AF37]/30 shadow-inner" />
            <div className="absolute top-1/4 right-8 w-2 h-2 rounded-full bg-[#1A1A1D] border border-[#D4AF37]/30" />
            <div className="absolute bottom-1/4 right-8 w-2 h-2 rounded-full bg-[#1A1A1D] border border-[#D4AF37]/30" />

            {/* Industrial Panel Grooves */}
            <div className="h-5/6 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/15 to-transparent mr-12" />
            
            {/* Ambient Rotational Background Gear */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="absolute top-12 right-12 w-24 h-24 rounded-full border border-[#D4AF37]/10 flex items-center justify-center opacity-30"
            >
              <div className="w-16 h-16 rounded-full border border-dashed border-[#D4AF37]/10" />
              <div className="absolute w-1 h-12 bg-[#D4AF37]/10" />
            </motion.div>

            {/* Left Hydraulic Sealing Bolts (Retracting leftwards at 0.15s) */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: -35 }}
              transition={{ duration: 0.35, ease: [0.36, 0.07, 0.19, 0.97], delay: 0.15 }}
              className="absolute right-0 top-[22%] w-10 h-3.5 bg-gradient-to-l from-[#D4AF37]/80 via-stone-700 to-stone-900 border-y border-l border-[#D4AF37]/30 rounded-l-md shadow-[inset_-2px_0_4px_rgba(212,175,55,0.4)]"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: -35 }}
              transition={{ duration: 0.35, ease: [0.36, 0.07, 0.19, 0.97], delay: 0.15 }}
              className="absolute right-0 top-[50%] w-10 h-3.5 bg-gradient-to-l from-[#D4AF37]/80 via-stone-700 to-stone-900 border-y border-l border-[#D4AF37]/30 rounded-l-md shadow-[inset_-2px_0_4px_rgba(212,175,55,0.4)]"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: -35 }}
              transition={{ duration: 0.35, ease: [0.36, 0.07, 0.19, 0.97], delay: 0.15 }}
              className="absolute right-0 top-[78%] w-10 h-3.5 bg-gradient-to-l from-[#D4AF37]/80 via-stone-700 to-stone-900 border-y border-l border-[#D4AF37]/30 rounded-l-md shadow-[inset_-2px_0_4px_rgba(212,175,55,0.4)]"
            />
          </motion.div>

          {/* RIGHT HEAVY GATE */}
          <motion.div
            initial={{ x: 0, rotateY: 0, z: 0 }}
            animate={{
              x: ['0%', '3%', '100%'],
              rotateY: [0, 5, 92],
              z: [0, -30, -180]
            }}
            transition={{
              duration: 1.25,
              times: [0, 0.15, 1],
              ease: [0.76, 0, 0.24, 1],
              delay: 0.45
            }}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#0A0A0A] border-l border-[#2A2A2A] z-40 flex flex-col justify-center items-start pl-8 overflow-hidden"
            style={{
              transformOrigin: 'right center',
              backgroundImage: 'radial-gradient(circle at left, #1F1F21 0%, #080808 100%)',
              boxShadow: 'inset 25px 0 50px rgba(0,0,0,0.95)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Rivets & Structural Engravings */}
            <div className="absolute top-8 left-6 w-2 h-2 rounded-full bg-[#1A1A1D] border border-[#D4AF37]/30 shadow-inner" />
            <div className="absolute bottom-8 left-6 w-2 h-2 rounded-full bg-[#1A1A1D] border border-[#D4AF37]/30 shadow-inner" />
            <div className="absolute top-1/4 left-8 w-2 h-2 rounded-full bg-[#1A1A1D] border border-[#D4AF37]/30" />
            <div className="absolute bottom-1/4 left-8 w-2 h-2 rounded-full bg-[#1A1A1D] border border-[#D4AF37]/30" />

            {/* Industrial Panel Grooves */}
            <div className="h-5/6 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/15 to-transparent ml-12" />

            {/* Ambient Rotational Background Gear */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-12 left-12 w-24 h-24 rounded-full border border-[#D4AF37]/10 flex items-center justify-center opacity-30"
            >
              <div className="w-16 h-16 rounded-full border border-dashed border-[#D4AF37]/10" />
              <div className="absolute w-1 h-12 bg-[#D4AF37]/10" />
            </motion.div>

            {/* Right Hydraulic Sealing Bolts (Retracting rightwards at 0.15s) */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 35 }}
              transition={{ duration: 0.35, ease: [0.36, 0.07, 0.19, 0.97], delay: 0.15 }}
              className="absolute left-0 top-[22%] w-10 h-3.5 bg-gradient-to-r from-[#D4AF37]/80 via-stone-700 to-stone-900 border-y border-r border-[#D4AF37]/30 rounded-r-md shadow-[inset_2px_0_4px_rgba(212,175,55,0.4)]"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 35 }}
              transition={{ duration: 0.35, ease: [0.36, 0.07, 0.19, 0.97], delay: 0.15 }}
              className="absolute left-0 top-[50%] w-10 h-3.5 bg-gradient-to-r from-[#D4AF37]/80 via-stone-700 to-stone-900 border-y border-r border-[#D4AF37]/30 rounded-r-md shadow-[inset_2px_0_4px_rgba(212,175,55,0.4)]"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 35 }}
              transition={{ duration: 0.35, ease: [0.36, 0.07, 0.19, 0.97], delay: 0.15 }}
              className="absolute left-0 top-[78%] w-10 h-3.5 bg-gradient-to-r from-[#D4AF37]/80 via-stone-700 to-stone-900 border-y border-r border-[#D4AF37]/30 rounded-r-md shadow-[inset_2px_0_4px_rgba(212,175,55,0.4)]"
            />
          </motion.div>

          {/* HYDRAULIC STEAM RELEASE EFFECT (Drifting outward at 0.1s to 1.1s) */}
          {steamPuffs.map((puff) => (
            <motion.div
              key={puff.id}
              initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0.75, 0],
                scale: [0.2, puff.scale, puff.scale * 1.6],
                x: puff.x,
                y: puff.y,
              }}
              transition={{
                duration: 0.95,
                ease: 'easeOut',
                delay: puff.delay
              }}
              className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-white/20 via-[#D4AF37]/15 to-transparent pointer-events-none z-55 m-auto inset-0 filter blur-[8px]"
            />
          ))}

          {/* INNER CALIBRATING MEASURING RING (Rotated Counter-Clockwise behind main gear) */}
          <motion.div
            initial={{ scale: 0.9, rotate: 0 }}
            animate={{
              rotate: -360,
              scale: [0.9, 1.15, 0],
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: 1.35,
              times: [0, 0.45, 1],
              ease: 'easeInOut'
            }}
            className="absolute inset-0 m-auto w-[190px] h-[190px] rounded-full border-2 border-stone-800 bg-[#060606]/80 z-45 flex items-center justify-center shadow-lg pointer-events-none"
            style={{ border: '2px dashed rgba(212, 175, 55, 0.18)' }}
          >
            {/* Dial Tick marks */}
            <div className="absolute inset-2 rounded-full border border-[#D4AF37]/10" />
            <div className="absolute top-1.5 left-1/2 w-0.5 h-3 bg-[#D4AF37]/40 -translate-x-1/2" />
            <div className="absolute bottom-1.5 left-1/2 w-0.5 h-3 bg-[#D4AF37]/40 -translate-x-1/2" />
            <div className="absolute left-1.5 top-1/2 w-3 h-0.5 bg-[#D4AF37]/40 -translate-y-1/2" />
            <div className="absolute right-1.5 top-1/2 w-3 h-0.5 bg-[#D4AF37]/40 -translate-y-1/2" />
          </motion.div>

          {/* ROYAL GOLDEN STEERING WHEEL & GEARS */}
          <motion.div
            initial={{ opacity: 1, scale: 1, rotate: 0 }}
            animate={{ 
              opacity: [1, 1, 0], 
              scale: [1, 1.1, 0.75], 
              rotate: [0, -220, -360] 
            }}
            transition={{ 
              duration: 1.35, 
              times: [0, 0.5, 1],
              ease: [0.4, 0, 0.2, 1]
            }}
            onAnimationComplete={() => setIsOpen(true)}
            className="absolute inset-0 m-auto w-40 h-40 rounded-full border-4 border-[#D4AF37] bg-[#101011] z-50 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.35),inset_0_0_25px_rgba(0,0,0,0.98)]"
          >
            {/* Physically Modeled Exterior Gear Teeth (Interlocking feel) */}
            {[...Array(12)].map((_, idx) => (
              <div
                key={idx}
                className="absolute w-5 h-5 bg-[#D4AF37] border-t border-x border-[#9E7B1A] rounded-sm -z-10"
                style={{
                  transform: `rotate(${idx * 30}deg) translateY(-78px)`,
                  transformOrigin: 'center 78px',
                }}
              />
            ))}

            {/* Glowing lock status indicator pulsing with time */}
            <motion.div
              animate={{
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                boxShadow: [
                  '0 0 8px rgba(239, 68, 68, 0.6)',
                  '0 0 12px rgba(245, 158, 11, 0.7)',
                  '0 0 16px rgba(16, 185, 129, 0.9)'
                ]
              }}
              transition={{
                duration: 0.9,
                times: [0, 0.45, 0.85],
                ease: 'easeInOut'
              }}
              className="w-3 h-3 rounded-full border border-white/20 flex items-center justify-center"
            />
            
            {/* Dynamic Interactive Icon based on authorization */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-1"
            >
              <Compass className="w-10 h-10 text-[#D4AF37] opacity-95" />
            </motion.div>
            
            <span className="text-[7.5px] font-mono tracking-[0.14em] text-[#DCE1E5] mt-1.5 font-extrabold uppercase text-center select-none px-3 max-w-[135px] truncate drop-shadow">
              {getSectionTitle(sectionName)}
            </span>

            {/* Status Subtext switching with authorization state */}
            <motion.span 
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-[6px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase mt-0.5 select-none text-center"
            >
              DECRYPTING SECTOR
            </motion.span>

            {/* Vintage Concentric Engravings inside */}
            <div className="absolute inset-1.5 rounded-full border border-[#D4AF37]/35 pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-[#D4AF37]/15 pointer-events-none" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
