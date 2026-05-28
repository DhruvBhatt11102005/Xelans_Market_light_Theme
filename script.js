'use strict';

// ============================================================
// SITE PRELOADER
// ============================================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    document.body.classList.add('loaded');
  }
});

// Safety timeout for preloader
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('hidden')) {
    preloader.classList.add('hidden');
    document.body.classList.add('loaded');
  }
}, 3000);

// ============================================================
// NAVBAR SCROLL BEHAVIOUR
// ============================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Scroll-to-top button
  const st = document.getElementById('scrollTop');
  if (window.scrollY > 400) st.classList.add('visible');
  else st.classList.remove('visible');
});

// ============================================================
// MOBILE MENU
// ============================================================
function toggleMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  hamburger.classList.toggle('open');
  menu.classList.toggle('open');
}

// ============================================================
// HERO SLIDER
// ============================================================
let currentSlide = 0;
let slideTimer;

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.slider-dot');
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  resetSlideTimer();
}

function nextSlide() {
  const total = document.querySelectorAll('.hero-slide').length;
  goToSlide((currentSlide + 1) % total);
}

function resetSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 5000);
}

resetSlideTimer();

// ============================================================
// HERO CANVAS PARTICLE ANIMATION
// ============================================================
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(212,160,23,${0.25 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,160,23,${p.alpha})`;
      ctx.shadowColor = 'rgba(212,160,23,0.8)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
})();

// ============================================================
// LIVE PRICE ANIMATION (simulated)
// ============================================================
function animatePrices() {
  const priceEls = document.querySelectorAll('.live-price');
  priceEls.forEach(el => {
    const base = parseFloat(el.textContent);
    const delta = (Math.random() - 0.5) * 0.002;
    const newPrice = (base + delta).toFixed(4);
    el.textContent = newPrice;
    el.style.color = delta >= 0 ? '#22c55e' : '#ef4444';
    setTimeout(() => { el.style.color = '#e0b535'; }, 600);
  });
}
setInterval(animatePrices, 2000);

// ============================================================
// MARKET TICKER DATA & TABS
// ============================================================
const tickerData = {
  popular: [
    { pair: 'EUR/USD', full: 'Euro / US Dollar',       bid: '1.0842', ask: '1.0844', spread: '0.2', change: '+0.23%', dir: 'pos' },
    { pair: 'GBP/USD', full: 'British Pound / US Dollar', bid: '1.2534', ask: '1.2537', spread: '0.3', change: '+0.18%', dir: 'pos' },
    { pair: 'XAU/USD', full: 'Gold / US Dollar',       bid: '3224.50', ask: '3225.10', spread: '0.6', change: '+0.42%', dir: 'pos' },
    { pair: 'NAS100',  full: 'NASDAQ 100 Index',        bid: '21250.0', ask: '21252.5', spread: '2.5', change: '-0.31%', dir: 'neg' },
    { pair: 'BTC/USD', full: 'Bitcoin / US Dollar',    bid: '83450.00', ask: '83490.00', spread: '40.0', change: '+1.12%', dir: 'pos' },
  ],
  forex: [
    { pair: 'EUR/USD', full: 'Euro / US Dollar',       bid: '1.0842', ask: '1.0844', spread: '0.2', change: '+0.23%', dir: 'pos' },
    { pair: 'GBP/USD', full: 'British Pound / US Dollar', bid: '1.2534', ask: '1.2537', spread: '0.3', change: '+0.18%', dir: 'pos' },
    { pair: 'USD/JPY', full: 'US Dollar / Japanese Yen',  bid: '142.30', ask: '142.33', spread: '0.3', change: '-0.12%', dir: 'neg' },
    { pair: 'AUD/USD', full: 'Australian Dollar / US Dollar', bid: '0.6285', ask: '0.6287', spread: '0.2', change: '+0.09%', dir: 'pos' },
    { pair: 'USD/CHF', full: 'US Dollar / Swiss Franc', bid: '0.8941', ask: '0.8944', spread: '0.3', change: '-0.05%', dir: 'neg' },
  ],
  metals: [
    { pair: 'XAU/USD', full: 'Gold / US Dollar',       bid: '3224.50', ask: '3225.10', spread: '0.6', change: '+0.42%', dir: 'pos' },
    { pair: 'XAG/USD', full: 'Silver / US Dollar',     bid: '32.15',   ask: '32.17',   spread: '0.2', change: '+0.55%', dir: 'pos' },
    { pair: 'XPT/USD', full: 'Platinum / US Dollar',   bid: '981.20',  ask: '982.00',  spread: '0.8', change: '-0.22%', dir: 'neg' },
    { pair: 'XPD/USD', full: 'Palladium / US Dollar',  bid: '1042.00', ask: '1043.50', spread: '1.5', change: '+0.61%', dir: 'pos' },
  ],
  indices: [
    { pair: 'NAS100', full: 'NASDAQ 100',  bid: '21250.0', ask: '21252.5', spread: '2.5', change: '-0.31%', dir: 'neg' },
    { pair: 'US500',  full: 'S&P 500',     bid: '5825.5',  ask: '5826.0',  spread: '0.5', change: '+0.14%', dir: 'pos' },
    { pair: 'US30',   full: 'Dow Jones',   bid: '42310.0', ask: '42315.0', spread: '5.0', change: '+0.21%', dir: 'pos' },
    { pair: 'UK100',  full: 'FTSE 100',    bid: '8245.5',  ask: '8246.5',  spread: '1.0', change: '-0.08%', dir: 'neg' },
    { pair: 'GER40',  full: 'DAX 40',      bid: '21890.0', ask: '21892.5', spread: '2.5', change: '+0.38%', dir: 'pos' },
  ],
  futures: [
    { pair: 'OIL',    full: 'Crude Oil WTI',            bid: '60.45', ask: '60.50', spread: '0.05', change: '-0.87%', dir: 'neg' },
    { pair: 'NGAS',   full: 'Natural Gas',              bid: '3.284', ask: '3.291', spread: '0.007', change: '+1.24%', dir: 'pos' },
    { pair: 'BRENT',  full: 'Brent Crude Oil',          bid: '64.12', ask: '64.18', spread: '0.06', change: '-0.63%', dir: 'neg' },
    { pair: 'WHEAT',  full: 'Chicago Wheat',            bid: '568.5', ask: '569.0', spread: '0.5', change: '+0.44%', dir: 'pos' },
  ],
  etfs: [
    { pair: 'SPY',    full: 'SPDR S&P 500 ETF Trust',  bid: '582.40', ask: '582.55', spread: '0.15', change: '+0.16%', dir: 'pos' },
    { pair: 'QQQ',    full: 'Invesco QQQ Trust',        bid: '492.30', ask: '492.50', spread: '0.20', change: '-0.28%', dir: 'neg' },
    { pair: 'GLD',    full: 'SPDR Gold Shares',         bid: '306.75', ask: '306.90', spread: '0.15', change: '+0.38%', dir: 'pos' },
    { pair: 'XLE',    full: 'Energy Select SPDR',       bid: '86.20',  ask: '86.30',  spread: '0.10', change: '-1.12%', dir: 'neg' },
  ],
};

function setTickerTab(el, category) {
  document.querySelectorAll('.ticker-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderTicker(category);
}

function renderTicker(category) {
  const tbody = document.getElementById('tickerBody');
  const data  = tickerData[category] || tickerData.popular;
  tbody.innerHTML = data.map(row => `
    <tr>
      <td>
        <div class="pair-name">${row.pair}</div>
        <div class="pair-full">${row.full}</div>
      </td>
      <td><span class="price-val">${row.bid}</span></td>
      <td><span class="price-val">${row.ask}</span></td>
      <td><span class="spread-val">${row.spread}</span></td>
      <td><span class="${row.dir === 'pos' ? 'change-pos' : 'change-neg'}">${row.change}</span></td>
      <td><button class="trade-btn" onclick="window.location.href='#'">Trade</button></td>
    </tr>
  `).join('');
}

renderTicker('popular');

// Simulate live price updates in ticker
setInterval(() => {
  const rows = document.querySelectorAll('#tickerBody tr');
  rows.forEach(row => {
    const priceEl = row.querySelectorAll('.price-val');
    if (priceEl.length < 2) return;
    const bid = parseFloat(priceEl[0].textContent);
    const delta = (Math.random() - 0.5) * 0.003 * bid;
    const newBid = (bid + delta).toFixed(bid > 1000 ? 1 : bid > 10 ? 2 : 4);
    const newAsk = (parseFloat(newBid) + Math.random() * 0.005 * bid).toFixed(bid > 1000 ? 1 : bid > 10 ? 2 : 4);
    priceEl[0].textContent = newBid;
    priceEl[1].textContent = newAsk;
    const changeEl = row.querySelector('.change-pos, .change-neg');
    if (changeEl) {
      changeEl.style.opacity = '0.5';
      setTimeout(() => { changeEl.style.opacity = '1'; }, 300);
    }
  });
}, 2500);

// ============================================================
// PLATFORM TABS
// ============================================================
function setPlatform(index) {
  document.querySelectorAll('.platform-tab').forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.platform-content').forEach((c, i) => {
    c.classList.toggle('active', i === index);
  });
}

// ============================================================
// STATS COUNTER ANIMATION
// ============================================================
function animateCounter(el) {
  const target  = parseFloat(el.dataset.count);
  const suffix  = el.dataset.suffix || '';
  const prefix  = el.dataset.prefix || '';
  const duration = 2000;
  const start = performance.now();
  const isFloat = target % 1 !== 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = isFloat
      ? (eased * target).toFixed(2)
      : Math.floor(eased * target).toLocaleString();
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ============================================================
// SCROLL ANIMATIONS (IntersectionObserver)
// ============================================================
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-anim]').forEach(el => animObserver.observe(el));

// Stats bar observer
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate bars
      entry.target.querySelectorAll('.stat-bar-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = w; }, 100);
      });
      // Animate counters
      entry.target.querySelectorAll('.stat-value[data-count]').forEach(el => {
        animateCounter(el);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const statsSection = document.getElementById('statsSection');
if (statsSection) statsObserver.observe(statsSection);

// ============================================================
// INFINITE TESTIMONIALS MARQUEE
// ============================================================
(function initTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;
  
  // Duplicate cards for seamless CSS marquee loop
  const cards = track.innerHTML;
  track.innerHTML = cards + cards + cards;
})();

// Testimonial prev/next controls (offset the section scroll)
function slideTestimonial(dir) {
  const slider = document.getElementById('testimonialsSlider');
  if (slider) slider.scrollBy({ left: dir * 380, behavior: 'smooth' });
}

// ============================================================
// COOKIE BANNER
// ============================================================
function acceptCookie() {
  localStorage.setItem('xelans_cookie', '1');
  document.getElementById('cookieBanner').classList.remove('show');
}

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('xelans_cookie')) {
    setTimeout(() => {
      const banner = document.getElementById('cookieBanner');
      if (banner) banner.classList.add('show');
    }, 1500);
  }
});

// ============================================================
// SMOOTH REVEAL ON LOAD
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});

// ============================================================
// CLOSE MOBILE MENU ON LINK CLICK
// ============================================================
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
  });
});

// ============================================================
// PARALLAX SUBTLE EFFECT ON HERO
// ============================================================
window.addEventListener('scroll', () => {
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas && window.scrollY < window.innerHeight) {
    heroCanvas.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  }
});

// ============================================================
// ACTIVE NAV HIGHLIGHTING ON SCROLL
// ============================================================
const sections = ['hero', 'howToStart', 'features', 'statsSection', 'platforms', 'marketsSection', 'testimonials'];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Could highlight nav here if needed
    }
  });
}, { threshold: 0.3 });
sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// ============================================================
// COOKIE BANNER LOGIC
// ============================================================
const cookieBanner = document.getElementById('cookieBanner');
function showCookieBanner() {
  if (!localStorage.getItem('xelans_cookies_accepted')) {
    setTimeout(() => {
      if (cookieBanner) cookieBanner.classList.add('show');
    }, 2000);
  }
}

function acceptCookie() {
  if (cookieBanner) {
    cookieBanner.classList.remove('show');
    localStorage.setItem('xelans_cookies_accepted', 'true');
  }
}

// Initialize
showCookieBanner();


// ============================================================
// INTERACTIVE SPACE EFFECTS
// ============================================================
(function initSpaceInteractions() {
  const starLayers = document.querySelectorAll('.p-star-layer');
  
  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    
    // Parallax stars
    const moveX = (x - window.innerWidth / 2) / 50;
    const moveY = (y - window.innerHeight / 2) / 50;

    starLayers.forEach((layer, idx) => {
      const speed = (idx + 1) * 0.5;
      layer.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
  });
})();

// ============================================================
// KNOWLEDGE STREAM (BLOG BACKGROUND)
// ============================================================
(function initKnowledgeStream() {
  const container = document.getElementById('knowledgeStream');
  if (!container) return;

  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'knowledge-particle';
    
    // Randomize properties
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const duration = Math.random() * 10 + 10; // 10s to 20s
    const delay = Math.random() * 20;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.animationDelay = `-${delay}s`; // Negative delay for staggered start

    container.appendChild(particle);
  }
})();

// ============================================================
// COMET TRAIL CURSOR
// ============================================================
(function initCometTrail() {
  const style = document.createElement('style');
  style.textContent = `
    .comet-particle {
      position: fixed;
      width: 4px; height: 4px;
      background: var(--gold-2);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      filter: blur(1px);
      box-shadow: 0 0 10px var(--gold-3);
      animation: cometFade 0.8s ease-out forwards;
    }
    @keyframes cometFade {
      0% { transform: scale(1) translate(0, 0); opacity: 0.8; }
      100% { transform: scale(0) translate(0, 20px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.6) return;
    const p = document.createElement('div');
    p.className = 'comet-particle';
    p.style.left = e.clientX + 'px';
    p.style.top = e.clientY + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
  });
})();

// ============================================================
// CONSTELLATION NETWORK MAP — GLOBAL MARKETS SECTION
// ============================================================
(function initConstellation() {
  const canvas = document.getElementById('constellationCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Named nodes for the 6 markets
  const nodeLabels = ['Forex', 'Metals', 'Indices', 'Commodities', 'Futures', 'Instruments'];
  const nodeColors = [
    'rgba(212,160,23,',   // gold
    'rgba(255,220,100,',  // light gold
    'rgba(14,42,100,',    // navy
    'rgba(200,155,42,',   // amber
    'rgba(180,120,20,',   // dark gold
    'rgba(240,192,64,',   // bright gold
  ];  // Named star colors
  const starColors = [
    'rgba(212,160,23,',   // gold
    'rgba(255,255,255,',  // white
    'rgba(180,220,255,',  // blue-ish white
  ];

  let W, H, constellationGroups, backgroundStars, packets;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initStars();
  }

  function initStars() {
    constellationGroups = [];
    
    // 1. LEO (The Lion) - LOWERED TOP LEFT
    const leo = {
      stars: [
        { rx: 0.08, ry: 0.35, r: 3.5, flare: true },  // Regulus
        { rx: 0.05, ry: 0.25, r: 2.5, flare: false }, 
        { rx: 0.10, ry: 0.18, r: 2.8, flare: true },  
        { rx: 0.16, ry: 0.15, r: 2.3, flare: false }, 
        { rx: 0.20, ry: 0.22, r: 2.3, flare: false }, 
        { rx: 0.26, ry: 0.28, r: 3.0, flare: true },  
        { rx: 0.33, ry: 0.32, r: 3.2, flare: true }   
      ],
      connections: [[0,2], [2,3], [3,4], [4,2], [2,5], [5,6]]
    };

    // 2. CYGNUS (The Swan) - LOWERED TOP RIGHT
    const cygnus = {
      stars: [
        { rx: 0.85, ry: 0.15, r: 3.5, flare: true },  // Deneb
        { rx: 0.85, ry: 0.25, r: 2.8, flare: false }, 
        { rx: 0.85, ry: 0.45, r: 3.0, flare: true },  // Albireo
        { rx: 0.75, ry: 0.30, r: 2.5, flare: false }, // Wing Tip
        { rx: 0.95, ry: 0.20, r: 2.5, flare: false }  // Wing Tip
      ],
      connections: [[0,1], [1,2], [1,3], [1,4]]
    };

    // 3. SCORPIUS (The Scorpion) - LOWERED BOTTOM CENTER
    const scorpius = {
      stars: [
        { rx: 0.40, ry: 0.80, r: 2.8, flare: false }, // Claw
        { rx: 0.60, ry: 0.80, r: 2.8, flare: false }, // Claw
        { rx: 0.50, ry: 0.85, r: 4.2, flare: true },  // Antares (Heart)
        { rx: 0.52, ry: 0.90, r: 2.6, flare: false }, // Body
        { rx: 0.55, ry: 0.96, r: 2.6, flare: false }, // Tail Bend
        { rx: 0.60, ry: 0.98, r: 3.0, flare: true },  // Shaula
        { rx: 0.58, ry: 0.92, r: 2.3, flare: false }  // Tail segment
      ],
      connections: [[0,2], [1,2], [2,3], [3,6], [6,4], [4,5]]
    };

    [leo, cygnus, scorpius].forEach(group => {
      const gNodes = group.stars.map(s => ({
        x: s.rx * W,
        y: s.ry * H,
        r: s.r * 1.0, 
        flare: s.flare,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      }));
      constellationGroups.push({ nodes: gNodes, connections: group.connections });
    });

    // Background random stars
    backgroundStars = [];
    for (let i = 0; i < 80; i++) { 
      backgroundStars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.04
      });
    }
  }

  function drawFlare(ctx, x, y, size, opacity, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.strokeStyle = color + (opacity * 1.5) + ')'; // More opaque flares
    ctx.lineWidth = 2.0; // Thicker flare
    
    // Cross shape flare
    ctx.moveTo(-size, 0); ctx.lineTo(size, 0);
    ctx.moveTo(0, -size); ctx.lineTo(0, size);
    ctx.stroke();

    // Small diagonal flare
    ctx.beginPath();
    ctx.lineWidth = 1.0;
    const diag = size * 0.5;
    ctx.moveTo(-diag, -diag); ctx.lineTo(diag, diag);
    ctx.moveTo(diag, -diag); ctx.lineTo(-diag, diag);
    ctx.stroke();
    
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // 1. Draw Background Twinkling Stars
      backgroundStars.forEach(s => {
      s.pulse += s.pulseSpeed;
      const flicker = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(s.pulse));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${flicker})`;
      ctx.shadowColor = 'rgba(255,255,255,0.8)';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // 2. Draw Constellations
    constellationGroups.forEach(group => {
      // Draw Connections first
      group.connections.forEach(conn => {
        const n1 = group.nodes[conn[0]];
        const n2 = group.nodes[conn[1]];
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(212,160,23,0.85)';
        ctx.lineWidth = 1.2;
        ctx.shadowColor = 'rgba(212,160,23,0.9)';
        ctx.shadowBlur = 12;
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Draw Stars
      group.nodes.forEach(n => {
        n.pulse += n.pulseSpeed;
        const shimmer = 0.5 + 0.5 * Math.sin(n.pulse);
        
        // Star Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (0.9 + shimmer * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = n.color + (0.85 + shimmer * 0.15) + ')';
        ctx.shadowBlur = 25 + shimmer * 15;
        ctx.shadowColor = n.color + '1)';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Shining Flare
        if (n.flare) {
          drawFlare(ctx, n.x, n.y, 15 + shimmer * 10, 0.6 * shimmer, n.color);
        }
      });
    });

    requestAnimationFrame(draw);
  }

  const section = document.getElementById('testimonialsSection');
  let running = false;
  const visObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !running) {
        running = true;
        draw();
      }
    });
  }, { threshold: 0.1 });

  if (section) visObserver.observe(section);
  resize();
  window.addEventListener('resize', resize);
})();
;

// ============================================================
// PAYMENT SECTION ORBITAL LAYOUT
// ============================================================
(function initPaymentOrbit() {
  const section = document.getElementById('paymentSection');
  const container = document.querySelector('.payment-methods');
  const cards = document.querySelectorAll('.payment-method');
  const canvas = document.getElementById('paymentCosmicCanvas');
  if (!section || !container || cards.length === 0) return;

  let W, H;
  let angle = 0;
  let isPaused = false;
  const ctx = canvas ? canvas.getContext('2d') : null;

  function resize() {
    W = section.offsetWidth;
    H = section.offsetHeight;
    if (canvas) {
      canvas.width = W;
      canvas.height = H;
    }
  }

  // Pause on hover
  container.addEventListener('mouseenter', () => isPaused = true);
  container.addEventListener('mouseleave', () => isPaused = false);

  function animate() {
    if (!isPaused) {
      angle += 0.0015; // Very slow, subtle drift
    }

    const containerW = container.offsetWidth;
    const containerH = container.offsetHeight;
    
    // Size of the orbit relative to the container
    const rx = Math.min(containerW * 0.45, 500);
    const ry = Math.min(containerH * 0.40, 220);
    
    const angleOffset = -0.05; // Static tilt

    // Calculate container offset relative to the section (which is the canvas offset parent)
    const containerRect = container.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const offsetX = containerRect.left - sectionRect.left;
    const offsetY = containerRect.top - sectionRect.top;

    // Canvas center (mapped to container center)
    const canvasCenterX = offsetX + (containerW / 2);
    const canvasCenterY = offsetY + (containerH / 2);

    // 1. Draw STILL orbital path on canvas
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvasCenterX, canvasCenterY);
      ctx.rotate(angleOffset);
      
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212,160,23,0.3)';
      ctx.setLineDash([8, 12]);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw anchor dots on the orbit
      for(let i=0; i<12; i++) {
        const dotA = i * (Math.PI / 6);
        ctx.beginPath();
        ctx.arc(rx * Math.cos(dotA), ry * Math.sin(dotA), 2, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(212,160,23,0.6)';
        ctx.fill();
      }
      ctx.restore();
    }

    // 2. Position cards MOVING slowly along the oval
    const containerCenterX = containerW / 2;
    const containerCenterY = containerH / 2;

    cards.forEach((card, i) => {
      // Stagger cards equally around the circle
      const cardAngle = angle + (i * (Math.PI * 2 / cards.length)) - Math.PI / 2;
      
      // Base oval coordinates
      let x = rx * Math.cos(cardAngle);
      let y = ry * Math.sin(cardAngle);
      
      // Rotate coordinates to match static canvas tilt
      const rx_final = x * Math.cos(angleOffset) - y * Math.sin(angleOffset);
      const ry_final = x * Math.sin(angleOffset) + y * Math.cos(angleOffset);

      // Final position relative to container
      const finalX = containerCenterX + rx_final - (card.offsetWidth / 2);
      const finalY = containerCenterY + ry_final - (card.offsetHeight / 2);
      
      // Depth effect: scale and opacity based on y position (front vs back)
      const isFront = Math.sin(cardAngle) > 0;
      const zScale = 0.85 + (Math.sin(cardAngle) + 1) * 0.15; // Subtle 3D scale
      
      card.style.transform = `translate(${finalX}px, ${finalY}px) scale(${zScale})`;
      card.style.opacity = '1';
      card.style.filter = 'none';
      card.style.zIndex = isFront ? '50' : '10';
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
})();
