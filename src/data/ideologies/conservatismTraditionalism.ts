import { PoliticalIdeology } from '../../types';

export const CONSERVATISM_TRADITIONALISM_IDEOLOGIES: PoliticalIdeology[] = [
  {
    id: 'conservatism',
    name: 'Conservatism',
    category: 'Conservatism & Traditionalism',
    tagline: 'Preservation of established institutions, social order, customs, and continuity.',
    definition: 'A cultural, social, and political philosophy that seeks to promote and preserve traditional institutions, customs, values, and practices, emphasizing gradual and organic change over sudden revolutionary disruption.',
    historicalOrigins: 'Originated in late 18th-century Europe as a philosophical response to the French Revolution, spearheaded by Edmund Burke.',
    coreTenets: [
      'Preservation of time-tested institutions: family, church, community, and constitutional order',
      'Epistemic modesty: skepticism of grand, abstract utopian political engineering schemes',
      'Organic view of society: society is a living contract between the dead, the living, and the unborn',
      'Rule of law, private property, and personal responsibility'
    ],
    keyThinkers: ['Edmund Burke', 'Michael Oakeshott', 'Russell Kirk', 'Roger Scruton', 'Thomas Sowell'],
    realWorldExamples: [
      {
        title: 'British Conservative Party (Tories)',
        periodOrLocation: '1834–Present (United Kingdom)',
        description: 'One of the oldest and most electorally successful political parties in democratic history, balancing tradition with adaptive reform.'
      },
      {
        title: 'American Post-War Conservative Movement (National Review)',
        periodOrLocation: '1955–Present (USA)',
        description: 'William F. Buckley Jr. fused traditional morality, anti-communism, and free-market economics into "fusionism".'
      }
    ],
    economicModel: 'Private property, regulated or free-market enterprise, respect for commercial contracts, fiscal prudence.',
    viewOfState: 'A guardian of civil order, defense, justice, and tradition that should avoid radical social engineering.',
    criticisms: [
      'Can resist necessary progressive reforms such as civil rights, women\'s rights, or environmental laws',
      'Can be seen as defending existing class privileges and inequality'
    ],
    keyTextsOrManifestos: ['Reflections on the Revolution in France (Burke)', 'The Conservative Mind (Kirk)', 'How to Be a Conservative (Scruton)'],
    spectrumPlacement: 'Center-Right to Right',
    iconSymbol: '🏛️'
  },
  {
    id: 'classical-conservatism',
    name: 'Classical Conservatism (Traditional Conservatism)',
    category: 'Conservatism & Traditionalism',
    tagline: 'Natural hierarchy, organic society, moral duty, and social cohesion over rugged individualism.',
    definition: 'A political philosophy emphasizing the need for the principles of natural law and transcendent moral order, tradition, hierarchy, and organic unity, prioritizing social stability and duty above unrestrained individual liberty.',
    historicalOrigins: 'Late 18th and early 19th centuries in Britain (Edmund Burke) and France (Joseph de Maistre, Louis de Bonald).',
    coreTenets: [
      'Society is an organic whole, not a collection of isolated atomized individuals',
      'Noblesse Oblige: the privileged have a moral and paternal duty to protect the less fortunate',
      'Devotion to transcendent moral order, religious faith, and established historical customs',
      'Skepticism of unrestrained industrial capitalism when it destroys local communities'
    ],
    keyThinkers: ['Edmund Burke', 'Joseph de Maistre', 'Benjamin Disraeli', 'Samuel Taylor Coleridge', 'Russell Kirk'],
    realWorldExamples: [
      {
        title: 'Benjamin Disraeli\'s "One Nation Conservatism"',
        periodOrLocation: '1870s (United Kingdom)',
        description: 'Introduced public health, slum clearance, and factory safety legislation to bridge the divide between rich and poor classes.'
      }
    ],
    economicModel: 'Paternalistic capitalism, agricultural stewardship, craft guilds, support for social safety nets to preserve social order.',
    viewOfState: 'A sacred institutional entity with a paternal duty to maintain moral order, continuity, and social harmony.',
    criticisms: [
      'Justification of hereditary aristocracy and rigid social hierarchies',
      'Can be paternalistic and dismissive of democratic egalitarian demands'
    ],
    keyTextsOrManifestos: ['Reflections on the Revolution in France (Burke)', 'Sybil, or The Two Nations (Disraeli)', 'The Conservative Mind (Kirk)'],
    spectrumPlacement: 'Traditionalist Right / Paternalistic',
    iconSymbol: '👑🏛️'
  },
  {
    id: 'christian-democracy',
    name: 'Christian Democracy',
    category: 'Conservatism & Traditionalism',
    tagline: 'Social market economy, subsidiarity, Christian ethics, and European integration.',
    definition: 'A political ideology that emerged in 19th-century Europe under the influence of Catholic social teaching and Neo-Calvinism, combining Christian ethical values with support for democratic institutions and a social market economy.',
    historicalOrigins: 'Papal encyclicals Rerum Novarum (1891) and Quadragesimo Anno (1931); rebuilt post-war Western Europe (CDU/CSU in Germany, DC in Italy).',
    coreTenets: [
      'Subsidiarity: decisions should always be made at the most local level competent to address them',
      'Social Market Economy: competitive markets paired with strong welfare safety nets and worker protections',
      'Protection of the family, human dignity, and Christian moral heritage in civic life',
      'Pioneered European integration and reconciliation after World War II'
    ],
    keyThinkers: ['Konrad Adenauer', 'Robert Schuman', 'Alcide De Gasperi', 'Jacques Maritain', 'Pope Leo XIII'],
    realWorldExamples: [
      {
        title: 'Post-War Reconstruction of Europe (CDU/CSU & Schuman Plan)',
        periodOrLocation: '1945–1960s (Germany, France, Italy)',
        description: 'Adenauer, Schuman, and De Gasperi founded the European Coal and Steel Community, ending centuries of Franco-German war.'
      },
      {
        title: 'Christian Democratic Union of Germany under Angela Merkel',
        periodOrLocation: '2005–2021 (Germany)',
        description: 'Governed as the dominant centrist force in European politics, maintaining fiscal stability and social cohesion.'
      }
    ],
    economicModel: 'Social Market Economy (Soziale Marktwirtschaft), robust welfare state, child benefits (Kindergeld), worker co-determination.',
    viewOfState: 'A democratic servant of human dignity, bound by the principle of subsidiarity and common good.',
    criticisms: [
      'Can face tension when balancing traditional religious teachings with secular social trends',
      'Often accused by right-wingers of being overly centrist and compromise-prone'
    ],
    keyTextsOrManifestos: ['Rerum Novarum (Pope Leo XIII)', 'Integral Humanism (Jacques Maritain)', 'The Schuman Declaration (1950)'],
    spectrumPlacement: 'Center to Center-Right Christian Pluralist',
    iconSymbol: '✝🇪🇺'
  },
  {
    id: 'neoconservatism',
    name: 'Neoconservatism',
    category: 'Conservatism & Traditionalism',
    tagline: 'Promotion of democracy abroad through assertive military strength, and moral realism.',
    definition: 'A political ideology that emerged in the US in the 1960s and 1970s among former liberals/Trotskyists who moved rightward, advocating for aggressive promotion of democracy and American interests abroad via military power, and moral clarity at home.',
    historicalOrigins: 'Late 20th-century American intellectual circles (The Public Interest, Commentary magazine, Irving Kristol, Leo Strauss influences).',
    coreTenets: [
      '"Peace through strength": robust military readiness and assertive foreign intervention against authoritarian regimes',
      'Uncompromising promotion of liberal democracy, human rights, and free markets globally',
      'Moral realism: rejecting moral equivalence between democracies and dictatorships',
      'Acceptance of the basic New Deal welfare safety net while critiquing bureaucratic social engineering'
    ],
    keyThinkers: ['Irving Kristol', 'Norman Podhoretz', 'Paul Wolfowitz', 'Charles Krauthammer', 'Robert Kagan'],
    realWorldExamples: [
      {
        title: 'Reagan Foreign Policy & Strategic Defense Initiative',
        periodOrLocation: '1981–1989 (USA)',
        description: 'Assertive pressure against Soviet totalitarianism ("Evil Empire"), contributing to the end of the Cold War.'
      },
      {
        title: 'George W. Bush Administration & the War on Terror',
        periodOrLocation: '2001–2008 (USA & Middle East)',
        description: 'Post-9/11 "Bush Doctrine" of preemptive military action and democratic regime change in Afghanistan and Iraq.'
      }
    ],
    economicModel: 'Free-market capitalism, defense-industrial investment, low corporate taxation, modest social safety net.',
    viewOfState: 'Strong federal state with a preeminent military establishment and global projection capabilities.',
    criticisms: [
      'Costly, protracted foreign wars ("forever wars") with catastrophic civilian casualties and destabilization in the Middle East',
      'Overconfidence in the ease of exporting Western-style democracy to societies with distinct institutional histories'
    ],
    keyTextsOrManifestos: ['Two Cheers for Capitalism (Irving Kristol)', 'The Neoconservative Persuasion (Kristol)', 'Project for the New American Century (PNAC)'],
    spectrumPlacement: 'Right-Wing Hawkish / Internationalist Conservative',
    iconSymbol: '🦅🌐'
  },
  {
    id: 'paleoconservatism',
    name: 'Paleoconservatism',
    category: 'Conservatism & Traditionalism',
    tagline: 'America First non-interventionism, trade protectionism, immigration restriction, and traditional culture.',
    definition: 'A traditionalist, national conservative philosophy in the US that stresses local community, religious heritage, regional identity, strict constitutionalism, trade tariffs, immigration restrictions, and non-intervention in foreign conflicts.',
    historicalOrigins: 'Emerged in the 1980s in opposition to both neoconservative foreign interventionism and globalist free trade (Pat Buchanan, Chronicles magazine).',
    coreTenets: [
      'Non-interventionist foreign policy: opposition to global policing, NATO expansion, and foreign aid',
      'Economic protectionism: tariffs to protect domestic manufacturing and working-class industrial jobs',
      'Strict limits on immigration to preserve national cultural identity and wage levels',
      'Defense of traditional Western Judeo-Christian religious and cultural heritage'
    ],
    keyThinkers: ['Patrick J. Buchanan', 'Paul Gottfried', 'Thomas Fleming', 'Samuel T. Francis', 'Mel Bradford'],
    realWorldExamples: [
      {
        title: 'Pat Buchanan\'s "Culture War" Presidential Campaigns',
        periodOrLocation: '1992 & 1996 (USA)',
        description: 'Challenged the Republican establishment with "America First" platforms opposing NAFTA, mass immigration, and foreign military entanglements.'
      },
      {
        title: 'Resurgence in the MAGA Movement',
        periodOrLocation: '2016–Present (USA)',
        description: 'Mainstreamed paleoconservative themes of manufacturing tariffs, border enforcement, and skepticism of multilateral global treaties.'
      }
    ],
    economicModel: 'National capitalism, protective tariffs, domestic energy independence, opposition to transnational corporate offshoring.',
    viewOfState: 'Strictly constitutional republic defending national borders and domestic tranquility, avoiding global imperial overreach.',
    criticisms: [
      'Accused of nativism, ethnic chauvinism, and xenophobia regarding immigration',
      'Tariffs risk retaliatory trade wars and higher consumer prices'
    ],
    keyTextsOrManifestos: ['A Republic, Not an Empire (Pat Buchanan)', 'The Great Betrayal: How American Sovereignty and Jobs Were Sacrificed (Buchanan)'],
    spectrumPlacement: 'Far-Right Traditionalist / National Conservative',
    iconSymbol: '🦅🛡️'
  },
  {
    id: 'national-conservatism',
    name: 'National Conservatism',
    category: 'Conservatism & Traditionalism',
    tagline: 'National sovereignty, cultural cohesion, state support for the family, and skepticism of globalism.',
    definition: 'A variant of conservatism that concentrates on upholding national identity and cultural heritage, emphasizing that the sovereign nation-state is the only framework in which democracy, individual liberty, and moral flourishing can endure.',
    historicalOrigins: 'Coalesced across Europe and North America in the 2010s (Yoram Hazony, Edmund Burke Foundation conferences).',
    coreTenets: [
      'The independent nation-state as the pinnacle of human political organization',
      'Opposition to transnational global governance (EU federalism, WHO, globalist treaties)',
      'Active state policy supporting families, marriage, and domestic birthrates (pro-natalism)',
      'Revival of shared national traditions, public religion, and border security'
    ],
    keyThinkers: ['Yoram Hazony', 'Ryszard Legutko', 'Marion Maréchal', 'Viktor Orbán'],
    realWorldExamples: [
      {
        title: 'Hungary\'s Fidesz Governance under Viktor Orbán',
        periodOrLocation: '2010–Present (Hungary)',
        description: 'Instituted major tax credits for families with children, constitutional protections for Christian heritage, and border barriers.'
      },
      {
        title: 'National Conservatism Conferences (NatCon)',
        periodOrLocation: '2019–Present (Washington, London, Rome, Brussels)',
        description: 'International intellectual gatherings uniting conservative statesmen, academics, and writers.'
      }
    ],
    economicModel: 'National industrial strategy, domestic energy autonomy, targeted family tax allowances, domestic control of strategic utilities.',
    viewOfState: 'An active instrument that uses state authority to protect national culture, families, and borders against global market homogenization.',
    criticisms: [
      'Risks sliding into illiberal democracy, undermining judicial independence, and restricting independent media',
      'Strains international diplomatic alliances and trade agreements'
    ],
    keyTextsOrManifestos: ['The Virtue of Nationalism (Yoram Hazony)', 'The Demon in Democracy (Ryszard Legutko)'],
    spectrumPlacement: 'Right-Wing National Conservative',
    iconSymbol: '🏛️🛡️'
  },
  {
    id: 'right-wing-populism',
    name: 'Right-Wing Populism',
    category: 'Conservatism & Traditionalism',
    tagline: 'The pure, hard-working people vs. the corrupt, globalist, out-of-touch elite.',
    definition: 'A political ideology that combines right-wing politics with populist rhetoric and themes, portraying the "pure people" as being exploited by a corrupt political, media, and corporate globalist elite.',
    historicalOrigins: 'Late 20th and early 21st centuries, surging globally following the 2008 financial crisis and the 2015 European migrant crisis.',
    coreTenets: [
      'Anti-Establishment rhetoric: the "forgotten working people" against corrupt technocratic elites',
      'Opposition to globalism, mass immigration, and open borders',
      'Protection of domestic industry and national cultural heritage',
      'Charismatic direct leadership communicating directly to the public'
    ],
    keyThinkers: ['Steve Bannon', 'Jean-Marie Le Pen', 'Nigel Farage', 'Geert Wilders', 'Jair Bolsonaro'],
    realWorldExamples: [
      {
        title: 'Brexit Campaign & UK Independence Party (UKIP)',
        periodOrLocation: '2016 (United Kingdom)',
        description: 'Mobilized working-class populist votes to leave the European Union and "take back control" of national laws and borders.'
      },
      {
        title: 'National Rally (Rassemblement National) in France',
        periodOrLocation: '2010s–Present (France)',
        description: 'Marine Le Pen built a massive working-class coalition combining economic protectionism with strict anti-immigration policies.'
      }
    ],
    economicModel: 'Economic nationalism, protective tariffs, prioritizing social benefits for native citizens ("national preference"), lower domestic energy taxes.',
    viewOfState: 'Direct expression of the popular will, often willing to challenge established constitutional norms and judicial restraints.',
    criticisms: [
      'Polarizes society into simplistic "us vs. them" binaries',
      'Can erode liberal democratic norms, civil liberties, and international stability'
    ],
    keyTextsOrManifestos: ['What Is Populism? (Jan-Werner Müller)', 'The Populist Explosion (John B. Judis)'],
    spectrumPlacement: 'Right-Wing to Far-Right Populist',
    iconSymbol: '📢'
  },
  {
    id: 'fiscal-conservatism',
    name: 'Fiscal Conservatism',
    category: 'Conservatism & Traditionalism',
    tagline: 'Balanced budgets, low public debt, tax reductions, and disciplined government spending.',
    definition: 'A political and economic philosophy regarding fiscal policy and the responsibility of government, advocating for tax cuts, reduced government spending, free markets, balanced budgets, and debt reduction.',
    historicalOrigins: 'Formulated during classical budget debates in 19th-century Britain and the United States (Alexander Hamilton, Grover Cleveland).',
    coreTenets: [
      'Balanced government budgets: avoiding deficit spending that burdens future generations',
      'Reduction of public debt and constitutional limits on state borrowing',
      'Low, predictable tax rates to encourage private capital investment and entrepreneurship',
      'Elimination of redundant government agencies and entitlement waste'
    ],
    keyThinkers: ['Adam Smith', 'Milton Friedman', 'James M. Buchanan (Public Choice Theory)', 'Thomas Sowell', 'Paul Ryan'],
    realWorldExamples: [
      {
        title: 'Swiss "Debt Brake" (Schuldenbremse)',
        periodOrLocation: '2001–Present (Switzerland)',
        description: 'Constitutional amendment requiring the federal government to balance revenues and expenditures over an economic cycle, dramatically reducing public debt.'
      },
      {
        title: 'Canadian Budget Deficit Elimination under Chrétien/Martin',
        periodOrLocation: '1995–2000 (Canada)',
        description: 'Aggressively cut federal department spending by 20%, turning chronic deficits into continuous budget surpluses and driving economic growth.'
      }
    ],
    economicModel: 'Free-market capitalism, low corporate and personal tax rates, privatization of inefficient state services, balanced budgets.',
    viewOfState: 'A fiscally disciplined administrator bound by constitutional spending caps to prevent inflation and debt crises.',
    criticisms: [
      'Austerity spending cuts during recessions can deepen economic downturns and hurt vulnerable populations',
      'Public infrastructure and healthcare can suffer from chronic underinvestment'
    ],
    keyTextsOrManifestos: ['The Calculus of Consent (Buchanan & Tullock)', 'The Road to Serfdom (Hayek)', 'Free to Choose (Friedman)'],
    spectrumPlacement: 'Center-Right Economic Conservative',
    iconSymbol: '📉💰'
  },
  {
    id: 'social-conservatism',
    name: 'Social Conservatism',
    category: 'Conservatism & Traditionalism',
    tagline: 'Preservation of traditional morality, religious values, the nuclear family, and the sanctity of life.',
    definition: 'A political philosophy focused on the preservation of traditional moral values, religious beliefs, the nuclear family structure, and community standards, often opposing abortion, euthanasia, and radical redefinitions of social institutions.',
    historicalOrigins: 'Deep roots in Judeo-Christian moral tradition, mobilizing as a major political force in the 1970s (Moral Majority, Phyllis Schlafly).',
    coreTenets: [
      'Sanctity of human life from conception to natural death (anti-abortion/anti-euthanasia)',
      'Defense of traditional marriage and the nuclear family as the bedrock of society',
      'Public recognition of religious faith, prayer, and moral education in schools',
      'Protection of children from early sexualization and cultural degradation'
    ],
    keyThinkers: ['Phyllis Schlafly', 'Francis Schaeffer', 'James Dobson', 'Robert P. George', 'Russell Kirk'],
    realWorldExamples: [
      {
        title: 'The Moral Majority & Christian Coalition',
        periodOrLocation: '1979–1990s (USA)',
        description: 'Mobilized millions of evangelical and Catholic voters into an influential voting bloc that transformed the Republican Party.'
      },
      {
        title: 'Dobbs v. Jackson Women\'s Health Organization',
        periodOrLocation: '2022 (USA)',
        description: 'US Supreme Court overturned Roe v. Wade, returning authority to regulate or prohibit abortion to elected state legislatures.'
      }
    ],
    economicModel: 'Family-centered capitalism, child tax credits, incentives for single-earner households, community charity over welfare bureaucracy.',
    viewOfState: 'Has a legitimate moral interest in promoting virtuous family life and upholding moral community standards through law.',
    criticisms: [
      'Clashes with individual autonomy, LGBTQ+ equality, and reproductive freedom',
      'Can be seen as imposing specific religious doctrines onto a diverse secular populace'
    ],
    keyTextsOrManifestos: ['The Power of the Positive Woman (Phyllis Schlafly)', 'A Christian Manifesto (Francis Schaeffer)', 'Natural Law and Natural Rights (John Finnis)'],
    spectrumPlacement: 'Right-Wing Social Conservative',
    iconSymbol: '👨‍👩‍👧‍👦✝️'
  },
  {
    id: 'cultural-conservatism',
    name: 'Cultural Conservatism',
    category: 'Conservatism & Traditionalism',
    tagline: 'Preservation of the cultural heritage, literature, language, and civilization of a people.',
    definition: 'A philosophy that advocates for the preservation of the cultural heritage, arts, literature, customs, and civilizational identity of a particular nation or Western civilization, resisting cultural erasure or hyper-cosmopolitan homogenization.',
    historicalOrigins: 'Renaissance humanism, Romanticism (Herder, Ruskin), and 20th-century cultural critics (T.S. Eliot, Roger Scruton).',
    coreTenets: [
      'Preservation of Western high culture, classical music, literature, and architectural beauty',
      'Maintenance of linguistic integrity and national historic monuments',
      'Assimilation and integration of immigrants into the shared host culture',
      'Opposition to cultural relativism and iconoclasm'
    ],
    keyThinkers: ['T.S. Eliot', 'Matthew Arnold', 'John Ruskin', 'Roger Scruton', 'Allan Bloom'],
    realWorldExamples: [
      {
        title: 'Académie Française & French Cultural Exception (Exception Culturelle)',
        periodOrLocation: '1635–Present (France)',
        description: 'State institutions safeguarding the purity of the French language and mandating quotas for French cinema, music, and arts.'
      },
      {
        title: 'Classical Architecture Mandates & National Heritage Trusts',
        periodOrLocation: 'Global',
        description: 'Preserving historic buildings, cathedrals, and requiring traditional harmonious architectural design in historic districts.'
      }
    ],
    economicModel: 'Public preservation of heritage sites, patronage of fine arts, funding for national museums and classical orchestras.',
    viewOfState: 'A custodian of the nation\'s civilizational identity, language, and aesthetic monuments across generations.',
    criticisms: [
      'Can become elitist or nostalgic, resisting innovative modern artistic and cultural expressions',
      'Risks excluding the artistic contributions of minority communities'
    ],
    keyTextsOrManifestos: ['Notes Towards the Definition of Culture (T.S. Eliot)', 'Culture and Anarchy (Matthew Arnold)', 'The Closing of the American Mind (Allan Bloom)'],
    spectrumPlacement: 'Traditionalist Cultural Right',
    iconSymbol: '🏛️🎨'
  },
  {
    id: 'authoritarian-conservatism',
    name: 'Authoritarian Conservatism',
    category: 'Conservatism & Traditionalism',
    tagline: 'Strict hierarchical order, state authority, military discipline, and suppression of revolutionary subversion.',
    definition: 'A form of conservatism that rejects liberal democracy in favor of a powerful authoritarian state, monarchy, or military regime to preserve social order, religious authority, private property, and traditional class hierarchies against radical subversion.',
    historicalOrigins: '19th and early 20th-century Europe (Metternich, Bismarck\'s anti-socialist laws, Chancellor Engelbert Dollfuss in Austria).',
    coreTenets: [
      'Primacy of state authority, order, and hierarchy over liberal democracy and individual liberties',
      'Protection of the Church, traditional aristocracy, and private property from socialist revolutions',
      'Suppression of radical left-wing parties and militant trade unions',
      'Military and police institutions as the guardians of national stability'
    ],
    keyThinkers: ['Klemens von Metternich', 'Joseph de Maistre', 'Carl Schmitt', 'Konstantin Pobedonostsev'],
    realWorldExamples: [
      {
        title: 'The Concert of Europe & Metternich System',
        periodOrLocation: '1815–1848 (Europe)',
        description: 'Austrian Chancellor Metternich organized European monarchies to suppress liberal and nationalist revolutions across the continent.'
      },
      {
        title: 'Austrofascism / Federal State of Austria under Engelbert Dollfuss',
        periodOrLocation: '1934–1938 (Austria)',
        description: 'Established a Catholic authoritarian corporate state to defend Austrian independence against both Nazi Germany and Marxist social democracy.'
      }
    ],
    economicModel: 'State-regulated capitalism, corporatism, protection of private property and large agrarian estates.',
    viewOfState: 'An autocratic, sovereign entity maintaining absolute social order and moral authority.',
    criticisms: [
      'Suppression of democratic elections, freedom of speech, and civil liberties',
      'Prone to police-state violence, censorship, and arbitrary detention'
    ],
    keyTextsOrManifestos: ['Political Theology (Carl Schmitt)', 'Memoirs of Prince Metternich', 'Reflections of a Russian Statesman (Pobedonostsev)'],
    spectrumPlacement: 'Far-Right Authoritarian Conservative',
    iconSymbol: '⚔️👑'
  },
  {
    id: 'liberal-conservatism',
    name: 'Liberal Conservatism',
    category: 'Conservatism & Traditionalism',
    tagline: 'Moderate social conservatism combined with free-market economic liberalism and democratic constitutionalism.',
    definition: 'A political ideology combining conservative values (respect for established institutions and gradual change) with classical liberal policies (free markets, private property, and individual liberty), forming the mainstream center-right across Europe.',
    historicalOrigins: 'Mid-to-late 20th century in Western Europe (British Conservative Party moderates, French Gaullists/UDF, Japanese LDP).',
    coreTenets: [
      'Free-market capitalism, deregulation, and low taxation',
      'Commitment to constitutional democracy, rule of law, and civil liberties',
      'Pragmatic, moderate defense of traditional social institutions without religious fundamentalism',
      'Support for targeted welfare safety nets and international free trade'
    ],
    keyThinkers: ['David Cameron', 'Wilfrid Sellars', 'Raymond Aron', 'Robert Peel'],
    realWorldExamples: [
      {
        title: 'David Cameron\'s "Compassionate Conservatism"',
        periodOrLocation: '2010–2016 (United Kingdom)',
        description: 'Combined fiscal deficit reduction with progressive social legislation, including the legalization of same-sex marriage in the UK.'
      },
      {
        title: 'Liberal Democratic Party of Japan (LDP)',
        periodOrLocation: '1955–Present (Japan)',
        description: 'Long-ruling party maintaining market capitalism, security alliances with the US, and social stability in Japan.'
      }
    ],
    economicModel: 'Open market capitalism, low corporate taxation, international trade alliances, moderate social welfare safety net.',
    viewOfState: 'A stable constitutional referee that maintains low regulation, protects property rights, and respects international treaties.',
    criticisms: [
      'Often accused by hardline conservatives of lacking moral conviction and yielding to progressive cultural trends',
      'Can be seen by left-wing critics as defending corporate wealth under a moderate veneer'
    ],
    keyTextsOrManifestos: ['The Opium of the Intellectuals (Raymond Aron)', 'Tamworth Manifesto (Sir Robert Peel)'],
    spectrumPlacement: 'Center-Right Liberal Conservative',
    iconSymbol: '🏛️🤝'
  },
  {
    id: 'libertarian-conservatism',
    name: 'Libertarian Conservatism (Fusionism)',
    category: 'Conservatism & Traditionalism',
    tagline: 'Radical free-market economic liberty fused with traditional moral virtue and cultural values.',
    definition: 'A political ideology that combines libertarian economic principles (minimal government, deregulation, property rights) with conservative cultural and social philosophy (traditional morality, family virtue, and religious faith).',
    historicalOrigins: 'Developed in the 1950s by Frank Meyer and William F. Buckley Jr. at National Review, known as "fusionism".',
    coreTenets: [
      'Freedom is the political end; virtue is the moral end: true moral virtue requires voluntary freedom to choose good over evil',
      'Radically limited constitutional government and dismantling of regulatory welfare states',
      'Defense of private property, capitalism, and sound currency',
      'Preservation of traditional family, community, and religious institutions without heavy-handed state enforcement'
    ],
    keyThinkers: ['Frank Meyer', 'William F. Buckley Jr.', 'Barry Goldwater', 'Ron Paul', 'Milton Friedman (fusionist aspects)'],
    realWorldExamples: [
      {
        title: 'Barry Goldwater\'s 1964 Presidential Campaign',
        periodOrLocation: '1964 (USA)',
        description: 'Laid the ideological foundation for modern American conservatism with a fierce defense of states\' rights, individual liberty, and constitutional limits.'
      },
      {
        title: 'Ron Paul\'s "Liberty Movement"',
        periodOrLocation: '2008–2012 (USA)',
        description: 'Energized millions of young conservatives and libertarians around the US Constitution, sound gold-standard money, and anti-interventionism.'
      }
    ],
    economicModel: 'Strict free-market capitalism, Austrian/Chicago school economics, zero income tax, privatized services.',
    viewOfState: 'Strictly limited to constitutional defense and courts; no role in the economy or state welfare.',
    criticisms: [
      'Pure libertarians criticize it for accommodating cultural social conservatism',
      'Traditionalist conservatives argue unrestrained free markets erode local traditions and family stability'
    ],
    keyTextsOrManifestos: ['The Conscience of a Conservative (Barry Goldwater)', 'In Defense of Freedom: A Conservative Credo (Frank Meyer)', 'God and Man at Yale (Buckley)'],
    spectrumPlacement: 'Right-Wing Fusionist / Libertarian Conservative',
    iconSymbol: '🗽🏛️'
  },
  {
    id: 'civic-conservatism',
    name: 'Civic Conservatism (The "Big Society")',
    category: 'Conservatism & Traditionalism',
    tagline: 'Empowering local civic charities, neighborhood associations, and voluntary community action.',
    definition: 'A strand of conservatism emphasizing civil society, localism, voluntarism, and social capital, arguing that vibrant intermediate institutions (charities, clubs, churches, mutual societies) should solve social problems rather than a distant bureaucratic state.',
    historicalOrigins: 'Burke\'s concept of "little platoons" (1790) and revived in modern British politics (David Green, Phillip Blond\'s "Red Toryism").',
    coreTenets: [
      'Edmund Burke\'s "little platoons": family, neighborhood, church, and voluntary associations as the heart of society',
      'Devolution of power to local communities and civic associations',
      'Rebuilding social capital, mutual aid societies, and civic duty',
      'Criticism of both hyper-individualist consumerism and cold state welfare bureaucracies'
    ],
    keyThinkers: ['Edmund Burke', 'Robert Nisbet', 'David Willetts', 'Phillip Blond', 'Jesse Norman'],
    realWorldExamples: [
      {
        title: 'The "Big Society" Initiative in the UK',
        periodOrLocation: '2010–2015 (United Kingdom)',
        description: 'Policy agenda empowering local community groups to run libraries, social enterprises, and public services voluntarily.'
      }
    ],
    economicModel: 'Localist social enterprise, community credit unions, charitable foundations, mutual building societies.',
    viewOfState: 'A decentralized enabler that steps aside to allow voluntary civil society and local community groups to flourish.',
    criticisms: [
      'Can be used as a political justification to cut essential public funding and state services',
      'Voluntary charity is often insufficient to address deep structural poverty and systemic crises'
    ],
    keyTextsOrManifestos: ['The Quest for Community (Robert Nisbet)', 'Red Tory: How Left and Right Have Broken Britain (Phillip Blond)', 'The Big Society (Jesse Norman)'],
    spectrumPlacement: 'Communitarian Center-Right',
    iconSymbol: '🏘️🤝'
  },
  {
    id: 'traditionalist-conservatism',
    name: 'Traditionalist Conservatism (High Toryism)',
    category: 'Conservatism & Traditionalism',
    tagline: 'Natural moral law, high culture, religious devotion, and resistance to modern materialism.',
    definition: 'A philosophy emphasizing the necessity of natural law, transcendent moral order, established religion, classical literature, and agrarian rhythms, viewing modern secular individualism and mass industrial consumerism as forms of spiritual decline.',
    historicalOrigins: 'Post-WWII intellectual revival led by Russell Kirk (1953) and Southern Agrarians (1930).',
    coreTenets: [
      'Belief in a transcendent moral order and natural law',
      'Reverence for ancestral wisdom, customs, and constitutional inheritance',
      'Opposition to mass industrial homogenization, modern secularism, and hyper-consumerism',
      'Stewardship of the natural landscape and agrarian roots'
    ],
    keyThinkers: ['Russell Kirk', 'Richard M. Weaver', 'Robert Nisbet', 'T.S. Eliot', 'G.K. Chesterton'],
    realWorldExamples: [
      {
        title: 'The Southern Agrarians & "I\'ll Take My Stand"',
        periodOrLocation: '1930 (USA)',
        description: 'Twelve American Southern writers and poets wrote a manifesto defending traditional agrarian community life against Northern industrial factory capitalism.'
      }
    ],
    economicModel: 'Smallholder agriculture, craft enterprise, distributism, preservation of family estates, opposition to corporate mega-monopolies.',
    viewOfState: 'A venerable guardian of civil order and high cultural standards, guided by historical constitutional custom.',
    criticisms: [
      'Can be perceived as anachronistic nostalgia detached from 21st-century technological reality',
      'Critiqued for romanticizing pre-modern feudal or agrarian conditions'
    ],
    keyTextsOrManifestos: ['The Conservative Mind: From Burke to Eliot (Kirk)', 'Ideas Have Consequences (Richard M. Weaver)', 'I\'ll Take My Stand (Twelve Southerners)'],
    spectrumPlacement: 'Traditionalist Right',
    iconSymbol: '🕯️📜'
  }
];
