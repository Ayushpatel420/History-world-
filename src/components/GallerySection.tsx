import { useState, useMemo } from 'react';
import { Camera, Search, Info, Sparkles, Loader2, CheckCircle2, Compass } from 'lucide-react';
import { Artifact } from '../types';
import { ARTIFACTS } from '../data/historyData';
import D3ArtifactViewer from './D3ArtifactViewer';

export default function GallerySection() {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [genNote, setGenNote] = useState<string | null>(null);
  const [isD3ModalOpen, setIsD3ModalOpen] = useState<boolean>(false);

  // Load custom-generated image overrides from localStorage
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem('chronos_gallery_overrides') || '{}');
    } catch {
      return {};
    }
  });

  const handleGenerateImage = async (artifact: Artifact) => {
    setGeneratingId(artifact.id);
    setGenNote(null);
    try {
      const response = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: artifact.name,
          prompt: artifact.description,
          origin: artifact.origin,
          period: artifact.period
        })
      });

      if (!response.ok) {
        throw new Error('API server returned an error code.');
      }

      const data = await response.json();
      if (data.imageUrl) {
        const newOverrides = { ...imageOverrides, [artifact.id]: data.imageUrl };
        setImageOverrides(newOverrides);
        localStorage.setItem('chronos_gallery_overrides', JSON.stringify(newOverrides));
        
        if (data.note) {
          setGenNote(data.note);
        } else {
          setGenNote("Successfully reconstructed photorealistic rendering from historic parameters!");
        }
      }
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      setGenNote("Reconstruction failed. Checked system limits.");
    } finally {
      setGeneratingId(null);
    }
  };

  // Deduplicate relics so that we only showcase distinct unique physical/photographic relics
  const uniqueArtifacts = useMemo(() => {
    const seenImages = new Set<string>();
    const seenNames = new Set<string>();
    const result: Artifact[] = [];
    
    for (const art of ARTIFACTS) {
      if (!art || !art.imageUrl) continue;
      const img = art.imageUrl.trim();
      // Normalize name to filter out trailing "Reference X" pattern on repeating items
      const baseName = art.name.replace(/\sReference\s\d+$/i, '').trim().toLowerCase();
      
      if (!seenImages.has(img) && !seenNames.has(baseName)) {
        seenImages.add(img);
        seenNames.add(baseName);
        result.push(art);
      }
    }
    return result;
  }, []);

  const filteredArtifacts = uniqueArtifacts.filter((art) => 
    art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      {/* Intro header */}
      <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <h3 className="text-xl font-serif italic text-[#D4AF37] tracking-tight flex items-center gap-2">
            <Camera className="text-[#D4AF37] w-5.5 h-5.5" />
            Curator's Archive: Original Photograph & Artifacts
          </h3>
          <p className="text-xs text-[#A09890] mt-1 font-sans">
            Gaze upon the physical remnants and photographic records that authenticate history. Generate matching AI photorealistic renders.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative shrink-0 max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#A09890]" />
          <input
            type="text"
            placeholder="Search relics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 w-full bg-[#0A0A0A] text-[#E0D8D0] border border-[#2A2A2A] rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {selectedArtifact ? (
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 relative animate-fade-in space-y-4 text-left">
          <button
            onClick={() => {
              setSelectedArtifact(null);
              setGenNote(null);
            }}
            className="absolute top-4 right-4 text-xs font-bold text-[#E0D8D0] hover:text-[#D4AF37] border border-[#2A2A2A] px-3 py-1.5 rounded-lg bg-[#0A0A0A] shadow-md transition-all cursor-pointer z-10"
          >
            ← Back to Archive Gallery
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
            <div className="md:col-span-6 relative group overflow-hidden rounded-xl border border-[#2A2A2A] shadow-lg bg-black p-2 min-h-[300px] flex flex-col justify-center">
              {generatingId === selectedArtifact.id ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-20 text-center">
                  <Loader2 className="w-10 h-10 text-[#D4AF37] animate-spin" />
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider animate-pulse">Temporal Mirror Engaged</p>
                    <p className="text-[11px] text-[#A09890] max-w-xs font-sans">
                      Reconstructing material textures, mineral decay, and photorealistic studio lighting for <span className="italic">"{selectedArtifact.name}"</span>...
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={imageOverrides[selectedArtifact.id] || selectedArtifact.imageUrl}
                    alt={selectedArtifact.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-96 object-cover rounded-lg group-hover:scale-101 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/85 border border-[#2A2A2A] text-[#D4AF37] px-2.5 py-1 rounded text-[10px] font-mono tracking-wider">
                    {imageOverrides[selectedArtifact.id] ? "✨ Dynamic AI Reconstructed" : "Original Sample Image"}
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-6 flex flex-col justify-between py-2 space-y-4 text-left">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap text-xs text-left">
                  <span className="bg-[#1A1A1A] border border-[#2A2A2A] text-[#D4AF37] px-2.5 py-0.5 rounded font-mono font-bold">
                    🛡 Discovery Location: {selectedArtifact.origin}
                  </span>
                  <span className="bg-[#1E160F] border border-amber-500/25 text-[#D4AF37] px-2.5 py-0.5 rounded font-mono font-bold">
                     {selectedArtifact.period}
                  </span>
                </div>

                <h4 className="text-2.5xl font-serif italic text-white tracking-normal text-left">{selectedArtifact.name}</h4>
                <p className="text-sm text-[#A09890] leading-relaxed font-sans mt-3 text-left">
                  {selectedArtifact.description}
                </p>
              </div>

              {/* Action Buttons to reconstruct rendering using dynamic Gemini Image Model */}
              <div className="space-y-3.5">
                <button
                  onClick={() => handleGenerateImage(selectedArtifact)}
                  disabled={generatingId !== null}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#D4AF37] text-black hover:bg-black hover:text-[#D4AF37] disabled:opacity-50 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border border-[#D4AF37] transition-all cursor-pointer hover:shadow-lg hover:shadow-[#D4AF37]/10"
                >
                  {generatingId === selectedArtifact.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Reconstructing Material Matrix...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4.5 h-4.5" />
                      <span>Generate Dynamic AI Photorealistic Render</span>
                    </>
                  )}
                </button>

                {genNote && (
                  <div className="p-3 bg-[#122C26]/20 border border-[#234D43] text-[#8CA59C] rounded-xl flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                    <span>{genNote}</span>
                  </div>
                )}

                <button
                  onClick={() => setIsD3ModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500/10 to-cyan-500/10 hover:from-amber-500/20 hover:to-cyan-500/20 text-[#E5C158] border border-cyan-500/40 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10 animate-pulse"
                >
                  <Compass className="w-4 h-4 text-[#E5C158] animate-spin-slow" />
                  <span>🔍 Holographic D3 Structural Diagnostics</span>
                </button>

                <div className="p-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl space-y-2 text-left">
                  <h5 className="font-serif italic font-bold text-[#D4AF37] text-xs uppercase tracking-widest flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#D4AF37]" /> Curatorial Context
                  </h5>
                  <p className="text-xs text-[#A09890] leading-relaxed font-sans">
                    These artifacts serve as empirical testimonies of the periods under analysis in our country and king vaults. Triggering the dynamic image generation simulates high-resolution museum capture conditions using physical parameters and decay details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : filteredArtifacts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {filteredArtifacts.map((art) => {
            const hasOverride = !!imageOverrides[art.id];
            return (
              <div
                key={art.id}
                onClick={() => setSelectedArtifact(art)}
                className="group bg-[#0F0F0F] border border-[#2A2A2A] hover:border-[#D4AF37]/50 hover:shadow-lg rounded-xl p-3 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-[#0A0A0A] border border-[#2A2A2A] relative">
                    <img
                      src={imageOverrides[art.id] || art.imageUrl}
                      alt={art.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black/85 border border-[#2A2A2A] text-[#D4AF37] text-[9px] font-mono px-2 py-0.5 rounded backdrop-blur flex items-center gap-1">
                      {hasOverride && <Sparkles className="w-2.5 h-2.5 text-[#E5C158]" />}
                      <span>{art.period}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <h5 className="font-serif italic font-bold text-white group-hover:text-[#D4AF37] leading-tight tracking-normal text-sm sm:test-base line-clamp-1">
                      {art.name}
                    </h5>
                    <p className="text-[11px] text-[#A09890] font-mono italic">Origin: {art.origin}</p>
                    <p className="text-xs text-[#A09890] line-clamp-2 mt-1 leading-relaxed font-sans">{art.description}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1c1c1c] flex gap-2 w-full">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArtifact(art);
                      setIsD3ModalOpen(true);
                    }}
                    className="flex-1 py-1.5 px-2 bg-[#0C1212] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#1F2C2C]/85 rounded-lg text-[10px] font-mono tracking-tight transition-all flex items-center justify-center gap-1 cursor-pointer font-bold"
                    title="Launch Holographic D3 Simulation directly"
                  >
                    <Compass className="w-3.5 h-3.5 animate-spin-slow shrink-0 text-[#E5C158]" />
                    <span>Run 3D Sim</span>
                  </button>
                  <button
                    onClick={() => setSelectedArtifact(art)}
                    className="flex-1 py-1.5 px-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 rounded-lg text-[10px] font-mono tracking-tight transition-all flex items-center justify-center gap-1 cursor-pointer font-semibold"
                  >
                    <span>Inspect</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-12 text-center">
          <p className="text-[#A09890]">No archival relics found matching that query term.</p>
        </div>
      )}

      {isD3ModalOpen && selectedArtifact && (
        <D3ArtifactViewer
          artifactId={selectedArtifact.id}
          artifactName={selectedArtifact.name}
          onClose={() => setIsD3ModalOpen(false)}
        />
      )}
    </div>
  );
}

