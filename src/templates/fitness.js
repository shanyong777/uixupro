export const fitness = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>APEX // High-Performance Hybrid Fitness Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,400;0,700;0,900;1,800;1,900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Outfit', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            fit: {
              bg: '#060709',
              card: '#0D0F14',
              lime: '#A3E635',
              muted: '#71717A'
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #060709; }
    ::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.4); border-radius: 4px; }

    .tactile-btn {
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
    .glass-card {
      background: rgba(13, 15, 20, 0.8);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.25s ease;
    }
    .glass-card:hover {
      border-color: rgba(163, 230, 53, 0.4);
    }
  </style>
</head>
<body class="bg-[#060709] text-slate-100 font-sans selection:bg-[#A3E635]/30 selection:text-[#A3E635] min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#060709]/80 backdrop-blur-xl border-b border-white/10 h-[68px] flex items-center px-6">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="flex items-center gap-2 font-black italic text-2xl tracking-tighter text-white">
        <i class="ph-bold ph-barbell text-2xl text-fit-lime"></i>
        <span>APEX<span class="text-fit-lime">_STUDIO</span></span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-xs font-mono font-bold text-slate-400 uppercase">
        <a href="#training" class="hover:text-fit-lime transition-colors">Training</a>
        <a href="#trainers" class="hover:text-fit-lime transition-colors">Coaches</a>
        <a href="#schedule" class="hover:text-fit-lime transition-colors">Schedule</a>
      </nav>

      <a href="#pass" class="tactile-btn px-4 py-2 text-xs font-black italic uppercase text-black bg-fit-lime rounded-lg">
        Claim 7-Day Pass
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 flex flex-col items-start gap-6">
        <div class="px-3.5 py-1.5 rounded-full bg-fit-lime/10 border border-fit-lime/30 text-xs font-mono text-fit-lime font-bold">
          ⚡ HYBRID ATHLETIC CONDITIONING
        </div>

        <h1 class="text-5xl sm:text-7xl font-black italic tracking-tighter uppercase leading-none text-white">
          REDEFINE YOUR <span class="text-fit-lime">PHYSICAL LIMITS</span>.
        </h1>

        <p class="text-slate-400 text-base leading-relaxed max-w-[50ch]">
          Science-backed strength programming, high-intensity interval conditioning, and biometrics recovery.
        </p>

        <div class="pt-2 flex items-center gap-4">
          <a href="#pass" class="tactile-btn px-7 py-3.5 text-xs font-black italic uppercase text-black bg-fit-lime rounded-xl flex items-center gap-2">
            <span>Start Free Trial</span>
            <i class="ph-bold ph-arrow-right"></i>
          </a>
        </div>
      </div>

      <div class="lg:col-span-5">
        <div class="glass-card p-4 rounded-2xl">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" alt="Athletic Training" class="w-full h-[400px] object-cover rounded-xl">
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-white/10 bg-[#040507] text-xs text-slate-500">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>© 2026 APEX PERFORMANCE GYM. Built with PageCraft AI. All rights reserved.</div>
      <div class="flex gap-6 font-mono">
        <a href="#" class="hover:text-white">Instagram</a>
        <a href="#" class="hover:text-white">Schedule</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
