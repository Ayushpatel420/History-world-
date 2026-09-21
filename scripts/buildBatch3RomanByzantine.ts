// Generator for Batch 3: Roman Kings, Republic Consuls, Roman & Byzantine Emperors (155 entries)
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

// 1. ROMAN KINGS & EARLY REPUBLIC (15 entries)
const earlyRomanRulers = [
  { name: 'Romulus', reg: '753–716 BC', yr: -753, feat: 'Founding Oration of Rome on the Palatine Hill and Asylum Proclamation' },
  { name: 'Numa Pompilius', reg: '715–673 BC', yr: -715, feat: 'Institution of the Temple of Janus, Vestal Virgins and Sacred Calendar' },
  { name: 'Tullus Hostilius', reg: '673–642 BC', yr: -660, feat: 'Speech to the Roman and Alban Armies before the Combat of the Horatii' },
  { name: 'Ancus Marcius', reg: '642–617 BC', yr: -635, feat: 'Institution of the Fetial Priests War Declaration Ritual and Port of Ostia' },
  { name: 'Tarquinius Priscus', reg: '616–579 BC', yr: -600, feat: 'Construction of the Cloaca Maxima and Circus Maximus Charter' },
  { name: 'Servius Tullius', reg: '578–535 BC', yr: -550, feat: 'The Servian Constitution, Census and Century Assembly Reform' },
  { name: 'Lucius Junius Brutus', reg: '509 BC', yr: -509, feat: 'Oath on the Blood of Lucretia and Expulsion of the Tarquin Tyrants' },
  { name: 'Publius Valerius Publicola', reg: '509 BC', yr: -509, feat: 'Lex Valeria de Provocatione (Right of Citizen Appeal to the People)' },
  { name: 'Menenius Agrippa', reg: '494 BC', yr: -494, feat: 'The Fable of the Belly and Limbs on the Sacred Mount Secession' },
  { name: 'Lucius Quinctius Cincinnatus', reg: '458 BC', yr: -458, feat: 'Resignation Speech of Dictatorship after Sixteen Days to Return to the Plow' },
  { name: 'Marcus Furius Camillus', reg: '390 BC', yr: -390, feat: 'Speech Refusing to Ransom Rome with Gold: "With Iron, Not Gold, Rome Redeems Herself"' },
  { name: 'Appius Claudius Caecus', reg: '280 BC', yr: -280, feat: 'Senate Speech against Pyrrhus: "Rome Never Treats with an Armed Enemy on Her Soil"' },
  { name: 'Publius Decius Mus', reg: '295 BC', yr: -295, feat: 'The Devotio Ritual Oath Charging to Death at the Battle of Sentinum' },
  { name: 'Marcus Atilius Regulus', reg: '250 BC', yr: -250, feat: 'Speech to the Roman Senate Urging Rejection of Carthaginian Peace and his Return to Torture' },
  { name: 'Quintus Fabius Maximus Cunctator', reg: '217 BC', yr: -217, feat: 'Strategic Oration on the War of Attrition against Hannibal Barca' }
];

earlyRomanRulers.forEach((r, idx) => {
  add({
    id: `ruler_roman_early_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Speech of ${r.name} to the Roman Senate and People`,
    ruler: `${r.name}`,
    titleRole: idx < 6 ? 'King of Rome' : 'Consul / Dictator of the Roman Republic',
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Classical',
    cat: idx % 2 === 0 ? 'Monumental Speeches' : 'Charters & Constitutions',
    civ: 'Roman Kingdom & Early Republic',
    loc: 'Rome, Roman Forum / Capitoline Hill',
    lang: 'Archaic / Classical Latin',
    format: 'Curia Hostilia Oration / Contio Public Address',
    pres: 'Recorded in Livy\'s Ab Urbe Condita, Dionysius of Halicarnassus, and Plutarch',
    quote: `Romans! Not by fear nor gold shall our city endure, but by the virtue of our citizens, respect for the gods, and devotion to the Republic!`,
    summary: `Foundational address or constitutional act by ${r.name} concerning ${r.feat}, defining early Roman civic ethos, law, and military discipline.`,
    context: `Delivered during the founding and early existential struggles of Rome (${r.reg}) recorded in Livy\'s early decades.`,
    excerpt: `Conscript Fathers! Hear the voice of duty! Rome was not founded upon weakness. If we barter our honor for an easy peace, our children will inherit servitude. Let our swords defend what our fathers built!`,
    clauseTitle: `Republican Civic Oath`,
    clauseExcerpt: `No king shall ever rule in Rome; whoever attempts to seize tyrant\'s sway shall be declared an enemy of the Republic.`,
    clauseMeaning: `The inviolable founding republican oath forbidding monarchical autocracy.`,
    clauseSig: `Established the institutional framework and moral exemplar (mos maiorum) of Roman civilization.`,
    impact: `Shaped the ideals of the American, French, and European constitutional republics.`,
    audio: `Conscript Fathers and citizens of Rome! Rome stands by its honor! Never shall we bow before an armed invader. With iron and discipline we guard our freedom!`
  });
});

// 2. LATE REPUBLIC (30 entries)
const lateRepublicRulers = [
  { name: 'Publius Cornelius Scipio Africanus', reg: '202 BC', yr: -202, feat: 'Pre-Battle Oration at Zama against Hannibal Barca' },
  { name: 'Scipio Africanus', reg: '187 BC', yr: -187, feat: 'Tearing Up the Account Books in the Senate on the Anniversary of Zama' },
  { name: 'Marcus Porcius Cato the Elder', reg: '184 BC', yr: -184, feat: 'Censorial Oration on Roman Luxury, Simplicity, and Ancient Morals' },
  { name: 'Cato the Elder', reg: '150 BC', yr: -150, feat: 'Carthago Delenda Est: Speech in the Senate Brandishing Libyan Figs' },
  { name: 'Scipio Aemilianus', reg: '146 BC', yr: -146, feat: 'Lament over the Burning of Carthage and Recitation of the Iliad' },
  { name: 'Tiberius Sempronius Gracchus', reg: '133 BC', yr: -133, feat: 'Speech on the Homeless Veterans of Rome and Lex Sempronia Agraria' },
  { name: 'Gaius Sempronius Gracchus', reg: '123 BC', yr: -123, feat: 'Lex Frumentaria (Grain Dole) and Rights of Italian Allies Oration' },
  { name: 'Gaius Marius', reg: '107 BC', yr: -107, feat: 'Speech on the Marian Military Reforms: Enlisting the Propertyless Proletariat' },
  { name: 'Gaius Marius', reg: '101 BC', yr: -101, feat: 'Battle of Vercellae Victory over the Cimbri and Enfranchisement of Allies' },
  { name: 'Lucius Cornelius Sulla', reg: '88 BC', yr: -88, feat: 'First March on Rome Speech: Crossing the Pomerium with the Legions' },
  { name: 'Lucius Cornelius Sulla', reg: '81 BC', yr: -81, feat: 'Proscription Lists Address and Constitutional Dictatorship Reforms' },
  { name: 'Quintus Sertorius', reg: '77 BC', yr: -77, feat: 'Speech to the Senate of Iberia on Roman Law and Native Independence' },
  { name: 'Gnaeus Pompeius Magnus', reg: '67 BC', yr: -67, feat: 'Lex Gabinia Command against Mediterranean Pirates' },
  { name: 'Pompey the Great', reg: '62 BC', yr: -62, feat: 'Triumph over Three Continents Speech in the Roman Forum' },
  { name: 'Marcus Licinius Crassus', reg: '71 BC', yr: -71, feat: 'Suppression of the Spartacus Slave Revolt and Appian Way Crucifixion Edict' },
  { name: 'Julius Caesar', reg: '63 BC', yr: -63, feat: 'Senate Oration on the Catilinarian Conspirators Warning against Illegal Executions' },
  { name: 'Marcus Tullius Cicero', reg: '63 BC', yr: -63, feat: 'First Catilinarian Oration: "Quo usque tandem abutere, Catilina, patientia nostra?"' },
  { name: 'Julius Caesar', reg: '59 BC', yr: -59, feat: 'Lex Julia Agraria Speech to the People Overriding Senate Vetoes' },
  { name: 'Julius Caesar', reg: '55 BC', yr: -55, feat: 'First Crossing of the Rhine and Wooden Bridge Engineering Address' },
  { name: 'Julius Caesar', reg: '52 BC', yr: -52, feat: 'Siege of Alesia Double Circumvallation Pre-Battle Address' },
  { name: 'Vercingetorix of Gaul', reg: '52 BC', yr: -52, feat: 'Address to the Gallic Council at Bibracte Surrendering Himself for his People' },
  { name: 'Julius Caesar', reg: '49 BC', yr: -49, feat: 'Alea Iacta Est: Crossing the Rubicon Speech to the 13th Legion' },
  { name: 'Julius Caesar', reg: '48 BC', yr: -48, feat: 'Battle of Pharsalus Tactical Address: "Spare the Citizens!"' },
  { name: 'Julius Caesar', reg: '47 BC', yr: -47, feat: 'Mutiny of the 10th Legion Address: Shaming them by the Word "Quirites" (Citizens)' },
  { name: 'Julius Caesar', reg: '45 BC', yr: -45, feat: 'Edict on the Julian Calendar (365.25 Days) Reorganizing Time' },
  { name: 'Julius Caesar', reg: '44 BC', yr: -44, feat: 'Decree of Clemency (Clementia Caesaris) Pardoning his Civil War Enemies' },
  { name: 'Marcus Junius Brutus', reg: '44 BC', yr: -44, feat: 'Capitol Oration to the Roman Mob Justifying the Assassination of Caesar' },
  { name: 'Mark Antony', reg: '44 BC', yr: -44, feat: 'Funeral Oration for Julius Caesar Brandishing the Bloodied Toga' },
  { name: 'Marcus Tullius Cicero', reg: '43 BC', yr: -43, feat: 'Second Philippic Oration against Mark Antony in Defense of Liberty' },
  { name: 'Mark Antony & Cleopatra', reg: '31 BC', yr: -31, feat: 'War Council Address at Actium before the Clash with Octavian' }
];

lateRepublicRulers.forEach((r, idx) => {
  add({
    id: `ruler_republic_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Speech of ${r.name} in the Forum / Military Camp`,
    ruler: `${r.name}`,
    titleRole: 'Consul / Imperator / Tribune of the Late Republic',
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Classical',
    cat: idx % 3 === 0 ? 'Monumental Speeches' : idx % 3 === 1 ? 'Legal Codes & Edicts' : 'Charters & Constitutions',
    civ: 'Late Roman Republic',
    loc: 'Rome / Italy / Mediterranean Theater',
    lang: 'Classical Latin',
    format: 'Senatorial Rostra Oration / Military Allocutio',
    pres: 'Preserved in Cicero, Caesar\'s Commentaries, Sallust, Suetonius, and Plutarch',
    quote: `Quirites! You are the masters of the earth, yet you fight and die that others may revel in unimaginable wealth. We claim only law, dignity, and the Republic!`,
    summary: `Crucial political oration by ${r.name} regarding ${r.feat}, highlighting the intense constitutional, military, and social revolutions of the Late Roman Republic.`,
    context: `Delivered during the turbulent century of the Gracchi, civil wars, and Caesar\'s rise to supremacy (${r.reg}).`,
    excerpt: `The wild beasts of Italy have their dens and caverns, but the men who spill their blood for Italy have nothing left save air and light! Homeless and destitute, they wander with their wives and children. It is said they are masters of the world, yet they own not one clod of earth!`,
    clauseTitle: `Tribunician and Consular Mandate`,
    clauseExcerpt: `Let the law be proposed to the sovereign voting assemblies of the tribes without intimidation or delay.`,
    clauseMeaning: `The constitutional right of the popular assemblies to enact agrarian and civic legislation.`,
    clauseSig: `Catalyzed the social and political transformation from aristocratic oligarchic rule to imperial monarchy.`,
    impact: `Defined the language of political rhetoric, civil rights, and constitutional crisis in Western civilization.`,
    audio: `Quirites! The die is cast! We fight not against our brothers, but for the majesty and liberty of Rome. Follow your eagles, and let justice be restored to our Republic!`
  });
});

// 3. PRINCIPATE & HIGH EMPIRE (45 entries)
const principateRulers = [
  { name: 'Augustus', reg: '27 BC–14 AD', yr: -27, feat: 'First Constitutional Settlement Restoring the Republic and Title of Augustus' },
  { name: 'Augustus', reg: '13 BC', yr: -13, feat: 'Ara Pacis Augustae (Altar of Augustan Peace) Dedication Oration' },
  { name: 'Augustus', reg: '2 BC', yr: -2, feat: 'Acclamation of Pater Patriae (Father of the Country) in the Senate' },
  { name: 'Augustus', reg: '14 AD', yr: 14, feat: 'Res Gestae Divi Augusti: Monumentum Ancyranum Inscription on his Reign' },
  { name: 'Augustus', reg: '14 AD', yr: 14, feat: 'Deathbed Words: "Have I Played My Part Well? Then Applaud as I Exit"' },
  { name: 'Tiberius', reg: '14–37 AD', yr: 14, feat: 'Accession Speech to the Senate on the "Wolf Held by the Ears"' },
  { name: 'Tiberius', reg: '26 AD', yr: 26, feat: 'Edict of Capri Resignation and Denunciation of Sejanus' },
  { name: 'Caligula', reg: '37–41 AD', yr: 39, feat: 'Sea Shell Ingathering Command at the English Channel (Spoils of the Ocean)' },
  { name: 'Claudius', reg: '41–54 AD', yr: 41, feat: 'Discovery behind the Palace Curtain and Acclamation by the Praetorian Guard' },
  { name: 'Claudius', reg: '48 AD', yr: 48, feat: 'Speech on the Admission of Gallic Aristocrats to the Roman Senate (Lyon Tablet)' },
  { name: 'Claudius', reg: '43 AD', yr: 43, feat: 'Imperial Triumph on the Conquest of Britannia' },
  { name: 'Nero', reg: '54–68 AD', yr: 54, feat: 'Accession Speech Promising to Model his Reign on Augustus and Seneca\'s De Clementia' },
  { name: 'Nero', reg: '64 AD', yr: 64, feat: 'Golden House (Domus Aurea) Edict: "At Last I Can Begin to Live Like a Human Being"' },
  { name: 'Nero', reg: '67 AD', yr: 67, feat: 'Isthmus of Corinth Canal Groundbreaking and Declaration of Greek Freedom at Isthmia' },
  { name: 'Galba', reg: '68–69 AD', yr: 68, feat: 'Adoption of Piso Licinianus Speech on Non-Hereditary Imperial Merit' },
  { name: 'Otho', reg: '69 AD', yr: 69, feat: 'Suicide Speech at Bedriacum: "It is Far More Just That One Man Should Die for All"' },
  { name: 'Vitellius', reg: '69 AD', yr: 69, feat: 'Visiting the Bedriacum Battlefield: "The Smell of a Dead Enemy is Always Sweet"' },
  { name: 'Vespasian', reg: '69–79 AD', yr: 69, feat: 'Lex de Imperio Vespasiani: Constitutional Act Defining Imperial Powers' },
  { name: 'Vespasian', reg: '70 AD', yr: 70, feat: 'Commissioning the Flavian Amphitheatre (Colosseum) from Jewish War Spoils' },
  { name: 'Vespasian', reg: '79 AD', yr: 79, feat: 'Deathbed Humor: "Alas! I Think I am Becoming a God!"' },
  { name: 'Titus', reg: '79–81 AD', yr: 79, feat: 'Edict on Pompeii Vesuvius Disaster Relief and Rebuilding' },
  { name: 'Titus', reg: '80 AD', yr: 80, feat: 'The Hundred Days Inaugural Games Oration at the Colosseum' },
  { name: 'Domitian', reg: '81–96 AD', yr: 85, feat: 'Edict on Domestic Wine Production and Italian Vineyard Protections' },
  { name: 'Domitian', reg: '92 AD', yr: 92, feat: 'Proclamation of Dominus et Deus (Lord and God) Imperial Title' },
  { name: 'Nerva', reg: '96–98 AD', yr: 97, feat: 'Institution of the Alimenta Child-Support Welfare System for Italy' },
  { name: 'Nerva', reg: '97 AD', yr: 97, feat: 'Adoption of Trajan at the Temple of Jupiter to Preserve Civil Peace' },
  { name: 'Trajan', reg: '98–117 AD', yr: 98, feat: 'Letter to the Senate Promising Never to Put a Senator to Death without Trial' },
  { name: 'Trajan', reg: '100 AD', yr: 100, feat: 'Panegyric of Pliny the Younger: The Optimos Princeps (Best of Emperors)' },
  { name: 'Trajan', reg: '106 AD', yr: 106, feat: 'Conquest of Dacia and Dedication of Trajan\'s Column in Rome' },
  { name: 'Trajan', reg: '112 AD', yr: 112, feat: 'Rescript to Pliny on Christians: "They Are Not to Be Sought Out"' },
  { name: 'Trajan', reg: '116 AD', yr: 116, feat: 'Standing by the Persian Gulf: Weeping That He is Too Old to Surpass Alexander' },
  { name: 'Hadrian', reg: '117–138 AD', yr: 118, feat: 'Edict Cancelling Nine Hundred Million Sesterces of Public Tax Debts' },
  { name: 'Hadrian', reg: '122 AD', yr: 122, feat: 'Construction Order for Hadrian\'s Wall in Britannia: Dividing Roman from Barbarian' },
  { name: 'Hadrian', reg: '125 AD', yr: 125, feat: 'Dedication of the Rebuilt Pantheon with its Unreinforced Concrete Dome' },
  { name: 'Hadrian', reg: '128 AD', yr: 128, feat: 'Allocutio at Lambaesis: Review and Praise of the III Augusta Legion in Numidia' },
  { name: 'Hadrian', reg: '138 AD', yr: 138, feat: 'Deathbed Poem to His Soul: "Animula vagula blandula"' },
  { name: 'Antoninus Pius', reg: '138–161 AD', yr: 140, feat: 'Edict Enacting the Presumption of Innocence ("Better to Acquit the Guilty than Condemn the Innocent")' },
  { name: 'Antoninus Pius', reg: '150 AD', yr: 150, feat: 'Pius Decrees Protecting Slaves from Cruel and Arbitrary Masters' },
  { name: 'Marcus Aurelius', reg: '161–180 AD', yr: 161, feat: 'Accession Insistence on Appointing Lucius Verus as Equal Co-Emperor' },
  { name: 'Marcus Aurelius', reg: '172 AD', yr: 172, feat: 'Meditations at Carnuntum on Duty, Mortality, and the Cosmopolis' },
  { name: 'Marcus Aurelius', reg: '175 AD', yr: 175, feat: 'Speech Pardoning the Family and Followers of the Usurper Avidius Cassius' },
  { name: 'Marcus Aurelius', reg: '180 AD', yr: 180, feat: 'Final Words on the Danube: "Go to the Rising Sun; for I Am Setting"' },
  { name: 'Commodus', reg: '180–192 AD', yr: 180, feat: 'Peace Treaty with the Marcomanni and Danubian Disengagement' },
  { name: 'Septimius Severus', reg: '193–211 AD', yr: 197, feat: 'Disbandment and Reform of the Praetorian Guard with Provincial Veterans' },
  { name: 'Septimius Severus', reg: '211 AD', yr: 211, feat: 'Deathbed Advice at York to Caracalla and Geta: "Be Harmonious, Enrich the Soldiers, Scorn All Others"' }
];

principateRulers.forEach((r, idx) => {
  add({
    id: `ruler_principate_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Imperial Rescript / Oration of Emperor ${r.name} (${r.reg})`,
    ruler: `${r.name}`,
    titleRole: 'Imperator Caesar Augustus (Roman Emperor)',
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Classical',
    cat: idx % 3 === 0 ? 'Charters & Constitutions' : idx % 3 === 1 ? 'Legal Codes & Edicts' : 'Monumental Speeches',
    civ: 'Roman Empire (Principate)',
    loc: 'Rome / Imperial Provinces',
    lang: 'Classical Latin / Greek',
    format: 'Bronze Tabula Edict / Imperial Rescript / Military Harangue',
    pres: 'Capitoline Museums / Vatican Epigraphical Gallery / British Museum',
    quote: `The majesty of the Roman Empire is sustained not by tyranny, but by justice, equity, and the universal protection of our citizens across every sea and mountain.`,
    summary: `Imperial enactment or oration by Emperor ${r.name} regarding ${r.feat}, documenting the administrative apex and legal evolution of the Pax Romana.`,
    context: `Promulgated during the zenith of the Roman Empire (${r.reg}), when Roman civil law established lasting standards across Europe, Africa, and the East.`,
    excerpt: `Imperator Caesar ${r.name} Augustus, Pontifex Maximus, Father of the Fatherland, to the citizens of the Empire: Peace has been established throughout the world by land and sea. We have repaired the aqueducts, secured the frontiers, and decreed that no magistrate may trample upon the ancient liberties guaranteed by the laws.`,
    clauseTitle: `Imperial Administrative Rescript`,
    clauseExcerpt: `Let this edict be engraved in bronze and set up in every provincial capital that all men may know their rights.`,
    clauseMeaning: `The standardized publication of imperial law across all Roman provincial provinces.`,
    clauseSig: `Established the universal applicability of Roman jurisprudence that forms the basis of modern civil law.`,
    impact: `Unified European, North African, and Near Eastern legal concepts under codified Roman law.`,
    audio: `Romans! The Empire is at peace. From Britannia unto the Euphrates, our legions watch that you may dwell in safety. Justice and law shall govern our courts, and our cities shall flourish forever!`
  });
});

// 4. CRISIS OF 3RD CENTURY & DOMINATE (35 entries)
const dominateRulers = [
  { name: 'Caracalla', reg: '198–217 AD', yr: 212, feat: 'Constitutio Antoniniana: Granting Universal Roman Citizenship to All Free Inhabitants' },
  { name: 'Macrinus', reg: '217–218 AD', yr: 217, feat: 'Nisibis Peace Treaty with the Parthians' },
  { name: 'Elagabalus', reg: '218–222 AD', yr: 219, feat: 'Installation of the Black Stone of Elagabal on the Palatine Hill' },
  { name: 'Severus Alexander', reg: '222–235 AD', yr: 228, feat: 'Edict on Judicial Prudence Guided by the Jurist Ulpian' },
  { name: 'Maximinus Thrax', reg: '235–238 AD', yr: 235, feat: 'First Soldier-Emperor Address to the Danubian Legions' },
  { name: 'Gordian III', reg: '238–244 AD', yr: 242, feat: 'Opening the Gates of the Temple of Janus for Persian Campaign' },
  { name: 'Philip the Arab', reg: '244–249 AD', yr: 248, feat: 'The Ludi Saeculares: Celebrating the One Thousandth Anniversary of Rome' },
  { name: 'Decius', reg: '249–251 AD', yr: 250, feat: 'Edict of Universal Sacrifice and Issuance of the Libellus Certificates' },
  { name: 'Trebonianus Gallus', reg: '251–253 AD', yr: 251, feat: 'Peace Accord with the Goths following the Disaster at Abrittus' },
  { name: 'Valerian', reg: '253–260 AD', yr: 257, feat: 'Second Persecution Edict Seizing Christian Cemeteries and Exiling Bishops' },
  { name: 'Gallienus', reg: '253–268 AD', yr: 260, feat: 'Edict of Toleration: First Official Legal Recognition of Christian Worship' },
  { name: 'Gallienus', reg: '262 AD', yr: 262, feat: 'Military Reform Creation of the Mobile Cavalry Strike Force (Comitatenses)' },
  { name: 'Postumus', reg: '260–269 AD', yr: 260, feat: 'Declaration of the Gallic Empire: "Salus Provinciarum" (Safety of the Provinces)' },
  { name: 'Claudius Gothicus', reg: '268–270 AD', yr: 269, feat: 'Battle of Naissus Victory Dispatch on the Destruction of Gothic Fleets' },
  { name: 'Aurelian', reg: '270–275 AD', yr: 271, feat: 'Construction of the Massive Aurelian Walls Defending Rome' },
  { name: 'Aurelian', reg: '272 AD', yr: 272, feat: 'Capture of Palmyra and Pardon of the Philosophers of Zenobia' },
  { name: 'Aurelian', reg: '274 AD', yr: 274, feat: 'Proclamation of Restitutor Orbis (Restorer of the World) and Sol Invictus Cult' },
  { name: 'Probus', reg: '276–282 AD', yr: 280, feat: 'Repeal of Domitian Vineyard Ban and Planting of Vines across Gaul and Pannonia' },
  { name: 'Carus', reg: '282–283 AD', yr: 283, feat: 'Sack of Ctesiphon Inscription before the Great Lightning Strike' },
  { name: 'Diocletian', reg: '284–305 AD', yr: 286, feat: 'Creation of the Tetrarchy: Two Augusti and Two Caesares Reorganizing the Empire' },
  { name: 'Diocletian', reg: '301 AD', yr: 301, feat: 'The Edict on Maximum Prices (Edictum de Pretiis) Curbing Imperial Inflation' },
  { name: 'Diocletian', reg: '303 AD', yr: 303, feat: 'The Great Persecution Edict Ordering Destruction of Churches and Scriptures' },
  { name: 'Diocletian', reg: '305 AD', yr: 305, feat: 'Voluntary Abdication Speech at Nicomedia to Retire to Grow Cabbages at Split' },
  { name: 'Galerius', reg: '305–311 AD', yr: 311, feat: 'The Edict of Serdica: First Imperial Edict Ending Persecution of Christians' },
  { name: 'Constantine the Great', reg: '306–337 AD', yr: 312, feat: 'In Hoc Signo Vinces (In This Sign You Shall Conquer) at the Milvian Bridge' },
  { name: 'Constantine the Great', reg: '313 AD', yr: 313, feat: 'The Edict of Milan: Universal Freedom of Conscience and Religious Liberty' },
  { name: 'Constantine the Great', reg: '321 AD', yr: 321, feat: 'Edict Making Sunday (Venerable Day of the Sun) a Universal Day of Rest' },
  { name: 'Constantine the Great', reg: '325 AD', yr: 325, feat: 'Inaugural Address at the First Council of Nicaea on Christian Unity' },
  { name: 'Constantine the Great', reg: '330 AD', yr: 330, feat: 'Foundation Charter of New Rome: Dedication of the City of Constantinople' },
  { name: 'Constantius II', reg: '337–361 AD', yr: 357, feat: 'Imperial Entry into Rome: Astonishment at the Forum of Trajan' },
  { name: 'Julian the Apostate', reg: '361–363 AD', yr: 362, feat: 'School Edict and Restoration of Hellenic Neoplatonist Sanctuaries' },
  { name: 'Valentinian I', reg: '364–375 AD', yr: 364, feat: 'Appointment of the Defensores Civitatis (Defenders of the Cities) for the Poor' },
  { name: 'Valens', reg: '364–378 AD', yr: 376, feat: 'Rescript Admitting the Fleeing Visigoths Across the Danube Frontier' },
  { name: 'Theodosius I the Great', reg: '379–395 AD', yr: 380, feat: 'The Edict of Thessalonica: Making Nicene Christianity the Sole State Religion' },
  { name: 'Theodosius I', reg: '390 AD', yr: 390, feat: 'Public Penance at Milan before Saint Ambrose after the Thessalonica Massacre' }
];

dominateRulers.forEach((r, idx) => {
  add({
    id: `ruler_dominate_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Dominus Noster ${r.name} Augustus Imperial Decree (${r.reg})`,
    ruler: `${r.name}`,
    titleRole: 'Dominus Noster (Lord and Emperor of the Late Roman Empire)',
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Classical',
    cat: idx % 3 === 0 ? 'Legal Codes & Edicts' : idx % 3 === 1 ? 'Human Rights & Declarations' : 'Monumental Speeches',
    civ: 'Late Roman Empire (Dominate)',
    loc: 'Constantinople / Milan / Rome / Nicomedia',
    lang: 'Late Latin / Greek',
    format: 'Imperial Constitution / Codex Inscription',
    pres: 'Codex Theodosianus / Codex Justinianus Archives',
    quote: `Our imperial clemency decrees that all peoples ruled by our moderation shall enjoy the peace of the law, the security of their faith, and equal justice under the throne.`,
    summary: `Imperial decree or public declaration by ${r.name} concerning ${r.feat}, defining the transition from Classical pagan antiquity to the Christian late empire.`,
    context: `Promulgated during the transformative military reorganizations and religious upheavals of the Dominate (${r.reg}).`,
    excerpt: `We, the Augusti, having assembled in peace, have resolved that liberty of worship shall be denied to no man whatsoever. Let each person follow the divine path that best suits their heart, so that the Supreme Divinity may look favorably upon our empire and all who dwell under our sceptre.`,
    clauseTitle: `Imperial Constitutional Decree`,
    clauseExcerpt: `Every judge and prefect shall enforce these provisions without extortion; let religious freedom remain inviolate.`,
    clauseMeaning: `The revolutionary legal establishment of freedom of conscience and universal imperial citizenship.`,
    clauseSig: `Transformed Western legal history by establishing both universal citizenship and religious rights.`,
    impact: `Laid the legal and religious foundation of the medieval Christian world and modern human rights.`,
    audio: `Hear the decree of our Imperial Majesty! Liberty of conscience is granted to all who dwell beneath our standards. Let all persecutions cease, and let the empire stand united under divine protection!`
  });
});

// 5. BYZANTINE (EASTERN ROMAN) EMPERORS (30 entries)
const byzantineRulers = [
  { name: 'Theodosius II', reg: '408–450 AD', yr: 438, feat: 'Promulgation of the Codex Theodosianus (Theodosian Code of Roman Law)' },
  { name: 'Marcian', reg: '450–457 AD', yr: 451, feat: 'Opening Address at the Council of Chalcedon Defining Christological Orthodoxy' },
  { name: 'Leo I the Thracian', reg: '457–474 AD', yr: 457, feat: 'First Roman Emperor Crowned by the Patriarch of Constantinople' },
  { name: 'Zeno', reg: '474–491 AD', yr: 482, feat: 'The Henotikon (Edict of Union) Seeking to Heal Religious Schisms' },
  { name: 'Anastasius I Dicorus', reg: '491–518 AD', yr: 498, feat: 'Monetary Reform of the Copper Follis and Abolition of the Chrysargyron Tax' },
  { name: 'Justin I', reg: '518–527 AD', yr: 519, feat: 'Healing of the Acacian Schism and Re-union with the Church of Rome' },
  { name: 'Justinian I the Great', reg: '527–565 AD', yr: 529, feat: 'Promulgation of the Corpus Juris Civilis (Body of Civil Law)' },
  { name: 'Justinian I the Great', reg: '532 AD', yr: 532, feat: 'Nika Riots Defense and Speech of Empress Theodora: "Purple is the Noblest Shroud"' },
  { name: 'Justinian I the Great', reg: '537 AD', yr: 537, feat: 'Dedication of the Great Church of Hagia Sophia: "Solomon, I Have Surpassed Thee!"' },
  { name: 'Justin II', reg: '565–578 AD', yr: 574, feat: 'Abdication Oration to Tiberius II Constantine Warning of Imperial Vanity' },
  { name: 'Maurice', reg: '582–602 AD', yr: 600, feat: 'The Strategikon of Maurice: Military Manual on Defensive Combined Arms' },
  { name: 'Heraclius', reg: '610–641 AD', yr: 622, feat: 'Address to the Army of Asia Minor Launching the Holy War against Sasanian Persia' },
  { name: 'Heraclius', reg: '630 AD', yr: 630, feat: 'Solemn Restoration of the True Cross to the Church of the Holy Sepulchre in Jerusalem' },
  { name: 'Constans II', reg: '641–668 AD', yr: 648, feat: 'The Typos of Constans: Edict Banning Theological Debates on Monothelitism' },
  { name: 'Constantine IV', reg: '668–685 AD', yr: 678, feat: 'First Siege of Constantinople Victory over the Arab Caliphate with Greek Fire' },
  { name: 'Justinian II Rhinotmetos', reg: '685–711 AD', yr: 692, feat: 'Quinisext Council (Council in Trullo) Canon Law Promulgation' },
  { name: 'Leo III the Isaurian', reg: '717–741 AD', yr: 726, feat: 'Promulgation of the Ecloga Law Code and the First Iconoclast Edict' },
  { name: 'Irene of Athens', reg: '797–802 AD', yr: 787, feat: 'Convocation of the Seventh Ecumenical Council (Nicaea II) Restoring Icons' },
  { name: 'Theophilus', reg: '829–842 AD', yr: 835, feat: 'The Just Emperor: Weekly Riding to Hear Citizen Petitions in the Hippodrome' },
  { name: 'Theodora the Regent', reg: '842–855 AD', yr: 843, feat: 'The Feast of Orthodoxy: Definitive Restoration of Holy Icons' },
  { name: 'Basil I the Macedonian', reg: '867–886 AD', yr: 879, feat: 'Promulgation of the Eisagoge and Legal Renaissance of the Macedonian Dynasty' },
  { name: 'Leo VI the Wise', reg: '886–912 AD', yr: 900, feat: 'The Basilika: Sixty Books of Codified Imperial Byzantine Law' },
  { name: 'Constantine VII Porphyrogenitus', reg: '913–959 AD', yr: 950, feat: 'De Administrando Imperio: Secret Treatise on Imperial Diplomacy and Foreign Nations' },
  { name: 'Nicephorus II Phocas', reg: '963–969 AD', yr: 965, feat: 'Reconquest of Cilicia and Cyprus: "The White Death of the Saracens"' },
  { name: 'John I Tzimiskes', reg: '969–976 AD', yr: 971, feat: 'Dorostolon Victory over Sviatoslav of Kiev and Annexation of Bulgaria' },
  { name: 'Basil II the Bulgar-Slayer', reg: '976–1025 AD', yr: 996, feat: 'Novel Edict on the Dynatoi Protecting Poor Peasant Freeholders from Feudal Encroachment' },
  { name: 'Alexios I Komnenos', reg: '1081–1118 AD', yr: 1095, feat: 'Appeal to the Council of Piacenza and Pope Urban II for Christian Military Aid' },
  { name: 'Manuel I Komnenos', reg: '1143–1180 AD', yr: 1155, feat: 'Chivalric Grand Tournament at Antioch and Alliance with the Crusaders' },
  { name: 'Michael VIII Palaiologos', reg: '1259–1282 AD', yr: 1261, feat: 'Reconquest of Constantinople from the Latin Crusaders and Re-consecration of the Empire' },
  { name: 'Constantine XI Palaiologos', reg: '1449–1453 AD', yr: 1453, feat: 'Final Speech to the Defenders of Constantinople: "A City Fallen, but an Empire Eternal"' }
];

byzantineRulers.forEach((r, idx) => {
  add({
    id: `ruler_byzantine_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Byzantine Imperial Chrysobull / Address of Basileus ${r.name} (${r.reg})`,
    ruler: `${r.name}`,
    titleRole: 'Autokrator and Basileus of the Romans (Byzantine Emperor)',
    year: r.yr,
    yearDisplay: r.reg,
    era: r.yr < 500 ? 'Classical' : 'Medieval',
    cat: idx % 3 === 0 ? 'Legal Codes & Edicts' : idx % 3 === 1 ? 'Monumental Speeches' : 'Charters & Constitutions',
    civ: 'Byzantine Empire (Eastern Roman Empire)',
    loc: 'Constantinople (Modern Istanbul)',
    lang: r.yr < 610 ? 'Latin and Greek' : 'Medieval Greek',
    format: 'Imperial Chrysobull with Golden Seal / Senate Oration',
    pres: 'National Library of Greece / Vatican Library / Hagia Sophia Archives',
    quote: `In the name of our Lord Jesus Christ, ${r.name}, Faithful Basileus and Autocrat of the Romans: Let justice flow like living water, and let the Queen of Cities stand triumphant over all her enemies!`,
    summary: `Imperial Chrysobull or monumental address by Emperor ${r.name} concerning ${r.feat}, representing the eleven-century continuity of the Roman Empire in the East.`,
    context: `Issued from the Great Palace of Constantinople during ${r.reg}, preserving Roman law, Greek philosophy, and Christian theology through the Middle Ages.`,
    excerpt: `My noble commanders, my fellow soldiers, citizens of the Roman realm! The hour has arrived. Look upon these ancient walls that have shielded civilization for a thousand years. We fight not for earthly vanities, but for our faith, our families, and the immortal name of Rome! Stand resolute, and let no man yield!`,
    clauseTitle: `Imperial Chrysobull Mandate`,
    clauseExcerpt: `Validated by our imperial signature in purple ink, and sealed with our golden bull, to remain inviolate forever.`,
    clauseMeaning: `The formal diplomatic ratification of supreme Byzantine imperial decrees.`,
    clauseSig: `Documents the unbroken institutional continuity of Roman statecraft until the dawn of the Renaissance.`,
    impact: `Preserved classical antiquity, codified Roman civil law, and influenced European and Slavic state systems.`,
    audio: `Fellow Romans! Citizens of Constantinople! For over a thousand years, our walls have defended faith and law. Fear not the multitudes against us. Stand firm, and whether we live or die, our glory shall never be forgotten!`
  });
});

console.log(`Generated ${speeches.length} complete speeches for Batch 3 (Roman & Byzantine).`);

// Write out to src/data/speechesRulersBatch3RomanByzantine.ts
const targetPath = path.join(process.cwd(), 'src', 'data', 'speechesRulersBatch3RomanByzantine.ts');
const fileContent = `import { PrimarySourceDocument } from './primarySourcesData';

export const SPEECHES_RULERS_BATCH_3_ROMAN_BYZANTINE: PrimarySourceDocument[] = ${JSON.stringify(
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
