export const chatbot = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEXUS AI // Enterprise Neural Agent Portal</title>
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
            bot: {
              bg: '#05060C',
              card: '#0C0E1A',
              purple: '#8B5CF6',
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
    ::-webkit-scrollbar-track { background: #05060C; }
    ::-webkit-scrollbar-thumb { background: rgba(139, 92, 246, 0.35); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(139, 92, 246, 0.7); }

    .tactile-btn {
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
    .glass-card {
      background: rgba(12, 14, 26, 0.75);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.25s ease;
    }
    .glass-card:hover {
      border-color: rgba(139, 92, 246, 0.4);
      box-shadow: 0 10px 30px -10px rgba(139, 92, 246, 0.2);
    }
  </style>
</head>
<body class="bg-[#05060C] text-slate-100 font-sans selection:bg-purple-600/30 selection:text-purple-300 min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#05060C]/80 backdrop-blur-xl border-b border-white/10 h-[68px] flex items-center px-6">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
          <i class="ph-bold ph-cpu text-xl"></i>
        </div>
        <span class="font-bold text-lg tracking-tight text-white font-mono flex items-center gap-2">
          NEXUS <span class="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded">AI</span>
        </span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-xs font-mono font-medium text-slate-400">
        <a href="#simulator" class="hover:text-purple-400 transition-colors">Simulator</a>
        <a href="#models" class="hover:text-purple-400 transition-colors">Models</a>
        <a href="#integrations" class="hover:text-purple-400 transition-colors">Integrations</a>
        <a href="#security" class="hover:text-purple-400 transition-colors">Enterprise</a>
      </nav>

      <div class="flex items-center gap-4">
        <a href="#simulator" class="tactile-btn px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl shadow-lg shadow-purple-600/30">
          Try Sandbox
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section with Interactive Chat Simulator -->
  <section id="simulator" class="relative pt-16 pb-20 px-6 overflow-hidden">
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-6 flex flex-col items-start gap-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
          <i class="ph-fill ph-sparkle text-purple-400"></i>
          <span>ENTERPRISE LLM ORCHESTRATION</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
          Autonomous AI agents for <span class="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">customer & code tasks</span>.
        </h1>

        <p class="text-slate-400 text-base sm:text-lg leading-relaxed max-w-[50ch]">
          Deploy domain-tuned neural agents into your workspace with real-time vector retrieval, SOC-2 compliance, and instant Slack/Web SDKs.
        </p>

        <div class="flex flex-wrap items-center gap-4 pt-2">
          <button class="tactile-btn px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl shadow-xl shadow-purple-600/30 flex items-center gap-2">
            <i class="ph-bold ph-play-circle text-lg"></i>
            <span>Start Free Sandbox</span>
          </button>
        </div>
      </div>

      <!-- Right Column: Interactive Chat Interface -->
      <div class="lg:col-span-6">
        <div class="glass-card p-6 rounded-2xl border border-purple-500/20 shadow-2xl flex flex-col gap-4">
          <div class="flex items-center justify-between pb-3 border-b border-white/10">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-xs font-mono text-white font-bold">NEXUS_AGENT_v4</span>
            </div>
            <span class="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">RAG Active</span>
          </div>

          <div class="flex flex-col gap-3 py-2 text-xs font-sans">
            <div class="self-start max-w-[85%] bg-white/5 border border-white/10 rounded-xl p-3 text-slate-300">
              Hello! How can I assist your engineering team today?
            </div>
            <div class="self-end max-w-[85%] bg-purple-600/30 border border-purple-500/40 rounded-xl p-3 text-white">
              Can you analyze the P99 latency anomaly in cluster-us-east?
            </div>
            <div class="self-start max-w-[85%] bg-white/5 border border-white/10 rounded-xl p-3 text-slate-300 flex flex-col gap-2">
              <div class="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
                <i class="ph-bold ph-check-circle"></i> Analyzed 14,200 trace spans in 8.2ms
              </div>
              <p>Found 1 anomaly: Redis connection pool exhaustion on worker node 04. Recommending auto-scaling pool to 128 connections.</p>
            </div>
          </div>

          <div class="pt-2 border-t border-white/10 flex items-center gap-2">
            <input type="text" placeholder="Type prompt or command..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500">
            <button class="tactile-btn p-2.5 bg-purple-600 text-white rounded-xl">
              <i class="ph-bold ph-paper-plane-right text-base"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-white/10 bg-[#030408] text-xs text-slate-400">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>© 2026 NEXUS AI Inc. Built with PageCraft AI. All rights reserved.</div>
      <div class="flex gap-6 font-mono text-xs">
        <a href="#" class="hover:text-white">API Docs</a>
        <a href="#" class="hover:text-white">Status</a>
        <a href="#" class="hover:text-white">Privacy</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
