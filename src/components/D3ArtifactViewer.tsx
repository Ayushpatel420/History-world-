import { useState, useEffect, useRef } from 'react';
import { 
  Compass, Info, Award, Layers, Sliders, RefreshCw, ZoomIn, Anchor, Zap, Cpu
} from 'lucide-react';
import * as d3 from 'd3';
import { getCraftsmanshipProfile, CraftsmanshipProfile, D3Node, D3Link, MaterialComposition } from '../data/artifactD3Data';
import { playSound } from '../utils/audio';

interface D3ArtifactViewerProps {
  artifactId: string;
  artifactName: string;
  onClose?: () => void;
}

export default function D3ArtifactViewer({ artifactId, artifactName, onClose }: D3ArtifactViewerProps) {
  const profile = getCraftsmanshipProfile(artifactId, artifactName);

  // Projection Angles
  const [angleY, setAngleY] = useState<number>(0.8);  // Yaw rotation
  const [angleX, setAngleX] = useState<number>(-0.3); // Pitch tilt
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [selectedNode, setSelectedNode] = useState<D3Node | null>(profile.nodes[0] || null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialComposition | null>(profile.composition[0] || null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [stressPercent, setStressPercent] = useState<number>(0);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const compositionSvgRef = useRef<SVGSVGElement | null>(null);
  const [width, setWidth] = useState<number>(450);
  const [height, setHeight] = useState<number>(340);

  // Reset selected node and material when artifactId changes
  useEffect(() => {
    setSelectedNode(profile.nodes[0] || null);
    setSelectedMaterial(profile.composition[0] || null);
    setAngleY(0.8);
    setAngleX(-0.3);
    setScaleFactor(1.0);
    setActiveLayer(0);
    setStressPercent(0);
  }, [artifactId]);

  // Handle auto rotation animation
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setAngleY(prev => (prev + 0.006) % (2 * Math.PI));
    }, 16);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Resize listener
  useEffect(() => {
    if (!svgRef.current) return;
    const parent = svgRef.current.parentElement;
    if (!parent) return;

    const handleResize = () => {
      setWidth(parent.clientWidth || 450);
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(parent);

    return () => observer.disconnect();
  }, []);

  // Render D3 Interactive 3D Projection
  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous drawing
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const dFocal = 4.0; // focal depth
    const dScale = 140 * scaleFactor;

    // 3D Rotation Matrix Calculation
    const rotate = (pt: { x3d: number; y3d: number; z3d: number }) => {
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = pt.x3d * cosY - pt.z3d * sinY;
      const z1 = pt.x3d * sinY + pt.z3d * cosY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = pt.y3d * cosX - z1 * sinX;
      const z2 = pt.y3d * sinX + z1 * cosX;

      // Perspective Projection
      const ratio = dFocal / (dFocal + z2);
      const sx = width / 2 + x1 * dScale * ratio;
      const sy = height / 2 - y2 * dScale * ratio; // Negate Y so positive is up
      return { x: sx, y: sy, depth: z2 };
    };

    // Project nodes
    const projectedNodes = profile.nodes.map(node => {
      // Perturb coordinates dynamically with stressPercent to simulate micro-fracture structural stress / heat warping
      const factor = (stressPercent / 100) * 0.45;
      const xOffset = Math.sin(node.z3d * 5) * factor;
      const yOffset = Math.cos(node.x3d * 5) * factor;
      const zOffset = Math.sin(node.y3d * 5) * factor;

      const perturbedNode = {
        ...node,
        x3d: node.x3d + xOffset,
        y3d: node.y3d + yOffset,
        z3d: node.z3d + zOffset
      };

      return {
        ...node,
        proj: rotate(perturbedNode)
      };
    });

    // Create container groups
    const gGrid = svg.append('g').attr('class', 'grid-lines');
    const gLinks = svg.append('g').attr('class', 'structural-links');
    const gLabelTraces = svg.append('g').attr('class', 'label-traces');
    const gNodes = svg.append('g').attr('class', 'hotspot-nodes');

    // 1. Draw polar concentric aesthetic grids inside SVG for tech-gauge appearance
    const center = { x: width / 2, y: height / 2 };
    const rMax = Math.min(width, height) / 2.3;
    
    // Outer concentric indicator ring
    gGrid.append('circle')
      .attr('cx', center.x)
      .attr('cy', center.y)
      .attr('r', rMax)
      .attr('stroke', '#D4AF37')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', '2, 6')
      .attr('fill', 'none')
      .attr('opacity', 0.25);

    gGrid.append('circle')
      .attr('cx', center.x)
      .attr('cy', center.y)
      .attr('r', rMax * 0.7)
      .attr('stroke', '#2A2A2A')
      .attr('stroke-width', 0.5)
      .attr('fill', 'none')
      .attr('opacity', 0.35);

    // Cross-hair axes
    gGrid.append('line')
      .attr('x1', center.x - rMax)
      .attr('y1', center.y)
      .attr('x2', center.x + rMax)
      .attr('y2', center.y)
      .attr('stroke', '#2A2A2A')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0.3);

    gGrid.append('line')
      .attr('x1', center.x)
      .attr('y1', center.y - rMax)
      .attr('x2', center.x)
      .attr('y2', center.y + rMax)
      .attr('stroke', '#2A2A2A')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0.3);

    // Dynamic compass indicator ticks
    const compassAngles = d3.range(0, 360, 45);
    gGrid.selectAll('.tick-label')
      .data(compassAngles)
      .enter()
      .append('text')
      .attr('class', 'tick-label')
      .attr('x', d => center.x + (rMax + 14) * Math.cos(d * Math.PI / 180))
      .attr('y', d => center.y + (rMax + 14) * Math.sin(d * Math.PI / 180) + 3)
      .attr('text-anchor', 'middle')
      .attr('fill', '#A09890')
      .attr('font-size', '8px')
      .attr('font-family', 'monospace')
      .attr('opacity', 0.35)
      .text(d => `${d}°`);

    // 2. Draw Connections (3D Links)
    const linksWithCoords = profile.links.map(l => {
      const sourceNode = projectedNodes.find(n => n.id === l.source);
      const targetNode = projectedNodes.find(n => n.id === l.target);
      return { sourceNode, targetNode };
    }).filter(l => l.sourceNode && l.targetNode);

    gLinks.selectAll('line.link-line')
      .data(linksWithCoords)
      .enter()
      .append('line')
      .attr('class', 'link-line')
      .attr('x1', d => d.sourceNode!.proj.x)
      .attr('y1', d => d.sourceNode!.proj.y)
      .attr('x2', d => d.targetNode!.proj.x)
      .attr('y2', d => d.targetNode!.proj.y)
      .attr('stroke', d => {
        // Render glowing cyan for hologram mode vs amber for golden relics
        const avgZ = (d.sourceNode!.proj.depth + d.targetNode!.proj.depth) / 2;
        return d3.interpolateRgb('#22D3EE', '#D4AF37')((avgZ + 1.5) / 3);
      })
      .attr('stroke-width', d => {
        // Thicker lines if closer to screen depth projection
        const avgZ = (d.sourceNode!.proj.depth + d.targetNode!.proj.depth) / 2;
        return Math.max(0.6, 2.2 - (avgZ + 1.0) * 0.8);
      })
      .attr('opacity', d => {
        const avgZ = (d.sourceNode!.proj.depth + d.targetNode!.proj.depth) / 2;
        return Math.max(0.2, 0.85 - (avgZ + 1.0) * 0.3);
      });

    // 3. Draw Nodes (glowing points with pulse effects for high-importance items)
    const nodeSelection = gNodes.selectAll('g.node-group')
      .data(projectedNodes)
      .enter()
      .append('g')
      .attr('class', 'node-group')
      .attr('transform', d => `translate(${d.proj.x}, ${d.proj.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedNode(d);
      });

    // Ring pulser indicator for active / hovered node
    nodeSelection.append('circle')
      .attr('class', 'ripple')
      .attr('r', d => d.importance === 'high' ? 12 : 7)
      .attr('fill', 'none')
      .attr('stroke', d => d.id === selectedNode?.id ? '#EFC745' : '#22D3EE')
      .attr('stroke-width', 1)
      .attr('opacity', d => d.id === selectedNode?.id ? 0.75 : 0.2)
      .style('transform-origin', 'center')
      .style('animation', 'pulse 1.8s infinite ease-in-out');

    // Central solid core of node
    nodeSelection.append('circle')
      .attr('r', d => d.id === selectedNode?.id ? 5.5 : 3.5)
      .attr('fill', d => {
        if (d.id === selectedNode?.id) return '#EFC745';
        if (d.importance === 'high') return '#22D3EE';
        return '#8CA59C';
      })
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', d => d.id === selectedNode?.id ? 1.5 : 0.5)
      .attr('filter', d => d.importance === 'high' ? 'drop-shadow(0px 0px 4px #22D3EE)' : 'none');

    // Display little abbreviated text tags for key nodes directly in viewport
    nodeSelection.append('text')
      .attr('y', -9)
      .attr('text-anchor', 'middle')
      .attr('fill', d => d.id === selectedNode?.id ? '#EFC745' : '#8CA59C')
      .attr('font-size', '8px')
      .attr('font-family', 'monospace')
      .attr('font-weight', d => d.id === selectedNode?.id ? 'bold' : 'normal')
      .text(d => d.label);

    // Direct trace line connecting active node to detailed diagnostic legend
    if (selectedNode) {
      const activeProjected = projectedNodes.find(n => n.id === selectedNode.id);
      if (activeProjected) {
        gLabelTraces.append('line')
          .attr('x1', activeProjected.proj.x)
          .attr('y1', activeProjected.proj.y)
          .attr('x2', activeProjected.proj.x + (activeProjected.proj.x > width / 2 ? 30 : -30))
          .attr('y2', activeProjected.proj.y - 15)
          .attr('stroke', '#EFC745')
          .attr('stroke-width', 0.75)
          .attr('stroke-dasharray', '2, 2');
      }
    }

  }, [angleY, angleX, scaleFactor, profile, width, height, selectedNode, stressPercent]);

  // Render D3 Material Composition Chart (Dynamic Donut / Radial Arc Layout)
  useEffect(() => {
    if (!compositionSvgRef.current) return;

    const svgComp = d3.select(compositionSvgRef.current);
    svgComp.selectAll('*').remove();

    const cWidth = 240;
    const cHeight = 84;
    const padding = 10;

    // Use horizontal comparative rect stacked bar with clean transitions
    const scaleX = d3.scaleLinear()
      .domain([0, 100])
      .range([padding, cWidth - padding]);

    let sumX = padding;
    
    // Draw nice stacked blocks representing compounds
    const compoundsGroup = svgComp.append('g').attr('class', 'compounds');

    profile.composition.forEach((item, index) => {
      const blockWidth = (item.percentage / 100) * (cWidth - 2 * padding);
      const isSelected = selectedMaterial?.material === item.material;

      compoundsGroup.append('rect')
        .attr('x', sumX)
        .attr('y', 15)
        .attr('width', blockWidth)
        .attr('height', 18)
        .attr('fill', item.color)
        .attr('stroke', isSelected ? '#FFFFFF' : '#1A1A1F')
        .attr('stroke-width', isSelected ? 1.5 : 0.5)
        .attr('rx', 2)
        .style('cursor', 'pointer')
        .on('click', () => {
          setSelectedMaterial(item);
        });

      // Percentage Labels above rect keys
      if (item.percentage > 12) {
        compoundsGroup.append('text')
          .attr('x', sumX + blockWidth / 2)
          .attr('y', 27)
          .attr('text-anchor', 'middle')
          .attr('fill', d3.hsl(item.color).l < 0.65 ? '#FFFFFF' : '#000000')
          .attr('font-size', '9px')
          .attr('font-family', 'monospace')
          .attr('font-weight', 'bold')
          .text(`${item.percentage}%`);
      }

      sumX += blockWidth;
    });

  }, [profile, selectedMaterial]);

  // Custom mouse manual drag rotation controls
  const handleDragUpdate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return; // Only process when holding primary mouse button click
    setAutoRotate(false);
    setAngleY(prev => prev + e.movementX * 0.007);
    setAngleX(prev => Math.max(-1.4, Math.min(1.4, prev - e.movementY * 0.007)));
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 z-50 animate-fade-in text-left">
      <div className="bg-[#09090C] border border-[#234D43]/50 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative text-left">
        
        {/* Dynamic scan line laser overlay */}
        <div className="absolute inset-x-0 h-[1.5px] bg-[#22D3EE]/15 animate-ping pointer-events-none z-10" />

        {/* Modal Top Header Bar */}
        <div className="p-5 border-b border-[#1E1E24] flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/45 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-[#E5C158] animate-spin-slow" />
            </div>
            <div className="text-left">
              <span className="text-[9px] font-mono uppercase bg-[#1A2624] text-[#E0D8D0] px-2.5 py-0.5 rounded font-bold border border-[#234D43]/40 tracking-wider">
                D3 CAD Structural diagnostics room
              </span>
              <h2 className="text-xl font-serif italic text-white leading-normal mt-0.5 text-left">{artifactName}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono font-bold text-white/50 hover:text-white border border-[#2B2B35] bg-[#121216] px-3.5 py-2 rounded-xl transition-all cursor-pointer hover:border-red-500/50 hover:bg-red-500/10"
          >
            ✕ Exit Scanner
          </button>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 p-3 sm:p-6 gap-6 overflow-hidden text-left">
          
          {/* Column A: Interactive SVG Canvas viewport (Left/Center) */}
          <div className="lg:col-span-7 flex flex-col bg-black/90 border border-[#252530] rounded-xl overflow-hidden relative min-h-[350px] select-none text-left">
            
            {/* Viewport grid header */}
            <div className="flex items-center justify-between p-3.5 bg-[#0F0F14] border-b border-[#22222D]">
              <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                <Zap className="w-4 h-4 text-[#22D3EE] animate-pulse" />
                <span>3D Wireframe Hotspot Projection</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
                <span className="text-[10px] text-[#A09890] font-mono">D3 Active Nodes Renderer</span>
              </div>
            </div>

            {/* Drag sandbox helper container */}
            <div 
              onMouseMove={handleDragUpdate}
              className="flex-1 w-full flex items-center justify-center min-h-[290px] relative cursor-crosshair group active-card bg-[#050508]"
              title="Click & Drag to rotate physical wireframe"
            >
              {/* Virtual coordinates label */}
              <div className="absolute top-3 left-3 pointer-events-none text-[8px] font-mono text-white/40 leading-normal">
                <p>MODEL_SCALE: {scaleFactor.toFixed(2)}x</p>
                <p>YAW (Y-axis): {(angleY * 57.3).toFixed(1)}°</p>
                <p>PITCH (X-axis): {(angleX * 57.3).toFixed(1)}°</p>
              </div>

              {/* Floating diagnostic prompt */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/30 tracking-widest uppercase pointer-events-none animate-pulse bg-black/50 px-3 py-1 rounded">
                🖱 Drag inside screen to pivot axial grid
              </div>

              {/* SVG Canvas */}
              <svg 
                ref={svgRef} 
                className="w-full h-full max-h-[350px]"
                viewBox={`0 0 ${width} ${height}`}
              />
                        {/* Bottom Scale Slider & Rotation Controls */}
            <div className="p-4 bg-[#0F0F14] border-t border-[#22222D] space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Scale slider */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#A09890] shrink-0 uppercase tracking-wider">Spatial Scale</span>
                  <input
                    type="range"
                    min="0.5"
                    max="1.6"
                    step="0.05"
                    value={scaleFactor}
                    onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
                    className="flex-1 h-1 accent-[#E5C158] bg-[#222228] rounded cursor-pointer"
                  />
                  <span className="text-[10px] text-[#E5C158] font-mono font-bold shrink-0">{(scaleFactor*100).toFixed(0)}%</span>
                </div>

                {/* Physical Stress Warp Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#A09890] shrink-0 uppercase tracking-wider flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-[#22D3EE]" /> Heat / Stress Warp
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={stressPercent}
                    onChange={(e) => {
                      setStressPercent(parseInt(e.target.value));
                      if (parseInt(e.target.value) > 0) setAutoRotate(false);
                    }}
                    className="flex-1 h-1 accent-[#22D3EE] bg-[#222228] rounded cursor-pointer animate-pulse"
                  />
                  <span className="text-[10px] text-[#22D3EE] font-mono font-bold shrink-0">{stressPercent}%</span>
                </div>
              </div>

              {/* Viewpoint Camera Presets row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#1F1F28]/60">
                <div className="flex flex-wrap gap-1.5 items-center w-full sm:w-auto">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider mr-1">Angle Presets:</span>
                  {[
                    { label: 'Isometric', x: -0.61, y: 0.78 },
                    { label: 'Front Plane', x: 0, y: 0 },
                    { label: 'Top Plane', x: -Math.PI / 2, y: 0 },
                    { label: 'Side Plane', x: 0, y: Math.PI / 2 },
                  ].map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => {
                        playSound('click');
                        setAutoRotate(false);
                        setAngleX(preset.x);
                        setAngleY(preset.y);
                      }}
                      className="px-2 py-1 bg-[#09090C] hover:bg-[#D4AF37] hover:text-black border border-[#23232D] rounded text-[9px] font-mono text-white/70 transition-all cursor-pointer font-bold"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Automation triggers */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => { playSound('click'); setAutoRotate(!autoRotate); }}
                    className={`px-3 py-1.5 border rounded-lg text-[10px] font-mono cursor-pointer transition-all ${
                      autoRotate 
                        ? 'bg-[#1C160F] text-[#D4AF37] border-[#D4AF37]' 
                        : 'bg-transparent text-white/50 border-[#2A2A35] hover:text-white'
                    }`}
                  >
                    <span>{autoRotate ? "Auto-Spin ON" : "Auto-Spin OFF"}</span>
                  </button>

                  <button
                    onClick={() => {
                      playSound('click');
                      setAngleX(-0.3);
                      setAngleY(0.8);
                      setScaleFactor(1.0);
                      setStressPercent(0);
                      setAutoRotate(true);
                    }}
                    className="px-3 py-1.5 border border-[#2A2A35] hover:border-[#D4AF37] text-white/50 hover:text-white rounded-lg text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer font-semibold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Calibration</span>
                  </button>
                </div>
              </div>
            </div>  </div>

          </div>

          {/* Column B: Real-Time Diagnostics & Material Spectrograph (Right Side) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5 text-left">
            
            {/* 1. Craftsmanship Metadata Header */}
            <div className="p-4 bg-[#0F0F14] border border-[#22222D] rounded-xl text-left space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-[#E5C158] border border-amber-500/25 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Rating: {profile.overallScore}/100</span>
                </span>
                <span className="text-[10px] font-mono text-white/50">{profile.precisionRating}</span>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs text-[#E5C158] font-mono uppercase font-bold tracking-widest">Construct Analysis</h4>
                <p className="text-xs text-[#A09890] leading-relaxed font-sans">
                  {profile.craftsmanshipNotes}
                </p>
              </div>
            </div>

            {/* 2. D3 Stacked Material Spectrograph Chart */}
            <div className="p-4 bg-[#0F0F14] border border-[#22222D] rounded-xl text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#E5C158] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>D3 Compound Spectrograph</span>
                </span>
                <span className="text-[9px] text-white/40 font-mono">Click layers below</span>
              </div>

              {/* Stacked Chart Area */}
              <div className="bg-black/40 rounded-lg p-2 flex flex-col items-center">
                <svg 
                  ref={compositionSvgRef} 
                  className="w-full" 
                  style={{ height: '48px' }}
                />
              </div>

              {/* Selection detail feedback block */}
              {selectedMaterial ? (
                <div className="p-3 bg-[#000000]/60 rounded-lg border border-[#2A2A32] flex items-start gap-2.5 text-xs">
                  <div 
                    className="w-3.5 h-3.5 rounded shrink-0 mt-0.5" 
                    style={{ backgroundColor: selectedMaterial.color }}
                  />
                  <div className="space-y-0.5 text-left">
                    <span className="font-mono text-white/90 font-bold block">{selectedMaterial.material}</span>
                    <span className="text-[11px] text-[#A09890] font-sans leading-normal">
                      Constitutes <span className="text-[#E5C158] font-bold font-mono">{selectedMaterial.percentage}%</span> of total mineral bulk density. This raw component indicates specific trade roots connecting regional quarries.
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-white/40 italic font-sans text-center">Touch any color segment above to inspect micro-compound attributes.</p>
              )}
            </div>

            {/* 3. Interactive Node Diagnostic details */}
            <div className="p-4 bg-[#0F0F14] border border-[#22222D] rounded-xl text-left space-y-3.5 min-h-[140px] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">
                  🧬 Active Hotspot Diagnostic: L. {selectedNode ? selectedNode.label : "None"}
                </span>
                
                {selectedNode ? (
                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#1F292B] border border-[#26D3EE]/25 rounded text-[9px] font-mono text-[#22D3EE] uppercase font-bold">
                        {selectedNode.category}
                      </span>
                      <span className="text-[10px] text-[#E5C158] font-mono">
                        importance rank: {selectedNode.importance}
                      </span>
                    </div>
                    <p className="text-xs text-[#A09890] leading-relaxed font-sans">
                      {selectedNode.detail}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-[#A09890] italic">Click on any glowing coordinate node in the 3D grid viewport tool above to run localized archeological material inspection.</p>
                )}
              </div>

              {selectedNode && (
                <div className="pt-2 border-t border-[#1F1F24] text-[8px] font-mono text-white/40">
                  HOTSPOT GRID COORDS: [x: {selectedNode.x3d.toFixed(1)}, y: {selectedNode.y3d.toFixed(1)}, z: {selectedNode.z3d.toFixed(1)}]
                </div>
              )}
            </div>

            {/* 4. Structural Layering Breakdown */}
            <div className="space-y-2 text-left">
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Layers className="w-4 h-4 text-[#E5C158]" />
                <span>Structural Overlay Core Sections</span>
              </span>

              <div className="grid grid-cols-2 xs:grid-cols-4 gap-1.5">
                {profile.structuralLayers.map((layer, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveLayer(idx)}
                    className={`py-2 px-2.5 rounded-lg border text-left flex flex-col justify-between gap-1 transition-all cursor-pointer ${
                      activeLayer === idx 
                        ? 'bg-[#1C1610] text-[#D4AF37] border-[#D4AF37]' 
                        : 'bg-[#0E0E12] text-white/50 border-[#2A2A32] hover:text-white hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider block line-clamp-1">{layer.name.split(' ')[0]}</span>
                    <span className="text-[8px] font-mono text-white/30 truncate">{layer.depth}</span>
                  </button>
                ))}
              </div>

              {/* Layer Detail Context block */}
              <div className="p-3 bg-[#0A0A0E] rounded-lg border border-[#1C1C24] text-left">
                <span className="text-[9px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest block mb-0.5">
                  🛡️ Active Layer Function: {profile.structuralLayers[activeLayer]?.name}
                </span>
                <p className="text-[11px] text-[#A09890] leading-relaxed font-sans">
                  {profile.structuralLayers[activeLayer]?.function}. (Depth tolerance: {profile.structuralLayers[activeLayer]?.depth}).
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
