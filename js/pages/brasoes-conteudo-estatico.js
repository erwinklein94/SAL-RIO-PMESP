/* Brasões e Histórias — filtro e paginação visual sobre conteúdo já escrito no HTML. */
(function () {
  const CARDS_POR_PAGINA = 4;

  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) { return Array.from((root || document).querySelectorAll(selector)); }
  function normalizar(valor) { return String(valor || '').trim().toLowerCase(); }

  function cards() {
    return qsa('[data-brasoes-card][data-inst]');
  }

  function detalhe() {
    return qs('#consulta-brasoes-detalhado');
  }

  function resultado() {
    return qs('#brasoes_historia_resultado');
  }

  function esconderDetalhe() {
    const bloco = detalhe();
    if (bloco) bloco.hidden = true;
  }

  function mostrarDetalhe() {
    const bloco = detalhe();
    if (bloco) bloco.hidden = false;
  }

  function atualizarOpcoesInstituicao(seletorEsfera, seletorInstituicao) {
    const esfera = normalizar(seletorEsfera?.value);
    Array.from(seletorInstituicao?.options || []).forEach(option => {
      if (!option.value) {
        option.hidden = false;
        return;
      }
      option.hidden = Boolean(esfera) && option.dataset.esfera !== esfera;
    });

    const atual = seletorInstituicao?.selectedOptions?.[0];
    if (atual && atual.hidden) seletorInstituicao.value = '';
  }

  function cardsFiltrados(seletorEsfera, seletorInstituicao) {
    const esfera = normalizar(seletorEsfera?.value);
    const inst = normalizar(seletorInstituicao?.value);
    return cards().filter(card => {
      if (esfera && card.dataset.esfera !== esfera) return false;
      if (inst && card.dataset.inst !== inst) return false;
      return true;
    });
  }

  function renderizarPaginacao(paginacao, paginaAtual, totalPaginas) {
    if (!paginacao) return;
    if (totalPaginas <= 1) {
      paginacao.hidden = true;
      paginacao.innerHTML = '';
      return;
    }

    paginacao.hidden = false;
    const botoes = [];
    botoes.push(`<button type="button" data-brasoes-page="prev" ${paginaAtual === 1 ? 'disabled' : ''}>Anterior</button>`);
    for (let i = 1; i <= totalPaginas; i += 1) {
      botoes.push(`<button type="button" data-brasoes-page="${i}" ${i === paginaAtual ? 'aria-current="page"' : ''}>${i}</button>`);
    }
    botoes.push(`<button type="button" data-brasoes-page="next" ${paginaAtual === totalPaginas ? 'disabled' : ''}>Próxima</button>`);
    paginacao.innerHTML = botoes.join('');
  }

  function cssEscape(valor) {
    return (window.CSS && typeof window.CSS.escape === 'function') ? CSS.escape(valor) : String(valor).replace(/[^a-zA-Z0-9_-]/g, '\$&');
  }

  function cardDaInstituicao(inst) {
    return qs(`[data-brasoes-card][data-inst="${cssEscape(inst)}"]`);
  }

  function atualizarTituloDetalhe(inst) {
    const card = cardDaInstituicao(inst);
    const titulo = card?.querySelector('.brasoes-card-kicker')?.textContent?.split('•')?.[1]?.split('·')?.[0]?.trim() || inst.toUpperCase();
    const span = qs('#txt-inst-brasoes');
    if (span) span.textContent = titulo;
  }

  function selecionarInstituicao(inst, rolar) {
    const cont = resultado();
    if (!inst) {
      esconderDetalhe();
      if (cont) cont.innerHTML = '';
      return;
    }

    mostrarDetalhe();
    atualizarTituloDetalhe(inst);
      try {
      if (typeof mudarInstituicao === 'function') mudarInstituicao(inst);
    } catch (erro) {
      console.warn('Falha ao atualizar cabeçalho institucional em Brasões:', erro);
    }

    try {
      if (typeof renderizarBrasoesHistoria === 'function') renderizarBrasoesHistoria();
    } catch (erro) {
      console.warn('Falha ao carregar brasão e história:', erro);
    }

    atualizarTituloDetalhe(inst);

    if (rolar) {
      const destino = detalhe();
      if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const seletorEsfera = qs('#brasoes-filtro-esfera');
    const seletorInstituicao = qs('#brasoes-filtro-instituicao');
    const paginacao = qs('#brasoes-paginacao');
    const contador = qs('#brasoes-contador-cards');
    const btnLimpar = qs('[data-brasoes-limpar]');
    let paginaAtual = 1;

    if (!seletorEsfera || !seletorInstituicao || !paginacao) return;

    function renderizar() {
      atualizarOpcoesInstituicao(seletorEsfera, seletorInstituicao);
      const filtrados = cardsFiltrados(seletorEsfera, seletorInstituicao);
      const totalPaginas = Math.max(1, Math.ceil(filtrados.length / CARDS_POR_PAGINA));
      if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
      if (paginaAtual < 1) paginaAtual = 1;

      const inicio = (paginaAtual - 1) * CARDS_POR_PAGINA;
      const fim = inicio + CARDS_POR_PAGINA;
      const visiveis = new Set(filtrados.slice(inicio, fim));

      cards().forEach(card => {
        card.hidden = !visiveis.has(card);
      });

      if (contador) {
        const texto = seletorInstituicao.value ? 'instituição selecionada' : 'instituições encontradas';
        contador.textContent = `${filtrados.length} ${texto}`;
      }

      renderizarPaginacao(paginacao, paginaAtual, totalPaginas);
    }

    seletorEsfera.addEventListener('change', () => {
      paginaAtual = 1;
      renderizar();
      if (!seletorInstituicao.value) selecionarInstituicao('', false);
    });

    seletorInstituicao.addEventListener('change', () => {
      paginaAtual = 1;
      renderizar();
      selecionarInstituicao(seletorInstituicao.value, !!seletorInstituicao.value);
    });

    if (btnLimpar) {
      btnLimpar.addEventListener('click', () => {
        seletorEsfera.value = '';
        seletorInstituicao.value = '';
        paginaAtual = 1;
        renderizar();
        selecionarInstituicao('', false);
        if (typeof aplicarHeaderInicialPortal === 'function') aplicarHeaderInicialPortal();
      });
    }

    paginacao.addEventListener('click', event => {
      const botao = event.target.closest('[data-brasoes-page]');
      if (!botao || botao.disabled) return;
      const destino = botao.dataset.brasoesPage;
      const totalPaginas = Math.max(1, Math.ceil(cardsFiltrados(seletorEsfera, seletorInstituicao).length / CARDS_POR_PAGINA));

      if (destino === 'prev') paginaAtual -= 1;
      else if (destino === 'next') paginaAtual += 1;
      else paginaAtual = Number(destino) || 1;

      if (paginaAtual < 1) paginaAtual = 1;
      if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
      renderizar();
      const lista = qs('#brasoes-conteudo-lista');
      if (lista) lista.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    function instInicialDaUrl() {
      try {
        const params = new URLSearchParams(window.location.search || '');
        const instParam = normalizar(params.get('inst') || params.get('instituicao'));
        if (instParam && cardDaInstituicao(instParam)) return instParam;
      } catch (erro) { /* silencioso */ }
      const hash = String(window.location.hash || '').replace(/^#/, '');
      if (!hash) return '';
      const alvo = document.getElementById(hash);
      return normalizar(alvo?.dataset?.inst || '');
    }

    function aplicarInstInicialDaUrl() {
      const inst = instInicialDaUrl();
      if (!inst) return false;
      const card = cardDaInstituicao(inst);
      if (!card) return false;
      seletorEsfera.value = card.dataset.esfera || '';
      seletorInstituicao.value = inst;
      paginaAtual = 1;
      renderizar();
      selecionarInstituicao(inst, false);
      window.setTimeout(() => (document.getElementById(window.location.hash.replace(/^#/, '')) || card).scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
      return true;
    }

    document.addEventListener('click', event => {
      const botao = event.target.closest('[data-brasoes-load]');
      if (!botao) return;
      const inst = botao.dataset.brasoesLoad;
      if (!inst) return;
      event.preventDefault();

      const card = cardDaInstituicao(inst);
      if (card) seletorEsfera.value = card.dataset.esfera || '';
      seletorInstituicao.value = inst;
      paginaAtual = 1;
      renderizar();
      selecionarInstituicao(inst, true);
    });

    esconderDetalhe();
    if (!aplicarInstInicialDaUrl()) renderizar();
  });
})();
