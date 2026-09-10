export const portfolio = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Rivers // Staff Engineer & Creative Technologist</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Outfit', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            brand: {
              bg: '#080A10',
              card: '#0E111B',
              violet: '#7C3AED',
              cyan: '#06B6D4',
              emerald: '#10B981'
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #080A10; }
    ::-webkit-scrollbar-thumb { background: rgba(124, 58, 237, 0.35); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(124, 58, 237, 0.7); }

    .tactile-btn {
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
    .glass-card {
      background: rgba(14, 17, 27, 0.75);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.25s ease;
    }
    .glass-card:hover {
      border-color: rgba(124, 58, 237, 0.35);
      box-shadow: 0 10px 30px -10px rgba(124, 58, 237, 0.2);
    }
  </style>
</head>
<body class="bg-[#080A10] text-slate-300 font-sans selection:bg-violet-600/30 selection:text-violet-300 min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#080A10]/80 backdrop-blur-xl border-b border-white/10 h-[68px] flex items-center px-6">
    <div class="max-w-6xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="flex items-center gap-2.5 font-mono text-white font-bold text-base">
        <span class="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
          <i class="ph-bold ph-terminal text-sm"></i>
        </span>
        <span>alex_rivers<span class="text-violet-400">.dev</span></span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-xs font-mono text-slate-400">
        <a href="#about" class="hover:text-violet-400 transition-colors">About</a>
        <a href="#projects" class="hover:text-violet-400 transition-colors">Projects</a>
        <a href="#stack" class="hover:text-violet-400 transition-colors">Stack</a>
        <a href="#experience" class="hover:text-violet-400 transition-colors">Timeline</a>
      </nav>

      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>AVAILABLE FOR CONSULTING</span>
        </div>
        <a href="#contact" class="tactile-btn px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-600/30">
          Get in Touch
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="about" class="relative pt-16 pb-20 px-6 overflow-hidden">
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-600/15 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 flex flex-col items-start gap-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300">
          <i class="ph-fill ph-code text-violet-400"></i>
          <span>STAFF ENGINEER & ARCHITECT</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
          Designing <span class="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">resilient systems</span> & high-feel web products.
        </h1>

        <p class="text-slate-400 text-base sm:text-lg leading-relaxed max-w-[54ch]">
          I specialize in building distributed web architectures, AI user interfaces, and web performance optimization. Previously leading engineering at Vercel & Stripe ecosystems.
        </p>

        <div class="flex flex-wrap items-center gap-4 pt-2">
          <a href="#projects" class="tactile-btn px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl shadow-xl shadow-violet-600/30 flex items-center gap-2">
            <i class="ph-bold ph-folder-open text-lg"></i>
            <span>View Featured Projects</span>
          </a>
          <a href="https://github.com" target="_blank" class="tactile-btn px-6 py-3.5 text-sm font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white rounded-xl flex items-center gap-2">
            <i class="ph-bold ph-github-logo text-lg text-violet-400"></i>
            <span>GitHub (14.2k ★)</span>
          </a>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg mt-2 font-mono">
          <div>
            <div class="text-2xl font-bold text-white">10+ Yrs</div>
            <div class="text-xs text-slate-500 mt-0.5">Engineering Experience</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-cyan-400">14.2k ★</div>
            <div class="text-xs text-slate-500 mt-0.5">Open Source Stars</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-emerald-400">99.99%</div>
            <div class="text-xs text-slate-500 mt-0.5">System Reliability</div>
          </div>
        </div>
      </div>

      <!-- Right Card: Terminal Bio -->
      <div class="lg:col-span-5">
        <div class="glass-card p-6 rounded-2xl border border-violet-500/20 shadow-2xl">
          <div class="flex items-center justify-between pb-4 border-b border-white/10">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <span class="text-[11px] font-mono text-slate-400">alex_bio.json</span>
          </div>
          <div class="pt-4 font-mono text-xs text-slate-300 leading-relaxed flex flex-col gap-2">
            <div><span class="text-violet-400">"location"</span>: <span class="text-emerald-400">"San Francisco, CA"</span>,</div>
            <div><span class="text-violet-400">"role"</span>: <span class="text-emerald-400">"Staff Systems Engineer"</span>,</div>
            <div><span class="text-violet-400">"specialties"</span>: [</div>
            <div class="pl-4 text-cyan-400">"Distributed Systems",</div>
            <div class="pl-4 text-cyan-400">"React / Next.js Performance",</div>
            <div class="pl-4 text-cyan-400">"AI Agent Orchestration"</div>
            <div>],</div>
            <div><span class="text-violet-400">"status"</span>: <span class="text-emerald-400">"Active Consulting"</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Projects (Bento Grid) -->
  <section id="projects" class="py-24 px-6 bg-[#06080E] border-t border-white/5">
    <div class="max-w-6xl mx-auto flex flex-col gap-12">
      <div class="flex flex-col gap-3">
        <div class="text-xs font-mono text-violet-400 uppercase tracking-widest">SELECTED CASE STUDIES</div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Production software built to scale.</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Project 1 -->
        <div class="glass-card p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-4">
              <span class="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">OPEN SOURCE</span>
              <span class="text-xs font-mono text-slate-400"><i class="ph-bold ph-star text-amber-400"></i> 8.4k</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">HyperTrace Telemetry</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-6">
              Sub-millisecond distributed tracing SDK for Node.js & Edge runtimes with automatic anomaly detection.
            </p>
          </div>
          <div class="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
            <span class="text-slate-400">TypeScript · Rust · WebAssembly</span>
            <a href="#" class="text-violet-400 hover:text-white flex items-center gap-1 font-bold">View Repo <i class="ph-bold ph-arrow-up-right"></i></a>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="glass-card p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-4">
              <span class="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">ENTERPRISE PLATFORM</span>
              <span class="text-xs font-mono text-slate-400"><i class="ph-bold ph-star text-amber-400"></i> 5.8k</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Neural Workflow Engine</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-6">
              Deterministic AI agent orchestration framework with zero-data-retention security guardrails.
            </p>
          </div>
          <div class="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
            <span class="text-slate-400">Python · Next.js · PostgreSQL</span>
            <a href="#" class="text-violet-400 hover:text-white flex items-center gap-1 font-bold">Case Study <i class="ph-bold ph-arrow-up-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-24 px-6 relative overflow-hidden">
    <div class="max-w-4xl mx-auto glass-card rounded-3xl p-12 text-center relative border border-violet-500/30">
      <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">Let's build something remarkable.</h2>
      <p class="text-slate-400 text-base max-w-lg mx-auto mb-8">
        Available for architectural advisory, fractional CTO engagements, and full-stack AI engineering.
      </p>
      <a href="mailto:alex@rivers.dev" class="tactile-btn inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl shadow-xl shadow-violet-600/30">
        <i class="ph-bold ph-envelope"></i>
        <span>alex@rivers.dev</span>
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-white/10 bg-[#05070B] text-xs text-slate-400">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>© 2026 Alex Rivers. All rights reserved. Built with PageCraft AI.</div>
      <div class="flex items-center gap-6 font-mono">
        <a href="#" class="hover:text-white">GitHub</a>
        <a href="#" class="hover:text-white">Twitter / X</a>
        <a href="#" class="hover:text-white">LinkedIn</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
