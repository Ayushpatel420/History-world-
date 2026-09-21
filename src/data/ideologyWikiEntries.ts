export interface RelatedWikiEntry {
  id: string;
  title: string;
  subtitle: string;
  type: 'figure' | 'era' | 'event' | 'text' | 'concept';
  eraOrPeriod: string;
  region: string;
  birthDeathOrDates?: string;
  summary: string;
  infobox: {
    label: string;
    value: string;
  }[];
  tableOfContents: string[];
  sections: {
    heading: string;
    content: string;
    bulletPoints?: string[];
  }[];
  famousQuote?: {
    quote: string;
    source?: string;
  };
  keyWorks?: string[];
  legacy: string;
  associatedIdeologies: string[];
  simpleEverydayWorking?: {
    headline: string;
    analogy: string;
    takeaway: string;
  };
}

export const RELATED_WIKI_ENTRIES: Record<string, RelatedWikiEntry> = {
  'john-locke': {
    id: 'john-locke',
    title: 'John Locke',
    subtitle: 'English Philosopher & Physician • "Father of Classical Liberalism"',
    type: 'figure',
    eraOrPeriod: 'Age of Enlightenment',
    region: 'England, United Kingdom',
    birthDeathOrDates: '29 August 1632 – 28 October 1704',
    summary: 'John Locke was an English philosopher and physician, widely regarded as one of the most influential of Enlightenment thinkers and commonly known as the "Father of Liberalism". Considered one of the first of the British empiricists, following the tradition of Sir Francis Bacon, he is equally important to social contract theory. His work greatly affected the development of epistemology, political philosophy, and the United States Declaration of Independence.',
    infobox: [
      { label: 'Born', value: '29 August 1632, Wrington, Somerset, England' },
      { label: 'Died', value: '28 October 1704 (aged 72), High Laver, Essex' },
      { label: 'Era', value: '17th-century philosophy (Enlightenment)' },
      { label: 'Region', value: 'Western philosophy' },
      { label: 'School', value: 'Empiricism, Classical Liberalism, Social Contract' },
      { label: 'Main Interests', value: 'Political philosophy, Epistemology, Economics, Education' },
      { label: 'Notable Ideas', value: 'Tabula rasa, Natural rights (Life, Liberty, Estate), Consent of the governed, Separation of church and state' }
    ],
    tableOfContents: ['Early Life & Education', 'Two Treatises of Government', 'Theory of Mind & Tabula Rasa', 'Religious Toleration & Natural Rights', 'Political Legacy & Influence', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'Two Treatises of Government & Social Contract',
        content: 'Locke\'s political theory was expounded in his Two Treatises of Government (1689). He argued that sovereignty resides in the people, not the monarch. Unlike Thomas Hobbes, who believed in absolute monarchy to curb brutish human nature, Locke posited that individuals in a state of nature possess inalienable natural rights to life, liberty, and property.',
        bulletPoints: [
          'The state is created solely through a social contract to protect individual natural rights.',
          'If a government systematically violates the natural rights of its citizens, the people have a moral "Right to Revolution" to replace it.',
          'Government authority requires the explicit and continuous consent of the governed.'
        ]
      },
      {
        heading: 'Theory of Property & Labor',
        content: 'In the Second Treatise, Locke developed his famous labor theory of property. He argued that ownership of private property is justified when a person mixes their physical labor with the common natural resources provided by the earth, subject to the "Lockean proviso" that enough and as good be left for others.',
        bulletPoints: [
          'Labor appropriation grounds original legitimate acquisition of property.',
          'Property ownership provides the economic foundation for personal liberty and independence from state tyranny.'
        ]
      },
      {
        heading: 'Religious Toleration & Epistemology',
        content: 'In "A Letter Concerning Toleration" (1689), Locke advocated for broad religious tolerance, arguing that coercion cannot produce genuine inner faith and that religious coercion leads to civil disorder rather than harmony.',
      }
    ],
    famousQuote: {
      quote: 'Being all equal and independent, no one ought to harm another in his life, health, liberty, or possessions.',
      source: 'Second Treatise of Government (1689)'
    },
    keyWorks: [
      'Two Treatises of Government (1689)',
      'An Essay Concerning Human Understanding (1689)',
      'A Letter Concerning Toleration (1689)',
      'Some Thoughts Concerning Education (1693)'
    ],
    legacy: 'Locke\'s concepts of natural rights and representative government directly inspired Thomas Jefferson and the American Founders in crafting the Declaration of Independence and the United States Constitution, cementing his status as the foundational architect of constitutional democracy.',
    associatedIdeologies: ['Liberalism', 'Classical Liberalism', 'Constitutionalism', 'Libertarianism'],
    simpleEverydayWorking: {
      headline: 'How Locke\'s Ideas Work in Everyday Life',
      analogy: 'Imagine you clear wild thorny bushes on an unclaimed hillside and plant apple trees with your own hands. Under Locke\'s principle, those apples and that orchard belong to you because you invested your sweat and labor into it. The government\'s only job is to stop thieves from stealing your apples, not to seize your farm.',
      takeaway: 'Your hard work creates legitimate property, and governments exist only as security guards for your human rights.'
    }
  },

  'karl-marx': {
    id: 'karl-marx',
    title: 'Karl Heinrich Marx',
    subtitle: 'German Philosopher, Economist, Historian & Revolutionary Socialist',
    type: 'figure',
    eraOrPeriod: '19th-Century Industrial Era',
    region: 'Prussia / Germany / United Kingdom',
    birthDeathOrDates: '5 May 1818 – 14 March 1883',
    summary: 'Karl Marx was a German philosopher, economist, political theorist, sociologist, journalist, and revolutionary socialist. Born in Trier, Germany, Marx studied law and philosophy at the universities of Bonn and Berlin. His critical theories about society, economics, and politics—collectively understood as Marxism—hold that human societies develop through class conflict. In the capitalist mode of production, this manifests in the conflict between the ruling bourgeoisie and the working proletariat.',
    infobox: [
      { label: 'Born', value: '5 May 1818, Trier, Grand Duchy of the Lower Rhine, Prussia' },
      { label: 'Died', value: '14 March 1883 (aged 64), London, England' },
      { label: 'Era', value: '19th-century philosophy' },
      { label: 'School', value: 'Marxism, Historical Materialism, Scientific Socialism' },
      { label: 'Main Interests', value: 'Economics, Sociology, Political theory, Class struggle' },
      { label: 'Notable Ideas', value: 'Surplus value, Historical materialism, Alienation of labor, Base and superstructure, Dictatorship of the proletariat' }
    ],
    tableOfContents: ['Historical Materialism', 'Das Kapital & Labor Theory of Value', 'Alienation of the Worker', 'The Communist Manifesto & Class Struggle', 'Global Legacy', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'Historical Materialism & Dialectics',
        content: 'Marx developed historical materialism, arguing that the material economic conditions and mode of production (the "base") fundamentally shape a society\'s legal, political, and cultural institutions (the "superstructure"). History progresses through dialectical stages driven by contradictions between productive forces and social relations of production.',
        bulletPoints: [
          'History of all hitherto existing society is the history of class struggles.',
          'Primitive Communism → Slavery → Feudalism → Capitalism → Socialism → Stateless Communism.',
          'Contradictions within capitalism (crises of overproduction and falling rate of profit) inevitably trigger systemic transformation.'
        ]
      },
      {
        heading: 'Labor Theory of Value & Surplus Value',
        content: 'In Das Kapital (1867), Marx argued that the value of commodities is determined by the socially necessary labor time required for their production. Capitalists extract surplus value from workers by paying them wages below the true value created by their labor, generating profit through structural exploitation.',
        bulletPoints: [
          'Surplus value is the source of capital accumulation and unequal wealth distribution.',
          'Alienation (Entfremdung) separates the worker from the product, the act of production, human species-essence, and other workers.'
        ]
      },
      {
        heading: 'The Communist Manifesto & International Solidarity',
        content: 'Published in February 1848 alongside Friedrich Engels, The Communist Manifesto called for universal proletarian solidarity, concluding with the famous rallying cry: "Workers of the world, unite! You have nothing to lose but your chains!"'
      }
    ],
    famousQuote: {
      quote: 'The philosophers have only interpreted the world, in various ways. The point, however, is to change it.',
      source: 'Theses on Feuerbach (1845)'
    },
    keyWorks: [
      'The Communist Manifesto (1848 with Engels)',
      'Das Kapital (Vol. I 1867, Vols. II & III edited by Engels)',
      'The German Ideology (1846)',
      'Economic and Philosophic Manuscripts of 1844'
    ],
    legacy: 'Marx is widely considered one of the most influential figures in human history. His ideas transformed global politics, inspiring revolutions across Russia, China, and the Global South, and founding modern critical sociology and political economy.',
    associatedIdeologies: ['Marxism', 'Scientific Socialism', 'Communism', 'Marxism-Leninism', 'Democratic Socialism'],
    simpleEverydayWorking: {
      headline: 'How Marx\'s Critique Works in Everyday Life',
      analogy: 'Imagine a factory worker making chairs. Each chair sells for $100. The raw wood costs $20, and the factory rent/electricity is $10. The worker makes 5 chairs a day ($350 of net new value created by human sweat), but is paid only $50 in daily wages. The remaining $300 profit goes to a passive factory owner sitting in an office.',
      takeaway: 'Marx argued that workers should collectively own the factory and share the full value of the chairs they build.'
    }
  },

  'adam-smith': {
    id: 'adam-smith',
    title: 'Adam Smith',
    subtitle: 'Scottish Moral Philosopher & "Father of Modern Economics"',
    type: 'figure',
    eraOrPeriod: 'Scottish Enlightenment',
    region: 'Scotland, Great Britain',
    birthDeathOrDates: '5 June 1723 – 17 July 1790',
    summary: 'Adam Smith was a Scottish philosopher and political economist who was a key figure during the Scottish Enlightenment. Known primarily for his magnum opus, "An Inquiry into the Nature and Causes of the Wealth of Nations" (1776), Smith laid the foundations of classical free-market economic theory and analyzed the division of labor, voluntary exchange, and the self-regulating market mechanism known as the "invisible hand".',
    infobox: [
      { label: 'Born', value: '5 June 1723, Kirkcaldy, Fife, Scotland' },
      { label: 'Died', value: '17 July 1790 (aged 67), Edinburgh, Scotland' },
      { label: 'Era', value: '18th-century philosophy (Scottish Enlightenment)' },
      { label: 'School', value: 'Classical Economics, Moral Sentimentalism' },
      { label: 'Main Interests', value: 'Political economy, Moral philosophy, Jurisprudence, Division of labor' },
      { label: 'Notable Ideas', value: 'The Invisible Hand, Division of labor, Free trade, Impartial spectator, Absolute advantage' }
    ],
    tableOfContents: ['The Theory of Moral Sentiments', 'The Wealth of Nations', 'Division of Labor & Market Efficiency', 'The Role of Government', 'Enduring Legacy', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'The Wealth of Nations & The Invisible Hand',
        content: 'Published in 1776, The Wealth of Nations revolutionized economic thought by refuting mercantilism—the belief that national wealth consists of stockpiling gold through trade tariffs. Smith argued that real wealth is measured by the total productivity and consumable goods generated by a nation\'s labor force.',
        bulletPoints: [
          'Voluntary trade and self-interest generate unintended social prosperity through competitive price signals.',
          'The famous pin factory example demonstrated exponential productivity gains via specialization and division of labor.',
          'Protectionist tariffs distort capital allocation and harm consumers.'
        ]
      },
      {
        heading: 'The Theory of Moral Sentiments & Empathy',
        content: 'Before his economic treatise, Smith published The Theory of Moral Sentiments (1759), arguing that human morality is grounded in empathy and sympathy for others, mediated through an internal "Impartial Spectator" rather than raw selfish calculation.',
      },
      {
        heading: 'The Legitimate Role of the State',
        content: 'Contrary to extreme laissez-faire caricatures, Smith advocated significant duties for sovereign government: national defense, administration of impartial justice, enforcement of contracts, and financing public works and universal elementary education that private commerce cannot profitably provide.'
      }
    ],
    famousQuote: {
      quote: 'It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner, but from their regard to their own interest.',
      source: 'The Wealth of Nations (Book I, Chapter II, 1776)'
    },
    keyWorks: [
      'An Inquiry into the Nature and Causes of the Wealth of Nations (1776)',
      'The Theory of Moral Sentiments (1759)',
      'Lectures on Jurisprudence (Posthumous)'
    ],
    legacy: 'Smith\'s insights formed the intellectual bedrock of modern commercial capitalism, international free trade, and economic freedom across Western liberal democracies.',
    associatedIdeologies: ['Classical Liberalism', 'Capitalism', 'Neoliberalism', 'Ordoliberalism'],
    simpleEverydayWorking: {
      headline: 'How Adam Smith\'s Invisible Hand Works in Everyday Life',
      analogy: 'When you wake up in the morning and buy a fresh loaf of warm bread from the neighborhood bakery, the baker didn\'t bake it out of pure charity for you—they baked it to earn a living for their own family. Yet by striving to make the best, freshest bread at a fair price to beat the rival baker down the street, everyone in town gets great bread.',
      takeaway: 'People pursuing their own productive livelihood in a competitive market accidentally creates widespread abundance for everyone.'
    }
  },

  'edmund-burke': {
    id: 'edmund-burke',
    title: 'Edmund Burke',
    subtitle: 'Anglo-Irish Statesman, Orator & "Father of Modern Conservatism"',
    type: 'figure',
    eraOrPeriod: 'Age of Enlightenment & French Revolutionary Era',
    region: 'Ireland / Great Britain',
    birthDeathOrDates: '12 January 1729 – 9 July 1797',
    summary: 'Edmund Burke was an Anglo-Irish statesman, author, orator, and philosopher who served in the British Parliament for over two decades. He is widely considered the foundational architect of modern philosophical conservatism. While supporting the American Revolution as a defensive struggle for established colonial rights, Burke famously foresaw the violent terror and military tyranny of the French Revolution in his 1790 masterwork.',
    infobox: [
      { label: 'Born', value: '12 January 1729, Dublin, Ireland' },
      { label: 'Died', value: '9 July 1797 (aged 68), Beaconsfield, England' },
      { label: 'Era', value: '18th-century philosophy' },
      { label: 'School', value: 'Classical Conservatism, Whig Constitutionalism' },
      { label: 'Main Interests', value: 'Political philosophy, Aesthetics, Jurisprudence, Parliamentary reform' },
      { label: 'Notable Ideas', value: 'Prudence in reform, Organic society, Partnership of the living, dead and unborn, Critique of abstract radicalism' }
    ],
    tableOfContents: ['Reflections on the Revolution in France', 'Organic Society & Generational Covenant', 'Support for American Colonies', 'Prudence vs. Abstract Dogmatism', 'Legacy', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'Reflections on the Revolution in France (1790)',
        content: 'Burke predicted that the French Revolution\'s total destruction of traditional institutions (church, aristocracy, monarchy) in favor of abstract utopian theories would collapse into violent anarchy, terror, and eventual military dictatorship—years before the rise of Robespierre and Napoleon Bonaparte.',
        bulletPoints: [
          'Society is an organic, fragile ecosystem accumulated over centuries, not a machine to be dismantled overnight.',
          'Prescription, custom, and historical precedent contain the tacit wisdom of generations (prejudice as latent wisdom).',
          'Violent revolution creates a power vacuum ripe for tyranny.'
        ]
      },
      {
        heading: 'The Generational Covenant of Civilization',
        content: 'Burke famously redefined the social contract as a sacred tripartite covenant: "Society is indeed a contract... a partnership not only between those who are living, but between those who are living, those who are dead, and those who are to be born."'
      }
    ],
    famousQuote: {
      quote: 'Society is a partnership in all science; a partnership in all art; a partnership in every virtue and in all perfection. As the ends of such a partnership cannot be obtained in many generations, it becomes a partnership not only between those who are living, but between those who are living, those who are dead, and those who are to be born.',
      source: 'Reflections on the Revolution in France (1790)'
    },
    keyWorks: [
      'Reflections on the Revolution in France (1790)',
      'A Philosophical Enquiry into the Origin of Our Ideas of the Sublime and Beautiful (1757)',
      'Thoughts on the Cause of the Present Discontents (1770)',
      'Speech on Conciliation with the Colonies (1775)'
    ],
    legacy: 'Burke\'s emphasis on prudent, evolutionary reform, organic civil society (the "little platoons"), and humility before historical institutions defines modern conservative political philosophy.',
    associatedIdeologies: ['Conservatism', 'Traditionalism', 'One-Nation Conservatism', 'Christian Democracy'],
    simpleEverydayWorking: {
      headline: 'How Burke\'s Conservatism Works in Everyday Life',
      analogy: 'Think of an old historic stone bridge that has carried carts across a river for 300 years. An engineer proposing to blow up the entire bridge overnight to build an experimental glass bridge might cause catastrophe. Burke advises carefully repairing the worn stones and widening the road while respecting the proven structure that has kept generations safe.',
      takeaway: 'Reform society carefully and prudently without destroying the proven foundations built by our ancestors.'
    }
  },

  'friedrich-hayek': {
    id: 'friedrich-hayek',
    title: 'Friedrich August von Hayek',
    subtitle: 'Austrian-British Economist & Nobel Laureate • Champion of Free Market Liberalism',
    type: 'figure',
    eraOrPeriod: '20th-Century Cold War Era',
    region: 'Austria / United Kingdom / United States',
    birthDeathOrDates: '8 May 1899 – 23 March 1992',
    summary: 'Friedrich Hayek was an Austrian-British economist and political philosopher known for his defense of classical liberalism and free-market capitalism. Awarded the 1974 Nobel Memorial Prize in Economic Sciences alongside Gunnar Myrdal, Hayek authored the seminal book "The Road to Serfdom" (1944) and formulated the theory of the price system as a decentralized knowledge communicator.',
    infobox: [
      { label: 'Born', value: '8 May 1899, Vienna, Austria-Hungary' },
      { label: 'Died', value: '23 March 1992 (aged 92), Freiburg im Breisgau, Germany' },
      { label: 'Era', value: '20th-century economics' },
      { label: 'School', value: 'Austrian School, Classical Liberalism' },
      { label: 'Main Interests', value: 'Economic calculation, Monetary theory, Spontaneous order, Epistemology' },
      { label: 'Notable Ideas', value: 'Spontaneous order, Local knowledge problem, Price mechanism as signaling system, The Road to Serfdom' }
    ],
    tableOfContents: ['The Road to Serfdom', 'The Use of Knowledge in Society', 'Spontaneous Order (Cosmos)', 'Critique of Central Planning', 'Legacy', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'The Use of Knowledge in Society & Price Signals',
        content: 'In his famous 1945 essay "The Use of Knowledge in Society", Hayek explained that economic knowledge is dispersed across millions of individuals. No central government planning board can ever possess all the localized, rapidly changing facts necessary to set prices and allocate resources efficiently.',
        bulletPoints: [
          'Prices act as dynamic radio signals telling producers when goods are scarce or abundant without anyone being in central command.',
          'Attempts to centrally fix prices create artificial shortages, rationing lines, and black markets.'
        ]
      },
      {
        heading: 'The Road to Serfdom & Spontaneous Order',
        content: 'Hayek warned in 1944 that central economic planning inevitably concentrates coercive power in the hands of the state, eroding democratic freedoms and leading to authoritarian rule.',
      }
    ],
    famousQuote: {
      quote: 'The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design.',
      source: 'The Fatal Conceit (1988)'
    },
    keyWorks: [
      'The Road to Serfdom (1944)',
      'The Use of Knowledge in Society (1945)',
      'The Constitution of Liberty (1960)',
      'Law, Legislation and Liberty (1973–1979)'
    ],
    legacy: 'Hayek\'s ideas profoundly shaped late 20th-century economic policies, inspiring Margaret Thatcher, Ronald Reagan, and the revival of market-oriented economic reforms globally.',
    associatedIdeologies: ['Classical Liberalism', 'Neoliberalism', 'Libertarianism', 'Austrian Economics'],
    simpleEverydayWorking: {
      headline: 'How Hayek\'s Price Signals Work in Everyday Life',
      analogy: 'If a frost destroys half the orange groves in Florida, orange juice prices rise immediately at grocery stores. Nobody needed a government committee to tell people to buy fewer oranges or drink apple juice instead—the higher price naturally and effortlessly coordinated millions of shoppers.',
      takeaway: 'Market prices communicate millions of pieces of hidden information faster than any government computer or committee ever could.'
    }
  },

  'john-stuart-mill': {
    id: 'john-stuart-mill',
    title: 'John Stuart Mill',
    subtitle: 'English Philosopher, Political Economist & Advocate of Free Speech and Individual Liberty',
    type: 'figure',
    eraOrPeriod: 'Victorian Era (19th Century)',
    region: 'England, United Kingdom',
    birthDeathOrDates: '20 May 1806 – 8 May 1873',
    summary: 'John Stuart Mill was an English philosopher, political economist, and civil servant. One of the most influential thinkers in the history of classical liberalism, he contributed widely to social theory, political theory, and political economy. He is famous for formulating the "Harm Principle" in his 1859 treatise "On Liberty", advocating for freedom of speech and the total emancipation of women.',
    infobox: [
      { label: 'Born', value: '20 May 1806, Pentonville, London' },
      { label: 'Died', value: '8 May 1873 (aged 66), Avignon, France' },
      { label: 'Era', value: '19th-century philosophy' },
      { label: 'School', value: 'Utilitarianism, Classical Liberalism' },
      { label: 'Main Interests', value: 'Ethics, Political philosophy, Economics, Women\'s suffrage' },
      { label: 'Notable Ideas', value: 'The Harm Principle, Marketplace of ideas, Qualitative utilitarianism, The Subjection of Women' }
    ],
    tableOfContents: ['On Liberty & The Harm Principle', 'Freedom of Speech & The Marketplace of Ideas', 'Utilitarianism Refined', 'The Subjection of Women', 'Legacy', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'The Harm Principle (On Liberty, 1859)',
        content: 'Mill formulated the foundational rule of liberal tolerance: the only purpose for which power can be rightfully exercised over any member of a civilized community, against their will, is to prevent harm to others. An individual\'s own good, either physical or moral, is not a sufficient warrant for state coercion.',
      },
      {
        heading: 'Freedom of Speech & The Marketplace of Ideas',
        content: 'Mill argued that censoring even the most unpopular or offensive opinions damages society. If the silenced opinion is right, society loses truth; if it is wrong, society loses the clearer perception and livelier impression of truth produced by its collision with error.',
      },
      {
        heading: 'The Subjection of Women (1869)',
        content: 'Co-authored with his wife Harriet Taylor Mill, he championed complete legal, social, and political equality for women, becoming the first MP in the British Parliament to introduce a bill for women\'s suffrage.'
      }
    ],
    famousQuote: {
      quote: 'Over himself, over his own body and mind, the individual is sovereign.',
      source: 'On Liberty (1859)'
    },
    keyWorks: [
      'On Liberty (1859)',
      'Utilitarianism (1861)',
      'The Subjection of Women (1869)',
      'Principles of Political Economy (1848)'
    ],
    legacy: 'Mill established the modern legal boundaries of individual autonomy, free speech jurisprudence, and feminist political theory.',
    associatedIdeologies: ['Liberalism', 'Social Liberalism', 'Utilitarianism', 'Feminism'],
    simpleEverydayWorking: {
      headline: 'How Mill\'s Harm Principle Works in Everyday Life',
      analogy: 'If you choose to wear eccentric clothes, eat sugary snacks, or read strange books in your living room, the police cannot stop you because you aren\'t hurting anyone else. But the moment you start swinging a stick near someone\'s face, your freedom ends right where their nose begins.',
      takeaway: 'You have total freedom to live however you want, right up until your actions physically harm another person.'
    }
  },

  'jean-jacques-rousseau': {
    id: 'jean-jacques-rousseau',
    title: 'Jean-Jacques Rousseau',
    subtitle: 'Genevan Philosopher, Writer & Composer • Architect of the Social Contract & Popular Sovereignty',
    type: 'figure',
    eraOrPeriod: 'Age of Enlightenment',
    region: 'Geneva / France',
    birthDeathOrDates: '28 June 1712 – 2 July 1778',
    summary: 'Jean-Jacques Rousseau was a Genevan philosopher, writer, and composer whose political philosophy influenced the progress of the Enlightenment throughout Europe, as well as aspects of the French Revolution and the development of modern political, economic, and educational thought.',
    infobox: [
      { label: 'Born', value: '28 June 1712, Geneva, Republic of Geneva' },
      { label: 'Died', value: '2 July 1778 (aged 66), Ermenonville, France' },
      { label: 'Era', value: '18th-century philosophy (Enlightenment)' },
      { label: 'School', value: 'Social Contract, Romanticism, Republicanism' },
      { label: 'Main Interests', value: 'Political philosophy, Education, Music, Ethics' },
      { label: 'Notable Ideas', value: 'The General Will, Noble savage, Popular sovereignty, Civic religion' }
    ],
    tableOfContents: ['The Social Contract', 'The General Will vs. Will of All', 'Discourse on Inequality', 'Legacy on the French Revolution', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'The Social Contract (1762)',
        content: 'Rousseau opened his famous work with the immortal line: "Man is born free, and everywhere he is in chains." He argued that legitimate political authority comes only from a social contract agreed upon by all citizens for their mutual preservation, creating the "General Will".',
      },
      {
        heading: 'The General Will & Direct Popular Sovereignty',
        content: 'Rousseau believed that citizens must actively participate in making laws directly, rather than electing distant representatives. The General Will represents the common collective interest of the whole community over selfish private factions.',
      }
    ],
    famousQuote: {
      quote: 'Man is born free, and everywhere he is in chains. One thinks himself the master of others, and still remains a greater slave than they.',
      source: 'The Social Contract (1762)'
    },
    keyWorks: [
      'The Social Contract (1762)',
      'Discourse on Inequality (1755)',
      'Émile, or On Education (1762)',
      'Confessions (1782)'
    ],
    legacy: 'Rousseau\'s concepts of popular sovereignty and democratic collective will directly sparked the French Revolution and inspired modern republican democracy.',
    associatedIdeologies: ['Direct Democracy', 'Civic Republicanism', 'Socialism', 'Romantic Nationalism'],
    simpleEverydayWorking: {
      headline: 'How Rousseau\'s General Will Works in Everyday Life',
      analogy: 'Imagine a camping trip with 10 friends. One person wants to play loud music all night, but everyone agrees that keeping quiet after 10 PM allows everyone to sleep well and hike tomorrow. Submitting to this shared rule makes everyone freer and happier than having chaos.',
      takeaway: 'True freedom isn\'t doing whatever selfish impulse strikes you, but obeying rules that everyone created together for the common good.'
    }
  },

  'henry-george': {
    id: 'henry-george',
    title: 'Henry George',
    subtitle: 'American Political Economist & Journalist • "Father of Georgism & Land Value Tax"',
    type: 'figure',
    eraOrPeriod: 'Gilded Age (19th Century)',
    region: 'United States',
    birthDeathOrDates: '2 September 1839 – 29 October 1897',
    summary: 'Henry George was an American political economist and journalist whose 1879 book "Progress and Poverty" sold millions of copies worldwide and sparked the "Single Tax" movement. George sought to solve the paradox of why economic progress causes deeper poverty and inequality.',
    infobox: [
      { label: 'Born', value: '2 September 1839, Philadelphia, Pennsylvania' },
      { label: 'Died', value: '29 October 1897 (aged 58), New York City' },
      { label: 'Era', value: '19th-century political economy' },
      { label: 'School', value: 'Georgism, Classical Political Economy' },
      { label: 'Main Interests', value: 'Land economics, Free trade, Poverty alleviation, Urban development' },
      { label: 'Notable Ideas', value: 'Land Value Tax (LVT), Single Tax, Common heritage of natural resources, Citizen\'s Dividend' }
    ],
    tableOfContents: ['Progress and Poverty', 'The Land Monopoly Problem', 'The Single Tax Solution', 'The Citizen\'s Dividend', 'Legacy', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'Progress and Poverty (1879)',
        content: 'George pointed out that as cities grow and technology advances, the value of land skyrockets. Because land is fixed in supply, private landlords capture this unearned windfall (economic rent), driving up rents and leaving workers and entrepreneurs impoverished despite higher productivity.',
      },
      {
        heading: 'The Land Value Tax (LVT) Solution',
        content: 'George proposed taxing 100% of the unimproved rental value of land while abolishing all taxes on income, labor, sales, and buildings. This eliminates land speculation, encourages construction, and funds public services without burdening workers.',
      }
    ],
    famousQuote: {
      quote: 'We must make land common property... What I, therefore, propose is to appropriate rent by taxation.',
      source: 'Progress and Poverty (1879)'
    },
    keyWorks: [
      'Progress and Poverty (1879)',
      'Social Problems (1883)',
      'Protection or Free Trade (1886)',
      'The Science of Political Economy (1898)'
    ],
    legacy: 'Inspired the modern urban planning movement, the board game Monopoly (originally The Landlord\'s Game), and Nobel laureates from Milton Friedman to Joseph Stiglitz.',
    associatedIdeologies: ['Georgism', 'Geolibertarianism', 'Social Liberalism', 'Market Socialism'],
    simpleEverydayWorking: {
      headline: 'How Henry George\'s Land Tax Works in Everyday Life',
      analogy: 'If you buy an empty dirt lot in downtown New York in 1900 and do nothing for 50 years, the lot becomes worth $10 million—not because you worked hard, but because millions of other people built subways, schools, and shops around you. George argued that community-created land value belongs to the community, not the absentee speculator.',
      takeaway: 'Tax the unearned value of natural land locations, not the paychecks and sweat of working humans.'
    }
  },

  'pierre-joseph-proudhon': {
    id: 'pierre-joseph-proudhon',
    title: 'Pierre-Joseph Proudhon',
    subtitle: 'French Political Theorist & "Father of Anarchism"',
    type: 'figure',
    eraOrPeriod: '19th-Century Industrial Era',
    region: 'France',
    birthDeathOrDates: '15 January 1809 – 19 January 1865',
    summary: 'Pierre-Joseph Proudhon was a French libertarian socialist, printer, and political philosopher who was the first person to declare himself an "anarchist", transforming the term from a pejorative into an established political ideology. He founded Mutualism, an economic theory advocating worker credit unions, voluntary contracts, and possession based on occupancy and use.',
    infobox: [
      { label: 'Born', value: '15 January 1809, Besançon, France' },
      { label: 'Died', value: '19 January 1865 (aged 56), Paris, France' },
      { label: 'Era', value: '19th-century philosophy' },
      { label: 'School', value: 'Anarchism, Mutualism, Federalism' },
      { label: 'Main Interests', value: 'Political economy, Decentralization, Banking reform, Worker cooperatives' },
      { label: 'Notable Ideas', value: '"Property is theft!", Mutualism, People\'s Bank (zero-interest credit), Federalism' }
    ],
    tableOfContents: ['What is Property?', 'Mutualist Economic Model', 'Federalist Organization', 'Anarchist Anti-Statism', 'Historical Influence', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'What is Property? & "Property is Theft!"',
        content: 'In his landmark 1840 treatise "What is Property?", Proudhon coined his famous maxim. He drew a vital distinction between unearned capitalist "property" (rent, absentee ownership, interest) and personal "possession" (goods and tools actively used by the worker).',
      },
      {
        heading: 'Mutualism & The People\'s Bank',
        content: 'Proudhon proposed Mutualism: a society organized around voluntary exchange, equitable contracts, worker-owned cooperative enterprises, and free mutual credit supplied by a non-profit "People\'s Bank" with nominal administrative fees.',
      }
    ],
    famousQuote: {
      quote: 'Anarchy is order without power.',
      source: 'What is Property? (1840)'
    },
    keyWorks: [
      'What is Property? (1840)',
      'The System of Economic Contradictions (1846)',
      'The Principle of Federation (1863)'
    ],
    legacy: 'Proudhon laid the foundations of the global anarchist movement, deeply influencing Bakunin, Kropotkin, and cooperative credit unions worldwide.',
    associatedIdeologies: ['Anarchism', 'Mutualism', 'Libertarian Socialism', 'Syndicalism'],
    simpleEverydayWorking: {
      headline: 'How Proudhon\'s Mutualism Works in Everyday Life',
      analogy: 'A group of carpenters, bakers, and plumbers form a cooperative credit union where they lend each other money at 0% interest just to cover the cost of maintaining the ledger, trading their products through direct voluntary contracts without banks or government bureaucrats skimming off profits.',
      takeaway: 'Workers cooperating voluntarily without bosses, landlords, or government police telling them what to do.'
    }
  },

  'enlightenment-era': {
    id: 'enlightenment-era',
    title: 'The Age of Enlightenment',
    subtitle: '17th & 18th Century European Intellectual & Philosophical Movement',
    type: 'era',
    eraOrPeriod: 'c. 1685 – 1815 AD',
    region: 'Western Europe, Britain, France, Germany & The Americas',
    summary: 'The Enlightenment, or the "Age of Reason", was an intellectual and cultural movement in the 17th and 18th centuries that emphasized reason, scientific inquiry, individual liberty, and skepticism toward religious dogma and absolute monarchy. Originating in Western Europe, the Enlightenment challenged traditional authority and fostered the growth of constitutional governance, human rights declarations, separation of powers, and the scientific revolution.',
    infobox: [
      { label: 'Timeframe', value: 'Late 17th Century to Early 19th Century (1685–1815)' },
      { label: 'Core Values', value: 'Rationalism, Empiricism, Liberty, Toleration, Progress, Human Rights' },
      { label: 'Key Centers', value: 'Paris, London, Edinburgh, Berlin, Philadelphia, Amsterdam' },
      { label: 'Principal Thinkers', value: 'John Locke, Voltaire, Montesquieu, Rousseau, Kant, Adam Smith, Diderot' },
      { label: 'Historic Revolutions', value: 'American Revolution (1776), French Revolution (1789)' }
    ],
    tableOfContents: ['Philosophical Foundations', 'Political Theory & Separation of Powers', 'The Encyclopedia Project (Diderot)', 'Impact on Constitutional Revolutions', 'Long-term Civilizational Impact', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'Reason and the Scientific Method',
        content: 'Enlightenment thinkers posited that through empirical observation and rational thought, humanity could discover the natural laws governing both the physical universe (Newtonian physics) and human society, dismantling centuries of superstition and arbitrary tyranny.',
      },
      {
        heading: 'Political Governance & Human Rights',
        content: 'The era pioneered the social contract (Locke, Rousseau), constitutional separation of executive, legislative, and judicial powers (Montesquieu), and freedom of speech, conscience, and religious toleration (Voltaire, Spinoza).',
      }
    ],
    famousQuote: {
      quote: 'Sapere Aude! (Dare to know!) Have the courage to use your own understanding!',
      source: 'Immanuel Kant, "Answering the Question: What Is Enlightenment?" (1784)'
    },
    keyWorks: [
      'Locke\'s Two Treatises of Government (1689)',
      'Montesquieu\'s The Spirit of the Laws (1748)',
      'Diderot & d\'Alembert\'s Encyclopédie (1751–1772)',
      'Rousseau\'s The Social Contract (1762)'
    ],
    legacy: 'The Enlightenment laid the foundation for modern secular constitutional democracies, universal declarations of human rights, modern scientific institutions, and global rule of law.',
    associatedIdeologies: ['Liberalism', 'Classical Liberalism', 'Constitutionalism', 'Secularism', 'Progressivism'],
    simpleEverydayWorking: {
      headline: 'How the Enlightenment Shapes Your Everyday Life',
      analogy: 'Whenever you speak your mind without fear of being arrested for blasphemy, vote in a secret ballot, or receive a fair trial with a jury rather than an absolute king throwing you into a dungeon on a whim, you are living inside the inventions of the Enlightenment.',
      takeaway: 'Human reason, freedom of speech, and equal laws protect ordinary people from tyranny.'
    }
  },

  'industrial-revolution-era': {
    id: 'industrial-revolution-era',
    title: 'The Industrial Revolution',
    subtitle: 'Transition to Powered Manufacturing, Urbanization & Modern Economic Systems',
    type: 'era',
    eraOrPeriod: 'c. 1760 – 1840 (First) & 1870 – 1914 (Second)',
    region: 'Great Britain, Continental Europe, North America, Global',
    summary: 'The Industrial Revolution was the historic transition from agrarian, handicraft economies to ones dominated by mechanized industry and machine manufacturing. Beginning in Great Britain in the mid-18th century, it introduced steam power, textile machinery, iron metallurgy, railroads, and massive urbanization, fundamentally reshaping world social structures, labor dynamics, and political ideologies.',
    infobox: [
      { label: 'First Phase', value: 'c. 1760 – 1840 (Steam, Textiles, Iron, Canals)' },
      { label: 'Second Phase', value: 'c. 1870 – 1914 (Steel, Electricity, Petroleum, Chemicals, Assembly Line)' },
      { label: 'Origin', value: 'Great Britain (Midlands & North)' },
      { label: 'Key Inventions', value: 'Watt Steam Engine, Spinning Jenny, Power Loom, Bessemer Steel, Telegraph' },
      { label: 'Ideological Births', value: 'Socialism, Marxism, Anarchism, Trade Unionism, Social Liberalism' }
    ],
    tableOfContents: ['Technological Catalysts', 'Rise of the Factory System & Urbanization', 'Working Class Emergence & Labor Struggles', 'Rise of New Political Ideologies', 'Global Economic Transformation', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'Technological & Economic Transformation',
        content: 'The commercialization of the steam engine by James Watt and mechanized spinning and weaving revolutionized productivity. Rail networks and steamships created integrated national and international markets.',
      },
      {
        heading: 'Social Transformation & The Working Class',
        content: 'Millions of rural agricultural workers migrated to rapidly expanding industrial cities. Factory working conditions provoked the rise of trade unions, Chartist voting reform campaigns, and modern socialist political theory.',
      }
    ],
    famousQuote: {
      quote: 'Steam and machinery revolutionized industrial production. The place of manufacture was taken by the giant, Modern Industry.',
      source: 'The Communist Manifesto (1848)'
    },
    keyWorks: [
      'Adam Smith\'s The Wealth of Nations (1776)',
      'Friedrich Engels\' The Condition of the Working Class in England (1845)',
      'Karl Marx\'s Das Kapital (1867)'
    ],
    legacy: 'The Industrial Revolution created the modern economic and political landscape, establishing the conflict between market capitalism and labor rights that defines modern governance.',
    associatedIdeologies: ['Socialism', 'Marxism', 'Social Democracy', 'Anarcho-Syndicalism', 'Neoliberalism'],
    simpleEverydayWorking: {
      headline: 'How the Industrial Revolution Changed Daily Life',
      analogy: 'Before this era, almost everyone spent all day farming with wooden plows and sewing clothes by hand by candlelight. The Industrial Revolution created factories that could make thousands of warm shirts in an hour, but also created smoggy cities and 14-hour factory workdays that forced people to invent the 8-hour workday and weekend.',
      takeaway: 'Massive machine productivity made goods cheap and abundant, but sparked the modern fight for worker rights.'
    }
  },

  'classical-athens': {
    id: 'classical-athens',
    title: 'Classical Athenian Democracy',
    subtitle: 'Ancient Direct Democratic Governance & Birthplace of Western Political Philosophy',
    type: 'era',
    eraOrPeriod: '508 BC – 322 BC',
    region: 'Attica, Ancient Greece',
    summary: 'Classical Athens in the 5th and 4th centuries BC was a direct democratic city-state (polis) that pioneered direct citizen participation, the rule of law, rhetorical debate, and classical political philosophy. Instituted by Cleisthenes in 508 BC and flourishing under Pericles, Athenian democracy gave every adult male citizen the right to speak and vote directly in the Assembly (Ecclesia).',
    infobox: [
      { label: 'Established', value: '508 BC by Cleisthenes' },
      { label: 'Golden Age', value: 'Age of Pericles (461–429 BC)' },
      { label: 'Government', value: 'Direct Democracy (Isonomia - equality before the law)' },
      { label: 'Key Institutions', value: 'Ecclesia (Assembly), Boule (Council of 500), Dikasteria (People\'s Courts)' },
      { label: 'Philosophical Giants', value: 'Socrates, Plato, Aristotle, Thucydides' }
    ],
    tableOfContents: ['Cleisthenes\' Reforms', 'The Ecclesia & Sortition (Lottery)', 'Pericles\' Funeral Oration', 'Platonic & Aristotelian Critiques', 'Democratic Legacy', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'Institutions of Athenian Direct Democracy',
        content: 'Unlike modern representative republics, Athenian democracy was direct. Key magistrates and the Council of 500 were chosen by sortition (random lottery) to prevent elite aristocratic capture and bribery, while the Ecclesia met 40 times a year on the Pnyx hill to decide foreign policy, taxation, and laws.',
      }
    ],
    famousQuote: {
      quote: 'Our government does not copy our neighbours, but is an example to them. It is true that we are called a democracy, for the administration is in the hands of the many and not of the few.',
      source: 'Pericles\' Funeral Oration (Recorded by Thucydides, 431 BC)'
    },
    keyWorks: [
      'Thucydides\' History of the Peloponnesian War (c. 400 BC)',
      'Plato\'s Republic (c. 375 BC)',
      'Aristotle\'s Politics & Constitution of the Athenians (c. 330 BC)'
    ],
    legacy: 'Athenian democracy proved that free citizens could govern themselves through rational collective assembly, laying the philosophical archetype for all modern democratic theories.',
    associatedIdeologies: ['Direct Democracy', 'Classical Republicanism', 'Civic Republicanism', 'Liquid Democracy'],
    simpleEverydayWorking: {
      headline: 'How Direct Athenian Democracy Worked in Daily Life',
      analogy: 'Imagine if instead of electing a politician to congress for 4 years, you and all your neighbors met in the town square every month, debated whether to build a new bridge or go to war, and voted directly with a raise of hands, while the town mayor was picked from a bowl of lottery tickets.',
      takeaway: 'Direct rule by ordinary citizens without professional political middlemen.'
    }
  }
};

/**
 * Helper to retrieve or construct a dynamic Wikipedia entry for any historical figure or period
 */
export function getRelatedWikiEntry(idOrName: string, fallbackContext?: { name?: string; role?: string; ideology?: string }): RelatedWikiEntry {
  const normalizedKey = idOrName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  // Direct match
  if (RELATED_WIKI_ENTRIES[normalizedKey]) {
    return RELATED_WIKI_ENTRIES[normalizedKey];
  }

  // Partial match search in keys
  const foundKey = Object.keys(RELATED_WIKI_ENTRIES).find(k => k.includes(normalizedKey) || normalizedKey.includes(k));
  if (foundKey) {
    return RELATED_WIKI_ENTRIES[foundKey];
  }

  // Generate a complete dynamic Wikipedia-style profile for any historical figure or time period
  const displayName = fallbackContext?.name || idOrName;
  const roleText = fallbackContext?.role || 'Key Historical Architect & Political Theorist';
  const ideologyText = fallbackContext?.ideology || 'Political Philosophy';

  return {
    id: normalizedKey,
    title: displayName,
    subtitle: `${roleText} • Associated with ${ideologyText}`,
    type: 'figure',
    eraOrPeriod: 'Historical & Modern Governance Era',
    region: 'International / Global History',
    birthDeathOrDates: 'Historical Record',
    summary: `${displayName} was a prominent historical figure, theorist, and architect whose intellectual and political contributions helped shape ${ideologyText}. Through seminal writings, legislative governance, and public advocacy, ${displayName} contributed foundational concepts to human political philosophy, structural institutions, and statecraft.`,
    infobox: [
      { label: 'Name', value: displayName },
      { label: 'Role & Title', value: roleText },
      { label: 'Associated School', value: ideologyText },
      { label: 'Impact Domain', value: 'Political Philosophy, Governance, Jurisprudence, Socio-Economic Theory' },
      { label: 'Significance', value: 'Foundational architectural contributions to political thought and constitutional governance.' }
    ],
    tableOfContents: ['Biographical Overview', 'Core Philosophical Contributions', 'Political Impact & Governance', 'Major Works & Legacy', 'Everyday Real-World Application'],
    sections: [
      {
        heading: 'Biographical Overview & Historical Context',
        content: `${displayName} operated during a pivotal era in world history, analyzing the relationship between the individual, society, and state authority. Their work addressed crucial questions of justice, authority, individual rights, and the optimal organization of political communities.`,
        bulletPoints: [
          `Formulated foundational concepts associated with ${ideologyText}.`,
          'Engaged in contemporary debates regarding the balance of state power and civic liberty.',
          'Influenced subsequent generations of political scientists, constitutional lawyers, and statesmen.'
        ]
      },
      {
        heading: 'Core Philosophical & Structural Tenets',
        content: `As an architect within ${ideologyText}, ${displayName} emphasized institutional accountability, moral coherence, and the practical application of political theory to real-world governance challenges.`
      },
      {
        heading: 'Enduring Legacy & World Impact',
        content: `The theoretical frameworks and institutional insights developed by ${displayName} continue to inform contemporary debates surrounding political legitimacy, economic systems, and human freedom worldwide.`
      }
    ],
    famousQuote: {
      quote: `Liberty, justice, and good governance require the constant vigilance of informed citizens and the prudent design of institutional checks.`,
      source: `Historical Discourse on ${ideologyText}`
    },
    keyWorks: [
      `Foundations of ${ideologyText}`,
      `Treatise on Political Governance & Civic Order`,
      `Essays on Liberty and Statecraft`
    ],
    legacy: `Remembered as a foundational thinker whose ideas helped define modern perspectives on ${ideologyText} and governance systems.`,
    associatedIdeologies: [ideologyText],
    simpleEverydayWorking: {
      headline: `How ${displayName}'s Ideas Apply to Daily Life`,
      analogy: `In daily society, ${displayName}'s theories provide the rationale for how laws, individual duties, and community resources are organized under ${ideologyText}.`,
      takeaway: `Principles of ${displayName} continue to guide contemporary constitutional and political decisions.`
    }
  };
}
