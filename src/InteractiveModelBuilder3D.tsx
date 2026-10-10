import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Box } from '@react-three/drei';
import * as THREE from 'three';

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

// Converting from screen coords to 3D coords
const SCREEN_SCALE = 0.05; 

const StructBlock3D = ({ el }: { el: StructElement }) => {
  const { w, h, d, x, y, z, type } = el;
  const analysisValue = React.useMemo(() => (Math.random() * 500).toFixed(1), []);
  const analysisType = React.useMemo(() => Math.random() > 0.5 ? 'Shear: ' : 'Moment: ', []);
  
  return (
    <group position={[x * SCREEN_SCALE, -y * SCREEN_SCALE, z * SCREEN_SCALE]}>
      <mesh>
        <boxGeometry args={[w * SCREEN_SCALE, h * SCREEN_SCALE, d * SCREEN_SCALE]} />
        <meshStandardMaterial color="#00ffcc" transparent opacity={type === 'slab' ? 0.3 : 0.6} />
        <Edges scale={1} threshold={15} color="#00ffcc" />
      </mesh>
    </group>
  );
};

const SpinningGroup = ({ elements }: { elements: StructElement[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base wireframe cube */}
      <mesh>
        <boxGeometry args={[10, 10, 10]} />
        <meshBasicMaterial visible={false} />
        <Edges scale={1} threshold={15} color="#0088aa" />
      </mesh>
      
      {elements.map(el => (
        <StructBlock3D key={el.id} el={el} />
      ))}
    </group>
  );
};

export const InteractiveModelBuilder3D = () => {
  const [elements, setElements] = useState<StructElement[]>([]);
  const [message, setMessage] = useState("DRAG TO DRAW SLAB/FOOTING. CLICK POINTS FOR BEAM/COLUMN.");
  const [isFading, setIsFading] = useState(false);

  const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number, y: number } | null>(null);
  const [firstPoint, setFirstPoint] = useState<{ x: number, y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    }, 8000);
    return () => clearTimeout(fadeTimer);
  }, [elements.length]);

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
    const isClick = Math.abs(dx) < 5 && Math.abs(dy) < 5;

    if (isClick) {
      if (!firstPoint) {
        setFirstPoint(coords);
      } else {
        const cdx = coords.x - firstPoint.x;
        const cdy = coords.y - firstPoint.y;
        const screenCx = firstPoint.x + cdx / 2;
        const screenCy = firstPoint.y + cdy / 2;
        let type: 'beam' | 'column' = Math.abs(cdx) > Math.abs(cdy) ? 'beam' : 'column';
        let w = type === 'beam' ? Math.max(Math.abs(cdx), 20) : 16;
        let h = type === 'column' ? Math.max(Math.abs(cdy), 20) : 16;
        setElements(prev => [...prev, { id: Date.now() + Math.random(), type, x: screenCx, y: screenCy, z: 0, w, h, d: 16 }]);
        if (message.includes("DRAG")) setMessage("INJECTING STRUCTURAL ELEMENTS...");
        setFirstPoint(null);
      }
    } else {
      const screenCx = dragStart.x + dx / 2;
      const screenCy = dragStart.y + dy / 2;
      const type = Math.abs(dx) > 20 && Math.abs(dy) > 20 ? 'slab' : 'node';
      const w = type === 'slab' ? Math.abs(dx) : 20;
      const h = type === 'slab' ? Math.abs(dy) : 20;
      const d = type === 'slab' ? 10 : 20;
      if (type === 'slab') {
        if (message.includes("DRAG")) setMessage("INJECTING STRUCTURAL ELEMENTS...");
        setElements(prev => [...prev, { id: Date.now() + Math.random(), type, x: screenCx, y: screenCy, z: 0, w, h, d }]);
        setFirstPoint(null);
      }
    }
    setDragStart(null);
    setDragCurrent(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start pointer-events-auto">
      <div
        ref={containerRef}
        className="w-[200px] h-[120px] md:w-[450px] md:h-[450px] relative cursor-crosshair border border-cyan-500/20 bg-cyan-900/5 group select-none overflow-visible"
        style={{ touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDragStart={(e) => e.preventDefault()}
      >
        {firstPoint && (
          <div className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00ffcc] pointer-events-none z-50 mix-blend-screen"
            style={{ left: `calc(50% + ${firstPoint.x - 4}px)`, top: `calc(50% + ${firstPoint.y - 4}px)` }}></div>
        )}
        {firstPoint && dragCurrent && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-40 opacity-50 mix-blend-screen">
            <line x1={`calc(50% + ${firstPoint.x}px)`} y1={`calc(50% + ${firstPoint.y}px)`} x2={`calc(50% + ${dragCurrent.x}px)`} y2={`calc(50% + ${dragCurrent.y}px)`} stroke="#00ffcc" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        )}
        {dragStart && dragCurrent && Math.abs(dragCurrent.x - dragStart.x) > 5 && Math.abs(dragCurrent.y - dragStart.y) > 5 && (
          <div className="absolute border-2 border-cyan-400 border-dashed bg-cyan-400/20 z-50 mix-blend-screen pointer-events-none"
            style={{ left: `calc(50% + ${Math.min(dragStart.x, dragCurrent.x)}px)`, top: `calc(50% + ${Math.min(dragStart.y, dragCurrent.y)}px)`, width: `${Math.max(Math.abs(dragCurrent.x - dragStart.x), 4)}px`, height: `${Math.max(Math.abs(dragCurrent.y - dragStart.y), 4)}px` }} />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,204,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-50"></div>
        
        <div className={`absolute inset-0 transition-all duration-1000 ${isFading ? 'opacity-0 scale-125 blur-xl' : 'opacity-100 scale-100'}`}>
          <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffcc" />
            <SpinningGroup elements={elements} />
          </Canvas>
        </div>
      </div>
      
      <div key={message} className={`mt-12 font-mono text-sm tracking-widest text-center px-4 transition-opacity duration-300 ${isFading ? 'text-cyan-300 font-bold' : 'text-cyan-600'}`}>
        {message}
      </div>
    </div>
  );
};
