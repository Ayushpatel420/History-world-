import { PoliticalIdeology } from '../../types';

export const RELIGIOUS_GOVERNANCE_IDEOLOGIES: PoliticalIdeology[] = [
  {
    id: 'sphere-sovereignty',
    name: 'Neo-Calvinism (Sphere Sovereignty)',
    category: 'Religious & Spiritual Governance',
    tagline: 'Autonomous societal spheres (family, church, state, academy) answerable directly to God without state dominance.',
    definition: 'A Christian political philosophy developed in the Netherlands by Abraham Kuyper and Herman Dooyeweerd, asserting that distinct societal spheres (family, church, science, business, arts) each possess their own God-given autonomy (sphere sovereignty) and must not be subordinated to total state control.',
    historicalOrigins: 'Late 19th-century Netherlands; Abraham Kuyper founded the Anti-Revolutionary Party (ARP) in 1879, the Vrije Universiteit Amsterdam, and served as Dutch Prime Minister.',
    coreTenets: [
      'Sphere Sovereignty (Soevereiniteit in eigen kring): each realm of life has autonomous divine authority',
      'Common Grace: God extends civil righteousness, scientific wisdom, and civic harmony to all humanity regardless of belief',
      'Anti-Statism & Anti-Totalitarianism: the state exists solely to adjudicate justice between spheres, not dictate religion or family life',
      'Pluralism and confessional civil society organizations (pillarization / Verzuiling)'
    ],
    keyThinkers: ['Abraham Kuyper', 'Herman Dooyeweerd', 'Guillaume Groen van Prinsterer', 'Alvin Plantinga', 'Nicholas Wolterstorff'],
    realWorldExamples: [
      {
        title: 'Pillarization (Verzuiling) in Dutch Democracy',
        periodOrLocation: '1880s–1960s (Netherlands)',
        description: 'Society organized into autonomous vertical pillars (Protestant, Catholic, Socialist, Liberal) with their own schools, trade unions, newspapers, and hospitals cooperating in parliament.'
      },
      {
        title: 'Anti-Revolutionary Party (ARP) Governance',
        periodOrLocation: '1901–1905 (Netherlands)',
        description: 'Abraham Kuyper served as Prime Minister, establishing financial equality for religious schools and opposing liberal centralized state schools.'
      }
    ],
    economicModel: 'Pluralist social economy, Christian labor associations (CNV), cooperative agrarian credit unions, protection of independent smallholder enterprises.',
    viewOfState: 'A servant of public justice that maintains outer boundaries and rule of law without encroaching on church, family, or academic sovereignty.',
    criticisms: [
      'Pillarization led to social segregation between different confessional communities',
      'Philosophical debates over how to resolve irreconcilable conflicts between autonomous spheres without state preeminence'
    ],
    keyTextsOrManifestos: ['Lectures on Calvinism (Abraham Kuyper)', 'A New Critique of Theoretical Thought (Herman Dooyeweerd)', 'Unbelief and Revolution (Groen van Prinsterer)'],
    spectrumPlacement: 'Center-Right Pluralist Christian Governance',
    iconSymbol: '✝️🌐'
  },
  {
    id: 'liberation-theology',
    name: 'Liberation Theology',
    category: 'Religious & Spiritual Governance',
    tagline: 'The gospel as revolutionary liberation for the oppressed, impoverished, and marginalized.',
    definition: 'A theological and socio-political movement that arose in Latin America in the late 1960s within the Catholic Church, emphasizing a biblical "preferential option for the poor" and analyzing poverty through the lens of social justice and structural liberation.',
    historicalOrigins: 'Medellín Bishops Conference (Colombia, 1968) and Gustavo Gutiérrez\'s A Theology of Liberation (1971).',
    coreTenets: [
      '"Preferential Option for the Poor": God stands with the oppressed, impoverished, and dispossessed',
      'Sin is not only individual but structural: unjust economic systems and military dictatorships are sinful structures',
      'Base Christian Communities (CEBs): grassroots Bible study and community mutual aid among peasants and workers',
      'Action and Praxis: faith must be lived out through active struggle for social, land, and economic justice'
    ],
    keyThinkers: ['Gustavo Gutiérrez', 'Archbishop Óscar Romero', 'Leonardo Boff', 'Jon Sobrino', 'Father Camilo Torres'],
    realWorldExamples: [
      {
        title: 'Archbishop Óscar Romero\'s Defense of the Poor in El Salvador',
        periodOrLocation: '1977–1980 (El Salvador)',
        description: 'Assassinated at the altar by right-wing death squads for preaching against military atrocities, land theft, and poverty; later canonized as a Catholic saint.'
      },
      {
        title: 'Nicaraguan Sandinista Revolution (1979)',
        periodOrLocation: '1979–1990 (Nicaragua)',
        description: 'Catholic priests (Ernesto Cardenal, Miguel d\'Escoto) served as government ministers in the revolutionary socialist government, organizing literacy drives.'
      }
    ],
    economicModel: 'Agrarian land redistribution, worker cooperatives, public healthcare and literacy, elimination of foreign debt subjugation.',
    viewOfState: 'Must be thoroughly transformed from an instrument of oligarchic violence into a servant of the poor and marginalized.',
    criticisms: [
      'Condemned during the Cold War by the Vatican (under Pope John Paul II and Cardinal Ratzinger) for adopting Marxist class struggle analysis',
      'Violently targeted and persecuted by US-backed military dictatorships in Central and South America'
    ],
    keyTextsOrManifestos: ['A Theology of Liberation (Gustavo Gutiérrez)', 'Church: Charism and Power (Leonardo Boff)', 'Medellín Conference Documents (1968)'],
    spectrumPlacement: 'Left-Wing Christian Liberation / Christian Socialist',
    iconSymbol: '✝️✊'
  },
  {
    id: 'hindu-nationalism',
    name: 'Hindu Nationalism (Hindutva)',
    category: 'Religious & Spiritual Governance',
    tagline: 'Cultural, civilizational, and political revitalization of Hindu identity (Hindutva) in India.',
    definition: 'A political and cultural ideology in India that seeks to define Indian culture in terms of Hindu values, asserting that the Indian subcontinent (Bharat) is the sacred homeland and ancestral civilization of the Hindu people.',
    historicalOrigins: 'Articulated in 1923 by Vinayak Damodar Savarkar in his pamphlet Hindutva: Who Is a Hindu?; organizational foundation of Rashtriya Swayamsevak Sangh (RSS) in 1925.',
    coreTenets: [
      'Hindutva ("Hinduness"): defining Indian nationhood through shared cultural, ancestral, and civilizational identity',
      'Protection of Hindu temples, Sanskrit heritage, sacred rivers (Ganga), and sacred cows',
      'Uniform Civil Code: replacing separate religious family laws with a single national civil code',
      'Fierce national defense and military strength against external and internal threats'
    ],
    keyThinkers: ['Vinayak Damodar Savarkar', 'K.B. Hedgewar (RSS founder)', 'M.S. Golwalkar', 'Deendayal Upadhyaya (Integral Humanism)', 'Narendra Modi'],
    realWorldExamples: [
      {
        title: 'Bharatiya Janata Party (BJP) Governance in India (Modi Era)',
        periodOrLocation: '2014–Present (India)',
        description: 'Consecration of the Ram Mandir in Ayodhya, revocation of Article 370 in Jammu & Kashmir, Citizenship Amendment Act (CAA), and massive digital infrastructure rollout.'
      },
      {
        title: 'Rashtriya Swayamsevak Sangh (RSS) Volunteer Network',
        periodOrLocation: '1925–Present (India)',
        description: 'World\'s largest voluntary civil organization with over 5 million active members running schools, disaster relief camps, and cultural Shakhas.'
      }
    ],
    economicModel: 'Swadeshi (economic self-reliance), Make in India manufacturing, digital public infrastructure (India Stack/UPI), welfare transfers for the rural poor.',
    viewOfState: 'A strong, sovereign civilizational state (Rashtra) that defends Dharma and Indian cultural interests globally.',
    criticisms: [
      'Critics and human rights groups argue it marginalizes religious minorities (Muslims, Christians) and erodes secular constitutional norms',
      'Tensions over communal polarization, cow-vigilante violence, and speech restrictions'
    ],
    keyTextsOrManifestos: ['Hindutva: Who Is a Hindu? (V.D. Savarkar)', 'Integral Humanism (Deendayal Upadhyaya)', 'Bunch of Thoughts (M.S. Golwalkar)'],
    spectrumPlacement: 'Right-Wing Cultural/Civilizational Nationalist',
    iconSymbol: '🕉️🚩'
  },
  {
    id: 'islamism',
    name: 'Islamism (Political Islam)',
    category: 'Religious & Spiritual Governance',
    tagline: 'Islam as a comprehensive political, legal, economic, and spiritual system for society.',
    definition: 'A diverse set of political ideologies holding that Islam should guide social and political as well as personal life, advocating for the implementation of Islamic principles, Sharia legal jurisprudence, and governance based on the Quran and Sunnah.',
    historicalOrigins: 'Early 20th century in Egypt (Muslim Brotherhood founded by Hassan al-Banna in 1928) and British India (Abul A\'la Maududi founded Jamaat-e-Islami in 1941).',
    coreTenets: [
      '"Islam is the Solution" (Al-Islam Huwa Al-Hal): comprehensive system of governance, morals, and law',
      'Implementation of Sharia (Islamic law) as the primary source of legislation',
      'Ummah solidarity: political and economic unity of the global Muslim community',
      'Resistance to Western cultural imperialism, secularism, and Zionist expansion'
    ],
    keyThinkers: ['Hassan al-Banna', 'Sayyid Qutb', 'Abul A\'la Maududi', 'Tariq Ramadan', 'Yusuf al-Qaradawi'],
    realWorldExamples: [
      {
        title: 'Muslim Brotherhood in Egypt & Arab World',
        periodOrLocation: '1928–Present (Middle East)',
        description: 'Built extensive networks of hospitals, charities, and schools; won democratic elections in Egypt in 2012 (Mohamed Morsi) before being removed in a 2013 military coup.'
      },
      {
        title: 'Ennahda Movement in Tunisia & AKP in Turkey',
        periodOrLocation: '2000s–Present (Tunisia & Turkey)',
        description: 'Participated in democratic elections, combining Islamic social values with electoral politics and economic development.'
      }
    ],
    economicModel: 'Islamic economics: Zakat wealth redistribution, abolition of usurious interest (Riba), Waqf charitable endowments, Islamic banking (Sukuk/profit-sharing).',
    viewOfState: 'An Islamic state (or constitutional democracy guided by Islamic principles) upholding social morality and religious justice.',
    criticisms: [
      'Radical jihadi offshoots (Al-Qaeda, ISIS) distorted political Islam into violent global terrorism',
      'Concerns regarding minority rights, freedom of conscience/apostasy, and women\'s civil status under strict Sharia interpretations'
    ],
    keyTextsOrManifestos: ['Milestones / Ma\'alim fi al-Tariq (Sayyid Qutb)', 'The Islamic Law and Constitution (Abul A\'la Maududi)', 'Messages of Hassan al-Banna'],
    spectrumPlacement: 'Religious Political / Conservative to Radical Islamist',
    iconSymbol: '☪️📖'
  },
  {
    id: 'islamic-democracy',
    name: 'Islamic Democracy',
    category: 'Religious & Spiritual Governance',
    tagline: 'Synthesis of democratic elections, rule of law, and Islamic moral and constitutional values.',
    definition: 'A political ideology that seeks to apply Islamic principles (such as Shura/consultation, Ijma/consensus, and Maslaha/public interest) to modern democratic governance, elections, human rights, and the rule of law.',
    historicalOrigins: 'Late 19th-century Islamic Modernism (Jamal al-Din al-Afghani, Muhammad Abduh) and post-Cold War Muslim democratic parties (e.g., Tunisia, Indonesia, Malaysia).',
    coreTenets: [
      'Shura (Consultation): Qur\'anic principle mandating representative democratic deliberation in public affairs',
      'Compatibility between Islam, human rights, rule of law, and constitutional democracy',
      'Civil state (Dawla Madaniyya) with an Islamic reference point, rejecting military dictatorships and theocratic mullahs',
      'Protection of religious minorities as equal citizens'
    ],
    keyThinkers: ['Rached Ghannouchi', 'Abdolkarim Soroush', 'Muhammad Abduh', 'Nurcholish Madjid', 'Mohammad Khatami'],
    realWorldExamples: [
      {
        title: 'Post-Suharto Democratic Transition in Indonesia',
        periodOrLocation: '1998–Present (Indonesia)',
        description: 'World\'s largest Muslim-majority country established a thriving multi-party democracy with major moderate Islamic parties (PKB, PAN) coexisting with secular parties.'
      },
      {
        title: 'Tunisian Constitution of 2014 & Ennahda Compromise',
        periodOrLocation: '2011–2019 (Tunisia)',
        description: 'Rached Ghannouchi led Ennahda to compromise with secularists, drafting an inclusive democratic constitution guaranteeing gender equality and freedom of conscience.'
      }
    ],
    economicModel: 'Mixed market economy, public investments in education and health, Islamic ethical finance, social welfare assistance.',
    viewOfState: 'A democratic constitutional republic that respects Islamic cultural values while ensuring popular sovereignty and civil rights.',
    criticisms: [
      'Hardline fundamentalists accuse it of abandoning pure divine law in favor of human legislation',
      'Secularists remain skeptical of whether religious parties will uphold pluralism if they win solid majorities'
    ],
    keyTextsOrManifestos: ['Public Freedoms in the Islamic State (Rached Ghannouchi)', 'Reason, Freedom, and Democracy in Islam (Abdolkarim Soroush)'],
    spectrumPlacement: 'Center to Center-Right Islamic Democratic',
    iconSymbol: '☪️🗳️'
  },
  {
    id: 'islamic-socialism',
    name: 'Islamic Socialism',
    category: 'Religious & Spiritual Governance',
    tagline: 'Egalitarian wealth distribution, anti-imperialism, and social justice grounded in Islamic teachings.',
    definition: 'A political philosophy that incorporates socialist principles—such as economic equality, anti-imperialism, public welfare, and collective ownership—into an Islamic religious and cultural framework, drawing on early Islamic egalitarian traditions.',
    historicalOrigins: 'Early 20th century in Russia/Central Asia (Mirsaid Sultan-Galiev), Egypt, Pakistan (Zulfikar Ali Bhutto), and Libya (Muammar Gaddafi).',
    coreTenets: [
      'Early Islamic figures like Abu Dharr al-Ghifari as pioneers of anti-wealth hoarding and worker rights',
      'Zakat interpreted as a radical progressive wealth tax to abolish poverty and monopoly capital',
      'Nationalization of natural mineral and oil wealth for the collective benefit of all Muslims',
      'Anti-colonial solidarity and third-world non-alignment'
    ],
    keyThinkers: ['Abu Dharr al-Ghifari (historical companion)', 'Mirsaid Sultan-Galiev', 'Ali Shariati', 'Zulfikar Ali Bhutto', 'Mustafa al-Siba\'i'],
    realWorldExamples: [
      {
        title: 'Pakistan Peoples Party (PPP) under Zulfikar Ali Bhutto',
        periodOrLocation: '1970–1977 (Pakistan)',
        description: '"Islam is our faith, democracy is our policy, socialism is our economy, all power to the people." Nationalized major industries and banks.'
      },
      {
        title: 'Ali Shariati & The Ideological Foundation of the Iranian Revolution',
        periodOrLocation: '1960s–1970s (Iran)',
        description: 'Synthesized Marxism with Shi\'a Islam (Red Shi\'ism vs. Black Shi\'ism), mobilizing young students against the pro-Western Shah.'
      }
    ],
    economicModel: 'Nationalized oil and heavy industry, land reform, free universal education, progressive taxation, Islamic state cooperatives.',
    viewOfState: 'A revolutionary republic dedicated to eradicating poverty, social class exploitation, and imperial domination.',
    criticisms: [
      'Orthodox clergy frequently attacked it as an unholy compromise with atheistic Marxism',
      'Often collapsed into personalist dictatorships or economic mismanagement'
    ],
    keyTextsOrManifestos: ['Socialism of Islam (Mustafa al-Siba\'i)', 'Marxism and Other Western Fallacies (Ali Shariati)', 'The Green Book (Muammar Gaddafi)'],
    spectrumPlacement: 'Left-Wing Islamic Liberation / Socialist',
    iconSymbol: '☪️🚩'
  },
  {
    id: 'buddhist-socialism',
    name: 'Buddhist Socialism',
    category: 'Religious & Spiritual Governance',
    tagline: 'Compassion (Karuna), non-attachment, eradication of suffering, and communal harmony.',
    definition: 'A political ideology that combines the spiritual teachings of Gautama Buddha—such as mindfulness, the alleviation of suffering (Dukkha), interdependence, and non-greed—with socialist economics, cooperative production, and peaceful welfare states.',
    historicalOrigins: '20th century in Burma/Myanmar (U Nu), Sri Lanka (S.W.R.D. Bandaranaike), India (B.R. Ambedkar\'s Navayana Buddhism), and Cambodia (Norodom Sihanouk).',
    coreTenets: [
      'Alleviation of human poverty is essential so people have the material security needed to meditate and seek enlightenment',
      'Capitalism encourages greed (Lobha), attachment, and exploitation, which fuel human suffering',
      'Ahimsa (Non-violence) and Karuna (Universal Compassion) as foundational state policies',
      'Ecology: living in harmony with all sentient beings and nature'
    ],
    keyThinkers: ['U Nu', 'B.R. Ambedkar', 'Buddhadasa Bhikkhu (Dhammic Socialism)', 'Norodom Sihanouk', 'Sulak Sivaraksa'],
    realWorldExamples: [
      {
        title: 'Burma under Prime Minister U Nu',
        periodOrLocation: '1948–1958 (Burma/Myanmar)',
        description: 'Established the Pyidawtha Plan (Welfare State Plan) blending Buddhist moral revival with state socialism, land reform, and healthcare.'
      },
      {
        title: 'Buddhadasa Bhikkhu\'s Dhammic Socialism in Thailand',
        periodOrLocation: '1970s–1990s (Suan Mokkh, Thailand)',
        description: 'Monk who taught that nature is inherently socialist (trees share sunlight and soil) and that human societies must mimic this natural balance.'
      },
      {
        title: 'Dr. B.R. Ambedkar\'s Dalit Buddhist Revival',
        periodOrLocation: '1956 (Nagpur, India)',
        description: 'Led millions of Dalit (untouchable) Indians to convert to Buddhism to escape Hindu caste oppression and fight for socialist equality.'
      }
    ],
    economicModel: 'Buddhist economics: right livelihood, cooperative agriculture, basic human needs met, minimization of hyper-consumerism and greed.',
    viewOfState: 'A compassionate, righteous state modeled on Emperor Ashoka\'s Dharma-rajya (rule of righteousness).',
    criticisms: [
      'Struggled against military coups (e.g., General Ne Win\'s 1962 coup in Burma) and communist insurgencies',
      'Can slide into Buddhist ethno-nationalism when weaponized against minority groups (e.g., in Sri Lanka and Myanmar)'
    ],
    keyTextsOrManifestos: ['Small Is Beautiful: Economics as if People Mattered (E.F. Schumacher - Buddhist chapter)', 'Dhammic Socialism (Buddhadasa Bhikkhu)', 'The Buddha and His Dhamma (B.R. Ambedkar)'],
    spectrumPlacement: 'Left-Wing Compassionate Religious Socialist',
    iconSymbol: '☸️🌱'
  },
  {
    id: 'dominionism',
    name: 'Dominionism (Christian Reconstructionism)',
    category: 'Religious & Spiritual Governance',
    tagline: 'Christian biblical dominion and theocracy over government, law, education, and culture.',
    definition: 'A group of Christian political ideologies that seek to institute a nation governed by Christians and based on their understandings of biblical law, believing Christians have a God-given mandate to exercise dominion over all spheres of society.',
    historicalOrigins: 'Founded in the 1970s by R.J. Rushdoony (Christian Reconstructionism) and expanded in the 2000s through the Seven Mountain Mandate.',
    coreTenets: [
      '"Seven Mountain Mandate": Christians must conquer and rule 7 spheres: Religion, Family, Education, Government, Media, Arts, and Business',
      'Theonomy: modern civil law must be replaced with the Old Testament Mosaic penal code',
      'Total opposition to secular humanism, abortion, LGBTQ+ rights, and separation of church and state',
      'Preparation for the Kingdom of God through earthly institutional control'
    ],
    keyThinkers: ['Rousas John Rushdoony', 'Gary North', 'Francis Schaeffer (influence)', 'Lance Wallnau (Seven Mountain Mandate)'],
    realWorldExamples: [
      {
        title: 'Chalcedon Foundation & The Christian Reconstructionist Movement',
        periodOrLocation: '1965–Present (USA)',
        description: 'Pioneered Christian homeschooling, influence on conservative legal organizations, and biblical jurisprudence.'
      },
      {
        title: 'Seven Mountain Dominionism in US Politics',
        periodOrLocation: '2016–Present (USA)',
        description: 'Influenced charismatic evangelical networks and political appointments seeking biblical governance in courts and state legislatures.'
      }
    ],
    economicModel: 'Strict biblical laissez-faire capitalism, elimination of public welfare (replaced by church charity), gold standard, abolition of property taxes.',
    viewOfState: 'A civil magistrate explicitly subordinate to God\'s biblical law, enforcing biblical punishments and protecting the church.',
    criticisms: [
      'Directly antithetical to constitutional democracy, pluralism, and the First Amendment establishment clause',
      'Advocates extreme penal measures (e.g., capital punishment for homosexuality, adultery, and apostasy)'
    ],
    keyTextsOrManifestos: ['The Institutes of Biblical Law (R.J. Rushdoony)', 'Invading Babylon: The 7 Mountain Mandate (Lance Wallnau & Bill Johnson)'],
    spectrumPlacement: 'Extreme Far-Right Theocratic Christian',
    iconSymbol: '✝️👑'
  },
  {
    id: 'sharia-governance',
    name: 'Sharia Governance',
    category: 'Religious & Spiritual Governance',
    tagline: 'Jurisprudence, ethics, and civil governance based on classical Islamic canonical law.',
    definition: 'A system of governance in which Islamic Sharia law—derived from the Quran, Hadith, Ijma (scholarly consensus), and Qiyas (analogical reasoning)—serves as the supreme legal, judicial, and moral framework of the state.',
    historicalOrigins: 'Early Islamic Caliphates (Rashidun, Umayyad, Abbasid, Ottoman) spanning the 7th to 20th centuries.',
    coreTenets: [
      'Maqasid al-Shariah: the five essential goals of preserving Faith, Life, Intellect, Lineage, and Wealth',
      'Application of classical jurisprudence across civil disputes, commercial contracts, family law, and penal codes (Hudud)',
      'Qadi (Islamic judge) courts deciding cases based on classical jurisprudential schools (Fiqh)',
      'Protection of non-Muslim monotheists (Dhimmi / modern protected minorities) under legal covenants'
    ],
    keyThinkers: ['Imam Abu Hanifa', 'Imam Malik', 'Imam al-Shafi\'i', 'Imam Ahmad ibn Hanbal', 'Imam al-Ghazali', 'Ibn Taymiyyah'],
    realWorldExamples: [
      {
        title: 'Classical Ottoman Empire & The Mecelle Civil Code',
        periodOrLocation: '1299–1922 (Istanbul & Middle East/Balkans)',
        description: 'Governed a multi-ethnic empire integrating Sharia courts with Kanun secular sultanic decrees and the Mecelle civil code.'
      },
      {
        title: 'Kingdom of Saudi Arabia Legal System',
        periodOrLocation: '1932–Present (Saudi Arabia)',
        description: 'Applies Hanbali Sharia jurisprudence as the primary law of the land in royal Sharia courts.'
      }
    ],
    economicModel: 'Prohibition of interest (Riba) and excessive uncertainty (Gharar), enforcement of contracts, charitable Waqf endowments, Zakat taxation.',
    viewOfState: 'The guardian of divine law and public welfare, tasked with enforcing justice and moral rectitude.',
    criticisms: [
      'Application of medieval corporal punishments (Hudud) violates modern international human rights charters',
      'Significant civil inequalities regarding women\'s inheritance and divorce rights under traditional interpretations'
    ],
    keyTextsOrManifestos: ['The Mecelle (Ottoman Civil Code)', 'Al-Mustasfa (Al-Ghazali)', 'The Muqaddimah (Ibn Khaldun)'],
    spectrumPlacement: 'Traditional Islamic Jurisprudential System',
    iconSymbol: '⚖️☪️'
  },
  {
    id: 'two-kingdoms-doctrine',
    name: 'Two Kingdoms Doctrine',
    category: 'Religious & Spiritual Governance',
    tagline: 'Separation of the spiritual kingdom of God from the worldly temporal kingdom of the state.',
    definition: 'A Protestant theological doctrine developed by Martin Luther and continued in Reformed thought, holding that God rules the world in two distinct ways: the spiritual kingdom through the Gospel and grace, and the temporal/worldly kingdom through secular government and the sword.',
    historicalOrigins: 'Protestant Reformation in Germany (Martin Luther\'s 1523 treatise Temporal Authority: To What Extent It Should Be Obeyed).',
    coreTenets: [
      'Spiritual Kingdom: governed by the Gospel, faith, and the Holy Spirit; handles salvation, conscience, and eternal life without coercion',
      'Temporal Kingdom: governed by secular law, civil magistrates, and the sword to restrain evil and maintain earthly peace and order',
      'Christians belong to both kingdoms and must obey secular civil authorities as long as they do not mandate sin',
      'The church must not wield the worldly sword, and the secular state must not force religious conscience'
    ],
    keyThinkers: ['Martin Luther', 'Philip Melanchthon', 'John Calvin (twofold government variant)', 'Dietrich Bonhoeffer'],
    realWorldExamples: [
      {
        title: 'Lutheran State Churches in Scandinavia (Denmark, Sweden, Norway)',
        periodOrLocation: '1530s–Present (Nordic Countries)',
        description: 'Established peaceful, secular civil administrations while maintaining church institutions separate from coercive police powers.'
      },
      {
        title: 'Dietrich Bonhoeffer & The Confessing Church Resistance',
        periodOrLocation: '1933–1945 (Germany)',
        description: 'Invoked the doctrine to argue that when the Nazi state becomes criminally evil, the church must "jam a spoke in the wheel" of the state.'
      }
    ],
    economicModel: 'Vocation (Beruf): every honest profession is a divine calling; support for civil laws protecting property and honest labor.',
    viewOfState: 'A legitimate divine institution designed to preserve civil peace and justice, but strictly limited from ruling over the human soul.',
    criticisms: [
      'Historically accused of fostering political passivity and obedience to authoritarian German regimes',
      'Debates over when civil disobedience becomes a moral duty when the temporal state becomes tyrannical'
    ],
    keyTextsOrManifestos: ['Temporal Authority: To What Extent It Should Be Obeyed (Martin Luther, 1523)', 'Ethics (Dietrich Bonhoeffer)'],
    spectrumPlacement: 'Protestant Separationist / Constitutionalist',
    iconSymbol: '✝️🏛️'
  }
];
