const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");
const contactForm = document.querySelector("#contact-form");
const newsletterForm = document.querySelector("#newsletter-form");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const showWarning = (fieldName, show) => {
  const warning = document.querySelector(`.field-warning[data-field="${fieldName}"]`);
  if (warning) {
    warning.classList.toggle("is-visible", show);
  }
};

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();

    let isValid = true;

    if (!name) {
      showWarning("name", true);
      isValid = false;
    } else {
      showWarning("name", false);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      showWarning("email", true);
      isValid = false;
    } else {
      showWarning("email", false);
    }

    if (!isValid) {
      return;
    }

    contactForm.reset();
    const confirmation = document.createElement("p");
    confirmation.className = "form-confirmation";
    confirmation.innerHTML = `Thanks, <strong>${name}</strong>. I’ll reply soon.`;

    const existingMessage = contactForm.querySelector(".form-confirmation");
    if (existingMessage) {
      existingMessage.remove();
    }

    contactForm.appendChild(confirmation);
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(newsletterForm);
    const email = String(formData.get("email") || "").trim();

    if (!email) {
      return;
    }

    newsletterForm.reset();
    const confirmation = document.createElement("p");
    confirmation.className = "newsletter__confirmation";
    confirmation.textContent = "Thanks for subscribing!";

    const existing = newsletterForm.querySelector(".newsletter__confirmation");
    if (existing) {
      existing.remove();
    }

    newsletterForm.appendChild(confirmation);
  });
}
