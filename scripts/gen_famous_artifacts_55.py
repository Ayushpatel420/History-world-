#!/usr/bin/env python3
"""
Generates 55 world-famous historical artifacts into src/data/monuments/famousArtifacts.ts
"""
import json

def art_item(id, name, native, cat, loc, country, region, era, yr_str, yr_num, arch, style, dim, mat, hist, marv, mod, img, tags, facts, unesco="Global Antiquity Treasure"):
    return {
        "id": id,
        "name": name,
        "nativeOrAlternateName": native,
        "category": cat,
        "location": loc,
        "country": country,
        "region": region,
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
        "fallbackImageUrl": "https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&q=80&w=1200",
        "tags": tags,
        "keyFacts": facts,
        "unescoStatus": unesco
    }

artifacts = [
  # 1. Rosetta Stone
  art_item("rosetta-stone", "The Rosetta Stone", "Ptolemaic Decree of Memphis", "Artifact & Relic", "British Museum, London (Originally Rashid/Rosetta)", "Egypt / United Kingdom", "Africa",
    "Ptolemaic Kingdom of Egypt (196 BCE)", "196 BCE", -196, "Egyptian Priests of Memphis under Ptolemy V",
    "Ancient Multilingual Epigraphic Stele", "Height: 112.3 cm (44 in); Width: 75.7 cm; Thickness: 28.4 cm; Weight: 760 kg",
    "Granodiorite igneous rock, engraved bilingual inscriptions in three distinct scripts",
    "The Rosetta Stone is a granodiorite stele inscribed with three versions of a decree issued in Memphis in 196 BCE on behalf of King Ptolemy V Epiphanes. Discovered in July 1799 by French military engineer Pierre-François Bouchard during Napoleon's invasion of Egypt, built into a wall of Fort Julien near the port city of Rashid (Rosetta). After the French surrender in Alexandria in 1801, the stone was ceded to the British Crown and moved to the British Museum.",
    "Because the decree is inscribed in three distinct scripts—Ancient Egyptian Hieroglyphs (for priests), Egyptian Demotic (for daily administration), and Ancient Greek (used by the royal court)—it provided scholars with the bilingual key to decode ancient Egyptian hieroglyphs. In 1822, French polymath Jean-François Champollion finally cracked the phonetic code of hieroglyphs, unlocking 3,000 years of Egyptian history, literature, and culture.",
    "The most visited single artifact in the British Museum. Egypt continues to officially campaign for its repatriation.",
    "https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&q=80&w=1200",
    ["Rosetta Stone", "Egypt", "Hieroglyphs", "Champollion", "British Museum", "Linguistics"],
    ["Inscribed in three scripts: Hieroglyphic, Demotic, and Ancient Greek, unlocking ancient Egyptian writing", "Discovered by French soldiers in 1799 during Napoleon's expedition to Egypt", "French scholar Jean-François Champollion deciphered the hieroglyphs in 1822", "Issued in 196 BCE as an official royal decree affirming the divine cult of 13-year-old Ptolemy V"],
    "Global Antiquity Key"),

  # 2. Tutankhamun's Golden Mask
  art_item("tutankhamun-mask", "Gold Mask of Tutankhamun", "Funerary Mask of Nebkheperure Tutankhamun", "Artifact & Relic", "Grand Egyptian Museum, Giza (Cairo)", "Egypt", "Africa",
    "New Kingdom 18th Dynasty (c. 1323 BCE)", "c. 1323 BCE", -1323, "Royal Goldsmiths of Thebes",
    "Ancient Egyptian Royal Funerary Goldcraft", "Height: 54 cm (21 in); Width: 39.3 cm; Depth: 49 cm; Weight: 10.23 kg (22.5 lbs)",
    "Two sheets of 24-karat solid beaten gold, lapis lazuli, turquoise, carnelian, obsidian, quartz, faience",
    "The Death Mask of Tutankhamun is the gold funerary mask of the 18th-Dynasty boy-pharaoh Tutankhamun. Discovered on October 28, 1925, by British archaeologist Howard Carter resting directly on the head and shoulders of the pharaoh's mummified body inside the third and innermost solid-gold coffin in tomb KV62 in the Valley of the Kings.",
    "Crafted from two layers of heavy beaten gold weighing over 10 kilograms. Depicts the serene, idealized face of the teenage pharaoh wearing the royal striped nemes headdress, with the protective vulture goddess Nekhbet and the cobra goddess Wadjet on his brow. The eyes are inlaid with translucent quartz with obsidian pupils, and the eye borders and kohl cosmetic lines are rendered in precious Afghan lapis lazuli. The back and shoulders are inscribed in hieroglyphs with Chapter 151b from the Book of the Dead, invoking Osiris to protect the limbs and soul of the king.",
    "The undisputed crowning masterpiece of ancient Egyptian goldsmithing and one of the supreme works of world art.",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    ["King Tut", "Tutankhamun", "Gold Mask", "Egypt", "Valley of Kings", "Howard Carter", "Lapis Lazuli"],
    ["Forged from 10.2 kilograms of solid 24-karat beaten gold inlaid with precious lapis lazuli", "Discovered in 1925 by Howard Carter directly covering the face of the young pharaoh's mummy", "The brow bears the royal vulture (Nekhbet) and cobra (Wadjet) symbols of Upper and Lower Egypt", "The back and shoulders are inscribed with a protective spell from the Egyptian Book of the Dead"],
    "Grand Masterpiece of Ancient Egypt"),

  # 3. Terracotta Army
  art_item("terracotta-army", "The Terracotta Army of Qin Shi Huang", "Bingmayong (兵马俑 - Soldier and Horse Funerary Statues)", "Artifact & Relic", "Lintong District, Xi'an, Shaanxi", "China", "Asia",
    "Qin Dynasty (c. 246–206 BCE)", "c. 246–210 BCE", -210, "Over 700,000 conscripted craftsmen and sculptors under Qin Shi Huang",
    "Imperial Chinese Terracotta Ceramic Sculpture & Metallurgical Armoury", "Over 8,000 soldiers, 130 chariots, 520 horses, and 150 cavalry horses; Pit 1 area: 14,260 m²",
    "Local loess terracotta clay, bronze weapons (swords, crossbows, spearheads), natural mineral lacquer paints",
    "The Terracotta Army is a collection of thousands of life-size terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of a unified China. Created to guard and accompany the emperor into the afterlife and protect his underground empire. Unearthed accidentally in March 1974 by local farmers digging a water well near Mount Li in Xi'an.",
    "The necropolis consists of four pits containing an estimated 8,000 soldiers, including infantry, archers, cavalry, and high-ranking generals. Incredibly, every single terracotta soldier possesses completely unique, individualized facial features, expressions, hairstyles, and ear shapes—no two are alike! Originally painted in vivid purples, greens, and vermilion lacquer. The soldiers were equipped with tens of thousands of real bronze swords and crossbow mechanisms treated with chromium salts that remained razor-sharp after 2,200 years underground.",
    "Inscribed as a UNESCO World Heritage Site in 1987. Hailed worldwide as the 'Eighth Wonder of the World'.",
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1200",
    ["Terracotta Army", "Xian", "China", "Qin Shi Huang", "Clay Soldiers", "First Emperor", "UNESCO"],
    ["Over 8,000 life-sized terracotta figures, with every single warrior possessing completely unique facial features", "Discovered accidentally by local farmers digging an irrigation well in March 1974", "Guards the colossal untouched subterranean burial mound of China's first unifier, Qin Shi Huang", "Warriors were armed with real bronze swords preserved so well they remained razor-sharp"],
    "Inscribed 1987 (Mausoleum of the First Qin Emperor)"),

  # 4. Antikythera Mechanism
  art_item("antikythera-mechanism", "The Antikythera Mechanism", "Ο μηχανισμός των Αντικυθήρων", "Artifact & Relic", "National Archaeological Museum, Athens", "Greece", "Europe",
    "Hellenistic Greece (c. 205–100 BCE)", "c. 150–100 BCE", -150, "Rhodesian / Corinthian astronomers (attributed to Archimedes or Hipparchus)",
    "Hellenistic Precision Bronze Geared Horology & Astromodelling", "Dimensions: 34 × 18 × 9 cm; Over 30 bronze precision gears; Dial scale: 365-day solar & Metonic cycle",
    "Cast bronze sheets, precision-cut gear teeth (1 to 2 mm pitch), wooden casing, Greek inscriptions",
    "The Antikythera Mechanism is an ancient Greek hand-powered mechanical astronomical computer. Discovered in 1901 by Greek sponge divers exploring a Roman shipwreck off the coast of the island of Antikythera. Described by historians of technology as the world's first analogue computer.",
    "Consists of a complex wooden casing housing at least 30 interlocking bronze gears with triangular teeth. When a user turned an exterior hand crank, the differential gears calculated and displayed the positions of the Sun, Moon, and five known planets in the zodiac, predicted solar and lunar eclipses according to the 223-month Saros cycle, simulated the irregular elliptical motion of the Moon (using epicyclic gearing!), and counted down the four-year cycles of the ancient Olympic Games. Nothing of comparable mechanical sophistication is known to have been built anywhere on Earth for the next 1,500 years until medieval astronomical clocks in Europe.",
    "The crowning technological masterpiece of classical Hellenistic antiquity, revolutionizing our understanding of ancient science.",
    "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&q=80&w=1200",
    ["Antikythera", "Greece", "Analog Computer", "Bronze Gears", "Astronomy", "Shipwreck", "Eclipse"],
    ["Universally recognized as the world's first mechanical analogue astronomical computer", "Constructed over 2,100 years ago using more than 30 intricate precision bronze gears", "Predicted solar and lunar eclipses, planetary orbits, and timed the ancient Olympic Games", "No mechanical device of equivalent complexity appeared again in history for over 1,500 years"],
    "Global Antiquity Wonder"),

  # 5. Dead Sea Scrolls
  art_item("dead-sea-scrolls", "The Dead Sea Scrolls", "Megilot Yam HaMelakh (מגילות ים המלח)", "Artifact & Relic", "Shrine of the Book, Israel Museum, Jerusalem", "Israel / West Bank", "Middle East",
    "Second Temple Judaism (c. 3rd Century BCE – 1st Century CE)", "c. 250 BCE – 68 CE", -150, "Jewish Essene community of Qumran / Second Temple scribes",
    "Ancient Judaean Scribal Calligraphy on Parchment and Papyrus", "981 manuscripts discovered across 11 desert caves; Great Isaiah Scroll length: 7.34 m (24 ft)",
    "Tanned animal skin parchment, carbon-based lampblack ink, vegetable papyrus sheets, bronze copper scroll",
    "The Dead Sea Scrolls are a collection of approximately 981 ancient Jewish manuscripts found between 1946 and 1956 in eleven caves near the archaeological site of Qumran on the northern shore of the Dead Sea. Discovered accidentally by young Bedouin goat herders who threw a rock into a cave and heard clay jars shattering.",
    "The scrolls date from the 3rd century BCE to the 1st century CE and include complete and fragmentary manuscripts of every book of the Hebrew Bible (except the Book of Esther), biblical apocrypha, and sectarian community rules. The Great Isaiah Scroll (1QIsa) contains all 66 chapters of the Book of Isaiah, written on 17 parchment sheets sewn together. The discovery pushed back the date of the oldest surviving Hebrew biblical manuscripts by over 1,000 years, revealing that biblical texts had been copied with astounding textual fidelity across millennia.",
    "Housed in the Shrine of the Book in Jerusalem beneath a white dome shaped like the lids of the clay jars in which they were discovered. Considered the greatest manuscript discovery of the 20th century.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Dead Sea Scrolls", "Qumran", "Jerusalem", "Isaiah", "Hebrew Bible", "Manuscripts", "Archaeology"],
    ["Discovered in 1946 by Bedouin goat herders in desert caves near the salty Dead Sea", "Pushed back the date of the oldest surviving Hebrew biblical manuscripts by over a millennium", "Includes the complete 7.34-meter Great Isaiah Scroll containing all 66 chapters", "Preserved for 2,000 years inside sealed ceramic jars in the hyper-arid Judean desert air"],
    "Greatest Manuscript Discovery of the 20th Century"),

  # 6. Cyrus Cylinder
  art_item("cyrus-cylinder", "The Cyrus Cylinder", "Ostovane-ye Kurosh (استوانه کوروش)", "Artifact & Relic", "British Museum, London (Found in Babylon)", "Iran / Iraq / UK", "Middle East",
    "Achaemenid Persian Empire (539 BCE)", "539 BCE", -539, "Achaemenid royal scribes under Cyrus the Great",
    "Mesopotamian Cuneiform Barrel Cylinder Inscription", "Length: 22.5 cm (8.8 in); Diameter: 10 cm; 45 lines of Akkadian cuneiform text",
    "Kiln-baked clay, finely incised Akkadian Babylonian cuneiform script",
    "The Cyrus Cylinder is an ancient clay barrel-shaped cylinder inscribed in Babylonian cuneiform, issued in the name of Persian King Cyrus the Great in 539 BCE. Unearthed in March 1879 by Assyro-British archaeologist Hormuzd Rassam during excavations of the ancient ruins of Babylon (modern Iraq). Currently preserved in the British Museum.",
    "Inscribed following Cyrus's peaceful capture of Babylon from King Nabonidus. In the text, Cyrus declares himself king of the world, denounces Nabonidus's tyranny, and proclaims that all deported peoples enslaved in Babylon are free to return to their ancestral homelands and rebuild their temples—confirming the biblical account in the Book of Ezra of the liberation of the Jewish people from the Babylonian Captivity. In 1971, the United Nations translated the text into all six official languages, celebrating it as the 'first declaration of human rights' and freedom of religion in world history.",
    "A replica is displayed prominently at the United Nations Headquarters in New York City as an enduring beacon of governance through tolerance.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Cyrus Cylinder", "Persia", "Cyrus the Great", "Human Rights", "Babylon", "Cuneiform", "Achaemenid"],
    ["Issued in 539 BCE by Cyrus the Great following his peaceful conquest of Babylon", "Liberated deported peoples and allowed Jews to return from Babylonian exile to Jerusalem", "Revered worldwide and by the United Nations as the first declaration of universal human rights", "Inscribed in 45 lines of delicate Akkadian cuneiform into a kiln-baked clay cylinder"],
    "Foundational Universal Human Rights Charter"),

  # 7. Code of Hammurabi
  art_item("code-of-hammurabi", "The Code of Hammurabi Stele", "Codex Hammurabi", "Artifact & Relic", "Musée du Louvre, Paris (Found in Susa, Elam)", "Iraq / France", "Middle East",
    "Old Babylonian Empire (c. 1754 BCE)", "c. 1754 BCE", -1754, "King Hammurabi of Babylon",
    "Mesopotamian Legal Bas-Relief Monolithic Stele", "Height: 2.25 m (7.4 ft); Base circumference: 1.9 m; 282 legal statutes engraved across 4,130 lines",
    "Single monolithic block of polished black diorite/basalt stone, Akkadian cuneiform script",
    "The Code of Hammurabi is an ancient Babylonian legal text enacted by the sixth king of Babylon, Hammurabi, around 1754 BCE. Carved onto a colossal black diorite stele over two meters high. Discovered in December 1901 by French archaeologist Gustave Jéquier at Susa (modern Iran), where it had been carried away as a war trophy by the Elamites in the 12th century BCE. Currently displayed in the Louvre Museum in Paris.",
    "The top of the stele features a carved bas-relief of King Hammurabi receiving the sceptre and ring of divine justice directly from Shamash, the Babylonian god of the sun and justice. Below are 282 legal laws written in Akkadian cuneiform, covering commercial trade, property rights, marriage, divorce, medical malpractice, and criminal law. It is famous for establishing the legal principle of 'lex talionis' (retaliation in kind), famously phrased as 'an eye for an eye, a tooth for a tooth' (#196). It pioneered crucial modern legal doctrines, including the presumption of innocence until proven guilty and written contracts.",
    "One of the earliest, most complete, and best-organized legal codes surviving from antiquity, profoundly shaping Mediterranean jurisprudence.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Hammurabi", "Babylon", "Louvre", "Code of Law", "Cuneiform", "Eye for an Eye", "Diorite"],
    ["One of the oldest deciphered legal codes in human history, consisting of 282 legal statutes", "Carved into a single 2.25-meter-tall monolithic pillar of polished black diorite stone", "Originated the famous legal doctrine of 'lex talionis' ('an eye for an eye, a tooth for a tooth')", "Pioneered foundational modern legal concepts including the presumption of innocence"],
    "Monument of Classical World Law"),

  # 8. Bust of Nefertiti
  art_item("bust-of-nefertiti", "Bust of Nefertiti", "Neferneferuaten Nefertiti ('The Beautiful One Has Come')", "Artifact & Relic", "Neues Museum, Berlin", "Egypt / Germany", "Africa",
    "New Kingdom 18th Dynasty Amarna Period (c. 1345 BCE)", "c. 1345 BCE", -1345, "Thutmose (Court Master Sculptor of Amarna)",
    "Ancient Egyptian Amarna Style Painted Portrait Sculpture", "Height: 48 cm (19 in); Weight: 20 kg (44 lbs); Perfectly symmetrical facial proportions",
    "Limestone core covered in stucco layers, quartz crystal pupil inlay, wax, mineral pigments (Egyptian blue, red ochre)",
    "The Bust of Nefertiti is a painted stucco-coated limestone bust of Nefertiti, the Great Royal Wife of Pharaoh Akhenaten of Egypt. Crafted around 1345 BCE by the royal court sculptor Thutmose in his workshop in the newly founded capital city of Akhetaten (modern Amarna). Discovered on December 6, 1912, by a German archaeological team led by Ludwig Borchardt.",
    "Celebrated for its timeless elegance, radiant cheekbones, and astonishing symmetry. The bust depicts the queen wearing her signature tall flat-topped blue crown (the 'Nefertiti cap crown') wrapped with a golden ribbon and an ornate floral broad collar. The right eye is inlaid with rock crystal and obsidian; the left eye socket is curiously devoid of an inlay, leading historians to deduce that the bust was an official master sculptor's teaching model (sculptor's bozzetto) kept in Thutmose's workshop to guide apprentices. Since its public unveiling in Berlin in 1924, it has become an international icon of feminine beauty.",
    "Displayed in its own domed hall in the Neues Museum on Berlin's Museum Island. Egypt continues to request its return to Cairo.",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    ["Nefertiti", "Bust", "Amarna", "Egypt", "Berlin", "Thutmose", "Akhenaten", "Beauty"],
    ["Crafted around 1345 BCE in the workshop of master sculptor Thutmose in the sun-city of Amarna", "Discovered in 1912 by German archaeologist Ludwig Borchardt preserved under desert sand", "The right eye is inlaid with quartz crystal, while the left eye was left empty as a teaching model", "Universally celebrated as one of the most famous and captivating portrait sculptures in world art"],
    "Universal Icon of Classical Antiquity"),

  # 9. Venus de Milo
  art_item("venus-de-milo", "Venus de Milo (Aphrodite of Melos)", "Αφροδίτη της Μήλου", "Artifact & Relic", "Musée du Louvre, Paris (Found on Milos)", "Greece / France", "Europe",
    "Hellenistic Greece (c. 150–125 BCE)", "c. 150–125 BCE", -130, "Alexandros of Antioch",
    "Hellenistic Classical Greek Marble Sculpture", "Height: 204 cm (6 ft 8 in) including plinth; Weight: 900 kg; 2 joined blocks of marble",
    "Parian white marble from the island of Paros, carved in two separate sections joined by vertical iron pins",
    "The Venus de Milo is an ancient Greek marble statue widely believed to depict Aphrodite, the goddess of love and beauty (known as Venus to the Romans). Sculpted between 150 and 125 BCE. Discovered on April 8, 1820, by a peasant farmer named Yorgos Kentrotas inside a buried niche within the ancient city ruins on the Aegean island of Milos. Purchased by French naval officers on behalf of the Marquis de Rivière, who presented it to King Louis XVIII of France, who donated it to the Louvre.",
    "A masterpiece of Hellenistic sculpture, combining Classical 5th-century BCE harmony (the serene facial expression) with Hellenistic innovation (the dramatic serpentine S-curve twist of the hips and sensuous cascading drapery). Carved from two separate blocks of fine Parian marble joined invisibly at the waistline. Famous worldwide for its missing arms, which were broken and lost in a violent scuffle between French sailors and Ottoman Greek islanders on the beach of Milos during shipping. Placed in a position of supreme honor in the Louvre, it has inspired generations of poets, painters, and sculptors.",
    "One of the three great ladies of the Louvre alongside the Mona Lisa and the Winged Victory of Samothrace.",
    "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80&w=1200",
    ["Venus de Milo", "Louvre", "Aphrodite", "Milos", "Greece", "Parian Marble", "Classical"],
    ["Sculpted from luminous Parian marble around 130 BCE on the Aegean island of Milos", "Discovered in 1820 by a Greek farmer and gifted to King Louis XVIII of France", "World-renowned for its missing arms, lost in a seaside scuffle during shipping in 1820", "Exemplifies the graceful Hellenistic 'contrapposto' S-curve posture and sensuous drapery"],
    "Grand Jewel of Classical Greek Sculpture"),

  # 10. Winged Victory of Samothrace
  art_item("winged-victory", "Winged Victory of Samothrace (Nike)", "Νίκη της Σαμοθράκης", "Artifact & Relic", "Musée du Louvre, Paris (Found on Samothrace)", "Greece / France", "Europe",
    "Hellenistic Golden Age (c. 190 BCE)", "c. 190 BCE", -190, "Pythokritos of Rhodes (attributed)",
    "Hellenistic Theatrical Dynamic Monumental Marble Sculpture", "Total height: 5.57 m (18.3 ft); Statue height: 2.75 m; Prow base height: 2.01 m; Weight: 29 tonnes",
    "Statue: White Parian marble; Ship prow base: Grey-veined Lartos marble from Rhodes",
    "The Winged Victory of Samothrace, also known as the Nike of Samothrace, is a colossal Hellenistic marble sculpture of Nike, the Greek goddess of victory. Created around 190 BCE to commemorate a major naval triumph (likely the victory of the Rhodian fleet at the Battle of Side or Myonessos). Discovered in April 1863 by French vice-consul Charles Champoiseau on the northern Aegean island of Samothrace in the Sanctuary of the Great Gods.",
    "Celebrated as the highest achievement of Hellenistic sculpture for its dramatic movement and theatrical realism. Depicts the winged goddess descending from the sky to alight upon the stone prow of an ancient warship battling gale-force sea winds: her wings remain outstretched in flight while the sea breeze presses her wet chiton garment against her torso and thighs in deep, rippling folds of marble. Displayed at the top of the monumental Daru Staircase in the Louvre, it welcomes millions of awe-struck visitors with sweeping visual majesty.",
    "Considered one of the greatest sculptural achievements of Western civilization.",
    "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80&w=1200",
    ["Winged Victory", "Nike", "Samothrace", "Louvre", "Hellenistic", "Daru Staircase", "Masterpiece"],
    ["Stands atop the monumental Daru Staircase in the Louvre, commanding one of art's greatest vistas", "Depicts the winged goddess Nike alighting upon a warship's stone prow facing ocean gales", "The rippling, wind-whipped drapery of her garment looks fluid despite being carved in solid marble", "Erected around 190 BCE to celebrate a major Greek naval victory in the Aegean Sea"],
    "Pinnacle of Hellenistic Sculptural Art")
]

print(f"Loaded {len(artifacts)} initial artifacts. Adding remaining 45 artifacts...")
