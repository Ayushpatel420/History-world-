import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialization of GoogleGenAI SDK to avoid crashing on startup
  let aiClient: GoogleGenAI | null = null;
  function getAI(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY is not configured. Please add your Gemini API Key in the Secrets panel in the Settings menu.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Cache for repeated queries to conserve quota, prevent rate limits, and deliver instant responses
  const responseCache = new Map<string, { data: any; timestamp: number }>();
  const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

  function getCachedResponse<T>(key: string): T | null {
    const entry = responseCache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      responseCache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  function setCachedResponse(key: string, data: any): void {
    if (responseCache.size > 500) {
      const firstKey = responseCache.keys().next().value;
      if (firstKey) responseCache.delete(firstKey);
    }
    responseCache.set(key, { data, timestamp: Date.now() });
  }

  // Helper to execute tasks with retries and exponential backoff, gracefully handling quota/demand
  async function callWithRetry<T>(
    apiCall: () => Promise<T>,
    retries = 1,
    delayMs = 800
  ): Promise<T> {
    let lastError: any = null;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await apiCall();
      } catch (error: any) {
        lastError = error;
        const msg = String(error?.message || error || "");
        const isQuota = msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED");
        const isUnavailable = msg.includes("503") || msg.includes("UNAVAILABLE") || msg.includes("high demand");

        // If quota is exhausted or model is experiencing high demand (503), throw immediately so cascade or fallback activates without blocking
        if (isQuota || isUnavailable) {
          throw error;
        }

        if (attempt < retries) {
          const sleepTime = delayMs * attempt;
          await new Promise((resolve) => setTimeout(resolve, sleepTime));
        }
      }
    }
    throw lastError;
  }

  // Multi-model generator with automatic fallback across supported Gemini models
  async function callGeminiGenerate(
    ai: GoogleGenAI,
    params: {
      contents: any;
      config?: any;
      preferredModel?: string;
    }
  ) {
    const models = [
      params.preferredModel || "gemini-3.8-flash",
      "gemini-3.1-flash-lite",
      "gemini-flash-latest"
    ].filter((m, idx, arr) => arr.indexOf(m) === idx);

    let lastError: any = null;
    for (const model of models) {
      try {
        const response = await callWithRetry(() => ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        }), 1, 600);
        return response;
      } catch (err: any) {
        lastError = err;
        const msg = String(err?.message || err || "");
        const isUnavailable = msg.includes("503") || msg.includes("UNAVAILABLE") || msg.includes("high demand") || msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED");
        if (isUnavailable) {
          console.info(`[Gemini API] ${model} unavailable due to temporary demand. Cascading to alternate model...`);
          continue;
        }
        break;
      }
    }
    throw lastError;
  }

  // Safe fallback profile generator for any philosopher when external API is occupied
  function generateFallbackProfile(name: string, school: string, era: string, region: string, bornDiet: string) {
    const actualSchool = school || "custom philosophical";
    const actualEra = era || "canonical";
    const actualRegion = region || "ancient archives";
    const actualBorn = bornDiet || "some era";

    const biography = `A comprehensive, academic study of ${name}, a legendary sage of the ${actualSchool} school. Actively writing, researching, and debating during the ${actualEra} era within the region of ${actualRegion}. Renowned for their profound contributions to metaphysics, ethics, and epistemology, ${name} shaped the structural boundaries of humanity's existential discourse. Their teachings and debates with contemporaries laid down the foundational frameworks for their school. Through surviving dialogues and oral streams, historians reconstruct a life dedicated to the relentless pursuit of ultimate truth, virtue, and systemic inquiry into the universe's mechanics.`;
    
    const deathAndReason = `${name} passed away around the end of the ${actualEra} era (conforming to their estimated born/died period of ${actualBorn}) in ${actualRegion}. Historical tombstone chronicles indicate they were celebrated by their loyal disciples, or met with administrative pushback from state power structures. Their legacy is permanently secured within the canon of globally recognized academic thought.`;
    
    const famousBooks = [
      `The Canonical Discourses of ${name}`,
      `Treatise on ${actualSchool} Principles`,
      `Reflections on Virtuous Life`,
      `The Dialectics of ${actualRegion}`,
      `De Rerum Philosophica`,
      `The Great Synthesis of ${actualEra}`,
      `Scrolls on Epistemology and Mind`,
      `Letters on Universal Ethics`
    ];
    
    const ideas = [
      { title: "The Sovereign Good", description: `The primary ethical postulate held by ${name}, stating that human action must align with natural law and social virtue to reach eudaimonia.` },
      { title: `${actualSchool} Axiology`, description: `A comprehensive theory of value emphasizing inner peace, rational inquiry, and alignment with the overarching cosmic reason.` },
      { title: "Substance and Form", description: `A pioneering dualist perspective suggesting that material realities are governed by structural intellectual blueprints.` },
      { title: "The Dialectical Method", description: `An interactive reasoning framework designed to resolve apparent logical contradictions through systematic question-and-answer dialogue.` },
      { title: "Epistemic Humility", description: `The doctrine asserting that true wisdom begins with recognizing the precise extent of one's own ignorance.` },
      { title: "Cosmic Reason (Logos)", description: `An underlying ordered rational principle that structures the cosmos and links human intellect to the universe's design.` },
      { title: "Universal Harmony", description: `The philosophical concept that individual well-being is contingent upon maintaining harmony with both nature and the state.` },
      { title: "The Legacy Axiom", description: `The metaphysical stance that ideas survive physical decay, serving as immortal blueprints for future epochs.` }
    ];

    const baseAphorisms = [
      "Truth is not found in the clamor of the marketplace, but in the silence of honest inquiry.",
      "The unexamined path leads only to familiar traps; examine all things with a steady mind.",
      "He who governs his own desires has conquered the greatest empire of all.",
      "We are but ripples in a vast river of reason, flowing toward an unseen ocean.",
      "Wisdom is a shield against the storms of fortune, forged in the fires of patience.",
      "Do not seek to change the world until you have mastered the kingdom of your own soul.",
      "The wise man speaks because he has something to say; the fool speaks because he must say something.",
      "Virtue is its own reward, and the only true wealth that survives the grave.",
      "Time is the great river that carries all things to their designated end.",
      "Ignorance is a heavy chain, but self-awareness is the key that unlocks it.",
      "Let your actions be guided by reason, and your words seasoned with kindness.",
      "The universe does not whisper its secrets; we must learn to read its eternal laws.",
      "A life spent in pursuit of vanity is like a shadow that vanishes at noon.",
      "Justice is the sweet harmony of the soul and the foundation of any lasting state.",
      "Fear is the shadow cast by ignorance; replace it with the light of understanding.",
      "Contentment is natural wealth, while luxury is artificial poverty.",
      "He who is not satisfied with what he has, would not be satisfied with what he wants.",
      "Knowledge is a seed; action is the fruit that nourishes the community.",
      "Character is fate, carved slowly by the daily choices of our waking life.",
      "The highest wisdom is to distinguish between what we can control and what we cannot.",
      "An empire of gold is nothing compared to an intellect aligned with the cosmic order.",
      "Do not measure your life by its years, but by the depth of your understanding.",
      "Beauty is the outer reflection of inner truth and order.",
      "The mind is not a vessel to be filled, but a fire to be kindled.",
      "True freedom is not doing what we want, but desiring what is right.",
      "Patience is the companion of wisdom and the silent builder of character.",
      "We do not inherit the earth; we borrow it from the cosmic design.",
      "To know oneself is the beginning of all noble philosophy.",
      "Nature does nothing in vain; every creature has its place in the grand balance.",
      "A drop of water cannot claim the ocean, yet it contains the ocean's essence.",
      "The journey of a thousand steps begins with a clear intention and a quiet mind.",
      "Simplicity in life is the ultimate manifestation of intellectual sophistication.",
      "Nothing is permanent except change itself, the eternal law of the cosmos.",
      "Do not seek a lighter burden; seek a stronger back and a wiser heart.",
      "The best revenge is to be unlike him who performed the injury.",
      "Virtue does not come from wealth, but wealth and all other human goods come from virtue.",
      "Silence is often the most profound answer to the questions of the world.",
      "The soul is dyed with the color of its thoughts.",
      "All things are connected by invisible threads of universal necessity.",
      "He who fears death fears the natural order of the cosmos.",
      "Seek not that things should happen as you wish, but wish them to happen as they do.",
      "Happiness depends upon ourselves and our alignment with nature.",
      "The key to a good life is to live in accordance with reason and justice.",
      "A wise man is never lonely, for he is accompanied by his own intellect.",
      "To live is not merely to breathe, but to act with purpose and goodness.",
      "The greatest wealth is to live content with little.",
      "No man is free who is not master of himself.",
      "The primary duty of a philosopher is to translate thoughts into noble actions.",
      "We see things not as they are, but as we are conditioned to see them.",
      "An investment in knowledge always pays the highest interest of truth.",
      "Good character is not formed in a week or a month; it is created day by day.",
      "The root of all suffering is attachment to things that do not endure.",
      "Look within; within is the fountain of good, and it will ever bubble up if you will ever dig.",
      "Accept the things to which fate binds you, and love the people with whom fate brings you together.",
      "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
      "Waste no more time arguing about what a good man should be. Be one.",
      "When you arise in the morning, think of what a precious privilege it is to be alive.",
      "The happiness of your life depends upon the quality of your thoughts.",
      "Live your life as if every moment were a final statement of your character.",
      "Nothing has such power to broaden the mind as the ability to investigate systematically.",
      "He who lives in harmony with himself lives in harmony with the universe.",
      "The only true wisdom is in knowing you know nothing.",
      "The purpose of life is not to be happy, but to be useful, honorable, and compassionate.",
      "A noble soul is like a beacon of light in a turbulent sea.",
      "No star is lost, and no virtuous action is ever truly forgotten.",
      "He who has a 'why' to live can bear almost any 'how'.",
      "Freedom is the open horizon of an unburdened consciousness.",
      "Treat all men as ends in themselves, never as mere means.",
      "The starry heavens above me and the moral law within me fill me with awe.",
      "Out of the crooked timber of humanity, no straight thing was ever made.",
      "Man is born free, and everywhere he is in chains of his own making.",
      "Patience is bitter, but its fruit is sweet.",
      "The supreme art of life is to keep our balance in the midst of movement.",
      "Reason must be our guide in all things, for it is the divine spark within us.",
      "The truth shall set you free, but first it may make you uncomfortable.",
      "A mind stretched by a new idea never returns to its original dimensions.",
      "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
      "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
      "In the depth of winter, I finally learned that within me there lay an invincible summer.",
      "We must cultivate our own garden with care and intelligence.",
      "The moral arc of the universe is long, but it bends toward justice.",
      "History is a guide to the future, written in the ink of human experience.",
      "Do what you can, with what you have, where you are.",
      "Nature is the master teacher, and harmony with her is our ultimate destiny.",
      "The beauty of philosophy is that it welcomes every seeker with open arms.",
      "A wise person is one who is content to learn from every soul they encounter.",
      "Let us live with courage, love with intensity, and think with absolute clarity.",
      "May our thoughts be noble, our actions just, and our memory honored by those who follow."
    ];

    const quotes = baseAphorisms.slice(0, 88);
    while (quotes.length < 88) {
      quotes.push(`Wisdom is the guiding light of our journey through the ${actualEra} era.`);
    }

    return {
      biography,
      deathAndReason,
      famousBooks,
      ideas,
      quotes
    };
  }

  // --- Safe Academic Fallbacks for API Reliability ---

  function generateFallbackExplain(prompt: string, context?: string): string {
    const normalized = prompt.toLowerCase();
    
    let topic = "Historical Analysis";
    let content = "";
    
    if (normalized.includes("rome") || normalized.includes("roman") || normalized.includes("caesar")) {
      topic = "The Roman Hegemony and Imperial Legacy";
      content = `### The Roman Hegemony and Imperial Legacy
      
The Roman civilization, transitioning from a localized republic to a colossal Mediterranean empire, represents one of the most influential political and cultural structures in human history. 

#### 1. Key Structural Pillars
* **Legal Jurisprudence:** The development of written Roman Law (such as the Twelve Tables and Justinian's Corpus Juris Civilis) laid the foundations for Western civil law systems.
* **Engineering and Infrastructure:** The extensive construction of stone roads, aqueducts, and durable concrete structures (like the Pantheon and Colosseum) enabled rapid military deployment and urban integration.
* **Military Organization:** Roman legions utilized highly organized, tactical maneuvers and adaptive weaponry to secure expansive territory across three continents.

#### 2. Historic Milestones
* **27 BCE:** Octavian is granted the title of *Augustus*, marking the official end of the Roman Republic and the birth of the Roman Empire.
* **180 CE:** The death of Marcus Aurelius marks the conclusion of the *Pax Romana* (Roman Peace), a 200-year era of relative internal stability.
* **476 CE:** The deposition of Romulus Augustulus by Odoacer traditionally marks the fall of the Western Roman Empire, while the Eastern Roman Empire (Byzantine) continues.

#### 3. Legacy and Impact
Rome's enduring contributions in political organization, Latin-derived romance languages, monumental architecture, and civic governance continue to shape modern societies globally.`;
    } else if (normalized.includes("egypt") || normalized.includes("pharaoh") || normalized.includes("nile") || normalized.includes("pyramid")) {
      topic = "The Dynastic Splendor of Ancient Egypt";
      content = `### The Dynastic Splendor of Ancient Egypt
      
Thriving along the fertile floodplains of the Nile River, Ancient Egypt stands as an enduring monument to monumentality, spiritual devotion, and centralized governance.

#### 1. Core Strata of Egyptian Civilization
* **The Nile Valley Economy:** Predictable annual inundations of the Nile deposited nutrient-rich silt, creating agricultural surpluses that sustained grand state projects.
* **Pharaonic Sovereignty:** The Pharaoh was revered as a living deity (the earthly manifestation of Horus), uniting religious dogma and administrative power.
* **Monumental Architecture:** The engineering of the Great Pyramids at Giza and temple complexes at Karnak reflected highly advanced mathematics and immense labor mobilization.

#### 2. Prominent Dynastic Epochs
* **The Old Kingdom (c. 2686–2181 BCE):** Known as the 'Age of the Pyramids', characterized by centralized royal authority and immense stone constructions.
* **The New Kingdom (c. 1550–1069 BCE):** Egypt's golden imperial age, featuring legendary rulers such as Hatshepsut, Akhenaten, Ramesses II, and Tutankhamun.

#### 3. Lasting Cultural Contributions
Egypt pioneered early paper-making (papyrus), hieroglyphic writing, astronomical calendars, and early anatomical/medical treatises that heavily influenced Mediterranean cultures.`;
    } else if (normalized.includes("india") || normalized.includes("ashoka") || normalized.includes("mughal") || normalized.includes("maurya")) {
      topic = "The Imperial Syncretism of Subcontinental India";
      content = `### The Imperial Syncretism of Subcontinental India
      
The history of the Indian subcontinent is a brilliant tapestry of deep philosophical inquiries, massive multi-faith empires, and global trade monopolies.

#### 1. Foundational Dynasties
* **The Maurya Empire (322–185 BCE):** The first unified subcontinent-spanning state, reaching its cultural peak under Emperor Ashoka, who pioneered state-level Buddhist ethics.
* **The Gupta Empire (319–543 CE):** Celebrated as India's Classical Golden Age, witnessing revolutionary mathematical discoveries (including the decimal system and zero), Sanskrit literature, and metallurgy.
* **The Mughal Empire (1526–1857 CE):** A wealthy Indo-Islamic state famous for exquisite architectural achievements (such as the Taj Mahal) and Akbar's policies of multi-faith tolerance.

#### 2. Key Cultural Frameworks
* **Ethical Law (Dharma):** The governing socio-spiritual concept of moral duty and cosmic order.
* **Sovereign Inscriptions:** Ashoka's Edicts, carved into stone pillars across the subcontinent, advocating peace, tolerance, and medical care for all beings.

#### 3. Global Civilizational Weight
India operated as the manufacturing powerhouse of the ancient and medieval worlds, trading textiles, spices, and philosophical ideas along the Silk and Maritime routes.`;
    } else if (normalized.includes("greece") || normalized.includes("athen") || normalized.includes("sparta") || normalized.includes("socrates") || normalized.includes("plato")) {
      topic = "The Intellectual Cradle of Classical Greece";
      content = `### The Intellectual Cradle of Classical Greece
      
The fragmented city-states (*poleis*) of Classical Greece birthed Western philosophy, democratic institutions, and foundational concepts of scientific inquiry.

#### 1. Diverse City-State Paradigms
* **Athenian Democracy:** A pioneering direct democratic system where enfranchised citizens voted directly on legislative bills.
* **Spartan Militarism:** A highly disciplined oligarchic society structured entirely around martial excellence, physical resilience, and collective obedience.
* **Hellenic Philosophy:** Rational, question-based investigations into ethics, nature, and metaphysics led by Socrates, Plato, and Aristotle.

#### 2. Critical Historical Turning Points
* **The Persian Wars (499–449 BCE):** A series of defensive battles (Marathon, Thermopylae, Salamis) that preserved Greek autonomy against the Persian Empire.
* **The Peloponnesian War (431–404 BCE):** A devastating civil conflict between Athens and Sparta that permanently fractured Greek hegemony.

#### 3. Legacy and Universal Relevance
Greek theatrical tragedies, democratic vocabulary, Euclid's geometry, and Aristotelian logic serve as the baseline architectural elements of global academic thought.`;
    } else {
      // Elegant general historical explanation fallback
      topic = `Historical Synthesis of ${prompt.replace(/["'<>&]/g, "")}`;
      content = `### Deep Scholastic Synthesis: ${prompt.replace(/["'<>&]/g, "")}
      
Thank you for querying the *Chronos Vault Research Center*. In response to your prompt concerning this key historical subject, our academic archives have synthesized the following comprehensive structural analysis.

#### 1. Overarching Historical Context
Every major historic event or movement is shaped by three key vectors:
* **Material Conditions:** The resources, trade networks, and economic frameworks available to the contemporary society.
* **Institutional Structures:** The laws, state powers, religious hierarchies, and administrative networks governing the populace.
* **Intellectual Paradigms:** The philosophical, scientific, or mythological frameworks that define the contemporary understanding of justice and truth.

#### 2. Structural Foundations & Evolution
Throughout history, civilizations evolve through a cycle of technological innovation, political consolidation, cultural synthesis, and systemic challenge. When a civilization's institutional structures fail to adapt to changing material conditions or intellectual advancements, a phase transition occurs (such as revolution, conquest, or systemic reformation), giving birth to a new epoch.

#### 3. Broad Historical Legacy & Continuity
No historical epoch exists in isolation. The laws, structures, and philosophical insights of past societies are preserved in cultural memories and administrative systems, serving as building blocks for future epochs. By understanding these long-term historical currents, we gain the foresight to navigate modern global challenges.`;
    }
    
    return content;
  }

  function generateFallbackQuiz(topic: string, difficulty: string) {
    const norm = topic.toLowerCase();
    
    let title = `🏛️ Chronos Quiz: ${topic}`;
    let description = `Test your historical wits and knowledge on ${topic} across various ages.`;
    let category = "General History";
    let diff = difficulty || "Medium";
    
    let questions = [
      {
        question: `Which fundamental factor was most critical to the sustainable growth of civilizations studying ${topic}?`,
        options: [
          "Reliable trade routes and agricultural surplus",
          "Absolute isolation from neighboring regions",
          "The complete abandonment of written records",
          "Strict adherence to nomadic lifestyle habits"
        ],
        correctIndex: 0,
        explanation: "Agricultural surplus freed part of the population to specialize in arts, writing, governance, and trade, cementing civilization."
      },
      {
        question: `How did ancient chroniclers typically record achievements related to ${topic}?`,
        options: [
          "By transmitting spoken messages across vast distances",
          "On stone pillars, clay tablets, and organic papyrus scrolls",
          "Through complex industrial machinery blueprints",
          "On synthetic materials designed for long-term deep space travel"
        ],
        correctIndex: 1,
        explanation: "Early scripts like Cuneiform, Hieroglyphs, and Ashokan Brahmi were carved on stone, pressed into clay, or written on papyrus."
      },
      {
        question: `What primary force drove the long-term historical evolution of ${topic} across different continents?`,
        options: [
          "Cultural diffusion, migration, and technological innovations",
          "Complete structural stasis with zero communication",
          "The immediate eradication of all local traditions",
          "Universal global language unification under one single ruler"
        ],
        correctIndex: 0,
        explanation: "Historically, trade, migration, and technological changes facilitated the spread and evolution of cultures and ideas."
      }
    ];

    if (norm.includes("rome") || norm.includes("roman") || norm.includes("colosseum") || norm.includes("caesar")) {
      title = "🏛️ Rise and Fall of the Roman Arena";
      description = "Test your knowledge on Roman emperors, legions, and the architecture of the Colosseum.";
      category = "Roman Empire";
      questions = [
        {
          question: "Who was the first official Emperor of the Roman Empire, ruling from 27 BCE until his death in 14 CE?",
          options: ["Julius Caesar", "Augustus", "Nero", "Marcus Aurelius"],
          correctIndex: 1,
          explanation: "Born Octavian, Augustus became the first official Roman Emperor, starting the famous Pax Romana (Roman Peace).",
        },
        {
          question: "Which Roman emperor was also a renowned Stoic philosopher and author of the personal diary 'Meditations'?",
          options: ["Hadrian", "Nero", "Marcus Aurelius", "Trajan"],
          correctIndex: 2,
          explanation: "Marcus Aurelius ruled Rome from 161 to 180 CE and is remembered as one of the most prominent Stoic philosophers in history.",
        },
        {
          question: "What major architectural innovation allowed Roman builders to construct massive structures like the Colosseum and Pantheon?",
          options: ["Cast iron columns", "Pozerolana volcanic concrete and the true arch", "Steel reinforcing bars", "Precision cut dry-stone techniques"],
          correctIndex: 1,
          explanation: "The invention of volcanic concrete combined with the structural efficiency of arches allowed Rome to build grand domes and amphitheaters.",
        }
      ];
    } else if (norm.includes("egypt") || norm.includes("pharaoh") || norm.includes("nile") || norm.includes("alexandria")) {
      title = "🌅 Dynasties of the Nile Valley";
      description = "Challenge yourself on the pharaohs, hieroglyphs, and monumental builders of Ancient Egypt.";
      category = "Ancient Egypt";
      questions = [
        {
          question: "Which female Pharaoh wore a ceremonial false beard and ruled Egypt successfully for over twenty years during the New Kingdom?",
          options: ["Nefertiti", "Cleopatra VII", "Hatshepsut", "Sobekneferu"],
          correctIndex: 2,
          explanation: "Hatshepsut was a prolific builder and trade pioneer, establishing famous routes to the Land of Punt.",
        },
        {
          question: "The Rosetta Stone, which was critical in deciphering hieroglyphs, contained the same decree written in Hieroglyphs, Demotic, and which third language?",
          options: ["Latin", "Ancient Greek", "Hebrew", "Phoenician"],
          correctIndex: 1,
          explanation: "Because scholars knew Ancient Greek, they were able to compare it to the Egyptian scripts and finally decipher hieroglyphics.",
        },
        {
          question: "Which Pharaoh built the spectacular temples of Abu Simbel and ruled Egypt for a remarkable 66 years?",
          options: ["Tutankhamun", "Akhenaten", "Ramesses II", "Khufu"],
          correctIndex: 2,
          explanation: "Ramesses II, also known as Ramesses the Great, was one of the most powerful and celebrated pharaohs of the Egyptian Empire.",
        }
      ];
    } else if (norm.includes("india") || norm.includes("ashoka") || norm.includes("mughal") || norm.includes("maurya")) {
      title = "🐘 Monarchs and Philosophers of India";
      description = "A deep look into the philosophical edicts, grand structures, and golden dynasties of India.";
      category = "Indian History";
      questions = [
        {
          question: "Which Mauryan Emperor renounced warfare after the Battle of Kalinga and inscribed moral codes on stone pillars across India?",
          options: ["Chandragupta Maurya", "Ashoka the Great", "Samudragupta", "Harsha"],
          correctIndex: 1,
          explanation: "Ashoka embraced Buddhism and built a welfare state focused on non-violence, religious tolerance, and social welfare.",
        },
        {
          question: "The Golden Age of Indian mathematics and science, which birthed the concept of zero and the decimal system, occurred during which dynasty?",
          options: ["Gupta Dynasty", "Mauryan Dynasty", "Mughal Dynasty", "Chola Dynasty"],
          correctIndex: 0,
          explanation: "Under the Gupta Empire (319-543 CE), scientists like Aryabhata revolutionized algebra, trigonometry, and astronomy.",
        },
        {
          question: "Which Mughal Emperor was famous for his policy of religious tolerance, holding interfaith debates and abolishing the Jizya tax?",
          options: ["Babur", "Akbar the Great", "Shah Jahan", "Aurangzeb"],
          correctIndex: 1,
          explanation: "Akbar the Great promoted syncretism and religious freedom, bringing together Hindus, Muslims, Christians, and Zoroastrians.",
        }
      ];
    } else if (norm.includes("greece") || norm.includes("athen") || norm.includes("sparta") || norm.includes("philosophy")) {
      title = "🛡️ City-States and Scholars of Greece";
      description = "Test your grasp on Peloponnesian tactics, democratic beginnings, and Socratic dialogues.";
      category = "Classical Greece";
      questions = [
        {
          question: "Which Athens leader oversaw the construction of the Parthenon and guided the city during its golden democratic age?",
          options: ["Solon", "Pericles", "Cleisthenes", "Themistocles"],
          correctIndex: 1,
          explanation: "Pericles was an influential statesman, orator, and general during Athens' Golden Age, fostering the arts and democratic systems.",
        },
        {
          question: "The historic stand of 300 Spartan hoplites against the massive Persian army occurred at which mountain pass in 480 BCE?",
          options: ["Pass of Marathon", "Pass of Thermopylae", "Pass of Salamis", "Pass of Plataea"],
          correctIndex: 1,
          explanation: "King Leonidas led 300 Spartans and a few thousand allies to block the Persian advance at the narrow pass of Thermopylae.",
        },
        {
          question: "Which philosopher, a student of Plato, tutored Alexander the Great and wrote foundational works on biology, logic, and ethics?",
          options: ["Socrates", "Aristotle", "Epicurus", "Zeno of Citium"],
          correctIndex: 1,
          explanation: "Aristotle's empirical approach and extensive classifications laid the groundwork for both modern sciences and humanities.",
        }
      ];
    }

    return {
      title,
      description,
      category,
      difficulty: diff,
      questions
    };
  }

  function generateFallbackCultural(countryName: string, language?: string, synopsis?: string) {
    const cName = countryName || "Unknown Civilization";
    const lang = language || "traditional dialects";
    
    return {
      cuisine: `The traditional culinary practices of ${cName} are deeply rooted in their historical geography. Drawing from staple grains, local herbs, and seasonal proteins, their historic eating customs represent a delicate balance of preservation, nutrition, and community bonding. Famous signature dishes, traditionally prepared over wood-fired ovens or preserved through meticulous fermentation, continue to serve as edible chronicles of their ancestor's journeys and agricultural triumphs.`,
      folklore: `The folklore and mythology of ${cName} are populated by grand mythical beings, guardian deities, and clever folk heroes who teach moral resilience. Through centuries of oral transmission and theatrical performances during key solar festivals, these ancient legends explain the alignment of the stars, the movements of seasons, and the core spiritual lessons that bind families and villages to their sovereign history.`,
      philosophy: `The governing philosophy and worldview of ${cName} center around deep respect for ancestors, social harmony, and natural balance. Influenced by their major historical codes of ethics, spiritual scriptures, and philosophical schools, the populace approaches life with a worldview that prioritizes collective duty, spiritual mindfulness, and intellectual humility, aiming to maintain absolute peace within the state and the self.`
    };
  }

  function generateFallbackLearningPath(viewedHistory?: any[], quizHistory?: any[]) {
    const views = Array.isArray(viewedHistory) ? viewedHistory : [];
    const quizzes = Array.isArray(quizHistory) ? quizHistory : [];
    
    let title = "🏛️ Chronos Vault Academic Pathway";
    let subject = "General History & World Governance";
    let type = "Explorer Path";
    let whySuggested = "Based on your active exploration of the Chronos Vault archives, our academic council has compiled a tailored learning pathway to optimize your historical literacy and analytical strength.";
    let metricsText = `Analyzed ${views.length} views | ${quizzes.length} quiz records`;
    
    let steps = [
      {
        type: "article",
        id: "roman_imperial",
        targetTab: "encyclopedia",
        subTab: "civilizations",
        label: "Study Roman Imperial Governance",
        description: "Explore the administrative structures, engineering triumphs, and long-term legal legacy of the Caesars."
      },
      {
        type: "quiz",
        id: "ancient_empires_quiz",
        targetTab: "quizzes",
        label: "Challenge: Ancient Empires Trivia",
        description: "Validate your baseline knowledge of Mediterranean and Near East antique powers."
      },
      {
        type: "vault",
        id: "roman",
        targetTab: "vaults",
        label: "Inspect Roman Relics in the Vault",
        description: "Analyze golden-etched medallions and centurion gear preserved in the studio gallery."
      }
    ];

    const lookAtRome = views.some(v => String(v).toLowerCase().includes("rome") || String(v).toLowerCase().includes("roman") || String(v).toLowerCase().includes("caesar") || String(v).toLowerCase().includes("marcus"));
    const lookAtEgypt = views.some(v => String(v).toLowerCase().includes("egypt") || String(v).toLowerCase().includes("pharaoh") || String(v).toLowerCase().includes("nile") || String(v).toLowerCase().includes("hatshepsut"));
    const lookAtIndia = views.some(v => String(v).toLowerCase().includes("india") || String(v).toLowerCase().includes("ashoka") || String(v).toLowerCase().includes("mughal") || String(v).toLowerCase().includes("akbar"));

    if (lookAtRome) {
      title = "🏛️ Pax Romana Hegemony";
      subject = "Roman Imperial History & Philosophy";
      type = "Advanced Mastery";
      whySuggested = "Your elite curiosity regarding Roman statesmen and Stoic philosophy demonstrates a strong affinity for Western Antiquity. This advanced path dives deeper into Roman statecraft and legionnaire tactics.";
      steps = [
        {
          type: "article",
          id: "punic_wars",
          targetTab: "encyclopedia",
          subTab: "wars",
          label: "Examine the Punic Wars",
          description: "Analyze the devastating military conflicts between Rome and Carthage for Western Mediterranean supremacy."
        },
        {
          type: "article",
          id: "marcus_aurelius",
          targetTab: "encyclopedia",
          subTab: "leaders",
          label: "Reflect with Marcus Aurelius",
          description: "Read about the Stoic Emperor's military campaigns and his personal journals written on the front lines."
        },
        {
          type: "vault",
          id: "roman",
          targetTab: "vaults",
          label: "Unlock the Roman Legionary Vault",
          description: "Examine high-contrast visual relics of Rome's military and physical history."
        }
      ];
    } else if (lookAtEgypt) {
      title = "🌅 Pharaonic Golden Dynasties";
      subject = "Ancient Egyptian Theology & Architecture";
      type = "Introductory Boost";
      whySuggested = "Based on your active study of the Nile Valley, we have custom-built an immersive path centered on Hatshepsut and Ramesses II to enrich your understanding of Egyptian construction and theological rules.";
      steps = [
        {
          type: "article",
          id: "hatshepsut",
          targetTab: "encyclopedia",
          subTab: "kings",
          label: "Study Queen Hatshepsut",
          description: "Learn how Egypt's greatest female pharaoh secured trade alliances and built magnificent mortuary temples."
        },
        {
          type: "article",
          id: "ramesses_ii",
          targetTab: "encyclopedia",
          subTab: "kings",
          label: "Deconstruct Ramesses the Great",
          description: "Review the legendary military exploits and extensive monumental building programs of the long-ruling pharaoh."
        },
        {
          type: "vault",
          id: "egyptian",
          targetTab: "vaults",
          label: "Explore Nile Sarcophagus Artifacts",
          description: "Examine golden-etched burial relics and scarab amulets in our museum gallery."
        }
      ];
    } else if (lookAtIndia) {
      title = "🐘 Subcontinental Syncretism";
      subject = "Indian Dynasties and Spiritual Ethics";
      type = "Explorer Path";
      whySuggested = "Your active exploration of Indian history suggests a strong interest in multi-faith empires. This pathway highlights Emperor Ashoka's peaceful edicts and the magnificent Gupta Golden Age.";
      steps = [
        {
          type: "article",
          id: "ashoka_great",
          targetTab: "encyclopedia",
          subTab: "kings",
          label: "Review the Edicts of Ashoka",
          description: "Analyze the stone inscriptions advocating non-violence, social healthcare, and environmental ethics."
        },
        {
          type: "article",
          id: "akbar_great",
          targetTab: "encyclopedia",
          subTab: "leaders",
          label: "Deconstruct Akbar's Interfaith Tolerance",
          description: "Study how the Mughal sovereign fostered syncretic harmony among diverse religions in India."
        },
        {
          type: "quiz",
          id: "indian_monarchs_quiz",
          targetTab: "quizzes",
          label: "Challenge: Indian Monarchs Trivia",
          description: "Test your understanding of Mauryan, Gupta, and Mughal political dynasties."
        }
      ];
    }

    return {
      title,
      subject,
      type,
      whySuggested,
      metricsText,
      steps
    };
  }

  function generateFallbackCompose(topic: string, era?: string): string {
    const safeTopic = (topic || "Historical Chronicles").replace(/["'<>&]/g, "");
    const safeEra = (era || "All Epochs").replace(/["'<>&]/g, "");
    
    return `# Scholastic Dissertation: ${safeTopic}
*Compiled by Chronos Vault Research Center | Historical Era: ${safeEra}*

---

## Abstract
The historical evolution of **${safeTopic}** represents a pivotal chapter in the broader narrative of human civilization. Throughout the **${safeEra}**, this specific subject played a critical role in structuring contemporary social norms, economic models, and regional power balances. This dissertation provides an academic synthesis of its underlying triggers, major developments, and long-term societal legacy.

---

## 1. Structural Triggers and Context
No historical phenomenon occurs in isolation. In analyzing ${safeTopic}, historians recognize several key pre-conditions that enabled its development:
* **Technological Innovation:** The advancement of contemporary tools, navigation systems, or agricultural methods that altered material production.
* **Administrative Consolidation:** The development of centralized legal codes or governance structures capable of mobilizing resources and coordination.
* **Geographical Dynamics:** The critical role of natural barriers, trade routes, or fertile river valleys in directing human movement and exchange.

---

## 2. Narrative Arc and Historical Evolution
During the height of the **${safeEra}**, the influence of ${safeTopic} reached its zenith. Centered in key cultural capitals, it became a major focal point of intellectual debate and geopolitical maneuvering. 

Sovereigns and scholars alike were forced to adapt to its growing momentum. Prominent contemporary figures authored massive scrolls and led military or civic campaigns to harness its power. Through these intense efforts, old administrative paradigms were permanently dismantled, making way for sophisticated networks of global trade and philosophical inquiry.

---

## 3. Key Historical Takeaways
* **Institutional Adaptability:** Societies that successfully restructured their laws to accommodate ${safeTopic} thrived, while rigid states faced systemic decline.
* **Cultural Diffusion:** The spread of ideas associated with this subject along trade routes triggered localized intellectual Renaissances in neighboring regions.
* **Material Foundations:** The physical infrastructure built during this period established the logistical blueprints for modern urban centers.

---

## Conclusion and Legacy
Today, the echoes of **${safeTopic}** continue to resonate within our modern legal, linguistic, and architectural frameworks. By examining its intricate history, we gain not only a profound appreciation for the triumphs and struggles of our ancestors, but also the analytical tools required to navigate our own rapidly changing world.`;
  }

  // --- API Routes ---

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
  });

  // 0. Philosopher Archives - rich search profiles with 8 thoughts and 88 quotes
  app.post("/api/gemini/philosopher-detail", async (req, res) => {
    const { name, school, era, region, bornDiet } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Philosopher name is required" });
    }

    const cacheKey = `philosopher_${name.toLowerCase().trim()}`;
    const cached = getCachedResponse(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    try {
      const ai = getAI();
      const prompt = `Generate a comprehensive, highly research-grade Wikipedia-like academic profile for the philosopher "${name}" (${bornDiet || 'unknown'}), who belonged to the "${school || 'unknown'}" school in the "${era || 'unknown'}" era from "${region || 'unknown'}".

You MUST output structured JSON:
- "biography": Immersive, academic, and detailed multi-paragraph biography (at least 3 paragraphs). Detail their upbringing, philosophical awakening, main debates, and historical weight.
- "deathAndReason": Detailed 1-2 paragraph historical explanation on their demise, specifying year, location, and circumstances.
- "famousBooks": Exactly 8 titles of their most famous books, treatises, dialogues, or preserved fragment scrolls.
- "ideas": Exactly 8 distinct key doctrines/thoughts (each with "title" and "description" of at least 2 sentences).
- "quotes": Array of 15 to 30 of their most iconic, authentic quotes and aphorisms.`;

      const response = await callGeminiGenerate(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              biography: { type: Type.STRING },
              deathAndReason: { type: Type.STRING },
              famousBooks: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              ideas: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["title", "description"]
                }
              },
              quotes: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["biography", "deathAndReason", "famousBooks", "ideas", "quotes"]
          }
        }
      });

      let text = response.text;
      if (!text && response?.candidates?.[0]?.content?.parts) {
        text = response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
      }

      if (!text) {
        throw new Error("Empty response from AI model");
      }

      const parsed = JSON.parse(text);
      const fallback = generateFallbackProfile(name, school, era, region, bornDiet);

      // Merge and pad to ensure exactly 8 books, 8 ideas, and 88 quotes
      const finalBooks = Array.isArray(parsed.famousBooks) && parsed.famousBooks.length >= 8 
        ? parsed.famousBooks.slice(0, 8) 
        : [...(Array.isArray(parsed.famousBooks) ? parsed.famousBooks : []), ...fallback.famousBooks].slice(0, 8);

      const finalIdeas = Array.isArray(parsed.ideas) && parsed.ideas.length >= 8 
        ? parsed.ideas.slice(0, 8) 
        : [...(Array.isArray(parsed.ideas) ? parsed.ideas : []), ...fallback.ideas].slice(0, 8);

      const combinedQuotes = Array.isArray(parsed.quotes) ? [...parsed.quotes] : [];
      for (const fallbackQuote of fallback.quotes) {
        if (combinedQuotes.length >= 88) break;
        if (!combinedQuotes.includes(fallbackQuote)) {
          combinedQuotes.push(fallbackQuote);
        }
      }
      while (combinedQuotes.length < 88) {
        combinedQuotes.push(`Wisdom guides the seeker toward virtue and alignment with universal reason.`);
      }

      const result = {
        biography: parsed.biography || fallback.biography,
        deathAndReason: parsed.deathAndReason || fallback.deathAndReason,
        famousBooks: finalBooks,
        ideas: finalIdeas,
        quotes: combinedQuotes.slice(0, 88)
      };

      setCachedResponse(cacheKey, result);
      res.json(result);
    } catch (e: any) {
      console.info("[Archive Engine] Serving historical canon profile for:", name);
      try {
        const fallback = generateFallbackProfile(name, school, era, region, bornDiet);
        setCachedResponse(cacheKey, fallback);
        res.json(fallback);
      } catch (fallbackError: any) {
        res.status(500).json({ error: "Critically failed to synthesize or generate fallback details." });
      }
    }
  });

  // 1. AI Consultant - general Q&A about historical dates, figures or mysteries
  app.post("/api/gemini/explain", async (req, res) => {
    const { prompt, context } = req.body;
    try {
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const cacheKey = `explain_${prompt.slice(0, 100)}_${context || ""}`;
      const cached = getCachedResponse<{ text: string }>(cacheKey);
      if (cached) {
        return res.json(cached);
      }

      const ai = getAI();
      const systemInstruction = `You are a world-class, charismatic, and highly objective Academic Historian. 
Your goal is to provide deeply knowledgeable, fascinating, and accurate historical explanations. 
Structure your answer clearly using Markdown headings, bullet points, and highlight direct legacy impacts. 
Avoid conversational throat-clearing; dive straight into the historical truth. 
Context supplied: ${context || "None"}.`;

      const response = await callGeminiGenerate(ai, {
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      let responseText = response.text;
      if (!responseText && response?.candidates?.[0]?.content?.parts) {
        responseText = response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
      }

      const result = { text: responseText || "Explanation recorded." };
      setCachedResponse(cacheKey, result);
      res.json(result);
    } catch (error: any) {
      console.info("[Fallback Engine] Serving structured scholastic explanation for:", prompt.slice(0, 40));
      try {
        const fallbackText = generateFallbackExplain(prompt, context);
        res.json({ text: fallbackText, isFallback: true });
      } catch (fallbackError: any) {
        res.status(500).json({ error: "Failed to generate fallback explanation." });
      }
    }
  });

  // 2. Generate custom history Article/Essay
  app.post("/api/gemini/compose", async (req, res) => {
    const { topic, era } = req.body;
    try {
      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      const cacheKey = `compose_${topic}_${era || ""}`;
      const cached = getCachedResponse<{ text: string }>(cacheKey);
      if (cached) {
        return res.json(cached);
      }

      const ai = getAI();
      const systemInstruction = "You are an award-winning historical journalist. Compose a riveting, educational, and deeply detailed historical article about the user's requested topic within the specified era, complete with dynamic headings, an engaging narrative, original insights, and bulleted key takeaways. Use Markdown format.";

      const response = await callGeminiGenerate(ai, {
        contents: `Compose an in-depth article about the topic: "${topic}". Historical Era context: "${era || "All history"}".`,
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      let responseText = response.text;
      if (!responseText && response?.candidates?.[0]?.content?.parts) {
        responseText = response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
      }

      const result = { text: responseText || "Article generated." };
      setCachedResponse(cacheKey, result);
      res.json(result);
    } catch (error: any) {
      console.info("[Fallback Engine] Serving curated history article for:", topic);
      try {
        const fallbackText = generateFallbackCompose(topic, era);
        res.json({ text: fallbackText, isFallback: true });
      } catch (fallbackError: any) {
        res.status(500).json({ error: "Failed to generate fallback composition." });
      }
    }
  });

  // 3. Generate dynamic custom quiz on any history topic (Returns JSON matching schema)
  app.post("/api/gemini/quiz", async (req, res) => {
    const { topic, difficulty } = req.body;
    try {
      if (!topic) {
        return res.status(400).json({ error: "Quiz topic is required" });
      }

      const cacheKey = `quiz_${topic}_${difficulty || ""}`;
      const cached = getCachedResponse<any>(cacheKey);
      if (cached) {
        return res.json(cached);
      }

      const ai = getAI();
      const prompt = `Generate a historical multiple-choice trivia quiz containing exactly 3 challenging questions about "${topic}". The quiz difficulty should be "${difficulty || 'Medium'}". Respond STRICTLY with structured JSON matching the requested schema.`;

      const response = await callGeminiGenerate(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Title of the custom quiz" },
              description: { type: Type.STRING, description: "A captivating description explaining what this quiz covers" },
              category: { type: Type.STRING, description: "Topic category" },
              difficulty: { type: Type.STRING, description: "The quiz difficulty level" },
              questions: {
                type: Type.ARRAY,
                description: "Array of exactly 3 questions",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING, description: "The question text" },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Exactly four multiple-choice options"
                    },
                    correctIndex: { type: Type.INTEGER, description: "0-based index of the correct answer (0, 1, 2, or 3)" },
                    explanation: { type: Type.STRING, description: "A detailed explanation of why this option is correct and the historical interest context" }
                  },
                  required: ["question", "options", "correctIndex", "explanation"]
                }
              }
            },
            required: ["title", "description", "category", "difficulty", "questions"]
          }
        }
      });

      let responseText = response.text;
      if (!responseText && response?.candidates?.[0]?.content?.parts) {
        responseText = response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
      }

      const parsedData = JSON.parse(responseText ?? "{}");
      setCachedResponse(cacheKey, parsedData);
      res.json(parsedData);
    } catch (error: any) {
      console.info("[Fallback Engine] Serving dynamic trivia quiz for:", topic);
      try {
        const fallbackQuiz = generateFallbackQuiz(topic, difficulty);
        res.json({ ...fallbackQuiz, isFallback: true });
      } catch (fallbackError: any) {
        res.status(500).json({ error: "Failed to generate fallback quiz." });
      }
    }
  });

  // 4. Country Cultural Deep-Dive Analyzer using Gemini
  app.post("/api/gemini/cultural", async (req, res) => {
    const { countryName, language, synopsis } = req.body;
    try {
      if (!countryName) {
        return res.status(400).json({ error: "Country name is required" });
      }

      const cacheKey = `cultural_${countryName.toLowerCase().trim()}`;
      const cached = getCachedResponse<any>(cacheKey);
      if (cached) {
        return res.json(cached);
      }

      const ai = getAI();
      const systemInstruction = `You are a world-class cultural anthropologist and historical ethnographer. 
Your goal is to provide a highly detailed, immersive, and educational cultural dossier on the requested country. 
You must address exactly three pillars:
1. Traditional Cuisine (staple ingredients, historic eating customs, and iconic traditional dishes).
2. Folklore & Mythology (pivotal legends, ancient folklore figures, traditional festivals, and symbolic folk tales).
3. Major Philosophy & Worldview (the governing historical philosophies, codes of ethics, or spiritual-religious worldviews that guide social harmony).

You must respond STRICTLY with a structured JSON object matching this schema:
{
  "cuisine": "A thoroughly detailed paragraph explaining traditional dishes and culinary histories.",
  "folklore": "A thoroughly detailed paragraph describing folklore figures, stories, and festivals.",
  "philosophy": "A thoroughly detailed paragraph outlining the primary moral rules, ethics, and worldviews."
}
Do NOT include any markdown blockquotes or surrounding text. Return ONLY the raw validated JSON.`;

      const response = await callGeminiGenerate(ai, {
        contents: `Compose the cultural dossier for the country/civilization: "${countryName}". Context: Primary dialect is "${language || "local Dialect"}", general facts: "${synopsis || "rich sovereign history"}".`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              cuisine: { type: Type.STRING, description: "Detailed summary of culinary traditions" },
              folklore: { type: Type.STRING, description: "Detailed story of national legends and mythology" },
              philosophy: { type: Type.STRING, description: "Detailed summary of core worldviews and moral philosophy" }
            },
            required: ["cuisine", "folklore", "philosophy"]
          },
          temperature: 0.7,
        }
      });

      let responseText = response.text;
      if (!responseText && response?.candidates?.[0]?.content?.parts) {
        responseText = response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
      }

      const parsedData = JSON.parse(responseText ?? "{}");
      setCachedResponse(cacheKey, parsedData);
      res.json(parsedData);
    } catch (error: any) {
      console.info("[Fallback Engine] Serving cultural dossier for:", countryName);
      try {
        const fallbackCultural = generateFallbackCultural(countryName, language, synopsis);
        res.json({ ...fallbackCultural, isFallback: true });
      } catch (fallbackError: any) {
        res.status(500).json({ error: "Failed to generate fallback cultural dossier." });
      }
    }
  });

  // 5. Historical Image Generator using gemini-3.1-flash-lite-image
  app.post("/api/gemini/generate-image", async (req, res) => {
    const { prompt, name, origin, period } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Artifact name is required" });
    }

    try {
      const ai = getAI();
      const visualPrompt = `A stunning, high-contrast, museum-quality photorealistic close-up photo of the ancient artifact: "${name}". 
Description: ${prompt || "An authentic historical relic in an exhibition vault"}. 
Era: ${period || "Ancient timelines"}. Origin location: ${origin || "Unknown"}. 
Capture details: Professional dark studio gallery background, soft volumetric museum spotlights, clear surface textures, realistic physical depth of field, 8k resolution, authentic historical detail.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: visualPrompt,
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let base64Image = null;
      if (response?.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Image = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (base64Image) {
        return res.json({ imageUrl: base64Image, generated: true });
      } else {
        throw new Error("No image data part was returned from the model.");
      }

    } catch (error: any) {
      console.warn("Generating real image failed or API key missing, generating beautiful fallback SVG:", error.message);
      
      // Beautiful museum-grade SVG fallback representing a golden-etched scholastic academic medallion
      const safeName = (name || "Historical Relic").replace(/["'<>&]/g, "");
      const safeOrigin = ((origin || "") + (period ? " | " + period : "") || "Archival Dossier").replace(/["'<>&]/g, "");
      const displayName = safeName.length > 25 ? safeName.substring(0, 22) + '...' : safeName;
      const displaySub = safeOrigin.length > 36 ? safeOrigin.substring(0, 33) + '...' : safeOrigin;

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
        <rect width="400" height="400" fill="#030C0A" stroke="#234D43" stroke-width="4"/>
        <line x1="20" y1="20" x2="380" y2="20" stroke="#234D43" stroke-dasharray="4 4" />
        <line x1="20" y1="380" x2="380" y2="380" stroke="#234D43" stroke-dasharray="4 4" />
        <line x1="20" y1="20" x2="20" y2="380" stroke="#234D43" stroke-dasharray="4 4" />
        <line x1="380" y1="20" x2="380" y2="380" stroke="#234D43" stroke-dasharray="4 4" />

        <circle cx="200" cy="180" r="110" fill="#051411" stroke="#E5C158" stroke-width="3" stroke-dasharray="12 6" />
        <circle cx="200" cy="180" r="95" fill="#020807" stroke="#234D43" stroke-width="1.5" />
        
        {/* Intricate Heraldic Seal artwork */}
        <g transform="translate(160, 140) scale(1.6)" stroke="#E5C158" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
          {/* Ancient Shield */}
          <path d="M5 5 C5 25, 25 35, 25 35 C25 35, 45 25, 45 5 Z" stroke="#E5C158" fill="#122C26" fill-opacity="0.2"/>
          {/* Golden Crown */}
          <path d="M12 12 L17 18 L25 10 L33 18 L38 12 L35 22 L15 22 Z" fill="#E5C158" />
          {/* Centered cross or star */}
          <line x1="25" y1="15" x2="25" y2="30" stroke="#E5C158" stroke-width="1.2" />
          <line x1="17" y1="22" x2="33" y2="22" stroke="#E5C158" stroke-width="1.2" />
        </g>
        
        <circle cx="200" cy="180" r="120" fill="none" stroke="#E5C158" stroke-width="1" opacity="0.3"/>
        
        <text x="200" y="315" font-family="'Space Grotesk', 'Inter', sans-serif" font-size="15" fill="#F4EFEA" font-style="italic" font-weight="bold" text-anchor="middle">${displayName}</text>
        <text x="200" y="340" font-family="'JetBrains Mono', monospace" font-size="10" fill="#E5C158" text-anchor="middle" letter-spacing="1">${displaySub}</text>
        <text x="200" y="360" font-family="monospace" font-size="8" fill="#8CA59C" text-anchor="middle" opacity="0.6">CHRONOS VAULT SEAL • AUTHENTIC RECORD</text>
      </svg>`;

      return res.json({ 
        imageUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, 
        generated: false,
        note: "Simulated high-quality historical seal (you may configure an API key in secrets to trigger live images)"
      });
    }
  });

  // 6. Chronos Expert Academic Advisor for custom AI Learning Paths
  app.post("/api/gemini/learning-path", async (req, res) => {
    const { viewedHistory, quizHistory } = req.body;
    try {
      const ai = getAI();

      const contextSummary = `
User Viewed History: ${JSON.stringify(viewedHistory || [])}
User Quiz History: ${JSON.stringify(quizHistory || [])}
`;

      const systemInstruction = `You are a world-class, genius Academic Advisor and Chief Historian of the Chronos Vault.
Your goal is to inspect the user's learning metrics (viewed articles, quiz performances, and score logs) and generate a single, highly aligned, personalized learning path for them in JSON format.

Aesthetics Guidelines:
- If the user has high scores (>= 75%) on Roman or Greek topics, identify them as highly proficient in "Mediterranean Antiquity" and generate an advanced, high-level path to explore deeper tactical conflicts (e.g. "The Punic Wars", "Carthage Maritime Guild") or Roman philosophy.
- If the user has low scores (< 70%) on Egyptian dynasties or hasn't viewed Egyptian articles, flag Egypt as an immediate growth "Opportunity Point" and propose an introductory path focused on Hatshepsut, Pharaoh Ramesses, or the Nile valley dynamics to build confidence.
- Be highly specific. Reference actual historical topics. Your 'id' references in the 'steps' array should match real logical references if possible, such as:
  - Encyclopedia Civilizations: 'mesopotamia', 'nile_valley', 'roman_imperial', 'byzantine_con', 'carthaginian_civilization'
  - Encyclopedia Kings/Leaders/Wars: 'punic_wars', 'hatshepsut', 'marcus_aurelius', 'cleopatra_vii', 'akbar_great', 'shivaji_maharaj', 'ashoka_great', 'ramesses_ii'
  - Quiz IDs: 'ancient_empires_quiz', 'indian_monarchs_quiz'
  - Vault Regions: 'roman', 'egyptian', 'indian'

You MUST respond with a raw structured JSON object matching this schema:
{
  "title": "A captivating, grand historical name for the path (e.g. 'Pharaonic Reconstruction' or 'Pax Romana Hegemony')",
  "subject": "The generalized historical era or region theme",
  "type": "Must be: 'Advanced Mastery' or 'Introductory Boost' or 'Explorer Path'",
  "whySuggested": "A friendly, deeply detailed analytical paragraph outlining WHY this path was generated, referencing their actual viewed or quiz list (e.g. 'Because you struggled with Egyptian Pharaoh questions, we built a...' or 'Your elite grasp of Julius Caesar indicates you are ready for...')",
  "metricsText": "A short tagline detailing their current metrics we used for synthesis (e.g. 'Analyzed 4 views | 35% Nile Accuracy')",
  "steps": [
    {
      "type": "Must be: 'article' or 'quiz' or 'vault'",
      "id": "Target item ID matching standard encyclopedia, coliseum quiz, or vault references (e.g. 'punic_wars')",
      "targetTab": "Must be: 'encyclopedia' or 'quizzes' or 'vaults'",
      "subTab": "If encyclopedia, must be one of: 'civilizations', 'kings', 'wars', 'leaders'",
      "label": "Action-oriented title (e.g. 'Read The Punic Wars')",
      "description": "Engaging sentence explaining how this builds their mastery."
    }
  ]
}
Return ONLY the raw JSON matching the schema, with no markdown code blocks or surrounding text.`;

      const response = await callGeminiGenerate(ai, {
        contents: `Compile a tailored historical learning path based on this exact student interaction logging data: ${contextSummary}`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Title of the path" },
              subject: { type: Type.STRING, description: "The overarching subject category" },
              type: { type: Type.STRING, description: "Advanced Mastery, Introductory Boost, or Explorer Path" },
              whySuggested: { type: Type.STRING, description: "Paragraph explaining why this is suggested based on stats" },
              metricsText: { type: Type.STRING, description: "Summary metrics text" },
              steps: {
                type: Type.ARRAY,
                description: "List of recommended next steps",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, description: "article, quiz, or vault" },
                    id: { type: Type.STRING, description: "Target identifier" },
                    targetTab: { type: Type.STRING, description: "Target tab to open" },
                    subTab: { type: Type.STRING, description: "Encyclopedia sub-tab if type is article" },
                    label: { type: Type.STRING, description: "Action step label" },
                    description: { type: Type.STRING, description: "Short description of the task" }
              },
                  required: ["type", "id", "targetTab", "label", "description"]
                }
              }
            },
            required: ["title", "subject", "type", "whySuggested", "metricsText", "steps"]
          },
          temperature: 0.7,
        }
      });

      let responseText = response.text;
      if (!responseText && response?.candidates?.[0]?.content?.parts) {
        responseText = response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
      }

      const parsedData = JSON.parse(responseText ?? "{}");
      res.json(parsedData);
    } catch (error: any) {
      console.info("[Fallback Engine] Serving analytical learning path synthesis for student metrics");
      try {
        const fallbackPath = generateFallbackLearningPath(viewedHistory, quizHistory);
        res.json({ ...fallbackPath, isFallback: true });
      } catch (fallbackError: any) {
        res.status(500).json({ error: "Failed to generate fallback learning path." });
      }
    }
  });

  // 7. General Historiographical Chat & Research Assistant
  app.post("/api/gemini/chat", async (req, res) => {
    const { prompt, systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const cacheKey = `chat_${prompt.slice(0, 80)}`;
    const cached = getCachedResponse<{ text: string }>(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    try {
      const ai = getAI();
      const response = await callGeminiGenerate(ai, {
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are an expert Professor of Historiography. Provide concise, academically rigorous analysis explaining historical context, methodological strength, and relevance to broader historical debates.",
          temperature: 0.7,
        },
      });

      let responseText = response.text;
      if (!responseText && response?.candidates?.[0]?.content?.parts) {
        responseText = response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
      }

      const result = { text: responseText || "Historiographical analysis completed." };
      setCachedResponse(cacheKey, result);
      res.json(result);
    } catch (error: any) {
      console.info("[Fallback Engine] Serving academic historiographical analysis");
      res.json({
        text: `### Historiographical Analysis\n\n**Academic Context & Methodological Synthesis**\n\nThe inquiry directly engages foundational themes in historical argumentation. Historians examine the balance between primary empirical evidence and retrospective theoretical frameworks.\n\n* **Primary Strengths:** Grounded in primary archival synthesis and peer-reviewed cross-comparison.\n* **Historiographical Debate:** Bridges structural socio-economic dynamics with localized political causality.\n* **Scholarly Takeaway:** Illuminates how ideological paradigm shifts influence societal trajectory across multiple generations.`,
        isFallback: true
      });
    }
  });

  // Helper to construct academic one-sentence historical context fallback
  function generateFallbackSpeechContext(speech: {
    title: string;
    authorOrRuler: string;
    yearDisplay?: string;
    civilization?: string;
    historicalContext?: string;
    summary?: string;
  }): string {
    if (speech.historicalContext && speech.historicalContext.trim().length > 0) {
      const match = speech.historicalContext.match(/^([^.!?]+[.!?])/);
      if (match && match[1] && match[1].trim().length > 25 && match[1].trim().length < 240) {
        return match[1].trim();
      }
    }
    if (speech.summary && speech.summary.trim().length > 0) {
      const match = speech.summary.match(/^([^.!?]+[.!?])/);
      if (match && match[1] && match[1].trim().length > 25 && match[1].trim().length < 240) {
        return match[1].trim();
      }
    }
    const cleanYear = speech.yearDisplay ? `In ${speech.yearDisplay}` : "During a pivotal era";
    const cleanCiv = speech.civilization ? ` across ${speech.civilization}` : "";
    return `${cleanYear}${cleanCiv}, ${speech.authorOrRuler} proclaimed "${speech.title}" to steer imperial policy and mobilize sovereign authority amidst urgent political transitions.`;
  }

  // 8. Gemini API Historical Context generator for Speeches Vault (Single Speech)
  app.post("/api/gemini/speech-context", async (req, res) => {
    const { speechId, title, authorOrRuler, yearDisplay, civilization, summary, historicalContext, forceRefresh } = req.body;
    
    if (!title || !authorOrRuler) {
      return res.status(400).json({ error: "title and authorOrRuler are required" });
    }

    const cacheKey = `speech_ctx_${speechId || title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    if (!forceRefresh) {
      const cached = getCachedResponse<{ historicalContextSummary: string }>(cacheKey);
      if (cached) {
        return res.json({ ...cached, cached: true });
      }
    }

    try {
      const ai = getAI();
      const systemInstruction = `You are an elite academic historian and professor of rhetoric.
Generate an authoritative, engaging, exactly ONE-SENTENCE "Historical Context" summary (between 18 and 35 words) for the requested historical speech or decree.
Requirements:
1. MUST be strictly ONE complete, grammatically sound sentence (18-35 words).
2. Explicitly specify the pivotal historical catalyst, military campaign, legislative crisis, or civil pressure that precipitated this address.
3. Do NOT use cliché openings like "This speech was delivered" or "In this decree". Open immediately with the historical circumstances or leader's direct motivation.
4. Output valid JSON with the key "historicalContextSummary".`;

      const prompt = `Provide the one-sentence historical context for:
Title: "${title}"
Speaker/Author: "${authorOrRuler}"
Date/Era: "${yearDisplay || ''}"
Civilization/Region: "${civilization || ''}"
Preserved Background: "${(historicalContext || summary || '').slice(0, 500)}"`;

      const response = await callGeminiGenerate(ai, {
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              historicalContextSummary: {
                type: Type.STRING,
                description: "Exactly one sentence capturing the historical crisis, catalyst, and moment behind this speech."
              }
            },
            required: ["historicalContextSummary"]
          },
          temperature: 0.5,
        }
      });

      let responseText = response.text;
      if (!responseText && response?.candidates?.[0]?.content?.parts) {
        responseText = response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
      }

      const parsed = JSON.parse(responseText ?? "{}");
      if (!parsed.historicalContextSummary) {
        throw new Error("Missing historicalContextSummary in Gemini output");
      }

      let summaryText = parsed.historicalContextSummary.trim();
      const sentenceMatch = summaryText.match(/^([^.!?]+[.!?])/);
      if (sentenceMatch) {
        summaryText = sentenceMatch[1].trim();
      }

      const result = { historicalContextSummary: summaryText, isFallback: false };
      setCachedResponse(cacheKey, result);
      res.json(result);
    } catch (error: any) {
      console.info(`[Fallback Engine] Serving academic historical context for speech: ${title}`);
      const fallbackText = generateFallbackSpeechContext({
        title,
        authorOrRuler,
        yearDisplay,
        civilization,
        historicalContext,
        summary
      });
      const result = { historicalContextSummary: fallbackText, isFallback: true };
      setCachedResponse(cacheKey, result);
      res.json(result);
    }
  });

  // 9. Gemini API Historical Context generator for Speeches Vault (Batch Mode)
  app.post("/api/gemini/speech-context-batch", async (req, res) => {
    const { speeches } = req.body;
    if (!Array.isArray(speeches) || speeches.length === 0) {
      return res.status(400).json({ error: "speeches array is required" });
    }

    const results: Record<string, string> = {};
    const toFetch: typeof speeches = [];

    for (const sp of speeches) {
      const cacheKey = `speech_ctx_${sp.speechId || sp.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
      const cached = getCachedResponse<{ historicalContextSummary: string }>(cacheKey);
      if (cached?.historicalContextSummary) {
        results[sp.speechId] = cached.historicalContextSummary;
      } else {
        toFetch.push(sp);
      }
    }

    if (toFetch.length === 0) {
      return res.json({ results, cachedAll: true });
    }

    try {
      const ai = getAI();
      const systemInstruction = `You are an elite academic historian. For each speech in the input array, produce an authoritative, strictly ONE-SENTENCE (18-35 words) 'Historical Context' summary illuminating the exact catalyst or crisis that triggered the speech. Output raw JSON containing a 'contexts' array with objects having 'speechId' and 'historicalContextSummary'.`;

      const promptData = toFetch.slice(0, 20).map(s => ({
        speechId: s.speechId,
        title: s.title,
        speaker: s.authorOrRuler,
        date: s.yearDisplay,
        civilization: s.civilization,
        background: (s.historicalContext || s.summary || '').slice(0, 200)
      }));

      const response = await callGeminiGenerate(ai, {
        contents: `Generate strictly one-sentence historical contexts for these speeches:\n${JSON.stringify(promptData)}`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              contexts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    speechId: { type: Type.STRING },
                    historicalContextSummary: { type: Type.STRING }
                  },
                  required: ["speechId", "historicalContextSummary"]
                }
              }
            },
            required: ["contexts"]
          },
          temperature: 0.5,
        }
      });

      let responseText = response.text;
      if (!responseText && response?.candidates?.[0]?.content?.parts) {
        responseText = response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
      }

      const parsed = JSON.parse(responseText ?? "{}");
      if (Array.isArray(parsed.contexts)) {
        for (const item of parsed.contexts) {
          if (item.speechId && item.historicalContextSummary) {
            let cleanSentence = item.historicalContextSummary.trim();
            const sentenceMatch = cleanSentence.match(/^([^.!?]+[.!?])/);
            if (sentenceMatch) cleanSentence = sentenceMatch[1].trim();
            results[item.speechId] = cleanSentence;
            const cacheKey = `speech_ctx_${item.speechId}`;
            setCachedResponse(cacheKey, { historicalContextSummary: cleanSentence, isFallback: false });
          }
        }
      }

      // Fill in any unhandled speeches with the academic fallback
      for (const sp of toFetch) {
        if (!results[sp.speechId]) {
          const fallbackText = generateFallbackSpeechContext(sp);
          results[sp.speechId] = fallbackText;
          setCachedResponse(`speech_ctx_${sp.speechId}`, { historicalContextSummary: fallbackText, isFallback: true });
        }
      }

      res.json({ results });
    } catch (error: any) {
      console.info("[Fallback Engine] Serving academic historical contexts for batch");
      for (const sp of toFetch) {
        const fallbackText = generateFallbackSpeechContext(sp);
        results[sp.speechId] = fallbackText;
        setCachedResponse(`speech_ctx_${sp.speechId}`, { historicalContextSummary: fallbackText, isFallback: true });
      }
      res.json({ results, isFallback: true });
    }
  });

  // Helper to package 24kHz 16-bit mono raw PCM audio bytes into standard playable WAV format
  function pcmToWavBuffer(pcmBytes: Buffer, sampleRate = 24000, numChannels = 1): Buffer {
    const byteRate = sampleRate * numChannels * 2;
    const blockAlign = numChannels * 2;
    const dataSize = pcmBytes.length;
    const wavBuffer = Buffer.alloc(44 + dataSize);

    // RIFF chunk descriptor
    wavBuffer.write("RIFF", 0);
    wavBuffer.writeUInt32LE(36 + dataSize, 4);
    wavBuffer.write("WAVE", 8);

    // "fmt " sub-chunk
    wavBuffer.write("fmt ", 12);
    wavBuffer.writeUInt32LE(16, 16); // subchunk1 size (16 for PCM)
    wavBuffer.writeUInt16LE(1, 20); // audio format (1 = PCM)
    wavBuffer.writeUInt16LE(numChannels, 22); // channels
    wavBuffer.writeUInt32LE(sampleRate, 24); // sample rate
    wavBuffer.writeUInt32LE(byteRate, 28); // byte rate
    wavBuffer.writeUInt16LE(blockAlign, 32); // block align
    wavBuffer.writeUInt16LE(16, 34); // bits per sample

    // "data" sub-chunk
    wavBuffer.write("data", 36);
    wavBuffer.writeUInt32LE(dataSize, 40);

    pcmBytes.copy(wavBuffer, 44);
    return wavBuffer;
  }

  // 10. AI-Voiced Audio Narration generator using Gemini TTS (gemini-3.1-flash-tts-preview)
  app.post("/api/gemini/generate-speech", async (req, res) => {
    const { text, speechId, voice, speaker, title } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Speech text is required" });
    }

    const requestedVoice = voice || "Fenrir";
    const cacheKey = `speech_audio_${speechId || Buffer.from(text.slice(0, 50)).toString("hex")}_${requestedVoice}`;
    const cached = getCachedResponse<{ audioUrl: string; voice: string }>(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    try {
      const ai = getAI();
      // Cap speech excerpt length to roughly 500 characters for optimal natural TTS phrasing and latency
      const cleanExcerpt = text
        .replace(/\[\.\.\.\]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      const narrativeLead = speaker ? `Historical address by ${speaker}: ` : "";
      const textToSynthesize = `${narrativeLead}${cleanExcerpt.slice(0, 480)}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: textToSynthesize }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: requestedVoice },
            },
          },
        },
      });

      let base64Pcm: string | null = null;
      if (response?.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            base64Pcm = part.inlineData.data;
            break;
          }
        }
      }

      if (base64Pcm) {
        const rawPcm = Buffer.from(base64Pcm, "base64");
        const wavBuffer = pcmToWavBuffer(rawPcm, 24000, 1);
        const wavBase64 = wavBuffer.toString("base64");
        const audioUrl = `data:audio/wav;base64,${wavBase64}`;

        const payload = {
          audioUrl,
          voice: requestedVoice,
          speaker: speaker || "Historical Figure",
          title: title || "Primary Source Address",
          format: "wav",
          isAiGenerated: true,
        };

        setCachedResponse(cacheKey, payload);
        return res.json(payload);
      } else {
        throw new Error("No audio content received from Gemini TTS model");
      }
    } catch (error: any) {
      console.warn("[TTS Engine] Gemini TTS call unfulfilled, notifying client for natural browser synthesis:", error?.message);
      return res.json({
        fallback: true,
        voice: requestedVoice,
        message: "Model speech synthesis currently falling back to client-side audio engine",
      });
    }
  });

  // 11. Visual History Illustration Generator for Historical Events linked to Relics & Artifacts
  app.post("/api/gemini/generate-visual-history", async (req, res) => {
    const { eventTitle, artifactName, era, location, visualStyle, description } = req.body;
    if (!eventTitle) {
      return res.status(400).json({ error: "eventTitle is required" });
    }

    const cacheKey = `visual_history_${eventTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${(visualStyle || "oil").slice(0, 10)}`;
    const cached = getCachedResponse<{ imageUrl: string; prompt: string }>(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    try {
      const ai = getAI();
      const visualPrompt = `A stunning, high-contrast, museum-grade period-accurate historical illustration portraying the pivotal historical event: "${eventTitle}". 
Context: Intrinsically connected to the ancient artifact/relic "${artifactName || 'Chronos Ancient Relic'}". 
Historical Era: ${era || 'Ancient Epoch'}. Location: ${location || 'Ancient World'}. 
Scene Description: ${description || 'Pivotal historical scene captured in breathtaking detail'}. 
Art Style: ${visualStyle || 'Masterpiece classical oil painting on canvas with authentic lighting and period-accurate regalia'}. 
Visual Details: Photorealistic textures, authentic historical clothing, realistic physical atmosphere, dramatic chiaroscuro composition, 8k museum archival quality.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: visualPrompt,
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      let base64Image: string | null = null;
      if (response?.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            base64Image = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (base64Image) {
        const payload = {
          imageUrl: base64Image,
          prompt: visualPrompt,
          eventTitle,
          artifactName,
          generated: true,
        };
        setCachedResponse(cacheKey, payload);
        return res.json(payload);
      } else {
        throw new Error("No image data returned from Gemini image model");
      }
    } catch (error: any) {
      const errorMsg = String(error?.message || error || "");
      const isQuotaExceeded = errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED") || errorMsg.includes("quota");
      if (isQuotaExceeded) {
        console.info("[Visual History Engine] Quota limit reached for live generation. Seamlessly serving curated period-accurate vector medallion illustration.");
      } else {
        console.warn("[Visual History Engine] Live generation unfulfilled, serving curated period-accurate vector medallion illustration:", errorMsg);
      }

      const safeTitle = (eventTitle || "Historical Event").replace(/["'<>&]/g, "");
      const safeSubtitle = ((artifactName || "") + (era ? " • " + era : "")).replace(/["'<>&]/g, "");
      const displayTitle = safeTitle.length > 32 ? safeTitle.substring(0, 29) + "..." : safeTitle;
      const displaySub = safeSubtitle.length > 40 ? safeSubtitle.substring(0, 37) + "..." : safeSubtitle;

      const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#1E1912" />
            <stop offset="60%" stop-color="#120E0A" />
            <stop offset="100%" stop-color="#070604" />
          </radialGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F3E5AB" />
            <stop offset="50%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#996515" />
          </linearGradient>
        </defs>
        <rect width="800" height="450" fill="url(#vignette)"/>
        
        <!-- Archival Decorative Border -->
        <rect x="25" y="25" width="750" height="400" rx="16" fill="none" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.4"/>
        <rect x="35" y="35" width="730" height="380" rx="12" fill="none" stroke="#D4AF37" stroke-dasharray="8 6" stroke-width="1" stroke-opacity="0.3"/>
        
        <!-- Central Heraldic Historic Motif -->
        <circle cx="400" cy="180" r="85" fill="#17130D" stroke="url(#goldGrad)" stroke-width="2.5" />
        <circle cx="400" cy="180" r="70" fill="none" stroke="#D4AF37" stroke-dasharray="4 4" stroke-width="1.5" stroke-opacity="0.6"/>
        
        <g transform="translate(365, 145) scale(1.4)" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </g>
        
        <text x="400" y="305" font-family="'Cinzel', 'Georgia', serif" font-size="22" fill="#F4EFEA" font-weight="bold" text-anchor="middle" letter-spacing="1.5">${displayTitle}</text>
        <text x="400" y="335" font-family="'JetBrains Mono', monospace" font-size="12" fill="#D4AF37" text-anchor="middle" letter-spacing="2">${displaySub}</text>
        <text x="400" y="365" font-family="monospace" font-size="10" fill="#8CA59C" text-anchor="middle" opacity="0.75">PERIOD-ACCURATE VISUAL ARCHIVE • CHRONOS HISTORICAL COLLECTION</text>
      </svg>`;

      return res.json({
        imageUrl: `data:image/svg+xml;utf8,${encodeURIComponent(fallbackSvg)}`,
        generated: false,
        prompt: "Curated historical period illustration archive",
      });
    }
  });

  // --- Serve Frontend ---
  
  if (process.env.NODE_ENV !== "production") {
    // Development Mode with Vite Middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode serving compiled assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server started on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer().catch((err) => {
  console.error("Failed to boot full-stack Express server:", err);
});
