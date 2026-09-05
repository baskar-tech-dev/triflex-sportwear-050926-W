/**
 * TRIFLEX Master JavaScript Engine
 * Powers interactive components, carousels, size/color selectors, 
 * accordions, category filters, mobile navigation, and inquiry modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  initSplashAnimation();
  initHeaderAndMobileNav();
  initFAQAccordion();
  initProductSpotlightCard();
  initCategoryFilters();
  initInquiryModal();
});

/* ==========================================
   CINEMATIC SHUTTER & PORTAL ZOOM SPLASH SCREEN
   ========================================== */
function initSplashAnimation() {
  const splashScreen = document.getElementById('splash-screen');
  if (!splashScreen) return;

  // At 1.2s, fade in official brand logo from assets/main/main-logo-white.png
  setTimeout(() => {
    splashScreen.classList.add('reveal-official');
  }, 1200);

  // At 1.7s (burst draw + thickening + logo resolve + hold), trigger shutter split & portal zoom reveal
  setTimeout(() => {
    splashScreen.classList.add('reveal-active');
    document.body.classList.add('splash-revealing');

    setTimeout(() => {
      splashScreen.classList.add('reveal-finished');
      document.body.classList.remove('splash-revealing');
    }, 850);
  }, 1700);
}

/* ==========================================
   HEADER & MOBILE DRAWER NAVIGATION
   ========================================== */
function initHeaderAndMobileNav() {
  const header = document.getElementById('main-header');
  const drawerOpenBtn = document.getElementById('drawer-open-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const drawerNavLinks = document.querySelectorAll('.drawer-nav');

  if (!header) return;

  // Header Scroll Direction & Compression Transformation
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 40) {
      header.classList.add('scrolled');

      if (currentScrollY > lastScrollY + 6 && currentScrollY > 120) {
        header.classList.add('scroll-down');
        header.classList.remove('scroll-up');
      } else if (currentScrollY < lastScrollY - 6) {
        header.classList.add('scroll-up');
        header.classList.remove('scroll-down');
      }
    } else {
      header.classList.remove('scrolled', 'scroll-down', 'scroll-up');
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Full-Screen Mobile Drawer Toggle Logic
  function openDrawer() {
    if (!mobileDrawer || !mobileOverlay) return;
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    if (drawerOpenBtn) drawerOpenBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer || !mobileOverlay) return;
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    if (drawerOpenBtn) drawerOpenBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (drawerOpenBtn) drawerOpenBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  drawerNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on Escape key press (WCAG AA Accessibility)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================
   FAQ ACCORDION TOGGLE
   ========================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all accordions
      faqItems.forEach(el => el.classList.remove('active'));

      // Toggle clicked accordion
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================
   INTERACTIVE PRODUCT SPOTLIGHT CARD
   ========================================== */
function initProductSpotlightCard() {
  const spotlightImg = document.getElementById('spotlight-img');
  const swatches = document.querySelectorAll('.swatch-circle');
  const sizePills = document.querySelectorAll('.size-pill');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dots = document.querySelectorAll('#carousel-dots .dot-item');

  // Product Color Images Array
  const colorImages = {
    black: 'images/prod-1.png',
    white: 'images/prod-2.png',
    grey: 'images/prod-4.png',
    neon: 'images/prod-5.png'
  };

  const carouselImages = [
    'images/prod-1.png',
    'images/prod-2.png',
    'images/prod-3.png',
    'images/prod-5.png'
  ];

  let currentImageIndex = 0;

  function updateSpotlightImage(index) {
    currentImageIndex = index;
    if (spotlightImg) {
      spotlightImg.style.opacity = '0';
      spotlightImg.style.transform = 'scale(0.95)';
      setTimeout(() => {
        spotlightImg.src = carouselImages[currentImageIndex];
        spotlightImg.style.opacity = '1';
        spotlightImg.style.transform = 'scale(1)';
      }, 200);
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentImageIndex);
    });
  }

  // Carousel Controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
      updateSpotlightImage(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIndex = (currentImageIndex + 1) % carouselImages.length;
      updateSpotlightImage(newIndex);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateSpotlightImage(index);
    });
  });

  // Color Swatch Selection
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const color = swatch.dataset.color;
      if (color && colorImages[color] && spotlightImg) {
        spotlightImg.style.opacity = '0';
        setTimeout(() => {
          spotlightImg.src = colorImages[color];
          spotlightImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  // Size Pill Selection
  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      sizePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

/* ==========================================
   CATEGORY FILTER TABS
   ========================================== */
function initCategoryFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('[data-category]');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.dataset.filter;

      productCards.forEach(card => {
        if (filterValue === 'all' || card.dataset.category === filterValue) {
          card.style.display = '';
          card.style.opacity = '1';
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            if (!card.classList.contains('active')) {
              card.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });
}

/* ==========================================
   INQUIRY MODAL DIALOG
   ========================================== */
function initInquiryModal() {
  const modal = document.getElementById('inquiry-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const triggerBtns = document.querySelectorAll('.trigger-enquire');

  function openModal() {
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}
