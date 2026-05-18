import fs from 'node:fs/promises';
import path from 'node:path';

const CONFIG_PATH = process.env.CONFIG_PATH || 'config/concursos-instituicoes.json';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODELO_OPENAI = process.env.MODELO_OPENAI || process.env.OPENAI_MODEL_QUALIDADE || 'gpt-5.4-mini';
const GRUPO_ATUALIZACAO = String(process.env.GRUPO_ATUALIZACAO || 'fracas').trim().toLowerCase();
const INSTITUICAO_ID = String(process.env.INSTITUICAO_ID || '').trim().toLowerCase();
const QUANTIDADE = Math.max(1, Number(process.env.QUANTIDADE || process.env.LIMITE_INSTITUICOES || 1));
const SEARCH_CONTEXT_SIZE = process.env.SEARCH_CONTEXT_SIZE || 'high';
const DELAY_ENTRE_INSTITUICOES_MS = Number(process.env.DELAY_ENTRE_INSTITUICOES_MS || (MODELO_OPENAI === 'gpt-5.5' ? 75000 : 8000));
const DATA_DIR = process.env.DATA_DIR || 'data/concursos';
const HOJE = new Date().toISOString().slice(0, 10);

const camposObrigatorios = ['instituicao_id','instituicao_nome','sigla','uf','tema','status','titulo','resumo','edital','salario','vagas','cotas','idade','escolaridade','materias','banca','inscritos','etapas','cfsd','estagio','validade','previsao','site','fontes','ultima_pesquisa','nivel_confianca','precisa_revisao_humana','alertas'];
const camposConteudo = ['edital','salario','vagas','cotas','idade','escolaridade','materias','banca','inscritos','etapas','cfsd','estagio','validade','previsao'];
const camposCriticos = ['edital','salario','vagas','escolaridade','banca','etapas'];
const respostaNaoLocalizada = 'Não localizado nas fontes consultadas.';

const schema = { type:'object', additionalProperties:false, required:camposObrigatorios, properties:{} };
for (const campo of camposObrigatorios) {
  if (campo === 'fontes') {
    schema.properties[campo] = { type:'array', items:{ type:'object', additionalProperties:false, required:['titulo','url','tipo','data_consulta'], properties:{ titulo:{type:'string'}, url:{type:'string'}, tipo:{type:'string'}, data_consulta:{type:'string'} } } };
  } else if (campo === 'alertas') {
    schema.properties[campo] = { type:'array', items:{type:'string'} };
  } else if (campo === 'precisa_revisao_humana') {
    schema.properties[campo] = { type:'boolean' };
  } else {
    schema.properties[campo] = { type:'string' };
  }
}

function dormir(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function normalizar(v) { return String(v ?? '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' '); }
function valorRuim(v) { const t = normalizar(v); if (!t) return true; return ['nao localizado nas fontes consultadas','nao encontrado','nao informado','dados em atualizacao','sem informacao','sem dados','indisponivel','pesquisa inicial pendente'].some(p => t.includes(p)); }
function valorConcreto(v) { const s = String(v ?? '').trim(); const t = normalizar(s); if (!t || valorRuim(s)) return false; return [/r\$\s?\d/i,/\b\d{1,4}([\.,]\d{3})*\s*(vagas?|cargos?|convocados?|inscritos?)\b/i,/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/,/\b20\d{2}\b/,/\b(cebraspe|vunesp|fgv|ibfc|iades|idecan|fcc|fepese|acafe|cesgranrio|aocp|idib|consulplan|fundatec)\b/i,/\b(soldado|oficial|delegado|investigador|escriv[aã]o|perito|agente|papiloscopista|inspetor|policial penal|bombeiro|tempor[aá]rio)\b/i,/\b(ensino m[eé]dio|n[ií]vel m[eé]dio|n[ií]vel superior|bacharelado|gradua[cç][aã]o|cnh|direito|medicina|altura)\b/i].some(r=>r.test(s)); }
function valorGenerico(v) { const t = normalizar(v); if (!t || valorRuim(v)) return true; const proibidos = ['conferir edital','consultar edital','ver edital','olhar edital','acessar o edital','conforme edital','edital especifico','acompanhar a pagina','acompanhar o site','depende do edital','depende do concurso','depende do cargo','varia por edital','varia conforme','quando previsto','quando aplicavel','demais etapas','informacoes completas','atos oficiais','deve ser conferido','nao detalhado','sem detalhamento','banca organizadora quando definida']; return proibidos.some(p=>t.includes(p)) && !valorConcreto(v); }
function valorUtil(v) { return !valorRuim(v) && !valorGenerico(v); }

function limparCampoVisivel(v) {
  let s = String(v ?? '').trim();
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1');
  s = s.replace(/https?:\/\/\S+/g, '');
  s = s.replace(/\[[^\]]*\]/g, '');
  s = s.replace(/utm_source=[^\s)]+/g, '');
  s = s.replace(/\s+([.,;:])/g, '$1');
  s = s.replace(/\s{2,}/g, ' ').trim();
  s = s.replace(/\(\s*\)/g, '').trim();
  if (!s) return respostaNaoLocalizada;
  if (valorGenerico(s)) return respostaNaoLocalizada;
  return s;
}

function avaliar(dados) {
  if (!dados) return { score:0, classe:'pendente', qualidade:'pendente', genericos:camposConteudo, ruins:camposConteudo, concretos:[] };
  const ruins = camposConteudo.filter(c => valorRuim(dados[c]));
  const genericos = camposConteudo.filter(c => !valorRuim(dados[c]) && valorGenerico(dados[c]));
  const concretos = camposConteudo.filter(c => valorConcreto(dados[c]));
  const criticosRuins = camposCriticos.filter(c => valorRuim(dados[c]));
  const criticosGenericos = camposCriticos.filter(c => !valorRuim(dados[c]) && valorGenerico(dados[c]));
  let score = 100 - ruins.length*8 - genericos.length*7 - criticosRuins.length*14 - criticosGenericos.length*12;
  if (concretos.length < 6) score -= 12;
  if (!Array.isArray(dados.fontes) || dados.fontes.length === 0) score -= 12;
  score = Math.max(0, Math.min(100, Math.round(score)));
  const status = normalizar(dados.status);
  const pendente = status.includes('pendente') || score < 45 || camposCriticos.filter(c=>valorRuim(dados[c])).length >= 3;
  const fraca = !pendente && (score < 78 || criticosGenericos.length > 0 || genericos.length >= 3 || String(dados.qualidade_publicacao || '').toLowerCase() === 'baixa');
  const classe = pendente ? 'pendente' : fraca ? 'fraca' : 'forte';
  const qualidade = classe === 'forte' ? 'forte' : classe === 'fraca' ? 'fraca' : 'pendente';
  return { score, classe, qualidade, ruins, genericos, concretos, criticosRuins, criticosGenericos };
}

async function lerJson(caminho, fallback=null) { try { return JSON.parse(await fs.readFile(caminho, 'utf8')); } catch { return fallback; } }
async function carregarConfig() { const cfg = await lerJson(CONFIG_PATH, []); if (!Array.isArray(cfg)) throw new Error('config/concursos-instituicoes.json precisa ser uma lista.'); return cfg; }

function consultasSugeridas(item) {
  return [...new Set([...(item.consultas_sugeridas || []), `${item.sigla} concurso edital ${item.uf}`, `${item.nome} concurso salário vagas banca escolaridade idade altura`, `${item.sigla} edital PDF concurso público remuneração requisitos`, `${item.sigla} diário oficial homologação convocação concurso`])].slice(0, 10);
}

async function selecionarInstituicoes(config) {
  const avaliadas = [];
  for (const item of config) {
    const atual = await lerJson(item.arquivo_saida || path.join(DATA_DIR, `${item.id}.json`));
    avaliadas.push({ item, atual, avaliacao: avaliar(atual) });
  }

  if (GRUPO_ATUALIZACAO === 'instituicao') {
    const alvo = avaliadas.find(x => x.item.id === INSTITUICAO_ID);
    if (!alvo) throw new Error(`Instituição "${INSTITUICAO_ID}" não encontrada no config.`);
    return [alvo];
  }

  const mapa = {
    pendentes: (x) => x.avaliacao.classe === 'pendente',
    fracas: (x) => x.avaliacao.classe === 'fraca',
    fortes: (x) => x.avaliacao.classe === 'forte',
    todas: () => true
  };
  const filtro = mapa[GRUPO_ATUALIZACAO] || mapa.fracas;
  return avaliadas.filter(filtro).sort((a,b) => a.avaliacao.score - b.avaliacao.score || a.item.id.localeCompare(b.item.id)).slice(0, QUANTIDADE);
}

function extrairTextoResposta(payload) {
  if (payload.output_text) return payload.output_text;
  const textos = [];
  for (const item of payload.output || []) for (const c of item.content || []) if (typeof c.text === 'string') textos.push(c.text);
  return textos.join('\n').trim();
}

function normalizarResposta(dados, item, atual) {
  const out = { ...dados };
  for (const campo of camposObrigatorios) if (!(campo in out)) out[campo] = campo === 'fontes' || campo === 'alertas' ? [] : campo === 'precisa_revisao_humana' ? true : '';
  out.instituicao_id = item.id;
  out.instituicao_nome = item.nome;
  out.sigla = item.sigla;
  out.uf = item.uf;
  out.tema = 'concursos';
  out.ultima_pesquisa = HOJE;
  out.site = out.site || item.site_principal || atual?.site || '';

  for (const campo of camposConteudo.concat(['titulo','resumo'])) {
    const limpo = limparCampoVisivel(out[campo]);
    if (limpo === respostaNaoLocalizada && atual && valorUtil(atual[campo])) out[campo] = limparCampoVisivel(atual[campo]);
    else out[campo] = limpo;
  }

  out.fontes = Array.isArray(out.fontes) ? out.fontes.filter(f => f && /^https?:\/\//i.test(String(f.url || ''))) : [];
  if (out.fontes.length === 0 && item.site_principal) out.fontes = [{ titulo:`Fonte principal ${item.sigla}`, url:item.site_principal, tipo:'fonte cadastrada', data_consulta:HOJE }];
  out.alertas = Array.isArray(out.alertas) ? out.alertas.map(String).filter(Boolean) : [];

  const av = avaliar(out);
  out.status = av.classe === 'forte' ? 'Atualização forte' : av.classe === 'fraca' ? 'Atualização fraca' : 'Pesquisa pendente';
  out.classe_atualizacao = av.classe;
  out.qualidade_publicacao = av.qualidade;
  out.score_publicacao = String(av.score);
  out.modelo_openai = MODELO_OPENAI;
  out.atualizado_pela_openai = true;
  out.precisa_revisao_humana = av.classe !== 'forte';
  out.alertas = [...new Set([...out.alertas, `Classificação automática: ${out.status} (${av.score}/100).`])];
  return out;
}

async function chamarOpenAI(item, atual) {
  if (!OPENAI_API_KEY) throw new Error('Defina OPENAI_API_KEY nos Secrets do GitHub.');
  const prompt = `Você é o pesquisador editorial do Universo Seg Pub. Você vai atualizar a página de CONCURSOS da instituição abaixo.

INSTITUIÇÃO:
- ID: ${item.id}
- Sigla: ${item.sigla}
- Nome: ${item.nome}
- UF: ${item.uf}

OBJETIVO:
Entregar respostas úteis, diretas e profissionais para o usuário final do site. O usuário NÃO deve ser mandado para edital, banca ou página oficial para descobrir o básico. Seu trabalho é pesquisar e responder.

PESQUISE NA INTERNET:
Use fontes oficiais, banca organizadora, diário oficial, governo e edital PDF como fonte principal. Pode usar sites jornalísticos e especializados como pista, mas não como única base para dado sensível quando houver fonte oficial disponível.

CONSULTAS SUGERIDAS:
${consultasSugeridas(item).map((q,i)=>`${i+1}. ${q}`).join('\n')}

FONTES CADASTRADAS:
${(item.fontes_base || []).map((u,i)=>`${i+1}. ${u}`).join('\n') || 'Nenhuma fonte cadastrada.'}

DADOS ATUAIS, para preservar somente quando forem mais objetivos que a nova pesquisa:
${JSON.stringify(atual || {}, null, 2)}

REGRAS ABSOLUTAS:
- Proibido escrever nos campos visíveis: "ver edital", "conferir edital", "consultar edital", "conforme edital", "depende do edital", "acompanhar site", "quando previsto".
- Proibido colocar URL, markdown, domínio, fonte entre colchetes, utm_source, comentário técnico ou justificativa de pesquisa nos campos visíveis.
- Se localizar número, publique o número. Ex.: "R$ 5.000,00", "1.200 vagas", "18 a 30 anos", "altura mínima 1,65 m".
- Se não localizar, escreva exatamente: "Não localizado nas fontes consultadas.".
- O campo fontes deve conter os links usados.
- Texto final deve ser curto, claro e publicável.

PREENCHIMENTO ESPERADO:
- salario: valores objetivos por cargo.
- vagas: quantidade, cargo e cadastro reserva.
- idade: idade, altura, CNH e requisitos físicos se existirem.
- escolaridade: nível/curso exigido.
- banca: nome da banca.
- etapas: lista curta das etapas.
- materias: disciplinas principais.
- edital: edital, ano, cargo e situação.
- previsao: previsão objetiva ou "Não localizado nas fontes consultadas.".

Retorne somente JSON válido no schema pedido.`;

  const body = { model: MODELO_OPENAI, input:[{role:'system', content:'Você é um pesquisador editorial rigoroso de concursos públicos. Entrega resposta final para usuário leigo, sem comentários técnicos e sem mandar o usuário procurar em edital.'},{role:'user', content:prompt}], tools:[{type:'web_search', search_context_size:SEARCH_CONTEXT_SIZE}], text:{format:{type:'json_schema', name:'concurso_instituicao', strict:true, schema}} };

  for (let tentativa=1; tentativa<=4; tentativa++) {
    const resposta = await fetch('https://api.openai.com/v1/responses', { method:'POST', headers:{ Authorization:`Bearer ${OPENAI_API_KEY}`, 'Content-Type':'application/json' }, body:JSON.stringify(body) });
    if (resposta.ok) return await resposta.json();
    const erro = await resposta.text();
    if (resposta.status === 429 && tentativa < 4) {
      const espera = tentativa * 45000;
      console.warn(`Rate limit em ${item.id}. Aguardando ${Math.round(espera/1000)}s e tentando novamente...`);
      await dormir(espera);
      continue;
    }
    throw new Error(`Erro OpenAI para ${item.id}: HTTP ${resposta.status} - ${erro}`);
  }
}

async function processar({ item, atual, avaliacao }) {
  console.log(`\n=== ${item.sigla} (${item.id}) — antes: ${avaliacao.classe} ${avaliacao.score}/100 ===`);
  const payload = await chamarOpenAI(item, atual);
  const texto = extrairTextoResposta(payload);
  if (!texto) throw new Error(`OpenAI não retornou JSON para ${item.id}.`);
  let gerado;
  try { gerado = JSON.parse(texto); } catch { throw new Error(`Resposta da OpenAI não é JSON válido para ${item.id}: ${texto.slice(0,500)}`); }
  const final = normalizarResposta(gerado, item, atual);
  await fs.mkdir(path.dirname(item.arquivo_saida), { recursive:true });
  await fs.writeFile(item.arquivo_saida, JSON.stringify(final, null, 2)+'\n', 'utf8');
  const avDepois = avaliar(final);
  await fs.writeFile(item.arquivo_monitoramento || path.join(DATA_DIR, `${item.id}-monitor.json`), JSON.stringify({ atualizado_em:HOJE, instituicao_id:item.id, grupo_atualizacao:GRUPO_ATUALIZACAO, modelo:MODELO_OPENAI, usou_openai:true, usou_web_search_openai:true, antes:{classe:avaliacao.classe, score:avaliacao.score}, depois:{classe:avDepois.classe, score:avDepois.score}, usage:payload.usage || null }, null, 2)+'\n', 'utf8');
  console.log(`✅ ${item.sigla}: salvo como ${avDepois.classe} (${avDepois.score}/100).`);
}

const config = await carregarConfig();
const selecionadas = await selecionarInstituicoes(config);
console.log('Motor simplificado de concursos');
console.log(`Grupo: ${GRUPO_ATUALIZACAO}`);
console.log(`Instituição específica: ${INSTITUICAO_ID || '-'}`);
console.log(`Quantidade: ${QUANTIDADE}`);
console.log(`Modelo: ${MODELO_OPENAI}`);
console.log(`Selecionadas: ${selecionadas.map(x=>x.item.id).join(', ') || 'nenhuma'}`);

if (selecionadas.length === 0) {
  console.log('Nenhuma instituição encontrada para esse grupo. Rode o relatório para conferir.');
  process.exit(0);
}

for (let i=0; i<selecionadas.length; i++) {
  await processar(selecionadas[i]);
  if (i < selecionadas.length - 1) await dormir(DELAY_ENTRE_INSTITUICOES_MS);
}

console.log('\nExecução finalizada.');
