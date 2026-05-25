import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ROOT = process.env.UNISEGPUB_ROOT || process.cwd();

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ambiente.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

function file(...parts) {
  return path.join(ROOT, ...parts);
}

async function readJson(relativePath, fallback = null) {
  try {
    const raw = await fs.readFile(file(relativePath), 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (fallback !== null) return fallback;
    throw new Error(`Erro ao ler ${relativePath}: ${error.message}`);
  }
}

async function listJsonFiles(relativeDir) {
  const dir = file(relativeDir);
  const names = await fs.readdir(dir);
  return names
    .filter((name) => name.endsWith('.json'))
    .filter((name) => !name.startsWith('_'))
    .filter((name) => !name.endsWith('-monitor.json'))
    .sort();
}

function text(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function asDate(value) {
  const clean = text(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(clean) ? clean : null;
}

function asInt(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n) : null;
}

function asNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function boolOrNull(value) {
  return typeof value === 'boolean' ? value : null;
}

function jsonArray(value) {
  return Array.isArray(value) ? value : [];
}

function jsonObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

async function upsertRows(table, rows, onConflict, chunkSize = 500) {
  if (!rows.length) return;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await supabase.from(table).upsert(chunk, { onConflict });
    if (error) throw new Error(`${table}: ${error.message}`);
  }
}

async function importInstituicoes() {
  const concursosConfig = await readJson('config/concursos-instituicoes.json', []);
  const remuneracaoConfig = await readJson('config/remuneracao-instituicoes.json', []);
  const byId = new Map();

  for (const item of concursosConfig) {
    if (!item?.id) continue;
    const id = text(item.id).toLowerCase();
    byId.set(id, {
      id,
      nome: text(item.nome),
      sigla: text(item.sigla),
      uf: text(item.uf || 'BR').toUpperCase(),
      tipo: text(item.tipo),
      prioridade: asInt(item.prioridade),
      site_principal: text(item.site_principal),
      fontes_base: jsonArray(item.fontes_base),
      dominios_oficiais: jsonArray(item.dominios_oficiais),
      termos_relevantes: jsonArray(item.termos_relevantes),
      consultas_concursos: jsonArray(item.consultas_sugeridas),
      consultas_remuneracao: [],
      config_concursos: item,
      config_remuneracao: {}
    });
  }

  for (const item of remuneracaoConfig) {
    if (!item?.id) continue;
    const id = text(item.id).toLowerCase();
    const current = byId.get(id) || {
      id,
      nome: text(item.nome),
      sigla: text(item.sigla),
      uf: text(item.uf || 'BR').toUpperCase(),
      tipo: text(item.tipo),
      prioridade: asInt(item.prioridade),
      site_principal: text(item.site_principal),
      fontes_base: [],
      dominios_oficiais: [],
      termos_relevantes: [],
      consultas_concursos: [],
      consultas_remuneracao: [],
      config_concursos: {},
      config_remuneracao: {}
    };

    current.nome ||= text(item.nome);
    current.sigla ||= text(item.sigla);
    current.uf ||= text(item.uf || 'BR').toUpperCase();
    current.tipo ||= text(item.tipo);
    current.prioridade ??= asInt(item.prioridade);
    current.site_principal ||= text(item.site_principal);
    current.fontes_base = current.fontes_base.length ? current.fontes_base : jsonArray(item.fontes_base);
    current.dominios_oficiais = current.dominios_oficiais.length ? current.dominios_oficiais : jsonArray(item.dominios_oficiais);
    current.termos_relevantes = current.termos_relevantes.length ? current.termos_relevantes : jsonArray(item.termos_relevantes);
    current.consultas_remuneracao = jsonArray(item.consultas_sugeridas);
    current.config_remuneracao = item;
    byId.set(id, current);
  }

  const rows = [...byId.values()].filter((row) => row.id && row.nome && row.sigla);
  await upsertRows('instituicoes', rows, 'id');
  console.log(`Instituições importadas: ${rows.length}`);
  return rows.map((row) => row.id);
}

function concursoRow(dados) {
  return {
    instituicao_id: text(dados.instituicao_id).toLowerCase(),
    instituicao_nome: text(dados.instituicao_nome),
    sigla: text(dados.sigla),
    uf: text(dados.uf || 'BR').toUpperCase(),
    tema: text(dados.tema),
    status: text(dados.status),
    titulo: text(dados.titulo),
    resumo: text(dados.resumo),
    edital: text(dados.edital),
    salario: text(dados.salario),
    vagas: text(dados.vagas),
    cotas: text(dados.cotas),
    idade: text(dados.idade),
    escolaridade: text(dados.escolaridade),
    materias: text(dados.materias),
    banca: text(dados.banca),
    inscritos: text(dados.inscritos),
    etapas: text(dados.etapas),
    cfsd: text(dados.cfsd),
    estagio: text(dados.estagio),
    validade: text(dados.validade),
    previsao: text(dados.previsao),
    site: text(dados.site),
    fontes: jsonArray(dados.fontes),
    ultima_pesquisa: asDate(dados.ultima_pesquisa),
    nivel_confianca: text(dados.nivel_confianca),
    precisa_revisao_humana: Boolean(dados.precisa_revisao_humana),
    alertas: jsonArray(dados.alertas),
    qualidade_publicacao: text(dados.qualidade_publicacao),
    score_publicacao: asInt(dados.score_publicacao),
    texto_final_limpo: boolOrNull(dados.texto_final_limpo),
    padrao_editorial: text(dados.padrao_editorial),
    modo_qualidade: text(dados.modo_qualidade),
    bloquear_publicacao: boolOrNull(dados.bloquear_publicacao),
    publicado_por_modo_qualificado: boolOrNull(dados.publicado_por_modo_qualificado),
    forcar_exibicao_site: boolOrNull(dados.forcar_exibicao_site),
    publicacao_forcada_por_credito_openai: boolOrNull(dados.publicacao_forcada_por_credito_openai),
    classe_atualizacao: text(dados.classe_atualizacao),
    modelo_openai: text(dados.modelo_openai),
    atualizado_pela_openai: boolOrNull(dados.atualizado_pela_openai),
    raw: jsonObject(dados)
  };
}

async function importConcursos() {
  const files = await listJsonFiles('data/concursos');
  const rows = [];
  for (const name of files) {
    const dados = await readJson(`data/concursos/${name}`);
    if (dados?.instituicao_id) rows.push(concursoRow(dados));
  }
  await upsertRows('concursos', rows, 'instituicao_id');
  console.log(`Concursos importados: ${rows.length}`);
}

function remuneracaoRow(dados) {
  return {
    instituicao_id: text(dados.instituicao_id).toLowerCase(),
    instituicao_nome: text(dados.instituicao_nome),
    sigla: text(dados.sigla),
    uf: text(dados.uf || 'BR').toUpperCase(),
    tema: text(dados.tema),
    status: text(dados.status),
    titulo: text(dados.titulo),
    resumo: text(dados.resumo),
    fonte_principal: text(dados.fonte_principal),
    fontes: jsonArray(dados.fontes),
    ultima_pesquisa: asDate(dados.ultima_pesquisa),
    classe_atualizacao: text(dados.classe_atualizacao),
    score_publicacao: asInt(dados.score_publicacao),
    modelo_openai: text(dados.modelo_openai),
    atualizado_pela_openai: boolOrNull(dados.atualizado_pela_openai),
    precisa_revisao_humana: Boolean(dados.precisa_revisao_humana),
    alertas: jsonArray(dados.alertas),
    raw: jsonObject(dados)
  };
}

function linhaRow(instituicaoId, linha, ordem) {
  return {
    instituicao_id: instituicaoId,
    ordem,
    cargo: text(linha.cargo) || `Cargo ${ordem + 1}`,
    badge: text(linha.badge),
    remuneracao: asNumber(linha.remuneracao),
    beneficios: asNumber(linha.beneficios),
    total: asNumber(linha.total || linha.remuneracao),
    classe: text(linha.classe),
    criterio: text(linha.criterio),
    benef_desc: text(linha.benefDesc),
    fonte_key: text(linha.fonteKey),
    fonte_nome: text(linha.fonteNome),
    fonte_url: text(linha.fonteUrl),
    valor_pendente: Boolean(linha.valorPendente),
    raw: jsonObject(linha)
  };
}

async function importRemuneracoes() {
  const files = await listJsonFiles('data/remuneracao');
  const remuneracoes = [];
  const linhas = [];
  const ids = [];

  for (const name of files) {
    const dados = await readJson(`data/remuneracao/${name}`);
    if (!dados?.instituicao_id) continue;
    const id = text(dados.instituicao_id).toLowerCase();
    remuneracoes.push(remuneracaoRow(dados));
    ids.push(id);
    jsonArray(dados.linhas).forEach((linha, index) => linhas.push(linhaRow(id, linha, index)));
  }

  await upsertRows('remuneracoes', remuneracoes, 'instituicao_id');

  // Mantém as linhas fiéis ao JSON atual: apaga as antigas das instituições importadas e recria.
  if (ids.length) {
    const { error } = await supabase.from('remuneracao_linhas').delete().in('instituicao_id', ids);
    if (error) throw new Error(`remuneracao_linhas/delete: ${error.message}`);
  }
  await upsertRows('remuneracao_linhas', linhas, 'instituicao_id,ordem');

  console.log(`Remunerações importadas: ${remuneracoes.length}`);
  console.log(`Linhas de remuneração importadas: ${linhas.length}`);
}

async function main() {
  console.log(`Raiz do projeto: ${ROOT}`);
  await importInstituicoes();
  await importConcursos();
  await importRemuneracoes();
  console.log('Importação concluída.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
