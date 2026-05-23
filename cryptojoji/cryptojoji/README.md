# CryptoJoji — AI Crypto Marketing Agency

A cyberpunk Matrix-inspired website for CryptoJoji, a futuristic AI-powered crypto marketing agency.

## 🚀 Deploy to Vercel

### Option 1 — Import from GitHub (recommended)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Vercel auto-detects the static site — click **Deploy**
5. Done ✅

### Option 2 — Vercel CLI
```bash
npm i -g vercel
cd cryptojoji
vercel
```

### Option 3 — Drag & Drop
Go to [vercel.com/new](https://vercel.com/new) and drag the entire `cryptojoji` folder into the browser.

---

## 📁 File Structure

```
cryptojoji/
├── index.html      # Main page (all sections)
├── styles.css      # All styling — Matrix theme, responsive
├── main.js         # Matrix rain, charts, live tickers, animations
├── vercel.json     # Vercel deployment config
└── README.md       # This file
```

## ✨ Features

- **Matrix rain** canvas animation running full-screen
- **Glitch effect** on the CryptoJoji logo
- **Live price tickers** (simulated) — BTC, ETH, SOL, PEPE, DOGE, BONK
- **Mini sparkline charts** for each coin using Canvas API
- **Scroll-triggered** fade-in animations
- **Animated stat counters**
- **Contact form** with submission feedback
- **Mobile responsive** — hamburger nav on small screens
- Neon green cyberpunk aesthetic throughout

## 🎨 Tech Stack

- Pure HTML, CSS, JavaScript — zero dependencies
- Google Fonts: Orbitron + Rajdhani
- Canvas API for Matrix rain + sparklines
- IntersectionObserver for scroll animations

## 🔧 Customization

- Colors: edit CSS variables in `styles.css` under `:root`
- Prices: update base values in `main.js` → `prices` object
- Content: edit text directly in `index.html`
- Contact form: connect to Formspree, EmailJS, or your backend in `main.js`

---

**Stay Ahead. Stay Viral.** — CryptoJoji
