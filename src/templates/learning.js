export const learning = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BRIGHTMINDS // Future Scientists & Robotics Academy</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            display: ['Fredoka', 'sans-serif'],
            sans: ['Outfit', 'sans-serif'],
          },
          colors: {
            bright: {
              bg: '#FEFCF6',
              teal: '#0F766E',
              coral: '#C85A32',
              yellow: '#EAB308',
              border: '#F3ECE1'
            }
          }
        }
      }
    }
  </script>
  <style>
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #FEFCF6; }
    ::-webkit-scrollbar-thumb { background: rgba(15, 118, 110, 0.3); border-radius: 4px; }

    .tactile-btn {
      transition: transform 0.15s ease;
    }
    .tactile-btn:active {
      transform: scale(0.97) translateY(1px);
    }
  </style>
</head>
<body class="bg-[#FEFCF6] text-[#2C3E2B] font-sans selection:bg-[#0F766E]/15 min-h-screen flex flex-col justify-between">

  <!-- Header (68px Height Cap) -->
  <header class="sticky top-0 z-50 bg-[#FEFCF6]/90 backdrop-blur-md border-b border-bright-border h-[68px] flex items-center px-6">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
      <a href="#" class="flex items-center gap-2.5 font-display text-2xl font-bold text-bright-teal">
        <div class="w-9 h-9 rounded-2xl bg-bright-coral flex items-center justify-center text-white text-xl">
          <i class="ph-bold ph-[#000] ph-rocket-launch"></i>
        </div>
        <span>BrightMinds<span class="text-bright-coral">.stem</span></span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-xs font-bold font-sans uppercase tracking-wider text-bright-teal">
        <a href="#courses" class="hover:text-bright-coral transition-colors">STEM Courses</a>
        <a href="#robotics" class="hover:text-bright-coral transition-colors">Robotics Lab</a>
        <a href="#teachers" class="hover:text-bright-coral transition-colors">Mentors</a>
      </nav>

      <a href="#enroll" class="tactile-btn px-5 py-2.5 text-xs font-bold text-white bg-bright-teal rounded-full shadow-lg shadow-bright-teal/20">
        Free Trial Class
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 flex flex-col items-start gap-6">
        <div class="px-4 py-1.5 rounded-full bg-bright-coral/10 border border-bright-coral/30 text-xs font-bold text-bright-coral font-display">
          🌟 AGES 6-16 // ROBOTICS, AI & CODING
        </div>

        <h1 class="text-4xl sm:text-6xl font-display font-bold leading-tight text-[#2C3E2B]">
          Inspiring the next generation of <span class="text-bright-coral">inventors & coders</span>.
        </h1>

        <p class="text-slate-600 text-base leading-relaxed max-w-[50ch]">
          Hands-on robotics kits, Python programming, and AI creative labs designed for young inquisitive minds.
        </p>

        <div class="pt-2 flex items-center gap-4">
          <a href="#enroll" class="tactile-btn px-7 py-3.5 text-xs font-bold uppercase text-white bg-bright-coral rounded-full shadow-xl shadow-bright-coral/30 flex items-center gap-2">
            <span>Book Free Workshop</span>
            <i class="ph-bold ph-arrow-right"></i>
          </a>
        </div>
      </div>

      <div class="lg:col-span-5">
        <div class="bg-white p-4 rounded-3xl border-2 border-bright-border shadow-xl">
          <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" alt="Kid Robotics Lab" class="w-full h-[380px] object-cover rounded-2xl">
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-bright-border bg-[#FEFCF6] text-xs text-slate-500">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>© 2026 BrightMinds STEM Academy Inc. Built with PageCraft AI. All rights reserved.</div>
      <div class="flex gap-6 font-bold text-bright-teal">
        <a href="#">Courses</a>
        <a href="#">Safety</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
