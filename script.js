/* =========================================================
   TECH JAGAT COMPUTER EDUCATION — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------
     EDITABLE SETTINGS
     Change the course fee here — it updates everywhere on the
     page automatically (fee card + payment breakdown).
     --------------------------------------------------------- */
  const FEE_CONFIG = {
    totalFee: 29900,       // total course fee in INR
    registration: 4900,    // admission / registration amount
  };
  applyFeeConfig(FEE_CONFIG);

  /* ---------------------------------------------------------
     MOBILE NAVIGATION
     --------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');

  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      hamburgerBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when a nav link is tapped
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------------------------------------------------
     STICKY HEADER SHADOW ON SCROLL
     --------------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;
  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    if (header) {
      header.style.boxShadow = y > 12 ? '0 6px 24px rgba(10,20,48,0.28)' : 'none';
    }
    lastScroll = y;
  }, { passive: true });

  /* ---------------------------------------------------------
     FAQ ACCORDION
     --------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      // Close all other open items (single-open accordion)
      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------------------------------------------------------
     SCROLL-REVEAL (lightweight, respects reduced motion)
     --------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.skill-card, .career-card, .project-card, .ai-card, .journey-phase, .why-card, .stat-card'
    );
    revealTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
    });

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------
     ENQUIRY FORM — VALIDATION + PLACEHOLDER SUBMIT
     --------------------------------------------------------- */
  const form = document.getElementById('enquiryForm');
  const statusEl = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(form)) {
        submitEnquiry(form);
      }
    });
  }

  function validateForm(formEl) {
    let isValid = true;

    // Student name
    isValid = validateField(
      formEl.studentName,
      formEl.studentName.value.trim().length >= 2,
      'Please enter the student\'s name.'
    ) && isValid;

    // Mobile number — 10 digit Indian mobile
    const mobileVal = formEl.mobile.value.trim();
    isValid = validateField(
      formEl.mobile,
      /^[6-9]\d{9}$/.test(mobileVal),
      'Please enter a valid 10-digit mobile number.'
    ) && isValid;

    // Current education
    isValid = validateField(
      formEl.education,
      formEl.education.value !== '',
      'Please select current education.'
    ) && isValid;

    return isValid;
  }

  function validateField(field, isFieldValid, message) {
    const wrapper = field.closest('.form-field');
    const errorEl = document.getElementById('err-' + field.id);
    if (!isFieldValid) {
      wrapper.classList.add('has-error');
      if (errorEl) errorEl.textContent = message;
      return false;
    } else {
      wrapper.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  }

  /**
   * submitEnquiry(formEl)
   * -----------------------------------------------------------
   * This is a static HTML website, so no data is actually sent
   * to a server from this function as written.
   *
   * To connect this to a real backend, replace the contents of
   * this function with one of the following:
   *
   *  1) Google Forms:
   *     Submit via a hidden iframe POST to your Google Form's
   *     "formResponse" URL, mapping each field to its matching
   *     "entry.XXXXXXX" field ID from the form's prefilled link.
   *
   *  2) Formspree (https://formspree.io):
   *     fetch('https://formspree.io/f/YOUR_FORM_ID', {
   *       method: 'POST',
   *       headers: { 'Accept': 'application/json' },
   *       body: new FormData(formEl)
   *     });
   *
   *  3) EmailJS (https://www.emailjs.com):
   *     emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', formEl);
   *
   *  4) A custom PHP / Node backend:
   *     fetch('/api/enquiry', {
   *       method: 'POST',
   *       headers: { 'Content-Type': 'application/json' },
   *       body: JSON.stringify(Object.fromEntries(new FormData(formEl)))
   *     });
   *
   * Until a backend is connected, this function simply shows a
   * confirmation message and suggests contacting via WhatsApp
   * or phone so no enquiry is lost.
   */
  function submitEnquiry(formEl) {
    const data = Object.fromEntries(new FormData(formEl));

    // TODO: Replace this block with a real backend call (see comment above).
    console.log('Enquiry captured (not yet connected to a backend):', data);

    if (statusEl) {
      statusEl.textContent =
        'Thank you, ' + (data.studentName || 'there') + '! Your enquiry has been noted. ' +
        'For a faster response, you can also reach us directly on WhatsApp or by phone.';
      statusEl.className = 'form-status success';
    }

    formEl.reset();
    document.querySelectorAll('.form-field').forEach(function (f) {
      f.classList.remove('has-error');
    });
  }

  /* ---------------------------------------------------------
     FEE CONFIG APPLIER
     --------------------------------------------------------- */
  function applyFeeConfig(cfg) {
    const remaining = cfg.totalFee - cfg.registration;
    const fmt = function (n) { return '₹' + n.toLocaleString('en-IN'); };

    const amountEl = document.querySelector('[data-fee-amount]');
    const regEl = document.querySelector('[data-fee-registration]');
    const remEl = document.querySelector('[data-fee-remaining]');

    if (amountEl) amountEl.textContent = fmt(cfg.totalFee);
    if (regEl) regEl.textContent = fmt(cfg.registration);
    if (remEl) remEl.textContent = fmt(remaining);
  }

});
