import { motion, useScroll, useTransform } from 'motion/react';
import React, { useState, useEffect } from 'react';
import {
  Building2, Cpu, LineChart, Droplets, Code2,
  Layers, ArrowRight, Mail, Linkedin, Github,
  Terminal, Database, Grid3X3, Braces
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

// Interactive 3D Voxel Builder Component
const InteractiveModelBuilder = () => {
  const [cubes, setCubes] = useState<{ x: number, y: number, z: number, id: number }[]>([]);
  const [message, setMessage] = useState("CLICK TO MODEL STRUCTURE");
  const [isFading, setIsFading] = useState(false);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  // Auto rotation
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setRotX(prev => prev + 0.2);
      setRotY(prev => prev + 0.5);
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // 8 Second Timer Logic
  useEffect(() => {
    if (cubes.length === 0) return;

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      setMessage("MODELING COSTS EFFORT.");

      setTimeout(() => {
        setMessage("BUT LET US DO IT.");
        setTimeout(() => {
          setCubes([]);
          setIsFading(false);
          setMessage("CLICK TO MODEL STRUCTURE");
        }, 3000);
      }, 2000);
    }, 8000); // 8 seconds after first cube is placed

    return () => clearTimeout(fadeTimer);
  }, [cubes.length === 0]); // Only trigger when we go from 0 to 1+

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFading) return;

    // Calculate relative click position
    const rect = e.currentTarget.getBoundingClientRect();
    // Map to a grid (-2 to 2)
    const x = Math.round(((e.clientX - rect.left) / rect.width - 0.5) * 4);
    const y = Math.round(((e.clientY - rect.top) / rect.height - 0.5) * 4);

    // Add new cube at click position with random z depth
    const newCube = {
      x: x * 40,
      y: y * 40,
      z: (Math.random() - 0.5) * 100,
      id: Date.now() + Math.random()
    };

    setCubes(prev => [...prev, newCube]);
    if (message === "CLICK TO MODEL STRUCTURE") {
      setMessage("INJECTING STRUCTURAL ELEMENTS...");
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-auto">
      {/* 3D Container */}
      <div
        className="w-[300px] h-[300px] relative cursor-crosshair border border-cyan-500/20 bg-cyan-900/5 group"
        style={{ perspective: '1000px' }}
        onClick={handleCanvasClick}
      >
        <div className="absolute top-2 left-2 font-mono text-[10px] text-cyan-400/50">
          X: {(rotX % 360).toFixed(1)}° <br />
          Y: {(rotY % 360).toFixed(1)}°
        </div>

        {/* Helper Grid lines to show building area */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,204,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-50"></div>

        <motion.div
          animate={{ rotateX: rotX, rotateY: rotY }}
          className={`w-full h-full absolute transition-opacity duration-1000 ${isFading ? 'opacity-0 scale-110 blur-md' : 'opacity-100'}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Base Structural Frame that always exists */}
          <div className="absolute inset-0 border border-cyan-500/30" style={{ transform: 'translateZ(100px)' }}></div>
          <div className="absolute inset-0 border border-cyan-500/30" style={{ transform: 'translateZ(-100px)' }}></div>
          <div className="absolute top-0 left-0 w-full h-full border border-cyan-500/30" style={{ transform: 'rotateX(90deg) translateZ(100px)' }}></div>
          <div className="absolute top-0 left-0 w-full h-full border border-cyan-500/30" style={{ transform: 'rotateY(90deg) translateZ(100px)' }}></div>

          {/* User-added cubes */}
          {cubes.map((cube) => (
            <motion.div
              key={cube.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              className="absolute left-1/2 top-1/2 w-[40px] h-[40px] -ml-[20px] -mt-[20px] border border-cyan-400 bg-cyan-500/20 backdrop-blur-sm"
              style={{
                transform: `translate3d(${cube.x}px, ${cube.y}px, ${cube.z}px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Fake 3D edges for the cube */}
              <div className="absolute inset-0 bg-cyan-400/20" style={{ transform: 'translateZ(20px)' }}></div>
              <div className="absolute inset-0 bg-cyan-600/20" style={{ transform: 'translateZ(-20px)' }}></div>
              <div className="absolute inset-0 bg-cyan-500/20 border-l border-cyan-300" style={{ transform: 'rotateY(90deg) translateZ(20px)' }}></div>
              <div className="absolute inset-0 bg-cyan-500/20 border-r border-cyan-300" style={{ transform: 'rotateY(90deg) translateZ(-20px)' }}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Interactive Message Display */}
      <motion.div
        key={message}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-8 font-mono text-sm tracking-widest text-center ${isFading ? 'text-cyan-300 font-bold' : 'text-cyan-600'}`}
      >
        {message}
      </motion.div>
    </div>
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
          <div className="flex items-center gap-3">
            {/* Logo Placeholder */}
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="w-10 h-10 border-2 border-cyan-500 flex flex-wrap p-1 gap-0.5 items-center justify-center relative cursor-pointer"
            >
              {/* 4 tiny pixels inside the logo box */}
              <div className="w-3 h-3 bg-cyan-500"></div>
              <div className="w-3 h-3 bg-transparent border border-cyan-500/50"></div>
              <div className="w-3 h-3 bg-transparent border border-cyan-500/50"></div>
              <div className="w-3 h-3 bg-cyan-300"></div>
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <span className="font-mono font-bold text-white text-lg leading-none tracking-tight">ALGO PIXEL EMPIRE</span>
              <span className="font-mono text-[10px] tracking-widest text-cyan-500">JOSEPH CHEAH // FOUNDER</span>
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
              <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-cyan-950/30 border-l-2 border-cyan-500 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-6">
                <Grid3X3 className="w-4 h-4" />
                <span>High-Rise Structural Design & Automation</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[1] uppercase">
                <AlgoText text="Joseph Cheah" delay={300} /><br />
                <span className="text-cyan-500 block mt-2">
                  <AlgoText text="Algo Pixel Empire" delay={800} />
                </span>
              </h1>

              <p className="text-base md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl font-light border-l border-white/10 pl-4">
                I construct <strong className="text-white font-medium">high-performance residential RC structural designs, digital workflows, and advanced 3D models</strong>. Merging raw engineering physics with pixel-perfect automation.
              </p>

              <div className="flex flex-wrap gap-4 font-mono text-sm">
                <motion.a
                  whileHover={{ scale: 1.05, backgroundColor: "#06b6d4", color: "#000" }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.upwork.com/services/product/design-a-full-set-of-residential-rc-design-report-and-3d-model-2029193254216635191?ref=project_share&tier=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-cyan-500 text-cyan-400 px-8 py-4 transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10 font-bold uppercase tracking-wider">Execute Protocol [Hire Me]</span>
                  <div className="absolute inset-0 bg-cyan-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 z-0"></div>
                </motion.a>
              </div>
            </motion.div>

            {/* Interactive Model Builder Decoration */}
            <motion.div
              style={{ y: yOffset }}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-90 w-[500px] h-[500px]"
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
                <div className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Braces className="w-4 h-4" /> 01 // Data-To-Solution Protocol
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase">
                  Logic over <br /> Brute Force.
                </h2>
                <div className="space-y-6 text-slate-400 font-light text-lg">
                  <p>
                    My philosophy is absolute efficiency: integrate robust engineering design with <strong className="text-cyan-400">digital tools and data-driven decision-making</strong> to drive project velocity and precision.
                  </p>
                  <p>
                    With 4+ years of experience navigating high-rise environments and fluid dynamics (water supply systems), I operate at the intersection of <strong className="text-white">Structural Engineering, Computational Design, and AI Automation</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-10 mt-12">
                  <div className="border border-cyan-500/20 bg-cyan-950/10 p-4 hover:border-cyan-500/50 transition-colors">
                    <div className="text-4xl font-black text-white mb-1 font-mono">40<span className="text-cyan-500">%</span></div>
                    <div className="text-xs text-cyan-600 font-mono uppercase tracking-widest">Faster Modeling</div>
                  </div>
                  <div className="border border-cyan-500/20 bg-cyan-950/10 p-4 hover:border-cyan-500/50 transition-colors">
                    <div className="text-4xl font-black text-white mb-1 font-mono">40<span className="text-cyan-500">%</span></div>
                    <div className="text-xs text-cyan-600 font-mono uppercase tracking-widest">Faster Shearwall Design</div>
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
                      src="/algo-pixel/bim_tech.png"
                      alt="BIM and Technology"
                      className="w-full h-full object-cover opacity-70 mix-blend-screen scale-105 hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(2,6,23,0.8)]" />

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
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">Core Algorithms</h2>
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
              <div className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4">03 // Deployed Systems</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">Analysis & Computation</h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Featured Product */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-12 bg-black border border-cyan-500/30 p-1 relative group"
              >
                <div className="bg-[#020617] p-8 md:p-12 h-full flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
                  {/* Background grid */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBGRkNDIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')] opacity-50"></div>

                  <div className="relative z-10 flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500 text-black font-bold font-mono text-xs tracking-widest uppercase mb-6">
                      <Terminal className="w-3 h-3" /> Root Execution
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">NestWiseAi</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed font-light text-lg">
                      A GPT-driven financial assistance model utilizing OpenAI functions. Leading the development to provide intelligent, automated financial insights mapping direct to structural economics.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {['OpenAI Protocol', 'Function Calling', 'Financial Modeling', 'Workflow Automation'].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-cyan-300 font-mono">
                          <span className="text-cyan-600">[{i + 1}]</span> {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 flex-1 w-full">
                    <div className="aspect-video bg-black border-2 border-cyan-900 relative p-1 overflow-hidden">
                      <div className="w-full h-full relative border border-cyan-900/50">
                        {/* Simulated AI Terminal View */}
                        <div className="absolute inset-0 bg-black flex flex-col p-4 font-mono text-xs text-cyan-500">
                          <div className="flex justify-between border-b border-cyan-900 pb-2 mb-4">
                            <span>nestwise_ai.exe</span>
                            <span>v1.0.4-BETA</span>
                          </div>
                          <div className="flex-1 opacity-70">
                            {'>'} INITIALIZING NEURAL PATHWAYS... [OK]<br />
                            {'>'} LOADING FINANCIAL DATASETS... [OK]<br />
                            {'>'} BINDING OPENAI PROTOCOLS...<br /><br />
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="w-2 h-4 bg-cyan-400 inline-block"
                            ></motion.span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Boxed modules */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-6 border border-cyan-900/50 bg-[#020617] p-8 hover:border-cyan-500/50 transition-colors relative group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <Code2 className="w-24 h-24 text-cyan-500" />
                </div>
                <div className="relative z-10">
                  <div className="font-mono text-cyan-500 mb-2">// SCRIPT.01</div>
                  <h3 className="text-2xl font-black text-white mb-3 uppercase">AutoLisp Bridge</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light max-w-sm">
                    High-velocity computational scripts engineered to map ETABS physics analysis directly to AutoCAD drafting nodes. Accelerating deployment models by 80%.
                  </p>
                  <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                    <span className="border border-cyan-500/30 px-2 py-1">AutoLisp</span>
                    <span className="border border-cyan-500/30 px-2 py-1">ETABS API</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-6 border border-cyan-900/50 bg-[#020617] p-8 hover:border-cyan-500/50 transition-colors relative group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <Database className="w-24 h-24 text-cyan-500" />
                </div>
                <div className="relative z-10">
                  <div className="font-mono text-cyan-500 mb-2">// SCRIPT.02</div>
                  <h3 className="text-2xl font-black text-white mb-3 uppercase">Shearwall Compiler</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light max-w-sm">
                    Automated Excel-based computation matrices for rapid shearwall and corewall design iterations. Reducing standard design loop latency by 40%.
                  </p>
                  <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                    <span className="border border-cyan-500/30 px-2 py-1">Excel VBA</span>
                    <span className="border border-cyan-500/30 px-2 py-1">Struct. Analysis</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-12 border border-cyan-900/50 bg-[#020617] p-8 relative flex flex-col md:flex-row justify-between items-center"
              >
                <div>
                  <div className="font-mono text-cyan-600 text-[10px] uppercase tracking-widest mb-2">Published Log [2025]</div>
                  <h3 className="text-xl font-bold text-white uppercase">Numerical Modeling of Cold-Formed Steel Section Performance in Fire</h3>
                  <p className="text-slate-400 mt-2 font-light text-sm max-w-3xl">Research detailing the thermodynamics and structural integrity algorithms of cold-formed steel exposed to extreme heat variables.</p>
                </div>
                <button className="mt-6 md:mt-0 whitespace-nowrap px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black bg-cyan-500 hover:bg-cyan-400 transition-colors">
                  Mount Document
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Module */}
        <footer id="contact" className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 border border-cyan-900/50 bg-[#020617] p-12 lg:p-16">
              <div>
                <div className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 animate-pulse"></div> 04 // Handshake Protocol
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 uppercase">Open Comm <br />Channel</h2>
                <p className="text-lg text-slate-400 mb-10 max-w-md font-light">
                  Ready to deploy high-velocity engineering automations or mandate massive structural blueprints?
                </p>
                <a href="mailto:cheahyueyeou@gmail.com" className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-cyan-500 text-cyan-400 px-8 py-4 font-mono text-sm uppercase tracking-wider font-bold hover:bg-cyan-500 hover:text-black transition-all">
                  <Mail className="w-4 h-4" />
                  Transmit Message
                </a>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <a href="#" className="flex items-center gap-4 p-4 border border-cyan-900/30 hover:border-cyan-500 hover:bg-cyan-950/20 transition-all font-mono group">
                  <div className="text-cyan-600 group-hover:text-cyan-400 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase tracking-wider text-sm">LinkedIn.sys</div>
                    <div className="text-[10px] text-cyan-600">PROFESSIONAL_INDEX</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-4 p-4 border border-cyan-900/30 hover:border-cyan-500 hover:bg-cyan-950/20 transition-all font-mono group">
                  <div className="text-cyan-600 group-hover:text-cyan-400 transition-colors">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase tracking-wider text-sm">GitHub.sys</div>
                    <div className="text-[10px] text-cyan-600">SOURCE_REPOSITORIES</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-between font-mono text-[10px] text-cyan-700 uppercase tracking-widest">
              <p>ALGO PIXEL EMPIRE © {new Date().getFullYear()} // JOSEPH CHEAH.</p>
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
