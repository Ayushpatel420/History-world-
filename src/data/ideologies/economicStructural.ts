import { PoliticalIdeology } from '../../types';

export const ECONOMIC_STRUCTURAL_IDEOLOGIES: PoliticalIdeology[] = [
  {
    id: 'capitalism',
    name: 'Capitalism',
    category: 'Economic & Structural Systems',
    tagline: 'Private ownership of the means of production, voluntary exchange, and capital accumulation.',
    definition: 'An economic system based on the private ownership of the means of production and their operation for profit. Central characteristics include private property, capital accumulation, wage labor, voluntary exchange, a price system, and competitive markets.',
    historicalOrigins: 'Emerged from merchant trade in Renaissance Italy and the Netherlands; formalized by Adam Smith in The Wealth of Nations (1776).',
    coreTenets: [
      'Private property rights and voluntary contractual agreements enforced by the rule of law',
      'Price mechanism driven by supply and demand allocating capital efficiently ("Invisible Hand")',
      'Incentive structures: profit motive fuels innovation, entrepreneurship, and productivity growth',
      'Consumer sovereignty: market demand directs what goods and services are produced'
    ],
    keyThinkers: ['Adam Smith', 'David Ricardo', 'Joseph Schumpeter (Creative Destruction)', 'Milton Friedman', 'F.A. Hayek'],
    realWorldExamples: [
      {
        title: 'Industrial Revolution & Modern Global Economy',
        periodOrLocation: '1760–Present (Global)',
        description: 'Transformed world living standards, lifted billions out of extreme poverty, and drove technological breakthroughs in medicine, computing, and transport.'
      },
      {
        title: 'Silicon Valley Innovation Ecosystem',
        periodOrLocation: '1970s–Present (California, USA)',
        description: 'Venture capital financing and market competition creating global technology leaders (Apple, Google, Nvidia).'
      }
    ],
    economicModel: 'Private enterprises, decentralized market pricing, stock exchanges, venture capital, flexible wage labor.',
    viewOfState: 'Varies from minimalist "night-watchman" state to regulatory state protecting property rights, contracts, and market competition.',
    criticisms: [
      'Tends toward significant wealth inequality, corporate monopolies, and speculative financial bubbles (e.g., 1929, 2008)',
      'Underprices ecological externalities like carbon emissions and resource depletion'
    ],
    keyTextsOrManifestos: ['The Wealth of Nations (Adam Smith)', 'Capitalism and Freedom (Milton Friedman)', 'Capitalism, Socialism and Democracy (Joseph Schumpeter)'],
    spectrumPlacement: 'Economic Center-Right to Right Market System',
    iconSymbol: '📈💼'
  },
  {
    id: 'mercantilism',
    name: 'Mercantilism',
    category: 'Economic & Structural Systems',
    tagline: 'National wealth accumulation through trade surpluses, gold reserves, and protectionist state power.',
    definition: 'An economic policy designed to maximize a nation\'s exports and minimize its imports, promoting imperialism, colonialism, tariffs, and subsidies on traded goods to amass bullion (gold and silver) and geopolitical power.',
    historicalOrigins: 'Dominant economic school of thought in Europe from the 16th to the late 18th century (Jean-Baptiste Colbert in France, British Navigation Acts).',
    coreTenets: [
      'Bullionism: national wealth is measured by the total reserves of gold and silver held by the state',
      'Zero-sum trade: trade is a geopolitical contest where one nation\'s gain is another\'s loss',
      'Favorable balance of trade: exports must always exceed imports via high protective tariffs',
      'Colonial exploitation: colonies exist solely to supply raw materials and purchase manufactured goods from the mother country'
    ],
    keyThinkers: ['Jean-Baptiste Colbert', 'Thomas Mun', 'Antonio Serra', 'Alexander Hamilton (American manufacturing mercantilism)'],
    realWorldExamples: [
      {
        title: 'Colbertism in 17th-Century France',
        periodOrLocation: '1661–1683 (France)',
        description: 'Jean-Baptiste Colbert established state royal manufactures (Gobelins, Saint-Gobain), built royal canals, and subsidized French merchant fleets.'
      },
      {
        title: 'British Navigation Acts & East India Company Monopoly',
        periodOrLocation: '1651–1849 (British Empire)',
        description: 'Mandated all colonial trade be carried exclusively on British ships, ensuring trade profits enriched London.'
      }
    ],
    economicModel: 'High import tariffs, export subsidies, state-chartered trade monopolies, colonial raw-material extraction.',
    viewOfState: 'The supreme director of national commerce whose goal is state wealth, imperial power, and military strength.',
    criticisms: [
      'Dismantled by classical economists (Adam Smith, David Ricardo) who proved mutually beneficial trade and comparative advantage create far greater wealth',
      'Sparked frequent colonial wars, smuggling, and contributed directly to the American Revolution'
    ],
    keyTextsOrManifestos: ['England\'s Treasure by Forraign Trade (Thomas Mun, 1664)', 'Report on Manufactures (Alexander Hamilton, 1791)'],
    spectrumPlacement: 'Statist Protectionist / Pre-Classical Nationalist',
    iconSymbol: '🚢💰'
  },
  {
    id: 'georgism',
    name: 'Georgism (Geoism / Land Value Tax)',
    category: 'Economic & Structural Systems',
    tagline: 'Private ownership of human labor; collective ownership of the value of land and natural resources.',
    definition: 'An economic philosophy and ideology based on the writings of Henry George, holding that people should own the value they produce themselves, but that the economic value of land and natural resources belongs equally to all members of society.',
    historicalOrigins: 'Formulated by Henry George in his 1879 worldwide bestseller Progress and Poverty; inspired early 20th-century tax reforms.',
    coreTenets: [
      'Single Tax: replace all taxes on income, labor, sales, and buildings with a 100% Land Value Tax (LVT)',
      'Land and natural resources are a common heritage belonging equally to all humanity',
      'Elimination of land speculation: taxing location value forces landowners to develop land efficiently or sell it',
      'Citizens\' Dividend: excess revenue from LVT distributed as a universal basic income to every citizen'
    ],
    keyThinkers: ['Henry George', 'Leo Tolstoy (passionate advocate)', 'Sun Yat-sen (Minsheng principle)', 'Milton Friedman (called LVT "the least bad tax")', 'Mason Gaffney'],
    realWorldExamples: [
      {
        title: 'Singapore Public Land Management & Development',
        periodOrLocation: '1965–Present (Singapore)',
        description: 'State owns 90% of land, capturing land value appreciation to fund world-class public housing (HDB) and infrastructure.'
      },
      {
        title: 'Pennsylvania Split-Rate Property Tax Cities (Pittsburgh, Allentown)',
        periodOrLocation: '20th Century (Pennsylvania, USA)',
        description: 'Taxed land at 5–6 times the rate of buildings, stimulating urban downtown construction without penalizing renovations.'
      },
      {
        title: 'Taiwan\'s Equalization of Land Rights (Sun Yat-sen Model)',
        periodOrLocation: '1950s–Present (Taiwan)',
        description: 'Applied Henry George\'s land value tax principles in rural and urban land reforms, preventing landlord speculation and fueling the Taiwan economic miracle.'
      }
    ],
    economicModel: 'Single Land Value Tax (LVT), abolition of income/sales/capital taxes, universal citizens\' dividend, natural resource royalties.',
    viewOfState: 'A trustee that collects land rent on behalf of all citizens and funds public goods and equal dividends.',
    criticisms: [
      'Debates over whether a single Land Value Tax alone is sufficient to fund modern comprehensive welfare states',
      'Valuation challenges in precisely separating the unimproved value of land from improvements built upon it'
    ],
    keyTextsOrManifestos: ['Progress and Poverty (Henry George, 1879)', 'The Land Question (Henry George)', 'The Three Principles of the People (Sun Yat-sen)'],
    spectrumPlacement: 'Radical Center / Classical Liberal Egalitarian',
    iconSymbol: '🌍🏙️'
  },
  {
    id: 'distributism',
    name: 'Distributism',
    category: 'Economic & Structural Systems',
    tagline: 'Widespread private property ownership: "Three acres and a cow" for every family.',
    definition: 'An economic philosophy developed in the late 19th and early 20th centuries by Catholic thinkers G.K. Chesterton and Hilaire Belloc, based on Catholic social teaching, holding that productive property should be owned as widely as possible among families rather than concentrated in the hands of the state or big monopolies.',
    historicalOrigins: 'Inspired by Pope Leo XIII\'s papal encyclical Rerum Novarum (1891); popularized in Britain in the 1910s–1930s.',
    coreTenets: [
      'Widespread ownership: productive property (tools, land, shops) distributed among as many families as possible',
      'Rejection of both Monopoly Capitalism (plutocracy) and State Socialism (collectivism / "The Servile State")',
      'Subsidiarity: economic and political decision-making decentralized to families, guilds, and local communities',
      'Guilds and worker cooperatives replacing giant multinational corporations'
    ],
    keyThinkers: ['G.K. Chesterton', 'Hilaire Belloc', 'Father Vincent McNabb', 'Dorothy Day (Catholic Worker Movement)', 'E.F. Schumacher'],
    realWorldExamples: [
      {
        title: 'Mondragon Cooperative Corporation in the Basque Country',
        periodOrLocation: '1956–Present (Spain)',
        description: 'Founded by Catholic priest José María Arizmendiarrieta, now the world\'s largest worker-owned cooperative network with over 80,000 worker-owners.'
      },
      {
        title: 'Catholic Worker Movement (Dorothy Day & Peter Maurin)',
        periodOrLocation: '1933–Present (USA)',
        description: 'Established hospitality houses, urban soup kitchens, and rural farming communes practicing voluntary poverty and distributist mutual aid.'
      }
    ],
    economicModel: 'Small family businesses, artisan workshops, credit unions, worker cooperatives, anti-trust breakups of mega-corporations.',
    viewOfState: 'A decentralized, limited constitutional state that breaks up corporate and banking monopolies to protect family ownership.',
    criticisms: [
      'Struggles to compete in modern capital-intensive industries (e.g., microchip fabrication, aerospace) requiring massive capital concentration',
      'Accused of romanticizing pre-industrial guild life'
    ],
    keyTextsOrManifestos: ['The Servile State (Hilaire Belloc)', 'The Outline of Sanity (G.K. Chesterton)', 'Small Is Beautiful (E.F. Schumacher)'],
    spectrumPlacement: 'Catholic Communitarian / Third Way Economic',
    iconSymbol: '🏡🐄'
  },
  {
    id: 'corporatism',
    name: 'Corporatism',
    category: 'Economic & Structural Systems',
    tagline: 'Organization of society into corporate interest groups (labor, employers, agriculturalists) cooperating for national harmony.',
    definition: 'A political and economic system of interest representation and policy making in which corporate groups (such as agricultural, business, ethnic, labor, military, or religious groups) negotiate and coordinate with the state to achieve social order and economic coordination.',
    historicalOrigins: 'Medieval guild systems, Catholic social teaching (Quadragesimo Anno), interwar European regimes, and post-war Nordic social partnership.',
    coreTenets: [
      'Society viewed as an organic body where different organs (social classes and professions) cooperate in harmony',
      'Tripartite bargaining: regular institutional negotiations between organized business, trade unions, and the state',
      'Rejection of both unfettered laissez-faire class conflict and Marxist class warfare',
      'Variants: Authoritarian/Fascist Corporatism (state-controlled) vs. Democratic Neo-Corporatism (voluntary Nordic model)'
    ],
    keyThinkers: ['Pope Pius XI (Quadragesimo Anno)', 'Émile Durkheim', 'Othmar Spann', 'Philippe C. Schmitter (Neo-Corporatism)'],
    realWorldExamples: [
      {
        title: 'Nordic Tripartite Social Partnership (Saltsjöbaden & Danish Flexicurity)',
        periodOrLocation: '1938–Present (Sweden, Denmark, Norway)',
        description: 'Annual nationwide negotiations between centralized employer federations and trade union confederations setting wages and work standards peacefully.'
      },
      {
        title: 'Austrian Social Partnership (Sozialpartnerschaft)',
        periodOrLocation: '1957–Present (Austria)',
        description: 'Parity Commission of business and labor chambers maintaining high social cohesion, low strike rates, and stable inflation.'
      }
    ],
    economicModel: 'Centralized collective wage bargaining, sectoral vocational councils, tripartite economic planning boards.',
    viewOfState: 'The supreme arbitrator and guarantor of social peace among competing economic functional groups.',
    criticisms: [
      'Democratic Neo-Corporatism can create insider-outsider labor dynamics and resist disruptive entrepreneurial innovation',
      'Authoritarian variants historically destroyed independent unions and suppressed worker strikes'
    ],
    keyTextsOrManifestos: ['Quadragesimo Anno (Pope Pius XI, 1931)', 'The Division of Labor in Society (Durkheim)', 'Still the Century of Corporatism? (Philippe Schmitter)'],
    spectrumPlacement: 'Center-Left Democratic (Nordic) to Far-Right Authoritarian',
    iconSymbol: '🤝🏛️'
  },
  {
    id: 'dirigisme',
    name: 'Dirigisme (State-Directed Economy)',
    category: 'Economic & Structural Systems',
    tagline: 'State planning, national champion corporations, and strategic investment within a capitalist market.',
    definition: 'An economic system where the state exerts a strong directive influence over investment and industrial policy, using indicative planning, state-owned enterprises, and national champions without completely abolishing private property or market competition.',
    historicalOrigins: 'Post-WWII France during the "Trente Glorieuses" (Thirty Glorious Years 1945–1975) under Charles de Gaulle and Jean Monnet.',
    coreTenets: [
      'Indicative National Planning (Commissariat général du Plan) setting 5-year strategic modernization goals',
      'State backing of "National Champions" in strategic high-tech sectors (nuclear, aerospace, high-speed rail, telecommunications)',
      'Technocratic elite civil service (École Nationale d\'Administration - ENA) managing public enterprise and finance',
      'Strategic nationalization of critical infrastructure (energy, transport, banking)'
    ],
    keyThinkers: ['Jean Monnet', 'Charles de Gaulle', 'Pierre Mendès France', 'Alexander Gerschenkron'],
    realWorldExamples: [
      {
        title: 'French High-Tech Grand Projects (TGV, Ariane Rocket, Concorde, EDF Nuclear)',
        periodOrLocation: '1950s–1980s (France)',
        description: 'State-directed engineering created the fastest passenger rail network in Europe, commercial space launch leadership, and complete nuclear energy independence.'
      },
      {
        title: 'The "Thirty Glorious Years" (Les Trente Glorieuses)',
        periodOrLocation: '1945–1975 (France)',
        description: 'Unprecedented period of 5%+ annual economic growth, full employment, and rapid standard-of-living rises.'
      }
    ],
    economicModel: 'Mixed economy, state investment banking (Caisse des Dépôts), state-subsidized R&D, strategic public monopolies.',
    viewOfState: 'The visionary architect and primary strategist of national technological and industrial modernization.',
    criticisms: [
      'Can lead to bureaucratic sclerosis, high public debt, and bailouts for inefficient national champions',
      'Challenged in the 1980s–1990s by European Union single-market competition rules and privatizations'
    ],
    keyTextsOrManifestos: ['Memoirs (Jean Monnet)', 'Economic Backwardness in Historical Perspective (Gerschenkron)'],
    spectrumPlacement: 'Center-Left to Gaullist State-Led Capitalism',
    iconSymbol: '🚄🚀'
  },
  {
    id: 'technocracy',
    name: 'Technocracy',
    category: 'Economic & Structural Systems',
    tagline: 'Governance by scientific, engineering, and technical experts based on data rather than politics.',
    definition: 'A system of governance in which decision-makers are selected on the basis of their expertise in their given area of responsibility, particularly with regard to scientific or technical knowledge, replacing political ideology with engineering optimization and objective data.',
    historicalOrigins: 'Coined in 1919 by William Henry Smyth; popular mass movement in the 1930s US led by Howard Scott (Technocracy Inc.) and Thorstein Veblen.',
    coreTenets: [
      'Technical decisions should be made by qualified scientists, engineers, and data specialists, not partisan politicians',
      'Energy Accounting: replacing money with thermodynamic energy units (Energy Certificates / Ergs) to balance production and consumption',
      'Elimination of waste, inefficiency, and political gridlock through algorithmic and scientific management',
      'Meritocratic testing and technical qualifications for public administrative office'
    ],
    keyThinkers: ['Thorstein Veblen', 'Howard Scott', 'William Henry Smyth', 'Saint-Simon', 'Marion King Hubbert (Peak Oil theorist)'],
    realWorldExamples: [
      {
        title: 'Technocracy Movement in 1930s North America',
        periodOrLocation: '1932–1940 (USA & Canada)',
        description: 'Advocated a "Technate of North America" running on total energy accounting and direct industrial engineering optimization.'
      },
      {
        title: 'Modern Central Bank Technocracy (Federal Reserve, ECB) & Tech Regulators',
        periodOrLocation: 'Modern Era (Global)',
        description: 'Independent expert panels managing monetary policy, pharmaceutical approval (FDA, EMA), and nuclear safety insulated from partisan elections.'
      }
    ],
    economicModel: 'Thermodynamic energy distribution, scientific resource allocation, expert-directed infrastructure grids.',
    viewOfState: 'A functionally integrated industrial apparatus engineered for maximum efficiency and standard of living.',
    criticisms: [
      'Fundamentally anti-democratic: removes power from the citizens and creates an unaccountable ruling caste of experts',
      'Treats complex human moral values, culture, and ethics purely as engineering optimization problems'
    ],
    keyTextsOrManifestos: ['The Engineers and the Price System (Thorstein Veblen)', 'Technocracy Study Course (Howard Scott & M. King Hubbert)'],
    spectrumPlacement: 'Non-Ideological Scientific / Technocratic Axis',
    iconSymbol: '⚙️🔬'
  },
  {
    id: 'state-capitalism',
    name: 'State Capitalism',
    category: 'Economic & Structural Systems',
    tagline: 'State-owned commercial enterprise, sovereign wealth funds, and market competition directed by the state.',
    definition: 'An economic system in which the state undertakes commercial, for-profit economic activity and where the means of production are organized and managed as state-owned enterprises (including the processes of capital accumulation, wage labor, and centralized management), or where there is otherwise a dominance of state-owned business corporations.',
    historicalOrigins: 'Lenin\'s New Economic Policy (1921); modern model pioneered by Singapore (Temasek) and 21st-century China.',
    coreTenets: [
      'The state controls majority equity in strategic commanding heights (energy, telecom, banking, transport)',
      'State-Owned Enterprises (SOEs) operate in commercial markets and international trade for profit',
      'Sovereign Wealth Funds (SWFs) investing public capital across global equity and real estate markets',
      'Political power remains firmly in state hands while harnessing market dynamics'
    ],
    keyThinkers: ['Vladimir Lenin (NEP formulation)', 'Lee Kuan Yew', 'Ian Bremmer (The End of the Free Market)'],
    realWorldExamples: [
      {
        title: 'People\'s Republic of China (Socialist Market Economy / State Capitalism)',
        periodOrLocation: '1978–Present (China)',
        description: 'SASAC oversees 90+ mega-state enterprises (State Grid, Sinopec, China Mobile) controlling banking, telecom, and energy alongside a dynamic private tech market.'
      },
      {
        title: 'Singapore Sovereign Wealth Model (Temasek & GIC)',
        periodOrLocation: '1974–Present (Singapore)',
        description: 'State holding companies manage over $1 trillion in global assets, delivering high returns to fund public reserves without political corruption.'
      },
      {
        title: 'Gulf Sovereign Wealth Funds (Norway GPFG, Saudi PIF, UAE ADIA)',
        periodOrLocation: 'Modern Era (Global)',
        description: 'Directing hundreds of billions of oil export capital into global green tech, sports, AI, and infrastructure.'
      }
    ],
    economicModel: 'State-owned enterprises, sovereign wealth funds, state development banks, mixed private-public joint ventures.',
    viewOfState: 'The supreme capitalist entrepreneur and economic strategist safeguarding national power.',
    criticisms: [
      'Unfair competition against private firms due to state subsidies, cheap state bank loans, and regulatory favoritism',
      'Can foster state corruption, lack of transparency, and politicized corporate decisions'
    ],
    keyTextsOrManifestos: ['The End of the Free Market (Ian Bremmer)', 'State Capitalism: How the Return of Statism is Transforming the World (Joshua Kurlantzick)'],
    spectrumPlacement: 'Statist Market / Authoritarian State Capitalism',
    iconSymbol: '🏛️📈'
  },
  {
    id: 'feudalism',
    name: 'Feudalism (Manorialism)',
    category: 'Economic & Structural Systems',
    tagline: 'Hereditary land tenure, lord-vassal oaths, and serfdom in exchange for military protection.',
    definition: 'A medieval socio-political and economic system characterized by reciprocal military, legal, and economic obligations among the nobility, centered on three key concepts: lords, vassals, and fiefs (land granted in exchange for military service).',
    historicalOrigins: 'Medieval Europe following the collapse of the Western Roman Empire (9th–15th centuries); parallel systems in Feudal Japan (Shogunate/Samurai).',
    coreTenets: [
      'Fief (Land Tenure): land held by a vassal from a lord in exchange for homage, fealty, and military knight service',
      'Manorialism / Serfdom: peasant serfs legally bound to the land, providing agricultural labor and crop tribute to the lord in exchange for protection',
      'Decentralized sovereignty: justice and law administered privately in the lord\'s manorial court',
      'Rigid Three Estates hierarchy: Those who pray (Clergy), Those who fight (Nobility), Those who work (Peasantry)'
    ],
    keyThinkers: ['Marc Bloch', 'François-Louis Ganshof', 'Saint Thomas Aquinas (feudal social order analysis)'],
    realWorldExamples: [
      {
        title: 'High Medieval Feudal Kingdom of France & England',
        periodOrLocation: '1066–1350 (Western Europe)',
        description: 'William the Conqueror compiled the Domesday Book (1086), dividing all English land among Norman baronial vassals bound by military service.'
      },
      {
        title: 'Tokugawa Shogunate in Feudal Japan',
        periodOrLocation: '1603–1868 (Japan)',
        description: 'Shogun ruled over Daimyo (feudal lords) and Samurai warriors, with peasants legally bound to rice farming.'
      }
    ],
    economicModel: 'Manorial agriculture, open-field strip farming, serf unfree labor, self-sufficient local manors, craft guilds.',
    viewOfState: 'A fragmented pyramid of personal contractual oaths and feudal allegiances rather than a centralized modern nation-state.',
    criticisms: [
      'Extreme exploitation, lack of human freedom, and bound serfdom for the vast majority of the population',
      'Endemic private baronial warfare, lack of central law and order, and severe economic stagnation'
    ],
    keyTextsOrManifestos: ['Feudal Society (Marc Bloch)', 'Domesday Book (1086)', 'Magna Carta (1215 - baronial rights)'],
    spectrumPlacement: 'Medieval Traditionalist / Pre-Modern Hierarchy',
    iconSymbol: '🏰⚔️'
  },
  {
    id: 'communitarianism',
    name: 'Communitarianism',
    category: 'Economic & Structural Systems',
    tagline: 'Prioritizing community solidarity, shared moral bonds, and civic responsibility over hyper-individualism.',
    definition: 'A philosophy that emphasizes the connection between the individual and the community. Its overriding philosophy is based on the belief that a person\'s social identity and personality are largely molded by community relationships, with a smaller degree of development being placed on individualism.',
    historicalOrigins: 'Formulated in the 1980s by political philosophers (Michael Sandel, Charles Taylor, Amitai Etzioni) in response to John Rawls\'s liberal individualism.',
    coreTenets: [
      'Rejection of the "unencumbered self": individuals are embedded in families, neighborhoods, and historical traditions',
      'Balancing rights with civic responsibilities: no right without an accompanying moral responsibility',
      'Strengthening civil society institutions: families, schools, religious communities, local voluntary clubs',
      'Shared moral culture and common good prioritized over neutral atomized consumer choice'
    ],
    keyThinkers: ['Amitai Etzioni', 'Michael Sandel', 'Charles Taylor', 'Alasdair MacIntyre', 'Michael Walzer'],
    realWorldExamples: [
      {
        title: 'The Communitarian Network & Responsive Communitarian Platform',
        periodOrLocation: '1990–Present (Washington & Global)',
        description: 'Amitai Etzioni published the Communitarian Platform, influencing Third Way policies, community policing, and character education in schools.'
      },
      {
        title: 'Kibbutzim and Moshavim in Israel',
        periodOrLocation: '20th Century (Israel)',
        description: 'Intentional agricultural communities founded on communal child-rearing, shared property, and collective democratic dining halls.'
      }
    ],
    economicModel: 'Stakeholder capitalism, community land trusts, cooperative credit unions, strong support for family leave and public parks.',
    viewOfState: 'A supportive partner of civil society that nurtures moral character, civic virtue, and local community bonds.',
    criticisms: [
      'Liberals argue communitarianism can enforce suffocating social conformism and suppress individual non-conformity and minority lifestyles',
      'Debates over whose "community values" get enforced in diverse pluralistic cities'
    ],
    keyTextsOrManifestos: ['The Spirit of Community (Amitai Etzioni)', 'Liberalism and the Limits of Justice (Michael Sandel)', 'After Virtue (Alasdair MacIntyre)'],
    spectrumPlacement: 'Centrist Communitarian / Civic Republican',
    iconSymbol: '🏘️🤝'
  }
];
