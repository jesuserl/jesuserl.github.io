(function () {
  'use strict';

  var EMAIL = 'jesu' + 'serl@g' + 'mail.com';
  var I18N = {};
  var PROFILE = null;
  var captchaMode = { value: 'cv' };
  var isVerified = false;

  var captchaModal = document.getElementById('captchaModal');
  var rcBox = document.getElementById('rc-box');

  var themeBtnEl = document.getElementById('themeBtn');
  if (themeBtnEl) themeBtnEl.textContent = document.body.dataset.theme === 'dark' ? '☀️' : '🌙';

  function currentLang() {
    return document.body.lang;
  }

  function txt(value, lang) {
    if (value && typeof value === 'object') {
      return value[lang] || Object.keys(value).map(function (k) { return value[k]; })[0] || '';
    }
    return value || '';
  }

  function esc(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  var ES_TEXT = {
    'captcha.descMail': 'Por favor, confirma que eres humano para revelar el correo.'
  };

  function i18nText(key) {
    if (currentLang() === 'en') return I18N[key] || '';
    if (ES_TEXT[key]) return ES_TEXT[key];
    var el = document.querySelector('[data-i18n="' + key + '"]');
    if (el && el.dataset.es !== undefined) return el.dataset.es;
    return el ? el.textContent : '';
  }

  /* ---------- VISTAS ---------- */
  window.switchView = function (view, btn) {
    document.querySelectorAll('.view-content').forEach(function (v) {
      v.style.display = 'none';
    });
    document.querySelectorAll('.tab').forEach(function (t) {
      t.classList.remove('active');
    });
    document.getElementById('view-' + view).style.display = 'block';

    document.querySelectorAll('.tab').forEach(function (t) {
      if (
        t.innerHTML === btn.innerHTML ||
        (t.textContent.indexOf('💼') !== -1 && view === 'pro') ||
        (t.textContent.indexOf('👤') !== -1 && view === 'personal')
      ) {
        t.classList.add('active');
      }
    });
  };

  /* ---------- TEMA ---------- */
  window.toggleTheme = function () {
    var isDark = document.body.dataset.theme === 'dark';
    var next = isDark ? 'light' : 'dark';
    document.body.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* noop */ }
    document.getElementById('themeBtn').textContent = next === 'dark' ? '☀️' : '🌙';
  };

  /* ---------- IDIOMA ---------- */
  function applyI18n() {
    var lang = currentLang();
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (el.dataset.es === undefined) {
        el.dataset.es = el.textContent;
      }
      if (lang === 'en') {
        var t = I18N[el.dataset.i18n];
        if (t) {
          el.textContent = t;
        }
      } else {
        el.textContent = el.dataset.es;
      }
    });

    var cd = document.querySelector('.captcha-modal p[data-i18n="captcha.desc"]');
    if (cd) cd.textContent = i18nText(captchaMode.value === 'email' ? 'captcha.descMail' : 'captcha.desc');
  }

  window.toggleLang = function () {
    var lang = document.body.lang === 'es' ? 'en' : 'es';
    document.body.lang = lang;
    document.getElementById('langBtn').textContent = lang.toUpperCase();
    applyI18n();
    if (PROFILE) {
      renderExperience();
      renderEducation();
      renderHobbies();
    }
    clearTimeout(typingId);
    runTyping();
  };

  /* ---------- CORREO ---------- */
  window.copyEmail = function () {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(EMAIL);
    }
    document.querySelectorAll('.email-text').forEach(function (node) {
      node.textContent = currentLang() === 'es' ? '¡Correo copiado!' : 'Email copied!';
      setTimeout(function () { node.textContent = 'Gmail'; }, 2000);
    });
  };

  window.revealEmail = function () {
    document.querySelectorAll('.email-text').forEach(function (node) {
      node.textContent = EMAIL;
      setTimeout(function () { window.copyEmail(); }, 1200);
    });
  };

  /* ---------- PROGRESO DE LECTURA ---------- */
  window.addEventListener('scroll', function () {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
  });

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.content-block').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---------- RENDER DATA-DRIVEN ---------- */
  function renderExperience() {
    var list = document.getElementById('experience-list');
    if (!PROFILE || !list) return;
    var lang = currentLang();
    list.innerHTML = PROFILE.experience.map(function (job) {
      var role = txt(job.role, lang);
      var org = job.organization ? ' // ' + txt(job.organization, lang) : '';
      return '<details class="job-item"' + (job.open ? ' open' : '') + '>' +
        '<summary class="job-summary">' +
          '<div class="job-header">' +
            '<span class="job-date">' + esc(txt(job.dates, lang)) + '</span>' +
            '<span class="job-title">' + esc(role) + esc(org) + '</span>' +
          '</div>' +
          '<span class="job-toggle">+</span>' +
        '</summary>' +
        '<div class="job-body">' + txt(job.description, lang) + '</div>' +
      '</details>';
    }).join('');
  }

  function renderEducation() {
    var list = document.getElementById('education-list');
    if (!PROFILE || !list) return;
    var lang = currentLang();
    list.innerHTML = PROFILE.education.map(function (item) {
      var title = txt(item.title, lang);
      var org = item.organization ? ' // ' + txt(item.organization, lang) : '';
      return '<div class="job-item" style="padding:1.2rem 1.5rem;">' +
        '<div class="job-header">' +
          '<span class="job-date">' + esc(txt(item.dates, lang)) + '</span>' +
          '<span class="job-title">' + esc(title) + esc(org) + '</span>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function renderHobbies() {
    var grid = document.getElementById('hobbies-grid');
    if (!PROFILE || !grid) return;
    var lang = currentLang();
    grid.innerHTML = PROFILE.hobbies.map(function (hobby) {
      return '<div class="job-item hobby-card" style="padding:20px;">' +
        '<span class="hobby-icon" style="font-size:30px; display:inline-block;">' + hobby.icon + '</span>' +
        '<h4 style="margin-top:10px; color:var(--text-main);">' + esc(txt(hobby.title, lang)) + '</h4>' +
        '<p style="font-size:12px; color:var(--text-dim); margin-top:5px;">' + esc(txt(hobby.description, lang)) + '</p>' +
      '</div>';
    }).join('');
  }

  /* ---------- CAPTCHA ---------- */
  window.openCaptcha = function (mode) {
    captchaMode.value = mode || 'cv';
    captchaModal.classList.add('active');
    var cd = document.querySelector('.captcha-modal p[data-i18n="captcha.desc"]');
    if (cd) cd.textContent = i18nText(captchaMode.value === 'email' ? 'captcha.descMail' : 'captcha.desc');
  };

  window.closeCaptcha = function () {
    captchaModal.classList.remove('active');
    setTimeout(function () {
      rcBox.classList.remove('loading', 'checked');
      isVerified = false;
    }, 300);
  };

  window.verifyCaptcha = function () {
    if (isVerified) return;
    isVerified = true;
    rcBox.classList.add('loading');
    setTimeout(function () {
      rcBox.classList.remove('loading');
      rcBox.classList.add('checked');
      setTimeout(function () {
        if (captchaMode.value === 'email') {
          window.revealEmail();
        } else {
          window.downloadFile();
        }
        window.closeCaptcha();
      }, 700);
    }, 1200);
  };

  window.downloadFile = function () {
    var a = document.createElement('a');
    a.href = 'Resumen Curricular - Ing. Jesus Rojas -V4.pdf';
    a.download = 'Resumen Curricular - Ing. Jesus Rojas -V4.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  /* ---------- NAV COMPACT + FAB ---------- */
  var topNav = document.getElementById('topNav');
  var fabTop = document.getElementById('fabTop');
  function onScrollUI() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (topNav) topNav.classList.toggle('compact', y > 40);
    if (fabTop) fabTop.classList.toggle('show', y > 500);
  }
  window.addEventListener('scroll', onScrollUI, { passive: true });
  onScrollUI();

  /* ---------- TYPING HERO ---------- */
  var typingId = null;
  function typeRoles() {
    var lang = currentLang();
    var roles = (PROFILE && PROFILE.hero && PROFILE.hero.roles) ? PROFILE.hero.roles : [];
    var arr = roles.map(function (r) { return txt(r, lang); });
    return arr.length ? arr : ['IT Infrastructure'];
  }
  function runTyping() {
    var el = document.getElementById('typeText');
    if (!el) return;
    clearTimeout(typingId);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = typeRoles()[0];
      return;
    }
    var list = typeRoles();
    var i = 0, ch = 0, deleting = false;
    function tick() {
      ch += deleting ? -1 : 1;
      el.textContent = list[i].slice(0, ch);
      if (!deleting && ch === list[i].length) {
        deleting = true;
        typingId = setTimeout(tick, 1800);
      } else if (deleting && ch === 0) {
        deleting = false;
        i = (i + 1) % list.length;
        typingId = setTimeout(tick, 350);
      } else {
        typingId = setTimeout(tick, deleting ? 28 : 55);
      }
    }
    tick();
  }

  /* ---------- STATS COUNT-UP ---------- */
  function initStats() {
    var band = document.getElementById('stats');
    if (!band) return;
    var firstGroup = document.querySelector('.marquee-track .marquee-group');
    var counts = {
      tech: firstGroup ? firstGroup.children.length : 13,
      companies: PROFILE ? PROFILE.experience.length : 10,
      certs: PROFILE && PROFILE.education ? PROFILE.education.length : 3
    };
    Object.keys(counts).forEach(function (key) {
      var el = document.getElementById('stat-' + key);
      if (el) el.textContent = counts[key];
    });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        Object.keys(counts).forEach(function (key) {
          var el = document.getElementById('stat-' + key);
          if (!el) return;
          var target = counts[key];
          var run = 0;
          var step = Math.max(1, Math.ceil(target / 26));
          var timer = setInterval(function () {
            run += step;
            if (run >= target) { run = target; clearInterval(timer); }
            el.textContent = run;
          }, 26);
        });
      });
    }, { threshold: 0.35 });
    io.observe(band);
  }

  /* ---------- TILT EN HOBBIES ---------- */
  function initTilt() {
    var grid = document.getElementById('hobbies-grid');
    if (!grid) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    grid.addEventListener('mousemove', function (e) {
      var card = e.target.closest ? e.target.closest('.hobby-card') : null;
      if (!card) return;
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'perspective(700px) rotateY(' + (px * 9).toFixed(2) + 'deg) rotateX(' + (-py * 9).toFixed(2) + 'deg)';
    });
    grid.addEventListener('mouseleave', function (e) {
      var card = e.target.closest ? e.target.closest('.hobby-card') : null;
      if (card) card.style.transform = '';
    });
  }

  /* ---------- CARGA DE DATOS ---------- */
  function loadData() {
    I18N = window.I18N_DATA || {};
    PROFILE = window.PROFILE_DATA || null;
    if (!PROFILE) return;
    applyI18n();
    renderExperience();
    renderEducation();
    renderHobbies();
    runTyping();
    initStats();
  }

  initReveal();
  initTilt();
  loadData();
})();