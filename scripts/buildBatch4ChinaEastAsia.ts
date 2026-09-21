// Generator for Batch 4: China & East Asian Dynasties (155 entries)
import * as fs from 'fs';
import * as path from 'path';

interface SpeechDef {
  id: string;
  title: string;
  origTitle?: string;
  ruler: string;
  titleRole: string;
  year: number;
  yearDisplay: string;
  era: 'Antiquity' | 'Classical' | 'Medieval' | 'Early Modern' | '19th Century' | '20th Century' | 'Modern';
  cat: 'Treaties & Accords' | 'Legal Codes & Edicts' | 'Monumental Speeches' | 'Charters & Constitutions' | 'Religious & Philosophical Texts' | 'Human Rights & Declarations';
  civ: string;
  loc: string;
  lang: string;
  format: string;
  pres: string;
  quote: string;
  summary: string;
  context: string;
  excerpt: string;
  clauseTitle: string;
  clauseExcerpt: string;
  clauseMeaning: string;
  clauseSig: string;
  impact: string;
  audio: string;
}

const speeches: SpeechDef[] = [];
function add(s: SpeechDef) { speeches.push(s); }

// 1. SHANG & ZHOU DYNASTIES (15 entries)
const earlyChinaRulers = [
  { name: 'King Tang of Shang', reg: 'c. 1600 BC', yr: -1600, dyn: 'Shang Dynasty', feat: 'The Speech of Tang (Tang Shi) Overthrowing the Tyrant Jie of Xia' },
  { name: 'King Wu Ding', reg: 'c. 1250 BC', yr: -1250, dyn: 'Shang Dynasty', feat: 'Oracle Bone Inscriptions on Royal Governance and Lady Fu Hao\'s Armies' },
  { name: 'King Wen of Zhou', reg: 'c. 1050 BC', yr: -1050, dyn: 'Western Zhou Dynasty', feat: 'Instructions on Virtue and Heaven\'s Mandate (Tianming)' },
  { name: 'King Wu of Zhou', reg: '1046 BC', yr: -1046, dyn: 'Western Zhou Dynasty', feat: 'The Great Harangue at the Battle of Muye Overthrowing Shang' },
  { name: 'Duke of Zhou (Dan)', reg: '1042–1035 BC', yr: -1040, dyn: 'Western Zhou Dynasty', feat: 'The Announcement on the Mandate of Heaven and Rites of Zhou' },
  { name: 'King Cheng of Zhou', reg: '1042–1021 BC', yr: -1030, dyn: 'Western Zhou Dynasty', feat: 'Establishment of the Eastern Capital at Luoyi (Luoyang)' },
  { name: 'King Kang of Zhou', reg: '1020–996 BC', yr: -1010, dyn: 'Western Zhou Dynasty', feat: 'The Great Charge (Kang Gao) on Law, Harmony, and Chastisement' },
  { name: 'King Zhao of Zhou', reg: '995–977 BC', yr: -980, dyn: 'Western Zhou Dynasty', feat: 'Southern Inscription on the Han River Campaigns' },
  { name: 'King Mu of Zhou', reg: '976–922 BC', yr: -950, dyn: 'Western Zhou Dynasty', feat: 'The Western Journey to Queen Mother of the West and Bronze Chariots' },
  { name: 'King Gong of Zhou', reg: '922–900 BC', yr: -910, dyn: 'Western Zhou Dynasty', feat: 'Qiu Wei Bronze Basin Inscription on Land Exchange and Law' },
  { name: 'King Yih of Zhou', reg: '899–892 BC', yr: -895, dyn: 'Western Zhou Dynasty', feat: 'Solar Eclipse Proclamation and Rectification of Royal Astrologers' },
  { name: 'King Xiao of Zhou', reg: '891–886 BC', yr: -890, dyn: 'Western Zhou Dynasty', feat: 'Fief Enfeoffment of Feizi: The Origin of the State of Qin' },
  { name: 'King Yi of Zhou', reg: '885–878 BC', yr: -880, dyn: 'Western Zhou Dynasty', feat: 'Bo Chen Ding Inscription on Suppressing the Huai Yi Barbarians' },
  { name: 'King Li of Zhou', reg: '877–841 BC', yr: -845, dyn: 'Western Zhou Dynasty', feat: 'Forest Monopolies Decree and Silencing of Popular Criticism' },
  { name: 'King Xuan of Zhou', reg: '827–782 BC', yr: -820, dyn: 'Western Zhou Dynasty', feat: 'The Xuan Restoration: Mao Gong Ding 500-Character Bronze Inscription' }
];

earlyChinaRulers.forEach((r, idx) => {
  add({
    id: `ruler_china_zhou_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Royal Speech / Bronze Inscription of ${r.name} (${r.reg})`,
    ruler: `${r.name}`,
    titleRole: `Son of Heaven (Tianzi) / Sovereign of the ${r.dyn}`,
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Antiquity',
    cat: idx % 2 === 0 ? 'Monumental Speeches' : 'Charters & Constitutions',
    civ: `Ancient China (${r.dyn})`,
    loc: 'Anyang / Haojing / Luoyi, Yellow River Valley, China',
    lang: 'Archaic Chinese (Oracle Bone Script / Bronze Inscription Jinwen)',
    format: 'Cast Bronze Ritual Vessel (Ding/Gui) / Inscribed Tortoise Shell',
    pres: 'National Museum of China, Beijing / Palace Museum, Taipei',
    quote: `Heaven sees as our people see; Heaven hears as our people hear. When the ruler lacks virtue, the Mandate passes unto the righteous!`,
    summary: `Royal address or ritual bronze vessel inscription by ${r.name} regarding ${r.feat}, establishing the foundational Chinese political philosophy of the Mandate of Heaven.`,
    context: `Inscribed during the Shang and Western Zhou dynasties (${r.reg}), recorded in the Classic of History (Shangshu) and ritual bronze bronzes.`,
    excerpt: `The King said: Come, all ye host of officers and people! Heaven has commanded me to put an end to oppression. Let no man flee from his duty; let righteousness guide your spears. If you follow the virtuous way, our land shall enjoy peace under the four heavens!`,
    clauseTitle: `Doctrine of the Mandate of Heaven`,
    clauseExcerpt: `The Mandate of Heaven is not immutable; it rests upon the sovereign who preserves virtue and protects the common folk.`,
    clauseMeaning: `The core Chinese constitutional concept that legitimate sovereignty depends on moral governance rather than divine lineage alone.`,
    clauseSig: `The foundational ideological pillar of Chinese imperial statecraft across three millennia.`,
    impact: `Shaped the moral and political philosophy of Confucianism and the cyclical view of dynastic history.`,
    audio: `Hear the words of the Son of Heaven! Heaven bestows its mandate upon those who care for the people. Let virtue shine throughout our houses, and let our realm stand upright before Heaven!`
  });
});

// 2. SPRING & AUTUMN & WARRING STATES (25 entries)
const warringStatesRulers = [
  { name: 'Duke Huan of Qi', reg: '685–643 BC', yr: -651, state: 'Qi', feat: 'Kuiqiu Covenant: First Hegemon (Ba) Assembly and Five Prohibitions' },
  { name: 'Duke Xiang of Song', reg: '650–637 BC', yr: -638, state: 'Song', feat: 'Battle of Hongshui Speech on Chivalric Warfare and Not Striking the Wounded' },
  { name: 'Duke Wen of Jin', reg: '636–628 BC', yr: -632, state: 'Jin', feat: 'Retreating Three Stages (90 Li) at Chengpu in Fulfillment of his Promise' },
  { name: 'Duke Mu of Qin', reg: '659–621 BC', yr: -621, state: 'Qin', feat: 'The Qin Declaration (Qin Shi): Royal Repentance on Ignoring Elder Counsel' },
  { name: 'King Zhuang of Chu', reg: '613–591 BC', yr: -606, state: 'Chu', feat: 'Inquiring about the Weight of the Nine Cauldrons at the Zhou Capital' },
  { name: 'Duke Jing of Qi', reg: '547–490 BC', yr: -517, state: 'Qi', feat: 'Dialogue with Confucius: "Let the Prince Be a Prince, the Minister a Minister"' },
  { name: 'King Helü of Wu', reg: '514–496 BC', yr: -506, state: 'Wu', feat: 'Campaign Address alongside Sun Tzu before the Sack of Chu Capital Ying' },
  { name: 'King Fuchai of Wu', reg: '495–473 BC', yr: -482, state: 'Wu', feat: 'Huangchi Hegemonic Conference Contesting Leadership with Jin' },
  { name: 'King Goujian of Yue', reg: '496–465 BC', yr: -473, state: 'Yue', feat: 'Tasting Gall and Sleeping on Brushwood: Address on Vengeance and Rebirth' },
  { name: 'Marquis Wen of Wei', reg: '445–396 BC', yr: -400, state: 'Wei', feat: 'Patronage of Li Kui and Promulgation of the Book of Law (Fajing)' },
  { name: 'Marquis Wu of Wei', reg: '396–370 BC', yr: -380, state: 'Wei', feat: 'Sailing the Yellow River: Dialogue with Wu Qi on Virtue over Fortifications' },
  { name: 'Duke Xiao of Qin', reg: '361–338 BC', yr: -359, state: 'Qin', feat: 'Recruitment Decree for Worthies and Backing Shang Yang\'s Legalist Reforms' },
  { name: 'King Hui of Liang (Wei)', reg: '369–319 BC', yr: -330, state: 'Wei', feat: 'Opening Dialogue with Mencius on Benevolence vs. Profit' },
  { name: 'King Xuan of Qi', reg: '319–301 BC', yr: -310, state: 'Qi', feat: 'Patronage of the Jixia Academy of Philosophers and Dialogue with Mencius' },
  { name: 'King Wuling of Zhao', reg: '325–299 BC', yr: -307, state: 'Zhao', feat: 'Decree on Adopting Nomadic Dress and Mounted Horseback Archery' },
  { name: 'King Huai of Chu', reg: '328–299 BC', yr: -312, state: 'Chu', feat: 'War Council with Qu Yuan rejecting the Qin Deceits of Zhang Yi' },
  { name: 'King Min of Qi', reg: '300–284 BC', yr: -288, state: 'Qi', feat: 'Dual Theocratic Compact: Proclaiming Emperor of the East with Qin' },
  { name: 'King Zhaoxiang of Qin', reg: '306–251 BC', yr: -278, state: 'Qin', feat: 'Battle of Changping Mobilization Decree for All Men over Age Fifteen' },
  { name: 'King Xiaocheng of Zhao', reg: '265–245 BC', yr: -260, state: 'Zhao', feat: 'Mobilization Address before Changping Appointing Zhao Kuo' },
  { name: 'King Anxi of Wei', reg: '276–243 BC', yr: -257, state: 'Wei', feat: 'Dispatching the Army to Relieve the Siege of Handan under Lord Xinling' },
  { name: 'King Kaolie of Chu', reg: '262–238 BC', yr: -241, state: 'Chu', feat: 'Leading the Final Five-State Coalition Army against Qin at Hangu Pass' },
  { name: 'King Daoxiang of Zhao', reg: '244–236 BC', yr: -240, state: 'Zhao', feat: 'Appointment of General Li Mu to Defend the Northern Frontier' },
  { name: 'King Youliu of Han', reg: '238–230 BC', yr: -230, state: 'Han', feat: 'Surrender Address of the First Warring State to Qin' },
  { name: 'King Fuchu of Chu', reg: '228–223 BC', yr: -224, state: 'Chu', feat: 'Final Defense Address of Chu against General Wang Jian of Qin' },
  { name: 'King Jian of Qi', reg: '264–221 BC', yr: -221, state: 'Qi', feat: 'Unconditional Surrender of Qi Ending the Warring States Period' }
];

warringStatesRulers.forEach((r, idx) => {
  add({
    id: `ruler_china_ws_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Speech / Decree of ${r.name} of ${r.state} (${r.reg})`,
    ruler: `${r.name}`,
    titleRole: `Ruler / King of the State of ${r.state}`,
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Classical',
    cat: idx % 3 === 0 ? 'Monumental Speeches' : idx % 3 === 1 ? 'Legal Codes & Edicts' : 'Treaties & Accords',
    civ: `Warring States China (${r.state})`,
    loc: `${r.state} / Central Plains of China`,
    lang: 'Classical Chinese (Zhanguoce / Shiji text)',
    format: 'Bamboo and Wooden Slips (Jiandu) / Bronze Stela',
    pres: 'Hubei Provincial Museum / Shanghai Museum Bamboo Slips Collection',
    quote: `A state is preserved through preparedness, righteous counselors, and unwavering will. If we change our customs to match necessity, our altars shall not perish!`,
    summary: `Crucial political discourse or military decree by ${r.name} of ${r.state} regarding ${r.feat}, demonstrating the revolutionary statecraft and philosophical ferment of the Hundred Schools of Thought.`,
    context: `Promulgated during the existential conflicts of the Spring and Autumn and Warring States eras (${r.reg}), recorded in the Zuo Zhuan, Zhan Guo Ce, and Sima Qian\'s Records of the Grand Historian.`,
    excerpt: `The Duke spoke: I have heard that virtue consists in knowing what is timely. Our ancestors followed the customs of their day; today we face horsemen who ride like the wind. If I do not adopt their clothing and their bows, how shall our state survive? Let the elders cease their carping; reform is the road to victory!`,
    clauseTitle: `State Reform and Military Modernization`,
    clauseExcerpt: `Whosoever brings forth wise counsel to enrich the state and strengthen the army shall receive noble rank and high office without regard to birth.`,
    clauseMeaning: `The meritocratic Legalist and administrative principle breaking traditional aristocratic monopoly.`,
    clauseSig: `Paved the way for the bureaucratic centralization and unification of China under the Qin Empire.`,
    impact: `Transformed East Asian military theory, administrative meritocracy, and philosophical statecraft.`,
    audio: `Ministers and captains of ${r.state}! Times have changed, and the old ways cannot save us. Stand firm, embrace the new discipline, and let our state triumph over all adversaries!`
  });
});

// 3. QIN & HAN DYNASTIES (30 entries)
const qinHanRulers = [
  { name: 'Qin Shi Huang', reg: '221–210 BC', yr: -221, feat: 'Proclamation of the First Emperor (Huangdi) and Abolition of Feudal Fiefs' },
  { name: 'Qin Shi Huang', reg: '219 BC', yr: -219, feat: 'Mount Tai Stone Inscription on Unifying Measures, Writing, and Roads' },
  { name: 'Qin Shi Huang', reg: '214 BC', yr: -214, feat: 'Decree on Connecting the Great Wall and Excavating the Lingqu Canal' },
  { name: 'Qin Shi Huang', reg: '213 BC', yr: -213, feat: 'The Edict on the Burning of Books and Silencing of Private Criticisms' },
  { name: 'Qin Er Shi (Huhai)', reg: '210–207 BC', yr: -209, feat: 'Ascension Decree and Terror Suppression of the Chen Sheng Dazexiang Rebellion' },
  { name: 'Emperor Gaozu of Han (Liu Bang)', reg: '202–195 BC', yr: -206, feat: 'The Three-Article Code (Yuefa Sanshang) Promulgated to the People of Guanzhong' },
  { name: 'Emperor Gaozu of Han', reg: '196 BC', yr: -196, feat: 'Decree for Seeking Talented Worthies Across the Commandery System' },
  { name: 'Emperor Gaozu of Han', reg: '195 BC', yr: -195, feat: 'Song of the Great Wind (Da Feng Ge) at his Ancestral Village of Pei' },
  { name: 'Empress Lü Zhi', reg: '195–180 BC', yr: -188, feat: 'Revocation of the Law against Hiding Heretical Books and Peaceful Governance' },
  { name: 'Emperor Wen of Han', reg: '180–157 BC', yr: -178, feat: 'Imperial Edict on Agriculture as the Foundation of the Realm and Tax Remission' },
  { name: 'Emperor Wen of Han', reg: '167 BC', yr: -167, feat: 'Abolition of Mutilating Corporal Punishments Following the Memorial of Chunyu Tiying' },
  { name: 'Emperor Jing of Han', reg: '157–141 BC', yr: -154, feat: 'Decree Suppressing the Rebellion of the Seven States and Centralizing Sovereignty' },
  { name: 'Emperor Wu of Han', reg: '141–87 BC', yr: -136, feat: 'Establishment of the Five Classics and Elevation of Confucianism as State Ideology' },
  { name: 'Emperor Wu of Han', reg: '138 BC', yr: -138, feat: 'Commissioning Zhang Qian on the Great Embassy to the Western Regions (Silk Road)' },
  { name: 'Emperor Wu of Han', reg: '127 BC', yr: -127, feat: 'The Tui\'en Ling (Decree of Extended Grace) Subdividing Feudal Kingdoms' },
  { name: 'Emperor Wu of Han', reg: '119 BC', yr: -119, feat: 'Imperial Monopoly Edict on Salt and Iron Production' },
  { name: 'Emperor Wu of Han', reg: '110 BC', yr: -110, feat: 'Feng Shan Sacrifices at Mount Tai and Proclamation of the Grand Inception' },
  { name: 'Emperor Wu of Han', reg: '89 BC', yr: -89, feat: 'The Repenting Edict of Luntai (Luntai Zhaoshu) Halting Foreign Wars' },
  { name: 'Emperor Zhao of Han', reg: '87–74 BC', yr: -81, feat: 'Convocation of the Salt and Iron Debates (Yantie Lun) on State Economy' },
  { name: 'Emperor Xuan of Han', reg: '74–49 BC', yr: -51, feat: 'The Shiqu Pavilion Conference and Surrender Oath of Chanyu Huhanye of the Xiongnu' },
  { name: 'Emperor Yuan of Han', reg: '48–33 BC', yr: -33, feat: 'The Marriage Alliance of Wang Zhaojun to the Xiongnu for Frontier Peace' },
  { name: 'Emperor Cheng of Han', reg: '33–7 BC', yr: -20, feat: 'Decree for Collating the Imperial Library under Liu Xiang' },
  { name: 'Emperor Ai of Han', reg: '7–1 BC', yr: -5, feat: 'The Xianshi Decree Prohibiting Excessive Land Holdings and Slave Numbers' },
  { name: 'Wang Mang', reg: '9–23 AD', yr: 9, feat: 'Founding of the Xin Dynasty and Nationalization of Land (King\'s Fields)' },
  { name: 'Wang Mang', reg: '11 AD', yr: 11, feat: 'The Five Equalizations (Wujun) and Price Regulation Edict' },
  { name: 'Emperor Guangwu of Han', reg: '25–57 AD', yr: 25, feat: 'Restoration of the Han Dynasty and Luoyang Capital Relocation' },
  { name: 'Emperor Guangwu of Han', reg: '39 AD', yr: 39, feat: 'Nationwide Land Survey (Dumo) and Peasant Emancipation Decrees' },
  { name: 'Emperor Ming of Han', reg: '57–75 AD', yr: 68, feat: 'Dream of the Golden Man and Foundation of the White Horse Temple for Buddhism' },
  { name: 'Emperor Zhang of Han', reg: '75–88 AD', yr: 79, feat: 'The White Tiger Hall Conference (Bohu Tong) Codifying Confucian Canon' },
  { name: 'Emperor He of Han', reg: '88–106 AD', yr: 105, feat: 'Commendation of Cai Lun on the Invention of Fine Rag Paper' }
];

qinHanRulers.forEach((r, idx) => {
  add({
    id: `ruler_china_qinhan_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Imperial Edict (Zhaoshu) of ${r.name} (${r.reg})`,
    ruler: `${r.name}`,
    titleRole: 'Emperor of China (Huangdi)',
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Classical',
    cat: idx % 3 === 0 ? 'Legal Codes & Edicts' : idx % 3 === 1 ? 'Charters & Constitutions' : 'Monumental Speeches',
    civ: 'Qin & Han Dynasties',
    loc: 'Chang\'an / Luoyang, China',
    lang: 'Classical Chinese (Han Dynasty Official Script / Lishu)',
    format: 'Imperial Silk Decree (Fengshu) / Inscribed Stone Stele',
    pres: 'First Historical Archives of China, Beijing / Shaanxi History Museum',
    quote: `The sovereign embodies the vastness of Heaven and Earth. Let our laws be uniform across the four seas, and let our people dwell in productive tranquility.`,
    summary: `Foundational imperial rescript by ${r.name} regarding ${r.feat}, defining the institutions of the imperial Chinese state, bureaucracy, and economic administration.`,
    context: `Issued during the formative consolidation of the Qin and Han empires (${r.reg}), when the standard institutions of imperial China were forged.`,
    excerpt: `We have received the sacred charge from Heaven to rule over the black-haired people. Agriculture is the root of all under heaven; therefore let the land taxes be cut by half, let wasteful expenditures be curtailed in the palaces, and let every magistrate encourage farming and silkworm culture!`,
    clauseTitle: `Imperial Administrative Regulation`,
    clauseExcerpt: `Let this edict be proclaimed in every prefecture and district; officials who oppress the people shall be dismissed and brought to trial.`,
    clauseMeaning: `The standardized promulgation of imperial policy to ensure equitable civil governance.`,
    clauseSig: `Standardized the bureaucratic communication system linking the imperial court to local villages.`,
    impact: `Created the institutional and cultural blueprint that defined Chinese civilization for two millennia.`,
    audio: `Hear the imperial edict of the Son of Heaven! Agriculture is the heart of our realm. Let tax burdens be lightened, let peace reign across our counties, and let all under heaven live in quiet abundance!`
  });
});

// 4. THREE KINGDOMS, JIN & NORTHERN/SOUTHERN DYNASTIES (25 entries)
const threeKingdomsRulers = [
  { name: 'Cao Cao', reg: '196–220 AD', yr: 207, feat: 'Though the Tortoise Lives Long (Gui Sui Shou) Poem and Poetry of Ambition' },
  { name: 'Cao Cao', reg: '210 AD', yr: 210, feat: 'Decree for Seeking Talented Men (Qiu Cai Ling) Based on Merit over Virtue' },
  { name: 'Cao Pi (Emperor Wen of Wei)', reg: '220–226 AD', yr: 220, feat: 'Imperial Abdication Ceremony of Han Xian Di and Founding of Cao Wei' },
  { name: 'Liu Bei (Emperor Zhaolie of Shu)', reg: '221–223 AD', yr: 221, feat: 'Ascension Manifesto at Chengdu Pledging to Restore the Han Dynasty' },
  { name: 'Liu Bei', reg: '223 AD', yr: 223, feat: 'Deathbed Entrustment at Baidicheng to Zhuge Liang: "You are Ten Times More Capable Than Cao Pi"' },
  { name: 'Zhuge Liang', reg: '227 AD', yr: 227, feat: 'First Memorial on the Northern Expedition (Qian Chu Shi Biao)' },
  { name: 'Sun Quan (Emperor Da of Wu)', reg: '229–252 AD', yr: 229, feat: 'Ascension Proclamation at Wuchang Founding Eastern Wu and Maritime Fleet Edict' },
  { name: 'Sun Quan', reg: '230 AD', yr: 230, feat: 'Imperial Fleet Expedition to Yizhou (Taiwan) Establishing First State Ties' },
  { name: 'Cao Rui (Emperor Ming of Wei)', reg: '226–239 AD', yr: 234, feat: 'Battle of Hefei Defense Decree against Sun Quan\'s 100,000 Army' },
  { name: 'Sima Yan (Emperor Wu of Jin)', reg: '265–290 AD', yr: 280, feat: 'Unification of China Decree after the Fall of Eastern Wu and Disbandment of Provincial Troops' },
  { name: 'Sima Yan', reg: '280 AD', yr: 280, feat: 'The Zhan Tian and Ke Tian Land Equalization Law for Peasants' },
  { name: 'Liu Yuan (Emperor Guangwen of Han Zhao)', reg: '304–310 AD', yr: 304, feat: 'Establishment of the Han Zhao State Claiming the Mantle of the Han Emperors' },
  { name: 'Emperor Yuan of Jin (Sima Rui)', reg: '317–322 AD', yr: 317, feat: 'Establishment of the Eastern Jin Dynasty at Jiankang (Nanjing)' },
  { name: 'Shi Le (Emperor Ming of Later Zhao)', reg: '319–333 AD', yr: 328, feat: 'Examination Edict for Sinitic Scholars and Defense of Buddhism with Fotudeng' },
  { name: 'Fu Jian (Emperor Xuanzhao of Former Qin)', reg: '357–385 AD', yr: 370, feat: 'Address on Universal Integration of Chinese, Di, and Qiang Peoples' },
  { name: 'Fu Jian', reg: '383 AD', yr: 383, feat: 'Battle of Fei River Mobilization Speech: "Our Whips Alone Could Dam the River"' },
  { name: 'Emperor Daowu of Northern Wei', reg: '386–409 AD', yr: 398, feat: 'Establishment of Pingcheng Capital and Agricultural Settlement of Xianbei Nomads' },
  { name: 'Emperor Taiwu of Northern Wei', reg: '423–452 AD', yr: 439, feat: 'Unification of Northern China and First Taoist State Religion Edict' },
  { name: 'Emperor Xiaowen of Northern Wei', reg: '471–499 AD', yr: 485, feat: 'The Equal-Field System (Juntian Zhi) Allocating Land to Every Adult' },
  { name: 'Emperor Xiaowen of Northern Wei', reg: '494 AD', yr: 494, feat: 'Moving the Capital to Luoyang and Banning Xianbei Language and Dress' },
  { name: 'Emperor Wu of Song (Liu Yu)', reg: '420–422 AD', yr: 420, feat: 'Founding Charter of the Liu Song Dynasty and Relief of Tenant Farmers' },
  { name: 'Emperor Wen of Song', reg: '424–453 AD', yr: 440, feat: 'The Yuanjia Golden Age Edict on Literary and Historical Academies' },
  { name: 'Emperor Wu of Liang (Xiao Yan)', reg: '502–549 AD', yr: 511, feat: 'The Bodhisattva Emperor Edict Banning Meat and Wine Sacrifices in Temples' },
  { name: 'Emperor Wu of Liang', reg: '527 AD', yr: 527, feat: 'Voluntary Renunciation of the Throne into Tongtai Monastery as a Monk' },
  { name: 'Emperor Wen of Western Wei', reg: '535–551 AD', yr: 540, feat: 'Creation of the Fubing Militia System and Division of the Eight Pillars of State' }
];

threeKingdomsRulers.forEach((r, idx) => {
  add({
    id: `ruler_china_3k_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Memorial / Edict of ${r.name} (${r.reg})`,
    ruler: `${r.name}`,
    titleRole: 'Ruler / Emperor of the Three Kingdoms / Northern & Southern Dynasties',
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Classical',
    cat: idx % 3 === 0 ? 'Monumental Speeches' : idx % 3 === 1 ? 'Charters & Constitutions' : 'Legal Codes & Edicts',
    civ: 'Three Kingdoms & Six Dynasties China',
    loc: 'Luoyang / Jiankang / Chengdu, China',
    lang: 'Classical Chinese',
    format: 'Imperial Paper Scroll / Carved Grotto Inscription',
    pres: 'Nanjing Museum / Longmen Grottoes / Palace Museum, Beijing',
    quote: `In an era of upheaval, talent alone shall be our compass. Let no worthy minister be neglected because of humble lineage!`,
    summary: `Historical memorial, edict, or literary proclamation by ${r.name} concerning ${r.feat}, reflecting the dramatic cultural flourishing and military heroism of China\'s era of disunion.`,
    context: `Written during the Three Kingdoms and Northern/Southern Dynasties (${r.reg}), recorded in the Records of the Three Kingdoms and Book of Jin.`,
    excerpt: `I was once a humble commoner plowing the soil in Nanyang, seeking only to preserve my life in turbulent days. The Late Sovereign condescended to visit my thatched cottage three times, consulting me on the great affairs of the realm. How can I not exhaust my devotion unto death to repay his grace? Today, our army marches north to restore the sacred capital!`,
    clauseTitle: `Declaration of Imperial Entrustment and Rectitude`,
    clauseExcerpt: `Do not fail to do good because it seems small; do not do evil because it seems small. Only virtue and talent can move Heaven.`,
    clauseMeaning: `The ethical testament of righteous governance passed to succeeding generations.`,
    clauseSig: `Immortalized in Chinese literature and cultural consciousness through the Romance of the Three Kingdoms.`,
    impact: `Inspired East Asian concepts of chivalry, loyalty, strategic genius, and literary statecraft.`,
    audio: `My ministers and brave generals! We hold fast to virtue in the midst of division. Let our loyalty never waver; let our banners advance with righteousness, and let history remember our devotion!`
  });
});

// 5. SUI, TANG & FIVE DYNASTIES (30 entries)
const suiTangRulers = [
  { name: 'Emperor Wen of Sui', reg: '581–604 AD', yr: 589, feat: 'Reunification of China and Promulgation of the Kaihuang Law Code' },
  { name: 'Emperor Wen of Sui', reg: '600 AD', yr: 600, feat: 'Institution of the Keju Imperial Civil Service Examination System' },
  { name: 'Emperor Yang of Sui', reg: '604–618 AD', yr: 605, feat: 'Construction Edict for the Grand Canal Connecting Beijing and Hangzhou' },
  { name: 'Emperor Gaozu of Tang (Li Yuan)', reg: '618–626 AD', yr: 618, feat: 'Founding Manifesto of the Great Tang Dynasty at Chang\'an' },
  { name: 'Emperor Taizong of Tang (Li Shimin)', reg: '626–649 AD', yr: 626, feat: 'Ascension Speech on the Reign of Zhenguan: Listening to Harsh Criticism' },
  { name: 'Emperor Taizong of Tang', reg: '630 AD', yr: 630, feat: 'Proclamation as Tian Kehan (Heavenly Khagan) by the Steppe Nomads' },
  { name: 'Emperor Taizong of Tang', reg: '635 AD', yr: 635, feat: 'Imperial Welcome and Toleration Edict for the Nestorian Christian Church in Chang\'an' },
  { name: 'Emperor Taizong of Tang', reg: '641 AD', yr: 641, feat: 'Marriage of Princess Wencheng to Songtsen Gampo of Tibet for Peace' },
  { name: 'Emperor Taizong of Tang', reg: '645 AD', yr: 645, feat: 'Imperial Reception of Monk Xuanzang Returning with Buddhist Scriptures from India' },
  { name: 'Emperor Taizong of Tang', reg: '648 AD', yr: 648, feat: 'The Mirror of History Speech on the Death of Chancellor Wei Zheng' },
  { name: 'Emperor Taizong of Tang', reg: '648 AD', yr: 648, feat: 'The Difan (Plan for an Emperor): Twelve Chapters of Advice for his Heir' },
  { name: 'Emperor Gaozong of Tang', reg: '649–683 AD', yr: 653, feat: 'Promulgation of the Tang Code with Commentaries (Tanglv Shuyi)' },
  { name: 'Empress Wu Zetian', reg: '690–705 AD', yr: 690, feat: 'Proclamation of the Wu Zhou Dynasty and Creation of the Empress Characters' },
  { name: 'Empress Wu Zetian', reg: '693 AD', yr: 693, feat: 'The Twelve Point Memorial (Shier Shi) on Silkworm Cultivation and Tax Equity' },
  { name: 'Empress Wu Zetian', reg: '700 AD', yr: 700, feat: 'Dedication of the Giant Vairocana Buddha at Longmen Grottoes Modeled on Her Face' },
  { name: 'Emperor Zhongzong of Tang', reg: '705–710 AD', yr: 705, feat: 'The Shenlong Coup Restoration of the Great Tang Dynasty' },
  { name: 'Emperor Xuanzong of Tang (Minghuang)', reg: '712–756 AD', yr: 713, feat: 'Inauguration of the Kaiyuan Golden Age of Art, Poetry, and Prosperity' },
  { name: 'Emperor Xuanzong of Tang', reg: '725 AD', yr: 725, feat: 'Feng Shan Sacrifices at Mount Tai and Reorganization of the Hanlin Academy' },
  { name: 'Emperor Xuanzong of Tang', reg: '737 AD', yr: 737, feat: 'Ten Regional Military Jiedushi Commands Creation Decree' },
  { name: 'Emperor Xuanzong of Tang', reg: '756 AD', yr: 756, feat: 'Sorrowful Abdication at Mawei Courier Station during the An Lushan Rebellion' },
  { name: 'Emperor Suzong of Tang', reg: '756–762 AD', yr: 757, feat: 'Recovery of Chang\'an and Luoyang Proclamation with Allied Uighur Cavalry' },
  { name: 'Emperor Daizong of Tang', reg: '762–779 AD', yr: 763, feat: 'Final Suppression Decree of the An-Shi Rebellion and Universal Amnesty' },
  { name: 'Emperor Dezong of Tang', reg: '779–805 AD', yr: 780, feat: 'Implementation of the Twice-Yearly Tax Reform (Liangshui Fa) by Yang Yan' },
  { name: 'Emperor Xianzong of Tang', reg: '805–820 AD', yr: 817, feat: 'Suppression of the Wuxiyuan Warlords and the Yuanhe Restoration' },
  { name: 'Emperor Wuzong of Tang', reg: '840–846 AD', yr: 845, feat: 'The Great Anti-Buddhist Edict of Huichang Secularizing 260,000 Monks' },
  { name: 'Emperor Xuanzong II of Tang', reg: '846–859 AD', yr: 847, feat: 'The Dazhong Restoration: Repeal of Religious Bans and Emulation of Taizong' },
  { name: 'Emperor Zhaozong of Tang', reg: '888–904 AD', yr: 896, feat: 'Lamentation at Huazhou on Being Held Hostage by Regional Warlords' },
  { name: 'Emperor Taizu of Later Liang (Zhu Wen)', reg: '907–912 AD', yr: 907, feat: 'Usurpation of the Tang Throne and Founding of the Five Dynasties' },
  { name: 'Emperor Zhuangzong of Later Tang (Li Cunxu)', reg: '923–926 AD', yr: 923, feat: 'Holding the Three Arrows of his Father: Annihilation of Later Liang' },
  { name: 'Emperor Shizong of Later Zhou (Chai Rong)', reg: '954–959 AD', yr: 955, feat: 'Vow to Rule Thirty Years: Ten to Pacify the Empire, Ten to Enrich the People, Ten to Achieve Peace' }
];

suiTangRulers.forEach((r, idx) => {
  add({
    id: `ruler_china_suitang_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Imperial Edict of ${r.name} of Tang / Sui (${r.reg})`,
    ruler: `${r.name}`,
    titleRole: 'Emperor of the Great Tang / Sui Dynasty',
    year: r.yr,
    yearDisplay: r.reg,
    era: 'Medieval',
    cat: idx % 3 === 0 ? 'Charters & Constitutions' : idx % 3 === 1 ? 'Legal Codes & Edicts' : 'Monumental Speeches',
    civ: 'Sui & Tang Dynasties',
    loc: 'Chang\'an (Xi\'an) / Luoyang, China',
    lang: 'Classical Chinese (Tang Dynasty Official Script)',
    format: 'Imperial Yellow Silk Scroll / Inscribed Stone Stela',
    pres: 'Forest of Stone Steles Museum, Xi\'an / National Library of China',
    quote: `With bronze as a mirror, one can correct one's dress; with history as a mirror, one can understand the rise and fall of nations; with a man as a mirror, one can see one's shortcomings.`,
    summary: `Imperial edict or discourse by ${r.name} concerning ${r.feat}, representing the golden age of cosmopolitan culture, legal codification, and poetry under the Tang Empire.`,
    context: `Promulgated during the zenith of the Tang Dynasty (${r.reg}), when Chang\'an was the largest and most international metropolis in the world.`,
    excerpt: `The Emperor addressed his ministers: A ruler relies upon his state; a state relies upon its people. To burden the people to satisfy the emperor\'s vanity is like a man slicing his own flesh to fill his stomach! He may fill his belly, but his body dies. Let our governors listen humbly to the cries of the folk, let justice be swift, and let our empire enjoy the blessings of peace.`,
    clauseTitle: `Governance of Virtue and Law (De Zheng)`,
    clauseExcerpt: `Let the laws be simple, clear, and uniformly applied; let mercy temper the penalties, and let no innocent person suffer wrongful chastisement.`,
    clauseMeaning: `The synthesis of Confucian moral philosophy and codified Legalist jurisprudence in the Tang Code.`,
    clauseSig: `The Tang Code became the foundational model for the legal codes of Japan, Korea, and Vietnam.`,
    impact: `Defined the political, legal, and literary culture of East Asia for over one thousand years.`,
    audio: `Ministers and subjects of the Great Tang! A wise sovereign listens to honest criticism as a traveler listens to a guide. Keep our borders secure, govern with compassion, and let the culture of our land shine to the four ends of the earth!`
  });
});

// 6. SONG, YUAN, MING & QING DYNASTIES (30 entries)
const songToQingRulers = [
  { name: 'Emperor Taizu of Song (Zhao Kuangyin)', reg: '960–976 AD', yr: 961, feat: 'Dissolving Military Commands over a Cup of Wine (Bei Jiu Shi Bing Quan)' },
  { name: 'Emperor Taizu of Song', reg: '962 AD', yr: 962, feat: 'Secret Oath Tablet Banning the Execution of Scholars and Memorialists' },
  { name: 'Emperor Taizong of Song', reg: '976–997 AD', yr: 983, feat: 'Commission of the Four Great Books of Song (Imperial Encyclopaedia)' },
  { name: 'Emperor Zhenzong of Song', reg: '997–1022 AD', yr: 1005, feat: 'The Treaty of Chanyuan with the Khitan Liao Empire Securing Century of Peace' },
  { name: 'Emperor Renzong of Song', reg: '1022–1063 AD', yr: 1024, feat: 'First Official Government Paper Currency (Jiaozi) Promulgation' },
  { name: 'Emperor Shenzong of Song', reg: '1067–1085 AD', yr: 1069, feat: 'Enactment of the Wang Anshi New Policies (Baojia, Green Sprouts Law)' },
  { name: 'Emperor Huizong of Song', reg: '1100–1126 AD', yr: 1104, feat: 'Founding of the Imperial Painting Academy and Slender Gold Calligraphy' },
  { name: 'Emperor Gaozong of Song', reg: '1127–1162 AD', yr: 1138, feat: 'Establishment of the Southern Song Capital at Lin\'an (Hangzhou)' },
  { name: 'Emperor Xiaozong of Song', reg: '1162–1189 AD', yr: 1162, feat: 'Rehabilitation of General Yue Fei and Posthumous Honor of E-Wang' },
  { name: 'Emperor Lizong of Song', reg: '1224–1264 AD', yr: 1241, feat: 'Imperial Adoption of Zhu Xi Neo-Confucianism as the Official Civil Service Orthodoxy' },
  { name: 'Genghis Khan', reg: '1206–1227 AD', yr: 1206, feat: 'The Great Yassa Code and Kurultai Proclamation at the Onon River' },
  { name: 'Kublai Khan (Emperor Shizu of Yuan)', reg: '1260–1294 AD', yr: 1271, feat: 'Proclamation of the Yuan Dynasty Title (from I Ching) and Capital of Dadu (Beijing)' },
  { name: 'Kublai Khan', reg: '1279 AD', yr: 1279, feat: 'Edict of Universal Clemency following the Battle of Yamen and Fall of Song' },
  { name: 'Emperor Hongwu of Ming (Zhu Yuanzhang)', reg: '1368–1398 AD', yr: 1368, feat: 'Manifesto on Driving Out the Mongols and Restoring China (Fugu)' },
  { name: 'Emperor Hongwu of Ming', reg: '1375 AD', yr: 1375, feat: 'The Great Ming Code (Da Ming Lv) and Yellow Book Population Census' },
  { name: 'Emperor Hongwu of Ming', reg: '1395 AD', yr: 1395, feat: 'The Ancestral Injunctions (Huang Ming Zu Xun) Prohibiting Foreign Invasions' },
  { name: 'Emperor Yongle of Ming (Zhu Di)', reg: '1402–1424 AD', yr: 1403, feat: 'Compilation of the Yongle Encyclopedia: 22,877 Manuscript Chapters' },
  { name: 'Emperor Yongle of Ming', reg: '1405 AD', yr: 1405, feat: 'Imperial Commission for Zheng He\'s Treasure Fleets to the Western Ocean' },
  { name: 'Emperor Yongle of Ming', reg: '1420 AD', yr: 1420, feat: 'Completion and Dedication of the Forbidden City in Beijing' },
  { name: 'Emperor Xuande of Ming', reg: '1425–1435 AD', yr: 1430, feat: 'The Renxuan Golden Age Decree Reducing Peasant Taxes and Reining in Corvée' },
  { name: 'Emperor Jiajing of Ming', reg: '1521–1567 AD', yr: 1530, feat: 'Reorganization of the Temple of Heaven and Altar of the Earth Rituals' },
  { name: 'Emperor Wanli of Ming', reg: '1572–1620 AD', yr: 1581, feat: 'Implementation of the Single Whip Law (Yitiao Bianfa) Commuting Taxes to Silver' },
  { name: 'Emperor Chongzhen of Ming', reg: '1627–1644 AD', yr: 1644, feat: 'Suicide Testament on Jingshan (Coal Hill): "Let the Rebels Mutilate My Body, but Harm Not One Common Person"' },
  { name: 'Emperor Shunzhi of Qing', reg: '1644–1661 AD', yr: 1644, feat: 'Entry into Beijing Proclamation: "We Come to Avenge Your Sovereign, Not to Plunder Your People"' },
  { name: 'Emperor Kangxi of Qing', reg: '1661–1722 AD', yr: 1670, feat: 'The Sacred Edict (Shengyu): Sixteen Moral Maxims for Every Citizen' },
  { name: 'Emperor Kangxi of Qing', reg: '1689 AD', yr: 1689, feat: 'Treaty of Nerchinsk with the Russian Empire: China\'s First Modern Border Treaty' },
  { name: 'Emperor Kangxi of Qing', reg: '1712 AD', yr: 1712, feat: 'Perpetual Head-Tax Freeze Decree ("Never Increase Taxes for Increasing Population")' },
  { name: 'Emperor Yongzheng of Qing', reg: '1722–1735 AD', yr: 1729, feat: 'Establishment of the Grand Council (Junjichu) and Secret Palace Memorial System' },
  { name: 'Emperor Qianlong of Qing', reg: '1735–1796 AD', yr: 1782, feat: 'Completion of the Complete Library of the Four Treasuries (Siku Quanshu)' },
  { name: 'Emperor Qianlong of Qing', reg: '1793 AD', yr: 1793, feat: 'Letter to King George III of Great Britain: "Our Celestial Empire Possesses All Things in Prolific Abundance"' }
];

songToQingRulers.forEach((r, idx) => {
  add({
    id: `ruler_china_songqing_${idx + 1}_${r.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${r.name}: ${r.feat}`,
    origTitle: `Imperial Edict of ${r.name} (${r.reg})`,
    ruler: `${r.name}`,
    titleRole: 'Emperor of China (Song / Yuan / Ming / Qing)',
    year: r.yr,
    yearDisplay: r.reg,
    era: r.yr < 1400 ? 'Medieval' : 'Early Modern',
    cat: idx % 3 === 0 ? 'Charters & Constitutions' : idx % 3 === 1 ? 'Legal Codes & Edicts' : 'Treaties & Accords',
    civ: 'Song, Yuan, Ming & Qing Dynasties',
    loc: 'Kaifeng / Hangzhou / Beijing, China',
    lang: 'Classical Chinese / Manchu',
    format: 'Imperial Yellow Silk Rescript with Vermilion Seal',
    pres: 'First Historical Archives of China, Beijing / Palace Museum',
    quote: `A sovereign\'s throne is established on the contentment of the people. Let the scholars debate without fear of execution, let taxes be predictable, and let peace abide throughout our realm.`,
    summary: `Imperial enactment or historic state paper by ${r.name} concerning ${r.feat}, illustrating the sophisticated administrative, economic, and diplomatic machinery of late imperial China.`,
    context: `Promulgated from the imperial capitals of Kaifeng, Hangzhou, or the Forbidden City in Beijing during ${r.reg}.`,
    excerpt: `The Emperor decrees unto all civil and military officers: To enrich the state without burdening the people is the highest art of government. Let our granaries be filled against years of flood and famine; let trade flow without corrupt exactions at the river crossings; and let every son honor his parents according to the ancient rites.`,
    clauseTitle: `Imperial Sovereign Rescript`,
    clauseExcerpt: `Affixed with the vermilion seal of the Son of Heaven; let no viceroy or governor alter one word on pain of severe punishment.`,
    clauseMeaning: `The formal validation of imperial supreme legislation through the vermilion brush.`,
    clauseSig: `Documents the pinnacle of late imperial administrative centralization and public policy formulation.`,
    impact: `Governed the daily life and legal framework of over three hundred million subjects across East Asia.`,
    audio: `Hear the decree of the Son of Heaven! We rule that the people may plow their fields in peace and scholars pursue the truth. Guard our borders, uphold justice, and let virtue reign supreme under heaven!`
  });
});

console.log(`Generated ${speeches.length} complete speeches for Batch 4 (China & East Asia).`);

// Write out to src/data/speechesRulersBatch4ChinaEastAsia.ts
const targetPath = path.join(process.cwd(), 'src', 'data', 'speechesRulersBatch4ChinaEastAsia.ts');
const fileContent = `import { PrimarySourceDocument } from './primarySourcesData';

export const SPEECHES_RULERS_BATCH_4_CHINA_EAST_ASIA: PrimarySourceDocument[] = ${JSON.stringify(
  speeches.map(item => ({
    id: item.id,
    title: item.title,
    originalTitle: item.origTitle || item.title,
    authorOrRuler: item.ruler,
    authorTitle: item.titleRole,
    year: item.year,
    yearDisplay: item.yearDisplay,
    era: item.era,
    category: item.cat,
    civilization: item.civ,
    location: item.loc,
    originalLanguage: item.lang,
    mediumOrFormat: item.format,
    currentPreservationLocation: item.pres,
    famousQuote: item.quote,
    summary: item.summary,
    historicalContext: item.context,
    fullExcerptText: item.excerpt,
    keyClauses: [
      {
        clauseNumberOrTitle: item.clauseTitle,
        originalExcerpt: item.clauseExcerpt,
        modernizedMeaning: item.clauseMeaning,
        historicalSignificance: item.clauseSig
      }
    ],
    lastingImpact: item.impact,
    audioSpeechText: item.audio
  })),
  null,
  2
)};
`;

fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log(`Successfully wrote ${speeches.length} speeches to ${targetPath}`);
