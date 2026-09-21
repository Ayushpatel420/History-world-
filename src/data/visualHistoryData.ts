// Visual History Event dataset powered by period-accurate illustrations

import rosettaImg from '../assets/images/rosetta_discovery_1789961713841.jpg';
import tutImg from '../assets/images/tut_tomb_entry_1789961726438.jpg';
import caesarImg from '../assets/images/caesar_rubicon_1789961739445.jpg';
import cyrusImg from '../assets/images/cyrus_babylon_1789961753886.jpg';
import antikytheraImg from '../assets/images/antikythera_lab_1789961764936.jpg';
import suttonImg from '../assets/images/sutton_ship_burial_1789961844698.jpg';
import qumranImg from '../assets/images/qumran_caves_1789961855960.jpg';
import hammurabiImg from '../assets/images/hammurabi_stele_1789961878681.jpg';

export interface VisualHistoryEvent {
  id: string;
  artifactId: string;
  artifactName: string;
  eventTitle: string;
  yearDisplay: string;
  location: string;
  era: string;
  significance: string;
  historicalContext: string;
  visualCraftsmanship: string;
  imageUrl: string;
  imagePrompt: string;
  artStyle: string;
  tags: string[];
}

export const VISUAL_HISTORY_EVENTS: VisualHistoryEvent[] = [
  {
    id: 'vh-rosetta-discovery',
    artifactId: 'rosetta-stone',
    artifactName: 'The Rosetta Stone',
    eventTitle: "Napoleon's Engineers Unearth the Rosetta Inscription at Fort Julien",
    yearDisplay: 'July 15, 1799 AD',
    location: 'Rashid (Rosetta), Nile Delta, Egypt',
    era: 'Napoleonic Egyptian Expedition',
    significance: 'While excavating defensive fortifications during the French campaign in Egypt, Lieutenant Pierre-François Bouchard noticed an inscribed black granodiorite slab embedded within a collapsed wall. Recognizing the parallel hieroglyphic, demotic, and Greek scripts, he preserved the stone, initiating the decipherment of Egyptian hieroglyphs.',
    historicalContext: 'Napoleon had assembled the Commission of the Sciences and Arts alongside his military forces to document Egyptian antiquities. The discovery ignited a furious race among European linguists and philologists that culminated in Champollion solving the linguistic puzzle in 1822.',
    visualCraftsmanship: 'Period oil painting rendering late-18th-century French uniform details, dusty Nile Delta trenches, weathered masonry blocks, and golden desert late-afternoon sunlight hitting the carved granodiorite face.',
    imageUrl: rosettaImg,
    imagePrompt: 'Historical period oil painting of French Napoleonic officers and soldiers in 1799 discovering the carved black granodiorite Rosetta Stone while excavating earthworks at Fort Julien near Rashid in the Nile Delta, dramatic sunlight, realistic historical uniforms, dusty excavations, museum masterpiece quality',
    artStyle: 'Classical Oil on Canvas',
    tags: ['Archaeology', 'Napoleonic', 'Egyptology', 'Decipherment']
  },
  {
    id: 'vh-tut-tomb-breach',
    artifactId: 'tutankhamun-gold-mask',
    artifactName: "Tutankhamun's Golden Funerary Mask",
    eventTitle: "Howard Carter and Lord Carnarvon Breach the Golden Tomb of KV62",
    yearDisplay: 'November 26, 1922 AD',
    location: 'Valley of the Kings, Thebes (Luxor), Egypt',
    era: 'Interwar British Archaeological Golden Age',
    significance: 'After five fruitless seasons in the Valley of the Kings, Howard Carter breached a tiny aperture in the sealed plaster doorway. Holding a candle into the darkness, Lord Carnarvon asked if he could see anything, to which Carter famously gasped: "Yes, wonderful things!" revealing an intact royal burial chamber untouched for over 3,200 years.',
    historicalContext: 'Pharaoh Tutankhamun died mysteriously at age 19 around 1323 BC. Unlike virtually every other New Kingdom tomb that had been looted in antiquity, KV62 had been buried under debris from neighboring tomb constructions, preserving over 5,000 priceless gold, lapis lazuli, and alabaster treasures.',
    visualCraftsmanship: 'Dramatic chiaroscuro composition inspired by vintage flash photography and museum oil paintings, capturing flickering warm candlelight bouncing off golden shrines, alabaster vases, and shadow-draped limestone burial vaults.',
    imageUrl: tutImg,
    imagePrompt: 'Archaeologist Howard Carter and Lord Carnarvon holding lantern illumination as they peer into the golden treasure-filled inner burial chamber of Pharaoh Tutankhamun in the Valley of the Kings 1922, golden shrines gleaming in torchlight, dramatic chiaroscuro, cinematic archaeological historical painting',
    artStyle: 'Dramatic Chiaroscuro Oil',
    tags: ['Egypt', 'Valley of the Kings', 'Pharaohs', 'Archaeology']
  },
  {
    id: 'vh-caesar-rubicon',
    artifactId: 'caesar-elephant-denarius',
    artifactName: "Julius Caesar's Elephant Denarius",
    eventTitle: "Caesar Leads Legio XIII Across the Rubicon: 'Alea Iacta Est'",
    yearDisplay: 'January 10, 49 BC',
    location: 'Rubicon River, Cisalpine Gaul / Northern Italy',
    era: 'Late Roman Republic Civil War',
    significance: 'By commanding his single loyal legion to wade across the boundary river of the Rubicon into Italy proper, Julius Caesar defied the Roman Senate and committed treason, declaring civil war against Pompey the Great and precipitating the ultimate collapse of the Roman Republic.',
    historicalContext: 'To pay his battle-hardened legionaries marching on Rome without access to the official Senatorial treasury, Caesar struck thousands of mobile silver denarii depicting an elephant trampling a horned serpent on the obverse and priestly pontifical instruments on the reverse.',
    visualCraftsmanship: 'Epic historical panorama featuring Caesar in crimson general cloak atop a war steed, Roman bronze lorica segmentata armor, standard-bearers hoisting the silver Aquila eagle, and twilight river reflections under stormy skies.',
    imageUrl: caesarImg,
    imagePrompt: 'Julius Caesar clad in Roman imperial red cloak and bronze lorica cuirass leading the 13th Legion across the shallow Rubicon river at twilight in 49 BC, Roman standard-bearers holding eagle aquila aloft, dramatic cinematic historical masterpiece, oil on canvas historical epic',
    artStyle: 'Monumental History Painting',
    tags: ['Rome', 'Caesar', 'Legions', 'Republic']
  },
  {
    id: 'vh-cyrus-babylon-entry',
    artifactId: 'cyrus-cylinder',
    artifactName: 'The Cyrus Cylinder',
    eventTitle: 'Cyrus the Great Liberates Babylon and Decrees Universal Toleration',
    yearDisplay: 'October 29, 539 BC',
    location: 'Ishtar Gate, Imperial Babylon (Mesopotamia)',
    era: 'Rise of the Achaemenid Persian Empire',
    significance: 'Cyrus II of Persia entered the gates of Babylon without a major siege, deposed the unpopular king Nabonidus, and issued a cuneiform clay cylinder declaring that all deported peoples were free to return to their ancestral lands and rebuild their temples, hailed as the earliest declaration of human and cultural rights.',
    historicalContext: 'Among the liberated populations were the Jewish exiles who had been held captive in Babylon since Nebuchadnezzar II destroyed Jerusalem in 586 BC. Cyrus returned their captured golden temple vessels and funded the reconstruction of the Second Temple.',
    visualCraftsmanship: 'Vibrant Persian historical epic rendering the cobalt-blue glazed brickwork of the Ishtar Gate, carved golden bulls and dragons, Persian Immortals with golden spear-butts, and crowds of diverse Mesopotamian citizens celebrating freedom.',
    imageUrl: cyrusImg,
    imagePrompt: 'King Cyrus the Great of Persia peacefully riding into the magnificent blue-glazed Ishtar Gate of ancient Babylon in 539 BC, golden Persian royal chariot, welcoming Babylonian citizens, monumental lapis lazuli gates with carved bulls and dragons, majestic historical painting',
    artStyle: 'Majestic Persian Historical Oil',
    tags: ['Mesopotamia', 'Persia', 'Human Rights', 'Ancient Near East']
  },
  {
    id: 'vh-antikythera-workshop',
    artifactId: 'antikythera-mechanism',
    artifactName: 'The Antikythera Mechanism',
    eventTitle: 'Hellenistic Mechanicians Calibrate Bronze Planetary Gears on Rhodes',
    yearDisplay: 'c. 150 BC',
    location: 'Island of Rhodes, Hellenistic Greece',
    era: 'Hellenistic Golden Age of Science & Astronomy',
    significance: 'Attributed to the school of Posidonius or the lineage of Archimedes, ancient Greek mechanical astronomers designed the world’s first analog computer. Its 30+ precision bronze differential gear wheels predicted lunar anomalies, solar eclipses, the Saros cycle, and the exact 4-year Olympiad cycle.',
    historicalContext: 'Lost in an ancient Roman shipwreck around 65 BC off the rugged crags of Antikythera Island, this peerless machine proves that ancient Hellenistic technology was over a millennium ahead of Medieval Europe, displaying clockwork sophistication unmatched until the 14th century.',
    visualCraftsmanship: 'Sunlit marble colonnade workshop overlooking the azure Aegean Sea, fine bronze swarf shavings on cedar drafting tables, parchment star charts, armillary spheres, and Greek philosophers holding calipers and compasses.',
    imageUrl: antikytheraImg,
    imagePrompt: 'Hellenistic Greek astronomers and mechanical philosophers in Rhodes examining intricate interlocking bronze gears and dials of the astronomical Antikythera computer on a cedar table beside astrolabes, parchment diagrams and Aegean sea through archway, classical historical academic painting',
    artStyle: 'Classical Antiquities Painting',
    tags: ['Greece', 'Astronomy', 'Engineering', 'Hellenistic']
  },
  {
    id: 'vh-sutton-ship-burial',
    artifactId: 'sutton-hoo-helmet',
    artifactName: 'The Sutton Hoo Helmet',
    eventTitle: 'The Earthen Ship Burial of the Wuffingas King at Sutton Hoo',
    yearDisplay: 'c. 625 AD',
    location: 'Sutton Hoo, River Deben, East Anglia (England)',
    era: 'Early Anglo-Saxon Pagan / Christian Transition',
    significance: 'Anglo-Saxon warriors hauled an 89-foot clinker-built wooden warship up a high cliff above the River Deben, placing their high king (widely believed to be King Rædwald of East Anglia) in the center accompanied by Byzantine silverware, garnet-inlaid gold regalia, and the iconic crest-faced iron helmet.',
    historicalContext: 'Discovered on the estate of Edith Pretty on the brink of World War II in 1939, this discovery shattered the Victorian misconception of the "Dark Ages", proving early Anglo-Saxon England was a world of breathtaking metallurgy, cosmopolitan maritime trade, and legendary epic warrior culture akin to Beowulf.',
    visualCraftsmanship: 'Moody northern twilight atmosphere with marshland mist, flickering pitch torches, richly woven wool mantles clasped with cloisonné garnet brooches, and the colossal silhouette of the wooden ship descending into the earth.',
    imageUrl: suttonImg,
    imagePrompt: 'Anglo-Saxon warriors and mourners in 625 AD burying the king inside an 89-foot wooden clinker-built warship beneath a huge earthen mound in Sutton Hoo East Anglia, torches flaring in evening mist, bronze and garnet armor, dramatic northern historical epic painting',
    artStyle: 'Epic Northern Medieval Canvas',
    tags: ['Anglo-Saxon', 'Britain', 'Archaeology', 'Beowulf']
  },
  {
    id: 'vh-qumran-caves-writing',
    artifactId: 'dead-sea-scrolls-isaiah',
    artifactName: 'The Great Isaiah Scroll',
    eventTitle: 'Essene Scribes Ink Sacred Prophecies in the Judean Desert Caves',
    yearDisplay: 'c. 100 BC',
    location: 'Qumran Plateau, Cliffs Above the Dead Sea, Judea',
    era: 'Second Temple Judean Period',
    significance: 'Members of a strict ascetic Jewish community (commonly identified as the Essenes) carefully copied the Hebrew Bible and community rules onto parchment sheets sewn with linen thread, concealing them inside airtight clay jars within cliffside limestone caves to protect them from approaching Roman legions.',
    historicalContext: 'In 1947, a young Bedouin goatherd tossed a rock into a cliffside cave and heard pottery shatter, leading to the greatest manuscript discovery of the 20th century. The Great Isaiah Scroll is virtually identical to Hebrew texts copied a thousand years later, demonstrating remarkable textual fidelity.',
    visualCraftsmanship: 'Cave interior illuminated by clay oil lamps, long rolls of vellum leather stretched on low desks, deep shadows cast on Judean limestone walls, inkwells and carbon ink pots, with the arid desert canyon visible through the cavern entrance.',
    imageUrl: qumranImg,
    imagePrompt: 'Ancient Essene scribes in white linen tunics in Qumran cave by candlelight in 100 BC carefully inscribing sacred Hebrew calligraphy on long parchment scrolls with inkwell and reed pens, rocky Judean desert cavern background, museum oil painting',
    artStyle: 'Atmospheric Biblical Heritage Oil',
    tags: ['Dead Sea Scrolls', 'Judea', 'Manuscripts', 'Archaeology']
  },
  {
    id: 'vh-hammurabi-stele-laws',
    artifactId: 'code-of-hammurabi',
    artifactName: 'The Code of Hammurabi',
    eventTitle: 'King Hammurabi Receives the Laws of Justice from Shamash',
    yearDisplay: 'c. 1754 BC',
    location: 'Babylon, Central Mesopotamia',
    era: 'Old Babylonian Empire',
    significance: 'Standing atop a sacred ziggurat peak, the Sixth King of Babylon receives the scepter and ring of cosmic justice from Shamash, the solar deity of truth. Below this relief carving, 282 legal statutes were inscribed in Akkadian cuneiform on an eight-foot black basalt stele.',
    historicalContext: 'Establishing the doctrine that the strong must not oppress the weak, the code formalized the lex talionis ("an eye for an eye") and covered commerce, family law, property, wages, and medical malpractice. It stood in the Esagila temple of Marduk for centuries until Elamite raiders seized it as war booty.',
    visualCraftsmanship: 'Monumental Mesopotamian scene featuring rayed solar crowns, tiered stepped ziggurat architecture, burning braziers, cuneiform scribes recording the royal words on clay tablets, and radiant golden shafts of sunlight piercing storm clouds.',
    imageUrl: hammurabiImg,
    imagePrompt: 'King Hammurabi of Babylon in 1754 BC standing before the enthroned Mesopotamian sun god Shamash on a mountain peak, receiving the scepter of divine law, cuneiform basalt stele beside them, golden sunbeams through storm clouds, epic classical archaeological historical painting',
    artStyle: 'Ancient Mesopotamian Epic Oil',
    tags: ['Babylon', 'Law', 'Mesopotamia', 'Antiquity']
  }
];

export function getVisualHistoryForArtifact(artifactId: string): VisualHistoryEvent[] {
  const matches = VISUAL_HISTORY_EVENTS.filter(e => e.artifactId === artifactId);
  if (matches.length > 0) return matches;
  // If no direct match, return relevant curated events
  return VISUAL_HISTORY_EVENTS;
}
