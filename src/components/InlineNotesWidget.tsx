import { useState } from 'react';
import { UserNote } from '../types';
import { Plus, Trash2, Bookmark, Calendar, Tag, X } from 'lucide-react';

interface InlineNotesWidgetProps {
  targetId: string;
  targetType: UserNote['targetType'];
  targetName: string;
  notes: UserNote[];
  onAddNote: (
    title: string,
    content: string,
    type: UserNote['targetType'],
    targetId?: string,
    tags?: string[],
    targetTitle?: string
  ) => void;
  onDeleteNote: (id: string) => void;
}

export default function InlineNotesWidget({
  targetId,
  targetType,
  targetName,
  notes,
  onAddNote,
  onDeleteNote,
}: InlineNotesWidgetProps) {
  const [noteText, setNoteText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [customTagInput, setCustomTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(() => {
    const slug = targetName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return [targetType.toLowerCase(), slug].filter(Boolean);
  });

  // Filter notes mapped to this specific historical entity
  const tiedNotes = notes.filter(
    (n) => n.targetId === targetId ||
      (n.targetTitle && n.targetTitle.toLowerCase() === targetName.toLowerCase()) ||
      (n.targetType === targetType && n.title.toLowerCase().includes(targetName.toLowerCase()))
  );

  const handleAddTag = (tagToAdd: string) => {
    const cleaned = tagToAdd.trim().toLowerCase().replace(/^#/, '');
    if (cleaned && !tags.includes(cleaned)) {
      setTags([...tags, cleaned]);
    }
    setCustomTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const title = noteTitle.trim() || `My Research: ${targetName}`;
    onAddNote(title, noteText, targetType, targetId, tags, targetName);

    setNoteText('');
    setNoteTitle('');
    setShowForm(false);
    // Reset tags to defaults
    const slug = targetName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    setTags([targetType.toLowerCase(), slug].filter(Boolean));
  };

  return (
    <div className="mt-6 pt-5 border-t border-[#2A2A2A] space-y-4 text-left">
      <div className="flex items-center justify-between">
        <h5 className="font-serif italic text-sm font-bold text-[#D4AF37] flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-[#D4AF37]" />
          <span>Personal Study Notes ({tiedNotes.length})</span>
        </h5>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-[11px] font-mono font-bold bg-[#151515] hover:bg-[#1E1E1E] text-[#D4AF37] px-2.5 py-1 rounded border border-[#2A2A2A] transition-all cursor-pointer"
        >
          {showForm ? 'Cancel Note' : '✏️ Write Custom Note'}
        </button>
      </div>

      {/* Write custom note form */}
      {showForm && (
        <form onSubmit={handleSaveNote} className="bg-[#050505] border border-[#2A2A2A] rounded-xl p-4.5 space-y-3.5 animate-fade-in">
          <div className="space-y-1">
            <label className="text-[9px] text-[#A09890] uppercase tracking-wider font-mono block">Note Title (Optional)</label>
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder={`e.g. Analysis on ${targetName}`}
              className="w-full p-2.5 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-[#A09890] uppercase tracking-wider font-mono block">Your Research Note</label>
            <textarea
              required
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Type your primary findings, timelines, or arguments here..."
              className="w-full p-2.5 text-xs bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] resize-none"
            />
          </div>

          {/* Tags manager */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-[9px] text-[#A09890] uppercase tracking-wider font-mono flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#D4AF37]" />
                <span>Tags for Notebook Search</span>
              </label>
              <span className="text-[9px] text-[#A09890] font-mono">Press Enter to add tag</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 min-h-[30px] p-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#181818] border border-[#333] text-[#D4AF37] text-[10px] font-mono"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-400 cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    handleAddTag(customTagInput);
                  }
                }}
                placeholder={tags.length === 0 ? "Add tags (e.g. tactics, bio)..." : "+ tag"}
                className="bg-transparent text-[11px] text-[#E0D8D0] focus:outline-none font-mono min-w-[80px] flex-1 px-1"
              />
            </div>

            {/* Recommended tags */}
            <div className="flex flex-wrap gap-1 pt-0.5">
              {['analysis', 'key-milestone', 'exam-prep', 'legacy', 'primary-source'].filter(t => !tags.includes(t)).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleAddTag(t)}
                  className="text-[9px] font-mono text-[#8CA59C] hover:text-[#D4AF37] bg-[#121212] px-1.5 py-0.5 rounded border border-[#202020] hover:border-[#D4AF37]/40 cursor-pointer transition-colors"
                >
                  +{t}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#D4AF37] hover:bg-black text-black hover:text-[#D4AF37] border border-[#D4AF37] text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" /> Save Linked Note
          </button>
        </form>
      )}

      {/* Render list of linked notes */}
      {tiedNotes.length > 0 ? (
        <div className="space-y-3">
          {tiedNotes.map((note) => (
            <div
              key={note.id}
              className="bg-[#0A0A0A] border border-[#232323] hover:border-[#D4AF37]/30 rounded-xl p-4 flex flex-col justify-between gap-3 text-left transition-all"
            >
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between text-[10px] text-[#A09890] font-mono pb-1 border-b border-[#1E1E1E]">
                  <span className="font-bold text-[#D4AF37]">{note.title}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {note.createdAt}
                  </span>
                </div>
                <p className="text-xs text-[#8CA59C] font-sans leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>

                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {note.tags.map((t) => (
                      <span key={t} className="text-[9px] font-mono text-[#D4AF37]/80 bg-[#161616] px-1.5 py-0.5 rounded border border-[#262626]">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-1 border-t border-[#1C1C1C]">
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="text-[10px] font-mono text-rose-500 hover:text-rose-400 flex items-center gap-1 transition-all cursor-pointer"
                  title="Remove this linked note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-[#8CA59C]/60 italic font-sans">
          No personal notes pinned to this historical entity yet. Write a custom research note above to track your findings!
        </p>
      )}
    </div>
  );
}
