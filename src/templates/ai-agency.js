export const aiAgency = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AETHER Studio // Next-Gen AI Design & Engineering</title>
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
              bg: '#08090E',
              card: '#0F111A',
              border: 'rgba(124, 58, 237, 0.18)',
              violet: '#7C3AED',
              cyan: '#06B6D4',
              emerald: '#10B981',
              muted: '#94A3B8'
            }
          }
        }
      }
    }
  </script>
  <style>
    /* Custom Sleek Dark Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #08090E; }
    ::-webkit-scrollbar-thumb { background: rgba(124, 58, 237, 0.35); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(124, 58, 237, 0.7); }

    .glow-violet {
      box-shadow: 0 0 50px -10px rgba(124, 58, 237, 0.35);
    }
    .glow-cyan {
      box-shadow: 0 0 50px -10px rgba(6, 182, 212, 0.35);
    }
    .tactile-btn {
      transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
    .glass-card {
      background: rgba(15, 17, 26, 0.75);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glass-card:hover {
      border-color: rgba(124, 58, 237, 0.4);
      box-shadow: 0 10px 30px -10px rgba(124, 58, 237, 0.2);
    }
  </style>
</head>
<body class="bg-[#08090E] text-slate-100 font-sans selection:bg-purple-600/30 selection:text-purple-300 min-h-screen flex flex-col justify-between">

  <!-- Floating Navigation (Max Height 68px) -->
  <header class="sticky top-0 z-50 bg-[#08090E]/80 backdrop-blur-xl border-b border-white/10 h-[68px] flex items-center px-6">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/25 group-hover:scale-105 transition-transform">
          <i class="ph-bold ph-cpu text-xl"></i>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
            AETHER <span class="text-xs font-mono px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">AI</span>
          </span>
        </div>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-xs font-mono font-medium text-slate-400">
        <a href="#features" class="hover:text-violet-400 transition-colors">Capabilities</a>
        <a href="#projects" class="hover:text-violet-400 transition-colors">Work</a>
        <a href="#metrics" class="hover:text-violet-400 transition-colors">Impact</a>
        <a href="#pricing" class="hover:text-violet-400 transition-colors">Pricing</a>
      </nav>

      <div class="flex items-center gap-4">
        <div class="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SYSTEMS ONLINE</span>
        </div>
        <a href="#contact" class="tactile-btn px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 flex items-center gap-2">
          <span>Start Project</span>
          <i class="ph-bold ph-arrow-right"></i>
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative pt-16 pb-20 px-6 overflow-hidden">
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute top-20 right-10 w-[400px] h-[300px] bg-cyan-500/15 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <!-- Left Column: Copy -->
      <div class="lg:col-span-7 flex flex-col items-start gap-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300">
          <i class="ph-fill ph-sparkle text-violet-400"></i>
          <span>NEXT-GEN AI DESIGN & DEVELOPMENT</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
          We build <span class="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">intelligent interfaces</span> that scale seamlessly.
        </h1>

        <p class="text-slate-400 text-base sm:text-lg leading-relaxed max-w-[54ch]">
          AETHER crafts bespoke AI products, autonomous agent workflows, and high-performance Web application platforms engineered for high-growth enterprises.
        </p>

        <div class="flex flex-wrap items-center gap-4 pt-2">
          <a href="#contact" class="tactile-btn px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 rounded-xl shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 flex items-center gap-2.5">
            <i class="ph-bold ph-lightning text-lg"></i>
            <span>Book Discovery Call</span>
          </a>
          <a href="#projects" class="tactile-btn px-6 py-3.5 text-sm font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white rounded-xl flex items-center gap-2">
            <i class="ph-bold ph-play-circle text-lg text-violet-400"></i>
            <span>Explore Work</span>
          </a>
        </div>

        <!-- Metric micro-strip -->
        <div class="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg mt-2">
          <div>
            <div class="text-2xl font-bold font-mono text-white">$42M+</div>
            <div class="text-xs text-slate-400 mt-0.5">Client Funding Raised</div>
          </div>
          <div>
            <div class="text-2xl font-bold font-mono text-cyan-400">99.99%</div>
            <div class="text-xs text-slate-400 mt-0.5">AI Inference Uptime</div>
          </div>
          <div>
            <div class="text-2xl font-bold font-mono text-violet-400">3.4x</div>
            <div class="text-xs text-slate-400 mt-0.5">Conversion Uplift</div>
          </div>
        </div>
      </div>

      <!-- Right Column: Interactive Code & Architecture Preview -->
      <div class="lg:col-span-5 relative">
        <div class="glass-card rounded-2xl p-6 shadow-2xl relative overflow-hidden border border-violet-500/20">
          <div class="flex items-center justify-between pb-4 border-b border-white/10">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <span class="text-[11px] font-mono text-slate-400">agent_orchestrator.ts</span>
          </div>

          <div class="pt-4 font-mono text-xs text-slate-300 leading-relaxed flex flex-col gap-2">
            <div class="text-violet-400"><span class="text-slate-500">// Initialize Neural Workflow</span></div>
            <div><span class="text-cyan-400">const</span> agent = <span class="text-violet-400">new</span> AgentCluster({ model: <span class="text-emerald-400">'aether-v4'</span> });</div>
            <div class="pl-4 text-slate-400">memory: <span class="text-amber-300">'vector-db-hydrated'</span>,</div>
            <div class="pl-4 text-slate-400">latency: <span class="text-cyan-400">'8.4ms'</span>,</div>
            <div class="pl-4 text-slate-400">status: <span class="text-emerald-400">'autonomous_active'</span></div>
            <div class="mt-2 text-emerald-400 flex items-center gap-2">
              <i class="ph-bold ph-check-circle"></i>
              <span>Compilation Successful (0 errors)</span>
            </div>
          </div>

          <!-- Interactive Floating Badge -->
          <div class="mt-6 p-4 rounded-xl bg-gradient-to-r from-violet-950/60 to-slate-900/80 border border-violet-500/30 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300">
                <i class="ph-bold ph-pulse text-base"></i>
              </div>
              <div>
                <div class="text-xs font-bold text-white">Live Benchmark</div>
                <div class="text-[10px] text-slate-400">Realtime Token Streaming</div>
              </div>
            </div>
            <span class="text-xs font-mono font-bold text-cyan-400">142 tok/s</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Client Logos Section -->
  <section class="py-12 border-y border-white/5 bg-[#0A0C14]">
    <div class="max-w-7xl mx-auto px-6">
      <p class="text-center text-xs font-mono uppercase tracking-widest text-slate-400 mb-8">
        TRUSTED BY FOUNDERS FROM INDUSTRY LEADING PLATFORMS
      </p>
      <div class="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all">
        <div class="flex items-center gap-2 text-slate-300 font-bold text-lg font-mono">
          <i class="ph-bold ph-triangle text-xl text-white"></i> Vercel
        </div>
        <div class="flex items-center gap-2 text-slate-300 font-bold text-lg font-mono">
          <i class="ph-bold ph-stripe-logo text-2xl text-violet-400"></i> Stripe
        </div>
        <div class="flex items-center gap-2 text-slate-300 font-bold text-lg font-mono">
          <i class="ph-bold ph-brain text-xl text-cyan-400"></i> OpenAI
        </div>
        <div class="flex items-center gap-2 text-slate-300 font-bold text-lg font-mono">
          <i class="ph-bold ph-git-branch text-xl text-emerald-400"></i> Linear
        </div>
        <div class="flex items-center gap-2 text-slate-300 font-bold text-lg font-mono">
          <i class="ph-bold ph-database text-xl text-amber-400"></i> Supabase
        </div>
        <div class="flex items-center gap-2 text-slate-300 font-bold text-lg font-mono">
          <i class="ph-bold ph-github-logo text-xl text-white"></i> GitHub
        </div>
      </div>
    </div>
  </section>

  <!-- Bento Features Grid Section -->
  <section id="features" class="py-24 px-6 relative">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="flex flex-col gap-4 max-w-2xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
          <i class="ph-bold ph-squares-four"></i>
          <span>CORE CAPABILITIES</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineered for maximum velocity & impact.
        </h2>
      </div>

      <!-- Bento Grid (3 Rows) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Large Tile (Span 2) -->
        <div class="md:col-span-2 glass-card p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
          <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-violet-600/20 blur-[90px] rounded-full pointer-events-none"></div>
          <div>
            <div class="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-6 text-2xl">
              <i class="ph-bold ph-robot"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Autonomous AI Agent Workflows</h3>
            <p class="text-slate-400 text-sm leading-relaxed max-w-xl">
              Custom multi-agent architectures that automate complex operational pipelines, customer interaction loops, and automated code transformations with deterministic fallback safety.
            </p>
          </div>
          <div class="mt-8 p-4 rounded-xl bg-[#06080E] border border-white/10 flex items-center justify-between text-xs font-mono">
            <span class="text-slate-400">Agent Cluster Health</span>
            <span class="text-emerald-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span> 100% Operational
            </span>
          </div>
        </div>

        <!-- Single Tile -->
        <div class="glass-card p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div>
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 text-2xl">
              <i class="ph-bold ph-gauge"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Sub-12ms Inference</h3>
            <p class="text-slate-400 text-sm leading-relaxed">
              Global edge deployment ensures low-latency AI responses with smart caching and vector index optimization.
            </p>
          </div>
          <div class="mt-8 text-3xl font-bold font-mono text-cyan-400">8.4ms</div>
        </div>

        <!-- Single Tile -->
        <div class="glass-card p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 text-2xl">
              <i class="ph-bold ph-paint-brush"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Neural Design Systems</h3>
            <p class="text-slate-400 text-sm leading-relaxed">
              Component libraries with dynamic theme tokens, accessibility standards (WCAG AA), and tactile micro-animations.
            </p>
          </div>
          <div class="mt-8 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <i class="ph-bold ph-check"></i> WCAG AA Compliant
          </div>
        </div>

        <!-- Large Tile (Span 2) -->
        <div class="md:col-span-2 glass-card p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-6 text-2xl">
              <i class="ph-bold ph-shield-check"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Zero-Data-Retention Security</h3>
            <p class="text-slate-400 text-sm leading-relaxed max-w-xl">
              SOC-2 compliant data boundaries ensuring your proprietary data and customer prompts are never stored or used to train public models.
            </p>
          </div>
          <div class="mt-8 flex items-center gap-6 text-xs font-mono text-slate-400">
            <span class="flex items-center gap-1.5 text-slate-200"><i class="ph-bold ph-lock text-violet-400"></i> AES-256</span>
            <span class="flex items-center gap-1.5 text-slate-200"><i class="ph-bold ph-shield text-violet-400"></i> SOC-2 Type II</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Pricing Tiers Section -->
  <section id="pricing" class="py-24 px-6 bg-[#0A0C14] border-t border-white/5">
    <div class="max-w-7xl mx-auto flex flex-col gap-16">
      <div class="text-center flex flex-col items-center gap-4 max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest">
          <i class="ph-bold ph-currency-dollar"></i>
          <span>TRANSPARENT ENGAGEMENT</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Flexible tiers for ambitious teams.
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Tier 1 -->
        <div class="glass-card p-8 rounded-2xl flex flex-col justify-between border border-white/10">
          <div>
            <div class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Prototype MVP</div>
            <div class="text-4xl font-extrabold font-mono text-white mb-4">$8,500 <span class="text-xs font-sans text-slate-400 font-normal">/ project</span></div>
            <p class="text-slate-400 text-xs leading-relaxed mb-6">Ideal for validating AI product concepts & delivering a working MVP slice in 2 weeks.</p>
            <ul class="flex flex-col gap-3 text-xs text-slate-300">
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Bespoke UI/UX Prototype</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> LLM API Integration</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Vercel Edge Deployment</li>
            </ul>
          </div>
          <button class="tactile-btn mt-8 w-full py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl">Get Started</button>
        </div>

        <!-- Tier 2 (Featured) -->
        <div class="glass-card p-8 rounded-2xl flex flex-col justify-between border-2 border-violet-500 relative glow-violet">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-600 text-white font-mono text-[10px] font-bold uppercase rounded-full tracking-wider">
            MOST POPULAR
          </div>
          <div>
            <div class="text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">Scale Studio</div>
            <div class="text-4xl font-extrabold font-mono text-white mb-4">$18,500 <span class="text-xs font-sans text-slate-400 font-normal">/ month</span></div>
            <p class="text-slate-400 text-xs leading-relaxed mb-6">Dedicated AI design & engineering squad embedded directly with your product team.</p>
            <ul class="flex flex-col gap-3 text-xs text-slate-300">
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Dedicated Designer & AI Dev</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Multi-Agent Orchestration</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Custom Vector Indexing</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Daily Slack Sync & Commits</li>
            </ul>
          </div>
          <button class="tactile-btn mt-8 w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-600/30">Start Monthly Sprint</button>
        </div>

        <!-- Tier 3 -->
        <div class="glass-card p-8 rounded-2xl flex flex-col justify-between border border-white/10">
          <div>
            <div class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Enterprise Custom</div>
            <div class="text-4xl font-extrabold font-mono text-white mb-4">Custom</div>
            <p class="text-slate-400 text-xs leading-relaxed mb-6">Complete digital transformation, custom model fine-tuning, & SOC-2 compliance.</p>
            <ul class="flex flex-col gap-3 text-xs text-slate-300">
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Custom Model Fine-Tuning</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> On-Prem / Private Cloud</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> 24/7 SLA & Dedicated Engineer</li>
            </ul>
          </div>
          <button class="tactile-btn mt-8 w-full py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl">Contact Sales</button>
        </div>

      </div>
    </div>
  </section>

  <!-- CTA Banner Section -->
  <section id="contact" class="py-24 px-6 relative overflow-hidden">
    <div class="max-w-5xl mx-auto glass-card rounded-3xl p-12 text-center relative overflow-hidden border border-violet-500/30">
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col items-center gap-6">
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Ready to build your next AI breakthrough?
        </h2>
        <p class="text-slate-300 text-base max-w-xl">
          Let’s discuss your vision. Our team can ship your initial working prototype in under 14 days.
        </p>
        <a href="mailto:hello@aether.ai" class="tactile-btn mt-4 px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 rounded-xl shadow-2xl shadow-violet-600/40 flex items-center gap-2">
          <i class="ph-bold ph-envelope"></i>
          <span>Schedule Strategy Call</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-white/10 bg-[#06070B] text-xs text-slate-400">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-3">
        <div class="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold">
          <i class="ph-bold ph-cpu text-sm"></i>
        </div>
        <span class="font-bold text-white text-sm">AETHER Studio</span>
      </div>
      <div>
        © 2026 AETHER AI Studio Inc. Built with PageCraft AI. All rights reserved.
      </div>
      <div class="flex items-center gap-6">
        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-white transition-colors">Twitter / X</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
