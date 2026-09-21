import { useState, useEffect, useRef } from 'react';
import { RotateCw, Play, Pause, ZoomIn, ZoomOut, Maximize2, Minimize2, Sun, Eye, Compass, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { ArtifactView360Frame, ArtifactImage } from '../types';

interface Artifact360ViewerProps {
  views360: ArtifactView360Frame[];
  galleryImages: ArtifactImage[];
  artifactName: string;
  category: string;
}

export default function Artifact360Viewer({
  views360,
  galleryImages,
  artifactName,
  category
}: Artifact360ViewerProps) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState<'normal' | 'slow'>('normal');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lightingMode, setLightingMode] = useState<'museum' | 'raking' | 'xray'>('museum');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [activeTab, setActiveTab] = useState<'360' | 'gallery'>('360');
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-turntable spinning interval
  useEffect(() => {
    if (!isAutoSpinning || activeTab !== '360') return;

    const intervalMs = spinSpeed === 'normal' ? 1400 : 2400;
    const timer = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % views360.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isAutoSpinning, spinSpeed, views360.length, activeTab]);

  // Handle Drag / Scrubbing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTab !== '360') return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setIsAutoSpinning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || activeTab !== '360') return;
    const deltaX = e.clientX - dragStartX;
    const threshold = 35; // Pixels per frame step

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // Drag right -> rotate right
        setCurrentFrameIndex((prev) => (prev - 1 + views360.length) % views360.length);
      } else {
        // Drag left -> rotate left
        setCurrentFrameIndex((prev) => (prev + 1) % views360.length);
      }
      setDragStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile / tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (activeTab !== '360' || e.touches.length === 0) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setIsAutoSpinning(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || activeTab !== '360' || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    const threshold = 30;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        setCurrentFrameIndex((prev) => (prev - 1 + views360.length) % views360.length);
      } else {
        setCurrentFrameIndex((prev) => (prev + 1) % views360.length);
      }
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const currentFrame = views360[currentFrameIndex] || views360[0];
  const activeImageSrc = activeTab === '360' ? currentFrame?.imageUrl : galleryImages[selectedGalleryIdx]?.url;

  const handleImageError = (url: string) => {
    setImageError((prev) => ({ ...prev, [url]: true }));
  };

  // Lighting Filter CSS Classes
  const getFilterStyle = () => {
    switch (lightingMode) {
      case 'raking':
        return 'contrast-130 brightness-105 saturate-110 drop-shadow-[0_10px_25px_rgba(212,175,55,0.25)]';
      case 'xray':
        return 'invert hue-rotate-180 contrast-150 brightness-90 grayscale';
      case 'museum':
      default:
        return 'contrast-105 brightness-100';
    }
  };

  return (
    <div
      ref={containerRef}
      id="artifact-360-viewer"
      className={`relative bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl max-h-[96vh]' : 'w-full'
      }`}
    >
      {/* Top Action Bar */}
      <div className="bg-[#121212] border-b border-[#2A2A2A] px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
        {/* Tab switch between 360 Turntable and High-Res Multi-Angle Gallery */}
        <div className="flex items-center gap-1 bg-[#1A1A1A] p-1 rounded-xl border border-[#2A2A2A]">
          <button
            id="tab-360-view"
            onClick={() => { setActiveTab('360'); setZoomLevel(1); }}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === '360'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-[#A09890] hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" /> 360° Turntable
          </button>
          <button
            id="tab-gallery-view"
            onClick={() => { setActiveTab('gallery'); setZoomLevel(1); setIsAutoSpinning(false); }}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-[#A09890] hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> High-Res Gallery ({galleryImages.length})
          </button>
        </div>

        {/* Lighting Mode Selector */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono text-[#8E867C] hidden sm:inline uppercase">Lighting:</span>
          <button
            id="lighting-museum"
            onClick={() => setLightingMode('museum')}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
              lightingMode === 'museum' ? 'bg-[#262626] text-[#D4AF37] border border-[#D4AF37]/40' : 'text-[#8E867C] hover:text-white'
            }`}
            title="Museum Gallery Lighting"
          >
            <Sun className="w-3 h-3 inline mr-1" /> Museum
          </button>
          <button
            id="lighting-raking"
            onClick={() => setLightingMode('raking')}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
              lightingMode === 'raking' ? 'bg-[#262626] text-[#D4AF37] border border-[#D4AF37]/40' : 'text-[#8E867C] hover:text-white'
            }`}
            title="High-Contrast Raking Light (Enhances Carvings & Hieroglyphs)"
          >
            <Sparkles className="w-3 h-3 inline mr-1" /> Relief
          </button>
          <button
            id="lighting-xray"
            onClick={() => setLightingMode('xray')}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
              lightingMode === 'xray' ? 'bg-[#262626] text-[#D4AF37] border border-[#D4AF37]/40' : 'text-[#8E867C] hover:text-white'
            }`}
            title="Deep Spectral Inversion (Internal Structure)"
          >
            <Eye className="w-3 h-3 inline mr-1" /> Spectral
          </button>

          {/* Fullscreen Toggle */}
          <button
            id="viewer-fullscreen-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-[#A09890] hover:text-white hover:bg-[#202020] rounded-lg transition-all ml-1 cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen View'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Visual Stage Canvas */}
      <div
        className={`relative flex items-center justify-center bg-[#070707] overflow-hidden select-none cursor-grab active:cursor-grabbing ${
          isFullscreen ? 'h-[64vh]' : 'h-[360px] sm:h-[420px]'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle Pedestal / Spotlight Atmosphere */}
        <div className="absolute inset-0 bg-radial from-[#D4AF37]/10 via-transparent to-black pointer-events-none" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-[#D4AF37]/10 blur-2xl rounded-full pointer-events-none" />

        {/* Display Image with Smooth Scaling & Lighting */}
        {activeImageSrc && !imageError[activeImageSrc] ? (
          <img
            key={activeImageSrc}
            src={activeImageSrc}
            alt={`${artifactName} - ${activeTab === '360' ? currentFrame?.label : galleryImages[selectedGalleryIdx]?.caption}`}
            referrerPolicy="no-referrer"
            onError={() => handleImageError(activeImageSrc)}
            className={`max-h-full max-w-full object-contain transition-transform duration-200 pointer-events-none ${getFilterStyle()}`}
            style={{ transform: `scale(${zoomLevel})` }}
          />
        ) : (
          /* Graceful stylized artifact engraving fallback if network image fails */
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-3 z-10">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] bg-[#121212] shadow-inner">
              <RotateCw className="w-10 h-10 animate-spin-slow text-[#D4AF37]" />
            </div>
            <div>
              <h5 className="font-serif italic text-[#D4AF37] text-base font-bold">{artifactName}</h5>
              <p className="text-xs text-[#8E867C] max-w-sm mt-1">
                {currentFrame?.annotation || 'Museum high-resolution archival replica'}
              </p>
            </div>
          </div>
        )}

        {/* 360° Angle Compass Overlay (When in 360 mode) */}
        {activeTab === '360' && currentFrame && (
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#2A2A2A] px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-[#E5C158]">
              {currentFrame.angleDeg}°
            </span>
            <span className="text-[10px] text-[#A09890] font-sans border-l border-[#333] pl-2">
              {currentFrame.label}
            </span>
          </div>
        )}

        {/* Drag Hint Watermark on Initial Frame */}
        {activeTab === '360' && !isAutoSpinning && (
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 text-[#A09890] px-2.5 py-1 rounded-lg text-[9px] font-mono pointer-events-none flex items-center gap-1.5">
            <RotateCw className="w-2.5 h-2.5 text-[#D4AF37]" />
            <span>Click & drag to rotate 360°</span>
          </div>
        )}

        {/* Zoom Controls Overlay */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/80 backdrop-blur-md border border-[#2A2A2A] p-1 rounded-xl shadow-lg">
          <button
            id="zoom-out-btn"
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
            disabled={zoomLevel <= 0.8}
            className="p-1.5 text-[#A09890] hover:text-white disabled:opacity-30 rounded-lg cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono px-1 text-[#E5C158]">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            id="zoom-in-btn"
            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
            disabled={zoomLevel >= 2.5}
            className="p-1.5 text-[#A09890] hover:text-white disabled:opacity-30 rounded-lg cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Frame Step Arrows */}
        {activeTab === '360' && (
          <>
            <button
              onClick={() => setCurrentFrameIndex((prev) => (prev - 1 + views360.length) % views360.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-[#D4AF37] text-white hover:text-black rounded-full border border-white/10 transition-all cursor-pointer shadow-md"
              title="Rotate Counter-Clockwise"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentFrameIndex((prev) => (prev + 1) % views360.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-[#D4AF37] text-white hover:text-black rounded-full border border-white/10 transition-all cursor-pointer shadow-md"
              title="Rotate Clockwise"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Frame Annotation / Perspective Description */}
      <div className="bg-[#0E0E0E] px-4 py-2.5 border-t border-[#2A2A2A] flex items-center justify-between gap-3 text-left">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold text-[#D4AF37] tracking-wider">
              {activeTab === '360' ? currentFrame?.label : galleryImages[selectedGalleryIdx]?.angle}
            </span>
            <span className="text-[10px] text-[#7A7268] font-sans">
              ({activeTab === '360' ? `Azimuth ${currentFrame?.angleDeg}°` : `Angle ${selectedGalleryIdx + 1} of ${galleryImages.length}`})
            </span>
          </div>
          <p className="text-xs text-[#CCC2B8] font-sans line-clamp-1">
            {activeTab === '360' ? currentFrame?.annotation : galleryImages[selectedGalleryIdx]?.caption}
          </p>
        </div>

        {/* Auto Spin Toggle (360 mode only) */}
        {activeTab === '360' && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="toggle-auto-spin"
              onClick={() => setIsAutoSpinning(!isAutoSpinning)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer shadow border ${
                isAutoSpinning
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#181818] text-[#E0D8D0] border-[#333] hover:bg-[#222]'
              }`}
            >
              {isAutoSpinning ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" /> Pause Spin
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" /> Auto-Spin
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Interactive Angle Dial Selector Buttons (in 360 mode) */}
      {activeTab === '360' && (
        <div className="bg-[#121212] px-3 py-2 border-t border-[#2A2A2A] overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-between gap-1.5 min-w-max">
            {views360.map((frame, idx) => (
              <button
                key={frame.angleDeg}
                id={`angle-btn-${frame.angleDeg}`}
                onClick={() => {
                  setCurrentFrameIndex(idx);
                  setIsAutoSpinning(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer border ${
                  currentFrameIndex === idx
                    ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37] shadow-sm'
                    : 'bg-[#1A1A1A] text-[#8E867C] border-[#2A2A2A] hover:text-white hover:border-[#444]'
                }`}
              >
                {frame.angleDeg}° {frame.angleDeg === 0 ? '(Front)' : frame.angleDeg === 180 ? '(Back)' : ''}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Thumbnail Selector (in Gallery mode) */}
      {activeTab === 'gallery' && (
        <div className="bg-[#121212] px-3 py-2 border-t border-[#2A2A2A] flex items-center gap-2 overflow-x-auto scrollbar-none">
          {galleryImages.map((img, idx) => (
            <button
              key={img.url}
              id={`gallery-thumb-${idx}`}
              onClick={() => setSelectedGalleryIdx(idx)}
              className={`relative h-14 w-20 shrink-0 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                selectedGalleryIdx === idx
                  ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50'
                  : 'border-[#2A2A2A] opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[8px] font-mono text-center text-white py-0.5 truncate">
                {img.angle}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
