import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  MapPin,
  Building2,
  Calendar,
  User,
  ArrowRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  Info,
  ShieldAlert,
  Navigation,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { DailyArtifact } from '../types';
import { getArtifactProvenance, ArtifactProvenanceInfo } from '../data/artifactProvenanceData';

interface ArtifactProvenanceMapProps {
  artifact: DailyArtifact;
  onClose?: () => void;
  isOverlay?: boolean;
}

export const ArtifactProvenanceMap: React.FC<ArtifactProvenanceMapProps> = ({
  artifact,
  onClose,
  isOverlay = false
}) => {
  const provenance: ArtifactProvenanceInfo | undefined = useMemo(() => {
    return getArtifactProvenance(artifact.id);
  }, [artifact.id]);

  const [activePin, setActivePin] = useState<'both' | 'discovery' | 'custody'>('both');
  const [selectedTimelineStage, setSelectedTimelineStage] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Fallback coordinates if not in custom dataset
  const discoveryCoords = provenance?.discovery.coordinates || { lat: 30.0, lng: 31.0 };
  const custodyCoords = provenance?.currentCustody.coordinates || { lat: 51.5, lng: -0.1 };

  // Convert lat/lng to SVG coordinates on a 1000x500 world/regional projection
  // Lat: -60 to 80 -> Y: 460 to 40
  // Lng: -180 to 180 -> X: 0 to 1000
  const projectCoords = (lat: number, lng: number) => {
    // Equirectangular projection mapped to 1000x500
    const x = ((lng + 180) / 360) * 1000;
    const y = ((85 - lat) / 170) * 500;
    return { x, y };
  };

  const discoveryPoint = projectCoords(discoveryCoords.lat, discoveryCoords.lng);
  const custodyPoint = projectCoords(custodyCoords.lat, custodyCoords.lng);

  // Compute curved geodesic arc
  const midX = (discoveryPoint.x + custodyPoint.x) / 2;
  const midY = Math.min(discoveryPoint.y, custodyPoint.y) - Math.abs(discoveryPoint.x - custodyPoint.x) * 0.18 - 25;
  const arcPath = `M ${discoveryPoint.x} ${discoveryPoint.y} Q ${midX} ${midY} ${custodyPoint.x} ${custodyPoint.y}`;

  // Center of the bounding box between the two coordinates
  const centerPoint = {
    x: (discoveryPoint.x + custodyPoint.x) / 2,
    y: (discoveryPoint.y + custodyPoint.y) / 2
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(0.8, prev + delta), 2.5));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setActivePin('both');
  };

  const focusDiscovery = () => {
    setActivePin('discovery');
    setZoomLevel(1.6);
    setPanOffset({
      x: (500 - discoveryPoint.x) * 0.8,
      y: (250 - discoveryPoint.y) * 0.8
    });
  };

  const focusCustody = () => {
    setActivePin('custody');
    setZoomLevel(1.6);
    setPanOffset({
      x: (500 - custodyPoint.x) * 0.8,
      y: (250 - custodyPoint.y) * 0.8
    });
  };

  const focusBoth = () => {
    setActivePin('both');
    setZoomLevel(1.1);
    setPanOffset({
      x: (500 - centerPoint.x) * 0.6,
      y: (250 - centerPoint.y) * 0.6
    });
  };

  return (
    <div
      id="artifact-provenance-map-container"
      className="bg-[#12100E] border-2 border-[#D4AF37]/40 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden transition-all duration-300"
    >
      {/* Decorative Cartographic Watermark & Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#8B5A2B]/5 to-transparent pointer-events-none rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#1E293B]/20 via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />

      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A241A] pb-4 mb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37] animate-spin-slow" />
              Archaeological Provenance & Transit Map
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline">•</span>
            <span className="text-xs text-stone-300 font-mono hidden sm:inline">
              Discovery Site to Current Museum Custody
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F4E8C1] tracking-wide flex items-center gap-2">
            <span>{artifact.name}</span>
            <span className="text-sm font-sans font-normal text-stone-400 bg-[#1E1B15] px-2 py-0.5 rounded border border-[#332A1E]">
              {artifact.era}
            </span>
          </h3>
        </div>

        {/* Action Controls & Distance Badge */}
        <div className="flex flex-wrap items-center gap-2.5">
          {provenance && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1C1711] border border-[#D4AF37]/30 text-xs text-[#E6C687] font-medium shadow-inner">
              <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                Transit Distance: <strong className="text-white font-mono">{provenance.totalDistanceKm.toLocaleString()} km</strong> ({provenance.totalDistanceMiles.toLocaleString()} miles)
              </span>
            </div>
          )}

          {onClose && (
            <button
              id="close-provenance-map-btn"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#D4AF37] hover:text-black hover:bg-[#D4AF37] border border-[#D4AF37]/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Plaque</span>
            </button>
          )}
        </div>
      </div>

      {/* Map Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 relative z-10 bg-[#1A1612]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#332A1E]">
        <div className="flex items-center gap-1.5 text-xs text-stone-300">
          <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-semibold text-stone-200">View Focus:</span>
          <button
            onClick={focusBoth}
            className={`px-2.5 py-1 rounded text-xs transition-all ${
              activePin === 'both'
                ? 'bg-[#D4AF37] text-black font-bold shadow'
                : 'bg-[#261F16] text-stone-300 hover:text-white hover:bg-[#382E20]'
            }`}
          >
            Full Journey
          </button>
          <button
            onClick={focusDiscovery}
            className={`px-2.5 py-1 rounded text-xs transition-all flex items-center gap-1 ${
              activePin === 'discovery'
                ? 'bg-[#D97706] text-black font-bold shadow'
                : 'bg-[#261F16] text-stone-300 hover:text-white hover:bg-[#382E20]'
            }`}
          >
            <MapPin className="w-3 h-3 text-[#D97706]" /> Discovery Site
          </button>
          <button
            onClick={focusCustody}
            className={`px-2.5 py-1 rounded text-xs transition-all flex items-center gap-1 ${
              activePin === 'custody'
                ? 'bg-[#10B981] text-black font-bold shadow'
                : 'bg-[#261F16] text-stone-300 hover:text-white hover:bg-[#382E20]'
            }`}
          >
            <Building2 className="w-3 h-3 text-[#10B981]" /> Current Museum
          </button>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleZoom(0.25)}
            title="Zoom In"
            className="p-1.5 rounded bg-[#261F16] hover:bg-[#382E20] text-stone-300 hover:text-white border border-[#3E3224] transition-all cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(-0.25)}
            title="Zoom Out"
            className="p-1.5 rounded bg-[#261F16] hover:bg-[#382E20] text-stone-300 hover:text-white border border-[#3E3224] transition-all cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            title="Reset Map View"
            className="p-1.5 rounded bg-[#261F16] hover:bg-[#382E20] text-stone-300 hover:text-white border border-[#3E3224] transition-all cursor-pointer text-xs flex items-center gap-1 px-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* SVG Interactive Cartographic Mini-Map Canvas */}
      <div className="relative w-full h-[320px] sm:h-[400px] bg-[#0C0B0A] rounded-xl border border-[#2D251A] overflow-hidden shadow-inner select-none">
        {/* Cartographic Texture and Grid Overlay */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: '50% 50%'
          }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0B0D12" />
              <stop offset="100%" stopColor="#08090C" />
            </linearGradient>

            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Deep Ocean Background */}
          <rect width="1000" height="500" fill="url(#oceanGrad)" />

          {/* Latitude & Longitude Graticule Lines */}
          <g stroke="#26221B" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6">
            {/* Latitude parallels */}
            <line x1="0" y1="80" x2="1000" y2="80" />
            <line x1="0" y1="160" x2="1000" y2="160" />
            <line x1="0" y1="240" x2="1000" y2="240" />
            <line x1="0" y1="320" x2="1000" y2="320" />
            <line x1="0" y1="400" x2="1000" y2="400" />
            {/* Longitude meridians */}
            <line x1="166" y1="0" x2="166" y2="500" />
            <line x1="333" y1="0" x2="333" y2="500" />
            <line x1="500" y1="0" x2="500" y2="500" />
            <line x1="666" y1="0" x2="666" y2="500" />
            <line x1="833" y1="0" x2="833" y2="500" />
          </g>

          {/* Simplified World Continents Silhouettes */}
          <g fill="#181512" stroke="#332B21" strokeWidth="1" opacity="0.95">
            {/* Europe & British Isles */}
            <path d="M 460 110 L 485 95 L 515 90 L 530 110 L 550 100 L 570 120 L 550 145 L 525 155 L 510 170 L 490 170 L 475 150 L 460 135 Z" />
            <path d="M 480 120 L 495 110 L 495 130 L 485 135 Z" /> {/* British Isles */}
            <path d="M 465 115 L 475 115 L 470 125 Z" /> {/* Ireland */}
            <path d="M 500 80 L 520 70 L 530 90 L 510 95 Z" /> {/* Scandinavia */}

            {/* Mediterranean & Southern Europe */}
            <path d="M 480 160 L 510 155 L 530 165 L 540 185 L 520 185 L 505 175 L 480 175 Z" />
            <path d="M 525 170 L 535 170 L 535 185 L 528 185 Z" /> {/* Italy */}
            <path d="M 545 180 L 555 180 L 552 192 L 542 190 Z" /> {/* Greece & Aegean */}

            {/* North Africa & Nile Valley */}
            <path d="M 460 180 L 530 188 L 575 195 L 590 230 L 570 290 L 530 320 L 480 290 L 440 230 L 440 190 Z" />
            {/* Sub-Saharan Africa */}
            <path d="M 480 290 L 530 320 L 570 290 L 580 340 L 560 410 L 520 440 L 480 380 L 470 330 Z" />

            {/* Near East & Middle East */}
            <path d="M 560 175 L 610 170 L 635 190 L 640 230 L 610 250 L 580 240 L 570 200 Z" />

            {/* Central & South Asia */}
            <path d="M 610 160 L 700 150 L 740 180 L 720 250 L 670 270 L 640 220 L 620 190 Z" />
            <path d="M 670 220 L 720 220 L 700 280 L 680 280 Z" /> {/* Indian Subcontinent */}

            {/* East Asia & China */}
            <path d="M 720 140 L 830 130 L 870 170 L 840 230 L 780 250 L 740 210 L 730 160 Z" />
            <path d="M 850 150 L 870 160 L 860 190 L 845 180 Z" /> {/* Japan */}

            {/* Americas (East Coast & South America for global perspective) */}
            <path d="M 230 90 L 320 80 L 330 150 L 290 200 L 250 180 L 220 130 Z" /> {/* North America */}
            <path d="M 290 210 L 340 230 L 360 290 L 330 380 L 300 420 L 280 350 L 270 260 Z" /> {/* South America */}
          </g>

          {/* Great Circle Transit Trajectory Arc */}
          <path
            d={arcPath}
            fill="none"
            stroke="url(#arcGradient)"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="animate-pulse"
            opacity="0.9"
          />

          {/* Animated Traveling Particle Along the Arc */}
          <circle r="4" fill="#FFFFFF" filter="url(#glowGold)">
            <animateMotion
              path={arcPath}
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Midpoint Distance Badge on Map */}
          {provenance && (
            <g transform={`translate(${midX}, ${midY - 14})`}>
              <rect
                x="-55"
                y="-11"
                width="110"
                height="22"
                rx="6"
                fill="#1C1711"
                stroke="#D4AF37"
                strokeWidth="1"
                opacity="0.95"
              />
              <text
                textAnchor="middle"
                y="4"
                fill="#F4E8C1"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                fontWeight="bold"
              >
                {provenance.totalDistanceKm.toLocaleString()} km journey
              </text>
            </g>
          )}

          {/* Discovery Site Marker Pin */}
          <g
            transform={`translate(${discoveryPoint.x}, ${discoveryPoint.y})`}
            className="cursor-pointer group"
            onClick={focusDiscovery}
          >
            {/* Pulsing ring */}
            <circle r="16" fill="#F59E0B" opacity="0.2">
              <animate attributeName="r" values="8;24;8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.05;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Outer halo */}
            <circle r="8" fill="#F59E0B" opacity="0.4" />
            {/* Core Pin */}
            <circle r="5" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Label Pin Box */}
            <g transform="translate(10, -12)">
              <rect
                x="0"
                y="-10"
                width="150"
                height="24"
                rx="5"
                fill="#1C150C"
                stroke="#D97706"
                strokeWidth="1"
                opacity="0.95"
              />
              <text x="8" y="5" fill="#FDE68A" fontSize="9" fontWeight="bold">
                📍 Discovery: {artifact.dateDiscovered.slice(0, 10)}
              </text>
            </g>
          </g>

          {/* Current Custody Marker Pin */}
          <g
            transform={`translate(${custodyPoint.x}, ${custodyPoint.y})`}
            className="cursor-pointer group"
            onClick={focusCustody}
          >
            {/* Pulsing ring */}
            <circle r="18" fill="#10B981" opacity="0.2">
              <animate attributeName="r" values="8;26;8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.05;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Outer halo */}
            <circle r="9" fill="#10B981" opacity="0.4" />
            {/* Core Pin */}
            <circle r="6" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Label Pin Box */}
            <g transform="translate(12, -14)">
              <rect
                x="0"
                y="-10"
                width="160"
                height="24"
                rx="5"
                fill="#0B1A13"
                stroke="#10B981"
                strokeWidth="1"
                opacity="0.95"
              />
              <text x="8" y="5" fill="#A7F3D0" fontSize="9" fontWeight="bold">
                🏛️ Custody: {artifact.currentLocation.city}
              </text>
            </g>
          </g>
        </svg>

        {/* Legend Overlay at Map Bottom */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#14110D]/90 backdrop-blur-md border border-[#2D251A] text-[11px] text-stone-300 pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] ring-2 ring-[#D97706]/30 inline-block" />
              <span className="text-amber-300">Discovery Excavation Site</span>
            </span>
            <span className="text-stone-600">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[#10B981]/30 inline-block" />
              <span className="text-emerald-300">Current Museum Location</span>
            </span>
          </div>

          <div className="text-stone-400 text-[10px] hidden md:inline">
            Interactive Geodesic Route Projection
          </div>
        </div>
      </div>

      {/* Discovery & Custody Context Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Card 1: Discovery Site & Historical Origin */}
        <div
          onClick={focusDiscovery}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activePin === 'discovery'
              ? 'bg-[#241A0E] border-[#D97706] shadow-lg ring-1 ring-[#D97706]/40'
              : 'bg-[#181410] border-[#2E2417] hover:border-[#D97706]/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#D97706]/20 border border-[#D97706]/40 flex items-center justify-center text-[#D97706]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-amber-500 font-bold block">
                  Point of Excavation
                </span>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {provenance?.discovery.siteName || artifact.origin}
                </h4>
              </div>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#2D2113] text-amber-400 border border-[#3E2E1A]">
              {artifact.dateDiscovered}
            </span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed mb-3">
            {provenance?.discovery.discoveryContext || artifact.historicalContext.slice(0, 160) + '...'}
          </p>

          <div className="flex flex-wrap gap-2 text-[11px] text-stone-400 pt-2 border-t border-[#261E14]">
            {artifact.discoveredBy && (
              <span className="flex items-center gap-1 text-stone-300">
                <User className="w-3 h-3 text-amber-400" />
                <strong className="text-stone-400">Excavator:</strong> {artifact.discoveredBy}
              </span>
            )}
            <span className="flex items-center gap-1 font-mono text-stone-400">
              <Navigation className="w-3 h-3 text-amber-500" />
              {discoveryCoords.lat.toFixed(2)}°N, {discoveryCoords.lng.toFixed(2)}°E
            </span>
          </div>
        </div>

        {/* Card 2: Current Museum Custody */}
        <div
          onClick={focusCustody}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activePin === 'custody'
              ? 'bg-[#0E2018] border-[#10B981] shadow-lg ring-1 ring-[#10B981]/40'
              : 'bg-[#181410] border-[#2E2417] hover:border-[#10B981]/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold block">
                  Current Permanent Home
                </span>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {artifact.currentLocation.museum}
                </h4>
              </div>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#10241A] text-emerald-400 border border-[#173827]">
              {artifact.currentLocation.city}, {artifact.currentLocation.country}
            </span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed mb-3">
            {artifact.currentLocation.visitingGuide}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400 pt-2 border-t border-[#261E14]">
            <span className="font-mono text-emerald-300">
              Gallery: <strong>{artifact.currentLocation.galleryRoom}</strong>
            </span>
            <span className="font-mono text-stone-400">
              Acc: {artifact.currentLocation.accessionNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Chronological Provenance Milestones Timeline */}
      {provenance?.timeline && provenance.timeline.length > 0 && (
        <div className="mt-5 pt-5 border-t border-[#2A241A]">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#D4AF37] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Documented Provenance Journey & Historical Stages
            </h4>
            <span className="text-[11px] text-stone-400">
              {provenance.timeline.length} Documented Transit Milestones
            </span>
          </div>

          <div className="relative pl-4 space-y-3 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#332A1E]">
            {provenance.timeline.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedTimelineStage(selectedTimelineStage === idx ? null : idx)}
                className={`relative pl-4 pr-3 py-2.5 rounded-lg border transition-all cursor-pointer ${
                  selectedTimelineStage === idx
                    ? 'bg-[#221C14] border-[#D4AF37] shadow'
                    : 'bg-[#16120E] border-[#292015] hover:border-[#3E301F]'
                }`}
              >
                {/* Timeline node icon on the line */}
                <div className="absolute -left-[18px] top-3.5 w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-4 ring-[#12100E]" />

                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#F4E8C1] px-1.5 py-0.5 rounded bg-[#2D2315] border border-[#443520]">
                      {step.yearOrDate}
                    </span>
                    <span className="text-xs font-semibold text-amber-300">
                      {step.stage}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">
                    📍 {step.location}
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-normal">
                  {step.summary}
                </p>

                {step.historicalActors && (
                  <div className="mt-1.5 text-[10px] text-stone-400 flex items-center gap-1">
                    <span className="text-stone-500">Actors / Custodians:</span>
                    <span className="text-amber-200/80 font-medium">{step.historicalActors}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custody, Repatriation & Legal Heritage Context Note */}
      {provenance?.custodyNotes && (
        <div className="mt-4 p-3 rounded-xl bg-[#171410] border border-[#2D2419] flex items-start gap-2.5 text-xs text-stone-400">
          <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-200">Curatorial & Custodial Note:</strong>{' '}
            {provenance.custodyNotes}
          </div>
        </div>
      )}
    </div>
  );
};
