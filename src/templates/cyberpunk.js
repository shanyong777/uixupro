export const cyberpunk = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KUSANAGI // Tactical Cyberwear & Neural HUD</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Orbitron', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            cyber: {
              bg: '#020205',
              card: '#080812',
              cyan: '#00F0FF',
              pink: '#FF0055',
              yellow: '#FFE600'
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #020205; }
    ::-webkit-scrollbar-thumb { background: rgba(0, 240, 255, 0.4); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(0, 240, 255, 0.8); }

    .tactile-btn {
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
    .hud-card {
      background: rgba(8, 8, 18, 0.8);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 240, 255, 0.2);
      transition: all 0.25s ease;
    }
    .hud-card:hover {
      border-color: rgba(255, 0, 85, 0.6);
      box-shadow: 0 0 25px rgba(255, 0, 85, 0.25);
    }
  </style>
</head>
<body class="bg-[#020205] text-slate-300 font-mono selection:bg-[#FF0055]/30 selection:text-[#FF0055] min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#020205]/90 backdrop-blur-xl border-b border-cyan-500/20 h-[68px] flex items-center px-6">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="flex items-center gap-3 font-sans font-black text-xl text-white tracking-wider">
        <div class="w-8 h-8 bg-cyan-500 text-black flex items-center justify-center font-bold">
          <i class="ph-bold ph-shield-warning text-lg"></i>
        </div>
        <span>KUSANAGI<span class="text-cyan-400">_HUD</span></span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-xs text-slate-400 tracking-widest uppercase">
        <a href="#gear" class="hover:text-cyan-400 transition-colors">Tactile Gear</a>
        <a href="#specs" class="hover:text-cyan-400 transition-colors">Neural Specs</a>
        <a href="#link" class="hover:text-cyan-400 transition-colors">Sync Link</a>
      </nav>

      <div class="flex items-center gap-4">
        <div class="hidden sm:flex items-center gap-2 text-[10px] text-cyan-400 border border-cyan-500/30 px-3 py-1 bg-cyan-500/10">
          <span class="w-1.5 h-1.5 bg-cyan-400 animate-pulse"></span>
          <span>NEURAL_LINK_STABLE</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 px-6 relative overflow-hidden">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 flex flex-col items-start gap-6">
        <div class="text-xs text-cyan-400 border border-cyan-500/30 px-3 py-1 bg-cyan-500/10">
          SYS_DIAGNOSTICS // PROTOCOL v8.4
        </div>
        <h1 class="text-4xl sm:text-6xl font-sans font-black tracking-tight leading-[1.05] text-white">
          MIL-SPEC <span class="text-cyan-400">CYBERNETIC</span> AUGMENTATIONS.
        </h1>
        <p class="text-slate-400 text-sm leading-relaxed max-w-[50ch]">
          Sub-dermal neural implants, optical HUD overlays, and kinetic reflex accelerators engineered for high-threat tactical environments.
        </p>
        <div class="pt-2 flex items-center gap-4">
          <a href="#gear" class="tactile-btn px-6 py-3.5 text-xs font-bold font-sans uppercase tracking-widest text-black bg-cyan-400 shadow-lg shadow-cyan-400/30 flex items-center gap-2">
            <span>Access Armory</span>
            <i class="ph-bold ph-arrow-right"></i>
          </a>
        </div>
      </div>

      <div class="lg:col-span-5">
        <div class="hud-card p-6 border border-cyan-500/30 flex flex-col gap-4">
          <div class="flex justify-between items-center pb-2 border-b border-cyan-500/20 text-xs">
            <span class="text-white font-bold font-sans">TACTICAL HUD GAUGES</span>
            <span class="text-emerald-400">SYNCED 100%</span>
          </div>
          <div class="flex flex-col gap-3 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-400">Reflex Latency</span>
              <span class="text-cyan-400 font-bold">0.42 ms</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Sub-dermal Shielding</span>
              <span class="text-emerald-400 font-bold">98.4%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Neural Bandwidth</span>
              <span class="text-pink-500 font-bold">12.8 TB/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-cyan-500/20 bg-[#010103] text-xs text-slate-500">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>© 2026 KUSANAGI HEAVY INDUSTRIES. Built with PageCraft AI. All rights reserved.</div>
      <div class="flex gap-6 text-[11px]">
        <a href="#" class="hover:text-cyan-400">SEC_LOGS</a>
        <a href="#" class="hover:text-cyan-400">FIRMWARE</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
