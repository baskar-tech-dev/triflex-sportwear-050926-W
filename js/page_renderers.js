document.addEventListener('DOMContentLoaded', () => {
  // 01. Homepage Category Tab Filter in Section 03 (2026 Collection)
  const showroomTabs = document.querySelectorAll('.showroom-tab-btn');
  const showroomGrid = document.getElementById('featured-products-container') || document.getElementById('digital-showroom-grid');

  if (showroomGrid) {
    renderShowroomGrid('all');

    showroomTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        showroomTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const cat = tab.getAttribute('data-category-tab') || tab.getAttribute('data-category') || 'all';
        renderShowroomGrid(cat);
      });
    });
  }

  function renderShowroomGrid(category) {
    if (!showroomGrid) return;
    const products = typeof getProductsByCategory === 'function' ? getProductsByCategory(category) : (typeof TRIFLEX_PRODUCTS !== 'undefined' ? TRIFLEX_PRODUCTS : []);
    
    let html = '';
    const displayItems = category === 'all' ? products.slice(0, 8) : products;
    displayItems.forEach(p => {
      html += renderProductCardHTML(p);
    });
    showroomGrid.innerHTML = html;
  }

  // 03. Collection Showroom Page (collection.html / men.html / women.html / kids.html)
  const collectionGrid = document.getElementById('collection-products-grid') || document.getElementById('category-products-grid');
  if (collectionGrid) {
    const pageCategory = document.body.getAttribute('data-category') || 'all';
    renderCollectionPage(pageCategory);

    // Filter controls
    const filterCategory = document.getElementById('filter-category');
    const filterGsm = document.getElementById('filter-gsm');
    const filterSearch = document.getElementById('filter-search');

    const triggerFilter = () => {
      const cat = filterCategory ? filterCategory.value : pageCategory;
      const gsm = filterGsm ? filterGsm.value : 'all';
      const search = filterSearch ? filterSearch.value.toLowerCase().trim() : '';

      let items = typeof getProductsByCategory === 'function' ? getProductsByCategory(cat) : (typeof TRIFLEX_PRODUCTS !== 'undefined' ? TRIFLEX_PRODUCTS : []);

      if (gsm !== 'all') {
        items = items.filter(p => p.gsm && p.gsm.includes(gsm));
      }
      if (search) {
        items = items.filter(p => 
          (p.productCode && p.productCode.toLowerCase().includes(search)) ||
          (p.wholesaleCode && p.wholesaleCode.toLowerCase().includes(search)) ||
          (p.name && p.name.toLowerCase().includes(search)) ||
          (p.fabric && p.fabric.toLowerCase().includes(search))
        );
      }

      let html = '';
      items.forEach(p => {
        html += renderProductCardHTML(p);
      });
      collectionGrid.innerHTML = html || '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">No articles match the selected filters.</div>';

      const countEl = document.getElementById('item-count-label');
      if (countEl) {
        countEl.textContent = `SHOWING ${items.length} WHOLESALE ARTICLES`;
      }
    };

    if (filterCategory) filterCategory.addEventListener('change', triggerFilter);
    if (filterGsm) filterGsm.addEventListener('change', triggerFilter);
    if (filterSearch) filterSearch.addEventListener('input', triggerFilter);
  }

  function renderCollectionPage(category) {
    if (!collectionGrid) return;
    const items = typeof getProductsByCategory === 'function' ? getProductsByCategory(category) : (typeof TRIFLEX_PRODUCTS !== 'undefined' ? TRIFLEX_PRODUCTS : []);
    let html = '';
    items.forEach(p => {
      html += renderProductCardHTML(p);
    });
    collectionGrid.innerHTML = html;

    const countEl = document.getElementById('item-count-label');
    if (countEl) {
      countEl.textContent = `SHOWING ${items.length} WHOLESALE ARTICLES`;
    }
  }

  // 04. Single Product Detail Page (product.html?id=men-01)
  if (document.body.id === 'pdp-page' || document.getElementById('pdp-main-content')) {
    renderSingleProductPage();
  }

  function renderSingleProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'men-01';
    const product = typeof getProductById === 'function' ? getProductById(productId) : null;
    if (!product) return;

    // Update Meta & Title
    document.title = `${product.name} (${product.productCode}) | TRIFLEX Wholesale Showroom`;

    // Populate Fields
    const codeEl = document.getElementById('pdp-code');
    const nameEl = document.getElementById('pdp-name');
    const categoryEl = document.getElementById('pdp-category');
    const storyEl = document.getElementById('pdp-story');
    const fabricEl = document.getElementById('pdp-fabric');
    const gsmEl = document.getElementById('pdp-gsm');
    const fitEl = document.getElementById('pdp-fit');
    const moqEl = document.getElementById('pdp-moq');
    const packEl = document.getElementById('pdp-pack');
    const customEl = document.getElementById('pdp-custom');
    const printEl = document.getElementById('pdp-print');
    const mainImgEl = document.getElementById('pdp-main-image');
    const thumbsContainer = document.getElementById('pdp-thumbs-container');
    const coloursContainer = document.getElementById('pdp-colours-list');

    const breadcrumbCategory = document.getElementById('pdp-breadcrumb-category');
    const badgeEl = document.getElementById('pdp-badge-tag');

    if (breadcrumbCategory) breadcrumbCategory.textContent = product.category.toUpperCase() + ' / ' + product.productCode;
    if (badgeEl && product.badge) badgeEl.textContent = product.badge;

    if (codeEl) codeEl.textContent = `${product.productCode} / ${product.wholesaleCode}`;
    if (nameEl) nameEl.textContent = product.name;
    if (categoryEl) categoryEl.textContent = product.category.toUpperCase();
    if (storyEl) storyEl.textContent = product.shortStory || '';
    if (fabricEl) fabricEl.textContent = product.fabric;
    if (gsmEl) gsmEl.textContent = product.gsm;
    if (fitEl) fitEl.textContent = product.fit;
    if (moqEl) moqEl.textContent = product.moq;
    if (packEl) packEl.textContent = product.packSize;
    if (customEl) customEl.textContent = product.customization;
    if (printEl) printEl.textContent = product.printing;

    const mainImg = (product.images && product.images[0]) ? product.images[0] : 'images/cat-tshirt.png';
    if (mainImgEl) mainImgEl.src = mainImg;

    if (thumbsContainer && product.images) {
      thumbsContainer.innerHTML = product.images.map((img, idx) => `
        <img src="${img}" alt="Thumb" class="pdp-thumb-img ${idx === 0 ? 'active' : ''}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px; cursor: pointer; border: 1px solid var(--border-color); margin-bottom: 8px;" onclick="document.getElementById('pdp-main-image').src='${img}'; document.querySelectorAll('.pdp-thumb-img').forEach(t=>t.style.borderColor='var(--border-color)'); this.style.borderColor='var(--accent-lime)';">
      `).join('');
    }

    if (coloursContainer && product.colours) {
      coloursContainer.innerHTML = product.colours.map(c => `
        <span style="padding: 6px 12px; background: #F3F4F6; border: 1px solid var(--border-color); border-radius: 4px; font-size: 0.8rem; color: var(--text-primary);">${c}</span>
      `).join('');
    }

    // Related Products
    const relatedGrid = document.getElementById('pdp-related-grid');
    if (relatedGrid) {
      const related = (typeof getProductsByCategory === 'function' ? getProductsByCategory(product.category) : []).filter(p => p.id !== product.id).slice(0, 4);
      relatedGrid.innerHTML = related.map(p => renderProductCardHTML(p)).join('');
    }
  }

  // 05. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('drawer-open-btn') || document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose = document.getElementById('drawer-close-btn');

  if (mobileToggle && mobileDrawer && mobileOverlay) {
    const openMobileNav = () => {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const drawerBody = mobileDrawer.querySelector('.drawer-body');
      if (drawerBody) {
        drawerBody.scrollTop = 0;
      }
    };

    const closeMobileNav = () => {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
    mobileOverlay.addEventListener('click', closeMobileNav);

    // Auto-close when clicking any link inside the mobile drawer
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Auto-close when launching RFQ modal or Quick Order from inside the drawer
    mobileDrawer.querySelectorAll('[data-open-rfq-modal], [data-open-quick-order]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        closeMobileNav();
      }
    });

    // Auto-close if screen is resized to desktop width (>= 992px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992 && mobileDrawer.classList.contains('active')) {
        closeMobileNav();
      }
    });

    // Highlight active link based on current path if not already marked
    try {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
      let foundExact = false;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
          link.classList.add('active');
          foundExact = true;
        }
      });
      if (!foundExact && (currentPath === 'men.html' || currentPath === 'women.html' || currentPath === 'kids.html')) {
        const colLink = mobileDrawer.querySelector('a[href="collection.html"]');
        if (colLink) colLink.classList.add('active');
      }
    } catch (err) {
      // safe fallback
    }
  }

  // 06. Interactive & Continuous Scrollable Announcement Bar (Marquee Ticker + Native Touch Swipe)
  initAnnouncementScrollTicker();
});

/**
 * Interactive & Continuous Scrollable Announcement Bar (Marquee Ticker + Native Touch Swipe)
 */
function initAnnouncementScrollTicker() {
  const scrollViews = document.querySelectorAll('.announcement-scroll-view');
  if (!scrollViews.length) return;

  scrollViews.forEach(scrollView => {
    const track = scrollView.querySelector('.announcement-track');
    const firstGroup = scrollView.querySelector('.announcement-group');
    if (!track || !firstGroup) return;

    // Remove fallback CSS marquee so JavaScript takes smooth subpixel scroll & touch control
    track.classList.remove('css-marquee');
    track.classList.add('js-controlled');

    let isInteracting = false;
    let resumeTimer = null;
    let currentScroll = scrollView.scrollLeft || 0;
    const speed = 0.65; // ~39px per second at 60fps — readable & smooth

    function getGroupWidth() {
      return firstGroup.offsetWidth || 0;
    }

    function step() {
      if (!isInteracting && !document.hidden) {
        const groupWidth = getGroupWidth();
        if (groupWidth > 0) {
          currentScroll += speed;
          if (currentScroll >= groupWidth) {
            currentScroll -= groupWidth;
          }
          scrollView.scrollLeft = currentScroll;
        }
      } else if (isInteracting) {
        currentScroll = scrollView.scrollLeft;
      }
      requestAnimationFrame(step);
    }

    // Start auto-scrolling loop
    requestAnimationFrame(step);

    // Pause on Mouse Hover (Desktop)
    scrollView.addEventListener('mouseenter', () => {
      isInteracting = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    });

    scrollView.addEventListener('mouseleave', () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        isInteracting = false;
      }, 600);
    });

    // Native Touch / Swipe Handling (Mobile)
    scrollView.addEventListener('touchstart', () => {
      isInteracting = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    }, { passive: true });

    scrollView.addEventListener('scroll', () => {
      if (isInteracting) {
        currentScroll = scrollView.scrollLeft;
        const groupWidth = getGroupWidth();
        if (groupWidth > 0) {
          if (scrollView.scrollLeft >= 2 * groupWidth) {
            scrollView.scrollLeft -= groupWidth;
            currentScroll = scrollView.scrollLeft;
          } else if (scrollView.scrollLeft <= 0) {
            scrollView.scrollLeft += groupWidth;
            currentScroll = scrollView.scrollLeft;
          }
        }
      }
    }, { passive: true });

    scrollView.addEventListener('touchend', () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        const groupWidth = getGroupWidth();
        if (groupWidth > 0) {
          currentScroll = scrollView.scrollLeft % groupWidth;
          scrollView.scrollLeft = currentScroll;
        }
        isInteracting = false;
      }, 1200);
    }, { passive: true });

    scrollView.addEventListener('touchcancel', () => {
      isInteracting = false;
    }, { passive: true });

    // Desktop Mouse Drag to Scroll
    let isMouseDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    scrollView.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      isInteracting = true;
      startX = e.pageX - scrollView.offsetLeft;
      startScrollLeft = scrollView.scrollLeft;
      if (resumeTimer) clearTimeout(resumeTimer);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - scrollView.offsetLeft;
      const walk = (x - startX) * 1.2;
      scrollView.scrollLeft = startScrollLeft - walk;
      currentScroll = scrollView.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        const groupWidth = getGroupWidth();
        if (groupWidth > 0) {
          currentScroll = scrollView.scrollLeft % groupWidth;
          scrollView.scrollLeft = currentScroll;
        }
        isInteracting = false;
      }, 800);
    });

    // Pause on Keyboard Focus for Accessibility
    scrollView.addEventListener('focusin', () => {
      isInteracting = true;
    });
    scrollView.addEventListener('focusout', () => {
      isInteracting = false;
    });
  });
}

/**
 * Direct WhatsApp Enquiry Controller
 * Sends structured WhatsApp message with product name, style code, product link, and wholesale inquiry text.
 */
window.sendWhatsAppEnquiry = function(productId, customMsg = '') {
  const p = (typeof TRIFLEX_PRODUCTS !== 'undefined' ? TRIFLEX_PRODUCTS.find(item => item.id === productId) : null)
         || (window.currentProduct && window.currentProduct.id === productId ? window.currentProduct : null);

  const waNumber = '919876543210';

  let productUrl = '';
  try {
    const loc = window.location;
    const origin = loc.origin || (loc.protocol + '//' + loc.host);
    const basePath = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    if (origin && origin !== 'null') {
      productUrl = `${origin}${basePath}product.html?id=${encodeURIComponent(productId)}`;
    } else {
      productUrl = `product.html?id=${encodeURIComponent(productId)}`;
    }
  } catch (err) {
    productUrl = `product.html?id=${encodeURIComponent(productId)}`;
  }

  let text = '';
  if (p) {
    const styleCode = p.productCode || p.wholesaleCode || p.id.toUpperCase();
    const gsm = p.gsm || '';
    const fabric = p.fabric || p.fabricBlend || '';
    const moq = p.moq || '48 Pcs';

    const lines = [
      `👋 *WHOLESALE PRODUCT ENQUIRY — TRIFLEX*`,
      ``,
      `📦 *Product Name:* ${p.name}`,
      `🏷️ *Style Code:* ${styleCode}`,
      gsm ? `⚖️ *Fabric / GSM:* ${gsm}${fabric ? ' (' + fabric + ')' : ''}` : '',
      `📊 *Minimum Order (MOQ):* ${moq}`,
      ``,
      `🔗 *Product Link:*`,
      `${productUrl}`,
      ``,
      `💬 *Inquiry Details:*`,
      customMsg || `Hello TRIFLEX Trade Sales Desk, I would like to enquire about wholesale pricing tiers, available sizes/colorways, fabric samples, and production lead times for this style.`
    ].filter(Boolean);

    text = lines.join('\n');
  } else {
    text = `Hello TRIFLEX Trade Sales Desk, I would like to enquire about wholesale sportswear article (${productId}). Product link: ${productUrl}`;
  }

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
};

// Global delegated event listener for all WhatsApp Enquiry triggers
document.addEventListener('click', (e) => {
  const waBtn = e.target.closest('[data-wa-enquire]');
  if (waBtn) {
    e.preventDefault();
    e.stopPropagation();
    const id = waBtn.getAttribute('data-wa-enquire');
    window.sendWhatsAppEnquiry(id);
  }
});

/**
 * Universal HTML Generator for Product B2B Cards (Compact Showroom Density)
 */
function renderProductCardHTML(p) {
  const mainImg = (p.images && p.images[0]) ? p.images[0] : 'images/cat-tshirt.png';
  return `
    <div class="product-b2b-card" data-product-id="${p.id}">
      <div class="product-img-wrapper">
        <img src="${mainImg}" alt="${p.name}" class="product-card-img" loading="lazy">
        ${p.badge ? `<span class="product-badge-tag">${p.badge}</span>` : ''}
        
        <!-- Direct WhatsApp Enquire Button on Product Image -->
        <button type="button" class="product-img-wa-btn" data-wa-enquire="${p.id}" title="Enquire about ${p.name} on WhatsApp" aria-label="Enquire about ${p.name} on WhatsApp">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>ENQUIRE</span>
        </button>

        <button type="button" class="product-quick-view-btn" data-open-quick-view="${p.id}" title="Quick Spec Preview">
          QUICK VIEW
        </button>
      </div>

      <div class="product-card-body">
        <div>
          <div class="product-meta-top">
            <span class="product-code-pill">${p.productCode || p.wholesaleCode}</span>
            <span class="product-gsm-pill">${p.gsm}</span>
          </div>
          <h3 class="product-card-title">
            <a href="product.html?id=${p.id}">${p.name}</a>
          </h3>
        </div>

        <div>
          <div class="moq-info-badge">
            <span>MIN ORDER</span>
            <span class="moq-val">${p.moq}</span>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 10px;">
            <button type="button" class="btn-wa-card" data-wa-enquire="${p.id}" style="flex: 1;" title="Enquire about ${p.name} on WhatsApp">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>ENQUIRE</span>
            </button>
            <button type="button" class="btn-primary product-card-action" data-add-to-enquiry="${p.id}" data-qty="50" style="padding: 9px 14px;" title="Add to enquiry bag">
              <span>+ BAG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
