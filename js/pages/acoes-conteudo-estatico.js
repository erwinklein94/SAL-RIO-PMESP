/* Ações judiciais — filtro e paginação visual sobre conteúdo já escrito no HTML. */
(function () {
  const CARDS_POR_PAGINA = 4;

  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) { return Array.from((root || document).querySelectorAll(selector)); }
  function normalizar(valor) { return String(valor || '').trim().toLowerCase(); }

  function cards() {
    return qsa('[data-acoes-card][data-inst]');
  }

  function detalhe() {
    return qs('#consulta-acoes-detalhado');
  }

  function esconderDetalhe() {
    const bloco = detalhe();
    if (bloco) bloco.hidden = true;
  }

  function mostrarDetalhe() {
    const bloco = detalhe();
    if (bloco) bloco.hidden = false;
  }

  function textoSeguro(valor) {
    const texto = String(valor == null ? '' : valor);
    if (typeof escapeHtml === 'function') return escapeHtml(texto);
    return texto.replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function escapeCss(valor) {
    if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(valor);
    return String(valor || '').replace(/[^a-zA-Z0-9_-]/g, '\\$&');
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


  function garantirOpcaoPcdfNoSeletor(seletorInstituicao) {
    if (!seletorInstituicao) return;
    const jaExiste = Array.from(seletorInstituicao.options || []).some(option => option.value === 'pcdf');
    if (jaExiste) return;

    const option = document.createElement('option');
    option.value = 'pcdf';
    option.dataset.esfera = 'estadual';
    option.textContent = 'PCDF — Polícia Civil do Distrito Federal';

    let grupoDistritoFederal = Array.from(seletorInstituicao.querySelectorAll('optgroup')).find(grupo => /distrito federal|\bdf\b/i.test(grupo.label || ''));
    if (!grupoDistritoFederal) {
      grupoDistritoFederal = document.createElement('optgroup');
      grupoDistritoFederal.label = 'Distrito Federal (DF)';
      const grupos = Array.from(seletorInstituicao.children || []).filter(el => el.tagName && el.tagName.toLowerCase() === 'optgroup');
      const grupoAcre = grupos.find(grupo => /acre/i.test(grupo.label || ''));
      const referencia = grupoAcre || grupos.find(grupo => !/união|uniao/i.test(grupo.label || '')) || null;
      seletorInstituicao.insertBefore(grupoDistritoFederal, referencia);
    }
    grupoDistritoFederal.appendChild(option);
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
    botoes.push(`<button type="button" data-acoes-page="prev" ${paginaAtual === 1 ? 'disabled' : ''}>Anterior</button>`);
    for (let i = 1; i <= totalPaginas; i += 1) {
      botoes.push(`<button type="button" data-acoes-page="${i}" ${i === paginaAtual ? 'aria-current="page"' : ''}>${i}</button>`);
    }
    botoes.push(`<button type="button" data-acoes-page="next" ${paginaAtual === totalPaginas ? 'disabled' : ''}>Próxima</button>`);
    paginacao.innerHTML = botoes.join('');
  }

  function atualizarTextoDetalhe(inst) {
    const card = qs(`[data-acoes-card][data-inst="${escapeCss(inst)}"]`);
    const titulo = card?.querySelector('.acoes-card-kicker')?.textContent || '';
    const sigla = (titulo.split('•')[1] || '').split('·')[0]?.trim() || String(inst || '').toUpperCase();
    const span = qs('#txt-inst-acoes');
    if (span) span.textContent = sigla;
  }


  function classeTipoAcaoFallback(tipo) {
    const normalizado = String(tipo || '').toLowerCase();
    if (normalizado.includes('coletiva') && !normalizado.includes('individual')) return 'coletiva';
    if (normalizado.includes('híbrida') || normalizado.includes('hibrida') || normalizado.includes('individual/coletivo')) return 'coletiva';
    return 'individual';
  }

  function textoTipoAcaoFallback(tipo) {
    const normalizado = String(tipo || '').toLowerCase();
    if (normalizado.includes('híbrida') || normalizado.includes('hibrida') || normalizado.includes('individual/coletivo')) return '⚖👤 Ação Híbrida';
    if (normalizado.includes('coletiva') && !normalizado.includes('individual')) return '⚖ Ação Coletiva';
    return '👤 Ação Individual';
  }

  function acaoFallbackHtml(inst) {
    if (typeof ACOES_JUDICIAIS === 'undefined' || !ACOES_JUDICIAIS[inst]) return '';
    const lista = ACOES_JUDICIAIS[inst] || [];
    return lista.map(a => `
      <div class="direito-item acao">
        <span class="direito-nome">${textoSeguro(a.titulo || 'Tema jurídico em conferência')}</span>
        <span class="direito-status" style="color: var(--vermelho);">${textoSeguro(a.status || 'Conferência individual')}</span>
        <div>
          <span class="badge-info ${classeTipoAcaoFallback(a.tipo)}">${textoTipoAcaoFallback(a.tipo)}</span>
          <span class="badge-info ativa">${textoSeguro(a.ano || 'Caso a caso')}</span>
        </div>
        <span class="direito-desc">${textoSeguro(a.desc || 'Tema dependente de documentos individuais e conferência jurídica.')}</span>
        <span class="direito-desc"><strong>Fundamento jurídico/jurisprudência:</strong> ${textoSeguro(a.base || 'Conferir legislação, atos oficiais e documentos funcionais.')}</span>
        <span class="direito-desc"><strong>Fonte de conferência:</strong> ${textoSeguro(a.fonte || 'Fonte em conferência')}</span>
        ${a.atualizado ? `<span class="direito-desc"><strong>Última atualização:</strong> ${textoSeguro(a.atualizado)}</span>` : ''}
      </div>
    `).join('');
  }

  function selecionarInstituicao(inst, rolar) {
    const listaDetalhe = qs('#lista-acoes');
    if (!inst) {
      esconderDetalhe();
      if (listaDetalhe) listaDetalhe.innerHTML = '';
      return;
    }

    mostrarDetalhe();
    atualizarTextoDetalhe(inst);

    try {
      if (typeof mudarInstituicao === 'function') mudarInstituicao(inst);
    } catch (erro) {
      console.warn('Falha ao atualizar cabeçalho institucional em Ações:', erro);
    }

    try {
      if (typeof carregarAcoes === 'function') carregarAcoes();
    } catch (erro) {
      console.warn('Falha ao carregar ações judiciais detalhadas:', erro);
    }

    atualizarTextoDetalhe(inst);

    if (listaDetalhe && !listaDetalhe.textContent.trim()) {
      listaDetalhe.innerHTML = acaoFallbackHtml(inst);
    }

    if (rolar) {
      const destino = detalhe();
      if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const seletorEsfera = qs('#acoes-filtro-esfera');
    const seletorInstituicao = qs('#acoes-filtro-instituicao');
    const paginacao = qs('#acoes-paginacao');
    const contador = qs('#acoes-contador-cards');
    const btnLimpar = qs('[data-acoes-limpar]');
    const listaDetalhe = qs('#lista-acoes');
    let paginaAtual = 1;

    if (!seletorEsfera || !seletorInstituicao || !paginacao) return;
    garantirOpcaoPcdfNoSeletor(seletorInstituicao);

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
      const botao = event.target.closest('[data-acoes-page]');
      if (!botao || botao.disabled) return;
      const destino = botao.dataset.acoesPage;
      const totalPaginas = Math.max(1, Math.ceil(cardsFiltrados(seletorEsfera, seletorInstituicao).length / CARDS_POR_PAGINA));

      if (destino === 'prev') paginaAtual -= 1;
      else if (destino === 'next') paginaAtual += 1;
      else paginaAtual = Number(destino) || 1;

      if (paginaAtual < 1) paginaAtual = 1;
      if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
      renderizar();
      const lista = qs('#acoes-conteudo-lista');
      if (lista) lista.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    function instInicialDaUrl() {
      try {
        const params = new URLSearchParams(window.location.search || '');
        const instParam = normalizar(params.get('inst') || params.get('instituicao'));
        if (instParam && qs(`[data-acoes-card][data-inst="${escapeCss(instParam)}"]`)) return instParam;
      } catch (erro) { /* silencioso */ }
      const hash = String(window.location.hash || '').replace(/^#/, '');
      if (!hash) return '';
      const alvo = document.getElementById(hash);
      return normalizar(alvo?.dataset?.inst || '');
    }

    function aplicarInstInicialDaUrl() {
      const inst = instInicialDaUrl();
      if (!inst) return false;
      const card = qs(`[data-acoes-card][data-inst="${escapeCss(inst)}"]`);
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
      const botao = event.target.closest('[data-acoes-load]');
      if (!botao) return;
      const inst = botao.dataset.acoesLoad;
      if (!inst) return;
      event.preventDefault();

      const card = qs(`[data-acoes-card][data-inst="${escapeCss(inst)}"]`);
      if (card) seletorEsfera.value = card.dataset.esfera || '';
      seletorInstituicao.value = inst;
      paginaAtual = 1;
      renderizar();
      selecionarInstituicao(inst, true);
    });

    esconderDetalhe();
    if (listaDetalhe) listaDetalhe.innerHTML = '';
    if (!aplicarInstInicialDaUrl()) renderizar();
  });
})();
