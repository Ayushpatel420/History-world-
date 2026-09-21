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

const RAW_EUROPE_RULER_SPEECHES: BulkSpeechData[] = [
  {
    id: 'europe_charlemagne_admonitio_generalis',
    title: 'Admonitio Generalis: The Carolingian Renaissance and Universal Education Edict',
    originalTitle: 'Admonitio Generalis (General Admonition for Moral and Educational Renewal)',
    authorOrRuler: 'Charlemagne (Charles the Great)',
    authorTitle: 'King of the Franks, First Holy Roman Emperor',
    year: 789,
    yearDisplay: 'March 23, 789 AD',
    era: 'Medieval',
    category: 'Legal Codes & Edicts',
    civilization: 'Carolingian Empire (Frankish / European)',
    location: 'Aachen Palace (Aix-la-Chapelle), Holy Roman Empire',
    originalLanguage: 'Latin',
    mediumOrFormat: 'Imperial Capitulary on Parchment',
    currentPreservationLocation: 'Bibliothèque Nationale de France, Paris (MS Lat. 10758)',
    famousQuote: 'Let schools be established in every monastery and cathedral, so that boys may learn reading, writing, singing, and grammar without distinction of noble or serf.',
    summary: 'Charlemagne issues a revolutionary capitulary ordering every bishop and monastery across Europe to open free schools for boys regardless of servitude or birth, standardizing the Latin Bible, church liturgy, and the Carolingian minuscule script.',
    historicalContext: 'Faced with widespread illiteracy and decaying administrative communication following the fall of Rome, Charlemagne brought Alcuin of York to Aachen, launching the Carolingian Renaissance.',
    fullExcerptText: 'Let the ministers of God\'s altar adorn their lives with good conduct. And we command that in every bishop\'s see and in every monastery, schools be opened for reading the divine texts. Let children be gathered together to learn grammar, arithmetic, psalms, and singing. Let Catholic texts be copied with extreme care by mature men, so that errors do not corrupt the sacred word. Let peace, concord, and justice prevail among all Christian people!',
    clauseTitle: 'Mandatory Educational Infrastructure in Every Parish',
    originalClause: 'Et ut scolae legentium puerorum fiant. Psalmos, notas, cantus, compotum, grammaticam per singula monasteria vel episcopia docete.',
    modernClause: 'Schools for reading boys must be founded: teach psalms, writing, chanting, arithmetic, and grammar in every monastery and bishopric.',
    significance: 'Created the network of cathedral schools that directly evolved into the first European universities (Bologna, Paris, Oxford).',
    lastingImpact: 'Preserved classical Roman literature through the invention of modern lowercase letters (Carolingian minuscule).',
    audioSpeechText: 'We command that in every monastery and cathedral across our realm, free schools be opened for children! Let boys learn to read, write, and compute without distinction between noble and poor. Let justice, sacred learning, and peace flourish throughout Europe!'
  },
  {
    id: 'europe_alfred_preface_pastoral_care',
    title: 'Preface to Saint Gregory\'s Pastoral Care: Revival of English Learning and the Mother Tongue',
    originalTitle: 'King Alfred\'s Preface to Gregory\'s Cura Pastoralis',
    authorOrRuler: 'King Alfred the Great',
    authorTitle: 'King of the Anglo-Saxons (King of Wessex)',
    year: 890,
    yearDisplay: 'c. 890 AD',
    era: 'Medieval',
    category: 'Religious & Philosophical Texts',
    civilization: 'Kingdom of Wessex (England)',
    location: 'Winchester, England',
    originalLanguage: 'Old English (Anglo-Saxon)',
    mediumOrFormat: 'Vellum Manuscript Preface to Translated Book',
    currentPreservationLocation: 'Bodleian Library, Oxford (MS Hatton 20)',
    famousQuote: 'I remembered how before all was ravaged and burned by the Danes, the churches stood filled with treasures and books, but our men knew not how to read them.',
    summary: 'King Alfred writes a heartfelt letter to his bishops mourning the intellectual ruin caused by Viking raids, commanding that all free-born English youth be taught to read English before Latin, and personally translating essential works of philosophy and law.',
    historicalContext: 'Alfred saved Wessex from Viking destruction at Edington (878). He recognized that physical military victory was hollow without cultural literacy, making Old English a language of literature centuries before other European vernaculars.',
    fullExcerptText: 'King Alfred bids greeting to Bishop Waerferth lovingly and with friendship: It has very often come into my mind what wise men there formerly were throughout England, and how people abroad sought wisdom and learning here in our land, whereas now we must obtain it from abroad if we are to have it at all! Therefore it seems better to me that we translate certain books which are most necessary for all men to know into the language that we all understand, so that all the youth of free men now in England may be set to learning until they can read English writing well!',
    clauseTitle: 'Establishment of Universal English Vernacular Literacy',
    originalClause: 'Đæt eall sio gioguð þe nu is on Angelcynne friora monna... sien to leornunga oðfæste.',
    modernClause: 'That all free-born English youth who have the means be set to study until they can read English writing with ease.',
    significance: 'Established English as a written literary and legal medium, centuries before French or German.',
    lastingImpact: 'Earned Alfred his enduring historical title "the Great", revered as the father of English education and navy.',
    audioSpeechText: 'It has often come into my mind how wise men once flourished across England, whereas today wisdom is almost extinguished. Therefore, let us translate the most noble books into our own English tongue, so that all free-born youth in our land may learn to read and live with understanding.'
  },
  {
    id: 'europe_henry_v_agincourt_st_crispin',
    title: 'The St. Crispin\'s Day Address: "We Few, We Happy Few, We Band of Brothers"',
    originalTitle: 'Speech to the English Army on the Feast of Saint Crispin',
    authorOrRuler: 'King Henry V of England',
    authorTitle: 'King of England, Lord of Ireland, Duke of Aquitaine',
    year: 1415,
    yearDisplay: 'October 25, 1415',
    era: 'Medieval',
    category: 'Monumental Speeches',
    civilization: 'Kingdom of England',
    location: 'Agincourt, Artois, Northern France',
    originalLanguage: 'Middle English / Anglo-Norman French',
    mediumOrFormat: 'Pre-battle oration to longbowmen and knights',
    currentPreservationLocation: 'Chronicles of Enguerrand de Monstrelet & Shakespeare\'s Henry V',
    famousQuote: 'We few, we happy few, we band of brothers; for he to-day that sheds his blood with me shall be my brother; be he ne\'er so vile, this day shall gentle his condition.',
    summary: 'Starving, dysentery-stricken, and outnumbered five to one by French armored cavalry in the muddy fields of Agincourt, King Henry V refuses to wish for a single extra soldier, proclaiming that fewer numbers only guarantee a greater share of immortal honor.',
    historicalContext: 'Henry V’s longbowmen decimated the charging French chivalry through superior positioning behind sharpened stakes, winning one of the most astonishing tactical victories of the Hundred Years\' War.',
    fullExcerptText: 'What\'s he that wishes so? My cousin Westmoreland? No, my fair cousin: if we are marked to die, we are enow to do our country loss; and if to live, the fewer men, the greater share of honour! God\'s will! I pray thee, wish not one man more. Rather proclaim it through my host that he which hath no stomach to this fight, let him depart. This story shall the good man teach his son; and Crispin Crispian shall ne\'er go by, from this day to the ending of the world, but we in it shall be remembered! We few, we happy few, we band of brothers!',
    clauseTitle: 'The Nobility of Shared Battlefield Sacrifices',
    originalClause: 'He that shall live this day, and see old age, will yearly on the vigil feast his neighbours... we band of brothers!',
    modernClause: 'Whoever sheds blood alongside me today shall be my brother, and this day shall elevate him to noble honor forever.',
    significance: 'The ultimate expression of fraternal military solidarity transcending feudal social classes.',
    lastingImpact: 'Immortalized by William Shakespeare; Churchill borrowed its cadence ("The Few") during the Battle of Britain.',
    audioSpeechText: 'If we are marked to die, we are enough to do our country loss; and if to live, the fewer men, the greater share of honour! Wish not one man more from England. We few, we happy few, we band of brothers! For he today that sheds his blood with me shall be my brother forever!'
  },
  {
    id: 'europe_elizabeth_i_tilbury_speech',
    title: 'Speech to the Troops at Tilbury: "The Heart and Stomach of a King"',
    originalTitle: 'Queen Elizabeth\'s Armada Speech to the Army at Tilbury',
    authorOrRuler: 'Queen Elizabeth I',
    authorTitle: 'Queen of England, France, and Ireland, Defender of the Faith',
    year: 1588,
    yearDisplay: 'August 9, 1588',
    era: 'Early Modern',
    category: 'Monumental Speeches',
    civilization: 'Kingdom of England',
    location: 'Tilbury Camp, Essex, England',
    originalLanguage: 'Early Modern English',
    mediumOrFormat: 'Royal Field Address delivered on horseback wearing silver breastplate',
    currentPreservationLocation: 'British Library, London (Harleian MS 6798)',
    famousQuote: 'I know I have the body but of a weak and feeble woman; but I have the heart and stomach of a king, and of a king of England too!',
    summary: 'Riding before her militia soldiers at Tilbury while the Spanish Armada hovered off the coast, Queen Elizabeth I defies advisors who warned her not to trust armed subjects, declaring her readiness to live or die alongside her people in defense of English liberty.',
    historicalContext: 'King Philip II of Spain dispatched the Invincible Armada of 130 ships to overthrow Elizabeth and restore Catholicism. British fire ships at Gravelines and violent storms scattered the invasion force.',
    fullExcerptText: 'My loving people, we have been persuaded by some that are careful of our safety to take heed how we commit ourselves to armed multitudes, for fear of treachery. But I assure you, I do not desire to live to distrust my faithful and loving people! Let tyrants fear! I have always so behaved myself that, under God, I have placed my chiefest strength and safeguard in the loyal hearts and good-will of my subjects. And therefore I am come amongst you, as you see, at this time, not for my recreation and disport, but being resolved, in the midst and heat of the battle, to live or die amongst you all; to lay down for my God, and for my kingdom, and for my people, my honour and my blood, even in the dust! I know I have the body but of a weak, feeble woman; but I have the heart and stomach of a king, and of a king of England too!',
    clauseTitle: 'Royal Identification with the Defense of the Realm',
    originalClause: 'I have the body but of a weak and feeble woman, but I have the heart and stomach of a king, and of a king of England too, and think foul scorn that Parma or Spain, or any prince of Europe, should dare to invade the borders of my realm!',
    modernClause: 'I possess the physical body of a woman, but the courageous heart of an English king, scorning any foreign prince who dares invade our soil.',
    significance: 'The defining oratorical masterpiece of the Elizabethan Golden Age, shattering gender stereotypes of monarchical military leadership.',
    lastingImpact: 'Ranked among the greatest battle speeches in the English language.',
    audioSpeechText: 'My loving people! I have not come among you for recreation, but resolved in the heat of battle to live or die amongst you all! I know I have the body of a weak and feeble woman; but I have the heart and stomach of a king, and of a king of England too! We shall repel any tyrant who dares invade our shores!'
  },
  {
    id: 'europe_frederick_great_leuthen_address',
    title: 'Address to the Generals before the Battle of Leuthen: "Victory or We Meet No More"',
    originalTitle: 'Ansprache an die Generale vor der Schlacht bei Leuthen',
    authorOrRuler: 'Frederick II the Great',
    authorTitle: 'King of Prussia ("Old Fritz")',
    year: 1757,
    yearDisplay: 'December 3, 1757',
    era: 'Early Modern',
    category: 'Monumental Speeches',
    civilization: 'Kingdom of Prussia',
    location: 'Parchwitz, Silesia (now Poland)',
    originalLanguage: 'German and French',
    mediumOrFormat: 'Pre-Battle Assembly Address to Regimental Commanders',
    currentPreservationLocation: 'Geheimes Staatsarchiv Preußischer Kulturbesitz, Berlin',
    famousQuote: 'We must beat the enemy, or let ourselves all be buried by his batteries. Remember, gentlemen, you are Prussians!',
    summary: 'Facing an Austrian army nearly three times his size in freezing Silesian snow, Frederick gathers all his generals, telling them that Prussia’s very survival hangs on the morning battle, and promising that any regiment that fails to advance will be publicly stripped of its colors.',
    historicalContext: 'At Leuthen, Frederick executed the greatest oblique order maneuver in military history, rolling up the Austrian flank and inflicting 22,000 casualties while losing only 6,000. Napoleon called Leuthen "a masterpiece of movements, maneuver, and resolution."',
    fullExcerptText: 'Gentlemen! The enemy holds an entrenched position with sixty-six thousand men, while we count barely thirty-three thousand. I know the hardships you have suffered; but our country is in mortal peril. We must attack the Austrian positions wherever we find them. If any cavalry regiment hesitates to charge home, I will strip its colors on the field; if any infantry battalion falters, it shall lose its swords! I demand unconditional devotion. We must conquer, or we shall meet no more!',
    clauseTitle: 'All-or-Nothing Resolution for State Survival',
    originalClause: 'Wir müssen den Feind schlagen, oder uns vor seinen Batterien alle begraben lassen... Leben Sie wohl, meine Herren; bald haben wir die Schlacht geschlagen, oder wir sehen uns nie wieder.',
    modernClause: 'We must beat the enemy or be buried before his batteries; farewell, gentlemen, soon we will have won the victory, or we will never meet again.',
    significance: 'Secured Prussia’s status as a major European great power during the Seven Years\' War.',
    lastingImpact: 'Regarded as the pinnacle of Frederick the Great’s strategic and rhetorical genius.',
    audioSpeechText: 'Gentlemen! The enemy outnumbers us two to one; but our country is in mortal danger. We must attack the enemy and break his lines, or be buried before his cannons! I demand complete devotion. Fare you well, gentlemen: tomorrow we conquer, or we meet no more!'
  },
  {
    id: 'europe_napoleon_fontainebleau_farewell',
    title: 'Farewell to the Imperial Old Guard at Fontainebleau: "Adieu, Mes Enfants!"',
    originalTitle: 'Adieux de Napoléon à la Garde Impériale à Fontainebleau',
    authorOrRuler: 'Napoleon Bonaparte (Napoleon I)',
    authorTitle: 'Emperor of the French, King of Italy',
    year: 1814,
    yearDisplay: 'April 20, 1814',
    era: '19th Century',
    category: 'Monumental Speeches',
    civilization: 'French Empire',
    location: 'Cour du Cheval Blanc, Palace of Fontainebleau, France',
    originalLanguage: 'French',
    mediumOrFormat: 'Farewell Address to the Grenadiers of the Old Guard',
    currentPreservationLocation: 'Archives Nationales, Paris & Château de Fontainebleau',
    famousQuote: 'Soldiers of my Old Guard: I bid you farewell! For twenty years I have found you constantly on the road to honor and glory.',
    summary: 'Following his forced abdication by the Allied coalition, Napoleon descends the horseshoe staircase of Fontainebleau into the courtyard, addressing his weeping veteran grenadiers, embracing the regimental imperial eagle flag before boarding his carriage for exile on Elba.',
    historicalContext: 'Napoleon had dominated Europe for two decades. Betrayed by his marshals after the fall of Paris, he attempted suicide before bidding this deeply emotional farewell to the men who had marched with him from Marengo to Moscow.',
    fullExcerptText: 'Soldiers of my Old Guard: I bid you farewell! For twenty years I have found you unceasingly on the path of victory and honor. In these latter days, as in the days of our prosperity, you have never ceased to be models of bravery and fidelity. With men like you, our cause was not lost; but the war would have been unending: it would have brought civil war upon France, and France would only have been more unhappy. I have therefore sacrificed all our interests to those of the fatherland; I depart. You, my friends, continue to serve France! Do not pity my fate; if I have consented to survive, it is to serve your glory: I will write of the great deeds we have done together! Adieu, my children! I would press you all to my heart; let me at least embrace your flag!',
    clauseTitle: 'Sacrifice of Power to Spare Civil War',
    originalClause: 'J\'aurais pu continuer la guerre... mais la France eût été malheureuse. J\'ai sacrifié tous mes intérêts à ceux de la patrie; je pars... Adieu, mes enfants!',
    modernClause: 'I could have continued the war, but France would have suffered civil war; I sacrificed my interests to the fatherland. Farewell, my children!',
    significance: 'The most famous military farewell in European history, symbolizing the tragic close of the Napoleonic era.',
    lastingImpact: 'The courtyard at Fontainebleau remains known to this day as the "Cour des Adieux" (Courtyard of Farewells).',
    audioSpeechText: 'Soldiers of my Old Guard: I bid you farewell! For twenty years you have walked with me on the path of honor and glory. Do not weep for my fate: if I have chosen to live, it is to write the history of our great deeds. Farewell, my children! Let me press your imperial eagle to my heart!'
  },
  {
    id: 'europe_bismarck_blood_and_iron',
    title: 'The Blood and Iron Address: Realpolitik and German Unification',
    originalTitle: 'Blut und Eisen Rede (Speech to the Prussian Budget Commission)',
    authorOrRuler: 'Otto von Bismarck',
    authorTitle: 'Minister President of Prussia, Iron Chancellor of the German Empire',
    year: 1862,
    yearDisplay: 'September 30, 1862',
    era: '19th Century',
    category: 'Monumental Speeches',
    civilization: 'Kingdom of Prussia / German Empire',
    location: 'Prussian House of Representatives, Berlin, Germany',
    originalLanguage: 'German',
    mediumOrFormat: 'Parliamentary Committee Address on Military Appropriations',
    currentPreservationLocation: 'Bundesarchiv, Berlin-Lichterfelde',
    famousQuote: 'The great questions of the day will not be decided by speeches and majority resolutions—that was the great mistake of 1848 and 1849—but by iron and blood!',
    summary: 'Bismarck rebukes liberal parliamentarians who refused to fund the modernization of the Prussian Army, arguing with cold Realpolitik that German national unity would never be achieved through idealistic parliamentary debates, but through industrial and military strength.',
    historicalContext: 'Bismarck’s policy led directly to three swift, victorious wars against Denmark (1864), Austria (1866), and France (1870), culminating in the proclamation of the German Empire in the Hall of Mirrors at Versailles in 1871.',
    fullExcerptText: 'Prussia must concentrate its strength and hold it for the favorable moment, which has already been missed several times. Prussia\'s borders according to the Vienna treaties are not favorable to a healthy state life. Not through speeches and majority decisions will the great questions of the day be decided—that was the great error of 1848 and 1849—but by iron and blood (Eisen und Blut)! If the assembly refuses the necessary funds, the Crown will govern without your budget!',
    clauseTitle: 'Rejection of Idealism for Industrial and Military Realpolitik',
    originalClause: 'Nicht durch Reden und Majoritätsbeschlüsse werden die großen Fragen der Zeit entschieden... sondern durch Eisen und Blut.',
    modernClause: 'Not through speeches and majority votes are the great questions of our time decided, but by iron and blood.',
    significance: 'Coined the foundational slogan of Realpolitik and paved the way for the unification of modern Germany.',
    lastingImpact: 'A textbook case of 19th-century realpolitik and authoritarian constitutional statecraft.',
    audioSpeechText: 'Prussia must hold its military strength ready for the moment! The great questions of our time will not be decided by speeches and majority votes—that was the fatal mistake of 1848. No! The great questions of history are decided by iron and blood!'
  }
];

export const SPEECHES_RULERS_EUROPE_MONARCHS: PrimarySourceDocument[] = RAW_EUROPE_RULER_SPEECHES.map((item) => ({
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
