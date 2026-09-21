import { PoliticalIdeology } from '../../types';

export const NATIONALISM_IDENTITY_IDEOLOGIES: PoliticalIdeology[] = [
  {
    id: 'nationalism',
    name: 'Nationalism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Sovereignty, self-determination, and shared collective identity of the nation-state.',
    definition: 'An ideology and movement that promotes the interests of a particular nation, especially with the aim of gaining and maintaining the nation\'s sovereignty over its homeland, holding that each nation should govern itself.',
    historicalOrigins: 'Originated in 18th-century Europe, crystallized during the French Revolution (1789) and the 1848 Spring of Nations.',
    coreTenets: [
      'Self-determination: the nation is the only legitimate basis for political sovereignty',
      'The borders of the state should be congruent with the cultural or civic nation',
      'National loyalty, patriotism, and unity prioritized over partisan or international divisions',
      'Preservation of national culture, language, and historical narrative'
    ],
    keyThinkers: ['Jean-Jacques Rousseau', 'Johann Gottfried von Herder', 'Giuseppe Mazzini', 'Ernest Renan', 'Benedict Anderson'],
    realWorldExamples: [
      {
        title: 'Italian Risorgimento (National Unification)',
        periodOrLocation: '1815–1871 (Italy)',
        description: 'Giuseppe Mazzini and Giuseppe Garibaldi unified fragmented kingdoms and duchies into a sovereign Italian nation-state.'
      },
      {
        title: 'Post-WWI Wilsonian Self-Determination & Dissolution of Empires',
        periodOrLocation: '1918–1923 (Central & Eastern Europe)',
        description: 'Collapse of Austro-Hungarian, Ottoman, and Russian empires led to the creation of independent sovereign republics (Poland, Czechoslovakia, Finland).'
      }
    ],
    economicModel: 'National economic sovereignty, infrastructure development, domestic industrial protection or national market integration.',
    viewOfState: 'The supreme political manifestation and protector of the national community.',
    criticisms: [
      'Can escalate into aggressive militarism, chauvinism, xenophobia, and devastating interstate wars',
      'Minority groups within nation-states may face forced assimilation or persecution'
    ],
    keyTextsOrManifestos: ['What is a Nation? (Renan)', 'Imagined Communities (Anderson)', 'Nations and Nationalism (Ernest Gellner)'],
    spectrumPlacement: 'Variable across Spectrum (Civic to Ethnic Variants)',
    iconSymbol: '🚩🗺️'
  },
  {
    id: 'civic-nationalism',
    name: 'Civic Nationalism (Liberal Nationalism)',
    category: 'Nationalism & Identity-Based',
    tagline: 'Nationhood based on shared citizenship, constitutional loyalty, and democratic values.',
    definition: 'A non-xenophobic form of nationalism that adheres to traditional liberal values of freedom, tolerance, equality, and individual rights, defining national identity by political participation and allegiance to the constitution rather than ethnicity.',
    historicalOrigins: 'French and American Revolutions (1776, 1789); articulated by Ernest Renan in 1882 ("a daily plebiscite").',
    coreTenets: [
      'Nation defined by shared political values, democracy, and the rule of law',
      'Open to any individual regardless of ancestry who accepts the constitutional framework',
      'Inclusivity, equal legal rights, and civic integration through education',
      'Patriotism based on constitutional loyalty rather than blood and soil'
    ],
    keyThinkers: ['Ernest Renan', 'John Stuart Mill', 'Jürgen Habermas (Constitutional Patriotism)', 'Michael Ignatieff', 'David Miller'],
    realWorldExamples: [
      {
        title: 'United States "Creedal Nation" & Naturalization System',
        periodOrLocation: '1787–Present (USA)',
        description: 'Immigrants from across the globe become equal citizens by swearing an oath of allegiance to the US Constitution.'
      },
      {
        title: 'French Republican Model of Citizenship',
        periodOrLocation: '1789–Present (France)',
        description: 'Defines all French citizens strictly by universal republican values and equality before the law, rejecting ethnic census categories.'
      }
    ],
    economicModel: 'National market economy with equal economic opportunities, public funding for civic education, and integrated transport infrastructure.',
    viewOfState: 'A democratic republic that unites a diverse citizenry under a common legal constitution and democratic institutions.',
    criticisms: [
      'Critics argue purely abstract civic loyalty lacks the deep emotional warmth of shared ancestral culture',
      'Can sometimes suppress regional cultural differences under uniform national standards'
    ],
    keyTextsOrManifestos: ['What is a Nation? (Ernest Renan)', 'Blood and Belonging (Michael Ignatieff)', 'On Nationality (David Miller)'],
    spectrumPlacement: 'Center to Center-Left Democratic Nationalist',
    iconSymbol: '🗽📜'
  },
  {
    id: 'ethnic-nationalism',
    name: 'Ethnic Nationalism (Ethnonationalism)',
    category: 'Nationalism & Identity-Based',
    tagline: 'Nationhood defined strictly by shared ancestry, bloodline, language, and genetic heritage.',
    definition: 'A form of nationalism wherein the nation and nationality are defined in terms of ethnicity, emphasizing that nations are defined by a shared ancestral heritage, common language, genetic lineage, and inherited cultural tradition.',
    historicalOrigins: 'German Romanticism (Johann Gottfried von Herder, Johann Gottlieb Fichte) in opposition to universalist French Enlightenment ideals.',
    coreTenets: [
      'The nation is defined by common blood, ancestral heritage, and native language',
      'Citizenship and political sovereignty should be reserved for members of the ethnic group',
      'Preservation of ethnic identity, genealogical purity, and native homeland',
      'Skepticism of multi-ethnic societies and mass foreign immigration'
    ],
    keyThinkers: ['Johann Gottlieb Fichte', 'Heinrich von Treitschke', 'Anthony D. Smith'],
    realWorldExamples: [
      {
        title: 'Balkan Wars & Dissolution of Yugoslavia',
        periodOrLocation: '1991–1999 (Balkans)',
        description: 'Ethnic nationalist mobilization led to the violent splintering of Yugoslavia into ethnic nation-states (Croatia, Serbia, Bosnia, Slovenia).'
      },
      {
        title: 'Jus Sanguinis Citizenship Laws (Historical Germany & Japan)',
        periodOrLocation: '19th–20th Century (Central Europe & East Asia)',
        description: 'Granting nationality based on ancestral bloodline rather than place of birth (jus soli).'
      }
    ],
    economicModel: 'National preference in employment, state protection of domestic native-owned businesses and land.',
    viewOfState: 'The biological and cultural guardian of a specific ethnic group; foreigners cannot truly belong to the body politic.',
    criticisms: [
      'Historically linked to ethnic cleansing, forced expulsions, pogroms, and genocide',
      'Inherently exclusionary toward minority populations living within national borders'
    ],
    keyTextsOrManifestos: ['Addresses to the German Nation (Fichte)', 'The Ethnic Origins of Nations (Anthony D. Smith)'],
    spectrumPlacement: 'Right-Wing to Far-Right Ethnocentric',
    iconSymbol: '🛡️🌳'
  },
  {
    id: 'cultural-nationalism',
    name: 'Cultural Nationalism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Nationhood defined by shared cultural traditions, language, and customs rather than blood.',
    definition: 'A form of nationalism in which the nation is defined by a shared culture and a common language, rather than purely on the concepts of common ancestry (race) or mere political citizenship.',
    historicalOrigins: 'Johann Gottfried von Herder\'s concept of the "Volksgeist" (Spirit of the People) in late 18th-century Germany.',
    coreTenets: [
      'The nation is bound together by shared language, folklore, literature, music, and customs',
      'Immigrants can assimilate into the nation by adopting the culture and language',
      'Rejection of purely biological definitions of nationhood in favor of cultural flourishing',
      'Revival and defense of native linguistic traditions and indigenous arts'
    ],
    keyThinkers: ['Johann Gottfried von Herder', 'Douglas Hyde (Gaelic League)', 'Taras Shevchenko'],
    realWorldExamples: [
      {
        title: 'Gaelic Revival in Ireland',
        periodOrLocation: '1890s–1920s (Ireland)',
        description: 'Douglas Hyde and the Gaelic League revived the Irish language, Gaelic sports, and folklore, laying the foundation for Irish independence.'
      },
      {
        title: 'Quebec Cultural Nationalism & Bill 101',
        periodOrLocation: '1960s–Present (Quebec, Canada)',
        description: 'Quiet Revolution established French as the sole official language, protecting Québécois culture within North America.'
      }
    ],
    economicModel: 'Subsidies for national arts, language institutions, domestic media quotas, protection of cultural industries.',
    viewOfState: 'A protective shelter dedicated to cultivating and defending the unique cultural and linguistic legacy of the nation.',
    criticisms: [
      'Can exert assimilationist pressure on sub-cultural and minority traditions',
      'Boundary between cultural and ethnic nationalism can blur during political crises'
    ],
    keyTextsOrManifestos: ['Reflections on the Philosophy of the History of Mankind (Herder)', 'The Necessity for De-Anglicising Ireland (Douglas Hyde)'],
    spectrumPlacement: 'Center-Left to Center-Right Cultural Nationalist',
    iconSymbol: '🎭📖'
  },
  {
    id: 'left-wing-nationalism',
    name: 'Left-Wing Nationalism (Socialist Patriotism)',
    category: 'Nationalism & Identity-Based',
    tagline: 'Anti-imperialist self-determination, socialist economy, and international solidarity.',
    definition: 'A form of nationalism based upon national self-determination, popular sovereignty, and socialist economic principles, viewing the struggle for national liberation as inseparable from the struggle against capitalist exploitation and colonialism.',
    historicalOrigins: 'Anti-colonial independence movements in Ireland (James Connolly), Scotland (SNP left), Latin America, and Africa in the 20th century.',
    coreTenets: [
      'National liberation from imperialist domination and colonial occupation',
      'Egalitarian socialist or social-democratic economic development',
      'Inclusive, civic definition of nationality welcoming all who live in the homeland',
      'Internationalist solidarity with all oppressed nations worldwide'
    ],
    keyThinkers: ['James Connolly', 'Frantz Fanon', 'Amílcar Cabral', 'Ho Chi Minh', 'Subhas Chandra Bose'],
    realWorldExamples: [
      {
        title: 'James Connolly & Irish Citizen Army in the 1916 Easter Rising',
        periodOrLocation: '1916 (Dublin, Ireland)',
        description: 'Fought for an independent Irish Socialist Republic: "The cause of labour is the cause of Ireland, the cause of Ireland is the cause of labour."'
      },
      {
        title: 'Scottish National Party (SNP) & Plaid Cymru',
        periodOrLocation: '1970s–Present (Scotland & Wales)',
        description: 'Advocates for national independence and European Union membership with anti-austerity social democratic public policies.'
      },
      {
        title: 'African Party for the Independence of Guinea and Cape Verde (PAIGC)',
        periodOrLocation: '1956–1974 (Guinea-Bissau & Cape Verde)',
        description: 'Amílcar Cabral led a victorious national liberation war against Portuguese colonial rule, building rural socialist clinics and schools.'
      }
    ],
    economicModel: 'Public control of natural resources, national development banking, cooperatives, social welfare programs.',
    viewOfState: 'A liberated sovereign republic committed to worker empowerment and freedom from foreign corporate subjugation.',
    criticisms: [
      'Tension between socialist internationalism and nationalist particularism',
      'Post-independence states sometimes struggled to maintain democratic institutions under external pressures'
    ],
    keyTextsOrManifestos: ['Labour in Irish History (Connolly)', 'The Wretched of the Earth (Fanon)', 'Revolution in Guinea (Amílcar Cabral)'],
    spectrumPlacement: 'Left-Wing Anti-Colonial / Democratic Socialist',
    iconSymbol: '🚩🌍'
  },
  {
    id: 'pan-africanism',
    name: 'Pan-Africanism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Unity, liberation, self-reliance, and continental solidarity for all African peoples.',
    definition: 'A worldwide movement that aims to encourage and strengthen bonds of solidarity between all indigenous and diaspora ethnic groups of African descent, advocating for a united Africa free from neo-colonialism.',
    historicalOrigins: 'Late 19th and early 20th centuries among the African diaspora (Edward Wilmot Blyden, W.E.B. Du Bois, Marcus Garvey) and African independence leaders (Kwame Nkrumah).',
    coreTenets: [
      'Total political and economic unification of the African continent ("Africa must unite")',
      'Liberation of all African people from colonialism, apartheid, and neo-colonial exploitation',
      'Reclaiming African cultural dignity, history, and philosophical heritage',
      'Solidarity between continental Africans and the global African diaspora'
    ],
    keyThinkers: ['Kwame Nkrumah', 'W.E.B. Du Bois', 'Marcus Garvey', 'Thomas Sankara', 'Patrice Lumumba', 'Cheikh Anta Diop'],
    realWorldExamples: [
      {
        title: 'Organization of African Unity (OAU) & African Union (AU)',
        periodOrLocation: '1963–Present (Addis Ababa, Ethiopia)',
        description: 'Continental body coordinating anti-apartheid campaigns, regional economic integration, and peacekeeping.'
      },
      {
        title: 'Ghana under Kwame Nkrumah',
        periodOrLocation: '1957–1966 (Ghana)',
        description: 'First sub-Saharan African nation to gain independence, becoming the intellectual hub for liberation movements across the continent.'
      },
      {
        title: 'Burkina Faso under Thomas Sankara',
        periodOrLocation: '1983–1987 (Burkina Faso)',
        description: 'Vaccinated 2.5 million children, planted 10 million trees to stop desertification, achieved food self-sufficiency, and advanced women\'s rights.'
      }
    ],
    economicModel: 'Continental free trade (AfCFTA), state-led infrastructure development, Pan-African sovereign wealth funds, self-reliant agrarian cooperatives.',
    viewOfState: 'A federal or confederal United States of Africa capable of defending continental sovereignty on the world stage.',
    criticisms: [
      'Deep national, linguistic, and regional divisions between African states have delayed full political integration',
      'Foreign debt and persistent geopolitical interference from global superpowers'
    ],
    keyTextsOrManifestos: ['Africa Must Unite (Kwame Nkrumah)', 'Neo-Colonialism: The Last Stage of Imperialism (Nkrumah)', 'The Souls of Black Folk (Du Bois)'],
    spectrumPlacement: 'Left-Wing Pan-Nationalist / Anti-Imperialist',
    iconSymbol: '🌍⭐'
  },
  {
    id: 'pan-arabism',
    name: 'Pan-Arabism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Unification of the Arab peoples and nations from the Atlantic Ocean to the Arabian Sea.',
    definition: 'An ideology that espouses the unification of the countries of North Africa and Western Asia from the Atlantic Ocean to the Arabian Sea, which is referred to as the Arab world, asserting that Arabs constitute a single nation.',
    historicalOrigins: 'Late 19th-century Arab Awakening (Nahda) against Ottoman rule; peaked in the 1950s–1960s under Gamal Abdel Nasser and the Ba\'ath Party.',
    coreTenets: [
      'The Arab world constitutes one indivisible nation sharing common language, history, and culture',
      'Abolition of artificial borders drawn by European colonial powers (Sykes-Picot Agreement of 1916)',
      'Total liberation of Palestine and resistance to foreign imperialism',
      'Modernization, industrialization, and secular Arab unity'
    ],
    keyThinkers: ['Michel Aflaq', 'Gamal Abdel Nasser', 'Sati\' al-Husri', 'Zaki al-Arsuzi', 'Constantin Zureiq'],
    realWorldExamples: [
      {
        title: 'United Arab Republic (UAR)',
        periodOrLocation: '1958–1961 (Egypt & Syria)',
        description: 'Historic political merger of Egypt and Syria into a unified sovereign Arab republic under Nasser.'
      },
      {
        title: 'Arab League (League of Arab States)',
        periodOrLocation: '1945–Present (Cairo, Egypt)',
        description: 'Regional organization of 22 Arab countries facilitating political coordination and economic agreements.'
      }
    ],
    economicModel: 'Arab Socialism / State-led national industrialization, agrarian reform, sharing of petroleum resources for regional development.',
    viewOfState: 'A single unified Arab federal republic replacing fragmented post-colonial states.',
    criticisms: [
      'Rivalries between Arab leaders (e.g., Nasser vs. Iraqi/Syrian Ba\'athists vs. Gulf monarchies) prevented permanent union',
      'Marginalized non-Arab ethnic minorities living in the region (Kurds, Berbers/Amazigh, Nubians)'
    ],
    keyTextsOrManifestos: ['The Battle for One Destiny (Michel Aflaq)', 'The Philosophy of the Revolution (Nasser)', 'What is Arab Nationalism? (Sati\' al-Husri)'],
    spectrumPlacement: 'Syncretic Left-Nationalist / Pan-Nationalist',
    iconSymbol: '🦅☪️'
  },
  {
    id: 'pan-asianism',
    name: 'Pan-Asianism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Unity, cultural solidarity, and anti-imperial cooperation among the peoples of Asia.',
    definition: 'An ideology that promotes the political and economic unity and cooperation of Asian peoples, originally emerging as an anti-colonial solidarity movement against Western imperialism.',
    historicalOrigins: 'Late 19th and early 20th centuries in Japan, India, and China (Rabindranath Tagore, Sun Yat-sen, Okakura Kakuzo).',
    coreTenets: [
      '"Asia is one": shared spiritual and philosophical heritage (Buddhism, Confucianism, Taoism, Hinduism)',
      'Anti-colonial resistance to Western European and American hegemony in Asia',
      'Economic and technological cooperation among Asian sovereign nations',
      'Mutual defense and cultural exchange'
    ],
    keyThinkers: ['Okakura Kakuzo', 'Sun Yat-sen', 'Rabindranath Tagore', 'Rash Behari Bose', 'Kikuchi Dairoku'],
    realWorldExamples: [
      {
        title: 'Greater East Asia Conference (1943) & Early Anti-Colonial Alliances',
        periodOrLocation: '1943 (Tokyo, Japan)',
        description: 'Gathering of Asian leaders (Subhas Chandra Bose, Ba Maw, Wang Jingwei) demanding independence from Western empires, though tainted by Japanese wartime imperialism.'
      },
      {
        title: 'Bandung Conference (Asian-African Conference of 1955)',
        periodOrLocation: '1955 (Bandung, Indonesia)',
        description: 'Historic meeting of 29 newly independent Asian and African nations promoting economic cooperation and opposing colonialism, founding the Non-Aligned Movement.'
      },
      {
        title: 'ASEAN & Asian Regional Economic Integration',
        periodOrLocation: '1967–Present (Southeast Asia)',
        description: 'Economic partnership driving peaceful diplomatic cooperation and free trade across Southeast Asia.'
      }
    ],
    economicModel: 'Asian developmental state capitalism, high savings/investment rates, regional trade partnerships (RCEP), technological manufacturing.',
    viewOfState: 'Sovereign Asian nations cooperating in regional security and economic confederations.',
    criticisms: [
      'Historically co-opted by Imperial Japan\'s "Greater East Asia Co-Prosperity Sphere" to mask brutal military conquest',
      'Geopolitical tensions between major powers (e.g., China, India, Japan) hinder comprehensive political unification'
    ],
    keyTextsOrManifestos: ['The Ideals of the East (Okakura Kakuzo)', 'Pan-Asianism Speech (Sun Yat-sen, 1924)', 'Nationalism (Rabindranath Tagore)'],
    spectrumPlacement: 'Syncretic Anti-Imperial Pan-Nationalist',
    iconSymbol: '🌏✨'
  },
  {
    id: 'pan-slavism',
    name: 'Pan-Slavism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Cultural and political unity of all Slavic peoples across Eastern and Southern Europe.',
    definition: 'A 19th-century political and cultural movement aimed at fostering unity, cultural kinship, and political solidarity among all Slavic nations and peoples (Russians, Poles, Czechs, Serbs, Ukrainians, Bulgarians, etc.).',
    historicalOrigins: 'Began in the early 19th century in Bohemia (Prague Slavic Congress of 1848) and gained momentum in Imperial Russia as patron of Balkan Slavs.',
    coreTenets: [
      'Slavic peoples share a common linguistic, cultural, and spiritual heritage',
      'Liberation of South and West Slavs from Ottoman and Austro-Hungarian imperial rule',
      'Brotherhood and cultural exchange among Slavic nations',
      'Debate between democratic federalism (Czech model) and Russian imperial leadership'
    ],
    keyThinkers: ['František Palacký', 'Mikhail Bakunin (early Pan-Slav phase)', 'Nikolay Danilevsky', 'Ljudevit Gaj', 'Vuk Karadžić'],
    realWorldExamples: [
      {
        title: 'Prague Slavic Congress of 1848',
        periodOrLocation: '1848 (Prague, Bohemia)',
        description: 'First gathering of Slavic representatives from across Europe calling for mutual cooperation and equal rights within the Austrian Empire.'
      },
      {
        title: 'Russo-Turkish War & Liberation of Bulgaria',
        periodOrLocation: '1877–1878 (Balkans)',
        description: 'Russian military intervention driven by Pan-Slavic sentiment liberated Bulgaria, Serbia, and Montenegro from Ottoman control.'
      }
    ],
    economicModel: 'Cooperative agriculture, traditional Slavic communal institutions (Mir / Zadruga), state-supported railway development.',
    viewOfState: 'Varies from a democratic confederation of free Slavic republics to Russian-led imperial leadership.',
    criticisms: [
      'Often viewed by non-Russian Slavs (especially Poles) as a cover for Russian imperial expansion and Russification',
      'Religious divisions between Catholic, Orthodox, and Muslim Slavs created severe internal tensions'
    ],
    keyTextsOrManifestos: ['Russia and Europe (Nikolay Danilevsky)', 'Manifesto of the Slavic Congress (František Palacký, 1848)'],
    spectrumPlacement: '19th-Century Cultural & Imperial Nationalist',
    iconSymbol: '🦅🌟'
  },
  {
    id: 'black-nationalism',
    name: 'Black Nationalism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Self-determination, economic autonomy, cultural pride, and empowerment for Black people.',
    definition: 'A political and social movement that seeks to acquire economic, cultural, and political self-determination and empowerment for Black people, especially in the United States and the African diaspora.',
    historicalOrigins: '19th-century abolitionism (Martin Delany), 1920s UNIA (Marcus Garvey), and the 1960s Black Power movement (Malcolm X, Black Panther Party).',
    coreTenets: [
      'Black self-reliance, community control of schools, police, and local commerce',
      'Reclaiming African cultural heritage, pride, and historical identity ("Black is Beautiful")',
      'Armed community self-defense against racial violence and police brutality',
      'Economic independence through Black-owned businesses, credit unions, and cooperatives'
    ],
    keyThinkers: ['Martin Delany', 'Marcus Garvey', 'Malcolm X (El-Hajj Malik El-Shabazz)', 'Huey P. Newton', 'Stokely Carmichael (Kwame Ture)'],
    realWorldExamples: [
      {
        title: 'Universal Negro Improvement Association (UNIA)',
        periodOrLocation: '1914–1920s (Global)',
        description: 'Marcus Garvey built the largest mass movement in Black history with millions of members, the Black Star Line shipping company, and the Negro Factories Corporation.'
      },
      {
        title: 'Black Panther Party for Self-Defense (BPP)',
        periodOrLocation: '1966–1982 (Oakland, USA)',
        description: 'Provided free breakfast programs for tens of thousands of school children, free health clinics, and armed community patrols against police brutality.'
      }
    ],
    economicModel: 'Cooperative community enterprise, socialist community programs (Black Panthers), Black-owned commercial development (Garveyism).',
    viewOfState: 'Skeptical of white supremacist state institutions; seeks either an independent autonomous territory or full community self-determination.',
    criticisms: [
      'Critics from the integrationist civil rights movement argued separation undermines universal constitutional civil equality',
      'Intense targeting and destabilization by federal surveillance programs (COINTELPRO)'
    ],
    keyTextsOrManifestos: ['The Ballot or the Bullet (Malcolm X)', 'Message to the Grassroots (Malcolm X)', 'Revolutionary Suicide (Huey P. Newton)', 'Black Power (Kwame Ture & Charles V. Hamilton)'],
    spectrumPlacement: 'Left to Syncretic Liberation Nationalist',
    iconSymbol: '✊🏿'
  },
  {
    id: 'zionism',
    name: 'Zionism',
    category: 'Nationalism & Identity-Based',
    tagline: 'The national revival and right of the Jewish people to self-determination in their ancestral homeland.',
    definition: 'A nationalist movement that supports the self-determination and statehood for the Jewish people in their ancestral homeland, the Land of Israel.',
    historicalOrigins: 'Formally founded as a modern political movement by Theodor Herzl in 1897 at the First Zionist Congress in Basel, Switzerland, in response to rising European anti-Semitism.',
    coreTenets: [
      'Jewish people constitute a nation with an inalienable right to national self-determination',
      'Establishment and security of a sovereign Jewish homeland in the Land of Israel',
      'Ingathering of exiles (Aliyah) from across the global diaspora to escape persecution',
      'Revival of the Hebrew language and Jewish national culture'
    ],
    keyThinkers: ['Theodor Herzl', 'Ahad Ha\'am', 'David Ben-Gurion', 'Ze\'ev Jabotinsky', 'Ber Borochov'],
    realWorldExamples: [
      {
        title: 'Declaration of the Establishment of the State of Israel',
        periodOrLocation: 'May 14, 1948 (Tel Aviv, Israel)',
        description: 'David Ben-Gurion declared the independence of the State of Israel following the 1947 UN Partition Plan and the Holocaust.'
      },
      {
        title: 'Labor Zionist Kibbutz Movement & Operation Magic Carpet',
        periodOrLocation: '1909–Present (Israel)',
        description: 'Constructed agricultural cooperatives, absorbed millions of Jewish refugees from Europe, the Middle East, North Africa, and Ethiopia.'
      }
    ],
    economicModel: 'Began with socialist collective kibbutzim and state planning (Labor Zionism); evolved into a high-tech free-market innovation hub ("Start-Up Nation").',
    viewOfState: 'A sovereign Jewish and democratic state providing an unconditional safe haven and national home for all Jewish people.',
    criticisms: [
      'Centuries-long conflict with Palestinian Arabs over land, displacement (the 1948 Nakba), and military occupation of the West Bank',
      'Debates over the balance between the state\'s Jewish character and equal rights for non-Jewish minorities'
    ],
    keyTextsOrManifestos: ['Der Judenstaat / The Jewish State (Theodor Herzl)', 'Altneuland (Herzl)', 'Auto-Emancipation (Leon Pinsker)'],
    spectrumPlacement: 'Spans Spectrum (Labor Zionism / Revisionist Zionism / Cultural Zionism)',
    iconSymbol: '✡️🇮🇱'
  },
  {
    id: 'feminism',
    name: 'Feminism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Equality of all genders across political, economic, personal, and social spheres.',
    definition: 'A range of socio-political movements and ideologies that aim to define, establish, and achieve the political, economic, personal, and social equality of the sexes, dismantling patriarchal oppression.',
    historicalOrigins: 'First Wave (19th–early 20th century suffragettes), Second Wave (1960s–1980s civil rights and reproductive freedom), Third/Fourth Waves (intersectional, digital, bodily autonomy).',
    coreTenets: [
      'Dismantling systemic patriarchy, gender discrimination, and sex-based violence',
      'Equal pay for equal work and economic independence for women',
      'Bodily autonomy, reproductive freedom, and access to healthcare',
      'Intersectionality: addressing how gender interacts with race, class, disability, and sexual orientation'
    ],
    keyThinkers: ['Mary Wollstonecraft', 'Simone de Beauvoir', 'bell hooks', 'Audre Lorde', 'Judith Butler', 'Betty Friedan'],
    realWorldExamples: [
      {
        title: 'Women\'s Suffrage & 19th Amendment',
        periodOrLocation: '1848–1920 (Seneca Falls & Washington, USA)',
        description: 'Decades-long struggle winning full constitutional voting rights for women.'
      },
      {
        title: 'Global #MeToo Movement & Legal Reforms',
        periodOrLocation: '2017–Present (Global)',
        description: 'Worldwide movement exposing systemic sexual harassment, leading to sweeping corporate and criminal accountability.'
      }
    ],
    economicModel: 'Closing the gender wage gap, subsidized universal childcare, valuing unpaid reproductive and care labor, equal corporate board representation.',
    viewOfState: 'A democratic instrument that must enforce non-discrimination, protect against gender violence, and guarantee equal representation.',
    criticisms: [
      'Internal debates between liberal, radical, socialist, and intersectional feminist currents',
      'Traditionalist critiques claiming feminism disrupts traditional family roles'
    ],
    keyTextsOrManifestos: ['A Vindication of the Rights of Woman (Wollstonecraft)', 'The Second Sex (Simone de Beauvoir)', 'Feminism Is for Everybody (bell hooks)'],
    spectrumPlacement: 'Center-Left to Radical Left Egalitarian',
    iconSymbol: '♀️✊'
  },
  {
    id: 'postcolonialism',
    name: 'Postcolonialism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Deconstructing the cultural, intellectual, and economic legacies of European colonialism.',
    definition: 'The critical academic study and political critique of the cultural, political, economic, and psychological legacies of colonialism and imperialism, analyzing how colonizers produced orientalist knowledge and maintained power.',
    historicalOrigins: 'Mid-20th century decolonization, galvanized by Frantz Fanon (1961) and Edward Said\'s Orientalism (1978).',
    coreTenets: [
      'Critique of Eurocentrism and colonial epistemologies (how knowledge was shaped to justify domination)',
      'Decolonization of education, language, culture, and governance systems',
      'Analysis of subaltern voices and the psychological trauma of colonization',
      'Opposition to modern neo-colonial economic arrangements and extraction'
    ],
    keyThinkers: ['Edward Said', 'Frantz Fanon', 'Gayatri Chakravorty Spivak', 'Homi K. Bhabha', 'Ngũgĩ wa Thiong\'o', 'Achille Mbembe'],
    realWorldExamples: [
      {
        title: 'Decolonizing the Curriculum & Rhodes Must Fall',
        periodOrLocation: '2015–Present (South Africa, Oxford, Global)',
        description: 'Student-led movement to remove statues of colonial oppressors and integrate Global South scholarship into university syllabi.'
      },
      {
        title: 'Restitution of Looted African Cultural Artifacts (Benin Bronzes)',
        periodOrLocation: '2020s–Present (Nigeria, France, Germany, UK)',
        description: 'International return of thousands of royal artworks stolen by British punitive expeditions in 1897 to Nigerian museums.'
      }
    ],
    economicModel: 'Debt cancellation for developing nations, climate reparations, sovereignty over natural mineral wealth, fair trade.',
    viewOfState: 'Postcolonial states must reform inherited colonial administrative and policing structures to genuinely empower local populations.',
    criticisms: [
      'Can focus heavily on academic discourse and postmodern jargon rather than material economic solutions',
      'Sometimes blamed by critics for overlooking local governance failures by attributing all issues solely to past colonialism'
    ],
    keyTextsOrManifestos: ['Orientalism (Edward Said)', 'The Wretched of the Earth (Frantz Fanon)', 'Can the Subaltern Speak? (Gayatri Spivak)', 'Decolonising the Mind (Ngũgĩ wa Thiong\'o)'],
    spectrumPlacement: 'Critical Left / Anti-Colonial Theory',
    iconSymbol: '📚🌍'
  },
  {
    id: 'multiculturalism',
    name: 'Multiculturalism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Coexistence, celebration, and equal institutional recognition of diverse cultural groups.',
    definition: 'A political and sociological framework that views cultural diversity as a positive social asset, holding that diverse cultural and ethnic groups should be recognized, accommodated, and celebrated within a single society rather than forced to assimilate.',
    historicalOrigins: 'Adopted as official state policy in Canada (1971 under Pierre Trudeau) and Australia (1973), later adopted across Western Europe.',
    coreTenets: [
      'Official recognition and celebration of cultural, religious, and ethnic diversity',
      'Rejection of forced assimilation ("melting pot") in favor of a "cultural mosaic" or "salad bowl"',
      'Equal access to public institutions with reasonable accommodations for minority cultural practices',
      'Anti-racism laws, hate speech prohibitions, and mother-tongue language preservation'
    ],
    keyThinkers: ['Charles Taylor', 'Will Kymlicka', 'Bhikhu Parekh', 'Pierre Trudeau', 'Iris Marion Young'],
    realWorldExamples: [
      {
        title: 'Canadian Multiculturalism Act of 1988',
        periodOrLocation: '1971 & 1988 (Canada)',
        description: 'First nation in the world to make multiculturalism a formal legal and constitutional policy preserving cultural heritage.'
      },
      {
        title: 'Toronto & London Cosmopolitan Urban Models',
        periodOrLocation: 'Modern Era (Canada & UK)',
        description: 'Metropolises where over 50% of residents are foreign-born, living in mutual civic peace and cultural vibrancy.'
      }
    ],
    economicModel: 'Diverse workforce inclusion, equal opportunity employment, public grants for cultural festivals and heritage community centers.',
    viewOfState: 'A neutral, accommodating constitutional arbiter that guarantees equal group rights and protections for minority cultures.',
    criticisms: [
      'Critics argue it can foster parallel societies, weaken shared national unity, and delay social integration',
      'Tensions arise when certain traditional cultural practices clash with liberal democratic norms (e.g., gender equality, LGBT rights)'
    ],
    keyTextsOrManifestos: ['Multicultural Citizenship (Will Kymlicka)', 'Multiculturalism: Examining the Politics of Recognition (Charles Taylor)', 'Rethinking Multiculturalism (Bhikhu Parekh)'],
    spectrumPlacement: 'Center-Left Pluralist',
    iconSymbol: '🌐🎨'
  },
  {
    id: 'interculturalism',
    name: 'Interculturalism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Active dialogue, mutual interaction, and integration within a shared common civic framework.',
    definition: 'A policy framework and philosophy that emphasizes mutual interaction, deep dialogue, and reciprocal learning between diverse cultural groups within a shared common public culture, contrasting with passive multicultural separation.',
    historicalOrigins: 'Developed in Quebec (Bouchard-Taylor Commission, 2008) and adopted by the Council of Europe as an evolution beyond classic multiculturalism.',
    coreTenets: [
      'Active cross-cultural dialogue and shared community projects rather than isolated cultural enclaves',
      'A common public culture (e.g., shared language, civic values) as the anchor for integration',
      'Reciprocal adaptation: both the majority host society and minority groups adapt and enrich each other',
      'Combating prejudice through meaningful face-to-face interaction'
    ],
    keyThinkers: ['Gérard Bouchard', 'Charles Taylor', 'Ted Cantle', 'Micheline Labelle'],
    realWorldExamples: [
      {
        title: 'Quebec Policy on Interculturalism (Bouchard-Taylor Report)',
        periodOrLocation: '2008–Present (Quebec, Canada)',
        description: 'Established a framework prioritizing French as the common public language while fostering deep reciprocal cultural exchange.'
      },
      {
        title: 'Council of Europe "Intercultural Cities" Program',
        periodOrLocation: '2008–Present (Strasbourg & European Cities)',
        description: 'Network of over 150 cities applying intercultural strategies in urban planning, policing, and community centers.'
      }
    ],
    economicModel: 'Inclusive labor markets, community mentorship programs, joint entrepreneurial ventures across ethnic groups.',
    viewOfState: 'An active facilitator of cross-cultural dialogue while maintaining a cohesive shared civic identity.',
    criticisms: [
      'Multiculturalists argue interculturalism places unfair assimilationist expectations on minority communities',
      'Assimilationists argue it still concedes too much to cultural relativism'
    ],
    keyTextsOrManifestos: ['Interculturalism: A View from Quebec (Gérard Bouchard)', 'Interculturalism: The New Era of Cohesion and Diversity (Ted Cantle)'],
    spectrumPlacement: 'Center to Center-Left Pluralist Integrationist',
    iconSymbol: '🤝🌐'
  },
  {
    id: 'expansionist-nationalism',
    name: 'Expansionist Nationalism (Imperialist Nationalism)',
    category: 'Nationalism & Identity-Based',
    tagline: 'Aggressive militarism, imperial territorial conquest, and national chauvinism.',
    definition: 'An aggressive and radical form of nationalism that incorporates raw patriotism with a belief in national or racial superiority, militarism, and the right to conquer, annex, and subjugate foreign territories for national grandeur or resources.',
    historicalOrigins: 'Late 19th-century "Scramble for Africa", Social Darwinism, and 20th-century fascist/imperial expansionism (Lebensraum, Hakko Ichiu).',
    coreTenets: [
      'Belief in the national right to expand borders through military conquest',
      'National chauvinism: the conqueror\'s culture and civilization are deemed superior to conquered populations',
      'Glorification of martial virtues, military parades, and empire-building',
      'Subjugation and exploitation of foreign land and resources for the homeland'
    ],
    keyThinkers: ['Heinrich von Treitschke', 'Cecil Rhodes', 'General Friedrich von Bernhardi'],
    realWorldExamples: [
      {
        title: 'Late 19th-Century European Imperialism ("Scramble for Africa")',
        periodOrLocation: '1881–1914 (Africa & Global)',
        description: 'European empires colonized 90% of Africa under nationalist banners of civilizing missions and imperial prestige.'
      },
      {
        title: 'Imperial Japanese Expansion & "Greater East Asia Co-Prosperity Sphere"',
        periodOrLocation: '1931–1945 (East & Southeast Asia)',
        description: 'Invasion of Manchuria, China, and Southeast Asia to secure resources and establish Japanese imperial dominance.'
      }
    ],
    economicModel: 'Colonial mercantilism, resource extraction, forced labor quotas, military-industrial command economies.',
    viewOfState: 'A militarized empire whose glory and power are measured by the extent of its territorial conquests.',
    criticisms: [
      'Catastrophic human destruction, world wars, genocide, and brutal colonial atrocities',
      'Inevitably generates fierce guerrilla resistance and imperial overstretch leading to total collapse'
    ],
    keyTextsOrManifestos: ['Germany and the Next War (Bernhardi)', 'Confession of Faith (Cecil Rhodes)'],
    spectrumPlacement: 'Far-Right Militarized Imperialist',
    iconSymbol: '⚔️🗺️'
  },
  {
    id: 'irredentism',
    name: 'Irredentism',
    category: 'Nationalism & Identity-Based',
    tagline: 'Reclaiming and re-annexing "lost" historic territories and ethnic kindred.',
    definition: 'A political or popular movement that seeks to claim, retrieve, or annex territory on the grounds of common ethnicity, past historical ownership, or cultural ties, viewing those lands as "unredeemed" (terra irredenta).',
    historicalOrigins: 'Originated in Italy after 1878 (Italia Irredenta) seeking to annex Italian-speaking areas under Austrian control (Trentino and Trieste).',
    coreTenets: [
      'Reunification of the historic national homeland and all co-ethnics under a single sovereign state',
      'Rejection of existing international borders as artificial, unjust, or imposed by foreign conquest',
      'Sacred historical memory of ancient or medieval borders',
      'Duty to liberate oppressed brethren living under foreign rule'
    ],
    keyThinkers: ['Matteo Renato Imbriani', 'Gabriele D\'Annunzio', 'Pan-Slavic and Balkan nationalist theorists'],
    realWorldExamples: [
      {
        title: 'Italian Annexation of Trentino, Trieste & Fiume',
        periodOrLocation: '1918–1924 (Italy & Adriatic)',
        description: 'Post-WWI acquisition of Austrian-held Italian territories and D\'Annunzio\'s romantic seizure of Fiume.'
      },
      {
        title: 'Russian Annexation of Crimea & Donbas Claims',
        periodOrLocation: '2014–Present (Ukraine & Russia)',
        description: 'Invoking historical Russian imperial/Soviet borders and protection of Russian speakers to annex Ukrainian territory.'
      }
    ],
    economicModel: 'Integration of annexed regional industries, resource mines, and strategic ports into the national economy.',
    viewOfState: 'Incomplete until all historic ancestral territories and ethnic populations are united under its sovereign flag.',
    criticisms: [
      'Primary catalyst for territorial wars, border destabilization, and regional conflicts',
      'Violates international law principles of sovereign territorial integrity'
    ],
    keyTextsOrManifestos: ['Carta del Carnaro (D\'Annunzio & De Ambris)', 'Historical Treatises on Italia Irredenta'],
    spectrumPlacement: 'Nationalist Right / Revisionist',
    iconSymbol: '🗺️⚔️'
  },
  {
    id: 'romantic-nationalism',
    name: 'Romantic Nationalism (Organic Nationalism)',
    category: 'Nationalism & Identity-Based',
    tagline: 'The mystical soul of the people, folklore, language, and organic historical destiny.',
    definition: 'The form of nationalism in which the state derives its political legitimacy as an organic consequence of the unity of those it governs, emphasizing the historical language, mythology, folklore, and customs of the cultural group.',
    historicalOrigins: 'Late 18th and early 19th-century Romantic movement (Herder, Brothers Grimm, Rousseau), flourishing during the 1848 revolutions.',
    coreTenets: [
      'The nation is a living, breathing organic entity with a unique collective soul (Volksgeist)',
      'Collection and celebration of ancient folk songs, peasant folklore, and national epics',
      'Emotional and intuitive connection to the native ancestral landscape, forests, and rivers',
      'Rejection of cold, mechanical Enlightenment rationalism in favor of passionate cultural belonging'
    ],
    keyThinkers: ['Johann Gottfried von Herder', 'The Brothers Grimm', 'Adam Mickiewicz', 'Johann Gottlieb Fichte', 'Giuseppe Mazzini'],
    realWorldExamples: [
      {
        title: 'Grimm Brothers\' Fairy Tales & German Romantic Revival',
        periodOrLocation: '1812–1850 (Germany)',
        description: 'Preserved ancient oral folklore and linguistic roots to inspire a unified German cultural consciousness before political unification.'
      },
      {
        title: 'Finnish National Awakening & The Kalevala',
        periodOrLocation: '1835–1917 (Finland)',
        description: 'Elias Lönnrot compiled the epic poem Kalevala from oral folk singers, fostering Finnish national identity and independence from the Russian Empire.'
      }
    ],
    economicModel: 'Agrarian romanticism, protection of traditional crafts, rural cooperative agriculture, national heritage funding.',
    viewOfState: 'The natural political vessel for the historical and spiritual awakening of the cultural nation.',
    criticisms: [
      'Can romanticize pre-modern tribal instincts and lay the groundwork for dangerous ethnic chauvinism',
      'Prone to myth-making and distorting historical facts to fit nationalist narratives'
    ],
    keyTextsOrManifestos: ['Grimm\'s Fairy Tales (Jacob & Wilhelm Grimm)', 'The Kalevala (Elias Lönnrot)', 'Pan Tadeusz (Adam Mickiewicz)'],
    spectrumPlacement: 'Romantic Cultural Right / Historic Nationalist',
    iconSymbol: '🌲📜'
  },
  {
    id: 'queer-nationalism',
    name: 'Queer Nationalism',
    category: 'Nationalism & Identity-Based',
    tagline: 'LGBTQ+ community as a distinct cultural people with unique rights, history, and spaces.',
    definition: 'A theoretical and political movement within the LGBTQ+ rights movement that views the queer community as a distinct cultural people possessing their own history, symbols, culture, and sovereign community spaces.',
    historicalOrigins: 'Formed in 1990 in New York by the activist group Queer Nation in response to anti-gay violence and the HIV/AIDS epidemic.',
    coreTenets: [
      'Affirmation of LGBTQ+ people as a distinct cultural identity ("We\'re here, we\'re queer, get used to it!")',
      'Creation of autonomous, safe, self-governing queer cultural spaces and neighborhoods (gay villages)',
      'Unapologetic militancy and direct action against homophobia and state negligence',
      'Solidarity with other marginalized and oppressed liberation movements'
    ],
    keyThinkers: ['Larry Kramer', 'Sarah Schulman', 'Michael Bronski', 'ACT UP / Queer Nation founders'],
    realWorldExamples: [
      {
        title: 'Queer Nation & ACT UP Direct Action Campaigns',
        periodOrLocation: '1987–1990s (New York & Global)',
        description: 'Militant demonstrations storming Wall Street, the FDA, and St. Patrick\'s Cathedral to force pharmaceutical access for AIDS medications.'
      },
      {
        title: 'Autonomous Queer Enclaves (Castro, Greenwich Village, Schöneberg)',
        periodOrLocation: '1970s–Present (San Francisco, NY, Berlin)',
        description: 'Self-organized cultural, commercial, and political hubs providing refuge and political mobilization for LGBTQ+ people.'
      }
    ],
    economicModel: 'Mutual aid funds, queer-owned cooperative housing, non-profit community health clinics (e.g., GMHC, Callen-Lorde).',
    viewOfState: 'Critiques state heteronormativity; demands full legal protection and autonomous community self-defense.',
    criticisms: [
      'Debates within the LGBTQ+ movement between assimilationist civil rights strategies (marriage equality) and separatist queer radicalism',
      'Accused of identity essentialism by post-structuralist theorists'
    ],
    keyTextsOrManifestos: ['Queer Nation Manifesto: I Hate Straights (1990)', 'Reports from the Holocaust (Larry Kramer)', 'A Queer History of the United States (Bronski)'],
    spectrumPlacement: 'Left-Wing Radical Identity Liberation',
    iconSymbol: '🏳️‍🌈⚡'
  },
  {
    id: 'white-nationalism',
    name: 'White Nationalism',
    category: 'Nationalism & Identity-Based',
    tagline: 'White ethnostate, racial separatism, and maintenance of white racial supremacy.',
    definition: 'A racial nationalist and white supremacist movement that seeks to develop and maintain a white national identity and ensure the survival of what it considers the white race, typically advocating for a separate white ethnostate.',
    historicalOrigins: 'Rooted in 19th-century scientific racism, the Ku Klux Klan, and post-war neo-Nazi/alt-right movements.',
    coreTenets: [
      'Belief in white racial superiority and the necessity of racial segregation or an all-white ethnostate',
      'Propagation of racist conspiracy theories (e.g., the "Great Replacement")',
      'Total opposition to non-white immigration and interracial marriage',
      'Antisemitism and hostility toward racial minorities'
    ],
    keyThinkers: ['David Lane ("14 Words")', 'William Luther Pierce', 'Jared Taylor', 'Richard B. Spencer'],
    realWorldExamples: [
      {
        title: 'Apartheid Regime in South Africa',
        periodOrLocation: '1948–1994 (South Africa)',
        description: 'State-enforced racial segregation, disenfranchisement of the Black majority, and creation of impoverished Bantustans.'
      },
      {
        title: 'Charlottesville "Unite the Right" Rally',
        periodOrLocation: 'August 2017 (Virginia, USA)',
        description: 'Violent gathering of neo-Nazis, Klansmen, and white nationalists chanting racist and antisemitic slogans.'
      }
    ],
    economicModel: 'Racial capitalism, total exclusion of non-whites from property ownership, autarky.',
    viewOfState: 'A racial dictatorship dedicated exclusively to white demographic dominance and the exclusion or expulsion of all non-whites.',
    criticisms: [
      'Universally condemned as an extremist hate ideology responsible for domestic terrorism, hate crimes, and racial violence',
      'Scientifically invalidated by modern genetics, which proves race is a social construct rather than a biological hierarchy'
    ],
    keyTextsOrManifestos: ['The Turner Diaries (William Luther Pierce)', 'White Power (George Lincoln Rockwell)'],
    spectrumPlacement: 'Extreme Far-Right / White Supremacist',
    iconSymbol: '🚫'
  }
];
