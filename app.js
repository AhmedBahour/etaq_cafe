/**
 * ETAQ COFFEE (قهوة عتاق) - LUXURY INTERACTIVE CLIENT ENGINE
 * Features:
 * - Ambient Web Audio Oud/Lounge Synthesizer
 * - Dynamic Order Basket with WhatsApp VIP Order Dispatch
 * - VIP Table & Majlis Booking Engine
 * - Interactive Video Reel Lightbox & Gallery
 * - Realtime Open/Closed Status
 * - Responsive Mobile Drawer
 */

// Global State
const state = {
  cart: [],
  activeFilter: 'all'
};

// Menu Data
const menuDatabase = {
  coffee: [
    { id: 'v60-ethiopia', name: 'V60 مقطرة - إثيوبيا شلشلي', price: 24, tag: 'محصول نخبوي', notes: 'إيحاءات الياسمين، الخوخ، وحلاوة العسل الصافي' },
    { id: 'v60-colombia', name: 'V60 مقطرة - كولومبيا قيشا', price: 29, tag: 'إصدار محدود', notes: 'إيحاءات الفواكه الاستوائية والزهور البيضاء' },
    { id: 'flat-white', name: 'فلات وايت عتاق', price: 21, tag: 'الأكثر طلباً', notes: 'تناغم حريري بين دبل ريستريتو وحليب مبخر بقوام مخملي' },
    { id: 'cortado', name: 'كورتادو كلاسيك', price: 19, tag: 'نكهة أصيلة', notes: 'توازن دقيق وقوي بين الإسبريسو المركز وقطرات الحليب' },
    { id: 'spanish-latte', name: 'سبانش لاتيه عتاق البارد', price: 25, tag: 'توقيع عتاق', notes: 'وصفة عتاق الحصرية بحليب مكثف محلى ونكهة كراميل معتق' },
    { id: 'cold-brew', name: 'كولد برو معتق 18 ساعة', price: 27, tag: 'تنقيع بارد', notes: 'استخلاص بطيء لقهوة ناعمة منخفضة الحموضة بلمسات شوكولاتة' }
  ],
  refreshing: [
    { id: 'tea-karkadeh', name: 'ايس تي كركديه عتاق', price: 18, tag: 'انتعاش الصيف', notes: 'كركديه بلدي مُقطر بارداً مع أوراق النعناع وقطع التوت البري' },
    { id: 'tea-matcha', name: 'ايس تي ماتشا بارد', price: 26, tag: 'ماتشا يابانية', notes: 'بودرة ماتشا احتفالية نقية مخلوطة بحليب الشوفان البارد والثلج' },
    { id: 'tea-habaq', name: 'ايس تي حبق أصيل', price: 18, tag: 'عطري فريد', notes: 'شاي بارد منقوع بنكهة الحبق المديني الزكية ولمسة ليمون منعشة' },
    { id: 'etaq-mojito', name: 'موهيتو رمان عتاق', price: 22, tag: 'مُثلج', notes: 'حبات الرمان الطبيعي مع الصودا الفوارة والنعناع المنعش' }
  ],
  bakery: [
    { id: 'khaliah-etaq', name: 'خلية عتاق الذهبية', price: 34, tag: 'تحفة المقهى', notes: 'تخبز يومياً مرتين من يد الشيف، هشة ومحشوة بالجبن ومسقية بالعسل والسمسم' },
    { id: 'date-cake', name: 'كيكة التمر النجدية الفاخرة', price: 28, tag: 'تراثية', notes: 'تمر خلاص القصيم الفاخر مع صوص التوفي الدافئ ورشة هيل وزعفران' },
    { id: 'saffron-cheesecake', name: 'تشيزكيك الزعفران الملكي', price: 32, tag: 'مذاق غني', notes: 'قوام كريمي فاخر منقوع بخيوط الزعفران الأصلي وقاعدة البسكويت المقرمش' },
    { id: 'belgian-brownies', name: 'براونيز الشوكولاتة البلجيكية', price: 24, tag: 'دافئ ولذيذ', notes: 'شوكولاتة داكنة 70% تقدم دافئة مع آيسكريم الفانيليا' }
  ],
  oud: [
    { id: 'oud-etaq-pouch', name: 'كيس عود عتاق الموروث (أوقية)', price: 120, tag: 'بخور ملكي', notes: 'كسر عود طبيعي فاخر تم اختياره بعناية لتطييب المجالس والضيوف' },
    { id: 'majlis-experience', name: 'جلسة تطييب عتاق الخاصة (طاولة)', price: 45, tag: 'ضيافة متكاملة', notes: 'مبخرة عتاق التقليدية توضع على طاولتكم مع أجود خشب العود المعتق' },
    { id: 'gift-box', name: 'صندوق إهداء عتاق الفاخر', price: 180, tag: 'هدية راقية', notes: 'علبة هدايا جلدية تضم ربع تولة عود فاخر مع محصول قهوة مختصة' }
  ]
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMenuRenderer('all');
  initCartEngine();
  initBookingEngine();
  initGalleryLightbox();
  checkLiveStatus();
  initReelControls();
});

/* ==========================================================================
   NAVBAR & LIVE STATUS
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.right = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(250, 245, 238, 0.98)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }
    });
  }
}

function checkLiveStatus() {
  const now = new Date();
  const hours = now.getHours();
  // Etaq opens 6:00 AM to 1:00 AM
  const isOpen = hours >= 6 || hours < 1;
  const statusEl = document.getElementById('liveStatusText');
  if (statusEl) {
    if (isOpen) {
      statusEl.innerHTML = 'مفتوح الآن • نرحب بكم حتى 1:00 ص في الرياض';
    } else {
      statusEl.innerHTML = 'نستقبلكم بدءاً من 6:00 صباحاً • الرياض';
    }
  }
}

/* ==========================================================================
   MENU RENDERER & CATEGORY FILTER
   ========================================================================== */
function initMenuRenderer(category = 'all') {
  const container = document.getElementById('menuItemsContainer');
  if (!container) return;

  let itemsToRender = [];
  if (category === 'all') {
    itemsToRender = [
      ...menuDatabase.coffee,
      ...menuDatabase.refreshing,
      ...menuDatabase.bakery,
      ...menuDatabase.oud
    ];
  } else if (menuDatabase[category]) {
    itemsToRender = menuDatabase[category];
  }

  container.innerHTML = itemsToRender.map(item => `
    <div class="menu-item-row" data-id="${item.id}">
      <div class="menu-item-info">
        <div class="menu-item-header">
          <span class="menu-item-name">${item.name}</span>
          ${item.tag ? `<span class="menu-item-tag">${item.tag}</span>` : ''}
        </div>
        <p class="menu-item-notes">${item.notes}</p>
      </div>
      <div class="menu-item-actions">
        <span class="menu-item-price">${item.price} <small style="font-size:0.75rem; color:var(--text-muted);">﷼</small></span>
        <button class="btn-add-cart-mini" onclick="addToCart('${item.id}', '${item.name}', ${item.price})" title="إضافة للطلب">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  `).join('');

  // Tab buttons
  const tabBtns = document.querySelectorAll('.menu-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const cat = e.currentTarget.dataset.category;
      initMenuRenderer(cat);
    });
  });
}

/* ==========================================================================
   CART & WHATSAPP VIP DISPATCH
   ========================================================================== */
function initCartEngine() {
  const openCartBtn = document.getElementById('cartTriggerBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const overlay = document.getElementById('cartDrawerOverlay');
  const whatsappCheckoutBtn = document.getElementById('whatsappCheckoutBtn');

  if (openCartBtn && overlay) {
    openCartBtn.addEventListener('click', () => overlay.classList.add('active'));
  }
  if (closeCartBtn && overlay) {
    closeCartBtn.addEventListener('click', () => overlay.classList.remove('active'));
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  }

  if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener('click', handleWhatsAppCheckout);
  }
}

window.addToCart = function(id, name, price) {
  const existing = state.cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id, name, price, qty: 1 });
  }
  updateCartUI();
  showToast(`تمت إضافة "${name}" إلى قائمة طلبك`);
};

function updateCartQty(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== id);
  }
  updateCartUI();
}

function updateCartUI() {
  const counter = document.getElementById('cartCounter');
  const body = document.getElementById('cartBody');
  const totalEl = document.getElementById('cartTotalVal');

  const totalQty = state.cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  if (counter) counter.innerText = totalQty;
  if (totalEl) totalEl.innerText = `${totalPrice} ﷼`;

  if (body) {
    if (state.cart.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 3rem 1rem;">
          <i class="fa-solid fa-mug-hot" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--amber-gold);"></i>
          <p style="font-weight: 700;">سلة طلبك فارغة</p>
          <p style="font-size: 0.85rem;">اختر ما تشتهيه من قائمة القهوة والمشروبات وحلا عتاق</p>
        </div>
      `;
    } else {
      body.innerHTML = state.cart.map(item => `
        <div class="cart-item">
          <div>
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">${item.price * item.qty} ﷼ (${item.price} ﷼ للواحد)</div>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span style="font-weight:800; font-size:0.9rem;">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
      `).join('');
    }
  }
}

function handleWhatsAppCheckout() {
  if (state.cart.length === 0) {
    showToast('الرجاء إضافة أصناف إلى الطلب أولاً');
    return;
  }

  const totalPrice = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  let message = `مرحباً قهوة عتاق ☕✨\nأود طلب الأصناف التالية للاستلام المسبق:\n\n`;

  state.cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} × ${item.qty} (${item.price * item.qty} ﷼)\n`;
  });

  message += `\n💰 الإجمالي: ${totalPrice} ﷼\n📍 فرع الرياض\nشكراً لكم!`;

  const phone = '966554044383'; // Etaq official WhatsApp line
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/* ==========================================================================
   BOOKING & MAJLIS RESERVATIONS
   ========================================================================== */
function initBookingEngine() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookName').value;
    const phone = document.getElementById('bookPhone').value;
    const date = document.getElementById('bookDate').value;
    const time = document.getElementById('bookTime').value;
    const type = document.getElementById('bookType').value;
    const notes = document.getElementById('bookNotes').value || 'لا يوجد';

    const bookingRef = 'ETAQ-' + Math.floor(1000 + Math.random() * 9000);

    const waText = `طلب حجز مجلس / جلسة في قهوة عتاق 🏛️\n` +
      `رقم الطلب: ${bookingRef}\n` +
      `الاسم: ${name}\n` +
      `رقم الجوال: ${phone}\n` +
      `التاريخ: ${date}\n` +
      `الوقت: ${time}\n` +
      `نوع الجلسة: ${type}\n` +
      `ملاحظات خاصة: ${notes}\n` +
      `نرجو تأكيد الحجز، شكراً لكم!`;

    const url = `https://wa.me/966554044383?text=${encodeURIComponent(waText)}`;

    // Show confirmation modal
    alert(`تم تسجيل طلب حجزك بنجاح! كود الحجز: ${bookingRef}\nسنقوم بنقلك الآن لتأكيد الحجز الفوري عبر واتساب.`);
    window.open(url, '_blank');
    form.reset();
  });
}

/* ==========================================================================
   GALLERY & VIDEO LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('closeLightboxBtn');
  const container = document.getElementById('lightboxMediaContainer');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      if (container) container.innerHTML = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        if (container) container.innerHTML = '';
      }
    });
  }
}

window.openLightboxImage = function(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const container = document.getElementById('lightboxMediaContainer');
  if (!modal || !container) return;

  container.innerHTML = `
    <img src="${src}" class="lightbox-img" alt="${caption || 'عتاق'}">
    ${caption ? `<div style="color: #FFFFFF; text-align: center; margin-top: 1rem; font-weight: 700;">${caption}</div>` : ''}
  `;
  modal.classList.add('active');
};

window.openLightboxVideo = function(src, title) {
  const modal = document.getElementById('lightboxModal');
  const container = document.getElementById('lightboxMediaContainer');
  if (!modal || !container) return;

  container.innerHTML = `
    <video src="${src}" class="lightbox-video" controls autoplay playsinline></video>
    ${title ? `<div style="color: #FFFFFF; text-align: center; margin-top: 1rem; font-weight: 700;">${title}</div>` : ''}
  `;
  modal.classList.add('active');
};

/* ==========================================================================
   REEL VIDEOS INTERACTION
   ========================================================================== */
function initReelControls() {
  const reelCards = document.querySelectorAll('.reel-card');
  reelCards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => {
      video.pause();
    });
  });
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(msg) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-check-circle" style="color:var(--amber-gold);"></i> <span>${msg}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
