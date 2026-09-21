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

const RAW_AMERICAS_INDIGENOUS_SPEECHES: BulkSpeechData[] = [
  {
    id: 'americas_nezahualcoyotl_cantares_mexicanos',
    title: 'The Meditation of Texcoco: "Truly Do We Live on Earth?"',
    originalTitle: 'In xochitl in cuicatl (The Song of Nezahualcóyotl)',
    authorOrRuler: 'Nezahualcóyotl ("The Fasting Coyote")',
    authorTitle: 'Huey Tlatoani (Philosopher King) of Texcoco, Acolhua Empire',
    year: 1450,
    yearDisplay: 'c. 1450 AD',
    era: 'Medieval',
    category: 'Religious & Philosophical Texts',
    civilization: 'Aztec / Triple Alliance (Mesoamerica)',
    location: 'Palace of Texcoco, Valley of Mexico',
    originalLanguage: 'Classical Nahuatl',
    mediumOrFormat: 'Poetic Royal Oration transcribed in Cantares Mexicanos',
    currentPreservationLocation: 'National Library of Mexico (Biblioteca Nacional de México), Mexico City',
    famousQuote: 'Truly do we live on earth? Not forever on earth, only a little while here! Even jade shatters, even gold breaks, even quetzal plumes tear apart. Not forever on earth, only a little while here.',
    summary: 'Nezahualcóyotl, the philosopher king and master engineer of the Aztec Triple Alliance who built the great dike of Tenochtitlan, reflects in the presence of his court on the ephemeral nature of earthly glory, rejecting human sacrifice in favor of the Unknown Supreme God (Tloque Nahuaque).',
    historicalContext: 'Nezahualcóyotl established a golden age of law, poetry, and botanical science in Texcoco. His legal code punished corruption by royal judges with death, and his poetry remains the pinnacle of pre-Columbian philosophy.',
    fullExcerptText: 'I, Nezahualcóyotl, ask this: Truly do we live on earth with roots? Not forever on earth, only a little while here! Even jade shatters, even gold is crushed, even the precious quetzal plumes tear asunder. Nothing here is permanent; we come only to dream, we come only to blossom like the flowers of spring! But let our hearts take joy in song and friendship, for the Giver of Life (Ipalnemohuani) has painted our days upon the book of time!',
    clauseTitle: 'The Ephemerality of Human Power and Value of Wisdom',
    originalClause: 'An nochipa tlalticpac: zan achica ye nican. Oc xiquitacan: tlacan tiyolque, tlacan timiquique.',
    modernClause: 'Not forever on earth, only a brief moment here: even the hardest jade shatters; let us live in virtue and wisdom while we breathe.',
    significance: 'The greatest surviving philosophical monument of pre-Columbian Mesoamerican civilization.',
    lastingImpact: 'Inscribed on the 100-peso Mexican banknote and celebrated throughout Latin American literature.',
    audioSpeechText: 'I, Nezahualcóyotl, ask this of my people: Do we truly live upon this earth forever? No, only for a little while! Even jade shatters, even pure gold breaks, even quetzal feathers tear apart. We are like spring flowers that blossom and fade. Therefore let us govern with justice and love, while our brief song remains!'
  },
  {
    id: 'americas_cuauhtemoc_surrender_speech',
    title: 'The Surrender of Tenochtitlan: "Take This Dagger and Kill Me"',
    originalTitle: 'Palabras de Cuauhtémoc al Capitán Cortés',
    authorOrRuler: 'Cuauhtémoc ("Descending Eagle")',
    authorTitle: 'Last Huey Tlatoani (Emperor) of the Aztec Empire',
    year: 1521,
    yearDisplay: 'August 13, 1521',
    era: 'Early Modern',
    category: 'Monumental Speeches',
    civilization: 'Aztec Empire (Mexica)',
    location: 'Tlatelolco, Tenochtitlan (Mexico City)',
    originalLanguage: 'Classical Nahuatl',
    mediumOrFormat: 'Oral Address upon capture recorded by Bernal Díaz del Castillo',
    currentPreservationLocation: 'Historia Verdadera de la Conquista de la Nueva España & Florentine Codex',
    famousQuote: 'Lord Malinche, I have done everything in my power to defend my kingdom and deliver my people. Take that dagger from your belt and kill me now, for my life is ended.',
    summary: 'Captured in a war canoe after an eighty-day brutal siege that reduced Tenochtitlan to ashes, 25-year-old Emperor Cuauhtémoc is brought before Hernán Cortés on a rooftop terrace in Tlatelolco, laying his hand on Cortés\'s dagger and offering his life with unbroken royal dignity.',
    historicalContext: 'Cuauhtémoc led a heroic defense against Spanish conquistadors and tens of thousands of indigenous allies. After smallpox devastated the population and food ran out, the Aztec capital fell on August 13, 1521.',
    fullExcerptText: 'Ah, Captain Malinche! I have done all that duty compelled me to do in defense of my city, my people, and my gods; but my efforts have failed, and I am brought before you as your prisoner. There is no shame in falling while fighting to the last breath. Put your hand to the dagger at your belt: strike me to the heart and end my life, as you have ended my empire!',
    clauseTitle: 'Supreme Royal Dignity in Catastrophic Defeat',
    originalClause: 'Señor Malinche, ya he hecho lo que soy obligado en defensa de mi ciudad... toma ese puñal y quítame la vida.',
    modernClause: 'Lord Malinche, I have done everything obligated of me to defend my city and my people; take that dagger and slay me.',
    significance: 'Marked the definitive end of the Aztec Empire and the birth of colonial New Spain.',
    lastingImpact: 'Cuauhtémoc is venerated as Mexico’s greatest national hero, embodying uncompromising resistance against foreign subjugation.',
    audioSpeechText: 'Captain Malinche! I have done everything in my power to defend my city, my gods, and my people from ruin. But fortune has turned, and I stand before you captive. Take the dagger from your belt and strike me dead, for my kingdom is gone and my life is complete!'
  },
  {
    id: 'americas_powhatan_peace_speech',
    title: 'Speech to Captain John Smith: "Why Should You Take by Force That Which You Can Have by Love?"',
    originalTitle: 'Wahunsenacawh\'s Address on War and Trade',
    authorOrRuler: 'Chief Powhatan (Wahunsenacawh)',
    authorTitle: 'Mamanatowick (Paramount Chief) of the Powhatan Confederacy',
    year: 1609,
    yearDisplay: 'January 1609',
    era: 'Early Modern',
    category: 'Monumental Speeches',
    civilization: 'Powhatan Confederacy (Tsenacommacah)',
    location: 'Werowocomoco, Virginia',
    originalLanguage: 'Powhatan (Eastern Algonquian language)',
    mediumOrFormat: 'Diplomatic Council Address recorded by Captain John Smith',
    currentPreservationLocation: 'The Generall Historie of Virginia, New-England, and the Summer Isles (1624)',
    famousQuote: 'Why should you take by force that from us which you can have by love? Why should you destroy us, who have provided you with food? What can you get by war?',
    summary: 'Paramount Chief Powhatan confronts English explorer Captain John Smith, delivering a profound rebuke to European militarism, asking why the settlers choose guns, paranoia, and famine when mutual trade and peaceful friendship would feed both nations.',
    historicalContext: 'During the starving times of the early Jamestown settlement, armed colonists repeatedly raided Powhatan storehouses for corn. Powhatan’s daughter Pocahontas famously intervened to foster peace.',
    fullExcerptText: 'Captain Smith, you may say that I intend to betray you. But I have seen two generations of my people die; I know the difference of peace and war better than any in my country. Why will you take by force what you may quietly have by love? Why will you destroy us who supply you with food? What can you get by war, when we can hide our provisions and fly to the woods? Then you must starve for wronging your friends! And what is the cause of your jealousy? You see us unarmed, and willing to give you that which you cannot otherwise get, but by our good will. Every year our friendly trade will yield you corn, furs, and meat. Lay aside your guns and swords, and let us live as brothers!',
    clauseTitle: 'The Superiority of Peaceful Commerce over Coercive Conquest',
    originalClause: 'Why will you take by force what you may have by love? Why will you destroy us who supply you with food?',
    modernClause: 'Why do you choose violent conquest over peaceful friendship, when mutual commerce provides abundance to both peoples?',
    significance: 'The earliest recorded philosophical plea by an Indigenous North American leader for coexistence with European settlers.',
    lastingImpact: 'A cornerstone text of early American contact literature and indigenous diplomacy.',
    audioSpeechText: 'Captain Smith, hear my words! I have seen two generations of my people pass away; I know the difference between peace and war. Why do you seek to take by force what you could have with love? Why will you destroy us who feed you? Lay down your weapons, and let our nations trade and live together as brothers!'
  },
  {
    id: 'americas_canassatego_lancaster_treaty',
    title: 'Address at the Treaty of Lancaster: Advice on Unity to the American Colonies',
    originalTitle: 'Canassatego\'s Address to the Commissioners of Virginia, Maryland, and Pennsylvania',
    authorOrRuler: 'Canassatego',
    authorTitle: 'Tadodaho / Speaker of the Onondaga Council, Haudenosaunee (Iroquois Confederacy)',
    year: 1744,
    yearDisplay: 'July 4, 1744',
    era: 'Early Modern',
    category: 'Treaties & Accords',
    civilization: 'Haudenosaunee (Iroquois Confederacy)',
    location: 'Lancaster Courthouse, Pennsylvania',
    originalLanguage: 'Onondaga (transcribed by Conrad Weiser)',
    mediumOrFormat: 'Treaty Council Oration with Wampum Belts',
    currentPreservationLocation: 'American Philosophical Society & Pennsylvania Colonial Records',
    famousQuote: 'Our wise forefathers established union and amity between the Five Nations. We are a powerful confederacy; and by observing the same methods our wise forefathers have taken, you will acquire fresh strength and power.',
    summary: 'Canassatego presents a wampum belt to the colonial commissioners from Virginia, Maryland, and Pennsylvania, explicitly urging the thirteen bickering British colonies to unite into a single confederacy modeled on the Great Law of Peace of the Haudenosaunee.',
    historicalContext: 'Benjamin Franklin was so impressed by Canassatego’s address that he published the Lancaster Treaty transcripts, used the bundled arrows metaphor, and drafted the 1754 Albany Plan of Union, which directly inspired the US Constitution.',
    fullExcerptText: 'We have one thing further to say, and that is: we heartily recommend union and a good agreement between you our brethren. Never disagree, but preserve a strict friendship for one another, and thereby you, as well as we, will become the stronger. Our wise forefathers established union and amity between the Five Nations. This has made us formidable; this has given us great weight and authority with our neighboring nations. We are a powerful confederacy; and by observing the same methods our wise forefathers have taken, you will acquire fresh strength and power. Therefore, whatever befalls you, never fall out with one another!',
    clauseTitle: 'The Federal Principle of the Bundled Arrows (Haudenosaunee Democracy)',
    originalClause: 'Our wise forefathers established union and amity between the Five Nations... by observing the same methods, you will acquire fresh strength.',
    modernClause: 'Our ancestors founded our confederacy upon unity and peace; if the colonies unite in the same way, you will become strong and unconquerable.',
    significance: 'Directly provided the institutional confederation model for Benjamin Franklin and the founders of the United States.',
    lastingImpact: 'Acknowledged by the United States Congress in 1988 (House Concurrent Resolution 331) for inspiring the US Constitution.',
    audioSpeechText: 'Brethren, we give you this advice: unite in close agreement, and never quarrel among yourselves! Our wise ancestors formed the union of the Five Nations, making us strong and respected. Follow the path of our elders, bind your colonies together into one confederacy, and no enemy will ever break you!'
  },
  {
    id: 'americas_tecumseh_choctaw_speech',
    title: 'Address to the Southern Nations: "Sleep No Longer, Unbroken We Stand!"',
    originalTitle: 'Tecumseh\'s Council Speech to the Choctaw and Chickasaw',
    authorOrRuler: 'Tecumseh ("Shooting Star")',
    authorTitle: 'Leader of the Shawnee, Founder of the Pan-Indian Confederacy',
    year: 1811,
    yearDisplay: 'October 1811',
    era: '19th Century',
    category: 'Monumental Speeches',
    civilization: 'Shawnee / Pan-Indian Confederacy',
    location: 'Near Brooksville, Mississippi',
    originalLanguage: 'Shawnee',
    mediumOrFormat: 'Council Fire Oration to Chiefs recorded by H.B. Cushman',
    currentPreservationLocation: 'Smithsonian National Museum of the American Indian',
    famousQuote: 'Sell a country! Why not sell the air, the great sea, as well as the earth? Did not the Great Spirit make them all for the use of his children?',
    summary: 'Traveling thousands of miles from the Great Lakes to the Gulf of Mexico on horseback, Tecumseh addresses thousands of Choctaw, Creek, and Chickasaw warriors, urging all indigenous tribes to put aside centuries of ancient rivalries to form a single united continental barrier against land theft.',
    historicalContext: 'Tecumseh and his brother Tenskwatawa ("The Prophet") built a grand pan-tribal alliance. Tecumseh rejected the concept of private land sales by corrupt chiefs, arguing the continent was communal property of all native peoples.',
    fullExcerptText: 'Sleep no longer, O Choctaws and Chickasaws! In vain the white men send you words of friendship; they come to push you from your fathers\' graves! Where today are the Pequot, the Narragansett, the Mohican, the Pokanoket, and other once powerful tribes of our race? They have vanished before the avarice of the white man like sun-vapor on the mountain! Will we let ourselves be destroyed in our turn without a struggle? Have we not courage? Are we women? We must be united; we must smoke the same pipe; we must fight each other\'s battles; and more than all, we must love the Great Spirit! A single twig breaks easily, but a bundle of twigs cannot be snapped by the strongest man!',
    clauseTitle: 'Communal Sacredness of Land and Pan-Indigenous Solidarity',
    originalClause: 'Sell a country! Why not sell the air, the great sea, as well as the earth? We must be united; a single twig snaps, but a bundle of twigs is unbroken.',
    modernClause: 'Land cannot be bought or sold any more than the air or the oceans; all tribes must unite as one bundle of twigs to protect our sacred inheritance.',
    significance: 'The supreme attempt at pan-indigenous unification in North American history.',
    lastingImpact: 'Tecumseh remains one of the most revered military and political figures in American and Canadian history.',
    audioSpeechText: 'Sleep no longer, brothers! The white men come to push us from the graves of our ancestors. Where are the proud tribes of the east today? They have vanished like morning mist! We must unite as one people from the Great Lakes to the southern seas. A single twig breaks with ease, but a bundle of twigs cannot be broken by any hand!'
  },
  {
    id: 'americas_chief_joseph_surrender',
    title: 'The Surrender at Bears Paw: "I Will Fight No More Forever"',
    originalTitle: 'Chief Joseph\'s Surrender Speech to General Howard and Colonel Miles',
    authorOrRuler: 'Chief Joseph (Hinmatóowyalahtq̓it / "Thunder Rolling Down the Mountain")',
    authorTitle: 'Chief of the Wal-lam-wat-kain (Wallowa) band of Nez Perce',
    year: 1877,
    yearDisplay: 'October 5, 1877',
    era: '19th Century',
    category: 'Monumental Speeches',
    civilization: 'Nez Perce Nation (Nimiipuu)',
    location: 'Bears Paw Mountains, Montana (40 miles from the Canadian border)',
    originalLanguage: 'Nez Perce (transcribed by Lieutenant Charles Erskine Scott Wood)',
    mediumOrFormat: 'Surrender Speech delivered on horseback holding his rifle',
    currentPreservationLocation: 'National Archives and Records Administration, Washington, D.C.',
    famousQuote: 'Hear me, my chiefs! I am tired of fighting. Our chiefs are killed... It is cold, and we have no blankets. The little children are freezing to death. Hear me, my chiefs! I am tired; my heart is sick and sad. From where the sun now stands, I will fight no more forever.',
    summary: 'After conducting a masterly 1,170-mile fighting retreat across four states while outmaneuvering ten separate US military commands, Chief Joseph surrenders just forty miles from freedom in Canada, delivering the most heartbreaking and eloquent surrender speech in American history.',
    historicalContext: 'The Nez Perce had sheltered Lewis and Clark in 1805 and never killed a white settler until forced off their ancestral homeland in Oregon\'s Wallowa Valley. Joseph chose surrender to prevent the women and children from freezing to death in the Montana blizzard.',
    fullExcerptText: 'Tell General Howard I know his heart. What he told me before, I have it in my heart. I am tired of fighting. Our chiefs are killed; Looking Glass is dead. Too-hul-hul-sote is dead. The old men are all dead. It is the young men who say yes or no. He who led on the young men is dead. It is cold, and we have no blankets; the little children are freezing to death. My people, some of them, have run away to the hills, and have no blankets, no food. No one knows where they are—perhaps freezing to death. I want to have time to look for my children, and see how many of them I can find. Maybe I shall find them among the dead. Hear me, my chiefs! I am tired; my heart is sick and sad. From where the sun now stands, I will fight no more forever!',
    clauseTitle: 'Sacrifice of Martial Resistance to Preserve Human Life',
    originalClause: 'Hear me, my chiefs! I am tired; my heart is sick and sad. From where the sun now stands, I will fight no more forever.',
    modernClause: 'Listen to me, my leaders: my heart is heavy with sorrow for my dying people. From this moment under the sun, I lay down my rifle forever.',
    significance: 'The definitive literary and moral eulogy for the Plains Indian Wars in North America.',
    lastingImpact: 'Ranked alongside Lincoln’s Gettysburg Address as one of the most poignant American speeches.',
    audioSpeechText: 'Hear me, my chiefs! I am tired of fighting. Our great chiefs are dead. The little children are freezing in the snow, and my people have no food and no blankets. My heart is sick and sad. Hear me, my chiefs: from where the sun now stands, I will fight no more forever!'
  }
];

export const SPEECHES_RULERS_AMERICAS_INDIGENOUS: PrimarySourceDocument[] = RAW_AMERICAS_INDIGENOUS_SPEECHES.map((item) => ({
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
