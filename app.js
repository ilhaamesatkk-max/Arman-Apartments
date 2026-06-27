/*
   ARMAN Lodge - Modern Premium Interactive Logic
   Handles: Property rendering, Multi-step booking assistant, FAQ accordion, Theme toggle,
            Scroll Reveals, Parallax, and Magnetic Card Glow effects.
*/

// --- PROPERTY DATA MODELS ---
const properties = {
  shortTerm: [
    {
      id: "st-1",
      title: "ARMAN Lodge — Suite One",
      location: "30 B RG Mugabe Way, Newtown, Kwekwe",
      type: "Short-Term Stay",
      badgeClass: "badge-green",
      price: "Contact Us",
      priceUnit: "/night",
      image: "images/bedroom_double.jpg",
      description: "A beautifully furnished 2-bedroom self-catering suite at ARMAN Lodge. Sleeps up to 4 guests comfortably with 1 double bed and 2 single beds. Includes daily housekeeping, Netflix, DStv Compact, and all the comforts of home.",
      beds: "2 Bedrooms",
      baths: "1 Shower & Toilet",
      sqft: "Check-in 2PM",
      features: ["Free Wi-Fi & Netflix", "DStv Compact", "Backup Power", "Gas Geyser", "Tea & Coffee", "Daily Housekeeping"],
      airbnbUrl: "https://www.airbnb.com/rooms/example-suite-one",
      ctaText: "Book This Suite",
      action: "book-airbnb"
    },
    {
      id: "st-2",
      title: "ARMAN Lodge — Suite Two",
      location: "30 B RG Mugabe Way, Newtown, Kwekwe",
      type: "Short-Term Stay",
      badgeClass: "badge-green",
      price: "Contact Us",
      priceUnit: "/night",
      image: "images/bedroom_twin.jpg",
      description: "A warm and inviting 2-bedroom self-catering suite with modern furnishings. Equipped with smart TV, portable air cooler, backup power, and a private shower—ideal for business or leisure stays in Newtown.",
      beds: "2 Bedrooms",
      baths: "1 Shower & Toilet",
      sqft: "Check-in 2PM",
      features: ["Smart TV & Netflix", "DStv Compact", "Portable Air Cooler", "Backup Power", "Night Guard", "Tea & Coffee"],
      airbnbUrl: "https://www.airbnb.com/rooms/example-suite-two",
      ctaText: "Book This Suite",
      action: "book-airbnb"
    },
    {
      id: "st-3",
      title: "ARMAN Lodge — Suite Three",
      location: "30 B RG Mugabe Way, Newtown, Kwekwe",
      type: "Short-Term Stay",
      badgeClass: "badge-green",
      price: "Contact Us",
      priceUnit: "/night",
      image: "images/kitchen.jpg",
      description: "A stylish and fully self-catered 2-bedroom suite at ARMAN Lodge. Perfect for families or small groups, featuring a double bed and two single beds, gas geyser, daily housekeeping, and a cosy atmosphere you will love.",
      beds: "2 Bedrooms",
      baths: "1 Shower & Toilet",
      sqft: "Check-in 2PM",
      features: ["Free Wi-Fi", "Netflix & DStv", "Gas Geyser", "Air Cooler", "Daily Housekeeping", "Secure Complex"],
      airbnbUrl: "https://www.airbnb.com/rooms/example-suite-three",
      ctaText: "Book This Suite",
      action: "book-airbnb"
    }
  ]
};

// --- APP INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHeader();
  renderProperties("shortTerm");
  initBookingAssistant();
  initFAQ();
  initReviews();
  
  // Advanced Scroll & Dynamic Glow Initializations
  initScrollAnimations();
  initParallax();
  initCardGlowEffects();
});

// --- THEME MANAGEMENT (DARK / LIGHT) ---
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (savedTheme === "light" || (!savedTheme && prefersLight)) {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
  });
}

// --- HEADER SCROLL ACTION ---
function initHeader() {
  const header = document.querySelector(".header-nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// --- PROPERTY RENDER ---
function renderProperties(category) {
  const grid = document.getElementById("properties-grid");
  if (!grid) return;

  const data = properties[category];
  grid.innerHTML = "";

  data.forEach((prop, index) => {
    const card = document.createElement("div");
    card.className = "property-card glass-panel reveal-item reveal-scale";
    
    // Apply staggered scroll reveal delay dynamically in JS
    card.style.transitionDelay = `${index * 0.1}s`;
    
    const featuresHTML = prop.features.slice(0, 4).map(feat => `
      <span class="feature-tag">${feat}</span>
    `).join("");

    const whatsappNumber = "263786138798";
    const whatsappMsg = encodeURIComponent(`Hi! I'm interested in booking ${prop.title} at ARMAN Lodge. Could you please help me check availability?`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

    card.innerHTML = `
      <div class="property-img-container">
        <span class="badge ${prop.badgeClass} property-tag-badge">${prop.type}</span>
        <img class="property-img" src="${prop.image}" alt="${prop.title}" loading="lazy">
        <div class="property-price-badge">${prop.price}<span>${prop.priceUnit}</span></div>
      </div>
      <div class="property-details">
        <h3 class="property-title">${prop.title}</h3>
        <div class="property-location">
          <i class="fas fa-map-marker-alt"></i> ${prop.location}
        </div>
        <p class="property-desc">${prop.description}</p>
        <div class="property-specs">
          <div class="spec-item"><i class="fas fa-bed"></i> ${prop.beds}</div>
          <div class="spec-item"><i class="fas fa-bath"></i> ${prop.baths}</div>
          <div class="spec-item"><i class="fas fa-ruler-combined"></i> ${prop.sqft}</div>
        </div>
        <div class="property-features">
          ${featuresHTML}
        </div>
        <div class="property-footer">
          <a href="${whatsappUrl}" target="_blank" class="btn btn-primary" style="width: 100%;"><i class="fab fa-whatsapp"></i> Book via WhatsApp</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
    
    // Force intersection observer register
    setTimeout(() => {
      if (window.scrollObserver) {
        window.scrollObserver.observe(card);
      }
    }, 50);
  });
}

// --- INTERACTIVE MULTI-STEP BOOKING ASSISTANT ---
let assistantData = {
  stayType: "shortTerm",
  guests: 1,
  fullName: "",
  email: "",
  phone: "",
  propertyPref: "",
  comments: ""
};

let currentStep = 1;
const totalSteps = 3;

function initBookingAssistant() {
  const nextBtns = document.querySelectorAll(".next-step-btn");
  const prevBtns = document.querySelectorAll(".prev-step-btn");
  
  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      goToStep(currentStep - 1);
    });
  });

  // Render suite listings for step 2
  renderAirbnbListingsInAssistant();
}

function renderAirbnbListingsInAssistant() {
  const container = document.getElementById("airbnb-listings-selection");
  if (!container) return;

  const whatsappNumber = "263786138798";
  const whatsappMsg = encodeURIComponent(`Hi! I'm interested in booking a suite at ARMAN Lodge. My name is ${assistantData.fullName || "[your name]"}. Could you please help me check availability?`);

  container.innerHTML = `
    <a
      href="https://wa.me/${whatsappNumber}?text=${whatsappMsg}"
      target="_blank"
      class="booking-option-card booking-option-card--full glass-panel"
      id="booking-opt-whatsapp"
      onclick="handleBookingOption('whatsapp')"
    >
      <div class="booking-option-icon whatsapp-icon">
        <i class="fab fa-whatsapp"></i>
      </div>
      <div class="booking-option-body">
        <h4>Contact Us on WhatsApp</h4>
        <p class="text-muted">Chat directly with us to check availability, ask questions, and confirm your booking — fast and personal.</p>
      </div>
      <span class="btn btn-whatsapp" style="white-space: nowrap;">
        <i class="fab fa-whatsapp"></i> Open WhatsApp
      </span>
    </a>
  `;
}

function handleBookingOption(method) {
  logLead("Booking Option Selected", {
    method,
    name: assistantData.fullName,
    phone: assistantData.phone,
    guests: assistantData.guests
  });

  const successMessage = document.getElementById("success-lead-message");
  if (successMessage) {
    successMessage.innerHTML = `
      <p style="margin-bottom: 12px;">Thank you, <strong>${assistantData.fullName}</strong>!</p>
      <p style="font-size: 0.95rem; color: var(--text-secondary);">You're being connected to us on WhatsApp. We'll confirm availability and walk you through the booking personally.</p>
    `;
  }

  setTimeout(() => {
    goToStep(3);
  }, 150);
}

function validateStep(step) {
  if (step === 1) {
    const name = document.getElementById("assistant-name").value.trim();
    const email = document.getElementById("assistant-email").value.trim();
    const phone = document.getElementById("assistant-phone").value.trim();
    const guests = document.getElementById("assistant-guests").value;
    
    if (!name || !email || !phone) {
      alert("Please fill in your Name, Email, and Phone number.");
      return false;
    }
    
    assistantData.fullName = name;
    assistantData.email = email;
    assistantData.phone = phone;
    assistantData.guests = guests;
    return true;
  }
  return true;
}

function goToStep(step) {
  if (step < 1 || step > totalSteps) return;
  
  document.querySelector(`.step-content[data-step="${currentStep}"]`).classList.remove("active");
  document.querySelector(`.step-content[data-step="${step}"]`).classList.add("active");
  
  currentStep = step;
  updateProgressUI();
}

function updateProgressUI() {
  const steps = document.querySelectorAll(".progress-step");
  const line = document.getElementById("progress-line");
  
  const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
  if (line) line.style.width = `${percent}%`;
  
  steps.forEach(step => {
    const stepNum = parseInt(step.getAttribute("data-step"));
    step.classList.remove("active", "completed");
    
    if (stepNum < currentStep) {
      step.classList.add("completed");
      step.innerHTML = '<i class="fas fa-check"></i>';
    } else if (stepNum === currentStep) {
      step.classList.add("active");
      step.textContent = stepNum;
    } else {
      step.textContent = stepNum;
    }
  });
}

function logLead(eventType, data) {
  console.log(`[ARMAN Apartments Lead Center] Event: ${eventType}`, data);
}

// --- DYNAMIC FAQ ACCORDION ---
function initFAQ() {
  const triggers = document.querySelectorAll(".faq-trigger");
  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const parent = trigger.parentElement;
      const isOpen = parent.classList.contains("open");
      
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("open");
      });
      
      if (!isOpen) {
        parent.classList.add("open");
      }
    });
  });
}

// --- ADVANCED SCROLL REVEAL ENGINE ---
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-item");
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        self.unobserve(entry.target);
      }
    });
  }, observerOptions);

  window.scrollObserver = observer;

  const staggerContainers = [
    document.getElementById("amenity-highlights-grid"),
    document.getElementById("guest-reviews-container")
  ];

  staggerContainers.forEach(container => {
    if (!container) return;
    const children = container.querySelectorAll(".reveal-item");
    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.15}s`;
    });
  });

  revealElements.forEach(el => {
    observer.observe(el);
  });
}

// --- DYNAMIC CARD REFLECTION GLOW EFFECT ---
function initCardGlowEffects() {
  const cards = document.querySelectorAll(".glass-panel");
  
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
    });
  });
}

// --- HERO IMAGE SCROLL PARALLAX ---
function initParallax() {
  const heroSection = document.getElementById("hero");
  if (!heroSection) return;

  window.addEventListener("scroll", () => {
    const scrollOffset = window.pageYOffset;
    if (scrollOffset < window.innerHeight) {
      heroSection.style.backgroundPositionY = `${scrollOffset * 0.45}px`;
    }
  });
}

// --- DYNAMIC REVIEWS ENGINE ---
const defaultReviews = [];

function initReviews() {
  renderReviews();
  initStarSelector();
}

function getInitials(name) {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function renderReviews() {
  const container = document.getElementById("guest-reviews-container");
  if (!container) return;

  // Retrieve user reviews from localStorage
  const userReviews = JSON.parse(localStorage.getItem("arman_reviews")) || [];
  const allReviews = [...userReviews, ...defaultReviews];

  if (allReviews.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary); width: 100%;">
        <i class="far fa-comments" style="font-size: 2.5rem; color: var(--accent-red); margin-bottom: 16px; display: block;"></i>
        <p>No reviews yet. Be the first to share your experience!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";

  allReviews.forEach((review, index) => {
    const card = document.createElement("div");
    card.className = "review-card glass-panel reveal-item";
    
    // Add staggered visual entry directions
    if (index % 3 === 0) card.classList.add("reveal-left");
    else if (index % 3 === 2) card.classList.add("reveal-right");

    // Generate stars HTML
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= review.rating) {
        starsHTML += '<i class="fas fa-star"></i>';
      } else {
        starsHTML += '<i class="far fa-star"></i>';
      }
    }

    const initials = getInitials(review.name);

    card.innerHTML = `
      <div class="review-stars">
        ${starsHTML}
      </div>
      <p class="review-text">
        "${review.text}"
      </p>
      <div class="review-author">
        <div class="review-avatar">
          ${initials}
        </div>
        <div>
          <h4 class="author-name">${review.name}</h4>
          <span class="author-role">${review.role}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
    
    // Register scroll observer for new items
    if (window.scrollObserver) {
      window.scrollObserver.observe(card);
    }
  });
}

function initStarSelector() {
  const stars = document.querySelectorAll("#star-rating-selector .star-btn");
  const ratingInput = document.getElementById("review-rating");
  if (!stars.length || !ratingInput) return;

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const val = parseInt(star.getAttribute("data-value"));
      ratingInput.value = val;
      
      // Update star selection state
      stars.forEach(s => {
        const sVal = parseInt(s.getAttribute("data-value"));
        if (sVal <= val) {
          s.classList.remove("far");
          s.classList.add("fas", "active");
        } else {
          s.classList.remove("fas", "active");
          s.classList.add("far");
        }
      });
    });
  });
}

function submitUserReview() {
  const nameInput = document.getElementById("review-name");
  const roleInput = document.getElementById("review-role");
  const ratingInput = document.getElementById("review-rating");
  const textInput = document.getElementById("review-text");

  if (!nameInput || !roleInput || !ratingInput || !textInput) return;

  const name = nameInput.value.trim();
  const role = roleInput.value;
  const rating = parseInt(ratingInput.value);
  const text = textInput.value.trim();

  if (!name || !text) {
    alert("Please fill in your name and review message.");
    return;
  }

  const newReview = { name, role, rating, text };

  // Save to localStorage
  const userReviews = JSON.parse(localStorage.getItem("arman_reviews")) || [];
  userReviews.unshift(newReview);
  localStorage.setItem("arman_reviews", JSON.stringify(userReviews));

  // Reset inputs
  nameInput.value = "";
  textInput.value = "";
  ratingInput.value = 5;
  
  // Reset star visuals
  const stars = document.querySelectorAll("#star-rating-selector .star-btn");
  stars.forEach(s => {
    s.classList.remove("far");
    s.classList.add("fas", "active");
  });

  // Re-render
  renderReviews();
  
  alert("Thank you! Your review has been added successfully.");
}
