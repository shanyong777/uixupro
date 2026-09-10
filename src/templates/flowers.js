export const flowers = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bloom & Petal // Artisanal Floral Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ['"Playfair Display"', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          },
          colors: {
            botanical: {
              50: '#FAF8F5',
              100: '#F4EFEA',
              200: '#E6DDD4',
              300: '#D5C4B5',
              700: '#5C4A3E',
              800: '#3D3028',
              900: '#261D18',
              950: '#17120F',
            },
            sage: {
              50: '#F4F7F4',
              100: '#E4ECE4',
              400: '#8FA38F',
              600: '#526E52',
              800: '#2D3E2D',
              900: '#1C281C',
            },
            rosebud: {
              400: '#E5989B',
              500: '#B5838D',
            }
          }
        }
      }
    }
  </script>
  <style>
    body {
      background-color: #FAF8F5;
      color: #261D18;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .floral-card {
      background: #FFFFFF;
      border: 1px solid rgba(220, 210, 200, 0.6);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .floral-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 32px -8px rgba(92, 74, 62, 0.08);
      border-color: #8FA38F;
    }
  </style>
</head>
<body class="bg-[#FAF8F5] text-botanical-900 selection:bg-sage-400/20 min-h-screen flex flex-col justify-between">

  <!-- Minimalist Clean Header -->
  <header class="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-botanical-200/70 h-[72px] flex items-center px-6 md:px-12">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="index.html" class="flex items-center gap-2 text-xl font-serif tracking-tight text-botanical-900 group">
        <span class="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 group-hover:bg-sage-600 group-hover:text-white transition-colors">
          <i class="ph-fill ph-flower-lotus text-base"></i>
        </span>
        <span class="font-normal italic">Bloom</span> & Petal
      </a>

      <nav class="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider uppercase text-botanical-700">
        <a href="#collections" class="hover:text-sage-600 transition-colors">Seasonal Bouquets</a>
        <a href="#philosophy" class="hover:text-sage-600 transition-colors">Our Ethos</a>
        <a href="#workshops" class="hover:text-sage-600 transition-colors">Workshops</a>
        <a href="#contact" class="hover:text-sage-600 transition-colors">Studio</a>
      </nav>

      <a href="#collections" class="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-sage-800 rounded-full hover:bg-sage-900 transition-colors shadow-sm">
        Order Arrangement
      </a>
    </div>
  </header>

  <!-- Clean, Non-Overwhelming Hero Section -->
  <section class="py-16 md:py-24 px-6 md:px-12">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <!-- Text Side -->
      <div class="lg:col-span-7 flex flex-col items-start gap-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 border border-sage-200 text-xs font-medium text-sage-800">
          <i class="ph-bold ph-sparkle text-sage-600"></i>
          <span>FRESH MORNING HARVESTS // SUSTAINABLE FLORAL STUDIO</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-serif font-light leading-[1.12] text-botanical-950">
          Where every petal tells a <span class="italic font-normal text-rosebud-500">quiet story</span>.
        </h1>

        <p class="text-botanical-700 text-base sm:text-lg leading-relaxed max-w-[50ch] font-light">
          Bespoke seasonal arrangements crafted with local, pesticide-free blooms. Designed for quiet daily rituals, intimate celebrations, and thoughtful gifting.
        </p>

        <div class="flex flex-wrap items-center gap-4 pt-2">
          <a href="#collections" class="px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white bg-sage-800 rounded-full hover:bg-sage-900 transition-colors shadow-sm flex items-center gap-2">
            <span>Explore Collections</span>
            <i class="ph-bold ph-arrow-right"></i>
          </a>
          <a href="#philosophy" class="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-botanical-800 bg-white border border-botanical-200 rounded-full hover:bg-botanical-100 transition-colors">
            Our Studio Story
          </a>
        </div>

        <!-- Quick Proof Badges -->
        <div class="grid grid-cols-3 gap-6 pt-6 border-t border-botanical-200/80 w-full max-w-lg">
          <div>
            <div class="text-2xl font-serif text-botanical-950">100%</div>
            <div class="text-[11px] text-botanical-700 uppercase tracking-wider">Local Stems</div>
          </div>
          <div>
            <div class="text-2xl font-serif text-botanical-950">Zero</div>
            <div class="text-[11px] text-botanical-700 uppercase tracking-wider">Floral Foam</div>
          </div>
          <div>
            <div class="text-2xl font-serif text-botanical-950">Same-Day</div>
            <div class="text-[11px] text-botanical-700 uppercase tracking-wider">Local Delivery</div>
          </div>
        </div>
      </div>

      <!-- Framed Clean Image Side (Balanced & Elegant) -->
      <div class="lg:col-span-5">
        <div class="relative p-3 bg-white rounded-3xl border border-botanical-200 shadow-xl">
          <img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80" alt="Artisanal Rose Bouquet" class="w-full h-[420px] object-cover rounded-2xl">
          <div class="p-4 flex justify-between items-center text-xs">
            <div>
              <div class="font-serif font-bold text-botanical-900 text-sm">The Meadow Rose</div>
              <div class="text-botanical-700 text-[11px]">Garden Roses, Astilbe & Wild Eucalyptus</div>
            </div>
            <span class="font-serif font-bold text-sage-800 text-base">$68</span>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- Curated Floral Collections Grid -->
  <section id="collections" class="py-20 px-6 md:px-12 bg-[#F4EFEA] border-t border-botanical-200">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-sage-600 font-bold">CURRENT HARVEST</span>
          <h2 class="text-3xl sm:text-5xl font-serif font-light text-botanical-950 mt-1">Seasonal Best Sellers</h2>
        </div>
        <p class="text-xs text-botanical-700 max-w-xs leading-relaxed">
          Cut fresh daily at dawn and wrapped in biodegradable organic cotton kraft paper.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Flower Card 1 -->
        <div class="floral-card rounded-2xl overflow-hidden flex flex-col justify-between group">
          <div class="overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80" alt="Classic Red Roses Bouquet" class="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-500">
            <span class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-botanical-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Classic</span>
          </div>
          <div class="p-6 flex flex-col justify-between flex-grow">
            <div>
              <div class="flex justify-between items-baseline mb-2">
                <h3 class="text-xl font-serif font-bold text-botanical-900">Velvet Crimson Garden</h3>
                <span class="font-serif font-bold text-sage-800 text-lg">$75</span>
              </div>
              <p class="text-xs text-botanical-700 leading-relaxed mb-6 font-light">
                Twelve heirloom Ecuadorian garden roses framed by seeded eucalyptus and delicate waxflowers.
              </p>
            </div>
            <button class="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-botanical-900 bg-botanical-100 hover:bg-sage-600 hover:text-white rounded-xl transition-colors">
              Add to Basket
            </button>
          </div>
        </div>

        <!-- Flower Card 2 -->
        <div class="floral-card rounded-2xl overflow-hidden flex flex-col justify-between group">
          <div class="overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80" alt="Pastel Peonies Bouquet" class="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-500">
            <span class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-botanical-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Limited</span>
          </div>
          <div class="p-6 flex flex-col justify-between flex-grow">
            <div>
              <div class="flex justify-between items-baseline mb-2">
                <h3 class="text-xl font-serif font-bold text-botanical-900">Pastel Peony Whisper</h3>
                <span class="font-serif font-bold text-sage-800 text-lg">$82</span>
              </div>
              <p class="text-xs text-botanical-700 leading-relaxed mb-6 font-light">
                Fluffy Sarah Bernhardt peonies paired with blush sweet peas and silvery dusty miller foliage.
              </p>
            </div>
            <button class="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-botanical-900 bg-botanical-100 hover:bg-sage-600 hover:text-white rounded-xl transition-colors">
              Add to Basket
            </button>
          </div>
        </div>

        <!-- Flower Card 3 -->
        <div class="floral-card rounded-2xl overflow-hidden flex flex-col justify-between group">
          <div class="overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=800&q=80" alt="Sunflower Summer Meadow" class="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-500">
            <span class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-botanical-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Bright</span>
          </div>
          <div class="p-6 flex flex-col justify-between flex-grow">
            <div>
              <div class="flex justify-between items-baseline mb-2">
                <h3 class="text-xl font-serif font-bold text-botanical-900">Golden Meadow Sunlight</h3>
                <span class="font-serif font-bold text-sage-800 text-lg">$62</span>
              </div>
              <p class="text-xs text-botanical-700 leading-relaxed mb-6 font-light">
                Radiant organic sunflowers complemented by chamomile daisies, yellow craspedia, and wild rye.
              </p>
            </div>
            <button class="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-botanical-900 bg-botanical-100 hover:bg-sage-600 hover:text-white rounded-xl transition-colors">
              Add to Basket
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Clean Ethos Section (Philosophy) -->
  <section id="philosophy" class="py-24 px-6 md:px-12">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <div class="lg:col-span-5">
        <div class="rounded-3xl overflow-hidden border border-botanical-200 shadow-lg">
          <img src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80" alt="Florist Workshop" class="w-full h-[380px] object-cover">
        </div>
      </div>

      <div class="lg:col-span-7 flex flex-col items-start gap-6">
        <span class="text-xs font-mono uppercase tracking-widest text-sage-600 font-bold">SUSTAINABLE ETHOS</span>
        <h2 class="text-3xl sm:text-5xl font-serif font-light text-botanical-950">Mindful Floristry in Tune with Nature</h2>
        <p class="text-botanical-700 text-base leading-relaxed font-light">
          Traditional commercial flower trade relies heavily on single-use plastics and chemical preservatives. We do things differently.
        </p>
        <div class="space-y-4 w-full pt-2">
          <div class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 mt-0.5">✓</span>
            <div>
              <div class="text-sm font-serif font-bold text-botanical-900">100% Foam-Free Mechanics</div>
              <div class="text-xs text-botanical-700 font-light">We use reusable kenzan frogs, chicken wire, and fresh moss.</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 mt-0.5">✓</span>
            <div>
              <div class="text-sm font-serif font-bold text-botanical-900">Zero Air-Freight Blooms</div>
              <div class="text-xs text-botanical-700 font-light">Direct partnerships with regenerative family growers within 50 miles.</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 mt-0.5">✓</span>
            <div>
              <div class="text-sm font-serif font-bold text-botanical-900">Compostable Packaging</div>
              <div class="text-xs text-botanical-700 font-light">Kraft paper wrapping and natural jute twine that returns cleanly to the soil.</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- Workshops & Events -->
  <section id="workshops" class="py-20 px-6 md:px-12 bg-[#F4EFEA] border-t border-botanical-200">
    <div class="max-w-7xl mx-auto flex flex-col gap-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-sage-600 font-bold">CREATIVE EXPERIENCES</span>
          <h2 class="text-3xl sm:text-4xl font-serif font-light text-botanical-950 mt-1">Weekend Floral Workshops</h2>
        </div>
        <a href="#contact" class="text-xs font-semibold uppercase tracking-wider text-sage-800 hover:text-sage-600 flex items-center gap-1">
          <span>View Workshop Calendar</span>
          <i class="ph-bold ph-arrow-right"></i>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-8 rounded-2xl border border-botanical-200 flex flex-col justify-between">
          <div>
            <div class="text-xs font-mono text-sage-600 font-bold mb-2">SATURDAYS // 10:00 AM – 1:00 PM</div>
            <h3 class="text-2xl font-serif font-bold text-botanical-900 mb-3">Ikebana & Minimalist Branch Work</h3>
            <p class="text-xs text-botanical-700 leading-relaxed font-light mb-6">
              Learn the Japanese art of spatial balance, line, and silence using seasonal blooming branches and single focal flowers.
            </p>
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-botanical-100">
            <span class="font-serif font-bold text-botanical-900">$95 / person</span>
            <button class="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-sage-800 rounded-full hover:bg-sage-900 transition-colors">
              Reserve Seat
            </button>
          </div>
        </div>

        <div class="bg-white p-8 rounded-2xl border border-botanical-200 flex flex-col justify-between">
          <div>
            <div class="text-xs font-mono text-sage-600 font-bold mb-2">SUNDAYS // 2:00 PM – 5:00 PM</div>
            <h3 class="text-2xl font-serif font-bold text-botanical-900 mb-3">Wild Garden Hand-Tied Bouquets</h3>
            <p class="text-xs text-botanical-700 leading-relaxed font-light mb-6">
              Master spiral bouquet stems, color palettes, and cascading textures. Take home your own bespoke arrangement with ceramic vase included.
            </p>
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-botanical-100">
            <span class="font-serif font-bold text-botanical-900">$120 / person</span>
            <button class="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-sage-800 rounded-full hover:bg-sage-900 transition-colors">
              Reserve Seat
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Studio Visit / Contact Section -->
  <section id="contact" class="py-20 px-6 md:px-12 border-t border-botanical-200">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div class="lg:col-span-5 flex flex-col gap-4">
        <span class="text-xs font-mono uppercase tracking-widest text-sage-600 font-bold">VISIT OUR BOTANICAL ATELIER</span>
        <h2 class="text-3xl sm:text-4xl font-serif font-light text-botanical-950">Come Smell the Morning Stems</h2>
        <p class="text-xs text-botanical-700 leading-relaxed font-light">
          Drop in for fresh coffee, browse our weekly stem bar, or consult on weddings, private dinners, and custom botanical installations.
        </p>
        <div class="pt-4 space-y-2 text-xs text-botanical-800 font-medium">
          <div>📍 348 Greenhouse Way, Floral District</div>
          <div>🕒 Wednesday – Sunday: 8:00 AM – 6:00 PM</div>
          <div>📞 (555) 382-9014 • hello@bloomandpetal.studio</div>
        </div>
      </div>

      <div class="lg:col-span-7 bg-white p-8 rounded-3xl border border-botanical-200 shadow-sm">
        <h3 class="text-xl font-serif font-bold text-botanical-900 mb-2">Send a Bespoke Floral Inquiry</h3>
        <p class="text-xs text-botanical-700 mb-6 font-light">We respond within 4 business hours.</p>
        <form class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-botanical-700 mb-1">Your Name</label>
              <input type="text" placeholder="Eleanor Vance" class="w-full px-4 py-2.5 text-xs bg-botanical-50 border border-botanical-200 rounded-xl outline-none focus:border-sage-600">
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-botanical-700 mb-1">Email Address</label>
              <input type="email" placeholder="eleanor@example.com" class="w-full px-4 py-2.5 text-xs bg-botanical-50 border border-botanical-200 rounded-xl outline-none focus:border-sage-600">
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-bold uppercase tracking-wider text-botanical-700 mb-1">Inquiry Type</label>
            <select class="w-full px-4 py-2.5 text-xs bg-botanical-50 border border-botanical-200 rounded-xl outline-none focus:border-sage-600 text-botanical-800">
              <option>Custom Gift Arrangement</option>
              <option>Wedding & Event Florals</option>
              <option>Private Workshop Booking</option>
              <option>Weekly Floral Subscription</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold uppercase tracking-wider text-botanical-700 mb-1">Details & Preferred Date</label>
            <textarea rows="3" placeholder="Tell us about your occasion, color preferences, or vase style..." class="w-full px-4 py-2.5 text-xs bg-botanical-50 border border-botanical-200 rounded-xl outline-none focus:border-sage-600"></textarea>
          </div>
          <button type="button" class="w-full py-3 text-xs font-semibold uppercase tracking-widest text-white bg-sage-800 rounded-xl hover:bg-sage-900 transition-colors shadow-sm">
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  </section>

  <!-- Clean Footer -->
  <footer class="py-12 px-6 md:px-12 border-t border-botanical-200 bg-[#F4EFEA] text-xs text-botanical-700">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-2 font-serif text-botanical-900">
        <i class="ph-fill ph-flower-lotus text-sage-600 text-base"></i>
        <span>Bloom & Petal Studio</span> • © 2026 PageCraft AI
      </div>
      <div class="flex gap-6 uppercase tracking-wider font-mono text-[11px]">
        <a href="#collections" class="hover:text-botanical-950 transition-colors">Seasonal</a>
        <a href="#workshops" class="hover:text-botanical-950 transition-colors">Workshops</a>
        <a href="#philosophy" class="hover:text-botanical-950 transition-colors">Ethos</a>
        <a href="#contact" class="hover:text-botanical-950 transition-colors">Studio</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
