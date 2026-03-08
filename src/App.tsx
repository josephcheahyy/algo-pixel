import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
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

// Animated matrix background of tiny calculating nodes
const PixelGridBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#020617] z-[-1]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,204,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      {/* Floating pixel squares */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 bg-cyan-400/5 mix-blend-screen"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617]" />
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 relative overflow-hidden">
      <PixelGridBackground />

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
                <span>Freelance Engineering & Architecture</span>
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

            {/* Geometric Hero Decoration */}
            <motion.div
              style={{ y: yOffset }}
              className="absolute right-0 top-0 -z-10 hidden lg:block opacity-60"
            >
              <div className="w-[400px] h-[400px] border border-cyan-500/20 relative flex items-center justify-center">
                <div className="w-[300px] h-[300px] border border-cyan-500/40 rotate-45 transform transition-transform duration-[10000ms] ease-linear hover:rotate-90"></div>
                <div className="w-[200px] h-[200px] bg-cyan-500/5 absolute mix-blend-screen shadow-[0_0_50px_rgba(6,182,212,0.2)]"></div>
              </div>
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
                  title: "Structural Logic",
                  desc: "RC/PT Design, Eurocode/BS Standards. Designing and reviewing structures for high-rise mixed developments and LRT projects in Singapore and Taiwan."
                },
                {
                  icon: <Code2 className="w-6 h-6" />,
                  title: "Computational Automation",
                  desc: "Developing custom AutoLisp scripts for ETABS/AutoCAD integration and engineering Excel-based tools to accelerate design processes."
                },
                {
                  icon: <Cpu className="w-6 h-6" />,
                  title: "AI Workflow Automation",
                  desc: "Utilizing OpenAI GPT/Gemini alongside engineering software to streamline tasks, analyze data, and build intelligent solutions."
                },
                {
                  icon: <Droplets className="w-6 h-6" />,
                  title: "Water Supply Systems",
                  desc: "Water reticulation design and authority submissions (KM/PBA). Secured 10+ approvals within 6 months for complex projects."
                },
                {
                  icon: <LineChart className="w-6 h-6" />,
                  title: "Project Management",
                  desc: "Leading teams of 7+ juniors, managing multi-sector projects (residential, commercial, industrial), and coordinating authority submissions."
                },
                {
                  icon: <Layers className="w-6 h-6" />,
                  title: "Advanced Software",
                  desc: "Expertise in Revit (BIM), ETABS, SAP2000, AdaptPT, AutoCAD (Lisp), WordPress, and Adobe Creative Suite."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[#020617] p-8 border border-cyan-900/40 hover:border-cyan-400 group relative transition-colors duration-300"
                >
                  {/* Hover scanline effect */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                  <div className="text-cyan-600 mb-6 group-hover:text-cyan-400 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white uppercase tracking-tight">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm font-light">{item.desc}</p>
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
