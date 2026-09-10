export const minimalist = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NORD ARCHITECTS // Copenhagen & Stockholm</title>
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
            nord: {
              paper: '#F4F1EA',
              charcoal: '#141414',
              muted: '#737373',
              border: '#E2DDD4'
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #F4F1EA; }
    ::-webkit-scrollbar-thumb { background: rgba(20, 20, 20, 0.25); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(20, 20, 20, 0.6); }

    .tactile-btn {
      transition: transform 0.15s ease, background-color 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
  </style>
</head>
<body class="bg-[#F4F1EA] text-[#141414] font-sans selection:bg-[#141414]/15 selection:text-[#141414] min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#F4F1EA]/90 backdrop-blur-md border-b border-nord-border h-[68px] flex items-center px-6 md:px-12">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="font-serif font-bold text-2xl tracking-tight text-[#141414]">
        NORD <span class="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-nord-muted ml-2">ARCHITECTS</span>
      </a>

      <nav class="hidden md:flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-nord-muted">
        <a href="#projects" class="hover:text-[#141414] transition-colors">Works</a>
        <a href="#philosophy" class="hover:text-[#141414] transition-colors">Philosophy</a>
        <a href="#recognition" class="hover:text-[#141414] transition-colors">Recognition</a>
        <a href="#contact" class="hover:text-[#141414] transition-colors">Contact</a>
      </nav>

      <a href="#contact" class="tactile-btn px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#F4F1EA] bg-[#141414] rounded-lg">
        Inquire
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 px-6 md:px-12">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-6 flex flex-col items-start gap-8">
        <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-nord-muted">
          EST. 2014 // COPENHAGEN & STOCKHOLM
        </div>
        <h1 class="text-5xl sm:text-7xl font-serif leading-[1.02] text-[#141414]">
          Architecture rooted in silence & natural light.
        </h1>
        <p class="text-nord-muted text-base leading-relaxed max-w-[50ch]">
          We design private residences, cultural spaces, and sacred structures that honor material authenticity, timber geometry, and Nordic light.
        </p>
        <div class="pt-2 flex items-center gap-6">
          <a href="#projects" class="tactile-btn px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#F4F1EA] bg-[#141414] rounded-lg flex items-center gap-3">
            <span>View Monograph</span>
            <i class="ph-bold ph-arrow-right"></i>
          </a>
        </div>
      </div>

      <div class="lg:col-span-6">
        <div class="relative overflow-hidden rounded-2xl border border-nord-border shadow-xl">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Nordic Architecture" class="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700">
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Works Grid -->
  <section id="projects" class="py-24 px-6 md:px-12 border-t border-nord-border">
    <div class="max-w-7xl mx-auto flex flex-col gap-16">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div class="flex flex-col gap-2">
          <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-nord-muted">PORTFOLIO</div>
          <h2 class="text-4xl font-serif text-[#141414]">Selected Commissioned Works</h2>
        </div>
        <span class="text-xs text-nord-muted font-mono">2022 — 2026</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="flex flex-col gap-4 group cursor-pointer">
          <div class="overflow-hidden rounded-xl border border-nord-border">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" alt="House in the Pines" class="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-widest text-nord-muted">RESIDENTIAL // SWEDEN</div>
            <h3 class="text-xl font-serif font-semibold text-[#141414] mt-1">Villa Småland</h3>
          </div>
        </div>

        <div class="flex flex-col gap-4 group cursor-pointer">
          <div class="overflow-hidden rounded-xl border border-nord-border">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" alt="Coastal Pavilion" class="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-widest text-nord-muted">CULTURAL // DENMARK</div>
            <h3 class="text-xl font-serif font-semibold text-[#141414] mt-1">The Fjord Pavilion</h3>
          </div>
        </div>

        <div class="flex flex-col gap-4 group cursor-pointer">
          <div class="overflow-hidden rounded-xl border border-nord-border">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" alt="Nordic Studio" class="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-widest text-nord-muted">INTERIOR // NORWAY</div>
            <h3 class="text-xl font-serif font-semibold text-[#141414] mt-1">Oslo Atelier</h3>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Architectural Philosophy Section -->
  <section id="philosophy" class="py-24 px-6 md:px-12 bg-[#ECE8E1] border-t border-nord-border">
    <div class="max-w-7xl mx-auto flex flex-col gap-16">
      <div class="flex flex-col gap-2">
        <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-nord-muted">DESIGN METHODOLOGY</div>
        <h2 class="text-4xl font-serif text-[#141414]">Built for Quiet Permanence</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-[#F4F1EA] p-8 rounded-xl border border-nord-border flex flex-col justify-between">
          <h3 class="text-2xl font-serif font-bold text-[#141414] mb-3">Tactile Materiality</h3>
          <p class="text-xs text-nord-muted leading-relaxed">Untreated Scandinavian pine, local granite, and limewash plaster that age gracefully over decades.</p>
        </div>
        <div class="bg-[#F4F1EA] p-8 rounded-xl border border-nord-border flex flex-col justify-between">
          <h3 class="text-2xl font-serif font-bold text-[#141414] mb-3">Solar Orientation</h3>
          <p class="text-xs text-nord-muted leading-relaxed">Deep aperture glazing designed to harvest low winter sun angles while shielding high summer glare.</p>
        </div>
        <div class="bg-[#F4F1EA] p-8 rounded-xl border border-nord-border flex flex-col justify-between">
          <h3 class="text-2xl font-serif font-bold text-[#141414] mb-3">Spatial Economy</h3>
          <p class="text-xs text-nord-muted leading-relaxed">Eliminating ornamental clutter to focus user attention on proportion, volume, and landscape views.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Press & Recognition Section -->
  <section id="recognition" class="py-24 px-6 md:px-12 border-t border-nord-border">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-nord-muted">AWARDS & PRESS</div>
      <div class="divide-y divide-nord-border border-y border-nord-border">
        <div class="py-6 flex justify-between items-center">
          <span class="font-serif text-xl font-bold">Mies van der Rohe Award Nominee</span>
          <span class="text-xs font-mono text-nord-muted">2025 // EUROPEAN UNION</span>
        </div>
        <div class="py-6 flex justify-between items-center">
          <span class="font-serif text-xl font-bold">Architectural Digest AD100</span>
          <span class="text-xs font-mono text-nord-muted">2024 // GLOBAL LIST</span>
        </div>
        <div class="py-6 flex justify-between items-center">
          <span class="font-serif text-xl font-bold">Wallpaper* Design Award Winner</span>
          <span class="text-xs font-mono text-nord-muted">2023 // BEST RESIDENCE</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-24 px-6 md:px-12 border-t border-nord-border bg-[#ECE8E1]">
    <div class="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
      <h2 class="text-4xl sm:text-6xl font-serif text-[#141414]">Begin a dialogue with our studio.</h2>
      <p class="text-nord-muted text-base max-w-lg">
        We accept a limited number of architectural commissions each year to preserve craft integrity.
      </p>
      <a href="mailto:studio@nordarchitects.com" class="tactile-btn px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#F4F1EA] bg-[#141414] rounded-lg">
        Inquire Studio Availability
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 md:px-12 border-t border-nord-border bg-[#F4F1EA] text-xs text-nord-muted">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>© 2026 NORD ARCHITECTS ApS. All rights reserved. Built with PageCraft AI.</div>
      <div class="flex gap-8 uppercase tracking-widest text-[10px]">
        <a href="#" class="hover:text-[#141414]">Instagram</a>
        <a href="#" class="hover:text-[#141414]">ArchDaily</a>
        <a href="#" class="hover:text-[#141414]">LinkedIn</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
