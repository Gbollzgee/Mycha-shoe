import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "AirForce Phantom X", brand: "Nike", price: 189, originalPrice: 240, category: "Sneakers", rating: 4.8, reviews: 312, colors: ["#111","#fff","#1a56db"], sizes: [40,41,42,43,44,45], image: "👟", badge: "HOT", stock: 12 },
  { id: 2, name: "Velocity Run Pro", brand: "Adidas", price: 145, originalPrice: 175, category: "Running", rating: 4.6, reviews: 198, colors: ["#1a56db","#f59e0b","#111"], sizes: [39,40,41,42,43,44], image: "🏃", badge: "NEW", stock: 8 },
  { id: 3, name: "Luxe Oxford Elite", brand: "MYCHA", price: 229, originalPrice: 229, category: "Formal", rating: 4.9, reviews: 87, colors: ["#111","#7c3aed","#b45309"], sizes: [40,41,42,43,44,45,46], image: "👞", badge: "PREMIUM", stock: 5 },
  { id: 4, name: "TrailBlazer Boot", brand: "Timberland", price: 199, originalPrice: 250, category: "Boots", rating: 4.7, reviews: 156, colors: ["#92400e","#111","#78716c"], sizes: [40,41,42,43,44,45], image: "🥾", badge: "SALE", stock: 20 },
  { id: 5, name: "Summer Glide Slide", brand: "MYCHA", price: 59, originalPrice: 80, category: "Sandals", rating: 4.4, reviews: 445, colors: ["#1a56db","#f59e0b","#ef4444"], sizes: [37,38,39,40,41,42,43], image: "🩴", badge: "FLASH", stock: 50 },
  { id: 6, name: "Striker Sport XT", brand: "Puma", price: 119, originalPrice: 149, category: "Sports", rating: 4.5, reviews: 267, colors: ["#ef4444","#111","#16a34a"], sizes: [39,40,41,42,43,44,45], image: "⚽", badge: "HOT", stock: 15 },
  { id: 7, name: "Cloud Walker 2.0", brand: "Nike", price: 165, originalPrice: 195, category: "Running", rating: 4.7, reviews: 389, colors: ["#fff","#f59e0b","#1a56db"], sizes: [38,39,40,41,42,43,44,45], image: "☁️", badge: "NEW", stock: 9 },
  { id: 8, name: "Apex Leather Boot", brand: "MYCHA", price: 279, originalPrice: 320, category: "Boots", rating: 4.9, reviews: 62, colors: ["#111","#b45309"], sizes: [40,41,42,43,44,45,46], image: "👢", badge: "PREMIUM", stock: 3 },
];

const CATEGORIES = [
  { name: "Sneakers", icon: "👟", count: 128 },
  { name: "Running", icon: "🏃", count: 94 },
  { name: "Formal", icon: "👞", count: 56 },
  { name: "Boots", icon: "🥾", count: 73 },
  { name: "Sandals", icon: "🩴", count: 112 },
  { name: "Sports", icon: "⚽", count: 88 },
];

const ORDER_HISTORY = [
  { id: "#MYC-8821", date: "Jun 8, 2026", status: "Delivered", total: 229, items: 1, product: "Luxe Oxford Elite" },
  { id: "#MYC-8754", date: "May 22, 2026", status: "Shipped", total: 364, items: 2, product: "AirForce Phantom X + 1" },
  { id: "#MYC-8690", date: "May 10, 2026", status: "Delivered", total: 59, items: 1, product: "Summer Glide Slide" },
];

const NOTIFS = [
  { id: 1, type: "order", icon: "📦", title: "Order Shipped!", body: "Your AirForce Phantom X is on the way.", time: "2h ago", read: false },
  { id: 2, type: "promo", icon: "🔥", title: "Flash Sale — 40% OFF", body: "Boots & Formal shoes today only.", time: "5h ago", read: false },
  { id: 3, type: "arrival", icon: "✨", title: "New Arrivals", body: "Cloud Walker 2.0 just dropped.", time: "1d ago", read: true },
  { id: 4, type: "order", icon: "✅", title: "Order Delivered", body: "#MYC-8690 delivered successfully.", time: "3d ago", read: true },
];

// ─── STYLES ─────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --bg:#0a0a0f;
    --bg2:#111118;
    --bg3:#1a1a24;
    --card:#16161e;
    --card2:#1e1e2a;
    --gold:#d4a843;
    --gold2:#f0c060;
    --blue:#1a56db;
    --blue2:#3b75f0;
    --border:rgba(255,255,255,0.07);
    --border2:rgba(212,168,67,0.25);
    --text:#f0f0f8;
    --muted:#8888a0;
    --danger:#ef4444;
    --green:#22c55e;
    --radius:16px;
    --radius-sm:10px;
    --shadow:0 8px 32px rgba(0,0,0,0.5);
  }
  body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;}
  .app{width:100%;max-width:430px;margin:0 auto;min-height:100vh;background:var(--bg);position:relative;overflow:hidden;}
  .screen{min-height:100vh;display:flex;flex-direction:column;padding-bottom:80px;}

  /* SPLASH */
  .splash{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(ellipse at 60% 30%,#1a2a5e 0%,#0a0a0f 70%);position:relative;overflow:hidden;}
  .splash-glow{position:absolute;width:300px;height:300px;background:radial-gradient(circle,rgba(26,86,219,0.3),transparent 70%);top:20%;left:50%;transform:translateX(-50%);pointer-events:none;}
  .splash-logo{font-family:'Syne',sans-serif;font-size:2.8rem;font-weight:800;background:linear-gradient(135deg,#d4a843,#f0c060,#1a56db);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-1px;}
  .splash-shoe{font-size:5rem;margin:1rem 0;animation:float 2s ease-in-out infinite;}
  .splash-tag{color:var(--muted);font-size:0.9rem;letter-spacing:2px;text-transform:uppercase;margin-top:0.5rem;}
  .splash-bar-wrap{width:200px;height:3px;background:var(--bg3);border-radius:2px;margin-top:3rem;overflow:hidden;}
  .splash-bar{height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:2px;animation:load 2.2s ease forwards;}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
  @keyframes load{from{width:0%;}to{width:100%;}}

  /* AUTH */
  .auth{padding:2rem 1.5rem;display:flex;flex-direction:column;min-height:100vh;background:var(--bg);}
  .auth-header{margin-bottom:2rem;}
  .auth-back{background:none;border:1px solid var(--border);color:var(--muted);padding:0.5rem 1rem;border-radius:var(--radius-sm);cursor:pointer;font-size:0.85rem;margin-bottom:1.5rem;display:inline-block;}
  .auth-title{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:var(--text);}
  .auth-sub{color:var(--muted);font-size:0.9rem;margin-top:0.3rem;}
  .input-group{margin-bottom:1.2rem;}
  .input-label{font-size:0.8rem;color:var(--muted);margin-bottom:0.4rem;display:block;text-transform:uppercase;letter-spacing:0.5px;}
  .input-field{width:100%;background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:0.9rem 1rem;border-radius:var(--radius-sm);font-size:0.95rem;font-family:'Inter',sans-serif;outline:none;transition:border 0.2s;}
  .input-field:focus{border-color:var(--gold);}
  .btn-primary{width:100%;background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff;border:none;padding:1rem;border-radius:var(--radius);font-size:1rem;font-weight:600;cursor:pointer;font-family:'Syne',sans-serif;letter-spacing:0.5px;transition:opacity 0.2s;}
  .btn-primary:hover{opacity:0.9;}
  .btn-gold{background:linear-gradient(135deg,var(--gold),var(--gold2));color:#111;}
  .social-row{display:flex;gap:0.75rem;margin-top:1rem;}
  .social-btn{flex:1;background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:0.75rem;border-radius:var(--radius-sm);cursor:pointer;font-size:1.2rem;text-align:center;}
  .divider{text-align:center;color:var(--muted);font-size:0.8rem;margin:1.2rem 0;position:relative;}
  .divider::before,.divider::after{content:'';position:absolute;top:50%;width:40%;height:1px;background:var(--border);}
  .divider::before{left:0;}
  .divider::after{right:0;}
  .switch-auth{text-align:center;color:var(--muted);font-size:0.85rem;margin-top:1.5rem;}
  .switch-auth span{color:var(--gold);cursor:pointer;font-weight:600;}

  /* BOTTOM NAV */
  .bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(22,22,30,0.96);backdrop-filter:blur(20px);border-top:1px solid var(--border);display:flex;justify-content:space-around;padding:0.6rem 0 0.8rem;z-index:100;}
  .nav-item{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:0.3rem 1rem;border-radius:var(--radius-sm);transition:all 0.2s;position:relative;}
  .nav-icon{font-size:1.3rem;}
  .nav-label{font-size:0.65rem;color:var(--muted);font-weight:500;text-transform:uppercase;letter-spacing:0.5px;}
  .nav-item.active .nav-label{color:var(--gold);}
  .nav-badge{position:absolute;top:0;right:6px;background:var(--danger);color:#fff;font-size:0.6rem;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;}

  /* HEADER */
  .page-header{padding:1.2rem 1.2rem 0.5rem;display:flex;justify-content:space-between;align-items:center;}
  .page-title{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:var(--text);}
  .header-btn{background:var(--bg3);border:1px solid var(--border);color:var(--text);width:40px;height:40px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.1rem;}

  /* HOME */
  .scroll-x{display:flex;overflow-x:auto;gap:0.75rem;padding:0 1.2rem;scrollbar-width:none;}
  .scroll-x::-webkit-scrollbar{display:none;}
  .section-title{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;color:var(--text);padding:0 1.2rem;margin-top:1.5rem;margin-bottom:0.75rem;display:flex;justify-content:space-between;align-items:center;}
  .section-more{color:var(--gold);font-size:0.75rem;font-weight:600;cursor:pointer;}

  /* HERO BANNER */
  .hero-banner{margin:1rem 1.2rem;background:linear-gradient(135deg,#0d1f54,#1a3a8f);border-radius:var(--radius);padding:1.5rem;position:relative;overflow:hidden;border:1px solid rgba(26,86,219,0.3);}
  .hero-badge{background:var(--gold);color:#111;font-size:0.65rem;font-weight:700;padding:3px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:0.5px;display:inline-block;margin-bottom:0.5rem;}
  .hero-title{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;color:#fff;line-height:1.2;}
  .hero-sub{color:rgba(255,255,255,0.6);font-size:0.8rem;margin:0.4rem 0 1rem;}
  .hero-btn{background:var(--gold);color:#111;border:none;padding:0.5rem 1.2rem;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer;font-family:'Syne',sans-serif;}
  .hero-shoe{position:absolute;right:-10px;bottom:-5px;font-size:5rem;opacity:0.8;transform:rotate(-20deg);}

  /* SEARCH */
  .search-wrap{padding:0.75rem 1.2rem;}
  .search-box{display:flex;align-items:center;background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.7rem 1rem;gap:0.6rem;}
  .search-box input{background:none;border:none;color:var(--text);font-size:0.9rem;font-family:'Inter',sans-serif;flex:1;outline:none;}
  .search-box input::placeholder{color:var(--muted);}

  /* CATEGORY CHIP */
  .cat-chip{display:flex;flex-direction:column;align-items:center;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.2rem;min-width:80px;cursor:pointer;transition:all 0.2s;gap:4px;flex-shrink:0;}
  .cat-chip.active,.cat-chip:hover{border-color:var(--gold);background:rgba(212,168,67,0.1);}
  .cat-chip-icon{font-size:1.6rem;}
  .cat-chip-name{font-size:0.7rem;color:var(--muted);text-align:center;}

  /* PRODUCT CARD */
  .product-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:1rem;min-width:170px;max-width:170px;flex-shrink:0;cursor:pointer;transition:all 0.2s;position:relative;}
  .product-card:hover{border-color:var(--border2);transform:translateY(-2px);}
  .product-card-full{min-width:unset;max-width:unset;flex-shrink:unset;width:calc(50% - 0.375rem);}
  .product-img{font-size:3.5rem;text-align:center;padding:0.5rem 0;background:var(--bg3);border-radius:10px;margin-bottom:0.75rem;}
  .product-badge{position:absolute;top:8px;left:8px;background:var(--danger);color:#fff;font-size:0.6rem;font-weight:700;padding:2px 6px;border-radius:4px;text-transform:uppercase;}
  .product-badge.NEW{background:var(--green);}
  .product-badge.PREMIUM{background:linear-gradient(90deg,var(--gold),var(--gold2));color:#111;}
  .product-badge.FLASH{background:#7c3aed;}
  .product-badge.HOT{background:var(--danger);}
  .product-badge.SALE{background:#f97316;}
  .product-brand{font-size:0.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;}
  .product-name{font-family:'Syne',sans-serif;font-size:0.9rem;font-weight:700;margin:2px 0;color:var(--text);line-height:1.2;}
  .product-rating{display:flex;align-items:center;gap:4px;font-size:0.75rem;color:var(--gold);margin-bottom:0.5rem;}
  .product-rating span{color:var(--muted);}
  .product-price-row{display:flex;align-items:center;gap:0.4rem;}
  .product-price{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:var(--gold);}
  .product-orig{font-size:0.75rem;color:var(--muted);text-decoration:line-through;}
  .product-wish{position:absolute;top:8px;right:8px;background:var(--bg);border:1px solid var(--border);border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:0.85rem;}

  /* FLASH SALE */
  .flash-card{background:linear-gradient(135deg,#1a0a30,#2d0a0a);border:1px solid rgba(239,68,68,0.3);border-radius:var(--radius);padding:1rem;min-width:150px;flex-shrink:0;cursor:pointer;position:relative;}
  .flash-icon{font-size:2.5rem;text-align:center;margin-bottom:0.5rem;}
  .flash-name{font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:700;color:#fff;}
  .flash-off{color:var(--danger);font-size:0.75rem;font-weight:700;}
  .flash-price{color:var(--gold);font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;margin-top:0.3rem;}

  /* PRODUCT DETAIL */
  .detail-img{font-size:7rem;text-align:center;padding:2rem;background:var(--bg3);margin:1rem 1.2rem;border-radius:var(--radius);border:1px solid var(--border);}
  .detail-body{padding:0 1.2rem;}
  .size-grid{display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.5rem;}
  .size-chip{background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:0.4rem 0.8rem;border-radius:8px;font-size:0.85rem;cursor:pointer;transition:all 0.2s;}
  .size-chip.active{border-color:var(--gold);background:rgba(212,168,67,0.15);color:var(--gold);font-weight:600;}
  .color-dot{width:28px;height:28px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:all 0.2s;}
  .color-dot.active{border-color:var(--gold);transform:scale(1.15);}
  .detail-actions{display:flex;gap:0.75rem;padding:1rem 1.2rem;background:var(--bg);border-top:1px solid var(--border);position:sticky;bottom:0;}
  .btn-cart{flex:1;background:var(--bg3);border:1px solid var(--gold);color:var(--gold);padding:0.9rem;border-radius:var(--radius);font-weight:700;font-size:0.9rem;cursor:pointer;font-family:'Syne',sans-serif;}
  .btn-buy{flex:2;background:linear-gradient(135deg,var(--gold),var(--gold2));color:#111;border:none;padding:0.9rem;border-radius:var(--radius);font-weight:800;font-size:0.95rem;cursor:pointer;font-family:'Syne',sans-serif;}
  .review-card{background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.9rem;margin-top:0.75rem;}
  .review-author{font-weight:600;font-size:0.85rem;color:var(--text);}
  .review-text{color:var(--muted);font-size:0.8rem;margin-top:0.3rem;}

  /* CART */
  .cart-item{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:1rem;margin:0 1.2rem 0.75rem;display:flex;gap:0.75rem;align-items:center;}
  .cart-img{font-size:2.5rem;background:var(--bg3);width:60px;height:60px;display:flex;align-items:center;justify-content:center;border-radius:10px;flex-shrink:0;}
  .cart-info{flex:1;}
  .cart-name{font-family:'Syne',sans-serif;font-size:0.9rem;font-weight:700;color:var(--text);}
  .cart-meta{color:var(--muted);font-size:0.75rem;margin-top:2px;}
  .cart-price{color:var(--gold);font-weight:700;font-size:0.9rem;}
  .qty-ctrl{display:flex;align-items:center;gap:0.5rem;margin-top:0.4rem;}
  .qty-btn{background:var(--bg3);border:1px solid var(--border);color:var(--text);width:26px;height:26px;border-radius:6px;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;}
  .qty-val{font-weight:700;font-size:0.9rem;min-width:24px;text-align:center;}
  .cart-remove{background:none;border:none;color:var(--danger);cursor:pointer;font-size:1.1rem;padding:4px;}
  .order-summary{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:1.2rem;margin:0 1.2rem 1rem;}
  .summary-row{display:flex;justify-content:space-between;font-size:0.875rem;color:var(--muted);margin-bottom:0.5rem;}
  .summary-row.total{color:var(--text);font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;border-top:1px solid var(--border);padding-top:0.75rem;margin-top:0.5rem;}
  .coupon-row{display:flex;gap:0.5rem;margin:0 1.2rem 1rem;}
  .coupon-input{flex:1;background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:0.7rem 1rem;border-radius:var(--radius-sm);font-size:0.85rem;font-family:'Inter',sans-serif;outline:none;}
  .coupon-btn{background:var(--gold);color:#111;border:none;padding:0.7rem 1.2rem;border-radius:var(--radius-sm);font-weight:700;cursor:pointer;font-family:'Syne',sans-serif;}

  /* CHECKOUT */
  .checkout-section{margin:0 1.2rem 1rem;}
  .checkout-section-title{font-family:'Syne',sans-serif;font-size:0.9rem;font-weight:700;color:var(--text);margin-bottom:0.75rem;}
  .address-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem;margin-bottom:0.5rem;cursor:pointer;transition:all 0.2s;}
  .address-card.active{border-color:var(--gold);}
  .payment-option{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.9rem 1rem;margin-bottom:0.5rem;cursor:pointer;display:flex;align-items:center;gap:0.75rem;transition:all 0.2s;}
  .payment-option.active{border-color:var(--gold);}
  .pay-icon{font-size:1.5rem;}
  .pay-name{font-weight:600;font-size:0.9rem;}
  .pay-sub{color:var(--muted);font-size:0.75rem;}
  .radio-dot{width:18px;height:18px;border-radius:50%;border:2px solid var(--border);margin-left:auto;display:flex;align-items:center;justify-content:center;}
  .radio-dot.active{border-color:var(--gold);}
  .radio-dot.active::after{content:'';width:8px;height:8px;border-radius:50%;background:var(--gold);}

  /* ORDER CONFIRM */
  .confirm-screen{display:flex;flex-direction:column;align-items:center;padding:3rem 1.5rem;text-align:center;}
  .confirm-icon{font-size:4rem;margin-bottom:1rem;animation:pop 0.5s ease;}
  @keyframes pop{0%{transform:scale(0);}60%{transform:scale(1.2);}100%{transform:scale(1);}}
  .confirm-title{font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:800;color:var(--gold);}
  .confirm-sub{color:var(--muted);font-size:0.9rem;margin:0.5rem 0 2rem;}
  .order-id-box{background:var(--bg3);border:1px solid var(--border2);border-radius:var(--radius-sm);padding:0.75rem 1.5rem;font-family:'Syne',sans-serif;font-size:1.1rem;color:var(--gold);font-weight:700;margin-bottom:2rem;}

  /* TRACKING */
  .tracking-timeline{padding:0 1.5rem;}
  .timeline-step{display:flex;gap:1rem;align-items:flex-start;margin-bottom:1.5rem;position:relative;}
  .timeline-step::before{content:'';position:absolute;left:16px;top:36px;width:2px;height:calc(100% + 8px);background:var(--border);}
  .timeline-step:last-child::before{display:none;}
  .step-dot{width:32px;height:32px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0;background:var(--bg);}
  .step-dot.done{border-color:var(--gold);background:rgba(212,168,67,0.15);}
  .step-dot.active{border-color:var(--blue);background:rgba(26,86,219,0.15);animation:pulse 1.5s infinite;}
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(26,86,219,0.4);}50%{box-shadow:0 0 0 8px rgba(26,86,219,0);}}
  .step-info{flex:1;}
  .step-title{font-weight:600;font-size:0.9rem;color:var(--text);}
  .step-meta{color:var(--muted);font-size:0.8rem;margin-top:2px;}

  /* PROFILE */
  .profile-header{background:linear-gradient(135deg,#0d1f54,#16161e);padding:1.5rem 1.2rem;text-align:center;border-bottom:1px solid var(--border);}
  .avatar{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--blue));display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto 0.75rem;border:3px solid var(--gold);}
  .profile-name{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:var(--text);}
  .profile-email{color:var(--muted);font-size:0.8rem;}
  .loyalty-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(212,168,67,0.15);border:1px solid var(--gold);border-radius:20px;padding:3px 10px;font-size:0.75rem;color:var(--gold);font-weight:600;margin-top:0.5rem;}
  .profile-stats{display:flex;justify-content:space-around;padding:1rem 1.2rem;border-bottom:1px solid var(--border);}
  .stat-item{text-align:center;}
  .stat-num{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:var(--gold);}
  .stat-label{color:var(--muted);font-size:0.7rem;text-transform:uppercase;letter-spacing:0.5px;}
  .menu-item{display:flex;align-items:center;gap:0.9rem;padding:1rem 1.2rem;border-bottom:1px solid var(--border);cursor:pointer;transition:background 0.15s;}
  .menu-item:hover{background:var(--bg3);}
  .menu-icon{font-size:1.2rem;width:32px;text-align:center;}
  .menu-text{flex:1;font-size:0.9rem;color:var(--text);}
  .menu-arrow{color:var(--muted);font-size:0.75rem;}
  .menu-badge{background:var(--danger);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:10px;font-weight:700;}

  /* NOTIF */
  .notif-item{display:flex;gap:0.9rem;padding:1rem 1.2rem;border-bottom:1px solid var(--border);cursor:pointer;transition:background 0.15s;}
  .notif-item.unread{background:rgba(26,86,219,0.05);}
  .notif-icon-wrap{width:44px;height:44px;border-radius:50%;background:var(--bg3);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;}
  .notif-body{flex:1;}
  .notif-title{font-weight:600;font-size:0.9rem;color:var(--text);}
  .notif-sub{color:var(--muted);font-size:0.8rem;margin-top:2px;}
  .notif-time{color:var(--muted);font-size:0.7rem;margin-top:4px;}
  .unread-dot{width:8px;height:8px;border-radius:50%;background:var(--blue);flex-shrink:0;margin-top:4px;}

  /* CATALOG */
  .filter-bar{display:flex;gap:0.5rem;padding:0 1.2rem;overflow-x:auto;scrollbar-width:none;}
  .filter-bar::-webkit-scrollbar{display:none;}
  .filter-chip{background:var(--bg3);border:1px solid var(--border);color:var(--muted);padding:0.35rem 0.85rem;border-radius:20px;font-size:0.8rem;cursor:pointer;white-space:nowrap;flex-shrink:0;}
  .filter-chip.active{background:rgba(212,168,67,0.15);border-color:var(--gold);color:var(--gold);}
  .product-grid{display:flex;flex-wrap:wrap;gap:0.75rem;padding:0 1.2rem;margin-top:1rem;}

  /* WISHLIST */
  .wish-item{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:0.9rem;margin:0 1.2rem 0.75rem;display:flex;gap:0.75rem;align-items:center;}
  .wish-img{font-size:2rem;background:var(--bg3);width:56px;height:56px;display:flex;align-items:center;justify-content:center;border-radius:10px;flex-shrink:0;}

  /* ADMIN */
  .admin-stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;padding:0 1.2rem;margin-top:1rem;}
  .admin-stat{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem;}
  .admin-stat-icon{font-size:1.5rem;margin-bottom:0.5rem;}
  .admin-stat-val{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;color:var(--text);}
  .admin-stat-label{color:var(--muted);font-size:0.75rem;}
  .admin-stat-trend{font-size:0.75rem;font-weight:600;margin-top:2px;}
  .admin-stat-trend.up{color:var(--green);}
  .admin-stat-trend.down{color:var(--danger);}
  .admin-order{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.9rem;margin:0 1.2rem 0.5rem;}
  .status-pill{display:inline-block;padding:3px 10px;border-radius:20px;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;}
  .status-pill.Delivered{background:rgba(34,197,94,0.15);color:var(--green);}
  .status-pill.Shipped{background:rgba(26,86,219,0.15);color:var(--blue2);}
  .status-pill.Processing{background:rgba(245,158,11,0.15);color:#f59e0b;}

  /* TOAST */
  .toast{position:fixed;bottom:100px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--card2);border:1px solid var(--border2);color:var(--text);padding:0.7rem 1.2rem;border-radius:var(--radius-sm);font-size:0.85rem;font-weight:500;z-index:999;white-space:nowrap;opacity:0;transition:all 0.3s;pointer-events:none;}
  .toast.show{opacity:1;transform:translateX(-50%) translateY(0);}
`;

// ─── APP ────────────────────────────────────────────────────────────────────
export default function MychaShoe() {
  const [screen, setScreen] = useState("splash");
  const [authMode, setAuthMode] = useState("login");
  const [activeNav, setActiveNav] = useState("home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [cartQty, setCartQty] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [payMethod, setPayMethod] = useState("card");
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [toast, setToast] = useState("");
  const [notifRead, setNotifRead] = useState([]);
  const toastRef = useRef(null);

  // Splash auto-advance
  useEffect(() => {
    if (screen === "splash") {
      const t = setTimeout(() => setScreen("login"), 2400);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(""), 2200);
  };

  const addToCart = (product, size) => {
    const key = `${product.id}-${size || "default"}`;
    setCart(prev => {
      const exists = prev.find(i => i.key === key);
      if (exists) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, key, size, qty: 1 }];
    });
    showToast("✅ Added to cart!");
  };

  const removeFromCart = (key) => setCart(prev => prev.filter(i => i.key !== key));
  const updateQty = (key, delta) => setCart(prev => prev.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const toggleWish = (product) => {
    setWishlist(prev => {
      const has = prev.find(i => i.id === product.id);
      if (has) { showToast("💔 Removed from wishlist"); return prev.filter(i => i.id !== product.id); }
      showToast("❤️ Added to wishlist!"); return [...prev, product];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = couponApplied ? Math.floor(cartTotal * 0.1) : 0;
  const shipping = cartTotal > 0 ? 9.99 : 0;

  const goTo = (nav) => { setActiveNav(nav); setScreen("main"); };

  const navigate = (scr) => { setScreen(scr); };

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setCouponApplied(false);
    setCoupon("");
    navigate("confirm");
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter(p => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  // ── SCREENS ──────────────────────────────────────────────────────────────

  if (screen === "splash") return (
    <div className="splash">
      <style>{css}</style>
      <div className="splash-glow"/>
      <div className="splash-logo">MYCHA</div>
      <div className="splash-shoe">👟</div>
      <div className="splash-logo" style={{fontSize:"1.8rem"}}>SHOE</div>
      <div className="splash-tag">Step Into Style</div>
      <div className="splash-bar-wrap"><div className="splash-bar"/></div>
    </div>
  );

  if (screen === "login" || screen === "signup") return (
    <div className="app">
      <style>{css}</style>
      <div className="auth">
        <div className="auth-header">
          <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"1.5rem"}}>
            <span style={{fontSize:"1.8rem"}}>👟</span>
            <span style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1.3rem",background:"linear-gradient(135deg,#d4a843,#1a56db)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Mycha Shoe</span>
          </div>
          <div className="auth-title">{screen === "login" ? "Welcome Back" : "Create Account"}</div>
          <div className="auth-sub">{screen === "login" ? "Sign in to continue shopping" : "Join the Mycha community"}</div>
        </div>
        {screen === "signup" && (
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input className="input-field" placeholder="Olanrewaju Gbolahan" />
          </div>
        )}
        <div className="input-group">
          <label className="input-label">Email</label>
          <input className="input-field" placeholder="you@example.com" type="email" />
        </div>
        <div className="input-group">
          <label className="input-label">Password</label>
          <input className="input-field" placeholder="••••••••" type="password" />
        </div>
        {screen === "login" && <div style={{textAlign:"right",marginBottom:"1rem"}}><span style={{color:"var(--gold)",fontSize:"0.85rem",cursor:"pointer"}}>Forgot Password?</span></div>}
        <button className="btn-primary" onClick={() => { setScreen("main"); setActiveNav("home"); }}>
          {screen === "login" ? "Sign In" : "Create Account"}
        </button>
        <div className="divider">or continue with</div>
        <div className="social-row">
          <button className="social-btn">🌐</button>
          <button className="social-btn"> </button>
          <button className="social-btn">📘</button>
        </div>
        <div className="switch-auth">
          {screen === "login" ? <>Don't have an account? <span onClick={() => setScreen("signup")}>Sign Up</span></> : <>Already have an account? <span onClick={() => setScreen("login")}>Sign In</span></>}
        </div>
      </div>
    </div>
  );

  if (screen === "confirm") return (
    <div className="app">
      <style>{css}</style>
      <div className="confirm-screen">
        <div className="confirm-icon">🎉</div>
        <div className="confirm-title">Order Placed!</div>
        <div className="confirm-sub">Your shoes are on their way.<br/>Sit back and relax.</div>
        <div className="order-id-box">#MYC-{Math.floor(8900 + Math.random()*100)}</div>
        <button className="btn-primary" style={{marginBottom:"0.75rem"}} onClick={() => navigate("tracking")}>Track Order</button>
        <button className="btn-primary" style={{background:"var(--bg3)",border:"1px solid var(--border)",color:"var(--text)"}} onClick={() => { setScreen("main"); setActiveNav("home"); }}>Continue Shopping</button>
      </div>
    </div>
  );

  if (screen === "tracking") return (
    <div className="app">
      <style>{css}</style>
      <div className="screen">
        <div className="page-header">
          <button className="header-btn" onClick={() => navigate(-1) || setScreen("main")}>←</button>
          <div className="page-title">Order Tracking</div>
          <div style={{width:40}}/>
        </div>
        <div style={{padding:"0 1.2rem 1rem"}}>
          <div style={{background:"var(--bg3)",borderRadius:"var(--radius-sm)",border:"1px solid var(--border)",padding:"0.9rem 1rem",marginBottom:"1.2rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:"0.95rem"}}>AirForce Phantom X</div>
                <div style={{color:"var(--muted)",fontSize:"0.75rem"}}>Order #MYC-8754 • Size 42</div>
              </div>
              <span className="status-pill Shipped">Shipped</span>
            </div>
          </div>
        </div>
        <div className="tracking-timeline">
          {[
            {label:"Order Received",meta:"Jun 10, 2:30 PM",done:true},
            {label:"Processing",meta:"Jun 10, 4:15 PM",done:true},
            {label:"Shipped",meta:"Jun 11, 9:00 AM",done:true},
            {label:"Out for Delivery",meta:"Estimated Jun 13",active:true},
            {label:"Delivered",meta:"Expected Jun 13",done:false},
          ].map((s,i) => (
            <div key={i} className="timeline-step">
              <div className={`step-dot${s.done?" done":s.active?" active":""}`}>{s.done?"✓":s.active?"🚚":""}</div>
              <div className="step-info">
                <div className="step-title" style={{color:s.active?"var(--blue2)":s.done?"var(--text)":"var(--muted)"}}>{s.label}</div>
                <div className="step-meta">{s.meta}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:"1.2rem",background:"var(--bg3)",margin:"0 1.2rem",borderRadius:"var(--radius)",border:"1px solid var(--border)"}}>
          <div style={{fontWeight:600,fontSize:"0.85rem",marginBottom:"0.3rem"}}>📍 Delivering to</div>
          <div style={{color:"var(--muted)",fontSize:"0.8rem"}}>15 Ayo Babalola Street, Ikeji-Arakeji, Osun State, Nigeria</div>
        </div>
      </div>
    </div>
  );

  if (screen === "detail" && selectedProduct) {
    const p = selectedProduct;
    const inWish = wishlist.find(i => i.id === p.id);
    return (
      <div className="app">
        <style>{css}</style>
        <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
          <div className="page-header">
            <button className="header-btn" onClick={() => setScreen("main")}>←</button>
            <div className="page-title">Details</div>
            <button className="header-btn" onClick={() => toggleWish(p)}>{inWish?"❤️":"🤍"}</button>
          </div>
          <div className="detail-img">{p.image}</div>
          <div className="detail-body" style={{flex:1,overflowY:"auto",paddingBottom:"120px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{color:"var(--muted)",fontSize:"0.75rem",textTransform:"uppercase",letterSpacing:"0.5px"}}>{p.brand}</div>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1.4rem",color:"var(--text)",lineHeight:1.2}}>{p.name}</div>
              </div>
              <span className={`product-badge ${p.badge}`}>{p.badge}</span>
            </div>
            <div className="product-rating" style={{margin:"0.75rem 0"}}>⭐ {p.rating} <span>({p.reviews} reviews)</span></div>
            <div className="product-price-row" style={{marginBottom:"1.2rem"}}>
              <span className="product-price">${p.price}</span>
              {p.originalPrice > p.price && <span className="product-orig">${p.originalPrice}</span>}
              {p.originalPrice > p.price && <span style={{background:"rgba(239,68,68,0.15)",color:"var(--danger)",fontSize:"0.75rem",padding:"2px 6px",borderRadius:"4px",fontWeight:700}}>{Math.round((1-p.price/p.originalPrice)*100)}% OFF</span>}
            </div>

            <div style={{marginBottom:"1.2rem"}}>
              <div style={{fontWeight:700,fontSize:"0.85rem",marginBottom:"0.5rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.5px"}}>Select Size</div>
              <div className="size-grid">
                {p.sizes.map(s => <div key={s} className={`size-chip${selectedSize===s?" active":""}`} onClick={() => setSelectedSize(s)}>EU {s}</div>)}
              </div>
            </div>

            <div style={{marginBottom:"1.2rem"}}>
              <div style={{fontWeight:700,fontSize:"0.85rem",marginBottom:"0.5rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.5px"}}>Color</div>
              <div style={{display:"flex",gap:"0.5rem"}}>
                {p.colors.map((c,i) => <div key={i} className={`color-dot${selectedColor===i?" active":""}`} style={{background:c}} onClick={() => setSelectedColor(i)}/>)}
              </div>
            </div>

            <div style={{marginBottom:"1.2rem"}}>
              <div style={{fontWeight:700,fontSize:"0.85rem",marginBottom:"0.4rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.5px"}}>About</div>
              <div style={{color:"var(--muted)",fontSize:"0.85rem",lineHeight:1.6}}>Premium quality {p.category.toLowerCase()} shoe crafted for comfort and style. Engineered for all-day wear with advanced cushioning technology and durable outsole. Perfect for everyday use.</div>
            </div>

            <div>
              <div style={{fontWeight:700,fontSize:"0.85rem",marginBottom:"0.5rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.5px"}}>Customer Reviews</div>
              {[{name:"Tunde A.",stars:"⭐⭐⭐⭐⭐",text:"Absolutely love these! True to size and very comfortable."},
                {name:"Amara K.",stars:"⭐⭐⭐⭐",text:"Great quality for the price. Fast delivery too."}].map((r,i) => (
                <div key={i} className="review-card">
                  <div style={{display:"flex",justifyContent:"space-between"}}><span className="review-author">{r.name}</span><span style={{fontSize:"0.75rem"}}>{r.stars}</span></div>
                  <div className="review-text">{r.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="detail-actions">
            <button className="btn-cart" onClick={() => addToCart(p, selectedSize || p.sizes[0])}>🛒 Cart</button>
            <button className="btn-buy" onClick={() => { addToCart(p, selectedSize || p.sizes[0]); setActiveNav("cart"); setScreen("main"); }}>Buy Now →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN APP with bottom nav ─────────────────────────────────────────────
  const renderHome = () => (
    <div>
      <div className="page-header">
        <div>
          <div style={{color:"var(--muted)",fontSize:"0.75rem"}}>Hello, Gbollzgee 👋</div>
          <div className="page-title">Discover Shoes</div>
        </div>
        <button className="header-btn" onClick={() => setActiveNav("notif")}>🔔</button>
      </div>

      <div className="search-wrap">
        <div className="search-box">
          <span style={{color:"var(--muted)"}}>🔍</span>
          <input placeholder="Search shoes, brands..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="hero-banner">
        <div className="hero-badge">⚡ FLASH SALE</div>
        <div className="hero-title">Step Into<br/>Your Style</div>
        <div className="hero-sub">Up to 40% OFF premium shoes</div>
        <button className="hero-btn" onClick={() => setActiveNav("catalog")}>Shop Now</button>
        <div className="hero-shoe">👟</div>
      </div>

      <div className="section-title">Categories <span className="section-more">See All</span></div>
      <div className="scroll-x">
        {CATEGORIES.map(c => (
          <div key={c.name} className={`cat-chip${activeCategory===c.name?" active":""}`} onClick={() => { setActiveCategory(c.name); setActiveNav("catalog"); }}>
            <span className="cat-chip-icon">{c.icon}</span>
            <span className="cat-chip-name">{c.name}</span>
          </div>
        ))}
      </div>

      <div className="section-title">Featured Products <span className="section-more" onClick={() => setActiveNav("catalog")}>See All</span></div>
      <div className="scroll-x">
        {PRODUCTS.slice(0,5).map(p => <ProductCard key={p.id} p={p} onSelect={selectProduct} onWish={toggleWish} wishlist={wishlist} onAdd={addToCart}/>)}
      </div>

      <div className="section-title">⚡ Flash Sales <span className="section-more">Ends in 02:34:11</span></div>
      <div className="scroll-x">
        {PRODUCTS.filter(p=>p.originalPrice>p.price).map(p => (
          <div key={p.id} className="flash-card" onClick={() => selectProduct(p)}>
            <div className="flash-icon">{p.image}</div>
            <div className="flash-name">{p.name}</div>
            <div className="flash-off">-{Math.round((1-p.price/p.originalPrice)*100)}% OFF</div>
            <div className="flash-price">${p.price}</div>
          </div>
        ))}
      </div>

      <div className="section-title">Best Sellers <span className="section-more">See All</span></div>
      <div className="scroll-x">
        {PRODUCTS.sort((a,b)=>b.reviews-a.reviews).slice(0,4).map(p => <ProductCard key={p.id} p={p} onSelect={selectProduct} onWish={toggleWish} wishlist={wishlist} onAdd={addToCart}/>)}
      </div>
      <div style={{height:"1rem"}}/>
    </div>
  );

  const renderCatalog = () => (
    <div>
      <div className="page-header">
        <div className="page-title">Catalog</div>
        <button className="header-btn">⚙️</button>
      </div>
      <div className="search-wrap">
        <div className="search-box">
          <span style={{color:"var(--muted)"}}>🔍</span>
          <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="filter-bar" style={{marginBottom:"0.25rem"}}>
        {["All",...CATEGORIES.map(c=>c.name)].map(f => (
          <div key={f} className={`filter-chip${activeCategory===f?" active":""}`} onClick={() => setActiveCategory(f)}>{f}</div>
        ))}
      </div>
      <div style={{padding:"0 1.2rem",color:"var(--muted)",fontSize:"0.78rem",marginTop:"0.5rem"}}>{filteredProducts.length} products found</div>
      <div className="product-grid">
        {filteredProducts.map(p => <ProductCard key={p.id} p={p} onSelect={selectProduct} onWish={toggleWish} wishlist={wishlist} onAdd={addToCart} full/>)}
      </div>
    </div>
  );

  const renderCart = () => (
    <div>
      <div className="page-header">
        <div className="page-title">My Cart ({cartCount})</div>
      </div>
      {cart.length === 0 ? (
        <div style={{textAlign:"center",padding:"4rem 2rem"}}>
          <div style={{fontSize:"4rem",marginBottom:"1rem"}}>🛒</div>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:"1.1rem",fontWeight:700}}>Your cart is empty</div>
          <div style={{color:"var(--muted)",fontSize:"0.85rem",margin:"0.5rem 0 1.5rem"}}>Discover amazing shoes and add them here</div>
          <button className="btn-primary" style={{width:"auto",padding:"0.75rem 2rem"}} onClick={() => setActiveNav("catalog")}>Browse Shoes →</button>
        </div>
      ) : <>
        {cart.map(item => (
          <div key={item.key} className="cart-item">
            <div className="cart-img">{item.image}</div>
            <div className="cart-info">
              <div className="cart-name">{item.name}</div>
              <div className="cart-meta">{item.brand} • {item.size ? `EU ${item.size}` : "Default"}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"0.4rem"}}>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => updateQty(item.key,-1)}>−</button>
                  <span className="qty-val">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.key,1)}>+</button>
                </div>
                <div className="cart-price">${(item.price*item.qty).toFixed(2)}</div>
              </div>
            </div>
            <button className="cart-remove" onClick={() => removeFromCart(item.key)}>🗑️</button>
          </div>
        ))}

        <div className="coupon-row">
          <input className="coupon-input" placeholder="Coupon code (try MYCHA10)" value={coupon} onChange={e => setCoupon(e.target.value)} />
          <button className="coupon-btn" onClick={() => { if(coupon.toUpperCase()==="MYCHA10"){setCouponApplied(true);showToast("🎉 10% discount applied!");}else{showToast("❌ Invalid coupon");} }}>Apply</button>
        </div>

        <div className="order-summary">
          <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
          {couponApplied && <div className="summary-row" style={{color:"var(--green)"}}><span>Discount (MYCHA10)</span><span>-${discount.toFixed(2)}</span></div>}
          <div className="summary-row"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <div className="summary-row total"><span>Total</span><span>${(cartTotal - discount + shipping).toFixed(2)}</span></div>
        </div>
        <div style={{padding:"0 1.2rem 1rem"}}>
          <button className="btn-primary btn-gold" onClick={() => navigate("checkout")}>Proceed to Checkout →</button>
        </div>
      </>}
    </div>
  );

  const renderCheckout = () => (
    <div>
      <div className="page-header">
        <button className="header-btn" onClick={() => setActiveNav("cart")}>←</button>
        <div className="page-title">Checkout</div>
        <div style={{width:40}}/>
      </div>

      <div className="checkout-section" style={{marginTop:"1rem"}}>
        <div className="checkout-section-title">📍 Delivery Address</div>
        {[
          {name:"Home",addr:"15 Ayo Babalola St, Ikeji-Arakeji, Osun"},
          {name:"Office",addr:"23 Broad Street, Lagos Island, Lagos"},
        ].map((a,i) => (
          <div key={i} className={`address-card${selectedAddress===i?" active":""}`} onClick={() => setSelectedAddress(i)}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div style={{fontWeight:700,fontSize:"0.875rem"}}>{a.name}</div>
              <div className={`radio-dot${selectedAddress===i?" active":""}`}/>
            </div>
            <div style={{color:"var(--muted)",fontSize:"0.8rem",marginTop:"3px"}}>{a.addr}</div>
          </div>
        ))}
        <div style={{color:"var(--gold)",fontSize:"0.8rem",cursor:"pointer",marginTop:"0.3rem"}}>+ Add New Address</div>
      </div>

      <div className="checkout-section">
        <div className="checkout-section-title">💳 Payment Method</div>
        {[
          {id:"card",icon:"💳",name:"Credit/Debit Card",sub:"Visa, Mastercard, Verve"},
          {id:"paypal",icon:"🅿️",name:"PayPal",sub:"Pay with your PayPal account"},
          {id:"transfer",icon:"🏦",name:"Bank Transfer",sub:"Direct bank payment"},
          {id:"mobile",icon:"📱",name:"Mobile Money",sub:"MTN MoMo, Airtel Money"},
        ].map(m => (
          <div key={m.id} className={`payment-option${payMethod===m.id?" active":""}`} onClick={() => setPayMethod(m.id)}>
            <span className="pay-icon">{m.icon}</span>
            <div style={{flex:1}}>
              <div className="pay-name">{m.name}</div>
              <div className="pay-sub">{m.sub}</div>
            </div>
            <div className={`radio-dot${payMethod===m.id?" active":""}`}/>
          </div>
        ))}
      </div>

      <div className="checkout-section">
        <div className="order-summary" style={{margin:0}}>
          <div className="summary-row"><span>Items ({cartCount})</span><span>${cartTotal.toFixed(2)}</span></div>
          {couponApplied && <div className="summary-row" style={{color:"var(--green)"}}><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
          <div className="summary-row"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <div className="summary-row total"><span>Total</span><span>${(cartTotal - discount + shipping).toFixed(2)}</span></div>
        </div>
      </div>
      <div style={{padding:"0 1.2rem 1.5rem"}}>
        <button className="btn-primary btn-gold" onClick={placeOrder}>Place Order • ${(cartTotal - discount + shipping).toFixed(2)}</button>
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div>
      <div className="page-header">
        <div className="page-title">Wishlist ({wishlist.length})</div>
      </div>
      {wishlist.length === 0 ? (
        <div style={{textAlign:"center",padding:"4rem 2rem"}}>
          <div style={{fontSize:"4rem",marginBottom:"1rem"}}>🤍</div>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:"1.1rem",fontWeight:700}}>No saved items</div>
          <div style={{color:"var(--muted)",fontSize:"0.85rem",margin:"0.5rem 0 1.5rem"}}>Tap ❤️ on any product to save it here</div>
          <button className="btn-primary" style={{width:"auto",padding:"0.75rem 2rem"}} onClick={() => setActiveNav("catalog")}>Browse Shoes →</button>
        </div>
      ) : wishlist.map(p => (
        <div key={p.id} className="wish-item">
          <div className="wish-img">{p.image}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:"0.9rem"}}>{p.name}</div>
            <div style={{color:"var(--muted)",fontSize:"0.75rem"}}>{p.brand}</div>
            <div style={{color:"var(--gold)",fontWeight:700,marginTop:"0.25rem"}}>${p.price}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"0.4rem"}}>
            <button style={{background:"var(--gold)",color:"#111",border:"none",padding:"0.4rem 0.75rem",borderRadius:"8px",fontSize:"0.75rem",fontWeight:700,cursor:"pointer"}} onClick={() => addToCart(p)}>Add to Cart</button>
            <button style={{background:"none",border:"1px solid var(--danger)",color:"var(--danger)",padding:"0.4rem 0.75rem",borderRadius:"8px",fontSize:"0.75rem",cursor:"pointer"}} onClick={() => toggleWish(p)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProfile = () => (
    <div>
      <div className="profile-header">
        <div className="avatar">🧑</div>
        <div className="profile-name">Olanrewaju Gbolahan</div>
        <div className="profile-email">gbollzgee@mycha.dev</div>
        <div className="loyalty-badge">⭐ Gold Member • 2,840 pts</div>
      </div>
      <div className="profile-stats">
        <div className="stat-item"><div className="stat-num">{ORDER_HISTORY.length}</div><div className="stat-label">Orders</div></div>
        <div className="stat-item"><div className="stat-num">{wishlist.length}</div><div className="stat-label">Wishlist</div></div>
        <div className="stat-item"><div className="stat-num">2,840</div><div className="stat-label">Points</div></div>
      </div>
      {[
        {icon:"📦",label:"Order History",badge:null},
        {icon:"❤️",label:"Wishlist",badge:wishlist.length||null},
        {icon:"📍",label:"Saved Addresses",badge:null},
        {icon:"💳",label:"Payment Methods",badge:null},
        {icon:"🔔",label:"Notifications",badge:NOTIFS.filter(n=>!n.read&&!notifRead.includes(n.id)).length||null},
        {icon:"🎁",label:"Referral & Rewards",badge:null},
        {icon:"⚙️",label:"Settings",badge:null},
        {icon:"🌙",label:"Dark / Light Mode",badge:null},
        {icon:"🚪",label:"Sign Out",badge:null,danger:true},
      ].map((m,i) => (
        <div key={i} className="menu-item" onClick={() => {
          if(m.label==="Order History") setScreen("orders");
          if(m.label==="Wishlist") setActiveNav("wish");
          if(m.label==="Notifications") setActiveNav("notif");
          if(m.label==="Sign Out") setScreen("login");
        }}>
          <span className="menu-icon">{m.icon}</span>
          <span className="menu-text" style={m.danger?{color:"var(--danger)"}:{}}>{m.label}</span>
          {m.badge ? <span className="menu-badge">{m.badge}</span> : null}
          {!m.danger && <span className="menu-arrow">›</span>}
        </div>
      ))}
    </div>
  );

  const renderNotif = () => (
    <div>
      <div className="page-header">
        <div className="page-title">Notifications</div>
        <button className="header-btn" style={{fontSize:"0.7rem",width:"auto",padding:"0 0.75rem"}} onClick={() => setNotifRead(NOTIFS.map(n=>n.id))}>Mark all read</button>
      </div>
      {NOTIFS.map(n => {
        const isRead = n.read || notifRead.includes(n.id);
        return (
          <div key={n.id} className={`notif-item${!isRead?" unread":""}`} onClick={() => setNotifRead(prev=>[...prev,n.id])}>
            <div className="notif-icon-wrap">{n.icon}</div>
            <div className="notif-body">
              <div className="notif-title">{n.title}</div>
              <div className="notif-sub">{n.body}</div>
              <div className="notif-time">{n.time}</div>
            </div>
            {!isRead && <div className="unread-dot"/>}
          </div>
        );
      })}
    </div>
  );

  const renderAdmin = () => (
    <div>
      <div className="page-header">
        <div className="page-title">Admin Dashboard</div>
        <div style={{background:"rgba(212,168,67,0.15)",border:"1px solid var(--gold)",color:"var(--gold)",fontSize:"0.7rem",padding:"4px 10px",borderRadius:"20px",fontWeight:700}}>ADMIN</div>
      </div>
      <div className="admin-stat-grid">
        {[
          {icon:"💰",label:"Revenue",val:"$48,240",trend:"+12.5% this week",up:true},
          {icon:"📦",label:"Orders",val:"1,847",trend:"+8.3% this week",up:true},
          {icon:"👟",label:"Products",val:"342",trend:"24 new this month",up:true},
          {icon:"👥",label:"Customers",val:"9,211",trend:"+5.1% this week",up:true},
        ].map((s,i) => (
          <div key={i} className="admin-stat">
            <div className="admin-stat-icon">{s.icon}</div>
            <div className="admin-stat-val">{s.val}</div>
            <div className="admin-stat-label">{s.label}</div>
            <div className={`admin-stat-trend ${s.up?"up":"down"}`}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div style={{padding:"0 1.2rem",marginTop:"1.2rem",marginBottom:"0.5rem",fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:"0.9rem"}}>Recent Orders</div>
      {ORDER_HISTORY.map(o => (
        <div key={o.id} className="admin-order">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:700,fontSize:"0.85rem"}}>{o.id}</div>
              <div style={{color:"var(--muted)",fontSize:"0.75rem"}}>{o.product} • {o.date}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <span className={`status-pill ${o.status}`}>{o.status}</span>
              <div style={{color:"var(--gold)",fontWeight:700,fontSize:"0.875rem",marginTop:"4px"}}>${o.total}</div>
            </div>
          </div>
        </div>
      ))}

      <div style={{padding:"0 1.2rem",marginTop:"1rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
          {[{icon:"📋",label:"Manage Products"},{icon:"🏪",label:"Inventory"},{icon:"📊",label:"Analytics"},{icon:"👥",label:"Customers"}].map((a,i) => (
            <button key={i} style={{background:"var(--card)",border:"1px solid var(--border)",color:"var(--text)",padding:"1rem",borderRadius:"var(--radius-sm)",cursor:"pointer",fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:"0.85rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem"}}>
              <span style={{fontSize:"1.5rem"}}>{a.icon}</span>{a.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{height:"1rem"}}/>
    </div>
  );

  const unreadCount = NOTIFS.filter(n => !n.read && !notifRead.includes(n.id)).length;

  const selectProduct = (p) => {
    setSelectedProduct(p);
    setSelectedSize(null);
    setSelectedColor(0);
    setScreen("detail");
  };

  return (
    <div className="app">
      <style>{css}</style>
      <div className="screen" style={{overflowY:"auto"}}>
        {activeNav === "home" && renderHome()}
        {activeNav === "catalog" && renderCatalog()}
        {activeNav === "cart" && renderCart()}
        {activeNav === "wish" && renderWishlist()}
        {activeNav === "profile" && renderProfile()}
        {activeNav === "notif" && renderNotif()}
        {activeNav === "admin" && renderAdmin()}
        {screen === "checkout" && renderCheckout()}
      </div>

      {screen !== "checkout" && (
        <div className="bottom-nav">
          {[
            {id:"home",icon:"🏠",label:"Home"},
            {id:"catalog",icon:"👟",label:"Shop"},
            {id:"cart",icon:"🛒",label:"Cart",badge:cartCount},
            {id:"wish",icon:"❤️",label:"Saved",badge:wishlist.length||null},
            {id:"profile",icon:"👤",label:"Profile"},
          ].map(n => (
            <div key={n.id} className={`nav-item${activeNav===n.id?" active":""}`} onClick={() => { setActiveNav(n.id); setScreen("main"); }}>
              <span className="nav-icon">{n.icon}</span>
              {n.badge > 0 && <div className="nav-badge">{n.badge}</div>}
              <span className="nav-label">{n.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className={`toast${toast?" show":""}`}>{toast}</div>
    </div>
  );
}

// ── PRODUCT CARD COMPONENT ──────────────────────────────────────────────────
function ProductCard({ p, onSelect, onWish, wishlist, onAdd, full }) {
  const inWish = wishlist.find(i => i.id === p.id);
  return (
    <div className={`product-card${full?" product-card-full":""}`} onClick={() => onSelect(p)}>
      <div className="product-img">{p.image}</div>
      <span className={`product-badge ${p.badge}`}>{p.badge}</span>
      <div className="product-wish" onClick={e => { e.stopPropagation(); onWish(p); }}>{inWish?"❤️":"🤍"}</div>
      <div className="product-brand">{p.brand}</div>
      <div className="product-name">{p.name}</div>
      <div className="product-rating">⭐ {p.rating} <span>({p.reviews})</span></div>
      <div className="product-price-row">
        <span className="product-price">${p.price}</span>
        {p.originalPrice > p.price && <span className="product-orig">${p.originalPrice}</span>}
      </div>
    </div>
  );
}
