/* ============================================================
   UniSegPub — Produtos laterais discretos nas abas de conteúdo
   Mostra cards resumidos da aba Produtos à esquerda e à direita
   do conteúdo principal em telas de computador, sem estreitar o miolo.
   ============================================================ */
(function () {
  'use strict';

  const PAGINAS_COM_VITRINE_LATERAL = new Set([
    'principal',
    'noticias',
    'guia',
    'remuneracao',
    'direitos',
    'poderes',
    'baselegal',
    'concursos',
    'comparar',
    'brasoes',
    'acoes',
    'associacoes',
    'parceiros'
  ]);

  const LARGURA_CENTRAL_POR_PAGINA = {
    principal: 1120,
    noticias: 1120,
    guia: 1120,
    poderes: 1120,
    baselegal: 1120,
    comparar: 1120,
    brasoes: 1120,
    parceiros: 800,
    remuneracao: 920,
    direitos: 800,
    concursos: 800,
    acoes: 800,
    associacoes: 800
  };

  const PRODUTOS_FALLBACK = [
    {
      titulo: 'Mochila Militar Tática Impermeável 50 L',
      href: 'https://s.shopee.com.br/901i8h9IK5',
      imagem: { src: 'img/SHOPEE/mochilaimpermeavel50l.webp', alt: 'Mochila Militar Tática Impermeável 50 L' }
    },
    {
      titulo: 'Mochila Coban Tática Militar 24 L',
      href: 'https://s.shopee.com.br/8V5RQXr16n',
      imagem: { src: 'img/SHOPEE/mochilacoban.webp', alt: 'Mochila Coban Tática Militar 24 L' }
    },
    {
      titulo: 'Barra fixa para porta',
      href: 'https://s.shopee.com.br/9fHIyi0uae',
      imagem: { src: 'img/SHOPEE/barrafixa02.webp', alt: 'Barra fixa para porta' }
    },
    {
      titulo: 'Bota Acero Couro Colt Padrão Polícia Militar SP',
      href: 'https://s.shopee.com.br/1qYSZj5bki',
      imagem: { src: 'img/SHOPEE/botaacero.webp', alt: 'Bota Acero Couro Colt Padrão Polícia Militar SP' }
    }
  ];

  function textoCurto(texto, limite) {
    const normalizado = String(texto || '').replace(/\s+/g, ' ').trim();
    if (normalizado.length <= limite) return normalizado;
    return `${normalizado.slice(0, limite - 1).trim()}…`;
  }

  function criarLink(classe, href, texto, externo) {
    const link = document.createElement('a');
    link.className = classe;
    link.href = href;
    link.textContent = texto;
    if (externo) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    return link;
  }

  function criarCardProduto(produto) {
    const card = document.createElement('article');
    card.className = 'usp-affiliate-card';

    const imagemWrap = document.createElement('a');
    imagemWrap.className = 'usp-affiliate-card__media';
    imagemWrap.href = produto.href;
    imagemWrap.target = '_blank';
    imagemWrap.rel = 'noopener noreferrer';
    imagemWrap.setAttribute('aria-label', `Ver na loja ${produto.titulo || 'produto'}`);

    const imagem = document.createElement('img');
    imagem.src = produto.imagem && produto.imagem.src ? produto.imagem.src : '';
    imagem.alt = produto.imagem && produto.imagem.alt ? produto.imagem.alt : produto.titulo || 'Produto';
    imagem.loading = 'lazy';
    imagem.decoding = 'async';
    imagem.addEventListener('error', function () {
      imagemWrap.classList.add('is-missing-image');
      imagem.remove();
    }, { once: true });
    imagemWrap.appendChild(imagem);
    card.appendChild(imagemWrap);

    const titulo = document.createElement('h3');
    titulo.textContent = textoCurto(produto.titulo, 58);
    card.appendChild(titulo);

    const aviso = document.createElement('small');
    aviso.className = 'usp-affiliate-card__note';
    aviso.textContent = 'Produto de programa de afiliado.';
    card.appendChild(aviso);

    card.appendChild(criarLink('usp-affiliate-card__store', produto.href, 'Ver na loja', true));
    card.appendChild(criarLink('usp-affiliate-card__more', 'produtos.html', 'Ver mais produtos', false));

    return card;
  }

  function criarRail(lado, produtos) {
    const rail = document.createElement('aside');
    rail.className = `usp-affiliate-rail usp-affiliate-rail--${lado}`;
    rail.setAttribute('aria-label', lado === 'left' ? 'Produtos sugeridos à esquerda' : 'Produtos sugeridos à direita');

    const inner = document.createElement('div');
    inner.className = 'usp-affiliate-rail__inner';

    const titulo = document.createElement('div');
    titulo.className = 'usp-affiliate-rail__title';
    titulo.textContent = 'Produtos';
    inner.appendChild(titulo);

    produtos.forEach(function (produto) {
      inner.appendChild(criarCardProduto(produto));
    });

    rail.appendChild(inner);
    return rail;
  }

  function coletarProdutos() {
    const base = window.UNISEGPUB_PRODUTOS || {};
    const grupos = [
      base.produtosFisicos,
      base.livrosEbooks,
      base.cursosGerais,
      base.cursosPmesp,
      base.cursosPcsp
    ];

    const produtos = grupos
      .filter(Array.isArray)
      .flat()
      .filter(function (produto) {
        return produto && produto.titulo && produto.href && produto.imagem && produto.imagem.src;
      });

    return produtos.length >= 4 ? produtos : PRODUTOS_FALLBACK;
  }

  function ajustarLarguraCentral(shell, pagina) {
    const maximo = LARGURA_CENTRAL_POR_PAGINA[pagina] || 1120;
    const larguraDisponivel = Math.max(0, window.innerWidth - 28);
    shell.style.setProperty('--usp-affiliate-main-width', `${Math.min(maximo, larguraDisponivel)}px`);
  }

  function iniciarProdutosLaterais() {
    const pagina = document.body && document.body.dataset ? document.body.dataset.page : '';
    if (!PAGINAS_COM_VITRINE_LATERAL.has(pagina)) return;
    if (pagina === 'produtos') return;
    if (document.querySelector('.usp-affiliate-side-shell')) return;

    const main = document.querySelector('main.page-section.active[role="main"]') || document.querySelector('main.page-section.active') || document.querySelector('main');
    if (!main || !main.parentNode) return;

    const produtos = coletarProdutos();
    const esquerda = [produtos[0], produtos[2]].filter(Boolean);
    const direita = [produtos[1], produtos[3]].filter(Boolean);
    if (!esquerda.length || !direita.length) return;

    const shell = document.createElement('div');
    shell.className = 'usp-affiliate-side-shell';
    shell.setAttribute('data-affiliate-products', 'true');

    main.parentNode.insertBefore(shell, main);
    shell.appendChild(criarRail('left', esquerda));
    shell.appendChild(main);
    shell.appendChild(criarRail('right', direita));

    ajustarLarguraCentral(shell, pagina);
    window.addEventListener('resize', function () {
      ajustarLarguraCentral(shell, pagina);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarProdutosLaterais, { once: true });
  } else {
    iniciarProdutosLaterais();
  }
})();
