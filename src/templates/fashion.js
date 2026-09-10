export const fashion = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MAISON ÉTOILE // Paris Haute Couture & Fine Leather</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@200;300;400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ['Cormorant Garamond', 'serif'],
            sans: ['Outfit', 'sans-serif'],
          },
          colors: {
            maison: {
              bg: '#FAFAFA',
              dark: '#111111',
              gold: '#C5A059',
              muted: '#777777',
              border: '#E8E8E8'
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #FAFAFA; }
    ::-webkit-scrollbar-thumb { background: rgba(17, 17, 17, 0.25); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(17, 17, 17, 0.6); }

    .tactile-btn {
      transition: transform 0.15s ease, background-color 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
  </style>
</head>
<body class="bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#111111]/10 min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-maison-border h-[68px] flex items-center px-6 md:px-12">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="font-serif text-2xl font-light tracking-[0.25em] uppercase text-[#111111]">
        MAISON ÉTOILE
      </a>

      <nav class="hidden md:flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-maison-muted">
        <a href="#collection" class="hover:text-[#111111] transition-colors">Spring / Summer 26</a>
        <a href="#craft" class="hover:text-[#111111] transition-colors">The Atelier</a>
        <a href="#boutiques" class="hover:text-[#111111] transition-colors">Boutiques</a>
      </nav>

      <a href="#boutique" class="tactile-btn px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#FAFAFA] bg-[#111111] rounded-none">
        Book Private Appointment
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 px-6 md:px-12">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-6 flex flex-col items-start gap-8">
        <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-maison-muted">
          HAUTE COUTURE // RUE SAINT-HONORÉ, PARIS
        </div>
        <h1 class="text-5xl sm:text-7xl font-serif font-light leading-[1.02] text-[#111111]">
          Architectural silhouettes crafted in <span class="italic font-normal">silk & leather</span>.
        </h1>
        <p class="text-maison-muted text-base leading-relaxed max-w-[48ch]">
          Each piece is hand-tailored in our Paris atelier over 120 hours of delicate needlework. Pure timeless elegance.
        </p>
        <div class="pt-2">
          <a href="#collection" class="tactile-btn px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#FAFAFA] bg-[#111111] rounded-none flex items-center gap-3">
            <span>Explore Collection</span>
            <i class="ph-bold ph-arrow-right"></i>
          </a>
        </div>
      </div>

      <div class="lg:col-span-6">
        <div class="relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" alt="Haute Couture Collection" class="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700">
        </div>
      </div>
    </div>
  </section>

  <!-- Collection Lookbook -->
  <section id="collection" class="py-24 px-6 md:px-12 border-t border-maison-border bg-[#F5F5F5]">
    <div class="max-w-7xl mx-auto flex flex-col gap-16">
      <div class="flex justify-between items-end border-b border-maison-border pb-6">
        <div>
          <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-maison-muted">LOOKBOOK</div>
          <h2 class="text-4xl font-serif text-[#111111] mt-1">Spring / Summer 2026 Key Lookbook</h2>
        </div>
        <span class="text-xs font-mono text-maison-muted uppercase">01 / 06 LOOKS</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="flex flex-col gap-4 group cursor-pointer">
          <div class="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" alt="Look 01" class="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="flex justify-between items-center pt-2">
            <h3 class="text-lg font-serif tracking-wide text-[#111111]">L'Ombre Silk Trench Coat</h3>
            <span class="text-xs font-mono font-semibold text-[#111111]">€3,800</span>
          </div>
        </div>

        <div class="flex flex-col gap-4 group cursor-pointer">
          <div class="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80" alt="Look 02" class="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="flex justify-between items-center pt-2">
            <h3 class="text-lg font-serif tracking-wide text-[#111111]">Le Cuir Structured Tote</h3>
            <span class="text-xs font-mono font-semibold text-[#111111]">€2,450</span>
          </div>
        </div>

        <div class="flex flex-col gap-4 group cursor-pointer">
          <div class="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80" alt="Look 03" class="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="flex justify-between items-center pt-2">
            <h3 class="text-lg font-serif tracking-wide text-[#111111]">Étoile Evening Gown</h3>
            <span class="text-xs font-mono font-semibold text-[#111111]">€5,200</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- The Craft & Atelier Section -->
  <section id="craft" class="py-24 px-6 md:px-12 border-t border-maison-border bg-[#FAFAFA]">
    <div class="max-w-7xl mx-auto flex flex-col gap-16">
      <div class="flex flex-col gap-2">
        <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-maison-muted">ATELIER HERITAGE</div>
        <h2 class="text-4xl font-serif text-[#111111]">Uncompromising French Craftsmanship</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 border border-maison-border bg-white flex flex-col justify-between">
          <h3 class="text-2xl font-serif text-[#111111] mb-2">120+ Hours per Garment</h3>
          <p class="text-xs text-maison-muted leading-relaxed">Hand-sewn by master tailors in Paris with bespoke fitting sessions for each private client.</p>
        </div>
        <div class="p-8 border border-maison-border bg-white flex flex-col justify-between">
          <h3 class="text-2xl font-serif text-[#111111] mb-2">Mulberry Silk & Fine Leather</h3>
          <p class="text-xs text-maison-muted leading-relaxed">Sourced exclusively from certified historic tanneries and silk mills in Como and Lyon.</p>
        </div>
        <div class="p-8 border border-maison-border bg-white flex flex-col justify-between">
          <h3 class="text-2xl font-serif text-[#111111] mb-2">Limited Edition Runs</h3>
          <p class="text-xs text-maison-muted leading-relaxed">Only 50 numbered pieces per design produced globally to preserve rarity and heirloom value.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Global Flagship Boutiques -->
  <section id="boutiques" class="py-24 px-6 md:px-12 border-t border-maison-border bg-[#F5F5F5]">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="text-[11px] font-semibold uppercase tracking-[0.25em] text-maison-muted">FLAGSHIP SALONS</div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6 bg-white border border-maison-border">
          <h3 class="text-xl font-serif font-bold text-[#111111] mb-1">Paris Flagship</h3>
          <p class="text-xs text-maison-muted">14 Rue Saint-Honoré, 75001 Paris</p>
        </div>
        <div class="p-6 bg-white border border-maison-border">
          <h3 class="text-xl font-serif font-bold text-[#111111] mb-1">New York Salon</h3>
          <p class="text-xs text-maison-muted">740 Madison Avenue, New York, NY</p>
        </div>
        <div class="p-6 bg-white border border-maison-border">
          <h3 class="text-xl font-serif font-bold text-[#111111] mb-1">Tokyo Ginza</h3>
          <p class="text-xs text-maison-muted">6-7-19 Ginza, Chuo-ku, Tokyo</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 md:px-12 border-t border-maison-border bg-[#111111] text-xs text-[#888888]">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="font-serif tracking-widest text-[#FAFAFA] text-base">MAISON ÉTOILE PARIS</div>
      <div>© 2026 Maison Étoile S.A. Built with PageCraft AI. All rights reserved.</div>
      <div class="flex gap-6 uppercase tracking-widest text-[10px]">
        <a href="#" class="hover:text-white">Instagram</a>
        <a href="#" class="hover:text-white">Press</a>
        <a href="#" class="hover:text-white">Legal</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
