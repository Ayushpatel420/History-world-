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

function writeBatchFile(filename: string, exportName: string, items: SpeechDef[]) {
  const filePath = path.join(process.cwd(), 'src', 'data', filename);
  const content = `import { PrimarySourceDocument } from './primarySourcesData';

export const ${exportName}: PrimarySourceDocument[] = ${JSON.stringify(
    items.map(item => ({
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

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Generated ${filename} with ${items.length} speeches.`);
}

console.log('Script framework ready.');
