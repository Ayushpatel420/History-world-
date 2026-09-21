import { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  User, 
  Calendar, 
  Compass, 
  Cpu, 
  Award, 
  Sparkles,
  BookMarked,
  Layers,
  Clock,
  Trash2,
  UserPlus,
  LogIn,
  LogOut,
  ChevronRight,
  Plus,
  Bookmark as BookmarkIcon,
  BookOpen,
  Mail,
  Github,
  Check,
  AlertCircle,
  Trophy,
  History,
  Activity,
  Database,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { UserNote, Bookmark } from '../types';
import { getActivityHistory, QuizRecord } from '../utils/activityTracker';
import BackupRestoreModal from './BackupRestoreModal';

// Internal Account Interface
export interface ScholarAccount {
  email: string;
  name: string;
  title: string;
  avatar: 'scribe' | 'ranger' | 'emperor' | 'oracle' | 'philosopher';
  specialization: string;
  level: number;
  xp: number;
  createdAt: string;
}

interface PersonalProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: UserNote[];
  bookmarks: Bookmark[];
  onDeleteNote: (id: string) => void;
  onToggleBookmark: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  onNavigateToBookmark: (type: Bookmark['type'], targetId: string) => void;
  onImportBackup?: (importedNotes: UserNote[], importedBookmarks: Bookmark[], mode: 'merge' | 'replace') => void;
}

// Map avatar strings to emojis/styles for clean presentation
const AVATAR_STYLING = {
  scribe: { emoji: '📜', label: 'Imperial Scribe', border: 'border-yellow-600', text: 'text-yellow-400', bg: 'bg-yellow-950/25' },
  ranger: { emoji: '🏹', label: 'Epoch Pathfinder', border: 'border-green-600', text: 'text-green-400', bg: 'bg-green-950/25' },
  emperor: { emoji: '👑', label: 'Dynastic Ruler', border: 'border-purple-600', text: 'text-purple-400', bg: 'bg-purple-950/25' },
  oracle: { emoji: '👁️', label: 'Celestial Oracle', border: 'border-cyan-600', text: 'text-cyan-400', bg: 'bg-cyan-950/25' },
  philosopher: { emoji: '🧠', label: 'Socratic Thinker', border: 'border-amber-600', text: 'text-amber-400', bg: 'bg-amber-950/25' },
};

export default function PersonalProfileModal({ 
  isOpen, 
  onClose,
  notes,
  bookmarks,
  onDeleteNote,
  onToggleBookmark,
  onNavigateToBookmark,
  onImportBackup
}: PersonalProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'portal' | 'curator'>('dashboard');
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Account system states
  const [accounts, setAccounts] = useState<ScholarAccount[]>([]);
  const [activeAccount, setActiveAccount] = useState<ScholarAccount | null>(null);

  // Registration form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regAvatar, setRegAvatar] = useState<keyof typeof AVATAR_STYLING>('scribe');
  const [regSpecial, setRegSpecial] = useState('Classical Rome & Greece');
  const [regError, setRegError] = useState('');
  
  // Real-time activity telemetry from tracker
  const [quizzesCompleted, setQuizzesCompleted] = useState<QuizRecord[]>([]);

  // Load registered profiles and current active account on mount
  useEffect(() => {
    try {
      const savedAccounts = localStorage.getItem('chronos_vault_accounts');
      if (savedAccounts) {
        setAccounts(JSON.parse(savedAccounts));
      } else {
        // Pre-seed default student profile corresponding to the user's details
        const defaultProfile: ScholarAccount = {
          email: 'aaushpatel620@gmail.com',
          name: 'Aaush Patel',
          title: 'Imperial Scholar',
          avatar: 'oracle',
          specialization: 'Quantum Timelines & Empires',
          level: 3,
          xp: 1200,
          createdAt: new Date().toLocaleDateString()
        };
        localStorage.setItem('chronos_vault_accounts', JSON.stringify([defaultProfile]));
        setAccounts([defaultProfile]);
        
        // Auto-select first pre-seeded account
        localStorage.setItem('chronos_active_account', JSON.stringify(defaultProfile));
        setActiveAccount(defaultProfile);
      }

      const active = localStorage.getItem('chronos_active_account');
      if (active) {
        setActiveAccount(JSON.parse(active));
      }

      // Fetch interactive history logs
      const history = getActivityHistory();
      setQuizzesCompleted(history.quizzes);
    } catch (e) {
      console.error('Error hydrating profile system:', e);
    }
  }, [isOpen]);

  // Handle listening for new updates
  useEffect(() => {
    const handleActivityUpdate = () => {
      const history = getActivityHistory();
      setQuizzesCompleted(history.quizzes);
    };

    window.addEventListener('chronos_activity_updated', handleActivityUpdate);
    return () => window.removeEventListener('chronos_activity_updated', handleActivityUpdate);
  }, []);

  // Compute stats on-the-fly depending on notes, bookmarks, and completed quizzes
  const stats = useMemo(() => {
    const quizCount = quizzesCompleted.length;
    const avgScore = quizCount > 0 
      ? Math.round((quizzesCompleted.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions), 0) / quizCount) * 100)
      : 0;
    
    // Dynamic XP algorithm: 
    // 150 points for each completed quiz, 50 points for each bookmarked element, 80 points for each written note
    const calculatedXP = (quizCount * 150) + (bookmarks.length * 50) + (notes.length * 80);
    const calculatedLevel = Math.max(1, Math.floor(calculatedXP / 400) + 1);

    // Dynamic Title based on levels achieved
    let computedTitle = 'Junior Scholar';
    if (calculatedLevel >= 7) computedTitle = 'Arch-Chronologist Superior';
    else if (calculatedLevel >= 5) computedTitle = 'High Sovereign Academic';
    else if (calculatedLevel >= 3) computedTitle = 'Consular Archivist';
    else if (calculatedLevel >= 2) computedTitle = 'Scribe of ancient annals';

    return {
      quizCount,
      avgScore,
      totalXP: calculatedXP,
      level: calculatedLevel,
      title: computedTitle,
      recentPerformance: quizzesCompleted.slice(0, 5).reverse().map((q, idx) => ({
        index: idx + 1,
        name: q.title.length > 15 ? q.title.slice(0, 15) + '...' : q.title,
        accuracy: Math.round((q.score / q.totalQuestions) * 100)
      }))
    };
  }, [quizzesCompleted, notes, bookmarks]);

  // Sync computed XP and status with physical database profiles
  useEffect(() => {
    if (activeAccount) {
      const updatedProfile: ScholarAccount = {
        ...activeAccount,
        level: stats.level,
        xp: stats.totalXP,
        title: stats.title
      };
      
      // Update local storage models
      const updatedArray = accounts.map(acc => acc.email === activeAccount.email ? updatedProfile : acc);
      setAccounts(updatedArray);
      localStorage.setItem('chronos_vault_accounts', JSON.stringify(updatedArray));
      localStorage.setItem('chronos_active_account', JSON.stringify(updatedProfile));
    }
  }, [stats.level, stats.totalXP, stats.title]);

  // Account actions
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim() || !regEmail.trim()) {
      setRegError('Please supply both a display name and a registered email.');
      return;
    }

    if (accounts.some(acc => acc.email.toLowerCase() === regEmail.toLowerCase())) {
      setRegError('An academic account with this email is already registered.');
      return;
    }

    const newAccount: ScholarAccount = {
      name: regName,
      email: regEmail,
      title: 'Junior Scholar',
      avatar: regAvatar,
      specialization: regSpecial,
      level: 1,
      xp: 0,
      createdAt: new Date().toLocaleDateString()
    };

    const nextAccounts = [...accounts, newAccount];
    setAccounts(nextAccounts);
    localStorage.setItem('chronos_vault_accounts', JSON.stringify(nextAccounts));

    // Automatically switch to the newly created account
    localStorage.setItem('chronos_active_account', JSON.stringify(newAccount));
    setActiveAccount(newAccount);

    // Reset fields
    setRegName('');
    setRegEmail('');
    setActiveTab('dashboard');
  };

  const handleSwitchAccount = (acc: ScholarAccount) => {
    localStorage.setItem('chronos_active_account', JSON.stringify(acc));
    setActiveAccount(acc);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('chronos_active_account');
    setActiveAccount(null);
  };

  // Compute Achievements List based on genuine student progress
  const achievements = useMemo(() => {
    const list = [
      {
        id: 'ach_register',
        name: 'Sovereign Scribe',
        desc: 'Created or initiated a customized academic scholar profile.',
        icon: User,
        unlocked: activeAccount !== null,
        tier: 'Bronze',
        color: 'border-amber-700 text-amber-500'
      },
      {
        id: 'ach_first_quiz',
        name: 'Gaugamela Tactician',
        desc: 'Completed at least 1 historical coliseum quiz.',
        icon: Trophy,
        unlocked: quizzesCompleted.length > 0,
        tier: 'Bronze',
        color: 'border-yellow-700 text-yellow-500'
      },
      {
        id: 'ach_perfect_quiz',
        name: 'Apollo\'s Oracle',
        desc: 'Triumph over a history campaign with a perfect 100% score.',
        icon: Award,
        unlocked: quizzesCompleted.some(q => q.score === q.totalQuestions),
        tier: 'Gold',
        color: 'border-yellow-400 text-yellow-400'
      },
      {
        id: 'ach_notes_creator',
        name: 'Royal Cartographer',
        desc: 'Stored 2 or more custom written notes in the chronicler vaults.',
        icon: BookOpen,
        unlocked: notes.length >= 2,
        tier: 'Silver',
        color: 'border-slate-400 text-slate-300'
      },
      {
        id: 'ach_bookmarks_collector',
        name: 'Alexandrian Curator',
        desc: 'Added 3 or more historical figures or civilisations to saved bookmarks.',
        icon: BookMarked,
        unlocked: bookmarks.length >= 3,
        tier: 'Silver',
        color: 'border-cyan-500 text-cyan-400'
      },
      {
        id: 'ach_xp_master',
        name: 'Eternal Master',
        desc: 'Accumulated over 1,500 total Academic XP.',
        icon: Sparkles,
        unlocked: stats.totalXP >= 1500,
        tier: 'Legendary',
        color: 'border-purple-500 text-purple-400'
      }
    ];
    return list;
  }, [activeAccount, quizzesCompleted, notes, bookmarks, stats.totalXP]);

  const unlockedCount = useMemo(() => achievements.filter(a => a.unlocked).length, [achievements]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop glass overlay */}
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#0A0A0A] border border-[#D4AF37]/35 rounded-3xl p-5 sm:p-7 max-w-4xl w-full relative z-10 shadow-2xl text-left space-y-6 my-8 max-h-[90vh] overflow-y-auto scrollbar-thin"
        >
          
          {/* Header Close button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-[#A09890] hover:text-[#D4AF37] p-1.5 bg-[#151515] hover:bg-black rounded-lg transition-all border border-[#222] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Upper Title and Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-black tracking-widest text-amber-500 uppercase bg-amber-950/20 px-2 py-0.5 rounded border border-amber-900/40">
                  Chronos Vault Node
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <h3 className="font-serif italic font-bold text-2xl text-white tracking-tight mt-1">
                Student Profile & Achievements Hub
              </h3>
            </div>

            {/* Hub tabs selector */}
            <div className="bg-[#121212] p-1 rounded-xl border border-[#222] flex shrink-0 text-xs self-start sm:self-center">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-[#A09890] hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('portal')}
                className={`px-3 py-1.5 rounded-lg font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'portal'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-[#A09890] hover:text-white'
                }`}
              >
                Accounts ({accounts.length})
              </button>
              <button
                onClick={() => setActiveTab('curator')}
                className={`px-3 py-1.5 rounded-lg font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'curator'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-[#A09890] hover:text-white'
                }`}
              >
                Curator Credentials
              </button>
            </div>
          </div>

          {/* TAB 1: Profile Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {activeAccount ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left stats card: Academic Badge card */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="bg-[#111111] border border-[#222] rounded-2xl p-5 space-y-4">
                      
                      {/* Big Profile Avatar */}
                      <div className="flex items-center gap-3.5">
                        <div className={`w-16 h-16 rounded-2xl ${AVATAR_STYLING[activeAccount.avatar]?.bg} border ${AVATAR_STYLING[activeAccount.avatar]?.border} flex items-center justify-center text-3xl shadow-lg`}>
                          {AVATAR_STYLING[activeAccount.avatar]?.emoji}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-[#E5C158] text-lg leading-tight">
                            {activeAccount.name}
                          </h4>
                          <span className="text-[10px] font-mono text-[#A09890] block">
                            {activeAccount.email}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">
                            Specialist: {activeAccount.specialization}
                          </span>
                        </div>
                      </div>

                      {/* Rank & XP indicator */}
                      <div className="border-t border-[#1C1C1C] pt-4 space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#A09890]">Academic rank:</span>
                          <span className="text-[#D4AF37] font-bold">{stats.title}</span>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-[#A09890]">Scholar Level {stats.level}</span>
                          <span className="text-white font-bold">{stats.totalXP} / {stats.level * 400} XP</span>
                        </div>

                        {/* XP Progress Bar */}
                        <div className="w-full bg-[#1A1A1A] h-2.5 rounded-full overflow-hidden border border-[#222] p-0.5">
                          <motion.div 
                            className="bg-gradient-to-r from-[#D4AF37] to-amber-500 h-full rounded-full"
                            style={{ width: `${Math.min(100, (stats.totalXP / (stats.level * 401)) * 100)}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (stats.totalXP / (stats.level * 401)) * 100)}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                        <p className="text-[9px] text-[#7A7065] text-right font-mono italic">
                          Solve Coliseum Quizzes (+150 XP) or take notes (+80 XP) to rank up!
                        </p>
                      </div>

                    </div>

                    {/* Quick Numbers Checklist Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#121212] border border-[#222] p-3 rounded-xl text-center space-y-1">
                        <span className="text-[9px] font-mono uppercase text-[#A09890] block">Quizzes Solved</span>
                        <span className="text-xl font-serif text-white font-bold">{stats.quizCount}</span>
                      </div>
                      <div className="bg-[#121212] border border-[#222] p-3 rounded-xl text-center space-y-1">
                        <span className="text-[9px] font-mono uppercase text-[#A09890] block">Average Accuracy</span>
                        <span className="text-xl font-serif text-emerald-400 font-bold">{stats.avgScore}%</span>
                      </div>
                      <div className="bg-[#121212] border border-[#222] p-3 rounded-xl text-center space-y-1">
                        <span className="text-[9px] font-mono uppercase text-[#A09890] block">Notes Taken</span>
                        <span className="text-xl font-serif text-white font-bold">{notes.length}</span>
                      </div>
                      <div className="bg-[#121212] border border-[#222] p-3 rounded-xl text-center space-y-1">
                        <span className="text-[9px] font-mono uppercase text-[#A09890] block">Saved Bookmarks</span>
                        <span className="text-xl font-serif text-white font-bold">{bookmarks.length}</span>
                      </div>
                    </div>

                    {/* Achievements Summary counts */}
                    <div className="bg-[#121212] border border-[#222] p-4 rounded-xl flex items-center justify-between text-xs font-mono">
                      <span className="text-[#A09890] flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#D4AF37]" />
                        Achievements Unlocked:
                      </span>
                      <span className="text-[#D4AF37] font-bold text-sm bg-[#1C1811] px-2.5 py-0.5 rounded border border-[#D4AF37]/25">
                        {unlockedCount} / {achievements.length}
                      </span>
                    </div>

                  </div>

                  {/* Right main area: Progress charts, bookmarks, achievements, notes list */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* Progress Chart section */}
                    <div className="bg-[#111111] border border-[#222] rounded-2xl p-5 space-y-4">
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                          <Activity className="w-4 h-4" />
                          Diagnostic Performance Analytics
                        </h4>
                        <p className="text-[10px] text-[#7A7065] font-sans mt-0.5">
                          Diagnostic analysis tracking your latest weekly challenges and coliseum scoring ratios.
                        </p>
                      </div>

                      <div className="h-[150px] w-full">
                        {stats.recentPerformance.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.recentPerformance}>
                              <defs>
                                <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0}/>
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="index" stroke="#555" fontSize={9} fontFamily="monospace" />
                              <YAxis stroke="#555" fontSize={9} fontFamily="monospace" unit="%" domain={[0, 100]} />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#111', borderColor: '#333', fontSize: 10, fontFamily: 'monospace' }}
                                labelStyle={{ color: '#D4AF37' }}
                              />
                              <Area type="monotone" dataKey="accuracy" name="Accuracy Ratio" stroke="#D4AF37" strokeWidth={1.5} fillOpacity={1} fill="url(#colorAccuracy)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-6 border border-dashed border-[#222] bg-[#0C0C0C] rounded-xl text-[#7A7065] text-xs font-mono space-y-1.5">
                            <Clock className="w-5 h-5 opacity-40 text-[#D4AF37]" />
                            <span>No diagnostic quiz data loaded yet.</span>
                            <span className="text-[10px] text-[#A09890] max-w-sm text-center font-sans">
                              Navigate to the <strong className="text-white">Coliseum Quizzes</strong> tab to unlock XP points and generate visual performance charts.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Achievements grid board */}
                    <div className="space-y-3.5">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                          <Trophy className="w-4 h-4" />
                          Curator Seal & Academic Trophies
                        </h4>
                        <span className="text-[10px] text-[#A09890] font-mono leading-none">
                          {Math.round((unlockedCount / achievements.length) * 100)}% Complete
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {achievements.map((ach) => {
                          const IconComp = ach.icon;
                          return (
                            <div 
                              key={ach.id}
                              className={`flex items-start gap-3 p-3 bg-[#111] border rounded-xl transition-all ${
                                ach.unlocked 
                                  ? 'border-[#D4AF37]/50 opacity-100 shadow-md shadow-amber-950/15' 
                                  : 'border-[#1C1C1C] opacity-40'
                              }`}
                            >
                              <div className={`p-2 rounded-lg shrink-0 border ${
                                ach.unlocked 
                                  ? 'bg-[#1C1811] text-[#D4AF37]' 
                                  : 'bg-[#121212] text-[#7A7065] border-[#222]'
                              }`}>
                                <IconComp className="w-4.5 h-4.5" />
                              </div>
                              <div className="space-y-0.5 text-left">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-serif font-bold text-xs text-white leading-normal">
                                    {ach.name}
                                  </span>
                                  {ach.unlocked && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                  )}
                                </div>
                                <p className="text-[10px] text-[#A09890] leading-snug">
                                  {ach.desc}
                                </p>
                                <span className={`text-[8px] font-mono uppercase block ${ach.color}`}>
                                  {ach.tier} Achievement
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bookmarks Section of profile */}
                    <div className="bg-[#111] border border-[#222] rounded-2xl p-5 space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                        <BookmarkIcon className="w-4 h-4" />
                        My Saved Chronicles ({bookmarks.length})
                      </h4>
                      
                      {bookmarks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                          {bookmarks.map((bk) => (
                            <div 
                              key={bk.id} 
                              className="bg-[#141414] border border-[#222] p-2.5 rounded-xl flex items-center justify-between text-xs gap-3 group hover:border-[#D4AF37]/35 transition-all text-left"
                            >
                              <div className="space-y-0.5 min-w-0">
                                <span className="text-[9px] bg-amber-950/30 border border-amber-900/40 text-[#D4AF37] px-1.5 py-0.2 rounded font-mono uppercase font-bold block w-max">
                                  {bk.type}
                                </span>
                                <h5 className="font-serif font-bold text-white leading-tight truncate">
                                  {bk.title}
                                </h5>
                                <p className="text-[9px] text-[#A09890] block truncate">
                                  {bk.subtitle || 'Study focus node'}
                                </p>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => {
                                    onNavigateToBookmark(bk.type, bk.targetId);
                                    onClose();
                                  }}
                                  className="text-[10px] text-[#D4AF37] hover:text-white hover:underline transition-all font-mono font-semibold bg-[#1C1811] px-2 py-1 rounded border border-[#D4AF37]/25 cursor-pointer"
                                >
                                  Go
                                </button>
                                <button
                                  onClick={() => onToggleBookmark(bk.targetId, bk.type, bk.title, bk.subtitle)}
                                  className="text-red-400 hover:text-red-300 transition-all p-1.5 bg-[#1C1010] border border-red-900/30 rounded"
                                  title="Remove Bookmark"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-[#7A7065] italic py-2">No items bookmarked yet. Toggle the star or bookmark options while scanning civilizations, events, or philosophers!</p>
                      )}
                    </div>

                    {/* Notes summary component inside profile */}
                    <div className="bg-[#111] border border-[#222] rounded-2xl p-5 space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        My Scholar Notes & Marginalia ({notes.length})
                      </h4>

                      {notes.length > 0 ? (
                        <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                          {notes.map((note) => (
                            <div 
                              key={note.id}
                              className="bg-[#141414] border border-[#222] p-3 rounded-xl flex items-start justify-between gap-4 text-left"
                            >
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-mono uppercase bg-zinc-800 border border-zinc-700 text-zinc-300 px-1.5 rounded font-bold">
                                    {note.targetType}
                                  </span>
                                  <span className="text-[9px] text-[#7A7065] font-mono">
                                    {note.createdAt}
                                  </span>
                                </div>
                                <h5 className="font-serif italic font-bold text-white text-xs leading-tight">
                                  {note.title}
                                </h5>
                                <p className="text-[11px] text-[#A09890] leading-relaxed font-sans line-clamp-2">
                                  {note.content}
                                </p>
                              </div>

                              <button
                                onClick={() => onDeleteNote(note.id)}
                                className="text-zinc-500 hover:text-red-400 p-1.5 bg-[#222] hover:bg-black rounded-lg transition-all cursor-pointer border border-[#2A2222] shrink-0"
                                title="Delete note"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-[#7A7065] italic py-2">No scholar notes saved in your journals database.</p>
                      )}
                    </div>

                    {/* Vault Data Portability & Archive Restore Panel */}
                    <div className="bg-[#14120E] border border-[#3D3321] rounded-2xl p-5 space-y-3.5 text-left">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-[#D4AF37]" />
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                            Vault Data Portability & Archive Restore
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono bg-[#1E1911] text-[#D4AF37] border border-[#3D3321] px-2 py-0.5 rounded">
                          {notes.length} Notes • {bookmarks.length} Bookmarks
                        </span>
                      </div>

                      <p className="text-xs text-[#CCC2B8] font-sans leading-relaxed">
                        Manage your scholarly notebook, bookmarks registry, and custom research notes. Restore previous backups or synchronize archive state across research sessions.
                      </p>

                      <div className="flex flex-wrap gap-2.5 pt-1">
                        <button
                          onClick={() => setIsBackupModalOpen(true)}
                          className="px-3.5 py-2 bg-[#1C1811] hover:bg-[#282217] border border-[#3D3321] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                        >
                          <Database className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Archive Restore & Synchronization Hub</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              ) : (
                <div className="max-w-md mx-auto text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-red-950/20 text-red-400 border border-red-900/40 flex items-center justify-center mx-auto text-2xl">
                    ⚠️
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-serif font-black text-white text-lg">No Active Scholar Account Found</h4>
                    <p className="text-xs text-[#A09890] leading-relaxed font-sans">
                      You are playing as an anonymous history student. Create or switch accounts inside the account portal tab to compile performance telemetry.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('portal')}
                    className="px-4 py-2 bg-[#D4AF37] hover:bg-white text-black font-semibold text-xs rounded-xl font-mono uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Register Scholar Account
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Multiple Account Manager & Swapper */}
          {activeTab === 'portal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              
              {/* Left Column: Create Profile form */}
              <div className="bg-[#111111] border border-[#222] rounded-2xl p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4" />
                    Register New Scholar Profile
                  </h4>
                  <p className="text-[10px] text-[#7A7065] mt-0.5 leading-relaxed font-sans">
                    Setup a distinct student identity profile to save individual quizzes, historical specialities, and achievements.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-3.5 text-xs text-[#A09890]">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-[#D4AF37]">Scholar Display Name</label>
                    <input 
                      type="text" 
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Cleo Scribe"
                      className="w-full bg-[#151515] hover:bg-black border border-[#2D2D2D] text-white p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37] font-mono leading-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-[#D4AF37]">Academic Email</label>
                    <input 
                      type="email" 
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. scribe@ancientlibrary.org"
                      className="w-full bg-[#151515] hover:bg-black border border-[#2D2D2D] text-white p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37] font-mono leading-none"
                    />
                  </div>

                  {/* Specialty Choose */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-[#D4AF37] block">Historiography Specialty</label>
                    <select 
                      value={regSpecial}
                      onChange={(e) => setRegSpecial(e.target.value)}
                      className="w-full bg-[#151515] border border-[#2D2D2D] text-white p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37] font-mono cursor-pointer"
                    >
                      <option value="Classical Rome & Greece">Classical Mediterranean (Greece & Rome)</option>
                      <option value="South Asian Dynasties">South Asian Dynasties (Mauryas, Marathas)</option>
                      <option value="Dynastic Egypt Kingdoms">Dynastic Egyptian Foundations</option>
                      <option value="Islamic Golden Age Science">Islamic Golden Age Intellectualism</option>
                      <option value="Renaissance & Enlightenment Ideals">Renaissance & Socratic Philosophies</option>
                    </select>
                  </div>

                  {/* Avatar Picker */}
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase text-[#D4AF37] block">Select Scriptorium Avatar</label>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.keys(AVATAR_STYLING).map((key) => {
                        const style = AVATAR_STYLING[key as keyof typeof AVATAR_STYLING];
                        const isSelected = regAvatar === key;
                        return (
                          <button
                            type="button"
                            key={key}
                            onClick={() => setRegAvatar(key as any)}
                            className={`p-2 bg-[#1C1C1C] hover:bg-[#2A2A2A] rounded-xl border text-xl flex flex-col items-center justify-center transition-all relative cursor-pointer ${
                              isSelected ? 'border-[#D4AF37] bg-amber-950/20 scale-102' : 'border-[#222]'
                            }`}
                            title={style.label}
                          >
                            <span>{style.emoji}</span>
                            {isSelected && (
                              <span className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-black rounded-full p-0.5 border border-black zoom-in-50">
                                <Check className="w-1.5 h-1.5 font-bold" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {regError && (
                    <div className="bg-red-950/25 border border-red-900/35 text-red-400 p-2.5 rounded-lg flex items-center gap-1.5 font-mono text-[10px]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{regError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-white text-black font-bold uppercase font-mono tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                  >
                    <Plus className="w-4 h-4" /> Create Academic Account
                  </button>
                </form>
              </div>

              {/* Right Column: List of saved profiles */}
              <div className="bg-[#111111] border border-[#222] rounded-2xl p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                    <LogIn className="w-4 h-4" />
                    Registered Local Profiles List
                  </h4>
                  <p className="text-[10px] text-[#7A7065] mt-0.5 leading-relaxed font-sans">
                    Contrast multiple students' progress or switch user credentials securely. Registered accounts are preserved in the persistent workspace database.
                  </p>
                </div>

                <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                  {accounts.map((acc) => {
                    const style = AVATAR_STYLING[acc.avatar];
                    const isActive = activeAccount?.email === acc.email;
                    return (
                      <div 
                        key={acc.email}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                          isActive 
                            ? 'bg-[#1C1811] border-[#D4AF37] shadow-md shadow-amber-950/10' 
                            : 'bg-[#151515] border-[#222] hover:border-[#333]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-11 h-11 rounded-lg shrink-0 ${style?.bg} border ${style?.border || 'border-[#333]'} flex items-center justify-center text-xl`}>
                            {style?.emoji || '👤'}
                          </div>
                          <div className="text-left space-y-0.5 min-w-0">
                            <h5 className="font-serif font-bold text-white text-sm truncate">
                              {acc.name}
                            </h5>
                            <span className="text-[10px] font-mono text-[#A09890] block truncate">
                              {acc.email}
                            </span>
                            <span className="text-[8px] font-mono text-amber-500 uppercase font-black tracking-widest block">
                              Level {acc.level} • {acc.title}
                            </span>
                          </div>
                        </div>

                        {isActive ? (
                          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-[#101F15] border border-emerald-900/40 px-2 py-0.5 rounded">
                            Active
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSwitchAccount(acc)}
                            className="bg-[#222] hover:bg-[#D4AF37] text-[#A09890] hover:text-black font-semibold text-xs px-3 py-1.5 font-mono uppercase tracking-wider rounded-lg border border-[#333] hover:border-[#D4AF37] transition-all cursor-pointer flex items-center gap-1"
                          >
                            Login
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {activeAccount && (
                  <div className="border-t border-[#1C1C1C] pt-4 text-center">
                    <button 
                      onClick={handleLogout}
                      className="text-xs text-red-400 hover:text-red-300 transition-all font-mono hover:underline flex items-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout of {activeAccount.name}'s Academic Session
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: Creator Details */}
          {activeTab === 'curator' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-1 space-y-4">
                <div className="text-center p-5 bg-[#111111] border border-[#222] rounded-2xl space-y-3.5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#8C752B] p-0.5 shadow-lg mx-auto shrink-0">
                    <div className="w-full h-full rounded-[14px] bg-[#0A0A0A] flex items-center justify-center text-[#D4AF37]">
                      <User className="w-8 h-8" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif italic font-bold text-lg text-white">Aaush Patel</h4>
                    <p className="text-[10px] font-mono text-[#D4AF37]">aaushpatel620@gmail.com</p>
                    <span className="text-[9px] bg-amber-950/20 text-amber-500 border border-amber-900/40 px-2.5 py-0.5 rounded font-mono uppercase font-black tracking-widest mt-1 inline-block">
                      Lead Chronologist
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-extrabold flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Curatorial Directive
                  </h4>
                  
                  <p className="text-xs sm:text-sm text-[#E0D8D0] leading-relaxed font-sans font-light text-left">
                    <strong className="text-white font-serif italic">Aaush Patel</strong> is the Chief Cognitive Architect and Lead Programmer behind the <strong className="text-[#D4AF37] font-semibold">Chronos Vault</strong>. Operating at the intersections of modern software engineering, semantic intelligence, and historical geography, Aaush engineered this digital monument to serve as an empirical library of human civilization. 
                  </p>
                  
                  <p className="text-xs sm:text-sm text-[#E0D8D0] leading-relaxed font-sans font-light text-left">
                    Through rich visual timelines, custom-compiled intellectual databases covering over 200 philosophers of all eras, and persistent notebook integrations, his work bridges ancient academic truths with high-performance responsive interfaces.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-[10px] text-[#A09890] pt-2">
                  <div className="bg-[#121212] border border-[#222] p-3 rounded-xl space-y-0.5">
                    <span className="text-[#D4AF37] text-[9px] block uppercase font-bold">Research Core</span>
                    <span className="text-white font-medium">Digital Antiquities</span>
                  </div>
                  <div className="bg-[#121212] border border-[#222] p-3 rounded-xl space-y-0.5">
                    <span className="text-[#D4AF37] text-[9px] block uppercase font-bold">Code Mechanics</span>
                    <span className="text-white font-medium">TypeScript & React</span>
                  </div>
                  <div className="bg-[#121212] border border-[#222] p-3 rounded-xl space-y-0.5">
                    <span className="text-[#D4AF37] text-[9px] block uppercase font-bold">Chronos Score</span>
                    <span className="text-white font-medium">Level 42 Scribe</span>
                  </div>
                  <div className="bg-[#121212] border border-[#222] p-3 rounded-xl space-y-0.5">
                    <span className="text-[#D4AF37] text-[9px] block uppercase font-bold">AI Synchrony</span>
                    <span className="text-white font-medium">Gemini 2.5 Flash</span>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <a 
                    href="mailto:aaushpatel620@gmail.com" 
                    className="text-[#A09890] hover:text-[#D4AF37] transition-all p-2 bg-[#121212] border border-[#222] rounded-lg cursor-pointer flex items-center gap-1 text-xs font-mono"
                    title="Send Email"
                  >
                    <Mail className="w-3.5 h-3.5" /> Email aaushpatel620@gmail.com
                  </a>
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </div>

      {/* Backup & Restore Modal */}
      <BackupRestoreModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        notes={notes}
        bookmarks={bookmarks}
        onImportBackup={onImportBackup}
      />
    </AnimatePresence>
  );
}
