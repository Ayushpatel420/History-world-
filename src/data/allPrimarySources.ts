import { PrimarySourceDocument, KeyClause, FOUNDATIONAL_PRIMARY_SOURCES } from './primarySourcesData';
import { ANCIENT_CLASSICAL_SPEECHES } from './speechesAncientClassical';
import { MEDIEVAL_EARLY_MODERN_SPEECHES } from './speechesMedievalEarlyModern';
import { NINETEENTH_CENTURY_SPEECHES } from './speechesNineteenthCentury';
import { TWENTIETH_CENTURY_EARLY_SPEECHES } from './speechesTwentiethCenturyEarly';
import { TWENTIETH_CENTURY_LATE_SPEECHES } from './speechesTwentiethCenturyLate';
import { MORE_GLOBAL_CLASSIC_SPEECHES } from './speechesMoreGlobalClassics';
import { CENTURIES_VAULT_SPEECHES } from './speechesCenturiesVault';
import { MORE_MODERN_GLOBAL_SPEECHES } from './speechesMoreModernGlobal';
import { ANTIQUITY_NEAR_EAST_ASIA_SPEECHES } from './speechesAntiquityNearEastAsia';
import { CLASSICAL_GRECO_ROMAN_SPEECHES } from './speechesClassicalGrecoRoman';
import { GLOBAL_LIBERATION_AND_RIGHTS_SPEECHES } from './speechesGlobalLiberationAndRights';
import { HISTORIC_MOMENTS_AND_WONDERS_SPEECHES } from './speechesHistoricMomentsAndWonders';
import { ENLIGHTENMENT_REVOLUTIONS_AND_WELFARE_SPEECHES } from './speechesEnlightenmentRevolutionsAndWelfare';

// 200+ New Speeches and Decrees Expansions
import { EXPANSION_ANTIQUITY_MEDIEVAL_SPEECHES } from './speechesExpansionAntiquityMedieval';
import { EXPANSION_ANTIQUITY_PART2_SPEECHES } from './speechesExpansionAntiquityPart2';
import { EXPANSION_MEDIEVAL_PART2_SPEECHES } from './speechesExpansionMedievalPart2';
import { EXPANSION_EARLY_MODERN_SPEECHES } from './speechesExpansionEarlyModern';
import { EXPANSION_19TH_CENTURY_SPEECHES } from './speechesExpansion19thCentury';
import { EXPANSION_20TH_MODERN_SPEECHES } from './speechesExpansion20thModern';
import { EXPANSION_MEGAVAULT_200_SPEECHES } from './speechesExpansionMegavault200';
import { EXPANSION_CENTURIES_BULK_SPEECHES } from './speechesExpansionCenturiesBulk';
import { EXPANSION_MASTER_LIST_200_SPEECHES } from './speechesExpansionMasterList200';
import { EXPANSION_200_COMPLETE_BATCH_SPEECHES } from './speechesExpansion200CompleteBatch';
import { EXPANSION_GRAND_LIBRARY_200_SPEECHES } from './speechesExpansionGrandLibrary200';

// World War 1, World War 2, Educational Historical Analysis, and 200+ Expanded Speeches
import { WWI_COMPLETE_VAULT_SPEECHES } from './speechesWWICompleteVault';
import { WWII_COMPLETE_VAULT_SPEECHES } from './speechesWWIICompleteVault';
import { EDUCATIONAL_HITLER_VAULT_SPEECHES } from './speechesEducationalHitlerVault';
import { GLOBAL_HISTORY_EXPANSION_VOL1_SPEECHES } from './speechesGlobalHistoryExpansionVol1';
import { GLOBAL_HISTORY_EXPANSION_VOL2_SPEECHES } from './speechesGlobalHistoryExpansionVol2';
import { EXPANSION_200_NEW_VAULT_SPEECHES } from './speechesExpansion200NewVault';

// Ancient Kings, Rulers, & Emperors Global Vaults (China, India, Greco-Roman, Europe, Japan, Russia, Egypt, Americas)
import { SPEECHES_RULERS_CHINA_EAST_ASIA } from './speechesRulersChinaEastAsia';
import { SPEECHES_RULERS_INDIA_SOUTH_ASIA } from './speechesRulersIndiaSouthAsia';
import { SPEECHES_RULERS_GRECO_ROMAN } from './speechesRulersGrecoRoman';
import { SPEECHES_RULERS_EUROPE_MONARCHS } from './speechesRulersEuropeMonarchs';
import { SPEECHES_RULERS_JAPAN_ASIA } from './speechesRulersJapanAsia';
import { SPEECHES_RULERS_RUSSIAN_SLAVIC } from './speechesRulersRussianSlavic';
import { SPEECHES_RULERS_EGYPT_NEAR_EAST } from './speechesRulersEgyptNearEast';
import { SPEECHES_RULERS_AMERICAS_INDIGENOUS } from './speechesRulersAmericasIndigenous';
import { SPEECHES_RULERS_ANCIENT_MEGA_VAULT } from './speechesRulersAncientMegaVault';

// 900+ Ancient Kings, Rulers, and Emperors Master Batches (Near East, Greco-Macedonian, Roman-Byzantine, China, India, Global)
import { SPEECHES_RULERS_BATCH_1_NEAR_EAST } from './speechesRulersBatch1NearEastEgypt';
import { SPEECHES_RULERS_BATCH_2_GRECO_MACEDONIAN } from './speechesRulersBatch2GrecoMacedonian';
import { SPEECHES_RULERS_BATCH_3_ROMAN_BYZANTINE } from './speechesRulersBatch3RomanByzantine';
import { SPEECHES_RULERS_BATCH_4_CHINA_EAST_ASIA } from './speechesRulersBatch4ChinaEastAsia';
import { SPEECHES_RULERS_BATCH_5_INDIA_SOUTH_ASIA } from './speechesRulersBatch5IndiaSouthAsia';
import { SPEECHES_RULERS_BATCH_6_GLOBAL_MONARCHS } from './speechesRulersBatch6GlobalMonarchs';

export type { PrimarySourceDocument, KeyClause };

const RAW_PRIMARY_SOURCES_AND_SPEECHES: PrimarySourceDocument[] = [
  ...FOUNDATIONAL_PRIMARY_SOURCES,
  ...ANCIENT_CLASSICAL_SPEECHES,
  ...MEDIEVAL_EARLY_MODERN_SPEECHES,
  ...NINETEENTH_CENTURY_SPEECHES,
  ...TWENTIETH_CENTURY_EARLY_SPEECHES,
  ...TWENTIETH_CENTURY_LATE_SPEECHES,
  ...MORE_GLOBAL_CLASSIC_SPEECHES,
  ...CENTURIES_VAULT_SPEECHES,
  ...MORE_MODERN_GLOBAL_SPEECHES,
  ...ANTIQUITY_NEAR_EAST_ASIA_SPEECHES,
  ...CLASSICAL_GRECO_ROMAN_SPEECHES,
  ...GLOBAL_LIBERATION_AND_RIGHTS_SPEECHES,
  ...HISTORIC_MOMENTS_AND_WONDERS_SPEECHES,
  ...ENLIGHTENMENT_REVOLUTIONS_AND_WELFARE_SPEECHES,
  
  // 200+ Expanded Speeches and Decrees
  ...EXPANSION_ANTIQUITY_MEDIEVAL_SPEECHES,
  ...EXPANSION_ANTIQUITY_PART2_SPEECHES,
  ...EXPANSION_MEDIEVAL_PART2_SPEECHES,
  ...EXPANSION_EARLY_MODERN_SPEECHES,
  ...EXPANSION_19TH_CENTURY_SPEECHES,
  ...EXPANSION_20TH_MODERN_SPEECHES,
  ...EXPANSION_MEGAVAULT_200_SPEECHES,
  ...EXPANSION_CENTURIES_BULK_SPEECHES,
  ...EXPANSION_MASTER_LIST_200_SPEECHES,
  ...EXPANSION_200_COMPLETE_BATCH_SPEECHES,
  ...EXPANSION_GRAND_LIBRARY_200_SPEECHES,

  // World War 1, World War 2, Educational Analysis Vault, & 200+ New Speeches
  ...WWI_COMPLETE_VAULT_SPEECHES,
  ...WWII_COMPLETE_VAULT_SPEECHES,
  ...EDUCATIONAL_HITLER_VAULT_SPEECHES,
  ...GLOBAL_HISTORY_EXPANSION_VOL1_SPEECHES,
  ...GLOBAL_HISTORY_EXPANSION_VOL2_SPEECHES,
  ...EXPANSION_200_NEW_VAULT_SPEECHES,

  // Ancient Kings, Rulers, & Emperors Global Vaults
  ...SPEECHES_RULERS_CHINA_EAST_ASIA,
  ...SPEECHES_RULERS_INDIA_SOUTH_ASIA,
  ...SPEECHES_RULERS_GRECO_ROMAN,
  ...SPEECHES_RULERS_EUROPE_MONARCHS,
  ...SPEECHES_RULERS_JAPAN_ASIA,
  ...SPEECHES_RULERS_RUSSIAN_SLAVIC,
  ...SPEECHES_RULERS_EGYPT_NEAR_EAST,
  ...SPEECHES_RULERS_AMERICAS_INDIGENOUS,
  ...SPEECHES_RULERS_ANCIENT_MEGA_VAULT,

  // 900+ Ancient Kings, Rulers, and Emperors Master Batches
  ...SPEECHES_RULERS_BATCH_1_NEAR_EAST,
  ...SPEECHES_RULERS_BATCH_2_GRECO_MACEDONIAN,
  ...SPEECHES_RULERS_BATCH_3_ROMAN_BYZANTINE,
  ...SPEECHES_RULERS_BATCH_4_CHINA_EAST_ASIA,
  ...SPEECHES_RULERS_BATCH_5_INDIA_SOUTH_ASIA,
  ...SPEECHES_RULERS_BATCH_6_GLOBAL_MONARCHS,
];

// Deduplicate documents by ID to guarantee unique keys across React components and views
function deduplicateSources(sources: PrimarySourceDocument[]): PrimarySourceDocument[] {
  const seen = new Set<string>();
  const uniqueList: PrimarySourceDocument[] = [];
  for (const doc of sources) {
    if (!seen.has(doc.id)) {
      seen.add(doc.id);
      uniqueList.push(doc);
    }
  }
  return uniqueList;
}

export const ALL_PRIMARY_SOURCES_AND_SPEECHES: PrimarySourceDocument[] = deduplicateSources(RAW_PRIMARY_SOURCES_AND_SPEECHES);

export const ALL_SPEECHES_COUNT = ALL_PRIMARY_SOURCES_AND_SPEECHES.length;


