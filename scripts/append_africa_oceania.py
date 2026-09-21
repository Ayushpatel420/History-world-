#!/usr/bin/env python3
"""
Adds Africa (20) & Oceania (10) to complete all 55 monuments,
then writes to src/data/monuments/americasAfricaOceaniaMonuments.ts
"""
import json
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_americas_africa_oceania_55 import monuments, item

africa_and_oceania = [
  # --- AFRICA (20) ---
  # 26. Great Pyramid of Giza
  item("great-pyramid-giza", "Great Pyramid of Giza (Khufu)", "Khufu's Horizon (Akhet Khufu) / El Giza", "Ancient Wonder", "Giza Plateau, Greater Cairo", "Egypt", "Africa",
    "Fourth Dynasty Old Kingdom of Egypt (c. 2580–2560 BCE)", "c. 2580–2560 BCE", -2580, "Hemiunu (Vizier and Master of Works)",
    "Ancient Egyptian True Pyramidal Monumental Architecture", "Original height: 146.6 m (481 ft); Current height: 138.5 m; Base: 230.3 m each side; Weight: 6 million tonnes",
    "2.3 million limestone blocks (average 2.5 tonnes each), Tura white casing limestone, Aswan pink granite roof beams (up to 80 tonnes)",
    "The Great Pyramid of Giza is the oldest and only surviving monument of the original Seven Wonders of the Ancient World. Built over a 20-year period around 2560 BCE as the monumental royal tomb for Pharaoh Khufu (known in Greek as Cheops), second ruler of the Fourth Dynasty of Egypt. Stood as the tallest human-made structure in the world for more than 3,800 years until the spire of Lincoln Cathedral in England was completed in 1311 CE.",
    "Constructed from roughly 2.3 million quarried stone blocks weighing a total of six million tonnes. The King's Chamber ceiling is formed of colossal 50-tonne pink granite beams transported 800 kilometers down the Nile from quarries in Aswan. The base of the pyramid is level to within 15 millimeters (0.6 inches), and its four sides are aligned with cardinal true north with an accuracy of within 3.4 arcminutes (less than 1/15th of a degree)—a feat of archaeoastronomical surveying that astounds modern engineers. Originally covered in polished white Tura limestone casing stones that reflected the desert sunlight like a jewel.",
    "Inscribed as a UNESCO World Heritage Site in 1979 as part of 'Memphis and its Necropolis - the Pyramid Fields from Giza to Dahshur'. The pinnacle of ancient human architectural achievement.",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    ["Great Pyramid", "Giza", "Egypt", "Khufu", "Seven Wonders", "Pharaoh", "UNESCO"],
    ["The oldest and only substantially surviving wonder of the original Seven Wonders of the Ancient World", "Remained the tallest human-made structure on Earth for over 3,800 years (until 1311 CE)", "Aligned to true cardinal north with astonishing precision to within 1/15th of a single degree", "Constructed from 2.3 million stone blocks weighing an average of 2.5 tonnes each"],
    "Inscribed 1979 (Memphis and its Necropolis)"),

  # 27. Great Sphinx of Giza
  item("great-sphinx-giza", "Great Sphinx of Giza", "Hor-em-akhet (Horus in the Horizon) / Abu al-Hol (Father of Dread)", "Ancient Wonder", "Giza Plateau, Greater Cairo", "Egypt", "Africa",
    "Old Kingdom Fourth Dynasty (c. 2558–2532 BCE)", "c. 2550 BCE", -2550, "Pharaoh Khafre (or Khufu)",
    "Monolithic Limestone Colossal Sculpture", "Length: 73 m (240 ft); Width: 19 m (62 ft); Height: 20 m (66 ft)",
    "Natural limestone bedrock outcrop of the Mokkatam Formation, carved in situ",
    "The Great Sphinx of Giza is a limestone statue of a reclining mythical sphinx—a creature with the body of a lion and the head of an Egyptian human king wearing the royal nemes headdress and uraeus cobra. Located on the Giza Plateau directly on the west bank of the Nile. Widely believed by Egyptologists to have been carved during the reign of Pharaoh Khafre (builder of the second pyramid of Giza). It is the oldest known monumental sculpture in Egypt and one of the most recognizable statues in the world.",
    "Unlike the pyramids, which were assembled from quarried blocks, the entire Sphinx was carved directly out of a single monolithic outcrop of natural limestone bedrock left behind when quarrying surrounding stone for the pyramids. Between its front paws stands the 'Dream Stele' erected by Pharaoh Thutmose IV around 1401 BCE, recounting how the prince fell asleep in the shadow of the buried Sphinx, and the god promised him the crown of Egypt if he cleared the encroaching desert sand from its body. The missing nose was chiseled off in the 14th century CE by a Sufi zealot named Muhammad Sa'im al-Dahr, debunking the popular urban myth that Napoleon's soldiers shot it off with cannonballs.",
    "Inscribed as a UNESCO World Heritage Site in 1979 as part of Memphis and its Necropolis.",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    ["Great Sphinx", "Giza", "Egypt", "Khafre", "Monolith", "Pharaoh", "UNESCO"],
    ["The oldest known monumental sculpture in Egypt, carved directly from a single limestone outcrop", "Features the body of a lion and the head of Pharaoh Khafre wearing the royal nemes cloth", "Stands 73 meters (240 feet) long and 20 meters (66 feet) high guarding the Giza plateau", "Houses the 'Dream Stele' of Thutmose IV between its front paws recounting an ancient royal prophecy"],
    "Inscribed 1979 (Memphis and its Necropolis)"),

  # 28. Karnak Temple Complex, Luxor
  item("karnak-temple", "Karnak Temple Complex", "Ipet-sut (The Most Select of Places) / El-Karnak", "Sacred Temple / Cathedral", "East Bank of Nile, Luxor (Ancient Thebes)", "Egypt", "Africa",
    "Middle Kingdom to Ptolemaic Era (c. 2000–30 BCE)", "c. 1971–30 BCE", -1971, "Over 30 successive Pharaohs (Hatshepsut, Thutmose III, Seti I, Ramesses II)",
    "Ancient Egyptian Monumental Hypostyle Sanctuary Architecture", "Site area: 100 hectares (247 acres); Great Hypostyle Hall: 134 massive columns across 5,000 m²",
    "Nubian sandstone ashlar blocks, red granite obelisks, gold electrum caps, painted hieroglyphic reliefs",
    "The Karnak Temple Complex is a vast open-air religious complex on the east bank of the Nile in Luxor (ancient Thebes). Dedicated primarily to the Theban Triad: Amun-Ra (King of the Gods), his consort Mut, and their son Khonsu. Developed over a span of more than 1,500 years by approximately thirty successive pharaohs, with each ruler striving to outdo their predecessors by adding courtyards, pylons, and colossal statues, making it the largest religious sanctuary ever built in the ancient world.",
    "The centerpiece is the Great Hypostyle Hall, constructed by Pharaohs Seti I and Ramesses II, covering 5,000 square meters with 134 colossal sandstone columns arranged in 16 rows; the central 12 columns soar 21 meters (69 ft) high with papyrus flower capitals so wide that 50 people can stand atop a single capital. The complex encloses the tallest surviving ancient obelisk in Egypt, erected by Queen Hatshepsut from a single 30-meter block of pink granite weighing 320 tonnes, once tipped with gleaming electrum to catch the morning sun.",
    "Inscribed as a UNESCO World Heritage Site in 1979 as part of Ancient Thebes with its Necropolis.",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    ["Karnak", "Luxor", "Thebes", "Egypt", "Amun", "Hypostyle Hall", "Hatshepsut", "UNESCO"],
    ["The largest ancient religious temple complex ever constructed, developed over 1,500 years", "The Great Hypostyle Hall contains 134 massive columns soaring up to 21 meters high", "Houses Queen Hatshepsut's 30-meter pink granite obelisk weighing an astonishing 320 tonnes", "Connected to Luxor Temple via the 2.7-kilometer ceremonial Avenue of Sphinxes"],
    "Inscribed 1979 (Ancient Thebes with its Necropolis)"),

  # 29. Luxor Temple
  item("luxor-temple", "Luxor Temple", "Ipet Resyt (The Southern Sanctuary) / Luxor", "Sacred Temple / Cathedral", "East Bank of Nile River, Luxor", "Egypt", "Africa",
    "New Kingdom 18th to 19th Dynasties (c. 1400–1213 BCE)", "c. 1400–1213 BCE", -1400, "Amenhotep III, Ramesses II, Tutankhamun",
    "New Kingdom Ancient Egyptian Monumental Pylon & Colonnade Architecture", "Length: 260 m; Width: 50 m; Pylon height: 24 m (79 ft); Colonnade column height: 16 m",
    "Gebel el-Silsila sandstone, Aswan pink granite colossal statues, gold leaf",
    "Luxor Temple is an ancient Egyptian temple complex located on the east bank of the Nile River in the city of Luxor. Founded around 1400 BCE during the New Kingdom by Pharaoh Amenhotep III and completed by Ramesses II and Tutankhamun. Unlike other temples in Thebes dedicated to a specific deity, Luxor Temple was dedicated to the rejuvenation of kingship: it was the setting for the annual Opet Festival, in which the cult statues of Amun, Mut, and Khonsu were transported by sacred river barge from Karnak down the Nile to Luxor to spiritually renew the pharaoh's divine mandate.",
    "Guarded by an entrance pylon featuring two seated and four standing colossal statues of Ramesses II carved from pink granite. Originally flanked by two matching 25-meter red granite obelisks; in 1833, Muhammad Ali Pasha gifted one obelisk to King Louis-Philippe of France, which today stands in the center of the Place de la Concorde in Paris. In November 2021, Egypt officially reopened the magnificent 2.7-kilometer Avenue of Sphinxes connecting Luxor Temple directly to Karnak, lined by 1,057 human-headed and ram-headed sphinx statues.",
    "Inscribed as a UNESCO World Heritage Site in 1979 as part of Ancient Thebes with its Necropolis.",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    ["Luxor Temple", "Luxor", "Thebes", "Egypt", "Ramesses II", "Opet Festival", "UNESCO"],
    ["The sacred venue of the annual Opet Festival, where Egyptian pharaohs spiritually renewed their rule", "Guarded by colossal granite statues of Ramesses II standing before a 24-meter-tall entrance pylon", "One of its twin pink granite obelisks was gifted to France in 1833 and now stands in Paris", "Connected to Karnak by the 2.7-kilometer Avenue of Sphinxes lined with over 1,000 carved sphinxes"],
    "Inscribed 1979 (Ancient Thebes with its Necropolis)"),

  # 30. Valley of the Kings
  item("valley-of-the-kings", "Valley of the Kings", "Wadi al-Muluk (The Great and Majestic Necropolis of Pharaohs)", "Archaeological City", "West Bank of the Nile, Luxor", "Egypt", "Africa",
    "New Kingdom 18th to 20th Dynasties (c. 1539–1075 BCE)", "c. 1539–1075 BCE", -1539, "Ineni (Royal Architect) and royal tomb builders of Deir el-Medina",
    "Subterranean Rock-Cut Hypogeum Royal Necropolis", "Length: 500 m canyon; 65 numbered royal tombs (KV1 to KV65); Deepest tomb (Seti I - KV17): 174 m into rock",
    "Theban limestone bedrock subterranean tunnels, plaster, brilliant mineral pigments (Egyptian blue, orpiment gold, cinnabar red)",
    "The Valley of the Kings is a desert valley on the west bank of the Nile opposite Luxor, where rock-cut tombs were excavated for pharaohs and powerful nobles of the New Kingdom for nearly 500 years. Pharaohs abandoned visible pyramids in favor of hidden subterranean cliff tombs to protect their golden treasures and mummies from tomb robbers. Overlooked by the natural pyramid-shaped mountain peak of al-Qurn ('The Horn').",
    "The valley contains 65 discovered tombs, with walls covered in vivid polychrome religious texts including the Book of the Dead, the Amduat, and the Litany of Ra, guiding the pharaoh through the underworld to eternal life. On November 4, 1922, British archaeologist Howard Carter discovered KV62—the intact tomb of the boy-king Tutankhamun—filled with over 5,000 dazzling royal treasures, including his solid gold funerary mask, three golden coffins, and golden throne. The magnificent tomb of Seti I (KV17) extends 174 meters deep into the cliff with painted astronomical ceilings.",
    "Inscribed as a UNESCO World Heritage Site in 1979. The world's most famous archaeological necropolis.",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    ["Valley of Kings", "Luxor", "Egypt", "Tutankhamun", "Howard Carter", "Pharaohs", "Tombs", "UNESCO"],
    ["Royal burial site for Egypt's New Kingdom pharaohs for nearly 500 years beneath a pyramid-shaped mountain", "Howard Carter discovered the intact tomb of Tutankhamun (KV62) here in November 1922", "Contains 65 rock-hewn tombs filled with vibrant frescoes illustrating the Egyptian Book of the Dead", "The tomb of Seti I extends 174 meters deep into solid limestone with pristine astrological ceilings"],
    "Inscribed 1979 (Ancient Thebes with its Necropolis)"),

  # 31. Abu Simbel Temples
  item("abu-simbel", "Abu Simbel Temples", "The Great and Small Temples of Ramesses II and Nefertari", "Sacred Temple / Cathedral", "Aswan Governorate, Lake Nasser", "Egypt", "Africa",
    "New Kingdom 19th Dynasty (c. 1264–1244 BCE)", "c. 1264–1244 BCE", -1264, "Pharaoh Ramesses II ('Ramesses the Great')",
    "Ancient Egyptian Rock-Cut Speos Monumental Architecture", "Great Temple facade: Height 30 m, Width 35 m; 4 colossal seated statues: 20 m (66 ft) each",
    "Solid Nubian sandstone cliff mountain, carved in situ, relocated in 1,036 blocks",
    "Abu Simbel is a historic complex of two colossal rock-cut temples carved out of a sandstone cliff in southern Egypt near the Sudan border. Commissioned by Pharaoh Ramesses II in the 13th century BCE to commemorate his victory at the Battle of Kadesh and to impress Egypt's southern Nubian neighbors. The Great Temple is flanked by four colossal 20-meter seated statues of Ramesses II wearing the double crown of Upper and Lower Egypt.",
    "The temple was engineered with astronomical precision: twice a year—on October 22 and February 22 (believed to mark Ramesses' birthday and coronation date)—the rays of the rising morning sun penetrate 65 meters deep into the cliff to illuminate the statues of Ra-Horakhty, the deified Ramesses, and Amun-Ra, while Ptah (god of the underworld) remains perpetually in shadow. In the 1960s, the rising waters of Lake Nasser from the Aswan High Dam threatened to submerge the temples; in a historic international UNESCO salvage operation, the temples were cut into 1,036 numbered stone blocks weighing up to 30 tonnes each and reassembled 65 meters higher on an artificial hill.",
    "Inscribed as a UNESCO World Heritage Site in 1979 as the Nubian Monuments from Abu Simbel to Philae.",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    ["Abu Simbel", "Aswan", "Egypt", "Ramesses II", "Nefertari", "Nubia", "Lake Nasser", "UNESCO"],
    ["Carved directly into a sandstone mountain with four colossal 20-meter seated statues of Ramesses II", "Engineered so the rising sun illuminates the inner sanctuary statues on two specific days each year", "Saved from drowning beneath Lake Nasser in the 1960s by a UNESCO operation cutting it into 1,036 blocks", "The adjacent Small Temple honors Ramesses' beloved chief queen, Nefertari, depicted as equal in height"],
    "Inscribed 1979 (Nubian Monuments from Abu Simbel to Philae)"),

  # 32. Step Pyramid of Djoser, Saqqara
  item("pyramid-of-djoser", "Step Pyramid of Djoser", "Netjerikhet / Saqqara Step Pyramid", "Ancient Wonder", "Saqqara Necropolis, Giza Governorate", "Egypt", "Africa",
    "Third Dynasty Old Kingdom of Egypt (c. 2670–2650 BCE)", "c. 2670–2650 BCE", -2670, "Imhotep (Chancellorship Vizier & First Recorded Architect in History)",
    "Ancient Egyptian Stepped Pyramid & Limestone Ashlar Architecture", "Height: 62.5 m (205 ft); Base dimensions: 121 × 109 m; 6 stepped mastaba tiers; Enclosure wall: 10.5 m high",
    "Hewn limestone blocks, pink granite burial vault, faience turquoise wall tiles",
    "The Step Pyramid of Djoser is an ancient Egyptian archaeological monument in the Saqqara necropolis, northwest of Memphis. Built during the 27th century BCE for the burial of Pharaoh Djoser by his brilliant vizier and high priest Imhotep. Imhotep was later deified in Egyptian and Greek religion (identified with Asclepius) as the patron god of medicine and architecture.",
    "It is recognized as the world's oldest colossal stone building and the earliest large-scale cut-stone masonry monument on Earth. Imhotep revolutionized architecture by stacking six progressively smaller rectangular mastabas on top of one another to create a six-tiered step pyramid soaring 62.5 meters high, symbolizing a colossal stairway to the stars for the pharaoh's soul. Beneath the pyramid lies a labyrinth of subterranean galleries extending nearly six kilometers, connecting burial vaults, storage rooms, and royal chambers lined with 40,000 turquoise faience wall tiles.",
    "Inscribed as a UNESCO World Heritage Site in 1979 as part of Memphis and its Necropolis.",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    ["Step Pyramid", "Djoser", "Saqqara", "Egypt", "Imhotep", "Oldest Stone Building", "UNESCO"],
    ["Recognized as the world's oldest monumental cut-stone building, constructed around 2670 BCE", "Designed by Imhotep, the first named architect, physician, and polymath recorded in human history", "Created by stacking six progressively smaller stone mastabas to form a 62.5-meter stairway to heaven", "Encloses an underground labyrinth of tunnels stretching six kilometers lined with turquoise tiles"],
    "Inscribed 1979 (Memphis and its Necropolis)"),

  # 33. Temple of Philae, Egypt
  item("temple-of-philae", "Temple of Philae (Temple of Isis)", "Pilak (The End / Island) / Anas el-Wagoud", "Sacred Temple / Cathedral", "Agilkia Island, Aswan Governorate", "Egypt", "Africa",
    "Ptolemaic and Roman Period (c. 380 BCE – 100 CE)", "c. 380 BCE – 100 CE", -380, "Nectanebo I, Ptolemy II Philadelphus, Emperor Trajan",
    "Ptolemaic and Greco-Roman Egyptian Temple Architecture", "Main Pylon height: 18 m; Width: 45 m; Trajan's Kiosk: 14 columns with floral composite capitals",
    "Nubian sandstone ashlar, carved hieroglyphs, demotic inscriptions, Coptic cross incisions",
    "The Temple of Philae is an island-based temple complex in the reservoir of the Aswan Low Dam in Upper Egypt. Revered as the sacred center of worship for the mother goddess Isis, who in Egyptian myth found the heart of her slain husband Osiris on Philae island and breathed life back into him. It was the very last operational pagan temple in the ancient world, where Egyptian hieroglyphs were carved for the final time on August 24, 394 CE (the Graffito of Esmet-Akhom) before closed by Roman Christian Emperor Justinian in 537 CE.",
    "The complex features the romantic Kiosk of Trajan (affectionately known as 'Pharaoh's Bed'), an open-air hypaethral pavilion of 14 columns with blossoming floral capitals overlooking the Nile. When the British-built Aswan Low Dam flooded Philae island for most of the year in the early 20th century, UNESCO and the Egyptian Antiquities Organization executed a monumental rescue between 1972 and 1980: they built a coffer dam, pumped out the water, dismantled the entire stone temple into 40,000 blocks, and reassembled it on higher ground on nearby Agilkia Island, landscaped to match Philae's original shape.",
    "Inscribed as a UNESCO World Heritage Site in 1979 as part of the Nubian Monuments.",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    ["Philae", "Aswan", "Egypt", "Isis", "Trajan Kiosk", "Relocated Island", "UNESCO"],
    ["The last surviving operational ancient Egyptian temple, where hieroglyphs were written for the final time in 394 CE", "Dedicated to Isis, the mother goddess who resurrected her husband Osiris in Egyptian mythology", "Dismantled block-by-block and relocated to Agilkia Island by UNESCO to save it from drowning", "Features Trajan's Kiosk ('Pharaoh's Bed'), one of the most romantic Greco-Roman pavilions on the Nile"],
    "Inscribed 1979 (Nubian Monuments)"),

  # 34. Great Mosque of Djenné, Mali
  item("great-mosque-djenne", "Great Mosque of Djenné", "Grande Mosquée de Djenné", "Sacred Temple / Cathedral", "Djenné, Mopti Region", "Mali", "Africa",
    "Sudano-Sahelian Adobe Golden Age (Originally 13th Century; rebuilt 1907 CE)", "1907 CE (original 13th c.)", 1907, "Ismaïla Traoré (Chief of the Djenné Mason Guild)",
    "Monumental Sudano-Sahelian Mud-Brick (Banco) Architecture", "Length: 75 m; Width: 75 m; Tower height: 16 m; Floor raised 3 m on stone platform to avoid Niger floods",
    "Sun-baked mud bricks (ferey), alluvial earth mud plaster (banco), palm wood toron beams, ostrich eggs",
    "The Great Mosque of Djenné is a monumental adobe building in the town of Djenné, Mali, located on the floodplain of the Bani River (a tributary of the Niger). The first mosque on the site was built around the 13th century when King Koi Kunboro converted to Islam. The current monumental structure was rebuilt in 1907 by the master mason guild of Djenné under chief mason Ismaïla Traoré. It is the largest mud-brick (earth) building in the world.",
    "A crowning masterpiece of Sudano-Sahelian architecture: constructed entirely from sun-baked mud bricks coated with fine banco plaster. Its exterior walls are studded with bundles of rodier palm tree wood beams called 'toron' that jut out from the facade, serving as permanent structural scaffolding for the annual replastering festival. The three minaret towers are crowned with real ostrich eggs, traditional Sahelian symbols of fertility, purity, and spiritual fortune. Every year, the entire city gathers for the 'Crépissage de la Grand Mosquée'—a joyous festival where thousands of residents mix fresh river mud and climb the walls to replaster the mosque in a single day.",
    "Inscribed as a UNESCO World Heritage Site in 1988 as part of the Old Towns of Djenné.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Djenne Mosque", "Mali", "Sahel", "Mud Brick", "Adobe", "Toron Beams", "UNESCO"],
    ["The largest mud-brick and earthen building in the world, built in pure Sudano-Sahelian style", "Wall timbers (toron) act as permanent scaffolding for the annual community replastering festival", "The three soaring minaret towers are crowned with real ostrich eggs symbolizing fertility and purity", "The entire population of Djenné replasters the exterior in a single joyous festival every year"],
    "Inscribed 1988 (Old Towns of Djenné)"),

  # 35. Rock-Hewn Churches of Lalibela, Ethiopia
  item("lalibela-churches", "Rock-Hewn Churches of Lalibela (Bete Giyorgis)", "Bete Giyorgis (Church of Saint George) / Roha", "Sacred Temple / Cathedral", "Lalibela, Amhara Region", "Ethiopia", "Africa",
    "Zagwe Dynasty Medieval Christian Kingdom (Late 12th – Early 13th Century CE)", "c. 1181–1221 CE", 1200, "King Gebre Mesqel Lalibela & Ethiopian stone masons",
    "Monolithic Rock-Cut Troglodyte Hypogeum Architecture", "Bete Giyorgis dimensions: 12 × 12 × 12 m (cube); Trench depth: 15 m; 11 monolithic and semi-monolithic churches",
    "Solid red volcanic basalt and vesicular volcanic tuff bedrock, carved top-down using chisels and hammers",
    "The Rock-Hewn Churches of Lalibela are a complex of eleven monolithic rock-cut churches in the mountainous highlands of northern Ethiopia. Commissioned in the late 12th century by King Gebre Mesqel Lalibela of the Zagwe dynasty, who sought to recreate a 'New Jerusalem' in Ethiopia after Muslim forces under Saladin captured Jerusalem in 1187, preventing Ethiopian Christian pilgrims from traveling to the Holy Land. The town was laid out with a local river named the River Jordan and hills called Mount of Olives and Mount Calvary.",
    "Unlike European cathedrals built upward with quarried stone, Lalibela's churches were carved downward out of solid living volcanic rock using only chisels and pickaxes. Stonemasons first dug deep vertical perimeter trenches around a mountain block, then carved inward from the roof down through the solid core to create doors, windows, Greek columns, drainage canals, and barrel-vaulted internal ceilings. The most famous and pristine church is Bete Giyorgis (Church of Saint George), carved in the shape of a perfect three-tiered Greek cross sitting at the bottom of a 15-meter trench. Local Ethiopian tradition holds that human stonemasons worked by day, and angels descended from heaven to continue carving twice as fast through the night.",
    "Inscribed as one of the inaugural UNESCO World Heritage Sites in 1978. A living pilgrimage center for Ethiopian Orthodox Christians.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Lalibela", "Ethiopia", "Rock-Hewn", "Bete Giyorgis", "New Jerusalem", "Monolithic", "UNESCO"],
    ["Carved straight down into solid volcanic bedrock using only hammers and chisels in the 12th century", "Bete Giyorgis is carved in the shape of a perfect Greek cross at the bottom of a 15-meter trench", "Built by King Lalibela to establish a 'New Jerusalem' after Jerusalem was conquered by Saladin", "One of the original 12 sites inscribed on UNESCO's inaugural World Heritage List in 1978"],
    "Inscribed 1978 (Rock-Hewn Churches, Lalibela)"),

  # 36. Great Zimbabwe Ruins
  item("great-zimbabwe", "Great Zimbabwe Ruins", "Dzimba-dza-mabwe (Houses of Stone)", "Archaeological City", "Masvingo Province", "Zimbabwe", "Africa",
    "Kingdom of Zimbabwe Medieval Shona Civilization (11th–15th Century CE)", "c. 1100–1450 CE", 1250, "Bantu Shona (Karanga) stone masons and kings",
    "Sub-Saharan Dry-Stone Masonry Megalithic Architecture", "Great Enclosure circumference: 250 m; Wall height: up to 11 m (36 ft); Thickness: 6 m; Over 1 million granite blocks",
    "Natural exfoliating granite exfoliation slabs, dry-stone laid without mortar, carved soapstone birds",
    "Great Zimbabwe was the royal capital city of the Kingdom of Zimbabwe, a prosperous medieval Bantu empire that ruled the southeastern African plateau between the 11th and 15th centuries. At its zenith, the city had a population of over 18,000 people and controlled the lucrative inland gold and ivory trade routes connecting southern African mines to Indian Ocean trading ports like Sofala and Kilwa. Abandoned around 1450 CE due to resource exhaustion and regional trade shifts.",
    "The ruins span three main areas: the Hill Complex (the spiritual acropolis), the Valley Ruins, and the Great Enclosure (the royal residence of the queen or king). The Great Enclosure outer wall curves over 250 meters in circumference and stands 11 meters high, constructed of more than one million precision-trimmed granite blocks assembled completely dry without using any mortar. Inside rises the Conical Tower, an 11-meter solid stone cylinder resembling a giant Shona grain silo, symbolizing royal prosperity. Archaeologists unearthed eight carved green soapstone birds (the Zimbabwe Bird, Bateleur eagle), which now form the proud national symbol on the flag of modern Zimbabwe.",
    "Inscribed as a UNESCO World Heritage Site in 1986. The largest ancient stone structure in Africa south of the Sahara.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Great Zimbabwe", "Zimbabwe", "Shona", "Stone Enclosure", "Soapstone Bird", "Sub-Saharan", "UNESCO"],
    ["The largest ancient stone ruins in Africa south of the Sahara, built by the medieval Shona kingdom", "The Great Enclosure features 11-meter-tall curving walls built from one million stones without mortar", "Controls medieval trade networks linking inland African gold and ivory mines to the Indian Ocean", "The soapstone Zimbabwe Birds discovered here serve as the national emblem on the country's flag"],
    "Inscribed 1986 (Great Zimbabwe National Monument)"),

  # 37. Pyramids of Meroë, Sudan
  item("pyramids-of-meroe", "Pyramids of Meroë", "Medewi (Meroë Royal Necropolis)", "Ancient Wonder", "Shendi District, River Nile State", "Sudan", "Africa",
    "Kingdom of Kush Meroitic Golden Age (c. 300 BCE – 350 CE)", "c. 300 BCE – 350 CE", -300, "Kushite Black Pharaohs, Queens (Kandakes), and architects",
    "Nubian / Kushite Steep-Angled Royal Funerary Pyramid Architecture", "Over 200 pyramids across three cemeteries; Heights: 10–30 m (33–100 ft); Slope angle: steep 70 degrees",
    "Ferruginous dark reddish-brown Nubian sandstone blocks, brick, decorated offering chapels",
    "The Pyramids of Meroë are a royal necropolis of more than 200 steep-sided stone pyramids located in the desert of northern Sudan along the Nile. Served as the burial grounds for the kings and queens (Kandakes) of the Kingdom of Kush, the ancient African civilization that conquered Egypt in the 8th century BCE to rule as the 25th Dynasty ('The Black Pharaohs'). In fact, Sudan contains nearly 255 ancient pyramids—more than double the total number of pyramids in all of Egypt!",
    "Unlike the broad, flat-angled 51-degree Egyptian pyramids, Meroitic pyramids are distinctively tall, narrow, and steep-sided with a 70-degree slope angle, rising between 10 and 30 meters. Each pyramid was fronted by an ornate, decorated offering chapel with miniature pylons leading to subterranean burial vaults carved deep into the bedrock below. In 1834, Italian treasure hunter and tomb raider Giuseppe Ferlini systematically blew off the summits of over 40 pyramids with explosives in search of gold, finding the fabulous gold jewelry treasure of Queen Amanishakheto inside Pyramid Beg. N6.",
    "Inscribed as a UNESCO World Heritage Site in 2011 as part of the Archaeological Sites of the Island of Meroe.",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    ["Meroe", "Sudan", "Nubia", "Kush", "Black Pharaohs", "Kandake", "UNESCO"],
    ["Sudan has over 250 ancient pyramids—more than double the total number found in Egypt", "Meroitic pyramids feature distinctive narrow, steep-angled 70-degree sides made of red sandstone", "Burial ground for the Kushite rulers and warrior queens (Kandakes) who once ruled all of Egypt", "Each pyramid features an ornate offering chapel leading to deep subterranean burial chambers"],
    "Inscribed 2011 (Archaeological Sites of the Island of Meroe)"),

  # 38. Leptis Magna, Libya
  item("leptis-magna", "Leptis Magna (Lepcis Magna)", "Lpqy / Leptis Magna (Neapolis)", "Archaeological City", "Khoms, Murqub District", "Libya", "Africa",
    "Phoenician to Roman Imperial Golden Age (7th Century BCE – 211 CE)", "c. 200 BCE – 211 CE", 200, "Emperor Septimius Severus and Roman imperial architects",
    "Roman Imperial Monumental Basilica, Port & Forum Architecture", "Area: 100+ hectares; Severan Basilica length: 90 m; Theater capacity: 16,000 spectators; Hadrianic Baths",
    "Proconnesian white Greek marble, red Aswan granite columns, Cipollino green marble, local golden limestone",
    "Leptis Magna was a prominent Roman city located on the Mediterranean coast of modern Libya, 130 kilometers east of Tripoli. Originally founded by Phoenicians around the 7th century BCE as a trading post. Grew into one of the most magnificent metropolis cities of the Roman Empire under Emperor Septimius Severus (ruled 193–211 CE), who was born in Leptis Magna and lavished vast imperial wealth on his hometown, constructing a grand forum, basilica, monumental harbor, and colonnaded streets.",
    "Celebrated as the most pristine and complete Roman city ruins in the Mediterranean basin because it was abandoned after Arab conquests in the 7th century and buried under drifting Sahara Desert sand dunes for over a thousand years, which preserved its marble buildings from vandalism and stone quarrying. Features the colossal Arch of Septimius Severus, the Severan Basilica with massive carved marble pilasters depicting the labors of Hercules and Dionysus, the grand seaside Theater seating 16,000 with panoramic Mediterranean views, and the monumental Hadrianic Baths.",
    "Inscribed as a UNESCO World Heritage Site in 1982. Regarded as one of Rome's greatest architectural monuments.",
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1200",
    ["Leptis Magna", "Libya", "Roman", "Septimius Severus", "Sahara", "Severan Basilica", "UNESCO"],
    ["The birthplace of Roman Emperor Septimius Severus, who transformed it into an imperial jewel", "Preserved in extraordinary pristine detail beneath Sahara sand dunes for over 1,000 years", "Contains the Severan Basilica, monumental Roman seaside harbor, and 16,000-seat theater", "One of the most extensive and best-preserved Roman archaeological sites in the Mediterranean"],
    "Inscribed 1982 (Archaeological Site of Leptis Magna)"),

  # 39. Amphitheatre of El Jem, Tunisia
  item("amphitheatre-el-jem", "Amphitheatre of El Jem", "Amphitheatrum Thysdritanum / Ksar of El Djem", "Ancient Wonder", "El Djem, Mahdia Governorate", "Tunisia", "Africa",
    "Roman Imperial Severan Era (c. 238 CE)", "c. 238 CE", 238, "Roman proconsul Gordian I (later Emperor Gordian I)",
    "Classical Roman Colossal Elliptical Amphitheater Architecture", "Length: 148 m (485 ft); Width: 122 m; Height: 36 m (118 ft); Capacity: 35,000 spectators",
    "Warm yellow sandstone ashlar blocks quarried at Salakta, pozzolanic concrete, subterranean cages",
    "The Amphitheatre of El Jem is a Roman amphitheater in the desert town of El Djem (ancient Thysdrus) in central Tunisia. Built around 238 CE under Proconsul Gordian, who was proclaimed Roman Emperor at Thysdrus. In antiquity, Thysdrus was a prosperous Roman olive oil exporting boomtown in the province of Africa Proconsularis, competing with Carthage for economic dominance.",
    "It is the third-largest Roman amphitheater in the world, surpassed only by the Colosseum in Rome and the ruined amphitheater of Capua. Built entirely freestanding from massive golden-yellow sandstone blocks on a flat desert plain without any hillside supports. Its three-tiered facade features 64 Corinthian and Composite arches rising 36 meters high. Uniquely, El Jem preserves an intact subterranean basement (the hypogeum): a central gallery with holding chambers on both sides where gladiators and wild African beasts (lions, leopards) were kept in stone cages before being hoisted up into the arena by pulleys. Later used as a Berber fortress against Arab armies under Queen Kahina.",
    "Inscribed as a UNESCO World Heritage Site in 1979. Featured in movies like 'Life of Brian' and 'Gladiator'.",
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1200",
    ["El Jem", "Tunisia", "Roman", "Amphitheater", "Colosseum", "Gladiator", "UNESCO"],
    ["The third-largest Roman amphitheater in the world, capable of seating 35,000 spectators", "Built entirely freestanding from golden sandstone blocks on an open desert plain without hillside supports", "Features an exceptionally preserved underground hypogeum where gladiators and lions were caged", "Served as a fortified redoubt by Berber warrior queen Kahina during the 7th-century Arab conquests"],
    "Inscribed 1979 (Amphitheatre of El Jem)"),

  # 40. Hassan II Mosque, Casablanca, Morocco
  item("hassan-ii-mosque", "Hassan II Mosque", "Mosquée Hassan II (Grand Mosque of Casablanca)", "Sacred Temple / Cathedral", "Boulevard Sidi Mohammed Ben Abdallah, Casablanca", "Morocco", "Africa",
    "Modern Islamic Moroccan Golden Age (1986–1993 CE)", "1986–1993 CE", 1993, "Michel Pinseau, commissioned by King Hassan II",
    "Contemporary Moorish-Moroccan Islamic Monumental Architecture", "Minaret height: 210 m (689 ft); Prayer hall: 200 × 100 m; Capacity: 105,000 worshippers (25,000 inside, 80,000 outside)",
    "Granite from Tafraoute, marble from Khemissat, carved cedar wood from Middle Atlas, titanium sliding roof, green roof tiles",
    "The Hassan II Mosque is a monumental mosque in Casablanca, Morocco. Commissioned by King Hassan II to celebrate his 60th birthday and dedicated to the memory of his father Mohammed V. Built between 1986 and 1993 by 12,500 Moroccan master craftsmen and workers. Perched on a rocky promontory jutting out into the Atlantic Ocean, inspired by the Quranic verse: 'The throne of God was upon the water.'",
    "The minaret rises 210 meters (689 feet) into the sky, making it the second-tallest minaret in the world, equipped with a top-mounted laser beam pointing 30 kilometers across the sea toward Mecca. The prayer hall features an automated retractable titanium roof that glides open in three minutes to let worshippers pray directly under the open sky and ocean stars. Part of the mosque floor is made of high-strength shatterproof glass, allowing worshippers to look down directly at the crashing Atlantic ocean waves below.",
    "Morocco's premier national architectural icon and one of the largest mosques in the world.",
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=80&w=1200",
    ["Hassan II Mosque", "Casablanca", "Morocco", "Minaret", "Atlantic", "Zellij", "Islamic"],
    ["Features a soaring 210-meter minaret, the second-tallest minaret on Earth, fitted with a laser pointing to Mecca", "Perched directly over the Atlantic Ocean, inspired by the Quranic verse 'The throne of God was upon water'", "The titanium roof retracts automatically in three minutes to open the prayer hall to the open sky", "Built by 12,500 Moroccan master craftsmen using local cedar wood, Khemissat marble, and zellij tiles"],
    "National Monument of Morocco"),

  # 41. Koutoubia Mosque, Marrakech, Morocco
  item("koutoubia-mosque", "Koutoubia Mosque & Minaret", "Jami' al-Kutubiyya (Mosque of the Booksellers)", "Sacred Temple / Cathedral", "Medina, Marrakech", "Morocco", "Africa",
    "Almohad Caliphate Golden Age (1147–1195 CE)", "1147–1195 CE", 1195, "Almohad Caliphs Abd al-Mu'min and Yaqub al-Mansur",
    "Classical Almohad Moorish-Moroccan Architecture", "Minaret height: 77 m (253 ft); Width: 12.8 m; Prayer hall width: 90 m; Length: 60 m",
    "Red sandstone ashlar from Guéliz, turquoise ceramic tiles, gilded copper orbs (jamur)",
    "The Koutoubia Mosque is the largest mosque in Marrakech, Morocco. Founded in 1147 by Almohad Caliph Abd al-Mu'min after conquering Marrakech from the Almoravids. Named 'Mosque of the Booksellers' from the Arabic 'al-Kutubiyyin' because up to 100 manuscript booksellers and scribes set up stalls around its base in medieval times.",
    "The minaret rises 77 meters (253 ft) in red sandstone, serving as the architectural prototype and mother of Moorish towers across the Islamic world—directly inspiring the Giralda of Seville in Spain and the Hassan Tower of Rabat. The spire is crowned by three gilded copper spheres (the jamur); local legend claims the balls were originally forged from pure gold melted down from the jewelry of Caliph Yaqub al-Mansur's wife as penance for breaking her Ramadan fast for three hours. By municipal law in Marrakech, no building in the city is permitted to exceed the height of the Koutoubia minaret palm trees.",
    "Inscribed as a UNESCO World Heritage Site in 1985 as part of the Medina of Marrakech.",
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=80&w=1200",
    ["Koutoubia", "Marrakech", "Morocco", "Minaret", "Almohad", "Booksellers", "UNESCO"],
    ["Served as the legendary architectural prototype for the Giralda in Seville and Hassan Tower in Rabat", "Named 'Mosque of the Booksellers' for the 100 manuscript scribe stalls that surrounded its base in 1195", "The spire is topped with three golden orbs legend says were forged from an empress's jewelry", "A strict municipal building law bans any structure in Marrakech from exceeding the minaret's height"],
    "Inscribed 1985 (Medina of Marrakech)"),

  # 42. Medersa Ben Youssef, Marrakech, Morocco
  item("medersa-ben-youssef", "Ben Youssef Madrasa", "Madrasat Ibn Yusuf", "Sacred Temple / Cathedral", "Medina of Marrakech", "Morocco", "Africa",
    "Saadian Dynasty Moroccan Renaissance (1564–1565 CE; Marinid roots 14th c.)", "1564–1565 CE", 1565, "Saadian Sultan Abdallah al-Ghalib",
    "Hispano-Moresque Islamic Madrasa Architecture", "Central courtyard dimensions: 21 × 15 m; 130 student dorm rooms across 2 levels; Capacity: 900 theology students",
    "Zellij geometric mosaic tilework, carved stuccowork (yeseria), carved Atlas cedar wood, Italian Carrara marble",
    "The Ben Youssef Madrasa is an Islamic college in Marrakech, Morocco, named after the adjacent Almoravid mosque of Sultan Ali ibn Yusuf. Reconstructed in 1564–1565 by Saadian Sultan Abdallah al-Ghalib as the largest Islamic college in North Africa. For centuries, it housed up to 900 students who came from across the Islamic world to study the Quran, Islamic jurisprudence, astronomy, mathematics, and medicine in its 130 second-story dorm rooms.",
    "A crowning jewel of Moroccan decorative art: the central courtyard features a shallow marble ablution pool surrounded by walls adorned with intricate zellij terracotta mosaic tiles forming complex mathematical star polygrams. Above the zellij, the walls transition into dense lace-like carved plaster stucco (yeseria) featuring Quranic calligraphic inscriptions in Kufic script and floral arabesques, capped by projecting eaves of fragrant Atlas cedar wood carved with honeycomb muqarnas vaults. Above the entrance door, an inscription greets scholars: 'You who enter my door, may your highest hopes be exceeded.'",
    "Part of the UNESCO World Heritage Medina of Marrakech (1985). Welcomes thousands of visitors daily following a meticulous 2020 restoration.",
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=80&w=1200",
    ["Ben Youssef", "Marrakech", "Morocco", "Madrasa", "Zellij", "Muqarnas", "Saadian", "UNESCO"],
    ["The largest Islamic madrasa in North Africa, once housing up to 900 theology and science students", "Courtyard features world-class zellij tilework, lace-like carved stucco, and Atlas cedar woodwork", "Entrance lintel is engraved: 'You who enter my door, may your highest hopes be exceeded'", "Contains 130 historic student dorm cells arranged around airy second-story miniature light wells"],
    "Inscribed 1985 (Medina of Marrakech)"),

  # 43. Fes el-Bali & University of Al-Qarawiyyin, Morocco
  item("al-qarawiyyin-fes", "University of Al-Qarawiyyin & Fes el-Bali", "Jāmi'at al-Qarawiyyīn (Al-Qarawiyyin) / Fās al-Bālī", "Sacred Temple / Cathedral", "Fes el-Bali, Fes", "Morocco", "Africa",
    "Idrisid to Marinid Dynasty (Founded 859 CE)", "859 CE", 859, "Fatima al-Fihri (Founder), expanded by Marinid Sultans",
    "Classical Moroccan Andalusian Islamic Architecture", "Medina area: 220 hectares; 9,400 pedestrian alleyways; Library holds 4,000 ancient manuscripts",
    "Green glazed ceramic tiles, carved cedar wood, white stucco yeseria, zellij mosaics, brass astrolabes",
    "The University of Al-Qarawiyyin, located in the labyrinthine medieval medina of Fes el-Bali in Fes, Morocco, is recognized by UNESCO and the Guinness World Records as the oldest continually operating university and degree-granting institution of higher learning in the world. Founded in 859 CE by Fatima al-Fihri, a wealthy Muslim woman and daughter of a prosperous merchant who pledged her entire inherited fortune to construct a mosque and educational center for her community.",
    "Developed into the premier intellectual center of the medieval Mediterranean, where Islamic and Christian scholars—including Pope Sylvester II (Gerbert of Aurillac, who introduced Arabic numerals to Europe), Jewish philosopher Maimonides, and geographer Leo Africanus—studied cartography, medicine, mathematics, and philosophy. The university library preserves over 4,000 priceless ancient manuscripts, including a 9th-century Quran written on gazelle hide in Kufic script and original works by Ibn Khaldun. The surrounding medina of Fes el-Bali is the world's largest contiguous car-free urban zone, containing 9,400 winding pedestrian alleyways navigated only on foot and by pack donkeys.",
    "Inscribed as a UNESCO World Heritage Site in 1981. The living intellectual heart of the Islamic world.",
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=80&w=1200",
    ["Al-Qarawiyyin", "Fes", "Morocco", "Oldest University", "Fatima al-Fihri", "Medina", "UNESCO"],
    ["Recognized by UNESCO and Guinness World Records as the oldest continuously operating university on Earth", "Founded in 859 CE by Fatima al-Fihri, who donated her entire family inheritance to education", "Its ancient library holds over 4,000 rare manuscripts, including a 9th-century Quran on gazelle hide", "Located in Fes el-Bali, the largest car-free urban pedestrian zone in the world (9,400 alleys)"],
    "Inscribed 1981 (Medina of Fez)"),

  # 44. Castle of Good Hope, Cape Town, South Africa
  item("castle-of-good-hope", "Castle of Good Hope", "Kasteel die Goeie Hoop", "Palace & Fortress", "Foreshore, Cape Town", "South Africa", "Africa",
    "Dutch East India Company (VOC) Era (1666–1679 CE)", "1666–1679 CE", 1679, "Commander Zacharias Wagenaer & VOC Dutch military engineers",
    "Dutch Renaissance Star Fortress (Pentagonal Bastion) Architecture", "Pentagon perimeter: 500 m; 5 bastions: Leerdam, Buuren, Catzenellenbogen, Nassau, and Oranje; Wall height: 10 m",
    "Table Mountain sandstone, Malmesbury blue slate, yellow Dutch clinker bricks ('ijsselstene'), mortar made of seashells",
    "The Castle of Good Hope is a pentagonal 17th-century star fortress located in Cape Town, South Africa. Built between 1666 and 1679 by the Dutch East India Company (VOC) to replace an earlier clay-and-timber fort built by Jan van Riebeeck. It is the oldest surviving colonial building in South Africa. Served as the military, administrative, and economic replenishment station for Dutch merchant fleets sailing between the Netherlands and the spice-rich Indonesian East Indies.",
    "Constructed in the classic Renaissance star fortress design with five defensive corner bastions named after the titles of the Prince of Orange: Leerdam, Buuren, Catzenellenbogen, Nassau, and Oranje. The main gateway, completed in 1684, was built using small yellow Dutch bricks imported from the Netherlands as ship ballast and is crowned with the VOC coat of arms flanked by the Lion of Holland. The entrance bell tower houses a historic bronze bell cast in Amsterdam in 1697 weighing 300 kilograms, which was struck to announce time, emergencies, and public proclamations. Contains the infamous 'Donker Gat' (Dark Hole), a windowless subterranean dungeon flooded during high tides.",
    "A declared South African National Heritage Site. Houses the Castle Military Museum and the William Fehr Art Collection.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Castle Good Hope", "Cape Town", "South Africa", "VOC", "Star Fortress", "Oldest Building", "Colonial"],
    ["The oldest surviving colonial building in South Africa, constructed between 1666 and 1679", "Built as a pentagonal star fortress with five stone bastions named after the Prince of Orange", "Features small yellow Dutch clinker bricks imported from the Netherlands as ship ballast", "Its entrance bell tower holds an Amsterdam bronze bell cast in 1697 that still rings today"],
    "National Heritage Site of South Africa"),

  # 45. Robben Island, South Africa
  item("robben-island", "Robben Island Maximum Security Prison", "Robbeneiland (Seal Island)", "Famous Building", "Table Bay, 6.9 km off Cape Town", "South Africa", "Africa",
    "Apartheid Era to Democratic Rebirth (Prison built 1961 CE; island used since 17th c.)", "1961 CE", 1961, "South African Department of Correctional Services",
    "Modern Penal Institutional Fortress Architecture", "Island area: 5.08 km² (1.96 sq mi); Prison block: Maximum Security Unit; Mandela Cell: 2.1 × 2.1 m (7 × 7 ft)",
    "Reinforced concrete, limestone quarried on island by prisoners, barbed wire perimeter fences",
    "Robben Island ('Seal Island' in Dutch) is an island in Table Bay, 6.9 kilometers off the coast of Cape Town, South Africa. Used by Dutch, British, and South African authorities for over three centuries as a penal colony, leper isolation colony, and military animal quarantine station. Between 1961 and 1991, it served as South Africa's most notorious maximum-security political prison, where the white-minority Apartheid regime incarcerated anti-apartheid freedom fighters, African National Congress leaders, and PAC dissidents.",
    "Nelson Mandela, the global symbol of freedom and reconciliation, was imprisoned on Robben Island for 18 of his 27 years in prison (from 1964 to 1982) in a bare 2.1 × 2.1 meter (7 × 7 foot) concrete cell (Cell 5, Section B) with only a straw mat to sleep on and a bucket for a toilet. During their daily hard labor hammering stones in the island's blinding white lime quarry, Mandela, Walter Sisulu, and Ahmed Kathrada turned the quarry into an informal university (the 'University of Robben Island'), debating philosophy, human rights, and the future constitution of a non-racial democratic South Africa. Today, tours of the prison are guided exclusively by former political prisoners who were once jailed there.",
    "Inscribed as a UNESCO World Heritage Site in 1999 as a triumph of the human spirit over tyranny.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Robben Island", "Cape Town", "South Africa", "Nelson Mandela", "Apartheid", "Freedom", "UNESCO"],
    ["Nelson Mandela was imprisoned here for 18 of his 27 years in a 7-by-7-foot concrete isolation cell", "Prisoners turned the limestone quarry into an underground university debating democracy and freedom", "Guided tours today are conducted exclusively by former political prisoners who were once incarcerated here", "Inscribed by UNESCO in 1999 as a global symbol of the triumph of human spirit and reconciliation"],
    "Inscribed 1999 (Robben Island)"),

  # --- OCEANIA (10) ---
  # 46. Sydney Opera House, Australia
  item("sydney-opera-house", "Sydney Opera House", "Bennelong Point Opera House", "Famous Building", "Bennelong Point, Sydney Harbour, NSW", "Australia", "Oceania",
    "Late Modernist Expressionism (1957–1973 CE)", "1957–1973 CE", 1973, "Jørn Utzon (Engineer: Ove Arup & Partners)",
    "Structural Expressionist Precast Concrete Shell Architecture", "Length: 183 m; Width: 120 m; Roof height: 65 m; 1,056,006 Swedish ceramic roof tiles; 7 performance venues",
    "Precast reinforced concrete rib shells, Höganäs Swedish glazed white and cream ceramic tiles, pink Tarana granite aggregate, French tinted glass",
    "The Sydney Opera House is a multi-venue performing arts center situated on Bennelong Point in Sydney Harbour, Australia. Conceived in 1957 when Danish architect Jørn Utzon won an international design competition with his revolutionary sail-like design. Completed in 1973 under engineer Ove Arup. Formally opened on October 20, 1973, by Queen Elizabeth II. Universally recognized as one of the indisputable architectural masterpieces of the 20th century.",
    "Utzon solved the daunting mathematical challenge of constructing the soaring curved roof shells by realizing that all the shells could be cut as triangles from a single common sphere of 75-meter radius, allowing the concrete ribs to be precast off-site in standardized molds. The iconic roof is clad in 1,056,006 self-cleaning ceramic tiles made in Sweden, arranged in a subtle chevron pattern combining glossy white and matte cream to reflect the changing light of Sydney Harbour without glaring. Encloses seven world-class performance halls, including the Concert Hall with its 10,000-pipe Grand Organ (the largest mechanical tracker action pipe organ in the world).",
    "Inscribed as a UNESCO World Heritage Site in 2007, making Utzon only the second person to have their work designated a World Heritage Site during their lifetime. Australia's premier architectural symbol.",
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=1200",
    ["Sydney Opera House", "Sydney", "Australia", "Jorn Utzon", "Ove Arup", "Expressionism", "UNESCO"],
    ["Jørn Utzon solved the roof geometry by deriving all shell forms from a single 75-meter sphere", "The sail-shaped roof is clad in 1,056,006 Swedish ceramic tiles that gleam in harbor light", "Houses the Concert Hall Grand Organ, the largest mechanical tracker-action organ in the world", "Inscribed by UNESCO in 2007 while architect Jørn Utzon was still alive"],
    "Inscribed 2007 (Sydney Opera House)"),

  # 47. Sydney Harbour Bridge, Australia
  item("sydney-harbour-bridge", "Sydney Harbour Bridge", "The Coathanger / Sydney Harbour Bridge", "Bridge & Engineering", "Sydney Harbour, Sydney, NSW", "Australia", "Oceania",
    "Interwar Industrial Steel Arch Engineering (1923–1932 CE)", "1923–1932 CE", 1932, "John Bradfield (Chief Engineer), Ralph Freeman, Dorman Long & Co.",
    "Through-Type Steel Truss Arch Bridge Engineering", "Total length: 1,149 m (3,770 ft); Arch span: 503 m (1,650 ft); Top height: 134 m (440 ft); Steel weight: 52,800 tonnes",
    "High-tensile structural steel (partially imported from Middlesbrough, UK), Moruya grey granite pylons, 6 million hand-driven Australian steel rivets",
    "The Sydney Harbour Bridge is a steel through-arch bridge spanning Sydney Harbour, carrying vehicular, railway, bicycle, and pedestrian traffic between the Sydney central business district and the North Shore. Designed and built under the supervision of Australian civil engineer Dr. John Bradfield. Opened on March 19, 1932, bringing thousands of jobs to Sydney during the depths of the Great Depression. Affectionately nicknamed 'The Coathanger' by locals due to its arch-based curved profile.",
    "It is the tallest steel arch bridge in the world, measuring 134 meters from water level to the top of the arch, and was the world's widest long-span bridge for over 80 years at 48.8 meters. Held together by six million hand-driven Australian red-hot steel rivets. Thermal expansion and contraction can cause the arch to rise or fall by up to 18 centimeters (7 inches) depending on hot summer days or cold winter nights. In 1998, the bridge opened 'BridgeClimb', allowing adventurous visitors to climb the outer upper arch to the summit.",
    "Inscribed on the Australian National Heritage List in 2007. One of the greatest engineering feats of the 20th century.",
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1200",
    ["Harbour Bridge", "Sydney", "Australia", "Steel Arch", "Coathanger", "Bradfield", "Engineering"],
    ["The tallest steel arch bridge in the world, soaring 134 meters (440 feet) above Sydney Harbour", "Affectionately nicknamed 'The Coathanger' by Australians due to its distinctive arch profile", "Held together by six million hand-driven steel rivets hammered red-hot into the trusses", "Thermal summer heat causes the steel arch to expand and rise up to 18 centimeters in height"],
    "Australian National Heritage"),

  # 48. Royal Exhibition Building, Melbourne, Australia
  item("royal-exhibition-building", "Royal Exhibition Building", "Royal Exhibition Building & Carlton Gardens", "Famous Building", "Carlton Gardens, Melbourne, Victoria", "Australia", "Oceania",
    "Victorian Boom Era / Beaux-Arts (1879–1880 CE)", "1879–1880 CE", 1880, "Joseph Reed, commissioned for the 1880 Melbourne International Exhibition",
    "Victorian Rundbogenstil & Renaissance Revival Architecture", "Great Hall length: 150 m; Dome height: 68 m (223 ft); Floor area: 12,000 m²; Grounds: 26 hectares",
    "Brick ashlar masonry, timber dome structure, slate roofing, cast iron decorative ironwork",
    "The Royal Exhibition Building is an exhibition pavilion in Melbourne, Victoria, situated in the landscaped Carlton Gardens. Designed by renowned Melbourne architect Joseph Reed for the 1880 Melbourne International Exhibition, which celebrated Victoria's phenomenal Victorian gold rush wealth and announced Melbourne as a major world metropolis. Completed in just 18 months.",
    "Its central dome rises 68 meters high, directly inspired by Brunelleschi's famous Renaissance dome of Florence Cathedral (Santa Maria del Fiore). On May 9, 1901, the building hosted one of the most important events in Australian history: the grand inaugural opening of the first Parliament of the Commonwealth of Australia by the Duke of Cornwall and York (later King George V), following the federation of the six Australian colonies into an independent nation. The interior preserves rich Victorian decorative ceiling paintings, trompe-l'œil murals, and allegorical murals celebrating industry, science, and the arts.",
    "In 2004, it became the very first building in Australia to be awarded UNESCO World Heritage status. The only surviving Great Hall from a 19th-century World's Fair still operating for exhibitions.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Royal Exhibition", "Melbourne", "Australia", "Carlton Gardens", "Brunelleschi", "Federation", "UNESCO"],
    ["The very first building in Australia to be awarded UNESCO World Heritage status (in 2004)", "The 68-meter central dome was modeled directly on Brunelleschi's dome for Florence Cathedral", "Hosted the grand ceremonial opening of the first Parliament of Australia on May 9, 1901", "The only surviving 19th-century World Fair Great Hall that still hosts commercial exhibitions"],
    "Inscribed 2004 (Royal Exhibition Building and Carlton Gardens)"),

  # 49. Port Arthur Historic Site, Tasmania, Australia
  item("port-arthur", "Port Arthur Historic Site", "Port Arthur Penal Settlement", "Archaeological City", "Tasman Peninsula, Tasmania", "Australia", "Oceania",
    "British Colonial Penal Colony Era (1830–1877 CE)", "1830–1877 CE", 1830, "British Royal Engineers & convict stonemasons",
    "Georgian and Victorian Institutional Penal Colony Architecture", "Site area: 40 hectares (100 acres); Over 30 historic buildings and ruins; Penitentiary length: 60 m",
    "Local convict-quarried dolerite stone, sandstone, clay bricks stamped with government broad arrows",
    "Port Arthur is a former convict settlement on the Tasman Peninsula in Tasmania, Australia. Established in 1830 as a timber station, it evolved between 1833 and 1853 into the British Empire's most dreaded secondary penal station for recidivist British and Irish convicts who committed further crimes in Australia. Described as 'a machine for turning bad men into good', combining grueling manual labor with psychological reform.",
    "Regarded by British authorities as an inescapable natural prison, isolated on a peninsula connected to the mainland only by an 80-meter-wide spit of land called Eaglehawk Neck, which was guarded by savage chained dogs and armed sentries, with shark-infested waters surrounding the coast. Port Arthur pioneered the 'Separate Prison' system inspired by Jeremy Bentham's Panopticon: instead of physical flogging with the cat-o'-nine-tails, prisoners were subjected to solitary confinement, complete silence, and forced to wear hoods with eyeholes to prevent communication and induce moral contemplation. The site preserves the ruins of the four-story Penitentiary, the Separate Prison, the Guard Tower, and the roofless Convict Church.",
    "Inscribed as a UNESCO World Heritage Site in 2010 as part of the Australian Convict Sites.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Port Arthur", "Tasmania", "Australia", "Convict", "Penal Colony", "Separate Prison", "UNESCO"],
    ["The most formidable penal settlement in the British Empire, operating from 1830 to 1877", "Guarded at the narrow Eaglehawk Neck peninsula by armed guards and a line of chained dogs", "Pioneered psychological solitary confinement where hooded inmates lived in complete silence", "Inscribed on UNESCO's World Heritage List in 2010 among the Australian Convict Sites"],
    "Inscribed 2010 (Australian Convict Sites)"),

  # 50. Shrine of Remembrance, Melbourne, Australia
  item("shrine-of-remembrance", "Shrine of Remembrance", "The Shrine of Remembrance", "Monument & Tower", "Kings Domain, Melbourne, Victoria", "Australia", "Oceania",
    "Interwar Classical Monumentalism (1927–1934 CE)", "1927–1934 CE", 1934, "Phillip Hudson and James Wardrop (World War I veteran architects)",
    "Neoclassical Monumental Tomb Architecture (Inspired by the Mausoleum at Halicarnassus)", "Height: 35 m (115 ft); Base dimensions: 70 × 60 m; Sanctuary height: 25 m",
    "Granite from Tynong, Dromana granite columns, New South Wales sandstone, bronze friezes",
    "The Shrine of Remembrance is a monumental war memorial in Kings Domain on St Kilda Road in Melbourne, Victoria. Conceived in the aftermath of World War I to honor the men and women of Victoria who served and died in the Great War (where 19,000 Victorians were killed overseas). Designed by architects Phillip Hudson and James Wardrop, both of whom were Australian Army veterans. Dedicated on November 11, 1934, before a crowd of 300,000 people.",
    "Designed in the austere Neoclassical style inspired by two ancient Greek wonders: the Parthenon in Athens (for its Doric colonnaded porticos) and the Mausoleum at Halicarnassus (for its stepped pyramid roof crowned by a bronze urn of eternal remembrance). In the center of the underground Sanctuary lies the marble Stone of Remembrance, bearing the biblical inscription: 'GREATER LOVE HATH NO MAN'. The building was engineered with precision astronomical geometry: at precisely 11:00 AM on November 11 (Remembrance Day), a ray of natural sunlight passes through an aperture in the high pyramid ceiling to illuminate the word 'LOVE' on the stone.",
    "Victoria's most sacred public monument, hosting over 50,000 people at dawn each Anzac Day.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Shrine of Remembrance", "Melbourne", "Australia", "War Memorial", "Anzac", "Halicarnassus"],
    ["Modeled after two ancient Greek wonders: the Parthenon and the Mausoleum at Halicarnassus", "On November 11 at 11:00 AM, a solar beam illuminates the word 'LOVE' on the Stone of Remembrance", "Dedicated in 1934 before 300,000 citizens to honor soldiers who died in World War I", "Features an eternal flame lit by Queen Elizabeth II in 1954 that has burned continuously since"],
    "Victorian Heritage Register"),

  # 51. Uluru / Kata Tjuta Sacred Formations, Australia
  item("uluru-kata-tjuta", "Uluru & Kata Tjuta Monoliths", "Uluṟu (Sacred Pitjantjatjara Site) / Ayers Rock", "Ancient Wonder", "Petermann, Northern Territory", "Australia", "Oceania",
    "Neoproterozoic to Cambrian Geology (c. 550 Million Years Ago; inhabited 30,000+ years)", "550 Million BCE", -550000000, "Nature (Archaean geological uplifting) / Anangu First Nations Tjukurpa",
    "Sacred Natural Monolithic Arkose Sandstone Formations", "Uluru height: 348 m (1,142 ft) above plain (863 m above sea level); Circumference: 9.4 km; Subterranean depth: 5 km",
    "Coarse-grained arkose sandstone rich in feldspar, iron-oxide red weathering crust, sacred rock art caves",
    "Uluru, historically known to European settlers as Ayers Rock, is a colossal monolithic sandstone rock formation situated in the southern part of the Northern Territory in central Australia. Sacred to the Anangu, the Pitjantjatjara and Yankunytjatjara Aboriginal people of the Western Desert who have inhabited the region for more than 30,000 years. According to Anangu Tjukurpa (creation stories and spiritual law), Uluru was shaped during the Dreamtime by ancestral spirits whose journeys and battles remain etched in its scars, caves, and waterholes.",
    "It is the largest isolated sandstone inselberg on Earth. Rising 348 meters above the surrounding red desert sands, but extending an estimated 5 to 6 kilometers into the earth beneath the surface, like an immense terrestrial iceberg. Famous for its dramatic color changes: shifting from deep ochre red to glowing fiery vermilion at sunrise and radiant violet-purple at sunset as the low sun interacts with atmospheric dust. Nearby stand the 36 rounded red domed rocks of Kata Tjuta ('Many Heads'). On October 26, 2019, climbing Uluru was permanently closed by the Anangu traditional owners to protect its sacred cultural sanctity.",
    "Inscribed as a UNESCO World Heritage Site under dual cultural and natural criteria in 1987 and 1994.",
    "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&q=80&w=1200",
    ["Uluru", "Ayers Rock", "Australia", "Anangu", "Dreamtime", "Inselberg", "UNESCO"],
    ["Sacred to the indigenous Anangu people who have inhabited the surrounding lands for 30,000 years", "Extends up to six kilometers into the earth beneath the desert floor like a stone iceberg", "Shifts through radiant colors from brilliant fiery orange to violet at sunrise and sunset", "Climbing was permanently prohibited on October 26, 2019, to honor indigenous cultural law"],
    "Inscribed 1987 (Uluru-Kata Tjuta National Park)"),

  # 52. Sky Tower Auckland, New Zealand
  item("sky-tower-auckland", "Sky Tower Auckland", "Sky Tower", "Monument & Tower", "Victoria Street West, Auckland CBD", "New Zealand", "Oceania",
    "Late 20th Century High-Strength Concrete Engineering (1994–1997 CE)", "1994–1997 CE", 1997, "Gordon Moller (Craig Craig Moller Architects)",
    "Post-Tensioned Reinforced Concrete Observation & Telecom Tower", "Pinnacle height: 328 m (1,076 ft); Observation deck: 220 m; Concrete volume: 15,000 m³; Weight: 21,000 tonnes",
    "High-performance reinforced concrete (12,000 psi), structural steel mast, 38 mm reinforced laminated glass floor panels",
    "The Sky Tower is a telecommunications and observation tower in the central business district of Auckland, New Zealand. Completed in 1997 as part of the SkyCity Auckland casino complex. Soaring 328 meters (1,076 feet), it is the tallest human-made freestanding structure in New Zealand and the second-tallest freestanding structure in the Southern Hemisphere (surpassed only by the Autograph Tower in Jakarta).",
    "Engineered with extraordinary seismic and meteorological resilience: designed to withstand sustained winds of 200 km/h (125 mph) and earthquakes up to magnitude 8.0 centered within 20 kilometers. The main concrete shaft measures 12 meters in diameter, built using climbing slip-form techniques. Features three observation levels, including the revolving Orbit 360 restaurant and glass-floor panels where visitors look 220 meters straight down onto Auckland streets. Famous for hosting the 'SkyJump', a 192-meter wire-guided adrenaline base jump from the observation deck reaching speeds of 85 km/h.",
    "The signature landmark on the Auckland skyline and New Zealand's most visited tourism attraction.",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1200",
    ["Sky Tower", "Auckland", "New Zealand", "Tower", "Observation", "SkyJump", "Engineering"],
    ["The tallest freestanding structure in New Zealand, soaring 328 meters (1,076 ft) over Auckland", "Engineered to withstand magnitude 8.0 earthquakes and 200 km/h hurricane-force winds", "Features the adrenaline 192-meter 'SkyJump' controlled cable dive from the tower deck", "Contains the revolving Orbit 360 restaurant completing a full rotation every hour"],
    "National Landmark of New Zealand"),

  # 53. Beehive Parliament, Wellington, New Zealand
  item("beehive-parliament-nz", "The Beehive (Executive Wing of Parliament)", "The Beehive / Te Whare Parāmete", "Famous Building", "Molesworth Street, Wellington", "New Zealand", "Oceania",
    "Late Brutalist / Modernist Expressionism (1969–1979 CE)", "1969–1979 CE", 1979, "Sir Basil Spence & Ministry of Works (Lead architect: Fergus Sheppard)",
    "Modernist Concentric Circular Conical Brutalist Architecture", "Height: 72 m (236 ft); 10 above-ground floors; 4 subterranean levels; Base diameter: 48 m; Tapers to 22 m",
    "Reinforced concrete, Takaka white marble facing tiles, brown Coromandel granite, stainless steel mesh, copper roof",
    "The Beehive is the popular name for the Executive Wing of the New Zealand Parliament Buildings, located in Wellington. Designed in 1964 by renowned British architect Sir Basil Spence during a royal tour. Built between 1969 and 1979. Serves as the executive seat of the New Zealand Government, housing the offices of the Prime Minister, Cabinet ministers, and the National Crisis Management Centre.",
    "Celebrated for its distinctive conical beehive shape, consisting of concentric circular floors that step progressively inward as the building rises 72 meters to an observation lantern, crowned by a copper roof. The exterior is clad in white Takaka marble and brown Coromandel granite. Inside, the Banquet Hall on the first floor features a stunning 42-meter circular mural painted by celebrated New Zealand artist Pat Hanly, symbolizing the development of human culture and peaceful nationhood in the Pacific. Beneath the building sits the underground National Crisis Management Centre ('The Bunker'), designed to withstand nuclear attack and severe Alpine Fault earthquakes.",
    "Designated a Category 1 Historic Place by Heritage New Zealand. The architectural symbol of Kiwi parliamentary democracy.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Beehive", "Wellington", "New Zealand", "Parliament", "Basil Spence", "Prime Minister", "Architecture"],
    ["The executive seat of New Zealand's Government, housing the Prime Minister and Cabinet offices", "Designed by British architect Sir Basil Spence in a distinctive stepped concentric circular cone", "Features a 42-meter circular mural by artist Pat Hanly in the grand state Banquet Hall", "Equipped with a subterranean bunker designed to manage national civil defense emergencies"],
    "Category 1 Historic Place (Heritage NZ)"),

  # 54. Nan Madol, Federated States of Micronesia
  item("nan-madol", "Nan Madol (Venice of the Pacific)", "Nan Madol (Spaces Between / Venice of the Pacific)", "Archaeological City", "Pohnpei Island, Senyavin Islands", "Micronesia", "Oceania",
    "Saudeleur Dynasty Pacific Megalithic Civilization (c. 1100–1628 CE)", "c. 1180–1200 CE", 1180, "Saudeleur rulers (Olosihpa and Olosohpa in oral tradition)",
    "Pacific Ocean Coral Reef Megalithic Tidal Architecture", "Total area: 75 hectares (185 acres); 92 artificial coral stone islets; Seawalls: up to 8 m high; Megaliths: up to 50 tonnes",
    "Natural columnar basalt prismatic logs, coral boulder rubble foundations, tidal sea canals",
    "Nan Madol, known as the 'Venice of the Pacific', is an ancient ruined city constructed in a lagoon adjacent to the eastern shore of Pohnpei island in the Federated States of Micronesia. Constructed between 1100 and 1600 CE as the ceremonial and political capital of the Saudeleur dynasty, which united Pohnpei's estimated 25,000 people. It is the only ancient city in world history ever built directly atop a tidal coral reef.",
    "The city consists of 92 artificial islets constructed on the reef, separated by a network of tidal canals. The islets were engineered using colossal interlocking prismatic logs of columnar basalt—volcanic stones that cooled into natural hexagonal prisms—stacked crisscrossed like a giant log cabin and backfilled with crushed coral rubble. An estimated 750,000 tonnes of basalt logs, some weighing up to 50 tonnes each, were transported across the island without metal tools or wheels; local Pohnpeian legends explain that twin sorcerers Olosihpa and Olosohpa used magic to levitate the flying stones from distant volcanic quarries across the sea. The largest islet, Nandauwas, features royal mortuary tomb walls rising eight meters high.",
    "Inscribed as a UNESCO World Heritage Site in 2016. One of the most astonishing megalithic engineering achievements in the Pacific Ocean.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Nan Madol", "Pohnpei", "Micronesia", "Pacific Venice", "Basalt Logs", "Saudeleur", "UNESCO"],
    ["The only ancient city in world history constructed directly atop a tidal ocean coral reef", "Composed of 92 artificial islets linked by canals, engineered from 750,000 tonnes of basalt stone", "Basalt logs were stacked like giant wooden log cabins without using any mortar or metal tools", "Pohnpeian folklore tells of ancient twin sorcerers who used magic to levitate the heavy stones"],
    "Inscribed 2016 (Nan Madol: Ceremonial Centre)"),

  # 55. Ha'amonga 'a Maui, Tonga
  item("haamonga-a-maui", "Ha'amonga 'a Maui (Burden of Maui)", "Ha'amonga 'a Maui (Trilithon of Tonga)", "Ancient Wonder", "Heketā, Niutōtō, Tongatapu", "Tonga", "Oceania",
    "Tu'i Tonga Maritime Empire (c. 1200 CE)", "c. 1200 CE", 1200, "11th Tu'i Tonga King Tu'itātui",
    "Polynesian Megalithic Trilithon Coral Architecture", "Height: 5.2 m (17 ft); Width: 5.8 m; Depth: 1.4 m; Total weight: ~40 tonnes",
    "Quarried fossilized Pleistocene coral limestone, mortise-and-tenon carved recesses",
    "Ha'amonga 'a Maui ('The Burden of the God Maui') is a colossal megalithic stone trilithon located near the village of Niutōtō on the island of Tongatapu, Tonga. Built around 1200 CE during the zenith of the Tu'i Tonga Empire under the 11th Tu'i Tonga, King Tu'itātui. Regarded as the Polynesian counterpart to England's Stonehenge.",
    "The monument consists of three colossal fossilized coral limestone slabs: two upright stone pillars standing 5.2 meters (17 feet) high, supporting an interlocking horizontal lintel stone 5.8 meters long. The top of each vertical pillar has a deep notched mortise joint into which the crossbar lintel was fitted using precision woodworking-style joinery. King Tu'itātui had the monument built to honor his two sons, with the two upright pillars representing his sons and the crossbar representing the unbroken bond of peace uniting them. In 1967, King Tāufa'āhau Tupou IV discovered that carved directional markings on the lintel stone align precisely with the sunrise points of the winter and summer solstices, demonstrating its use as an ancient Polynesian astronomical observatory.",
    "A protected National Monument of the Kingdom of Tonga and a candidate for UNESCO World Heritage status.",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    ["Haamonga a Maui", "Tonga", "Polynesian", "Trilithon", "Solstice", "Maui", "Megalith"],
    ["Often called the 'Stonehenge of the Pacific', erected around 1200 CE from 40 tonnes of coral stone", "Constructed using interlocking mortise joints carved into the tops of the massive upright pillars", "Built by King Tu'itātui to symbolize the eternal bond of unity between his two royal sons", "Markings on the crossbar align precisely with the rising sun on the summer and winter solstices"],
    "National Monument of the Kingdom of Tonga")
]

all_americas_africa_oceania = monuments + africa_and_oceania

with open("src/data/monuments/americasAfricaOceaniaMonuments.ts", "w", encoding="utf-8") as f:
    f.write("import { WorldMonumentOrArtifact } from '../../types';\n\n")
    f.write("export const AMERICAS_AFRICA_OCEANIA_MONUMENTS: WorldMonumentOrArtifact[] = ")
    f.write(json.dumps(all_americas_africa_oceania, ensure_ascii=False, indent=2))
    f.write(";\n")

print(f"Successfully generated all {len(all_americas_africa_oceania)} Americas, Africa, and Oceania monuments in src/data/monuments/americasAfricaOceaniaMonuments.ts!")
