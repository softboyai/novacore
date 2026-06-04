// NovaCore Hub – Main JavaScript (Modern, minimal)

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#') && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile nav if open
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav && !mobileNav.classList.contains('hidden')) {
          mobileNav.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
      }
    }
  });
});

// Header scroll effect
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// About section animate on scroll
function animateAboutSection() {
  const about = document.getElementById('about-animate');
  if (!about) return;
  const rect = about.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    about.classList.remove('opacity-0', 'translate-y-8');
    about.classList.add('opacity-100', 'translate-y-0');
    window.removeEventListener('scroll', animateAboutSection);
  }
}
window.addEventListener('scroll', animateAboutSection, { passive: true });
window.addEventListener('DOMContentLoaded', animateAboutSection);

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const navClose = document.getElementById('nav-close');
if (navToggle && mobileNav && navClose) {
  function openMobileNav() {
    mobileNav.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    mobileNav.setAttribute('aria-hidden', 'false');
  }
  function closeMobileNav() {
    mobileNav.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    mobileNav.setAttribute('aria-hidden', 'true');
  }
  navToggle.addEventListener('click', openMobileNav);
  navClose.addEventListener('click', closeMobileNav);
  document.querySelectorAll('#mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileNav.classList.contains('hidden')) closeMobileNav();
  });
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMobileNav();
  });
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.remove('hidden');
      scrollTopBtn.classList.add('flex');
    } else {
      scrollTopBtn.classList.add('hidden');
      scrollTopBtn.classList.remove('flex');
    }
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Theme toggle (dark/light) with persistence
(function themeToggle() {
  const STORAGE_KEY = 'novacore-theme';
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) applyTheme(stored);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    (function syncIcons() {
      const isDark = root.classList.contains('dark');
      const sun = toggle.querySelector('[data-icon="sun"]');
      const moon = toggle.querySelector('[data-icon="moon"]');
      if (sun && moon) {
        if (isDark) { sun.classList.add('hidden'); moon.classList.remove('hidden'); }
        else { sun.classList.remove('hidden'); moon.classList.add('hidden'); }
      }
    })();

    toggle.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
      const sun = toggle.querySelector('[data-icon="sun"]');
      const moon = toggle.querySelector('[data-icon="moon"]');
      if (sun && moon) {
        if (isDark) { sun.classList.add('hidden'); moon.classList.remove('hidden'); }
        else { sun.classList.remove('hidden'); moon.classList.add('hidden'); }
      }
    });
  }
})();

// Modal accessibility
(function enhanceModals() {
  const studentModal = document.getElementById('studentModal');
  const sponsorModal = document.getElementById('sponsorModal');

  function attachModalBehaviors(modal, closeCb) {
    if (!modal) return;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeCb();
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCb();
    });
  }

  if (window.closeStudentModal && studentModal) attachModalBehaviors(studentModal, window.closeStudentModal);
  if (window.closeSponsorModal && sponsorModal) attachModalBehaviors(sponsorModal, window.closeSponsorModal);
})();

// Dynamic content rendering (testimonials, partners)
(function dynamicLists() {
  function safeJson(url) {
    return fetch(url, { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null);
  }

  const scheduleLoad = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));

  // Testimonials
  const testimonialsGrid = document.getElementById('testimonials-grid');
  if (testimonialsGrid) {
    const loadTestimonials = () => {
      scheduleLoad(() => {
        safeJson('/content/testimonials.json').then(data => {
          if (!data || !Array.isArray(data.items)) return;
          testimonialsGrid.innerHTML = '';
          data.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white border border-gray-200 rounded-xl p-5 flex flex-col';

            const media = document.createElement('div');
            if (item.video) {
              media.className = 'aspect-video w-full mb-4 rounded-lg overflow-hidden';
              media.innerHTML = '<video controls preload="none" class="w-full h-full rounded-lg object-cover"><source src="' + item.video + '" type="video/mp4"></video>';
            } else if (item.photo) {
              media.className = 'w-full h-44 mb-4 rounded-lg overflow-hidden';
              media.innerHTML = '<img src="' + item.photo + '" alt="' + (item.name || '') + '" class="w-full h-full object-cover rounded-lg" loading="lazy">';
            } else {
              media.className = 'w-full h-44 mb-4 rounded-lg bg-gray-50 flex items-center justify-center';
              media.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>';
            }

            const info = document.createElement('div');
            info.innerHTML = '<div class="font-semibold text-gray-900 text-sm">' + (item.name || '') + '</div>' +
              (item.role ? '<div class="text-xs text-blue-600 mt-0.5">' + item.role + '</div>' : '') +
              (item.quote ? '<p class="text-gray-600 mt-2 text-xs leading-relaxed">' + item.quote + '</p>' : '');

            card.appendChild(media);
            card.appendChild(info);
            testimonialsGrid.appendChild(card);
          });
        });
      });
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { loadTestimonials(); observer.disconnect(); }
    }, { rootMargin: '200px' });
    observer.observe(testimonialsGrid);
  }

  // Partners
  const partnersRow = document.getElementById('partners-logos');
  if (partnersRow) {
    scheduleLoad(() => {
      safeJson('/content/partners.json').then(data => {
        if (!data || !Array.isArray(data.items)) return;
        partnersRow.innerHTML = '';
        data.items.forEach(p => {
          const wrap = document.createElement('div');
          wrap.className = 'flex flex-col items-center';
          const img = document.createElement('img');
          img.src = p.logo;
          img.alt = p.name || 'Partner';
          img.className = 'h-10 w-auto mb-2 object-contain opacity-70 hover:opacity-100 transition';
          img.loading = 'lazy';
          img.decoding = 'async';
          if (p.link) {
            const a = document.createElement('a');
            a.href = p.link;
            a.target = '_blank';
            a.rel = 'noopener';
            a.appendChild(img);
            wrap.appendChild(a);
          } else {
            wrap.appendChild(img);
          }
          if (p.name) {
            const cap = document.createElement('span');
            cap.className = 'text-gray-500 text-xs font-medium';
            cap.textContent = p.name;
            wrap.appendChild(cap);
          }
          partnersRow.appendChild(wrap);
        });
      });
    });
  }

  // Business Testimonials
  const businessTestimonialsGrid = document.getElementById('business-testimonials-grid');
  if (businessTestimonialsGrid) {
    scheduleLoad(() => {
      safeJson('/content/business-testimonials.json').then(data => {
        if (!data || !Array.isArray(data.items)) return;
        businessTestimonialsGrid.innerHTML = '';
        data.items.forEach(item => {
          const card = document.createElement('div');
          card.className = 'bg-white border border-gray-200 rounded-xl p-6 flex flex-col';
          if (item.photo) {
            const media = document.createElement('div');
            media.className = 'w-full h-44 rounded-lg mb-4 overflow-hidden';
            media.innerHTML = '<img src="' + item.photo + '" alt="' + (item.name || '') + '" class="w-full h-full object-cover rounded-lg" loading="lazy">';
            card.appendChild(media);
          }
          const info = document.createElement('div');
          info.className = 'flex-1';
          info.innerHTML = '<div class="font-semibold text-gray-900 text-sm mb-1">' + (item.name || '') + '</div>' +
            (item.role ? '<div class="text-xs text-blue-600 mb-3">' + item.role + '</div>' : '') +
            (item.quote ? '<p class="text-gray-600 text-xs leading-relaxed mb-4">"' + item.quote + '"</p>' : '') +
            (item.result ? '<div class="mt-auto pt-3 border-t border-gray-100"><span class="text-green-600 font-medium text-xs">' + item.result + '</span></div>' : '');
          card.appendChild(info);
          businessTestimonialsGrid.appendChild(card);
        });
      });
    });
  }
})();

// Reveal-on-scroll animations
(function revealOnScroll() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function markRevealElements() {
    document.querySelectorAll('section > div, .card, .program-card').forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', markRevealElements);
  else markRevealElements();
})();

// Consultation shortcuts
(function consultationShortcut() {
  function setConsultationSubject() {
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    if (subject) subject.value = 'Consultation Request';
    if (message && !message.value) message.value = 'I would like to request a consultation about my business needs.';
  }

  document.querySelectorAll('[data-action="consultation"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = document.querySelector('#contact');
      if (target) {
        e.preventDefault();
        setConsultationSubject();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get('consultation') === '1' || window.location.hash === '#consultation') {
    const target = document.querySelector('#contact');
    if (target) { setConsultationSubject(); target.scrollIntoView({ behavior: 'smooth' }); }
  }
})();

// Lightweight Lightbox for iSmart gallery
(function setupLightbox() {
  const images = document.querySelectorAll('img[data-lightbox="ismart-gallery"]');
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);display:none;align-items:center;justify-content:center;z-index:99999;cursor:pointer;';

  const img = document.createElement('img');
  img.style.cssText = 'max-width:90vw;max-height:85vh;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,0.5);';
  overlay.appendChild(img);

  function close() { overlay.style.display = 'none'; img.src = ''; }
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(overlay);
    images.forEach(el => {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', () => { img.src = el.src; overlay.style.display = 'flex'; });
    });
  });
})();


// iSmart Image Slider
(function ismartSlider() {
  const slides = document.getElementById('ismart-slides');
  const prev = document.getElementById('ismart-prev');
  const next = document.getElementById('ismart-next');
  const dots = document.querySelectorAll('#ismart-dots button');
  if (!slides || !prev || !next) return;

  let current = 0;
  const total = slides.children.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    slides.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach((dot, i) => {
      dot.className = i === current
        ? 'w-2 h-2 rounded-full bg-[#0A2A66] transition'
        : 'w-2 h-2 rounded-full bg-gray-300 transition';
    });
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Auto-slide every 4 seconds
  let autoSlide = setInterval(() => goTo(current + 1), 4000);

  // Pause auto-slide on hover
  const slider = document.getElementById('ismart-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => goTo(current + 1), 4000);
    });
  }
})();
