/* ===================================
   EDC Electrical Consulting Scripts
   =================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initMobileMenu();
  initSmoothScroll();
  initNavbarScroll();
  initContactForm();
  initBackToTop();
});

/* ===================================
   Mobile Menu
   =================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavLinks = mobileNav.querySelectorAll("a");

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", function () {
    mobileNav.classList.toggle("active");

    // Animate hamburger icon
    const spans = this.querySelectorAll("span");
    if (mobileNav.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });

  // Close mobile menu when clicking a link
  mobileNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });
}

function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const spans = mobileMenuBtn.querySelectorAll("span");

  mobileNav.classList.toggle("active");

  if (mobileNav.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNav");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const spans = mobileMenuBtn.querySelectorAll("span");

  mobileNav.classList.remove("active");
  spans[0].style.transform = "none";
  spans[1].style.opacity = "1";
  spans[2].style.transform = "none";
}

/* ===================================
   Smooth Scrolling
   =================================== */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        const navHeight = document.querySelector(".nav").offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/* ===================================
   Navbar Background on Scroll
   =================================== */
function initNavbarScroll() {
  const nav = document.querySelector(".nav");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      nav.style.background = "rgba(10, 22, 40, 0.98)";
      nav.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      nav.style.background = "rgba(10, 22, 40, 0.95)";
      nav.style.boxShadow = "none";
    }
  });
}

/* ===================================
   Contact Form Handling
   =================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = {};

      formData.forEach(function (value, key) {
        // Handle checkboxes (multiple values)
        if (data[key]) {
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
      });

      // Log form data (for development)
      console.log("Form submitted:", data);

      // Show success message
      showFormSuccess();

      // Reset form
      form.reset();
    });
  }
}

function showFormSuccess() {
  // Create success message element
  const successMessage = document.createElement("div");
  successMessage.className = "form-success-message";
  successMessage.innerHTML = `
        <div class="success-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
            <button onclick="closeSuccessMessage(this)">Close</button>
        </div>
    `;

  // Add styles
  successMessage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(10, 22, 40, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;

  const successContent = successMessage.querySelector(".success-content");
  successContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 16px;
        text-align: center;
        max-width: 400px;
        margin: 1rem;
    `;

  const svg = successMessage.querySelector("svg");
  svg.style.cssText = `
        width: 60px;
        height: 60px;
        stroke: #f5a623;
        margin-bottom: 1rem;
    `;

  const h3 = successMessage.querySelector("h3");
  h3.style.cssText = `
        font-family: 'Outfit', sans-serif;
        font-size: 1.5rem;
        color: #0a1628;
        margin-bottom: 0.5rem;
    `;

  const p = successMessage.querySelector("p");
  p.style.cssText = `
        color: #6b7280;
        margin-bottom: 1.5rem;
    `;

  const button = successMessage.querySelector("button");
  button.style.cssText = `
        background: linear-gradient(135deg, #f5a623, #ffc857);
        color: #0a1628;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
        font-size: 1rem;
    `;

  document.body.appendChild(successMessage);
}

function closeSuccessMessage(button) {
  const message = button.closest(".form-success-message");
  message.style.animation = "fadeOut 0.3s ease";
  setTimeout(function () {
    message.remove();
  }, 300);
}

/* ===================================
   Utility: Add Animation Keyframes
   =================================== */
(function () {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
  document.head.appendChild(style);
})();

/* Back to Top Button */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
