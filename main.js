/* =============================================
   CRYPTOJOJI — main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // MATRIX RAIN EFFECT
  // =============================================

  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01011001CRYPTOJOJI$₿◎Ξ#@!%^&*';
  const fontSize = 14;
  let drops = [];

  function resizeMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDrops();
  }

  function initDrops() {
    drops = [];
    const cols = Math.floor(canvas.width / fontSize);
    for (let i = 0; i < cols; i++) {
      drops[i] = Math.random() * -100;
    }
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
      const c = chars[Math.floor(Math.random() * chars.length)];
      const brightness = Math.random();

      if (brightness > 0.98) {
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.9;
      } else if (brightness > 0.9) {
        ctx.fillStyle = '#80ffb3';
        ctx.globalAlpha = 0.7;
      } else {
        ctx.fillStyle = '#00ff66';
        ctx.globalAlpha = Math.random() * 0.4 + 0.2;
      }

      ctx.font = fontSize + 'px monospace';
      ctx.fillText(c, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5;
    }

    ctx.globalAlpha = 1;
  }

  resizeMatrix();
  window.addEventListener('resize', resizeMatrix);
  setInterval(drawMatrix, 50);


  // =============================================
  // MOBILE NAV TOGGLE
  // =============================================

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }


  // =============================================
  // MINI SPARKLINE CHARTS
  // =============================================

  function drawMiniChart(canvasId, data, color) {
    const c = document.getElementById(canvasId);
    if (!c) return;
    const ct = c.getContext('2d');
    const w = c.parentElement.offsetWidth || 140;
    const h = 40;
    c.width = w;
    c.height = h;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    ct.clearRect(0, 0, w, h);

    // Gradient fill
    const grad = ct.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, color + '44');
    grad.addColorStop(1, 'transparent');

    // Line path
    ct.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      i === 0 ? ct.moveTo(x, y) : ct.lineTo(x, y);
    });

    ct.strokeStyle = color;
    ct.lineWidth = 1.5;
    ct.lineJoin = 'round';
    ct.stroke();

    // Fill below line
    ct.lineTo(w, h);
    ct.lineTo(0, h);
    ct.closePath();
    ct.fillStyle = grad;
    ct.fill();
  }

  function genData(base, volatility, length = 24) {
    const data = [];
    let current = base;
    for (let i = 0; i < length; i++) {
      current += (Math.random() - 0.48) * volatility;
      current = Math.max(current, base * 0.85);
      data.push(current);
    }
    return data;
  }

  function renderAllCharts() {
    drawMiniChart('btc-chart',  genData(106000, 2000),     '#00ff66');
    drawMiniChart('eth-chart',  genData(3900, 150),        '#00ff66');
    drawMiniChart('sol-chart',  genData(189, 8),           '#ff6644');
    drawMiniChart('pepe-chart', genData(0.0000218, 0.000002), '#00ff66');
    drawMiniChart('doge-chart', genData(0.48, 0.02),       '#00ff66');
    drawMiniChart('bonk-chart', genData(0.000039, 0.000004), '#00ff66');
  }

  setTimeout(renderAllCharts, 200);
  window.addEventListener('resize', () => setTimeout(renderAllCharts, 100));


  // =============================================
  // LIVE PRICE TICKER SIMULATION
  // =============================================

  const prices = {
    btc:  { val: 106842,    el: 'btc-price',  changeEl: 'btc-change',  baseChange: 3.24  },
    eth:  { val: 3921,      el: 'eth-price',  changeEl: 'eth-change',  baseChange: 5.18  },
    sol:  { val: 189.40,    el: 'sol-price',  changeEl: 'sol-change',  baseChange: -1.02 },
    pepe: { val: 0.0000218, el: 'pepe-price', changeEl: 'pepe-change', baseChange: 14.7  },
    doge: { val: 0.4830,    el: 'doge-price', changeEl: 'doge-change', baseChange: 8.92  },
    bonk: { val: 0.0000397, el: 'bonk-price', changeEl: 'bonk-change', baseChange: 22.1  },
  };

  function formatPrice(val, id) {
    if (id === 'btc') return '$' + Math.round(val).toLocaleString();
    if (id === 'eth') return '$' + Math.round(val).toLocaleString();
    if (id === 'sol') return '$' + val.toFixed(2);
    if (id === 'pepe' || id === 'bonk') return '$' + val.toFixed(7);
    if (id === 'doge') return '$' + val.toFixed(4);
    return '$' + val;
  }

  setInterval(() => {
    Object.entries(prices).forEach(([id, data]) => {
      const delta = (Math.random() - 0.48) * 0.002;
      data.val *= (1 + delta);

      const el = document.getElementById(data.el);
      if (el) el.textContent = formatPrice(data.val, id);

      // Slightly drift the change percentage
      data.baseChange += (Math.random() - 0.5) * 0.1;
      const changeEl = document.getElementById(data.changeEl);
      if (changeEl) {
        const isUp = data.baseChange >= 0;
        changeEl.textContent = (isUp ? '↑ +' : '↓ ') + Math.abs(data.baseChange).toFixed(2) + '%';
        changeEl.className = 'coin-change ' + (isUp ? 'up' : 'down');
      }
    });
  }, 2000);


  // =============================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // =============================================

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .test-card, .stat-box, .price-widget').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
  });

  const visibleStyle = document.createElement('style');
  visibleStyle.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(visibleStyle);


  // =============================================
  // ANIMATED STAT COUNTERS
  // =============================================

  function animateCounter(el, target, suffix = '') {
    const duration = 1500;
    const start = performance.now();
    const startVal = 0;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);

      if (target >= 1000000) {
        el.textContent = (current / 1000000).toFixed(1) + 'M' + suffix;
      } else if (target >= 1000) {
        el.textContent = current.toLocaleString() + suffix;
      } else {
        el.textContent = current + suffix;
      }

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-target]').forEach(el => {
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) counterObserver.observe(statsGrid);


  // =============================================
  // CONTACT FORM HANDLER
  // =============================================

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const originalText = btn.textContent;
      btn.textContent = 'TRANSMITTING...';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      setTimeout(() => {
        btn.textContent = '✓ CAMPAIGN INITIALIZED';
        btn.style.borderColor = '#00ff66';
        btn.style.color = '#00ff66';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.opacity = '1';
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }


  // =============================================
  // NAVBAR SCROLL EFFECT
  // =============================================

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.style.background = 'rgba(0, 0, 0, 0.96)';
      navbar.style.borderBottomColor = 'rgba(0, 255, 102, 0.35)';
    } else {
      navbar.style.background = 'rgba(0, 0, 0, 0.88)';
      navbar.style.borderBottomColor = 'rgba(0, 255, 102, 0.2)';
    }
  });

});
