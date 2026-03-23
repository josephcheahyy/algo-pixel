import { motion, useScroll, useTransform } from 'motion/react';
import React, { useState, useEffect } from 'react';
import {
  Building2, Cpu, LineChart, Droplets, Code2,
  Layers, ArrowRight, Mail, Linkedin, Github,
  Terminal, Database, Grid3X3, Braces, Shield, ShieldCheck, X
} from 'lucide-react';

// A "Pixelated" or Glitch decipher text effect for algorithmic feel
const AlgoText = ({ text, className = '', delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '01100101101£¥§∆∑∞µ!#<>/?';

  useEffect(() => {
    let iterations = 0;
    let timeout: NodeJS.Timeout;

    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text.split('').map((char, index) => {
            if (index < iterations) return char;
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );

        if (iterations >= text.length) clearInterval(interval);
        iterations += 1 / 2; // Speed of decipher
      }, 30);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span className={`inline-block ${className}`}>{displayText || ' '}</span>;
};

// Interactive Finite Element / Structural Network Background
const InteractiveStructuralBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('structural-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const nodes: { x: number, y: number, vx: number, vy: number }[] = [];
    const numNodes = Math.floor((width * height) / 12000); // Density of structural nodes

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      // Make lines thicker for better visibility
      ctx.lineWidth = 1.5;

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Connect member to mouse cursor
        const dxMouse = nodeA.x - mouse.x;
        const dyMouse = nodeA.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        // Increased interaction radius and much higher opacity
        if (distMouse < 300) {
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(mouse.x, mouse.y);
          // Very visible light cyan / white-ish cyan for mouse connections
          ctx.strokeStyle = `rgba(100, 255, 255, ${(1 - distMouse / 300) * 1.2})`;
          ctx.stroke();
        }

        // Connect members to each other (Space Frame simulation)
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            // Increased opacity from 0.25 to 0.6
            ctx.strokeStyle = `rgba(0, 255, 204, ${(1 - dist / 150) * 0.6})`;
            ctx.stroke();
          }
        }

        // Draw structural joint (node) - larger and brighter
        ctx.beginPath();
        ctx.rect(nodeA.x - 2, nodeA.y - 2, 4, 4);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.fill();
      }

      // Draw an algorithmic crosshair at the mouse position
      if (mouse.x > -1000) {
        ctx.beginPath();
        // Crosshair Lines
        ctx.moveTo(mouse.x - 10, mouse.y);
        ctx.lineTo(mouse.x + 10, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 10);
        ctx.lineTo(mouse.x, mouse.y + 10);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Center pixel
        ctx.beginPath();
        ctx.rect(mouse.x - 2, mouse.y - 2, 4, 4);
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fill();

        // Outer targeting box
        ctx.beginPath();
        ctx.rect(mouse.x - 15, mouse.y - 15, 30, 30);
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#020617] z-[-1]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,204,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      <canvas id="structural-canvas" className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />
    </div>
  );
};

// Component for rendering individual 3D Structural Elements
type StructElement = {
  id: number;
  type: string;
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
};

const StructBlock = ({ el }: { el: StructElement; key?: React.Key }) => {
  const { w, h, d, x, y, z, type } = el;
  const analysisValue = React.useMemo(() => (Math.random() * 500).toFixed(1), []);
  const analysisType = React.useMemo(() => Math.random() > 0.5 ? 'Shear: ' : 'Moment: ', []);

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        className="absolute left-1/2 top-1/2"
        style={{
          width: w, height: h,
          marginLeft: -w / 2, marginTop: -h / 2,
          transform: `translate3d(${x}px, ${y}px, ${z}px)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-cyan-700/40 border-2 border-cyan-400 flex items-center justify-center overflow-hidden mix-blend-screen" style={{ transform: `translateZ(${d / 2}px)` }}>
          <span className="text-[8px] font-black tracking-widest font-mono text-white/70 uppercase">{type}</span>
        </div>
        {/* Back */}
        <div className="absolute inset-0 bg-cyan-900/40 border border-cyan-500" style={{ transform: `translateZ(${-d / 2}px) rotateY(180deg)` }}></div>
        {/* Left */}
        <div className="absolute left-1/2 top-1/2 bg-cyan-800/40 border border-cyan-400" style={{ width: d, height: h, marginLeft: -d / 2, marginTop: -h / 2, transform: `rotateY(-90deg) translateZ(${w / 2}px)` }}></div>
        {/* Right */}
        <div className="absolute left-1/2 top-1/2 bg-cyan-800/40 border border-cyan-400" style={{ width: d, height: h, marginLeft: -d / 2, marginTop: -h / 2, transform: `rotateY(90deg) translateZ(${w / 2}px)` }}></div>
        {/* Top */}
        <div className="absolute left-1/2 top-1/2 bg-cyan-500/50 border-2 border-cyan-300" style={{ width: w, height: d, marginLeft: -w / 2, marginTop: -d / 2, transform: `rotateX(90deg) translateZ(${h / 2}px)` }}></div>
        {/* Bottom */}
        <div className="absolute left-1/2 top-1/2 bg-[#020617]/80 border border-cyan-700" style={{ width: w, height: d, marginLeft: -w / 2, marginTop: -d / 2, transform: `rotateX(-90deg) translateZ(${h / 2}px)` }}></div>
      </motion.div>

      {/* Analysis UI tag with a leg (Rendered outside preserving 3D rotation so it faces camera) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute left-1/2 top-1/2 z-50 pointer-events-none"
        style={{
          transform: `translate3d(calc(${x}px + ${w / 2 + 30}px), calc(${y}px - ${h / 2 + 50}px), 0)`,
        }}
      >
        <div className="relative w-[100px] bg-[#020617]/90 backdrop-blur-sm border border-cyan-400 p-1.5 shadow-lg">
          <div className="absolute bottom-[-20px] left-[-20px] w-[35px] h-[1px] bg-cyan-400 rotate-45 transform origin-top-left pointer-events-none"></div>
          <div className="text-[10px] font-mono text-cyan-300 whitespace-nowrap font-bold">
            {analysisType} {analysisValue}kN{analysisType === 'Moment: ' ? 'm' : ''}
          </div>
          <div className="w-full h-1 mt-1 bg-cyan-900/50">
            <div className="h-full bg-cyan-400" style={{ width: `${Math.random() * 100}%` }}></div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// Interactive 3D Voxel Builder Component
const InteractiveModelBuilder = () => {
  const [elements, setElements] = useState<StructElement[]>([]);
  const [message, setMessage] = useState("DRAG TO DRAW SLAB/FOOTING. CLICK POINTS FOR BEAM/COLUMN.");
  const [isFading, setIsFading] = useState(false);

  const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number, y: number } | null>(null);

  // Track clicking points instead of dragging for beams/columns
  const [firstPoint, setFirstPoint] = useState<{ x: number, y: number } | null>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const [rotX, setRotX] = useState(60);
  const [rotY, setRotY] = useState(45);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setRotX(prev => prev + 0.3);
      setRotY(prev => prev + 0.6);
      animationId = requestAnimationFrame(animate);
    };
    if (!dragStart) {
      animate();
    }
    return () => cancelAnimationFrame(animationId);
  }, [dragStart]);

  // 8 Second Timer Logic
  useEffect(() => {
    if (elements.length === 0) return;

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      setMessage("ANALYSIS & MODELLING COSTS EFFORTS AND TIME...");

      setTimeout(() => {
        setMessage("BUT LET ALGO PIXEL DO IT FOR YOU.");
        setTimeout(() => {
          setElements([]);
          setIsFading(false);
          setMessage("DRAG TO DRAW AN OBJECT HERE");
        }, 3000);
      }, 2000);
    }, 8000); // 8 seconds after first cube is placed

    return () => clearTimeout(fadeTimer);
  }, [elements.length]); // SEC-FIX: was `elements.length === 0` (boolean, non-reactive). Now tracks length properly.

  const getCoords = (clientX: number, clientY: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isFading) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
    const coords = getCoords(e.clientX, e.clientY);

    // Set both drag and click points to see what user intends to do
    setDragStart(coords);
    setDragCurrent(coords);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart || isFading) return;
    setDragCurrent(getCoords(e.clientX, e.clientY));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (!dragStart || !dragCurrent || isFading) {
      setDragStart(null);
      setDragCurrent(null);
      return;
    }

    const coords = getCoords(e.clientX, e.clientY);
    const dx = coords.x - dragStart.x;
    const dy = coords.y - dragStart.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Detect if this was a click (very small movement)
    const isClick = absDx < 5 && absDy < 5;

    // Logic mapping physical pixels purely to the container regardless of projection rotation
    if (isClick) {
      // Logic for 2-point clicking (Beams & Columns)
      if (!firstPoint) {
        setFirstPoint(coords);
      } else {
        // We have a second point, draw the beam/col between them
        const cdx = coords.x - firstPoint.x;
        const cdy = coords.y - firstPoint.y;
        const screenCx = firstPoint.x + cdx / 2;
        const screenCy = firstPoint.y + cdy / 2;
        const tempZ = 0;

        let type: 'beam' | 'column' = Math.abs(cdx) > Math.abs(cdy) ? 'beam' : 'column';
        let w = type === 'beam' ? Math.max(Math.abs(cdx), 20) : 16;
        let h = type === 'column' ? Math.max(Math.abs(cdy), 20) : 16;

        setElements(prev => [...prev, {
          id: Date.now() + Math.random(),
          type, x: screenCx, y: screenCy, z: tempZ, w, h, d: 16
        }]);

        if (message.includes("DRAG")) {
          setMessage("INJECTING STRUCTURAL ELEMENTS...");
        }

        setFirstPoint(null); // reset for next line
      }
    } else {
      // It was a drag: Logic for Area drawing (Slabs / Footings)
      const screenCx = dragStart.x + dx / 2;
      const screenCy = dragStart.y + dy / 2;
      const tempZ = 0;

      const type = absDx > 20 && absDy > 20 ? 'slab' : 'node';
      const w = type === 'slab' ? absDx : 20;
      const h = type === 'slab' ? absDy : 20;
      const d = type === 'slab' ? 10 : 20;

      if (type === 'slab') {
        if (message.includes("DRAG")) {
          setMessage("INJECTING STRUCTURAL ELEMENTS...");
        }

        setElements(prev => [...prev, {
          id: Date.now() + Math.random(),
          type, x: screenCx, y: screenCy, z: tempZ, w, h, d
        }]);
        setFirstPoint(null); // Clear any partial click states
      }
    }

    setDragStart(null);
    setDragCurrent(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start pointer-events-auto">
      {/* 3D Container */}
      <div
        ref={containerRef}
        className="w-[200px] h-[120px] md:w-[450px] md:h-[450px] relative cursor-crosshair border border-cyan-500/20 bg-cyan-900/5 group select-none overflow-visible"
        style={{ perspective: '1000px', touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Point Preview Overlay */}
        {firstPoint && (
          <div className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00ffcc] pointer-events-none z-50 mix-blend-screen"
            style={{ left: `calc(50% + ${firstPoint.x - 4}px)`, top: `calc(50% + ${firstPoint.y - 4}px)` }}></div>
        )}

        {firstPoint && dragCurrent && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-40 opacity-50 mix-blend-screen">
            <line
              x1={`calc(50% + ${firstPoint.x}px)`} y1={`calc(50% + ${firstPoint.y}px)`}
              x2={`calc(50% + ${dragCurrent.x}px)`} y2={`calc(50% + ${dragCurrent.y}px)`}
              stroke="#00ffcc" strokeWidth="2" strokeDasharray="4 4"
            />
          </svg>
        )}

        {/* Draw Preview overlay (Only render if dragging a volume, not just clicking) */}
        {dragStart && dragCurrent && Math.abs(dragCurrent.x - dragStart.x) > 5 && Math.abs(dragCurrent.y - dragStart.y) > 5 && (
          <div
            className="absolute border-2 border-cyan-400 border-dashed bg-cyan-400/20 z-50 mix-blend-screen pointer-events-none"
            style={{
              left: `calc(50% + ${Math.min(dragStart.x, dragCurrent.x)}px)`,
              top: `calc(50% + ${Math.min(dragStart.y, dragCurrent.y)}px)`,
              width: `${Math.max(Math.abs(dragCurrent.x - dragStart.x), 4)}px`,
              height: `${Math.max(Math.abs(dragCurrent.y - dragStart.y), 4)}px`,
            }}
          />
        )}

        <div className="absolute top-2 left-2 font-mono text-[10px] text-cyan-400/50 pointer-events-none">
          X: {(rotX % 360).toFixed(1)}° <br />
          Y: {(rotY % 360).toFixed(1)}°
        </div>

        {/* Helper Grid lines to show building area */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,204,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-50"></div>

        <motion.div
          animate={{ rotateX: rotX, rotateY: rotY }}
          className={`w-full h-full absolute transition-all duration-1000 origin-center ${isFading ? 'opacity-0 scale-125 blur-xl' : 'opacity-100 scale-100'}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Base Structural Frame that always exists */}
          <div className="absolute inset-0 border border-cyan-500/30" style={{ transform: 'translateZ(100px)' }}></div>
          <div className="absolute inset-0 border border-cyan-500/30" style={{ transform: 'translateZ(-100px)' }}></div>
          <div className="absolute top-0 left-0 w-full h-full border border-cyan-500/30" style={{ transform: 'rotateX(90deg) translateZ(100px)' }}></div>
          <div className="absolute top-0 left-0 w-full h-full border border-cyan-500/30" style={{ transform: 'rotateY(90deg) translateZ(100px)' }}></div>

          {/* User-added elements (rendered inside rotating space) */}
          {elements.map((el) => (
            <motion.div
              key={el.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              className="absolute left-1/2 top-1/2"
              style={{
                width: el.w, height: el.h,
                marginLeft: -el.w / 2, marginTop: -el.h / 2,
                transform: `translate3d(${el.x}px, ${el.y}px, ${el.z}px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute inset-0 bg-cyan-700/40 border-2 border-cyan-400 flex items-center justify-center mix-blend-screen" style={{
                transform: `translate3d(${el.x}px, ${el.y}px, ${el.z}px)`,
                width: el.w,
                height: el.h,
              }}
              >
                {/* 3D Cube Faces */}
                <div className="absolute inset-0 bg-cyan-500/20 border border-cyan-400" style={{ transform: `translateZ(${el.d / 2}px)` }} />
                <div className="absolute inset-0 bg-cyan-700/80 border border-cyan-500" style={{ transform: `translateZ(${-el.d / 2}px)` }} />
                <div className="absolute top-0 left-0 bg-cyan-600/50 border border-cyan-400" style={{ width: el.w, height: el.d, transform: `translateY(${-el.d / 2}px) rotateX(90deg)` }} />
                <div className="absolute bottom-0 left-0 bg-cyan-600/50 border border-cyan-400" style={{ width: el.w, height: el.d, transform: `translateY(${el.h - el.d / 2}px) rotateX(-90deg)` }} />
                <div className="absolute top-0 left-0 bg-cyan-800/50 border border-cyan-400" style={{ width: el.d, height: el.h, transform: `translateX(${-el.d / 2}px) rotateY(-90deg)` }} />
                <div className="absolute top-0 right-0 bg-cyan-800/50 border border-cyan-400" style={{ width: el.d, height: el.h, transform: `translateX(${el.d / 2}px) rotateY(90deg)` }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 2D Analysis Overlays decoupled from rotation so text isnt cropped heavily either */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          {elements.map((el) => {
            // SEC-FIX: was Math.random() inline in JSX — fired every animation frame (60fps).
            // useMemo is inside map so we use a stable closure over el.id instead.
            // These are visual-only decorative values, so seeding from el.id is fine.
            const seed = el.id % 1000;
            const analysisValue = ((seed * 487) % 500).toFixed(1);
            const analysisType = seed % 2 === 0 ? 'Shear: ' : 'Moment: ';

            // Calculate absolute screen position tracking the object across its rotY
            const angY = rotY * (Math.PI / 180);
            const offsetX = (el.x * Math.cos(-angY) + el.z * Math.sin(-angY)) + el.w / 2 + 20;
            const offsetY = el.y - el.h / 2 - 20;

            return (
              <motion.div
                key={`ui-${el.id}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute z-[100]"
                style={{ left: `calc(50% + ${offsetX}px)`, top: `calc(50% + ${offsetY}px)` }}
              >
                <div className="relative w-[100px] bg-[#020617]/90 backdrop-blur-sm border border-cyan-400 p-1 shadow-lg">
                  <div className="absolute bottom-[-15px] left-[-15px] w-[20px] h-[1px] bg-cyan-400 -rotate-45 transform origin-top-left pointer-events-none"></div>
                  <div className="text-[8px] font-mono text-cyan-300 whitespace-nowrap font-bold">
                    {analysisType} {analysisValue}kN{analysisType === 'Moment: ' ? 'm' : ''}
                  </div>
                  <div className="w-full h-1 mt-1 bg-cyan-900/50">
                    <div className="h-full bg-cyan-400" style={{ width: `${((seed * 761) % 100).toFixed(1)}%` }}></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Message Display */}
      <motion.div
        key={message}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-12 font-mono text-sm tracking-widest text-center px-4 ${isFading ? 'text-cyan-300 font-bold' : 'text-cyan-600'}`}
      >
        {message}
      </motion.div>
    </div>
  );
};

const AntiPhishPuzzleModal = ({
  isOpen,
  onClose,
  onSuccess,
  targetUrl
}: {
  isOpen: boolean,
  onClose: () => void,
  onSuccess: (url: string) => void,
  targetUrl: string
}) => {
  const [clickedNodes, setClickedNodes] = useState<number[]>([]);
  const [requiredNodes, setRequiredNodes] = useState<number[]>([0, 4, 8]); // Default

  useEffect(() => {
    if (isOpen) {
      setClickedNodes([]);
      // Generate a random pattern of 3 distinct nodes when modal opens
      const nodes = new Set<number>();
      while (nodes.size < 3) {
        nodes.add(Math.floor(Math.random() * 9));
      }
      setRequiredNodes(Array.from(nodes));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNodeClick = (index: number) => {
    if (clickedNodes.includes(index)) return;
    const newNodes = [...clickedNodes, index];
    setClickedNodes(newNodes);

    if (newNodes.length === 3) {
      const isValid = requiredNodes.every(n => newNodes.includes(n));
      if (isValid) {
        setTimeout(() => {
          onSuccess(targetUrl);
          onClose();
        }, 500);
      } else {
        setTimeout(() => setClickedNodes([]), 600);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#020617] border border-cyan-500 max-w-md w-full p-6 md:p-8 relative pointer-events-auto"
      >
        <button onClick={() => onClose()} className="absolute right-4 top-4 text-slate-500 hover:text-white z-50 p-2 cursor-pointer">
          <X className="w-5 h-5 pointer-events-none" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h3 className="font-mono text-lg font-bold text-white uppercase">Anti-Bot Protocol</h3>
        </div>

        <p className="text-sm text-slate-400 mb-6 font-light">
          Verify human structural intelligence: Establish a neural connection by clicking the <strong className="text-cyan-400">3 highlighted active nodes</strong>.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6 relative p-6 border border-cyan-900/50 bg-black/50">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[120%] h-0.5 bg-cyan-500 absolute rotate-45"></div>
          </div>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <button
              key={i}
              onClick={() => handleNodeClick(i)}
              className={`w-12 h-12 md:w-16 md:h-16 mx-auto rounded-full border-2 transition-all relative z-10 flex items-center justify-center
                ${clickedNodes.includes(i)
                  ? requiredNodes.includes(i) ? 'bg-cyan-500 border-cyan-400' : 'bg-red-500 border-red-400'
                  : 'bg-[#020617] border-cyan-800 hover:border-cyan-400'}
                ${!clickedNodes.includes(i) && requiredNodes.includes(i) ? 'shadow-[0_0_15px_rgba(0,255,204,0.3)] border-dashed border-cyan-500/50' : ''}`}
            >
              {clickedNodes.includes(i) && (
                <div className="w-4 h-4 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 uppercase h-4">
          {clickedNodes.length === 3 && requiredNodes.every(n => clickedNodes.includes(n)) ? (
            <span className="text-green-400 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Connection Secure</span>
          ) : clickedNodes.length === 3 ? (
            <span className="text-red-400">Structural Failure. Resetting...</span>
          ) : (
            <span>Awaiting Node Selection [{clickedNodes.length}/3]</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Image carousel for service cards
const ServiceImageCarousel = ({ images, alt }: { images: string[], alt: string }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const startTimer = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);
  }, [images.length]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const go = (dir: 1 | -1) => {
    setCurrent(prev => (prev + dir + images.length) % images.length);
    startTimer();
  };

  return (
    <div
      className="aspect-video w-full mb-6 border border-cyan-900/50 overflow-hidden relative group/car"
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
      onMouseLeave={startTimer}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(calc(-${current} * (100% / ${images.length})))`, width: `${images.length * 100}%` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} ${i + 1}`}
            className="h-full object-cover opacity-60 mix-blend-screen"
            style={{ width: `${100 / images.length}%`, flexShrink: 0 }}
          />
        ))}
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/60 border border-cyan-500/40 text-cyan-400 text-xs font-bold flex items-center justify-center opacity-0 group-hover/car:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black z-10"
      >◀</button>
      <button
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/60 border border-cyan-500/40 text-cyan-400 text-xs font-bold flex items-center justify-center opacity-0 group-hover/car:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black z-10"
      >▶</button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); startTimer(); }}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-cyan-400 w-3' : 'bg-cyan-900 hover:bg-cyan-600'}`}
          />
        ))}
      </div>
    </div>
  );
};

// Gallery Lightbox Modal
const GalleryModal = ({ images, startIndex, onClose }: { images: string[], startIndex: number, onClose: () => void }) => {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIdx(p => (p + 1) % images.length);
      if (e.key === 'ArrowLeft') setIdx(p => (p - 1 + images.length) % images.length);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white border border-cyan-700 bg-black/80 hover:bg-cyan-500 hover:text-black transition-colors z-10"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); setIdx(p => (p - 1 + images.length) % images.length); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-cyan-400 border border-cyan-700 bg-black/80 hover:bg-cyan-500 hover:text-black transition-colors z-10 text-lg font-bold"
      >◀</button>

      <motion.img
        key={idx}
        src={images[idx]}
        alt={`Gallery ${idx + 1}`}
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.3 }}
        className="max-w-[90vw] max-h-[85vh] object-contain border border-cyan-500/30 shadow-[0_0_80px_rgba(0,255,204,0.2)]"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => { e.stopPropagation(); setIdx(p => (p + 1) % images.length); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-cyan-400 border border-cyan-700 bg-black/80 hover:bg-cyan-500 hover:text-black transition-colors z-10 text-lg font-bold"
      >▶</button>

      <div className="absolute bottom-4 font-mono text-xs text-cyan-600 tracking-widest">{idx + 1} / {images.length}</div>
    </motion.div>
  );
};

const GallerySection = () => {
  const galleryImages = Array.from({length: 24}, (_, i) => `/algo-pixel/projects/gallery_${i+1}.png`);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  return (
    <section id="gallery" className="py-24 px-6 border-y border-cyan-900/30 bg-[#020617]/80 relative overflow-hidden">
      {lightboxIdx !== null && (
        <GalleryModal
          images={galleryImages}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4">Project Gallery</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">Visual Documentation</h2>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Click any image to view full screen</p>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.05 }}
              className="break-inside-avoid border border-cyan-900/50 bg-[#020617] overflow-hidden relative group cursor-pointer"
              onClick={() => setLightboxIdx(i)}
            >
              <img
                src={src}
                alt={`Project ${i + 1}`}
                className="w-full object-cover opacity-70 mix-blend-screen group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              <div className="absolute bottom-2 right-2 font-mono text-[9px] text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity">[{String(i+1).padStart(2,'0')}]</div>
              <div className="absolute inset-0 border-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SafeInteractiveButton = ({ url, text }: { url: string, text: string }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // SEC-05: allowlist of domains this site legitimately links to.
  // If anything other than these origins reaches onSuccess, it is blocked.
  const ALLOWED_ORIGINS = [
    'https://www.upwork.com',
    'https://www.linkedin.com',
    'https://github.com',
    'https://wa.me',
  ];

  const handleSuccess = (finalUrl: string) => {
    const isAllowed = ALLOWED_ORIGINS.some(origin => finalUrl.startsWith(origin));
    if (!isAllowed) {
      console.warn('[SEC] Blocked navigation to non-allowlisted URL:', finalUrl);
      return;
    }
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="group relative px-8 py-4 bg-cyan-500 text-black font-bold uppercase tracking-wider overflow-hidden w-full sm:w-auto text-center"
      >
        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
        <span className="relative z-10 font-mono flex items-center justify-center gap-2">
          <Terminal className="w-4 h-4" /> {text}
        </span>
      </button>

      <AntiPhishPuzzleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
        targetUrl={url}
      />
    </>
  );
};

const SafeSocialLinks = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");

  // SEC-05: strict allowlist — only these origins can be opened after puzzle pass
  const ALLOWED_ORIGINS = [
    'mailto:cheahyueyeou@gmail.com',
    'https://www.linkedin.com',
    'https://wa.me',
    'https://www.upwork.com',
    'https://github.com',
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    const isAllowed = ALLOWED_ORIGINS.some(origin => url.startsWith(origin));
    if (!isAllowed) {
      console.warn('[SEC] Blocked navigation to non-allowlisted URL:', url);
      return;
    }
    setTargetUrl(url);
    setModalOpen(true);
  };

  const handleSuccess = (url: string) => {
    const isAllowed = ALLOWED_ORIGINS.some(origin => url.startsWith(origin));
    if (!isAllowed) {
      console.warn('[SEC] Blocked post-puzzle navigation to non-allowlisted URL:', url);
      return;
    }
    if (url.startsWith('mailto:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  const links = [
    { name: "Email", icon: <Mail className="w-5 h-5" />, url: "mailto:cheahyueyeou@gmail.com" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/josephcheah-intj-generalist/" },
    { name: "WhatsApp", icon: <span className="font-bold text-xs uppercase">WA</span>, url: "https://wa.me/message/JRBZU4QQ2WBAK1" },
    { name: "Upwork", icon: <span className="font-bold text-xs uppercase">UP</span>, url: "https://www.upwork.com/freelancers/~0121759a0973715fb0?mp_source=share" },
    { name: "GitHub", icon: <Github className="w-5 h-5" />, url: "https://github.com/josephcheahyy" },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            onClick={(e) => handleLinkClick(e, link.url)}
            className="w-12 h-12 flex items-center justify-center border border-cyan-900/50 text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all bg-[#020617]/50 backdrop-blur-sm"
            title={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>
      <AntiPhishPuzzleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
        targetUrl={targetUrl}
      />
    </>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 relative overflow-hidden">
      <InteractiveStructuralBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-cyan-900/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col">
              <span className="font-mono font-bold text-white text-lg leading-none tracking-tight">ALGO PIXEL EMPIRE</span>
              <a href="https://www.linkedin.com/in/josephcheah-intj-generalist/" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-widest text-cyan-500 hover:text-cyan-300 transition-colors">JOSEPH CHEAH // FOUNDER</a>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-mono tracking-widest text-cyan-600/70 uppercase">
            <a href="#about" className="hover:text-cyan-400 transition-colors">01. Initialization</a>
            <a href="#expertise" className="hover:text-cyan-400 transition-colors">02. Algorithms</a>
            <a href="#products" className="hover:text-cyan-400 transition-colors">03. Systems</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">04. Ping</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-40 md:pt-48 pb-20 px-6 flex flex-col min-h-[90vh] justify-center relative">
          <div className="max-w-7xl mx-auto w-full relative">
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="mb-8 w-44 h-44 md:w-56 md:h-56 relative logo-glitch overflow-hidden border-2 border-cyan-500/80">
                <img src="/algo-pixel/algo-pixel-logo.jpg" alt="Algo Pixel Logo" className="w-full h-full object-contain" />
              </div>

              <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-cyan-950/30 border-l-2 border-cyan-500 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-6">
                <Grid3X3 className="w-4 h-4" />
                <span>Civil & Structure Analysis | Graphic Design | AI Automation</span>
              </div>

              <div className="mb-2">
                <span className="font-mono text-lg md:text-2xl font-bold tracking-widest text-cyan-400 uppercase bg-cyan-900/20 px-4 py-2 border border-cyan-500/30">
                  <AlgoText text="Joseph Cheah" delay={300} />
                </span>
              </div>
              <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-white mb-6 leading-[0.9] uppercase">
                <AlgoText text="Algo Pixel Empire" delay={800} />
              </h2>

              <p className="text-base md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl font-light border-l border-white/10 pl-4">
                Our expertise lies in using computational automation to accelerate structural engineering while maintaining the aesthetic precision required for modern design.
              </p>

              <div className="flex flex-col gap-6 font-mono text-sm max-w-xl">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.upwork.com/freelancers/~0121759a0973715fb0?mp_source=share"
                    target="_blank" rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-cyan-500 text-black font-bold uppercase tracking-wider overflow-hidden w-full sm:w-auto text-center inline-block"
                  >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    <span className="relative z-10 font-mono flex items-center justify-center gap-2">
                      <Terminal className="w-4 h-4" /> Work With Algo Pixel Now
                    </span>
                  </a>
                  <a href="#products" className="inline-block w-full sm:w-auto text-center px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 border border-cyan-500 hover:bg-cyan-500 hover:text-black transition-colors bg-cyan-950/20">
                    EXPLORE OUR SERVICES
                  </a>
                </div>

                <div className="mt-2">
                  <SafeSocialLinks />
                </div>
              </div>
            </motion.div>

            {/* Interactive Model Builder Decoration */}
            <motion.div
              style={{ y: yOffset }}
              className="hidden md:block mt-12 lg:mt-0 relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 opacity-90 w-full h-[400px] md:w-[600px] md:h-[600px] lg:w-[650px] lg:h-[650px] touch-none"
            >
              <InteractiveModelBuilder />
            </motion.div>
          </div>
        </section>

        {/* Philosophy & Stats */}
        <section id="about" className="py-24 px-6 border-y border-cyan-900/30 bg-[#020617]/80 backdrop-blur-xl relative">
          {/* Decorative Corner Pixels */}
          <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-cyan-500"></div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="font-mono text-cyan-500 text-sm tracking-widest">01 // Data-To-Solution Protocol</div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">The Bridge Between Logic & Aesthetics</h2>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  Modern engineering suffers from massive repetitive friction. We eliminate it by connecting powerful analytical models like ETABS and SAFE to custom pipeline automations and AI.
                </p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-10 mt-12 border-t border-cyan-900/30 pt-8">
                  <div className="border border-cyan-500/20 bg-cyan-950/10 p-4 hover:border-cyan-500/50 transition-colors">
                    <div className="text-4xl font-black text-white mb-1 font-mono">30<span className="text-cyan-500">%</span></div>
                    <div className="text-xs text-cyan-600 font-mono uppercase tracking-widest">Faster Modeling</div>
                  </div>
                  <div className="border border-cyan-500/20 bg-cyan-950/10 p-4 hover:border-cyan-500/50 transition-colors">
                    <div className="text-4xl font-black text-white mb-1 font-mono">40<span className="text-cyan-500">%</span></div>
                    <div className="text-xs text-cyan-600 font-mono uppercase tracking-widest">Design Faster with Algorithm</div>
                  </div>
                  <div className="border border-cyan-500/20 bg-cyan-950/10 p-4 hover:border-cyan-500/50 transition-colors">
                    <div className="text-4xl font-black text-white mb-1 font-mono">10<span className="text-cyan-500">+</span></div>
                    <div className="text-xs text-cyan-600 font-mono uppercase tracking-widest">Water Supply Approvals</div>
                  </div>
                  <div className="border border-cyan-500/20 bg-cyan-950/10 p-4 hover:border-cyan-500/50 transition-colors">
                    <div className="text-4xl font-black text-white mb-1 font-mono">1<span className="text-cyan-500">st</span></div>
                    <div className="text-xs text-cyan-600 font-mono uppercase tracking-widest">Class Honors Civil Eng.</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="aspect-square bg-[#020617] relative p-2 border border-cyan-500/30">
                  {/* Decorative corner brackets for tech feel */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>

                  <div className="w-full h-full relative overflow-hidden bg-cyan-950/20">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,204,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <img
                      src="/algo-pixel/architect_modeling_holo.png"
                      alt="Joseph Cheah Modeling Hologram"
                      className="w-full h-full object-cover opacity-90 mix-blend-lighten scale-105 hover:scale-100 transition-transform duration-700 filter contrast-125"
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(2,6,23,0.9)]" />

                    {/* HUD Elements */}
                    <div className="absolute top-4 right-4 font-mono text-[10px] text-cyan-400 text-right bg-black/60 p-2 border border-cyan-500/30">
                      <div><span className="text-white">NODE:</span> ALG-PXL-01</div>
                      <div><span className="text-white">STAT:</span> ONLINE</div>
                      <div className="mt-1 w-full h-1 bg-cyan-900 overflow-hidden">
                        <motion.div
                          className="h-full bg-cyan-400"
                          animate={{ width: ["0%", "100%", "0%"] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Expertise Container */}
        <section id="expertise" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 border-b border-cyan-900/30 pb-8">
              <div className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4">02 // Capability Matrix</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">Core Skills</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
              {[
                {
                  icon: <Building2 className="w-6 h-6" />,
                  title: "High-Rise RC/PT Design",
                  desc: "Eurocode & BS Standards. Engineering tall structures, shear walls, and core walls for mixed developments and LRT projects. Precision lateral load routing (Wind & Seismic)."
                },
                {
                  icon: <Code2 className="w-6 h-6" />,
                  title: "Algorithmic Detailing",
                  desc: "Custom AutoLisp scripts bridging ETABS analysis directly with AutoCAD drafting. Generating immediate structural nodes and pixel-perfect steel reinforcement plans."
                },
                {
                  icon: <Cpu className="w-6 h-6" />,
                  title: "AI Structural Agents",
                  desc: "Automating finite element modeling loops using OpenAI GPT/Gemini. Parsing analysis data, extracting forces, and streamlining repetitive engineering computation."
                },
                {
                  icon: <Droplets className="w-6 h-6" />,
                  title: "Fluid & Hydraulic Systems",
                  desc: "Complex water reticulation design and authority submissions (KM/PBA). Managing pump head calculations and distributing massive hydrostatic loads."
                },
                {
                  icon: <LineChart className="w-6 h-6" />,
                  title: "Optimization Matrices",
                  desc: "Excel-based engineered tools utilizing matrix structural analysis to accelerate corewall and post-tensioned slab designs by 40%."
                },
                {
                  icon: <Layers className="w-6 h-6" />,
                  title: "BIM & Structural Stacks",
                  desc: "Deep expertise in Revit (BIM), ETABS, SAP2000, AdaptPT, and SAFE. Mapping physical geometry into rigorous 3D finite element solvers."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[#020617] p-8 border border-cyan-900/40 hover:border-cyan-400 group relative transition-colors duration-300 overflow-hidden"
                >
                  {/* Hover structural scanline effect */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <div className="absolute bottom-0 right-0 w-full h-[2px] bg-cyan-400 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-cyan-400 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <div className="absolute bottom-0 right-0 w-[2px] h-full bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                  {/* Matrix/Pixel background on hover */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDBGRkNDIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 text-cyan-600 mb-6 group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_8px_rgba(0,255,204,0)] group-hover:drop-shadow-[0_0_8px_rgba(0,255,204,0.5)]">
                    {item.icon}
                  </div>
                  <h3 className="relative z-10 text-xl font-bold mb-3 text-white uppercase tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500/50 group-hover:bg-cyan-400 block transition-colors" />
                    {item.title}
                  </h3>
                  <p className="relative z-10 text-slate-400 leading-relaxed text-sm font-light group-hover:text-slate-300 transition-colors">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deployments & Systems */}
        <section id="products" className="py-24 px-6 border-y border-cyan-900/30 bg-[#020617]/50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <div className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4">03 // Deployed Services</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">Analysis & Computation</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* SERVICE 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-cyan-900/50 bg-[#020617] p-5 md:p-8 hover:border-cyan-500/50 transition-colors relative group flex flex-col"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity z-10">
                  <Building2 className="w-24 h-24 text-cyan-500" />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="font-mono text-cyan-500 mb-2">// SERVICE.01</div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 uppercase">Structural Modelling & Analysis</h3>

                  <ServiceImageCarousel
                    alt="Structural Modelling"
                    images={[1,2,3,4,5].map(i => `/algo-pixel/projects/structural_${i}.png`)}
                  />

                  <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light max-w-sm">
                    High-rise RC/PT building design under Eurocode/BS Standards — from 3D parametric modelling in Tekla &amp; Revit through to full FEM analysis. Gravity/lateral load routing, connection design, detailing, and Tekla–Revit BIM integration with IFC workflows.
                  </p>
                  <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                    <span className="border border-cyan-500/30 px-2 py-1">ETABS / SAP2000</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Revit BIM</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Tekla Structures</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Tekla–Revit Integration</span>
                    <span className="border border-cyan-500/30 px-2 py-1">3D Structural Modelling</span>
                    <span className="border border-cyan-500/30 px-2 py-1">IFC Export / Clash Detection</span>
                    <span className="border border-cyan-500/30 px-2 py-1">AutoCAD</span>
                    <span className="border border-cyan-500/30 px-2 py-1">SketchUp</span>
                    <span className="border border-cyan-500/30 px-2 py-1">MIDAS Civil/Gen</span>
                    <span className="border border-cyan-500/30 px-2 py-1">SAFE / AdaptPT</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-cyan-900/30">
                  <a href="https://www.upwork.com/services/product/design-a-full-set-of-residential-rc-design-report-and-3d-model-2029193254216635191?ref=project_share&tier=1" target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-white transition-colors">
                    Request This Service
                  </a>
                </div>
              </motion.div>

              {/* SERVICE 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="border border-cyan-900/50 bg-[#020617] p-5 md:p-8 hover:border-cyan-500/50 transition-colors relative group flex flex-col"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity z-10">
                  <Code2 className="w-24 h-24 text-cyan-500" />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="font-mono text-cyan-500 mb-2">// SERVICE.02</div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 uppercase">Custom AutoLISP</h3>

                  <ServiceImageCarousel
                    alt="Custom AutoLISP"
                    images={[1,2,3,4,5].map(i => `/algo-pixel/projects/autolisp_${i}.png`)}
                  />

                  <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light max-w-sm">
                    Bespoke AutoLISP programs targeting repetitive CAD workflows — auto-dimensioning, dynamic block generation, batch layer control, and direct ETABS-to-AutoCAD data pipelines. Zero manual re-entry, zero propagation errors.
                  </p>
                  <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                    <span className="border border-cyan-500/30 px-2 py-1">AutoLISP</span>
                    <span className="border border-cyan-500/30 px-2 py-1">DCL Dialogs</span>
                    <span className="border border-cyan-500/30 px-2 py-1">AutoCAD API</span>
                    <span className="border border-cyan-500/30 px-2 py-1">VLISP / Visual LISP</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Batch Scripting</span>
                    <span className="border border-cyan-500/30 px-2 py-1">ETABS Integration</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-cyan-900/30">
                  <a href="https://www.upwork.com/services/product/development-it-a-custom-request-autocad-lisp-script-for-specific-purpose-2031369421404053927?ref=project_share&tier=1" target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-white transition-colors">
                    Request This Service
                  </a>
                </div>
              </motion.div>

              {/* SERVICE 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-cyan-900/50 bg-[#020617] p-5 md:p-8 hover:border-cyan-500/50 transition-colors relative group flex flex-col"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity z-10">
                  <Database className="w-24 h-24 text-cyan-500" />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="font-mono text-cyan-500 mb-2">// SERVICE.03</div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 uppercase">Custom Spreadsheet</h3>

                  <ServiceImageCarousel
                    alt="Custom Spreadsheet"
                    images={[1,2,3,4].map(i => `/algo-pixel/projects/spreadsheet_${i}.png`)}
                  />

                  <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light max-w-sm">
                    Engineered Excel workbooks with VBA macros and Python-powered backends — shearwall/corewall matrices, PT slab calculators, load takeoff sheets, and automated design report generators. Cut iteration cycles by 40%.
                  </p>
                  <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                    <span className="border border-cyan-500/30 px-2 py-1">Excel VBA</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Python (openpyxl)</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Struct. Matrix</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Eurocode Design</span>
                    <span className="border border-cyan-500/30 px-2 py-1">PT Slab / PT Beam</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Load Takeoff</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-cyan-900/30">
                  <a href="https://www.upwork.com/services/product/development-it-a-custom-request-excel-spreadsheet-for-specific-purpose-2031362556780569573?ref=project_share&tier=1" target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-white transition-colors">
                    Request This Service
                  </a>
                </div>
              </motion.div>

              {/* SERVICE 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="border border-cyan-900/50 bg-[#020617] p-5 md:p-8 hover:border-cyan-500/50 transition-colors relative group flex flex-col"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity z-10">
                  <Terminal className="w-24 h-24 text-cyan-500" />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="font-mono text-cyan-500 mb-2">// SERVICE.04</div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 uppercase">Research and Analysis</h3>

                  <ServiceImageCarousel
                    alt="Research & Analysis"
                    images={[1,2,3,4].map(i => `/algo-pixel/projects/research_${i}.png`)}
                  />

                  <p className="text-slate-400 text-sm leading-relaxed mb-4 font-light max-w-sm">
                    Numerical simulation, parametric studies, and peer-reviewed technical writing. From cold-formed steel fire performance to FEA calibration — engineering problems solved with data, not guesswork.
                  </p>
                  <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300 mb-4">
                    <span className="border border-cyan-500/30 px-2 py-1">FEA / FEM</span>
                    <span className="border border-cyan-500/30 px-2 py-1">ABAQUS</span>
                    <span className="border border-cyan-500/30 px-2 py-1">MIDAS Civil</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Parametric Study</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Statistical Analysis</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Technical Writing</span>
                  </div>
                  {/* Embedded Paper Block */}
                  <div className="mt-4 p-4 border border-cyan-500/30 bg-black/50">
                    <div className="font-mono text-cyan-600 text-[10px] uppercase tracking-widest mb-1">Published Paper [2025]</div>
                    <h4 className="text-xs font-bold text-white uppercase mb-2 leading-tight">Numerical Modeling of Cold-Formed Steel Section Performance in Fire</h4>
                    <button className="whitespace-nowrap px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black border border-cyan-500 hover:bg-cyan-500 hover:text-black text-cyan-400 transition-colors">
                      Mount Document
                    </button>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-cyan-900/30">
                  <a href="https://www.upwork.com/services/product/writing-translation-a-research-and-analysis-report-with-proposed-solutions-2031375413253758514?ref=project_share&tier=1" target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-white transition-colors">
                    Request This Service
                  </a>
                </div>
              </motion.div>

              {/* SERVICE 5 CUSTOM */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 border border-dashed border-cyan-500/50 bg-[#020617]/50 p-5 md:p-8 hover:border-cyan-400 hover:bg-cyan-950/20 transition-colors relative group flex flex-col items-center justify-center text-center"
              >
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <Cpu className="w-16 h-16 text-cyan-400 relative z-10" />
                </div>
                <div className="font-mono text-cyan-500 mb-2">// SERVICE.05</div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase">Custom Architecture</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light max-w-2xl">
                  Require a bespoke solution outside standard parameters? We build custom AI software workflows, deeply integrated automation logic, and unique digital infrastructure tailored purely to your project's unique physics.
                </p>
                <SafeInteractiveButton
                  url="https://wa.me/message/JRBZU4QQ2WBAK1"
                  text="Request Custom Service"
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <GallerySection />

        {/* Contact Module */}
        <footer id="contact" className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 border border-cyan-900/50 bg-[#020617] p-12 lg:p-16 relative overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <img src="/algo-pixel/communication_pixel.png" alt="Working Together" className="w-full h-full object-cover opacity-20 filter grayscale mix-blend-screen group-hover:opacity-40 transition-opacity duration-700" />
              </div>
              <div className="relative z-10">
                <div className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 animate-pulse"></div> 04 // Handshake Protocol
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 uppercase">Open Comm <br />Channel</h2>
                <p className="text-lg text-slate-300 mb-10 max-w-md font-light bg-black/40 p-4 border-l-2 border-cyan-500 backdrop-blur-md">
                  Ready to deploy high-velocity engineering automations or mandate massive structural blueprints?
                </p>
                <SafeSocialLinks />
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-between font-mono text-[10px] md:text-xs text-cyan-600 uppercase tracking-widest">
              <p>ALGO PIXEL EMPIRE © {new Date().getFullYear()} // JOSEPH CHEAH. <span className="font-bold text-cyan-400">MALAYSIA REGISTERED COMPANY JM1041472-M</span></p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <span>[ENG]</span>
                <span>[MGR]</span>
                <span>[AUTO]</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
