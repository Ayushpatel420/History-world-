import { PoliticalIdeology } from '../../types';

export const ENVIRONMENTAL_ECO_IDEOLOGIES: PoliticalIdeology[] = [
  {
    id: 'environmentalism',
    name: 'Environmentalism',
    category: 'Environmental & Ecocentric',
    tagline: 'Preservation, restoration, and stewardship of the natural environment and ecosystems.',
    definition: 'A broad philosophy, ideology, and social movement regarding concerns for environmental protection and improvement of the health of the environment, particularly as the measure for this health seeks to incorporate the impact of changes to the environment on humans, animals, plants and the non-living.',
    historicalOrigins: 'Roots in 19th-century Romantic conservation (John Muir, Henry David Thoreau) and modern scientific awakening with Rachel Carson\'s Silent Spring (1962).',
    coreTenets: [
      'Protection of clean air, fresh water, biodiversity, and wilderness habitats',
      'Regulation of industrial chemical pollution, toxic waste, and carbon emissions',
      'Intergenerational ecological responsibility: preserving a viable biosphere for future generations',
      'Sustainable resource management and conservation ethics'
    ],
    keyThinkers: ['Rachel Carson', 'John Muir', 'Aldo Leopold', 'David Attenborough', 'Jane Goodall'],
    realWorldExamples: [
      {
        title: 'US Environmental Protection Agency (EPA) & Clean Air/Water Acts',
        periodOrLocation: '1970–1972 (USA)',
        description: 'Bipartisan creation of federal regulatory agencies that banned DDT, scrubbed lead from gasoline, and revived polluted rivers.'
      },
      {
        title: 'Earth Day & Global Environmental Movement',
        periodOrLocation: '1970–Present (Global)',
        description: 'First Earth Day mobilized 20 million Americans; now celebrated annually by over 1 billion people worldwide.'
      }
    ],
    economicModel: 'Environmental regulation, polluter fines, conservation trusts, recycling mandates, renewable energy incentives.',
    viewOfState: 'An essential regulatory protector responsible for safeguarding the public natural commons from corporate degradation.',
    criticisms: [
      'Can be seen by industrial interests as imposing burdensome compliance costs and slowing economic development',
      'Debates over balancing human economic needs with wildlife habitat preservation'
    ],
    keyTextsOrManifestos: ['Silent Spring (Rachel Carson)', 'A Sand County Almanac (Aldo Leopold)', 'The Wilderness World of John Muir'],
    spectrumPlacement: 'Broad Ecological / Trans-partisan',
    iconSymbol: '🌱🌎'
  },
  {
    id: 'green-politics',
    name: 'Green Politics (Ecologism)',
    category: 'Environmental & Ecocentric',
    tagline: 'Ecology, social justice, grassroots democracy, and non-violence: The Four Pillars.',
    definition: 'A political ideology that aims to foster an ecologically sustainable society often rooted in environmentalism, nonviolence, social justice, and grassroots democracy, organized through Green parties globally.',
    historicalOrigins: 'Formed in the 1970s–1980s in Australia (United Tasmania Group) and West Germany (Die Grünen under Petra Kelly).',
    coreTenets: [
      'Four Pillars: Ecological Wisdom, Social Justice, Grassroots Democracy, Non-Violence',
      'Decarbonization of the energy grid and transition to 100% renewable wind, solar, and geothermal',
      'Circular economy, reduction of consumer waste, and ending fossil fuel subsidies',
      'Consensus decision-making and democratic participation in local governance'
    ],
    keyThinkers: ['Petra Kelly', 'Joschka Fischer', 'Vandana Shiva', 'Caroline Lucas', 'Ralph Nader'],
    realWorldExamples: [
      {
        title: 'Alliance 90/The Greens in the German Federal Government',
        periodOrLocation: '1998–Present (Germany)',
        description: 'Introduced the Renewable Energy Sources Act (EEG), pioneered the nuclear phaseout (Energiewende), and co-governed Germany.'
      },
      {
        title: 'Global Greens Charter',
        periodOrLocation: '2001 (Canberra, Australia)',
        description: 'Unified network of Green parties from over 90 countries establishing global principles for climate action.'
      }
    ],
    economicModel: 'Green New Deal, eco-taxes on carbon and resource depletion, local cooperative enterprise, circular zero-waste systems.',
    viewOfState: 'A decentralized, transparent democratic framework prioritizing ecological resilience, public health, and peace.',
    criticisms: [
      'Opposition to nuclear energy in some Green parties is criticized as complicating rapid zero-carbon baseload electricity needs',
      'Tensions between radical "fundi" (fundamentalist) and pragmatic "realo" (realist) party factions'
    ],
    keyTextsOrManifestos: ['Thinking Green! (Petra Kelly)', 'Global Greens Charter (2001)', 'Small Is Beautiful (E.F. Schumacher)'],
    spectrumPlacement: 'Center-Left to Left Green Party Politics',
    iconSymbol: '🌻'
  },
  {
    id: 'deep-ecology',
    name: 'Deep Ecology',
    category: 'Environmental & Ecocentric',
    tagline: 'Inherent value of all living beings regardless of their usefulness to human needs.',
    definition: 'An environmental philosophy and social movement based on the belief that humans must radically change their relationship to nature from one that values nature solely for its usefulness to human beings to one that recognizes that nature has an inherent worth.',
    historicalOrigins: 'Coined by Norwegian philosopher Arne Næss in 1972, further developed by George Sessions and Bill Devall.',
    coreTenets: [
      'Biocentric Egalitarianism: all living things on Earth have an equal right to live and blossom',
      'Total rejection of anthropocentrism (the belief that humans are the center of the universe)',
      'The richness and diversity of life forms have inherent intrinsic value',
      'Substantial reduction of the human population and consumption to allow non-human life to flourish'
    ],
    keyThinkers: ['Arne Næss', 'George Sessions', 'Bill Devall', 'Gary Snyder', 'David Brower'],
    realWorldExamples: [
      {
        title: 'Earth First! & Radical Conservation Biology',
        periodOrLocation: '1980s–Present (Global)',
        description: 'Direct action monkeywrenching, establishing massive biological wilderness corridors (Rewilding Institute) to protect top predators.'
      },
      {
        title: 'Legal Rights of Nature (Te Urewera & Whanganui River)',
        periodOrLocation: '2014 & 2017 (New Zealand)',
        description: 'New Zealand parliament recognized ancient forests and rivers as legal persons with their own inherent legal rights.'
      }
    ],
    economicModel: 'Bioregional subsistence, steady-state economics, voluntary simplicity, total preservation of wild core habitats.',
    viewOfState: 'Must be subordinated to ecological carrying capacity and the laws of the biosphere.',
    criticisms: [
      'Accused by social ecologists and humanists of misanthropy for advocating reduction of human populations',
      'Can overlook how poverty and economic inequality drive environmental destruction in developing nations'
    ],
    keyTextsOrManifestos: ['Ecology, Community and Lifestyle (Arne Næss)', 'Deep Ecology: Living as if Nature Mattered (Devall & Sessions)'],
    spectrumPlacement: 'Radical Ecocentric / Biocentric Philosophy',
    iconSymbol: '🌲🐺'
  },
  {
    id: 'social-ecology',
    name: 'Social Ecology',
    category: 'Environmental & Ecocentric',
    tagline: 'Ecological problems stem fundamentally from social hierarchies and human domination.',
    definition: 'A critical social theory and political philosophy developed by Murray Bookchin, asserting that almost all our present ecological problems arise from deep-seated social problems—specifically from the legacy of hierarchical domination of human by human.',
    historicalOrigins: 'Developed in the United States from the 1960s to 1990s by Murray Bookchin and the Institute for Social Ecology (ISE).',
    coreTenets: [
      'The notion that humans must dominate nature stems directly from the domination of human by human (patriarchy, class, state)',
      'Libertarian Municipalism: direct face-to-face neighborhood democratic assemblies',
      'Confederalism: autonomous municipalities uniting in voluntary regional confederations',
      'Post-scarcity technology utilized for human liberation and ecological restoration'
    ],
    keyThinkers: ['Murray Bookchin', 'Janet Biehl', 'Dan Chodorkoff'],
    realWorldExamples: [
      {
        title: 'Democratic Confederalism in Rojava (AANES)',
        periodOrLocation: '2012–Present (Northern Syria)',
        description: 'Abdullah Öcalan adapted Bookchin\'s social ecology into a direct democratic system with women\'s co-leadership and ecological cooperatives.'
      },
      {
        title: 'Institute for Social Ecology (Plainfield, Vermont)',
        periodOrLocation: '1974–Present (USA)',
        description: 'Pioneered education in community solar, organic aquaculture, and decentralized municipal democracy.'
      }
    ],
    economicModel: 'Municipalized economy: productive assets owned directly by the municipal citizen assembly, not private corporations or state bureaucrats.',
    viewOfState: 'The nation-state is an instrument of centralized violence and capital accumulation; it must be replaced by confederal direct democracies.',
    criticisms: [
      'Direct municipal democracy can be logistically challenging to scale across massive global supply chains',
      'Fierce historic philosophical disputes with deep ecologists and traditional Marxists'
    ],
    keyTextsOrManifestos: ['The Ecology of Freedom (Murray Bookchin)', 'Post-Scarcity Anarchism (Bookchin)', 'Remaking Society (Bookchin)'],
    spectrumPlacement: 'Far-Left Communalist / Eco-Anarchist',
    iconSymbol: '🌿🏛️'
  },
  {
    id: 'ecofeminism',
    name: 'Ecofeminism',
    category: 'Environmental & Ecocentric',
    tagline: 'Interconnection between the patriarchal exploitation of women and the destruction of nature.',
    definition: 'A branch of feminism and social ecology that sees connections between the domination, exploitation, and degradation of the natural environment and the patriarchal subjugation and commodification of women and marginalized peoples.',
    historicalOrigins: 'Coined in 1974 by French feminist Françoise d\'Eaubonne; flourished through the Chipko Movement and the Greenham Common Women\'s Peace Camp.',
    coreTenets: [
      'The logic of domination: patriarchy views both women\'s bodies and nature as resources to be conquered and exploited',
      'Holistic, relational, and care-based ethics replacing patriarchal mechanistic control',
      'Indigenous women\'s traditional ecological knowledge as vital for biodiversity protection',
      'Anti-militarism, anti-nuclear resistance, and food sovereignty'
    ],
    keyThinkers: ['Françoise d\'Eaubonne', 'Vandana Shiva', 'Carolyn Merchant', 'Maria Mies', 'Karen J. Warren'],
    realWorldExamples: [
      {
        title: 'The Chipko Movement in India',
        periodOrLocation: '1973–1980s (Uttarakhand, Himalayas, India)',
        description: 'Rural Indian women hugged forest trees to prevent commercial loggers from clear-cutting their watersheds, inspiring global grassroots resistance.'
      },
      {
        title: 'Greenham Common Women\'s Peace Camp',
        periodOrLocation: '1981–2000 (Berkshire, United Kingdom)',
        description: 'Thousands of women established an autonomous 19-year protest camp blocking the deployment of US nuclear cruise missiles.'
      },
      {
        title: 'Green Belt Movement (Wangari Maathai)',
        periodOrLocation: '1977–Present (Kenya)',
        description: 'Nobel Peace Prize laureate Wangari Maathai mobilized rural Kenyan women to plant over 51 million trees, restoring soil and empowering women.'
      }
    ],
    economicModel: 'Subsistence agriculture, seed freedom cooperatives, local regenerative economies, decommodification of food and water.',
    viewOfState: 'Critiques state-corporate patriarchal alliances; advocates for decentralized, community-led ecological governance.',
    criticisms: [
      'Early cultural ecofeminism was critiqued for essentializing women as inherently more "nurturing" or connected to nature than men',
      'Requires delicate synthesis with modern queer and intersectional feminist frameworks'
    ],
    keyTextsOrManifestos: ['The Death of Nature (Carolyn Merchant)', 'Ecofeminism (Maria Mies & Vandana Shiva)', 'Staying Alive: Women, Ecology and Development (Shiva)'],
    spectrumPlacement: 'Left-Wing Eco-Feminist Liberation',
    iconSymbol: '♀️🌿'
  },
  {
    id: 'eco-capitalism',
    name: 'Eco-Capitalism (Green Capitalism)',
    category: 'Environmental & Ecocentric',
    tagline: 'Harnessing free-market dynamism, green venture capital, and price mechanisms to save the planet.',
    definition: 'A view that capital exists in nature as "natural capital" (ecosystems with ecological yield), and that business and market mechanisms—such as carbon trading, green investments, and renewable tech innovation—can solve environmental problems profitably.',
    historicalOrigins: 'Late 20th century, championed by Paul Hawken, Amory Lovins, and green investment firms.',
    coreTenets: [
      'Natural Capital: assigning accurate financial values to ecosystem services (clean water, carbon sinks, pollination)',
      'Market-driven innovation: electric vehicles, solar power, battery storage, and cultivated meat driven by profit incentives',
      'Internalizing externalities: carbon taxes, emissions trading markets, and green bond certifications',
      'Corporate ESG (Environmental, Social, Governance) sustainability metrics'
    ],
    keyThinkers: ['Paul Hawken', 'Amory Lovins', 'L. Hunter Lovins', 'Al Gore', 'Michael Bloomberg'],
    realWorldExamples: [
      {
        title: 'Global Renewable Energy & EV Boom (Tesla, BYD, Ørsted)',
        periodOrLocation: '2010s–Present (Global)',
        description: 'Trillions of private capital invested in electric vehicles, lithium-ion battery mega-factories, and offshore wind farms, making clean energy cheaper than fossil fuels.'
      },
      {
        title: 'Green Bond Market & Carbon Credit Markets',
        periodOrLocation: '2007–Present (Global)',
        description: 'Over $2 trillion in global green bonds issued to fund certified sustainable infrastructure, reforestation, and energy efficiency.'
      }
    ],
    economicModel: 'Green market capitalism, carbon trading, circular supply chains, venture capital green tech investment, ESG rating systems.',
    viewOfState: 'A market facilitator that prices carbon externalities, removes fossil fuel subsidies, and sets clear regulatory green targets.',
    criticisms: [
      'Eco-socialists argue market capitalism requires infinite compound growth, which is biophysically impossible on a finite planet',
      'Vulnerable to "greenwashing" where corporations market cosmetic green credentials without cutting total emissions'
    ],
    keyTextsOrManifestos: ['Natural Capitalism: Creating the Next Industrial Revolution (Hawken & Lovins)', 'The Ecology of Commerce (Paul Hawken)'],
    spectrumPlacement: 'Center-Right to Center Market Environmentalist',
    iconSymbol: '🌱📈'
  },
  {
    id: 'bright-green-environmentalism',
    name: 'Bright Green Environmentalism',
    category: 'Environmental & Ecocentric',
    tagline: 'High-tech innovation, smart cities, nuclear/fusion energy, and eco-modernism.',
    definition: 'An ideology based on the belief that the convergence of technological innovation, good design, urban density, and social change offers the best path to sustainability, rejecting the austere "dark green" message of degrowth and sacrifice.',
    historicalOrigins: 'Coined in 2003 by Alex Steffen and Worldchanging; formulated into the "Ecomodernist Manifesto" in 2015.',
    coreTenets: [
      'Technological decoupling: using advanced technology (nuclear power, precision fermentation, vertical farms) to decouple human prosperity from environmental impact',
      'Urban density: walkable, transit-oriented mega-cities leave more surrounding land wild for nature to regenerate',
      'Rejection of primitivism, austerity, and anti-technological pessimism',
      'Next-generation clean energy: small modular nuclear reactors, green hydrogen, and fusion power'
    ],
    keyThinkers: ['Alex Steffen', 'Stewart Brand ("Whole Earth Catalog")', 'Ted Nordhaus', 'Michael Shellenberger', 'Steven Pinker'],
    realWorldExamples: [
      {
        title: 'An Ecomodernist Manifesto (Breakthrough Institute)',
        periodOrLocation: '2015 (Oakland, California)',
        description: 'Leading scientists and environmentalists argued that intensifying human activities through technology allows humanity to shrink its physical footprint and rewild the planet.'
      },
      {
        title: 'French Nuclear Decarbonization Grid',
        periodOrLocation: '1970s–Present (France)',
        description: 'Built a fleet of 56 nuclear reactors supplying 70% of electricity with some of the lowest carbon emissions in Europe.'
      }
    ],
    economicModel: 'Technological clean capitalism, state-backed advanced nuclear/fusion R&D, smart city infrastructure, synthetic biology.',
    viewOfState: 'An active investor in high-risk high-reward breakthrough clean technology and nuclear energy infrastructure.',
    criticisms: [
      'Critics argue it relies on speculative technological silver bullets that may not scale quickly enough to avoid climate tipping points',
      'Downplays the need for lifestyle changes and reductions in hyper-consumerism'
    ],
    keyTextsOrManifestos: ['An Ecomodernist Manifesto (2015)', 'Whole Earth Discipline (Stewart Brand)', 'Worldchanging: A User\'s Guide for the 20th Century (Steffen)'],
    spectrumPlacement: 'Modernist High-Tech Environmentalism',
    iconSymbol: '⚡🌱'
  },
  {
    id: 'agrarianism',
    name: 'Agrarianism (Jeffersonian Agrarianism)',
    category: 'Environmental & Ecocentric',
    tagline: 'Independent family farming and rural community as the foundation of civic virtue and democracy.',
    definition: 'A social and political philosophy that views rural society, family farming, and connection to the land as superior to urban industrial life, seeing independent smallholders as the moral backbone of a free democratic republic.',
    historicalOrigins: 'Ancient Rome (Cato the Elder, Virgil), Thomas Jefferson\'s vision of the American Republic, and Wendell Berry.',
    coreTenets: [
      'The independent family farmer ("yeoman farmer") is self-reliant, virtuous, and the bedrock of democracy',
      'Deep moral, spiritual, and physical connection to soil, land, and local ecosystem rhythms',
      'Opposition to industrial urban factory life, financial speculation, and corporate agribusiness monopolies',
      'Local food systems, farmers\' markets, and rural community mutual aid'
    ],
    keyThinkers: ['Thomas Jefferson', 'Wendell Berry', 'Hesiod', 'Cato the Elder', 'Liberty Hyde Bailey'],
    realWorldExamples: [
      {
        title: 'Jeffersonian Republic & Homestead Act of 1862',
        periodOrLocation: '1790–1890 (USA)',
        description: 'Distributed 270 million acres of public federal land to 1.6 million family homesteaders to build an egalitarian agrarian republic.'
      },
      {
        title: 'Modern Regenerative Agriculture & Farm-to-Table Movement',
        periodOrLocation: 'Global (21st Century)',
        description: 'Wendell Berry-inspired smallholder resurgence restoring topsoil health, rotational grazing, and local community-supported agriculture (CSA).'
      }
    ],
    economicModel: 'Smallholder family agriculture, local farmers\' cooperatives, soil regeneration, localized farmers\' markets.',
    viewOfState: 'A decentralized constitutional republic that prevents corporate land monopolies from dispossessing family farmers.',
    criticisms: [
      'Struggles to feed dense global urban populations without the massive yields of modern industrial fertilizers and machinery',
      'Historical Jeffersonian agrarianism in the US was inextricably tied to chattel slavery and the displacement of Indigenous peoples'
    ],
    keyTextsOrManifestos: ['Notes on the State of Virginia (Thomas Jefferson)', 'The Unsettling of America: Culture and Agriculture (Wendell Berry)'],
    spectrumPlacement: 'Communitarian Agrarian / Traditional Left/Right',
    iconSymbol: '🌾🚜'
  }
];
