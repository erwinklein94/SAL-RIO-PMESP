/* ============================================================
   Universo Segurança Pública — Botão de tema claro/escuro
   Mantém o tema claro como padrão e salva a escolha do visitante.
   ============================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === DARK || stored === LIGHT ? stored : LIGHT;
    } catch (error) {
      return LIGHT;
    }
  }

  function updateThemeMeta(theme) {
    const color = theme === DARK ? '#071426' : '#ffffff';
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', color);

    let colorScheme = document.querySelector('meta[name="color-scheme"]');
    if (colorScheme) colorScheme.setAttribute('content', 'light dark');
  }

  function setTheme(theme, persist) {
    const normalized = theme === DARK ? DARK : LIGHT;
    root.setAttribute('data-theme', normalized);
    root.style.colorScheme = normalized;
    updateThemeMeta(normalized);

    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, normalized); } catch (error) { /* sem ação */ }
    }

    updateButtons(normalized);
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') === DARK ? DARK : LIGHT;
    setTheme(current === DARK ? LIGHT : DARK, true);
  }

  function createButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'usp-theme-toggle';
    button.setAttribute('data-usp-theme-toggle', 'true');
    button.setAttribute('aria-live', 'polite');
    return button;
  }

  function updateButtons(theme) {
    const isDark = theme === DARK;
    document.querySelectorAll('[data-usp-theme-toggle], [data-theme-toggle]').forEach((button) => {
      if (!(button instanceof HTMLElement)) return;
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
      button.setAttribute('title', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
      button.innerHTML = isDark
        ? '<span class="usp-theme-toggle__icon" aria-hidden="true">☀️</span><span class="usp-theme-toggle__text">Modo claro</span>'
        : '<span class="usp-theme-toggle__icon" aria-hidden="true">🌙</span><span class="usp-theme-toggle__text">Modo escuro</span>';
    });
  }

  function installButton() {
    if (document.querySelector('[data-usp-theme-toggle]')) return;

    const button = createButton();
    const headerSlot = document.querySelector('.usp-topline__inner, .usp-header__inner, .site-header .header-menu-tools, header .header-menu-tools, header .usp-container, header');

    if (headerSlot) {
      headerSlot.appendChild(button);
    } else {
      button.classList.add('usp-theme-toggle--floating');
      document.body.insertBefore(button, document.body.firstChild);
    }

    button.addEventListener('click', function (event) {
      event.preventDefault();
      toggleTheme();
    });

    updateButtons(root.getAttribute('data-theme') === DARK ? DARK : LIGHT);
  }

  // Aplica o tema antes de inserir o botão. Se outro script já definiu o tema,
  // respeitamos essa escolha; caso contrário, o padrão é claro.
  setTheme(root.getAttribute('data-theme') === DARK ? DARK : getStoredTheme(), false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installButton);
  } else {
    installButton();
  }

  window.uspSetTheme = function (theme) { setTheme(theme, true); };
  window.uspToggleTheme = toggleTheme;
})();
