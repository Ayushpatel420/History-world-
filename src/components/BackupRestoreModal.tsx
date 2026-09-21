import { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Bookmark as BookmarkIcon, 
  RefreshCw
} from 'lucide-react';
import { UserNote, Bookmark } from '../types';
import { 
  validateAndParseBackupJSON, 
  mergeVaultBackupData 
} from '../utils/backupManager';

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: UserNote[];
  bookmarks: Bookmark[];
  onImportBackup: (importedNotes: UserNote[], importedBookmarks: Bookmark[], mode: 'merge' | 'replace') => void;
  scholarProfile?: { name?: string; email?: string; title?: string; level?: number };
}

export default function BackupRestoreModal({
  isOpen,
  onClose,
  notes,
  bookmarks,
  onImportBackup,
  scholarProfile
}: BackupRestoreModalProps) {
  // Import states
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<{
    valid: boolean;
    error?: string;
    notesCount: number;
    bookmarksCount: number;
    exportDate?: string;
    parsedNotes: UserNote[];
    parsedBookmarks: Bookmark[];
  } | null>(null);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle uploaded file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setUploadedFile(file);
    setStatusMessage(null);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const res = validateAndParseBackupJSON(content);

      if (res.success && res.data) {
        setImportPreview({
          valid: true,
          notesCount: res.data.notes.length,
          bookmarksCount: res.data.bookmarks.length,
          exportDate: res.data.metadata?.exportDateFormatted || res.data.metadata?.exportedAt,
          parsedNotes: res.data.notes,
          parsedBookmarks: res.data.bookmarks
        });
      } else {
        setImportPreview({
          valid: false,
          error: res.error || 'Invalid backup format.',
          notesCount: 0,
          bookmarksCount: 0,
          parsedNotes: [],
          parsedBookmarks: []
        });
      }
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setImportPreview({
        valid: false,
        error: 'Failed to read file from disk.',
        notesCount: 0,
        bookmarksCount: 0,
        parsedNotes: [],
        parsedBookmarks: []
      });
      setIsProcessing(false);
    };
    reader.readAsText(file);
  };

  const handleExecuteImport = () => {
    if (!importPreview || !importPreview.valid) return;

    try {
      onImportBackup(importPreview.parsedNotes, importPreview.parsedBookmarks, importMode);
      setStatusMessage({
        type: 'success',
        text: `Restored ${importPreview.notesCount} notes & ${importPreview.bookmarksCount} bookmarks using "${importMode}" mode!`
      });
      // Reset upload preview after brief delay
      setTimeout(() => {
        setImportPreview(null);
        setUploadedFile(null);
      }, 2500);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Import failed: ${err.message}` });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#0D0B08] border border-[#2E271C] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#262016] bg-[#14110C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic font-bold text-lg text-white tracking-tight flex items-center gap-2">
                Scholarly Archive Restore Hub
              </h3>
              <p className="text-[11px] font-mono text-[#A09890]">
                Restore notebook notes & saved bookmarks from previous archives
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1F1C18] hover:bg-[#2E271C] text-[#A09890] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-left">
          {statusMessage && (
            <div className={`p-3 rounded-xl flex items-center gap-2 text-xs font-mono ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-300'
                : 'bg-red-950/40 border border-red-800/60 text-red-300'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <div className="space-y-5">
            {/* Drag & drop upload area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#3A3224] hover:border-[#D4AF37] bg-[#14110C]/70 hover:bg-[#1C1811] rounded-2xl p-8 text-center cursor-pointer transition-all space-y-3"
            >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    {uploadedFile ? uploadedFile.name : 'Choose a JSON Backup File or Drag & Drop Here'}
                  </div>
                  <div className="text-xs text-[#8E867C] font-mono mt-1">
                    Compatible with files exported from Chronos World History Vault
                  </div>
                </div>
                <span className="inline-block px-3 py-1 bg-[#262016] text-[#D4AF37] text-[10px] font-mono font-bold uppercase rounded-lg">
                  Browse Files (.json)
                </span>
              </div>

              {/* Upload verification results */}
              {isProcessing && (
                <div className="text-center py-4 text-xs font-mono text-[#D4AF37] flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Validating backup structure...</span>
                </div>
              )}

              {importPreview && (
                <div className={`p-4 rounded-xl border space-y-4 ${
                  importPreview.valid
                    ? 'bg-[#14110C] border-[#3A3224]'
                    : 'bg-red-950/20 border-red-800/50'
                }`}>
                  {importPreview.valid ? (
                    <>
                      <div className="flex items-center justify-between border-b border-[#262016] pb-3">
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Valid Chronos Backup Archive Detected</span>
                        </div>
                        {importPreview.exportDate && (
                          <div className="text-[10px] font-mono text-[#8E867C]">
                            Exported: {importPreview.exportDate}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#0A0907] p-3 rounded-lg border border-[#221D15]">
                          <span className="text-[10px] font-mono text-[#8E867C] uppercase block">Found Notes</span>
                          <span className="text-base font-bold text-white font-mono">{importPreview.notesCount} notes</span>
                        </div>
                        <div className="bg-[#0A0907] p-3 rounded-lg border border-[#221D15]">
                          <span className="text-[10px] font-mono text-[#8E867C] uppercase block">Found Bookmarks</span>
                          <span className="text-base font-bold text-[#D4AF37] font-mono">{importPreview.bookmarksCount} bookmarks</span>
                        </div>
                      </div>

                      {/* Restore Mode Option */}
                      <div className="space-y-2 pt-1">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E867C] block">
                          Restoration Strategy
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setImportMode('merge')}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                              importMode === 'merge'
                                ? 'bg-[#1C1811] border-[#D4AF37] text-white'
                                : 'bg-[#0A0907] border-[#221D15] text-[#8E867C]'
                            }`}
                          >
                            <div className="text-xs font-bold text-[#D4AF37]">Merge (Safe & Recommended)</div>
                            <div className="text-[10px] text-[#A09890] mt-0.5 font-sans">
                              Keeps existing notes and adds new records from the backup.
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setImportMode('replace')}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                              importMode === 'replace'
                                ? 'bg-red-950/30 border-red-600 text-white'
                                : 'bg-[#0A0907] border-[#221D15] text-[#8E867C]'
                            }`}
                          >
                            <div className="text-xs font-bold text-red-400">Replace / Overwrite All</div>
                            <div className="text-[10px] text-[#A09890] mt-0.5 font-sans">
                              Replaces current notes & bookmarks with this backup.
                            </div>
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleExecuteImport}
                        className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Confirm & Restore ({importPreview.notesCount} Notes, {importPreview.bookmarksCount} Bookmarks)</span>
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Invalid Backup File</span>
                      </div>
                      <p className="text-xs text-red-300 font-sans leading-relaxed">
                        {importPreview.error}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#262016] bg-[#0A0907] flex items-center justify-between text-xs text-[#8E867C] font-mono">
          <span>🔒 Client-side, privacy-preserving storage</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1F1C18] hover:bg-[#2E271C] text-[#CCC2B8] hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
