/* ======================================================================
   DO ZERO À FARDA | PMERJ — script.js
   - Injeta os cards de conteúdo programático
   - Menu mobile
   - Ano do rodapé
   - Checkout (configure CHECKOUT_URL com seu link oficial)
   ====================================================================== */

// ⬇️ Defina aqui a URL oficial do seu checkout (Hotmart, Kiwify, Eduzz, etc.)
var CHECKOUT_URL = ''; // ex.: 'https://pay.hotmart.com/XXXXXXX'

(function () {
  'use strict';

  /* ---------- Conteúdo programático ---------- */
  var disciplinas = [
    { ic: '📘', nome: 'Língua Portuguesa' },
    { ic: '🧮', nome: 'Matemática Básica' },
    { ic: '🕊️', nome: 'Noções de Direitos Humanos' },
    { ic: '🏛️', nome: 'Noções de Direito Administrativo' },
    { ic: '📜', nome: 'Legislação Aplicada à PMERJ' },
    { ic: '⚖️', nome: 'Noções de Direito Penal' },
    { ic: '📑', nome: 'Noções de Direito Processual Penal' },
    { ic: '✍️', nome: 'Redação' },
    { ic: '📝', nome: 'Simulados Preparatórios' },
    { ic: '🗂️', nome: 'Provas Anteriores da PMERJ' },
    { ic: '✅', nome: 'Questões Comentadas' },
    { ic: '🔁', nome: 'Revisões e Resumos das Matérias' }
  ];

  var grid = document.getElementById('conteudo-grid');
  if (grid) {
    var html = '';
    disciplinas.forEach(function (d) {
      html += '<article class="conteudo-card">' +
        '<span class="cc-ic" aria-hidden="true">' + d.ic + '</span>' +
        '<h3>' + d.nome + '</h3>' +
        '<span class="cc-arrow" aria-hidden="true">›</span>' +
        '</article>';
    });
    grid.innerHTML = html;
  }

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header com sombra ao rolar ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ---------- Ano do rodapé ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Checkout ---------- */
  document.querySelectorAll('[data-checkout]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (CHECKOUT_URL) {
        // deixa o link seguir se já estiver configurado
        if (btn.getAttribute('href') === '#') { e.preventDefault(); window.open(CHECKOUT_URL, '_blank'); }
      } else {
        e.preventDefault();
        alert('Checkout ainda não configurado.\n\nAbra o arquivo script.js e defina CHECKOUT_URL com o link oficial do seu checkout (Hotmart, Kiwify, Eduzz, etc.).');
      }
    });
  });

  /* ---------- Reveal ao rolar ---------- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section, .hero-copy, .salary-card, .plan, .dep-card, .bonus-card').forEach(function (el) {
      el.classList.add('reveal'); io.observe(el);
    });
  }
})();
