import React, { useState } from 'react';
import { Key, Eye, EyeSlash, CheckCircle, Warning, Database } from '@phosphor-icons/react';

export default function KeySettings({ 
  apiProvider, 
  onChangeProvider,
  apiKey, 
  onSaveKey, 
  onClearKey,
  ollamaModel,
  onSaveOllamaSettings,
  proxyKey,
  proxyModel,
  proxyHost,
  onSaveProxySettings,
  onClearProxySettings,
  firebaseConfig,
  onSaveFirebaseConfig,
  onClearFirebaseConfig,
  user,
  onLogin,
  onRegister,
  onLogout
}) {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  
  const [inputHost, setInputHost] = useState(() => localStorage.getItem('ollama_host') || 'http://localhost:11434');
  
  // Model state logic: support dropdown and custom input
  const [modelType, setModelType] = useState(() => {
    if (ollamaModel === 'qwen2.5-coder' || ollamaModel === 'qwen2.5-coder:14b' || ollamaModel === 'llama3') {
      return ollamaModel;
    }
    return 'custom';
  });
  const [customModel, setCustomModel] = useState(() => {
    if (ollamaModel === 'qwen2.5-coder' || ollamaModel === 'qwen2.5-coder:14b' || ollamaModel === 'llama3') {
      return '';
    }
    return ollamaModel || '';
  });

  // Proxy settings state logic
  const [inputProxyKey, setInputProxyKey] = useState(proxyKey || '');
  const [showProxyKey, setShowProxyKey] = useState(false);
  const [inputProxyHost, setInputProxyHost] = useState(proxyHost || 'https://yinli.one/v1');
  
  const [proxyModelType, setProxyModelType] = useState(() => {
    if (proxyModel === 'gemini-3.6-flash' || proxyModel === 'gemini-2.5-flash' || proxyModel === 'gpt-4o' || proxyModel === 'claude-3-5-sonnet' || proxyModel === 'deepseek-chat') {
      return proxyModel;
    }
    return 'custom';
  });
  const [customProxyModel, setCustomProxyModel] = useState(() => {
    if (proxyModel === 'gemini-3.6-flash' || proxyModel === 'gemini-2.5-flash' || proxyModel === 'gpt-4o' || proxyModel === 'claude-3-5-sonnet' || proxyModel === 'deepseek-chat') {
      return '';
    }
    return proxyModel || '';
  });

  // Firebase configurations state
  const [inputFbConfig, setInputFbConfig] = useState(firebaseConfig || '');
  const [showFbPanel, setShowFbPanel] = useState(false);

  // Firebase Auth states
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const handleGeminiSubmit = (e) => {
    e.preventDefault();
    if (inputKey.trim()) {
      onSaveKey(inputKey.trim());
    }
  };

  const handleOllamaSubmit = (e) => {
    e.preventDefault();
    const finalModel = modelType === 'custom' ? customModel.trim() : modelType;
    if (inputHost.trim() && finalModel) {
      onSaveOllamaSettings(inputHost.trim(), finalModel);
    }
  };

  const handleProxySubmit = (e) => {
    e.preventDefault();
    const finalModel = proxyModelType === 'custom' ? customProxyModel.trim() : proxyModelType;
    if (inputProxyHost.trim() && finalModel && inputProxyKey.trim()) {
      onSaveProxySettings(inputProxyHost.trim(), finalModel, inputProxyKey.trim());
    }
  };

  const handleFirebaseSubmit = (e) => {
    e.preventDefault();
    if (inputFbConfig.trim()) {
      onSaveFirebaseConfig(inputFbConfig.trim());
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const isConfigured = 
    apiProvider === 'gemini' 
    ? !!apiKey 
    : apiProvider === 'ollama'
    ? !!localStorage.getItem('ollama_host')
    : !!proxyKey;

  if (!isExpanded) {
    return (
      <div 
        onClick={() => setIsExpanded(true)}
        className="glass-panel cursor-pointer"
        style={{
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '12px',
          backgroundColor: 'rgba(15, 18, 29, 0.6)',
          border: '1px solid rgba(124, 58, 237, 0.25)',
          transition: 'all 0.2s',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Key size={16} weight="fill" color="var(--color-primary)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'white' }}>
            API ({apiProvider === 'gemini' ? 'Gemini' : apiProvider === 'proxy' ? 'Proxy' : 'Ollama'})
          </span>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            color: isConfigured ? '#10b981' : '#f59e0b',
            backgroundColor: isConfigured ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
            padding: '2px 8px',
            borderRadius: '10px'
          }}>
            {isConfigured ? '● Active' : '● Setup Required'}
          </span>
        </div>
        <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600 }}>
          Configure ⚙️
        </span>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Key size={18} weight="fill" color="var(--color-primary)" />
          <span>API Configuration</span>
        </h3>
        <button 
          onClick={() => setIsExpanded(false)}
          style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.72rem', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Hide ▲
        </button>
      </div>

      {/* Provider Selector Tab */}
      <div style={{ display: 'flex', backgroundColor: 'var(--bg-deep)', padding: '4px', borderRadius: '8px', border: '1px solid var(--color-border)', gap: '4px' }}>
        <button
          onClick={() => onChangeProvider('gemini')}
          className="cursor-pointer"
          style={{
            flex: 1,
            padding: '6px 2px',
            fontSize: '0.72rem',
            fontWeight: '600',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: apiProvider === 'gemini' ? 'var(--bg-elevated)' : 'transparent',
            color: apiProvider === 'gemini' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
            textAlign: 'center'
          }}
        >
          Gemini
        </button>
        <button
          onClick={() => onChangeProvider('proxy')}
          className="cursor-pointer"
          style={{
            flex: 1,
            padding: '6px 2px',
            fontSize: '0.72rem',
            fontWeight: '600',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: apiProvider === 'proxy' ? 'var(--bg-elevated)' : 'transparent',
            color: apiProvider === 'proxy' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
            textAlign: 'center'
          }}
        >
          API Proxy
        </button>
        <button
          onClick={() => onChangeProvider('ollama')}
          className="cursor-pointer"
          style={{
            flex: 1,
            padding: '6px 2px',
            fontSize: '0.72rem',
            fontWeight: '600',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: apiProvider === 'ollama' ? 'var(--bg-elevated)' : 'transparent',
            color: apiProvider === 'ollama' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
            textAlign: 'center'
          }}
        >
          Ollama
        </button>
      </div>

      {/* Gemini Mode Panel */}
      {apiProvider === 'gemini' && (
        apiKey ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div 
              style={{
                padding: '10px 12px',
                backgroundColor: '#06080d',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-primary)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>••••••••••••••••{apiKey.slice(-4)}</span>
            </div>
            <button 
              onClick={onClearKey} 
              className="btn btn-secondary cursor-pointer"
              style={{ width: '100%', padding: '8px', fontSize: '0.8rem', borderRadius: '8px' }}
            >
              Change API Key
            </button>
          </div>
        ) : (
          <form onSubmit={handleGeminiSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-foreground-muted)', lineHeight: '1.4' }}>
              Enter your Google Gemini API Key. Your key is stored locally in your browser.
            </p>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AIzaSy..."
                style={{
                  width: '100%',
                  backgroundColor: '#06080d',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '10px 40px 10px 12px',
                  color: 'white',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-foreground-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  padding: '0'
                }}
              >
                {showKey ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary cursor-pointer"
              style={{ width: '100%', padding: '10px', fontSize: '0.85rem', borderRadius: '8px' }}
              disabled={!inputKey.trim()}
            >
              Save Key
            </button>
          </form>
        )
      )}

      {/* API Proxy Mode Panel */}
      {apiProvider === 'proxy' && (
        proxyKey ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-foreground-muted)' }}>Proxy Endpoint</span>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'white', padding: '6px 8px', backgroundColor: '#06080d', borderRadius: '6px', border: '1px solid var(--color-border)', overflowX: 'auto' }}>
                {proxyHost}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-foreground-muted)' }}>Active Model</span>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'white', padding: '6px 8px', backgroundColor: '#06080d', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                {proxyModel}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-foreground-muted)' }}>Token / Key</span>
              <div 
                style={{
                  padding: '8px 10px',
                  backgroundColor: '#06080d',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>••••••••••••••••{proxyKey.slice(-4)}</span>
              </div>
            </div>
            <button 
              onClick={onClearProxySettings} 
              className="btn btn-secondary cursor-pointer"
              style={{ width: '100%', padding: '8px', fontSize: '0.8rem', borderRadius: '8px' }}
            >
              Change Proxy Settings
            </button>
          </div>
        ) : (
          <form onSubmit={handleProxySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-foreground-muted)', lineHeight: '1.4' }}>
              Enter third-party API proxy credentials (e.g. YinLi AI, OpenRouter, DeepSeek).
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-foreground-muted)' }}>Proxy Base URL</label>
              <input 
                type="text"
                value={inputProxyHost}
                onChange={(e) => setInputProxyHost(e.target.value)}
                placeholder="e.g. https://yinli.one/v1"
                style={{
                  width: '100%',
                  backgroundColor: '#06080d',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-foreground-muted)' }}>Select Model</label>
              <select
                value={proxyModelType}
                onChange={(e) => setProxyModelType(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#06080d',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-body)',
                  outline: 'none'
                }}
              >
                <option value="gemini-3.6-flash">Gemini 3.6 Flash</option>
                <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                <option value="gpt-4o">GPT-4o</option>
                <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                <option value="deepseek-chat">DeepSeek Chat</option>
                <option value="custom">Custom Model...</option>
              </select>
            </div>

            {proxyModelType === 'custom' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-foreground-muted)' }}>Custom Model Name</label>
                <input 
                  type="text"
                  value={customProxyModel}
                  onChange={(e) => setCustomProxyModel(e.target.value)}
                  placeholder="e.g. qwen2.5-coder:14b"
                  style={{
                    width: '100%',
                    backgroundColor: '#06080d',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    outline: 'none'
                  }}
                />
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-foreground-muted)' }}>Access Token / Key</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showProxyKey ? 'text' : 'password'}
                  value={inputProxyKey}
                  onChange={(e) => setInputProxyKey(e.target.value)}
                  placeholder="sk-..."
                  style={{
                    width: '100%',
                    backgroundColor: '#06080d',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '8px 40px 8px 12px',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowProxyKey(!showProxyKey)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-foreground-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    padding: '0'
                  }}
                >
                  {showProxyKey ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary cursor-pointer"
              style={{ width: '100%', padding: '10px', fontSize: '0.85rem', borderRadius: '8px' }}
              disabled={!inputProxyHost.trim() || !inputProxyKey.trim() || (proxyModelType === 'custom' && !customProxyModel.trim())}
            >
              Save Proxy Settings
            </button>
          </form>
        )
      )}

      {/* Ollama Mode Panel */}
      {apiProvider === 'ollama' && (
        <form onSubmit={handleOllamaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-foreground-muted)', lineHeight: '1.4' }}>
            Ensure Ollama is running locally with CORS enabled: <code>OLLAMA_ORIGINS="*" ollama serve</code>
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-foreground-muted)' }}>Host Address</label>
            <input 
              type="text"
              value={inputHost}
              onChange={(e) => setInputHost(e.target.value)}
              placeholder="http://localhost:11434"
              style={{
                width: '100%',
                backgroundColor: '#06080d',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: 'white',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-foreground-muted)' }}>Select Model</label>
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#06080d',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: 'white',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-body)',
                outline: 'none'
              }}
            >
              <option value="qwen2.5-coder">Qwen 2.5 Coder (7B - GPU Optimized)</option>
              <option value="qwen2.5-coder:14b">Qwen 2.5 Coder (14B - High Quality)</option>
              <option value="llama3">Llama 3 (8B)</option>
              <option value="custom">Custom Model...</option>
            </select>
          </div>

          {modelType === 'custom' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-foreground-muted)' }}>Custom Model Name</label>
              <input 
                type="text"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                placeholder="enter-model-tag"
                style={{
                  width: '100%',
                  backgroundColor: '#06080d',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none'
                }}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary cursor-pointer"
            style={{ width: '100%', padding: '10px', fontSize: '0.85rem', borderRadius: '8px' }}
            disabled={!inputHost.trim() || (modelType === 'custom' && !customModel.trim())}
          >
            Save Local Settings
          </button>
        </form>
      )}

      {/* Firebase Config Panel (Collapsible) */}
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '4px' }}>
        <button
          type="button"
          onClick={() => setShowFbPanel(!showFbPanel)}
          className="cursor-pointer"
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-foreground)',
            fontSize: '0.8rem',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 4px'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Database size={14} weight="fill" color="var(--color-primary)" />
            <span>Firebase Database</span>
          </span>
          <span style={{ color: 'var(--color-foreground-muted)', fontSize: '0.7rem' }}>
            {firebaseConfig ? '🟢 Configured' : '🔴 Off'}
          </span>
        </button>

        {showFbPanel && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            {firebaseConfig ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-foreground-muted)', lineHeight: '1.4' }}>
                  Connected to dynamic database.
                </div>

                {user ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-foreground-muted)' }}>Logged in as:</span>
                    <strong style={{ fontSize: '0.75rem', color: 'white', wordBreak: 'break-all' }}>{user.email}</strong>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await onLogout();
                        } catch (err) {
                          alert("Sign out failed: " + err.message);
                        }
                      }}
                      className="btn btn-secondary cursor-pointer"
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.72rem', borderRadius: '6px', marginTop: '4px', justifyContent: 'center' }}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', backgroundColor: 'var(--bg-deep)', padding: '2px', borderRadius: '6px', border: '1px solid var(--color-border)', gap: '4px' }}>
                      <button
                        type="button"
                        onClick={() => { setAuthMode('login'); setAuthError(''); }}
                        className="cursor-pointer"
                        style={{
                          flex: 1,
                          padding: '4px 2px',
                          fontSize: '0.68rem',
                          fontWeight: '600',
                          borderRadius: '4px',
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
                          padding: '4px 2px',
                          fontSize: '0.68rem',
                          fontWeight: '600',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: authMode === 'signup' ? 'var(--bg-elevated)' : 'transparent',
                          color: authMode === 'signup' ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
                          textAlign: 'center'
                        }}
                      >
                        Register
                      </button>
                    </div>

                    <form onSubmit={async (e) => {
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
                      } catch (err) {
                        setAuthError(err.message);
                      } finally {
                        setAuthLoading(false);
                      }
                    }} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          backgroundColor: '#06080d',
                          border: '1px solid var(--color-border)',
                          borderRadius: '6px',
                          padding: '6px 8px',
                          color: 'white',
                          fontSize: '0.72rem',
                          outline: 'none'
                        }}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          backgroundColor: '#06080d',
                          border: '1px solid var(--color-border)',
                          borderRadius: '6px',
                          padding: '6px 8px',
                          color: 'white',
                          fontSize: '0.72rem',
                          outline: 'none'
                        }}
                      />
                      {authError && (
                        <span style={{ fontSize: '0.625rem', color: '#EF4444', wordBreak: 'break-word', lineHeight: '1.3' }}>
                          ⚠️ {authError.replace("Firebase: ", "")}
                        </span>
                      )}
                      <button
                        type="submit"
                        className="btn btn-primary cursor-pointer"
                        disabled={authLoading || !email || !password}
                        style={{ width: '100%', padding: '6px 8px', fontSize: '0.72rem', borderRadius: '6px', justifyContent: 'center', marginTop: '2px' }}
                      >
                        {authLoading ? 'Processing...' : authMode === 'login' ? 'Sign In' : 'Register'}
                      </button>
                    </form>
                  </div>
                )}

                <div style={{ borderTop: '1px solid var(--color-border)', margin: '4px 0' }}></div>

                <button
                  type="button"
                  onClick={onClearFirebaseConfig}
                  className="btn btn-secondary cursor-pointer"
                  style={{ width: '100%', padding: '6px 12px', fontSize: '0.75rem', borderRadius: '6px', justifyContent: 'center' }}
                >
                  Clear Config
                </button>
              </div>
            ) : (
              <form onSubmit={handleFirebaseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--color-foreground-muted)', lineHeight: '1.4' }}>
                  Paste your Firebase Web App configuration JSON block (e.g. from Project Settings):
                </p>
                <textarea
                  value={inputFbConfig}
                  onChange={(e) => setInputFbConfig(e.target.value)}
                  placeholder={`{\n  "apiKey": "...",\n  "authDomain": "...",\n  "projectId": "..."\n}`}
                  rows={6}
                  style={{
                    width: '100%',
                    backgroundColor: '#06080d',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary cursor-pointer"
                  style={{ width: '100%', padding: '8px', fontSize: '0.75rem', borderRadius: '6px' }}
                  disabled={!inputFbConfig.trim()}
                >
                  Save Config
                </button>
              </form>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
