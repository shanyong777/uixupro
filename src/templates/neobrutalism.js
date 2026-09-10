export const neobrutalism = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>REBEL // Disruptive Design & Creative Agency</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;700;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Lexend', 'sans-serif'],
            display: ['Space Grotesk', 'sans-serif'],
          },
          colors: {
            rebel: {
              yellow: '#FACC15',
              green: '#4ADE80',
              pink: '#F472B6',
              cyan: '#38BDF8',
              bg: '#FFFBEB'
            }
          }
        }
      }
    }
  </script>
  <style>
    .brutal-card {
      border: 4px solid #000;
      box-shadow: 6px 6px 0px #000;
      transition: all 0.15s ease;
    }
    .brutal-card:hover {
      transform: translate(-3px, -3px);
      box-shadow: 10px 10px 0px #000;
    }
    .brutal-btn {
      border: 4px solid #000;
      box-shadow: 5px 5px 0px #000;
      transition: all 0.1s ease;
    }
    .brutal-btn:active {
      transform: translate(3px, 3px);
      box-shadow: 2px 2px 0px #000;
    }
  </style>
</head>
<body class="bg-[#FFFBEB] text-black font-sans selection:bg-[#FACC15] selection:text-black min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-white border-b-4 border-black h-[68px] flex items-center px-6">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="font-display font-black text-2xl tracking-tighter uppercase bg-rebel-yellow border-2 border-black px-3 py-1 brutal-btn">
        REBEL STUDIO⚡
      </a>

      <nav class="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-wider">
        <a href="#work" class="hover:underline">Works</a>
        <a href="#services" class="hover:underline">Services</a>
        <a href="#contact" class="hover:underline">Contact</a>
      </nav>

      <a href="#contact" class="brutal-btn px-4 py-2 text-xs font-black uppercase text-black bg-rebel-green">
        Hire Us Now
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 flex flex-col items-start gap-6">
        <div class="px-4 py-1.5 bg-rebel-pink border-2 border-black text-xs font-black uppercase tracking-wider">
          💥 WE SHIP WEBSITES THAT CANNOT BE IGNORED
        </div>
        <h1 class="text-5xl sm:text-7xl font-display font-black leading-none text-black">
          BOLD, RAW & UNAPOLOGETIC DIGITAL DESIGN.
        </h1>
        <p class="text-base font-bold leading-relaxed max-w-[48ch]">
          We reject boring corporate templates. We build high-converting brands with maximum visual impact and zero fluff.
        </p>
        <div class="pt-2 flex items-center gap-4">
          <a href="#work" class="brutal-btn px-8 py-4 text-sm font-black uppercase text-black bg-rebel-yellow">
            Explore Portfolio
          </a>
        </div>
      </div>

      <div class="lg:col-span-5">
        <div class="brutal-card bg-rebel-cyan p-8 rounded-none flex flex-col gap-4">
          <div class="text-xs font-black uppercase border-b-4 border-black pb-2">REBEL_MANIFESTO_v2</div>
          <div class="text-2xl font-black font-display uppercase">"Boring design is a business risk."</div>
          <div class="text-xs font-bold">100% Guaranteed Visual Distinction</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t-4 border-black bg-black text-white text-xs font-bold">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>© 2026 REBEL STUDIO. Built with PageCraft AI. All rights reserved.</div>
      <div class="flex gap-6 uppercase">
        <a href="#" class="hover:text-rebel-yellow">Twitter</a>
        <a href="#" class="hover:text-rebel-yellow">Dribbble</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
