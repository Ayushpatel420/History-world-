export interface KeyClause {
  clauseNumberOrTitle: string;
  originalExcerpt: string;
  modernizedMeaning: string;
  historicalSignificance: string;
}

export interface PrimarySourceDocument {
  id: string;
  title: string;
  originalTitle?: string;
  authorOrRuler: string;
  authorTitle: string;
  year: number;
  yearDisplay: string;
  era: 'Antiquity' | 'Classical' | 'Medieval' | 'Early Modern' | '19th Century' | '20th Century' | 'Modern' | 'Contemporary';
  category: 'Charters & Constitutions' | 'Monumental Speeches' | 'Legal Codes & Edicts' | 'Human Rights & Declarations' | 'Peace Treaties' | 'Treaties & Accords' | 'Religious & Philosophical Texts';
  civilization: string;
  location: string;
  originalLanguage: string;
  mediumOrFormat: string;
  currentPreservationLocation: string;
  famousQuote: string;
  summary: string;
  historicalContext: string;
  fullExcerptText: string;
  keyClauses: KeyClause[];
  lastingImpact: string;
  audioSpeechText: string; // Text tailored for clear audio narration
}

export const FOUNDATIONAL_PRIMARY_SOURCES: PrimarySourceDocument[] = [
  {
    id: 'source_cyrus_cylinder',
    title: 'The Cyrus Cylinder',
    originalTitle: 'Kourosh Cylinder (Babylonian Edict)',
    authorOrRuler: 'Cyrus II the Great',
    authorTitle: 'King of Anshan, King of Media, King of Babylon, King of the Four Quarters of the World',
    year: -539,
    yearDisplay: '539 BC',
    era: 'Antiquity',
    category: 'Human Rights & Declarations',
    civilization: 'Achaemenid Persian Empire',
    location: 'Babylon (Modern Iraq)',
    originalLanguage: 'Akkadian (cuneiform script on baked clay)',
    mediumOrFormat: 'Baked clay barrel cylinder (22.5 cm length)',
    currentPreservationLocation: 'British Museum, London (Room 55)',
    famousQuote: 'I returned to their sacred cities across the Tigris the sanctuaries which had been in ruins for a long time... I gathered all their inhabitants and returned them to their habitations.',
    summary: 'A baked-clay foundation deposit inscribed following Cyrus the Great’s conquest of Babylon. Widely celebrated as the world’s first charter of human rights, religious freedom, and repatriation of displaced peoples, including the Jewish Babylonian captivity.',
    historicalContext: 'In 539 BC, the Persian army marched peacefully into Babylon, toppling King Nabonidus whose eccentric religious reforms had alienated priests and citizens. Cyrus issued this declaration not as a ruthless subjugator, but as a restorer of ancient shrines and liberator of enslaved nationalities.',
    fullExcerptText: `When I entered Babylon as a friend and established the seat of the government in the palace of the ruler under jubilation and rejoicing, Marduk, the great lord, guided the noble inhabitants of Babylon towards me... My numerous troops walked through Babylon in peace, and I did not allow any terrorizer of Sumer and Akkad to arise. I kept in view the needs of Babylon and all its sanctuaries to promote their well-being. The citizens of Babylon, whom Nabonidus had compelled to bear a yoke not suited to them, I released from their servitude and made them whole.

From Babylon to Aššur and Susa, Agade, Ešnunna, the cities of Zamban, Me-Turnu and Der as far as the border of the land of Guti, the sanctuaries on the other side of the Tigris whose shrines had in ruins for a long time, the gods who lived therein I returned to their proper places and made for them permanent sanctuaries. I collected together all their peoples and returned them to their ancestral settlements.`,
    keyClauses: [
      {
        clauseNumberOrTitle: 'Repatriation of Captive Peoples',
        originalExcerpt: 'I gathered all their inhabitants and returned to them their dwellings.',
        modernizedMeaning: 'All forcibly displaced populations living as state captives in Babylon were permitted to return to their native homelands.',
        historicalSignificance: 'Formally ended the 70-year Babylonian Exile of the Jewish people, chronicled in the Biblical Books of Ezra and Isaiah, funding the rebuilding of the Second Temple in Jerusalem.'
      },
      {
        clauseNumberOrTitle: 'Universal Freedom of Worship',
        originalExcerpt: 'The gods who dwelt there I returned to their places and made for them eternal abodes.',
        modernizedMeaning: 'Restored local deities, temples, and religious traditions rather than imposing the conqueror’s Persian Zoroastrian faith.',
        historicalSignificance: 'Pioneered imperial federalism where local customs were respected under Persian administrative satrapies rather than crushed.'
      },
      {
        clauseNumberOrTitle: 'Abolition of Uncompensated Corvée Labor',
        originalExcerpt: 'I freed them from their bonds and soothed their weariness.',
        modernizedMeaning: 'Eliminated arbitrary forced slave labor imposed on Babylonians by previous dynasties.',
        historicalSignificance: 'Established civic protections and labor dignity as pillars of imperial governance.'
      }
    ],
    lastingImpact: 'A replica is prominently displayed at the United Nations Headquarters in New York City as an immortal symbol of human tolerance, minority protection, and the right of return.',
    audioSpeechText: 'I am Cyrus, king of the world, great king, legitimate king, king of Babylon, king of Sumer and Akkad, king of the four rims of the earth. When I entered Babylon in peace, I established the seat of government amid jubilation. My troops marched without causing fear. I liberated the citizens from forced labor and returned all displaced nations to their ancestral sanctuaries.'
  },
  {
    id: 'source_code_hammurabi',
    title: 'The Code of Hammurabi',
    originalTitle: 'Codex Hammurabi (Laws of the King of Justice)',
    authorOrRuler: 'Hammurabi of Babylon',
    authorTitle: 'The Pious Prince, Guardian of the Weak, King of Babylon',
    year: -1754,
    yearDisplay: '1754 BC',
    era: 'Antiquity',
    category: 'Legal Codes & Edicts',
    civilization: 'Old Babylonian Empire',
    location: 'Sippar / Babylon (Discovered at Susa, Elam)',
    originalLanguage: 'Akkadian (cuneiform script on black basalt stele)',
    mediumOrFormat: 'Diorite/Basalt stele (2.25 meters tall, 4 tons)',
    currentPreservationLocation: 'Musée du Louvre, Paris',
    famousQuote: 'That the strong might not injure the weak, in order to protect the widows and orphans, I have set up these my precious words...',
    summary: 'One of the oldest and most complete deciphered legal codes in human history. Composed of 282 statutes covering contracts, property rights, family law, medical malpractice, and criminal punishments based on reciprocal justice ("Lex Talionis").',
    historicalContext: 'Hammurabi consolidated warring Mesopotamian city-states into an empire. To standardize justice across diverse peoples and prevent local judges from taking arbitrary bribes, he had this monumental code carved onto stone pillars erected in public temple plazas.',
    fullExcerptText: `When the lofty Anu, king of the Anunnaki, and Bel, master of heaven and earth, committed the rule of all mankind to Marduk, they called me, Hammurabi, the exalted prince, who feared God, to bring about the rule of righteousness in the land, to destroy the wicked and the evil-doers, so that the strong should not harm the weak; so that I should rule over the black-headed people like Shamash, and enlighten the land, to further the well-being of mankind.

Hammurabi, the shepherd, called by Bel, am I, who gathered together the scattered inhabitants of Babylon; who made abundant water for its inhabitants; who set up right and justice in the language of the land.`,
    keyClauses: [
      {
        clauseNumberOrTitle: 'Law 1: The Presumption of Innocence',
        originalExcerpt: 'If a man bring an accusation against a man, and charge him with a capital crime, but cannot prove it, he, the accuser, shall be put to death.',
        modernizedMeaning: 'Anyone who accuses another of a crime must bear the burden of proof. False witness is severely penalized.',
        historicalSignificance: 'The earliest codified ancestor of evidentiary burden of proof and penalties for perjured prosecution.'
      },
      {
        clauseNumberOrTitle: 'Law 196: Lex Talionis (Eye for an Eye)',
        originalExcerpt: 'If a man put out the eye of another man, his eye shall be put out.',
        modernizedMeaning: 'Proportional retributive punishment; the penalty must mathematically match the physical harm inflicted.',
        historicalSignificance: 'Curbed unending tribal blood feuds by capping retribution strictly to the exact injury sustained.'
      },
      {
        clauseNumberOrTitle: 'Law 218: Professional Malpractice Liability',
        originalExcerpt: 'If a physician make a large incision with an operating knife and kill the patient, his hands shall be cut off.',
        modernizedMeaning: 'Surgeons and builders were held directly responsible for criminal negligence or catastrophic technical errors.',
        historicalSignificance: 'Established legal accountability for licensed professions, architect building safety, and medical care.'
      }
    ],
    lastingImpact: 'Established the revolutionary doctrine that law is public, unalterable by arbitrary royal whim, and engraved in stone so ordinary citizens can inspect their rights.',
    audioSpeechText: 'Anu and Bel called me, Hammurabi, to bring about the rule of righteousness in the land, to destroy the wicked and the evil-doers, that the strong may not harm the weak. Let any oppressed man who has a lawsuit come before my image as king of justice, and let him read my stele and understand his rights.'
  },
  {
    id: 'source_pericles_funeral',
    title: "Pericles' Funeral Oration",
    originalTitle: 'Epitaphios Logos (Thucydides, History of the Peloponnesian War)',
    authorOrRuler: 'Pericles',
    authorTitle: 'Strategos (General) and Leader of Classical Democratic Athens',
    year: -431,
    yearDisplay: '431 BC',
    era: 'Classical',
    category: 'Monumental Speeches',
    civilization: 'Classical Athens',
    location: 'Kerameikos Cemetery, Athens',
    originalLanguage: 'Ancient Greek (Attic dialect, recorded by Thucydides)',
    mediumOrFormat: 'Public civic funeral oration',
    currentPreservationLocation: 'Recorded in Thucydides Book 2, 34–46',
    famousQuote: 'Our constitution is called a democracy because power is in the hands not of a minority but of the whole people.',
    summary: 'The defining speech of Western democratic ideals. Delivered by Pericles to honor Athens’s war dead, it transformed a customary funeral eulogy into an immortal defense of open society, civic participation, free debate, and intellectual excellence.',
    historicalContext: 'At the close of the first year of the devastating Peloponnesian War against oligarchic Sparta, Athenian citizens gathered to bury fallen warriors. Pericles used the moment to explain why the Athenian way of life was worth fighting and dying for.',
    fullExcerptText: `Our constitution does not copy the laws of neighboring states; we are rather a pattern to others than imitators ourselves. Its administration favors the many instead of the few; this is why it is called a democracy. If we look to the laws, they afford equal justice to all in their private differences; if to social standing, advancement in public life falls to reputation for capacity, class considerations not being allowed to interfere with merit; nor again does poverty bar the way, if a man is able to serve the state, he is not hindered by the obscurity of his condition.

The freedom which we enjoy in our government extends also to our ordinary life. There, far from exercising a jealous surveillance over each other, we do not feel called upon to be angry with our neighbor for doing what he likes... But all this ease in our private relations does not make us lawless as citizens. Against this fear is our chief safeguard, teaching us to obey the magistrates and the laws.`,
    keyClauses: [
      {
        clauseNumberOrTitle: 'Equal Justice Under Law (Isonomia)',
        originalExcerpt: 'If we look to the laws, they afford equal justice to all in their private differences.',
        modernizedMeaning: 'All citizens, rich or poor, stand on equal footing before the legal courts.',
        historicalSignificance: 'Established the principle of legal equality that remains the bedrock of constitutional democracies.'
      },
      {
        clauseNumberOrTitle: 'Meritocracy Over Aristocracy',
        originalExcerpt: 'Nor again does poverty bar the way, if a man is able to serve the state, he is not hindered by the obscurity of his condition.',
        modernizedMeaning: 'Public office and leadership should be awarded according to virtue and talent, not noble birth or dynastic inheritance.',
        historicalSignificance: 'Challenged the worldwide norm of hereditary aristocracy, opening public administration to common citizens.'
      },
      {
        clauseNumberOrTitle: 'Civic Duty and the "Idion"',
        originalExcerpt: 'We do not say that a man who takes no interest in politics is a man who minds his own business; we say that he has no business here at all.',
        modernizedMeaning: 'A person who refuses to participate in public life is not peaceful; they are useless to a democratic community.',
        historicalSignificance: 'The conceptual origin of civic responsibility and voting obligations.'
      }
    ],
    lastingImpact: 'Directly influenced the rhetoric of the American Founding Fathers and Abraham Lincoln’s Gettysburg Address, which echoed Pericles’ rhythmic dedication of fallen warriors.',
    audioSpeechText: 'Our constitution is called a democracy because power is in the hands not of a minority but of the whole people. When it is a question of putting one person before another in positions of public responsibility, what counts is not membership of a particular class, but the actual ability which the man possesses. We regard a person who takes no part in civic affairs not as unambitious, but as useless.'
  },
  {
    id: 'source_magna_carta',
    title: 'Magna Carta Libertatum',
    originalTitle: 'The Great Charter of the Liberties of England',
    authorOrRuler: 'Barons of England & King John',
    authorTitle: 'Rebel English Barons and the Crown of England',
    year: 1215,
    yearDisplay: '1215 AD',
    era: 'Medieval',
    category: 'Charters & Constitutions',
    civilization: 'Medieval Kingdom of England',
    location: 'Runnymede meadow near Windsor, England',
    originalLanguage: 'Medieval Latin on animal vellum',
    mediumOrFormat: 'Ink on sheepskin parchment with Great Seal of King John',
    currentPreservationLocation: 'British Library (London), Lincoln Cathedral, Salisbury Cathedral',
    famousQuote: 'To no one will we sell, to no one deny or delay right or justice.',
    summary: 'The foundation of modern constitutional law and civil liberty. Forced upon King John by rebellious feudal barons, it codified for the first time in European history that even the absolute monarch is subject to the rule of law.',
    historicalContext: 'King John’s disastrous military failures in Normandy, arbitrary seizure of baron lands, extortionate taxation, and clashes with Pope Innocent III caused English nobles to rebel and occupy London in spring 1215, compelling John to seal this charter at Runnymede.',
    fullExcerptText: `John, by the grace of God King of England, Lord of Ireland, Duke of Normandy and Aquitaine, and Count of Anjou, to his archbishops, bishops, abbots, earls, barons, justiciars, foresters, sheriffs, and all his faithful subjects, greeting...

39. No free man shall be seized or imprisoned, or stripped of his rights or possessions, or outlawed or exiled, or deprived of his standing in any other way, nor will we proceed with force against him, or send others to do so, except by the lawful judgment of his equals or by the law of the land.

40. To no one will we sell, to no one deny or delay right or justice.

61. Since, for God, and for the amendment of our kingdom, we have granted all these things... we give and grant to the barons the following security: namely that the barons shall choose twenty-five barons of the kingdom, who shall observe, keep, and cause to be observed with all their might, the peace and liberties granted to them.`,
    keyClauses: [
      {
        clauseNumberOrTitle: 'Clause 39: Due Process & Trial by Peers',
        originalExcerpt: 'No free man shall be seized or imprisoned... except by the lawful judgment of his equals or by the law of the land.',
        modernizedMeaning: 'The sovereign cannot arbitrarily throw citizens into prison without fair trial and jury judgment.',
        historicalSignificance: 'The direct forefather of Habeas Corpus, the US Constitution’s 5th and 14th Amendments, and Article 9 of the Universal Declaration of Human Rights.'
      },
      {
        clauseNumberOrTitle: 'Clause 40: Incorruptible and Speedy Justice',
        originalExcerpt: 'To no one will we sell, to no one deny or delay right or justice.',
        modernizedMeaning: 'Judges may not take bribes, court access cannot be restricted to the wealthy, and cases must not be indefinitely stalled.',
        historicalSignificance: 'Eliminated venal royal justice where wealthy lords could purchase favorable verdicts.'
      },
      {
        clauseNumberOrTitle: 'Clause 12: No Taxation Without Consent',
        originalExcerpt: 'No scutage or aid shall be imposed in our kingdom except by the common council of our kingdom.',
        modernizedMeaning: 'The King cannot levy taxes without the approval of the national assembly of nobles.',
        historicalSignificance: 'Laid the institutional foundation of the English Parliament and the battle cry of the American Revolution.'
      }
    ],
    lastingImpact: 'Transformed sovereignty worldwide from arbitrary divine absolutism into constitutional monarchy, providing the structural foundation for the British unwritten constitution and the American Bill of Rights.',
    audioSpeechText: 'No free man shall be seized or imprisoned, or stripped of his rights or possessions, or outlawed or exiled, nor will we proceed with force against him, except by the lawful judgment of his equals or by the law of the land. To no one will we sell, to no one deny or delay right or justice.'
  },
  {
    id: 'source_rights_of_man',
    title: 'Declaration of the Rights of Man and of the Citizen',
    originalTitle: 'Déclaration des droits de l’homme et du citoyen',
    authorOrRuler: 'National Constituent Assembly (Marquis de Lafayette & Thomas Jefferson)',
    authorTitle: 'National Assembly of Revolutionary France',
    year: 1789,
    yearDisplay: '1789 AD',
    era: 'Early Modern',
    category: 'Human Rights & Declarations',
    civilization: 'Revolutionary France',
    location: 'Paris, France',
    originalLanguage: 'French',
    mediumOrFormat: 'Parchment decree & public painted placards',
    currentPreservationLocation: 'Archives Nationales, Paris',
    famousQuote: 'Men are born and remain free and equal in rights. Social distinctions can be founded only on the common good.',
    summary: 'The revolutionary manifesto that dismantled the feudal Ancien Régime of France. Influenced heavily by the Enlightenment and Thomas Jefferson, it proclaimed that all human beings are born free, equal in rights, and endowed with natural liberties that governments exist solely to protect.',
    historicalContext: 'Following the storming of the Bastille in July 1789, the newly formed National Assembly abolished the feudal system and clerical privileges on the night of August 4. To replace the ancient order, they drafted 17 articles detailing universal human rights.',
    fullExcerptText: `The representatives of the French people, organized as a National Assembly, believing that the ignorance, neglect, or contempt of the rights of man are the sole cause of public calamities and of the corruption of governments, have determined to set forth in a solemn declaration the natural, unalienable, and sacred rights of man...

Article 1. Men are born and remain free and equal in rights. Social distinctions may be based only on common utility.

Article 2. The aim of all political association is the preservation of the natural and imprescriptible rights of man. These rights are liberty, property, security, and resistance to oppression.

Article 3. The principle of all sovereignty resides essentially in the nation. No body nor individual may exercise any authority which does not proceed directly from the nation.

Article 4. Liberty consists in the freedom to do everything which injures no one else...

Article 11. The free communication of ideas and of opinions is one of the most precious rights of man. Every citizen may, accordingly, speak, write, and print with freedom.`,
    keyClauses: [
      {
        clauseNumberOrTitle: 'Article 1: Natural Equality at Birth',
        originalExcerpt: 'Men are born and remain free and equal in rights.',
        modernizedMeaning: 'Nobody is born superior due to royal blood, noble title, or inherited privilege.',
        historicalSignificance: 'Abolished aristocratic hereditary titles, legal castes, and serfdom across France.'
      },
      {
        clauseNumberOrTitle: 'Article 3: Popular Sovereignty',
        originalExcerpt: 'The principle of all sovereignty resides essentially in the nation.',
        modernizedMeaning: 'Legitimate state power comes from the collective citizens, not from God or an absolute king.',
        historicalSignificance: 'Overthrew the Divine Right of Kings, establishing democratic republic legitimacy.'
      },
      {
        clauseNumberOrTitle: 'Article 11: Free Speech and Press',
        originalExcerpt: 'The free communication of ideas and opinions is one of the most precious of the rights of man.',
        modernizedMeaning: 'All citizens have the inalienable right to speak, publish, and debate ideas without government censorship.',
        historicalSignificance: 'Catalyzed modern journalism, investigative reporting, and public intellectual debate.'
      }
    ],
    lastingImpact: 'Formed the preamble of the French Constitution and directly inspired independence and human rights revolutions across Latin America, Europe, and Asia throughout the 19th and 20th centuries.',
    audioSpeechText: 'Men are born and remain free and equal in rights. The aim of all political association is the preservation of the natural and inalienable rights of man: liberty, property, security, and resistance to oppression. The source of all sovereignty resides in the nation.'
  },
  {
    id: 'source_gettysburg_address',
    title: 'The Gettysburg Address',
    originalTitle: 'Address at the Dedication of the Soldiers’ National Cemetery',
    authorOrRuler: 'Abraham Lincoln',
    authorTitle: '16th President of the United States',
    year: 1863,
    yearDisplay: 'November 19, 1863',
    era: '19th Century',
    category: 'Monumental Speeches',
    civilization: 'United States of America',
    location: 'Soldiers’ National Cemetery, Gettysburg, Pennsylvania',
    originalLanguage: 'English',
    mediumOrFormat: 'Handwritten address delivered in just 272 words (under 3 minutes)',
    currentPreservationLocation: 'Library of Congress, Washington, D.C. (Bliss Copy in the Lincoln Bedroom of the White House)',
    famousQuote: '...that government of the people, by the people, for the people, shall not perish from the earth.',
    summary: 'A 272-word masterpiece of oratorical precision. Delivered four months after the bloody Battle of Gettysburg, Lincoln redefined the American Civil War not merely as a fight to preserve a constitutional union, but as a moral crusade for universal human equality and democratic self-governance.',
    historicalContext: 'Over 50,000 soldiers fell killed, wounded, or captured at Gettysburg in July 1863. At the battlefield cemetery dedication, famed orator Edward Everett spoke for two hours. Lincoln then stepped forward and delivered this immortal three-minute address.',
    fullExcerptText: `Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.

Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.

But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here.

It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth.`,
    keyClauses: [
      {
        clauseNumberOrTitle: 'Opening: All Men Created Equal as Founding Ideal',
        originalExcerpt: 'Conceived in Liberty, and dedicated to the proposition that all men are created equal.',
        modernizedMeaning: 'Anchors the American nation’s true birth not in the 1787 legal Constitution, but in the 1776 moral premise of equality.',
        historicalSignificance: 'Elevated anti-slavery equality to the supreme moral criterion of the republic.'
      },
      {
        clauseNumberOrTitle: 'The New Birth of Freedom',
        originalExcerpt: 'That this nation, under God, shall have a new birth of freedom.',
        modernizedMeaning: 'The abolition of chattel slavery will rebirth the nation into true, authentic liberty.',
        historicalSignificance: 'Connected the Civil War directly to the Emancipation Proclamation.'
      },
      {
        clauseNumberOrTitle: 'Tripartite Democratic Compact',
        originalExcerpt: 'Government of the people, by the people, for the people, shall not perish from the earth.',
        modernizedMeaning: 'Democracy is of the whole citizenry, administered through their chosen representatives, solely for the common welfare.',
        historicalSignificance: 'The most quoted sentence defining democratic legitimacy across all languages and continents.'
      }
    ],
    lastingImpact: 'Carved into the southern interior wall of the Lincoln Memorial in Washington, D.C., and revered globally as the supreme definition of democratic governance.',
    audioSpeechText: 'Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty and dedicated to the proposition that all men are created equal. We resolve that these dead shall not have died in vain; that this nation shall have a new birth of freedom; and that government of the people, by the people, for the people, shall not perish from the earth.'
  },
  {
    id: 'source_churchill_blood_toil',
    title: '"Blood, Toil, Tears and Sweat"',
    originalTitle: 'First Speech as Prime Minister to the House of Commons',
    authorOrRuler: 'Winston Churchill',
    authorTitle: 'Prime Minister of the United Kingdom',
    year: 1940,
    yearDisplay: 'May 13, 1940',
    era: '20th Century',
    category: 'Monumental Speeches',
    civilization: 'British Empire / Free World',
    location: 'House of Commons, Palace of Westminster, London',
    originalLanguage: 'English',
    mediumOrFormat: 'Parliamentary maiden address as Prime Minister',
    currentPreservationLocation: 'Hansard Parliamentary Archives, London',
    famousQuote: 'I have nothing to offer but blood, toil, tears and sweat.',
    summary: 'Churchill’s first address to Parliament after becoming Prime Minister during the catastrophic opening days of the Nazi invasion of France and the Low Countries. It unified a divided British political establishment and galvanized national defiance with ruthless candor.',
    historicalContext: 'On May 10, 1940, Hitler launched the Blitzkrieg against France, Belgium, and the Netherlands. Prime Minister Neville Chamberlain resigned, and King George VI summoned Churchill to form a coalition government. Three days later, Churchill addressed a skeptical House of Commons.',
    fullExcerptText: `I would say to the House, as I said to those who have joined this government: 'I have nothing to offer but blood, toil, tears and sweat.'

We have before us an ordeal of the most grievous kind. We have before us many, many long months of struggle and of suffering. You ask, what is our policy? I will say: It is to wage war, by sea, land and air, with all our might and with all the strength that God can give us; to wage war against a monstrous tyranny, never surpassed in the dark, lamentable catalogue of human crime. That is our policy.

You ask, what is our aim? I can answer in one word: It is victory, victory at all costs, victory in spite of all terror, victory, however long and hard the road may be; for without victory, there is no survival. Let that be realized; no survival for the British Empire, no survival for all that the British Empire has stood for, no survival for the urge and impulse of the ages, that mankind will move forward towards its goal.

But I take up my task with buoyancy and hope. I feel sure that our cause will not be suffered to fail among men. At this time I feel entitled to claim the aid of all, and I say, 'Come then, let us go forward together with our united strength.'`,
    keyClauses: [
      {
        clauseNumberOrTitle: 'Radical Candor: Blood, Toil, Tears and Sweat',
        originalExcerpt: 'I have nothing to offer but blood, toil, tears and sweat.',
        modernizedMeaning: 'Refused to offer false assurances of quick or easy peace; promised only brutal sacrifice.',
        historicalSignificance: 'Ended the era of British appeasement with utter moral realism.'
      },
      {
        clauseNumberOrTitle: 'Absolute War Policy Against Tyranny',
        originalExcerpt: 'To wage war against a monstrous tyranny, never surpassed in the dark, lamentable catalogue of human crime.',
        modernizedMeaning: 'Framed Nazism not as an ordinary national rival, but as an existential moral crime against human civilization.',
        historicalSignificance: 'Barred any surrender or negotiated compromise treaty with Adolf Hitler.'
      },
      {
        clauseNumberOrTitle: 'The Necessity of Victory',
        originalExcerpt: 'Victory at all costs, victory in spite of all terror... for without victory, there is no survival.',
        modernizedMeaning: 'Defeat would result in the physical extermination of freedom and human progress.',
        historicalSignificance: 'United Labor, Liberal, and Conservative parties into an unbroken wartime coalition.'
      }
    ],
    lastingImpact: 'Rallied the British public through the Blitz and Dunkirk evacuation, demonstrating how transparent moral leadership can alter the outcome of world conflicts.',
    audioSpeechText: 'I have nothing to offer but blood, toil, tears and sweat. We have before us many long months of struggle and suffering. You ask, what is our policy? It is to wage war with all our might against a monstrous tyranny. You ask, what is our aim? I can answer in one word: victory! Victory at all costs, victory in spite of all terror, for without victory there is no survival.'
  },
  {
    id: 'source_tryst_with_destiny',
    title: '"Tryst with Destiny"',
    originalTitle: 'Speech to the Indian Constituent Assembly on the Eve of Independence',
    authorOrRuler: 'Jawaharlal Nehru',
    authorTitle: 'First Prime Minister of Independent India',
    year: 1947,
    yearDisplay: 'August 14–15, 1947',
    era: '20th Century',
    category: 'Monumental Speeches',
    civilization: 'Republic of India',
    location: 'Constituent Assembly, Parliament House, New Delhi',
    originalLanguage: 'English',
    mediumOrFormat: 'Midnight address on national radio and assembly floor',
    currentPreservationLocation: 'Parliament Archives, New Delhi, India',
    famousQuote: 'At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom.',
    summary: 'Delivered at midnight on August 14, 1947, as India awoke to independence after two centuries of British imperial rule. Celebrated as one of the greatest speeches of the 20th century, capturing the ecstasy of freedom alongside the solemn responsibility of building the world’s largest democracy.',
    historicalContext: 'Midnight marked the formal transfer of power from the British Empire to the sovereign Dominion of India, ending centuries of colonial exploitation. The triumph was tempered by the tragedy of Partition, which displaced millions.',
    fullExcerptText: `Long years ago we made a tryst with destiny, and now the time comes when we shall redeem our pledge, not wholly or in full measure, but very substantially. At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom. A moment comes, which comes but rarely in history, when we step out from the old to the new, when an age ends, and when the soul of a nation, long suppressed, finds utterance. It is fitting that at this solemn moment we take the pledge of dedication to the service of India and her people and to the still larger cause of humanity.

At the dawn of history India started on her unending quest, and trackless centuries are filled with her striving and the grandeur of her success and her failures. Through good and ill fortune alike she has never lost sight of that quest or forgotten the ideals which gave her strength. We end today a period of ill fortune and India discovers herself again.

The ambition of the greatest man of our generation has been to wipe every tear from every eye. That may be beyond us, but as long as there are tears and suffering, so long our work will not be over.`,
    keyClauses: [
      {
        clauseNumberOrTitle: 'The Tryst with Destiny',
        originalExcerpt: 'Long years ago we made a tryst with destiny, and now the time comes when we shall redeem our pledge.',
        modernizedMeaning: 'The decades of nonviolent struggle led by Gandhi and the freedom movement are reaching their rightful fulfillment.',
        historicalSignificance: 'Symbolized the moral triumph of nonviolent decolonization.'
      },
      {
        clauseNumberOrTitle: 'The Awakening of the Suppressed Soul',
        originalExcerpt: 'When an age ends, and when the soul of a nation, long suppressed, finds utterance.',
        modernizedMeaning: 'Reclaimed cultural identity, sovereignty, and international dignity from imperial subjugation.',
        historicalSignificance: 'Sparked the global wave of Asian and African decolonization across the British, French, and Dutch empires.'
      },
      {
        clauseNumberOrTitle: 'The Humanitarian Mission: Wiping Every Tear',
        originalExcerpt: 'The ambition of the greatest man of our generation has been to wipe every tear from every eye.',
        modernizedMeaning: 'Referencing Mahatma Gandhi, Nehru pledged that independence is meaningless unless it eradicates poverty and disease.',
        historicalSignificance: 'Framed the Indian democratic project around social justice, secularism, and poverty alleviation.'
      }
    ],
    lastingImpact: 'Inaugurated modern India as a secular democratic republic, charting a path of non-alignment during the Cold War and inspiring anti-colonial movements across Africa and Asia.',
    audioSpeechText: 'Long years ago we made a tryst with destiny, and now the time comes when we shall redeem our pledge. At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom. A moment comes, which comes but rarely in history, when we step out from the old to the new, when an age ends, and when the soul of a nation, long suppressed, finds utterance.'
  },
  {
    id: 'source_i_have_a_dream',
    title: '"I Have a Dream"',
    originalTitle: 'Address at the March on Washington for Jobs and Freedom',
    authorOrRuler: 'Dr. Martin Luther King Jr.',
    authorTitle: 'Civil Rights Leader, Baptist Minister, Nobel Peace Laureate',
    year: 1963,
    yearDisplay: 'August 28, 1963',
    era: '20th Century',
    category: 'Monumental Speeches',
    civilization: 'United States of America / Global Civil Rights',
    location: 'Lincoln Memorial steps, Washington, D.C.',
    originalLanguage: 'English',
    mediumOrFormat: 'Public rally speech to 250,000 marchers and live television audience',
    currentPreservationLocation: 'Audio/Video Archives at the Library of Congress and King Center, Atlanta',
    famousQuote: 'I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.',
    summary: 'The defining speech of the American Civil Rights Movement. Delivered from the steps of the Lincoln Memorial to 250,000 civil rights demonstrators, King passionately demanded the fulfillment of America’s founding promises of freedom, racial equality, and economic justice.',
    historicalContext: 'Despite the Emancipation Proclamation a century earlier, segregation, disenfranchisement, and violence plagued Black Americans in the Jim Crow South. The March on Washington mobilized international pressure to enact sweeping civil rights legislation.',
    fullExcerptText: `Five score years ago, a great American, in whose symbolic shadow we stand today, signed the Emancipation Proclamation. This momentous decree came as a great beacon light of hope to millions of Negro slaves who had been seared in the flames of withering injustice. But 100 years later, the Negro still is not free...

In a sense we've come to our nation's capital to cash a check. When the architects of our republic wrote the magnificent words of the Constitution and the Declaration of Independence, they were signing a promissory note to which every American was to fall heir... Instead of honoring this sacred obligation, America has given the Negro people a bad check, a check which has come back marked 'insufficient funds.' But we refuse to believe that the bank of justice is bankrupt!

I say to you today, my friends, though, even though we face the difficulties of today and tomorrow, I still have a dream. It is a dream deeply rooted in the American dream. I have a dream that one day this nation will rise up and live out the true meaning of its creed: 'We hold these truths to be self-evident, that all men are created equal.'

I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. I have a dream today!`,
    keyClauses: [
      {
        clauseNumberOrTitle: 'The Promissory Note & Bad Check Metaphor',
        originalExcerpt: 'They were signing a promissory note to which every American was to fall heir... America has given the Negro people a bad check.',
        modernizedMeaning: 'Civil rights are not a special favor; they are a legal debt owed to Black citizens by the American Constitution.',
        historicalSignificance: 'Shifted the civil rights argument from charitable pleas to structural constitutional obligations.'
      },
      {
        clauseNumberOrTitle: 'Content of Character Over Skin Color',
        originalExcerpt: 'Judged by the content of their character, not by the color of their skin.',
        modernizedMeaning: 'Human beings must be evaluated solely on their personal integrity, actions, and virtues, rather than racial ancestry.',
        historicalSignificance: 'The universal moral touchstone of anti-racist philosophy worldwide.'
      },
      {
        clauseNumberOrTitle: 'Let Freedom Ring Across All Peoples',
        originalExcerpt: 'Free at last! Free at last! Thank God Almighty, we are free at last!',
        modernizedMeaning: 'True freedom encompasses all faiths, ethnicities, and denominations in mutual brotherhood.',
        historicalSignificance: 'Directly facilitated the passage of the Civil Rights Act of 1964 and Voting Rights Act of 1965.'
      }
    ],
    lastingImpact: 'Propelled the passage of the Civil Rights Act of 1964, earned Dr. King the Nobel Peace Prize, and became the global anthem for human rights and racial equality.',
    audioSpeechText: 'I say to you today, my friends, that even though we face the difficulties of today and tomorrow, I still have a dream. It is a dream deeply rooted in the American dream. I have a dream that one day this nation will rise up and live out the true meaning of its creed: We hold these truths to be self-evident, that all men are created equal. I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin, but by the content of their character.'
  },
  {
    id: 'source_universal_declaration',
    title: 'Universal Declaration of Human Rights',
    originalTitle: 'UDHR (United Nations General Assembly Resolution 217 A)',
    authorOrRuler: 'UN Drafting Committee (Chaired by Eleanor Roosevelt)',
    authorTitle: 'United Nations Commission on Human Rights',
    year: 1948,
    yearDisplay: 'December 10, 1948',
    era: '20th Century',
    category: 'Human Rights & Declarations',
    civilization: 'Global / United Nations',
    location: 'Palais de Chaillot, Paris, France',
    originalLanguage: 'English and French (official translations in over 500 languages)',
    mediumOrFormat: 'General Assembly resolution document (30 Articles)',
    currentPreservationLocation: 'United Nations Archives, New York & Geneva',
    famousQuote: 'All human beings are born free and equal in dignity and rights.',
    summary: 'The most translated document on earth. Adopted in the shadow of the Holocaust and World War II, its 30 articles define the fundamental human rights that must be universally protected for all people in all nations without distinction.',
    historicalContext: 'The horrors of Nazi death camps and Axis atrocities during World War II exposed that national governments could murder their own citizens with legal impunity unless bound by universal global standards. Eleanor Roosevelt led an international committee spanning China, Lebanon, France, and Chile to draft this Magna Carta for all humanity.',
    fullExcerptText: `Whereas recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world...

Article 1. All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.

Article 2. Everyone is entitled to all the rights and freedoms set forth in this Declaration, without distinction of any kind, such as race, colour, sex, language, religion, political or other opinion, national or social origin, property, birth or other status.

Article 3. Everyone has the right to life, liberty and security of person.

Article 4. No one shall be held in slavery or servitude; slavery and the slave trade shall be prohibited in all their forms.

Article 5. No one shall be subjected to torture or to cruel, inhuman or degrading treatment or punishment.

Article 18. Everyone has the right to freedom of thought, conscience and religion...`,
    keyClauses: [
      {
        clauseNumberOrTitle: 'Article 1: Inherent Dignity of All Humans',
        originalExcerpt: 'All human beings are born free and equal in dignity and rights.',
        modernizedMeaning: 'Human rights are not granted by governments; they belong inherently to every person simply by virtue of being human.',
        historicalSignificance: 'Shifted international law from state sovereignty to individual human dignity.'
      },
      {
        clauseNumberOrTitle: 'Article 4 & 5: Universal Ban on Slavery and Torture',
        originalExcerpt: 'No one shall be held in slavery or servitude... No one shall be subjected to torture.',
        modernizedMeaning: 'Zero tolerance for chattel slavery, human trafficking, or cruel and unusual state punishments.',
        historicalSignificance: 'Established non-derogable international human rights norms.'
      },
      {
        clauseNumberOrTitle: 'Article 18: Freedom of Thought and Conscience',
        originalExcerpt: 'Everyone has the right to freedom of thought, conscience and religion.',
        modernizedMeaning: 'Every person may choose, practice, or change their religion and philosophical beliefs without state coercion.',
        historicalSignificance: 'Protected spiritual autonomy against totalitarian and theocratic persecution.'
      }
    ],
    lastingImpact: 'Forms the customary international law baseline and serves as the legal blueprint for the constitutions of over 90 modern democratic nations.',
    audioSpeechText: 'All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood. Everyone is entitled to all the rights and freedoms set forth in this Declaration, without distinction of race, color, sex, language, religion, or nationality. Everyone has the right to life, liberty and security of person.'
  },
  {
    id: 'source_mandela_prepared_to_die',
    title: '"I Am Prepared to Die"',
    originalTitle: 'Statement from the Dock at the Rivonia Trial',
    authorOrRuler: 'Nelson Mandela',
    authorTitle: 'Leader of the African National Congress, Former Accused No. 1',
    year: 1964,
    yearDisplay: 'April 20, 1964',
    era: '20th Century',
    category: 'Monumental Speeches',
    civilization: 'South Africa / Global Liberation',
    location: 'Palace of Justice, Pretoria, South Africa',
    originalLanguage: 'English',
    mediumOrFormat: 'Four-hour courtroom address from the dock in capital trial',
    currentPreservationLocation: 'National Archives of South Africa, Pretoria',
    famousQuote: 'It is an ideal which I hope to live for and to achieve. But if needs be, it is an ideal for which I am prepared to die.',
    summary: 'Mandela’s closing address during the Rivonia Trial, where he faced the death penalty for sabotage against the apartheid regime. Defiantly refusing to plead for mercy, he placed the apartheid state on trial, explaining the moral necessity of fighting for a non-racial democratic South Africa.',
    historicalContext: 'Following the 1960 Sharpeville Massacre where police shot 69 unarmed anti-apartheid protesters, peaceful protest was outlawed. Mandela and comrades co-founded Umkhonto we Sizwe. Captured at Liliesleaf Farm in 1963, they faced execution under the Sabotage Act.',
    fullExcerptText: `I am the First Accused. I hold a Bachelor’s Degree in Arts and practiced as an attorney in Johannesburg for a number of years in partnership with Oliver Tambo...

I do not, however, deny that I planned sabotage. I did not plan it in a spirit of recklessness, nor because I have any love of violence. I planned it as a result of a calm and sober assessment of the political situation that had arisen after many years of tyranny, exploitation, and oppression of my people by the Whites.

During my lifetime I have dedicated myself to this struggle of the African people. I have fought against white domination, and I have fought against black domination. I have cherished the ideal of a democratic and free society in which all persons live together in harmony and with equal opportunities. It is an ideal which I hope to live for and to achieve. But if needs be, it is an ideal for which I am prepared to die.`,
    keyClauses: [
      {
        clauseNumberOrTitle: 'The Moral Rejection of All Domination',
        originalExcerpt: 'I have fought against white domination, and I have fought against black domination.',
        modernizedMeaning: 'The liberation movement seeks genuine non-racial equality, not reverse supremacy or racial vengeance.',
        historicalSignificance: 'Ensured that South Africa’s transition in 1994 did not devolve into racial civil war.'
      },
      {
        clauseNumberOrTitle: 'Equal Opportunities in Harmony',
        originalExcerpt: 'A democratic and free society in which all persons live together in harmony and with equal opportunities.',
        modernizedMeaning: 'Democracy requires not just votes, but equal access to land, education, and economic dignity.',
        historicalSignificance: 'The philosophical core of the post-apartheid "Rainbow Nation".'
      },
      {
        clauseNumberOrTitle: 'Unshakable Willingness to Die for Freedom',
        originalExcerpt: 'If needs be, it is an ideal for which I am prepared to die.',
        modernizedMeaning: 'Mandela refused to compromise his principles to save his own life from the hangman.',
        historicalSignificance: 'The judge spared the defendants the death penalty, sentencing them instead to life imprisonment on Robben Island, turning Mandela into a global martyr.'
      }
    ],
    lastingImpact: 'Transformed Mandela into the moral compass of the 20th century, leading after 27 years of imprisonment to the peaceful end of apartheid and his election as South Africa’s first democratic president.',
    audioSpeechText: 'During my lifetime I have dedicated myself to this struggle of the African people. I have fought against white domination, and I have fought against black domination. I have cherished the ideal of a democratic and free society in which all persons live together in harmony and with equal opportunities. It is an ideal which I hope to live for and to achieve. But if needs be, it is an ideal for which I am prepared to die.'
  }
];

export const PRIMARY_SOURCES = FOUNDATIONAL_PRIMARY_SOURCES;
