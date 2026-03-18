import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./FitAndFoodie.css";

const EMAILJS_SERVICE_ID = "service_i98zoyt";
const EMAILJS_TEMPLATE_ID = "template_mezixyf";
const EMAILJS_PUBLIC_KEY = "0rFGVkBPZzwWPFwhW";

const NAV_LINKS = ["Home", "Menu", "How It Works", "About", "Contact"];
const MENU_CATEGORIES = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Drinks",
];

const MENU_ITEMS = [
  {
    id: 1,
    name: "Avocado Power Bowl",
    cal: 420,
    price: 13.99,
    category: "Breakfast",
    tag: "High Protein",
    emoji: "🥑",
    desc: "Quinoa base, smashed avocado, poached eggs, seeds & herbs",
  },
  {
    id: 2,
    name: "Green Goddess Wrap",
    cal: 380,
    price: 11.99,
    category: "Lunch",
    tag: "Vegan",
    emoji: "🌿",
    desc: "Spinach tortilla, hummus, roasted veggies, tahini drizzle",
  },
  {
    id: 3,
    name: "Grilled Salmon Plate",
    cal: 510,
    price: 18.99,
    category: "Dinner",
    tag: "Keto",
    emoji: "🐟",
    desc: "Wild salmon, sweet potato mash, steamed broccoli, lemon butter",
  },
  {
    id: 4,
    name: "Berry Bliss Smoothie",
    cal: 210,
    price: 7.99,
    category: "Drinks",
    tag: "Antioxidant",
    emoji: "🍓",
    desc: "Mixed berries, banana, almond milk, chia seeds, honey",
  },
  {
    id: 5,
    name: "Overnight Oats",
    cal: 340,
    price: 9.99,
    category: "Breakfast",
    tag: "Fiber Rich",
    emoji: "🌾",
    desc: "Rolled oats, almond milk, seasonal fruits, maple & nuts",
  },
  {
    id: 6,
    name: "Zesty Chicken Bowl",
    cal: 480,
    price: 15.99,
    category: "Lunch",
    tag: "High Protein",
    emoji: "🍗",
    desc: "Herb chicken, brown rice, roasted peppers, avocado, lime",
  },
  {
    id: 7,
    name: "Lentil Dal Delight",
    cal: 390,
    price: 12.99,
    category: "Dinner",
    tag: "Vegan",
    emoji: "🫘",
    desc: "Red lentil dal, basmati rice, cucumber raita, naan",
  },
  {
    id: 8,
    name: "Protein Energy Balls",
    cal: 180,
    price: 6.99,
    category: "Snacks",
    tag: "Pre-Workout",
    emoji: "⚡",
    desc: "Dates, oats, peanut butter, dark chocolate chips, flax",
  },
  {
    id: 9,
    name: "Matcha Latte",
    cal: 120,
    price: 6.49,
    category: "Drinks",
    tag: "Energizing",
    emoji: "🍵",
    desc: "Ceremonial matcha, oat milk, a touch of agave",
  },
  {
    id: 10,
    name: "Turkey Lettuce Tacos",
    cal: 310,
    price: 13.49,
    category: "Lunch",
    tag: "Low Carb",
    emoji: "🌮",
    desc: "Spiced turkey, butter lettuce cups, pico, cotija, lime crema",
  },
  {
    id: 11,
    name: "Acai Sunrise Bowl",
    cal: 360,
    price: 12.49,
    category: "Breakfast",
    tag: "Superfood",
    emoji: "🫐",
    desc: "Acai blend, granola, banana, coconut flakes, honey drizzle",
  },
  {
    id: 12,
    name: "Roasted Veggie Tray",
    cal: 260,
    price: 8.99,
    category: "Snacks",
    tag: "Clean Eats",
    emoji: "🥕",
    desc: "Seasonal roasted vegetables, herb yogurt dip",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Browse & Choose",
    desc: "Explore our rotating seasonal menu built by nutritionists and chefs.",
    emoji: "📱",
  },
  {
    num: "02",
    title: "Customize It",
    desc: "Adjust portions, swap ingredients, and note any dietary needs.",
    emoji: "✏️",
  },
  {
    num: "03",
    title: "We Cook Fresh",
    desc: "Every order is made to order in our certified cloud kitchen.",
    emoji: "👨‍🍳",
  },
  {
    num: "04",
    title: "Delivered Hot",
    desc: "Insulated packaging keeps meals fresh, delivered in 30–45 min.",
    emoji: "🚴",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya S.",
    role: "Fitness Coach",
    stars: 5,
    text: "Fit and Foodie changed how I meal prep. Clean macros, incredible taste — my clients are obsessed.",
  },
  {
    name: "Marcus T.",
    role: "Software Engineer",
    stars: 5,
    text: "Finally a cloud kitchen that doesn't compromise on flavor for health. The salmon plate is unreal.",
  },
];

const STATS = [
  { value: "50K+", label: "Happy Customers" },
  { value: "98%", label: "On-Time Delivery" },
  { value: "120+", label: "Menu Items" },
  { value: "0g", label: "Artificial Additives" },
];

const FOOTER_COLS = [
  {
    title: "Menu",
    links: ["Breakfast", "Lunch", "Dinner", "Snacks", "Drinks"],
    scrollTo: "Menu",
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press"],
    scrollTo: "About",
  },
  {
    title: "Support",
    links: ["FAQ", "Contact", "Track Order", "Refund Policy"],
    scrollTo: "Contact",
  },
];

const CONTACT_INFO = [
  {
    icon: "📍",
    label: "Location",
    val: "Cloud Kitchen, Koramangala, Bangalore",
  },
  { icon: "📞", label: "Phone", val: "+91 98765 43210" },
  { icon: "✉️", label: "Email", val: "hello@fitandfoodie.in" },
  { icon: "🕐", label: "Hours", val: "Mon–Sun: 7AM – 10PM" },
];

const ABOUT_FEATURES = [
  { icon: "🌿", label: "Locally Sourced" },
  { icon: "🧑‍🍳", label: "Chef-Crafted" },
  { icon: "🔬", label: "Nutritionist-Approved" },
  { icon: "♻️", label: "Eco Packaging" },
];
export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuCategory, setMenuCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemQty, setItemQty] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderSummary, setOrderSummary] = useState(null);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const scrollTo = (section) => {
    const id = section.toLowerCase().replace(/\s/g, "-");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(section);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing)
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...item, qty: 1 }];
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 800);
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  };
  const increaseQty = (id) => {
    setItemQty((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decreaseQty = (id) => {
    setItemQty((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const placeOrder = () => {
    setOrderSummary({
      items: cart,
      total: cartTotal,
      orderId: Math.floor(Math.random() * 90000) + 10000,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setCart([]);
    setCartOpen(false);
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setFormSending(true);
    setFormError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          message: contactForm.message,
          to_email: "srirammeka1307@gmail.com",
        },
        EMAILJS_PUBLIC_KEY,
      );
      setFormSent(true);
      setContactForm({ name: "", email: "", message: "" });
      setTimeout(() => setFormSent(false), 5000);
    } catch (error) {
      setFormError("Something went wrong. Please try again!");
    } finally {
      setFormSending(false);
    }
  };

  const filteredMenu = MENU_ITEMS.filter((i) => {
    const matchesCategory =
      menuCategory === "All" || i.category === menuCategory;
    const matchesSearch = i.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Toast */}
      {orderPlaced && (
        <div className="toast">🎉 Order placed! Cooking starts now.</div>
      )}
      {/* Order Summary Modal */}
      {orderSummary && (
        <div
          className="order-modal-overlay"
          onClick={() => setOrderSummary(null)}
        >
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-header">
              <div className="order-success-icon">🎉</div>
              <h2>Order Confirmed!</h2>
              <p>Your food is being prepared fresh for you.</p>
            </div>
            <div className="order-id-row">
              <span>Order ID</span>
              <span className="order-id">#FF{orderSummary.orderId}</span>
            </div>
            <div className="order-items-list">
              {orderSummary.items.map((item) => (
                <div key={item.id} className="order-item-row">
                  <span className="order-item-emoji">{item.emoji}</span>
                  <span className="order-item-name">{item.name}</span>
                  <span className="order-item-qty">x{item.qty}</span>
                  <span className="order-item-price">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-summary-footer">
              <div className="order-summary-row">
                <span>Delivery</span>
                <span className="free">Free</span>
              </div>
              <div className="order-summary-total">
                <span>Total Paid</span>
                <span>${orderSummary.total.toFixed(2)}</span>
              </div>
              <div className="order-eta">
                🕐 Estimated delivery by <strong>{orderSummary.time}</strong> +
                35 min
              </div>
              <button
                className="btn-primary full-width"
                onClick={() => setOrderSummary(null)}
              >
                Back to Menu →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="cart-overlay">
          <div className="cart-backdrop" onClick={() => setCartOpen(false)} />
          <div className="cart-drawer">
            <div className="cart-header">
              <h2>Your Order</h2>
              <button
                className="cart-close-btn"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <span>🛒</span>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <span className="cart-item-emoji">{item.emoji}</span>
                      <div className="cart-item-info">
                        <p>{item.name}</p>
                        <p className="cart-item-price">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                      <div className="cart-qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.id, -1)}
                        >
                          −
                        </button>
                        <span className="qty-value">{item.qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="cart-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="cart-summary-row free-delivery">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                  <div className="cart-summary-total">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    className="btn-primary full-width"
                    onClick={placeOrder}
                  >
                    Place Order →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          <div className="nav-logo-icon">🥗</div>
          <span className="nav-logo-text">
            Fit <span>&</span> Foodie
          </span>
        </div>
        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className={`nav-link ${activeNav === link ? "active" : ""}`}
              onClick={() => scrollTo(link)}
            >
              {link}
            </button>
          ))}
          <button className="btn-primary" onClick={() => setCartOpen(true)}>
            🛒{" "}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
        <button
          className="btn-primary mobile-cart-btn"
          style={{ display: "none" }}
          onClick={() => setCartOpen(true)}
        >
          🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </nav>
      {/* Sticky Cart Bar */}
      {cartCount > 0 && !cartOpen && (
        <div className="sticky-cart-bar" onClick={() => setCartOpen(true)}>
          <div className="sticky-cart-left">
            <span className="sticky-cart-count">
              {cartCount} item{cartCount > 1 ? "s" : ""}
            </span>
            <span className="sticky-cart-label">in your cart</span>
          </div>
          <div className="sticky-cart-right">
            <span className="sticky-cart-total">${cartTotal.toFixed(2)}</span>
            <span className="sticky-cart-btn">View Cart →</span>
          </div>
        </div>
      )}
      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-glow-top" />
        <div className="hero-glow-bottom" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge">🌱 100% Clean Ingredients</div>
            <h1>
              Fuel Your Body,
              <br />
              <span className="highlight">Love</span> Your Food.
            </h1>
            <p className="hero-desc">
              Nutritionist-designed meals cooked fresh in our cloud kitchen and
              delivered to your door. Healthy eating that actually tastes
              incredible.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollTo("Menu")}>
                Explore Menu →
              </button>
              <button
                className="btn-secondary"
                onClick={() => scrollTo("How It Works")}
              >
                How It Works
              </button>
            </div>
            <div className="hero-stats">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-blob">🥗</div>
            <div className="hero-floating-card top-right">
              <span>⚡</span>
              <div>
                <div className="floating-card-title">30–45 min</div>
                <div className="floating-card-sub">Delivery time</div>
              </div>
            </div>
            <div className="hero-floating-card bottom-left">
              <span>⭐</span>
              <div>
                <div className="floating-card-title">4.9 / 5.0</div>
                <div className="floating-card-sub">Customer rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="menu-section">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Fresh Every Day</span>
            <h2>Our Menu</h2>
            <p>
              Every dish is calorie-tracked, macro-balanced, and made with whole
              ingredients.
            </p>
          </div>
          <div className="menu-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for a dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>
          <div className="category-filters">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${menuCategory === cat ? "active" : ""}`}
                onClick={() => setMenuCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="menu-grid">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="menu-card skeleton-card">
                      <div className="skeleton skeleton-emoji" />
                      <div className="skeleton skeleton-title" />
                      <div className="skeleton skeleton-desc" />
                      <div className="skeleton skeleton-desc short" />
                      <div className="skeleton skeleton-footer" />
                    </div>
                  ))
              : filteredMenu.map((item) => (
                  <div key={item.id} className="menu-card">
                    <div className="menu-card-emoji">{item.emoji}</div>
                    <div className="menu-card-top">
                      <h3>{item.name}</h3>
                      <span className="menu-tag">{item.tag}</span>
                    </div>
                    <p className="menu-card-desc">{item.desc}</p>
                    <div className="menu-card-footer">
                      <div>
                        <span className="menu-price">${item.price}</span>
                        <span className="menu-kcal">{item.cal} kcal</span>
                      </div>
                      <div className="card-add-controls">
                        <div className="card-qty-selector">
                          <button
                            className="qty-btn"
                            onClick={() => decreaseQty(item.id)}
                          >
                            −
                          </button>
                          <span className="qty-value">
                            {itemQty[item.id] || 1}
                          </span>
                          <button
                            className="qty-btn"
                            onClick={() => increaseQty(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className={`add-btn ${addedId === item.id ? "added" : ""}`}
                          onClick={() => {
                            const qty = itemQty[item.id] || 1;
                            for (let i = 0; i < qty; i++) addToCart(item);
                            setItemQty((prev) => ({ ...prev, [item.id]: 1 }));
                          }}
                        >
                          {addedId === item.id ? "✓ Added" : "+ Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-section">
        <div className="section-inner">
          <div className="section-header how-header">
            <span className="section-eyebrow">Simple Process</span>
            <h2>How It Works</h2>
          </div>
          <div className="steps-grid">
            {STEPS.map((step) => (
              <div key={step.num} className="step-card">
                <div className="step-icon">{step.emoji}</div>
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <div className="about-grid">
          <div>
            <span className="about-eyebrow">Our Story</span>
            <h2>Born from a Passion for Better Food</h2>
            <p>
              Fit &amp; Foodie started in 2021 when two friends — a chef and a
              nutritionist — got tired of choosing between food that was good
              for you and food that tasted amazing. They built a cloud kitchen
              with one rule: never compromise on either.
            </p>
            <p>
              Every recipe is developed together — first for nutrition, then
              obsessively refined for flavor. Our kitchen is FSSAI-certified,
              and we source from local farmers to keep ingredients as fresh as
              possible.
            </p>
            <div className="about-features">
              {ABOUT_FEATURES.map((f) => (
                <div key={f.label} className="feature-pill">
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="founder-quote">
              <div className="quote-emoji">👨‍🍳</div>
              <blockquote>
                "If we wouldn't eat it ourselves, we wouldn't serve it to you."
              </blockquote>
              <cite>— Arjun &amp; Meena, Co-Founders</cite>
            </div>
            <div className="testimonials-mini">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="testimonial-card">
                  <div className="testimonial-stars">{"★".repeat(t.stars)}</div>
                  <p>"{t.text}"</p>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-banner-inner">
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <h2>Loved by thousands of health-conscious foodies</h2>
          <p>Join 50,000+ customers who eat clean without giving up flavor.</p>
          <button className="btn-white" onClick={() => scrollTo("Menu")}>
            Order Now →
          </button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <div>
            <span className="contact-eyebrow">Get in Touch</span>
            <h2>We'd Love to Hear from You</h2>
            <p>
              Have a question, special request, or want to partner with us? Send
              us a message and we'll get back within 24 hours.
            </p>
            <div className="contact-info-list">
              {CONTACT_INFO.map((c) => (
                <div key={c.label} className="contact-info-item">
                  <span>{c.icon}</span>
                  <div>
                    <div className="contact-info-label">{c.label}</div>
                    <div className="contact-info-val">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-form-card">
            {formSent ? (
              <div className="form-success">
                <div className="success-emoji">🎉</div>
                <h3>Message Sent!</h3>
                <p>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContact}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    required
                    placeholder="abc"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="abco@email.com"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us anything..."
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, message: e.target.value }))
                    }
                  />
                </div>
                {formError && <p className="form-error">{formError}</p>}
                <button
                  type="submit"
                  className="btn-primary full-width"
                  disabled={formSending}
                >
                  {formSending ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <div className="footer-brand-icon">🥗</div>
                <span className="footer-brand-name">Fit &amp; Foodie</span>
              </div>
              <p className="footer-tagline">
                Healthy food delivered fast. No compromises on taste or
                nutrition.
              </p>
            </div>
            {FOOTER_COLS.map((col) => (
              <div key={col.title} className="footer-col">
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link}>
                      <button onClick={() => scrollTo(col.scrollTo)}>
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <p>© 2025 Fit &amp; Foodie. All rights reserved.</p>
            <p>Made with 💚 in Bangalore</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
