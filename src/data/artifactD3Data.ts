export interface D3Node {
  id: string;
  x3d: number;
  y3d: number;
  z3d: number;
  label: string;
  importance: 'high' | 'medium' | 'low';
  category: 'material' | 'structure' | 'joinery' | 'ornament' | 'inscription';
  detail: string;
}

export interface D3Link {
  source: string;
  target: string;
}

export interface MaterialComposition {
  material: string;
  percentage: number;
  color: string;
}

export interface CraftsmanshipProfile {
  artifactId: string;
  overallScore: number; // 0-100 index of required metalwork/carving skill
  precisionRating: string; // e.g. "0.1mm alignment" or "atomic layout"
  structuralLayers: { name: string; depth: string; function: string }[];
  composition: MaterialComposition[];
  nodes: D3Node[];
  links: D3Link[];
  craftsmanshipNotes: string;
}

export const ARTIFACT_CRAFTSMANSHIP_PROFILES: Record<string, CraftsmanshipProfile> = {
  'tutankhamun_mask': {
    artifactId: 'tutankhamun_mask',
    overallScore: 98,
    precisionRating: 'Sub-millimeter gold foil chasing & lapis inlay',
    structuralLayers: [
      { name: 'Gold-Silver Foil Veneer', depth: '0.8 - 1.5 mm', function: 'Main face aesthetic, solid bullion sheets hammered' },
      { name: 'Quartz & Obsidian Eye Inlays', depth: '12.2 mm', function: 'Portrays the hyper-vibrant eternal gaze of Osiris' },
      { name: 'Plaster Core Back Plate', depth: '45.0 mm', function: 'Back reinforcement support to hold crown contour' },
      { name: 'Nemes Lapis Inlay Channels', depth: '3.0 mm', function: 'Dovetailed cavities for glass and lazuli stripes' }
    ],
    composition: [
      { material: '22-Karat Gold', percentage: 74, color: '#EFC745' },
      { material: 'Lapis Lazuli (Blue)', percentage: 11, color: '#2B4A9C' },
      { material: 'Turquoise & Carnelian', percentage: 8, color: '#3BAAA2' },
      { material: 'Quartz / Obsidian', percentage: 7, color: '#CCD0D6' }
    ],
    nodes: [
      { id: 'n1', x3d: 0, y3d: 1.5, z3d: 0.1, label: 'Uraeus (Vulture & Cobra)', importance: 'high', category: 'ornament', detail: 'Symbolizes joint sovereignty over Upper & Lower Egypt. Pure chased gold with carnelian inlays.' },
      { id: 'n2', x3d: -0.5, y3d: 0.7, z3d: 0.8, label: 'Lapis Obsidian Left Eye', importance: 'high', category: 'material', detail: 'Inlaid with pure white quartz and black obsidian pupils. Gives the mask an uncanny lifelike refraction.' },
      { id: 'n3', x3d: 0.5, y3d: 0.7, z3d: 0.8, label: 'Lapis Obsidian Right Eye', importance: 'high', category: 'material', detail: 'Lapis lazuli outlines depict divine eyeliner cosmetics.' },
      { id: 'n4', x3d: 0, y3d: 0.1, z3d: 0.9, label: 'Gilded Imperial Nose Bridge', importance: 'medium', category: 'structure', detail: 'Constructed by hammering a single high-ductility gold sheet into a limestone mold.' },
      { id: 'n5', x3d: 0, y3d: -0.6, z3d: 1.1, label: 'Divine Plaited Beard Anchor', importance: 'high', category: 'joinery', detail: 'Connected by a mortise and tenon pin. Filled with colored glass paste to mimic braided lapis.' },
      { id: 'n6', x3d: -1.2, y3d: 0.4, z3d: -0.5, label: 'Left Nemes Flap Flange', importance: 'medium', category: 'structure', detail: 'Cold-hammered collar plates joined with copper locking rivets.' },
      { id: 'n7', x3d: 1.2, y3d: 0.4, z3d: -0.5, label: 'Right Nemes Flap Flange', importance: 'medium', category: 'structure', detail: 'Features beautiful parallel running fluting with custom chemical patina.' },
      { id: 'n8', x3d: 0, y3d: -1.4, z3d: 0.6, label: 'Broad Collar Inlay Base', importance: 'high', category: 'inscription', detail: 'Inscribed on the reverse side with Spell 151B from the Book of the Dead in hieroglyphic registers.' }
    ],
    links: [
      { source: 'n1', target: 'n2' },
      { source: 'n1', target: 'n3' },
      { source: 'n2', target: 'n4' },
      { source: 'n3', target: 'n4' },
      { source: 'n4', target: 'n5' },
      { source: 'n2', target: 'n6' },
      { source: 'n3', target: 'n7' },
      { source: 'n5', target: 'n8' },
      { source: 'n6', target: 'n8' },
      { source: 'n7', target: 'n8' }
    ],
    craftsmanshipNotes: 'The death mask leverages phenomenal "repoussé" craftsmanship—a method of cold-beating thin gold sheets from the reverse side to produce deep high-relief forms like cheeks and ears without cracking the gold.'
  },
  'antikythera_mechanism': {
    artifactId: 'antikythera_mechanism',
    overallScore: 99,
    precisionRating: '0.08mm hand-filing tolerance gear mesh',
    structuralLayers: [
      { name: 'Bronze Front Calibration Ring', depth: '2.5 mm', function: 'Displays Egyptian and Sothic solar progress indicators' },
      { name: 'Interlocking Gear Chassis', depth: '48.0 mm', function: 'Central train holding 30+ planetary tracking bronze gears' },
      { name: 'Helical Grooved Back Spiral', depth: '4.0 mm', function: 'Guides the sliding pointer pin through Lunar Cycle tracks' },
      { name: 'Hand-Cranked Crown Spindle', depth: '15.0 mm', function: 'Allows manually pivoting the system forward or backward' }
    ],
    composition: [
      { material: 'Bronze Alloy (Cu-Sn)', percentage: 88, color: '#B3913E' },
      { material: 'Trace Antimony & Lead', percentage: 7, color: '#7E8591' },
      { material: 'Iron Oxide Corrosions', percentage: 5, color: '#A35338' }
    ],
    nodes: [
      { id: 'g0', x3d: 0, y3d: 0, z3d: 0, label: 'Primary Drive Spindle B1', importance: 'high', category: 'structure', detail: 'The solar wheel anchor. Coordinates major lunar gear ratios with a single hand-crank coupling.' },
      { id: 'g1', x3d: -0.4, y3d: 0.3, z3d: 0.2, label: 'Metonic Gear Train (19-Tooth)', importance: 'high', category: 'joinery', detail: 'Features triangular gear teeth filed manually. Regulates the 19-year solar moon alignment cycle.' },
      { id: 'g2', x3d: 0.4, y3d: -0.3, z3d: 0.2, label: 'Saros Eclipse Indicator', importance: 'high', category: 'inscription', detail: 'Tracks planetary eclipse directions utilizing a complex 223-month spiral track.' },
      { id: 'g3', x3d: 0.2, y3d: 0.5, z3d: -0.3, label: 'Epicyclic Moon Phase Dial', importance: 'medium', category: 'ornament', detail: 'A miniature rotating black-and-silver ball that indicates physical lunar shadow waxes.' },
      { id: 'g4', x3d: -0.5, y3d: -0.4, z3d: -0.5, label: 'Olympiad Loop Cog', importance: 'medium', category: 'joinery', detail: 'A specialized 4-year dial timing athletic and panhellenic festival intervals.' }
    ],
    links: [
      { source: 'g0', target: 'g1' },
      { source: 'g0', target: 'g2' },
      { source: 'g1', target: 'g3' },
      { source: 'g2', target: 'g4' },
      { source: 'g3', target: 'g4' }
    ],
    craftsmanshipNotes: 'The gears incorporate a beautiful epicyclic "planetary differential gearing system"—a technique of mounting circular gear axles onto other rotating gears to accurately simulate non-circular elliptical orbit movements of the Moon!'
  },
  'sutton_hoo_helmet': {
    artifactId: 'sutton_hoo_helmet',
    overallScore: 94,
    precisionRating: 'Interconnected iron matrix & tinned bronze foils',
    structuralLayers: [
      { name: 'Forged Iron Dome Cap', depth: '1.2 - 2.8 mm', function: 'Hand-beaten thick iron bowl protecting from sword impacts' },
      { name: 'Tinned Bronze Figural Panels', depth: '0.6 mm', function: 'Intricate decorative press plaques displaying epic battles' },
      { name: 'Ear Flange Swivel Pins', depth: '14.0 mm', function: 'Pivots ear guards inward tightly to seal jaw guards' },
      { name: 'Gilded Copper Dragon Brow', depth: '6.0 mm', function: 'Protects nose ridge and projects supernatural intimidation' }
    ],
    composition: [
      { material: 'Carbon Iron (Domed)', percentage: 65, color: '#383C45' },
      { material: 'Tin-Plated Bronze Foil', percentage: 22, color: '#A8ACAF' },
      { material: 'Gilded Gold Foil Trim', percentage: 8, color: '#EFC745' },
      { material: 'Garnet Gem Inlays', percentage: 5, color: '#A00D16' }
    ],
    nodes: [
      { id: 'h1', x3d: 0, y3d: 1.2, z3d: 0.2, label: 'Symmetry Crest Comb', importance: 'medium', category: 'structure', detail: 'A thick tube of hollow tin alloy extending down. Guards against axial overhead axe strikes.' },
      { id: 'h2', x3d: 0, y3d: 0.2, z3d: 1.0, label: 'Convergence Brow Bridge', importance: 'high', category: 'ornament', detail: 'Converging visual line ending in gold-plated dragon heads with ruby red garnet eye slots.' },
      { id: 'h3', x3d: -0.8, y3d: -0.3, z3d: 0.8, label: 'Latticed Left Eye Cheek', importance: 'high', category: 'structure', detail: 'Features miniature tinned stamps depicting Anglo-Saxon warrior dances.' },
      { id: 'h4', x3d: 0.8, y3d: -0.3, z3d: 0.8, label: 'Latticed Right Eye Cheek', importance: 'high', category: 'structure', detail: 'Tinned plate displaying horse falconry battle charges.' },
      { id: 'h5', x3d: 0, y3d: -0.8, z3d: 1.2, label: 'Mustache Mouth Grate', importance: 'high', category: 'joinery', detail: 'Solid bronze casting, heavily tinned and riveted directly to the iron nose screen.' }
    ],
    links: [
      { source: 'h1', target: 'h2' },
      { source: 'h2', target: 'h3' },
      { source: 'h2', target: 'h4' },
      { source: 'h3', target: 'h5' },
      { source: 'h4', target: 'h5' }
    ],
    craftsmanshipNotes: 'The Sutton Hoo helmet displays the legendary Scandinavian "Vendel" style of pattern-welding. Highly skilled smiths twisted rods of different carbon levels together, cold-beating and heating them to form visible, wave-like steel bands.'
  },
  'dead_sea_scrolls': {
    artifactId: 'dead_sea_scrolls',
    overallScore: 82,
    precisionRating: 'Organic tanning & calligraphic alignment precision',
    structuralLayers: [
      { name: 'Scraped Parchment Hide', depth: '0.15 - 0.25 mm', function: 'Sheepskin or ibex leather, heavily salt-cured' },
      { name: 'Carbon Black Ink Coat', depth: '0.02 mm', function: 'Soot and vegetable gum mixture, water resistant' },
      { name: 'Reinforcing Flax Stitches', depth: '1.2 mm', function: 'Hand-sewn linen twine tying multiple sheets in scrolls' },
      { name: 'Earthenware Jar Seal', depth: '8.0 mm', function: 'Atmospheric clay pots that sealed scrolls for 2 millennia' }
    ],
    composition: [
      { material: 'Ibex Leather (Parchment)', percentage: 85, color: '#C9BEAD' },
      { material: 'Carbon Ink / Soot', percentage: 9, color: '#1B1C1D' },
      { material: 'Sedimentary Clay Salts', percentage: 6, color: '#A09282' }
    ],
    nodes: [
      { id: 's1', x3d: -1.0, y3d: 0.6, z3d: -0.1, label: 'Parchment Scroll Margin', importance: 'medium', category: 'structure', detail: 'Cleanly margins measured with dry-point stylus scoring. Guides text block columns.' },
      { id: 's2', x3d: -0.5, y3d: 0.2, z3d: 0.1, label: 'Aramaic Hebrew Inscriptions', importance: 'high', category: 'inscription', detail: 'Script written from right to left using soot-based black ink. Extremely high readability and stroke spacing.' },
      { id: 's3', x3d: 0.5, y3d: -0.1, z3d: 0.2, label: 'Fiber Tear Fracture Line', importance: 'medium', category: 'material', detail: 'Cracked edges showing molecular collagen breakdown. Sealed by extreme Judean Desert dryness.' },
      { id: 's4', x3d: 1.0, y3d: -0.5, z3d: 0.0, label: 'Flax Twine Stitching Joint', importance: 'high', category: 'joinery', detail: 'Authentic 3-ply linen fiber stitches linking subsequent leather panels seamlessly.' }
    ],
    links: [
      { source: 's1', target: 's2' },
      { source: 's2', target: 's3' },
      { source: 's3', target: 's4' }
    ],
    craftsmanshipNotes: 'The Dead Sea scrolls demonstrate incredible organic preservation mastery. The skin parchment was cured with calcium carbonate and high-nitrate desert salts to prevent organic mold growth.'
  }
};

// Fallback generator for other general artifacts
export function getCraftsmanshipProfile(artifactId: string, fallbackName: string): CraftsmanshipProfile {
  if (ARTIFACT_CRAFTSMANSHIP_PROFILES[artifactId]) {
    return ARTIFACT_CRAFTSMANSHIP_PROFILES[artifactId];
  }

  // Generate dynamic, realistic values for default relics
  const hash = artifactId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const materials = ['Carved Thasian Marble', 'Chased Bronze Alloy', 'Tanned Parchment', 'Silt Terracotta Clay', 'Silver Bullion Inlay'];
  const colors = ['#E6E6E8', '#AF8D4E', '#D9CDB8', '#CD7B5C', '#AFBDC4'];
  const mainMat = materials[hash % materials.length];
  const mainCol = colors[hash % colors.length];

  return {
    artifactId,
    overallScore: 78 + (hash % 18),
    precisionRating: `Manual chisel detail with c. ${(hash % 3 * 0.5 + 0.5).toFixed(1)}mm tool relief`,
    structuralLayers: [
      { name: `Outer ${mainMat} Veneer`, depth: '2.0 mm', function: 'Decorative polished presentation casing' },
      { name: 'Supporting Base Matrix', depth: '15.0 mm', function: 'Structural foundational alignment core' }
    ],
    composition: [
      { material: mainMat, percentage: 65 + (hash % 20), color: mainCol },
      { material: 'Silica & Mineral Quartz', percentage: 20 - (hash % 8), color: '#8C929C' },
      { material: 'Atmospheric Hydration Patina', percentage: 10 + (hash % 5), color: '#4EA896' }
    ],
    nodes: [
      { id: 'g0', x3d: 0, y3d: 0.8, z3d: 0.1, label: 'Apex Crown Crown', importance: 'medium', category: 'ornament', detail: 'The decorative top tip showcasing classical balance motifs.' },
      { id: 'g1', x3d: -0.6, y3d: 0, z3d: 0.5, label: 'Chiseled Left Profile Relief', importance: 'high', category: 'structure', detail: 'Features beautifully carved textures demonstrating historic mastery.' },
      { id: 'g2', x3d: 0.6, y3d: 0, z3d: 0.5, label: 'Chiseled Right Profile Relief', importance: 'high', category: 'structure', detail: 'Mirror balanced lines keeping perfect bilateral spatial symmetry.' },
      { id: 'g3', x3d: 0, y3d: -0.7, z3d: 0.3, label: 'Basal Foot Pedestal Joint', importance: 'high', category: 'joinery', detail: 'The stress bearing connection anchor block supporting the relics volume.' }
    ],
    links: [
      { source: 'g0', target: 'g1' },
      { source: 'g0', target: 'g2' },
      { source: 'g1', target: 'g3' },
      { source: 'g2', target: 'g3' }
    ],
    craftsmanshipNotes: `This customized D3 model estimates the structural symmetry of "${fallbackName}". Handcrafted tool grooves show physical wear patterns matching the high-efficiency scraping standards of its native era.`
  };
}
