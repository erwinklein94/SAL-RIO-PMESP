/* ============================================================
   Guia das instituições — filtro progressivo.
   O conteúdo dos artigos fica estático no HTML; este script só filtra.
   ============================================================ */
(function () {
  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) { return Array.from((root || document).querySelectorAll(selector)); }

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
    if (esfera === 'estadual') {
      return [
        { inst: 'pmesp', estadoNome: 'São Paulo', uf: 'SP', sigla: 'PMESP', nome: 'Polícia Militar do Estado de São Paulo', ramo: 'Polícia Militar' },
        { inst: 'bmsp', estadoNome: 'São Paulo', uf: 'SP', sigla: 'Bombeiros SP', nome: 'Corpo de Bombeiros da Polícia Militar do Estado de São Paulo', ramo: 'Bombeiro Militar' },
        { inst: 'pcsp', estadoNome: 'São Paulo', uf: 'SP', sigla: 'PCSP', nome: 'Polícia Civil do Estado de São Paulo', ramo: 'Polícia Civil' },
        { inst: 'ppsp', estadoNome: 'São Paulo', uf: 'SP', sigla: 'PPSP', nome: 'Polícia Penal do Estado de São Paulo', ramo: 'Polícia Penal' },
        { inst: 'pmerj', estadoNome: 'Rio de Janeiro', uf: 'RJ', sigla: 'PMERJ', nome: 'Polícia Militar do Estado do Rio de Janeiro', ramo: 'Polícia Militar' },
        { inst: 'pcerj', estadoNome: 'Rio de Janeiro', uf: 'RJ', sigla: 'PCERJ', nome: 'Polícia Civil do Estado do Rio de Janeiro', ramo: 'Polícia Civil' },
        { inst: 'pprj', estadoNome: 'Rio de Janeiro', uf: 'RJ', sigla: 'PPRJ', nome: 'Polícia Penal do Estado do Rio de Janeiro', ramo: 'Polícia Penal' }
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
      const grupo = esfera === 'estadual' ? `${item.estadoNome} (${item.uf})` : (esfera === 'federal' ? 'União' : 'Municípios');
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

  function setEmptyState(show, inst) {
    const empty = qs('#guia-empty-state');
    const nome = qs('#guia-empty-inst');
    if (!empty) return;
    empty.hidden = !show;
    if (nome) {
      const info = (typeof HEADER_INSTITUICOES_INFO !== 'undefined' && HEADER_INSTITUICOES_INFO[inst]) || null;
      nome.textContent = info ? `${info.titulo} — ${info.desc}` : String(inst || '').toUpperCase();
    }
  }

  function filtrarArtigos(inst, rolarAtePrimeiro) {
    const artigos = getArtigos();
    let visiveis = 0;
    artigos.forEach(artigo => {
      const mostrar = !inst || artigo.dataset.guiaInst === inst;
      artigo.hidden = !mostrar;
      if (mostrar) visiveis += 1;
    });
    setEmptyState(!!inst && visiveis === 0, inst);

    const contador = qs('#guia-contador-artigos');
    if (contador) contador.textContent = String(visiveis);

    if (inst && typeof mudarInstituicao === 'function') mudarInstituicao(inst);

    if (rolarAtePrimeiro) {
      const primeiro = artigos.find(artigo => !artigo.hidden) || qs('#guia-empty-state');
      if (primeiro) primeiro.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    filtrarArtigos('', false);
    if (typeof aplicarHeaderInicialPortal === 'function') aplicarHeaderInicialPortal();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const esfera = qs('#guia_esfera');
    const inst = qs('#guia_instituicao');
    const limpar = qs('[data-guia-limpar]');

    if (esfera) {
      esfera.addEventListener('change', () => {
        popularInstituicoes(esfera.value, '');
        filtrarArtigos('', false);
      });
    }

    if (inst) {
      inst.addEventListener('change', () => {
        filtrarArtigos(inst.value, true);
      });
    }

    if (limpar) {
      limpar.addEventListener('click', event => {
        event.preventDefault();
        limparFiltro();
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
      filtrarArtigos(valor, true);
    });

    filtrarArtigos('', false);
  });
})();
