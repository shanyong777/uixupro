# UIXUPro - AI-Powered Website & UI Generator

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_UIXUPro-6366f1?style=for-the-badge&logo=github)](https://shanyong777.github.io/uixupro/)

> **Live Application**: [https://shanyong777.github.io/uixupro/](https://shanyong777.github.io/uixupro/)

UIXUPro is a modern web application for generating, previewing, and customizing full responsive websites and UI layouts with AI. Built with Vite, React 19, Phosphor Icons, Three.js, GSAP, and Tailwind-compatible styling patterns.

---

## Features

- **AI-Powered Code Generation**: Generate complete, responsive web applications using Gemini models (with support for Ollama local models and custom proxy providers).
- **Interactive Live Preview**: Split view with desktop, tablet, and mobile device viewport simulations.
- **Rich Curated Templates**: Out-of-the-box themes including:
  - SaaS, AI Agency, Portfolio, Minimalist, Neobrutalism, Retro, Cyberpunk, Coffee Shop, Matcha, Luxury, Fashion, Fitness, Crypto, Chatbot, and Flowers.
- **Dynamic 3D Canvas & VFX**: Interactive background visuals powered by Three.js and GSAP (Liquid Ether effects).
- **Multi-Page Support**: Easily generate and manage multi-page website structures.
- **Export Capabilities**: One-click ZIP download with all generated HTML, CSS, and assets via JSZip.
- **Optional Firebase Cloud Sync**: Connect your own Firebase project for authentication and cloud template storage.
- **Privacy & Security Focused**: All API keys and Firebase configurations are managed client-side in your browser's `localStorage`. No private API keys or credentials are stored or tracked in the repository.

---

## Tech Stack

- **Frontend**: React 19, Vite
- **Icons**: Phosphor Icons (`@phosphor-icons/react`)
- **3D & Animation**: Three.js, GSAP
- **Utilities**: JSZip, Firebase SDK

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shanyong777/uixupro.git
   cd uixupro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## API Configuration

To use the AI generation features:
1. Open UIXUPro in your browser.
2. Click on the **Key Settings** icon in the navigation bar.
3. Choose your preferred AI provider:
   - **Google Gemini**: Enter your personal Gemini API key ([Google AI Studio](https://aistudio.google.com/)).
   - **Local Ollama**: Connect to your locally running Ollama instance (e.g. `http://localhost:11434`).
   - **Proxy Provider**: Configure a custom OpenAI-compatible or Gemini proxy endpoint.
4. (Optional) Configure your Firebase credentials in the settings modal if you want to sync templates across sessions.

> **Security Note:** Never commit your `.env` or API keys to version control. Keys entered in the app are stored exclusively in your browser's local storage.

---

## Building for Production

To create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## License

MIT License.
