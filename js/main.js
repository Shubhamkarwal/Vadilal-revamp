/* ═══════════════════════════════════════════════════════
   VADILAL — CRAFTED SINCE 1926
   Main JavaScript
   ═══════════════════════════════════════════════════════ */

/* ── CURSOR ─────────────────────────────────────────────── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

function addHoverCursor(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}
addHoverCursor('a, button, .f-card, .fi-dot, .filter-btn, .presence-card');

/* ── NAVBAR SCROLL ──────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── MOBILE HAMBURGER ───────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── PROGRESS BAR ───────────────────────────────────────── */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const h   = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progressBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

/* ── PARTICLE SPAWNER ───────────────────────────────────── */
function spawnParticles(containerId, color, count = 16) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const p  = document.createElement('div');
    p.className = 'h-particle';
    const sz = Math.random() * 3.5 + 1.5;
    p.style.cssText = `
      width:${sz}px; height:${sz}px; background:${color};
      left:${Math.random() * 100}%; bottom:${Math.random() * 30}%;
      animation-duration:${7 + Math.random() * 11}s;
      animation-delay:${Math.random() * 9}s;
    `;
    container.appendChild(p);
  }
}
spawnParticles('hpart0', 'rgba(220,168,55,.65)');
spawnParticles('hpart1', 'rgba(230,148,18,.55)');
spawnParticles('hpart2', 'rgba(165,80,22,.5)');

/* ── GLOBAL DOT BACKGROUND ──────────────────────────────── */
const dotBg = document.getElementById('dot-bg');
if (dotBg) {
  const fragment = document.createDocumentFragment();
  for (let r = 0; r < 22; r++) {
    const row = document.createElement('div');
    row.className = 'global-dot-row';
    for (let c = 0; c < 45; c++) {
      const d = document.createElement('div');
      d.className = 'global-dot-cell';
      row.appendChild(d);
    }
    fragment.appendChild(row);
  }
  dotBg.appendChild(fragment);
}

/* ── PARALLAX HERO ──────────────────────────────────────── */
const heroWrap   = document.getElementById('hero-slides');
const fIndicator = document.getElementById('flavour-indicator');
const fiDots     = document.querySelectorAll('.fi-dot');

const slideBgs   = [
  document.getElementById('hbg0'),
  document.getElementById('hbg1'),
  document.getElementById('hbg2'),
];
const slideGrids = [
  document.getElementById('hgrid0'),
  document.getElementById('hgrid1'),
  document.getElementById('hgrid2'),
];
const slideNums  = [
  document.getElementById('hnum0'),
  document.getElementById('hnum1'),
  document.getElementById('hnum2'),
];
const slideCons  = [
  document.getElementById('hcon0'),
  document.getElementById('hcon1'),
  document.getElementById('hcon2'),
];

let currentSlide = 0;

/* Apply fallback gradients if no background image loaded */
const fallbackBgs = [
  'radial-gradient(ellipse at 30% 60%, #2e1500 0%, #0B0F1A 68%)',
  'radial-gradient(ellipse at 70% 40%, #3D1800 0%, #0B0F1A 68%)',
  'radial-gradient(ellipse at 50% 55%, #1e0808 0%, #0B0F1A 68%)',
];
slideBgs.forEach((bg, i) => {
  if (bg && !bg.style.backgroundImage) {
    bg.style.background = fallbackBgs[i];
  }
});

function heroScroll() {
  if (!heroWrap) return;
  const heroRect = heroWrap.getBoundingClientRect();
  const inHero   = heroRect.top < window.innerHeight && heroRect.bottom > 0;
  fIndicator && fIndicator.classList.toggle('visible', inHero);

  for (let i = 0; i < 3; i++) {
    const slide = document.getElementById('hs' + i);
    if (!slide) continue;
    const rect = slide.getBoundingClientRect();
    const vis  = Math.max(0, Math.min(1, 1 - Math.abs(rect.top) / window.innerHeight));

    if (slideBgs[i])   slideBgs[i].style.transform   = `translateY(${rect.top * 0.35}px)`;
    if (slideGrids[i]) slideGrids[i].style.transform = `translateY(${rect.top * 0.18}px)`;
    if (slideNums[i]) {
      slideNums[i].style.transform = `translate(-50%,-50%) translateY(${rect.top * 0.55}px)`;
      slideNums[i].style.opacity   = vis * 0.12;
    }
    if (slideCons[i]) slideCons[i].style.transform = `translateY(${rect.top * 0.07}px)`;

    const isActive = rect.top <= window.innerHeight * 0.55 && rect.top > -window.innerHeight * 0.45;
    if (isActive) {
      slideCons[i] && slideCons[i].classList.add('on');
      if (currentSlide !== i) {
        currentSlide = i;
        fiDots.forEach((d, di) => d.classList.toggle('active', di === i));
      }
    } else {
      slideCons[i] && slideCons[i].classList.remove('on');
    }
  }
}

window.addEventListener('scroll', heroScroll, { passive: true });
setTimeout(() => { slideCons[0] && slideCons[0].classList.add('on'); }, 200);

/* ── SCROLL REVEAL ──────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── FLAVOUR DATA ───────────────────────────────────────── */
const FLAVOURS = [
  { name: 'Dark Chocolate',       cat: 'Gourmet',    icon: '🍫', img: 'images/cards/card-gourmet.webp',   c: ['#2D1810','#6B3020'], note: 'Belgian dark cocoa, slow-churned to velvet perfection.',              tags: ['Dark','Rich','Belgian']         },
  { name: 'Alphonso Mango',       cat: 'Gourmet',    icon: '🥭', img: 'images/cards/card-gourmet.webp',   c: ['#3D1800','#9A4500'], note: 'The king of mangoes, frozen at peak Ratnagiri sweetness.',            tags: ['Seasonal','Tropical','Intense'] },
  { name: 'Pistachios & Cream',   cat: 'Gourmet',    icon: '🌿', img: 'images/cards/card-gourmet.webp',   c: ['#0A2010','#1A5030'], note: 'Iranian pistachios folded into double cream, hand-layered.',          tags: ['Nutty','Elegant','Classic']     },
  { name: 'Strawberry Bliss',     cat: 'Gourmet',    icon: '🍓', img: 'images/cards/card-gourmet.webp',   c: ['#2A0A10','#6B1530'], note: 'Sun-ripened Mahabaleshwar strawberries, no concentrates.',           tags: ['Fresh','Fruity','Pure']         },
  { name: 'Wild Blueberry',       cat: 'Gourmet',    icon: '🫐', img: 'images/cards/card-gourmet.webp',   c: ['#1A0D2E','#3D1B6E'], note: 'Mountain-picked berries suspended in pure cream.',                  tags: ['Antioxidant','Bold','Premium']  },
  { name: 'Caramel Praline',      cat: 'Gourmet',    icon: '⭐', img: 'images/cards/card-gourmet.webp',   c: ['#2A1A00','#6B4400'], note: 'Salted caramel ribbons through hazelnut praline ice cream.',         tags: ['Indulgent','Buttery','Complex'] },
  { name: 'Kesar Pista',          cat: 'Kulfi',      icon: '🌾', img: 'images/cards/card-kulfi.webp',     c: ['#2E1A00','#7A4800'], note: 'Pure Kashmiri saffron threads, Persian pistachios, set slow.',       tags: ['Heritage','Saffron','Royal']    },
  { name: 'Badam Pista Kesar',    cat: 'Kulfi',      icon: '🥜', img: 'images/cards/card-kulfi.webp',     c: ['#280F00','#6B2A00'], note: 'Three nuts, one kulfi — a centuries-old Indian tradition.',          tags: ['Traditional','Rich','Festive']  },
  { name: 'Malai Kulfi',          cat: 'Kulfi',      icon: '🍶', img: 'images/cards/card-kulfi.webp',     c: ['#1C1000','#4A2E00'], note: 'Pure malai reduced slowly — dense and impossibly creamy.',           tags: ['Classic','Dense','Pure']        },
  { name: 'Rajwadi',              cat: 'Kulfi',      icon: '👑', img: 'images/cards/card-kulfi.webp',     c: ['#1A0A20','#4A1A60'], note: 'Rose, cardamom, saffron — a kulfi fit for royalty.',                 tags: ['Regal','Floral','Aromatic']     },
  { name: 'Gulab Jamun',          cat: 'Fusion',     icon: '🍮', img: 'images/cards/card-fusion.webp',    c: ['#250A15','#6B1E35'], note: 'Where mithai meets cold — a scoop of pure nostalgia.',               tags: ['Fusion','Indian','Iconic']      },
  { name: 'Rasgulla Swirl',       cat: 'Fusion',     icon: '🌸', img: 'images/cards/card-fusion.webp',    c: ['#0A1A25','#1A4A65'], note: 'Bengali rasgulla essence ribboned through vanilla cloud.',            tags: ['Bengali','Delicate','Fusion']   },
  { name: 'Falooda',              cat: 'Fusion',     icon: '🌹', img: 'images/cards/card-fusion.webp',    c: ['#20080F','#5A1525'], note: 'Rose syrup, basil seeds, vermicelli — the street classic, elevated.', tags: ['Street','Layered','Mumbai']     },
  { name: 'Shahi Tukda',          cat: 'Fusion',     icon: '✨', img: 'images/cards/card-fusion.webp',    c: ['#1A1000','#4A3200'], note: 'Rabri-soaked bread pudding translated into frozen form.',             tags: ['Royal','Mughlai','Dessert']     },
  { name: 'Choco Fudge Badabite', cat: 'Novelty',    icon: '🍬', img: 'images/cards/card-novelty.webp',   c: ['#180A04','#4A1A08'], note: 'Thick chocolate shell cracking into fudge ice cream.',               tags: ['Kids','Chocolate','Crunchy']    },
  { name: 'Flingo Cone',          cat: 'Novelty',    icon: '🍦', img: 'images/cards/card-novelty.webp',   c: ['#0A0818','#1E1240'], note: 'American nuts stacked in a waffle cone you won\'t forget.',          tags: ['Cone','American','Crunchy']    },
  { name: 'Thunder Stick',        cat: 'Novelty',    icon: '⚡', img: 'images/cards/card-novelty.webp',   c: ['#0A1A05','#1A4A10'], note: 'Dual-flavour stick bar — cold, bold, electrifying.',                  tags: ['Stick','Bold','Dual-flavour']  },
  { name: 'Cookie Sandwich',      cat: 'Novelty',    icon: '🍪', img: 'images/cards/card-novelty.webp',   c: ['#1A1200','#4A3200'], note: 'Chocolate ice cream pressed between two crisp cookies.',              tags: ['Cookie','Chewy','Snack']        },
  { name: 'Vanilla Dream',        cat: 'Take Home',  icon: '🍨', img: 'images/cards/card-takehome.webp',  c: ['#18140A','#3A2E14'], note: 'Madagascar bourbon vanilla — the purest take-home pleasure.',         tags: ['Classic','Family','Pure']       },
  { name: 'Butterscotch',         cat: 'Take Home',  icon: '🧈', img: 'images/cards/card-takehome.webp',  c: ['#1E1200','#5A3600'], note: 'Golden toffee crumbles in buttery cream. A timeless favourite.',    tags: ['Golden','Toffee','Family']      },
  { name: 'Rainbow Cassatta',     cat: 'Take Home',  icon: '🌈', img: 'images/cards/card-takehome.webp',  c: ['#0A1025','#20286A'], note: 'Five layers, five flavours, one legendary Indian celebration.',      tags: ['Celebration','Layered','Classic']},
  { name: 'Choco Almond Fudge',   cat: 'Take Home',  icon: '🏔️', img: 'images/cards/card-takehome.webp', c: ['#120808','#3A1210'], note: 'Whole almonds, dark fudge ripples, premium cocoa base.',              tags: ['Premium','Nutty','Dark']        },
  { name: 'Kesar Sundae',         cat: 'Sundae',     icon: '🌟', img: 'images/cards/card-sundae.webp',    c: ['#1E1200','#5A3A00'], note: 'Saffron soft-serve drizzled with warm sugar syrup and dry fruits.',  tags: ['Parlour','Saffron','Warm']      },
  { name: 'Chocolate Sizzler',    cat: 'Sundae',     icon: '🔥', img: 'images/cards/card-sundae.webp',    c: ['#100404','#300808'], note: 'Hot chocolate lava poured over cold vanilla — theatre in a bowl.',   tags: ['Hot-Cold','Drama','Parlour']    },
];

/* ── FLAVOUR EXPLORER ───────────────────────────────────── */
const grid    = document.getElementById('flavour-grid');
const detail  = document.getElementById('f-detail');
const countEl = document.getElementById('exp-count');
let activeCat = 'all';
let searchQ   = '';

function buildGrid() {
  const filtered = FLAVOURS.filter(f => {
    const catOk  = activeCat === 'all' || f.cat === activeCat;
    const searchOk = !searchQ
      || f.name.toLowerCase().includes(searchQ)
      || f.cat.toLowerCase().includes(searchQ)
      || f.tags.some(t => t.toLowerCase().includes(searchQ));
    return catOk && searchOk;
  });

  countEl.textContent = filtered.length === FLAVOURS.length
    ? `Showing all ${FLAVOURS.length} flavours`
    : `Showing ${filtered.length} of ${FLAVOURS.length} flavours`;

  grid.innerHTML = '';
  detail.classList.remove('open');

  if (!filtered.length) {
    grid.innerHTML = '<div class="f-no-results">No flavours found for that search...</div>';
    return;
  }

  const fragment = document.createDocumentFragment();

  filtered.forEach(f => {
    const card = document.createElement('div');
    card.className = 'f-card';

    /* Use image if available, fallback to gradient */
    const bgStyle = f.img
      ? `background-image: url('${f.img}'); background-color: ${f.c[0]};`
      : `background: linear-gradient(135deg, ${f.c[0]} 0%, ${f.c[1]} 50%, ${f.c[0]} 100%);`;

    card.innerHTML = `
      <div class="f-card-bg" style="${bgStyle}"></div>
      <div class="f-icon" style="font-size:3.6rem;">${f.icon}</div>
      <div class="f-base">
        <span class="f-cat">${f.cat}</span>
        <span class="f-name">${f.name}</span>
      </div>
      <div class="f-hover">
        <div class="f-hn">${f.name}</div>
        <div class="f-hline"></div>
        <p class="f-hnote">${f.note}</p>
        <span class="f-htag">${f.cat}</span>
      </div>
    `;

    card.addEventListener('click', () => openDetail(f));
    card.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    card.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

function openDetail(f) {
  document.getElementById('fd-icon').textContent = f.icon;
  document.getElementById('fd-cat').textContent  = f.cat;
  document.getElementById('fd-name').textContent = f.name;
  document.getElementById('fd-desc').textContent = f.note;
  document.getElementById('fd-tags').innerHTML   =
    f.tags.map(t => `<span class="f-d-tag">${t}</span>`).join('');
  detail.classList.add('open');
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.getElementById('fd-close').addEventListener('click', () => {
  detail.classList.remove('open');
});

document.getElementById('filter-bar').addEventListener('click', e => {
  if (!e.target.matches('.filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  activeCat = e.target.dataset.cat;
  buildGrid();
});

document.getElementById('search-box').addEventListener('input', e => {
  searchQ = e.target.value.trim().toLowerCase();
  buildGrid();
});

/* Initial render */
buildGrid();
