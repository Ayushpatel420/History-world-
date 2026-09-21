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

const RAW_EGYPT_NEAR_EAST_RULER_SPEECHES: BulkSpeechData[] = [
  {
    id: 'egypt_hatshepsut_speos_artemidos',
    title: 'The Speos Artemidos Inscription: "I Have Restored That Which Was in Ruins"',
    originalTitle: 'Hatshepsut Restoration Stela at Beni Hasan',
    authorOrRuler: 'Pharaoh Hatshepsut (Maatkare)',
    authorTitle: 'Female King of Upper and Lower Egypt (18th Dynasty)',
    year: -1470,
    yearDisplay: 'c. 1470 BC',
    era: 'Antiquity',
    category: 'Monumental Speeches',
    civilization: 'Ancient Egypt (New Kingdom)',
    location: 'Speos Artemidos (Beni Hasan), Minya, Egypt',
    originalLanguage: 'Middle Egyptian (Hieroglyphic text carved in living rock)',
    mediumOrFormat: 'Rock-Cut Temple Facade Inscription',
    currentPreservationLocation: 'Speos Artemidos, Beni Hasan, Egypt',
    famousQuote: 'I have raised up that which was fallen, I have restored that which was in ruins since the Asiatic foreigners held sway in Avaris.',
    summary: 'Pharaoh Hatshepsut proclaims her divine right to rule as female king, describing her monumental building projects, reopening of trading expeditions to the Land of Punt, and healing the sacred temples damaged by the Hyksos occupation centuries earlier.',
    historicalContext: 'Hatshepsut was one of the most successful pharaohs in Egyptian history. Ruling for twenty-two years, she donned the royal false beard and kilt, inaugurating an era of immense architectural splendor.',
    fullExcerptText: 'Hear ye, all people and common folk, whoever ye may be! I have performed these great deeds by the counsel of my heart. I have restored that which was in ruins; I have raised up that which was left unfinished since the Asiatics were in the midst of Avaris in the Northland, overthrowing that which had been made. I have banished the abominations of the gods, and the earth has swallowed up their footprints! My command stands firm like the eternal mountains; Ra himself decreed my rising!',
    clauseTitle: 'Restoration of Ma\'at (Cosmic Truth and Order)',
    originalClause: 'iw.i smn.n.i wꜣs.t, iw.i sꜥnḫ.n.i r-pr.w... m-sꜣ ꜥꜣmw wnn.w m-qꜣb Ḥw.t-Wꜥr.t.',
    modernClause: 'I have restored that which was decayed, I have brought back to life the sanctuaries after the foreigners had overrun the Delta.',
    significance: 'Demonstrates Hatshepsut\'s ideological legitimacy and her mastery of classical Egyptian royal monumental rhetoric.',
    lastingImpact: 'One of the most famous declarations of restoration and female sovereignty from the ancient Mediterranean.',
    audioSpeechText: 'Hear ye, all people and common folk of Egypt! I have done these great works by the counsel of my heart. I have restored that which lay in ruins, and raised up the sanctuaries that were shattered. My royal decree stands firm like the mountains of the gods!'
  },
  {
    id: 'egypt_thutmose_iii_megiddo_council',
    title: 'Address to the Military War Council at Megiddo: "Taking Megiddo is Taking a Thousand Cities"',
    originalTitle: 'Annals of Thutmose III at Karnak (The Battle of Megiddo)',
    authorOrRuler: 'Pharaoh Thutmose III (Menkheperre)',
    authorTitle: 'Pharaoh of Egypt ("The Napoleon of Ancient Egypt")',
    year: -1457,
    yearDisplay: 'May 1457 BC',
    era: 'Antiquity',
    category: 'Monumental Speeches',
    civilization: 'Ancient Egypt (New Kingdom)',
    location: 'Aruna Pass, Mount Carmel / Megiddo, Canaan (Israel)',
    originalLanguage: 'Middle Egyptian (Hieroglyphs)',
    mediumOrFormat: 'Inscribed on the sanctuary walls of Karnak Temple',
    currentPreservationLocation: 'Karnak Temple Complex, Luxor, Egypt',
    famousQuote: 'As Ra loves me, as my father Amun favors me: I shall advance upon this narrow road of Aruna! Let whoever wishes go by the safe roads; but I will lead from the front!',
    summary: 'When Canaanite kings allied under the Prince of Kadesh rebelled, Thutmose III\'s generals begged him not to take the dangerous, narrow mountain defile of Aruna where horses had to march single file. Thutmose swore an oath that a Pharaoh must never show hesitation, leading the vanguard in person to surprise and crush the coalition.',
    historicalContext: 'Thutmose III conducted seventeen victorious campaigns in twenty years, extending the Egyptian Empire from the Euphrates River in Syria to the Fourth Cataract of the Nile in Sudan.',
    fullExcerptText: 'Then his majesty commanded a council of war with his valiant army: His officers said: "How can one march along so narrow a path, where horse must walk behind horse and the vanguard will fight while the rear is still trapped in Aruna?" But his majesty swore: "As Ra lives and loves me, my majesty will advance along this narrow Aruna road! Let him who will among you follow the other paths; and let him who will follow my majesty. For they will say among the wretched enemies: Does his majesty go by another road because he is afraid of us? By Amun, never!"',
    clauseTitle: 'Royal Valour and Moral Ascendancy in Mountain Warfare',
    originalClause: 'ʿnḫ n.i Rꜥ, ḥzz w(i) it.i Imn... n(n) rdyt.i šm mšꜥ.i ḥr wꜣ.t ky.t!',
    modernClause: 'As Ra lives and Amun favors me, I will not allow my army to take the alternate detour: I shall march straight through the pass of danger!',
    significance: 'The earliest reliably documented battle in world history with tactical troop deployments and council records.',
    lastingImpact: 'Established Megiddo (Armageddon) in global military and apocalyptic history as the eternal crossroads of empires.',
    audioSpeechText: 'As Ra lives and Amun favors me, my majesty will march through the narrow pass of danger! Let whoever among you fears follow the easy roads; but I will lead the vanguard myself! No enemy shall ever say that the Pharaoh took a cowardly path because he was afraid!'
  },
  {
    id: 'egypt_akhenaten_great_hymn_aten',
    title: 'The Great Hymn to the Aten: The Solar Monotheism of Amarna',
    originalTitle: 'Great Hymn to the Aten (Tomb of Ay at Amarna)',
    authorOrRuler: 'Pharaoh Akhenaten (Amenhotep IV)',
    authorTitle: 'The Heretic King, Pharaoh of Egypt (18th Dynasty)',
    year: -1350,
    yearDisplay: 'c. 1350 BC',
    era: 'Antiquity',
    category: 'Religious & Philosophical Texts',
    civilization: 'Ancient Egypt (Amarna Period)',
    location: 'Akhetaten (Tell el-Amarna), Egypt',
    originalLanguage: 'Late Egyptian / Middle Egyptian Hieroglyphs',
    mediumOrFormat: 'Carved on the west wall of the Rock Tomb of Ay',
    currentPreservationLocation: 'Tomb of Ay (Amarna Tomb 25), Minya, Egypt',
    famousQuote: 'How manifold are your works! They are hidden from the face of man, O Sole God, like whom there is no other! You created the earth according to your heart.',
    summary: 'Akhenaten composes a breathtaking poetic ode to the sun disc (Aten), abolishing Egypt’s ancient polytheistic pantheon of Amun, Osiris, and Anubis to proclaim that the Aten is the sole, universal creator of all races, languages, birds, fish, and beasts on Earth.',
    historicalContext: 'Akhenaten moved the capital to virgin desert at Amarna and dismantled the powerful priesthood of Amun at Thebes, introducing the world’s first recorded state-sponsored monotheism.',
    fullExcerptText: 'Splendid you rise in the horizon of heaven, O living Aten, creator of life! When you shine in the eastern horizon, you fill every land with your beauty. When you set in the western horizon, the world is in darkness like unto death. But at dawn, you chase away the dark and shed your rays; the Two Lands celebrate! Trees and plants flourish, birds fly up from their nests, their wings spread praising your Ka. How manifold are your deeds! You made the distant sky that you might shine therein. You are the Sole God, beside whom there is no other!',
    clauseTitle: 'Universal Fatherhood of God over All Nations',
    originalClause: 'pꜣ nṯr wꜥ nn ky ḥr-ḫw.f, ir.n.k tꜣ r ib.k iw.k wꜥ.t(i)...',
    modernClause: 'O Sole God, like whom there is no other: you fashioned the earth according to your desire, when you were alone.',
    significance: 'The earliest recorded monotheistic hymn in global literature, prefiguring biblical Psalm 104 in phrasing and imagery.',
    lastingImpact: 'A cornerstone in the history of world religion, philosophy, and theological literature.',
    audioSpeechText: 'Splendid you rise upon the horizon of heaven, O living Aten, creator of life! How manifold are your works, hidden from the eyes of men! You are the Sole God, beside whom there is no other. You fashioned the earth according to your divine heart, making all nations live in your light.'
  },
  {
    id: 'egypt_kadesh_eternal_peace_treaty',
    title: 'The Silver Treaty of Kadesh: The First International Peace Accord in History',
    originalTitle: 'Egyptian-Hittite Peace Treaty (The Silver Tablet Treaty)',
    authorOrRuler: 'Pharaoh Ramesses II & King Hattusili III',
    authorTitle: 'Pharaoh of Egypt & Great King of the Hittites',
    year: -1259,
    yearDisplay: '1259 BC',
    era: 'Antiquity',
    category: 'Treaties & Accords',
    civilization: 'Ancient Egypt & Hittite Empire',
    location: 'Pi-Ramesses (Nile Delta) & Hattusa (Bogazkale, Turkey)',
    originalLanguage: 'Akkadian cuneiform (diplomatic lingua franca) & Egyptian Hieroglyphs',
    mediumOrFormat: 'Engraved Silver Tablets / Baked Clay Tablets / Temple Walls',
    currentPreservationLocation: 'Istanbul Archaeology Museums (Clay Tablet) & UN Headquarters, New York (Replica)',
    famousQuote: 'There shall be eternal peace and brotherhood between the children of Egypt and the children of Hatti forever. No hostility shall ever arise between them.',
    summary: 'Following decades of destructive warfare culminating in the Battle of Kadesh, Ramesses II and Hattusili III negotiate history\'s first recorded bilateral peace treaty, codifying mutual non-aggression, a defensive military alliance against third-party invaders, and reciprocal political refugee extradition.',
    historicalContext: 'Both empires were exhausted and threatened by the rising power of Assyria. A bronze replica of this treaty hangs at the entrance of the United Nations Security Council in New York as the world\'s oldest peace accord.',
    fullExcerptText: 'Ramesses, Beloved of Amun, Great King of Egypt, has made a treaty upon a tablet of silver with Hattusili, Great King of Hatti, his brother, to establish good peace and good brotherhood between them forever. Behold, Hattusili, the King of Hatti, binds himself by treaty to Ramesses, King of Egypt. The children of the children of the King of Hatti shall be in brotherhood and peace with the children of the children of Ramesses, King of Egypt. Neither king shall pass over into the land of the other to plunder or take anything therefrom forever!',
    clauseTitle: 'Mutual Defense and Eternal Non-Aggression Pact',
    originalClause: 'šulmu u aḫḫūtu ina berīšunu adi dāriš... nakra šanâ lā uṣṣû.',
    modernClause: 'Peace and brotherhood between them shall endure forever; neither king shall trespass the other’s border to seize land, and both shall assist each other in defense.',
    significance: 'The oldest known written diplomatic treaty between two sovereign nations with complete matching bilingual texts.',
    lastingImpact: 'The global prototype of international diplomacy, mutual defense treaties, and peaceful coexistence.',
    audioSpeechText: 'There shall be eternal peace and brotherhood between the King of Egypt and the King of Hatti! We establish this treaty of silver to last through our children and our children’s children forever. Neither king shall cross into the other’s borders to wage war; if enemies attack one, the other shall march with his chariots to defend his brother!'
  },
  {
    id: 'persia_darius_behistun_inscription',
    title: 'The Great Behistun Inscription: "I am Darius, the Great King, King of Kings"',
    originalTitle: 'Bisotun Inscription (Darius the Great Rock Relief)',
    authorOrRuler: 'Darius I the Great',
    authorTitle: 'King of Kings (Shahanshah) of the Achaemenid Persian Empire',
    year: -520,
    yearDisplay: '520 BC',
    era: 'Antiquity',
    category: 'Monumental Speeches',
    civilization: 'Achaemenid Persian Empire',
    location: 'Mount Behistun, Kermanshah Province, Iran',
    originalLanguage: 'Old Persian, Elamite, and Babylonian (cuneiform scripts)',
    mediumOrFormat: 'Trilingual Bas-Relief carved 100 meters high on a limestone cliff',
    currentPreservationLocation: 'Mount Behistun, Iran (UNESCO World Heritage Site)',
    famousQuote: 'I am Darius, the Great King, King of Kings, King in Persia, King of countries, son of Hystaspes. By the favor of Ahuramazda, I am King; Ahuramazda bestowed the kingdom upon me.',
    summary: 'Carved into the sheer limestone cliffs above the ancient Silk Road caravan route, Darius details how he overthrew the usurper Gaumata, crushed nineteen rebellions in a single year, and established peace and truth across twenty-three nations from Egypt to the Indus River.',
    historicalContext: 'The Behistun Inscription was to cuneiform what the Rosetta Stone was to Egyptian hieroglyphs. Sir Henry Rawlinson deciphered the cuneiform script by copying its three parallel texts in the 1840s.',
    fullExcerptText: 'Says Darius the King: By the grace of Ahuramazda, these are the countries which are subject unto me; I became king of them: Persia, Elam, Babylonia, Assyria, Arabia, Egypt, the countries by the Sea, Lydia, the Greeks, Media, Armenia, Cappadocia, Parthia, Drangiana, Aria, Chorasmia, Bactria, Sogdiana, Gandhara, Scythia, Sattagydia, Arachosia, and Maka: twenty-three nations in all! What was said unto them by me, that they did; day and night they obeyed my laws. You who shall be king hereafter, protect yourself vigorously from the Lie (Drauga)! The man who is a liar, punish him well!',
    clauseTitle: 'Devotion to Cosmic Truth (Asha) and Destruction of the Lie (Drauga)',
    originalClause: 'Adam Dārayavahuš xšāyaθiya vazraka xšāyaθiya xšāyaθiyānām... Auramazdāmaiy xšaçam frābara.',
    modernClause: 'I am Darius, Great King, King of Kings: Ahuramazda granted me this empire because I was not wicked, nor a liar, nor a tyrant.',
    significance: 'The foundational imperial text of the Persian Empire and the linguistic key to the decipherment of Mesopotamian cuneiform.',
    lastingImpact: 'One of the most monumental rock-cut historical proclamations on Earth.',
    audioSpeechText: 'I am Darius, the Great King, King of Kings, King of Persia! By the grace of Ahuramazda, twenty-three nations from Egypt to the Indus River obey my laws. You who shall reign after me: guard yourself against the Lie! Rule with righteousness and truth, and God will preserve your empire.'
  },
  {
    id: 'islamic_saladin_hattin_speech',
    title: 'Address before the Battle of Hattin: The Liberation of Jerusalem',
    originalTitle: 'خطبة صلاح الدين الأيوبي قبل معركة حطين',
    authorOrRuler: 'Sultan Saladin (Salah ad-Din Yusuf ibn Ayyub)',
    authorTitle: 'First Sultan of Egypt and Syria, Founder of the Ayyubid Dynasty',
    year: 1187,
    yearDisplay: 'July 3, 1187',
    era: 'Medieval',
    category: 'Monumental Speeches',
    civilization: 'Ayyubid Sultanate (Islamic Near East)',
    location: 'Horns of Hattin, near Tiberias, Galilee',
    originalLanguage: 'Arabic',
    mediumOrFormat: 'Pre-Battle Battlefield Oration to Emirs and Cavalry',
    currentPreservationLocation: 'Recorded by Baha ad-Din ibn Shaddad (The Rare and Excellent History of Saladin)',
    famousQuote: 'Beware of spilling blood, for blood never sleeps. Conquer the hearts of men with mercy and justice, for that is the true victory.',
    summary: 'Having trapped King Guy of Lusignan’s thirsty crusader army on the waterless, sun-baked plateau beneath the Horns of Hattin, Saladin rallies his forces to break the Crusader states, reminding his soldiers that their battle is fought not for plunder or revenge, but to restore Jerusalem and demonstrate Islamic chivalry.',
    historicalContext: 'Saladin\'s crushing victory at Hattin led to the recapture of Jerusalem after 88 years of Crusader control. Unlike the Crusaders in 1099 who slaughtered the inhabitants, Saladin granted generous terms of ransom and mercy.',
    fullExcerptText: 'Companions of the faith and defenders of justice! The enemy stands parched upon the slopes, trapped between their own folly and our bows. Know that God has placed the liberation of Al-Quds (Jerusalem) into our hands today! Do not fight for gold or booty, for worldly riches vanish like dust in the desert. Fight that the oppressed may be relieved, that sanctuaries may be cleansed, and that justice may walk upon the earth. When victory is ours, hold back your swords from the defenseless; for a conqueror who shows no mercy dishonors the Almighty!',
    clauseTitle: 'Chivalric Warfare and Strict Protection of the Vanquished',
    originalClause: 'إياك وسفك الدماء فإن الدم لا ينام... واعلم أن قلوب الناس لا تُفتح بالسيف وإنما بالعدل والرحمة.',
    modernClause: 'Beware of shedding blood needlessly, for blood never sleeps: win the hearts of men with justice and mercy.',
    significance: 'Decided the fate of the Crusader states in the Levant and solidified Saladin\'s global reputation as the model of chivalric magnanimity.',
    lastingImpact: 'Revered across both Islamic and Western cultures as the archetype of honorable kingship.',
    audioSpeechText: 'Defenders of the faith and lovers of justice! The liberation of Jerusalem is in our hands today. Fight not for gold or spoils, but that the oppressed may be freed! And when God grants us victory, stay your swords from the weak and helpless: win the hearts of men through justice and mercy!'
  },
  {
    id: 'ottoman_mehmed_ii_constantinople_speech',
    title: 'Address before the Final Assault on Constantinople: The Golden Horn and St. Sophia',
    originalTitle: 'Fatih Sultan Mehmed\'in İstanbul\'un Fethi Öncesi Nutku',
    authorOrRuler: 'Sultan Mehmed II ("The Conqueror / El-Fatih")',
    authorTitle: 'Sultan of the Ottoman Empire, Kayser-i Rûm (Caesar of Rome)',
    year: 1453,
    yearDisplay: 'May 28, 1453',
    era: 'Medieval',
    category: 'Monumental Speeches',
    civilization: 'Ottoman Empire',
    location: 'Before the Theodosian Walls of Constantinople (Istanbul, Turkey)',
    originalLanguage: 'Ottoman Turkish',
    mediumOrFormat: 'Pre-Assault General Assembly Address to Janissaries and Spahis',
    currentPreservationLocation: 'Topkapi Palace Archives & Tursun Beg (History of Mehmed the Conqueror)',
    famousQuote: 'Either I will conquer this city, or this city will conquer me! The empire of the Romans ends tonight, and the new dawn of our realm begins.',
    summary: 'On the eve of the final assault, 21-year-old Sultan Mehmed II addresses his assembled army outside the legendary triple Theodosian Walls, promising eternal fame, proclaiming religious protection for the city’s inhabitants, and ordering the dawn attack through the cannon breaches.',
    historicalContext: 'Constantinople had withstood dozens of sieges for over a thousand years. Mehmed’s massive bronze super-cannons (designed by Urban) shattered the walls, marking the fall of the Byzantine Empire and the end of the Middle Ages.',
    fullExcerptText: 'Soldiers of Islam, brave Janissaries and Spahis! The great city of Constantine, which has defied armies for a thousand years, lies breached before our cannons. Tomorrow morning, when the drums sound, we attack with one single will! I promise you glory, honor, and the gratitude of our people. But hear my strict command: when the city is taken, you shall not touch the churches, nor lay hands on the women, children, and priests who surrender! Constantinople shall become the shining jewel of our empire!',
    clauseTitle: 'The Seizure of Imperial Roman Destiny and Protection of Citizens',
    originalClause: 'Ya ben İstanbul\'u alırım, ya İstanbul beni!... Hristiyan halka ve kiliselerine dokunulmaya!',
    modernClause: 'Either I take Istanbul, or Istanbul takes me! Let no harm come to the Christian population or their sanctuaries who submit.',
    significance: 'Brought an end to the 1,500-year Roman imperial line and established Istanbul as the capital of the Ottoman Empire for 470 years.',
    lastingImpact: 'One of the greatest pivotal turning points in Eurasian geopolitical history.',
    audioSpeechText: 'Brave soldiers and Janissaries! The ancient city of Constantinople lies breached before our cannons. Either I take this city, or this city takes me! Tomorrow we charge the walls with one heart. But hear my royal command: protect the peaceful citizens and churches, for this city shall become the glorious capital of our empire!'
  }
];

export const SPEECHES_RULERS_EGYPT_NEAR_EAST: PrimarySourceDocument[] = RAW_EGYPT_NEAR_EAST_RULER_SPEECHES.map((item) => ({
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
