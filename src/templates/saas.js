export const saas = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SYNAPSE // Real-Time AI Telemetry & Observability</title>
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
              bg: '#05070D',
              card: '#0D101C',
              indigo: '#6366F1',
              emerald: '#10B981',
              cyan: '#06B6D4'
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #05070D; }
    ::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.35); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.7); }

    .tactile-btn {
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
    .glass-card {
      background: rgba(13, 16, 28, 0.75);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.25s ease;
    }
    .glass-card:hover {
      border-color: rgba(99, 102, 241, 0.35);
      box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.2);
    }
  </style>
</head>
<body class="bg-[#05070D] text-slate-100 font-sans selection:bg-indigo-600/30 selection:text-indigo-300 min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#05070D]/80 backdrop-blur-xl border-b border-white/10 h-[68px] flex items-center px-6">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
          <i class="ph-bold ph-pulse text-xl"></i>
        </div>
        <span class="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
          SYNAPSE <span class="text-xs font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">v2.4</span>
        </span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-xs font-mono font-medium text-slate-400">
        <a href="#features" class="hover:text-indigo-400 transition-colors">Features</a>
        <a href="#metrics" class="hover:text-indigo-400 transition-colors">Benchmarks</a>
        <a href="#pricing" class="hover:text-indigo-400 transition-colors">Pricing</a>
        <a href="#docs" class="hover:text-indigo-400 transition-colors">Docs</a>
      </nav>

      <div class="flex items-center gap-4">
        <a href="#pricing" class="tactile-btn px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center gap-2">
          <span>Start Free Trial</span>
          <i class="ph-bold ph-arrow-right"></i>
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative pt-16 pb-20 px-6 overflow-hidden">
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>SYNAPSE AI OBSERVABILITY // NOW LIVE</span>
      </div>

      <h1 class="text-4xl sm:text-7xl font-extrabold tracking-tight leading-[1.05] text-white max-w-4xl">
        Real-time telemetry for <span class="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">high-scale infrastructure</span>.
      </h1>

      <p class="text-slate-400 text-base sm:text-lg leading-relaxed max-w-[54ch]">
        Monitor microservices, LLM inference pipelines, and distributed databases with sub-millisecond tracing and autonomous AI incident detection.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
        <a href="#pricing" class="tactile-btn px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center gap-2">
          <i class="ph-bold ph-terminal text-lg"></i>
          <span>Deploy in 5 Minutes</span>
        </a>
        <a href="#demo" class="tactile-btn px-7 py-3.5 text-sm font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white rounded-xl flex items-center gap-2">
          <i class="ph-bold ph-play-circle text-lg text-indigo-400"></i>
          <span>Live Interactive Demo</span>
        </a>
      </div>

      <!-- Live Dashboard Graphic -->
      <div class="w-full max-w-5xl mt-6 glass-card rounded-2xl p-6 shadow-2xl border border-indigo-500/20 text-left">
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            <span class="text-xs font-mono text-slate-400 ml-2">cluster-us-east-1.synapse.internal</span>
          </div>
          <div class="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <i class="ph-bold ph-activity"></i> 142k req/s
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
          <div class="p-4 rounded-xl bg-white/5 border border-white/5">
            <div class="text-xs text-slate-400 font-mono">P99 Latency</div>
            <div class="text-2xl font-bold font-mono text-emerald-400 mt-1">1.24 ms</div>
            <div class="text-[10px] text-slate-500 mt-1">↓ 14% vs baseline</div>
          </div>
          <div class="p-4 rounded-xl bg-white/5 border border-white/5">
            <div class="text-xs text-slate-400 font-mono">Error Rate</div>
            <div class="text-2xl font-bold font-mono text-indigo-400 mt-1">0.001%</div>
            <div class="text-[10px] text-slate-500 mt-1">Optimal health</div>
          </div>
          <div class="p-4 rounded-xl bg-white/5 border border-white/5">
            <div class="text-xs text-slate-400 font-mono">Active Nodes</div>
            <div class="text-2xl font-bold font-mono text-cyan-400 mt-1">1,482</div>
            <div class="text-[10px] text-slate-500 mt-1">Auto-scaled</div>
          </div>
          <div class="p-4 rounded-xl bg-white/5 border border-white/5">
            <div class="text-xs text-slate-400 font-mono">Anomaly Score</div>
            <div class="text-2xl font-bold font-mono text-emerald-400 mt-1">0.02 (Low)</div>
            <div class="text-[10px] text-slate-500 mt-1">AI Guardrail Active</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Logo Wall -->
  <section class="py-12 border-y border-white/5 bg-[#080B14]">
    <div class="max-w-7xl mx-auto px-6 text-center">
      <p class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-8">POWERING TELEMETRY FOR LEADING PLATFORMS</p>
      <div class="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-70 font-mono font-bold text-slate-300">
        <div><i class="ph-bold ph-triangle text-xl"></i> Vercel</div>
        <div><i class="ph-bold ph-stripe-logo text-2xl text-indigo-400"></i> Stripe</div>
        <div><i class="ph-bold ph-database text-xl text-cyan-400"></i> Supabase</div>
        <div><i class="ph-bold ph-cloud text-xl text-amber-400"></i> Cloudflare</div>
        <div><i class="ph-bold ph-git-branch text-xl text-emerald-400"></i> Linear</div>
        <div><i class="ph-bold ph-chart-line-up text-xl text-rose-400"></i> Datadog</div>
      </div>
    </div>
  </section>

  <!-- Bento Features Section -->
  <section id="features" class="py-24 px-6">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="max-w-xl flex flex-col gap-4">
        <div class="text-xs font-mono text-indigo-400 uppercase tracking-widest">OBSERVABILITY ARCHITECTURE</div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Built for zero-latency introspection.</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 glass-card p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl mb-6">
              <i class="ph-bold ph-lightning"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Sub-Millisecond Distributed Tracing</h3>
            <p class="text-slate-400 text-sm leading-relaxed max-w-lg">
              Trace request lifecycles across thousands of microservices without imposing runtime overhead or latency penalties.
            </p>
          </div>
          <div class="mt-8 text-xs font-mono text-indigo-400 flex items-center gap-2">
            <i class="ph-bold ph-check-circle"></i> OpenTelemetry Native Support
          </div>
        </div>

        <div class="glass-card p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl mb-6">
              <i class="ph-bold ph-robot"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Autonomous AI Root-Cause</h3>
            <p class="text-slate-400 text-sm leading-relaxed">
              Instantly pinpoint failing lines of code during production incidents with automated LLM reasoning.
            </p>
          </div>
          <div class="mt-8 text-2xl font-bold font-mono text-emerald-400">99.4% Acc</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-24 px-6 bg-[#080B14] border-t border-white/5">
    <div class="max-w-7xl mx-auto flex flex-col gap-16">
      <div class="text-center max-w-xl mx-auto flex flex-col gap-4">
        <div class="text-xs font-mono text-indigo-400 uppercase tracking-widest">TRANSPARENT PRICING</div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Scale without limits.</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="glass-card p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div class="text-xs font-mono text-slate-400 uppercase mb-2">Developer</div>
            <div class="text-4xl font-extrabold font-mono text-white mb-4">$29 <span class="text-xs font-sans text-slate-400">/ mo</span></div>
            <p class="text-slate-400 text-xs leading-relaxed mb-6">Ideal for side projects & indie developers.</p>
            <ul class="flex flex-col gap-3 text-xs text-slate-300">
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Up to 10M events/mo</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> 7-day data retention</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Community Slack Support</li>
            </ul>
          </div>
          <button class="tactile-btn mt-8 w-full py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl">Start Free Trial</button>
        </div>

        <div class="glass-card p-8 rounded-2xl flex flex-col justify-between border-2 border-indigo-500">
          <div>
            <div class="text-xs font-mono text-indigo-400 uppercase mb-2">Growth Scale</div>
            <div class="text-4xl font-extrabold font-mono text-white mb-4">$149 <span class="text-xs font-sans text-slate-400">/ mo</span></div>
            <p class="text-slate-400 text-xs leading-relaxed mb-6">Perfect for high-growth engineering teams.</p>
            <ul class="flex flex-col gap-3 text-xs text-slate-300">
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Up to 100M events/mo</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> 90-day data retention</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Autonomous AI Root-Cause</li>
            </ul>
          </div>
          <button class="tactile-btn mt-8 w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl shadow-lg shadow-indigo-600/30">Start 14-Day Trial</button>
        </div>

        <div class="glass-card p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div class="text-xs font-mono text-slate-400 uppercase mb-2">Enterprise</div>
            <div class="text-4xl font-extrabold font-mono text-white mb-4">Custom</div>
            <p class="text-slate-400 text-xs leading-relaxed mb-6">For mission-critical global infrastructure.</p>
            <ul class="flex flex-col gap-3 text-xs text-slate-300">
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> Unlimited event ingestion</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> On-Prem / Private VPC</li>
              <li class="flex items-center gap-2"><i class="ph-bold ph-check text-emerald-400"></i> 24/7 SLA Dedicated Support</li>
            </ul>
          </div>
          <button class="tactile-btn mt-8 w-full py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl">Contact Sales</button>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-white/10 bg-[#030509] text-xs text-slate-400">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-3">
        <div class="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
          <i class="ph-bold ph-pulse text-sm"></i>
        </div>
        <span class="font-bold text-white text-sm">SYNAPSE Inc.</span>
      </div>
      <div>© 2026 SYNAPSE Inc. All rights reserved. Built with PageCraft AI.</div>
      <div class="flex items-center gap-6">
        <a href="#" class="hover:text-white transition-colors">Privacy</a>
        <a href="#" class="hover:text-white transition-colors">Terms</a>
        <a href="#" class="hover:text-white transition-colors">Security</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
