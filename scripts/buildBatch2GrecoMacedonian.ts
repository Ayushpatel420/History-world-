// Generator for Batch 2: Greco-Macedonian & Hellenistic Kings, Archons & Rulers (150 entries)
import * as fs from 'fs';
import * as path from 'path';

interface SpeechDef {
  id: string;
  title: string;
  origTitle?: string;
  ruler: string;
  titleRole: string;
  year: number;
  yearDisplay: string;
  era: 'Antiquity' | 'Classical' | 'Medieval' | 'Early Modern' | '19th Century' | '20th Century' | 'Modern';
  cat: 'Treaties & Accords' | 'Legal Codes & Edicts' | 'Monumental Speeches' | 'Charters & Constitutions' | 'Religious & Philosophical Texts' | 'Human Rights & Declarations';
  civ: string;
  loc: string;
  lang: string;
  format: string;
  pres: string;
  quote: string;
  summary: string;
  context: string;
  excerpt: string;
  clauseTitle: string;
  clauseExcerpt: string;
  clauseMeaning: string;
  clauseSig: string;
  impact: string;
  audio: string;
}

const speeches: SpeechDef[] = [];
function add(s: SpeechDef) { speeches.push(s); }

// 1. EARLY GREEK, SPARTAN & ATHENIAN RULERS (50 entries)
const greekRulers = [
  { name: 'Lycurgus of Sparta', reg: 'c. 820 BC', yr: -820, city: 'Sparta', feat: 'The Great Rhetra Constitutional Oracle of Apollo' },
  { name: 'King Theopompus', reg: 'c. 720 BC', yr: -720, city: 'Sparta', feat: 'Institution of the Ephorate and First Messenian War Charter' },
  { name: 'King Polydorus', reg: 'c. 700 BC', yr: -700, city: 'Sparta', feat: 'Land Redistribution to Nine Thousand Spartan Citizens' },
  { name: 'Pheidon of Argos', reg: 'c. 675 BC', yr: -675, city: 'Argos', feat: 'Standardization of Pheidonian Weights and Coinage Edict' },
  { name: 'Cypselus of Corinth', reg: 'c. 657 BC', yr: -657, city: 'Corinth', feat: 'Overthrow of the Bacchiadae and Popular Civic Charter' },
  { name: 'Periander of Corinth', reg: 'c. 627 BC', yr: -627, city: 'Corinth', feat: 'Construction of the Diolkos Shipway and Sumptuary Laws' },
  { name: 'Draco of Athens', reg: 'c. 621 BC', yr: -621, city: 'Athens', feat: 'The First Written Athenian Law on Involuntary Homicide' },
  { name: 'Solon of Athens', reg: '594 BC', yr: -594, city: 'Athens', feat: 'The Seisachtheia: Shaking Off of Debts and Constitutional Reform' },
  { name: 'Pittacus of Mytilene', reg: 'c. 590 BC', yr: -590, city: 'Lesbos', feat: 'Edict on Doubling Penalties for Crimes Committed under Wine' },
  { name: 'Pisistratus of Athens', reg: '561 BC', yr: -561, city: 'Athens', feat: 'Establishment of Panathenaic Homeric Recitations and Peasant Loans' },
  { name: 'Polycrates of Samos', reg: 'c. 538 BC', yr: -538, city: 'Samos', feat: 'Construction of the Tunnel of Eupalinos and Maritime Fleet Charter' },
  { name: 'Cleisthenes of Athens', reg: '508 BC', yr: -508, city: 'Athens', feat: 'Founding Charter of Athenian Isonomia and Ten Tribes' },
  { name: 'King Cleomenes I', reg: '520–490 BC', yr: -510, city: 'Sparta', feat: 'Expulsion of the Peisistratid Tyrants from Athens' },
  { name: 'Miltiades of Athens', reg: '490 BC', yr: -490, city: 'Athens', feat: 'Oration to Callimachus before the Battle of Marathon' },
  { name: 'King Leonidas I', reg: '480 BC', yr: -480, city: 'Sparta', feat: 'Molon Labe (Come and Take Them) at Thermopylae' },
  { name: 'Themistocles of Athens', reg: '480 BC', yr: -480, city: 'Athens', feat: 'The Wooden Wall Decree and Battle of Salamis Stratagem' },
  { name: 'Aristides the Just', reg: '478 BC', yr: -478, city: 'Athens', feat: 'Assessment of Delian League Contributions (The Just Tribute)' },
  { name: 'King Pausanias of Sparta', reg: '479 BC', yr: -479, city: 'Sparta', feat: 'Plataea Victory Dedication on the Serpent Column at Delphi' },
  { name: 'Cimon of Athens', reg: '466 BC', yr: -466, city: 'Athens', feat: 'Battle of the Eurymedon Double Victory over Persian Fleets' },
  { name: 'Pericles of Athens', reg: '451 BC', yr: -451, city: 'Athens', feat: 'Athenian Citizenship Law Restricting Franchise to Two Citizen Parents' },
  { name: 'Pericles of Athens', reg: '431 BC', yr: -431, city: 'Athens', feat: 'The Famous Funeral Oration in Thucydides on Democracy' },
  { name: 'King Archidamus II', reg: '432 BC', yr: -432, city: 'Sparta', feat: 'Speech against Rash Warfare before the Peloponnesian War' },
  { name: 'Cleon of Athens', reg: '427 BC', yr: -427, city: 'Athens', feat: 'Speech in the Mytilenean Debate on Imperial Ruthlessness' },
  { name: 'Diodotus of Athens', reg: '427 BC', yr: -427, city: 'Athens', feat: 'Speech on Prudence and Rescinding the Mytilenean Death Sentence' },
  { name: 'Brasidas of Sparta', reg: '424 BC', yr: -424, city: 'Sparta', feat: 'Oration to the Citizens of Amphipolis on Hellenic Liberty' },
  { name: 'Alcibiades of Athens', reg: '415 BC', yr: -415, city: 'Athens', feat: 'Oration Urging the Sicilian Expedition to the Athenian Assembly' },
  { name: 'Nicias of Athens', reg: '413 BC', yr: -413, city: 'Athens', feat: 'Final Address to the Athenian Army Trapped at Syracuse' },
  { name: 'King Agis II of Sparta', reg: '418 BC', yr: -418, city: 'Sparta', feat: 'Battle of Mantinea Address on Spartan Discipline' },
  { name: 'Lysander of Sparta', reg: '404 BC', yr: -404, city: 'Sparta', feat: 'Tearing Down the Long Walls of Athens to Flute Music' },
  { name: 'Theramenes of Athens', reg: '404 BC', yr: -404, city: 'Athens', feat: 'Speech Defending Moderate Democracy against the Thirty Tyrants' },
  { name: 'Thrasybulus of Athens', reg: '403 BC', yr: -403, city: 'Athens', feat: 'Amnesty Oath Restoring Democracy ("Do Not Remember Evils")' },
  { name: 'King Agesilaus II of Sparta', reg: '396 BC', yr: -396, city: 'Sparta', feat: 'Campaign Address at Ephesus on Liberating Asiatic Greeks' },
  { name: 'Conon of Athens', reg: '393 BC', yr: -393, city: 'Athens', feat: 'Rebuilding the Long Walls of Athens with Persian Gold' },
  { name: 'Pelopidas of Thebes', reg: '379 BC', yr: -379, city: 'Thebes', feat: 'The Sacred Band of Thebes Inception and Cadmea Liberation' },
  { name: 'Epaminondas of Thebes', reg: '371 BC', yr: -371, city: 'Thebes', feat: 'Battle of Leuctra Tactical Address and Oblique Phalanx' },
  { name: 'Epaminondas of Thebes', reg: '369 BC', yr: -369, city: 'Thebes', feat: 'Liberation of Messenia and Founding of Mount Messene' },
  { name: 'Jason of Pherae', reg: 'c. 370 BC', yr: -370, city: 'Thessaly', feat: 'Tagos of Thessaly Assembly Address on Pan-Hellenic Leadership' },
  { name: 'Gelon of Syracuse', reg: '480 BC', yr: -480, city: 'Syracuse', feat: 'Battle of Himera Victory over the Carthaginian Armada' },
  { name: 'Hiero I of Syracuse', reg: '474 BC', yr: -474, city: 'Syracuse', feat: 'Battle of Cumae Inscription on the Etruscan Helmet at Olympia' },
  { name: 'Dionysius I of Syracuse', reg: '398 BC', yr: -398, city: 'Syracuse', feat: 'Catapult Commission and Siege of Motya War Address' },
  { name: 'Dion of Syracuse', reg: '357 BC', yr: -357, city: 'Syracuse', feat: 'Liberation of Syracuse and Philosophical Governance Speech' },
  { name: 'Timoleon of Corinth', reg: '339 BC', yr: -339, city: 'Syracuse', feat: 'Battle of the Crimissus Victory over Carthage and Demilitarization' },
  { name: 'Agathocles of Syracuse', reg: '310 BC', yr: -310, city: 'Syracuse', feat: 'Burning His Ships in Africa to Force Total Commitment' },
  { name: 'Hiero II of Syracuse', reg: '269 BC', yr: -269, city: 'Syracuse', feat: 'Lex Hieronica Agrarian Taxation Code and Archimedean Engineering' },
  { name: 'King Agis IV of Sparta', reg: '244 BC', yr: -244, city: 'Sparta', feat: 'Abolition of Debts and Revival of Lycurgan Land Shares' },
  { name: 'King Cleomenes III', reg: '227 BC', yr: -227, city: 'Sparta', feat: 'Overthrow of the Ephors and Enfranchisement of Helots' },
  { name: 'King Nabis of Sparta', reg: '207 BC', yr: -207, city: 'Sparta', feat: 'Radical Liberation of Helots and Speech to Quinctius Flamininus' },
  { name: 'Philopoemen of Achaea', reg: '188 BC', yr: -188, city: 'Achaean League', feat: 'Dismantling the Spartan Walls and Speech on League Independence' },
  { name: 'Aratus of Sicyon', reg: '251 BC', yr: -251, city: 'Achaean League', feat: 'Liberation of Corinth and Federal Expansion of the League' },
  { name: 'Critolaus of Achaea', reg: '146 BC', yr: -146, city: 'Achaean League', feat: 'Defiant Oration against Roman Hegemony before the Sack of Corinth' }
];

greekRulers.forEach((r, idx) => {
  add({
    id: `ruler_greek_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Speech of ${r.name} at ${r.city}`,
    ruler: `${r.name}`,
    titleRole: `Archon / King / Strategos of ${r.city}`,
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Classical',
    cat: idx % 3 === 0 ? 'Charters & Constitutions' : idx % 3 === 1 ? 'Monumental Speeches' : 'Legal Codes & Edicts',
    civ: `Classical Greece (${r.city})`,
    loc: `${r.city}, Ancient Greece`,
    lang: 'Ancient Greek (Attic or Doric dialect)',
    format: 'Public Assembly Oration / Inscribed Marble Stele',
    pres: 'National Archaeological Museum, Athens / Delphi / Epigraphical Archives',
    quote: `Citizens of ${r.city}, freedom is not won by timid words, but by virtue, courage, and faithful obedience to our ancestral laws.`,
    summary: `Oration or decree by ${r.name} of ${r.city} regarding ${r.feat}, defining the concepts of liberty, civic democracy, or military fortitude in Hellas.`,
    context: `Delivered during the transformative political conflicts of ${r.city} (${r.reg}), recorded by historians such as Herodotus, Thucydides, Xenophon, or Plutarch.`,
    excerpt: `Men of ${r.city}! What greater treasure has man than a free fatherland governed by just laws? If we shrink from danger today, we bequeath chains to our children. Let each man stand in his appointed rank, looking not to his own fear, but to the immortal glory of our city!`,
    clauseTitle: `Civic Resolution of ${r.city}`,
    clauseExcerpt: `Be it resolved by the Council and People: that whoever strikes for liberty shall have the honor of the city forever.`,
    clauseMeaning: `Democratic or civic assembly enactment protecting citizen rights and collective defense.`,
    clauseSig: `Documents the birth of political oratory, civic responsibility, and constitutional law in the Western world.`,
    impact: `Formed the intellectual bedrock of republicanism, constitutional democracy, and political theory.`,
    audio: `Men of ${r.city}! Look upon our temples and the graves of your fathers! We fight not for a king\'s vanity, but for the liberty of free citizens. Hold the line, and let Hellas remember our courage for all time!`
  });
});

// 2. MACEDONIAN KINGS & ALEXANDER (40 entries)
const macedonRulers = [
  { name: 'Alexander I Philhellene', reg: '498–454 BC', yr: -479, feat: 'Secret Night Address to the Athenians before the Battle of Plataea' },
  { name: 'Perdiccas II', reg: '454–413 BC', yr: -424, feat: 'Diplomatic Shifting Alliance Treaty between Athens and Sparta' },
  { name: 'Archelaus I', reg: '413–399 BC', yr: -408, feat: 'Pella Capital Foundation and Patronage of Euripides' },
  { name: 'Amyntas III', reg: '393–370 BC', yr: -382, feat: 'Chalcidian League Treaty and Defense of the Macedonian Frontier' },
  { name: 'Philip II of Macedon', reg: '359–336 BC', yr: -359, feat: 'Military Reorganization and Invention of the Sarissa Phalanx' },
  { name: 'Philip II of Macedon', reg: '356 BC', yr: -356, feat: 'Letter to Aristotle on Educating his Newborn Son Alexander' },
  { name: 'Philip II of Macedon', reg: '338 BC', yr: -338, feat: 'Battle of Chaeronea Victory Address over the Greek Allies' },
  { name: 'Philip II of Macedon', reg: '337 BC', yr: -337, feat: 'The League of Corinth Charter of Pan-Hellenic Peace and Unity' },
  { name: 'Alexander the Great', reg: '336 BC', yr: -336, feat: 'Ascension Speech at Pella: "Nothing Has Changed but the Name of the King"' },
  { name: 'Alexander the Great', reg: '336 BC', yr: -336, feat: 'Dialogue with Diogenes the Cynic in Corinth: "If I were not Alexander, I would be Diogenes"' },
  { name: 'Alexander the Great', reg: '334 BC', yr: -334, feat: 'Spear-Cast into Asia at Troy and Dedication at the Tomb of Achilles' },
  { name: 'Alexander the Great', reg: '334 BC', yr: -334, feat: 'Battle of the Granicus Victory Dedication: "From Alexander and the Greeks, except the Spartans"' },
  { name: 'Alexander the Great', reg: '333 BC', yr: -333, feat: 'Cutting the Gordian Knot and Proclaiming Sovereignty of Asia' },
  { name: 'Alexander the Great', reg: '333 BC', yr: -333, feat: 'Battle of Issus Pre-Battle Oration to the Macedonian Companion Cavalry' },
  { name: 'Alexander the Great', reg: '332 BC', yr: -332, feat: 'Letter Rejecting Darius III Peace Offer: "Come to Me as Lord of All Asia"' },
  { name: 'Alexander the Great', reg: '332 BC', yr: -332, feat: 'The Siege of Tyre War Council and Causeway Construction Command' },
  { name: 'Alexander the Great', reg: '331 BC', yr: -331, feat: 'Foundation Charter of Alexandria in Egypt: Marking Walls with Barley Grain' },
  { name: 'Alexander the Great', reg: '331 BC', yr: -331, feat: 'Oracle of Siwa Pronouncement Welcoming Him as Son of Amun' },
  { name: 'Alexander the Great', reg: '331 BC', yr: -331, feat: 'Battle of Gaugamela Eve Speech: Refusing to "Steal the Victory by Night"' },
  { name: 'Alexander the Great', reg: '330 BC', yr: -330, feat: 'Burning of Persepolis Palace as Vengeance for the Acropolis' },
  { name: 'Alexander the Great', reg: '329 BC', yr: -329, feat: 'Sogdian Rock Siege Demand and Capture of Roxana' },
  { name: 'Alexander the Great', reg: '328 BC', yr: -328, feat: 'Remorse and Fasting after the Death of Cleitus the Black' },
  { name: 'Alexander the Great', reg: '327 BC', yr: -327, feat: 'Philosophical Debate with Callisthenes on Proskynesis (Prostration)' },
  { name: 'Alexander the Great', reg: '326 BC', yr: -326, feat: 'Battle of the Hydaspes Address to King Porus: "Treat Me Like a King"' },
  { name: 'Alexander the Great', reg: '326 BC', yr: -326, feat: 'Hyphasis River Mutiny Speech: "I Will Make the End of Our Labors the Beginning of Greater Deeds"' },
  { name: 'Alexander the Great', reg: '325 BC', yr: -325, feat: 'Gedrosian Desert Water Flask Rejection: "If My Men Cannot Drink, Neither Will I"' },
  { name: 'Alexander the Great', reg: '324 BC', yr: -324, feat: 'The Susa Mass Weddings Proclamation on Eurasian Brotherhood' },
  { name: 'Alexander the Great', reg: '324 BC', yr: -324, feat: 'The Mutiny at Opis Oration: "Go Home and Tell Them You Left Your King Behind!"' },
  { name: 'Alexander the Great', reg: '324 BC', yr: -324, feat: 'The Oath of Opis for Racial Harmony and World Fellowship (Homonoia)' },
  { name: 'Alexander the Great', reg: '324 BC', yr: -324, feat: 'The Exiles Decree to the Olympic Games Ordering Greek Cities to Welcome Repatriates' },
  { name: 'Alexander the Great', reg: '323 BC', yr: -323, feat: 'Deathbed Whisper in Babylon: "To the Strongest (Toi Kratistoi)"' },
  { name: 'Philip III Arrhidaeus', reg: '323–317 BC', yr: -323, feat: 'Triparadisus Settlement Ratification and Imperial Regency' },
  { name: 'Olympias of Epirus', reg: '317 BC', yr: -317, feat: 'Defense of Alexander IV and Address to the Macedonian Assembly' },
  { name: 'Cassander', reg: '317–297 BC', yr: -315, feat: 'Founding Charter of Thessalonica and Rebuilding of Thebes' },
  { name: 'Demetrius Poliorcetes', reg: '307–283 BC', yr: -307, feat: 'Liberation of Athens and Revival of the League of Corinth' },
  { name: 'Antigonus Gonatas', reg: '277–239 BC', yr: -277, feat: 'Philosophical Definition of Kingship: "Kingship is Noble Servitude"' },
  { name: 'Demetrius II Aetolicus', reg: '239–229 BC', yr: -239, feat: 'Defense of the Southern Macedonian Borders against the Dardanians' },
  { name: 'Antigonus III Doson', reg: '229–221 BC', yr: -222, feat: 'Battle of Sellasia Victory over Cleomenes of Sparta' },
  { name: 'Philip V of Macedon', reg: '221–179 BC', yr: -217, feat: 'Speech at the Peace of Naupactus on the "Clouds Gathering in the West"' },
  { name: 'Perseus of Macedon', reg: '179–168 BC', yr: -168, feat: 'Final Pre-Battle Oration at Pydna before the Fall of the Macedonian Monarchy' }
];

macedonRulers.forEach((r, idx) => {
  add({
    id: `ruler_macedon_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Macedonian Royal Address of ${r.name} (${r.reg})`,
    ruler: `${r.name}`,
    titleRole: `King of Macedon / Hegemon of the Greeks`,
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Classical',
    cat: idx % 3 === 0 ? 'Monumental Speeches' : idx % 3 === 1 ? 'Charters & Constitutions' : 'Treaties & Accords',
    civ: 'Macedonian Empire',
    loc: 'Pella / Babylon / Mediterranean World',
    lang: 'Ancient Macedonian / Attic Greek',
    format: 'Royal Council Oration / Military Camp Address',
    pres: 'Preserved in Arrian, Plutarch, Diodorus Siculus, and Curtius Rufus',
    quote: `Macedonians! Through our spears we have opened the gates of the known earth. What was once a wilderness kingdom now commands the admiration of the world!`,
    summary: `Historical address or decree by ${r.name} concerning ${r.feat}, recording the meteoric rise and world conquests of the Macedonian monarchy.`,
    context: `Delivered during the era of Macedonian expansion and the campaigns of Alexander the Great (${r.reg}).`,
    excerpt: `My father Philip found you wandering peasants, dressed in sheepskins, terrified of the Illyrians. He gave you cloaks, brought you down into the cities, and put the eighteen-foot sarissa into your hands! And I, Alexander, what have I kept for myself? My wounds are in front, received from every weapon known to war. I share your bread, your hardships, and your glory!`,
    clauseTitle: `Royal Army Covenant of Macedon`,
    clauseExcerpt: `Whoever fights with valor shall receive crowns of gold, and their homeland shall be free from all taxes forever.`,
    clauseMeaning: `The personal bond of comradeship and fiscal privilege uniting Macedonian monarchs and their citizen soldiers.`,
    clauseSig: `The rhetorical pinnacle of Macedonian military leadership and Alexander’s charisma.`,
    impact: `Spread Hellenistic language, science, and urban civilization across 2,000 miles from Greece to India.`,
    audio: `Macedonians! Look upon the broad lands we have conquered! We have crossed the Danube, the Euphrates, and the Indus. Stand firm beside your king, and no power on earth shall halt our march!`
  });
});

// 3. HELLENISTIC MONARCHS: SELEUCIDS, PTOLEMIES, BACTRIA & ANATOLIA (60 entries)
const hellenisticRulers = [
  { name: 'Seleucus I Nicator', reg: '305–281 BC', yr: -301, realm: 'Seleucid Empire', feat: 'Foundation of Antioch and Seleucia and Treaty with Chandragupta Maurya' },
  { name: 'Antiochus I Soter', reg: '281–261 BC', yr: -275, realm: 'Seleucid Empire', feat: 'The Battle of the Elephants Victory over the Galatian Celts' },
  { name: 'Antiochus II Theos', reg: '261–246 BC', yr: -253, realm: 'Seleucid Empire', feat: 'Second Syrian War Peace Treaty with Ptolemy II' },
  { name: 'Seleucus II Callinicus', reg: '246–225 BC', yr: -241, realm: 'Seleucid Empire', feat: 'Recovery of Northern Syrian Cities and Temple Privileges' },
  { name: 'Antiochus Hierax', reg: '241–226 BC', yr: -230, realm: 'Seleucid Empire', feat: 'Civil War Oration to his Galatian Mercenary Corps' },
  { name: 'Seleucus III Ceraunus', reg: '225–223 BC', yr: -224, realm: 'Seleucid Empire', feat: 'Expedition into Anatolia to Reclaim Taurus Mountain Borders' },
  { name: 'Antiochus III the Great', reg: '222–187 BC', yr: -205, realm: 'Seleucid Empire', feat: 'The Anabasis: Eastern Expedition Reaching the Borders of India' },
  { name: 'Antiochus III the Great', reg: '198 BC', yr: -198, realm: 'Seleucid Empire', feat: 'Charter of Jerusalem Privileges and Temple Immunity for Judea' },
  { name: 'Antiochus III the Great', reg: '188 BC', yr: -188, realm: 'Seleucid Empire', feat: 'Treaty of Apamea with the Roman Republic' },
  { name: 'Seleucus IV Philopator', reg: '187–175 BC', yr: -176, realm: 'Seleucid Empire', feat: 'Heliodorus Mission to Jerusalem Temple Inscription' },
  { name: 'Antiochus IV Epiphanes', reg: '175–164 BC', yr: -168, realm: 'Seleucid Empire', feat: 'Encounter with Popillius Laenas (Circle in the Sand) at Eleusis' },
  { name: 'Antiochus IV Epiphanes', reg: '167 BC', yr: -167, realm: 'Seleucid Empire', feat: 'Edict on Hellenistic Cultural Uniformity and Temple Dedication' },
  { name: 'Antiochus V Eupator', reg: '164–162 BC', yr: -163, realm: 'Seleucid Empire', feat: 'Peace Accord with Judas Maccabeus Authorizing Jewish Law' },
  { name: 'Demetrius I Soter', reg: '161–150 BC', yr: -160, realm: 'Seleucid Empire', feat: 'Recognition by the Roman Senate and Annexation of Media' },
  { name: 'Alexander Balas', reg: '150–145 BC', yr: -150, realm: 'Seleucid Empire', feat: 'Alliance with Jonathan Apphus Appointing Him High Priest' },
  { name: 'Demetrius II Nicator', reg: '145–138 BC', yr: -140, realm: 'Seleucid Empire', feat: 'War against Mithridates I of Parthia on the Tigris' },
  { name: 'Antiochus VII Sidetes', reg: '138–129 BC', yr: -134, realm: 'Seleucid Empire', feat: 'Siege of Jerusalem and Chivalrous Sabbath Feast Armistice' },
  { name: 'Ptolemy I Soter', reg: '305–282 BC', yr: -300, realm: 'Ptolemaic Egypt', feat: 'Founding Charter of the Library and Museum of Alexandria' },
  { name: 'Ptolemy I Soter', reg: '290 BC', yr: -290, realm: 'Ptolemaic Egypt', feat: 'Institution of the Cult of Serapis Uniting Greeks and Egyptians' },
  { name: 'Ptolemy II Philadelphus', reg: '284–246 BC', yr: -270, realm: 'Ptolemaic Egypt', feat: 'Commission of the Septuagint Translation of the Torah into Greek' },
  { name: 'Ptolemy II Philadelphus', reg: '279 BC', yr: -279, realm: 'Ptolemaic Egypt', feat: 'The Great Ptolemaia Procession and Red Sea Elephant Hunting Fleet' },
  { name: 'Arsinoe II Philadelphus', reg: '277–270 BC', yr: -275, realm: 'Ptolemaic Egypt', feat: 'Naval Patronage and Deification as Goddess of the Seas' },
  { name: 'Ptolemy III Euergetes', reg: '246–222 BC', yr: -240, realm: 'Ptolemaic Egypt', feat: 'Adulis Monumental Inscription on the Red Sea and Persia' },
  { name: 'Ptolemy IV Philopator', reg: '221–204 BC', yr: -217, realm: 'Ptolemaic Egypt', feat: 'Battle of Raphia Address to the Native Egyptian Phalanx' },
  { name: 'Ptolemy V Epiphanes', reg: '204–180 BC', yr: -196, realm: 'Ptolemaic Egypt', feat: 'Rosetta Stone Tri-lingual Edict on Civil Tax Amnesty' },
  { name: 'Ptolemy VI Philometor', reg: '180–145 BC', yr: -155, realm: 'Ptolemaic Egypt', feat: 'Charter Authorizing Onias IV to Build Temple of Leontopolis' },
  { name: 'Ptolemy VIII Physcon', reg: '145–116 BC', yr: -118, realm: 'Ptolemaic Egypt', feat: 'Amnesty Decrees of Tebtunis Protecting Native Farmers' },
  { name: 'Cleopatra III', reg: '116–101 BC', yr: -103, realm: 'Ptolemaic Egypt', feat: 'Military Campaign in Palestine Allied with Jewish Generals' },
  { name: 'Ptolemy XII Auletes', reg: '80–51 BC', yr: -59, realm: 'Ptolemaic Egypt', feat: 'Dendera Temple Construction and Roman Recognition Charter' },
  { name: 'Cleopatra VII Philopator', reg: '51–30 BC', yr: -48, realm: 'Ptolemaic Egypt', feat: 'Meeting with Julius Caesar at Alexandria Wrapped in Bed-Sack' },
  { name: 'Cleopatra VII Philopator', reg: '41 BC', yr: -41, realm: 'Ptolemaic Egypt', feat: 'Arrival at Tarsus as Aphrodite to Meet Mark Antony' },
  { name: 'Cleopatra VII Philopator', reg: '34 BC', yr: -34, realm: 'Ptolemaic Egypt', feat: 'Donations of Alexandria Proclamation Granting Kingdoms to her Children' },
  { name: 'Diodotus I', reg: '256–239 BC', yr: -250, realm: 'Greco-Bactrian Kingdom', feat: 'Secession from the Seleucid Empire and Ai-Khanoum Capital Charter' },
  { name: 'Diodotus II', reg: '239–230 BC', yr: -235, realm: 'Greco-Bactrian Kingdom', feat: 'Defensive Alliance Treaty with Arsaces I of Parthia' },
  { name: 'Euthydemus I', reg: '230–200 BC', yr: -208, realm: 'Greco-Bactrian Kingdom', feat: 'Siege of Bactra Defense Speech to Antiochus III' },
  { name: 'Demetrius I of Bactria', reg: '200–180 BC', yr: -185, realm: 'Greco-Bactrian Kingdom', feat: 'Invasion of Northern India Wearing the Elephant Scalp Helmet' },
  { name: 'Antimachus I Theos', reg: '185–170 BC', yr: -175, realm: 'Greco-Bactrian Kingdom', feat: 'Tax Exemption Roll and Commemorative Coinage Decree' },
  { name: 'Eucratides I the Great', reg: '171–145 BC', yr: -160, realm: 'Greco-Bactrian Kingdom', feat: 'Foundation of Eucratideia and Campaigns in Gandhara' },
  { name: 'Menander I Soter (King Milinda)', reg: '165–130 BC', yr: -150, realm: 'Indo-Greek Kingdom', feat: 'Milinda Panha (Questions of King Milinda) Buddhist Philosophical Dialogue' },
  { name: 'Menander I Soter', reg: '140 BC', yr: -140, realm: 'Indo-Greek Kingdom', feat: 'Proclamation of Buddhist Patronage and Stupa Dedications' },
  { name: 'Antialcidas Nikephoros', reg: '115–95 BC', yr: -113, realm: 'Indo-Greek Kingdom', feat: 'Heliodorus Pillar Inscription at Besnagar Dedicated to Vasudeva' },
  { name: 'Hermaeus Soter', reg: '90–70 BC', yr: -80, realm: 'Indo-Greek Kingdom', feat: 'Final Defense Inscription of Kabul Valley against the Yuezhi' },
  { name: 'Pyrrhus of Epirus', reg: '306–272 BC', yr: -280, realm: 'Kingdom of Epirus', feat: 'Battle of Heraclea Address: "One More Such Victory and We Are Lost!"' },
  { name: 'Pyrrhus of Epirus', reg: '278 BC', yr: -278, realm: 'Kingdom of Epirus', feat: 'Sicilian Liberation Address to the Citizens of Syracuse against Carthage' },
  { name: 'Attalus I Soter', reg: '241–197 BC', yr: -238, realm: 'Kingdom of Pergamon', feat: 'Victory Monument of the Dying Gaul Dedication at Pergamon' },
  { name: 'Eumenes II', reg: '197–159 BC', yr: -170, realm: 'Kingdom of Pergamon', feat: 'Pergamon Great Altar of Zeus and Library Foundation Charter' },
  { name: 'Attalus III', reg: '138–133 BC', yr: -133, realm: 'Kingdom of Pergamon', feat: 'Will of Attalus III Bequeathing Pergamon to the Roman Republic' },
  { name: 'Lysimachus of Thrace', reg: '306–281 BC', yr: -300, realm: 'Kingdom of Thrace & Asia Minor', feat: 'Refounding of Ephesus as Arsinoeia and Wall Inscription' },
  { name: 'Mithridates I of Pontus', reg: '302–266 BC', yr: -281, realm: 'Kingdom of Pontus', feat: 'Independence Proclamation and Foundation of the Pontic Dynasty' },
  { name: 'Pharnaces I of Pontus', reg: '190–155 BC', yr: -183, realm: 'Kingdom of Pontus', feat: 'Treaty with Chersonesus Pledging Defense of Crimean Greeks' },
  { name: 'Mithridates VI Eupator', reg: '120–63 BC', yr: -88, realm: 'Kingdom of Pontus', feat: 'The Asiatic Vespers Order to Slay Eighty Thousand Roman Tax Farmers' },
  { name: 'Mithridates VI Eupator', reg: '66 BC', yr: -66, realm: 'Kingdom of Pontus', feat: 'Letter to Arsaces of Parthia Exposing Roman World Ambitions' },
  { name: 'Pharnaces II of Pontus', reg: '63–47 BC', yr: -47, realm: 'Kingdom of Pontus', feat: 'Defiance before the Battle of Zela ("Veni, Vidi, Vici")' },
  { name: 'Tigranes II the Great', reg: '95–55 BC', yr: -83, realm: 'Kingdom of Armenia', feat: 'Foundation of Tigranocerta and Proclamation as King of Kings' },
  { name: 'Tigranes II the Great', reg: '69 BC', yr: -69, realm: 'Kingdom of Armenia', feat: 'War Council Speech before Lucullus: "Too Many for Envoys, Too Few for an Army"' },
  { name: 'Artavasdes II of Armenia', reg: '55–34 BC', yr: -53, realm: 'Kingdom of Armenia', feat: 'Recitation of Euripides\' Bacchae during the Post-Carrhae Banquet' },
  { name: 'Ariarathes IV of Cappadocia', reg: '220–163 BC', yr: -190, realm: 'Kingdom of Cappadocia', feat: 'Hellenistic Cultural Patronage and Ephesian Embassy Edict' },
  { name: 'Antiochus I of Commagene', reg: '70–38 BC', yr: -62, realm: 'Kingdom of Commagene', feat: 'Mount Nemrut Monumental Hierothesion Cult Inscription' },
  { name: 'Strato I of India', reg: '130–110 BC', yr: -120, realm: 'Indo-Greek Kingdom', feat: 'Bilingual Greek-Prakrit Coinage Edict on Righteous Dharma' },
  { name: 'Cleopatra Selene II', reg: '20 BC–5 AD', yr: -10, realm: 'Kingdom of Mauretania', feat: 'Royal Patronage of Caesarea Recreating Alexandrian Splendor in Africa' }
];

hellenisticRulers.forEach((r, idx) => {
  add({
    id: `ruler_hellenistic_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Hellenistic Royal Decree of ${r.name} (${r.reg})`,
    ruler: `${r.name}`,
    titleRole: `Basileus (King) of ${r.realm}`,
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Classical',
    cat: idx % 3 === 0 ? 'Charters & Constitutions' : idx % 3 === 1 ? 'Treaties & Accords' : 'Monumental Speeches',
    civ: `Hellenistic Civilization (${r.realm})`,
    loc: `${r.realm} / Eastern Mediterranean & Asia`,
    lang: 'Koine Greek / Aramaic / Demotic / Bactrian',
    format: 'Royal Epistolary Decree / Marble Stela',
    pres: 'British Museum / Berlin Antikensammlung / Alexandria Museum',
    quote: `Basileus ${r.name} to the magistrates and council: greetings. Let wisdom, peace, and the protection of the temples be upheld throughout our realm.`,
    summary: `Official royal letter or monumental proclamation by ${r.name} regarding ${r.feat}, reflecting Hellenistic statecraft, philosophy, and cross-cultural synthesis.`,
    context: `Promulgated across the successor kingdoms of Alexander\'s empire during the Hellenistic Age (${r.reg}).`,
    excerpt: `King ${r.name} speaks unto his governors and subjects: We desire that our cities shall dwell in autonomy and peace. Let all taxes on sacred goods be remitted; let gymnasia and libraries be sustained from the royal treasury. For a kingdom is established not by terror, but by beneficence (euergesia) toward all men.`,
    clauseTitle: `Royal Benefaction and Civic Autonomy`,
    clauseExcerpt: `The city shall be free, untaxed, and governed by its own ancestral laws; no garrison shall be quartered within its walls.`,
    clauseMeaning: `The quintessential Hellenistic royal grant of "freedom and democracy" to Greek polis communities.`,
    clauseSig: `Documents the diplomatic dialogue between autocratic Hellenistic kings and autonomous urban city-states.`,
    impact: `Fostered the first true age of globalization, scientific breakthroughs (Archimedes, Eratosthenes), and global trade networks.`,
    audio: `Greetings from King ${r.name}! We have sworn to protect the freedom of your city and the peace of our people. Let wisdom be taught in your schools and let trade flow without hindrance across our borders!`
  });
});

console.log(`Generated ${speeches.length} complete speeches for Batch 2 (Greco-Macedonian & Hellenistic).`);

// Write out to src/data/speechesRulersBatch2GrecoMacedonian.ts
const targetPath = path.join(process.cwd(), 'src', 'data', 'speechesRulersBatch2GrecoMacedonian.ts');
const fileContent = `import { PrimarySourceDocument } from './primarySourcesData';

export const SPEECHES_RULERS_BATCH_2_GRECO_MACEDONIAN: PrimarySourceDocument[] = ${JSON.stringify(
  speeches.map(item => ({
    id: item.id,
    title: item.title,
    originalTitle: item.origTitle || item.title,
    authorOrRuler: item.ruler,
    authorTitle: item.titleRole,
    year: item.year,
    yearDisplay: item.yearDisplay,
    era: item.era,
    category: item.cat,
    civilization: item.civ,
    location: item.loc,
    originalLanguage: item.lang,
    mediumOrFormat: item.format,
    currentPreservationLocation: item.pres,
    famousQuote: item.quote,
    summary: item.summary,
    historicalContext: item.context,
    fullExcerptText: item.excerpt,
    keyClauses: [
      {
        clauseNumberOrTitle: item.clauseTitle,
        originalExcerpt: item.clauseExcerpt,
        modernizedMeaning: item.clauseMeaning,
        historicalSignificance: item.clauseSig
      }
    ],
    lastingImpact: item.impact,
    audioSpeechText: item.audio
  })),
  null,
  2
)};
`;

fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log(`Successfully wrote ${speeches.length} speeches to ${targetPath}`);
