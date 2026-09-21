import { PoliticalIdeology } from '../../types';

export const AUTHORITARIANISM_FASCISM_IDEOLOGIES: PoliticalIdeology[] = [
  {
    id: 'authoritarianism',
    name: 'Authoritarianism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Strict obedience to state authority at the expense of personal and political freedom.',
    definition: 'A principle of governance characterized by the rejection of political plurality, the use of strong central power to preserve the political status quo, and reductions in the rule of law, separation of powers, and democratic freedoms.',
    historicalOrigins: 'Ancient concepts of centralized rule (Rome, Sparta, Qin Dynasty China); analyzed in modern political science by Juan Linz.',
    coreTenets: [
      'Limited, non-responsible political pluralism (no genuine opposition allowed)',
      'Basis for legitimacy based on order, national security, or economic development rather than popular consent',
      'Minimal political mobilization; the regime encourages the public to remain passive and obedient',
      'Informally defined executive powers with weak institutional constraints'
    ],
    keyThinkers: ['Thomas Hobbes', 'Niccolò Machiavelli', 'Juan Linz (political scientist)', 'Samuel P. Huntington'],
    realWorldExamples: [
      {
        title: 'Lee Kuan Yew\'s Singapore (Soft Authoritarianism)',
        periodOrLocation: '1959–1990 (Singapore)',
        description: 'Combined rapid economic modernization, clean governance, and high living standards with strict curbs on political dissent and media.'
      },
      {
        title: 'Modern Competitive Authoritarian Regimes',
        periodOrLocation: 'Global (21st Century)',
        description: 'Holding multi-party elections while systematically tilting the playing field through state media control and judicial harassment of opponents.'
      }
    ],
    economicModel: 'Varies from state capitalism and corporate cronyism to efficient developmental technocracy.',
    viewOfState: 'The supreme arbiter of social order and national stability; political dissent is viewed as disruptive chaos.',
    criticisms: [
      'Lack of accountability leads to systemic corruption, human rights abuses, and suppression of free speech',
      'Difficulty managing peaceful political succession without crisis'
    ],
    keyTextsOrManifestos: ['Leviathan (Thomas Hobbes)', 'Totalitarian and Authoritarian Regimes (Juan Linz)', 'The Prince (Machiavelli)'],
    spectrumPlacement: 'Authoritarian Axis (Spans Left to Right)',
    iconSymbol: '🏛️🔒'
  },
  {
    id: 'totalitarianism',
    name: 'Totalitarianism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Total state control over all aspects of public and private human life.',
    definition: 'A concept for a form of government and political system that prohibits all opposition parties, outlaws individual and group opposition to the state, and exercises an extremely high degree of control and regulation over public and private life.',
    historicalOrigins: 'Coined in the 1920s by Italian anti-fascists and adopted by Giovanni Gentile/Mussolini; theorized by Hannah Arendt.',
    coreTenets: [
      '"Everything in the State, nothing outside the State, nothing against the State"',
      'Single all-powerful ruling party led by a charismatic dictator',
      'All-encompassing official ideology claiming to explain all human history and destiny',
      'Pervasive secret police surveillance, terror, and total monopoly over communications and weapons'
    ],
    keyThinkers: ['Hannah Arendt', 'Carl Joachim Friedrich', 'Zbigniew Brzezinski', 'George Orwell (literary critique)'],
    realWorldExamples: [
      {
        title: 'Nazi Germany under Adolf Hitler',
        periodOrLocation: '1933–1945 (Germany)',
        description: 'Total Gleichschaltung (coordination) of all social institutions, Gestapo surveillance, racial terror, and the Holocaust.'
      },
      {
        title: 'Soviet Union under Joseph Stalin',
        periodOrLocation: '1929–1953 (USSR)',
        description: 'Forced collectivization, NKVD terror, Gulag labor camps, and state control over art, science, and family life.'
      }
    ],
    economicModel: 'Total state command planning or state-coordinated war economy subordinated to regime goals.',
    viewOfState: 'An absolute, omnipotent entity that subordinates the individual entirely to the collective ideological mission.',
    criticisms: [
      'Catastrophic human atrocities, terror, mass extermination, and complete destruction of human dignity',
      'Economically and socially unsustainable over extended periods due to fear-induced paralysis and stagnation'
    ],
    keyTextsOrManifestos: ['The Origins of Totalitarianism (Hannah Arendt)', 'Totalitarian Dictatorship and Autocracy (Friedrich & Brzezinski)', '1984 (George Orwell)'],
    spectrumPlacement: 'Extreme Authoritarian Axis (Far-Left and Far-Right Variants)',
    iconSymbol: '👁️🔒'
  },
  {
    id: 'fascism',
    name: 'Fascism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Ultranationalist authoritarian rebirth, regimentation of society, and glorification of the state.',
    definition: 'A far-right, authoritarian, ultranationalist political ideology characterized by dictatorial power, the militaristic forcible suppression of opposition, and the subordination of individual interests for the perceived good of the nation.',
    historicalOrigins: 'Founded in Italy by Benito Mussolini and the Fasci Italiani di Combattimento in 1919 following World War I.',
    coreTenets: [
      'Palingenetic Ultranationalism: myth of national rebirth from decadent decay',
      'Total subordination of the individual to the organic nation and supreme leader (Duce/Führer)',
      'Glorification of violence, direct action, youth, and military struggle',
      'Anti-liberalism, anti-communism, and anti-conservatism (the "Third Way")'
    ],
    keyThinkers: ['Benito Mussolini', 'Giovanni Gentile', 'Gabriele D\'Annunzio', 'Roger Griffin (scholarly definition)'],
    realWorldExamples: [
      {
        title: 'Fascist Italy under Benito Mussolini',
        periodOrLocation: '1922–1943 (Italy)',
        description: 'March on Rome, Blackshirt squadristi violence, one-party corporate state, and colonial invasion of Ethiopia.'
      }
    ],
    economicModel: 'State corporatism: economy divided into employer-worker state syndicates to abolish labor strikes and enforce state quotas.',
    viewOfState: 'The spiritual and physical embodiment of the nation; the state creates the nation, not vice versa.',
    criticisms: [
      'Inherent drive toward aggressive imperial war, destruction of civil liberties, and brutal political murders',
      'Economic inefficiency, corruption, and military catastrophe in World War II'
    ],
    keyTextsOrManifestos: ['The Doctrine of Fascism (Mussolini & Gentile)', 'The Nature of Fascism (Roger Griffin)'],
    spectrumPlacement: 'Far-Right Ultranationalist Authoritarian',
    iconSymbol: '🪓🏛️'
  },
  {
    id: 'nazism',
    name: 'Nazism (National Socialism)',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Racial supremacy, violent antisemitism, totalitarian dictatorship, and Lebensraum.',
    definition: 'The totalitarian, fascist ideology of the Nazi Party (NSDAP) led by Adolf Hitler, incorporating fervent racial antisemitism, scientific racism, Social Darwinism, Aryan supremacy, and the pursuit of imperial living space (Lebensraum).',
    historicalOrigins: 'Weimar Germany in the 1920s (NSDAP founded 1920); seized power in Germany in January 1933.',
    coreTenets: [
      'Aryan Racial Supremacy and pseudoscientific Social Darwinist racial hierarchy',
      'Fanatical Antisemitism: blaming Jewish people for capitalism, communism, and moral decline',
      'Führerprinzip (Leader Principle): absolute, unquestioning obedience to the supreme leader Adolf Hitler',
      'Lebensraum: aggressive war of conquest to colonize Eastern Europe and enslave/exterminate Slavic populations'
    ],
    keyThinkers: ['Adolf Hitler', 'Alfred Rosenberg', 'Joseph Goebbels', 'Houston Stewart Chamberlain (precursor)'],
    realWorldExamples: [
      {
        title: 'The Third Reich & The Holocaust (Shoah)',
        periodOrLocation: '1933–1945 (Germany & Occupied Europe)',
        description: 'State-sponsored industrial mass murder of 6 million Jews and millions of Romani, disabled people, Soviet prisoners of war, and dissidents.'
      }
    ],
    economicModel: 'Four-Year Plan war economy, private conglomerates (Krupp, IG Farben) integrated under state directives, expropriation of Jewish assets (Aryanization), mass slave labor.',
    viewOfState: 'A racial-biological organism (völkischer Staat) whose sole purpose is to preserve and expand the Aryan race.',
    criticisms: [
      'Responsible for the most horrific industrialized genocide and destructive war in recorded human history',
      'Universally condemned as the pinnacle of criminal, antihuman evil'
    ],
    keyTextsOrManifestos: ['Mein Kampf (Adolf Hitler)', 'The Myth of the Twentieth Century (Alfred Rosenberg)'],
    spectrumPlacement: 'Extreme Far-Right Racial Totalitarian',
    iconSymbol: '🚫'
  },
  {
    id: 'neo-fascism',
    name: 'Neo-Fascism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Post-WWII revival of fascist ideology, authoritarian ultranationalism, and anti-immigration.',
    definition: 'A post-World War II ideology that includes significant elements of fascism, ultranationalism, opposition to liberal democracy, xenophobia, and authoritarian state power.',
    historicalOrigins: 'Formed in Italy with the Italian Social Movement (MSI) in 1946 and across Western Europe after 1945.',
    coreTenets: [
      'Rehabilitation or romanticization of interwar fascist regimes',
      'Militant ultranationalism and opposition to immigration and multiculturalism',
      'Authoritarian state governance and anti-communist/anti-liberal rhetoric',
      'Euroskepticism and anti-globalization'
    ],
    keyThinkers: ['Giorgio Almirante', 'Julius Evola', 'Pino Rauti', 'Maurice Bardèche'],
    realWorldExamples: [
      {
        title: 'Italian Social Movement (MSI) & "Years of Lead"',
        periodOrLocation: '1946–1995 (Italy)',
        description: 'Post-war neo-fascist party that contested elections while militant splinter factions engaged in street violence and bombings.'
      },
      {
        title: 'Golden Dawn (Chrysi Avgi) in Greece',
        periodOrLocation: '2012–2020 (Greece)',
        description: 'Militant paramilitary party that entered parliament during the debt crisis, later convicted in court as a criminal organization.'
      }
    ],
    economicModel: 'Economic nationalism, corporatist welfare for native citizens, protectionism.',
    viewOfState: 'Strong authoritarian security state enforcing national unity and cultural homogeneity.',
    criticisms: [
      'Promotes hate crimes, political violence, and xenophobic scapegoating of immigrant communities',
      'Subverts democratic norms and institutions'
    ],
    keyTextsOrManifestos: ['Men Among the Ruins (Julius Evola)', 'Nuremberg or the Promised Land (Bardèche)'],
    spectrumPlacement: 'Extreme Far-Right Post-War Fascist',
    iconSymbol: '⚡🪓'
  },
  {
    id: 'neo-nazism',
    name: 'Neo-Nazism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Post-WWII adherence to Adolf Hitler, white supremacy, Holocaust denial, and racial terrorism.',
    definition: 'Post-World War II militant groups and individuals that subscribe to the ideology of Nazism, promoting hatred of Jewish people, white supremacy, Holocaust denial, and violent attacks against racial and religious minorities.',
    historicalOrigins: 'Formed in the 1950s in the US (George Lincoln Rockwell) and post-war underground networks in Europe.',
    coreTenets: [
      'Veneration of Adolf Hitler and the Third Reich',
      'Militant white supremacism and promotion of racial violence',
      'Pseudoscience and Holocaust denial conspiracy theories',
      'Accelerationist domestic terrorism to collapse multiracial democracies'
    ],
    keyThinkers: ['George Lincoln Rockwell', 'Colin Jordan', 'James Mason (Siege)', 'William Luther Pierce'],
    realWorldExamples: [
      {
        title: 'Atomwaffen Division & Accelerationist Terror Cells',
        periodOrLocation: '2015–Present (USA & Europe)',
        description: 'Violent neo-Nazi terrorist organization advocating guerrilla warfare against civilian infrastructure and society.'
      }
    ],
    economicModel: 'Total exclusion of non-whites, autarky, racial slave economy.',
    viewOfState: 'A genocidal white totalitarian ethnostate.',
    criticisms: [
      'Designated globally as violent terrorist organizations responsible for mass shootings and hate crimes',
      'Total moral and intellectual bankruptcy'
    ],
    keyTextsOrManifestos: ['Siege (James Mason)', 'This Time the World (Rockwell)'],
    spectrumPlacement: 'Extreme Far-Right Violent Extremist',
    iconSymbol: '🚫'
  },
  {
    id: 'francoism',
    name: 'Francoism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'National Catholicism, military dictatorship, centralization, and anti-communism in Spain.',
    definition: 'The authoritarian, military, and National Catholic regime of Francisco Franco in Spain from 1939 to 1975, combining military rule, the suppression of regional identities, conservative Catholic morality, and anti-leftist purges.',
    historicalOrigins: 'Spanish Civil War (1936–1939), following General Franco\'s military coup against the Second Spanish Republic.',
    coreTenets: [
      'National Catholicism: Catholic Church given official monopoly over education, marriage, and public morals',
      'Fierce centralism: prohibition of regional languages (Catalan, Basque, Galician)',
      'Uncompromising anti-communism, anti-freemasonry, and anti-liberalism',
      'Single-party state (FET y de las JONS) backed by the military and civil guard'
    ],
    keyThinkers: ['Francisco Franco', 'Ramiro de Maeztu', 'Luis Carrero Blanco'],
    realWorldExamples: [
      {
        title: 'The "White Terror" & Post-War Autarky',
        periodOrLocation: '1939–1959 (Spain)',
        description: 'Execution and imprisonment of hundreds of thousands of Republicans, strict economic rationing, and isolation.'
      },
      {
        title: 'The Spanish Miracle (El Milagro Español) & Opus Dei Technocrats',
        periodOrLocation: '1959–1973 (Spain)',
        description: 'Stabilization Plan shifted Spain to market modernization, industrialization, and mass international tourism.'
      }
    ],
    economicModel: 'Initial autarky (1939–1959) followed by rapid capitalist technocratic modernization and tourism boom (1959–1975).',
    viewOfState: 'An autocratic military-Catholic state defending Spain\'s imperial Catholic identity against modern secular trends.',
    criticisms: [
      'Extrajudicial killings, mass graves, forced labor, and systematic repression of regional cultures',
      'Stifled intellectual and artistic freedom for nearly four decades'
    ],
    keyTextsOrManifestos: ['Defensa de la Hispanidad (Ramiro de Maeztu)', 'Franco\'s Speech to the Cortes'],
    spectrumPlacement: 'Far-Right National Catholic Authoritarian',
    iconSymbol: '🇪🇸✝️'
  },
  {
    id: 'falangism',
    name: 'Falangism (National Syndicalism)',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'National syndicalism, Catholic spirituality, and radical corporate reorganization in Spain.',
    definition: 'The original political ideology of the Falange Española, founded by José Antonio Primo de Rivera in 1933, blending Italian fascism with Spanish Catholic traditionalism and national syndicalism.',
    historicalOrigins: 'Second Spanish Republic (1933) founded by José Antonio Primo de Rivera; forcibly merged with Carlists by Franco in 1937.',
    coreTenets: [
      'National Syndicalism: replacing capitalist corporations and Marxist unions with vertical state syndicates',
      'Deep Catholic spiritual identity and imperial nostalgia (Hispanidad)',
      'Agrarian reform and redistribution of large feudal estates to peasant syndicates',
      'Rejection of both liberal capitalism and Soviet communism'
    ],
    keyThinkers: ['José Antonio Primo de Rivera', 'Ramiro Ledesma Ramos', 'Onésimo Redondo'],
    realWorldExamples: [
      {
        title: 'Original Falange Española',
        periodOrLocation: '1933–1937 (Spain)',
        description: 'Paramilitary movement wearing blue shirts that conducted violent street clashes before its leader was executed in the Civil War.'
      }
    ],
    economicModel: 'Vertical national syndicalism, nationalization of private banking, agrarian reform, corporate worker insurance.',
    viewOfState: 'A totalitarian, spiritual, and syndicalist state that embodies the destiny of the Spanish nation.',
    criticisms: [
      'Fascist street violence contributed heavily to destabilizing Spanish democracy in 1936',
      'Its revolutionary social promises were watered down by Franco\'s conservative generals'
    ],
    keyTextsOrManifestos: ['Twenty-Seven Points of the Falange (1934)', 'Selected Writings (José Antonio Primo de Rivera)'],
    spectrumPlacement: 'Far-Right National Syndicalist / Fascist',
    iconSymbol: '🏹🪓'
  },
  {
    id: 'clerical-fascism',
    name: 'Clerical Fascism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Fascist dictatorship combined with aggressive religious fundamentalism and clerical rule.',
    definition: 'An ideology that combines the political and economic doctrines of fascism with religious clericalism, using religious institutions and theology to legitimize totalitarian fascist rule.',
    historicalOrigins: 'Interwar Europe (1930s–1940s) in Croatia (Ustaše), Slovakia (Hlinka\'s Slovak People\'s Party), and Romania (Iron Guard).',
    coreTenets: [
      'Integration of ultra-orthodox religious dogma with fascist totalitarianism',
      'Violent persecution of religious and ethnic minorities (e.g., Orthodox Serbs, Jews, Romani)',
      'Church leadership holding direct executive political power in the fascist state',
      'Cult of religious martyrdom and violent spiritual purification'
    ],
    keyThinkers: ['Father Jozef Tiso (Slovakia)', 'Corneliu Zelea Codreanu (Romania)', 'Ante Pavelić (Croatia)'],
    realWorldExamples: [
      {
        title: 'Ustaše Independent State of Croatia (NDH)',
        periodOrLocation: '1941–1945 (Croatia & Bosnia)',
        description: 'Ante Pavelić\'s Nazi puppet regime ran Jasenovac concentration camp, carrying out brutal genocide against Serbs, Jews, and Romani.'
      },
      {
        title: 'First Slovak Republic under Father Jozef Tiso',
        periodOrLocation: '1939–1945 (Slovakia)',
        description: 'Catholic priest-led fascist satellite state that deported tens of thousands of Slovak Jews to Nazi extermination camps.'
      }
    ],
    economicModel: 'State corporatism governed according to authoritarian clerical decrees, expropriation of minority assets.',
    viewOfState: 'A holy theocratic-fascist dictatorship enforcing religious orthodoxy through military terror.',
    criticisms: [
      'Responsible for some of the most horrifying genocidal massacres and religious atrocities of the 20th century',
      'Total corruption of spiritual faith into violent totalitarianism'
    ],
    keyTextsOrManifestos: ['For My Legionaries (Codreanu)', 'Ustaše Principles (Ante Pavelić)'],
    spectrumPlacement: 'Extreme Far-Right Theocratic Fascist',
    iconSymbol: '✝🪓'
  },
  {
    id: 'absolute-monarchism',
    name: 'Absolute Monarchism (Absolutism)',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Unchecked sovereign royal authority: "L\'État, c\'est moi" (I am the State).',
    definition: 'A form of monarchy in which the monarch holds supreme autocratic authority, principally not being restricted by written laws, legislature, or unwritten customs, often justified by the Divine Right of Kings.',
    historicalOrigins: 'Emerged in early modern Europe (16th–18th centuries) under Louis XIV of France, Philip II of Spain, and Peter the Great of Russia.',
    coreTenets: [
      'Divine Right of Kings: the monarch is chosen directly by God and accountable only to the Divine',
      'Total centralized executive, legislative, and judicial power concentrated in the crown',
      'Standing royal armies and permanent royal tax collection replacing feudal barons',
      'Patronage, court etiquette, and splendor to control the aristocracy (Versailles)'
    ],
    keyThinkers: ['Jacques-Bénigne Bossuet', 'Jean Bodin', 'Robert Filmer', 'Thomas Hobbes (philosophical absolutism)'],
    realWorldExamples: [
      {
        title: 'France under King Louis XIV (The Sun King)',
        periodOrLocation: '1643–1715 (Versailles, France)',
        description: 'Constructed the Palace of Versailles, revoked the Edict of Nantes, and unified French state administration under royal intendants.'
      },
      {
        title: 'Kingdom of Saudi Arabia',
        periodOrLocation: '1932–Present (Saudi Arabia)',
        description: 'Modern absolute monarchy governed by the House of Saud with no national legislature or political parties.'
      }
    ],
    economicModel: 'Royal mercantilism, state trade monopolies, royal crown lands, Colbertist state manufactures.',
    viewOfState: 'The monarch is the living embodiment of the state and the sole source of all legitimate law.',
    criticisms: [
      'Complete lack of representation and arbitrary royal taxation led to the American and French Revolutions',
      'The entire nation\'s fate depends on the personal capability and temperament of an unelected hereditary ruler'
    ],
    keyTextsOrManifestos: ['Politics Derived from the Words of Holy Scripture (Bossuet)', 'Six Books of the Commonwealth (Jean Bodin)', 'Patriarcha (Robert Filmer)'],
    spectrumPlacement: 'Far-Right Traditionalist Autocracy / Royal Absolutism',
    iconSymbol: '👑'
  },
  {
    id: 'autocracy',
    name: 'Autocracy',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Absolute, undivided political power concentrated in a single individual.',
    definition: 'A system of government in which supreme power over a state is concentrated in the hands of one person, whose decisions are subject to neither external legal restraints nor regularized mechanisms of popular control.',
    historicalOrigins: 'Ancient Roman Empire (Principate/Dominate), Imperial Russia (Tsarist Autocracy), and modern personalized dictatorships.',
    coreTenets: [
      'All state decisions originate from and depend upon the individual ruler',
      'Absence of independent institutional checks, balances, or separation of powers',
      'Patron-client networks: loyalty to the autocrat is the sole path to power and wealth',
      'Use of state decree (ukase) rather than democratic parliamentary law'
    ],
    keyThinkers: ['Tsar Peter the Great', 'Tsar Nicholas I ("Orthodoxy, Autocracy, and Nationality")', 'Konstantin Pobedonostsev'],
    realWorldExamples: [
      {
        title: 'Russian Tsardom & Imperial Autocracy (Romanov Dynasty)',
        periodOrLocation: '1613–1917 (Russian Empire)',
        description: 'Governed as absolute autocrats of all the Russias until the 1917 revolutions overthrown the empire.'
      }
    ],
    economicModel: 'Personalized crony capitalism, state-allocated monopolies, oligarchic patronage networks.',
    viewOfState: 'The personal domain and instrument of the supreme autocrat.',
    criticisms: [
      'Severe vulnerability to catastrophic personal miscalculations, corruption, and instability upon succession',
      'Systematic suppression of human rights, independent journalism, and citizen initiative'
    ],
    keyTextsOrManifestos: ['Official Nationality Doctrine (Sergey Uvarov)', 'The Prince (Machiavelli)'],
    spectrumPlacement: 'Extreme Authoritarian Autocratic Axis',
    iconSymbol: '👑🔒'
  },
  {
    id: 'despotism',
    name: 'Despotism (Tyranny)',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Arbitrary, tyrannical power exercised by an individual or clique over subjects viewed as property.',
    definition: 'A form of government in which a single entity rules with absolute power, typically exercised in a cruel, oppressive, or arbitrary manner, treating citizens as subjects without legal recourse.',
    historicalOrigins: 'Classical Greek political philosophy (Aristotle\'s categorization of tyranny) and Enlightenment critiques (Montesquieu).',
    coreTenets: [
      'Arbitrary exercise of state power without fixed laws or constitutional rules',
      'Rule through pervasive fear, terror, and sudden confiscations of property',
      'Total subservience: subjects possess privileges granted at the despot\'s whim, not inalienable rights',
      '"Enlightened Despotism" variation: modernizing reforms imposed paternalistically from above'
    ],
    keyThinkers: ['Aristotle', 'Montesquieu', 'Voltaire (favored Enlightened Despotism)'],
    realWorldExamples: [
      {
        title: 'Enlightened Despotism in 18th-Century Europe (Frederick the Great, Catherine the Great)',
        periodOrLocation: '1740–1790 (Prussia, Russia, Austria)',
        description: 'Monarchs who patronized the arts and reformed legal codes while retaining absolute personal power.'
      },
      {
        title: 'Idi Amin\'s Regime in Uganda',
        periodOrLocation: '1971–1979 (Uganda)',
        description: 'Arbitrary military tyranny characterized by ethnic purges, extrajudicial executions, and economic collapse.'
      }
    ],
    economicModel: 'Arbitrary state expropriation, royal monopolies, or paternalistic state modernization projects.',
    viewOfState: 'The absolute property of the despot, where law is merely the expression of the ruler\'s will.',
    criticisms: [
      'Inherently unpredictable and destructive of individual life, commerce, and human happiness',
      'Cultivates sycophancy and suppresses truth-telling within government'
    ],
    keyTextsOrManifestos: ['The Spirit of the Laws (Montesquieu)', 'Politics (Aristotle)'],
    spectrumPlacement: 'Arbitrary Authoritarian / Pre-Constitutional',
    iconSymbol: '⚔️'
  },
  {
    id: 'bonapartism',
    name: 'Bonapartism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Military heroism, plebiscitary dictatorship, modern administrative centralization, and national glory.',
    definition: 'A political ideology inspired by Napoleon Bonaparte and Napoleon III, characterized by a centralized authoritarian government led by a popular military leader who uses plebiscites (referendums) to bypass parliament and combine order with modernization.',
    historicalOrigins: 'Post-Revolutionary France under Napoleon Bonaparte (1799–1815) and Louis-Napoléon / Napoleon III (1851–1870).',
    coreTenets: [
      'Direct connection between the charismatic leader and the people via democratic plebiscites (popular authoritarianism)',
      'Technocratic modernization: Napoleonic Code, meritocratic civil service, and grand public works',
      'Balancing between conflicting social classes (bourgeoisie and working class) by standing above them',
      'National glory, patriotic military prestige, and order after revolutionary chaos'
    ],
    keyThinkers: ['Napoleon Bonaparte', 'Napoleon III (Louis-Napoléon)', 'Karl Marx (The Eighteenth Brumaire of Louis Bonaparte)'],
    realWorldExamples: [
      {
        title: 'First French Empire & Napoleonic Code',
        periodOrLocation: '1804–1815 (France & Europe)',
        description: 'Napoleon revolutionized European law, abolished feudalism across conquered territories, and modernized administration.'
      },
      {
        title: 'Second French Empire under Napoleon III',
        periodOrLocation: '1852–1870 (France)',
        description: 'Rebuilt Paris under Baron Haussmann, expanded railways, and modernized French banking.'
      }
    ],
    economicModel: 'State-promoted industrial capitalism, large infrastructure projects (railroads, urban renewal), modern investment banking (Crédit Mobilier).',
    viewOfState: 'A powerful, centralized executive state standing above political parties to guarantee stability and progress.',
    criticisms: [
      'Vulnerable to adventurist foreign wars (e.g., Franco-Prussian War of 1870) that led to regime collapse',
      'Plebiscites used as democratic facades to legitimize dictatorial power'
    ],
    keyTextsOrManifestos: ['Napoleonic Ideas (Napoleon III)', 'The Eighteenth Brumaire of Louis Bonaparte (Marx)'],
    spectrumPlacement: 'Syncretic Authoritarian / Imperial Populist',
    iconSymbol: '🦅👑'
  },
  {
    id: 'caesarism',
    name: 'Caesarism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Charismatic military ruler ending republican gridlock to restore imperial order.',
    definition: 'A form of autocratic government modeled on Julius Caesar and Augustus, where a charismatic military hero seizes political power during a crisis of republican institutions, claiming to rule in the name of the people against a corrupt aristocracy.',
    historicalOrigins: 'Late Roman Republic (1st Century BC) with Julius Caesar and the foundation of the Roman Empire.',
    coreTenets: [
      'Seizure of power by a military general during a severe crisis of parliamentary or republican decay',
      'Direct populist appeal to the common people and military legions over the heads of the Senate/oligarchs',
      'Concentration of multiple offices and extraordinary powers in one individual',
      'Establishment of order, bread, and circuses to satisfy the populace'
    ],
    keyThinkers: ['Julius Caesar', 'Theodor Mommsen', 'Max Weber (Charismatic Authority)', 'Oswald Spengler'],
    realWorldExamples: [
      {
        title: 'Julius Caesar Crossing the Rubicon & Roman Dictatorship',
        periodOrLocation: '49–44 BC (Ancient Rome)',
        description: 'Defeated senatorial forces, reformed the calendar, distributed land to veterans, and established imperial rule.'
      }
    ],
    economicModel: 'Agrarian land distribution to veterans, state public grain doles (cura annonae), grand public architectural works.',
    viewOfState: 'An autocratic empire where the princeps/emperor personifies state authority to prevent civil war.',
    criticisms: [
      'Permanently destroyed republican liberty and civic self-governance in ancient Rome',
      'Institutionalizes military coups as the primary mechanism of political change'
    ],
    keyTextsOrManifestos: ['The History of Rome (Theodor Mommsen)', 'The Decline of the West (Oswald Spengler)'],
    spectrumPlacement: 'Classical Authoritarian / Martial Autocracy',
    iconSymbol: '🏛️⚔️'
  },
  {
    id: 'caudillismo',
    name: 'Caudillismo',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Rule by charismatic military strongmen (caudillos) through personal loyalty and patronage.',
    definition: 'A system of political dominance in Latin America characterized by the rule of charismatic regional or national military strongmen (caudillos) who maintain power through personal charismatic authority, armed loyal militias, and patronage networks.',
    historicalOrigins: 'Post-independence Latin America (1820s–1950s) following the collapse of Spanish colonial administration.',
    coreTenets: [
      'Personal loyalty to the charismatic strongman over constitutional laws or political parties',
      'Patronage politics: rewarding loyal followers with land, government posts, and commercial privileges',
      'Cult of masculine martial prowess (machismo) and direct populist connection with the rural masses',
      'Frequent military coups (pronunciamientos) to resolve political disputes'
    ],
    keyThinkers: ['Domingo Faustino Sarmiento (Facundo: Civilization and Barbarism)', 'Hugh M. Hamill'],
    realWorldExamples: [
      {
        title: 'Juan Manuel de Rosas in Argentina',
        periodOrLocation: '1829–1852 (Buenos Aires, Argentina)',
        description: 'Federalist caudillo who ruled with the support of gauchos, enforcing loyalty through the Mazorca political police.'
      },
      {
        title: 'Antonio López de Santa Anna in Mexico',
        periodOrLocation: '1833–1855 (Mexico)',
        description: 'Charismatic general who served as President of Mexico on eleven separate occasions across three turbulent decades.'
      },
      {
        title: 'Porfirio Díaz (The Porfiriato) in Mexico',
        periodOrLocation: '1876–1911 (Mexico)',
        description: 'Modernized railways and telegraphs while maintaining absolute autocratic political control ("Pan o palo").'
      }
    ],
    economicModel: 'Agrarian hacienda economy, mineral concessions to foreign capital, patronage concessions.',
    viewOfState: 'A personalized political apparatus used by the ruling caudillo and his inner military circle.',
    criticisms: [
      'Stifled the development of enduring democratic institutions and constitutional rule of law',
      'Perpetuated extreme rural inequality and sparked violent revolutions (e.g., 1910 Mexican Revolution)'
    ],
    keyTextsOrManifestos: ['Facundo: Civilization and Barbarism (Sarmiento)', 'Doña Bárbara (Rómulo Gallegos)'],
    spectrumPlacement: 'Personalist Authoritarian / Strongman Politics',
    iconSymbol: '🐴⚔️'
  },
  {
    id: 'peronism',
    name: 'Peronism (Justicialism)',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Social justice, economic independence, and national sovereignty: the Third Position.',
    definition: 'An Argentine mass political movement based on the thought and leadership of Juan Domingo Perón and Eva Perón ("Evita"), combining social justice, labor rights, nationalism, state intervention, and charismatic populism.',
    historicalOrigins: 'Argentina in the 1940s, crystallized by Perón\'s presidency from 1946 to 1955 and the massive mobilization of the "descamisados" (shirtless workers).',
    coreTenets: [
      'Three Flags of Justicialism: Social Justice, Economic Independence, and Political Sovereignty',
      'The "Third Position": rejecting both Western capitalism and Soviet communism',
      'Powerful organic labor unions (CGT) integrated into state decision-making',
      'Mass social welfare, women\'s suffrage, and healthcare expansion directed by Eva Perón'
    ],
    keyThinkers: ['Juan Domingo Perón', 'Eva Perón (Evita)', 'Arturo Jauretche', 'John William Cooke'],
    realWorldExamples: [
      {
        title: 'First Presidency of Juan Perón & Eva Perón Foundation',
        periodOrLocation: '1946–1955 (Argentina)',
        description: 'Nationalized railways and central bank, introduced paid vacations, universal pensions, built thousands of hospitals and schools, and gave women the vote.'
      },
      {
        title: 'Peronist Hegemony in Modern Argentina',
        periodOrLocation: '1973–Present (Argentina)',
        description: 'Remains the dominant political force in modern Argentina, encompassing left-wing (Kirchnerism) and right-wing (Menemism) factions.'
      }
    ],
    economicModel: 'Import-substitution industrialization (ISI), nationalized strategic utilities, extensive labor rights, progressive wage hikes.',
    viewOfState: 'A popular nationalist state acting as the mediator between capital and labor to ensure social justice.',
    criticisms: [
      'Chronic fiscal deficits, inflation, and economic protectionism leading to recurring macroeconomic crises',
      'Broad ideological ambiguity that housed both far-left guerrilla factions (Montoneros) and far-right death squads (Triple A) in the 1970s'
    ],
    keyTextsOrManifestos: ['The Reason for My Life (Eva Perón)', 'The Twenty Truths of Justicialism (Juan Perón)', 'The Conduction Policy (Perón)'],
    spectrumPlacement: 'Syncretic Nationalist Populist / Third Position',
    iconSymbol: '✌️🇦🇷'
  },
  {
    id: 'baathism',
    name: 'Ba\'athism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: '"Unity, Liberty, Socialism" for the single Arab nation under vanguard party rule.',
    definition: 'An Arab nationalist, secular, and socialist political ideology founded by Michel Aflaq and Zaki al-Arsuzi, advocating for the unification of all Arab countries into a single sovereign socialist nation through vanguard one-party rule.',
    historicalOrigins: 'Founded in Damascus, Syria, in the 1940s (Ba\'ath Party founded 1947); governed Syria and Iraq for decades.',
    coreTenets: [
      '"Wahda, Hurriyya, Ishtirakiyya" (Unity, Liberty, Socialism)',
      'Unification of the entire Arab world into a single sovereign state',
      'Secular Arab nationalism: religion is secondary to shared Arab cultural and linguistic identity',
      'Vanguard one-party state leading the national renaissance (Ba\'ath = Renaissance)'
    ],
    keyThinkers: ['Michel Aflaq', 'Salah al-Din al-Bitar', 'Zaki al-Arsuzi', 'Saddam Hussein', 'Hafez al-Assad'],
    realWorldExamples: [
      {
        title: 'Ba\'athist Iraq under Saddam Hussein',
        periodOrLocation: '1968–2003 (Iraq)',
        description: 'Nationalized Iraqi oil (IPC), built modern infrastructure and secular literacy programs, but waged brutal wars and genocidal campaigns (Anfal against Kurds).'
      },
      {
        title: 'Ba\'athist Syria under Hafez and Bashar al-Assad',
        periodOrLocation: '1970–Present (Syria)',
        description: 'Maintained secular one-party state, allied with the Soviet Union/Russia and Iran, resulting in devastating civil war since 2011.'
      }
    ],
    economicModel: 'State-directed Arab socialism: state control of oil, nationalized banking, land reform, public healthcare.',
    viewOfState: 'A powerful vanguard security state leading the historical awakening and defense of the Arab nation.',
    criticisms: [
      'Brutal one-party dictatorships, secret police terror (Mukhabarat), torture, and chemical weapons use (Halabja)',
      'Intense sectarian rivalry between the Syrian and Iraqi branches of the party'
    ],
    keyTextsOrManifestos: ['The Battle for One Destiny (Michel Aflaq)', 'On the Way of Ba\'ath (Aflaq)'],
    spectrumPlacement: 'Syncretic Arab Nationalist / Authoritarian Vanguard',
    iconSymbol: '🦅⭐'
  },
  {
    id: 'strasserism',
    name: 'Strasserism (Left-Wing National Socialism)',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Antisemitic ethnonationalism combined with radical anti-capitalist worker socialism.',
    definition: 'A radical dissident faction within early Nazism led by brothers Gregor and Otto Strasser, which emphasized the anti-capitalist, socialist, and working-class elements of the NSDAP\'s 25-point program while retaining fierce antisemitism and ultranationalism.',
    historicalOrigins: 'Weimar Germany in the 1920s; ruthlessly purged by Hitler during the Night of the Long Knives in 1934.',
    coreTenets: [
      'Radical anti-capitalism: nationalization of all heavy industry, banks, and breaking up land monopolies',
      'Antisemitism linked directly to finance capital and Wall Street banking cartels',
      'Guild-based national guild socialism for workers',
      'Rejection of Hitler\'s alliances with traditional German aristocratic industrialists and generals'
    ],
    keyThinkers: ['Gregor Strasser', 'Otto Strasser'],
    realWorldExamples: [
      {
        title: 'Berlin NSDAP & Night of the Long Knives',
        periodOrLocation: '1925–1934 (Germany)',
        description: 'Strasserites published anti-capitalist worker newspapers until Hitler murdered Gregor Strasser in June 1934.'
      },
      {
        title: 'Black Front (Schwarze Front)',
        periodOrLocation: '1930–1934 (Germany)',
        description: 'Underground anti-Hitler socialist nationalist organization formed by Otto Strasser in exile.'
      }
    ],
    economicModel: 'National guild syndicalism, nationalization of 51% of corporate shares, state allocation of land to peasant cooperatives.',
    viewOfState: 'A radical nationalist workers\' state based on guild democracy and ethnic purity.',
    criticisms: [
      'Remained rooted in antisemitism, racial hatred, and violent fascism',
      'Completely eliminated by Hitler\'s consolidation of power in 1934'
    ],
    keyTextsOrManifestos: ['Hitler and I (Otto Strasser)', 'Structure of German Socialism (Otto Strasser)'],
    spectrumPlacement: 'Syncretic Far-Right / Anti-Capitalist Nazi Dissident',
    iconSymbol: '🔨⚔️'
  },
  {
    id: 'national-bolshevism',
    name: 'National Bolshevism (Nazbol)',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Syncretic blend of radical Russian nationalism, Eurasian empire, and Soviet state communism.',
    definition: 'A syncretic political ideology that combines ultranationalism, imperial revanchism, and anti-Western geopolitics with Soviet-style state socialism, state ownership, and communist aesthetics.',
    historicalOrigins: '1920s Weimar Germany (Ernst Niekisch) and post-Soviet Russia in the 1990s (Eduard Limonov, Aleksandr Dugin).',
    coreTenets: [
      'Total rejection of Western liberal capitalism, Atlanticism, and NATO hegemony',
      'Synthesis of Soviet superpower nostalgia with traditional Russian imperial mysticism',
      'Command economy and state nationalization of heavy industry and energy',
      'Eurasianist expansionism: uniting Eurasian peoples against Western maritime powers'
    ],
    keyThinkers: ['Ernst Niekisch', 'Eduard Limonov', 'Aleksandr Dugin (early Nazbol phase)', 'Nikolai Ustryalov'],
    realWorldExamples: [
      {
        title: 'National Bolshevik Party (NBP) in Russia',
        periodOrLocation: '1993–2007 (Russia)',
        description: 'Led by Eduard Limonov, staged provocative direct-action protests opposing post-Soviet privatization and Western influence before being banned.'
      }
    ],
    economicModel: 'Soviet command economy, complete state monopoly over strategic resources, rejection of Western private banking.',
    viewOfState: 'A militarized Eurasian imperial state uniting Slavic and Eurasian nations in opposition to global liberal capitalism.',
    criticisms: [
      'Employs extreme violent rhetoric, extremist symbology, and aggressive revanchist militarism',
      'Contradictory synthesis of incompatible ideologies (communism and ultranationalism)'
    ],
    keyTextsOrManifestos: ['Hitler: A German Fate (Ernst Niekisch)', 'Foundations of Geopolitics (Aleksandr Dugin)', 'The Anatomy of a Hero (Limonov)'],
    spectrumPlacement: 'Syncretic Extreme Far-Right/Far-Left / Red-Brown Alliance',
    iconSymbol: '🚩⚡'
  },
  {
    id: 'eco-fascism',
    name: 'Eco-Fascism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Authoritarian environmentalism, forced depopulation, and racial "Blood and Soil".',
    definition: 'A theoretical model and extremist ideology combining environmentalism, deep ecology, and preservation of nature with totalitarian fascism, white supremacy, and violent anti-immigration/depopulation measures.',
    historicalOrigins: 'Nazi "Blood and Soil" (Blut und Boden) agricultural mysticism (Richard Walther Darré) and radical fringe white supremacists.',
    coreTenets: [
      'Environmental degradation and resource depletion blamed on non-white population growth and immigration',
      '"Blood and Soil": mystical connection between the racial group and native ecosystems',
      'Totalitarian population control, closed borders, and forced deportations/depopulation to save the planet',
      'Opposition to consumerist industrial democracy'
    ],
    keyThinkers: ['Richard Walther Darré', 'Penti Linkola', 'Savitri Devi'],
    realWorldExamples: [
      {
        title: 'Third Reich Organic Farming & Forestry Policies',
        periodOrLocation: '1933–1945 (Germany)',
        description: 'Enacted pioneering reforestation and animal protection laws, but inextricably tied to the genocidal extermination of "undesirable" humans.'
      },
      {
        title: 'Christchurch & El Paso Terrorist Manifestos',
        periodOrLocation: '2019 (New Zealand & USA)',
        description: 'White supremacist mass shooters who explicitly cited eco-fascist arguments regarding overpopulation and environmental preservation.'
      }
    ],
    economicModel: 'Agrarian autarky, strict eco-authoritarian state rationing, prohibition of mass consumer goods.',
    viewOfState: 'A totalitarian racial-ecological dictatorship enforcing extreme ecological boundaries and racial homogeneity.',
    criticisms: [
      'Weaponizes legitimate ecological concerns to justify racism, genocide, and mass murder',
      'Rejected by mainstream environmentalists who advocate climate justice and human rights'
    ],
    keyTextsOrManifestos: ['Can Life Prevail? (Pentti Linkola)', 'The Peasantry as the Life Source of the Nordic Race (Darré)'],
    spectrumPlacement: 'Extreme Far-Right Eco-Authoritarian',
    iconSymbol: '🌲🪓'
  },
  {
    id: 'theocracy',
    name: 'Theocracy',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Direct governance by religious authorities enforcing divine canonical law.',
    definition: 'A form of government in which a deity of a recognized religion is recognized as the supreme civil ruler, with human governance managed by divinely guided religious officials enforcing religious law (e.g., Sharia, Halakha, Canon Law).',
    historicalOrigins: 'Ancient Judea, the Papal States (754–1870), Geneva under John Calvin, and modern Islamic republics.',
    coreTenets: [
      'Divine sovereignty (Theonomy): all human civil legislation must derive directly from sacred religious scripture',
      'Clergy and religious scholars hold supreme legislative and executive oversight',
      'Strict legal enforcement of religious morality, dress codes, blasphemy laws, and worship obligations',
      'Rejection of secularism and liberal individualism'
    ],
    keyThinkers: ['John Calvin', 'Ayatollah Ruhollah Khomeini', 'Sayyid Qutb', 'Girolamo Savonarola'],
    realWorldExamples: [
      {
        title: 'Islamic Republic of Iran',
        periodOrLocation: '1979–Present (Iran)',
        description: 'Governance under the doctrine of Velayat-e Faqih (Guardianship of the Islamic Jurist) with the Supreme Leader holding ultimate veto over elected bodies.'
      },
      {
        title: 'Calvinist Geneva',
        periodOrLocation: '1541–1564 (Geneva, Switzerland)',
        description: 'John Calvin\'s Consistory enforced strict biblical moral codes, banning gambling, dancing, and executing theological heretics (Servetus).'
      },
      {
        title: 'Vatican City State',
        periodOrLocation: '1929–Present (Rome, Italy)',
        description: 'Sovereign sacerdotal-monarchical state ruled by the Pope as head of the Catholic Church.'
      }
    ],
    economicModel: 'Religious-directed economy: Islamic banking (prohibition of Riba/interest), church tithing/zakat wealth distribution, state charity.',
    viewOfState: 'An instrument of the Divine Will on Earth tasked with guiding citizens to spiritual salvation and enforcing holy laws.',
    criticisms: [
      'Severe persecution of religious minorities, atheists, women, and LGBTQ+ individuals',
      'Suppression of free scientific inquiry, artistic expression, and democratic human rights'
    ],
    keyTextsOrManifestos: ['Islamic Government: Governance of the Jurist (Khomeini)', 'Institutes of the Christian Religion (Calvin)'],
    spectrumPlacement: 'Authoritarian Theocratic Axis',
    iconSymbol: '🕌✝️'
  },
  {
    id: 'militarism',
    name: 'Militarism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Glorification of the armed forces, martial values, and military supremacy over civil society.',
    definition: 'The belief or desire of a government or people that a state should maintain a strong military capability and use it aggressively to expand national interests and values, with military ideals dominating political and cultural life.',
    historicalOrigins: 'Ancient Sparta, Kingdom of Prussia ("An army with a country"), and early 20th-century Imperial Japan.',
    coreTenets: [
      'Subordination of civilian governance to the needs and culture of the armed forces',
      'Glorification of martial discipline, physical courage, obedience, and hierarchical duty',
      'Massive state expenditures on armaments, military technology, and universal conscription',
      'Foreign diplomacy conducted primarily through military threat and deterrence'
    ],
    keyThinkers: ['Karl von Clausewitz (martial analysis)', 'Field Marshal Helmuth von Moltke', 'Sadao Araki'],
    realWorldExamples: [
      {
        title: 'Kingdom of Prussia & Imperial Germany (Wilhelmine Era)',
        periodOrLocation: '18th Century–1918 (Germany)',
        description: 'Mirabeau remarked: "Prussia is not a state with an army, but an army with a state in which it is quartered."'
      },
      {
        title: 'Imperial Japanese Military Junta (Tojo Era)',
        periodOrLocation: '1937–1945 (Japan)',
        description: 'The military operated independently of civilian cabinet control, directing the nation into total world war.'
      },
      {
        title: 'Sparta (Classical Greece)',
        periodOrLocation: '8th–4th Century BC (Greece)',
        description: 'Entire social and educational system (Agoge) designed exclusively to produce elite warrior hoplites.'
      }
    ],
    economicModel: 'Military-industrial complex, state arms manufacturing, prioritized strategic defense allocations.',
    viewOfState: 'A fortified garrison whose primary reason for existence is military readiness, expansion, and national security.',
    criticisms: [
      'Direct catalyst for devastating arms races, imperial conflicts, and World War I',
      'Drains public finances away from civilian health, education, and social infrastructure'
    ],
    keyTextsOrManifestos: ['On War (Clausewitz)', 'The Soldier and the State (Samuel P. Huntington)'],
    spectrumPlacement: 'Authoritarian Martial Axis',
    iconSymbol: '⚔️🎖️'
  },
  {
    id: 'imperialism',
    name: 'Imperialism',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Extending state rule, colonial dominion, and economic hegemony over foreign nations.',
    definition: 'A state policy, practice, or advocacy of extending power and dominion, especially by direct territorial acquisition or by gaining political and economic control of other areas, often accompanied by the use of hard military and soft economic power.',
    historicalOrigins: 'Ancient empires (Roman, Persian, British, Spanish, Ottoman, Mongol); analyzed by J.A. Hobson and Lenin in the early 20th century.',
    coreTenets: [
      'Establishment of colonial protectorates, viceroyalties, and overseas territories',
      'Extraction of raw materials, minerals, and agricultural crops for the imperial metropole',
      'Cultural hegemony: imposing the imperial language, legal system, and religion on conquered subjects',
      'Strategic naval bases and military outposts along global maritime trade routes'
    ],
    keyThinkers: ['Cecil Rhodes', 'Lord Curzon', 'J.A. Hobson (critique)', 'Vladimir Lenin (critique)'],
    realWorldExamples: [
      {
        title: 'The British Empire ("The Empire on Which the Sun Never Sets")',
        periodOrLocation: '16th–20th Century (Global)',
        description: 'Covered 24% of the Earth\'s total land area and governed over 412 million people through colonial rule (British Raj, Africa, Caribbean).'
      },
      {
        title: 'Spanish Empire in the Americas',
        periodOrLocation: '1492–1898 (Americas & Philippines)',
        description: 'Extracted vast silver mines (Potosí), introduced Catholicism, and reshaped the demographics and languages of the Western Hemisphere.'
      }
    ],
    economicModel: 'Colonial mercantilism, preferential tariff zones, state-chartered monopoly companies (East India Company), resource extraction.',
    viewOfState: 'A global sovereign power claiming a civilizing mission (Mission civilisatrice) and imperial destiny over subordinate foreign peoples.',
    criticisms: [
      'Brutal colonial exploitation, forced famines (e.g., Bengal 1943), transatlantic slave trade, and destruction of indigenous cultures',
      'Inevitably generates anti-colonial revolutions and expensive imperial collapse'
    ],
    keyTextsOrManifestos: ['Imperialism: A Study (J.A. Hobson)', 'Imperialism, the Highest Stage of Capitalism (Lenin)', 'The White Man\'s Burden (Rudyard Kipling)'],
    spectrumPlacement: 'Imperial Hegemonic Axis',
    iconSymbol: '👑🗺️'
  },
  {
    id: 'oligarchy',
    name: 'Oligarchy',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Political power concentrated exclusively in the hands of a small, privileged ruling elite.',
    definition: 'A form of power structure in which power rests with a small number of people, who may be distinguished by nobility, wealth, education, corporate power, religious ties, or military control.',
    historicalOrigins: 'Described by Aristotle in ancient Greece (Spartan Gerousia); analyzed in modern sociology by Robert Michels ("Iron Law of Oligarchy").',
    coreTenets: [
      '"Iron Law of Oligarchy": all complex human organizations, regardless of how democratic they start, inevitably develop into oligarchies',
      'Small ruling clique controls key economic resources, media outlets, and political candidacies',
      'Self-perpetuating power through nepotism, intermarriage, and elite private institutions',
      'Public policies consistently reflect elite preferences over majority public will'
    ],
    keyThinkers: ['Aristotle', 'Robert Michels', 'Vilfredo Pareto (Circulation of Elites)', 'Gaetano Mosca', 'C. Wright Mills'],
    realWorldExamples: [
      {
        title: 'Post-Soviet Russian Oligarchy',
        periodOrLocation: '1990s–Present (Russia)',
        description: 'A handful of business tycoons acquired massive state oil, gas, and nickel enterprises during the "loans-for-shares" privatization auctions.'
      },
      {
        title: 'Republic of Venice (Serenissima)',
        periodOrLocation: '697–1797 AD (Venice, Italy)',
        description: 'Governed for over a thousand years by a hereditary patrician merchant oligarchy enrolled in the Golden Book (Libro d\'Oro).'
      }
    ],
    economicModel: 'Monopolistic concessions, insider privatizations, financial cartels, tax shelters.',
    viewOfState: 'An instrument controlled by and operated for the preservation of elite wealth and status.',
    criticisms: [
      'Subverts genuine democratic accountability and creates systemic political cynicism',
      'Stifles meritocracy, economic dynamism, and social mobility'
    ],
    keyTextsOrManifestos: ['Political Parties: Iron Law of Oligarchy (Robert Michels)', 'The Power Elite (C. Wright Mills)', 'The Ruling Class (Gaetano Mosca)'],
    spectrumPlacement: 'Elite Authoritarian / Structural Oligarchic',
    iconSymbol: '🏛️💰'
  },
  {
    id: 'plutocracy',
    name: 'Plutocracy',
    category: 'Authoritarianism, Fascism & Totalitarianism',
    tagline: 'Governance directly ruled or controlled by the wealthy class.',
    definition: 'A society that is ruled or controlled by people of great wealth, where political influence, electoral outcomes, and legislation are directly purchased or dictated by financial power.',
    historicalOrigins: 'Ancient Carthage and Florence; Gilded Age United States (late 19th century); modern campaign finance debates.',
    coreTenets: [
      'Wealth equals political power: money buys elections, lobbying access, and favorable legislation',
      'Regressive tax codes, tax loopholes, and deregulation designed to benefit billionaires and corporations',
      'Privatization of public assets for private profit extraction',
      'Media consolidation owned by financial tycoons shaping public debate'
    ],
    keyThinkers: ['Mark Twain (The Gilded Age)', 'Noam Chomsky', 'Thomas Piketty', 'Martin Gilens & Benjamin Page'],
    realWorldExamples: [
      {
        title: 'Gilded Age United States',
        periodOrLocation: '1870–1900 (USA)',
        description: 'Robber barons (Rockefeller, Carnegie, Vanderbilt, Morgan) exercised immense control over state legislatures and the US Senate.'
      },
      {
        title: 'Modern US Campaign Finance & Super PAC System',
        periodOrLocation: '2010–Present (USA)',
        description: 'Following Citizens United v. FEC, billions in unregulated billionaire and corporate money flow into political elections.'
      }
    ],
    economicModel: 'Unrestrained financial capitalism, minimal inheritance and wealth taxation, corporate subsidies, anti-labor union laws.',
    viewOfState: 'A protective legal shell designed to safeguard extreme capital accumulation and enforce financial contracts.',
    criticisms: [
      'Erodes the principle of "one person, one vote" in favor of "one dollar, one vote"',
      'Drives extreme wealth inequality and hollows out the middle and working classes'
    ],
    keyTextsOrManifestos: ['Capital in the Twenty-First Century (Thomas Piketty)', 'Requiem for the American Dream (Noam Chomsky)', 'Democracy in America? (Gilens & Page)'],
    spectrumPlacement: 'Extreme Wealth-Dominated Structural System',
    iconSymbol: '💰🏛️'
  }
];
