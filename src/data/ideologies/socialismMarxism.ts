import { PoliticalIdeology } from '../../types';

export const SOCIALISM_MARXISM_IDEOLOGIES: PoliticalIdeology[] = [
  {
    id: 'socialism',
    name: 'Socialism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Social ownership and democratic control of the means of production for human need.',
    definition: 'A range of economic and social systems characterized by social ownership of the means of production and democratic worker self-management, opposing the private accumulation of capital at the expense of the working class.',
    historicalOrigins: 'Coalesced during the Industrial Revolution (early 19th century) across Britain, France, and Germany in response to harsh capitalist working conditions.',
    coreTenets: [
      'Social/collective ownership of major industries, natural resources, and finance',
      'Production directed toward fulfilling social utility rather than generating private profit',
      'Democratic worker participation in economic decision-making',
      'Elimination of extreme class disparities and poverty'
    ],
    keyThinkers: ['Karl Marx', 'Friedrich Engels', 'Robert Owen', 'Henri de Saint-Simon', 'Rosa Luxemburg'],
    realWorldExamples: [
      {
        title: 'Post-WWII British Nationalizations & NHS',
        periodOrLocation: '1945–1951 (United Kingdom)',
        description: 'Clement Attlee\'s Labour government nationalized coal, railways, electricity, and founded the universal free National Health Service.'
      },
      {
        title: 'Mondragon Cooperative Corporation',
        periodOrLocation: '1956–Present (Basque Country, Spain)',
        description: 'World\'s largest federation of worker cooperatives employing over 80,000 workers with democratically elected management.'
      }
    ],
    economicModel: 'Public enterprises, worker cooperatives, universal public goods, economic democracy.',
    viewOfState: 'Varies from utilizing democratic state institutions to redistribute wealth and regulate industry, to transitioning toward eventual stateless worker administration.',
    criticisms: [
      'Risk of state bureaucratic inefficiency and fiscal deficits without market price signals',
      'Potential dampening of private venture capital risk-taking'
    ],
    keyTextsOrManifestos: ['The Communist Manifesto (Marx & Engels)', 'Socialism: Utopian and Scientific (Engels)', 'Why Socialism? (Albert Einstein)'],
    spectrumPlacement: 'Left-Wing to Far-Left',
    iconSymbol: '🌹'
  },
  {
    id: 'communism',
    name: 'Communism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'A stateless, classless, and moneyless society based on common ownership of all means of production.',
    definition: 'A socioeconomic order structured upon the common ownership of the means of production and the absence of social classes, money, and the state, realizing the principle: "From each according to their ability, to each according to their needs."',
    historicalOrigins: 'Rooted in early Christian egalitarianism and Thomas More\'s Utopia; codified scientifically by Karl Marx and Friedrich Engels in the 1840s.',
    coreTenets: [
      'Common possession of all factories, land, technology, and natural resources',
      'Total abolition of wage labor and private capitalist profit',
      'Free access to goods from common abundance according to human need',
      'Dissolution of class struggle and the state machinery'
    ],
    keyThinkers: ['Karl Marx', 'Friedrich Engels', 'Vladimir Lenin', 'Rosa Luxemburg', 'Antonio Gramsci'],
    realWorldExamples: [
      {
        title: 'Primitive Communist Foraging Societies',
        periodOrLocation: 'Pre-history (Global)',
        description: 'Described by Engels and modern anthropologists as hunter-gatherer bands with no private property or class divisions.'
      },
      {
        title: 'Early 20th-Century Soviet Workers\' Councils (Soviets)',
        periodOrLocation: '1917–1918 (Russia)',
        description: 'Spontaneous democratic councils of soldiers, peasants, and factory workers asserting collective control during the Russian Revolution.'
      }
    ],
    economicModel: 'Complete common ownership, decentralized or cybernetic democratic economic planning, moneyless gift distribution.',
    viewOfState: 'The state eventually "withers away" once class antagonisms disappear, as governance shifts from the rule of men to the administration of things.',
    criticisms: [
      'Historical 20th-century attempts to reach communism resulted in centralized one-party authoritarian states',
      'Incentive and economic calculation problems in complex industrial economies'
    ],
    keyTextsOrManifestos: ['The Communist Manifesto (Marx & Engels)', 'Critique of the Gotha Programme (Marx)', 'The German Ideology (Marx & Engels)'],
    spectrumPlacement: 'Far-Left',
    iconSymbol: '☭'
  },
  {
    id: 'marxism',
    name: 'Marxism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Historical materialism, class struggle, and the scientific critique of capitalism.',
    definition: 'A method of socioeconomic analysis that uses historical materialism to understand class relations and social conflict, arguing that societal development is driven by material conditions and class struggle between the bourgeoisie and proletariat.',
    historicalOrigins: 'Developed by German philosophers Karl Marx and Friedrich Engels in the mid-19th century in works like Capital and The German Ideology.',
    coreTenets: [
      'Historical Materialism: economic mode of production shapes cultural and political superstructure',
      'Labor Theory of Value and extraction of surplus value (exploitation)',
      'Class struggle as the engine of human historical progress',
      'Inevitability of capitalist economic crises due to internal contradictions'
    ],
    keyThinkers: ['Karl Marx', 'Friedrich Engels', 'David Harvey', 'Louis Althusser', 'G.A. Cohen'],
    realWorldExamples: [
      {
        title: 'First and Second Internationals',
        periodOrLocation: '1864–1916 (Europe & Americas)',
        description: 'Transnational working-class organizations coordinating international labor strikes, anti-war campaigns, and 8-hour workday struggles.'
      }
    ],
    economicModel: 'Social ownership of the means of production, abolition of capitalist exploitation, production for use value.',
    viewOfState: 'The state is an instrument of the ruling class to maintain its dominance; the proletariat must seize and transform it during the socialist transition.',
    criticisms: [
      'Economic determinism underestimating culture, religion, and national identity',
      'Predictions regarding the immediate total collapse of Western capitalism did not occur as initially forecast'
    ],
    keyTextsOrManifestos: ['Das Kapital (Marx)', 'The German Ideology (Marx/Engels)', 'Wage Labour and Capital (Marx)'],
    spectrumPlacement: 'Far-Left Scientific Socialist',
    iconSymbol: '⚒️'
  },
  {
    id: 'classical-marxism',
    name: 'Classical Marxism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'The original philosophical and economic doctrines articulated directly by Marx and Engels.',
    definition: 'The body of economic, sociological, and political theory directly formulated by Karl Marx and Friedrich Engels before the ideological schisms of the 20th century, emphasizing working-class self-emancipation.',
    historicalOrigins: 'Mid-to-late 19th-century Europe, focusing on the 1848 revolutions and critique of classical political economists (Smith, Ricardo).',
    coreTenets: [
      'Self-emancipation of the working class ("The emancipation of the working classes must be conquered by the working classes themselves")',
      'Dialectical and historical materialism',
      'Critique of commodity fetishism and alienation',
      'Transition from capitalism to lower-stage and higher-stage communism'
    ],
    keyThinkers: ['Karl Marx', 'Friedrich Engels'],
    realWorldExamples: [
      {
        title: 'International Workingmen\'s Association (IWA)',
        periodOrLocation: '1864–1876 (London, UK & International)',
        description: 'The First International bringing together British trade unionists, French Proudhonists, and German socialists under Marx\'s general council.'
      }
    ],
    economicModel: 'Abolition of private property in productive assets, replacement of market anarchy with rational social planning.',
    viewOfState: 'A transitional "dictatorship of the proletariat" (meaning majority working-class political rule) leading to the state\'s dissolution.',
    criticisms: [
      'Ambiguity regarding specific institutional forms of post-capitalist governance',
      'Debates over whether Marx advocated violent insurrection or parliamentary pathways in advanced democracies'
    ],
    keyTextsOrManifestos: ['Das Kapital (Vol 1-3)', 'The Civil War in France', 'Economic and Philosophic Manuscripts of 1844'],
    spectrumPlacement: 'Far-Left Classical Socialist',
    iconSymbol: '📖'
  },
  {
    id: 'orthodox-marxism',
    name: 'Orthodox Marxism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Rigid adherence to Marx\'s economic laws and historical determinism.',
    definition: 'The official interpretation of Marxist theory popularized by Karl Kautsky and the German Social Democratic Party (SPD) in the late 19th and early 20th centuries, treating Marxism as a predictive, deterministic science of history.',
    historicalOrigins: 'Second International period (1889–1914), centered around Karl Kautsky, August Bebel, and Georgi Plekhanov.',
    coreTenets: [
      'Strict historical stages: societies must pass through industrial capitalism before socialism is possible',
      'Economic determinism: economic base strictly dictates political events',
      'Scientific inevitability of capitalist collapse',
      'Opposition to premature vanguard putsches'
    ],
    keyThinkers: ['Karl Kautsky', 'Georgi Plekhanov', 'August Bebel', 'Franz Mehring'],
    realWorldExamples: [
      {
        title: 'Social Democratic Party of Germany (SPD) Erfurt Program',
        periodOrLocation: '1891–1914 (Germany)',
        description: 'Largest socialist party in the world combining orthodox Marxist revolutionary goals with day-to-day electoral labor reforms.'
      }
    ],
    economicModel: 'State-administered socialization of heavy industry following the full maturation of capitalist monopolies.',
    viewOfState: 'Parliamentary conquest by the socialist majority followed by legislative reorganization of state power.',
    criticisms: [
      'Passive fatalism ("waiting for capitalism to collapse on its own")',
      'Inability to prevent the outbreak of World War I due to SPD voting for war credits'
    ],
    keyTextsOrManifestos: ['The Erfurt Program (Kautsky)', 'The Class Struggle (Kautsky)', 'Fundamental Problems of Marxism (Plekhanov)'],
    spectrumPlacement: 'Left-Wing Second International',
    iconSymbol: '📜'
  },
  {
    id: 'marxism-leninism',
    name: 'Marxism–Leninism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Vanguard party leadership, democratic centralism, and state-led industrialization.',
    definition: 'A communist ideology developed by Joseph Stalin in the 1920s based on his synthesis of Marxism with Vladimir Lenin\'s theories of imperialism, the vanguard party, and the construction of "socialism in one country".',
    historicalOrigins: 'Codified in the Soviet Union during the 1920s–1930s as the official state ideology of the CPSU and Comintern.',
    coreTenets: [
      'Vanguard Party: disciplined professional revolutionaries guiding the proletariat',
      'Democratic Centralism: freedom of discussion, absolute unity in action',
      'Socialism in One Country: industrializing and defending the socialist base',
      'State monopoly of foreign trade, heavy industry, and five-year planning'
    ],
    keyThinkers: ['Vladimir Lenin', 'Joseph Stalin', 'Ho Chi Minh', 'Enver Hoxha'],
    realWorldExamples: [
      {
        title: 'Union of Soviet Socialist Republics (USSR)',
        periodOrLocation: '1922–1991 (Eurasia)',
        description: 'Transformed an agrarian empire into an industrial superpower, defeated Nazi Germany in WWII, and pioneered space exploration.'
      },
      {
        title: 'Socialist Republic of Vietnam',
        periodOrLocation: '1976–Present (Vietnam)',
        description: 'Led by the Communist Party of Vietnam through anti-colonial wars and modern economic modernization (Doi Moi).'
      }
    ],
    economicModel: 'Command economy, state ownership of natural resources and heavy industry, Gosplan central planning.',
    viewOfState: 'Strong socialist state ("Dictatorship of the Proletariat") necessary to suppress counter-revolution and build productive capacity.',
    criticisms: [
      'Authoritarian suppression of political dissent, press freedom, and rival socialist tendencies',
      'Bureaucratic rigidity and shortages of consumer goods under central planning'
    ],
    keyTextsOrManifestos: ['Foundations of Leninism (Stalin)', 'What Is to Be Done? (Lenin)', 'Imperialism: The Highest Stage of Capitalism (Lenin)'],
    spectrumPlacement: 'Far-Left Authoritarian / Vanguard Communist',
    iconSymbol: '🚩'
  },
  {
    id: 'leninism',
    name: 'Leninism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Vanguard party organization, anti-imperialist struggle, and Soviet council power.',
    definition: 'The political theory and revolutionary praxis developed by Bolshevik leader Vladimir Lenin, adapting Marxism to the age of monopoly imperialism and peasant-majority societies.',
    historicalOrigins: 'Developed in Russia between 1902 and 1924, culminating in the October Revolution of 1917.',
    coreTenets: [
      'Theory of Imperialism: capitalism survives through colonial super-exploitation, creating a "labor aristocracy" at home',
      'Need for a disciplined, dedicated vanguard party to instill socialist consciousness',
      'Worker-peasant revolutionary alliance ("Smychka")',
      'Soviets (worker/soldier councils) as the direct organs of working-class power'
    ],
    keyThinkers: ['Vladimir Lenin', 'Leon Trotsky (early)', 'Nikolai Bukharin'],
    realWorldExamples: [
      {
        title: 'October Revolution & All-Russian Congress of Soviets',
        periodOrLocation: '1917 (Petrograd, Russia)',
        description: 'Overthrow of the Russian Provisional Government and transfer of state power to workers\' and soldiers\' soviets.'
      },
      {
        title: 'New Economic Policy (NEP)',
        periodOrLocation: '1921–1928 (Soviet Russia)',
        description: 'Lenin\'s strategic pragmatic reintroduction of limited private trade and agriculture to revive a devastated economy.'
      }
    ],
    economicModel: 'State control of the "commanding heights" of the economy (banking, transport, mining) with initial cooperative agriculture.',
    viewOfState: 'Smashing the bourgeois state apparatus and replacing it with a commune-state of armed workers and councils.',
    criticisms: [
      'Creation of a single-party monopoly that paved the way for totalitarian bureaucratization',
      'Suppression of rival socialist factions (Mensheviks, Socialist Revolutionaries, Kronstadt sailors)'
    ],
    keyTextsOrManifestos: ['The State and Revolution (Lenin)', 'What Is to Be Done? (Lenin)', 'Imperialism (Lenin)'],
    spectrumPlacement: 'Far-Left Revolutionary Communist',
    iconSymbol: '⭐'
  },
  {
    id: 'bolshevism',
    name: 'Bolshevism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Uncompromising revolutionary militancy and insurrectionary overthrow of capitalism.',
    definition: 'The revolutionary faction of the Russian Social Democratic Labour Party (RSDLP) led by Lenin, characterized by strict organizational discipline, rejection of bourgeois parliamentarism, and commitment to immediate socialist insurrection.',
    historicalOrigins: 'Formed at the 2nd Congress of the RSDLP in Brussels/London (1903) in opposition to the reformist Menshevik faction.',
    coreTenets: [
      'Uncompromising revolutionary militancy and rejection of class collaboration',
      'Strict cadre membership requirements and internal party discipline',
      'Immediate peace, land distribution to peasants, and all power to the soviets',
      'World socialist revolution as necessary for survival'
    ],
    keyThinkers: ['Vladimir Lenin', 'Leon Trotsky', 'Felix Dzerzhinsky', 'Yakov Sverdlov'],
    realWorldExamples: [
      {
        title: 'Bolshevik Seizure of Power & Brest-Litovsk Peace',
        periodOrLocation: '1917–1918 (Russia)',
        description: 'Immediate withdrawal from WWI, decree on land distribution, and nationalization of foreign capital.'
      }
    ],
    economicModel: 'War Communism (1918–1921) transitioning into state capitalism and nationalized industrial production.',
    viewOfState: 'Dictatorship of the proletariat backed by the Red Army and Revolutionary Cheka.',
    criticisms: [
      'Use of revolutionary terror and suppression of freedom of speech',
      'Hardline intolerance of dissenting views within the socialist movement'
    ],
    keyTextsOrManifestos: ['April Theses (Lenin)', 'One Step Forward, Two Steps Back (Lenin)', 'Terrorism and Communism (Trotsky)'],
    spectrumPlacement: 'Far-Left Insurrectionary Vanguardism',
    iconSymbol: '🌟'
  },
  {
    id: 'trotskyism',
    name: 'Trotskyism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Permanent revolution, international working-class solidarity, and anti-bureaucracy.',
    definition: 'The Marxist theory and political tradition associated with Leon Trotsky, advocating for permanent international socialist revolution, worker democracy, and opposing Stalinist bureaucratic degeneration.',
    historicalOrigins: 'Developed in the 1920s by the Left Opposition in the Soviet Union, later organizing into the Fourth International in 1938.',
    coreTenets: [
      'Permanent Revolution: socialist revolution cannot be completed within national borders, especially in underdeveloped nations',
      'Opposition to "Socialism in One Country"',
      'Analysis of the USSR as a "degenerated workers\' state" requiring a political revolution',
      'Transitional Program connecting immediate reform demands to revolutionary action'
    ],
    keyThinkers: ['Leon Trotsky', 'Ernest Mandel', 'C.L.R. James', 'Ted Grant', 'Tony Cliff'],
    realWorldExamples: [
      {
        title: 'Left Opposition in the USSR',
        periodOrLocation: '1923–1927 (Soviet Union)',
        description: 'Struggle for internal party democracy, faster voluntary industrialization, and internationalist foreign policy against the Stalin triumvirate.'
      },
      {
        title: 'Fourth International & Anti-Colonial Trotskyist Parties',
        periodOrLocation: '1938–Present (Sri Lanka, France, Argentina)',
        description: 'Lanka Sama Samaja Party (LSSP) in Sri Lanka became the world\'s first Trotskyist party to hold parliamentary leadership.'
      }
    ],
    economicModel: 'Democratic socialist planning by freely elected workers\' councils with international economic integration.',
    viewOfState: 'Workers\' state governed by democratically accountable soviets with full freedom for all working-class political parties.',
    criticisms: [
      'Tendency toward frequent factional infighting and splintering among Trotskyist organizations',
      'Underestimation of the stability of national post-war capitalist and social democratic states'
    ],
    keyTextsOrManifestos: ['The Revolution Betrayed (Trotsky)', 'The Permanent Revolution (Trotsky)', 'The Transitional Program (Trotsky)'],
    spectrumPlacement: 'Far-Left Internationalist Communist',
    iconSymbol: '☭🌐'
  },
  {
    id: 'stalinism',
    name: 'Stalinism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Rapid state-forced industrialization, collectivization, cult of personality, and total state security.',
    definition: 'The authoritarian governing style, ideology, and political apparatus associated with Joseph Stalin in the USSR (1927–1953), emphasizing hyper-centralization, forced agrarian collectivization, rapid industrialization, and sweeping internal security purges.',
    historicalOrigins: 'Soviet Union under Joseph Stalin during the First, Second, and Third Five-Year Plans (1928–1953).',
    coreTenets: [
      '"Socialism in One Country": prioritizing the consolidation and industrial-military defense of the USSR',
      'Forced collectivization of agriculture and elimination of the kulak class',
      'Cult of personality around the General Secretary and total party censorship',
      'Intensification of class struggle under socialism to justify security purges (Great Purge / NKVD)'
    ],
    keyThinkers: ['Joseph Stalin', 'Andrei Zhdanov', 'Lazar Kaganovich'],
    realWorldExamples: [
      {
        title: 'Soviet Five-Year Plans & Magnitogorsk Steel Complex',
        periodOrLocation: '1928–1940 (USSR)',
        description: 'Rapid transformation from agrarian society to world\'s second-largest industrial economy, enabling the defeat of the Wehrmacht.'
      },
      {
        title: 'Eastern Bloc "Stalinization"',
        periodOrLocation: '1947–1953 (Poland, East Germany, Hungary, Czechoslovakia)',
        description: 'Imposition of Soviet-style one-party rule, heavy industrial quotas, and security show trials across post-WWII Eastern Europe.'
      }
    ],
    economicModel: 'Total state-directed Gosplan command economy, absolute prohibition of private enterprise, state collective farms (Kolkhoz).',
    viewOfState: 'Hyper-powerful totalitarian state apparatus deemed necessary to defend the revolution against internal saboteurs and imperialist encirclement.',
    criticisms: [
      'Massive loss of life from the 1932–33 famines (Holodomor), Gulag labor camps, and the 1937–38 Great Purge',
      'Total suppression of intellectual, artistic, and political freedom'
    ],
    keyTextsOrManifestos: ['Dialectical and Historical Materialism (Stalin)', 'Economic Problems of the USSR (Stalin)', 'Short Course History of the CPSU(b)'],
    spectrumPlacement: 'Far-Left Totalitarian / State-Autocratic',
    iconSymbol: '🎖️'
  },
  {
    id: 'maoism',
    name: 'Maoism (Mao Zedong Thought)',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Peasant-led protracted people\'s war, mass line, and continuous cultural revolution.',
    definition: 'A variant of Marxism-Leninism developed by Mao Zedong that adapted communist theory to agrarian colonial and semi-feudal societies, establishing the peasantry (rather than urban proletariat) as the revolutionary vanguard.',
    historicalOrigins: 'Developed during the Chinese Civil War (1927–1949) and implemented in the People\'s Republic of China from 1949 to 1976.',
    coreTenets: [
      'Protracted People\'s War: surrounding the cities from the countryside through rural guerilla bases',
      'The Mass Line: "From the masses, to the masses"',
      'Continuous Revolution under socialism to prevent capitalist restoration (Cultural Revolution)',
      'Contradiction analysis (Antagonistic vs. Non-antagonistic contradictions)'
    ],
    keyThinkers: ['Mao Zedong', 'Lin Biao', 'Charu Majumdar', 'Abimael Guzmán (Gonzalo)'],
    realWorldExamples: [
      {
        title: 'Chinese Communist Revolution & Long March',
        periodOrLocation: '1934–1949 (China)',
        description: 'Mao mobilized hundreds of millions of rural peasants, defeating the Nationalist KMT and Japanese occupation forces.'
      },
      {
        title: 'Naxalite-Maoist Insurgency in India',
        periodOrLocation: '1967–Present (India\'s "Red Corridor")',
        description: 'CPI (Maoist) armed insurgency organizing tribal Adivasi communities against mining conglomerates and state forces.'
      },
      {
        title: 'Nepalese Civil War',
        periodOrLocation: '1996–2006 (Nepal)',
        description: 'Communist Party of Nepal (Maoist) waged a 10-year rural war that ultimately led to the abolition of the 240-year-old Hindu monarchy.'
      }
    ],
    economicModel: 'Rural agrarian communes, local self-reliance ("walking on two legs"), state industrial planning.',
    viewOfState: 'New Democracy transitioning into a People\'s Democratic Dictatorship, subject to popular mass mobilization campaigns.',
    criticisms: [
      'Catastrophic human toll of the Great Leap Forward (1958–1962) famine and violent social chaos of the Cultural Revolution (1966–1976)',
      'Dogmatic cult of personality around leadership figures'
    ],
    keyTextsOrManifestos: ['Quotations from Chairman Mao Tse-tung (Little Red Book)', 'On Protracted War (Mao)', 'On Contradiction (Mao)'],
    spectrumPlacement: 'Far-Left Agrarian Vanguard Communist',
    iconSymbol: '🇨🇳'
  },
  {
    id: 'democratic-socialism',
    name: 'Democratic Socialism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Social ownership and economic democracy achieved through democratic institutions.',
    definition: 'A socialist political philosophy that advocates for economic democracy and social ownership alongside a multi-party democratic political system, rejecting authoritarian vanguardism.',
    historicalOrigins: 'Emerged in late 19th and early 20th-century Europe and America (Fabian Society, Eugene V. Debs, George Orwell, Salvador Allende).',
    coreTenets: [
      'Economic democracy: worker cooperatives, public utilities, and participatory workplace decision-making',
      'Unwavering commitment to multi-party democracy, freedom of speech, and civil liberties',
      'Universal public healthcare, housing, free higher education, and environmental protection',
      'Democratic electoral transition to socialism rather than militarized coup'
    ],
    keyThinkers: ['Eugene V. Debs', 'Salvador Allende', 'George Orwell', 'Michael Harrington', 'Cornel West', 'Bernie Sanders'],
    realWorldExamples: [
      {
        title: 'Unidad Popular Government under Salvador Allende',
        periodOrLocation: '1970–1973 (Chile)',
        description: 'Democratically elected socialist president who nationalized copper mines, implemented land reform, and created the Project Cybersyn cybernetic economic feedback system.'
      },
      {
        title: 'Democratic Socialists of America (DSA) & Modern Progressive Movement',
        periodOrLocation: '2016–Present (USA)',
        description: 'Rapid growth in grassroots organizing electing democratic socialists to US Congress and municipal city councils.'
      }
    ],
    economicModel: 'Mixed democratic economy: municipal utilities, worker-owned enterprise federations, state-owned resource banks, strong labor unions.',
    viewOfState: 'The democratic state is an essential tool to guarantee social human rights and dismantle corporate monopolies.',
    criticisms: [
      'Vulnerable to capitalist economic retaliation, capital flight, and foreign-backed military coups',
      'Revolutionary Marxists argue that capitalism cannot be legislated out of existence within bourgeois parliamentary frameworks'
    ],
    keyTextsOrManifestos: ['Democratic Socialism: A Global Survey (Harrington)', 'The Soul of Man under Socialism (Oscar Wilde)', 'Homage to Catalonia (Orwell)'],
    spectrumPlacement: 'Left-Wing Democratic Socialist',
    iconSymbol: '✊'
  },
  {
    id: 'social-democracy',
    name: 'Social Democracy',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Humanizing capitalism through universal welfare states, collective bargaining, and public services.',
    definition: 'A political, social, and economic philosophy that supports economic and social interventions to promote social justice within the framework of a liberal-democratic polity and a capitalist-oriented mixed economy.',
    historicalOrigins: 'Bifurcated from revolutionary Marxism in the early 20th century (Eduard Bernstein), flourishing post-WWII in Scandinavia.',
    coreTenets: [
      'Universal welfare state: free universal healthcare, subsidized childcare, pensions, and free education',
      'Tripartite collective bargaining between strong labor unions, employers, and government (Nordic Model)',
      'Progressive taxation and wealth redistribution to prevent extreme inequality',
      'Robust regulation of private markets, consumer protections, and environmental laws'
    ],
    keyThinkers: ['Eduard Bernstein', 'Olof Palme', 'Gunnar Myrdal', 'Willy Brandt', 'Anthony Crosland'],
    realWorldExamples: [
      {
        title: 'The Nordic Model (Sweden, Norway, Denmark, Finland)',
        periodOrLocation: '1930s–Present (Scandinavia)',
        description: 'Consistently ranks highest in global human happiness, low poverty rates, high union density (65%+), and universal public benefits.'
      },
      {
        title: 'Sweden under Olof Palme & the Meidner Plan',
        periodOrLocation: '1969–1986 (Sweden)',
        description: 'Proposed using employee wage-earner funds to gradually transfer corporate equity ownership to worker unions.'
      }
    ],
    economicModel: 'Social market economy, regulated private enterprise, high progressive income taxes, universal public safety nets.',
    viewOfState: 'A benevolent social manager protecting citizens from market volatility and guaranteeing baseline human dignity.',
    criticisms: [
      'Socialists argue it leaves capitalist class dynamics intact and can be rolled back under neoliberal austerity',
      'Free-market conservatives argue high tax rates and generous welfare benefits disincentivize entrepreneurship'
    ],
    keyTextsOrManifestos: ['Evolutionary Socialism (Bernstein)', 'The Future of Socialism (Crosland)', 'The Three Worlds of Welfare Capitalism (Esping-Andersen)'],
    spectrumPlacement: 'Center-Left Social Democratic',
    iconSymbol: '🤝'
  },
  {
    id: 'eco-socialism',
    name: 'Eco-Socialism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Ecological sustainability through the abolition of capitalist profit-driven extraction.',
    definition: 'An ideology merging aspects of socialism, Marxism, or social democracy with green politics, ecology, and anti-globalization, asserting that the capitalist system is fundamentally incompatible with ecological sustainability.',
    historicalOrigins: 'Formulated in the late 20th century by thinkers like Joel Kovel, Michael Löwy, and John Bellamy Foster.',
    coreTenets: [
      'Capitalism\'s imperative of infinite compound growth ("grow or die") is the root cause of ecological collapse and climate change',
      'Decommodification of energy, water, transportation, and natural ecosystems',
      'Democratic public planning of green energy transitions and degrowth/steady-state production',
      'Climate justice and reparations for the Global South'
    ],
    keyThinkers: ['Joel Kovel', 'Michael Löwy', 'John Bellamy Foster', 'Naomi Klein', 'Kohei Saito'],
    realWorldExamples: [
      {
        title: 'Green New Deal Frameworks',
        periodOrLocation: '2018–Present (Global)',
        description: 'Legislative proposals calling for public ownership of green energy, federal job guarantees for climate resilience, and rapid decarbonization.'
      }
    ],
    economicModel: 'Ecological public ownership, zero fossil fuel subsidies, steady-state green planning, circular zero-waste cooperatives.',
    viewOfState: 'A mobilized public democratic instrument to rapidly transition infrastructure away from fossil fuel capital.',
    criticisms: [
      'Difficulty managing economic transition without short-term disruption to industrial jobs',
      'Tensions over international carbon quotas between developing and developed nations'
    ],
    keyTextsOrManifestos: ['The Enemy of Nature (Kovel)', 'Marx\'s Ecology (Foster)', 'Slow Down: The Degrowth Manifesto (Kohei Saito)'],
    spectrumPlacement: 'Left-Wing Eco-Socialist',
    iconSymbol: '🌿🔴'
  },
  {
    id: 'luxemburgism',
    name: 'Luxemburgism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Spontaneous mass working-class democracy, anti-militarism, and critique of bureaucratic centralism.',
    definition: 'The Marxist theory developed by Rosa Luxemburg emphasizing spontaneous mass strikes, internal working-class democracy, international anti-militarism, and severe critique of both reformist social democracy and authoritarian Leninist centralism.',
    historicalOrigins: 'Early 20th-century Germany and Poland; prominent during the 1918–1919 German Revolution and the Spartacus League.',
    coreTenets: [
      'Mass strikes as the living pulse of revolutionary working-class consciousness',
      '"Freedom is always and exclusively freedom for the one who thinks differently"',
      'Opposition to centralized bureaucratic vanguard supremacy over workers',
      'Uncompromising international anti-imperialism and opposition to capitalist wars'
    ],
    keyThinkers: ['Rosa Luxemburg', 'Karl Liebknecht', 'Paul Levi', 'Clara Zetkin'],
    realWorldExamples: [
      {
        title: 'German Revolution & Spartacist Uprising',
        periodOrLocation: '1918–1919 (Berlin & Germany)',
        description: 'Soldiers\' and workers\' councils overthrow the Hohenzollern Monarchy and demand all power to the council assemblies.'
      }
    ],
    economicModel: 'Democratic worker-council planning with complete autonomy from party bureaucrats.',
    viewOfState: 'Immediate replacement of bourgeois state apparatus with directly recallable workers\' councils; robust defense of freedom of speech.',
    criticisms: [
      'Over-reliance on spontaneous strikes without sufficient centralized military defense led to suppression by the Freikorps in 1919',
      'Vulnerability against organized counter-revolutionary militias'
    ],
    keyTextsOrManifestos: ['The Mass Strike (Luxemburg)', 'Reform or Revolution (Luxemburg)', 'The Accumulation of Capital (Luxemburg)'],
    spectrumPlacement: 'Far-Left Council Democratic / Anti-Authoritarian Marxist',
    iconSymbol: '🌹⭐'
  },
  {
    id: 'left-communism',
    name: 'Left Communism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Rejection of bourgeois electoralism, nationalist alliances, and trade union reformism.',
    definition: 'A range of communist perspectives held by the communist left that criticizes the political ideas of the Bolsheviks from a position asserted to be more authentically Marxist, rejecting participation in bourgeois parliaments and official reformist trade unions.',
    historicalOrigins: 'Emerged in the 1920s in Italy (Amadeo Bordiga) and the German-Dutch council communist current (Anton Pannekoek, Herman Gorter).',
    coreTenets: [
      'Rejection of parliamentary elections and reformist unionism as compromises with capital',
      'Opposition to "national liberation" movements (all nationalism is bourgeois deception)',
      'Rejection of popular fronts or united fronts with reformist social democrats',
      'Purity of the communist program and invariant Marxist doctrine'
    ],
    keyThinkers: ['Amadeo Bordiga', 'Anton Pannekoek', 'Herman Gorter', 'Sylvia Pankhurst', 'Otto Rühle'],
    realWorldExamples: [
      {
        title: 'Communist Party of Italy (PCd\'I) under Bordiga',
        periodOrLocation: '1921–1924 (Italy)',
        description: 'Early period of Italian communism strictly rejecting electoral pacts with liberal or reformist parties.'
      },
      {
        title: 'Workers\' Socialist Federation (UK)',
        periodOrLocation: '1918–1921 (Britain)',
        description: 'Led by suffragette Sylvia Pankhurst, advocating for direct workers\' council control and boycotting British elections.'
      }
    ],
    economicModel: 'Immediate abolition of market relations, money, and wage labor without transitional state capitalist concessions.',
    viewOfState: 'Total destruction of the bourgeois state; Bordigists favor a rigid invariant party while Dutch-German leftists favor workers\' councils.',
    criticisms: [
      'Lenin termed it "an infantile disorder" for isolating itself from broad mass working-class movements',
      'Extreme sectarian purism often leads to political paralysis'
    ],
    keyTextsOrManifestos: ['Workers\' Councils (Pannekoek)', 'Dialogue with Stalin (Bordiga)', 'Open Letter to Comrade Lenin (Gorter)'],
    spectrumPlacement: 'Ultra-Left Anti-Parliamentary Communist',
    iconSymbol: '⚡☭'
  },
  {
    id: 'council-communism',
    name: 'Council Communism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Workers\' councils as the sole legitimate organs of revolution and socialist management.',
    definition: 'A current originating in Germany and the Netherlands that argues democratic workers\' councils (soviets/Räte), arising in factories and communities, should be the sole form of revolutionary struggle and post-capitalist governance, completely rejecting vanguard parties.',
    historicalOrigins: 'Early 1920s German Revolution, spearheaded by the KAPD (Communist Workers\' Party of Germany).',
    coreTenets: [
      'Direct control of production and society by democratically elected workers\' councils with instant recall',
      'Rejection of political parties as inherently bureaucratic and counter-revolutionary',
      'Abolition of wage labor and introduction of labor-time accounting',
      'Self-emancipation without leaders'
    ],
    keyThinkers: ['Anton Pannekoek', 'Paul Mattick', 'Otto Rühle', 'Karl Korsch'],
    realWorldExamples: [
      {
        title: 'Bavarian Soviet Republic (Münchner Räterepublik)',
        periodOrLocation: '1919 (Bavaria, Germany)',
        description: 'Workers\' and soldiers\' councils took over state administration in Munich, declaring an autonomous council republic.'
      },
      {
        title: 'Hungarian Workers\' Councils of 1956',
        periodOrLocation: '1956 (Hungary)',
        description: 'Factory worker councils spontaneously formed to manage production and direct armed resistance during the Hungarian Uprising.'
      }
    ],
    economicModel: 'Labor-time accounting, council confederation, and direct democratic workplace allocation.',
    viewOfState: 'Immediate replacement of all state machinery with an interconnected network of autonomous workers\' councils.',
    criticisms: [
      'Lacks permanent central coordination to repel organized professional state militaries',
      'Vulnerable to collapse once initial revolutionary enthusiasm ebbs'
    ],
    keyTextsOrManifestos: ['Workers\' Councils (Pannekoek)', 'Marxism and Philosophy (Korsch)', 'Anti-Bolshevik Communism (Mattick)'],
    spectrumPlacement: 'Far-Left Councilist / Anti-Vanguard Communist',
    iconSymbol: '🏭'
  },
  {
    id: 'titoism',
    name: 'Titoism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Socialist self-management, market socialism, non-alignment, and multi-ethnic federation.',
    definition: 'The variant of socialism developed in Yugoslavia under Josip Broz Tito, characterized by decentralized worker self-management in enterprises, market socialist elements, non-alignment in the Cold War, and ethnic federalism.',
    historicalOrigins: 'Formulated following the 1948 Tito-Stalin split, when Yugoslavia was expelled from the Soviet Cominform.',
    coreTenets: [
      'Worker Self-Management (Radničko samoupravljanje): workers elect enterprise councils to manage business operations',
      'Market Socialism: enterprises compete in regulated markets with prices reflecting supply and demand',
      'Non-Aligned Movement (NAM): strategic neutrality, refusing allegiance to NATO or the Warsaw Pact',
      '"Brotherhood and Unity" across multi-ethnic constituent republics'
    ],
    keyThinkers: ['Josip Broz Tito', 'Edvard Kardelj', 'Milovan Djilas (early)', 'Boris Kidrič'],
    realWorldExamples: [
      {
        title: 'Socialist Federal Republic of Yugoslavia (SFRY)',
        periodOrLocation: '1945–1992 (Balkans)',
        description: 'Unique socialist model with open borders for citizens, thriving consumer access, and leadership in the 120-nation Non-Aligned Movement.'
      }
    ],
    economicModel: 'Social ownership (assets owned by society, not the state) with worker council management and market competition.',
    viewOfState: 'Decentralized federal socialist republic, retaining a one-party League of Communists as political mediator.',
    criticisms: [
      'High foreign debt accumulation in the 1970s and regional economic inequalities between northern and southern republics',
      'Fragility of multi-ethnic cohesion after Tito\'s death in 1980'
    ],
    keyTextsOrManifestos: ['Self-Management and the Political System (Kardelj)', 'Tito\'s Speeches on Non-Alignment', 'The New Class (Djilas)'],
    spectrumPlacement: 'Left-Wing Market Socialist / Independent Communist',
    iconSymbol: '⭐🤝'
  },
  {
    id: 'eurocommunism',
    name: 'Eurocommunism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Democratic, parliamentary, and pluralist path to socialism in Western Europe.',
    definition: 'A trend in Western European communist parties (Italian PCI, Spanish PCE, French PCF) during the 1970s and 1980s that rejected Soviet leadership, embraced parliamentary democracy, civil liberties, and multi-party pluralism.',
    historicalOrigins: 'Developed after the 1968 Soviet invasion of Czechoslovakia; formalized by Enrico Berlinguer, Santiago Carrillo, and Georges Marchais.',
    coreTenets: [
      'Acceptance of multi-party constitutional democracy and peaceful parliamentary elections',
      'Independence from Moscow and the CPSU',
      'Defense of broad civil liberties, free press, and religious freedom',
      '"Historic Compromise" (Compromesso Storico) building coalitions with democratic reformists'
    ],
    keyThinkers: ['Enrico Berlinguer', 'Santiago Carrillo', 'Antonio Gramsci (foundational)', 'Georges Marchais'],
    realWorldExamples: [
      {
        title: 'Italian Communist Party (PCI) under Berlinguer',
        periodOrLocation: '1970s–1980s (Italy)',
        description: 'Became the largest communist party in the West, winning over 34% of the national vote in 1976 and governing major Italian cities.'
      },
      {
        title: 'Spanish PCE during the Democratic Transition',
        periodOrLocation: '1977–1982 (Spain)',
        description: 'Crucial role in legalizing democracy and drafting the 1978 democratic Spanish Constitution after Franco\'s death.'
      }
    ],
    economicModel: 'Mixed economy, public control of strategic finance, labor co-determination, social redistribution.',
    viewOfState: 'Transforming existing democratic state institutions through broad social alliances rather than violent insurrection.',
    criticisms: [
      'Orthodox Marxists condemned it as capitulation to bourgeois reformism',
      'Eventually led many parties to dissolve into center-left social democratic formations in the 1990s'
    ],
    keyTextsOrManifestos: ['Eurocommunism and the State (Carrillo)', 'Reflections on Italy (Berlinguer)', 'Prison Notebooks (Gramsci)'],
    spectrumPlacement: 'Left-Wing Democratic Communist',
    iconSymbol: '🏛️⭐'
  },
  {
    id: 'christian-socialism',
    name: 'Christian Socialism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Social justice, labor solidarity, and wealth redistribution grounded in the Gospel.',
    definition: 'A political philosophy that blends the fundamental values of socialism with the teachings of Jesus Christ, arguing that capitalism encourages greed, inequality, and selfishness, which contradict Christian moral theology.',
    historicalOrigins: 'Mid-19th century Britain (Frederick Denison Maurice, Charles Kingsley) and early 20th-century American Social Gospel movement.',
    coreTenets: [
      'Biblical injunctions to care for the poor, marginalized, and laborers',
      'Opposition to unconstrained capitalist greed and usury',
      'Universal healthcare, public housing, and fair living wages as moral obligations',
      'Peace, anti-militarism, and cooperative brotherhood'
    ],
    keyThinkers: ['Frederick Denison Maurice', 'Charles Kingsley', 'Walter Rauschenbusch', 'Tommy Douglas', 'Martin Luther King Jr.'],
    realWorldExamples: [
      {
        title: 'Tommy Douglas & Canadian Universal Medicare (CCF)',
        periodOrLocation: '1944–1961 (Saskatchewan, Canada)',
        description: 'Baptist minister who became Premier of Saskatchewan, introducing North America\'s first universal single-payer healthcare system.'
      },
      {
        title: 'Dr. Martin Luther King Jr. & the Poor People\'s Campaign',
        periodOrLocation: '1968 (USA)',
        description: 'Advocated for democratic socialism, a guaranteed basic income, and a radical redistribution of economic power.'
      }
    ],
    economicModel: 'Cooperative economics, municipal ownership, strong labor rights, and progressive taxation.',
    viewOfState: 'A moral instrument to protect the vulnerable, abolish poverty, and maintain the common good.',
    criticisms: [
      'Secular socialists object to theological justifications in pluralistic politics',
      'Religious conservatives argue Christian charity must be strictly private and non-state mandated'
    ],
    keyTextsOrManifestos: ['Christianity and the Social Crisis (Rauschenbusch)', 'Tracts on Christian Socialism (Maurice)', 'Where Do We Go from Here: Chaos or Community? (MLK)'],
    spectrumPlacement: 'Left-Wing Religious Socialist',
    iconSymbol: '✝🌹'
  },
  {
    id: 'utopian-socialism',
    name: 'Utopian Socialism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Voluntary model cooperative communities as the blueprint for an ideal egalitarian society.',
    definition: 'The earliest modern socialist thought (pre-Marxist), which believed that a just and egalitarian society could be built through the moral persuasion of elites and the founding of voluntary model cooperative communities.',
    historicalOrigins: 'Early 19th century in France and Britain (Robert Owen, Henri de Saint-Simon, Charles Fourier).',
    coreTenets: [
      'Belief in the inherent goodness of humanity shaped by environment and education',
      'Voluntary cooperative communities without coercion or class hatred',
      'Abolition of competitive cutthroat commerce in favor of associative harmony',
      'Appeals to reason and moral conscience across all social classes'
    ],
    keyThinkers: ['Robert Owen', 'Charles Fourier', 'Henri de Saint-Simon', 'Étienne Cabet'],
    realWorldExamples: [
      {
        title: 'New Lanark Cotton Mills',
        periodOrLocation: '1800–1825 (Scotland)',
        description: 'Robert Owen reduced work hours, opened Britain\'s first nursery and free school for children, and proved humane workplaces could be profitable.'
      },
      {
        title: 'Fourierist Phalansteries & Brook Farm',
        periodOrLocation: '1840s (USA & France)',
        description: 'Intentional communal settlements organized around cooperative labor, shared living quarters, and artistic creativity.'
      }
    ],
    economicModel: 'Harmonious cooperative communities, labor-voucher exchanges, profit-sharing enterprises.',
    viewOfState: 'Generally non-violent and decentralized; hoped moral examples would persuade states to peacefully adopt cooperative structures.',
    criticisms: [
      'Marx and Engels critiqued it for lacking a scientific analysis of class struggle and material economic laws',
      'Most experimental communes collapsed due to financial strain or internal friction'
    ],
    keyTextsOrManifestos: ['A New View of Society (Owen)', 'The Theory of the Four Movements (Fourier)', 'Socialism: Utopian and Scientific (Engels)'],
    spectrumPlacement: 'Early Pre-Marxist Egalitarian / Idealist Socialist',
    iconSymbol: '☀️'
  },
  {
    id: 'fourierism',
    name: 'Fourierism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Passionate attraction and cooperative Phalansteries for holistic human flourishing.',
    definition: 'The utopian socialist philosophy of Charles Fourier, which proposed organizing society into cooperative communities called "Phalansteries" designed to harmonize all 810 distinct human psychological passions and personality types.',
    historicalOrigins: 'Formulated in France in the 1810s–1830s; sparked a major commune movement across the United States in the 1840s.',
    coreTenets: [
      'Theory of Passional Attraction: human passions are divine and should be liberated, not repressed',
      'Attractive Labor: work should be rotated and made fun, artistic, and varied',
      'Phalansteries: self-contained agricultural and industrial communities of ~1,600 people',
      'Early advocacy of women\'s liberation (Fourier coined the term "féminisme")'
    ],
    keyThinkers: ['Charles Fourier', 'Albert Brisbane', 'Victor Considerant'],
    realWorldExamples: [
      {
        title: 'North American Phalanx',
        periodOrLocation: '1843–1856 (New Jersey, USA)',
        description: 'Longest-running secular Fourierist community in the US, known for advanced cooperative agriculture and equal rights for women.'
      }
    ],
    economicModel: 'Joint-stock cooperatives where profits are distributed according to Capital (4/12), Labor (5/12), and Talent/Knowledge (3/12).',
    viewOfState: 'Voluntary self-governing phalanxes confederated globally without coercive state bureaucracies.',
    criticisms: [
      'Highly eccentric cosmological and numerical theories alongside brilliant sociological insights',
      'Difficulty sustaining complex community production over generations'
    ],
    keyTextsOrManifestos: ['The Social Destiny of Man (Brisbane)', 'The New Industrial World (Fourier)'],
    spectrumPlacement: 'Utopian / Communal Socialist',
    iconSymbol: '🏛️🌸'
  },
  {
    id: 'saint-simonianism',
    name: 'Saint-Simonianism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Technocratic industrialism, scientific planning, and the moral glorification of production.',
    definition: 'An early French socialist and technocratic movement founded by Henri de Saint-Simon, advocating that society should be organized and directed by scientists, engineers, and industrial producers for the benefit of the poorest class.',
    historicalOrigins: 'Post-Napoleonic France (1820s–1830s), influencing the founders of modern engineering, banking, and sociology.',
    coreTenets: [
      'Rule by the "Industriels" (workers, scientists, industrialists) over parasitic feudal aristocrats and idle rentiers',
      'Meritocratic economic planning and large-scale public works',
      'Abolition of inherited wealth; inheritance to be transferred to the public treasury',
      'The "New Christianity": moral duty to uplift the poorest and most numerous class'
    ],
    keyThinkers: ['Henri de Saint-Simon', 'Barthélemy Prosper Enfantin', 'Auguste Comte (early)'],
    realWorldExamples: [
      {
        title: 'Suez Canal & French Railway Network',
        periodOrLocation: '1850s–1869 (France & Egypt)',
        description: 'Ferdinand de Lesseps and Saint-Simonian engineers designed and financed major transcontinental canals and infrastructure to unify global commerce.'
      }
    ],
    economicModel: 'Public investment banking (Crédit Mobilier), merit-based allocation of capital, elimination of speculative unearned inheritance.',
    viewOfState: 'Transformation of the state into a centralized planning bureau of science, production, and public engineering.',
    criticisms: [
      'Tendency toward paternalistic technocracy with limited grassroots democratic input',
      'Degenerated into a pseudo-religious mystical cult under Enfantin in its later Parisian phase'
    ],
    keyTextsOrManifestos: ['The New Christianity (Saint-Simon)', 'The Industrial System (Saint-Simon)', 'The Doctrine of Saint-Simon (Bazard)'],
    spectrumPlacement: 'Technocratic Socialist / Early Industrialist',
    iconSymbol: '🏗️'
  },
  {
    id: 'syndicalism',
    name: 'Syndicalism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Trade unions as the basic unit of both revolutionary struggle and social management.',
    definition: 'A revolutionary movement that aims to transfer the ownership and control of the means of production to trade unions, through industrial unionism, direct action, and general strikes.',
    historicalOrigins: 'Late 19th-century France (CGT Charte d\'Amiens 1906) and the wider Mediterranean and Latin American labor movements.',
    coreTenets: [
      'Industrial solidarity: all workers in one industry organized into one union',
      'Direct industrial action: boycotts, sabotage, and the revolutionary general strike',
      'Autonomous trade unions managing workplaces without politicians or state interference',
      'Federation of industrial unions replacing parliamentary governments'
    ],
    keyThinkers: ['Georges Sorel', 'Hubert Lagardelle', 'Émile Pouget', 'Daniel De Leon'],
    realWorldExamples: [
      {
        title: 'French Confédération Générale du Travail (CGT) Charter of Amiens',
        periodOrLocation: '1906 (France)',
        description: 'Asserted the total independence of the labor movement from all political parties and declared the union as the future organ of production.'
      }
    ],
    economicModel: 'Syndicate-managed industries grouped into local and national federations, eliminating capitalist shareholders.',
    viewOfState: 'The state is an instrument of bourgeois property that must be replaced by industrial union federations.',
    criticisms: [
      'Difficulty coordinating broader societal needs outside the workplace (consumers, retirees, healthcare)',
      'Vulnerability of industrial strikes to military repression'
    ],
    keyTextsOrManifestos: ['Reflections on Violence (Sorel)', 'The Socialist Reconstruction of Society (De Leon)', 'The Charte d\'Amiens (1906)'],
    spectrumPlacement: 'Far-Left Revolutionary Labor',
    iconSymbol: '⚙️🚩'
  },
  {
    id: 'guild-socialism',
    name: 'Guild Socialism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Democratic worker guilds managing industries paired with a democratic consumer state.',
    definition: 'A British socialist movement in the early 20th century advocating for the democratic self-management of industries through reformed medieval-style trade guilds, operating alongside a democratic state representing citizens as consumers.',
    historicalOrigins: 'Developed in Great Britain between 1906 and the 1920s by G.D.H. Cole, S.G. Hobson, and A.R. Orage.',
    coreTenets: [
      'Functional democracy: representation based on occupational function as well as geography',
      'Industrial self-government through national workers\' guilds',
      'Dual governance: Guild Congress representing producers + Democratic Parliament representing consumers',
      'Abolition of the wage system and dehumanizing industrial discipline'
    ],
    keyThinkers: ['G.D.H. Cole', 'S.G. Hobson', 'A.R. Orage', 'R.H. Tawney', 'Bertrand Russell (partially)'],
    realWorldExamples: [
      {
        title: 'National Building Guild',
        periodOrLocation: '1920–1923 (United Kingdom)',
        description: 'Built thousands of high-quality municipal council houses under direct democratic builder management and guaranteed continuous pay.'
      }
    ],
    economicModel: 'Public ownership of industrial capital leased to self-governing National Guilds of workers and technical experts.',
    viewOfState: 'Decentralized state acting as trustee and representing consumers, checking the power of producer guilds.',
    criticisms: [
      'Complex coordination between consumer and producer chambers could create bureaucratic gridlock',
      'Collapsed in the 1920s post-WWI economic slump and credit contraction'
    ],
    keyTextsOrManifestos: ['Guild Socialism Restated (G.D.H. Cole)', 'Self-Government in Industry (Cole)', 'The Acquisitive Society (Tawney)'],
    spectrumPlacement: 'Democratic Left / Pluralist Socialist',
    iconSymbol: '🛡️🛠️'
  },
  {
    id: 'agrarian-socialism',
    name: 'Agrarian Socialism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Communal land ownership, peasant rights, and rural agricultural cooperatives.',
    definition: 'A political ideology that combines an agrarian way of life with socialist economic policies, focusing on the redistribution of land to peasant cultivators and communal agricultural management.',
    historicalOrigins: 'Russian Narodniks (1870s), the Russian Socialist-Revolutionary Party (SRs), the Mexican Revolution (Zapatismo), and 20th-century African socialism.',
    coreTenets: [
      'Land to the tiller: breaking up large feudal/corporate estates and giving land to peasant communes',
      'Traditional rural village communes (e.g., Russian Mir, Mexican Ejido) as the base for socialism',
      'Decentralized agrarian democracy and rural community autonomy',
      'Opposition to industrial urban exploitation of rural farmers'
    ],
    keyThinkers: ['Alexander Herzen', 'Victor Chernov', 'Emiliano Zapata', 'Julius Nyerere', 'Taras Shevchenko'],
    realWorldExamples: [
      {
        title: 'Zapatista Agrarian Revolution & Plan de Ayala',
        periodOrLocation: '1910–1919 (Morelos, Mexico)',
        description: 'Emiliano Zapata\'s Liberation Army of the South reclaimed sugar plantations and redistributed them as communal village lands ("Tierra y Libertad").'
      },
      {
        title: 'Russian Socialist-Revolutionary Party & 1917 Land Decree',
        periodOrLocation: '1901–1918 (Russia)',
        description: 'Represented Russia\'s massive peasant majority, winning the 1917 Constituent Assembly election on a platform of socializing all land.'
      },
      {
        title: 'Ujamaa in Tanzania (Julius Nyerere)',
        periodOrLocation: '1967–1985 (Tanzania)',
        description: 'Arusha Declaration established collective agrarian villages based on traditional African family solidarity.'
      }
    ],
    economicModel: 'Communal land tenure, agricultural marketing cooperatives, rural credit unions, village-scale light industry.',
    viewOfState: 'Federal, decentralized republic protecting peasant communes from predatory land speculation and urban monopolies.',
    criticisms: [
      'Lower industrial productivity compared to modern intensive mechanized agriculture',
      'Resistance from traditional individualist smallholders when collective pooling is mandated'
    ],
    keyTextsOrManifestos: ['Plan de Ayala (Emiliano Zapata)', 'The Arusha Declaration (Nyerere)', 'Letters from the Country (Herzen)'],
    spectrumPlacement: 'Left-Wing Agrarian / Populist Socialist',
    iconSymbol: '🌾'
  },
  {
    id: 'blanquism',
    name: 'Blanquism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Seizure of state power by a small, secretive vanguard of armed conspirators.',
    definition: 'A conception of revolution named after Louis Auguste Blanqui, holding that socialist revolution should be carried out by a relatively small group of highly organized and secretive conspirators who seize power by sudden coup d\'état.',
    historicalOrigins: '19th-century France (1830s–1870s), born out of secret carbonari conspiratorial societies in Paris.',
    coreTenets: [
      'Conspiratorial vanguard insurrection rather than waiting for mass working-class consciousness',
      'Immediate temporary revolutionary dictatorship to disarm the bourgeoisie and establish public education',
      'Abolition of all churches, religion, and standing armies',
      'Absolute dedication and sacrifice by revolutionary cadres'
    ],
    keyThinkers: ['Louis Auguste Blanqui', 'Gustave Tridon', 'Édouard Vaillant'],
    realWorldExamples: [
      {
        title: 'Society of Seasons Insurrection (Paris)',
        periodOrLocation: 'May 12, 1839 (Paris, France)',
        description: 'Several hundred armed Blanquists stormed the Paris City Hall and Palais de Justice in an audacious surprise uprising.'
      },
      {
        title: 'Paris Commune Blanquist Delegation',
        periodOrLocation: '1871 (Paris, France)',
        description: 'Blanquists formed the most militarized faction of the Paris Commune, directing its Committee of Public Safety.'
      }
    ],
    economicModel: 'Immediate state takeover of large estates, factories, and banks to reorganize production under national direction.',
    viewOfState: 'Dictatorship of the revolutionary elite until the general populace can be re-educated into egalitarian consciousness.',
    criticisms: [
      'Marx and Engels criticized it for ignoring economic material conditions and substituting a secret clique for the working class',
      'Insurrections failed repeatedly due to lack of broad popular mass mobilization'
    ],
    keyTextsOrManifestos: ['Instruction for an Armed Uprising (Blanqui)', 'Critique of Socialism (Blanqui)'],
    spectrumPlacement: 'Far-Left Insurrectionary Conspiratorial',
    iconSymbol: '🗡️'
  },
  {
    id: 'castroism',
    name: 'Castroism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Anti-imperialist national sovereignty, universal public welfare, and foco guerrilla revolution.',
    definition: 'The revolutionary theory and political practice developed by Fidel Castro during the Cuban Revolution, combining Marxist-Leninism, radical Martí-style anti-imperialism, universal health/education systems, and internationalist medical solidarity.',
    historicalOrigins: 'Cuban Revolution (1953–1959), starting with the assault on the Moncada Barracks and the 26th of July Movement.',
    coreTenets: [
      'Uncompromising national sovereignty and resistance to US imperial hegemony',
      'Universal, free world-class public healthcare, biotechnology, and literacy/education',
      'Internationalism: deploying doctors, teachers, and anti-apartheid military volunteers across Africa and Latin America',
      'Committees for the Defense of the Revolution (CDRs) organizing neighborhood civic life'
    ],
    keyThinkers: ['Fidel Castro', 'Raúl Castro', 'José Martí (foundational national hero)', 'Che Guevara'],
    realWorldExamples: [
      {
        title: 'Cuban Literacy Campaign & Universal Healthcare System',
        periodOrLocation: '1961–Present (Cuba)',
        description: 'Eradicated illiteracy in a single year (1961) and built a medical system with a higher doctor-to-patient ratio than most developed nations.'
      },
      {
        title: 'Cuban Intervention in Angola (Operation Carlota)',
        periodOrLocation: '1975–1991 (Angola & Southern Africa)',
        description: 'Deployed over 300,000 Cuban troops to defeat South African apartheid army incursions, paving the way for Namibian independence.'
      }
    ],
    economicModel: 'State-owned socialist enterprises, state rationing distribution, cooperative organic agriculture (Organopónicos), emerging small private co-ops.',
    viewOfState: 'One-party socialist state governed by the Communist Party of Cuba and National Assembly of People\'s Power.',
    criticisms: [
      'Severe economic hardship exacerbated by the 60+ year US embargo and state economic inefficiencies',
      'Restrictions on independent political parties and state media monopoly'
    ],
    keyTextsOrManifestos: ['History Will Absolve Me (Fidel Castro)', 'Second Declaration of Havana (1962)', 'Speeches at the UN (Castro)'],
    spectrumPlacement: 'Far-Left Anti-Imperialist Communist',
    iconSymbol: '🇨🇺'
  },
  {
    id: 'guevarism',
    name: 'Guevarism (Foquismo)',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Foco vanguard guerrilla war, creation of the "New Man", and uncompromising world revolution.',
    definition: 'The revolutionary theory formulated by Ernesto "Che" Guevara, arguing that a small, dedicated guerrilla band (foco) in rural areas can create the subjective conditions for revolution without waiting for traditional Marxist preconditions, guided by moral rather than material incentives.',
    historicalOrigins: 'Developed during the Cuban guerrilla campaign in the Sierra Maestra (1956–1958) and articulated in Guerilla Warfare (1960).',
    coreTenets: [
      'Foco Theory: small rural armed cadres can spark mass peasant uprising and overthrow state forces',
      'The "New Socialist Man": motivated by moral duty and social consciousness rather than monetary bonuses',
      'Tricontinental solidarity: "Create two, three, many Vietnams" to defeat global imperialism',
      'Voluntary weekend labor and total dedication to international liberation'
    ],
    keyThinkers: ['Ernesto "Che" Guevara', 'Régis Debray', 'Camilo Cienfuegos'],
    realWorldExamples: [
      {
        title: 'Sierra Maestra Campaign & Battle of Santa Clara',
        periodOrLocation: '1956–1958 (Cuba)',
        description: 'Che\'s column derailed an armored munitions train at Santa Clara, causing dictator Fulgencio Batista to flee the country.'
      },
      {
        title: 'Guerrilla Campaigns in the Congo and Bolivia',
        periodOrLocation: '1965 & 1967 (Congo & Bolivia)',
        description: 'Che\'s international missions attempting to build anti-imperialist guerrilla fronts in Central Africa and the Andes.'
      }
    ],
    economicModel: 'Budgetary Finance System: centralized state enterprise budgeting, elimination of commodity relations between public factories, moral incentives.',
    viewOfState: 'Militarized revolutionary vanguard state leading to international proletarian liberation.',
    criticisms: [
      'Foco tactics proved catastrophic when copied in Bolivia, Argentina, and Colombia without local peasant support',
      'Che was captured and executed in Bolivia in 1967 due to isolation from local communities'
    ],
    keyTextsOrManifestos: ['Guerrilla Warfare (Che Guevara)', 'Man and Socialism in Cuba (Che)', 'Message to the Tricontinental (Che)'],
    spectrumPlacement: 'Far-Left Revolutionary Guerrilla Internationalism',
    iconSymbol: '⭐🇨🇱'
  },
  {
    id: 'chavismo',
    name: 'Chavismo (Bolivarian Socialism)',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Bolivarian anti-imperialism, oil-funded social missions, and participatory communal democracy.',
    definition: 'The left-wing populist, socialist political ideology based on the ideas, programs, and government style associated with Hugo Chávez in Venezuela, combining Bolivarian nationalism, anti-imperialism, mass participatory democracy, and oil-funded social programs ("Misiones").',
    historicalOrigins: 'Formed in Venezuela during the 1990s, winning the 1998 presidential election and enacting the 1999 Bolivarian Constitution.',
    coreTenets: [
      'Bolivarianism: Latin American anti-imperialist regional integration (ALBA, CELAC, Petrocaribe)',
      'Social Missions (Misiones): channeling state oil revenue directly into free clinics, subsidized food markets, and public universities',
      'Communal Councils and Communes: direct neighborhood self-management',
      'Civilian-Military alliance (Unión Cívico-Militar)'
    ],
    keyThinkers: ['Hugo Chávez', 'Simón Bolívar (foundational liberator)', 'Simón Rodríguez', 'Jorge Giordani'],
    realWorldExamples: [
      {
        title: 'Misión Barrio Adentro & Misión Robinson',
        periodOrLocation: '2003–Present (Venezuela)',
        description: 'Stationed 30,000 Cuban doctors in impoverished favelas/barrios and taught 1.5 million adults to read, cutting poverty in the 2000s.'
      },
      {
        title: 'ALBA (Bolivarian Alliance for the Peoples of Our America)',
        periodOrLocation: '2004–Present (Latin America & Caribbean)',
        description: 'Fair-trade regional trade pact exchanging discounted Venezuelan oil for Cuban doctors and agricultural supplies.'
      }
    ],
    economicModel: 'State-controlled oil sector (PDVSA), public nationalizations of telecommunications and steel, subsidized price controls, communal production.',
    viewOfState: 'Strong executive presidential state mobilizing mass popular plebiscites and constitutional assemblies.',
    criticisms: [
      'Extreme vulnerability to global oil price crashes ("Dutch disease") and catastrophic hyperinflation post-2014',
      'Severe shortages, corruption, political polarization, and mass emigration under Nicolás Maduro'
    ],
    keyTextsOrManifestos: ['Constitution of the Bolivarian Republic of Venezuela (1999)', 'Chávez: The Blue Book (Hugo Chávez)', 'Socialism of the 21st Century (Heinz Dieterich)'],
    spectrumPlacement: 'Left-Wing Bolivarian / 21st-Century Socialist',
    iconSymbol: '🔴🇻🇪'
  },
  {
    id: 'de-leonism',
    name: 'De Leonism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Industrial union government combined with revolutionary ballot-box political action.',
    definition: 'An early 20th-century Marxist variant developed by Daniel De Leon, advocating for a two-pronged revolutionary strategy: an industrial union to seize the workplaces and a political party to win the electoral ballot box and dismantle the state.',
    historicalOrigins: 'United States Socialist Labor Party (SLP) in the 1890s–1910s.',
    coreTenets: [
      'Socialist Industrial Unionism: the union is the sole legitimate future administrative organ of society',
      'Use of political elections solely to gain a majority and declare the capitalist state dissolved',
      'Abolition of the political state immediately upon revolution, replacing it with an Industrial Government',
      'Labor vouchers based on hours worked'
    ],
    keyThinkers: ['Daniel De Leon', 'James Connolly (early SLP work)', 'Boris Reinstein'],
    realWorldExamples: [
      {
        title: 'Socialist Labor Party of America (SLP)',
        periodOrLocation: '1890s–1920s (USA)',
        description: 'First Marxist political party in the US, influential in the founding conventions of the Industrial Workers of the World (IWW) in 1905.'
      }
    ],
    economicModel: 'Industrial union self-management, production for use, labor-time vouchers without capitalist money.',
    viewOfState: 'The political state is dismantled immediately following electoral victory; governance transfers to the Socialist Industrial Union Congress.',
    criticisms: [
      'Dogmatic rejection of day-to-day reform strikes as "mere palliatives"',
      'Strict organizational purism prevented it from becoming a mass party'
    ],
    keyTextsOrManifestos: ['Socialist Reconstruction of Society (De Leon)', 'Two Pages from Roman History (De Leon)', 'Reform or Revolution (De Leon)'],
    spectrumPlacement: 'Far-Left Industrial Marxist / Dual-Action Socialist',
    iconSymbol: '🏛️⚙️'
  },
  {
    id: 'hoxhaism',
    name: 'Hoxhaism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Strict anti-revisionist Stalinist orthodoxy and complete autarkic self-reliance.',
    definition: 'An anti-revisionist communist tendency associated with Enver Hoxha of Albania, which fiercely defended the legacy of Joseph Stalin and denounced all post-1953 Soviet leaders (Khrushchev, Brezhnev), Maoist China, and Titoist Yugoslavia as capitalist revisionists.',
    historicalOrigins: 'Socialist People\'s Republic of Albania (1944–1985), leading to the Sino-Albanian split in the late 1970s.',
    coreTenets: [
      'Strict, uncompromising defense of Stalin\'s Marxist-Leninist doctrines',
      'Denunciation of Soviet, Yugoslav, Eurocommunist, and Chinese leadership as "revisionist renegades"',
      'Complete national autarky and prohibition of foreign loans or investments',
      'Extreme state atheism (declared Albania the world\'s first constitutionally atheist state in 1967) and massive bunker construction'
    ],
    keyThinkers: ['Enver Hoxha', 'Mehmet Shehu', 'Ramiz Alia'],
    realWorldExamples: [
      {
        title: 'People\'s Socialist Republic of Albania',
        periodOrLocation: '1944–1991 (Albania)',
        description: 'Eradicated malaria, modernized agriculture, and constructed over 173,000 concrete military defense bunkers across the country.'
      }
    ],
    economicModel: 'Complete state command economy, total prohibition of private property and religion, absolute national self-reliance.',
    viewOfState: 'Rigid totalitarian state dictatorship with internal security surveillance (Sigurimi).',
    criticisms: [
      'Severe economic and cultural isolation from the rest of the world, leaving Albania the poorest country in Europe by 1990',
      'Brutal political persecution of perceived internal dissidents and religious believers'
    ],
    keyTextsOrManifestos: ['Imperialism and the Revolution (Hoxha)', 'Eurocommunism is Anti-Communism (Hoxha)', 'The Khrushchevites (Hoxha)'],
    spectrumPlacement: 'Far-Left Ultra-Orthodox Anti-Revisionist',
    iconSymbol: '🇦🇱'
  },
  {
    id: 'juche',
    name: 'Juche (Kimilsungism-Kimjongilism)',
    category: 'Socialism, Communism & Marxism',
    tagline: 'National self-reliance, military-first doctrine, and sovereign dynastic leadership.',
    definition: 'The official state ideology of North Korea (DPRK), formulated by Kim Il-sung, positing that humanity is the master of its own destiny through political independence (Chaju), economic self-sustenance (Charip), and self-defense (Chawi), combined with Songun (military-first) and dynastic leader reverence.',
    historicalOrigins: 'First articulated by Kim Il-sung in 1955 to assert independence from Soviet de-Stalinization and Chinese interference.',
    coreTenets: [
      'Man is the master of all things and decides everything through ideological consciousness',
      'Chaju (Independence): total political autonomy without submission to foreign superpowers',
      'Charip (Self-Reliance): economic autarky and domestic heavy industry',
      'Songun (Military-First): Korean People\'s Army prioritized as the primary pillar of state and society'
    ],
    keyThinkers: ['Kim Il-sung', 'Kim Jong-il', 'Kim Jong-un', 'Hwang Jang-yop (philosophical architect who later defected)'],
    realWorldExamples: [
      {
        title: 'Democratic People\'s Republic of Korea (DPRK)',
        periodOrLocation: '1948–Present (North Korea)',
        description: 'Constructed an indigenous nuclear deterrent and vast standing army while maintaining absolute political control under the Workers\' Party of Korea.'
      }
    ],
    economicModel: 'State-planned command economy with heavy militarized industrial focus and the Taean industrial management work system.',
    viewOfState: 'Totalitarian dynastic state centered on the supreme leader (Suryong) as the brain and heart of the collective national organism.',
    criticisms: [
      'Catastrophic famines in the 1990s ("Arduous March") and severe international sanctions',
      'Pervasive human rights violations, prison labor camps (Kwalliso), and dynastic succession'
    ],
    keyTextsOrManifestos: ['On the Juche Idea (Kim Jong-il)', 'For the Complete Victory of Socialism (Kim Il-sung)'],
    spectrumPlacement: 'Far-Left / National-Autarkic Totalitarian',
    iconSymbol: '🇰🇵'
  },
  {
    id: 'kautskyism',
    name: 'Kautskyism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Parliamentary democratic transition, orthodox economic theory, and ultra-imperialism.',
    definition: 'The theoretical approach of Karl Kautsky during his late period (post-1914), defending orthodox Marxist economic analysis while arguing that socialism must be achieved strictly through parliamentary democratic majorities, rejecting Lenin\'s vanguard dictatorship.',
    historicalOrigins: 'Second International debates, Weimar Germany SPD, and Kautsky\'s polemics with Lenin and Trotsky (1918–1930).',
    coreTenets: [
      'Democracy is indispensable for socialism: rejecting the dictatorship of the proletariat as single-party tyranny',
      'Theory of Ultra-Imperialism: global capitalist powers will eventually unite in peaceful cartels rather than wage endless world wars',
      'Parliamentary conquest of the state as the only legitimate pathway to socialist transformation',
      'Preservation of universal suffrage, freedom of the press, and civil liberties during transition'
    ],
    keyThinkers: ['Karl Kautsky', 'Rudolf Hilferding (Finance Capital)', 'Otto Bauer'],
    realWorldExamples: [
      {
        title: 'Independent Social Democratic Party (USPD) & Weimar SPD',
        periodOrLocation: '1917–1933 (Germany)',
        description: 'Maintained mass socialist parliamentary representation and social welfare legislation in interwar Germany.'
      }
    ],
    economicModel: 'Socialization of major banking and natural monopolies through democratic legislative acts.',
    viewOfState: 'Democratic parliamentary constitutional republic captured and utilized by the working-class majority.',
    criticisms: [
      'Lenin famously branded him the "renegade Kautsky" for voting for German war credits in WWI and opposing the October Revolution',
      'Underestimated the violent rise of fascism, which crushed Weimar social democracy in 1933'
    ],
    keyTextsOrManifestos: ['The Dictatorship of the Proletariat (Kautsky)', 'Terrorism and Communism: A Contribution to the Natural History of Revolution (Kautsky)', 'Imperialism and the War (Kautsky)'],
    spectrumPlacement: 'Democratic Marxist / Orthodox Parliamentary Socialist',
    iconSymbol: '🏛️📜'
  },
  {
    id: 'nasserism',
    name: 'Nasserism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Pan-Arab unity, anti-imperialist non-alignment, and state-led Arab socialism.',
    definition: 'An Arab nationalist, anti-imperialist, and socialist political ideology based on the thinking and policies of Gamal Abdel Nasser, president of Egypt from 1956 to 1970, which combined Arab unity with state-directed modernization.',
    historicalOrigins: '1952 Egyptian Free Officers Revolution, overthrowing King Farouk and nationalizing the Suez Canal in 1956.',
    coreTenets: [
      'Pan-Arab Nationalism: uniting the Arab world from the Atlantic to the Persian Gulf',
      'Arab Socialism: land reform, nationalization of major banks/industries, and free state university education',
      'Anti-Imperialism & Non-Alignment: founding member of the Non-Aligned Movement (Bandung 1955)',
      'Strategic infrastructure modernization (Aswan High Dam)'
    ],
    keyThinkers: ['Gamal Abdel Nasser', 'Mohamed Hassanein Heikal'],
    realWorldExamples: [
      {
        title: 'Nationalization of the Suez Canal & Suez Crisis',
        periodOrLocation: '1956 (Egypt)',
        description: 'Nasser nationalized the British-French canal, withstanding joint British, French, and Israeli military invasion to achieve a monumental political victory.'
      },
      {
        title: 'United Arab Republic (UAR)',
        periodOrLocation: '1958–1961 (Egypt & Syria)',
        description: 'Political union between Egypt and Syria representing the high-water mark of Pan-Arab state unification.'
      }
    ],
    economicModel: 'State capitalism / Arab Socialism: sweeping agrarian land reforms breaking feudal estates, nationalized heavy industry and banking.',
    viewOfState: 'Strong centralized military-republican state leading national modernization through single-mass political organizations (Arab Socialist Union).',
    criticisms: [
      'Devastating military defeat in the 1967 Six-Day War shattered pan-Arab prestige',
      'Authoritarian suppression of political parties, including the Muslim Brotherhood and Egyptian communist parties'
    ],
    keyTextsOrManifestos: ['The Philosophy of the Revolution (Nasser)', 'The National Charter of Egypt (1962)'],
    spectrumPlacement: 'Left-Wing Arab Nationalist / Arab Socialist',
    iconSymbol: '🇪🇬'
  },
  {
    id: 'revisionist-marxism',
    name: 'Revisionist Marxism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Evolutionary reform of capitalism through democracy: "The movement is everything, the final goal nothing."',
    definition: 'A current within late 19th-century Marxism, initiated by Eduard Bernstein, which revised Marx\'s core predictions—arguing that capitalism was not collapsing, class polarization was not absolute, and socialism should be achieved gradually through parliamentary reforms and trade union power.',
    historicalOrigins: 'German SPD in the 1890s, sparking the famous "Revisionist Controversy" with Rosa Luxemburg and Karl Kautsky.',
    coreTenets: [
      'Rejection of the inevitability of catastrophic capitalist collapse',
      'The middle class was expanding rather than disappearing into the proletariat',
      'Gradual evolutionary socialization via universal franchise, municipal enterprise, and labor laws',
      'Kant-inspired ethical socialism: socialism as a moral imperative rather than mechanical historical determinism'
    ],
    keyThinkers: ['Eduard Bernstein', 'Jean Jaurès', 'Carlo Rosselli'],
    realWorldExamples: [
      {
        title: 'German SPD Godesberg Program (1959)',
        periodOrLocation: '1959 (West Germany)',
        description: 'The SPD officially dropped orthodox Marxist class struggle and state ownership of all production in favor of a social market economy: "As much market as possible, as much state as necessary."'
      }
    ],
    economicModel: 'Mixed economy, progressive wealth redistribution, robust labor unions, public utilities.',
    viewOfState: 'The democratic state is a neutral instrument that can be progressively democratized to serve the entire public interest.',
    criticisms: [
      'Revolutionaries argued that revisionism strip-mined Marxism of its revolutionary core, leaving capitalism permanently intact',
      'Paved the way for modern centrist neoliberal adaptations of social democracy'
    ],
    keyTextsOrManifestos: ['Evolutionary Socialism: Die Voraussetzungen des Sozialismus (Bernstein)', 'Liberal Socialism (Carlo Rosselli)'],
    spectrumPlacement: 'Center-Left Democratic Reformist',
    iconSymbol: '📈🌹'
  },
  {
    id: 'western-marxism',
    name: 'Western Marxism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Cultural hegemony, alienation, critical theory, and the critique of mass consumer culture.',
    definition: 'A diverse body of Marxist theory originating in Central and Western Europe in the 1920s that shifted focus away from classical economic determinism toward philosophy, cultural hegemony, aesthetics, psychology, and the Frankfurt School\'s Critical Theory.',
    historicalOrigins: '1920s–1960s across Italy, Germany, and France (Gramsci, Lukács, Frankfurt School).',
    coreTenets: [
      'Cultural Hegemony: the ruling class maintains dominance through cultural institutions, media, and common sense (Gramsci)',
      'Reification and Commodity Fetishism: capitalist relations permeating all human consciousness (Lukács)',
      'Critical Theory: analyzing how the culture industry pacifies the working class through mass entertainment (Adorno & Horkheimer)',
      'Integration of Freudian psychoanalysis with Marxist sociology (Marcuse, Fromm)'
    ],
    keyThinkers: ['Antonio Gramsci', 'György Lukács', 'Theodor Adorno', 'Max Horkheimer', 'Herbert Marcuse', 'Walter Benjamin', 'Jürgen Habermas'],
    realWorldExamples: [
      {
        title: 'New Left & May 1968 Student-Worker Revolts',
        periodOrLocation: '1968 (Paris, France & Global)',
        description: 'Mass general strike of 10 million workers and student occupations inspired by Marcuse, Situationists, and anti-authoritarian Western Marxism.'
      },
      {
        title: 'Frankfurt Institute for Social Research',
        periodOrLocation: '1923–Present (Frankfurt, Germany)',
        description: 'Pioneered critical interdisciplinary research exposing authoritarian psychological structures and instrumental rationality.'
      }
    ],
    economicModel: 'Decommodified cultural production, democratic self-management, liberation from consumerist alienating labor.',
    viewOfState: 'The state is deeply intertwined with cultural hegemony ("Integral State = Dictatorship + Hegemony"); revolution requires a "war of position" in civil society.',
    criticisms: [
      'Often criticized for dense academic obscurantism, pessimism, and detachment from practical working-class labor organizing',
      'Soviet theorists denounced it as idealist deviation from historical materialism'
    ],
    keyTextsOrManifestos: ['Prison Notebooks (Gramsci)', 'History and Class Consciousness (Lukács)', 'Dialectic of Enlightenment (Adorno/Horkheimer)', 'One-Dimensional Man (Marcuse)'],
    spectrumPlacement: 'Left-Wing Critical Theory / Cultural Marxism',
    iconSymbol: '🧠'
  },
  {
    id: 'religious-socialism',
    name: 'Religious Socialism',
    category: 'Socialism, Communism & Marxism',
    tagline: 'Egalitarianism, social welfare, and stewardship grounded in world religious traditions.',
    definition: 'A broad category of political philosophies that ground socialist economics and social justice in the values, ethics, and scriptures of world religions (including Islam, Judaism, Buddhism, and Hinduism).',
    historicalOrigins: 'Pre-modern religious communal movements (Early Islamic Caliphate bayt al-mal, Jewish Kibbutzim, Buddhist economics).',
    coreTenets: [
      'Spiritual mandate against greed, usury, and exploitation of laborers',
      'The earth and natural resources belong ultimately to the Divine / all creation, not private monopolists',
      'Sacred duty of caring for the poor and vulnerable',
      'Harmony, peace, and spiritual brotherhood over cutthroat capitalist materialism'
    ],
    keyThinkers: ['Ali Shariati (Islamic Socialism)', 'Martin Buber (Religious Kibbutz Socialism)', 'E.F. Schumacher (Buddhist Economics)', 'Swami Vivekananda'],
    realWorldExamples: [
      {
        title: 'Early Israeli Kibbutz Movement',
        periodOrLocation: '1910s–1980s (Middle East)',
        description: 'Voluntary agrarian communal settlements combining Jewish cultural renewal with pure socialist collective living and direct democracy.'
      },
      {
        title: 'Ali Shariati & Islamic Socialist Intellectual Movement in Iran',
        periodOrLocation: '1960s–1970s (Iran)',
        description: 'Merged Shi\'a revolutionary theology with Marxist anti-imperialist sociology, inspiring the anti-monarchist generation.'
      }
    ],
    economicModel: 'Cooperative ownership, prohibition of exploitative interest/usury, generous wealth zakat/tithing redistribution, Buddhist "Small Is Beautiful" stewardship.',
    viewOfState: 'A community institution bound by moral spiritual laws to eliminate poverty and maintain social harmony.',
    criticisms: [
      'Can create conflicts between secular civil liberties and traditional religious dogmas',
      'Risk of sectarian divisions between different religious communities'
    ],
    keyTextsOrManifestos: ['Small Is Beautiful: Economics as if People Mattered (Schumacher)', 'Red Shi\'ism vs. Black Shi\'ism (Shariati)', 'Paths in Utopia (Buber)'],
    spectrumPlacement: 'Left-Wing Religious / Communitarian Socialist',
    iconSymbol: '🕊️🕯️'
  }
];
