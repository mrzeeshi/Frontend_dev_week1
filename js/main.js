/* ==========================================================
   Zeeshan Haider — Portfolio
   Features: theme toggle, mobile nav, scroll-spy, reveal on
   scroll, typed text, skill bars, form validation, copy email
   ========================================================== */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EMAIL = 'z.haider1504@gmail.com';

  /* ---------- Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  /* ---------- Theme ---------- */
  const themeBtn = $('#themeToggle');
  const themeMeta = $('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
    if (themeMeta) themeMeta.setAttribute('content', theme === 'light' ? '#f6f9fc' : '#070d14');
  }
  applyTheme(root.getAttribute('data-theme') || 'dark');

  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
  });

  /* ---------- Header / mobile nav ---------- */
  const header = $('#header');
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');

  function setMenu(open) {
    navMenu.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  navToggle?.addEventListener('click', () => setMenu(!navMenu.classList.contains('open')));
  $$('.nav__menu a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      setMenu(false);
      navToggle.focus();
    }
  });
  document.addEventListener('click', e => {
    if (navMenu.classList.contains('open') && !header.contains(e.target)) setMenu(false);
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  /* ---------- Scroll state: header shadow + back to top ---------- */
  const toTop = $('#toTop');
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 12);
    toTop?.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ---------- Scroll-spy (active nav link) ---------- */
  const navLinks = $$('.nav__link');
  const sections = $$('main section[id]');
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(section => spy.observe(section));

    /* ---------- Reveal on scroll + skill bars ---------- */
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        $$('.bar', entry.target).forEach(bar => bar.classList.add('in'));
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => reveal.observe(el));
  } else {
    $$('.reveal, .bar').forEach(el => el.classList.add('in'));
  }

  /* ---------- Typed text in hero ---------- */
  const typedEl = $('#typed');
  if (typedEl && !reduceMotion) {
    const words = ['responsive websites', 'clean user interfaces', 'fast, accessible pages', 'security-minded frontends'];
    let w = 0, c = words[0].length, deleting = false;
    const tick = () => {
      const word = words[w];
      typedEl.textContent = word.slice(0, c);
      if (!deleting && c === word.length) { deleting = true; return setTimeout(tick, 1700); }
      if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; return setTimeout(tick, 350); }
      c += deleting ? -1 : 1;
      setTimeout(tick, deleting ? 35 : 70);
    };
    setTimeout(tick, 1700);
  }

  /* ---------- Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Copy email ---------- */
  $('#copyEmail')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast('Email address copied');
    } catch (e) {
      showToast('Copy failed — please copy it manually');
    }
  });

  /* ---------- Contact form validation ---------- */
  const form = $('#contactForm');
  if (form) {
    const status = $('#formStatus');
    const submitBtn = $('#submitBtn');
    const counter = $('#message-count');
    const messageInput = $('#message');

    const rules = {
      name: v => v.trim().length >= 2 || 'Please enter your name (at least 2 characters).',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address.',
      subject: v => v.trim().length >= 3 || 'Please add a short subject (at least 3 characters).',
      message: v => {
        const len = v.trim().length;
        if (len < 10) return 'Your message should be at least 10 characters.';
        if (len > 1000) return 'Please keep your message under 1000 characters.';
        return true;
      }
    };

    function validateField(input) {
      const result = rules[input.name](input.value);
      const ok = result === true;
      const wrap = input.closest('.field');
      $('#' + input.id + '-error').textContent = ok ? '' : result;
      input.setAttribute('aria-invalid', String(!ok));
      wrap.classList.toggle('invalid', !ok);
      wrap.classList.toggle('valid', ok);
      return ok;
    }

    const fields = $$('input[name], textarea[name]', form);
    fields.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.closest('.field').classList.contains('invalid')) validateField(input);
      });
    });

    messageInput.addEventListener('input', () => {
      counter.textContent = messageInput.value.length + ' / 1000';
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      status.className = 'form__status';
      status.textContent = '';

      const results = fields.map(validateField);
      if (results.includes(false)) {
        fields[results.indexOf(false)].focus();
        status.classList.add('err');
        status.textContent = 'Please fix the highlighted fields and try again.';
        return;
      }

      /* Frontend-only: hand the validated message to the visitor's email app */
      const data = Object.fromEntries(new FormData(form).entries());
      const body = `${data.message.trim()}\n\n— ${data.name.trim()} (${data.email.trim()})`;
      const href = `mailto:${EMAIL}?subject=${encodeURIComponent(data.subject.trim())}&body=${encodeURIComponent(body)}`;

      submitBtn.disabled = true;
      $('.btn__label', submitBtn).textContent = 'Preparing…';

      setTimeout(() => {
        window.location.href = href;
        status.classList.add('ok');
        status.textContent = `Thanks, ${data.name.trim().split(' ')[0]}! Your email app should open with the message ready to send.`;
        form.reset();
        counter.textContent = '0 / 1000';
        fields.forEach(f => {
          f.closest('.field').classList.remove('valid', 'invalid');
          f.removeAttribute('aria-invalid');
        });
        submitBtn.disabled = false;
        $('.btn__label', submitBtn).textContent = 'Send Message';
      }, 700);
    });
  }
})();
