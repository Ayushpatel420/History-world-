import { jsPDF } from 'jspdf';
import { UserNote, Bookmark } from '../types';

/**
 * Strips non-alphanumeric characters for safe file naming
 */
function sanitizeFilename(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 50) || 'note';
}

/**
 * Formats a clean date string for headers
 */
function getFormattedDate(): string {
  const d = new Date();
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Adds running headers and footers across all pages
 */
function applyPageDecoration(doc: jsPDF, totalPages: number, title: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Running top header (pages 2+)
    if (i > 1) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(140, 130, 120);
      doc.text(title.toUpperCase(), 16, 10);

      doc.setDrawColor(220, 215, 205);
      doc.setLineWidth(0.2);
      doc.line(16, 12, pageWidth - 16, 12);
    }

    // Running bottom footer (all pages)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 140, 130);

    // Left: Document origin
    doc.text('History Vaults & Scholarly Archives • Offline Study Dossier', 16, pageHeight - 8);

    // Right: Page number
    const pageStr = `Page ${i} of ${totalPages}`;
    const pageStrWidth = doc.getTextWidth(pageStr);
    doc.text(pageStr, pageWidth - 16 - pageStrWidth, pageHeight - 8);

    // Subtle footer line
    doc.setDrawColor(220, 215, 205);
    doc.setLineWidth(0.2);
    doc.line(16, pageHeight - 12, pageWidth - 16, pageHeight - 12);
  }
}

/**
 * Exports a single historical note to a formatted PDF
 */
export function exportSingleNoteToPDF(note: UserNote): void {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - (margin * 2);

  let y = 20;

  // Header Banner / Badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(184, 134, 11); // Gold tone
  doc.text('CHRONOS HISTORICAL ARCHIVES • SCHOLARLY DOSSIER', margin, y);
  y += 5;

  // Accent Line
  doc.setDrawColor(212, 175, 55); // Golden
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 9;

  // Note Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(25, 25, 25);
  const titleLines = doc.splitTextToSize(note.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += (titleLines.length * 7) + 2;

  // Meta info (Category, Date, Tags, Association)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(110, 100, 90);
  let metaText = `Category: ${note.targetType.toUpperCase()}`;
  if (note.targetTitle) {
    metaText += `   •   Entity: ${note.targetTitle}`;
  }
  metaText += `   •   Recorded: ${note.createdAt}`;
  doc.text(metaText, margin, y);
  y += 5;

  if (note.tags && note.tags.length > 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(184, 134, 11);
    doc.text(`Tags: ${note.tags.map(t => '#' + t).join('  ')}`, margin, y);
    y += 5;
  }

  // Subtle separator
  doc.setDrawColor(230, 225, 215);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Note Content
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);

  const paragraphs = note.content.split('\n');

  for (const para of paragraphs) {
    if (para.trim() === '') {
      y += 4;
      continue;
    }

    const lines = doc.splitTextToSize(para, contentWidth);
    const neededHeight = lines.length * 5;

    if (y + neededHeight > pageHeight - 18) {
      doc.addPage();
      y = 18;
    }

    doc.text(lines, margin, y);
    y += neededHeight + 3;
  }

  // Running footers & headers
  const totalPages = doc.getNumberOfPages();
  applyPageDecoration(doc, totalPages, note.title);

  // Save PDF
  const filename = `${sanitizeFilename(note.title)}_historical_note.pdf`;
  doc.save(filename);
}

/**
 * Exports all given notes (and optionally saved bookmarks) into a consolidated PDF
 */
export function exportNotesToPDF(
  notes: UserNote[],
  bookmarks?: Bookmark[],
  options?: { title?: string; includeBookmarks?: boolean }
): void {
  if (notes.length === 0 && (!bookmarks || bookmarks.length === 0)) {
    return;
  }

  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - (margin * 2);

  let y = 22;

  // Document Title Header
  const docTitle = options?.title || 'Historical Research Notes & Study Dossier';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(184, 134, 11); // Gold
  doc.text('CHRONOS HISTORICAL ARCHIVES • RESEARCH COMPENDIUM', margin, y);
  y += 6;

  // Gold Accent line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.0);
  doc.line(margin, y, pageWidth - margin, y);
  y += 9;

  // Main Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  doc.text(docTitle, margin, y);
  y += 7;

  // Subtitle with count & generation timestamp
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 95, 90);
  const subtitleText = `Compiled on ${getFormattedDate()}  •  ${notes.length} Research Notes${bookmarks && bookmarks.length > 0 && options?.includeBookmarks ? `  •  ${bookmarks.length} Scholarly Citations` : ''}  •  Offline Study Reader`;
  doc.text(subtitleText, margin, y);
  y += 7;

  // Divider
  doc.setDrawColor(210, 200, 185);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Render each note
  notes.forEach((note, index) => {
    // Check if we need a page break before starting a new note entry
    if (y > pageHeight - 45) {
      doc.addPage();
      y = 18;
    }

    // Note Number & Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(25, 25, 25);
    const titleText = `${index + 1}. ${note.title}`;
    const titleLines = doc.splitTextToSize(titleText, contentWidth - 30);
    doc.text(titleLines, margin, y);

    // Category badge on right side
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(160, 115, 10);
    const badgeText = `[${note.targetType.toUpperCase()}]`;
    const badgeWidth = doc.getTextWidth(badgeText);
    doc.text(badgeText, pageWidth - margin - badgeWidth, y);

    y += (titleLines.length * 5.5) + 1;

    // Meta & Association line
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(130, 120, 110);
    let noteMeta = `Recorded: ${note.createdAt}`;
    if (note.targetTitle) {
      noteMeta += `  •  Linked: ${note.targetTitle}`;
    }
    doc.text(noteMeta, margin, y);
    y += 4.5;

    if (note.tags && note.tags.length > 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(184, 134, 11);
      doc.text(`Tags: ${note.tags.map(t => '#' + t).join('  ')}`, margin, y);
      y += 4.5;
    }

    // Content body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(45, 45, 45);

    const paragraphs = note.content.split('\n');
    for (const para of paragraphs) {
      if (para.trim() === '') {
        y += 3;
        continue;
      }

      const lines = doc.splitTextToSize(para, contentWidth);
      const neededHeight = lines.length * 4.8;

      if (y + neededHeight > pageHeight - 18) {
        doc.addPage();
        y = 18;
      }

      doc.text(lines, margin, y);
      y += neededHeight + 2;
    }

    y += 4;

    // Separator line between notes
    if (index < notes.length - 1) {
      if (y > pageHeight - 25) {
        doc.addPage();
        y = 18;
      } else {
        doc.setDrawColor(235, 230, 220);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageWidth - margin, y);
        y += 8;
      }
    }
  });

  // Optional: Saved bookmarks / citations section if requested
  if (options?.includeBookmarks && bookmarks && bookmarks.length > 0) {
    if (y > pageHeight - 50) {
      doc.addPage();
      y = 18;
    } else {
      y += 8;
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.6);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(20, 20, 20);
    doc.text('Saved Scholarly Bookmarks & Citations', margin, y);
    y += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(110, 100, 90);
    doc.text(`Cross-referenced catalog archives (${bookmarks.length} items saved):`, margin, y);
    y += 6;

    bookmarks.forEach((bk, bIdx) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 18;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 30, 30);
      const bkTitle = `${bIdx + 1}. [${bk.type.toUpperCase()}] ${bk.title}`;
      doc.text(doc.splitTextToSize(bkTitle, contentWidth - 40), margin, y);

      if (bk.subtitle) {
        y += 4;
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(110, 105, 100);
        doc.text(doc.splitTextToSize(bk.subtitle, contentWidth - 10), margin + 4, y);
      }

      y += 5;
    });
  }

  // Apply running footers and headers to all pages
  const totalPages = doc.getNumberOfPages();
  applyPageDecoration(doc, totalPages, docTitle);

  // Save consolidated PDF
  const filename = `historical_research_notes_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}

/**
 * Exports bookmarks directly to a PDF
 */
export function exportBookmarksToPDF(bookmarks: Bookmark[]): void {
  if (bookmarks.length === 0) return;

  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - (margin * 2);

  let y = 22;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(184, 134, 11);
  doc.text('CHRONOS HISTORICAL ARCHIVES • SCHOLARLY CITATIONS', margin, y);
  y += 6;

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.0);
  doc.line(margin, y, pageWidth - margin, y);
  y += 9;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  doc.text('Saved Historical Bookmarks & Research Index', margin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 95, 90);
  doc.text(`Compiled on ${getFormattedDate()}  •  ${bookmarks.length} Archived References  •  Offline Study Index`, margin, y);
  y += 7;

  doc.setDrawColor(210, 200, 185);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  bookmarks.forEach((bk, idx) => {
    if (y > pageHeight - 25) {
      doc.addPage();
      y = 18;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(25, 25, 25);
    const bkTitle = `${idx + 1}. ${bk.title}`;
    doc.text(doc.splitTextToSize(bkTitle, contentWidth - 30), margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(160, 115, 10);
    const badge = `[${bk.type.toUpperCase()}]`;
    const bw = doc.getTextWidth(badge);
    doc.text(badge, pageWidth - margin - bw, y);
    y += 5;

    if (bk.subtitle) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 95, 90);
      const subLines = doc.splitTextToSize(bk.subtitle, contentWidth);
      doc.text(subLines, margin, y);
      y += (subLines.length * 4) + 1;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 135, 130);
    doc.text(`Bookmarked: ${bk.bookmarkedAt}`, margin, y);
    y += 6;

    if (idx < bookmarks.length - 1) {
      doc.setDrawColor(240, 235, 225);
      doc.setLineWidth(0.25);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;
    }
  });

  const totalPages = doc.getNumberOfPages();
  applyPageDecoration(doc, totalPages, 'Historical Bookmarks & Citations');

  const filename = `historical_bookmarks_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
