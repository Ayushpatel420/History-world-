import { HistoricalFact } from '../types';

export const HISTORICAL_FACTS: HistoricalFact[] = [
  {
    id: 'fact_mansa_musa_gold',
    title: 'The Wealth of Mansa Musa',
    headline: 'Mansa Musa Gave Away So Much Gold in Cairo That He Caused 12 Years of Severe Inflation',
    fact: 'During his legendary 1324 CE pilgrimage to Mecca, Emperor Mansa Musa of Mali distributed so much gold to the poor and Egyptian merchants in Cairo that he accidentally collapsed the regional value of gold, causing economic disruption for over a decade.',
    explanation: 'Mansa Musa ruled the Mali Empire at its territorial and financial peak, controlling vast gold fields and salt trade networks across West Africa. Traveling with a caravan of 60,000 men and dozens of camels carrying pure gold bullion, his lavish generosity in Cairo, Medina, and Mecca flooded local markets with gold. This sudden surge in liquidity depressed gold prices across the entire Mediterranean basin. To stabilize the economy on his return trip, he personally borrowed gold back from Egyptian lenders at exorbitant interest rates—making him the only person in history known to single-handedly control the price of gold in the Mediterranean.',
    era: 'Medieval',
    category: 'Monarchs & Rulers',
    cultureRegion: 'African',
    notableFigure: 'Mansa Musa',
    yearOrPeriod: '1324 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Catalan_Atlas_Mansa_Musa.jpg/800px-Catalan_Atlas_Mansa_Musa.jpg',
    tags: ['Mali Empire', 'Gold Standard', 'West Africa', 'Economics', 'Pilgrimage'],
    quote: {
      text: 'Mali is a vast kingdom... Its ruler is the greatest of Muslim kings and the richest man in the world.',
      author: 'Ibn Battuta, 14th Century Traveler'
    },
    funFactExtra: 'Mapmakers in Europe were so astonished by accounts of his wealth that the 1375 Catalan Atlas depicted Mansa Musa sitting on a throne holding a giant golden orb.',
    links: [
      {
        label: 'Explore African Monarchs in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'kings',
        entityId: 'mansa_musa',
        type: 'ruler'
      },
      {
        label: 'View Mali Empire in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'mali_empire',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_hypatia_astrolabe',
    title: 'Hypatia & The Ancient Sky Computer',
    headline: 'Hypatia of Alexandria Refined the Astrolabe 1,000 Years Before the European Renaissance',
    fact: 'Hypatia of Alexandria (c. 360–415 CE), a master mathematician, astronomer, and head of the Neoplatonic school, designed and built advanced astrolabes—metal analog devices used to calculate celestial coordinates and navigate across continents.',
    explanation: 'Operating at the Museum and Library of Alexandria, Hypatia was revered across the Mediterranean for her lectures on geometry, algebra, and planetary motions. Working alongside her father Theon, she edited Ptolemy’s astronomical treatises and constructed mechanical astrolabes—two-dimensional models of the night sky that allowed sailors and astronomers to determine time, latitude, and planet positions. Her tragic death in 415 CE marked a pivotal decline in Alexandrian classical scholarship, but her mathematical revisions survived through Islamic scholars in Baghdad.',
    era: 'Classical',
    category: 'Science & Invention',
    cultureRegion: 'Greco-Roman',
    notableFigure: 'Hypatia of Alexandria',
    yearOrPeriod: 'c. 400 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Astrolabe-Persian-18C.jpg/800px-Astrolabe-Persian-18C.jpg',
    tags: ['Alexandria', 'Astronomy', 'Mathematician', 'Ancient Science', 'Neoplatonism'],
    quote: {
      text: 'Reserve your right to think, for even to think wrongly is better than not to think at all.',
      author: 'Hypatia of Alexandria'
    },
    funFactExtra: 'The astrolabe she helped perfect became known as the "medieval computer" and remained the primary navigational tool until the invention of the sextant in the 18th century.',
    links: [
      {
        label: 'Read Hypatia’s Biography in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'leaders',
        entityId: 'hypatia',
        type: 'figure'
      },
      {
        label: 'Explore Greek Philosophers in Philosopher Grove',
        targetTab: 'philosophers',
        entityId: 'socrates',
        type: 'philosopher'
      }
    ]
  },
  {
    id: 'fact_harappan_sanitation',
    title: 'Harappan Indoor Plumbing 4,000 Years Ago',
    headline: 'Ancient Indus Valley Citizens Enjoyed Covered Sewage Grids & Flush Toilets in 2500 BCE',
    fact: 'Over 4,500 years ago, houses in the Indus Valley cities of Mohenjo-daro and Harappa featured private brick bathrooms, indoor vertical drainage chutes, and covered street sewer mains—a level of municipal sanitation unparalleled until 19th-century Europe.',
    explanation: 'Unlike contemporary civilizations in Mesopotamia or Egypt that spent immense capital building royal tombs and warrior monuments, the Indus Valley civilization prioritized urban welfare and public hygiene. Every household was connected to a citywide terracotta sewer network laid beneath paved streets, equipped with inspection sumps for filter clearing. Water was drawn from hundreds of engineered brick wells, and waste was safely diverted outside city walls into agricultural drainage fields.',
    era: 'Ancient',
    category: 'Architecture & Wonders',
    cultureRegion: 'South Asian',
    yearOrPeriod: 'c. 2600–1900 BCE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mohenjodaro_Sindh.jpeg/800px-Mohenjodaro_Sindh.jpeg',
    tags: ['Indus Valley', 'Mohenjo-daro', 'Engineering', 'Sanitation', 'Urban Planning'],
    funFactExtra: 'Standardized baked clay bricks used across thousands of miles in the Indus Valley were made with exact mathematical ratios (1:2:4) regardless of which city produced them.',
    links: [
      {
        label: 'View Indus Valley in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'indus_valley',
        type: 'article'
      },
      {
        label: 'Explore India on Mapped Empires',
        targetTab: 'map',
        entityId: 'india',
        type: 'country'
      }
    ]
  },
  {
    id: 'fact_maya_venus_calendar',
    title: 'The Precision of Maya Astronomy',
    headline: 'Maya Astronomers Calculated Venus Synodic Cycles Within 0.08 Days Per Century Without Telescopes',
    fact: 'Using naked-eye horizon sightings and intricate mathematical grids, Maya priests in Guatemala and Yucatan mapped the 584-day cycle of the planet Venus with astonishing astronomical accuracy.',
    explanation: 'To the Maya, Venus (*Noh Ek*, the Great Star) was associated with warfare, agriculture, and divine sovereign rituals. In the Dresden Codex—a surviving Maya bark-paper book—astronomers recorded multi-century Venus tables that incorporated corrective leap adjustments. Step observatories like *El Caracol* at Chichen Itza had stone window slits precisely aligned to Venus’s extreme northern and southern horizon risings, allowing farmers to align maize planting with seasonal rains.',
    era: 'Classical',
    category: 'Science & Invention',
    cultureRegion: 'Mesoamerican & South American',
    yearOrPeriod: 'c. 250–900 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Chichen_Itza_El_Caracol.jpg/800px-Chichen_Itza_El_Caracol.jpg',
    tags: ['Maya', 'Astronomy', 'Calendar', 'Venus', 'Mesoamerica'],
    funFactExtra: 'The Maya calculated the duration of a solar year as 365.2420 days—more accurate than the Julian calendar used in Europe at the time.',
    links: [
      {
        label: 'View Classic Maya in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'mayan_classic',
        type: 'article'
      },
      {
        label: 'Examine Maya Artifacts in Relic Gallery',
        targetTab: 'artifacts',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_eratosthenes_earth_circumference',
    title: 'Measuring Planet Earth with a Stick',
    headline: 'Eratosthenes Proved Earth Was Round & Calculated Its Circumference in 240 BCE Using Shadows',
    fact: 'By comparing midday shadow angles in Alexandria and Syene (modern Aswan) on the summer solstice, Greek scholar Eratosthenes calculated Earth’s circumference to within 1% to 5% of its actual polar measurement.',
    explanation: 'Eratosthenes, chief librarian of the Library of Alexandria, knew that at noon on the solstice in Syene, the sun shone directly down a deep well without casting a shadow. On the same day in Alexandria, 800 kilometers north, a vertical rod cast a shadow at an angle of roughly 7.2 degrees (1/50th of a full circle). Reasoning that the sun’s rays were parallel, he multiplied the distance between the two cities by 50 to estimate Earth’s circumference at roughly 40,000 kilometers—1,700 years before Columbus sailed!',
    era: 'Classical',
    category: 'Science & Invention',
    cultureRegion: 'Greco-Roman',
    notableFigure: 'Eratosthenes',
    yearOrPeriod: 'c. 240 BCE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Eratosthene.jpg/800px-Eratosthene.jpg',
    tags: ['Eratosthenes', 'Alexandria', 'Geometry', 'Astronomy', 'Geography'],
    quote: {
      text: 'Geography is a science that bridges mathematics, nature, and the history of human travel.',
      author: 'Eratosthenes'
    },
    funFactExtra: 'Eratosthenes also invented the "Sieve of Eratosthenes"—the foundational prime-number algorithm still taught in computer science classes today.',
    links: [
      {
        label: 'View Eratosthenes in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'leaders',
        entityId: 'eratosthenes',
        type: 'figure'
      },
      {
        label: 'Explore Classical Greece on Mapped Empires',
        targetTab: 'map',
        entityId: 'greece',
        type: 'country'
      }
    ]
  },
  {
    id: 'fact_house_of_wisdom_algebra',
    title: 'Baghdad’s House of Wisdom & Algebra',
    headline: 'In 9th-Century Baghdad, Al-Khwarizmi Invented Algebra and Introduced Decimal Digits to the West',
    fact: 'The 9th-century Persian polymath Muhammad ibn Musa al-Khwarizmi, working at Baghdad’s Grand House of Wisdom (*Bayt al-Hikmah*), wrote the foundational textbook on solving linear and quadratic equations, giving us the word "Algebra" and "Algorithm."',
    explanation: 'During the Islamic Golden Age, Caliph Al-Ma’mun funded the House of Wisdom as a global center for translating Greek, Sanskrit, and Syriac texts. Al-Khwarizmi’s book *Al-Kitāb al-mukhtaṣar fī ḥisāb al-jabr wa’l-muqābala* ("The Compendious Book on Calculation by Completion and Balancing") introduced systematic algebraic solutions for inheritances, land surveying, and trade. His Latinized name (*Algoritmi*) became the origin of the modern word "algorithm."',
    era: 'Medieval',
    category: 'Science & Invention',
    cultureRegion: 'Middle Eastern',
    notableFigure: 'Al-Khwarizmi',
    yearOrPeriod: 'c. 820 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Al-Khwarizmi_portrait.jpg/800px-Al-Khwarizmi_portrait.jpg',
    tags: ['Baghdad', 'Algebra', 'Islamic Golden Age', 'Mathematics', 'House of Wisdom'],
    funFactExtra: 'The numerals 0–9 used globally today are known in mathematics as "Hindu-Arabic numerals" because Al-Khwarizmi adapted Indian positional notation and popularized it worldwide.',
    links: [
      {
        label: 'View Al-Khwarizmi in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'leaders',
        entityId: 'alkhwarizmi',
        type: 'figure'
      },
      {
        label: 'Explore Islamic Golden Age in Vaults',
        targetTab: 'vaults',
        entityId: 'iraq',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_oxford_older_than_aztecs',
    title: 'Oxford University vs. The Aztec Empire',
    headline: 'Oxford University Started Teaching Students Over 200 Years Before the Aztec Empire Was Founded',
    fact: 'Continuous teaching at the University of Oxford is documented as early as 1096 CE, making it older than the Aztec Empire (founded in 1325 CE with the settlement of Tenochtitlan) and Notre-Dame Cathedral in Paris.',
    explanation: 'While western popular history often categorizes the Aztec civilization as ancient, Tenochtitlan (modern Mexico City) was established on a swampy island in Lake Texcoco in 1325 CE—over two centuries after English scholars were debating theology and Latin at Oxford. By the time Hernán Cortés arrived in 1519 CE, the Aztec Triple Alliance was less than 100 years old, whereas Oxford was already a 400-year-old venerable academic institution.',
    era: 'Medieval',
    category: 'Culture & Society',
    cultureRegion: 'European',
    yearOrPeriod: '1096 vs 1325 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Radcliffe_Camera%2C_Oxford_-_Oct_2006.jpg/800px-Radcliffe_Camera%2C_Oxford_-_Oct_2006.jpg',
    tags: ['Oxford', 'Aztec Empire', 'Chronology', 'Medieval History', 'Tenochtitlan'],
    funFactExtra: 'The Aztec Empire was younger than the invention of mechanical clocks and eyeglasses in Europe.',
    links: [
      {
        label: 'View Aztec Empire in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'aztec_empire',
        type: 'article'
      },
      {
        label: 'See Timeline of Medieval Milestones',
        targetTab: 'timeline',
        type: 'event'
      }
    ]
  },
  {
    id: 'fact_ashoka_veterinary_hospitals',
    title: 'Ashoka’s Moral Edicts & Animal Welfare',
    headline: 'Emperor Ashoka Established the World’s First Recorded Veterinary Hospitals in 260 BCE',
    fact: 'After renouncing military conquest following the bloody Kalinga War, Mauryan Emperor Ashoka carved moral edicts on stone pillars across India, legally outlawing animal cruelty and building public hospitals for both humans and animals.',
    explanation: 'Ashoka the Great transformed his empire into an early welfare state grounded in Buddhist *Dharma*. He appointed official inspectors of public morality (*Dhamma-mahamatras*), ordered trees and wells planted every half-league along trade highways, and mandated state-funded botanical gardens to cultivate medicinal herbs for treating sick animals and citizens.',
    era: 'Ancient',
    category: 'Philosophy & Ideas',
    cultureRegion: 'South Asian',
    notableFigure: 'Ashoka the Great',
    yearOrPeriod: 'c. 260 BCE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Sarnath_Lion_Capital_of_Ashoka.jpg/800px-Sarnath_Lion_Capital_of_Ashoka.jpg',
    tags: ['Ashoka', 'Maurya Dynasty', 'Human Rights', 'Buddhism', 'Animal Welfare'],
    quote: {
      text: 'All men are my children. What I desire for my own children... I desire for all men.',
      author: 'Edicts of Ashoka, Rock Edict VI'
    },
    funFactExtra: 'Ashoka’s Lion Capital, sculpted on top of his pillar at Sarnath, is the national emblem of modern India today.',
    links: [
      {
        label: 'Read Ashoka’s Biography in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'kings',
        entityId: 'ashoka_great',
        type: 'ruler'
      },
      {
        label: 'Explore Ancient India on Mapped Empires',
        targetTab: 'map',
        entityId: 'india',
        type: 'country'
      }
    ]
  },
  {
    id: 'fact_incan_quipu_code',
    title: 'The Incan Knotted String Code',
    headline: 'The Inca Managed a 2,500-Mile Mountain Empire Without Writing using Knotted String Quipus',
    fact: 'The Inca Empire (*Tawantinsuyu*) administered 12 million subjects across the rugged Andes using *Quipus*—intricate systems of spun llama wool strings where knot types, positions, and colors encoded censuses, taxes, and historical accounts.',
    explanation: 'Without a phonetic writing alphabet or iron tools, the Inca constructed paved road networks spanning the Andes. Specially trained accountants called *Quipucamayocs* compiled census data, military supply storehouse inventories, and agricultural tax yields on portable quipus. Recent cryptographic studies suggest that quipus contained not only base-10 numerical data, but also non-numerical narrative codes and historical genealogies.',
    era: 'Medieval',
    category: 'Culture & Society',
    cultureRegion: 'Mesoamerican & South American',
    yearOrPeriod: 'c. 1400–1532 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Inca_quipu.jpg/800px-Inca_quipu.jpg',
    tags: ['Inca', 'Andes', 'Quipu', 'Data Storage', 'South America'],
    funFactExtra: 'Runners called *Chasquis* carried quipus along stone mountain trails in relay shifts, transmitting official imperial messages over 240 kilometers a day.',
    links: [
      {
        label: 'View Inca Empire in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'incan_empire',
        type: 'article'
      },
      {
        label: 'Examine Quipu Relics in Gallery',
        targetTab: 'artifacts',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_cyrus_cylinder_human_rights',
    title: 'Cyrus the Great & The First Human Rights Charter',
    headline: 'In 539 BCE, Cyrus the Great Liberated Enslaved Babylonians & Guaranteed Freedom of Religion',
    fact: 'Upon conquering Babylon in 539 BCE, Persian Emperor Cyrus the Great issued a clay barrel inscription—the Cyrus Cylinder—declaring religious freedom, returning displaced refugees, and outlawing forced labor across his multi-ethnic empire.',
    explanation: 'Unlike ancient conquerors who typically razed captured capitals, Cyrus presented himself as a liberator. He allowed the Jewish people exiled in Babylon to return to Jerusalem and rebuild Solomon’s Temple, while ordering the restoration of local shrines. The Cyrus Cylinder, written in Akkadian cuneiform, is recognized by the United Nations as one of humanity’s earliest declarations of human rights.',
    era: 'Ancient',
    category: 'Monarchs & Rulers',
    cultureRegion: 'Middle Eastern',
    notableFigure: 'Cyrus the Great',
    yearOrPeriod: '539 BCE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Cyrus_Cylinder_front.jpg/800px-Cyrus_Cylinder_front.jpg',
    tags: ['Persia', 'Cyrus Cylinder', 'Human Rights', 'Babylon', 'Achaemenid'],
    quote: {
      text: 'I am Cyrus, king of the world, great king, mighty king... I gathered all their people and returned them to their habitations.',
      author: 'Cyrus Cylinder Inscription'
    },
    funFactExtra: 'Thomas Jefferson owned two copies of Xenophon’s biography of Cyrus the Great and used Cyrus’s religious tolerance as an inspiration when drafting the US Declaration of Independence.',
    links: [
      {
        label: 'View Cyrus the Great in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'kings',
        entityId: 'cyrus_great',
        type: 'ruler'
      },
      {
        label: 'Explore Achaemenid Empire in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'persian_achaemenid',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_ada_lovelace_first_program',
    title: 'Ada Lovelace: First Computer Programmer',
    headline: 'Ada Lovelace Wrote the World’s First Computer Algorithm in 1843 for a Mechanical Engine',
    fact: 'In 1843, mathematician Ada Lovelace published an algorithm for Charles Babbage’s mechanical Analytical Engine to calculate Bernoulli numbers, making her the world’s very first computer programmer over a century before electronic computers existed.',
    explanation: 'Ada Lovelace, the daughter of poet Lord Byron, possessed a brilliant vision for computing that surpassed Babbage himself. While Babbage viewed his machine as a simple calculator for numbers, Lovelace realized that if a machine could manipulate symbols, it could compose music, process graphics, and solve complex mathematical algorithms. Her notes contained the first published computer program and introduced concepts like looping algorithms and data variables.',
    era: 'Modern',
    category: 'Science & Invention',
    cultureRegion: 'European',
    notableFigure: 'Ada Lovelace',
    yearOrPeriod: '1843 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg',
    tags: ['Ada Lovelace', 'Computer Science', 'Algorithm', 'Analytical Engine', 'Pioneer'],
    quote: {
      text: 'The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves.',
      author: 'Ada Lovelace, 1843'
    },
    funFactExtra: 'In 1980, the United States Department of Defense named its new high-level computer programming language "Ada" in her honor.',
    links: [
      {
        label: 'View Ada Lovelace in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'leaders',
        entityId: 'ada_lovelace',
        type: 'figure'
      },
      {
        label: 'Explore Modern Inventions in Timeline',
        targetTab: 'timeline',
        type: 'event'
      }
    ]
  },
  {
    id: 'fact_wu_zetian_female_emperor',
    title: 'Wu Zetian: China’s Sole Female Emperor',
    headline: 'Empress Wu Zetian Founded Her Own Dynasty & Expanded China’s Silk Road Hegemony',
    fact: 'Wu Zetian (624–705 CE) was the only female sovereign in 3,000 years of Chinese history to rule in her own right, declaring the Zhou Dynasty and elevating talent over noble birth through rigorous civil service exams.',
    explanation: 'Rising from an imperial concubine to Empress Consort and finally Emperor (*Huangdi*), Wu Zetian governed China with remarkable political shrewdness. She expanded China’s borders deep into Central Asia along the Silk Road, sponsored agricultural treatises, and elevated Buddhism to state religion. To bypass patriarchal Confucian opposition, she commissioned scholar guilds to author female leadership treatises and created new Chinese characters.',
    era: 'Medieval',
    category: 'Monarchs & Rulers',
    cultureRegion: 'East Asian',
    notableFigure: 'Wu Zetian',
    yearOrPeriod: '690–705 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Wu_Zetian2.jpg/800px-Wu_Zetian2.jpg',
    tags: ['Tang Dynasty', 'China', 'Wu Zetian', 'Silk Road', 'Female Leader'],
    funFactExtra: 'Her tomb monument at the Qianling Mausoleum features a famous "Uncharactered Stele"—a giant blank stone slab left intentionally without inscription so future generations could judge her legacy for themselves.',
    links: [
      {
        label: 'View Wu Zetian in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'kings',
        entityId: 'wu_zetian',
        type: 'ruler'
      },
      {
        label: 'Explore China on Mapped Empires',
        targetTab: 'map',
        entityId: 'china',
        type: 'country'
      }
    ]
  },
  {
    id: 'fact_aksum_gold_standard',
    title: 'The Kingdom of Aksum’s International Gold Currency',
    headline: 'Aksum Was Ranked One of the Four Great World Powers of the 3rd Century Alongside Rome and Persia',
    fact: 'The Horn of Africa’s Kingdom of Aksum (modern Ethiopia and Eritrea) issued its own standardized gold, silver, and bronze coinage minted with Greek and Ge’ez inscriptions, controlling Red Sea trade between the Roman Empire and India.',
    explanation: 'Prospering from the 1st to 8th centuries CE, Aksum operated as an international trade metropolis. Mani, the 3rd-century Persian philosopher, listed Aksum as one of the world’s four great super-states alongside Rome, Persia, and China. In the 4th century under King Ezana, Aksum became one of the first empires in the world to officially adopt Christianity, erecting towering monolithic stone stelae carved from single granite blocks.',
    era: 'Classical',
    category: 'Architecture & Wonders',
    cultureRegion: 'African',
    yearOrPeriod: 'c. 100–800 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Axum_coin_Endubis.jpg/800px-Axum_coin_Endubis.jpg',
    tags: ['Aksum', 'Ethiopia', 'Red Sea Trade', 'Obelisks', 'Gold Currency'],
    funFactExtra: 'Aksum’s Stela of King Ezana stands over 79 feet high and weighs 160 metric tons—carved out of solid stone without mortar.',
    links: [
      {
        label: 'View Kingdom of Aksum in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'aksum_kingdom',
        type: 'article'
      },
      {
        label: 'Explore Africa in Vaults',
        targetTab: 'vaults',
        entityId: 'ethiopia',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_rosetta_stone_decipherment',
    title: 'The Rosetta Stone & Three Ancient Scripts',
    headline: 'A Single 1,600 lb Granodiorite Slab Unlocked 3,000 Years of Hidden Egyptian History',
    fact: 'Discovered in 1799 by French soldiers in Rosetta, Egypt, the Rosetta Stone contained the same royal decree written in Egyptian Hieroglyphs, Demotic script, and Ancient Greek, allowing Jean-François Champollion to decipher hieroglyphics in 1822.',
    explanation: 'For over 1,400 years after the fall of pagan temples in Roman Egypt, the ability to read hieroglyphics was lost to humanity. Because classical scholars could read Ancient Greek, the Rosetta Stone provided a trilingual Rosetta key. Champollion realized that hieroglyphs were not merely symbolic pictograms, but a phonetic alphabet spelling out royal names like *Ptolemy* and *Cleopatra*.',
    era: 'Early Modern',
    category: 'Curiosities & Myths',
    cultureRegion: 'African',
    yearOrPeriod: '1799 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/800px-Rosetta_Stone.JPG',
    tags: ['Rosetta Stone', 'Hieroglyphs', 'Champollion', 'Egyptology', 'Decipherment'],
    funFactExtra: 'The decree on the Rosetta Stone was actually a mundane tax-exemption announcement issued by 13-year-old King Ptolemy V in 196 BCE.',
    links: [
      {
        label: 'Examine Rosetta Relic in 360° Studio',
        targetTab: 'artifacts',
        entityId: 'rosetta-stone',
        type: 'article'
      },
      {
        label: 'View Egypt Country Vault',
        targetTab: 'vaults',
        entityId: 'egypt',
        type: 'country'
      }
    ]
  },
  {
    id: 'fact_emu_war_australia',
    title: 'The Great Emu War of 1932',
    headline: 'The Australian Military Deployed Heavy Machine Guns Against 20,000 Emus—and Lost',
    fact: 'In 1932, the Australian government dispatched military soldiers armed with Lewis machine guns to Western Australia to stop 20,000 crop-destroying emus—only for the agile, flightless birds to outmaneuver army vehicles.',
    explanation: 'Following WWI, ex-soldiers given farmland in Western Australia faced a massive invasion of 20,000 migrating emus destroying wheat fields. Major G.P.W. Meredith led soldiers with two heavy machine guns and 10,000 rounds of ammunition. However, the emus split into small swift units, running up to 30 mph across rough terrain. Machine guns jammed, vehicles broke down, and after a month of futile efforts, the military officially withdrew, leaving the emus victorious.',
    era: 'Modern',
    category: 'Curiosities & Myths',
    cultureRegion: 'Americas',
    yearOrPeriod: '1932 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Dromaius_novaehollandiae_-_wild.jpg/800px-Dromaius_novaehollandiae_-_wild.jpg',
    tags: ['Emu War', 'Australia', 'Odd History', 'Military History', '1930s'],
    funFactExtra: 'Ordnance commander Major Meredith remarked: "If we had a military division with the bullet-carrying capacity of these birds it would face any army in the world. They can face machine guns with the invulnerability of tanks."',
    links: [
      {
        label: 'Explore Modern Events in Timeline',
        targetTab: 'timeline',
        type: 'event'
      },
      {
        label: 'Test Knowledge on Coliseum Quizzes',
        targetTab: 'quizzes',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_viking_sunstones',
    title: 'Viking Sunstones & Fog Navigation',
    headline: 'Viking Navigators Used Optical Calcite Crystals to Locate the Sun Through Dense Arctic Fog',
    fact: 'Norse mariners crossed thousands of miles of open Atlantic ocean to Iceland, Greenland, and North America without magnetic compasses by using "sunstones" (calcite spar crystals) to polarize sunlight through heavy cloud cover.',
    explanation: 'When navigating arctic waters where fog or snow completely obscured the sun, magnetic compasses had not yet reached Western Europe. Icelandic sagas reference *Sólarsteinn* (sunstone). Calcite crystals split incoming light into two beams with different polarization angles. By rotating the crystal until both beams matched in brightness, mariners could identify the exact position of the hidden sun within a couple of degrees.',
    era: 'Medieval',
    category: 'Science & Invention',
    cultureRegion: 'European',
    yearOrPeriod: 'c. 900–1100 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Iceland_spar_calcite.jpg/800px-Iceland_spar_calcite.jpg',
    tags: ['Vikings', 'Sunstone', 'Navigation', 'Arctic', 'Optics'],
    funFactExtra: 'In 2013, archaeologists discovered a sunstone in the wreck of an Elizabethan ship that sank in 1592 off the Channel Islands, showing the tool remained in use long after the Viking Age.',
    links: [
      {
        label: 'Explore Viking Expansion in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'viking_age',
        type: 'article'
      },
      {
        label: 'View Wonders & Artifacts',
        targetTab: 'monuments',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_margaret_hamilton_apollo',
    title: 'Margaret Hamilton & Apollo 11 Code',
    headline: 'Margaret Hamilton Hand-Wrote the Code That Saved Apollo 11 From a Moon Landing Crash',
    fact: 'Software engineering pioneer Margaret Hamilton led the MIT team that developed the Apollo onboard flight software. Her asynchronous executive software prevented the Apollo 11 Lunar Module from crashing during radar overload minutes before touchdown.',
    explanation: 'As Neil Armstrong and Buzz Aldrin descended toward the lunar surface in July 1969, computer alarms (1201 and 1202) began flashing. The lunar module radar was overloading the computer with unnecessary calculations. However, Hamilton had programmed the software with priority task scheduling. The computer automatically recognized the overload, dropped low-priority radar tasks, and focused all computing power on thrusters and landing navigation—enabling a successful landing.',
    era: 'Contemporary',
    category: 'Science & Invention',
    cultureRegion: 'Global & Space',
    notableFigure: 'Margaret Hamilton',
    yearOrPeriod: '1969 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Margaret_Hamilton_-_restoration.jpg/800px-Margaret_Hamilton_-_restoration.jpg',
    tags: ['NASA', 'Apollo 11', 'Software Engineering', 'Space Race', 'Margaret Hamilton'],
    quote: {
      text: 'There was no choice but to be pioneers. There was no school to attend to learn software engineering.',
      author: 'Margaret Hamilton'
    },
    funFactExtra: 'Hamilton coined the term "software engineering" to gain academic recognition for computer science as a legitimate engineering discipline alongside electrical and mechanical engineering.',
    links: [
      {
        label: 'View Contemporary Inventions in Timeline',
        targetTab: 'timeline',
        type: 'event'
      },
      {
        label: 'Challenge Scholar AI on Space Race History',
        targetTab: 'scholar',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_derinkuyu_underground_city',
    title: 'The Underground City of Derinkuyu',
    headline: 'An 18-Story Underground Subterranean City Sheltered 20,000 Refugees in Cappadocia',
    fact: 'Carved deep into volcanic tufa rock in Cappadocia, Turkey, the underground city of Derinkuyu extends 85 meters (280 feet) below ground with 18 levels equipped with schools, wine presses, stables, and chapels for 20,000 inhabitants.',
    explanation: 'Dating back to Phrygian times and heavily expanded during the Byzantine-Arab wars of the 8th–12th centuries, Derinkuyu offered ultimate defense against invading armies. The subterranean network could be sealed from the inside with massive 1,000-pound rolling stone doors. Ventilation shafts brought fresh air down 80 meters, while underground wells provided pure water isolated from surface poison threats.',
    era: 'Medieval',
    category: 'Architecture & Wonders',
    cultureRegion: 'Middle Eastern',
    yearOrPeriod: 'c. 800 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Derinkuyu_underground_city_3.jpg/800px-Derinkuyu_underground_city_3.jpg',
    tags: ['Derinkuyu', 'Cappadocia', 'Underground City', 'Byzantine', 'Architecture'],
    funFactExtra: 'Derinkuyu was rediscovered by accident in 1963 when a local resident knocked down a wall in his basement while renovating his house and found a hidden tunnel leading into the subterranean city.',
    links: [
      {
        label: 'Explore Turkey on Mapped Empires',
        targetTab: 'map',
        entityId: 'turkey',
        type: 'country'
      },
      {
        label: 'Examine Byzantine Relics in Gallery',
        targetTab: 'monuments',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_fire_ships_spanish_armada',
    title: 'Hellburners & The Spanish Armada',
    headline: 'England Defeated the Supposedly Invincible Spanish Armada Using Flaming Pitch Ships in 1588',
    fact: 'In 1588, Queen Elizabeth I’s navy broke the formation of King Philip II’s 130-ship Spanish Armada off Calais by launching eight flaming ghost ships packed with gunpowder and pitch directly into the anchored fleet.',
    explanation: 'The Spanish Armada was anchored in crescent formation waiting to transport 30,000 Spanish soldiers across the English Channel. Panic struck when English sailors ignited old transport ships loaded with explosives (*fire ships* or *hellburners*) and drifted them on the tide into the fleet. Fearing catastrophic explosions, Spanish captains severed anchor cables and scattered into open sea, where maneuverable English long-guns and severe Atlantic storms destroyed half the fleet.',
    era: 'Renaissance',
    category: 'Warfare & Tactics',
    cultureRegion: 'European',
    notableFigure: 'Queen Elizabeth I',
    yearOrPeriod: '1588 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Defeat_of_the_Spanish_Armada_1588.jpg/800px-Defeat_of_the_Spanish_Armada_1588.jpg',
    tags: ['Spanish Armada', 'Elizabeth I', 'Naval Battle', 'Fire Ships', 'Tudor'],
    quote: {
      text: 'I know I have the body of a weak and feeble woman; but I have the heart and stomach of a king, and of a king of England too.',
      author: 'Queen Elizabeth I, Speech to the Troops at Tilbury'
    },
    funFactExtra: 'Commemorative medals minted in England read "Flavit et Dissipati Sunt" ("God blew with His winds, and they were scattered").',
    links: [
      {
        label: 'View Elizabeth I in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'kings',
        entityId: 'elizabeth_i',
        type: 'ruler'
      },
      {
        label: 'Compare Tudor England vs Habsburg Spain',
        targetTab: 'compare',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_zheng_he_treasure_fleet',
    title: 'Zheng He’s Colossal Ming Treasure Fleet',
    headline: 'Ming Dynasty Admiral Zheng He Sailed 400-Foot Wooden Treasure Ships Decades Before Columbus',
    fact: 'Between 1405 and 1433 CE, Ming Admiral Zheng He commanded seven maritime expeditions across the Indian Ocean to East Africa with "Treasure Ships" (*Baochuan*) up to 400 feet long with nine masts—four times larger than Columbus’s Santa Maria.',
    explanation: 'Appointed by Ming Emperor Yongle, Zheng He led armadas of 250 vessels carrying 28,000 sailors, scholars, physicians, and astronomers. The fleet traded Chinese silk and porcelain for African giraffes, Arabian horses, and ivory across 30 nations in Southeast Asia, India, Persia, and East Africa. The voyages established Chinese maritime prestige long before European maritime expansion began.',
    era: 'Renaissance',
    category: 'Culture & Society',
    cultureRegion: 'East Asian',
    notableFigure: 'Zheng He',
    yearOrPeriod: '1405–1433 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Zheng_He_ship_comparison.png/800px-Zheng_He_ship_comparison.png',
    tags: ['Zheng He', 'Ming Dynasty', 'Treasure Fleet', 'Indian Ocean', 'Exploration'],
    funFactExtra: 'Zheng He brought a live giraffe back from Malindi, Kenya to the Ming imperial court in Beijing, where scholars marveled at it as a sacred mythical *Qilin*.',
    links: [
      {
        label: 'View Zheng He in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'leaders',
        entityId: 'zheng_he',
        type: 'figure'
      },
      {
        label: 'View China Country Vault',
        targetTab: 'vaults',
        entityId: 'china',
        type: 'country'
      }
    ]
  },
  {
    id: 'fact_antikythera_mechanism',
    title: 'The Antikythera Mechanism: Ancient Analog Computer',
    headline: 'Ancient Greeks Built a 30-Gear Bronze Computer in 150 BCE to Predict Planetary Movements & Solar Eclipses',
    fact: 'Recovered from a Roman shipwreck off Greece in 1901, the Antikythera Mechanism contained over 30 precision interlocking bronze gearwheels capable of calculating the positions of the Sun, Moon phases, eclipse cycles, and Olympic Games dates.',
    explanation: 'Dating back to the 2nd century BCE, the device demonstrates an astonishing level of mechanical miniaturization and astronomical computation not seen again in Europe until medieval astronomical cathedral clocks 1,400 years later. CT scans revealed microscopic Greek inscriptions detailing operational instructions and celestial predictive cycles based on the Saros and Metonic periods.',
    era: 'Classical',
    category: 'Science & Invention',
    cultureRegion: 'Greco-Roman',
    yearOrPeriod: 'c. 150 BCE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg/800px-NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg',
    tags: ['Antikythera', 'Analog Computer', 'Ancient Greece', 'Astronomy', 'Clockwork'],
    funFactExtra: 'The device was so sophisticated that historians initially dismissed it as a modern astrolabe dropped accidentally by 18th-century divers until X-ray radiography confirmed its ancient origin.',
    links: [
      {
        label: 'Explore Greek Inventions in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'ancient_greece',
        type: 'article'
      },
      {
        label: 'View Greece on Mapped Empires',
        targetTab: 'map',
        entityId: 'greece',
        type: 'country'
      }
    ]
  },
  {
    id: 'fact_terracotta_army',
    title: 'The Secret Terracotta Army of Qin Shi Huang',
    headline: '8,000 Life-Sized Terracotta Soldiers With Unique Facial Features Stood Buried for 2,200 Years',
    fact: 'Emperor Qin Shi Huang was buried in 210 BCE with an underground army of 8,000 individualized terracotta warriors, 130 chariots, and 670 horses, armed with real bronze swords coated in chromium salt that remained razor-sharp for millennia.',
    explanation: 'Discovered in 1974 by local farmers digging a water well near Xi’an, Shaanxi province, the Terracotta Army was built by over 700,000 conscripts to protect the first Emperor of unified China in the afterlife. Modern forensic analysis indicates that no two facial expressions, ears, or hairstyles are identical, suggesting sculptors modeled them after real imperial guards.',
    era: 'Ancient',
    category: 'Architecture & Wonders',
    cultureRegion: 'East Asian',
    notableFigure: 'Qin Shi Huang',
    yearOrPeriod: '210 BCE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Terracotta_Army_Pit_1_2011.jpg/800px-Terracotta_Army_Pit_1_2011.jpg',
    tags: ['Qin Dynasty', 'Terracotta Army', 'Xi’an', 'First Emperor', 'Ancient China'],
    funFactExtra: 'The central burial mound of Qin Shi Huang himself has never been excavated because historical chronicles claim it contains rivers of liquid mercury flowing into miniature seas.',
    links: [
      {
        label: 'View Qin Dynasty in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'qin_dynasty',
        type: 'article'
      },
      {
        label: 'Explore China in Civilizations Map',
        targetTab: 'map',
        entityId: 'china',
        type: 'country'
      }
    ]
  },
  {
    id: 'fact_voynich_manuscript',
    title: 'The Unbreakable Cipher of Voynich',
    headline: 'A 600-Year-Old Illustrated Codified Book That Has Resisted the World’s Best Cryptographers',
    fact: 'The Voynich Manuscript, radiocarbon dated to the early 15th century, is an illustrated vellum codex written in an entirely unknown writing system and language that has defeated FBI cryptanalysts, Alan Turing-era codebreakers, and modern AI language models.',
    explanation: 'Discovered in 1912 by antique book dealer Wilfrid Voynich at a Jesuit college in Italy, the 240-page manuscript contains hundreds of vivid illustrations of imaginary botanical plants, zodiac astrological charts, and cosmological maps. Statistical linguistic tests confirm the text follows Zipf’s law of natural languages, ruling out a simple random hoax, yet its semantic meaning remains one of history’s greatest unsolved enigmas.',
    era: 'Medieval',
    category: 'Curiosities & Myths',
    cultureRegion: 'European',
    yearOrPeriod: 'c. 1404–1438 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Voynich_Manuscript_%28148%29.jpg/800px-Voynich_Manuscript_%28148%29.jpg',
    tags: ['Voynich Manuscript', 'Cryptography', 'Medieval Codex', 'Unsolved Mystery', 'Linguistics'],
    funFactExtra: 'The manuscript currently resides at Yale University’s Beinecke Rare Book & Manuscript Library under call number MS 408.',
    links: [
      {
        label: 'Explore Medieval Europe in Timeline',
        targetTab: 'timeline',
        type: 'event'
      },
      {
        label: 'View Primary Sources & Decrees',
        targetTab: 'decrees',
        type: 'article'
      }
    ]
  },
  {
    id: 'fact_library_of_alexandria',
    title: 'The Lost Scrolls of Alexandria’s Great Library',
    headline: 'The Ancient World’s Knowledge Repository Required Every Ship Entering the Harbor to Surrender Books for Copying',
    fact: 'Under Ptolemaic law in ancient Alexandria, every merchant ship entering Egypt’s harbor was boarded and searched by imperial inspectors who confiscated any scrolls, copied them with royal scribes, kept the originals, and returned copies to travelers.',
    explanation: 'Founded in the 3rd century BCE by Ptolemy I and II, the Library of Alexandria aimed to collect every written work in the known world. It amassed over 400,000 papyrus scrolls spanning mathematics, tragedy, medicine, geography, and philosophy. Contrary to popular legend that it burned in a single apocalyptic fire, its decline was gradual over several centuries due to political conflicts, budget cuts, and religious turmoil.',
    era: 'Classical',
    category: 'Culture & Society',
    cultureRegion: 'Greco-Roman',
    yearOrPeriod: 'c. 280 BCE – 391 CE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/The_Library_of_Alexandria_by_O._Von_Corven.jpg/800px-The_Library_of_Alexandria_by_O._Von_Corven.jpg',
    tags: ['Library of Alexandria', 'Ptolemaic Egypt', 'Ancient Scrolls', 'Scholarship', 'Philosophy'],
    funFactExtra: 'The library was organized by Callimachus using the Pinakes—the first comprehensive library cataloging system in human history.',
    links: [
      {
        label: 'View Ptolemaic Egypt in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'civilizations',
        entityId: 'ptolemaic_egypt',
        type: 'article'
      },
      {
        label: 'View Egypt on Mapped Empires',
        targetTab: 'map',
        entityId: 'egypt',
        type: 'country'
      }
    ]
  },
  {
    id: 'fact_archimedes_syracuse',
    title: 'Archimedes & The Defense of Syracuse',
    headline: 'Archimedes Defended His Island City Against the Roman Navy Using Giant Mechanical Cranes and Burning Mirrors',
    fact: 'During the Siege of Syracuse (213–212 BCE), legendary mathematician Archimedes constructed the "Claw of Archimedes"—massive ship-shaking cranes equipped with grappling hooks that hoisted Roman warships out of the sea and capsized them.',
    explanation: 'Roman general Marcus Claudius Marcellus attacked Syracuse with sixty quinquereme war galleys, but Archimedes turned the city walls into an automated defense battery. Using variable-range catapults, iron grappling claws operated by counterweights, and polished bronze solar reflectors, Archimedes terrified Roman legions to the point that Roman soldiers fled whenever a simple rope or pole appeared over the city walls.',
    era: 'Classical',
    category: 'Warfare & Tactics',
    cultureRegion: 'Greco-Roman',
    notableFigure: 'Archimedes',
    yearOrPeriod: '213 BCE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Domenico-Fetti_Archimedes_1620.jpg/800px-Domenico-Fetti_Archimedes_1620.jpg',
    tags: ['Archimedes', 'Syracuse', 'Roman Republic', 'Ancient Warfare', 'Inventions'],
    quote: {
      text: 'Give me a lever long enough and a fulcrum on which to place it, and I shall move the world.',
      author: 'Archimedes of Syracuse'
    },
    funFactExtra: 'When Roman soldiers eventually breached the city walls, a legionary killed Archimedes while he was drawing geometric circles in the sand, prompting his famous last words: "Do not disturb my circles!"',
    links: [
      {
        label: 'Explore Syracuse & Roman Battles in Battles Vault',
        targetTab: 'battles',
        type: 'article'
      },
      {
        label: 'View Ancient Greek Figures in Encyclopedia',
        targetTab: 'encyclopedia',
        subTab: 'leaders',
        type: 'figure'
      }
    ]
  }
];

/**
 * Deterministically retrieves the Historical Fact of the Day for a given Date.
 * Uses day-of-year calculation with leap year normalization so each day of the year
 * features a consistent, unique fact.
 */
export function getDailyFactForDate(date: Date): HistoricalFact {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diffTime = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diffTime / oneDay);
  
  // Hash with year offset so consecutive years rotate nicely
  const index = Math.abs((dayOfYear + date.getFullYear() * 7) % HISTORICAL_FACTS.length);
  return HISTORICAL_FACTS[index] || HISTORICAL_FACTS[0];
}
