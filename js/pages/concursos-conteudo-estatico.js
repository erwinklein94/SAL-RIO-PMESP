/* Concursos — filtro e paginação visual sobre conteúdo já escrito no HTML. */
(function () {
  const CARDS_POR_PAGINA = 4;

  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) { return Array.from((root || document).querySelectorAll(selector)); }
  function normalizar(valor) { return String(valor || '').trim().toLowerCase(); }

  function cards() {
    return qsa('[data-concurso-card][data-inst]');
  }

  function esconderDetalhe() {
    const detalhe = qs('#consulta-concurso-detalhado');
    if (detalhe) detalhe.hidden = true;
  }

  function mostrarDetalhe() {
    const detalhe = qs('#consulta-concurso-detalhado');
    if (detalhe) detalhe.hidden = false;
  }

  function textoSeguro(valor) {
    const texto = String(valor == null ? '' : valor);
    if (typeof escapeHtml === 'function') return escapeHtml(texto);
    return texto.replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function urlValida(valor) {
    return /^https?:\/\//i.test(String(valor || '').trim());
  }

  function concursoFallbackHtml(inst) {
    if (typeof CONCURSOS === 'undefined' || !CONCURSOS[inst]) return '';
    const c = CONCURSOS[inst];
    const link = urlValida(c.site)
      ? `<a href="${textoSeguro(c.site)}" target="_blank" rel="noopener noreferrer" class="concurso-link">🔗 Site oficial da instituição</a>`
      : '<span class="direito-desc">Fonte oficial em breve</span>';

    return `
      <div class="direito-item acao">
        <span class="direito-nome">${textoSeguro(c.edital || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Salário inicial:</strong> ${textoSeguro(c.salario || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Vagas:</strong> ${textoSeguro(c.vagas || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Cotas:</strong> ${textoSeguro(c.cotas || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Idade exigida:</strong> ${textoSeguro(c.idade || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Escolaridade:</strong> ${textoSeguro(c.escolaridade || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Banca:</strong> ${textoSeguro(c.banca || 'Dados em breve')} · <strong>Inscritos no último:</strong> ${textoSeguro(c.inscritos || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Disciplinas:</strong> ${textoSeguro(c.materias || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Etapas do certame:</strong> ${textoSeguro(c.etapas || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Curso de Formação:</strong> ${textoSeguro(c.cfsd || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Estágio Probatório:</strong> ${textoSeguro(c.estagio || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Validade do edital:</strong> ${textoSeguro(c.validade || 'Dados em breve')}</span>
        <span class="direito-desc" style="margin-top:8px;"><strong>Próximo Edital:</strong> ${textoSeguro(c.previsao || 'Dados em breve')}</span>
        ${link}
      </div>
    `;
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
    botoes.push(`<button type="button" data-concursos-page="prev" ${paginaAtual === 1 ? 'disabled' : ''}>Anterior</button>`);
    for (let i = 1; i <= totalPaginas; i += 1) {
      botoes.push(`<button type="button" data-concursos-page="${i}" ${i === paginaAtual ? 'aria-current="page"' : ''}>${i}</button>`);
    }
    botoes.push(`<button type="button" data-concursos-page="next" ${paginaAtual === totalPaginas ? 'disabled' : ''}>Próxima</button>`);
    paginacao.innerHTML = botoes.join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const seletorEsfera = qs('#concursos_esfera');
    const seletorInstituicao = qs('#concursos_instituicao');
    const paginacao = qs('#concursos-paginacao');
    const contador = qs('#concursos-contador-cards');
    const btnLimpar = qs('[data-concursos-limpar]');
    const listaDetalhe = qs('#lista-concursos');
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

    function selecionarInstituicao(inst, rolar) {
      if (!inst) {
        esconderDetalhe();
        if (listaDetalhe) listaDetalhe.innerHTML = '';
        return;
      }

      mostrarDetalhe();

      try {
        if (typeof mudarInstituicao === 'function') {
          mudarInstituicao(inst);
        }
      } catch (erro) {
        console.warn('Falha ao atualizar cabeçalho institucional do concurso:', erro);
      }

      try {
        if (typeof carregarConcursos === 'function') carregarConcursos();
      } catch (erro) {
        console.warn('Falha ao carregar dados completos do concurso:', erro);
      }

      if (listaDetalhe && !listaDetalhe.textContent.trim()) {
        listaDetalhe.innerHTML = concursoFallbackHtml(inst);
      }

      if (rolar) {
        const destino = qs('#consulta-concurso-detalhado');
        if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
      const botao = event.target.closest('[data-concursos-page]');
      if (!botao || botao.disabled) return;
      const destino = botao.dataset.concursosPage;
      const totalPaginas = Math.max(1, Math.ceil(cardsFiltrados(seletorEsfera, seletorInstituicao).length / CARDS_POR_PAGINA));

      if (destino === 'prev') paginaAtual -= 1;
      else if (destino === 'next') paginaAtual += 1;
      else paginaAtual = Number(destino) || 1;

      if (paginaAtual < 1) paginaAtual = 1;
      if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
      renderizar();
      const lista = qs('#concursos-conteudo-lista');
      if (lista) lista.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    function instInicialDaUrl() {
      try {
        const params = new URLSearchParams(window.location.search || '');
        const instParam = normalizar(params.get('inst') || params.get('instituicao'));
        if (instParam && qs(`[data-concurso-card][data-inst="${(window.CSS && CSS.escape ? CSS.escape(instParam) : instParam)}"]`)) return instParam;
      } catch (erro) { /* silencioso */ }
      const hash = String(window.location.hash || '').replace(/^#/, '');
      if (!hash) return '';
      const alvo = document.getElementById(hash);
      return normalizar(alvo?.dataset?.inst || '');
    }

    function aplicarInstInicialDaUrl() {
      const inst = instInicialDaUrl();
      if (!inst) return false;
      const valorCss = (window.CSS && typeof window.CSS.escape === 'function') ? window.CSS.escape(inst) : String(inst).replace(/[^a-zA-Z0-9_-]/g, '\$&');
      const card = qs(`[data-concurso-card][data-inst="${valorCss}"]`);
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
      const botao = event.target.closest('[data-concurso-load]');
      if (!botao) return;
      const inst = botao.dataset.concursoLoad;
      if (!inst) return;
      event.preventDefault();

      const valorCss = (window.CSS && typeof window.CSS.escape === 'function') ? window.CSS.escape(inst) : String(inst).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
      const card = qs(`[data-concurso-card][data-inst="${valorCss}"]`);
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
