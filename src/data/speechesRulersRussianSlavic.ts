import { PrimarySourceDocument, KeyClause } from './primarySourcesData';

interface BulkSpeechData {
  id: string;
  title: string;
  originalTitle?: string;
  authorOrRuler: string;
  authorTitle: string;
  year: number;
  yearDisplay: string;
  era: 'Antiquity' | 'Classical' | 'Medieval' | 'Early Modern' | '19th Century' | '20th Century' | 'Modern';
  category: 'Treaties & Accords' | 'Legal Codes & Edicts' | 'Monumental Speeches' | 'Charters & Constitutions' | 'Religious & Philosophical Texts' | 'Human Rights & Declarations';
  civilization: string;
  location: string;
  originalLanguage: string;
  mediumOrFormat: string;
  currentPreservationLocation: string;
  famousQuote: string;
  summary: string;
  historicalContext: string;
  fullExcerptText: string;
  clauseTitle: string;
  originalClause: string;
  modernClause?: string;
  modernizedMeaning?: string;
  significance: string;
  lastingImpact: string;
  audioSpeechText: string;
}

const RAW_RUSSIAN_RULER_SPEECHES: BulkSpeechData[] = [
  {
    id: 'russian_sviatoslav_dorostolon_speech',
    title: 'Address at the Siege of Dorostolon: "The Dead Know No Shame"',
    originalTitle: 'Речь Святослава: «Мертвые сраму не имут»',
    authorOrRuler: 'Grand Prince Sviatoslav I of Kiev',
    authorTitle: 'Grand Prince of Kievan Rus ("The Brave")',
    year: 971,
    yearDisplay: 'July 971 AD',
    era: 'Medieval',
    category: 'Monumental Speeches',
    civilization: 'Kievan Rus (Russian)',
    location: 'Dorostolon (Silistra), Danube River, Bulgaria',
    originalLanguage: 'Old East Slavic',
    mediumOrFormat: 'Pre-Battle Battlefield Address recorded in the Primary Chronicle (Tale of Bygone Years)',
    currentPreservationLocation: 'Russian National Library, Saint Petersburg (Laurentian Codex)',
    famousQuote: 'Let us not shame the Russian land, but lay down our bones right here! For the dead know no shame, but if we flee, eternal shame will be upon us.',
    summary: 'Surrounded by Byzantine Emperor John I Tzimiskes\'s iron-clad cataphracts and siege engines on the Danube, the pagan Grand Prince Sviatoslav urges his outnumbered Druzhina warriors to fight to the death rather than suffer the dishonor of surrender or flight.',
    historicalContext: 'Sviatoslav was the quintessential warrior-prince of early Rus, sleeping on horse blankets with a saddle for a pillow and warning enemies before attacking with his famous message: "I am coming at you!" (Иду на вы!).',
    fullExcerptText: 'Brothers and warriors! There is nowhere for us to retreat. Whether we wish it or not, we must stand and fight! Let us not disgrace the Russian land, but lay down our bones here! For the dead know no dishonor; but if we flee, everlasting shame shall cling to our names. If my head falls, take thought for yourselves; but if I live, I shall lead you from the front!',
    clauseTitle: 'Refusal of Flight and Defense of Military Honor',
    originalClause: 'Да не посрамим земли Русския, но ляжем костьми ту: мертвии бо срама не имут!',
    modernClause: 'Let us not bring shame upon the Russian land, but lay our bones here: for the dead feel no shame, but fleeing brings eternal disgrace.',
    significance: 'The foundational military rallying cry in early East Slavic and Russian literature.',
    lastingImpact: 'Quoted across a millennium of Russian military history, from the defense of Moscow to the Great Patriotic War.',
    audioSpeechText: 'Brothers! There is nowhere for us to flee. Let us not bring shame upon the Russian land, but lay down our bones right here! For the dead know no dishonor, but if we flee, eternal shame will follow our children. Follow my shield into the fight!'
  },
  {
    id: 'russian_alexander_nevsky_ice_battle',
    title: 'Address before the Battle on the Ice: "God is Not in Power, but in Truth"',
    originalTitle: 'Речь Александра Невского: «Не в силе Бог, а в правде!»',
    authorOrRuler: 'Saint Alexander Nevsky',
    authorTitle: 'Prince of Novgorod, Grand Prince of Vladimir and Kiev',
    year: 1242,
    yearDisplay: 'April 5, 1242',
    era: 'Medieval',
    category: 'Monumental Speeches',
    civilization: 'Novgorod Republic / Medieval Rus',
    location: 'Lake Peipus (Chudskoye Lake), Russian-Estonian border',
    originalLanguage: 'Old East Slavic / Church Slavonic',
    mediumOrFormat: 'Address to the Novgorod Militia and Druzhina warriors',
    currentPreservationLocation: 'The Life of Alexander Nevsky (Zhitie Aleksandra Nevskogo), Moscow',
    famousQuote: 'God is not in power, but in truth! Whoever comes to us with the sword, shall perish by the sword!',
    summary: 'Facing the heavily armored crusader knights of the Teutonic and Livonian Orders on the frozen surface of Lake Peipus, Prince Alexander Nevsky prays before his troops, reminding them that numerical force and heavy steel mean nothing before divine justice and moral truth.',
    historicalContext: 'With Rus devastated by the Mongol invasions of Batu Khan, Western crusaders sought to conquer northern Russia and convert it to Catholicism. Nevsky’s tactical victory on the ice preserved Orthodox Russian culture.',
    fullExcerptText: 'Novgorodians, brave warriors of the north! Look upon these proud knights who advance across the frozen lake with crosses on their cloaks and swords drawn against our churches. Do not fear their iron armor or their towering warhorses. Remember always: God is not in power, but in truth! If our cause is righteous, the ice beneath their feet shall break, and the Lord will deliver our land from their pride!',
    clauseTitle: 'Moral Supremacy of Truth over Military Force',
    originalClause: 'Не в силе Бог, но в правде! Кто с мечом к нам придет, от меча и погибнет!',
    modernClause: 'God is not in physical power, but in righteousness! Whoever comes to us with a sword shall perish by the sword.',
    significance: 'Halted the northern expansion of the Teutonic Crusades into Rus territory.',
    lastingImpact: 'Celebrated as a holy protector of Russia; immortalized in Sergei Eisenstein’s film and Prokofiev’s epic score.',
    audioSpeechText: 'Men of Novgorod! Do not be terrified by the iron armor of the Teutonic knights. Remember this truth for all generations: God is not in brute power, but in truth! He who comes to our land with the sword, by the sword shall perish!'
  },
  {
    id: 'russian_peter_great_poltava_address',
    title: 'Address to the Russian Army before the Battle of Poltava: "Do Not Fight for Peter"',
    originalTitle: 'Приказ Петра I перед Полтавской битвой',
    authorOrRuler: 'Tsar Peter I the Great',
    authorTitle: 'Tsar and Grand Prince of All Russia, First Emperor of All Russia',
    year: 1709,
    yearDisplay: 'June 27, 1709',
    era: 'Early Modern',
    category: 'Monumental Speeches',
    civilization: 'Tsardom of Russia',
    location: 'Poltava, Ukraine',
    originalLanguage: 'Russian',
    mediumOrFormat: 'General Army Order read by the Tsar on horseback riding the battle line',
    currentPreservationLocation: 'Russian State Archive of Ancient Acts (RGADA), Moscow',
    famousQuote: 'Do not think that you are fighting for Peter, but for the state entrusted to Peter, for your fatherland, for our Orthodox faith, and for Russia!',
    summary: 'Riding before his regiments under heavy artillery fire (a Swedish bullet famously pierced his tricorn hat), Peter the Great orders his soldiers to realize that the battle against King Charles XII of Sweden will decide whether Russia will exist as an independent European empire or be dismembered.',
    historicalContext: 'Charles XII was the undisputed military genius of Europe. At Poltava, Peter\'s modernized army crushed the Swedish invaders, ending the Swedish Empire\'s dominance of northern Europe and inaugurating the Russian Empire.',
    fullExcerptText: 'Soldiers of Russia! The hour has arrived which will decide the fate of our entire fatherland! In this battle, do not think that you are fighting for Peter, but for the state entrusted to Peter, for your kinsmen, for your native land, and for our Holy Faith. As for Peter, know that he does not value his own life, if only Russia may live in glory and prosperity, and its honor remain untarnished!',
    clauseTitle: 'Subordination of the Monarch to the Fatherland',
    originalClause: 'А о Петре ведайте, что ему жизнь его не дорога, только бы жила Россия в блаженстве и славе, для благосостояния вашего.',
    modernClause: 'And concerning Peter, know that his life is not dear to him, if only Russia lives in glory and prosperity for your welfare.',
    significance: 'Transformed the ideological concept of Russian monarchy from personal patrimony (Votchina) to public service to the State.',
    lastingImpact: 'Ended the Great Northern War, confirmed the foundation of Saint Petersburg, and launched Russia as a global superpower.',
    audioSpeechText: 'Soldiers of Russia! The hour has come that will decide the fate of our fatherland! Do not think you fight for Peter; fight for the Russian state, for your families, and for our freedom. As for Peter, know that my life means nothing to me, if only Russia lives in glory and prosperity!'
  },
  {
    id: 'russian_catherine_great_nakaz_proem',
    title: 'The Nakaz: Enlightenment Instruction to the Legislative Commission',
    originalTitle: 'Наказ Императрицы Екатерины II Уложенной Комиссии',
    authorOrRuler: 'Empress Catherine II the Great',
    authorTitle: 'Autocrat and Empress of All the Russias',
    year: 1767,
    yearDisplay: 'July 30, 1767',
    era: 'Early Modern',
    category: 'Charters & Constitutions',
    civilization: 'Russian Empire',
    location: 'Facetted Chamber, Kremlin, Moscow, Russia',
    originalLanguage: 'Russian and French',
    mediumOrFormat: 'Imperial Philosophical Instruction (655 Articles)',
    currentPreservationLocation: 'State Archive of the Russian Federation (GARF), Moscow',
    famousQuote: 'Russia is a European State. The Sovereign is absolute; but the true purpose of autocracy is not to deprive people of natural liberty, but to direct their actions to the greatest good of all.',
    summary: 'Empress Catherine the Great drafts an extraordinary philosophical legal charter drawing directly from Montesquieu and Beccaria, convening 564 elected delegates from across the Russian Empire (including Cossacks, Tatars, and peasants) to draft a new enlightened code of laws.',
    historicalContext: 'Catherine corresponded with Voltaire and Diderot. Her Nakaz denounced torture, argued for proportional punishments, religious toleration, and universal education, astonishing European courts with its progressive vision.',
    fullExcerptText: 'Article 6: Russia is a European State.\nArticle 13: What is the true purpose of absolute monarchy? It is not to strip men of their natural liberty, but to direct their actions toward the highest virtue.\nArticle 34: The equality of the citizens consists in this: that they should all be subject to the same laws.\nArticle 194: The use of torture is contrary to all the dictates of nature and reason; let it be banished forever from our tribunals. For it is better that ten guilty persons escape than that one innocent man suffer condemnation!',
    clauseTitle: 'Universal Equality of Citizens before the Law and Abolition of Torture',
    originalClause: 'Равенство всех граждан состоит в том, чтобы все подвержены были тем же законам... Употребление пытки противно здравому рассуждению.',
    modernClause: 'The equality of all citizens consists in everyone being subject to the same laws; torture is contrary to reason and justice.',
    significance: 'The first attempt by a Russian autocrat to apply Enlightenment political philosophy and legal equality systematically.',
    lastingImpact: 'Banned in pre-revolutionary France as too radical; shaped Russian administrative reform for half a century.',
    audioSpeechText: 'Russia is a European state! The true purpose of government is not to deprive men of their natural liberty, but to direct all actions toward the greatest good. The equality of citizens consists in this: that all are subject to the same laws. Let torture be banished forever from our courts!'
  },
  {
    id: 'russian_alexander_ii_emancipation_manifesto',
    title: 'The Emancipation Manifesto: Liberating Twenty-Three Million Serfs',
    originalTitle: 'Манифест 19 февраля 1861 года об отмене крепостного права',
    authorOrRuler: 'Tsar Alexander II ("The Tsar Liberator")',
    authorTitle: 'Emperor of All the Russias',
    year: 1861,
    yearDisplay: 'March 3, 1861 (Feb 19 O.S.)',
    era: '19th Century',
    category: 'Human Rights & Declarations',
    civilization: 'Russian Empire',
    location: 'Winter Palace, Saint Petersburg, Russia',
    originalLanguage: 'Russian',
    mediumOrFormat: 'Imperial Accession Manifesto read in all churches',
    currentPreservationLocation: 'State Historical Museum, Moscow',
    famousQuote: 'It is better to abolish serfdom from above than to wait until it begins to abolish itself from below.',
    summary: 'Tsar Alexander II signs the historic emancipation decree granting full personal civil liberty to 23 million state and private serfs across Russia, granting them the right to own property, marry freely, run businesses, and purchase agricultural allotments.',
    historicalContext: 'Defeat in the Crimean War exposed the backwardness of Russia\'s feudal agrarian economy. Alexander II courageously pushed through the reform despite fierce resistance from aristocratic landowners, earning him the title "Tsar Liberator."',
    fullExcerptText: 'By the Grace of God, We, Alexander the Second, Emperor and Autocrat of All the Russias: In examining the condition of classes and estates within our Empire, We became convinced that the legislation of our Empire, while organizing the upper classes, has not provided for the personal rights of the bonded peasantry. In virtue of these new decrees, bonded peasants will receive in due time the full rights of free rural inhabitants! They may acquire property, enter contracts, and govern their own village communes under the protection of the laws. May the sign of the cross be made by the liberated peasant on his plow!',
    clauseTitle: 'Immediate Grant of Personal Liberty and Civil Rights to Serfs',
    originalClause: 'Крепостные люди получат в свое время полные права свободных сельских обывателей... совершая на себе крестное знамение.',
    modernClause: 'Enslaved serfs will receive the full rights of free rural citizens, enjoying personal freedom, property ownership, and the rule of law.',
    significance: 'The largest single peaceful emancipation of enslaved laborers in human history, freeing more than double the number of slaves freed in the American Civil War.',
    lastingImpact: 'Fundamentally revolutionized Russian society, modernizing the economy and laying the groundwork for the modern Russian state.',
    audioSpeechText: 'By the Grace of God, We decree that all bonded peasants throughout the Russian Empire receive the full rights of free citizens! Serfdom is abolished forever. May the liberated peasant make the sign of the cross upon his plow, and work his own land in freedom and dignity!'
  }
];

export const SPEECHES_RULERS_RUSSIAN_SLAVIC: PrimarySourceDocument[] = RAW_RUSSIAN_RULER_SPEECHES.map((item) => ({
  id: item.id,
  title: item.title,
  originalTitle: item.originalTitle || item.title,
  authorOrRuler: item.authorOrRuler,
  authorTitle: item.authorTitle,
  year: item.year,
  yearDisplay: item.yearDisplay,
  era: item.era,
  category: item.category,
  civilization: item.civilization,
  location: item.location,
  originalLanguage: item.originalLanguage,
  mediumOrFormat: item.mediumOrFormat,
  currentPreservationLocation: item.currentPreservationLocation,
  famousQuote: item.famousQuote,
  summary: item.summary,
  historicalContext: item.historicalContext,
  fullExcerptText: item.fullExcerptText,
  keyClauses: [
    {
      clauseNumberOrTitle: item.clauseTitle,
      originalExcerpt: item.originalClause,
      modernizedMeaning: item.modernClause || item.modernizedMeaning || '',
      historicalSignificance: item.significance
    }
  ],
  lastingImpact: item.lastingImpact,
  audioSpeechText: item.audioSpeechText
}));
