#!/usr/bin/env python3
"""
60 Asian Monuments Generator
"""
import json

def make_monument(id, name, native, cat, loc, country, era, yr_str, yr_num, arch, style, dim, mat, hist, marv, mod, img, tags, facts, unesco="World Heritage Landmark"):
    return {
        "id": id,
        "name": name,
        "nativeOrAlternateName": native,
        "category": cat,
        "location": loc,
        "country": country,
        "region": "Asia" if country not in ["United Arab Emirates", "Jordan", "Israel / Palestine", "Palestine / Jerusalem", "Iran", "Saudi Arabia"] else "Middle East",
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
        "fallbackImageUrl": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
        "tags": tags,
        "keyFacts": facts,
        "unescoStatus": unesco
    }

# We will define all 60 Asian monuments
asia_monuments = [
  # 1-15: Already well-known
  make_monument("taj-mahal", "Taj Mahal", "क्राउन ऑफ़ द पैलेस (Crown of the Palace)", "Famous Building", "Agra, Uttar Pradesh", "India",
    "Mughal Empire Golden Age (1632–1653 CE)", "1632–1653 CE", 1648, "Ustad Ahmad Lahori, commissioned by Emperor Shah Jahan",
    "Mughal Architecture (Persian, Islamic, Indian fusion)", "Height: 73 m (240 ft); Central dome diameter: 17.7 m; Complex area: 42 acres",
    "Translucent Makrana white marble, red sandstone, inlaid with 28 types of precious gemstones",
    "The Taj Mahal is widely acknowledged as the crown jewel of Indo-Islamic art in India. Commissioned in 1631 by Emperor Shah Jahan to house the tomb of his beloved favorite wife, Mumtaz Mahal, who died giving birth to their fourteenth child. Construction began in 1632 and enlisted over 20,000 artisans, masons, calligraphers, and stone carvers from India, Persia, the Ottoman Empire, and Europe, alongside 1,000 elephants used to haul marble from Rajasthan. The central mausoleum was completed in 1648, while surrounding courtyards, minarets, and mosque were completed by 1653.",
    "Celebrated for its absolute bilateral symmetry along a central axis, with the sole exception being Shah Jahan’s tomb itself, which was added later beside Mumtaz Mahal. The four 40-meter corner minarets are tilted outward by approximately 3 degrees so that during an earthquake, they would fall outward away from the delicate marble dome. The translucent Makrana white marble shifts hue across the day—rosy pink at dawn, bright milky white at noon, and shimmering silver under the moon.",
    "Inscribed as a UNESCO World Heritage Site in 1983 and voted one of the New 7 Wonders of the World in 2007. Protected by the Taj Trapezium Zone (TTZ) restricting industrial emissions.",
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200",
    ["Taj Mahal", "India", "Mughal", "UNESCO", "Wonder of the World", "Marble", "Agra", "Shah Jahan"],
    ["Built by Emperor Shah Jahan in memory of his favorite empress Mumtaz Mahal", "Minarets lean outward at a 3-degree angle as an earthquake defense mechanism", "Took 22 years and over 20,000 master artisans to construct", "Shifts color throughout the day from pink at sunrise to golden under moonlight"],
    "Inscribed 1983 (Criterion i)"),

  make_monument("great-wall-of-china", "Great Wall of China", "万里长城 (Wànlǐ Chángchéng - 10,000-Li Long Wall)", "Ancient Wonder", "Northern Frontier across 15 provinces", "China",
    "Qin Dynasty to Ming Dynasty (7th Century BCE – 1644 CE)", "c. 221 BCE – 1644 CE", -221, "First unified under Emperor Qin Shi Huang; fortified by Ming Dynasty emperors",
    "Ancient Chinese Military Defensive Rampart Engineering", "Total length: 21,196 km (13,171 miles); Average wall height: 6–8 m; Width: 5–8 m",
    "Rammed earth, dressed granite blocks, kiln-fired gray bricks, sticky rice mortar lime binder",
    "The Great Wall is the longest defensive fortification in human history. Earliest sections were built by rival feudal states during the Warring States period. In 221 BCE, Qin Shi Huang unified China and ordered existing walls joined along the northern ridges to repel raids by Xiongnu nomadic confederations. Hundreds of thousands of soldiers and peasants labored under General Meng Tian. Later dynasties maintained sections, but the iconic stone and brick watchtowers seen today were built during the Ming Dynasty (1368–1644 CE) following the Battle of Tumu.",
    "Ming builders mixed sticky rice soup with slaked lime, producing a mortar with amylopectin that created an extraordinarily resilient seal against weather and vegetation. Traces razor-thin mountain ridges across steep terrain and was supported by over 25,000 watchtowers and beacon towers that transmitted emergency tactical warnings thousands of miles within hours using coded smoke by day and beacon fires by night.",
    "Designated a UNESCO World Heritage Site in 1987 and voted one of the New 7 Wonders of the World in 2007. Serves as the ultimate symbol of Chinese civilizational perseverance.",
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1200",
    ["Great Wall", "China", "UNESCO", "Fortress", "Ming Dynasty", "Qin Shi Huang", "Wonder of the World"],
    ["Total recognized length exceeds 21,196 kilometers across northern China", "Mortar used in Ming sections contained sticky rice starch for phenomenal durability", "Beacon towers used coded smoke signals by day and fire torches by night", "Contrary to myth, it is not visible from low Earth orbit without camera zoom lenses"],
    "Inscribed 1987 (Criteria i, ii, iii, iv, vi)"),

  make_monument("angkor-wat", "Angkor Wat", "អង្គរវត្ត (City Temple)", "Sacred Temple / Cathedral", "Siem Reap Province", "Cambodia",
    "Khmer Empire (12th Century CE)", "c. 1113–1150 CE", 1130, "King Suryavarman II",
    "Classical Khmer Architecture (Temple-Mountain & Concentric Galleries)", "Central tower height: 65 m (213 ft); Outer moat perimeter: 5 km; Area: 162.6 hectares (402 acres)",
    "Over 5 million tonnes of quarried sandstone blocks, volcanic laterite foundation sub-blocks",
    "Angkor Wat is the largest religious monument in the world. Built during the peak of the Khmer Empire under King Suryavarman II in the early 12th century, it was dedicated to the Hindu deity Vishnu as the royal state temple and funerary mausoleum. Sandstone blocks were quarried 40 km away at Mount Kulen and floated on bamboo rafts down the Siem Reap River. By the late 12th century, under King Jayavarman VII, the temple gradually transformed into an active Theravada Buddhist sanctuary, remaining in continuous worship even when neighboring jungle reclaimed the city of Angkor.",
    "A terrestrial representation of Hindu cosmology: five central lotus-bud towers represent the five sacred peaks of Mount Meru, while the 190-meter-wide moat symbolizes the cosmic ocean. Uniquely faces westward toward the setting sun, consistent with funerary symbolism. Gallery walls feature over 1,200 square meters of bas-reliefs, depicting the Churning of the Ocean of Milk, the Mahabharata battle, and Suryavarman II’s war elephant procession. On the spring equinox, the sun rises precisely over the central spire.",
    "Core of the UNESCO Angkor World Heritage Site (1992). Prominently depicted on Cambodia's national flag, making it one of the only buildings on Earth featured on a national banner.",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    ["Angkor Wat", "Cambodia", "Khmer", "Hindu", "Buddhist", "UNESCO", "Temple Mountain"],
    ["Largest religious complex in the world, covering over 400 acres", "Faces westward toward the setting sun, unique among major classical Khmer temples", "The sun rises precisely over the central tower on the equinoxes", "Decorated with over 3,000 uniquely individual celestial Apsara carvings"],
    "Inscribed 1992 (Criteria i, ii, iii, iv)"),

  make_monument("burj-khalifa", "Burj Khalifa", "برج خليفة (Khalifa Tower)", "Monument & Tower", "Downtown Dubai", "United Arab Emirates",
    "Contemporary Global Engineering (2004–2010 CE)", "2004–2010 CE", 2010, "Adrian Smith & William F. Baker (Skidmore, Owings & Merrill)",
    "Neo-futurist High-Tech Skyscraper (Y-shaped Buttressed Core)", "Height: 828 m (2,717 ft); 163 floors; Floor area: 309,473 m²",
    "Reinforced concrete core, structural steel spire, 103,000 m² of reflective glass and aluminum panels",
    "The Burj Khalifa is the tallest building and tallest freestanding structure in human history. Initiated by Dubai's ruler Sheikh Mohammed bin Rashid Al Maktoum to shift Dubai's economic center toward international tourism and commerce. Construction began in 2004 with over 12,000 workers on site daily. Designed by Adrian Smith and engineered by Bill Baker, it opened on January 4, 2010, named in honor of UAE President Sheikh Khalifa bin Zayed Al Nahyan.",
    "Features a revolutionary buttressed core design—a hexagonal central concrete core braced by three wings in a Y-shape inspired by the desert flower Hymenocallis. This aerodynamic profile deflects high-altitude desert wind vortices as the tower steps back in 26 helical terraces. Set the world record for vertical concrete pumping at 606 meters. The sun sets three to four minutes later on the top floors than on the ground.",
    "The defining icon of 21st-century architectural engineering, holding world records for tallest structure, highest occupied floor, and elevator with the longest travel distance.",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200",
    ["Burj Khalifa", "Dubai", "UAE", "Skyscraper", "Tallest Building", "Architecture"],
    ["Tallest structure ever built by human hands at 828 meters (2,717 feet)", "Exterior is wrapped in over 26,000 hand-cut reflective glass panels", "Takes three to four months for professional abseilers to clean the entire facade", "The temperature at the tip of the spire is about 6°C cooler than at ground level"],
    "Modern Architectural Wonder"),

  make_monument("petra-treasury", "Al-Khazneh (The Treasury) & Petra", "الخزنة (The Treasury) / الرقيم (Raqmu)", "Ancient Wonder", "Ma'an Governorate", "Jordan",
    "Nabataean Kingdom (1st Century BCE – 1st Century CE)", "c. 9 BCE – 40 CE", 9, "Nabataean master stonemasons under King Aretas IV",
    "Hellenistic-Nabataean Rock-Cut Architecture", "Facade height: 39.5 m (130 ft); Width: 25 m; City area: 264 km²",
    "Living rose-red and ochre iron-banded sandstone cliff faces",
    "Al-Khazneh is the most famous facade in the ancient rock-cut city of Petra, capital of the Nabataean Arab kingdom. Dominating the crossroads of ancient silk and incense routes linking Arabia, Egypt, and Rome. Carved into the cliffs of Jabal al-Madhbah under King Aretas IV. Bedouins called it 'The Treasury' believing an Egyptian pharaoh hid gold in the upper stone urn, though it was in fact an elaborate royal tomb. Petra thrived until trade routes shifted to sea voyages and earthquakes in 363 and 551 CE damaged its water system. Rediscovered by Swiss explorer Johann Burckhardt in 1812.",
    "Carved directly into the cliff-face from the top down without scaffolding; masons cut footholds, chiseled upper pediments, and worked downward. The city thrived in an arid desert thanks to a sophisticated network of terracotta pipes, cisterns, and dams that distributed 45 million liters of spring water daily.",
    "UNESCO World Heritage Site (1985) and one of the New 7 Wonders of the World (2007). Jordan’s most iconic cultural destination.",
    "https://images.unsplash.com/photo-1579606032834-deffd1b4260f?auto=format&fit=crop&q=80&w=1200",
    ["Petra", "Jordan", "Nabataean", "Al-Khazneh", "Treasury", "UNESCO", "Wonder of the World"],
    ["Carved directly out of sandstone mountain cliffs from the top downward", "The decorative top urn bears bullet marks from treasure hunters seeking gold", "Reached through the Siq, a dramatic 1.2 km narrow canyon between 80-meter cliffs", "Supported a thriving desert population of 30,000 using advanced water engineering"],
    "Inscribed 1985 (Criteria i, iii, iv)")
]

print(f"Base 5 loaded: {len(asia_monuments)}")
