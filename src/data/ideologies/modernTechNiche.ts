import { PoliticalIdeology } from '../../types';

export const MODERN_TECH_NICHE_IDEOLOGIES: PoliticalIdeology[] = [
  {
    id: 'transhumanism',
    name: 'Transhumanism (H+)',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Transforming the human condition through genetic engineering, cybernetics, AI, and life extension.',
    definition: 'An international philosophical and cultural movement advocating the transformation of the human condition by developing and making widely available sophisticated technologies to greatly enhance human intellect and physiology, eliminating disease, aging, and involuntary suffering.',
    historicalOrigins: 'Coined by Julian Huxley in 1957; formalized in the 1980s–1990s by Max More, Nick Bostrom, and the World Transhumanist Association (Humanity+).',
    coreTenets: [
      'Morphological Freedom: the fundamental right to modify, upgrade, or augment one\'s own body and brain',
      'Radical Life Extension: curing aging through cellular repair, telomere therapies, and cryonics',
      'Cognitive Enhancement: brain-computer interfaces (BCIs), nootropics, and neural augmentation',
      'Posthuman Destiny: humanity as an intermediate stage toward superintelligent posthumans'
    ],
    keyThinkers: ['Nick Bostrom', 'Ray Kurzweil', 'Max More', 'Julian Huxley', 'Aubrey de Grey', 'FM-2030'],
    realWorldExamples: [
      {
        title: 'Neuralink & Brain-Computer Interface (BCI) Trials',
        periodOrLocation: '2020s–Present (Global)',
        description: 'Implantation of high-density neural threads allowing paralyzed patients to control computers directly with thought.'
      },
      {
        title: 'CRISPR Gene-Editing & Anti-Aging Biotechnology (Calico, Altos Labs)',
        periodOrLocation: '2015–Present (Global)',
        description: 'Billions invested in cellular reprogramming, Yamanaka factors, and genetic editing to reverse human biological aging.'
      }
    ],
    economicModel: 'High-tech bio-capitalism or democratic transhumanist universal access, heavy funding for biotechnology and artificial intelligence R&D.',
    viewOfState: 'A facilitator of technological innovation that safeguards morphological rights, prevents biosecurity disasters, and ensures equitable access to enhancements.',
    criticisms: [
      'Bioconservatives (Francis Fukuyama) warn it threatens human nature and could create an unbridgeable biological caste divide between the enhanced rich and unenhanced poor',
      'Existential risk concerns regarding rogue superintelligence or catastrophic biological pathogens'
    ],
    keyTextsOrManifestos: ['The Singularity Is Near (Ray Kurzweil)', 'Superintelligence: Paths, Dangers, Strategies (Nick Bostrom)', 'The Transhumanist Declaration (1998)'],
    spectrumPlacement: 'Futurist / Techno-Progressive Axis',
    iconSymbol: '🧠⚡'
  },
  {
    id: 'accelerationism',
    name: 'Accelerationism',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Radically intensifying technological, capitalist, or computational processes to trigger systemic transformation.',
    definition: 'A range of political and social theories that propose that technological change and capitalism should be accelerated and intensified rather than restrained, in order to either reach post-capitalist liberation (Left-Accelerationism) or catalyze runaway technological singularity (Right-Accelerationism / e/acc).',
    historicalOrigins: 'Cybernetic Culture Research Unit (CCRU) at the University of Warwick in the 1990s (Nick Land, Sadie Plant); revitalized by Srnicek & Williams (2013) and the Effective Accelerationism (e/acc) movement (2022).',
    coreTenets: [
      'Left-Accelerationism (L/Acc): repurpose the technological infrastructure of capitalism (automation, AI, logistics) to build post-scarcity democratic socialism',
      'Right-Accelerationism (R/Acc): celebrate the dehumanizing, runaway competitive dynamics of capital and AI toward singularity (Nick Land)',
      'Effective Accelerationism (e/acc): physics-based philosophy holding that entropy minimization requires maximizing energy and compute throughput to spread intelligence across the universe',
      'Rejection of luddism, degrowth, and nostalgic political retreats'
    ],
    keyThinkers: ['Nick Land', 'Alex Williams & Nick Srnicek', 'Mark Fisher', 'Beff Jezos (Guillaume Verdon - e/acc founder)', 'Sadie Plant'],
    realWorldExamples: [
      {
        title: 'Effective Accelerationism (e/acc) in Silicon Valley',
        periodOrLocation: '2022–Present (San Francisco & Tech Ecosystem)',
        description: 'Movement among leading AI researchers and founders advocating for unrestricted open-source AI development and energy abundance.'
      },
      {
        title: '#Accelerate: Manifesto for an Accelerationist Politics',
        periodOrLocation: '2013 (London, UK)',
        description: 'Influential political treatise arguing that the left must embrace planetary-scale computation, automation, and synthetic biology to surpass capitalism.'
      }
    ],
    economicModel: 'Post-scarcity full automation, hyper-capitalist compute markets, nuclear energy expansion, universal basic income (Left variant).',
    viewOfState: 'Either a bureaucratic impediment to be dissolved by market-computational forces (R/acc/e/acc) or an instrument to be captured for planetary automation planning (L/acc).',
    criticisms: [
      'AI safety researchers warn that unconstrained AI acceleration poses existential extinction risks to humanity',
      'Can appear reckless regarding human disruption, labor displacement, and environmental extraction'
    ],
    keyTextsOrManifestos: ['#Accelerate: Manifesto for an Accelerationist Politics (Srnicek & Williams)', 'Fanged Noumena (Nick Land)', 'Inventing the Future (Srnicek & Williams)'],
    spectrumPlacement: 'Spans Spectrum (Left-Acc to Right-Acc / e/acc)',
    iconSymbol: '🚀⚡'
  },
  {
    id: 'anarcho-transhumanism',
    name: 'Anarcho-Transhumanism (@H+)',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Total morphological freedom, open-source biohacking, and abolishing all physical and social hierarchies.',
    definition: 'A philosophy that synthesizes anarchism with transhumanism, advocating for morphological freedom, cognitive enhancement, and radical open-source technology to abolish not only political and economic domination, but also the involuntary biological constraints of disease, aging, and bodily limitations.',
    historicalOrigins: 'Emerged in the 2000s in online anarchist and cyberpunk circles; championed by William Gillis and the biohacker movement.',
    coreTenets: [
      'Universal Morphological Freedom: every individual has the absolute right to modify or remain in their bodily state free from state or corporate coercion',
      'Open-Source Biotechnology & Hardware: blueprints, medical CRISPR tools, and AI weights must be free and decentralized to prevent corporate biomedical monopolies',
      'Abolition of all coercive hierarchies (state, capitalism, patriarchy) alongside the conquest of biological involuntary suffering',
      'DIY Biohacking and grassroots community labs'
    ],
    keyThinkers: ['William Gillis', 'Sadie Plant', 'Mark O\'Connell', 'Biohackers (Open Insulin Project)'],
    realWorldExamples: [
      {
        title: 'Open Insulin Project',
        periodOrLocation: '2015–Present (California & Global)',
        description: 'Community biohackers reverse-engineering open-source protocols to produce affordable, patent-free insulin in community micro-breweries.'
      },
      {
        title: 'Grinder & DIY Cybernetic Movement (Dangerous Things)',
        periodOrLocation: '2010s–Present (Global)',
        description: 'Decentralized activists implanting open RFID/NFC chips, magnet sensors, and biometric tracking devices in their own bodies without medical establishment gatekeeping.'
      }
    ],
    economicModel: 'Peer-to-peer open-source bio-commons, 3D printing of medical hardware, abolition of intellectual property and patents.',
    viewOfState: 'The state and pharmaceutical-industrial monopolies are oppressors that restrict human liberation; technology must be liberated for all.',
    criticisms: [
      'Severe biosecurity risks: unrestricted open-source biotechnology could enable bad actors to synthesize dangerous pathogens',
      'Medical safety risks associated with unsupervised DIY surgical implants'
    ],
    keyTextsOrManifestos: ['The Incoherence of Compulsory Limitation (William Gillis)', 'An Anarcho-Transhumanist FAQ (Gillis)'],
    spectrumPlacement: 'Far-Left Cyber-Anarchist / Techno-Liberationist',
    iconSymbol: '🧠🏴'
  },
  {
    id: 'cyberfeminism',
    name: 'Cyberfeminism',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Subverting patriarchal structures and gender binaries through cyberspace, internet networks, and digital technology.',
    definition: 'A feminist approach that emphasizes the relationship between cyberspace, the internet, and technology, viewing digital networks and cyborg technologies as revolutionary spaces to dismantle patriarchal power, traditional gender roles, and binary identities.',
    historicalOrigins: 'Formulated in the early 1990s by the Australian artist collective VNS Matrix and Donna Haraway\'s influential 1985 A Cyborg Manifesto.',
    coreTenets: [
      '"A Cyborg Manifesto": the cyborg breaks down the natural/artificial, male/female, and human/machine dichotomies',
      'Cyberspace as a decentralized, non-hierarchical frontier for radical feminist experimentation and identity liberation',
      'Critique of masculine domination over computer science, Silicon Valley tech culture, and digital infrastructure',
      'Digital direct action, net art, and subversion of corporate media'
    ],
    keyThinkers: ['Donna Haraway', 'Sadie Plant', 'VNS Matrix', 'Faith Wilding', 'Laboria Cuboniks (Xenofeminism)'],
    realWorldExamples: [
      {
        title: 'VNS Matrix & The Cyberfeminist Manifesto for the 21st Century',
        periodOrLocation: '1991 (Adelaide, Australia)',
        description: 'Pioneered provocative digital net-art and radical feminist virus aesthetics attacking patriarchal tech dominance.'
      },
      {
        title: 'Laboria Cuboniks: Xenofeminism (A Politics for Alienation)',
        periodOrLocation: '2015–Present (Global)',
        description: 'Collective articulating a techno-materialist feminism arguing "if nature is unjust, change nature!" through hormone biohacking and digital activism.'
      }
    ],
    economicModel: 'Open digital commons, open-source gender-affirming healthcare and hormone synthesis, decentralized digital cooperatives.',
    viewOfState: 'Critiques state-corporate patriarchal digital surveillance; builds decentralized feminist networks.',
    criticisms: [
      'Early 1990s cyber-utopianism was critiqued for overlooking the rapid corporate monetization and surveillance takeover of the web',
      'Can be heavily theoretical and academic in its linguistic style'
    ],
    keyTextsOrManifestos: ['A Cyborg Manifesto (Donna Haraway, 1985)', 'Zeros and Ones (Sadie Plant)', 'Xenofeminism: A Politics for Alienation (Laboria Cuboniks, 2015)'],
    spectrumPlacement: 'Radical Left Techno-Feminist / Cyber-Liberation',
    iconSymbol: '💻♀️'
  },
  {
    id: 'democratic-transhumanism',
    name: 'Democratic Transhumanism (Techno-Progressivism)',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Democratic regulation, public healthcare, and universal access to human enhancement technologies.',
    definition: 'An ideology synthesizing social democracy and progressive liberal values with transhumanism, asserting that emerging human enhancement technologies should be made universally accessible through democratic public institutions and universal healthcare, rather than being restricted to the wealthy.',
    historicalOrigins: 'Formulated in the late 1990s and early 2000s by sociologist James Hughes (author of Citizen Cyborg) and the Institute for Ethics and Emerging Technologies (IEET).',
    coreTenets: [
      'Universal Access: radical life extension, genetic disease prevention, and cognitive enhancements must be included in universal public health coverage',
      'Democratic Oversight: public regulation and safety testing of AI, nanotech, and genetic editing to prevent oligarchy and catastrophic risk',
      'Morphological Freedom guaranteed as a fundamental civil right within a constitutional democracy',
      'Technological Unemployment addressed through Universal Basic Income (UBI) and robot taxes'
    ],
    keyThinkers: ['James Hughes', 'George Dvorsky', 'David Pearce (Hedonistic Imperative)', 'Nick Bostrom'],
    realWorldExamples: [
      {
        title: 'Institute for Ethics and Emerging Technologies (IEET)',
        periodOrLocation: '2004–Present (USA & Global)',
        description: 'Think tank promoting techno-progressive public policy, ethical AI standards, and universal access to life-extension therapies.'
      },
      {
        title: 'Universal Basic Income & Automation Policy Debates in Europe & US',
        periodOrLocation: '2018–Present (Global)',
        description: 'Integration of UBI trials (Finland, Spain) as a direct policy response to AI-driven labor market disruption.'
      }
    ],
    economicModel: 'Universal Basic Income (UBI), public funding of longevity R&D, universal public health coverage for enhancements, progressive automation taxation.',
    viewOfState: 'A strong, democratic welfare state ensuring technological abundance and enhancements benefit all citizens equally.',
    criticisms: [
      'Free-market transhumanists argue government regulation will slow the pace of life-saving medical breakthroughs',
      'Bioconservatives argue public subsidies for genetic enhancements will institutionalize unnatural human engineering'
    ],
    keyTextsOrManifestos: ['Citizen Cyborg: Why Democratic Societies Must Respond to the Redesigned Human (James Hughes)', 'The Hedonistic Imperative (David Pearce)'],
    spectrumPlacement: 'Center-Left Techno-Progressive / Social Democratic',
    iconSymbol: '🏛️🧬'
  },
  {
    id: 'technogaianism',
    name: 'Technogaianism',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Restoring the Earth\'s biosphere through advanced clean technology, fusion, and bioengineering.',
    definition: 'An environmentalist stance that holds that developing new technology and restoring the Earth\'s environment are mutually compatible, and that advanced technologies—such as direct air carbon capture, fusion power, synthetic biology, and genetic de-extinction—are essential to repairing planetary ecosystems.',
    historicalOrigins: 'Late 20th century in futurist and ecological technology circles; championed by the Foresight Institute and ecomodernists.',
    coreTenets: [
      'Advanced engineering (nanotechnology, vertical farming, clean energy) can restore damaged ecosystems and heal the ozone/climate',
      'Genetic Rescue & De-Extinction: using CRISPR and synthetic biology to bring back keystone species (e.g., Woolly Mammoth) to restore ecosystems',
      'Direct Air Carbon Removal and planetary geoengineering to reverse ocean acidification and atmospheric warming',
      'Transition to circular closed-loop manufacturing without toxic waste'
    ],
    keyThinkers: ['K. Eric Drexler (nanotechnology pioneer)', 'George Church (synthetic biology)', 'Stewart Brand', 'Bruce Sterling (Viridian Design)'],
    realWorldExamples: [
      {
        title: 'Colossal Biosciences & De-Extinction Projects',
        periodOrLocation: '2021–Present (Dallas, USA)',
        description: 'Using multiplex CRISPR gene editing to revive the Woolly Mammoth and Tasmanian Tiger to restore Arctic tundra and forest biodiversity.'
      },
      {
        title: 'Climeworks & Direct Air Carbon Capture Facilities (Orca / Mammoth)',
        periodOrLocation: '2021–Present (Hellisheiði, Iceland)',
        description: 'Geothermal-powered industrial facilities capturing thousands of tons of CO2 directly from ambient air and mineralizing it permanently into basalt rock.'
      }
    ],
    economicModel: 'Clean-tech venture capital, carbon mineralization credits, public subsidies for fusion and synthetic biology research.',
    viewOfState: 'An active investor in planetary ecological restoration technologies and green infrastructure.',
    criticisms: [
      'Deep ecologists argue it fosters a dangerous techno-hubris, treating nature as an engineered machine rather than an organic web',
      'High energy and capital costs of scaling carbon capture technologies'
    ],
    keyTextsOrManifestos: ['Engines of Creation (K. Eric Drexler)', 'Regenesis: How Synthetic Biology Will Reinvent Nature and Ourselves (George Church)'],
    spectrumPlacement: 'Futurist Ecological / Green Ecomodernist',
    iconSymbol: '🌱⚙️'
  },
  {
    id: 'anti-fascism',
    name: 'Anti-Fascism (Antifa)',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Direct action, militant mobilization, and community resistance to deny fascists a platform.',
    definition: 'A decentralized political movement and philosophy composed of autonomous groups dedicated to confronting and combating fascism, neo-Nazism, white supremacy, and far-right authoritarianism through direct action, research, counter-demonstrations, and community defense.',
    historicalOrigins: 'Interwar Europe resisting Mussolini and Hitler (Arditi del Popolo in Italy 1921, Antifaschistische Aktion in Germany 1932, Cable Street in London 1936).',
    coreTenets: [
      '"No Platform for Fascists": preventing fascist organizing before it can grow into state power',
      'Direct Action: community self-defense, blocking fascist rallies, and unmasking/doxxing neo-Nazi organizers',
      'Decentralized, non-hierarchical organizing without central leadership or membership rosters',
      'Solidarity across diverse left-wing and anti-authoritarian tendencies'
    ],
    keyThinkers: ['Mark Bray', 'Giacomo Matteotti', 'Buenaventura Durruti', 'Clara Zetkin'],
    realWorldExamples: [
      {
        title: 'Battle of Cable Street',
        periodOrLocation: 'October 4, 1936 (London, United Kingdom)',
        description: 'Over 100,000 Jewish, Irish, socialist, and communist workers barricaded the East End, shouting "They Shall Not Pass!" (¡No pasarán!) to stop Oswald Mosley\'s British Union of Fascists.'
      },
      {
        title: 'Antifaschistische Aktion in Weimar Germany',
        periodOrLocation: '1932 (Berlin, Germany)',
        description: 'Founded the iconic two-flags logo to mobilize workers against Nazi SA stormtroopers.'
      }
    ],
    economicModel: 'Grassroots mutual aid, community bail funds, defense collectives, solidarity economics.',
    viewOfState: 'Deeply skeptical of police and state authorities, arguing the state frequently tolerates or collaborates with far-right elements.',
    criticisms: [
      'Criticized by liberals and conservatives for engaging in street clashes, property damage, and black bloc tactics',
      'Debates over free speech boundaries and whether violent counter-protest generates backlash'
    ],
    keyTextsOrManifestos: ['Antifa: The Anti-Fascist Handbook (Mark Bray)', 'Fascism and How to Fight It (Leon Trotsky)', 'Fighting Fascism (Clara Zetkin)'],
    spectrumPlacement: 'Left-Wing Militant Anti-Fascist Direct Action',
    iconSymbol: '🚩🏴'
  },
  {
    id: 'cosmopolitanism',
    name: 'Cosmopolitanism',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Citizens of the world: universal moral community transcending national borders.',
    definition: 'The ideology that all human beings belong to a single community, based on a shared morality. A person who adheres to the idea of cosmopolitanism in any of its forms is called a cosmopolitan or citizen of the world (Kosmopolitês).',
    historicalOrigins: 'Ancient Greece (Diogenes the Cynic: "I am a citizen of the world"), Stoicism (Marcus Aurelius, Seneca), and Immanuel Kant\'s Perpetual Peace (1795).',
    coreTenets: [
      'Universal moral equality: every human being on Earth has equal moral worth regardless of citizenship, ethnicity, or geography',
      'Global citizenship and open borders: freedom of movement across national frontiers',
      'Global governance institutions (UN, International Criminal Court) enforcing universal human rights',
      'Cosmopolitan law: obligations of hospitality and asylum for foreign travelers and refugees'
    ],
    keyThinkers: ['Diogenes the Cynic', 'Immanuel Kant', 'Kwame Anthony Appiah', 'Martha Nussbaum', 'David Held'],
    realWorldExamples: [
      {
        title: 'Universal Declaration of Human Rights (UDHR)',
        periodOrLocation: '1948 (United Nations, Paris)',
        description: 'Drafted by Eleanor Roosevelt and René Cassin, proclaiming inalienable rights belonging to every individual on Earth regardless of national state.'
      },
      {
        title: 'European Union Free Movement (Schengen Agreement)',
        periodOrLocation: '1985–Present (Europe)',
        description: 'Abolished border controls across 29 European countries, allowing over 400 million people to live, study, and work freely anywhere in the bloc.'
      }
    ],
    economicModel: 'Global free trade, international development aid, global carbon taxation, abolition of border tariffs and labor migration barriers.',
    viewOfState: 'Nation-states are temporary historical administrative units subordinate to universal human rights and international law.',
    criticisms: [
      'Nationalists argue cosmopolitanism is an elite luxury that detaches wealthy professionals from local community obligations ("Citizens of Nowhere")',
      'Can overlook local cultural nuances in favor of Western-centric universalist assumptions'
    ],
    keyTextsOrManifestos: ['Perpetual Peace: A Philosophical Sketch (Immanuel Kant, 1795)', 'Cosmopolitanism: Ethics in a World of Strangers (Kwame Anthony Appiah)', 'For Love of Country? (Martha Nussbaum)'],
    spectrumPlacement: 'Universalist Globalist / Center to Center-Left',
    iconSymbol: '🌐🕊️'
  },
  {
    id: 'situationism',
    name: 'Situationism',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Constructing authentic situations to shatter the alienation of the consumer "Society of the Spectacle".',
    definition: 'An avant-garde international movement of revolutionary theorists and artists (Situationist International, 1957–1972) led by Guy Debord, which argued that modern consumer capitalism transforms all authentic human life and relationships into mere representations and commodified spectacles.',
    historicalOrigins: 'Formed in Cosio d\'Arroscia, Italy in 1957; played a central intellectual role in the Paris May 1968 student-worker uprisings.',
    coreTenets: [
      '"The Society of the Spectacle": commodities and mass media reduce real human living into passive spectatorship ("Being into having, having into appearing")',
      'Détournement: hijacking corporate ads, comic strips, and propaganda to turn their messaging against consumer capitalism',
      'Psychogeography & The Dérive: drifting aimlessly through urban environments to experience the emotional terrain outside consumer logic',
      'Constructed Situations: creating moments of authentic life, play, and direct passion free from wage labor and commodities'
    ],
    keyThinkers: ['Guy Debord', 'Raoul Vaneigem', 'Asger Jorn', 'Michèle Bernstein', 'Constant Nieuwenhuys'],
    realWorldExamples: [
      {
        title: 'Paris General Strike & Student Uprising of May 1968',
        periodOrLocation: 'May 1968 (Paris, France)',
        description: '10 million French workers went on wildcat strike while students occupied the Sorbonne, plastering Paris with Situationist graffiti ("Under the paving stones, the beach!").'
      },
      {
        title: 'Culture Jamming & Adbusters Movement',
        periodOrLocation: '1990s–2011 (Global)',
        description: 'Used Situationist détournement to subvert corporate billboards, sparking the worldwide Occupy Wall Street movement in 2011.'
      }
    ],
    economicModel: 'Workers\' councils, abolition of wage labor and commodity exchange, total democratization of creative life and urban space.',
    viewOfState: 'An oppressive bureaucratic apparatus that protects the Spectacle and enforces alienated wage labor; must be destroyed by workers\' councils.',
    criticisms: [
      'Irony of history: Situationist aesthetic techniques (graffiti, culture jamming, irony) were ultimately absorbed and commodified by modern advertising agencies',
      'Prone to severe sectarian purges and internal ideological disputes'
    ],
    keyTextsOrManifestos: ['The Society of the Spectacle (Guy Debord, 1967)', 'The Revolution of Everyday Life (Raoul Vaneigem, 1967)'],
    spectrumPlacement: 'Far-Left Avant-Garde / Council Communist',
    iconSymbol: '🎭📢'
  },
  {
    id: 'radical-centrism',
    name: 'Radical Centrism',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Synthesizing bold, evidence-based solutions from across the spectrum to achieve systemic reform.',
    definition: 'A political philosophy that arose in Western nations in the late 20th century, seeking to fundamentally reform institutions by drawing the best ideas from both the political left and right (and beyond), rejecting dogmatic middle-of-the-road compromise in favor of radical, pragmatic problem-solving.',
    historicalOrigins: '1990s post-Cold War era (Ted Halstead, Michael Lind, Matthew Miller); influenced New Democrat and Blairite policy think tanks.',
    coreTenets: [
      '"Not left, not right, but forward": willing to adopt bold market solutions and strong government interventions simultaneously',
      'Evidence-based policymaking: RCTs (randomized controlled trials), data metrics, and pragmatic experimentation over ideological dogma',
      'Radical systemic institutional overhaul (e.g., replacing tax codes with consumption taxes + universal child endowments)',
      'Long-term intergenerational planning and fiscal sustainability'
    ],
    keyThinkers: ['Ted Halstead', 'Michael Lind', 'Matthew Miller', 'Thomas Friedman', 'Andrew Yang (Forward Party)'],
    realWorldExamples: [
      {
        title: 'New America Foundation & The Radical Centre',
        periodOrLocation: '1999–Present (Washington, USA)',
        description: 'Think tank pioneering ideas like universal childhood savings accounts (Baby Bonds), carbon dividend taxes, and healthcare exchanges.'
      },
      {
        title: 'Estonian E-Residency & Digital Statehood',
        periodOrLocation: '2000s–Present (Estonia)',
        description: 'Built a 99% digitized flat-tax government infrastructure, paperless parliament, and online voting combining market efficiency with public transparency.'
      }
    ],
    economicModel: 'Universal Basic Income or earned income expansions, market-based carbon dividends, portable employee benefits, flat/consumption tax reforms.',
    viewOfState: 'An agile, digital, transparent platform designed to empower individual enterprise and protect citizens against systemic shocks.',
    criticisms: [
      'Can lack a dedicated grassroots voting base, often relying heavily on affluent technocratic elites and think tanks',
      'Critics from both the Left and Right argue it avoids difficult class and power conflicts in society'
    ],
    keyTextsOrManifestos: ['The Radical Centre: The Ground Rules for an Emerging American Consensus (Halstead & Lind)', 'The Two Percent Solution (Matthew Miller)'],
    spectrumPlacement: 'Pragmatic Radical Center / Syncretic',
    iconSymbol: '🎯⚖️'
  },
  {
    id: 'third-way',
    name: 'Third Way (Centrist Social Democracy)',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Reconciling right-wing economic market dynamism with left-wing social justice and investment in human capital.',
    definition: 'A political philosophy and movement that seeks to reconcile right-wing economic policies (fiscal discipline, deregulation, free trade, public-private partnerships) with left-wing social policies (investments in education, healthcare, and equal opportunity), popularized in the 1990s.',
    historicalOrigins: 'Formulated in the 1990s by sociologist Anthony Giddens; adopted by Bill Clinton (New Democrats), Tony Blair (New Labour), and Gerhard Schröder (Die Neue Mitte).',
    coreTenets: [
      '"Hand-up, not a hand-out": welfare reform emphasizing job training, work requirements, and education ("Welfare-to-Work")',
      'Embrace of globalization, market competition, and fiscal discipline alongside public investments in health and education',
      'Public-Private Partnerships (PFI/PPP) to modernize schools, hospitals, and transit infrastructure without raising national debt',
      'Social inclusion and meritocracy rather than traditional socialist class struggle'
    ],
    keyThinkers: ['Anthony Giddens', 'Tony Blair', 'Bill Clinton', 'Gerhard Schröder', 'Peter Mandelson'],
    realWorldExamples: [
      {
        title: 'Tony Blair\'s "New Labour" in the United Kingdom',
        periodOrLocation: '1997–2007 (United Kingdom)',
        description: 'Rewrote Clause IV of the Labour Party constitution, introduced the National Minimum Wage, poured record billions into the NHS and schools, and gave the Bank of England independence.'
      },
      {
        title: 'Bill Clinton\'s "New Democrat" Presidency',
        periodOrLocation: '1993–2001 (USA)',
        description: 'Delivered four consecutive federal budget surpluses, created 22 million jobs, expanded the Earned Income Tax Credit (EITC), and passed NAFTA.'
      }
    ],
    economicModel: 'Dynamic market capitalism, public-private financing, Earned Income Tax Credits, education vouchers, targeted social investment.',
    viewOfState: 'An "enabling state" that equips citizens with education and skills to compete in the global knowledge economy.',
    criticisms: [
      'Left-wing critics (e.g., Jeremy Corbyn, Bernie Sanders) argued it capitulated to Thatcherite neoliberalism, deregulation, and bank privatization',
      'Tied in public memory to financial deregulation leading to the 2008 crash and the 2003 Iraq War'
    ],
    keyTextsOrManifestos: ['The Third Way: The Renewal of Social Democracy (Anthony Giddens, 1998)', 'The Third Way: New Politics for the New Century (Tony Blair)'],
    spectrumPlacement: 'Center to Center-Left Pragmatic Reformist',
    iconSymbol: '🛣️⚖️'
  },
  {
    id: 'post-left-anarchy',
    name: 'Post-Left Anarchy',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Rejecting leftist dogma, morality, organizational bureaucracy, and the work ethic.',
    definition: 'A current in anarchist thought that promotes a critique of the relationship between anarchism and traditional leftism (such as state-oriented politics, syndicalist workerism, ideological moralizing, and rigid political parties), advocating instead for individual insurrection, the abolition of work, and immediate personal autonomy.',
    historicalOrigins: 'United States in the 1980s–1990s through magazines like Anarchy: A Journal of Desire Armed and Fifth Estate (Bob Black, Wolfi Landstreicher, Hakim Bey).',
    coreTenets: [
      'Abolition of Work: replacing compulsory wage labor and industrial factories with creative play, craft, and voluntary productive activity',
      'Critique of the Left: rejecting leftist organizational bureaucracy, permanent committees, worker idolatry, and guilt-based moralism',
      'Insurrectionary Direct Action: spontaneous personal rebellion in the present moment rather than waiting for a distant mythical future revolution',
      'Temporary Autonomous Zones (TAZ): creating ephemeral pirate enclaves of wild freedom outside state surveillance'
    ],
    keyThinkers: ['Bob Black', 'Hakim Bey (Peter Lamborn Wilson)', 'Wolfi Landstreicher (Feral Faun)', 'Jason McQuinn', 'Max Stirner (philosophical ancestor)'],
    realWorldExamples: [
      {
        title: 'Temporary Autonomous Zones (TAZ) & Counter-Culture Enclaves',
        periodOrLocation: '1990s–Present (Global)',
        description: 'Free squats, underground warehouse raves, and intentional off-grid festival gatherings modeling non-hierarchical gift economies.'
      },
      {
        title: 'Bob Black\'s The Abolition of Work',
        periodOrLocation: '1985 (USA)',
        description: 'Influential essay translated into over 30 languages, inspiring the modern anti-work and post-labor philosophical movements.'
      }
    ],
    economicModel: 'Abolition of wage labor, gift economy, direct scavenging/squatting, uncoerced playful creation (Ludic activity).',
    viewOfState: 'An oppressive monster along with the traditional organized Left; both must be resisted through immediate creative autonomy.',
    criticisms: [
      'Social anarchists and syndicalists argue post-leftism is hyper-individualistic, lifestyle-oriented escapism that cannot organize millions of workers to challenge corporate power',
      'Controversial philosophical assertions in some fringe texts'
    ],
    keyTextsOrManifestos: ['The Abolition of Work and Other Essays (Bob Black, 1985)', 'TAZ: The Temporary Autonomous Zone (Hakim Bey, 1991)', 'Anarchy After Leftism (Bob Black)'],
    spectrumPlacement: 'Post-Left / Egoist Anarchist',
    iconSymbol: '🏴🎲'
  },
  {
    id: 'syncretic-politics',
    name: 'Syncretic Politics',
    category: 'Modern, Tech-Centric & Niche',
    tagline: 'Blending positions from opposing political spectra that are conventionally seen as incompatible.',
    definition: 'Politics that combine elements from different political philosophies, blending policies and values traditionally associated with both the political left and right to form a unique, non-traditional synthesis.',
    historicalOrigins: '19th and 20th century movements seeking alternatives to the standard Left-Right divide, including Sorelian syndicalism, Gaullism, and modern populisms.',
    coreTenets: [
      'Rejection of the traditional linear Left-Right political spectrum as outdated and divisive',
      'Combining left-wing economic welfare/protectionism with right-wing cultural conservatism or national sovereignty',
      'Pragmatic cherry-picking of policies based on popularity rather than strict party platforms',
      'Anti-establishment populist rhetoric appealing to dissatisfied voters from all traditional parties'
    ],
    keyThinkers: ['Georges Sorel', 'Charles de Gaulle', 'Alexander Dugin (Fourth Political Theory)', 'Contemporary Populist Theorists'],
    realWorldExamples: [
      {
        title: 'Five Star Movement (M5S) in Italy',
        periodOrLocation: '2009–Present (Italy)',
        description: 'Founded by comedian Beppe Grillo, combined environmentalism (left), direct internet democracy, universal basic income (left), with anti-immigration and Euroskepticism (right).'
      },
      {
        title: 'Gaullism in France',
        periodOrLocation: '1958–1969 (France)',
        description: 'Charles de Gaulle blended strong national pride, foreign policy independence, and social conservatism with state-led industrial planning and worker profit-sharing.'
      }
    ],
    economicModel: 'Varies widely; commonly features protection of domestic workers, national infrastructure investments, welfare benefits for native citizens, and tax breaks for small enterprises.',
    viewOfState: 'A popular, sovereign apparatus representing the authentic collective will of the people against entrenched party establishments.',
    criticisms: [
      'Prone to ideological incoherence, opportunism, and internal factional warfare',
      'Can easily be manipulated by demagogues who promise contradictory policies to different voter bases'
    ],
    keyTextsOrManifestos: ['The Fourth Political Theory (Aleksandr Dugin)', 'The Five Star Movement Manifesto (Beppe Grillo & Gianroberto Casaleggio)'],
    spectrumPlacement: 'Syncretic / Beyond Left-Right Spectrum',
    iconSymbol: '🔀🏛️'
  }
];
