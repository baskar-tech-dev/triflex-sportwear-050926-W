/**
 * TRIFLEX DARK CINEMATIC HERO SECTION INTERACTIVE CONTROLLER
 * Handles tab transitions, slider navigation, mobile pills, scroll cues, and B2B modal hooks.
 */

(function () {
  'use strict';

  // Collection Slide Definitions
  const slides = [
    {
      id: 'mens',
      num: '01',
      title: "MEN'S WEAR",
      bgClass: 'hero-bg-slide-mens',
      progress: '25%'
    },
    {
      id: 'womens',
      num: '02',
      title: "WOMEN'S WEAR",
      bgClass: 'hero-bg-slide-womens',
      progress: '50%'
    },
    {
      id: 'kids',
      num: '03',
      title: 'KIDS WEAR',
      bgClass: 'hero-bg-slide-kids',
      progress: '75%'
    },
    {
      id: 'teams',
      num: '04',
      title: 'SPORTS TEAM',
      bgClass: 'hero-bg-slide-teams',
      progress: '100%'
    }
  ];

  let currentSlideIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 6000; // 6 seconds

  function initHero() {
    const desktopTabs = document.querySelectorAll('.hero-cat-tab');
    const mobilePills = document.querySelectorAll('.hero-mobile-pill-item');
    const prevBtn = document.querySelector('.hero-nav-arrow-btn.prev-btn');
    const nextBtn = document.querySelector('.hero-nav-arrow-btn.next-btn');
    const pageNumActive = document.querySelector('.hero-page-num-active');
    const progressBar = document.querySelector('.hero-progress-bar');
    const bgSlides = document.querySelectorAll('.hero-bg-slide');
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    const darkHeader = document.querySelector('.hero-dark-header');

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentSlideIndex = index;

      const slide = slides[currentSlideIndex];

      // Update Desktop Tabs
      desktopTabs.forEach((tab, i) => {
        if (i === currentSlideIndex) {
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.classList.remove('active');
          tab.setAttribute('aria-selected', 'false');
        }
      });

      // Update Mobile Pills
      mobilePills.forEach((pill, i) => {
        if (i === currentSlideIndex) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });

      // Update Background Slide
      bgSlides.forEach((slideEl, i) => {
        if (i === currentSlideIndex) {
          slideEl.classList.add('active');
        } else {
          slideEl.classList.remove('active');
        }
      });

      // Update Slide Number and Progress
      if (pageNumActive) {
        pageNumActive.textContent = slide.num;
      }
      if (progressBar) {
        progressBar.style.width = slide.progress;
      }
    }

    // Attach Desktop Tab Listeners
    desktopTabs.forEach((tab, i) => {
      tab.addEventListener('click', function () {
        goToSlide(i);
        restartAutoplay();
      });
    });

    // Attach Mobile Pill Listeners
    mobilePills.forEach((pill, i) => {
      pill.addEventListener('click', function () {
        goToSlide(i);
        restartAutoplay();
      });
    });

    // Prev / Next Arrow Buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goToSlide(currentSlideIndex - 1);
        restartAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goToSlide(currentSlideIndex + 1);
        restartAutoplay();
      });
    }

    // Keyboard Arrow navigation
    window.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentSlideIndex - 1);
        restartAutoplay();
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlideIndex + 1);
        restartAutoplay();
      }
    });

    // Scroll To Explore button
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector('#collection-discovery') || document.querySelector('#brand-introduction') || document.querySelector('main > section:nth-of-type(2)');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
        }
      });
    }

    // Header floating sticky styling on scroll
    function handleHeaderScroll() {
      if (!darkHeader) return;
      if (window.scrollY > 20) {
        darkHeader.classList.add('header-scrolled');
      } else {
        darkHeader.classList.remove('header-scrolled');
      }
    }
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // Autoplay handling
    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(function () {
        goToSlide(currentSlideIndex + 1);
      }, AUTOPLAY_INTERVAL);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Pause autoplay on mouse hover over hero
    const heroMaster = document.querySelector('.hero-dark-master');
    if (heroMaster) {
      heroMaster.addEventListener('mouseenter', stopAutoplay);
      heroMaster.addEventListener('mouseleave', startAutoplay);
    }

    startAutoplay();

    // Touch Swipe Gesture Support for Mobile
    if (heroMaster) {
      let touchStartX = 0;
      let touchEndX = 0;
      let touchStartY = 0;
      let touchEndY = 0;

      heroMaster.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      heroMaster.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Ensure swipe is predominantly horizontal
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
          if (diffX < 0) {
            // Swiped left -> next slide
            goToSlide(currentSlideIndex + 1);
          } else {
            // Swiped right -> prev slide
            goToSlide(currentSlideIndex - 1);
          }
          restartAutoplay();
        }
      }, { passive: true });
    }

    // Design Mockup Preview Modal
    const previewTrigger = document.querySelector('#open-design-preview-btn');
    const previewModal = document.querySelector('#design-modal-overlay');
    const previewClose = document.querySelector('#close-design-preview-btn');

    if (previewTrigger && previewModal) {
      previewTrigger.addEventListener('click', function () {
        previewModal.classList.add('open');
      });
    }

    if (previewClose && previewModal) {
      previewClose.addEventListener('click', function () {
        previewModal.classList.remove('open');
      });
    }

    if (previewModal) {
      previewModal.addEventListener('click', function (e) {
        if (e.target === previewModal) {
          previewModal.classList.remove('open');
        }
      });
    }

    // Smartphone Device Simulator Modal
    const mobileDeviceTrigger = document.querySelector('#open-mobile-device-btn');
    const mobileDeviceModal = document.querySelector('#mobile-device-modal-overlay');
    const mobileDeviceClose = document.querySelector('#close-mobile-device-btn');

    if (mobileDeviceTrigger && mobileDeviceModal) {
      mobileDeviceTrigger.addEventListener('click', function () {
        mobileDeviceModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (mobileDeviceClose && mobileDeviceModal) {
      mobileDeviceClose.addEventListener('click', function () {
        mobileDeviceModal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    if (mobileDeviceModal) {
      mobileDeviceModal.addEventListener('click', function (e) {
        if (e.target === mobileDeviceModal) {
          mobileDeviceModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // If running inside iframe (simulator), hide presentation panels
    if (window.self !== window.top) {
      const presentationPanel = document.querySelector('#client-presentation-panel');
      if (presentationPanel) {
        presentationPanel.style.display = 'none';
      }
    }

    // Hook Header Actions with Existing Triflex Modals if loaded
    const headerEnquireBtn = document.querySelector('.hero-enquire-pill-btn');
    if (headerEnquireBtn) {
      headerEnquireBtn.addEventListener('click', function (e) {
        const rfqModal = document.querySelector('#rfq-quote-modal-overlay');
        if (rfqModal) {
          e.preventDefault();
          rfqModal.classList.add('active');
          rfqModal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    }

    const headerBagBtn = document.querySelector('.hero-bag-btn');
    if (headerBagBtn) {
      headerBagBtn.addEventListener('click', function (e) {
        const drawer = document.querySelector('#enquiry-drawer-overlay') || document.querySelector('.enquiry-drawer-overlay') || document.querySelector('#enquiry-drawer');
        if (drawer) {
          e.preventDefault();
          drawer.classList.add('active');
          const backdrop = document.querySelector('#drawer-backdrop');
          if (backdrop) backdrop.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    const searchBtn = document.querySelector('.hero-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', function (e) {
        const searchModal = document.querySelector('#search-modal-overlay') || document.querySelector('.search-modal-overlay');
        if (searchModal) {
          e.preventDefault();
          searchModal.classList.add('active');
          searchModal.style.display = 'flex';
          const input = searchModal.querySelector('input');
          if (input) setTimeout(() => input.focus(), 150);
        }
      });
    }

    const mobileToggle = document.querySelector('.hero-mobile-toggle-btn');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function (e) {
        const mobileDrawer = document.querySelector('#mobile-drawer');
        const mobileOverlay = document.querySelector('#mobile-overlay');
        if (mobileDrawer && mobileOverlay) {
          e.preventDefault();
          mobileDrawer.classList.add('active');
          mobileOverlay.classList.add('active');
          mobileToggle.setAttribute('aria-expanded', 'true');
          document.body.style.overflow = 'hidden';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero);
  } else {
    initHero();
  }
})();
