export interface Monarch {
  id: string;
  name: string;
  title: string;
  region: 'European' | 'Indian' | 'Greek' | 'Roman' | 'Egyptian' | 'Other';
  reign: string;
  biography: string;
  keyAchievements: string[];
  legacy: string;
  imageUrl?: string;
}

export interface HistoricalFigure {
  id: string;
  name: string;
  role: string;
  era: string;
  biography: string;
  contributions: string[];
  birthDeath: string;
  category: 'Scientist' | 'Philosopher' | 'Artist' | 'Explorer' | 'Warrior' | 'Writer' | 'Other';
  imageUrl?: string;
  quote?: string;
}

export interface SpotlightFigure {
  id: string;
  name: string;
  title: string;
  era: string;
  period: string;
  category: 'King' | 'Queen' | 'Leader' | 'Philosopher' | 'Scientist' | 'Polymath' | 'Warrior';
  region: string;
  portraitUrl: string;
  quote: string;
  quoteContext?: string;
  biography: string;
  keyAchievements: {
    title: string;
    description: string;
  }[];
  anecdotes: {
    title: string;
    story: string;
    significance?: string;
  }[];
  fastFacts: {
    label: string;
    value: string;
  }[];
  legacySummary: string;
  vaultTarget: {
    tab: 'figures' | 'monarchs' | 'leaders';
    id: string;
    name: string;
  };
}

export interface Leader {
  id: string;
  name: string;
  country: string;
  period: string;
  achievements: string[];
  impact: string;
  biography: string;
  impactScale?: 'Global' | 'Regional' | 'National';
}

export interface CountryDetail {
  id: string;
  name: string;
  culture: string;
  summary: string;
  revolution: string;
  worldImpact: string;
  geography: string;
  leaders: string[];
  flag?: string;
  regionsHighlighted?: string[]; // Code for highlighting SVG map
  language: string;
  famousPeople: string[];
  achievements: string[];
  majorReligions?: string;
  nationalEpics?: string;
  populationData?: { century: string; populationInMillions: number }[];
  modernCurrency?: { name: string; symbol: string; code: string; backing: string; valueUSD: string; history: string };
  oldCurrency?: { name: string; era: string; material: string; details: string; significance: string };
  currentLeaders?: { name: string; title: string; term: string; policy: string }[];
  hatedPeople?: { name: string; title: string; reason: string; perspective: string }[];
  population?: string;
  sizeSqKm?: string;
  continent?: string;
  economySize?: string;
  worldPlaceRank?: string;
  armyPosition?: string;
  worldImpactScale?: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  date: string;
  year: number; // For sorting and timeline plotting
  era: 'Ancient' | 'Classical' | 'Medieval' | 'Early Modern' | 'Modern';
  description: string;
  impact: string;
  participants: string[];
  category?: 'War' | 'Science & Innovation' | 'Political Milestone' | 'Cultural Shift' | 'Monumental Creation';
}

export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  preview: string;
  content: string;
  readTime: string;
  tags: string[];
}

export interface CommunitySubmission {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  preview: string;
  content: string;
  readTime: string;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  format?: 'mcq' | 'tf' | 'image_id';
  imageUrl?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: QuizQuestion[];
  topic?: 'ancient' | 'modern' | 'regions' | 'figures' | 'events' | 'other';
  subTopic?: string;
  formatType?: 'mcq' | 'tf' | 'mixed';
  region?: string;
}

export interface UserNote {
  id: string;
  title: string;
  targetType: 'Monarch' | 'Figure' | 'Country' | 'Event' | 'General' | 'Battle' | 'Paper' | 'Ideology' | 'Monument' | 'Source' | 'Article';
  targetId?: string;
  targetTitle?: string;
  tags?: string[];
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Bookmark {
  id: string;
  type: 'article' | 'figure' | 'event' | 'ruler' | 'country' | 'philosopher' | 'fact' | 'battle' | 'paper' | 'ideology' | 'monument' | 'artifact' | 'source';
  targetId: string;
  title: string;
  subtitle?: string;
  bookmarkedAt: string;
}

export interface ArtifactImage {
  url: string;
  caption: string;
  angle: string;
  credit?: string;
}

export interface ArtifactView360Frame {
  angleDeg: number;
  label: string;
  imageUrl: string;
  annotation: string;
}

export interface DailyArtifact {
  id: string;
  name: string;
  subtitle: string;
  category: 'Roman Coin' | 'Egyptian Hieroglyph' | 'Medieval Armor' | 'Ancient Sculpture' | 'Inscribed Stele' | 'Scientific Instrument' | 'Royal Relic & Regalia' | 'Sacred Manuscript';
  era: string;
  periodYear: string;
  origin: string;
  region: string;
  dateDiscovered: string;
  discoveredBy?: string;
  currentLocation: {
    museum: string;
    city: string;
    country: string;
    galleryRoom: string;
    accessionNumber: string;
    websiteUrl?: string;
    visitingGuide: string;
  };
  dimensions: string;
  weight?: string;
  material: string;
  craftsmanshipTechnique: string;
  biography: string;
  historicalContext: string;
  significance: string;
  keyFeatures: string[];
  images: ArtifactImage[];
  views360: ArtifactView360Frame[];
  funFacts: string[];
  relatedSearchTerms: string[];
}

export interface HistoricalBattle {
  id: string;
  name: string;
  year: number;
  dateStr: string;
  era: 'Ancient' | 'Classical' | 'Medieval' | 'Early Modern' | '19th Century' | 'World War I' | 'World War II' | 'Cold War & Modern';
  war: string;
  location: string;
  region: 'Middle East' | 'Europe' | 'East Asia' | 'South Asia' | 'Americas' | 'Africa' | 'Global / Naval' | 'Central Asia';
  combatantA: string;
  combatantB: string;
  commanderA: string;
  commanderB: string;
  outcome: string;
  victor: 'A' | 'B' | 'Inconclusive';
  forcesA?: string;
  forcesB?: string;
  casualtiesA?: string;
  casualtiesB?: string;
  significance: string;
  tacticalSummary: string;
  wikipediaTitle: string;
  wikipediaUrl: string;
  coordinates?: { lat: number; lng: number };
  keyWeapons?: string[];
  tags: string[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journalOrPublisher: string;
  category: 'Historiography & Method' | 'Ancient & Classical Civilizations' | 'Medieval & Feudal Studies' | 'Early Modern & Renaissance' | 'Imperialism & Colonialism' | 'Military History & Strategy' | 'Economic & Social History' | 'Science, Tech & Medicine' | 'Global & Diplomatic History' | 'Archaeology & Material Culture';
  era: 'Ancient' | 'Classical' | 'Medieval' | 'Early Modern' | '19th Century' | '20th Century' | 'Global Longue-Durée';
  abstract: string;
  keyFindings: string[];
  historicalThesis: string;
  methodology: string;
  doiOrCitation: string;
  openAccessUrl?: string;
  wikipediaTopicUrl?: string;
  pageCount: number;
  tags: string[];
  peerReviewed: boolean;
}

export interface Artifact {
  id: string;
  name: string;
  origin: string;
  period: string;
  description: string;
  imageUrl: string;
}

export interface HistoryFact600 {
  id: string;
  year: number;
  era: string;
  title: string;
  location: string;
  description: string;
  famousPersona: string;
  worldAchievement: string;
  significance: string;
  culturalLanguage?: string;
}

// Wikipedia-style granular encyclopedia types
export interface WikipediaCivilization {
  id: string;
  name: string;
  period: string;
  capital: string;
  government: string;
  languages: string[];
  achievements: string[];
  summary: string;
  deepDetails: string;
}

export interface WikipediaKing {
  id: string;
  name: string;
  title: string;
  dynasty: string;
  reign: string;
  region: string;
  keyAchievement: string;
  wikipediaBio: string;
}

export interface WikipediaWar {
  id: string;
  title: string;
  date: string;
  belligerents: string;
  outcome: string;
  casualtyEstimate: string;
  significance: string;
  description: string;
}

export interface WikipediaLeader {
  id: string;
  name: string;
  role: string;
  era: string;
  countryOfOrigin: string;
  impactParagraph: string;
  famousQuote?: string;
  achievements: string[];
}

export interface WikipediaCountry {
  id: string;
  name: string;
  flag: string;
  language: string;
  majorReligions: string;
  nationalEpics: string;
  summary: string;
  geography: string;
  famousPeople: string[];
  achievements: string[];
  populationData?: { century: string; populationInMillions: number }[];
  modernCurrency?: { name: string; symbol: string; code: string; backing: string; valueUSD: string; history: string };
  oldCurrency?: { name: string; era: string; material: string; details: string; significance: string };
  currentLeaders?: { name: string; title: string; term: string; policy: string }[];
  hatedPeople?: { name: string; title: string; reason: string; perspective: string }[];
}

export interface WikipediaPhoto {
  id: string;
  name: string;
  origin: string;
  period: string;
  description: string;
  imageUrl: string;
}

export interface PhilosopherIdea {
  title: string;
  description: string;
}

export interface Philosopher {
  id: string;
  name: string;
  bornDiet: string;
  era: string;
  school: string;
  region: string;
  biography: string;
  famousBooks: string[];
  quotes: string[];
  ideas: string[];
  // Rich extension fields
  deathAndReason?: string;
  detailedIdeas?: PhilosopherIdea[];
  isSynced?: boolean;
}

export interface HistoricalFactLink {
  label: string;
  targetTab: 'map' | 'timeline' | 'vaults' | 'quizzes' | 'gallery' | 'notes' | 'scholar' | 'encyclopedia' | 'paths' | 'philosophers' | 'compare' | 'facts' | 'artifacts' | 'monuments' | 'decrees' | 'battles' | 'papers' | 'ideologies' | 'on-this-day';
  subTab?: string;
  entityId?: string;
  type?: 'ruler' | 'country' | 'figure' | 'event' | 'philosopher' | 'article' | 'fact';
}

export interface HistoricalFact {
  id: string;
  title: string;
  headline: string;
  fact: string;
  explanation: string;
  era: 'Ancient' | 'Classical' | 'Medieval' | 'Renaissance' | 'Early Modern' | 'Modern' | 'Contemporary';
  category: 'Science & Invention' | 'Monarchs & Rulers' | 'Warfare & Tactics' | 'Culture & Society' | 'Philosophy & Ideas' | 'Architecture & Wonders' | 'Curiosities & Myths';
  cultureRegion: 'African' | 'East Asian' | 'Middle Eastern' | 'South Asian' | 'Greco-Roman' | 'European' | 'Mesoamerican & South American' | 'Americas' | 'Global & Space';
  notableFigure?: string;
  yearOrPeriod: string;
  imageUrl?: string;
  tags: string[];
  links: HistoricalFactLink[];
  quote?: { text: string; author: string };
  funFactExtra?: string;
}

export type IdeologyCategory = 
  | 'Anarchism & Libertarianism'
  | 'Socialism, Communism & Marxism'
  | 'Liberalism & Progressivism'
  | 'Conservatism & Traditionalism'
  | 'Nationalism & Identity-Based'
  | 'Authoritarianism, Fascism & Totalitarianism'
  | 'Environmental & Ecocentric'
  | 'Religious & Spiritual Governance'
  | 'Economic & Structural Systems'
  | 'Modern, Tech-Centric & Niche';

export interface IdeologyFigureRole {
  name: string;
  role: string;
  contribution: string;
}

export interface PoliticalIdeology {
  id: string;
  name: string;
  category: IdeologyCategory;
  tagline: string;
  definition: string;
  historicalOrigins: string;
  foundingFather?: string;
  foundingFatherTitle?: string;
  keyFigures?: IdeologyFigureRole[];
  coreTenets: string[];
  keyThinkers: string[];
  realWorldExamples: {
    title: string;
    periodOrLocation: string;
    description: string;
  }[];
  economicModel: string;
  viewOfState: string;
  criticisms: string[];
  keyTextsOrManifestos: string[];
  spectrumPlacement: string;
  iconSymbol?: string;
}

export interface WorldMonumentOrArtifact {
  id: string;
  name: string;
  nativeOrAlternateName?: string;
  category: 'Famous Building' | 'Ancient Wonder' | 'Sacred Temple / Cathedral' | 'Palace & Fortress' | 'Historical Artifact' | 'Monument & Tower' | 'Archaeological City' | 'Artifact & Relic' | 'Temple & Sacred Site' | 'Mausoleum & Tomb' | 'Cathedral & Basilica' | string;
  location: string;
  country: string;
  region: 'Asia' | 'Europe' | 'Middle East' | 'Africa' | 'Americas' | 'Oceania';
  era: string;
  yearBuilt: string;
  numericYear: number; // For chronological sorting (-2560 for BCE, etc.)
  architectOrCreator: string;
  architecturalStyle: string;
  dimensionsAndHeight: string;
  materialsUsed: string;
  historyAndBackground: string;
  architecturalMarvels: string;
  modernStatusAndSignificance: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  tags: string[];
  keyFacts: string[];
  unescoStatus?: string;
  wikipediaUrl?: string;
}

// ==========================================
// CURATED TOPIC HUB & FILTER TYPES
// ==========================================
export type HistoricalPeriod = 
  | 'all'
  | 'ancient'        // c. 3000 BC – 500 BC
  | 'classical'      // c. 500 BC – 500 AD
  | 'medieval'       // c. 500 AD – 1500 AD
  | 'early_modern'   // 1500 – 1800
  | '19th_century'   // 1800 – 1914
  | 'ww1_interwar'   // 1914 – 1938
  | 'ww2'            // 1939 – 1945
  | 'cold_war_modern';// 1946 – Present

export type HistoricalRegion = 
  | 'all'
  | 'mediterranean_rome'
  | 'middle_east_egypt'
  | 'europe'
  | 'east_asia'
  | 'south_asia'
  | 'americas'
  | 'africa'
  | 'global';

export type HistoricalTheme = 
  | 'all'
  | 'ancient_rome'
  | 'ww2'
  | 'greatest_monarchs'
  | 'battles_tactics'
  | 'philosophy_ideas'
  | 'relics_monuments'
  | 'ideology_revolutions'
  | 'science_enlightenment';

export interface CuratedTopicPreset {
  id: string;
  label: string;
  badge: string;
  description: string;
  iconName: string;
  period: HistoricalPeriod;
  region: HistoricalRegion;
  theme: HistoricalTheme;
  searchKeywords: string[];
}

export interface CuratedContentBundle {
  presetId?: string;
  title: string;
  epochLabel: string;
  regionLabel: string;
  themeLabel: string;
  curatorialBriefing: string;
  historicalSignificance: string;
  keyPillars: string[];
  figuresAndMonarchs: Array<{
    id: string;
    name: string;
    title: string;
    roleOrEra: string;
    description: string;
    achievements: string[];
    type: 'monarch' | 'figure' | 'philosopher';
    originRegion: string;
    reignOrDates?: string;
  }>;
  events: Array<{
    id: string;
    year: string | number;
    title: string;
    description: string;
    impact: string;
    category: string;
  }>;
  battles: Array<{
    id: string;
    name: string;
    year: number;
    war: string;
    location: string;
    commanders: string;
    outcome: string;
    tacticalSummary: string;
  }>;
  artifactsAndMonuments: Array<{
    id: string;
    name: string;
    category: string;
    periodYear: string;
    locationOrOrigin: string;
    summary: string;
    keyDetail: string;
    type: 'artifact' | 'monument';
  }>;
  quizzes: Quiz[];
  articles: Array<{
    id: string;
    title: string;
    authorsOrSource: string;
    category: string;
    summary: string;
    keyInsights: string[];
    readTimeMinutes: number;
    type: 'scholarly_paper' | 'encyclopedia_article' | 'primary_source';
    citationOrLink?: string;
  }>;
}


