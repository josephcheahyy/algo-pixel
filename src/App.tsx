import { motion } from 'motion/react';
import { 
  Building2, 
  Cpu, 
  LineChart, 
  Droplets, 
  Code2, 
  FileSpreadsheet, 
  BookOpen,
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  Terminal,
  Database,
  Layers
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 font-sans selection:bg-cyan-500/30 relative overflow-hidden">
      {/* Futuristic Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Ambient Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/30 rounded flex items-center justify-center">
              <span className="font-mono font-bold text-cyan-400 text-sm">JC</span>
            </div>
            <span className="font-mono text-xs tracking-widest text-zinc-500 hidden sm:block">SYS.ENG_</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-mono tracking-widest text-zinc-400 uppercase">
            <a href="#about" className="hover:text-cyan-400 transition-colors">01. About</a>
            <a href="#expertise" className="hover:text-cyan-400 transition-colors">02. Expertise</a>
            <a href="#products" className="hover:text-cyan-400 transition-colors">03. Analysis & 3D Modelling</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">04. Contact</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 md:pt-48 pb-20 px-6 flex flex-col">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                System Online / Available
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.1]">
                Engineering Design<br />
                <span className="text-cyan-400">
                  Digitally Transformed.
                </span>
              </h1>
              <p className="text-base md:text-lg text-zinc-400 mb-8 leading-relaxed max-w-2xl font-light">
                I specialize in delivering <strong className="text-white font-medium">full sets of residential RC design reports and comprehensive 3D models</strong>. Get optimized structural analysis and detailed calculation reports tailored to your project needs.
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-sm">
                <a href="https://www.upwork.com/services/product/design-a-full-set-of-residential-rc-design-report-and-3d-model-2029193254216635191?ref=project_share&tier=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-cyan-500 text-black px-6 py-3 rounded-sm font-semibold hover:bg-cyan-400 transition-colors">
                  Hire me on Upwork
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#products" className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-sm hover:bg-white/10 transition-colors">
                  View Portfolio
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Philosophy & Stats */}
        <section id="about" className="py-32 px-6 border-y border-white/5 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4">01 // Framework</div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">Data-to-Solution Protocol</h2>
                <p className="text-zinc-400 leading-relaxed mb-6 font-light text-lg">
                  My philosophy is simple: integrate robust engineering design with digital tools and data-driven decision-making to drive project efficiency.
                </p>
                <p className="text-zinc-400 leading-relaxed mb-12 font-light text-lg">
                  With over 4 years of experience in high-rise design and water supply systems, I've led teams and managed multi-sector projects. My focus lies at the intersection of Structural Engineering, Computational Design, and AI Automation.
                </p>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                  <div className="border-l border-cyan-500/30 pl-4">
                    <div className="text-4xl font-bold text-white mb-2 font-mono">80<span className="text-cyan-500">%</span></div>
                    <div className="text-sm text-zinc-500 font-mono uppercase tracking-wider">Faster ETABS Modeling</div>
                  </div>
                  <div className="border-l border-cyan-500/30 pl-4">
                    <div className="text-4xl font-bold text-white mb-2 font-mono">40<span className="text-cyan-500">%</span></div>
                    <div className="text-sm text-zinc-500 font-mono uppercase tracking-wider">Faster Shearwall Design</div>
                  </div>
                  <div className="border-l border-cyan-500/30 pl-4">
                    <div className="text-4xl font-bold text-white mb-2 font-mono">10<span className="text-cyan-500">+</span></div>
                    <div className="text-sm text-zinc-500 font-mono uppercase tracking-wider">Water Supply Approvals</div>
                  </div>
                  <div className="border-l border-cyan-500/30 pl-4">
                    <div className="text-4xl font-bold text-white mb-2 font-mono">1<span className="text-cyan-500">st</span></div>
                    <div className="text-sm text-zinc-500 font-mono uppercase tracking-wider">Class Honors Civil Eng.</div>
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
                <div className="aspect-square rounded-lg bg-zinc-900 overflow-hidden relative border border-white/10">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                  <img 
                    src="https://picsum.photos/seed/cyberpunk/800/800" 
                    alt="Engineering Workspace" 
                    className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent mix-blend-overlay" />
                  
                  {/* Tech overlay elements */}
                  <div className="absolute top-4 right-4 font-mono text-[10px] text-cyan-500/50 text-right">
                    <div>SYS.COORD: 3.14159</div>
                    <div>STATUS: OPTIMAL</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section id="expertise" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <div className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4">02 // Capabilities</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Core Expertise</h2>
              <p className="text-zinc-400 max-w-2xl font-light text-lg">Bridging the gap between traditional civil engineering and modern computational workflows.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Building2 className="w-5 h-5" />,
                  title: "Structural Logic & Design",
                  desc: "RC/PT Design, Eurocode/BS Standards. Designing and reviewing structures for high-rise mixed developments and LRT projects in Singapore and Taiwan."
                },
                {
                  icon: <Code2 className="w-5 h-5" />,
                  title: "Computational Automation",
                  desc: "Developing custom AutoLisp scripts for ETABS/AutoCAD integration and engineering Excel-based tools to accelerate design processes."
                },
                {
                  icon: <Cpu className="w-5 h-5" />,
                  title: "AI Workflow Automation",
                  desc: "Utilizing OpenAI GPT/Gemini alongside engineering software to streamline tasks, analyze data, and build intelligent solutions."
                },
                {
                  icon: <Droplets className="w-5 h-5" />,
                  title: "Water Supply Systems",
                  desc: "Water reticulation design and authority submissions (KM/PBA). Secured 10+ approvals within 6 months for complex projects."
                },
                {
                  icon: <LineChart className="w-5 h-5" />,
                  title: "Project Management",
                  desc: "Leading teams of 7+ juniors, managing multi-sector projects (residential, commercial, industrial), and coordinating authority submissions."
                },
                {
                  icon: <Layers className="w-5 h-5" />,
                  title: "Advanced Software",
                  desc: "Expertise in Revit (BIM), ETABS, SAP2000, AdaptPT, AutoCAD (Lisp), WordPress, and Adobe Creative Suite."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/[0.02] p-8 rounded-lg border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-500" />
                  
                  <div className="w-10 h-10 rounded bg-black border border-white/10 flex items-center justify-center text-zinc-400 mb-6 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products & Projects */}
        <section id="products" className="py-32 px-6 border-y border-white/5 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <div className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4">03 // Deployments</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Structural Analysis & 3D Modelling</h2>
              <p className="text-zinc-400 max-w-2xl font-light text-lg">Tools, scripts, and models I've built to solve complex engineering problems.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* Featured Product */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-12 bg-white/[0.02] border border-white/10 rounded-lg p-8 md:p-12 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-cyan-500/20 transition-colors duration-700 pointer-events-none" />
                
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-6">
                      Featured System
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-4">NestWiseAi</h3>
                    <p className="text-zinc-400 mb-8 leading-relaxed font-light text-lg">
                      A GPT-driven financial assistance model utilizing OpenAI functions. As the project leader, I'm developing this tool to provide intelligent, automated financial insights and assistance.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {['OpenAI GPT Integration', 'Function Calling', 'Financial Modeling', 'AI Workflow Automation'].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-zinc-300 font-mono">
                          <div className="w-1 h-1 bg-cyan-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <button className="font-mono text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors">
                      [ View Documentation ] <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="aspect-video rounded bg-[#050505] border border-white/10 overflow-hidden relative p-1">
                    <div className="w-full h-full border border-white/5 rounded-sm overflow-hidden relative">
                      <img 
                        src="https://picsum.photos/seed/ai-interface/800/450" 
                        alt="AI Interface" 
                        className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                      {/* Terminal-like overlay */}
                      <div className="absolute top-0 left-0 w-full p-3 font-mono text-[10px] text-cyan-500/70 flex justify-between border-b border-white/5 bg-black/50 backdrop-blur-md">
                        <span>terminal@nestwise:~</span>
                        <span>v1.0.4-beta</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Other Products */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-6 bg-white/[0.02] border border-white/10 rounded-lg p-8 hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-10 h-10 rounded bg-black border border-white/10 flex items-center justify-center text-zinc-400 mb-6">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AutoLisp ETABS/AutoCAD Scripts</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-light">
                  Custom computational scripts designed to bridge the gap between ETABS analysis and AutoCAD drafting. Proven to increase modeling speed by 80%.
                </p>
                <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider">
                  <span className="px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-zinc-300">AutoLisp</span>
                  <span className="px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-zinc-300">ETABS</span>
                  <span className="px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-zinc-300">AutoCAD</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-6 bg-white/[0.02] border border-white/10 rounded-lg p-8 hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-10 h-10 rounded bg-black border border-white/10 flex items-center justify-center text-zinc-400 mb-6">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Automated Design Tools</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-light">
                  Engineered Excel-based tools specifically for shearwall and corewall design, accelerating the structural design process by 40%.
                </p>
                <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider">
                  <span className="px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-zinc-300">Excel VBA</span>
                  <span className="px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-zinc-300">Structural Design</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-12 bg-white/[0.02] border border-white/10 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500" />
                <div>
                  <div className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase mb-3">
                    Published Research (2025)
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Numerical Modeling of Cold-Formed Steel Section Performance in Fire</h3>
                  <p className="text-zinc-400 text-sm max-w-3xl font-light">
                    Advanced research focusing on the structural integrity and performance of cold-formed steel under extreme thermal conditions using numerical modeling techniques.
                  </p>
                </div>
                <button className="shrink-0 font-mono text-sm px-6 py-3 rounded-sm bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                  [ Read Abstract ]
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact / Footer */}
        <footer id="contact" className="pt-32 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 mb-24">
              <div>
                <div className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4">04 // Connect</div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Ready to transform your workflow?</h2>
                <p className="text-lg text-zinc-400 mb-10 max-w-md font-light">
                  Whether you need structural design, custom automation tools, or AI integration, I'm available for freelance projects.
                </p>
                <a href="mailto:cheahyueyeou@gmail.com" className="inline-flex items-center justify-center gap-3 bg-cyan-500 text-black px-8 py-4 rounded-sm font-semibold hover:bg-cyan-400 transition-colors font-mono text-sm uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  Initialize Comm Link
                </a>
              </div>
              
              <div className="bg-white/[0.02] p-8 rounded-lg border border-white/10">
                <h3 className="font-mono text-sm text-zinc-500 uppercase tracking-widest mb-6">Network Nodes</h3>
                <div className="space-y-4">
                  <a href="#" className="flex items-center gap-4 p-4 rounded bg-black/50 border border-white/5 hover:border-cyan-500/50 transition-all group">
                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-white">LinkedIn</div>
                      <div className="text-xs font-mono text-zinc-500 mt-1">Professional Network</div>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-4 p-4 rounded bg-black/50 border border-white/5 hover:border-cyan-500/50 transition-all group">
                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-white">GitHub</div>
                      <div className="text-xs font-mono text-zinc-500 mt-1">Code & Repositories</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs font-mono text-zinc-600 uppercase tracking-widest">
              <p>© {new Date().getFullYear()} Joseph Cheah. All rights reserved.</p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <span>Civil Eng.</span>
                <span className="text-cyan-500">/</span>
                <span>Project Mgr.</span>
                <span className="text-cyan-500">/</span>
                <span>Automation Spec.</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

