import { PoliticalIdeology } from '../types';

export interface SimpleRealWorldExample {
  scenarioTitle: string;
  icon: string;
  question: string;
  plainEnglishExplanation: string;
  concreteExample: string;
  keyTakeaway: string;
}

/**
 * Returns 2 to 3 crystal-clear real-world everyday life examples of how an ideology functions.
 */
export function getIdeologySimpleExamples(ideology: PoliticalIdeology): SimpleRealWorldExample[] {
  const cat = ideology.category;
  const id = ideology.id;

  // 1. Specific overrides for famous ideologies
  if (id === 'classical-liberalism' || id === 'libertarianism') {
    return [
      {
        scenarioTitle: 'Starting a Small Business',
        icon: '☕',
        question: 'What happens when you want to open a coffee shop?',
        plainEnglishExplanation: 'You can open your shop freely with very few permits, low taxes, and zero government price limits. You negotiate wages directly with your workers and set your own prices. If customers love your coffee, you profit; if not, the government won\'t bail you out.',
        concreteExample: 'You buy your own espresso machine, hire two baristas at an agreed wage, and keep your earnings after a minimal tax used only to pay for basic local police and courts.',
        keyTakeaway: 'Maximum personal and commercial freedom with minimal state interference.'
      },
      {
        scenarioTitle: 'Healthcare & Illness',
        icon: '🏥',
        question: 'How do you pay for medical care if you get sick?',
        plainEnglishExplanation: 'Healthcare is provided by private doctors and hospitals in an open competitive market. You choose and purchase your own private insurance plan, and clinics compete on price, speed, and quality to win your business.',
        concreteExample: 'You shop around for health insurance that fits your budget. Multiple private clinics offer competitive prices for checkups, MRI scans, and treatments.',
        keyTakeaway: 'Personal responsibility and competitive market choice instead of state-run medicine.'
      },
      {
        scenarioTitle: 'Community Roads & Public Infrastructure',
        icon: '🛣️',
        question: 'Who builds the neighborhood roads, bridges, and parks?',
        plainEnglishExplanation: 'The government builds only essential public infrastructure (or contracts it to private builders) funded by basic low taxes. Alternatively, private developers build toll roads and charge users directly.',
        concreteExample: 'A basic town council maintains the main arterial roads using modest local property taxes, while commercial districts are built and managed by private developers.',
        keyTakeaway: 'Taxes are strictly limited to necessary defense, rule of law, and essential transit.'
      }
    ];
  }

  if (id === 'social-democracy' || id === 'democratic-socialism' || cat === 'Socialism, Communism & Marxism') {
    return [
      {
        scenarioTitle: 'Healthcare & Medical Emergencies',
        icon: '🏥',
        question: 'What happens when you get sick or have an emergency surgery?',
        plainEnglishExplanation: 'You walk into any hospital and receive world-class medical treatment for free or a tiny nominal fee at the point of care. The hospital, doctors, and nurses are funded collectively through progressive public taxation.',
        concreteExample: 'If you break your arm or need heart surgery, you don\'t receive a bankrupting hospital bill. Society pools resources so nobody goes broke from illness.',
        keyTakeaway: 'Healthcare is treated as a universal human right guaranteed to every citizen.'
      },
      {
        scenarioTitle: 'Working a Job & Company Profits',
        icon: '💼',
        question: 'How are workers treated and how is company profit distributed?',
        plainEnglishExplanation: 'Workers have strong labor unions and guaranteed seats on the company board. Salaries are fair, working hours are regulated (e.g., 35-hour weeks), with generous paid parental leave and paid vacation days.',
        concreteExample: 'At a car factory, employees vote on workplace safety rules, have a collective bargaining contract guaranteeing annual cost-of-living raises, and get 5 weeks of paid holiday.',
        keyTakeaway: 'Economic democracy: workers share in the wealth they create, not just corporate shareholders.'
      },
      {
        scenarioTitle: 'Public Education & Family Childcare',
        icon: '🎓',
        question: 'How do children go to school and university?',
        plainEnglishExplanation: 'From daycare and preschool up to medical school and PhD degrees, tuition is funded by the public system. Every child gets equal educational access regardless of whether their parents are wealthy or poor.',
        concreteExample: 'A student from a working-class family studies engineering at university without taking on thousands in private student debt, supported by a government living stipend.',
        keyTakeaway: 'Equal opportunity and social mobility funded through progressive solidarity.'
      }
    ];
  }

  if (id === 'anarcho-capitalism') {
    return [
      {
        scenarioTitle: 'Neighborhood Security & Protection',
        icon: '🛡️',
        question: 'Who protects you from theft or violence if there is no state police?',
        plainEnglishExplanation: 'You subscribe to a private defense agency (like hiring home security or insurance). If a dispute arises, private arbitration courts chosen by both parties resolve the conflict based on private contract law.',
        concreteExample: 'Your neighborhood hires "Apex Protection Services." If your neighbor\'s tree falls on your roof, both your insurance companies resolve the compensation through a reputable private judge.',
        keyTakeaway: 'All security and judicial services are voluntary market services, not state monopolies.'
      },
      {
        scenarioTitle: 'Paving Roads & Fire Fighting',
        icon: '🚒',
        question: 'How do roads get built and fires put out?',
        plainEnglishExplanation: 'Neighborhood associations, shopping plazas, and road corporations own and maintain infrastructure to maximize property value. Fire services are paid through insurance premiums or direct homeowner subscriptions.',
        concreteExample: 'A consortium of local homeowners and businesses owns the street, keeping it well-paved and clean because smooth roads increase property values and store sales.',
        keyTakeaway: 'Voluntary contracts and private property rights replace compulsory government taxes.'
      },
      {
        scenarioTitle: 'Money & Buying Goods',
        icon: '🪙',
        question: 'What currency do people use to buy groceries?',
        plainEnglishExplanation: 'There is no central government bank (like the Federal Reserve) printing fiat money. People freely use competing currencies like gold, silver, or decentralized cryptocurrencies based on mutual trust.',
        concreteExample: 'You buy groceries using sound money that cannot be inflated away by politicians printing new paper bills.',
        keyTakeaway: 'Free-market monetary freedom without inflation from state central banks.'
      }
    ];
  }

  if (id === 'georgism') {
    return [
      {
        scenarioTitle: 'Buying a House & Paying Taxes',
        icon: '🏡',
        question: 'How do taxes work when you own a home or land?',
        plainEnglishExplanation: 'You pay 0% tax on the building, your home improvement, or your income. Instead, you pay a Land Value Tax (LVT) only on the unimproved value of the land location itself. Landlords cannot hoard empty urban lots for speculation.',
        concreteExample: 'If you build an energy-efficient 3-story home on a downtown plot, your taxes do NOT go up. But if a speculator leaves a vacant parking lot next door, they pay the exact same land tax as you.',
        keyTakeaway: 'Tax unimproved natural resources and land monopolization, not human labor and productive buildings.'
      },
      {
        scenarioTitle: 'The Citizen\'s Dividend (Universal Basic Income)',
        icon: '💵',
        question: 'What does the community do with the collected land revenue?',
        plainEnglishExplanation: 'Because the Earth and natural resources (minerals, oil, spectrum) belong equally to all humanity, the revenue collected from land and resource rents is distributed back to every citizen as a regular cash dividend.',
        concreteExample: 'Every citizen receives a monthly "Earth Dividend" check (like the Alaska Permanent Fund) funded by the economic rent of prime land and natural oil/mineral extraction.',
        keyTakeaway: 'Eliminates poverty and landlord rent-seeking without punishing hard workers and inventors.'
      },
      {
        scenarioTitle: 'Urban Development & Affordable Housing',
        icon: '🏙️',
        question: 'Why does housing stay affordable in cities?',
        plainEnglishExplanation: 'Because land is taxed based on potential value, owners are motivated to build dense housing, shops, or offices rather than letting valuable downtown land sit idle as empty lots.',
        concreteExample: 'Downtowns are vibrant, compact, and full of affordable apartments with fast public transit, because holding speculative empty land is expensive.',
        keyTakeaway: 'Forces productive land use and curbs urban sprawl naturally.'
      }
    ];
  }

  if (id === 'direct-democracy' || id === 'liquid-democracy') {
    return [
      {
        scenarioTitle: 'Passing a New Law or Ordinance',
        icon: '🗳️',
        question: 'How does a new local traffic speed limit or school budget get approved?',
        plainEnglishExplanation: 'Every citizen votes directly on the issue online or in a town assembly, rather than electing a politician who might break their campaign promises. In Liquid Democracy, you can vote yourself or temporarily delegate your vote to a trusted expert.',
        concreteExample: 'When the city considers building a $10M sports stadium, an electronic ballot is sent to all registered residents. The majority decision is legally binding.',
        keyTakeaway: 'Direct power rests in the hands of the citizenry, eliminating corrupt political middlemen.'
      },
      {
        scenarioTitle: 'Budgeting City Tax Revenue',
        icon: '📊',
        question: 'Who decides where tax money is spent each year?',
        plainEnglishExplanation: 'Through participatory budgeting, citizens submit community project ideas (new parks, bike lanes, youth centers) and the whole public votes directly on which projects receive funding.',
        concreteExample: 'Neighbors gather in March to review proposals, and allocate 20% of the city budget to solar streetlights and library upgrades by collective ballot.',
        keyTakeaway: 'Transparent, citizen-driven fiscal priorities.'
      },
      {
        scenarioTitle: 'Accountability & Recalling Bad Policies',
        icon: '🔄',
        question: 'What if a policy turns out to be ineffective or harmful?',
        plainEnglishExplanation: 'Citizens can immediately initiate a referendum with a standard petition threshold (e.g., 2% of voters) to repeal the law or adjust it without waiting 4 years for the next election.',
        concreteExample: 'If a new zoning rule creates traffic congestion, 500 citizens sign a petition to force an immediate public repeal vote.',
        keyTakeaway: 'Continuous real-time civic accountability.'
      }
    ];
  }

  if (id === 'technocracy') {
    return [
      {
        scenarioTitle: 'Managing the Electric Grid & Energy',
        icon: '⚡',
        question: 'Who decides where energy plants are built and how power is priced?',
        plainEnglishExplanation: 'Trained electrical engineers, data scientists, and climate physicists make decisions based on thermodynamic efficiency and scientific models, rather than politicians influenced by corporate lobbying or popular slogans.',
        concreteExample: 'An automated computational model routes renewable solar, hydro, and nuclear energy across regions to minimize carbon emissions and eliminate blackouts with zero political delay.',
        keyTakeaway: 'Scientific optimization and technical competence replace partisan political maneuvering.'
      },
      {
        scenarioTitle: 'Responding to a Public Health Crisis',
        icon: '🧪',
        question: 'How are viral outbreaks or environmental toxins handled?',
        plainEnglishExplanation: 'Epidemiologists and medical researchers have direct operational authority to deploy resources, quarantine zones, and distribute vaccines using empirical real-time data.',
        concreteExample: 'Contact tracing algorithms and supply-chain logistics software coordinate medicine delivery across hospitals within hours of detecting a new pathogen.',
        keyTakeaway: 'Decisions are driven purely by empirical evidence and measurable outcomes.'
      },
      {
        scenarioTitle: 'Economic Planning & Resource Accounting',
        icon: '💻',
        question: 'How are goods produced and distributed without political pork-barrel spending?',
        plainEnglishExplanation: 'Resources are tracked using energy accounting and computerized resource-flow networks. Production matches actual human consumption needs rather than speculative financial bubbles.',
        concreteExample: 'Food production and transport networks use automated sensor networks to eliminate waste and guarantee equitable nutritional distribution across cities.',
        keyTakeaway: 'Engineering efficiency applied to societal governance.'
      }
    ];
  }

  // 2. Fallback by Category
  if (cat === 'Conservatism & Traditionalism') {
    return [
      {
        scenarioTitle: 'Local Community & Civic Institutions',
        icon: '🏛️',
        question: 'How are community problems solved in daily life?',
        plainEnglishExplanation: 'Communities rely on "little platoons"—families, churches, local charities, and historical civic clubs—to help the needy and resolve local issues before asking the distant central government to step in.',
        concreteExample: 'When a neighbor falls on hard times, the local church food pantry, fraternal lodge, and family members provide support and community shelter.',
        keyTakeaway: 'Strong local civil society and family cohesion over centralized state bureaucracy.'
      },
      {
        scenarioTitle: 'Passing New Laws & Reforming Rules',
        icon: '📜',
        question: 'How does society decide to change existing customs or laws?',
        plainEnglishExplanation: 'Change happens slowly, prudently, and with great caution. Society respects the accumulated wisdom of past generations rather than hastily tearing down long-standing legal traditions for untested theories.',
        concreteExample: 'Legal precedents, property protections, and constitutional checks are rigorously preserved through independent courts.',
        keyTakeaway: 'Prudence, rule of law, and reverence for proven historical institutions.'
      },
      {
        scenarioTitle: 'Education & Cultural Heritage',
        icon: '📚',
        question: 'What do children learn in schools?',
        plainEnglishExplanation: 'Schools focus on classical foundations: literacy, mathematics, civic virtues, national history, and moral character, passing down cultural heritage to the next generation.',
        concreteExample: 'Students study constitutional history, foundational literature, and civic responsibilities to become moral, law-abiding citizens.',
        keyTakeaway: 'Transmission of civilizational heritage, respect, and order across generations.'
      }
    ];
  }

  if (cat === 'Environmental & Ecocentric') {
    return [
      {
        scenarioTitle: 'Buying Products & Groceries',
        icon: '🌱',
        question: 'How do consumer goods get made and sold?',
        plainEnglishExplanation: 'All manufacturing operates on a circular economy. Products must be fully repairable, recyclable, and zero-waste. Companies pay for the full ecological cost (carbon tax, pollution remediation) upfront.',
        concreteExample: 'You purchase an electric appliance that has a 20-year modular warranty and can be easily upgraded with standardized replacement parts instead of ending up in a landfill.',
        keyTakeaway: 'Human production is harmonized within Earth\'s ecological carrying capacity.'
      },
      {
        scenarioTitle: 'City Transport & Living Spaces',
        icon: '🚲',
        question: 'How do you get around town and commute?',
        plainEnglishExplanation: 'Cities are designed for walking, cycling, and electric mass transit. Urban spaces are packed with green parks, urban farms, and clean air corridors with minimal gasoline car traffic.',
        concreteExample: 'You bike on protected tree-lined greenways to work, or catch a high-speed electric tram that runs every 3 minutes powered by regional solar and wind farms.',
        keyTakeaway: 'Prioritizes clean air, biodiversity, and human health over fossil-fuel dependency.'
      },
      {
        scenarioTitle: 'Protecting Rivers, Forests & Wildlife',
        icon: '🌳',
        question: 'How are natural ecosystems protected from corporate exploitation?',
        plainEnglishExplanation: 'Nature, rivers, and old-growth forests have legal rights in court ("Rights of Nature"). Corporations cannot clear-cut forests or pollute waterways for short-term profit.',
        concreteExample: 'A regional river has legal guardianship; if a factory dumps chemicals, the factory owners face severe criminal penalties and must restore the ecosystem.',
        keyTakeaway: 'Ecosystems are treated as living partners rather than disposable commodities.'
      }
    ];
  }

  // Default Universal Fallback for any ideology
  return [
    {
      scenarioTitle: 'Day-to-Day Citizen Life & Rights',
      icon: '👤',
      question: `How does ${ideology.name} shape an individual's personal freedom and rights?`,
      plainEnglishExplanation: `${ideology.name} organizes society around its core principle: ${ideology.coreTenets[0] || ideology.tagline}. Citizens experience governance through ${ideology.viewOfState.toLowerCase()}.`,
      concreteExample: `Under this system, decisions about civic liberty and personal autonomy follow the philosophical guidelines established in ${ideology.historicalOrigins}.`,
      keyTakeaway: ideology.tagline
    },
    {
      scenarioTitle: 'Economy, Work & Business',
      icon: '💼',
      question: `How are commerce, employment, and money handled?`,
      plainEnglishExplanation: `The economic structure is driven by: ${ideology.economicModel}.`,
      concreteExample: `Workers, businesses, and consumers interact based on institutional rules designed to balance production, resource distribution, and economic efficiency.`,
      keyTakeaway: `Economic activity is structured around ${ideology.economicModel.split('.')[0]}.`
    },
    {
      scenarioTitle: 'Community Decision-Making & Public Good',
      icon: '🏛️',
      question: `How does the community fund public services and resolve disputes?`,
      plainEnglishExplanation: `Public infrastructure and social order are maintained through ${ideology.viewOfState.toLowerCase()}, guided by ${ideology.keyThinkers.slice(0, 2).join(' and ') || 'foundational theorists'}.`,
      concreteExample: `Conflicts and public investments are weighed against the collective principles and institutional checks mandated by ${ideology.name}.`,
      keyTakeaway: `Governance adheres to ${ideology.spectrumPlacement} principles.`
    }
  ];
}
