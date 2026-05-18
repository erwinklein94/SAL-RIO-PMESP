/*
  Automação genérica — Concursos
  Correção Etapa 19: JSON publicado em modo qualificado pago deve ser exibido no site,
  mesmo quando qualidade_publicacao vier como baixa, desde que bloquear_publicacao seja false.
*/
(function () {
  const CONFIG_URL = 'config/concursos-instituicoes.json';

  const UF_ORDEM = ['BR', 'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

  const UF_NOME = {
    BR: 'União / Federal',
    AC: 'Acre',
    AL: 'Alagoas',
    AM: 'Amazonas',
    AP: 'Amapá',
    BA: 'Bahia',
    CE: 'Ceará',
    DF: 'Distrito Federal',
    ES: 'Espírito Santo',
    GO: 'Goiás',
    MA: 'Maranhão',
    MG: 'Minas Gerais',
    MS: 'Mato Grosso do Sul',
    MT: 'Mato Grosso',
    PA: 'Pará',
    PB: 'Paraíba',
    PE: 'Pernambuco',
    PI: 'Piauí',
    PR: 'Paraná',
    RJ: 'Rio de Janeiro',
    RN: 'Rio Grande do Norte',
    RO: 'Rondônia',
    RR: 'Roraima',
    RS: 'Rio Grande do Sul',
    SC: 'Santa Catarina',
    SE: 'Sergipe',
    SP: 'São Paulo',
    TO: 'Tocantins'
  };

  const ORDEM_TIPO = {
    pf: 1,
    prf: 2,
    pm: 10,
    bm: 20,
    pc: 30,
    pp: 40,
    outro: 90
  };

  function texto(valor) {
    return String(valor == null ? '' : valor).replace(/\s+/g, ' ').trim();
  }


  function limparTextoPublico(valor) {
    let limpo = texto(valor);
    if (!limpo) return limpo;

    limpo = limpo.replace(/\[([^\]]{1,120})\]\((https?:\/\/[^\s)]+)\)/gi, '$1');
    limpo = limpo.replace(/https?:\/\/\S+/gi, '');
    limpo = limpo.replace(/www\.\S+/gi, '');
    limpo = limpo.replace(/utm_source=[a-z0-9_-]+/gi, '');
    limpo = limpo.replace(/\[[^\]]*(?:\.gov|\.br|openai|http|fonte)[^\]]*\]/gi, '');
    limpo = limpo.replace(/\(\s*\)/g, '');

    const substituicoes = [
      [/o trecho coletado não traz/gi, 'não foi localizado'],
      [/não veio detalhado no trecho coletado/gi, 'não foi localizado'],
      [/no trecho coletado/gi, 'nas fontes consultadas'],
      [/conteúdo-base anterior menciona/gi, 'referência anterior indica'],
      [/conteudo-base anterior menciona/gi, 'referência anterior indica'],
      [/porém esse valor não foi revalidado nesta pesquisa atual/gi, 'valor não revalidado nesta pesquisa'],
      [/porem esse valor nao foi revalidado nesta pesquisa atual/gi, 'valor não revalidado nesta pesquisa'],
      [/nas fontes oficiais consultadas/gi, 'nas fontes consultadas'],
      [/a partir das fontes consultadas/gi, 'nas fontes consultadas'],
      [/fonte oficial alternativa/gi, 'fonte consultada']
    ];

    substituicoes.forEach(function (par) {
      limpo = limpo.replace(par[0], par[1]);
    });

    var frasesGincana = [
      /(conferir|consulte|consultar|ver|olhar|acessar|acesse)\s+(o\s+)?edital[^.;]*(?:[.;]|$)/gi,
      /(conferir|consulte|consultar|acompanhar|ver|olhar|acessar|acesse)\s+(a\s+)?p[aá]gina\s+oficial[^.;]*(?:[.;]|$)/gi,
      /(conforme|segundo)\s+(o\s+)?edital\s+espec[ií]fico[^.;]*(?:[.;]|$)/gi,
      /(depende|varia|podem variar)\s+[^.;]*(edital|cargo|concurso)[^.;]*(?:[.;]|$)/gi,
      /quando\s+(previsto|aplic[aá]vel)[^.;]*(?:[.;]|$)/gi
    ];
    frasesGincana.forEach(function (regex) {
      limpo = limpo.replace(regex, 'Não localizado com precisão nas fontes consultadas. ');
    });

    limpo = limpo.replace(/Não foi localizado[^.;]*?(?:;|\.)/gi, 'Não localizado nas fontes consultadas. ');
    limpo = limpo.replace(/Nao foi localizado[^.;]*?(?:;|\.)/gi, 'Não localizado nas fontes consultadas. ');
    limpo = limpo.replace(/\s+([,.;:])/g, '$1');
    limpo = limpo.replace(/([,.;:]){2,}/g, '$1');
    limpo = limpo.replace(/\s{2,}/g, ' ');
    limpo = limpo.replace(/^[-–—:;,.\s]+|[-–—:;,.\s]+$/g, '');
    return limpo;
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

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === 'function') return CSS.escape(value);
    return String(value || '').replace(/[^a-zA-Z0-9_-]/g, '\\$&');
  }

  function primeiraFonteValida(fontes) {
    if (!Array.isArray(fontes)) return '';
    const fonte = fontes.find(function (item) {
      return item && /^https?:\/\//i.test(texto(item.url));
    });
    return fonte ? texto(fonte.url) : '';
  }

  function valorRuim(valor) {
    const limpo = texto(valor).toLowerCase();
    if (!limpo) return true;
    const ruins = [
      'não encontrado em fonte oficial',
      'nao encontrado em fonte oficial',
      'não encontrado',
      'nao encontrado',
      'não informado',
      'nao informado',
      'dados em atualização',
      'dados em atualizacao',
      'em atualização',
      'em atualizacao'
    ];
    return ruins.some(function (padrao) {
      return limpo === padrao || limpo.indexOf(padrao) !== -1;
    });
  }

  function jsonTemQualidadeMinima(dados) {
    if (!dados || typeof dados !== 'object') return false;

    // Etapa 19: se o back-end publicou porque houve uso pago qualificado,
    // o front-end não pode barrar a exibição. A revisão humana fica indicada nos alertas/metadados.
    if (dados.forcar_exibicao_site === true) return true;
    if (dados.publicado_por_modo_qualificado === true && dados.bloquear_publicacao !== true) return true;
    if (dados.publicacao_forcada_por_credito_openai === true && dados.bloquear_publicacao !== true) return true;

    if (dados.bloquear_publicacao === true) return false;
    if (texto(dados.qualidade_publicacao).toLowerCase() === 'baixa') return false;

    const camposCriticos = ['edital', 'salario', 'vagas', 'escolaridade', 'banca', 'etapas'];
    const ruins = camposCriticos.filter(function (campo) {
      return valorRuim(dados[campo]);
    });

    if (ruins.length >= 3) return false;

    if (texto(dados.nivel_confianca).toLowerCase() === 'baixo' && dados.precisa_revisao_humana && ruins.length >= 2) {
      return false;
    }

    return true;
  }

  function normalizarParaConcursos(dados, itemConfig) {
    const id = texto(dados.instituicao_id || itemConfig.id).toLowerCase();
    return {
      edital: limparTextoPublico(dados.edital || dados.titulo || 'Dados em atualização'),
      salario: limparTextoPublico(dados.salario || dados.remuneracao || 'Dados em atualização'),
      vagas: limparTextoPublico(dados.vagas || 'Dados em atualização'),
      cotas: limparTextoPublico(dados.cotas || 'Dados em atualização'),
      idade: limparTextoPublico(dados.idade || 'Dados em atualização'),
      escolaridade: limparTextoPublico(dados.escolaridade || 'Dados em atualização'),
      materias: limparTextoPublico(dados.materias || 'Dados em atualização'),
      banca: limparTextoPublico(dados.banca || 'Dados em atualização'),
      inscritos: limparTextoPublico(dados.inscritos || dados.inscricoes || 'Dados em atualização'),
      etapas: limparTextoPublico(dados.etapas || 'Dados em atualização'),
      cfsd: limparTextoPublico(dados.cfsd || 'Dados em atualização'),
      estagio: limparTextoPublico(dados.estagio || 'Dados em atualização'),
      validade: limparTextoPublico(dados.validade || 'Dados em atualização'),
      previsao: limparTextoPublico(dados.previsao || 'Dados em atualização'),
      site: texto(dados.site || primeiraFonteValida(dados.fontes) || itemConfig.site_principal || ''),
      automacao: {
        origem: texto(itemConfig.arquivo_saida || ('data/concursos/' + id + '.json')),
        ultima_pesquisa: texto(dados.ultima_pesquisa || ''),
        nivel_confianca: texto(dados.nivel_confianca || ''),
        qualidade_publicacao: texto(dados.qualidade_publicacao || ''),
        score_publicacao: texto(dados.score_publicacao || ''),
        precisa_revisao_humana: Boolean(dados.precisa_revisao_humana),
        publicado_por_modo_qualificado: Boolean(dados.publicado_por_modo_qualificado),
        forcar_exibicao_site: Boolean(dados.forcar_exibicao_site),
        fontes: Array.isArray(dados.fontes) ? dados.fontes : [],
        alertas: Array.isArray(dados.alertas) ? dados.alertas : []
      }
    };
  }

  function atualizarBaseGlobal(instId, concurso) {
    if (typeof CONCURSOS === 'undefined') return;
    CONCURSOS[instId] = Object.assign({}, CONCURSOS[instId] || {}, concurso);
  }

  function atualizarCard(instId, dados, concurso) {
    const card = document.querySelector('[data-concurso-card][data-inst="' + cssEscape(instId) + '"]');
    if (!card) return;

    const titulo = card.querySelector('.concursos-card-topo h2');
    const resumo = card.querySelector('.concursos-card-topo p');
    const indicadores = card.querySelectorAll('.concursos-card-indicadores > div strong');
    const corpo = card.querySelectorAll('.concursos-card-corpo p');
    const fonte = card.querySelector('.concursos-card-links a');

    if (titulo && dados.titulo) titulo.textContent = limparTextoPublico(dados.titulo);
    if (resumo && dados.resumo) resumo.textContent = limparTextoPublico(dados.resumo);

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

    card.dataset.automacao = 'concursos-json';
    card.dataset.automacaoAtualizada = concurso.automacao.ultima_pesquisa || '';
    card.dataset.automacaoQualidade = concurso.automacao.qualidade_publicacao || '';
    card.dataset.automacaoScore = concurso.automacao.score_publicacao || '';
  }

  function renderizarDetalheSeAberto(instId, concurso) {
    const select = document.getElementById('concursos_instituicao');
    const detalhe = document.getElementById('consulta-concurso-detalhado');
    const lista = document.getElementById('lista-concursos');

    if (!select || !detalhe || !lista) return;
    if (select.value !== instId || detalhe.hidden) return;

    const link = /^https?:\/\//i.test(concurso.site)
      ? '<a href="' + escapar(concurso.site) + '" target="_blank" rel="noopener noreferrer" class="concurso-link">🔗 Site oficial da instituição</a>'
      : '<span class="direito-desc">Fonte oficial em atualização</span>';

    // Metadados técnicos da automação não devem aparecer para o usuário final.
    const metadados = '';

    lista.innerHTML = `
      <div class="direito-item acao">
        <span class="direito-nome">${escapar(concurso.edital)}</span>
        <span class="direito-desc"><strong>Salário inicial:</strong> ${escapar(concurso.salario)}</span>
        <span class="direito-desc"><strong>Vagas:</strong> ${escapar(concurso.vagas)}</span>
        <span class="direito-desc"><strong>Cotas:</strong> ${escapar(concurso.cotas)}</span>
        <span class="direito-desc"><strong>Idade e requisitos:</strong> ${escapar(concurso.idade)}</span>
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


  function esferaDaInstituicao(itemConfig) {
    return texto(itemConfig && itemConfig.uf).toUpperCase() === 'BR' ? 'federal' : 'estadual';
  }

  function ufDaInstituicao(itemConfig) {
    return texto(itemConfig && itemConfig.uf).toUpperCase() || 'BR';
  }

  function rotuloGrupoUf(uf) {
    const codigo = texto(uf).toUpperCase() || 'BR';
    if (codigo === 'BR') return 'União / Federal';
    return (UF_NOME[codigo] || codigo) + ' (' + codigo + ')';
  }

  function tipoInstituicao(itemConfig) {
    const id = texto(itemConfig && itemConfig.id).toLowerCase();
    const sigla = texto(itemConfig && itemConfig.sigla).toLowerCase();
    const nome = texto(itemConfig && itemConfig.nome).toLowerCase();
    const tipo = texto(itemConfig && itemConfig.tipo).toLowerCase();

    if (id === 'pf' || sigla === 'pf') return 'pf';
    if (id === 'prf' || sigla === 'prf') return 'prf';
    if (id.startsWith('pm') || /pol[íi]cia militar/.test(nome) || tipo.indexOf('polícia militar') >= 0 || tipo.indexOf('policia militar') >= 0) return 'pm';
    if (id.startsWith('bm') || sigla.startsWith('cbm') || /bombeiros?/.test(nome) || tipo.indexOf('bombeiro') >= 0) return 'bm';
    if (id.startsWith('pc') || /pol[íi]cia civil/.test(nome) || tipo.indexOf('polícia civil') >= 0 || tipo.indexOf('policia civil') >= 0) return 'pc';
    if (id.startsWith('pp') || /pol[íi]cia penal/.test(nome) || tipo.indexOf('polícia penal') >= 0 || tipo.indexOf('policia penal') >= 0) return 'pp';
    return 'outro';
  }

  function ordenarInstituicoes(a, b) {
    const ufA = ufDaInstituicao(a);
    const ufB = ufDaInstituicao(b);
    const posA = UF_ORDEM.indexOf(ufA) >= 0 ? UF_ORDEM.indexOf(ufA) : 999;
    const posB = UF_ORDEM.indexOf(ufB) >= 0 ? UF_ORDEM.indexOf(ufB) : 999;
    if (posA !== posB) return posA - posB;

    const tipoA = ORDEM_TIPO[tipoInstituicao(a)] || ORDEM_TIPO.outro;
    const tipoB = ORDEM_TIPO[tipoInstituicao(b)] || ORDEM_TIPO.outro;
    if (tipoA !== tipoB) return tipoA - tipoB;

    return texto(a.sigla || a.id).localeCompare(texto(b.sigla || b.id), 'pt-BR');
  }

  function criarOptionInstituicao(itemConfig) {
    const option = document.createElement('option');
    const id = texto(itemConfig.id).toLowerCase();
    option.value = id;
    option.dataset.esfera = esferaDaInstituicao(itemConfig);
    option.dataset.uf = ufDaInstituicao(itemConfig);
    option.dataset.tipo = tipoInstituicao(itemConfig);
    option.textContent = texto(itemConfig.sigla || id.toUpperCase()) + ' — ' + texto(itemConfig.nome || id.toUpperCase());
    return option;
  }

  function reorganizarSeletorInstituicoes(config) {
    const select = document.getElementById('concursos_instituicao');
    if (!select || !Array.isArray(config)) return;

    const valorAtual = select.value;
    const idsVistos = new Set();
    const itens = config
      .filter(function (item) {
        const id = texto(item && item.id).toLowerCase();
        if (!id || idsVistos.has(id)) return false;
        idsVistos.add(id);
        return true;
      })
      .sort(ordenarInstituicoes);

    select.innerHTML = '';

    const todas = document.createElement('option');
    todas.value = '';
    todas.textContent = 'Todas as instituições';
    select.appendChild(todas);

    const grupos = new Map();
    itens.forEach(function (item) {
      const uf = ufDaInstituicao(item);
      if (!grupos.has(uf)) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = rotuloGrupoUf(uf);
        grupos.set(uf, optgroup);
        select.appendChild(optgroup);
      }
      grupos.get(uf).appendChild(criarOptionInstituicao(item));
    });

    if (valorAtual && idsVistos.has(valorAtual)) {
      select.value = valorAtual;
    } else {
      select.value = '';
    }

    select.dataset.totalInstituicoes = String(itens.length);
  }

  function criarOpcaoSeFaltar(itemConfig) {
    // Mantida por compatibilidade. A partir da Etapa 24 o seletor é reconstruído por UF em reorganizarSeletorInstituicoes().
    const select = document.getElementById('concursos_instituicao');
    if (!select || !itemConfig || !itemConfig.id) return;
    const id = texto(itemConfig.id).toLowerCase();
    if ([...select.options].some(function (opt) { return opt.value === id; })) return;
    select.appendChild(criarOptionInstituicao(itemConfig));
  }

  function criarCardSeFaltar(instId, itemConfig, dados, concurso) {
    if (document.querySelector('[data-concurso-card][data-inst="' + cssEscape(instId) + '"]')) return;
    const lista = document.getElementById('concursos-conteudo-lista');
    if (!lista) return;

    const card = document.createElement('article');
    card.className = 'card concursos-conteudo-card';
    card.setAttribute('data-concurso-card', '');
    card.dataset.inst = instId;
    card.dataset.esfera = esferaDaInstituicao(itemConfig);
    card.id = 'concurso-' + instId;

    const sigla = escapar(dados.sigla || itemConfig.sigla || instId.toUpperCase());
    const nome = escapar(dados.instituicao_nome || itemConfig.nome || sigla);
    const uf = escapar(itemConfig.uf === 'BR' ? 'Federal' : (itemConfig.uf || 'Estadual'));
    const site = /^https?:\/\//i.test(concurso.site) ? concurso.site : '#';
    const fonteLink = /^https?:\/\//i.test(concurso.site)
      ? '<a href="' + escapar(site) + '" target="_blank" rel="noopener noreferrer">Abrir fonte oficial</a>'
      : '<span>Fonte oficial em atualização</span>';

    card.innerHTML = `
      <div class="concursos-card-topo">
        <div>
          <span class="concursos-card-kicker">${uf} • ${sigla} · ${nome}</span>
          <h2>${escapar(limparTextoPublico(dados.titulo || (sigla + ': concursos, requisitos e etapas')))}</h2>
          <p>${escapar(limparTextoPublico(dados.resumo || ('Guia de concursos da ' + sigla + ' com dados estruturados de edital, requisitos, vagas, banca e etapas.')))}</p>
        </div>
        <span class="concursos-card-sigla" aria-hidden="true">${sigla}</span>
      </div>
      <div class="concursos-card-indicadores" aria-label="Resumo do concurso da ${sigla}">
        <div><span>Edital de referência</span><strong>${escapar(encurtar(concurso.edital, 190))}</strong></div>
        <div><span>Vagas</span><strong>${escapar(encurtar(concurso.vagas, 170))}</strong></div>
        <div><span>Banca</span><strong>${escapar(encurtar(concurso.banca, 150))}</strong></div>
        <div><span>Escolaridade</span><strong>${escapar(encurtar(concurso.escolaridade, 160))}</strong></div>
      </div>
      <div class="concursos-card-corpo">
        <p><strong>Remuneração de referência:</strong> ${escapar(concurso.salario)}</p>
        <p><strong>Etapas comuns do certame:</strong> ${escapar(concurso.etapas)}</p>
        <p><strong>Próximo edital e acompanhamento:</strong> ${escapar(concurso.previsao)}</p>
      </div>
      <div class="concursos-card-rodape">
        <p><strong>Orientação:</strong> dados organizados para consulta rápida. Revise sempre quando houver novo edital, retificação ou convocação.</p>
        <div class="concursos-card-links">
          ${fonteLink}
          <button type="button" data-concurso-load="${escapar(instId)}">Consultar dados completos</button>
        </div>
      </div>
    `;
    lista.appendChild(card);
  }

  function atualizarIndicadoresTotais(config) {
    const total = Array.isArray(config) ? config.length : 0;
    if (!total) return;

    document.querySelectorAll('strong').forEach(function (el) {
      const txt = texto(el.textContent);
      if (/^\d+\s*cards$/i.test(txt)) el.textContent = total + ' cards';
    });

    const contador = document.getElementById('concursos-contador-cards');
    if (contador && !document.getElementById('concursos_instituicao')?.value) {
      contador.textContent = total + ' instituições encontradas';
    }

    document.querySelectorAll('.usp-stat').forEach(function (stat) {
      const label = texto(stat.querySelector('span') && stat.querySelector('span').textContent).toLowerCase();
      const numero = stat.querySelector('strong');
      if (numero && label.indexOf('instituições') >= 0 && label.indexOf('resumo') >= 0) {
        numero.textContent = String(total);
        stat.dataset.totalConcursos = String(total);
      }
    });

    document.querySelectorAll('[data-total-concursos]').forEach(function (el) {
      el.textContent = String(total);
    });
  }

  function dispararAtualizacaoFiltros() {
    const select = document.getElementById('concursos_instituicao');
    if (select) select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function aplicarDados(itemConfig, dados) {
    const instId = texto(dados.instituicao_id || itemConfig.id).toLowerCase();

    criarOpcaoSeFaltar(itemConfig || dados || {});

    if (!jsonTemQualidadeMinima(dados)) {
      console.warn('Automação concursos: JSON de ' + instId + ' ignorado por baixa qualidade. Mantendo dados estáticos.');
      return;
    }

    const concurso = normalizarParaConcursos(dados || {}, itemConfig || {});
    atualizarBaseGlobal(instId, concurso);
    criarCardSeFaltar(instId, itemConfig || {}, dados || {}, concurso);
    atualizarCard(instId, dados || {}, concurso);
    renderizarDetalheSeAberto(instId, concurso);
    document.dispatchEvent(new CustomEvent('concursos:json-carregado', {
      detail: { instituicao_id: instId, dados: dados, concurso: concurso }
    }));
  }

  async function carregarJsonInstituicao(itemConfig) {
    const instId = texto(itemConfig.id).toLowerCase();
    const caminho = texto(itemConfig.arquivo_saida || ('data/concursos/' + instId + '.json'));
    if (!instId || !caminho) return;

    try {
      const resposta = await fetch(caminho + '?v=' + Date.now(), { cache: 'no-store' });
      if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
      const dados = await resposta.json();
      aplicarDados(itemConfig, dados);
    } catch (erro) {
      console.warn('Automação concursos: não foi possível carregar ' + caminho + '. Mantendo dados estáticos.', erro);
    }
  }

  async function carregarTudo() {
    try {
      const resposta = await fetch(CONFIG_URL + '?v=' + Date.now(), { cache: 'no-store' });
      if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
      const config = await resposta.json();
      if (!Array.isArray(config)) throw new Error('Configuração inválida.');
      reorganizarSeletorInstituicoes(config);
      atualizarIndicadoresTotais(config);
      await Promise.all(config.map(carregarJsonInstituicao));
      reorganizarSeletorInstituicoes(config);
      atualizarIndicadoresTotais(config);
      dispararAtualizacaoFiltros();
    } catch (erro) {
      console.warn('Automação concursos: não foi possível carregar configuração genérica. Mantendo dados estáticos.', erro);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarTudo);
  } else {
    carregarTudo();
  }
}());
