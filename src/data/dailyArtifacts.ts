import { DailyArtifact } from '../types';

export const ALL_DAILY_ARTIFACTS: DailyArtifact[] = [
  {
    id: 'rosetta-stone',
    name: 'The Rosetta Stone',
    subtitle: 'The Key That Unlocked Egyptian Hieroglyphs to the Modern World',
    category: 'Egyptian Hieroglyph',
    era: 'Ptolemaic Dynasty (Hellenistic Egypt)',
    periodYear: '196 BC',
    origin: 'Memphis / Rashid (Rosetta), Nile Delta, Ancient Egypt',
    region: 'North Africa & Nile Valley',
    dateDiscovered: 'July 15, 1799 AD',
    discoveredBy: 'Pierre-François Bouchard (French Napoleonic expedition engineering officer)',
    currentLocation: {
      museum: 'The British Museum',
      city: 'London',
      country: 'United Kingdom',
      galleryRoom: 'Room 4 (Egyptian Sculpture Gallery)',
      accessionNumber: 'EA 24',
      websiteUrl: 'https://www.britishmuseum.org/collection/object/Y_EA24',
      visitingGuide: 'On permanent public display in the center of Room 4 on the Ground Floor. One of the most visited objects in the museum.'
    },
    dimensions: '112.3 cm high × 75.7 cm wide × 28.4 cm thick',
    weight: 'Approximately 760 kg (1,676 lbs)',
    material: 'Granodiorite (compact igneous rock with pinkish feldspar and grey quartz)',
    craftsmanshipTechnique: 'Chiseled epigraphic engraving on smoothed dark granodiorite face; three parallel scripts carved by royal scribes',
    biography: `The Rosetta Stone was carved in 196 BC during the reign of 13-year-old Pharaoh Ptolemy V Epiphanes. Following a period of civil rebellion in Upper Egypt, a synod of Egyptian priests gathered at Memphis to formally establish the divine cult of the young king. To ensure the royal decree was understood across all strata of the multilingual Ptolemaic realm, the priests mandated that it be inscribed in three distinct scripts: Ancient Egyptian Hieroglyphs (the sacred script of priests and monumental architecture), Egyptian Demotic (the cursive daily script of bureaucracy and commerce), and Ancient Greek (the official administrative language of the Ptolemaic ruling dynasty).

Originally erected inside a temple—likely at Sais—the stele stood for centuries until pagan temples were dismantled in late antiquity. Around the 15th century, the stone was reused as humble masonry rubble in the foundations of Fort Julien near the port city of Rashid (Rosetta). On July 15, 1799, French soldiers under Napoleon Bonaparte were digging fortifications when Lieutenant Pierre-François Bouchard spotted the inscribed dark slab. Recognizing its immense historical value, Bouchard notified Napoleon's Commission of the Sciences and Arts. When British forces defeated the French Army in Egypt in 1801, the stone was surrendered to the British Crown under the Treaty of Alexandria and transported to Portsmouth aboard HMS Égyptienne.`,
    historicalContext: `Following Alexander the Great's conquest of Egypt in 332 BC, his general Ptolemy I Soter established a Greek-speaking ruling dynasty that governed Egypt for nearly three centuries. While the court spoke Greek, the overwhelming majority of native Egyptians spoke Demotic Egyptian. By 196 BC, royal authority was severely tested by widespread native Egyptian revolts. The Decree of Memphis was a vital political compromise: in exchange for tax remissions, temple privileges, and legal confirmations granted by the teenage king, the powerful priesthood declared Ptolemy V a living god throughout every major temple in the empire.`,
    significance: `For over 1,400 years, knowledge of how to read ancient Egyptian hieroglyphs had been completely lost to humanity following the closure of non-Christian temples by Roman Emperor Theodosius I in the 4th century AD. Because the Rosetta Stone recorded the exact same decree in both decipherable Ancient Greek and incomprehensible Egyptian scripts, it functioned as the master cryptanalytic cypher for the ancient world. In 1822, French philologist Jean-François Champollion, building upon discoveries by British polymath Thomas Young, demonstrated that hieroglyphs were not merely mystical pictograms, but a sophisticated phonetic writing system recording an actual spoken language. This breakthrough instantly unlocked three millennia of Egyptian literature, royal dynastic chronicles, religious spells, and scientific records.`,
    keyFeatures: [
      'Top register: 14 broken lines of Ancient Egyptian Hieroglyphic script',
      'Middle register: 32 lines of Egyptian Demotic cursive script (the most complete section)',
      'Bottom register: 54 lines of Ancient Greek uppercase text (27 intact lines)',
      'Side edge painted inscription: "CAPTURED IN EGYPT BY THE BRITISH ARMY IN 1801"',
      'Rough, unworked back showing original quarrying marks from Aswan'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/1024px-Rosetta_Stone.JPG',
        caption: 'Frontal view of the Rosetta Stone granodiorite slab at the British Museum',
        angle: 'Frontal Obverse View'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Rosetta_Stone_-_hieroglyphs.jpg/1024px-Rosetta_Stone_-_hieroglyphs.jpg',
        caption: 'High-resolution macro detail of the upper register displaying sacred Egyptian Hieroglyphs and cartouches of Ptolemy',
        angle: 'Hieroglyphic Upper Register'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Rosetta_Stone_demotic_text_detail.jpg/1024px-Rosetta_Stone_demotic_text_detail.jpg',
        caption: 'Detailed close-up of the central Demotic cursive inscription used by everyday scribes',
        angle: 'Demotic Middle Register'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Rosetta_stone_detail_greek.jpg/1024px-Rosetta_stone_detail_greek.jpg',
        caption: 'Detail of the lower Ancient Greek inscription that provided the translation key to Champollion and Young',
        angle: 'Ancient Greek Lower Register'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Frontal Obverse (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/1024px-Rosetta_Stone.JPG', annotation: 'Full frontal perspective showing all three script registers' },
      { angleDeg: 45, label: 'Three-Quarter Right (45°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Rosetta_Stone_-_hieroglyphs.jpg/1024px-Rosetta_Stone_-_hieroglyphs.jpg', annotation: 'Raking light highlights the depth of the hieroglyphic chiseled cartouches' },
      { angleDeg: 90, label: 'Right Edge Profile (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/1024px-Rosetta_Stone.JPG', annotation: '28.4 cm slab thickness demonstrating granodiorite crystalline strata' },
      { angleDeg: 135, label: 'Right-Rear Perspective (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Rosetta_Stone_demotic_text_detail.jpg/1024px-Rosetta_Stone_demotic_text_detail.jpg', annotation: 'Fractured diagonal cleavage where the top right of the stele broke off in antiquity' },
      { angleDeg: 180, label: 'Reverse Unworked Back (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/1024px-Rosetta_Stone.JPG', annotation: 'Rough-hewn rear surface intentionally left unpolished for temple wall mounting' },
      { angleDeg: 225, label: 'Left-Rear Perspective (225°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Rosetta_stone_detail_greek.jpg/1024px-Rosetta_stone_detail_greek.jpg', annotation: 'Quarry gouge marks indicating extraction from the granite outcrops of Aswan' },
      { angleDeg: 270, label: 'Left Edge Profile (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/1024px-Rosetta_Stone.JPG', annotation: 'White painted inventory lettering applied during British military accession in 1802' },
      { angleDeg: 315, label: 'Three-Quarter Left (315°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Rosetta_Stone_-_hieroglyphs.jpg/1024px-Rosetta_Stone_-_hieroglyphs.jpg', annotation: 'Demotic script transition boundary showing crisp linguistic spacing' }
    ],
    funFacts: [
      'The Rosetta Stone is not black basalt as early scholars believed; it is actually a dark grey-pinkish granodiorite.',
      'Thomas Young discovered that royal names like "Ptolemaios" were enclosed inside oval loops called cartouches.',
      'Champollion was so overwhelmed when he confirmed his phonetic hieroglyphic decipherment in 1822 that he ran to his brother\'s office shouting "Je tiens mon affaire!" ("I\'ve got it!") and promptly collapsed unconscious for five days.'
    ],
    relatedSearchTerms: ['hieroglyphs', 'champollion', 'ptolemy', 'egyptology', 'demotic', 'ancient egypt']
  },
  {
    id: 'caesar-elephant-denarius',
    name: 'Denarius of Julius Caesar (The Elephant Coin)',
    subtitle: 'The Silver Propaganda Coin That Financed the Crossing of the Rubicon',
    category: 'Roman Coin',
    era: 'Late Roman Republic (The Civil Wars)',
    periodYear: '49–48 BC',
    origin: 'Military Mobile Mint traveling with Caesar (Gallia Cisalpina / Italy)',
    region: 'Mediterranean & Roman Republic',
    dateDiscovered: 'Various hoard recoveries across Italy, France, and Spain',
    currentLocation: {
      museum: 'The British Museum (Coins and Medals) / Cabinet des Médailles',
      city: 'London / Paris',
      country: 'United Kingdom / France',
      galleryRoom: 'Department of Coins and Medals, Case 12',
      accessionNumber: 'RRC 443/1; BM CRR 1006',
      websiteUrl: 'https://www.britishmuseum.org/collection/object/C_1867-0101-597',
      visitingGuide: 'Preserved in high-security numismatic study collections and rotating Roman Republican currency showcases.'
    },
    dimensions: 'Diameter: 18.5 mm; Thickness: 2.1 mm',
    weight: '3.91 grams (0.138 oz)',
    material: 'Fine Silver (approx. 950‰ argentum bullion)',
    craftsmanshipTechnique: 'Hand-struck coin struck between engraved bronze dies with heavy hammer impact on heated silver planchet',
    biography: `In January 49 BC, Julius Caesar took the fateful step of marching his 13th Legion across the Rubicon River into Italy, sparking the Great Roman Civil War against Pompey the Great and the Optimates of the Roman Senate. To pay his battle-hardened legionaries—who were promised 225 silver denarii per year plus substantial wartime bounties—Caesar established a mobile military mint that marched directly alongside his legions.

Rather than waiting for senatorial authorization from the Roman State Treasury (aerarium saturni), Caesar took command of the state bullion in Rome and struck millions of these iconic silver denarii. The obverse features an imposing war elephant striding right, trampling beneath its forefoot a horned dragon or Gallic war trumpet (carnyx), with the bold name "CAESAR" stamped proudly in the exergue below. The reverse displays the pontifical symbols of Caesar's supreme religious office as Pontifex Maximus: the simpulum (ritual libation ladle), sprinkler (aspergillum), sacrificial axe (securis) adorned with an animal crest, and apex (the pointed cap of the flamen priest).`,
    historicalContext: `Up until 49 BC, Roman coinage was strictly governed by senatorial moneyers (tresviri monetales) who celebrated republican ancestors rather than living political figures. By stamping his own name "CAESAR" boldly across the coin without any senatorial abbreviation (such as S C for Senatus Consulto), Caesar audaciously broadcasted his singular executive authority directly to his troops and the populace. The elephant motif carried multiple layers of potent symbolism: it symbolized his recent crushing victory over the Celtic tribes of Gaul (represented by the horned carnyx dragon), evoked the war elephants of Alexander the Great and Pyrrhus, and playfully punned on the Punic/Phoenician word "caesar", which ancient sources noted meant "elephant".`,
    significance: `The Elephant Denarius was one of the most widely circulated and politically influential coins of antiquity. It revolutionized monetary propaganda, paving the way for the imperial portraiture that would define Roman currency for the next five centuries under Augustus and the Roman Empire. Through its reverse pontifical implements, it reminded every legionary holding the silver coin that Caesar was not merely an outlaw general or rebel magistrate, but Rome\'s sacrosanct Pontifex Maximus—the divine mediator between the Roman gods and the state.`,
    keyFeatures: [
      'Obverse: Majestic African forest elephant walking right, trampling a horned serpent or Celtic carnyx war-horn',
      'Exergue: Crisp raised lettering "CAESAR" struck in relief',
      'Reverse: Four sacred pontifical sacerdotal implements arranged horizontally',
      'Beaded outer border (border of dots) characteristic of Republican mint dies',
      'High silver purity reflecting Caesar\'s requisition of state bullion stores'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Denarius_of_Julius_Caesar_%2849_BC%29.jpg/1024px-Denarius_of_Julius_Caesar_%2849_BC%29.jpg',
        caption: 'Obverse of Caesar\'s Elephant Denarius showing the trampling elephant and "CAESAR" in exergue',
        angle: 'Obverse View (Elephant)'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Denarius-Julius_Caesar-pontifical_instruments-crr_1006.jpg/1024px-Denarius-Julius_Caesar-pontifical_instruments-crr_1006.jpg',
        caption: 'Reverse of the Denarius showing the sacred pontifical implements (simpulum, aspergillum, axe, and flamen\'s apex)',
        angle: 'Reverse View (Pontifical Emblems)'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Eid_Mar_coin.jpg/1024px-Eid_Mar_coin.jpg',
        caption: 'Comparison with the famous counter-coinage: the EID MAR Denarius struck by Brutus celebrating Caesar\'s assassination',
        angle: 'Historical Context Comparison'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Obverse Center (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Denarius_of_Julius_Caesar_%2849_BC%29.jpg/1024px-Denarius_of_Julius_Caesar_%2849_BC%29.jpg', annotation: 'Elephant trunk raised high, crushing Celtic carnyx' },
      { angleDeg: 45, label: 'Obverse Rim Angle (45°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Denarius_of_Julius_Caesar_%2849_BC%29.jpg/1024px-Denarius_of_Julius_Caesar_%2849_BC%29.jpg', annotation: 'Die axis angle showing planchet hammer spread' },
      { angleDeg: 90, label: 'Planchet Edge (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Denarius_of_Julius_Caesar_%2849_BC%29.jpg/1024px-Denarius_of_Julius_Caesar_%2849_BC%29.jpg', annotation: 'Hand-cut planchet edge without mechanical milling, showing hammer strike crack' },
      { angleDeg: 135, label: 'Reverse Rim Angle (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Denarius-Julius_Caesar-pontifical_instruments-crr_1006.jpg/1024px-Denarius-Julius_Caesar-pontifical_instruments-crr_1006.jpg', annotation: 'Sacrificial axe wolf head crest emerging in oblique light' },
      { angleDeg: 180, label: 'Reverse Center (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Denarius-Julius_Caesar-pontifical_instruments-crr_1006.jpg/1024px-Denarius-Julius_Caesar-pontifical_instruments-crr_1006.jpg', annotation: 'Pontifical symbols demonstrating Caesar\'s sacral title of Pontifex Maximus' },
      { angleDeg: 225, label: 'Reverse Flamen Apex (225°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Denarius-Julius_Caesar-pontifical_instruments-crr_1006.jpg/1024px-Denarius-Julius_Caesar-pontifical_instruments-crr_1006.jpg', annotation: 'The spiked leather hat of the priest of Jupiter (flamen dialis)' },
      { angleDeg: 270, label: 'Opposite Edge Profile (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Denarius_of_Julius_Caesar_%2849_BC%29.jpg/1024px-Denarius_of_Julius_Caesar_%2849_BC%29.jpg', annotation: '2.1 mm thickness of pure Republican silver' },
      { angleDeg: 315, label: 'Obverse "CAESAR" Legend (315°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Denarius_of_Julius_Caesar_%2849_BC%29.jpg/1024px-Denarius_of_Julius_Caesar_%2849_BC%29.jpg', annotation: 'Exergual ground line with deeply stamped serif letters C-A-E-S-A-R' }
    ],
    funFacts: [
      'Roman soldiers carried these coins in leather pouches into battles across Spain, Greece, and Egypt, making it the primary financial vehicle of the Roman Civil War.',
      'Suetonius notes that in the Punic tongue of Carthage, "caesar" meant elephant, a heraldic coincidence Caesar gladly exploited.',
      'A single denarius represented roughly one to two days\' wages for a skilled Roman artisan or a soldier\'s base daily pay.'
    ],
    relatedSearchTerms: ['julius caesar', 'roman republic', 'denarius', 'numismatics', 'rubicon', 'roman empire']
  },
  {
    id: 'gothic-knight-plate-armor',
    name: 'Gothic Full Plate Knight Armor of Sigismund of Tyrol',
    subtitle: 'The Pinnacle of Medieval Metallurgy and Articulated Steel Engineering',
    category: 'Medieval Armor',
    era: 'Late Middle Ages (Holy Roman Empire)',
    periodYear: 'c. 1480–1485 AD',
    origin: 'Lorenz Helmschmied of Augsburg & Missaglia Masters, Milan & South Germany',
    region: 'Central Europe / Holy Roman Empire',
    dateDiscovered: 'Habsburg Imperial Armory Continuous Inheritance',
    currentLocation: {
      museum: 'Kunsthistorisches Museum (Hofjagd- und Rüstkammer)',
      city: 'Vienna',
      country: 'Austria',
      galleryRoom: 'Imperial Armory, Hall 1',
      accessionNumber: 'Inv. No. A 62',
      websiteUrl: 'https://www.khm.at/en/visit/collections/imperial-armoury/',
      visitingGuide: 'Displayed mounted on an armored equestrian manikin in the world\'s finest collection of renaissance and late-medieval tournament armor.'
    },
    dimensions: 'Height: 188 cm (6 ft 2 in); Torso width: 52 cm',
    weight: '23.5 kg (51.8 lbs)',
    material: 'Differential tempered high-carbon crucible steel, brass rivets, oil-treated cowhide leather straps',
    craftsmanshipTechnique: 'Hot-forged carbon steel plate beaten over specialized anvils, featuring razor-sharp fluting, cusped leaf borders, and tempered heat treatment',
    biography: `Forged around 1480 for Archduke Sigismund of Tyrol (ruler of Further Austria and a wealthy patron of mining), this majestic suit of armor represents the absolute apogee of the German "Gothic" armoring style. Crafted in the renowned imperial armorers\' guilds of Augsburg and southern Germany, the suit was custom-measured and anatomically fitted to Sigismund's body.

Unlike earlier heavy chainmail hauberks that left warriors vulnerable to blunt force trauma, late-15th-century Gothic plate armor was an engineering marvel. It enveloped the wearer in a seamless, articulated shell of tempered steel. The cuirass (breastplate) was constructed in two overlapping sections connected by sliding internal rivets, allowing the knight to bend, twist, and mount a warhorse without exposing gaps. The helmet is an elegant German sallet (Schaller) paired with a mechanical bevor (chin-guard) that shielded the throat while providing a narrow optical vision slit.`,
    historicalContext: `The late 15th century was a turbulent era of military transformation across Europe. The rise of Swiss pikemen squares, English longbows, heavy Italian mercenary crossbows (balestrieri), and early gunpowder handgonnes forced armorers to innovate frantically. German master armorers like Lorenz Helmschmied discovered that introducing raised ridges and rippling "flutes" into the steel plate dramatically increased structural stiffness without adding dead weight—functioning exactly like modern corrugated metal or architectural rib-vaulting. Arrows, lance tips, and sword points deflected harmlessly along the fluting away from vital arteries and joints.`,
    significance: `Far from being clumsy or incapacitating iron cages, authentic high-Gothic plate harnesses were remarkably lightweight, perfectly balanced across the hips and shoulders, and granted the knight extraordinary mobility—allowing them to run, vault onto horses, and fight on foot with agility. Gothic armor is also celebrated as one of humanity\'s greatest functional art forms, transposing the dramatic soaring lines, pointed arches, and cusped tracery of Gothic cathedrals directly into sculpted, mirror-polished steel.`,
    keyFeatures: [
      'Slender, fluted breastplate designed to deflect crossbow bolts and lance points',
      'Articulated German sallet helmet with bellows-action bevor and vision slit',
      'Pointed poulaines / sabatons (articulated steel foot coverings) reflecting Gothic court fashion',
      'Mitten gauntlets with overlapping lamellar finger plates for sword grip flexibility',
      'Internal leather strap suspension distributing weight symmetrically across the hips'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Gothic_armour_1480.jpg/1024px-Gothic_armour_1480.jpg',
        caption: 'Full frontal display of the 1480 Gothic plate harness showcasing radiant fluting and balanced proportions',
        angle: 'Full Frontal Plate Harness'
      },
      {
        url: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Close-up of the articulated steel helmet, visor, and fluted breastplate joint',
        angle: 'Sallet Helmet & Cuirass Detail'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sutton_Hoo_helmet_2016.png/1024px-Sutton_Hoo_helmet_2016.png',
        caption: 'Evolutionary comparison with early medieval warrior defensive gear (Sutton Hoo)',
        angle: 'Evolutionary Defense Context'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Front Cuirass (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Gothic_armour_1480.jpg/1024px-Gothic_armour_1480.jpg', annotation: 'Slender wasp-waist breastplate with overlapping plackart' },
      { angleDeg: 45, label: 'Right Pauldron Flank (45°)', imageUrl: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80', annotation: 'Articulated shoulder pauldron with lance-rest notch (faucre)' },
      { angleDeg: 90, label: 'Right Profile (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Gothic_armour_1480.jpg/1024px-Gothic_armour_1480.jpg', annotation: 'Side curvature demonstrating ergonomic deflection slope' },
      { angleDeg: 135, label: 'Right-Rear Tassets (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Gothic_armour_1480.jpg/1024px-Gothic_armour_1480.jpg', annotation: 'Hanging fauld tassets shielding the upper thighs while riding' },
      { angleDeg: 180, label: 'Full Dorsal Backplate (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Gothic_armour_1480.jpg/1024px-Gothic_armour_1480.jpg', annotation: 'Multi-part backplate fluted to match cathedral rib-vault geometry' },
      { angleDeg: 225, label: 'Left-Rear Cuisse (225°)', imageUrl: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80', annotation: 'Leather strapping buckles anchored to interior canvas lining' },
      { angleDeg: 270, label: 'Left Profile Shield Side (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Gothic_armour_1480.jpg/1024px-Gothic_armour_1480.jpg', annotation: 'Thicker plate gauge on the left side to absorb incoming lance impacts' },
      { angleDeg: 315, label: 'Sallet Visor Brow (315°)', imageUrl: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80', annotation: 'Aerodynamic tail on the sallet helmet guarding the back of the neck' }
    ],
    funFacts: [
      'A medieval knight in tailor-made plate armor had such exceptional range of motion that historical tests show knights could perform cartwheels and somersaults while fully suited.',
      'The entire harness weighs less than the standard combat pack carried by modern military infantry soldiers (approx. 23 kg vs 35+ kg).',
      'The fluting in the metal was both decorative and functional—it added rigidity to the thin steel without increasing its thickness.'
    ],
    relatedSearchTerms: ['medieval armor', 'knights', 'plate armor', 'holy roman empire', 'gothic', 'middle ages']
  },
  {
    id: 'antikythera-mechanism',
    name: 'The Antikythera Mechanism',
    subtitle: 'The World\'s Oldest Analog Computer and Astronomical Calculator',
    category: 'Scientific Instrument',
    era: 'Hellenistic Greece',
    periodYear: 'c. 150–100 BC',
    origin: 'Rhodes, Corinth, or Syracuse, Magna Graecia (Shipwreck off Antikythera Island)',
    region: 'Aegean & Mediterranean Basin',
    dateDiscovered: 'May 17, 1902 AD',
    discoveredBy: 'Spyridon Stais (Greek archaeologist inspecting sponge-diver shipwreck salvage)',
    currentLocation: {
      museum: 'National Archaeological Museum',
      city: 'Athens',
      country: 'Greece',
      galleryRoom: 'Bronze Collection, Room 38',
      accessionNumber: 'Inv. 15987',
      websiteUrl: 'https://www.namuseum.gr/en/collections/bronze-collection/',
      visitingGuide: 'Preserved inside nitrogen-controlled argon display cases with companion CT-scan volumetric cross-sections and working bronze reconstructions.'
    },
    dimensions: 'Main wooden case was approximately 34 cm × 18 cm × 9 cm',
    weight: 'Corroded fragments weigh approx. 4.5 kg in total',
    material: 'High-purity bronze alloy (88% Cu, 10% Sn, 2% trace minerals), low-lead gears, cedarwood frame',
    craftsmanshipTechnique: 'Precision hand-filing of 30+ triangular gear teeth with 0.08 mm tolerances, epicyclic differential gearing, and engraved Greek dials',
    biography: `In the spring of 1900, Greek sponge divers returning from North Africa took shelter from a violent storm off the tiny Aegean island of Antikythera. When diver Elias Stadiatis dove to 45 meters depth, he discovered the wreckage of a massive Roman cargo vessel laden with bronze statues, glassware, and jewelry. Among the salvaged artifacts brought to the National Museum in Athens was an encrusted, oxidized lump of corroded bronze that initially appeared to be mundane rocks.

On May 17, 1902, archaeologist Spyridon Stais noticed that one of the split rock fragments contained an embedded bronze gear wheel with clearly visible triangular teeth. Decades of modern scientific analysis—culminating in 2005 with the Antikythera Mechanism Research Project using high-resolution 3D X-ray microfocus CT-scans—revealed an astonishing revelation: the device was an ultra-sophisticated mechanical astronomical computer consisting of over 30 interlocking bronze gears. By turning a small hand crank, the user could predict the exact positions of the Sun, Moon, visible planets (Mercury, Venus, Mars, Jupiter, Saturn), lunar phases, solar and lunar eclipses, and the 4-year cycle of the ancient Olympic Games.`,
    historicalContext: `Before the discovery of the Antikythera Mechanism, historians believed that complex mechanical clockwork with differential gears did not appear in human history until the 14th century in medieval Europe. The mechanism proved that Hellenistic Greek mechanics, astronomers, and metallurgists—likely in the tradition of Archimedes of Syracuse or Hipparchus of Rhodes—possessed extraordinary mathematical and engineering prowess that was subsequently lost during the fall of Rome and the early Middle Ages.`,
    significance: `The Antikythera Mechanism is universally acknowledged as the world\'s first known analog computer. Its gear trains incorporate "epicyclic gearing"—gears mounted upon other rotating gears—to mimic the non-uniform, elliptical velocity of the Moon (the anomaly described centuries later by Johannes Kepler). It stands as enduring testament to the peak of ancient Greek scientific genius.`,
    keyFeatures: [
      'Front dial displaying the 365-day Egyptian solar calendar and 360-degree Greek Zodiac ring',
      'Back upper dial: 19-year Metonic calendar tracking solar and lunar month synchrony',
      'Back lower dial: 223-month Saros eclipse prediction cycle spiral',
      'Miniature rotating sphere indicating the physical black-and-white phase of the Moon',
      'Over 3,000 engraved characters of user manual instructions inscribed onto bronze door covers'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg/1024px-NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg',
        caption: 'Fragment A: The primary surviving bronze gear chassis preserved at the National Archaeological Museum in Athens',
        angle: 'Fragment A Main Gear Wheel'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Antikythera_Mechanism_Fragment_A.jpg/1024px-Antikythera_Mechanism_Fragment_A.jpg',
        caption: 'Macro photograph highlighting the triangular hand-filed teeth of the central 64-tooth drive gear',
        angle: 'Gearing Train Macro View'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Front Drive Wheel (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg/1024px-NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg', annotation: 'Main 64-tooth B1 drive wheel driving the solar pointers' },
      { angleDeg: 45, label: 'Oblique Top Right (45°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Antikythera_Mechanism_Fragment_A.jpg/1024px-Antikythera_Mechanism_Fragment_A.jpg', annotation: 'Metonic calendar gear train pin showing pin-and-slot lunar irregularity' },
      { angleDeg: 90, label: 'Right Chassis Flange (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg/1024px-NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg', annotation: 'Lateral mounting pins that anchored the gear mechanism into the wooden cedar housing' },
      { angleDeg: 135, label: 'Rear Spiral View (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Antikythera_Mechanism_Fragment_A.jpg/1024px-Antikythera_Mechanism_Fragment_A.jpg', annotation: 'Saros 223-month eclipse spiral pointer track guide' },
      { angleDeg: 180, label: 'Reverse Plate (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg/1024px-NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg', annotation: 'Engraved Greek astronomical inscriptions explaining eclipse glyphs (Glyph H for Helios, S for Selene)' },
      { angleDeg: 225, label: 'Lower Left Cog (225°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Antikythera_Mechanism_Fragment_A.jpg/1024px-Antikythera_Mechanism_Fragment_A.jpg', annotation: 'Games dial counting Olympiads, Pythian, and Isthmian panhellenic athletic cycles' },
      { angleDeg: 270, label: 'Left Profile (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg/1024px-NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg', annotation: 'Corroded bronze layers showing 2,000 years of marine calcite encrustation' },
      { angleDeg: 315, label: 'Crown Spindle (315°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Antikythera_Mechanism_Fragment_A.jpg/1024px-Antikythera_Mechanism_Fragment_A.jpg', annotation: 'Manual input hand-crank square spindle socket' }
    ],
    funFacts: [
      'The technology present in the Antikythera Mechanism completely vanished from the historical record for over 1,400 years until medieval astronomical clocks were built in 14th-century Europe.',
      'The device could predict eclipses decades into the future and even calculated the color and shadow characteristics of the impending eclipse.',
      'Over 3,500 characters of explanatory Greek text—virtually an ancient user manual—were engraved onto its exterior bronze protective doors.'
    ],
    relatedSearchTerms: ['antikythera', 'ancient computer', 'astronomy', 'greece', 'archimedes', 'ancient technology']
  },
  {
    id: 'sutton-hoo-helmet',
    name: 'The Sutton Hoo Ceremonial Helmet',
    subtitle: 'The Majestic Crested Visage of an Anglo-Saxon Warrior King',
    category: 'Medieval Armor',
    era: 'Early Middle Ages (Anglo-Saxon England)',
    periodYear: 'c. 625 AD',
    origin: 'Kingdom of East Anglia (Sutton Hoo Ship Burial, Mound 1), Suffolk, England',
    region: 'British Isles & Northern Europe',
    dateDiscovered: 'July 1939 AD',
    discoveredBy: 'Basil Brown (self-taught archaeologist excavating on behalf of Edith Pretty)',
    currentLocation: {
      museum: 'The British Museum',
      city: 'London',
      country: 'United Kingdom',
      galleryRoom: 'Room 41 (Sutton Hoo and Europe AD 300–1100)',
      accessionNumber: 'Registration 1939,1010.93',
      websiteUrl: 'https://www.britishmuseum.org/collection/object/H_1939-1010-93',
      visitingGuide: 'Displayed in Room 41 alongside its full-scale replica created by the Royal Armouries and the exquisite Sutton Hoo gold shoulder-clasps.'
    },
    dimensions: 'Height: 31.8 cm; Width: 21.5 cm; Depth: 25.5 cm',
    weight: 'Original shattered pieces reconstructed: approx. 2.5 kg',
    material: 'Wrought iron bowl cap, tinned bronze figural press panels, cast bronze dragon crest with gold foil gilding, Bohemian garnet eye inlays',
    craftsmanshipTechnique: 'Scandinavian Vendel-style iron forging, repoussé tinned bronze decorative stampings, and cloisonné garnet gemstone setting',
    biography: `In the fateful summer of 1939, on the eve of World War II, amateur Suffolk excavator Basil Brown unearthed a gargantuan 27-meter-long Anglo-Saxon oak longship buried beneath Mound 1 at Sutton Hoo. Undisturbed for 1,300 years, the burial chamber contained an astonishing royal treasure intended to speed a mighty chieftain—widely believed to be King Rædwald of East Anglia—into the afterlife.

Among the collapsed timber roof beams lay the crushed, rusted fragments of an extraordinary helmet. Shattered into more than 500 tiny corroded iron shards, the helmet was painstakingly reassembled like a 3D jigsaw puzzle over decades by British Museum master conservators Nigel Williams and Herbert Maryon. The finished masterpiece features a complete anthropomorphic human face-mask: cast bronze eyebrows inlaid with red garnets terminate in gold-gilded boars\' heads, while the nose, mustache, and dragon crest combine visually to depict a flying dragon swooping down across the warrior\'s brow.`,
    historicalContext: `In the 7th century, Britain was fractured into rival Anglo-Saxon kingdoms (East Anglia, Mercia, Northumbria, Wessex, Kent). King Rædwald of East Anglia held the prestigious title of *Bretwalda*—supreme overlord among English kings. The Sutton Hoo ship burial demonstrates that early medieval Anglo-Saxon England was not a crude or isolated "Dark Age", but a sophisticated, wealthy society connected to global trade routes extending from Scandinavia to Byzantium and the silk roads of Asia.`,
    significance: `The Sutton Hoo helmet is the defining visual icon of the Anglo-Saxon era and one of the most famous archaeological finds in British history. Its design links Scandinavian Vendel-era Swedish royal burials directly to English monarchies, illustrating the Germanic migrations and pagan-Christian transition of early medieval Europe.`,
    keyFeatures: [
      'Anthropomorphic facial mask with eye openings, cast bronze mustache, and nose breathing holes',
      'Flying winged dragon motif formed by the crest comb and eyebrow arches meeting above the nose',
      'Eyebrows inlaid with sparkling faceted red Bohemian garnets terminating in gilded bronze boars\' heads',
      'Tinned bronze outer panels stamped with scenes of warrior spear-dances and fallen warriors',
      'Hinged ear-guards and deep neck-guard providing complete 360-degree cranial protection'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sutton_Hoo_helmet_2016.png/1024px-Sutton_Hoo_helmet_2016.png',
        caption: 'The reconstructed original Sutton Hoo helmet preserved at the British Museum',
        angle: 'Reconstructed Original Helmet'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sutton_Hoo_Helmet_Replica_2021.jpg/1024px-Sutton_Hoo_Helmet_Replica_2021.jpg',
        caption: 'The shining royal replica created by the Royal Armouries showing its original mirror-like tinned bronze splendor',
        angle: 'Full Royal Replica (As New)'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Front Facial Visage (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sutton_Hoo_helmet_2016.png/1024px-Sutton_Hoo_helmet_2016.png', annotation: 'Anthropomorphic face mask with garnet dragon eyebrows and mustache' },
      { angleDeg: 45, label: 'Right Cheek Angle (45°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sutton_Hoo_Helmet_Replica_2021.jpg/1024px-Sutton_Hoo_Helmet_Replica_2021.jpg', annotation: 'Tinned plate panels showing twin dancing warriors with horned helmets' },
      { angleDeg: 90, label: 'Right Ear Flange (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sutton_Hoo_helmet_2016.png/1024px-Sutton_Hoo_helmet_2016.png', annotation: 'Hinged iron ear-guard plate fitted with leather tie-straps' },
      { angleDeg: 135, label: 'Right-Rear Neck Guard (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sutton_Hoo_Helmet_Replica_2021.jpg/1024px-Sutton_Hoo_Helmet_Replica_2021.jpg', annotation: 'Deep flared neck guard protecting the back of the cervical spine from downward sword blows' },
      { angleDeg: 180, label: 'Rear Crown Crest (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sutton_Hoo_helmet_2016.png/1024px-Sutton_Hoo_helmet_2016.png', annotation: 'Hollow D-shaped bronze crest ridge terminating in a secondary dragon head at the rear' },
      { angleDeg: 225, label: 'Left-Rear Angle (225°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sutton_Hoo_Helmet_Replica_2021.jpg/1024px-Sutton_Hoo_Helmet_Replica_2021.jpg', annotation: 'Silver-foil wire inlay outlining the perimeter of the iron cap' },
      { angleDeg: 270, label: 'Left Cheek Profile (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sutton_Hoo_helmet_2016.png/1024px-Sutton_Hoo_helmet_2016.png', annotation: 'Original iron corrosion matrix showing mineralized wood fibers from the ship\'s collapse' },
      { angleDeg: 315, label: 'Dragon Brow Apex (315°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sutton_Hoo_Helmet_Replica_2021.jpg/1024px-Sutton_Hoo_Helmet_Replica_2021.jpg', annotation: 'Convergence of dragon snout and winged brow arches above the eye slits' }
    ],
    funFacts: [
      'When reassembled, the eyebrows, nose, and mustache form an optical illusion: viewed one way, it is a human face; viewed another, it is a dragon flying upward with wings outstretched.',
      'The garnet gemstones embedded in the eyebrows originated thousands of miles away in Sri Lanka and Bohemia, proving the vastness of early medieval trading networks.',
      'The helmet had to be reconstructed twice: the first 1947 attempt resembled a Roman gladiator helmet; the 1971 reconstruction corrected the errors and revealed its true Anglo-Saxon majesty.'
    ],
    relatedSearchTerms: ['sutton hoo', 'anglo-saxon', 'beowulf', 'medieval helmet', 'raedwald', 'british museum']
  },
  {
    id: 'tutankhamun-gold-mask',
    name: 'The Gold Death Mask of Tutankhamun',
    subtitle: 'The Divine Eternal Face of Egypt\'s Boy King in Solid Bullion',
    category: 'Royal Relic & Regalia',
    era: '18th Dynasty (New Kingdom Egypt)',
    periodYear: 'c. 1323 BC',
    origin: 'Tomb KV62, Valley of the Kings, Thebes (Luxor), Egypt',
    region: 'Nile Valley & Ancient Egypt',
    dateDiscovered: 'October 28, 1925 AD',
    discoveredBy: 'Howard Carter and Lord Carnarvon',
    currentLocation: {
      museum: 'The Grand Egyptian Museum (GEM) / Egyptian Museum',
      city: 'Giza / Cairo',
      country: 'Egypt',
      galleryRoom: 'Tutankhamun Galleries, Dedicated State Showcase',
      accessionNumber: 'JE 60672',
      websiteUrl: 'https://egymonuments.gov.eg/en/museums/the-egyptian-museum-in-tahrir',
      visitingGuide: 'The crowning centerpiece of Egyptian cultural heritage, protected under specialized bulletproof glass and constant humidity monitoring.'
    },
    dimensions: 'Height: 54 cm (21.3 in); Width: 39.3 cm; Depth: 49 cm',
    weight: '10.23 kilograms (22.5 lbs) of pure solid gold',
    material: 'High-karat gold alloy (22.5K face and neck, 18.5K collar), lapis lazuli, turquoise, carnelian, obsidian, quartz, and colored faience glass',
    craftsmanshipTechnique: 'Repoussé cold-hammering of thick gold bullion sheets, chasing, cloisonné glass and stone inlay, and inscribed hieroglyphs',
    biography: `On November 4, 1922, British archaeologist Howard Carter discovered the first step leading down into tomb KV62 in the Valley of the Kings. When Carter breached the inner doorway, he was stunned by "wonderful things"—four gilded shrines, chariots, thrones, and three nested coffins. On October 28, 1925, Carter opened the innermost solid-gold coffin (weighing 110 kg) and revealed the royal mummy wearing this breathtaking funerary mask resting directly over Tutankhamun's head and shoulders.

The mask portrays the young pharaoh as the living incarnation of Osiris, the god of the afterlife and resurrection. Hammered from two sheets of heavy gold joined by brazing, the serene, youthful face features eyes crafted from translucent white quartz with obsidian pupils and lapis lazuli cosmetic eyeliner lines. Tutankhamun wears the traditional striped royal Nemes headdress crowned by the Uraeus—the vulture goddess Nekhbet of Upper Egypt and cobra goddess Wadjet of Lower Egypt—symbolizing divine dominion over the Two Lands.`,
    historicalContext: `Tutankhamun ascended the throne around age nine following the turbulent religious revolution of his father, the "heretic pharaoh" Akhenaten, who had banned Egypt's traditional pantheon in favor of the sun disc Aten. Tutankhamun restored the traditional worship of Amun-Ra and reinstated Thebes as the religious capital. Though he died suddenly around age nineteen after a brief ten-year reign, his virtually intact tomb ensured he would become the most famous pharaoh in global history.`,
    significance: `The Gold Mask of Tutankhamun is universally regarded as one of the greatest masterpieces of human artistic and metallurgical history. The reverse and shoulders are engraved in ten vertical and two horizontal registers with Chapter 151B of the Egyptian Book of the Dead, an ancient magical incantation invoking the gods Ptah, Sokar, and Anubis to protect the deceased pharaoh's eyes, ears, and soul in the afterlife.`,
    keyFeatures: [
      'Solid gold repoussé portrait capturing the serene, youthful facial features of the 19-year-old king',
      'Nemes royal headdress inlaid with deep blue glass paste mimicking precious lapis lazuli stripes',
      'Uraeus brow insignia with solid gold cobra head and vulture head protecting the crown',
      'Divine plaited beard of gold inlaid with blue faience curled upward in the likeness of Osiris',
      'Broad falcon collar terminating in twin gold Horus falcon heads with turquoise and carnelian beads'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tutankhamun_mask_front.jpg/1024px-Tutankhamun_mask_front.jpg',
        caption: 'Frontal portrait of King Tutankhamun\'s funerary mask in pure gold and lapis lazuli',
        angle: 'Frontal Face of Osiris'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Tutankhamun_mask_profile.jpg/1024px-Tutankhamun_mask_profile.jpg',
        caption: 'Profile perspective showing the nemes headdress contours and pierced royal earlobes',
        angle: 'Right Profile & Ear Detail'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Frontal Divine Face (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tutankhamun_mask_front.jpg/1024px-Tutankhamun_mask_front.jpg', annotation: 'Translucent quartz eyes with black obsidian pupils and lapis eyeliner' },
      { angleDeg: 45, label: 'Right Three-Quarter (45°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Tutankhamun_mask_profile.jpg/1024px-Tutankhamun_mask_profile.jpg', annotation: 'Pierced earlobes characteristic of royal youths in the 18th Dynasty' },
      { angleDeg: 90, label: 'Right Lateral Flange (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Tutankhamun_mask_profile.jpg/1024px-Tutankhamun_mask_profile.jpg', annotation: 'Curled divine false beard connected via mortise and tenon joint' },
      { angleDeg: 135, label: 'Right-Rear Shoulder (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tutankhamun_mask_front.jpg/1024px-Tutankhamun_mask_front.jpg', annotation: 'Spell 151B from the Book of the Dead chiseled into the gold shoulder plate' },
      { angleDeg: 180, label: 'Rear Nemes Pigtail (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tutankhamun_mask_front.jpg/1024px-Tutankhamun_mask_front.jpg', annotation: 'Gathered tail of the nemes headdress tied at the nape of the neck' },
      { angleDeg: 225, label: 'Left-Rear Collar (225°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Tutankhamun_mask_profile.jpg/1024px-Tutankhamun_mask_profile.jpg', annotation: 'Falcon-head terminal of the broad collar with carnelian inlays' },
      { angleDeg: 270, label: 'Left Lateral Profile (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Tutankhamun_mask_profile.jpg/1024px-Tutankhamun_mask_profile.jpg', annotation: 'Seamless gold join where the face sheet was brazed to the nemes rear hood' },
      { angleDeg: 315, label: 'Uraeus Crown Brow (315°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tutankhamun_mask_front.jpg/1024px-Tutankhamun_mask_front.jpg', annotation: 'Cobra Wadjet and Vulture Nekhbet symbols of Upper and Lower Egypt' }
    ],
    funFacts: [
      'The gold mask weighs over 10 kilograms (22.5 pounds)—if melted down for bullion value alone, the gold would be worth over $700,000, but as an artifact its historical value is priceless.',
      'Tutankhamun\'s earlobes were pierced, though in Egyptian art adult pharaohs rarely wore earrings; the holes were covered with thin gold foil during mummification.',
      'Recent spectroscopic scans revealed that the face plate and the headdress are made of slightly different gold alloys, fueling theories that parts of the mask may have originally been commissioned for Queen Neferneferuaten or Nefertiti.'
    ],
    relatedSearchTerms: ['tutankhamun', 'king tut', 'valley of the kings', 'ancient egypt', 'gold mask', 'pharaoh']
  },
  {
    id: 'cyrus-cylinder',
    name: 'The Cyrus Cylinder',
    subtitle: 'The Ancient Cuneiform Barrel Proclaiming Tolerance and Freedom in Babylon',
    category: 'Inscribed Stele',
    era: 'Achaemenid Persian Empire',
    periodYear: '539 BC',
    origin: 'Foundations of the Esagila Temple of Marduk, Babylon (Modern-day Hillah, Iraq)',
    region: 'Mesopotamia & Middle East',
    dateDiscovered: 'March 1879 AD',
    discoveredBy: 'Hormuzd Rassam (Assyrian-British archaeologist excavating for the British Museum)',
    currentLocation: {
      museum: 'The British Museum',
      city: 'London',
      country: 'United Kingdom',
      galleryRoom: 'Room 55 (Rahim Irvani Gallery for Ancient Iran)',
      accessionNumber: 'BM 90920',
      websiteUrl: 'https://www.britishmuseum.org/collection/object/W_1880-0617-1941',
      visitingGuide: 'On permanent public view in the Ancient Iran gallery; a replica resides at the United Nations Headquarters in New York.'
    },
    dimensions: 'Length: 22.5 cm (8.8 in); Maximum diameter: 10 cm',
    weight: 'Approximately 1.8 kg',
    material: 'Baked clay cylinder barrel inscribed in Babylonian cuneiform script',
    craftsmanshipTechnique: 'Wet clay barrel formed on a spindle, incised with miniature wedge-shaped cuneiform stylus marks, and kiln-fired',
    biography: `In October 539 BC, Cyrus the Great, founder of the mighty Persian Achaemenid Empire, marched into the legendary city of Babylon without a protracted siege, overthrowing the unpopular Babylonian king Nabonidus. Following ancient Mesopotamian royal traditions, Cyrus ordered this barrel-shaped clay cylinder to be inscribed in Akkadian cuneiform and buried within the foundations of the Esagila—Babylon's supreme temple dedicated to the god Marduk.

The cylinder was discovered in 1879 by archaeologist Hormuzd Rassam during excavations of the ruins of Babylon. In the text, Cyrus declares that the supreme god Marduk sought out a righteous ruler to bring peace and justice, choosing Cyrus to be king of the four quarters of the earth. Cyrus boldly proclaims: "When I entered Babylon as a friend and established the seat of the government in the palace of the ruler amidst jubilation and rejoicing, Marduk, the great lord, caused the big-hearted inhabitants of Babylon to love me." Most famously, Cyrus announced that all enslaved peoples deported by the Babylonians were free to return to their ancestral homelands, and that their seized religious idols and temples would be restored.`,
    historicalContext: `For generations, the Neo-Babylonian Empire under Nebuchadnezzar II had practiced mass population deportations—most notably the Babylonian Exile of the Jewish people following the destruction of the First Temple in Jerusalem in 586 BC. Cyrus's revolutionary policy of tolerance, religious pluralism, and decentralized imperial administration replaced brutal subjugation with local self-determination. This historic decree directly aligns with the Biblical Books of Ezra and Chronicles, which praise Cyrus as the anointed liberator who allowed the Jewish exiles to return to Jerusalem and rebuild the Second Temple.`,
    significance: `The Cyrus Cylinder is celebrated worldwide as humanity\'s "first declaration of human rights." While rooted in ancient Near Eastern royal propaganda, its principles of religious freedom, ethnic tolerance, prohibition of slavery, and repatriation of displaced populations established a new paradigm for governance. In 1971, the United Nations translated the text into all official UN languages, and a full-size replica remains on permanent display at the UN Headquarters in New York City as a symbol of universal peace.`,
    keyFeatures: [
      'Barrel-shaped clay cylinder preserving 45 lines of fine Neo-Babylonian cuneiform text',
      'Royal decree explicitly permitting exiled peoples to return to their native homelands',
      'Repatriation of confiscated divine statues and renovation of destroyed sanctuaries',
      'Prohibition against looting, extortion, and pillaging by Persian soldiers in Babylon',
      'Foundation deposit artifact linking ancient Persian monarchy with Mesopotamian antiquity'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cyrus_Cylinder_front.jpg/1024px-Cyrus_Cylinder_front.jpg',
        caption: 'The Cyrus Cylinder clay barrel preserving the cuneiform declaration of Cyrus the Great',
        angle: 'Frontal Barrel Perspective'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Center Front Inscription (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cyrus_Cylinder_front.jpg/1024px-Cyrus_Cylinder_front.jpg', annotation: 'Lines 18–25 declaring Cyrus\'s peaceful entry into Babylon' },
      { angleDeg: 45, label: 'Right Barrel Curvature (45°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cyrus_Cylinder_front.jpg/1024px-Cyrus_Cylinder_front.jpg', annotation: 'Stylus impressions demonstrating rapid scribal cuneiform pressing' },
      { angleDeg: 90, label: 'Right Spindle Hub (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cyrus_Cylinder_front.jpg/1024px-Cyrus_Cylinder_front.jpg', annotation: 'Circular barrel end where the cylinder was spun during clay turning' },
      { angleDeg: 135, label: 'Upper Inscription Arc (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cyrus_Cylinder_front.jpg/1024px-Cyrus_Cylinder_front.jpg', annotation: 'Genealogy of Cyrus tracing his lineage through Teispes and Cambyses I' },
      { angleDeg: 180, label: 'Reverse Barrel Section (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cyrus_Cylinder_front.jpg/1024px-Cyrus_Cylinder_front.jpg', annotation: 'Lines 30–35 detailing the repatriation of sacred statues to Ashur, Susa, and Jerusalem' },
      { angleDeg: 225, label: 'Lower Barrel Arc (225°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cyrus_Cylinder_front.jpg/1024px-Cyrus_Cylinder_front.jpg', annotation: 'Kiln firing discoloration reflecting ancient ceramic baking conditions' },
      { angleDeg: 270, label: 'Left Spindle Hub (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cyrus_Cylinder_front.jpg/1024px-Cyrus_Cylinder_front.jpg', annotation: 'Tapered terminal radius designed for foundation stone encapsulation' },
      { angleDeg: 315, label: 'Left Barrel Inscription (315°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cyrus_Cylinder_front.jpg/1024px-Cyrus_Cylinder_front.jpg', annotation: 'Opening lines detailing Nabonidus\'s religious neglect and Marduk\'s divine wrath' }
    ],
    funFacts: [
      'A missing fragment of the cylinder was discovered in the Yale University collection in 1970 and subsequently re-joined to the main body in London.',
      'The Cyrus Cylinder was borrowed by the National Museum of Iran in Tehran in 2010, where over one million Iranians queued for hours to see the national relic.',
      'Thomas Jefferson possessed two copies of Xenophon\'s *Cyropaedia* (The Education of Cyrus) and drew inspiration from Cyrus\'s governance principles when drafting the American Declaration of Independence.'
    ],
    relatedSearchTerms: ['cyrus cylinder', 'cyrus the great', 'persian empire', 'human rights', 'babylon', 'cuneiform']
  },
  {
    id: 'narmer-palette',
    name: 'The Narmer Palette',
    subtitle: 'The Monumental Stone Documenting the Dawn of Unified Egyptian Civilization',
    category: 'Egyptian Hieroglyph',
    era: 'Early Dynastic Period (Dynasty 0 / 1)',
    periodYear: 'c. 3100 BC',
    origin: 'Temple of Horus at Hierakonpolis (Nekhen), Upper Egypt',
    region: 'Upper Egypt & Nile Valley',
    dateDiscovered: '1897–1898 AD',
    discoveredBy: 'James E. Quibell and Frederick W. Green',
    currentLocation: {
      museum: 'The Egyptian Museum (Tahrir)',
      city: 'Cairo',
      country: 'Egypt',
      galleryRoom: 'Ground Floor, Room 43',
      accessionNumber: 'CG 14716; JE 32169',
      websiteUrl: 'https://egymonuments.gov.eg/en/museums/the-egyptian-museum-in-tahrir',
      visitingGuide: 'Prominently displayed in the central early dynastic hall of the historic Tahrir Museum.'
    },
    dimensions: 'Height: 64 cm (25 in); Width: 42 cm; Thickness: 2.5 cm',
    weight: 'Approximately 12 kg',
    material: 'Single slab of dark grey-green siltstone (greywacke)',
    craftsmanshipTechnique: 'Bas-relief low carving, incised hieroglyphic serekhs, and drilled ceremonial cosmetic grinding circular depression',
    biography: `Excavated during the winter of 1897–1898 from the sacred "Main Deposit" inside the temple of Horus at Hierakonpolis, the Narmer Palette is one of the foundational historical monuments of human civilization. While ceremonial palettes originated as practical stone slabs for grinding minerals (like green malachite and black kohl) into protective eye cosmetics, this massive 64 cm siltstone palette was carved as an offering to the gods celebrating the unification of Upper and Lower Egypt under King Narmer.

On the obverse side, King Narmer is depicted as a colossal figure wearing the tall, bowling-pin-shaped White Crown (*Hedjet*) of Upper Egypt. In his raised right hand he wields a pear-shaped mace, poised in the classic "smiting of the enemy" posture that would define Egyptian royal iconography for the next 3,000 years. On the reverse side, Narmer wears the curly Red Crown (*Deshret*) of Lower Egypt as he processes to inspect rows of decapitated enemies, preceded by his standard-bearers. Below, two long-necked mythological beasts (serpopards) are entwined by handlers, their intertwined necks forming the circular cosmetic grinding dish.`,
    historicalContext: `Around 3100 BC, Egypt was divided into two distinct cultural and political entities: Upper Egypt in the southern Nile Valley and Lower Egypt in the northern Nile Delta. Narmer (often identified with the legendary Menes recorded by Manetho) accomplished the military and ideological unification of both regions, founding the First Dynasty of Egypt and establishing Memphis as the nation's unified imperial capital. The palette visually codifies this monumental union of North and South.`,
    significance: `The Narmer Palette contains some of the earliest decipherable Egyptian hieroglyphic inscriptions ever discovered. Above Narmer's head on both sides is his royal *serekh* (palace façade banner) containing the hieroglyphic signs for a catfish (*n'r*) and a chisel (*mr*), phonetically spelling the royal name "Narmer". It is universally hailed by Egyptologists as the "first historical document in the world."`,
    keyFeatures: [
      'Obverse smiting scene showing Narmer in the White Crown of Upper Egypt triumphing over a delta captive',
      'Reverse victory procession showing Narmer in the Red Crown of Lower Egypt, demonstrating unified dual kingship',
      'Intertwined serpopards (mythological lion-leopard creatures with long serpentine necks) forming the palette bowl',
      'Dual bovine goddess Bat/Hathor heads presiding across the top register of both sides',
      'Bull trampling a fortified city wall at the bottom, symbolizing the king\'s irresistible military might'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Narmer_Palette.jpg/1024px-Narmer_Palette.jpg',
        caption: 'Obverse side of the Narmer Palette showing King Narmer smiting an enemy while wearing the White Crown',
        angle: 'Obverse Smiting Scene'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Narmer_Palette_verso.jpg/1024px-Narmer_Palette_verso.jpg',
        caption: 'Reverse side showing King Narmer in the Red Crown inspecting bound captives beside entwined serpopards',
        angle: 'Reverse Victory Procession'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Obverse Face (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Narmer_Palette.jpg/1024px-Narmer_Palette.jpg', annotation: 'King Narmer smiting enemy chieftain Wash in front of Horus falcon' },
      { angleDeg: 45, label: 'Obverse Horus Falcon (45°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Narmer_Palette.jpg/1024px-Narmer_Palette.jpg', annotation: 'Horus perched atop six papyrus stalks symbolizing 6,000 delta captives' },
      { angleDeg: 90, label: 'Edge Siltstone Slice (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Narmer_Palette.jpg/1024px-Narmer_Palette.jpg', annotation: '2.5 cm thick fine-grained greywacke quarried from Wadi Hammamat' },
      { angleDeg: 135, label: 'Reverse Bovine Heads (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Narmer_Palette_verso.jpg/1024px-Narmer_Palette_verso.jpg', annotation: 'Twin horned cow goddess Bat faces symbolizing celestial motherhood' },
      { angleDeg: 180, label: 'Reverse Verso Face (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Narmer_Palette_verso.jpg/1024px-Narmer_Palette_verso.jpg', annotation: 'King Narmer wearing Red Crown of the Delta with four nome standards' },
      { angleDeg: 225, label: 'Reverse Serpopard Basin (225°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Narmer_Palette_verso.jpg/1024px-Narmer_Palette_verso.jpg', annotation: 'Entwined necks of mythical beasts creating the cosmetic mixing dish' },
      { angleDeg: 270, label: 'Left Edge Profile (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Narmer_Palette.jpg/1024px-Narmer_Palette.jpg', annotation: 'Flawless carved bas-relief lines surviving over 5,100 years' },
      { angleDeg: 315, label: 'Serekh Name Register (315°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Narmer_Palette.jpg/1024px-Narmer_Palette.jpg', annotation: 'Hieroglyphic Catfish-Chisel (Nar-Mer) framed inside royal palace gateway' }
    ],
    funFacts: [
      'The Narmer Palette was never used for actual cosmetic makeup; its enormous size and weight designate it as a sacred ceremonial monument dedicated to the temple gods.',
      'Narmer\'s sandal-bearer is shown carrying the king\'s gold sandals and a water pot—holding one of the earliest recorded official royal administrative titles in history.',
      'The palette has remained in Egypt since its creation over 5,000 years ago and has never been permanently transferred to a foreign museum.'
    ],
    relatedSearchTerms: ['narmer palette', 'ancient egypt', 'hieroglyphs', 'first dynasty', 'unification of egypt', 'pharaoh']
  },
  {
    id: 'dead-sea-scrolls-isaiah',
    name: 'The Great Isaiah Scroll (1QIsaᵃ)',
    subtitle: 'The Oldest Virtually Complete Biblical Scroll in Existence',
    category: 'Sacred Manuscript',
    era: 'Hasmonean Judea',
    periodYear: 'c. 125 BC',
    origin: 'Qumran Cave 1, Judean Desert near the Dead Sea, West Bank',
    region: 'Levant & Judean Desert',
    dateDiscovered: 'November 1946 – February 1947 AD',
    discoveredBy: 'Muhammed edh-Dhib and Bedouin shepherds of the Ta\'amireh tribe',
    currentLocation: {
      museum: 'The Israel Museum (The Shrine of the Book)',
      city: 'Jerusalem',
      country: 'Israel',
      galleryRoom: 'Central Circular Display of the Shrine of the Book',
      accessionNumber: '1QIsaᵃ',
      websiteUrl: 'https://www.imj.org.il/en/wings/shrine-book/dead-sea-scrolls',
      visitingGuide: 'Displayed around a central raised replica plinth within the iconic white onion-dome Shrine of the Book.'
    },
    dimensions: 'Length: 734 cm (24.1 feet) unrolled; Height: 26 cm',
    weight: 'Parchment scroll: approx. 1.2 kg',
    material: '17 sheets of tanned sheepskin leather sewn together with linen thread, carbon black soot ink',
    craftsmanshipTechnique: 'Organic tanning with desert salts, dry-point stylus margin ruling, and calligraphic Hebrew square palaeographic script',
    biography: `In the winter of 1946–1947, a young Bedouin shepherd named Muhammed edh-Dhib was searching for a lost goat in the barren limestone cliffs of Qumran overlooking the Dead Sea. Tossing a stone into a dark cave opening, he was surprised to hear the sound of shattering pottery. Crawling inside, he discovered ancient cylindrical earthenware jars containing bundles of decaying leather scrolls wrapped in linen cloths.

Among these first discoveries was the crown jewel of Biblical archaeology: the Great Isaiah Scroll (1QIsaᵃ). Containing all 66 chapters of the Hebrew Book of Isaiah, it is the only virtually intact, complete book found among the more than 25,000 manuscript fragments discovered across eleven Qumran caves. Carbon-14 dating and palaeographic analysis date the handwriting to approximately 125 BC, created by Jewish scribes—likely associated with the ascetic Essene community—who inhabited the desert sanctuary until the Roman sack in 68 AD during the First Jewish-Roman War.`,
    historicalContext: `Prior to the discovery of the Dead Sea Scrolls, the oldest surviving complete Hebrew manuscripts of the Old Testament were the Aleppo Codex (c. 920 AD) and the Leningrad Codex (1008 AD)—dating over a thousand years after the Biblical period. The Great Isaiah Scroll pushed back the manuscript evidence for the Hebrew Bible by more than an entire millennium. Scholars were stunned to discover that the 2,100-year-old Qumran text matched the medieval Masoretic Hebrew Bible with extraordinary word-for-word fidelity.`,
    significance: `The Great Isaiah Scroll is a monumental pillar of religious, linguistic, and textual history. It provides an unprecedented window into the evolution of Judaism and early Christianity during the Second Temple period, confirming the meticulous accuracy with which scribes copied sacred scripture across centuries of exile and dispersion.`,
    keyFeatures: [
      'Over 24 feet of continuous leather parchment divided into 54 neatly ruled columns of Hebrew text',
      'Virtually intact preservation of all 66 chapters of the Biblical Book of Isaiah',
      'Ancient scribal corrections, interlinear additions, and margin notes inserted by contemporary readers',
      'Handwritten in the classic Aramaic-Hebrew "square script" that remains readable to modern Hebrew speakers today',
      'Sewn together from 17 separate animal hide panels using three-ply linen cord'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Great_Isaiah_Scroll_Chapter_53.jpg/1024px-Great_Isaiah_Scroll_Chapter_53.jpg',
        caption: 'Column 44 of the Great Isaiah Scroll containing Chapter 53 (the famous "Suffering Servant" prophecy)',
        angle: 'Parchment Column Detail'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Column 44 Center (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Great_Isaiah_Scroll_Chapter_53.jpg/1024px-Great_Isaiah_Scroll_Chapter_53.jpg', annotation: 'Isaiah Chapter 53 written in fluent Second Temple Hebrew square script' },
      { angleDeg: 45, label: 'Linen Stitch Seam (45°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Great_Isaiah_Scroll_Chapter_53.jpg/1024px-Great_Isaiah_Scroll_Chapter_53.jpg', annotation: 'Flax linen thread stitching joining parchment sheet 13 to sheet 14' },
      { angleDeg: 90, label: 'Margin Rule Guide (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Great_Isaiah_Scroll_Chapter_53.jpg/1024px-Great_Isaiah_Scroll_Chapter_53.jpg', annotation: 'Dry-point indentation grooves scored into the leather to align text' },
      { angleDeg: 135, label: 'Scribal Correction (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Great_Isaiah_Scroll_Chapter_53.jpg/1024px-Great_Isaiah_Scroll_Chapter_53.jpg', annotation: 'Interlinear word correction added above the line by an ancient scribe' },
      { angleDeg: 180, label: 'Reverse Tanned Leather (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Great_Isaiah_Scroll_Chapter_53.jpg/1024px-Great_Isaiah_Scroll_Chapter_53.jpg', annotation: 'Unwritten hair-side of sheepskin cured with Judean desert mineral salts' },
      { angleDeg: 225, label: 'Lower Parchment Flange (225°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Great_Isaiah_Scroll_Chapter_53.jpg/1024px-Great_Isaiah_Scroll_Chapter_53.jpg', annotation: 'Darkened water staining along bottom margin from 2,000 years in clay jar' },
      { angleDeg: 270, label: 'Left Column Boundary (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Great_Isaiah_Scroll_Chapter_53.jpg/1024px-Great_Isaiah_Scroll_Chapter_53.jpg', annotation: 'Clear vertical margin separating columns with generous paragraph indentation' },
      { angleDeg: 315, label: 'Top Margin Header (315°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Great_Isaiah_Scroll_Chapter_53.jpg/1024px-Great_Isaiah_Scroll_Chapter_53.jpg', annotation: 'Carbon black ink made of soot and vegetable gum showing no fading' }
    ],
    funFacts: [
      'The scroll survived for 2,000 years in near-perfect condition because the extreme dry heat and low humidity of the Dead Sea basin—the lowest elevation on Earth—halted bacterial decay.',
      'The Bedouin shepherds who discovered the scrolls originally sold seven complete scrolls to an antiquities dealer in Bethlehem for roughly $28.',
      'Because Hebrew script has changed so little in structure over the millennia, an ordinary modern Hebrew reader can read the Great Isaiah Scroll without specialized palaeographical training.'
    ],
    relatedSearchTerms: ['dead sea scrolls', 'isaiah scroll', 'qumran', 'biblical archaeology', 'hebrew manuscript', 'israel museum']
  },
  {
    id: 'terracotta-kneeling-archer',
    name: 'The Terracotta Army Kneeling Archer',
    subtitle: 'The Silent Immortal Sentinel of China\'s First Imperial Dynasty',
    category: 'Ancient Sculpture',
    era: 'Qin Dynasty (Imperial China)',
    periodYear: '210–209 BC',
    origin: 'Mausoleum of the First Qin Emperor, Lintong, Xi\'an, Shaanxi Province, China',
    region: 'East Asia & Imperial China',
    dateDiscovered: 'March 1974 AD',
    discoveredBy: 'Local farmers digging a water well (including Yang Zhifa)',
    currentLocation: {
      museum: 'Emperor Qinshihuang\'s Mausoleum Site Museum',
      city: 'Xi\'an, Shaanxi',
      country: 'China',
      galleryRoom: 'Pit 2 (Vanguard Archer and Cavalry Formation)',
      accessionNumber: '006742',
      websiteUrl: 'http://www.bmy.com.cn/2015new/bmyweb/',
      visitingGuide: 'Displayed in Pit 2 in an individual protective display case; recognized as one of the best preserved warriors in the entire terracotta army.'
    },
    dimensions: 'Height: 122 cm (4 ft) kneeling; Weight: 140 kg (308 lbs)',
    weight: 'Approximately 140 kg',
    material: 'High-fire local yellow silt terracotta clay, original lacquer lacquer base with mineral pigments (cinnabar, azurite, malachite, Han purple)',
    craftsmanshipTechnique: 'Modular assembly of hollow-molded clay torso and limbs, individualized hand-sculpted facial features, topknot coiffure, and kiln firing at 1000°C',
    biography: `In March 1974, a group of local farmers drilling a water well near Lintong, 30 km east of Xi\'an, struck fragments of terracotta and bronze weapons. Their find led to the unearthing of one of the greatest archaeological discoveries of the 20th century: the subterranean necropolis of Qin Shi Huang, the First Emperor who unified China in 221 BC.

Guarding the emperor\'s tomb were over 8,000 life-sized terracotta soldiers, 130 chariots with 520 horses, and 150 cavalry horses, arranged in strict military battle formation. Among these silent legions, the Kneeling Archer from Pit 2 is celebrated as an artistic and technical triumph. Resting on his right knee with his left knee raised, his hands are poised to draw and release a high-tension bronze crossbow. Unlike many standing figures that were shattered when timber roofs collapsed in antiquity, the compact, low-center-of-gravity kneeling posture spared this warrior from severe damage, preserving exquisite micro-details of his braided topknot, riveted lamellar armor, and even the tread pattern on the soles of his shoes.`,
    historicalContext: `Before Qin Shi Huang unified the realm, China was torn by centuries of catastrophic conflict known as the Warring States Period. The state of Qin conquered all rival kingdoms through ruthless military efficiency, standardized writing, weights, and measures, and technological superiority in mass-produced weapons (including interchangeable bronze crossbow triggers). To safeguard his eternal dominion in the afterlife, the emperor mobilized an estimated 700,000 conscripted laborers to construct a colossal subterranean universe.`,
    significance: `Every single terracotta warrior features a unique, individualized face—no two among the thousands are identical. The Kneeling Archer demonstrates extraordinary realism: his hair is meticulously braided into a side topknot held by an imperial hairpin, his armor plates are linked by sculpted cords and studs, and the soles of his square-toed shoes display realistic anti-skid stitch patterns. He is an enduring testament to the organizational and artistic supremacy of Qin China.`,
    keyFeatures: [
      'Poised kneeling stance with torso tilted slightly right, ready to load and fire a bronze repeating crossbow',
      'Intricately braided hair swept into a topknot on the right side of the crown, secured with an imperial hair ribbon',
      'Overlapping rectangular armor plates (lamellae) fastened with rivets to allow chest flexibility',
      'Detailed footwear showing raised textured circular grips on the bottom of the leather shoe sole',
      'Traces of original "Han Purple" (barium copper silicate) pigment and vermilion lacquer surviving in armor folds'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Terracotta_Army_Kneeling_Archer.jpg/1024px-Terracotta_Army_Kneeling_Archer.jpg',
        caption: 'The Kneeling Archer of Pit 2 displaying realistic combat readiness and intact armor detailing',
        angle: 'Full Kneeling Profile'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Front Ready Posture (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Terracotta_Army_Kneeling_Archer.jpg/1024px-Terracotta_Army_Kneeling_Archer.jpg', annotation: 'Hands poised in gripping stance originally holding wooden-stock bronze crossbow' },
      { angleDeg: 45, label: 'Right Topknot Profile (45°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Terracotta_Army_Kneeling_Archer.jpg/1024px-Terracotta_Army_Kneeling_Archer.jpg', annotation: 'Intricately braided topknot tilted toward the right shoulder' },
      { angleDeg: 90, label: 'Right Armor Flank (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Terracotta_Army_Kneeling_Archer.jpg/1024px-Terracotta_Army_Kneeling_Archer.jpg', annotation: 'Kneeling right thigh anchored flat against the earth' },
      { angleDeg: 135, label: 'Right-Rear Cuirass (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Terracotta_Army_Kneeling_Archer.jpg/1024px-Terracotta_Army_Kneeling_Archer.jpg', annotation: 'Rear armor plates overlapping downward to shed rainwater and arrow strikes' },
      { angleDeg: 180, label: 'Rear Torso & Quiver Slot (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Terracotta_Army_Kneeling_Archer.jpg/1024px-Terracotta_Army_Kneeling_Archer.jpg', annotation: 'Back view showing belt fastening and quiver harness placement' },
      { angleDeg: 225, label: 'Shoe Sole Tread (225°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Terracotta_Army_Kneeling_Archer.jpg/1024px-Terracotta_Army_Kneeling_Archer.jpg', annotation: 'Astonishing textured stitch treads on the bottom sole of the raised left shoe' },
      { angleDeg: 270, label: 'Left Knee Support (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Terracotta_Army_Kneeling_Archer.jpg/1024px-Terracotta_Army_Kneeling_Archer.jpg', annotation: 'Vertical left shin providing balanced tactical tripod firing posture' },
      { angleDeg: 315, label: 'Facial Gaze (315°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Terracotta_Army_Kneeling_Archer.jpg/1024px-Terracotta_Army_Kneeling_Archer.jpg', annotation: 'Focused, steady gaze reflecting the discipline of Qin professional soldiers' }
    ],
    funFacts: [
      'The warriors were originally painted in radiant lifelike colors including bright pink, green, blue, and purple, but exposure to dry air upon excavation caused the lacquer to curl and peel within minutes.',
      'The "Han Purple" synthetic pigment found on the archer\'s tunic is a complex barium copper silicate compound that does not occur in nature and was not synthesized in the West until the 20th century.',
      'The actual burial mound of Emperor Qin Shi Huang himself remains unexcavated to this day, protected by ancient accounts of mercury rivers and crossbow booby-traps.'
    ],
    relatedSearchTerms: ['terracotta army', 'qin dynasty', 'first emperor', 'xi\'an', 'kneeling archer', 'ancient china']
  },
  {
    id: 'bust-of-nefertiti',
    name: 'Bust of Queen Nefertiti',
    subtitle: 'The Iconic Regal Portrait of Grace and Beauty from the Amarna Age',
    category: 'Ancient Sculpture',
    era: '18th Dynasty (Amarna Period, New Kingdom Egypt)',
    periodYear: 'c. 1345 BC',
    origin: 'Workshop of Master Sculptor Thutmose, Tell el-Amarna (Akhetaten), Egypt',
    region: 'Nile Valley & Middle Egypt',
    dateDiscovered: 'December 6, 1912 AD',
    discoveredBy: 'Ludwig Borchardt (German Orient Company expedition)',
    currentLocation: {
      museum: 'Neues Museum (Museumsinsel)',
      city: 'Berlin',
      country: 'Germany',
      galleryRoom: 'North Cupola Hall (Room 210)',
      accessionNumber: 'Ägyptisches Museum Berlin, Inv. 21834',
      websiteUrl: 'https://www.smb.museum/en/museums-institutions/neues-museum/home/',
      visitingGuide: 'Preserved standalone under a central glass dome in the North Cupola Room; photography is strictly restricted to protect the pigment.'
    },
    dimensions: 'Height: 48 cm (18.9 in); Weight: Approximately 20 kg',
    weight: 'Approximately 20 kg',
    material: 'Limestone core covered with sculpted fine stucco plaster layers, painted with mineral pigments, right eye inlaid with rock crystal and black wax',
    craftsmanshipTechnique: 'Chiseled limestone master model overlaid with modeled plaster coats for subtle facial wrinkles; natural mineral pigments (carbon black, red ochre, Egyptian blue)',
    biography: `On December 6, 1912, German archaeologist Ludwig Borchardt was supervising excavations at Tell el-Amarna, the abandoned capital built by the monotheistic Pharaoh Akhenaten. Digging into the ruins of House P47.1—the workshop and studio of "The King\'s Favourite and Master of Works, the Sculptor Thutmose"—excavators discovered this breathtaking limestone bust lying face-down in rubble. Borchardt wrote in his diary: "Description is useless, one must see it with one\'s own eyes... Words are wasted."

The bust portrays Queen Nefertiti, Great Royal Wife of Akhenaten and stepmother to Tutankhamun. Renowned for her beauty (her name translates as "The Beautiful One Has Come"), Nefertiti was not merely a queen consort, but an extraordinarily powerful co-ruler who is depicted in temple reliefs driving her own war chariot and smiting enemies. Sculpted as a teaching model or master sculptor's standard for artists producing royal portraits, the bust features Nefertiti wearing her distinctive tall, flat-topped blue crown (*khepresh*-variant) banded with a golden ribbon and the royal Uraeus.`,
    historicalContext: `During the Amarna Period (c. 1353–1336 BC), Akhenaten radically broke with centuries of Egyptian polytheism, moving the capital to Akhetaten and declaring the sun disc Aten the sole deity. Amarna art dramatically departed from stiff, idealized tradition, introducing fluid lines, naturalistic contours, and intimate family scenes. The bust of Nefertiti represents the sublime maturity of this style, balancing lifelike human softness with regal, timeless geometry.`,
    significance: `The Bust of Nefertiti is one of the most recognized and celebrated masterpieces of world art, rivaling the Mona Lisa as a global symbol of feminine grace, regal dignity, and artistic perfection. CT-scans conducted in 2006 revealed a finely carved limestone inner core beneath the stucco skin, proving that Thutmose applied thin plaster layers over the cheekbones, mouth, and neck to render exquisite, subtle human realism.`,
    keyFeatures: [
      'Regal flat-topped blue crown wrapped with a multicolored diademed ribbon and golden Uraeus loop',
      'Right eye inlaid with translucent rock crystal and delicate black wax pupil; left eye intentionally left blank as a sculptor\'s model',
      'Broad floral collar necklace adorned with blue, green, and red mineral glazes',
      'Slender, elongated swan neck balancing the backward tilt of the heavy crown with optical poise',
      'Subtle modeling around the mouth and eyelids revealing gentle human maturity beneath divine grace'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nofretete_Neues_Museum.jpg/1024px-Nofretete_Neues_Museum.jpg',
        caption: 'The painted bust of Queen Nefertiti in the Neues Museum Berlin',
        angle: 'Frontal Three-Quarter View'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Frontal Majesty (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nofretete_Neues_Museum.jpg/1024px-Nofretete_Neues_Museum.jpg', annotation: 'Symmetrical facial features with iconic tall flat-topped blue crown' },
      { angleDeg: 45, label: 'Right Inlaid Eye (45°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nofretete_Neues_Museum.jpg/1024px-Nofretete_Neues_Museum.jpg', annotation: 'Rock crystal eye pupil casting authentic light reflections' },
      { angleDeg: 90, label: 'Right Profile (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nofretete_Neues_Museum.jpg/1024px-Nofretete_Neues_Museum.jpg', annotation: 'Classic backward slant of the crown counterbalancing the jawline' },
      { angleDeg: 135, label: 'Right-Rear Nape (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nofretete_Neues_Museum.jpg/1024px-Nofretete_Neues_Museum.jpg', annotation: 'Graceful elongated neck muscles rendered with anatomical precision' },
      { angleDeg: 180, label: 'Rear Crown Contour (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nofretete_Neues_Museum.jpg/1024px-Nofretete_Neues_Museum.jpg', annotation: 'Vertical rear crown plane with deep Egyptian blue pigment' },
      { angleDeg: 225, label: 'Left-Rear Angle (225°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nofretete_Neues_Museum.jpg/1024px-Neues_Museum.jpg', annotation: 'Plaster coat over limestone core revealed by modern CT tomographies' },
      { angleDeg: 270, label: 'Left Blank Socket Profile (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nofretete_Neues_Museum.jpg/1024px-Nofretete_Neues_Museum.jpg', annotation: 'Uncarved left eye socket confirming the bust was a master sculptor\'s studio prototype' },
      { angleDeg: 315, label: 'Three-Quarter Smile (315°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nofretete_Neues_Museum.jpg/1024px-Nofretete_Neues_Museum.jpg', annotation: 'Subtle, enigmatic expression that captivated early 20th-century audiences' }
    ],
    funFacts: [
      'The left eye never contained a rock crystal pupil; it was deliberately left unfinished by Thutmose so apprentice sculptors could observe how to carve the empty eye socket.',
      'Egypt has officially requested the repatriation of the bust from Germany multiple times since the 1920s, arguing it was deceptively exported out of Egypt.',
      'The bust\'s limestone core has slightly more pronounced wrinkles around the mouth and eyes, suggesting Thutmose softened the portrait with plaster to flatter the queen.'
    ],
    relatedSearchTerms: ['nefertiti', 'amarna', 'ancient egypt', 'akhenaten', 'neues museum', 'sculpture']
  },
  {
    id: 'code-of-hammurabi',
    name: 'The Stele of the Code of Hammurabi',
    subtitle: 'The Towering Black Diorite Lawgiver Monument of Ancient Babylon',
    category: 'Inscribed Stele',
    era: 'Old Babylonian Empire',
    periodYear: 'c. 1754 BC',
    origin: 'Sippar or Babylon (Recovered from the Acropolis of Susa, modern Khuzestan, Iran)',
    region: 'Mesopotamia & Elam',
    dateDiscovered: 'December 1901 – January 1902 AD',
    discoveredBy: 'Father Jean-Vincent Scheil and Jacques de Morgan (French Archaeological Mission to Persia)',
    currentLocation: {
      museum: 'Musée du Louvre',
      city: 'Paris',
      country: 'France',
      galleryRoom: 'Department of Near Eastern Antiquities, Richelieu Wing, Ground Floor, Room 227',
      accessionNumber: 'Sb 8',
      websiteUrl: 'https://collections.louvre.fr/en/ark:/53355/cl010174438',
      visitingGuide: 'The monolithic black pillar stands prominently in the center of Room 227, surrounded by Babylonian and Elamite antiquities.'
    },
    dimensions: 'Height: 225 cm (7 ft 5 in); Circumference at base: 190 cm; Top width: 65 cm',
    weight: 'Approximately 4,000 kg (4 metric tons)',
    material: 'Single monolithic pillar of polished black diorite (or gabbro)',
    craftsmanshipTechnique: 'Monumental basaltic stone carving, high-relief sculpted summit frieze, and 4,130 lines of Akkadian cuneiform incised in horizontal registers',
    biography: `Carved around 1754 BC during the 30th year of the reign of King Hammurabi of Babylon, this imposing black diorite stele is one of the oldest deciphered legal codes of significant length in world history. Hammurabi united Mesopotamia by conquering rival city-states (including Larsa, Mari, and Eshnunna), forging the first Old Babylonian Empire. To establish uniform justice and standard legal obligations throughout his realm, he compiled 282 legal edicts into this permanent monument.

At the summit of the stele, a majestic 65 cm high-relief sculpture depicts King Hammurabi standing humbly with his hand raised before Shamash, the Mesopotamian solar deity of justice and divine law. Shamash sits enthroned with rays of divine sunlight emanating from his shoulders, presenting to Hammurabi the measuring rod and ring—ancient symbols of lawful governance and architectural truth. Beneath this relief, the rest of the stone is covered in 4,130 lines of razor-sharp Akkadian cuneiform writing.

Around 1158 BC, Shutruk-Nakhunte, king of neighboring Elam, raided Babylon and carried the stele off as a war trophy to his capital of Susa. It lay buried in Susa for over 3,000 years until French excavators discovered it broken into three massive pieces in 1901.`,
    historicalContext: `Before Hammurabi, Mesopotamia possessed earlier partial legal codes (such as the Code of Ur-Nammu and the Laws of Lipit-Ishtar), but Hammurabi\'s compilation was unprecedented in its scope, precision, and enduring prestige. It tackled issues of contract law, family law, inheritance, medical malpractice, trade regulations, minimum wages, property theft, and military obligations. It introduced the famous principle of *lex talionis* ("an eye for an eye, a tooth for a tooth"), establishing that punishment must be legally regulated by the state rather than through endless private blood feuds.`,
    significance: `The Code of Hammurabi laid the philosophical foundations for legal codified justice that influenced biblical law, Roman jurisprudence, and modern constitutional legal codes. It declared the presumption of innocence—mandating that an accuser who fails to prove their capital charge must face the death penalty—and established written accountability so that "the strong may not oppress the weak."`,
    keyFeatures: [
      'Towering 2.25-meter polished black diorite stele weighing 4 tons',
      'Sculpted top relief showing Shamash, the god of justice, investing Hammurabi with the royal rod and ring',
      '282 legal judgments dealing with criminal, civil, agricultural, and commercial disputes',
      'Famous early articulation of retaliatory proportionality: "an eye for an eye"',
      'Prologue and Epilogue calling down divine curses upon any future king who alters or erases the laws'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Code_of_Hammurabi_Louvre_Sb8.jpg/1024px-Code_of_Hammurabi_Louvre_Sb8.jpg',
        caption: 'The towering black diorite stele of the Code of Hammurabi preserved at the Louvre Museum',
        angle: 'Full Monolith & Cuneiform Columns'
      }
    ],
    views360: [
      { angleDeg: 0, label: 'Front Relief Frieze (0°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Code_of_Hammurabi_Louvre_Sb8.jpg/1024px-Code_of_Hammurabi_Louvre_Sb8.jpg', annotation: 'Hammurabi receiving the rod and ring of justice from the sun god Shamash' },
      { angleDeg: 45, label: 'Right Cuneiform Register (45°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Code_of_Hammurabi_Louvre_Sb8.jpg/1024px-Code_of_Hammurabi_Louvre_Sb8.jpg', annotation: 'Vertical columns of Akkadian cuneiform reading from top to bottom' },
      { angleDeg: 90, label: 'Right Pillar Flange (90°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Code_of_Hammurabi_Louvre_Sb8.jpg/1024px-Code_of_Hammurabi_Louvre_Sb8.jpg', annotation: 'Curved diorite circumference polished to a glassy volcanic sheen' },
      { angleDeg: 135, label: 'Reverse Legal Column (135°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Code_of_Hammurabi_Louvre_Sb8.jpg/1024px-Code_of_Hammurabi_Louvre_Sb8.jpg', annotation: 'Laws regulating family marriage, divorce, and inheritance rights' },
      { angleDeg: 180, label: 'Full Dorsal Reverse (180°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Code_of_Hammurabi_Louvre_Sb8.jpg/1024px-Code_of_Hammurabi_Louvre_Sb8.jpg', annotation: '28 continuous horizontal registers of legal jurisprudence' },
      { angleDeg: 225, label: 'Elamite Erased Zone (225°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Code_of_Hammurabi_Louvre_Sb8.jpg/1024px-Code_of_Hammurabi_Louvre_Sb8.jpg', annotation: 'Section scraped blank by Elamite King Shutruk-Nakhunte to carve his own name' },
      { angleDeg: 270, label: 'Left Monolith Flange (270°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Code_of_Hammurabi_Louvre_Sb8.jpg/1024px-Code_of_Hammurabi_Louvre_Sb8.jpg', annotation: 'Basal circumference widening to 1.9 meters for stability' },
      { angleDeg: 315, label: 'Prologue Inscription (315°)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Code_of_Hammurabi_Louvre_Sb8.jpg/1024px-Code_of_Hammurabi_Louvre_Sb8.jpg', annotation: 'Opening hymn listing Hammurabi\'s pious restorations of temples across Sumer and Akkad' }
    ],
    funFacts: [
      'The stele contains laws addressing medical malpractice: if a surgeon performed an operation with a bronze lancet and caused the patient to die, his hand was cut off as punishment.',
      'The Elamite king who stole the stele in 1158 BC shaved off four or five columns of text intending to carve his own inscription, but died before he could do so, leaving a smooth blank patch.',
      'A bas-relief portrait of Hammurabi receiving the law is featured directly above the gallery doors of the United States House of Representatives Chamber in Washington, D.C.'
    ],
    relatedSearchTerms: ['code of hammurabi', 'babylon', 'cuneiform', 'ancient law', 'louvre', 'mesopotamia']
  }
];

/**
 * Deterministically retrieves the Daily Historical Artifact for any calendar date.
 * Guarantees that every visitor on a given day sees the exact same artifact.
 */
export function getDailyArtifactForDate(date: Date = new Date()): DailyArtifact {
  const year = date.getFullYear();
  const startOfYear = new Date(Date.UTC(year, 0, 0));
  const currentUtc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayOfYear = Math.floor((currentUtc.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const index = Math.abs(dayOfYear) % ALL_DAILY_ARTIFACTS.length;
  return ALL_DAILY_ARTIFACTS[index];
}

/**
 * Search artifacts by ID
 */
export function getDailyArtifactById(id: string): DailyArtifact | undefined {
  return ALL_DAILY_ARTIFACTS.find(a => a.id === id);
}
