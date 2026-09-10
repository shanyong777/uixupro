export const matcha = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MÍCHA // Organic Ceremonial Uji Matcha</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ['Cormorant Garamond', 'serif'],
            sans: ['Outfit', 'sans-serif'],
          },
          colors: {
            zen: {
              bg: '#FAF7F2',
              forest: '#2C3E21',
              sage: '#526943',
              muted: '#75826A',
              border: '#E5DFD4'
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #FAF7F2; }
    ::-webkit-scrollbar-thumb { background: rgba(44, 62, 33, 0.25); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(44, 62, 33, 0.6); }

    .tactile-btn {
      transition: transform 0.15s ease, background-color 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
  </style>
</head>
<body class="bg-[#FAF7F2] text-[#2C3E21] font-sans selection:bg-[#2C3E21]/15 min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-zen-border h-[68px] flex items-center px-6 md:px-12">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="flex items-center gap-2 font-serif font-bold text-2xl text-[#2C3E21]">
        <i class="ph-fill ph-leaf text-2xl text-zen-sage"></i>
        <span>MÍCHA LOUNGE</span>
      </a>

      <nav class="hidden md:flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-zen-muted">
        <a href="#gallery" class="hover:text-[#2C3E21] transition-colors">Atmosphere</a>
        <a href="#menu" class="hover:text-[#2C3E21] transition-colors">Menu</a>
        <a href="#ceremony" class="hover:text-[#2C3E21] transition-colors">The Ceremony</a>
      </nav>

      <a href="#ceremony" class="tactile-btn px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2C3E21] rounded-lg">
        Reserve Ceremony
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 px-6 md:px-12">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-6 flex flex-col items-start gap-8">
        <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-zen-muted">
          100% FIRST HARVEST // KYOTO, JAPAN
        </div>
        <h1 class="text-5xl sm:text-7xl font-serif leading-[1.02] text-[#2C3E21]">
          Ceremonial Grade Uji Matcha, stone-ground with <span class="italic">devotion</span>.
        </h1>
        <p class="text-zen-muted text-base leading-relaxed max-w-[50ch]">
          Experience rich umami, vibrant emerald hue, and velvety froth whisked by hand using traditional bamboo chasen.
        </p>
        <div class="pt-2 flex items-center gap-6">
          <a href="#menu" class="tactile-btn px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#FAF7F2] bg-[#2C3E21] rounded-lg flex items-center gap-3">
            <span>Explore Menu</span>
            <i class="ph-bold ph-arrow-right"></i>
          </a>
        </div>
      </div>

      <div class="lg:col-span-6">
        <div class="relative overflow-hidden rounded-2xl border border-zen-border shadow-xl">
          <img src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80" alt="Ceremonial Matcha Bowl" class="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700">
        </div>
      </div>
    </div>
  </section>

  <!-- Photo Gallery Showcase -->
  <section id="gallery" class="py-16 px-6 md:px-12 bg-[#F4EFE6] border-t border-zen-border">
    <div class="max-w-7xl mx-auto flex flex-col gap-10">
      <div class="flex justify-between items-end">
        <div>
          <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-zen-muted">UJI TRADITION</div>
          <h2 class="text-4xl font-serif text-[#2C3E21]">The Visual Journey</h2>
        </div>
        <span class="text-xs text-zen-muted font-mono">KYOTO FARMS</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="overflow-hidden rounded-xl border border-zen-border group">
          <img src="https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80" alt="Whisking Matcha" class="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-500">
        </div>
        <div class="overflow-hidden rounded-xl border border-zen-border group">
          <img src="https://images.unsplash.com/photo-1588600020478-4334f59e9df4?auto=format&fit=crop&w=600&q=80" alt="Tea Fields" class="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-500">
        </div>
        <div class="overflow-hidden rounded-xl border border-zen-border group">
          <img src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80" alt="Ceremonial Bowl" class="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-500">
        </div>
        <div class="overflow-hidden rounded-xl border border-zen-border group">
          <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80" alt="Matcha Dessert" class="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-500">
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 md:px-12 border-t border-zen-border bg-[#FAF7F2] text-xs text-zen-muted">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>© 2026 MÍCHA Matcha Lounge Inc. Built with PageCraft AI. All rights reserved.</div>
    </div>
  </footer>

</body>
</html>
`;
