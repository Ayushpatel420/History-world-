import { UserNote, Bookmark } from '../types';

export interface VaultBackupMetadata {
  schemaVersion: string;
  app: string;
  exportedAt: string;
  exportDateFormatted: string;
  statistics: {
    totalNotes: number;
    totalBookmarks: number;
    noteCategories: Record<string, number>;
    bookmarkTypes: Record<string, number>;
  };
  scholarProfile?: {
    name?: string;
    email?: string;
    title?: string;
    level?: number;
  };
}

export interface VaultBackupPayload {
  chronosVaultBackup: boolean;
  metadata: VaultBackupMetadata;
  notes: UserNote[];
  bookmarks: Bookmark[];
}

/**
 * Sanitizes a title string for safe filesystem naming
 */
function sanitizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9_-]+/g, '_').slice(0, 40) || 'backup';
}

/**
 * Trigger browser download for a Blob
 */
function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 300);
}

/**
 * Export full notes and bookmarks into a formatted JSON backup file
 */
export function exportVaultBackupToJSON(
  notes: UserNote[],
  bookmarks: Bookmark[],
  scholarProfile?: { name?: string; email?: string; title?: string; level?: number }
): { filename: string; sizeBytes: number } {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const dateFormatted = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculate note categories distribution
  const noteCategories: Record<string, number> = {};
  notes.forEach((n) => {
    noteCategories[n.targetType] = (noteCategories[n.targetType] || 0) + 1;
  });

  // Calculate bookmark types distribution
  const bookmarkTypes: Record<string, number> = {};
  bookmarks.forEach((b) => {
    bookmarkTypes[b.type] = (bookmarkTypes[b.type] || 0) + 1;
  });

  const payload: VaultBackupPayload = {
    chronosVaultBackup: true,
    metadata: {
      schemaVersion: '1.0.0',
      app: 'Chronos World History Vault & Scholarly Archives',
      exportedAt: now.toISOString(),
      exportDateFormatted: dateFormatted,
      statistics: {
        totalNotes: notes.length,
        totalBookmarks: bookmarks.length,
        noteCategories,
        bookmarkTypes
      },
      scholarProfile
    },
    notes,
    bookmarks
  };

  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const filename = `chronos-history-vault-backup-${dateStr}.json`;

  triggerDownload(blob, filename);

  // Save last backup timestamp in localStorage for scholar records
  try {
    localStorage.setItem('chronos_last_backup_date', now.toISOString());
  } catch (e) {
    console.error('Failed to store last backup timestamp:', e);
  }

  return { filename, sizeBytes: blob.size };
}

/**
 * Export research notes only into a downloadable JSON file
 */
export function exportNotesOnlyToJSON(notes: UserNote[]): { filename: string; sizeBytes: number } {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  const payload = {
    chronosVaultNotesBackup: true,
    schemaVersion: '1.0.0',
    exportedAt: now.toISOString(),
    totalNotes: notes.length,
    notes
  };

  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const filename = `chronos-research-notes-${dateStr}.json`;

  triggerDownload(blob, filename);
  return { filename, sizeBytes: blob.size };
}

/**
 * Export saved bookmarks only into a downloadable JSON file
 */
export function exportBookmarksOnlyToJSON(bookmarks: Bookmark[]): { filename: string; sizeBytes: number } {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  const payload = {
    chronosVaultBookmarksBackup: true,
    schemaVersion: '1.0.0',
    exportedAt: now.toISOString(),
    totalBookmarks: bookmarks.length,
    bookmarks
  };

  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const filename = `chronos-saved-bookmarks-${dateStr}.json`;

  triggerDownload(blob, filename);
  return { filename, sizeBytes: blob.size };
}

/**
 * Export a single research note as an individual JSON dossier
 */
export function exportSingleNoteToJSON(note: UserNote): { filename: string } {
  const payload = {
    chronosSingleNote: true,
    exportedAt: new Date().toISOString(),
    note
  };

  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const safeTitle = sanitizeName(note.title);
  const filename = `note_${safeTitle}_${note.id.slice(-6)}.json`;

  triggerDownload(blob, filename);
  return { filename };
}

/**
 * Export notes and bookmarks as a clean, human-readable Markdown dossier
 */
export function exportNotesToMarkdown(notes: UserNote[], bookmarks: Bookmark[]): { filename: string } {
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let md = `# Chronos: World History Vault — Scholarly Research Dossier\n`;
  md += `**Exported Date:** ${dateFormatted}\n`;
  md += `**Total Notes:** ${notes.length} | **Total Bookmarks:** ${bookmarks.length}\n\n`;
  md += `---\n\n`;

  md += `## 📝 Historical Research Notes\n\n`;
  if (notes.length === 0) {
    md += `*No notes recorded yet.*\n\n`;
  } else {
    notes.forEach((note, idx) => {
      md += `### ${idx + 1}. ${note.title}\n`;
      md += `- **Category:** ${note.targetType}\n`;
      md += `- **Date Recorded:** ${note.createdAt}\n\n`;
      md += `${note.content}\n\n`;
      md += `---\n\n`;
    });
  }

  md += `## 🔖 Saved Historical Bookmarks & Artifacts\n\n`;
  if (bookmarks.length === 0) {
    md += `*No bookmarks saved yet.*\n\n`;
  } else {
    bookmarks.forEach((b, idx) => {
      md += `${idx + 1}. **${b.title}** (${b.type.toUpperCase()}) — ${b.subtitle || 'General Record'} *[Saved: ${b.bookmarkedAt}]*\n`;
    });
  }

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const filename = `chronos-historical-dossier-${now.toISOString().split('T')[0]}.md`;
  triggerDownload(blob, filename);
  return { filename };
}

/**
 * Validates and parses a raw JSON backup string
 */
export function validateAndParseBackupJSON(jsonString: string): {
  success: boolean;
  error?: string;
  data?: {
    notes: UserNote[];
    bookmarks: Bookmark[];
    metadata?: VaultBackupMetadata;
  };
} {
  try {
    const parsed = JSON.parse(jsonString);

    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Uploaded file is not a valid JSON object.' };
    }

    // Case 1: Full Vault Backup Payload
    if (Array.isArray(parsed.notes) || Array.isArray(parsed.bookmarks)) {
      const validNotes: UserNote[] = [];
      const validBookmarks: Bookmark[] = [];

      if (Array.isArray(parsed.notes)) {
        for (const item of parsed.notes) {
          if (item && typeof item === 'object' && typeof item.title === 'string' && typeof item.content === 'string') {
            validNotes.push({
              id: item.id || `note_restored_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
              title: item.title,
              content: item.content,
              targetType: item.targetType || 'General',
              targetId: item.targetId,
              targetTitle: item.targetTitle,
              tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
              createdAt: item.createdAt || new Date().toLocaleDateString(),
              updatedAt: item.updatedAt
            });
          }
        }
      }

      if (Array.isArray(parsed.bookmarks)) {
        for (const item of parsed.bookmarks) {
          if (item && typeof item === 'object' && typeof item.title === 'string' && typeof item.type === 'string') {
            validBookmarks.push({
              id: item.id || `bk_restored_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
              type: item.type,
              targetId: item.targetId || item.id || 'record',
              title: item.title,
              subtitle: item.subtitle,
              bookmarkedAt: item.bookmarkedAt || new Date().toLocaleDateString()
            });
          }
        }
      }

      return {
        success: true,
        data: {
          notes: validNotes,
          bookmarks: validBookmarks,
          metadata: parsed.metadata
        }
      };
    }

    // Case 2: Array of raw notes
    if (Array.isArray(parsed)) {
      const validNotes: UserNote[] = [];
      for (const item of parsed) {
        if (item && typeof item === 'object' && typeof item.title === 'string' && typeof item.content === 'string') {
          validNotes.push({
            id: item.id || `note_restored_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            title: item.title,
            content: item.content,
            targetType: item.targetType || 'General',
            targetId: item.targetId,
            targetTitle: item.targetTitle,
            tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
            createdAt: item.createdAt || new Date().toLocaleDateString(),
            updatedAt: item.updatedAt
          });
        }
      }
      return {
        success: true,
        data: {
          notes: validNotes,
          bookmarks: []
        }
      };
    }

    // Case 3: Single Note JSON
    if (parsed.note && typeof parsed.note.title === 'string' && typeof parsed.note.content === 'string') {
      return {
        success: true,
        data: {
          notes: [{
            id: parsed.note.id || `note_restored_${Date.now()}`,
            title: parsed.note.title,
            content: parsed.note.content,
            targetType: parsed.note.targetType || 'General',
            targetId: parsed.note.targetId,
            createdAt: parsed.note.createdAt || new Date().toLocaleDateString()
          }],
          bookmarks: []
        }
      };
    }

    return {
      success: false,
      error: 'The uploaded file does not conform to Chronos History Vault backup schema (missing valid notes or bookmarks).'
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Failed to parse JSON file: ${err.message || 'Invalid syntax'}`
    };
  }
}

/**
 * Safely merges imported notes and bookmarks with existing records, avoiding duplicates
 */
export function mergeVaultBackupData(
  existingNotes: UserNote[],
  existingBookmarks: Bookmark[],
  importedNotes: UserNote[],
  importedBookmarks: Bookmark[]
): {
  mergedNotes: UserNote[];
  mergedBookmarks: Bookmark[];
  newNotesAdded: number;
  newBookmarksAdded: number;
} {
  const existingNoteIds = new Set(existingNotes.map((n) => n.id));
  const existingNoteTitles = new Set(existingNotes.map((n) => n.title.trim().toLowerCase()));

  const newNotesToAppend: UserNote[] = [];
  for (const impNote of importedNotes) {
    // If not identical ID and not identical title, add
    if (!existingNoteIds.has(impNote.id) && !existingNoteTitles.has(impNote.title.trim().toLowerCase())) {
      newNotesToAppend.push(impNote);
    }
  }

  const existingBkKeys = new Set(existingBookmarks.map((b) => `${b.type}_${b.targetId}`));
  const newBookmarksToAppend: Bookmark[] = [];
  for (const impBk of importedBookmarks) {
    const key = `${impBk.type}_${impBk.targetId}`;
    if (!existingBkKeys.has(key)) {
      newBookmarksToAppend.push(impBk);
    }
  }

  return {
    mergedNotes: [...newNotesToAppend, ...existingNotes],
    mergedBookmarks: [...newBookmarksToAppend, ...existingBookmarks],
    newNotesAdded: newNotesToAppend.length,
    newBookmarksAdded: newBookmarksToAppend.length
  };
}
