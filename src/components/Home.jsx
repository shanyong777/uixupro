import { useState } from 'react';
import LiquidEther from './LiquidEther';
import { Cpu, GlobeSimple, Database, Sliders, ArrowRight, SignIn, SignOut, UserPlus, Info, CheckCircle, Warning } from '@phosphor-icons/react';

export default function Home({
  user,
  onLogin,
  onRegister,
  onLogout,
  onStartBuilding,
  onSelectTemplate
}) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      if (authMode === 'login') {
        await onLogin(email, password);
      } else {
        await onRegister(email, password);
      }
      setEmail('');
      setPassword('');
      setShowAuthModal(false);
    } catch (err) {
      setAuthError(err.message.replace('Firebase: ', ''));
    } finally {
      setAuthLoading(false);
    }
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthError('');
    setShowAuthModal(true);
  };

  const features = [
    {
      icon: <Cpu size={28} color="var(--color-primary)" />,
      title: "AI Code Generation",
      desc: "Describe your dream landing page in plain text and watch the AI write robust Tailwind CSS code instantly."
    },
    {
      icon: <Sliders size={28} color="var(--color-secondary)" />,
      title: "Visual Theme Customizer",
      desc: "Visually override layout colors, font pairings, corners, and instantly swap stock images with a few clicks."
    },
    {
      icon: <Database size={28} color="var(--color-accent)" />,
      title: "Dynamic Firebase Integration",
      desc: "Connect your own project database credentials to securely sign up users and save your custom designs."
    },
    {
      icon: <GlobeSimple size={28} color="#A855F7" />,
      title: "One-Click Publishing",
      desc: "Instantly publish your compiled static web files to a shareable live preview URL accessible anywhere."
    }
  ];

  const templateCards = [
    {
      id: 'coffee',
      title: 'Cafe Shop',
      tag: 'Warm & Cozy',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80',
      desc: 'Cozy coffee shop menu and reservations page.'
    },
    {
      id: 'saas',
      title: 'SaaS Platform',
      tag: 'SaaS & Tech',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
      desc: 'Clean metrics dashboard, stats charts, and grid layout.'
    },
    {
      id: 'portfolio',
      title: 'Creator Portfolio',
      tag: 'Creative',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80',
      desc: 'Sleek dark portfolio highlighting active dev projects.'
    },
    {
      id: 'fitness',
      title: 'Fitness Gym',
      tag: 'Active',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
      desc: 'Energetic fitness layout with trainer bios and schedules.'
    },
    {
      id: 'matcha',
      title: 'Matcha Lounge',
      tag: 'Minimalist',
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80',
      desc: 'Serene zen design for Japanese tea and mindfulness stores.'
    },
    {
      id: 'chatbot',
      title: 'AI Bot Portal',
      tag: 'Tech & AI',
      image: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=400&q=80',
      desc: 'Tech assistant landing page with a mock chat interface.'
    },
    {
      id: 'crypto',
      title: 'Crypto Wallet',
      tag: 'Finance',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=400&q=80',
      desc: 'Bento-style layout containing live token charts.'
    },
    {
      id: 'fashion',
      title: 'Luxury Fashion',
      tag: 'Showcase',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80',
      desc: 'Clean, elegant product cards for high-end brands.'
    },
    {
      id: 'learning',
      title: "Kid's Academy",
      tag: 'Education',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
      desc: 'Playful color system for classrooms and interactive courses.'
    },
    {
      id: 'cyberpunk',
      title: 'Cyberwear HUD',
      tag: 'Creative',
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=400&q=80',
      desc: 'Vibrant cyberpunk neon portfolio layout.'
    },
    {
      id: 'neobrutalism',
      title: 'Rebel Design Agency',
      tag: 'Neobrutalism',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
      desc: 'Bold borders, sharp shadows, and raw geometries.'
    },
    {
      id: 'minimalist',
      title: 'Nordic Design Studio',
      tag: 'Minimalist',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
      desc: 'Ultra-clean layout emphasizing architecture photography.'
    },
    {
      id: 'luxury',
      title: 'Luxury Yacht Broker',
      tag: 'Luxury',
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=400&q=80',
      desc: 'Sleek black interface for premium rentals and pricing.'
    },
    {
      id: 'retro',
      title: 'Synth Wave Lab',
      tag: 'Retro',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      desc: 'Vaporwave colors featuring cassette store layouts.'
    },
    {
      id: 'flowers',
      title: 'Botanical Floral Studio',
      tag: 'Botanical',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=400&q=80',
      desc: 'Minimalist artisanal flower boutique with balanced photography.'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', height: '100vh', maxHeight: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* LiquidEther — fixed full-page background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Dynamic ambient lighting glows */}
      <div className="hud-glow glow-cyan" style={{ opacity: 0.15, zIndex: 1 }}></div>
      <div className="hud-glow glow-indigo" style={{ opacity: 0.15, right: '10%', top: '20%', zIndex: 1 }}></div>

      {/* Floating Sticky Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(9, 11, 17, 0.75)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '16px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={onStartBuilding}>
          <div style={{
            backgroundColor: 'var(--color-primary-glow)',
            border: '1px solid var(--color-primary)',
            borderRadius: '10px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary)',
            boxShadow: '0 0 10px 0 rgba(6, 182, 212, 0.2)'
          }}>
            <Cpu size={18} weight="fill" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', fontFamily: 'var(--font-heading)' }}>PageCraft AI</span>
        </div>

        <nav style={{ display: 'flex', gap: '32px', fontSize: '0.9rem', fontWeight: 500 }}>
          <a href="#features" className="cursor-pointer" style={{ color: 'var(--color-foreground-muted)', transition: 'var(--transition-quick)' }}>Features</a>
          <a href="#templates" className="cursor-pointer" style={{ color: 'var(--color-foreground-muted)', transition: 'var(--transition-quick)' }}>Templates</a>
          <a href="#about" className="cursor-pointer" style={{ color: 'var(--color-foreground-muted)', transition: 'var(--transition-quick)' }}>About Us</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <>
              <span style={{ fontSize: '0.825rem', color: 'var(--color-foreground-muted)' }}>
                Hello, <strong style={{ color: 'white' }}>{user.email.split('@')[0]}</strong>
              </span>
              <button onClick={onStartBuilding} className="btn btn-primary cursor-pointer" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                Open Dashboard <ArrowRight size={14} />
              </button>
              <button onClick={onLogout} className="btn btn-secondary cursor-pointer" style={{ padding: '8px 12px', fontSize: '0.8rem', minHeight: '36px' }}>
                <SignOut size={16} />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => openAuth('login')} className="btn btn-secondary cursor-pointer" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                <SignIn size={14} /> Sign In
              </button>
              <button onClick={() => openAuth('signup')} className="btn btn-primary cursor-pointer" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                <UserPlus size={14} /> Register
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '120px 80px 80px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          backgroundColor: 'rgba(6, 182, 212, 0.08)',
          border: '1px solid var(--color-primary)',
          borderRadius: '20px',
          padding: '6px 16px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '24px'
        }}>
          <CheckCircle size={14} /> v1.0.0 Now Available with Firebase Integration
        </div>
        
        <h1 style={{
          fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
          fontWeight: 800,
          color: 'white',
          lineHeight: 1.1,
          marginBottom: '20px',
          letterSpacing: '-0.03em'
        }}>
          Build Stunning Websites <br />
          <span style={{
            background: 'linear-gradient(to right, #06B6D4, #6366F1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Instantly with AI
          </span>
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--color-foreground-muted)',
          maxWidth: '700px',
          lineHeight: 1.65,
          marginBottom: '36px'
        }}>
          Design, customize, and publish beautiful landing pages right from your browser window. Power your styling with Tailwind CSS and secure your saves with Firebase.
        </p>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={onStartBuilding} className="btn btn-primary cursor-pointer" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
            Open AI Workspace <ArrowRight size={18} />
          </button>
          <a href="#templates" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
            Browse Preset Designs
          </a>
        </div>

        {/* Mock HUD Dashboard Canvas Showcase */}
        <div style={{
          marginTop: '60px',
          width: '100%',
          maxWidth: '1100px',
          backgroundColor: '#0c0e17',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(6, 182, 212, 0.08)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
          </div>
          <div style={{
            backgroundColor: '#05060a',
            border: '1px solid rgba(255, 255, 255, 0.03)',
            borderRadius: '10px',
            height: '240px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 5, alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', letterSpacing: '0.1em' }}>BUILDER ACTIVE WORKSPACE</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-foreground-muted)', fontStyle: 'italic' }}>Select a template below to see visual layouts rendered instantly.</p>
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              width: '80%',
              height: '160px',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              borderRadius: '8px 8px 0 0',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ height: '14px', width: '30%', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: '4px' }}></div>
              <div style={{ height: '30px', width: '100%', backgroundColor: 'rgba(6, 182, 212, 0.04)', borderRadius: '6px', border: '1px solid var(--color-border)' }}></div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ height: '60px', flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px' }}></div>
                <div style={{ height: '60px', flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px' }}></div>
                <div style={{ height: '60px', flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" style={{
        padding: '100px 80px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.25rem', color: 'white', marginBottom: '12px' }}>Empowered Frontend Crafting</h2>
          <p style={{ color: 'var(--color-foreground-muted)', fontSize: '0.95rem' }}>Visual components built from the ground up for lightning-fast feedback cycles.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          {features.map((feat, index) => (
            <div key={index} className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'white' }}>{feat.title}</h3>
              <p style={{ color: 'var(--color-foreground-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates Catalog Grid Section */}
      <section id="templates" style={{
        padding: '100px 80px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        borderTop: '1px solid var(--color-border)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.25rem', color: 'white', marginBottom: '12px' }}>Explore Professional Designs</h2>
          <p style={{ color: 'var(--color-foreground-muted)', fontSize: '0.95rem' }}>Select a visual theme base, and edit its content dynamically inside the builder.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
          {templateCards.map((t) => (
            <div key={t.id} className="glass-panel" style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '380px',
              position: 'relative'
            }}>
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                <img src={t.image} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)' }} />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(9, 11, 17, 0.85)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-primary)',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}>
                  {t.tag}
                </span>
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '8px' }}>{t.title}</h3>
                  <p style={{ color: 'var(--color-foreground-muted)', fontSize: '0.8rem', lineHeight: '1.4' }}>{t.desc}</p>
                </div>
                <button
                  onClick={() => onSelectTemplate(t.id)}
                  className="btn btn-secondary cursor-pointer"
                  style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '0.8rem',
                    justifyContent: 'center',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  Load Layout Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us section */}
      <section id="about" style={{
        padding: '100px 80px 120px 80px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        borderTop: '1px solid var(--color-border)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '16px' }}>
          <Info size={40} weight="thin" />
        </div>
        <h2 style={{ fontSize: '2.25rem', color: 'white', marginBottom: '16px' }}>About PageCraft AI</h2>
        <p style={{
          color: 'var(--color-foreground-muted)',
          fontSize: '1rem',
          lineHeight: '1.6',
          maxWidth: '720px',
          margin: '0 auto 24px auto'
        }}>
          PageCraft AI is an experimental browser-side compiler designed to democratize web layout designs. By fusing state-of-the-art Large Language Models (like Google Gemini and local Ollama nodes) with real-time browser preview engines, we provide creators with instant coding outputs. Connect your dynamic Firebase credentials to access personal document spaces and catalog your designs.
        </p>
        <button onClick={onStartBuilding} className="btn btn-primary cursor-pointer" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
          Launch Sandbox Workspace
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-border)',
        padding: '30px 40px',
        backgroundColor: '#07090e',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--color-foreground-muted)',
        position: 'relative',
        zIndex: 1
      }}>
        <p>© 2026 PageCraft AI Web Builder. All rights reserved. Created for premium visual frontend development.</p>
      </footer>

      {/* AUTH MODAL POPUP */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(9, 11, 17, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200
        }}>
          <div className="glass-panel" style={{ width: '340px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--color-border)', backgroundColor: '#0c0e16' }}>
            
            {/* Modal tabs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white' }}>
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h4>
              <button
                onClick={() => setShowAuthModal(false)}
                className="cursor-pointer"
                style={{ border: 'none', background: 'transparent', color: 'var(--color-foreground-muted)', fontSize: '0.8rem', fontWeight: 'bold', padding: '4px' }}
              >
                Close
              </button>
            </div>

            <div style={{ display: 'flex', backgroundColor: 'var(--bg-deep)', padding: '2px', borderRadius: '8px', border: '1px solid var(--color-border)', gap: '4px' }}>
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className="cursor-pointer"
                style={{
                  flex: 1,
                  padding: '6px 2px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: authMode === 'login' ? 'var(--bg-elevated)' : 'transparent',
                  color: authMode === 'login' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
                  textAlign: 'center'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                className="cursor-pointer"
                style={{
                  flex: 1,
                  padding: '6px 2px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: authMode === 'signup' ? 'var(--bg-elevated)' : 'transparent',
                  color: authMode === 'signup' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
                  textAlign: 'center'
                }}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--color-foreground-muted)', fontWeight: 600 }}>Email Address</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--color-foreground-muted)', fontWeight: 600 }}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

              {authError && (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.7rem', color: '#EF4444', lineHeight: 1.3 }}>
                  <Warning size={14} /> <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary cursor-pointer"
                disabled={authLoading || !email || !password}
                style={{ width: '100%', padding: '10px', fontSize: '0.8rem', borderRadius: '8px', justifyContent: 'center', marginTop: '6px' }}
              >
                {authLoading ? 'Processing...' : authMode === 'login' ? 'Sign In' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
