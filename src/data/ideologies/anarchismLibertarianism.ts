import { PoliticalIdeology } from '../../types';

export const ANARCHISM_LIBERTARIANISM_IDEOLOGIES: PoliticalIdeology[] = [
  {
    id: 'anarchism',
    name: 'Anarchism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Abolition of all involuntary hierarchies, coercive authority, and the state.',
    definition: 'A political philosophy and movement that is skeptical of all justifications for authority and seeks to abolish the state and all involuntary, coercive hierarchies in favor of voluntary associations and direct action.',
    historicalOrigins: 'Emerged as a coherent movement during the 19th-century European labor movement, though with roots in ancient Taoism and the Diggers of the English Civil War.',
    coreTenets: [
      'Rejection of state sovereignty and coercive laws',
      'Organization through voluntary federation and consensus',
      'Direct action and mutual aid as primary organizing principles',
      'Opposition to centralized economic and political dominance'
    ],
    keyThinkers: ['Pierre-Joseph Proudhon', 'Mikhail Bakunin', 'Peter Kropotkin', 'Emma Goldman', 'Errico Malatesta'],
    realWorldExamples: [
      {
        title: 'Revolutionary Catalonia & CNT-FAI',
        periodOrLocation: '1936–1939 (Spain)',
        description: 'Over 3 million workers collectivized factories, agriculture, and public utilities under worker council management during the Spanish Civil War.'
      },
      {
        title: 'Free Territory of Ukraine (Makhnovshchina)',
        periodOrLocation: '1918–1921 (Ukraine)',
        description: 'Nestor Makhno led a peasant-worker anarchist confederation defending free soviets against White and Bolshevik armies.'
      },
      {
        title: 'Autonomous Administration of North and East Syria (Rojava)',
        periodOrLocation: '2012–Present (Syria)',
        description: 'Democratic confederalist self-governance model inspired by Murray Bookchin with direct neighborhood communes.'
      }
    ],
    economicModel: 'Varies from collective worker self-management (syndicalism/communism) to non-usury mutual credit systems (mutualism).',
    viewOfState: 'The state is inherently violent, monopolizes violence, and exists primarily to defend elite class privileges; it must be dismantled.',
    criticisms: [
      'Questions regarding defense against organized imperial militaries',
      'Potential vulnerability to informal power imbalances without formal legal codification'
    ],
    keyTextsOrManifestos: ['What Is Property? (Proudhon)', 'God and the State (Bakunin)', 'The Conquest of Bread (Kropotkin)'],
    spectrumPlacement: 'Far-Left Libertarian / Anti-Authoritarian',
    iconSymbol: 'Ⓐ'
  },
  {
    id: 'anarcho-capitalism',
    name: 'Anarcho-Capitalism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Total privatization of all services, sovereign private property, and zero state.',
    definition: 'An individualist political philosophy advocating the elimination of centralized states in favor of a completely unregulated free market where all goods, services, security, arbitration, and law are provided privately.',
    historicalOrigins: 'Developed in the mid-20th century by Murray Rothbard synthesizing Austrian School economics with American individualist anarchist traditions.',
    coreTenets: [
      'Non-Aggression Principle (NAP) as the absolute ethical standard',
      'Absolute self-ownership and private property rights',
      'Private defense agencies (PDAs) and polycentric arbitration courts',
      'Total voluntary contractual exchange without public taxation'
    ],
    keyThinkers: ['Murray Rothbard', 'David D. Friedman', 'Hans-Hermann Hoppe', 'Gustave de Molinari', 'Walter Block'],
    realWorldExamples: [
      {
        title: 'Medieval Iceland Commonwealth (Free State)',
        periodOrLocation: '930–1262 AD (Iceland)',
        description: 'Frequently cited by market anarchists for its system of competing private chieftains (goðar) and privatized law enforcement without an executive branch.'
      },
      {
        title: 'Prospera ZEDE & Charter Private Cities',
        periodOrLocation: '2020–Present (Honduras & International)',
        description: 'Special economic jurisdictions operating under private dispute resolution and contractual common-law governance.'
      }
    ],
    economicModel: 'Pure laissez-faire capitalism, polycentric private currency/crypto, and private enterprise with zero tariffs, taxes, or regulations.',
    viewOfState: 'The state is an illegitimate criminal organization that derives its revenue through extortion (taxation) and violence.',
    criticisms: [
      'Risk of private warlordism or cartel monopolies controlling private security forces',
      'Extreme economic inequality and absence of safety nets for vulnerable populations'
    ],
    keyTextsOrManifestos: ['For a New Liberty: The Libertarian Manifesto (Rothbard)', 'The Machinery of Freedom (David Friedman)', 'Democracy: The God That Failed (Hoppe)'],
    spectrumPlacement: 'Right-Wing Anti-Statist / Extreme Market Libertarian',
    iconSymbol: '⚡'
  },
  {
    id: 'anarcho-communism',
    name: 'Anarcho-Communism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Stateless, moneyless, and classless society based on mutual aid and common ownership.',
    definition: 'Anarchist theory advocating the abolition of the state, capitalism, wage labor, and private property of the means of production, in favor of collective worker ownership and distribution: "From each according to ability, to each according to need."',
    historicalOrigins: 'Formulated in the Italian section of the First International (1870s) by Carlo Cafiero, Errico Malatesta, and famously systematized by Peter Kropotkin.',
    coreTenets: [
      'Common possession of all means of production and consumer goods',
      'Abolition of wage labor, currency, and commodity exchange',
      'Mutual aid and free association in decentralized communes',
      'Voluntary federalism replacing hierarchical governance'
    ],
    keyThinkers: ['Peter Kropotkin', 'Errico Malatesta', 'Alexander Berkman', 'Carlo Cafiero', 'Luigi Fabbri'],
    realWorldExamples: [
      {
        title: 'Paris Commune',
        periodOrLocation: '1871 (Paris, France)',
        description: 'Revolutionary municipal government establishing worker-administered cooperatives, abolition of conscription, and democratic recall.'
      },
      {
        title: 'Shinmin Autonomous Region (Korean Anarchist Federation)',
        periodOrLocation: '1929–1931 (Manchuria)',
        description: 'Kim Chwa-chin organized over two million Korean migrants into stateless cooperative communes before invasion by imperial Japan.'
      }
    ],
    economicModel: 'Gift economy, decentralized planning by communal assemblies, communal storehouses, and total decommodification.',
    viewOfState: 'The state is an instrument of class domination that cannot be reformed; it must be dissolved simultaneously with capital.',
    criticisms: [
      'Logistical complexity of allocating resources across global supply chains without price signals or central planning',
      'Potential free-rider friction without material incentives'
    ],
    keyTextsOrManifestos: ['The Conquest of Bread (Kropotkin)', 'Mutual Aid: A Factor of Evolution (Kropotkin)', 'The ABC of Anarchism (Berkman)'],
    spectrumPlacement: 'Far-Left Libertarian / Anti-Authoritarian Socialist',
    iconSymbol: '☭Ⓐ'
  },
  {
    id: 'anarcho-primitivism',
    name: 'Anarcho-Primitivism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Deconstruction of industrial civilization, technology, and returning to hunter-gatherer living.',
    definition: 'An anarchist critique of civilization and technological development, advocating a return to non-civilized, hunter-gatherer ways of life through de-industrialization and the abolition of division of labor.',
    historicalOrigins: 'Grew in the late 20th century through radical ecological currents and critiques of industrial alienation (Fifth Estate magazine, John Zerzan).',
    coreTenets: [
      'Civilization and agricultural sedentary life are root sources of hierarchy and domestication',
      'Division of labor and symbolic culture cause existential alienation',
      'Restoration of egalitarian hunter-gatherer tribal bands in harmony with the biosphere',
      'Rejection of mass technological mediation'
    ],
    keyThinkers: ['John Zerzan', 'Jacques Ellul', 'Fredy Perlman', 'John Moore', 'Kevin Tucker'],
    realWorldExamples: [
      {
        title: 'Indigenous Hunter-Gatherer Societies (San, Hadza)',
        periodOrLocation: 'Pre-history to Present (Southern & East Africa)',
        description: 'Exemplifies immediate-return egalitarian sharing economies without state machinery or specialized industrial apparatus.'
      }
    ],
    economicModel: 'Nomadic foraging, gift-sharing, subsistence hunting and gathering, zero division of labor or currency.',
    viewOfState: 'The state is the culmination of agricultural domestication and specialized coercive division of labor; both civilization and state must end.',
    criticisms: [
      'Cannot sustain current global human population levels without massive catastrophic depopulation',
      'Loss of modern medical, sanitation, and scientific life-saving achievements'
    ],
    keyTextsOrManifestos: ['Future Primitive (Zerzan)', 'Against His-story, Against Leviathan! (Perlman)', 'The Technological Society (Ellul)'],
    spectrumPlacement: 'Radical Green Anti-Civilization / Anti-Authoritarian',
    iconSymbol: '🌿'
  },
  {
    id: 'anarcho-syndicalism',
    name: 'Anarcho-Syndicalism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Revolutionary industrial trade unions as the vehicle to overthrow capitalism and manage society.',
    definition: 'A branch of anarchism that focuses on the industrial labor movement, using revolutionary trade unions (syndicates) and general strikes to abolish the state and run the economy through direct democratic worker management.',
    historicalOrigins: 'Developed in France (CGT) and Spain (CNT) in the late 19th and early 20th centuries during intense industrial labor struggles.',
    coreTenets: [
      'Industrial solidarity, wildcat strikes, and general strikes as revolutionary tools',
      'Worker democracy, direct management of factories and workplaces by syndicates',
      'Rejection of political parties, parliamentary elections, and political compromises',
      'Federal federation of industrial federations'
    ],
    keyThinkers: ['Rudolf Rocker', 'Émile Pouget', 'Fernand Pelloutier', 'Buenaventura Durruti', 'Noam Chomsky'],
    realWorldExamples: [
      {
        title: 'Confederación Nacional del Trabajo (CNT)',
        periodOrLocation: '1910–Present (Spain)',
        description: 'Millions-strong anarcho-syndicalist union that mobilized the Spanish Revolution of 1936, running transport, factories, and hospitals.'
      },
      {
        title: 'Industrial Workers of the World (IWW "Wobblies")',
        periodOrLocation: '1905–Present (North America & Global)',
        description: 'Radical "One Big Union" organizing all workers across race and industry with direct workplace action.'
      }
    ],
    economicModel: 'Self-managed worker enterprises coordinated by industrial syndicates, federation councils, and labor vouchers/needs distribution.',
    viewOfState: 'The state exists to defend capitalist property; unions must dismantle it through direct industrial seizure rather than legislation.',
    criticisms: [
      'Focus is heavily industrial and factory-centric, which poses challenges in modern service and gig economies',
      'Vulnerability of union federations to suppression by state militaries'
    ],
    keyTextsOrManifestos: ['Anarcho-Syndicalism: Theory and Practice (Rocker)', 'Direct Action (Pouget)', 'The General Strike (Big Bill Haywood)'],
    spectrumPlacement: 'Far-Left Libertarian / Revolutionary Labor',
    iconSymbol: '⚙️'
  },
  {
    id: 'agorism',
    name: 'Agorism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Achieving a free society through counter-economics and black/grey market civil disobedience.',
    definition: 'A radical libertarian political philosophy that seeks to abolish the state by expanding the "counter-economy"—peaceful, voluntary, underground black and grey markets (tax evasion, illicit mutual exchange) that starve the state of tax revenue.',
    historicalOrigins: 'Founded by Samuel Edward Konkin III in 1975 with the publication of the New Libertarian Manifesto.',
    coreTenets: [
      'Counter-economics: engaging in black and grey market trade to bypass state regulations and taxation',
      'Rejection of political action, elections, and party politics as legitimizing the state',
      'Expansion of alternative private crypto-currencies, barter, and unregistered freelance labor',
      'Gradual economic obsolescence of state authority'
    ],
    keyThinkers: ['Samuel Edward Konkin III', 'J. Neil Schulman', 'Wally Conger'],
    realWorldExamples: [
      {
        title: 'Decentralized P2P Crypto & Darknet Markets',
        periodOrLocation: '2010s–Present (Global)',
        description: 'Monero-based, encrypted, peer-to-peer decentralized escrow networks operating entirely outside state banking oversight.'
      }
    ],
    economicModel: 'Radical entrepreneurial free market, non-monopolistic private currencies, gray/black market voluntary enterprise.',
    viewOfState: 'The state is a parasitic bandit organization; direct electoral reform is futile, so it must be economically circumvented.',
    criticisms: [
      'High personal legal risk of participating in black-market activities',
      'Difficulty providing large-scale physical infrastructure without formal institutions'
    ],
    keyTextsOrManifestos: ['New Libertarian Manifesto (SEK3)', 'An Agorist Primer (SEK3)', 'Alongside Night (Schulman)'],
    spectrumPlacement: 'Radical Free-Market Anti-Statist',
    iconSymbol: '♟️'
  },
  {
    id: 'christian-anarchism',
    name: 'Christian Anarchism',
    category: 'Anarchism & Libertarianism',
    tagline: 'God is the only supreme authority; rejection of earthly states, militarism, and violence.',
    definition: 'A movement in political theology that grounds anarchism in the teachings of Jesus Christ, particularly the Sermon on the Mount, rejecting all earthly state authority, military allegiance, and coercive courts.',
    historicalOrigins: 'Formulated explicitly by Leo Tolstoy in the late 19th century and carried forward by Dorothy Day and the Catholic Worker Movement.',
    coreTenets: [
      'Absolute non-violence, pacifism, and turning the other cheek',
      'Rejection of state swearing of oaths, national flags, military conscription, and taxes funding war',
      'Radical voluntary poverty, hospitality houses, and feeding the destitute',
      '"Render unto God what is God\'s" interpreted as leaving nothing for Caesar'
    ],
    keyThinkers: ['Leo Tolstoy', 'Dorothy Day', 'Peter Maurin', 'Jacques Ellul', 'Ammon Hennacy'],
    realWorldExamples: [
      {
        title: 'Catholic Worker Movement',
        periodOrLocation: '1933–Present (Global)',
        description: 'Over 200 autonomous hospitality houses providing food, shelter, and pacifist anti-war resistance without state funding.'
      },
      {
        title: 'Tolstoyan Agrarian Communes',
        periodOrLocation: '1890s–1920s (Russia & Britain)',
        description: 'Self-sufficient pacifist agricultural communities adhering to vegetarianism, non-resistance, and manual labor.'
      }
    ],
    economicModel: 'Voluntary agrarian communalism, radical almsgiving, cooperative workshops, and abolition of usury.',
    viewOfState: 'The state relies on violence, war, and coercion—all of which contradict the Gospel; therefore Christians must withdraw participation.',
    criticisms: [
      'Strict pacifism leaves communities vulnerable to ruthless military conquerors',
      'Relies on deeply specific religious faith that is non-universal'
    ],
    keyTextsOrManifestos: ['The Kingdom of God Is Within You (Tolstoy)', 'The Long Loneliness (Dorothy Day)', 'Anarchy and Christianity (Ellul)'],
    spectrumPlacement: 'Religious Pacifist Anarchist / Left-Libertarian',
    iconSymbol: '✝Ⓐ'
  },
  {
    id: 'green-anarchism',
    name: 'Green Anarchism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Liberation of humanity and nature from industrial hierarchy and ecocide.',
    definition: 'An anarchist school of thought that places primary emphasis on environmental issues, animal liberation, and dismantling all social hierarchies that exploit both humans and the non-human biosphere.',
    historicalOrigins: 'Emerged from the 1960s-1970s counterculture, radical ecology, and Earth First! direct-action campaigns.',
    coreTenets: [
      'Total biocentric liberation and rejection of anthropocentric domination',
      'Direct action against corporate ecocide, deforestation, and industrial polluters',
      'Decentralized bioregional communities living within ecological carrying capacity',
      'Animal liberation and ethical veganism/permaculture'
    ],
    keyThinkers: ['Murray Bookchin (early)', 'Judi Bari', 'Derrick Jensen', 'John Clark', 'Gary Snyder'],
    realWorldExamples: [
      {
        title: 'Earth Liberation Front (ELF) & Earth First! Tree-Sits',
        periodOrLocation: '1980s–2000s (North America & Europe)',
        description: 'Decentralized ecological defense cells conducting non-violent industrial sabotage to halt old-growth logging.'
      }
    ],
    economicModel: 'Ecological gift economy, permaculture cooperatives, zero fossil-fuel extractive industries.',
    viewOfState: 'The state acts as an enforcer of corporate extractivism and environmental destruction; true sustainability requires stateless autonomy.',
    criticisms: [
      'Conflict between radical deep ecology factions and human developmental needs',
      'Sabotage tactics face heavy state anti-terrorist enforcement'
    ],
    keyTextsOrManifestos: ['Timber Wars (Judi Bari)', 'Post-Scarcity Anarchism (Bookchin)', 'Endgame (Jensen)'],
    spectrumPlacement: 'Radical Eco-Libertarian / Far-Left',
    iconSymbol: '🌱'
  },
  {
    id: 'individualist-anarchism',
    name: 'Individualist Anarchism',
    category: 'Anarchism & Libertarianism',
    tagline: 'The absolute sovereignty of the unique individual above all collectives and states.',
    definition: 'A form of anarchism that emphasizes the individual and their will over external determinants such as groups, society, traditions, and ideological systems.',
    historicalOrigins: 'Developed in 19th-century Germany by Max Stirner (egoism) and in the United States by Josiah Warren, Benjamin Tucker, and Lysander Spooner.',
    coreTenets: [
      'Absolute individual sovereignty and personal autonomy',
      'Rejection of sacred abstractions ("spooks") like the state, duty, and nationalism',
      'Voluntary contracts and mutual defense associations',
      'Cost the limit of price and labor-backed exchange without state currency monopolies'
    ],
    keyThinkers: ['Max Stirner', 'Benjamin Tucker', 'Lysander Spooner', 'Josiah Warren', 'Emile Armand'],
    realWorldExamples: [
      {
        title: 'Utopia & Modern Times Communes (Josiah Warren)',
        periodOrLocation: '1847–1864 (Ohio & New York, USA)',
        description: 'Villages operating on individualized time-store currency ("Labor Notes") and non-compulsory social cooperation.'
      }
    ],
    economicModel: 'Mutual banking, free market without monopoly patents or tariffs, labor-value currency, and private contractual trade.',
    viewOfState: 'The state is an aggressive criminal cartel that violates natural personal consent; all legislation is an imposition.',
    criticisms: [
      'Difficulty organizing large public goods projects like international rail or space exploration',
      'Egoist variants risk disregarding social solidarity'
    ],
    keyTextsOrManifestos: ['The Ego and Its Own (Stirner)', 'No Treason: The Constitution of No Authority (Spooner)', 'Instead of a Book (Tucker)'],
    spectrumPlacement: 'Individualist Anti-Authoritarian',
    iconSymbol: '👤'
  },
  {
    id: 'insurrectionary-anarchism',
    name: 'Insurrectionary Anarchism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Permanent armed conflict and spontaneous attack against the apparatus of power.',
    definition: 'A revolutionary theory and practice within anarchism that opposes formal mass organizations (like political parties or formal unions) in favor of informal affinity groups engaged in immediate, decentralized direct attack against state and capitalist infrastructure.',
    historicalOrigins: 'Emerged in Italy and Greece during the late 20th century, notably articulated by Alfredo M. Bonanno.',
    coreTenets: [
      'Informal affinity groups instead of bureaucratic organizations',
      'Immediate attack and permanent revolt without waiting for mass class consciousness',
      'Self-organization and joy of subversion',
      'Destruction of surveillance, police stations, and financial nodes'
    ],
    keyThinkers: ['Alfredo M. Bonanno', 'Luigi Galleani', 'Severino Di Giovanni', 'The Invisible Committee'],
    realWorldExamples: [
      {
        title: 'Exarcheia & Greek Urban Insurgency',
        periodOrLocation: '2008–Present (Athens, Greece)',
        description: 'Autonomous neighborhood assemblies resisting police incursions, gentrification, and IMF austerity through decentralized riots.'
      }
    ],
    economicModel: 'Expropriation of wealth, communal solidarity networks, total rejection of formal labor markets.',
    viewOfState: 'The state cannot be reformed or negotiated with; it must be continuously attacked and shattered.',
    criticisms: [
      'High rate of member imprisonment and isolation from broader popular working-class movements',
      'Lacks concrete blueprint for post-insurrection economic stabilization'
    ],
    keyTextsOrManifestos: ['Armed Joy (Bonanno)', 'The Coming Insurrection (Invisible Committee)', 'The End of Anarchism? (Galleani)'],
    spectrumPlacement: 'Ultra-Radical Anti-Authoritarian / Far-Left',
    iconSymbol: '🔥'
  },
  {
    id: 'left-libertarianism',
    name: 'Left-Libertarianism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Individual liberty combined with egalitarian access to natural resources and land.',
    definition: 'A political philosophy that emphasizes individual self-ownership alongside an egalitarian view of natural resources, arguing that unowned natural resources belong to everyone equally.',
    historicalOrigins: 'Rooted in 17th-century True Levellers (Diggers), refined by Thomas Paine, Henry George, and modern philosophers like Hillel Steiner and Peter Vallentyne.',
    coreTenets: [
      'Full self-ownership of one\'s mind, body, and labor',
      'Egalitarian rights to land and natural resources (e.g., ground rent dividends)',
      'Opposition to corporate subsidies, monopolies, and intellectual property enclosures',
      'Decentralized worker cooperatives and voluntary associations'
    ],
    keyThinkers: ['Thomas Paine', 'Henry George', 'Hillel Steiner', 'Peter Vallentyne', 'Kevin Carson', 'Roderick Long'],
    realWorldExamples: [
      {
        title: 'Alaska Permanent Fund Dividend',
        periodOrLocation: '1976–Present (Alaska, USA)',
        description: 'State oil resource rents collected into a sovereign wealth fund and distributed equally as an annual unconditional dividend to every resident.'
      }
    ],
    economicModel: 'Market socialism, mutual credit, Georgist land-value taxes distributed as basic income, worker co-ops.',
    viewOfState: 'Heavily decentralized or abolished, ensuring that state institutions cannot grant artificial resource monopolies to oligopolies.',
    criticisms: [
      'Balancing absolute individual self-ownership with collective natural resource distribution formulas can produce legal disputes',
      'Squeezed between classical liberals and traditional state socialists'
    ],
    keyTextsOrManifestos: ['Agrarian Justice (Paine)', 'Studies in Mutualist Political Economy (Carson)', 'The Left-Libertarian Reader (Steiner/Vallentyne)'],
    spectrumPlacement: 'Left-Wing Libertarian / Market Socialist',
    iconSymbol: '⚖️'
  },
  {
    id: 'libertarianism',
    name: 'Libertarianism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Maximizing individual liberty, free enterprise, and minimizing state intervention.',
    definition: 'A broad political philosophy that upholds liberty as a core principle, seeking to maximize autonomy and political freedom, emphasizing equality before the law, civil liberties, property rights, and free markets.',
    historicalOrigins: 'Originating in Enlightenment classical liberalism (Locke, Smith) and expanding into a prominent 20th-century political movement through the Mont Pelerin Society and the US Libertarian Party.',
    coreTenets: [
      'Individual liberty and personal responsibility',
      'Protection of private property rights and voluntary exchange',
      'Strict limits on governmental power, regulations, and spending',
      'Free trade, open markets, and strong protection of civil liberties'
    ],
    keyThinkers: ['John Locke', 'Adam Smith', 'Ludwig von Mises', 'Friedrich Hayek', 'Robert Nozick', 'Milton Friedman'],
    realWorldExamples: [
      {
        title: 'United States Libertarian Party',
        periodOrLocation: '1971–Present (USA)',
        description: 'Third-largest US political party advocating for deregulation, tax abolitions, civil rights, drug decriminalization, and non-interventionist foreign policy.'
      },
      {
        title: 'Free Cities & Special Jurisdiction Zones',
        periodOrLocation: 'Global Experiments',
        description: 'Competitive regulatory zones aiming for ultra-low taxes and minimal bureaucratic friction.'
      }
    ],
    economicModel: 'Free-market capitalism, minimal regulatory intervention, low flat/abolished taxes, sound money.',
    viewOfState: 'Either strictly constrained to night-watchman protective functions (minarchism) or eliminated entirely.',
    criticisms: [
      'Inadequate safety nets for poverty, disability, and structural unemployment',
      'Under-regulation of environmental externalities and market failure monopolies'
    ],
    keyTextsOrManifestos: ['Anarchy, State, and Utopia (Nozick)', 'The Road to Serfdom (Hayek)', 'Free to Choose (Milton Friedman)'],
    spectrumPlacement: 'Libertarian / Center-Right to Right Spectrum',
    iconSymbol: '🗽'
  },
  {
    id: 'minarchism',
    name: 'Minarchism',
    category: 'Anarchism & Libertarianism',
    tagline: 'The Night-Watchman State: government limited strictly to military, police, and courts.',
    definition: 'A political philosophy advocating for a minimal state whose legitimate functions are strictly limited to protecting individuals from aggression, theft, breach of contract, and fraud (military, police, courts).',
    historicalOrigins: 'Coined in 1971 by Samuel Edward Konkin III; philosophically grounded by Robert Nozick in Anarchy, State, and Utopia.',
    coreTenets: [
      'The state is justified ONLY to protect negative rights',
      'No state intervention in the economy, welfare, healthcare, or education',
      'Rule of law enforced through objective courts and equal justice',
      'Absolute non-initiation of force by the state against peaceful citizens'
    ],
    keyThinkers: ['Robert Nozick', 'Ayn Rand', 'Herbert Spencer', 'Frédéric Bastiat'],
    realWorldExamples: [
      {
        title: 'Gilded Age United States',
        periodOrLocation: 'Late 19th Century (USA)',
        description: 'Federal government had no federal income tax, no central bank (pre-1913), minimal social welfare, and low regulatory barriers.'
      },
      {
        title: 'Colonial Hong Kong under Sir John Cowperthwaite',
        periodOrLocation: '1960s–1997 (Hong Kong)',
        description: '"Positive non-interventionism" resulting in rapid economic growth with low taxes and minimal state meddling.'
      }
    ],
    economicModel: 'Laissez-faire capitalism, zero subsidies, private infrastructure and education.',
    viewOfState: 'A strictly necessary evil, restricted solely to defense against domestic criminals and foreign invaders.',
    criticisms: [
      'Anarcho-capitalists argue minarchist states inevitably expand into bloated bureaucracies',
      'Socialists argue it leaves workers at the mercy of unrestrained corporate employers'
    ],
    keyTextsOrManifestos: ['Anarchy, State, and Utopia (Nozick)', 'The Law (Bastiat)', 'Capitalism: The Unknown Ideal (Ayn Rand)'],
    spectrumPlacement: 'Right-Libertarian Minimalist State',
    iconSymbol: '🛡️'
  },
  {
    id: 'mutualism',
    name: 'Mutualism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Free markets without capitalism: cost-price exchange, worker cooperatives, and mutual credit.',
    definition: 'An anarchist school of thought and economic system advocating for a society where each person possesses a means of production, with trade occurring in a free market based on labor-time value and cost price through mutual credit banks.',
    historicalOrigins: 'Originated with Pierre-Joseph Proudhon in 1840, representing the first explicitly named anarchist economic theory.',
    coreTenets: [
      'Labor theory of value: "Cost the limit of price"',
      'Abolition of unearned income: interest, rent, and corporate profit',
      'Mutual credit banks issuing loans at cost of administration (zero interest)',
      'Possession (use and occupancy) rather than absentee private property rights'
    ],
    keyThinkers: ['Pierre-Joseph Proudhon', 'Josiah Warren', 'Benjamin Tucker', 'Kevin Carson', 'Clarence Lee Swartz'],
    realWorldExamples: [
      {
        title: 'Proudhon\'s People\'s Bank (Banque du Peuple)',
        periodOrLocation: '1849 (France)',
        description: 'Pioneering experiment in interest-free mutual credit and labor checks before political suppression by Napoleon III.'
      },
      {
        title: 'Modern Credit Unions & Time Banks',
        periodOrLocation: 'Global',
        description: 'Cooperative non-profit depository institutions where members are mutual owners and exchange labor-time credits.'
      }
    ],
    economicModel: 'Worker-owned enterprises operating in competitive non-capitalist markets, interest-free mutual banking, and possession-based property.',
    viewOfState: 'The state is an engine that upholds monopoly privileges (banking, land, tariff, patent monopolies); it must be dismantled.',
    criticisms: [
      'Marxists criticize it for retaining commodity exchange and market competition',
      'Capitalists argue price fixing to labor-cost disregards consumer subjective utility'
    ],
    keyTextsOrManifestos: ['What Is Property? (Proudhon)', 'System of Economical Contradictions (Proudhon)', 'What Is Mutualism? (Swartz)'],
    spectrumPlacement: 'Left-Libertarian Market Socialism / Anarchism',
    iconSymbol: '🤝'
  },
  {
    id: 'right-libertarianism',
    name: 'Right-Libertarianism',
    category: 'Anarchism & Libertarianism',
    tagline: 'Private property, market pricing, individual self-ownership, and minimal taxation.',
    definition: 'A branch of libertarianism that strongly endorses capitalist property rights, free enterprise, and market allocation of natural resources and public services.',
    historicalOrigins: 'Coalesced in the mid-20th century around the Austrian and Chicago Schools of economics, Objectivism, and post-war American political conservatism.',
    coreTenets: [
      'Inviolability of private property and capital accumulation',
      'Primacy of market pricing over centralized planning',
      'Dismantling of welfare states and government regulatory agencies',
      'Constitutional limits on public debt, taxation, and fiat inflation'
    ],
    keyThinkers: ['Ayn Rand', 'Murray Rothbard', 'Ludwig von Mises', 'Ron Paul', 'Thomas Sowell'],
    realWorldExamples: [
      {
        title: 'Ron Paul "Revolution" & Freedom Caucus',
        periodOrLocation: '2008–Present (USA)',
        description: 'Grassroots political movement seeking to audit/abolish the Federal Reserve, end foreign military entanglements, and eliminate federal agencies.'
      },
      {
        title: 'Javier Milei\'s Libertarian Reforms in Argentina',
        periodOrLocation: '2023–Present (Argentina)',
        description: 'Sweeping deregulatory "shock therapy", cutting government ministries, ending price controls, and balancing public budgets.'
      }
    ],
    economicModel: 'Pure capitalist market economy, commodity/crypto backing for currencies, complete privatization of state-owned enterprises.',
    viewOfState: 'Either abolished entirely or reduced to a tiny constitutional referee that never regulates voluntary commerce.',
    criticisms: [
      'Underestimates corporate oligopolies and systemic economic disadvantages faced by impoverished communities',
      'Difficulty providing universal public infrastructure like environmental conservation'
    ],
    keyTextsOrManifestos: ['Human Action (Mises)', 'Atlas Shrugged (Rand)', 'Basic Economics (Sowell)'],
    spectrumPlacement: 'Right-Wing Libertarian',
    iconSymbol: '🐍'
  },
  {
    id: 'voluntarism',
    name: 'Voluntarism',
    category: 'Anarchism & Libertarianism',
    tagline: 'All human interaction must be completely voluntary; no initiated coercion.',
    definition: 'A philosophy that holds that all forms of human association should be voluntary, and that the initiation of force or threat of force is inherently immoral, requiring the total elimination of coercive governments.',
    historicalOrigins: 'Developed in 19th-century Britain by Auberon Herbert ("voluntary taxation"), later revived by Carl Watner, George H. Smith, and Wendy McElroy.',
    coreTenets: [
      'Total adherence to voluntary consent in all contracts and associations',
      'The Non-Aggression Principle applied uniformly to all individuals and institutions',
      'Education and peaceful persuasion as the only valid tools of social change',
      'Renunciation of state voting, tax compliance, and coercive monopolies'
    ],
    keyThinkers: ['Auberon Herbert', 'Carl Watner', 'Wendy McElroy', 'George H. Smith', 'Larken Rose'],
    realWorldExamples: [
      {
        title: 'The Voluntaryist Movement & Newsletter',
        periodOrLocation: '1982–Present (USA)',
        description: 'Anti-political movement promoting tax resistance, homeschooling, and voluntary contractual communities.'
      }
    ],
    economicModel: 'Contract-based voluntary commerce, community charities, private mutual aid, and uncoerced philanthropy.',
    viewOfState: 'The state cannot exist without initiating coercion (taxation, mandatory laws); therefore, all states are immoral.',
    criticisms: [
      'Absence of a universal enforcement mechanism for bad-faith actors or violent non-consenting aggressors',
      'Relies on idealistic assumptions of universal moral reciprocity'
    ],
    keyTextsOrManifestos: ['The Right and Wrong of Compulsion by the State (Herbert)', 'The Most Dangerous Superstition (Larken Rose)', 'Neither Bullets Nor Ballots (Watner)'],
    spectrumPlacement: 'Philosophical Anti-Statist / Pure Voluntarist',
    iconSymbol: '🕊️'
  }
];
