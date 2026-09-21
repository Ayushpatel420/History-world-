import { WorldMonumentOrArtifact } from '../../types';
import { ASIAN_MONUMENTS } from './asianMonuments';
import { EUROPEAN_MONUMENTS } from './europeanMonuments';
import { AMERICAS_AFRICA_OCEANIA_MONUMENTS } from './americasAfricaOceaniaMonuments';
import { FAMOUS_ARTIFACTS } from './famousArtifacts';
import { MORE_FAMOUS_ARTIFACTS } from './moreFamousArtifacts';

export { ASIAN_MONUMENTS } from './asianMonuments';
export { EUROPEAN_MONUMENTS } from './europeanMonuments';
export { AMERICAS_AFRICA_OCEANIA_MONUMENTS } from './americasAfricaOceaniaMonuments';
export { FAMOUS_ARTIFACTS } from './famousArtifacts';
export { MORE_FAMOUS_ARTIFACTS } from './moreFamousArtifacts';

/**
 * Complete consolidated dataset of 330+ world most famous historical buildings,
 * architectural marvels, wonders, and ancient artifacts.
 */
export const ALL_WORLD_MONUMENTS: WorldMonumentOrArtifact[] = [
  ...ASIAN_MONUMENTS,
  ...EUROPEAN_MONUMENTS,
  ...AMERICAS_AFRICA_OCEANIA_MONUMENTS,
  ...FAMOUS_ARTIFACTS,
  ...MORE_FAMOUS_ARTIFACTS
];

export const MONUMENT_CATEGORIES = [
  'All Categories',
  'Temple & Sacred Site',
  'Mausoleum & Tomb',
  'Palace & Fortress',
  'Cathedral & Basilica',
  'Ancient Wonder & Megalith',
  'Tower & Monument',
  'Artifact & Relic',
  'Archaeological City'
] as const;

export const MONUMENT_REGIONS = [
  'All Regions',
  'Asia',
  'Europe',
  'Americas',
  'Africa',
  'Middle East',
  'Oceania'
] as const;

export function getMonumentById(id: string): WorldMonumentOrArtifact | undefined {
  return ALL_WORLD_MONUMENTS.find((item) => item.id === id);
}

export function searchMonuments(query: string): WorldMonumentOrArtifact[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return ALL_WORLD_MONUMENTS;
  
  return ALL_WORLD_MONUMENTS.filter((item) =>
    item.name.toLowerCase().includes(clean) ||
    item.country.toLowerCase().includes(clean) ||
    item.location.toLowerCase().includes(clean) ||
    item.category.toLowerCase().includes(clean) ||
    item.architecturalStyle.toLowerCase().includes(clean) ||
    item.tags.some(tag => tag.toLowerCase().includes(clean))
  );
}
