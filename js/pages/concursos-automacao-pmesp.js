/*
  Piloto de automação — PMESP / Concursos
  Lê data/concursos/pmesp.json e usa esse arquivo como fonte preferencial
  para o card e para os dados completos da PMESP.
*/
(function () {
  const INST_ID = 'pmesp';
  const JSON_URL = 'data/concursos/pmesp.json';

  function texto(valor) {
    return String(valor == null ? '' : valor).replace(/\s+/g, ' ').trim();
  }

  function escapar(valor) {
    return texto(valor).replace(/[&<>"']/g, function (char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[char];
    });
  }

  function encurtar(valor, limite) {
    const limpo = texto(valor);
    if (!limpo || limpo.length <= limite) return limpo;
    return limpo.slice(0, limite - 1).trimEnd() + '…';
  }

  function primeiraFonteValida(fontes) {
    if (!Array.isArray(fontes)) return '';
    const fonte = fontes.find(function (item) {
      return item && /^https?:\/\//i.test(texto(item.url));
    });
    return fonte ? texto(fonte.url) : '';
  }

  function normalizarParaConcursos(dados) {
    return {
      edital: texto(dados.edital || dados.titulo || 'Dados em atualização'),
      salario: texto(dados.salario || dados.remuneracao || 'Dados em atualização'),
      vagas: texto(dados.vagas || 'Dados em atualização'),
      cotas: texto(dados.cotas || 'Dados em atualização'),
      idade: texto(dados.idade || 'Dados em atualização'),
      escolaridade: texto(dados.escolaridade || 'Dados em atualização'),
      materias: texto(dados.materias || 'Dados em atualização'),
      banca: texto(dados.banca || 'Dados em atualização'),
      inscritos: texto(dados.inscritos || dados.inscricoes || 'Dados em atualização'),
      etapas: texto(dados.etapas || 'Dados em atualização'),
      cfsd: texto(dados.cfsd || 'Dados em atualização'),
      estagio: texto(dados.estagio || 'Dados em atualização'),
      validade: texto(dados.validade || 'Dados em atualização'),
      previsao: texto(dados.previsao || 'Dados em atualização'),
      site: texto(dados.site || primeiraFonteValida(dados.fontes) || 'https://concursos.policiamilitar.sp.gov.br'),
      automacao: {
        origem: 'data/concursos/pmesp.json',
        ultima_pesquisa: texto(dados.ultima_pesquisa || ''),
        nivel_confianca: texto(dados.nivel_confianca || ''),
        precisa_revisao_humana: Boolean(dados.precisa_revisao_humana),
        fontes: Array.isArray(dados.fontes) ? dados.fontes : [],
        alertas: Array.isArray(dados.alertas) ? dados.alertas : []
      }
    };
  }

  function atualizarBaseGlobal(concurso) {
    if (typeof CONCURSOS === 'undefined') return;
    CONCURSOS[INST_ID] = Object.assign({}, CONCURSOS[INST_ID] || {}, concurso);
  }

  function atualizarCard(dados, concurso) {
    const card = document.querySelector('[data-concurso-card][data-inst="' + INST_ID + '"]');
    if (!card) return;

    const titulo = card.querySelector('.concursos-card-topo h2');
    const resumo = card.querySelector('.concursos-card-topo p');
    const indicadores = card.querySelectorAll('.concursos-card-indicadores > div strong');
    const corpo = card.querySelectorAll('.concursos-card-corpo p');
    const fonte = card.querySelector('.concursos-card-links a');

    if (titulo && dados.titulo) titulo.textContent = texto(dados.titulo);
    if (resumo && dados.resumo) resumo.textContent = texto(dados.resumo);

    if (indicadores[0]) indicadores[0].textContent = encurtar(concurso.edital, 190);
    if (indicadores[1]) indicadores[1].textContent = encurtar(concurso.vagas, 170);
    if (indicadores[2]) indicadores[2].textContent = encurtar(concurso.banca, 150);
    if (indicadores[3]) indicadores[3].textContent = encurtar(concurso.escolaridade, 160);

    if (corpo[0]) corpo[0].innerHTML = '<strong>Remuneração de referência:</strong> ' + escapar(concurso.salario);
    if (corpo[1]) corpo[1].innerHTML = '<strong>Etapas comuns do certame:</strong> ' + escapar(concurso.etapas);
    if (corpo[2]) corpo[2].innerHTML = '<strong>Próximo edital e acompanhamento:</strong> ' + escapar(concurso.previsao);

    if (fonte && /^https?:\/\//i.test(concurso.site)) {
      fonte.href = concurso.site;
      fonte.textContent = 'Abrir fonte oficial';
    }

    card.dataset.automacao = 'pmesp-json';
    card.dataset.automacaoAtualizada = concurso.automacao.ultima_pesquisa || '';
  }

  function renderizarDetalheSeAberto(concurso) {
    const select = document.getElementById('concursos_instituicao');
    const detalhe = document.getElementById('consulta-concurso-detalhado');
    const lista = document.getElementById('lista-concursos');

    if (!select || !detalhe || !lista) return;
    if (select.value !== INST_ID || detalhe.hidden) return;

    const link = /^https?:\/\//i.test(concurso.site)
      ? '<a href="' + escapar(concurso.site) + '" target="_blank" rel="noopener noreferrer" class="concurso-link">🔗 Site oficial da instituição</a>'
      : '<span class="direito-desc">Fonte oficial em atualização</span>';

    const metadados = concurso.automacao.ultima_pesquisa || concurso.automacao.nivel_confianca
      ? '<span class="direito-desc"><strong>Atualização automática:</strong> ' +
          escapar(concurso.automacao.ultima_pesquisa || 'sem data') +
          ' · confiança: ' + escapar(concurso.automacao.nivel_confianca || 'não informada') +
        '</span>'
      : '';

    lista.innerHTML = `
      <div class="direito-item acao">
        <span class="direito-nome">${escapar(concurso.edital)}</span>
        <span class="direito-desc"><strong>Salário inicial:</strong> ${escapar(concurso.salario)}</span>
        <span class="direito-desc"><strong>Vagas:</strong> ${escapar(concurso.vagas)}</span>
        <span class="direito-desc"><strong>Cotas:</strong> ${escapar(concurso.cotas)}</span>
        <span class="direito-desc"><strong>Idade exigida:</strong> ${escapar(concurso.idade)}</span>
        <span class="direito-desc"><strong>Escolaridade:</strong> ${escapar(concurso.escolaridade)}</span>
        <span class="direito-desc"><strong>Banca:</strong> ${escapar(concurso.banca)} · <strong>Inscrições/inscritos:</strong> ${escapar(concurso.inscritos)}</span>
        <span class="direito-desc"><strong>Disciplinas:</strong> ${escapar(concurso.materias)}</span>
        <span class="direito-desc"><strong>Etapas do certame:</strong> ${escapar(concurso.etapas)}</span>
        <span class="direito-desc"><strong>Curso de Formação:</strong> ${escapar(concurso.cfsd)}</span>
        <span class="direito-desc"><strong>Estágio Probatório:</strong> ${escapar(concurso.estagio)}</span>
        <span class="direito-desc"><strong>Validade do edital:</strong> ${escapar(concurso.validade)}</span>
        <span class="direito-desc" style="margin-top:8px;"><strong>Próximo Edital:</strong> ${escapar(concurso.previsao)}</span>
        ${metadados}
        ${link}
      </div>
    `;
  }

  function aplicarDados(dados) {
    const concurso = normalizarParaConcursos(dados || {});
    atualizarBaseGlobal(concurso);
    atualizarCard(dados || {}, concurso);
    renderizarDetalheSeAberto(concurso);
    document.dispatchEvent(new CustomEvent('concursos:pmesp-json-carregado', {
      detail: { dados: dados, concurso: concurso }
    }));
  }

  async function carregarJson() {
    try {
      const resposta = await fetch(JSON_URL + '?v=' + Date.now(), { cache: 'no-store' });
      if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
      const dados = await resposta.json();
      aplicarDados(dados);
    } catch (erro) {
      console.warn('Piloto PMESP: não foi possível carregar data/concursos/pmesp.json. Mantendo dados estáticos.', erro);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarJson);
  } else {
    carregarJson();
  }
}());
