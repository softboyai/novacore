// Smooth scroll for anchor links
// You can add more JS functionality here

document.querySelectorAll('a[href^="#about"], a[href^="#home"], a[href^="#programs"], a[href^="#how-it-works"], a[href^="#business-services"], a[href^="#testimonials"], a[href^="#sponsor-us"], a[href^="#contact"], a[href^="#register"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // Only smooth scroll for on-page links
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Animate About Us section on scroll
function animateAboutSection() {
  const about = document.getElementById('about-animate');
  if (!about) return;
  const rect = about.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    about.classList.remove('opacity-0', 'translate-y-8');
    about.classList.add('opacity-100', 'translate-y-0');
    window.removeEventListener('scroll', animateAboutSection);
  }
}
window.addEventListener('scroll', animateAboutSection);
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
  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileNav.classList.contains('hidden')) closeMobileNav();
  });
  // Close when clicking backdrop (but not links)
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMobileNav();
  });
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.remove('hidden');
    } else {
      scrollTopBtn.classList.add('hidden');
    }
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
} 

// Theme toggle (dark/light) with persistence
(function themeToggle() {
  const STORAGE_KEY = 'novacore-theme';
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  // Initialize from storage or system preference
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    applyTheme(stored);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  // Watch system changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Add click handler if toggle exists
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    // Set correct icon state on load
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
      // Optional: swap icon
      const sun = toggle.querySelector('[data-icon="sun"]');
      const moon = toggle.querySelector('[data-icon="moon"]');
      if (sun && moon) {
        if (isDark) {
          sun.classList.add('hidden');
          moon.classList.remove('hidden');
        } else {
          sun.classList.remove('hidden');
          moon.classList.add('hidden');
        }
      }
    });
  }
})();

// Modal accessibility & usability enhancements
(function enhanceModals() {
  const studentModal = document.getElementById('studentModal');
  const sponsorModal = document.getElementById('sponsorModal');

  function attachModalBehaviors(modal, closeCb) {
    if (!modal) return;
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeCb();
    });
    // Click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCb();
    });
  }

  if (window.closeStudentModal && studentModal) {
    attachModalBehaviors(studentModal, window.closeStudentModal);
  }
  if (window.closeSponsorModal && sponsorModal) {
    attachModalBehaviors(sponsorModal, window.closeSponsorModal);
  }
})();

// Dynamic content rendering for testimonials, partners, sponsors
(function dynamicLists() {
  function safeJson(url) {
    return fetch(url, { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null);
  }

  // Testimonials
  const testimonialsGrid = document.getElementById('testimonials-grid');
  if (testimonialsGrid) {
    safeJson('/content/testimonials.json').then(data => {
      if (!data || !Array.isArray(data.items)) return;
      testimonialsGrid.innerHTML = '';
      data.items.forEach(item => {
        const hasVideo = !!item.video;
        const hasPhoto = !!item.photo;
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md p-4 flex flex-col';
        const media = document.createElement('div');
        media.className = hasVideo ? 'aspect-video w-full mb-4' : 'w-full h-48 flex items-center justify-center rounded-lg mb-4 bg-gray-100 overflow-hidden';
        if (hasVideo) {
          media.innerHTML = '<video controls preload="metadata" class="w-full h-full rounded-lg"><source src="' + item.video + '" type="video/mp4">Your browser does not support the video tag.</video>';
        } else if (hasPhoto) {
          media.innerHTML = '<img src="' + item.photo + '" alt="' + (item.name || 'Testimonial') + '" class="w-full h-full object-cover rounded-lg">';
        } else {
          media.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A8 8 0 1112 20a7.963 7.963 0 01-6.879-2.196z"/></svg>';
        }
        const info = document.createElement('div');
        info.className = 'px-1';
        info.innerHTML = '<div class="font-semibold text-gray-900">' + (item.name || '') + '</div>' +
          (item.role ? '<div class="text-blue-600 text-sm">' + item.role + '</div>' : '') +
          (item.quote ? '<p class="text-gray-700 mt-2 text-sm">' + item.quote + '</p>' : '');
        card.appendChild(media);
        card.appendChild(info);
        testimonialsGrid.appendChild(card);
      });
    });
  }

  // Partners
  const partnersRow = document.getElementById('partners-logos');
  if (partnersRow) {
    safeJson('/content/partners.json').then(data => {
      if (!data || !Array.isArray(data.items)) return;
      partnersRow.innerHTML = '';
      data.items.forEach(p => {
        const wrap = document.createElement('div');
        wrap.className = 'flex flex-col items-center';
        const img = document.createElement('img');
        img.src = p.logo;
        img.alt = p.name || 'Partner';
        img.className = 'h-12 w-auto mb-2 object-contain';
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
          cap.className = 'text-gray-600 text-sm font-medium';
          cap.textContent = p.name;
          wrap.appendChild(cap);
        }
        partnersRow.appendChild(wrap);
      });
    });
  }

  // Sponsors: disabled per request; keep placeholder logic removed
})();

// Reveal-on-scroll animations
(function revealOnScroll() {
  const observer = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 }) : null;

  function markRevealElements() {
    const elements = document.querySelectorAll('section, .card, .reveal');
    elements.forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      if (observer) observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markRevealElements);
  } else {
    markRevealElements();
  }
})();

// Consultation shortcuts: prefill contact form and scroll into view
(function consultationShortcut() {
  function setConsultationSubject() {
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    if (subject) subject.value = 'Consultation Request';
    if (message && !message.value) {
      message.value = 'I would like to request a consultation about my business needs.';
    }
  }

  // Click handlers for buttons with data-action="consultation"
  document.querySelectorAll('[data-action="consultation"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // enable smooth scroll to contact
      const target = document.querySelector('#contact');
      if (target) {
        e.preventDefault();
        setConsultationSubject();
        target.scrollIntoView({ behavior: 'smooth' });
        // If data-submit=formspree, wait briefly then submit form
        if (btn.getAttribute('data-submit') === 'formspree') {
          const form = document.getElementById('contactForm');
          if (form) {
            setTimeout(() => {
              form.requestSubmit ? form.requestSubmit() : form.submit();
            }, 400);
          }
        }
      }
    });
  });

  // Deep link support: ?consultation=1 or #consultation
  const params = new URLSearchParams(window.location.search);
  if (params.get('consultation') === '1' || window.location.hash === '#consultation') {
    const target = document.querySelector('#contact');
    if (target) {
      setConsultationSubject();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
})();