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

const RAW_JAPAN_ASIA_RULER_SPEECHES: BulkSpeechData[] = [
  {
    id: 'japan_shotoku_seventeen_article_constitution',
    title: 'The Seventeen-Article Constitution: "Harmony is to be Valued Above All"',
    originalTitle: '十七条憲法 (Jūshichijō Kenpō)',
    authorOrRuler: 'Prince Shōtoku (Shōtoku Taishi)',
    authorTitle: 'Crown Prince and Regent of Asuka Japan',
    year: 604,
    yearDisplay: '604 AD',
    era: 'Medieval',
    category: 'Charters & Constitutions',
    civilization: 'Yamato Imperial Court (Japan)',
    location: 'Asuka, Nara Prefecture, Japan',
    originalLanguage: 'Classical Chinese (Kanbun)',
    mediumOrFormat: 'Moral and Constitutional Code on Paper Scroll',
    currentPreservationLocation: 'Nihon Shoki (Chronicles of Japan, Book XXII)',
    famousQuote: 'Harmony is to be valued, and an avoidance of wanton opposition is to be honored. When those above are harmonious and those below are friendly, discussions proceed spontaneously to truth.',
    summary: 'Prince Shōtoku issues Japan’s first written constitutional code, blending Buddhist ethics, Confucian duty, and legalist principles to transform clan rivalries into a centralized imperial state dedicated to harmony, fair trials, and public service.',
    historicalContext: 'During the Asuka period, powerful clans like the Soga and Mononobe fought bloody wars over succession and the introduction of Buddhism. Shōtoku\'s code established the moral obligations of ministers to the public.',
    fullExcerptText: 'Article I: Harmony is to be valued, and the avoidance of wanton opposition to be honored. All men are influenced by class feelings, and few are intelligent; hence there are some who disobey their lords and fathers, or who maintain feuds with neighboring villages. But when those above are harmonious and those below are friendly, and there is concord in the discussion of affairs, right views of things spontaneously gain acceptance. Then what is there that cannot be accomplished?\n\nArticle II: Sincerely reverence the Three Treasures: Buddha, the Law, and the Priesthood. What man in what age can fail to cherish this truth?\n\nArticle V: Cease from gluttony and abandon covetous desire; deal impartially with the suits brought by the people. The suits of the rich are like a stone flung into water; the suits of the poor are like water flung into a rock. Let equal justice reign!',
    clauseTitle: 'Harmony as the Supreme Constitutional Principle',
    originalClause: '一曰、以和爲貴、無忤爲宗。人皆有黨、亦少達者... 然上和下睦、諧於論事、則事理自通。',
    modernClause: 'Harmony is to be cherished as of paramount value; when rulers and people communicate in concord, all matters reach righteous resolution.',
    significance: 'The foundational ethical document of Japanese political culture, cementing "Wa" (harmony) as the core societal ideal.',
    lastingImpact: 'Informed Japanese civic values, corporate consensus decision-making, and constitutional history for over 1,400 years.',
    audioSpeechText: 'Harmony is to be valued above all things! When those in high office are harmonious, and those below are friendly, concord reigns and truth prevails. Cast away greed, and judge the suits of the poor and the rich with impartial justice.'
  },
  {
    id: 'japan_hojo_masako_jokyu_address',
    title: 'Address to the Gokenin Samurai: The Jokyu War Defense of the Shogunate',
    originalTitle: '北条政子の演説 (Hōjō Masako’s Jokyu Address)',
    authorOrRuler: 'Hōjō Masako ("The Nun Shogun")',
    authorTitle: 'Widow of Minamoto no Yoritomo, Regent of the Kamakura Shogunate',
    year: 1221,
    yearDisplay: 'May 1221 AD',
    era: 'Medieval',
    category: 'Monumental Speeches',
    civilization: 'Kamakura Shogunate (Japan)',
    location: 'Kamakura, Sagami Province (Kanagawa), Japan',
    originalLanguage: 'Classical Japanese',
    mediumOrFormat: 'Address to the Assembled Gokenin Vassals recorded in Azuma Kagami',
    currentPreservationLocation: 'Azuma Kagami (Mirror of the East), National Archives of Japan',
    famousQuote: 'The debt of gratitude you owe to the late Shogun Yoritomo is higher than the mountains and deeper than the sea!',
    summary: 'When Retired Emperor Go-Toba issued an imperial decree branding the Kamakura regent an outlaw and summoning samurai to destroy the shogunate, Hōjō Masako addressed the terrified Kamakura warriors, reminding them of how Yoritomo liberated the warrior class, turning impending defeat into a lightning march on Kyoto.',
    historicalContext: 'Masako’s emotional speech galvanized 190,000 samurai who marched west, captured Kyoto in weeks, exiled three retired emperors, and established samurai primacy over the imperial court for centuries.',
    fullExcerptText: 'All of you, listen with one heart! These are my last words. The favor and grace bestowed upon you by the late Lord Shogun Yoritomo is higher than Mount Fuji and deeper than the vast ocean! In former days under the court nobles, you were treated as lowly dogs, forced to perform humiliating guard duties in Kyoto with bare feet. Yoritomo granted you land, status, and hereditary rights. Now, malicious courtiers deceive the Emperor to destroy our warrior government. Those who remember Yoritomo’s grace, step forward! Those who wish to join Kyoto, say so now and surrender your fiefs!',
    clauseTitle: 'Warrior Loyalty and Defense of Samurai Autonomous Rights',
    originalClause: '故右大将軍の恩は山よりも高く、海よりも深し... 院宣に従わんと欲する者は、ただちに申し出でよ！',
    modernClause: 'The favor of the late Shogun is higher than mountains and deeper than oceans; whoever wishes to defect to Kyoto, declare it now!',
    significance: 'Saved the Kamakura Shogunate, establishing de facto samurai military control over Japan until the 1868 Meiji Restoration.',
    lastingImpact: 'Hōjō Masako is revered as one of the most powerful and politically formidable women in world history.',
    audioSpeechText: 'Samurai of Kamakura, listen to my words! The debt you owe to the late Lord Yoritomo is higher than mountains and deeper than the sea! He gave you lands, honor, and freedom from courtly servitude. Step forward and march on Kyoto to defend your warrior rights!'
  },
  {
    id: 'japan_hideyoshi_sword_hunt_edict',
    title: 'The Sword Hunt Edict: Pacification and Disarmament of the Peasantry',
    originalTitle: '刀狩令 (Katanagari-rei)',
    authorOrRuler: 'Toyotomi Hideyoshi',
    authorTitle: 'Imperial Regent (Kampaku), Great Unifier of Japan',
    year: 1588,
    yearDisplay: 'August 29, 1588',
    era: 'Early Modern',
    category: 'Legal Codes & Edicts',
    civilization: 'Azuchi-Momoyama Japan',
    location: 'Jurakudai Palace, Kyoto, Japan',
    originalLanguage: 'Classical Japanese',
    mediumOrFormat: 'Imperial Sword Confiscation Decree',
    currentPreservationLocation: 'Historiographical Institute, University of Tokyo',
    famousQuote: 'The farmers of all provinces are strictly forbidden to possess swords, short swords, bows, spears, firearms, or any other weapons.',
    summary: 'Hideyoshi orders the complete disarmament of all peasants, monks, and villagers across Japan, announcing that all melted metal from seized weapons will be used as nails and rivets to construct the gigantic Great Buddha at Hōkō-ji temple in Kyoto.',
    historicalContext: 'Having risen from a peasant foot soldier (ashigaru) himself, Hideyoshi understood that peasant revolts (Ikkō-ikki) could topple warlords. The edict drew a rigid caste line between armed samurai and agrarian farmers.',
    fullExcerptText: '1. The farmers of the various provinces are strictly forbidden to possess long swords, short swords, bows, spears, muskets, or any other kind of weapon. If they harbor weapons secretly and fail to pay taxes, plotting rebellions, they shall be punished without mercy.\n2. The swords and spears collected shall not be wasted; they shall be melted down and used as rivets and bolts in the construction of the Great Buddha of Hōkō-ji in Kyoto. Thus, the farmers shall be saved in this life and the life to come, and peace shall cover the land forever!',
    clauseTitle: 'Total Disarmament of Non-Samurai Classes',
    originalClause: '諸国百姓等、刀、脇差、弓、鑓、鉄砲、其外武具の類所持候事、堅く御停止候事。',
    modernClause: 'All peasants across the provinces are strictly forbidden from possessing swords, guns, spears, or weapons of any kind.',
    significance: 'Permanently ended the Sengoku (Warring States) era of chaotic peasant rebellion and laid the foundation for the Pax Tokugawa.',
    lastingImpact: 'Created the rigid four-tier social structure (Samurai, Farmer, Artisan, Merchant) that governed Edo Japan.',
    audioSpeechText: 'All farmers throughout Japan are strictly forbidden from holding swords, spears, or firearms! Lay down your weapons, and dedicate yourselves solely to the plow. Your melted swords shall build the Great Buddha of Kyoto, ensuring eternal peace across our realm!'
  },
  {
    id: 'japan_meiji_charter_oath',
    title: 'The Charter Oath of Five Articles: Modernization and Opening of Japan',
    originalTitle: '五箇条の御誓文 (Gokajō no Goseimon)',
    authorOrRuler: 'Emperor Meiji (Mutsuhito)',
    authorTitle: '122nd Emperor of Japan',
    year: 1868,
    yearDisplay: 'April 6, 1868',
    era: '19th Century',
    category: 'Charters & Constitutions',
    civilization: 'Empire of Japan',
    location: 'Kyoto Imperial Palace, Japan',
    originalLanguage: 'Classical Japanese',
    mediumOrFormat: 'Imperial Oath sworn before the Shinto deities (Kami)',
    currentPreservationLocation: 'National Archives of Japan, Tokyo',
    famousQuote: 'Knowledge shall be sought throughout the world so as to strengthen the foundations of imperial rule.',
    summary: 'Emperor Meiji gathers the nobles and samurai leaders to swear a sacred oath initiating the Meiji Restoration, abolishing feudal seclusion, promising deliberative assemblies, and ordering Japan to embrace world science, education, and modern institutions.',
    historicalContext: 'Following the overthrow of the Tokugawa Shogunate, Japan faced colonization threats by Western imperial powers. The Charter Oath guided Japan’s meteoric rise into a modern industrial and military superpower.',
    fullExcerptText: 'By this oath, we set up as our aim the establishment of the national welal on a broad basis and the framing of a constitution and laws:\n1. Deliberative assemblies shall be widely established and all matters decided by open discussion.\n2. All classes, high and low, shall be united in vigorously carrying out the administration of affairs of state.\n3. The common people, no less than the civil and military officials, shall each be allowed to pursue their own calling so that there may be no discontent.\n4. Evil customs of the past shall be broken off and everything based upon the just laws of Nature.\n5. Knowledge shall be sought throughout the world so as to strengthen the foundations of imperial rule!',
    clauseTitle: 'Seeking Global Knowledge and Universal Modernization',
    originalClause: '智識ヲ世界ニ求メ大ニ皇基ヲ振起スヘシ。',
    modernClause: 'Knowledge shall be sought throughout the entire world so as to strengthen the foundations of the nation.',
    significance: 'The foundational constitutional charter of modern Japan, marking the transition from feudal isolation to global engagement.',
    lastingImpact: 'Considered the most consequential modernization manifesto in Asian history.',
    audioSpeechText: 'By this sacred oath, we establish the dawn of a new Japan! Deliberative assemblies shall be opened to public discussion. Evil customs of the past shall be abandoned, and knowledge shall be sought throughout the entire world to build our nation strong and free!'
  },
  {
    id: 'korea_sejong_hunminjeongeum',
    title: 'Hunminjeongeum: The Proclamation of Hangul for the Common People',
    originalTitle: '訓民正音 序文 (Hunminjeongeum Preface)',
    authorOrRuler: 'King Sejong the Great',
    authorTitle: 'Fourth Monarch of the Joseon Dynasty (Korea)',
    year: 1446,
    yearDisplay: 'October 1446 AD',
    era: 'Medieval',
    category: 'Human Rights & Declarations',
    civilization: 'Joseon Dynasty (Korea)',
    location: 'Gyeongbokgung Palace, Hanseong (Seoul), Korea',
    originalLanguage: 'Classical Chinese and Middle Korean',
    mediumOrFormat: 'Woodblock Book Publication (Hunminjeongeum Haerye)',
    currentPreservationLocation: 'Kansong Art Museum, Seoul (National Treasure No. 70 & UNESCO Memory of the World)',
    famousQuote: 'Being pained by the inability of the common people to express their feelings, I have newly created twenty-eight letters so that every person may easily learn and use them daily.',
    summary: 'King Sejong the Great invents the scientific Hangul alphabet, breaking the monopoly of elite Yangban scholars who wrote exclusively in difficult Chinese characters (Hanja), allowing every ordinary Korean peasant, woman, and child to achieve effortless literacy.',
    historicalContext: 'Common Koreans could not read legal edicts or write grievances to magistrates, suffering injustice. Sejong and the Hall of Worthies designed Hangul based on the phonetic shapes of vocal organs, despite furious opposition from conservative Confucian literati.',
    fullExcerptText: 'The sounds of our language differ from those of China and cannot be easily transcribed using Chinese characters. Therefore, when innocent and illiterate peasants have grievances they wish to express to magistrates, many of them are unable to make their feelings understood. Being deeply grieved by this injustice, I have newly devised twenty-eight phonetic letters. My only desire is that every person, humble or noble, may learn them with ease and use them conveniently in their daily lives!',
    clauseTitle: 'Democratic Literacy as a Human Right',
    originalClause: '國之語音 異乎中國 與文字不相流通... 予爲此憫然 新制二十八字 欲使人人易習 便於日用耳。',
    modernClause: 'Pained that our people cannot express their thoughts through foreign characters, I have created twenty-eight letters so that everyone may learn them with ease.',
    significance: 'Created the most scientifically designed and linguistically perfect writing system in human history.',
    lastingImpact: 'Celebrated annually in Korea as Hangul Day; transformed Korea into one of the most literate nations on Earth.',
    audioSpeechText: 'The language of our land differs from China, and our people cannot express their hearts through foreign characters! Grieved by the suffering of illiterate peasants, I have created twenty-eight phonetic letters. It is my sincere wish that every man, woman, and child may learn them easily and live in dignity!'
  },
  {
    id: 'korea_yi_sun_sin_myeongnyang_speech',
    title: 'Address before the Battle of Myeongnyang: "He Who Seeks Death Shall Live"',
    originalTitle: '鳴梁大捷 誓師文 (Myeongnyang Battle Oath)',
    authorOrRuler: 'Admiral Yi Sun-sin',
    authorTitle: 'Supreme Naval Commander of the Joseon Dynasty',
    year: 1597,
    yearDisplay: 'October 25, 1597',
    era: 'Early Modern',
    category: 'Monumental Speeches',
    civilization: 'Joseon Dynasty (Korea)',
    location: 'Strait of Myeongnyang, Jindo Island, Korea',
    originalLanguage: 'Classical Chinese / Korean',
    mediumOrFormat: 'Naval Order of the Day recorded in Nanjung Ilgi (War Diary)',
    currentPreservationLocation: 'Hyeonchungsa Shrine, Asan, South Korea (UNESCO Memory of the World)',
    famousQuote: 'He who seeks death shall live; he who seeks life shall die! If one man guards the narrow strait, he can strike fear into a thousand.',
    summary: 'With only 13 Korean panokseon warships remaining after the destruction of the Joseon fleet, Admiral Yi confronts 133 Japanese warships in the roaring tidal whirlpools of Myeongnyang Strait, rallying his terrified captains to win the greatest underdog naval victory in history without losing a single ship.',
    historicalContext: 'Tortured and demoted by a jealous king, Yi was reinstated when Japan\'s second invasion threatened Seoul. By utilizing the ferocious reversible tidal currents of Myeongnyang, Yi crushed Toyotomi Hideyoshi’s naval vanguard.',
    fullExcerptText: 'According to the principles of war: he who seeks death shall live, and he who clings to life shall perish! Furthermore: if one warrior holds a narrow gorge with resolve, he can terrify ten thousand foes. Look upon these thirteen ships; the enemy numbers over one hundred. Yet if our hearts do not waver, the sea itself will fight on our side! Follow my flagship into the tidal narrows, and do not look back!',
    clauseTitle: 'Resolution of Sacrificial Defense against Overwhelming Numbers',
    originalClause: '必死則生 必生則死。一夫當逕 足懼千夫。',
    modernClause: 'Those who are resolved to die shall live; those who seek to live shall die. If one man defends the pass, he can terrify a thousand.',
    significance: 'Destroyed the Japanese maritime supply lines, saving the Korean peninsula and the Ming Dynasty from Japanese conquest.',
    lastingImpact: 'Admiral Yi Sun-sin is revered alongside Horatio Nelson as one of the greatest naval geniuses in global history.',
    audioSpeechText: 'He who seeks death shall live, and he who seeks to save his life shall perish! We have only thirteen ships against their vast armada. But if one man holds the narrow strait with fury, he can terrify ten thousand enemies. Follow my flagship, and fight for Korea!'
  }
];

export const SPEECHES_RULERS_JAPAN_ASIA: PrimarySourceDocument[] = RAW_JAPAN_ASIA_RULER_SPEECHES.map((item) => ({
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
