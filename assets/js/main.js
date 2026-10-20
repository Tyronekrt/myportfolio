/* ==========================================================================
   Titus Kipkoech Ronoh — Portfolio interactions
   ========================================================================== */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky nav state ---------- */
  const nav = document.getElementById("nav");
  const scrollProgress = document.getElementById("scrollProgress");

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("is-scrolled", y > 24);

    if (scrollProgress) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (y / max) * 100 : 0;
      scrollProgress.style.width = pct + "%";
    }
    updateActiveLink(y);
  }

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    if (!navToggle || !navLinks) return;
    navToggle.classList.remove("is-open");
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const open = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Active section highlighting ---------- */
  const sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  const navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav__links a[href^='#']"));

  function updateActiveLink(y) {
    let current = "";
    const offset = window.innerHeight * 0.32;
    sections.forEach(function (sec) {
      if (sec.offsetTop - offset <= y) current = sec.id;
    });
    navAnchors.forEach(function (a) {
      const href = a.getAttribute("href");
      a.classList.toggle("is-active", href === "#" + current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = el.getAttribute("data-delay");
          if (delay) el.style.setProperty("--d", delay + "ms");
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".stat__num[data-count]");

  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (prefersReducedMotion) {
      el.textContent = String(target);
      return;
    }
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          cio.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) {
      cio.observe(el);
    });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Project card pointer glow ---------- */
  if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".project").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - rect.left + "px");
        card.style.setProperty("--my", e.clientY - rect.top + "px");
      });
    });
  }
})();
