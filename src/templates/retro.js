export const retro = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEON WAVE // Analog Synthesizers & Retro Synthwave Labs</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            heading: ['Orbitron', 'sans-serif'],
            mono: ['Share Tech Mono', 'monospace'],
            sans: ['Outfit', 'sans-serif'],
          },
          colors: {
            synth: {
              bg: '#0B0516',
              pink: '#FF007F',
              cyan: '#00F0FF',
              purple: '#9D00FF',
              panel: '#150C27'
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0B0516; }
    ::-webkit-scrollbar-thumb { background: rgba(255, 0, 127, 0.4); border-radius: 4px; }

    .tactile-btn {
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
    .synth-card {
      background: rgba(21, 12, 39, 0.85);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 0, 127, 0.3);
      transition: all 0.25s ease;
    }
    .synth-card:hover {
      border-color: rgba(0, 240, 255, 0.8);
      box-shadow: 0 0 25px rgba(0, 240, 255, 0.3);
    }
  </style>
</head>
<body class="bg-[#0B0516] text-slate-300 font-sans selection:bg-[#FF007F]/30 selection:text-[#FF007F] min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#0B0516]/90 backdrop-blur-xl border-b border-synth-pink/30 h-[68px] flex items-center px-6">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="flex items-center gap-3 font-heading font-black text-xl text-white tracking-widest">
        <div class="w-8 h-8 bg-synth-pink text-black flex items-center justify-center font-bold">
          <i class="ph-bold ph-cassette-tape text-lg"></i>
        </div>
        <span>NEON<span class="text-synth-cyan">_WAVE</span></span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
        <a href="#synths" class="hover:text-synth-pink transition-colors">Synths</a>
        <a href="#presets" class="hover:text-synth-pink transition-colors">VST Presets</a>
        <a href="#library" class="hover:text-synth-pink transition-colors">Sound Vault</a>
      </nav>

      <a href="#library" class="tactile-btn px-4 py-2 text-xs font-mono font-bold uppercase text-black bg-synth-cyan shadow-lg shadow-synth-cyan/30">
        Download VST Bank
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 px-6 relative overflow-hidden">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 flex flex-col items-start gap-6">
        <div class="px-3.5 py-1.5 rounded-none bg-synth-pink/10 border border-synth-pink/40 text-xs font-mono text-synth-pink">
          📼 RETRO 80S SYNTHWAVE AUDIO LAB
        </div>

        <h1 class="text-4xl sm:text-6xl font-heading font-black tracking-tight uppercase leading-none text-white">
          PURE ANALOG <span class="text-synth-pink">SYNTHESIS</span> & NEON VIBES.
        </h1>

        <p class="text-slate-400 text-sm leading-relaxed max-w-[50ch]">
          Handcrafted analog VST plugins, sample packs, and retro synthwave soundscapes recorded on genuine 1984 tape decks.
        </p>

        <div class="pt-2 flex items-center gap-4">
          <a href="#library" class="tactile-btn px-7 py-3.5 text-xs font-mono font-bold uppercase text-black bg-synth-pink shadow-xl shadow-synth-pink/40 flex items-center gap-2">
            <span>Explore Sound Vault</span>
            <i class="ph-bold ph-arrow-right"></i>
          </a>
        </div>
      </div>

      <div class="lg:col-span-5">
        <div class="synth-card p-6 border border-synth-pink/40">
          <div class="flex justify-between items-center pb-3 border-b border-synth-pink/30 text-xs font-mono">
            <span class="text-white font-bold">SYNTH_ANALOG_RACK_v1.0</span>
            <span class="text-synth-cyan">PLAYING: 128 BPM</span>
          </div>
          <div class="py-6 flex justify-center">
            <div class="w-full h-48 bg-black/60 border border-synth-cyan/30 flex flex-col items-center justify-center gap-3">
              <i class="ph-bold ph-wave-sine text-4xl text-synth-pink animate-pulse"></i>
              <span class="text-xs font-mono text-synth-cyan">FREQUENCY: 440 Hz // SAWTOOTH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-synth-pink/20 bg-[#06020C] text-xs text-slate-500 font-mono">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>© 2026 NEON WAVE SOUND LABS. Built with PageCraft AI. All rights reserved.</div>
      <div class="flex gap-6">
        <a href="#" class="hover:text-synth-pink">Bandcamp</a>
        <a href="#" class="hover:text-synth-pink">SoundCloud</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
