export const luxury = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MONACO YACHTS // Global Charter & Superyacht Brokerage</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Outfit:wght@200;300;400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ['Cormorant Garamond', 'serif'],
            sans: ['Outfit', 'sans-serif'],
          },
          colors: {
            gold: {
              400: '#D4AF37',
              500: '#C5A059',
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #03050C; }
    ::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.35); border-radius: 4px; }

    .tactile-btn {
      transition: transform 0.15s ease, background-color 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
  </style>
</head>
<body class="bg-[#03050C] text-slate-300 font-sans selection:bg-gold-400/20 selection:text-gold-400 min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#03050C]/90 backdrop-blur-xl border-b border-white/10 h-[68px] flex items-center px-6 md:px-12">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="font-serif text-2xl font-light tracking-[0.25em] uppercase text-gold-400">
        MONACO <span class="font-sans text-xs text-slate-400 tracking-widest">YACHTS</span>
      </a>

      <nav class="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] text-slate-400">
        <a href="#fleet" class="hover:text-gold-400 transition-colors">Superyacht Fleet</a>
        <a href="#destinations" class="hover:text-gold-400 transition-colors">Destinations</a>
        <a href="#concierge" class="hover:text-gold-400 transition-colors">Concierge</a>
      </nav>

      <a href="#contact" class="tactile-btn px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#03050C] bg-gold-400 rounded-none">
        Private Inquiry
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 px-6 md:px-12">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-6 flex flex-col items-start gap-8">
        <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
          MONTE CARLO // FRENCH RIVIERA
        </div>
        <h1 class="text-5xl sm:text-7xl font-serif font-light leading-[1.02] text-white">
          Bespoke superyacht charters in the <span class="text-gold-400 italic">Mediterranean</span>.
        </h1>
        <p class="text-slate-400 text-base leading-relaxed max-w-[48ch]">
          Access the world's most exclusive mega yachts ranging from 50m to 120m with 24/7 dedicated private concierge service.
        </p>
        <div class="pt-2">
          <a href="#fleet" class="tactile-btn px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#03050C] bg-gold-400 rounded-none flex items-center gap-3">
            <span>Explore Fleet</span>
            <i class="ph-bold ph-arrow-right"></i>
          </a>
        </div>
      </div>

      <div class="lg:col-span-6">
        <div class="overflow-hidden border border-gold-400/20">
          <img src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80" alt="Superyacht" class="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700">
        </div>
      </div>
    </div>
  </section>

  <!-- Superyacht Fleet Gallery -->
  <section id="fleet" class="py-24 px-6 md:px-12 border-t border-white/10 bg-[#070A14]">
    <div class="max-w-7xl mx-auto flex flex-col gap-16">
      <div class="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">GLOBAL FLEET</div>
          <h2 class="text-4xl font-serif text-white mt-1">Featured Mega Yachts</h2>
        </div>
        <span class="text-xs font-mono text-slate-500 uppercase">AVAILABLE SUMMER 2026</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="flex flex-col gap-4 group cursor-pointer bg-white/5 border border-white/10 p-4">
          <div class="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80" alt="Superyacht Solar" class="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="flex justify-between items-center pt-2">
            <h3 class="text-xl font-serif text-white">M/Y SOLARIS (85m)</h3>
            <span class="text-xs font-mono font-semibold text-gold-400">€750k / wk</span>
          </div>
          <div class="text-[11px] font-mono text-slate-400">12 GUESTS · 24 CREW · HELIPAD</div>
        </div>

        <div class="flex flex-col gap-4 group cursor-pointer bg-white/5 border border-white/10 p-4">
          <div class="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80" alt="Superyacht Siren" class="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="flex justify-between items-center pt-2">
            <h3 class="text-xl font-serif text-white">M/Y SIRENIA (68m)</h3>
            <span class="text-xs font-mono font-semibold text-gold-400">€520k / wk</span>
          </div>
          <div class="text-[11px] font-mono text-slate-400">10 GUESTS · 18 CREW · BEACH CLUB</div>
        </div>

        <div class="flex flex-col gap-4 group cursor-pointer bg-white/5 border border-white/10 p-4">
          <div class="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80" alt="Superyacht Apex" class="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="flex justify-between items-center pt-2">
            <h3 class="text-xl font-serif text-white">M/Y AURA (95m)</h3>
            <span class="text-xs font-mono font-semibold text-gold-400">€950k / wk</span>
          </div>
          <div class="text-[11px] font-mono text-slate-400">16 GUESTS · 32 CREW · SPA & GYM</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Destinations Section -->
  <section id="destinations" class="py-24 px-6 md:px-12 border-t border-white/10 bg-[#03050C]">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">CRUISING GROUNDS</div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 bg-white/5 border border-white/10 flex flex-col gap-3">
          <h3 class="text-2xl font-serif text-white">French Riviera & Monaco</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Cannes Film Festival, Monaco Grand Prix, and Saint-Tropez beach clubs.</p>
        </div>
        <div class="p-8 bg-white/5 border border-white/10 flex flex-col gap-3">
          <h3 class="text-2xl font-serif text-white">Amalfi Coast & Capri</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Dramatic cliffs, private coves, and Michelin-starred dining on Capri's shoreline.</p>
        </div>
        <div class="p-8 bg-white/5 border border-white/10 flex flex-col gap-3">
          <h3 class="text-2xl font-serif text-white">Greek Cyclades & Mykonos</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Crystal waters, ancient ruins, and sunset anchorages off Santorini.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Concierge Banner -->
  <section id="contact" class="py-24 px-6 md:px-12 border-t border-white/10 bg-[#070A14]">
    <div class="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
      <h2 class="text-4xl sm:text-6xl font-serif text-white">Curate your private charter.</h2>
      <p class="text-slate-400 text-base max-w-lg">
        Our Monte Carlo charter brokers are available 24/7 to arrange custom itineraries and private aviation transfers.
      </p>
      <a href="mailto:charter@monacoyachts.mc" class="tactile-btn px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#03050C] bg-gold-400 rounded-none">
        Contact Monaco Office
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 md:px-12 border-t border-white/10 bg-[#010206] text-xs text-slate-500">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="font-serif tracking-widest text-gold-400 text-sm">MONACO YACHTS S.A.M.</div>
      <div>© 2026 Monaco Yachts. Built with PageCraft AI. All rights reserved.</div>
    </div>
  </footer>

</body>
</html>
`;
