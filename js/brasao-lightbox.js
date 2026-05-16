/*
  Lightbox global simples e robusto para brasões e logoleão.
  Corrige o comportamento anterior em que o clique podia disparar carregamento/navegação
  em vez de abrir a imagem ampliada na própria página.
*/
(function () {
  'use strict';

  var LIGHTBOX_ID = 'usp-media-lightbox';
  var STYLE_ID = 'usp-media-lightbox-style';
  var IMG_SELECTOR = [
    '.usp-brand img',
    '.usp-brand__mark img',
    'img.usp-brand__logo',
    '#header-active-flag',
    '.current-flag-frame img',
    '.brand-logo-frame img',
    '.brasoes-card-imgbox img',
    '.brasoes-imagem-wrap img',
    '.brasoes-imagem img',
    'img.brasoes-imagem',
    'img.guia-artigo-brasao',
    'img.noticias-brasao',
    '.usp-noticia-card__brasao',
    '.usp-footer img',
    'img[src*="logoleao"]',
    'img[src*="/LOGO/"]',
    'img[src*="img/LOGO/"]',
    'img[src*="/FEDERAL/"]',
    'img[src*="img/FEDERAL/"]',
    'img[src*="/MILITAR/"]',
    'img[src*="img/MILITAR/"]',
    'img[src*="/CIVIL/"]',
    'img[src*="img/CIVIL/"]',
    'img[src*="/BOMBEIRO/"]',
    'img[src*="img/BOMBEIRO/"]',
    'img[src*="/PENAL/"]',
    'img[src*="img/PENAL/"]'
  ].join(',');

  var lastFocus = null;

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      'body.usp-media-lightbox-open{overflow:hidden!important;}',
      IMG_SELECTOR + '{cursor:zoom-in!important;}',
      '.usp-media-lightbox{position:fixed;inset:0;z-index:2147483646;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(2,8,18,.88);backdrop-filter:blur(8px);}',
      '.usp-media-lightbox.is-open{display:flex!important;}',
      '.usp-media-lightbox__panel{position:relative;width:auto;max-width:min(94vw,980px);max-height:92vh;display:flex;flex-direction:column;align-items:center;gap:12px;padding:18px;border:1px solid rgba(216,184,58,.45);border-radius:18px;background:#08111d;box-shadow:0 30px 90px rgba(0,0,0,.5);}',
      '.usp-media-lightbox__close{position:absolute;right:12px;top:12px;z-index:2;width:42px;height:42px;border:1px solid rgba(216,184,58,.5);border-radius:999px;background:#fff;color:#07101d;font:800 28px/1 Arial,sans-serif;cursor:pointer;}',
      '.usp-media-lightbox__close:hover,.usp-media-lightbox__close:focus-visible{outline:none;box-shadow:0 0 0 4px rgba(216,184,58,.22);}',
      '.usp-media-lightbox__frame{max-width:min(88vw,860px);max-height:76vh;margin-top:42px;display:flex;align-items:center;justify-content:center;padding:18px;border-radius:16px;background:#f8fafc;border:1px solid rgba(226,232,240,.95);overflow:hidden;}',
      '.usp-media-lightbox__img{display:block;width:auto!important;height:auto!important;max-width:min(82vw,780px)!important;max-height:70vh!important;object-fit:contain!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;}',
      '.usp-media-lightbox__caption{max-width:min(82vw,780px);margin:0;color:rgba(255,255,255,.84);text-align:center;font:500 13px/1.5 Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}',
      '@media(max-width:640px){.usp-media-lightbox{padding:10px}.usp-media-lightbox__panel{width:100%;max-width:calc(100vw - 20px);padding:12px;border-radius:14px}.usp-media-lightbox__frame{max-width:calc(100vw - 44px);max-height:72vh;padding:12px}.usp-media-lightbox__img{max-width:calc(100vw - 68px)!important;max-height:64vh!important}}'
    ].join('\n');

    document.head.appendChild(style);
  }

  function closestElement(target, selector) {
    if (!target) return null;
    var element = target.nodeType === 1 ? target : target.parentElement;
    if (!element || !element.closest) return null;
    return element.closest(selector);
  }

  function isValidImage(img) {
    if (!img || !img.matches || !img.matches(IMG_SELECTOR)) return false;
    if (img.closest && img.closest('.usp-media-lightbox')) return false;
    var src = img.currentSrc || img.getAttribute('src') || img.src;
    if (!src) return false;
    return true;
  }

  function findImage(target) {
    var img = closestElement(target, 'img');
    return isValidImage(img) ? img : null;
  }

  function absoluteSrc(src) {
    try {
      return new URL(src, document.baseURI).href;
    } catch (error) {
      return src;
    }
  }

  function getLabel(img) {
    var text = (img.getAttribute('alt') || img.getAttribute('title') || '').trim();
    if (!text) text = 'Imagem institucional ampliada';
    return text.replace(/\s+/g, ' ');
  }

  function buildLightbox() {
    var lightbox = document.getElementById(LIGHTBOX_ID);
    if (lightbox) return lightbox;

    lightbox = document.createElement('div');
    lightbox.id = LIGHTBOX_ID;
    lightbox.className = 'usp-media-lightbox';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Imagem ampliada');
    lightbox.innerHTML = [
      '<div class="usp-media-lightbox__panel" role="document">',
      '  <button class="usp-media-lightbox__close" type="button" aria-label="Fechar imagem ampliada">×</button>',
      '  <div class="usp-media-lightbox__frame">',
      '    <img class="usp-media-lightbox__img" alt="Imagem ampliada">',
      '  </div>',
      '  <p class="usp-media-lightbox__caption">Clique fora da imagem, aperte ESC ou use o botão × para fechar.</p>',
      '</div>'
    ].join('');

    lightbox.addEventListener('click', function (event) {
      var clickedPanel = closestElement(event.target, '.usp-media-lightbox__panel');
      var clickedClose = closestElement(event.target, '.usp-media-lightbox__close');
      if (clickedClose || !clickedPanel) {
        event.preventDefault();
        closeLightbox();
      }
    });

    document.body.appendChild(lightbox);
    return lightbox;
  }

  function openLightbox(img) {
    var rawSrc = img.currentSrc || img.getAttribute('src') || img.src;
    if (!rawSrc) return;

    var lightbox = buildLightbox();
    var preview = lightbox.querySelector('.usp-media-lightbox__img');
    var caption = lightbox.querySelector('.usp-media-lightbox__caption');
    var close = lightbox.querySelector('.usp-media-lightbox__close');
    var label = getLabel(img);

    lastFocus = document.activeElement;

    preview.removeAttribute('src');
    preview.alt = label;
    if (caption) caption.textContent = label + ' — clique fora da imagem, aperte ESC ou use o botão × para fechar.';

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('usp-media-lightbox-open');

    preview.src = absoluteSrc(rawSrc);

    if (close && close.focus) close.focus({ preventScroll: true });
  }

  function closeLightbox() {
    var lightbox = document.getElementById(LIGHTBOX_ID);
    if (!lightbox) return;

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('usp-media-lightbox-open');

    var img = lightbox.querySelector('.usp-media-lightbox__img');
    if (img) img.removeAttribute('src');

    if (lastFocus && typeof lastFocus.focus === 'function') {
      try { lastFocus.focus({ preventScroll: true }); } catch (error) { lastFocus.focus(); }
    }
    lastFocus = null;
  }

  function markImages(root) {
    var scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll(IMG_SELECTOR).forEach(function (img) {
      if (!isValidImage(img)) return;
      img.classList.add('usp-image-clickable');
      if (!img.hasAttribute('tabindex')) img.setAttribute('tabindex', '0');
      if (!img.hasAttribute('role')) img.setAttribute('role', 'button');
      img.setAttribute('title', 'Clique para ampliar a imagem');
    });
  }

  function handleOpenEvent(event) {
    var img = findImage(event.target);
    if (!img) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    openLightbox(img);
  }

  function init() {
    injectStyle();
    buildLightbox();
    markImages(document);

    document.addEventListener('click', handleOpenEvent, true);
    document.addEventListener('auxclick', handleOpenEvent, true);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeLightbox();
        return;
      }

      if (event.key !== 'Enter' && event.key !== ' ') return;
      var img = findImage(event.target);
      if (!img) return;
      event.preventDefault();
      openLightbox(img);
    }, true);

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) markImages(node);
        });
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
