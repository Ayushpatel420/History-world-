import { PoliticalIdeology } from '../../types';

export const LIBERALISM_PROGRESSIVISM_IDEOLOGIES: PoliticalIdeology[] = [
  {
    id: 'liberalism',
    name: 'Liberalism',
    category: 'Liberalism & Progressivism',
    tagline: 'Individual liberty, consent of the governed, rule of law, and fundamental human rights.',
    definition: 'A political and moral philosophy based on the rights of the individual, liberty, consent of the governed, political equality, and equality before the law.',
    historicalOrigins: 'Emerged during the Age of Enlightenment in Europe (17th–18th century), championed by John Locke, Montesquieu, and Voltaire.',
    coreTenets: [
      'Inalienable individual rights: life, liberty, and property/pursuit of happiness',
      'Government by the consent of the governed and constitutional limits on state power',
      'Rule of law, separation of powers, and judicial independence',
      'Freedom of speech, press, religion, and assembly'
    ],
    keyThinkers: ['John Locke', 'Voltaire', 'Montesquieu', 'John Stuart Mill', 'Immanuel Kant'],
    realWorldExamples: [
      {
        title: 'The American & French Revolutions',
        periodOrLocation: '1776 & 1789 (USA & France)',
        description: 'Enacted the Declaration of Independence and Declaration of the Rights of Man and of the Citizen, dismantling absolute monarchy.'
      },
      {
        title: 'Universal Declaration of Human Rights (UDHR)',
        periodOrLocation: '1948 (United Nations)',
        description: 'Codified global international consensus on foundational civil, political, and personal human rights.'
      }
    ],
    economicModel: 'Private property rights, market exchange, freedom of contract, and commercial enterprise.',
    viewOfState: 'A limited constitutional government created by social contract whose sole legitimacy derives from protecting individual rights.',
    criticisms: [
      'Can prioritize formal legal rights over substantive economic equality',
      'Historical liberalism initially excluded women, colonized peoples, and the propertyless'
    ],
    keyTextsOrManifestos: ['Two Treatises of Government (Locke)', 'On Liberty (Mill)', 'The Spirit of the Laws (Montesquieu)'],
    spectrumPlacement: 'Center to Center-Left/Right (Foundational Modern Philosophy)',
    iconSymbol: '🗽'
  },
  {
    id: 'classical-liberalism',
    name: 'Classical Liberalism',
    category: 'Liberalism & Progressivism',
    tagline: 'Negative liberty, laissez-faire economics, strict constitutional limits, and the invisible hand.',
    definition: 'An early 19th-century political ideology advocating for civil liberties, the rule of law, and economic freedom through laissez-faire markets and a minimal government role in the economy.',
    historicalOrigins: 'Developed in Great Britain and Europe in the late 18th and 19th centuries by Adam Smith, David Ricardo, and the Manchester School.',
    coreTenets: [
      'Negative Liberty: freedom as the absence of coercive external restraint',
      'Laissez-Faire Capitalism and free trade (anti-tariff/anti-mercantilism)',
      'Spontaneous order of the marketplace guided by the "invisible hand"',
      'Strictly limited constitutional government protecting private contracts and property'
    ],
    keyThinkers: ['Adam Smith', 'David Ricardo', 'Richard Cobden', 'Herbert Spencer', 'Frédéric Bastiat'],
    realWorldExamples: [
      {
        title: 'Repeal of the British Corn Laws & Manchester School',
        periodOrLocation: '1846 (United Kingdom)',
        description: 'Abolished agricultural import tariffs, ushering in the golden age of global unilateral free trade and lowering bread prices for workers.'
      },
      {
        title: '19th-Century British "Gladstonian Liberalism"',
        periodOrLocation: '1868–1894 (UK)',
        description: 'Prime Minister William Gladstone championed low public expenditure, balanced budgets, individual liberty, and tax reduction.'
      }
    ],
    economicModel: 'Laissez-faire capitalism, zero tariffs, gold standard currency, minimal labor or business regulations.',
    viewOfState: 'Strictly limited "night-watchman" state preserving domestic order, national defense, and enforcing private contracts.',
    criticisms: [
      'Ignored horrific working conditions, child labor, and extreme inequality during the early Industrial Revolution',
      'Vulnerable to boom-bust financial panics without central regulatory buffers'
    ],
    keyTextsOrManifestos: ['The Wealth of Nations (Adam Smith)', 'The Law (Frédéric Bastiat)', 'Principles of Political Economy (David Ricardo)'],
    spectrumPlacement: 'Center-Right Free Market Liberal',
    iconSymbol: '⚖️🪙'
  },
  {
    id: 'modern-liberalism',
    name: 'Modern Liberalism (Social Liberalism in US)',
    category: 'Liberalism & Progressivism',
    tagline: 'Positive liberty, civil rights, regulated capitalism, and social safety nets.',
    definition: 'The dominant form of liberalism in the United States and other Western democracies, combining support for civil liberties and democratic institutions with government regulation of the economy and a strong social safety net.',
    historicalOrigins: 'Emerged from the Progressive Era and Franklin D. Roosevelt\'s New Deal (1930s) in response to the Great Depression.',
    coreTenets: [
      'Positive Liberty: true freedom requires access to education, healthcare, and economic security',
      'Regulated capitalism and Keynesian demand-side economic policies',
      'Vigorous defense of civil rights for minorities, women, and LGBTQ+ communities',
      'Public funding for education, infrastructure, environmental protection, and public health'
    ],
    keyThinkers: ['Franklin D. Roosevelt', 'John Maynard Keynes', 'John Rawls', 'Arthur Schlesinger Jr.', 'Paul Krugman'],
    realWorldExamples: [
      {
        title: 'FDR\'s New Deal & Second Bill of Rights',
        periodOrLocation: '1933–1945 (USA)',
        description: 'Created Social Security, unemployment insurance, federal labor protections, and the Tennessee Valley Authority.'
      },
      {
        title: 'LBJ\'s Great Society & Civil Rights Act of 1964',
        periodOrLocation: '1964–1968 (USA)',
        description: 'Outlawed racial segregation, created Medicare and Medicaid, and expanded federal voting rights protections.'
      }
    ],
    economicModel: 'Regulated mixed economy, progressive taxation, Keynesian counter-cyclical public spending, universal public entitlement programs.',
    viewOfState: 'A positive democratic tool to correct market failures, eliminate discrimination, and guarantee basic social security.',
    criticisms: [
      'Conservatives argue high taxes and regulation stifle business investment and create welfare dependency',
      'Socialists argue it preserves the underlying corporate power structure of capitalism'
    ],
    keyTextsOrManifestos: ['A Theory of Justice (John Rawls)', 'The General Theory of Employment, Interest, and Money (Keynes)', 'The Vital Center (Schlesinger)'],
    spectrumPlacement: 'Center-Left Modern Liberal',
    iconSymbol: '🗽🕊️'
  },
  {
    id: 'social-liberalism',
    name: 'Social Liberalism',
    category: 'Liberalism & Progressivism',
    tagline: 'Balancing individual liberty with social justice, equal opportunity, and public welfare.',
    definition: 'A political philosophy that believes individual liberty must coexist with social justice, arguing that poverty, disease, and ignorance prevent people from exercising their true freedom, thus requiring state social provision.',
    historicalOrigins: 'Late 19th-century British "New Liberalism" (T.H. Green, L.T. Hobhouse) and William Beveridge.',
    coreTenets: [
      'Positive freedom: empowering citizens with the capabilities to fulfill their human potential',
      'Equal opportunity through universal high-quality public education and healthcare',
      'The "Five Giant Evils" of society must be conquered: Want, Disease, Ignorance, Squalor, and Idleness',
      'Pluralist multi-party democracy and civil rights'
    ],
    keyThinkers: ['T.H. Green', 'L.T. Hobhouse', 'John Atkinson Hobson', 'William Beveridge', 'Martha Nussbaum', 'Amartya Sen'],
    realWorldExamples: [
      {
        title: 'British Liberal Welfare Reforms of 1906–1914',
        periodOrLocation: '1906–1914 (United Kingdom)',
        description: 'Asquith and Lloyd George introduced the first British old-age pensions, National Insurance, and free school meals for children.'
      },
      {
        title: 'The Beveridge Report (1942)',
        periodOrLocation: '1942 (UK)',
        description: 'Laid the foundational blueprint for the post-war welfare state and National Health Service.'
      }
    ],
    economicModel: 'Social mixed economy, regulated markets, progressive income taxation, social security safety nets.',
    viewOfState: 'An enabling state (the "enabling state") that empowers all citizens with real capability to exercise their freedom.',
    criticisms: [
      'Prone to fiscal budget deficits if welfare obligations outpace economic growth',
      'Classical liberals argue state welfare diminishes individual self-reliance'
    ],
    keyTextsOrManifestos: ['Liberalism (L.T. Hobhouse)', 'Development as Freedom (Amartya Sen)', 'Social Insurance and Allied Services (Beveridge Report)'],
    spectrumPlacement: 'Center to Center-Left',
    iconSymbol: '⚖️🌹'
  },
  {
    id: 'neoliberalism',
    name: 'Neoliberalism',
    category: 'Liberalism & Progressivism',
    tagline: 'Marketization, deregulation, privatization, free trade, and fiscal discipline.',
    definition: 'A 20th-century resurgence of 19th-century ideas associated with economic liberalism and free-market capitalism, advocating for deregulation, privatization of state enterprises, globalization, and shrinking government spending.',
    historicalOrigins: 'Colloque Walter Lippmann (1938), Mont Pelerin Society (1947), and the Chicago School (Milton Friedman); gained global hegemony in the 1980s under Reagan, Thatcher, and the "Washington Consensus".',
    coreTenets: [
      'Privatization of state-owned industries and public utilities',
      'Deregulation of financial markets, labor markets, and corporate activities',
      'Free trade globalization and lowering of international capital controls',
      'Fiscal austerity, balanced budgets, and reduction of progressive tax rates'
    ],
    keyThinkers: ['Milton Friedman', 'Friedrich Hayek', 'Gary Becker', 'James M. Buchanan'],
    realWorldExamples: [
      {
        title: 'The Reagan-Thatcher Revolutions',
        periodOrLocation: '1979–1990 (US & UK)',
        description: 'Slashed top income tax rates, privatized British Telecom and coal mines, deregulated Wall Street/City of London, and dismantled Keynesianism.'
      },
      {
        title: 'The Washington Consensus & IMF Structural Adjustments',
        periodOrLocation: '1989–2000s (Latin America, Eastern Europe, Asia)',
        description: 'Imposed free-market reforms, trade liberalization, and privatization across developing economies.'
      }
    ],
    economicModel: 'Globalized market capitalism, inflation targeting by independent central banks, privatization, supply-side economics.',
    viewOfState: 'A market-enabling referee dedicated to securing property rights, preventing cartels, and opening new markets for private investment.',
    criticisms: [
      'Dramatic surge in global wealth inequality and corporate concentration',
      'Erosion of public healthcare, public universities, and job security (precarity)'
    ],
    keyTextsOrManifestos: ['Capitalism and Freedom (Milton Friedman)', 'The Constitution of Liberty (Hayek)', 'A Brief History of Neoliberalism (David Harvey)'],
    spectrumPlacement: 'Center-Right to Right Free-Market Globalist',
    iconSymbol: '🌐📈'
  },
  {
    id: 'ordoliberalism',
    name: 'Ordoliberalism (Social Market Economy)',
    category: 'Liberalism & Progressivism',
    tagline: 'Strong constitutional state framework ensuring fair competition and social market balance.',
    definition: 'A German school of liberal economics emphasizing that the state must construct a strict legal and constitutional framework ("Ordo") to ensure competitive markets while preventing monopolies and maintaining social cohesion.',
    historicalOrigins: 'University of Freiburg in the 1930s–1940s (Walter Eucken, Franz Böhm, Alfred Müller-Armack); formed the basis for post-WWII West German economic reconstruction.',
    coreTenets: [
      'The state is the referee of the market: strictly enforcing competition and preventing private monopolies',
      'Social Market Economy (Soziale Marktwirtschaft): competitive pricing combined with robust social security',
      'Price stability and hard currency maintained by an independent central bank',
      'Moral and institutional embedding of the market'
    ],
    keyThinkers: ['Walter Eucken', 'Franz Böhm', 'Ludwig Erhard', 'Alfred Müller-Armack', 'Wilhelm Röpke'],
    realWorldExamples: [
      {
        title: 'West German "Wirtschaftswunder" (Economic Miracle)',
        periodOrLocation: '1948–1960s (West Germany)',
        description: 'Economics Minister Ludwig Erhard introduced the Deutsche Mark, abolished price controls, and built Europe\'s most resilient post-war economy.'
      },
      {
        title: 'European Union Competition Law & Maastricht Treaty',
        periodOrLocation: '1992–Present (European Union)',
        description: 'EU antitrust policies, strict deficit limits (3% GDP rule), and European Central Bank mandate heavily inspired by ordoliberal principles.'
      }
    ],
    economicModel: 'Social Market Economy (Soziale Marktwirtschaft), strict antitrust enforcement, independent central banking, co-determination (Mitbestimmung).',
    viewOfState: 'A strong, impartial regulatory state that establishes the legal rules of the market but does not micromanage day-to-day business operations.',
    criticisms: [
      'Rigid adherence to fiscal austerity rules can prolong recessions in vulnerable EU economies',
      'Less flexible than Anglo-American venture capital models'
    ],
    keyTextsOrManifestos: ['The Foundation of Economics (Eucken)', 'Prosperity Through Competition (Erhard)', 'The Social Crisis of Our Time (Röpke)'],
    spectrumPlacement: 'Center to Center-Right German Economic Liberal',
    iconSymbol: '🇩🇪⚙️'
  },
  {
    id: 'progressivism',
    name: 'Progressivism',
    category: 'Liberalism & Progressivism',
    tagline: 'Social reform, democratic advancement, scientific modernization, and anti-corruption.',
    definition: 'A political philosophy in support of social reform based on the idea of progress, asserting that advancements in science, technology, economic development, and social organization are vital to the improvement of the human condition.',
    historicalOrigins: 'Late 19th and early 20th centuries in the US and Europe (Theodore Roosevelt, Robert La Follette, Jane Addams), combating Gilded Age corporate monopolies.',
    coreTenets: [
      'Use of government power to check corporate monopolies and trusts (Trust-Busting)',
      'Expansion of direct democracy: direct election of senators, referendums, and women\'s suffrage',
      'Workplace safety laws, pure food and drug regulations, and child labor abolition',
      'Environmental conservation and creation of national parks'
    ],
    keyThinkers: ['Theodore Roosevelt', 'Jane Addams', 'Robert M. La Follette', 'John Dewey', 'Louis Brandeis'],
    realWorldExamples: [
      {
        title: 'US Progressive Era Constitutional Amendments (16th–19th)',
        periodOrLocation: '1913–1920 (USA)',
        description: 'Instituted federal income tax (16th), direct election of Senators (17th), and universal women\'s voting rights (19th).'
      },
      {
        title: 'Hull House & Settlement Movement (Jane Addams)',
        periodOrLocation: '1889–1935 (Chicago, USA)',
        description: 'Pioneered modern social work, immigrant education, public sanitation, and juvenile court reforms.'
      }
    ],
    economicModel: 'Antitrust regulation, progressive income taxation, public conservation, consumer and worker safety standards.',
    viewOfState: 'An active, transparent public instrument for moral, social, and economic reform against concentrated private power.',
    criticisms: [
      'Early 20th-century progressivism was sometimes marred by paternalism and flawed eugenics theories',
      'Can expand bureaucratic regulatory agencies at the expense of local flexibility'
    ],
    keyTextsOrManifestos: ['The New Nationalism (Theodore Roosevelt)', 'Democracy and Education (John Dewey)', 'Other People\'s Money (Louis Brandeis)'],
    spectrumPlacement: 'Center-Left Reformist',
    iconSymbol: '⚡📜'
  },
  {
    id: 'radicalism',
    name: 'Radicalism (Philosophical Radicalism)',
    category: 'Liberalism & Progressivism',
    tagline: 'Uprooting feudal privileges, universal franchise, secularism, and institutional overhaul.',
    definition: 'A political philosophy that developed in late 18th and 19th-century Europe advocating for sweeping, root-and-branch democratic reform of political, social, and religious institutions, including universal male/universal suffrage, republicanism, and secularization.',
    historicalOrigins: 'Late 18th-century Britain (John Wilkes, Jeremy Bentham, Thomas Paine) and 19th-century French Radical Party (Parti Radical).',
    coreTenets: [
      'Total universal franchise and secret ballot elections',
      'Strict separation of church and state (Laïcité) and free secular public schooling',
      'Abolition of hereditary aristocratic privileges, rotten boroughs, and House of Lords vetoes',
      'Utilitarian ethics: "The greatest happiness for the greatest number"'
    ],
    keyThinkers: ['Jeremy Bentham', 'Thomas Paine', 'James Mill', 'Georges Clemenceau', 'Alain (Émile Chartier)'],
    realWorldExamples: [
      {
        title: 'British Chartist Movement & Reform Acts',
        periodOrLocation: '1838–1848 (United Kingdom)',
        description: 'Millions signed the People\'s Charter demanding universal suffrage, equal constituencies, and elimination of property qualifications for MPs.'
      },
      {
        title: 'French Third Republic & 1905 Law on Separation of Church and State',
        periodOrLocation: '1901–1905 (France)',
        description: 'French Radicals established strict state secularism (laïcité) and universal free public education.'
      }
    ],
    economicModel: 'Smallholder peasant/shopkeeper enterprise, breaking land monopolies, cooperative associations, progressive taxation.',
    viewOfState: 'A democratic, strictly secular republic that actively defends citizen equality against clerical and monarchist restoration.',
    criticisms: [
      'Often fiercely anti-clerical, creating deep social friction with religious communities',
      'In France, gradually shifted toward a centrist establishment party during the 20th century'
    ],
    keyTextsOrManifestos: ['Rights of Man (Thomas Paine)', 'Introduction to the Principles of Morals and Legislation (Bentham)', 'The Radical Programme (Joseph Chamberlain)'],
    spectrumPlacement: 'Historic Radical Left to Modern Center-Left',
    iconSymbol: '⚡🏛️'
  },
  {
    id: 'green-liberalism',
    name: 'Green Liberalism',
    category: 'Liberalism & Progressivism',
    tagline: 'Market-based environmentalism, green technological innovation, and civil liberties.',
    definition: 'A political philosophy that synthesizes liberal values—individual liberty, property rights, open democracy, and free-market dynamism—with ecological sustainability, using market incentives (carbon pricing, green tech subsidies) rather than state command-and-control.',
    historicalOrigins: 'Late 20th century across Northern and Western Europe (Dutch D66, German FDP green wings, UK Liberal Democrats).',
    coreTenets: [
      'Polluter-pays principle: internalizing ecological costs through carbon taxes and cap-and-trade',
      'Harnessing clean technology innovation, venture capital, and renewable markets',
      'Intergenerational justice: protecting the liberty of future generations through ecological stewardship',
      'Decentralized environmental governance and green civil liberties'
    ],
    keyThinkers: ['Marcel Wissenburg', 'Andrew Dobson', 'Paul Hawken', 'Michael Jacobs'],
    realWorldExamples: [
      {
        title: 'European Union Emissions Trading System (EU ETS)',
        periodOrLocation: '2005–Present (Europe)',
        description: 'World\'s first major carbon emissions cap-and-trade market, reducing industrial emissions while allowing market flexibility.'
      },
      {
        title: 'Dutch Democrats 66 (D66) Environmental Agenda',
        periodOrLocation: '1990s–Present (Netherlands)',
        description: 'Pioneered progressive social policies alongside market-based climate targets and nitrogen reduction strategies.'
      }
    ],
    economicModel: 'Green market economy, carbon dividend rebates, clean energy investment incentives, circular economy business frameworks.',
    viewOfState: 'A regulatory architect establishing green market guardrails and carbon boundaries while preserving personal freedom and entrepreneurship.',
    criticisms: [
      'Radical greens argue that market mechanisms cannot stop the systemic ecological crisis caused by continuous growth',
      'Carbon taxes can be regressive if not paired with comprehensive direct cash rebates'
    ],
    keyTextsOrManifestos: ['Green Liberalism: The Free and the Green Society (Wissenburg)', 'The Ecology of Commerce (Paul Hawken)'],
    spectrumPlacement: 'Center to Center-Left Green Liberal',
    iconSymbol: '🌱🕊️'
  },
  {
    id: 'techno-progressivism',
    name: 'Techno-Progressivism',
    category: 'Liberalism & Progressivism',
    tagline: 'Harnessing emerging technologies, AI, and biotechnology for universal human liberation and equality.',
    definition: 'An ideological stance with an emphasis on how technological developments can empower progressive social change, arguing that emerging technologies (AI, genetic engineering, automation, clean fusion) must be democratically regulated and universally accessible to reduce inequality rather than enrich corporate oligopolies.',
    historicalOrigins: 'Emerged in the early 2000s through the Institute for Ethics and Emerging Technologies (IEET) and thinkers like James Hughes and Nick Bostrom.',
    coreTenets: [
      'Technological liberation: technology should emancipate humans from tedious toil, disease, and poverty',
      'Universal Basic Income (UBI) or Universal Basic Services funded by automation dividends',
      'Democratic oversight and ethical regulation of Artificial Intelligence and genetic biotechnology',
      'Open-source science, open-access research papers, and dismantling pharmaceutical patent monopolies'
    ],
    keyThinkers: ['James Hughes', 'Ray Kurzweil', 'Donna Haraway', 'Nick Bostrom', 'Yanis Varoufakis (Technofeudalism critique)'],
    realWorldExamples: [
      {
        title: 'Global Universal Basic Income (UBI) AI-Dividend Pilots',
        periodOrLocation: '2020s–Present (Finland, USA, Kenya)',
        description: 'Testing unconditional direct cash transfers to citizens to cushion labor displacement from advanced automation and AI.'
      },
      {
        title: 'Human Genome Project & Open-Source CRISPR Consortia',
        periodOrLocation: '1990–Present (Global)',
        description: 'Public, non-profit genomic databases ensuring universal public health access to foundational genetic sequencing.'
      }
    ],
    economicModel: 'Automation dividend sovereign wealth funds, open-source technology commons, public AI infrastructure, guaranteed basic services.',
    viewOfState: 'A forward-looking democratic state actively directing public R&D investment and preventing tech-monopoly feudalism.',
    criticisms: [
      'Risk of techno-utopian over-optimism ignoring structural power dynamics',
      'Ethical dilemmas surrounding genetic modification, cognitive enhancement, and algorithmic surveillance'
    ],
    keyTextsOrManifestos: ['Citizen Cyborg: Why Democratic Societies Must Respond to the Redesigned Human of the Future (Hughes)', 'A Cyborg Manifesto (Haraway)'],
    spectrumPlacement: 'Progressive Tech-Centric / Left-Liberal',
    iconSymbol: '🤖✨'
  },
  {
    id: 'conservative-liberalism',
    name: 'Conservative Liberalism',
    category: 'Liberalism & Progressivism',
    tagline: 'Free-market economic liberty combined with traditional cultural and moral institutions.',
    definition: 'A variant of liberalism that combines liberal economic values (free enterprise, low taxation, private property) with conservative views on social morality, family structure, religion, and institutional stability.',
    historicalOrigins: '19th-century Europe, particularly in the Netherlands (VVD), Germany (FDP right wing), and France (Orléanists).',
    coreTenets: [
      'Economic freedom, fiscal responsibility, and private enterprise',
      'Preservation of traditional moral values, religious heritage, and the nuclear family as the foundation of social order',
      'Rule of law, strong national defense, and measured institutional evolution',
      'Skepticism of rapid social engineering and welfare state expansion'
    ],
    keyThinkers: ['Benjamin Constant', 'Alexis de Tocqueville', 'Wilhelm von Humboldt', 'Frits Bolkestein'],
    realWorldExamples: [
      {
        title: 'Dutch People\'s Party for Freedom and Democracy (VVD)',
        periodOrLocation: '1948–Present (Netherlands)',
        description: 'Long-governing Dutch party advocating low corporate taxes, fiscal austerity, and firm integration/immigration rules under Mark Rutte.'
      }
    ],
    economicModel: 'Free-market capitalism, lower taxes, strict budgetary discipline, privatized public utilities.',
    viewOfState: 'A constitutional order focused on maintaining the rule of law, external defense, and preserving cultural stability.',
    criticisms: [
      'Tension between personal lifestyle liberty and socially conservative moral enforcement',
      'Can be seen as prioritizing business interests over social equity'
    ],
    keyTextsOrManifestos: ['Principles of Politics Applicable to All Governments (Constant)', 'Democracy in America (Tocqueville)'],
    spectrumPlacement: 'Center-Right Conservative Liberal',
    iconSymbol: '🏛️🪙'
  },
  {
    id: 'economic-liberalism',
    name: 'Economic Liberalism',
    category: 'Liberalism & Progressivism',
    tagline: 'Individual decision-making, price mechanisms, property rights, and commercial freedom.',
    definition: 'The ideological belief in organizing the economy on individual lines, meaning that the greatest possible number of economic decisions are made by individuals rather than by collective institutions or organizations.',
    historicalOrigins: 'Physiocrats of 18th-century France ("Laissez-faire, laissez-passer") and Adam Smith\'s Scottish Enlightenment.',
    coreTenets: [
      'Consumer sovereignty: markets efficiently satisfy human desires through price signals',
      'Private ownership of land, resources, and capital goods',
      'Freedom of contract and labor mobility',
      'Opposition to government price controls, subsidies, and state-chartered trade monopolies'
    ],
    keyThinkers: ['Adam Smith', 'Anne-Robert-Jacques Turgot', 'Jean-Baptiste Say', 'Ludwig von Mises'],
    realWorldExamples: [
      {
        title: 'General Agreement on Tariffs and Trade (GATT) & WTO',
        periodOrLocation: '1947–Present (Global)',
        description: 'Multilateral treaties progressively reducing global tariffs and trade quotas to expand cross-border commerce.'
      }
    ],
    economicModel: 'Open market capitalism, free trade, pricing by supply and demand, voluntary contracts.',
    viewOfState: 'Limited to preventing fraud, upholding property laws, and national security.',
    criticisms: [
      'Neglects externalities like industrial pollution and climate emissions',
      'Can generate deep wealth inequalities and monopolistic cartels if unregulated'
    ],
    keyTextsOrManifestos: ['Treatise on Political Economy (Say)', 'The Wealth of Nations (Smith)'],
    spectrumPlacement: 'Center-Right Market Centric',
    iconSymbol: '📊'
  },
  {
    id: 'cultural-liberalism',
    name: 'Cultural Liberalism',
    category: 'Liberalism & Progressivism',
    tagline: 'Individual lifestyle freedom, secularism, freedom of conscience, and artistic expression.',
    definition: 'A philosophy that emphasizes individual freedom from cultural norms, religious dictates, and state interference regarding personal lifestyle, sexual morality, artistic expression, and ethical choices.',
    historicalOrigins: 'Enlightenment anti-clericalism (Voltaire), expanding through the 1960s counterculture and modern civil liberties movements (ACLU).',
    coreTenets: [
      'Freedom of conscience, lifestyle choice, and bodily autonomy (reproductive rights)',
      'Total freedom of artistic and intellectual expression without censorship',
      'Decriminalization of victimless personal conduct (e.g., consensual adult relationships, drug use)',
      'Strict separation of religious dogma from civil legislation'
    ],
    keyThinkers: ['Voltaire', 'John Stuart Mill', 'Wilhelm von Humboldt', 'Michel Foucault'],
    realWorldExamples: [
      {
        title: 'Marriage Equality & LGBTQ+ Rights Legislation',
        periodOrLocation: '2001–Present (Netherlands, USA, Global)',
        description: 'Legalization of same-sex marriage and anti-discrimination protections expanding personal civil liberty.'
      },
      {
        title: 'First Amendment Free Speech Jurisprudence (ACLU)',
        periodOrLocation: '1920–Present (USA)',
        description: 'Legal battles defending freedom of speech, uncensored literature, and press freedom against state censorship.'
      }
    ],
    economicModel: 'Compatible with diverse economic systems, emphasizing open cultural markets and copyright reform.',
    viewOfState: 'The state must remain strictly neutral on personal lifestyles and moral choices, intervening only to prevent direct harm to others.',
    criticisms: [
      'Traditionalists argue it erodes moral consensus, family cohesion, and shared cultural values',
      'Can lead to culture-war polarization in pluralistic societies'
    ],
    keyTextsOrManifestos: ['On Liberty (Mill)', 'Treatise on Tolerance (Voltaire)'],
    spectrumPlacement: 'Socially Libertarian / Pluralist',
    iconSymbol: '🎨🌈'
  },
  {
    id: 'libertarian-liberalism',
    name: 'Libertarian Liberalism',
    category: 'Liberalism & Progressivism',
    tagline: 'A pure synthesis of civil liberties, free markets, and uncompromising personal sovereignty.',
    definition: 'A political stance that emphasizes both maximum personal civil liberty and maximum economic freedom, fiercely rejecting both authoritarian social moralism and socialist economic regulation.',
    historicalOrigins: '20th-century classical liberal revival, synthesis of civil liberties defense with Austrian school economics.',
    coreTenets: [
      'Unrestricted civil rights, drug decriminalization, privacy, and free speech',
      'Free markets, sound currency, low taxes, and opposition to government bailouts',
      'Anti-interventionist, anti-imperialist foreign policy',
      'Strict protection against government surveillance and police-state overreach'
    ],
    keyThinkers: ['Milton Friedman', 'Thomas Szasz', 'David Boaz', 'Radley Balko'],
    realWorldExamples: [
      {
        title: 'Cato Institute Policy Initiatives',
        periodOrLocation: '1977–Present (Washington D.C., USA)',
        description: 'Influential think tank advocating for ending the War on Drugs, reforming criminal justice, and reducing federal spending.'
      }
    ],
    economicModel: 'Free-market capitalism, private retirement accounts, elimination of occupational licensing and corporate subsidies.',
    viewOfState: 'Strictly limited to the protection of individual negative rights; fiercely opposes state moral policing.',
    criticisms: [
      'Criticized for lacking a coherent program for environmental collective action',
      'Often receives modest electoral turnout in winner-take-all two-party systems'
    ],
    keyTextsOrManifestos: ['Libertarianism: A Primer (David Boaz)', 'The Myth of Mental Illness (Thomas Szasz)'],
    spectrumPlacement: 'Center-Right Market / Civil Libertarian',
    iconSymbol: '🗽🕊️'
  }
];
