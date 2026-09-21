import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Landmark, Search, Sparkles, UserCheck, Flag, Shield, Award, ChevronRight, ChevronLeft, FileText, Cpu, AlertCircle, Clock, Globe, Compass, Coins, TrendingUp, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Monarch, HistoricalFigure, Leader, CountryDetail, Article, CommunitySubmission, HistoryFact600, UserNote, Bookmark } from '../types';
import { MONARCHS, HISTORICAL_FIGURES, LEADERS, COUNTRIES, ARTICLES, HISTORY_VAULT_600 } from '../data/historyData';
import InlineNotesWidget from './InlineNotesWidget';
import CivilizationRechartsVisualizer from './CivilizationRechartsVisualizer';
import PaginationControls from './PaginationControls';

const getWikipediaSnippet = (name: string): { bio: string; role: string; epoch: string } => {
  const normalized = name.toLowerCase();
  if (normalized.includes('caesar')) {
    return {
      bio: 'Renowned Roman statesman, general, and author who played a critical role in the events that led to the demise of the Roman Republic and the rise of the Roman Empire.',
      role: 'Imperator & Statesman',
      epoch: '100 BC – 44 BC'
    };
  }
  if (normalized.includes('da vinci')) {
    return {
      bio: 'Incomparable Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor, and architect.',
      role: 'Polymath Genius',
      epoch: '1452 – 1519 AD'
    };
  }
  if (normalized.includes('galilei')) {
    return {
      bio: 'Pioneering Italian astronomer, physicist, and polymath, extensively referred to as the father of observational astronomy and modern scientific method.',
      role: 'Father of Modern Physics',
      epoch: '1564 – 1642 AD'
    };
  }
  if (normalized.includes('michelangelo')) {
    return {
      bio: 'Illustrious Italian sculptor, painter, architect, and poet of the High Renaissance whose work exerted an unparalleled influence on the development of Western art.',
      role: 'High Renaissance Master',
      epoch: '1475 – 1564 AD'
    };
  }
  if (normalized.includes('socrates')) {
    return {
      bio: 'Classical Greek philosopher credited as one of the founders of Western philosophy, famous for his conversational questioning dialectic and uncompromising moral principles.',
      role: 'Founding Philosopher of Ethics',
      epoch: 'c. 470 – 399 BC'
    };
  }
  if (normalized.includes('plato')) {
    return {
      bio: 'Foundational Athenian philosopher who founded the Academy, the first institution of higher learning in the Western world, and wrote on justice, metaphysics, and cosmology.',
      role: 'Academic Philosopher & Thinker',
      epoch: 'c. 428 – 348 BC'
    };
  }
  if (normalized.includes('aristotle')) {
    return {
      bio: 'Colossal Greek polymath student of Plato who founded the Lyceum and formally categorized logic, physics, biology, ethics, aesthetics, and politics.',
      role: 'Imperial Polymath & Logician',
      epoch: '384 BC – 322 BC'
    };
  }
  if (normalized.includes('alexander')) {
    return {
      bio: 'Legendary king of Macedon who forged one of the largest empires in history, stretching from Greece to north-western India, diffusing Greek ideas across borders.',
      role: 'Sovereign Commander',
      epoch: '356 BC – 323 BC'
    };
  }
  if (normalized.includes('pericles')) {
    return {
      bio: 'Prominent and influential Greek statesman, orator, and general of Athens during its Golden Age, constructing the Acropolis temples.',
      role: 'Golden Age General & Orator',
      epoch: 'c. 495 – 429 BC'
    };
  }
  if (normalized.includes('imhotep')) {
    return {
      bio: 'Ancient Egyptian polymath who served as chancellor to Pharaoh Djoser, historic high-priest, and mastermind architect of the magnificent Step Pyramid at Saqqara.',
      role: 'High Chancellor & Architect',
      epoch: 'c. 2650 BC'
    };
  }
  if (normalized.includes('hatshepsut')) {
    return {
      bio: 'Formidable female Pharaoh of the Eighteenth Dynasty. She re-established valuable international trade routes and commissioned the breathtaking Djeser-Djeseru temple.',
      role: 'Female Pharaoh Regent',
      epoch: '1507 – 1458 BC'
    };
  }
  if (normalized.includes('ramses')) {
    return {
      bio: 'One of world history\'s most powerful Pharaohs, celebrated for massive structural campaigns, temple construction (Abu Simbel), and military conquest.',
      role: 'Sovereign Pharaoh of Egypt',
      epoch: '1303 – 1213 BC'
    };
  }
  if (normalized.includes('mahfouz')) {
    return {
      bio: 'Famous Egyptian writer who won the 1988 Nobel Prize in Literature, celebrated for synthesizing realistic modern prose to chronicle historic and modern Cairo.',
      role: 'Nobel Literary Laureate',
      epoch: '1911 – 2006 AD'
    };
  }
  if (normalized.includes('aryabhata')) {
    return {
      bio: 'Premier Indian mathematician-astronomer from the classical age of Indian mathematics, who formulated early approximations of Pi and trigonometric functions.',
      role: 'Sovereign Mathematician',
      epoch: '476 – 550 AD'
    };
  }
  if (normalized.includes('gautama') || normalized.includes('buddha')) {
    return {
      bio: 'Revered spiritual teacher and philosopher on whose insights Buddhism was founded, proclaiming the Middle Way and the eradication of sorrow.',
      role: 'Sovereign Spiritual Sage',
      epoch: 'c. 563 – 483 BC'
    };
  }
  if (normalized.includes('ashoka')) {
    return {
      bio: 'Maurya Emperor who converted to Buddhism, renounced aggressive warfare, and engraved early public welfare laws regarding tolerance and compassion.',
      role: 'Samrat of Maurya Empire',
      epoch: '304 – 232 BC'
    };
  }
  if (normalized.includes('chanakya')) {
    return {
      bio: 'Illustrious pioneer of political science and economics in India, advisor to Emperor Chandragupta, and author of the administrative Arthashastra encyclopedias.',
      role: 'Imperial Prime Advisor',
      epoch: '371 – 283 BC'
    };
  }
  if (normalized.includes('confucius')) {
    return {
      bio: 'Legendary philosopher who established Confucianism, championing familial respect, social harmony, justice, and the moral duty of rulers.',
      role: 'Supreme Moral Philosopher',
      epoch: '551 – 479 BC'
    };
  }
  if (normalized.includes('laozi')) {
    return {
      bio: 'Ancient philosopher regarded as the author of the Tao Te Ching and the founder of philosophical Taoism, advocating biological harmony with the Tao.',
      role: 'Taoist Spiritual Master',
      epoch: 'c. 6th Century BC'
    };
  }
  if (normalized.includes('shih huang') || normalized.includes('qin shi')) {
    return {
      bio: 'First Emperor of unified China, who standardized currencies, scripts, and military measures, and ordered the original construction of the Great Wall.',
      role: 'First Supreme Sovereign',
      epoch: '259 – 210 BC'
    };
  }
  if (normalized.includes('li bai')) {
    return {
      bio: 'Acclaimed Chinese poet of the Tang Dynasty, widely celebrated for his free-spirited nature, romantic verses, and absolute cosmic imagination.',
      role: 'Tang Literary Genius',
      epoch: '701 – 762 AD'
    };
  }
  if (normalized.includes('joan of arc')) {
    return {
      bio: 'French national heroine who led military forces to critical victories in the Hundred Years\' War, claiming holy guidance, before her historic martyrdom.',
      role: 'Martyred Commander',
      epoch: '1412 – 1431 AD'
    };
  }
  if (normalized.includes('nobunaga')) {
    return {
      bio: 'Elite Japanese warlord who initiated the unification of feudal Japan at the end of the warring states period, widely known as the first of three unifiers.',
      role: 'Sovereign Unifier Daimyo',
      epoch: '1534 – 1582 AD'
    };
  }
  if (normalized.includes('gutenberg')) {
    return {
      bio: 'Pioneered movable metal-lead type printing in Europe, which mass-democratized literacy, scholastic learning, and fueled scientific revolutions.',
      role: 'Pioneering Inventor',
      epoch: '1400 – 1468 AD'
    };
  }
  if (normalized.includes('cervantes')) {
    return {
      bio: 'Colossal Spanish novelist and playwright, historic author of Don Quixote, widely acknowledged as the first modern western novel.',
      role: 'Master Western Novelist',
      epoch: '1547 – 1616 AD'
    };
  }
  if (normalized.includes('shakespeare')) {
    return {
      bio: 'Widely recognized as the greatest English poet and playwright in history, whose literary tragedies and comedies refined the English language vocabulary.',
      role: 'Supreme Bard & Dramatist',
      epoch: '1564 – 1616 AD'
    };
  }
  if (normalized.includes('musa')) {
    return {
      bio: 'Renowned Mansa of the West African Mali Empire, recorded in global history as one of the wealthiest individuals to have ever lived, funding Timbuktu schools.',
      role: 'Sovereign Mansa of Mali',
      epoch: '1280 – 1337 AD'
    };
  }
  return {
    bio: 'An esteemed historic figure, pioneer scholar, or academic leader who revolutionized research, culture, or administration in their regional community.',
    role: 'Scholarly Pioneer',
    epoch: 'Historical Era'
  };
};

interface VaultSectionProps {
  onAddNote: (title: string, content: string, type: UserNote['targetType'], targetId?: string) => void;
  onDeleteNote: (id: string) => void;
  notes: UserNote[];
  activeCountryId?: string; // Sourced from SVG map interactions
  onCountryProcessed?: () => void;
  bookmarks: Bookmark[];
  onToggleBookmark: (id: string, type: Bookmark['type'], title: string, subtitle?: string) => void;
  focusFigureId?: string;
  initialVaultTab?: 'monarchs' | 'figures' | 'leaders' | 'countries' | 'articles' | 'vault600';
  onFigureProcessed?: () => void;
  onOpenSpotlight?: (figureId?: string) => void;
}

export default function VaultSection({
  onAddNote,
  onDeleteNote,
  notes,
  activeCountryId,
  onCountryProcessed,
  bookmarks = [],
  onToggleBookmark,
  focusFigureId,
  initialVaultTab,
  onFigureProcessed,
  onOpenSpotlight
}: VaultSectionProps) {
  const [activeTab, setActiveTab] = useState<'monarchs' | 'figures' | 'leaders' | 'countries' | 'articles' | 'vault600'>('monarchs');
  const [searchQuery, setSearchQuery] = useState('');

  // Sub-tabs for Monarchs
  const [selectedMonarchRegion, setSelectedMonarchRegion] = useState<string>('All');
  // Sub-tabs for Figures
  const [selectedFigureCategory, setSelectedFigureCategory] = useState<string>('All');

  // Single active detail view inside the vault
  const [selectedMonarch, setSelectedMonarch] = useState<Monarch | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryDetail | null>(null);

  // Country state map and 360 rotation controls
  const [selectedState, setSelectedState] = useState<any>(null);
  const [mapViewMode, setMapViewMode] = useState<'flat' | '360'>('flat');
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    setSelectedState(null);
  }, [selectedCountry]);

  useEffect(() => {
    if (mapViewMode !== '360') return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1.2) % 360);
    }, 25);
    return () => clearInterval(interval);
  }, [mapViewMode]);

  // Articles state allowing custom dynamic articles
  const [articlesList, setArticlesList] = useState<Article[]>(ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [customArticleTopic, setCustomArticleTopic] = useState('');
  const [customArticleEra, setCustomArticleEra] = useState('Classical Era');
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Subsections inside the articles tab
  const [articlesTabMode, setArticlesTabMode] = useState<'vault' | 'submit' | 'moderation'>('vault');
  const [pendingEssays, setPendingEssays] = useState<CommunitySubmission[]>([]);
  const [submittingNoteSuccess, setSubmittingNoteSuccess] = useState<string | null>(null);

  // Load custom articles and pending submissions from localStorage
  useEffect(() => {
    // 1. Hydrate approved user articles
    const cachedArticles = localStorage.getItem('chronos_vault_custom_articles');
    if (cachedArticles) {
      try {
        const parsed = JSON.parse(cachedArticles) as Article[];
        const userAdded = parsed.filter(p => !ARTICLES.some(art => art.id === p.id));
        setArticlesList([...userAdded, ...ARTICLES]);
      } catch (e) {
        console.error("Failed to parse cached custom articles", e);
      }
    }

    // 2. Hydrate pending submissions
    const cachedPending = localStorage.getItem('chronos_vault_pending_essays');
    if (cachedPending) {
      try {
        setPendingEssays(JSON.parse(cachedPending));
      } catch (e) {
        console.error("Failed to load pending essays", e);
      }
    } else {
      // Pre-seed some default interesting peer-evaluation essays
      const defaultPending: CommunitySubmission[] = [
        {
          id: 'sub_1',
          title: 'The Maritime Trade Routes of the Chola Empire',
          category: 'Medieval Period',
          author: 'Scholar Rajendra',
          date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
          preview: 'An exploration of how the medieval Cholas deployed massive merchant guilds (Manigramam) and trade navies to connect Southern India with Sri Lanka, Sumatra, and Imperial Song China.',
          content: `The Cholas of Southern India (principally between the 9th and 13th centuries AD) represented one of the most formidable maritime trade networks of the pre-modern world. Unlike many contemporary land-locked powers, the Chola emperors, notably Rajaraja I and Rajendra I, understood that national prosperity was intrinsically linked to command of sea lanes.

Major commercial vessels carried high-value commodities such as Malabar black pepper, cardamoms, sandalwood, cotton textiles, ivory, and precious gems across the Bay of Bengal. In return, Chola ports received Chinese silk, porcelain, camphor, and Arabian stallions.

To secure these routes, the Chola Dynasty maintained a highly sophisticated navy, utilizing multi-decked warships armed with projectile weapons. In 1025 AD, Rajendra I launched a legendary naval campaign against the Srivijaya Empire in Southeast Asia. This pre-emptive strike was not meant for territorial expansion, but rather to break a state monopoly that was levying high customs taxes on Indian trade, ensuring open maritime navigation.

Ultimately, the merchant guilds like the Anyurruvar (The Five Hundred Lords) established deep trading colonies from Madagascar to Guangzhou, proving that Chola geopolitical reach was as much mercantile as it was imperial.`,
          readTime: '4 min read',
          tags: ['Maritime', 'Chola', 'Medieval India', 'Submissions'],
          status: 'pending'
        },
        {
          id: 'sub_2',
          title: 'Deciphering the Indus Valley Script: A Structural Analysis',
          category: 'Ancient Egypt / India',
          author: 'Dr. Meera Sen',
          date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
          preview: 'A detailed analysis of Indus Valley Harappan seals, linguistic theories opposing typical Indo-European structures, and why the script remains undeciphered.',
          content: `The Indus Valley Civilization (flourishing between 2605 and 1905 BC) remains one of antiquity's greatest structural mysteries. While their grid-based brick cities like Mohenjo-daro and Harappa demonstrate unparalleled public sanitation, drainage, and standardized weights, scholars are still locked in debate over their written records.

Over 4,000 inscribed artifacts—primarily soapstone seals, copper tablets, and pottery shards—have been unearthed. The Indus script consists of approximately 400 unique signs, ranging from abstract geometric patterns to pictorial representation of native creatures like the unicorn bull, crocodiles, and elephants.

Linguistic consensus suggests the writing is logo-syllabic, similar to early Mesopotamian cuneiform or Egyptian hieroglyphs. Computational analyses point to a highly organized syntactic order: certain characters consistently appear only at the beginning or end of lines, ruling out random decoration. Some scholars hypothesize a Dravidian linguistic substrate, while others argue for an early ancestral Indo-Aryan dialect.

Without a bilingual artifact (like a Harappan-Sumerian 'Rosetta Stone'), decipherment remains elusive. Nonetheless, the high consistency of seals discovered in faraway Persian Gulf archaeological sites proves Harappan merchants used these tablets as secure, branded commercial bills of lading.`,
          readTime: '3 min read',
          tags: ['Harappa', 'Decipherment', 'Ancient', 'Linguistics'],
          status: 'pending'
        }
      ];
      setPendingEssays(defaultPending);
      localStorage.setItem('chronos_vault_pending_essays', JSON.stringify(defaultPending));
    }
  }, []);

  const handlePublishSubmission = (title: string, author: string, category: string, tags: string[], content: string) => {
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

    const newSub: CommunitySubmission = {
      id: `sub_${Date.now()}`,
      title,
      category,
      author: author || 'Anonymous Scholar',
      date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
      preview: content.slice(0, 150) + (content.length > 150 ? '...' : ''),
      content,
      readTime,
      tags: tags.length > 0 ? tags : ['Community Contribution'],
      status: 'pending'
    };

    const updated = [newSub, ...pendingEssays];
    setPendingEssays(updated);
    localStorage.setItem('chronos_vault_pending_essays', JSON.stringify(updated));

    // Display temporary toast
    setSubmittingNoteSuccess('Your historical essay has been submitted into the peer moderation queue!');
    setTimeout(() => setSubmittingNoteSuccess(null), 4000);
    setArticlesTabMode('vault');
  };

  const handleApproveSubmission = (id: string) => {
    const target = pendingEssays.find(p => p.id === id);
    if (!target) return;

    const approvedArticle: Article = {
      id: `user_article_${Date.now()}`,
      title: target.title,
      category: target.category,
      author: target.author,
      date: target.date,
      preview: target.preview,
      content: target.content,
      readTime: target.readTime,
      tags: [...target.tags, 'Community Published']
    };

    const updatedArticles = [approvedArticle, ...articlesList];
    setArticlesList(updatedArticles);
    
    // Cache user-added articles
    const userAdded = updatedArticles.filter(a => !ARTICLES.some(art => art.id === a.id));
    localStorage.setItem('chronos_vault_custom_articles', JSON.stringify(userAdded));

    const updatedPending = pendingEssays.filter(p => p.id !== id);
    setPendingEssays(updatedPending);
    localStorage.setItem('chronos_vault_pending_essays', JSON.stringify(updatedPending));

    setSubmittingNoteSuccess(`Approved and officially published: "${target.title}"!`);
    setTimeout(() => setSubmittingNoteSuccess(null), 3000);
  };

  const handleRejectSubmission = (id: string) => {
    const target = pendingEssays.find(p => p.id === id);
    const updatedPending = pendingEssays.filter(p => p.id !== id);
    setPendingEssays(updatedPending);
    localStorage.setItem('chronos_vault_pending_essays', JSON.stringify(updatedPending));

    if (target) {
      setSubmittingNoteSuccess(`Archived submission: "${target.title}".`);
      setTimeout(() => setSubmittingNoteSuccess(null), 3000);
    }
  };

  // Sync country selection from the world map
  useEffect(() => {
    if (activeCountryId) {
      const match = COUNTRIES.find((c) => c.id === activeCountryId);
      if (match) {
        setActiveTab('countries');
        setSelectedCountry(match);
        if (onCountryProcessed) onCountryProcessed();
      }
    }
  }, [activeCountryId, onCountryProcessed]);

  // Sync initial tab when specified externally (e.g. from Spotlight navigation)
  useEffect(() => {
    if (initialVaultTab) {
      setActiveTab(initialVaultTab);
    }
  }, [initialVaultTab]);

  // Sync figure/monarch/leader selection from Spotlight or other external links
  useEffect(() => {
    if (focusFigureId) {
      // 1. Check Historical Figures Archive
      const figMatch = HISTORICAL_FIGURES.find(f => f.id === focusFigureId);
      if (figMatch) {
        setActiveTab('figures');
        setSelectedFigure(figMatch);
        if (onFigureProcessed) onFigureProcessed();
        return;
      }

      // 2. Check Monarchs Vault
      const monarchMatch = MONARCHS.find(m => m.id === focusFigureId);
      if (monarchMatch) {
        setActiveTab('monarchs');
        setSelectedMonarch(monarchMatch);
        if (onFigureProcessed) onFigureProcessed();
        return;
      }

      // 3. Check Global Leaders Vault
      const leaderMatch = LEADERS.find(l => l.id === focusFigureId);
      if (leaderMatch) {
        setActiveTab('leaders');
        setSelectedLeader(leaderMatch);
        if (onFigureProcessed) onFigureProcessed();
        return;
      }
    }
  }, [focusFigureId, onFigureProcessed]);

  // Handle Dynamic Article Composition using Gemini on server-side
  const handleComposeArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customArticleTopic.trim()) return;

    setIsGeneratingArticle(true);
    setGenerationError(null);

    try {
      const response = await fetch('/api/gemini/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: customArticleTopic, era: customArticleEra }),
      });

      if (!response.ok) {
        throw new Error('API server returned an error during historical composition.');
      }

      const data = await response.json();
      
      const newArticle: Article = {
        id: `custom_${Date.now()}`,
        title: `AI Dispatch: ${customArticleTopic}`,
        category: customArticleEra,
        author: 'Gemini Research Scribe',
        date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
        preview: data.text.slice(0, 150) + '...',
        content: data.text,
        readTime: '5 min read',
        tags: [customArticleEra, 'AI Generated', 'Research']
      };

      setArticlesList([newArticle, ...articlesList]);
      setSelectedArticle(newArticle);
      setCustomArticleTopic('');
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || 'Make sure your Gemini API Key is configured in settings.');
    } finally {
      setIsGeneratingArticle(false);
    }
  };

  // Filter Monarchs
  const filteredMonarchs = MONARCHS.filter((m) => {
    const matchesRegion = selectedMonarchRegion === 'All' || m.region === selectedMonarchRegion;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.reign.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Filter Figures
  const filteredFigures = HISTORICAL_FIGURES.filter((f) => {
    const matchesCategory = selectedFigureCategory === 'All' || f.category === selectedFigureCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.era.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter Leaders
  const filteredLeaders = LEADERS.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Filter Countries
  const filteredCountries = COUNTRIES.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Filter 600+ History Vault
  const filteredVault600 = HISTORY_VAULT_600.filter((v) => {
    const query = searchQuery.toLowerCase();
    return (
      v.title.toLowerCase().includes(query) ||
      v.era.toLowerCase().includes(query) ||
      v.location.toLowerCase().includes(query) ||
      v.famousPersona.toLowerCase().includes(query) ||
      v.worldAchievement.toLowerCase().includes(query) ||
      v.significance.toLowerCase().includes(query) ||
      v.description.toLowerCase().includes(query)
    );
  });

  // Filter Articles
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return articlesList;
    return articlesList.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.preview.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [articlesList, searchQuery]);

  // Pagination State for All Vault Sections - optimized for fewer next pages and rich previous page visibility
  const [monarchsPage, setMonarchsPage] = useState(1);
  const [monarchsPerPage, setMonarchsPerPage] = useState(36);

  const [figuresPage, setFiguresPage] = useState(1);
  const [figuresPerPage, setFiguresPerPage] = useState(32);

  const [leadersPage, setLeadersPage] = useState(1);
  const [leadersPerPage, setLeadersPerPage] = useState(36);

  const [countriesPage, setCountriesPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(36);

  const [vault600Page, setVault600Page] = useState(1);
  const [vault600PerPage, setVault600PerPage] = useState(60);

  const [articlesPage, setArticlesPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(24);

  // Reset pagination on filter or tab change
  useEffect(() => {
    setMonarchsPage(1);
    setFiguresPage(1);
    setLeadersPage(1);
    setCountriesPage(1);
    setVault600Page(1);
    setArticlesPage(1);
  }, [searchQuery, selectedMonarchRegion, selectedFigureCategory, activeTab]);

  // Slices for paginated rendering
  const paginatedMonarchs = useMemo(() => {
    const start = (monarchsPage - 1) * monarchsPerPage;
    return filteredMonarchs.slice(start, start + monarchsPerPage);
  }, [filteredMonarchs, monarchsPage, monarchsPerPage]);

  const paginatedFigures = useMemo(() => {
    const start = (figuresPage - 1) * figuresPerPage;
    return filteredFigures.slice(start, start + figuresPerPage);
  }, [filteredFigures, figuresPage, figuresPerPage]);

  const paginatedLeaders = useMemo(() => {
    const start = (leadersPage - 1) * leadersPerPage;
    return filteredLeaders.slice(start, start + leadersPerPage);
  }, [filteredLeaders, leadersPage, leadersPerPage]);

  const paginatedCountries = useMemo(() => {
    const start = (countriesPage - 1) * countriesPerPage;
    return filteredCountries.slice(start, start + countriesPerPage);
  }, [filteredCountries, countriesPage, countriesPerPage]);

  const paginatedVault600 = useMemo(() => {
    const start = (vault600Page - 1) * vault600PerPage;
    return filteredVault600.slice(start, start + vault600PerPage);
  }, [filteredVault600, vault600Page, vault600PerPage]);

  const paginatedArticles = useMemo(() => {
    const start = (articlesPage - 1) * articlesPerPage;
    return filteredArticles.slice(start, start + articlesPerPage);
  }, [filteredArticles, articlesPage, articlesPerPage]);

  // Deep Dive Sequential Navigation Handlers
  const currentMonarchIndex = useMemo(() => {
    if (!selectedMonarch) return -1;
    return filteredMonarchs.findIndex((m) => m.id === selectedMonarch.id);
  }, [selectedMonarch, filteredMonarchs]);

  const handlePrevMonarchDive = () => {
    if (filteredMonarchs.length === 0) return;
    const prevIdx = currentMonarchIndex > 0 ? currentMonarchIndex - 1 : filteredMonarchs.length - 1;
    setSelectedMonarch(filteredMonarchs[prevIdx]);
    setMonarchsPage(Math.floor(prevIdx / monarchsPerPage) + 1);
  };

  const handleNextMonarchDive = () => {
    if (filteredMonarchs.length === 0) return;
    const nextIdx = currentMonarchIndex < filteredMonarchs.length - 1 && currentMonarchIndex >= 0 ? currentMonarchIndex + 1 : 0;
    setSelectedMonarch(filteredMonarchs[nextIdx]);
    setMonarchsPage(Math.floor(nextIdx / monarchsPerPage) + 1);
  };

  const currentFigureIndex = useMemo(() => {
    if (!selectedFigure) return -1;
    return filteredFigures.findIndex((f) => f.id === selectedFigure.id);
  }, [selectedFigure, filteredFigures]);

  const handlePrevFigureDive = () => {
    if (filteredFigures.length === 0) return;
    const prevIdx = currentFigureIndex > 0 ? currentFigureIndex - 1 : filteredFigures.length - 1;
    setSelectedFigure(filteredFigures[prevIdx]);
    setFiguresPage(Math.floor(prevIdx / figuresPerPage) + 1);
  };

  const handleNextFigureDive = () => {
    if (filteredFigures.length === 0) return;
    const nextIdx = currentFigureIndex < filteredFigures.length - 1 && currentFigureIndex >= 0 ? currentFigureIndex + 1 : 0;
    setSelectedFigure(filteredFigures[nextIdx]);
    setFiguresPage(Math.floor(nextIdx / figuresPerPage) + 1);
  };

  const currentLeaderIndex = useMemo(() => {
    if (!selectedLeader) return -1;
    return filteredLeaders.findIndex((l) => l.id === selectedLeader.id);
  }, [selectedLeader, filteredLeaders]);

  const handlePrevLeaderDive = () => {
    if (filteredLeaders.length === 0) return;
    const prevIdx = currentLeaderIndex > 0 ? currentLeaderIndex - 1 : filteredLeaders.length - 1;
    setSelectedLeader(filteredLeaders[prevIdx]);
    setLeadersPage(Math.floor(prevIdx / leadersPerPage) + 1);
  };

  const handleNextLeaderDive = () => {
    if (filteredLeaders.length === 0) return;
    const nextIdx = currentLeaderIndex < filteredLeaders.length - 1 && currentLeaderIndex >= 0 ? currentLeaderIndex + 1 : 0;
    setSelectedLeader(filteredLeaders[nextIdx]);
    setLeadersPage(Math.floor(nextIdx / leadersPerPage) + 1);
  };

  const currentCountryIndex = useMemo(() => {
    if (!selectedCountry) return -1;
    return filteredCountries.findIndex((c) => c.id === selectedCountry.id);
  }, [selectedCountry, filteredCountries]);

  const handlePrevCountryDive = () => {
    if (filteredCountries.length === 0) return;
    const prevIdx = currentCountryIndex > 0 ? currentCountryIndex - 1 : filteredCountries.length - 1;
    setSelectedCountry(filteredCountries[prevIdx]);
    setCountriesPage(Math.floor(prevIdx / countriesPerPage) + 1);
  };

  const handleNextCountryDive = () => {
    if (filteredCountries.length === 0) return;
    const nextIdx = currentCountryIndex < filteredCountries.length - 1 && currentCountryIndex >= 0 ? currentCountryIndex + 1 : 0;
    setSelectedCountry(filteredCountries[nextIdx]);
    setCountriesPage(Math.floor(nextIdx / countriesPerPage) + 1);
  };

  const currentArticleIndex = useMemo(() => {
    if (!selectedArticle) return -1;
    return filteredArticles.findIndex((a) => a.id === selectedArticle.id);
  }, [selectedArticle, filteredArticles]);

  const handlePrevArticleDive = () => {
    if (filteredArticles.length === 0) return;
    const prevIdx = currentArticleIndex > 0 ? currentArticleIndex - 1 : filteredArticles.length - 1;
    setSelectedArticle(filteredArticles[prevIdx]);
    setArticlesPage(Math.floor(prevIdx / articlesPerPage) + 1);
  };

  const handleNextArticleDive = () => {
    if (filteredArticles.length === 0) return;
    const nextIdx = currentArticleIndex < filteredArticles.length - 1 && currentArticleIndex >= 0 ? currentArticleIndex + 1 : 0;
    setSelectedArticle(filteredArticles[nextIdx]);
    setArticlesPage(Math.floor(nextIdx / articlesPerPage) + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden space-y-6"
    >
      {/* Primary Navigation Tabs for Vault */}
      <div className="flex flex-wrap border border-[#2A2A2A] bg-[#0F0F0F] p-1.5 rounded-2xl gap-1">
        <button
          onClick={() => { setActiveTab('monarchs'); setSearchQuery(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'monarchs'
              ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] shadow-md'
              : 'text-[#A09890] hover:text-[#E0D8D0] hover:bg-[#1A1A1A]/50'
          }`}
        >
          <Shield className="w-4 h-4 text-[#D4AF37]" /> Kings & Queens
        </button>
        <button
          onClick={() => { setActiveTab('figures'); setSearchQuery(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'figures'
              ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] shadow-md'
              : 'text-[#A09890] hover:text-[#E0D8D0] hover:bg-[#1A1A1A]/50'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#D4AF37]" /> Figure Archive
        </button>
        <button
          onClick={() => { setActiveTab('leaders'); setSearchQuery(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'leaders'
              ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] shadow-md'
              : 'text-[#A09890] hover:text-[#E0D8D0] hover:bg-[#1A1A1A]/50'
          }`}
        >
          <UserCheck className="w-4 h-4 text-[#D4AF37]" /> Global Leaders
        </button>
        <button
          onClick={() => { setActiveTab('countries'); setSearchQuery(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'countries'
              ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] shadow-md'
              : 'text-[#A09890] hover:text-[#E0D8D0] hover:bg-[#1A1A1A]/50'
          }`}
        >
          <Flag className="w-4 h-4 text-[#D4AF37]" /> Country Vaults
        </button>
        <button
          onClick={() => { setActiveTab('vault600'); setSearchQuery(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'vault600'
              ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] shadow-md'
              : 'text-[#A09890] hover:text-[#E0D8D0] hover:bg-[#1A1A1A]/50'
          }`}
        >
          <Clock className="w-4 h-4 text-[#D4AF37]" /> 600+ AD Imperial Vault
        </button>
        <button
          onClick={() => { setActiveTab('articles'); setSearchQuery(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'articles'
              ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] shadow-md'
              : 'text-[#A09890] hover:text-[#E0D8D0] hover:bg-[#1A1A1A]/50'
          }`}
        >
          <FileText className="w-4 h-4 text-[#D4AF37]" /> Chronicles & Articles
        </button>
      </div>

      {/* Global search within vault */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-[#A09890]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search inside the active ${activeTab} vault...`}
          className="w-full pl-11 pr-4 py-3 bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all text-xs sm:text-sm font-sans"
        />
      </div>

      {/* VAULT SECTIONS */}

      {/* 1. MONARCHS VAULT */}
      {activeTab === 'monarchs' && (
        <div className="space-y-6">
          {/* Sub-region filters */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] max-w-2xl">
            {['All', 'Egyptian', 'Greek', 'Roman', 'Indian', 'European'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedMonarchRegion(region)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedMonarchRegion === region
                    ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] shadow-md'
                    : 'text-[#A09890] hover:text-[#E0D8D0]'
                }`}
              >
                {region === 'All' ? 'All Dynasties' : `${region} Kings`}
              </button>
            ))}
          </div>

          {/* Top Pagination for Monarchs (when list view) */}
          {!selectedMonarch && filteredMonarchs.length > monarchsPerPage && (
            <div className="pb-1">
              <PaginationControls
                currentPage={monarchsPage}
                totalItems={filteredMonarchs.length}
                itemsPerPage={monarchsPerPage}
                onPageChange={setMonarchsPage}
                onItemsPerPageChange={(newSize) => {
                  setMonarchsPerPage(newSize);
                  setMonarchsPage(1);
                }}
                itemsPerPageOptions={[18, 36, 60, 120]}
              />
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monarch detail panel overlay (active selection) */}
            {selectedMonarch ? (
              <div className="md:col-span-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 relative animate-fade-in space-y-4 text-left">
                {/* Deep Dive Sequential Navigation Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222] pb-3.5 mb-2">
                  <button
                    onClick={handlePrevMonarchDive}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] transition-all cursor-pointer"
                    title="Previous Monarch in Filtered Archive"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev Monarch</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#A09890] bg-[#0A0A0A] border border-[#222] px-2.5 py-1 rounded-md">
                      Monarch <strong className="text-white">{currentMonarchIndex + 1}</strong> of <strong className="text-white">{filteredMonarchs.length}</strong>
                    </span>
                    <span className="text-[10px] font-mono text-[#D4AF37] hidden sm:inline">⚡ Sequential Deep Dive</span>
                  </div>

                  <button
                    onClick={handleNextMonarchDive}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] transition-all cursor-pointer"
                    title="Next Monarch in Filtered Archive"
                  >
                    <span>Next Monarch</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 pb-1">
                  <button
                    onClick={() => onToggleBookmark?.(selectedMonarch.id, 'ruler', selectedMonarch.name, selectedMonarch.title)}
                    className={`text-xs font-semibold border px-2.5 py-1.5 rounded bg-[#0A0A0A] flex items-center gap-1 transition-all cursor-pointer ${
                      bookmarks?.some(b => b.targetId === selectedMonarch.id && b.type === 'ruler')
                        ? 'text-yellow-400 border-yellow-500/50 bg-yellow-950/20'
                        : 'text-[#E0D8D0] hover:text-[#D4AF37] border-[#2A2A2A]'
                    }`}
                  >
                    <span>{bookmarks?.some(b => b.targetId === selectedMonarch.id && b.type === 'ruler') ? '★ Saved' : '☆ Bookmark'}</span>
                  </button>
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(selectedMonarch.name.replace(/\s+/g, '_'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#D4AF37] hover:text-white border border-[#D4AF37]/50 px-2.5 py-1.5 rounded bg-[#1A1813] cursor-pointer inline-flex items-center gap-1"
                    title={`View ${selectedMonarch.name} on Wikipedia`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Wikipedia ↗
                  </a>
                  <button
                    onClick={() => setSelectedMonarch(null)}
                    className="text-xs font-semibold text-[#E0D8D0] hover:text-[#D4AF37] border border-[#2A2A2A] px-2.5 py-1.5 rounded bg-[#0A0A0A] cursor-pointer"
                  >
                    Close & Back
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {selectedMonarch.imageUrl && (
                    <img
                      src={selectedMonarch.imageUrl}
                      alt={selectedMonarch.name}
                      referrerPolicy="no-referrer"
                      className="w-full md:w-56 h-56 object-cover rounded-xl border border-[#2A2A2A] shadow-xl"
                    />
                  )}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#1A1A1A] border border-[#2A2A2A] text-[#D4AF37] px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                        {selectedMonarch.region} dynasty
                      </span>
                      <span className="text-xs bg-[#1A110F] border border-[#3A1E16] text-[#D4AF37] px-2.5 py-0.5 rounded font-mono font-bold">
                        Reign: {selectedMonarch.reign}
                      </span>
                    </div>

                    <h4 className="text-2xl font-serif italic text-white tracking-tight">{selectedMonarch.name}</h4>
                    <p className="text-[#A09890] italic text-sm">{selectedMonarch.title}</p>
                    <p className="text-[#A09890] text-sm leading-relaxed mt-2">{selectedMonarch.biography}</p>
                  </div>
                </div>

                <div className="border-t border-[#2A2A2A] pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-bold text-xs text-[#D4AF37] uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2.5">
                      <Award className="w-4 h-4 text-[#D4AF37]" /> Monumental Achievements
                    </h5>
                    <ul className="space-y-1.5">
                      {selectedMonarch.keyAchievements.map((ach, idx) => (
                        <li key={idx} className="text-xs text-[#A09890] flex items-start gap-1.5 leading-relaxed font-sans">
                          <span className="text-[#D4AF37] mt-0.5">•</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-xs text-[#D4AF37] uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2.5">
                      <Landmark className="w-4 h-4 text-[#D4AF37]" /> Royal Legacy Fact
                    </h5>
                    <p className="text-[#D8CDBC] text-xs p-3.5 bg-[#060606] border border-[#2A2A2A] rounded-xl leading-relaxed italic">
                      "{selectedMonarch.legacy}"
                    </p>
                    <InlineNotesWidget
                      targetId={selectedMonarch.id}
                      targetType="Monarch"
                      targetName={selectedMonarch.name}
                      notes={notes}
                      onAddNote={onAddNote}
                      onDeleteNote={onDeleteNote}
                    />
                  </div>
                </div>
              </div>
            ) : filteredMonarchs.length > 0 ? (
              paginatedMonarchs.map((monarch) => (
                <div
                  key={monarch.id}
                  onClick={() => setSelectedMonarch(monarch)}
                  className="bg-[#0F0F0F] border border-[#2A2A2A] hover:border-[#D4AF37]/50 rounded-xl p-5 transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#A09890]">
                        {monarch.region}
                      </span>
                      <span className="text-[10px] font-mono text-[#D4AF37] bg-[#0A0A0A] px-1.5 py-0.5 rounded border border-[#2A2A2A]">
                        {monarch.reign}
                      </span>
                    </div>
                    <h4 className="font-serif italic font-bold text-white group-hover:text-[#D4AF37] tracking-normal text-lg">
                      {monarch.name}
                    </h4>
                    <p className="text-xs text-[#A09890] italic truncate">{monarch.title}</p>
                    <p className="text-xs text-[#A09890] line-clamp-3 mt-2">{monarch.biography}</p>
                    {monarch.keyAchievements && monarch.keyAchievements.length > 0 && (
                      <p className="text-[11px] text-[#A6998A] line-clamp-1 italic mt-1.5 font-mono">
                        <span className="text-[#D4AF37] font-bold">Key:</span> {monarch.keyAchievements[0]}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                    <span>Explore details</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-[#A09890]">No monarchs match your query.</p>
              </div>
            )}
          </div>

          {/* Bottom Pagination for Monarchs */}
          {!selectedMonarch && filteredMonarchs.length > monarchsPerPage && (
            <div className="pt-2">
              <PaginationControls
                currentPage={monarchsPage}
                totalItems={filteredMonarchs.length}
                itemsPerPage={monarchsPerPage}
                onPageChange={setMonarchsPage}
                onItemsPerPageChange={(newSize) => {
                  setMonarchsPerPage(newSize);
                  setMonarchsPage(1);
                }}
                itemsPerPageOptions={[18, 36, 60, 120]}
              />
            </div>
          )}
        </div>
      )}

      {/* 2. HISTORICAL FIGURES VAULT */}
      {activeTab === 'figures' && (
        <div className="space-y-6">
          {/* Spotlight Highlight Banner */}
          {onOpenSpotlight && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#181610] via-[#141414] to-[#0F0F0F] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#2A2312] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Historical Figure Spotlight</span>
                    <span className="text-[10px] bg-[#2E2410] border border-[#D4AF37]/40 text-[#D4AF37] px-2 py-0.5 rounded font-mono font-bold uppercase">Featured</span>
                  </h4>
                  <p className="text-xs text-[#A09890]">
                    Explore daily and weekly featured sovereigns, leaders, and thinkers with rich biographies, anecdotes, and key achievements.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenSpotlight()}
                className="px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-black font-semibold text-xs transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-sm font-sans"
              >
                Open Spotlight Showcase ➔
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-1 bg-[#0A0A0A] p-1 rounded-lg border border-[#2A2A2A] max-w-xl">
            {['All', 'Philosopher', 'Scientist', 'Warrior'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFigureCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedFigureCategory === cat
                    ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] shadow-md'
                    : 'text-[#A09890] hover:text-[#E0D8D0]'
                }`}
              >
                {cat === 'All' ? 'All Archive' : `${cat}s`}
              </button>
            ))}
          </div>

          {/* Top Pagination for Figures (when list view) */}
          {!selectedFigure && filteredFigures.length > figuresPerPage && (
            <div className="pb-1">
              <PaginationControls
                currentPage={figuresPage}
                totalItems={filteredFigures.length}
                itemsPerPage={figuresPerPage}
                onPageChange={setFiguresPage}
                onItemsPerPageChange={(newSize) => {
                  setFiguresPerPage(newSize);
                  setFiguresPage(1);
                }}
                itemsPerPageOptions={[16, 32, 64, 120]}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedFigure ? (
              <div className="col-span-2 bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 relative animate-fade-in space-y-4 text-left">
                {/* Deep Dive Sequential Navigation Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222] pb-3.5 mb-2">
                  <button
                    onClick={handlePrevFigureDive}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] transition-all cursor-pointer"
                    title="Previous Figure in Filtered Archive"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev Figure</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#A09890] bg-[#0A0A0A] border border-[#222] px-2.5 py-1 rounded-md">
                      Figure <strong className="text-white">{currentFigureIndex + 1}</strong> of <strong className="text-white">{filteredFigures.length}</strong>
                    </span>
                    <span className="text-[10px] font-mono text-[#D4AF37] hidden sm:inline">⚡ Sequential Deep Dive</span>
                  </div>

                  <button
                    onClick={handleNextFigureDive}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] transition-all cursor-pointer"
                    title="Next Figure in Filtered Archive"
                  >
                    <span>Next Figure</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 pb-1">
                  {onOpenSpotlight && (
                    <button
                      onClick={() => onOpenSpotlight(selectedFigure.id)}
                      className="text-xs font-semibold text-[#D4AF37] hover:text-white border border-[#D4AF37]/50 px-2.5 py-1.5 rounded bg-[#1F1C12] cursor-pointer inline-flex items-center gap-1"
                      title="Open in Historical Figure Spotlight showcase"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Spotlight View
                    </button>
                  )}
                  <button
                    onClick={() => onToggleBookmark?.(selectedFigure.id, 'figure', selectedFigure.name, selectedFigure.category)}
                    className={`text-xs font-semibold border px-2.5 py-1.5 rounded bg-[#0A0A0A] flex items-center gap-1 transition-all cursor-pointer ${
                      bookmarks?.some(b => b.targetId === selectedFigure.id && b.type === 'figure')
                        ? 'text-yellow-400 border-yellow-500/50 bg-yellow-950/20'
                        : 'text-[#E0D8D0] hover:text-[#D4AF37] border-[#2A2A2A]'
                    }`}
                  >
                    <span>{bookmarks?.some(b => b.targetId === selectedFigure.id && b.type === 'figure') ? '★ Saved' : '☆ Bookmark'}</span>
                  </button>
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(selectedFigure.name.replace(/\s+/g, '_'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#D4AF37] hover:text-white border border-[#D4AF37]/50 px-2.5 py-1.5 rounded bg-[#1A1813] cursor-pointer inline-flex items-center gap-1"
                    title={`View ${selectedFigure.name} on Wikipedia`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Wikipedia ↗
                  </a>
                  <button
                    onClick={() => setSelectedFigure(null)}
                    className="text-xs font-semibold text-[#E0D8D0] hover:text-[#D4AF37] border border-[#2A2A2A] px-2.5 py-1.5 rounded bg-[#0A0A0A] cursor-pointer"
                  >
                    Back to List
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {selectedFigure.imageUrl && (
                    <img
                      src={selectedFigure.imageUrl}
                      alt={selectedFigure.name}
                      referrerPolicy="no-referrer"
                      className="w-full md:w-44 h-44 object-cover rounded-xl border border-[#2A2A2A] shadow-xl"
                    />
                  )}
                  <div className="space-y-2 flex-1 text-left">
                    <span className="text-[10px] bg-[#1A1A1A] border border-[#2A2A2A] text-[#D4AF37] px-2.5 py-0.5 rounded font-mono font-bold tracking-widest uppercase">
                      {selectedFigure.category}
                    </span>
                    <h4 className="text-2xl font-serif italic text-white tracking-tight">{selectedFigure.name}</h4>
                    <p className="text-xs font-mono text-[#D4AF37]">Period: {selectedFigure.era} ({selectedFigure.birthDeath})</p>
                    <p className="text-sm text-[#A09890] leading-relaxed mt-2">{selectedFigure.biography}</p>
                    {selectedFigure.quote && (
                      <div className="relative p-4 mt-3 bg-[#122C26]/20 border-l-2 border-[#D4AF37] rounded-r-xl text-white font-serif italic text-xs leading-relaxed text-left">
                        <span className="absolute -top-1 -left-1 text-2xl text-[#D4AF37]/30 select-none">“</span>
                        "{selectedFigure.quote}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#2A2A2A] pt-4 text-left">
                  <h5 className="font-serif italic font-bold text-xs text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                    <Award className="w-4 h-4 text-[#D4AF37]" /> Landmark Contributions
                  </h5>
                  <ul className="space-y-2 pl-1">
                    {selectedFigure.contributions.map((contr, idx) => (
                      <li key={idx} className="text-xs text-[#A09890] flex items-start gap-1.5 leading-relaxed font-sans">
                        <span className="text-[#D4AF37] shrink-0 mt-0.5 font-bold">✔</span>
                        <span>{contr}</span>
                      </li>
                    ))}
                  </ul>

                  <InlineNotesWidget
                    targetId={selectedFigure.id}
                    targetType="Figure"
                    targetName={selectedFigure.name}
                    notes={notes}
                    onAddNote={onAddNote}
                    onDeleteNote={onDeleteNote}
                  />
                </div>
              </div>
            ) : filteredFigures.length > 0 ? (
              paginatedFigures.map((fig) => (
                <div
                  key={fig.id}
                  onClick={() => setSelectedFigure(fig)}
                  className="bg-[#0F0F0F] border border-[#2A2A2A] hover:border-[#D4AF37]/50 p-5 rounded-xl transition-all cursor-pointer text-left flex gap-4 items-start group"
                >
                  {fig.imageUrl && (
                    <img
                      src={fig.imageUrl}
                      alt={fig.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-lg border border-[#2A2A2A] shrink-0"
                    />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#A09890] font-bold bg-[#161616] border border-[#202020] px-1.5 rounded">
                        {fig.category}
                      </span>
                    </div>
                    <h4 className="font-serif italic font-bold text-white group-hover:text-[#D4AF37] tracking-normal">
                      {fig.name}
                    </h4>
                    <p className="text-xs text-[#A09890]">{fig.role}</p>
                    <p className="text-xs text-[#D4AF37] font-mono mt-1">{fig.era}</p>
                    {fig.biography && (
                      <p className="text-xs text-[#8A8075] line-clamp-2 mt-1.5 font-sans leading-relaxed">
                        {fig.biography}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-[#A09890]">No figures found matching your filter details.</p>
              </div>
            )}
          </div>

          {/* Bottom Pagination for Figures */}
          {!selectedFigure && filteredFigures.length > figuresPerPage && (
            <div className="pt-2">
              <PaginationControls
                currentPage={figuresPage}
                totalItems={filteredFigures.length}
                itemsPerPage={figuresPerPage}
                onPageChange={setFiguresPage}
                onItemsPerPageChange={(newSize) => {
                  setFiguresPerPage(newSize);
                  setFiguresPage(1);
                }}
                itemsPerPageOptions={[16, 32, 64, 120]}
              />
            </div>
          )}
        </div>
      )}

      {/* 3. LEADERS VAULT */}
      {activeTab === 'leaders' && (
        <div className="space-y-6 text-left">
          {/* Top Pagination for Leaders (when list view) */}
          {!selectedLeader && filteredLeaders.length > leadersPerPage && (
            <div className="pb-1">
              <PaginationControls
                currentPage={leadersPage}
                totalItems={filteredLeaders.length}
                itemsPerPage={leadersPerPage}
                onPageChange={setLeadersPage}
                onItemsPerPageChange={(newSize) => {
                  setLeadersPerPage(newSize);
                  setLeadersPage(1);
                }}
                itemsPerPageOptions={[18, 36, 60, 120]}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {selectedLeader ? (
              <div className="col-span-2 bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 relative animate-fade-in space-y-4 text-left">
                {/* Deep Dive Sequential Navigation Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222] pb-3.5 mb-2">
                  <button
                    onClick={handlePrevLeaderDive}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] transition-all cursor-pointer"
                    title="Previous Leader in Filtered Archive"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev Leader</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#A09890] bg-[#0A0A0A] border border-[#222] px-2.5 py-1 rounded-md">
                      Leader <strong className="text-white">{currentLeaderIndex + 1}</strong> of <strong className="text-white">{filteredLeaders.length}</strong>
                    </span>
                    <span className="text-[10px] font-mono text-[#D4AF37] hidden sm:inline">⚡ Sequential Deep Dive</span>
                  </div>

                  <button
                    onClick={handleNextLeaderDive}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] transition-all cursor-pointer"
                    title="Next Leader in Filtered Archive"
                  >
                    <span>Next Leader</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 pb-1">
                  <button
                    onClick={() => onToggleBookmark?.(selectedLeader.id, 'figure', selectedLeader.name, selectedLeader.country)}
                    className={`text-xs font-semibold border px-2.5 py-1.5 rounded bg-[#0A0A0A] flex items-center gap-1 transition-all cursor-pointer ${
                      bookmarks?.some(b => b.targetId === selectedLeader.id && b.type === 'figure')
                        ? 'text-yellow-400 border-yellow-500/50 bg-yellow-950/20'
                        : 'text-[#E0D8D0] hover:text-[#D4AF37] border-[#2A2A2A]'
                    }`}
                  >
                    <span>{bookmarks?.some(b => b.targetId === selectedLeader.id && b.type === 'figure') ? '★ Saved' : '☆ Bookmark'}</span>
                  </button>
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(selectedLeader.name.replace(/\s+/g, '_'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#D4AF37] hover:text-white border border-[#D4AF37]/50 px-2.5 py-1.5 rounded bg-[#1A1813] cursor-pointer inline-flex items-center gap-1"
                    title={`View ${selectedLeader.name} on Wikipedia`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Wikipedia ↗
                  </a>
                  <button
                    onClick={() => setSelectedLeader(null)}
                    className="text-xs font-semibold text-[#E0D8D0] hover:text-[#D4AF37] border border-[#2A2A2A] px-2.5 py-1.5 rounded bg-[#0A0A0A] cursor-pointer"
                  >
                    Close Biography
                  </button>
                </div>

                <div className="space-y-1.5 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] bg-[#1A1A1A] border border-[#2A2A2A] text-[#D4AF37] px-2 py-0.5 rounded font-mono font-bold">
                      {selectedLeader.country} ({selectedLeader.period})
                    </span>
                    {selectedLeader.impactScale && (
                      <span className={`inline-flex items-center gap-1 text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded-full border ${
                        selectedLeader.impactScale === 'Global'
                          ? 'bg-[#E5C158]/10 text-[#E5C158] border-[#E5C158]/30'
                          : selectedLeader.impactScale === 'Regional'
                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          selectedLeader.impactScale === 'Global'
                            ? 'bg-[#E5C158]'
                            : selectedLeader.impactScale === 'Regional'
                            ? 'bg-sky-400'
                            : 'bg-emerald-400'
                        }`} />
                        {selectedLeader.impactScale} Influence
                      </span>
                    )}
                  </div>
                  <h4 className="text-2xl font-serif italic text-white tracking-tight">{selectedLeader.name}</h4>
                  <p className="text-sm text-[#A09890] leading-relaxed mt-2">{selectedLeader.biography}</p>
                </div>

                <div className="border-t border-[#2A2A2A] pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-bold text-xs text-[#D4AF37] uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2.5">
                      🌐 Geopolitical Impact
                    </h5>
                    <p className="text-[#D8CDBC] text-xs leading-relaxed p-3 bg-[#0A0A0A] border border-[#2A2A2A] border-l-2 border-[#D4AF37] rounded-lg italic text-left">
                      "{selectedLeader.impact}"
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-xs text-[#D4AF37] uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2.5 text-left">
                      🏛 Milestones & Reforms
                    </h5>
                    <ul className="space-y-1.5 pl-1.5">
                      {selectedLeader.achievements.map((ach, idx) => (
                        <li key={idx} className="text-xs text-[#A09890] flex items-start gap-1.5 leading-relaxed font-sans">
                          <span className="text-[#D4AF37] mt-1">•</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <InlineNotesWidget
                  targetId={selectedLeader.id}
                  targetType="Figure"
                  targetName={selectedLeader.name}
                  notes={notes}
                  onAddNote={onAddNote}
                  onDeleteNote={onDeleteNote}
                />
              </div>
            ) : filteredLeaders.length > 0 ? (
              paginatedLeaders.map((leader) => (
                <div
                  key={leader.id}
                  onClick={() => setSelectedLeader(leader)}
                  className="bg-[#0F0F0F] border border-[#2A2A2A] hover:border-[#D4AF37]/50 p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between group text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-[#1A1A1A] text-[#D4AF37] font-mono font-bold px-2 py-0.5 rounded border border-[#2A2A2A]">
                        {leader.country}
                      </span>
                      {leader.impactScale && (
                        <span className={`inline-flex items-center gap-1 text-[9px] uppercase font-mono font-bold px-2 py-px rounded-full border ${
                          leader.impactScale === 'Global'
                            ? 'bg-[#E5C158]/10 text-[#E5C158] border-[#E5C158]/30'
                            : leader.impactScale === 'Regional'
                            ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            leader.impactScale === 'Global'
                              ? 'bg-[#E5C158]'
                              : leader.impactScale === 'Regional'
                              ? 'bg-sky-400'
                              : 'bg-emerald-400'
                          }`} />
                          {leader.impactScale}
                        </span>
                      )}
                      <span className="text-[11px] text-[#A09890] font-mono font-medium">
                        {leader.period}
                      </span>
                    </div>
                    <h4 className="font-serif italic font-bold text-white group-hover:text-[#D4AF37] tracking-normal text-lg">
                      {leader.name}
                    </h4>
                    <p className="text-xs text-[#A09890] line-clamp-3">{leader.biography}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2A2A2A] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                    <span>View structural details</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-[#A09890]">No leaders match that criteria.</p>
              </div>
            )}
          </div>

          {/* Bottom Pagination for Leaders */}
          {!selectedLeader && filteredLeaders.length > leadersPerPage && (
            <div className="pt-2">
              <PaginationControls
                currentPage={leadersPage}
                totalItems={filteredLeaders.length}
                itemsPerPage={leadersPerPage}
                onPageChange={setLeadersPage}
                onItemsPerPageChange={(newSize) => {
                  setLeadersPerPage(newSize);
                  setLeadersPage(1);
                }}
                itemsPerPageOptions={[18, 36, 60, 120]}
              />
            </div>
          )}
        </div>
      )}

      {/* 4. COUNTRY VAULT */}
      {activeTab === 'countries' && (
        <div className="space-y-6 text-left">
          {/* Top Pagination for Countries (when list view) */}
          {!selectedCountry && filteredCountries.length > countriesPerPage && (
            <div className="pb-1">
              <PaginationControls
                currentPage={countriesPage}
                totalItems={filteredCountries.length}
                itemsPerPage={countriesPerPage}
                onPageChange={setCountriesPage}
                onItemsPerPageChange={(newSize) => {
                  setCountriesPerPage(newSize);
                  setCountriesPage(1);
                }}
                itemsPerPageOptions={[18, 36, 60, 120]}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Main detail overlay */}
            {selectedCountry ? (
              <div className="md:col-span-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 relative animate-fade-in space-y-5 text-left">
                {/* Deep Dive Sequential Navigation Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222] pb-3.5 mb-2">
                  <button
                    onClick={handlePrevCountryDive}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] transition-all cursor-pointer"
                    title="Previous Country in Filtered Archive"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev Country</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#A09890] bg-[#0A0A0A] border border-[#222] px-2.5 py-1 rounded-md">
                      Country <strong className="text-white">{currentCountryIndex + 1}</strong> of <strong className="text-white">{filteredCountries.length}</strong>
                    </span>
                    <span className="text-[10px] font-mono text-[#D4AF37] hidden sm:inline">⚡ Sequential Deep Dive</span>
                  </div>

                  <button
                    onClick={handleNextCountryDive}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] transition-all cursor-pointer"
                    title="Next Country in Filtered Archive"
                  >
                    <span>Next Country</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 pb-1">
                  <button
                    onClick={() => onToggleBookmark?.(selectedCountry.id, 'country', selectedCountry.name, 'Civilization Profile')}
                    className={`text-xs font-semibold border px-2.5 py-1.5 rounded bg-[#0A0A0A] flex items-center gap-1 transition-all cursor-pointer ${
                      bookmarks?.some(b => b.targetId === selectedCountry.id && b.type === 'country')
                        ? 'text-yellow-400 border-yellow-500/50 bg-yellow-950/20'
                        : 'text-[#E0D8D0] hover:text-[#D4AF37] border-[#2A2A2A]'
                    }`}
                  >
                    <span>{bookmarks?.some(b => b.targetId === selectedCountry.id && b.type === 'country') ? '★ Saved' : '☆ Bookmark'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="text-xs font-semibold text-[#E0D8D0] hover:text-[#D4AF37] border border-[#2A2A2A] px-2.5 py-1.5 rounded bg-[#0A0A0A] cursor-pointer"
                  >
                    Select Another Country
                  </button>
                </div>

              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedCountry.flag}</span>
                <div className="text-left">
                  <h4 className="text-2xl font-serif italic text-white tracking-normal">{selectedCountry.name} Country Vault</h4>
                  <p className="text-xs text-[#A09890] italic mt-0.5">Comprehensive regional profiling, geography, and world effects</p>
                </div>
              </div>

              {/* Grid content blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-4">
                  <div className="text-left">
                    <h5 className="font-serif italic font-bold text-xs text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                       📚 Civilization & Culture
                    </h5>
                    <p className="text-xs text-[#A09890] leading-relaxed bg-[#0A0A0A] p-3.5 border border-[#2A2A2A] rounded-xl font-sans">
                      {selectedCountry.culture}
                    </p>
                  </div>

                  <div className="text-left">
                    <h5 className="font-serif italic font-bold text-xs text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                       ⚖ History Summary
                    </h5>
                    <p className="text-xs text-[#A09890] leading-relaxed bg-[#0A0A0A] p-3.5 border border-[#2A2A2A] rounded-xl font-sans">
                      {selectedCountry.summary}
                    </p>
                  </div>

                  {selectedCountry.nationalEpics && (
                    <div className="text-left">
                      <h5 className="font-serif italic font-bold text-xs text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                         📖 Legendary National Epics & Sagas
                      </h5>
                      <p className="text-xs text-[#A09890] leading-relaxed bg-[#0A0A0A] p-3.5 border border-[#2A2A2A] rounded-xl font-serif italic">
                        {selectedCountry.nationalEpics}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="text-left">
                    <h5 className="font-serif italic font-bold text-xs text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                       🔥 Political Revolution & Independence
                    </h5>
                    <p className="text-xs text-[#A09890] leading-relaxed bg-[#0A0A0A] p-3.5 border border-[#2A2A2A] rounded-xl font-sans">
                      {selectedCountry.revolution}
                    </p>
                  </div>

                  <div className="text-left">
                    <h5 className="font-serif italic font-bold text-xs text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                       🌍 Major Effect & Geography
                    </h5>
                    <div className="bg-[#0A0A0A] p-3.5 border border-[#2A2A2A] rounded-xl text-xs space-y-2.5 font-sans">
                      <p className="text-[#A09890] leading-relaxed"><strong className="text-[#D4AF37]">Impact:</strong> {selectedCountry.worldImpact}</p>
                      <p className="text-[#A09890] leading-relaxed"><strong className="text-[#D4AF37]">Boundaries:</strong> {selectedCountry.geography}</p>
                    </div>
                  </div>

                  {/* New fields! Languages & Religions */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A] rounded-xl text-left">
                      <span className="text-[10px] uppercase font-mono font-bold text-[#D4AF37]">🗣 Native Language</span>
                      <p className="text-xs text-[#E0D8D0] mt-1 font-sans">{selectedCountry.language}</p>
                    </div>
                    {selectedCountry.majorReligions && (
                      <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A] rounded-xl text-left">
                        <span className="text-[10px] uppercase font-mono font-bold text-[#D4AF37]">🛐 Spiritual Heritage</span>
                        <p className="text-xs text-[#E0D8D0] mt-1 font-sans">{selectedCountry.majorReligions}</p>
                      </div>
                    )}
                  </div>

                  {/* Sovereign Currency & Historical Coinage */}
                  {(selectedCountry.modernCurrency || selectedCountry.oldCurrency) && (
                    <div className="bg-[#0A0A0A] p-4 border border-[#2A2A2A] rounded-xl text-left space-y-3.5">
                      <h5 className="font-serif italic font-bold text-xs text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#222] pb-1.5">
                        <Coins className="w-3.5 h-3.5 text-[#D4AF37]" /> Sovereign Currency Registry
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedCountry.modernCurrency && (
                          <div className="bg-[#050505] p-3 border border-[#1A1A1A] rounded-lg relative overflow-hidden">
                            <span className="absolute -top-1 -right-1 text-4xl font-serif font-black text-[#D4AF37]/5 pointer-events-none select-none">
                              {selectedCountry.modernCurrency.symbol}
                            </span>
                            <div className="flex items-center gap-1 mb-1.5">
                              <TrendingUp className="w-3 h-3 text-emerald-400" />
                              <span className="text-[8px] uppercase font-mono font-bold text-emerald-400">Modern Tender</span>
                            </div>
                            <h6 className="text-[#E0D8D0] font-bold text-xs">
                              {selectedCountry.modernCurrency.name} <span className="text-[8px] font-mono text-gray-500">[{selectedCountry.modernCurrency.code}]</span>
                            </h6>
                            <p className="text-[10px] text-[#A09890] mt-1 leading-relaxed font-sans">{selectedCountry.modernCurrency.history}</p>
                            <div className="mt-2.5 pt-1.5 border-t border-[#151515] flex flex-wrap justify-between gap-1 text-[9px] font-mono text-gray-500">
                              <span>Backing: <strong className="text-amber-500/90">{selectedCountry.modernCurrency.backing}</strong></span>
                              <span>Rate: <strong className="text-emerald-400">{selectedCountry.modernCurrency.valueUSD}</strong></span>
                            </div>
                          </div>
                        )}

                        {selectedCountry.oldCurrency && (
                          <div className="bg-[#050505] p-3 border border-[#1A1A1A] rounded-lg relative">
                            <div className="flex items-center gap-1 mb-1.5">
                              <Clock className="w-3 h-3 text-amber-500" />
                              <span className="text-[8px] uppercase font-mono font-bold text-amber-500">Historical Specimen</span>
                            </div>
                            <h6 className="text-[#E0D8D0] font-bold text-xs">{selectedCountry.oldCurrency.name}</h6>
                            <span className="text-[8px] text-amber-600 font-mono font-semibold bg-amber-950/20 px-1 py-0.5 rounded border border-amber-950/50 mt-1 inline-block">
                              {selectedCountry.oldCurrency.era}
                            </span>
                            <p className="text-[10px] text-[#A09890] mt-1 leading-relaxed font-sans">{selectedCountry.oldCurrency.details}</p>
                            <div className="mt-2.5 pt-1.5 border-t border-[#151515] text-[9px] font-mono text-gray-500 space-y-0.5">
                              <div>Metal: <strong className="text-[#E0D8D0]">{selectedCountry.oldCurrency.material}</strong></div>
                              <div className="text-[8px] text-[#7A7065] italic leading-snug font-sans">{selectedCountry.oldCurrency.significance}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Sovereign Governance & Executive Leadership */}
              {selectedCountry.currentLeaders && selectedCountry.currentLeaders.length > 0 && (
                <div className="bg-[#0B0B0B] border border-[#222] p-5 rounded-2xl text-left space-y-4">
                  <h5 className="font-serif italic font-bold text-xs text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 border-b border-[#1C1C1C] pb-3">
                    <UserCheck className="w-4 h-4 text-[#D4AF37]" /> Current Core Governance & Executive Leadership
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedCountry.currentLeaders.map((lead, i) => (
                      <div key={i} className="bg-[#050505] p-3.5 border border-[#1C1C1C] hover:border-[#D4AF37]/35 rounded-xl transition-all relative">
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="w-full">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="text-xs font-bold text-white font-serif">{lead.name}</span>
                              <span className="text-[7.5px] uppercase font-mono font-bold bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/35 px-1.5 py-0.5 rounded">
                                {lead.term}
                              </span>
                            </div>
                            <span className="text-[9.5px] font-mono text-emerald-400 font-semibold mt-1.5 block tracking-wide">
                              ★ {lead.title}
                            </span>
                            <div className="mt-3.5 bg-[#0A0A0A] p-3 border border-[#111] rounded-lg">
                              <span className="text-[8px] font-mono uppercase tracking-wider text-emerald-500/90 font-bold block mb-1">
                                Core Policy Mandates & Executive Directives:
                              </span>
                              <p className="text-[11px] text-[#A09890] leading-relaxed font-sans">{lead.policy}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* State regions helper map solver */}
              {(() => {
                const getStatesForCountry = (country: typeof selectedCountry) => {
                  if (!country) return [];
                  
                  // India
                  if (country.id === 'india') {
                    return [
                      { name: 'Maharashtra', capital: 'Raigad / Mumbai', fact: 'Heart of Shivaji’s Maratha Swarajya, home to high-elevation impregnable hill fortresses like Sinhagad and Raigad.', center: { x: 95, y: 55 } },
                      { name: 'Delhi & Agra', capital: 'Delhi', fact: 'Political capital under Tomars, Chauhan, Delhi Sultanate, and Mughals; home to grand administrative stone carvings.', center: { x: 205, y: 55 } },
                      { name: 'Bengal Delta', capital: 'Kolkata', fact: 'Global maritime textile giant, producing extremely valuable fine Muslin cotton and establishing rich scholastic print libraries.', center: { x: 95, y: 145 } },
                      { name: 'Tamilakam', capital: 'Thanjavur', fact: 'Seat of the seagoing Chola Dynasty Navy, building grand Brihadisvara stone pyramids and projecting south sea commerce.', center: { x: 205, y: 145 } }
                    ];
                  }
                  
                  // Egypt
                  if (country.id === 'egypt') {
                    return [
                      { name: 'Lower Egypt', capital: 'Alexandria', fact: 'Home to the Great Pyramids, Alexandria ancient library, and maritime trading connections across the Mediterranean shores.', center: { x: 95, y: 55 } },
                      { name: 'Upper Egypt', capital: 'Luxor', fact: 'Pharaonic royal tomb clusters, famous rock temple constructions, and Valley of the Kings administrative archives.', center: { x: 205, y: 55 } },
                      { name: 'Sinai Peninsula', capital: 'El Arish', fact: 'Critical mineral-rich copper link Bridge bordering Egypt and western Mesopotamian trade routes.', center: { x: 95, y: 145 } },
                      { name: 'Oases Deserts', capital: 'Kharga', fact: 'Desert transit nodes carrying trade routes, caravans, and gold securely across the Sahara.', center: { x: 205, y: 145 } }
                    ];
                  }
                  
                  // Greece
                  if (country.id === 'greece') {
                    return [
                      { name: 'Attica', capital: 'Athens', fact: 'Birthplace of direct democracy, formal Western logical theories, and grand Parthenon limestone columns.', center: { x: 95, y: 55 } },
                      { name: 'Peloponnese', capital: 'Sparta', fact: 'Militaristic land infantry superpower, establishing early Olympic rules and combat standardizations.', center: { x: 205, y: 55 } },
                      { name: 'Macedon', capital: 'Pella', fact: 'Alexander’s homeland; horse breeding plains that launched campaigns to coordinate Hellenic worlds.', center: { x: 95, y: 145 } },
                      { name: 'Crete & Aegean', capital: 'Knossos', fact: 'King Minos’ mythical palace labyrinth, colorful Minoan frescoes, and early seaborne shipping lanes.', center: { x: 205, y: 145 } }
                    ];
                  }
                  
                  // Italy
                  if (country.id === 'italy') {
                    return [
                      { name: 'Latium', capital: 'Rome', fact: 'Sovereign river settlement that birthed Roman Civil Law codes and volcanic concrete arch domes.', center: { x: 95, y: 55 } },
                      { name: 'Tuscany', capital: 'Florence', fact: 'Birthplace of standard accounting, fine Renaissance arts, and Galileo Galilei’s astronomical observatories.', center: { x: 205, y: 55 } },
                      { name: 'Sicily & Neapolis', capital: 'Palermo', fact: 'Cosmopolitan Mediterranean crossroads combining Norman, Arabic, Roman and Greek cathedral designs.', center: { x: 95, y: 145 } },
                      { name: 'Veneto', capital: 'Venice', fact: 'Maritime merchant republic that pioneered modern glass manufacturing, double-entry ledger bookkeeping, and global ship docks.', center: { x: 205, y: 145 } }
                    ];
                  }
                  
                  // China
                  if (country.id === 'china') {
                    return [
                      { name: 'Guanzhong', capital: 'Xi’an', fact: 'Protecting the start of the ancient trade routes and the legendary Terra Cotta underground tomb army.', center: { x: 95, y: 55 } },
                      { name: 'Jiangnan Basin', capital: 'Suzhou', fact: 'Center of high silk production, delicate tea leaf gardens, and Venice-like canal networks.', center: { x: 205, y: 55 } },
                      { name: 'Sichuan Sanctuary', capital: 'Chengdu', fact: 'Surrounded by protective mountains, holding early paper currency presses and epic poetry centers.', center: { x: 95, y: 145 } },
                      { name: 'Canton Oceans', capital: 'Guangzhou', fact: 'Prime trade port exporting exquisite porcelain, paper, and black tea across the Indian ocean channels.', center: { x: 205, y: 145 } }
                    ];
                  }
                  
                  // France
                  if (country.id === 'france') {
                    return [
                      { name: 'Île-de-France', capital: 'Paris', fact: 'The intellectual capital of the enlightenment; seat of the French crown, Notre Dame and Versailles.', center: { x: 95, y: 55 } },
                      { name: 'Aquitaine', capital: 'Bordeaux', fact: 'Focal point of medieval Anglo-French battles and global wine exports.', center: { x: 205, y: 55 } },
                      { name: 'Normandy', capital: 'Rouen', fact: 'Historic Norse homeland that launched William the Conqueror to unify Britain.', center: { x: 95, y: 145 } },
                      { name: 'Provence forums', capital: 'Marseille', fact: 'Historic Roman stone arenas, deep aromatic lavender valleys, and seaport commerce.', center: { x: 205, y: 145 } }
                    ];
                  }

                  // Default generated country
                  return [
                    { name: `${country.name} Delta`, capital: `Port ${country.flag}`, fact: `Major agricultural delta and trade terminal of the unified dynamic kingdom.`, center: { x: 95, y: 55 } },
                    { name: `${country.name} Highlands`, capital: `Crest City`, fact: `Mountainous border stronghold housing fortress arsenals protecting libraries and citizens from invaders.`, center: { x: 205, y: 55 } },
                    { name: `${country.name} Coastline`, capital: `Anchor Bay`, fact: `Pioneering shipping docks connecting maritime trading runs to standard global centers.`, center: { x: 95, y: 145 } },
                    { name: `${country.name} Oasis`, capital: `Scholar Oasis`, fact: `Spiritual school maintaining extensive archives of ancient history and philosophy.`, center: { x: 205, y: 145 } }
                  ];
                };

                const states = getStatesForCountry(selectedCountry);

                return (
                  <div className="bg-[#0B0B0B] border border-[#222] p-5 rounded-2xl text-left space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C1C1C] pb-3 text-left">
                      <div>
                        <h5 className="font-serif italic font-bold text-xs text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5">
                           🗺️ Provincial State Map & 3D Hologram Projection
                        </h5>
                        <p className="text-[10px] text-[#A09890] italic mt-0.5">Explore the geopolitical boundaries, capitals, and historic facts of {selectedCountry.name}</p>
                      </div>

                      <div className="flex items-center bg-[#111] p-1 rounded-lg border border-[#222] self-start sm:self-auto gap-1">
                        <button
                          onClick={() => setMapViewMode('flat')}
                          className={`px-3 py-1 text-[9px] uppercase font-mono font-bold tracking-wider rounded-md transition-all cursor-pointer ${
                            mapViewMode === 'flat' 
                              ? 'bg-[#D4AF37] text-black font-extrabold' 
                              : 'text-[#A09890] hover:text-white'
                          }`}
                        >
                          Flat Map
                        </button>
                        <button
                          onClick={() => setMapViewMode('360')}
                          className={`px-3 py-1 text-[9px] uppercase font-mono font-bold tracking-wider rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                            mapViewMode === '360' 
                              ? 'bg-emerald-500 text-black font-extrabold' 
                              : 'text-[#A09890] hover:text-white'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 animate-ping"></span>
                          360° View
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                      {/* Map Visual (Standard or Rotating) */}
                      <div className="md:col-span-2 bg-[#020202] border border-[#222] rounded-xl flex items-center justify-center relative p-6 aspect-[16/9] overflow-hidden min-h-[260px]">
                        <div className="absolute inset-0 bg-[#000000] opacity-35 pointer-events-none" />
                        
                        {mapViewMode === 'flat' ? (
                          /* Flat Map interactive design */
                          <div className="w-full h-full relative flex items-center justify-center max-w-[420px]">
                            <svg viewBox="0 0 300 200" className="w-full h-full select-none max-h-[190px]">
                              {/* Main container map lines */}
                              <rect width="300" height="200" fill="none" stroke="#222" strokeWidth="0.5" strokeDasharray="3,3" />
                              <circle cx="150" cy="100" r="85" fill="none" stroke="#1A1A1A" strokeWidth="0.5" strokeDasharray="5,10" />
                              
                              {states.map((state, i) => {
                                const isSelected = selectedState?.name === state.name;
                                return (
                                  <g 
                                    key={state.name}
                                    className="cursor-pointer group"
                                    onClick={() => setSelectedState(state)}
                                  >
                                    {/* Polygonal states block */}
                                    <rect
                                      x={state.center.x - 45}
                                      y={state.center.y - 30}
                                      width="90"
                                      height="60"
                                      rx="8"
                                      fill={isSelected ? 'rgba(212,175,87,0.15)' : 'rgba(26,26,26,0.5)'}
                                      stroke={isSelected ? '#D4AF37' : '#2A2A2A'}
                                      strokeWidth={isSelected ? '2' : '1'}
                                      className="transition-all duration-300 hover:fill-[#D4AF37]/5 hover:stroke-emerald-500"
                                    />
                                    <text
                                      x={state.center.x}
                                      y={state.center.y - 4}
                                      textAnchor="middle"
                                      alignmentBaseline="middle"
                                      fill={isSelected ? '#D4AF37' : '#E0D8D0'}
                                      className="text-[9.5px] font-sans font-semibold tracking-wide transition-colors group-hover:fill-white font-bold"
                                    >
                                      {state.name}
                                    </text>
                                    <text
                                      x={state.center.x}
                                      y={state.center.y + 11}
                                      textAnchor="middle"
                                      alignmentBaseline="middle"
                                      fill="#A09890"
                                      className="text-[7.5px] font-mono tracking-widest uppercase opacity-85"
                                    >
                                      ★ {state.capital.split(' / ')[0]}
                                    </text>
                                  </g>
                                );
                              })}
                            </svg>
                          </div>
                        ) : (
                          /* 360 degree orbital rotating projection */
                          <div className="w-full h-full relative flex items-center justify-center max-w-[400px] min-h-[190px]">
                            {/* Axial core marker */}
                            <div className="absolute text-center flex flex-col items-center justify-center z-10 select-none">
                              <span className="text-3xl animate-bounce">{selectedCountry.flag}</span>
                              <span className="font-mono text-[8px] uppercase tracking-widest text-[#D4AF37] bg-[#0A0A0A] px-2 py-0.5 rounded border border-[#222] mt-1 shadow-md">
                                Core Axis
                              </span>
                            </div>

                            {/* Orbit path guide */}
                            <div className="absolute w-[220px] h-[85px] border border-dashed border-[#D4AF37]/25 rounded-full select-none" />

                            {states.map((state, i) => {
                              const radian = ((rotationAngle + i * (360 / states.length)) * Math.PI) / 180;
                              
                              // Circular motion positioning
                              const x = Math.cos(radian) * 110;
                              const y = Math.sin(radian) * 40;
                              
                              // Custom scaling to resemble pseudo 3D rendering
                              const depthScale = 0.75 + (y / 110); 
                              const opacity = 0.45 + (y / 85);
                              const isFront = y > 0;
                              const isSelected = selectedState?.name === state.name;

                              return (
                                <button
                                  key={state.name}
                                  onClick={() => setSelectedState(state)}
                                  style={{
                                    transform: `translate(${x}px, ${y}px) scale(${depthScale})`,
                                    opacity: opacity,
                                    zIndex: isFront ? 30 : 5,
                                    position: 'absolute'
                                  }}
                                  className={`px-2.5 py-1.5 bg-[#0F0F0F] border text-left rounded-xl transition-all shadow-2xl flex items-center gap-1.5 cursor-pointer ${
                                    isSelected 
                                      ? 'border-emerald-500 bg-emerald-950/20 text-white font-bold ring-1 ring-emerald-500/50' 
                                      : 'border-[#2A2A2A] text-[#E0D8D0] hover:border-[#D4AF37]'
                                  }`}
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 select-none"></div>
                                  <div className="text-left font-sans select-none">
                                    <div className="text-[8.5px] font-bold tracking-tight whitespace-nowrap">{state.name}</div>
                                    <div className="text-[7px] text-[#A09890] font-mono whitespace-nowrap">Cap: {state.capital.split(' / ')[0]}</div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Fact Card overlay depending on active/hovered state */}
                      <div className="bg-[#050505] border border-[#222] p-4.5 rounded-xl flex flex-col justify-between font-sans min-h-[220px] text-left">
                        {selectedState ? (
                          <div className="space-y-3.5 animate-fade-in text-left">
                            <div>
                              <span className="text-[8px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold bg-[#D4AF37]/15 border border-[#D4AF37]/35 px-1.5 py-0.5 rounded">
                                Verified Region Profile
                              </span>
                              <h6 className="text-[14px] font-serif italic text-white font-bold mt-2 flex items-center gap-1.5">
                                📍 {selectedState.name}
                              </h6>
                              <div className="text-[10px] text-[#A09890] mt-0.5 flex items-center gap-1">
                                <span className="font-mono text-[#D4AF37]">Capital:</span>
                                <span className="text-white font-medium bg-[#1A1A1A] px-1.5 py-0.5 rounded border border-[#2A2A2A]">{selectedState.capital}</span>
                              </div>
                            </div>

                            <p className="text-xs text-[#A09890] leading-relaxed bg-[#0A0A0A] p-3 border border-[#111] rounded-lg">
                              {selectedState.fact}
                            </p>

                            <div className="text-[9px] text-[#A09890] font-mono flex items-center gap-1 italic">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Connected with {selectedCountry.name} Core Dynasty
                            </div>
                          </div>
                        ) : (
                          <div className="my-auto text-center py-6 space-y-2 select-none">
                            <div className="text-2xl text-[#D4AF37] animate-pulse">🗺️</div>
                            <h6 className="text-[13px] font-serif italic text-[#E0D8D0] font-bold">Select a State Region</h6>
                            <p className="text-[10px] text-[#807870] font-sans leading-normal max-w-[200px] mx-auto">
                              Click any state region on the interactive map or the rotating 360° projection to unlock deep historical dossiers, regional breakthroughs, and capitals.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Achievements & Famous People (Dedicated Sequential Sections) */}
              <div className="border-t border-[#2A2A2A]/40 pt-4 text-left space-y-5">
                <div className="bg-[#0B0B0B] border border-[#222] p-4 rounded-xl">
                  <h5 className="font-serif italic font-bold text-xs text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 mb-3">
                    🏆 Major Civilizational Achievements
                  </h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedCountry.achievements.map((ach, i) => (
                      <li key={i} className="bg-[#121212] border border-[#1C1C1C] p-3 rounded-lg text-xs text-[#E0D8D0] flex items-start gap-2.5 leading-relaxed">
                        <span className="text-[#D4AF37] text-lg select-none">✦</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dedicated Illustrious historical figures section (Wikipedia dossier) */}
                <div className="bg-[#0B0B0B] border border-[#222] p-4 rounded-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1C1C1C] pb-3">
                    <div>
                      <h5 className="font-serif italic font-bold text-xs text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                        👥 Illustrious Famous People & Historical Figures
                      </h5>
                      <p className="text-[10px] text-[#A09890] italic">Verified biographies, influence parameters, and epochs from digitized libraries</p>
                    </div>
                    <span className="text-[8px] font-mono bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                      Wikipedia Academic Archive
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCountry.famousPeople.map((p, i) => {
                      const wiki = getWikipediaSnippet(p);
                      const initial = p.charAt(0);
                      return (
                        <div key={i} className="flex gap-3 bg-[#111] hover:bg-[#151515] p-3.5 border border-[#1C1C1C] hover:border-[#D4AF37]/20 rounded-xl transition-all duration-200">
                          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center font-serif text-sm font-bold shrink-0 self-start shadow-md">
                            {initial}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-white font-serif tracking-normal">{p}</span>
                              <span className="text-[8px] uppercase font-mono font-bold bg-[#E5C158]/5 text-[#E5C158] border border-[#E5C158]/10 px-1.5 rounded">{wiki.role}</span>
                            </div>
                            <span className="block text-[9px] text-[#D4AF37]/80 font-mono font-medium">{wiki.epoch}</span>
                            <p className="text-xs text-[#A09890] leading-relaxed italic">"{wiki.bio}"</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#2A2A2A] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#A09890] font-mono font-medium">✨ Iconic Leaders:</span>
                  {selectedCountry.leaders.map((lead) => (
                    <span key={lead} className="text-xs font-semibold text-white bg-[#1A1A1A] border border-[#2A2A2A] px-2.5 py-0.5 rounded font-mono">
                      {lead}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Historical Civilization Rise & Fall Demographics & Territory Recharts Graph */}
                  <div className="pt-2 border-t border-[#1C1C1C]">
                    <CivilizationRechartsVisualizer 
                      focusCivilizationId={selectedCountry.id === 'italy' ? 'rome' : selectedCountry.id} 
                      isEmbedded={true} 
                    />
                  </div>

                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(selectedCountry.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-[#1A1A1A] text-[#D4AF37] px-4 py-2 rounded-lg font-bold hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37] transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5" /> Open Wikipedia Source
                  </a>
                  <InlineNotesWidget
                    targetId={selectedCountry.id}
                    targetType="Country"
                    targetName={selectedCountry.name}
                    notes={notes}
                    onAddNote={onAddNote}
                    onDeleteNote={onDeleteNote}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Primary Civilization Demographics & Territory Recharts Visualizer */}
              <div className="md:col-span-3">
                <CivilizationRechartsVisualizer />
              </div>

              <div className="md:col-span-3 pt-2">
                <div className="flex items-center justify-between border-b border-[#222] pb-2 text-left">
                  <h5 className="font-serif italic font-bold text-white text-base flex items-center gap-2">
                    <Flag className="w-4 h-4 text-[#D4AF37]" /> Sovereign Country & Empire Vaults
                  </h5>
                  <span className="text-xs font-mono text-[#A09890]">
                    Select any country for regional geography, 3D provincial hologram & history
                  </span>
                </div>
              </div>

              {filteredCountries.length > 0 ? (
                paginatedCountries.map((country) => (
                  <div
                    key={country.id}
                    onClick={() => setSelectedCountry(country)}
                    className="bg-[#0F0F0F] border border-[#2A2A2A] hover:border-[#D4AF37]/50 p-5 rounded-xl cursor-pointer transition-all text-left flex flex-col justify-between group h-full"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl shrink-0">{country.flag}</span>
                        <div>
                          <h4 className="font-serif italic font-bold text-white group-hover:text-[#D4AF37] tracking-normal text-lg leading-tight">
                            {country.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            {country.continent && (
                              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                                {country.continent}
                              </span>
                            )}
                            {country.culture && (
                              <span className="text-[10px] font-mono text-[#A09890]">
                                • {country.culture}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#A09890] line-clamp-3 font-sans leading-relaxed">{country.summary}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                      <span>Unlock Country Vault</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-[#A09890]">No countries match your search query.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Pagination for Countries */}
        {!selectedCountry && filteredCountries.length > countriesPerPage && (
          <div className="pt-2">
            <PaginationControls
              currentPage={countriesPage}
              totalItems={filteredCountries.length}
              itemsPerPage={countriesPerPage}
              onPageChange={setCountriesPage}
              onItemsPerPageChange={(newSize) => {
                setCountriesPerPage(newSize);
                setCountriesPage(1);
              }}
              itemsPerPageOptions={[18, 36, 60, 120]}
            />
          </div>
        )}
      </div>
      )}

      {/* 4.5 600+ AD IMPERIAL VAULT */}
      {activeTab === 'vault600' && (
        <div className="space-y-6 text-left">
          <div className="bg-[#122C26]/20 border border-[#2A2A2A] rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                <h4 className="font-serif italic font-bold text-white text-lg">Year 600+ AD Imperial Achievements Vault</h4>
              </div>
              <p className="text-xs text-[#A09890] max-w-4xl leading-relaxed font-sans">
                Explore the epochal developments of global civilizational history from the year 600 AD onwards. This vault catalogs a collection of pivotal architectural, astronomical, intellectual, and technical milestones that shaped our modern interconnected world.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-mono bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-1 text-[#D4AF37] rounded-lg font-bold">
                {filteredVault600.length} Records Cataloged
              </span>
            </div>
          </div>

          {/* Top Pagination for Vault600 */}
          {filteredVault600.length > vault600PerPage && (
            <div className="pb-1">
              <PaginationControls
                currentPage={vault600Page}
                totalItems={filteredVault600.length}
                itemsPerPage={vault600PerPage}
                onPageChange={setVault600Page}
                onItemsPerPageChange={(newSize) => {
                  setVault600PerPage(newSize);
                  setVault600Page(1);
                }}
                itemsPerPageOptions={[30, 60, 120, 300]}
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {filteredVault600.length > 0 ? (
              paginatedVault600.map((fact) => (
                <div
                  key={fact.id}
                  className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 relative overflow-hidden group shadow-xl hover:border-[#D4AF37]/40 transition-all flex flex-col md:flex-row gap-6 text-left"
                >
                  {/* Circular Era Year badge */}
                  <div className="flex flex-col items-center justify-center bg-[#071512] border border-[#2A2A2A] text-center p-4 rounded-xl w-full md:w-32 shrink-0 h-32 md:h-auto gap-1">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-[#A09890]">YEAR</span>
                    <span className="text-2xl font-serif italic text-[#D4AF37] font-extrabold">{fact.year}</span>
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">AD</span>
                  </div>

                  {/* Fact Details content */}
                  <div className="flex-1 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-[10px] bg-[#1A1A1A] border border-[#2A2A2A] text-[#D4AF37] px-2 py-0.5 rounded font-mono font-semibold uppercase tracking-wider">
                          {fact.era}
                        </span>
                        <span className="text-xs font-mono text-[#A09890]">
                          🧭 {fact.location}
                        </span>
                      </div>
                      <h4 className="text-xl font-serif italic text-white group-hover:text-[#D4AF37] transition-colors font-bold tracking-tight">
                        {fact.title}
                      </h4>
                    </div>

                    <p className="text-xs text-[#A09890] leading-relaxed font-sans">{fact.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#2A2A2A]/40 pt-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">🌟 Key Persona</span>
                        <p className="text-xs text-white font-serif italic">{fact.famousPersona}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">🏆 Core World Leap</span>
                        <p className="text-xs text-white font-sans font-medium">{fact.worldAchievement}</p>
                      </div>
                    </div>

                    <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A] rounded-xl text-xs space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase">⏳ Universal Civilizational Significance</span>
                      <p className="text-[#A09890] leading-relaxed font-sans">{fact.significance}</p>
                    </div>

                    {fact.culturalLanguage && (
                      <div className="flex items-center gap-2 text-[11px] text-[#A09890] font-mono">
                        <span>🗣 Script / Cultural Language:</span>
                        <span className="text-[#D4AF37]">{fact.culturalLanguage}</span>
                      </div>
                    )}
                  </div>

                  {/* Copy note drawer button */}
                  <div className="self-end md:self-center shrink-0">
                    <button
                      onClick={() => onAddNote(
                        `Chronicle: ${fact.title} (${fact.year} AD)`,
                        `Milestone: ${fact.title}\nYear: ${fact.year} AD\nEra: ${fact.era}\nLocation: ${fact.location}\n\nCore Achievement:\n${fact.worldAchievement}\n\nHistorical significance studies:\n${fact.significance}\n`,
                        'General'
                      )}
                      className="text-xs border border-[#2A2A2A] text-[#A09890] hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#071512] px-4 py-2.5 rounded-xl transition-all font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      📝 Study Fact
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-10 text-center">
                <p className="text-[#A09890]">No historical achievements match your search query in this 600+ AD vault.</p>
              </div>
            )}
          </div>

          {/* Bottom Pagination for Vault600 */}
          {filteredVault600.length > vault600PerPage && (
            <div className="pt-2">
              <PaginationControls
                currentPage={vault600Page}
                totalItems={filteredVault600.length}
                itemsPerPage={vault600PerPage}
                onPageChange={setVault600Page}
                onItemsPerPageChange={(newSize) => {
                  setVault600PerPage(newSize);
                  setVault600Page(1);
                }}
                itemsPerPageOptions={[30, 60, 120, 300]}
              />
            </div>
          )}
        </div>
      )}

      {/* 5. ARTICLES VAULT */}
      {activeTab === 'articles' && (
        <div className="space-y-6 w-full animate-fade-in text-left">
          {/* Sub navigation layout */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap items-center gap-1.5 bg-[#080808] p-1 rounded-xl border border-[#2A2A2A]">
              <button
                onClick={() => { setArticlesTabMode('vault'); setSelectedArticle(null); }}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  articlesTabMode === 'vault'
                    ? 'bg-[#1C1C1D] text-[#D4AF37] border border-[#2A2A2A] shadow-md'
                    : 'text-[#A09890] hover:text-[#E0D8D0]'
                }`}
              >
                📜 Chronicles & Articles
              </button>
              <button
                onClick={() => { setArticlesTabMode('submit'); setSelectedArticle(null); }}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  articlesTabMode === 'submit'
                    ? 'bg-[#1C1C1D] text-[#D4AF37] border border-[#2A2A2A] shadow-md'
                    : 'text-[#A09890] hover:text-[#E0D8D0]'
                }`}
              >
                ✍️ Publish Draft Essay
              </button>
              <button
                onClick={() => { setArticlesTabMode('moderation'); setSelectedArticle(null); }}
                className={`relative flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  articlesTabMode === 'moderation'
                    ? 'bg-[#1C1C1D] text-[#D4AF37] border border-[#2A2A2A] shadow-md'
                    : 'text-[#A09890] hover:text-[#E0D8D0]'
                }`}
              >
                🛡️ Moderator Desk
                {pendingEssays.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white leading-none">
                    {pendingEssays.length}
                  </span>
                )}
              </button>
            </div>

            {articlesTabMode === 'vault' && (
              <span className="text-xs text-[#A09890] font-serif italic">
                {articlesList.length} articles curated inside the archive
              </span>
            )}
          </div>

          {/* Toast Notification */}
          {submittingNoteSuccess && (
            <div className="p-3 bg-[#122C26] border border-[#D4AF37]/30 rounded-xl text-[#86EFAC] text-xs flex items-center gap-2 text-left animate-fade-in shadow-xl">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-sans font-medium">{submittingNoteSuccess}</span>
            </div>
          )}

          {/* TAB 1: ARTICLES VAULT */}
          {articlesTabMode === 'vault' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Reader/List */}
              <div className="md:col-span-8 space-y-6">
                {/* Top Pagination for Articles (when list view) */}
                {!selectedArticle && articlesList.length > articlesPerPage && (
                  <div className="pb-1">
                    <PaginationControls
                      currentPage={articlesPage}
                      totalItems={articlesList.length}
                      itemsPerPage={articlesPerPage}
                      onPageChange={setArticlesPage}
                      onItemsPerPageChange={(newSize) => {
                        setArticlesPerPage(newSize);
                        setArticlesPage(1);
                      }}
                      itemsPerPageOptions={[12, 24, 48, 96]}
                    />
                  </div>
                )}

                {selectedArticle ? (
                  <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 relative animate-fade-in space-y-4 text-left">
                    {/* Deep Dive Sequential Navigation Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222] pb-3.5 mb-2">
                      <button
                        onClick={handlePrevArticleDive}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] transition-all cursor-pointer"
                        title="Previous Article in Archive"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Prev Article</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-[#A09890] bg-[#0A0A0A] border border-[#222] px-2.5 py-1 rounded-md">
                          Article <strong className="text-white">{currentArticleIndex + 1}</strong> of <strong className="text-white">{articlesList.length}</strong>
                        </span>
                        <span className="text-[10px] font-mono text-[#D4AF37] hidden sm:inline">⚡ Sequential Deep Dive</span>
                      </div>

                      <button
                        onClick={handleNextArticleDive}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] transition-all cursor-pointer"
                        title="Next Article in Archive"
                      >
                        <span>Next Article</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-end gap-2 pb-1">
                      <button
                        onClick={() => onToggleBookmark?.(selectedArticle.id, 'article', selectedArticle.title, selectedArticle.category)}
                        className={`text-xs font-semibold border bg-[#0A0A0A] px-2.5 py-1.5 rounded flex items-center gap-1 transition-all cursor-pointer ${
                          bookmarks?.some(b => b.targetId === selectedArticle.id && b.type === 'article')
                            ? 'text-yellow-400 border-yellow-500/50 bg-yellow-950/20'
                            : 'text-[#E0D8D0] hover:text-[#D4AF37] border-[#2A2A2A]'
                        }`}
                      >
                        <span>{bookmarks?.some(b => b.targetId === selectedArticle.id && b.type === 'article') ? '★ Saved' : '☆ Bookmark'}</span>
                      </button>
                      <a
                        href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(selectedArticle.title.replace(/[^\w\s]/gi, ''))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#D4AF37] hover:text-white border border-[#D4AF37]/50 px-2.5 py-1.5 rounded bg-[#1A1813] cursor-pointer inline-flex items-center gap-1"
                        title={`Search "${selectedArticle.title}" on Wikipedia`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Wikipedia ↗
                      </a>
                      <button
                        onClick={() => setSelectedArticle(null)}
                        className="text-xs font-semibold border bg-[#0A0A0A] text-[#E0D8D0] border-[#2A2A2A] px-2.5 py-1.5 rounded hover:text-[#D4AF37] cursor-pointer"
                      >
                        Close Article
                      </button>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[10px] bg-[#1A1A1A] border border-[#2A2A2A] text-[#D4AF37] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                          {selectedArticle.category}
                        </span>
                        <span className="text-xs font-mono text-[#D4AF37]">
                          • {selectedArticle.readTime}
                        </span>
                      </div>
                      <h4 className="text-2xl font-serif italic text-white tracking-normal leading-snug">{selectedArticle.title}</h4>
                      <p className="text-xs text-[#A09890]">By {selectedArticle.author} | Published {selectedArticle.date}</p>
                    </div>

                    <div className="border-t border-[#2A2A2A] pt-4 text-sm text-[#D8CDBC] whitespace-pre-line leading-relaxed font-sans space-y-3 text-left">
                      {selectedArticle.content}
                    </div>

                    <div className="border-t border-[#2A2A2A] pt-4">
                      <InlineNotesWidget
                        targetId={selectedArticle.id}
                        targetType="Article"
                        targetName={selectedArticle.title}
                        notes={notes}
                        onAddNote={onAddNote}
                        onDeleteNote={onDeleteNote}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {paginatedArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => setSelectedArticle(art)}
                        className="bg-[#0F0F0F] border border-[#2A2A2A] hover:border-[#D4AF37]/50 p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between group text-left"
                      >
                        <div className="space-y-1.5 text-left">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] bg-[#151515] text-[#D4AF37] border border-[#202020] px-1.5 rounded font-mono font-bold tracking-wider0 uppercase">
                              {art.category}
                            </span>
                            <span className="text-[11px] font-mono text-[#A09890]">
                              {art.readTime}
                            </span>
                          </div>
                          <h4 className="font-serif italic font-bold text-white group-hover:text-[#D4AF37] tracking-normal text-lg">
                            {art.title}
                          </h4>
                          <p className="text-xs text-[#A09890]">
                            By {art.author} • {art.date}
                          </p>
                          <p className="text-xs text-[#A09890] pt-2 line-clamp-3 leading-relaxed font-sans">
                            {art.preview}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                          <span>Read complete chronicle</span>
                          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    ))}

                    {/* Bottom Pagination for Articles */}
                    {articlesList.length > articlesPerPage && (
                      <div className="pt-2">
                        <PaginationControls
                          currentPage={articlesPage}
                          totalItems={articlesList.length}
                          itemsPerPage={articlesPerPage}
                          onPageChange={setArticlesPage}
                          onItemsPerPageChange={(newSize) => {
                            setArticlesPerPage(newSize);
                            setArticlesPage(1);
                          }}
                          itemsPerPageOptions={[12, 24, 48, 96]}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: AI Custom Article Scribe Panel */}
              <div className="md:col-span-4">
                <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-5 space-y-4 text-left">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                    <h4 className="font-serif italic font-bold text-[#D4AF37] text-sm tracking-tight">AI Chronicle Scribe</h4>
                  </div>
                  <p className="text-xs text-[#A09890] leading-relaxed font-sans">
                    Unlock custom articles instantly! Provide any custom topic (e.g. "Bronze Age Collapse", "Ottoman Siege lines") and Gemini will write a historical dispatch.
                  </p>

                  {generationError && (
                    <div className="p-3 bg-[#240F11] border border-red-900/40 rounded-xl text-red-400 text-xs flex items-start gap-2 text-left">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{generationError}</span>
                    </div>
                  )}

                  <form onSubmit={handleComposeArticle} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-[#A09890] uppercase tracking-widest font-mono font-bold">Inquiry Topic</label>
                      <input
                        type="text"
                        required
                        disabled={isGeneratingArticle}
                        value={customArticleTopic}
                        onChange={(e) => setCustomArticleTopic(e.target.value)}
                        placeholder="e.g. Spartan battle tactics"
                        className="w-full p-2.5 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-[#A09890] uppercase tracking-widest font-mono font-bold">Historical Era Context</label>
                      <select
                        disabled={isGeneratingArticle}
                        value={customArticleEra}
                        onChange={(e) => setCustomArticleEra(e.target.value)}
                        className="w-full p-2.5 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                      >
                        <option value="Ancient Egypt / India">Ancient Egypt & India</option>
                        <option value="Classical Era">Classical Greek & Roman</option>
                        <option value="Medieval Period">Medieval Period</option>
                        <option value="Early Modern">Renaissance & Revolutions</option>
                        <option value="Modern Era">Modern History World Wars</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isGeneratingArticle}
                      className="w-full py-2.5 bg-[#D4AF37] text-black disabled:bg-[#1E1E1E] disabled:text-[#A09890] text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-lg border border-[#D4AF37] hover:bg-black hover:text-[#D4AF37]"
                    >
                      {isGeneratingArticle ? (
                        <>
                          <Cpu className="w-3.5 h-3.5 animate-spin" />
                          <span>Composing Chronicle...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Draft AI Article</span>
                        </>
                      )
                      }
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WRITE / SUBMIT ESSAY */}
          {articlesTabMode === 'submit' && (
            <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 space-y-6 max-w-4xl mx-auto animate-fade-in text-left">
              <div className="border-b border-[#2A2A2A] pb-4">
                <h4 className="font-serif italic font-bold text-white text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#D4AF37]" /> Publish Scholarly Research
                </h4>
                <p className="text-xs text-[#A09890] mt-1">
                  Draft an educational historical essay, chronicling a major culture, event, or dynamic epoch. Once approved by history desk moderators, it will be added dynamically to the Articles Vault catalog.
                </p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const title = formData.get('title') as string;
                const author = formData.get('author') as string;
                const category = formData.get('category') as string;
                const content = formData.get('content') as string;
                const tagsStr = formData.get('tags') as string;
                const tagsList = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];

                handlePublishSubmission(title, author, category, tagsList, content);
                e.currentTarget.reset();
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A09890] uppercase tracking-widest font-mono font-bold block">Essay Title *</label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. The Bronze Age Collapse: Fire and Copper"
                      className="w-full p-2.5 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A09890] uppercase tracking-widest font-mono font-bold block">Author Name / Scholar Pen Name</label>
                    <input
                      type="text"
                      name="author"
                      placeholder="e.g. Professor Herodotus"
                      className="w-full p-2.5 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A09890] uppercase tracking-widest font-mono font-bold block">Target Era Categorization</label>
                    <select
                      name="category"
                      className="w-full p-2.5 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    >
                      <option value="Ancient Egypt / India">Ancient Egypt / India</option>
                      <option value="Classical Era">Classical Greek & Roman</option>
                      <option value="Medieval Period">Medieval Period</option>
                      <option value="Early Modern">Early Modern History</option>
                      <option value="Modern Era">Modern History & World Wars</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A09890] uppercase tracking-widest font-mono font-bold block">Index Tags (Comma-separated)</label>
                    <input
                      type="text"
                      name="tags"
                      placeholder="e.g. Bronze Age, Collapse, Mediterranean, Mycenaean"
                      className="w-full p-2.5 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#A09890] uppercase tracking-widest font-mono font-bold block">Complete Historical Narrative * (Minimum 150 words recommended)</label>
                  <textarea
                    name="content"
                    required
                    rows={12}
                    placeholder="Provide your complete well-researched essay/article here. Feel free to use structured paragraphs to organize sections such as core context, causes/dynasties, and civilizational legacy..."
                    className="w-full p-3.5 text-xs font-sans bg-[#0A0A0A] text-[#D8CDBC] border border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] leading-relaxed"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#D4AF37] text-black hover:bg-black hover:text-[#D4AF37] border border-[#D4AF37] font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-lg"
                  >
                    🚀 Submit for Peer Moderation
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: SCHOLARS REVIEW DESK (MODERATION) */}
          {articlesTabMode === 'moderation' && (
            <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 text-left space-y-6 animate-fade-in max-w-4xl mx-auto">
              <div className="flex items-center gap-2.5 border-b border-[#2A2A2A] pb-4">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <h4 className="font-serif italic font-bold text-white text-lg">Academic Review desk</h4>
                  <p className="text-xs text-[#A09890]">Review, polish or approve pending community historical essays to include them in the general Chronicles Vault list.</p>
                </div>
              </div>

              {pendingEssays.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <UserCheck className="w-12 h-12 text-emerald-500/50 mx-auto animate-bounce" />
                  <h5 className="font-serif italic font-bold text-white text-base">All Queue Cleared</h5>
                  <p className="text-xs text-[#A09890] max-w-sm mx-auto">
                    We currently have no pending community contributions needing moderation desk evaluation. Feel free to write and draft your own historical essay under the "Publish Draft Essay" sub-tab!
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={() => setArticlesTabMode('submit')}
                      className="text-[11px] bg-[#1A1A1A] text-[#D4AF37] border border-[#2A2A2A] rounded-lg px-4 py-2 hover:bg-[#D4AF37] hover:text-black transition-all"
                    >
                      ✍️ Submit New Essay
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {pendingEssays.map((essay) => (
                    <div key={essay.id} className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1C1C1C] pb-3">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] bg-[#161616] border border-[#222] px-2 py-0.5 rounded font-bold uppercase">
                            {essay.category}
                          </span>
                          <h5 className="text-lg font-serif italic font-bold text-white mt-1.5">{essay.title}</h5>
                          <p className="text-xs text-[#A09890]">
                            Submitted by <span className="font-bold text-[#E5D5C0]">{essay.author}</span> • {essay.date} • {essay.readTime}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveSubmission(essay.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            ✓ Approve & Publish
                          </button>
                          <button
                            onClick={() => handleRejectSubmission(essay.id)}
                            className="bg-[#240F11] hover:bg-red-900/40 text-red-400 border border-red-950/40 font-semibold text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                          >
                            ✕ Archive
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-[#D8CDBC] whitespace-pre-line leading-relaxed font-sans max-h-72 overflow-y-auto p-4 bg-[#050505] rounded-xl border border-[#161616]">
                        {essay.content}
                      </div>

                      {essay.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] text-[#A09890] font-mono">Index Meta Tags:</span>
                          {essay.tags.map(tag => (
                            <span key={tag} className="text-[9px] text-[#A09890] bg-[#161616] border border-[#222] px-2 py-0.5 rounded-full font-mono">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
