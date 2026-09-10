import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';
import { 
  Monitor, 
  DeviceTablet, 
  DeviceMobile, 
  Copy, 
  Download, 
  Code, 
  GlobeSimple, 
  Database, 
  Palette, 
  Moon, 
  Sun, 
  TextT, 
  Check, 
  Sliders,
  FileZip,
  ShareNetwork,
  Gear,
  Sparkle,
  ArrowUUpLeft,
  ArrowUUpRight,
  UploadSimple,
  Shuffle,
  MagicWand,
  X,
  Lightning,
  SquaresFour,
  EnvelopeSimple,
  Translate,
  ChatCircleText,
  Trash,
  DownloadSimple,
  PaperPlaneTilt,
  Funnel,
  User,
  Phone,
  CaretDown,
  Plus
} from '@phosphor-icons/react';
import { sections } from '../templates/sections';
import { detectAvailablePages, buildStandaloneSubPageHTML, cleanEditorArtifacts } from '../utils/multiPage';


// Converts pure HTML/Tailwind to a single-file React component
const convertToReactComponent = (htmlCode) => {
  if (!htmlCode) return '';
  
  try {
    let bodyContent = htmlCode;
    // Extract contents of body if exists
    const bodyMatch = htmlCode.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      bodyContent = bodyMatch[1];
    } else {
      const docClean = htmlCode.replace(/<!DOCTYPE html>|<html>|<head>[\s\S]*?<\/head>|<\/html>/gi, '');
      bodyContent = docClean.trim();
    }
    
    // Ensure all editor-specific tags are cleaned
    bodyContent = cleanEditorArtifacts(bodyContent);

    let jsx = bodyContent;
    
    // Replace class with className
    jsx = jsx.replace(/\bclass=(["'])/g, 'className=$1');
    
    // Replace for with htmlFor
    jsx = jsx.replace(/\bfor=(["'])/g, 'htmlFor=$1');
    
    // Convert style="background-color: red" to React style objects
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
      const rules = styleStr.split(';').filter(rule => rule.trim());
      const styleObj = rules.map(rule => {
        const parts = rule.split(':');
        const prop = parts[0]?.trim();
        const val = parts.slice(1).join(':')?.trim();
        if (!prop || !val) return null;
        const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        return `  ${camelProp}: "${val}"`;
      }).filter(Boolean).join(',\n');
      return `style={{\n${styleObj}\n}}`;
    });

    // Self-close void tags (img, input, br, hr, meta, link)
    const voidTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
    voidTags.forEach(tag => {
      const regex = new RegExp(`<(${tag})\\b([^>]*?)(?<!/)>`, 'gi');
      jsx = jsx.replace(regex, `<$1$2 />`);
    });

    return `import React from 'react';

export default function GeneratedPage() {
  return (
    <div className="w-full min-h-screen">
      ${jsx.split('\n').map(line => '      ' + line).join('\n').trim()}
    </div>
  );
}
`;
  } catch (err) {
    console.error("React translation error:", err);
    return `// Failed to convert to React: ${err.message}\n\n` + htmlCode;
  }
};

// Pre-processes the generated HTML to inject staggered scroll-like entrance animations
const injectStaggeredAnimations = (htmlCode) => {
  if (!htmlCode) return htmlCode;

  const styleTag = `
    <style id="pagecraft-editor-styles">
      /* Smooth instant rendering */
      html {
        scroll-behavior: smooth;
      }
    </style>
    <script id="pagecraft-prevent-navigation">
      (function() {
        function initNavigation() {
          document.addEventListener('click', function(event) {
            var anchor = event.target.closest('a');
            if (!anchor) return;

            var rawHref = anchor.getAttribute('href') || anchor.href || '';
            if (!rawHref) return;

            // Always prevent standard iframe navigation to avoid blank screens
            event.preventDefault();

            // External links
            if (rawHref.indexOf('http://') === 0 || rawHref.indexOf('https://') === 0 || rawHref.indexOf('mailto:') === 0) {
              if (rawHref.indexOf(window.location.hostname) === -1 && rawHref.indexOf('localhost') === -1) {
                window.open(rawHref, '_blank');
                return;
              }
            }

            // Extract target page ID (e.g. "locations", "menu", "origins", "gallery", "index")
            var cleanTarget = rawHref
              .split('#').pop()
              .split('/').pop()
              .replace(/\.html$/i, '')
              .toLowerCase()
              .trim();

            var targetPage = (cleanTarget && cleanTarget !== 'index' && cleanTarget !== 'home') ? (cleanTarget + '.html') : 'index.html';

            // Post message to parent window to switch active page view
            window.parent.postMessage({
              type: 'PAGECRAFT_NAVIGATE_PAGE',
              page: targetPage,
              cleanId: cleanTarget
            }, '*');

          }, true);
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initNavigation);
        } else {
          initNavigation();
        }
      })();
    </script>
    <script id="pagecraft-visual-editor">
      // Enable double-click text editing inside iframe
      document.addEventListener('dblclick', function(event) {
        var editableTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LI'];
        var target = event.target.closest('h1, h2, h3, h4, h5, h6, p, span, a, button, li');
        
        if (target && editableTags.includes(target.tagName)) {
          event.preventDefault();
          target.contentEditable = 'true';
          target.focus();
          
          var originalOutline = target.style.outline;
          var originalOutlineOffset = target.style.outlineOffset;
          target.style.outline = '2px dashed #06b6d4';
          target.style.outlineOffset = '4px';
          
          var originalText = target.innerHTML;
          
          target.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              target.blur();
            }
          });
          
          target.addEventListener('blur', function() {
            target.contentEditable = 'false';
            target.style.outline = originalOutline;
            target.style.outlineOffset = originalOutlineOffset;
            
            if (target.innerHTML !== originalText) {
              window.parent.postMessage({
                type: 'PAGECRAFT_VISUAL_EDIT',
                html: document.documentElement.outerHTML
              }, '*');
            }
          }, { once: true });
          return;
        }

        // Double click image to trigger instant file picker / customizer
        var img = event.target.closest('img');
        if (!img && document.elementsFromPoint) {
          var stack = document.elementsFromPoint(event.clientX, event.clientY);
          for (var i = 0; i < stack.length; i++) {
            if (stack[i].tagName === 'IMG') {
              img = stack[i];
              break;
            }
            if (stack[i].querySelector && stack[i].querySelector('img')) {
              img = stack[i].querySelector('img');
              break;
            }
          }
        }
        if (img) {
          event.preventDefault();
          event.stopPropagation();
          window.parent.postMessage({
            type: 'PAGECRAFT_IMAGE_DBLCLICK',
            src: img.getAttribute('src')
          }, '*');
        }
      }, true);

      // Listen to text selection for AI Copilot
      document.addEventListener('mouseup', function(event) {
        var sel = window.getSelection();
        var selectedText = sel ? sel.toString().trim() : '';
        if (selectedText && selectedText.length > 2) {
          var rect = sel.getRangeAt(0).getBoundingClientRect();
          window.parent.postMessage({
            type: 'PAGECRAFT_TEXT_SELECTED',
            text: selectedText,
            x: rect.left,
            y: rect.top
          }, '*');
        }
      });

      // Enhanced image selector (pierces through overlays, gradients, and card wrappers)
      document.addEventListener('click', function(event) {
        // Alt + Click on any section or container to select for AI editing
        if (event.altKey) {
          var container = event.target.closest('section, header, footer, nav, [id]');
          if (container) {
            event.preventDefault();
            event.stopPropagation();

            var prevOutline = container.style.outline;
            var prevOffset = container.style.outlineOffset;
            container.style.outline = '2px dashed #a855f7';
            container.style.outlineOffset = '4px';
            setTimeout(function() {
              container.style.outline = prevOutline;
              container.style.outlineOffset = prevOffset;
            }, 3000);

            window.parent.postMessage({
              type: 'PAGECRAFT_ELEMENT_SELECT',
              html: container.outerHTML,
              tag: container.tagName.toLowerCase(),
              id: container.id || container.tagName.toLowerCase()
            }, '*');
            return;
          }
        }

        // 1. Check direct img target or ancestor
        var targetImg = event.target.closest('img');

        // 2. If not found, pierce through overlay divs using elementsFromPoint
        if (!targetImg && document.elementsFromPoint) {
          var stack = document.elementsFromPoint(event.clientX, event.clientY);
          for (var i = 0; i < stack.length; i++) {
            var el = stack[i];
            if (el.tagName === 'IMG') {
              targetImg = el;
              break;
            }
            if (el.querySelector && el.querySelector('img')) {
              targetImg = el.querySelector('img');
              break;
            }
            // Check background-image
            var bgStyle = window.getComputedStyle(el).backgroundImage;
            if (bgStyle && bgStyle !== 'none' && bgStyle.indexOf('url(') !== -1) {
              var match = bgStyle.match(/url\(["']?([^"']+)["']?\)/);
              if (match && match[1]) {
                event.preventDefault();
                event.stopPropagation();
                var originalOutline = el.style.outline;
                el.style.outline = '3px solid #10b981';
                el.style.outlineOffset = '2px';
                setTimeout(function() { el.style.outline = originalOutline; }, 1500);

                window.parent.postMessage({
                  type: 'PAGECRAFT_IMAGE_CLICK',
                  src: match[1]
                }, '*');
                return;
              }
            }
          }
        }

        // 3. If target is a card container with an image in it
        if (!targetImg) {
          var card = event.target.closest('.card, .group, [class*="rounded"], [class*="overflow-hidden"], div, article');
          if (card) {
            var nested = card.querySelector('img');
            if (nested) {
              var imgRect = nested.getBoundingClientRect();
              if (event.clientY <= imgRect.bottom + 20) {
                targetImg = nested;
              }
            }
          }
        }

        // Trigger image swapper if found
        if (targetImg) {
          event.preventDefault();
          event.stopPropagation();
          
          var originalOutline = targetImg.style.outline;
          var originalOutlineOffset = targetImg.style.outlineOffset;
          targetImg.style.outline = '3px solid #10b981';
          targetImg.style.outlineOffset = '2px';
          setTimeout(function() {
            targetImg.style.outline = originalOutline;
            targetImg.style.outlineOffset = originalOutlineOffset;
          }, 1500);

          window.parent.postMessage({
            type: 'PAGECRAFT_IMAGE_CLICK',
            src: targetImg.getAttribute('src')
          }, '*');
        }
      }, true);

      // Auto scroll listener
      window.addEventListener('message', function(evt) {
        if (evt.data && evt.data.type === 'PAGECRAFT_SCROLL_TO') {
          var el = document.getElementById(evt.data.targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else if (evt.data && evt.data.type === 'PAGECRAFT_HIGHLIGHT_IMAGE') {
          var targetSrc = evt.data.src;
          var imgs = document.querySelectorAll('img');
          for (var i = 0; i < imgs.length; i++) {
            var s = imgs[i].getAttribute('src') || '';
            var sId = s.match(/photo-[a-zA-Z0-9_-]+/);
            var tId = targetSrc.match(/photo-[a-zA-Z0-9_-]+/);
            if (s === targetSrc || (sId && tId && sId[0] === tId[0])) {
              imgs[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
              imgs[i].style.outline = '3px solid #10b981';
              imgs[i].style.outlineOffset = '3px';
              setTimeout(function(target) {
                target.style.outline = '';
                target.style.outlineOffset = '';
              }, 2500, imgs[i]);
              break;
            }
          }
        } else if (evt.data && evt.data.type === 'PAGECRAFT_SWAP_IMAGE') {
          var targetSrc = evt.data.targetSrc;
          var newSrc = evt.data.newSrc;
          var imgs = document.querySelectorAll('img');
          for (var i = 0; i < imgs.length; i++) {
            var s = imgs[i].getAttribute('src') || '';
            var sId = s.match(/photo-[a-zA-Z0-9_-]+/);
            var tId = targetSrc.match(/photo-[a-zA-Z0-9_-]+/);
            if (s === targetSrc || (sId && tId && sId[0] === tId[0])) {
              imgs[i].src = newSrc;
              imgs[i].setAttribute('src', newSrc);
              imgs[i].style.outline = '4px solid #10b981';
              imgs[i].style.outlineOffset = '2px';
              setTimeout(function(target) {
                target.style.outline = '';
                target.style.outlineOffset = '';
              }, 1800, imgs[i]);
              break;
            }
          }
        } else if (evt.data && evt.data.type === 'PAGECRAFT_REPLACE_TEXT') {
          var oldText = evt.data.oldText;
          var newText = evt.data.newText;
          if (oldText && newText) {
            document.body.innerHTML = document.body.innerHTML.split(oldText).join(newText);
          }
        }
      });
    </script>
  `;

  let processed = htmlCode;
  if (processed.includes('</head>')) {
    processed = processed.replace('</head>', `${styleTag}</head>`);
  } else {
    processed = styleTag + processed;
  }

  return processed;
};

// URL Compression Helper
const encodeHtmlForShare = (html) => {
  try {
    const utf8Bytes = new TextEncoder().encode(html);
    let binary = '';
    const len = utf8Bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    console.error("Failed to encode share link:", e);
    return null;
  }
};



export default function PreviewPanel({ 
  code, 
  generating, 
  firebaseConfig, 
  onSaveToFirebase, 
  onUpdateCode, 
  onOpenDeployModal, 
  user,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  onEditElement,
  onRewriteText
}) {
  const [viewport, setViewport] = useState('desktop'); // desktop, tablet, mobile
  const [activeTab, setActiveTab] = useState('preview'); // preview, code
  const [activePage, setActivePage] = useState('index.html');
  const [copied, setCopied] = useState(false);
  
  // Modals state
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [saving, setSaving] = useState(false);
  
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Export Bundle Modal (HTML vs Vite React App)
  const [showZipModal, setShowZipModal] = useState(false);

  // Targeted Element AI Editing state
  const [selectedElement, setSelectedElement] = useState(null);
  const [elementPrompt, setElementPrompt] = useState('');
  const [elementEditing, setElementEditing] = useState(false);

  // AI Text Copilot state
  const [selectedTextSnippet, setSelectedTextSnippet] = useState(null);
  const [customTonePrompt, setCustomTonePrompt] = useState('');
  const [rewriting, setRewriting] = useState(false);
  const [showTranslateMenu, setShowTranslateMenu] = useState(false);

  // SEO & Meta Tags Modal State
  const [showSeoModal, setShowSeoModal] = useState(false);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [seoOgImage, setSeoOgImage] = useState('');
  const [seoFavicon, setSeoFavicon] = useState('');
  const [seoGaId, setSeoGaId] = useState('');
  const [zipping, setZipping] = useState(false);

  // Customizer options
  const [codeFormat, setCodeFormat] = useState('html'); // html, react
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [activeCustomizerTab, setActiveCustomizerTab] = useState('colors'); // colors, fonts, corners, contrast, sections, images
  
  const [selectedImgSrc, setSelectedImgSrc] = useState('');
  const [customImgUrl, setCustomImgUrl] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const iframeRef = useRef(null);
  const skipNextSrcdocReload = useRef(false);
  const fileInputRef = useRef(null);

  const colors = [
    { id: 'indigo', name: 'Indigo', hex: '#6366f1' },
    { id: 'emerald', name: 'Emerald', hex: '#10b981' },
    { id: 'violet', name: 'Violet', hex: '#8b5cf6' },
    { id: 'rose', name: 'Rose', hex: '#f43f5e' },
    { id: 'amber', name: 'Amber', hex: '#f59e0b' },
    { id: 'cyan', name: 'Cyan', hex: '#06b6d4' },
    { id: 'blue', name: 'Blue', hex: '#3b82f6' }
  ];

  const fonts = [
    { id: 'sans', name: 'Jakarta Sans', fontName: 'Plus Jakarta Sans', fontUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap' },
    { id: 'serif', name: 'Playfair Serif', fontName: 'Playfair Display', fontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap' },
    { id: 'mono', name: 'JetBrains Mono', fontName: 'JetBrains Mono', fontUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap' }
  ];

  const roundnessOpts = [
    { id: 'rounded-none', name: 'Sharp (Neobrutalist)', class: 'rounded-none' },
    { id: 'rounded-lg', name: 'Soft (Standard)', class: 'rounded-lg' },
    { id: 'rounded-3xl', name: 'iOS (Extra Curved)', class: 'rounded-3xl' }
  ];

  const [selectedStockCat, setSelectedStockCat] = useState(0);

  const stockImages = [
    { category: 'AI & Modern Tech', items: [
      { url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80', label: 'AI Brain Neural' },
      { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', label: 'Abstract 3D Waves' },
      { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', label: 'Robotics Robot' },
      { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', label: 'Hardware Circuit' },
      { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80', label: 'Matrix Code Data' },
      { url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80', label: 'SaaS Platform UI' }
    ]},
    { category: 'FinTech & Analytics', items: [
      { url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80', label: 'Trading Chart' },
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', label: 'Financial Growth' },
      { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', label: 'Analytics Dashboard' },
      { url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80', label: 'Global Finance' },
      { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80', label: 'Crypto Blockchain' },
      { url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80', label: 'Security Lock' }
    ]},
    { category: 'Cafe & Culinary', items: [
      { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', label: 'Latte Art' },
      { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', label: 'Espresso Bar' },
      { url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80', label: 'Roasted Beans' },
      { url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80', label: 'Pastry Croissant' },
      { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', label: 'Cozy Cafe Interior' },
      { url: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?auto=format&fit=crop&w=800&q=80', label: 'Healthy Brunch' }
    ]},
    { category: 'Active Fitness', items: [
      { url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80', label: 'Barbell Rack' },
      { url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80', label: 'Workout Weights' },
      { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', label: 'Trainer Athlete' },
      { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', label: 'Yoga Meditation' },
      { url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80', label: 'Running Track' },
      { url: 'https://images.unsplash.com/photo-1637666062717-1c6bcab4a4ed?auto=format&fit=crop&w=800&q=80', label: 'Dumbbell Gym' }
    ]},
    { category: 'Fashion & Luxury', items: [
      { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', label: 'Luxury Wear' },
      { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80', label: 'Shopping Apparel' },
      { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80', label: 'Fashion Portrait' },
      { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', label: 'Jewelry Accessory' },
      { url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80', label: 'Perfume Essence' },
      { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', label: 'Premium Shoes' }
    ]},
    { category: 'E-Commerce & Retail', items: [
      { url: 'https://images.unsplash.com/photo-1566576912321-d58def7a6088?auto=format&fit=crop&w=800&q=80', label: 'Delivery Box' },
      { url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80', label: 'Store Bags' },
      { url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80', label: 'Package Box' },
      { url: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=800&q=80', label: 'Mall Boutique' },
      { url: 'https://images.unsplash.com/photo-1472851294608-062f824d296e?auto=format&fit=crop&w=800&q=80', label: 'Open Sign' },
      { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', label: 'Pay Terminal' }
    ]}
  ];

  // Sync code to iframe srcdoc only when necessary to prevent flashing
  useEffect(() => {
    if (skipNextSrcdocReload.current) {
      skipNextSrcdocReload.current = false;
      return;
    }
    if (iframeRef.current && code && !generating) {
      const pageContent = buildStandaloneSubPageHTML(code, activePage);
      iframeRef.current.srcdoc = injectStaggeredAnimations(pageContent);
    }
  }, [code, generating, activeTab, activePage]);

  // Listen to visual updates & navigation from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data) {
        if (event.data.type === 'PAGECRAFT_VISUAL_EDIT') {
          const rawHtml = event.data.html;
          const cleaned = cleanEditorArtifacts(rawHtml);
          if (onUpdateCode) {
            skipNextSrcdocReload.current = true;
            onUpdateCode(cleaned);
          }
        } else if (event.data.type === 'PAGECRAFT_IMAGE_CLICK') {
          handleSelectPageImage(event.data.src);
          setShowCustomizer(true);
          setActiveCustomizerTab('images');
        } else if (event.data.type === 'PAGECRAFT_IMAGE_DBLCLICK') {
          handleSelectPageImage(event.data.src);
          setShowCustomizer(true);
          setActiveCustomizerTab('images');
          if (fileInputRef.current) {
            setTimeout(() => {
              fileInputRef.current?.click();
            }, 100);
          }
        } else if (event.data.type === 'PAGECRAFT_TEXT_SELECTED') {
          if (event.data.text && event.data.text.length > 2) {
            setSelectedTextSnippet({
              text: event.data.text,
              x: event.data.x,
              y: event.data.y
            });
          }
        } else if (event.data.type === 'PAGECRAFT_ELEMENT_SELECT') {
          setSelectedElement({
            html: event.data.html,
            tag: event.data.tag,
            id: event.data.id
          });
          setElementPrompt('');
        } else if (event.data.type === 'PAGECRAFT_NAVIGATE_PAGE') {
          if (event.data.page) {
            setActivePage(event.data.page);
          }
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [code, onUpdateCode]);

  // Auto-detect template type to pre-filter customizer sections
  useEffect(() => {
    if (code) {
      const lower = code.toLowerCase();
      if (lower.includes('coffee') || lower.includes('cafe') || lower.includes('matcha')) {
        setSelectedIndustry('cafe');
      } else if (lower.includes('gym') || lower.includes('fitness') || lower.includes('workout') || lower.includes('trainer')) {
        setSelectedIndustry('fitness');
      } else if (lower.includes('saas') || lower.includes('dashboard') || lower.includes('metrics') || lower.includes('platform')) {
        setSelectedIndustry('saas');
      } else {
        setSelectedIndustry('all');
      }
    }
  }, [code]);

  const handleApplyRewrite = async (instruction) => {
    if (!selectedTextSnippet || !selectedTextSnippet.text || !onRewriteText) return;
    setRewriting(true);
    try {
      const originalText = selectedTextSnippet.text;
      const rewritten = await onRewriteText(originalText, instruction);
      if (rewritten && rewritten !== originalText) {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage({
            type: 'PAGECRAFT_REPLACE_TEXT',
            oldText: originalText,
            newText: rewritten
          }, '*');
        }
      }
      setSelectedTextSnippet(null);
      setShowTranslateMenu(false);
      setCustomTonePrompt('');
    } catch (err) {
      console.error('Rewrite error:', err);
    } finally {
      setRewriting(false);
    }
  };

  const detectCurrentColor = (html) => {
    if (!html) return 'indigo';
    const colorNames = ['indigo', 'emerald', 'violet', 'rose', 'amber', 'cyan', 'blue', 'green', 'orange', 'red', 'purple', 'sky', 'teal'];
    let maxCount = 0;
    let detected = 'indigo';
    
    colorNames.forEach(c => {
      const regex = new RegExp(`\\b(text|bg|border|from|to|via)-${c}-`, 'g');
      const count = (html.match(regex) || []).length;
      if (count > maxCount) {
        maxCount = count;
        detected = c;
      }
    });
    return detected;
  };

  const handleColorChange = (newColor) => {
    if (!code || !onUpdateCode) return;
    const currentColor = detectCurrentColor(code);
    if (currentColor === newColor) return;
    
    const regex = new RegExp(`\\b${currentColor}-([a-z]+|\\d+)\\b`, 'g');
    const updated = code.replace(regex, `${newColor}-$1`);
    onUpdateCode(updated);
  };

  const handleRoundnessChange = (newRadius) => {
    if (!code || !onUpdateCode) return;
    const regex = /\brounded-(none|sm|md|lg|xl|2xl|3xl)\b/g;
    const updated = code.replace(regex, newRadius);
    onUpdateCode(updated);
  };

  const handleFontChange = (font) => {
    if (!code || !onUpdateCode) return;
    let updated = code;
    
    // Replace font tag link in header
    const fontLinkRegex = /https:\/\/fonts\.googleapis\.com\/css2\?family=[^&"]+/g;
    if (updated.match(fontLinkRegex)) {
      updated = updated.replace(fontLinkRegex, `https://fonts.googleapis.com/css2?family=${font.fontName.replace(/ /g, '+')}`);
    }
    
    // Replace custom tailwind config mapping
    const tailwindFontRegex = /fontFamily:\s*\{\s*([a-zA-Z0-9]+):\s*\[\s*['"][^'"]+['"]/g;
    if (updated.match(tailwindFontRegex)) {
      updated = updated.replace(tailwindFontRegex, (match, familyType) => {
        return `fontFamily: {\n          ${familyType}: ['${font.fontName}'`;
      });
    }
    
    // Replace class designations
    if (font.id === 'serif') {
      updated = updated.replace(/\bfont-sans\b/g, 'font-serif');
      updated = updated.replace(/\bfont-mono\b/g, 'font-serif');
    } else if (font.id === 'mono') {
      updated = updated.replace(/\bfont-sans\b/g, 'font-mono');
      updated = updated.replace(/\bfont-serif\b/g, 'font-mono');
    } else {
      updated = updated.replace(/\bfont-serif\b/g, 'font-sans');
      updated = updated.replace(/\bfont-mono\b/g, 'font-sans');
    }

    onUpdateCode(updated);
  };

  const handleContrastToggle = (isDark) => {
    if (!code || !onUpdateCode) return;
    let updated = code;
    if (isDark) {
      updated = updated.replace(/\bbg-(white|slate-50|gray-50|zinc-50)\b/g, 'bg-slate-900');
      updated = updated.replace(/\btext-(slate-800|slate-900|gray-900|gray-800|zinc-800|zinc-900)\b/g, 'text-slate-100');
      updated = updated.replace(/\bbg-slate-100\b/g, 'bg-slate-800');
      updated = updated.replace(/\btext-slate-500\b/g, 'text-slate-400');
      updated = updated.replace(/\bbg-white\/[a-zA-Z0-9-]+\b/g, 'bg-slate-950/40');
    } else {
      updated = updated.replace(/\bbg-slate-900\b/g, 'bg-white');
      updated = updated.replace(/\btext-slate-100\b/g, 'text-slate-800');
      updated = updated.replace(/\bbg-slate-800\b/g, 'bg-slate-100');
      updated = updated.replace(/\btext-slate-400\b/g, 'text-slate-500');
      updated = updated.replace(/\bbg-slate-950\/[a-zA-Z0-9-]+\b/g, 'bg-white/80');
    }
    onUpdateCode(updated);
  };

  const handleInsertSection = (sectionHtml) => {
    if (!code || !onUpdateCode) return;
    let updated = code;
    
    // Find index of <footer tag and insert before it
    if (updated.includes('<footer')) {
      const index = updated.indexOf('<footer');
      updated = updated.slice(0, index) + sectionHtml + '\n\n' + updated.slice(index);
    } else if (updated.includes('</body>')) {
      updated = updated.replace('</body>', `${sectionHtml}\n</body>`);
    } else {
      updated = updated + '\n\n' + sectionHtml;
    }
    
    onUpdateCode(updated);

    // Smooth scroll to the newly inserted section
    const idMatch = sectionHtml.match(/id=["']([^"']+)["']/i);
    const targetId = idMatch ? idMatch[1] : null;

    if (targetId) {
      setTimeout(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage({
            type: 'PAGECRAFT_SCROLL_TO',
            targetId: targetId
          }, '*');
        }
      }, 300);
    }
  };

  const handleSelectPageImage = (imgSrc) => {
    setSelectedImgSrc(imgSrc);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'PAGECRAFT_HIGHLIGHT_IMAGE',
        src: imgSrc
      }, '*');
    }
  };

  const handleImageSwap = (newSrc) => {
    if (!selectedImgSrc || !code || !onUpdateCode) return;
    
    let updated = code;
    let replaced = false;

    // 1. Direct exact & &amp; encoded replacement
    const rawTarget = selectedImgSrc;
    const ampTarget = selectedImgSrc.replace(/&/g, '&amp;');
    const unampTarget = selectedImgSrc.replace(/&amp;/g, '&');
    const targets = [rawTarget, ampTarget, unampTarget];

    for (const t of targets) {
      if (updated.includes(t)) {
        const esc = t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        updated = updated.replace(new RegExp(esc, 'g'), newSrc);
        replaced = true;
        break;
      }
    }

    // 2. Unsplash Photo ID match (e.g. photo-1611974789855-9c2a0a7236a3)
    if (!replaced) {
      const idMatch = selectedImgSrc.match(/photo-[a-zA-Z0-9_-]+/);
      if (idMatch) {
        const photoId = idMatch[0];
        const srcRegex = new RegExp(`src=["'][^"']*${photoId}[^"']*["']`, 'gi');
        if (srcRegex.test(updated)) {
          updated = updated.replace(srcRegex, `src="${newSrc}"`);
          replaced = true;
        } else {
          const urlRegex = new RegExp(`url\\(\\s*["']?[^"')]*${photoId}[^"')]*["']?\\s*\\)`, 'gi');
          if (urlRegex.test(updated)) {
            updated = updated.replace(urlRegex, `url("${newSrc}")`);
            replaced = true;
          }
        }
      }
    }

    // 3. Fallback: DOM tree replacement for any img matching src
    if (!replaced) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(updated, 'text/html');
        const imgs = doc.querySelectorAll('img');
        for (let img of imgs) {
          const s = img.getAttribute('src') || '';
          const sId = s.match(/photo-[a-zA-Z0-9_-]+/);
          const selId = selectedImgSrc.match(/photo-[a-zA-Z0-9_-]+/);
          if (s === selectedImgSrc || (sId && selId && sId[0] === selId[0])) {
            img.setAttribute('src', newSrc);
            replaced = true;
            break;
          }
        }
        if (replaced) {
          updated = doc.documentElement.outerHTML;
        }
      } catch (err) {
        console.error("DOM image swap fallback error:", err);
      }
    }

    if (replaced) {
      skipNextSrcdocReload.current = true;
      onUpdateCode(updated);
      setSelectedImgSrc(newSrc);
      
      // Send live swap message to iframe
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'PAGECRAFT_SWAP_IMAGE',
          targetSrc: selectedImgSrc,
          newSrc: newSrc
        }, '*');
      }
    } else {
      console.warn("Could not find matching image string in code:", selectedImgSrc);
    }
  };

  const handleLocalImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !selectedImgSrc || !code || !onUpdateCode) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        handleImageSwap(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRollRandomImage = () => {
    if (!selectedImgSrc || !code || !onUpdateCode) return;
    const pool = [
      '1611974789855-9c2a0a7236a3', '1677442136019-21780efad99a', '1618005182384-a83a8bd57fbe',
      '1581091226825-a6a2a5aee158', '1501504905252-473c47e087f8', '1508614589041-895b88991e3e',
      '1497435334941-8c899ee9e8e9', '1576091160399-112ba8d25d1d', '1550751827-4bd374c3f58b',
      '1556742049-0a67f5d22888', '1518770660439-4636190af475', '1495474472287-4d71bcdd2085',
      '1517838277536-f5f99be501cd', '1567899378494-47b22a2ae96a'
    ];
    const randomId = pool[Math.floor(Math.random() * pool.length)];
    const randomSeed = Math.floor(Math.random() * 9000) + 1000;
    const newUrl = `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&w=800&q=80&r=${randomSeed}`;
    handleImageSwap(newUrl);
  };

  const handleApplyElementEdit = async () => {
    if (!selectedElement || !elementPrompt.trim() || !onEditElement) return;
    setElementEditing(true);
    try {
      await onEditElement(selectedElement.html, elementPrompt.trim());
      setSelectedElement(null);
      setElementPrompt('');
    } catch (err) {
      console.error('Element edit error:', err);
    } finally {
      setElementEditing(false);
    }
  };

  const handleDownloadViteZip = async () => {
    if (!code) return;
    setZipping(true);
    try {
      const zip = new JSZip();
      const reactCode = convertToReactComponent(code);

      // 1. package.json
      zip.file('package.json', JSON.stringify({
        name: "pagecraft-vite-app",
        private: true,
        version: "0.0.0",
        type: "module",
        scripts: {
          dev: "vite",
          build: "vite build",
          preview: "vite preview"
        },
        dependencies: {
          react: "^18.3.1",
          "react-dom": "^18.3.1",
          "@phosphor-icons/react": "^2.1.7"
        },
        devDependencies: {
          "@types/react": "^18.3.3",
          "@types/react-dom": "^18.3.0",
          "@vitejs/plugin-react": "^4.3.1",
          autoprefixer: "^10.4.19",
          postcss: "^8.4.38",
          tailwindcss: "^3.4.4",
          vite: "^5.3.4"
        }
      }, null, 2));

      // 2. vite.config.js
      zip.file('vite.config.js', `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n})\n`);

      // 3. tailwind.config.js
      zip.file('tailwind.config.js', `/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    "./index.html",\n    "./src/**/*.{js,ts,jsx,tsx}",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}\n`);

      // 4. postcss.config.js
      zip.file('postcss.config.js', `export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n}\n`);

      // 5. index.html
      zip.file('index.html', `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>PageCraft React App</title>\n    <script src="https://unpkg.com/@phosphor-icons/web"></script>\n    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>\n`);

      // 6. src/main.jsx
      zip.file('src/main.jsx', `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.jsx'\nimport './index.css'\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)\n`);

      // 7. src/index.css
      zip.file('src/index.css', `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nbody {\n  margin: 0;\n  min-height: 100vh;\n}\n`);

      // 8. src/App.jsx
      zip.file('src/App.jsx', reactCode);

      // 9. README.md
      zip.file('README.md', `# PageCraft Vite + React App\n\nGenerated with PageCraft AI.\n\n## Quick Start:\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Build for Production:\n\`\`\`bash\nnpm run build\n\`\`\`\n`);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vite-react-app.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setShowZipModal(false);
    } catch (err) {
      console.error('Failed to export Vite ZIP:', err);
      alert(`Export failed: ${err.message}`);
    } finally {
      setZipping(false);
    }
  };

  const handlePublish = () => {
    if (code) {
      const encoded = encodeHtmlForShare(code);
      const url = `${window.location.origin}${window.location.pathname}?page=${encoded}`;
      setShareUrl(url);
      setShowPublishModal(true);
    }
  };

  const handleCopy = () => {
    if (code) {
      const copyVal = codeFormat === 'react' ? convertToReactComponent(code) : code;
      navigator.clipboard.writeText(copyVal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenSeoModal = () => {
    if (!code) return;
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'text/html');
      
      const titleTag = doc.querySelector('title');
      const descTag = doc.querySelector('meta[name="description"]');
      const ogImgTag = doc.querySelector('meta[property="og:image"]');
      const favTag = doc.querySelector('link[rel="icon"]');

      setSeoTitle(titleTag ? titleTag.textContent : 'PageCraft AI Premium Website');
      setSeoDesc(descTag ? descTag.getAttribute('content') : 'Artisanal single-origin coffee and handcrafted specialty beverages.');
      setSeoOgImage(ogImgTag ? ogImgTag.getAttribute('content') : 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80');
      setSeoFavicon(favTag ? favTag.getAttribute('href') : 'https://fav.farm/🚀');
    } catch (e) {
      console.error('Error reading SEO meta:', e);
    }
    setShowSeoModal(true);
  };

  const handleApplySeo = () => {
    if (!code || !onUpdateCode) return;

    let updatedCode = code;

    const seoBlock = `
  <!-- SEO & Social OpenGraph Meta Tags -->
  <title>${seoTitle || 'PageCraft AI Website'}</title>
  <meta name="description" content="${seoDesc || ''}">
  <meta property="og:title" content="${seoTitle || ''}">
  <meta property="og:description" content="${seoDesc || ''}">
  <meta property="og:image" content="${seoOgImage || ''}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${seoTitle || ''}">
  <meta name="twitter:description" content="${seoDesc || ''}">
  <meta name="twitter:image" content="${seoOgImage || ''}">
  <link rel="icon" href="${seoFavicon || 'https://fav.farm/🚀'}">
  ${seoGaId ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${seoGaId}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${seoGaId}');</script>` : ''}
    `;

    updatedCode = updatedCode.replace(/<title>[\s\S]*?<\/title>/gi, '');
    updatedCode = updatedCode.replace(/<meta name="description"[\s\S]*?>/gi, '');
    updatedCode = updatedCode.replace(/<meta property="og:[\s\S]*?>/gi, '');

    if (updatedCode.includes('<head>')) {
      updatedCode = updatedCode.replace('<head>', `<head>\n${seoBlock}`);
    } else {
      updatedCode = seoBlock + updatedCode;
    }

    onUpdateCode(updatedCode);
    setShowSeoModal(false);
  };

  const handleDownloadZip = async () => {
    if (!code) return;
    setZipping(true);
    try {
      const zip = new JSZip();
      const availablePages = detectAvailablePages(code);

      availablePages.forEach(page => {
        const rawContent = buildStandaloneSubPageHTML(code, page.id);
        const cleanContent = cleanEditorArtifacts(rawContent);
        zip.file(page.id, cleanContent);
      });

      zip.file('README.md', `# Generated Multi-Page Website Project\n\nBuilt with PageCraft AI.\n\n## Pages Included:\n${availablePages.map(p => `- ${p.id}`).join('\n')}\n\n## Quick Deployment:\nUpload all contents to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any HTML web server.\n`);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'multi-page-website.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate ZIP archive:", err);
      alert("Failed to export ZIP file. Please try again.");
    } finally {
      setZipping(false);
    }
  };

  const handleDownload = () => {
    if (code) {
      const blob = new Blob([code], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getViewportStyle = () => {
    switch (viewport) {
      case 'mobile':
        return { width: '375px', height: '640px', borderRadius: '32px', border: '12px solid #27272a' };
      case 'tablet':
        return { width: '768px', height: '1024px', borderRadius: '24px', border: '8px solid #27272a' };
      case 'desktop':
      default:
        return { width: '100%', height: '100%', borderRadius: '0', border: 'none' };
    }
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 40px)', margin: '20px 20px 20px 0', overflow: 'hidden', position: 'relative' }}>

      {/* Header bar (Sticky Top) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'rgba(9, 11, 17, 0.95)',
          backdropFilter: 'blur(16px)'
        }}
      >
        {/* Left tabs: Preview vs Code + Undo/Redo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'var(--bg-deep)', padding: '4px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setActiveTab('preview')}
              className="cursor-pointer"
              style={{
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: '600',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: activeTab === 'preview' ? 'var(--bg-elevated)' : 'transparent',
                color: activeTab === 'preview' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <GlobeSimple size={16} />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className="cursor-pointer"
              style={{
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: '600',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: activeTab === 'code' ? 'var(--bg-elevated)' : 'transparent',
                color: activeTab === 'code' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Code size={16} />
              <span>Source Code</span>
            </button>
          </div>

          {/* Undo / Redo controls */}
          <div style={{ display: 'flex', gap: '2px', backgroundColor: 'var(--bg-deep)', padding: '4px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <button
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo last change (Ctrl+Z)"
              className="cursor-pointer"
              style={{
                padding: '6px 8px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'transparent',
                color: canUndo ? 'white' : 'rgba(255, 255, 255, 0.2)',
                cursor: canUndo ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ArrowUUpLeft size={16} />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo change (Ctrl+Y)"
              className="cursor-pointer"
              style={{
                padding: '6px 8px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'transparent',
                color: canRedo ? 'white' : 'rgba(255, 255, 255, 0.2)',
                cursor: canRedo ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ArrowUUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Center: Viewport controls (Only in preview tab) */}
        {activeTab === 'preview' && (
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-deep)', padding: '4px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            {[
              { id: 'desktop', icon: <Monitor size={18} /> },
              { id: 'tablet', icon: <DeviceTablet size={18} /> },
              { id: 'mobile', icon: <DeviceMobile size={18} /> }
            ].map(vp => (
              <button
                key={vp.id}
                onClick={() => setViewport(vp.id)}
                className="cursor-pointer"
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: viewport === vp.id ? 'var(--bg-elevated)' : 'transparent',
                  color: viewport === vp.id ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
                  display: 'flex'
                }}
              >
                {vp.icon}
              </button>
            ))}
          </div>
        )}

        {/* Center: HTML vs React component toggle (Only in code tab) */}
        {activeTab === 'code' && (
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-deep)', padding: '4px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setCodeFormat('html')}
              className="cursor-pointer"
              style={{
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: codeFormat === 'html' ? 'var(--bg-elevated)' : 'transparent',
                color: codeFormat === 'html' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
              }}
            >
              HTML
            </button>
            <button
              onClick={() => setCodeFormat('react')}
              className="cursor-pointer"
              style={{
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: codeFormat === 'react' ? 'var(--bg-elevated)' : 'transparent',
                color: codeFormat === 'react' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
              }}
            >
              React Component
            </button>
          </div>
        )}

        {/* Right: Actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setShowCustomizer(!showCustomizer)}
            className="btn btn-secondary cursor-pointer"
            style={{ 
              padding: '8px 12px', 
              fontSize: '0.8rem', 
              borderRadius: '8px', 
              border: showCustomizer ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', 
              backgroundColor: showCustomizer ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
              color: showCustomizer ? 'white' : 'var(--color-foreground-muted)',
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px' 
            }}
            disabled={!code}
            title="Customize colors, fonts, corners, images, and insert ready-made sections"
          >
            <Palette size={16} />
            <span>Customize</span>
          </button>
          <button 
            onClick={handleOpenSeoModal}
            className="btn btn-secondary cursor-pointer"
            style={{ padding: '8px 12px', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '6px' }}
            disabled={!code}
            title="Configure SEO title, meta description, OpenGraph share image & favicon"
          >
            <Gear size={16} />
            <span>SEO & Meta</span>
          </button>
          <button 
            onClick={() => {
              if (!firebaseConfig) {
                alert("Please configure your Firebase Database settings in the sidebar first.");
                return;
              }
              if (!user) {
                alert("Please log in or register in the Firebase Database sidebar panel first.");
                return;
              }
              setShowSaveModal(true);
            }}
            className="btn btn-secondary cursor-pointer"
            style={{ padding: '8px 12px', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '6px' }}
            disabled={!code}
          >
            <Database size={16} />
            <span>Save to DB</span>
          </button>
          <button 
            onClick={handlePublish}
            className="btn btn-secondary cursor-pointer"
            style={{ padding: '8px 12px', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '6px' }}
            disabled={!code}
          >
            <GlobeSimple size={16} />
            <span>Publish</span>
          </button>
          <button
            onClick={handleCopy}
            className="btn btn-secondary cursor-pointer"
            style={{ padding: '8px 12px', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
            disabled={!code}
          >
            <Copy size={16} />
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
          <button
            onClick={() => setShowZipModal(true)}
            className="btn btn-primary cursor-pointer"
            style={{ padding: '8px 14px', fontSize: '0.8rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}
            disabled={!code || zipping}
          >
            <FileZip size={16} />
            <span>{zipping ? 'Packaging...' : 'Export Project'}</span>
          </button>
        </div>
      </div>

      {/* Multi-Page Route Switcher Bar (Sticky Top) */}
      {code && activeTab === 'preview' && (
        <div style={{
          position: 'sticky',
          top: '57px',
          zIndex: 45,
          flexShrink: 0,
          backgroundColor: 'rgba(9, 13, 22, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--color-border)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto'
        }}>
          <span style={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
            🌐 Multi-Page Switcher:
          </span>
          {detectAvailablePages(code).map(page => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className="cursor-pointer"
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 600,
                border: activePage === page.id ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.08)',
                backgroundColor: activePage === page.id ? 'rgba(124, 58, 237, 0.25)' : 'rgba(255,255,255,0.03)',
                color: activePage === page.id ? 'white' : '#94a3b8',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{page.icon}</span>
              <span>{page.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Targeted Element AI Edit Floating Banner */}
      {selectedElement && (
        <div style={{
          position: 'sticky',
          top: '97px',
          backgroundColor: 'rgba(15, 17, 26, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(124, 58, 237, 0.4)',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          zIndex: 40,
          flexShrink: 0,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <Sparkle size={16} color="#c084fc" weight="fill" />
            <span style={{ backgroundColor: 'rgba(124, 58, 237, 0.2)', color: '#c084fc', border: '1px solid rgba(124, 58, 237, 0.4)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 700 }}>
              &lt;{selectedElement.tag} #{selectedElement.id}&gt;
            </span>
          </div>
          <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={elementPrompt}
              onChange={(e) => setElementPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleApplyElementEdit(); }}
              placeholder="Describe how AI should edit only this section (e.g. 'Make it a 4-column pricing tier with glowing gradient')..."
              disabled={elementEditing}
              style={{
                flex: 1,
                backgroundColor: '#06080d',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: 'white',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />
            <button
              onClick={handleApplyElementEdit}
              disabled={!elementPrompt.trim() || elementEditing}
              className="btn btn-primary cursor-pointer"
              style={{ padding: '6px 14px', fontSize: '0.78rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
            >
              <MagicWand size={14} />
              <span>{elementEditing ? 'Updating...' : 'Edit with AI'}</span>
            </button>
            <button
              onClick={() => setSelectedElement(null)}
              className="cursor-pointer"
              style={{ border: 'none', backgroundColor: 'transparent', color: '#64748b', padding: '4px' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating AI Text Copilot Bar */}
      {selectedTextSnippet && (
        <div style={{
          position: 'sticky',
          top: '97px',
          backgroundColor: 'rgba(11, 14, 23, 0.96)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(6, 182, 212, 0.4)',
          padding: '8px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          zIndex: 42,
          flexShrink: 0,
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '300px', overflow: 'hidden' }}>
            <MagicWand size={16} color="#22d3ee" weight="fill" />
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>AI Copilot:</span>
            <span style={{ fontSize: '0.72rem', color: 'white', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', backgroundColor: 'rgba(6, 182, 212, 0.15)', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              "{selectedTextSnippet.text}"
            </span>
          </div>

          {/* Quick Tone Action Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleApplyRewrite('Make it punchier, catchy, exciting and high-converting')}
              disabled={rewriting}
              className="btn btn-secondary cursor-pointer"
              style={{ padding: '5px 10px', fontSize: '0.72rem', borderRadius: '6px', gap: '4px' }}
            >
              ⚡ Make Punchy
            </button>
            <button
              onClick={() => handleApplyRewrite('Make it professional, elegant, corporate and authoritative')}
              disabled={rewriting}
              className="btn btn-secondary cursor-pointer"
              style={{ padding: '5px 10px', fontSize: '0.72rem', borderRadius: '6px', gap: '4px' }}
            >
              💼 Professional
            </button>
            <button
              onClick={() => handleApplyRewrite('Shorten and condense into a concise, crisp statement')}
              disabled={rewriting}
              className="btn btn-secondary cursor-pointer"
              style={{ padding: '5px 10px', fontSize: '0.72rem', borderRadius: '6px', gap: '4px' }}
            >
              ✂️ Shorten
            </button>

            {/* Translate Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowTranslateMenu(!showTranslateMenu)}
                disabled={rewriting}
                className="btn btn-secondary cursor-pointer"
                style={{ padding: '5px 10px', fontSize: '0.72rem', borderRadius: '6px', gap: '4px' }}
              >
                <Translate size={13} />
                <span>Translate</span>
                <CaretDown size={11} />
              </button>
              {showTranslateMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  marginTop: '4px',
                  right: 0,
                  backgroundColor: '#0a0d14',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  zIndex: 60,
                  minWidth: '140px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}>
                  {[
                    { label: '🇨🇳 Chinese (Simplified)', prompt: 'Translate accurately into modern natural Chinese (Simplified)' },
                    { label: '🇪🇸 Spanish', prompt: 'Translate accurately into natural Spanish' },
                    { label: '🇫🇷 French', prompt: 'Translate accurately into elegant French' },
                    { label: '🇯🇵 Japanese', prompt: 'Translate accurately into natural polite Japanese' },
                    { label: '🇩🇪 German', prompt: 'Translate accurately into professional German' }
                  ].map((lang, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleApplyRewrite(lang.prompt)}
                      className="cursor-pointer"
                      style={{
                        padding: '6px 10px',
                        fontSize: '0.72rem',
                        textAlign: 'left',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: 'transparent',
                        color: '#cbd5e1'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Prompt Input */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <input
                type="text"
                value={customTonePrompt}
                onChange={(e) => setCustomTonePrompt(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && customTonePrompt.trim()) handleApplyRewrite(customTonePrompt.trim()); }}
                placeholder="Custom tone (e.g. 'Apple style')..."
                disabled={rewriting}
                style={{
                  backgroundColor: '#04060b',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '0.72rem',
                  color: 'white',
                  width: '170px',
                  outline: 'none'
                }}
              />
              <button
                onClick={() => { if (customTonePrompt.trim()) handleApplyRewrite(customTonePrompt.trim()); }}
                disabled={!customTonePrompt.trim() || rewriting}
                className="btn btn-primary cursor-pointer"
                style={{ padding: '5px 10px', fontSize: '0.72rem', borderRadius: '6px' }}
              >
                {rewriting ? 'Rewriting...' : 'Apply'}
              </button>
            </div>

            <button
              onClick={() => setSelectedTextSnippet(null)}
              className="cursor-pointer"
              style={{ border: 'none', backgroundColor: 'transparent', color: '#64748b', padding: '4px', display: 'flex', alignItems: 'center' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main body content & Customizer Split */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden', minHeight: 0 }}>
        
        {/* Preview / Code View Area */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#05070a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: viewport === 'desktop' ? 'stretch' : 'flex-start',
            overflow: 'auto',
            padding: viewport === 'desktop' ? '0' : '24px',
            position: 'relative',
            height: '100%',
            minHeight: 0
          }}
        >
          {activeTab === 'preview' ? (
            code ? (
              <div
                style={{
                  transition: 'var(--transition-smooth)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  position: 'relative',
                  ...getViewportStyle()
                }}
              >
                <iframe
                  key="preview-iframe"
                  ref={iframeRef}
                  title="AI Generated Website Preview"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    backgroundColor: 'white',
                    borderRadius: viewport === 'desktop' ? '0' : '12px'
                  }}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLocalImageUpload}
                  style={{ display: 'none' }}
                />

                {generating && (
                  <>
                    <style>{`
                      @keyframes preview-spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                    `}</style>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(9, 11, 17, 0.85)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '16px',
                      color: 'white',
                      borderRadius: viewport === 'desktop' ? '0' : '12px',
                      zIndex: 10
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(6, 182, 212, 0.1)',
                        borderTop: '3px solid var(--color-primary)',
                        borderRadius: '50%',
                        animation: 'preview-spin 1s linear infinite'
                      }}></div>
                      <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', letterSpacing: '0.05em' }}>
                        RENDERING PREVIEW...
                      </span>
                    </div>
                  </>
                )}

                {/* Reveal Animation Keyframes */}
                <style>{`
                  @keyframes preview-reveal {
                    0% {
                      filter: blur(20px);
                      opacity: 0;
                      transform: scale(0.97);
                    }
                    100% {
                      filter: blur(0);
                      opacity: 1;
                      transform: scale(1);
                    }
                  }
                `}</style>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--color-foreground-muted)', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                <GlobeSimple size={48} weight="thin" color="var(--color-primary)" />
                <p style={{ fontSize: '0.95rem' }}>Your generated live preview will appear here.</p>
                <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Choose a mock template on the left or type a prompt to start!</p>
              </div>
            )
          ) : (
            /* Code view */
            code ? (
              <textarea
                readOnly
                value={codeFormat === 'react' ? convertToReactComponent(code) : code}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#040609',
                  color: '#67e8f9',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.825rem',
                  border: 'none',
                  padding: '24px',
                  outline: 'none',
                  resize: 'none'
                }}
              />
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--color-foreground-muted)', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                <Code size={48} weight="thin" color="var(--color-primary)" />
                <p style={{ fontSize: '0.95rem' }}>No code generated yet.</p>
              </div>
            )
          )}
        </div>

        {/* Live Customizer Side Drawer */}
        {showCustomizer && (
          <div style={{
            width: '340px',
            backgroundColor: '#0c0f1a',
            borderLeft: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 30
          }}>
            {/* Customizer Drawer Header */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Palette size={16} color="var(--color-primary)" weight="fill" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>Design Customizer</span>
              </div>
              <button onClick={() => setShowCustomizer(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {/* Customizer Category Tabs */}
            <div style={{ display: 'flex', overflowX: 'auto', padding: '6px 8px', gap: '4px', borderBottom: '1px solid var(--color-border)', backgroundColor: '#07090f' }}>
              {[
                { id: 'colors', label: 'Color' },
                { id: 'fonts', label: 'Fonts' },
                { id: 'corners', label: 'Radius' },
                { id: 'images', label: 'Images' },
                { id: 'sections', label: '+ Sections' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCustomizerTab(tab.id)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    border: 'none',
                    backgroundColor: activeCustomizerTab === tab.id ? 'var(--bg-elevated)' : 'transparent',
                    color: activeCustomizerTab === tab.id ? 'var(--color-primary)' : '#94a3b8',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Customizer Tab Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* COLORS TAB */}
              {activeCustomizerTab === 'colors' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Theme Accent Palette</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {colors.map(col => (
                      <button
                        key={col.id}
                        onClick={() => handleColorChange(col.id)}
                        className="cursor-pointer"
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.08)',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: col.hex }}></span>
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ marginTop: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Contrast Mode</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleContrastToggle(true)} className="btn btn-secondary cursor-pointer" style={{ flex: 1, padding: '8px', fontSize: '0.75rem', justifyContent: 'center' }}>
                        <Moon size={14} /> Dark
                      </button>
                      <button onClick={() => handleContrastToggle(false)} className="btn btn-secondary cursor-pointer" style={{ flex: 1, padding: '8px', fontSize: '0.75rem', justifyContent: 'center' }}>
                        <Sun size={14} /> Light
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FONTS TAB */}
              {activeCustomizerTab === 'fonts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Typography Pairing</label>
                  {fonts.map(font => (
                    <button
                      key={font.id}
                      onClick={() => handleFontChange(font)}
                      className="cursor-pointer"
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        color: 'white',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                      }}
                    >
                      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{font.name}</span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{font.fontName}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* CORNERS / RADIUS TAB */}
              {activeCustomizerTab === 'corners' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Border Radius Style</label>
                  {roundnessOpts.map(r => (
                    <button
                      key={r.id}
                      onClick={() => handleRoundnessChange(r.class)}
                      className="cursor-pointer"
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textAlign: 'left'
                      }}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              )}

              {/* IMAGE SWAPPER TAB */}
              {activeCustomizerTab === 'images' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Image Swapper</label>
                    <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Click preview or pick below</span>
                  </div>
                  
                  {selectedImgSrc ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', position: 'relative' }}>
                        <img src={selectedImgSrc} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', bottom: '6px', left: '6px', backgroundColor: 'rgba(0,0,0,0.7)', color: '#4ade80', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          ACTIVE TARGET
                        </span>
                      </div>
                      
                      {/* Actions: Roll or Upload */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={handleRollRandomImage} className="btn btn-secondary cursor-pointer" style={{ flex: 1, padding: '8px', fontSize: '0.72rem', justifyContent: 'center' }}>
                          <Shuffle size={14} /> Roll Random
                        </button>
                        <label className="btn btn-secondary cursor-pointer" style={{ flex: 1, padding: '8px', fontSize: '0.72rem', justifyContent: 'center', margin: 0 }}>
                          <UploadSimple size={14} /> Upload File
                          <input type="file" accept="image/*" onChange={handleLocalImageUpload} style={{ display: 'none' }} />
                        </label>
                      </div>

                      {/* Custom Direct URL */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <input
                          type="text"
                          value={customImgUrl}
                          onChange={(e) => setCustomImgUrl(e.target.value)}
                          placeholder="Paste custom image URL..."
                          style={{ flex: 1, backgroundColor: '#04060b', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem' }}
                        />
                        <button onClick={() => { if (customImgUrl.trim()) { handleImageSwap(customImgUrl.trim()); setCustomImgUrl(''); } }} className="btn btn-primary cursor-pointer" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
                          Apply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
                      💡 Click or double-click any photo directly in the preview to select and swap it!
                    </div>
                  )}

                  {/* Stock Image Gallery with Category Selector */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8' }}>Stock Library (1-Click Swap)</span>
                    </div>
                    
                    {/* Category Selector Pills */}
                    <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
                      {stockImages.map((cat, catIdx) => (
                        <button
                          key={catIdx}
                          onClick={() => setSelectedStockCat(catIdx)}
                          style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            border: selectedStockCat === catIdx ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.08)',
                            backgroundColor: selectedStockCat === catIdx ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.03)',
                            color: selectedStockCat === catIdx ? 'white' : '#94a3b8',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {cat.category}
                        </button>
                      ))}
                    </div>

                    {/* Stock Photo Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                      {stockImages[selectedStockCat]?.items.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleImageSwap(item.url)}
                          title={`Click to swap active target with ${item.label}`}
                          className="cursor-pointer"
                          style={{ padding: 0, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden', height: '62px', position: 'relative' }}
                        >
                          <img src={item.url} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <span style={{ position: 'absolute', bottom: 0, insetInline: 0, backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.58rem', padding: '2px 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTIONS TAB */}
              {activeCustomizerTab === 'sections' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>1-Click Section Inserter</label>
                  {sections.map(sec => (
                    <div
                      key={sec.id}
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{sec.name}</span>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-primary)', fontFamily: 'monospace' }}>{sec.group}</span>
                      </div>
                      <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>{sec.desc}</p>
                      <button
                        onClick={() => handleInsertSection(sec.html)}
                        className="btn btn-secondary cursor-pointer"
                        style={{ marginTop: '4px', padding: '6px 10px', fontSize: '0.72rem', justifyContent: 'center' }}
                      >
                        <Plus size={12} /> Insert Section
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* Export Bundle Modal (HTML ZIP vs Vite React App) */}
      {showZipModal && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(9, 11, 17, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 60
        }}>
          <div className="glass-panel" style={{ width: '420px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--color-border)', backgroundColor: '#0c0e16', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileZip size={20} color="var(--color-primary)" />
                <span>Export Project Bundle</span>
              </h4>
              <button onClick={() => setShowZipModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>
            
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.4', margin: 0 }}>
              Select the export format for your generated website:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Option 1: Multi-Page HTML */}
              <button
                onClick={handleDownloadZip}
                disabled={zipping}
                className="cursor-pointer"
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4' }}>
                  <GlobeSimple size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>Multi-Page HTML Bundle (.zip)</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Standalone static HTML/CSS files ready for direct hosting.</div>
                </div>
              </button>

              {/* Option 2: Full Vite + React App */}
              <button
                onClick={handleDownloadViteZip}
                disabled={zipping}
                className="cursor-pointer"
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'rgba(124, 58, 237, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                  <Lightning size={20} weight="fill" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>Full Vite + React Project (.zip)</div>
                  <div style={{ fontSize: '0.7rem', color: '#c084fc' }}>Complete app with package.json, Tailwind, & Vite (npm run dev).</div>
                </div>
              </button>
            </div>

            <button onClick={() => setShowZipModal(false)} className="btn btn-secondary cursor-pointer" style={{ padding: '8px', fontSize: '0.8rem', justifyContent: 'center', marginTop: '4px' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Save Template Modal */}
      {showSaveModal && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(9, 11, 17, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div className="glass-panel" style={{ width: '320px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--color-border)', backgroundColor: '#0c0e16' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Database size={16} color="var(--color-primary)" />
              <span>Save Design to Database</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-foreground-muted)', fontWeight: '600' }}>Template Name</label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g. My Custom Cafe"
                style={{
                  width: '100%',
                  backgroundColor: '#06080d',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  setTemplateName('');
                }}
                className="btn btn-secondary cursor-pointer"
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', borderRadius: '8px', justifyContent: 'center' }}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (templateName.trim()) {
                    setSaving(true);
                    try {
                      await onSaveToFirebase(templateName.trim());
                      setShowSaveModal(false);
                      setTemplateName('');
                    } catch (err) {
                      alert(`Failed to save: ${err.message}`);
                    } finally {
                      setSaving(false);
                    }
                  }
                }}
                className="btn btn-primary cursor-pointer"
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', borderRadius: '8px', justifyContent: 'center' }}
                disabled={!templateName.trim() || saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Shareable Link Modal */}
      {showPublishModal && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(9, 11, 17, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div className="glass-panel" style={{ width: '380px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--color-border)', backgroundColor: '#0c0e16' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GlobeSimple size={16} color="var(--color-primary)" />
              <span>Publish Design to the Web</span>
            </h4>
            <p style={{ fontSize: '0.72rem', color: 'var(--color-foreground-muted)', lineHeight: '1.4' }}>
              Your website has been compiled and is ready to share. Anyone with this link can view your live layout instantly.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-foreground-muted)', fontWeight: '600' }}>Share Link</label>
              <input
                type="text"
                readOnly
                value={shareUrl}
                style={{
                  width: '100%',
                  backgroundColor: '#06080d',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'var(--color-primary)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none'
                }}
                onClick={(e) => e.target.select()}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                onClick={() => setShowPublishModal(false)}
                className="btn btn-secondary cursor-pointer"
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', borderRadius: '8px', justifyContent: 'center' }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert("Share link copied to clipboard!");
                }}
                className="btn btn-secondary cursor-pointer"
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', borderRadius: '8px', justifyContent: 'center' }}
              >
                Copy Link
              </button>
              {onOpenDeployModal && (
                <button
                  onClick={() => {
                    setShowPublishModal(false);
                    onOpenDeployModal('vercel');
                  }}
                  className="btn cursor-pointer"
                  style={{
                    flex: 1.2,
                    padding: '8px',
                    fontSize: '0.8rem',
                    borderRadius: '8px',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    fontWeight: 700,
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 76 65" fill="#000000"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" /></svg>
                  Vercel Live
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SEO & Meta Tags Modal */}
      {showSeoModal && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(9, 11, 17, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 60
        }}>
          <div className="glass-panel" style={{
            width: '520px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            border: '1px solid var(--color-border)',
            backgroundColor: '#0a0d16',
            borderRadius: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gear size={18} color="var(--color-primary)" />
                <span>SEO & Social OpenGraph Settings</span>
              </h4>
              <button onClick={() => setShowSeoModal(false)} className="cursor-pointer" style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>
                Cancel
              </button>
            </div>

            {/* Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Website Title (&lt;title&gt;)</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="e.g. ROAST & GRAIN // Artisanal Coffee Bar"
                  style={{ width: '100%', backgroundColor: '#04060b', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '0.8rem' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Meta Description</label>
                <textarea
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  placeholder="Summarize your website for Google search results..."
                  rows={2}
                  style={{ width: '100%', backgroundColor: '#04060b', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '0.8rem', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Social Share Image URL (og:image)</label>
                <input
                  type="text"
                  value={seoOgImage}
                  onChange={(e) => setSeoOgImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  style={{ width: '100%', backgroundColor: '#04060b', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '0.8rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Favicon Emoji or URL</label>
                  <input
                    type="text"
                    value={seoFavicon}
                    onChange={(e) => setSeoFavicon(e.target.value)}
                    placeholder="https://fav.farm/☕"
                    style={{ width: '100%', backgroundColor: '#04060b', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '0.8rem' }}
                  />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Google Analytics ID (Optional)</label>
                  <input
                    type="text"
                    value={seoGaId}
                    onChange={(e) => setSeoGaId(e.target.value)}
                    placeholder="e.g. G-XXXXXXXXXX"
                    style={{ width: '100%', backgroundColor: '#04060b', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '0.8rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Live Social Share Card Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Social Share Card Live Preview</span>
              <div style={{ backgroundColor: '#111522', border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={seoOgImage || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'} alt="Social Preview" style={{ width: '100%', height: '130px', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'; }} />
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'monospace' }}>MYWEBSITE.COM</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'white' }}>{seoTitle || 'Website Title Preview'}</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: '1.3' }}>{seoDesc || 'Meta description preview for social networks...'}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button onClick={() => setShowSeoModal(false)} className="btn btn-secondary cursor-pointer" style={{ flex: 1, padding: '10px', fontSize: '0.8rem', borderRadius: '8px', justifyContent: 'center' }}>
                Cancel
              </button>
              <button onClick={handleApplySeo} className="btn btn-primary cursor-pointer" style={{ flex: 1, padding: '10px', fontSize: '0.8rem', borderRadius: '8px', justifyContent: 'center' }}>
                Apply & Save SEO Tags
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
