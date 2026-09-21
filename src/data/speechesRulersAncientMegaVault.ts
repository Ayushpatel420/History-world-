import { PrimarySourceDocument } from './primarySourcesData';

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
  significance: string;
  lastingImpact: string;
  audioSpeechText: string;
}

const RAW_ANCIENT_MEGA_VAULT: BulkSpeechData[] = [
  // 1. King Hammurabi
  {
    id: 'anc_hammurabi_justice_proclamation',
    title: 'The Proclamation of Justice: "That the Strong Might Not Oppress the Weak"',
    authorOrRuler: 'King Hammurabi',
    authorTitle: 'King of Babylon, Ruler of the Four Quarters of the Earth',
    year: -1750,
    yearDisplay: 'c. 1750 BC',
    era: 'Antiquity',
    category: 'Legal Codes & Edicts',
    civilization: 'Babylonian Empire (Mesopotamia)',
    location: 'Babylon / Susa, Mesopotamia',
    originalLanguage: 'Akkadian cuneiform',
    mediumOrFormat: 'Basalt Stele inscription',
    currentPreservationLocation: 'Musée du Louvre, Paris',
    famousQuote: 'Anu and Enlil named me, Hammurabi, the devout prince, to make justice appear in the land, to destroy the wicked, that the strong might not injure the weak.',
    summary: 'Hammurabi proclaims his celebrated legal code carved on a 7-foot diorite stele, establishing standardized courts, civil damages, commercial contracts, and royal protection for widows and orphans.',
    historicalContext: 'Unified Mesopotamia into a centralized empire, replacing arbitrary feudal retribution with statutory law.',
    fullExcerptText: 'When lofty Anu, King of the Anunnaki, and Enlil, lord of heaven and earth, committed the rule of all mankind to Marduk... then Anu and Enlil named me Hammurabi, to bring about the rule of righteousness in the land, to destroy the wicked and evil-doers; so that the strong should not harm the weak; so that I should rule over the black-headed people like Shamash, and enlighten the land, to further the well-being of mankind.',
    clauseTitle: 'Establishment of the Rule of Law and Protection of the Vulnerable',
    originalClause: 'dannum enšam ana lā ḫabālim... šīr nišī uṭīb.',
    modernClause: 'That the strong might not oppress the weak, and that justice be granted to the orphan and the widow.',
    significance: 'The premier surviving systematic legal code of ancient world antiquity.',
    lastingImpact: 'Established the principle that laws must be publicly displayed and govern both ruler and subject.',
    audioSpeechText: 'Anu and Enlil named me Hammurabi, to make justice reign in the land and destroy wickedness, so that the strong shall never oppress the weak! Let any oppressed man come before my statue, read my law, and find peace for his heart.'
  },
  // 2. Pharaoh Merneptah (Israel Stele)
  {
    id: 'anc_merneptah_victory_stela',
    title: 'The Great Victory Inscription: The Defeat of the Sea Peoples and Canaan',
    authorOrRuler: 'Pharaoh Merneptah',
    authorTitle: 'Pharaoh of the 19th Dynasty of Egypt (Son of Ramesses II)',
    year: -1208,
    yearDisplay: '1208 BC',
    era: 'Antiquity',
    category: 'Monumental Speeches',
    civilization: 'Ancient Egypt',
    location: 'Thebes (Luxor), Egypt',
    originalLanguage: 'Ancient Egyptian (Hieroglyphic text on black granite)',
    mediumOrFormat: 'Granite Stele Inscription',
    currentPreservationLocation: 'Egyptian Museum, Cairo',
    famousQuote: 'The princes are prostrated, saying: "Peace!" Not one raises his head among the Nine Bows. Desolation is for Libya; Hatti is pacified.',
    summary: 'Pharaoh Merneptah commemorates the repulsion of the first massive wave of Sea Peoples and Libyan confederacies invading the Nile Delta, securing the stability of the realm.',
    historicalContext: 'Contains the earliest known extra-biblical historical mention of "Israel" in any ancient inscription.',
    fullExcerptText: 'The kings are overthrown, saying "Shalam!" None can raise his head among the foreigners. Libya is wasted; Hatti is quieted; Canaan is plundered with every evil; Ashkelon is carried away; Gezer is taken; Yanoam is made as that which exists not; Israel is laid waste, its seed is no more! Hurru is become a widow for Egypt! All lands together are at peace.',
    clauseTitle: 'Pacification of the Mediterranean Borders',
    originalClause: 'ysrỉr fkt bn prt.f... tꜣ-mri m ḥtp.',
    modernClause: 'Peace is restored to the frontiers; Egypt stands victorious and quiet.',
    significance: 'Key chronological anchor for the Late Bronze Age Collapse and ancient Levantine history.',
    lastingImpact: 'One of the most famous archaeological inscriptions in the Egyptian Museum in Cairo.',
    audioSpeechText: 'The princes of foreign lands bow down, crying for peace! The invaders of our coasts have been broken upon the delta. Egypt stands proud, firm, and pacified in the light of the eternal sun!'
  },
  // 3. King Cyrus the Great (Cyrus Cylinder)
  {
    id: 'anc_cyrus_great_charter_liberty',
    title: 'The Cyrus Cylinder Proclamation: Universal Freedom of Worship and Repatriation',
    authorOrRuler: 'Cyrus II the Great',
    authorTitle: 'King of Anshan, King of Media, King of Babylon, King of Kings',
    year: -539,
    yearDisplay: '539 BC',
    era: 'Antiquity',
    category: 'Human Rights & Declarations',
    civilization: 'Achaemenid Persian Empire',
    location: 'Babylon (Hillah, Iraq)',
    originalLanguage: 'Babylonian Akkadian cuneiform',
    mediumOrFormat: 'Baked Clay Barrel Cylinder',
    currentPreservationLocation: 'British Museum, London (ANE 90920)',
    famousQuote: 'I returned to their sacred cities the sanctuaries which had been in ruins, and I gathered all their inhabitants and returned to them their habitations.',
    summary: 'Following the conquest of Babylon, Cyrus proclaims religious freedom, outlaws slave labor and plunder, and commands the return of all displaced peoples—including the Jewish exile community—to their ancestral homelands.',
    historicalContext: 'Replaced the brutal Assyrian and Babylonian policies of mass deportation with enlightened tolerance and regional autonomy.',
    fullExcerptText: 'I am Cyrus, king of the world, great king, legitimate king, king of Babylon, king of Sumer and Akkad, king of the four rims of the earth... When I entered Babylon as a friend, I established the seat of the government in the palace of the ruler under jubilation and rejoicing. My numerous troops walked through Babylon in peace; I did not allow anyone to terrorize any place in Sumer and Akkad. I strove for peace in Babylon and in all its sacred cities. I freed the citizens from burdens not suitable for them. I returned all the gods to their ancient sanctuaries, and gathered all their people to rebuild their homes!',
    clauseTitle: 'Universal Toleration of Faiths and Repatriation of Captive Nations',
    originalClause: 'ṣābīya mādu ina qereb Bābili išaddihū ina šulmim... nišīšunu upahhirma utēr ašruššun.',
    modernClause: 'My soldiers walked in peace; I allowed no plundering, restored all holy sanctuaries, and repatriated all displaced peoples to their homes.',
    significance: 'Recognized by the United Nations as the first declaration of human rights in antiquity.',
    lastingImpact: 'Laid the ideological blueprint for federalism, tolerance, and human rights across world history.',
    audioSpeechText: 'I am Cyrus, King of the World! When I entered Babylon, my troops walked in peace. I forbade looting and terror. I restored all sacred temples to their gods, and returned all exiled peoples to their ancestral homes in freedom and honor!'
  },
  // 4. King Ashoka (Edict on Religious Tolerance - Rock Edict XII)
  {
    id: 'anc_ashoka_rock_edict_xii_tolerance',
    title: 'Major Rock Edict XII: Harmony Between All Religions and Faiths',
    authorOrRuler: 'Emperor Ashoka the Great (Devanampriya Priyadarsin)',
    authorTitle: 'Third Emperor of the Maurya Empire',
    year: -257,
    yearDisplay: 'c. 257 BC',
    era: 'Classical',
    category: 'Human Rights & Declarations',
    civilization: 'Maurya Empire (Ancient India)',
    location: 'Girnar / Kalsi / Shahbazgarhi, India & Pakistan',
    originalLanguage: 'Prakrit (Brahmi Script)',
    mediumOrFormat: 'Carved on Mountain Rock Faces across the subcontinent',
    currentPreservationLocation: 'In situ at Mount Girnar, Junagadh, Gujarat, India',
    famousQuote: 'One should not honor only one\'s own religion and condemn the religions of others. On the contrary, other religions should also be honored for whatever good they possess.',
    summary: 'Ashoka commands that all religious denominations throughout his vast empire treat each other with deep honor and mutual learning, declaring that praising one\'s own religion out of sectarian vanity only inflicts the deepest injury upon it.',
    historicalContext: 'Carved across the Indian subcontinent from Afghanistan to Karnataka, this is humanity’s oldest official state declaration of interfaith pluralism and civil discourse.',
    fullExcerptText: 'King Priyadarsin, Beloved of the Gods, honors all sects and both ascetics and householders; he honors them with gifts and honors of various kinds. But the Beloved of the Gods does not value gifts or honors as much as the growth of the essentials of all religions. The root of this is the restraint of speech: that one should not extol one\'s own sect or disparage another\'s without reason. For whoever praises his own religion out of excessive devotion and condemns others with the thought "Let me glorify my faith", he only injures his own faith all the more! Therefore, concord (samavaya) alone is commendable: that all should listen to and learn from each other\'s truths!',
    clauseTitle: 'State Mandate of Interfaith Pluralism and Civic Restraint',
    originalClause: 'samavāyo eva sādhu kiti amamaññasa dhammaṁ suṇeyu ca susūseyu ca.',
    modernClause: 'Concord alone is commendable: let all people hear and respect the sacred doctrines professed by others.',
    significance: 'The supreme classical declaration of religious liberty and inter-sectarian peace in world history.',
    lastingImpact: 'Served as the ethical beacon for modern secular democracy in the Constitution of India.',
    audioSpeechText: 'King Priyadarsin honors all faiths! One should never condemn another man\'s religion, but honor it for the good it contains. Whoever glorifies his own faith by slandering others only hurts his own religion. Therefore, let concord reign: listen to each other with open hearts and learn wisdom together!'
  },
  // 5. King Archidamus II of Sparta
  {
    id: 'anc_archidamus_speech_peloponnesian',
    title: 'Address to the Spartan Assembly: The Wisdom of Caution in War',
    authorOrRuler: 'King Archidamus II of Sparta',
    authorTitle: 'Eurypontid King of Sparta',
    year: -432,
    yearDisplay: '432 BC',
    era: 'Classical',
    category: 'Monumental Speeches',
    civilization: 'Ancient Sparta (Greece)',
    location: 'Sparta, Peloponnese, Greece',
    originalLanguage: 'Doric Greek',
    mediumOrFormat: 'Assembly Address recorded in Thucydides\' History of the Peloponnesian War (1.79-85)',
    currentPreservationLocation: 'Thucydides, History of the Peloponnesian War',
    famousQuote: 'Let us not be ashamed of the slowness and deliberation for which the world blames us. If you begin war in haste, you will end it with delay, because you took it in hand without preparation.',
    summary: 'King Archidamus warns the warlike Spartan assembly against rushing headlong into war against Athens, demonstrating that Athenian naval power and financial reserves cannot be defeated by quick agricultural raids.',
    historicalContext: 'Archidamus foresaw that a war between a land power (Sparta) and a sea power (Athens) would be long, ruinous, and would pass as a bitter curse to their children.',
    fullExcerptText: 'Spartans! I have myself taken part in many wars, and I see men of my own age among you who have done the same. We do not rush into war without calculation. When we fight our neighbors in the Peloponnese, the conditions are equal. But when we fight Athens—a city possessing immense silver, ships, cavalry, and subjects that extend across the seas—how can we hope to prevail? By our navy? We have none! By our treasury? We are far poorer than they! Let us not be ashamed of our legendary Spartan slowness and caution. Speed in beginning a war only brings delay in ending it. Let us prepare our alliances and funds first, and keep our judgment clear!',
    clauseTitle: 'Prudence and Strategic Preparation Over Rash Jingoism',
    originalClause: 'τὸ δὲ βραδὺ καὶ μέλλον, ὃ μέμφονται μάλιστα ἡμῶν, μὴ αἰσχύνεσθε.',
    modernClause: 'Do not be ashamed of that slowness and deliberation for which they reproach us: haste in war brings only ruin.',
    significance: 'A classical masterpiece of strategic realism and caution against catastrophic geopolitical conflicts.',
    lastingImpact: 'Studied in modern military academies as the quintessential lesson in assessing national resources before declaring war.',
    audioSpeechText: 'Spartans! Do not be shamed by those who call us slow and cautious! A war started in reckless haste is a war ended in ruin. Athens has vast ships, silver, and allies across the seas. Prepare our finances, build our fleet, and let reason govern our swords!'
  },
  // 6. Emperor Trajan (Rescript on Fair Trials)
  {
    id: 'anc_trajan_rescript_pliny',
    title: 'Rescript to Pliny the Younger: The Principles of Due Process and No Anonymous Accusations',
    authorOrRuler: 'Emperor Trajan (Marcus Ulpius Traianus)',
    authorTitle: 'Optimatus Princeps, Thirteenth Emperor of the Roman Empire',
    year: 112,
    yearDisplay: '112 AD',
    era: 'Classical',
    category: 'Legal Codes & Edicts',
    civilization: 'Roman Empire',
    location: 'Rome / Bithynia et Pontus (Turkey)',
    originalLanguage: 'Latin',
    mediumOrFormat: 'Imperial Rescript on Papyrus',
    currentPreservationLocation: 'Pliny the Younger, Letters (Epistulae, Book X.97)',
    famousQuote: 'Anonymous accusations must not be admitted in any criminal charge. For they form the worst of precedents and are entirely contrary to the spirit of our enlightened age.',
    summary: 'Emperor Trajan instructs provincial governor Pliny the Younger on handling allegations against Christians, forbidding witch-hunts, prohibiting state surveillance, and declaring anonymous denunciations legally inadmissible.',
    historicalContext: 'Under Trajan, the Roman Empire reached its greatest territorial extent. Trajan was revered by the Senate with the wish: "May you be happier than Augustus and better than Trajan!" (Felicior Augusto, melior Traiano).',
    fullExcerptText: 'You have observed proper procedure, my dear Pliny, in sifting the cases of those who had been denounced to you as Christians. They are not to be sought out by the state; if they are openly accused and convicted, they must be punished, with the proviso that whoever denies being a Christian and proves it by worshipping our gods shall obtain pardon. But pamphlets published anonymously must under no circumstances be admitted in evidence in any indictment! For this creates the most dangerous and pernicious precedent, totally alien to the justice of our reign!',
    clauseTitle: 'Absolute Inadmissibility of Anonymous Denunciations in Law',
    originalClause: 'Sine auctore vero propositi libelli in nullo crimine locum habere debent. Nam et pessimi exempli nec nostri saeculi est.',
    modernClause: 'Anonymous accusations must have no place in any judicial trial: they set a poisonous precedent contrary to our civilized era.',
    significance: 'Established the fundamental legal principle that the accused has the right to face their accusers, rejecting secret police state methods.',
    lastingImpact: 'Embedded into English Common Law, the US Sixth Amendment Confrontation Clause, and universal human rights codes.',
    audioSpeechText: 'My dear Pliny: you have acted with wisdom. The state must never conduct witch hunts or spy upon citizens. And hear this imperial rule: anonymous accusations must be rejected with contempt from every court of law! They are the tools of tyrants and contrary to our enlightened age.'
  },
  // 7. Emperor Marcus Aurelius (Meditations)
  {
    id: 'anc_marcus_aurelius_cosmic_citizenship',
    title: 'The Carnuntum Reflections: On Civic Duty, Reason, and the City of the World',
    authorOrRuler: 'Emperor Marcus Aurelius Antoninus',
    authorTitle: 'Stoic Philosopher and Emperor of Rome',
    year: 175,
    yearDisplay: 'c. 175 AD',
    era: 'Classical',
    category: 'Religious & Philosophical Texts',
    civilization: 'Roman Empire',
    location: 'Legionary Fort of Carnuntum on the Danube (modern Austria)',
    originalLanguage: 'Koine Greek',
    mediumOrFormat: 'Autobiographical Philosophical Journal (Meditations / Ta Eis Heauton)',
    currentPreservationLocation: 'Vatican Library & Bodleian Library, Oxford',
    famousQuote: 'My city and my country, so far as I am Antoninus, is Rome; but so far as I am a human being, it is the world.',
    summary: 'Writing by oil lamp in his military tent during the bitter northern campaigns against the Quadi and Marcomanni, the Stoic Emperor writes to himself on justice, reminding himself to treat every human being with dignity and to act as a citizen of the universe.',
    historicalContext: 'Marcus Aurelius was the last of the "Five Good Emperors". Despite facing the deadly Antonine Plague and endless barbarian wars, he never surrendered his commitment to philosophical compassion and justice.',
    fullExcerptText: 'Begin each morning by saying to yourself: Today I shall meet with the meddling, the ungrateful, the arrogant, the dishonest, the envious, and the unsociable. They are like this because they cannot distinguish good from evil. But I have seen the beauty of good, and the ugliness of evil, and have recognized that the wrongdoer has a nature related to my own—not of the same blood or seed, but being a partaker of the same divine mind. None of them can hurt me, for no one can implicate me in ugliness. Nor can I be angry with my kinsman, nor hate him. For we are made for cooperation, like feet, like hands, like the rows of the upper and lower teeth! To act against one another then is contrary to nature!',
    clauseTitle: 'The Universal Fellowship of Mankind and Civic Virtue',
    originalClause: 'πόλις καὶ πατρὶς ὡς μὲν Ἀντωνίνῳ μοι ἡ Ῥώμη, ὡς δὲ ἀνθρώπῳ ὁ κόσμος.',
    modernClause: 'As Antoninus, my city is Rome; as a rational human being, my country is the entire cosmos.',
    significance: 'The supreme literary monument of Stoic philosophy and enlightened governance in world literature.',
    lastingImpact: 'Read by leaders from Frederick the Great to Nelson Mandela as the ultimate guide to integrity in public power.',
    audioSpeechText: 'Begin every day by remembering: we are made for cooperation, like feet, like hands, like the upper and lower teeth! No evil man can hurt your soul unless you let yourself become like him. My city as Antoninus is Rome; but as a human being, my country is the entire world!'
  },
  // 8. King Sejong the Great (Agrarian Welfare Edict)
  {
    id: 'anc_sejong_agrarian_welfare_rescript',
    title: 'Royal Rescript on Farmers\' Welfare and Universal Famine Relief',
    authorOrRuler: 'King Sejong the Great',
    authorTitle: 'Monarch of the Joseon Dynasty (Korea)',
    year: 1430,
    yearDisplay: '1430 AD',
    era: 'Medieval',
    category: 'Legal Codes & Edicts',
    civilization: 'Joseon Dynasty (Korea)',
    location: 'Hanseong (Seoul), Korea',
    originalLanguage: 'Classical Chinese / Korean',
    mediumOrFormat: 'Royal Edict recorded in the Veritable Records of King Sejong (Sejong Sillok)',
    currentPreservationLocation: 'National Institute of Korean History, Gwacheon, South Korea',
    famousQuote: 'The people are the foundation of the state, and food is the heaven of the people. If the peasant is hungry, the throne itself is in peril.',
    summary: 'King Sejong conducts history\'s first national public referendum, polling 170,000 peasants and landowners on a new progressive agricultural tax system (Gongbeop), while distributing rain gauges (Cheugugi) to ensure fair taxation based on actual rainfall and harvest yields.',
    historicalContext: 'Sejong’s reign was an unprecedented era of human-centered governance, instituting maternity leave of 100 days for enslaved government women and paternity leave for their husbands.',
    fullExcerptText: 'The people are the root and foundation of the state; and for the people, food and agriculture are as vital as Heaven itself! If the farmers suffer from drought, flood, or rapacious magistrates, how can the King sleep upon soft pillows? Let the magistrates distribute grain from the royal granaries without demanding repayment in seasons of poor harvest. Furthermore, whenever pregnant slave women working in government offices are near childbirth, grant them one hundred days of leave before and after birth, and let their husbands be granted one month of leave to care for mother and child! Life is precious beyond all gold.',
    clauseTitle: 'Universal Maternal Welfare and Scientific Famine Protection',
    originalClause: '民惟邦本，本固邦寧... 官婢產子，給休一百日。',
    modernClause: 'The people are the foundation of the country; when the people are secure, the country is peaceful. Grant 100 days of leave to mothers.',
    significance: 'Created the world\'s first state-mandated maternity and paternity leave policies in the 15th century.',
    lastingImpact: 'Solidified King Sejong’s reputation as one of the most benevolent and scientifically advanced rulers in global history.',
    audioSpeechText: 'The common people are the foundation of the state! If the farmer suffers hunger in the field, the throne itself is dishonored. Open the royal granaries in times of drought. Grant one hundred days of rest to every mother giving birth, for every human life is sacred in the eyes of Heaven!'
  },
  // 9. Sultan Suleiman the Magnificent (Kanunname)
  {
    id: 'anc_suleiman_kanun_justice_charter',
    title: 'Kanunname-i Âl-i Osman: The Imperial Code of Justice and Protection of the Reaya',
    authorOrRuler: 'Sultan Suleiman I ("The Lawgiver / Kanuni")',
    authorTitle: 'Sultan of the Ottoman Empire, Caliph of Islam',
    year: 1530,
    yearDisplay: 'c. 1530 AD',
    era: 'Early Modern',
    category: 'Legal Codes & Edicts',
    civilization: 'Ottoman Empire',
    location: 'Topkapi Palace, Istanbul',
    originalLanguage: 'Ottoman Turkish',
    mediumOrFormat: 'Illuminated Imperial Manuscript Code (Kanun)',
    currentPreservationLocation: 'Süleymaniye Library & Topkapi Palace Archives, Istanbul',
    famousQuote: 'The state is founded upon the soldiers; the soldiers are supported by taxes; taxes are paid by the subjects (Reaya); and the subjects flourish only through justice.',
    summary: 'Sultan Suleiman promulgates the Imperial Kanun, standardizing secular administrative and criminal law, capping landlord dues, strictly outlawing arbitrary corporal mutilation, and protecting Christian, Jewish, and Muslim agrarian peasants against predatory tax collectors.',
    historicalContext: 'Known in the West as "The Magnificent" and in the East as "Kanuni" (The Lawgiver), Suleiman created a meritocratic imperial legal system that governed three continents.',
    fullExcerptText: 'Let this imperial command be known to all viziers, beylerbeys, and kadis: The world is a garden, whose wall is the state. The state is an authority, maintained by the army. The army is maintained through wealth. Wealth is gathered from the subjects (Reaya). The subjects are kept in prosperity only through justice! Let no judge take bribes or delay trials. Let no tax collector take even a single egg from a poor peasant without payment. For an unjust empire burns from within like dry straw!',
    clauseTitle: 'The Circle of Justice (Dâire-i Adliye) and Peasant Rights',
    originalClause: 'Adâlet mülkün temelidir... Reâyâya zulm ü teaddî olunmaya.',
    modernClause: 'Justice is the foundation of the realm: under no circumstances shall cruelty or extortion be committed against the subjects.',
    significance: 'Formulated the classical Ottoman "Circle of Justice", harmonizing Islamic Sharia with statutory imperial civil law.',
    lastingImpact: 'The phrase "Adalet mülkün temelidir" (Justice is the foundation of the state) remains inscribed in every courthouse in the Republic of Turkey.',
    audioSpeechText: 'Let all judges and governors hear my decree: Justice is the foundation of the state! The subjects of our empire—Muslim, Christian, and Jew alike—must be protected from tyranny. Let no man take even a grain of wheat from a poor farmer unjustly, for an empire without justice is dust in the wind!'
  },
  // 10. Chief Seattle (Si'ahl)
  {
    id: 'anc_chief_seattle_sacred_earth_speech',
    title: 'The Sacred Earth Oration: "The Earth Does Not Belong to Man, Man Belongs to the Earth"',
    authorOrRuler: 'Chief Seattle (Si\'ahl)',
    authorTitle: 'Chief of the Duwamish and Suquamish Peoples',
    year: 1854,
    yearDisplay: 'December 1854',
    era: '19th Century',
    category: 'Monumental Speeches',
    civilization: 'Duwamish and Suquamish Nations (Pacific Northwest)',
    location: 'Elliot Bay, Seattle, Washington Territory',
    originalLanguage: 'Lushootseed (Coast Salish language)',
    mediumOrFormat: 'Public Oration to Territorial Governor Isaac Stevens',
    currentPreservationLocation: 'Washington State Historical Society & University of Washington Archives',
    famousQuote: 'Every part of this soil is sacred in the estimation of my people. Every hillside, every valley, every plain and grove, has been hallowed by some sad or happy event in days long vanished.',
    summary: 'Chief Seattle addresses the territorial governor during treaty negotiations, delivering one of the most stirring environmental and cultural meditations ever spoken, warning that when the land is despoiled and the native peoples are gone, their spirits will still walk the shores.',
    historicalContext: 'Faced with inexorable white settlement, Seattle negotiated the Treaty of Point Elliott to ensure fishing rights and a reservation for his people, lending his name to the city of Seattle.',
    fullExcerptText: 'The Great Chief in Washington sends word that he wishes to buy our land. How can you buy or sell the sky, the warmth of the land? The idea is strange to us. If we do not own the freshness of the air and the sparkle of the water, how can you buy them? Every part of this earth is sacred to my people. Every shining pine needle, every sandy shore, every mist in the dark woods, every clearing and humming insect is holy in the memory and experience of my people. The sap which courses through the trees carries the memories of the red man. We are part of the earth and it is part of us! The earth does not belong to man; man belongs to the earth.',
    clauseTitle: 'The Ecological Interconnectedness of All Living Creation',
    originalClause: 'The earth does not belong to man; man belongs to the earth. All things are connected, like the blood which unites one family.',
    modernClause: 'All parts of nature are interconnected: whatever man does to the web of life, he does unto himself.',
    significance: 'The global founding text of the modern environmental and ecological conservation movement.',
    lastingImpact: 'Translated into dozens of languages; Chief Seattle is recognized as an enduring prophet of ecological stewardship.',
    audioSpeechText: 'How can you buy or sell the sky, or the warmth of the earth? The idea is strange to us! Every shining pine needle, every sandy shore, every clearing in the mist is sacred to my people. We are part of the earth, and the earth is part of us. What befalls the earth befalls all the children of the earth!'
  }
];

export const SPEECHES_RULERS_ANCIENT_MEGA_VAULT: PrimarySourceDocument[] = RAW_ANCIENT_MEGA_VAULT.map((item) => ({
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
      modernizedMeaning: item.modernClause || '',
      historicalSignificance: item.significance
    }
  ],
  lastingImpact: item.lastingImpact,
  audioSpeechText: item.audioSpeechText
}));
