(function () {
  'use strict';

  const CARDS_POR_PAGINA = 4;

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function normalizarTexto(texto) {
    return String(texto || '').trim();
  }

  onReady(function inicializarRemuneracaoEditorial() {
    const cards = Array.from(document.querySelectorAll('[data-remu-card]'));
    const seletorEsfera = document.getElementById('remu-filtro-esfera');
    const seletorInstituicao = document.getElementById('remu-filtro-instituicao');
    const btnLimpar = document.getElementById('remu-limpar-filtros');
    const contador = document.getElementById('remu-contador-cards');
    const paginacao = document.getElementById('remu-paginacao');
    const consultaDetalhada = document.getElementById('consulta-remuneracao-detalhada');

    if (!cards.length || !seletorEsfera || !seletorInstituicao || !paginacao) return;

    let paginaAtual = 1;

    function ocultarConsultaDetalhada() {
      if (!consultaDetalhada) return;
      consultaDetalhada.hidden = true;
      consultaDetalhada.classList.remove('remuneracao-consulta-detalhada--ativa');
    }

    function exibirConsultaDetalhada() {
      if (!consultaDetalhada) return;
      consultaDetalhada.hidden = false;
      consultaDetalhada.classList.add('remuneracao-consulta-detalhada--ativa');
    }

    function atualizarOpcoesInstituicao() {
      const esfera = normalizarTexto(seletorEsfera.value);
      Array.from(seletorInstituicao.options).forEach(option => {
        if (!option.value) {
          option.hidden = false;
          return;
        }
        option.hidden = Boolean(esfera) && option.dataset.esfera !== esfera;
      });

      const optionAtual = seletorInstituicao.selectedOptions[0];
      if (optionAtual && optionAtual.hidden) seletorInstituicao.value = '';
    }

    function cardsFiltrados() {
      const esfera = normalizarTexto(seletorEsfera.value);
      const inst = normalizarTexto(seletorInstituicao.value);
      return cards.filter(card => {
        if (esfera && card.dataset.esfera !== esfera) return false;
        if (inst && card.dataset.inst !== inst) return false;
        return true;
      });
    }

    function renderizarPaginacao(totalPaginas) {
      if (totalPaginas <= 1) {
        paginacao.hidden = true;
        paginacao.innerHTML = '';
        return;
      }

      paginacao.hidden = false;
      const botoes = [];
      botoes.push(`<button type="button" data-remu-page="prev" ${paginaAtual === 1 ? 'disabled' : ''}>Anterior</button>`);
      for (let i = 1; i <= totalPaginas; i += 1) {
        botoes.push(`<button type="button" data-remu-page="${i}" ${i === paginaAtual ? 'aria-current="page"' : ''}>${i}</button>`);
      }
      botoes.push(`<button type="button" data-remu-page="next" ${paginaAtual === totalPaginas ? 'disabled' : ''}>Próxima</button>`);
      paginacao.innerHTML = botoes.join('');
    }

    function renderizar() {
      atualizarOpcoesInstituicao();
      const filtrados = cardsFiltrados();
      const totalPaginas = Math.max(1, Math.ceil(filtrados.length / CARDS_POR_PAGINA));
      if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
      if (paginaAtual < 1) paginaAtual = 1;

      const inicio = (paginaAtual - 1) * CARDS_POR_PAGINA;
      const fim = inicio + CARDS_POR_PAGINA;
      const visiveis = new Set(filtrados.slice(inicio, fim));

      cards.forEach(card => {
        card.hidden = !visiveis.has(card);
      });

      if (contador) {
        const textoInstituicao = seletorInstituicao.value ? 'instituição selecionada' : 'instituições encontradas';
        contador.textContent = `${filtrados.length} ${textoInstituicao}`;
      }

      renderizarPaginacao(totalPaginas);
    }

    function textoInstituicao(inst) {
      const option = Array.from(seletorInstituicao.options || []).find(op => op.value === inst);
      if (option) return option.textContent.trim();
      const card = document.querySelector(`[data-remu-card][data-inst="${escaparSeletorCss(inst)}"]`);
      const titulo = card?.querySelector('h2')?.textContent || inst;
      return titulo.replace(/:.+$/, '').trim();
    }

    function valorSeguro(valor) {
      if (typeof window.escapeHtml === 'function') return window.escapeHtml(valor);
      return String(valor == null ? '' : valor).replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
      }[char]));
    }

    function moeda(valor) {
      if (typeof window.fmt === 'function') return window.fmt(valor);
      const numero = Number(valor) || 0;
      return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function adicionaisHtml(inst, linha) {
      if (typeof window.formatarAdicionaisRemuneracaoHtml === 'function') {
        return window.formatarAdicionaisRemuneracaoHtml(inst, linha);
      }
      const texto = String(linha?.adicionais || linha?.criterio || '').trim();
      return texto ? valorSeguro(texto) : '<span class="adicionais-vazio">Sem adicionais ou auxílios específicos cadastrados para esta linha.</span>';
    }

    function fonteLinha(inst, linha) {
      const fontes = window.REMUNERACAO_FONTES_OFICIAIS || {};
      return fontes[linha?.fonteKey] || fontes[inst] || { nome: 'Fonte oficial da carreira', url: '#' };
    }

    function urlFonteSegura(valor) {
      if (typeof window.remuneracaoUrlSegura === 'function') return window.remuneracaoUrlSegura(valor);
      const url = String(valor || '').trim();
      return /^https?:\/\//i.test(url) ? url : '#';
    }

    function renderizarTabelaDetalhadaDireto(inst) {
      const tbody = document.getElementById('lista-remuneracao');
      if (!tbody || typeof window.gerarRemuneracaoTabelada !== 'function') return false;

      const linhas = window.gerarRemuneracaoTabelada(inst) || [];
      const nome = textoInstituicao(inst);
      const titulo = document.getElementById('txt-inst-remuneracao');
      const total = document.getElementById('remu-total-cargos');
      const menorEl = document.getElementById('remu-menor-total');
      const maiorEl = document.getElementById('remu-maior-total');

      if (titulo) titulo.textContent = nome;
      if (total) total.textContent = String(linhas.length);

      const remuneracoes = linhas.map(linha => Number(linha.remuneracao)).filter(valor => valor > 0);
      const menor = remuneracoes.length ? Math.min(...remuneracoes) : 0;
      const maior = remuneracoes.length ? Math.max(...remuneracoes) : 0;
      if (menorEl) menorEl.textContent = menor ? moeda(menor) : 'Dados em breve';
      if (maiorEl) maiorEl.textContent = maior ? moeda(maior) : 'Dados em breve';

      if (!linhas.length) {
        tbody.innerHTML = '<tr><td colspan="4">Não há dados cadastrados para esta instituição.</td></tr>';
        return true;
      }

      tbody.innerHTML = linhas.map(linha => {
        const fonte = fonteLinha(inst, linha);
        return `
          <tr>
            <td>
              <strong>${valorSeguro(linha.cargo)}</strong>
              <br><span class="remuneracao-badge">${valorSeguro(linha.badge || 'Fonte oficial')}</span>
            </td>
            <td class="valor">${linha.valorPendente ? 'Dados em breve' : moeda(linha.remuneracao)}</td>
            <td class="adicionais">${adicionaisHtml(inst, linha)}</td>
            <td>
              ${valorSeguro(linha.criterio || '')}<br>
              <span class="remuneracao-fonte">${valorSeguro(fonte.nome)}</span><br>
              <a class="remuneracao-link" href="${valorSeguro(urlFonteSegura(fonte.url))}" target="_blank" rel="noopener noreferrer">Abrir fonte oficial</a>
            </td>
          </tr>
        `;
      }).join('');
      return true;
    }

    function selecionarTabelaDetalhada(inst) {
      if (!inst) {
        ocultarConsultaDetalhada();
        if (typeof window.aplicarHeaderInicialPortal === 'function') window.aplicarHeaderInicialPortal();
        if (typeof window.mostrarAvisoSelecaoInstituicao === 'function') window.mostrarAvisoSelecaoInstituicao('remuneracao');
        return;
      }

      exibirConsultaDetalhada();

      const renderizouDireto = renderizarTabelaDetalhadaDireto(inst);

      try {
        if (typeof window.mudarInstituicao === 'function') {
          window.mudarInstituicao(inst);
        } else if (typeof window.carregarRemuneracaoTabelada === 'function') {
          window.currInst = inst;
          window.carregarRemuneracaoTabelada();
        }
      } catch (erro) {
        console.warn('Falha ao atualizar o cabeçalho institucional da remuneração:', erro);
      }

      if (renderizouDireto) renderizarTabelaDetalhadaDireto(inst);
    }

    seletorEsfera.addEventListener('change', () => {
      paginaAtual = 1;
      renderizar();
    });

    seletorInstituicao.addEventListener('change', () => {
      paginaAtual = 1;
      renderizar();
      selecionarTabelaDetalhada(seletorInstituicao.value);
    });

    if (btnLimpar) {
      btnLimpar.addEventListener('click', () => {
        seletorEsfera.value = '';
        seletorInstituicao.value = '';
        paginaAtual = 1;
        renderizar();
        selecionarTabelaDetalhada('');
      });
    }

    paginacao.addEventListener('click', event => {
      const botao = event.target.closest('[data-remu-page]');
      if (!botao || botao.disabled) return;
      const destino = botao.dataset.remuPage;
      const totalPaginas = Math.max(1, Math.ceil(cardsFiltrados().length / CARDS_POR_PAGINA));

      if (destino === 'prev') paginaAtual -= 1;
      else if (destino === 'next') paginaAtual += 1;
      else paginaAtual = Number(destino) || 1;

      if (paginaAtual < 1) paginaAtual = 1;
      if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
      renderizar();
      const lista = document.getElementById('remuneracao-conteudo-lista');
      if (lista) lista.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    function escaparSeletorCss(valor) {
      if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(valor);
      return String(valor || '').replace(/[^a-zA-Z0-9_-]/g, '\\$&');
    }

    document.addEventListener('click', event => {
      const link = event.target.closest('[data-remu-load]');
      if (!link) return;
      const inst = link.dataset.remuLoad;
      if (!inst) return;
      event.preventDefault();

      const card = document.querySelector(`[data-remu-card][data-inst="${escaparSeletorCss(inst)}"]`);
      if (card) {
        seletorEsfera.value = card.dataset.esfera || '';
        seletorInstituicao.value = inst;
      } else {
        seletorInstituicao.value = inst;
      }

      paginaAtual = 1;
      renderizar();
      selecionarTabelaDetalhada(inst);

      const destino = document.getElementById('consulta-remuneracao-detalhada');
      if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    ocultarConsultaDetalhada();
    if (!aplicarInstituicaoInicialDaUrl()) renderizar();
  });
})();
