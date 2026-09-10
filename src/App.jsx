import React, { useState, useEffect } from 'react';
import KeySettings from './components/KeySettings';
import PromptInput from './components/PromptInput';
import PreviewPanel from './components/PreviewPanel';
import Home from './components/Home';
import { templates } from './templates';
import { Coffee, Cpu, Terminal, ArrowSquareOut, Check, Database, Trash, RocketLaunch, X, Copy, CheckCircle } from '@phosphor-icons/react';
import { saveUserTemplate, loadUserTemplates, deleteUserTemplate, getFirebaseAuth, loginUser, registerUser, logoutUser } from './utils/firebase';
import { detectAvailablePages, buildStandaloneSubPageHTML } from './utils/multiPage';
import { onAuthStateChanged } from 'firebase/auth';

const parseRelaxedJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    const match = str.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Could not find configuration object details. Please ensure it contains '{ ... }'.");
    
    const block = match[0];
    try {
      const parsed = Function(`return (${block})`)();
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
      throw new Error("Pasted value does not contain a valid configuration object.");
    } catch (evalErr) {
      throw new Error("Failed to parse configuration: " + evalErr.message);
    }
  }
};

const decodeHtmlFromShare = (encoded) => {
  try {
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (e) {
    console.error("Failed to decode share link:", e);
    return null;
  }
};

const lockImageUrls = (html) => {
  if (!html) return html;

  // Infer page theme from title, headers, or body text so fallback is contextual rather than blindly 'tech'
  const inferPageTheme = (rawHtml) => {
    const text = String(rawHtml).slice(0, 4000).toLowerCase();
    if (text.match(/\b(flower|floral|florist|petal|bloom|bouquet|rose|roses|tulip|peony|sunflower|botanical|plant|gardening)\b/)) return 'flowers';
    if (text.match(/\b(restaurant|food|dining|bistro|cuisine|chef|pizza|burger|sushi|culinary|bakery|pastry|dessert|dinner|lunch|steak)\b/)) return 'restaurant';
    if (text.match(/\b(real estate|realtor|property|interior|architecture|villa|apartment|home decor|residence)\b/)) return 'realestate';
    if (text.match(/\b(beauty|spa|salon|skincare|cosmetics|wellness|massage|makeup|facial)\b/)) return 'beauty';
    if (text.match(/\b(pet|pets|dog|dogs|cat|cats|puppy|veterinary|animal|kitten)\b/)) return 'pets';
    if (text.match(/\b(coffee|cafe|café|latte|cappuccino|espresso|roast|roastery|brew|barista)\b/)) return 'coffee';
    if (text.match(/\b(matcha|tea|tea ceremony)\b/)) return 'coffee';
    if (text.match(/\b(fit|fitness|gym|workout|athlete|training|crossfit|yoga)\b/)) return 'fitness';
    if (text.match(/\b(luxur|yacht|penthouse|estate|mansion|villa)\b/)) return 'luxury';
    if (text.match(/\b(fashion|couture|apparel|runway|clothing|boutique)\b/)) return 'fashion';
    if (text.match(/\b(drone|aerial|quadcopter|uav)\b/)) return 'drone';
    if (text.match(/\b(climat|green energy|solar|wind turbine|eco|sustainab)\b/)) return 'climate';
    if (text.match(/\b(health|medic|doctor|clinic|patient|hospital)\b/)) return 'health';
    if (text.match(/\b(fraud|finan|stock|market|crypto|trading|bank|wealth)\b/)) return 'finance';
    if (text.match(/\b(artificial intelligence|\bai\b|neural|deep learning|llm|agent)\b/)) return 'ai';
    if (text.match(/\b(education|school|student|learn|course|academy)\b/)) return 'education';
    return 'flowers'; // Safe warm fallback instead of cold tech hardware
  };

  const pageTheme = inferPageTheme(html);

  // Curated high-resolution Unsplash photo pools organized by category
  // Each category has multiple distinct photo IDs so cards never duplicate
  const photoPools = {
    finance: [
      '1611974789855-9c2a0a7236a3', // Trading chart dark
      '1590283603385-17ffb3a7f29f', // Stock market graph
      '1563986768609-322da13575f3', // Financial analytics
      '1559526324-4b87b5e36e44', // Money digital
      '1642543492481-44e81e3914a7', // Crypto currency
    ],
    ai: [
      '1677442136019-21780efad99a', // AI Brain glowing
      '1618005182384-a83a8bd57fbe', // Abstract neural neon
      '1620712943543-bcc4688e7485', // AI Robot face
      '1634017839464-5c339ebe3cb4', // Deep learning network
      '1676299081847-824916de030a', // Generative AI visual
    ],
    iot: [
      '1581091226825-a6a2a5aee158', // Industrial robotics
      '1581092335397-9583fe92d232', // Factory automation
      '1518770660439-4636190af475', // Circuit board hardware
      '1581092160607-ee22621dd758', // Engineer sensors
      '1563770660941-20978e870e26', // Smart industry
    ],
    education: [
      '1501504905252-473c47e087f8', // Online learning laptop
      '1523240795612-9a054b0db644', // Students collaborating
      '1509062522246-3755977927d7', // Modern classroom
      '1516321318423-f06f85e504b3', // Digital education
      '1503676260728-1c00da094a0b', // Learning technology
    ],
    drone: [
      '1508614589041-895b88991e3e', // Drone flying over city
      '1527977966376-1c8408f9f108', // High-tech quadcopter
      '1473968512647-3e447244af8f', // Drone aerial view
      '1524143986875-3b098d78b363', // Smart drone camera
    ],
    climate: [
      '1497435334941-8c899ee9e8e9', // Solar panels green energy
      '1470071459604-3b5ec3a7fe05', // Earth forest mist
      '1466611653911-95081537e5b7', // Wind turbines
      '1509391365360-2e959784a276', // Sustainability environment
    ],
    health: [
      '1576091160399-112ba8d25d1d', // Doctor digital tablet
      '1579684385127-1ef15d508118', // Healthcare diagnostics
      '1530497610245-94d3c16cda28', // Medical lab research
      '1584515979956-d9f6e5d09982', // Hospital technology
    ],
    security: [
      '1550751827-4bd374c3f58b', // Cyber security glowing lock
      '1563986768494-4dee2763ff3f', // Data protection matrix
      '1510511459019-5dda7724fd87', // Cyber threat monitor
      '1526374965328-7f61d4dc18c5', // Matrix code dark
    ],
    ecommerce: [
      '1556742049-0a67f5d22888', // Online store checkout
      '1472851294608-062f824d29cc', // Modern retail shop
      '1526170375885-4d8ecf77b99f', // Product photography
      '1460925895917-afdab827c52f', // E-commerce analytics
    ],
    logistics: [
      '1586528116311-ad8dd3c8310d', // Modern warehouse
      '1519003722824-194d4455a60c', // Supply chain shipping
      '1578575437130-527eed3abbec', // Delivery freight
    ],
    tech: [
      '1518770660439-4636190af475', // Circuit dark
      '1496181133206-80ce9b88a853', // Laptop coding
      '1497366216548-37526070297c', // Modern tech workspace
      '1550745165-9bc0b252726f', // Retro tech hardware
    ],
    coffee: [
      '1495474472287-4d71bcdd2085', // Pour-over coffee setup
      '1501339847302-ac426a4a7cbb', // Coffee lounge atmosphere
      '1518832553480-cd0e625ed3e6', // Roasting beans
      '1511920170033-f8396924c348', // 9-bar espresso extraction
      '1514432324607-a09d9b4aefdd', // Single origin beans
      '1442512595331-e89e73853f31', // Seattle coffee bar
      '1497636577773-f1231844b336', // Portland coffee shop
      '1554118811-1e0d58224f24', // San Francisco tasting room
      '1447933601403-0c6688de566e', // Roasted beans macro
      '1513442542250-854d436a73f2', // Cafe breakfast
    ],
    americano: [
      '1517701604599-bb29b565090c', // Hot steaming black americano on ceramic saucer
      '1498804103079-a6351b050096', // Cold iced americano with ice cubes in clear glass
      '1510591509098-f4fdc6d0ff04', // Rich golden crema on hot black americano in white mug
      '1559496417-e7f25cb247f3', // Iced long black americano on wooden cafe table
      '1518057111178-44a106bad636', // Artisanal black coffee mug on dark slate
      '1521302200778-33500795e128', // Refreshing iced americano with condensation
      '1561047029-3000c68339ca', // Classic hot black brew in rustic mug
      '1521017432531-fbd92d768814', // Cafe iced americano on sunlit table
    ],
    latte: [
      '1541167760496-1628856ab772', // Barista pouring silky steamed milk latte art
      '1509042239860-f550ce710b93', // Heart latte art foam in cup on saucer
      '1461023058943-07fcbe16d735', // Iced oat latte swirling in tall glass
      '1517256064527-09c73fc73e38', // Hot creamy latte mug on rustic wood
      '1570968915860-54d5c301fa9f', // Iced caramel latte layers
      '1534778101976-62847782c213', // Flat white latte microfoam top-down
      '1577968897966-3d4325b36b61', // Tulip rosette latte art in teal cup
      '1529892485617-25f63cd7b1e9', // Seasonal spiced golden latte
      '1572442388796-11668a67e53d', // Chilled iced latte in glass
      '1589396575653-c09c794ff6a6', // Caramel macchiato latte
      '1507133750040-4a8f57021571', // Velvety latte foam in ceramic cup
      '1536256263959-770b48d82b0a', // Ceremonial matcha latte
    ],
    espresso: [
      '1509785307050-d4066910ec1e', // Espresso pour rich crema
      '1511920170033-f8396924c348', // 9-bar espresso extraction
      '1514432324607-a09d9b4aefdd', // Single-origin espresso shot
      '1517701604599-bb29b565090c', // Steaming dark espresso cup
      '1510591509098-f4fdc6d0ff04', // Crema shot top-down view
    ],
    pastry: [
      '1555507036-ab1f4038808a', // Fresh buttery croissant
      '1509440159596-0249088772ff', // Bakery artisan loaves & pastries
      '1588195538326-c5b1e9f80a1b', // Cafe cake pastry
    ],
    fitness: [
      '1517838277536-f5f99be501cd', // Gym weights dark
      '1534438327276-14e5300c3a48', // Athlete training
      '1545205597-3d9d02c29597', // Yoga stretch
      '1518310383802-640c2de311b2', // Workout weights
    ],
    luxury: [
      '1567899378494-47b22a2ae96a', // Luxury yacht
      '1512917774080-9991f1c4c750', // Modern architecture villa
      '1503899036084-c55cdd92da26', // Sleek luxury interior
    ],
    fashion: [
      '1490481651871-ab68de25d43d', // Haute couture collection
      '1515886657613-9f3515b0c78f', // High fashion model
      '1539109136881-3be0616acf4b', // Modern editorial style
      '1509631179647-0177331693ae', // Fashion runway
    ],
    flowers: [
      '1561181286-d3fee7d55364', // Pink roses bridal bouquet
      '1526047932273-341f2a7631f9', // Fresh floral arrangement in vase
      '1563245372-f21724e3856d', // Classic deep red roses bouquet
      '1525310072745-f49212b5ac6d', // Peonies pastel bouquet
      '1507290439931-a861b5a38200', // Sunflowers bright summer bouquet
      '1490750967868-88aa4486c946', // Yellow spring blooming flowers
      '1508610048659-a06b669e3321', // Florist workshop flower boutique
      '1518895949257-7621c3c786d7', // Wildflower bouquet rustic
    ],
    restaurant: [
      '1504674900247-0877df9cc836', // Gourmet chef dining plate
      '1555396273-367ea4eb4db5', // Restaurant dining table ambiance
      '1517248135467-4c7edcad34c4', // Cozy modern bistro interior
      '1565299624946-b28f40a0ae38', // Artisan fresh wood-fired pizza
      '1568901346375-23c9450c58cd', // Gourmet craft burger
      '1579871494447-9811cf80d66c', // Fresh Japanese sushi platter
      '1544025162-d76694265947', // Grilled gourmet steak
      '1550547660-d9450f859349', // Craft burger and french fries
    ],
    realestate: [
      '1600585154340-be6161a56a0c', // Modern luxury villa exterior
      '1600596542815-ffad4c1539a9', // Contemporary architecture house
      '1600607687939-ce8a6c25118c', // Minimalist living room interior
      '1600566753376-12c8ab7fb75b', // Designer modern kitchen
      '1600585154526-990dced4db0d', // Poolside luxury patio
    ],
    beauty: [
      '1540555700478-4be289fbecef', // Spa wellness stones
      '1570172619644-dfd03ed5d881', // Skincare serum cosmetics
      '1522337360788-8b13dee7a37e', // Beauty salon hair styling
      '1560750588-73207b1ef5b8', // Organic botanical skincare
      '1515377905703-c4788e51af15', // Relaxing spa wellness bath
    ],
    pets: [
      '1543466835-00a7907e9de1', // Happy golden retriever dog
      '1537151608828-ea2b11777ee8', // Playful puppy outdoor
      '1514888286974-6c03e2ca1dba', // Cute ginger cat portrait
      '1573865526739-10659fec78a5', // Curious kitten pet
    ]
  };

  // Collect all verified, guaranteed-good photo IDs from our curated pools
  const allKnownCuratedPhotoIds = new Set();
  Object.values(photoPools).forEach(p => p.forEach(id => allKnownCuratedPhotoIds.add(id)));

  // Pre-seed seenPhotoIds with all Unsplash images already in the HTML
  const seenPhotoIds = new Set();
  const existingMatches = html.matchAll(/images\.unsplash\.com\/photo-([0-9a-zA-Z-]+)/gi);
  for (const match of existingMatches) {
    seenPhotoIds.add(match[1]);
  }

  // Track all photo IDs assigned during THIS specific pass so no two new cards ever get the same image!
  const usedInThisPass = new Set();
  const categoryUsage = {};

  const getNextPhotoForCategory = (category) => {
    const pool = photoPools[category] || photoPools[pageTheme] || photoPools.tech;

    // Define related fallback pools so if a specific category pool is exhausted, it borrows
    // an unused photo from related categories rather than repeating or showing robots!
    const fallbackPools = [
      pool,
      photoPools[pageTheme] || [],
      photoPools.flowers || [],
      photoPools.restaurant || [],
      photoPools.coffee || [],
      photoPools.beauty || [],
      photoPools.realestate || [],
      photoPools.luxury || [],
      photoPools.fashion || [],
      photoPools.tech || []
    ];
    
    // 1. First priority: Find a photo in the primary pool that has NOT been used anywhere on the page
    let chosenId = pool.find((id) => !seenPhotoIds.has(id) && !usedInThisPass.has(id));

    // 2. Second priority: If primary pool is exhausted, search related pools for any photo not used on page
    if (!chosenId) {
      for (const fPool of fallbackPools) {
        chosenId = fPool.find((id) => !seenPhotoIds.has(id) && !usedInThisPass.has(id));
        if (chosenId) break;
      }
    }

    // 3. Third priority: If every related photo has been used on the page, pick any photo not used in this pass
    if (!chosenId) {
      chosenId = pool.find((id) => !usedInThisPass.has(id));
    }

    // 4. Absolute fallback: rotate through pool with category usage
    if (!chosenId) {
      const count = categoryUsage[category] || 0;
      chosenId = pool[count % pool.length];
      categoryUsage[category] = count + 1;
    }
    
    seenPhotoIds.add(chosenId);
    usedInThisPass.add(chosenId);
    return chosenId;
  };

  // Match keyword to category without false positives from URLs or substrings
  const detectCategory = (altText, srcText, surroundingContext = '') => {
    // Clean src: strip out domain names (e.g. image.pollinations.ai) so ".ai" doesn't trigger AI category!
    let cleanedSrc = String(srcText || '');
    cleanedSrc = cleanedSrc.replace(/^https?:\/\/[^\/]+\//i, '');
    cleanedSrc = decodeURIComponent(cleanedSrc).replace(/[?#].*$/, '').replace(/[-_]/g, ' ');

    const combined = `${altText || ''} ${cleanedSrc} ${surroundingContext || ''}`.toLowerCase();

    // Specific business themes FIRST
    if (combined.match(/\b(flower|floral|florist|petal|bloom|bouquet|rose|roses|tulip|peony|sunflower|botanical|plant|succulent|garden|orchid|hydrangea)\b/)) return 'flowers';
    if (combined.match(/\b(dish|food|menu|dining|cuisine|chef|gourmet|steak|burger|pizza|sushi|pasta|dessert|lunch|dinner|breakfast|bistro|culinary)\b/)) return 'restaurant';
    if (combined.match(/\b(americano|long black|black coffee|iced americano|hot americano)\b/)) return 'americano';
    if (combined.match(/\b(latte|flat white|cappuccino|macchiato|vanilla bean|spiced latte|matcha latte|steamed milk|microfoam|oat milk)\b/)) return 'latte';
    if (combined.match(/\b(espresso|crema|ristretto|espresso shot|doppio)\b/)) return 'espresso';
    if (combined.match(/\b(cold brew|iced coffee|nitro cold brew|nitro oat)\b/)) return 'latte';
    if (combined.match(/\b(croissant|pastry|bakery|bread|cake|scone|cookie)\b/)) return 'pastry';
    if (combined.match(/\b(coffee|cafe|café|brew|brewing|barista|roast|roaster|roastery|beans|pour-?over|cup)\b/)) return 'coffee';
    if (combined.match(/\b(interior|living room|architecture|bedroom|kitchen|villa|estate|patio|residence|realtor|property|real estate)\b/)) return 'realestate';
    if (combined.match(/\b(skincare|cream|serum|spa|salon|cosmetic|facial|lotion|massage|wellness|beauty)\b/)) return 'beauty';
    if (combined.match(/\b(dog|puppy|cat|kitten|pet|pets|veterinar\w*|canine|feline)\b/)) return 'pets';

    // Other categories
    if (combined.match(/\b(fit|fitness|gym|workout|sport|train\w*|athlete|crossfit|yoga|weights?|barbell)\b/)) return 'fitness';
    if (combined.match(/\b(luxur\w*|yacht|villa|penthouse|estate|mansion|jewelry|diamond)\b/)) return 'luxury';
    if (combined.match(/\b(fashion|couture|runway|apparel|outfit|clothing|boutique)\b/)) return 'fashion';
    if (combined.match(/\b(drone|aerial|uav|quadcopter|flight)\b/)) return 'drone';
    if (combined.match(/\b(climat\w*|sustain\w*|green energy|solar|wind turbine|ecolog\w*|environment)\b/)) return 'climate';
    if (combined.match(/\b(health|medic\w*|doctor|diagnos\w*|clinic\w*|patient|hospital)\b/)) return 'health';
    if (combined.match(/\b(secu\w*|cyber\w*|threat|firewall|protect\w*|hacker|encrypt)\b/)) return 'security';
    if (combined.match(/\b(shop|store|e-?com|cart|retail|checkout|buy|product\w*)\b/) && !combined.match(/\b(flower|coffee|pastry|bakery)\b/)) return 'ecommerce';
    if (combined.match(/\b(logistic\w*|supply chain|warehous\w*|cargo|freight|deliver\w*|shipping)\b/)) return 'logistics';
    if (combined.match(/\b(class|learn\w*|educat\w*|school|student|teach\w*|course|academ\w*)\b/)) return 'education';
    if (combined.match(/\b(fraud|finan\w*|stocks?|trading|trader|cryptocurrency|crypto|bank\w*|money|invest\w*|wealth)\b/)) return 'finance';
    if (combined.match(/\b(artificial intelligence|\bai\b|neural network|machine learning|deep learning|robotics?|autonomous agent)\b/)) return 'ai';
    if (combined.match(/\b(iot|sensor|factory|hardware|circuits?|machin\w*|motherboard|microcontroller)\b/)) return 'iot';

    // Contextual fallback: use the whole page's theme instead of blindly defaulting to 'tech'
    return pageTheme || 'flowers';
  };

  // Replace all <img> src tags with instant-loading, high-res Unsplash CDN images
  let updatedHtml = html.replace(
    /<img\b([^>]*?)>/gi,
    (fullTag, attributes, offset) => {
      // Extract alt, src, or surrounding context
      const altMatch = attributes.match(/alt=["']([^"']*)["']/i);
      const srcMatch = attributes.match(/src=["']([^"']*)["']/i);
      
      const altText = altMatch ? altMatch[1] : '';
      const srcText = srcMatch ? srcMatch[1] : '';

      // ONLY preserve an existing Unsplash image if it matches one of our verified, curated library photos.
      // If Gemini hallucinated a random Unsplash ID that 404s, replace it with a verified photo!
      const idMatch = srcText.match(/photo-([0-9a-zA-Z-]+)/i);
      const isKnownCuratedPhoto = idMatch && allKnownCuratedPhotoIds.has(idMatch[1]);
      const isGenericFallback = srcText.includes('photo-1518770660439-4636190af475') && pageTheme !== 'iot' && pageTheme !== 'tech';

      if (isKnownCuratedPhoto && !isGenericFallback) {
        let cleanAttrs = attributes.replace(/\bonerror=["'][^"']*["']/i, '');
        const fallbackId = photoPools[pageTheme]?.[0] || '1561181286-d3fee7d55364';
        cleanAttrs += ` onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-${fallbackId}?auto=format&fit=crop&w=800&q=80';"`;
        return `<img ${cleanAttrs.trim()}>`;
      }
      
      // Extract surrounding card context (up to 250 chars) to catch card headings like <h3>Seasonal Spiced Latte</h3>
      const start = Math.max(0, offset - 120);
      const end = Math.min(html.length, offset + fullTag.length + 220);
      const surroundingContext = html.slice(start, end).replace(/<[^>]+>/g, ' ');

      const category = detectCategory(altText, srcText, surroundingContext);
      const photoId = getNextPhotoForCategory(category);
      const instantUnsplashUrl = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80`;

      // Build updated attributes with new high-res src and fallback
      let cleanAttrs = attributes
        .replace(/\bsrc=["'][^"']*["']/i, `src="${instantUnsplashUrl}"`)
        .replace(/\bonerror=["'][^"']*["']/i, ''); // remove any old onerror
      
      // Ensure alt is present
      if (!altMatch && altText) {
        cleanAttrs += ` alt="${altText}"`;
      }

      // Add fallback onerror handler so image NEVER breaks and matches the site's theme
      cleanAttrs += ` onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80';"`;

      return `<img ${cleanAttrs.trim()}>`;
    }
  );

  return updatedHtml;
};

// Robust Gemini caller with exponential retry and model fallback (gemini-2.5-flash → gemini-2.0-flash → gemini-1.5-flash)
const callGeminiWithFallback = async (apiKey, requestPayload, onStatusUpdate) => {
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  let lastError = null;

  for (let mIndex = 0; mIndex < models.length; mIndex++) {
    const model = models[mIndex];
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        if (attempt > 0 || mIndex > 0) {
          if (onStatusUpdate) onStatusUpdate(`Gemini busy (503). Retrying with ${model}...`);
          await new Promise((r) => setTimeout(r, 1200));
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestPayload)
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
          throw new Error('Gemini returned an empty response. Please try again.');
        }

        const errData = await response.json().catch(() => ({}));
        const errMsg = errData.error?.message || `Status ${response.status}`;

        // 503 (Overloaded / Unavailable), 500, or 429 (Rate limit)
        if (response.status === 503 || response.status === 429 || response.status === 500) {
          lastError = new Error(`Gemini (${model}): ${errMsg}`);
          continue; // retry or fallback to next model
        }

        throw new Error(`Gemini API Error (${model}): ${errMsg}`);
      } catch (err) {
        if (err.message.includes('API key') || err.message.includes('API_KEY_INVALID')) {
          throw err;
        }
        lastError = err;
      }
    }
  }

  throw lastError || new Error('Gemini API is currently overloaded (503). Please retry in a few moments.');
};

export default function App() {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('gemini_api_key') || '';
  });
  
  const [apiProvider, setApiProvider] = useState(() => {
    return localStorage.getItem('api_provider') || 'gemini';
  });

  const [ollamaModel, setOllamaModel] = useState(() => {
    return localStorage.getItem('ollama_model') || 'qwen2.5-coder';
  });

  const [ollamaHost, setOllamaHost] = useState(() => {
    return localStorage.getItem('ollama_host') || 'http://localhost:11434';
  });

  // Proxy settings state
  const [proxyKey, setProxyKey] = useState(() => {
    return localStorage.getItem('proxy_key') || '';
  });

  const [proxyModel, setProxyModel] = useState(() => {
    return localStorage.getItem('proxy_model') || 'gemini-2.5-flash';
  });

  const [proxyHost, setProxyHost] = useState(() => {
    return localStorage.getItem('proxy_host') || 'https://yinli.one/v1';
  });

  const [readerMode, setReaderMode] = useState(false);
  const [view, setView] = useState(() => {
    return localStorage.getItem('pagecraft_view') || 'home';
  });

  // On boot, check if we are loading a shared page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedPage = params.get('page');
    if (sharedPage) {
      const decoded = decodeHtmlFromShare(sharedPage);
      if (decoded) {
        setCode(decoded);
        setReaderMode(true);
      }
    }
  }, []);

  // Ensure window scroll resets to (0,0) whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [view]);

  // Chat Assistant States
  const [activeInputTab, setActiveInputTab] = useState(() => {
    return localStorage.getItem('pagecraft_active_input_tab') || 'generate';
  });
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('pagecraft_chat_messages');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [generating, setGenerating] = useState(false);
  const [code, setCode] = useState(() => {
    return localStorage.getItem('pagecraft_code') || '';
  });
  const [statusText, setStatusText] = useState('Idle');

  // History Stack for Undo/Redo (max 30 states)
  const [history, setHistory] = useState(() => {
    const initialCode = localStorage.getItem('pagecraft_code') || '';
    return initialCode ? [initialCode] : [];
  });
  const [historyIndex, setHistoryIndex] = useState(() => {
    const initialCode = localStorage.getItem('pagecraft_code') || '';
    return initialCode ? 0 : -1;
  });

  const updateCodeWithHistory = (newCode) => {
    if (!newCode || newCode === code) return;
    const currentHist = history.slice(0, historyIndex + 1);
    const newHist = [...currentHist, newCode].slice(-30);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
    setCode(newCode);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCode(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCode(history[newIndex]);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Global Keyboard Shortcuts (Ctrl+Z, Ctrl+Y, Cmd+Z, Cmd+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
      } else if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z')
      ) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  // Targeted Element-Level AI Editing
  const handleEditElement = async (elementHtml, editPromptText) => {
    if (!elementHtml || !editPromptText) return;
    setGenerating(true);
    setStatusText('Editing selected component with AI...');

    const systemInstruction = `You are a professional frontend UI/UX engineer.
You are given a single HTML component/section from a webpage and an edit instruction.
Component to edit:
${elementHtml}

Instruction:
${editPromptText}

CRITICAL RULES:
1. Return ONLY the updated HTML snippet of this component. Do not wrap in <html>, <body>, or markdown explanations.
2. Maintain Tailwind CSS styling and Phosphor icons.
3. For images, use valid high-res Unsplash CDN images (https://images.unsplash.com/photo-...).
Output ONLY the clean HTML inside a single markdown code block starting with \`\`\`html and ending with \`\`\`.`;

    try {
      let resultText = '';
      if (apiProvider === 'ollama') {
        const response = await fetch(`${ollamaHost}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: ollamaModel,
            prompt: `Edit instruction: ${editPromptText}\nComponent:\n${elementHtml}`,
            system: systemInstruction,
            stream: false
          })
        });
        const data = await response.json();
        resultText = data.response || '';
      } else if (apiProvider === 'proxy') {
        const response = await fetch(`${proxyHost}/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${proxyKey}` },
          body: JSON.stringify({
            model: proxyModel,
            messages: [{ role: 'system', content: systemInstruction }, { role: 'user', content: `Edit instruction: ${editPromptText}\nComponent:\n${elementHtml}` }],
            temperature: 0.2
          })
        });
        const data = await response.json();
        resultText = data.choices?.[0]?.message?.content || '';
      } else {
        setStatusText('Connecting to Google Gemini...');
        resultText = await callGeminiWithFallback(apiKey, {
          contents: [{ role: 'user', parts: [{ text: `Edit instruction: ${editPromptText}\nComponent:\n${elementHtml}` }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: { temperature: 0.2, topP: 0.95 }
        }, setStatusText);
      }

      const match = resultText.match(/```html?([\s\S]*?)```/i);
      const updatedSnippet = match ? match[1].trim() : resultText.trim();
      if (updatedSnippet && code.includes(elementHtml)) {
        const newPageCode = lockImageUrls(code.replace(elementHtml, updatedSnippet));
        updateCodeWithHistory(newPageCode);
      }
      setStatusText('Complete');
    } catch (err) {
      console.error('Element edit failed:', err);
      alert(`Element edit failed: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  // AI Text Copilot Rewriter
  const handleRewriteText = async (targetText, instruction) => {
    if (!targetText || !instruction) return targetText;
    setGenerating(true);
    setStatusText('AI Rewriting text...');

    const systemInstruction = `You are a world-class copywriter and UI content strategist.
Given an original text snippet from a website, rewrite it according to the user's requested tone or language.
Return ONLY the rewritten replacement text without quotes, markdown backticks, or explanation.`;

    const userPrompt = `Original text: "${targetText}"\nRewrite instruction: ${instruction}\nRewritten text:`;

    try {
      let resultText = '';
      if (apiProvider === 'ollama') {
        const response = await fetch(`${ollamaHost}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: ollamaModel,
            prompt: userPrompt,
            system: systemInstruction,
            stream: false
          })
        });
        const data = await response.json();
        resultText = data.response || '';
      } else if (apiProvider === 'proxy') {
        const response = await fetch(`${proxyHost}/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${proxyKey}` },
          body: JSON.stringify({
            model: proxyModel,
            messages: [{ role: 'system', content: systemInstruction }, { role: 'user', content: userPrompt }],
            temperature: 0.7
          })
        });
        const data = await response.json();
        resultText = data.choices?.[0]?.message?.content || '';
      } else {
        setStatusText('Connecting to Google Gemini...');
        resultText = await callGeminiWithFallback(apiKey, {
          contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: { temperature: 0.7, topP: 0.95 }
        }, setStatusText);
      }

      const cleanRewritten = resultText.trim().replace(/^["']|["']$/g, '');
      if (cleanRewritten && code.includes(targetText)) {
        const newCode = code.replace(targetText, cleanRewritten);
        updateCodeWithHistory(newCode);
      }
      setStatusText('Complete');
      return cleanRewritten;
    } catch (err) {
      console.error('Text rewrite failed:', err);
      alert(`Rewrite failed: ${err.message}`);
      return targetText;
    } finally {
      setGenerating(false);
    }
  };

  // Persist states across refresh
  useEffect(() => {
    localStorage.setItem('pagecraft_view', view);
  }, [view]);

  useEffect(() => {
    localStorage.setItem('pagecraft_active_input_tab', activeInputTab);
  }, [activeInputTab]);

  useEffect(() => {
    localStorage.setItem('pagecraft_chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('pagecraft_code', code);
  }, [code]);

  // Deploy Live state
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployPlatform, setDeployPlatform] = useState('vercel'); // 'vercel' | 'netlify'
  const [netlifyToken, setNetlifyToken] = useState(() => localStorage.getItem('netlify_token') || '');
  const [vercelToken, setVercelToken] = useState(() => localStorage.getItem('vercel_token') || '');
  const [vercelClientId, setVercelClientId] = useState(() => localStorage.getItem('vercel_client_id') || '');
  const [vercelProjectName, setVercelProjectName] = useState('');
  const [deploying, setDeploying] = useState(false);
  const [deployUrl, setDeployUrl] = useState('');
  const [deployError, setDeployError] = useState('');
  const [urlCopied, setUrlCopied] = useState(false);

  // Catch Vercel OAuth callback code in URL search params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setVercelToken(code);
      localStorage.setItem('vercel_token', code);
      setDeployPlatform('vercel');
      setShowDeployModal(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSaveKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const handleClearKey = () => {
    setApiKey('');
    localStorage.removeItem('gemini_api_key');
  };

  const handleChangeProvider = (provider) => {
    setApiProvider(provider);
    localStorage.setItem('api_provider', provider);
  };

  const handleSaveOllamaSettings = (host, model) => {
    setOllamaHost(host);
    setOllamaModel(model);
    localStorage.setItem('ollama_host', host);
    localStorage.setItem('ollama_model', model);
  };

  const handleSaveProxySettings = (host, model, key) => {
    setProxyHost(host);
    setProxyModel(model);
    setProxyKey(key);
    localStorage.setItem('proxy_host', host);
    localStorage.setItem('proxy_model', model);
    localStorage.setItem('proxy_key', key);
  };

  const handleClearProxySettings = () => {
    setProxyKey('');
    localStorage.removeItem('proxy_key');
  };

  // Firebase configurations & auth state
  const [firebaseConfig, setFirebaseConfig] = useState(() => {
    return localStorage.getItem('firebase_config') || '';
  });
  const [user, setUser] = useState(null);
  const [savedTemplates, setSavedTemplates] = useState([]);

  // Auto-fetch templates when Firebase config and user updates
  useEffect(() => {
    if (firebaseConfig && user) {
      loadUserTemplates(firebaseConfig, user.uid)
        .then(setSavedTemplates)
        .catch(err => console.error("Firestore loading failed:", err));
    } else {
      setSavedTemplates([]);
    }
  }, [firebaseConfig, user]);

  // Monitor Auth state
  useEffect(() => {
    if (!firebaseConfig) {
      setUser(null);
      return;
    }
    try {
      const auth = getFirebaseAuth(firebaseConfig);
      if (auth) {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser);
        });
        return () => unsubscribe();
      }
    } catch (err) {
      console.error("Firebase Auth initialization failed:", err);
    }
  }, [firebaseConfig]);

  const handleSaveFirebaseConfig = (configStr) => {
    try {
      const parsed = parseRelaxedJson(configStr);
      if (!parsed.apiKey || !parsed.projectId) {
        throw new Error("Missing apiKey or projectId in Firebase configuration.");
      }
      const strictJson = JSON.stringify(parsed, null, 2);
      setFirebaseConfig(strictJson);
      localStorage.setItem('firebase_config', strictJson);
    } catch (err) {
      alert("Invalid configuration block: " + err.message);
    }
  };

  const handleClearFirebaseConfig = () => {
    setFirebaseConfig('');
    localStorage.removeItem('firebase_config');
    setUser(null);
    setSavedTemplates([]);
  };

  const handleLogin = async (email, password) => {
    if (!firebaseConfig) return;
    return loginUser(firebaseConfig, email, password);
  };

  const handleRegister = async (email, password) => {
    if (!firebaseConfig) return;
    return registerUser(firebaseConfig, email, password);
  };

  const handleLogout = async () => {
    if (!firebaseConfig) return;
    return logoutUser(firebaseConfig);
  };

  const handleSaveToFirebase = async (name) => {
    if (!firebaseConfig || !user) return;
    const docId = await saveUserTemplate(firebaseConfig, user.uid, name, code);
    const list = await loadUserTemplates(firebaseConfig, user.uid);
    setSavedTemplates(list);
    return docId;
  };

  const handleLoadSavedTemplate = (template) => {
    setCode(template.code);
    setChatMessages([
      { sender: 'ai', text: `Loaded database template: "${template.name}". How would you like me to edit or refine it?` }
    ]);
    setActiveInputTab('chat');
  };

  const handleDeleteSavedTemplate = async (docId) => {
    if (!firebaseConfig || !user) return;
    if (window.confirm("Are you sure you want to delete this template from the database?")) {
      try {
        await deleteUserTemplate(firebaseConfig, docId);
        const list = await loadUserTemplates(firebaseConfig, user.uid);
        setSavedTemplates(list);
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  };

  // Simulate streaming text animation for mock templates
  const simulateStreaming = (targetCode) => {
    setGenerating(true);
    setCode('');
    setStatusText('Planning Design System...');
    
    setTimeout(() => {
      setStatusText('Generating Assets...');
      setTimeout(() => {
        setStatusText('Injecting Tailwind & Scripts...');
        
        let index = 0;
        const step = Math.ceil(targetCode.length / 80); // Increase characters per step for fast render
        const timer = setInterval(() => {
          index += step;
          if (index >= targetCode.length) {
            setCode(targetCode);
            clearInterval(timer);
            setGenerating(false);
            setStatusText('Complete');
          } else {
            setCode(targetCode.slice(0, index));
            setStatusText(`Streaming Code: ${Math.round((index / targetCode.length) * 100)}%`);
          }
        }, 30);
      }, 800);
    }, 800);
  };

  const handleLoadMock = (type) => {
    const mockCode = templates[type];
    if (mockCode) {
      simulateStreaming(mockCode);
      setChatMessages([
        { sender: 'ai', text: `Loaded template: ${type.toUpperCase()}. How would you like me to edit or refine it?` }
      ]);
      setActiveInputTab('chat');
    }
  };

  const handleSelectTemplate = (templateId) => {
    handleLoadMock(templateId);
    setView('builder');
  };

  // Direct Browser call to Gemini API or local Ollama endpoint
  const handleGenerate = async (prompt, stylePreset) => {
    // If provider is gemini but no key is saved, run the simulator fallback
    if (apiProvider === 'gemini' && !apiKey) {
      handleLoadMock('coffee');
      return;
    }
    // If provider is proxy but no key is saved, run the simulator fallback
    if (apiProvider === 'proxy' && !proxyKey) {
      handleLoadMock('coffee');
      return;
    }

    setGenerating(true);
    setCode('');
    setStatusText(
      apiProvider === 'gemini' ? 'Connecting to Google Gemini...' : 
      apiProvider === 'ollama' ? 'Connecting to Local Ollama...' : 
      'Connecting to Custom API Proxy...'
    );

    const systemInstruction = `You are a professional frontend software engineer and web designer. 
Generate a complete, modern, single-file HTML landing page based on the user's description.
Use Tailwind CSS (via CDN <script src="https://cdn.tailwindcss.com"></script>) and Phosphor Icons (via CDN <script src="https://unpkg.com/@phosphor-icons/web"></script>) for styling and iconography.

CRITICAL RULES FOR IMAGES (MUST FOLLOW STRICTLY):
1. NEVER use empty src="", relative paths, or local filenames (e.g. "hero.jpg", "about.png", "card.png").
2. NEVER reuse or duplicate the same image URL across different cards, grid items, or sections. Every single <img> MUST be visually distinct and match its specific topic.
3. ALWAYS use high-resolution contextual photos generated via Pollinations.ai. Include a rich descriptive prompt slug describing the exact subject, with width, height, nologo=true, and a unique seed number.
Format: https://image.pollinations.ai/prompt/{detailed-descriptive-slug}?width=800&height=600&nologo=true&seed={unique_integer}
Examples:
- Flower Shop / Florist: https://image.pollinations.ai/prompt/fresh-pink-roses-blooming-bouquet-florist-shop-natural-sunlight?width=800&height=600&nologo=true&seed=101
- Restaurant / Food: https://image.pollinations.ai/prompt/gourmet-artisan-wood-fired-pizza-fresh-basil-rustic-bistro?width=800&height=600&nologo=true&seed=102
- Real Estate: https://image.pollinations.ai/prompt/modern-luxury-architectural-villa-minimalist-interior-patio?width=800&height=600&nologo=true&seed=103
- Coffee / Cafe: https://image.pollinations.ai/prompt/specialty-pour-over-coffee-brewing-latte-art-cozy-cafe?width=800&height=600&nologo=true&seed=104
- Tech / SaaS: https://image.pollinations.ai/prompt/modern-software-analytics-dashboard-interface-dark-mode?width=800&height=600&nologo=true&seed=105
4. Always provide descriptive alt text for accessibility on all <img> elements.

Output ONLY the clean HTML inside a single markdown code block starting with \`\`\`html and ending with \`\`\`. Do not write conversational text.`;

    try {
      let resultText = '';

      if (apiProvider === 'ollama') {
        const response = await fetch(`${ollamaHost}/api/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: ollamaModel,
            prompt: `User request: ${prompt}. Remember to output ONLY the HTML code enclosed in a \`\`\`html ... \`\`\` code block.`,
            system: systemInstruction,
            stream: false
          })
        });

        if (!response.ok) {
          throw new Error(`Ollama API connection failed. Check if local server is running.`);
        }

        setStatusText('Processing local response...');
        const data = await response.json();
        resultText = data.response || '';
      } else if (apiProvider === 'proxy') {
        // OpenAI format Chat Completions call
        setStatusText(`Sending request to proxy model: ${proxyModel}...`);
        const response = await fetch(`${proxyHost}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${proxyKey}`
          },
          body: JSON.stringify({
            model: proxyModel,
            messages: [
              {
                role: 'system',
                content: systemInstruction
              },
              {
                role: 'user',
                content: `User request: ${prompt}. Remember to output ONLY the HTML code enclosed in a \`\`\`html ... \`\`\` code block.`
              }
            ],
            temperature: 0.2
          })
        });

        if (!response.ok) {
          throw new Error(`API Proxy Error: Status ${response.status}`);
        }

        setStatusText('Processing Proxy Response...');
        const data = await response.json();
        resultText = data.choices?.[0]?.message?.content || '';
      } else {
        // Gemini API call
        setStatusText('Connecting to Google Gemini...');
        resultText = await callGeminiWithFallback(apiKey, {
          contents: [
            {
              role: 'user',
              parts: [{ text: `User request: ${prompt}. Remember to output ONLY the HTML code enclosed in a \`\`\`html ... \`\`\` code block.` }]
            }
          ],
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            temperature: 0.2,
            topP: 0.95
          }
        }, setStatusText);
      }
      
      // Parse markdown HTML code block
      const regex = /```html?([\s\S]*?)```/i;
      const match = resultText.match(regex);
      let finalCode = match ? match[1].trim() : resultText.trim();
      
      if (!finalCode) {
        throw new Error("No code found in model response. Try refining your prompt.");
      }

      setStatusText('Rendering Live Preview...');
      updateCodeWithHistory(lockImageUrls(finalCode));
      setStatusText('Complete');
      
      setChatMessages([
        { sender: 'ai', text: 'I have generated your custom website! Ask me to refine, change colors, or add sections below.' }
      ]);
      setActiveInputTab('chat');
    } catch (error) {
      console.error(error);
      setStatusText(`Error: ${error.message}`);
      alert(`Generation Failed: ${error.message}`);
    } finally {
      setGenerating(false);
    }
  };

  // Chat-based Iterative Editor logic
  const handleSendChatMessage = async (msgText) => {
    const updatedMessages = [...chatMessages, { sender: 'user', text: msgText }];
    setChatMessages(updatedMessages);
    
    // Add pending status indicator bubble
    setChatMessages(prev => [...prev, { sender: 'ai', text: 'Thinking & applying edits...' }]);
    setGenerating(true);
    setStatusText('Reviewing layout structures...');

    const systemInstruction = `You are a professional frontend software engineer and web designer.
You are editing an existing HTML page.
Read the CURRENT_HTML provided and apply the user's requested edit.
Ensure you keep all existing functionality, styles (Tailwind CSS CDN), scripts, and content unless requested to change them.

CRITICAL RULES FOR IMAGES (MUST FOLLOW STRICTLY):
1. PRESERVE EXISTING IMAGES: DO NOT change, replace, or remove existing <img> src URLs unless the user explicitly requested to change that specific image. Keep existing working Unsplash photo URLs intact.
2. If adding new images, NEVER use empty src="", relative paths, or local filenames (e.g. "hero.jpg", "card.png").
3. NEVER reuse or duplicate the same image URL across different cards, grid items, or sections. Every single <img> MUST be visually distinct and match its specific topic.
4. For new images, use a contextual photo URL with a descriptive prompt slug matching the topic, width, height, nologo=true, and a unique seed number.
Format: https://image.pollinations.ai/prompt/{detailed-descriptive-slug}?width=800&height=600&nologo=true&seed={unique_integer}
5. Always provide descriptive alt text for accessibility on all <img> elements.

Return the ENTIRE updated HTML page.
Output ONLY the clean HTML inside a single markdown code block starting with \`\`\`html and ending with \`\`\`. Do not write conversational text.`;

    const editPrompt = `CURRENT_HTML:
${code}

USER_EDIT_REQUEST:
${msgText}`;

    try {
      let resultText = '';

      if (apiProvider === 'ollama') {
        setStatusText(`Connecting to Local Ollama (${ollamaModel})...`);
        const response = await fetch(`${ollamaHost}/api/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: ollamaModel,
            prompt: `User edit request: ${msgText}. Remember to output ONLY the HTML code enclosed in a \`\`\`html ... \`\`\` code block.`,
            system: systemInstruction + `\n\nCURRENT_HTML is:\n${code}`,
            stream: false
          })
        });

        if (!response.ok) {
          throw new Error(`Ollama API connection failed. Check if local server is running.`);
        }

        setStatusText('Processing local response...');
        const data = await response.json();
        resultText = data.response || '';
      } else if (apiProvider === 'proxy') {
        setStatusText(`Sending request to proxy model: ${proxyModel}...`);
        const response = await fetch(`${proxyHost}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${proxyKey}`
          },
          body: JSON.stringify({
            model: proxyModel,
            messages: [
              {
                role: 'system',
                content: systemInstruction
              },
              {
                role: 'user',
                content: editPrompt
              }
            ],
            temperature: 0.2
          })
        });

        if (!response.ok) {
          throw new Error(`API Proxy Error: Status ${response.status}`);
        }

        setStatusText('Processing Proxy Response...');
        const data = await response.json();
        resultText = data.choices?.[0]?.message?.content || '';
      } else {
        // Gemini API call
        setStatusText('Connecting to Google Gemini...');
        resultText = await callGeminiWithFallback(apiKey, {
          contents: [
            {
              role: 'user',
              parts: [{ text: editPrompt }]
            }
          ],
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            temperature: 0.2,
            topP: 0.95
          }
        }, setStatusText);
      }
      
      const regex = /```html?([\s\S]*?)```/i;
      const match = resultText.match(regex);
      let finalCode = match ? match[1].trim() : resultText.trim();
      
      if (!finalCode) {
        throw new Error("No code found in model response. Try refining your request.");
      }

      setStatusText('Rendering Live Preview...');
      updateCodeWithHistory(lockImageUrls(finalCode));
      setStatusText('Complete');
      
      // Update typing state in chat logs
      setChatMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'ai', text: `I have updated the page based on your request: "${msgText}".` }
      ]);
    } catch (error) {
      console.error(error);
      setStatusText(`Error: ${error.message}`);
      setChatMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'ai', text: `Failed to apply changes: ${error.message}` }
      ]);
    } finally {
      setGenerating(false);
    }
  };

  // ── Deploy to Netlify ─────────────────────────────────────────────────────

  // Replace local/relative image src with Unsplash images so they show on the live site
  const sanitizeHtmlForDeploy = (html) => {
    // Map common filename keywords → curated Unsplash photo IDs
    const unsplashMap = {
      coffee: '1495474472287-4d71bcdd2085', espresso: '1509785307050-d4066910ec1e',
      latte: '1541167760496-1628856ab772', cappuccino: '1464979681340-bdd28a61699e',
      croissant: '1555507036-ab794f4ade4e', pastry: '1509440159596-0249088772ff',
      bread: '1509440159596-0249088772ff', cake: '1588195538326-c5b1e9f80a1b',
      brew: '1461023058943-07fcbe16d735', cold: '1461023058943-07fcbe16d735',
      hero: '1495474472287-4d71bcdd2085', bg: '1495474472287-4d71bcdd2085',
      background: '1518770660439-4636190af475', banner: '1518770660439-4636190af475',
      team: '1522071820083-516b3702c6e4', person: '1506794778202-cad84cf45f1d',
      avatar: '1506794778202-cad84cf45f1d', profile: '1506794778202-cad84cf45f1d',
      product: '1526170375885-4d8ecf77b99f', item: '1526170375885-4d8ecf77b99f',
      food: '1512621776951-a57141f2eefd', restaurant: '1414235077428-338989a2e8c0',
      gym: '1517838277536-f5f99be501cd', fitness: '1517838277536-f5f99be501cd',
      sport: '1517838277536-f5f99be501cd', yoga: '1545205597-3d9d02c29597',
      tech: '1518770660439-4636190af475', laptop: '1496181133206-80ce9b88a853',
      office: '1497366216548-37526070297c', work: '1497366216548-37526070297c',
      crypto: '1621761191319-c6fb62004040', bitcoin: '1604594849809-dfedbc827105',
      fashion: '1483985988355-763728e1935b', clothes: '1445205170230-053b83016050',
      luxury: '1567899378494-47b22a2ae96a', yacht: '1567899378494-47b22a2ae96a',
      retro: '1618005182384-a83a8bd57fbe', synth: '1614850715649-1d0106293bd1',
      matcha: '1536256263959-770b48d82b0a', tea: '1556679343-c7306c1976bc',
      kids: '1503676260728-1c00da094a0b', school: '1503676260728-1c00da094a0b',
      portfolio: '1507238691740-187a5b1d37b8', design: '1561070791-2526d30994b5',
      saas: '1551288049-bebda4e38f71', dashboard: '1551288049-bebda4e38f71',
    };

    return html.replace(
      /(<img\b[^>]*?\s)src=(["'])(?!https?:|data:|blob:|\/\/)([^"']+)\2/gi,
      (match, prefix, quote, localPath) => {
        // Extract filename stem and alt text for keyword lookup
        const filename = localPath.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase();

        // Find best matching keyword from the unsplash map
        let photoId = null;
        for (const [kw, id] of Object.entries(unsplashMap)) {
          if (filename.includes(kw)) { photoId = id; break; }
        }

        // Try alt attribute as fallback keyword
        if (!photoId) {
          const altMatch = match.match(/alt=(["'])([^"']+)\1/i);
          if (altMatch) {
            const altWords = altMatch[2].toLowerCase().split(/\s+/);
            for (const word of altWords) {
              for (const [kw, id] of Object.entries(unsplashMap)) {
                if (word.includes(kw) || kw.includes(word)) { photoId = id; break; }
              }
              if (photoId) break;
            }
          }
        }

        // Generic fallback using picsum with filename as seed
        const seed = filename || 'photo';
        const newSrc = photoId
          ? `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80`
          : `https://picsum.photos/seed/${seed}/800/600`;

        return `${prefix}src=${quote}${newSrc}${quote}`;
      }
    );
  };

  const connectVercel = () => {
    if (!vercelClientId.trim()) {
      setDeployError('Please enter your Vercel OAuth Client ID (oac_...) or enter a Vercel Access Token below.');
      return;
    }
    const redirectUri = window.location.origin + window.location.pathname;
    const clientId = vercelClientId.trim();
    const vercelOAuthUrl = `https://vercel.com/oauth/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = vercelOAuthUrl;
  };

  const deployToVercel = async () => {
    if (!code.trim()) {
      setDeployError('No page to deploy. Generate or load a design first.');
      return;
    }
    if (!vercelToken.trim()) {
      setDeployError('Please connect your Vercel account or enter a Vercel Access Token.');
      return;
    }
    setDeploying(true);
    setDeployError('');
    setDeployUrl('');
    try {
      localStorage.setItem('vercel_token', vercelToken.trim());
      setStatusText('Generating multi-page bundle for Vercel...');

      // Detect all available subpages (menu.html, gallery.html, locations.html, origins.html, etc.)
      const availablePages = detectAvailablePages(code);

      // Build file array containing index.html and all standalone subpages
      const filesToDeploy = [
        {
          file: 'index.html',
          data: sanitizeHtmlForDeploy(code)
        }
      ];

      availablePages.forEach(page => {
        if (page.id !== 'index.html') {
          const subPageHtml = buildStandaloneSubPageHTML(code, page.id);
          filesToDeploy.push({
            file: page.id,
            data: sanitizeHtmlForDeploy(subPageHtml)
          });
        }
      });

      setStatusText(`Deploying ${filesToDeploy.length} pages to Vercel...`);

      const rawProj = vercelProjectName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const projName = rawProj || `uix-site-${Math.floor(Math.random() * 100000)}`;

      const res = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vercelToken.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: projName,
          files: filesToDeploy,
          projectSettings: {
            framework: null
          },
          target: 'production'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || data.message || `Vercel deployment failed (${res.status})`);
      }

      // Use production alias domain (public) over preview hash domain (which requires Vercel login)
      let publicDomain = `https://${projName}.vercel.app`;
      if (data.alias && data.alias.length > 0) {
        const alias = data.alias[0];
        publicDomain = alias.startsWith('http') ? alias : `https://${alias}`;
      }

      // Attempt to disable Deployment Protection on Vercel project so visitors don't need to log in
      try {
        await fetch(`https://api.vercel.com/v9/projects/${projName}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${vercelToken.trim()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            passwordProtection: null,
            ssoProtection: null
          })
        });
      } catch (e) {
        console.warn("Could not patch Vercel project protection:", e);
      }
      
      setStatusText('Complete');
      setDeployUrl(publicDomain);
    } catch (err) {
      setDeployError(err.message);
    } finally {
      setDeploying(false);
    }
  };

  const deployToNetlify = async () => {
    if (!code.trim()) {
      setDeployError('No page to deploy. Generate or load a design first.');
      return;
    }
    if (!netlifyToken.trim()) {
      setDeployError('Please enter your Netlify Personal Access Token.');
      return;
    }
    setDeploying(true);
    setDeployError('');
    setDeployUrl('');
    try {
      // Save token for next time
      localStorage.setItem('netlify_token', netlifyToken.trim());
      setStatusText('Generating multi-page bundle for Netlify...');

      // Detect all available subpages (menu.html, gallery.html, locations.html, origins.html, etc.)
      const availablePages = detectAvailablePages(code);
      const encoder = new TextEncoder();
      const token = netlifyToken.trim();

      // Collect all files to deploy
      const filesToUpload = [
        {
          path: '/index.html',
          filePath: 'index.html',
          data: sanitizeHtmlForDeploy(code)
        }
      ];

      availablePages.forEach(page => {
        if (page.id !== 'index.html') {
          const subPageHtml = buildStandaloneSubPageHTML(code, page.id);
          filesToUpload.push({
            path: `/${page.id}`,
            filePath: page.id,
            data: sanitizeHtmlForDeploy(subPageHtml)
          });
        }
      });

      // Compute SHA1 for each page
      const fileDigestMap = {};
      const fileBytesMap = {};

      for (const item of filesToUpload) {
        const bytes = encoder.encode(item.data);
        const hashBuf = await crypto.subtle.digest('SHA-1', bytes);
        const sha1 = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
        fileDigestMap[item.path] = sha1;
        fileBytesMap[item.path] = bytes;
      }

      // 1. Create a new site
      setStatusText('Creating Netlify site...');
      const siteRes = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `pagecraft-${Date.now()}` })
      });
      if (!siteRes.ok) {
        const err = await siteRes.json().catch(() => ({}));
        throw new Error(err.message || `Site creation failed (${siteRes.status})`);
      }
      const site = await siteRes.json();
      const siteId = site.id;
      const siteUrl = site.ssl_url || site.url || `https://${site.name}.netlify.app`;

      // 2. Create deploy — send file digest map for all pages
      setStatusText(`Initialising deploy for ${filesToUpload.length} pages...`);
      const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: fileDigestMap })
      });
      if (!deployRes.ok) {
        const err = await deployRes.json().catch(() => ({}));
        throw new Error(err.message || `Deploy init failed (${deployRes.status})`);
      }
      const deploy = await deployRes.json();
      const deployId = deploy.id;

      // 3. Upload all required files (index.html, menu.html, etc.)
      const requiredHashes = new Set(deploy.required || Object.values(fileDigestMap));
      for (const item of filesToUpload) {
        const sha1 = fileDigestMap[item.path];
        if (requiredHashes.has(sha1)) {
          setStatusText(`Uploading ${item.filePath} to Netlify...`);
          const uploadRes = await fetch(
            `https://api.netlify.com/api/v1/deploys/${deployId}/files${item.path}`,
            {
              method: 'PUT',
              headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/octet-stream' },
              body: fileBytesMap[item.path]
            }
          );
          if (!uploadRes.ok) {
            const err = await uploadRes.json().catch(() => ({}));
            throw new Error(err.message || `File upload failed for ${item.filePath} (${uploadRes.status})`);
          }
        }
      }

      // 4. Poll until deploy state is 'ready'
      setStatusText('Waiting for Netlify to go live...');
      const maxAttempts = 30; // 30 × 2 s = 60 s max
      for (let i = 0; i < maxAttempts; i++) {
        await new Promise(r => setTimeout(r, 2000));
        const statusRes = await fetch(
          `https://api.netlify.com/api/v1/deploys/${deployId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (statusRes.ok) {
          const info = await statusRes.json();
          if (info.state === 'ready' || info.state === 'current') {
            break;
          }
          if (info.state === 'error') {
            throw new Error(`Netlify deploy failed: ${info.error_message || 'unknown error'}`);
          }
        }
      }

      setStatusText('Complete');
      setDeployUrl(siteUrl);
    } catch (err) {
      setDeployError(err.message);
    } finally {
      setDeploying(false);
    }
  };

  const handleCopyUrl = () => {
    if (deployUrl) {
      navigator.clipboard.writeText(deployUrl);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    }
  };

  if (readerMode) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#05070a', overflow: 'hidden' }}>
        {/* Floating Top Banner */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'rgba(9, 11, 17, 0.9)',
          backdropFilter: 'blur(8px)',
          zIndex: 50
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)'
            }}>
              <Cpu size={16} weight="fill" />
            </div>
            <div>
              <h1 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'white' }}>PageCraft AI Shared Layout</h1>
              <p style={{ fontSize: '0.65rem', color: 'var(--color-foreground-muted)' }}>Created with PageCraft AI web builder</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                window.history.replaceState({}, document.title, window.location.pathname);
                setReaderMode(false);
              }}
              className="btn btn-primary cursor-pointer font-bold"
              style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: '8px' }}
            >
              Clone & Edit Design
            </button>
            <button
              onClick={() => {
                window.location.href = window.location.pathname;
              }}
              className="btn btn-secondary cursor-pointer"
              style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
            >
              Open Dashboard
            </button>
          </div>
        </div>

        {/* Live Full Preview Panel */}
        <div style={{ flex: 1, position: 'relative' }}>
          <iframe
            srcDoc={code ? code.replace('</body>', `<script>
              document.addEventListener('click', function(event) {
                var anchor = event.target.closest('a');
                if (anchor) {
                  var href = anchor.getAttribute('href') || '';
                  if (!href) return;
                  event.preventDefault();
                  
                  // External links
                  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
                    window.open(href, '_blank');
                    return;
                  }

                  // Anchor hash or internal .html page navigation
                  var cleanId = href.split('#').pop().split('/').pop().replace(/\\.html$/i, '').toLowerCase().trim();
                  if (cleanId && cleanId !== 'index' && cleanId !== 'home') {
                    var targetElem = document.getElementById(cleanId);
                    if (targetElem) {
                      targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      return;
                    }
                  }

                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }, true);
            </script></body>`) : ''}
            title="Shared PageCraft Preview"
            style={{ width: '100%', height: '100%', border: 'none', backgroundColor: 'white' }}
          />
        </div>
      </div>
    );
  }

  if (view === 'home') {
    return (
      <Home 
        user={user}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        onStartBuilding={() => setView('builder')}
        onSelectTemplate={handleSelectTemplate}
      />
    );
  }

  return (
    <div className="app-grid">
      {/* Decorative ambient lighting glow */}
      <div className="hud-glow glow-cyan"></div>
      <div className="hud-glow glow-indigo"></div>

      {/* Left panel - controls */}
      <aside 
        style={{
          position: 'sticky',
          top: 0,
          borderRight: '1px solid var(--color-border)',
          backgroundColor: 'rgba(15, 18, 29, 0.4)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          height: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto',
          flexShrink: 0,
          zIndex: 30
        }}
      >
        {/* Branding header (Sticky Top inside sidebar) */}
        <div 
          onClick={() => setView('home')} 
          className="cursor-pointer" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            position: 'sticky',
            top: '-24px',
            margin: '-24px -24px -8px -24px',
            padding: '18px 24px',
            backgroundColor: 'rgba(9, 11, 17, 0.98)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--color-border)',
            zIndex: 10
          }}
          title="Back to Landing Page"
        >
          <div 
            style={{
              backgroundColor: 'var(--color-primary-glow)',
              border: '1px solid var(--color-primary)',
              borderRadius: '12px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              boxShadow: '0 0 12px 0 rgba(6, 182, 212, 0.25)'
            }}
          >
            <Cpu size={24} weight="fill" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>PageCraft AI</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-foreground-muted)' }}>Browser-Side Web Generator</p>
          </div>
        </div>

        {/* API / Provider Settings */}
        <KeySettings 
          apiProvider={apiProvider}
          onChangeProvider={handleChangeProvider}
          apiKey={apiKey} 
          onSaveKey={handleSaveKey} 
          onClearKey={handleClearKey}
          ollamaModel={ollamaModel}
          onSaveOllamaSettings={handleSaveOllamaSettings}
          
          proxyKey={proxyKey}
          proxyModel={proxyModel}
          proxyHost={proxyHost}
          onSaveProxySettings={handleSaveProxySettings}
          onClearProxySettings={handleClearProxySettings}

          firebaseConfig={firebaseConfig}
          onSaveFirebaseConfig={handleSaveFirebaseConfig}
          onClearFirebaseConfig={handleClearFirebaseConfig}
          user={user}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onLogout={handleLogout}
        />

        {/* Prompt Input */}
        <PromptInput 
          apiKey={
            apiProvider === 'gemini' ? !!apiKey :
            apiProvider === 'ollama' ? true :
            !!proxyKey
          }
          generating={generating}
          onGenerate={handleGenerate}
          onLoadMock={handleLoadMock}
          activeInputTab={activeInputTab}
          setActiveInputTab={setActiveInputTab}
          chatMessages={chatMessages}
          onSendChatMessage={handleSendChatMessage}
        />

        {/* Console / Status HUD */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Terminal size={14} />
            <span>Workspace Status</span>
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <span 
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: generating ? 'var(--color-primary)' : 'var(--color-accent)',
                boxShadow: generating ? '0 0 8px var(--color-primary)' : '0 0 8px var(--color-accent)',
                display: 'inline-block'
              }}
            ></span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'white' }}>{statusText}</span>
          </div>
        </div>

        {/* Saved Templates Panel */}
        {firebaseConfig && user && (
          <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} weight="fill" color="var(--color-primary)" />
              <span>Saved Database Projects</span>
            </h4>
            
            {savedTemplates.length === 0 ? (
              <p style={{ fontSize: '0.75rem', color: 'var(--color-foreground-muted)', fontStyle: 'italic', padding: '4px 0' }}>
                No templates saved yet. Click "Save to DB" on any page.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {savedTemplates.map((template) => (
                  <div 
                    key={template.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      padding: '6px 8px'
                    }}
                  >
                    <span 
                      onClick={() => handleLoadSavedTemplate(template)}
                      className="cursor-pointer"
                      style={{ 
                        fontSize: '0.8rem', 
                        fontWeight: '600', 
                        color: 'white', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        maxWidth: '120px'
                      }}
                      title="Load design"
                    >
                      {template.name}
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleLoadSavedTemplate(template)}
                        className="cursor-pointer"
                        style={{ border: 'none', background: 'transparent', padding: '2px', color: 'var(--color-primary)', display: 'flex' }}
                        title="Load"
                      >
                        <ArrowSquareOut size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteSavedTemplate(template.id)}
                        className="cursor-pointer"
                        style={{ border: 'none', background: 'transparent', padding: '2px', color: '#EF4444', display: 'flex' }}
                        title="Delete"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Deploy Live Button ──────────────────────────── */}
        {code && (
          <button
            onClick={() => { setShowDeployModal(true); setDeployUrl(''); setDeployError(''); }}
            className="btn cursor-pointer"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '0.85rem',
              fontWeight: 700,
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #7c3aed, #5227FF)',
              border: '1px solid rgba(124, 58, 237, 0.6)',
              borderRadius: '10px',
              color: 'white',
              boxShadow: '0 0 20px rgba(82, 39, 255, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'box-shadow 0.2s, transform 0.15s'
            }}
          >
            <RocketLaunch size={18} weight="fill" />
            Deploy Live
          </button>
        )}
      </aside>

      {/* Right panel - Live Preview and Code */}
      <main style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden', flex: 1, minWidth: 0 }}>
        <PreviewPanel 
          code={code} 
          generating={generating} 
          firebaseConfig={firebaseConfig}
          onSaveToFirebase={handleSaveToFirebase}
          onUpdateCode={updateCodeWithHistory}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onEditElement={handleEditElement}
          onRewriteText={handleRewriteText}
          onOpenDeployModal={(platform = 'vercel') => {
            setDeployPlatform(platform);
            setShowDeployModal(true);
            setDeployUrl('');
            setDeployError('');
          }}
          user={user}
        />
      </main>

      {/* ── Deploy Live Modal ─────────────────────────────────────────────── */}
      {showDeployModal && (
        <div style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(5, 7, 10, 0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            width: '460px',
            backgroundColor: '#0d0f1a',
            border: '1px solid rgba(124, 58, 237, 0.4)',
            borderRadius: '16px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 0 60px rgba(82, 39, 255, 0.2)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RocketLaunch size={22} weight="fill" color="#7c3aed" />
                <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700 }}>Publish Website Live</h3>
              </div>
              <button onClick={() => setShowDeployModal(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '4px' }}>
                <X size={18} />
              </button>
            </div>

            {/* Platform Selector Tabs */}
            <div style={{ display: 'flex', backgroundColor: '#06080d', borderRadius: '10px', padding: '4px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                onClick={() => { setDeployPlatform('vercel'); setDeployError(''); setDeployUrl(''); }}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: deployPlatform === 'vercel' ? '#181b2a' : 'transparent',
                  color: deployPlatform === 'vercel' ? 'white' : '#9ca3af',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 76 65" fill="currentColor"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" /></svg>
                Vercel
              </button>
              <button
                onClick={() => { setDeployPlatform('netlify'); setDeployError(''); setDeployUrl(''); }}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: deployPlatform === 'netlify' ? '#181b2a' : 'transparent',
                  color: deployPlatform === 'netlify' ? 'white' : '#9ca3af',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                <RocketLaunch size={14} color="#00C7B7" />
                Netlify
              </button>
            </div>

            {!deployUrl ? (
              deployPlatform === 'vercel' ? (
                <>
                  <p style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: 1.5, margin: 0 }}>
                    Enter your <strong>Vercel Access Token</strong> to publish your website live.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Vercel Access Token
                      </label>
                      <a
                        href="https://vercel.com/account/tokens"
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: '0.7rem', color: '#a78bfa', textDecoration: 'none' }}
                      >
                        → Get token at vercel.com
                      </a>
                    </div>
                    <input
                      type="password"
                      placeholder="Paste token here..."
                      value={vercelToken}
                      onChange={e => {
                        const val = e.target.value;
                        setVercelToken(val);
                        localStorage.setItem('vercel_token', val);
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: '#06080d',
                        border: '1px solid rgba(124, 58, 237, 0.3)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: 'white',
                        fontSize: '0.82rem',
                        outline: 'none',
                        fontFamily: 'monospace',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Project Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. my-awesome-site"
                      value={vercelProjectName}
                      onChange={e => setVercelProjectName(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#06080d',
                        border: '1px solid rgba(124, 58, 237, 0.3)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: 'white',
                        fontSize: '0.82rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {deployError && (
                    <div style={{ fontSize: '0.78rem', color: '#f87171', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px' }}>
                      {deployError}
                    </div>
                  )}

                  <button
                    onClick={deployToVercel}
                    disabled={deploying || !vercelToken.trim()}
                    className="cursor-pointer"
                    style={{
                      padding: '13px',
                      background: deploying ? 'rgba(124,58,237,0.4)' : '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#000000',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: deploying ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(255,255,255,0.15)',
                      marginTop: '4px'
                    }}
                  >
                    {deploying ? (
                      <>
                        <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(0,0,0,0.3)', borderTopColor: 'black', borderRadius: '50%', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
                        {statusText || 'Publishing to Vercel...'}
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 76 65" fill="#000000"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" /></svg>
                        Publish to Vercel Now
                      </>
                    )}
                  </button>
                </>
              ) : (
                /* Netlify Tab */
                <>
                  <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.5 }}>
                    Enter your <strong style={{ color: '#a78bfa' }}>Netlify Personal Access Token</strong> to publish this page to a live URL instantly. Your token is saved locally.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Netlify Token
                    </label>
                    <input
                      type="password"
                      placeholder="nfp_xxxxxxxxxxxx..."
                      value={netlifyToken}
                      onChange={e => setNetlifyToken(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#06080d',
                        border: '1px solid rgba(124, 58, 237, 0.3)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: 'white',
                        fontSize: '0.82rem',
                        outline: 'none',
                        fontFamily: 'monospace',
                        boxSizing: 'border-box'
                      }}
                    />
                    <a
                      href="https://app.netlify.com/user/applications/personal"
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.7rem', color: '#7c3aed', marginTop: '2px' }}
                    >
                      → Get your token at app.netlify.com
                    </a>
                  </div>

                  {deployError && (
                    <div style={{ fontSize: '0.78rem', color: '#f87171', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px' }}>
                      {deployError}
                    </div>
                  )}

                  <button
                    onClick={deployToNetlify}
                    disabled={deploying || !netlifyToken.trim()}
                    className="cursor-pointer"
                    style={{
                      padding: '13px',
                      background: deploying ? 'rgba(124,58,237,0.4)' : 'linear-gradient(135deg, #7c3aed, #5227FF)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: deploying ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 0 20px rgba(82,39,255,0.3)'
                    }}
                  >
                    {deploying ? (
                      <>
                        <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
                        {statusText || 'Deploying...'}
                      </>
                    ) : (
                      <><RocketLaunch size={16} weight="fill" /> Deploy Now</>
                    )}
                  </button>
                </>
              )
            ) : (
              /* Success State */
              <>
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <CheckCircle size={48} color="#10b981" weight="fill" style={{ marginBottom: '12px' }} />
                  <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '6px' }}>🎉 Live on {deployPlatform === 'vercel' ? 'Vercel' : 'Netlify'}!</h4>
                  <p style={{ color: '#9ca3af', fontSize: '0.82rem' }}>Your page is now live at:</p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#06080d',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '10px',
                  padding: '12px 14px'
                }}>
                  <a
                    href={deployUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ flex: 1, color: '#10b981', fontSize: '0.82rem', wordBreak: 'break-all', fontFamily: 'monospace' }}
                  >
                    {deployUrl}
                  </a>
                  <button
                    onClick={handleCopyUrl}
                    title="Copy URL"
                    className="cursor-pointer"
                    style={{ background: 'none', border: 'none', color: urlCopied ? '#10b981' : '#6b7280', padding: '2px', flexShrink: 0 }}
                  >
                    {urlCopied ? <CheckCircle size={18} weight="fill" /> : <Copy size={18} />}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href={deployUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      flex: 1, padding: '11px', textAlign: 'center',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      borderRadius: '10px', color: 'white',
                      fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                    }}
                  >
                    <ArrowSquareOut size={15} /> Open Live Site
                  </a>
                  <button
                    onClick={() => { setDeployUrl(''); setDeployError(''); }}
                    className="cursor-pointer"
                    style={{
                      flex: 1, padding: '11px', textAlign: 'center',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '10px', color: '#9ca3af',
                      fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer'
                    }}
                  >
                    Deploy Again
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
