import { Quiz } from '../types';

export const COMPREHENSIVE_QUIZZES: Quiz[] = [
  // ==========================================
  // 1. ANCIENT HISTORY
  // ==========================================
  {
    id: "ancient_mesopotamia_mcq",
    title: "🏛️ Mesopotamia: The Fertile Crescent & First Cities",
    description: "Journey to the valleys of the Tigris and Euphrates. Test your knowledge on Sumerian city-states, cuneiform tablets, and the Code of Hammurabi.",
    category: "Ancient History",
    topic: "ancient",
    subTopic: "Mesopotamia & Fertile Crescent",
    formatType: "mcq",
    difficulty: "Medium",
    questions: [
      {
        id: "am_q1",
        question: "Which ancient Sumerian city is widely regarded by historians as one of the world's earliest major urban centers, home to legendary Gilgamesh?",
        options: ["Uruk", "Babylon", "Nineveh", "Persepolis"],
        correctIndex: 0,
        explanation: "Uruk, located in southern Mesopotamia, flourished around 4000–3100 BCE and is renowned for its monumental ziggurat architecture and early cuneiform administration.",
        format: "mcq"
      },
      {
        id: "am_q2",
        question: "The famous legal principle 'an eye for an eye, a tooth for a tooth' (lex talionis) is famously inscribed upon which monumental stele?",
        options: ["The Rosetta Stone", "The Cyrus Cylinder", "The Code of Hammurabi", "The Behistun Inscription"],
        correctIndex: 2,
        explanation: "The Code of Hammurabi (c. 1750 BCE), composed under the sixth Babylonian king, contains 282 edicts carved into a black diorite stele discovered in Susa.",
        format: "mcq"
      },
      {
        id: "am_q3",
        question: "What raw material did Sumerian scribes use as the primary writing surface for cuneiform script?",
        options: ["Papyrus reed paper", "Soft clay tablets", "Animal vellum parchment", "Carved marble slabs"],
        correctIndex: 1,
        explanation: "Scribes pressed wedge-shaped reed styluses into moist clay tablets, which were then either sun-dried or baked in kilns for permanent record-keeping.",
        format: "mcq"
      },
      {
        id: "am_q4",
        question: "Which Neo-Babylonian king is credited with constructing the legendary Ishtar Gate and the Hanging Gardens of Babylon?",
        options: ["Sargon of Akkad", "Ashurbanipal", "Nebuchadnezzar II", "Tiglath-Pileser III"],
        correctIndex: 2,
        explanation: "Nebuchadnezzar II (reigned c. 605–562 BCE) revived Babylon into an architectural marvel, featuring vibrant lapis-glazed brick gates and the legendary Hanging Gardens.",
        format: "mcq"
      }
    ]
  },
  {
    id: "ancient_egypt_tf",
    title: "⚖️ Pharaohs & The Nile: True or False",
    description: "Distinguish authentic archaeological facts from popular cultural myths concerning Egyptian mummification, royal dynasties, and hieroglyphs.",
    category: "Ancient History",
    topic: "ancient",
    subTopic: "Ancient Egypt",
    formatType: "tf",
    difficulty: "Easy",
    questions: [
      {
        id: "ae_tf1",
        question: "The Great Pyramid of Giza was originally surfaced with highly polished white Tura limestone that gleamed brilliantly in the desert sun.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Built for Pharaoh Khufu around 2560 BCE, the Great Pyramid was once encased in smooth, polished white limestone casing stones, most of which were stripped off centuries later for building in Cairo.",
        format: "tf"
      },
      {
        id: "ae_tf2",
        question: "Cleopatra VII Philopator was of native ancient Egyptian ancestry and belonged to the Old Kingdom royal lineage.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! Cleopatra VII was ethnically Macedonian Greek, descending from Ptolemy I Soter, one of Alexander the Great's top generals who founded the Ptolemaic Dynasty in 305 BCE.",
        format: "tf"
      },
      {
        id: "ae_tf3",
        question: "King Tutankhamun's tomb was discovered practically intact in the Valley of the Kings by archaeologist Howard Carter in 1922.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! KV62, discovered in November 1922, yielded over 5,000 pristine royal artifacts including the world-famous golden death mask, providing unmatched insight into the New Kingdom.",
        format: "tf"
      },
      {
        id: "ae_tf4",
        question: "The ancient Egyptians believed the brain was the sacred center of human emotion and intellect, carefully preserving it in canopic jars.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! Ancient Egyptians believed the heart was the center of human intellect and soul (ib), while the brain was considered relatively unimportant and routinely liquefied and extracted during mummification.",
        format: "tf"
      }
    ]
  },
  {
    id: "ancient_rome_republic_mcq",
    title: "🦅 The Roman Republic to Empire: Senate, Legions & Caesars",
    description: "Analyze the constitutional tensions, civil wars, and administrative transformations from the expulsion of the Tarquins to Augustus.",
    category: "Ancient History",
    topic: "ancient",
    subTopic: "Classical Rome",
    formatType: "mcq",
    difficulty: "Medium",
    questions: [
      {
        id: "ar_q1",
        question: "Which river did Julius Caesar cross with the 13th Legion in 49 BCE, committing treason and uttering 'Alea iacta est' (The die is cast)?",
        options: ["The Tiber", "The Rubicon", "The Danube", "The Rhine"],
        correctIndex: 1,
        explanation: "Crossing the shallow Rubicon River—the boundary of his Cisalpine Gaul province—without disbanding his army was an explicit declaration of civil war against the Roman Senate.",
        format: "mcq"
      },
      {
        id: "ar_q2",
        question: "Who was officially granted the title 'Augustus' in 27 BCE, formally marking the birth of the Roman Principate and Empire?",
        options: ["Mark Antony", "Marcus Aurelius", "Octavian (Gaius Julius Caesar Octavianus)", "Tiberius"],
        correctIndex: 2,
        explanation: "Octavian, the grand-nephew and adopted heir of Julius Caesar, received the honorary title Augustus ('the revered one') from the Senate, initiating the two-century Pax Romana.",
        format: "mcq"
      },
      {
        id: "ar_q3",
        question: "Which Carthaginian military commander handed Rome its most catastrophic single-day military defeat at the Battle of Cannae in 216 BCE?",
        options: ["Hannibal Barca", "Hamilcar Barca", "Hasdrubal", "Syphax"],
        correctIndex: 0,
        explanation: "Hannibal deployed a double-envelopment tactic at Cannae, encircling and slaughtering approximately 50,000 to 70,000 Roman legionaries in a single afternoon.",
        format: "mcq"
      },
      {
        id: "ar_q4",
        question: "What architectural innovation allowed Roman engineers to span massive distances in aqueducts, basilicas, and the dome of the Pantheon?",
        options: ["Dry-stacked granite lintels", "Hydraulic volcanic pozzolana concrete and true arches", "Solid timber trusses", "Reinforced steel framing"],
        correctIndex: 1,
        explanation: "Roman concrete (opus caementicium), formulated with volcanic ash from Pozzuoli and lime, could set underwater and withstand seismic stress for millennia.",
        format: "mcq"
      }
    ]
  },
  {
    id: "ancient_greece_tf",
    title: "🏛️ Classical Greece: Myths vs. Historical Realities",
    description: "Evaluate your understanding of Athenian democracy, the Peloponnesian War, the Delphic Oracle, and Spartan martial culture.",
    category: "Ancient History",
    topic: "ancient",
    subTopic: "Ancient Greece",
    formatType: "tf",
    difficulty: "Medium",
    questions: [
      {
        id: "ag_tf1",
        question: "In classical Athenian democracy, all resident adults including women, enslaved persons, and foreign metics possessed voting rights in the Ecclesia.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! Athenian democracy was strictly limited to adult male citizens of Athenian parentage (approx. 10–20% of the total population). Women, slaves, and metics were entirely excluded from voting.",
        format: "tf"
      },
      {
        id: "ag_tf2",
        question: "Spartan society relied heavily on an subjugated peasant population called helots to cultivate crops while Spartan citizens focused exclusively on martial discipline.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! The helots of Messenia and Laconia outnumbered Spartan citizens significantly and performed all manual labor, allowing Spartiate males to train under the agoge system.",
        format: "tf"
      },
      {
        id: "ag_tf3",
        question: "The philosopher Socrates was executed in Athens in 399 BCE by being forced to drink an infusion containing toxic hemlock.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Socrates was convicted by an Athenian jury of 500 citizens on charges of impiety (asebeia) and corrupting the youth, accepting his death sentence with philosophical composure.",
        format: "tf"
      },
      {
        id: "ag_tf4",
        question: "The Olympic Games of antiquity permitted athletes from any Mediterranean civilization, regardless of whether they spoke Greek.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! Only free men of proven Greek ancestry who spoke Greek were permitted to participate in the ancient Panhellenic Olympic Games held in honor of Zeus.",
        format: "tf"
      }
    ]
  },

  // ==========================================
  // 2. MODERN HISTORY
  // ==========================================
  {
    id: "modern_revolutions_mcq",
    title: "⚡ Age of Revolutions: Liberty, Equality & Imperial Upheaval",
    description: "Explore the seismic political transformations that shook North America, France, and Saint-Domingue between 1775 and 1815.",
    category: "Modern History",
    topic: "modern",
    subTopic: "Age of Revolutions",
    formatType: "mcq",
    difficulty: "Medium",
    questions: [
      {
        id: "mr_q1",
        question: "Which revolutionary document, adopted on August 26, 1789 by the French National Constituent Assembly, proclaimed natural and inviolable human rights?",
        options: [
          "The Declaration of the Rights of Man and of the Citizen",
          "The Napoleonic Code",
          "The Edict of Nantes",
          "The Treaty of Utrecht"
        ],
        correctIndex: 0,
        explanation: "Influenced by Thomas Jefferson and the Marquis de Lafayette, the Declaration stated that all men are born free and remain equal in rights.",
        format: "mcq"
      },
      {
        id: "mr_q2",
        question: "Who was the brilliant formerly enslaved military leader that led Saint-Domingue (modern Haiti) toward independence against French, Spanish, and British forces?",
        options: ["Jean-Jacques Dessalines", "Toussaint Louverture", "Henri Christophe", "Alexandre Pétion"],
        correctIndex: 1,
        explanation: "Toussaint Louverture organized the Haitian Revolution, defeating European expeditions and transforming an island of enslaved laborers into the world's first free Black republic.",
        format: "mcq"
      },
      {
        id: "mr_q3",
        question: "Which battle in June 1815 sealed the final defeat of Napoleon Bonaparte against the Seventh Coalition commanded by Wellington and Blücher?",
        options: ["Battle of Austerlitz", "Battle of Leipzig", "Battle of Waterloo", "Battle of Borodino"],
        correctIndex: 2,
        explanation: "The Battle of Waterloo in Belgium marked the culmination of the Hundred Days and ended Napoleon's reign, leading to his exile on Saint Helena.",
        format: "mcq"
      },
      {
        id: "mr_q4",
        question: "Which historic pamphlet, penned by Thomas Paine in January 1776, passionately argued for American independence from the British monarchy?",
        options: ["Common Sense", "The Rights of Man", "The Federalist Papers", "The Age of Reason"],
        correctIndex: 0,
        explanation: "'Common Sense' sold over 100,000 copies in a matter of months, mobilizing widespread public enthusiasm for complete separation from Great Britain.",
        format: "mcq"
      }
    ]
  },
  {
    id: "modern_ww2_tf",
    title: "⚔️ World War II: Combat, Strategy & Decryption (True/False)",
    description: "Test your factual precision on key naval battles, covert operations, codebreaking, and pivotal treaties of the Second World War.",
    category: "Modern History",
    topic: "modern",
    subTopic: "World War II",
    formatType: "tf",
    difficulty: "Medium",
    questions: [
      {
        id: "ww2_tf1",
        question: "The British codebreaker Alan Turing and his team at Bletchley Park developed the electromechanical 'Bombe' machine to decipher German Enigma ciphers.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Turing and Gordon Welchman engineered the Bombe at Bletchley Park, breaking the Enigma cipher and saving an estimated fourteen million lives by shortening the war.",
        format: "tf"
      },
      {
        id: "ww2_tf2",
        question: "Operation Barbarossa, Nazi Germany's invasion of the Soviet Union launched in June 1941, remains the largest land invasion in human history.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Barbarossa mobilized over 3.8 million Axis personnel across a 2,900-kilometer front, opening the Eastern Front where the vast majority of European casualties occurred.",
        format: "tf"
      },
      {
        id: "ww2_tf3",
        question: "The United States had officially joined World War II as an active combatant prior to the Imperial Japanese surprise attack on Pearl Harbor.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! While providing material aid through Lend-Lease, the US was officially non-belligerent until Congress declared war following the attack on Pearl Harbor on December 7, 1941.",
        format: "tf"
      },
      {
        id: "ww2_tf4",
        question: "The Battle of Stalingrad ended in early 1943 with the complete encirclement and surrender of the German Sixth Army commanded by Friedrich Paulus.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! The Soviet counter-offensive Operation Uranus encircled Paulus's Sixth Army, culminating in the surrender of 91,000 Axis troops and turning the tide of the war.",
        format: "tf"
      }
    ]
  },
  {
    id: "modern_cold_war_mcq",
    title: "🛰️ The Cold War: Ideology, Espionage & Space Dominance",
    description: "From the Iron Curtain to the fall of the Berlin Wall, examine superpower proxy conflicts, nuclear diplomacy, and scientific races.",
    category: "Modern History",
    topic: "modern",
    subTopic: "Cold War Era",
    formatType: "mcq",
    difficulty: "Hard",
    questions: [
      {
        id: "cw_q1",
        question: "In October 1962, the world stood on the brink of thermonuclear war during which 13-day diplomatic and military confrontation?",
        options: ["The Berlin Airlift", "The Cuban Missile Crisis", "The Suez Crisis", "The Hungarian Uprising"],
        correctIndex: 1,
        explanation: "The discovery of Soviet R-12 nuclear ballistic missile installations in Cuba by American U-2 reconnaissance aircraft precipitated a tense naval quarantine managed by JFK and Khrushchev.",
        format: "mcq"
      },
      {
        id: "cw_q2",
        question: "Which Soviet cosmonaut became the first human being to journey into outer space and orbit the Earth aboard Vostok 1 on April 12, 1961?",
        options: ["Yuri Gagarin", "Gherman Titov", "Alexei Leonov", "Valentina Tereshkova"],
        correctIndex: 0,
        explanation: "Yuri Gagarin completed a 108-minute single orbit around the globe, securing a monumental victory for the Soviet space program at the height of the Space Race.",
        format: "mcq"
      },
      {
        id: "cw_q3",
        question: "Which mutual defense military alliance was established by the Western nations in 1949, prompting the Soviet Union to establish the Warsaw Pact in 1955?",
        options: ["SEATO", "NATO (North Atlantic Treaty Organization)", "CENTO", "The ANZUS Treaty"],
        correctIndex: 1,
        explanation: "NATO was formed in Washington, D.C. in April 1949 under the principle of collective defense (Article 5) to deter Soviet expansion across Western Europe.",
        format: "mcq"
      },
      {
        id: "cw_q4",
        question: "What famous speech delivered by Winston Churchill in Fulton, Missouri in 1946 popularized the phrase describing Soviet dominance across Central and Eastern Europe?",
        options: [
          "'An Iron Curtain has descended across the Continent'",
          "'Blood, Toil, Tears and Sweat'",
          "'Their Finest Hour'",
          "'A Date Which Will Live in Infamy'"
        ],
        correctIndex: 0,
        explanation: "In his 'Sinews of Peace' address at Westminster College, Churchill declared that 'from Stettin in the Baltic to Trieste in the Adriatic, an iron curtain has descended across the Continent.'",
        format: "mcq"
      }
    ]
  },

  // ==========================================
  // 3. SPECIFIC REGIONS
  // ==========================================
  {
    id: "region_asia_dynasties_mcq",
    title: "🏯 Imperial Asia: Dynasties, Shogunates & Silk Roads",
    description: "Investigate China's imperial examinations, Japan's feudal Shogunate transitions, and the maritime trade routes of the Indian Ocean.",
    category: "Specific Regions",
    topic: "regions",
    region: "Asia & Pacific",
    subTopic: "Imperial East Asia",
    formatType: "mcq",
    difficulty: "Medium",
    questions: [
      {
        id: "ra_q1",
        question: "Which Chinese dynasty standardized Chinese script, weights, currency, and began building the unified Great Wall under Emperor Qin Shi Huang in 221 BCE?",
        options: ["The Han Dynasty", "The Qin Dynasty", "The Tang Dynasty", "The Song Dynasty"],
        correctIndex: 1,
        explanation: "Though short-lived (221–206 BCE), the Qin Dynasty unified China's Warring States, institutionalized legalism, and established standard measurements and imperial roads.",
        format: "mcq"
      },
      {
        id: "ra_q2",
        question: "Which Japanese warlord completed the national unification of Japan and founded the Tokugawa Shogunate in Edo (Tokyo) in 1603?",
        options: ["Oda Nobunaga", "Toyotomi Hideyoshi", "Tokugawa Ieyasu", "Minamoto no Yoritomo"],
        correctIndex: 2,
        explanation: "Tokugawa Ieyasu triumphed at the decisive Battle of Sekigahara in 1600, establishing more than 250 years of peaceful isolation (sakoku) and cultural flourishing.",
        format: "mcq"
      },
      {
        id: "ra_q3",
        question: "Who commanded the legendary Ming Dynasty treasure voyages between 1405 and 1433, sailing vast multi-masted fleets to India, Arabia, and East Africa?",
        options: ["Admiral Zheng He", "Li Shizhen", "Xuande Emperor", "Ban Chao"],
        correctIndex: 0,
        explanation: "Admiral Zheng He led seven epic naval expeditions during the Yongle reign, showcasing Ming Chinese maritime technology and establishing diplomatic tributary networks.",
        format: "mcq"
      },
      {
        id: "ra_q4",
        question: "The Maurya Emperor Ashoka the Great dramatically renounced military conquest and embraced Buddhism after witnessing the devastation of which war?",
        options: ["The Battle of the Hydaspes", "The Kalinga War", "The Battle of Panipat", "The Magadha Campaign"],
        correctIndex: 1,
        explanation: "The horrific bloodshed at Kalinga (c. 261 BCE) filled Ashoka with remorse, prompting his conversion to Buddhist Dhamma, non-violence, and the construction of his famous Rock and Pillar Edicts.",
        format: "mcq"
      }
    ]
  },
  {
    id: "region_africa_civilizations_tf",
    title: "🌍 African Kingdoms & Empires: True or False",
    description: "Explore the legendary wealth of Mali, the stone masonry of Great Zimbabwe, and the intellectual legacy of Timbuktu.",
    category: "Specific Regions",
    topic: "regions",
    region: "Sub-Saharan Africa",
    subTopic: "African Kingdoms",
    formatType: "tf",
    difficulty: "Medium",
    questions: [
      {
        id: "raf_tf1",
        question: "Mansa Musa of the Mali Empire distributed so much gold during his 1324 pilgrimage to Mecca that it caused regional inflation for over a decade in Cairo.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Contemporary Arabic chroniclers noted that Mansa Musa's lavish generosity and gold donations in Cairo depreciated the local value of gold for over twelve years.",
        format: "tf"
      },
      {
        id: "raf_tf2",
        question: "Great Zimbabwe was constructed using wet mortar and imported European cement during Portuguese colonization.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! Great Zimbabwe was engineered by indigenous Shona stone-masons between the 11th and 15th centuries using sophisticated dry-stone masonry with zero mortar.",
        format: "tf"
      },
      {
        id: "raf_tf3",
        question: "The Kingdom of Aksum in modern-day Ethiopia was one of the first major empires in the ancient world to officially adopt Christianity as its state religion in the 4th century CE.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! King Ezana of Aksum converted to Christianity around 330 CE under the guidance of Frumentius, minting coins featuring Christian crosses contemporary with Roman Emperor Constantine.",
        format: "tf"
      },
      {
        id: "raf_tf4",
        question: "The Sankore Madrasah in Timbuktu housed hundreds of thousands of handwritten manuscripts covering astronomy, mathematics, medicine, and jurisprudence.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Timbuktu was a world-class center of Islamic scholarship, preserving vast collections of centuries-old manuscripts that are preserved today as UNESCO heritage.",
        format: "tf"
      }
    ]
  },
  {
    id: "region_americas_indigenous_mcq",
    title: "🌽 Civilizations of the Americas: Maya, Aztec & Inca",
    description: "Test your scholarship on Mesoamerican calendar systems, Tenochtitlan's chinampas, and Incan Andean quipu networks.",
    category: "Specific Regions",
    topic: "regions",
    region: "The Americas",
    subTopic: "Pre-Columbian Civilizations",
    formatType: "mcq",
    difficulty: "Hard",
    questions: [
      {
        id: "ram_q1",
        question: "What sophisticated device composed of knotted and colored strings did Incan administrators use to record censuses, taxes, and economic data?",
        options: ["Codices", "Quipu (Khipu)", "Tonalpohualli", "Chultun"],
        correctIndex: 1,
        explanation: "The Inca lacked an alphabetic written script but utilized quipus—intricate cords knotted at specific intervals in base-10 to catalog administrative accounts across thousands of miles.",
        format: "mcq"
      },
      {
        id: "ram_q2",
        question: "Which magnificent island capital was built on Lake Texcoco by the Mexica (Aztecs), connected to the mainland via causeways and serviced by floating chinampa gardens?",
        options: ["Teotihuacan", "Tenochtitlan", "Tikal", "Monte Albán"],
        correctIndex: 1,
        explanation: "Founded in 1325 CE, Tenochtitlan grew into a metropolis of over 200,000 inhabitants, featuring aqueducts, the Templo Mayor, and advanced floating agricultural beds.",
        format: "mcq"
      },
      {
        id: "ram_q3",
        question: "The ancient Maya mathematical system was notable for independently inventing and employing which mathematical concept centuries before Europe?",
        options: ["The concept and mathematical placeholder of zero", "Calculus limits", "Complex imaginary numbers", "Base-60 geometry"],
        correctIndex: 0,
        explanation: "The Maya utilized a vigesimal (base-20) numeral system incorporating a dedicated shell glyph representing zero, enabling exact astronomical and calendar calculations.",
        format: "mcq"
      },
      {
        id: "ram_q4",
        question: "Which Incan emperor transformed the small Kingdom of Cusco into the expansive Tawantinsuyu Empire and is credited with initiating Machu Picchu's construction?",
        options: ["Atahualpa", "Pachacuti Inca Yupanqui", "Huayna Capac", "Manco Inca"],
        correctIndex: 1,
        explanation: "Pachacuti (reigned 1438–1471 CE) reorganized the Andean realm, instituted the mit'a labor system, expanded the royal road network, and built estate retreats like Machu Picchu.",
        format: "mcq"
      }
    ]
  },

  // ==========================================
  // 4. HISTORICAL FIGURES
  // ==========================================
  {
    id: "figures_conquerors_mcq",
    title: "⚔️ Great Conquerors: Strategy, Siege & Statesmanship",
    description: "Analyze the operational tactics and enduring political impacts of history's most consequential military strategists.",
    category: "Historical Figures",
    topic: "figures",
    subTopic: "Military Commanders",
    formatType: "mcq",
    difficulty: "Medium",
    questions: [
      {
        id: "fig_cq1",
        question: "Alexander the Great defeated Persian King Darius III at which climactic 331 BCE clash, capturing Babylon and Persepolis?",
        options: ["Battle of Granicus", "Battle of Issus", "Battle of Gaugamela", "Battle of Chaeronea"],
        correctIndex: 2,
        explanation: "At Gaugamela, Alexander executed an oblique advance with his companion cavalry, creating a gap in the Persian center and driving directly at Darius's chariot.",
        format: "mcq"
      },
      {
        id: "fig_cq2",
        question: "Which Mongol leader united the nomadic tribes of the steppe in 1206, establishing the largest contiguous land empire in history?",
        options: ["Kublai Khan", "Genghis Khan (Temüjin)", "Batu Khan", "Subutai"],
        correctIndex: 1,
        explanation: "Proclaimed Universal Ruler (Genghis Khan) in 1206, Temüjin modernized Mongol military organization, meritocracy, and communication networks like the Yam.",
        format: "mcq"
      },
      {
        id: "fig_cq3",
        question: "Which ancient Chinese strategist and general authored 'The Art of War', championing the principle that 'supreme excellence consists in breaking the enemy's resistance without fighting'?",
        options: ["Sun Tzu", "Zhuge Liang", "Cao Cao", "Han Xin"],
        correctIndex: 0,
        explanation: "Sun Tzu's classic treatise focuses on intelligence, deception, logistics, and psychology, remaining foundational in military and strategic thinking globally.",
        format: "mcq"
      },
      {
        id: "fig_cq4",
        question: "Napoleon Bonaparte instituted which enduring legal framework in 1804 that replaced feudal laws with standardized civil equality and property rights?",
        options: ["The Napoleonic Code (Code Civil)", "The Lex Salica", "The Justinian Corpus", "The Declaration of Rights"],
        correctIndex: 0,
        explanation: "The Code Civil des Français established uniform laws across France and Napoleonic Europe, serving as the blueprint for modern civil law systems in over 70 nations.",
        format: "mcq"
      }
    ]
  },
  {
    id: "figures_queens_leaders_tf",
    title: "👑 Queens & Sovereign Women of Power: True or False",
    description: "Examine the political reigns and monumental decisions of history's most formidable female monarchs and heads of state.",
    category: "Historical Figures",
    topic: "figures",
    subTopic: "Female Rulers",
    formatType: "tf",
    difficulty: "Medium",
    questions: [
      {
        id: "fig_qw_tf1",
        question: "Empress Wu Zetian is the only recognized female sovereign emperor of China in over four millennia of dynastic history, founding her own Zhou Dynasty in 690 CE.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Wu Zetian ruled as 'Huangdi' (Emperor), expanding imperial civil service examinations, lowering peasant taxes, and patronizing Buddhist monasteries.",
        format: "tf"
      },
      {
        id: "fig_qw_tf2",
        question: "Queen Elizabeth I of England personally commanded combat ships at sea during the naval engagement against the Spanish Armada in 1588.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! While Elizabeth I delivered her immortal rallying speech to troops at Tilbury ('I know I have the body of a weak and feeble woman, but I have the heart and stomach of a king'), naval command was held by Lord Howard and Sir Francis Drake.",
        format: "tf"
      },
      {
        id: "fig_qw_tf3",
        question: "Catherine the Great of Russia seized the imperial throne in 1762 through a bloodless palace coup that deposed her husband, Emperor Peter III.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Supported by the Imperial Guard and the Orlov brothers, Catherine ousted Peter III and governed for 34 years as an Enlightened Despot, expanding Russia to the Black Sea.",
        format: "tf"
      },
      {
        id: "fig_qw_tf4",
        question: "Hatshepsut of Egypt was officially depicted in temple reliefs wearing traditional royal kilts and the ceremonial pharaonic false beard.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! To conform with traditional religious iconography designating the Pharaoh as an incarnation of Horus, Hatshepsut was portrayed with pharaonic regalia, including the false beard and nemes headdress.",
        format: "tf"
      }
    ]
  },

  // ==========================================
  // 5. HISTORICAL EVENTS
  // ==========================================
  {
    id: "events_battles_mcq",
    title: "🛡️ Turning Point Battles That Reshaped World History",
    description: "Analyze the pivotal clashes where the outcome altered imperial boundaries, dynastic futures, and civilizational balances.",
    category: "Historical Events",
    topic: "events",
    subTopic: "Decisive Battles",
    formatType: "mcq",
    difficulty: "Hard",
    questions: [
      {
        id: "eb_q1",
        question: "Which battle in 1066 saw Duke William of Normandy defeat Anglo-Saxon King Harold Godwinson, initiating the Norman Conquest of England?",
        options: ["Battle of Hastings", "Battle of Stamford Bridge", "Battle of Agincourt", "Battle of Bannockburn"],
        correctIndex: 0,
        explanation: "Fought on Senlac Hill near Hastings on October 14, 1066, Harold was killed and William crowned at Westminster, blending Anglo-Saxon and Norman culture and law.",
        format: "mcq"
      },
      {
        id: "eb_q2",
        question: "In 1453, which Ottoman Sultan successfully breached the Theodosian Walls using massive siege cannons, ending the Byzantine Empire?",
        options: ["Suleiman the Magnificent", "Mehmed II (The Conqueror)", "Selim I", "Bayezid I"],
        correctIndex: 1,
        explanation: "Mehmed II captured Constantinople after a 53-day siege utilizing Urban's super-cannon, ending the 1,100-year Byzantine realm and making the city the Ottoman imperial capital.",
        format: "mcq"
      },
      {
        id: "eb_q3",
        question: "Which naval clash in June 1942 resulted in the US Navy sinking four Imperial Japanese aircraft carriers, decisively shifting momentum in the Pacific?",
        options: ["Battle of Coral Sea", "Battle of Midway", "Battle of Leyte Gulf", "Battle of Guadalcanal"],
        correctIndex: 1,
        explanation: "American cryptanalysts at Station HYPO decoded Japanese naval signals, allowing US carrier dive-bombers to ambush and sink Akagi, Kaga, Soryu, and Hiryu in a matter of minutes.",
        format: "mcq"
      },
      {
        id: "eb_q4",
        question: "Which 732 CE engagement in central France saw Frankish leader Charles Martel halt the northward advance of the Umayyad Caliphate into Western Europe?",
        options: ["Battle of Tours (Poitiers)", "Battle of Roncevaux Pass", "Battle of Yarmouk", "Battle of Manzikert"],
        correctIndex: 0,
        explanation: "Martel's disciplined Frankish infantry stood firm against Umayyad cavalry, halting the northern expansion of Islamic armies into Western Europe and solidifying Carolingian prestige.",
        format: "mcq"
      }
    ]
  },
  {
    id: "events_treaties_tf",
    title: "📜 Treaties, Charters & Constitutions: True or False",
    description: "Scrutinize the landmark diplomatic pacts and constitutional documents that redefined state sovereignty and individual rights.",
    category: "Historical Events",
    topic: "events",
    subTopic: "Treaties & Pacts",
    formatType: "tf",
    difficulty: "Medium",
    questions: [
      {
        id: "et_tf1",
        question: "The Peace of Westphalia (1648), which ended the Thirty Years' War, established the foundational concept of modern sovereign statehood and non-interference.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Westphalian sovereignty codified the principle that each state has exclusive sovereignty over its domestic territory, faith, and political structures.",
        format: "tf"
      },
      {
        id: "et_tf2",
        question: "King John enthusiastically authored and distributed the Magna Carta in 1215 as a gift of rights to common peasant laborers throughout England.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! King John was coerced by rebellious feudal barons at Runnymede into signing the charter under threat of civil war, primarily protecting baronial privileges against royal tax abuses.",
        format: "tf"
      },
      {
        id: "et_tf3",
        question: "The 1494 Treaty of Tordesillas divided newly explored lands outside Europe between Portugal and the Crown of Castile along a meridian west of Cape Verde.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Brokered by Pope Alexander VI, the treaty gave Portugal the African coast, Indian Ocean route, and eastern South America (Brazil), while Spain claimed the rest of the Americas.",
        format: "tf"
      },
      {
        id: "et_tf4",
        question: "The United States Constitution was drafted to immediately abolish slavery upon its ratification in 1788.",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! The original 1787 Constitution contained compromises with Southern slave states, including the Three-Fifths Clause and protections for the transatlantic slave trade until at least 1808.",
        format: "tf"
      }
    ]
  }
];
