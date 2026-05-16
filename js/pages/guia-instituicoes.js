/* ============================================================
   Guia das instituições — filtro progressivo e paginação visual.
   O conteúdo dos artigos fica estático no HTML; este script só filtra
   e divide a visualização em páginas.
   ============================================================ */
(function () {
  const ARTIGOS_POR_PAGINA = 2;

  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) { return Array.from((root || document).querySelectorAll(selector)); }
  function normalizar(valor) { return String(valor || '').trim().toLowerCase(); }

  function getArtigos() {
    return qsa('[data-guia-artigo][data-guia-inst]');
  }

  function artigoExiste(inst) {
    return getArtigos().some(artigo => artigo.dataset.guiaInst === inst);
  }

  function getItensInstituicao(esfera) {
    if (typeof getInstituicoesParaConsulta === 'function') {
      return getInstituicoesParaConsulta(esfera);
    }
    if (esfera === 'federal') {
      return [
        { inst: 'pf', estadoNome: 'Brasil', uf: 'BR', sigla: 'PF', nome: 'Polícia Federal', ramo: 'Polícia Federal' },
        { inst: 'prf', estadoNome: 'Brasil', uf: 'BR', sigla: 'PRF', nome: 'Polícia Rodoviária Federal', ramo: 'Polícia Rodoviária Federal' },
        { inst: 'pcdf', estadoNome: 'Distrito Federal', uf: 'DF', sigla: 'PCDF', nome: 'Polícia Civil do Distrito Federal', ramo: 'Polícia Civil' }
      ];
    }
    if (esfera === 'estadual') {
      return [
        { inst: 'pmesp', estadoNome: 'São Paulo', uf: 'SP', sigla: 'PMESP', nome: 'Polícia Militar do Estado de São Paulo', ramo: 'Polícia Militar' },
        { inst: 'bmsp', estadoNome: 'São Paulo', uf: 'SP', sigla: 'Bombeiros SP', nome: 'Corpo de Bombeiros da Polícia Militar do Estado de São Paulo', ramo: 'Bombeiro Militar' },
        { inst: 'pcsp', estadoNome: 'São Paulo', uf: 'SP', sigla: 'PCSP', nome: 'Polícia Civil do Estado de São Paulo', ramo: 'Polícia Civil' },
        { inst: 'ppsp', estadoNome: 'São Paulo', uf: 'SP', sigla: 'PPSP', nome: 'Polícia Penal do Estado de São Paulo', ramo: 'Polícia Penal' },
        { inst: 'pmerj', estadoNome: 'Rio de Janeiro', uf: 'RJ', sigla: 'PMERJ', nome: 'Polícia Militar do Estado do Rio de Janeiro', ramo: 'Polícia Militar' },
        { inst: 'bmrj', estadoNome: 'Rio de Janeiro', uf: 'RJ', sigla: 'CBMERJ', nome: 'Corpo de Bombeiros Militar do Estado do Rio de Janeiro', ramo: 'Bombeiro Militar' },
        { inst: 'pcerj', estadoNome: 'Rio de Janeiro', uf: 'RJ', sigla: 'PCERJ', nome: 'Polícia Civil do Estado do Rio de Janeiro', ramo: 'Polícia Civil' },
        { inst: 'pprj', estadoNome: 'Rio de Janeiro', uf: 'RJ', sigla: 'PPRJ', nome: 'Polícia Penal do Estado do Rio de Janeiro', ramo: 'Polícia Penal' },
        { inst: 'pmmg', estadoNome: 'Minas Gerais', uf: 'MG', sigla: 'PMMG', nome: 'Polícia Militar de Minas Gerais', ramo: 'Polícia Militar' },
        { inst: 'pcmg', estadoNome: 'Minas Gerais', uf: 'MG', sigla: 'PCMG', nome: 'Polícia Civil de Minas Gerais', ramo: 'Polícia Civil' }
      ];
    }
    return [];
  }

  function popularInstituicoes(esfera, valorPreferido) {
    const instSelect = qs('#guia_instituicao');
    if (!instSelect) return;
    if (!esfera) {
      instSelect.disabled = true;
      instSelect.innerHTML = '<option value="">Escolha primeiro a esfera</option>';
      return;
    }

    const itens = getItensInstituicao(esfera);
    let html = '<option value="">Todas as instituições com artigo</option>';
    let grupoAtual = '';
    itens.forEach(item => {
      const grupo = esfera === 'estadual' ? `${item.estadoNome} (${item.uf})` : 'União';
      if (grupo !== grupoAtual) {
        if (grupoAtual) html += '</optgroup>';
        html += `<optgroup label="${escapeHtmlLocal(grupo)}">`;
        grupoAtual = grupo;
      }
      const etiqueta = esfera === 'estadual' ? `${item.sigla} — ${item.ramo}` : `${item.sigla} — ${item.nome}`;
      const sufixo = artigoExiste(item.inst) ? '' : ' · artigo em breve';
      html += `<option value="${escapeHtmlLocal(item.inst)}">${escapeHtmlLocal(etiqueta + sufixo)}</option>`;
    });
    if (grupoAtual) html += '</optgroup>';

    instSelect.innerHTML = html;
    instSelect.disabled = false;
    if (valorPreferido && Array.from(instSelect.options).some(opt => opt.value === valorPreferido)) {
      instSelect.value = valorPreferido;
    }
  }

  function escapeHtmlLocal(str) {
    return String(str || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function nomeFiltro(inst, esfera) {
    if (inst) {
      const info = (typeof HEADER_INSTITUICOES_INFO !== 'undefined' && HEADER_INSTITUICOES_INFO[inst]) || null;
      return info ? `${info.titulo} — ${info.desc}` : String(inst || '').toUpperCase();
    }
    if (esfera === 'federal') return 'federal selecionada';
    if (esfera === 'estadual') return 'estadual selecionada';
    return 'selecionado';
  }

  function setEmptyState(show, inst, esfera) {
    const empty = qs('#guia-empty-state');
    const nome = qs('#guia-empty-inst');
    if (!empty) return;
    empty.hidden = !show;
    if (nome) nome.textContent = nomeFiltro(inst, esfera);
  }

  function artigosFiltrados(esfera, inst) {
    const esferaNormalizada = normalizar(esfera);
    const instNormalizada = normalizar(inst);
    return getArtigos().filter(artigo => {
      if (esferaNormalizada && artigo.dataset.guiaEsfera !== esferaNormalizada) return false;
      if (instNormalizada && artigo.dataset.guiaInst !== instNormalizada) return false;
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
    botoes.push(`<button type="button" data-guia-page="prev" ${paginaAtual === 1 ? 'disabled' : ''}>Anterior</button>`);
    for (let i = 1; i <= totalPaginas; i += 1) {
      botoes.push(`<button type="button" data-guia-page="${i}" ${i === paginaAtual ? 'aria-current="page"' : ''}>${i}</button>`);
    }
    botoes.push(`<button type="button" data-guia-page="next" ${paginaAtual === totalPaginas ? 'disabled' : ''}>Próxima</button>`);
    paginacao.innerHTML = botoes.join('');
  }

  function limparFiltro() {
    const esfera = qs('#guia_esfera');
    const inst = qs('#guia_instituicao');
    if (esfera) esfera.value = '';
    if (inst) {
      inst.disabled = true;
      inst.innerHTML = '<option value="">Escolha primeiro a esfera</option>';
      inst.value = '';
    }
    if (typeof aplicarHeaderInicialPortal === 'function') aplicarHeaderInicialPortal();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const esfera = qs('#guia_esfera');
    const inst = qs('#guia_instituicao');
    const limpar = qs('[data-guia-limpar]');
    const paginacao = qs('#guia-paginacao');
    const contador = qs('#guia-contador-artigos');
    let paginaAtual = 1;

    function renderizar(rolarAtePrimeiro) {
      const esferaValor = esfera ? esfera.value : '';
      const instValor = inst ? inst.value : '';
      const artigos = getArtigos();
      const filtrados = artigosFiltrados(esferaValor, instValor);
      const totalPaginas = Math.max(1, Math.ceil(filtrados.length / ARTIGOS_POR_PAGINA));

      if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
      if (paginaAtual < 1) paginaAtual = 1;

      const inicio = (paginaAtual - 1) * ARTIGOS_POR_PAGINA;
      const fim = inicio + ARTIGOS_POR_PAGINA;
      const visiveis = new Set(filtrados.slice(inicio, fim));

      artigos.forEach(artigo => {
        artigo.hidden = !visiveis.has(artigo);
      });

      setEmptyState(filtrados.length === 0, instValor, esferaValor);

      if (contador) contador.textContent = String(filtrados.length);
      renderizarPaginacao(paginacao, paginaAtual, totalPaginas);

      if (instValor && typeof mudarInstituicao === 'function') mudarInstituicao(instValor);

      if (rolarAtePrimeiro) {
        const primeiro = filtrados[0] && !filtrados[0].hidden ? filtrados[0] : (artigos.find(artigo => !artigo.hidden) || qs('#guia-empty-state'));
        if (primeiro) primeiro.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (esfera) {
      esfera.addEventListener('change', () => {
        paginaAtual = 1;
        popularInstituicoes(esfera.value, '');
        renderizar(false);
      });
    }

    if (inst) {
      inst.addEventListener('change', () => {
        paginaAtual = 1;
        renderizar(true);
      });
    }

    if (limpar) {
      limpar.addEventListener('click', event => {
        event.preventDefault();
        paginaAtual = 1;
        limparFiltro();
        renderizar(false);
      });
    }

    if (paginacao) {
      paginacao.addEventListener('click', event => {
        const botao = event.target.closest('[data-guia-page]');
        if (!botao || botao.disabled) return;
        const destino = botao.dataset.guiaPage;
        const totalPaginas = Math.max(1, Math.ceil(artigosFiltrados(esfera ? esfera.value : '', inst ? inst.value : '').length / ARTIGOS_POR_PAGINA));

        if (destino === 'prev') paginaAtual -= 1;
        else if (destino === 'next') paginaAtual += 1;
        else paginaAtual = Number(destino) || 1;

        if (paginaAtual < 1) paginaAtual = 1;
        if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
        renderizar(false);

        const lista = qs('.guia-lista-artigos');
        if (lista) lista.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    document.addEventListener('change', event => {
      const alvo = event.target;
      if (!alvo || !alvo.matches('#instituicao, #instituicao_header')) return;
      const valor = alvo.value;
      if (!valor) return;
      const esf = typeof getEsferaConsultaInstituicao === 'function' ? getEsferaConsultaInstituicao(valor) : 'estadual';
      if (esfera) esfera.value = esf;
      popularInstituicoes(esf, valor);
      if (inst) inst.value = valor;
      paginaAtual = 1;
      renderizar(true);
    });

    renderizar(false);
  });
})();
