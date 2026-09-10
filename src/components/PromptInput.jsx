import { useState, useEffect, useRef } from 'react';
import { PaperPlaneRight, Sparkle, Chats, MagicWand, User, Cpu, SquaresFour, X } from '@phosphor-icons/react';

export default function PromptInput({ 
  apiKey, 
  generating, 
  onGenerate, 
  onLoadMock,
  activeInputTab,
  setActiveInputTab,
  chatMessages,
  onSendChatMessage
}) {
  const [prompt, setPrompt] = useState('');
  const [stylePreset, setStylePreset] = useState('glassmorphism');
  const [chatInput, setChatInput] = useState('');
  const [showGallery, setShowGallery] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !generating) {
      onGenerate(prompt, stylePreset);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim() && !generating) {
      onSendChatMessage(chatInput.trim());
      setChatInput('');
    }
  };

  const handleMockClick = (type) => {
    onLoadMock(type);
  };

  const stylePresets = [
    { id: 'glassmorphism', name: 'Glassmorphism' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'bento', name: 'Bento Grid' },
    { id: 'cyberpunk', name: 'Cyberpunk HUD' }
  ];

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Tab Switcher */}
      <div style={{ display: 'flex', backgroundColor: 'var(--bg-deep)', padding: '4px', borderRadius: '8px', border: '1px solid var(--color-border)', gap: '4px' }}>
        <button
          onClick={() => setActiveInputTab('generate')}
          className="cursor-pointer"
          style={{
            flex: 1,
            padding: '8px',
            fontSize: '0.75rem',
            fontWeight: '600',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: activeInputTab === 'generate' ? 'var(--bg-elevated)' : 'transparent',
            color: activeInputTab === 'generate' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            textAlign: 'center'
          }}
        >
          <MagicWand size={14} />
          <span>Create New</span>
        </button>
        <button
          onClick={() => setActiveInputTab('chat')}
          className="cursor-pointer"
          style={{
            flex: 1,
            padding: '8px',
            fontSize: '0.75rem',
            fontWeight: '600',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: activeInputTab === 'chat' ? 'var(--bg-elevated)' : 'transparent',
            color: activeInputTab === 'chat' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            textAlign: 'center'
          }}
        >
          <Chats size={14} />
          <span>Edit Page (Chat)</span>
        </button>
      </div>

      {/* GENERATE NEW PAGE TAB */}
      {activeInputTab === 'generate' && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-foreground-muted)' }}>
              Describe your website
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={generating}
              placeholder="e.g. Build a premium modern landing page for a personal trainer, using warm gold accents, testimonials, and a booking form..."
              rows={4}
              style={{
                width: '100%',
                backgroundColor: '#06080d',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '12px',
                color: 'white',
                fontSize: '0.85rem',
                outline: 'none',
                resize: 'none',
                lineHeight: '1.4',
                transition: 'var(--transition-quick)'
              }}
            />
          </div>

          {/* Style Preset Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-foreground-muted)' }}>
              Design Aesthetic
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {stylePresets.map(preset => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setStylePreset(preset.id)}
                  className="cursor-pointer"
                  style={{
                    padding: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: '1px solid',
                    backgroundColor: stylePreset === preset.id ? 'var(--color-primary-glow)' : 'var(--bg-elevated)',
                    borderColor: stylePreset === preset.id ? 'var(--color-primary)' : 'var(--color-border)',
                    color: stylePreset === preset.id ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
                    textAlign: 'center'
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            className="btn btn-primary cursor-pointer"
            disabled={!prompt.trim() || generating}
            style={{ width: '100%', padding: '12px', borderRadius: '12px', justifyContent: 'center' }}
          >
            {generating ? (
              <>
                <Sparkle size={18} className="animate-spin" />
                <span>Generating Code...</span>
              </>
            ) : (
              <>
                <PaperPlaneRight size={18} weight="fill" />
                <span>{apiKey ? 'Generate Live Page' : 'Simulate Generation'}</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* EDIT CURRENT PAGE (CHAT ASSISTANT) TAB */}
      {activeInputTab === 'chat' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Messages view log */}
          <div 
            style={{
              maxHeight: '260px',
              minHeight: '160px',
              overflowY: 'auto',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              backgroundColor: '#06080d',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {chatMessages.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', color: 'var(--color-foreground-muted)', textAlign: 'center', padding: '16px' }}>
                <Cpu size={24} weight="fill" style={{ opacity: 0.5 }} />
                <p style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                  No page loaded yet. Click any mock template below or generate a custom page to begin chat-based editing!
                </p>
              </div>
            ) : (
              chatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    gap: '4px'
                  }}
                >
                  <span 
                    style={{ 
                      fontSize: '0.65rem', 
                      fontWeight: 'bold', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      color: msg.sender === 'user' ? 'var(--color-primary)' : 'var(--color-accent)',
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    {msg.sender === 'user' ? <User size={10} weight="fill" /> : <Cpu size={10} weight="fill" />}
                    <span>{msg.sender === 'user' ? 'YOU' : 'AI ASSISTANT'}</span>
                  </span>
                  <div 
                    style={{
                      backgroundColor: msg.sender === 'user' ? 'rgba(6, 182, 212, 0.12)' : 'var(--bg-elevated)',
                      border: msg.sender === 'user' ? '1px solid var(--color-primary-glow)' : '1px solid var(--color-border)',
                      borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      padding: '8px 12px',
                      color: 'white',
                      fontSize: '0.8rem',
                      lineHeight: '1.4',
                      wordBreak: 'break-word'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input form */}
          <form onSubmit={handleChatSubmit} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={generating || chatMessages.length === 0}
              placeholder={chatMessages.length === 0 ? "Generate a page first..." : "e.g. Change title to 'Spicy Tacos'..."}
              style={{
                flex: 1,
                backgroundColor: '#06080d',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: 'white',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary cursor-pointer"
              disabled={!chatInput.trim() || generating || chatMessages.length === 0}
              style={{ padding: '8px 14px', borderRadius: '8px' }}
            >
              {generating ? <Sparkle size={14} className="animate-spin" /> : <PaperPlaneRight size={14} weight="fill" />}
            </button>
          </form>
        </div>
      )}

      {/* Mock template gallery launch */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Visual Mock Designs
        </span>
        <button
          type="button"
          onClick={() => setShowGallery(true)}
          disabled={generating}
          className="btn btn-secondary cursor-pointer"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '0.8rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            border: '1px solid var(--color-border)'
          }}
        >
          <SquaresFour size={16} color="var(--color-primary)" />
          <span>Browse 15 Base Templates</span>
        </button>
      </div>

      {/* Visual Template Gallery Modal */}
      {showGallery && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(9, 11, 17, 0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '24px'
        }}>
          <div className="glass-panel" style={{
            width: '800px',
            maxWidth: '100%',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            border: '1px solid var(--color-border)',
            backgroundColor: '#0c0e16',
            padding: '24px',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SquaresFour size={20} color="var(--color-primary)" />
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'white' }}>Design Templates Library</h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-foreground-muted)' }}>Select a pre-built style framework to load into your canvas.</p>
                </div>
              </div>
              <button
                onClick={() => setShowGallery(false)}
                className="cursor-pointer"
                style={{
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Templates Grid */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '16px',
              paddingRight: '6px'
            }}>
              {[
                { id: 'flowers', label: '🌸 Bloom & Petal', category: 'Botanical', desc: 'Airy, minimalist artisanal floral boutique with balanced, non-overwhelming imagery.' },
                { id: 'aiAgency', label: '🚀 AETHER AI Studio', category: 'Next-Gen AI', desc: 'Bento-grid AI engineering studio with live code metrics and neural design system.' },
                { id: 'coffee', label: '☕ Cafe Shop', category: 'Warm & Cozy', desc: 'Cozy coffee shop menu and reservations page.' },
                { id: 'saas', label: '📊 SaaS Platform', category: 'SaaS & Tech', desc: 'Clean metrics dashboard, stats charts, and grid layout.' },
                { id: 'portfolio', label: '💻 Creator Portfolio', category: 'Creative', desc: 'Sleek dark portfolio highlighting active dev projects.' },
                { id: 'fitness', label: '🏋️ Fitness Gym', category: 'Active', desc: 'Energetic fitness layout with trainer bios and schedules.' },
                { id: 'matcha', label: '🍵 Matcha Lounge', category: 'Minimalist', desc: 'Serene zen design for Japanese tea and mindfulness stores.' },
                { id: 'chatbot', label: '🤖 AI Bot Portal', category: 'Tech & AI', desc: 'Tech assistant landing page with a mock chat interface.' },
                { id: 'crypto', label: '🪙 Crypto Wallet', category: 'Finance', desc: 'Bento-style layout containing live token charts.' },
                { id: 'fashion', label: '👗 Luxury Fashion', category: 'Showcase', desc: 'Clean, elegant product cards for high-end brands.' },
                { id: 'learning', label: '🎨 Kid\'s Academy', category: 'Education', desc: 'Playful color system for classrooms and interactive courses.' },
                { id: 'cyberpunk', label: '🦾 Cyberwear HUD', category: 'Creative', desc: 'Vibrant cyberpunk neon portfolio layout.' },
                { id: 'neobrutalism', label: '⚡ Rebel Design Agency', category: 'Neobrutalism', desc: 'Bold borders, sharp shadows, and raw geometries.' },
                { id: 'minimalist', label: '🪑 Nordic Design Studio', category: 'Minimalist', desc: 'Ultra-clean layout emphasizing architecture photography.' },
                { id: 'luxury', label: '⛵ Luxury Yacht Broker', category: 'Luxury', desc: 'Sleek black interface for premium rentals and pricing.' },
                { id: 'retro', label: '🎹 Synth Wave Lab', category: 'Retro', desc: 'Vaporwave colors featuring cassette store layouts.' }
              ].map(tmpl => (
                <div
                  key={tmpl.id}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.625rem', fontWeight: 'bold', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {tmpl.category}
                    </span>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'white' }}>{tmpl.label}</h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-foreground-muted)', lineHeight: '1.4' }}>{tmpl.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleMockClick(tmpl.id);
                      setShowGallery(false);
                    }}
                    className="btn btn-primary cursor-pointer"
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      fontSize: '0.72rem',
                      borderRadius: '6px',
                      justifyContent: 'center'
                    }}
                  >
                    Load Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
