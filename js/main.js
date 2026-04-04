/* ============================================
   Scroll Reveal (Intersection Observer)
   ============================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ============================================
   Navbar scroll effect
   ============================================ */
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  nav.classList.toggle('scrolled', scrollY > 50);
  lastScroll = scrollY;
});

/* ============================================
   Mobile nav toggle
   ============================================ */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ============================================
   Animated counters
   ============================================ */
function animateCounter(el) {
  const target = el.getAttribute('data-target');
  const suffix = el.getAttribute('data-suffix') || '';
  const isPercent = target.includes('.');
  const targetNum = parseFloat(target);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = targetNum * ease;

    if (isPercent) {
      el.textContent = current.toFixed(1) + suffix;
    } else {
      el.textContent = Math.round(current) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-target]').forEach((el) => counterObserver.observe(el));

/* ============================================
   Face Pair Carousel
   ============================================ */
const carousel = document.getElementById('faceCarousel');
if (carousel) {
  const pairs = carousel.querySelectorAll('.face-pair');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  let current = 0;
  let autoplayTimer = null;
  const AUTOPLAY_MS = 4000;

  function goTo(index, direction) {
    const old = pairs[current];
    const next = pairs[index];

    // Exit old
    old.classList.remove('active');
    old.classList.add(direction === 'next' ? 'exit-left' : '');
    old.style.transform = direction === 'next' ? 'translateX(-30px)' : 'translateX(30px)';
    old.style.opacity = '0';

    // Enter new
    next.style.transform = direction === 'next' ? 'translateX(30px)' : 'translateX(-30px)';
    next.style.opacity = '0';
    next.classList.remove('exit-left');

    // Force reflow, then animate in
    void next.offsetWidth;
    next.classList.add('active');
    next.style.transform = '';
    next.style.opacity = '';

    // Update dots
    dots.forEach((d) => d.classList.remove('active'));
    dots[index].classList.add('active');

    current = index;
  }

  function goNext() {
    goTo((current + 1) % pairs.length, 'next');
  }

  function goPrev() {
    goTo((current - 1 + pairs.length) % pairs.length, 'prev');
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(goNext, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  nextBtn.addEventListener('click', () => { goNext(); startAutoplay(); });
  prevBtn.addEventListener('click', () => { goPrev(); startAutoplay(); });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index);
      if (idx !== current) {
        goTo(idx, idx > current ? 'next' : 'prev');
        startAutoplay();
      }
    });
  });

  // Start autoplay
  startAutoplay();

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
}

/* ============================================
   Smooth scroll for anchor links
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

/* ============================================
   Image lightbox
   ============================================ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.zoomable').forEach((img) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

/* ============================================
   Active nav link highlighting
   ============================================ */
const sections = document.querySelectorAll('.section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.style.color =
            a.getAttribute('href') === '#' + entry.target.id
              ? 'var(--text-primary)'
              : '';
        });
      }
    });
  },
  { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));
