(function () {
  'use strict';

  var EMAIL = 'jesu' + 'serl@g' + 'mail.com';
  var I18N = {};
  var PROFILE = null;
  var captchaMode = { value: 'cv' };
  var isVerified = false;

  var captchaModal = document.getElementById('captchaModal');
  var rcBox = document.getElementById('rc-box');

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
          '<span style="color:var(--accent); font-size:18px; font-weight:bold;">+</span>' +
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
      return '<div class="job-item" style="padding:20px;">' +
        '<span style="font-size:30px;">' + hobby.icon + '</span>' +
        '<h4 style="margin-top:10px; color:var(--text-main);">' + esc(txt(hobby.title, lang)) + '</h4>' +
        '<p style="font-size:12px; color:var(--text-dim); margin-top:5px;">' + esc(txt(hobby.description, lang)) + '</p>' +
      '</div>';
    }).join('');
  }

  /* ---------- CAPTCHA ---------- */
  window.openCaptcha = function (mode) {
    captchaMode.value = mode || 'cv';
    captchaModal.classList.add('active');
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

  /* ---------- CARGA DE DATOS ---------- */
  function loadData() {
    Promise.all([
      fetch('assets/js/i18n.en.json').then(function (r) { return r.json(); }),
      fetch('assets/data/profile.json').then(function (r) { return r.json(); })
    ]).then(function (results) {
      I18N = results[0];
      PROFILE = results[1];
      applyI18n();
      renderExperience();
      renderEducation();
      renderHobbies();
    }).catch(function () {
      applyI18n();
    });
  }

  initReveal();
  loadData();
})();