export const crypto = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VALENCE // Self-Custodial Web3 Wallet & DEX</title>
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
            web3: {
              bg: '#04060A',
              card: '#0A0E17',
              cyan: '#06B6D4',
              emerald: '#10B981',
              violet: '#8B5CF6'
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #04060A; }
    ::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.35); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(6, 182, 212, 0.7); }

    .tactile-btn {
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
    .glass-card {
      background: rgba(10, 14, 23, 0.75);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.25s ease;
    }
    .glass-card:hover {
      border-color: rgba(6, 182, 212, 0.4);
      box-shadow: 0 10px 30px -10px rgba(6, 182, 212, 0.2);
    }
  </style>
</head>
<body class="bg-[#04060A] text-slate-100 font-sans selection:bg-cyan-600/30 selection:text-cyan-300 min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#04060A]/80 backdrop-blur-xl border-b border-white/10 h-[68px] flex items-center px-6">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
          <i class="ph-bold ph-shield-check text-xl"></i>
        </div>
        <span class="font-bold text-lg tracking-tight text-white font-mono flex items-center gap-2">
          VALENCE <span class="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.5 rounded">DEX</span>
        </span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-xs font-mono font-medium text-slate-400">
        <a href="#swap" class="hover:text-cyan-400 transition-colors">Swap</a>
        <a href="#bridge" class="hover:text-cyan-400 transition-colors">Bridge</a>
        <a href="#security" class="hover:text-cyan-400 transition-colors">Security</a>
        <a href="#stats" class="hover:text-cyan-400 transition-colors">Analytics</a>
      </nav>

      <div class="flex items-center gap-4">
        <button class="tactile-btn px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl shadow-lg shadow-cyan-600/30 flex items-center gap-2">
          <i class="ph-bold ph-wallet"></i>
          <span>Connect Wallet</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative pt-16 pb-20 px-6 overflow-hidden">
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/15 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 flex flex-col items-start gap-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <i class="ph-fill ph-lock-key text-cyan-400"></i>
          <span>SELF-CUSTODIAL // ZERO COUNTERPARTY RISK</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
          Swap, bridge & earn across <span class="bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">24 EVM chains</span> instantly.
        </h1>

        <p class="text-slate-400 text-base sm:text-lg leading-relaxed max-w-[52ch]">
          Non-custodial smart wallet powered by Account Abstraction (ERC-4337), gasless transactions, and MEV-protected routing.
        </p>

        <div class="flex flex-wrap items-center gap-4 pt-2">
          <a href="#swap" class="tactile-btn px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl shadow-xl shadow-cyan-600/30 flex items-center gap-2">
            <i class="ph-bold ph-arrows-down-up text-lg"></i>
            <span>Launch Web App</span>
          </a>
        </div>
      </div>

      <!-- Right Column: Interactive Swap Card -->
      <div class="lg:col-span-5">
        <div class="glass-card p-6 rounded-2xl border border-cyan-500/20 shadow-2xl flex flex-col gap-4">
          <div class="flex justify-between items-center pb-3 border-b border-white/10">
            <span class="text-xs font-mono font-bold text-white">Instant Cross-Chain Swap</span>
            <span class="text-[10px] font-mono text-emerald-400 flex items-center gap-1"><i class="ph-bold ph-lightning"></i> MEV Guard</span>
          </div>

          <div class="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
            <div class="flex justify-between text-xs font-mono text-slate-400">
              <span>You Pay</span>
              <span>Balance: 4.82 ETH</span>
            </div>
            <div class="flex justify-between items-center">
              <input type="text" value="1.0" class="bg-transparent text-2xl font-bold font-mono text-white outline-none w-32">
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 font-mono text-xs font-bold text-white">
                <i class="ph-bold ph-currency-eth text-cyan-400"></i> ETH
              </div>
            </div>
          </div>

          <div class="flex justify-center -my-2">
            <div class="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center border-2 border-[#0A0E17] text-sm">
              <i class="ph-bold ph-arrow-down"></i>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
            <div class="flex justify-between text-xs font-mono text-slate-400">
              <span>You Receive</span>
              <span>Est. Output</span>
            </div>
            <div class="flex justify-between items-center">
              <div class="text-2xl font-bold font-mono text-emerald-400">3,482.10</div>
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 font-mono text-xs font-bold text-white">
                <i class="ph-bold ph-coins text-emerald-400"></i> USDC
              </div>
            </div>
          </div>

          <button class="tactile-btn mt-2 w-full py-3.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl shadow-lg shadow-cyan-600/30">
            Execute Gasless Swap
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-white/10 bg-[#020407] text-xs text-slate-400">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>© 2026 VALENCE Protocol Inc. Built with PageCraft AI. All rights reserved.</div>
      <div class="flex gap-6 font-mono text-xs">
        <a href="#" class="hover:text-white">Audit Report</a>
        <a href="#" class="hover:text-white">GitHub</a>
        <a href="#" class="hover:text-white">Discord</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
