import { PoliticalIdeology, IdeologyCategory } from '../../types';
import { ANARCHISM_LIBERTARIANISM_IDEOLOGIES } from './anarchismLibertarianism';
import { SOCIALISM_MARXISM_IDEOLOGIES } from './socialismMarxism';
import { LIBERALISM_PROGRESSIVISM_IDEOLOGIES } from './liberalismProgressivism';
import { CONSERVATISM_TRADITIONALISM_IDEOLOGIES } from './conservatismTraditionalism';
import { NATIONALISM_IDENTITY_IDEOLOGIES } from './nationalismIdentity';
import { AUTHORITARIANISM_FASCISM_IDEOLOGIES } from './authoritarianismFascism';
import { ENVIRONMENTAL_ECO_IDEOLOGIES } from './environmentalEco';
import { RELIGIOUS_GOVERNANCE_IDEOLOGIES } from './religiousGovernance';
import { ECONOMIC_STRUCTURAL_IDEOLOGIES } from './economicStructural';
import { MODERN_TECH_NICHE_IDEOLOGIES } from './modernTechNiche';
import { getEnrichedFoundingData } from './foundingFiguresData';

const RAW_POLITICAL_IDEOLOGIES: PoliticalIdeology[] = [
  ...ANARCHISM_LIBERTARIANISM_IDEOLOGIES,
  ...SOCIALISM_MARXISM_IDEOLOGIES,
  ...LIBERALISM_PROGRESSIVISM_IDEOLOGIES,
  ...CONSERVATISM_TRADITIONALISM_IDEOLOGIES,
  ...NATIONALISM_IDENTITY_IDEOLOGIES,
  ...AUTHORITARIANISM_FASCISM_IDEOLOGIES,
  ...ENVIRONMENTAL_ECO_IDEOLOGIES,
  ...RELIGIOUS_GOVERNANCE_IDEOLOGIES,
  ...ECONOMIC_STRUCTURAL_IDEOLOGIES,
  ...MODERN_TECH_NICHE_IDEOLOGIES,
];

export const ALL_POLITICAL_IDEOLOGIES: PoliticalIdeology[] = RAW_POLITICAL_IDEOLOGIES.map(item => {
  const enriched = getEnrichedFoundingData(item.id, item.name, item.category, item.keyThinkers);
  return {
    ...item,
    foundingFather: item.foundingFather || enriched.foundingFather,
    foundingFatherTitle: item.foundingFatherTitle || enriched.foundingFatherTitle,
    keyFigures: item.keyFigures || enriched.keyFigures
  };
});

export const IDEOLOGY_CATEGORIES: { category: IdeologyCategory; count: number; icon: string; description: string }[] = [
  {
    category: 'Anarchism & Libertarianism',
    count: ANARCHISM_LIBERTARIANISM_IDEOLOGIES.length,
    icon: '🏴⚖️',
    description: 'Abolition or minimization of state coercion, absolute individual liberty, voluntary association, and decentralized self-governance.'
  },
  {
    category: 'Socialism, Communism & Marxism',
    count: SOCIALISM_MARXISM_IDEOLOGIES.length,
    icon: '🚩⚒️',
    description: 'Collective or social ownership of the means of production, anti-capitalism, workers\' democracy, and wealth equality.'
  },
  {
    category: 'Liberalism & Progressivism',
    count: LIBERALISM_PROGRESSIVISM_IDEOLOGIES.length,
    icon: '🗽🕊️',
    description: 'Individual liberty, consent of the governed, rule of law, market freedom, social reform, and human rights.'
  },
  {
    category: 'Conservatism & Traditionalism',
    count: CONSERVATISM_TRADITIONALISM_IDEOLOGIES.length,
    icon: '🏛️📜',
    description: 'Preservation of established social orders, traditional morals, organic institutions, prudence, and cultural heritage.'
  },
  {
    category: 'Nationalism & Identity-Based',
    count: NATIONALISM_IDENTITY_IDEOLOGIES.length,
    icon: '🚩🗺️',
    description: 'National sovereignty, self-determination, ethnic/civic solidarity, anti-colonialism, and collective identity.'
  },
  {
    category: 'Authoritarianism, Fascism & Totalitarianism',
    count: AUTHORITARIANISM_FASCISM_IDEOLOGIES.length,
    icon: '🏛️🔒',
    description: 'Centralized state authority, dictatorial power, regimentation of society, martial control, and autocratic hierarchy.'
  },
  {
    category: 'Environmental & Ecocentric',
    count: ENVIRONMENTAL_ECO_IDEOLOGIES.length,
    icon: '🌱🌎',
    description: 'Ecological preservation, climate restoration, rights of nature, sustainable economics, and biocentric harmony.'
  },
  {
    category: 'Religious & Spiritual Governance',
    count: RELIGIOUS_GOVERNANCE_IDEOLOGIES.length,
    icon: '✝️☪️',
    description: 'Governance guided by spiritual morality, divine scripture, theological compassion, or canonical law.'
  },
  {
    category: 'Economic & Structural Systems',
    count: ECONOMIC_STRUCTURAL_IDEOLOGIES.length,
    icon: '📈💼',
    description: 'Macroeconomic frameworks organizing property, trade, land, state planning, capital allocation, and social class.'
  },
  {
    category: 'Modern, Tech-Centric & Niche',
    count: MODERN_TECH_NICHE_IDEOLOGIES.length,
    icon: '🧠⚡',
    description: 'Emergent paradigms shaped by artificial intelligence, biotechnology, accelerationism, cybernetics, and avant-garde critique.'
  }
];

export function getIdeologiesByCategory(category: IdeologyCategory): PoliticalIdeology[] {
  return ALL_POLITICAL_IDEOLOGIES.filter(item => item.category === category);
}

export function searchIdeologies(query: string): PoliticalIdeology[] {
  if (!query.trim()) return ALL_POLITICAL_IDEOLOGIES;
  const q = query.toLowerCase().trim();
  return ALL_POLITICAL_IDEOLOGIES.filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.tagline.toLowerCase().includes(q) ||
    item.definition.toLowerCase().includes(q) ||
    item.keyThinkers.some(t => t.toLowerCase().includes(q)) ||
    item.category.toLowerCase().includes(q) ||
    item.coreTenets.some(c => c.toLowerCase().includes(q)) ||
    item.realWorldExamples.some(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
  );
}
