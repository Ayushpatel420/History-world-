import { useState, useEffect } from 'react';
import { 
  GraduationCap, Sparkles, BookOpenCheck, Compass, Trophy, 
  ArrowRight, RefreshCw, Layers, Brain, Check, BarChart2, Star,
  ShieldAlert, Landmark, Flame, Compass as CompassIcon, Film, Image
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getActivityHistory, 
  computeLocalRecommendations, 
  LearningPath, 
  RecommendationStep,
  ViewedItem,
  QuizRecord
} from '../utils/activityTracker';

interface LearningPathsSectionProps {
  onNavigate: (tab: 'map' | 'timeline' | 'vaults' | 'quizzes' | 'gallery' | 'notes' | 'scholar' | 'encyclopedia' | 'philosophers' | 'compare', subTab?: string, entityId?: string) => void;
}

// Custom defined learning path sequences for specified interests
interface CustomInterestPath {
  id: string;
  title: string;
  interest: 'Ancient Civilizations' | 'World Wars' | 'Monarchies';
  description: string;
  badge: string;
  themeColor: string;
  steps: {
    id: string;
    type: 'article' | 'quiz' | 'multimedia';
    targetTab: 'encyclopedia' | 'quizzes' | 'gallery' | 'vaults' | 'philosophers';
    subTab?: string;
    entityId?: string;
    label: string;
    description: string;
    relicImage?: string;
  }[];
}

const INTEREST_PATHS: CustomInterestPath[] = [
  {
    id: 'interest_ancient_civs',
    title: 'The Cradle of Empires: Ancient Civilizations',
    interest: 'Ancient Civilizations',
    description: 'Unpack the foundational geometry of the Nile Pharaohs, the complex maritime harbors of Carthage, and the magnificent legal structures of Rome.',
    badge: '🏺 Bronze Age to Antiquity',
    themeColor: 'from-[#D4AF37]/20 to-amber-950/30 border-[#D4AF37]/40 text-[#E5C158]',
    steps: [
      {
        id: 'ancient_civ_step_1',
        type: 'article',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'nile_valley',
        label: '1. Foundation Study: Nile Valley Cosmology & Flood Systems',
        description: 'Read and analyze how Egyptian builders leveraged seasonal Nile flood metrics to accumulate monumental food surpluses and finance stone temples.'
      },
      {
        id: 'ancient_civ_step_2',
        type: 'multimedia',
        targetTab: 'gallery',
        label: '2. Immersive Multimedia: Photographic Details of Tutankhamun’s Mask',
        description: 'Examine the high-resolution solid-gold funerary mask inlaid with lapis lazuli. Learn about the master metalworking and gold-beating metallurgy of Egypt.',
        relicImage: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'ancient_civ_step_3',
        type: 'quiz',
        targetTab: 'quizzes',
        label: '3. Arena Verification: Clash of Ancient Empires Trivia',
        description: 'Conquer the Coliseum MCQ assessment. Gain 500 XP points by testing your recall of Hatshepsut and Roman autocracy.'
      },
      {
        id: 'ancient_civ_step_4',
        type: 'article',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'carthaginian_civilization',
        label: '4. Advanced Synthesis: Carthaginian Circular Harbors',
        description: 'Examine the circular maritime "Cothon" shipyard architecture which enabled Carthaginian general Hannibal to project colossal naval defense.'
      }
    ]
  },
  {
    id: 'interest_world_wars',
    title: 'The Crucible of Fire: Major Battles & World Conflicts',
    interest: 'World Wars',
    description: 'Track the 120-year Mediterranean clash between Carthage and Rome, the medieval sieges of Constantinople, and modern global military alliances.',
    badge: '⚔ Heavy Tactics & Alliances',
    themeColor: 'from-rose-500/10 to-rose-950/30 border-rose-500/40 text-rose-400',
    steps: [
      {
        id: 'world_wars_step_1',
        type: 'article',
        targetTab: 'encyclopedia',
        subTab: 'wars',
        entityId: 'punic_wars',
        label: '1. Strategy Study: The Punic Warfare Clashes',
        description: 'Trace the tactical tactical maneuvers of the Roman legions as they encountered general Hannibal Barca\'s war elephant formations.'
      },
      {
        id: 'world_wars_step_2',
        type: 'multimedia',
        targetTab: 'gallery',
        label: '2. Naval Exhibit: Oceanic caravels and Astrolabe navigation',
        description: 'Inspect photographic records of ship designs, lateen sails, and oceanic astrolabes that redefined maritime global warfare.',
        relicImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'world_wars_step_3',
        type: 'quiz',
        targetTab: 'quizzes',
        label: '3. Strategic Conflict Challenge in the Coliseum',
        description: 'Conquer active campaigns and challenge questions to test your strategic and defensive warfare knowledge.'
      },
      {
        id: 'world_wars_step_4',
        type: 'article',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'byzantine_con',
        label: '4. Tactical Siege: Firepower & Fall of Constantinople',
        description: 'Analyze how the introduction of heavy Ottoman gunpowder cannons shattered the triple-layered medieval Theodosian Walls in 1453.'
      }
    ]
  },
  {
    id: 'interest_monarchies',
    title: 'The Sages of the Throne: Sovereign Monarchies',
    interest: 'Monarchies',
    description: 'Master the leadership philosophies and statecraft hacks used by Marcus Aurelius, Chhatrapati Shivaji Maharaj, and female Pharaonic ruler Hatshepsut.',
    badge: '👑 Sovereigns & Philosopher Kings',
    themeColor: 'from-purple-500/10 to-purple-950/30 border-purple-500/40 text-purple-400',
    steps: [
      {
        id: 'monarchy_step_1',
        type: 'article',
        targetTab: 'encyclopedia',
        subTab: 'kings',
        entityId: 'cleopatra_vii',
        label: '1. Diplomatic Study: Cleopatra’s Linguistic Statecraft',
        description: 'Trace how the last Queen of Egypt utilized her polyglot linguistic skills to bypass advisors and coordinate directly with Roman leaders Caesar and Antony.'
      },
      {
        id: 'monarchy_step_2',
        type: 'multimedia',
        targetTab: 'philosophers',
        label: '2. Philosophical Exhibit: Marcus Aurelius Stoic Journal',
        description: 'Examine original segments of "Meditations" written by the Roman emperor on Danube border military posts to maintain virtue under supreme authority.',
        relicImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'monarchy_step_3',
        type: 'quiz',
        targetTab: 'quizzes',
        label: '3. Dynastic Sovereigns Trivia Campaign',
        description: 'Attempt the comprehensive Dynasty trivia. Master the achievements of Shivaji Maharaj and Emperor Akbar the Great.'
      },
      {
        id: 'monarchy_step_4',
        type: 'article',
        targetTab: 'encyclopedia',
        subTab: 'kings',
        entityId: 'shivaji_maharaj',
        label: '4. Sovereign Blueprint: The Asthapradhan Royal Council',
        description: 'Analyze Shivaji Maharaj\'s independent Maratha reforms and construction of unbreachable sea fortresses.'
      }
    ]
  }
];

export default function LearningPathsSection({ onNavigate }: LearningPathsSectionProps) {
  const [activity, setActivity] = useState<{ viewed: ViewedItem[]; quizzes: QuizRecord[] }>({ viewed: [], quizzes: [] });
  const [localPaths, setLocalPaths] = useState<LearningPath[]>([]);
  const [aiPath, setAiPath] = useState<LearningPath | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Users chosen interests - default to including some
  const [selectedInterests, setSelectedInterests] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chronos_user_chosen_interests');
      return saved ? JSON.parse(saved) : ['Ancient Civilizations']; // default
    } catch {
      return ['Ancient Civilizations'];
    }
  });

  // Sync completion states for path steps
  const [completedSteps, setCompletedSteps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chronos_completed_path_steps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save selected interests
  const toggleInterest = (interest: string) => {
    const next = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    setSelectedInterests(next);
    localStorage.setItem('chronos_user_chosen_interests', JSON.stringify(next));
  };

  // Calculate statistics from activity logs
  useEffect(() => {
    const data = getActivityHistory();
    setActivity(data);
    setLocalPaths(computeLocalRecommendations(data.viewed, data.quizzes));

    // Listen for activity updates from quizzes/atlas
    const handler = () => {
      const updated = getActivityHistory();
      setActivity(updated);
      setLocalPaths(computeLocalRecommendations(updated.viewed, updated.quizzes));
    };

    window.addEventListener('chronos_activity_updated', handler);
    return () => {
      window.removeEventListener('chronos_activity_updated', handler);
    };
  }, []);

  // Save completed steps to localStorage
  const toggleStepCompleted = (stepId: string) => {
    const next = completedSteps.includes(stepId)
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];
    setCompletedSteps(next);
    localStorage.setItem('chronos_completed_path_steps', JSON.stringify(next));
  };

  // Run full-stack AI Path Generator
  const generateAIPath = async () => {
    setIsGenerating(true);
    setAiError(null);
    try {
      const response = await fetch('/api/gemini/learning-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          viewedHistory: activity.viewed,
          quizHistory: activity.quizzes
        })
      });

      if (!response.ok) {
        throw new Error('Advisor portal returned an unhealthy response. Please make sure your Gemini API key is configured.');
      }

      const pathData = await response.json();
      if (pathData.error) {
        throw new Error(pathData.error);
      }

      setAiPath({
        ...pathData,
        themeColor: 'from-[#D4AF37]/35 via-amber-950/20 to-lime-950/30 border-[#D4AF37] text-[#F3C543]'
      });
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Error occurred while organizing AI syllabus. Double-check your Gemini configuration.');
    } finally {
      setIsGenerating(false);
    }
  };

  const subjectBreakdown = () => {
    let totals = { egypt: 0, egyptScore: 0, rome: 0, romeScore: 0, india: 0, indiaScore: 0 };
    activity.quizzes.forEach(q => {
      const txt = (q.title + ' ' + q.category).toLowerCase();
      if (txt.includes('egypt') || txt.includes('nile') || txt.includes('pharaoh')) {
        totals.egypt += q.totalQuestions;
        totals.egyptScore += q.score;
      }
      if (txt.includes('ancient') || txt.includes('rome') || txt.includes('greek') || txt.includes('empire')) {
        totals.rome += q.totalQuestions;
        totals.romeScore += q.score;
      }
      if (txt.includes('india') || txt.includes('monarch')) {
        totals.india += q.totalQuestions;
        totals.indiaScore += q.score;
      }
    });
    return totals;
  };

  const currentBreakdown = subjectBreakdown();

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* 1. Header Hero Area */}
      <div className="bg-[#030D0B] border border-[#234D43] p-6 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#122C26] border border-[#234D43] rounded-full text-xs text-[#E5C158] font-mono font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 animate-bounce" /> Dynamic Syllabus Hub
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-white font-black tracking-tight">
            Personalised <span className="text-[#E5C158]">Learning Paths</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8CA59C] leading-relaxed font-sans">
            Configure your core historical interests inside our personalized engine. Chronos automatically stitches together specialized modules, interactive photographic relics, and Coliseum quizzes into clear sequenced timelines with automated progress tracking.
          </p>
        </div>

        <button
          onClick={generateAIPath}
          disabled={isGenerating}
          className="shrink-0 relative group px-6 py-4 bg-gradient-to-r from-amber-500 through-[#E5C158] to-emerald-500 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-xl text-black font-extrabold text-sm font-mono flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xl"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-black" />
              <span>Analyzing Progress...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4.5 h-4.5 text-black" />
              <span>Synthesize AI Advisor Path</span>
            </>
          )}
        </button>
      </div>

      {aiError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4.5 bg-rose-950/40 border border-rose-500/30 text-rose-300 rounded-2xl flex items-start gap-3.5 text-sm"
        >
          <div className="p-2 bg-rose-900/40 border border-rose-500/40 rounded-lg shrink-0 text-rose-400">
            <RefreshCw className="w-5 h-5 animate-spin" />
          </div>
          <div className="space-y-1">
            <h6 className="font-bold">Gemini Synthesis Delayed</h6>
            <p className="text-xs text-rose-300/80 leading-relaxed font-sans">{aiError}</p>
          </div>
        </motion.div>
      )}

      {/* 2. Interests Configuration Dashboard */}
      <div className="bg-[#0A110F] border border-[#234D43]/60 p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#234D43]/40 pb-3">
          <div className="text-left">
            <h4 className="text-lg font-serif italic text-white font-bold flex items-center gap-2">
              <CompassIcon className="w-5 h-5 text-[#E5C158] animate-spin-slow" />
              Identify Your Historical Interests
            </h4>
            <p className="text-xs text-[#8CA59C] font-sans">
              Toggle subjects to activate custom-sequenced curricula containing multimedia and milestone checks.
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#E5C158] bg-[#122C26] px-2.5 py-1 rounded border border-[#234D43]">
            {selectedInterests.length} Selected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Ancient Civilizations', icon: Landmark, desc: 'Nile Valley, Carthaginian shipyards, and legal foundations of Rome.' },
            { name: 'World Wars', icon: Flame, desc: 'Punic maneuvers, Constantinople cannon sieges, and European conflicts.' },
            { name: 'Monarchies', icon: CrownIcon, desc: 'Statecraft of Cleopatra, Stoicism of Aurelius, and Maratha sea forts.' }
          ].map(item => {
            const Icon = item.icon === CrownIcon ? Star : item.icon; // Handle Crown fallback
            const isSelected = selectedInterests.includes(item.name);
            return (
              <button
                key={item.name}
                onClick={() => toggleInterest(item.name)}
                className={`p-4.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected 
                    ? 'bg-gradient-to-br from-[#122C26] to-[#0A1E1A] border-[#E5C158] shadow-lg shadow-[#E5C158]/5' 
                    : 'bg-[#030D0B] border-[#234D43]/40 hover:border-[#234D43] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#E5C158] text-black' : 'bg-[#122C26] text-[#8CA59C]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#E5C158] border-[#E5C158] text-black' : 'border-[#234D43]'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-sm text-white font-serif">{item.name}</h5>
                  <p className="text-[11px] text-[#8CA59C] leading-relaxed font-sans">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Interest-Based Personalized Syllabi Progress Tracks */}
      <div className="space-y-6">
        <div className="border-b border-[#234D43]/40 pb-2 flex items-center justify-between">
          <h3 className="text-xl font-serif italic text-white font-bold flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#E5C158]" /> Interest-Based Course tracks
          </h3>
          <span className="text-[10px] text-[#A09890] font-mono">Completed items persist automatically</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {INTEREST_PATHS.map((path) => {
              if (!selectedInterests.includes(path.interest)) return null;

              // Calculate progress
              const totalSteps = path.steps.length;
              const completedCount = path.steps.filter(s => completedSteps.includes(s.id)).length;
              const percent = Math.round((completedCount / totalSteps) * 100);

              return (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-5.5 bg-gradient-to-br ${path.themeColor} border rounded-2xl flex flex-col justify-between space-y-5 transition-all shadow-md col-span-1 xl:col-span-3`}
                >
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#234D43]/40 pb-3">
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-mono text-[#E5C158] bg-[#122C26] border border-[#234D43] px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                          {path.badge}
                        </span>
                        <h4 className="text-2xl font-serif italic text-white font-black">{path.title}</h4>
                        <p className="text-xs text-[#8CA59C] font-sans max-w-4xl">{path.description}</p>
                      </div>

                      {/* Sleek Progress Ring & percentage display */}
                      <div className="flex items-center gap-3 bg-[#030D0B] border border-[#234D43] p-2.5 rounded-xl self-start sm:self-center">
                        <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="20" cy="20" r="16" fill="transparent" stroke="#122C26" strokeWidth="3" />
                            <circle 
                              cx="20" 
                              cy="20" 
                              r="16" 
                              fill="transparent" 
                              stroke="#E5C158" 
                              strokeWidth="3" 
                              strokeDasharray={`${2 * Math.PI * 16}`}
                              strokeDashoffset={`${2 * Math.PI * 16 * (1 - percent / 100)}`}
                              className="transition-all duration-500"
                            />
                          </svg>
                          <span className="absolute text-[10px] font-mono text-[#E5C158] font-bold">{percent}%</span>
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] font-mono block text-[#8CA59C] uppercase font-bold">Track progress</span>
                          <span className="text-xs text-white font-bold font-mono">
                            {completedCount} of {totalSteps} Core Milestones
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Sequence of Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                      {path.steps.map((step, idx) => {
                        const isDone = completedSteps.includes(step.id);
                        return (
                          <div 
                            key={step.id}
                            className={`p-4 bg-[#030D0B]/90 border ${isDone ? 'border-[#E5C158]/50 shadow-md shadow-[#E5C158]/2 opacity-90' : 'border-[#234D43]'} hover:border-[#E5C158]/60 transition-all rounded-xl text-left flex flex-col justify-between space-y-3`}
                          >
                            <div className="space-y-2">
                              {/* Checkbox button and title */}
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-[10px] font-mono text-[#E5C158] font-black uppercase">
                                  {step.type === 'article' ? '📖 Step Article' : step.type === 'quiz' ? '🏆 Step Quiz Conquest' : '🎬 Multimedia Exhibit'}
                                </span>
                                <button
                                  onClick={() => toggleStepCompleted(step.id)}
                                  className={`w-5 h-5 rounded border shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                                    isDone 
                                      ? 'bg-[#E5C158] border-[#E5C158] text-black' 
                                      : 'border-[#234D43] text-transparent hover:border-[#E5C158]'
                                  }`}
                                  title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </button>
                              </div>

                              <h5 className={`font-serif italic font-bold text-white text-sm leading-tight ${isDone ? 'line-through text-white/50' : ''}`}>
                                {step.label}
                              </h5>
                              <p className="text-[11px] text-[#8CA59C] leading-relaxed font-sans font-light">
                                {step.description}
                              </p>

                              {/* Multimedia Relic Image if applicable */}
                              {step.relicImage && (
                                <div className="h-28 w-full rounded-lg overflow-hidden border border-[#234D43]/30 relative mt-2">
                                  <img 
                                    src={step.relicImage} 
                                    alt="multimedia exhibition preview" 
                                    className="w-full h-full object-cover select-none" 
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1.5">
                                    <span className="text-[9px] font-mono text-[#E5C158] font-bold uppercase tracking-wider flex items-center gap-1">
                                      <Image className="w-2.5 h-2.5" /> High Resolution Exhibit
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>

                            <button
                              onClick={() => onNavigate(step.targetTab, step.subTab, step.entityId)}
                              className="w-full text-xs font-mono font-bold py-2 bg-[#122C26] hover:bg-[#E5C158] border border-[#234D43] text-[#E5C158] hover:text-black rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                            >
                              <span>Launch Module</span> <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#234D43]/40 flex justify-between items-center text-xs">
                    <span className="font-mono text-[9px] text-[#8CA59C]">Progress tracking stored on disk</span>
                    {percent === 100 ? (
                      <span className="font-mono text-[10px] font-black text-[#E5C158] animate-bounce tracking-wider flex items-center gap-1">
                        🏆 INTEREST ROADMAP MASTERED!
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] font-black text-white/40 uppercase tracking-widest">Syllabus Active</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Stats Diagnostic Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Study Breadth */}
        <div className="bg-[#0A1E1A] border border-[#234D43] p-5 rounded-2xl space-y-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8CA59C] uppercase tracking-wider">Historical Breadth</span>
            <Layers className="w-4 h-4 text-[#E5C158]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-serif italic text-white font-bold">{activity.viewed.length}</h4>
            <p className="text-xs text-[#8CA59C] font-mono">Encyclopedia articles viewed</p>
          </div>
          <div className="text-[10px] text-[#E5C158] font-mono">
            {activity.viewed.length === 0 ? 'Explore articles to seed AI suggestions.' : 'Healthy content footprint loaded.'}
          </div>
        </div>

        {/* Card 2: Trivia Records */}
        <div className="bg-[#0A1E1A] border border-[#234D43] p-5 rounded-2xl space-y-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8CA59C] uppercase tracking-wider">Coliseum Campaigns</span>
            <Trophy className="w-4 h-4 text-[#E5C158]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-serif italic text-white font-bold">{activity.quizzes.length}</h4>
            <p className="text-xs text-[#8CA59C] font-mono">Quiz conquests completed</p>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono">
            XP Status: Tracked securely inside archive notes.
          </div>
        </div>

        {/* Card 3: Subject Diagnostic Profile */}
        <div className="bg-[#0A1E1A] border border-[#234D43] p-5 rounded-2xl space-y-3">
          <span className="text-xs font-mono text-[#8CA59C] uppercase tracking-wider block">Relative Topic Accuracy</span>
          <div className="space-y-2.5">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white">Dynastic Egypt</span>
                <span className="text-[#E5C158]">
                  {currentBreakdown.egypt > 0 ? `${Math.round((currentBreakdown.egyptScore / currentBreakdown.egypt) * 100)}%` : '0%'}
                </span>
              </div>
              <div className="h-1.5 bg-[#030D0B] rounded-full overflow-hidden border border-[#234D43]/50">
                <div 
                  className="h-full bg-cyan-400 transition-all duration-500" 
                  style={{ width: `${currentBreakdown.egypt > 0 ? (currentBreakdown.egyptScore / currentBreakdown.egypt) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white">Rome & Greece</span>
                <span className="text-[#E5C158]">
                  {currentBreakdown.rome > 0 ? `${Math.round((currentBreakdown.romeScore / currentBreakdown.rome) * 100)}%` : '0%'}
                </span>
              </div>
              <div className="h-1.5 bg-[#030D0B] rounded-full overflow-hidden border border-[#234D43]/50">
                <div 
                  className="h-full bg-[#D4AF37] transition-all duration-500" 
                  style={{ width: `${currentBreakdown.rome > 0 ? (currentBreakdown.romeScore / currentBreakdown.rome) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white">Indian History</span>
                <span className="text-[#E5C158]">
                  {currentBreakdown.india > 0 ? `${Math.round((currentBreakdown.indiaScore / currentBreakdown.india) * 100)}%` : '0%'}
                </span>
              </div>
              <div className="h-1.5 bg-[#030D0B] rounded-full overflow-hidden border border-[#234D43]/50">
                <div 
                  className="h-full bg-purple-500 transition-all duration-500" 
                  style={{ width: `${currentBreakdown.india > 0 ? (currentBreakdown.indiaScore / currentBreakdown.india) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Dynamic AI/Local Recommendation Syllabi */}
      <div className="space-y-6">
        <div className="border-b border-[#234D43]/40 pb-2 flex items-center justify-between">
          <h3 className="text-xl font-serif italic text-white font-bold flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#E5C158]" /> Dynamic Local Recommendations
          </h3>
          <span className="text-[10px] text-[#A09890] font-mono">Algorithmic Alignment Enabled</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <AnimatePresence>
            {aiPath && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`p-6 bg-gradient-to-br ${aiPath.themeColor} border rounded-2xl shadow-xl space-y-6 text-left col-span-1 xl:col-span-2`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#234D43] pb-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#D4AF37]/25 border border-[#D4AF37]/45 rounded text-[11px] font-mono text-white tracking-wide uppercase font-black animate-pulse">
                      <Sparkles className="w-3 h-3 text-[#E5C158]" /> Pure AI Custom Path
                    </span>
                    <h4 className="text-2xl font-serif italic text-white font-black">{aiPath.title}</h4>
                    <p className="text-xs font-mono text-[#D4AF37] tracking-wider uppercase">{aiPath.subject} • {aiPath.type}</p>
                  </div>
                  <span className="bg-[#030D0B] border border-[#234D43] px-3 py-1 text-xs text-[#8CA59C] rounded-lg font-mono">
                    {aiPath.metricsText}
                  </span>
                </div>

                <div className="p-4 bg-[#030D0B]/80 border border-[#234D43]/40 rounded-xl space-y-2">
                  <h6 className="text-[#E5C158] font-bold text-xs uppercase font-mono flex items-center gap-1">
                    <Brain className="w-4 h-4" /> Academic Assessment Statement:
                  </h6>
                  <p className="text-xs text-[#8CA59C] leading-relaxed font-sans">{aiPath.whySuggested}</p>
                </div>

                <div className="space-y-4">
                  <h5 className="font-mono text-xs uppercase text-white font-extrabold tracking-wider">Curriculum Timeline Requirements:</h5>
                  <div className="space-y-3">
                    {aiPath.steps.map((step, idx) => {
                      const stepKey = `ai_${aiPath.id}_step_${idx}`;
                      const isDone = completedSteps.includes(stepKey);
                      return (
                        <div 
                          key={stepKey} 
                          className={`p-4 bg-[#030D0B] border ${isDone ? 'border-[#D4AF37]/50 opacity-90' : 'border-[#234D43]'} hover:border-[#E5C158]/55 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all`}
                        >
                          <div className="flex items-start gap-3.5 text-left">
                            <button
                              onClick={() => toggleStepCompleted(stepKey)}
                              className={`w-5.5 h-5.5 rounded-full border shrink-0 flex items-center justify-center transition-all mt-0.5 ${
                                isDone 
                                  ? 'bg-[#E5C158] border-[#E5C158] text-black' 
                                  : 'border-[#234D43] text-transparent hover:border-[#E5C158]'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </button>
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-[#E5C158] uppercase tracking-wide">
                                Step {idx + 1}: {step.type.toUpperCase()}
                              </span>
                              <h6 className={`font-bold font-serif text-white text-sm ${isDone ? 'line-through text-white/50' : ''}`}>
                                {step.label}
                              </h6>
                              <p className="text-xs text-[#8CA59C] leading-relaxed max-w-xl font-sans">
                                {step.description}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => onNavigate(step.targetTab, step.subTab, step.id)}
                            className="shrink-0 text-xs font-mono font-bold px-3 py-2 bg-[#122C26] hover:bg-[#234D43] border border-[#234D43] text-[#E5C158] hover:text-white rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-md"
                          >
                            <span>Explore Item</span> <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {localPaths.map(path => (
              <motion.div
                key={path.id}
                layout
                className={`p-5.5 bg-gradient-to-br ${path.themeColor} border rounded-2xl flex flex-col justify-between space-y-5 transition-all shadow-md col-span-1`}
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[#234D43]/40 pb-3">
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-mono text-white/60 bg-[#122C26] border border-[#234D43] px-2 py-0.5 rounded uppercase">
                        {path.type}
                      </span>
                      <h4 className="text-xl font-serif italic text-white font-extrabold">{path.title}</h4>
                      <p className="text-[10px] font-mono tracking-wide uppercase opacity-90">{path.subject}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#8CA59C] leading-relaxed line-clamp-4 font-sans text-left">
                    {path.whySuggested}
                  </p>

                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono font-black text-white/50 uppercase block">Curriculum Timeline Roadmap:</span>
                    <div className="space-y-2">
                      {path.steps.map((step, idx) => {
                        const stepKey = `local_${path.id}_step_${idx}`;
                        const isDone = completedSteps.includes(stepKey);
                        return (
                          <div 
                            key={stepKey}
                            className={`p-3 bg-[#030D0B] border ${isDone ? 'border-[#D4AF37]/50 opacity-75' : 'border-[#234D43]'} rounded-xl flex items-start gap-2.5 justify-between text-left transition-all`}
                          >
                            <div className="flex items-start gap-2">
                              <button
                                onClick={() => toggleStepCompleted(stepKey)}
                                className={`w-4.5 h-4.5 rounded-full border shrink-0 flex items-center justify-center transition-all mt-0.5 ${
                                  isDone 
                                    ? 'bg-[#E5C158] border-[#E5C158] text-black' 
                                    : 'border-[#234D43] text-transparent hover:border-[#E5C158]'
                                }`}
                              >
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </button>
                              <div className="space-y-0.5">
                                <h6 className={`font-bold text-white text-xs ${isDone ? 'line-through opacity-50' : ''}`}>
                                  {step.label}
                                </h6>
                                <p className="text-[10.5px] text-[#8CA59C] leading-normal line-clamp-2 max-w-sm font-sans">
                                  {step.description}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => onNavigate(step.targetTab, step.subTab, step.id)}
                              className="shrink-0 text-[10px] font-mono font-bold px-2 py-1.5 bg-[#122C26] hover:bg-[#234D43] border border-[#234D43] text-[#E5C158] hover:text-white rounded flex items-center gap-0.5 transition-all cursor-pointer shadow"
                            >
                              <span>Explore</span> <ArrowRight className="w-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#234D43]/40 flex justify-between items-center text-xs">
                  <span className="font-mono text-[9px] text-[#8CA59C]">{path.metricsText}</span>
                  <span className="font-mono text-[10px] font-black tracking-widest uppercase">SYLLABUS LOCKED</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Minimal stub component to keep build robust
const CrownIcon = Star;
