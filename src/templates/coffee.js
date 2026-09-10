export const coffee = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ROAST & GRAIN // Artisanal Single-Origin Coffee Bar</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ['Cormorant Garamond', 'serif'],
            sans: ['Outfit', 'sans-serif'],
          },
          colors: {
            roast: {
              bg: '#1C1512',
              card: '#271F1B',
              amber: '#C27B38',
              cream: '#FAF6F0',
              muted: '#A39489',
              border: 'rgba(194, 123, 56, 0.2)'
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #1C1512; }
    ::-webkit-scrollbar-thumb { background: rgba(194, 123, 56, 0.35); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(194, 123, 56, 0.7); }

    .tactile-btn {
      transition: transform 0.15s ease, background-color 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
    .glass-card {
      background: rgba(39, 31, 27, 0.75);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.25s ease;
    }
    .glass-card:hover {
      border-color: rgba(194, 123, 56, 0.4);
      box-shadow: 0 10px 30px -10px rgba(194, 123, 56, 0.2);
    }
  </style>
</head>
<body class="bg-[#1C1512] text-[#FAF6F0] font-sans selection:bg-[#C27B38]/30 selection:text-[#FAF6F0] min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#1C1512]/85 backdrop-blur-xl border-b border-white/10 h-[68px] flex items-center px-6 md:px-12">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="index.html" class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C27B38] to-[#8C4E1A] flex items-center justify-center text-white shadow-lg shadow-[#C27B38]/20">
          <i class="ph-bold ph-coffee text-xl"></i>
        </div>
        <span class="font-serif font-bold text-xl tracking-wide text-[#FAF6F0]">ROAST & GRAIN</span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#A39489] font-medium">
        <a href="menu.html" class="hover:text-[#C27B38] transition-colors">Menu</a>
        <a href="gallery.html" class="hover:text-[#C27B38] transition-colors">Atmosphere</a>
        <a href="origins.html" class="hover:text-[#C27B38] transition-colors">Origins</a>
        <a href="locations.html" class="hover:text-[#C27B38] transition-colors">Locations</a>
      </nav>

      <a href="locations.html" class="tactile-btn px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1C1512] bg-[#C27B38] rounded-xl shadow-lg shadow-[#C27B38]/25 hover:bg-[#D48943]">
        Order Online
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 px-6 md:px-12 relative overflow-hidden">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 flex flex-col items-start gap-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C27B38]/10 border border-[#C27B38]/30 text-xs font-mono text-[#C27B38]">
          <i class="ph-fill ph-flame"></i>
          <span>FRESH DAILY ROASTS // ETHIOPIA & COLOMBIA</span>
        </div>

        <h1 class="text-4xl sm:text-7xl font-serif leading-[1.05] text-[#FAF6F0]">
          Artisanal single-origin coffee, crafted with <span class="text-[#C27B38] italic">precision</span>.
        </h1>

        <p class="text-[#A39489] text-base sm:text-lg leading-relaxed max-w-[52ch]">
          Sourced directly from sustainable micro-lot farmers in Yirgacheffe and Huila. Roasted in small batches daily to unlock origin nuances.
        </p>

        <div class="flex flex-wrap items-center gap-4 pt-2">
          <a href="#menu" class="tactile-btn px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[#1C1512] bg-[#C27B38] rounded-xl shadow-xl shadow-[#C27B38]/30 hover:bg-[#D48943] flex items-center gap-2">
            <i class="ph-bold ph-sparkle text-base"></i>
            <span>View Seasonal Menu</span>
          </a>
        </div>
      </div>

      <div class="lg:col-span-5">
        <div class="glass-card p-3 rounded-2xl border border-white/10 shadow-2xl">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" alt="Specialty Pour Over Coffee" class="w-full h-[400px] object-cover rounded-xl">
        </div>
      </div>
    </div>
  </section>

  <!-- Photo Gallery Grid (Atmosphere & Craft) -->
  <section id="gallery" class="py-16 px-6 md:px-12 bg-[#17110F] border-t border-white/5">
    <div class="max-w-7xl mx-auto flex flex-col gap-10">
      <div class="flex justify-between items-end">
        <div>
          <div class="text-xs font-mono text-[#C27B38] uppercase tracking-widest">ATMOSPHERE & CRAFT</div>
          <h2 class="text-3xl sm:text-4xl font-serif text-[#FAF6F0] mt-1">Inside the Roastery</h2>
        </div>
        <span class="text-xs text-[#A39489] font-mono">CURATED PHOTOGRAPHY</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="group overflow-hidden rounded-2xl border border-white/10 relative">
          <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80" alt="Coffee Lounge Atmosphere" class="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
            <span class="text-xs font-serif text-white font-bold">Artisanal Bar Lounge</span>
          </div>
        </div>

        <div class="group overflow-hidden rounded-2xl border border-white/10 relative">
          <img src="https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=600&q=80" alt="Roasting Beans" class="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
            <span class="text-xs font-serif text-white font-bold">Cast-Iron Drum Roaster</span>
          </div>
        </div>

        <div class="group overflow-hidden rounded-2xl border border-white/10 relative">
          <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80" alt="Espresso Extraction" class="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
            <span class="text-xs font-serif text-white font-bold">9-Bar Espresso Extraction</span>
          </div>
        </div>

        <div class="group overflow-hidden rounded-2xl border border-white/10 relative">
          <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80" alt="Latte Art" class="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex items-end">
            <span class="text-xs font-serif text-white font-bold">Velvety Oat Latte Art</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Menu Section with Product Images -->
  <section id="menu" class="py-24 px-6 md:px-12 bg-[#1C1512] border-t border-white/5">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="flex flex-col gap-2">
        <div class="text-xs font-mono text-[#C27B38] uppercase tracking-widest">SEASONAL POUR-OVER MENU</div>
        <h2 class="text-3xl sm:text-5xl font-serif text-[#FAF6F0]">Curated Small-Batch Brews</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="glass-card overflow-hidden rounded-2xl flex flex-col justify-between group">
          <div class="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" alt="Yirgacheffe Coffee" class="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-6 flex flex-col justify-between flex-grow">
            <div>
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-xl font-serif font-bold text-white">Yirgacheffe Chelba</h3>
                <span class="text-sm font-mono font-bold text-[#C27B38]">$7.50</span>
              </div>
              <p class="text-xs text-[#A39489] leading-relaxed mb-4">Notes of jasmine blossom, bergamot, and sweet wild blueberry. Light natural process.</p>
            </div>
            <div class="text-[10px] font-mono text-[#C27B38] uppercase tracking-wider border-t border-white/10 pt-3">ETHIOPIA // ALT 2,100M</div>
          </div>
        </div>

        <div class="glass-card overflow-hidden rounded-2xl flex flex-col justify-between group">
          <div class="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80" alt="Geisha Coffee" class="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-6 flex flex-col justify-between flex-grow">
            <div>
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-xl font-serif font-bold text-white">El Paraiso Geisha</h3>
                <span class="text-sm font-mono font-bold text-[#C27B38]">$9.00</span>
              </div>
              <p class="text-xs text-[#A39489] leading-relaxed mb-4">Anaerobic double fermentation with complex notes of peach nectar and lemongrass.</p>
            </div>
            <div class="text-[10px] font-mono text-[#C27B38] uppercase tracking-wider border-t border-white/10 pt-3">COLOMBIA // ALT 1,950M</div>
          </div>
        </div>

        <div class="glass-card overflow-hidden rounded-2xl flex flex-col justify-between group">
          <div class="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80" alt="Draft Nitro Oat Latte" class="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-6 flex flex-col justify-between flex-grow">
            <div>
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-xl font-serif font-bold text-white">Draft Nitro Oat Latte</h3>
                <span class="text-sm font-mono font-bold text-[#C27B38]">$6.80</span>
              </div>
              <p class="text-xs text-[#A39489] leading-relaxed mb-4">Silky nitrogen-infused cold brew paired with organic minor figures oat milk.</p>
            </div>
            <div class="text-[10px] font-mono text-[#C27B38] uppercase tracking-wider border-t border-white/10 pt-3">HOUSE BLEND // COLD TAP</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Origins & Direct Trade Philosophy -->
  <section id="origins" class="py-24 px-6 md:px-12 bg-[#140F0D] border-t border-white/5">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="flex flex-col gap-2">
        <div class="text-xs font-mono text-[#C27B38] uppercase tracking-widest">SUSTAINABLE HARVESTS // ETHICAL SOURCING</div>
        <h2 class="text-3xl sm:text-5xl font-serif text-[#FAF6F0]">Direct-Trade Bean Origins</h2>
        <p class="text-[#A39489] text-sm sm:text-base max-w-[56ch] leading-relaxed">
          We pay 45% above Fair Trade minimums directly to micro-lot farmers in volcanic mountain microclimates. Every harvest is fully traceable back to the hillside where it grew.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="glass-card overflow-hidden rounded-2xl group border border-white/10">
          <img src="https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=800&q=80" alt="Direct Trade Roasting" class="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="p-6 flex flex-col gap-3">
            <div class="text-xs font-mono text-[#C27B38]">YIRGACHEFFE, ETHIOPIA // 2,100M</div>
            <h3 class="text-2xl font-serif font-bold text-white">Heirloom Floral & Bergamot</h3>
            <p class="text-xs text-[#A39489] leading-relaxed">
              Washed heirloom cultivars dried on raised African beds for 18 days. Notes of jasmine blossom, sweet peach nectar, and bright Meyer lemon acidity.
            </p>
          </div>
        </div>

        <div class="glass-card overflow-hidden rounded-2xl group border border-white/10">
          <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80" alt="Roasted Micro-Lot Beans" class="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="p-6 flex flex-col gap-3">
            <div class="text-xs font-mono text-[#C27B38]">HUILA, COLOMBIA // 1,950M</div>
            <h3 class="text-2xl font-serif font-bold text-white">Pink Bourbon Honey Process</h3>
            <p class="text-xs text-[#A39489] leading-relaxed">
              Rare single-variety lot carefully pulped with mucilage intact. Tasting notes of toasted hazelnut, panela brown sugar, and dark cocoa finish.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Locations Section with Location Photos -->
  <section id="locations" class="py-24 px-6 md:px-12 bg-[#17110F] border-t border-white/5">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="flex flex-col gap-2">
        <div class="text-xs font-mono text-[#C27B38] uppercase tracking-widest">VISIT OUR COFFEE BARS</div>
        <h2 class="text-3xl sm:text-5xl font-serif text-[#FAF6F0]">Roastery & Tasting Lounges</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="glass-card overflow-hidden rounded-2xl group">
          <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80" alt="Seattle Coffee Bar" class="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="p-6">
            <h3 class="text-xl font-serif font-bold text-white mb-2">Seattle Flagship</h3>
            <p class="text-xs text-[#A39489] mb-4">408 Pike Street, Seattle, WA</p>
            <div class="text-[11px] font-mono text-[#C27B38]">Mon — Sun: 6:30 AM – 6:00 PM</div>
          </div>
        </div>

        <div class="glass-card overflow-hidden rounded-2xl group">
          <img src="https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=600&q=80" alt="Portland Coffee Shop" class="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="p-6">
            <h3 class="text-xl font-serif font-bold text-white mb-2">Portland Roastery</h3>
            <p class="text-xs text-[#A39489] mb-4">1204 NW Division St, Portland, OR</p>
            <div class="text-[11px] font-mono text-[#C27B38]">Mon — Sun: 7:00 AM – 5:00 PM</div>
          </div>
        </div>

        <div class="glass-card overflow-hidden rounded-2xl group">
          <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" alt="San Francisco Tasting Room" class="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="p-6">
            <h3 class="text-xl font-serif font-bold text-white mb-2">San Francisco Lounge</h3>
            <p class="text-xs text-[#A39489] mb-4">580 Mission St, San Francisco, CA</p>
            <div class="text-[11px] font-mono text-[#C27B38]">Mon — Sat: 7:00 AM – 6:00 PM</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 md:px-12 border-t border-white/10 bg-[#120D0B] text-xs text-[#A39489]">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>© 2026 ROAST & GRAIN Coffee Bar. Built with PageCraft AI. All rights reserved.</div>
      <div class="flex gap-6 uppercase tracking-wider font-mono">
        <a href="#" class="hover:text-white">Instagram</a>
        <a href="#" class="hover:text-white">Locations</a>
        <a href="#" class="hover:text-white">Wholesale</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
