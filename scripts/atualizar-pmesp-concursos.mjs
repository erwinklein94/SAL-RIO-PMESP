import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const ARQUIVO_DESTINO = 'data/concursos/pmesp.json';
const ARQUIVO_MONITORAMENTO = 'data/concursos/pmesp-monitor.json';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.4-nano';
const USAR_WEB_SEARCH = String(process.env.USAR_WEB_SEARCH || 'false').toLowerCase() === 'true';
const FORCAR_ATUALIZACAO = String(process.env.FORCAR_ATUALIZACAO || 'false').toLowerCase() === 'true';
const DIAS_REVALIDACAO_COMPLETA = Number(process.env.DIAS_REVALIDACAO_COMPLETA || 14);
const MAX_PAGINAS_OFICIAIS = Number(process.env.MAX_PAGINAS_OFICIAIS || 8);
const MAX_CARACTERES_POR_PAGINA = Number(process.env.MAX_CARACTERES_POR_PAGINA || 7000);
const HOJE = new Date().toISOString().slice(0, 10);

const FONTES_BASE = [
  'https://concursos.policiamilitar.sp.gov.br/',
  'https://www.policiamilitar.sp.gov.br/',
  'https://www.vunesp.com.br/'
];

const DOMINIOS_OFICIAIS = [
  'concursos.policiamilitar.sp.gov.br',
  'policiamilitar.sp.gov.br',
  'vunesp.com.br',
  'doe.sp.gov.br',
  'imprensaoficial.com.br',
  'saopaulo.sp.gov.br',
  'al.sp.gov.br'
];

const camposObrigatorios = [
  'instituicao_id',
  'instituicao_nome',
  'sigla',
  'uf',
  'tema',
  'status',
  'titulo',
  'resumo',
  'edital',
  'salario',
  'vagas',
  'cotas',
  'idade',
  'escolaridade',
  'materias',
  'banca',
  'inscritos',
  'etapas',
  'cfsd',
  'estagio',
  'validade',
  'previsao',
  'site',
  'fontes',
  'ultima_pesquisa',
  'nivel_confianca',
  'precisa_revisao_humana',
  'alertas'
];

function diasDesde(dataIso) {
  if (!dataIso) return Infinity;
  const data = new Date(`${dataIso}T00:00:00Z`);
  if (Number.isNaN(data.getTime())) return Infinity;
  const agora = new Date(`${HOJE}T00:00:00Z`);
  return Math.floor((agora - data) / 86400000);
}

function sha256(texto) {
  return crypto.createHash('sha256').update(texto).digest('hex');
}

function normalizarTexto(texto = '') {
  return String(texto)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function limitar(texto, limite) {
  if (!texto) return '';
  if (texto.length <= limite) return texto;
  return texto.slice(0, limite) + '\n[conteúdo cortado para economia de tokens]';
}

function urlEhOficial(url = '') {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '').toLowerCase();
    return DOMINIOS_OFICIAIS.some((dominio) => hostname === dominio || hostname.endsWith(`.${dominio}`));
  } catch {
    return false;
  }
}

function ehFonteOficial(url = '') {
  return urlEhOficial(url);
}

function extrairLinks(html, baseUrl) {
  const links = new Set();
  const regex = /href=["']([^"'#]+)["']/gi;
  let match;

  while ((match = regex.exec(html))) {
    try {
      const url = new URL(match[1], baseUrl).href;
      const texto = url.toLowerCase();

      if (!urlEhOficial(url)) continue;
      if (!/(concurso|pmesp|policia|polícia|soldado|oficial|medico|médico|vunesp|edital|inscri|pmsp|pmes)/i.test(texto)) continue;
      if (/\.(jpg|jpeg|png|gif|webp|svg|css|js|ico|zip|rar)$/i.test(texto)) continue;

      links.add(url);
    } catch {
      // ignora links quebrados
    }
  }

  return [...links];
}

async function buscarPagina(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const resposta = await fetch(url, {
      headers: {
        'User-Agent': 'UniversoSegPubBot/1.0 (+https://www.universosegpub.com.br)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.5'
      },
      signal: controller.signal
    });

    const tipo = resposta.headers.get('content-type') || '';
    const bruto = await resposta.text();
    return {
      url,
      ok: resposta.ok,
      status: resposta.status,
      contentType: tipo,
      html: bruto,
      texto: normalizarTexto(bruto)
    };
  } catch (erro) {
    return {
      url,
      ok: false,
      status: 0,
      contentType: '',
      html: '',
      texto: '',
      erro: erro.message
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function coletarFontesOficiais() {
  const paginas = [];
  const fila = [...FONTES_BASE];
  const visitadas = new Set();

  while (fila.length > 0 && paginas.length < MAX_PAGINAS_OFICIAIS) {
    const url = fila.shift();
    if (!url || visitadas.has(url)) continue;
    visitadas.add(url);

    const pagina = await buscarPagina(url);
    paginas.push(pagina);

    if (pagina.ok && pagina.html && paginas.length < MAX_PAGINAS_OFICIAIS) {
      const novosLinks = extrairLinks(pagina.html, url);
      for (const link of novosLinks) {
        if (!visitadas.has(link) && fila.length < MAX_PAGINAS_OFICIAIS * 3) {
          fila.push(link);
        }
      }
    }
  }

  return paginas;
}

function resumoMonitoramento(paginas) {
  return paginas.map((pagina) => ({
    url: pagina.url,
    ok: pagina.ok,
    status: pagina.status,
    hash: sha256(normalizarTexto(pagina.texto).slice(0, 50000)),
    tamanho_texto: pagina.texto.length
  }));
}

function monitorMudou(monitorAnterior, monitorAtual) {
  if (!monitorAnterior || !Array.isArray(monitorAnterior.fontes_monitoradas)) return true;

  const anteriorPorUrl = new Map(monitorAnterior.fontes_monitoradas.map((item) => [item.url, item.hash]));

  for (const item of monitorAtual) {
    if (!anteriorPorUrl.has(item.url)) return true;
    if (anteriorPorUrl.get(item.url) !== item.hash) return true;
  }

  return false;
}

async function lerJson(caminho) {
  try {
    const bruto = await fs.readFile(caminho, 'utf8');
    return JSON.parse(bruto);
  } catch {
    return null;
  }
}

function extrairTextoResposta(payload) {
  if (payload.output_text) return payload.output_text;

  const textos = [];
  for (const item of payload.output || []) {
    for (const conteudo of item.content || []) {
      if (typeof conteudo.text === 'string') textos.push(conteudo.text);
    }
  }

  return textos.join('\n').trim();
}

function validarDados(dados) {
  for (const campo of camposObrigatorios) {
    if (!(campo in dados)) {
      throw new Error(`JSON gerado sem o campo obrigatório: ${campo}`);
    }
  }

  if (dados.instituicao_id !== 'pmesp') {
    throw new Error('O campo instituicao_id precisa ser exatamente "pmesp".');
  }

  if (!Array.isArray(dados.fontes)) {
    throw new Error('O campo fontes precisa ser uma lista.');
  }

  if (!Array.isArray(dados.alertas)) {
    throw new Error('O campo alertas precisa ser uma lista.');
  }

  if (!dados.fontes.some((fonte) => ehFonteOficial(fonte.url))) {
    dados.alertas.push('Nenhuma fonte oficial reconhecida foi encontrada automaticamente. Revisão humana obrigatória.');
    dados.precisa_revisao_humana = true;
    dados.nivel_confianca = 'baixo';
  }

  dados.instituicao_id = 'pmesp';
  dados.instituicao_nome = 'Polícia Militar do Estado de São Paulo';
  dados.sigla = 'PMESP';
  dados.uf = 'SP';
  dados.tema = 'concursos';
  dados.ultima_pesquisa = dados.ultima_pesquisa || HOJE;

  return dados;
}

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    instituicao_id: { type: 'string' },
    instituicao_nome: { type: 'string' },
    sigla: { type: 'string' },
    uf: { type: 'string' },
    tema: { type: 'string' },
    status: { type: 'string' },
    titulo: { type: 'string' },
    resumo: { type: 'string' },
    edital: { type: 'string' },
    salario: { type: 'string' },
    vagas: { type: 'string' },
    cotas: { type: 'string' },
    idade: { type: 'string' },
    escolaridade: { type: 'string' },
    materias: { type: 'string' },
    banca: { type: 'string' },
    inscritos: { type: 'string' },
    etapas: { type: 'string' },
    cfsd: { type: 'string' },
    estagio: { type: 'string' },
    validade: { type: 'string' },
    previsao: { type: 'string' },
    site: { type: 'string' },
    fontes: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          titulo: { type: 'string' },
          url: { type: 'string' },
          tipo: { type: 'string' },
          data_consulta: { type: 'string' }
        },
        required: ['titulo', 'url', 'tipo', 'data_consulta']
      }
    },
    ultima_pesquisa: { type: 'string' },
    nivel_confianca: { type: 'string' },
    precisa_revisao_humana: { type: 'boolean' },
    alertas: {
      type: 'array',
      items: { type: 'string' }
    }
  },
  required: camposObrigatorios
};

const jsonAtual = await lerJson(ARQUIVO_DESTINO);
const monitorAnterior = await lerJson(ARQUIVO_MONITORAMENTO);
const paginasColetadas = await coletarFontesOficiais();
const monitorAtual = resumoMonitoramento(paginasColetadas);
const houveMudanca = monitorMudou(monitorAnterior, monitorAtual);
const diasDesdeUltimaPesquisa = diasDesde(jsonAtual?.ultima_pesquisa);
const precisaRevalidarPorTempo = diasDesdeUltimaPesquisa >= DIAS_REVALIDACAO_COMPLETA;

console.log('Modo econômico ativado.');
console.log(`Modelo configurado: ${OPENAI_MODEL}`);
console.log(`Web search da OpenAI: ${USAR_WEB_SEARCH ? 'ligado' : 'desligado'}`);
console.log(`Forçar atualização: ${FORCAR_ATUALIZACAO ? 'sim' : 'não'}`);
console.log(`Fontes oficiais coletadas: ${paginasColetadas.length}`);
console.log(`Houve mudança nas fontes monitoradas: ${houveMudanca ? 'sim' : 'não'}`);
console.log(`Dias desde a última pesquisa completa: ${diasDesdeUltimaPesquisa}`);

await fs.mkdir('data/concursos', { recursive: true });

if (!FORCAR_ATUALIZACAO && !houveMudanca && !precisaRevalidarPorTempo) {
  await fs.writeFile(
    ARQUIVO_MONITORAMENTO,
    `${JSON.stringify({
      atualizado_em: HOJE,
      modelo: OPENAI_MODEL,
      usou_openai: false,
      motivo: 'Fontes oficiais monitoradas sem mudança relevante e revalidação completa ainda dentro do prazo.',
      fontes_monitoradas: monitorAtual
    }, null, 2)}\n`,
    'utf8'
  );

  console.log('Nenhuma mudança relevante detectada. OpenAI não foi chamada. Custo desta execução: US$ 0,00 na API.');
  process.exit(0);
}

if (!OPENAI_API_KEY) {
  throw new Error('Defina o segredo OPENAI_API_KEY no GitHub antes de rodar a automação com IA.');
}

const conteudoFontes = paginasColetadas
  .filter((pagina) => pagina.ok && pagina.texto)
  .map((pagina, index) => {
    return `FONTE ${index + 1}\nURL: ${pagina.url}\nSTATUS HTTP: ${pagina.status}\nTEXTO EXTRAÍDO:\n${limitar(pagina.texto, MAX_CARACTERES_POR_PAGINA)}`;
  })
  .join('\n\n---\n\n');

const prompt = `
Você está atualizando o portal Universo Seg Pub.

Tarefa única:
Atualizar APENAS o tema Concursos da PMESP com base nas fontes oficiais fornecidas abaixo.

Instituição:
- Polícia Militar do Estado de São Paulo
- Sigla: PMESP
- UF: SP
- Tema: concursos

Data da pesquisa: ${HOJE}

Regras rígidas:
- Use prioritariamente o texto das fontes oficiais fornecidas no prompt.
- Não invente edital, salário, vagas, datas, banca, requisitos ou etapas.
- Se uma informação não estiver nas fontes fornecidas, escreva literalmente: "não encontrado em fonte oficial".
- Diferencie concurso aberto, em andamento, encerrado e previsto.
- Para o campo "previsao", não prometa novo edital sem fonte oficial.
- Mantenha respostas curtas por campo, pois o objetivo é economizar custo e publicar em card do site.
- Não cite blogs, cursinhos, agregadores de concurso ou sites comerciais.
- O JSON precisa continuar compatível com data/concursos/pmesp.json.

Dados atualmente publicados, para comparação:
${JSON.stringify(jsonAtual, null, 2)}

Fontes oficiais coletadas automaticamente:
${conteudoFontes || 'Nenhuma fonte oficial pôde ser coletada automaticamente.'}

Atualize os campos do JSON somente quando houver base nas fontes oficiais. Retorne somente JSON válido, sem markdown, sem comentários e sem texto fora do JSON.
`;

const body = {
  model: OPENAI_MODEL,
  input: [
    {
      role: 'system',
      content: 'Você é um pesquisador rigoroso de concursos públicos de segurança pública no Brasil. Você prioriza fontes oficiais, não inventa dados e devolve somente JSON válido quando solicitado.'
    },
    {
      role: 'user',
      content: prompt
    }
  ],
  text: {
    format: {
      type: 'json_schema',
      name: 'pmesp_concursos',
      strict: true,
      schema
    }
  }
};

if (USAR_WEB_SEARCH) {
  body.tools = [{ type: 'web_search', search_context_size: 'low' }];
}

const resposta = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});

if (!resposta.ok) {
  const erro = await resposta.text();
  throw new Error(`Erro na API OpenAI: HTTP ${resposta.status} - ${erro}`);
}

const payload = await resposta.json();
const texto = extrairTextoResposta(payload);

if (!texto) {
  throw new Error('A OpenAI não retornou texto/JSON na resposta.');
}

let dadosGerados;
try {
  dadosGerados = JSON.parse(texto);
} catch (erro) {
  throw new Error(`A resposta não veio como JSON válido. Resposta recebida: ${texto}`);
}

const dadosValidados = validarDados(dadosGerados);

await fs.writeFile(ARQUIVO_DESTINO, `${JSON.stringify(dadosValidados, null, 2)}\n`, 'utf8');
await fs.writeFile(
  ARQUIVO_MONITORAMENTO,
  `${JSON.stringify({
    atualizado_em: HOJE,
    modelo: OPENAI_MODEL,
    usou_openai: true,
    usou_web_search_openai: USAR_WEB_SEARCH,
    motivo: FORCAR_ATUALIZACAO
      ? 'Atualização forçada manualmente.'
      : houveMudanca
        ? 'Mudança detectada nas fontes oficiais monitoradas.'
        : 'Revalidação completa por prazo.',
    usage: payload.usage || null,
    fontes_monitoradas: monitorAtual
  }, null, 2)}\n`,
  'utf8'
);

console.log(`Arquivo atualizado com sucesso: ${ARQUIVO_DESTINO}`);
console.log(`Monitoramento atualizado com sucesso: ${ARQUIVO_MONITORAMENTO}`);
console.log(`Última pesquisa: ${dadosValidados.ultima_pesquisa}`);
console.log(`Nível de confiança: ${dadosValidados.nivel_confianca}`);
console.log(`Precisa revisão humana: ${dadosValidados.precisa_revisao_humana ? 'sim' : 'não'}`);

if (payload.usage) {
  console.log('Uso retornado pela OpenAI:', JSON.stringify(payload.usage));
}
