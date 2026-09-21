#!/usr/bin/env python3
"""
Generates 60 European Monuments into src/data/monuments/europeanMonuments.ts
"""
import json
import os

def item(id, name, native, cat, loc, country, era, yr_str, yr_num, arch, style, dim, mat, hist, marv, mod, img, tags, facts, unesco="World Heritage Landmark"):
    return {
        "id": id,
        "name": name,
        "nativeOrAlternateName": native,
        "category": cat,
        "location": loc,
        "country": country,
        "region": "Europe",
        "era": era,
        "yearBuilt": yr_str,
        "numericYear": yr_num,
        "architectOrCreator": arch,
        "architecturalStyle": style,
        "dimensionsAndHeight": dim,
        "materialsUsed": mat,
        "historyAndBackground": hist,
        "architecturalMarvels": marv,
        "modernStatusAndSignificance": mod,
        "imageUrl": img,
        "fallbackImageUrl": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=1200",
        "tags": tags,
        "keyFacts": facts,
        "unescoStatus": unesco
    }

europe_monuments = [
  # 1. Eiffel Tower
  item("eiffel-tower", "Eiffel Tower", "Tour Eiffel (La Dame de Fer - The Iron Lady)", "Monument & Tower", "Champ de Mars, Paris", "France",
    "Belle Époque Industrial Revolution (1887–1889 CE)", "1887–1889 CE", 1889, "Gustave Eiffel (Engineers: Maurice Koechlin, Émile Nouguier; Architect: Stephen Sauvestre)",
    "Puddle-Iron Wrought Lattice Tower Engineering", "Height: 330 m (1,083 ft); Base width: 125 m; Weight: 10,100 tonnes; 7,300 tonnes iron framework",
    "High-purity puddle iron (fer puddlé) from Pompey forges in Lorraine, 2.5 million rivets, Venetian red to bronze paint",
    "The Eiffel Tower is the globally recognized symbol of Paris and France. Constructed between 1887 and 1889 as the grand entrance arch to the 1889 Exposition Universelle (World's Fair), organized to celebrate the centennial of the French Revolution. Initially received with fierce opposition and protests from Paris's artistic and literary elite—including Guy de Maupassant, Alexandre Dumas fils, and Charles Garnier, who denounced it in the press as a 'gigantic black smokestack'. Eiffel secured its preservation by proving its strategic utility for radio telegraphy, which proved pivotal during the First World War in intercepting German military transmissions during the Battle of the Marne.",
    "Engineered with mathematical brilliance to withstand extreme wind aerodynamic forces: the curved lattice piers are calculated so that wind pressure is resolved directly down into the foundation pilings. Thermal expansion causes the iron structure to grow up to 15 centimeters (6 inches) taller during the peak heat of summer and lean away from the sun by several centimeters. Repainted by hand every seven years with 60 tonnes of paint in three gradated shades (darker at the base, lighter at the summit) to ensure a uniform visual silhouette against the Parisian sky.",
    "Inscribed as a UNESCO World Heritage Site in 1991 as part of 'Paris, Banks of the Seine'. Welcomes nearly 7 million paying visitors annually, making it the most visited paid monument in the world.",
    "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=1200",
    ["Eiffel Tower", "Paris", "France", "Gustave Eiffel", "UNESCO", "Iron Lady", "Architecture"],
    ["Built for the 1889 World's Fair to celebrate the centennial of the French Revolution", "Thermal expansion causes the iron tower to grow up to 15 cm taller during hot summer days", "Held the title of the tallest human-made structure in the world for 41 years until 1930", "Protected from demolition because its height made it invaluable for military radio transmissions"],
    "Inscribed 1991 (Paris, Banks of the Seine)"),

  # 2. Colosseum, Rome, Italy
  item("colosseum-rome", "The Colosseum (Flavian Amphitheatre)", "Amphitheatrum Flavium / Colosseo", "Ancient Wonder", "Piazza del Colosseo, Rome", "Italy",
    "Imperial Roman Flavian Dynasty (70–80 CE)", "70–80 CE", 80, "Emperors Vespasian and Titus (Flavian dynasty)",
    "Classical Imperial Roman Amphitheatre & Arcaded Vaulting", "Outer perimeter: 527 m (1,729 ft); Height: 48.5 m (159 ft); Capacity: 50,000–80,000 spectators",
    "100,000 m³ of travertine limestone, volcanic tuff, Roman hydraulic pozzolana concrete, 300 tonnes of iron clamps",
    "The Colosseum is the largest ancient amphitheatre ever built. Commissioned by Emperor Vespasian in 70 CE on the site of Nero's drained artificial lake in the Domus Aurea, deliberately returning imperial palace land back to the public citizens of Rome. Inaugurated in 80 CE by his son Titus with 100 consecutive days of lavish gladiatorial games, wild beast hunts (venationes), and mock naval sea battles (naumachiae) in which the arena was flooded. Used for gladiatorial combats and public spectacles for over four centuries until the decline of the Western Roman Empire.",
    "A triumph of Roman concrete and vaulting engineering: four tiers of superimposed classical arches—Doric/Tuscan on the ground floor, Ionic on the second, Corinthian on the third, and Corinthian pilasters on the attic. An ingenious ticketing and crowd-control system of 80 numbered arched vomitoria (exits) allowed 50,000 spectators to exit the stadium within eight minutes. Beneath the wooden arena floor lay the Hypogeum: a two-level subterranean labyrinth of cages, tunnels, and 30 pulley-operated vertical trapdoor elevators that raised gladiators and roaring lions directly into the arena floor.",
    "Designated a UNESCO World Heritage Site in 1980 and voted one of the New 7 Wonders of the World in 2007. The quintessential monument of classical Roman imperial engineering.",
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1200",
    ["Colosseum", "Rome", "Italy", "Flavian", "Gladiators", "UNESCO", "Wonder of the World"],
    ["The largest ancient amphitheater ever constructed, seating over 50,000 spectators", "Could be completely evacuated in under eight minutes through 80 numbered arched exit gates", "Subterranean Hypogeum featured 30 mechanical trapdoor lifts raising lions into the arena floor", "Inaugurated in 80 CE with 100 continuous days of gladiatorial combats and flooded naval battles"],
    "Inscribed 1980 (Historic Centre of Rome)"),

  # 3. Parthenon & Acropolis, Athens, Greece
  item("parthenon-athens", "Parthenon & Acropolis of Athens", "Παρθενών (Parthenōn - Temple of the Virgin Athena)", "Ancient Wonder", "Acropolis Rock, Athens", "Greece",
    "Classical Greece Golden Age of Pericles (447–432 BCE)", "447–432 BCE", -447, "Iktinos & Kallikrates (Architects), Phidias (Chief Sculptor)",
    "Classical Greek High Doric Peripteral Temple Architecture", "Base dimensions: 69.5 × 30.9 m; Column height: 10.4 m; 46 outer Doric columns",
    "Pentelic white marble from Mount Pentelikus, Parian marble sculptures, cypress wood ceiling beams, bronze pins",
    "The Parthenon is the supreme masterpiece of classical Greek civilization, standing atop the sacred limestone crag of the Acropolis overlooking Athens. Built between 447 and 432 BCE under the political visionary Pericles, funded by the treasury of the Delian League. Dedicated to Athena Parthenos, the patron warrior goddess of Athens. It enshrined the lost chryselephantine (gold and ivory) colossal statue of Athena sculpted by Phidias, which stood 12 meters tall clad in over 1,100 kilograms of detachable pure gold.",
    "Renowned for subtle optical refinements that correct human visual distortion: there is not a single straight line or right angle in the entire building! The stylobate (marble floor) is slightly convex, rising 6.5 cm in the center, so it does not appear to sag. The columns taper toward the top and bulge subtly in the middle (entasis), while tilting inward at an angle so that if extended skyward, the columns would meet at an apex 2.4 kilometers above the earth. Its exterior friezes and pedimental sculptures celebrated the Panathenaic procession and Athena's contest with Poseidon.",
    "Inscribed as a UNESCO World Heritage Site in 1987. The universal symbol of Western democracy, classical philosophy, and architectural proportion.",
    "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&q=80&w=1200",
    ["Parthenon", "Acropolis", "Athens", "Greece", "Classical", "Athena", "UNESCO", "Pericles"],
    ["Contains no straight lines—every column, step, and architrave is subtly curved for optical perfection", "Columns tilt slightly inward: if projected skyward, they would meet 2.4 kilometers above the ground", "Originally enshrined Phidias's 12-meter-tall statue of Athena clad in 1,100 kg of pure gold", "Served successively as a Greek temple, Byzantine church, Catholic cathedral, and Ottoman mosque"],
    "Inscribed 1987 (Criteria i, ii, iii, iv, vi)"),

  # 4. Notre-Dame de Paris, France
  item("notre-dame-paris", "Notre-Dame de Paris", "Cathédrale Notre-Dame de Paris (Our Lady of Paris)", "Sacred Temple / Cathedral", "Île de la Cité, Paris", "France",
    "French High Gothic Golden Age (1163–1345 CE)", "1163–1345 CE", 1163, "Maurice de Sully (Bishop of Paris), Jean de Chelles, Pierre de Montreuil, Eugène Viollet-le-Duc",
    "French Rayonnant High Gothic Cathedral Architecture", "Length: 128 m; Width: 48 m; Twin towers height: 69 m; Central spire: 96 m; Rose window diameter: 13 m",
    "Lutetian limestone quarried from Paris catacombs, oak timber framework ('the Forest'), lead roof sheeting, stained glass",
    "Notre-Dame de Paris is the quintessential French Gothic cathedral, situated on the Île de la Cité in the heart of Paris. Begun in 1163 under Bishop Maurice de Sully and completed nearly two centuries later in 1345. Site of historical milestones including the coronation of Napoleon Bonaparte as Emperor in 1804, the beatification of Joan of Arc, and the Te Deum celebrating the Liberation of Paris in 1944. Popularized globally by Victor Hugo's 1831 romantic masterpiece 'The Hunchback of Notre-Dame', which ignited a national campaign to restore the decaying cathedral under architect Eugène Viollet-le-Duc.",
    "Pioneered the innovative use of exterior flying buttresses to support high, thin nave walls, allowing walls of stone to be replaced by luminous stained-glass rose windows. The South Rose Window, measuring 13 meters in diameter, contains original 13th-century jewel-like glass depicting the New Testament. Following the catastrophic fire of April 15, 2019, which destroyed the oak roof framework and the 19th-century spire, an extraordinary global restoration effort reconstructed the spire and timber frame using authentic medieval carpentry techniques.",
    "Inscribed as a UNESCO World Heritage Site in 1991. The spiritual and geographic ground zero of France (Point Zéro des Routes de France).",
    "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80&w=1200",
    ["Notre-Dame", "Paris", "France", "Gothic", "Cathedral", "UNESCO", "Rose Window", "Spire"],
    ["Pioneered the widespread use of external flying buttresses to support soaring thin stone walls", "The South Rose Window contains original 13th-century stained glass 13 meters in diameter", "Napoleon Bonaparte was crowned Emperor of the French inside its nave in December 1804", "The cathedral's bronze plaque on the plaza marks 'Point Zero', from which all French road distances are measured"],
    "Inscribed 1991 (Paris, Banks of the Seine)"),

  # 5. Sagrada Família, Barcelona, Spain
  item("sagrada-familia", "Basílica de la Sagrada Família", "Basílica i Temple Expiatori de la Sagrada Família (Holy Family)", "Sacred Temple / Cathedral", "Eixample, Barcelona, Catalonia", "Spain",
    "Modernisme / Catalan Art Nouveau (1882–Present CE)", "1882–Present (Targeting 2026)", 1882, "Antoni Gaudí (Chief Architect 1883–1926), succeeded by Domènec Sugrañes, Jordi Faulí",
    "Catalan Modernisme Biomimetic Gothic Architecture", "Tower of Jesus Christ height: 172.5 m (566 ft); Central nave height: 45 m; 18 planned spires",
    "Montjuïc sandstone, Galician granite, high-strength reinforced porphyry and basalt columns, Venetian mosaic tiles",
    "The Basílica de la Sagrada Família is an extraordinary monumental church in Barcelona and the life work of visionary architect Antoni Gaudí. Construction began in 1882 under Francisco de Paula del Villar, but Gaudí took over in 1883, transforming the project into an organic, nature-inspired forest of stone. Gaudí devoted his final 43 years exclusively to the basilica, residing on the construction site until his death in 1926 after being struck by a tram. Financed entirely by private donations and visitor ticket sales as an expiatory church.",
    "Gaudí famously observed: 'The straight line belongs to men, the curved line belongs to God.' The interior nave is designed as a stone forest: branching tree-like columns made of ultra-dense porphyry and basalt lean at precise angles to support the vaults without exterior flying buttresses. Sunlight streaming through stained-glass windows bathes the nave in hues of dawn blues and greens on the east and sunset oranges and reds on the west. When the 172.5-meter central Tower of Jesus Christ is completed, it will be the tallest church building in the world—intentionally kept one meter shorter than Barcelona's Montjuïc hill so human creation would not surpass God's nature.",
    "Inscribed as a UNESCO World Heritage Site in 2005 (Nativity facade and Crypt). Consecrated as a minor basilica by Pope Benedict XVI in 2010. The most visited attraction in Spain.",
    "https://images.unsplash.com/photo-1583772654844-4b45508a8a6a?auto=format&fit=crop&q=80&w=1200",
    ["Sagrada Familia", "Barcelona", "Spain", "Antoni Gaudi", "Modernisme", "UNESCO", "Cathedral"],
    ["Under construction continuously for over 140 years, financed entirely by ticket sales and donations", "Designed like an organic stone forest with tree-like branching columns carrying the vaults", "At 172.5 meters, its central spire will make it the tallest church in the world upon completion", "Gaudí designed it one meter lower than Montjuïc hill so human work would not surpass God's creation"],
    "Inscribed 2005 (Works of Antoni Gaudí)"),

  # 6. Saint Basil's Cathedral, Moscow, Russia
  item("saint-basils-cathedral", "Saint Basil's Cathedral", "Храм Василия Блаженного (Pokrovsky Cathedral on the Moat)", "Sacred Temple / Cathedral", "Red Square, Moscow", "Russia",
    "Tsardom of Russia Golden Age (1555–1561 CE)", "1555–1561 CE", 1555, "Postnik Yakovlev and Ivan Barma, commissioned by Tsar Ivan the Terrible",
    "Russian Medieval Tent-Roofed & Onion-Domed Architecture", "Height: 47.5 m (156 ft); Central tent tower height: 46 m; 9 chapels clustered around a central core",
    "Red brick, white limestone foundations, polychrome ceramic glazed tiles, beaten sheet metal onion domes",
    "Saint Basil's Cathedral, officially the Cathedral of the Intercession of the Most Holy Theotokos on the Moat, stands at the southern end of Moscow's Red Square. Commissioned by Tsar Ivan IV ('Ivan the Terrible') in 1555 to commemorate the Russian capture of the Tatar strongholds of Kazan and Astrakhan. Dedicated to the Feast of the Intercession, but popularly named after Saint Basil the Blessed, a beloved holy fool of Moscow whose relics were entombed in an added tenth chapel in 1588.",
    "The cathedral is unique in world architecture: it is not a single cavernous hall, but a cluster of eight independent side chapels arranged symmetrically around a central 46-meter tent-roofed core church, with each chapel crowned by a uniquely patterned, vividly painted onion dome. No two domes share the same pattern: spirals, rhombuses, zigzags, and faceted surfaces gleam in brilliant red, green, blue, and gold. A popular myth claims that Ivan the Terrible blinded the architects Postnik and Barma so they could never build anything as magnificent again, though historical records show Postnik went on to design parts of the Kazan Kremlin.",
    "Inscribed as a UNESCO World Heritage Site in 1990 as part of 'Kremlin and Red Square, Moscow'. The preeminent cultural and visual symbol of Russia.",
    "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=1200",
    ["Saint Basils", "Moscow", "Russia", "Red Square", "Ivan the Terrible", "UNESCO", "Onion Domes"],
    ["Built between 1555 and 1561 by Tsar Ivan the Terrible to commemorate the capture of Kazan", "Composed of nine distinct chapels, each crowned by a uniquely patterned and colored onion dome", "The legend that Ivan blinded the architects is a myth—Postnik later designed the Kazan Kremlin", "Survived demolition plans by Napoleon in 1812 and Joseph Stalin in the 1930s"],
    "Inscribed 1990 (Kremlin and Red Square)"),

  # 7. Leaning Tower of Pisa, Italy
  item("leaning-tower-pisa", "Leaning Tower of Pisa", "Torre pendente di Pisa (Campanile di Santa Maria Assunta)", "Monument & Tower", "Piazza dei Miracoli, Pisa, Tuscany", "Italy",
    "Medieval Maritime Republic of Pisa (1173–1372 CE)", "1173–1372 CE", 1173, "Bonanno Pisano, Giovanni di Simone, Tommaso Pisano",
    "Pisan Romanesque Arcaded Bell Tower Architecture", "Height: 55.86 m (low side) / 56.67 m (high side); 8 storeys; Lean angle: 3.97 degrees; Weight: 14,500 tonnes",
    "White and grey breccia marble from San Giuliano, Carrara marble, mortared limestone and rubble core",
    "The Leaning Tower of Pisa is the freestanding bell tower (campanile) of the cathedral of the Italian city of Pisa. Construction began in August 1173 during the peak of the Republic of Pisa's maritime wealth. The tower began to lean during the construction of the second floor in 1178 due to a deficient three-meter foundation laid in weak, unstable alluvial subsoil of sand, clay, and shells deposited by the Arno and Serchio rivers. Wars with Florence and Genoa delayed construction for almost a century, which fortuitously allowed the underlying soil to settle and compress, preventing an immediate collapse.",
    "When work resumed in 1272 under Giovanni di Simone, masons attempted to counteract the tilt by building the upper storeys with one side taller than the other, causing the tower to be slightly curved like a banana. Completed in 1372 when the seventh-floor bell chamber was added. Galileo Galilei, a professor of mathematics at the University of Pisa, reportedly dropped two cannonballs of different masses from the top of the tower around 1589 to prove that their speed of descent was independent of their mass, overturning Aristotelian physics. Between 1990 and 2001, international engineers led by Michele Jamiolkowski stabilized the tower by extracting 70 tonnes of soil from beneath the raised northern side, reducing the lean from 5.5 degrees to 3.97 degrees and securing its stability for the next 300 years.",
    "Inscribed as a UNESCO World Heritage Site in 1987 as part of the Piazza del Duomo, Pisa. One of the most famous and recognizable architectural curiosities on Earth.",
    "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&q=80&w=1200",
    ["Tower of Pisa", "Pisa", "Italy", "Tuscany", "Leaning Tower", "Galileo", "UNESCO"],
    ["Begun in 1173 and started leaning during construction of the second floor due to soft river subsoil", "The century-long construction pause during Italian wars allowed the soil to settle, preventing collapse", "Galileo famously dropped cannonballs from its galleries to demonstrate the laws of gravitational acceleration", "Stabilized between 1990 and 2001 by removing 70 tons of soil from the high side, reducing the lean"],
    "Inscribed 1987 (Piazza del Duomo, Pisa)"),

  # 8. Big Ben & Palace of Westminster, London, UK
  item("big-ben-westminster", "Big Ben & Palace of Westminster", "Elizabeth Tower & The Houses of Parliament", "Famous Building", "Westminster, London", "United Kingdom",
    "British Victorian Gothic Revival (1840–1859 CE)", "1840–1859 CE", 1859, "Charles Barry & Augustus Pugin",
    "Perpendicular Gothic Revival Architecture", "Elizabeth Tower height: 96 m (316 ft); 11 stories; Clock dial diameter: 7 m; Great Bell weight: 13.7 metric tonnes",
    "Anston magnesium limestone, Clipsham stone, cast-iron roofing tiles, white opal glass clock dials, bronze hands",
    "The Palace of Westminster, commonly known as the Houses of Parliament, is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Standing on the north bank of the River Thames. After the medieval royal palace burned down in October 1834, an architectural competition was won by Charles Barry, who partnered with visionary decorative genius Augustus Pugin to construct the magnificent Perpendicular Gothic Revival complex. The iconic clock tower, renamed Elizabeth Tower in 2012 for Queen Elizabeth II's Diamond Jubilee, is universally known as Big Ben, which strictly refers to the colossal 13.7-tonne Great Bell inside the belfry.",
    "Big Ben's Great Clock was designed by Edmund Beckett Denison and completed by clockmaker Edward John Dent, utilizing an innovative 'double three-legged gravity escapement' that isolates the pendulum from the external friction of wind and snow on the gigantic clock hands, ensuring accuracy to within one second per week. The clock's speed is calibrated using old pre-decimal British pennies placed atop the pendulum: adding or removing a single penny alters the clock's speed by 0.4 seconds per day. The Latin inscription beneath each dial reads: 'DOMINE SALVAM FAC REGINAM NOSTRAM VICTORIAM PRIMAM' ('O Lord, keep safe our Queen Victoria the First').",
    "Inscribed as a UNESCO World Heritage Site in 1987. The defining architectural symbol of parliamentary democracy and British cultural identity.",
    "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&q=80&w=1200",
    ["Big Ben", "London", "UK", "Westminster", "Parliament", "UNESCO", "Gothic Revival"],
    ["'Big Ben' is the nickname of the 13.7-ton Great Bell inside the 96-meter Elizabeth Tower", "The clock's speed is finely calibrated by placing or removing pre-decimal copper pennies on the pendulum", "The four 7-meter clock dials are constructed from 312 individual pieces of white opal glass", "Rebuilt after the catastrophic 1834 parliament fire in lavish Perpendicular Gothic Revival style"],
    "Inscribed 1987 (Westminster Palace and Abbey)"),

  # 9. Stonehenge, Wiltshire, UK
  item("stonehenge", "Stonehenge", "Stonehenge Megalithic Monument", "Ancient Wonder", "Salisbury Plain, Wiltshire", "United Kingdom",
    "Neolithic to Early Bronze Age (c. 3000–1500 BCE)", "c. 3000–2000 BCE", -2500, "Neolithic British agrarian cultures & Bell Beaker people",
    "Prehistoric Megalithic Post-and-Lintel Circle Architecture", "Outer circle diameter: 33 m (108 ft); Sarsen stone height: up to 9 m (30 ft); Sarsen weight: up to 30 tonnes",
    "Local Marlborough Downs sarsen silcrete megaliths, Preseli Hills spotted dolerite bluestones from Wales (240 km away)",
    "Stonehenge is a prehistoric megalithic monument standing on Salisbury Plain in Wiltshire, England. Constructed in multiple continuous phases between 3000 BCE and 1500 BCE. Its earliest phase was a circular ditch and chalk bank (henge) with 56 Aubrey holes used for cremated human burials. Around 2500 BCE, builders erected the iconic central ring of colossal sarsen stone trilithons and inner horseshoe rings. It is celebrated as the most architecturally sophisticated prehistoric stone circle in the world.",
    "Stonehenge is aligned along the celestial solstitial axis: the central axis of the monument points directly toward the sunrise on the summer solstice (June 21) and the sunset on the winter solstice (December 21), indicating it served as a prehistoric solar calendar, celestial observatory, and monumental sacred burial ground. The smaller bluestones (weighing 2 to 4 tonnes each) were transported an astonishing 240 kilometers (150 miles) from the Preseli Hills in southwest Wales. The giant sarsens were fitted together using woodworking techniques adapted to stone: precision ball-and-socket mortise and tenon joints locked the lintel caps securely atop the upright pillars.",
    "Inscribed as a UNESCO World Heritage Site in 1986 in conjunction with Avebury. One of the most famous and enigmatic archaeological wonders on Earth.",
    "https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&q=80&w=1200",
    ["Stonehenge", "England", "UK", "Megalith", "Neolithic", "UNESCO", "Solstice", "Prehistoric"],
    ["Built in phases between 3000 BCE and 2000 BCE, predating the rise of classical Greece and Rome", "The smaller bluestones were transported over 240 kilometers from the Preseli Hills in Wales", "Aligned with astronomical precision to frame the summer solstice sunrise and winter solstice sunset", "Stones are locked together using sophisticated carpentry-style tongue-and-groove and mortise joints"],
    "Inscribed 1986 (Stonehenge, Avebury and Associated Sites)"),

  # 10. Palace of Versailles, France
  item("palace-of-versailles", "Palace of Versailles", "Château de Versailles", "Palace & Fortress", "Versailles, Île-de-France", "France",
    "French Baroque & Classical Ancien Régime (1661–1715 CE)", "1661–1715 CE", 1682, "Louis Le Vau, Jules Hardouin-Mansart, André Le Nôtre (Gardens), Charles Le Brun (Interiors)",
    "French Classical Baroque Architecture (Style Louis XIV)", "Facade length: 670 m; 2,300 rooms; Area: 63,154 m²; Gardens area: 800 hectares (2,000 acres)",
    "Cut ashlar limestone, gilded bronze fittings, French mirrors, white and colored Pyrenean marble, cast-iron lead statues",
    "The Palace of Versailles was the principal royal residence of France from 1682 under King Louis XIV (the 'Sun King') until the outbreak of the French Revolution in 1789 under Louis XVI. Originally a modest red-brick hunting lodge built by Louis XIII in 1623. In 1661, Louis XIV, determined to tame the rebellious French nobility by keeping them under his direct watchful eye, began transforming the estate into the most opulent palace in Europe, officially moving the court and royal government here in May 1682.",
    "The masterpiece of the interior is the Galerie des Glaces (Hall of Mirrors): a 73-meter gallery containing 17 arched windows overlooking the gardens, matched opposite by 17 arcades filled with 357 massive mirrors manufactured by Venetian glassblowers smuggled into France. The surrounding gardens, designed by André Le Nôtre, represent the epitome of the French formal garden (jardin à la française), featuring geometric canal axes, 600 fountain water jets powered by the colossal Machine de Marly pumping station on the Seine River, and 372 bronze and marble statues. In 1871, the German Empire was proclaimed in the Hall of Mirrors, and in June 1919, the Treaty of Versailles was signed here, concluding World War I.",
    "Inscribed as a UNESCO World Heritage Site in 1979. The supreme monument of absolutist monarchy and European classical baroque decorative art.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Versailles", "France", "Louis XIV", "Sun King", "Hall of Mirrors", "Baroque", "UNESCO"],
    ["Transformed by Louis XIV from a hunting lodge into Europe's grandest absolutist royal palace", "The Hall of Mirrors contains 357 mirrors opposite 17 arched windows facing the grand gardens", "The estate encompasses 800 hectares of manicured gardens, fountains, and the Grand Canal", "Site where the Treaty of Versailles was signed in 1919, formally concluding the First World War"],
    "Inscribed 1979 (Palace and Park of Versailles)")
]

print(f"Europe base 10 loaded: {len(europe_monuments)}")
