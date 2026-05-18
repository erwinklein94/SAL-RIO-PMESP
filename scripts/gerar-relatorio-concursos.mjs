import fs from 'node:fs/promises';
import path from 'node:path';

const CONFIG_PATH = process.env.CONFIG_PATH || 'config/concursos-instituicoes.json';
const DATA_DIR = process.env.DATA_DIR || 'data/concursos';
const HOJE = new Date().toISOString().slice(0, 10);
const camposConteudo = ['edital','salario','vagas','cotas','idade','escolaridade','materias','banca','inscritos','etapas','cfsd','estagio','validade','previsao'];
const camposCriticos = ['edital','salario','vagas','escolaridade','banca','etapas'];

async function lerJson(caminho, fallback=null) { try { return JSON.parse(await fs.readFile(caminho, 'utf8')); } catch { return fallback; } }
function normalizar(v) { return String(v ?? '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' '); }
function valorRuim(v) { const t=normalizar(v); if(!t) return true; return ['nao localizado nas fontes consultadas','nao encontrado','nao informado','dados em atualizacao','sem informacao','sem dados','indisponivel','pesquisa inicial pendente'].some(p=>t.includes(p)); }
function valorConcreto(v) { const s=String(v??'').trim(); const t=normalizar(s); if(!t||valorRuim(s)) return false; return [/r\$\s?\d/i,/\b\d{1,4}([\.,]\d{3})*\s*(vagas?|cargos?|convocados?|inscritos?)\b/i,/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/,/\b20\d{2}\b/,/\b(cebraspe|vunesp|fgv|ibfc|iades|idecan|fcc|fepese|acafe|cesgranrio|aocp|idib|consulplan|fundatec)\b/i,/\b(soldado|oficial|delegado|investigador|escriv[aã]o|perito|agente|papiloscopista|inspetor|policial penal|bombeiro|tempor[aá]rio)\b/i,/\b(ensino m[eé]dio|n[ií]vel m[eé]dio|n[ií]vel superior|bacharelado|gradua[cç][aã]o|cnh|direito|medicina|altura)\b/i].some(r=>r.test(s)); }
function valorGenerico(v) { const t=normalizar(v); if(!t||valorRuim(v)) return true; const probs=['conferir edital','consultar edital','ver edital','olhar edital','acessar o edital','conforme edital','edital especifico','acompanhar a pagina','acompanhar o site','depende do edital','depende do concurso','depende do cargo','varia por edital','varia conforme','quando previsto','quando aplicavel','demais etapas','informacoes completas','atos oficiais','deve ser conferido','nao detalhado','sem detalhamento']; return probs.some(p=>t.includes(p)) && !valorConcreto(v); }
function avaliar(dados) {
  if(!dados) return { score:0, classe:'pendente', qualidade:'pendente', ruins:camposConteudo, genericos:camposConteudo, concretos:[], criticosRuins:camposCriticos, criticosGenericos:camposCriticos };
  const ruins=camposConteudo.filter(c=>valorRuim(dados[c]));
  const genericos=camposConteudo.filter(c=>!valorRuim(dados[c])&&valorGenerico(dados[c]));
  const concretos=camposConteudo.filter(c=>valorConcreto(dados[c]));
  const criticosRuins=camposCriticos.filter(c=>valorRuim(dados[c]));
  const criticosGenericos=camposCriticos.filter(c=>!valorRuim(dados[c])&&valorGenerico(dados[c]));
  let score=100-ruins.length*8-genericos.length*7-criticosRuins.length*14-criticosGenericos.length*12;
  if(concretos.length<6) score-=12;
  if(!Array.isArray(dados.fontes)||dados.fontes.length===0) score-=12;
  score=Math.max(0, Math.min(100, Math.round(score)));
  const status=normalizar(dados.status);
  const pendente=status.includes('pendente') || score<45 || criticosRuins.length>=3;
  const fraca=!pendente && (score<78 || criticosGenericos.length>0 || genericos.length>=3 || normalizar(dados.qualidade_publicacao)==='baixa');
  const classe=pendente?'pendente':fraca?'fraca':'forte';
  return { score, classe, qualidade:classe, ruins, genericos, concretos, criticosRuins, criticosGenericos };
}
function workflow(grupo, quantidade='5', modelo='gpt-5.4-mini') { return { grupo_atualizacao:grupo, quantidade, modelo_openai:modelo }; }
function linhaMarkdown(item) { return `| ${item.sigla} | ${item.nome} | ${item.uf} | ${item.classe} | ${item.score} | ${item.motivos.join('; ')} |`; }

const config=await lerJson(CONFIG_PATH, []);
const fila=[];
for(const item of config){
  const dados=await lerJson(item.arquivo_saida || path.join(DATA_DIR, `${item.id}.json`));
  const av=avaliar(dados);
  const motivos=[];
  if(av.classe==='pendente') motivos.push('precisa primeira atualização');
  if(av.classe==='fraca') motivos.push('conteúdo fraco ou genérico');
  if(av.genericos.length) motivos.push(`campos genéricos: ${av.genericos.slice(0,4).join(', ')}`);
  if(av.criticosRuins.length) motivos.push(`campos críticos sem dado: ${av.criticosRuins.join(', ')}`);
  if(av.criticosGenericos.length) motivos.push(`campos críticos genéricos: ${av.criticosGenericos.join(', ')}`);
  if(!motivos.length) motivos.push('conteúdo bom');
  fila.push({ id:item.id, sigla:item.sigla, nome:item.nome, uf:item.uf, score:av.score, classe:av.classe, qualidade:av.qualidade, motivos, campos_ruins:av.ruins, campos_genericos:av.genericos, campos_concretos:av.concretos, workflow_sugerido: av.classe==='pendente'?workflow('pendentes'):av.classe==='fraca'?workflow('fracas'):workflow('fortes','5','gpt-5.4-mini') });
}

fila.sort((a,b)=>a.score-b.score || a.id.localeCompare(b.id));
const grupos={ pendentes:fila.filter(x=>x.classe==='pendente'), fracas:fila.filter(x=>x.classe==='fraca'), fortes:fila.filter(x=>x.classe==='forte') };
const relatorio={ gerado_em:HOJE, modelo_operacional:'simples', resumo:{ total:fila.length, pendentes:grupos.pendentes.length, fracas:grupos.fracas.length, fortes:grupos.fortes.length }, grupos, fila_acoes:fila };
await fs.mkdir(DATA_DIR,{recursive:true});
await fs.writeFile(path.join(DATA_DIR,'_relatorio-qualidade.json'), JSON.stringify(relatorio,null,2)+'\n','utf8');

const md=`# Relatório simples de qualidade dos concursos\n\nGerado em: ${HOJE}\n\n## Resumo\n\n- Total: ${relatorio.resumo.total}\n- Pendentes: ${relatorio.resumo.pendentes}\n- Atualização fraca: ${relatorio.resumo.fracas}\n- Atualização forte: ${relatorio.resumo.fortes}\n\n## Como atualizar\n\n### Pendentes\n\nUse no GitHub Actions:\n\n\`\`\`text\ngrupo_atualizacao: pendentes\nquantidade: 5\nmodelo_openai: gpt-5.4-mini, gpt-5.4 ou gpt-5.5\n\`\`\`\n\n### Fracas\n\n\`\`\`text\ngrupo_atualizacao: fracas\nquantidade: 5\nmodelo_openai: gpt-5.4-mini, gpt-5.4 ou gpt-5.5\n\`\`\`\n\n### Fortes\n\n\`\`\`text\ngrupo_atualizacao: fortes\nquantidade: 5\nmodelo_openai: gpt-5.4-mini\n\`\`\`\n\n## Instituições pendentes\n\n| Sigla | Instituição | UF | Classe | Score | Motivos |\n|---|---|---:|---|---:|---|\n${grupos.pendentes.map(linhaMarkdown).join('\n') || '| - | - | - | - | - | - |'}\n\n## Instituições fracas\n\n| Sigla | Instituição | UF | Classe | Score | Motivos |\n|---|---|---:|---|---:|---|\n${grupos.fracas.map(linhaMarkdown).join('\n') || '| - | - | - | - | - | - |'}\n\n## Instituições fortes\n\n| Sigla | Instituição | UF | Classe | Score | Motivos |\n|---|---|---:|---|---:|---|\n${grupos.fortes.map(linhaMarkdown).join('\n') || '| - | - | - | - | - | - |'}\n`;
await fs.mkdir('docs',{recursive:true});
await fs.writeFile('docs/RELATORIO-CONCURSOS.md', md, 'utf8');
console.log(`Relatório simples gerado: ${relatorio.resumo.total} instituições.`);
