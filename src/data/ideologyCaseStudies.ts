export interface IdeologyCaseStudy {
  id: string;
  title: string;
  periodOrLocation: string;
  ideologyName: string;
  ideologyId: string;
  overview: string;
  historicalContext: string;
  keyPolicies: {
    policyName: string;
    description: string;
  }[];
  howItWorkedInDailyLife: string;
  outcomesAndResults: {
    successes: string[];
    challengesOrCriticisms: string[];
  };
  famousFiguresInvolved: string[];
  legacyAndRelevance: string;
  simpleAnalogy: string;
}

export const IDEOLOGY_CASE_STUDIES_REGISTRY: Record<string, IdeologyCaseStudy> = {
  'nordic-model-scandinavia': {
    id: 'nordic-model-scandinavia',
    title: 'The Nordic Model in Post-War Scandinavia',
    periodOrLocation: '1945–Present • Sweden, Norway, Denmark, Finland',
    ideologyName: 'Social Democracy',
    ideologyId: 'social-democracy',
    overview: 'The Nordic Model combines a free-market capitalist economy with a comprehensive universal welfare state, high union density, and strong collective bargaining.',
    historicalContext: 'Following the Great Depression and World War II, Scandinavian nations sought a "Third Way" between unrestrained American-style capitalism and Soviet-style state socialism. Starting with the 1938 Saltsjöbaden Agreement in Sweden, labor unions and employer federations negotiated peaceful industrial harmony.',
    keyPolicies: [
      {
        policyName: 'Universal Healthcare & Free Higher Education',
        description: 'Healthcare, childcare, and universities are publicly funded through progressive income and value-added taxes (VAT).'
      },
      {
        policyName: 'Flexicurity (Denmark)',
        description: 'Employers have flexibility to hire and lay off workers easily, but the state provides generous unemployment stipends and retraining programs.'
      },
      {
        policyName: 'Trilateral Wage Bargaining',
        description: 'National trade unions, employer associations, and government meet annually to set wage guidelines that prevent inflationary spirals while maintaining high worker living standards.'
      }
    ],
    howItWorkedInDailyLife: 'An average Scandinavian citizen enjoys 480 days of shared parental leave, free university education, high-speed public transit, and virtually zero out-of-pocket hospital fees, funded by higher average tax rates (approx. 40-50%).',
    outcomesAndResults: {
      successes: [
        'Consistently ranks highest in the UN World Happiness Report and Human Development Index.',
        'High labor force participation, especially among women due to universal affordable childcare.',
        'Low income inequality and high social trust.'
      ],
      challengesOrCriticisms: [
        'High personal tax burdens and high cost of consumer services.',
        'Demographic aging requires continuous pension reforms to remain solvent.'
      ]
    },
    famousFiguresInvolved: ['Tage Erlander (Swedish PM)', 'Olof Palme', 'Einar Gerhardsen (Father of modern Norway)'],
    legacyAndRelevance: 'Serves as the global gold standard for democratic socialist and social democratic reform movements worldwide.',
    simpleAnalogy: 'Like a neighborhood potluck where everyone brings a generous dish to share: you pay a higher share of your paycheck, but in return, nobody in the neighborhood ever starves or goes without a doctor.'
  },

  'us-new-deal': {
    id: 'us-new-deal',
    title: 'Roosevelt\'s New Deal in the United States',
    periodOrLocation: '1933–1939 • United States',
    ideologyName: 'Social Liberalism / Keynesianism',
    ideologyId: 'social-liberalism',
    overview: 'A sweeping series of public works projects, financial regulatory reforms, and emergency social programs enacted by President Franklin D. Roosevelt in response to the Great Depression.',
    historicalContext: 'In 1933, US unemployment reached 25% with thousands of bank failures. The New Deal marked a dramatic shift from laissez-faire classical liberalism to active federal macroeconomic intervention.',
    keyPolicies: [
      {
        policyName: 'Social Security Act (1935)',
        description: 'Established the first national old-age pension system, unemployment insurance, and aid for dependent children.'
      },
      {
        policyName: 'Works Progress Administration (WPA) & Civilian Conservation Corps (CCC)',
        description: 'Employed over 8.5 million Americans to build bridges, roads, public parks, schools, and national monuments.'
      },
      {
        policyName: 'Glass-Steagall Banking Act & FDIC',
        description: 'Separated commercial and investment banking and insured citizen bank deposits to prevent bank runs.'
      }
    ],
    howItWorkedInDailyLife: 'Unemployed factory workers and farmers were hired by the federal government to construct national infrastructure, earning a guaranteed weekly paycheck and restoring purchasing power to local economies.',
    outcomesAndResults: {
      successes: [
        'Restored public confidence in the banking system and created modern American infrastructure.',
        'Established lasting social safety nets (Social Security, minimum wage, 40-hour work week).',
        'Demonstrated that democratic governments could resolve catastrophic market failures without turning to fascism or communism.'
      ],
      challengesOrCriticisms: [
        'Conservative critics argued it expanded executive power and increased federal debt.',
        'Economic recovery was gradual; full mobilization did not occur until World War II manufacturing.'
      ]
    },
    famousFiguresInvolved: ['Franklin D. Roosevelt', 'Frances Perkins (First female Cabinet Secretary)', 'John Maynard Keynes'],
    legacyAndRelevance: 'Created the modern American regulatory state and defined 20th-century liberal democratic governance.',
    simpleAnalogy: 'When the engine of the family car completely stalled on a snowy road, the government acted as a jump-starter and tow truck to get everyone moving again.'
  },

  'classical-athens-assembly': {
    id: 'classical-athens-assembly',
    title: 'Direct Citizen Assembly of Classical Athens',
    periodOrLocation: '508 BC – 322 BC • Attica, Ancient Greece',
    ideologyName: 'Direct Democracy',
    ideologyId: 'direct-democracy',
    overview: 'The first recorded direct democratic system in human history, where all adult male citizens had equal voting rights in the central legislative assembly.',
    historicalContext: 'Reformed by Cleisthenes in 508 BC to dismantle the oppressive rule of aristocratic oligarchs and tyrants, Athenian democracy flourished during the Golden Age of Pericles.',
    keyPolicies: [
      {
        policyName: 'The Ecclesia (People\'s Assembly)',
        description: 'Met 40 times a year on the Pnyx hill. Every citizen had the right to speak (isegoria) and vote on laws, military expeditions, and treaties by show of hands.'
      },
      {
        policyName: 'Sortition (Lottery Selection)',
        description: 'Key government officials, jurors, and the Council of 500 were chosen by random lottery rather than elections to prevent wealthy aristocrats from buying power.'
      },
      {
        policyName: 'Ostracism',
        description: 'Annual vote where citizens could vote to banish any politician deemed too powerful or dangerous to democracy for 10 years.'
      }
    ],
    howItWorkedInDailyLife: 'A farmer or shoemaker would walk to the Pnyx, sit alongside poets and generals, debate foreign alliances, and cast a vote that had equal weight to the wealthiest nobleman.',
    outcomesAndResults: {
      successes: [
        'Fostered extraordinary philosophical, dramatic, and architectural achievements (Parthenon, Socrates, Sophocles).',
        'Demonstrated that ordinary working citizens could govern complex geopolitical states successfully.'
      ],
      challengesOrCriticisms: [
        'Excluded women, slaves, and resident foreigners (metics).',
        'Vulnerable to emotional demagogues (e.g., the disastrous Sicilian Expedition during the Peloponnesian War).'
      ]
    },
    famousFiguresInvolved: ['Cleisthenes', 'Pericles', 'Ephialtes', 'Socrates'],
    legacyAndRelevance: 'The foundational archetype for all modern democratic philosophy, sortition experiments, and participatory civic assemblies.',
    simpleAnalogy: 'Imagine your entire neighborhood gathering every month in the park where everyone gets a turn on the microphone and every single household votes directly on the town budget.'
  },

  'revolutionary-catalonia': {
    id: 'revolutionary-catalonia',
    title: 'Anarcho-Syndicalist Collectives of Revolutionary Catalonia',
    periodOrLocation: '1936–1939 • Catalonia & Aragon, Spain',
    ideologyName: 'Anarcho-Syndicalism',
    ideologyId: 'anarcho-syndicalism',
    overview: 'During the Spanish Civil War, millions of workers and peasants collectivized factories, transit systems, and agricultural land under worker self-management without state managers or private bosses.',
    historicalContext: 'Following General Francisco Franco\'s fascist military uprising in July 1936, the anarchist trade union CNT (Confederación Nacional del Trabajo) defeated the military in Barcelona and took over municipal operations.',
    keyPolicies: [
      {
        policyName: 'Worker Self-Management & Factory Collectives',
        description: 'Workers ran textile mills, metal shops, and utilities through elected worker councils subject to instant recall.'
      },
      {
        policyName: 'Abolition of Money & Free Distribution in Agrarian Villages',
        description: 'In rural Aragon, dozens of villages pooled farmland, abolished private currency, and distributed food and medicine according to need.'
      },
      {
        policyName: 'Universal Healthcare & Literacy Brigades',
        description: 'Syndicates opened community clinics, women\'s liberation centers (Mujeres Libres), and popular schools for illiterate laborers.'
      }
    ],
    howItWorkedInDailyLife: 'Trams in Barcelona were painted red and black, running on time under transit worker management. In restaurants and shops, tipping was abolished as humiliating, and workers addressed each other as "comrade".',
    outcomesAndResults: {
      successes: [
        'Industrial production and agricultural yields increased in many collectivized sectors.',
        'Profound cultural transformation toward gender equality and worker dignity.'
      ],
      challengesOrCriticisms: [
        'Severely undermined by the Spanish Civil War military encirclement and betrayals by Stalinist Soviet-backed factions.',
        'Crushed by Franco\'s fascist victory in 1939.'
      ]
    },
    famousFiguresInvolved: ['Buenaventura Durruti', 'Federica Montseny (First female minister in Spain)', 'George Orwell (Homage to Catalonia)'],
    legacyAndRelevance: 'Documented vividly by George Orwell, it remains the most significant large-scale historical demonstration of anarcho-syndicalism in industrial society.',
    simpleAnalogy: 'The employees of the factory take over ownership, elect their own shift managers, divide the profits fairly, and run the assembly line without any corporate CEO or distant stock owners.'
  },

  'singapore-state-capitalism': {
    id: 'singapore-state-capitalism',
    title: 'Singaporean Developmental State & Housing Board',
    periodOrLocation: '1965–Present • Singapore',
    ideologyName: 'State Capitalism / Technocracy',
    ideologyId: 'state-capitalism',
    overview: 'Singapore utilized strategic government-owned enterprises (Temasek, GIC), public land ownership, and meritocratic technocracy alongside aggressive free-market foreign investment.',
    historicalContext: 'Upon gaining unexpected independence in 1965 with high unemployment, ethnic tensions, and zero natural resources, Prime Minister Lee Kuan Yew engineered a hyper-efficient developmental state.',
    keyPolicies: [
      {
        policyName: 'Housing & Development Board (HDB) & 99-Year Leases',
        description: 'Over 80% of Singaporeans live in government-built, owner-occupied HDB flats, ensuring universal home ownership and social stability.'
      },
      {
        policyName: 'Central Provident Fund (CPF)',
        description: 'Mandatory savings scheme where employers and employees contribute to fund individual retirement, healthcare, and home purchases.'
      },
      {
        policyName: 'Meritocratic Technocratic Civil Service',
        description: 'Top government administrators are recruited from top global universities and paid private-sector competitive salaries to prevent corruption.'
      }
    ],
    howItWorkedInDailyLife: 'A citizen buys a high-quality government apartment using their CPF savings, commutes on spotless automated subways, and works in high-tech multinational logistics or banking hubs in a clean, corruption-free city.',
    outcomesAndResults: {
      successes: [
        'Transformed from a third-world port to one of the world\'s highest GDP per capita nations in one generation.',
        'Zero slums, lowest crime rates, and world-leading healthcare and education rankings.'
      ],
      challengesOrCriticisms: [
        'Strict legal controls on public protests, defamation suits against political opposition, and media regulation.'
      ]
    },
    famousFiguresInvolved: ['Lee Kuan Yew', 'Goh Keng Swee', 'Albert Winsemius'],
    legacyAndRelevance: 'The premier case study in technocratic state-led economic modernization and sovereign wealth management.',
    simpleAnalogy: 'Governing a city like a high-performance, well-managed tech corporation with rigorous engineers at the wheel.'
  }
};

/**
 * Find or generate a comprehensive case study entry for any example title
 */
export function getIdeologyCaseStudy(exampleTitleOrKey: string, context?: { title?: string; period?: string; description?: string; ideologyName?: string; ideologyId?: string }): IdeologyCaseStudy {
  const normalizedKey = exampleTitleOrKey.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  // Exact or partial match
  if (IDEOLOGY_CASE_STUDIES_REGISTRY[normalizedKey]) {
    return IDEOLOGY_CASE_STUDIES_REGISTRY[normalizedKey];
  }

  const foundKey = Object.keys(IDEOLOGY_CASE_STUDIES_REGISTRY).find(k => k.includes(normalizedKey) || normalizedKey.includes(k));
  if (foundKey) {
    return IDEOLOGY_CASE_STUDIES_REGISTRY[foundKey];
  }

  // Dynamic Case Study Generator
  const title = context?.title || exampleTitleOrKey;
  const period = context?.period || 'Historical Implementation';
  const desc = context?.description || 'A pivotal real-world governance case study demonstrating how theoretical principles translate into institutional practice.';
  const ideoName = context?.ideologyName || 'Political Ideology';
  const ideoId = context?.ideologyId || 'ideology';

  return {
    id: normalizedKey,
    title,
    periodOrLocation: period,
    ideologyName: ideoName,
    ideologyId: ideoId,
    overview: `${title} stands as a landmark historical case study in the real-world application of ${ideoName}. It illustrates the institutional mechanics, civic outcomes, and structural trade-offs of this governing philosophy in practice.`,
    historicalContext: `During ${period}, societal and economic challenges prompted leaders and citizens to organize institutional governance around ${ideoName} principles. ${desc}`,
    keyPolicies: [
      {
        policyName: 'Institutional Framework & Structural Organization',
        description: `Implemented governance mechanisms aligned with ${ideoName}, reforming public administration, civic rights, and resource management.`
      },
      {
        policyName: 'Economic & Civic Implementation',
        description: `Balanced market activities, public infrastructure, and regulatory oversight according to ${ideoName} tenets.`
      },
      {
        policyName: 'Legal & Constitutional Safeguards',
        description: 'Established statutory precedents, judicial arbitration, and civic protections to ensure long-term stability.'
      }
    ],
    howItWorkedInDailyLife: `For ordinary residents living during ${period}, this system established clear rules for daily commerce, community safety, dispute resolution, and public taxation. ${desc}`,
    outcomesAndResults: {
      successes: [
        `Demonstrated practical viability and structural coherence of ${ideoName}.`,
        'Advanced institutional knowledge and administrative efficiency in public statecraft.',
        'Provided a lasting empirical benchmark for historians, political theorists, and policymakers.'
      ],
      challengesOrCriticisms: [
        'Encountered logistical complexities and political tensions inherent to large-scale implementation.',
        'Required continuous institutional adjustments to balance competing socio-economic interests.'
      ]
    },
    famousFiguresInvolved: ['Historical Architects', 'Civic Leaders', 'Legislative Reformers'],
    legacyAndRelevance: `Remains a pivotal historical reference point for studying the real-world dynamics, successes, and complexities of ${ideoName}.`,
    simpleAnalogy: `Like testing an architect's blueprint on a real building site: theoretical ideas of ${ideoName} put into physical, daily practice.`
  };
}
