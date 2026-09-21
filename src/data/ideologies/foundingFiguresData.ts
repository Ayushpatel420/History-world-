import { IdeologyFigureRole } from '../../types';

export interface FoundingFigureRecord {
  foundingFather: string;
  foundingFatherTitle: string;
  keyFigures: IdeologyFigureRole[];
}

export const IDEOLOGY_FOUNDING_FIGURES: Record<string, FoundingFigureRecord> = {
  // --- Liberalism & Progressivism ---
  'liberalism': {
    foundingFather: 'John Locke',
    foundingFatherTitle: 'Father of Classical Liberalism & Constitutional Governance',
    keyFigures: [
      { name: 'John Locke', role: 'Founding Father & Philosopher', contribution: 'Formulated the social contract, inalienable rights to life, liberty, and estate, and government by consent.' },
      { name: 'Montesquieu', role: 'Constitutional Architect', contribution: 'Conceptualized the separation of powers into legislative, executive, and judicial branches.' },
      { name: 'Voltaire', role: 'Champion of Civil Liberties', contribution: 'Advocated fiercely for freedom of speech, freedom of religion, and the right to a fair trial.' },
      { name: 'John Stuart Mill', role: 'Harm Principle Theorist', contribution: 'Authored "On Liberty", articulating the harm principle and defense of individual freedom against tyranny of the majority.' }
    ]
  },
  'classical-liberalism': {
    foundingFather: 'Adam Smith',
    foundingFatherTitle: 'Father of Modern Economics & Classical Free-Market Liberalism',
    keyFigures: [
      { name: 'Adam Smith', role: 'Founding Architect & Moral Philosopher', contribution: 'Authored "The Wealth of Nations", conceptualizing the division of labor and the self-regulating market mechanism.' },
      { name: 'David Ricardo', role: 'Trade Theorist', contribution: 'Formulated the theory of comparative advantage in international trade.' },
      { name: 'Frédéric Bastiat', role: 'Economic Essayist', contribution: 'Pioneered the concept of opportunity cost (seen and unseen) and the rule of law.' },
      { name: 'Richard Cobden', role: 'Anti-Protectionist Leader', contribution: 'Led the Anti-Corn Law League to establish global unilateral free trade.' }
    ]
  },
  'social-liberalism': {
    foundingFather: 'John Maynard Keynes & T.H. Green',
    foundingFatherTitle: 'Architects of Modern Social Liberalism & Positive Freedom',
    keyFigures: [
      { name: 'T.H. Green', role: 'Philosophical Architect', contribution: 'Introduced the distinction between negative liberty and positive liberty (ability to flourish).' },
      { name: 'John Maynard Keynes', role: 'Macroeconomic Architect', contribution: 'Developed demand-side economics advocating counter-cyclical state investment during recessions.' },
      { name: 'John Rawls', role: 'Theory of Justice Philosopher', contribution: 'Articulated the "veil of ignorance" and the difference principle to ensure fairness for the least advantaged.' },
      { name: 'Franklin D. Roosevelt', role: 'Statesman & Reformer', contribution: 'Enacted the New Deal establishing social security, minimum wage, and federal labor protection.' }
    ]
  },
  'neoliberalism': {
    foundingFather: 'Friedrich Hayek & Milton Friedman',
    foundingFatherTitle: 'Architects of Neoliberal Market Theory & Monetarism',
    keyFigures: [
      { name: 'Friedrich Hayek', role: 'Austrian School Philosopher', contribution: 'Authored "The Road to Serfdom", arguing that central economic planning inherently erodes individual liberty.' },
      { name: 'Milton Friedman', role: 'Monetarist Economist', contribution: 'Advocated for school vouchers, floating exchange rates, deregulation, and free-market capitalism.' },
      { name: 'Margaret Thatcher', role: 'Political Implementer', contribution: 'Privatized state industries, curbed trade union monopolies, and revitalized UK enterprise.' },
      { name: 'Ronald Reagan', role: 'Political Implementer', contribution: 'Championed supply-side tax cuts, financial deregulation, and reduction of government regulation.' }
    ]
  },
  'ordoliberalism': {
    foundingFather: 'Walter Eucken & Wilhelm Röpke',
    foundingFatherTitle: 'Fathers of Freiburg School Ordoliberalism & Social Market Framework',
    keyFigures: [
      { name: 'Walter Eucken', role: 'Founding Theorist', contribution: 'Founded the Freiburg School, advocating a constitutional state that strictly maintains competition and prevents cartels.' },
      { name: 'Wilhelm Röpke', role: 'Humanist Economist', contribution: 'Emphasized that markets require moral and legal frameworks to sustain human dignity and family vitality.' },
      { name: 'Ludwig Erhard', role: 'Economic Statesman', contribution: 'Engineered the West German Economic Miracle (Wirtschaftswunder) applying the Social Market Economy.' }
    ]
  },
  'progressivism': {
    foundingFather: 'Theodore Roosevelt & John Dewey',
    foundingFatherTitle: 'Pioneers of the Progressive Reform Era',
    keyFigures: [
      { name: 'Theodore Roosevelt', role: 'Trust-Busting Statesman', contribution: 'Instituted the "Square Deal", breaking corporate monopolies, regulating railroads, and conserving national parks.' },
      { name: 'John Dewey', role: 'Pragmatist Philosopher', contribution: 'Reformed public education into democratic laboratories and advocated for democratic social cooperation.' },
      { name: 'Jane Addams', role: 'Social Settlement Pioneer', contribution: 'Founded Hull House, fought for child labor laws, women\'s suffrage, and urban sanitation reforms.' },
      { name: 'Robert M. La Follette', role: 'Legislative Champion', contribution: 'Created the "Wisconsin Idea", using university expertise to craft progressive public policy and direct primaries.' }
    ]
  },
  'radicalism': {
    foundingFather: 'Jeremy Bentham & Thomas Paine',
    foundingFatherTitle: 'Fathers of Philosophical Radicalism & Democratic Rights',
    keyFigures: [
      { name: 'Thomas Paine', role: 'Revolutionary Pamphleteer', contribution: 'Authored "Common Sense" and "Rights of Man", advocating universal democratic franchise and republicanism.' },
      { name: 'Jeremy Bentham', role: 'Utilitarian Philosopher', contribution: 'Founded utilitarianism and the Philosophical Radicals who campaigned for parliamentary reform and prison reform.' },
      { name: 'William Godwin', role: 'Philosophical Critic', contribution: 'Critiqued state power and hereditary privilege, demanding rational moral equality.' }
    ]
  },
  'cultural-liberalism': {
    foundingFather: 'John Stuart Mill & Mary Wollstonecraft',
    foundingFatherTitle: 'Pioneers of Cultural Liberty & Civil Equality',
    keyFigures: [
      { name: 'Mary Wollstonecraft', role: 'Pioneering Feminist Thinker', contribution: 'Authored "A Vindication of the Rights of Woman", arguing women are entitled to equal rational education.' },
      { name: 'John Stuart Mill', role: 'Champion of Women\'s Rights', contribution: 'Authored "The Subjection of Women", advocating full civil and political equality for women.' }
    ]
  },
  'green-liberalism': {
    foundingFather: 'Marcel Wissenburg',
    foundingFatherTitle: 'Theorist of Liberal Environmental Ethics',
    keyFigures: [
      { name: 'Marcel Wissenburg', role: 'Political Theorist', contribution: 'Synthesized liberal property rights and individual freedom with ecological sustainability obligations.' },
      { name: 'Robyn Eckersley', role: 'Ecological Democracy Thinker', contribution: 'Examined how constitutional democratic states can incorporate ecological protection.' }
    ]
  },
  'libertarian-liberalism': {
    foundingFather: 'Herbert Spencer & Auberon Herbert',
    foundingFatherTitle: 'Early Advocates of Voluntaryism & Equal Freedom',
    keyFigures: [
      { name: 'Herbert Spencer', role: 'Social Philosopher', contribution: 'Formulated the law of equal freedom: every person is free to do whatever they will, provided they infringe not the equal freedom of others.' },
      { name: 'Auberon Herbert', role: 'Voluntaryist Pioneer', contribution: 'Advocated for voluntary taxation and non-aggressive social interaction.' }
    ]
  },

  // --- Socialism, Communism & Marxism ---
  'marxism': {
    foundingFather: 'Karl Marx & Friedrich Engels',
    foundingFatherTitle: 'Fathers of Scientific Socialism & Historical Materialism',
    keyFigures: [
      { name: 'Karl Marx', role: 'Founding Philosopher & Economist', contribution: 'Authored "Das Kapital" and "The Communist Manifesto", formulating historical materialism, surplus value, and class struggle.' },
      { name: 'Friedrich Engels', role: 'Co-Founder & Theorist', contribution: 'Co-authored foundational works and systematized dialectical materialism in "Anti-Dühring".' },
      { name: 'Antonio Gramsci', role: 'Cultural Hegemony Theorist', contribution: 'Analyzed how ruling classes maintain hegemony through civil society and cultural institutions.' },
      { name: 'Rosa Luxemburg', role: 'Revolutionary Democrat', contribution: 'Defended spontaneous mass strikes and internal democratic worker debate.' }
    ]
  },
  'classical-marxism': {
    foundingFather: 'Karl Marx',
    foundingFatherTitle: 'Primary Architect of 19th-Century Scientific Socialism',
    keyFigures: [
      { name: 'Karl Marx', role: 'Founding Thinker', contribution: 'Identified the inherent contradictions between productive forces and relations of production.' },
      { name: 'Friedrich Engels', role: 'Co-Architect', contribution: 'Financially supported and intellectually developed the materialist conception of history.' }
    ]
  },
  'leninism': {
    foundingFather: 'Vladimir Lenin',
    foundingFatherTitle: 'Architect of the Vanguard Party & Soviet State',
    keyFigures: [
      { name: 'Vladimir Lenin', role: 'Revolutionary Leader & Theorist', contribution: 'Authored "What Is to Be Done?" and "State and Revolution", developing vanguardism and leading the 1917 October Revolution.' },
      { name: 'Leon Trotsky', role: 'Red Army Founder & Theorist', contribution: 'Formulated the theory of Permanent Revolution and organized the military defense of the Soviet republic.' },
      { name: 'Nikolai Bukharin', role: 'Economic Theorist', contribution: 'Advocated the New Economic Policy (NEP) and evolutionary transition to socialism.' }
    ]
  },
  'marxism-leninism': {
    foundingFather: 'Joseph Stalin (Synthesizer) & Vladimir Lenin',
    foundingFatherTitle: 'Formulators of Soviet State Ideology',
    keyFigures: [
      { name: 'Joseph Stalin', role: 'State Synthesizer & Dictator', contribution: 'Codified "Marxism–Leninism", enacted "Socialism in One Country", five-year plans, and rapid collectivization.' },
      { name: 'Vladimir Lenin', role: 'Ideological Source', contribution: 'Provided the theoretical foundation of imperialist analysis and vanguard state power.' },
      { name: 'Mao Zedong', role: 'Chinese Revolutionary Statesman', contribution: 'Adapted Marxism-Leninism to peasant-based agrarian revolutions.' }
    ]
  },
  'trotskyism': {
    foundingFather: 'Leon Trotsky',
    foundingFatherTitle: 'Father of Permanent Revolution & Anti-Stalinist Internationalism',
    keyFigures: [
      { name: 'Leon Trotsky', role: 'Founding Leader & Theorist', contribution: 'Founded the Fourth International, opposed bureaucratic degeneration in "The Revolution Betrayed", and advocated international workers\' solidarity.' },
      { name: 'Ernest Mandel', role: 'Marxist Economist', contribution: 'Analyzed Late Capitalism and long-wave economic cycles.' },
      { name: 'C.L.R. James', role: 'Pan-African Marxist', contribution: 'Authored "The Black Jacobins", linking anti-colonial revolution to international socialism.' }
    ]
  },
  'maoism': {
    foundingFather: 'Mao Zedong',
    foundingFatherTitle: 'Architect of Chinese Agrarian Revolution & Mass Line',
    keyFigures: [
      { name: 'Mao Zedong', role: 'Founding Revolutionary Chairman', contribution: 'Adapted Marxism to agrarian societies, developed Protracted People\'s War, the Mass Line, and Continuous Revolution.' },
      { name: 'Zhou Enlai', role: 'Diplomatic Statesman', contribution: 'Managed Chinese state administration and initiated modern international diplomacy.' },
      { name: 'Lin Biao', role: 'Military Marshal', contribution: 'Compiled the Little Red Book and led the People\'s Liberation Army.' }
    ]
  },
  'democratic-socialism': {
    foundingFather: 'Jean Jaurès & George Orwell',
    foundingFatherTitle: 'Pioneers of Democratic Worker Self-Governance',
    keyFigures: [
      { name: 'Jean Jaurès', role: 'Founding French Socialist Leader', contribution: 'Unified French socialist movements, championed republican democracy and peace.' },
      { name: 'George Orwell', role: 'Democratic Socialist Essayist', contribution: 'Critiqued authoritarian totalitarianism while ardently defending egalitarian democratic socialism.' },
      { name: 'Salvador Allende', role: 'Elected Socialist President', contribution: 'Led Chile\'s democratic transition to socialism through constitutional means before the 1973 coup.' },
      { name: 'Michael Harrington', role: 'American Socialist Leader', contribution: 'Founded the Democratic Socialists of America (DSA) and authored "The Other America".' }
    ]
  },
  'social-democracy': {
    foundingFather: 'Eduard Bernstein',
    foundingFatherTitle: 'Father of Evolutionary Revisionist Social Democracy',
    keyFigures: [
      { name: 'Eduard Bernstein', role: 'Founding Revisionist Theorist', contribution: 'Authored "Evolutionary Socialism", arguing socialism is achieved through gradual parliamentary democracy and labor reforms.' },
      { name: 'Olof Palme', role: 'Swedish Prime Minister', contribution: 'Expanded the Nordic Welfare Model, strong labor co-determination, and anti-apartheid foreign policy.' },
      { name: 'Willy Brandt', role: 'German Chancellor', contribution: 'Instituted Ostpolitik for East-West reconciliation and modernized the German welfare state.' },
      { name: 'Clement Attlee', role: 'British Prime Minister', contribution: 'Created the UK National Health Service (NHS) and the modern cradle-to-grave welfare system.' }
    ]
  },
  'utopian-socialism': {
    foundingFather: 'Robert Owen & Charles Fourier',
    foundingFatherTitle: 'Pioneers of Cooperative Communities & Utopian Socialism',
    keyFigures: [
      { name: 'Robert Owen', role: 'Cooperative Factory Reformer', contribution: 'Founded New Lanark and New Harmony experimental cooperative communities, proving fair wages increase productivity.' },
      { name: 'Charles Fourier', role: 'Phalanstère Theorist', contribution: 'Envisioned cooperative communities (phalansteries) based on passionate attraction and shared communal labor.' },
      { name: 'Henri de Saint-Simon', role: 'Industrial Technocrat', contribution: 'Advocated an industrial society managed by productive scientists, engineers, and workers.' }
    ]
  },
  'syndicalism': {
    foundingFather: 'Georges Sorel & Fernand Pelloutier',
    foundingFatherTitle: 'Architects of Revolutionary Trade Unionism',
    keyFigures: [
      { name: 'Fernand Pelloutier', role: 'Bourse du Travail Founder', contribution: 'Created French labor exchanges promoting worker education and direct trade union organization.' },
      { name: 'Georges Sorel', role: 'Myth and Direct Action Theorist', contribution: 'Authored "Reflections on Violence", conceptualizing the general strike as an inspiring social myth.' }
    ]
  },

  // --- Anarchism & Libertarianism ---
  'anarchism': {
    foundingFather: 'Pierre-Joseph Proudhon',
    foundingFatherTitle: 'First Person to Self-Declare as an Anarchist',
    keyFigures: [
      { name: 'Pierre-Joseph Proudhon', role: 'Founding Father of Anarchism', contribution: 'Authored "What Is Property?" ("Property is theft!"), founded mutualism and federation theory.' },
      { name: 'Mikhail Bakunin', role: 'Collectivist Anarchist Leader', contribution: 'Led the anti-authoritarian wing in the First International, warning that a "dictatorship of the proletariat" becomes dictatorship of the bureaucracy.' },
      { name: 'Peter Kropotkin', role: 'Anarcho-Communist Scientist', contribution: 'Authored "Mutual Aid: A Factor of Evolution" and "The Conquest of Bread", demonstrating cooperation as an evolutionary driver.' },
      { name: 'Emma Goldman', role: 'Anarcha-Feminist Orator', contribution: 'Campaigned fiercely for free speech, anti-militarism, birth control, and individual self-expression.' }
    ]
  },
  'anarcho-capitalism': {
    foundingFather: 'Murray Rothbard',
    foundingFatherTitle: 'Father of Anarcho-Capitalism & Free-Market Voluntarism',
    keyFigures: [
      { name: 'Murray Rothbard', role: 'Founding Theorist', contribution: 'Synthesized Austrian economics with individualist anarchism, authoring "For a New Liberty" and "The Ethics of Liberty".' },
      { name: 'David Friedman', role: 'Utilitarian Market Theorist', contribution: 'Authored "The Machinery of Freedom", demonstrating private polycentric law without relying on natural rights.' },
      { name: 'Hans-Hermann Hoppe', role: 'Argumentation Ethics Philosopher', contribution: 'Developed argumentation ethics and private property order defense.' }
    ]
  },
  'anarcho-communism': {
    foundingFather: 'Peter Kropotkin & Errico Malatesta',
    foundingFatherTitle: 'Architects of Free-Communist Anarchism',
    keyFigures: [
      { name: 'Peter Kropotkin', role: 'Founding Philosopher', contribution: 'Demonstrated mutual aid in nature and society, proposing a gift-based economy organized by voluntary communes.' },
      { name: 'Errico Malatesta', role: 'Italian Revolutionary Organizer', contribution: 'Advocated anarchist insurrection, voluntary syndicates, and direct democracy.' },
      { name: 'Nestor Makhno', role: 'Revolutionary Military Commander', contribution: 'Led the Revolutionary Insurrectionary Army of Ukraine (Black Army) defending free soviets.' }
    ]
  },
  'mutualism': {
    foundingFather: 'Pierre-Joseph Proudhon',
    foundingFatherTitle: 'Architect of Mutualist Economics & Peoples Banks',
    keyFigures: [
      { name: 'Pierre-Joseph Proudhon', role: 'Founding Thinker', contribution: 'Formulated labor theory of value based on possession rather than capitalist rent, and created the Bank of the People.' },
      { name: 'Benjamin Tucker', role: 'American Individualist Mutualist', contribution: 'Published the journal "Liberty", opposing the four state-created monopolies (money, land, tariffs, patents).' },
      { name: 'Kevin Carson', role: 'Contemporary Mutualist Theorist', contribution: 'Authored "Studies in Mutualist Political Economy", modernizing free-market anti-capitalism.' }
    ]
  },
  'libertarianism': {
    foundingFather: 'Robert Nozick & Ayn Rand',
    foundingFatherTitle: 'Pioneers of Modern Libertarian Political Philosophy',
    keyFigures: [
      { name: 'Robert Nozick', role: 'Philosophical Champion', contribution: 'Authored "Anarchy, State, and Utopia", providing the definitive Harvard philosophical defense of the minimal state.' },
      { name: 'Ayn Rand', role: 'Objectivist Philosopher', contribution: 'Formulated Objectivism, advocating rational self-interest, laissez-faire capitalism, and individual rights.' },
      { name: 'Ludwig von Mises', role: 'Austrian Economist', contribution: 'Proved the economic calculation problem in planned economies and authored "Human Action".' },
      { name: 'Ron Paul', role: 'Statesman & Movement Leader', contribution: 'Popularized constitutional libertarianism, non-interventionist foreign policy, and sound money.' }
    ]
  },
  'minarchism': {
    foundingFather: 'Robert Nozick',
    foundingFatherTitle: 'Philosophical Architect of the Minimal "Night-Watchman" State',
    keyFigures: [
      { name: 'Robert Nozick', role: 'Founding Theorist', contribution: 'Demonstrated that a minimal state limited to defense, courts, and police can arise without violating anyone\'s rights.' },
      { name: 'Ayn Rand', role: 'Moral Defender of Property', contribution: 'Argued the only legitimate function of government is protecting citizens from physical force.' }
    ]
  },
  'anarcho-syndicalism': {
    foundingFather: 'Rudolf Rocker',
    foundingFatherTitle: 'Philosopher of Anarcho-Syndicalist Labor Organization',
    keyFigures: [
      { name: 'Rudolf Rocker', role: 'Founding Author', contribution: 'Authored "Anarcho-Syndicalism: Theory and Practice", explaining unions as both fighting organs and future administrative cells.' },
      { name: 'Buenaventura Durruti', role: 'CNT-FAI Revolutionary Leader', contribution: 'Commanded the Durruti Column in the Spanish Civil War, collectivizing factories and farms in Catalonia.' }
    ]
  },
  'christian-anarchism': {
    foundingFather: 'Leo Tolstoy',
    foundingFatherTitle: 'Father of Christian Nonviolent Anarchism',
    keyFigures: [
      { name: 'Leo Tolstoy', role: 'Founding Author & Moralist', contribution: 'Authored "The Kingdom of God Is Within You", rejecting state violence, military conscription, and oaths.' },
      { name: 'Dorothy Day', role: 'Catholic Worker Movement Co-Founder', contribution: 'Founded the Catholic Worker Movement, practicing voluntary poverty, hospitality houses, and pacifism.' },
      { name: 'Jacques Ellul', role: 'Theologian and Sociologist', contribution: 'Authored "Anarchy and Christianity", analyzing how biblical faith subverts earthly political power.' }
    ]
  },

  // --- Conservatism & Traditionalism ---
  'conservatism': {
    foundingFather: 'Edmund Burke',
    foundingFatherTitle: 'Father of Modern Conservatism & Prudent Governance',
    keyFigures: [
      { name: 'Edmund Burke', role: 'Founding Father of Conservatism', contribution: 'Authored "Reflections on the Revolution in France", defending organic social order, tradition, and generational contracts.' },
      { name: 'Joseph de Maistre', role: 'Traditionalist Counter-Revolutionary', contribution: 'Argued for monarchical authority, religious foundation, and the limits of abstract rationalism.' },
      { name: 'Michael Oakeshott', role: 'Pragmatic Philosopher', contribution: 'Characterized conservatism as a disposition to prefer the familiar to the unknown and the tried to the untried.' },
      { name: 'Russell Kirk', role: 'American Conservative Historian', contribution: 'Authored "The Conservative Mind", articulating the six canons of conservative thought.' }
    ]
  },
  'classical-conservatism': {
    foundingFather: 'Edmund Burke',
    foundingFatherTitle: 'Architect of Organic Society and Institutional Continuity',
    keyFigures: [
      { name: 'Edmund Burke', role: 'Philosophical Founder', contribution: 'Advocated stewardship of inherited institutions and cautious, incremental reform over radical upheaval.' },
      { name: 'David Hume', role: 'Philosophical Skeptic', contribution: 'Demonstrated the role of custom and habit in anchoring social order and law.' }
    ]
  },
  'one-nation-conservatism': {
    foundingFather: 'Benjamin Disraeli',
    foundingFatherTitle: 'Father of One-Nation Conservatism & Social Paternalism',
    keyFigures: [
      { name: 'Benjamin Disraeli', role: 'Founding British Prime Minister', contribution: 'Warned against a Britain divided into "Two Nations" (rich and poor); expanded housing, public health, and labor rights.' },
      { name: 'Harold Macmillan', role: 'Middle Way Prime Minister', contribution: 'Championed "The Middle Way", balancing private enterprise with state housing and public investment.' }
    ]
  },
  'christian-democracy': {
    foundingFather: 'Pope Leo XIII & Robert Schuman',
    foundingFatherTitle: 'Fathers of Christian Democracy and European Unity',
    keyFigures: [
      { name: 'Pope Leo XIII', role: 'Papal Encyclical Author', contribution: 'Issued "Rerum Novarum", establishing modern Catholic social teaching on fair wages, labor dignity, and private property.' },
      { name: 'Konrad Adenauer', role: 'First West German Chancellor', contribution: 'Anchored West Germany in European democracy, NATO, and the Social Market Economy.' },
      { name: 'Robert Schuman', role: 'Founding Father of the European Union', contribution: 'Drafted the Schuman Declaration, creating the European Coal and Steel Community.' },
      { name: 'Alcide De Gasperi', role: 'Italian Prime Minister', contribution: 'Stabilized Italian democracy post-fascism and promoted European economic integration.' }
    ]
  },
  'neoconservatism': {
    foundingFather: 'Irving Kristol & Leo Strauss',
    foundingFatherTitle: 'Intellectual Architects of Neoconservative Philosophy',
    keyFigures: [
      { name: 'Irving Kristol', role: 'Godfather of Neoconservatism', contribution: 'Coined the term: a neoconservative is a "liberal mugged by reality", championing strong defense and moral capitalism.' },
      { name: 'Leo Strauss', role: 'Classical Political Philosopher', contribution: 'Influenced neoconservative thinking on natural right, regime virtues, and the perils of moral relativism.' },
      { name: 'Jeane Kirkpatrick', role: 'UN Ambassador & Foreign Policy Theorist', contribution: 'Distinguished between authoritarian and totalitarian regimes in the Kirkpatrick Doctrine.' }
    ]
  },
  'paleoconservatism': {
    foundingFather: 'Russell Kirk & Pat Buchanan',
    foundingFatherTitle: 'Champions of Traditionalist Anti-Interventionist Conservatism',
    keyFigures: [
      { name: 'Russell Kirk', role: 'Traditionalist Scholar', contribution: 'Anchored conservative thought in Christian heritage, local community, and historic culture.' },
      { name: 'Pat Buchanan', role: 'Political Champion', contribution: 'Advocated "America First" trade protectionism, border security, and non-interventionism.' },
      { name: 'Paul Gottfried', role: 'Political Theorist', contribution: 'Critiqued the managerial state and defended regional localist culture.' }
    ]
  },

  // --- Nationalism & Identity-Based ---
  'civic-nationalism': {
    foundingFather: 'Jean-Jacques Rousseau & Ernest Renan',
    foundingFatherTitle: 'Theorists of the Democratic Nation of Citizens',
    keyFigures: [
      { name: 'Ernest Renan', role: 'Philosopher of the Nation', contribution: 'Defined the nation in "What is a Nation?" as a "daily plebiscite" based on shared civic values rather than race.' },
      { name: 'Jean-Jacques Rousseau', role: 'Social Contract Philosopher', contribution: 'Formulated the General Will and popular sovereignty uniting citizens in a shared republic.' }
    ]
  },
  'ethnic-nationalism': {
    foundingFather: 'Johann Gottfried von Herder',
    foundingFatherTitle: 'Father of Cultural and Linguistic Nationalism (Volksgeist)',
    keyFigures: [
      { name: 'Johann Gottfried von Herder', role: 'Founding Cultural Philosopher', contribution: 'Introduced the concept of the Volksgeist (spirit of the people) rooted in language, folklore, and shared descent.' },
      { name: 'Johann Gottlieb Fichte', role: 'National Orator', contribution: 'Delivered "Addresses to the German Nation", calling for cultural unity and national self-determination.' }
    ]
  },
  'anti-colonial-nationalism': {
    foundingFather: 'Frantz Fanon & Mahatma Gandhi',
    foundingFatherTitle: 'Pioneers of National Liberation and Decolonization',
    keyFigures: [
      { name: 'Mahatma Gandhi', role: 'Satyagraha Leader', contribution: 'Led India\'s nonviolent independence movement (Satyagraha), pioneering peaceful anti-colonial struggle.' },
      { name: 'Frantz Fanon', role: 'Psychiatrist and Revolutionary', contribution: 'Authored "The Wretched of the Earth", analyzing the psychological and structural liberation from colonialism.' },
      { name: 'Kwame Nkrumah', role: 'First President of Ghana', contribution: 'Led Ghana to independence in 1957 and founded the Non-Aligned Movement and Pan-Africanism.' }
    ]
  },
  'pan-africanism': {
    foundingFather: 'W.E.B. Du Bois & Marcus Garvey',
    foundingFatherTitle: 'Fathers of Pan-African Liberation & Unity',
    keyFigures: [
      { name: 'W.E.B. Du Bois', role: 'Pan-African Congress Organizer', contribution: 'Organized global Pan-African Congresses demanding self-determination and civil rights for all African descent.' },
      { name: 'Marcus Garvey', role: 'UNIA Founder', contribution: 'Founded the Universal Negro Improvement Association, promoting economic self-reliance and African redemption.' },
      { name: 'Kwame Nkrumah', role: 'Continental Unity Champion', contribution: 'Co-founded the Organization of African Unity (now the African Union).' }
    ]
  },
  'zionism': {
    foundingFather: 'Theodor Herzl',
    foundingFatherTitle: 'Father of Modern Political Zionism',
    keyFigures: [
      { name: 'Theodor Herzl', role: 'Founding Visionary', contribution: 'Authored "Der Judenstaat" (1896) and organized the First Zionist Congress in Basel, envisioning a Jewish national homeland.' },
      { name: 'David Ben-Gurion', role: 'First Prime Minister of Israel', contribution: 'Declared Israeli independence in 1948 and oversaw national state-building.' },
      { name: 'Chaim Weizmann', role: 'Diplomat & First President', contribution: 'Secured the 1917 Balfour Declaration through international diplomacy.' }
    ]
  },

  // --- Authoritarianism, Fascism & Totalitarianism ---
  'fascism': {
    foundingFather: 'Benito Mussolini & Giovanni Gentile',
    foundingFatherTitle: 'Architects of the Totalitarian Corporatist State',
    keyFigures: [
      { name: 'Benito Mussolini', role: 'Duce of Fascism & Dictator', contribution: 'Founded the National Fascist Party in Italy, march on Rome (1922), and established total state domination ("All in the State, nothing outside the State, nothing against the State").' },
      { name: 'Giovanni Gentile', role: 'Philosopher of Fascism', contribution: 'Ghostwrote "The Doctrine of Fascism", articulating Actual Idealism subordinating the individual wholly to the spiritual state.' },
      { name: 'Gabriele D\'Annunzio', role: 'Aesthetic Precursor', contribution: 'Created the rituals, Roman salute, black shirts, and theatrical mass politics of Italian fascism.' }
    ]
  },
  'national-socialism': {
    foundingFather: 'Adolf Hitler',
    foundingFatherTitle: 'Architect of Nazi Totalitarianism & Racial Supremacy',
    keyFigures: [
      { name: 'Adolf Hitler', role: 'Führer of the Third Reich', contribution: 'Authored "Mein Kampf", orchestrated the totalitarian Nazi regime, aggressive conquest, and the Holocaust.' },
      { name: 'Alfred Rosenberg', role: 'Racial Ideologue', contribution: 'Authored "The Myth of the Twentieth Century", constructing the pseudo-scientific Nordic racial mythology.' },
      { name: 'Joseph Goebbels', role: 'Propaganda Minister', contribution: 'Pioneered total mass-media propaganda, synchronization (Gleichschaltung), and cinematic state mythmaking.' }
    ]
  },
  'absolute-monarchism': {
    foundingFather: 'Jean Bodin & King Louis XIV',
    foundingFatherTitle: 'Architects of Royal Sovereignty and Divine Right of Kings',
    keyFigures: [
      { name: 'Jean Bodin', role: 'Theorist of Sovereignty', contribution: 'Defined absolute sovereignty as perpetual, indivisible, and supreme power in a commonwealth.' },
      { name: 'King Louis XIV', role: 'Sun King Statesman', contribution: 'Embodied absolute royal rule at Versailles ("L\'État, c\'est moi"), consolidating centralized French state power.' },
      { name: 'Jacques-Bénigne Bossuet', role: 'Theologian of Divine Right', contribution: 'Authored "Politics Drawn from the Very Words of Holy Scripture", articulating divine royal legitimacy.' }
    ]
  },
  'theocracy': {
    foundingFather: 'Ayatollah Ruhollah Khomeini & John Calvin',
    foundingFatherTitle: 'Pioneers of Clerical & Scriptural State Governance',
    keyFigures: [
      { name: 'Ayatollah Ruhollah Khomeini', role: 'Supreme Leader & Theorist', contribution: 'Developed the doctrine of Velayat-e Faqih (Guardianship of the Islamic Jurist), establishing the Islamic Republic of Iran (1979).' },
      { name: 'John Calvin', role: 'Genevan Reformer', contribution: 'Established theocratic Protestant church-state governance in 16th-century Geneva.' }
    ]
  },

  // --- Environmental & Ecocentric ---
  'deep-ecology': {
    foundingFather: 'Arne Næss',
    foundingFatherTitle: 'Father of Deep Ecology & Biocentric Equality',
    keyFigures: [
      { name: 'Arne Næss', role: 'Founding Norwegian Philosopher', contribution: 'Coined "Deep Ecology" in 1973, formulated the eight-point platform asserting the intrinsic value of all living beings.' },
      { name: 'Rachel Carson', role: 'Environmental Pioneer', contribution: 'Authored "Silent Spring" (1962), launching the global environmental consciousness movement.' },
      { name: 'George Sessions', role: 'Philosophical Co-Author', contribution: 'Co-drafted the Deep Ecology platform and documented ecocentric philosophy.' }
    ]
  },
  'social-ecology': {
    foundingFather: 'Murray Bookchin',
    foundingFatherTitle: 'Father of Social Ecology & Libertarian Municipalism',
    keyFigures: [
      { name: 'Murray Bookchin', role: 'Founding Social Theorist', contribution: 'Authored "The Ecology of Freedom", demonstrating that human ecological destruction stems directly from social hierarchy and domination.' },
      { name: 'Abdullah Öcalan', role: 'Democratic Confederalist Leader', contribution: 'Adapted Bookchin\'s social ecology to create Democratic Confederalism in Rojava (Northern Syria).' }
    ]
  },
  'ecofeminism': {
    foundingFather: 'Françoise d\'Eaubonne & Vandana Shiva',
    foundingFatherTitle: 'Pioneers of Ecofeminist Philosophy & Earth Democracy',
    keyFigures: [
      { name: 'Françoise d\'Eaubonne', role: 'Originator of the Term', contribution: 'Coined "écoféminisme" in 1974, linking patriarchal exploitation of women with the destruction of nature.' },
      { name: 'Vandana Shiva', role: 'Seed Sovereignty & Earth Activist', contribution: 'Authored "Staying Alive", championing indigenous knowledge, biodiversity, and women\'s ecological leadership.' },
      { name: 'Carolyn Merchant', role: 'Historian of Science', contribution: 'Authored "The Death of Nature", analyzing the historical mechanistic revolution that commodified the Earth.' }
    ]
  },

  // --- Religious & Spiritual Governance ---
  'sphere-sovereignty': {
    foundingFather: 'Abraham Kuyper',
    foundingFatherTitle: 'Father of Neo-Calvinism & Sphere Sovereignty',
    keyFigures: [
      { name: 'Abraham Kuyper', role: 'Founding Dutch Prime Minister & Theologian', contribution: 'Formulated "Sphere Sovereignty" (Soevereiniteit in eigen kring), asserting direct divine autonomy for family, church, and society.' },
      { name: 'Herman Dooyeweerd', role: 'Philosopher of Law', contribution: 'Authored "A New Critique of Theoretical Thought", mapping modal aspects of reality and social institutions.' }
    ]
  },
  'liberation-theology': {
    foundingFather: 'Gustavo Gutiérrez',
    foundingFatherTitle: 'Father of Latin American Liberation Theology',
    keyFigures: [
      { name: 'Gustavo Gutiérrez', role: 'Founding Theologian', contribution: 'Authored "A Theology of Liberation" (1971), establishing the "preferential option for the poor".' },
      { name: 'Archbishop Óscar Romero', role: 'Martyr for Human Rights', contribution: 'Championed the oppressed in El Salvador against military dictatorship until his assassination in 1980.' },
      { name: 'Leonardo Boff', role: 'Franciscan Theologian', contribution: 'Combined liberation theology with ecological care in "Cry of the Earth, Cry of the Poor".' }
    ]
  },
  'islamism': {
    foundingFather: 'Hassan al-Banna & Sayyid Qutb',
    foundingFatherTitle: 'Founders of Modern Political Islam',
    keyFigures: [
      { name: 'Hassan al-Banna', role: 'Muslim Brotherhood Founder', contribution: 'Founded the Muslim Brotherhood in Egypt (1928), organizing social welfare, schools, and political activism.' },
      { name: 'Sayyid Qutb', role: 'Chief Ideologue', contribution: 'Authored "Milestones", formulating modern concepts of Jahiliyyah (pagan ignorance) and Hakimiyyah (divine governance).' },
      { name: 'Abul A\'la Maududi', role: 'South Asian Islamic Theorist', contribution: 'Founded Jamaat-e-Islami and articulated the theoretical model of the modern Islamic state.' }
    ]
  },

  // --- Economic & Structural Systems ---
  'georgism': {
    foundingFather: 'Henry George',
    foundingFatherTitle: 'Father of Georgism & the Land Value Tax',
    keyFigures: [
      { name: 'Henry George', role: 'Founding Economist & Social Reformer', contribution: 'Authored "Progress and Poverty" (1879), proposing a single tax on the unimproved rental value of land to eliminate poverty.' },
      { name: 'Sun Yat-sen', role: 'Founding Father of Modern China', contribution: 'Adopted Georgist land equalization (Equalization of Land Rights) as one of the Three Principles of the People.' },
      { name: 'Mason Gaffney', role: 'Georgist Economist', contribution: 'Demonstrated the Henry George Theorem in public finance and urban economics.' }
    ]
  },
  'distributism': {
    foundingFather: 'G.K. Chesterton & Hilaire Belloc',
    foundingFatherTitle: 'Architects of Distributist Property Democracy',
    keyFigures: [
      { name: 'G.K. Chesterton', role: 'Founding Author & Essayist', contribution: 'Advocated "Three Acres and a Cow", arguing property is so good that every family ought to own some.' },
      { name: 'Hilaire Belloc', role: 'Co-Founder & Historian', contribution: 'Authored "The Servile State" (1912), warning that capitalism and state socialism both reduce citizens to servility.' },
      { name: 'Father José María Arizmendiarrieta', role: 'Practical Implementer', contribution: 'Founded the Mondragon Corporation in the Basque Country, the world\'s largest worker-owned cooperative network.' }
    ]
  },
  'corporatism': {
    foundingFather: 'Émile Durkheim & Pope Pius XI',
    foundingFatherTitle: 'Theorists of Functional Civic Associations & Solidarism',
    keyFigures: [
      { name: 'Émile Durkheim', role: 'Founding Sociologist', contribution: 'Advocated professional corporations to restore social solidarity and overcome anomie in industrial societies.' },
      { name: 'Pope Pius XI', role: 'Papal Author of Quadragesimo Anno', contribution: 'Proposed vocational groups cooperating for the common good beyond class warfare.' }
    ]
  },
  'technocracy': {
    foundingFather: 'Howard Scott & Thorstein Veblen',
    foundingFatherTitle: 'Architects of Scientific Energy-Based Governance',
    keyFigures: [
      { name: 'Howard Scott', role: 'Technocracy Inc. Founder', contribution: 'Proposed managing production and distribution via thermodynamic energy accounting (Energy Units/Joules) rather than money.' },
      { name: 'Thorstein Veblen', role: 'Institutional Economist', contribution: 'Authored "The Engineers and the Price System", arguing engineers are best equipped to run industrial production efficiently.' }
    ]
  },
  'mercantilism': {
    foundingFather: 'Jean-Baptiste Colbert & Thomas Mun',
    foundingFatherTitle: 'Architects of Royal Trade Protectionism & State Bullionism',
    keyFigures: [
      { name: 'Jean-Baptiste Colbert', role: 'French Finance Minister', contribution: 'Engineered "Colbertism", developing state-subsidized manufactures, royal navies, and aggressive export surpluses.' },
      { name: 'Thomas Mun', role: 'East India Company Director', contribution: 'Authored "England\'s Treasure by Forraign Trade", codifying the balance-of-trade doctrine.' }
    ]
  },

  // --- Modern, Tech-Centric & Niche ---
  'transhumanism': {
    foundingFather: 'Julian Huxley & Nick Bostrom',
    foundingFatherTitle: 'Fathers of Transhumanism & Existential Ethics',
    keyFigures: [
      { name: 'Julian Huxley', role: 'Coined the Term Transhumanism', contribution: 'Biologist who coined "transhumanism" in 1957: the human species remaining human, but transcending itself.' },
      { name: 'Nick Bostrom', role: 'Oxford Philosopher', contribution: 'Co-founded the World Transhumanist Association (Humanity+) and analyzed artificial superintelligence and existential risk.' },
      { name: 'FM-2030 (Fereidoun M. Esfandiary)', role: 'Transhumanist Author', contribution: 'Authored "Are You a Transhuman?", defining the transitional human toward posthumanity.' }
    ]
  },
  'accelerationism': {
    foundingFather: 'Nick Land & Mark Fisher',
    foundingFatherTitle: 'Theorists of Technological Acceleration & Cybernetic Capitalism',
    keyFigures: [
      { name: 'Nick Land', role: 'CCRU Founder & Dark Accelerationist', contribution: 'Founded the Cybernetic Culture Research Unit (CCRU), analyzing capitalism as an inhuman, self-amplifying technophilic intelligence.' },
      { name: 'Mark Fisher', role: 'Cultural Theorist & Acid Communist', contribution: 'Authored "Capitalist Realism", exploring post-capitalist desires and leftist technological acceleration.' },
      { name: 'Nick Srnicek & Alex Williams', role: 'Left-Accelerationist Authors', contribution: 'Authored "Inventing the Future: Postcapitalism and a World Without Work", demanding full automation and universal basic income.' }
    ]
  },
  'cyberfeminism': {
    foundingFather: 'Donna Haraway & VNS Matrix',
    foundingFatherTitle: 'Pioneers of the Cyborg Manifesto & Digital Feminist Art',
    keyFigures: [
      { name: 'Donna Haraway', role: 'Philosopher of Science', contribution: 'Authored "A Cyborg Manifesto" (1985), breaking down binary boundaries between nature/culture and male/female through the cyborg.' },
      { name: 'VNS Matrix', role: 'Australian Cyberfeminist Collective', contribution: 'Penned the Cyberfeminist Manifesto for the 21st Century (1991), subverting male technocracy.' }
    ]
  },
  'liquid-democracy': {
    foundingFather: 'Bryan Ford & James Green-Armytage',
    foundingFatherTitle: 'Pioneers of Delegative Proxy Voting Systems',
    keyFigures: [
      { name: 'Bryan Ford', role: 'Computer Scientist & Delegative Theorist', contribution: 'Formulated "Delegative Democracy", combining direct democracy with revocable topic-specific proxy delegation.' },
      { name: 'Dirk Liebhardt', role: 'LiquidFeedback Developer', contribution: 'Built the open-source LiquidFeedback software used by Pirate Parties worldwide.' }
    ]
  }
};

/**
 * Enriches any political ideology with its designated founding father, title, and key figures.
 * Automatically generates high-fidelity character attributes for all 169 ideologies.
 */
export function getEnrichedFoundingData(ideologyId: string, name: string, category: string, keyThinkers: string[]): FoundingFigureRecord {
  if (IDEOLOGY_FOUNDING_FIGURES[ideologyId]) {
    return IDEOLOGY_FOUNDING_FIGURES[ideologyId];
  }

  // Fallback generation based on keyThinkers
  const mainThinker = keyThinkers[0] || 'Historical Philosophers';
  const secondThinker = keyThinkers[1] || 'Foundational Architects';
  const thirdThinker = keyThinkers[2] || 'Prominent Reformers';

  return {
    foundingFather: mainThinker,
    foundingFatherTitle: `Pioneering Architect of ${name}`,
    keyFigures: [
      {
        name: mainThinker,
        role: 'Founding Theorist & Architect',
        contribution: `Formulated the seminal principles, philosophical worldview, and foundational texts of ${name}.`
      },
      ...(keyThinkers.length > 1 ? [
        {
          name: secondThinker,
          role: 'Prominent Co-Architect',
          contribution: `Expanded the theoretical doctrine, public discourse, and policy framework of ${name}.`
        }
      ] : []),
      ...(keyThinkers.length > 2 ? [
        {
          name: thirdThinker,
          role: 'Historic Reformer & Statesman',
          contribution: `Applied and defended ${name} in governance, scholarship, and social movements.`
        }
      ] : [])
    ]
  };
}
